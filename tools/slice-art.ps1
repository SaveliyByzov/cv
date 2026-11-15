# Cuts the raw Gemini sheets (assets/art/<screen>/_raw/land.* and sprites.*)
# into the small files the site loads: far.png / mid.png / ground.png layers
# and one PNG strip per sprite. Needs only Windows PowerShell (no Python/Node).
#
#   powershell -ExecutionPolicy Bypass -File tools/slice-art.ps1
#   powershell -ExecutionPolicy Bypass -File tools/slice-art.ps1 -Only home
#   powershell -ExecutionPolicy Bypass -File tools/slice-art.ps1 -Preview C:\temp\prev
#
# What it does
#  - turns the flat magenta (#FF00FF) background into real transparency
#    (with edge clean-up, since the sheets are JPEGs)
#  - land: finds the three strips, removes leftover parchment around them,
#    and cross-fades the ends so each strip repeats seamlessly
#  - sprites: cuts each grid cell, keeps all frames of a sprite aligned
#    (one shared crop + scale), stands it on the bottom edge of a square frame
# The grid below must match `grid` in scenes.js.
param([string]$Only = '', [string]$Preview = '')
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Add-Type -AssemblyName System.Drawing

$cs = @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class Img {
  public int W, H;
  public byte[] P; // BGRA, not premultiplied
  public Img(int w, int h) { W = w; H = h; P = new byte[w * h * 4]; }

  public static Img Load(string path) {
    using (Bitmap src = new Bitmap(path))
    using (Bitmap b = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb)) {
      using (Graphics g = Graphics.FromImage(b)) { g.DrawImage(src, 0, 0, src.Width, src.Height); }
      return FromBitmap(b);
    }
  }
  public static Img FromBitmap(Bitmap b) {
    Img img = new Img(b.Width, b.Height);
    BitmapData d = b.LockBits(new Rectangle(0, 0, b.Width, b.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    for (int y = 0; y < b.Height; y++)
      Marshal.Copy(new IntPtr(d.Scan0.ToInt64() + (long)y * d.Stride), img.P, y * b.Width * 4, b.Width * 4);
    b.UnlockBits(d);
    return img;
  }
  public Bitmap ToBitmap() {
    Bitmap b = new Bitmap(W, H, PixelFormat.Format32bppArgb);
    BitmapData d = b.LockBits(new Rectangle(0, 0, W, H), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
    for (int y = 0; y < H; y++)
      Marshal.Copy(P, y * W * 4, new IntPtr(d.Scan0.ToInt64() + (long)y * d.Stride), W * 4);
    b.UnlockBits(d);
    return b;
  }
  public Bitmap ToPBitmap() {
    using (Bitmap a = ToBitmap()) {
      Bitmap p = new Bitmap(W, H, PixelFormat.Format32bppPArgb);
      using (Graphics g = Graphics.FromImage(p)) {
        g.CompositingMode = CompositingMode.SourceCopy;
        g.DrawImage(a, 0, 0, W, H);
      }
      return p;
    }
  }
  public void Save(string path) { using (Bitmap b = ToBitmap()) { b.Save(path, ImageFormat.Png); } }

  public Img Crop(int x, int y, int w, int h) {
    if (x < 0) { w += x; x = 0; }
    if (y < 0) { h += y; y = 0; }
    if (x + w > W) w = W - x;
    if (y + h > H) h = H - y;
    Img o = new Img(w, h);
    for (int j = 0; j < h; j++) Buffer.BlockCopy(P, ((y + j) * W + x) * 4, o.P, j * w * 4, w * 4);
    return o;
  }

  static double Clamp(double v) { return v < 0 ? 0 : (v > 255 ? 255 : v); }

  // flat magenta -> transparent, with un-mixing of the magenta fringe on edges
  public void KeyMagenta(double lo, double hi) {
    for (int i = 0; i < W * H; i++) {
      int o = i * 4;
      double b = P[o], g = P[o + 1], r = P[o + 2];
      double m = Math.Min(r, b) - g;
      double a = m <= lo ? 1.0 : (m >= hi ? 0.0 : 1.0 - (m - lo) / (hi - lo));
      if (a <= 0.05) { P[o] = 0; P[o + 1] = 0; P[o + 2] = 0; P[o + 3] = 0; continue; }
      if (a < 0.999) {
        r = Clamp((r - (1 - a) * 255) / a);
        g = Clamp(g / a);
        b = Clamp((b - (1 - a) * 255) / a);
        P[o] = (byte)b; P[o + 1] = (byte)g; P[o + 2] = (byte)r;
      }
      P[o + 3] = (byte)Math.Round(a * 255);
    }
  }

  public int[] BBox(int thr) {
    int x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++)
        if (P[(y * W + x) * 4 + 3] >= thr) {
          if (x < x0) x0 = x; if (x > x1) x1 = x;
          if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
    if (x1 < 0) return null;
    return new int[] { x0, y0, x1 - x0 + 1, y1 - y0 + 1 };
  }

  int RowCount(int y) {
    int c = 0;
    for (int x = 0; x < W; x++) if (P[(y * W + x) * 4 + 3] > 128) c++;
    return c;
  }

  // horizontal strips separated by empty rows
  public static List<int[]> Bands(Img im, double minFrac, int mergeGap, int minH) {
    List<int[]> raw = new List<int[]>();
    int start = -1, last = -1;
    for (int y = 0; y < im.H; y++) {
      bool on = im.RowCount(y) >= minFrac * im.W;
      if (!on) continue;
      if (start < 0) start = y;
      else if (y - last > mergeGap) { raw.Add(new int[] { start, last }); start = y; }
      last = y;
    }
    if (start >= 0) raw.Add(new int[] { start, last });
    List<int[]> res = new List<int[]>();
    foreach (int[] b in raw) {
      if (b[1] - b[0] < minH) continue;
      int y0 = b[0], y1 = b[1];
      while (y0 > 0 && im.RowCount(y0 - 1) >= 2) y0--;          // thin tips (towers, flags)
      while (y1 < im.H - 1 && im.RowCount(y1 + 1) >= 2) y1++;
      res.Add(new int[] { y0, y1 });
    }
    return res;
  }

  public int[] ColExtent(double minFrac) {
    int x0 = -1, x1 = -1;
    for (int x = 0; x < W; x++) {
      int c = 0;
      for (int y = 0; y < H; y++) if (P[(y * W + x) * 4 + 3] > 128) c++;
      if (c >= minFrac * H) { if (x0 < 0) x0 = x; x1 = x; }
    }
    return new int[] { x0, x1 + 1 };
  }

  public Img TrimY(int thr) {
    int[] bb = BBox(thr);
    if (bb == null) return this;
    return Crop(0, bb[1], W, bb[3]);
  }

  static bool Paper(byte[] p, int o, int rmin, int gmin, int bmin, int maxRB) {
    int b = p[o], g = p[o + 1], r = p[o + 2];
    return r >= rmin && g >= gmin && b >= bmin && (r - b) <= maxRB;
  }

  // parchment left around a painted strip: remove cream that touches transparency
  public void FloodPaper(int rmin, int gmin, int bmin, int maxRB) {
    bool[] vis = new bool[W * H];
    Queue<int> q = new Queue<int>();
    for (int i = 0; i < W * H; i++) if (P[i * 4 + 3] < 8) { vis[i] = true; q.Enqueue(i); }
    int[] dx = { 1, -1, 0, 0 };
    int[] dy = { 0, 0, 1, -1 };
    while (q.Count > 0) {
      int i = q.Dequeue();
      int x = i % W, y = i / W;
      for (int k = 0; k < 4; k++) {
        int nx = x + dx[k], ny = y + dy[k];
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        int j = ny * W + nx;
        if (vis[j]) continue;
        vis[j] = true;
        // paper, or the pinkish JPEG ring between paper and the magenta backdrop
        int jb = P[j * 4], jg = P[j * 4 + 1], jr = P[j * 4 + 2];
        bool pink = (Math.Min(jr, jb) - jg) >= 28 && jr >= 120;
        if (Paper(P, j * 4, rmin, gmin, bmin, maxRB) || pink) { P[j * 4 + 3] = 0; q.Enqueue(j); }
      }
    }
  }

  // neutralise leftover magenta tint on pixels that touch transparency
  public void Despill(int radius) {
    bool[] edge = new bool[W * H];
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) {
        if (P[(y * W + x) * 4 + 3] == 0) continue;
        bool e = false;
        for (int j = -radius; j <= radius && !e; j++)
          for (int i = -radius; i <= radius; i++) {
            int nx = x + i, ny = y + j;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            if (P[(ny * W + nx) * 4 + 3] < 128) { e = true; break; }
          }
        edge[y * W + x] = e;
      }
    for (int k = 0; k < W * H; k++) {
      if (!edge[k]) continue;
      int o = k * 4;
      double b = P[o], g = P[o + 1], r = P[o + 2];
      double m = Math.Min(r, b) - g;
      if (m <= 0) continue;
      P[o] = (byte)Clamp(b - m); P[o + 2] = (byte)Clamp(r - m);
    }
  }

  // drop lines thinner than 3px (the faint outline of the paper edge)
  public void OpenAlpha() {
    bool[] m = new bool[W * H];
    for (int k = 0; k < W * H; k++) m[k] = P[k * 4 + 3] >= 128;
    bool[] er = new bool[W * H];
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) {
        bool ok = true;
        for (int j = -1; j <= 1 && ok; j++)
          for (int i = -1; i <= 1; i++) {
            int nx = x + i, ny = y + j;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            if (!m[ny * W + nx]) { ok = false; break; }
          }
        er[y * W + x] = ok;
      }
    bool[] di = new bool[W * H];
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) {
        bool any = false;
        for (int j = -1; j <= 1 && !any; j++)
          for (int i = -1; i <= 1; i++) {
            int nx = x + i, ny = y + j;
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            if (er[ny * W + nx]) { any = true; break; }
          }
        di[y * W + x] = any;
      }
    for (int k = 0; k < W * H; k++) if (!di[k]) P[k * 4 + 3] = 0;
  }

  // floating bits smaller than minArea (what is left of the paper-edge line)
  public void RemoveSpecks(int minArea) {
    bool[] seen = new bool[W * H];
    int[] dx = { 1, -1, 0, 0 };
    int[] dy = { 0, 0, 1, -1 };
    for (int s = 0; s < W * H; s++) {
      if (seen[s] || P[s * 4 + 3] < 128) continue;
      List<int> comp = new List<int>();
      Queue<int> q = new Queue<int>();
      seen[s] = true; q.Enqueue(s);
      while (q.Count > 0) {
        int i = q.Dequeue(); comp.Add(i);
        int x = i % W, y = i / W;
        for (int k = 0; k < 4; k++) {
          int nx = x + dx[k], ny = y + dy[k];
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          int j = ny * W + nx;
          if (seen[j] || P[j * 4 + 3] < 128) continue;
          seen[j] = true; q.Enqueue(j);
        }
      }
      if (comp.Count < minArea) foreach (int i in comp) P[i * 4 + 3] = 0;
    }
  }

  // fill dips in the top silhouette with ground texture (no holes between mounds)
  public void FillValleys(int win, int minDepth) {
    int[] top = new int[W];
    for (int x = 0; x < W; x++) {
      int t = H;
      for (int y = 0; y < H; y++) if (P[(y * W + x) * 4 + 3] >= 128) { t = y; break; }
      top[x] = t;
    }
    int[] tgt = new int[W];
    for (int x = 0; x < W; x++) {
      int m = top[x];
      for (int k = -win; k <= win; k++) { int xx = x + k; if (xx >= 0 && xx < W && top[xx] < m) m = top[xx]; }
      tgt[x] = m;
    }
    for (int x = 0; x < W; x++) {
      if (tgt[x] >= top[x] - minDepth || top[x] >= H) continue;
      int d = top[x] - tgt[x];
      for (int y = tgt[x]; y < top[x] + 4 && y < H; y++) {
        int sy = y + d + 30;
        int sx = x + ((y * 7 + x * 3) % 41) - 20;
        if (sx < 0) sx = 0; if (sx >= W) sx = W - 1;
        if (sy >= H) sy = H - 1;
        int so = (sy * W + sx) * 4, o = (y * W + x) * 4;
        P[o] = P[so]; P[o + 1] = P[so + 1]; P[o + 2] = P[so + 2]; P[o + 3] = 255;
      }
      for (int y = tgt[x]; y < tgt[x] + 2 && y < H; y++) {
        int o = (y * W + x) * 4;
        P[o] = 24; P[o + 1] = 42; P[o + 2] = 70; P[o + 3] = 255;
      }
    }
  }

  // cut everything above the sea line right of cutX and repeat a ship-free piece of sea there
  public void ReplaceRightWithSea(int cutX, int seaTop, int px0, int px1) {
    int pw = px1 - px0;
    for (int x = cutX; x < W; x++) {
      int k = (x - cutX) % (2 * pw);
      if (k >= pw) k = 2 * pw - 1 - k;     // ping-pong: no visible seam
      int sx = px0 + k;
      for (int y = 0; y < H; y++) {
        int o = (y * W + x) * 4;
        if (y < seaTop) { P[o + 3] = 0; continue; }
        int so = (y * W + sx) * 4;
        P[o] = P[so]; P[o + 1] = P[so + 1]; P[o + 2] = P[so + 2]; P[o + 3] = P[so + 3];
      }
    }
  }

  // one clean piece of the strip, repeated (mirror, ping-pong) over `total` px
  public Img TileMirror(int x0, int x1, int total) {
    int w = x1 - x0;
    Img o = new Img(total, H);
    for (int x = 0; x < total; x++) {
      int k = x % (2 * w);
      int sx = x0 + (k < w ? k : 2 * w - 1 - k);
      for (int y = 0; y < H; y++) Buffer.BlockCopy(P, (y * W + sx) * 4, o.P, (y * total + x) * 4, 4);
    }
    return o;
  }

  // big enclosed patches of parchment (e.g. between tree trunks)
  public void RemovePaperIslands(int rmin, int gmin, int bmin, int maxRB, int minArea) {
    bool[] seen = new bool[W * H];
    int[] dx = { 1, -1, 0, 0 };
    int[] dy = { 0, 0, 1, -1 };
    for (int s = 0; s < W * H; s++) {
      if (seen[s] || P[s * 4 + 3] < 128 || !Paper(P, s * 4, rmin, gmin, bmin, maxRB)) continue;
      List<int> comp = new List<int>();
      Queue<int> q = new Queue<int>();
      seen[s] = true; q.Enqueue(s);
      while (q.Count > 0) {
        int i = q.Dequeue(); comp.Add(i);
        int x = i % W, y = i / W;
        for (int k = 0; k < 4; k++) {
          int nx = x + dx[k], ny = y + dy[k];
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          int j = ny * W + nx;
          if (seen[j] || P[j * 4 + 3] < 128 || !Paper(P, j * 4, rmin, gmin, bmin, maxRB)) continue;
          seen[j] = true; q.Enqueue(j);
        }
      }
      if (comp.Count >= minArea) foreach (int i in comp) P[i * 4 + 3] = 0;
    }
  }

  public Img Resize(int w, int h) {
    using (Bitmap a = ToPBitmap())
    using (Bitmap b = new Bitmap(w, h, PixelFormat.Format32bppPArgb))
    using (Graphics g = Graphics.FromImage(b))
    using (ImageAttributes ia = new ImageAttributes()) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      ia.SetWrapMode(WrapMode.TileFlipXY);
      g.DrawImage(a, new Rectangle(0, 0, w, h), 0, 0, W, H, GraphicsUnit.Pixel, ia);
      return FromBitmap(b);
    }
  }

  // mirrored on both axes: tiles seamlessly in every direction
  public Img MirrorXY() {
    Img h = MirrorX();
    Img o = new Img(h.W, h.H * 2);
    for (int y = 0; y < h.H; y++) {
      Buffer.BlockCopy(h.P, y * h.W * 4, o.P, y * h.W * 4, h.W * 4);
      Buffer.BlockCopy(h.P, y * h.W * 4, o.P, (2 * h.H - 1 - y) * h.W * 4, h.W * 4);
    }
    return o;
  }

  public void SaveJpeg(string path, long quality) {
    ImageCodecInfo codec = null;
    foreach (ImageCodecInfo c in ImageCodecInfo.GetImageEncoders()) if (c.MimeType == "image/jpeg") codec = c;
    EncoderParameters ep = new EncoderParameters(1);
    ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
    using (Bitmap b = ToBitmap()) { b.Save(path, codec, ep); }
  }

  // repeat by mirroring: seamless without ghosting
  public Img MirrorX() {
    Img o = new Img(W * 2, H);
    for (int y = 0; y < H; y++)
      for (int x = 0; x < W; x++) {
        Buffer.BlockCopy(P, (y * W + x) * 4, o.P, (y * W * 2 + x) * 4, 4);
        Buffer.BlockCopy(P, (y * W + x) * 4, o.P, (y * W * 2 + (2 * W - 1 - x)) * 4, 4);
      }
    return o;
  }

  // make the strip repeat: cross-fade its right tail into its left head
  public Img SeamlessX(int ov) {
    int w2 = W - ov;
    Img o = new Img(w2, H);
    for (int y = 0; y < H; y++)
      for (int x = 0; x < w2; x++) {
        int d = (y * w2 + x) * 4;
        if (x >= ov) { Buffer.BlockCopy(P, (y * W + x) * 4, o.P, d, 4); continue; }
        double t = (double)x / ov;
        int a = (y * W + x) * 4;          // head pixel
        int b = (y * W + (w2 + x)) * 4;   // tail pixel
        double aa = P[a + 3] / 255.0, ab = P[b + 3] / 255.0;
        double pa = (1 - t) * ab + t * aa;
        if (pa < 0.003) continue;
        for (int c = 0; c < 3; c++) {
          double v = ((1 - t) * P[b + c] * ab + t * P[a + c] * aa) / pa;
          o.P[d + c] = (byte)Clamp(v);
        }
        o.P[d + 3] = (byte)Math.Round(pa * 255);
      }
    return o;
  }

  // frames of one sprite -> one strip of square frames, shared crop and scale
  public static string MakeSprite(List<Img> cells, int F, string outPath) {
    int n = cells.Count;
    int ux0 = int.MaxValue, uy0 = int.MaxValue, ux1 = -1, uy1 = -1;
    foreach (Img c in cells) {
      int[] bb = c.BBox(60);
      if (bb == null) continue;
      ux0 = Math.Min(ux0, bb[0]); uy0 = Math.Min(uy0, bb[1]);
      ux1 = Math.Max(ux1, bb[0] + bb[2]); uy1 = Math.Max(uy1, bb[1] + bb[3]);
    }
    if (ux1 < 0) return "EMPTY CELL";
    int uw = ux1 - ux0, uh = uy1 - uy0;
    double pad = 10, bottom = 6;
    double s = Math.Min((F - 2 * pad) / uw, (F - pad - bottom) / uh);
    s = Math.Min(s, 2.2);
    double dw = uw * s, dh = uh * s;
    using (Bitmap dst = new Bitmap(F * n, F, PixelFormat.Format32bppPArgb))
    using (Graphics g = Graphics.FromImage(dst)) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      g.SmoothingMode = SmoothingMode.HighQuality;
      g.CompositingQuality = CompositingQuality.HighQuality;
      for (int i = 0; i < n; i++) {
        using (Bitmap src = cells[i].ToPBitmap())
        using (ImageAttributes ia = new ImageAttributes()) {
          ia.SetWrapMode(WrapMode.TileFlipXY);
          Rectangle dr = new Rectangle((int)Math.Round(i * F + (F - dw) / 2.0), (int)Math.Round(F - bottom - dh), (int)Math.Round(dw), (int)Math.Round(dh));
          g.DrawImage(src, dr, ux0, uy0, uw, uh, GraphicsUnit.Pixel, ia);
        }
      }
      dst.Save(outPath, ImageFormat.Png);
    }
    return n + " frame(s), content " + uw + "x" + uh + " scaled x" + s.ToString("0.00");
  }
}
'@
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition $cs

