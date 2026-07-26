import { COURSE, TRACKS, MODES } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { generateLesson, phonemesForAccent } from './engine.js';
import { store } from './state.js';
import { speak, speakLine, speakSequence, stopSpeech, pauseSpeech, resumeSpeech, setSpeechListener, ACCENT_LANG } from './audio.js';
import { articulationSVG, vocalTractSVG, vowelSpaceSVG } from './diagram.js';
import { SONNETS } from './data/sonnets.js';
import { CHEKHOV } from './data/chekhov.js';
import { ONEILL } from './data/oneill.js';
import { WILDE } from './data/wilde.js';
import { PIRANDELLO } from './data/pirandello.js';
import { scanLine } from './scan.js';
import { loadPron, ipaFor } from './pron.js';

const langFor = lesson => ACCENT_LANG[lesson?.accent] ?? 'en-GB';

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Speechcraft emblem — winged staff + open book, encircled. Brand mark.
const EMBLEM = `<svg viewBox="0 0 100 104" class="emblem" aria-hidden="true">
  <circle cx="50" cy="45" r="32" fill="none" stroke="#2f3a2e" stroke-width="2"/>
  <line x1="50" y1="20" x2="50" y2="70" stroke="#2f3a2e" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="50" cy="17" r="4.6" fill="#a99bc4"/>
  <path d="M49 31 C40 25 30 27 24 33 C33 33 41 35 49 39 Z" fill="#8d997d"/>
  <path d="M51 31 C60 25 70 27 76 33 C67 33 59 35 51 39 Z" fill="#8d997d"/>
  <path d="M49 40 C42 36 34 37 29 41 C37 41 43 43 49 46 Z" fill="#8d997d" opacity="0.72"/>
  <path d="M51 40 C58 36 66 37 71 41 C63 41 57 43 51 46 Z" fill="#8d997d" opacity="0.72"/>
  <path d="M50 44 C44 49 56 54 50 59 C44 64 56 68 50 72" fill="none" stroke="#6f8657" stroke-width="2" stroke-linecap="round"/>
  <path d="M50 64 C42 58 30 58 22 62 L22 84 C30 80 42 80 50 86 C58 80 70 80 78 84 L78 62 C70 58 58 58 50 64 Z" fill="#f6f1e8" stroke="#2f3a2e" stroke-width="2" stroke-linejoin="round"/>
  <line x1="50" y1="64" x2="50" y2="86" stroke="#2f3a2e" stroke-width="1.6"/>
</svg>`;

// Clickable brand lockup — emblem + wordmark stacked over the tagline.
// Appears in every page header and returns home.
const BRAND_BTN = `<button class="brand brand-btn" id="brand-home">${EMBLEM}<span class="brand-text"><span class="brand-name">Speechcraft</span><span class="brand-sub">Speak · Learn · Connect</span></span></button>`;

// ── Navigation history: the back button walks this stack ──────
// Each sub-page records a thunk that re-renders it; goBack() pops the
// current page and re-runs the one beneath. Home is the root (empty stack).
let navStack = [];
let navRestoring = false;

function record(thunk) {
  stopSpeech();                                  // leaving/entering a page stops any reading
  if (navRestoring) { navRestoring = false; return; }
  if (navStack[navStack.length - 1] === thunk) return; // ignore same-page re-render
  navStack.push(thunk);
}

function goBack() {
  stopSpeech();
  navStack.pop();                                // drop the current page
  const prev = navStack[navStack.length - 1];
  navRestoring = true;                           // prev's record() shouldn't re-push
  if (prev) prev(); else renderHome();
}

// Standard header for a sub-page: back + brand (→ home) + centered title + stats.
function pageTopbar(title, color) {
  return `
    <header class="topbar">
      <button class="backbtn" id="nav-back" aria-label="Back" title="Back">‹</button>
      ${BRAND_BTN}
      <div class="track-title" style="color:${color}">${title}</div>
      <div class="stats"><span class="stat">⚡ ${store.xp} XP</span></div>
    </header>`;
}

function wireBrandHome() {
  document.getElementById('brand-home')?.addEventListener('click', renderHome);
  document.getElementById('nav-back')?.addEventListener('click', goBack);
}

// Each track has its own unlock chain, independent of the others.
const unitById = Object.fromEntries(COURSE.map(u => [u.id, u]));

// Mini-game checkpoints woven between lessons: after every 2 lessons in
// a unit, a short review game covering everything the unit taught so far.
function expandUnit(unit) {
  const out = [];
  const covered = [];
  unit.lessons.forEach((l, i) => {
    out.push(l);
    covered.push(l);
    if ((i + 1) % 2 === 0 && unit.lessons.length > 1) {
      const phonemes = [...new Set(covered.flatMap(x => x.phonemes ?? []))];
      const types = [...new Set(covered.flatMap(x => x.types ?? []))];
      const accent = covered.find(x => x.accent)?.accent;
      const shiftTo = covered.find(x => x.shiftTo)?.shiftTo;
      // sprinkle in extra game-y types that fit the material
      const extras = accent || shiftTo ? ['fillBlank'] : ['match', 'fillBlank', 'gapBuild'];
      out.push({
        id: `chk-${unit.id}-${(i + 1) / 2}`,
        title: 'Checkpoint game',
        checkpoint: true,
        phonemes,
        types: [...new Set([...types, ...extras])],
        accent,
        shiftTo,
        count: 5,
      });
    }
  });
  return out;
}

const UNIT_EXPANDED = Object.fromEntries(COURSE.map(u => [u.id, expandUnit(u)]));
const TRACK_LESSONS = Object.fromEntries(TRACKS.map(t => [
  t.id,
  t.unitIds.flatMap(uid => UNIT_EXPANDED[uid].map(l => ({ ...l, unit: unitById[uid], track: t }))),
]));
const ALL_LESSONS = Object.values(TRACK_LESSONS).flat();

function isUnlocked(lesson) {
  if (store.freePlay) return true;
  const chain = TRACK_LESSONS[lesson.track.id];
  const i = chain.findIndex(l => l.id === lesson.id);
  return i === 0 || store.isCompleted(chain[i - 1].id);
}

function trackProgress(track) {
  const chain = TRACK_LESSONS[track.id];
  return { done: chain.filter(l => store.isCompleted(l.id)).length, total: chain.length };
}

// Where a finished/quit lesson returns to.
function exitLesson(lesson) {
  if (lesson.arcade) return renderArcade();
  if (lesson.track) return renderTrack(lesson.track);
  return renderHome();
}

// Which dialect the arcade games draw their words from (null = core IPA).
const ARCADE_DIALECTS = [
  { id: null, label: 'Core IPA', icon: 'ʃə' },
  { id: 'nam', label: 'Neutral American', icon: '🇺🇸' },
  { id: 'rp', label: 'RP', icon: '🇬🇧' },
  { id: 'aus', label: 'Australian', icon: '🇦🇺' },
];
let arcadeAccent = null;

// A single-mode arcade session: one exercise type, played on its own,
// in whichever dialect is currently selected.
function modeLesson(mode) {
  return {
    id: 'mode-' + mode.id + (arcadeAccent ? '-' + arcadeAccent : ''),
    title: mode.title,
    practice: true,
    arcade: true,
    mode,
    accent: arcadeAccent,
    shiftTo: arcadeAccent ?? undefined,
    phonemes: arcadeAccent ? phonemesForAccent(arcadeAccent) : (mode.phonemes ?? []),
    types: [mode.type],
    count: 10,
    track: null,
  };
}

const TRACK_ACCENT = { nam: 'nam', rp: 'rp', aus: 'aus' };

