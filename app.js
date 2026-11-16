/* Shared behaviour for every page of the site.
   Each page is a thin shell (<body data-page data-root>); this script builds the
   common chrome (language bar, header, section nav, footer, lightbox), then fills
   the page from the trilingual T object in i18n.*.js. */
(function(){
'use strict';

const BODY = document.body;
const PAGE = BODY.dataset.page;            // home | experience | research | education | skillslang | festivals | cv | bestiary
const ROOT = BODY.dataset.root || '';      // path back to the site root: '' on the home page, '../' one level down...
const LANG = BODY.dataset.lang || 'en';    // a page is in one language (/, /ru/, /sr/)
const BASE = ROOT + (LANG === 'en' ? '' : LANG + '/');   // where the pages of this language live
const $ = function(id){ return document.getElementById(id); };
const NAV = [
  ['experience', 'experience/'],
  ['research',   'research/'],
  ['education',  'education/'],
  ['skillslang', 'skills/'],
  ['festivals',  'festivals/']
];
const NAV_ALL = NAV.concat([['bestiary', 'bestiary/']]);   // the section bar also has the Bestiary
const PAGE_PATHS = { home:'', cv:'cv/', experience:'experience/', research:'research/', education:'education/',
                     skillslang:'skills/', festivals:'festivals/', bestiary:'bestiary/' };

/* ---------- scenes: layered backdrops and sprites (slots from scenes.js) ---------- */
const HAS_SCENES = typeof SCENES !== 'undefined';
if (HAS_SCENES && SHOW_SLOTS) document.documentElement.classList.add('slots-on');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const PAGE_INDEX = NAV.findIndex(function(n){ return n[0] === PAGE; });
const PAGE_INDEX_ALL = NAV_ALL.findIndex(function(n){ return n[0] === PAGE; });
const SCENE_KEY = (PAGE === 'cv') ? 'home' : PAGE;

function el(tag, cls){ const e = document.createElement(tag); if (cls) e.className = cls; return e; }

/* Looks for the picture; if it exists the slot becomes the picture. */
function loadArt(target, file, done){
  const img = new Image();
  img.onload = function(){
    target.style.backgroundImage = 'url("' + ROOT + ART_DIR + file + '")';
    target.classList.add('has-art');
    if (done) done(img);
  };
  img.src = ROOT + ART_DIR + file;
}

function mkLayer(L){
  const d = el('div', 'layer layer--' + L.kind);
  d.style.setProperty('--d', L.depth || 0);
  if (L.css) { d.classList.add('is-css'); return d; }
  if (L.fit) d.classList.add('layer--fit');
  if (L.full) d.classList.add('layer--full');
  if (L.sea) d.classList.add('layer--sea');   /* a band of real water behind the gaps of the next layer */
  if (L.bottom != null) { d.classList.add('layer--b'); d.style.setProperty('--b', L.bottom); }
  d.dataset.label = L.file + ' · ' + L.size;
  loadArt(d, L.file, function(img){
    if (L.full) d.style.setProperty('--ar', img.naturalWidth / img.naturalHeight);
    if (!L.drift) return;
    d.dataset.drift = L.drift;
    d.style.setProperty('--drift', L.drift);
    const fit = function(){ d.style.setProperty('--tile', (d.clientHeight * img.naturalWidth / img.naturalHeight) + 'px'); };
    fit();
    window.addEventListener('resize', fit);
  });
  return d;
}

/* ---------- talking characters: a fact in a speech bubble ---------- */
const TALK = { items:[], bubble:null, hideT:0, autoT:0, raf:0, active:null, last:null };
function talkLang(){ const l = document.documentElement.lang; return (l === 'ru' || l === 'sr') ? l : 'en'; }
function getBubble(){
  if (TALK.bubble) return TALK.bubble;
  const sc = $('scene');
  if (!sc) return null;
  const b = el('div', 'bubble');
  b.setAttribute('role', 'note');
  b.addEventListener('click', hideBubble);
  sc.appendChild(b);
  TALK.bubble = b;
  return b;
}
function placeBubble(){
  const b = TALK.bubble, it = TALK.active, sc = $('scene');
  if (!b || !it || !sc) return;
  /* the picture (hopping, pacing...) moves inside the sprite box: follow the picture */
  const s = sc.getBoundingClientRect(), r = it.anchor.getBoundingClientRect();
  const bw = b.offsetWidth, bh = b.offsetHeight;
  const cx = r.left + r.width / 2 - s.left;
  const left = Math.min(Math.max(cx, bw / 2 + 8), s.width - bw / 2 - 8);
  b.style.left = left + 'px';
  b.style.top = Math.max(r.top - s.top + r.height * 0.12, bh + 8) + 'px';
  b.style.setProperty('--tx', Math.min(Math.max(cx - (left - bw / 2), 18), bw - 18) + 'px');
}
function followBubble(){ placeBubble(); TALK.raf = requestAnimationFrame(followBubble); }
function hideBubble(){
  clearTimeout(TALK.hideT);
  cancelAnimationFrame(TALK.raf);
  TALK.active = null;
  if (TALK.bubble) TALK.bubble.classList.remove('show');
}
function speak(item){
  const b = getBubble(), set = FACTS[item.key];
  if (!b || !set) return;
  const arr = set[talkLang()] || set.en;
  item.n = (item.n == null ? Math.floor(Math.random() * arr.length) : item.n + 1) % arr.length;
  b.textContent = arr[item.n];
  markFound(item.key, item.n);
  if (window.SB_SOUND) SB_SOUND.chime(item.key);
  TALK.active = item; TALK.last = item;
  b.classList.add('show');
  cancelAnimationFrame(TALK.raf);
  followBubble();
  clearTimeout(TALK.hideT);
  TALK.hideT = setTimeout(hideBubble, Math.max(6500, arr[item.n].length * 80));
}
/* they also speak up by themselves: one at a time, only what is on screen */
function startAuto(delay){
  clearTimeout(TALK.autoT);
  TALK.autoT = setTimeout(function(){
    if (!document.hidden && TALK.items.length) {
      const seen = TALK.items.filter(function(it){
        const r = it.anchor.getBoundingClientRect();
        return r.bottom > 40 && r.top < window.innerHeight * 0.85 && it !== TALK.last;
      });
      if (seen.length) speak(seen[Math.floor(Math.random() * seen.length)]);
    }
    startAuto(12000 + Math.random() * 8000);
  }, delay);
}
function mkSprite(sp){
  const s = el('div', 'sprite sprite--' + (sp.plane || 'mid'));
  const move = el('div', 'sprite-move');
  const flip = el('div', 'sprite-flip');
  const react = el('div', 'sprite-react');
  const img = el('div', 'sprite-img');
  s.dataset.move = sp.move || 'idle';
  s.style.setProperty('--w', sp.w);
  if (sp.x != null) s.style.setProperty('--x', sp.x);
  if (sp.y != null) s.style.setProperty('--y', sp.y);
  if (sp.dur) s.style.setProperty('--dur', sp.dur);
  if (sp.range) s.style.setProperty('--range', sp.range);
  if (sp.phase != null) { s.style.setProperty('--phase', sp.phase); s.dataset.phase = '1'; }
  if (sp.flip) s.classList.add('flipped');
  if (sp.when) s.classList.add('when-' + sp.when);   // 'night' or 'day'
  if (sp.opacity != null) s.style.opacity = sp.opacity;
  if (sp.filter) s.style.filter = sp.filter;
  img.style.setProperty('--frames', sp.frames);
  img.dataset.label = sp.id + ' · ' + sp.frames + ' fr';
  loadArt(img, sp.file, function(){
    s.classList.add('is-drawn');
    if (sp.frames > 1) {
      img.style.animation = 'sprite-frames ' + (sp.frames / (sp.fps || 8)) + 's steps(' + sp.frames + ') infinite';
    }
  });
  const talker = (sp.say && typeof FACTS !== 'undefined' && FACTS[sp.say]) ? { el:s, anchor:img, key:sp.say, n:null } : null;
  if (talker) TALK.items.push(talker);
  s.addEventListener('click', function(){
    react.classList.remove('boing');
    void react.offsetWidth;
    react.classList.add('boing');
    if (talker) { speak(talker); startAuto(20000); }
  });
  react.appendChild(img); flip.appendChild(react); move.appendChild(flip); s.appendChild(move);
  return s;
}

function buildStage(stage, key){
  const sc = HAS_SCENES && SCENES[key];
  if (!stage || !sc) return;
  sc.layers.forEach(function(L){ stage.appendChild(mkLayer(L)); });
  (sc.sprites || []).forEach(function(sp){ stage.appendChild(mkSprite(sp)); });
}

function buildMargins(host, key){
  const sc = HAS_SCENES && SCENES[key];
  if (!host || !sc || !sc.margins) return;
  sc.margins.forEach(function(m){
    const box = el('div', 'margin-slot');
    box.setAttribute('aria-hidden', 'true');
    box.dataset.side = m.side;
    box.style.setProperty('--top', m.top);
    box.style.setProperty('--w', m.w);
    const sp = mkSprite(m);
    new MutationObserver(function(){ if (sp.classList.contains('is-drawn')) box.classList.add('is-drawn'); })
      .observe(sp, { attributes: true, attributeFilter: ['class'] });
    box.appendChild(sp);
    host.appendChild(box);
  });
}

/* ---------- collected facts, Bestiary, fact of the day ---------- */
function esc(t){ return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function ui(){ return (typeof FACTS_UI !== 'undefined' && (FACTS_UI[LANG] || FACTS_UI.en)) || {}; }
function factsOf(key){ const set = FACTS[key]; return set[LANG] || set.en; }
function loadFound(){ try { return JSON.parse(localStorage.getItem('sb-facts') || '{}') || {}; } catch (e) { return {}; } }
function markFound(key, idx){
  const f = loadFound(), a = f[key] || (f[key] = []);
  if (a.indexOf(idx) < 0) { a.push(idx); try { localStorage.setItem('sb-facts', JSON.stringify(f)); } catch (e) {} }
  updateCount();
}
function totalFacts(){ let n = 0; if (typeof FACTS === 'undefined') return 0; Object.keys(FACTS).forEach(function(k){ n += (FACTS[k].en || []).length; }); return n; }
function foundCount(){ const f = loadFound(); let n = 0; Object.keys(f).forEach(function(k){ if (typeof FACTS !== 'undefined' && FACTS[k]) n += f[k].length; }); return n; }
function updateCount(){
  const c = $('best-count');
  if (c) c.textContent = foundCount() + '/' + totalFacts();
  const g = $('best-got');
  if (g) g.textContent = foundCount();
}
function allTalkers(){
  const out = [];
  if (!HAS_SCENES || typeof FACTS === 'undefined') return out;
  Object.keys(SCENES).forEach(function(pk){
    (SCENES[pk].sprites || []).forEach(function(sp){ if (sp.say && FACTS[sp.say]) out.push({ sp:sp, page:pk }); });
  });
  return out;
}
function bestiaryHTML(){
  const u = ui(), t = T[LANG], found = loadFound(), list = allTalkers();
  let total = 0, got = 0;
  const cards = list.map(function(o){
    const key = o.sp.say, facts = factsOf(key), f = found[key] || [];
    total += facts.length; got += f.length;
    const nm = FACTS[key].name || {};
    const where = o.page === 'home' ? t.homeLabel : t.labels[o.page];
    return '<li class="beast' + (f.length === facts.length ? ' beast--full' : '') + '">' +
      '<span class="beast-pic" style="--frames:' + o.sp.frames + ';background-image:url(\'' + ROOT + ART_DIR + o.sp.file + '\')" role="img" aria-label="' + esc(nm[LANG] || nm.en || key) + '"></span>' +
      '<div class="beast-text"><h3>' + esc(nm[LANG] || nm.en || key) + '</h3>' +
      '<p class="beast-where"><a href="' + BASE + PAGE_PATHS[o.page] + '">' + esc(where) + '</a> <span>' + f.length + '/' + facts.length + '</span></p>' +
      '<ol class="beast-facts">' + facts.map(function(x, i){
        return f.indexOf(i) >= 0 ? '<li>' + esc(x) + '</li>' : '<li class="locked" aria-label="' + esc(u.locked || '') + '">· · ·</li>';
      }).join('') + '</ol></div></li>';
  }).join('');
  return '<div class="tabpanel" id="panel-bestiary">' +
    '<p class="prose">' + esc(u.intro || '') + '</p>' +
    '<p class="best-progress"><b id="best-got">' + got + '</b> / ' + total + ' <span>' + esc(u.found || '') + '</span></p>' +
    '<div class="best-bar" aria-hidden="true"><i style="width:' + (total ? Math.round(got / total * 100) : 0) + '%"></i></div>' +
    (got === total && total ? '<p class="best-done">' + esc(u.all || '') + '</p>' : '') +
    '<ul class="bestiary">' + cards + '</ul>' +
    '<p class="best-reset"><button type="button" id="best-reset">' + esc(u.reset || '') + '</button></p>' +
  '</div>';
}
/* one fact per day, the same for everyone that day */
function fillFactDay(){
  const box = $('factday');
  if (!box || typeof FACTS === 'undefined') return;
  const all = [];
  Object.keys(FACTS).forEach(function(k){ factsOf(k).forEach(function(x, i){ all.push([k, x]); }); });
  if (!all.length) return;
  const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  const pick = all[(day * 37) % all.length];
  const nm = FACTS[pick[0]].name || {};
  $('factday-label').textContent = ui().day || '';
  $('factday-text').textContent = pick[1];
  $('factday-who').textContent = '— ' + (nm[LANG] || nm.en || '');
  $('factday-more').textContent = ui().more || '';
  box.hidden = false;
}

/* ---------- chrome ---------- */
const ICON_TIME = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ico-sun"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9"/></g><path class="ico-moon" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
const ICON_SOUND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path class="ico-off" d="M3 3l18 18"/></svg>';
const LANGBAR =
  '<div class="langbar">' +
    '<div class="lang-group" role="group" aria-label="Language">' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>' +
      '<button type="button" data-lang="ru" aria-pressed="false">RU</button>' +
      '<button type="button" data-lang="sr" aria-pressed="false">SR</button>' +
    '</div>' +
    '<span class="langbar-divider" aria-hidden="true"></span>' +
    '<div class="size-group" role="group" aria-label="Text size">' +
      '<button type="button" class="size-btn" data-size="normal" aria-pressed="true" aria-label="Normal text size">A</button>' +
      '<button type="button" class="size-btn" data-size="large" aria-pressed="false" aria-label="Large text size">A</button>' +
      '<button type="button" class="size-btn" data-size="xlarge" aria-pressed="false" aria-label="Extra-large text size">A</button>' +
    '</div>' +
    '<span class="langbar-divider" aria-hidden="true"></span>' +
    '<div class="mood-group">' +
      '<button type="button" class="icon-btn time-btn" id="time-btn" aria-pressed="false">' + ICON_TIME + '</button>' +
      '<button type="button" class="icon-btn sound-btn" id="sound-btn" aria-pressed="false">' + ICON_SOUND + '</button>' +
    '</div>' +
  '</div>';
/* title page: the full-height scene with the name painted on the sky */
const HERO =
  '<header class="scene scene--hero" id="scene">' +
    '<div class="scene-stage" aria-hidden="true"></div>' +
    '<div class="scene-title reveal">' +
      '<p class="topline" id="topline"></p>' +
      '<h1 class="name" id="name"></h1>' +
      '<p class="role" id="role"></p>' +
    '</div>' +
  '</header>';

/* chapter pages: a shorter scene with the chapter number and title */
const COMPACT =
  '<header class="scene scene--chapter" id="scene">' +
    '<div class="scene-stage" aria-hidden="true"></div>' +
    '<div class="scene-title reveal">' +
      '<p class="crumb"><a href="' + (BASE || './') + '" id="name"></a></p>' +
      '<h1 class="chapter"><span class="chapter-num">' + (ROMAN[PAGE_INDEX_ALL] || '') + '</span>' +
        '<span id="chapter-title"></span></h1>' +
    '</div>' +
  '</header>';

const LEDE =
  '<div class="lede reveal">' +
    '<figure class="plate">' +
      '<img class="photo" id="photo" src="' + ROOT + 'assets/Byzov-S.S_.jpg" width="426" height="640" alt="" decoding="async" fetchpriority="high">' +
      '<figcaption id="plate-caption" aria-hidden="true"></figcaption>' +
    '</figure>' +
    '<div class="lede-text">' +
      '<p class="intro" id="intro"></p>' +
      '<nav class="contacts" aria-label="Contact">' +
        '<a href="mailto:hello@saveliybyzov.ru">hello@saveliybyzov.ru</a>' +
        '<a href="https://t.me/savageavery">Telegram <span>@savageavery</span></a>' +
        '<a href="tel:+381638389596">+381 63 8389596</a>' +
        '<a class="print-btn" id="cv-btn" href="' + ROOT + 'assets/cv/Byzov-CV-en.pdf" download>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>' +
          '<span id="print-label"></span>' +
        '</a>' +
      '</nav>' +
    '</div>' +
  '</div>';

const HOME_BODY =
  '<dl class="now">' +
    '<div><dt id="now-label"></dt><dd id="now-text"></dd></div>' +
    '<div><dt id="open-label"></dt><dd id="open-text"></dd></div>' +
  '</dl>' +
  '<aside class="factday" id="factday" hidden><span class="factday-label" id="factday-label"></span>' +
    '<p class="factday-text" id="factday-text"></p><p class="factday-who" id="factday-who"></p>' +
    '<a class="factday-more" id="factday-more" href="' + BASE + 'bestiary/"></a></aside>' +
  '<div class="rule home-rule"></div>' +
  '<ul class="home-grid" id="home-grid">' +
    NAV.map(function(n, i){
      return '<li><a class="home-card" data-tone="' + n[0] + '" href="' + n[1] + '">' +
             '<span class="mini slot" data-card="' + n[0] + '" aria-hidden="true"></span>' +
             '<span class="num">' + ROMAN[i] + '</span>' +
             '<h3 id="card-' + n[0] + '-t"></h3><p id="card-' + n[0] + '-d"></p></a></li>';
    }).join('') +
  '</ul>';

const TABBAR =
  '<nav class="tabbar" aria-label="Sections">' +
    NAV_ALL.map(function(n, i){
      return '<a href="' + BASE + n[1] + '" data-nav="' + n[0] + '" data-tone="' + n[0] + '" aria-keyshortcuts="' + (i + 1) + '"' +
             (PAGE === n[0] ? ' aria-current="page"' : '') + '>' +
             '<span id="tab-' + n[0] + '"></span>' + (n[0] === 'bestiary' ? '<small class="tab-count" id="best-count"></small>' : '') +
             '<span class="chip" aria-hidden="true">' + ROMAN[i] + '</span></a>';
    }).join('') +
  '</nav>';

/* previous / next chapter, so the pages read like one codex */
function pagerLink(i, dir){
  const n = NAV[i];
  if (!n) return '';
  return '<a class="pager-' + dir + '" data-tone="' + n[0] + '" href="' + BASE + n[1] + '" rel="' + dir + '">' +
         '<span class="pager-dir" aria-hidden="true">' + (dir === 'prev' ? '← ' + ROMAN[i] : ROMAN[i] + ' →') + '</span>' +
         '<span id="pager-' + dir + '"></span></a>';
}
const PAGER = PAGE_INDEX < 0 ? '' :
  '<nav class="pager" aria-label="Chapters">' + pagerLink(PAGE_INDEX - 1, 'prev') + pagerLink(PAGE_INDEX + 1, 'next') + '</nav>';

const FOOTER =
  '<div class="scene scene--strip" aria-hidden="true"><div class="scene-stage" id="strip-stage"></div></div>' +
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
  if (PAGE === 'bestiary') main.insertAdjacentHTML('beforeend', bestiaryHTML());
  main.insertAdjacentHTML('beforeend', PAGER);
}
main.insertAdjacentHTML('beforeend', '<p class="print-note" id="print-note"></p>');
main.insertAdjacentHTML('afterend',
  FOOTER +
  '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview" tabindex="-1"><img src="" alt=""></div>' +
  '<button type="button" class="back-to-top" id="back-to-top" aria-label="Back to top">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>' +
  '</button>');

buildStage(document.querySelector('#scene .scene-stage'), SCENE_KEY);
if (HAS_SCENES && SCENES[SCENE_KEY] && SCENES[SCENE_KEY].h) $('scene').style.setProperty('--hu', SCENES[SCENE_KEY].h);
buildStage($('strip-stage'), 'footer');
buildMargins(main, SCENE_KEY);
if (TALK.items.length) startAuto(5000);

/* optional hand-made textures: assets/art/sky.jpg and water.jpg replace the
   built-in CSS ones as soon as the files exist */
if (HAS_SCENES) {
  const WATER_PAGES = ['home', 'cv', 'festivals'];
  ['sky'].concat(WATER_PAGES.indexOf(PAGE) >= 0 ? ['water'] : []).forEach(function(n){
    const im = new Image();
    const href = new URL(ROOT + ART_DIR + n + '.webp', document.baseURI).href;
    im.onload = function(){
      document.documentElement.style.setProperty('--tex-' + n, 'url("' + href + '")');
      document.documentElement.classList.add('tex-' + n);
    };
    im.src = href;
  });
}
/* the chapter miniatures are below the fold: load them once the page itself is done */
function loadCards(){
if (HAS_SCENES) {
  document.querySelectorAll('.mini[data-card]').forEach(function(m){
    const art = CARD_ART[m.dataset.card];
    if (!art) return;
    m.dataset.label = art.file;
    const probe = new Image();
    probe.onload = function(){
      const pic = el('i', 'mini-sprite');
      pic.style.backgroundImage = 'url("' + ROOT + ART_DIR + art.file + '")';
      pic.style.backgroundSize = (art.frames * 100) + '% 100%';
      m.appendChild(pic);
      m.classList.add('has-art');
    };
    probe.src = ROOT + ART_DIR + art.file;
  });
}

}
if (document.readyState === 'complete') setTimeout(loadCards, 300);
else window.addEventListener('load', function(){ setTimeout(loadCards, 300); });

/* "A // B // C" from the copy becomes A ◆ B ◆ C */
function setSeps(id, text){
  const e = $(id);
  if (!e || text == null) return;
  e.textContent = '';
  text.split(' // ').forEach(function(part, i){
    if (i) { const s = el('span', 'sep'); s.setAttribute('aria-hidden', 'true'); e.appendChild(s); }
    if (part.trim()) e.appendChild(document.createTextNode(part.trim()));
  });
}

/* ---------- filling ---------- */
function setText(id, value){ const el = $(id); if (el && value != null) el.textContent = value; }
function setHTML(id, value){ const el = $(id); if (el && value != null) el.innerHTML = value; }

function applyLang(lang){
  const t = T[lang];
  document.documentElement.lang = lang;

  setSeps('topline', t.topline);
  setText('name', t.name);
  setSeps('role', t.role);
  setHTML('chapter-title', t.labels[PAGE]);
  if (PAGE_INDEX > 0) setHTML('pager-prev', t.labels[NAV[PAGE_INDEX - 1][0]]);
  if (PAGE_INDEX > -1 && NAV[PAGE_INDEX + 1]) setHTML('pager-next', t.labels[NAV[PAGE_INDEX + 1][0]]);
  setText('intro', t.intro);
  if ($('photo')) $('photo').alt = t.photoAlt;
  setText('plate-caption', t.plateCaption);
  setText('print-label', t.cvLabel);
  setText('print-note', t.printNote);
  setSeps('footer-text', t.footer);
  $('back-to-top').setAttribute('aria-label', t.backToTop);
  const cv = $('cv-btn');
  if (cv) cv.href = ROOT + 'assets/cv/Byzov-CV-' + lang + '.pdf';

  /* section nav */
  setHTML('tab-experience', t.labels.experience);
  setHTML('tab-research', t.labels.research);
  setHTML('tab-education', t.labels.education);
  setHTML('tab-skillslang', t.labels.skillslang);
  setHTML('tab-festivals', t.labels.festivals);
  setHTML('tab-bestiary', ui().title);
  if (PAGE === 'bestiary') setHTML('chapter-title', ui().title);
  fillFactDay();
  updateCount();

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
  /* labels of the little buttons */
  const tb = $('time-btn'), sb = $('sound-btn');
  if (sb) { sb.setAttribute('aria-label', ui().sound || 'Sound'); sb.title = ui().sound || 'Sound'; }
  if (tb && window.setTimeLabel) window.setTimeLabel();
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
  /* the language is the address: /, /ru/, /sr/ (same page in the other language) */
  document.querySelectorAll('.lang-group button').forEach(function(btn){
    btn.addEventListener('click', function(){
      const l = btn.dataset.lang;
      if (l === LANG) return;
      try { localStorage.setItem('sb-lang', l); } catch(e){}
      if (window.SB_SOUND) SB_SOUND.page();
      location.href = ROOT + (l === 'en' ? '' : l + '/') + PAGE_PATHS[PAGE] + location.hash;
    });
  });
  applyLang(LANG);

  /* ---- day / night (the Research chapter is always night) ---- */
  function currentTime(){ return document.documentElement.getAttribute('data-time') === 'night' ? 'night' : 'day'; }
  window.setTimeLabel = function(){
    const tb = $('time-btn'); if (!tb) return;
    const night = currentTime() === 'night';
    tb.setAttribute('aria-pressed', String(night));
    tb.setAttribute('aria-label', night ? (ui().toDay || 'Day') : (ui().toNight || 'Night'));
    tb.title = tb.getAttribute('aria-label');
  };
  function applyTime(t, save){
    document.documentElement.setAttribute('data-time', t);
    if (save) { try { localStorage.setItem('sb-time', t); } catch(e){} }
    window.setTimeLabel();
  }
  const timeBtn = $('time-btn');
  timeBtn.addEventListener('click', function(){
    applyTime(currentTime() === 'night' ? 'day' : 'night', true);
    if (window.SB_SOUND) SB_SOUND.chime('time');
  });
  window.setTimeLabel();

  /* ---- sound: off until you switch it on ---- */
  const soundBtn = $('sound-btn');
  if (window.SB_SOUND) {
    soundBtn.setAttribute('aria-pressed', String(SB_SOUND.wanted()));
    soundBtn.addEventListener('click', function(){
      soundBtn.setAttribute('aria-pressed', String(SB_SOUND.toggle()));
    });
    SB_SOUND.arm();    // starts at the first touch if it was left on
    document.addEventListener('pointerdown', function(e){
      const a = e.target.closest && e.target.closest('a[href]');
      if (a && !a.hasAttribute('download') && a.origin === location.origin) SB_SOUND.page();
    }, true);
  } else { soundBtn.hidden = true; }

  /* ---- Bestiary: forget progress ---- */
  const resetBtn = $('best-reset');
  if (resetBtn) resetBtn.addEventListener('click', function(){
    try { localStorage.removeItem('sb-facts'); } catch(e){}
    location.reload();
  });

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

  /* ---- Parallax: layers drift with the scroll and lean away from the pointer ---- */
  const sceneEl = $('scene');
  if (sceneEl && !prefersReducedMotion) {
    let queued = false, mx = 0;
    const paint = function(){
      queued = false;
      sceneEl.style.setProperty('--sy', Math.min(window.scrollY, sceneEl.offsetHeight));
      sceneEl.style.setProperty('--mx', mx.toFixed(3));
    };
    const ask = function(){ if (!queued) { queued = true; requestAnimationFrame(paint); } };
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('pointermove', function(e){
      if (e.pointerType === 'touch') return;
      mx = (e.clientX / window.innerWidth - .5) * 2;
      ask();
    }, { passive: true });
  }
  backToTopBtn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* The cv page is the print source for the PDF résumés: it assembles the
   section pages instead of repeating their markup. */
/* a small service worker: the site opens at once on the next visit and keeps working offline */
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0 && PAGE !== 'cv') {
  window.addEventListener('load', function(){ navigator.serviceWorker.register(ROOT + 'sw.js').catch(function(){}); });
}

if (PAGE === 'cv') {
  Promise.all(['experience/', 'research/', 'education/', 'skills/'].map(function(p){
    return fetch(BASE + p).then(function(r){ return r.text(); }).then(function(html){
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
