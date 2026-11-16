# Builds every page of the site in the three languages from one template:
#   /  /experience/ ...        English (the pages you edit: their <main> is the source)
#   /ru/  /ru/experience/ ...  Russian
#   /sr/  /sr/experience/ ...  Serbian
# It also writes sitemap.xml and stamps the service worker with a new version.
#
#   powershell -ExecutionPolicy Bypass -File tools/build-pages.ps1
#
# Run it after you change the markup inside <main> of an English page, a page
# title or description below, or the fonts / scripts that every page loads.
# (Texts shown on the pages live in i18n.en.js / i18n.ru.js / i18n.sr.js.)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$enc = New-Object Text.UTF8Encoding($false)
$site = 'https://saveliybyzov.github.io/cv/'
$langs = @('en', 'ru', 'sr')
$localeOf = @{ en = 'en_US'; ru = 'ru_RU'; sr = 'sr_RS' }
$imgUrl = $site + 'assets/og-image.jpg'

# key = data-page; rel = folder of the English page; art = folder of assets/art used by its scene
$pages = @(
  @{ key = 'home';       rel = '';          art = 'home';       water = $true;  og = 'profile' },
  @{ key = 'cv';         rel = 'cv/';       art = 'home';       water = $true;  og = 'website' },
  @{ key = 'experience'; rel = 'experience/'; art = 'experience'; water = $false; og = 'website' },
  @{ key = 'research';   rel = 'research/'; art = 'research';   water = $false; og = 'website' },
  @{ key = 'education';  rel = 'education/'; art = 'education'; water = $false; og = 'website' },
  @{ key = 'skillslang'; rel = 'skills/';   art = 'skills';     water = $false; og = 'website' },
  @{ key = 'festivals';  rel = 'festivals/'; art = 'festivals'; water = $true;  og = 'website' }
)

$titles = @{
  en = @{
    home = 'Savely Byzov — Linguist // EFL Teacher // Researcher'; experience = 'Experience — Savely Byzov'
    research = 'Research and publications — Savely Byzov'; education = 'Education — Savely Byzov'
    skillslang = 'Skills, languages and interests — Savely Byzov'; festivals = 'Festivals and volunteering — Savely Byzov'
    cv = 'CV — Savely Byzov' }
  ru = @{
    home = 'Савелий Бызов — лингвист // преподаватель английского // исследователь'; experience = 'Опыт работы — Савелий Бызов'
    research = 'Исследования и публикации — Савелий Бызов'; education = 'Образование — Савелий Бызов'
    skillslang = 'Навыки, языки и увлечения — Савелий Бызов'; festivals = 'Фестивали и волонтёрство — Савелий Бызов'
    cv = 'Резюме — Савелий Бызов' }
  sr = @{
    home = 'Saveliy Byzov — lingvista // nastavnik engleskog jezika // istraživač'; experience = 'Iskustvo — Saveliy Byzov'
    research = 'Istraživanja i publikacije — Saveliy Byzov'; education = 'Obrazovanje — Saveliy Byzov'
    skillslang = 'Veštine, jezici i interesovanja — Saveliy Byzov'; festivals = 'Festivali i volonterstvo — Saveliy Byzov'
    cv = 'CV — Saveliy Byzov' }
}
$descs = @{
  en = @{
    home = 'Savely Byzov — university lecturer and researcher in English language teaching, sociolinguistics, and the history of English. Belgrade, Serbia.'
    experience = 'Work experience of Savely Byzov: university lecturer, museum guide, teaching approach.'
    research = 'Research, publications and conference talks of Savely Byzov: Old English, the languages of Northern Europe, collaborative writing.'
    education = 'Education of Savely Byzov: Master''s in Pedagogy, Bachelor''s in Linguistics, additional training.'
    skillslang = 'Skills, languages and interests of Savely Byzov: teaching, interpreting, English, Russian, Norwegian.'
    festivals = 'Festival interpreting, volunteering and exhibitions of Savely Byzov.'
    cv = 'Condensed CV of Savely Byzov.' }
  ru = @{
    home = 'Савелий Бызов — преподаватель вуза и исследователь: преподавание английского, социолингвистика и история английского языка. Белград, Сербия.'
    experience = 'Опыт работы Савелия Бызова: преподаватель вуза, экскурсовод, подход к преподаванию.'
    research = 'Исследования, публикации и доклады Савелия Бызова: древнеанглийский, языки Северной Европы, совместное письмо.'
    education = 'Образование Савелия Бызова: магистратура по педагогике, бакалавриат по лингвистике, дополнительное обучение.'
    skillslang = 'Навыки, языки и увлечения Савелия Бызова: преподавание, перевод, английский, русский, норвежский.'
    festivals = 'Перевод на фестивалях, волонтёрство и выставки Савелия Бызова.'
    cv = 'Краткое резюме Савелия Бызова.' }
  sr = @{
    home = 'Saveliy Byzov — univerzitetski predavač i istraživač: nastava engleskog jezika, sociolingvistika i istorija engleskog jezika. Beograd, Srbija.'
    experience = 'Radno iskustvo Savelija Byzova: predavač na univerzitetu, vodič u muzeju, pristup nastavi.'
    research = 'Istraživanja, radovi i izlaganja Savelija Byzova: staroengleski, jezici severne Evrope, zajedničko pisanje.'
    education = 'Obrazovanje Savelija Byzova: master iz pedagogije, osnovne studije lingvistike, dodatna obuka.'
    skillslang = 'Veštine, jezici i interesovanja Savelija Byzova: nastava, prevođenje, engleski, ruski, norveški.'
    festivals = 'Prevođenje na festivalima, volontiranje i izložbe Savelija Byzova.'
    cv = 'Sažeti CV Savelija Byzova.' }
}
$imgAlt = @{ en = 'Savely Byzov: a painted medieval riverbank'; ru = 'Савелий Бызов: расписной средневековый берег реки'; sr = 'Saveliy Byzov: oslikana srednjovekovna obala reke' }