// A synthetic lesson drawing on everything the track teaches.
function practiceLesson(track) {
  const chain = TRACK_LESSONS[track.id];
  const phonemes = [...new Set(chain.flatMap(l => l.phonemes ?? []))];
  const types = [...new Set(chain.flatMap(l => l.types ?? []))];
  if (!types.includes('fillBlank') && track.id !== 'shift') types.push('fillBlank');
  return {
    id: 'practice-' + track.id,
    title: track.title + ' — practice',
    practice: true,
    accent: TRACK_ACCENT[track.id],
    shiftTo: TRACK_ACCENT[track.id],
    phonemes,
    types,
    track,
  };
}

// ── Home: track picker ────────────────────────────────────────

function renderHome() {
  stopSpeech();
  navStack = [];              // home is the root of the back stack
  navRestoring = false;
  const cards = TRACKS.map(t => {
    const { done, total } = trackProgress(t);
    return `
      <button class="track-card" data-track="${t.id}" style="--track-color:${t.color}">
        <div class="track-glyph">${t.icon}</div>
        <div class="track-info">
          <h2>${esc(t.title)}${t.accent ? ' <span class="badge badge-dark">DIALECT</span>' : ''}${t.drills ? ' <span class="badge badge-dark">DRILLS</span>' : ''}${trackProgress(t).done === trackProgress(t).total ? ' <span class="badge badge-gold">🎓 MASTERED</span>' : ''}</h2>
          <p>${esc(t.blurb)}</p>
          <div class="track-progress">
            <div class="track-progress-bar"><div style="width:${total ? Math.round(done / total * 100) : 0}%"></div></div>
            <span>${done}/${total}</span>
          </div>
        </div>
        <div class="track-arrow">›</div>
      </button>`;
  }).join('');

  app.innerHTML = `
    <header class="topbar">
      ${BRAND_BTN}
      <div class="stats">
        <span class="stat">🔥 ${store.displayStreak}</span>
        <span class="stat">⚡ ${store.xp} XP</span>
        <button class="freeplay ${store.freePlay ? 'on' : ''}" id="freeplay"
                title="Free play: unlock all lessons">${store.freePlay ? '🔓' : '🔒'}</button>
      </div>
    </header>
    ${store.freePlay ? '<p class="freeplay-note">Free play is on — every lesson is unlocked.</p>' : ''}
    <main class="track-list">
      <h1 class="home-heading">Choose your track</h1>
      ${cards}
      <button class="track-card arcade-entry" id="arcade-entry" style="--track-color:#c99e58">
        <div class="track-glyph">🕹️</div>
        <div class="track-info">
          <h2>Arcade</h2>
          <p>Every game and exercise on its own — pick one and just play.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
      <button class="track-card chart-entry" id="chart-entry" style="--track-color:#64748b">
        <div class="track-glyph">📖</div>
        <div class="track-info">
          <h2>The IPA Handbook</h2>
          <p>The chart, your instrument, and the vowel map — the reference shelf.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
      <button class="track-card text-entry" id="text-entry" style="--track-color:#8a6d3b">
        <div class="track-glyph">📜</div>
        <div class="track-info">
          <h2>Text &amp; Delivery</h2>
          <p>Speak real text aloud — Shakespeare’s sonnets, with metre and sound.</p>
        </div>
        <div class="track-arrow">›</div>
      </button>
    </main>`;

  wireBrandHome();
  document.getElementById('freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderHome();
  });
  document.getElementById('arcade-entry').addEventListener('click', renderArcade);
  document.getElementById('chart-entry').addEventListener('click', renderHandbook);
  document.getElementById('text-entry').addEventListener('click', renderTextLibrary);
  app.querySelectorAll('.track-card[data-track]').forEach(btn =>
    btn.addEventListener('click', () => renderTrack(TRACKS.find(t => t.id === btn.dataset.track)))
  );
}

// ── Arcade: single-mode games ─────────────────────────────────

function renderArcade() {
  record(renderArcade);
  const cards = MODES.map(m => `
    <button class="mode-card" data-mode="${m.id}">
      <span class="mode-icon">${m.icon}</span>
      <span class="mode-title">${esc(m.title)}</span>
      <span class="mode-blurb">${esc(m.blurb)}</span>
    </button>`).join('');

  const chips = ARCADE_DIALECTS.map(d => `
    <button class="dialect-chip ${d.id === arcadeAccent ? 'on' : ''}" data-dialect="${d.id ?? ''}">
      <span class="dialect-icon">${d.icon}</span>${esc(d.label)}
    </button>`).join('');
  const current = ARCADE_DIALECTS.find(d => d.id === arcadeAccent);

  app.innerHTML = `
    ${pageTopbar('🕹️ Arcade', '#c99e58')}
    <main class="track-list">
      <p class="track-blurb">Pick a game. Endless rounds, no hearts lost — just practice.</p>
      <div class="dialect-picker">
        <span class="dialect-label">Practise in</span>
        <div class="dialect-chips">${chips}</div>
      </div>
      <p class="dialect-note">Games use <b>${esc(current.label)}</b> transcriptions.</p>
      <div class="mode-grid">${cards}</div>
    </main>`;

  wireBrandHome();
  app.querySelectorAll('.dialect-chip').forEach(btn =>
    btn.addEventListener('click', () => {
      arcadeAccent = btn.dataset.dialect || null;
      renderArcade();
    })
  );
  app.querySelectorAll('.mode-card').forEach(btn =>
    btn.addEventListener('click', () => startLesson(modeLesson(MODES.find(m => m.id === btn.dataset.mode))))
  );
}

// ── The IPA Handbook: the reference shelf ─────────────────────

function renderHandbook() {
  record(renderHandbook);
  const cards = [
    { id: 'chart', icon: '📖', title: 'The IPA Chart',
      blurb: 'Every symbol, its sound, and example words — tap any to hear it and see how it’s made.' },
    { id: 'instrument', icon: '🎭', title: 'Your Instrument',
      blurb: 'A tour of the vocal tract — the parts you shape every sound with.' },
    { id: 'vowels', icon: '📐', title: 'The Vowel Map',
      blurb: 'Where every vowel sits in the mouth — high to low, front to back.' },
  ];
  app.innerHTML = `
    ${pageTopbar('📚 The IPA Handbook', '#64748b')}
    <main class="track-list">
      <p class="track-blurb">Your reference shelf — the alphabet of sounds and the instrument that makes them.</p>
      ${cards.map(c => `
        <button class="track-card handbook-entry" data-page="${c.id}" style="--track-color:#64748b">
          <div class="track-glyph">${c.icon}</div>
          <div class="track-info"><h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;

  wireBrandHome();
  const go = { chart: renderChart, instrument: renderInstrument, vowels: renderVowelMap };
  app.querySelectorAll('.handbook-entry').forEach(btn =>
    btn.addEventListener('click', () => go[btn.dataset.page]())
  );
}

// "Your Instrument": labelled vocal-tract anatomy.
function renderInstrument() {
  record(renderInstrument);
  const parts = [
    ['Lips', 'round, spread, or pressed together — every /p b m w/ and the shape of your vowels.'],
    ['Teeth', 'the top teeth meet the lip for /f v/ and the tongue for /θ ð/.'],
    ['Alveolar ridge', 'the bump behind your top teeth — home base for /t d n s z l/.'],
    ['Hard palate', 'the bony roof; the tongue arches toward it for /j/ and “ee”.'],
    ['Soft palate (velum)', 'raises to seal the nose, or lowers for the nasals /m n ŋ/.'],
    ['Tongue', 'the star of the show — tip, front, and back each carve different sounds.'],
    ['Pharynx', 'the throat cavity; its size colours the vowel.'],
    ['Vocal folds (glottis)', 'buzz for voiced sounds, open for voiceless — and make /h/.'],
  ];
  app.innerHTML = `
    ${pageTopbar('🎭 Your Instrument', '#64748b')}
    <main class="guide instrument">
      <p class="track-blurb">You don’t play the voice — you <b>are</b> the instrument. Here’s the workshop.</p>
      <div class="anat-wrap">${vocalTractSVG()}</div>
      <dl class="anat-list">
        ${parts.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}
      </dl>
    </main>`;
  wireBrandHome();
}

