/* Shared behaviour for every page of the site.
   Each page is a thin shell (<body data-page data-root>); this script builds the
   common chrome (language bar, header, section nav, footer, lightbox), then fills
   the page from the trilingual T object in i18n.js. */
(function(){
'use strict';

const BODY = document.body;
const PAGE = BODY.dataset.page;            // home | experience | research | education | skillslang | festivals | cv
const ROOT = BODY.dataset.root || '';      // '' on the home page, '../' one level down
const $ = function(id){ return document.getElementById(id); };
const NAV = [
  ['experience', 'experience/'],
  ['research',   'research/'],
  ['education',  'education/'],
  ['skillslang', 'skills/'],
  ['festivals',  'festivals/']
];

/* ---------- chrome ---------- */
const LANGBAR =
  '<div class="langbar">' +
    '<div class="lang-group" role="group" aria-label="Language">' +
      '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
      '<button type="button" data-lang="ru" aria-pressed="false">RU</button>' +
      '<button type="button" data-lang="sr" aria-pressed="false">SR</button>' +
    '</div>' +
    '<span class="langbar-divider" aria-hidden="true"></span>' +
    '<div class="size-group" role="group" aria-label="Text size">' +
      '<button type="button" class="size-btn" data-size="normal" aria-pressed="true" aria-label="Normal text size">A</button>' +
      '<button type="button" class="size-btn" data-size="large" aria-pressed="false" aria-label="Large text size">A</button>' +
      '<button type="button" class="size-btn" data-size="xlarge" aria-pressed="false" aria-label="Extra-large text size">A</button>' +
    '</div>' +
  '</div>';

const HERO =
  '<header class="band reveal">' +
    '<div class="band-inner"><div class="band-main">' +
      '<figure class="plate">' +
        '<img class="photo" id="photo" src="' + ROOT + 'assets/Byzov-S.S_.jpg" width="426" height="640" alt="" decoding="async" fetchpriority="high">' +
        '<figcaption id="plate-caption" aria-hidden="true"></figcaption>' +
      '</figure>' +
      '<div class="band-text">' +
        '<p class="topline" id="topline"></p>' +
        '<h1 class="name" id="name"></h1>' +
        '<p class="role" id="role"></p>' +
      '</div>' +
    '</div></div>' +
  '</header>';

const COMPACT =
  '<header class="band compact reveal">' +
    '<div class="band-inner"><div class="band-text">' +
      '<p class="name"><a href="' + (ROOT || './') + '" id="name"></a></p>' +
      '<p class="role" id="role"></p>' +
    '</div></div>' +
  '</header>';

const LEDE =
  '<div class="lede reveal">' +
    '<nav class="contacts" aria-label="Contact">' +
      '<a href="mailto:hello@saveliybyzov.ru">hello@saveliybyzov.ru</a>' +
      '<a href="https://t.me/savageavery">Telegram <span>@savageavery</span></a>' +
      '<a href="tel:+381658389596">+381 65 8389596</a>' +
      '<a class="print-btn" id="cv-btn" href="' + ROOT + 'assets/cv/Byzov-CV-en.pdf" download>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>' +
        '<span id="print-label"></span>' +
      '</a>' +
    '</nav>' +
    '<p class="intro" id="intro"></p>' +
  '</div>';

const HOME_BODY =
  '<div class="rule home-rule"></div>' +
  '<dl class="now">' +
    '<dt id="now-label"></dt><dd id="now-text"></dd>' +
    '<dt id="open-label"></dt><dd id="open-text"></dd>' +
  '</dl>' +
  '<div class="rule home-rule"></div>' +
  '<ul class="home-grid" id="home-grid">' +
    NAV.map(function(n, i){
      return '<li><a class="home-card" href="' + n[1] + '"><span class="num">' + (i + 1) + '</span>' +
             '<h3 id="card-' + n[0] + '-t"></h3><p id="card-' + n[0] + '-d"></p></a></li>';
    }).join('') +
  '</ul>';

const TABBAR =
  '<nav class="tabbar" aria-label="Sections">' +
    NAV.map(function(n, i){
      return '<a href="' + ROOT + n[1] + '" data-nav="' + n[0] + '" aria-keyshortcuts="' + (i + 1) + '"' +
             (PAGE === n[0] ? ' aria-current="page"' : '') + '>' +
             '<span id="tab-' + n[0] + '"></span><kbd class="chip" aria-hidden="true">' + (i + 1) + '</kbd></a>';
    }).join('') +
  '</nav>';

const FOOTER =
  '<p class="print-note" id="print-note"></p>' +
  '<footer><span id="footer-text"></span><a href="mailto:hello@saveliybyzov.ru">hello@saveliybyzov.ru</a></footer>';

const main = $('main');
BODY.insertAdjacentHTML('afterbegin', LANGBAR);
if (PAGE === 'home' || PAGE === 'cv') {
  main.insertAdjacentHTML('beforebegin', HERO);
  main.insertAdjacentHTML('afterbegin', LEDE);
  if (PAGE === 'home') main.insertAdjacentHTML('beforeend', HOME_BODY);
} else {
  main.insertAdjacentHTML('beforebegin', COMPACT);
  main.insertAdjacentHTML('afterbegin', TABBAR);
}
main.insertAdjacentHTML('beforeend', FOOTER);
main.insertAdjacentHTML('afterend',
  '<img class="flora-foot" src="' + ROOT + 'assets/arches.svg" alt="" aria-hidden="true" width="1200" height="560">' +
  '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview" tabindex="-1"><img src="" alt=""></div>' +
  '<button type="button" class="back-to-top" id="back-to-top" aria-label="Back to top">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>' +
  '</button>');

/* ---------- filling ---------- */
function setText(id, value){ const el = $(id); if (el && value != null) el.textContent = value; }
function setHTML(id, value){ const el = $(id); if (el && value != null) el.innerHTML = value; }

function applyLang(lang){
  const t = T[lang];
  document.documentElement.lang = lang;

  setText('topline', t.topline);
  setText('name', t.name);
  setText('role', t.role);
  setText('intro', t.intro);
  if ($('photo')) $('photo').alt = t.photoAlt;
  setText('plate-caption', t.plateCaption);
  setText('print-label', t.cvLabel);
  setText('print-note', t.printNote);
  setText('footer-text', t.footer);
  $('back-to-top').setAttribute('aria-label', t.backToTop);
  const cv = $('cv-btn');
  if (cv) cv.href = ROOT + 'assets/cv/Byzov-CV-' + lang + '.pdf';

  /* section nav */
  setHTML('tab-experience', t.labels.experience);
  setHTML('tab-research', t.labels.research);
  setHTML('tab-education', t.labels.education);
  setHTML('tab-skillslang', t.labels.skillslang);
  setHTML('tab-festivals', t.labels.festivals);

  /* home */
  setText('now-label', t.labels.now);
  setText('now-text', t.now);
  setText('open-label', t.labels.openTo);
  setText('open-text', t.openTo);
  NAV.forEach(function(n){
    setHTML('card-' + n[0] + '-t', t.labels[n[0]]);
    setText('card-' + n[0] + '-d', t.cards[n[0]]);
  });

  /* sub-labels and prose */
  ['activity', 'publications', 'talks', 'training', 'skills', 'languages', 'interests',
   'research', 'teaching', 'interpreting'].forEach(function(k){ setHTML('sub-' + k, t.labels[k]); });
  setText('research-text', t.research);
  setText('teaching-text', t.teaching);
  setText('interpreting-text', t.interpreting);

  fillEntry('exp1', t.exp1);
  fillEntry('exp2', t.exp2);
  fillEdu('edu1', t.edu1);
  fillEdu('edu2', t.edu2);
  fillList('activity', t.activity);
  fillList('training', t.training);
  fillPubs('publications', t.publications, PUB_FILES, t.readPdf);
  fillPubs('talks', t.talks, TALK_FILES, t.viewSlides);
  if ($('campus-img')) { $('campus-img').alt = t.campusAlt; setText('campus-caption', t.campusCaption); }
  fillLangs(t.langs);
  fillSpecs('skills', t.skills);
  fillSpecs('interests', t.interests);
  ['festA', 'festB', 'festC', 'festD'].forEach(function(k){ fillFest(k, t[k]); });

  document.querySelectorAll('.lang-group button').forEach(function(b){
    const isActive = b.dataset.lang === lang;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', String(isActive));
  });
  try { localStorage.setItem('sb-lang', lang); } catch(e){}
}

function fillEntry(id, data){
  if (!document.getElementById(id + '-title')) return;
  document.getElementById(id + '-title').textContent = data.title.replace(/&rsquo;/g, '’');
  document.getElementById(id + '-place').textContent = data.place;
  document.getElementById(id + '-date').textContent = data.date;
  const blurbEl = document.getElementById(id + '-blurb');
  if (blurbEl) blurbEl.textContent = data.blurb;
  const imgEl = document.getElementById(id + '-img');
  if (imgEl && data.imgAlt) imgEl.alt = data.imgAlt;
  const ul = document.getElementById(id + '-list');
  ul.innerHTML = '';
  data.li.forEach(function(text){
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });
}

function fillEdu(id, data){
  if (!document.getElementById(id + '-title')) return;
  document.getElementById(id + '-title').innerHTML = data.title;
  document.getElementById(id + '-place').textContent = data.place;
  document.getElementById(id + '-date').textContent = data.date;
  document.getElementById(id + '-detail').textContent = data.pre;
  document.getElementById(id + '-blurb').textContent = data.programBlurb;
  document.getElementById(id + '-thesis').innerHTML = data.thesisLabel + ' <em>' + data.thesis + '</em>';
  document.getElementById(id + '-abstract').textContent = data.abstract;
}

function fillList(id, items){
  if (!document.getElementById(id + '-list')) return;
  const ul = document.getElementById(id + '-list');
  ul.innerHTML = '';
  items.forEach(function(text){
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  });
}

/* The papers are the author's manuscripts, in Russian, one file per
   publication in the same order as T.*.publications. */
const PUB_FILES = [
  'assets/papers/byzov-place-of-writing-in-collaborative-learning.pdf',
  'assets/papers/byzov-digital-support-for-collaborative-writing.pdf',
  'assets/papers/byzov-intercultural-code-dream-of-the-rood.pdf',
  'assets/papers/byzov-assessment-of-collaborative-writing.pdf'
];
/* Slides, same order as T.*.talks; only the first talk has a file so far. */
const TALK_FILES = [
  'assets/papers/byzov-power-and-subordination-in-the-dream-of-the-rood-slides.pdf',
  null, null, null, null
];
function fillPubs(id, items, files, readLabel){
  if (!document.getElementById(id + '-list')) return;
  const ul = document.getElementById(id + '-list');
  ul.innerHTML = '';
  items.forEach(function(item, i){
    const li = document.createElement('li');
    li.innerHTML =
      '<span class="pub-title">' + item.title + '</span>' +
      '<span class="pub-meta">' + item.meta + '</span>' +
      '<p class="pub-desc">' + item.desc + '</p>';
    if (files && files[i] && readLabel) {
      const a = document.createElement('a');
      a.className = 'pub-read';
      a.href = ROOT + files[i];
      a.type = 'application/pdf';
      a.hreflang = 'ru';
      a.rel = 'noopener';
      a.textContent = readLabel;
      li.appendChild(a);
    }
    ul.appendChild(li);
  });
}

function fillLangs(langs){
  if (!document.getElementById('langs-list')) return;
  const items = document.querySelectorAll('#langs-list .lang');
  langs.forEach(function(l, i){
    items[i].querySelector('.lname').textContent = l.name;
    items[i].querySelector('.level').textContent = l.level;
  });
}

function fillSpecs(id, items){
  if (!document.getElementById(id + '-list')) return;
  const ul = document.getElementById(id + '-list');
  ul.innerHTML = '';
  items.forEach(function(item){
    const li = document.createElement('li');
    li.className = 'spec-item';
    li.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[item.icon] || '') + '</svg>' +
      '<div><h4>' + item.title + '</h4><p>' + item.desc + '</p></div>';
    ul.appendChild(li);
  });
}

/* A paragraph made of plain text and {a, href} link segments, so word order
   and grammar can differ per language. */
function renderSegments(el, segments){
  el.textContent = '';
  segments.forEach(function(seg){
    if (typeof seg === 'string') { el.appendChild(document.createTextNode(seg)); return; }
    const a = document.createElement('a');
    a.href = seg.href; a.textContent = seg.a; a.rel = 'noopener';
    el.appendChild(a);
  });
}
function fillFest(id, data){
  if (!document.getElementById(id + '-title')) return;
  document.getElementById(id + '-title').textContent = data.title;
  document.getElementById(id + '-place').textContent = data.place;
  document.getElementById(id + '-date').textContent = data.date;
  document.getElementById(id + '-desc').textContent = data.desc;
  document.getElementById(id + '-img').alt = data.alt;
  const crewEl = document.getElementById(id + '-crew');
  if (crewEl && data.crew) renderSegments(crewEl, data.crew);
}



/* ---------- start ---------- */
function start(){
  document.querySelectorAll('.lang-group button').forEach(function(btn){
    btn.addEventListener('click', function(){ applyLang(btn.dataset.lang); });
  });

  /* language: ?lang=xx wins (used to build the PDFs), then the saved choice */
  let initialLang = 'en';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('sb-lang');
    if (q && T[q]) initialLang = q;
    else if (saved && T[saved]) initialLang = saved;
  } catch(e){}
  applyLang(initialLang);

  /* ---- Text size (accessibility): normal / large / extra-large ---- */
  const FONT_SIZES = ['normal', 'large', 'xlarge'];
  function applyFontSize(size){
    document.documentElement.setAttribute('data-fontsize', size);
    document.querySelectorAll('.size-group button').forEach(function(b){
      const isActive = b.dataset.size === size;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
    try { localStorage.setItem('sb-fontsize', size); } catch(e){}
  }
  document.querySelectorAll('.size-group button').forEach(function(btn){
    btn.addEventListener('click', function(){ applyFontSize(btn.dataset.size); });
  });
  let initialFontSize = 'normal';
  try {
    const savedSize = localStorage.getItem('sb-fontsize');
    if (savedSize && FONT_SIZES.includes(savedSize)) initialFontSize = savedSize;
  } catch(e){}
  applyFontSize(initialFontSize);

  document.querySelectorAll('.reveal').forEach(function(el, i){
    el.style.animationDelay = (i * 0.1) + 's';
  });

  /* ---- Lightbox ---- */
  const lightbox = $('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  let lightboxOpener = null;
  function openLightbox(img){
    lightboxOpener = img;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.focus();
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    if (lightboxOpener) { lightboxOpener.focus(); lightboxOpener = null; }
  }
  document.querySelectorAll('.fest-photo-wrap img').forEach(function(img){
    img.addEventListener('click', function(){ openLightbox(img); });
    img.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openLightbox(img);
      }
    });
  });
  lightbox.addEventListener('click', closeLightbox);
  lightbox.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---- Number keys 1-5 open the sections (the keycaps in the nav) ---- */
  document.addEventListener('keydown', function(e){
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    const tag = (e.target && e.target.tagName) || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable)) return;
    const link = document.querySelector('.tabbar a[aria-keyshortcuts="' + e.key + '"]');
    if (link) { e.preventDefault(); location.href = link.href; }
  });

  /* ---- Back-to-top button ---- */
  const tabbarEl = document.querySelector('.tabbar');
  const backToTopBtn = $('back-to-top');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onScroll(){
    if (tabbarEl) tabbarEl.classList.toggle('stuck', tabbarEl.getBoundingClientRect().top <= 0);
    backToTopBtn.classList.toggle('visible', window.scrollY > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTopBtn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* The cv page is the print source for the PDF résumés: it assembles the
   section pages instead of repeating their markup. */
if (PAGE === 'cv') {
  Promise.all(['experience/', 'research/', 'education/', 'skills/'].map(function(p){
    return fetch(ROOT + p).then(function(r){ return r.text(); }).then(function(html){
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const panel = doc.querySelector('.tabpanel');
      panel.querySelectorAll('img').forEach(function(img){ img.setAttribute('src', img.getAttribute('src')); });
      return panel;
    });
  })).then(function(panels){
    const note = $('print-note');
    panels.forEach(function(p){ main.insertBefore(document.importNode(p, true), note); });
    start();
    document.documentElement.setAttribute('data-ready', '1');
  });
} else {
  start();
}

})();