function Esc($t) { return ($t -replace '&', '&amp;' -replace '"', '&quot;' -replace '<', '&lt;') }
function Url($lang, $rel) { if ($lang -eq 'en') { return $site + $rel } else { return $site + $lang + '/' + $rel } }

# ---- the favicon is kept from the current home page ----
$oldHome = [IO.File]::ReadAllText((Join-Path $root 'index.html'), $enc)
$icon = [regex]::Match($oldHome, '<link rel="icon" href="[^"]+">').Value
if (-not $icon) { throw 'favicon link not found in index.html' }

# ---- the <main> of every English page is the source of the markup ----
$mains = @{}
foreach ($pg in $pages) {
  $file = Join-Path $root ($pg.rel + 'index.html')
  if (Test-Path $file) {
    $html = [IO.File]::ReadAllText($file, $enc).Replace("`r`n", "`n")
    $m = [regex]::Match($html, '(?s)<main class="wrap" id="main">(.*?)</main>')
    if (-not $m.Success) { throw "no <main class=`"wrap`" id=`"main`"> in $file" }
    $mains[$pg.key] = $m.Groups[1].Value
  } else { $mains[$pg.key] = "`n" }
}

$template = @'
<!DOCTYPE html>
<html lang="{{LANG}}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<meta name="description" content="{{DESC}}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#1e4aa3">
<link rel="canonical" href="{{URL}}">
{{ALTERNATES}}
{{ICON}}
<meta property="og:type" content="{{OGTYPE}}">
<meta property="og:title" content="{{TITLE}}">
<meta property="og:description" content="{{DESC}}">
<meta property="og:url" content="{{URL}}">
<meta property="og:image" content="{{IMG}}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{IMGALT}}">
<meta property="og:locale" content="{{LOCALE}}">
{{OGALT}}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{TITLE}}">
<meta name="twitter:description" content="{{DESC}}">
<meta name="twitter:image" content="{{IMG}}">
{{JSONLD}}<script>{{BOOT}}</script>
<link rel="stylesheet" href="{{ROOT}}fonts.css">
{{FONTPRELOAD}}
<link rel="stylesheet" href="{{ROOT}}style.css">
{{PRELOAD}}
</head>
<body data-page="{{PAGE}}" data-root="{{ROOT}}" data-lang="{{LANG}}">