// "The Vowel Map": every vowel on the quadrilateral.
function renderVowelMap() {
  record(renderVowelMap);
  app.innerHTML = `
    ${pageTopbar('📐 The Vowel Map', '#64748b')}
    <main class="guide vowel-map">
      <p class="track-blurb">Every vowel is just a tongue position. Height runs top (close) to bottom (open); the horizontal is front to back. Rounded vowels are ringed.</p>
      <div class="anat-wrap">${vowelSpaceSVG()}</div>
      <p class="artic-cap">Tap any symbol in <b>The IPA Chart</b> to hear it and see its own diagram.</p>
    </main>`;
  wireBrandHome();
}

// ── Text & Delivery: speak real text aloud ────────────────────

// Dialects you can read/scan/transcribe any text in.
const TEXT_DIALECTS = [
  { id: 'nam', label: 'Neutral American', lang: 'en-US', flag: '🇺🇸' },
  { id: 'rp', label: 'RP', lang: 'en-GB', flag: '🇬🇧' },
  { id: 'aus', label: 'Australian', lang: 'en-AU', flag: '🇦🇺' },
];
const dialectLang = id => (TEXT_DIALECTS.find(d => d.id === id) || TEXT_DIALECTS[1]).lang;
const dialectName = id => (TEXT_DIALECTS.find(d => d.id === id) || {}).label || '';

