# Cuts the decoration sheets (assets/art/extras/_raw/*.jpg) into single files:
#   kit.jpg        4x3 grid, magenta background: frames, ribbons, seals, bookmark, ...
#   ornaments.jpg  4x3 grid, magenta background: dividers, corners, marginal creatures
#   night.jpg      cells 176x192, 4x2 grid at the top left (magenta) and 4 textures below
#   map.jpg        one picture
# Output: assets/art/extras/<name>.png (transparent, trimmed) and <name>.jpg (textures).
# Then run tools/to-webp.ps1 (it converts the files listed in tools/convert-webp.html).
#   powershell -ExecutionPolicy Bypass -File tools/slice-extras.ps1
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$out  = Join-Path $root 'assets\art\extras'
$raw  = Join-Path $out '_raw'
Add-Type -AssemblyName System.Drawing

$cs = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public class Px {
  public int W, H; public byte[] P;
  public Px(int w, int h) { W = w; H = h; P = new byte[w * h * 4]; }
  public static Px Load(string path) {
    using (Bitmap s = new Bitmap(path))
    using (Bitmap b = new Bitmap(s.Width, s.Height, PixelFormat.Format32bppArgb)) {
      using (Graphics g = Graphics.FromImage(b)) g.DrawImage(s, 0, 0, s.Width, s.Height);
      Px o = new Px(b.Width, b.Height);
      BitmapData d = b.LockBits(new Rectangle(0, 0, b.Width, b.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
      for (int y = 0; y < b.Height; y++) Marshal.Copy(new IntPtr(d.Scan0.ToInt64() + (long)y * d.Stride), o.P, y * b.Width * 4, b.Width * 4);
      b.UnlockBits(d); return o;
    }
  }
  public Bitmap ToBitmap() {
    Bitmap b = new Bitmap(W, H, PixelFormat.Format32bppArgb);
    BitmapData d = b.LockBits(new Rectangle(0, 0, W, H), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
    for (int y = 0; y < H; y++) Marshal.Copy(P, y * W * 4, new IntPtr(d.Scan0.ToInt64() + (long)y * d.Stride), W * 4);
    b.UnlockBits(d); return b;
  }
  public Px Crop(int x, int y, int w, int h) {
    Px o = new Px(w, h);
    for (int j = 0; j < h; j++) Buffer.BlockCopy(P, ((y + j) * W + x) * 4, o.P, j * w * 4, w * 4);
    return o;
  }
  static double Cl(double v) { return v < 0 ? 0 : (v > 255 ? 255 : v); }
  public void Key(double lo, double hi) {
    for (int i = 0; i < W * H; i++) {
      int o = i * 4; double b = P[o], g = P[o + 1], r = P[o + 2];
      double m = Math.Min(r, b) - g;
      double a = m <= lo ? 1.0 : (m >= hi ? 0.0 : 1.0 - (m - lo) / (hi - lo));
      if (a <= 0.05) { P[o] = P[o + 1] = P[o + 2] = P[o + 3] = 0; continue; }
      if (a < 0.999) { r = Cl((r - (1 - a) * 255) / a); g = Cl(g / a); b = Cl((b - (1 - a) * 255) / a); P[o] = (byte)b; P[o + 1] = (byte)g; P[o + 2] = (byte)r; }
      P[o + 3] = (byte)Math.Round(a * 255);
    }
  }
  // remove the magenta tint on edge pixels
  public void Despill() {
    bool[] edge = new bool[W * H];
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      if (P[(y * W + x) * 4 + 3] == 0) continue;
      bool e = false;
      for (int j = -2; j <= 2 && !e; j++) for (int i = -2; i <= 2; i++) {
        int nx = x + i, ny = y + j; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        if (P[(ny * W + nx) * 4 + 3] < 128) { e = true; break; }
      }
      edge[y * W + x] = e;
    }
    for (int k = 0; k < W * H; k++) {
      if (!edge[k]) continue; int o = k * 4;
      double b = P[o], g = P[o + 1], r = P[o + 2], m = Math.Min(r, b) - g; if (m <= 0) continue;
      P[o] = (byte)Cl(b - m); P[o + 2] = (byte)Cl(r - m);
    }
  }
  public int[] BBox(int thr) {
    int x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) if (P[(y * W + x) * 4 + 3] >= thr) {
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    return x1 < 0 ? null : new int[] { x0, y0, x1 - x0 + 1, y1 - y0 + 1 };
  }
  public Px Resize(int w, int h) {
    using (Bitmap a = ToBitmap())
    using (Bitmap b = new Bitmap(w, h, PixelFormat.Format32bppArgb))
    using (Graphics g = Graphics.FromImage(b)) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic; g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      g.CompositingMode = CompositingMode.SourceCopy;
      using (ImageAttributes ia = new ImageAttributes()) { ia.SetWrapMode(WrapMode.TileFlipXY); g.DrawImage(a, new Rectangle(0, 0, w, h), 0, 0, W, H, GraphicsUnit.Pixel, ia); }
      Px o = new Px(w, h);
      BitmapData d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
      for (int y = 0; y < h; y++) Marshal.Copy(new IntPtr(d.Scan0.ToInt64() + (long)y * d.Stride), o.P, y * w * 4, w * 4);
      b.UnlockBits(d); return o;
    }
  }
  public Px MirrorXY() {
    Px o = new Px(W * 2, H * 2);
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      for (int k = 0; k < 4; k++) {
        int sx = (k & 1) == 0 ? x : 2 * W - 1 - x, sy = (k & 2) == 0 ? y : 2 * H - 1 - y;
        Buffer.BlockCopy(P, (y * W + x) * 4, o.P, (sy * 2 * W + sx) * 4, 4);
      }
    }
    return o;
  }
  // centred on a square canvas (sprites of the site are square frames)
  public Px Square() {
    int s = Math.Max(W, H); Px o = new Px(s, s);
    int ox = (s - W) / 2, oy = (s - H) / 2;
    for (int y = 0; y < H; y++) Buffer.BlockCopy(P, y * W * 4, o.P, ((y + oy) * s + ox) * 4, W * 4);
    return o;
  }
  public void SavePng(string path) { using (Bitmap b = ToBitmap()) b.Save(path, ImageFormat.Png); }
  public void SaveJpg(string path, long q) {
    ImageCodecInfo codec = null; foreach (ImageCodecInfo c in ImageCodecInfo.GetImageEncoders()) if (c.MimeType == "image/jpeg") codec = c;
    EncoderParameters ep = new EncoderParameters(1); ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, q);
    using (Bitmap src = ToBitmap()) using (Bitmap b = new Bitmap(W, H, PixelFormat.Format24bppRgb)) {
      using (Graphics g = Graphics.FromImage(b)) { g.Clear(Color.White); g.DrawImage(src, 0, 0, W, H); }
      b.Save(path, codec, ep);
    }
  }
}
'@
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition $cs

