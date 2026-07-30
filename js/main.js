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
import { IBSEN } from './data/ibsen.js';
import { IDIOM, AUS_PATTERNS, U_NON_U, FALSE_FRIENDS } from './data/idiom.js';
import { scanLine } from './scan.js';
import { loadPron, ipaFor } from './pron.js';
import { migrateLegacyCustomText, listProjects, getProject, saveProject, createProject,
         duplicateProject, deleteProject, emptyProject, touchRehearsed, sortProjects,
         searchProjects, STATUSES, splitLines } from './projects.js';
import { recordingSupported, startRecording, stopRecording, cancelRecording,
         isRecording, micErrorMessage, formatMs, MAX_RECORDING_MS } from './perform.js';
import { saveTake, listTakes, deleteTake, updateTake, setBestTake, takeUrl,
         releaseAllUrls, playUrl, RATINGS, deleteTakesFor } from './recordings.js';
import { dbSupported, STORES, idbClear } from './db.js';
import { readJsonFile, validateProjectBundle, validateDictionaryBundle,
         ValidationError, LIMITS } from './validate.js';
import { resolvePronunciation, validateIpa, setPersonal, getPersonal, deletePersonal,
         listPersonal, exportPersonal, importPersonal, setProjectWordOverride,
         setOccurrenceOverride, clearOverridesFor, normWord } from './overrides.js';