function renderTextLibrary() {
  record(renderTextLibrary);
  const cards = [
    { id: 'sonnets', icon: '📜', title: 'Shakespeare’s Sonnets', on: true,
      blurb: 'All 154 — speak them, scan the metre, study the sounds.' },
    { id: 'chekhov', icon: '🎭', title: 'Chekhov · Monologues', on: true,
      blurb: '35 speeches from eight plays — audition pieces, timed and tagged.' },
    { id: 'oneill', icon: '⚓', title: 'O’Neill · Monologues', on: true,
      blurb: '35 speeches from nine plays — American voices, dialect and status work.' },
    { id: 'wilde', icon: '🎩', title: 'Wilde · Monologues', on: true,
      blurb: '36 speeches from nine plays — RP wit, status and comic timing.' },
    { id: 'pirandello', icon: '🎪', title: 'Pirandello · Monologues', on: true,
      blurb: '36 speeches from three plays — identity, illusion, long-form build.' },
    { id: 'custom', icon: '✍️', title: 'Train Any Text', on: true,
      blurb: 'Paste a monologue, speech, or scene — practise it in any dialect.' },
  ];
  app.innerHTML = `
    ${pageTopbar('📜 Text & Delivery', '#8a6d3b')}
    <main class="track-list">
      <p class="track-blurb">Take the sounds off the chart and onto real text. Speak it aloud, feel the metre, study the pronunciation — in whatever dialect you’re working in.</p>
      ${cards.map(c => `
        <button class="track-card text-card ${c.on ? '' : 'soon'}" data-lib="${c.id}" ${c.on ? '' : 'disabled'} style="--track-color:#8a6d3b">
          <div class="track-glyph">${c.icon}</div>
          <div class="track-info"><h2>${esc(c.title)}${c.on ? '' : ' <span class="badge badge-dark">SOON</span>'}</h2><p>${esc(c.blurb)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelector('.text-card[data-lib="sonnets"]')?.addEventListener('click', renderSonnetList);
  app.querySelector('.text-card[data-lib="chekhov"]')?.addEventListener('click', () => renderLibraryList('chekhov'));
  app.querySelector('.text-card[data-lib="oneill"]')?.addEventListener('click', () => renderLibraryList('oneill'));
  app.querySelector('.text-card[data-lib="wilde"]')?.addEventListener('click', () => renderLibraryList('wilde'));
  app.querySelector('.text-card[data-lib="pirandello"]')?.addEventListener('click', () => renderLibraryList('pirandello'));
  app.querySelector('.text-card[data-lib="custom"]')?.addEventListener('click', renderCustomText);
}

function renderSonnetList() {
  record(renderSonnetList);
  const rows = SONNETS.map(s => `
    <button class="sonnet-row" data-n="${s.n}" data-search="${esc((s.n + ' ' + s.lines[0]).toLowerCase())}">
      <span class="sonnet-num">${s.n}</span>
      <span class="sonnet-open">${esc(s.lines[0])}</span>
      <span class="track-arrow">›</span>
    </button>`).join('');
  app.innerHTML = `
    ${pageTopbar('📜 Shakespeare’s Sonnets', '#8a6d3b')}
    <main class="track-list sonnet-list">
      <input class="sonnet-search" id="sonnet-search" type="search" placeholder="Search by number or opening line…" autocomplete="off">
      <p class="sonnet-hint" id="sonnet-hint">154 sonnets · public domain</p>
      <div class="sonnet-rows" id="sonnet-rows">${rows}</div>
    </main>`;
  wireBrandHome();
  const rowsEl = app.querySelectorAll('.sonnet-row');
  rowsEl.forEach(r => r.addEventListener('click', () => renderSonnet(+r.dataset.n)));
  const search = document.getElementById('sonnet-search');
  const hint = document.getElementById('sonnet-hint');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    rowsEl.forEach(r => {
      const hit = !q || r.dataset.search.includes(q);
      r.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    hint.textContent = q ? `${shown} match${shown === 1 ? '' : 'es'}` : '154 sonnets · public domain';
  });
}

// ── Curated speech libraries (Chekhov, O'Neill, Wilde) ────────
// All three share one browser and one reader; they differ only in their data,
// their icon, and the dialect a piece is most naturally played in.

// Stage directions like "[Looking at his watch]" are shown but never spoken.
const stripStage = s => s.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
const mmss = secs => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

const LIBRARIES = {
  chekhov: { data: CHEKHOV, icon: '🎭', title: 'Chekhov · Monologues', accent: 'rp',
             note: 'public domain · tr. Fell & West' },
  oneill:  { data: ONEILL,  icon: '⚓', title: 'O’Neill · Monologues', accent: 'nam',
             note: 'public domain in the US' },
  wilde:   { data: WILDE,   icon: '🎩', title: 'Wilde · Monologues',   accent: 'rp',
             note: 'public domain' },
  pirandello: { data: PIRANDELLO, icon: '🎪', title: 'Pirandello · Monologues', accent: 'rp',
             note: 'public domain in the US · tr. Storer & Livingston' },
};

function renderLibraryList(key) {
  record(() => renderLibraryList(key));
  const lib = LIBRARIES[key];
  const plays = [...new Set(lib.data.map(s => s.work))];
  const summary = `${lib.data.length} speeches · ${plays.length} plays · ${lib.note}`;

  const groups = plays.map(work => {
    const rows = lib.data.filter(s => s.work === work).map(s => `
      <button class="sonnet-row chek-row" data-id="${esc(s.id)}"
              data-search="${esc(`${s.work} ${s.character} ${s.title} ${(s.themes ?? s.tone ?? []).join(' ')} ${(s.skills ?? []).join(' ')}`.toLowerCase())}">
        <span class="chek-meta">
          <span class="chek-char">${esc(s.character)}</span>
          <span class="chek-title">${esc(s.title)}</span>
          <span class="chek-sub">${s.act ? `Act ${esc(s.act)} · ` : ''}${s.words} words · ~${mmss(s.secs)}${s.note ? ' · ⚠ content note' : ''}</span>
        </span>
        <span class="track-arrow">›</span>
      </button>`).join('');
    return `<section class="chek-group"><h2 class="chart-h">${esc(work)}</h2>${rows}</section>`;
  }).join('');

  app.innerHTML = `
    ${pageTopbar(`${lib.icon} ${esc(lib.title)}`, '#8a6d3b')}
    <main class="track-list sonnet-list">
      <input class="sonnet-search" id="lib-search" type="search" placeholder="Search by character, play, title or tone…" autocomplete="off">
      <p class="sonnet-hint" id="lib-hint">${esc(summary)}</p>
      <div id="lib-rows">${groups}</div>
    </main>`;
  wireBrandHome();

  const rows = app.querySelectorAll('.chek-row');
  rows.forEach(r => r.addEventListener('click', () => renderPiece(key, r.dataset.id)));
  const search = document.getElementById('lib-search');
  const hint = document.getElementById('lib-hint');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    rows.forEach(r => {
      const hit = !q || r.dataset.search.includes(q);
      r.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    app.querySelectorAll('.chek-group').forEach(g => {
      g.style.display = [...g.querySelectorAll('.chek-row')].some(r => r.style.display !== 'none') ? '' : 'none';
    });
    hint.textContent = q ? `${shown} match${shown === 1 ? '' : 'es'}` : summary;
  });
}

function renderPiece(key, id) {
  record(() => renderPiece(key, id));
  const lib = LIBRARIES[key];
  const s = lib.data.find(x => x.id === id);
  if (!s) return renderLibraryList(key);
  const i = lib.data.findIndex(x => x.id === id);
  const prev = lib.data[i - 1], next = lib.data[i + 1];
  renderReader({
    label: s.character,
    lines: s.lines,
    accent: lib.accent,
    verse: false,                     // prose — no pentameter framing
    meta: s,
    // Same narrator voices as the sonnets; missing clips fall back to device TTS.
    clip: (n, acc) => CURATED_CLIP_DIALECTS.includes(acc) ? `audio/${key}/${acc}/${s.id}-${n}.mp3` : null,
    prev: prev ? { label: '‹ Previous', go: () => renderPiece(key, prev.id) } : null,
    next: next ? { label: 'Next ›', go: () => renderPiece(key, next.id) } : null,
  });
}
// Paste any monologue / speech / scene and open it in the reader.
function renderCustomText() {
  record(renderCustomText);
  const saved = store.customText || {};
  let accent = saved.accent || 'nam';
  app.innerHTML = `
    ${pageTopbar('✍️ Train Any Text', '#8a6d3b')}
    <main class="track-list custom-editor">
      <p class="track-blurb">Paste any monologue, speech, or scene — one line per line. Then speak it aloud, scan its rhythm, and study every word’s pronunciation in the dialect you’re working in.</p>
      <input class="sonnet-search" id="ct-title" placeholder="Title (optional) — e.g. “Hamlet 3.1”" value="${esc(saved.title || '')}">
      <textarea class="ct-area" id="ct-body" placeholder="Paste your text here…">${esc(saved.body || '')}</textarea>
      <div class="dialect-picker"><span class="dialect-label">Dialect</span><div class="dialect-chips" id="ct-dialects"></div></div>
      <button class="btn btn-practice" id="ct-go">Open in trainer →</button>
    </main>`;
  wireBrandHome();
  const chipsEl = document.getElementById('ct-dialects');
  const draw = () => chipsEl.innerHTML = TEXT_DIALECTS.map(d =>
    `<button class="dialect-chip ${d.id === accent ? 'on' : ''}" data-d="${d.id}"><span class="dialect-icon">${d.flag}</span>${d.label}</button>`).join('');
  draw();
  chipsEl.addEventListener('click', e => {
    const b = e.target.closest('.dialect-chip'); if (!b) return;
    accent = b.dataset.d; draw();
  });
  document.getElementById('ct-go').addEventListener('click', () => {
    const title = document.getElementById('ct-title').value.trim();
    const body = document.getElementById('ct-body').value;
    const lines = body.split(/\n/).map(l => l.replace(/\s+$/, '')).filter(l => l.trim() !== '');
    if (!lines.length) { document.getElementById('ct-body').focus(); return; }
    store.saveCustomText({ title, body, accent });
    renderReader({ label: title || 'Your text', lines, accent, editor: true });
  });
}

// One sonnet, opened in the reader (defaults to RP; dialect is switchable).
function renderSonnet(n) {
  record(() => renderSonnet(n));
  const s = SONNETS.find(x => x.n === n);
  if (!s) return renderSonnetList();
  const idx = SONNETS.findIndex(x => x.n === n);
  const prev = SONNETS[idx - 1], next = SONNETS[idx + 1];
  renderReader({
    label: `Sonnet ${n}`, lines: s.lines, accent: 'rp',
    // Pre-generated ElevenLabs clip for a given 1-based line + dialect, if any.
    clip: (i, acc) => CURATED_CLIP_DIALECTS.includes(acc) ? `audio/sonnets/${acc}/${n}-${i}.mp3` : null,
    prev: prev ? { label: `‹ Sonnet ${prev.n}`, go: () => renderSonnet(prev.n) } : null,
    next: next ? { label: `Sonnet ${next.n} ›`, go: () => renderSonnet(next.n) } : null,
  });
}

// Dialects that have any pre-generated sonnet audio (missing files fall back
// to the device voice, so partial coverage is fine).
const CURATED_CLIP_DIALECTS = ['nam', 'rp', 'aus'];

// The reader: any text, three ways (Speak / Scan / Sound), any dialect.
function renderReader({ label, lines, accent, prev, next, editor, clip, verse = true, meta = null }) {
  // Header for a curated piece: where it's from, how long it runs, what it asks of you.
  const metaHtml = meta ? `
    <div class="piece-meta">
      <h1 class="piece-title">${esc(meta.title)}</h1>
      <p class="piece-source">${esc(meta.character)} · <i>${esc(meta.work)}</i>${meta.act ? ` · Act ${esc(meta.act)}` : ''}</p>
      ${meta.scene ? `<p class="piece-scene">${esc(meta.scene)}</p>` : ''}
      <p class="piece-stats">${meta.words} words · ~${mmss(meta.secs)} at performance pace${meta.translator ? ` · tr. ${esc(meta.translator)}` : ''}</p>
      <div class="piece-tags">
        ${(meta.themes ?? meta.tone ?? []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}
        ${(meta.skills ?? []).map(t => `<span class="tag tag-skill">${esc(t)}</span>`).join('')}
        ${(meta.dialects ?? []).map(t => `<span class="tag tag-dialect">🗣 ${esc(t)}</span>`).join('')}
      </div>
      ${meta.note ? `<p class="content-note"><b>Content note:</b> ${esc(meta.note)}</p>` : ''}
    </div>` : '';
  app.innerHTML = `
    ${pageTopbar('📜 ' + esc(label), '#8a6d3b')}
    <main class="guide sonnet-view">
      ${metaHtml}
      <div class="dialect-picker reader-dialects"><span class="dialect-label">Dialect</span><div class="dialect-chips" id="rd-dialects"></div></div>
      <div class="sonnet-tabs">
        <button class="son-tab on" data-mode="speak">🔊 Listen</button>
        <button class="son-tab" data-mode="scan">📐 Scan</button>
        <button class="son-tab" data-mode="transcribe">🔤 IPA</button>
      </div>
      <div class="sonnet-pane" id="sonnet-pane"></div>
      <div class="sonnet-nav">
        ${editor ? '<button class="btn-lite" id="rd-edit">‹ Edit text</button>'
          : (prev ? `<button class="btn-lite" id="rd-prev">${esc(prev.label)}</button>` : '<span></span>')}
        ${next ? `<button class="btn-lite" id="rd-next">${esc(next.label)}</button>` : '<span></span>'}
      </div>
    </main>`;
  wireBrandHome();

  let cur = accent, mode = 'speak';
  const pane = document.getElementById('sonnet-pane');
  const drawDialects = () => document.getElementById('rd-dialects').innerHTML =
    TEXT_DIALECTS.map(d => `<button class="dialect-chip ${d.id === cur ? 'on' : ''}" data-d="${d.id}"><span class="dialect-icon">${d.flag}</span>${d.label}</button>`).join('');
  const show = m => {
    stopSpeech();
    mode = m;
    app.querySelectorAll('.son-tab').forEach(t => t.classList.toggle('on', t.dataset.mode === m));
    if (m === 'speak') { pane.innerHTML = speakPane(lines); wireSpeak(lines, cur, pane, clip); }
    else if (m === 'scan') { pane.innerHTML = scanPane(lines, verse); }
    else { pane.innerHTML = `<p class="pane-note">Loading the pronunciation dictionary…</p>`; fillSound(lines, cur, pane); }
  };
  drawDialects();
  document.getElementById('rd-dialects').addEventListener('click', e => {
    const b = e.target.closest('.dialect-chip'); if (!b) return;
    cur = b.dataset.d; drawDialects(); show(mode);
  });
  app.querySelectorAll('.son-tab').forEach(t => t.addEventListener('click', () => show(t.dataset.mode)));
  document.getElementById('rd-edit')?.addEventListener('click', () => { stopSpeech(); renderCustomText(); });
  document.getElementById('rd-prev')?.addEventListener('click', () => { stopSpeech(); prev.go(); });
  document.getElementById('rd-next')?.addEventListener('click', () => { stopSpeech(); next.go(); });
  show('speak');
}

// Render a line with any [stage direction] set apart from the spoken words.
function lineHtml(ln) {
  return esc(ln).replace(/\[[^\]]*\]/g, m => `<i class="stage-dir">${m}</i>`);
}