# grid = rows of 4 cells, same ids as scenes.js (the same id repeated = frames)
$pages = [ordered]@{
  'home' = @{
    grid = @(
      @('hare-scribe','hare-scribe','hare-scribe','snail-castle'),
      @('bird-letter','bird-letter','bird-letter','fish-hat'),
      @('manicule','cloud-a','cloud-b','cloud-c'))
    paper = @('far','mid','ground'); loose = @('far','ground'); clean = @('far','mid','ground'); islands = @('mid'); crop = @{}
  }
  'experience' = @{
    grid = @(
      @('owl-magister','owl-magister','owl-magister','hedgehog-pupils'),
      @('','','','inkpot'),
      @('cloud-a','cloud-b','',''))
    paper = @(); crop = @{ far = @(168,1208); mid = @(214,1164) }
  }
  'research' = @{
    grid = @(
      @('cat-astrologer','cat-astrologer','cat-astrologer','star'),
      @('flying-book','flying-book','flying-book','moon'),
      @('bookworm','','',''))
    paper = @(); crop = @{}
  }
  'education' = @{
    grid = @(
      @('fox-monk','fox-monk','fox-monk','goose-cap'),
      @('bell','candle','cloud-a','cloud-b'))
    paper = @(); crop = @{}
  }
  'skills' = @{
    grid = @(
      @('dragon-interpreter','dragon-interpreter','dragon-interpreter','badger-lute'),
      @('beaver-carver','beaver-carver','beaver-carver','three-tongues'))
    paper = @(); crop = @{}
  }
  'festivals' = @{
    grid = @(
      @('bear-stilts','bear-stilts','bear-stilts','pennants'),
      @('','goat-jester','goat-jester',''),
      @('mask','mask','',''))
    paper = @(); tight = @('far','mid'); islands = @('far','mid'); seacut = @{ far = @(575,156,706,818) }; tile = @{ ground = @(480,940) }; ipar = @{ far = @(222,208,182,64,2200); mid = @(222,208,182,64,1100) }; clean = @('far','mid'); crop = @{ far = @(100,1290); mid = @(100,1292) }
  }
}

