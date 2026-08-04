import { COURSE, TRACKS, MODES } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { generateLesson, phonemesForAccent } from './engine.js';
import { store, HEART_MAX } from './state.js';
import { speak, speakLine, speakSequence, stopSpeech, pauseSpeech, resumeSpeech, setSpeechListener, ACCENT_LANG, playPhoneme, hasPhonemeClip, hasWordClip, clipIndexLoaded } from './audio.js';
import { KNOWN_BAD as KNOWN_BAD_LIST } from './data/audio-flags.js';
import { voicesForCourse } from './data/voices.js';
import { LONGFORM_COVERAGE } from './data/audio-coverage.js';
import { RECASTS, RECAST_LABEL } from './data/recasts.js';
import { articulationSVG, vocalTractSVG, vowelSpaceSVG } from './diagram.js';
import { SONNETS } from './data/sonnets.js';
import { CHEKHOV } from './data/chekhov.js';
import { ONEILL } from './data/oneill.js';
import { WILDE } from './data/wilde.js';
import { PIRANDELLO } from './data/pirandello.js';
import { IBSEN } from './data/ibsen.js';
import { IDIOM, AUS_PATTERNS, U_NON_U, FALSE_FRIENDS, MLE } from './data/idiom.js';
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
import { questRows, claimQuest, onLessonFinished } from './quests.js';
import { readJsonFile, validateProjectBundle, validateDictionaryBundle,
         ValidationError, LIMITS } from './validate.js';
import { resolvePronunciation, validateIpa, setPersonal, getPersonal, deletePersonal,
         listPersonal, exportPersonal, importPersonal, setProjectWordOverride,
         setOccurrenceOverride, clearOverridesFor, normWord } from './overrides.js';
import { recordAttempt, symbolBreakdown, confusionPairs, totals, dailyRehearsal,
         resetAnalytics, hasEnoughData, accuracyLabel, CONFIDENCE, confidenceOf } from './analytics.js';

const langFor = lesson => ACCENT_LANG[lesson?.accent] ?? 'en-GB';

// File slug for a phoneme's isolated clip: derived from its display name,
// same transform the word clips use ("STRUT vowel" → strut_vowel).
const phonemeSlug = sym =>
  PHONEMES[sym] ? PHONEMES[sym].name.toLowerCase().replace(/[^a-z0-9]+/g, '_') : null;

// A word control that is only playable when a real recording exists for
// this course. Missing → visibly unavailable, never a dead button and
// never device TTS. (Before the index loads, assume available.)
const speakableWord = (w, acc) => !clipIndexLoaded() || hasWordClip(w, acc);
const wordChip = (w, acc) => speakableWord(w, acc)
  ? `<button class="word-chip" data-say="${esc(w)}" type="button" aria-label="Hear the word “${esc(w)}”">🔊 ${esc(w)}</button>`
  : `<span class="word-chip is-off" role="note" aria-label="“${esc(w)}” — recording coming soon">${esc(w)} <small>· recording soon</small></span>`;

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
      // Standard British checkpoints always carry idiom material — meaning
      // questions early, register questions too (deterministic via rotation).
      if ((accent ?? shiftTo) === 'ssbe') extras.push('idiom', 'idiomRegister');
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
  if (lesson.arcade) return goSection('practice');
  if (lesson.track) return renderTrack(lesson.track);
  return renderHome();
}

// Which dialect the arcade games draw their words from (null = core IPA).

// A single-mode arcade session: one exercise type, played on its own,
// in whichever dialect is currently selected.
function modeLesson(mode, accent = null) {
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

const TRACK_ACCENT = { nam: 'nam', rp: 'rp', aus: 'aus', ssbe: 'ssbe' };

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

// ── App shell: Duolingo-style layout, Speechcraft skin ────────
// A persistent sidebar (bottom nav on mobile), a main column, and a right
// rail with stats, quests and today's rehearsal. You are always "in" one
// course — a dialect, or IPA Foundations — switched from the flag chip,
// exactly like switching languages. Leaderboards are deliberately absent:
// there are no accounts, so there is nobody real to rank against.

const COURSES = [
  { id: 'nam', icon: '🇺🇸', label: 'Neutral American' },
  { id: 'rp', icon: '🎩', label: 'Traditional RP' },
  { id: 'ssbe', icon: '🇬🇧', label: 'Standard British' },
  { id: 'aus', icon: '🇦🇺', label: 'Australian' },
  { id: 'core', icon: 'ʃə', label: 'IPA Foundations' },
];
const SECTIONS = [
  { id: 'learn', icon: '🏠', label: 'Learn' },
  { id: 'practice', icon: '🎯', label: 'Practice' },
  { id: 'library', icon: '📚', label: 'Library' },
  { id: 'progress', icon: '📈', label: 'Progress' },
  { id: 'more', icon: '⋯', label: 'More' },
];
// Shop and Profile live under More but are still full shell sections.
const OFF_NAV_SECTIONS = ['shop', 'profile'];
// Older saved states point at sections that have since moved.
const LEGACY_SECTIONS = { textbook: 'library', texts: 'library', quests: 'progress' };

const activeCourse = () => {
  const c = localStorage.getItem('speechcraft-course');
  return COURSES.some(x => x.id === c) ? c : 'nam';
};
const setCourse = c => { try { localStorage.setItem('speechcraft-course', c); } catch {} };
const activeSection = () => {
  const raw = localStorage.getItem('speechcraft-section');
  const s = LEGACY_SECTIONS[raw] ?? raw;
  return SECTIONS.some(x => x.id === s) || OFF_NAV_SECTIONS.includes(s) ? s : 'learn';
};
const setSection = s => { try { localStorage.setItem('speechcraft-section', s); } catch {} };

const trackFor = d => TRACKS.find(t => t.id === d);

function renderHome() {
  renderShell(activeSection());
}

function goSection(id) {
  setSection(id);
  renderShell(id);
}

function renderShell(section) {
  stopSpeech();
  navStack = [];
  navRestoring = false;
  setSection(section);
  window.scrollTo(0, 0);          // each section starts at its own top
  const course = COURSES.find(c => c.id === activeCourse());

  app.innerHTML = `
    <div class="shell">
      <aside class="side-nav">
        <button class="side-brand" id="brand-home" type="button">
          <span class="side-brand-name">Speechcraft</span>
          <span class="side-brand-sub">SPEAK · LEARN · CONNECT</span>
        </button>
        <nav aria-label="Sections">
          ${SECTIONS.map(s => `
            <button class="side-item ${s.id === section ? 'on' : ''}" data-sec="${s.id}" type="button">
              <span class="side-icon">${s.icon}</span><span class="side-label">${s.label}</span>
            </button>`).join('')}
        </nav>
      </aside>
      <div class="main-col">
        <div class="statsbar" id="statsbar"></div>
        ${store.freePlay ? '<p class="freeplay-note">Free play is on — every lesson is unlocked.</p>' : ''}
        <main id="shell-main"></main>
      </div>
      <aside class="right-rail">
        <div id="rail-quests"></div>
        <div id="rail-today"></div>
      </aside>
    </div>
    <nav class="bottom-nav" aria-label="Sections">
      ${['learn', 'practice', 'library', 'progress', 'more'].map(id => {
        const s = SECTIONS.find(x => x.id === id);
        return `<button class="bn-item ${id === section ? 'on' : ''}" data-sec="${id}" type="button">
          <span class="bn-icon">${s.icon}</span><span class="bn-label">${s.label}</span></button>`;
      }).join('')}
    </nav>`;

  document.getElementById('brand-home').addEventListener('click', () => goSection('learn'));
  app.querySelectorAll('[data-sec]').forEach(b =>
    b.addEventListener('click', () => goSection(b.dataset.sec)));

  drawStatsbar(course, section);
  drawRail(section);

  const main = document.getElementById('shell-main');
  if (section === 'learn') learnMain(main, course);
  else if (section === 'practice') practiceMain(main, course);
  else if (section === 'library') libraryMain(main, course);
  else if (section === 'progress') progressMain(main);
  else if (section === 'shop') shopMain(main);
  else if (section === 'profile') profileMain(main);
  else moreMain(main);
}

// ── Stats bar: course chip + streak / gems / hearts ───────────

function drawStatsbar(course, section) {
  const bar = document.getElementById('statsbar');
  const hearts = store.hearts;
  // Before anything is earned, the economy stays out of the way: just the
  // course chip. The counters appear once the first lesson pays out.
  const earned = store.hasEarnedAnything;
  bar.innerHTML = `
    <button class="stat-chip course-chip" id="course-chip" type="button"
            aria-haspopup="menu" aria-expanded="false" title="Switch course"
            aria-label="Change course. Current course: ${esc(course.label)}.">
      <span class="course-icon" aria-hidden="true">${course.icon}</span>
      <span class="course-name" aria-hidden="true">${esc(course.label)}</span> <span aria-hidden="true">▾</span>
    </button>
    ${earned ? `
    <span class="stat-chip" title="Streak"><span aria-hidden="true">🔥</span> ${store.displayStreak}<span class="sr-only"> day streak</span></span>
    <span class="stat-chip" title="Gems"><span aria-hidden="true">💎</span> ${store.gems}<span class="sr-only"> gems</span></span>
    <span class="stat-chip ${hearts === 0 ? 'chip-empty' : ''}" title="Hearts"><span aria-hidden="true">❤️</span> ${hearts}<span class="sr-only"> hearts</span></span>
    ${store.boostActive ? '<span class="stat-chip chip-boost" title="Double XP active">⚡×2</span>' : ''}` : ''}
    <button class="freeplay ${store.freePlay ? 'on' : ''}" id="freeplay" aria-pressed="${store.freePlay}"
            aria-label="Free play: unlock all lessons" title="Free play: unlock all lessons">${store.freePlay ? '🔓' : '🔒'}</button>
    <div class="course-menu" id="course-menu" role="menu" hidden>
      <p class="course-menu-h">My courses</p>
      ${COURSES.map(c => {
        const t = trackFor(c.id);
        const { done, total } = trackProgress(t);
        return `<button class="course-row ${c.id === course.id ? 'on' : ''}" data-course="${c.id}" role="menuitem" type="button">
          <span class="course-icon">${c.icon}</span>
          <span class="course-row-info"><b>${esc(c.label)}</b><small>${done}/${total} steps</small></span>
          ${c.id === course.id ? '<span class="course-check">✓</span>' : ''}
        </button>`;
      }).join('')}
    </div>`;

  const chip = bar.querySelector('#course-chip');
  const menu = bar.querySelector('#course-menu');
  const close = () => { menu.hidden = true; chip.setAttribute('aria-expanded', 'false'); };
  chip.addEventListener('click', e => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
    chip.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', close, { once: true });
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  });
  menu.querySelectorAll('.course-row').forEach(b =>
    b.addEventListener('click', () => { setCourse(b.dataset.course); renderShell(activeSection()); }));
  bar.querySelector('#freeplay').addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderShell(activeSection());
  });
}

// ── Right rail: quests mini-panel + today's rehearsal ─────────

function drawRail(section) {
  const q = document.getElementById('rail-quests');
  if (!store.hasEarnedAnything) {
    // No quest pressure before the first lesson — a gentle pointer instead.
    q.innerHTML = `
      <section class="rail-card">
        <div class="rail-head"><h2>Getting started</h2></div>
        <p class="pane-note">Finish your first lesson and your streak, quests and gems switch on here.</p>
      </section>`;
    const t0 = document.getElementById('rail-today');
    t0.innerHTML = '';
    return;
  }
  const rows = questRows();
  q.innerHTML = `
    <section class="rail-card">
      <div class="rail-head"><h2>Daily Quests</h2>
        <button class="btn-lite" id="rail-quests-all" type="button">View all</button></div>
      ${rows.map(r => `
        <div class="quest-row mini">
          <span class="quest-icon">${r.icon}</span>
          <div class="quest-info">
            <span class="quest-title">${esc(r.title)}</span>
            <div class="quest-bar"><div style="width:${Math.round(r.done / r.target * 100)}%"></div>
              <span class="quest-count">${r.done}/${r.target}</span></div>
          </div>
          ${r.complete ? (r.claimed ? '<span class="quest-done">✓</span>' : '<span class="quest-chest">🎁</span>') : ''}
        </div>`).join('')}
    </section>`;
  q.querySelector('#rail-quests-all').addEventListener('click', () => goSection('progress'));

  const t = document.getElementById('rail-today');
  t.innerHTML = section === 'practice' ? '' : dailyRehearsalCard();
  t.querySelector('#today-start')?.addEventListener('click', startDailyRehearsal);
}

// ── Learn ─────────────────────────────────────────────────────

// Rough sung-through length of a lesson, for the path labels.
function estMinutes(lesson) {
  return Math.max(2, Math.round((lesson.count ?? 8) * 0.4));
}

function lessonKindName(lesson) {
  if (lesson.checkpoint) return 'Checkpoint game';
  if (/final|mastery/.test(lesson.id) || (lesson.count && lesson.count >= 12)) return 'Mastery';
  return { '📖': 'Reading', '🎧': 'Listening', '⭐': 'Mixed exercises' }[lessonKindEmoji(lesson)];
}

// The dominant action on Learn: where you left off, and one button.
function continueCard(track, course) {
  const chain = TRACK_LESSONS[track.id];
  const next = chain.find(l => !store.isCompleted(l.id) && isUnlocked(l));
  const { done, total } = trackProgress(track);
  if (!next) {
    return {
      html: `
      <section class="continue-card" aria-label="Course complete">
        <div class="cc-info">
          <span class="cc-stage">${course.icon} ${esc(course.label)} · 🎓 mastered</span>
          <h2>Every lesson complete</h2>
          <p class="cc-meta">Keep it sharp with mixed review — it can even earn hearts back.</p>
        </div>
        <button class="btn btn-primary cc-go" id="cc-go" type="button">Practice</button>
      </section>`,
      wire: el => el.querySelector('#cc-go').addEventListener('click', () => startLesson(practiceLesson(track))),
    };
  }
  const started = store.hasEarnedAnything || done > 0;
  return {
    html: `
    <section class="continue-card" aria-label="Continue learning">
      <div class="cc-info">
        <span class="cc-stage">${course.icon} ${esc(course.label)} · ${esc(next.unit.title)}</span>
        <h2>${esc(next.title)}</h2>
        <p class="cc-meta">${esc(lessonKindName(next))} · ~${estMinutes(next)} min · ${done}/${total} lessons done</p>
      </div>
      <button class="btn btn-primary cc-go" id="cc-go" type="button">${started ? 'Continue' : 'Start here'}</button>
    </section>`,
    wire: el => el.querySelector('#cc-go').addEventListener('click', () =>
      next.checkpoint ? startLesson(next) : renderGuide(next)),
  };
}

