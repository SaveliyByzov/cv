/* =====================================================================
   Quiet sound effects, made in the browser (no audio files): a soft pluck
   when a character speaks, a page rustle when you follow a link. It is OFF
   until the visitor presses the note button, and the choice is remembered.
   Browsers only allow sound after a touch or key press, so a left-on setting
   starts at the first touch.
   ===================================================================== */
(function(){
'use strict';

const KEY = 'sb-sound';
/* D dorian, D3 .. A4: a gentle, medieval-sounding mode */
const SCALE = [146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

let ctx = null, master = null, on = false, melT = 0, idx = 4, armed = false;
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

function fade(to, secs){
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(to, t + secs);
}

function start(){
  const c = ensure();
  if (!c) return false;
  if (c.state === 'suspended') c.resume();
  on = true;
  fade(.5, .9);
  return true;
}
function stop(){
  on = false;
  fade(0, .4);
  clearTimeout(melT);
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
  if (!ctx) return;
  if (document.hidden) ctx.suspend();
  else if (on) ctx.resume();
});
})();