# trimmed transparent piece, longest side scaled to at most $max px
function Cut($img, $x, $y, $w, $h, $name, $max) {
  $c = $img.Crop($x, $y, $w, $h)
  $bb = $c.BBox(60)
  if (-not $bb) { Write-Warning "$name is empty"; return }
  $pad = 2
  $c = $c.Crop([math]::Max(0, $bb[0] - $pad), [math]::Max(0, $bb[1] - $pad), [math]::Min($c.W - [math]::Max(0, $bb[0] - $pad), $bb[2] + 2 * $pad), [math]::Min($c.H - [math]::Max(0, $bb[1] - $pad), $bb[3] + 2 * $pad))
  $s = [math]::Min(1.0, $max / [math]::Max($c.W, $c.H))
  if ($s -lt 1) { $c = $c.Resize([int]($c.W * $s), [int]($c.H * $s)) }
  if ($name -in 'bat','firefly') { $c = $c.Square() }   # used as sprites: square frame
  $c.SavePng((Join-Path $out "$name.png"))
  Write-Host ("  {0}.png {1}x{2}" -f $name, $c.W, $c.H)
}

function Grid($file, $names, $cols, $rows, $cw, $ch, $max) {
  $img = [Px]::Load((Join-Path $raw $file)); $img.Key(70, 180); $img.Despill()
  $inset = 9
  for ($r = 0; $r -lt $rows; $r++) { for ($c = 0; $c -lt $cols; $c++) {
    $n = $names[$r * $cols + $c]; if (-not $n) { continue }
    Cut $img ($c * $cw + $inset) ($r * $ch + $inset) ($cw - 2 * $inset) ($ch - 2 * $inset) $n $max
  } }
}

