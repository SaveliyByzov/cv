/* Icon set: one consistent line-icon style (24x24, single stroke) shared
   across skills and interests. Icons are language-independent, referenced
   by key from each locale's skills/interests arrays. */
const ICONS = {
  teaching: '<path d="M2 9l10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><line x1="22" y1="9" x2="22" y2="15"/>',
  writing: '<path d="M4 20l1-5L16 4l4 4L9 19l-5 1Z"/><line x1="14" y1="6" x2="18" y2="10"/>',
  translate: '<path d="M3 7h12"/><path d="M11 3l4 4-4 4"/><path d="M21 17H9"/><path d="M13 21l-4-4 4-4"/>',
  edtech: '<rect x="3" y="4" width="18" height="13" rx="1.5"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  speaking: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/>',
  music: '<circle cx="6" cy="18" r="2.6"/><circle cx="17" cy="16" r="2.6"/><path d="M8.6 18V5l10-2v13"/>',
  reading: '<path d="M12 6c-2-1.3-5-1.3-8 0v13c3-1.3 6-1.3 8 0Z"/><path d="M12 6c2-1.3 5-1.3 8 0v13c-3-1.3-6-1.3-8 0Z"/><line x1="12" y1="6" x2="12" y2="19"/>',
  hiking: '<path d="M2 20 8 8l3.5 6L14 10l8 10Z"/><circle cx="8" cy="4" r="1.6"/>',
  travel: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z"/>',
  woodwork: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.4"/>',
  drawing: '<path d="M4 20l1.5-5.5L14 6l4 4-8.5 8.5L4 20Z"/><path d="M12.5 7.5l4 4"/><path d="M3 21h5"/>'
};

/* The translations live in i18n.en.js, i18n.ru.js and i18n.sr.js: a page loads only its own language. */
const T = {};