import { recordAttempt, symbolBreakdown, confusionPairs, totals, dailyRehearsal,
         resetAnalytics, hasEnoughData, accuracyLabel, CONFIDENCE, confidenceOf } from './analytics.js';

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
function modeLesson(mode, accent = arcadeAccent) {
  return {
    id: 'mode-' + mode.id + (accent ? '-' + accent : ''),
    title: mode.title,
    practice: true,
    arcade: true,
    mode,
    accent,
    shiftTo: accent ?? undefined,
    phonemes: accent ? phonemesForAccent(accent) : (mode.phonemes ?? []),
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

// ── Home: dialect-first tabs ──────────────────────────────────
// The home screen is a tab strip: the three dialects, Text & Speech, and the
// IPA Handbook. Everything for a role lives inside its dialect's tab —
// lessons, practice, its own sound handbook, its slang. The app reopens on
// whichever tab (and sub-tab) you were last working in.

const HOME_TABS = [
  { id: 'nam', icon: '🇺🇸', label: 'Neutral American' },
  { id: 'rp', icon: '🇬🇧', label: 'RP' },
  { id: 'aus', icon: '🇦🇺', label: 'Australian' },
  { id: 'texts', icon: '📜', label: 'Text & Speech' },
  { id: 'handbook', icon: '📖', label: 'IPA Handbook' },
];
const HUB_SUBS = [
  { id: 'lessons', label: '🎓 Lessons' },
  { id: 'practice', label: '🎯 Practice' },
  { id: 'handbook', label: '📖 Handbook' },
  { id: 'idiom', label: '🗣 Slang & Idiom' },
  { id: 'texts', label: '📜 Texts' },
];

const homeTab = () => {
  const t = localStorage.getItem('speechcraft-home-tab');
  return HOME_TABS.some(x => x.id === t) ? t : 'nam';
};
const setHomeTab = t => { try { localStorage.setItem('speechcraft-home-tab', t); } catch {} };
const hubSub = d => {
  try {
    const t = JSON.parse(localStorage.getItem('speechcraft-hub-sub') || '{}')[d];
    return HUB_SUBS.some(x => x.id === t) && t !== 'texts' ? t : 'lessons';
  } catch { return 'lessons'; }
};
const setHubSub = (d, s) => {
  try {
    const m = JSON.parse(localStorage.getItem('speechcraft-hub-sub') || '{}');
    m[d] = s;
    localStorage.setItem('speechcraft-hub-sub', JSON.stringify(m));
  } catch {}
};

const trackFor = d => TRACKS.find(t => t.id === d);

function renderHome() {
  stopSpeech();
  navStack = [];              // home is the root of the back stack
  navRestoring = false;
  const tab = homeTab();

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
    <main class="track-list home-main">
      ${dailyRehearsalCard()}
      <nav class="home-tabs" role="tablist" aria-label="Sections">
        ${HOME_TABS.map(t => `
          <button class="home-tab ${t.id === tab ? 'on' : ''}" role="tab"
                  aria-selected="${t.id === tab}" data-tab="${t.id}" type="button">
            <span class="home-tab-icon">${t.icon}</span><span class="home-tab-label">${esc(t.label)}</span>
          </button>`).join('')}
      </nav>
      <div id="home-pane"></div>
    </main>`;

  wireBrandHome();
  document.getElementById('freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderHome();
  });
  document.getElementById('today-start')?.addEventListener('click', startDailyRehearsal);
  app.querySelectorAll('.home-tab').forEach(b =>
    b.addEventListener('click', () => { setHomeTab(b.dataset.tab); renderHome(); }));

  const pane = document.getElementById('home-pane');
  if (tab === 'texts') textSpeechPane(pane);
  else if (tab === 'handbook') handbookPane(pane);
  else dialectHub(pane, tab);
}

// ── A dialect's hub: Lessons · Practice · Handbook · Idiom · Texts ──

function dialectHub(pane, d) {
  const track = trackFor(d);
  const sub = hubSub(d);
  pane.innerHTML = `
    <div class="sonnet-tabs hub-subs">
      ${HUB_SUBS.map(s => `
        <button class="son-tab ${s.id === sub ? 'on' : ''}" data-sub="${s.id}" type="button">${s.label}</button>`).join('')}
    </div>
    <div id="hub-pane"></div>`;
  pane.querySelectorAll('.hub-subs .son-tab').forEach(b =>
    b.addEventListener('click', () => {
      if (b.dataset.sub === 'texts') { setHomeTab('texts'); renderHome(); return; }
      setHubSub(d, b.dataset.sub);
      dialectHub(pane, d);
    }));

  const hub = pane.querySelector('#hub-pane');
  if (sub === 'lessons') hubLessons(hub, track);
  else if (sub === 'practice') hubPractice(hub, d, track);
  else if (sub === 'handbook') hubHandbook(hub, d, track);
  else if (sub === 'idiom') hubIdiom(hub, d, track);
}

function hubLessons(hub, track) {
  const { done, total } = trackProgress(track);
  const path = buildTrackPath(track);
  hub.innerHTML = `
    <div class="hub-progress">
      <div class="track-progress">
        <div class="track-progress-bar"><div style="width:${total ? Math.round(done / total * 100) : 0}%"></div></div>
        <span>${done}/${total}${done === total && total ? ' · 🎓 mastered' : ''}</span>
      </div>
    </div>
    <div class="track-scroll hub-scroll">${path.html}</div>`;
  path.wire(hub);
}

function hubPractice(hub, d, track) {
  const name = dialectName(d);
  const shiftTrack = (d === 'nam' || d === 'rp') ? TRACKS.find(t => t.id === 'shift') : null;
  const modeCards = MODES.map(m => `
    <button class="mode-card" data-mode="${m.id}" type="button">
      <span class="mode-icon">${m.icon}</span>
      <span class="mode-title">${esc(m.title)}</span>
      <span class="mode-blurb">${esc(m.blurb)}</span>
    </button>`).join('');

  hub.innerHTML = `
    <div class="practice-row">
      <button class="btn btn-practice" id="hub-mixed" type="button">🎯 Mixed review — everything this track teaches, no hearts lost</button>
    </div>
    <h2 class="chart-h">Games <span>in ${esc(name)}</span></h2>
    <div class="mode-grid">
      <button class="mode-card idiom-mode" id="hub-idiom-drill" type="button">
        <span class="mode-icon">🗣</span>
        <span class="mode-title">Slang &amp; Idiom</span>
        <span class="mode-blurb">The words, not just the sounds.</span>
      </button>
      ${modeCards}
    </div>
    ${shiftTrack ? `
      <h2 class="chart-h">Shift work</h2>
      <button class="track-card" id="hub-shift" type="button" style="--track-color:${shiftTrack.color}">
        <div class="track-glyph">⇄</div>
        <div class="track-info"><h2>Accent Shift Drills</h2><p>Transform words between American and RP on command.</p></div>
        <div class="track-arrow">›</div>
      </button>` : ''}
    <h2 class="chart-h">Weak sounds <span>in ${esc(name)}</span></h2>
    <div id="hub-weak"></div>`;

  hub.querySelector('#hub-mixed').addEventListener('click', () => startLesson(practiceLesson(track)));
  hub.querySelector('#hub-idiom-drill').addEventListener('click', () => startLesson(idiomLesson(d, track)));
  hub.querySelector('#hub-shift')?.addEventListener('click', () => renderTrack(shiftTrack));
  hub.querySelectorAll('.mode-card[data-mode]').forEach(b =>
    b.addEventListener('click', () => startLesson(modeLesson(MODES.find(m => m.id === b.dataset.mode), d))));
  hubWeakPanel(hub.querySelector('#hub-weak'), d);
}

// Weak-sounds slice for one dialect: this dialect's inventory only, ranked
// from the same global analytics. Honest about thin data, like the full page.
function hubWeakPanel(el, d) {
  const inventory = new Set(phonemesForAccent(d));
  const rows = symbolBreakdown().all
    .filter(r => inventory.has(r.sym) && r.tier !== CONFIDENCE.NONE)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 4);
  el.innerHTML = `
    ${rows.length ? rows.map(r => `
      <div class="stat-row">
        <span class="stat-sym">/${esc(r.sym)}/</span>
        <span class="stat-bar" aria-hidden="true"><span style="width:${Math.round(r.accuracy * 100)}%"></span></span>
        <span class="stat-val">${esc(r.label)}</span>
      </div>`).join('')
      : '<p class="pane-note">Not enough data yet — play a few games above and this fills in.</p>'}
    <button class="btn-lite" id="hub-weak-full" type="button">Full report — all dialects ›</button>`;
  el.querySelector('#hub-weak-full').addEventListener('click', renderWeakSounds);
}

// This dialect's own sound handbook: its inventory only, each sound opening
// the tongue-placement diagram page.
function hubHandbook(hub, d, track) {
  const syms = phonemesForAccent(d);
  const groups = [
    { title: 'Vowels', items: syms.filter(s => PHONEMES[s]?.type === 'vowel') },
    { title: 'Diphthongs', items: syms.filter(s => PHONEMES[s]?.type === 'diphthong') },
    { title: 'Consonants', items: syms.filter(s => PHONEMES[s]?.type === 'consonant') },
  ].filter(g => g.items.length);
  hub.innerHTML = `
    <p class="pane-note">The ${esc(dialectName(d))} sound inventory — tap any symbol for its tongue placement, how it’s made, and example words.</p>
    ${groups.map(g => `
      <section class="chart-section">
        <h2 class="chart-h">${g.title} <span>${g.items.length}</span></h2>
        <div class="chart-grid">
          ${g.items.map(sym => `
            <button class="chart-chip" data-sym="${esc(sym)}" type="button" title="How “${esc(sym)}” is made">
              <span class="chart-sym">${esc(sym)}</span>
              <span class="chart-meta">
                <span class="chart-name">${esc(PHONEMES[sym].name)}</span>
                <span class="chart-eg">${PHONEMES[sym].examples.slice(0, 2).map(w => `<b>${esc(w)}</b>`).join(', ')}</span>
              </span>
              <span class="chart-play">›</span>
            </button>`).join('')}
        </div>
      </section>`).join('')}`;
  hub.querySelectorAll('.chart-chip').forEach(b =>
    b.addEventListener('click', () => renderSoundDetail(b.dataset.sym)));
}

// ── Slang & Idiom: the browsable reference ────────────────────

const idiomFilters = { q: '', era: 'all', type: 'all', flagged: false };

function idiomLesson(d, track) {
  return {
    id: 'idiom-' + d,
    title: `${dialectName(d)} slang & idiom`,
    practice: true,
    accent: d,
    phonemes: [],
    types: ['idiom'],
    count: 10,
    unit: { title: 'Slang & Idiom', color: track?.color ?? '#8a6d3b' },
    track: null,
  };
}

function hubIdiom(hub, d, track) {
  const name = dialectName(d);

  const draw = () => {
    const f = idiomFilters;
    const rows = IDIOM.filter(e => {
      if (e.dialect !== d) return false;
      if (e.flag && !f.flagged) return false;
      if (f.era !== 'all' && e.era !== f.era && e.era !== 'both') return false;
      if (f.type !== 'all' && e.type !== f.type) return false;
      if (f.q) {
        const q = f.q.toLowerCase();
        if (![e.term, e.meaning, e.example].some(v => (v || '').toLowerCase().includes(q))) return false;
      }
      return true;
    });
    const list = hub.querySelector('#idiom-list');
    hub.querySelector('#idiom-count').textContent =
      `${rows.length} entr${rows.length === 1 ? 'y' : 'ies'}${f.flagged ? '' : ' · flagged terms hidden'}`;
    list.innerHTML = rows.length ? rows.map(e => `
      <div class="idiom-card ${e.flag ? 'is-flagged' : ''}">
        <div class="idiom-head">
          <span class="idiom-term">${esc(e.term)}</span>
          <span class="tag">${esc(e.era)}</span>
          <span class="tag">${esc(e.type)}</span>
          ${e.flag ? `<span class="tag tag-flag">${esc(e.flag)}</span>` : ''}
        </div>
        <p class="idiom-meaning">${esc(e.meaning)}</p>
        ${e.example ? `<p class="idiom-example">“${esc(e.example)}”</p>` : ''}
        ${e.note ? `<p class="idiom-note">${esc(e.note)}</p>` : ''}
      </div>`).join('')
      : '<p class="pane-note">Nothing matches that filter.</p>';
  };

  const chip = (group, value, label, on) =>
    `<button class="dialect-chip ${on ? 'on' : ''}" data-g="${group}" data-v="${value}" type="button">${label}</button>`;

  hub.innerHTML = `
    <p class="pane-note">The vocabulary that carries the ${esc(name)} voice — the right vowel with the wrong word still breaks the illusion. <b>period</b> ≈ c.1890–1930; it means characteristic of the era, not dead.</p>
    <div class="practice-row"><button class="btn btn-practice" id="idiom-drill" type="button">🗣 Drill these — no hearts lost</button></div>
    <input class="sonnet-search" id="idiom-q" type="search" placeholder="Search term, meaning or example…" autocomplete="off">
    <div class="dialect-picker"><span class="dialect-label">Era</span><div class="dialect-chips" id="idiom-era">
      ${chip('era', 'all', 'All', idiomFilters.era === 'all')}
      ${chip('era', 'period', 'Period', idiomFilters.era === 'period')}
      ${chip('era', 'contemporary', 'Contemporary', idiomFilters.era === 'contemporary')}
    </div></div>
    <div class="dialect-picker"><span class="dialect-label">Type</span><div class="dialect-chips" id="idiom-type">
      ${chip('type', 'all', 'All', idiomFilters.type === 'all')}
      ${chip('type', 'word', 'Words', idiomFilters.type === 'word')}
      ${chip('type', 'phrase', 'Phrases', idiomFilters.type === 'phrase')}
      ${chip('type', 'saying', 'Sayings', idiomFilters.type === 'saying')}
    </div></div>
    <label class="idiom-flag-toggle">
      <input type="checkbox" id="idiom-flagged" ${idiomFilters.flagged ? 'checked' : ''}>
      <span>Show flagged terms (vulgar / dated) — they exist because scripts use them; they never appear in drills</span>
    </label>
    <p class="sonnet-hint" id="idiom-count"></p>
    <div id="idiom-list"></div>
    ${d === 'aus' ? `
      <details class="idiom-extra"><summary>The productive patterns — how Australian makes these words</summary>
        ${AUS_PATTERNS.map(p => `<div class="idiom-card"><div class="idiom-head"><span class="idiom-term">${esc(p.pattern)}</span></div><p class="idiom-meaning">${esc(p.rule)}</p><p class="idiom-example">${esc(p.examples)}</p></div>`).join('')}
      </details>` : ''}
    ${d === 'rp' ? `
      <details class="idiom-extra"><summary>U and non-U — the sharpest class tell you have</summary>
        <p class="pane-note">Mitford’s 1954 upper vs aspirational-middle pairs. Getting one backwards reads instantly false, however good the vowels. A 1954 snapshot — some has softened.</p>
        <table class="unu-table"><thead><tr><th>U (upper)</th><th>non-U (middle)</th></tr></thead>
        <tbody>${U_NON_U.map(u => `<tr><td>${esc(u.u)}</td><td>${esc(u.nonU)}</td></tr>`).join('')}</tbody></table>
      </details>` : ''}
    <details class="idiom-extra"><summary>Cross-dialect false friends — the fastest way to break the accent</summary>
      <p class="pane-note">The same word meaning different things. Includes vulgar senses deliberately — the trap is the point. Reference only; never drilled.</p>
      ${FALSE_FRIENDS.map(f => `
        <div class="idiom-card"><div class="idiom-head"><span class="idiom-term">${esc(f.word)}</span></div>
          <p class="idiom-meaning"><b>RP:</b> ${esc(f.rp)}</p>
          <p class="idiom-meaning"><b>American:</b> ${esc(f.nam)}</p>
          <p class="idiom-meaning"><b>Australian:</b> ${esc(f.aus)}</p>
        </div>`).join('')}
    </details>`;

  hub.querySelector('#idiom-drill').addEventListener('click', () => startLesson(idiomLesson(d, track)));
  hub.querySelector('#idiom-q').addEventListener('input', e => { idiomFilters.q = e.target.value; draw(); });
  hub.querySelector('#idiom-flagged').addEventListener('change', e => { idiomFilters.flagged = e.target.checked; draw(); });
  [['#idiom-era', 'era'], ['#idiom-type', 'type']].forEach(([sel, key]) =>
    hub.querySelector(sel).addEventListener('click', e => {
      const b = e.target.closest('.dialect-chip'); if (!b) return;
      idiomFilters[key] = b.dataset.v;
      hub.querySelector(sel).querySelectorAll('.dialect-chip').forEach(x => x.classList.toggle('on', x === b));
      draw();
    }));
  draw();
}

// ── Text & Speech tab ─────────────────────────────────────────

function textSpeechPane(pane) {
  const libs = Object.entries(LIBRARIES).map(([key, lib]) => ({
    key, icon: lib.icon, title: lib.title,
    blurb: `${lib.data.length} speeches · ${esc(lib.note)}`,
    go: () => renderLibraryList(key),
  }));
  const cards = [
    { icon: '🎬', title: 'My Texts', blurb: 'Your rehearsal projects — saved roles, notes, and recorded takes.', go: renderProjects },
    { icon: '📜', title: 'Shakespeare’s Sonnets', blurb: 'All 154 — speak them, scan the metre, study the sounds.', go: renderSonnetList },
    ...libs,
    { icon: '✍️', title: 'Train Any Text', blurb: 'Paste a monologue, speech, or scene — practise it in any dialect.', go: renderCustomText },
  ];
  pane.innerHTML = cards.map((c, i) => `
    <button class="track-card" data-i="${i}" type="button" style="--track-color:#8a6d3b">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${c.title}</h2><p>${c.blurb}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  pane.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
}

// ── IPA Handbook tab: the IPA itself — learn it, reference it ─

function handbookPane(pane) {
  const core = TRACKS.find(t => t.id === 'core');
  const { done, total } = trackProgress(core);
  const cards = [
    { icon: 'ʃə', title: 'IPA Foundations', blurb: `Learn the alphabet itself — ${done}/${total} lessons done.`, go: () => renderTrack(core), color: core.color },
    { icon: '🕹️', title: 'Core IPA Arcade', blurb: 'Every game on the full inventory, no dialect.', go: renderArcade, color: '#c99e58' },
    { icon: '📖', title: 'The IPA Chart', blurb: 'All 55 sounds — tap any to see how it’s made and hear it.', go: renderChart, color: '#64748b' },
    { icon: '🎭', title: 'Your Instrument', blurb: 'A tour of the vocal tract — the parts you shape every sound with.', go: renderInstrument, color: '#64748b' },
    { icon: '📐', title: 'The Vowel Map', blurb: 'Where every vowel sits in the mouth.', go: renderVowelMap, color: '#64748b' },
    { icon: '📕', title: 'Personal Dictionary', blurb: 'Pronunciations you’ve corrected — searchable, editable, exportable.', go: renderDictionary, color: '#8a6d3b' },
    { icon: '🔒', title: 'Privacy & Data', blurb: 'What’s stored on this device, and how to delete it.', go: renderPrivacy, color: '#8a6d3b' },
  ];
  pane.innerHTML = cards.map((c, i) => `
    <button class="track-card" data-i="${i}" type="button" style="--track-color:${c.color}">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  pane.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
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




// ── Privacy: delete everything this app stored on this device ─
// Course progress is deleted separately and explicitly, so someone clearing
// recordings does not silently lose months of lesson history.

async function wipeLocalData({ includeProgress }) {
  const report = [];
  if (dbSupported()) {
    try {
      releaseAllUrls();
      for (const s of [STORES.blobs, STORES.recordings, STORES.projects, STORES.meta]) {
        await idbClear(s);
        report.push(s);
      }
    } catch (err) { console.warn('wipe: indexeddb', err); }
  }
  try { resetAnalytics(); report.push('analytics'); } catch { /* ignore */ }
  try { clearPersonal(); report.push('personal dictionary'); } catch { /* ignore */ }
  if (includeProgress) {
    try { localStorage.removeItem('ipa-trainer-v1'); report.push('course progress'); } catch { /* ignore */ }
  }
  return report;
}

function renderPrivacy() {
  record(renderPrivacy);
  app.innerHTML = `
    ${pageTopbar('🔒 Privacy & Data', '#8a6d3b')}
    <main class="track-list">
      <p class="track-blurb">Everything Speechcraft stores stays in this browser on this device. Nothing you record, write or practise is ever sent anywhere.</p>

      <section class="stat-block">
        <h2 class="chart-h">What is stored here</h2>
        <div class="stat-row"><span class="stat-name">Rehearsal projects &amp; notes</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Audio recordings</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Practice analytics</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Personal dictionary</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">XP, streak, lessons</span><span class="stat-val">this device</span></div>
        <p class="pane-note pane-warn">Browser storage is <b>not encrypted</b>. Anyone who can use this device and browser profile — or open developer tools — can read or change it. Treat it like a notebook left on a desk, not a safe.</p>
      </section>

      <section class="stat-block">
        <h2 class="chart-h">Microphone</h2>
        <p class="pane-note">Permission is requested only when you press Record, never on load. Recordings are written straight to local storage and are never uploaded. Exported project files never contain audio.</p>
      </section>

      <div class="danger-zone">
        <h2 class="chart-h">Delete local data</h2>
        <p class="pane-note">This cannot be undone. Export anything you want to keep first.</p>
        <button class="btn btn-lite btn-danger" id="wipe-content" type="button">Delete projects, recordings, analytics &amp; dictionary</button>
        <button class="btn btn-lite btn-danger" id="wipe-all" type="button">Delete everything, including course progress</button>
        <p class="save-state" id="wipe-state" role="status" aria-live="polite"></p>
      </div>
    </main>`;
  wireBrandHome();

  const run = async (includeProgress, label) => {
    if (!confirm(`${label}\n\nThis permanently deletes that data from this device and cannot be undone.\n\nContinue?`)) return;
    if (!confirm('Last check — really delete? Export first if you want a copy.')) return;
    const done = await wipeLocalData({ includeProgress });
    document.getElementById('wipe-state').textContent = `Deleted: ${done.join(', ')}.`;
  };
  document.getElementById('wipe-content').addEventListener('click', () =>
    run(false, 'Delete all projects, recordings, analytics and personal dictionary entries?\n\nYour XP, streak and completed lessons are KEPT.'));
  document.getElementById('wipe-all').addEventListener('click', () =>
    run(true, 'Delete EVERYTHING, including your XP, streak and completed lessons?'));
}

// ── Weak Sounds + Today's Rehearsal ───────────────────────────
// Everything here is derived from analytics.js, which only observes the
// exercises the app already scores.

function renderWeakSounds() {
  record(renderWeakSounds);
  const b = symbolBreakdown();
  const pairs = confusionPairs(5);
  const t = totals();

  const symRow = (r, extra = '') => `
    <div class="stat-row">
      <span class="stat-sym">/${esc(r.sym)}/</span>
      <span class="stat-bar" aria-hidden="true"><span style="width:${Math.round(r.accuracy * 100)}%"></span></span>
      <span class="stat-val ${r.tier === CONFIDENCE.NONE ? 'thin' : ''}">${esc(extra || r.label)}</span>
    </div>`;

  const section = (title, rows, empty) => `
    <section class="stat-block">
      <h2 class="chart-h">${title}</h2>
      ${rows.length ? rows : `<p class="pane-note">${empty}</p>`}
    </section>`;

  app.innerHTML = `
    ${pageTopbar('📊 Weak Sounds', '#6f8657')}
    <main class="track-list">
      ${!t.attempts ? `
        <div class="empty-state">
          <p class="empty-emoji">📊</p>
          <h2>No practice data yet</h2>
          <p>Play a lesson or an Arcade game and this fills in — which sounds you're solid on, which ones keep slipping, and which pairs you mix up.</p>
        </div>` : `
        <div class="summary-row">
          <div class="summary-card"><span class="summary-n">${t.attempts}</span><span class="summary-l">attempts</span></div>
          <div class="summary-card"><span class="summary-n">${t.attempts >= 5 ? Math.round(t.accuracy * 100) + '%' : '—'}</span><span class="summary-l">accuracy</span></div>
          <div class="summary-card"><span class="summary-n">${t.daysPractised}</span><span class="summary-l">days practised</span></div>
        </div>
        ${b.thin ? `<p class="pane-note">${b.thin} sound${b.thin === 1 ? '' : 's'} still need more attempts before a percentage means anything.</p>` : ''}

        ${section('Weakest sounds', b.weakest.map(r => symRow(r)).join(''), 'Not enough data yet.')}
        ${section('Strongest sounds', b.strongest.map(r => symRow(r)).join(''), 'Not enough data yet.')}
        ${section('Recently improved', b.improving.map(r => symRow(r, `↑ ${Math.round(r.recentAccuracy * 100)}% recently`)).join(''), 'Nothing has moved enough to call it improvement yet.')}
        ${section('Not practised lately', b.stale.map(r => symRow(r, `${Math.round(r.days)} days ago`)).join(''), 'Everything has been practised in the last week.')}
        ${section('Commonly confused', pairs.map(p => `
          <div class="stat-row">
            <span class="stat-sym">/${esc(p.right)}/ vs /${esc(p.wrong)}/</span>
            <span class="stat-val">${p.count} mix-up${p.count === 1 ? '' : 's'}</span>
          </div>`).join(''), 'No repeated mix-ups yet.')}
        ${section('By exercise type', t.byType.sort((x, y) => x.accuracy - y.accuracy).map(r => `
          <div class="stat-row"><span class="stat-name">${esc(r.type)}</span>
            <span class="stat-val ${confidenceOf(r.attempts) === CONFIDENCE.NONE ? 'thin' : ''}">${esc(r.label)}</span></div>`).join(''), '')}
        ${section('By dialect', t.byDialect.map(r => `
          <div class="stat-row"><span class="stat-name">${esc(dialectName(r.id) || r.id)}</span>
            <span class="stat-val ${confidenceOf(r.attempts) === CONFIDENCE.NONE ? 'thin' : ''}">${esc(r.label)}</span></div>`).join(''), '')}

        <div class="danger-zone">
          <button class="btn btn-lite btn-danger" id="an-reset" type="button">Reset practice analytics</button>
          <p class="pane-note">Clears only this page's data. Your XP, streak, completed lessons, projects and recordings are not affected.</p>
        </div>`}
    </main>`;
  wireBrandHome();
  document.getElementById('an-reset')?.addEventListener('click', () => {
    if (!confirm('Reset practice analytics?\n\nThis clears weak-sound tracking only. XP, streaks, lessons, projects and recordings are kept.')) return;
    resetAnalytics();
    renderWeakSounds();
  });
}

/** The home-screen card. Returns '' when there's nothing honest to say yet. */
function dailyRehearsalCard() {
  if (!hasEnoughData()) return '';
  const picks = dailyRehearsal(4);
  if (!picks.length) return '';
  return `
    <section class="today-card">
      <h2 class="today-title">Today’s 5-Minute Rehearsal</h2>
      <ul class="today-list">
        ${picks.map(p => `
          <li>
            <span class="today-item">${esc(p.title)}${p.review ? ' <span class="tag tag-skill">review</span>' : ''}</span>
            <span class="today-why">${esc(p.why)}</span>
          </li>`).join('')}
      </ul>
      <button class="btn btn-primary" id="today-start" type="button">Start rehearsal</button>
    </section>`;
}

/** Build a lesson out of today's picks using the existing exercise formats. */
function startDailyRehearsal() {
  const picks = dailyRehearsal(4);
  const phonemes = [...new Set(picks.flatMap(p => p.phonemes))].filter(p => PHONEMES[p]);
  if (!phonemes.length) return;
  startLesson({
    id: 'daily-rehearsal',
    title: 'Today’s Rehearsal',
    practice: true,                 // no hearts lost, like other practice
    phonemes,
    types: ['soundToSymbol', 'symbolToWord', 'minimalPair', 'description', 'fillBlank'],
    count: 8,
    unit: { title: 'Today’s Rehearsal', color: '#6f8657' },
    track: null,
  });
}

// ── My Texts: rehearsal projects ──────────────────────────────
// A project is a saved role: its text, dialect, notes, difficult words and
// every take recorded against it.

const STATUS_CLASS = {
  'Not Started': 'st-new', 'In Rehearsal': 'st-work',
  'Performance Ready': 'st-ready', 'Archived': 'st-arch',
};

let projectSort = 'rehearsed';
let projectQuery = '';

async function renderProjects() {
  record(renderProjects);
  app.innerHTML = `
    ${pageTopbar('🎬 My Texts', '#8a6d3b')}
    <main class="track-list">
      <p class="track-blurb">Your rehearsal projects — a saved role with its text, dialect, notes and recordings, all kept on this device.</p>
      <div class="proj-toolbar">
        <input class="sonnet-search" id="proj-search" type="search" placeholder="Search title, character, source…" value="${esc(projectQuery)}" autocomplete="off">
        <div class="proj-tools">
          <label class="field-label" for="proj-sort">Sort</label>
          <select class="input-sel" id="proj-sort" aria-label="Sort projects">
            <option value="rehearsed">Recently rehearsed</option>
            <option value="updated">Recently edited</option>
            <option value="created">Date created</option>
            <option value="title">Title</option>
            <option value="character">Character</option>
          </select>
          <button class="btn btn-lite" id="proj-import" type="button">Import</button>
          <button class="btn btn-primary" id="proj-new" type="button">+ New project</button>
        </div>
      </div>
      <div id="proj-list"><p class="pane-note">Loading…</p></div>
    </main>
    <input type="file" id="proj-file" accept="application/json" hidden>`;
  wireBrandHome();

  const listEl = document.getElementById('proj-list');
  const sortSel = document.getElementById('proj-sort');
  sortSel.value = projectSort;

  async function draw() {
    if (!dbSupported()) {
      listEl.innerHTML = '<p class="pane-note pane-warn">Projects need local storage, which this browser has disabled (private mode often does). Everything else still works.</p>';
      return;
    }
    let all = [];
    try { all = await listProjects(); }
    catch { listEl.innerHTML = '<p class="pane-note pane-warn">Could not open local storage.</p>'; return; }

    const rows = sortProjects(searchProjects(all, projectQuery), projectSort);
    if (!all.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <p class="empty-emoji">🎬</p>
          <h2>No projects yet</h2>
          <p>Create one for a piece you're working on — an audition speech, a scene, a monologue. You'll get the text, its IPA, scansion, and a place to record and compare takes.</p>
          <p class="pane-note">Example: <b>Stanley Audition</b> — A Streetcar Named Desire · Stanley Kowalski · Act II · General American</p>
        </div>`;
      return;
    }
    if (!rows.length) { listEl.innerHTML = '<p class="pane-note">No projects match that search.</p>'; return; }

    listEl.innerHTML = rows.map(p => `
      <div class="proj-card" data-id="${p.id}">
        <button class="proj-open" type="button" data-act="open">
          <span class="proj-main">
            <span class="proj-title">${esc(p.title || 'Untitled project')}</span>
            <span class="proj-sub">${esc([p.character, p.source].filter(Boolean).join(' · ') || 'No source yet')}</span>
            <span class="proj-meta">
              <span class="tag ${STATUS_CLASS[p.status] || ''}">${esc(p.status)}</span>
              <span class="tag">${esc(dialectName(p.accent) || p.accent)}</span>
              <span class="proj-when">${p.rehearsedAt ? `Rehearsed ${relDate(p.rehearsedAt)}` : `Created ${relDate(p.createdAt)}`}</span>
            </span>
          </span>
          <span class="track-arrow">›</span>
        </button>
        <div class="proj-actions">
          <button class="btn-lite" type="button" data-act="dup">Duplicate</button>
          <button class="btn-lite" type="button" data-act="export">Export</button>
          <button class="btn-lite btn-danger" type="button" data-act="del">Delete</button>
        </div>
      </div>`).join('');

    listEl.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('click', async e => {
        const btn = e.target.closest('button[data-act]'); if (!btn) return;
        const id = card.dataset.id;
        const act = btn.dataset.act;
        if (act === 'open') renderProject(id);
        else if (act === 'dup') { await duplicateProject(id); draw(); }
        else if (act === 'export') exportProject(id);
        else if (act === 'del') {
          const p = await getProject(id);
          if (!confirm(`Delete “${p?.title || 'Untitled'}”?\n\nThis also deletes its saved recordings. This cannot be undone.`)) return;
          await deleteTakesFor(id);
          await deleteProject(id);
          draw();
        }
      });
    });
  }

  document.getElementById('proj-search').addEventListener('input', e => { projectQuery = e.target.value; draw(); });
  sortSel.addEventListener('change', e => { projectSort = e.target.value; draw(); });
  document.getElementById('proj-new').addEventListener('click', async () => {
    const p = await createProject({ title: 'Untitled project' });
    renderProject(p.id);
  });
  const fileInput = document.getElementById('proj-file');
  document.getElementById('proj-import').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files?.[0]; if (!f) return;
    try {
      const created = await importProjectFile(f);
      if (created) { alert(`Imported ${created} project${created === 1 ? '' : 's'}.`); draw(); }
    } catch (err) {
      alert(`That file could not be imported.\n\n${err instanceof ValidationError ? err.message : 'The file could not be read.'}`);
    } finally { fileInput.value = ''; }
  });

  draw();
}

