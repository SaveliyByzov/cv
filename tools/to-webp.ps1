# Turns the sliced PNGs (and the textures and the big photos) into WebP, which is
# about four times smaller. Run it after tools/slice-art.ps1:
#   powershell -ExecutionPolicy Bypass -File tools/to-webp.ps1
# It starts a small local server (port 8151) and opens a page in your default
# browser; the browser does the conversion, the server saves the files, and the
# script ends when the page says it is done. No extra software is needed.
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Write-Host 'Converting in your browser... (a page opens; it closes the server itself when done)'
Start-Process 'http://localhost:8151/tools/convert-webp.html'
& (Join-Path $PSScriptRoot 'serve.ps1') -Port 8151 -AllowSave
Write-Host 'Done. The .webp files are next to the originals; the site uses the .webp ones.'
