# Rebuilds the three downloadable CV PDFs (assets/cv/Byzov-CV-{en,ru,sr}.pdf)
# from the print pages (/cv/, /ru/cv/, /sr/cv/). Run after changing any text or the print styles.
#   1. start the preview server:   powershell -ExecutionPolicy Bypass -File tools/serve.ps1   (port 8150)
#   2. in another window:          powershell -ExecutionPolicy Bypass -File tools/build-cv-pdfs.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe" }
$out  = Join-Path $PSScriptRoot "..\assets\cv"
$paths = @{ en = '/cv/'; ru = '/ru/cv/'; sr = '/sr/cv/' }
foreach ($l in 'en','ru','sr') {
  Start-Process -Wait -FilePath $edge -ArgumentList "--headless=new","--user-data-dir=`"$env:TEMP\cv-pdf-profile`"","--no-first-run","--disable-gpu","--virtual-time-budget=15000","--print-to-pdf=`"$out\Byzov-CV-$l.pdf`"","--no-pdf-header-footer","http://localhost:8150$($paths[$l])"
  Write-Host ("{0}: {1} KB" -f $l, [int]((Get-Item "$out\Byzov-CV-$l.pdf").Length / 1KB))
}