function speakPane(lines) {
  const html = lines.map((ln, i) =>
    `<button class="poem-line" data-idx="${i + 1}" data-say="${esc(stripStage(ln))}"><span class="ln-num">${i + 1}</span><span class="ln-text">${lineHtml(ln)}</span></button>`).join('');
  return `
    <p class="pane-note">Tap any line to hear it, or read the whole thing through. Let the punctuation set your breath — commas are quick lifts, line-ends and colons the real breaths. <i>Stage directions are shown but never spoken.</i></p>
    <button class="btn btn-practice sonnet-play" id="say-all">🔊 Read it all aloud</button>
    <div class="poem">${html}</div>`;
}

function wireSpeak(lines, accent, pane, clip) {
  const lang = dialectLang(accent);
  const clipFor = i => (clip ? clip(i, accent) : null);
  const btn = pane.querySelector('#say-all');
  let state = 'idle';                                   // idle | playing | paused
  const setBtn = () => {
    btn.textContent = state === 'playing' ? '⏸ Pause reading'
      : state === 'paused' ? '▶ Resume reading'
      : '🔊 Read it all aloud';
  };
  setSpeechListener(s => {
    state = (s === 'playing' || s === 'paused') ? s : 'idle';
    setBtn();
  });
  btn.addEventListener('click', () => {
    if (state === 'playing') pauseSpeech();
    else if (state === 'paused') resumeSpeech();
    else speakSequence(lines.map((t, i) => ({ text: stripStage(t), clipUrl: clipFor(i + 1) })), { lang });
  });
  pane.querySelectorAll('.poem-line').forEach(b =>
    b.addEventListener('click', () => speakLine(b.dataset.say, { lang, clipUrl: clipFor(+b.dataset.idx) })));
}

function scanPane(lines, verse = true) {
  const linesHtml = lines.map((ln) => {
    const { words, count, regular } = scanLine(stripStage(ln));
    const syls = words.map(w => {
      if (w.space) return '<span class="scan-sp"> </span>';
      return `<span class="scan-word">${w.syllables.map(sy =>
        `<span class="syl ${sy.stress}"><span class="syl-mark">${sy.stress === 'strong' ? '´' : '˘'}</span><span class="syl-txt">${esc(sy.text)}</span></span>`).join('')}</span>`;
    }).join('');
    return `<div class="scan-line">
      <div class="scan-syls">${syls}</div>
      <span class="scan-count ${verse && !regular ? 'off' : ''}">${count}${verse && !regular ? ' ⚠' : ''}</span>
    </div>`;
  }).join('');
  const intro = verse
    ? `<p class="pane-note"><b>Iambic pentameter</b> is five beats of <i>weak–<b>STRONG</b></i> (di-<b>DUM</b> ×5) — ten syllables a line. <span class="mk-strong">´</span> marks where the beat wants stress, <span class="mk-weak">˘</span> where it falls away. A count that isn’t 10 (⚠) is where the metre bends — a feminine ending, an extra foot, a headless line. Those are moments to notice, not fix.</p>`
    : `<p class="pane-note">This is <b>prose</b>, so there’s no fixed metre to hit — nothing here is a mistake. <span class="mk-strong">´</span> marks the syllables that carry natural word stress, <span class="mk-weak">˘</span> the ones that fall away, and the number is the syllable count. Use it to find the shape of a thought: where the weight lands, and how long a breath has to last.</p>`;
  return `
    ${intro}
    <p class="pane-note pane-caveat">The splits are computed, not perfect — the map, not the territory. Trust your ear where they disagree.</p>
    <div class="scan">${linesHtml}</div>`;
}

async function fillSound(lines, accent, pane) {
  try { await loadPron(); }
  catch {
    pane.innerHTML = `<p class="pane-note">Couldn’t load the pronunciation dictionary — check your connection and reopen this tab.</p>`;
    return;
  }
  let approxSeen = false, miss = 0;
  const linesHtml = lines.map((ln, i) => {
    const toks = stripStage(ln).split(/(\s+)/).map(tok => {
      if (/^\s*$/.test(tok)) return tok === '' ? '' : '<span class="scan-sp"> </span>';
      const r = ipaFor(tok, accent);
      if (!r) { miss++; return `<span class="tw"><span class="tw-word">${esc(tok)}</span><span class="tw-ipa tw-miss">—</span></span>`; }
      if (r.approx) approxSeen = true;
      return `<span class="tw"><span class="tw-word">${esc(tok)}</span><span class="tw-ipa">/${esc(r.ipa)}/</span></span>`;
    }).join('');
    return `<div class="tw-line"><span class="ln-num">${i + 1}</span><span class="tw-words">${toks}</span></div>`;
  }).join('');
  pane.innerHTML = `
    <p class="pane-note">Every word transcribed in <b>${esc(dialectName(accent))}</b>${approxSeen ? ' <span class="approx">≈ non-American dialects are rule-derived</span>' : ''}.${miss ? ` <span class="approx">${miss} not in the dictionary (—).</span>` : ''}</p>
    <div class="son-transcribe">${linesHtml}</div>`;
}

// ── The IPA chart: a reference to browse ──────────────────────

