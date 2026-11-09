# Rebuilds the three downloadable CV PDFs (assets/cv/Byzov-CV-{en,ru,sr}.pdf)
# from the /cv/ print page. Run after changing any text or the print styles.
#   1. serve the repo folder:   python -m http.server 8150
#   2. in another window:       powershell -ExecutionPolicy Bypass -File tools/build-cv-pdfs.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out  = Join-Path $PSScriptRoot "..\assets\cv"
foreach ($l in 'en','ru','sr') {
  Start-Process -Wait -FilePath $edge -ArgumentList "--headless=new","--disable-gpu","--virtual-time-budget=12000",
    "--print-to-pdf=$out\Byzov-CV-$l.pdf","--no-pdf-header-footer","http://localhost:8150/cv/?lang=$l"
}
