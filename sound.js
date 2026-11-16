/* =====================================================================
   Quiet sound: a dungeon-synth track in the background (assets/audio, `Dread Castle` by Scott Elliott, CC BY 4.0), a soft pluck made in the browser when a character speaks, a page rustle when you follow a link. Where the browser cannot play Ogg, a slow plucked melody is made in the browser instead. It is OFF until the visitor presses the note button,
   and the choice is remembered. Browsers only allow sound after a touch or
   key press, so a "left on" setting starts at the first touch.
   ===================================================================== */
(function(){
'use strict';

const KEY = 'sb-sound';
/* D dorian, D3 .. A4: a gentle, medieval-sounding mode */
const SCALE = [146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

let ctx = null, master = null, on = false, melT = 0, idx = 4, armed = false, track = null, fadeT = 0;
const cache = {};

function wanted(){ try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
function save(v){ try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }

function ensure(){
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 3000;
  master.connect(lp); lp.connect(ctx.destination);
  /* a soft echo, like a stone room */
  const dl = ctx.createDelay(1), fb = ctx.createGain(), wet = ctx.createGain();
  dl.delayTime.value = .31; fb.gain.value = .32; wet.gain.value = .34;
  lp.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(ctx.destination);
  return ctx;
}

/* Karplus-Strong: a burst of noise circulating in a short delay line is a plucked string */
function pluckBuffer(freq){
  const k = Math.round(freq);
  if (cache[k]) return cache[k];
  const sr = ctx.sampleRate, len = Math.floor(sr * 1.8), N = Math.max(2, Math.round(sr / freq));
  const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0), line = new Float32Array(N);
  for (let i = 0; i < N; i++) line[i] = Math.random() * 2 - 1;
  let p = 0;
  for (let i = 0; i < len; i++) {
    const a = line[p], b = line[(p + 1) % N];
    d[i] = a;
    line[p] = (a + b) * 0.498;
    p = (p + 1) % N;
  }
  for (let i = 0; i < len; i++) { const t = i / len; d[i] *= (1 - t) * (1 - t); }
  cache[k] = buf;
  return buf;
}
function pluck(freq, gain){
  if (!ctx || !master) return;
  const src = ctx.createBufferSource(), g = ctx.createGain();
  src.buffer = pluckBuffer(freq);
  g.gain.value = gain;
  src.connect(g); g.connect(master);
  src.start();
}

function melody(){
  clearTimeout(melT);
  if (on && ctx && !document.hidden && ctx.state === 'running' && Math.random() > .2) {
    const step = [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)];
    idx = Math.max(0, Math.min(SCALE.length - 1, idx + step));
    pluck(SCALE[idx], .2 + Math.random() * .1);
    if (Math.random() < .25) pluck(SCALE[Math.max(0, idx - 2)], .11);
  }
  melT = setTimeout(melody, 520 + Math.random() * 800);
}

function fade(to, secs){
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(to, t + secs);
}

/* the background track (Ogg Vorbis); its place is kept from page to page */
const TRACK_VOL = .4;
function trackSrc(){ return (document.body.dataset.root || '') + 'assets/audio/dread-castle.ogg'; }
function canTrack(){ const a = document.createElement('audio'); return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')); }
function fadeTrack(to, ms, done){
  clearInterval(fadeT);
  if (!track) return;
  const from = track.volume, t0 = Date.now();
  fadeT = setInterval(function(){
    const k = Math.min(1, (Date.now() - t0) / ms);
    try { track.volume = from + (to - from) * k; } catch (e) {}
    if (k >= 1) { clearInterval(fadeT); if (done) done(); }
  }, 40);
}
function startTrack(){
  if (!canTrack()) return false;
  if (!track) {
    track = new Audio(trackSrc());
    track.loop = true; track.volume = 0;
    let at = 0; try { at = parseFloat(sessionStorage.getItem('sb-music-t') || '0') || 0; } catch (e) {}
    if (at) track.addEventListener('loadedmetadata', function(){ try { track.currentTime = at % (track.duration || 1e9); } catch (e) {} }, { once:true });
  }
  const pr = track.play();
  if (pr && pr.catch) pr.catch(function(){});
  fadeTrack(TRACK_VOL, 1800);
  return true;
}

function start(){
  const c = ensure();
  if (!c) return false;
  if (c.state === 'suspended') c.resume();
  on = true;
  fade(.5, .9);
  if (!startTrack()) melody();
  return true;
}
function stop(){
  on = false;
  fade(0, .4);
  clearTimeout(melT);
  fadeTrack(0, 500, function(){ if (track) track.pause(); });
}

function hash(s){ let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

window.SB_SOUND = {
  wanted: wanted,
  /* the note button */
  toggle: function(){
    if (on) { stop(); save(false); return false; }
    const ok = start();
    save(ok);
    if (ok) pluck(SCALE[7], .3);
    return ok;
  },
  /* "left on": start at the first touch of this page */
  arm: function(){
    if (!wanted() || armed) return;
    armed = true;
    const go = function(){
      document.removeEventListener('pointerdown', go, true);
      document.removeEventListener('keydown', go, true);
      if (wanted() && !on) { start(); const b = document.getElementById('sound-btn'); if (b) b.setAttribute('aria-pressed', 'true'); }
    };
    document.addEventListener('pointerdown', go, true);
    document.addEventListener('keydown', go, true);
  },
  /* a character speaks: its own note */
  chime: function(key){
    if (!on || !ctx || ctx.state !== 'running') return;
    pluck(SCALE[6 + (hash(String(key)) % 6)], .3);
  },
  /* a page is turned */
  page: function(){
    if (!on || !ctx || ctx.state !== 'running') return;
    const len = Math.floor(ctx.sampleRate * .3), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) { const t = i / len; d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) * (1 - t); }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = b; f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = .7; g.gain.value = .16;
    s.connect(f); f.connect(g); g.connect(master); s.start();
  }
};

document.addEventListener('visibilitychange', function(){
  if (document.hidden) { if (track) track.pause(); }
  else if (on && track) { const pr = track.play(); if (pr && pr.catch) pr.catch(function(){}); }
  if (!ctx) return;
  if (document.hidden) ctx.suspend();
  else if (on) ctx.resume();
});
window.addEventListener('pagehide', function(){
  if (track && on) { try { sessionStorage.setItem('sb-music-t', String(track.currentTime)); } catch (e) {} }
});
})();