function renderChart() {
  record(renderChart);
  const syms = Object.entries(PHONEMES);
  const groups = [
    { title: 'Vowels', note: 'Single vowel sounds — short, long (ː), and the schwa /ə/.',
      items: syms.filter(([, p]) => p.type === 'vowel') },
    { title: 'Diphthongs', note: 'Vowels that glide from one position to another.',
      items: syms.filter(([, p]) => p.type === 'diphthong') },
    { title: 'Consonants', note: 'The consonant sounds of English.',
      items: syms.filter(([, p]) => p.type === 'consonant') },
  ];

  const section = g => `
    <section class="chart-section">
      <h2 class="chart-h">${esc(g.title)} <span>${g.items.length}</span></h2>
      <p class="chart-note">${esc(g.note)}</p>
      <div class="chart-grid">
        ${g.items.map(([sym, p]) => `
          <button class="chart-chip" data-sym="${esc(sym)}" title="How “${esc(sym)}” is made">
            <span class="chart-sym">${esc(sym)}</span>
            <span class="chart-meta">
              <span class="chart-name">${esc(p.name)}</span>
              <span class="chart-eg">${p.examples.slice(0, 2).map(w => `<b>${esc(w)}</b>`).join(', ')}</span>
            </span>
            <span class="chart-play">›</span>
          </button>`).join('')}
      </div>
    </section>`;

  app.innerHTML = `
    ${pageTopbar('📖 The IPA Chart', '#64748b')}
    <main class="tree chart-page">
      <p class="track-blurb">The full alphabet of sounds. Tap any symbol to see how it’s made and hear it.</p>
      ${groups.map(section).join('')}
    </main>`;

  wireBrandHome();
  app.querySelectorAll('.chart-chip').forEach(btn =>
    btn.addEventListener('click', () => renderSoundDetail(btn.dataset.sym))
  );
}

// Detail for one sound: articulation diagram, description, example words.
function renderSoundDetail(sym) {
  const p = PHONEMES[sym];
  if (!p) return renderChart();
  record(() => renderSoundDetail(sym));
  const diagram = articulationSVG(sym);
  const lang = ACCENT_LANG[({ 'ɝ': 'nam', 'ɚ': 'nam', 'ɑ': 'nam', 'oʊ': 'nam' }[sym])]
    ?? (['ɐ', 'ɐː', 'ʉː', 'æɪ', 'ɑɪ', 'æɔ', 'əʉ'].includes(sym) ? 'en-AU' : 'en-GB');
  const isVowel = p.type !== 'consonant';
  const chips = p.examples.map(w =>
    `<button class="word-chip" data-say="${esc(w)}">🔊 ${esc(w)}</button>`).join('');

  app.innerHTML = `
    ${pageTopbar(`/${esc(sym)}/`, '#64748b')}
    <main class="guide sound-detail">
      <div class="sound-hero">
        <button class="sound-big" id="say-sym" title="Hear it">/${esc(sym)}/</button>
        <div>
          <h1>${esc(p.name)}</h1>
          <p class="guide-text">${esc(p.hint)}.</p>
        </div>
      </div>
      ${diagram ? `<div class="artic-wrap">${diagram}
        <p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>` : ''}
      <h2 class="guide-heading">Hear it in words</h2>
      <div class="chips">${chips}</div>
    </main>`;

  wireBrandHome();
  const say = () => speak(p.examples[0], { lang });
  document.getElementById('say-sym').addEventListener('click', say);
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang })));
}

// ── Track page: that dialect's units & lessons ────────────────

// The face of a lesson node reflects what kind of lesson it is, like the
// Duolingo path: 📖 reading, 🎧 listening, ⭐ a plain level not yet beaten
// (checkpoints keep the dice, mastery finals the crown, done → ✓).
const LISTEN_TYPES = ['soundToSymbol', 'accentEar', 'minimalPair'];
const READ_TYPES = ['symbolToWord', 'typeWord', 'spellBlank', 'sentenceToEnglish', 'englishToIpa', 'gapBuild', 'fillBlank', 'build'];

function lessonKindEmoji(lesson) {
  const t = lesson.types || [];
  const listen = t.some(x => LISTEN_TYPES.includes(x));
  const read = t.some(x => READ_TYPES.includes(x));
  if (read && !listen) return '📖';   // sight-reading transcriptions
  if (listen && !read) return '🎧';   // ear-training / audio
  return '⭐';                          // mixed or teaching → a plain level
}

function lessonNodeIcon(lesson) {
  if (lesson.checkpoint) return { text: '🎲', ipa: false };
  if (/final|mastery/.test(lesson.id) || (lesson.count && lesson.count >= 12)) return { text: '👑', ipa: false };
  return { text: lessonKindEmoji(lesson), ipa: false };
}

// Winding path, Duolingo-style skeleton: sequential nodes zig-zagging down,
// one active "START" node with a mascot, sticky unit banners.
const PATH_OFFSETS = [0, 48, 70, 48, 0, -48, -70, -48];

function renderTrack(track) {
  record(() => renderTrack(track));
  const chain = TRACK_LESSONS[track.id];
  const active = chain.find(l => !store.isCompleted(l.id) && isUnlocked(l));
  let gi = 0;

  const unitsHtml = track.unitIds.map((uid, ui) => {
    const unit = unitById[uid];
    const rows = UNIT_EXPANDED[uid].map(raw => {
      const l = chain.find(x => x.id === raw.id);
      const done = store.isCompleted(l.id);
      const isActive = active && l.id === active.id;
      const unlocked = isUnlocked(l);
      const state = done ? 'done' : isActive ? 'active' : unlocked ? 'open' : 'locked';
      const dx = PATH_OFFSETS[gi % PATH_OFFSETS.length];
      gi++;
      const face = done ? { text: '✓', ipa: false } : lessonNodeIcon(l);
      const mascotSide = dx <= 0 ? 1 : -1;
      return `
        <div class="path-row">
          <button class="path-node ${state} ${l.checkpoint ? 'checkpoint' : ''}" data-lesson="${l.id}" ${unlocked ? '' : 'disabled'}
                  style="--dx:${dx}px; --node-color:${unit.color}" title="${esc(l.title)}">
            ${isActive ? '<span class="start-flag">START</span>' : ''}
            <span class="path-icon ${face.ipa ? 'ipa' : ''}">${esc(face.text)}</span>
          </button>
          ${isActive ? `<div class="path-mascot" style="left:calc(50% + ${dx + mascotSide * 78}px)">🎭</div>` : ''}
        </div>`;
    }).join('');
    return `
      <div class="unit-banner" style="--unit-color:${unit.color}">
        <div class="unit-banner-label">${esc(track.title)} · Unit ${ui + 1}</div>
        <div class="unit-banner-title">${esc(unit.title)}</div>
      </div>
      <div class="path">${rows}</div>`;
  }).join('');

  app.innerHTML = `
    ${pageTopbar(`${track.icon} ${esc(track.title)}`, track.color)}
    <main class="track-scroll">
      <div class="practice-row">
        <button class="btn btn-practice" id="practice">🎯 Practice — mixed review, no hearts lost</button>
      </div>
      ${unitsHtml}
    </main>`;

  wireBrandHome();
  document.getElementById('practice').addEventListener('click', () => startLesson(practiceLesson(track)));
  app.querySelectorAll('.path-node[data-lesson]:not([disabled])').forEach(btn =>
    btn.addEventListener('click', () => {
      const lesson = chain.find(l => l.id === btn.dataset.lesson);
      // Checkpoint games jump straight in — no guide page.
      if (lesson.checkpoint) startLesson(lesson);
      else renderGuide(lesson);
    })
  );
}

// ── Lesson guide (the teaching page before the exercises) ─────