function Find-Raw($dir, $name) {
  foreach ($ext in 'png','jpg','jpeg') {
    $p = Join-Path $root "assets\art\$dir\_raw\$name.$ext"
    if (Test-Path $p) { return $p }
  }
  return $null
}

$FRAME = 320; $inset = 7
foreach ($dir in $pages.Keys) {
  if ($Only -and $Only -ne $dir) { continue }
  $cfg = $pages[$dir]
  $outDir = Join-Path $root "assets\art\$dir"
  Write-Host "== $dir"

  # ---- layers ----
  $lp = Find-Raw $dir 'land'
  if ($lp) {
    $land = [Img]::Load($lp)
    $land.KeyMagenta(70, 180)
    $bands = [Img]::Bands($land, 0.03, 12, 40)
    if ($bands.Count -ne 3) { Write-Warning "  land: found $($bands.Count) strips instead of 3, skipped"; }
    else {
      $names = 'far','mid','ground'
      for ($b = 0; $b -lt 3; $b++) {
        $n = $names[$b]; $y0 = $bands[$b][0]; $h = $bands[$b][1] - $y0 + 1
        $band = $land.Crop(0, $y0, $land.W, $h)
        $xr = $band.ColExtent(0.10) # x0, x1
        if ($cfg.crop.ContainsKey($n)) { $xr = $cfg.crop[$n] }
        $strip = $band.Crop($xr[0] + 9, 0, $xr[1] - $xr[0] - 18, $h)   # drop the ragged left/right edge
        $strip.Despill(2)
        if ($cfg.clean -contains $n) { $strip.OpenAlpha() }
        if ($cfg.tight -contains $n) { $strip.FloodPaper(233, 220, 196, 60) }
        elseif ($cfg.loose -contains $n) { $strip.FloodPaper(178, 158, 120, 80) }
        elseif ($cfg.paper -contains $n) { $strip.FloodPaper(205, 195, 160, 75) }
        if ($cfg.islands -contains $n) {
          $ip = $cfg.ipar; if ($ip -is [hashtable]) { $ip = $ip[$n] }; if (-not $ip) { $ip = @(190, 170, 135, 80, 400) }
          $strip.RemovePaperIslands($ip[0], $ip[1], $ip[2], $ip[3], $ip[4])
        }
        if ($cfg.clean -contains $n) { $strip.OpenAlpha(); $strip.RemoveSpecks(300) }
        if ($cfg.valleys -contains $n) { $strip.FillValleys(70, 35) }
        $strip = $strip.TrimY(20); $strip = $strip.Crop(0, 2, $strip.W, $strip.H - 5)   # the pink line left by the magenta edge
        if ($cfg.tile -and $cfg.tile.ContainsKey($n)) { $t = $cfg.tile[$n]; $strip = $strip.TileMirror($t[0], $t[1], $strip.W) }
        if ($cfg.seacut -and $cfg.seacut.ContainsKey($n)) { $sc = $cfg.seacut[$n]; $strip.ReplaceRightWithSea($sc[0], $sc[1], $sc[2], $sc[3]) }
        $strip.Save((Join-Path $outDir "$n.png"))
        Write-Host ("  {0}.png  {1}x{2}" -f $n, $strip.W, $strip.H)
      }
    }
  } else { Write-Warning "  no land image" }

  # ---- sprites ----
  $sp = Find-Raw $dir 'sprites'
  if ($sp) {
    $sheet = [Img]::Load($sp)
    $sheet.KeyMagenta(70, 180)
    $sheet.Despill(2)
    $cw = [int][math]::Floor($sheet.W / 4); $ch = [int][math]::Floor($sheet.H / 3)
    $grid = $cfg.grid
    for ($r = 0; $r -lt $grid.Count; $r++) {
      $row = $grid[$r]
      $ids = @(); foreach ($c in $row) { if ($c -and ($ids -notcontains $c)) { $ids += $c } }
      foreach ($id in $ids) {
        $cells = New-Object 'System.Collections.Generic.List[Img]'
        for ($c = 0; $c -lt 4; $c++) {
          if ($row[$c] -eq $id) { $cells.Add($sheet.Crop($c * $cw + $inset, $r * $ch + $inset, $cw - 2 * $inset, $ch - 2 * $inset)) }
        }
        $info = [Img]::MakeSprite($cells, $FRAME,(Join-Path $outDir "$id.png"))
        Write-Host ("  {0}.png  {1}" -f $id, $info)
      }
    }
  } else { Write-Warning "  no sprites image" }

  # ---- preview sheet ----
  if ($Preview) {
    New-Item -ItemType Directory -Force $Preview | Out-Null
    $files = @(); foreach ($n in 'far','mid','ground') { $f = Join-Path $outDir "$n.png"; if (Test-Path $f) { $files += $f } }
    $sprites = @(); foreach ($row in $cfg.grid) { foreach ($c in $row) { if ($c -and ($sprites -notcontains $c)) { $sprites += $c } } }
    $bmp = New-Object Drawing.Bitmap 1400, 1500
    $g = [Drawing.Graphics]::FromImage($bmp); $g.Clear([Drawing.ColorTranslator]::FromHtml('#7f9aa6'))
    $g.InterpolationMode = 'HighQualityBicubic'
    $y = 8
    foreach ($f in $files) {
      $im = [Drawing.Image]::FromFile($f); $h = [int](1384 * $im.Height / $im.Width)
      $g.DrawImage($im, 8, $y, 1384, $h); $im.Dispose(); $y += $h + 8
    }
    $x = 8; $rowH = 150
    foreach ($id in $sprites) {
      $f = Join-Path $outDir "$id.png"; if (-not (Test-Path $f)) { continue }
      $im = [Drawing.Image]::FromFile($f); $w = [int]($rowH * $im.Width / $im.Height)
      if ($x + $w -gt 1392) { $x = 8; $y += $rowH + 6 }
      $g.DrawImage($im, $x, $y, $w, $rowH); $im.Dispose(); $x += $w + 10
    }
    $y += $rowH + 8
    $cropH = [math]::Min($y, 1500)
    $crop = $bmp.Clone((New-Object Drawing.Rectangle(0, 0, 1400, $cropH)), $bmp.PixelFormat)
    $crop.Save((Join-Path $Preview "$dir.png"))
    $g.Dispose(); $bmp.Dispose(); $crop.Dispose()
  }
}
# ---- textures: assets/art/_raw/sky.* and water.* -> assets/art/sky.jpg, water.jpg ----
# One square picture each; the slicer trims the border and mirrors it on both
# axes so it tiles seamlessly. The site picks the files up by itself.
if ((-not $Only) -or $Only -eq 'textures') {
  foreach ($t in 'sky','water') {
    $rp = $null
    foreach ($ext in 'png','jpg','jpeg') {
      $cand = Join-Path $root "assets\art\_raw\$t.$ext"
      if (Test-Path $cand) { $rp = $cand }
    }
    if (-not $rp) { continue }
    $im = [Img]::Load($rp)
    $m = [int]($im.W * 0.04)
    $im = $im.Crop($m, $m, $im.W - 2 * $m, $im.H - 2 * $m)
    $tw = 768; $th = [int]($im.H * $tw / $im.W)
    $im = $im.Resize($tw, $th).MirrorXY()
    $im.SaveJpeg((Join-Path $root "assets\art\$t.jpg"), 84)
    Write-Host ("texture {0}.jpg  {1}x{2}" -f $t, $im.W, $im.H)
  }
}
Write-Host 'done'