function relDate(ts) {
  if (!ts) return '—';
  const days = Math.floor((Date.now() - ts) / 86400e3);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return new Date(ts).toLocaleDateString();
}

// ── Project detail ────────────────────────────────────────────

async function renderProject(id, tab = 'text') {
  record(() => renderProject(id, tab));
  const p = await getProject(id);
  if (!p) return renderProjects();

  app.innerHTML = `
    ${pageTopbar('🎬 ' + esc(p.title || 'Untitled'), '#8a6d3b')}
    <main class="guide sonnet-view">
      <div class="piece-meta">
        <h1 class="piece-title">${esc(p.title || 'Untitled project')}</h1>
        <p class="piece-source">${esc([p.character, p.source, p.scene].filter(Boolean).join(' · ') || 'Add a source below')}</p>
        <div class="piece-tags">
          <span class="tag ${STATUS_CLASS[p.status] || ''}">${esc(p.status)}</span>
          <span class="tag tag-dialect">🗣 ${esc(dialectName(p.accent) || p.accent)}</span>
          ${p.lines.length ? `<span class="tag">${p.lines.length} lines</span>` : ''}
        </div>
      </div>
      <div class="sonnet-tabs proj-tabs">
        ${[['text', '📄 Text'], ['ipa', '🔤 IPA'], ['scan', '📐 Scan'], ['perform', '🎙 Perform'], ['notes', '📝 Notes'], ['words', '🧩 Difficult Words']]
          .map(([k, l]) => `<button class="son-tab ${k === tab ? 'on' : ''}" data-tab="${k}" type="button">${l}</button>`).join('')}
      </div>
      <div id="proj-pane" class="sonnet-pane"></div>
    </main>`;
  wireBrandHome();

  const pane = document.getElementById('proj-pane');
  app.querySelectorAll('.proj-tabs .son-tab').forEach(b =>
    b.addEventListener('click', () => { stopSpeech(); renderProject(id, b.dataset.tab); }));

  const fresh = async () => getProject(id);

  if (tab === 'text') paneText(pane, p, id);
  else if (tab === 'notes') paneNotes(pane, p, id);
  else if (tab === 'words') paneWords(pane, p, id);
  else if (tab === 'scan') pane.innerHTML = p.lines.length ? scanPane(p.lines, false) : emptyText();
  else if (tab === 'ipa') {
    if (!p.lines.length) pane.innerHTML = emptyText();
    else { pane.innerHTML = `<p class="pane-note">Loading the pronunciation dictionary…</p>`; fillSound(p.lines, p.accent, pane, { projectId: id }); }
  }
  else if (tab === 'perform') {
    if (!p.lines.length) pane.innerHTML = emptyText();
    else {
      await touchRehearsed(id);
      renderPerformPane(pane, { lines: p.lines, accent: p.accent, clip: null, scopeId: null, projectId: id });
    }
  }
}