// ── Standard British: one-time introduction ───────────────────
// Shown automatically on the FIRST visit to the course's Learn view, then
// never again; permanently revisitable from Library → About Standard
// British (which never touches first-run state or progress).

function ssbeIntroBody() {
  return `
    <p class="guide-text">Standard British is a modern pronunciation target for present-day British roles and conversation. It keeps core British features while including common present-day patterns — and because real speakers vary by age, region and situation, the course labels each feature honestly:</p>
    <div class="guide-word"><span class="wii-who">Core target</span><span class="guide-note">non-rhotic, broad BATH /ɑː/, rounded LOT /ɒ/, steady SQUARE /ɛː/, fronted GOOSE, happY /i/</span></div>
    <div class="guide-word"><span class="wii-who">Common contemporary</span><span class="guide-note">glottal stop for non-initial /t/ (better /beʔə/), fused yods (tune /tʃuːn/)</span></div>
    <div class="guide-word"><span class="wii-who">Variable / relaxed</span><span class="guide-note">NEAR smoothing, heavier glottalling in casual speech — options, not rules</span></div>
    <p class="guide-text">Where Traditional RP glides, holds its /t/ and keeps its yods, this course targets the modern forms — and trains your ear to tell the two apart.</p>`;
}

function showSsbeIntro(course) {
  if (document.querySelector('.intro-overlay')) return;
  const chain = TRACK_LESSONS[course.id];
  const ov = document.createElement('div');
  ov.className = 'intro-overlay';
  ov.innerHTML = `
    <div class="intro-card" role="dialog" aria-modal="true" aria-label="Meet Standard British" tabindex="-1">
      <button class="quit intro-close" aria-label="Close introduction" type="button">✕</button>
      <h1>Meet Standard British</h1>
      ${ssbeIntroBody()}
      <div class="ob-actions ob-actions-col">
        <button class="btn btn-primary" id="intro-begin" type="button">Begin Standard British</button>
        <button class="btn-lite" id="intro-skip" type="button">Not now — just look around</button>
      </div>
      <p class="pane-note">You can reread this any time: Library → About Standard British.</p>
    </div>`;
  document.body.appendChild(ov);
  const done = () => { store.markIntroSeen(course.id); ov.remove(); };
  ov.querySelector('.intro-close').addEventListener('click', done);
  ov.querySelector('#intro-skip').addEventListener('click', done);
  ov.querySelector('#intro-begin').addEventListener('click', () => {
    done();
    const first = chain.find(l => !store.isCompleted(l.id)) ?? chain[0];
    first.checkpoint ? startLesson(first) : renderGuide(first);
  });
  ov.addEventListener('keydown', e => { if (e.key === 'Escape') done(); });
  ov.querySelector('.intro-card').focus();
}

function renderAboutSsbe() {
  record(renderAboutSsbe);
  app.innerHTML = `
    ${pageTopbar('🇬🇧 About Standard British', '#7d6b9e')}
    <main class="guide">
      <h1>Standard British</h1>
      ${ssbeIntroBody()}
      <div class="guide-start"><button class="btn btn-primary" id="about-go" type="button">Go to the course</button></div>
    </main>`;
  wireBrandHome();
  document.getElementById('about-go').addEventListener('click', () => { setCourse('ssbe'); goSection('learn'); });
}

function learnMain(el, course) {
  const track = trackFor(course.id);
  const { done, total } = trackProgress(track);
  const cc = continueCard(track, course);
  const path = buildTrackPath(track, { guidebook: true, labels: true });
  el.innerHTML = `
    <h1 class="sr-only">Learn — ${esc(course.label)}</h1>
    ${cc.html}
    ${course.id === 'core' ? whatIsIpaCard() : ''}
    <div class="hub-progress">
      <div class="track-progress">
        <div class="track-progress-bar"><div style="width:${total ? Math.round(done / total * 100) : 0}%"></div></div>
        <span>${done}/${total}${done === total && total ? ' · 🎓 mastered' : ''}</span>
      </div>
    </div>
    <div class="track-scroll hub-scroll">${path.html}</div>`;
  cc.wire(el);
  wireWhatIsIpaCard(el);
  path.wire(el);
  if (course.id === 'ssbe' && !store.introsSeen.ssbe) showSsbeIntro(course);
}

// Per-unit guidebook: what the unit teaches, in one readable page.
function renderGuidebook(unit, track) {
  record(() => renderGuidebook(unit, track));
  const sections = unit.lessons.map(l => {
    const gbAcc = TRACK_ACCENT[track?.id] ?? null;
    const chips = (l.phonemes ?? []).map(ph => {
      if (!PHONEMES[ph]) return '';
      const w = PHONEMES[ph].examples.find(x => speakableWord(x, gbAcc));
      return w ? `
      <button class="word-chip" data-sym="${esc(ph)}" data-say="${esc(w)}"
              aria-label="Hear ${esc(ph)} in the word “${esc(w)}”"
              title="${esc(PHONEMES[ph].name)} — hear it in “${esc(w)}”">/${esc(ph)}/</button>` : `
      <span class="word-chip is-off" aria-label="${esc(PHONEMES[ph].name)} — recordings coming soon">/${esc(ph)}/</span>`;
    }).join('');
    return `
      <section class="gb-lesson">
        <h2>${esc(l.title)}</h2>
        ${l.guide ? `<p class="guide-text">${esc(l.guide)}</p>` : ''}
        ${chips ? `<div class="chips">${chips}</div>` : ''}
      </section>`;
  }).join('');
  app.innerHTML = `
    ${pageTopbar(`📘 ${esc(unit.title)}`, unit.color)}
    <main class="guide">
      <p class="pane-note">The guidebook for <b>${esc(unit.title)}</b> — every sound and idea this unit teaches. Tap a symbol to hear it; open its diagram from the IPA chart any time.</p>
      ${sections}
    </main>`;
  wireBrandHome();
  // Speak in the course's own voices — a NAM guidebook must never sound RP.
  const lang = ACCENT_LANG[TRACK_ACCENT[track?.id]] ?? 'en-GB';
  app.querySelectorAll('.word-chip[data-sym]').forEach(b => {
    b.addEventListener('click', () => speak(b.dataset.say, { lang, accent: TRACK_ACCENT[track?.id] ?? null }));
  });
}

// ── Practice hub ──────────────────────────────────────────────

// The games, grouped by the skill they train instead of one flat grid.
const PRACTICE_GROUPS = [
  { title: 'Listening', ids: ['listen', 'pairs'] },
  { title: 'Reading IPA', ids: ['match', 'decode', 'find', 'name', 'readsent'] },
  { title: 'Transcription', ids: ['spell', 'gaps', 'build', 'missing', 'writesent'] },
  { title: 'Accent & Vocabulary', ids: ['shift', 'earacc'] },
];
const AUDIO_MODES = new Set(['listen', 'pairs', 'earacc']);

function practiceMain(el, course) {
  const d = course.id === 'core' ? null : course.id;
  const track = trackFor(course.id);
  const name = d ? dialectName(d) : 'Core IPA';

  // Quick Practice: weak-sound rehearsal when the data exists, honest mixed
  // review when it doesn't.
  const picks = hasEnoughData() ? dailyRehearsal(4) : [];
  const targeted = picks.length > 0;
  const quickWhy = targeted
    ? `Aimed at what keeps slipping: ${picks.slice(0, 3).map(p => esc(p.title)).join(', ')}.`
    : `Not enough answer data to target yet — a mixed review of everything ${esc(name)} has taught you so far.`;

  const modeCard = m => `
    <button class="mode-card" data-mode="${m.id}" type="button">
      <span class="mode-icon" aria-hidden="true">${m.icon}</span>
      <span class="mode-title">${esc(m.title)}</span>
      <span class="mode-blurb">${esc(m.blurb)}</span>
      <span class="mode-meta">~4 min${AUDIO_MODES.has(m.id) ? ' · 🎧 audio' : ''}</span>
    </button>`;

  el.innerHTML = `
    <h1 class="page-h">Practice</h1>
    <h2 class="chart-h">Recommended for you</h2>
    <section class="continue-card quick-card" aria-label="Quick practice">
      <div class="cc-info">
        <span class="cc-stage">🎯 ${targeted ? 'Quick Practice' : 'Quick Practice · Mixed review'} · never costs hearts · earns ❤️ back</span>
        <h2>${targeted ? 'Rehearse your weak sounds' : 'Mixed review'}</h2>
        <p class="cc-meta">${quickWhy} ~4 min.</p>
      </div>
      <button class="btn btn-primary cc-go" id="quick-practice" type="button">Start</button>
    </section>
    ${targeted ? `
    <div class="practice-row">
      <button class="btn-lite" id="hub-mixed" type="button">Prefer the full spread? Full-course mixed review — everything ${esc(name)} has taught, not just weak sounds ›</button>
    </div>` : ''}
    ${dailyRehearsalCard()}
    <p class="pane-note">Practice never costs hearts — mixed review and rehearsal even earn one back. Real lessons on the Learn path are where hearts are at stake.</p>
    ${PRACTICE_GROUPS.map(g => `
      <h2 class="chart-h">${esc(g.title)} <span>in ${esc(name)}</span></h2>
      <div class="mode-grid">
        ${g.title === 'Accent & Vocabulary' && d ? `
          <button class="mode-card idiom-mode" id="hub-idiom-drill" type="button">
            <span class="mode-icon" aria-hidden="true">🗣</span>
            <span class="mode-title">Words &amp; Expressions</span>
            <span class="mode-blurb">The words, not just the sounds.</span>
            <span class="mode-meta">~4 min</span>
          </button>` : ''}
        ${g.ids.map(id => modeCard(MODES.find(m => m.id === id))).join('')}
      </div>`).join('')}`;

  el.querySelector('#quick-practice').addEventListener('click', () =>
    targeted ? startDailyRehearsal() : startLesson(practiceLesson(track)));
  el.querySelector('#hub-mixed')?.addEventListener('click', () => startLesson(practiceLesson(track)));
  el.querySelector('#today-start')?.addEventListener('click', startDailyRehearsal);
  el.querySelector('#hub-idiom-drill')?.addEventListener('click', () => startLesson(idiomLesson(d, track)));
  el.querySelectorAll('.mode-card[data-mode]').forEach(b =>
    b.addEventListener('click', () => startLesson(modeLesson(MODES.find(m => m.id === b.dataset.mode), d))));
}

// ── Library: the reference shelf for the active course ───────
// IPA (the course's sound inventory), Native Idioms (dialects only, wearing
// the dialect's flag), Texts & Speeches, anatomy, then the personal
// dictionary — every reference in one place.

