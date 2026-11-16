/* =====================================================================
   Scenes — the single list of every picture the site can show.

   BUDGET: every screen is generated from exactly TWO images:
     raw.land     16:9, three horizontal strips on magenta: far / mid / ground
     raw.sprites  4:3, a grid of square cells (see `grid`), on magenta
   Sky and water are painted by CSS (colour, glow, grain) plus the optional
   hand-made textures assets/art/sky.jpg and water.jpg.
   tools/slice-art.ps1 cuts the raw images into the small files named below
   (layers and sprite strips); the site only ever loads those small files.

   Conventions
   - layers:  one PNG per layer, used ONCE (no tiling), scaled to cover the
              scene width, bottom-aligned, transparent above the silhouette.
   - sprites: PNG strip of `frames` square frames (the slicer makes 320x320),
              character faces RIGHT unless `flip`, feet on the bottom edge.
              frames:1 = a still picture (the code moves it); frames:2-3 = a
              small hand-drawn loop, played at `fps`.
   - grid:    layout of raw.sprites, row by row. The same id repeated in a
              row = the frames of that sprite, left to right. '' = empty.
   say:   key into facts.js: the character tells those facts in a speech bubble.
   ===================================================================== */

/* true  — show dashed boxes and file names for art that is not drawn yet
   false — hide them (safe to publish: empty slots simply disappear)      */
const SHOW_SLOTS = false;

const ART_DIR = 'assets/art/';

/* far / mid / ground come from the land sheet. `front` is what stands in
   front of the ground: 'water' (CSS + water.jpg), a file name to reuse the
   ground of another screen, or nothing.                                   */
function sceneLayers(key, extra, front, pos){
  const n = extra || {};
  const list = [
    { kind:'far',    file:key + '/far.webp',    size:'cover', depth:.3,  note:n.far || '' },
    { kind:'mid',    file:key + '/mid.webp',    size:'cover', depth:.18, note:n.mid || '' },
    { kind:'ground', file:key + '/ground.webp', size:'cover', depth:.08, note:n.ground || '' }
  ];
  /* pos = bottom edge of each layer in units of the scene (chapter pages only); */
  /* layers then keep their own proportions and are never cropped */
  if (pos) list.forEach(function(L){ L.full = true; L.bottom = pos[L.kind]; });
  if (front === 'water') list.push({ kind:'front', css:true, depth:0 });
  else if (front) list.push({ kind:'front', file:front, reuse:true, depth:0 });
  return list;
}
function rawFiles(key){
  return { land:key + '/_raw/land.jpg', sprites:key + '/_raw/sprites.jpg' };
}

/* a drifting cloud: `phase` (0..1) is where on its path it starts, so a sky
   full of clouds does not begin as one pile                               */
function cloud(file, w, y, dur, phase, extra){
  return Object.assign({ id:'cloud', file:file, frames:1, fps:1, w:w, x:0, y:y,
    plane:'sky', move:'walk', dur:dur, phase:phase }, extra || {});
}
/* a golden sun with a face, behind all layers (it is the same picture as the research star) */
function sun(x, y, w){
  return { id:'sun', file:'research/star.webp', frames:1, fps:1, w:w, x:x, y:y, plane:'bg', move:'bob', dur:8, when:'day' };
}
function star(x, y, w, dur, phase){
  return { id:'star', file:'research/star.webp', frames:1, fps:1, w:w, x:x, y:y,
    plane:'sky', move:'twinkle', dur:dur, phase:phase };
}

/* the night sky every page can switch to (moon and stars show only at night; the
   Research chapter has its own, always-on night sky) */
function nightSky(){
  const moon = { id:'moon', file:'research/moon.webp', frames:1, fps:1, w:120, x:6, y:76, plane:'sky', move:'bob', dur:6, when:'night' };
  const stars = [[24,90,34,3.2,.1], [36,82,24,4.1,.6], [48,92,40,2.8,.3], [60,84,24,3.7,.8], [72,91,30,4.4,.45],
                 [84,83,36,3.1,.2], [92,92,22,3.9,.7], [16,86,20,4.6,.55], [54,78,18,3.4,.9]].map(function(a){
    return Object.assign(star(a[0], a[1], a[2], a[3], a[4]), { when:'night' });
  });
  return [moon].concat(stars);
}