const emptyText = () => '<p class="pane-note">Add the text on the <b>Text</b> tab first.</p>';

function paneText(pane, p, id) {
  pane.innerHTML = `
    <div class="proj-form">
      <div class="form-grid">
        <label class="field"><span class="field-label">Project title</span>
          <input class="input-text" id="f-title" value="${esc(p.title)}" placeholder="Stanley Audition"></label>
        <label class="field"><span class="field-label">Source</span>
          <input class="input-text" id="f-source" value="${esc(p.source)}" placeholder="A Streetcar Named Desire"></label>
        <label class="field"><span class="field-label">Author</span>
          <input class="input-text" id="f-author" value="${esc(p.author)}" placeholder="Tennessee Williams"></label>
        <label class="field"><span class="field-label">Character</span>
          <input class="input-text" id="f-character" value="${esc(p.character)}" placeholder="Stanley Kowalski"></label>
        <label class="field"><span class="field-label">Scene</span>
          <input class="input-text" id="f-scene" value="${esc(p.scene)}" placeholder="Act II confrontation"></label>
        <label class="field"><span class="field-label">Dialect</span>
          <select class="input-sel" id="f-accent">
            ${TEXT_DIALECTS.map(d => `<option value="${d.id}" ${d.id === p.accent ? 'selected' : ''}>${d.flag} ${d.label}</option>`).join('')}
          </select></label>
        <label class="field"><span class="field-label">Status</span>
          <select class="input-sel" id="f-status">
            ${STATUSES.map(s => `<option value="${esc(s)}" ${s === p.status ? 'selected' : ''}>${esc(s)}</option>`).join('')}
          </select></label>
      </div>
      <label class="field"><span class="field-label">Text</span>
        <textarea class="ct-area" id="f-text" placeholder="Paste the speech here — one line per line.">${esc(p.text)}</textarea></label>
      <p class="pane-note" id="f-warn" hidden></p>
      <div class="form-actions">
        <button class="btn btn-primary" id="f-save" type="button">Save</button>
        <span class="save-state" id="f-state" role="status" aria-live="polite"></span>
      </div>
    </div>`;

  const textEl = pane.querySelector('#f-text');
  const warn = pane.querySelector('#f-warn');
  const originalLineCount = p.lines.length;

  // Changing the text can orphan line-numbered takes — say so before saving.
  textEl.addEventListener('input', () => {
    const next = splitLines(textEl.value).length;
    if (originalLineCount && next !== originalLineCount) {
      warn.hidden = false;
      warn.className = 'pane-note pane-warn';
      warn.innerHTML = `⚠ The line count changes from ${originalLineCount} to ${next}. Saved takes and notes are kept, but takes recorded against a line number may no longer line up.`;
    } else warn.hidden = true;
  });

  pane.querySelector('#f-save').addEventListener('click', async () => {
    const patch = {
      ...p,
      title: pane.querySelector('#f-title').value.trim(),
      source: pane.querySelector('#f-source').value.trim(),
      author: pane.querySelector('#f-author').value.trim(),
      character: pane.querySelector('#f-character').value.trim(),
      scene: pane.querySelector('#f-scene').value.trim(),
      accent: pane.querySelector('#f-accent').value,
      status: pane.querySelector('#f-status').value,
      text: textEl.value,
    };
    await saveProject(patch);
    pane.querySelector('#f-state').textContent = 'Saved.';
    setTimeout(() => renderProject(id, 'text'), 350);
  });
}

