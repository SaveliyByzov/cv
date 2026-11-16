# Serves the site folder at http://localhost:8150/ for local preview
# (and for tools/build-cv-pdfs.ps1). No Python or Node needed.
#   powershell -ExecutionPolicy Bypass -File tools/serve.ps1
#
# With -AllowSave the server also accepts PUT /__save/assets/...webp (only
# there, only .webp) and stops on GET /__done. That is what tools/to-webp.ps1
# uses: the browser converts the pictures, this server stores them.
param([int]$Port = 8150, [switch]$AllowSave)
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$types = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.json'='application/json'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'
  '.webp'='image/webp'; '.gif'='image/gif'; '.pdf'='application/pdf'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'
  '.ico'='image/x-icon'; '.woff2'='font/woff2'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/  (Ctrl+C to stop)"
$stop = $false
try {
  while ($listener.IsListening -and -not $stop) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $req = $ctx.Request
      $urlPath = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
      if ($AllowSave -and $urlPath -eq '/__done') {
        $res.StatusCode = 200; $stop = $true
      }
      elseif ($AllowSave -and $req.HttpMethod -eq 'PUT' -and $urlPath.StartsWith('/__save/')) {
        $rel = $urlPath.Substring(8)
        $dest = [IO.Path]::GetFullPath((Join-Path $root ($rel -replace '/','\')))
        $ok = $dest.StartsWith((Join-Path $root 'assets\'), [StringComparison]::OrdinalIgnoreCase) -and ($dest.EndsWith('.webp') -or $dest.EndsWith('.jpg'))
        if (-not $ok) { $res.StatusCode = 403 }
        else {
          New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
          $ms = New-Object IO.MemoryStream
          $req.InputStream.CopyTo($ms)
          [IO.File]::WriteAllBytes($dest, $ms.ToArray())
          $res.StatusCode = 200
        }
      }
      else {
        $rel = $urlPath.TrimStart('/')
        $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
        if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 403 }
        else {
          if (Test-Path $path -PathType Container) {
            if (-not $urlPath.EndsWith('/')) {
              $res.StatusCode = 301; $res.RedirectLocation = $urlPath + '/'; $path = $null
            } else { $path = Join-Path $path 'index.html' }
          }
          if ($path) {
            if (Test-Path $path -PathType Leaf) {
              $bytes = [IO.File]::ReadAllBytes($path)
              $ext = [IO.Path]::GetExtension($path).ToLower()
              $ct = $types[$ext]; if (-not $ct) { $ct = 'application/octet-stream' }
              $res.ContentType = $ct
              $res.Headers['Cache-Control'] = 'no-store'
              $res.ContentLength64 = $bytes.Length
              if ($req.HttpMethod -ne 'HEAD') { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
            } else { $res.StatusCode = 404 }
          }
        }
      }
    } catch { try { $res.StatusCode = 500 } catch {} }
    finally { try { $res.Close() } catch {} }
  }
} finally { $listener.Stop() }