/* sprite fields
   plane: sky | back | mid | front      where it stands in the stack
   move:  idle | bob | hop | sway | twinkle | peek | pace | walk | walk-back | fly
   w:     width on screen, px (frame is square)
   x, y:  left and bottom, % of the scene
   dur:   seconds for one loop of the movement;  range: px for `pace`
   phase: 0..1, where in the loop it starts;     flip: face left
   opacity, filter: plain CSS, for night clouds and the like
   when:  'night' or 'day': shown only in that mood of the site                  */
const SCENES = {
  home: {
    name: 'Берег реки',
    mood: 'Ясный день: пыльно-голубое небо, охристый берег, ультрамариновая вода.',
    raw: rawFiles('home'),
    grid: [
      ['hare-scribe', 'hare-scribe', 'hare-scribe', 'snail-castle'],
      ['bird-letter', 'bird-letter', 'bird-letter', 'fish-hat'],
      ['manicule',    'cloud-a',     'cloud-b',     'cloud-c']
    ],
    layers: sceneLayers('home', {
      far:    'Дальние округлые холмы, крошечная крепость и колокольня.',
      mid:    'Ряд условных деревьев-«грибочков» на невысоких буграх.',
      ground: 'Охристый берег с травинками и цветами, неровный нижний край.'
    }, 'water').map(function(l){ return l.css ? l : Object.assign(l, { full:true }); }),
    sprites: [
      { say:'hare', id:'hare-scribe',  file:'home/hare-scribe.webp',  frames:3, fps:3, w:150, x:14, y:21, plane:'mid', move:'idle',
        note:'Заяц-писарь на пеньке: перо поднято → пишет → чешет ухо.' },
      { say:'snail', id:'snail-castle', file:'home/snail-castle.webp', frames:1, fps:1, w:130, x:44, y:19, plane:'mid', move:'idle',
        note:'Улитка с каменной башенкой на раковине, из окошка торчит флажок.' },
      { id:'fish-hat',     file:'home/fish-hat.webp',     frames:1, fps:1, w:120, x:70, y:3,  plane:'mid', move:'peek', dur:9,
        note:'Рыба стоймя, в красном остром колпаке, с каменным лицом.' },
      { id:'bird-letter',  file:'home/bird-letter.webp',  frames:3, fps:6, w:110, x:0,  y:66, plane:'sky', move:'fly', dur:38, phase:.15,
        note:'Птица в профиль несёт письмо с сургучной печатью: крылья вверх → середина → вниз.' },
      { id:'bird-letter',  file:'home/bird-letter.webp',  frames:3, fps:6, w:80,  x:0,  y:52, plane:'sky', move:'fly', dur:55, phase:.7,
        note:'Вторая птица, поменьше.' },
      cloud('home/cloud-a.webp', 190, 80, 170, .05), cloud('home/cloud-b.webp', 130, 68, 210, .22),
      cloud('home/cloud-c.webp', 170, 88, 160, .38), cloud('home/cloud-a.webp', 120, 74, 240, .55),
      cloud('home/cloud-b.webp', 150, 84, 190, .70), cloud('home/cloud-c.webp', 110, 64, 260, .84),
      cloud('home/cloud-a.webp', 140, 91, 200, .95),
      sun(80, 69, 150)
    ].concat(nightSky()),
    margins: [
      { id:'manicule', file:'home/manicule.webp', frames:1, fps:1, w:120, side:'left', top:'4%', move:'bob',
        note:'Маникула: рука в кружевном манжете, указательный палец вправо.' }
    ]
  },

  experience: {
    name: 'Школа',
    mood: 'Тёплое абрикосовое утро, терракотовый городок, зелёный двор.',
    raw: rawFiles('experience'),
    h: 56,
    grid: [
      ['owl-magister', 'owl-magister', 'owl-magister', 'hedgehog-pupils'],
      ['',             '',             '',             'inkpot'],
      ['cloud-a',      'cloud-b',      '',             '']
    ],
    layers: sceneLayers('experience', {
      far:    'Терракотовый городок: крыши, башенки, флюгер.',
      mid:    'Аркада школьного двора.',
      ground: 'Зелёный двор с травой и ромашками.'
    }, null, { far:20, mid:3, ground:0 }),
    sprites: [
      { say:'owl', id:'owl-magister',    file:'experience/owl-magister.webp',    frames:3, fps:3, w:160, x:62, y:12, plane:'mid', move:'idle',
        note:'Сова-магистр за кафедрой: указка у свитка → поднята → сова моргает.' },
      { say:'hedgehogs', id:'hedgehog-pupils', file:'experience/hedgehog-pupils.webp', frames:1, fps:1, w:170, x:28, y:11, plane:'mid', move:'idle', flip:true,
        note:'Трое ежей-школяров на лавке: один пишет, второй спит, третий тянет лапу.' },
      cloud('experience/cloud-a.webp', 160, 80, 170, .06), cloud('experience/cloud-b.webp', 120, 90, 220, .25),
      cloud('experience/cloud-a.webp', 110, 70, 250, .45), cloud('experience/cloud-b.webp', 140, 84, 190, .66),
      cloud('experience/cloud-a.webp', 100, 92, 230, .88),
      sun(70, 80, 130)
    ].concat(nightSky()),
    margins: [
      { id:'inkpot', file:'experience/inkpot.webp', frames:1, fps:1, w:110, side:'right', top:'12%', move:'bob',
        note:'Чернильница с ножками, из неё торчит перо.' }
    ]
  },

  research: {
    name: 'Башня звездочёта',
    mood: 'Ночь: глубокий ультрамарин, золотые звёзды, тёмно-зелёные холмы.',
    raw: rawFiles('research'),
    h: 56,
    grid: [
      ['cat-astrologer', 'cat-astrologer', 'cat-astrologer', 'star'],
      ['flying-book',    'flying-book',    'flying-book',    'moon'],
      ['bookworm',       '',               '',               '']
    ],
    layers: sceneLayers('research', {
      far:    'Тёмные холмы и кривая башня с горящим окном.',
      mid:    'Стена библиотеки с книгами на цепях.',
      ground: 'Ночной луг, тёмная трава.'
    }, null, { far:21, mid:9, ground:0 }),
    sprites: [
      { say:'cat', id:'cat-astrologer', file:'research/cat-astrologer.webp', frames:3, fps:3, w:150, x:66, y:22, plane:'back', move:'idle',
        note:'Кот-звездочёт в колпаке: подносит астролябию к глазу → опускает → записывает в кодекс.' },
      { id:'flying-book',    file:'research/flying-book.webp',    frames:3, fps:6, w:100, x:0,  y:78, plane:'sky', move:'fly', dur:42, phase:.3,
        note:'Книга летит, хлопая страницами, как птица: вверх → середина → вниз.' },
      { id:'moon',           file:'research/moon.webp',           frames:1, fps:1, w:130, x:6,  y:68, plane:'sky', move:'bob', dur:6,
        note:'Полумесяц с сонным лицом.' },
      star(24, 86, 40, 3.2, .1), star(35, 80, 28, 4.1, .6), star(46, 90, 46, 2.8, .3), star(58, 76, 26, 3.7, .8),
      star(70, 88, 34, 4.4, .45), star(82, 80, 42, 3.1, .2), star(90, 90, 24, 3.9, .7), star(16, 78, 22, 4.6, .55),
      star(52, 83, 20, 3.4, .9), star(76, 85, 24, 4.0, .35), star(64, 94, 22, 3.3, .05), star(30, 94, 20, 4.2, .75),
      cloud('home/cloud-a.webp', 190, 80, 230, .1, { opacity:.3, filter:'brightness(.6) saturate(.5)' }),
      cloud('home/cloud-b.webp', 140, 87, 280, .45, { opacity:.26, filter:'brightness(.6) saturate(.5)' }),
      cloud('home/cloud-c.webp', 170, 78, 250, .78, { opacity:.28, filter:'brightness(.6) saturate(.5)' })
    ],
    margins: [
      { id:'bookworm', file:'research/bookworm.webp', frames:1, fps:1, w:120, side:'left', top:'10%', move:'bob',
        note:'Книжный червь в очках выглядывает из толстого тома.' }
    ]
  },

  education: {
    name: 'Монастырь на холме',
    mood: 'Прохладный зелёный полдень, охристая дорога.',
    raw: rawFiles('education'),
    h: 55,
    grid: [
      ['',         'fox-monk', '',         'goose-cap'],
      ['bell',     'candle',   'cloud-a',  'cloud-b']
    ],
    layers: sceneLayers('education', {
      far:    'Зелёные холмы, монастырь со скрипториумом на вершине.',
      mid:    'Плодовые деревья и плетень.',
      ground: 'Охристая дорога к воротам, лопухи.'
    }, 'experience/ground.webp', { far:20, mid:11.25, ground:0 }),
    sprites: [
      { say:'fox', id:'fox-monk',  file:'education/fox-monk.webp',  frames:1, fps:1, w:150, x:22, y:20, plane:'mid', move:'idle',
        note:'Лис-монах несёт стопку книг выше головы: шаг левой → середина → шаг правой.' },
      { say:'goose', id:'goose-cap', file:'education/goose-cap.webp', frames:1, fps:1, w:110, x:72, y:20, plane:'mid', move:'hop', dur:5,
        note:'Гусь в академической шапочке с важным видом.' },
      { id:'bell',      file:'education/bell.webp',      frames:1, fps:1, w:90,  x:52, y:19, plane:'mid', move:'sway', dur:3,
        note:'Колокол в деревянной раме, стоит на земле.' },
      cloud('education/cloud-a.webp', 170, 80, 170, .05), cloud('education/cloud-b.webp', 120, 90, 220, .25),
      cloud('education/cloud-a.webp', 120, 72, 250, .45), cloud('education/cloud-b.webp', 150, 86, 190, .65),
      cloud('education/cloud-a.webp', 100, 93, 230, .87),
      sun(70, 77, 120)
    ].concat(nightSky()),
    margins: [
      { id:'candle', file:'education/candle.webp', frames:1, fps:1, w:100, side:'right', top:'8%', move:'bob',
        note:'Свеча с сонным лицом.' }
    ]
  },

  skillslang: {
    name: 'Мастерская',
    mood: 'Золотой фон, как сусальное золото в миниатюре; тёплые кирпичные тона.',
    raw: rawFiles('skills'),
    h: 52,
    grid: [
      ['dragon-interpreter', 'dragon-interpreter', 'dragon-interpreter', 'badger-lute'],
      ['beaver-carver',      'beaver-carver',      'beaver-carver',      'three-tongues']
    ],
    layers: sceneLayers('skills', {
      far:    'Рыжие крыши мастерских и вывески.',
      mid:    'Верстак, полки с инструментом и свитками.',
      ground: 'Кирпичный пол в ёлочку, стружка.'
    }, 'research/ground.webp', { far:20, mid:10.4, ground:0 }),
    sprites: [
      { say:'dragon', id:'dragon-interpreter', file:'skills/dragon-interpreter.webp', frames:3, fps:3, w:180, x:58, y:20, plane:'mid', move:'idle',
        note:'Трёхголовый дракон-толмач: говорит левая голова → средняя → правая.' },
      { say:'beaver', id:'beaver-carver',      file:'skills/beaver-carver.webp',      frames:3, fps:6, w:140, x:20, y:21, plane:'mid', move:'idle',
        note:'Бобр строгает ложку: нож вверх → вниз → стружка летит.' },
      { say:'badger', id:'badger-lute',        file:'skills/badger-lute.webp',        frames:1, fps:1, w:130, x:82, y:20, plane:'mid', move:'idle',
        note:'Барсук с лютней.' },
      cloud('home/cloud-a.webp', 150, 80, 220, .12), cloud('home/cloud-b.webp', 110, 90, 260, .5),
      cloud('home/cloud-c.webp', 130, 72, 240, .82)
    ].concat(nightSky()),
    margins: [
      { id:'three-tongues', file:'skills/three-tongues.webp', frames:1, fps:1, w:120, side:'left', top:'46%', move:'bob',
        note:'Три свитка-«языка» вьются из одного рта.' }
    ]
  },

  festivals: {
    name: 'Ярмарка',
    mood: 'Розовый закат, алые шатры, синяя вода и маяк.',
    raw: rawFiles('festivals'),
    h: 54,
    grid: [
      ['bear-stilts', 'bear-stilts', 'bear-stilts', 'pennants'],
      ['',            'goat-jester', 'goat-jester', ''],
      ['mask',        'mask',        '',            '']
    ],
    layers: sceneLayers('festivals', {
      far:    'Скалистый мыс с маяком; море справа дорисовывается водой из water.jpg.',
      mid:    'Полосатые шатры и подмостки уличного театра.',
      ground: 'Охристая площадь.'
    }, 'water', { far:18.75, mid:10.2, ground:0 }).map(function(l){ return l.kind === 'far' ? Object.assign(l, { sea:true }) : l; }),
    sprites: [
      { say:'bear', id:'bear-stilts', file:'festivals/bear-stilts.webp', frames:3, fps:5, w:170, x:24, y:20, plane:'mid', move:'idle',
        note:'Медведь на ходулях жонглирует яблоками: шаг → яблоки вверх → шаг.' },
      { say:'goat', id:'goat-jester', file:'festivals/goat-jester.webp', frames:2, fps:3, w:130, x:70, y:21, plane:'mid', move:'hop', dur:3.5,
        note:'Козёл-шут в колпаке с бубенцами пляшет (прыгает): левая нога → правая.' },
      { id:'pennants',    file:'festivals/pennants.webp',    frames:1, fps:1, w:300, x:-4, y:74, plane:'sky', move:'sway', dur:6,
        note:'Связка флажков на верёвке: слева, от угла.' },
      { id:'pennants',    file:'festivals/pennants.webp',    frames:1, fps:1, w:300, x:72, y:74, plane:'sky', move:'sway', dur:7, flip:true,
        note:'Та же связка, справа, зеркально.' },
      cloud('home/cloud-a.webp', 160, 84, 200, .1,  { opacity:.8 }), cloud('home/cloud-b.webp', 120, 92, 250, .4, { opacity:.8 }),
      cloud('home/cloud-c.webp', 140, 78, 220, .7,  { opacity:.8 }),
      cloud('home/cloud-a.webp', 110, 70, 260, .25, { opacity:.8 }), cloud('home/cloud-b.webp', 150, 88, 190, .55, { opacity:.8 }),
      cloud('home/cloud-c.webp', 120, 66, 240, .9,  { opacity:.8 })
    ].concat(nightSky()),
    margins: [
      { id:'mask', file:'festivals/mask.webp', frames:2, fps:1, w:110, side:'right', top:'20%', move:'bob',
        note:'Театральная маска: кадр 1 — смех, кадр 2 — плач.' }
    ]
  },

  bestiary: {
    name: 'Бестиарий',
    mood: 'Берег с главной страницы; сами существа живут на своих страницах.',
    h: 47,
    layers: [
      { kind:'far',    file:'home/far.webp',    reuse:true, full:true, bottom:15, depth:.3 },
      { kind:'mid',    file:'home/mid.webp',    reuse:true, full:true, bottom:6,  depth:.18 },
      { kind:'ground', file:'home/ground.webp', reuse:true, full:true, bottom:0,  depth:.08 }
    ],
    sprites: [
      cloud('home/cloud-a.webp', 150, 82, 200, .1), cloud('home/cloud-b.webp', 110, 90, 250, .5),
      cloud('home/cloud-c.webp', 130, 76, 230, .8),
      sun(80, 76, 120)
    ].concat(nightSky())
  },

  /* the strip above the footer, on every page: plain CSS ground for now */
  footer: {
    name: 'Подвал',
    mood: 'Полоска земли под ногами.',
    layers: [{ kind:'ground', css:true, depth:0 }],
    sprites: []
  }
};

/* miniatures on the chapter cards of the title page: no new drawings,
   the first frame of each chapter's main character is shown on the card */
const CARD_ART = {
  experience: { file:'experience/owl-magister.webp',   frames:3 },
  research:   { file:'research/cat-astrologer.webp',   frames:3 },
  education:  { file:'education/fox-monk.webp',        frames:1 },
  skillslang: { file:'skills/dragon-interpreter.webp', frames:3 },
  festivals:  { file:'festivals/bear-stilts.webp',     frames:3 }
};