function renderGuide(lesson) {
  const unit = lesson.unit;
  const phonemeCards = lesson.phonemes.map((ph, i) => {
    const p = PHONEMES[ph];
    const chips = p.examples.map(w =>
      `<button class="word-chip" data-say="${esc(w)}">🔊 ${esc(w)}</button>`).join('');
    const diagram = articulationSVG(ph);
    const isVowel = p.type !== 'consonant';
    return `
      <div class="guide-card">
        <button class="guide-symbol" data-say="${esc(p.examples[0])}" title="Hear “${esc(p.examples[0])}”">/${ph}/</button>
        <div class="guide-info">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.hint)}</p>
          <div class="chips">${chips}</div>
          ${diagram ? `<button class="diagram-toggle" data-target="dia-${i}" aria-expanded="false">📐 See tongue placement</button>` : ''}
        </div>
      </div>
      ${diagram ? `<div class="guide-diagram" id="dia-${i}" hidden>
        <div class="artic-wrap">${diagram}<p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>
      </div>` : ''}`;
  }).join('');

  const accentName = { rp: 'RP', nam: 'Neutral American' }[lesson.accent] ?? '';
  const accentWords = lesson.accent
    ? WORDS.filter(w => w.accent === lesson.accent && w.ipa.some(s => lesson.phonemes.includes(s)))
        .map(w => `
          <div class="guide-word">
            <button class="word-chip" data-say="${esc(w.word)}">🔊 ${esc(w.word)}</button>
            <span class="guide-ipa">/${w.ipa.join('')}/</span>
            <span class="guide-note">${esc(w.note ?? '')}</span>
          </div>`).join('')
    : '';

  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit">✕</button>
      <div class="guide-title-bar" style="--unit-color:${unit.color}">${esc(unit.title)}</div>
    </header>
    <main class="guide">
      <h1>${esc(lesson.title)}</h1>
      <p class="guide-text">${esc(lesson.guide ?? '')}</p>
      <h2 class="guide-heading">Sounds in this lesson</h2>
      ${phonemeCards}
      ${accentWords ? `<h2 class="guide-heading">${esc(accentName)} words to know</h2>${accentWords}` : ''}
      <div class="guide-start">
        <button class="btn btn-primary" id="start">Start lesson</button>
      </div>
    </main>`;

  document.getElementById('quit').addEventListener('click', () => renderTrack(lesson.track));
  document.getElementById('start').addEventListener('click', () => startLesson(lesson));
  app.querySelectorAll('[data-say]').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say, { lang: langFor(lesson) }))
  );
  app.querySelectorAll('.diagram-toggle').forEach(btn =>
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.target);
      const open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? '📐 Hide tongue placement' : '📐 See tongue placement';
    })
  );
}

// ── Lesson session ────────────────────────────────────────────

function startLesson(lesson) {
  const session = {
    lesson,
    queue: generateLesson(lesson),
    index: 0,
    hearts: 3,
    mistakes: 0,
    total: 0,
  };
  session.total = session.queue.length;
  renderExercise(session);
}

function progressPct(s) {
  return Math.round((s.index / s.queue.length) * 100);
}

function lessonChrome(s, body) {
  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit">✕</button>
      <div class="progress"><div class="progress-fill" style="width:${progressPct(s)}%"></div></div>
      <div class="hearts">${s.lesson.practice ? '♾️' : '❤️'.repeat(s.hearts) + '🖤'.repeat(3 - s.hearts)}</div>
    </header>
    <main class="exercise" data-accent="${s.lesson.accent ?? ''}">${body}</main>
    <footer class="feedback" id="feedback"></footer>`;
  document.getElementById('quit').addEventListener('click', () => exitLesson(s.lesson));
}

function renderExercise(s) {
  if (s.hearts === 0) return renderFail(s);
  if (s.index >= s.queue.length) return renderResults(s);
  const ex = s.queue[s.index];
  if (ex.type === 'match') renderMatch(s, ex);
  else if (ex.type === 'build') renderBuild(s, ex);
  else if (ex.type === 'gapbuild') renderGapBuild(s, ex);
  else if (ex.type === 'typein') renderTypein(s, ex);
  else renderChoice(s, ex);
}

function audioButton(ex) {
  return ex.audioText
    ? `<button class="speaker" id="speaker" title="Play audio">🔊</button>`
    : '';
}

function exLang(s, ex) {
  return ex.lang ?? langFor(s.lesson);
}

function wireAudio(s, ex, onFirstPlay) {
  const btn = document.getElementById('speaker');
  if (!btn) return;
  let played = false;
  btn.addEventListener('click', () => {
    speak(ex.audioText, { lang: exLang(s, ex) });
    if (!played) { played = true; onFirstPlay?.(); }
  });
}

function showFeedback(s, ok, ex, { requeue = true, penalty = true } = {}) {
  const fb = document.getElementById('feedback');
  fb.className = `feedback show ${ok ? 'good' : 'bad'}`;
  fb.innerHTML = `
    <div class="feedback-text">
      <strong>${ok ? 'Correct!' : 'Not quite.'}</strong>
      <span>${esc(ex.explain ?? '')}</span>
    </div>
    <button class="btn continue ${ok ? '' : 'btn-red'}" id="continue">Continue</button>`;
  if (!ok) {
    if (penalty && !s.lesson.practice && !s.lesson.challenge) s.hearts--;
    s.mistakes++;
    if (requeue && !s.lesson.challenge && s.hearts > 0) s.queue.push({ ...ex });
  }
  document.getElementById('continue').addEventListener('click', () => {
    s.index++;
    renderExercise(s);
  });
}

