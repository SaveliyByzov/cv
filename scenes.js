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
   `note` is the Russian brief for the image prompt.
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
    { kind:'far',    file:key + '/far.png',    size:'cover', depth:.3,  note:n.far || '' },
    { kind:'mid',    file:key + '/mid.png',    size:'cover', depth:.18, note:n.mid || '' },
    { kind:'ground', file:key + '/ground.png', size:'cover', depth:.08, note:n.ground || '' }
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
  return { id:'sun', file:'research/star.png', frames:1, fps:1, w:w, x:x, y:y, plane:'bg', move:'bob', dur:8 };
}
function star(x, y, w, dur, phase){
  return { id:'star', file:'research/star.png', frames:1, fps:1, w:w, x:x, y:y,
    plane:'sky', move:'twinkle', dur:dur, phase:phase };
}

/* sprite fields
   plane: sky | back | mid | front      where it stands in the stack
   move:  idle | bob | hop | sway | twinkle | peek | pace | walk | walk-back | fly
   w:     width on screen, px (frame is square)
   x, y:  left and bottom, % of the scene
   dur:   seconds for one loop of the movement;  range: px for `pace`
   phase: 0..1, where in the loop it starts;     flip: face left
   opacity, filter: plain CSS, for night clouds and the like               */
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
    }, 'water'),
    sprites: [
      { id:'hare-scribe',  file:'home/hare-scribe.png',  frames:3, fps:3, w:150, x:14, y:21, plane:'mid', move:'idle',
        note:'Заяц-писарь на пеньке: перо поднято → пишет → чешет ухо.' },
      { id:'snail-castle', file:'home/snail-castle.png', frames:1, fps:1, w:130, x:0,  y:19, plane:'mid', move:'walk', dur:80,
        note:'Улитка с каменной башенкой на раковине, из окошка торчит флажок.' },
      { id:'fish-hat',     file:'home/fish-hat.png',     frames:1, fps:1, w:120, x:70, y:3,  plane:'mid', move:'peek', dur:9,
        note:'Рыба стоймя, в красном остром колпаке, с каменным лицом.' },
      { id:'bird-letter',  file:'home/bird-letter.png',  frames:3, fps:6, w:110, x:0,  y:66, plane:'sky', move:'fly', dur:38, phase:.15,
        note:'Птица в профиль несёт письмо с сургучной печатью: крылья вверх → середина → вниз.' },
      { id:'bird-letter',  file:'home/bird-letter.png',  frames:3, fps:6, w:80,  x:0,  y:52, plane:'sky', move:'fly', dur:55, phase:.7,
        note:'Вторая птица, поменьше.' },
      cloud('home/cloud-a.png', 190, 80, 170, .05), cloud('home/cloud-b.png', 130, 68, 210, .22),
      cloud('home/cloud-c.png', 170, 88, 160, .38), cloud('home/cloud-a.png', 120, 74, 240, .55),
      cloud('home/cloud-b.png', 150, 84, 190, .70), cloud('home/cloud-c.png', 110, 64, 260, .84),
      cloud('home/cloud-a.png', 140, 91, 200, .95),
      sun(80, 69, 150)
    ],
    margins: [
      { id:'manicule', file:'home/manicule.png', frames:1, fps:1, w:120, side:'left', top:'4%', move:'bob',
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
      { id:'owl-magister',    file:'experience/owl-magister.png',    frames:3, fps:3, w:160, x:62, y:12, plane:'mid', move:'bob', dur:3,
        note:'Сова-магистр за кафедрой: указка у свитка → поднята → сова моргает.' },
      { id:'hedgehog-pupils', file:'experience/hedgehog-pupils.png', frames:1, fps:1, w:170, x:28, y:11, plane:'mid', move:'sway', dur:4, flip:true,
        note:'Трое ежей-школяров на лавке: один пишет, второй спит, третий тянет лапу.' },
      cloud('experience/cloud-a.png', 160, 80, 170, .06), cloud('experience/cloud-b.png', 120, 90, 220, .25),
      cloud('experience/cloud-a.png', 110, 70, 250, .45), cloud('experience/cloud-b.png', 140, 84, 190, .66),
      cloud('experience/cloud-a.png', 100, 92, 230, .88),
      sun(70, 80, 130)
    ],
    margins: [
      { id:'inkpot', file:'experience/inkpot.png', frames:1, fps:1, w:110, side:'right', top:'12%', move:'bob',
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
      { id:'cat-astrologer', file:'research/cat-astrologer.png', frames:3, fps:3, w:150, x:66, y:22, plane:'back', move:'idle',
        note:'Кот-звездочёт в колпаке: подносит астролябию к глазу → опускает → записывает в кодекс.' },
      { id:'flying-book',    file:'research/flying-book.png',    frames:3, fps:6, w:100, x:0,  y:78, plane:'sky', move:'fly', dur:42, phase:.3,
        note:'Книга летит, хлопая страницами, как птица: вверх → середина → вниз.' },
      { id:'moon',           file:'research/moon.png',           frames:1, fps:1, w:130, x:6,  y:68, plane:'sky', move:'bob', dur:6,
        note:'Полумесяц с сонным лицом.' },
      star(24, 86, 40, 3.2, .1), star(35, 80, 28, 4.1, .6), star(46, 90, 46, 2.8, .3), star(58, 76, 26, 3.7, .8),
      star(70, 88, 34, 4.4, .45), star(82, 80, 42, 3.1, .2), star(90, 90, 24, 3.9, .7), star(16, 78, 22, 4.6, .55),
      star(52, 83, 20, 3.4, .9), star(76, 85, 24, 4.0, .35), star(64, 94, 22, 3.3, .05), star(30, 94, 20, 4.2, .75),
      cloud('home/cloud-a.png', 190, 80, 230, .1, { opacity:.3, filter:'brightness(.6) saturate(.5)' }),
      cloud('home/cloud-b.png', 140, 87, 280, .45, { opacity:.26, filter:'brightness(.6) saturate(.5)' }),
      cloud('home/cloud-c.png', 170, 78, 250, .78, { opacity:.28, filter:'brightness(.6) saturate(.5)' })
    ],
    margins: [
      { id:'bookworm', file:'research/bookworm.png', frames:1, fps:1, w:120, side:'left', top:'10%', move:'bob',
        note:'Книжный червь в очках выглядывает из толстого тома.' }
    ]
  },

  education: {
    name: 'Монастырь на холме',
    mood: 'Прохладный зелёный полдень, охристая дорога.',
    raw: rawFiles('education'),
    h: 55,
    grid: [
      ['fox-monk', 'fox-monk', 'fox-monk', 'goose-cap'],
      ['bell',     'candle',   'cloud-a',  'cloud-b']
    ],
    layers: sceneLayers('education', {
      far:    'Зелёные холмы, монастырь со скрипториумом на вершине.',
      mid:    'Плодовые деревья и плетень.',
      ground: 'Охристая дорога к воротам, лопухи.'
    }, 'experience/ground.png', { far:20, mid:11.25, ground:0 }),
    sprites: [
      { id:'fox-monk',  file:'education/fox-monk.png',  frames:3, fps:6, w:150, x:22, y:20, plane:'mid', move:'pace', dur:26, range:420,
        note:'Лис-монах несёт стопку книг выше головы: шаг левой → середина → шаг правой.' },
      { id:'goose-cap', file:'education/goose-cap.png', frames:1, fps:1, w:110, x:72, y:20, plane:'mid', move:'hop', dur:5,
        note:'Гусь в академической шапочке с важным видом.' },
      { id:'bell',      file:'education/bell.png',      frames:1, fps:1, w:90,  x:52, y:19, plane:'mid', move:'sway', dur:3,
        note:'Колокол в деревянной раме, стоит на земле.' },
      cloud('education/cloud-a.png', 170, 80, 170, .05), cloud('education/cloud-b.png', 120, 90, 220, .25),
      cloud('education/cloud-a.png', 120, 72, 250, .45), cloud('education/cloud-b.png', 150, 86, 190, .65),
      cloud('education/cloud-a.png', 100, 93, 230, .87),
      sun(70, 77, 120)
    ],
    margins: [
      { id:'candle', file:'education/candle.png', frames:1, fps:1, w:100, side:'right', top:'8%', move:'bob',
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
    }, 'research/ground.png', { far:20, mid:10.4, ground:0 }),
    sprites: [
      { id:'dragon-interpreter', file:'skills/dragon-interpreter.png', frames:3, fps:3, w:180, x:58, y:20, plane:'mid', move:'bob', dur:3.4,
        note:'Трёхголовый дракон-толмач: говорит левая голова → средняя → правая.' },
      { id:'beaver-carver',      file:'skills/beaver-carver.png',      frames:3, fps:6, w:140, x:20, y:21, plane:'mid', move:'idle',
        note:'Бобр строгает ложку: нож вверх → вниз → стружка летит.' },
      { id:'badger-lute',        file:'skills/badger-lute.png',        frames:1, fps:1, w:130, x:82, y:20, plane:'mid', move:'sway', dur:2.6,
        note:'Барсук с лютней.' },
      cloud('home/cloud-a.png', 150, 80, 220, .12), cloud('home/cloud-b.png', 110, 90, 260, .5),
      cloud('home/cloud-c.png', 130, 72, 240, .82)
    ],
    margins: [
      { id:'three-tongues', file:'skills/three-tongues.png', frames:1, fps:1, w:120, side:'left', top:'46%', move:'bob',
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
      far:    'Маяк на мысу и паруса.',
      mid:    'Полосатые шатры и подмостки уличного театра.',
      ground: 'Охристая площадь.'
    }, 'water', { far:18.75, mid:10.2, ground:0 }).map(function(l){ return l.kind === 'far' ? Object.assign(l, { under:'#cab8a0' }) : l; }),
    sprites: [
      { id:'bear-stilts', file:'festivals/bear-stilts.png', frames:3, fps:5, w:170, x:24, y:20, plane:'mid', move:'pace', dur:22, range:380,
        note:'Медведь на ходулях жонглирует яблоками: шаг → яблоки вверх → шаг.' },
      { id:'goat-jester', file:'festivals/goat-jester.png', frames:2, fps:3, w:130, x:70, y:21, plane:'mid', move:'hop', dur:3.5,
        note:'Козёл-шут в колпаке с бубенцами пляшет: левая нога → правая.' },
      { id:'pennants',    file:'festivals/pennants.png',    frames:1, fps:1, w:300, x:-4, y:74, plane:'sky', move:'sway', dur:6,
        note:'Связка флажков на верёвке: слева, от угла.' },
      { id:'pennants',    file:'festivals/pennants.png',    frames:1, fps:1, w:300, x:72, y:74, plane:'sky', move:'sway', dur:7, flip:true,
        note:'Та же связка, справа, зеркально.' },
      cloud('home/cloud-a.png', 160, 84, 200, .1,  { opacity:.8 }), cloud('home/cloud-b.png', 120, 92, 250, .4, { opacity:.8 }),
      cloud('home/cloud-c.png', 140, 78, 220, .7,  { opacity:.8 }),
      cloud('home/cloud-a.png', 110, 70, 260, .25, { opacity:.8 }), cloud('home/cloud-b.png', 150, 88, 190, .55, { opacity:.8 }),
      cloud('home/cloud-c.png', 120, 66, 240, .9,  { opacity:.8 }),
      sun(41, 46, 170)
    ],
    margins: [
      { id:'mask', file:'festivals/mask.png', frames:2, fps:1, w:110, side:'right', top:'20%', move:'bob',
        note:'Театральная маска: кадр 1 — смех, кадр 2 — плач.' }
    ]
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
  experience: { file:'experience/owl-magister.png',   frames:3 },
  research:   { file:'research/cat-astrologer.png',   frames:3 },
  education:  { file:'education/fox-monk.png',        frames:3 },
  skillslang: { file:'skills/dragon-interpreter.png', frames:3 },
  festivals:  { file:'festivals/bear-stilts.png',     frames:3 }
};
