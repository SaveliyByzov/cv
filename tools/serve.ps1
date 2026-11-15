# Serves the site folder at http://localhost:8150/ for local preview
# (and for tools/build-cv-pdfs.ps1). No Python or Node needed.
#   powershell -ExecutionPolicy Bypass -File tools/serve.ps1
param([int]$Port = 8150)
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
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
      $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
      if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 403 }
      else {
        if (Test-Path $path -PathType Container) {
          if (-not $ctx.Request.Url.AbsolutePath.EndsWith('/')) {
            $res.StatusCode = 301; $res.RedirectLocation = $ctx.Request.Url.AbsolutePath + '/'; $path = $null
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
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
          } else { $res.StatusCode = 404 }
        }
      }
    } catch { try { $res.StatusCode = 500 } catch {} }
    finally { try { $res.Close() } catch {} }
  }
} finally { $listener.Stop() }