function libraryMain(el, course) {
  const d = course.id === 'core' ? null : course.id;
  const track = trackFor(course.id);
  const cards = [
    d === 'ssbe' ? { icon: '🇬🇧', title: 'About Standard British',
      blurb: 'Revisit the course introduction, its core sound patterns and how it differs from Traditional RP.',
      go: renderAboutSsbe } : null,
    { icon: '📖', title: 'IPA',
      blurb: d ? `${dialectName(d)}’s sounds and tongue placement.` : 'All 55 sounds and how they’re made.',
      go: () => (d ? renderInventory(d) : renderChart()) },
    d ? { icon: course.icon, title: 'Words & Expressions',
      blurb: 'The words, slang and expressions that bring the dialect to life.',
      go: () => renderIdioms(d) } : null,
    { icon: '📜', title: 'Texts & Speeches',
      blurb: 'Sonnets, monologues, and your own pieces.',
      go: renderTextsPage },
    { icon: '🎭', title: 'Your Instrument',
      blurb: 'A tour of the vocal tract.',
      go: renderInstrument },
    { icon: '📐', title: 'The Vowel Map',
      blurb: 'Where every vowel sits in the mouth.',
      go: renderVowelMap },
    { icon: '📕', title: 'Personal Dictionary',
      blurb: 'Pronunciations you’ve corrected.',
      go: renderDictionary },
  ].filter(Boolean);
  el.innerHTML = `<h1 class="page-h">Library</h1>` + cards.map((c, i) => `
    <button class="track-card" data-i="${i}" type="button" style="--track-color:${track.color}">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  el.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
}

// Texts & Speeches as a full page (it left the sidebar for the Library).
function renderTextsPage() {
  record(renderTextsPage);
  app.innerHTML = `
    ${pageTopbar('📜 Texts & Speeches', '#8a6d3b')}
    <main class="track-list" id="texts-page"></main>`;
  wireBrandHome();
  textSpeechPane(document.getElementById('texts-page'));
}

// Full-page wrappers for the dialect panes, so collections open like any
// other page with a back button.
function renderInventory(d) {
  record(() => renderInventory(d));
  app.innerHTML = `
    ${pageTopbar('📖 IPA', trackFor(d).color)}
    <main class="track-list">
      ${whatIsIpaCard()}
      <div id="inv-pane"></div>
    </main>`;
  wireBrandHome();
  wireWhatIsIpaCard(app);
  hubHandbook(document.getElementById('inv-pane'), d, trackFor(d));
}

function renderIdioms(d) {
  record(() => renderIdioms(d));
  // Fresh filters every visit — landing on a pre-filtered list reads as
  // missing content. Standard British defaults to Contemporary: its period
  // material is reference, not the point.
  Object.assign(idiomFilters, { q: '', era: d === 'ssbe' ? 'contemporary' : 'all', type: 'all', flagged: false });
  app.innerHTML = `
    ${pageTopbar('🗣 Words & Expressions', trackFor(d).color)}
    <main class="track-list" id="idiom-page"></main>`;
  wireBrandHome();
  hubIdiom(document.getElementById('idiom-page'), d, trackFor(d));
}

// ── Progress: quests, streaks, weak sounds, achievements ─────

function achievementRows() {
  const t = totals();
  return [
    { icon: '🔥', name: 'Wildfire', what: 'day streak', tiers: [3, 7, 30], value: store.streak },
    { icon: '🧙', name: 'Sage', what: 'XP earned', tiers: [100, 500, 2000], value: store.xp },
    { icon: '🎓', name: 'Scholar', what: 'lessons completed', tiers: [10, 30, 77], value: store.completed.size },
    { icon: '🗣', name: 'Wordsmith', what: 'days practised', tiers: [3, 10, 30], value: t.daysPractised },
  ].map(a => {
    const level = a.tiers.filter(x => a.value >= x).length;
    const next = a.tiers[level] ?? a.tiers[a.tiers.length - 1];
    return { ...a, level, next, pct: Math.min(100, Math.round(a.value / next * 100)) };
  });
}

function progressMain(el) {
  // Before anything is earned there is nothing to chart — say so on purpose
  // instead of showing a dashboard of zeroes.
  if (!store.hasEarnedAnything) {
    el.innerHTML = `
      <section class="quest-banner">
        <div><h1>Complete your first lesson to activate Progress</h1>
        <p>One lesson is all it takes — then this page starts keeping score.</p></div>
        <span class="quest-banner-emoji">📈</span>
      </section>
      <h2 class="chart-h">What will appear here</h2>
      ${[
        ['🔥', 'Streak', 'consecutive days of practice'],
        ['⚡', 'XP and gems', 'earned by lessons, games and quests'],
        ['🏆', 'Daily quests', 'three small targets that reset at midnight'],
        ['📊', 'Weak sounds', 'the symbols that keep slipping, ranked from your real answers'],
        ['🎓', 'Achievements', 'long-run milestones'],
      ].map(([icon, t, blurb]) => `
        <div class="ach-row">
          <span class="ach-icon is-locked" aria-hidden="true">${icon}</span>
          <div class="ach-info"><span class="ach-name">${t} <span class="tag">Inactive</span></span>
            <p class="pane-note">${blurb}</p></div>
        </div>`).join('')}
      <button class="btn btn-primary" id="prog-go-learn" type="button">Go to your first lesson</button>`;
    el.querySelector('#prog-go-learn').addEventListener('click', () => goSection('learn'));
    return;
  }
  const rows = questRows();
  const doneCount = rows.filter(r => r.complete).length;
  const t = totals();
  const weak = symbolBreakdown().all
    .filter(r => r.tier !== CONFIDENCE.NONE)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
  el.innerHTML = `
    <section class="quest-banner">
      <div><h1>Your progress</h1>
      <p>${doneCount} of ${rows.length} daily quests done — they reset at midnight.</p></div>
      <span class="quest-banner-emoji">📈</span>
    </section>
    <h2 class="chart-h">Statistics</h2>
    <div class="summary-row">
      <div class="summary-card"><span class="summary-n">🔥 ${store.displayStreak}</span><span class="summary-l">day streak</span></div>
      <div class="summary-card"><span class="summary-n">⚡ ${store.xp}</span><span class="summary-l">total XP</span></div>
      <div class="summary-card"><span class="summary-n">💎 ${store.gems}</span><span class="summary-l">gems</span></div>
    </div>
    <div class="summary-row">
      <div class="summary-card"><span class="summary-n">${store.completed.size}</span><span class="summary-l">lessons done</span></div>
      <div class="summary-card"><span class="summary-n">${t.daysPractised}</span><span class="summary-l">days practised</span></div>
      <div class="summary-card"><span class="summary-n">${t.attempts}</span><span class="summary-l">answers given</span></div>
    </div>
    <h2 class="chart-h">Daily Quests</h2>
    ${rows.map(r => `
      <div class="quest-row">
        <span class="quest-icon">${r.icon}</span>
        <div class="quest-info">
          <span class="quest-title">${esc(r.title)}</span>
          <div class="quest-bar"><div style="width:${Math.round(r.done / r.target * 100)}%"></div>
            <span class="quest-count">${r.done}/${r.target}</span></div>
        </div>
        ${r.claimed ? '<span class="quest-done" title="Claimed">✓</span>'
          : r.complete ? `<button class="btn btn-primary quest-claim" data-q="${r.id}" type="button" aria-label="Claim ${r.reward} gems">🎁 +${r.reward}💎</button>`
          : `<span class="quest-reward">💎 ${r.reward}</span>`}
      </div>`).join('')}
    <p class="pane-note">Gems buy heart refills, streak freezes and XP boosts in the Shop.</p>
    <h2 class="chart-h">Weak Sounds</h2>
    ${weak.length ? weak.map(r => `
      <div class="stat-row">
        <span class="stat-sym">/${esc(r.sym)}/</span>
        <span class="stat-bar" aria-hidden="true"><span style="width:${Math.round(r.accuracy * 100)}%"></span></span>
        <span class="stat-val">${esc(r.label)}</span>
      </div>`).join('')
      : '<p class="pane-note">Not enough data yet — answer some real exercises and this fills in.</p>'}
    <button class="btn-lite" id="prog-weak-full" type="button">Full weak-sounds report ›</button>
    <h2 class="chart-h">Achievements</h2>
    ${achievementRows().map(a => `
      <div class="ach-row">
        <span class="ach-icon ${a.level ? '' : 'is-locked'}">${a.icon}</span>
        <div class="ach-info">
          <span class="ach-name">${a.name} <span class="tag">${a.level ? `Level ${a.level}` : 'Locked'}</span></span>
          <div class="quest-bar"><div style="width:${a.pct}%"></div>
            <span class="quest-count">${a.value}/${a.next} ${a.what}</span></div>
        </div>
      </div>`).join('')}`;
  el.querySelectorAll('.quest-claim').forEach(b =>
    b.addEventListener('click', () => {
      claimQuest(b.dataset.q);
      renderShell('progress');
    }));
  el.querySelector('#prog-weak-full').addEventListener('click', renderWeakSounds);
}

// ── Shop ──────────────────────────────────────────────────────

function shopMain(el) {
  const hearts = store.hearts;
  const freezes = store.freezes;
  const boostActive = store.boostActive;
  const boostMins = boostActive ? Math.ceil((store.boostUntil - Date.now()) / 60000) : 0;
  const item = (icon, title, blurb, action) => `
    <div class="shop-item">
      <span class="shop-icon">${icon}</span>
      <div class="shop-info"><h2>${title}</h2><p>${blurb}</p></div>
      ${action}
    </div>`;
  el.innerHTML = `
    <section class="quest-banner shop-banner">
      <div><h1>Shop</h1><p>Everything costs gems earned by practising. Nothing here ever costs real money.</p></div>
      <span class="quest-banner-emoji">💎 ${store.gems}</span>
    </section>
    <h2 class="chart-h">Hearts</h2>
    ${item('❤️', 'Refill Hearts', `Back to ${HEART_MAX} hearts instantly. One regenerates every 4 hours on its own, and mixed review earns one back.`,
      hearts >= HEART_MAX ? '<span class="shop-price is-off">FULL</span>'
        : `<button class="btn btn-lite shop-buy" data-item="refill" type="button">💎 350</button>`)}
    <h2 class="chart-h">Power-ups</h2>
    ${item('🧊', 'Streak Freeze', `Protects your streak for one missed day. Equipped: ${freezes}/2.`,
      freezes >= 2 ? '<span class="shop-price is-off">MAX</span>'
        : `<button class="btn btn-lite shop-buy" data-item="freeze" type="button">💎 200</button>`)}
    ${item('⚡', 'Double XP', boostActive ? `Active — ${boostMins} min left.` : 'Every lesson pays double XP for 15 minutes.',
      boostActive ? '<span class="shop-price is-off">ACTIVE</span>'
        : `<button class="btn btn-lite shop-buy" data-item="boost" type="button">💎 150</button>`)}`;
  el.querySelectorAll('.shop-buy').forEach(b =>
    b.addEventListener('click', () => {
      const prices = { refill: 350, freeze: 200, boost: 150 };
      const it = b.dataset.item;
      if (!store.spendGems(prices[it])) { alert(`Not enough gems — that costs ${prices[it]} 💎. Quests and lessons earn more.`); return; }
      if (it === 'refill') store.refillHearts();
      else if (it === 'freeze') store.addFreeze();
      else store.startBoost(15);
      renderShell('shop');
    }));
}

// ── Profile ───────────────────────────────────────────────────

const AVATARS = ['🎭', '🎤', '🎩', '🌟', '🦘', '🦅', '🌹', '🎬', '📜', '🔥'];

function profileMain(el) {
  const p = store.profile;
  el.innerHTML = `
    <section class="profile-head">
      <span class="profile-avatar" id="profile-avatar">${esc(p.avatar)}</span>
      <div class="profile-id">
        <input class="input-text profile-name" id="profile-name" value="${esc(p.name)}" maxlength="40" aria-label="Your name">
        <p class="pane-note">Joined ${new Date(p.firstSeen).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} · everything here stays on this device</p>
      </div>
    </section>
    <div class="chip-row avatar-row" id="avatar-row">
      ${AVATARS.map(a => `<button class="chip-pick ${a === p.avatar ? 'on' : ''}" data-av="${a}" type="button" aria-label="Avatar ${a}">${a}</button>`).join('')}
    </div>
    <p class="pane-note">Statistics and achievements live in <b>Progress</b>.</p>
    <button class="btn-lite" id="profile-progress" type="button">Open Progress ›</button>`;
  el.querySelector('#profile-progress').addEventListener('click', () => goSection('progress'));

  el.querySelector('#profile-name').addEventListener('change', e =>
    store.saveProfile({ name: e.target.value.trim() || 'Actor' }));
  el.querySelectorAll('[data-av]').forEach(b =>
    b.addEventListener('click', () => { store.saveProfile({ avatar: b.dataset.av }); renderShell('profile'); }));
}

// ── "What Is IPA?": a 3-minute interactive introduction ───────
// A standalone stepped module on the guide chrome. Never required — it is
// reachable from Library → IPA, the Foundations path, and core lesson
// guides. Completion is a badge in the store; deliberately no XP or gems.

const WII_QUESTIONS = 5;   // ship-symbol + same-sound pair + 3 classifications

function whatIsIpaCard() {
  const w = store.whatIsIpa;
  return `
    <button class="track-card wii-card" data-open-wii type="button" style="--track-color:#64748b">
      <div class="track-glyph" aria-hidden="true">💡</div>
      <div class="track-info">
        <h2>What Is IPA? ${w.done ? '<span class="tag tag-skill">✓ completed</span>' : ''}</h2>
        <p>Meet the alphabet of sounds — what it represents, why actors and language learners use it, and how to turn symbols into speech.</p>
        <p class="mode-meta">3-minute introduction · interactive${w.done ? ` · ${w.correct}/${WII_QUESTIONS} answered right` : ''}</p>
      </div>
      <div class="track-arrow">›</div>
    </button>`;
}

function wireWhatIsIpaCard(container) {
  container.querySelectorAll('[data-open-wii]').forEach(b =>
    b.addEventListener('click', openWhatIsIpa));
}

function openWhatIsIpa() {
  record(openWhatIsIpa);
  drawWhatIsIpa(0, { answered: {}, revealed: false });
}

// A word row with its transcription and a listen button.
const wiiWordRow = (word, ipa, note = '') => `
  <div class="guide-word">
    ${wordChip(word, 'nam')}
    <span class="guide-ipa">${esc(ipa)}</span>
    ${note ? `<span class="guide-note">${esc(note)}</span>` : ''}
  </div>`;

// A tappable sound chip: symbol + example word. Plays the WORD (labelled as
// such); flips to the isolated phoneme automatically once one is approved.
const wiiSoundChip = ph => {
  const p = PHONEMES[ph];
  const slug = phonemeSlug(ph);
  if (hasPhonemeClip(slug, 'nam')) {
    return `<span class="wii-sound-pair">
      <button class="word-chip" data-phoneme="${esc(slug)}" type="button"
        aria-label="Hear the isolated sound ${esc(ph)}">🔊 /${esc(ph)}/</button>
      <button class="word-chip" data-say="${esc(p.examples[0])}" type="button"
        aria-label="Hear the word “${esc(p.examples[0])}”">${esc(p.examples[0])}</button>
    </span>`;
  }
  return `<button class="word-chip" data-say="${esc(p.examples[0])}" type="button"
    aria-label="Hear the word “${esc(p.examples[0])}”, which contains ${esc(ph)}">/${esc(ph)}/ in “${esc(p.examples[0])}”</button>`;
};

// One-tap mini question. `key` tracks the answer in the module state so a
// question stays answered (and scored once) across Back/Continue.
function wiiQuestion(st, key, prompt, options) {
  const answered = st.answered[key];
  return `
    <div class="mini-check" data-q="${key}">
      <p class="mini-prompt">${prompt}</p>
      <div class="mini-opts" role="group" aria-label="${esc(prompt.replace(/<[^>]+>/g, ''))}">
        ${options.map(o => `
          <button class="btn mini-opt ${answered !== undefined && o.ok ? 'right' : ''}" type="button"
            data-ok="${o.ok ? 1 : 0}" ${answered !== undefined ? 'disabled' : ''}>${o.label}</button>`).join('')}
      </div>
      <p class="mini-result" role="status">${answered === true ? '✓ Correct.' : answered === false ? 'Not quite — the marked answer is right.' : ''}</p>
    </div>`;
}

function wireWiiQuestions(container, st, redraw) {
  container.querySelectorAll('.mini-check').forEach(box => {
    const key = box.dataset.q;
    box.querySelectorAll('.mini-opt').forEach(btn =>
      btn.addEventListener('click', () => {
        if (st.answered[key] !== undefined) return;
        const ok = btn.dataset.ok === '1';
        st.answered[key] = ok;
        btn.classList.add(ok ? 'right' : 'wrong');
        box.querySelectorAll('.mini-opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.ok === '1') b.classList.add('right');
        });
        box.querySelector('.mini-result').textContent =
          ok ? '✓ Correct.' : 'Not quite — the marked answer is right.';
      }));
  });
}

function wiiStepHtml(step, st) {
  switch (step) {
    case 0: return `
      <h1>What is IPA?</h1>
      <p class="guide-text">The International Phonetic Alphabet, or IPA, is a system for writing sounds. Unlike ordinary spelling, each symbol tells you what sound to make — not how a word happens to be spelled.</p>
      ${wiiWordRow('cat', '/kæt/', 'three letters, three sounds')}
      ${wiiWordRow('enough', '/ɪˈnʌf/', 'six letters, four sounds')}
      ${wiiWordRow('though', '/ðoʊ/', 'six letters, two sounds')}
      <p class="pane-note">These transcriptions are accent-aware — this is the Neutral American reading, and other accents can differ.</p>`;
    case 1: return `
      <h1>Why is it useful?</h1>
      <div class="guide-word"><span class="wii-who">🎭 Actors</span><span class="guide-note">learn an accent without depending on imitation alone</span></div>
      <div class="guide-word"><span class="wii-who">🌍 Language learners</span><span class="guide-note">see how a word is actually pronounced</span></div>
      <div class="guide-word"><span class="wii-who">🎵 Singers</span><span class="guide-note">identify vowels and consonants precisely</span></div>
      <div class="guide-word"><span class="wii-who">🎓 Teachers & coaches</span><span class="guide-note">communicate pronunciation consistently</span></div>
      <div class="guide-word"><span class="wii-who">🔬 Linguists</span><span class="guide-note">record and compare human speech</span></div>
      <p class="wii-callout">IPA gives you a map. Audio lets you hear the destination; IPA shows you how to find it again.</p>`;
    case 2: return `
      <h1>One symbol, one sound</h1>
      <p class="guide-text">Every symbol always means the same sound. Tap to hear each one inside a word${
        hasPhonemeClip(phonemeSlug('ʃ'), 'nam') ? ' — or tap the symbol to hear the bare sound by itself' : ''}:</p>
      <div class="chips">${['iː', 'æ', 'ɑ', 'ʃ', 'θ', 'ð', 'ŋ'].map(wiiSoundChip).join('')}</div>
      ${hasPhonemeClip(phonemeSlug('ʃ'), 'nam') ? ''
        : '<p class="pane-note">Isolated recordings of each bare sound are on the way — until then, every button plays the sound inside its word.</p>'}
      ${wiiQuestion(st, 'ship', 'Which symbol represents the <b>first sound</b> in “ship”?', [
        { label: '/s/', ok: false }, { label: '/ʃ/', ok: true }, { label: '/ɪ/', ok: false }, { label: '/θ/', ok: false },
      ])}`;
    case 3: return `
      <h1>IPA versus spelling</h1>
      <p class="guide-text">Spelling is a poor guide to sound:</p>
      <div class="guide-word"><span class="wii-who">c</span><span class="guide-note">“cat” /k/ and “city” /s/ — one letter, two sounds</span></div>
      <div class="guide-word"><span class="wii-who">ough</span><span class="guide-note">“though”, “thought”, “enough” — one spelling, three sounds</span></div>
      <div class="guide-word"><span class="wii-who">/iː/</span><span class="guide-note">“see”, “sea”, “scene” — one sound, three spellings</span></div>
      <p class="wii-callout">IPA describes pronunciation directly, without asking spelling for permission.</p>
      ${wiiQuestion(st, 'pair', 'Tap the pair that <b>starts with the same sound</b>:', [
        { label: 'cat · city', ok: false }, { label: 'city · sea', ok: true }, { label: 'cat · ship', ok: false },
      ])}`;
    case 4: return `
      <h1>How to read a transcription</h1>
      <div class="guide-word"><span class="wii-who">/ /</span><span class="guide-note">slashes surround a broad pronunciation</span></div>
      <div class="guide-word"><span class="wii-who">ˈ</span><span class="guide-note">marks the syllable with primary stress — /ɪˈnʌf/</span></div>
      <div class="guide-word"><span class="wii-who">symbols</span><span class="guide-note">represent sounds, never letters</span></div>
      <div class="guide-word"><span class="wii-who">accents</span><span class="guide-note">the same word can transcribe differently</span></div>
      <p class="guide-text">The same word, two accents — listen to both:</p>
      <div class="guide-word">
        ${speakableWord('bar', 'nam')
          ? `<button class="word-chip" data-say="bar" data-lang="en-US" data-acc="nam" type="button">🔊 bar 🇺🇸</button>`
          : `<span class="word-chip is-off">bar 🇺🇸 <small>· recording soon</small></span>`}
        <span class="guide-ipa">/bɑr/</span><span class="guide-note">Neutral American — the r is spoken</span>
      </div>
      <div class="guide-word">
        <button class="word-chip" data-say="bar" data-lang="en-GB" data-acc="rp" type="button">🔊 bar 🎩</button>
        <span class="guide-ipa">/bɑː/</span><span class="guide-note">Traditional RP — the r becomes vowel length</span>
      </div>
      <details class="idiom-extra"><summary>Advanced detail — narrow transcription</summary>
        <p class="pane-note">Square brackets [ ] mark a <i>narrow</i> transcription: exactly what a speaker did, with diacritics for fine detail — [kʰɑːˑ] notes aspiration and length. Speechcraft teaches broad transcription; narrow can wait.</p>
      </details>`;
    case 5: return `
      <h1>How sounds are organized</h1>
      <div class="guide-word"><span class="wii-who">Vowels</span><span class="guide-note">airflow stays open; tongue and lip position shape the sound</span></div>
      <div class="guide-word"><span class="wii-who">Consonants</span><span class="guide-note">airflow is narrowed or stopped somewhere in the mouth</span></div>
      <div class="guide-word"><span class="wii-who">Diphthongs</span><span class="guide-note">the mouth glides from one vowel position toward another</span></div>
      <p class="guide-text">Sort these three — tap a category for each sound:</p>
      ${[['æ', 'trap', 'Vowel'], ['ʃ', 'ship', 'Consonant'], ['aɪ', 'price', 'Diphthong']].map(([ph, w, right]) => `
        <div class="mini-check wii-classify" data-q="cls-${ph}">
          <p class="mini-prompt"><button class="word-chip" data-say="${esc(PHONEMES[ph].examples[0])}" type="button">🔊 /${esc(ph)}/ ${esc(w)}</button></p>
          <div class="mini-opts" role="group" aria-label="Classify /${esc(ph)}/">
            ${['Vowel', 'Consonant', 'Diphthong'].map(c => `
              <button class="btn mini-opt ${st.answered['cls-' + ph] !== undefined && c === right ? 'right' : ''}" type="button"
                data-ok="${c === right ? 1 : 0}" ${st.answered['cls-' + ph] !== undefined ? 'disabled' : ''}>${c}</button>`).join('')}
          </div>
          <p class="mini-result" role="status">${st.answered['cls-' + ph] === true ? '✓ Correct.' : st.answered['cls-' + ph] === false ? 'Not quite — the marked answer is right.' : ''}</p>
        </div>`).join('')}
      <p class="pane-note">The full landscape lives in the Library: the IPA Chart, the Vowel Map, and Your Instrument (the vocal tract) — every sound with tongue placement and audio.</p>`;
    case 6: return `
      <h1>How to use IPA</h1>
      <ol class="wii-steps-list">
        <li>Find the word’s transcription.</li>
        <li>Identify each sound.</li>
        <li>Listen to the symbols and example words.</li>
        <li>Examine tongue and lip placement.</li>
        <li>Say the sounds separately.</li>
        <li>Blend them into the word.</li>
        <li>Record yourself (Library → Texts &amp; Speeches → My Texts has a real recorder).</li>
        <li>Compare, adjust, repeat.</li>
      </ol>
      <p class="guide-text">Try it on one word:</p>
      <div class="wii-demo">
        <div class="wii-demo-word">ship
          <button class="word-chip" data-say="ship" type="button" aria-label="Hear the word ship">🔊 hear it</button>
        </div>
        ${st.revealed ? `
          <div class="chips" id="wii-demo-syms">
            ${[['ʃ', 'ship'], ['ɪ', 'kit'], ['p', 'pen']].map(([ph, w]) => {
              const slug = phonemeSlug(ph);
              return hasPhonemeClip(slug, 'nam')
                ? `<button class="word-chip" data-phoneme="${esc(slug)}" type="button"
                     aria-label="Hear the isolated sound ${esc(ph)}">🔊 /${esc(ph)}/</button>`
                : `<button class="word-chip" data-say="${esc(w)}" type="button"
                     aria-label="Hear the word “${esc(w)}”, home of ${esc(ph)}">/${esc(ph)}/ in “${esc(w)}”</button>`;
            }).join('')}
          </div>
          <p class="pane-note">${hasPhonemeClip(phonemeSlug('ʃ'), 'nam')
            ? 'Tap a symbol to hear the sound by itself; tap 🔊 above to hear the whole word.'
            : 'Each symbol button plays its home word for now — isolated recordings are coming.'}</p>
          <button class="btn-lite" data-sound-detail="ʃ" type="button">📐 See /ʃ/ tongue placement ›</button>`
        : '<button class="btn" id="wii-reveal" type="button">Reveal the transcription</button>'}
      </div>`;
  }
  // completion
  const correct = Object.values(st.answered).filter(Boolean).length;
  const course = COURSES.find(c => c.id === activeCourse());
  return `
    <h1>That’s the whole idea</h1>
    <p class="guide-text">You do not need to memorize the entire IPA chart. Start by learning the symbols used in your course, one sound at a time.</p>
    <div class="end-summary">
      <div class="end-block"><span class="end-block-l">Questions</span><span class="end-block-v">${correct}/${WII_QUESTIONS} correct</span></div>
      <div class="end-block"><span class="end-block-l">Covered</span><span class="end-block-v">symbols · stress · accents · vowel/consonant/diphthong · the workflow</span></div>
      <div class="end-block"><span class="end-block-l">Next</span><span class="end-block-v">${correct >= 4 ? 'jump into a course' : 'the IPA Chart is a good slow tour'}</span></div>
    </div>
    <div class="ob-actions ob-actions-col">
      <button class="btn btn-primary" id="wii-foundations" type="button">Start IPA Foundations</button>
      <button class="btn" id="wii-chart" type="button">Explore the IPA Chart</button>
      ${course.id !== 'core' ? `<button class="btn" id="wii-course" type="button">Continue ${esc(course.label)}</button>` : ''}
    </div>`;
}

function drawWhatIsIpa(step, st) {
  stopSpeech();
  const total = 7;
  const isEnd = step >= total;
  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit" aria-label="Exit What Is IPA">✕</button>
      <div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="${total}"
           aria-valuenow="${Math.min(step + 1, total)}" aria-label="What Is IPA — step ${Math.min(step + 1, total)} of ${total}">
        <div class="progress-fill" style="width:${Math.round(Math.min(step + 1, total) / total * 100)}%"></div></div>
      <span class="step-count">${isEnd ? '✓' : `${step + 1} of ${total}`}</span>
    </header>
    <main class="guide guide-stepped">
      <div class="guide-title-bar" style="--unit-color:#64748b">💡 What Is IPA?</div>
      <section class="guide-step">${wiiStepHtml(step, st)}</section>
      ${isEnd ? '' : `
      <div class="guide-nav">
        ${step > 0 ? '<button class="btn" id="g-back" type="button">‹ Back</button>' : '<span></span>'}
        <button class="btn btn-primary" id="g-next" type="button">${step === total - 1 ? 'Finish' : 'Continue'}</button>
      </div>`}
    </main>`;

  document.getElementById('quit').addEventListener('click', goBack);
  document.getElementById('g-back')?.addEventListener('click', () => drawWhatIsIpa(step - 1, st));
  document.getElementById('g-next')?.addEventListener('click', () => {
    const to = step + 1;
    if (to >= total) store.markWhatIsIpa(Object.values(st.answered).filter(Boolean).length);
    drawWhatIsIpa(to, st);
  });
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang: b.dataset.lang ?? 'en-US', accent: b.dataset.acc ?? 'nam' })));
  app.querySelectorAll('[data-phoneme]').forEach(b =>
    b.addEventListener('click', () => playPhoneme(b.dataset.phoneme, 'nam')));
  app.querySelector('[data-sound-detail]')?.addEventListener('click', e =>
    renderSoundDetail(e.currentTarget.dataset.soundDetail, 'nam'));
  document.getElementById('wii-reveal')?.addEventListener('click', () => { st.revealed = true; drawWhatIsIpa(step, st); });
  document.getElementById('wii-foundations')?.addEventListener('click', () => { setCourse('core'); goSection('learn'); });
  document.getElementById('wii-chart')?.addEventListener('click', () => renderChart());
  document.getElementById('wii-course')?.addEventListener('click', () => goSection('learn'));
  wireWiiQuestions(app, st);
  const h = app.querySelector('.guide-step h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}

// ── Onboarding: the first-session walk-in ─────────────────────
// Four short steps: what this is → why you're here → which voice → how to
// start. Preferences persist in the main store; users with pre-onboarding
// progress are marked done at boot and never see it.

const GOALS = [
  { id: 'acting', icon: '🎭', label: 'Acting & performance', blurb: 'Dialects for roles — texts, rehearsal, recorded takes.' },
  { id: 'accent', icon: '🗣', label: 'Accent training', blurb: 'Sound at home in a new accent, sound by sound.' },
  { id: 'ipa', icon: '📖', label: 'IPA & linguistics', blurb: 'Read and write the alphabet of sounds itself.' },
  { id: 'general', icon: '💬', label: 'General pronunciation', blurb: 'Clearer, more deliberate everyday speech.' },
];

const ONBOARD_ACCENTS = [
  { id: 'nam', icon: '🇺🇸', label: 'Neutral American', blurb: 'The screen standard — every R spoken, flat BATH, open LOT.', sample: true },
  { id: 'rp', icon: '🎩', label: 'Traditional RP', blurb: 'The classic British stage standard — non-rhotic, broad BATH.', sample: true },
  { id: 'ssbe', icon: '🇬🇧', label: 'Standard British', blurb: 'A modern British target for present-day roles and conversation.', sample: false },
  { id: 'aus', icon: '🇦🇺', label: 'Australian', blurb: 'Forward vowels and a rising line — the hardest to fake.', sample: true },
  { id: 'core', icon: 'ʃə', label: 'IPA Foundations', blurb: 'Start with the alphabet of sounds, no accent attached.', sample: false },
];

// Words whose clips make the accents' differences audible side by side.
const SAMPLE_WORDS = ['dance', 'water', 'nurse'];

function needsOnboarding() {
  if (store.onboarding.done) return false;
  if (store.hasEarnedAnything) {                 // predates onboarding
    store.saveOnboarding({ done: true });
    return false;
  }
  return true;
}

function renderOnboarding(step = 0, sel = {}) {
  stopSpeech();
  const total = 4;
  const dots = `<div class="ob-dots" aria-label="Step ${step + 1} of ${total}">${
    Array.from({ length: total }, (_, i) => `<span class="ob-dot ${i <= step ? 'on' : ''}"></span>`).join('')}</div>`;
  const back = step > 0
    ? `<button class="btn ob-back" id="ob-back" type="button">‹ Back</button>` : '<span></span>';

  const bodies = [
    // 1 — welcome
    () => `
      <div class="ob-emblem">${EMBLEM}</div>
      <h1>Welcome to Speechcraft</h1>
      <p class="ob-lede">Speechcraft teaches you to hear, read, and speak the sounds of English — the way actors train.</p>
      <div class="ob-actions"><button class="btn btn-primary" id="ob-next" type="button">Get started</button></div>`,
    // 2 — goal
    () => `
      <h1>What brings you here?</h1>
      <p class="ob-lede">This just sets the tone — everything stays open to you.</p>
      <div class="ob-options" role="radiogroup" aria-label="Your goal">
        ${GOALS.map(g => `
          <button class="ob-option ${sel.goal === g.id ? 'on' : ''}" data-goal="${g.id}" type="button"
                  role="radio" aria-checked="${sel.goal === g.id}">
            <span class="ob-opt-icon">${g.icon}</span>
            <span class="ob-opt-text"><b>${esc(g.label)}</b><small>${esc(g.blurb)}</small></span>
          </button>`).join('')}
      </div>
      <div class="ob-actions"><button class="btn btn-primary" id="ob-next" type="button" ${sel.goal ? '' : 'disabled'}>Continue</button></div>`,
    // 3 — accent
    () => `
      <h1>Pick your first course</h1>
      <p class="ob-lede">You can switch or add the others any time from the flag at the top.</p>
      <div class="ob-options" role="radiogroup" aria-label="First course">
        ${ONBOARD_ACCENTS.map(a => `
          <div class="ob-option-row">
            <button class="ob-option ${sel.accent === a.id ? 'on' : ''}" data-accent="${a.id}" type="button"
                    role="radio" aria-checked="${sel.accent === a.id}">
              <span class="ob-opt-icon">${a.icon}</span>
              <span class="ob-opt-text"><b>${esc(a.label)}</b><small>${esc(a.blurb)}</small></span>
            </button>
            ${a.sample ? `<button class="word-chip ob-sample" data-sample="${a.id}" type="button"
              aria-label="Hear a ${esc(a.label)} sample">🔊 Sample</button>` : ''}
          </div>`).join('')}
      </div>
      <div class="ob-actions"><button class="btn btn-primary" id="ob-next" type="button" ${sel.accent ? '' : 'disabled'}>Continue</button></div>`,
    // 4 — how to start
    () => `
      <h1>How do you want to start?</h1>
      <p class="ob-lede">The diagnostic is ≈8 quick questions — it can’t cost hearts, and it seeds your weak-sound tracking.</p>
      <div class="ob-actions ob-actions-col">
        <button class="btn btn-primary" id="ob-begin" type="button">▶ Begin your first lesson</button>
        <button class="btn" id="ob-diagnostic" type="button">🎯 Take a quick diagnostic</button>
      </div>`,
  ];

  app.innerHTML = `
    <main class="onboard" aria-labelledby="ob-h">
      ${dots}
      <div class="ob-body" id="ob-h">${bodies[step]()}</div>
      <div class="ob-footer">${back}</div>
    </main>`;

  const go = (s2, sel2) => renderOnboarding(s2, { ...sel, ...sel2 });
  document.getElementById('ob-back')?.addEventListener('click', () => go(step - 1, {}));

  if (step === 0) document.getElementById('ob-next').addEventListener('click', () => go(1, {}));

  if (step === 1) {
    app.querySelectorAll('[data-goal]').forEach(b =>
      b.addEventListener('click', () => go(1, { goal: b.dataset.goal })));
    document.getElementById('ob-next').addEventListener('click', () => go(2, {}));
  }

  if (step === 2) {
    app.querySelectorAll('[data-accent]').forEach(b =>
      b.addEventListener('click', () => go(2, { accent: b.dataset.accent })));
    app.querySelectorAll('.ob-sample').forEach(b =>
      b.addEventListener('click', () => {
        const d = b.dataset.sample;
        speakSequence(SAMPLE_WORDS.map(w => ({ text: w, clipUrl: `audio/${d}/f/${w}.mp3` })),
          { lang: ACCENT_LANG[d] });
      }));
    document.getElementById('ob-next').addEventListener('click', () => go(3, {}));
  }

  if (step === 3) {
    const finish = () => {
      store.saveOnboarding({ done: true, goal: sel.goal ?? null, accent: sel.accent ?? null });
      setCourse(sel.accent ?? 'nam');
      setSection('learn');
    };
    const track = () => trackFor(sel.accent ?? 'nam');
    document.getElementById('ob-begin').addEventListener('click', () => {
      finish();
      const first = TRACK_LESSONS[track().id][0];
      renderGuide(first);
    });
    document.getElementById('ob-diagnostic').addEventListener('click', () => {
      finish();
      startLesson(practiceLesson(track()));
    });
  }

  // Focus the step heading so keyboard and screen-reader users land somewhere sensible.
  const h = app.querySelector('h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}

// Preferences: revisit what onboarding asked, any time. More → Preferences.
function renderPreferences() {
  record(renderPreferences);
  const ob = store.onboarding;
  const course = COURSES.find(c => c.id === activeCourse());
  app.innerHTML = `
    ${pageTopbar('⚙️ Preferences', '#64748b')}
    <main class="guide">
      <h2 class="guide-heading">Your goal</h2>
      <div class="chip-row" id="pref-goals">
        ${GOALS.map(g => `<button class="chip-pick ${ob.goal === g.id ? 'on' : ''}" data-goal="${g.id}" type="button"
          aria-pressed="${ob.goal === g.id}">${g.icon} ${esc(g.label)}</button>`).join('')}
      </div>
      <h2 class="guide-heading">Active course</h2>
      <div class="chip-row" id="pref-courses">
        ${COURSES.map(c => `<button class="chip-pick ${c.id === course.id ? 'on' : ''}" data-course="${c.id}" type="button"
          aria-pressed="${c.id === course.id}">${c.icon} ${esc(c.label)}</button>`).join('')}
      </div>
      <h2 class="guide-heading">First-run setup</h2>
      <p class="pane-note">Runs the welcome flow again. Your progress is untouched.</p>
      <button class="btn" id="pref-rerun" type="button">Run setup again</button>
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-goal]').forEach(b =>
    b.addEventListener('click', () => { store.saveOnboarding({ goal: b.dataset.goal }); renderPreferences(); }));
  app.querySelectorAll('[data-course]').forEach(b =>
    b.addEventListener('click', () => { setCourse(b.dataset.course); renderPreferences(); }));
  document.getElementById('pref-rerun').addEventListener('click', () => renderOnboarding());
}

// ── Audio audit: the owner's ear-check grid (#audit) ──────────
// Dev-facing, reached only by adding #audit to the URL — never in any nav.
// Every clip playable in two taps, markable good/bad, and exportable as a
// fresh js/data/audio-flags.js to commit. Plays files DIRECTLY (even
// quarantined ones) — the whole point is re-listening.

const AUDIT_KEY = 'speechcraft-audio-audit-v1';
const auditVerdicts = () => { try { return JSON.parse(localStorage.getItem(AUDIT_KEY)) ?? {}; } catch { return {}; } };
const saveVerdict = (id, v) => {
  const all = auditVerdicts();
  if (v) all[id] = v; else delete all[id];
  try { localStorage.setItem(AUDIT_KEY, JSON.stringify(all)); } catch {}
};

async function renderAudioAudit(filters = { d: 'all', v: 'all', kind: 'all', status: 'all' }) {
  stopSpeech();
  let index = {};
  let phonIndex = {};
  try { index = await (await fetch('audio/index.json')).json(); } catch { /* rows empty */ }
  try { phonIndex = await (await fetch('audio/phonemes-index.json')).json(); } catch { /* none yet */ }
  const verdicts = auditVerdicts();
  KNOWN_BAD_LIST.forEach(id => { if (!verdicts[id]) verdicts[id] = 'bad'; });

  const rows = [];
  for (const d of Object.keys(index)) {
    for (const v of Object.keys(index[d])) {
      for (const clip of index[d][v]) {
        rows.push({ id: `${d}/${v}/${clip}`, d, v, clip, kind: 'word', path: `audio/${d}/${v}/${clip}.mp3` });
      }
    }
  }
  for (const d of ['nam', 'rp', 'aus', 'ssbe']) {
    const named = voicesForCourse(d).map(v => v.id);
    for (const sym of phonemesForAccent(d)) {
      const slug = phonemeSlug(sym);
      for (const v of (named.length ? named : ['f', 'm'])) {
        const candidates = phonIndex[d]?.[v] ?? [];
        for (const s2 of [slug, slug + '_syllable']) {
          if (s2.endsWith('_syllable') && !candidates.includes(s2)) continue;
          rows.push({ id: `${d}/${v}/${s2}`, d, v,
            clip: `/${sym}/${s2.endsWith('_syllable') ? ' (syllable)' : ''}`, kind: 'phoneme',
            path: `audio/phonemes/${d}/${v}/${s2}.mp3`,
            missing: !candidates.includes(s2) });
        }
      }
    }
  }

  const f = filters;
  const shown = rows.filter(r =>
    (f.d === 'all' || r.d === f.d) &&
    (f.v === 'all' || r.v === f.v) &&
    (f.kind === 'all' || r.kind === f.kind) &&
    (f.status === 'all'
      || (f.status === 'missing' && r.missing)
      || (f.status === 'bad' && verdicts[r.id] === 'bad')
      || (f.status === 'good' && verdicts[r.id] === 'good')
      || (f.status === 'unreviewed' && !r.missing && !verdicts[r.id])));
  const CAP = 300;

  const sel = (id, opts, cur) => `
    <select id="${id}" class="input-text audit-sel">
      ${opts.map(o => `<option value="${o}" ${o === cur ? 'selected' : ''}>${o}</option>`).join('')}
    </select>`;

  app.innerHTML = `
    <header class="topbar">
      <button class="backbtn" id="audit-exit" aria-label="Back to the app" title="Back to the app">‹</button>
      <div class="track-title" style="color:#64748b">🎧 Audio audit</div>
      <div class="stats"><span class="stat">${shown.length} clips</span></div>
    </header>
    <main class="guide audit-page">
      <p class="pane-note">Owner tool. Play each clip, mark it — <b>Good</b> means a learner may hear it, <b>Bad</b> quarantines it. Export writes a new <code>js/data/audio-flags.js</code> to commit.</p>
      <div class="audit-filters">
        ${sel('af-d', ['all', 'nam', 'rp', 'aus', 'ssbe'], f.d)}
        ${sel('af-v', ['all', ...new Set(rows.map(r => r.v))], f.v)}
        ${sel('af-kind', ['all', 'word', 'phoneme'], f.kind)}
        ${sel('af-status', ['all', 'unreviewed', 'good', 'bad', 'missing'], f.status)}
        <button class="btn" id="audit-export" type="button">Export flags</button>
      </div>
      <textarea id="audit-out" class="input-text audit-out" hidden rows="10" aria-label="Exported audio-flags.js"></textarea>
      <div class="audit-rows">
        ${shown.slice(0, CAP).map(r => `
          <div class="audit-row ${verdicts[r.id] ?? ''}" data-id="${esc(r.id)}">
            ${r.missing ? '<span class="audit-play is-off" title="No clip yet">∅</span>'
              : `<button class="audit-play" data-path="${esc(r.path)}" type="button" aria-label="Play ${esc(r.id)}">▶</button>`}
            <span class="audit-name">${esc(r.clip)}</span>
            <span class="audit-meta">${r.d}/${r.v} · ${r.kind}${r.missing ? ' · missing' : ''}</span>
            ${r.missing ? '' : `
              <span class="audit-verdict">
                <button class="btn-lite av-good" type="button" aria-pressed="${verdicts[r.id] === 'good'}">Good</button>
                <button class="btn-lite av-bad" type="button" aria-pressed="${verdicts[r.id] === 'bad'}">Bad</button>
              </span>`}
          </div>`).join('')}
        ${shown.length > CAP ? `<p class="pane-note">Showing ${CAP} of ${shown.length} — narrow the filters.</p>` : ''}
      </div>
    </main>`;

  document.getElementById('audit-exit').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    renderHome();
  });
  [['af-d', 'd'], ['af-v', 'v'], ['af-kind', 'kind'], ['af-status', 'status']].forEach(([id, key]) =>
    document.getElementById(id).addEventListener('change', e =>
      renderAudioAudit({ ...f, [key]: e.target.value })));

  let playing = null;
  app.querySelectorAll('.audit-play[data-path]').forEach(b =>
    b.addEventListener('click', () => {
      if (playing) playing.pause();
      playing = new Audio(b.dataset.path);
      playing.play().catch(() => { b.textContent = '✗'; b.title = 'File failed to load'; });
    }));

  app.querySelectorAll('.audit-row').forEach(row => {
    const id = row.dataset.id;
    row.querySelector('.av-good')?.addEventListener('click', () => {
      const cur = auditVerdicts()[id];
      saveVerdict(id, cur === 'good' ? null : 'good');
      renderAudioAudit(f);
    });
    row.querySelector('.av-bad')?.addEventListener('click', () => {
      const cur = auditVerdicts()[id];
      const marking = cur !== 'bad';
      saveVerdict(id, marking ? 'bad' : null);
      if (marking) {
        const note = window.prompt('Optional note — what is wrong with this clip?', '');
        try {
          const notes = JSON.parse(localStorage.getItem(AUDIT_KEY + '-notes')) ?? {};
          if (note) notes[id] = note.slice(0, 140); else delete notes[id];
          localStorage.setItem(AUDIT_KEY + '-notes', JSON.stringify(notes));
        } catch { /* note is a nicety */ }
      }
      renderAudioAudit(f);
    });
  });

  document.getElementById('audit-export').addEventListener('click', () => {
    const all = auditVerdicts();
    KNOWN_BAD_LIST.forEach(id => { if (!all[id]) all[id] = 'bad'; });
    const bad = Object.keys(all).filter(k => all[k] === 'bad').sort();
    const phonemeIds = new Set(rows.filter(r => r.kind === 'phoneme').map(r => r.id));
    const approved = Object.keys(all).filter(k => all[k] === 'good' && phonemeIds.has(k)).sort();
    let notes = {};
    try { notes = JSON.parse(localStorage.getItem(AUDIT_KEY + '-notes')) ?? {}; } catch {}
    const goodSsbe = Object.keys(all).filter(k => all[k] === 'good' && k.startsWith('ssbe/')).length;
    const out = document.getElementById('audit-out');
    out.hidden = false;
    out.value = [
      '// Generated by the #audit page on ' + new Date().toISOString().slice(0, 10) + ' — review, then replace js/data/audio-flags.js.',
      goodSsbe ? `// ssbe review: ${goodSsbe} clip(s) marked good this session.` : '',
      'export const KNOWN_BAD = [',
      ...bad.map(x => `  '${x}',${notes[x] ? `   // ${notes[x].replace(/\n/g, ' ')}` : ''}`),
      '];', '',
      'export const APPROVED_PHONEMES = [', ...approved.map(x => `  '${x}',`), '];', '',
    ].filter(l => l !== '').join('\n');
    out.focus();
    out.select();
  });
}

// ── More: the reference shelf ─────────────────────────────────

// ── Launch safeguards: About / Feedback / Sources & Credits ──

function renderAbout() {
  record(renderAbout);
  app.innerHTML = `
    ${pageTopbar('ℹ️ About Speechcraft', '#6f8657')}
    <main class="guide">
      <h1>About Speechcraft</h1>
      <p class="guide-text">Speechcraft teaches the sounds of English the way actors train: the International Phonetic Alphabet, four pronunciation targets (Neutral American, Traditional RP, Standard British, Australian), and a rehearsal workspace for real text with recording and comparison.</p>
      <p class="guide-text"><b>Speechcraft is in beta.</b> Content and recordings are still being reviewed and expanded. It is a practice tool, not a substitute for a dialect coach — accents are learned by ears and feedback, and no app can promise fluency.</p>
      <p class="pane-note">Pronunciation targets are exactly that: targets. Real speakers vary by region, generation and situation.</p>
    </main>`;
  wireBrandHome();
}

function renderFeedback() {
  record(renderFeedback);
  app.innerHTML = `
    ${pageTopbar('✉️ Feedback', '#8a6d3b')}
    <main class="guide">
      <h1>Report a problem</h1>
      <p class="guide-text">Heard a wrong pronunciation? Found a mistake? Reports go through the project’s GitHub Issues page — no account data leaves this app.</p>
      <p class="guide-text">The most useful reports include: <b>the course</b>, <b>the word or screen</b>, <b>what you heard</b>, and <b>what you expected</b>.</p>
      <p><a class="btn btn-primary" href="https://github.com/frankierocco3-coder/IPA-App/issues" target="_blank" rel="noopener noreferrer">Open GitHub Issues ↗</a></p>
    </main>`;
  wireBrandHome();
}

function renderCredits() {
  record(renderCredits);
  app.innerHTML = `
    ${pageTopbar('📚 Sources & Credits', '#64748b')}
    <main class="guide">
      <h1>Sources &amp; Credits</h1>
      <h2 class="guide-heading">Texts</h2>
      <p class="guide-text">Shakespeare’s sonnets and the included plays by Chekhov, Ibsen, Wilde, O’Neill and Pirandello are public-domain works; some translations are public domain <b>in the United States</b> specifically (noted on each collection: Fell &amp; West, Storer &amp; Livingston, Archer, Gosse, Sharp &amp; Marx Aveling).</p>
      <h2 class="guide-heading">Sonnets Recast</h2>
      <p class="guide-text">Plain-meaning summaries and dialect recasts are <b>original Speechcraft educational adaptations</b>, written for this app. They are creative adaptations, not literal translations, and carry a beta review label.</p>
      <h2 class="guide-heading">Audio</h2>
      <p class="guide-text">Word, expression and narration recordings are synthesised with licensed ElevenLabs voices under their commercial licence, generated offline and bundled as static files. Where no recording exists, the app says so — the optional “device voice” readings use your own device’s built-in speech.</p>
      <h2 class="guide-heading">Everything else</h2>
      <p class="guide-text">Design, course content, exercises, transcriptions and code are original to Speechcraft. Pronunciation data derives from CMUdict (public domain) for General American, with rule-derived adaptations marked ≈ elsewhere.</p>
    </main>`;
  wireBrandHome();
}

function moreMain(el) {
  const cards = [
    { icon: '👤', title: 'Profile', blurb: 'Your name and avatar.', go: () => goSection('profile'), color: '#6f8657' },
    { icon: '🛍️', title: 'Shop', blurb: 'Hearts, streak freezes and boosts.', go: () => goSection('shop'), color: '#c99e58' },
    { icon: '⚙️', title: 'Preferences', blurb: 'Your goal, course, and first-run choices.', go: renderPreferences, color: '#64748b' },
    { icon: 'ℹ️', title: 'About Speechcraft', blurb: 'What this is, and what beta means.', go: renderAbout, color: '#6f8657' },
    { icon: '✉️', title: 'Feedback', blurb: 'Report a wrong pronunciation or a mistake.', go: renderFeedback, color: '#8a6d3b' },
    { icon: '🔒', title: 'Privacy & Data', blurb: 'What’s stored on this device, and how to delete it.', go: renderPrivacy, color: '#8a6d3b' },
    { icon: '📚', title: 'Sources & Credits', blurb: 'Texts, translations, voices and licences.', go: renderCredits, color: '#64748b' },
  ];
  el.innerHTML = `<h1 class="page-h">More</h1>` + cards.map((c, i) => `
    <button class="track-card" data-i="${i}" type="button" style="--track-color:${c.color}">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${esc(c.title)}</h2><p>${esc(c.blurb)}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  el.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
}

const idiomFilters = { q: '', era: 'all', type: 'all', flagged: false };

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
    b.addEventListener('click', () => renderSoundDetail(b.dataset.sym, d)));
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
        <div class="idiom-listen">
          <button class="word-chip" data-say="${esc(e.term)}" type="button" aria-label="Hear “${esc(e.term)}”">🔊 Hear it</button>
          ${e.example ? `<button class="word-chip" data-say="${esc(e.example)}" type="button" aria-label="Hear the example sentence">🔊 In a sentence</button>` : ''}
          <button class="word-chip" data-tryterm="${esc(e.term)}" type="button" aria-label="Record yourself saying “${esc(e.term)}”">🎙 Try it</button>
        </div>
      </div>`).join('')
      : '<p class="pane-note">Nothing matches that filter.</p>';
  };

  const chip = (group, value, label, on) =>
    `<button class="dialect-chip ${on ? 'on' : ''}" data-g="${group}" data-v="${value}" type="button">${label}</button>`;

  hub.innerHTML = `
    <div id="idiom-tryit"></div>
    <p class="pane-note">${d === 'ssbe'
      ? `The vocabulary that carries the ${esc(name)} voice — the right vowel with the wrong word still breaks the illusion. Contemporary usage is the default view; use the Era filter for older material.`
      : `The vocabulary that carries the ${esc(name)} voice — the right vowel with the wrong word still breaks the illusion. <b>period</b> ≈ c.1890–1930; it means characteristic of the era, not dead.`}</p>
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
    ${d === 'ssbe' ? `
      <details class="idiom-extra"><summary>London &amp; Multicultural London English — a separate register</summary>
        <p class="pane-note">MLE is its own living variety, not generic British slang — these are labelled separately on purpose. Demonstrated in a Standard British accent here, but the words belong to London’s multicultural speech community. Reference only; never drilled.</p>
        ${MLE.map(m => `<div class="idiom-card"><div class="idiom-head"><span class="idiom-term">${esc(m.term)}</span><span class="tag">MLE</span></div><p class="idiom-meaning">${esc(m.meaning)}</p></div>`).join('')}
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
  // One delegated listener survives every draw(); everything speaks in this
  // dialect's own voices (device fallback until idiom clips are generated).
  hub.querySelector('#idiom-list').addEventListener('click', ev => {
    const t = ev.target.closest('button[data-tryterm]');
    if (t) {
      const slot = hub.querySelector('#idiom-tryit');
      slot.innerHTML = tryItHtml(`Record yourself saying “${t.dataset.tryterm}”, then compare.`);
      wireTryIt(slot, () => speak(t.dataset.tryterm, { lang: ACCENT_LANG[d], accent: d }));
      slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    const b = ev.target.closest('button[data-say]');
    if (b) speak(b.dataset.say, { lang: ACCENT_LANG[d], accent: d });
  });
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

function idiomLesson(d, track) {
  return {
    id: 'idiom-' + d,
    title: `${dialectName(d)} words & expressions`,
    practice: true,
    accent: d,
    phonemes: [],
    types: ['idiom'],
    count: 10,
    unit: { title: 'Words & Expressions', color: track?.color ?? '#8a6d3b' },
    track: null,
  };
}

function textSpeechPane(pane) {
  const libs = Object.entries(LIBRARIES).map(([key, lib]) => ({
    key, icon: lib.icon, title: lib.title,
    blurb: `${lib.data.length} speeches · ${esc(lib.note)}`,
    go: () => renderLibraryList(key),
  }));
  const featured = Object.keys(RECASTS).map(Number).filter(n =>
    LONGFORM_COVERAGE.sonnets.nam.includes(n) && LONGFORM_COVERAGE.sonnets.rp.includes(n));
  const cards = [
    featured.length ? { icon: '⭐', title: 'Featured Texts',
      blurb: `Sonnets with complete, verified Neutral American and Traditional RP recordings — plus the Sonnets Recast beta: ${featured.map(n => `№${n}`).join(', ')}.`,
      go: () => renderSonnet(featured[0]) } : null,
    { icon: '🎬', title: 'My Texts', blurb: 'Your rehearsal projects — saved roles, notes, and recorded takes.', go: renderProjects },
    { icon: '📜', title: 'Shakespeare’s Sonnets', blurb: 'All 154 — speak them, scan the metre, study the sounds.', go: renderSonnetList },
    ...libs,
    { icon: '✍️', title: 'Train Any Text', blurb: 'Paste a monologue, speech, or scene — practise it in any dialect.', go: renderCustomText },
  ];
  const shown = cards.filter(Boolean);
  pane.innerHTML = shown.map((c, i) => `
    <button class="track-card" data-i="${i}" type="button" style="--track-color:#8a6d3b">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${c.title}</h2><p>${c.blurb}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  pane.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => shown[+b.dataset.i].go()));
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
  { id: 'rp', label: 'Traditional RP', lang: 'en-GB', flag: '🎩' },
  { id: 'ssbe', label: 'Standard British', lang: 'en-GB', flag: '🇬🇧' },
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
  // App-state keys that are settings/telemetry, not progress
  for (const k of ['speechcraft-quests-v1', 'speechcraft-audio-audit-v1',
                   'speechcraft-audio-audit-v1-notes', 'speechcraft-voice-prefs',
                   'speechcraft-home-tab', 'speechcraft-hub-sub']) {
    try { localStorage.removeItem(k); } catch { /* ignore */ }
  }
  report.push('quests & app settings');
  if (includeProgress) {
    try { localStorage.removeItem('ipa-trainer-v1'); report.push('course progress'); } catch { /* ignore */ }
    for (const k of ['speechcraft-course', 'speechcraft-section']) {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    }
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
    clip: (n, acc) => (LONGFORM_COVERAGE.libs[key]?.[acc] ?? []).includes(s.id)
      ? `audio/${key}/${acc}/${s.id}-${n}.mp3` : null,
    narrated: Object.keys(LONGFORM_COVERAGE.libs[key] ?? {})
      .filter(d => (LONGFORM_COVERAGE.libs[key][d] ?? []).includes(s.id)),
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
  // A dialect is offered as recorded ONLY when this sonnet's complete
  // line set exists for it (generated manifest — never a hardcoded claim).
  const narrated = Object.keys(LONGFORM_COVERAGE.sonnets)
    .filter(d => LONGFORM_COVERAGE.sonnets[d].includes(n));
  renderReader({
    label: `Sonnet ${n}`, lines: s.lines, accent: narrated[0] ?? 'rp',
    clip: (i, acc) => narrated.includes(acc) ? `audio/sonnets/${acc}/${n}-${i}.mp3` : null,
    narrated,
    recast: RECASTS[n] ?? null,
    scopeId: `sonnet:${n}`,
    prev: prev ? { label: `‹ Sonnet ${prev.n}`, go: () => renderSonnet(prev.n) } : null,
    next: next ? { label: `Sonnet ${next.n} ›`, go: () => renderSonnet(next.n) } : null,
  });
}



// The reader: any text, three ways (Speak / Scan / Sound), any dialect.
function renderReader({ label, lines, accent, prev, next, editor, clip, verse = true, meta = null, narrated = [], recast = null, scopeId = null, projectId = null }) {
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
      <p class="audio-avail">${narrated.length
        ? `🎙 Recorded audio: ${narrated.map(d => `<span class="tag tag-dialect">${esc((TEXT_DIALECTS.find(x => x.id === d) ?? {}).flag ?? '')} ${esc(dialectName(d))}</span>`).join(' ')}`
        : '🎙 Studio recordings coming soon — the reading below uses your device voice, clearly labelled.'}
        ${TEXT_DIALECTS.filter(d => !narrated.includes(d.id)).map(d => `<span class="tag tag-off">${esc(d.label)} — coming soon</span>`).join(' ')}</p>
      <div class="dialect-picker reader-dialects"><span class="dialect-label">Dialect</span><div class="dialect-chips" id="rd-dialects"></div></div>
      <div class="sonnet-tabs">
        <button class="son-tab on" data-mode="speak">🔊 Listen</button>
        <button class="son-tab" data-mode="scan">📐 Scan</button>
        <button class="son-tab" data-mode="transcribe">🔤 IPA</button>
        <button class="son-tab" data-mode="perform">🎙 Perform</button>
        ${recast ? '<button class="son-tab" data-mode="recast">🔁 Recast <span class="tag tag-skill">beta</span></button>' : ''}
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
    else if (m === 'recast') { wireRecast._lines = lines.map(stripStage); pane.innerHTML = recastPane(recast, lines); wireRecast(pane, recast); }
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

// ── Sonnets Recast (beta): Original / Plain Meaning / Dialect Recast ──
// The original words performed in an accent are an "Original Performance"
// (the Perform tab). Replacing the words is a "Dialect Recast" — never
// labelled as an accent performance, never as a literal translation.
const RECAST_DIALECTS = [
  { id: 'nam', label: 'Neutral American' },
  { id: 'ssbe', label: 'Standard British' },
  { id: 'aus', label: 'Australian' },
];

function recastPane(recast, lines) {
  return `
    <p class="recast-beta">🔁 <b>Sonnets Recast</b> — ${esc(RECAST_LABEL)}. The original words spoken in an
      accent are an <b>original performance</b> (see Perform); a recast rewrites the ideas in a
      contemporary register. Traditional RP offers the original and Plain Meaning — its register IS the original's.</p>
    <div class="recast-views" role="tablist" aria-label="Recast views">
      <button class="son-tab on" data-view="original" role="tab">Original</button>
      <button class="son-tab" data-view="plain" role="tab">Plain Meaning</button>
      ${RECAST_DIALECTS.filter(d => recast.recasts[d.id]).map(d =>
        `<button class="son-tab" data-view="${d.id}" role="tab">${esc(d.label)} recast</button>`).join('')}
    </div>
    <div class="recast-body" id="recast-body"></div>
    <p class="pane-note">Recast recordings are not yet produced — these are text views. Audio will only ever appear here in each recast's own dialect voices.</p>`;
}

function wireRecast(pane, recast) {
  const body = pane.querySelector('#recast-body');
  wireRecast._orig = (wireRecast._lines ?? []).map(l => esc(l)).join('\n');
  const show2 = view => {
    pane.querySelectorAll('.recast-views .son-tab').forEach(t => t.classList.toggle('on', t.dataset.view === view));
    if (view === 'original') body.innerHTML = `<div class="recast-text">${wireRecast._orig}</div>`;
    else if (view === 'plain') body.innerHTML = `<p class="guide-text">${esc(recast.plain)}</p>`;
    else body.innerHTML = `
      <p class="pane-note">${esc(RECAST_LABEL)} — original Speechcraft adaptation; meaning preserved, meter not formally reviewed.</p>
      <div class="recast-text">${esc(recast.recasts[view])}</div>`;
  };
  pane.querySelectorAll('.recast-views .son-tab').forEach(t =>
    t.addEventListener('click', () => show2(t.dataset.view)));
  show2('original');
}

function speakPane(lines, accent = null, narrated = []) {
  // Say plainly whose voice this is, so switching dialect is never a mystery.
  const voiceNote = !narrated.length
    ? `<p class="voice-note voice-note-fallback">🔈 Reading in your <b>device voice</b> — no studio recording exists for this piece yet.</p>`
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
      ${whatIsIpaCard()}
      ${groups.map(section).join('')}
    </main>`;

  wireBrandHome();
  wireWhatIsIpaCard(app);
  app.querySelectorAll('.chart-chip').forEach(btn =>
    btn.addEventListener('click', () => renderSoundDetail(btn.dataset.sym))
  );
}

// ── Try it yourself: record, play back, compare with the model ─
// Ephemeral by design — nothing is saved; My Texts remains the place for
// keeping takes. One object URL lives at a time.
let tryItUrl = null;

function tryItHtml(label = 'Record yourself, then compare with the model.') {
  if (!recordingSupported()) return '';
  return `
  <section class="tryit" aria-label="Try it yourself">
    <span class="cc-stage">🎙 Try it yourself</span>
    <div class="tryit-row">
      <button class="btn btn-record" data-tryit="rec" type="button">⏺ Record</button>
      <button class="btn btn-lite" data-tryit="model" type="button">🔊 Model</button>
      <audio controls hidden data-tryit="play" aria-label="Your recording"></audio>
    </div>
    <p class="pane-note" data-tryit="status" role="status">${esc(label)}</p>
  </section>`;
}

function wireTryIt(container, playModel) {
  const box = container.querySelector('.tryit');
  if (!box) return;
  const rec = box.querySelector('[data-tryit="rec"]');
  const player = box.querySelector('[data-tryit="play"]');
  const status = box.querySelector('[data-tryit="status"]');
  let recording = false;
  box.querySelector('[data-tryit="model"]').addEventListener('click', () => playModel());
  rec.addEventListener('click', async () => {
    if (!recording) {
      try {
        stopSpeech();
        await startRecording({ onAutoStop: () => rec.click() });
        recording = true;
        rec.textContent = '⏹ Stop';
        rec.classList.add('is-recording');
        status.textContent = 'Recording… speak, then press stop.';
      } catch (err) {
        status.textContent = err?.name === 'NotAllowedError'
          ? 'Microphone permission was declined — allow it in the browser to record.'
          : 'Recording isn’t available right now.';
      }
      return;
    }
    recording = false;
    rec.textContent = '⏺ Record';
    rec.classList.remove('is-recording');
    const take = await stopRecording();
    if (!take?.blob) { status.textContent = 'Nothing captured — try again.'; return; }
    if (tryItUrl) URL.revokeObjectURL(tryItUrl);
    tryItUrl = URL.createObjectURL(take.blob);
    player.src = tryItUrl;
    player.hidden = false;
    player.play().catch(() => {});
    status.textContent = 'That’s you. Play the model, then match it.';
  });
}

// Detail for one sound: articulation diagram, description, example words.
// `accent` is the dialect context the page was opened from — inside a course
// everything speaks that course's voices. Without one (the full Foundations
// chart) fall back to guessing from dialect-exclusive symbols.
function renderSoundDetail(sym, accent) {
  const p = PHONEMES[sym];
  if (!p) return renderChart();
  record(() => renderSoundDetail(sym, accent));
  const diagram = articulationSVG(sym);
  const lang = ACCENT_LANG[accent]
    ?? ACCENT_LANG[({ 'ɝ': 'nam', 'ɚ': 'nam', 'ɑ': 'nam', 'oʊ': 'nam' }[sym])]
    ?? (['ɐ', 'ɐː', 'ʉː', 'æɪ', 'ɑɪ', 'æɔ', 'əʉ'].includes(sym) ? 'en-AU' : 'en-GB');
  const acc = accent ?? ({ 'en-US': 'nam', 'en-GB': 'rp', 'en-AU': 'aus' })[lang];
  const isVowel = p.type !== 'consonant';
  // The big symbol plays the ISOLATED sound only when an ear-approved clip
  // exists. Until then it is an explicit word control — labelled as such,
  // never pretending a word is the phoneme.
  const slug = phonemeSlug(sym);
  const hasIso = hasPhonemeClip(slug, acc);
  const hasSyl = hasPhonemeClip(slug + '_syllable', acc);
  const chips = p.examples.map(w => wordChip(w, acc)).join('');

  app.innerHTML = `
    ${pageTopbar(`/${esc(sym)}/`, '#64748b')}
    <main class="guide sound-detail">
      <div class="sound-hero">
        <div class="sound-big-wrap">
          ${hasIso ? `
          <button class="sound-big" id="say-sym"
            aria-label="Hear the isolated sound ${esc(sym)}" title="Hear the sound">/${esc(sym)}/</button>
          <span class="sound-big-cap">🔊 Hear the sound</span>`
          : `
          <div class="sound-big is-off" aria-label="Isolated sound recording for ${esc(sym)} coming soon">/${esc(sym)}/</div>
          <span class="sound-big-cap">Isolated sound coming soon</span>`}
          ${hasSyl ? `<button class="word-chip" id="say-syl" type="button"
            aria-label="Hear ${esc(sym)} inside a syllable — a syllable demonstration, not a fully isolated sound">🔊 Hear it in a syllable</button>` : ''}
        </div>
        <div>
          <h1>${esc(p.name)}</h1>
          <p class="guide-text">${esc(p.hint)}.</p>
        </div>
      </div>
      ${diagram ? `<div class="artic-wrap">${diagram}
        <p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>` : ''}
      <h2 class="guide-heading">Hear it in words</h2>
      <div class="chips">${chips}</div>
      ${tryItHtml(`Record yourself saying ${hasIso ? `the sound /${sym}/` : `“${p.examples.find(x => speakableWord(x, acc)) ?? p.examples[0]}”`}, then compare.`)}
    </main>`;

  wireBrandHome();
  // A phoneme request plays the phoneme or nothing — no word stand-in.
  document.getElementById('say-sym')?.addEventListener('click', () => playPhoneme(slug, acc));
  document.getElementById('say-syl')?.addEventListener('click', () => playPhoneme(slug + '_syllable', acc));
  wireTryIt(app, () => {
    if (hasIso) { playPhoneme(slug, acc); return; }
    const w = p.examples.find(x => speakableWord(x, acc));
    if (w) speak(w, { lang, accent: acc });
  });
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang, accent: acc })));
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

// Tapping a locked node explains the prerequisite instead of doing nothing.
// A compact dialog: focus moves in, Esc/outside/✕ closes, focus returns to
// the node that opened it.
function showLockPop(btn, lesson, prev) {
  document.querySelectorAll('.path-pop').forEach(p => p.remove());
  const first = String(lesson.guide ?? '').split('. ')[0];
  const teaches = first ? (first.endsWith('.') ? first : first + '.').slice(0, 110) : '';
  const pop = document.createElement('div');
  pop.className = 'path-pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', `${lesson.title} — locked`);
  pop.setAttribute('tabindex', '-1');
  pop.innerHTML = `
    <div class="path-pop-head"><b>🔒 ${esc(lesson.title)}</b>
      <button class="path-pop-close" type="button" aria-label="Close">✕</button></div>
    <span>${esc(lessonKindName(lesson))} · ~${estMinutes(lesson)} min · +10 XP</span>
    ${teaches ? `<span>${esc(teaches)}${teaches.length === 110 ? '…' : ''}</span>` : ''}
    <span>Locked — finish “${esc(prev?.title ?? 'the lesson before')}” first.</span>`;
  btn.closest('.path-row').appendChild(pop);
  const dismiss = () => {
    pop.remove();
    document.removeEventListener('click', onDoc, true);
    document.removeEventListener('keydown', onKey);
    btn.focus();
  };
  const onDoc = e => { if (!pop.contains(e.target) && e.target !== btn) dismiss(); };
  const onKey = e => { if (e.key === 'Escape') dismiss(); };
  pop.querySelector('.path-pop-close').addEventListener('click', dismiss);
  setTimeout(() => { document.addEventListener('click', onDoc, true); document.addEventListener('keydown', onKey); }, 0);
  pop.focus();
}

// Build a track's winding lesson path. Shared by the full-page view
// (renderTrack) and the Lessons tab inside a dialect hub.
function buildTrackPath(track, opts = {}) {
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
      // Desktop label beside each node: what it is, without opening it. The
      // active node's side is taken by the mascot, so its label sits opposite.
      const labelSide = isActive ? (mascotSide === 1 ? 'l' : 'r') : (dx <= 0 ? 'r' : 'l');
      const meta = done ? `${esc(lessonKindName(l))} · ✓ done`
        : `${esc(lessonKindName(l))} · ~${estMinutes(l)} min · +10 XP`;
      const label = opts.labels ? `
        <div class="path-label side-${labelSide}" aria-hidden="true">
          <b>${esc(l.title)}</b><small>${meta}</small>
        </div>` : '';
      const a11y = `${l.title} — ${lessonKindName(l)}, about ${estMinutes(l)} minutes${done ? ', completed' : unlocked ? '' : ', locked'}`;
      return `
        <div class="path-row" style="--dx:${dx}px">
          <button class="path-node ${state} ${l.checkpoint ? 'checkpoint' : ''}" data-lesson="${l.id}"
                  ${unlocked ? '' : 'aria-disabled="true"'}
                  style="--dx:${dx}px; --node-color:${unit.color}" title="${esc(l.title)}" aria-label="${esc(a11y)}">
            ${isActive ? '<span class="start-flag">START</span>' : ''}
            <span class="path-icon ${face.ipa ? 'ipa' : ''}">${esc(face.text)}</span>
          </button>
          ${label}
          ${opts.labels && !done ? `<span class="path-mtitle" aria-hidden="true" style="--dx:${dx}px">${esc(l.title)}</span>` : ''}
          ${isActive ? `<div class="path-mascot" style="left:calc(50% + ${dx + mascotSide * 78}px)">🎭</div>` : ''}
        </div>`;
    }).join('');
    return `
      <div class="unit-banner" style="--unit-color:${unit.color}">
        <div class="unit-banner-info">
          <div class="unit-banner-label">${esc(track.title)} · Unit ${ui + 1}</div>
          <div class="unit-banner-title">${esc(unit.title)}</div>
        </div>
        ${opts.guidebook ? `<button class="guidebook-btn" data-unit="${esc(uid)}" type="button"
          aria-label="Guidebook for ${esc(unit.title)}" title="Unit guidebook">📘<span> Guidebook</span></button>` : ''}
      </div>
      <div class="path">${rows}</div>`;
  }).join('');

  const wire = (container) => {
    container.querySelectorAll('.guidebook-btn').forEach(btn =>
      btn.addEventListener('click', () => renderGuidebook(unitById[btn.dataset.unit], track)));
    container.querySelectorAll('.path-node[data-lesson]').forEach(btn =>
      btn.addEventListener('click', () => {
        const i = chain.findIndex(l => l.id === btn.dataset.lesson);
        const lesson = chain[i];
        if (!isUnlocked(lesson)) return showLockPop(btn, lesson, chain[i - 1]);
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

// The guide arrives in short steps — overview, one sound at a time, words,
// ready — instead of one long page. Nothing was cut; it is the same
// content, dosed.
function guideSteps(lesson) {
  const steps = [];
  if (lesson.guide) steps.push({ kind: 'overview' });
  (lesson.phonemes ?? []).forEach(ph => { if (PHONEMES[ph]) steps.push({ kind: 'phoneme', ph }); });
  const words = lesson.accent
    ? WORDS.filter(w => w.accent === lesson.accent && w.ipa.some(sy => (lesson.phonemes ?? []).includes(sy)))
    : [];
  if (words.length) steps.push({ kind: 'words', words });
  steps.push({ kind: 'ready' });
  return steps;
}

function guideStepHtml(lesson, s, st) {
  if (s.kind === 'overview') {
    const n = (lesson.phonemes ?? []).filter(ph => PHONEMES[ph]).length;
    return `
      <h1>${esc(lesson.title)}</h1>
      <p class="guide-text">${esc(lesson.guide ?? '')}</p>
      ${n ? `<p class="pane-note">${n} sound${n === 1 ? '' : 's'} ahead — one per step, each with audio and tongue placement.</p>` : ''}
      ${lesson.track?.id === 'core' ? '<button class="btn-lite" id="wii-link" type="button">New to IPA? Take the 3-minute introduction ›</button>' : ''}`;
  }
  if (s.kind === 'phoneme') {
    const p = PHONEMES[s.ph];
    const acc = lesson.accent ?? lesson.shiftTo ?? null;
    const chips = p.examples.map(w => wordChip(w, acc)).join('');
    const diagram = articulationSVG(s.ph);
    const isVowel = p.type !== 'consonant';
    // One-tap check so the step ends with doing, not just reading. Distractor
    // symbols come from this lesson where possible, so the check reinforces
    // exactly what the path is teaching.
    const others = (lesson.phonemes ?? []).filter(x => x !== s.ph && PHONEMES[x]);
    const pool = others.length >= 2 ? others
      : Object.keys(PHONEMES).filter(x => x !== s.ph && PHONEMES[x].type === p.type);
    const distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 2);
    const opts = [{ label: `/${s.ph}/`, ok: true }, ...distractors.map(x => ({ label: `/${x}/`, ok: false }))]
      .sort(() => Math.random() - 0.5);
    return `
      <h1 class="guide-step-sym">/${esc(s.ph)}/ · ${esc(p.name)}</h1>
      <div class="guide-card">
        ${(() => {
          const w = p.examples.find(x => speakableWord(x, acc));
          return w ? `<button class="guide-symbol" data-say="${esc(w)}" type="button"
                aria-label="Hear ${esc(s.ph)} in the word “${esc(w)}”">/${esc(s.ph)}/</button>`
            : `<div class="guide-symbol is-off" aria-label="Recordings for ${esc(s.ph)} coming soon">/${esc(s.ph)}/</div>`;
        })()}
        <div class="guide-info">
          <p>${esc(p.hint)}</p>
          <div class="chips">${chips}</div>
          ${diagram ? `<button class="diagram-toggle" data-target="dia-step" aria-expanded="false" type="button">📐 See tongue placement</button>` : ''}
        </div>
      </div>
      ${diagram ? `<div class="guide-diagram" id="dia-step" hidden>
        <div class="artic-wrap">${diagram}<p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>
      </div>` : ''}
      ${wiiQuestion(st, 'gq-' + s.ph, `Quick check — which symbol is the sound in “<b>${esc(p.examples[0])}</b>”?`, opts)}`;
  }
  if (s.kind === 'words') {
    const acc = lesson.accent ?? lesson.shiftTo ?? null;
    const row = w => `
      <div class="guide-word">
        ${wordChip(w.word, acc)}
        <span class="guide-ipa">/${w.ipa.join('')}/</span>
        <span class="guide-note">${esc(w.note ?? '')}</span>
      </div>`;
    // Grouped by the sound that makes each word worth knowing, a few at a
    // time — every word and its audio is still here, behind "show more".
    const used = new Set();
    const groups = [];
    for (const ph of (lesson.phonemes ?? [])) {
      if (!PHONEMES[ph]) continue;
      const g = s.words.filter(w => !used.has(w.word) && w.ipa.includes(ph));
      g.forEach(w => used.add(w.word));
      if (g.length) groups.push({ label: `/${ph}/ · ${PHONEMES[ph].name}`, words: g });
    }
    const rest = s.words.filter(w => !used.has(w.word));
    if (rest.length) groups.push({ label: 'More words', words: rest });
    return `
      <h1>${esc(dialectName(lesson.accent))} words to know</h1>
      ${groups.map(g => `
        <h2 class="guide-heading">${esc(g.label)}</h2>
        ${g.words.slice(0, 3).map(row).join('')}
        ${g.words.length > 3 ? `
          <details class="idiom-extra guide-more"><summary>Show ${g.words.length - 3} more</summary>
            ${g.words.slice(3).map(row).join('')}
          </details>` : ''}`).join('')}`;
  }
  // ready
  const syms = (lesson.phonemes ?? []).filter(ph => PHONEMES[ph]);
  return `
    <h1>Ready to drill</h1>
    ${syms.length ? `<div class="chips">${syms.map(ph =>
      `<button class="word-chip" data-say="${esc(PHONEMES[ph].examples[0])}" type="button">/${esc(ph)}/</button>`).join('')}</div>` : ''}
    <p class="pane-note">${esc(lessonKindName(lesson))} · ~${estMinutes(lesson)} min · +10 XP.
      You can reopen this guide from the path any time.</p>`;
}

function renderGuide(lesson, step = 0, st = { answered: {} }) {
  const unit = lesson.unit;
  const steps = guideSteps(lesson);
  const n = steps.length;
  const last = step === n - 1;
  app.innerHTML = `
    <header class="lesson-top">
      <button class="quit" id="quit" aria-label="Exit guide">✕</button>
      <div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${step + 1}"
           aria-label="Guide step ${step + 1} of ${n}"><div class="progress-fill" style="width:${Math.round((step + 1) / n * 100)}%"></div></div>
      <span class="step-count">${step + 1} of ${n}</span>
    </header>
    <main class="guide guide-stepped">
      <div class="guide-title-bar" style="--unit-color:${unit.color}">${esc(unit.title)} · ${esc(lesson.title)}</div>
      <section class="guide-step">${guideStepHtml(lesson, steps[step], st)}</section>
      <div class="guide-nav">
        ${step > 0 ? '<button class="btn" id="g-back" type="button">‹ Back</button>' : '<span></span>'}
        ${last ? '<button class="btn btn-primary" id="start" type="button">Start lesson</button>'
               : '<button class="btn btn-primary" id="g-next" type="button">Continue</button>'}
      </div>
    </main>`;

  document.getElementById('quit').addEventListener('click', () => renderTrack(lesson.track));
  document.getElementById('g-back')?.addEventListener('click', () => renderGuide(lesson, step - 1, st));
  document.getElementById('g-next')?.addEventListener('click', () => renderGuide(lesson, step + 1, st));
  document.getElementById('start')?.addEventListener('click', () => startLesson(lesson));
  document.getElementById('wii-link')?.addEventListener('click', openWhatIsIpa);
  wireWiiQuestions(app, st);
  app.querySelectorAll('[data-say]').forEach(btn =>
    btn.addEventListener('click', () => speak(btn.dataset.say, { lang: langFor(lesson), accent: lesson.accent ?? lesson.shiftTo ?? null }))
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
  // Land keyboard and screen-reader focus on the step's heading.
  const h = app.querySelector('.guide-step h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}

// ── Lesson session ────────────────────────────────────────────

function startLesson(lesson) {
  const free = lesson.practice || lesson.challenge;
  if (!free && store.hearts <= 0) return renderNoHearts(lesson);
  const session = {
    lesson,
    queue: generateLesson(lesson),
    index: 0,
    hearts: free ? Infinity : store.hearts,
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
      <div class="hearts">${s.lesson.practice || s.lesson.challenge ? '♾️' : '❤️'.repeat(Math.max(0, Math.min(s.hearts, HEART_MAX))) + '🖤'.repeat(Math.max(0, HEART_MAX - s.hearts))}</div>
    </header>
    <main class="exercise" data-accent="${s.lesson.accent ?? ''}">${body}</main>
    <footer class="feedback" id="feedback" aria-live="polite"></footer>`;
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
    ? `<button class="speaker" id="speaker" type="button" aria-label="Play audio" title="Play audio">🔊</button>`
    : '';
}

function exLang(s, ex) {
  return ex.lang ?? langFor(s.lesson);
}

// The accent whose clip folder should voice this exercise — the exercise's
// own accent (shift/ear questions play specific accents) or the lesson's.
function exAccent(s, ex) {
  return ex.accent ?? s.lesson.accent ?? s.lesson.shiftTo ?? null;
}

function wireAudio(s, ex, onFirstPlay) {
  const btn = document.getElementById('speaker');
  if (!btn) return;
  let played = false;
  btn.addEventListener('click', () => {
    speak(ex.audioText, { lang: exLang(s, ex), accent: exAccent(s, ex) });
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
    if (penalty && !s.lesson.practice && !s.lesson.challenge) { s.hearts--; store.loseHeart(); }
    s.mistakes++;
    // Remember which symbols this miss involved, for the results summary.
    try {
      s.missedSyms = s.missedSyms ?? new Set();
      const correctLabel = ex.choices?.find(c => c.ok)?.label ?? ex.display ?? '';
      for (const text of [correctLabel, ex.display]) {
        const re = /\/([^/\s]{1,4})\//g;
        let m;
        while ((m = re.exec(String(text ?? '')))) s.missedSyms.add(m[1]);
      }
    } catch { /* summary detail only */ }
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
  if (ex.audioText && !gated) setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex), accent: exAccent(s, ex) }), 300);

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
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex), accent: exAccent(s, ex) }), 300);

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
  setTimeout(() => speak(ex.audioText, { lang: exLang(s, ex), accent: exAccent(s, ex) }), 300);

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
    const heartBefore = store.hearts;
    const heartAfter = s.lesson.arcade ? heartBefore : store.gainHeart();  // mixed review earns a heart
    try { onLessonFinished({ xp, perfect, isGame: true }); } catch { /* quests are best-effort */ }
    const earnedHeart = heartAfter > heartBefore;
    const arcade = s.lesson.arcade;
    app.innerHTML = `
      <main class="end-screen">
        <div class="end-emoji">${arcade ? s.lesson.mode.icon : '🎯'}</div>
        <h1>${perfect ? (arcade ? 'Flawless round!' : 'Flawless practice!') : (arcade ? 'Round complete!' : 'Practice complete!')}</h1>
        <p class="end-xp">+${xp} XP${store.boostActive ? ' <span class="tag tag-skill">×2 boost</span>' : ''}${typeof earnedHeart !== 'undefined' && earnedHeart ? ' · +1 ❤️' : ''}</p>
        <div class="end-actions">
          <button class="btn btn-primary" id="again">${arcade ? 'Play again' : 'Practice again'}</button>
          <button class="btn" id="home">Done</button>
        </div>
      </main>`;
    document.getElementById('again').addEventListener('click', () =>
      startLesson(arcade ? modeLesson(s.lesson.mode, s.lesson.accent) : practiceLesson(s.lesson.track)));
    document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
    return;
  }
  const xp = 10 + (perfect ? 5 : 0);
  store.recordLesson(s.lesson.id, xp);
  const gems = perfect ? 15 : 10;
  store.addGems(gems);
  try { onLessonFinished({ xp, perfect, isGame: false }); } catch { /* quests are best-effort */ }
  const { done, total } = trackProgress(s.lesson.track);
  const mastered = done === total;
  const chk = s.lesson.checkpoint;

  // Completion summary: what this covered, how it went, what to look at
  // again, and the one obvious next step.
  const answered = Math.max(s.index, 1);
  const accuracy = Math.max(0, Math.round((answered - s.mistakes) / answered * 100));
  const learned = (s.lesson.phonemes ?? []).filter(ph => PHONEMES[ph]).slice(0, 8);
  const review = [...(s.missedSyms ?? [])].filter(sy => PHONEMES[sy]).slice(0, 4);
  const chain = s.lesson.track ? TRACK_LESSONS[s.lesson.track.id] : null;
  const next = chain?.find(l => !store.isCompleted(l.id) && isUnlocked(l));

  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">${mastered ? '🎓' : chk ? '🎲' : perfect ? '🏆' : '🎉'}</div>
      <h1>${mastered ? 'Course complete!' : chk ? 'Checkpoint cleared!' : perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      ${mastered ? `<p>${esc(s.lesson.track.title)} — mastered, start to finish.</p>` : ''}
      <p class="end-xp">+${xp} XP${store.boostActive ? ' <span class="tag tag-skill">×2 boost</span>' : ''} · +${gems} 💎${perfect ? ' (perfect bonus)' : ''}</p>
      <div class="end-summary" role="status">
        <div class="end-block"><span class="end-block-l">Accuracy</span><span class="end-block-v">${accuracy}%</span></div>
        ${learned.length ? `<div class="end-block"><span class="end-block-l">Covered</span>
          <span class="end-block-v end-syms">${learned.map(ph => `/${esc(ph)}/`).join(' ')}</span></div>` : ''}
        ${review.length ? `<div class="end-block"><span class="end-block-l">Worth another look</span>
          <span class="end-block-v end-syms">${review.map(sy => `/${esc(sy)}/`).join(' ')}</span></div>` : ''}
      </div>
      <div class="end-actions">
        ${next ? `<button class="btn btn-primary" id="end-next" type="button">Next: ${esc(next.title)} ›</button>` : ''}
        ${!next && review.length ? '<button class="btn btn-primary" id="end-practice" type="button">Practice the weak spots</button>' : ''}
        <button class="btn" id="home" type="button">Back to path</button>
      </div>
    </main>`;
  document.getElementById('end-next')?.addEventListener('click', () =>
    next.checkpoint ? startLesson(next) : renderGuide(next));
  document.getElementById('end-practice')?.addEventListener('click', startDailyRehearsal);
  document.getElementById('home').addEventListener('click', () => exitLesson(s.lesson));
}

function renderFail(s) {
  renderNoHearts(s.lesson, { failed: true });
}

// Shown when a lesson ends (or can't start) because the heart pool is empty.
function renderNoHearts(lesson, { failed = false } = {}) {
  const next = store.nextHeartMs;
  const mins = next ? Math.ceil(next / 60000) : 0;
  const wait = next ? (mins >= 60 ? `${Math.ceil(mins / 60)} h` : `${mins} min`) : '';
  app.innerHTML = `
    <main class="end-screen">
      <div class="end-emoji">💔</div>
      <h1>${failed ? 'Out of hearts' : 'No hearts left'}</h1>
      <p>${failed ? 'No XP this time — but the sounds are still there.' : ''}
         Mixed review earns a heart back${wait ? `, or the next one regenerates in ~${wait}` : ''}.</p>
      <div class="end-actions">
        ${lesson.track ? '<button class="btn btn-primary" id="nh-practice">🎯 Practice for a heart</button>' : ''}
        <button class="btn" id="nh-shop">💎 Shop</button>
        <button class="btn" id="nh-home">Done</button>
      </div>
    </main>`;
  document.getElementById('nh-practice')?.addEventListener('click', () => startLesson(practiceLesson(lesson.track)));
  document.getElementById('nh-shop').addEventListener('click', () => goSection('shop'));
  document.getElementById('nh-home').addEventListener('click', () => exitLesson(lesson));
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

if (location.hash === '#audit') renderAudioAudit();   // owner ear-check tool
else if (needsOnboarding()) renderOnboarding();
else renderHome();

// Typing #audit into the address bar mid-session works too — a bare hash
// change doesn't reload the page, so the boot check alone would miss it.
window.addEventListener('hashchange', () => {
  if (location.hash === '#audit') renderAudioAudit();
});