Write-Host '== kit'
$k = [Px]::Load((Join-Path $raw 'kit.jpg'))
Grid 'kit.jpg' @('frame-blue','frame-red','frame-green','frame-plain','ribbon-red','ribbon-blue','seal-red','seal-green','bookmark','inkwell','scroll','manicule') 4 3 ([int]($k.W / 4)) ([int]($k.H / 3)) 420
Write-Host '== ornaments'
$o = [Px]::Load((Join-Path $raw 'ornaments.jpg'))
Grid 'ornaments.jpg' @('div-vine','div-knot','div-arch','div-snail','corner-vine','corner-dragon','corner-oak','corner-bird','rabbit-snail','duck-monk','cock-snake','knight-goat') 4 3 ([int]($o.W / 4)) ([int]($o.H / 3)) 420

Write-Host '== night'
$n = [Px]::Load((Join-Path $raw 'night.jpg'))
# the 8 cells (4 x 2) fill the left half of the top half: 176 x 192 each
$nk = $n.Crop(0, 0, 704, 384); $nk.Key(70, 180); $nk.Despill()
$names = @('moon','lantern','bat','candle','firefly','stars','owl-branch','cat')
for ($i = 0; $i -lt 8; $i++) {
  $c = $i % 4; $r = [math]::Floor($i / 4)
  Cut $nk ($c * 176 + 6) ($r * 192 + 6) (176 - 12) (192 - 12) $names[$i] 300
}
# textures: 4 squares along the bottom half (352 x 384 each), mirrored so they tile
$tex = @('parchment','parchment-ink','wood','stone')
for ($i = 0; $i -lt 4; $i++) {
  $t = $n.Crop($i * 352 + 8, 384 + 8, 352 - 16, 384 - 16)
  $t = $t.Resize(344 * 1, 368).MirrorXY()
  $t.SaveJpg((Join-Path $out ("tex-" + $tex[$i] + ".jpg")), 80)
  Write-Host ("  tex-{0}.jpg {1}x{2}" -f $tex[$i], $t.W, $t.H)
}

# ---------- second batch ----------
function GridRows($file, $names, $cols, $bounds, $cw, $max) {
  $img = [Px]::Load((Join-Path $raw $file)); $img.Key(70, 180); $img.Despill()
  $inset = 9
  for ($r = 0; $r -lt $bounds.Count; $r++) { for ($c = 0; $c -lt $cols; $c++) {
    $n = $names[$r * $cols + $c]; if (-not $n) { continue }
    $y0 = $bounds[$r][0]; $h = $bounds[$r][1] - $bounds[$r][0]
    Cut $img ($c * $cw + $inset) ($y0 + $inset) ($cw - 2 * $inset) ($h - 2 * $inset) $n $max
  } }
}
Write-Host '== scrolls'
$k = [Px]::Load((Join-Path $raw 'scrolls.jpg'))
Grid 'scrolls.jpg' @('scroll-wide','scroll-hang','note-pin','vellum','manicule-r','manicule-l','fleur','rosette','quill','quill-drop','lens','cursor-hand') 4 3 ([int]($k.W / 4)) ([int]($k.H / 3)) 420
Write-Host '== ribbons'
GridRows 'ribbons.jpg' @('ribbon-red','ribbon-blue','ribbon-green','ribbon-gold','tag-scroll','tag-hang','tag-red','tag-blue','wax-red','wax-green','wax-gold','wax-blue') 4 @(@(0,447),@(447,623),@(623,896)) 300 420
Write-Host '== photo frames'
Grid 'photoframes.jpg' @('pframe-portrait-blue','pframe-portrait-red','pframe-land-green','pframe-land-gold') 2 2 512 512 700
Write-Host '== monograms'
Grid 'mono.jpg' @('mono-blue','mono-red','mono-green','mono-gold') 2 2 512 512 512
Write-Host '== initials'
$k = [Px]::Load((Join-Path $raw 'initials.jpg'))
Grid 'initials.jpg' @('ini-1','ini-2','ini-3','ini-4','ini-5','ini-6','ini-7','ini-8','ini-9','ini-10','ini-11','ini-12') 4 3 ([int]($k.W / 4)) ([int]($k.H / 3)) 300
Write-Host 'done 2'