<main class="wrap" id="main">{{MAIN}}</main>

<script src="{{ROOT}}i18n.base.js"></script>
<script src="{{ROOT}}i18n.{{LANG}}.js"></script>
<script src="{{ROOT}}scenes.js"></script>
<script src="{{ROOT}}facts.js"></script>
<script src="{{ROOT}}sound.js"></script>
<script src="{{ROOT}}app.js"></script>
</body>
</html>
'@.Replace("`r`n", "`n")

$count = 0
foreach ($pg in $pages) {
  foreach ($lang in $langs) {
    $depth = ($pg.rel.Split('/', [StringSplitOptions]::RemoveEmptyEntries)).Count + $(if ($lang -eq 'en') { 0 } else { 1 })
    $rootRel = '../' * $depth
    $url = Url $lang $pg.rel

    # alternates (hreflang)
    $alts = New-Object System.Collections.Generic.List[string]
    foreach ($l in $langs) { $alts.Add('<link rel="alternate" hreflang="' + $l + '" href="' + (Url $l $pg.rel) + '">') }
    $alts.Add('<link rel="alternate" hreflang="x-default" href="' + (Url 'en' $pg.rel) + '">')
    $ogAlt = ($langs | Where-Object { $_ -ne $lang } | ForEach-Object { '<meta property="og:locale:alternate" content="' + $localeOf[$_] + '">' }) -join "`n"

    # structured data: the person, on the title pages
    $jsonld = ''
    if ($pg.key -eq 'home') {
      $jsonld = @"
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "$(if ($lang -eq 'ru') { 'Савелий Бызов' } else { 'Savely Byzov' })",
  "url": "$url",
  "image": "$($site)assets/Byzov-S.S_.jpg",
  "jobTitle": "University Lecturer",
  "email": "mailto:hello@saveliybyzov.ru",
  "telephone": "+381638389596",
  "address": { "@type": "PostalAddress", "addressLocality": "Belgrade", "addressCountry": "RS" },
  "affiliation": { "@type": "CollegeOrUniversity", "name": "Northern Arctic Federal University" },
  "knowsLanguage": ["en", "ru", "no"],
  "sameAs": ["https://t.me/savageavery"]
}
</script>

"@
    }

    # first-paint script: day/night, text size, and (English pages only) the language the visitor chose or speaks
    $boot = "(function(){try{var d=document.documentElement,t=localStorage.getItem('sb-time');"
    if ($pg.key -eq 'research') { $boot += "t='night';" }
    $boot += "if(t==='night')d.setAttribute('data-time','night');var f=localStorage.getItem('sb-fontsize');if(f)d.setAttribute('data-fontsize',f);"
    if ($lang -eq 'en' -and $pg.key -ne 'cv') {
      $boot += "var l=localStorage.getItem('sb-lang');if(!l){var n=((navigator.languages&&navigator.languages[0])||navigator.language||'en').toLowerCase();l=n.indexOf('ru')===0?'ru':(/^(sr|hr|bs)/.test(n)?'sr':'en');localStorage.setItem('sb-lang',l);}"
      $boot += "if(l==='ru'||l==='sr'){location.replace('" + $rootRel + "'+l+'/" + $pg.rel + "'+location.search+location.hash);}"
    }
    $boot += "}catch(e){}})();"

    # fonts the first paint needs
    $fontFiles = switch ($lang) {
      'ru' { @('alegreya-n400-cyrillic', 'ruslandisplay-n400-cyrillic', 'alegreya-n400-latin') }
      'sr' { @('alegreya-n400-latin', 'alegreya-n400-latin-ext', 'grenzegotisch-n500-latin') }
      default { @('alegreya-n400-latin', 'grenzegotisch-n500-latin') }
    }
    $fontPre = ($fontFiles | ForEach-Object { '<link rel="preload" as="font" href="' + $rootRel + 'assets/fonts/' + $_ + '.woff2" type="font/woff2" crossorigin>' }) -join "`n"

    # the pictures of this page's scene
    $pre = New-Object System.Collections.Generic.List[string]
    foreach ($n in 'far', 'mid', 'ground') { $pre.Add('<link rel="preload" as="image" href="' + $rootRel + 'assets/art/' + $pg.art + '/' + $n + '.webp" type="image/webp">') }
    $pre.Add('<link rel="preload" as="image" href="' + $rootRel + 'assets/art/sky.webp" type="image/webp">')
    if ($pg.water) { $pre.Add('<link rel="preload" as="image" href="' + $rootRel + 'assets/art/water.webp" type="image/webp">') }

    # the markup of <main>: the same in every language; relative links get one more '../' under /ru/ and /sr/
    $main = $mains[$pg.key]
    if ($lang -ne 'en') { $main = [regex]::Replace($main, '(src|href)="\.\./', '$1="../../') }

    $out = $template
    $map = [ordered]@{
      '{{LANG}}' = $lang; '{{TITLE}}' = (Esc $titles[$lang][$pg.key]); '{{DESC}}' = (Esc $descs[$lang][$pg.key]); '{{URL}}' = $url
      '{{ALTERNATES}}' = ($alts -join "`n"); '{{ICON}}' = $icon; '{{OGTYPE}}' = $pg.og; '{{IMG}}' = $imgUrl; '{{IMGALT}}' = (Esc $imgAlt[$lang])
      '{{LOCALE}}' = $localeOf[$lang]; '{{OGALT}}' = $ogAlt; '{{JSONLD}}' = $jsonld; '{{BOOT}}' = $boot; '{{ROOT}}' = $rootRel
      '{{FONTPRELOAD}}' = $fontPre; '{{PRELOAD}}' = ($pre -join "`n"); '{{PAGE}}' = $pg.key
    }
    foreach ($k in $map.Keys) { $out = $out.Replace($k, [string]$map[$k]) }
    $out = $out.Replace('{{MAIN}}', $main)

    $dest = if ($lang -eq 'en') { Join-Path $root ($pg.rel + 'index.html') } else { Join-Path $root ($lang + '\' + ($pg.rel -replace '/', '\') + 'index.html') }
    New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
    [IO.File]::WriteAllText($dest, $out, $enc)
    $count++
  }
}
Write-Host "pages written: $count"

# ---- sitemap ----
$today = Get-Date -Format 'yyyy-MM-dd'
$sm = New-Object System.Text.StringBuilder
[void]$sm.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sm.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')
foreach ($pg in ($pages | Where-Object { $_.key -ne 'cv' })) {
  foreach ($lang in $langs) {
    [void]$sm.AppendLine('  <url>')
    [void]$sm.AppendLine('    <loc>' + (Url $lang $pg.rel) + '</loc>')
    foreach ($l in $langs) { [void]$sm.AppendLine('    <xhtml:link rel="alternate" hreflang="' + $l + '" href="' + (Url $l $pg.rel) + '"/>') }
    [void]$sm.AppendLine('    <xhtml:link rel="alternate" hreflang="x-default" href="' + (Url 'en' $pg.rel) + '"/>')
    [void]$sm.AppendLine('    <lastmod>' + $today + '</lastmod>')
    [void]$sm.AppendLine('    <changefreq>monthly</changefreq>')
    [void]$sm.AppendLine('    <priority>' + $(if ($pg.key -eq 'home') { '1.0' } else { '0.8' }) + '</priority>')
    [void]$sm.AppendLine('  </url>')
  }
}
[void]$sm.AppendLine('</urlset>')
[IO.File]::WriteAllText((Join-Path $root 'sitemap.xml'), $sm.ToString(), $enc)
Write-Host 'sitemap.xml written'

# ---- stamp the service worker ----
$swp = Join-Path $root 'sw.js'
$sw = [IO.File]::ReadAllText($swp, $enc)
$stamp = Get-Date -Format 'yyyyMMddHHmm'
$sw = [regex]::Replace($sw, "const VERSION = '[^']*';", "const VERSION = '$stamp';")
[IO.File]::WriteAllText($swp, $sw, $enc)
Write-Host "service worker version: $stamp"