function paneNotes(pane, p, id) {
  pane.innerHTML = `
    <label class="field"><span class="field-label">Personal notes</span>
      <textarea class="ct-area" id="n-notes" placeholder="Blocking, intention, breath, what the director said…">${esc(p.notes)}</textarea></label>
    <label class="field"><span class="field-label">Pronunciation notes</span>
      <textarea class="ct-area short" id="n-pron" placeholder="e.g. keep the r's; BATH stays flat…">${esc(p.pronunciationNotes)}</textarea></label>
    <div class="form-actions">
      <button class="btn btn-primary" id="n-save" type="button">Save notes</button>
      <span class="save-state" id="n-state" role="status" aria-live="polite"></span>
    </div>`;
  pane.querySelector('#n-save').addEventListener('click', async () => {
    await saveProject({ ...p, notes: pane.querySelector('#n-notes').value, pronunciationNotes: pane.querySelector('#n-pron').value });
    pane.querySelector('#n-state').textContent = 'Saved.';
  });
}

function paneWords(pane, p, id) {
  const draw = (list) => list.length
    ? list.map((w, i) => `
        <div class="word-card">
          <div><b>${esc(w.word)}</b>${w.note ? `<span class="word-note"> — ${esc(w.note)}</span>` : ''}</div>
          <button class="btn-lite btn-danger" type="button" data-del="${i}">Remove</button>
        </div>`).join('')
    : '<p class="pane-note">No difficult words yet. Add the ones that keep tripping you up.</p>';

  pane.innerHTML = `
    <div class="word-add">
      <input class="input-text" id="w-word" placeholder="Word or phrase" aria-label="Word">
      <input class="input-text" id="w-note" placeholder="Note (optional)" aria-label="Note">
      <button class="btn btn-primary" id="w-add" type="button">Add</button>
    </div>
    <div id="w-list">${draw(p.difficultWords ?? [])}</div>`;

  const listEl = pane.querySelector('#w-list');
  const refresh = async () => {
    const cur = await getProject(id);
    listEl.innerHTML = draw(cur.difficultWords ?? []);
  };
  pane.querySelector('#w-add').addEventListener('click', async () => {
    const word = pane.querySelector('#w-word').value.trim();
    if (!word) return;
    const cur = await getProject(id);
    cur.difficultWords = [...(cur.difficultWords ?? []), { word, note: pane.querySelector('#w-note').value.trim() }];
    await saveProject(cur);
    pane.querySelector('#w-word').value = ''; pane.querySelector('#w-note').value = '';
    refresh();
  });
  listEl.addEventListener('click', async e => {
    const b = e.target.closest('button[data-del]'); if (!b) return;
    const cur = await getProject(id);
    cur.difficultWords = (cur.difficultWords ?? []).filter((_, i) => i !== +b.dataset.del);
    await saveProject(cur);
    refresh();
  });
}

// ── Export / import ───────────────────────────────────────────

async function exportProject(id) {
  const p = await getProject(id);
  if (!p) return;
  const takes = await listTakes({ projectId: id });
  // Explicit allow-list: only these fields are ever written to a shared file.
  // No internal database ids, no object URLs, no device information.
  const payload = {
    format: 'speechcraft-project',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    audioIncluded: false,
    note: 'Audio is never included. Recordings stay on the device that made them.',
    projects: [{
      title: p.title, source: p.source, author: p.author,
      character: p.character, scene: p.scene, accent: p.accent,
      text: p.text, notes: p.notes, pronunciationNotes: p.pronunciationNotes,
      difficultWords: (p.difficultWords ?? []).map(w => ({ word: w.word, note: w.note ?? '' })),
      overrides: {
        words: p.overrides?.words ?? {},
        occurrence: p.overrides?.occurrence ?? {},
      },
      status: p.status,
      createdAt: p.createdAt,
      // Metadata only, and deliberately without blob ids: a file cannot claim
      // audio it does not carry.
      recordings: takes.map(t => ({
        level: t.level, label: t.label, rating: t.rating,
        note: t.note, durationMs: t.durationMs, createdAt: t.createdAt,
      })),
    }],
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(p.title || 'project').replace(/[^\w-]+/g, '-').toLowerCase().slice(0, 60)}.speechcraft.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Import projects from an untrusted file.
 * Nothing from the file is merged into existing state: it is validated
 * against js/validate.js, rebuilt as fresh plain objects with new ids, and
 * only then written. Existing projects are never overwritten or replaced.
 */
async function importProjectFile(file) {
  const raw = await readJsonFile(file);
  const projects = validateProjectBundle(raw, { newId: () => emptyProject().id });

  const dropped = projects.reduce((n, p) => n + (p.droppedRecordings || 0), 0);
  const summary = [
    `Import ${projects.length} project${projects.length === 1 ? '' : 's'}?`,
    '',
    ...projects.slice(0, 8).map(p => `  \u2022 ${p.title}`),
    projects.length > 8 ? `  \u2026and ${projects.length - 8} more` : '',
    '',
    'These are added alongside your existing projects \u2014 nothing is replaced.',
    dropped ? `Audio is never included in project files, so ${dropped} recording reference${dropped === 1 ? '' : 's'} will be skipped.` : '',
  ].filter(Boolean).join('\n');
  if (!confirm(summary)) return 0;

  let n = 0;
  for (const p of projects) {
    const { droppedRecordings, ...clean } = p;
    await saveProject(clean);
    n++;
  }
  return n;
}

// ── Curated speech libraries (Chekhov, O'Neill, Wilde) ────────
// All three share one browser and one reader; they differ only in their data,
// their icon, and the dialect a piece is most naturally played in.

// Stage directions like "[Looking at his watch]" are shown but never spoken.
const stripStage = s => s.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();
const mmss = secs => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

// `accent` is the dialect a collection opens in; `narrated` lists the dialects
// that actually have recorded narrator audio. Every dialect stays playable —
// the rest simply read in the device voice — but we only look for clip files
// where they exist, and we say so rather than leaving the change unexplained.
const LIBRARIES = {
  chekhov: { data: CHEKHOV, icon: '🎭', title: 'Chekhov · Monologues', accent: 'rp',
             narrated: ['rp'], note: 'public domain · tr. Fell & West' },
  oneill:  { data: ONEILL,  icon: '⚓', title: 'O’Neill · Monologues', accent: 'nam',
             narrated: ['nam'], note: 'public domain in the US' },
  wilde:   { data: WILDE,   icon: '🎩', title: 'Wilde · Monologues',   accent: 'rp',
             narrated: ['rp'], note: 'public domain' },
  pirandello: { data: PIRANDELLO, icon: '🎪', title: 'Pirandello · Monologues', accent: 'rp',
             narrated: ['rp'], note: 'public domain in the US · tr. Storer & Livingston' },
  ibsen:   { data: IBSEN,   icon: '🕯️', title: 'Ibsen · Monologues', accent: 'rp',
             narrated: ['rp'], note: 'public domain · tr. Archer, Gosse, Sharp & Marx Aveling' },
};

// Which narrator voice reads each dialect, for the "you're hearing X" note.
const NARRATOR_NAMES = { nam: 'American Bass', rp: 'Mark', aus: 'Jimbo' };

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
    clip: (n, acc) => lib.narrated.includes(acc) ? `audio/${key}/${acc}/${s.id}-${n}.mp3` : null,
    narrated: lib.narrated,
    scopeId: `${key}:${s.id}`,
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
    clip: (i, acc) => SONNET_NARRATED.includes(acc) ? `audio/sonnets/${acc}/${n}-${i}.mp3` : null,
    narrated: SONNET_NARRATED,
    scopeId: `sonnet:${n}`,
    prev: prev ? { label: `‹ Sonnet ${prev.n}`, go: () => renderSonnet(prev.n) } : null,
    next: next ? { label: `Sonnet ${next.n} ›`, go: () => renderSonnet(next.n) } : null,
  });
}

// Dialects that have any pre-generated sonnet audio (missing files fall back
// to the device voice, so partial coverage is fine).
// Sonnets were generated in all three; Australian is only partial, and any
// ungenerated line falls back to the device voice per line.
const SONNET_NARRATED = ['nam', 'rp', 'aus'];