function renderChoice(s, ex) {
  const gated = !!ex.hideUntilPlayed && !!ex.audioText;
  const displayCard = ex.display
    ? `<div class="display-card ${ex.smallDisplay ? 'small' : ''}">${audioButton(ex)}<span>${esc(ex.display)}</span></div>`
    : (ex.audioText ? `<div class="display-card audio-only">${audioButton(ex)}<span class="listen-hint">tap to listen</span></div>` : '');
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    ${displayCard}
    ${ex.displayHint ? `<p class="hint">${esc(ex.displayHint)}</p>` : ''}
    <div class="choices ${gated ? 'gated' : ''}" id="choices">
      ${ex.choices.map((c, i) => `
        <button class="btn choice" data-i="${i}" ${gated ? 'disabled' : ''}>
          <span class="choice-label">${esc(c.label)}</span>
          ${c.sub ? `<span class="choice-sub">${esc(c.sub)}</span>` : ''}
        </button>`).join('')}
    </div>`);

  wireAudio(s, ex, () => {
    document.querySelectorAll('.choice').forEach(b => (b.disabled = false));
    document.getElementById('choices')?.classList.remove('gated');
  });
  if (ex.audioText && !gated) setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  document.querySelectorAll('.choice').forEach(btn =>
    btn.addEventListener('click', () => {
      const ok = !!ex.choices[+btn.dataset.i].ok;
      btn.classList.add(ok ? 'right' : 'wrong');
      document.querySelectorAll('.choice').forEach((b, i) => {
        b.disabled = true;
        if (ex.choices[i].ok) b.classList.add('right');
      });
      showFeedback(s, ok, ex);
    })
  );
}

function renderMatch(s, ex) {
  const left = ex.pairs.map((p, i) => ({ id: i, text: p.sym }));
  const right = ex.pairs.map((p, i) => ({ id: i, text: p.word }))
    .sort(() => Math.random() - 0.5);
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="match-grid">
      <div class="match-col" id="col-l">
        ${left.map(x => `<button class="btn match-item" data-id="${x.id}">${esc(x.text)}</button>`).join('')}
      </div>
      <div class="match-col" id="col-r">
        ${right.map(x => `<button class="btn match-item" data-id="${x.id}">${esc(x.text)}</button>`).join('')}
      </div>
    </div>`);

  let selL = null, selR = null, solved = 0, hadMistake = false;
  const check = () => {
    if (!selL || !selR) return;
    const [l, r] = [selL, selR];
    selL = selR = null;
    if (l.dataset.id === r.dataset.id) {
      [l, r].forEach(b => { b.classList.remove('sel'); b.classList.add('solved'); b.disabled = true; });
      if (++solved === ex.pairs.length) {
        showFeedback(s, !hadMistake, { explain: hadMistake ? 'All matched — but with slips. One more pass later.' : 'All pairs matched.' }, { requeue: false, penalty: false });
        if (hadMistake && !s.lesson.challenge) s.queue.push({ ...ex });
      }
    } else {
      hadMistake = true;
      [l, r].forEach(b => { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake', 'sel'), 500); });
    }
  };
  const wire = (colId, side) => {
    document.querySelectorAll(`#${colId} .match-item`).forEach(btn =>
      btn.addEventListener('click', () => {
        document.querySelectorAll(`#${colId} .sel`).forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        if (side === 'l') selL = btn; else selR = btn;
        check();
      })
    );
  };
  wire('col-l', 'l');
  wire('col-r', 'r');
}

function renderBuild(s, ex) {
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <div class="answer-row" id="answer"><span class="slash">/</span><span class="slash">/</span></div>
    <div class="tile-bank" id="bank">
      ${ex.tiles.map((t, i) => `<button class="btn tile" data-t="${esc(t)}" data-i="${i}">${esc(t)}</button>`).join('')}
    </div>
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  const chosen = [];
  const answerEl = document.getElementById('answer');
  const checkBtn = document.getElementById('check');

  const redraw = () => {
    answerEl.innerHTML = `<span class="slash">/</span>${chosen
      .map((c, i) => `<button class="btn tile placed" data-pos="${i}">${esc(c.t)}</button>`)
      .join('')}<span class="slash">/</span>`;
    checkBtn.disabled = chosen.length === 0;
    answerEl.querySelectorAll('.placed').forEach(btn =>
      btn.addEventListener('click', () => {
        const { bankBtn } = chosen.splice(+btn.dataset.pos, 1)[0];
        bankBtn.disabled = false;
        redraw();
      })
    );
  };

  document.querySelectorAll('#bank .tile').forEach(btn =>
    btn.addEventListener('click', () => {
      chosen.push({ t: btn.dataset.t, bankBtn: btn });
      btn.disabled = true;
      redraw();
    })
  );

  checkBtn.addEventListener('click', () => {
    const ok = chosen.map(c => c.t).join(' ') === ex.target.join(' ');
    checkBtn.disabled = true;
    showFeedback(s, ok, ex);
  });
}

function renderTypein(s, ex) {
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <input class="type-input" id="answer-input" type="text" autocomplete="off"
           autocapitalize="none" spellcheck="false" placeholder="type the word…" />
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  const input = document.getElementById('answer-input');
  const checkBtn = document.getElementById('check');
  input.focus();
  input.addEventListener('input', () => { checkBtn.disabled = !input.value.trim(); });
  const submit = () => {
    if (!input.value.trim()) return;
    input.disabled = true;
    checkBtn.disabled = true;
    const ok = input.value.trim().toLowerCase() === ex.answer.toLowerCase();
    input.classList.add(ok ? 'right' : 'wrong');
    showFeedback(s, ok, ex);
  };
  checkBtn.addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

function renderGapBuild(s, ex) {
  const slotRow = ex.pattern.map((p, i) =>
    p === null
      ? `<button class="btn tile slot" data-slot="${i}"></button>`
      : `<span class="fixed-seg">${esc(p)}</span>`
  ).join('');
  lessonChrome(s, `
    <h1 class="prompt">${esc(ex.prompt)}</h1>
    <div class="display-card">${audioButton(ex)}<span>${esc(ex.display)}</span></div>
    <div class="answer-row gap-row" id="answer"><span class="slash">/</span>${slotRow}<span class="slash">/</span></div>
    <div class="tile-bank" id="bank">
      ${ex.tiles.map((t, i) => `<button class="btn tile" data-t="${esc(t)}" data-i="${i}">${esc(t)}</button>`).join('')}
    </div>
    <button class="btn btn-primary" id="check" disabled>Check</button>`);

  wireAudio(s, ex);
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex) }), 300);

  const slots = [...document.querySelectorAll('.slot')];
  const checkBtn = document.getElementById('check');
  const filled = {}; // slot index -> {t, bankBtn}

  const refresh = () => { checkBtn.disabled = slots.some(sl => !filled[sl.dataset.slot]); };

  document.querySelectorAll('#bank .tile').forEach(btn =>
    btn.addEventListener('click', () => {
      const empty = slots.find(sl => !filled[sl.dataset.slot]);
      if (!empty) return;
      filled[empty.dataset.slot] = { t: btn.dataset.t, bankBtn: btn };
      empty.textContent = btn.dataset.t;
      empty.classList.add('filled');
      btn.disabled = true;
      refresh();
    })
  );
  slots.forEach(sl =>
    sl.addEventListener('click', () => {
      const f = filled[sl.dataset.slot];
      if (!f) return;
      f.bankBtn.disabled = false;
      delete filled[sl.dataset.slot];
      sl.textContent = '';
      sl.classList.remove('filled');
      refresh();
    })
  );
  checkBtn.addEventListener('click', () => {
    const gapIdxs = ex.pattern.map((p, i) => (p === null ? i : -1)).filter(i => i >= 0);
    const ok = gapIdxs.every((slotIdx, k) => filled[slotIdx]?.t === ex.answers[k]);
    checkBtn.disabled = true;
    showFeedback(s, ok, ex);
  });
}

// ── End screens ───────────────────────────────────────────────

function renderResults(s) {
  const perfect = s.mistakes === 0;
  if (s.lesson.challenge) { s.lesson.onResult(perfect); return; }
  if (s.lesson.practice) {
    const xp = 5 + (perfect ? 2 : 0);
    store.addXp(xp);
    const arcade = s.lesson.arcade;
    app.innerHTML = `
      <main class="end-screen">
        <div class="end-emoji">${arcade ? s.lesson.mode.icon : '🎯'}</div>
        <h1>${perfect ? (arcade ? 'Flawless round!' : 'Flawless practice!') : (arcade ? 'Round complete!' : 'Practice complete!')}</h1>
        <p class="end-xp">+${xp} XP</p>
        <div class="end-actions">
          <button class="btn btn-primary" id="again">${arcade ? 'Play again' : 'Practice again'}</button>
          <button class="btn" id="home">Done</button>
        </div>
      </main>`;
    document.getElementById('again').addEventListener('click', () =>
      startLesson(arcade ? modeLesson(s.lesson.mode) : practiceLesson(s.lesson.track)));
    document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
    return;
  }
  const xp = 10 + (perfect ? 5 : 0);
  store.recordLesson(s.lesson.id, xp);
  const { done, total } = trackProgress(s.lesson.track);
  const mastered = done === total;
  const chk = s.lesson.checkpoint;
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">${mastered ? '🎓' : chk ? '🎲' : perfect ? '🏆' : '🎉'}</div>
      <h1>${mastered ? 'Course complete!' : chk ? 'Checkpoint cleared!' : perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      ${mastered ? `<p>${esc(s.lesson.track.title)} — mastered, start to finish.</p>` : ''}
      <p class="end-xp">+${xp} XP${perfect ? ' (perfect bonus)' : ''}</p>
      <button class="btn btn-primary" id="home">Continue</button>
    </main>`;
  document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
}

function renderFail(s) {
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">💔</div>
      <h1>Out of hearts</h1>
      <p>No XP this time — but the sounds are still there. Go again.</p>
      <div class="end-actions">
        <button class="btn btn-primary" id="retry">Try again</button>
        <button class="btn" id="home">Back to course</button>
      </div>
    </main>`;
  document.getElementById('retry').addEventListener('click', () => startLesson(s.lesson));
  document.getElementById('home').addEventListener('click', () => renderTrack(s.lesson.track));
}

renderHome();