// The reader: any text, three ways (Speak / Scan / Sound), any dialect.
function renderReader({ label, lines, accent, prev, next, editor, clip, verse = true, meta = null, narrated = [], scopeId = null, projectId = null }) {
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
        <button class="son-tab" data-mode="perform">🎙 Perform</button>
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
    if (m === 'speak') { pane.innerHTML = speakPane(lines, cur, narrated); wireSpeak(lines, cur, pane, clip); }
    else if (m === 'scan') { pane.innerHTML = scanPane(lines, verse); }
    else if (m === 'perform') { renderPerformPane(pane, { lines, accent: cur, clip, scopeId, projectId }); }
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


// ── Perform: record yourself, compare against the model ───────
// Three levels of target: a whole line, a word from it, or a sound. The
// model side reuses the existing clip/TTS pipeline, so Perform works
// everywhere the Listen tab does.

let performState = null;   // { level, ref, label, lastTake } for the open pane

function announce(msg) {
  const el = document.getElementById('perform-live');
  if (el) el.textContent = msg;
}

function renderPerformPane(pane, { lines, accent, clip, scopeId, projectId }) {
  const lang = dialectLang(accent);
  const canRecord = recordingSupported();
  const canStore = dbSupported();

  // Default target: the first line.
  performState = performState && performState.scopeId === (scopeId ?? projectId)
    ? performState
    : { scopeId: scopeId ?? projectId, level: 'line', ref: 0, label: lines[0] ?? '', lastTake: null };

  const lineOptions = lines.map((ln, i) =>
    `<option value="${i}" ${performState.ref === i && performState.level === 'line' ? 'selected' : ''}>${esc(`${i + 1}. ${stripStage(ln).slice(0, 60)}`)}</option>`).join('');

  pane.innerHTML = `
    <div id="perform-live" class="sr-only" role="status" aria-live="polite"></div>

    ${!canRecord ? `<p class="pane-note pane-warn">🎙 Recording isn’t available in this browser${!window.isSecureContext ? ' (it needs a secure https connection)' : ''}. Everything else on this page still works.</p>` : ''}
    ${canRecord && !canStore ? `<p class="pane-note pane-warn">Takes can’t be saved in this browser’s private mode — you can still record and compare within this visit.</p>` : ''}

    <div class="perform-target">
      <label class="field-label" for="perf-level">Rehearse</label>
      <div class="perform-target-row">
        <select id="perf-level" class="input-sel" aria-label="What to rehearse">
          <option value="line" ${performState.level === 'line' ? 'selected' : ''}>A line</option>
          <option value="word" ${performState.level === 'word' ? 'selected' : ''}>A word</option>
          <option value="sound" ${performState.level === 'sound' ? 'selected' : ''}>A sound</option>
        </select>
        <select id="perf-line" class="input-sel grow" aria-label="Which line">${lineOptions}</select>
      </div>
      <div id="perf-sub" class="perform-sub"></div>
      <p class="perform-current" id="perf-current"></p>
    </div>

    <div class="perform-controls">
      <button class="btn btn-lite" id="perf-model" type="button">🔊 Listen to model</button>
      <button class="btn btn-record" id="perf-rec" type="button" ${canRecord ? '' : 'disabled'}>⏺ Record</button>
      <span class="perform-timer" id="perf-timer" hidden aria-hidden="true">00:00</span>
    </div>
    <p class="pane-note perform-limit">Recordings stop automatically at ${Math.round(MAX_RECORDING_MS / 60000)} minutes.</p>
    <p class="perform-error" id="perf-error" role="alert" hidden></p>

    <div class="perform-take" id="perf-take" hidden>
      <h3 class="guide-heading">Your take</h3>
      <div class="perform-controls">
        <button class="btn btn-lite" id="perf-play" type="button">▶ Play mine</button>
        <button class="btn btn-lite" id="perf-compare" type="button">⇄ Compare</button>
        <button class="btn btn-lite btn-danger" id="perf-discard" type="button">Delete</button>
      </div>
      <fieldset class="rating-set">
        <legend class="field-label">Self-rating</legend>
        ${RATINGS.map(r => `<button class="btn btn-lite rating" type="button" data-rating="${r.id}" aria-pressed="false">${r.label}</button>`).join('')}
      </fieldset>
      <label class="field-label" for="perf-note">Notes</label>
      <input class="input-text" id="perf-note" type="text" maxlength="140" placeholder="e.g. dropped the final consonant">
      <button class="btn btn-primary" id="perf-save" type="button">Save take</button>
    </div>

    <h3 class="guide-heading">Saved takes</h3>
    <div id="perf-takes" class="takes-list"><p class="pane-note">Loading…</p></div>`;

  // ── target selection ───────────────────────────────────────
  const levelSel = pane.querySelector('#perf-level');
  const lineSel = pane.querySelector('#perf-line');
  const subWrap = pane.querySelector('#perf-sub');
  const current = pane.querySelector('#perf-current');

  const currentLine = () => lines[+lineSel.value] ?? '';

  const drawSub = () => {
    const level = levelSel.value;
    if (level === 'line') { subWrap.innerHTML = ''; return; }
    const spoken = stripStage(currentLine());
    if (level === 'word') {
      const words = [...new Set(spoken.split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}'’-]/gu, '')).filter(Boolean))];
      subWrap.innerHTML = `<div class="chip-row">${words.map(w =>
        `<button class="chip-pick" type="button" data-pick="${esc(w)}">${esc(w)}</button>`).join('')}</div>`;
    } else {
      // Sounds present in this line, from the phoneme inventory the app teaches.
      const syms = Object.keys(PHONEMES);
      subWrap.innerHTML = `<div class="chip-row">${syms.map(sym =>
        `<button class="chip-pick ipa" type="button" data-pick="${esc(sym)}">/${esc(sym)}/</button>`).join('')}</div>`;
    }
  };

  const syncTarget = () => {
    const level = levelSel.value;
    if (level === 'line') {
      performState = { ...performState, level, ref: +lineSel.value, label: stripStage(currentLine()) };
    } else if (!performState.label || performState.level !== level) {
      performState = { ...performState, level, ref: null, label: '' };
    }
    current.textContent = performState.label
      ? performState.label
      : level === 'word' ? 'Pick a word above.' : 'Pick a sound above.';
    current.classList.toggle('is-empty', !performState.label);
  };

  levelSel.addEventListener('change', () => { drawSub(); syncTarget(); });
  lineSel.addEventListener('change', () => { drawSub(); syncTarget(); });
  subWrap.addEventListener('click', e => {
    const b = e.target.closest('.chip-pick'); if (!b) return;
    subWrap.querySelectorAll('.chip-pick').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    performState = { ...performState, ref: b.dataset.pick, label: b.dataset.pick };
    syncTarget();
  });
  drawSub(); syncTarget();

  // ── model playback ─────────────────────────────────────────
  const modelText = () => performState.level === 'line' ? stripStage(currentLine()) : performState.label;
  const modelClip = () => (performState.level === 'line' && clip) ? clip(+lineSel.value + 1, accent) : null;

  pane.querySelector('#perf-model').addEventListener('click', () => {
    const text = modelText();
    if (!text) { announce('Choose something to rehearse first.'); return; }
    speakLine(text, { lang, clipUrl: modelClip() });
  });

  // ── recording ──────────────────────────────────────────────
  const recBtn = pane.querySelector('#perf-rec');
  const timer = pane.querySelector('#perf-timer');
  const errEl = pane.querySelector('#perf-error');
  const takeBox = pane.querySelector('#perf-take');
  const noteInput = pane.querySelector('#perf-note');
  let pending = null;          // { blob, mimeType, durationMs, url }
  let rating = null;

  const showError = msg => { errEl.textContent = msg; errEl.hidden = false; announce(msg); };
  const clearError = () => { errEl.hidden = true; errEl.textContent = ''; };

  const releasePending = () => {
    if (pending?.url) URL.revokeObjectURL(pending.url);
    pending = null;
  };

  const resetTakeBox = () => {
    releasePending();
    rating = null;
    takeBox.hidden = true;
    noteInput.value = '';
    pane.querySelectorAll('.rating').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
  };

  const finishRecording = async () => {
    recBtn.classList.remove('recording');
    recBtn.textContent = '⏺ Record';
    timer.hidden = true;
    try {
      const out = await stopRecording();
      if (!out || !out.blob?.size) { showError('Nothing was captured. Try again.'); return; }
      releasePending();
      pending = { ...out, url: URL.createObjectURL(out.blob) };
      takeBox.hidden = false;
      announce(`Recording stopped, ${formatMs(out.durationMs)}. Review your take.`);
    } catch (err) {
      showError('Could not finish the recording.');
      console.warn(err);
    }
  };

  recBtn.addEventListener('click', async () => {
    clearError();
    if (isRecording()) { await finishRecording(); return; }
    if (!performState.label) { showError('Choose a line, word or sound to rehearse first.'); return; }
    try {
      await startRecording({
        onTick: ms => { timer.textContent = formatMs(ms); },
        onAutoStop: () => { announce('Recording limit reached.'); finishRecording(); },
      });
      recBtn.classList.add('recording');
      recBtn.textContent = '⏹ Stop';
      timer.hidden = false;
      timer.textContent = '00:00';
      announce('Recording started.');
    } catch (err) {
      showError(micErrorMessage(err));
    }
  });

  pane.querySelector('#perf-play').addEventListener('click', () => {
    if (pending?.url) playUrl(pending.url);
  });

  pane.querySelector('#perf-compare').addEventListener('click', async () => {
    if (!pending?.url) return;
    announce('Playing model, then your take.');
    const url = modelClip();
    if (url) {
      await playUrl(url);
    } else {
      await new Promise(res => { speakLine(modelText(), { lang }); setTimeout(res, Math.min(6000, 800 + modelText().length * 60)); });
    }
    await new Promise(r => setTimeout(r, 250));
    await playUrl(pending.url);
  });

  pane.querySelector('#perf-discard').addEventListener('click', () => {
    resetTakeBox();
    announce('Take deleted.');
  });

  pane.querySelectorAll('.rating').forEach(b =>
    b.addEventListener('click', () => {
      rating = b.dataset.rating;
      pane.querySelectorAll('.rating').forEach(x => {
        const on = x === b;
        x.classList.toggle('on', on);
        x.setAttribute('aria-pressed', String(on));
      });
    }));

  pane.querySelector('#perf-save').addEventListener('click', async () => {
    if (!pending) return;
    if (!dbSupported()) { showError('This browser can’t save takes locally.'); return; }
    try {
      await saveTake({
        projectId, scopeId,
        target: { level: performState.level, ref: performState.ref, label: performState.label },
        blob: pending.blob, mimeType: pending.mimeType, durationMs: pending.durationMs,
        rating, note: noteInput.value.trim(),
      });
      resetTakeBox();
      announce('Take saved.');
      if (projectId) touchRehearsed(projectId);
      drawTakes();
    } catch (err) {
      showError('Could not save that take.');
      console.warn(err);
    }
  });

  // ── saved takes list ───────────────────────────────────────
  const takesEl = pane.querySelector('#perf-takes');

  async function drawTakes() {
    if (!dbSupported()) { takesEl.innerHTML = '<p class="pane-note">Saving is unavailable in this browser.</p>'; return; }
    let takes = [];
    try { takes = await listTakes({ projectId, scopeId }); }
    catch { takesEl.innerHTML = '<p class="pane-note">Could not load saved takes.</p>'; return; }

    if (!takes.length) {
      takesEl.innerHTML = '<p class="pane-note">No takes yet. Record one above and it will be saved on this device.</p>';
      return;
    }
    const project = projectId ? await getProject(projectId) : null;
    takesEl.innerHTML = takes.map((t, i) => {
      const isBest = project && project.bestTakeId === t.id;
      const rate = RATINGS.find(r => r.id === t.rating);
      return `
        <div class="take-card ${isBest ? 'is-best' : ''}" data-take="${t.id}">
          <div class="take-head">
            <span class="take-name">Take ${takes.length - i}</span>
            ${rate ? `<span class="tag take-rate rate-${t.rating}">${esc(rate.label)}</span>` : ''}
            ${isBest ? '<span class="tag tag-skill">★ Best Take</span>' : ''}
          </div>
          <p class="take-meta">${esc(t.label || '')} · ${formatMs(t.durationMs || 0)} · ${new Date(t.createdAt).toLocaleDateString()}</p>
          ${t.note ? `<p class="take-note">${esc(t.note)}</p>` : ''}
          <div class="take-actions">
            <button class="btn-lite" type="button" data-act="play">▶ Play</button>
            <button class="btn-lite" type="button" data-act="compare">⇄ Compare</button>
            ${projectId ? `<button class="btn-lite" type="button" data-act="best">${isBest ? 'Unset best' : '★ Best Take'}</button>` : ''}
            <button class="btn-lite btn-danger" type="button" data-act="del">Delete</button>
          </div>
        </div>`;
    }).join('');

    takesEl.querySelectorAll('.take-card').forEach(card => {
      const id = card.dataset.take;
      card.addEventListener('click', async e => {
        const btn = e.target.closest('button[data-act]'); if (!btn) return;
        const act = btn.dataset.act;
        if (act === 'play') { playUrl(await takeUrl(id)); }
        else if (act === 'compare') {
          const meta = takes.find(t => t.id === id);
          announce('Playing model, then your take.');
          const mUrl = (meta.level === 'line' && clip) ? clip((meta.ref ?? 0) + 1, accent) : null;
          if (mUrl) await playUrl(mUrl);
          else await new Promise(res => { speakLine(meta.label, { lang }); setTimeout(res, Math.min(6000, 800 + (meta.label?.length ?? 0) * 60)); });
          await new Promise(r => setTimeout(r, 250));
          playUrl(await takeUrl(id));
        }
        else if (act === 'best') { await setBestTake(projectId, id); drawTakes(); }
        else if (act === 'del') {
          if (!confirm('Delete this take? This cannot be undone.')) return;
          await deleteTake(id);
          announce('Take deleted.');
          drawTakes();
        }
      });
    });
  }
  drawTakes();
}

// Render a line with any [stage direction] set apart from the spoken words.
function lineHtml(ln) {
  return esc(ln).replace(/\[[^\]]*\]/g, m => `<i class="stage-dir">${m}</i>`);
}

function speakPane(lines, accent = null, narrated = []) {
  // Say plainly whose voice this is, so switching dialect is never a mystery.
  const voiceNote = !narrated.length ? ''
    : narrated.includes(accent)
      ? `<p class="voice-note">🎙 Read by <b>${esc(NARRATOR_NAMES[accent] ?? 'the narrator')}</b>.</p>`
      : `<p class="voice-note voice-note-fallback">🔈 Reading in your device voice. This collection’s recorded narrator is <b>${esc(NARRATOR_NAMES[narrated[0]] ?? '—')}</b> — switch to <b>${esc(dialectName(narrated[0]))}</b> to hear it.</p>`;
  const html = lines.map((ln, i) =>
    `<button class="poem-line" data-idx="${i + 1}" data-say="${esc(stripStage(ln))}"><span class="ln-num">${i + 1}</span><span class="ln-text">${lineHtml(ln)}</span></button>`).join('');
  return `
    <p class="pane-note">Tap any line to hear it, or read the whole thing through. Let the punctuation set your breath — commas are quick lifts, line-ends and colons the real breaths. <i>Stage directions are shown but never spoken.</i></p>
    ${voiceNote}
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

async function fillSound(lines, accent, pane, opts = {}) {
  try { await loadPron(); }
  catch {
    pane.innerHTML = `<p class="pane-note">Couldn’t load the pronunciation dictionary — check your connection and reopen this tab.</p>`;
    return;
  }
  const projectId = opts.projectId ?? null;
  let project = projectId ? await getProject(projectId) : null;

  const draw = () => {
    let approxSeen = false, miss = 0, edited = 0;
    const linesHtml = lines.map((ln, i) => {
      const toks = stripStage(ln).split(/(\s+)/);
      let wordIdx = -1;
      const html = toks.map(tok => {
        if (/^\s*$/.test(tok)) return tok === '' ? '' : '<span class="scan-sp"> </span>';
        wordIdx++;
        const base = ipaFor(tok, accent);
        const res = resolvePronunciation({
          word: tok, accent, project, lineIdx: i, wordIdx, base,
        });
        const editable = `data-word="${esc(tok)}" data-line="${i}" data-widx="${wordIdx}"`;
        if (!res) {
          miss++;
          return `<span class="tw"><button class="tw-word" type="button" ${editable}>${esc(tok)}</button><span class="tw-ipa tw-miss">—</span></span>`;
        }
        if (res.source === 'dictionary' && res.approx) approxSeen = true;
        const custom = res.source !== 'dictionary';
        if (custom) edited++;
        return `<span class="tw"><button class="tw-word ${custom ? 'is-custom' : ''}" type="button" ${editable}>${esc(tok)}</button>` +
               `<span class="tw-ipa ${custom ? 'is-custom' : ''}" title="${custom ? esc(res.source) + ' override' : ''}">/${esc(res.ipa)}/</span></span>`;
      }).join('');
      return `<div class="tw-line"><span class="ln-num">${i + 1}</span><span class="tw-words">${html}</span></div>`;
    }).join('');

    pane.innerHTML = `
      <p class="pane-note">Every word transcribed in <b>${esc(dialectName(accent))}</b>${approxSeen ? ' <span class="approx">≈ non-American dialects are rule-derived</span>' : ''}.${miss ? ` <span class="approx">${miss} not in the dictionary (—).</span>` : ''}
        Tap any word to correct its pronunciation.${edited ? ` <span class="approx">${edited} customised.</span>` : ''}</p>
      <div class="son-transcribe">${linesHtml}</div>`;

    pane.querySelectorAll('.tw-word').forEach(b =>
      b.addEventListener('click', () => openWordEditor({
        word: b.dataset.word, accent, project, projectId,
        lineIdx: +b.dataset.line, wordIdx: +b.dataset.widx,
        onSaved: async () => { if (projectId) project = await getProject(projectId); draw(); },
      })));
  };
  draw();
}

// ── Word pronunciation editor (modal) ─────────────────────────

function openWordEditor({ word, accent, project, projectId, lineIdx, wordIdx, onSaved }) {
  const base = ipaFor(word, accent);
  const current = resolvePronunciation({ word, accent, project, lineIdx, wordIdx, base });
  const generated = base?.ipa ?? '';
  // Alternates the built-in data can offer: the same word read in the other dialects.
  const alts = ['nam', 'rp', 'aus']
    .filter(a => a !== accent)
    .map(a => ({ accent: a, ipa: ipaFor(word, a)?.ipa }))
    .filter(a => a.ipa && a.ipa !== generated);

  const scopeOpts = [
    ['occurrence', 'This occurrence only', !projectId],
    ['project', 'All matching words in this project', !projectId],
    ['personal', 'Save to my personal dictionary', false],
  ];

  openModal({
    title: `Pronunciation of “${word}”`,
    body: `
      <dl class="we-facts">
        <div><dt>Word</dt><dd>${esc(word)}</dd></div>
        <div><dt>Dialect</dt><dd>${esc(dialectName(accent) || accent)}</dd></div>
        <div><dt>Generated</dt><dd>${generated ? `/${esc(generated)}/` : '<i>not in the dictionary</i>'}</dd></div>
        ${current && current.source !== 'dictionary' ? `<div><dt>Now using</dt><dd class="is-custom">/${esc(current.ipa)}/ <span class="src-tag">${esc(current.source)}</span></dd></div>` : ''}
      </dl>
      ${alts.length ? `<div class="we-alts"><span class="field-label">Alternates</span>${alts.map(a =>
        `<button class="chip-pick ipa" type="button" data-alt="${esc(a.ipa)}">/${esc(a.ipa)}/ <span class="alt-src">${esc(dialectName(a.accent) || a.accent)}</span></button>`).join('')}</div>` : ''}
      <label class="field"><span class="field-label" id="we-ipa-label">IPA</span>
        <input class="input-text ipa-input" id="we-ipa" aria-labelledby="we-ipa-label" value="${esc(current?.ipa ?? generated)}" placeholder="e.g. ˈaɪðər" autocomplete="off"></label>
      <p class="we-warn" id="we-warn" role="alert" hidden></p>
      <label class="field"><span class="field-label">Note (optional)</span>
        <input class="input-text" id="we-note" maxlength="140" value="${esc(current?.note ?? '')}" placeholder="e.g. director wants the British form"></label>
      <fieldset class="field"><legend class="field-label">Apply to</legend>
        ${scopeOpts.map(([v, l, dis], i) => `
          <label class="we-scope ${dis ? 'is-off' : ''}">
            <input type="radio" name="we-scope" value="${v}" ${i === (projectId ? 0 : 2) ? 'checked' : ''} ${dis ? 'disabled' : ''}>
            <span>${l}${dis ? ' <i>(open from a project)</i>' : ''}</span>
          </label>`).join('')}
      </fieldset>`,
    actions: `
      <button class="btn btn-lite" id="we-reset" type="button">Reset to generated</button>
      <button class="btn btn-primary" id="we-save" type="button">Save</button>`,
    onMount: (root, close) => {
      const ipaInput = root.querySelector('#we-ipa');
      const warn = root.querySelector('#we-warn');
      root.querySelectorAll('[data-alt]').forEach(b =>
        b.addEventListener('click', () => { ipaInput.value = b.dataset.alt; ipaInput.focus(); }));

      root.querySelector('#we-save').addEventListener('click', async () => {
        const check = validateIpa(ipaInput.value);
        if (!check.ok) { warn.hidden = false; warn.textContent = check.error; return; }
        if (check.warning) { warn.hidden = false; warn.textContent = check.warning; }
        const scope = root.querySelector('input[name="we-scope"]:checked')?.value ?? 'personal';
        const note = root.querySelector('#we-note').value.trim();
        try {
          if (scope === 'personal') {
            setPersonal({ word, accent, ipa: check.ipa, note });
          } else if (projectId) {
            let p = await getProject(projectId);
            p = scope === 'occurrence'
              ? setOccurrenceOverride(p, { lineIdx, wordIdx, ipa: check.ipa, note })
              : setProjectWordOverride(p, { word, accent, ipa: check.ipa, note });
            await saveProject(p);
          }
          close();
          onSaved?.();
        } catch (err) {
          warn.hidden = false; warn.textContent = 'Could not save that override.';
          console.warn(err);
        }
      });

      root.querySelector('#we-reset').addEventListener('click', async () => {
        if (!confirm('Reset this word to the generated pronunciation?')) return;
        deletePersonal(word, accent);
        if (projectId) {
          let p = await getProject(projectId);
          p = clearOverridesFor(p, { word, accent, lineIdx, wordIdx });
          await saveProject(p);
        }
        close();
        onSaved?.();
      });
    },
  });
}

// ── Accessible modal ──────────────────────────────────────────
// Focus is trapped inside while open, Escape closes, and focus returns to
// whatever opened it.

function openModal({ title, body, actions = '', onMount }) {
  const prev = document.activeElement;
  const wrap = document.createElement('div');
  wrap.className = 'modal-wrap';
  wrap.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head">
        <h2>${esc(title)}</h2>
        <button class="modal-x" type="button" data-close aria-label="Close">✕</button>
      </div>
      <div class="modal-body">${body}</div>
      <div class="modal-actions">${actions}</div>
    </div>`;
  document.body.appendChild(wrap);
  document.body.classList.add('modal-open');

  const close = () => {
    wrap.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKey, true);
    prev?.focus?.();
  };
  const focusables = () => [...wrap.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled);

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  document.addEventListener('keydown', onKey, true);
  wrap.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));

  onMount?.(wrap, close);
  (wrap.querySelector('input, button:not([data-close])') ?? wrap.querySelector('button'))?.focus();
  return close;
}

// ── Personal Pronunciation Dictionary ─────────────────────────

let dictFilter = 'all';
let dictQuery = '';

function renderDictionary() {
  record(renderDictionary);
  const draw = () => {
    let rows = listPersonal();
    if (dictFilter !== 'all') rows = rows.filter(e => e.accent === dictFilter);
    const q = dictQuery.trim().toLowerCase();
    if (q) rows = rows.filter(e => e.word.includes(q) || e.ipa.includes(q) || (e.note ?? '').toLowerCase().includes(q));

    const list = document.getElementById('dict-list');
    if (!list) return;
    if (!listPersonal().length) {
      list.innerHTML = `
        <div class="empty-state">
          <p class="empty-emoji">📕</p>
          <h2>No saved pronunciations yet</h2>
          <p>Open any text's <b>IPA</b> tab and tap a word to correct how it's transcribed. Save it here and it applies everywhere in that dialect.</p>
        </div>`;
      return;
    }
    list.innerHTML = rows.length ? rows.map(e => `
      <div class="dict-row" data-w="${esc(e.word)}" data-a="${esc(e.accent)}">
        <div class="dict-main">
          <span class="dict-word">${esc(e.display || e.word)}</span>
          <span class="dict-ipa">/${esc(e.ipa)}/</span>
          ${e.note ? `<span class="dict-note">${esc(e.note)}</span>` : ''}
        </div>
        <span class="tag">${esc(dialectName(e.accent) || e.accent)}</span>
        <div class="dict-actions">
          <button class="btn-lite" type="button" data-act="edit">Edit</button>
          <button class="btn-lite btn-danger" type="button" data-act="del">Delete</button>
        </div>
      </div>`).join('') : '<p class="pane-note">No entries match that search.</p>';

    list.querySelectorAll('.dict-row').forEach(row => {
      row.addEventListener('click', e => {
        const b = e.target.closest('button[data-act]'); if (!b) return;
        const word = row.dataset.w, accent = row.dataset.a;
        if (b.dataset.act === 'del') {
          if (!confirm(`Delete the saved pronunciation for “${word}”?`)) return;
          deletePersonal(word, accent);
          draw();
        } else {
          openWordEditor({ word, accent, project: null, projectId: null, lineIdx: null, wordIdx: null, onSaved: draw });
        }
      });
    });
  };

  app.innerHTML = `
    ${pageTopbar('📕 Personal Dictionary', '#8a6d3b')}
    <main class="track-list">
      <p class="track-blurb">Pronunciations you've corrected. These apply everywhere in the app, for the dialect you saved them in.</p>
      <input class="sonnet-search" id="dict-search" type="search" placeholder="Search word, IPA or note…" value="${esc(dictQuery)}" autocomplete="off">
      <div class="proj-tools">
        <label class="field-label" for="dict-filter">Dialect</label>
        <select class="input-sel" id="dict-filter" aria-label="Filter by dialect">
          <option value="all">All dialects</option>
          ${TEXT_DIALECTS.map(d => `<option value="${d.id}">${d.flag} ${d.label}</option>`).join('')}
        </select>
        <button class="btn btn-lite" id="dict-export" type="button">Export</button>
        <button class="btn btn-lite" id="dict-import" type="button">Import</button>
      </div>
      <div id="dict-list"></div>
    </main>
    <input type="file" id="dict-file" accept="application/json" hidden>`;
  wireBrandHome();

  document.getElementById('dict-filter').value = dictFilter;
  document.getElementById('dict-search').addEventListener('input', e => { dictQuery = e.target.value; draw(); });
  document.getElementById('dict-filter').addEventListener('change', e => { dictFilter = e.target.value; draw(); });
  document.getElementById('dict-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(exportPersonal(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'speechcraft-dictionary.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  const file = document.getElementById('dict-file');
  document.getElementById('dict-import').addEventListener('click', () => file.click());
  file.addEventListener('change', async () => {
    const f = file.files?.[0]; if (!f) return;
    try {
      const raw = await readJsonFile(f);
      const entries = validateDictionaryBundle(raw);
      const replace = listPersonal().length
        ? confirm(`Import ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}.\n\nOK = replace everything you have now\nCancel = merge with your existing entries`)
        : false;
      const n = importPersonal({ format: 'speechcraft-dictionary', formatVersion: 1, entries }, { replace });
      alert(`Imported ${n} entr${n === 1 ? 'y' : 'ies'}.`);
      draw();
    } catch (err) {
      alert(`That file could not be imported.\n\n${err instanceof ValidationError ? err.message : 'The file could not be read.'}`);
    } finally { file.value = ''; }
  });
  draw();
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

// Build a track's winding lesson path. Shared by the full-page view
// (renderTrack) and the Lessons tab inside a dialect hub.
function buildTrackPath(track) {
  const chain = TRACK_LESSONS[track.id];
  const active = chain.find(l => !store.isCompleted(l.id) && isUnlocked(l));
  let gi = 0;

  const html = track.unitIds.map((uid, ui) => {
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

  const wire = (container) => {
    container.querySelectorAll('.path-node[data-lesson]:not([disabled])').forEach(btn =>
      btn.addEventListener('click', () => {
        const lesson = chain.find(l => l.id === btn.dataset.lesson);
        // Checkpoint games jump straight in — no guide page.
        if (lesson.checkpoint) startLesson(lesson);
        else renderGuide(lesson);
      })
    );
  };
  return { html, wire };
}

function renderTrack(track) {
  record(() => renderTrack(track));
  const path = buildTrackPath(track);
  app.innerHTML = `
    ${pageTopbar(`${track.icon} ${esc(track.title)}`, track.color)}
    <main class="track-scroll">
      <div class="practice-row">
        <button class="btn btn-practice" id="practice">🎯 Practice — mixed review, no hearts lost</button>
      </div>
      ${path.html}
    </main>`;

  wireBrandHome();
  document.getElementById('practice').addEventListener('click', () => startLesson(practiceLesson(track)));
  path.wire(app);
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
  s.shownAt = Date.now();          // for analytics response time
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

function showFeedback(s, ok, ex, { requeue = true, penalty = true, chose = null } = {}) {
  // Analytics only observes — it never alters the verdict above.
  try {
    recordAttempt({ ex, ok, chose, ms: s.shownAt ? Date.now() - s.shownAt : null,
                    accent: s.lesson?.accent ?? s.lesson?.shiftTo ?? null });
  } catch (err) { console.warn('analytics skipped', err); }
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
      showFeedback(s, ok, ex, { chose: ex.choices[+btn.dataset.i].label });
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

// ── Defence in depth ──────────────────────────────────────────
// GitHub Pages cannot send frame-ancestors or X-Frame-Options headers, and a
// <meta> CSP ignores frame-ancestors, so this is the only clickjacking
// mitigation available on this host. It is a fallback, not a guarantee — a
// sandboxed iframe can suppress navigation. The optional host configs in
// deploy/ set the real header.
if (window.top !== window.self) {
  try { window.top.location = window.self.location; }
  catch { document.documentElement.textContent = 'Speechcraft cannot be embedded in another page.'; }
}

// Development-only network guard: this app is designed to make no external
// requests at all. In dev, warn loudly if anything ever tries. Production
// behaviour is unchanged.
if (['localhost', '127.0.0.1'].includes(location.hostname)) {
  const sameOrigin = (url) => {
    try { return new URL(url, location.href).origin === location.origin; }
    catch { return true; }                       // relative/blob/data — fine
  };
  const origFetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : input?.url;
    if (url && !/^(blob:|data:)/.test(url) && !sameOrigin(url))
      console.error('[network guard] blocked-by-policy external fetch:', url);
    return origFetch.call(this, input, init);
  };
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    if (url && !/^(blob:|data:)/.test(url) && !sameOrigin(url))
      console.error('[network guard] blocked-by-policy external XHR:', url);
    return origOpen.call(this, method, url, ...rest);
  };
}

// One-time: turn any old "Train Any Text" draft into a real project. The
// original localStorage value is left untouched as a backup.
migrateLegacyCustomText().catch(err => console.warn('migration skipped:', err));

// Recorded-take object URLs are per-session; let them go on unload.
window.addEventListener('pagehide', () => { try { releaseAllUrls(); cancelRecording(); } catch {} });

renderHome();
