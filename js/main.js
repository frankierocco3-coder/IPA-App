import { COURSE, TRACKS, MODES } from './data/course.js';
import { PHONEMES, WORDS } from './data/phonemes.js';
import { DIALECT_INFO } from './data/dialects.js';
import { CAPABILITIES } from './capabilities.js';
import { tryItHtml, performCaptureHtml } from './record-ui.js';
import { app, navStack, resetNav, setHomeHandler, setTeardownHooks, esc, record, goBack,
         pageTopbar, wireBrandHome, EMBLEM, BRAND_BTN, courseProgressHtml,
         runStepSequence, tileHtml, itemTileHtml, reviewStripHtml,
         groupStatus, workspacePage } from './ui.js';
import { generateLesson, phonemesForAccent } from './engine.js';
import { store, HEART_MAX } from './state.js';
import { speak, speakLine, speakSequence, stopSpeech, pauseSpeech, resumeSpeech, setSpeechListener, ACCENT_LANG, playPhoneme, hasPhonemeClip, hasWordClip, clipIndexLoaded } from './audio.js';
import { KNOWN_BAD as KNOWN_BAD_LIST } from './data/audio-flags.js';
import { voicesForCourse } from './data/voices.js';
import { LONGFORM_COVERAGE } from './data/audio-coverage.js';
import { RECASTS, TRANSPOSITION_LABELS, approvedTranspositions } from './data/recasts.js';
import { editionFor, allEditions, editionStatus, EDITION_CHUNKS,
         EDITION_CATALOG_COMPLETE, LEGACY_SONNETS } from './data/editions/index.js';
import { actionFor, actionDrafts, DIALECT_ACTION_LIVE } from './data/action.js';
import { videoFor } from './data/media-videos.js';
import { BRIDGE_ROUTES, routeFor, routeStatus, bridgeDrafts,
         playableComparisons, playableRoutesInto,
         loadBridgePrefs, saveBridgePrefs } from './data/bridge.js';
import { SPEECH_STAGES, SPEECH_MODULES, speechModuleGroups, speechReading,
         TEXTBOOK_PARTS, TEXTBOOK_END_MATTER, textbookOrder, partForChapter,
         chapterTitle, CHAPTER_TITLES, SPEECH_COLLECTIONS, SPEECH_LESSONS, speechLessonsFor,
         speechLessonById, collectionForLesson, moduleForLesson, lessonNumber, lessonKeywords,
         SPEECH_REVIEW_WHY, SPEECH_LESSON_EXTRAS,
         PRACTICE_PRINCIPLE_SHORT, SPEECH_SAFETY_LINE, SPEECH_COMFORT_LINE } from './data/speech/course.js';
import { glossaryTerm } from './data/speech/glossary.js';
import { ACTING_APPROACHES, APPROACH_DISCLAIMER } from './data/acting/approaches.js';
import { PRACTICE_SUBJECTS, ROUTINE_MODES, routinesFor, routineById,
         learnerRoutines, draftRoutines } from './data/speech/routines.js';
import { ARCADE_GROUPS, arcadeGamesFor, arcadeGameById, CIRCUMSTANCE_DECK,
         OBJECTIVE_DECK, OBSTACLE_DECK, TEMPO_DECK } from './data/speech/arcade.js';
import { SPEECH_TEXTS, speechTextById, speechTextBody } from './data/speech/texts.js';
import { parseScript, speechUnits, unitText, cuedSpeeches } from './script.js';
import { mountNotebook } from './notebook.js';
import { speechApproved, speechPublished, speechBodyVisible, speechReviewFor } from './data/speech/reviews.js';
import { SPEECH_GOALS, speechGoal, setSpeechGoal, speechLessonDone,
         markSpeechLessonDone, speechDoneCount, speechHistory, recordSpeechPractice,
         attachSpeechReflection, REFLECTION_CHOICES, wipeSpeechData } from './data/speech/store.js';
import { DIALECT_FACETS, DIALECT_VARIATION_LINE } from './data/speech/dialects.js';
import { ACTING_PRINCIPLE, ACTING_MODULES, ACTING_LESSONS, ACTING_COLLECTIONS,
         ACTING_GLOSSARY, actingLessonsFor, actingLessonById, actingModuleFor,
         actingLessonNumber } from './data/acting/course.js';
import { ACTING_GAMES, ACTING_DECKS, actingGameById,
         SCENE_STUDY_AREAS } from './data/acting/practice.js';
import { sceneStudyNotes, saveSceneStudyNote } from './data/acting/store.js';
import { articulationSVG, guideSVG, vocalTractSVG, vowelSpaceSVG } from './diagram.js';
import { articulationFor } from './data/articulation.js';
import { artFor, chartFor } from './data/articulation-art.js';
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
         searchProjects, STATUSES, CONTENT_TYPES, contentTypeLabel, splitLines } from './projects.js';
import { recordingSupported, startRecording, stopRecording, cancelRecording,
         isRecording, micErrorMessage, formatMs, MAX_RECORDING_MS } from './perform.js';
import { saveTake, listTakes, deleteTake, updateTake, setBestTake, takeUrl,
         releaseAllUrls, playUrl, RATINGS, deleteTakesFor, listAllTakes, deleteAllTakes,
         takesPresence } from './recordings.js';
import { dbSupported, STORES, idbClear, CONTENT_STORES, dbErrorMessage } from './db.js';
import { QUICK_QUESTIONS, DISSECT_SECTIONS, dissectQuestions, ANSWER_STATUS, newDissection, dissectionFor, putDissection,
         saveAnswer, deleteDissection, deleteDissectionsFor, materialTypeFrom,
         coverageLine, createSaver, MAX_ANSWER_LEN, attachImportedDissection } from './dissect.js';
import { questRows, claimQuest, onLessonFinished } from './quests.js';
import { PLAYABLE_ACTIONS, ACTION_VERBS, ACTION_VERB_FRAME, taughtActionFor,
         ACTION_PAIRS, ACTION_CATEGORIES, GOVERNING_QUESTION,
         ACTION_DISTINCTION, PAIR_LESSON, actionById, pairById, pairIndexOf,
         searchActions } from './data/playable.js';
import { readJsonFile, validateProjectBundle, validateDictionaryBundle,
         ValidationError, LIMITS, importResultMessage } from './validate.js';
import { resolvePronunciation, validateIpa, setPersonal, getPersonal, deletePersonal,
         listPersonal, exportPersonal, importPersonal, setProjectWordOverride,
         setOccurrenceOverride, clearOverridesFor, normWord } from './overrides.js';
import { recordAttempt, symbolBreakdown, confusionPairs, totals, dailyRehearsal,
         rehearsalTargets, resetAnalytics, hasEnoughData, accuracyLabel, CONFIDENCE,
         confidenceOf } from './analytics.js';

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




// Clickable brand lockup — emblem + wordmark stacked over the tagline.
// Appears in every page header and returns home.

// ── Navigation history: the back button walks this stack ──────
// Each sub-page records a thunk that re-renders it; goBack() pops the
// current page and re-runs the one beneath. Home is the root (empty stack).


// Everything audio-shaped that must not survive a page change: a live
// microphone capture, cached take object URLs, and the Perform pane's
// unsaved pending take (registered via performCleanup).
let performCleanup = null;
function teardownAV() {
  cancelRecording();                             // never leave the mic hot mid-navigation
  releaseAllUrls();
  try { performCleanup?.(); } catch { /* pane already gone */ }
  performCleanup = null;
}



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
  if (store.isCompleted(lesson.id)) return true;   // completed is ALWAYS replayable
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
// The ONE ordered nav config: the desktop sidebar and the mobile bottom
// nav both render straight from this array, so the two can never drift.
const SECTIONS = [
  { id: 'learn', icon: '🏠', label: 'Learn' },
  { id: 'practice', icon: '🎯', label: 'Practice' },
  { id: 'studio', icon: '🎬', label: 'Studio' },
  { id: 'library', icon: '📚', label: 'Library' },
  { id: 'progress', icon: '📈', label: 'Progress' },
  { id: 'more', icon: '⋯', label: 'More' },
];
// Shop and Profile live under More but are still full shell sections.
const OFF_NAV_SECTIONS = ['shop', 'profile'];
// Older saved states point at sections that have since moved.
const LEGACY_SECTIONS = { textbook: 'library', texts: 'library', quests: 'progress' };

// Every workspace carries the same six sections. Learn is an OPTIONAL
// guided pathway over the Library's records — never a prerequisite for
// reading them.
const activeCourse = () => {
  const c = localStorage.getItem('speechcraft-course');
  return COURSES.some(x => x.id === c) ? c : 'nam';
};

// ── Workspaces: Speech · Acting · IPA · Accents & Dialects ──
// One app, three connected work areas. The sidebar sections keep their
// names; their CONTENTS follow the active workspace. The selection is
// remembered locally; nothing about courses, progress or projects is
// duplicated or erased by switching.
const WORKSPACES = [
  { id: 'speech', icon: '🗣', label: 'Speech',
    context: 'Clarity, confidence, persuasion and vocal freedom' },
  { id: 'acting', icon: '🎭', label: 'Acting',
    context: 'Scene study, character, text and rehearsal' },
  { id: 'ipa', icon: 'ʃə', label: 'IPA',
    context: 'IPA Foundations — accent-neutral sound study' },
  { id: 'accents', icon: '🌍', label: 'Accents & Dialects',
    context: 'Accent and dialect courses' },
];
// ── Kill switch (2026-08-19, owner decision) ──────────────────
// The Speech workspace is withdrawn from the learner-facing app "for
// now": its content is thin next to Acting, and the full Speech build
// is deferred. NOTHING is deleted — every renderer, record, review and
// practice surface stays. The Speechcraft Textbook and Rhetoric &
// Oratory shelve in the Acting Library meanwhile. Flip to true and the
// Speech workspace returns whole.
const SPEECH_LIVE = false;
const liveWorkspaces = () => WORKSPACES.filter(w => SPEECH_LIVE || w.id !== 'speech');

// Workspaces that are about the work, not about an accent — they show
// no accent chip and no accent selector.
const ACCENTLESS_WORKSPACES = ['speech', 'acting'];
const WORKSPACE_KEY = 'speechcraft-workspace';
const activeWorkspace = () => {
  try {
    const v = localStorage.getItem(WORKSPACE_KEY);
    if (v === 'speech' && !SPEECH_LIVE) return 'acting';
    if (WORKSPACES.some(w => w.id === v)) return v;
    // Migration from the retired page-level tabs, then inference from
    // the stored course — existing users land exactly where they were.
    if (localStorage.getItem('speechcraft-learn-mode') === 'speech'
      || localStorage.getItem('speechcraft-practice-mode') === 'speech')
      return SPEECH_LIVE ? 'speech' : 'acting';
    return activeCourse() === 'core' ? 'ipa' : 'accents';
  } catch { return 'accents'; }
};
const setWorkspace = w => { try { localStorage.setItem(WORKSPACE_KEY, w); } catch {} };

// The course a workspace works in. IPA is always the accent-neutral
// core course; Accents & Dialects uses the stored dialect course (the
// stored value is preserved even while other workspaces are active).
const workspaceCourse = ws => {
  if (ws === 'ipa') return COURSES.find(c => c.id === 'core');
  const c = activeCourse();
  return COURSES.find(x => x.id === (c === 'core' ? 'nam' : c));
};
const setCourse = c => { try { localStorage.setItem('speechcraft-course', c); } catch {} };
const activeSection = () => {
  const raw = localStorage.getItem('speechcraft-section');
  const s = LEGACY_SECTIONS[raw] ?? raw;
  const ws = activeWorkspace();
  // A section the active workspace does not offer (a stored 'learn' in
  // Speech, say) resolves to that workspace's landing section — never a
  // blank page and never a redirect loop.
  if (!SECTIONS.some(x => x.id === s) && !OFF_NAV_SECTIONS.includes(s)) {
    return 'learn';
  }
  return s;
};
const setSection = s => { try { localStorage.setItem('speechcraft-section', s); } catch {} };

const trackFor = d => TRACKS.find(t => t.id === d);

setHomeHandler(() => renderHome());
setTeardownHooks(() => releaseTryIt(), () => teardownAV());

function renderHome() {
  renderShell(activeSection());
}

function goSection(id) {
  const ws = activeWorkspace();
  const target = SECTIONS.some(x => x.id === id) || OFF_NAV_SECTIONS.includes(id)
    ? id : 'learn';
  setSection(target);
  renderShell(target);
}

function renderShell(section) {
  stopSpeech();
  resetNav();
  setSection(section);
  window.scrollTo(0, 0);          // each section starts at its own top
  releaseTryIt();
  teardownAV();
  const ws = activeWorkspace();
  if (!SECTIONS.some(x => x.id === section) && !OFF_NAV_SECTIONS.includes(section)) {
    section = 'learn';
    setSection(section);
  }
  const course = workspaceCourse(ws);

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
        ${store.freePlay && !ACCENTLESS_WORKSPACES.includes(ws) ? '<p class="freeplay-note">Free play is on — every lesson is unlocked.</p>' : ''}
        <main id="shell-main"></main>
      </div>
      <aside class="right-rail">
        <div id="rail-quests"></div>
        <div id="rail-today"></div>
      </aside>
    </div>
    <nav class="bottom-nav" aria-label="Sections">
      ${SECTIONS.map(s => `<button class="bn-item ${s.id === section ? 'on' : ''}" data-sec="${s.id}" type="button">
          <span class="bn-icon">${s.icon}</span><span class="bn-label">${s.label}</span></button>`).join('')}
    </nav>`;

  document.getElementById('brand-home').addEventListener('click', () => goSection('learn'));
  app.querySelectorAll('[data-sec]').forEach(b =>
    b.addEventListener('click', () => goSection(b.dataset.sec)));

  drawStatsbar(course, section, ws);
  drawRail(section);

  const main = document.getElementById('shell-main');
  if (section === 'learn') learnMain(main, course, ws);
  else if (section === 'studio') studioMain(main);
  else if (section === 'practice') practiceMain(main, course, ws);
  else if (section === 'library') libraryMain(main, course, ws);
  else if (section === 'progress') progressMain(main);
  else if (section === 'shop') shopMain(main);
  else if (section === 'profile') profileMain(main);
  else moreMain(main);
  // The intro suppression is one landing render wide, whatever the section
  // — a tools-choice user's later Learn visit gets the intro as normal.
  skipCourseIntroOnce = false;
}

// ── Stats bar: course chip + streak / gems / hearts ───────────

function drawStatsbar(course, section, ws = activeWorkspace()) {
  const bar = document.getElementById('statsbar');
  const hearts = store.hearts;
  const wsDef = WORKSPACES.find(w => w.id === ws);
  // Before anything is earned, the economy stays out of the way: just the
  // workspace/context chips. The counters appear once a lesson pays out.
  // Speech and Acting are not governed by the pronunciation-game
  // economy: their counters and Free Play stay hidden there.
  const earned = store.hasEarnedAnything && !ACCENTLESS_WORKSPACES.includes(ws);
  // Header contract per workspace: Speech shows NO accent context at
  // all; IPA shows the fixed accent-neutral label; Accents & Dialects
  // keeps the full accent selector.
  const contextChip = ACCENTLESS_WORKSPACES.includes(ws) ? ''
    : ws === 'ipa' ? `
    <span class="stat-chip course-chip is-static" id="ipa-context" title="IPA Foundations">
      <span class="course-icon" aria-hidden="true">ʃə</span>
      <span class="course-name">IPA Foundations</span>
    </span>`
    : `
    <button class="stat-chip course-chip is-sub" id="course-chip" type="button"
            aria-haspopup="menu" aria-expanded="false" title="Switch course"
            aria-label="Change course. Current course: ${esc(course.label)}.">
      <span class="chip-prefix">Course</span>
      <span class="course-icon" aria-hidden="true">${course.icon}</span>
      <span class="course-name" aria-hidden="true">${esc(course.label)}</span> <span aria-hidden="true">▾</span>
    </button>`;
  bar.innerHTML = `
    <button class="stat-chip ws-chip" id="ws-chip" type="button"
            aria-haspopup="menu" aria-expanded="false" title="Switch workspace"
            aria-label="Change workspace. Current workspace: ${esc(wsDef.label)}.">
      <span class="course-icon" aria-hidden="true">${wsDef.icon}</span>
      <span class="course-name" aria-hidden="true">${esc(wsDef.label)}</span> <span aria-hidden="true">▾</span>
    </button>
    <div class="course-menu ws-menu" id="ws-menu" role="menu" hidden>
      <p class="course-menu-h">Workspaces</p>
      ${liveWorkspaces().map(w => `
        <button class="course-row ${w.id === ws ? 'on' : ''}" data-ws="${w.id}" role="menuitem" type="button">
          <span class="course-icon">${w.icon}</span>
          <span class="course-row-info"><b>${esc(w.label)}</b><small>${esc(w.context)}</small></span>
          ${w.id === ws ? '<span class="course-check">✓</span>' : ''}
        </button>`).join('')}
    </div>
    ${contextChip}
    ${earned ? `
    <span class="stat-chip" title="Streak"><span aria-hidden="true">🔥</span> ${store.displayStreak}<span class="sr-only"> day streak</span></span>
    <span class="stat-chip" title="Gems"><span aria-hidden="true">💎</span> ${store.gems}<span class="sr-only"> gems</span></span>
    <span class="stat-chip ${hearts === 0 ? 'chip-empty' : ''}" title="Hearts"><span aria-hidden="true">❤️</span> ${hearts}<span class="sr-only"> hearts</span></span>
    ${store.boostActive ? '<span class="stat-chip chip-boost" title="Double XP active">⚡×2</span>' : ''}` : ''}
    ${ACCENTLESS_WORKSPACES.includes(ws) ? '' : `
    <button class="freeplay ${store.freePlay ? 'on' : ''}" id="freeplay" aria-pressed="${store.freePlay}"
            aria-label="Free play: unlock all lessons" title="Free play: unlock all lessons">${store.freePlay ? '🔓' : '🔒'}</button>`}
    ${ws === 'accents' ? `
    <div class="course-menu" id="course-menu" role="menu" hidden>
      <p class="course-menu-h">My accent courses</p>
      ${COURSES.filter(c => c.id !== 'core').map(c => {
        const t = trackFor(c.id);
        const { done, total } = trackProgress(t);
        return `<button class="course-row ${c.id === course.id ? 'on' : ''}" data-course="${c.id}" role="menuitem" type="button">
          <span class="course-icon">${c.icon}</span>
          <span class="course-row-info"><b>${esc(c.label)}</b><small>${done}/${total} steps</small></span>
          ${c.id === course.id ? '<span class="course-check">✓</span>' : ''}
        </button>`;
      }).join('')}
      <p class="pane-note">IPA Foundations lives in the IPA workspace — switch workspaces to study it.</p>
    </div>` : ''}`;

  // Workspace menu — available in every workspace, on every section.
  const wsChip = bar.querySelector('#ws-chip');
  const wsMenu = bar.querySelector('#ws-menu');
  const wsClose = () => { wsMenu.hidden = true; wsChip.setAttribute('aria-expanded', 'false'); };
  wsChip.addEventListener('click', e => {
    e.stopPropagation();
    wsMenu.hidden = !wsMenu.hidden;
    wsChip.setAttribute('aria-expanded', String(!wsMenu.hidden));
  });
  wsMenu.querySelectorAll('[data-ws]').forEach(b =>
    b.addEventListener('click', () => {
      const target = b.dataset.ws;
      setWorkspace(target);
      const here = activeSection();
      // Keep the equivalent destination when it exists in the new
      // workspace; otherwise open that workspace's landing section.
      goSection(SECTIONS.some(x => x.id === here) ? here : 'learn');
    }));

  const chip = bar.querySelector('#course-chip');
  const menu = bar.querySelector('#course-menu');
  const close = () => {
    wsClose();
    if (menu) { menu.hidden = true; chip?.setAttribute('aria-expanded', 'false'); }
  };
  chip?.addEventListener('click', e => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
    chip.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', close, { once: true });
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  });
  menu?.querySelectorAll('.course-row').forEach(b =>
    b.addEventListener('click', () => { setCourse(b.dataset.course); renderShell(activeSection()); }));
  // Free play unlocks LESSON gating, which the Speech course does not
  // use — the control is hidden there rather than offering a no-op.
  bar.querySelector('#freeplay')?.addEventListener('click', () => {
    store.freePlay = !store.freePlay;
    renderShell(activeSection());
  });
}

// ── Right rail: quests mini-panel + today's rehearsal ─────────

function drawRail(section) {
  const q = document.getElementById('rail-quests');
  const ws = activeWorkspace();
  const inLearnOrPractice = section === 'learn' || section === 'practice';
  const cards = [];

  // 1 · Next step — every workspace. The working-text card belongs to
  //     Learn and Practice only: in the Library it points away from the
  //     content the learner came to read.
  if (ws === 'speech' || ws === 'acting') {
    const next = ws === 'acting'
      ? ACTING_LESSONS.filter(actingVisible).find(l => !speechLessonDone(l.id)) ?? null
      : nextSpeechLesson();
    const wt = inLearnOrPractice ? workingText() : null;
    if (inLearnOrPractice && !wt) {
      cards.push({ h: 'Next step', title: 'Choose a working text',
        note: 'Exercises that need text will use it — you can change it any time.',
        actions: [['Choose a text', () => renderWorkingTextPicker(), true]] });
    } else if (wt) {
      const ref = workingTextRef();
      cards.push({ h: 'Next step', title: wt.title,
        note: 'Your working text — exercises that need text will use it.',
        actions: [
          ...(ref?.source === 'studio' ? [['Open text', () => renderProject(ref.id, 'text'), false]] : []),
          ['Change text', () => renderWorkingTextPicker(), false],
          ['Practice this text', () => needWorkingText(t => renderSpeechExerciseChooser(t)), true],
        ] });
    } else if (next) {
      cards.push({ h: 'Next step', title: next.title,
        note: ws === 'acting' ? 'Continue the acting course.' : 'Continue the Speech course.',
        actions: [['Continue', () => ws === 'acting' ? renderActingLesson(next.id) : renderSpeechLesson(next.id), true]] });
    } else {
      cards.push({ h: 'Next step', title: 'Browse the Library',
        note: 'Every chapter is free to read in any order.',
        actions: [['Open the Library', () => goSection('library'), true]] });
    }
  } else {
    const track = trackFor(activeCourse());
    const { done, total } = trackProgress(track);
    cards.push({ h: 'Next step',
      title: done >= total ? 'Practice to keep it sharp' : 'Continue your course',
      note: `${done} of ${total} lessons complete.`,
      actions: [['Open Learn', () => goSection('learn'), true]] });
  }

  // 2 · Daily Quests — a KIND of next step, so it renders inside the
  //     same rail rather than replacing it. Dialect drills only, which
  //     is where the scored economy lives.
  const questsHtml = (ws === 'ipa' || ws === 'accents') && store.hasEarnedAnything
    ? questRows().map(r => `
        <div class="quest-row mini">
          <span class="quest-icon">${r.icon}</span>
          <div class="quest-info">
            <span class="quest-title">${esc(r.title)}</span>
            <div class="quest-bar"><div style="width:${Math.round(r.done / r.target * 100)}%"></div>
              <span class="quest-count">${r.done}/${r.target}</span></div>
          </div>
          ${r.complete ? (r.claimed ? '<span class="quest-done">✓</span>' : '<span class="quest-chest">🎁</span>') : ''}
        </div>`).join('')
    : '';

  q.innerHTML = cards.map((c, i) => `
    <section class="rail-card">
      <div class="rail-head"><h2>${esc(c.h)}</h2></div>
      <p class="rail-next-title" data-t="${i}"></p>
      <p class="pane-note" data-n="${i}"></p>
      <div class="rail-actions" data-a="${i}"></div>
    </section>`).join('')
    + (questsHtml ? `
    <section class="rail-card">
      <div class="rail-head"><h2>Daily Quests</h2>
        <button class="btn-lite" id="rail-quests-all" type="button">View all</button></div>
      ${questsHtml}
      <p class="pane-note">Quests track the scored dialect drills.</p>
    </section>` : '');

  cards.forEach((c, i) => {
    q.querySelector(`[data-t="${i}"]`).textContent = c.title;
    q.querySelector(`[data-n="${i}"]`).textContent = c.note;
    const box = q.querySelector(`[data-a="${i}"]`);
    for (const [label, go, primary] of c.actions) {
      const b = document.createElement('button');
      b.className = primary ? 'btn btn-primary' : 'btn-lite';
      b.type = 'button'; b.textContent = label;
      b.addEventListener('click', go);
      box.appendChild(b);
    }
  });
  q.querySelector('#rail-quests-all')?.addEventListener('click', () => goSection('progress'));
  const t = document.getElementById('rail-today');
  t.innerHTML = section === 'practice' || ws === 'speech' || ws === 'acting' ? '' : dailyRehearsalCard();
  t.querySelector('#today-start')?.addEventListener('click', startDailyRehearsal);
}

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
// never again. It has no replay surface, and the card says so plainly —
// the same material is taught in the course's own orientation lessons.

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
      <p class="pane-note">This introduction appears only on your first visit.</p>
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

// Each course's own descriptive surface was removed on 2026-08-17: there is
// no such page, and the check below is a plain text scan, so do not write
// its former name here. DIALECT_INFO (js/data/dialects.js) is
// still the Dialect Accuracy Standard of record — it feeds the IPA
// inventory's realizations and rhythm notes, dialect_lint, and the citation
// list in More → Sources & Credits. It just has no page of its own.

// ── Learn: contents follow the active workspace ───────────────
// (The 2026-08-13 IA replaced the page-level tabs with the persistent
// workspace selector in the stats bar — sections dispatch on it.)
// Learn belongs to the progressive courses only (IPA, Accents &
// Dialects). Speech and Acting have no Learn section — their Library
// is the authoritative reading surface.
function learnMain(el, course, ws = activeWorkspace()) {
  if (ws === 'acting') return actingLearnPane(el);
  if (ws === 'speech') return speechLearnPane(el);
  ipaLearnPane(el, course);
}

function ipaLearnPane(el, course) {
  const track = trackFor(course.id);
  const { done, total } = trackProgress(track);
  // On an UNSTARTED course the path's own Stage 1 · Orientation start node
  // is the single clear entry — a continue card here would duplicate
  // "Meet the accent" above Unit 1. It appears once real progress exists.
  const cc = done > 0 ? continueCard(track, course) : null;
  const path = buildTrackPath(track, { guidebook: true, labels: true });
  // One-time invitation for grandfathered users (verbatim copy — it must
  // not block), and the diagnostic offer, which retires only when the
  // diagnostic has been taken or declined (never on mere XP). This offer
  // card is the diagnostic's ONLY doorway — the Practice-page shortcut
  // was removed by owner order 2026-08-12.
  // No optional offer cards (owner order, 2026-08-20). Learn opens on the
  // course, not on things to decline. The preface lives permanently in
  // More → Why Speech Matters; the diagnostic in More → Preferences.

  el.innerHTML = `
    <h1 class="sr-only">Learn — ${esc(course.label)}</h1>
    ${cc ? cc.html : ''}
    ${course.id === 'core' ? whatIsIpaCard() : ''}
    <div class="hub-progress">
      <div class="track-progress">
        <div class="track-progress-bar"><div style="width:${total ? Math.round(done / total * 100) : 0}%"></div></div>
        <span>${done}/${total}${done === total && total ? ' · 🎓 mastered' : ''}</span>
      </div>
    </div>
    <div class="track-scroll hub-scroll">${path.html}</div>`;
  cc?.wire(el);
  wireWhatIsIpaCard(el);
  path.wire(el);
  if (course.id === 'ssbe' && !store.introsSeen.ssbe && !skipCourseIntroOnce) showSsbeIntro(course);
}

// Per-unit guidebook: what the unit teaches, in one readable page.
function renderGuidebook(unit, track) {
  record(() => renderGuidebook(unit, track));
  const sections = unit.lessons.map(l => {
    const gbAcc = TRACK_ACCENT[track?.id] ?? null;
    const chips = (l.phonemes ?? []).map(ph => {
      if (!PHONEMES[ph]) return '';
      // Realizations wear [brackets]; phonemes wear /slashes/.
      const shown = PHONEMES[ph].allophone ? `[${esc(ph)}]` : `/${esc(ph)}/`;
      const w = PHONEMES[ph].examples.find(x => speakableWord(x, gbAcc));
      return w ? `
      <button class="word-chip" data-sym="${esc(ph)}" data-say="${esc(w)}"
              aria-label="Hear ${esc(ph)} in the word “${esc(w)}”"
              title="${esc(PHONEMES[ph].name)} — hear it in “${esc(w)}”">${shown}</button>` : `
      <span class="word-chip is-off" aria-label="${esc(PHONEMES[ph].name)} — recordings coming soon">${shown}</span>`;
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

// ── Practice: contents follow the active workspace ────────────
function practiceMain(el, course, ws = activeWorkspace()) {
  if (ws === 'acting') return actingPracticePane(el);
  if (ws === 'speech') return speechPracticePane(el);
  ipaPracticePane(el, course);
}

function ipaPracticePane(el, course) {
  const d = course.id === 'core' ? null : course.id;
  const track = trackFor(course.id);
  const name = d ? dialectName(d) : 'Core IPA';
  // Accent Bridge earns its Listening card only when an approved route
  // INTO this course exists with at least one both-clips comparison.
  const bridgeRoutes = d ? playableRoutesInto(d, hasWordClip) : [];

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
    <h2 class="chart-h">Quick Practice</h2>
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
        ${g.title === 'Listening' && bridgeRoutes.length ? `
          <button class="mode-card" id="mode-bridge" type="button">
            <span class="mode-icon" aria-hidden="true">🌉</span>
            <span class="mode-title">Accent Bridge</span>
            <span class="mode-blurb">Start accent and target, ear to ear.</span>
            <span class="mode-meta">~4 min · 🎧 audio</span>
          </button>` : ''}
      </div>`).join('')}`;

  el.querySelector('#quick-practice').addEventListener('click', () =>
    targeted ? startDailyRehearsal() : startLesson(practiceLesson(track)));
  el.querySelector('#hub-mixed')?.addEventListener('click', () => startLesson(practiceLesson(track)));
  el.querySelector('#mode-bridge')?.addEventListener('click', () => renderBridgeSetup(d));
  el.querySelector('#today-start')?.addEventListener('click', startDailyRehearsal);
  el.querySelector('#hub-idiom-drill')?.addEventListener('click', () => startLesson(idiomLesson(d, track)));
  el.querySelectorAll('.mode-card[data-mode]').forEach(b =>
    b.addEventListener('click', () => startLesson(modeLesson(MODES.find(m => m.id === b.dataset.mode), d))));
}

// ══ THE SPEECH SYSTEM (written & interactive only) ════════════
// No audio, synthesis, recording, microphone, playback, video or
// external AI anywhere below. All user/Studio text renders through
// esc()/textContent — never raw HTML. Draft gating: professional-tier
// content bodies (Stage 1 anatomy/health, Approaches to Acting) are
// never learner-facing until approved in js/data/speech/reviews.js;
// only batch-1 routines reach learners; Context Shift stays hidden.

// ── Learn → Speech ────────────────────────────────────────────
// The authoritative content census — every displayed count derives
// from the records themselves, never from a hardcoded number.
function speechCensus() {
  const available = SPEECH_LESSONS.filter(l => speechBodyVisible(l));
  const awaiting = SPEECH_LESSONS.filter(l => !speechBodyVisible(l));
  // Acting approach introductions moved to the Acting workspace on
  // 2026-08-13 — they are no longer counted as Speech drafts.
  return { total: SPEECH_LESSONS.length, available, awaiting };
}

// Every Speech draft awaiting review, grouped by KIND and reviewer —
// counts derived from the records, never typed in. Adding a new draft
// category here is the only way a number changes.
function speechReviewCategories() {
  const { awaiting } = speechCensus();
  const groups = [
    { id: 'chapters', label: 'Speech course chapters', shortLabel: 'course chapters',
      reviewer: 'Voice professional or speech-language pathologist',
      count: awaiting.length,
      items: awaiting.map(l => ({
        id: l.id, title: l.title, kind: 'chapter',
        collection: collectionForLesson(l)?.title ?? '—',
        reviewer: 'Voice professional or speech-language pathologist',
        why: SPEECH_REVIEW_WHY[l.id] ?? 'Health or anatomy content requires professional confirmation before it is taught.',
        concerns: 'Health and anatomy accuracy; non-diagnostic, non-prescriptive framing; no universal posture, support or tongue-position claim; sources paraphrased, never copied.',
        sources: l.sources ?? [],
        file: 'js/data/speech/course.js',
        record: l,
      })) },
  ].filter(g => g.count > 0);
  return { groups, total: groups.reduce((n, g) => n + g.count, 0) };
}

// Neutral governance line — learner-facing surfaces never name the
// model that drafted the copy.
const AI_DRAFT_NOTE =
  'AI-assisted educational drafts require approval from a named, qualified human reviewer.';
const DRAFT_VISIBILITY_NOTE =
  'Draft copy is review-only. Learners can see its title and review status.';

// The ordered spine of the course: every AVAILABLE lesson, in module
// order. Prepared drafts are not part of the sequence (they cannot be
// studied yet) but their module still shows what is waiting.
const speechCourseSequence = () =>
  SPEECH_MODULES.flatMap(m => speechLessonsFor(m.stage)).filter(l => speechBodyVisible(l));

const nextSpeechLesson = () => speechCourseSequence().find(l => !speechLessonDone(l.id)) ?? null;

// ── Speech → Learn: the optional guided pathway ───────────────
// It sequences the SAME chapter records the Library shelves and adds
// objective, practice doorways and progress. The complete chapter is
// always read through the Library route — never copied here.
const SPEECH_MODULE_TONE = { 1: 'is-sage', 2: 'is-terracotta', 3: 'is-blue', 4: 'is-lavender' };
const SPEECH_MODULE_META = {
  1: 'Why parts-then-whole practice works',
  2: 'Body, breath, voice, articulation and vocal care',
  3: 'Explore pace, emphasis, intention and urgency',
  4: 'Bring voice, thought, listening and movement together',
};


function speechLearnPane(el) {
  const seq = speechCourseSequence();
  const doneCount = seq.filter(l => speechLessonDone(l.id)).length;
  const next = nextSpeechLesson();
  const nextModule = next ? moduleForLesson(next) : null;
  const pct = seq.length ? Math.round(doneCount / seq.length * 100) : 0;

  el.innerHTML = `
    <div class="ws-head">
      <h1 class="page-h">Speech Course</h1>
      <p class="ws-sub">An optional guided route through the Speech Library. Every chapter stays free to read in any order.</p>
    </div>
    ${next ? `
    <section class="continue-card" aria-label="Continue learning">
      <div class="cc-info">
        <span class="cc-stage">${esc((nextModule?.title ?? '').toUpperCase())}</span>
        <h2>${esc(next.title)}</h2>
        <p class="cc-meta">${esc(SPEECH_LESSON_EXTRAS[next.id]?.objective ?? '')}</p>
        ${courseProgressHtml(doneCount, seq.length)}
      </div>
      <button class="btn btn-primary cc-go" id="sp-continue" type="button">${doneCount ? 'Continue lesson' : 'Start course'}</button>
    </section>`
    : `
    <section class="continue-card" aria-label="Course complete">
      <div class="cc-info">
        <h2>Every available lesson complete</h2>
        <p class="cc-meta">More chapters are prepared and waiting on professional review — they join the pathway as they are approved.</p>
        ${courseProgressHtml(seq.length, seq.length)}
      </div>
      <button class="btn btn-primary cc-go" id="sp-to-library" type="button">Browse the Library</button>
    </section>`}
    <p class="pane-note sp-explore-more">
      <button class="linkish" id="sp-to-textbook" type="button">Browse all chapters in the Speechcraft Textbook</button>
    </p>`;

  el.querySelector('#sp-continue')?.addEventListener('click', () => renderSpeechLesson(next.id));
  el.querySelector('#sp-to-library')?.addEventListener('click', () => goSection('library'));
  el.querySelector('#sp-to-textbook').addEventListener('click', renderTextbook);
}

function renderSpeechModule(n) {
  record(() => renderSpeechModule(n));
  stopSpeech();
  const m = SPEECH_MODULES.find(x => x.n === n);
  if (!m) return goSection('learn');
  const lessons = speechLessonsFor(m.stage);
  const avail = lessons.filter(l => speechBodyVisible(l));
  const done = avail.filter(l => speechLessonDone(l.id)).length;
  const st = groupStatus({ available: avail.length, done, prepared: lessons.length - avail.length });
  const nextId = nextSpeechLesson()?.id;
  workspacePage(
    pageTopbar('🧭 Speech Course', '#6f8657'),
    `<div class="ws-head">
       <h1 class="page-h">${esc(m.title)}</h1>
       <p class="ws-sub"><span class="badge ${st.cls}">${esc(st.label)}</span>
         ${avail.length ? ` · ${done} of ${avail.length} lessons completed` : ` · ${lessons.length} chapters prepared`}</p>
       ${avail.length ? `<div class="bar" role="img" aria-label="${done} of ${avail.length} lessons complete"><i style="width:${Math.round(done / avail.length * 100)}%"></i></div>` : ''}
     </div>`,
    speechModuleGroups(n).map(g => `
       <section class="mod-group">
         <h2 class="sec-h">${esc(g.title)}</h2>
         <p class="pane-note">${esc(g.blurb)}</p>
         <div class="chapter-rows">
           ${g.lessons.map(id => speechLessonById(id)).filter(Boolean).map(l => {
             const visible = speechBodyVisible(l);
             const isDone = speechLessonDone(l.id);
             const mark = !visible ? '◌' : isDone ? '✓' : l.id === nextId ? '▸' : '○';
             return `
             <button class="chapter-row ${!visible ? 'is-pending' : l.id === nextId ? 'is-current' : ''}"
                     data-item="${esc(l.id)}" type="button">
               <span class="ch-mark" aria-hidden="true">${mark}</span>
               <span class="ch-title">${esc(chapterTitle(l.id))}</span>
               ${!visible ? '<span class="badge is-pending">Review pending</span>'
                 : isDone ? '<span class="sr-only">Completed</span>'
                 : l.id === nextId ? '<span class="badge is-progress">Current</span>' : ''}
               <span class="tile-chev" aria-hidden="true">›</span>
             </button>`;
           }).join('')}
         </div>
       </section>`).join(''));

  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => renderSpeechLesson(b.dataset.item)));
}

// Per-workspace Library search state.
const libState = { speech: { query: '' }, acting: { query: '' }, dialect: { query: '' } };
let speechLibQuery = '';

// Collection identity: one tone and one emoji per collection, applied
// only at collection level.
const SPEECH_COLLECTION_TONE = {
  principles: 'is-sage', instrument: 'is-terracotta',
  meaning: 'is-blue', presence: 'is-lavender',
};

// ── Speech → Library: COLLECTIONS ONLY ────────────────────────
// The landing page never lists chapter titles. Hierarchy:
// Speech workspace → Library → Collection → Chapter.
function speechLibraryPane(el) {
  const cards = [
    { key: 'textbook', tone: 'is-sage', emoji: '📗', title: 'Speechcraft Textbook',
      count: textbookOrder().length, unit: 'chapter',
      keywords: 'principles instrument meaning presence chapters parts',
      go: renderTextbook },
    { key: 'texts', tone: 'is-terracotta', emoji: '📜', title: 'Scripts & Speeches',
      count: SONNETS.length + Object.values(LIBRARIES).reduce((n, l) => n + l.data.length, 0),
      unit: 'text', keywords: 'sonnets scenes monologues speeches shakespeare',
      go: renderTextsPage },
    { key: 'rhetoric', tone: 'is-gold', emoji: '🏛', title: 'Rhetoric & Oratory',
      count: 3, unit: 'dialogue', keywords: 'plato gorgias phaedrus republic jowett persuasion',
      go: renderReadingPathway },
    // Dialects in Speech folded in here — a one-topic card is an honest
    // label on an unfinished thing, but not a top-level shelf.
    { key: 'ipa', tone: 'is-blue', emoji: 'ʃə', title: 'IPA, Sound & Dialect Reference',
      count: 5, unit: 'reference',
      keywords: 'ipa chart vowel map instrument dialects in speech accent',
      go: renderSpeechIpaReference },
  ];
  workspaceLibrary(el, { workspace: 'Speech', cards, state: libState.speech });
}

// Shared IPA, sound and dialect references, reached from the Speech
// Library. Every entry opens the ONE authoritative surface — nothing is
// copied. "Dialects in Speech" folded in here rather than standing as a
// one-topic top-level card.
function renderSpeechIpaReference() {
  record(renderSpeechIpaReference);
  stopSpeech();
  workspacePage(
    pageTopbar('ʃə IPA, Sound & Dialect Reference', '#6f8657'),
    `<div class="ws-head">
       <h1 class="page-h">IPA, Sound &amp; Dialect Reference</h1>
       <p class="ws-sub">5 references · these live in the IPA and Accents workspaces and are linked, never copied.</p>
     </div>`,
    `<div class="item-grid">
       ${itemTileHtml({ key: 'what', title: 'What Is IPA?', note: 'The alphabet of sounds, and why it helps' })}
       ${itemTileHtml({ key: 'chart', title: 'IPA Chart', note: 'Every sound across the courses' })}
       ${itemTileHtml({ key: 'instrument', title: 'Your Instrument', note: 'A tour of the vocal tract' })}
       ${itemTileHtml({ key: 'vowels', title: 'Vowel Map', note: 'Where every vowel sits in the mouth' })}
       ${itemTileHtml({ key: 'dialects', title: 'Dialects in Speech', note: 'How dialect shapes rhythm, register and use' })}
     </div>`);
  const go = { what: renderChart, chart: renderChart, instrument: renderInstrument,
    vowels: renderVowelMap, dialects: renderDialectsInSpeech };
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => (go[b.dataset.item] ?? renderChart)()));
}

// ── The Speechcraft Textbook: one table of contents ───────────
// Parts I–IV over the SAME canonical chapter records the guided course
// uses. Nothing is duplicated; renames are display-only.
function renderTextbook() {
  record(renderTextbook);
  stopSpeech();
  const row = id => {
    const l = speechLessonById(id);
    const visible = speechBodyVisible(l);
    const done = speechLessonDone(id);
    return `
      <button class="chapter-row ${visible ? '' : 'is-pending'}" data-ch="${esc(id)}" type="button">
        <span class="ch-mark" aria-hidden="true">${!visible ? '◌' : done ? '✓' : '○'}</span>
        <span class="ch-title">${esc(chapterTitle(id))}</span>
        ${visible ? (done ? '<span class="sr-only">Read</span>' : '')
          : '<span class="badge is-pending">Review pending</span>'}
        <span class="tile-chev" aria-hidden="true">›</span>
      </button>`;
  };
  workspacePage(
    pageTopbar('📗 Speechcraft Textbook', '#6f8657'),
    `<div class="ws-head">
       <h1 class="page-h">Speechcraft Textbook</h1>
       <p class="ws-sub">${textbookOrder().length} chapters in four parts. Read in any order.</p>
     </div>`,
    TEXTBOOK_PARTS.map(p => `
      <section class="tb-part ${p.tone}">
        <h2 class="tb-part-h"><span class="tb-part-n">Part ${p.n}</span>${esc(p.title)}</h2>
        <div class="chapter-rows">${p.chapters.map(row).join('')}</div>
        ${(p.subsections ?? []).map(sub => `
          <h3 class="tb-sub-h">${esc(sub.title)}</h3>
          <div class="chapter-rows">${sub.chapters.map(row).join('')}</div>`).join('')}
      </section>`).join('')
    + `<section class="tb-end">
         <h2 class="sec-h">End matter</h2>
         <p class="pane-note">Reserved for the editorial audit — these sections are planned, and none is published yet:
           ${TEXTBOOK_END_MATTER.map(e => esc(e.title)).join(' · ')}.</p>
       </section>`);
  app.querySelectorAll('[data-ch]').forEach(b =>
    b.addEventListener('click', () => renderSpeechChapter(b.dataset.ch)));
}

// ── A Speech collection page: its chapters, nothing else ──────
function renderSpeechCollection(collectionId) {
  record(() => renderSpeechCollection(collectionId));
  stopSpeech();
  const c = SPEECH_COLLECTIONS.find(x => x.id === collectionId);
  if (!c) return goSection('library');
  const lessons = speechLessonsFor(c.stage);
  workspacePage(
    pageTopbar('📚 Speech Library', '#6f8657'),
    `<div class="ws-head">
       <h1 class="page-h"><span class="tile-emoji" aria-hidden="true">${c.icon}</span>${esc(c.title)}</h1>
       <p class="ws-sub">${lessons.length} chapter${lessons.length === 1 ? '' : 's'} · Speech Library</p>
     </div>`,
    `<p class="pane-note">Read in any order. This sequence is a suggested starting point.</p>
     <div class="item-grid">
       ${lessons.map((l, i) => itemTileHtml({
         key: l.id, seq: String(i + 1).padStart(2, '0'),
         title: l.title,
         note: speechBodyVisible(l) ? '' : 'Prepared draft — awaiting professional review',
         state: speechBodyVisible(l) ? '' : 'is-pending',
       })).join('')}
       ${collectionId === 'instrument'
         ? itemTileHtml({ key: 'instrument-visual', title: 'Your Instrument',
             note: 'The visual vocal-tract reference' }) : ''}
     </div>`);
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => b.dataset.item === 'instrument-visual'
      ? renderInstrument()
      : renderSpeechChapter(b.dataset.item)));
}

function renderSpeechFurtherStudy() {
  record(renderSpeechFurtherStudy);
  stopSpeech();
  workspacePage(
    pageTopbar('📚 Speech Library', '#6f8657'),
    `<div class="ws-head">
       <h1 class="page-h"><span class="tile-emoji" aria-hidden="true">📚</span>Further Study</h1>
       <p class="ws-sub">1 topic · Speech Library</p>
     </div>`,
    `<div class="item-grid">
       ${itemTileHtml({ key: 'dialects', title: 'Dialects in Speech',
         note: 'How dialect shapes rhythm, register and use' })}
     </div>`);
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', renderDialectsInSpeech));
}

// ── The review area: inventory first, then one draft at a time ──
// Prepared material is never described as missing. Counts derive from
// the records. Nothing here approves anything.
let speechReviewFilter = 'all';

function renderSpeechReviewStatus() {
  record(renderSpeechReviewStatus);
  stopSpeech();
  const cats = speechReviewCategories();
  const groups = speechReviewFilter === 'all'
    ? cats.groups : cats.groups.filter(g => g.id === speechReviewFilter);
  const shown = groups.reduce((n, g) => n + g.count, 0);

  app.innerHTML = `
    ${pageTopbar('📝 Review status', '#6f8657')}
    <main class="guide sp-review">
      <h1 tabindex="-1" id="sp-h">Prepared and awaiting professional review</h1>
      <p class="guide-text">${cats.total} Speech draft(s) are fully written and waiting on a qualified human reviewer. Nothing here is missing or unfinished — every word can be opened and read below.</p>
      <p class="pane-note">${esc(AI_DRAFT_NOTE)} Counts are computed from the content records; no status changes without a named reviewer and date.</p>
      <div class="chip-row sp-review-filters" role="group" aria-label="Filter the review inventory">
        <button class="chip-pick ${speechReviewFilter === 'all' ? 'on' : ''}" data-filter="all" type="button"
          aria-pressed="${speechReviewFilter === 'all'}">All (${cats.total})</button>
        ${cats.groups.map(g => `
          <button class="chip-pick ${speechReviewFilter === g.id ? 'on' : ''}" data-filter="${g.id}" type="button"
            aria-pressed="${speechReviewFilter === g.id}">${esc(g.label)} (${g.count})</button>`).join('')}
      </div>
      <p class="pane-note" aria-live="polite">${shown} item(s) shown.</p>
      ${groups.map(g => `
        <h2 class="guide-heading">${esc(g.label)} — ${g.count}</h2>
        <p class="pane-note">Required reviewer: ${esc(g.reviewer)}.</p>
        <table class="sp-inventory">
          <caption class="sr-only">${esc(g.label)} awaiting review</caption>
          <thead><tr><th scope="col">Title</th><th scope="col">Collection</th><th scope="col">Status</th>
            <th scope="col">Learner visibility</th><th scope="col">Draft</th></tr></thead>
          <tbody>
            ${g.items.map(it => `
              <tr>
                <th scope="row">${esc(it.title)}</th>
                <td>${esc(it.collection)}</td>
                <td><span class="sp-badge">Prepared draft — awaiting professional review</span></td>
                <td>Title and status visible; copy is review-only</td>
                <td><button class="btn-lite" data-open-draft="${esc(it.id)}" type="button">Open draft</button></td>
              </tr>`).join('')}
          </tbody>
        </table>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelector('#sp-h').focus();
  app.querySelectorAll('[data-filter]').forEach(b =>
    b.addEventListener('click', () => {
      speechReviewFilter = b.dataset.filter;
      navStack.pop();
      renderSpeechReviewStatus();
    }));
  app.querySelectorAll('[data-open-draft]').forEach(b =>
    b.addEventListener('click', () => renderSpeechDraft(b.dataset.openDraft)));
}

// One prepared draft, presented for reading. Internal identifiers live
// inside a collapsed "Review details" section so the copy reads clean.
function renderSpeechDraft(itemId) {
  record(() => renderSpeechDraft(itemId));
  stopSpeech();
  const cats = speechReviewCategories();
  const item = cats.groups.flatMap(g => g.items).find(i => i.id === itemId);
  if (!item) return renderSpeechReviewStatus();

  const copy = item.kind === 'chapter'
    ? speechChapterBlocks(item.record, { interactive: false })
    : (() => {
        const s = item.record.sections;
        const part = (h, t) => `<h2 class="guide-heading">${esc(h)}</h2><p class="guide-text">${esc(t)}</p>`;
        return part('Historical background', s.background)
          + part('Central principles', s.principles)
          + part('Important terminology', s.terminology)
          + part('How the approach works', s.considers)
          + `<h2 class="guide-heading">Questions it invites an actor to ask</h2>
             <ul class="th-list">${s.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>`
          + part('Common misunderstandings', s.misunderstandings)
          + `<p class="pane-note">${esc(APPROACH_DISCLAIMER)}</p>`;
      })();

  const review = speechReviewFor(item.id);
  app.innerHTML = `
    ${pageTopbar('📝 ' + esc(item.title), '#6f8657')}
    <main class="guide sp-draft">
      <p class="pane-note">${esc(item.collection)}</p>
      <h1 tabindex="-1" id="sp-h">${esc(item.title)}</h1>
      <p><span class="sp-badge">Prepared draft — awaiting professional review</span></p>
      <p class="pane-note">${esc(DRAFT_VISIBILITY_NOTE)}</p>

      <div class="guide-word"><span class="wii-who">Required reviewer</span><span class="guide-note">${esc(item.reviewer)}</span></div>
      <div class="guide-word"><span class="wii-who">Why review is required</span><span class="guide-note">${esc(item.why)}</span></div>
      <div class="guide-word"><span class="wii-who">Known concerns</span><span class="guide-note">${esc(item.concerns)}</span></div>
      <div class="guide-word"><span class="wii-who">Reviewer &amp; date</span><span class="guide-note">${review?.reviewer
        ? `${esc(review.reviewer)} · ${esc(review.date ?? '')}` : 'None recorded — this draft has not been reviewed.'}</span></div>

      <h2 class="guide-heading">Prepared copy</h2>
      <div class="sp-review-copy">${copy}</div>

      ${item.sources.filter(Boolean).length ? `
        <h2 class="guide-heading">Sources consulted</h2>
        <ul class="th-list">${item.sources.filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}

      <details class="sp-review-details">
        <summary>Review details</summary>
        <dl class="anat-list">
          <div><dt>Stable content ID</dt><dd><code>${esc(item.id)}</code></dd></div>
          <div><dt>Source record</dt><dd><code>${esc(item.file)}</code></dd></div>
          <div><dt>Review ledger</dt><dd><code>js/data/speech/reviews.js</code> — absence means draft</dd></div>
          <div><dt>Reviewer guide</dt><dd><code>docs/SPEECH_REVIEW.md</code></dd></div>
          <div><dt>Governance</dt><dd>${esc(AI_DRAFT_NOTE)}</dd></div>
        </dl>
      </details>
    </main>`;
  wireBrandHome();
  app.querySelector('#sp-h').focus();
}

// ── My Working Text ───────────────────────────────────────────
// Requested only when an exercise actually needs text. Stored as a
// REFERENCE (builtin id, or Studio project id re-read live) so Studio
// records are never duplicated. An unavailable reference resolves to
// nothing and the honest prompt returns.
const WORKING_TEXT_KEY = 'speechcraft-working-text';
let workingTextCache = null;

function workingTextRef() {
  try {
    const v = JSON.parse(localStorage.getItem(WORKING_TEXT_KEY));
    return v && typeof v === 'object' && typeof v.source === 'string' ? v : null;
  } catch { return null; }
}
function setWorkingTextRef(ref) {
  workingTextCache = null;
  try {
    if (ref) localStorage.setItem(WORKING_TEXT_KEY, JSON.stringify(ref));
    else localStorage.removeItem(WORKING_TEXT_KEY);
  } catch { /* optional by design */ }
}
// Synchronous view for headers: title only (resolved copies are cached
// by the async resolver below).
// Every Scripts & Speeches piece as one flat, pickable list: the 154
// sonnets plus the five monologue collections. Nothing is copied — each
// entry points at the existing record and reads its lines live.
function scriptPieces() {
  const out = SONNETS.map(s => ({
    id: `sonnet:${s.n}`, title: `Sonnet ${s.n}`, sub: 'Shakespeare · sonnet',
    body: s.lines.join('\n'),
  }));
  for (const [key, lib] of Object.entries(LIBRARIES)) {
    for (const p of lib.data) {
      out.push({ id: `${key}:${p.id}`, title: p.title,
        sub: `${p.character} · ${p.work}`, body: (p.lines ?? []).join('\n') });
    }
  }
  return out;
}

function scriptPieceById(id) {
  return scriptPieces().find(p => p.id === id) ?? null;
}

// Scripts & Speeches as its real shelves: one author/collection per card,
// each opening its own list. Same records as scriptPieces() — this only
// groups them, so nothing is copied and nothing can drift.
function scriptCollections() {
  return [
    { key: 'sonnet', icon: '📜', title: 'Shakespeare’s Sonnets', note: 'All 154' },
    ...Object.entries(LIBRARIES).map(([key, lib]) =>
      ({ key, icon: lib.icon, title: lib.title, note: lib.note })),
  ].map(c => ({ ...c, count: scriptPiecesIn(c.key).length }));
}

function scriptPiecesIn(key) {
  return scriptPieces().filter(p => p.id.startsWith(`${key}:`));
}

function workingText() {
  const ref = workingTextRef();
  if (!ref) return null;
  if (workingTextCache?.id === ref.id) return workingTextCache;
  if (ref.source === 'script') {
    const p = scriptPieceById(ref.id);
    if (!p) return null;
    workingTextCache = { source: 'script', id: p.id, title: p.title, body: p.body, scene: null };
    return workingTextCache;
  }
  if (ref.source === 'builtin') {
    const t = speechTextById(ref.id);
    if (!t) return null;
    workingTextCache = { source: 'builtin', id: t.id, title: t.title,
      body: speechTextBody(t), scene: t.kind === 'scene' ? t : null };
    return workingTextCache;
  }
  return { source: ref.source, id: ref.id, title: ref.title ?? 'My text', body: null, scene: null };
}
// Full resolution — re-reads the live Studio record every time, so an
// edited or deleted project is always reflected, never a stale copy.
async function resolveWorkingText() {
  const ref = workingTextRef();
  if (!ref) return null;
  if (ref.source === 'builtin' || ref.source === 'script') return workingText();
  if (ref.source === 'studio') {
    try {
      const p = await getProject(ref.id);
      if (!p || !(p.text ?? '').trim()) return null;
      const scene = detectSceneLines(p.text);
      workingTextCache = { source: 'studio', id: p.id, title: p.title || 'Untitled project',
        body: String(p.text), scene };
      return workingTextCache;
    } catch { return null; }
  }
  return null;
}

// ── The Acting Arcade's own text-first picker ─────────────────
// Text FIRST, exercise second: pick the piece you want to work on, then
// the arcade opens with it already loaded. Exactly two ways in — the
// pieces we ship, and your own pasted work. No provided Speechcraft
// practice texts here; those belong to Speech, which still offers them.
function renderArcadeTextPicker(onChosen, opts = {}) {
  // `only` narrows YOUR OWN work to one content type (owner order,
  // 2026-08-20): custom monologues, scenes, speeches and the rest stay
  // in their own lanes. Studio → Custom Work is the one place that
  // shows everything, grouped.
  const only = opts.only ?? null;
  record(() => renderArcadeTextPicker(onChosen, opts));
  stopSpeech();
  // Two levels, the way a shelf actually works: authors first, then that
  // author's texts. `col` null = the shelf; a key = inside one collection.
  const state = { col: null, q: '' };
  const choose = ref => {
    setWorkingTextRef(ref);
    const t = workingText();
    if (t) onChosen(t);
  };

  const shelfHtml = () => {
    const cols = scriptCollections();
    return `
        <h2 class="chart-h">Choose from Scripts &amp; Speeches</h2>
        ${cols.map(c => `
          <button class="track-card" data-col="${esc(c.key)}" type="button">
            <div class="track-glyph">${c.icon}</div>
            <div class="track-info"><h2>${esc(c.title)}</h2>
              <p>${c.count} text${c.count === 1 ? '' : 's'} · ${esc(c.note)}</p></div>
            <div class="track-arrow">›</div>
          </button>`).join('')}
        <h2 class="chart-h">Paste or upload Custom Work${only ? ` — ${esc(contentTypeLabel(only))}s` : ''}</h2>
        <div id="atp-projects"><p class="pane-note">Loading your own texts…</p></div>`;
  };

  const listHtml = () => {
    const col = scriptCollections().find(c => c.key === state.col);
    const q = state.q.trim().toLowerCase();
    const all = scriptPiecesIn(state.col);
    const shown = q ? all.filter(x => `${x.title} ${x.sub}`.toLowerCase().includes(q)) : all;
    return `
        <button class="btn-lite" id="atp-back" type="button">‹ All collections</button>
        <h2 class="chart-h">${esc(col?.title ?? 'Texts')}</h2>
        <label class="field sp-search-field" for="atp-search">
          <span class="field-label">Search ${all.length} text${all.length === 1 ? '' : 's'}</span>
          <input class="sonnet-search" id="atp-search" type="search" value="${esc(state.q)}"
                 placeholder="Title, character or play…" autocomplete="off">
        </label>
        ${shown.map(x => `
          <button class="track-card" data-piece="${esc(x.id)}" type="button">
            <div class="track-glyph">📄</div>
            <div class="track-info"><h2>${esc(x.title)}</h2><p>${esc(x.sub)}</p></div>
            <div class="track-arrow">›</div>
          </button>`).join('')}
        ${!shown.length ? `<p class="pane-note">Nothing matches “${esc(state.q)}”.</p>` : ''}`;
  };

  const draw = () => {
    app.innerHTML = `
      ${pageTopbar('📄 Choose your text', '#8a6d3b')}
      <main class="track-list">
        <h1 class="page-h">Choose your text</h1>
        <p class="track-blurb">${state.col
          ? 'Pick the text you want to work on. What you choose opens next, already loaded.'
          : 'Pick a collection, then the text you want to work on.'}</p>
        ${state.col ? listHtml() : shelfHtml()}
      </main>`;
    wireBrandHome();

    app.querySelectorAll('[data-col]').forEach(b =>
      b.addEventListener('click', () => { state.col = b.dataset.col; state.q = ''; draw(); }));
    app.querySelector('#atp-back')?.addEventListener('click', () => {
      state.col = null; state.q = ''; draw();
    });
    app.querySelectorAll('[data-piece]').forEach(b =>
      b.addEventListener('click', () => {
        const piece = scriptPieceById(b.dataset.piece);
        if (piece) choose({ source: 'script', id: piece.id, title: piece.title });
      }));

    const input = app.querySelector('#atp-search');
    input?.addEventListener('input', () => {
      state.q = input.value;
      const at = input.selectionStart;
      draw();
      const again = app.querySelector('#atp-search');
      again?.focus();
      try { again?.setSelectionRange(at, at); } catch { /* fine */ }
    });

    const listEl = app.querySelector('#atp-projects');
    if (!listEl) return;
    (async () => {
      const addBtn = () => {
        const b = document.createElement('button');
        b.className = 'track-card'; b.type = 'button';
        b.innerHTML = `<div class="track-glyph">🎬</div>
          <div class="track-info"><h2>Paste a new text</h2><p>Opens Custom Work in the Studio; it becomes a project you own.</p></div>
          <div class="track-arrow">›</div>`;
        b.addEventListener('click', renderCustomWork);
        return b;
      };
      if (!dbSupported()) {
        listEl.innerHTML = '<p class="pane-note">Local storage is unavailable in this browser, so your own texts can’t be listed.</p>';
        return;
      }
      let projects = [];
      try {
        projects = (await listProjects())
          .filter(x => (x.text ?? '').trim())
          .filter(x => !only || (x.contentType ?? 'other') === only);
      }
      catch {
        listEl.innerHTML = '<p class="pane-note pane-warn">Could not read your Studio projects just now.</p>';
        listEl.appendChild(addBtn());
        return;
      }
      listEl.textContent = '';
      for (const proj of projects) {
        const b = document.createElement('button');
        b.className = 'track-card'; b.type = 'button';
        const glyph = document.createElement('div'); glyph.className = 'track-glyph'; glyph.textContent = '🎬';
        const info = document.createElement('div'); info.className = 'track-info';
        const h = document.createElement('h2'); h.textContent = proj.title || 'Untitled project';
        const sub = document.createElement('p'); sub.textContent = String(proj.text).replace(/\s+/g, ' ').slice(0, 80);
        info.append(h, sub);
        const arrow = document.createElement('div'); arrow.className = 'track-arrow'; arrow.textContent = '›';
        b.append(glyph, info, arrow);
        b.addEventListener('click', async () => {
          setWorkingTextRef({ source: 'studio', id: proj.id, title: proj.title || 'Untitled project' });
          const t = await resolveWorkingText();
          if (t) onChosen(t);
        });
        listEl.appendChild(b);
      }
      listEl.appendChild(addBtn());
    })();
  };
  draw();
}

function renderWorkingTextPicker(onChosen) {
  record(() => renderWorkingTextPicker(onChosen));
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('📄 My Working Text', '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">My Working Text</h1>
      <p class="track-blurb">Choose the text you want to work on. It stays with you across Speech lessons, practice and the Studio until you change it. Nothing is copied — Studio projects are read live from your own records.</p>
      <h2 class="chart-h">Use a provided Speechcraft text</h2>
      <div id="wt-builtin"></div>
      <h2 class="chart-h">Choose from Scripts &amp; Speeches</h2>
      <button class="track-card" id="wt-scripts" type="button">
        <div class="track-glyph">📜</div>
        <div class="track-info"><h2>Open Scripts &amp; Speeches</h2>
          <p>Sonnets and the monologue collections — open a piece, then use its Practice action.</p></div>
        <div class="track-arrow">›</div>
      </button>
      <h2 class="chart-h">Use one of my Studio projects</h2>
      <div id="wt-projects"><p class="pane-note">Loading…</p></div>
      <h2 class="chart-h">Paste or upload Custom Work</h2>
      <button class="track-card" id="wt-custom" type="button">
        <div class="track-glyph">🎬</div>
        <div class="track-info"><h2>Open Custom Work</h2>
          <p>Paste a new text in the Studio; it becomes a project you own, then pick it here.</p></div>
        <div class="track-arrow">›</div>
      </button>
    </main>`;
  wireBrandHome();

  const bEl = document.getElementById('wt-builtin');
  for (const t of SPEECH_TEXTS) {
    const btn = document.createElement('button');
    btn.className = 'track-card'; btn.type = 'button';
    btn.dataset.builtin = t.id;
    btn.innerHTML = `<div class="track-glyph">${t.kind === 'scene' ? '💬' : '📄'}</div>
      <div class="track-info"><h2></h2><p></p></div><div class="track-arrow">›</div>`;
    btn.querySelector('h2').textContent = t.title;
    btn.querySelector('p').textContent = t.kind;
    btn.addEventListener('click', () => {
      setWorkingTextRef({ source: 'builtin', id: t.id, title: t.title });
      if (onChosen) onChosen(workingText()); else goBack();
    });
    bEl.appendChild(btn);
  }
  document.getElementById('wt-scripts').addEventListener('click', renderTextsPage);
  document.getElementById('wt-custom').addEventListener('click', renderCustomWork);

  (async () => {
    const listEl = document.getElementById('wt-projects');
    if (!dbSupported()) { listEl.innerHTML = '<p class="pane-note">Local storage is unavailable in this browser, so Studio projects can’t be listed — the provided texts above all work.</p>'; return; }
    let projects = [];
    try { projects = (await listProjects()).filter(p => (p.text ?? '').trim()); }
    catch { listEl.innerHTML = '<p class="pane-note pane-warn">Could not read your Studio projects just now.</p>'; return; }
    if (!projects.length) { listEl.innerHTML = '<p class="pane-note">No Studio projects with text yet — anything you paste in Studio → Custom Work appears here.</p>'; return; }
    listEl.textContent = '';
    for (const p of projects) {
      const btn = document.createElement('button');
      btn.className = 'track-card'; btn.type = 'button';
      const glyph = document.createElement('div'); glyph.className = 'track-glyph'; glyph.textContent = '🎬';
      const info = document.createElement('div'); info.className = 'track-info';
      const h = document.createElement('h2'); h.textContent = p.title || 'Untitled project';
      const sub = document.createElement('p'); sub.textContent = String(p.text).replace(/\s+/g, ' ').slice(0, 80);
      info.append(h, sub);
      const arrow = document.createElement('div'); arrow.className = 'track-arrow'; arrow.textContent = '›';
      btn.append(glyph, info, arrow);
      btn.addEventListener('click', async () => {
        setWorkingTextRef({ source: 'studio', id: p.id, title: p.title || 'Untitled project' });
        const t = await resolveWorkingText();
        if (onChosen) onChosen(t); else goBack();
      });
      listEl.appendChild(btn);
    }
  })();
}

// The honest prompt: shown wherever an exercise needs text and none is
// chosen. Never invents or silently picks a text.
function needWorkingText(onChosen) {
  const t = workingText();
  if (t) { onChosen(t); return; }
  renderWorkingTextPicker(onChosen);
}

// ── The connected glossary (opens IN PLACE — dialog overlay, no
// history entry, so browser Back is untouched) ────────────────
function openGlossary(termId, anchorBtn) {
  const t = glossaryTerm(termId);
  if (!t || document.querySelector('.gloss-overlay')) return;
  const ov = document.createElement('div');
  ov.className = 'intro-overlay gloss-overlay';
  const card = document.createElement('div');
  card.className = 'intro-card gloss-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  card.setAttribute('aria-label', `Definition: ${t.term}`);
  const h = document.createElement('h1'); h.textContent = t.term;
  const p = document.createElement('p'); p.className = 'guide-text'; p.textContent = t.def;
  const close = document.createElement('button');
  close.className = 'btn btn-primary'; close.type = 'button'; close.textContent = 'Close';
  card.append(h, p, close);
  ov.appendChild(card);
  document.body.appendChild(ov);
  const dismiss = () => { ov.remove(); anchorBtn?.focus(); };
  close.addEventListener('click', dismiss);
  ov.addEventListener('click', e => { if (e.target === ov) dismiss(); });
  card.addEventListener('keydown', e => { if (e.key === 'Escape') dismiss(); });
  close.focus();
}

function glossaryChips(ids) {
  if (!ids?.length) return '';
  return `<div class="chips sp-gloss" role="group" aria-label="Terms used in this lesson">
    ${ids.map(id => glossaryTerm(id) ? `
      <button class="word-chip" data-gloss="${esc(id)}" type="button"
        aria-label="Define ${esc(glossaryTerm(id).term)}">📖 ${esc(glossaryTerm(id).term)}</button>` : '').join('')}
  </div>`;
}

function wireGlossary(root) {
  root.querySelectorAll('[data-gloss]').forEach(b =>
    b.addEventListener('click', () => openGlossary(b.dataset.gloss, b)));
}

// ── One Speech lesson page ────────────────────────────────────
// The chapter body, rendered from the ONE authoritative record. Used
// by the Library chapter route (and, in excerpt form, nowhere else —
// Learn links here rather than keeping a second copy).
function speechChapterBlocks(l, { interactive = true } = {}) {
  const goal = speechGoal();
  const defaultTab = goal === 'acting' ? 'acting' : 'everyday';
  return l.body.map((b, i) => {
    if (b.h) return `<h2 class="guide-heading">${esc(b.h)}</h2>`;
    if (b.quote) return `<blockquote class="th-quote"><p>${esc(b.quote)}</p>
      <footer class="th-attrib">${esc(b.attribution ?? '')}</footer></blockquote>`;
    if (b.p) return `<p class="guide-text">${esc(b.p)}</p>`;
    if (b.list) return `<ul class="th-list">${b.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`;
    if (b.safety) return `<p class="pane-note pane-warn sp-safety">${esc(SPEECH_SAFETY_LINE)}</p>`;
    if (b.comfort) return `<p class="pane-note">${esc(SPEECH_COMFORT_LINE)}</p>`;
    if (b.experiment) {
      // One uninterrupted read: prompts, noticing, recital and contrast
      // in sequence. No stepper, no answer field, no mid-page button.
      const e = b.experiment;
      return `
      <section class="sp-exp" aria-label="The experiment">
        <ol class="exp-prompts">${e.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        <p class="guide-text exp-notice">${esc(e.noticing)}</p>
        <p class="guide-text exp-then">${esc(e.then)}</p>
        <p class="guide-text exp-compare">${esc(e.compare)}</p>
      </section>`;
    }
    if (b.tabs) {
      const tabIds = Object.keys(b.tabs);
      return `
      <div class="sonnet-tabs sp-tabs" role="tablist" data-tabset="${i}">
        ${tabIds.map(tid => `<button class="son-tab ${tid === defaultTab ? 'on' : ''}" role="tab"
          aria-selected="${tid === defaultTab}" data-tab="${tid}" data-tabset="${i}" type="button">${esc(b.tabs[tid].label)}</button>`).join('')}
      </div>
      ${tabIds.map(tid => `
      <div class="sp-tabpane" data-pane="${tid}" data-tabset="${i}" ${tid === defaultTab ? '' : 'hidden'}>
        ${b.tabs[tid].intro ? `<p class="guide-text">${esc(b.tabs[tid].intro)}</p>` : ''}
        <dl class="anat-list sp-terms">
          ${b.tabs[tid].items.map(it => `
            <div><dt>${esc(it.h)}</dt><dd>${esc(it.p)}</dd></div>`).join('')}
        </dl>
      </div>`).join('')}`;
    }
    return '';
  }).join('');
}

// Shared wiring for a rendered chapter body: tab panes and the
// self-paced experiment stepper.
function wireChapterBody(root, l) {
  root.querySelectorAll('.sp-tabs .son-tab').forEach(tb =>
    tb.addEventListener('click', () => {
      const set = tb.dataset.tabset;
      root.querySelectorAll(`.son-tab[data-tabset="${set}"]`).forEach(x => {
        x.classList.toggle('on', x === tb);
        x.setAttribute('aria-selected', String(x === tb));
      });
      root.querySelectorAll(`.sp-tabpane[data-tabset="${set}"]`).forEach(pn =>
        (pn.hidden = pn.dataset.pane !== tb.dataset.tab));
    }));
  return;   // the experiment is continuous prose now — nothing to step
  /* eslint-disable no-unreachable */
  const exp = l.body.find(b => b.experiment)?.experiment;
  if (!exp) return;
  const idx = l.body.findIndex(b => b.experiment);
  const stepsEl = root.querySelector(`#exp-steps-${idx}`);
  const nextBtn = root.querySelector(`[data-exp-next="${idx}"]`);
  if (!stepsEl || !nextBtn) return;
  const seq = [
    ...exp.steps.map(s => ({ cls: 'sp-exp-step', text: s })),
    { cls: 'sp-exp-notice', text: exp.noticing },
    { cls: 'sp-exp-step', text: exp.then },
    { cls: 'sp-exp-compare', text: exp.compare },
  ];
  let at = 0;
  nextBtn.addEventListener('click', () => {
    if (at >= seq.length) return;
    const d = document.createElement('p');
    d.className = `guide-text ${seq[at].cls}`;
    d.textContent = seq[at].text;
    stepsEl.appendChild(d);
    at++;
    nextBtn.textContent = at >= seq.length ? 'Done — that’s the experiment' : 'Next';
    if (at >= seq.length) nextBtn.disabled = true;
  });
}

// The honest gate page for professional-tier drafts.
function renderPreparedDraftGate(l, kind) {
  app.innerHTML = `
    ${pageTopbar('🗣 ' + esc(l.title), '#6f8657')}
    <main class="guide">
      <h1 tabindex="-1" id="sp-h">${esc(l.title)}</h1>
      <p><span class="sp-badge">Prepared draft — awaiting professional review</span></p>
      <p class="guide-text">This chapter is fully written. It stays out of ${kind} until a qualified voice professional or speech-language pathologist has reviewed it — health and anatomy content ships checked or not at all.</p>
      <p class="pane-note">${esc(DRAFT_VISIBILITY_NOTE)} ${esc(AI_DRAFT_NOTE)}</p>
      <div class="practice-row"><button class="btn btn-lite" id="sp-open-review" type="button">See its review status</button></div>
    </main>`;
  wireBrandHome();
  app.querySelector('#sp-h').focus();
  document.getElementById('sp-open-review').addEventListener('click', renderSpeechReviewStatus);
}

// ── LIBRARY: the complete chapter (reference, never a lesson) ──
// No understanding check, no "Mark as read", no XP, no completion
// control, no lock, no required order, no games.
function renderSpeechChapter(id) {
  record(() => renderSpeechChapter(id));
  stopSpeech();
  const l = speechLessonById(id);
  if (!l) return goSection('library');
  if (!speechBodyVisible(l)) return renderPreparedDraftGate(l, 'the Library');

  const part = partForChapter(l.id);
  const col = { title: part ? `Part ${part.n} — ${part.title}` : 'Speech Library' };
  // Previous / Next follow the textbook's reading order.
  const flat = textbookOrder().filter(x => x === 'wsm' || speechBodyVisible(speechLessonById(x)));
  const at = flat.indexOf(l.id);
  const prev = at > 0 ? speechLessonById(flat[at - 1]) : null;
  const nxt = at >= 0 && at < flat.length - 1 ? speechLessonById(flat[at + 1]) : null;
  const inCourse = !!moduleForLesson(l);

  app.innerHTML = `
    ${pageTopbar('📖 ' + esc(l.title), '#6f8657')}
    <main class="guide sp-chapter">
      <p class="pane-note">${esc(col?.title ?? 'Speech Library')}</p>
      <h1 tabindex="-1" id="sp-h">${esc(chapterTitle(l.id))}</h1>
      ${speechChapterBlocks(l)}
      ${glossaryChips(l.glossary)}
      ${(l.sources ?? []).length ? `
        <h2 class="guide-heading">Sources consulted</h2>
        <ul class="th-list">${l.sources.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      ${inCourse ? `
        <p class="pane-note"><button class="linkish" id="sp-study" type="button">Study this in Learn</button>
          — the guided lesson adds an objective, practice and progress.</p>` : ''}
      <nav class="sp-chapter-nav" aria-label="Chapter navigation within ${esc(col?.title ?? 'this collection')}">
        ${prev ? `<button class="btn btn-lite" id="sp-prev" type="button">‹ ${esc(chapterTitle(prev.id))}</button>` : '<span></span>'}
        <button class="btn btn-lite" id="sp-to-contents" type="button">Textbook contents</button>
        ${nxt ? `<button class="btn btn-lite" id="sp-next-ch" type="button">${esc(chapterTitle(nxt.id))} ›</button>` : '<span></span>'}
      </nav>
    </main>`;
  wireBrandHome();
  wireGlossary(app);
  wireChapterBody(app, l);
  app.querySelector('#sp-h').focus();
  document.getElementById('sp-study')?.addEventListener('click', () => renderSpeechLesson(l.id));
  document.getElementById('sp-to-contents')?.addEventListener('click', renderTextbook);
  document.getElementById('sp-prev')?.addEventListener('click', () => { navStack.pop(); renderSpeechChapter(prev.id); });
  document.getElementById('sp-next-ch')?.addEventListener('click', () => { navStack.pop(); renderSpeechChapter(nxt.id); });
}

// ── LEARN: the guided lesson step ──────────────────────────────
// Objective → Read (opens the Library chapter) → Try → Apply → Check
// → Complete and continue. The complete chapter text is NOT duplicated
// here; only the objective and a short summary line appear.
// ── LEARN: the guided Speech reading experience ───────────────
// Speech chapters are read, never tested. No Check section, no answer
// choices, no correctness, no XP, no hearts, no gate before continuing.
// One reusable renderer serves every chapter; the approved written
// material is paginated, never rewritten. (SPEECH_LESSON_EXTRAS still
// carries legacy `check` data — Speech simply stops rendering it. IPA
// and Accent question data is untouched.)

// Split a chapter body into 3–6 short screens: a new screen begins at
// each subheading, and long runs of prose are chunked so no screen
// becomes a wall of text.
function speechReadingSections(l) {
  const sections = [];
  let cur = { h: null, blocks: [] };
  for (const b of l.body) {
    if (b.h) {
      if (cur.blocks.length) sections.push(cur);
      cur = { h: b.h, blocks: [] };
    } else {
      if (cur.blocks.length >= 3 && !cur.h) { sections.push(cur); cur = { h: null, blocks: [] }; }
      cur.blocks.push(b);
    }
  }
  if (cur.blocks.length) sections.push(cur);
  // Merge down to at most six screens without losing anything.
  while (sections.length > 6) {
    const i = sections.findIndex((x, k) => k > 0 && x.blocks.length <= 2);
    const j = i > 0 ? i : sections.length - 1;
    sections[j - 1].blocks.push(...sections[j].blocks);
    sections.splice(j, 1);
  }
  return sections;
}

function speechBlockHtml(b, i) {
  if (b.quote) return `<blockquote class="th-quote"><p>${esc(b.quote)}</p>
    <footer class="th-attrib">${esc(b.attribution ?? '')}</footer></blockquote>`;
  if (b.p) return `<p class="guide-text">${esc(b.p)}</p>`;
  if (b.list) return `<ul class="th-list">${b.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (b.safety) return `<p class="pane-note pane-warn sp-safety">${esc(SPEECH_SAFETY_LINE)}</p>`;
  if (b.comfort) return `<p class="pane-note">${esc(SPEECH_COMFORT_LINE)}</p>`;
  if (b.experiment) {
    const e = b.experiment;
    return `
    <section class="sp-exp read-demo" aria-label="The experiment">
      <ol class="exp-prompts">
        ${e.steps.map(t => `<li>${esc(t)}</li>`).join('')}
      </ol>
      <p class="guide-text exp-notice">${esc(e.noticing)}</p>
      <p class="guide-text exp-then">${esc(e.then)}</p>
      <p class="guide-text exp-compare">${esc(e.compare)}</p>
    </section>`;
  }
  if (b.tabs) {
    const ids = Object.keys(b.tabs);
    return `
      <div class="sonnet-tabs sp-tabs" role="tablist" data-tabset="${i}">
        ${ids.map((t, k) => `<button class="son-tab ${k === 0 ? 'on' : ''}" role="tab"
          aria-selected="${k === 0}" data-tab="${t}" data-tabset="${i}" type="button">${esc(b.tabs[t].label)}</button>`).join('')}
      </div>
      ${ids.map((t, k) => `
      <div class="sp-tabpane" data-pane="${t}" data-tabset="${i}" ${k === 0 ? '' : 'hidden'}>
        ${b.tabs[t].intro ? `<p class="guide-text">${esc(b.tabs[t].intro)}</p>` : ''}
        <dl class="anat-list sp-terms">
          ${b.tabs[t].items.map(it => `<div><dt>${esc(it.h)}</dt><dd>${esc(it.p)}</dd></div>`).join('')}
        </dl>
      </div>`).join('')}`;
  }
  return '';
}

function renderSpeechLesson(id, screen = 0) {
  record(() => renderSpeechLesson(id, screen));
  stopSpeech();
  const l = speechLessonById(id);
  if (!l) return goSection('library');
  if (!speechBodyVisible(l)) return renderPreparedDraftGate(l, 'the course sequence');

  const m = moduleForLesson(l);
  const r = speechReading(id);
  const sections = speechReadingSections(l);
  const total = sections.length;
  const at = Math.max(0, Math.min(screen, total - 1));
  const last = at === total - 1;
  const sec = sections[at];
  const isDone = speechLessonDone(id);

  // Sibling chapters within the module, for Previous / Next chapter.
  const sibs = speechLessonsFor(l.stage).filter(x => speechBodyVisible(x));
  const si = sibs.findIndex(x => x.id === id);
  const prevCh = si > 0 ? sibs[si - 1] : null;
  const nextCh = si >= 0 && si < sibs.length - 1 ? sibs[si + 1] : null;

  app.innerHTML = `
    ${pageTopbar('🧭 ' + esc(m?.title ?? 'Speech Course'), '#6f8657')}
    <main class="guide sp-read">
      <p class="pane-note">${esc(m?.title ?? '')} · Chapter ${esc(lessonNumber(l))}</p>
      <h1 tabindex="-1" id="sp-h">${esc(chapterTitle(l.id))}</h1>
      ${at === 0 && r ? `
        <p class="sp-idea">${esc(r.idea)}</p>
        <p class="pane-note">${esc(r.why)}</p>` : ''}

      <p class="sp-count" aria-live="polite">${at + 1} of ${total}</p>
      <section class="sp-screen" aria-label="${esc(sec.h ?? l.title)}">
        ${sec.h ? `<h2 class="guide-heading">${esc(sec.h)}</h2>` : ''}
        ${sec.blocks.map((b, i) => speechBlockHtml(b, `${at}-${i}`)).join('')}
      </section>

      ${last ? `
        ${r?.notice ? `
        <section class="sp-notice" aria-label="Notice for yourself (optional)">
          <h2 class="guide-heading">Notice for yourself <span class="badge">Optional</span></h2>
          <p class="guide-text">${esc(r.notice)}</p>
          <p class="pane-note">Nothing is submitted, recorded or scored.</p>
        </section>` : ''}
        ${r?.takeaways ? `
        <section class="sp-takeaway" aria-label="Take this with you">
          <h2 class="guide-heading">Take this with you</h2>
          <ul class="th-list">${r.takeaways.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          ${nextCh ? `<p class="pane-note">Next: ${esc(nextCh.title)}</p>` : ''}
        </section>` : ''}
        ${glossaryChips(l.glossary)}` : ''}

      <nav class="sp-read-nav" aria-label="Chapter navigation">
        <div class="sp-read-secondary">
          ${at > 0 ? '<button class="btn btn-lite" id="sp-prev" type="button">‹ Previous</button>'
            : prevCh ? `<button class="btn btn-lite" id="sp-prev-ch" type="button">‹ ${esc(prevCh.title)}</button>` : ''}
          <button class="btn btn-lite" id="sp-to-module" type="button">Return to module</button>
        </div>
        <div class="sp-read-primary">
          ${last ? `
            <button class="btn ${isDone ? 'btn-lite' : 'btn-primary'}" id="sp-done" type="button" ${isDone ? 'disabled' : ''}>
              ${isDone ? 'Read ✓' : 'Mark as read'}</button>
            ${nextCh ? `<button class="btn ${isDone ? 'btn-primary' : ''}" id="sp-next-ch" type="button">Next chapter ›</button>` : ''}`
          : '<button class="btn btn-primary" id="sp-next" type="button">Continue ›</button>'}
        </div>
      </nav>
      <p class="pane-note" id="sp-done-note" aria-live="polite">${isDone ? 'Marked as read — reopen it whenever you like.' : ''}</p>
    </main>`;
  wireBrandHome();
  wireGlossary(app);
  wireChapterBody(app, l);
  app.querySelector('#sp-h').focus();

  const goScreen = k => { navStack.pop(); renderSpeechLesson(id, k); };
  document.getElementById('sp-next')?.addEventListener('click', () => goScreen(at + 1));
  document.getElementById('sp-prev')?.addEventListener('click', () => goScreen(at - 1));
  document.getElementById('sp-prev-ch')?.addEventListener('click', () => { navStack.pop(); renderSpeechLesson(prevCh.id); });
  document.getElementById('sp-next-ch')?.addEventListener('click', () => { navStack.pop(); renderSpeechLesson(nextCh.id); });
  document.getElementById('sp-to-module')?.addEventListener('click', () => renderSpeechModule(m?.n ?? 1));
  document.getElementById('sp-done')?.addEventListener('click', () => {
    // Reading progress only — no XP, no hearts, no correctness.
    markSpeechLessonDone(id);
    const btn = document.getElementById('sp-done');
    btn.textContent = 'Read ✓'; btn.disabled = true;
    btn.classList.replace('btn-primary', 'btn-lite');
    document.getElementById('sp-next-ch')?.classList.add('btn-primary');
    document.getElementById('sp-done-note').textContent = 'Marked as read — reopen it whenever you like.';
  });
}

// ── Approaches to Acting (all four DRAFTS behind acting review) ──
function renderApproaches() {
  record(renderApproaches);
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🎭 Approaches to Acting', '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">Approaches to Acting</h1>
      <p class="track-blurb">Written introductions to four foundational approaches — where each came from, what it values, and the questions it teaches an actor to ask.</p>
      ${ACTING_APPROACHES.map(a => `
        <button class="track-card" data-approach="${a.id}" type="button">
          <div class="track-glyph">${speechPublished(a.id) ? '🎭' : '📝'}</div>
          <div class="track-info"><h2>${esc(a.name)}</h2>
            ${speechPublished(a.id) ? `<p>${esc(a.era)}</p>` : '<p>Written · awaiting review by a qualified acting teacher</p>'}</div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-approach]').forEach(b =>
    b.addEventListener('click', () => renderApproach(b.dataset.approach)));
}

function renderApproach(id) {
  record(() => renderApproach(id));
  const a = ACTING_APPROACHES.find(x => x.id === id);
  if (!a) return renderApproaches();
  if (!speechPublished(a.id)) {
    app.innerHTML = `
      ${pageTopbar('🎭 ' + esc(a.name), '#6f8657')}
      <main class="guide">
        <h1>${esc(a.name)}</h1>
        <p class="pane-note">This introduction is fully written and awaiting review by a qualified acting teacher or coach before it appears here. Acting approaches deserve to be described accurately or not at all.</p>
      </main>`;
    wireBrandHome();
    return;
  }
  const s = a.sections;
  app.innerHTML = `
    ${pageTopbar('🎭 ' + esc(a.name), '#6f8657')}
    <main class="guide">
      <h1>${esc(a.name)}</h1>
      <p class="pane-note">${esc(a.era)}</p>
      <h2 class="guide-heading">Historical background</h2><p class="guide-text">${esc(s.background)}</p>
      <h2 class="guide-heading">Central principles</h2><p class="guide-text">${esc(s.principles)}</p>
      <h2 class="guide-heading">Important terminology</h2><p class="guide-text">${esc(s.terminology)}</p>
      <h2 class="guide-heading">How the approach works</h2><p class="guide-text">${esc(s.considers)}</p>
      <h2 class="guide-heading">Questions it invites an actor to ask</h2>
      <ul class="th-list">${s.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
      <h2 class="guide-heading">Common misunderstandings</h2><p class="guide-text">${esc(s.misunderstandings)}</p>
      <h2 class="guide-heading">Sources and further reading</h2><p class="guide-text">${esc(s.sources)}</p>
      <p class="pane-note">${esc(APPROACH_DISCLAIMER)}</p>
    </main>`;
  wireBrandHome();
}

// ── Dialects in Speech: two entrances, ONE set of records ─────
function renderDialectsInSpeech() {
  record(renderDialectsInSpeech);
  stopSpeech();
  const d = activeCourse() === 'core' ? 'nam' : activeCourse();
  const entrance = (facets) => facets.map(f => `
    <button class="track-card" data-facet="${f.renders}" type="button">
      <div class="track-glyph">›</div>
      <div class="track-info"><h2>${esc(f.title)}</h2><p>${esc(f.note)}</p></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  app.innerHTML = `
    ${pageTopbar('🌍 Dialects in Speech', '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">Dialects in Speech</h1>
      <p class="track-blurb">One body of dialect knowledge, two doors in — showing <b>${esc(dialectName(d))}</b>, your current course. Both doors open the same reference material; nothing is duplicated.</p>
      <p class="pane-note">${esc(DIALECT_VARIATION_LINE)}</p>
      <h2 class="chart-h">Through IPA &amp; Accents — how it sounds</h2>
      ${entrance(DIALECT_FACETS.ipa)}
      <h2 class="chart-h">Through Speech — how people speak it</h2>
      ${entrance(DIALECT_FACETS.speech)}
    </main>`;
  wireBrandHome();
  const facetGo = {
    'inventory': () => renderInventory(d),
    'idioms': () => renderIdioms(d),
    'action': () => actionFor(d).length ? renderDialectAction(d) : null,
    'bridge-practice': () => playableRoutesInto(d, hasWordClip).length ? renderBridgeSetup(d) : null,
  };
  app.querySelectorAll('[data-facet]').forEach(b =>
    b.addEventListener('click', () => {
      const go = facetGo[b.dataset.facet];
      const went = go?.();
      if (went === null) {
        const info = b.querySelector('.track-info p');
        if (info) info.textContent = b.dataset.facet === 'action'
          ? `No approved Dialect in Action pieces exist for ${dialectName(d)} yet — drafts stay behind review.`
          : `No reviewed, fully-recorded comparison route into ${dialectName(d)} exists yet.`;
      }
    }));
}

// ── Practice → Speech Practice ────────────────────────────────
// A compact working-text card, shared by Speech Practice and Studio.
function workingTextCardHtml(wt) {
  return wt ? `
    <section class="sp-wt-card" aria-label="My Working Text">
      <div class="sp-wt-info">
        <span class="cc-stage">My Working Text</span>
        <h2>${esc(wt.title)}</h2>
        <p class="cc-meta">${wt.source === 'studio' ? 'From my Studio projects' : 'Provided Speechcraft text'}</p>
      </div>
      <div class="sp-wt-actions">
        ${wt.source === 'studio' ? '<button class="btn-lite" id="wt-open" type="button">Open project</button>' : ''}
        <button class="btn-lite" id="wt-change" type="button">Change text</button>
        <button class="btn btn-practice" id="wt-practice" type="button">Practice this text</button>
      </div>
    </section>`
  : `
    <section class="sp-wt-card is-empty" aria-label="My Working Text">
      <div class="sp-wt-info">
        <span class="cc-stage">My Working Text</span>
        <h2>No working text selected</h2>
      </div>
      <div class="sp-wt-actions">
        <button class="btn btn-primary" id="wt-choose" type="button">Choose a text</button>
      </div>
    </section>`;
}

function wireWorkingTextCard(root) {
  root.querySelector('#wt-change')?.addEventListener('click', () => renderWorkingTextPicker());
  root.querySelector('#wt-choose')?.addEventListener('click', () => renderWorkingTextPicker());
  root.querySelector('#wt-open')?.addEventListener('click', () => {
    const ref = workingTextRef();
    if (ref?.source === 'studio') renderProject(ref.id, 'text');
  });
  root.querySelector('#wt-practice')?.addEventListener('click', () =>
    needWorkingText(text => renderSpeechExerciseChooser(text)));
}

function speechPracticePane(el) {
  const wt = workingText();
  el.innerHTML = `
    <h1 class="page-h">Speech Practice</h1>
    <p class="pane-note sp-wt-line">${wt
      ? `My Working Text: <b>${esc(wt.title)}</b> <button class="linkish" id="sp-wt-change" type="button">change</button>`
      : 'No working text chosen yet — exercises that need one will ask, or <button class="linkish" id="sp-wt-pick" type="button">choose one now</button>.'}</p>
    <button class="track-card hub-card" id="spp-guided" type="button">
      <div class="track-glyph">🧭</div>
      <div class="track-info"><h2>Guided Practice</h2></div>
      <div class="track-arrow">›</div>
    </button>
    <button class="track-card hub-card" id="spp-arcade" type="button">
      <div class="track-glyph">🕹</div>
      <div class="track-info"><h2>Speechcraft Arcade</h2></div>
      <div class="track-arrow">›</div>
    </button>
    <button class="track-card hub-card" id="spp-mytext" type="button">
      <div class="track-glyph">📄</div>
      <div class="track-info"><h2>Practice My Text</h2></div>
      <div class="track-arrow">›</div>
    </button>`;
  el.querySelector('#sp-wt-change')?.addEventListener('click', () => renderWorkingTextPicker());
  el.querySelector('#sp-wt-pick')?.addEventListener('click', () => renderWorkingTextPicker());
  el.querySelector('#spp-guided').addEventListener('click', renderGuidedPractice);
  el.querySelector('#spp-arcade').addEventListener('click', renderArcade);
  el.querySelector('#spp-mytext').addEventListener('click', () => renderPracticeMyText());
}

// Where a Speech exercise should return when it finishes (set by the
// Studio "Practice This Text" flow; null = return to Practice).
let speechReturnTo = null;
function speechExit() {
  const ret = speechReturnTo;
  speechReturnTo = null;
  if (ret?.projectId) return renderProject(ret.projectId, 'text');
  goSection('practice');
}

// ── Guided Practice: 8 subjects × Prepare · Train · Apply ─────
function renderGuidedPractice() {
  record(renderGuidedPractice);
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🧭 Guided Practice', '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">Guided Practice</h1>
      <p class="track-blurb">${esc(PRACTICE_PRINCIPLE_SHORT)} Each subject isolates one element of speaking. Nothing here records you, scores you or costs hearts — this is exploration, and you are the only judge of it.</p>
      ${PRACTICE_SUBJECTS.map(s => `
        <button class="track-card" data-subject="${s.id}" type="button">
          <div class="track-glyph">${s.icon}</div>
          <div class="track-info"><h2>${esc(s.title)}</h2></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-subject]').forEach(b =>
    b.addEventListener('click', () => renderPracticeSubject(b.dataset.subject)));
}

function renderPracticeSubject(subjectId, mode = 'train') {
  record(() => renderPracticeSubject(subjectId, mode));
  stopSpeech();
  const subject = PRACTICE_SUBJECTS.find(s => s.id === subjectId);
  if (!subject) return renderGuidedPractice();
  const routines = routinesFor(subjectId);
  const current = routines.find(r => r.mode === mode);
  const learnerOk = current?.reviewBatch === 1;

  app.innerHTML = `
    ${pageTopbar(`${subject.icon} ${esc(subject.title)}`, '#6f8657')}
    <main class="guide">
      <h1>${esc(subject.title)}</h1>
      <div class="sonnet-tabs sp-mode-seg" role="tablist" aria-label="Prepare, Train or Apply">
        ${ROUTINE_MODES.map(m => `
          <button class="son-tab ${m === mode ? 'on' : ''}" role="tab" aria-selected="${m === mode}"
            data-mode-seg="${m}" type="button">${m[0].toUpperCase() + m.slice(1)}</button>`).join('')}
      </div>
      ${learnerOk ? `
        <h2 class="guide-heading">${esc(current.title)}</h2>
        <p class="pane-note">~${current.minutes} min · written guidance only — no recording, no score.</p>
        <div class="practice-row"><button class="btn btn-primary" id="sp-run" type="button">Start</button></div>`
      : `
        <p class="pane-note" id="sp-draft-note">The ${esc(mode)} routine for ${esc(subject.title)} is written and awaiting review — it isn’t available yet. The Train routine is the current reviewed batch.</p>`}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-mode-seg]').forEach(b =>
    b.addEventListener('click', () => {
      navStack.pop();                              // replace-history: segments are one page
      renderPracticeSubject(subjectId, b.dataset.modeSeg);
    }));
  document.getElementById('sp-run')?.addEventListener('click', () =>
    current.tryWithText
      ? needWorkingText(text => runRoutine(current.id, text))
      : runRoutine(current.id, null));
}


function runRoutine(routineId, text) {
  record(() => runRoutine(routineId, text));
  stopSpeech();
  const r = routineById(routineId);
  if (!r || r.reviewBatch !== 1) return renderGuidedPractice();   // drafts never run
  const subject = PRACTICE_SUBJECTS.find(s => s.id === r.subject);

  const seq = [];
  if (text) seq.push({ kind: 'before', text: 'Before the exercise: speak or read your passage once, just as it is now. No preparation — this is your own reference point, not a test.' });
  r.steps.forEach(s => seq.push({ kind: 'step', text: s }));
  if (text) seq.push({ kind: 'after', text: 'Now speak or read the passage once more. Notice what, if anything, moved. You are observing yourself — nothing here evaluates you.' });

  app.innerHTML = `
    ${pageTopbar(`${subject.icon} ${esc(r.title)}`, '#6f8657')}
    <main class="guide sp-runner">
      <h1>${esc(r.title)}</h1>
      <p class="pane-note">${esc(SPEECH_COMFORT_LINE)}</p>
      <p class="pane-note pane-warn">${esc(SPEECH_SAFETY_LINE)}</p>
      ${text ? `<section class="sp-passage" aria-label="Your passage"><div class="sp-passage-text" id="sp-passage"></div></section>` : ''}
      <div id="sp-seq"></div>
      <p class="pane-note">Nothing here is scored, and skipping a step costs nothing.</p>
    </main>`;
  wireBrandHome();
  if (text) document.getElementById('sp-passage').textContent = text.body;   // inert, always

  const stepNo = i => seq.slice(0, i + 1).filter(x => x.kind === 'step').length;
  runStepSequence({
    mount: document.getElementById('sp-seq'),
    steps: seq.map((x, i) => ({
      label: x.kind === 'before' ? 'Before you begin'
        : x.kind === 'after' ? 'Afterwards'
        : `Step ${stepNo(i)}`,
      text: x.text,
    })),
    onFinish: () => {
      // Completion is recorded only when the learner finishes.
      recordSpeechPractice({ kind: 'routine', ref: r.id, title: r.title,
        textTitle: text?.title ?? null, skill: subject.title });
      store.addXp(5);
      renderSpeechReflection({
        heading: 'Practice complete · +5 XP',
        sub: 'Completion, not a grade — nothing here measures how you sounded.',
        compatible: !!text,
      });
    },
  });
}

// ── Private reflection (self-observation, never evaluation) ───
function renderSpeechReflection({ heading, sub, compatible }) {
  stopSpeech();
  app.innerHTML = `
    <main class="end-screen sp-reflect">
      <div class="end-emoji">🧭</div>
      <h1>${esc(heading)}</h1>
      <p class="pane-note">${esc(sub)}</p>
      ${compatible ? `
      <section class="sp-reflect-box" aria-label="Private reflection">
        <p class="guide-text">Private reflection — optional, stored only on this device:</p>
        <div class="chip-row" id="sp-refl">
          ${REFLECTION_CHOICES.map(c => `
            <button class="chip-pick" data-refl="${c.id}" type="button" aria-pressed="false">${esc(c.label)}</button>`).join('')}
        </div>
        <label class="field"><span class="field-label">Optional private note</span>
          <textarea class="input-sel sp-note" id="sp-refl-note" rows="2" maxlength="2000"></textarea></label>
      </section>` : ''}
      <div class="end-actions">
        <button class="btn btn-primary" id="sp-refl-done" type="button">Done</button>
      </div>
    </main>`;
  const picked = new Set();
  app.querySelectorAll('[data-refl]').forEach(b =>
    b.addEventListener('click', () => {
      const on = !picked.has(b.dataset.refl);
      if (on) picked.add(b.dataset.refl); else picked.delete(b.dataset.refl);
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    }));
  document.getElementById('sp-refl-done').addEventListener('click', () => {
    if (compatible) attachSpeechReflection([...picked], document.getElementById('sp-refl-note')?.value ?? '');
    speechExit();
  });
}

// Scene-line detection for Studio text: strict "NAME: line" per line.
// Ambiguity is NEVER guessed through — if the pattern doesn't hold,
// the text is treated as a monologue and the user is told why.
// Two speaker conventions are accepted, tried in order: "Name: line"
// (the form Speechcraft's own texts use) and "NAME line" — the all-caps
// prefix printed plays and screenplays actually use. The caps name must
// be two characters or more, so an ordinary sentence opening on "I" can
// never be read as a speaker. EVERY line must parse and there must be
// 2–6 distinct speakers, which is what keeps prose out.
function detectSceneLines(text) {
  const lines = String(text).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const forms = [
    /^([A-Za-z][\w .''-]{0,30}?):\s+(.*)$/,
    /^([A-Z][A-Z.'’-]+(?:\s+[A-Z][A-Z.'’-]+)*)\s+(\S.*)$/,
  ];
  for (const re of forms) {
    const parsed = lines.map(ln => {
      const m = ln.match(re);
      return m ? { who: m[1].trim(), text: m[2] } : null;
    });
    if (parsed.some(x => !x)) continue;
    const chars = [...new Set(parsed.map(x => x.who))];
    if (chars.length >= 2 && chars.length <= 6) return { lines: parsed, characters: chars };
  }
  return null;
}

// ── Passage selection from a Studio project (Phase 10) ────────
function renderPassagePicker(project, { title, needsScene, onPick }) {
  record(() => renderPassagePicker(project, { title, needsScene, onPick }));
  stopSpeech();
  const raw = String(project.text ?? '');
  const scene = detectSceneLines(raw);
  const units = scene ? scene.lines.map(l => `${l.who}: ${l.text}`)
    : raw.split(/\r?\n/).flatMap(par => par.trim() ? [par] : []);
  app.innerHTML = `
    ${pageTopbar('📄 ' + esc(project.title || 'Untitled project'), '#8a6d3b')}
    <main class="guide">
      <h1>Select a passage</h1>
      <p class="pane-note">Tap lines to select the passage you want to work on (they stay in order). ${scene ? 'This looks like a scene — you can pick your character on the next screen.' : needsScene ? 'This text doesn’t parse as a scene (NAME: line per line), so scene games can’t use it — routines and solo games can.' : ''}</p>
      <div class="sp-select" id="sp-units"></div>
      <div class="practice-row">
        <button class="btn btn-primary" id="sp-use" type="button" disabled>Use selection</button>
        <button class="btn-lite" id="sp-use-all" type="button">Use the whole text</button>
      </div>
    </main>`;
  wireBrandHome();
  const unitsEl = document.getElementById('sp-units');
  const chosen = new Set();
  units.forEach((u, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sp-unit'; b.setAttribute('aria-pressed', 'false');
    b.textContent = u;                                     // inert — untrusted text
    b.addEventListener('click', () => {
      const on = !chosen.has(i);
      if (on) chosen.add(i); else chosen.delete(i);
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
      document.getElementById('sp-use').disabled = chosen.size === 0;
    });
    unitsEl.appendChild(b);
  });
  const finishWith = idxs => {
    const body = idxs.map(i => units[i]).join('\n');
    const sel = { source: 'studio', id: project.id, title: project.title || 'Untitled project', body, scene: null };
    if (scene) {
      const lines = idxs.map(i => scene.lines[i]);
      const chars = [...new Set(lines.map(l => l.who))];
      if (chars.length >= 2) sel.scene = { lines, characters: chars };
    }
    onPick(sel);
  };
  document.getElementById('sp-use').addEventListener('click', () =>
    finishWith([...chosen].sort((a, b) => a - b)));
  document.getElementById('sp-use-all').addEventListener('click', () =>
    finishWith(units.map((_, i) => i)));
}

// ── Practice My Text (Speech Practice entrance) ───────────────
function renderPracticeMyText() {
  renderWorkingTextPicker(text => renderSpeechExerciseChooser(text));
}

// After a text is chosen: pick a compatible routine or game.
function renderSpeechExerciseChooser(text) {
  record(() => renderSpeechExerciseChooser(text));
  stopSpeech();
  const routines = learnerRoutines().filter(r => r.tryWithText);
  const games = ARCADE_GROUPS.flatMap(g => arcadeGamesFor(g.id))
    .filter(g => !g.needsScene || !!text.scene);
  app.innerHTML = `
    ${pageTopbar('📄 ' + esc(text.title), '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">Practice “${esc(text.title)}”</h1>
      <h2 class="chart-h">Guided routines</h2>
      ${routines.map(r => `
        <button class="track-card" data-rt="${r.id}" type="button">
          <div class="track-glyph">${PRACTICE_SUBJECTS.find(s => s.id === r.subject)?.icon ?? '🧭'}</div>
          <div class="track-info"><h2>${esc(r.title)}</h2><p>${esc(PRACTICE_SUBJECTS.find(s => s.id === r.subject)?.title ?? '')}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
      <h2 class="chart-h">Arcade games</h2>
      ${games.map(g => `
        <button class="track-card" data-game="${g.id}" type="button">
          <div class="track-glyph">${g.icon}</div>
          <div class="track-info"><h2>${esc(g.title)}</h2><p>${esc(g.blurb)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-rt]').forEach(b =>
    b.addEventListener('click', () => runRoutine(b.dataset.rt, text)));
  app.querySelectorAll('[data-game]').forEach(b =>
    b.addEventListener('click', () => runArcadeGame(b.dataset.game, text)));
}

// ── Speechcraft Arcade ────────────────────────────────────────
function renderArcade() {
  record(renderArcade);
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🕹 Speechcraft Arcade', '#6f8657')}
    <main class="track-list">
      <h1 class="page-h">Speechcraft Arcade</h1>
      <p class="track-blurb">Deterministic written games on real text — yours or Speechcraft’s. No recording, no timers breathing down your neck, and in the interpretive games no answer is “the correct one.”</p>
      ${ARCADE_GROUPS.map(g => `
        <h2 class="chart-h">${esc(g.title)}</h2>
        <p class="pane-note">${esc(g.blurb)}</p>
        <div class="mode-grid">
          ${arcadeGamesFor(g.id).map(game => `
            <button class="mode-card" data-game="${game.id}" type="button">
              <span class="mode-icon" aria-hidden="true">${game.icon}</span>
              <span class="mode-title">${esc(game.title)}</span>
              <span class="mode-blurb">${esc(game.blurb)}</span>
              <span class="mode-meta">${game.scoring === 'objective' ? 'recall — right/wrong exists' : 'interpretive — no scores'}</span>
            </button>`).join('')}
        </div>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-game]').forEach(b =>
    b.addEventListener('click', () => {
      const g = arcadeGameById(b.dataset.game);
      needWorkingText(text => runArcadeGame(g.id, text));
    }));
}

// Shared game chrome + completion. Objective games may show a recall
// tally; interpretive games end on completion only.
function finishArcadeGame(game, text, tally) {
  recordSpeechPractice({ kind: 'game', ref: game.id, title: game.title,
    textTitle: text?.title ?? null, skill: ARCADE_GROUPS.find(g => g.id === game.group)?.title ?? '' });
  store.addXp(5);
  renderSpeechReflection({
    heading: game.scoring === 'objective' && tally
      ? `${game.title} — ${tally.right}/${tally.total} recalled · +5 XP`
      : `${game.title} complete · +5 XP`,
    sub: game.scoring === 'objective'
      ? 'Recall has right answers; how you sounded is yours alone — nothing here judges that.'
      : 'Completion, not a grade — interpretive choices don’t have correct answers.',
    compatible: true,
  });
}

function gamePage(game, bodyHtml) {
  app.innerHTML = `
    ${pageTopbar(`${game.icon} ${esc(game.title)}`, '#6f8657')}
    <main class="guide sp-game">
      <h1>${esc(game.title)}</h1>
      <p class="pane-note">${esc(game.how)}</p>
      ${bodyHtml}
    </main>`;
  wireBrandHome();
}

// Unicode-safe word tokenization preserving whitespace and newlines.
const tokenizeSpeech = body => String(body).split(/(\s+)/);
const isWordToken = t => /\S/.test(t);
// First-letter prompt: keep leading/trailing punctuation + first letter.
const firstLetterToken = w => {
  const m = w.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}])(.*?)([^\p{L}\p{N}]*)$/us);
  return m ? m[1] + m[2] + m[4] : w;
};

function runArcadeGame(gameId, text) {
  record(() => runArcadeGame(gameId, text));
  stopSpeech();
  const game = arcadeGameById(gameId);
  if (!game) return renderArcade();                 // hidden games never run
  if (game.needsScene && !text.scene) {
    gamePage(game, `<p class="pane-note pane-warn">This game needs a scene — two or more characters with “NAME: line” per line. Pick a scene text and it lights up.</p>`);
    return;
  }
  const tokens = tokenizeSpeech(text.body);
  const words = tokens.map((t, i) => ({ t, i })).filter(x => isWordToken(x.t));

  // Builds the passage as inert DOM: every token a text node inside a
  // span — untrusted text never touches innerHTML.
  const passageDom = (mutate) => {
    const box = document.createElement('div');
    box.className = 'sp-passage-text';
    tokens.forEach((t, i) => {
      const span = document.createElement('span');
      span.textContent = t;
      span.dataset.i = i;
      if (mutate) mutate(span, t, i);
      box.appendChild(span);
    });
    return box;
  };

  // ── Build Fluency ─────────────────────────────────────────────
  if (game.id === 'vanishing') {
    const stages = [0, 0.3, 0.6, 0.85, 1];
    let stage = 0;
    // Deterministic hide order — a fixed hash permutation, no RNG.
    const order = words.map(w => w.i).sort((a, b) => ((a * 7919) % 9973) - ((b * 7919) % 9973));
    gamePage(game, `
      <div id="sp-stage-note" class="pane-note" aria-live="polite">Stage 1 of ${stages.length}: everything visible. Speak it, then vanish more.</div>
      <div id="sp-vt"></div>
      <div class="practice-row">
        <button class="btn btn-primary" id="sp-more" type="button">Vanish more</button>
        <button class="btn-lite" id="sp-reveal" type="button">Peek</button>
        <button class="btn-lite" id="sp-reset" type="button">Reset</button>
        <button class="btn" id="sp-done" type="button">Done</button>
      </div>`);
    const box = passageDom();
    document.getElementById('sp-vt').appendChild(box);
    const apply = () => {
      const hideCount = Math.round(words.length * stages[stage]);
      const hidden = new Set(order.slice(0, hideCount));
      box.querySelectorAll('span').forEach(sp =>
        sp.classList.toggle('sp-hidden', hidden.has(+sp.dataset.i)));
      document.getElementById('sp-stage-note').textContent =
        `Stage ${stage + 1} of ${stages.length}: ${Math.round(stages[stage] * 100)}% vanished. The layout holds — let it guide the recall.`;
    };
    apply();
    document.getElementById('sp-more').addEventListener('click', () => { stage = Math.min(stage + 1, stages.length - 1); apply(); });
    document.getElementById('sp-reveal').addEventListener('click', () => {
      box.classList.add('sp-peek');
      setTimeout(() => box.classList.remove('sp-peek'), 1500);
    });
    document.getElementById('sp-reset').addEventListener('click', () => { stage = 0; apply(); });
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  if (game.id === 'first-letter') {
    let showing = false;
    gamePage(game, `
      <div id="sp-fl"></div>
      <div class="practice-row">
        <button class="btn btn-primary" id="sp-toggle" type="button">Show the full text</button>
        <button class="btn" id="sp-done" type="button">Done</button>
      </div>`);
    const holder = document.getElementById('sp-fl');
    const draw = () => {
      holder.textContent = '';
      holder.appendChild(passageDom((span, t) => {
        if (isWordToken(t) && !showing) span.textContent = firstLetterToken(t);
      }));
    };
    draw();
    document.getElementById('sp-toggle').addEventListener('click', e => {
      showing = !showing; draw();
      e.target.textContent = showing ? 'Back to first letters' : 'Show the full text';
    });
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  if (game.id === 'cue-pickup') {
    const scene = text.scene;
    gamePage(game, `
      <p class="guide-text">Whose lines are you working on? (You choose — the game never guesses.)</p>
      <div class="chip-row" id="sp-chars">
        ${scene.characters.map(c => `<button class="chip-pick" data-char="${esc(c)}" type="button">${esc(c)}</button>`).join('')}
      </div>
      <div id="sp-cue"></div>`);
    app.querySelectorAll('[data-char]').forEach(b =>
      b.addEventListener('click', () => {
        const mine = b.dataset.char;
        const mineIdxs = scene.lines.map((l, i) => l.who === mine ? i : -1).filter(i => i >= 0);
        if (!mineIdxs.length) return;
        let at = 0, right = 0;
        const cueEl = document.getElementById('sp-cue');
        document.getElementById('sp-chars').querySelectorAll('button').forEach(x => {
          x.classList.toggle('on', x === b); x.disabled = true;
        });
        const draw = () => {
          if (at >= mineIdxs.length) return finishArcadeGame(game, text, { right, total: mineIdxs.length });
          const li = mineIdxs[at];
          cueEl.textContent = '';
          const cueLab = document.createElement('p'); cueLab.className = 'pane-note';
          cueLab.textContent = li === 0 ? 'You open the scene — no cue before this line.' : 'Your cue:';
          const cue = document.createElement('p'); cue.className = 'sp-cue-line';
          if (li > 0) cue.textContent = `${scene.lines[li - 1].who}: ${scene.lines[li - 1].text}`;
          const prompt = document.createElement('p'); prompt.className = 'guide-text';
          prompt.textContent = `Recall your line (${at + 1} of ${mineIdxs.length}), speak it, then reveal.`;
          const mineP = document.createElement('p'); mineP.className = 'sp-cue-mine'; mineP.hidden = true;
          mineP.textContent = `${mine}: ${scene.lines[li].text}`;
          const row = document.createElement('div'); row.className = 'practice-row';
          const revealB = document.createElement('button'); revealB.className = 'btn btn-primary'; revealB.type = 'button'; revealB.textContent = 'Reveal my line';
          const gotB = document.createElement('button'); gotB.className = 'btn'; gotB.type = 'button'; gotB.textContent = '✓ Had it'; gotB.hidden = true;
          const missB = document.createElement('button'); missB.className = 'btn-lite'; missB.type = 'button'; missB.textContent = '✗ Missed it'; missB.hidden = true;
          revealB.addEventListener('click', () => { mineP.hidden = false; revealB.hidden = true; gotB.hidden = false; missB.hidden = false; gotB.focus(); });
          gotB.addEventListener('click', () => { right++; at++; draw(); });
          missB.addEventListener('click', () => { at++; draw(); });
          row.append(revealB, gotB, missB);
          cueEl.append(cueLab, cue, prompt, mineP, row);
        };
        draw();
      }));
    return;
  }

  // ── Shape the Thought (interpretive) ──────────────────────────
  if (game.id === 'operative') {
    gamePage(game, `
      <p class="guide-text">Tap any word to make it the operative word — the one this version of the thought turns on.</p>
      <div id="sp-op"></div>
      <p class="pane-note" id="sp-op-note" aria-live="polite">No word chosen yet. Every word is a legitimate experiment.</p>
      <div class="practice-row"><button class="btn" id="sp-done" type="button">Done</button></div>`);
    const box = passageDom((span, t) => {
      if (!isWordToken(t)) return;
      span.className = 'sp-word';
      span.setAttribute('role', 'button');
      span.setAttribute('tabindex', '0');
      const pick = () => {
        box.querySelectorAll('.sp-word').forEach(w => w.classList.remove('on'));
        span.classList.add('on');
        document.getElementById('sp-op-note').textContent =
          `Operative: “${t.replace(/[^\p{L}\p{N}''-]/gu, '')}”. Speak the sentence landing there. What question is this version answering — and who would you be answering it for?`;
      };
      span.addEventListener('click', pick);
      span.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
    document.getElementById('sp-op').appendChild(box);
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  if (game.id === 'move-pause') {
    gamePage(game, `
      <p class="guide-text">Tap between words to place the pause — tap another gap to move it. The words never change.</p>
      <div id="sp-mp"></div>
      <p class="pane-note" aria-live="polite" id="sp-mp-note">No pause placed yet. A pause has no guaranteed meaning — it has whatever work you give it.</p>
      <div class="practice-row"><button class="btn-lite" id="sp-clear" type="button">Remove the pause</button>
        <button class="btn" id="sp-done" type="button">Done</button></div>`);
    const box = document.createElement('div');
    box.className = 'sp-passage-text';
    let current = null;
    tokens.forEach((t, i) => {
      const span = document.createElement('span');
      span.textContent = t;
      box.appendChild(span);
      if (/^\s+$/.test(t) && !t.includes('\n')) {
        const gap = document.createElement('button');
        gap.type = 'button'; gap.className = 'sp-gap';
        gap.setAttribute('aria-label', 'Place the pause here');
        gap.addEventListener('click', () => {
          box.querySelectorAll('.sp-gap.on').forEach(g => { g.classList.remove('on'); g.textContent = ''; });
          current = gap;
          gap.classList.add('on'); gap.textContent = '‖';
          document.getElementById('sp-mp-note').textContent =
            'Pause placed. Speak it with the pause doing real work — then move it and speak again. What changed?';
        });
        box.appendChild(gap);
      }
    });
    document.getElementById('sp-mp').appendChild(box);
    document.getElementById('sp-clear').addEventListener('click', () => {
      box.querySelectorAll('.sp-gap.on').forEach(g => { g.classList.remove('on'); g.textContent = ''; });
      current = null;
      document.getElementById('sp-mp-note').textContent = 'Pause removed — one even ribbon again.';
    });
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  if (game.id === 'tempo' || game.id === 'same-line' || game.id === 'objective-swap'
      || game.id === 'obstacle-drop' || game.id === 'action-swap') {
    // The deck games share one deterministic deal loop.
    const decks = {
      'tempo': TEMPO_DECK.map(t => `${t.label} — ${t.note}`),
      'same-line': CIRCUMSTANCE_DECK.map(c =>
        `Speaker: ${c.speaker}. Place: ${c.place}. Just before this: ${c.prior}. You both know: ${c.know}. Stakes: ${c.stakes}. You want to: ${c.objective}.`),
      'objective-swap': OBJECTIVE_DECK.map(o => `Your objective now: ${o}`),
      'obstacle-drop': OBSTACLE_DECK.map(o => `New obstacle: ${o} Keep pursuing what you want — what do you DO?`),
      'action-swap': PLAYABLE_ACTIONS.map(a => `Play the action: ${a.verb} — ${a.objective}`),
    };
    const deck = decks[game.id];
    let at = 0;
    gamePage(game, `
      <section class="sp-passage" aria-label="Your passage"><div class="sp-passage-text" id="sp-fixed"></div></section>
      <div class="sp-deal" id="sp-deal" aria-live="polite"></div>
      <div class="practice-row">
        <button class="btn btn-primary" id="sp-next-card" type="button">${game.id === 'obstacle-drop' ? 'Drop an obstacle' : 'Deal'}</button>
        <button class="btn" id="sp-done" type="button">Done</button>
      </div>`);
    document.getElementById('sp-fixed').textContent = text.body;
    const dealEl = document.getElementById('sp-deal');
    document.getElementById('sp-next-card').addEventListener('click', e => {
      const card = document.createElement('p');
      card.className = 'guide-text sp-card';
      card.textContent = deck[at % deck.length];
      dealEl.prepend(card);
      at++;
      e.target.textContent = game.id === 'obstacle-drop' ? 'Drop another' : 'Next';
    });
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  if (game.id === 'beats') {
    gamePage(game, `
      <p class="guide-text">Tap between words wherever the thought, action, circumstance or resistance turns — each mark starts a new beat.</p>
      <div id="sp-bb"></div>
      <p class="pane-note" id="sp-bb-note" aria-live="polite">No beats marked yet. Different readers hear different turns — yours are choices, not answers.</p>
      <div class="practice-row"><button class="btn-lite" id="sp-clear" type="button">Clear beats</button>
        <button class="btn" id="sp-done" type="button">Done</button></div>`);
    const box = document.createElement('div');
    box.className = 'sp-passage-text';
    let count = 0;
    tokens.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      box.appendChild(span);
      if (/^\s+$/.test(t)) {
        const gap = document.createElement('button');
        gap.type = 'button'; gap.className = 'sp-gap';
        gap.setAttribute('aria-label', 'Mark a beat change here');
        gap.addEventListener('click', () => {
          const on = !gap.classList.contains('on');
          gap.classList.toggle('on', on);
          gap.textContent = on ? '∕∕' : '';
          count += on ? 1 : -1;
          document.getElementById('sp-bb-note').textContent =
            count ? `${count} beat change${count === 1 ? '' : 's'} marked. Speak it honoring the turns — then try moving one.` : 'No beats marked.';
        });
        box.appendChild(gap);
      }
    });
    document.getElementById('sp-bb').appendChild(box);
    document.getElementById('sp-clear').addEventListener('click', () => {
      box.querySelectorAll('.sp-gap.on').forEach(g => { g.classList.remove('on'); g.textContent = ''; });
      count = 0;
      document.getElementById('sp-bb-note').textContent = 'Cleared.';
    });
    document.getElementById('sp-done').addEventListener('click', () => finishArcadeGame(game, text, null));
    return;
  }

  // Unknown game id — honest dead end, never a broken screen.
  gamePage(game, '<p class="pane-note pane-warn">This game isn’t available.</p>');
}

// ══ Shared workspace organisation components ══════════════════
// One set of builders for collection grids, module grids, chapter and
// lesson grids, badges, progress bars, review strips and rail cards —
// used by Speech and Acting alike. Presentation only: they never touch
// content records, review status or progress.

const TILE_TONES = ['is-sage', 'is-terracotta', 'is-blue', 'is-lavender', 'is-gold'];


function workspaceLibrary(el, { workspace, cards, state }) {
  const q = (state.query ?? '').trim().toLowerCase();
  const match = c => !q
    || c.title.toLowerCase().includes(q)
    || (c.keywords ?? '').toLowerCase().includes(q);
  const shown = cards.filter(match);

  const countLabel = c => c.count == null ? ''
    : `${c.count} ${c.unit}${c.count === 1 ? '' : 's'}`;

  el.innerHTML = `
    <div class="ws-head">
      <h1 class="page-h">${esc(workspace)} Library</h1>
      <p class="ws-sub">Browse the complete ${esc(workspace.toLowerCase())} reference by topic.</p>
    </div>
    <label class="field sp-search-field" for="lib-search">
      <span class="field-label">Search the Library</span>
      <input class="sonnet-search" id="lib-search" type="search" value="${esc(state.query ?? '')}"
             placeholder="Collection or topic…" autocomplete="off">
    </label>
    ${state.extraHtml ?? ''}
    ${q ? `<p class="pane-note" aria-live="polite">${shown.length} result${shown.length === 1 ? '' : 's'} for “${esc(state.query)}”</p>` : '<h2 class="sec-h">Collections</h2>'}
    <div class="tile-grid">
      ${shown.map(c => tileHtml({
        key: c.key, tone: c.tone, emoji: c.emoji, title: c.title, wide: c.wide,
        badge: c.badge, meta: countLabel(c),
      })).join('')}
    </div>
    ${!shown.length ? `<p class="pane-note">Nothing matches “${esc(state.query)}”.
      <button class="linkish" id="lib-clear" type="button">Clear the search</button></p>` : ''}`;

  const input = el.querySelector('#lib-search');
  input.addEventListener('input', () => {
    state.query = input.value;
    const at = input.selectionStart;
    workspaceLibrary(el, { workspace, cards, state });
    const again = el.querySelector('#lib-search');
    again.focus();
    try { again.setSelectionRange(at, at); } catch { /* fine */ }
  });
  el.querySelector('#lib-clear')?.addEventListener('click', () => {
    state.query = '';
    workspaceLibrary(el, { workspace, cards, state });
    el.querySelector('#lib-search').focus();
  });
  state.wire?.(el);
  el.querySelectorAll('[data-tile]').forEach(b =>
    b.addEventListener('click', () => cards.find(c => c.key === b.dataset.tile)?.go()));
}

// ══ THE ACTING WORKSPACE ══════════════════════════════════════
// Behavior within circumstances while pursuing an objective.
// Written and text-based only. Nothing interpretive is ever scored.
// Shared records (Speech chapters, Playable Actions, Question
// Everything) are LINKED from here, never copied.

// Acting content the learner may read: every acting lesson authored in
// this build is a prepared draft until a qualified acting teacher or
// coach reviews it (js/data/speech/reviews.js is the shared ledger).
// Published for preview by owner editorial approval; specialist
// review remains outstanding and is tracked separately.
const actingVisible = l => speechPublished(l.id);

function actingCensus() {
  const available = ACTING_LESSONS.filter(actingVisible);
  const awaiting = ACTING_LESSONS.filter(l => !actingVisible(l));
  const approaches = ACTING_APPROACHES.filter(a => !speechPublished(a.id));
  return { total: ACTING_LESSONS.length, available, awaiting, approaches,
    draftTotal: awaiting.length + approaches.length };
}

// Acting review inventory, grouped by kind — computed, never typed.
function actingReviewCategories() {
  const { awaiting, approaches } = actingCensus();
  const groups = [
    { id: 'lessons', label: 'Acting lessons', shortLabel: 'acting lessons',
      reviewer: 'Qualified acting teacher or coach', count: awaiting.length,
      items: awaiting.map(l => ({
        id: l.id, title: l.title, kind: 'acting-lesson',
        collection: `Module ${actingModuleFor(l)?.n} · ${actingModuleFor(l)?.title}`,
        reviewer: 'Qualified acting teacher or coach',
        why: 'Newly written acting instruction. A qualified teacher must confirm the account is accurate, useful and consistent with responsible practice before it is taught as approved material.',
        concerns: 'No single artistic interpretation implied; emotional states never taught as objectives; no method-specific claim presented as universal; no protected exercise sequences reproduced.',
        sources: l.sharedFrom ? [`Builds on the shared record: ${l.sharedFrom.label}`] : [],
        file: 'js/data/acting/course.js', record: l,
      })) },
    { id: 'approaches', label: 'Acting approach introductions', shortLabel: 'approach introductions',
      reviewer: 'Qualified acting teacher or coach', count: approaches.length,
      items: approaches.map(a => ({
        id: a.id, title: a.name, kind: 'approach',
        collection: 'Acting Library — Approaches to Acting',
        reviewer: 'Qualified acting teacher or coach',
        why: 'Introduces a named acting approach, its history, principles and terminology; a qualified teacher must confirm the account is accurate, fairly weighted and free of implied affiliation.',
        concerns: 'Accuracy of history and terminology; no approach flattened to a slogan; Stanislavski’s evolution acknowledged; no single authorized interpretation implied; no protected passages reproduced.',
        sources: [a.sections.sources], file: 'js/data/acting/approaches.js', record: a,
      })) },
  ].filter(g => g.count > 0);
  return { groups, total: groups.reduce((n, g) => n + g.count, 0) };
}

const ACTING_DRAFT_BADGE = 'Prepared draft — awaiting acting-professional review';
const approachPublished = a => speechPublished(a.id);

// ── Acting → Learn ────────────────────────────────────────────
// ── Acting → Learn: the optional guided pathway ───────────────
const ACTING_MODULE_TONE = { 1: 'is-sage', 2: 'is-blue', 3: 'is-lavender', 4: 'is-terracotta' };

function actingLearnPane(el) {
  const cats = actingReviewCategories();
  const avail = ACTING_LESSONS.filter(actingVisible);
  const done = avail.filter(l => speechLessonDone(l.id)).length;
  const next = avail.find(l => !speechLessonDone(l.id)) ?? null;
  const pct = avail.length ? Math.round(done / avail.length * 100) : 0;

  const cards = ACTING_MODULES.map(m => {
    const lessons = actingLessonsFor(m.id);
    const ready = lessons.filter(actingVisible);
    const mDone = ready.filter(l => speechLessonDone(l.id)).length;
    const st = groupStatus({ available: ready.length, done: mDone, prepared: lessons.length - ready.length });
    return tileHtml({
      key: `mod:${m.n}`, tone: ACTING_MODULE_TONE[m.n], title: m.title, badge: st,
      meta: ready.length ? m.blurb : 'Prepared lessons awaiting acting-professional review',
      progress: ready.length && mDone ? { done: mDone, total: ready.length } : null,
    });
  }).join('');

  el.innerHTML = `
    <div class="ws-head">
      <h1 class="page-h">Acting &amp; Scene Work</h1>
      <p class="ws-sub">${esc(ACTING_PRINCIPLE)}</p>
    </div>
    ${next ? `
    <section class="continue-card" aria-label="Continue learning">
      <div class="cc-info">
        <span class="cc-stage">${esc((actingModuleFor(next)?.title ?? '').toUpperCase())}</span>
        <h2>${esc(next.title)}</h2>
        <p class="cc-meta">${esc(next.objective)}</p>
        ${courseProgressHtml(done, avail.length)}
      </div>
      <button class="btn btn-primary cc-go" id="ac-continue" type="button">${done ? 'Continue lesson' : 'Start course'}</button>
    </section>`
    : `
    <section class="continue-card" aria-label="Course status">
      <div class="cc-info">
        <h2>${avail.length ? 'Every available lesson complete' : 'The course is written and in review'}</h2>
        <p class="cc-meta">${avail.length
          ? 'More lessons are prepared and waiting on acting-professional review.'
          : `All ${ACTING_LESSONS.length} lessons are written and waiting on a qualified acting teacher or coach. The Library, Actor’s Studio and Acting Practice are open meanwhile.`}</p>
      </div>
      <button class="btn btn-primary cc-go" id="ac-to-library" type="button">Browse the Acting Library</button>
    </section>`}
    <h2 class="sec-h">Course modules</h2>
    <div class="tile-grid">${cards}</div>
    ${cats.total ? reviewStripHtml('ac-review-link', cats.total, 'Acting drafts awaiting acting-professional review') : ''}
    <p class="pane-note sp-explore-more">
      <button class="linkish" id="ac-to-library-2" type="button">Browse everything in the Acting Library</button>
    </p>`;

  el.querySelector('#ac-review-link')?.addEventListener('click', renderActingReviewStatus);
  el.querySelector('#ac-continue')?.addEventListener('click', () => renderActingLesson(next.id));
  el.querySelector('#ac-to-library')?.addEventListener('click', () => goSection('library'));
  el.querySelector('#ac-to-library-2').addEventListener('click', () => goSection('library'));
  el.querySelectorAll('[data-tile]').forEach(b =>
    b.addEventListener('click', () => renderActingModule(+b.dataset.tile.slice(4))));
}

function renderActingModule(n) {
  record(() => renderActingModule(n));
  stopSpeech();
  const m = ACTING_MODULES.find(x => x.n === n);
  if (!m) return goSection('learn');
  const lessons = actingLessonsFor(m.id);
  const ready = lessons.filter(actingVisible);
  const done = ready.filter(l => speechLessonDone(l.id)).length;
  const st = groupStatus({ available: ready.length, done, prepared: lessons.length - ready.length });
  workspacePage(
    pageTopbar('🎭 Acting & Scene Work', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">${esc(m.title)}</h1>
       <p class="ws-sub"><span class="badge ${st.cls}">${esc(st.label)}</span>
         ${ready.length ? ` · ${done} of ${ready.length} lessons completed` : ` · ${lessons.length} lessons prepared`}</p>
     </div>`,
    `<div class="item-grid">
       ${lessons.map(l => itemTileHtml({
         key: l.id, seq: actingLessonNumber(l), title: l.title,
         note: actingVisible(l) ? (speechLessonDone(l.id) ? 'Completed' : l.objective) : ACTING_DRAFT_BADGE,
         state: actingVisible(l) ? '' : 'is-pending',
       })).join('')}
     </div>`);
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => renderActingLesson(b.dataset.item)));
}

// Acting chapter body — the one authoritative copy of an acting lesson.
function actingChapterBlocks(l) {
  return (l.body ?? []).map(b =>
    b.h ? `<h2 class="guide-heading">${esc(b.h)}</h2>`
    : b.p ? `<p class="guide-text">${esc(b.p)}</p>`
    : b.list ? `<ul class="th-list">${b.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '').join('');
}

function actingDraftGate(l, where) {
  app.innerHTML = `
    ${pageTopbar('🎭 ' + esc(l.title), '#8a6d3b')}
    <main class="guide">
      <h1 tabindex="-1" id="ac-h">${esc(l.title)}</h1>
      <p><span class="sp-badge">${esc(ACTING_DRAFT_BADGE)}</span></p>
      <p class="guide-text">This lesson is fully written. It stays out of ${where} until a qualified acting teacher or coach has reviewed it.</p>
      <p class="pane-note">${esc(DRAFT_VISIBILITY_NOTE)} ${esc(AI_DRAFT_NOTE)}</p>
      <div class="practice-row"><button class="btn btn-lite" id="ac-open-review" type="button">See its review status</button></div>
    </main>`;
  wireBrandHome();
  app.querySelector('#ac-h').focus();
  document.getElementById('ac-open-review').addEventListener('click', renderActingReviewStatus);
}

// ── Acting → Library chapter (reference, never a lesson) ──────
function renderActingChapter(id) {
  record(() => renderActingChapter(id));
  stopSpeech();
  const l = actingLessonById(id);
  if (!l) return goSection('library');
  if (!actingVisible(l)) return actingDraftGate(l, 'the Library');
  const col = ACTING_COLLECTIONS.find(c => c.lessons.includes(l.id));
  const sibs = (col?.lessons ?? []).map(actingLessonById).filter(x => x && actingVisible(x));
  const at = sibs.findIndex(x => x.id === l.id);
  const prev = at > 0 ? sibs[at - 1] : null;
  const nxt = at >= 0 && at < sibs.length - 1 ? sibs[at + 1] : null;

  app.innerHTML = `
    ${pageTopbar('📖 ' + esc(l.title), '#8a6d3b')}
    <main class="guide sp-chapter">
      <p class="pane-note">${esc(col?.title ?? 'Acting Library')}</p>
      <h1 tabindex="-1" id="ac-h">${esc(l.title)}</h1>
      ${actingChapterBlocks(l)}
      ${l.sharedFrom ? `<p class="pane-note">${esc(l.sharedNote ?? '')}
        <button class="linkish" data-shared="${esc(l.sharedFrom.id)}" data-shared-ws="${esc(l.sharedFrom.workspace)}" type="button">Open ${esc(l.sharedFrom.label)}</button></p>` : ''}
      ${glossaryChips(l.glossary)}
      ${actingModuleFor(l) ? `<p class="pane-note"><button class="linkish" id="ac-study" type="button">Study this in Learn</button></p>`
        : ''}
      <nav class="sp-chapter-nav" aria-label="Chapter navigation">
        ${prev ? `<button class="btn btn-lite" id="ac-prev" type="button">‹ ${esc(prev.title)}</button>` : '<span></span>'}
        ${nxt ? `<button class="btn btn-lite" id="ac-next" type="button">${esc(nxt.title)} ›</button>` : '<span></span>'}
      </nav>
    </main>`;
  wireBrandHome();
  wireGlossary(app);
  app.querySelector('#ac-h').focus();
  app.querySelectorAll('[data-shared]').forEach(b =>
    b.addEventListener('click', () => openSharedRecord(b.dataset.sharedWs, b.dataset.shared)));
  document.getElementById('ac-study')?.addEventListener('click', () => renderActingLesson(l.id));
  document.getElementById('ac-prev')?.addEventListener('click', () => { navStack.pop(); renderActingChapter(prev.id); });
  document.getElementById('ac-next')?.addEventListener('click', () => { navStack.pop(); renderActingChapter(nxt.id); });
}

// Opens the ONE authoritative record a shared concept lives in.
function openSharedRecord(ws, id) {
  if (ws === 'speech') { if (SPEECH_LIVE) setWorkspace('speech'); return renderSpeechChapter(id); }
  if (id === 'playable-actions') return renderPlayableActions();
  if (id === 'question-everything') return renderDissectTextbook();
  goSection('library');
}

// ── Acting → Learn lesson (guided step, not the chapter) ──────
function renderActingLesson(id) {
  record(() => renderActingLesson(id));
  stopSpeech();
  const l = actingLessonById(id);
  if (!l) return goSection('library');
  if (!actingVisible(l)) return actingDraftGate(l, 'the Library');
  const m = actingModuleFor(l);
  const seq = ACTING_LESSONS.filter(actingVisible);
  const at = seq.findIndex(x => x.id === id);
  const nxt = at >= 0 && at < seq.length - 1 ? seq[at + 1] : null;
  const isDone = speechLessonDone(id);

  app.innerHTML = `
    ${pageTopbar('🎭 ' + esc(l.title), '#8a6d3b')}
    <main class="guide sp-lesson">
      <p class="pane-note">Module ${m?.n} · ${esc(m?.title ?? '')} · Lesson ${esc(actingLessonNumber(l))}</p>
      <h1 tabindex="-1" id="ac-h">${esc(l.title)}</h1>
      <section class="sp-step" aria-label="Objective">
        <h2 class="guide-heading">Objective</h2>
        <p class="guide-text">${esc(l.objective)}</p>
      </section>
      <section class="sp-step" aria-label="Orientation">
        <h2 class="guide-heading">Orientation</h2>
        <p class="guide-text">${esc(l.orientation ?? '')}</p>
      </section>
      <section class="sp-step sp-chapter" aria-label="The chapter">
        ${actingChapterBlocks(l)}
        ${l.sharedFrom ? `<p class="pane-note">${esc(l.sharedNote ?? '')}
          <button class="linkish" data-shared="${esc(l.sharedFrom.id)}" data-shared-ws="${esc(l.sharedFrom.workspace)}" type="button">Open ${esc(l.sharedFrom.label)}</button></p>` : ''}
      </section>
      <section class="sp-step" aria-label="Reflection">
        <h2 class="guide-heading">Reflection</h2>
        <p class="guide-text">${esc(l.reflection ?? '')}</p>
        <p class="pane-note">A question to sit with — there is no answer to submit and nothing here is scored.</p>
      </section>
      <section class="sp-step" aria-label="Complete and continue">
        <h2 class="guide-heading">Complete and continue</h2>
        <div class="practice-row">
          <button class="btn ${isDone ? 'btn-lite' : 'btn-primary'}" id="ac-done" type="button" ${isDone ? 'disabled' : ''}>${isDone ? 'Completed ✓' : 'Mark lesson complete'}</button>
          ${nxt ? `<button class="btn" id="ac-next-lesson" type="button">Next: ${esc(nxt.title)} ›</button>` : ''}
        </div>
        <p class="pane-note" id="ac-done-note" aria-live="polite">${isDone ? 'Completed. Revisit the chapter any time — nothing resets.' : ''}</p>
      </section>
    </main>`;
  wireBrandHome();
  app.querySelector('#ac-h').focus();
  app.querySelectorAll('[data-shared]').forEach(b =>
    b.addEventListener('click', () => openSharedRecord(b.dataset.sharedWs, b.dataset.shared)));
  document.getElementById('ac-next-lesson')?.addEventListener('click', () => {
    navStack.pop(); renderActingLesson(nxt.id);
  });
  document.getElementById('ac-done').addEventListener('click', () => {
    if (!markSpeechLessonDone(id)) return;
    store.addXp(5);
    const btn = document.getElementById('ac-done');
    btn.textContent = 'Completed ✓'; btn.disabled = true;
    btn.classList.replace('btn-primary', 'btn-lite');
    document.getElementById('ac-done-note').textContent = 'Lesson complete · +5 XP.';
  });
}

// ── Acting → Library ──────────────────────────────────────────
const ACTING_COLLECTION_TONE = { principles: 'is-sage', scene: 'is-blue', rehearsal: 'is-lavender',
  character: 'is-terracotta', rhythm: 'is-gold', professional: 'is-sage' };
const ACTING_COLLECTION_EMOJI = { principles: '🎯', scene: '🔍', rehearsal: '🎬',
  character: '🧍', rhythm: '🎼', professional: '💼' };

function actingLibraryPane(el) {
  // Shelf order is the owner's reading order (2026-08-27): the craft arc
  // first (principles, character, investigation and its tools, actions,
  // rhythm, the job), then the texts, then the shared shelves. Collection
  // tiles and standalone tiles interleave, so the order is one literal
  // list rather than a mapped array.
  const colTile = id => {
    const c = ACTING_COLLECTIONS.find(x => x.id === id);
    return {
      key: `col:${c.id}`, tone: ACTING_COLLECTION_TONE[c.id],
      emoji: ACTING_COLLECTION_EMOJI[c.id], title: c.title,
      count: c.lessons.length, unit: 'chapter',
      keywords: c.lessons.map(lid => actingLessonById(lid)?.title ?? '').join(' '),
      go: () => renderActingCollection(c.id),
    };
  };
  const cards = [
    colTile('principles'),
    colTile('character'),
    colTile('scene'),
    // The Four Lists tool sits with the collection it serves (owner
    // order, 2026-08-27): investigation first, then its worksheet.
    { key: 'col:lists', tone: 'is-lavender', emoji: '📋', title: 'The Four Lists',
      count: 4, unit: 'list',
      keywords: 'character facts says about others reading five times building a character',
      go: () => renderFourListsLesson() },
    // Question Everything — the text-dissection textbook. Moved here from
    // the Studio hub (owner order, 2026-08-19): it is reading, so it lives
    // on the shelf. Count = the six numbered DISSECT_SECTIONS.
    { key: 'col:question', tone: 'is-lavender', emoji: '🔍', title: 'Question Everything',
      count: 6, unit: 'section',
      keywords: 'dissection given circumstances objective obstacle tactics text investigation questions',
      go: renderDissectTextbook },
    colTile('rehearsal'),
    { key: 'col:actions', tone: 'is-gold', emoji: '🎯', title: 'Playable Actions',
      count: ACTION_VERBS.length, unit: 'verb',
      keywords: 'action verb tactic objective doing not feeling playable',
      go: renderPlayableActions },
    colTile('rhythm'),
    colTile('professional'),
    // Monologues and Scenes are separate shelves (owner order,
    // 2026-08-20). Everything we ship today is a monologue; the Scenes
    // shelf is honest about being empty until scenes are added.
    { key: 'col:monologues', tone: 'is-gold', emoji: '📜', title: 'Monologues',
      count: Object.values(LIBRARIES).reduce((n, l) => n + l.data.length, 0), unit: 'monologue',
      keywords: 'monologue soliloquy speech character play author chekhov ibsen wilde oneill pirandello',
      go: renderTextsPage },
    { key: 'col:scenes', tone: 'is-terracotta', emoji: '🎭', title: 'Scenes',
      count: PROVIDED_SCENES.length, unit: 'scene',
      keywords: 'scene two-hander dialogue partner work',
      go: renderScenesShelf },
    { key: 'col:approaches', tone: 'is-terracotta', emoji: '🎭', title: 'Approaches to Acting',
      count: ACTING_APPROACHES.length, unit: 'introduction',
      keywords: ACTING_APPROACHES.map(a => a.name).join(' '), go: renderApproaches },
    // The whole Speechcraft Textbook, shelved here while the Speech
    // workspace is withdrawn (owner order, 2026-08-19). Same records,
    // never copied — it supersedes the 8-chapter Speech for Actors
    // subset, whose renderer stays dormant behind SPEECH_LIVE.
    { key: 'col:textbook', tone: 'is-sage', emoji: '📗', title: 'Speechcraft Textbook',
      count: textbookOrder().length, unit: 'chapter', badge: { cls: '', label: 'Shared' },
      keywords: 'speech breath voice articulation fluency pace principles instrument meaning presence textbook',
      go: renderTextbook },
  ];
  workspaceLibrary(el, { workspace: 'Acting', cards, state: libState.acting });
}

function renderSpeechForActors() {
  record(renderSpeechForActors);
  stopSpeech();
  const picks = [
    ['sp-f-instrument', 'The physical chain your performance runs on'],
    ['sp-f-breath', 'Breath that supports the scene without taking attention'],
    ['sp-f-voice', 'Range and freedom for performance demands'],
    ['sp-f-articulation', 'Clarity the back row can follow'],
    ['sp-start-fluency', 'Why fluency frees you to listen and respond'],
    ['sp-m-pace', 'Pace and phrasing as behavior, not delivery rules'],
    ['sp-w-movement', 'Keeping speech available while the body works'],
    ['sp-w-applying', 'Letting technique run in the background'],
  ].map(([id, note]) => ({ l: speechLessonById(id), note })).filter(x => x.l);
  workspacePage(
    pageTopbar('🗣 Speech for Actors', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">Speech for Actors</h1>
       <p class="ws-sub">${picks.length} shared Speech chapters · opened from the Speech Library’s own records.</p>
     </div>`,
    `<div class="item-grid">
       ${picks.map(({ l, note }) => itemTileHtml({
         key: l.id, title: l.title,
         note: speechBodyVisible(l) ? note : 'Prepared draft — awaiting professional review',
         state: speechBodyVisible(l) ? '' : 'is-pending' })).join('')}
     </div>`);
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => { if (SPEECH_LIVE) setWorkspace('speech'); renderSpeechChapter(b.dataset.item); }));
}

// IPA and dialect resources for actors — links only.
function renderActorIpaTools() {
  record(renderActorIpaTools);
  stopSpeech();
  const d = activeCourse() === 'core' ? 'nam' : activeCourse();
  workspacePage(
    pageTopbar('ʃə IPA & Dialect Tools', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">IPA &amp; Dialect Tools for Actors</h1>
       <p class="ws-sub">3 shared references · these live in the IPA and Accents workspaces and are linked, never copied.</p>
     </div>`,
    `<div class="item-grid">
       ${itemTileHtml({ key: 'chart', title: 'IPA Chart', note: 'Every sound across the courses' })}
       ${itemTileHtml({ key: 'accents', title: 'Accent courses', note: 'Neutral American, Traditional RP, Standard British, Australian' })}
       ${itemTileHtml({ key: 'dialects', title: 'Dialects in Speech', note: 'How dialect shapes rhythm, register and use' })}
     </div>`);
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => {
      const k = b.dataset.item;
      if (k === 'chart') return renderChart();
      if (k === 'accents') { setWorkspace('accents'); return goSection('learn'); }
      if (k === 'action') { setWorkspace('accents'); return renderDialectAction(d); }
      renderDialectsInSpeech();
    }));
}

function renderActingCollection(collectionId) {
  record(() => renderActingCollection(collectionId));
  stopSpeech();
  const c = ACTING_COLLECTIONS.find(x => x.id === collectionId);
  if (!c) return goSection('library');
  const lessons = c.lessons.map(actingLessonById).filter(Boolean);
  workspacePage(
    pageTopbar('📚 Acting Library', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h"><span class="tile-emoji" aria-hidden="true">${ACTING_COLLECTION_EMOJI[c.id]}</span>${esc(c.title)}</h1>
       <p class="ws-sub">${lessons.length} chapters · Acting Library</p>
     </div>`,
    `<p class="pane-note">Read in any order. This sequence is a suggested starting point.</p>
     <div class="item-grid">
       ${lessons.map((l, i) => itemTileHtml({
         key: l.id, seq: String(i + 1).padStart(2, '0'), title: l.title,
         note: actingVisible(l) ? '' : ACTING_DRAFT_BADGE,
         state: actingVisible(l) ? '' : 'is-pending',
       })).join('')}
     </div>
     ${collectionId === 'scene' ? `
       <h2 class="sec-h">Acting Glossary</h2>
       <p class="pane-note">${Object.keys(ACTING_GLOSSARY).length} terms used across the acting chapters.</p>
       <dl class="anat-list sp-terms" id="ac-glossary-inline"></dl>` : ''}`);
  if (collectionId === 'scene') {
    const gl = app.querySelector('#ac-glossary-inline');
    for (const t of Object.values(ACTING_GLOSSARY)) {
      const row = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = t.term;
      const dd = document.createElement('dd'); dd.textContent = t.def;
      row.append(dt, dd); gl.appendChild(row);
    }
  }
  app.querySelectorAll('[data-item]').forEach(b =>
    b.addEventListener('click', () => renderActingChapter(b.dataset.item)));
}

function renderActingGlossary() {
  record(renderActingGlossary);
  stopSpeech();
  workspacePage(
    pageTopbar('📕 Acting Glossary', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h"><span class="tile-emoji" aria-hidden="true">📕</span>Acting Glossary</h1>
       <p class="ws-sub">${Object.keys(ACTING_GLOSSARY).length} terms · Acting Library</p>
     </div>`,
    '<dl class="anat-list sp-terms" id="ac-glossary"></dl>');
  const gl = document.getElementById('ac-glossary');
  for (const [, t] of Object.entries(ACTING_GLOSSARY)) {
    const row = document.createElement('div');
    const dt = document.createElement('dt'); dt.textContent = t.term;
    const dd = document.createElement('dd'); dd.textContent = t.def;
    row.append(dt, dd); gl.appendChild(row);
  }
}

// ── Acting → Practice ─────────────────────────────────────────
function actingPracticePane(el) {
  const proj = actingProject();
  el.innerHTML = `
    <h1 class="page-h">Acting Practice</h1>
    <p class="pane-note sp-wt-line">${proj
      ? `Working on: <b>${esc(proj.title)}</b> <button class="linkish" id="ac-change" type="button">change</button>`
      : 'No scene or monologue selected — exercises will ask, or <button class="linkish" id="ac-pick" type="button">choose one now</button>.'}</p>
    ${SCENE_STUDY_LIVE ? `
    <button class="track-card hub-card" id="acp-scene" type="button">
      <div class="track-glyph">🎬</div>
      <div class="track-info"><h2>Scene Study</h2></div>
      <div class="track-arrow">›</div>
    </button>` : ''}
    <button class="track-card hub-card" id="acp-arcade" type="button">
      <div class="track-glyph">🕹</div>
      <div class="track-info"><h2>Acting Arcade</h2></div>
      <div class="track-arrow">›</div>
    </button>
    <button class="track-card hub-card" id="acp-cards" type="button">
      <div class="track-glyph">🃏</div>
      <div class="track-info"><h2>Flash Cards</h2></div>
      <div class="track-arrow">›</div>
    </button>
    <button class="track-card hub-card" id="acp-rhythm" type="button">
      <div class="track-glyph">🎼</div>
      <div class="track-info"><h2>Rhythm Cards</h2></div>
      <div class="track-arrow">›</div>
    </button>
    <button class="track-card hub-card" id="acp-mytext" type="button">
      <div class="track-glyph">📄</div>
      <div class="track-info"><h2>Practice My Text</h2></div>
      <div class="track-arrow">›</div>
    </button>`;
  el.querySelector('#acp-rhythm')?.addEventListener('click', () =>
    proj ? renderRhythmCards() : renderArcadeTextPicker(() => renderRhythmCards()));
  el.querySelector('#ac-change')?.addEventListener('click', () =>
    renderArcadeTextPicker(() => goSection('practice')));
  el.querySelector('#ac-pick')?.addEventListener('click', () =>
    renderArcadeTextPicker(() => goSection('practice')));
  el.querySelector('#acp-scene')?.addEventListener('click', () =>
    renderArcadeTextPicker(() => renderSceneStudy()));
  el.querySelector('#acp-arcade').addEventListener('click', () =>
    renderArcadeTextPicker(() => renderActingArcade()));
  el.querySelector('#acp-cards').addEventListener('click', () =>
    renderArcadeTextPicker(t => renderFlashCards(t)));
  el.querySelector('#acp-mytext').addEventListener('click', () =>
    renderArcadeTextPicker(() => renderActingArcade()));
}

// ── Flash Cards: the cue-line drill actors actually use ───────
// Front = the line BEFORE yours. Back = your line. In a scene you pick
// your character and every one of their lines becomes a card, cued by
// whatever precedes it. In a monologue each line is cued by the line
// before it — the same way a monologue is learned off its own spine.
// Nothing is scored: you turn a card over and judge for yourself.
function flashCardsFor(text, who) {
  const scene = text.scene ?? detectSceneLines(text.body);
  if (scene && who) {
    return scene.lines
      .map((l, i) => ({ l, prev: scene.lines[i - 1] ?? null }))
      .filter(x => x.l.who === who)
      .map(x => ({
        cueWho: x.prev ? x.prev.who : null,
        cue: x.prev ? x.prev.text : 'Top of the scene — you open.',
        line: x.l.text,
      }));
  }
  const lines = String(text.body).split(/\r?\n/).map(t => t.trim()).filter(Boolean);
  return lines.map((line, i) => ({
    cueWho: null,
    cue: i === 0 ? 'Top of the piece — you open.' : lines[i - 1],
    line,
  }));
}

// The same drill as renderFlashCards, rendered INSIDE a project tab so
// it never leaves the page you are working on. State is local to the
// pane — nothing is stored, because a flash card has no progress worth
// keeping, only a stack you go round again.
function paneFlashCards(pane, p) {
  const text = { title: p.title || 'Untitled project', body: String(p.text ?? ''), scene: null };
  const scene = detectSceneLines(text.body);
  let who = scene ? null : '';
  let n = 0, shown = false;

  const draw = () => {
    if (!text.body.trim()) { pane.innerHTML = emptyText(); return; }
    if (scene && who === null) {
      pane.innerHTML = `
        <p class="pane-note">A scene — pick your part and every one of its lines becomes a card,
          cued by the line before it.</p>
        <div class="item-grid">
          ${scene.characters.map(c => `
            <button class="tile" data-who="${esc(c)}" type="button">
              <span class="tile-emoji" aria-hidden="true">🎭</span>
              <span class="tile-title">${esc(c)}</span>
              <span class="tile-meta">${scene.lines.filter(l => l.who === c).length} lines</span>
            </button>`).join('')}
        </div>`;
      pane.querySelectorAll('[data-who]').forEach(b =>
        b.addEventListener('click', () => { who = b.dataset.who; n = 0; shown = false; draw(); }));
      return;
    }
    const cards = flashCardsFor({ ...text, scene }, who || null);
    if (!cards.length) {
      pane.innerHTML = '<p class="pane-note">No lines to make cards from yet — add text on the Text tab.</p>';
      return;
    }
    n = Math.min(Math.max(n, 0), cards.length - 1);
    const c = cards[n];
    pane.innerHTML = `
      <p class="pane-note">Card ${n + 1} of ${cards.length}${who ? ` · ${esc(who)}` : ''} —
        read the cue, say your line, then turn it over. Nothing here is scored.
        ${scene ? '<button class="linkish" id="fcp-part" type="button">change part</button>' : ''}</p>
      <section class="sp-passage" aria-label="Cue line">
        <span class="cc-stage">${c.cueWho ? esc(c.cueWho) : 'Cue'}</span>
        <div class="sp-passage-text" id="fcp-cue"></div>
      </section>
      <section class="sp-passage ${shown ? '' : 'is-hidden-card'}" aria-label="Your line" aria-live="polite">
        <span class="cc-stage">${who ? esc(who) : 'Your line'}</span>
        <div class="sp-passage-text" id="fcp-line">${shown ? '' : '· · ·'}</div>
      </section>
      <div class="practice-row">
        ${shown
          ? `<button class="btn btn-primary" id="fcp-next" type="button">${n + 1 < cards.length ? 'Next card ›' : 'Start again'}</button>`
          : '<button class="btn btn-primary" id="fcp-show" type="button">Show my line</button>'}
        <button class="btn-lite" id="fcp-prev" type="button" ${n === 0 ? 'disabled' : ''}>‹ Previous</button>
      </div>`;
    // textContent, never innerHTML — a pasted script stays inert.
    pane.querySelector('#fcp-cue').textContent = c.cue;
    if (shown) pane.querySelector('#fcp-line').textContent = c.line;
    pane.querySelector('#fcp-show')?.addEventListener('click', () => { shown = true; draw(); });
    pane.querySelector('#fcp-next')?.addEventListener('click', () => {
      n = n + 1 < cards.length ? n + 1 : 0; shown = false; draw();
    });
    pane.querySelector('#fcp-prev')?.addEventListener('click', () => { n -= 1; shown = false; draw(); });
    pane.querySelector('#fcp-part')?.addEventListener('click', () => { who = null; n = 0; shown = false; draw(); });
  };
  draw();
}

function renderFlashCards(text, who = null, i = 0, shown = false) {
  record(() => renderFlashCards(text, who, i, shown));
  stopSpeech();
  const scene = text.scene ?? detectSceneLines(text.body);

  // A scene needs to know which part is yours before it can cue you.
  if (scene && !who) {
    workspacePage(
      pageTopbar('🃏 Flash Cards', '#8a6d3b'),
      `<div class="ws-head">
         <h1 class="page-h">Which part is yours?</h1>
         <p class="ws-sub">${esc(text.title)} · every line of your part becomes a card, cued by the line before it.</p>
       </div>`,
      `<div class="item-grid">
         ${scene.characters.map(c => `
           <button class="tile" data-who="${esc(c)}" type="button">
             <span class="tile-emoji" aria-hidden="true">🎭</span>
             <span class="tile-title">${esc(c)}</span>
             <span class="tile-meta">${scene.lines.filter(l => l.who === c).length} lines</span>
           </button>`).join('')}
       </div>`);
    app.querySelectorAll('[data-who]').forEach(b =>
      b.addEventListener('click', () => renderFlashCards(text, b.dataset.who, 0, false)));
    return;
  }

  const cards = flashCardsFor(text, who);
  if (!cards.length) {
    workspacePage(
      pageTopbar('🃏 Flash Cards', '#8a6d3b'),
      `<div class="ws-head"><h1 class="page-h">Flash Cards</h1></div>`,
      `<p class="pane-note">This text has no lines to make cards from. Choose another from
         <button class="linkish" id="fc-other" type="button">Scripts &amp; Speeches or your own work</button>.</p>`);
    document.getElementById('fc-other')?.addEventListener('click', () =>
      renderArcadeTextPicker(t => renderFlashCards(t)));
    return;
  }

  const n = Math.min(Math.max(i, 0), cards.length - 1);
  const c = cards[n];
  app.innerHTML = `
    ${pageTopbar('🃏 Flash Cards', '#8a6d3b')}
    <main class="guide sp-game">
      <h1>${esc(text.title)}${who ? ` · ${esc(who)}` : ''}</h1>
      <p class="pane-note">Card ${n + 1} of ${cards.length} — read the cue, say your line, then turn it over.
        Nothing here is scored.</p>
      <section class="sp-passage" aria-label="Cue line">
        <span class="cc-stage">${c.cueWho ? esc(c.cueWho) : 'Cue'}</span>
        <div class="sp-passage-text" id="fc-cue"></div>
      </section>
      <section class="sp-passage ${shown ? '' : 'is-hidden-card'}" aria-label="Your line" aria-live="polite">
        <span class="cc-stage">${who ? esc(who) : 'Your line'}</span>
        <div class="sp-passage-text" id="fc-line">${shown ? '' : '· · ·'}</div>
      </section>
      <div class="practice-row">
        ${shown
          ? `<button class="btn btn-primary" id="fc-next" type="button">${n + 1 < cards.length ? 'Next card ›' : 'Start again'}</button>`
          : '<button class="btn btn-primary" id="fc-show" type="button">Show my line</button>'}
        <button class="btn-lite" id="fc-prev" type="button" ${n === 0 ? 'disabled' : ''}>‹ Previous</button>
        <button class="btn-lite" id="fc-change" type="button">Change text</button>
      </div>
    </main>`;
  wireBrandHome();
  // textContent, never innerHTML — a pasted script is inert here, always.
  document.getElementById('fc-cue').textContent = c.cue;
  if (shown) document.getElementById('fc-line').textContent = c.line;

  document.getElementById('fc-show')?.addEventListener('click', () => {
    navStack.pop(); renderFlashCards(text, who, n, true);
  });
  document.getElementById('fc-next')?.addEventListener('click', () => {
    navStack.pop(); renderFlashCards(text, who, n + 1 < cards.length ? n + 1 : 0, false);
  });
  document.getElementById('fc-prev')?.addEventListener('click', () => {
    navStack.pop(); renderFlashCards(text, who, n - 1, false);
  });
  document.getElementById('fc-change')?.addEventListener('click', () =>
    renderArcadeTextPicker(t => renderFlashCards(t)));
}

function renderActingArcade() {
  record(renderActingArcade);
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🕹 Acting Arcade', '#8a6d3b')}
    <main class="track-list">
      <h1 class="page-h">Acting Arcade</h1>
      <p class="track-blurb">Text-based explorations on your scene or monologue. Deterministic, local, and never scored — no game here has a correct answer.</p>
      ${(() => { const t = workingText(); return t
        ? `<p class="pane-note">Playing on: <b>${esc(t.title)}</b> <button class="linkish" id="arc-change" type="button">change text</button></p>`
        : '<p class="pane-note">No text chosen yet — any exercise will ask first.</p>'; })()}
      <div class="mode-grid">
        ${ACTING_GAMES.map(g => `
          <button class="mode-card" data-agame="${g.id}" type="button">
            <span class="mode-icon" aria-hidden="true">${g.icon}</span>
            <span class="mode-title">${esc(g.title)}</span>
            <span class="mode-blurb">${esc(g.blurb)}</span>
            <span class="mode-meta">interpretive — no scores</span>
          </button>`).join('')}
      </div>
    </main>`;
  wireBrandHome();
  document.getElementById('arc-change')?.addEventListener('click', () =>
    renderArcadeTextPicker(() => renderActingArcade()));
  app.querySelectorAll('[data-agame]').forEach(b =>
    b.addEventListener('click', () => {
      const t = workingText();
      if (t) return runActingGame(b.dataset.agame, t);
      renderArcadeTextPicker(text => runActingGame(b.dataset.agame, text));
    }));
}

function runActingGame(gameId, text) {
  record(() => runActingGame(gameId, text));
  stopSpeech();
  const game = actingGameById(gameId);
  if (!game) return renderActingArcade();
  // The action deck: the twelve taught actions with their objectives,
  // then the wider vocabulary as bare verbs (owner order, 2026-08-20).
  const deck = game.deck === 'actions'
    ? [...PLAYABLE_ACTIONS.map(a => `${a.verb} — ${a.objective}`),
       ...ACTION_VERBS.filter(v => !taughtActionFor(v))]
    : (ACTING_DECKS[game.deck] ?? []);

  app.innerHTML = `
    ${pageTopbar(`${game.icon} ${esc(game.title)}`, '#8a6d3b')}
    <main class="guide sp-game">
      <h1>${esc(game.title)}</h1>
      <p class="pane-note">${esc(game.how)}</p>
      <section class="sp-passage" aria-label="Your text"><div class="sp-passage-text" id="ac-fixed"></div></section>
      ${game.tool === 'beats' ? `
        <p class="guide-text">Tap between words to mark where the scene turns.</p>
        <div id="ac-beats"></div>
        <p class="pane-note" id="ac-beat-note" aria-live="polite">No turns marked yet — different actors divide the same scene differently.</p>`
      : `<div class="sp-deal" id="ac-deal" aria-live="polite"></div>`}
      <div class="practice-row">
        ${game.tool === 'beats' ? '<button class="btn-lite" id="ac-clear" type="button">Clear marks</button>'
          : '<button class="btn btn-primary" id="ac-deal-btn" type="button">Deal</button>'}
        <button class="btn" id="ac-game-done" type="button">Done</button>
      </div>
    </main>`;
  wireBrandHome();
  document.getElementById('ac-fixed').textContent = text.body;   // inert, always

  if (game.tool === 'beats') {
    const tokens = String(text.body).split(/(\s+)/);
    const box = document.createElement('div');
    box.className = 'sp-passage-text';
    let count = 0;
    tokens.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      box.appendChild(span);
      if (/^\s+$/.test(t)) {
        const gap = document.createElement('button');
        gap.type = 'button'; gap.className = 'sp-gap';
        gap.setAttribute('aria-label', 'Mark a turn here');
        gap.addEventListener('click', () => {
          const on = !gap.classList.contains('on');
          gap.classList.toggle('on', on);
          gap.textContent = on ? '∕∕' : '';
          count += on ? 1 : -1;
          document.getElementById('ac-beat-note').textContent =
            count ? `${count} turn${count === 1 ? '' : 's'} marked — your divisions, not an answer key.` : 'No turns marked yet.';
        });
        box.appendChild(gap);
      }
    });
    document.getElementById('ac-beats').appendChild(box);
    document.getElementById('ac-clear').addEventListener('click', () => {
      box.querySelectorAll('.sp-gap.on').forEach(g => { g.classList.remove('on'); g.textContent = ''; });
      count = 0;
      document.getElementById('ac-beat-note').textContent = 'Cleared.';
    });
  } else {
    let at = 0;
    const dealEl = document.getElementById('ac-deal');
    document.getElementById('ac-deal-btn').addEventListener('click', e => {
      const card = document.createElement('p');
      card.className = 'guide-text sp-card';
      card.textContent = deck[at % deck.length] ?? '';
      dealEl.prepend(card);
      at++;
      e.target.textContent = 'Next';
    });
  }

  document.getElementById('ac-game-done').addEventListener('click', () => {
    recordSpeechPractice({ kind: 'acting-game', ref: game.id, title: game.title,
      textTitle: text?.title ?? null, skill: 'Acting' });
    store.addXp(5);
    renderSpeechReflection({
      heading: `${game.title} complete · +5 XP`,
      sub: 'Exploration, not a grade — interpretive work has no correct answer.',
      compatible: true,
    });
  });
}

// ── Acting → Studio (the Actor's Studio) ──────────────────────
// The "current acting project" is the SHARED working text — one
// selection system across the whole app, no second store.
function actingProject() { return workingText(); }

function actorStudioPane(el) {
  const proj = actingProject();
  const ref = workingTextRef();
  // Two ways in (owner order, 2026-08-20): the texts we ship, and your
  // own. Everything the Studio used to list — Scene Study, Question
  // Everything, beats, actions, notes — is reached ON a script now, from
  // the rail on its own page, where it belongs.
  const cards = [
    { icon: '📜', title: 'Scenes & Monologues', go: renderTextsPage },
    { icon: '🎬', title: 'Custom Work', go: renderCustomWork },
  ];
  el.innerHTML = `
    <h1 class="page-h">Actor’s Studio</h1>
    ${proj ? `
      <section class="sp-wt-card" aria-label="Current acting project">
        <div class="sp-wt-info">
          <span class="cc-stage">Current acting project</span>
          <h2>${esc(proj.title)}</h2>
          <p class="cc-meta">${esc(proj.scene ? 'Scene' : 'Monologue or speech')}${proj.source === 'studio' ? ' · from my Studio projects' : ' · provided Speechcraft text'}${proj.scene ? ` · ${esc(proj.scene.characters.join(', '))}` : ''}</p>
        </div>
        <div class="sp-wt-actions">
          ${ref?.source === 'studio' ? '<button class="btn-lite" id="ac-open" type="button">Open project</button>' : ''}
          <button class="btn-lite" id="ac-change" type="button">Change text</button>
          <button class="btn-lite" id="ac-scene" type="button">Continue scene study</button>
          <button class="btn btn-practice" id="ac-practice" type="button">Practice this text</button>
        </div>
      </section>`
    : `
      <section class="sp-wt-card is-empty" aria-label="Current acting project">
        <div class="sp-wt-info">
          <span class="cc-stage">Current acting project</span>
          <h2>No acting project selected</h2>
        </div>
        <div class="sp-wt-actions">
          <button class="btn btn-primary" id="ac-choose" type="button">Choose a scene or monologue</button>
        </div>
      </section>`}
    ${cards.map((c, i) => `
      <button class="track-card hub-card" data-i="${i}" type="button" style="--track-color:#8a6d3b">
        <div class="track-glyph">${c.icon}</div>
        <div class="track-info"><h2>${esc(c.title)}</h2></div>
        <div class="track-arrow">›</div>
      </button>`).join('')}`;
  el.querySelector('#ac-open')?.addEventListener('click', () => renderScript(ref.id));
  el.querySelector('#ac-change')?.addEventListener('click', () => renderWorkingTextPicker());
  el.querySelector('#ac-choose')?.addEventListener('click', () => renderWorkingTextPicker());
  el.querySelector('#ac-scene')?.addEventListener('click', () => renderSceneStudy());
  el.querySelector('#ac-practice')?.addEventListener('click', () => goSection('practice'));
  el.querySelectorAll('[data-i]').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
}

// Question Everything applied to the selected project — the SHARED
// dissection system, unchanged, with its existing autosave and
// "I don't know yet" / "Not relevant" marks.
function openProjectDissection() {
  const ref = workingTextRef();
  if (ref?.source === 'studio') return renderDissect(ref.id);
  renderDissectTextbook();
}

// ── Scene Study: ten areas, any order, exploration not score ──
function renderSceneStudy(focusArea) {
  record(() => renderSceneStudy(focusArea));
  stopSpeech();
  const proj = actingProject();
  if (!proj) return renderWorkingTextPicker(() => renderSceneStudy(focusArea));
  const notes = sceneStudyNotes(proj.id);
  const explored = SCENE_STUDY_AREAS.filter(a => (notes[a.id] ?? '').trim()).length;
  const open = SCENE_STUDY_AREAS.length - explored;

  app.innerHTML = `
    ${pageTopbar('🎬 Scene Study', '#8a6d3b')}
    <main class="guide">
      <h1 tabindex="-1" id="ac-h">Scene Study</h1>
      <p class="pane-note">${esc(proj.title)}</p>
      <p class="guide-text">Work these in any order. Coverage shows what you have explored — it is never a score, and completing every area does not make an interpretation correct.</p>
      <p class="pane-note" id="ss-cov" aria-live="polite">${explored} of ${SCENE_STUDY_AREAS.length} areas explored · ${open} still open</p>
      <section class="sp-passage" aria-label="Your text"><div class="sp-passage-text" id="ss-text"></div></section>
      <div id="ss-areas"></div>
    </main>`;
  wireBrandHome();
  document.getElementById('ss-text').textContent = proj.body ?? '';
  const box = document.getElementById('ss-areas');

  for (const area of SCENE_STUDY_AREAS) {
    const sec = document.createElement('section');
    sec.className = 'sp-step diss-q';
    const h = document.createElement('h2');
    h.className = 'guide-heading';
    h.textContent = area.title;
    const p = document.createElement('p');
    p.className = 'guide-text';
    p.textContent = area.prompt;
    // Six areas carry the questions of their Question Everything section,
    // so the whole question set is workable here, on this scene, without
    // leaving for the textbook.
    const qe = area.qeSection != null ? DISSECT_SECTIONS[area.qeSection] : null;
    // One question is stated as a line; a one-item bullet list reads as a
    // list that lost its other items. Matches the textbook's asksHtml.
    const single = qe && (qe.asks ?? []).length === 1;
    const asks = document.createElement(single ? 'p' : 'ul');
    if (qe && single) {
      asks.className = 'guide-text ss-ask-one';
      asks.textContent = qe.asks[0];
    } else if (qe) {
      asks.className = 'th-list ss-asks';
      for (const a of qe.asks ?? []) {
        const li = document.createElement('li');
        li.textContent = a;
        asks.appendChild(li);
      }
    }
    const label = document.createElement('label');
    label.className = 'field';
    const span = document.createElement('span');
    span.className = 'field-label';
    span.textContent = `Your notes on ${area.title.toLowerCase()} (optional)`;
    const ta = document.createElement('textarea');
    ta.className = 'input-sel sp-note';
    ta.rows = 3;
    ta.value = notes[area.id] ?? '';
    ta.setAttribute('aria-label', `${area.title} notes`);
    const status = document.createElement('p');
    status.className = 'pane-note';
    status.setAttribute('aria-live', 'polite');
    let t = null;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      status.textContent = 'Saving…';
      t = setTimeout(() => {
        const okSave = saveSceneStudyNote(proj.id, area.id, ta.value);
        status.textContent = okSave ? 'Saved ✓' : 'Could not save on this device.';
        const now = SCENE_STUDY_AREAS.filter(a => (sceneStudyNotes(proj.id)[a.id] ?? '').trim()).length;
        document.getElementById('ss-cov').textContent =
          `${now} of ${SCENE_STUDY_AREAS.length} areas explored · ${SCENE_STUDY_AREAS.length - now} still open`;
      }, 400);
    });
    label.append(span, ta);
    sec.append(h, p);
    if (qe) sec.append(asks);
    sec.append(label, status);
    if (area.id === 'actions') {
      const link = document.createElement('button');
      link.className = 'btn-lite'; link.type = 'button';
      link.textContent = '🎯 Browse Playable Actions';
      link.addEventListener('click', renderPlayableActions);
      sec.appendChild(link);
    }
    box.appendChild(sec);
  }
  if (focusArea) {
    const idx = SCENE_STUDY_AREAS.findIndex(a => a.id === focusArea);
    if (idx >= 0) box.children[idx]?.scrollIntoView({ block: 'start' });
  }
  app.querySelector('#ac-h').focus();
}

// ── Acting → Progress ─────────────────────────────────────────
function actingProgressPane(el) {
  const avail = ACTING_LESSONS.filter(actingVisible);
  const done = avail.filter(l => speechLessonDone(l.id)).length;
  const hist = speechHistory().filter(h => h.kind === 'acting-game' || h.skill === 'Acting');
  const proj = actingProject();
  const texts = new Set(hist.map(h => h.textTitle).filter(Boolean));
  const notes = proj ? sceneStudyNotes(proj.id) : {};
  const explored = SCENE_STUDY_AREAS.filter(a => (notes[a.id] ?? '').trim()).length;
  const actionsExplored = new Set(hist.filter(h => h.ref === 'ac-action-swap').map(h => h.ref)).size;

  el.innerHTML = `
    <h1 class="page-h">Acting Progress</h1>
    <p class="track-blurb">What you have studied and explored. Interpretation is never scored — there is no correct reading to measure against.</p>
    <div class="summary-grid">
      <div class="summary-card"><span class="summary-n">${done}/${ACTING_LESSONS.length}</span><span class="summary-l">chapters explored</span></div>
      <div class="summary-card"><span class="summary-n">${texts.size}</span><span class="summary-l">scenes or monologues explored</span></div>
      <div class="summary-card"><span class="summary-n">${explored}/${SCENE_STUDY_AREAS.length}</span><span class="summary-l">scene-study areas explored</span></div>
      <div class="summary-card"><span class="summary-n">${hist.length}</span><span class="summary-l">Acting Arcade exercises</span></div>
      <div class="summary-card"><span class="summary-n">${actionsExplored}</span><span class="summary-l">action explorations</span></div>
    </div>
    <h2 class="chart-h">Current project</h2>
    <p class="pane-note">${proj ? esc(proj.title) : 'No scene or monologue selected yet.'}</p>
    <h2 class="chart-h">Question Everything</h2>
    <p class="pane-note" id="ac-qe-note">Checking your saved work…</p>`;
  (async () => {
    const ref = workingTextRef();
    const note = document.getElementById('ac-qe-note');
    if (!note) return;
    if (ref?.source !== 'studio') { note.textContent = 'Applies to a Studio project — choose one as your acting project to record answers.'; return; }
    try {
      const d = await dissectionFor('project', ref.id);
      const cov = d ? coverageLine(d) : 'No answers recorded for this project yet.';
      note.textContent = cov;
    } catch { note.textContent = 'Could not read your saved answers just now.'; }
  })();
}

// ── Acting review status ──────────────────────────────────────
let actingReviewFilter = 'all';

function renderActingReviewStatus() {
  record(renderActingReviewStatus);
  stopSpeech();
  const cats = actingReviewCategories();
  const groups = actingReviewFilter === 'all'
    ? cats.groups : cats.groups.filter(g => g.id === actingReviewFilter);
  app.innerHTML = `
    ${pageTopbar('📝 Acting review status', '#8a6d3b')}
    <main class="guide sp-review">
      <h1 tabindex="-1" id="ac-h">Prepared and awaiting acting-professional review</h1>
      <p class="guide-text">${cats.total} acting draft(s) are fully written and waiting on a qualified acting teacher or coach. Nothing here is missing — every word can be opened and read.</p>
      <p class="pane-note">${esc(AI_DRAFT_NOTE)} Counts are computed from the content records. Speech drafts awaiting voice or speech-language review are counted separately, in the Speech workspace.</p>
      <div class="chip-row sp-review-filters" role="group" aria-label="Filter the review inventory">
        <button class="chip-pick ${actingReviewFilter === 'all' ? 'on' : ''}" data-afilter="all" type="button"
          aria-pressed="${actingReviewFilter === 'all'}">All (${cats.total})</button>
        ${cats.groups.map(g => `
          <button class="chip-pick ${actingReviewFilter === g.id ? 'on' : ''}" data-afilter="${g.id}" type="button"
            aria-pressed="${actingReviewFilter === g.id}">${esc(g.label)} (${g.count})</button>`).join('')}
      </div>
      ${groups.map(g => `
        <h2 class="guide-heading">${esc(g.label)} — ${g.count}</h2>
        <p class="pane-note">Required reviewer: ${esc(g.reviewer)}.</p>
        <table class="sp-inventory">
          <caption class="sr-only">${esc(g.label)} awaiting review</caption>
          <thead><tr><th scope="col">Title</th><th scope="col">Collection</th><th scope="col">Status</th>
            <th scope="col">Learner visibility</th><th scope="col">Draft</th></tr></thead>
          <tbody>
            ${g.items.map(it => `
              <tr>
                <th scope="row">${esc(it.title)}</th>
                <td>${esc(it.collection)}</td>
                <td><span class="sp-badge">${esc(ACTING_DRAFT_BADGE)}</span></td>
                <td>Title and status visible; copy is review-only</td>
                <td><button class="btn-lite" data-aopen="${esc(it.id)}" type="button">Open draft</button></td>
              </tr>`).join('')}
          </tbody>
        </table>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelector('#ac-h').focus();
  app.querySelectorAll('[data-afilter]').forEach(b =>
    b.addEventListener('click', () => {
      actingReviewFilter = b.dataset.afilter;
      navStack.pop();
      renderActingReviewStatus();
    }));
  app.querySelectorAll('[data-aopen]').forEach(b =>
    b.addEventListener('click', () => renderActingDraft(b.dataset.aopen)));
}

function renderActingDraft(itemId) {
  record(() => renderActingDraft(itemId));
  stopSpeech();
  const item = actingReviewCategories().groups.flatMap(g => g.items).find(i => i.id === itemId);
  if (!item) return renderActingReviewStatus();
  const copy = item.kind === 'acting-lesson'
    ? actingChapterBlocks(item.record)
    : (() => {
        const s = item.record.sections;
        const part = (h, t) => `<h2 class="guide-heading">${esc(h)}</h2><p class="guide-text">${esc(t)}</p>`;
        return part('Historical background', s.background)
          + part('Central principles', s.principles)
          + part('Important terminology', s.terminology)
          + part('How the approach works', s.considers)
          + `<h2 class="guide-heading">Questions it invites an actor to ask</h2>
             <ul class="th-list">${s.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>`
          + part('Common misunderstandings', s.misunderstandings)
          + `<p class="pane-note">${esc(APPROACH_DISCLAIMER)}</p>`;
      })();
  const review = speechReviewFor(item.id);
  app.innerHTML = `
    ${pageTopbar('📝 ' + esc(item.title), '#8a6d3b')}
    <main class="guide sp-draft">
      <p class="pane-note">${esc(item.collection)}</p>
      <h1 tabindex="-1" id="ac-h">${esc(item.title)}</h1>
      <p><span class="sp-badge">${esc(ACTING_DRAFT_BADGE)}</span></p>
      <p class="pane-note">${esc(DRAFT_VISIBILITY_NOTE)}</p>
      <div class="guide-word"><span class="wii-who">Required reviewer</span><span class="guide-note">${esc(item.reviewer)}</span></div>
      <div class="guide-word"><span class="wii-who">Why review is required</span><span class="guide-note">${esc(item.why)}</span></div>
      <div class="guide-word"><span class="wii-who">Known concerns</span><span class="guide-note">${esc(item.concerns)}</span></div>
      <div class="guide-word"><span class="wii-who">Reviewer &amp; date</span><span class="guide-note">${review?.reviewer
        ? `${esc(review.reviewer)} · ${esc(review.date ?? '')}` : 'None recorded — this draft has not been reviewed.'}</span></div>
      <h2 class="guide-heading">Prepared copy</h2>
      <div class="sp-review-copy">${copy}</div>
      ${item.sources.filter(Boolean).length ? `
        <h2 class="guide-heading">Sources consulted</h2>
        <ul class="th-list">${item.sources.filter(Boolean).map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
      <details class="sp-review-details">
        <summary>Review details</summary>
        <dl class="anat-list">
          <div><dt>Stable content ID</dt><dd><code>${esc(item.id)}</code></dd></div>
          <div><dt>Source record</dt><dd><code>${esc(item.file)}</code></dd></div>
          <div><dt>Review ledger</dt><dd><code>js/data/speech/reviews.js</code> — absence means draft</dd></div>
          <div><dt>Governance</dt><dd>${esc(AI_DRAFT_NOTE)}</dd></div>
        </dl>
      </details>
    </main>`;
  wireBrandHome();
  app.querySelector('#ac-h').focus();
}

// ── Library: the reference shelf for the active course ───────
// IPA (the course's sound inventory), Native Idioms (dialects only, wearing
// the dialect's flag), Texts & Speeches, anatomy, then the personal
// dictionary — every reference in one place.

// The Library hub: the approved primary cards, in this exact order, opening
// on IPA — the accent's sound system is the reference a learner actually
// reaches for. There is no About-the-Accent entry: the target descriptions
// live in the course itself and the citations in More → Sources & Credits.
// Dialect-only cards vanish on the core course,
// and Dialect in Action never borrows another dialect's material: while
// this course's pieces are unapproved the card carries an "In review"
// badge and opens the pending page, so the count always matches the page.
function libraryMain(el, course, ws = activeWorkspace()) {
  if (ws === 'acting') return actingLibraryPane(el);
  if (ws === 'speech') return speechLibraryPane(el);
  const d = course.id === 'core' ? null : course.id;
  const cards = (d ? [
    { key: 'ipa', tone: 'is-lavender', emoji: '📖', title: 'IPA for This Accent',
      count: phonemesForAccent(d).length, unit: 'sound', keywords: 'phoneme chart transcription',
      go: () => renderInventory(d) },
    { key: 'words', tone: 'is-terracotta', emoji: '🗣', title: 'Words & Expressions',
      count: IDIOM.filter(e => e.dialect === d).length, unit: 'expression',
      keywords: 'idiom slang vocabulary', go: () => renderIdioms(d) },
    ...(DIALECT_ACTION_LIVE ? [{ key: 'action', tone: 'is-blue', emoji: '🎭', title: 'Dialect in Action',
      // While nothing is approved the card counts what EXISTS and says why it
      // is unreadable, so the count can never contradict the page behind it.
      count: actionFor(d).length || actionDrafts().filter(p => p.courseId === d).length,
      unit: 'piece', badge: actionFor(d).length ? null : { cls: 'is-pending', label: 'In review' },
      keywords: 'scene monologue',
      go: () => actionFor(d).length ? renderDialectAction(d) : renderDialectActionPending(d) }] : []),
    { key: 'rhetoric', tone: 'is-gold', emoji: '🏛', title: 'Rhetoric & Oratory',
      count: 3, unit: 'dialogue', badge: { cls: '', label: 'Shared' },
      keywords: 'plato gorgias phaedrus republic persuasion',
      go: () => { if (SPEECH_LIVE) setWorkspace('speech'); renderReadingPathway(); } },
    { key: 'instrument', tone: 'is-sage', emoji: '🎭', title: 'Your Instrument',
      count: 1, unit: 'reference', keywords: 'vocal tract anatomy diagram', go: renderInstrument },
    { key: 'vowels', tone: 'is-blue', emoji: '📐', title: 'Vowel Map',
      count: 1, unit: 'reference', keywords: 'vowel space chart', go: renderVowelMap },
  ] : [
    { key: 'what', tone: 'is-sage', emoji: 'ʃə', title: 'What Is IPA?',
      count: 1, unit: 'reference', keywords: 'alphabet sounds introduction', go: renderChart },
    { key: 'chart', tone: 'is-blue', emoji: '📖', title: 'IPA Chart',
      count: Object.keys(PHONEMES).length, unit: 'sound',
      keywords: 'phoneme consonant vowel', go: renderChart },
    { key: 'instrument', tone: 'is-terracotta', emoji: '🎭', title: 'Your Instrument',
      count: 1, unit: 'reference', keywords: 'vocal tract anatomy', go: renderInstrument },
    { key: 'vowels', tone: 'is-lavender', emoji: '📐', title: 'Vowel Map',
      count: 1, unit: 'reference', keywords: 'vowel space', go: renderVowelMap },
  ]);
  libState.dialect.query = libState.dialect.query ?? '';
  workspaceLibrary(el, {
    workspace: d ? dialectName(d) : 'IPA Foundations',
    cards, state: libState.dialect,
  });
}

// Scripts & Speeches as a full page (now entered from the Studio hub).
function renderTextsPage() {
  record(renderTextsPage);
  app.innerHTML = `
    ${pageTopbar('📜 Scripts & Speeches', '#8a6d3b')}
    <main class="track-list" id="texts-page"></main>`;
  wireBrandHome();
  textSpeechPane(document.getElementById('texts-page'));
}

// ── Rhetoric & Oratory: the reading pathway (Build A) ────────
// A focused pathway, not an ebook library (locked scope: "no large ebook
// library"). Three public-domain dialogues in Benjamin Jowett's
// translations, credited in plain text with an honest US-scoped PD note.
// House sources policy: no external links anywhere learner-facing.
//
// EXCERPTS ARE VERBATIM Jowett, verified 2026-08-11 against the Project
// Gutenberg plain texts (Gorgias #1672, Phaedrus #1636, Republic #1497,
// each "Translator: Benjamin Jowett"). Do not retouch the wording.
const READING_PATHWAY = [
  { title: 'Plato — Gorgias',
    what: 'Socrates against the professional persuaders: what rhetoric is, what it can do, and what it costs a speaker who wields it without knowledge.',
    excerpt: 'What is there greater than the word which persuades the judges in the courts, or the senators in the council, or the citizens in the assembly, or at any other political meeting?—if you have the power of uttering this word, you will have the physician your slave, and the trainer your slave, and the money-maker of whom you talk will be found to gather treasures, not for himself, but for you who are able to speak and to persuade the multitude.',
    attrib: '— Gorgias the orator, making his sales pitch. Socrates spends the rest of the dialogue taking it apart.',
    why: 'The clearest ancient statement of the difference between communication and manipulation — the exact line this app asks you to hold.' },
  { title: 'Plato — Phaedrus',
    what: 'A walk outside the city walls that becomes the classical world’s deepest look at speech, writing, and the soul of the listener.',
    excerpt: 'For this discovery of yours will create forgetfulness in the learners’ souls, because they will not use their memories; they will trust to the external written characters and not remember of themselves. The specific which you have discovered is an aid not to memory, but to reminiscence, and you give your disciples not truth, but only the semblance of truth; they will be hearers of many things and will have learned nothing; they will appear to be omniscient and will generally know nothing; they will be tiresome company, having the show of wisdom without the reality.',
    attrib: '— King Thamus, refusing the invention of writing. Every argument about speech versus the page starts here.',
    why: 'On knowing your audience: why a true speech must be shaped to the soul that hears it — an actor’s job description, twenty-three centuries early.' },
  { title: 'Plato — Republic (Books II–III & X)',
    what: 'The education of the guardians — including the passage this app opens with — and Plato’s famous quarrel with performance itself.',
    excerpt: 'You know also that the beginning is the most important part of any work, especially in the case of a young and tender thing; for that is the time at which the character is being formed and the desired impression is more readily taken.',
    attrib: '— Socrates, Book II (377a–b) — the full sentence behind the preface’s epigraph.',
    why: 'Read the source — then argue with Plato about whether actors should exist. Every actor eventually does.' },
];

function renderReadingPathway() {
  record(renderReadingPathway);
  app.innerHTML = `
    ${pageTopbar('🏛 Rhetoric & Oratory', '#8a6d3b')}
    <main class="guide">
      <h1>Rhetoric &amp; Oratory</h1>
      <p class="guide-text">The preface’s ideas are old — these are the works they come from. A focused pathway, not a library: three dialogues, each earning its place, in the order worth reading them.</p>
      ${READING_PATHWAY.map((r, i) => `
        <h2 class="guide-heading">${i + 1}. ${esc(r.title)}</h2>
        <p class="guide-text">${esc(r.what)}</p>
        <blockquote class="th-quote">
          <p>${esc(r.excerpt)}</p>
          <footer class="th-attrib">${esc(r.attrib)}</footer>
        </blockquote>
        <div class="guide-word"><span class="wii-who">Why read it</span><span class="guide-note">${esc(r.why)}</span></div>`).join('')}
      <h2 class="guide-heading">Editions &amp; credit</h2>
      <p class="guide-text">Excerpts and translation: Benjamin Jowett, <i>The Dialogues of Plato</i>, third edition, 1892. Project Gutenberg identifies this Benjamin Jowett edition as public domain in the United States. Readers elsewhere should check the copyright law where they live. Free plain-text editions are available from Project Gutenberg — search the dialogue’s title together with “Jowett”.</p>
      <p class="pane-note">Speechcraft doesn’t bundle the books — this is a pathway, not an ebook shelf.</p>
    </main>`;
  wireBrandHome();
}

// ── Playable Actions (Build C) ───────────────────────────────
// Twelve verbatim entries and six contrast pairs from
// docs/ACTION_LIBRARY_v1.md, rendered from js/data/playable.js.
// Entirely written: the shared practice line is text for private
// exploration — no audio, no recording, no scoring, no empty controls.
// The search query survives in module state so Back from a detail page
// returns to the exact list the actor left.
let playableQuery = '';

function renderPlayableActions() {
  record(renderPlayableActions);          // replays with current playableQuery
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🎯 Playable Actions', '#8a6d3b')}
    <main class="guide">
      <h1>Playable Actions</h1>
      <blockquote class="th-quote"><p><b>${GOVERNING_QUESTION}</b></p></blockquote>
      <p class="guide-text">${ACTION_DISTINCTION}</p>
      <p class="pane-note">Six pairs, each sharing one practice line. ${PAIR_LESSON}</p>
      <input class="sonnet-search" id="pa-search" type="search"
        placeholder="Search actions…" aria-label="Search playable actions"
        value="${esc(playableQuery)}" autocomplete="off">
      <div id="pa-list" aria-live="polite"></div>

      <h2 class="guide-heading">The action vocabulary — ${ACTION_VERBS.length} verbs</h2>
      <p class="guide-text">${esc(ACTION_VERB_FRAME.objective)}
        ${esc(ACTION_VERB_FRAME.method)} <b>${esc(ACTION_VERB_FRAME.rule)}</b></p>
      <p class="pane-note">Words to reach for when none of the twelve above is the verb you mean.
        A verb in <b>bold</b> has a written lesson — tap it. The rest are vocabulary, not lessons.</p>
      <div class="pa-verbs" id="pa-verbs" aria-live="polite"></div>
    </main>`;
  wireBrandHome();
  const listEl = document.getElementById('pa-list');
  const verbsEl = document.getElementById('pa-verbs');
  const drawVerbs = () => {
    const q = playableQuery.trim().toLowerCase();
    const hits = q ? ACTION_VERBS.filter(v => v.toLowerCase().includes(q)) : ACTION_VERBS;
    verbsEl.innerHTML = hits.length
      ? hits.map(v => {
          const taught = taughtActionFor(v);
          return taught
            ? `<button class="pa-verb is-taught" data-taught="${esc(taught.id)}" type="button">${esc(v)}</button>`
            : `<span class="pa-verb">${esc(v)}</span>`;
        }).join('')
      : `<p class="pane-note">No verb matches “${esc(playableQuery)}”.</p>`;
    verbsEl.querySelectorAll('[data-taught]').forEach(b =>
      b.addEventListener('click', () => renderPlayableAction(b.dataset.taught)));
  };
  const draw = () => {
    drawVerbs();
    const hits = searchActions(playableQuery);
    if (!hits.length) {
      // Honest empty state — a message and a way back, never a bare page.
      listEl.innerHTML = `
        <p class="pane-note">No actions match “${esc(playableQuery)}”.</p>
        <p><button class="btn-lite" id="pa-clear" type="button">Clear search</button></p>`;
      listEl.querySelector('#pa-clear').addEventListener('click', () => {
        playableQuery = '';
        document.getElementById('pa-search').value = '';
        draw();
      });
      return;
    }
    // Category headings only where an entry exists — never an empty one.
    const cats = Object.entries(ACTION_CATEGORIES)
      .map(([cid, label]) => [label, hits.filter(a => a.category === cid)])
      .filter(([, list]) => list.length);
    listEl.innerHTML = cats.map(([label, list]) => `
      <h2 class="guide-heading">${esc(label)}</h2>
      ${list.map(a => `
        <button class="track-card pa-row" data-id="${a.id}" type="button" style="--track-color:#8a6d3b">
          <div class="track-info"><h2>${esc(a.verb)}</h2><p>${esc(a.objective)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}`).join('');
    listEl.querySelectorAll('.pa-row').forEach(b =>
      b.addEventListener('click', () => renderPlayableAction(b.dataset.id)));
  };
  document.getElementById('pa-search').addEventListener('input', e => {
    playableQuery = e.target.value;
    draw();
  });
  draw();
}

function renderPlayableAction(id) {
  const a = actionById(id);
  if (!a) return renderPlayableActions();
  record(() => renderPlayableAction(id));
  stopSpeech();
  const pair = pairById(a.pairId);
  const other = actionById(pair.actions.find(x => x !== a.id));
  const idx = pairIndexOf(a.pairId);
  const prevPair = ACTION_PAIRS[idx - 1] ?? null;
  const nextPair = ACTION_PAIRS[idx + 1] ?? null;

  app.innerHTML = `
    ${pageTopbar('🎯 ' + esc(a.verb), '#8a6d3b')}
    <main class="guide">
      <h1 id="pa-title">${esc(a.verb)}</h1>
      <p class="pane-note">${esc(ACTION_CATEGORIES[a.category])}</p>
      <blockquote class="th-quote pa-line">
        <p>“${esc(a.practiceLine)}”</p>
        <footer class="th-attrib">The pair’s shared practice line — try it as ${esc(a.verb.toLowerCase())}, then as ${esc(other.verb.toLowerCase())}. ${PAIR_LESSON}</footer>
      </blockquote>
      <h2 class="guide-heading">Objective</h2>
      <p class="guide-text">${esc(a.objective)}</p>
      <h2 class="guide-heading">Likely resistance</h2>
      <p class="guide-text">${esc(a.resistance)}</p>
      <h2 class="guide-heading">Coaching</h2>
      <p class="guide-text">${esc(a.coaching)}</p>
      <h2 class="guide-heading">Contrast</h2>
      <p class="guide-text">${esc(a.contrast.note)}</p>
      <p><button class="btn pa-contrast" id="pa-opposite" type="button">↔ ${esc(other.verb)} — the opposite action</button></p>
      <nav class="sound-footnav" aria-label="Neighbouring pairs">
        ${prevPair ? `<button class="btn-lite sound-step-wide" id="pa-prev" type="button"
          aria-label="Previous pair: ${esc(actionById(prevPair.actions[0]).verb)}">‹ Previous pair</button>` : '<span></span>'}
        ${nextPair ? `<button class="btn-lite sound-step-wide" id="pa-next" type="button"
          aria-label="Next pair: ${esc(actionById(nextPair.actions[0]).verb)}">Next pair ›</button>` : '<span></span>'}
      </nav>
    </main>`;
  wireBrandHome();

  // Direct navigation to the paired opposite: replace this page in history
  // so Back from EITHER half of a pair returns straight to the list.
  document.getElementById('pa-opposite').addEventListener('click', () => {
    navStack.pop();
    renderPlayableAction(other.id);
  });
  // Previous/next pair: same replace-history pattern as the sound pages.
  const goPair = pr => { navStack.pop(); renderPlayableAction(pr.actions[0]); };
  if (prevPair) document.getElementById('pa-prev').addEventListener('click', () => goPair(prevPair));
  if (nextPair) document.getElementById('pa-next').addEventListener('click', () => goPair(nextPair));

  window.scrollTo(0, 0);
  const h = document.getElementById('pa-title');
  h.setAttribute('tabindex', '-1');
  h.focus();
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

// Speech Progress: curriculum and practice history only. No IPA
// symbols, no weak-sound analytics, no accuracy scoring — interpretive
// work is never graded, so there is nothing here to grade.
function speechProgressPane(el) {
  // Historical lesson-completion records are PRESERVED and reused as
  // "chapters explored" — nothing stored is discarded or migrated.
  const chapters = SPEECH_LESSONS.filter(l => speechBodyVisible(l));
  const explored = chapters.filter(l => speechLessonDone(l.id)).length;
  const hist = speechHistory().filter(h => h.kind !== 'acting-game' && h.skill !== 'Acting');
  const guided = hist.filter(h => h.kind === 'routine').length;
  const arcade = hist.filter(h => h.kind === 'game').length;
  const skills = new Set(hist.map(h => h.skill).filter(Boolean));
  const texts = new Set(hist.map(h => h.textTitle).filter(Boolean));
  const revisited = hist.filter(h => (h.attempt ?? 1) > 1).length;
  const recent = hist.slice(-8).reverse();

  el.innerHTML = `
    <div class="ws-head">
      <h1 class="page-h">Speech Progress</h1>
      <p class="ws-sub">What you have explored and practised. Nothing here is scored — there is no “correct” delivery to measure you against.</p>
    </div>
    <div class="summary-grid">
      <div class="summary-card"><span class="summary-n">${explored}/${chapters.length}</span><span class="summary-l">chapters explored</span></div>
      <div class="summary-card"><span class="summary-n">${guided}</span><span class="summary-l">Guided Practice sessions</span></div>
      <div class="summary-card"><span class="summary-n">${arcade}</span><span class="summary-l">arcade exercises completed</span></div>
      <div class="summary-card"><span class="summary-n">${texts.size}</span><span class="summary-l">working texts explored</span></div>
      <div class="summary-card"><span class="summary-n">${revisited}</span><span class="summary-l">topics revisited</span></div>
      <div class="summary-card"><span class="summary-n">${skills.size}</span><span class="summary-l">skills practised</span></div>
    </div>
    <h2 class="sec-h">By collection</h2>
    ${SPEECH_COLLECTIONS.map(c => {
      const ls = speechLessonsFor(c.stage).filter(l => speechBodyVisible(l));
      const d = ls.filter(l => speechLessonDone(l.id)).length;
      const pending = speechLessonsFor(c.stage).length - ls.length;
      return `<div class="hub-progress"><div class="track-progress">
        <div class="track-progress-bar"><div style="width:${ls.length ? Math.round(d / ls.length * 100) : 0}%"></div></div>
        <span>${esc(c.title)} — ${ls.length ? `${d} of ${ls.length} explored` : `${pending} chapters review pending`}</span>
      </div></div>`;
    }).join('')}
    <h2 class="sec-h">Recent practice</h2>
    ${recent.length ? '<div class="sp-history" id="sp-history"></div>'
      : '<p class="pane-note">No practice recorded yet — Guided Practice and the Arcade will fill this in.</p>'}`;

  if (recent.length) {
    const box = el.querySelector('#sp-history');
    for (const h of recent) {
      const row = document.createElement('div');
      row.className = 'guide-word';
      const who = document.createElement('span');
      who.className = 'wii-who';
      who.textContent = new Date(h.at).toLocaleDateString();
      const what = document.createElement('span');
      what.className = 'guide-note';
      what.textContent = `${h.title}${h.textTitle ? ` · ${h.textTitle}` : ''}${h.attempt > 1 ? ` · revisited` : ''}`;
      row.append(who, what);
      box.appendChild(row);
    }
  }
}

function progressMain(el) {
  if (activeWorkspace() === 'acting') return actingProgressPane(el);
  if (activeWorkspace() === 'speech') return speechProgressPane(el);
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
        <li>Listen closely to the model recordings and shadow them in your head as you read.</li>
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
  document.getElementById('wii-foundations')?.addEventListener('click', () => { setCourse('core'); setWorkspace('ipa'); goSection('learn'); });
  document.getElementById('wii-chart')?.addEventListener('click', () => renderChart());
  document.getElementById('wii-course')?.addEventListener('click', () => { setWorkspace('accents'); goSection('learn'); });
  wireWiiQuestions(app, st);
  const h = app.querySelector('.guide-step h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}

// ── "Why Speech Matters" — the preface ───────────────────────
// THREE content panels (Why Speech Matters, Speech Is Action, Speech
// Reveals Thought), then the kept course picker and the choice — both
// FUNCTIONAL screens, never essay panels, never counted by the panel
// progress indicator. No XP, no track (locked product decisions). The
// preface is for ANYONE who speaks — actors remain one named audience,
// never the only one.
//
// TWO VERBATIM VARIANTS by owner order 2026-08-12:
//   INTRO — the concise first-time opening (short paragraphs, no goals
//           list, no long disclaimer; readable without scrolling).
//   FULL  — the expanded permanent section, reached any time through
//           More/About ("Why Speech Matters" card / "Read it again").
// Same three titles, same order, same panel-1 Jowett epigraph with its
// complete attribution. COPY IS VERBATIM from
// docs/WHY_SPEECH_MATTERS_COPY.md — change it there first. "Speech
// Reveals Thought" is ORIGINAL Speechcraft writing — never quote-marked,
// never attributed to Plato. Static trusted strings — no user data.

const THRESHOLD_QUOTE = {
  quote: 'The beginning is the most important part of the work, especially in the case of a young and tender thing.',
  attribution: '— Plato, <i>Republic</i> 377a–b, translated by Benjamin Jowett',
};

const THRESHOLD_PANELS_INTRO = [
  { title: 'Why Speech Matters',
    ...THRESHOLD_QUOTE,
    body: [
      'How you speak shapes how people understand you, trust you and respond to you.',
      'Speechcraft helps you develop clearer, more confident and more intentional speech—whether you are preparing a presentation, studying rhetoric, exploring an accent, working on a role or strengthening your everyday voice.',
      'Training does not erase who you are. It gives you more choices.',
    ] },
  { title: 'Speech Is Action',
    body: [
      'Speaking is something you do to affect another person.',
      'You may be trying to inform, persuade, reassure, challenge, inspire or connect. The same words can land differently depending on your intention, timing, rhythm, emphasis and relationship to the listener.',
      'Strong speech begins with knowing what you want your words to do.',
    ] },
  { title: 'Speech Reveals Thought',
    body: [
      'Speech often reveals how clearly we have examined an idea. It shows what we understand, value, question or avoid.',
      'Strengthening speech is more than changing pronunciation. It develops attention, listening, reasoning, structure and the connection between thought and expression.',
    ] },
];

const THRESHOLD_PANELS_FULL = [
  { title: 'Why Speech Matters',
    ...THRESHOLD_QUOTE,
    body: [
      'How you speak shapes how people understand you, how far they trust you, what they remember of you, and how they respond to you. Speech is not decoration. It is action.',
      'Speechcraft is for anyone who wants to understand, strengthen or expand the way they speak — including anyone who wants to:',
    ],
    list: [
      'speak with greater clarity',
      'speak more confidently',
      'command attention without merely becoming louder',
      'organize and express thoughts effectively',
      'understand rhetoric and persuasion',
      'explore different kinds of speakers and speaking situations',
      'develop a more intentional personal voice',
      'modify or neutralize aspects of an accent — adding choice and flexibility, never “correcting” an inferior way of speaking',
      'learn another English accent',
      'prepare a speech, scene, monologue or presentation',
      'investigate how language creates action',
    ],
    after: [
      'No app can erase who you are, guarantee confidence, or hand you the one “correct” accent — no such accent exists. What deliberate training can do is give you more choices, and more command of the choices you already make.',
    ] },
  { title: 'Speech Is Action',
    body: [
      'Speaking is something we do to another person. A speaker may set out to persuade, reassure, challenge, inspire, inform, confront, entertain, comfort, negotiate, command, question, reveal, conceal — or simply connect.',
      'The same words can land completely differently depending on intention, relationship, timing, rhythm, emphasis and delivery. That is as true in everyday conversation, teaching, leadership and interviews as it is in public speaking, presentations, advocacy, rhetoric, performance — and the difficult personal conversations that matter most.',
      'Powerful speech can clarify and connect. It can also pressure, mislead or manipulate. Developing your speech includes taking responsibility for its effect.',
    ] },
  { title: 'Speech Reveals Thought',
    body: [
      'Speech reveals thought. It reveals what we understand and what remains uncertain, how our ideas are organized, what we value, what we avoid, how we see the person in front of us — and how clearly we have examined our own position.',
      'Strengthening speech is therefore never just polishing pronunciation. It can mean strengthening attention, listening, intention, vocabulary, structure, reasoning — the whole relationship between thought and expression.',
      'The IPA, rhetoric, accent study, text analysis and deliberate practice are different tools within that one larger craft. Speechcraft teaches them together.',
    ] },
];

// Words whose clips make the accents' differences audible side by side.
const SAMPLE_WORDS = ['dance', 'water', 'nurse'];

// Suppress a course's one-time intro overlay for exactly one Learn render —
// a new user finishing the eight-screen threshold must not land in a modal.
let skipCourseIntroOnce = false;

// Evidence of prior use, all readable synchronously. `onboarding.done` is
// the primary signal (every user who ever reached the shell has it) and
// must keep that name; the rest are belt and braces.
function priorUseSignals() {
  const sig = [];
  try {
    if (store.onboarding.done) sig.push('onboarding');
    if (store.hasEarnedAnything) sig.push('progress');
    if (store.streak > 0) sig.push('streak');
    if (store.whatIsIpa.done) sig.push('what-is-ipa');
    if (Object.keys(store.introsSeen ?? {}).length) sig.push('course-intro');
    if (store.customText?.body) sig.push('custom-text');
    if (listPersonal().length) sig.push('dictionary');
    if (localStorage.getItem('speechcraft-course')
      || localStorage.getItem('speechcraft-home-tab')) sig.push('nav-state');
  } catch { /* storage unavailable — treat as fresh */ }
  return sig;
}

// The localStorage-scrubbed edge case: projects or takes in IndexedDB are
// prior use too. Bounded so a hung database can never block boot.
async function hasIdbTraces() {
  if (!dbSupported()) return false;
  try {
    const probe = (async () =>
      (await listProjects()).length > 0 || (await listAllTakes()).length > 0)();
    // A timed-out probe is UNKNOWN, not "no traces". Resolving false
    // here would wall an existing user behind the first-run preface, so
    // the timeout resolves TRUE: the worst case is that a genuinely new
    // user skips a preface they can still read any time from More.
    const timeout = new Promise(r => setTimeout(() => r(true), 150));
    return (await Promise.race([probe, timeout])) === true;
  } catch { return false; }
}

// Boot gate. Existing users are grandfathered — recorded, never walled —
// and get the one-time invitation card in Learn instead.
async function gateThreshold() {
  if (store.threshold) { renderHome(); return; }
  if (priorUseSignals().length || await hasIdbTraces()) {
    store.completeThreshold({ choice: null, source: 'grandfathered' });
    renderHome();
    return;
  }
  renderThreshold();
}

// The threshold itself. Screens 0–2 are the three verbatim preface
// panels, screen 3 is the course picker (kept from the old onboarding,
// samples and all — it is the only place a new user hears the dialects
// compared, and it is what calls setCourse), screen 4 is the choice,
// which lands where it says.
// `replay` mode (About Speechcraft, Preferences, the invitation card)
// never resets progress, never rewrites the original choice, never
// re-blocks: Esc or ✕ leaves at any time.
function renderThreshold(step = 0, opts = {}) {
  stopSpeech();
  const { replay = false, sel = {} } = opts;
  // A replaying user already chose a course once — preselect it so the
  // picker never blocks them; changing it stays optional.
  if (replay && !sel.accent) sel.accent = activeCourse();
  if (replay && step === 0) record(() => renderThreshold(0, { replay: true }));
  // First run gets the concise opening; the permanent More/About replay
  // keeps the expanded writing. Same three titles, same order.
  const PANELS = replay ? THRESHOLD_PANELS_FULL : THRESHOLD_PANELS_INTRO;
  // The progress indicator counts ONLY the three content panels — the
  // course picker and the choice are functional screens, shown without
  // preface dots.
  const dots = step < PANELS.length
    ? `<div class="ob-dots" aria-label="Preface progress">${
        Array.from({ length: PANELS.length }, (_, i) => `<span class="ob-dot ${i <= step ? 'on' : ''}"></span>`).join('')}</div>`
    : '';
  const back = step > 0
    ? `<button class="btn ob-back" id="ob-back" type="button">‹ Back</button>` : '<span></span>';
  const close = replay
    ? `<button class="quit th-close" id="th-close" aria-label="Close and return" type="button">✕</button>` : '';

  let body;
  if (step < PANELS.length) {
    const p = PANELS[step];
    body = `
      <h1>${p.title}</h1>
      ${p.quote ? `
      <blockquote class="th-quote">
        <p>${p.quote}</p>
        <footer class="th-attrib">${p.attribution}</footer>
      </blockquote>` : ''}
      ${p.body.map(t => `<p class="guide-text th-text">${t}</p>`).join('')}
      ${p.list ? `<ul class="th-list">${p.list.map(li => `<li>${li}</li>`).join('')}</ul>` : ''}
      ${(p.after ?? []).map(t => `<p class="guide-text th-text">${t}</p>`).join('')}
      <div class="ob-actions"><button class="btn btn-primary" id="ob-next" type="button">${
        step === PANELS.length - 1 ? (replay ? 'Done' : 'Enter Speechcraft') : 'Continue'}</button></div>`;
  }

  app.innerHTML = `
    <main class="onboard threshold" aria-labelledby="ob-h">
      ${close}
      ${dots}
      <div class="ob-body" id="ob-h">${body}</div>
      <div class="ob-footer">${back}</div>
    </main>`;

  const go = (s2, sel2 = {}) => renderThreshold(s2, { replay, sel: { ...sel, ...sel2 } });
  document.getElementById('ob-back')?.addEventListener('click', () => go(step - 1));
  document.getElementById('th-close')?.addEventListener('click', () => goBack());
  // Esc: on a replay it exits; on the first-run wall it steps back a panel.
  app.querySelector('.threshold').addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (replay) goBack();
    else if (step > 0) go(step - 1);
  });

  if (step < PANELS.length) {
    document.getElementById('ob-next').addEventListener('click', () => {
      if (step < PANELS.length - 1) return go(step + 1);
      // Last panel = the end of the preface (owner order, 2026-08-20).
      if (replay) { store.markThresholdReplay('read'); return goBack(); }
      store.completeThreshold({ choice: 'read', source: 'first-run' });
      store.saveOnboarding({ done: true, accent: sel.accent ?? null });
      setCourse(sel.accent ?? 'nam');       // changeable from the course chip
      setWorkspace('acting');               // the workspace the app is built around
      skipCourseIntroOnce = true;           // no modal on the landing render
      goSection('learn');
    });
  }
}

// Preferences. The old "Your goal" picker is gone: the stored goal value
// was write-only (read nowhere behavioral), so no control may edit it.
// Existing records keep their goal field untouched; nothing reads it.
function renderPreferences() {
  record(renderPreferences);
  const course = COURSES.find(c => c.id === activeCourse());
  app.innerHTML = `
    ${pageTopbar('⚙️ Preferences', '#64748b')}
    <main class="guide">
      <h2 class="guide-heading">Active course</h2>
      <div class="chip-row" id="pref-courses">
        ${COURSES.map(c => `<button class="chip-pick ${c.id === course.id ? 'on' : ''}" data-course="${c.id}" type="button"
          aria-pressed="${c.id === course.id}">${c.icon} ${esc(c.label)}</button>`).join('')}
      </div>
      <h2 class="guide-heading">What are you working toward?</h2>
      <p class="pane-note">Optional background — it only nudges which examples come first. It never hides, ranks or locks any part of the app, and every answer leads to exactly the same Speechcraft.</p>
      <div class="chip-row" id="pref-goals">
        ${SPEECH_GOALS.map(g => `
          <button class="chip-pick ${speechGoal() === g.id ? 'on' : ''}" data-goal="${g.id}" type="button"
                  aria-pressed="${speechGoal() === g.id}">${g.icon} ${esc(g.label)}</button>`).join('')}
      </div>
      <h2 class="guide-heading">First-run setup</h2>
      <p class="pane-note">Reads the preface again. Your progress is untouched.</p>
      <button class="btn" id="pref-rerun" type="button">Read the preface again</button>

      <h2 class="guide-heading">Quick diagnostic</h2>
      <p class="pane-note">≈8 questions on the active course. It cannot cost hearts, and it seeds
        your weak-sound tracking. Optional, and repeatable.</p>
      <button class="btn" id="pref-diag" type="button">Take the diagnostic</button>
    </main>`;
  wireBrandHome();
  app.querySelectorAll('[data-course]').forEach(b =>
    b.addEventListener('click', () => { setCourse(b.dataset.course); renderPreferences(); }));
  app.querySelectorAll('[data-goal]').forEach(b =>
    b.addEventListener('click', () => {
      setSpeechGoal(speechGoal() === b.dataset.goal ? null : b.dataset.goal);
      navStack.pop();                       // replace-history: same page
      renderPreferences();
    }));
  document.getElementById('pref-rerun').addEventListener('click', () => renderThreshold(0, { replay: true }));
  document.getElementById('pref-diag').addEventListener('click', () => {
    store.saveOnboarding({ diagnostic: 'taken' });
    startLesson(practiceLesson(trackFor(activeCourse())));
  });
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
    // Voice keys come from the candidate index itself (so a human
    // 'reference' voice shows up the moment its files are imported); with
    // no candidates on disk yet, fall back to the expected keys so the
    // grid still works as a to-record checklist.
    const named = voicesForCourse(d).map(v => v.id);
    const onDisk = Object.keys(phonIndex[d] ?? {});
    const voiceKeys = onDisk.length ? onDisk : (named.length ? named : ['f', 'm']);
    for (const sym of phonemesForAccent(d)) {
      const slug = phonemeSlug(sym);
      for (const v of voiceKeys) {
        const candidates = phonIndex[d]?.[v] ?? [];
        for (const s2 of [slug, slug + '_syllable']) {
          if (s2.endsWith('_syllable') && !candidates.includes(s2)) continue;
          rows.push({ id: `${d}/${v}/${s2}`, d, v, slug: s2,
            clip: `/${sym}/${s2.endsWith('_syllable') ? ' — syllable demo' : ' — isolated'}`, kind: 'phoneme',
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
            <span class="audit-meta">${r.d}/${r.v} · ${r.kind}${r.slug ? ` · ${esc(r.slug)}` : ''}${r.missing ? ' · missing' : ''}</span>
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

// ── Content review (#review) — owner gate for written drafts ──
// The writing counterpart to #audit: every Dialect in Action piece and
// sonnet transposition still awaiting review, rendered exactly as a
// learner would see it. Approval is a deliberate file edit (reviewStatus
// in js/data/action.js, TRANSPOSITION_REVIEW in js/data/recasts.js) —
// nothing on this page can publish anything by accident.
function renderContentReview() {
  stopSpeech();
  const drafts = actionDrafts();
  const transDrafts = [];
  for (const n of Object.keys(RECASTS)) {
    for (const d of Object.keys(RECASTS[n].recasts ?? {})) {
      if (!approvedTranspositions(+n).includes(d)) {
        transDrafts.push({ n: +n, d, text: RECASTS[n].recasts[d] });
      }
    }
  }
  const brDrafts = bridgeDrafts();
  const brComps = brDrafts.reduce((n, r) => n + r.comparisons.length, 0);
  const revLine = (label, r) => `${label}: <b>${esc(r?.status ?? 'pending')}</b>${r?.reviewer ? ` — ${esc(r.reviewer)}${r.date ? `, ${esc(r.date)}` : ''}` : ''}`;
  app.innerHTML = `
    <header class="topbar">
      <button class="backbtn" id="review-exit" aria-label="Back to the app" title="Back to the app">‹</button>
      <div class="track-title" style="color:#64748b">📝 Content review</div>
      <div class="stats"><span class="stat">${drafts.length + transDrafts.length} + ${brDrafts.length} drafts</span></div>
    </header>
    <main class="guide audit-page">
      <p class="pane-note">Owner tool, reached by typing <code>#review</code> — it is NOT authenticated, so treat everything here as public. Nothing below is on a learner surface. To approve: set the status fields in <code>js/data/action.js</code>, <code>js/data/recasts.js</code>, <code>js/data/bridge.js</code> or <code>js/data/edition-reviews.js</code>, record the reviewer, and commit. Approved pieces appear on their learner surfaces automatically — Dialect in Action in the Library, Accent Bridge under Practice, sonnet editions in Scripts &amp; Speeches. Nothing here may be batch-approved, and Claude may never approve its own writing. The prepared review packet — per-item concerns, checklists and per-claim citations — is <code>docs/REVIEW_PACKET_v1.md</code>.</p>

      <h1>The original 23-item queue</h1>
      <p class="pane-note">${drafts.length} Dialect in Action piece(s) + ${transDrafts.length} sonnet transposition(s) = the original ${drafts.length + transDrafts.length}-item review queue.</p>

      <h2 class="guide-heading">Dialect in Action — ${drafts.length} draft piece(s)</h2>
      <p class="pane-note">Required reviewers, per piece: a <b>literary</b> read (rhythm, register, no parody) and a <b>dialect</b> read by a native or expert speaker of the course accent.</p>
      ${drafts.map(p => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(p.id)}</code> · ${esc(p.courseId)} · status <b>${esc(p.reviewStatus)}</b> ·
            ${revLine('literary', p.review?.literary)} · ${revLine('dialect', p.review?.dialect)}</p>
          ${actionPieceHtml(p)}
          <p class="pane-note">Reviewer notes: ${esc(p.reviewNotes)}</p>
        </section>`).join('')}

      <h2 class="guide-heading">Sonnet transpositions — ${transDrafts.length} draft version(s)</h2>
      <p class="pane-note">Checklist: docs/RECAST_REVIEW.md — faithfulness to argument, imagery and emotional progression; dialect register; no parody.</p>
      ${transDrafts.map(t => `
        <section class="review-piece">
          <p class="sonnet-hint">Sonnet ${t.n} · ${esc(TRANSPOSITION_LABELS[t.d] ?? t.d)} · status <b>draft</b></p>
          <div class="sonnet-lines">${t.text.split('\n').map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
        </section>`).join('')}

      <h1 id="bridge-drafts">Accent Bridge routes — ${brDrafts.length} new draft route(s)</h1>
      <p class="pane-note">Build D drafts, listed separately — <b>not</b> part of the original 23. ${brComps} comparison(s) across ${brDrafts.length} route(s). Required reviewer: a <b>dialect/accent</b> reviewer qualified in both ends of each route. Every phonetic claim restates the Dialect Accuracy Standard; the reviewer confirms the restatement, the example words and the articulation guidance.</p>
      ${brDrafts.map(r => `
        <section class="review-piece">
          <p class="sonnet-hint">route <code>${esc(r.id)}</code> · ${esc(r.title)} · ${r.comparisons.length} draft comparison(s)</p>
          <p class="guide-text">${esc(r.intro)}</p>
          ${r.comparisons.map(c => `
            <div class="bridge-card">
              <div class="idiom-head"><span class="idiom-term">${esc(c.feature)}</span><span class="tag">${esc(c.lexicalSet)}</span></div>
              <p class="bridge-pair"><span class="ipa-chip">/${esc(c.startIPA)}/</span> <span aria-hidden="true">→</span>
                <span class="ipa-chip is-target">/${esc(c.targetIPA)}/</span> <span class="bridge-word">“${esc(c.word)}”</span></p>
              <p class="guide-note"><b>Stays:</b> ${esc(c.stays)}</p>
              <p class="guide-note"><b>Changes:</b> ${esc(c.changes)}</p>
              <p class="guide-note"><b>Lips:</b> ${esc(c.guidance.lips)} <b>Tongue:</b> ${esc(c.guidance.tongue)} <b>Jaw:</b> ${esc(c.guidance.jaw)} <b>Voice:</b> ${esc(c.guidance.voice)}</p>
            </div>`).join('')}
          ${r.sourceNote ? `<p class="pane-note">${esc(r.sourceNote)}</p>` : ''}
        </section>`).join('')}

      <h1 id="edition-drafts">Sonnet editions — the Build F written catalog</h1>
      <p class="pane-note">New drafts, tracked in <code>js/data/edition-reviews.js</code> —
        listed separately from the original 23. Coverage so far:
        ${EDITION_CHUNKS.length ? EDITION_CHUNKS.map(c => `${c.from}–${c.to}`).join(', ') : 'none yet'}
        (${EDITION_CHUNKS.reduce((s, c) => s + c.expect, 0)} new sonnets ×
        Plain Meaning + 3 voices)${EDITION_CATALOG_COMPLETE ? ' — CATALOG COMPLETE (149 new + 5 pilots = 154)' : ' — catalog in progress'}.
        The five pilots (${LEGACY_SONNETS.join(', ')}) stay in the original queue above.
        Plain Meaning needs a literary review; each voice needs literary AND
        dialect/register review. Enter a sonnet number to inspect its drafts.</p>
      <div class="proj-toolbar">
        <label class="field-label" for="ed-n">Sonnet</label>
        <input class="input-sel" id="ed-n" type="number" min="1" max="154" value="1" style="width:6em">
        <button class="btn-lite" id="ed-show" type="button">Show drafts</button>
      </div>
      <div id="ed-view"></div>

      <h1 id="speech-drafts">Speech system — draft content</h1>
      <p class="pane-note">The written Speech course and practice system (2026-08-13 build), tracked in
        <code>js/data/speech/reviews.js</code> — absence from that ledger means draft. Reviewer guide:
        <code>docs/SPEECH_REVIEW.md</code>. Professional-tier bodies (anatomy/health, acting methods)
        are never learner-facing while draft; editorial-tier drafts may show while pending. Claude may
        never approve his own writing.</p>

      <h2 class="guide-heading">Stage 1 anatomy &amp; vocal health — ${SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional' && !speechApproved(l.id)).length} lesson(s) awaiting voice-professional review</h2>
      <p class="pane-note">Required reviewer: an appropriately qualified <b>voice professional or speech-language pathologist</b>. Sources are paraphrased from NIDCD, ASHA and NIDCR public guidance — the reviewer confirms accuracy, non-diagnostic framing and the absence of prescriptive treatment.</p>
      ${SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional' && !speechApproved(l.id)).map(l => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(l.id)}</code> · ${esc(l.title)} · status <b>${speechPublished(l.id) ? 'published (owner approval)' : 'draft'}</b> · awaiting voice-professional review</p>
          ${l.body.map(b => b.p ? `<p class="guide-text">${esc(b.p)}</p>`
            : b.h ? `<p class="guide-text"><b>${esc(b.h)}</b></p>`
            : b.list ? `<ul class="th-list">${b.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`
            : b.safety ? `<p class="pane-note pane-warn">${esc(SPEECH_SAFETY_LINE)}</p>`
            : b.comfort ? `<p class="pane-note">${esc(SPEECH_COMFORT_LINE)}</p>` : '').join('')}
          ${(l.sources ?? []).map(s => `<p class="pane-note">Source: ${esc(s)}</p>`).join('')}
        </section>`).join('')}

      <h2 class="guide-heading">Approaches to Acting — ${ACTING_APPROACHES.filter(a => !speechApproved(a.id)).length} introduction(s) awaiting acting-professional review</h2>
      <p class="pane-note">Required reviewer: a qualified <b>acting teacher or coach</b> — accuracy of history, principles and terminology; no flattened slogans; no implied affiliation.</p>
      ${ACTING_APPROACHES.filter(a => !speechApproved(a.id)).map(a => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(a.id)}</code> · ${esc(a.name)} · ${esc(a.era)} · status <b>${speechPublished(a.id) ? 'published (owner approval)' : 'draft'}</b> · awaiting acting-professional review</p>
          ${['background', 'principles', 'terminology', 'considers', 'misunderstandings', 'sources']
            .map(k => `<p class="guide-text"><b>${esc(k)}:</b> ${esc(a.sections[k])}</p>`).join('')}
          <ul class="th-list">${a.sections.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
        </section>`).join('')}

      <h2 class="guide-heading">Guided Practice routines — ${draftRoutines().length} draft(s) + ${learnerRoutines().length} in the reviewed batch</h2>
      <p class="pane-note">The eight batch-1 Train routines are learner-facing pending <b>editorial</b> review; the sixteen Prepare/Apply drafts below are review-area-only until reviewed and batched by the owner.</p>
      ${draftRoutines().map(r => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(r.id)}</code> · ${esc(r.title)} (${esc(r.mode)}, ${esc(PRACTICE_SUBJECTS.find(s => s.id === r.subject)?.title ?? r.subject)}) · status <b>draft</b></p>
          <ul class="th-list">${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </section>`).join('')}

      <h2 class="guide-heading">Practice texts — ${SPEECH_TEXTS.filter(t => !speechApproved(t.id)).length} awaiting editorial review</h2>
      <p class="pane-note">Original Speechcraft writing (provenance recorded per record). Learner-facing pending <b>editorial</b> review, per the accepted editorial-tier policy.</p>
      ${SPEECH_TEXTS.filter(t => !speechApproved(t.id)).map(t => `
        <section class="review-piece">
          <p class="sonnet-hint">id <code>${esc(t.id)}</code> · ${esc(t.title)} (${esc(t.kind)}) · ${esc(t.provenance)} · status <b>draft</b></p>
          <div class="sonnet-lines">${esc(speechTextBody(t)).split('\n').map(l => `<p class="guide-text">${l}</p>`).join('')}</div>
        </section>`).join('')}
    </main>`;
  document.getElementById('review-exit').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname);
    renderHome();
  });
  wireActionPiece(app);

  // Edition-draft inspector: loads ONE sonnet's chunk on demand — the
  // review page never parses the whole catalog either.
  const edView = document.getElementById('ed-view');
  document.getElementById('ed-show').addEventListener('click', async () => {
    const n = +document.getElementById('ed-n').value;
    edView.innerHTML = '<p class="pane-note">Loading…</p>';
    const orig = SONNETS.find(x => x.n === n);
    const ed = await editionFor(n).catch(() => null);
    if (!orig) { edView.innerHTML = '<p class="pane-note">No such sonnet.</p>'; return; }
    if (!ed) { edView.innerHTML = `<p class="pane-note">Sonnet ${n}: edition batch not written yet.</p>`; return; }
    if (ed.legacy) {
      edView.innerHTML = `<p class="pane-note">Sonnet ${n} is one of the five pilots — its transpositions live in the original 23-item queue above (js/data/recasts.js).</p>`;
      return;
    }
    const block = (label, kind, text) => `
      <section class="review-piece">
        <p class="sonnet-hint">Sonnet ${n} · ${esc(label)} · status <b>${esc(editionStatus(n, kind))}</b>
          ${kind === 'plain' ? '· requires literary review' : '· requires literary + dialect/register review'}</p>
        <div class="sonnet-lines">${String(text).split('\n').map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
      </section>`;
    edView.innerHTML = `
      <section class="review-piece">
        <p class="sonnet-hint">Sonnet ${n} · Original (byte-locked, not under review)</p>
        <div class="sonnet-lines">${orig.lines.map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>
      </section>
      ${block('Plain Meaning', 'plain', ed.plain)}
      ${block('In Today’s Voice — Neutral American', 'nam', ed.voices.nam)}
      ${block('In Today’s Voice — Standard British', 'ssbe', ed.voices.ssbe)}
      ${block('In Today’s Voice — Australian', 'aus', ed.voices.aus)}
      <p class="pane-note">Traditional RP deliberately has no vocabulary adaptation — RP is a pronunciation target, not a modern slang register. Its course shows Original + Plain Meaning (once approved).</p>`;
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
      <p class="guide-text"><b>Speechcraft is for anyone who wants to understand, strengthen or expand the way they speak.</b> It makes the sounds of speech easier to understand — the IPA, taught as a working tool instead of an abstraction — then helps you apply them to whatever you’re preparing: a speech, a presentation, a scene, a monologue, a difficult conversation. Actors get dedicated tools for accents, scenes and text work; the craft underneath is the same for everyone. Learn the sound. Mark the text. Speak it on purpose.</p>
      <div class="guide-word"><span class="wii-who">Learn</span><span class="guide-note">the IPA, how speech is produced, and four accent targets — courses that teach the skills</span></div>
      <div class="guide-word"><span class="wii-who">Prepare</span><span class="guide-note">your own text in Studio → Custom Work: paste it, transcribe it to IPA in your dialect, mark it up with notes</span></div>
      <div class="guide-word"><span class="wii-who">Rehearse</span><span class="guide-note">listen, repeat, and work the text against the model recordings until the accent lives in it</span></div>
      <p class="guide-text"><b>Speechcraft is in beta.</b> Content and recordings are still being reviewed and expanded. It is a practice tool, not a substitute for a dialect coach — accents are learned by ears and feedback, and no app can promise fluency.</p>
      <h2 class="guide-heading">Why Speech Matters</h2>
      <p class="guide-text">The preface — on what speech does, what it reveals, and what it can conceal. Read it again any time.</p>
      <p><button class="btn" id="about-threshold" type="button">Read it again</button></p>
      <p class="pane-note">Pronunciation targets are exactly that: targets. Real speakers vary by region, generation and situation. Anything you paste into the Studio stays private on this device — nothing is uploaded or shared.</p>
    </main>`;
  wireBrandHome();
  document.getElementById('about-threshold').addEventListener('click', () => renderThreshold(0, { replay: true }));
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
      <h2 class="guide-heading">Plain Meaning guides</h2>
      <p class="guide-text">The Plain Meaning summaries are <b>original Speechcraft educational content</b>, written for this app — faithful prose explanations, not translations or performances.</p>
      <h2 class="guide-heading">Audio</h2>
      <p class="guide-text">Word, expression and narration recordings are synthesised with licensed ElevenLabs voices under their commercial licence, generated offline and bundled as static files. Where no recording exists, the app says so — the optional “device voice” readings use your own device’s built-in speech.</p>
      <h2 class="guide-heading">Dialect references</h2>
      <p class="guide-text">Each course’s pronunciation target follows published descriptions, cited in full here:</p>
      ${[...new Set(Object.values(DIALECT_INFO).flatMap(i => i.sources))].map(s => `<p class="pane-note">${esc(s)}</p>`).join('')}
      <h2 class="guide-heading">Everything else</h2>
      <p class="guide-text">Design, course content, exercises, transcriptions and code are original to Speechcraft. Pronunciation data derives from CMUdict (public domain) for General American, with rule-derived adaptations marked ≈ elsewhere.</p>
    </main>`;
  wireBrandHome();
}

function moreMain(el) {
  const cards = [
    { icon: '👤', title: 'Profile', blurb: 'Your name and avatar.', go: () => goSection('profile'), color: '#6f8657' },
    { icon: '🛍️', title: 'Shop', blurb: 'Hearts, streak freezes and boosts.', go: () => goSection('shop'), color: '#c99e58' },
    { icon: '⚙️', title: 'Preferences', blurb: 'Your course and first-run choices.', go: renderPreferences, color: '#64748b' },
    // Permanent doorway to the preface — never retired by onboarding state.
    // Replaying only touches the replay timestamps (state.js guarantees it).
    { icon: '✨', title: 'Why Speech Matters', blurb: 'The preface — what speech does, what it reveals, and who it’s for. Read it again any time.', go: () => renderThreshold(0, { replay: true }), color: '#6f8657' },
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
  const info = DIALECT_INFO[d];
  // Standard organization: full vowel phonemes / diphthongs / consonants,
  // then weak vowels, then realizations & connected speech. Allophones
  // (like [ʔ] for /t/) are realizations — they are never counted in the
  // phoneme sections.
  const isWeak = s => PHONEMES[s]?.weak;
  const isAllo = s => PHONEMES[s]?.allophone;
  const groups = [
    { title: 'Vowel phonemes', items: syms.filter(s => PHONEMES[s]?.type === 'vowel' && !isWeak(s) && !isAllo(s)) },
    { title: 'Diphthong phonemes', items: syms.filter(s => PHONEMES[s]?.type === 'diphthong' && !isWeak(s) && !isAllo(s)) },
    { title: 'Consonant phonemes', items: syms.filter(s => PHONEMES[s]?.type === 'consonant' && !isAllo(s)) },
    { title: 'Weak vowels', note: 'The vowels of unstressed syllables — counted apart from the full vowel system.', items: syms.filter(s => isWeak(s) && !isAllo(s)) },
    { title: 'Common realizations & connected speech', realizations: true,
      note: 'How the phonemes above are actually spoken — realizations in [brackets], never extra phonemes.',
      items: syms.filter(isAllo) },
  ].filter(g => g.items.length || (g.realizations && info));
  const chip = (sym, allo) => `
            <button class="chart-chip" data-sym="${esc(sym)}" type="button" title="How “${esc(sym)}” is made">
              <span class="chart-sym">${allo ? `[${esc(sym)}]` : esc(sym)}</span>
              <span class="chart-meta">
                <span class="chart-name">${esc(PHONEMES[sym].name)}${allo ? ` — a realization of /${esc(PHONEMES[sym].allophone)}/` : ''}</span>
                <span class="chart-eg">${PHONEMES[sym].examples.slice(0, 2).map(w => `<b>${esc(w)}</b>`).join(', ')}</span>
              </span>
              <span class="chart-play">›</span>
            </button>`;
  hub.innerHTML = `
    <p class="pane-note">The ${esc(dialectName(d))} sound inventory — tap any symbol for its tongue placement, how it’s made, and example words. Notation: /…/ marks a phoneme, […] a spoken realization.</p>
    ${groups.map(g => `
      <section class="chart-section">
        <h2 class="chart-h">${g.title} <span>${g.items.length || ''}</span></h2>
        ${g.note ? `<p class="chart-note">${esc(g.note)}</p>` : ''}
        <div class="chart-grid">
          ${g.items.map(sym => chip(sym, g.realizations)).join('')}
        </div>
        ${g.realizations && info ? `
          ${info.common.map(x => `<div class="guide-word"><span class="wii-who">Common</span><span class="guide-note">${esc(x)}</span></div>`).join('')}
          ${info.variable.map(x => `<div class="guide-word"><span class="wii-who">Variable</span><span class="guide-note">${esc(x)}</span></div>`).join('')}
          <p class="pane-note">${esc(info.rhythm)}</p>` : ''}
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
          ${CAPABILITIES.learnerSpeaking ? `<button class="word-chip" data-tryterm="${esc(e.term)}" type="button" aria-label="Record yourself saying “${esc(e.term)}”">🎙 Try it</button>` : ''}
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
  // No Featured Texts shelf: every text is reachable through the
  // collections below, with nothing promoted or duplicated.
  const cards = [
    { icon: '📜', title: 'Shakespeare’s Sonnets', blurb: 'All 154 — speak them, scan the metre, study the sounds.', go: renderSonnetList },
    ...libs,
    { icon: '🎬', title: 'Custom Work', blurb: 'Monologues, scenes, speeches and lyrics you paste yourself — private to this device.', go: renderCustomWork },
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
      // CONTENT_STORES (db.js) is the authoritative wipe list — a store
      // added there is wiped here automatically, so new content types can
      // never silently survive a full delete. Includes dissections.
      for (const s of CONTENT_STORES) {
        await idbClear(s);
        report.push(s);
      }
    } catch (err) { console.warn('wipe: indexeddb', err); }
  }
  try { resetAnalytics(); report.push('analytics'); } catch { /* ignore */ }
  try { clearPersonal(); report.push('personal dictionary'); } catch { /* ignore */ }
  try { wipeSpeechData(); report.push('speech practice history & reflections'); } catch { /* ignore */ }
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

async function fillRecordingManager() {
  const box = document.getElementById('rec-manager');
  if (!box) return;
  if (!dbSupported()) {
    box.innerHTML = '<h2 class="chart-h">Manage recordings</h2><p class="pane-note">Recording storage isn’t available in this browser.</p>';
    return;
  }
  let takes = [];
  try { takes = await listAllTakes(); }
  catch (err) { box.innerHTML = `<h2 class="chart-h">Manage recordings</h2><p class="pane-note pane-warn">${esc(dbErrorMessage(err))}</p>`; return; }
  const known = takes.reduce((n, t) => n + (t.sizeBytes ?? 0), 0);
  const unsized = takes.filter(t => !t.sizeBytes).length;
  const byProject = new Map();
  for (const t of takes) byProject.set(t.projectId ?? t.scopeId ?? 'unfiled', (byProject.get(t.projectId ?? t.scopeId ?? 'unfiled') ?? 0) + 1);
  let estimate = '';
  try {
    if (navigator.storage?.estimate) {
      const e = await navigator.storage.estimate();
      if (e.quota) estimate = `This site is using ~${((e.usage ?? 0) / 1048576).toFixed(1)} MB of ~${(e.quota / 1048576).toFixed(0)} MB the browser allows.`;
    }
  } catch { /* estimate is a nicety */ }
  box.innerHTML = `
    <h2 class="chart-h">Manage recordings</h2>
    <div class="stat-row"><span class="stat-name">Saved takes</span><span class="stat-val">${takes.length}</span></div>
    <div class="stat-row"><span class="stat-name">Audio storage</span><span class="stat-val">${(known / 1048576).toFixed(1)} MB${unsized ? ` + ${unsized} older take(s) unsized` : ''}</span></div>
    <div class="stat-row"><span class="stat-name">Projects / texts with takes</span><span class="stat-val">${byProject.size}</span></div>
    ${estimate ? `<p class="pane-note">${esc(estimate)}</p>` : ''}
    <p class="pane-note">Individual takes are managed where they live — each project's Takes tab has play, download and delete per take.</p>
    ${takes.length ? '<button class="btn btn-danger" id="rec-delete-all" type="button">Delete ALL saved recordings</button>' : ''}
    <p class="pane-note">Deleting recordings never touches course progress, XP, projects, dissections, notes or the personal dictionary — projects simply show no saved takes afterwards.</p>`;
  document.getElementById('rec-delete-all')?.addEventListener('click', async () => {
    if (!confirm(`Delete all ${takes.length} saved recordings?\n\nProjects, notes and progress are kept. This cannot be undone.`)) return;
    if (!confirm('Last check — really delete every saved take?')) return;
    try {
      releaseAllUrls();
      const n = await deleteAllTakes();
      alert(`${n} recording(s) deleted. Projects and progress are untouched.`);
    } catch (err) { alert('Some recordings could not be deleted — nothing else was touched.'); console.warn(err); }
    fillRecordingManager();
  });
}

function renderPrivacy() {
  record(renderPrivacy);
  app.innerHTML = `
    ${pageTopbar('🔒 Privacy & Data', '#8a6d3b')}
    <main class="track-list">
      <p class="track-blurb">Everything Speechcraft stores stays in this browser on this device. Nothing you record, write or practise is ever sent anywhere.</p>
      <p class="pane-note"><b>New recording is temporarily unavailable</b> in this version of Speechcraft. Your existing saved recordings remain on this device, and you can still play, download and delete them — here, or from a project's Takes tab. Clearing this site's browser data removes everything.</p>

      <section class="stat-block">
        <h2 class="chart-h">What is stored here</h2>
        <div class="stat-row"><span class="stat-name">Rehearsal projects &amp; notes</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Text dissections</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Speech practice history &amp; private reflections</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Audio recordings</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Practice analytics</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">Personal dictionary</span><span class="stat-val">this device</span></div>
        <div class="stat-row"><span class="stat-name">XP, streak, lessons</span><span class="stat-val">this device</span></div>
        <p class="pane-note pane-warn">Browser storage is <b>not encrypted</b>. Anyone who can use this device and browser profile — or open developer tools — can read or change it. Treat it like a notebook left on a desk, not a safe.</p>
      </section>

      <section class="stat-block" id="rec-manager">
        <h2 class="chart-h">Manage recordings</h2>
        <p class="pane-note">Loading…</p>
      </section>

      <section class="stat-block">
        <h2 class="chart-h">Microphone</h2>
        <p class="pane-note">Permission is requested only when you press Record, never on load. Recordings are written straight to local storage and are never uploaded. Exported project files never contain audio.</p>
      </section>

      <div class="danger-zone">
        <h2 class="chart-h">Delete local data</h2>
        <p class="pane-note">This cannot be undone. Export anything you want to keep first.</p>
        <button class="btn btn-lite btn-danger" id="wipe-content" type="button">Delete projects, dissections, recordings, analytics &amp; dictionary</button>
        <button class="btn btn-lite btn-danger" id="wipe-all" type="button">Delete everything, including course progress</button>
        <p class="save-state" id="wipe-state" role="status" aria-live="polite"></p>
      </div>
    </main>`;
  wireBrandHome();
  fillRecordingManager();

  const run = async (includeProgress, label) => {
    if (!confirm(`${label}\n\nThis permanently deletes that data from this device and cannot be undone.\n\nContinue?`)) return;
    if (!confirm('Last check — really delete? Export first if you want a copy.')) return;
    const done = await wipeLocalData({ includeProgress });
    document.getElementById('wipe-state').textContent = `Deleted: ${done.join(', ')}.`;
  };
  document.getElementById('wipe-content').addEventListener('click', () =>
    run(false, 'Delete all projects, dissections, recordings, analytics and personal dictionary entries?\n\nYour XP, streak and completed lessons are KEPT.'));
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
  // Pair picks contribute both symbols, single picks their own — derived
  // by rehearsalTargets (B04 bug #1: the old field read here never
  // existed, so this button did nothing, silently).
  const phonemes = rehearsalTargets(dailyRehearsal(4), s => !!PHONEMES[s]);
  if (!phonemes.length) {
    // Honest and accessible — never a silent dead button. The user stays
    // exactly where they are.
    alert('Nothing to rehearse yet — answer a few more exercises first, and your weak sounds will appear here.');
    return;
  }
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

// ── Speechcraft Studio: private rehearsal projects ────────────
// A project is a saved role: its text, dialect, notes, difficult words and
// every take recorded against it.

const STATUS_CLASS = {
  'Not Started': 'st-new', 'In Rehearsal': 'st-work',
  'Performance Ready': 'st-ready', 'Archived': 'st-arch',
};

let projectSort = 'rehearsed';
let projectQuery = '';

// The Studio landing: every private project, on the shell's own section.
// Learn teaches the skills; the Studio is where they meet your text.
// The Studio hub: the approved five primary cards, in this exact order,
// TITLE-ONLY — descriptions live on the destination pages.
function studioMain(el) {
  if (activeWorkspace() === 'acting') return actorStudioPane(el);
  const inSpeech = activeWorkspace() === 'speech';
  // Playable Actions is acting work — it shelves in the Acting Library
  // now, not in the IPA and Accents Studio (owner order, 2026-08-20).
  const cards = [
    { icon: '📜', title: 'Scripts & Speeches', go: renderTextsPage },
    { icon: '🎬', title: 'Custom Work', go: renderCustomWork },
    { icon: '📕', title: 'Personal Dictionary', go: renderDictionary },
  ];
  el.innerHTML = `<h1 class="page-h">Studio</h1>`
    + (inSpeech ? workingTextCardHtml(workingText()) : '')
    + cards.map((c, i) => `
    <button class="track-card hub-card" data-i="${i}" type="button" style="--track-color:#8a6d3b">
      <div class="track-glyph">${c.icon}</div>
      <div class="track-info"><h2>${esc(c.title)}</h2></div>
      <div class="track-arrow">›</div>
    </button>`).join('');
  if (inSpeech) wireWorkingTextCard(el);
  el.querySelectorAll('.track-card[data-i]').forEach(b =>
    b.addEventListener('click', () => cards[+b.dataset.i].go()));
}

// Custom Work: the project creation/upload area — the former Studio
// landing, now one card deep. Everything about it is unchanged: create,
// paste, edit, choose a dialect, IPA and notes, import project files.
// (Document scanning/OCR is NOT available — it stays unmentioned here
// until that separate build is approved.)
function renderCustomWork() {
  record(renderCustomWork);
  stopSpeech();
  app.innerHTML = `
    ${pageTopbar('🎬 Custom Work', '#8a6d3b')}
    <main class="track-list" id="cw-main"></main>`;
  wireBrandHome();
  customWorkPane(document.getElementById('cw-main'));
}

async function customWorkPane(el) {
  el.innerHTML = `
    <h1 class="page-h">Custom Work</h1>
    <p class="track-blurb">Prepare, transcribe and rehearse your own text. Everything you paste here stays private on this device — nothing is uploaded or shared.</p>
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
        <button class="btn btn-primary" id="proj-new" type="button">+ New Project</button>
      </div>
    </div>
    <div id="proj-list"><p class="pane-note">Loading…</p></div>
    <input type="file" id="proj-file" accept="application/json" hidden>`;

  const listEl = el.querySelector('#proj-list');
  const sortSel = el.querySelector('#proj-sort');
  sortSel.value = projectSort;

  async function draw() {
    if (!dbSupported()) {
      listEl.innerHTML = '<p class="pane-note pane-warn">Projects need local storage, which this browser has disabled (private mode often does). Everything else still works.</p>';
      return;
    }
    let all = [];
    try { all = await listProjects(); }
    catch (err) { listEl.innerHTML = `<p class="pane-note pane-warn">${esc(dbErrorMessage(err))}</p>`; return; }

    const rows = sortProjects(searchProjects(all, projectQuery), projectSort);
    if (!all.length) {
      listEl.innerHTML = `
        <div class="empty-state">
          <p class="empty-emoji">🎬</p>
          <h2>Your first project starts here</h2>
          <p>Paste a piece you're working on — an audition speech, a presentation, a scene, a monologue, song lyrics. You'll get the text, its IPA in your chosen dialect, scansion, and a place for your working and pronunciation notes.</p>
          <p class="pane-note">Example: <b>Stanley Audition</b> — A Streetcar Named Desire · Monologue · Neutral American</p>
        </div>`;
      return;
    }
    if (!rows.length) { listEl.innerHTML = '<p class="pane-note">No projects match that search.</p>'; return; }

    // Grouped by content type (owner order, 2026-08-20): the Studio holds
    // ALL your own work, but a monologue and a scene are different jobs
    // and should not be shuffled together in one undifferentiated list.
    const groupsOf = list => CONTENT_TYPES
      .map(([v, label]) => [label, list.filter(x => (x.contentType ?? 'other') === v)])
      .filter(([, xs]) => xs.length);

    const preview = t => {
      const s = String(t || '').replace(/\s+/g, ' ').trim();
      return s ? esc(s.slice(0, 110)) + (s.length > 110 ? '…' : '') : '<i>No text yet</i>';
    };
    const cardHtml = p => `
      <div class="proj-card" data-id="${p.id}">
        <button class="proj-open" type="button" data-act="open">
          <span class="proj-main">
            <span class="proj-title">${esc(p.title || 'Untitled project')}</span>
            <span class="proj-sub">${esc([p.character, p.source].filter(Boolean).join(' · ') || contentTypeLabel(p.contentType))}</span>
            <span class="proj-preview">${preview(p.text)}</span>
            <span class="proj-meta">
              <span class="tag">${esc(contentTypeLabel(p.contentType))}</span>
              <span class="tag tag-dialect">${esc(dialectName(p.accent) || p.accent)}</span>
              <span class="tag ${STATUS_CLASS[p.status] || ''}">${esc(p.status)}</span>
              <span class="proj-when">Edited ${relDate(p.updatedAt)}</span>
            </span>
          </span>
          <span class="track-arrow">›</span>
        </button>
        <div class="proj-actions">
          <button class="btn-lite" type="button" data-act="dup">Duplicate</button>
          <button class="btn-lite" type="button" data-act="export">Export</button>
          <button class="btn-lite btn-danger" type="button" data-act="del">Delete</button>
        </div>
      </div>`;

    const groups = groupsOf(rows);
    listEl.innerHTML = groups.length > 1
      ? groups.map(([label, xs]) => `
          <h2 class="sec-h">${esc(label)}${xs.length > 1 ? 's' : ''} · ${xs.length}</h2>
          ${xs.map(cardHtml).join('')}`).join('')
      : rows.map(cardHtml).join('');

    listEl.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('click', async e => {
        const btn = e.target.closest('button[data-act]'); if (!btn) return;
        const id = card.dataset.id;
        const act = btn.dataset.act;
        if (act === 'open') renderScript(id);
        else if (act === 'dup') { await duplicateProject(id); draw(); }
        else if (act === 'export') exportProject(id);
        else if (act === 'del') {
          const p = await getProject(id);
          if (!confirm(`Delete “${p?.title || 'Untitled'}”?\n\nThis also deletes its saved recordings and its dissection. This cannot be undone.`)) return;
          await deleteTakesFor(id);
          await deleteDissectionsFor(id);   // cascade matches recordings
          await deleteProject(id);
          draw();
        }
      });
    });
  }

  el.querySelector('#proj-search').addEventListener('input', e => { projectQuery = e.target.value; draw(); });
  sortSel.addEventListener('change', e => { projectSort = e.target.value; draw(); });
  el.querySelector('#proj-new').addEventListener('click', renderNewProject);
  const fileInput = el.querySelector('#proj-file');
  el.querySelector('#proj-import').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files?.[0]; if (!f) return;
    try {
      const { count, droppedDissections } = await importProjectFile(f);
      if (count) {
        // alert is modal: the result (including any dropped-dissection
        // warning) stays on screen until the user dismisses it.
        alert(importResultMessage(count, droppedDissections));
        draw();
      }
    } catch (err) {
      alert(`That file could not be imported.\n\n${err instanceof ValidationError ? err.message : 'The file could not be read.'}`);
    } finally { fileInput.value = ''; }
  });

  draw();
}

// New Project: one guided form. Nothing is saved until Create — cancelling
// leaves no empty project behind.
function renderNewProject() {
  record(renderNewProject);
  let accent = 'nam';
  app.innerHTML = `
    ${pageTopbar('🎬 New Project', '#8a6d3b')}
    <main class="guide">
      <p class="track-blurb">Paste the text you're working on. You can change everything later — nothing is saved until you press Create.</p>
      <div class="proj-form">
        <div class="form-grid">
          <label class="field"><span class="field-label">Project title</span>
            <input class="input-text" id="np-title" placeholder="Stanley Audition" autocomplete="off"></label>
          <label class="field"><span class="field-label">Content type</span>
            <select class="input-sel" id="np-type">
              ${CONTENT_TYPES.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}
            </select></label>
        </div>
        <label class="field"><span class="field-label">Text</span>
          <textarea class="ct-area" id="np-text" placeholder="Paste the monologue, scene, speech or lyrics here — one line per line."></textarea></label>
        <div class="dialect-picker"><span class="dialect-label">Dialect</span><div class="dialect-chips" id="np-dialects"></div></div>
        <p class="pane-note">Your text stays private on this device. Song lyrics use the same tools — playback is a spoken diction reference, not singing.</p>
        <p class="pane-note pane-warn" id="np-warn" hidden></p>
        <div class="form-actions">
          <button class="btn btn-primary" id="np-create" type="button">Create project</button>
          <button class="btn btn-lite" id="np-cancel" type="button">Cancel</button>
        </div>
      </div>
    </main>`;
  wireBrandHome();

  const chipsEl = document.getElementById('np-dialects');
  const drawChips = () => chipsEl.innerHTML = TEXT_DIALECTS.map(d =>
    `<button class="dialect-chip ${d.id === accent ? 'on' : ''}" data-d="${d.id}" type="button"><span class="dialect-icon">${d.flag}</span>${d.label}</button>`).join('');
  drawChips();
  chipsEl.addEventListener('click', e => {
    const b = e.target.closest('.dialect-chip'); if (!b) return;
    accent = b.dataset.d; drawChips();
  });
  document.getElementById('np-cancel').addEventListener('click', goBack);
  document.getElementById('np-create').addEventListener('click', async () => {
    const title = document.getElementById('np-title').value.trim();
    const text = document.getElementById('np-text').value;
    const warn = document.getElementById('np-warn');
    if (!title && !text.trim()) {
      warn.hidden = false;
      warn.textContent = 'Give the project a title or some text to start from.';
      return;
    }
    const p = await createProject({
      title: title || 'Untitled project',
      contentType: document.getElementById('np-type').value,
      accent,
      text,
    });
    renderScript(p.id);
  });
}

function relDate(ts) {
  if (!ts) return '—';
  const days = Math.floor((Date.now() - ts) / 86400e3);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return new Date(ts).toLocaleDateString();
}

// Restored 2026-08-20: these three were collateral damage when the
// Notes and Difficult Words panes were removed — a span-based delete
// walked past them to the next `function`, taking every `const` in
// between. LIBRARIES alone is read by nine call sites.
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

// Which narrator voice reads each dialect, for the "you're hearing X" note.
const NARRATOR_NAMES = { nam: 'American Bass', rp: 'Mark', aus: 'Jimbo' };

const mmss = secs => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

// `accent` is the dialect a collection opens in; `narrated` lists the dialects
// that actually have recorded narrator audio. Every dialect stays playable —
// the rest simply read in the device voice — but we only look for clip files
// where they exist, and we say so rather than leaving the change unexplained.

// Bracketed stage directions removed for anything SPOKEN — narration
// like "[He exits]" is never read aloud or transcribed.
const stripStage = s => s.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim();

// ── Scenes ────────────────────────────────────────────────────
// A shelf of our own two-hander scenes. Empty until scenes are written
// and cleared — and it says so plainly rather than showing an inviting
// card behind which there is nothing.
const PROVIDED_SCENES = [];

function renderScenesShelf() {
  record(renderScenesShelf);
  stopSpeech();
  workspacePage(
    pageTopbar('🎭 Scenes', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">Scenes</h1>
       <p class="ws-sub">Two-hander scenes for partner work.</p>
     </div>`,
    PROVIDED_SCENES.length
      ? `<div class="tile-grid">${PROVIDED_SCENES.map(sc => tileHtml({
           key: sc.id, tone: 'is-terracotta', emoji: '🎭', title: sc.title,
           meta: `${sc.characters.length} characters`,
         })).join('')}</div>`
      : `<p class="pane-note">No scenes here yet — none have been written and cleared for use.
           Your own scenes work fully today:
           <button class="linkish" id="sc-shelf-mine" type="button">open one of yours</button>,
           or paste a new one in
           <button class="linkish" id="sc-shelf-custom" type="button">Custom Work</button>.</p>`);
  document.getElementById('sc-shelf-custom')?.addEventListener('click', renderCustomWork);
  document.getElementById('sc-shelf-mine')?.addEventListener('click', () =>
    renderArcadeTextPicker(() => {
      const ref = workingTextRef();
      if (ref?.source === 'studio') renderScript(ref.id);
    }, { only: 'scene' }));
}

// ── The Four Lists ────────────────────────────────────────────
// The Library card opens the EXPLANATION (owner order, 2026-08-20): what
// the method is and what each list is for. Working the lists on your own
// text is offered at the foot, not in place of the reading.
function renderFourListsLesson() {
  record(renderFourListsLesson);
  stopSpeech();
  workspacePage(
    pageTopbar('📋 The Four Lists', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">The Four Lists</h1>
       <p class="ws-sub">Five read-throughs, four inventories — where a character comes from.</p>
     </div>`,
    `<p><span class="sp-badge">${esc(ACTING_DRAFT_BADGE)}</span></p>

     <p class="guide-text">You read the whole play five times. Not the scene — the play. A character
       is built from everything the text knows about them, and most of that sits outside the pages
       you happen to be in.</p>
     <p class="guide-text">The <b>first reading is just reading</b>. No pen, no marking, no
       decisions. You are finding out what happens. Every choice you make before you know the story
       is a choice made in the dark, and you will defend it later out of pride rather than sense.</p>
     <p class="guide-text">Each reading after that has exactly one job. One list at a time, because
       the four are genuinely different kinds of evidence, and mixing them is how an assumption ends
       up filed as a fact.</p>

     <h2 class="guide-heading">2. The incontrovertible facts about your character</h2>
     <p class="guide-text">Only what the text states outright. Age, job, where they live, who they
       are related to, what they did. Not what you infer, not what you would like to be true — what
       could be read aloud in court without argument.</p>
     <p class="guide-text">This list is usually shorter than actors expect, and that is the point.
       Everything not on it is interpretation, and knowing which is which is what lets you change
       your mind later without losing your footing.</p>

     <h2 class="guide-heading">3. What your character says about themselves</h2>
     <p class="guide-text">Their own account of who they are. Write it down whether or not you
       believe it. A character lying about themselves is telling you something exact — about what
       they need other people to think, and about what they cannot afford to say.</p>
     <p class="guide-text">Watch for the gap between this list and the first one. That gap is often
       the part worth playing.</p>

     <h2 class="guide-heading">4. What your character says about others</h2>
     <p class="guide-text">How they describe everyone else. What they notice first, what they never
       mention, whether the description changes depending on who is listening.</p>
     <p class="guide-text">People reveal themselves most carelessly when they are talking about
       someone else. This list is frequently the richest of the four.</p>

     <h2 class="guide-heading">5. What others say about your character</h2>
     <p class="guide-text">Everything said about you — to your face, and behind your back. Again:
       record it, do not yet settle whether it is fair. Who says it matters as much as what is said.</p>
     <p class="guide-text">When the last list contradicts the second, you have found the argument the
       play is actually having about this person.</p>

     <h2 class="guide-heading">What the lists are not</h2>
     <p class="guide-text">They are not a character biography, and finishing them does not finish the
       work. They are evidence, gathered before interpretation, so that the choices you make later
       are made against the text rather than against your first impression of it.</p>

     <p class="pane-note">Work the lists on one of your own texts:
       <button class="linkish" id="fl-start" type="button">open The Four Lists</button>.
       They save with that project.</p>`);
  document.getElementById('fl-start')?.addEventListener('click', () => {
    const ref = workingTextRef();
    if (ref?.source === 'studio') return renderFourLists(ref.id);
    renderArcadeTextPicker(() => {
      const r2 = workingTextRef();
      if (r2?.source === 'studio') return renderFourLists(r2.id);
      // A shipped text is read-only; the lists need somewhere to save.
      renderCustomWork();
    });
  });
}


// The Four Lists as its own page, saved onto a project you own.
async function renderFourLists(id) {
  record(() => renderFourLists(id));
  stopSpeech();
  const p = await getProject(id);
  if (!p) return renderCustomWork();
    const fl = p.fourLists ?? {};
    const reads = fl.reads ?? 0;
    const html = `
      <p class="guide-text">Read the play five times. The first time, just read it — no pen.
        After that, one list per reading.</p>
      <div class="sc-reads" role="group" aria-label="Read-throughs completed">
        ${[1, 2, 3, 4, 5].map(n => `
          <button class="sc-read ${n <= reads ? 'on' : ''}" data-read="${n}" type="button"
                  aria-pressed="${n <= reads}">${n}</button>`).join('')}
        <span class="pane-note">${reads} of 5 read-throughs${reads === 0 ? ' — start with a plain read' : ''}</span>
      </div>
      ${FOUR_LISTS.map(l => `
        <section class="sp-step">
          <h2 class="guide-heading">${l.n}. ${esc(l.title)}</h2>
          <p class="guide-text">${esc(l.prompt)}</p>
          <label class="field">
            <span class="field-label">Your list (one per line)</span>
            <textarea class="input-sel sp-note fl-note" data-list="${l.id}" rows="5"
              aria-label="${esc(l.title)}"></textarea>
          </label>
        </section>`).join('')}
      <p class="pane-note" id="fl-state" role="status" aria-live="polite"></p>`;

  workspacePage(
    pageTopbar('📋 The Four Lists', '#8a6d3b'),
    `<div class="ws-head">
       <h1 class="page-h">The Four Lists</h1>
       <p class="ws-sub">${esc(p.title || 'Untitled project')}</p>
     </div>`,
    html);

  const flNow = () => p.fourLists ?? {};
  const state = document.getElementById('fl-state');
  // Values go in through .value, never innerHTML — inert by construction.
  app.querySelectorAll('.fl-note').forEach(t => { t.value = flNow()[t.dataset.list] ?? ''; });
  let timer = null;
  app.querySelectorAll('.fl-note').forEach(t =>
    t.addEventListener('input', () => {
      clearTimeout(timer);
      state.textContent = 'Saving…';
      timer = setTimeout(async () => {
        const fresh = await getProject(id);
        const next = { ...(fresh.fourLists ?? {}), [t.dataset.list]: t.value };
        await saveProject({ ...fresh, fourLists: next });
        p.fourLists = next;
        state.textContent = 'Saved ✓';
      }, 600);
    }));
  app.querySelectorAll('[data-read]').forEach(b =>
    b.addEventListener('click', async () => {
      const n = +b.dataset.read;
      const fresh = await getProject(id);
      const cur = fresh.fourLists?.reads ?? 0;
      // Tapping the current count clears back to the one below it.
      await saveProject({ ...fresh, fourLists: { ...(fresh.fourLists ?? {}), reads: cur === n ? n - 1 : n } });
      navStack.pop(); renderFourLists(id);
    }));
}

// ── The script page ───────────────────────────────────────────
// A project opens AS A SCRIPT (owner order, 2026-08-20): typeset the way
// a script is read, with a rail of ways to work on it. Everything the
// rail produces — highlights, beats, notes, flash-card progress — is
// written straight back to the project record, so nothing a learner
// marks up disappears when they leave the page.
//
// Marks anchor to a parsed BLOCK index plus a character range inside
// that block's spoken text, and carry the marked text itself. Editing
// one speech therefore cannot silently drag the marks on another, and a
// mark whose text has changed underneath it is dropped rather than left
// pointing at the wrong words.

const MARK_COLORS = [
  ['is-yellow', '#f4e3a1', 'Yellow'], ['is-green', '#cfe3c4', 'Green'],
  ['is-blue', '#c9dcec', 'Blue'], ['is-pink', '#eecfdd', 'Pink'],
];

// The Four Lists — the reading method the whole exercise is named for.
// You read the play FIVE times: the first straight through, then once
// for each list. The lists are deliberately in this order, because each
// one is harder to be honest about than the last.
const FOUR_LISTS = [
  { id: 'facts', n: 2, title: 'The incontrovertible facts about your character',
    prompt: 'Only what the text states outright. Not what you infer, not what you would like to be true — what could be read aloud in court.' },
  { id: 'saysSelf', n: 3, title: 'What your character says about themselves',
    prompt: 'Their own account of who they are. Note it whether or not you believe it — a character lying about themselves is telling you something.' },
  { id: 'saysOthers', n: 4, title: 'What your character says about others',
    prompt: 'How they describe everyone else. What they notice, what they never mention, and how that changes depending on who is listening.' },
  { id: 'othersSay', n: 5, title: 'What others say about your character',
    prompt: 'Everything said about you, to your face and behind your back. Again: record it, do not settle yet whether it is fair.' },
];

// ── Kill switch (2026-08-20, owner decision) ──────────────────
// Scene Study is withdrawn: ten note fields that never became the tool
// they were meant to be. NOTHING is deleted — renderSceneStudy, its
// areas and every saved note stay exactly as they are. Flip to true and
// it returns, now carrying all 97 Question Everything questions.
const SCENE_STUDY_LIVE = false;

const scriptState = {};   // per-project view state, not persisted

/**
 * One block's text, with its beats shown as slashes and (in beats mode)
 * every gap between words offered as a tap target. A beat is a POSITION
 * inside the line — "I see they're gettin' / work allatime" — so it is
 * stored as a character offset, not a range.
 */
function blockTextHtml(text, marks, mode) {
  const beats = new Set(marks.filter(m => m.kind === 'beat').map(m => m.offset));
  // A beat can go BEFORE the first word, between any two words, and
  // AFTER the last — "/ not for anything to eat. / I have nearly three
  // hundred dollars. / catherine? /". So the gap list is: offset 0,
  // every run of whitespace, and the end of the line.
  const gaps = [0];
  const re = /\s+/g; let m;
  while ((m = re.exec(text))) gaps.push(m.index);
  gaps.push(text.length);

  // A slash keeps the spacing a reader expects: "/ word", "word / word",
  // "word /". An unmarked start/end target is a zero-width hit area.
  const gapHtml = (offset, where) => {
    const on = beats.has(offset);
    const glyph = on
      ? (where === 'start' ? '/\u00a0' : where === 'end' ? '\u00a0/' : '\u00a0/\u00a0')
      : (where === 'mid' ? ' ' : '\u200b');
    if (mode === 'beats') {
      return `<button class="sc-gap ${on ? 'on' : ''}" data-gap="${offset}" type="button"
        aria-label="${on ? 'Remove beat here' : 'Add a beat here'}">${glyph}</button>`;
    }
    return on ? `<span class="sc-slash">${glyph}</span>` : (where === 'mid' ? ' ' : '');
  };

  let out = gapHtml(0, 'start');               // the onset of the line
  let at = 0;
  for (let i = 1; i < gaps.length - 1; i++) {
    const g = gaps[i];
    out += esc(text.slice(at, g));
    out += gapHtml(g, 'mid');
    at = g + text.slice(g).match(/^\s+/)[0].length;
  }
  out += esc(text.slice(at));
  out += gapHtml(text.length, 'end');          // the end of the line
  return out;
}

/** Drop marks that no longer fit their block — never point at wrong words. */
function liveMarks(p, parsed) {
  return (p.marks ?? []).filter(m => {
    const b = parsed.blocks[m.block];
    if (!b) return false;
    if (m.kind === 'beat') return m.offset <= (b.text ?? '').length;
    return true;                                 // highlight/note: block-level
  });
}

async function renderScript(id, mode = 'read') {
  record(() => renderScript(id, mode));
  stopSpeech();
  const p = await getProject(id);
  if (!p) return renderCustomWork();
  const parsed = parseScript(p.text ?? '');
  const marks = liveMarks(p, parsed);
  const st = (scriptState[id] ??= {});

  const save = async patch => {
    const fresh = await getProject(id);
    await saveProject({ ...fresh, ...patch });
  };

  // Owner order 2026-08-20. Highlight and Beats are SEPARATE tools —
  // highlighting is a tap on a line, beats are taps between words — so
  // neither can be triggered by reaching for the other.
  const RAIL = [
    ['read', '📖', 'Read'], ['cards', '🃏', 'Flash Cards'],
    ['highlight', '🖍', 'Highlight'], ['beats', '❘', 'Beats'],
    ['rhythm', '🎼', 'Rhythm'],
    ['exercises', '🎲', 'Exercises'], ['ipa', '🔤', 'IPA'],
    ['question', '🔍', 'Question Everything'],
  ];

  // ONE rendered line per source line. The parser annotates; it never
  // reflows, merges or re-orders, because doing that is exactly what
  // destroyed the flow of a real script.
  const blockHtml = (b, i) => {
    const mine = marks.filter(m => m.block === i);
    const hl = mine.find(m => m.kind === 'highlight');
    const cls = hl ? ` is-hl ${esc(hl.color ?? 'is-yellow')}` : '';
    if (b.kind === 'blank') return '<div class="sc-gapline"></div>';
    if (b.kind === 'heading') return `<h2 class="sc-heading" data-b="${i}">${esc(b.text)}</h2>`;
    if (b.kind === 'speaker') return `<p class="sc-who" data-b="${i}">${esc(b.who)}</p>`;
    if (b.kind === 'speech') {
      return `
        <div class="sc-speech">
          <p class="sc-who">${esc(b.who)}</p>
          <p class="sc-line${cls}" data-b="${i}">${blockTextHtml(b.text, mine, mode)}</p>
        </div>`;
    }
    return `<p class="sc-line${cls}" data-b="${i}">${blockTextHtml(b.text, mine, mode)}</p>`;
  };

  const scriptHtml = parsed.blocks.length
    ? parsed.blocks.map(blockHtml).join('')
    : '<p class="pane-note">No text yet — use Edit to paste the script.</p>';

  let panel = '';
  if (mode === 'highlight') {
    const active = st.color ?? 'is-yellow';
    panel = `
      <p class="pane-note">Pick a colour, then tap any line to highlight it. Tap it again to clear
        it. Saved to this project.</p>
      <div class="sc-tools">
        ${MARK_COLORS.map(([c, hex, label]) => `
          <button class="sc-swatch ${c} ${c === active ? 'on' : ''}" data-color="${c}" type="button"
                  style="--sw:${hex}" aria-label="${label}" aria-pressed="${c === active}"></button>`).join('')}
        <span class="sc-tool-label">${marks.filter(m => m.kind === 'highlight').length} highlighted</span>
        ${marks.some(m => m.kind === 'highlight') ? '<button class="linkish" id="sc-clear-hl" type="button">clear all</button>' : ''}
      </div>`;
  } else if (mode === 'beats') {
    panel = `
      <p class="pane-note">Tap the gap between any two words to drop a beat — <b>I see they're gettin'
        / work allatime.</b> Tap a beat again to remove it. Saved to this project.</p>
      <p class="pane-note">${marks.filter(m => m.kind === 'beat').length} beat(s)
        ${marks.some(m => m.kind === 'beat') ? '<button class="linkish" id="sc-clear-beats" type="button">clear all</button>' : ''}</p>`;
  } else if (mode === 'ipa') {
    panel = '<div id="sc-ipa"><p class="pane-note">Loading the pronunciation dictionary…</p></div>';
  } else if (mode === 'exercises') {
    panel = parsed.isScript || (p.text ?? '').trim()
      ? `<p class="pane-note">Every exercise runs on this script's lines, as written.</p>
         <div class="mode-grid">
           ${ACTING_GAMES.map(g => `
             <button class="mode-card" data-sgame="${g.id}" type="button">
               <span class="mode-icon" aria-hidden="true">${g.icon}</span>
               <span class="mode-title">${esc(g.title)}</span>
               <span class="mode-blurb">${esc(g.blurb)}</span>
             </button>`).join('')}
         </div>`
      : '<p class="pane-note">Add the script first — Edit is at the top of the page.</p>';
  } else if (mode === 'cards') {
    panel = '<div id="sc-cards"></div>';
  } else if (mode === 'rhythm') {
    panel = '<div id="sc-rhythm"></div>';
  }
  const showsScript = mode !== 'exercises' && mode !== 'cards' && mode !== 'ipa'
    && mode !== 'rhythm';

  app.innerHTML = `
    ${pageTopbar('🎬 ' + esc(p.title || 'Untitled'), '#8a6d3b')}
    <main class="guide script-page">
      <div class="piece-meta">
        <h1 class="piece-title">${esc(p.title || 'Untitled project')}</h1>
        <p class="piece-source">${esc([p.character, p.source, p.author, p.scene].filter(Boolean).join(' · ') || 'No source details yet')}</p>
        <div class="piece-tags">
          <span class="tag">${esc(contentTypeLabel(p.contentType))}</span>
          <span class="tag tag-dialect">🗣 ${esc(dialectName(p.accent) || p.accent)}</span>
          ${parsed.isScript ? `<span class="tag">${parsed.characters.length} characters</span>` : ''}
          <span class="tag">${speechUnits(parsed).length} speeches</span>
        </div>
        <div class="piece-actions">
          <button class="btn" id="sc-edit" type="button">✏️ Edit</button>
        </div>
      </div>
      <div class="script-shell">
        <nav class="script-rail" aria-label="Ways to work on this script">
          ${RAIL.map(([k, icon, label]) => `
            <button class="sc-rail-btn ${k === mode ? 'on' : ''}" data-mode="${k}" type="button">
              <span aria-hidden="true">${icon}</span> ${label}
            </button>`).join('')}
        </nav>
        <div class="script-main">
          ${panel ? `<section class="script-panel">${panel}</section>` : ''}
          ${showsScript ? `<article class="script-body is-${mode}" id="sc-body">${scriptHtml}</article>` : ''}
        </div>
      </div>
    </main>`;
  wireBrandHome();

  app.querySelectorAll('[data-mode]').forEach(b =>
    b.addEventListener('click', () => {
      // Question Everything is the project's own worksheet — a full page
      // of its own, with Back returning here.
      if (b.dataset.mode === 'question') return renderDissect(id);
      navStack.pop(); renderScript(id, b.dataset.mode);
    }));
  document.getElementById('sc-edit').addEventListener('click', () => renderProject(id, 'text'));

  if (mode === 'highlight') {
    app.querySelectorAll('[data-color]').forEach(b =>
      b.addEventListener('click', () => { st.color = b.dataset.color; navStack.pop(); renderScript(id, 'highlight'); }));
    document.getElementById('sc-clear-hl')?.addEventListener('click', async () => {
      await save({ marks: marks.filter(m => m.kind !== 'highlight') });
      navStack.pop(); renderScript(id, 'highlight');
    });
    // A tap anywhere on a line toggles the active colour on that line.
    app.querySelectorAll('#sc-body [data-b]').forEach(el =>
      el.addEventListener('click', async () => {
        const i = +el.dataset.b;
        const has = marks.find(m => m.kind === 'highlight' && m.block === i);
        const color = st.color ?? 'is-yellow';
        const next = has && has.color === color
          ? marks.filter(m => m !== has)                      // same colour = clear
          : [...marks.filter(m => !(m.kind === 'highlight' && m.block === i)),
             { id: uidMark(), kind: 'highlight', block: i, color }];
        await save({ marks: next });
        navStack.pop(); renderScript(id, 'highlight');
      }));
  }
  if (mode === 'beats') {
    document.getElementById('sc-clear-beats')?.addEventListener('click', async () => {
      await save({ marks: marks.filter(m => m.kind !== 'beat') });
      navStack.pop(); renderScript(id, 'beats');
    });
    app.querySelectorAll('#sc-body [data-gap]').forEach(g =>
      g.addEventListener('click', async e => {
        e.stopPropagation();
        const block = +g.closest('[data-b]').dataset.b;
        const offset = +g.dataset.gap;
        const has = marks.find(m => m.kind === 'beat' && m.block === block && m.offset === offset);
        const next = has ? marks.filter(m => m !== has)
          : [...marks, { id: uidMark(), kind: 'beat', block, offset }];
        await save({ marks: next });
        navStack.pop(); renderScript(id, 'beats');
      }));
  }
  if (mode === 'ipa') {
    const lines = speechUnits(parsed).map(unitText).filter(Boolean);
    const host = document.getElementById('sc-ipa');
    if (!lines.length) host.innerHTML = '<p class="pane-note">No spoken lines to transcribe yet.</p>';
    else fillSound(lines, p.accent, host, { projectId: id });
  }
  if (mode === 'exercises') {
    app.querySelectorAll('[data-sgame]').forEach(b =>
      b.addEventListener('click', () => runActingGame(b.dataset.sgame, {
        source: 'project', id, title: p.title || 'Untitled project',
        body: speechUnits(parsed).map(unitText).filter(Boolean).join('\n')
          || String(p.text ?? ''),
        scene: null,
      })));
  }
  if (mode === 'cards') drawScriptCards(id, p, parsed, save);
  if (mode === 'rhythm') drawScriptRhythm(id, p, parsed, save);

}

const uidMark = () => 'mk-' + Math.random().toString(36).slice(2, 10);

// ── Rhythm Cards (lesson 5.2's exercise) ──────────────────────
// Take a speech from the working text, deal a tempo-rhythm and a
// circumstance that would justify it, and read the speech aloud under
// that instruction. Then deal again: same words, different rhythm, and
// notice what changes. Interpretive work, so nothing is scored, nothing
// is recorded and nothing pays out; the exercise IS the payoff.
const RHYTHM_CARDS = [
  { speed: 'Very slow', why: 'You are explaining this to someone you must not frighten.' },
  { speed: 'Very slow', why: 'Every word costs you something to say.' },
  { speed: 'Slow', why: 'You are choosing each word in front of someone who will quote you.' },
  { speed: 'Slow', why: 'You are not sure they are listening, and you need them to be.' },
  { speed: 'Steady', why: 'You have said this many times before. It is routine.' },
  { speed: 'Steady', why: 'You are hiding how much this matters.' },
  { speed: 'Quick', why: 'You have thirty seconds before someone interrupts.' },
  { speed: 'Quick', why: 'You are thinking of the next thing while saying this one.' },
  { speed: 'Racing', why: 'If you stop, you will lose your nerve.' },
  { speed: 'Racing', why: 'The other person is already walking away.' },
  { speed: 'Slow, then quick', why: 'Halfway through, you realize what this actually means.' },
  { speed: 'Quick, then slow', why: 'Halfway through, you see their face change.' },
];

async function renderRhythmCards() {
  record(renderRhythmCards);
  // The sync view exists for headers and may be a title-only stub with
  // no body; a Studio project's text is re-read live by the async
  // resolver. Take the sync answer only when it actually carries text.
  let wt = workingText();
  if (!(wt?.body ?? '').trim()) wt = await resolveWorkingText();
  if (!wt) return renderArcadeTextPicker(() => renderRhythmCards());
  const parsed = parseScript(wt.body ?? '');
  const units = speechUnits(parsed);
  const st = (rhythmCardState.id === wt.id ? rhythmCardState
    : Object.assign(rhythmCardState, { id: wt.id, u: 0, c: -1 }));

  // no speeches at all: a sonnet or plain paragraph still works — treat
  // the whole text as one speech rather than turning the tool away.
  const pool = units.length ? units : [{ who: wt.title, blocks: [] }];
  const speechText = units.length
    ? unitText(pool[st.u % pool.length])
    : (wt.body ?? '').trim();
  const unit = pool[st.u % pool.length];

  const dealCard = () => {
    let n;
    do { n = Math.floor(Math.random() * RHYTHM_CARDS.length); } while (n === st.c);
    st.c = n;
  };
  if (st.c < 0) dealCard();
  const card = RHYTHM_CARDS[st.c];

  app.innerHTML = `
    ${pageTopbar('🎼 Rhythm Cards', '#8a6d3b')}
    <main class="guide">
      <h1 class="page-h">Rhythm Cards</h1>
      <p class="pane-note">Read the speech aloud under the card. Then deal a new card: same
        words, different rhythm. Notice what changes. Nothing is scored and nothing listens.</p>
      <section class="sp-step">
        <p class="rh-card-speed">${esc(card.speed)}</p>
        <p class="rh-card-why">${esc(card.why)}</p>
      </section>
      <section class="sp-step">
        <p class="sc-who">${esc(unit.who ?? wt.title)}</p>
        <p class="rh-card-text">${esc(speechText.length > 900 ? speechText.slice(0, 900) + '…' : speechText)}</p>
      </section>
      <div class="sc-tools">
        <button class="btn btn-primary" id="rhc-card" type="button">🎴 New rhythm</button>
        ${units.length > 1 ? '<button class="btn" id="rhc-speech" type="button">💬 New speech</button>' : ''}
        <button class="btn" id="rhc-done" type="button">Done</button>
      </div>
      <p class="pane-note">Working on: <b>${esc(wt.title)}</b></p>
    </main>`;
  wireBrandHome();
  document.getElementById('rhc-card').addEventListener('click', () => {
    dealCard(); navStack.pop(); renderRhythmCards();
  });
  document.getElementById('rhc-speech')?.addEventListener('click', () => {
    st.u = (st.u + 1 + Math.floor(Math.random() * Math.max(1, pool.length - 1))) % pool.length;
    navStack.pop(); renderRhythmCards();
  });
  document.getElementById('rhc-done').addEventListener('click', goBack);
}
const rhythmCardState = { id: null, u: 0, c: -1 };

// ── Rhythm marking: two tracks per speech (lesson 5.3) ────────
// Outer is what the audience sees. Inner is what runs underneath. The
// tool's whole point is the GAP: where the two differ, the speech gets a
// visible chip, because that distance is the playable thing. Speeds are
// a five-step scale; one note per speech names what makes the pair true.
// Everything autosaves onto the project like every other mark.
const RHYTHM_SPEEDS = [
  [1, 'Very slow'], [2, 'Slow'], [3, 'Steady'], [4, 'Quick'], [5, 'Racing'],
];

function drawScriptRhythm(id, p, parsed, save) {
  const host = document.getElementById('sc-rhythm');
  const units = speechUnits(parsed);
  if (!units.length) {
    host.innerHTML = '<p class="pane-note">Add the script first — Edit is at the top of the page.</p>';
    return;
  }
  const data = { ...(p.rhythm ?? {}) };
  const noteTimers = {};

  const commit = () => save({ rhythm: data });

  const speedRow = (key, track, current) => `
    <div class="rh-track">
      <span class="rh-track-label">${track === 'outer' ? 'Outer' : 'Inner'}</span>
      ${RHYTHM_SPEEDS.map(([v, label]) => `
        <button class="rh-speed ${current === v ? 'on' : ''}" type="button"
          data-rh="${key}" data-track="${track}" data-v="${v}"
          aria-pressed="${current === v}" title="${label}">${v}</button>`).join('')}
      <span class="rh-speed-name">${RHYTHM_SPEEDS.find(([v]) => v === current)?.[1] ?? ''}</span>
    </div>`;

  const unitHtml = u => {
    const key = String(u.start);
    const r = data[key] ?? {};
    const gap = r.outer && r.inner && r.outer !== r.inner;
    const preview = unitText(u);
    return `
      <div class="rh-unit" data-unit="${key}">
        <p class="rh-who">${esc(u.who)}
          ${gap ? '<span class="tag rh-gap">inner ≠ outer</span>' : ''}</p>
        <p class="rh-preview">${esc(preview.length > 110 ? preview.slice(0, 110) + '…' : preview)}</p>
        ${speedRow(key, 'outer', r.outer)}
        ${speedRow(key, 'inner', r.inner)}
        <input class="input-text rh-note" type="text" maxlength="200"
          data-rhnote="${key}" value="${esc(r.note ?? '')}"
          placeholder="What makes this pair true?">
      </div>`;
  };

  const marked = Object.values(data).filter(r => r.outer || r.inner).length;
  const gaps = Object.values(data).filter(r => r.outer && r.inner && r.outer !== r.inner).length;
  host.innerHTML = `
    <p class="pane-note">Two speeds per speech. <b>Outer</b> is what the audience sees.
      <b>Inner</b> is what runs underneath. Where they differ you get a chip: that gap is
      the playable thing. One note says what makes the pair true. Saved to this project.</p>
    <p class="rh-count" id="rh-count">${marked} of ${units.length} speeches marked · ${gaps} gap${gaps === 1 ? '' : 's'}</p>
    <div id="rh-units">${units.map(unitHtml).join('')}</div>`;

  const refreshUnit = key => {
    const u = units.find(x => String(x.start) === key);
    const el = host.querySelector(`[data-unit="${key}"]`);
    if (u && el) el.outerHTML = unitHtml(u);
    wireUnit(key);
    const m = Object.values(data).filter(r => r.outer || r.inner).length;
    const g = Object.values(data).filter(r => r.outer && r.inner && r.outer !== r.inner).length;
    host.querySelector('#rh-count').textContent =
      `${m} of ${units.length} speeches marked · ${g} gap${g === 1 ? '' : 's'}`;
  };

  const wireUnit = key => {
    const scope = key ? host.querySelector(`[data-unit="${key}"]`) : host;
    if (!scope) return;
    scope.querySelectorAll('[data-rh]').forEach(b =>
      b.addEventListener('click', () => {
        const k = b.dataset.rh, track = b.dataset.track, v = Number(b.dataset.v);
        const r = (data[k] ??= {});
        r[track] = r[track] === v ? undefined : v;   // tap again to clear
        if (!r.outer && !r.inner && !(r.note ?? '').trim()) delete data[k];
        commit();
        refreshUnit(k);
      }));
    scope.querySelectorAll('[data-rhnote]').forEach(inp =>
      inp.addEventListener('input', () => {
        const k = inp.dataset.rhnote;
        (data[k] ??= {}).note = inp.value;
        clearTimeout(noteTimers[k]);
        noteTimers[k] = setTimeout(commit, 600);
      }));
  };
  wireUnit(null);
}

function drawScriptCards(id, p, parsed, save) {
  const host = document.getElementById('sc-cards');
  const saved = p.cards ?? {};
  const st = (scriptState[id] ??= {});
  st.who ??= saved.who ?? null;
  st.n ??= 0;
  st.shown ??= false;

  const draw = () => {
    if (parsed.isScript && !st.who) {
      host.innerHTML = `
        <p class="pane-note">Pick your part — every one of its speeches becomes a card, cued by
          the line before it.</p>
        <div class="item-grid">
          ${parsed.characters.map(c => `
            <button class="tile" data-who="${esc(c)}" type="button">
              <span class="tile-emoji" aria-hidden="true">🎭</span>
              <span class="tile-title">${esc(c)}</span>
              <span class="tile-meta">${cuedSpeeches(parsed, c).length} speeches</span>
            </button>`).join('')}
        </div>`;
      host.querySelectorAll('[data-who]').forEach(b =>
        b.addEventListener('click', async () => {
          st.who = b.dataset.who; st.n = 0; st.shown = false;
          await save({ cards: { ...saved, who: st.who } });
          draw();
        }));
      return;
    }
    const cards = cuedSpeeches(parsed, st.who);
    if (!cards.length) { host.innerHTML = '<p class="pane-note">No speeches to make cards from yet.</p>'; return; }
    st.n = Math.min(Math.max(st.n, 0), cards.length - 1);
    const c = cards[st.n];
    const known = (p.cards?.known ?? {})[c.index] === true;
    host.innerHTML = `
      <p class="pane-note">Card ${st.n + 1} of ${cards.length}${st.who ? ` · ${esc(st.who)}` : ''} ·
        ${Object.keys(p.cards?.known ?? {}).length} marked known
        ${parsed.isScript ? '<button class="linkish" id="sc-part">change part</button>' : ''}</p>
      <section class="sp-passage" aria-label="Cue">
        <span class="cc-stage">${c.cue ? esc(c.cue.who) : 'Cue'}</span>
        <div class="sp-passage-text" id="sc-cue"></div>
      </section>
      <section class="sp-passage ${st.shown ? '' : 'is-hidden-card'}" aria-label="Your line" aria-live="polite">
        <span class="cc-stage">${esc(st.who || 'Your line')}</span>
        <div class="sp-passage-text" id="sc-line">${st.shown ? '' : '· · ·'}</div>
      </section>
      <div class="practice-row">
        ${st.shown
          ? `<button class="btn btn-primary" id="sc-next" type="button">${st.n + 1 < cards.length ? 'Next card ›' : 'Start again'}</button>
             <button class="btn ${known ? 'btn-lite' : ''}" id="sc-known" type="button">${known ? 'Known ✓' : 'Mark known'}</button>`
          : '<button class="btn btn-primary" id="sc-show" type="button">Show my line</button>'}
        <button class="btn-lite" id="sc-prev" type="button" ${st.n === 0 ? 'disabled' : ''}>‹ Previous</button>
      </div>`;
    // textContent, never innerHTML — a pasted script stays inert.
    host.querySelector('#sc-cue').textContent = c.cue ? unitText(c.cue) : 'Top of the script — you open.';
    if (st.shown) host.querySelector('#sc-line').textContent = unitText(c.block);
    host.querySelector('#sc-show')?.addEventListener('click', () => { st.shown = true; draw(); });
    host.querySelector('#sc-next')?.addEventListener('click', () => {
      st.n = st.n + 1 < cards.length ? st.n + 1 : 0; st.shown = false; draw();
    });
    host.querySelector('#sc-prev')?.addEventListener('click', () => { st.n -= 1; st.shown = false; draw(); });
    host.querySelector('#sc-part')?.addEventListener('click', () => { st.who = null; st.n = 0; draw(); });
    host.querySelector('#sc-known')?.addEventListener('click', async () => {
      const fresh = await getProject(id);
      const k = { ...(fresh.cards?.known ?? {}) };
      if (k[c.index]) delete k[c.index]; else k[c.index] = true;
      await save({ cards: { ...(fresh.cards ?? {}), who: st.who, known: k } });
      p.cards = { ...(fresh.cards ?? {}), who: st.who, known: k };
      draw();
    });
  };
  draw();
}

// ── Project detail ────────────────────────────────────────────

async function renderProject(id, tab = 'text') {
  record(() => renderProject(id, tab));
  const p = await getProject(id);
  if (!p) return renderCustomWork();   // project gone — back to the list

  // While recording is paused, the Perform tab becomes a Takes view and
  // appears only when this project HAS saved takes — or when the lookup
  // failed, which must reveal the tab with its recovery message, never
  // hide it. A confirmed-empty lookup is the only thing that hides it.
  const takesTab = CAPABILITIES.learnerSpeaking
    ? ['perform', '🎙 Perform']
    : (await takesPresence({ projectId: id })) === 'empty' ? null : ['perform', '🎬 Takes'];
  // Edit is for editing (owner order, 2026-08-20): the Text tab alone.
  // Reading, IPA, highlighting, beats, flash cards and exercises all
  // live on the script page. The Takes tab is kept ONLY when this
  // project actually has recordings — dropping it would strand them.
  const tabs = [['text', '📄 Text'], takesTab].filter(Boolean);

  app.innerHTML = `
    ${pageTopbar('🎬 ' + esc(p.title || 'Untitled'), '#8a6d3b')}
    <main class="guide sonnet-view">
      <div class="piece-meta">
        <h1 class="piece-title">${esc(p.title || 'Untitled project')}</h1>
        <p class="piece-source">${esc([p.character, p.source, p.scene].filter(Boolean).join(' · ') || 'Add a source below')}</p>
        <div class="piece-tags">
          <span class="tag">${esc(contentTypeLabel(p.contentType))}</span>
          <span class="tag ${STATUS_CLASS[p.status] || ''}">${esc(p.status)}</span>
          <span class="tag tag-dialect">🗣 ${esc(dialectName(p.accent) || p.accent)}</span>
          ${p.lines.length ? `<span class="tag">${p.lines.length} lines</span>` : ''}
        </div>
        <div class="piece-actions">
          <button class="btn" id="proj-dissect" type="button">🔍 Question Everything</button>
          <span class="pane-note" id="proj-diss-note"></span>
        </div>
      </div>
      <div class="sonnet-tabs proj-tabs">
        ${tabs.map(([k, l]) => `<button class="son-tab ${k === tab ? 'on' : ''}" data-tab="${k}" type="button">${l}</button>`).join('')}
      </div>
      <div id="proj-pane" class="sonnet-pane"></div>
    </main>`;
  wireBrandHome();

  const pane = document.getElementById('proj-pane');
  app.querySelectorAll('.proj-tabs .son-tab').forEach(b =>
    b.addEventListener('click', () => { stopSpeech(); renderProject(id, b.dataset.tab); }));

  // Dissection is a focused screen, not a tab (per the approved spec) —
  // normal Back returns here. The note quietly shows coverage when a
  // dissection already exists; a failed lookup just leaves it blank.
  document.getElementById('proj-dissect').addEventListener('click', () => renderDissect(id));
  // Practice This Text: select a passage, choose a routine or game,
  // and finish back at THIS project (speechReturnTo).
  const dissNote = document.getElementById('proj-diss-note');
  dissectionFor('project', id)
    .then(d => { if (d && dissNote.isConnected) dissNote.textContent = coverageLine(d); })
    .catch(() => {});

  const fresh = async () => getProject(id);

  if (tab === 'text') paneText(pane, p, id);
  else if (tab === 'cards') paneFlashCards(pane, p);
  else if (tab === 'scan') pane.innerHTML = p.lines.length ? scanPane(p.lines, false) : emptyText();
  else if (tab === 'ipa') {
    if (!p.lines.length) pane.innerHTML = emptyText();
    else { pane.innerHTML = `<p class="pane-note">Loading the pronunciation dictionary…</p>`; fillSound(p.lines, p.accent, pane, { projectId: id }); }
  }
  else if (tab === 'perform') {
    if (CAPABILITIES.learnerSpeaking && !p.lines.length) pane.innerHTML = emptyText();
    else {
      // Viewing saved takes is not rehearsing — only stamp when recording.
      if (CAPABILITIES.learnerSpeaking) await touchRehearsed(id);
      renderPerformPane(pane, { lines: p.lines, accent: p.accent, clip: null, scopeId: null, projectId: id });
    }
  }
}

const emptyText = () => '<p class="pane-note">Add the text on the <b>Text</b> tab first.</p>';

// Debounced autosave shared by the editable panes: edits persist on their
// own after a short pause, with a visible Saving…/Saved state, and never
// re-render the pane (a re-render would steal the caret).
function wireAutosave(stateEl, collect) {
  let timer = null, saving = false, queued = false;
  const run = async () => {
    if (saving) { queued = true; return; }
    saving = true;
    stateEl.textContent = 'Saving…';
    try {
      const fresh = await collect();
      await saveProject(fresh);
      stateEl.textContent = 'Saved ✓';
    } catch {
      stateEl.textContent = 'Not saved — storage error. Copy your text to be safe.';
    }
    saving = false;
    if (queued) { queued = false; run(); }
  };
  return {
    touch() {
      stateEl.textContent = 'Saving…';
      clearTimeout(timer);
      timer = setTimeout(run, 800);
    },
    async flush() { clearTimeout(timer); await run(); },
  };
}

// ── Speech Dissection, Quick mode (Build B) ──────────────────
// Six questions on one Studio project, on its own FOCUSED SCREEN (per the
// approved spec: not another Studio tab). Back uses the normal history
// stack and returns to the project. A thinking tool, not a worksheet:
// "I don't know yet" and "Not relevant" are one-tap first-class answers,
// coverage is words not a score, and everything autosaves. The record is
// created lazily on the first real interaction, so opening the screen
// never writes to the database. EVERY stored string is untrusted on read —
// esc() on render, values assigned via .value where possible.
// ── Question Everything: the read-only TEXTBOOK (Studio hub) ─
// (Internal names keep the historical "dissect"/"dissection" spelling —
// stores, fields and question IDs are never renamed.)
// Strict separation: this page is educational reference only. Every
// interactive response feature — textareas, answer states, autosave,
// coverage, saved dissections — lives EXCLUSIVELY in the Studio
// worksheet (project → Question Everything). This page takes only the
// question DATA from dissect.js (DISSECT_SECTIONS, shared with the
// worksheet since 2026-08-20 so the two can never drift) and never
// creates, reads or updates a dissection record.
// The copy below is the owner-supplied textbook text, verbatim.
function renderDissectTextbook() {
  record(renderDissectTextbook);
  stopSpeech();

  const RETURNING = ['What evidence supports my choice?',
    'Am I playing the words or imposing an unrelated idea?',
    'Am I making a specific choice or relying on a general emotion?',
    'Does this interpretation make the relationship clearer?',
    'Does it increase the urgency of speaking?', 'Can the other person affect me?',
    'Am I allowing my actions to change?', 'What remains uncertain?',
    'What new question should I take back to the text?'];
  // A section with a single question states it inline — "Ask:" over a
  // one-item bullet list reads as a list that lost its other items.
  const asksHtml = list => list.length === 1
    ? `<p class="guide-text sd-ask-one"><b>Ask:</b> ${esc(list[0])}</p>`
    : `
      <p class="pane-note">Ask:</p>
      <ul class="sd-asks">${list.map(a => `<li class="guide-text">${esc(a)}</li>`).join('')}</ul>`;
  app.innerHTML = `
    ${pageTopbar('🔍 Question Everything', '#8a6d3b')}
    <main class="guide" id="sd-textbook">
      <h1 id="sd-title">Question Everything</h1>
      <p class="guide-text">A script gives you the words. Question Everything helps you discover what is happening underneath them.</p>
      <p class="guide-text">This is not about finding one perfect interpretation. It is an actor’s working process: examining the circumstances, objective, resistance, tactics and changes inside a piece of text.</p>
      <p class="guide-text">Use these questions while reading a monologue, speech, scene or audition side. Return to them whenever the text feels unclear, general or emotionally disconnected.</p>
      ${DISSECT_SECTIONS.map(s => `
      <h2 class="guide-heading">${esc(s.h)}</h2>
      <p class="guide-text">${esc(s.lead)}</p>
      ${asksHtml(s.asks)}
      ${s.close.map(c => `<p class="guide-text">${esc(c)}</p>`).join('')}
      ${s.playable ? '<p><button class="btn-lite" id="sd-playable" type="button">🎯 Explore Playable Actions</button></p>' : ''}`).join('')}
      <h2 class="guide-heading">Keep Returning to the Text</h2>
      <p class="guide-text">As you work, continue asking:</p>
      <ul class="sd-asks">${RETURNING.map(a => `<li class="guide-text">${esc(a)}</li>`).join('')}</ul>
      <p class="guide-text">Question Everything is not about locking the performance into one answer. It gives the actor a specific, playable understanding from which discovery can continue.</p>
      <p class="pane-note">To work these questions on your own text, open a Studio project and press <b>🔍 Question Everything</b>.</p>
    </main>`;
  wireBrandHome();
  // Written link only — never recommends an action or analyzes any text.
  document.getElementById('sd-playable').addEventListener('click', renderPlayableActions);
}

async function renderDissect(id) {
  record(() => renderDissect(id));
  let p;
  try { p = await getProject(id); }
  catch (err) {
    app.innerHTML = `${pageTopbar('🔍 Dissect', '#8a6d3b')}
      <main class="guide"><p class="pane-note pane-warn">${esc(dbErrorMessage(err))}</p></main>`;
    wireBrandHome();
    return;
  }
  if (!p) return renderCustomWork();   // project gone — back to the list
  app.innerHTML = `
    ${pageTopbar('🔍 Dissect: ' + esc(p.title || 'Untitled'), '#8a6d3b')}
    <main class="guide">
      <h1 class="piece-title">${esc(p.title || 'Untitled project')}</h1>
      <div id="diss-screen"></div>
    </main>`;
  wireBrandHome();
  paneDissect(document.getElementById('diss-screen'), p, id);
}

async function paneDissect(pane, p, id) {
  let d = await dissectionFor('project', id);

  const STATUS_GLYPH = { answered: '✓', unknown: '?', na: '—', blank: '○' };
  const STATUS_WORD = { answered: 'answered', unknown: 'marked "I don\'t know yet"',
                        na: 'marked not relevant', blank: 'not explored yet' };
  const stOf = qid => {
    const a = d?.answers?.[qid];
    return !a ? 'blank' : a.status === ANSWER_STATUS.unknown ? 'unknown'
      : a.status === ANSWER_STATUS.na ? 'na' : 'answered';
  };

  pane.innerHTML = `
    <div class="proj-form">
      <p class="pane-note">The whole of <b>Question Everything</b>, run on this text — six sections
        and every question under them. <b>“I don’t know yet” is a real answer</b>: an honest open
        question is worth more than a guess. Nothing here is scored.</p>
      <p class="diss-coverage" id="diss-cov" aria-live="polite"></p>
      <div id="diss-list">
        ${dissectQuestions().map(({ id: qid, q }, i) => `
        <section class="diss-q" data-q="${qid}">
          <h3 class="diss-h">
            <button class="diss-head" type="button" aria-expanded="false" aria-controls="db-${i}">
              <span class="diss-status" data-st="" aria-hidden="true"></span>
              <span class="diss-question">${esc(q)}</span>
              <span class="diss-status-word sr-only"></span>
            </button>
          </h3>
          <div class="diss-body" id="db-${i}" hidden>
            <label class="field">
              <span class="field-label">${esc(q)}</span>
              <textarea class="diss-text" rows="4" spellcheck="true" maxlength="${MAX_ANSWER_LEN}"></textarea>
            </label>
            <div class="diss-marks">
              <button class="btn-lite diss-mark" data-mark="unknown" type="button" aria-pressed="false">🤔 I don’t know yet</button>
              <button class="btn-lite diss-mark" data-mark="na" type="button" aria-pressed="false">Not relevant</button>
              <button class="btn-lite diss-clear" type="button">Clear</button>
            </div>
            ${qid === 'quick.doing' ? `
            <p class="pane-note diss-pa">Looking for the verb underneath the line?
              <button class="btn-lite" data-pa-link type="button">Explore Playable Actions</button></p>` : ''}
          </div>
        </section>`).join('')}
      </div>
      <p class="pane-note" id="diss-state" role="status" aria-live="polite"></p>
    </div>`;

  const stateEl = pane.querySelector('#diss-state');
  const covEl = pane.querySelector('#diss-cov');
  const sections = [...pane.querySelectorAll('.diss-q')];

  const refresh = () => {
    covEl.textContent = d ? coverageLine(d)
      : 'Nothing explored yet — open a question to start.';
    for (const sec of sections) {
      const st = stOf(sec.dataset.q);
      sec.querySelector('.diss-status').dataset.st = st;
      sec.querySelector('.diss-status').textContent = STATUS_GLYPH[st];
      sec.querySelector('.diss-status-word').textContent = STATUS_WORD[st];
      for (const b of sec.querySelectorAll('.diss-mark'))
        b.setAttribute('aria-pressed', String(st === b.dataset.mark));
    }
  };

  // Values go in through .value, never innerHTML — inert by construction.
  for (const sec of sections)
    sec.querySelector('.diss-text').value = d?.answers?.[sec.dataset.q]?.value ?? '';

  const ensure = async () => {
    if (!d) {
      d = newDissection({ targetType: 'project', targetId: id,
        targetLabel: p.title || 'Untitled project',
        materialType: materialTypeFrom(p.contentType) });
      await putDissection(d);
    }
    return d;
  };

  // Debounced, strictly serialized writes (dissect.js createSaver): rapid
  // typing collapses, nothing overlaps or lands out of order, and a failed
  // write shows the honest storage message — never "Saved ✓".
  const saver = createSaver({
    onState: (s) => {
      stateEl.textContent = s === 'saving' ? 'Saving…'
        : s === 'saved' ? 'Saved ✓'
        : 'Not saved — storage error. Copy your text to be safe.';
      if (s !== 'saving') refresh();
    },
  });
  const job = (fn) => async () => { await ensure(); d = await fn(); };

  for (const sec of sections) {
    const qid = sec.dataset.q;
    const head = sec.querySelector('.diss-head');
    const body = sec.querySelector('.diss-body');
    const text = sec.querySelector('.diss-text');

    // Progressive disclosure: one question open at a time.
    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') === 'true';
      for (const s2 of sections) {
        s2.querySelector('.diss-head').setAttribute('aria-expanded', 'false');
        s2.querySelector('.diss-body').hidden = true;
      }
      if (!open) {
        head.setAttribute('aria-expanded', 'true');
        body.hidden = false;
        text.focus();
      }
    });

    // Typing answers the question: status derives from the text and any
    // explicit mark is released (the derivation in saveAnswer handles it).
    text.addEventListener('input', () =>
      saver.touch(job(() => saveAnswer(d.id, qid, { value: text.value }))));

    // Clear THIS question — its text and any mark. Nothing else in the
    // dissection is touched; there is no delete-everything any more.
    sec.querySelector('.diss-clear').addEventListener('click', () => {
      if (!text.value && stOf(qid) === 'blank') return;
      text.value = '';
      saver.now(job(() => saveAnswer(d.id, qid, { value: '', status: null })));
    });

    // One-tap marks. Tapping the active mark releases it (back to whatever
    // the text implies); marking never erases typed text.
    for (const btn of sec.querySelectorAll('.diss-mark'))
      btn.addEventListener('click', () => {
        const active = btn.getAttribute('aria-pressed') === 'true';
        saver.now(job(() => saveAnswer(d.id, qid,
          active ? { value: text.value } : { value: text.value, status: btn.dataset.mark })));
      });
  }

  // Contextual doorway only: navigation, no analysis of the answer, no
  // recommendation, nothing stored. Back returns to this screen.
  pane.querySelector('[data-pa-link]')?.addEventListener('click', () => renderPlayableActions());


  refresh();
}

function paneText(pane, p, id) {
  pane.innerHTML = `
    <div class="proj-form">
      <div class="form-grid">
        <label class="field"><span class="field-label">Project title</span>
          <input class="input-text" id="f-title" value="${esc(p.title)}" placeholder="Stanley Audition"></label>
        <label class="field"><span class="field-label">Content type</span>
          <select class="input-sel" id="f-type">
            ${CONTENT_TYPES.map(([v, l]) => `<option value="${v}" ${v === (p.contentType ?? 'other') ? 'selected' : ''}>${esc(l)}</option>`).join('')}
          </select></label>
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
        <button class="btn btn-primary" id="f-save" type="button">Save now</button>
        <span class="save-state" id="f-state" role="status" aria-live="polite">Autosaves as you type.</span>
      </div>
    </div>`;

  const textEl = pane.querySelector('#f-text');
  const warn = pane.querySelector('#f-warn');
  const originalLineCount = p.lines.length;

  const auto = wireAutosave(pane.querySelector('#f-state'), async () => ({
    ...(await getProject(id)),
    title: pane.querySelector('#f-title').value.trim(),
    contentType: pane.querySelector('#f-type').value,
    source: pane.querySelector('#f-source').value.trim(),
    author: pane.querySelector('#f-author').value.trim(),
    character: pane.querySelector('#f-character').value.trim(),
    scene: pane.querySelector('#f-scene').value.trim(),
    accent: pane.querySelector('#f-accent').value,
    status: pane.querySelector('#f-status').value,
    text: textEl.value,
  }));
  pane.querySelectorAll('#f-title, #f-source, #f-author, #f-character, #f-scene, #f-text')
    .forEach(elm => elm.addEventListener('input', () => auto.touch()));
  pane.querySelectorAll('#f-type, #f-accent, #f-status')
    .forEach(elm => elm.addEventListener('change', () => auto.touch()));

  // Changing the text can orphan line-numbered takes — say so as you type.
  textEl.addEventListener('input', () => {
    const next = splitLines(textEl.value).length;
    if (originalLineCount && next !== originalLineCount) {
      warn.hidden = false;
      warn.className = 'pane-note pane-warn';
      warn.innerHTML = `⚠ The line count changes from ${originalLineCount} to ${next}. Saved takes and notes are kept, but takes recorded against a line number may no longer line up.`;
    } else warn.hidden = true;
  });

  pane.querySelector('#f-save').addEventListener('click', async () => {
    await auto.flush();
    renderScript(id);
  });
}

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
// (The old "Train Any Text" scratchpad is gone: pasted text lives in the
// Studio as a real project now. Its one-time draft migration into a project
// already ran at startup, and the legacy localStorage value stays untouched.)

// One sonnet, opened in the reader (defaults to RP; dialect is switchable).
async function renderSonnet(n) {
  record(() => renderSonnet(n));
  const s = SONNETS.find(x => x.n === n);
  if (!s) return renderSonnetList();
  const idx = SONNETS.findIndex(x => x.n === n);
  const prev = SONNETS[idx - 1], next = SONNETS[idx + 1];
  // A dialect is offered as recorded ONLY when this sonnet's complete
  // line set exists for it (generated manifest — never a hardcoded claim).
  const narrated = Object.keys(LONGFORM_COVERAGE.sonnets)
    .filter(d => LONGFORM_COVERAGE.sonnets[d].includes(n));
  // The learning edition, loaded lazily from its chunk (Build F). A load
  // failure means the sonnet simply renders without edition tabs — the
  // Original never depends on the catalog.
  const ed = await editionFor(n).catch(() => null);
  // Plain Meaning and In Today's Voice: only texts BOTH written and
  // APPROVED — drafts render solely on #review, and an empty list means
  // no tab at all. Never a dead tab, never a draft on a learner surface.
  const today = ed
    ? ['nam', 'ssbe', 'aus']
        .filter(d => ed.voices[d] && ed.voiceStatus(d) === 'approved')
        .map(d => ({ id: d, label: TRANSPOSITION_LABELS[d] ?? d, text: ed.voices[d] }))
    : [];
  renderReader({
    label: `Sonnet ${n}`, lines: s.lines, accent: narrated[0] ?? 'rp',
    clip: (i, acc) => narrated.includes(acc) ? `audio/sonnets/${acc}/${n}-${i}.mp3` : null,
    narrated,
    recast: ed && ed.plain && ed.plainStatus === 'approved' ? { plain: ed.plain } : null,
    today,
    scopeId: `sonnet:${n}`,
    prev: prev ? { label: `‹ Sonnet ${prev.n}`, go: () => renderSonnet(prev.n) } : null,
    next: next ? { label: `Sonnet ${next.n} ›`, go: () => renderSonnet(next.n) } : null,
  });
}



// The reader: any text, three ways (Speak / Scan / Sound), any dialect.
function renderReader({ label, lines, accent, prev, next, clip, verse = true, meta = null, narrated = [], recast = null, today = [], scopeId = null, projectId = null }) {
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
        ${CAPABILITIES.learnerSpeaking ? '<button class="son-tab" data-mode="perform">🎙 Perform</button>' : ''}
        ${recast?.plain ? '<button class="son-tab" data-mode="plain">📖 Plain Meaning</button>' : ''}
        ${today.length ? '<button class="son-tab" data-mode="today">🗣 In Today’s Voice</button>' : ''}
      </div>
      <div class="sonnet-pane" id="sonnet-pane"></div>
      <div class="sonnet-nav">
        ${prev ? `<button class="btn-lite" id="rd-prev">${esc(prev.label)}</button>` : '<span></span>'}
        ${next ? `<button class="btn-lite" id="rd-next">${esc(next.label)}</button>` : '<span></span>'}
      </div>
    </main>`;
  wireBrandHome();

  let cur = accent, mode = 'speak';
  const pane = document.getElementById('sonnet-pane');
  const drawDialects = () => document.getElementById('rd-dialects').innerHTML =
    TEXT_DIALECTS.map(d => {
      const hasAudio = narrated.includes(d.id);
      return `<button class="dialect-chip ${d.id === cur ? 'on' : ''} ${hasAudio ? '' : 'no-audio'}" data-d="${d.id}"
        title="${hasAudio ? `${esc(d.label)} — recorded audio` : `${esc(d.label)} — no model recording for this text yet; the transcription and scansion views still work`}"
        aria-label="${esc(d.label)}${hasAudio ? '' : ' — model recording coming soon; the transcription and scansion views still work'}">
        <span class="dialect-icon">${d.flag}</span>${d.label}${hasAudio ? '' : ' <small class="chip-soon">· audio soon</small>'}</button>`;
    }).join('');
  const show = m => {
    stopSpeech();
    teardownAV();      // reader mode switches don't re-run record(): stop any capture here
    mode = m;
    app.querySelectorAll('.son-tab').forEach(t => t.classList.toggle('on', t.dataset.mode === m));
    if (m === 'speak') { pane.innerHTML = speakPane(lines, cur, narrated); wireSpeak(lines, cur, pane, clip); }
    else if (m === 'scan') { pane.innerHTML = scanPane(lines, verse); }
    else if (m === 'perform') { renderPerformPane(pane, { lines, accent: cur, clip, scopeId, projectId }); }
    else if (m === 'plain') { pane.innerHTML = plainPane(recast); }
    else if (m === 'today') { todayPane(pane, today); }
    else { pane.innerHTML = `<p class="pane-note">Loading the pronunciation dictionary…</p>`; fillSound(lines, cur, pane); }
  };
  drawDialects();
  document.getElementById('rd-dialects').addEventListener('click', e => {
    const b = e.target.closest('.dialect-chip'); if (!b) return;
    cur = b.dataset.d; drawDialects(); show(mode);
  });
  app.querySelectorAll('.son-tab').forEach(t => t.addEventListener('click', () => show(t.dataset.mode)));
  document.getElementById('rd-prev')?.addEventListener('click', () => { stopSpeech(); prev.go(); });
  document.getElementById('rd-next')?.addEventListener('click', () => { stopSpeech(); next.go(); });
  show('speak');

  // Recording paused: reveal a Takes tab when this text HAS saved takes —
  // or when the lookup failed, which must reveal it with the recovery
  // message. Only a confirmed-empty lookup leaves the tab hidden.
  if (!CAPABILITIES.learnerSpeaking && (scopeId || projectId)) {
    const tabsEl = app.querySelector('.sonnet-tabs');
    takesPresence({ projectId, scopeId }).then(presence => {
      if (presence === 'empty') return;
      if (!tabsEl?.isConnected || tabsEl.querySelector('[data-mode="perform"]')) return;
      tabsEl.insertAdjacentHTML('beforeend', '<button class="son-tab" data-mode="perform">🎬 Takes</button>');
      tabsEl.querySelector('[data-mode="perform"]').addEventListener('click', () => show('perform'));
    });
  }
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

// takesPresence lives in js/recordings.js (injectable lister → the
// timeout and error semantics are unit-tested). Uncertainty is never
// read as absence: only a confirmed-empty lookup hides the Takes tab.

// The disabled-build Takes view: existing recordings stay fully accessible
// (play, download, confirmed delete; rating/note/Best Take shown read-only)
// with no capture controls of any kind. Privacy → Manage Recordings is the
// permanent backstop and the recovery path on lookup failure.
async function renderTakesView(pane, { accent, clip, scopeId, projectId }) {
  const lang = dialectLang(accent);
  pane.innerHTML = `
    <div id="perform-live" class="sr-only" role="status" aria-live="polite"></div>
    <p class="pane-note">Recording new takes is paused in this version of Speechcraft. Your saved takes stay on this device — play, download or delete them here, or under Privacy &amp; Data → Manage Recordings.</p>
    <h3 class="guide-heading">Saved takes</h3>
    <div id="perf-takes" class="takes-list"><p class="pane-note">Loading…</p></div>`;

  const takesEl = pane.querySelector('#perf-takes');
  const draw = async () => {
    let takes = [];
    try { takes = await listTakes({ projectId, scopeId }); }
    catch {
      takesEl.innerHTML = '<p class="pane-note pane-warn">Couldn’t open local storage to check for saved takes. Nothing has been deleted — try again, or manage recordings under Privacy &amp; Data.</p>';
      return;
    }
    if (!takes.length) {
      takesEl.innerHTML = '<p class="pane-note">No saved takes for this piece.</p>';
      return;
    }
    takesEl.innerHTML = takes.map((t, i) => {
      const rate = RATINGS.find(r => r.id === t.rating);
      return `
        <div class="take-card" data-take="${t.id}">
          <div class="take-head">
            <span class="take-name">Take ${takes.length - i}</span>
            ${rate ? `<span class="tag take-rate rate-${t.rating}">${esc(rate.label)}</span>` : ''}
          </div>
          <p class="take-meta">${esc(t.label || '')} · ${formatMs(t.durationMs || 0)} · ${new Date(t.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}${t.sizeBytes ? ` · ${(t.sizeBytes / 1024).toFixed(0)} KB` : ''}</p>
          ${t.note ? `<p class="take-note">${esc(t.note)}</p>` : ''}
          <div class="take-actions">
            <button class="btn-lite" type="button" data-act="play">▶ Play</button>
            <button class="btn-lite" type="button" data-act="dl">⬇ Download</button>
            <button class="btn-lite btn-danger" type="button" data-act="del">Delete</button>
          </div>
        </div>`;
    }).join('');
    // Read-only ★ Best Take badge (no toggle while recording is paused).
    if (projectId) {
      const project = await getProject(projectId);
      const best = project?.bestTakeId && takesEl.querySelector(`[data-take="${project.bestTakeId}"] .take-head`);
      if (best) best.insertAdjacentHTML('beforeend', '<span class="tag tag-skill">★ Best Take</span>');
    }
    takesEl.querySelectorAll('.take-card').forEach(card => {
      const id = card.dataset.take;
      card.addEventListener('click', async e => {
        const btn = e.target.closest('button[data-act]'); if (!btn) return;
        const act = btn.dataset.act;
        if (act === 'play') { playUrl(await takeUrl(id)); }
        else if (act === 'dl') {
          const url = await takeUrl(id);
          const meta = takes.find(t => t.id === id);
          const a = document.createElement('a');
          a.href = url;
          a.download = `speechcraft-take-${new Date(meta.createdAt).toISOString().slice(0, 10)}.${(meta.mimeType || '').includes('mp4') ? 'm4a' : 'webm'}`;
          document.body.appendChild(a); a.click(); a.remove();
        } else if (act === 'del') {
          if (!confirm('Delete this take? This cannot be undone.')) return;
          await deleteTake(id);
          announce('Take deleted.');
          draw();
        }
      });
    });
  };
  draw();
}

function renderPerformPane(pane, { lines, accent, clip, scopeId, projectId }, caps = CAPABILITIES) {
  if (!caps.learnerSpeaking) {
    renderTakesView(pane, { accent, clip, scopeId, projectId });
    return;
  }
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
    </div>
    ${performCaptureHtml(caps, { canRecord })}

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
  // An unsaved take must not survive leaving this pane — navigation calls
  // this through teardownAV().
  performCleanup = releasePending;

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
          <p class="take-meta">${esc(t.label || '')} · ${formatMs(t.durationMs || 0)} · ${new Date(t.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}${t.sizeBytes ? ` · ${(t.sizeBytes / 1024).toFixed(0)} KB` : ''}</p>
          ${t.note ? `<p class="take-note">${esc(t.note)}</p>` : ''}
          <div class="take-actions">
            <button class="btn-lite" type="button" data-act="play">▶ Play</button>
            <button class="btn-lite" type="button" data-act="compare">⇄ Compare</button>
            ${projectId ? `<button class="btn-lite" type="button" data-act="best">${isBest ? 'Unset best' : '★ Best Take'}</button>` : ''}
            <button class="btn-lite" type="button" data-act="dl">⬇ Download</button>
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
        else if (act === 'dl') {
          const url = await takeUrl(id);
          const meta = takes.find(t => t.id === id);
          const a = document.createElement('a');
          a.href = url;
          a.download = `speechcraft-take-${new Date(meta.createdAt).toISOString().slice(0, 10)}.${(meta.mimeType || '').includes('mp4') ? 'm4a' : 'webm'}`;
          document.body.appendChild(a); a.click(); a.remove();
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

// ── Plain Meaning: a faithful reading companion (no dialect tabs) ──
// The original text lives in Listen; this mode explains its literal
// meaning, imagery and emotional movement. It is an explanation, never a
// performance translation. (The dialect-adaptation experiment was removed
// from the interface 2026-07-31; its source data is retained off-UI for a
// possible future "Transpositions" feature.)
function plainPane(recast) {
  return `
    <p class="pane-note">📖 <b>Plain Meaning</b> — what the original says, in plain prose. The full text is in the Listen tab.</p>
    <p class="guide-text">${esc(recast.plain)}</p>`;
}

// In Today's Voice: the sonnet's ideas re-voiced in a contemporary
// register — a CREATIVE TRANSPOSITION, labelled as such, never presented
// as a literal translation. Only approved dialect versions ever arrive
// here (renderSonnet filters through the review gate).
function todayPane(pane, today) {
  let cur = today[0].id;
  const draw = () => {
    const t = today.find(x => x.id === cur);
    pane.innerHTML = `
      <p class="pane-note">🗣 <b>In Today’s Voice</b> — the same argument and imagery, re-voiced in a present-day register. A <b>creative transposition</b>, not a literal translation; the original is always one tab away.</p>
      ${today.length > 1 ? `
      <div class="dialect-picker"><span class="dialect-label">Version</span><div class="dialect-chips" id="today-chips">
        ${today.map(x => `<button class="dialect-chip ${x.id === cur ? 'on' : ''}" data-t="${esc(x.id)}" type="button">${esc(x.label)}</button>`).join('')}
      </div></div>` : `<p class="sonnet-hint">${esc(t.label)}</p>`}
      <div class="sonnet-lines today-lines">${t.text.split('\n').map(l => `<p class="guide-text">${esc(l)}</p>`).join('')}</div>`;
    pane.querySelector('#today-chips')?.addEventListener('click', e => {
      const b = e.target.closest('.dialect-chip'); if (!b) return;
      cur = b.dataset.t; draw();
    });
  };
  draw();
}

// ── Dialect in Action ─────────────────────────────────────────
// Believable speech built from the course's Words & Expressions. Only
// approved pieces reach the Library; drafts render solely on #review.

// [[term|ID]] markers become highlighted, tappable expression chips that
// open the matching Words & Expressions entry.
function actionLineHtml(text) {
  return esc(text).replace(/\[\[([^\]|]+)\|([A-Z]+-\d+)\]\]/g,
    (_, term, id) => `<button class="xp-term" data-xp="${id}" type="button"
      aria-label="Expression: ${esc(term)} — open its definition">${esc(term)}</button>`);
}

function actionPieceHtml(piece) {
  return `
    <div class="piece-meta">
      <h1 class="piece-title">${esc(piece.title)}</h1>
      <p class="piece-source">${esc(piece.setting)}</p>
      <p class="piece-scene">${esc(piece.speakerDescription)}</p>
      <div class="piece-tags">
        <span class="tag">${piece.type === 'dialogue' ? 'Dialogue' : 'Monologue'}</span>
        <span class="tag tag-dialect">🗣 ${esc(dialectName(piece.courseId))}</span>
        <span class="tag">${esc(piece.register)}</span>
      </div>
      ${piece.situation ? `<p class="guide-text piece-situation"><b>The situation:</b> ${esc(piece.situation)}</p>` : ''}
      <p class="pane-note">${esc(piece.region)}. Highlighted words are this course’s Words &amp; Expressions — tap one for its meaning.</p>
      ${piece.audio ? '' : '<p class="pane-note">🎙 No recording exists for this piece yet — audio arrives only when an approved recording in this exact dialect does.</p>'}
    </div>
    <div class="sonnet-lines action-lines">
      ${piece.lines.map(l => `
        <p class="guide-text action-line">${l.speaker ? `<b class="action-speaker">${esc(l.speaker)}:</b> ` : ''}${actionLineHtml(l.text)}</p>`).join('')}
    </div>`;
}

function wireActionPiece(root) {
  root.querySelectorAll('.xp-term').forEach(b =>
    b.addEventListener('click', () => {
      const entry = IDIOM.find(e => e.id === b.dataset.xp);
      if (!entry) return;
      openModal({
        title: `“${entry.term}”`,
        body: `
          <p class="idiom-meaning">${esc(entry.meaning)}</p>
          ${entry.example ? `<p class="idiom-example">“${esc(entry.example)}”</p>` : ''}
          ${entry.note ? `<p class="idiom-note">${esc(entry.note)}</p>` : ''}
          <p class="pane-note">From ${esc(dialectName(entry.dialect))} Words &amp; Expressions.</p>`,
        actions: '<button class="btn btn-primary" id="xp-close" type="button">Done</button>',
        onMount: (rootEl, close) => rootEl.querySelector('#xp-close').addEventListener('click', close),
      });
    }));
}

function renderDialectAction(d) {
  const pieces = actionFor(d);
  // Never render a shelf with nothing on it: any caller that reaches here
  // with no approved pieces gets the honest pending page instead. The
  // delegation precedes record() so the back stack holds the page shown.
  if (!pieces.length) return renderDialectActionPending(d);
  record(() => renderDialectAction(d));
  app.innerHTML = `
    ${pageTopbar('🎭 Dialect in Action', trackFor(d).color)}
    <main class="track-list">
      <p class="track-blurb">${esc(dialectName(d))}’s words, expressions and rhythm inside believable speech — a scene and a story, not a vocabulary list.</p>
      ${pieces.map((p, i) => `
        <button class="track-card" data-i="${i}" type="button" style="--track-color:${trackFor(d).color}">
          <div class="track-glyph">${p.type === 'dialogue' ? '💬' : '🎤'}</div>
          <div class="track-info"><h2>${esc(p.title)}</h2><p>${esc(p.setting)} · ${esc(p.register)}</p></div>
          <div class="track-arrow">›</div>
        </button>`).join('')}
    </main>`;
  wireBrandHome();
  app.querySelectorAll('.track-card').forEach(b =>
    b.addEventListener('click', () => renderActionPiece(d, pieces[+b.dataset.i].id)));
}

// Honest state for an accent whose Dialect in Action pieces are written
// but not yet through dialect review — the card is never silently
// missing, and no other accent's material is shown in its place.
function renderDialectActionPending(d) {
  record(() => renderDialectActionPending(d));
  stopSpeech();
  const drafts = actionDrafts().filter(p => p.courseId === d).length;
  workspacePage(
    pageTopbar('🎭 Dialect in Action', trackFor(d).color),
    `<div class="ws-head">
       <h1 class="page-h">Dialect in Action</h1>
       <p class="ws-sub">${esc(dialectName(d))}</p>
     </div>`,
    `<p class="pane-note">${drafts} piece(s) for this accent are written and awaiting review by a qualified dialect reviewer. They appear here the moment a named reviewer approves them — and only this accent's material will ever appear on this page.</p>`);
}

function renderActionPiece(d, id) {
  record(() => renderActionPiece(d, id));
  const piece = actionFor(d).find(p => p.id === id);
  if (!piece) return renderDialectAction(d);
  app.innerHTML = `
    ${pageTopbar('🎭 ' + esc(piece.title), trackFor(d).color)}
    <main class="guide sonnet-view">
      ${actionPieceHtml(piece)}
      <p><button class="btn-lite" id="action-ipa" type="button" aria-expanded="false">≈ Show approximate IPA</button></p>
      <div id="action-ipa-pane" hidden></div>
    </main>`;
  wireBrandHome();
  wireActionPiece(app);
  // Line-by-line IPA through the EXISTING derivation system (the same one
  // the Studio uses) — dictionary-backed for Neutral American, rule-derived
  // and marked ≈ elsewhere. Honest or absent; never hand-invented here.
  const ipaBtn = document.getElementById('action-ipa');
  const ipaPane = document.getElementById('action-ipa-pane');
  ipaBtn.addEventListener('click', () => {
    const open = !ipaPane.hidden;
    ipaPane.hidden = open;
    ipaBtn.setAttribute('aria-expanded', String(!open));
    ipaBtn.textContent = open ? '≈ Show approximate IPA' : 'Hide IPA';
    if (!open && !ipaPane.dataset.filled) {
      ipaPane.dataset.filled = '1';
      const plain = piece.lines.map(l =>
        (l.speaker ? l.speaker + ': ' : '') + l.text.replace(/\[\[([^\]|]+)\|[A-Z]+-\d+\]\]/g, '$1'));
      fillSound(plain, d, ipaPane);
    }
  });
}

// ── Accent Bridge: the Listening practice exercise ────────────
// Rebuilt 2026-08-12 by owner order: a structured listening session,
// not an informational page. The learner picks the STARTING accent;
// the TARGET is the course they're on (the two can never be equal —
// the selector simply never offers it). Only human-reviewed routes are
// selectable, and a comparison becomes an audio question only when
// both exact approved clips exist — no synthesis, no substitution, no
// fallback. Draft routes stay inside #review. The app never diagnoses
// the learner's natural accent — the start is self-selected.

function renderBridgeSetup(target) {
  record(() => renderBridgeSetup(target));
  stopSpeech();
  const routes = playableRoutesInto(target, hasWordClip);
  if (!routes.length) return goSection('practice');   // no playable route — the card shouldn't exist
  const prefs = loadBridgePrefs();
  let from = routes.some(r => r.from === prefs.from) ? prefs.from : routes[0].from;

  app.innerHTML = `
    ${pageTopbar('🌉 Accent Bridge', '#64748b')}
    <main class="guide">
      <h1>Accent Bridge</h1>
      <p class="track-blurb">Hear the same words in your starting accent and in ${esc(dialectName(target))}, and learn to tell exactly what changes on the way. Routes appear here only after review by a qualified dialect reviewer, and every clip is an existing approved recording. You pick your own starting accent — nothing here guesses or diagnoses.</p>
      <div class="form-grid">
        <label class="field"><span class="field-label">My starting accent</span>
          <select class="input-sel" id="bridge-from">
            ${routes.map(r => `<option value="${esc(r.from)}" ${r.from === from ? 'selected' : ''}>${esc(dialectName(r.from))}</option>`).join('')}
          </select></label>
        <label class="field"><span class="field-label">Target accent</span>
          <span class="pane-note" id="bridge-target"><b>${esc(dialectName(target))}</b> — the course you’re learning. The two ends are always different accents.</span></label>
      </div>
      <p class="pane-note" id="bridge-note"></p>
      <p class="pane-note bridge-sources" id="bridge-src"></p>
      <div class="practice-row"><button class="btn btn-primary" id="bridge-start" type="button">Start listening</button></div>
    </main>`;
  wireBrandHome();

  const currentRoute = () => routes.find(r => r.from === from);
  const refresh = () => {
    const route = currentRoute();
    const n = playableComparisons(route, hasWordClip).length;
    document.getElementById('bridge-note').textContent =
      `${route.title} — ${n} comparison${n === 1 ? '' : 's'} ready to play. “Typically” is doing honest work here: these comparisons describe the course targets, not every voice you’ll meet.`;
    document.getElementById('bridge-src').textContent = route.sourceNote ?? '';
  };
  refresh();
  document.getElementById('bridge-from').addEventListener('change', e => {
    // Only offered routes can stick — an injected same-accent or draft
    // value snaps straight back.
    from = routes.some(r => r.from === e.target.value) ? e.target.value : from;
    e.target.value = from;
    refresh();
  });
  document.getElementById('bridge-start').addEventListener('click', () => {
    const route = currentRoute();
    if (!route || route.from === target) return;      // same-accent can never start
    saveBridgePrefs(route.from, target);
    startLesson(bridgeLesson(route));
  });
}

// A bridge session is a practice-arcade lesson with a FIXED queue: each
// playable comparison exactly once (5–8 when available), never padded
// or duplicated to reach a length.
function bridgeLesson(route) {
  const comps = playableComparisons(route, hasWordClip)
    .map(c => [Math.random(), c]).sort((a, b) => a[0] - b[0]).map(x => x[1])
    .slice(0, 8);
  return {
    practice: true,
    arcade: true,
    bridgeRoute: route,
    mode: { id: 'bridge', icon: '🌉', title: 'Accent Bridge' },
    accent: route.to,
    title: route.title,
    fixedQueue: comps.map(c => ({ type: 'bridge', comp: c, route })),
    remake: () => bridgeLesson(route),
  };
}

// One round: the word, two LABELLED clips (Starting / Target — both
// existing approved recordings), and the question "which is the target
// pronunciation?". After the answer, the approved written explanation:
// both IPAs, what changes, what stays, and the reviewed articulation
// guidance. Continue advances; nothing is ever requeued or duplicated.
function renderBridgeRound(s, ex) {
  const { comp, route } = ex;
  const choices = Math.random() < 0.5
    ? [{ ipa: comp.targetIPA, ok: true }, { ipa: comp.startIPA, ok: false }]
    : [{ ipa: comp.startIPA, ok: false }, { ipa: comp.targetIPA, ok: true }];
  lessonChrome(s, `
    <h1 class="prompt">Which is the ${esc(dialectName(route.to))} pronunciation of “${esc(comp.word)}”?</h1>
    <div class="display-card small"><span>${esc(comp.word)}</span></div>
    <p class="hint">${esc(comp.feature)} · ${esc(comp.lexicalSet)} set — listen to both, then choose.</p>
    <div class="bridge-plays">
      <button class="btn btn-lite" id="br-play-start" type="button"
        aria-label="Play the Starting Accent clip — ${esc(dialectName(route.from))}">▶ Starting Accent · ${esc(dialectName(route.from))}</button>
      <button class="btn btn-lite" id="br-play-target" type="button"
        aria-label="Play the Target Accent clip — ${esc(dialectName(route.to))}">▶ Target Accent · ${esc(dialectName(route.to))}</button>
    </div>
    <div class="choices" id="choices">
      ${choices.map((c, i) => `
        <button class="btn choice" data-i="${i}" type="button">
          <span class="choice-label">/${esc(c.ipa)}/</span>
        </button>`).join('')}
    </div>
    <div id="br-reveal"></div>`);
  const play = acc => speak(comp.word, { lang: ACCENT_LANG[acc] ?? 'en-GB', accent: acc });
  document.getElementById('br-play-start').addEventListener('click', () => play(route.from));
  document.getElementById('br-play-target').addEventListener('click', () => play(route.to));
  document.querySelectorAll('.choice').forEach(btn =>
    btn.addEventListener('click', () => {
      if (document.getElementById('br-reveal').childElementCount) return;
      const ok = !!choices[+btn.dataset.i].ok;
      document.querySelectorAll('.choice').forEach(b => (b.disabled = true));
      btn.classList.add(ok ? 'good' : 'bad');
      try {
        recordAttempt({ ex, ok, chose: choices[+btn.dataset.i].ipa,
          ms: s.shownAt ? Date.now() - s.shownAt : null, accent: route.to });
      } catch (err) { console.warn('analytics skipped', err); }
      if (!ok) s.mistakes++;
      const g = comp.guidance ?? {};
      document.getElementById('br-reveal').innerHTML = `
        <section class="br-reveal ${ok ? 'good' : 'bad'}" role="status" aria-label="Answer and explanation">
          <p class="br-verdict"><strong>${ok ? 'Correct!' : 'Not quite.'}</strong>
            Target (${esc(dialectName(route.to))}): <span class="ipa-chip is-target">/${esc(comp.targetIPA)}/</span> ·
            Starting (${esc(dialectName(route.from))}): <span class="ipa-chip">/${esc(comp.startIPA)}/</span></p>
          <p class="guide-note"><b>What changes:</b> ${esc(comp.changes)}</p>
          <p class="guide-note"><b>What stays:</b> ${esc(comp.stays)}</p>
          ${['lips', 'tongue', 'jaw', 'voice'].filter(k => g[k]).map(k =>
            `<p class="guide-note"><b>${k[0].toUpperCase() + k.slice(1)}:</b> ${esc(g[k])}</p>`).join('')}
          <button class="btn continue ${ok ? '' : 'btn-red'}" id="continue" type="button">Continue</button>
        </section>`;
      const cont = document.getElementById('continue');
      cont.addEventListener('click', () => { s.index++; renderExercise(s); });
      cont.focus();
    }));
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
      <p class="pane-note">Transcribed to IPA in <b>${esc(dialectName(accent))}</b>${approxSeen ? ' <span class="approx">≈ non-American dialects are rule-derived, not dictionary-exact</span>' : ''}.${miss ? ` <span class="approx">${miss} word${miss === 1 ? ' is' : 's are'} not in the dictionary (marked —) — names and invented words need your ear: tap one to supply its pronunciation.</span>` : ''}
        Tap any word to correct it.${edited ? ` <span class="approx">${edited} customised.</span>` : ''}</p>
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
  const alts = TEXT_DIALECTS.map(d => d.id)
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
    { key: 'vowels', title: 'Vowels', note: 'Single vowel sounds — short, long (ː), and the accent-specific variants.',
      items: syms.filter(([, p]) => p.type === 'vowel' && !p.weak && !p.allophone) },
    { key: 'diphthongs', title: 'Diphthongs', note: 'Vowels that glide from one position to another.',
      items: syms.filter(([, p]) => p.type === 'diphthong' && !p.weak && !p.allophone) },
    { key: 'consonants', title: 'Consonants', note: 'The consonant phonemes of English.',
      items: syms.filter(([, p]) => p.type === 'consonant' && !p.allophone) },
    { title: 'Weak vowels', note: 'The vowels of unstressed syllables, counted apart from the full vowel system.',
      items: syms.filter(([, p]) => p.weak && !p.allophone) },
    { title: 'Realizations', note: 'Ways a phoneme is actually spoken, written in [brackets] — never extra phonemes.',
      items: syms.filter(([, p]) => p.allophone) },
  ];

  const section = g => `
    <section class="chart-section">
      <h2 class="chart-h">${esc(g.title)} <span>${g.items.length}</span></h2>
      <p class="chart-note">${esc(g.note)}</p>
      ${(() => {
        // The section's overview chart, where the artwork pack has one.
        // Sections it does not cover (weak vowels, realizations) simply
        // go without rather than borrowing a chart that omits them.
        const c = chartFor(g.key);
        return c ? `<figure class="chart-overview">
          <img src="${esc(c.src)}" alt="${esc(c.title)} overview chart" decoding="async">
        </figure>` : '';
      })()}
      <div class="chart-grid">
        ${g.items.map(([sym, p]) => `
          <button class="chart-chip" data-sym="${esc(sym)}" title="How “${esc(sym)}” is made">
            <span class="chart-sym">${p.allophone ? `[${esc(sym)}]` : esc(sym)}</span>
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
// Ephemeral by design — nothing is saved; the Studio remains the place for
// keeping takes. One object URL lives at a time.
let tryItUrl = null;

function releaseTryIt() {
  if (tryItUrl) { URL.revokeObjectURL(tryItUrl); tryItUrl = null; }
}

// tryItHtml now lives in js/record-ui.js behind the capability boundary —
// it renders nothing while learner speaking is disabled. wireTryIt below
// is a no-op when no widget rendered.

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

// The visible inventory order for a context: exactly the sequence the
// course's IPA page (or the full Foundations chart) displays its chips in.
// Prev/Next on the sound pages follows THIS order and nothing else, so a
// symbol excluded from a course can never be reached from inside it.
function inventoryOrder(accent) {
  const syms = accent ? phonemesForAccent(accent) : Object.keys(PHONEMES);
  const info = s => PHONEMES[s] ?? {};
  return [
    ...syms.filter(s => info(s).type === 'vowel' && !info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).type === 'diphthong' && !info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).type === 'consonant' && !info(s).allophone),
    ...syms.filter(s => info(s).weak && !info(s).allophone),
    ...syms.filter(s => info(s).allophone),
  ];
}

// Articulation video: renders ONLY for an approved manifest entry — with
// none approved (the current state) the sound page shows nothing extra, an
// honest absence rather than a "coming soon" tease. Native controls plus
// loop and half-speed toggles; captions track required; inline playback.
function articulationVideoHtml(v, kindLabel) {
  if (!v) return '';
  const g = v.articulation ?? {};
  return `
    <figure class="artic-video" data-video-id="${esc(v.id)}">
      <figcaption class="field-label">${esc(kindLabel)}${v.word ? ` — “${esc(v.word)}”` : ''} · /${esc(v.symbol)}/</figcaption>
      <video controls playsinline preload="metadata" poster="${esc(v.poster)}" aria-label="${esc(kindLabel)} articulation video for ${esc(v.symbol)}">
        <source src="${esc(v.video)}">
        ${v.captions ? `<track kind="captions" src="${esc(v.captions)}" srclang="en" label="Captions" default>` : ''}
      </video>
      <div class="artic-video-tools">
        <button class="btn-lite" data-vid-loop type="button" aria-pressed="false">🔁 Loop</button>
        <button class="btn-lite" data-vid-slow type="button" aria-pressed="false">🐢 Half speed</button>
      </div>
      ${(g.lips || g.tongue || g.jaw || g.voice) ? `
      <dl class="anat-list artic-video-guide">
        ${g.lips ? `<div><dt>Lips</dt><dd>${esc(g.lips)}</dd></div>` : ''}
        ${g.tongue ? `<div><dt>Tongue</dt><dd>${esc(g.tongue)}</dd></div>` : ''}
        ${g.jaw ? `<div><dt>Jaw</dt><dd>${esc(g.jaw)}</dd></div>` : ''}
        ${g.voice ? `<div><dt>Voice</dt><dd>${esc(g.voice)}</dd></div>` : ''}
      </dl>` : ''}
    </figure>`;
}

function wireArticulationVideos(root) {
  root.querySelectorAll('.artic-video').forEach(fig => {
    const vid = fig.querySelector('video');
    fig.querySelector('[data-vid-loop]')?.addEventListener('click', e => {
      vid.loop = !vid.loop;
      e.currentTarget.setAttribute('aria-pressed', String(vid.loop));
    });
    fig.querySelector('[data-vid-slow]')?.addEventListener('click', e => {
      vid.playbackRate = vid.playbackRate === 0.5 ? 1 : 0.5;
      e.currentTarget.setAttribute('aria-pressed', String(vid.playbackRate === 0.5));
    });
  });
}

// Detail for one sound: articulation diagram, description, example words.
// `accent` is the dialect context the page was opened from — inside a course
// everything speaks that course's voices. Without one (the full Foundations
// chart) fall back to guessing from dialect-exclusive symbols.
// `focusHeading` is set by Prev/Next so keyboard and screen-reader users
// land on the new sound's name.
function renderSoundDetail(sym, accent, { focusHeading = false } = {}) {
  const p = PHONEMES[sym];
  if (!p) return renderChart();
  record(() => renderSoundDetail(sym, accent));
  // Realizations (like [ʔ] for /t/) wear square brackets everywhere.
  const wrapSym = s => (p.allophone ? `[${s}]` : `/${s}/`);
  const diagram = articulationSVG(sym);
  const lang = ACCENT_LANG[accent]
    ?? ACCENT_LANG[({ 'ɝ': 'nam', 'ɚ': 'nam', 'ɑ': 'nam', 'oʊ': 'nam' }[sym])]
    ?? (['ɐ', 'ɐː', 'ʉː', 'æɪ', 'ɑe', 'æɔ', 'əʉ', 'ɔ', 'oː', 'eː', 'oɪ'].includes(sym) ? 'en-AU' : 'en-GB');
  const acc = accent ?? ({ 'en-US': 'nam', 'en-GB': 'rp', 'en-AU': 'aus' })[lang];
  const isVowel = p.type !== 'consonant';
  // The big symbol plays the ISOLATED sound only when an ear-approved clip
  // exists. Until then it is an explicit word control — labelled as such,
  // never pretending a word is the phoneme.
  const slug = phonemeSlug(sym);
  const hasIso = hasPhonemeClip(slug, acc);
  const hasSyl = hasPhonemeClip(slug + '_syllable', acc);
  const chips = p.examples.map(w => wordChip(w, acc)).join('');

  // Prev/Next through the visible inventory for this context. No looping:
  // the controls simply disable at either end.
  const order = inventoryOrder(accent);
  const idx = order.indexOf(sym);
  const prevSym = idx > 0 ? order[idx - 1] : null;
  const nextSym = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  const navLabel = s => `${PHONEMES[s].allophone ? `[${s}]` : `/${s}/`} ${PHONEMES[s].name}`;
  const arrow = (s, dir) => `
    <button class="sound-step" data-step="${esc(s ?? '')}" type="button" ${s ? '' : 'disabled'}
      aria-label="${s ? `${dir === 'prev' ? 'Previous' : 'Next'} sound: ${esc(navLabel(s))}` : `No ${dir === 'prev' ? 'previous' : 'next'} sound`}"
      title="${s ? esc(navLabel(s)) : ''}">${dir === 'prev' ? '‹' : '›'}</button>`;

  app.innerHTML = `
    ${pageTopbar(wrapSym(esc(sym)), '#64748b')}
    <main class="guide sound-detail">
      <div class="sound-hero">
        <div class="sound-big-wrap">
          ${hasIso ? `
          <button class="sound-big" id="say-sym"
            aria-label="Hear the isolated sound ${esc(sym)}" title="Hear the sound">${wrapSym(esc(sym))}</button>
          <span class="sound-big-cap">🔊 Hear the sound</span>`
          : hasSyl ? `
          <button class="sound-big" id="say-syl-hero"
            aria-label="Hear ${esc(sym)} inside a syllable — a syllable demonstration, since this sound cannot be spoken alone" title="Hear it in a syllable">${wrapSym(esc(sym))}</button>
          <span class="sound-big-cap">🔊 In a syllable</span>`
          : `
          <div class="sound-big is-plain" aria-hidden="true">${wrapSym(esc(sym))}</div>`}
          ${hasIso && hasSyl ? `<button class="word-chip" id="say-syl" type="button"
            aria-label="Hear ${esc(sym)} inside a syllable — a syllable demonstration, not a fully isolated sound">🔊 Hear it in a syllable</button>` : ''}
        </div>
        <div class="sound-head">
          <h1 id="sound-title" tabindex="-1">${esc(p.name)}</h1>
          <p class="guide-text">${esc(p.hint)}.</p>
          <div class="sound-steps" aria-label="Neighbouring sounds">
            ${arrow(prevSym, 'prev')}${arrow(nextSym, 'next')}
          </div>
        </div>
      </div>
      ${(() => {
        // The picture of how this sound is made.
        //
        // A hand-drawn illustration REPLACES the generated diagram
        // outright wherever one exists. The generated one was only ever
        // a stand-in for artwork that had not been drawn yet, and
        // showing both would just be two answers to the same question.
        const art = artFor(sym);
        const g = articulationFor(sym);
        const picture = art
          ? `<figure class="artic-wrap artic-figure">
               <img class="artic-art" src="${esc(art)}"
                    alt="How the mouth makes ${esc(sym)}" decoding="async">
             </figure>`
          // No artwork yet: fall back to the generated diagram, with the
          // cues on leader lines when there is written guidance to hang.
          : (g ? `<div class="artic-wrap">${guideSVG(sym, g.cues)}</div>`
               : (diagram ? `<div class="artic-wrap">${diagram}
                   <p class="artic-cap">${isVowel ? 'Tongue position in the mouth' : 'Where the sound is made (side view)'}</p></div>` : ''));
        if (!g) return picture;
        return `
        <section class="sp-step guide-block" aria-label="How to make this sound">
          <h2 class="guide-heading">How to make it</h2>
          <p class="guide-text">${esc(g.summary)}</p>
          ${picture}
          <ol class="guide-steps">${g.steps.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
          ${g.contrast ? `<p class="pane-note"><b>Against /${esc(g.contrast.sym)}/:</b> ${esc(g.contrast.note)}</p>` : ''}
          ${g.watch ? `<p class="pane-note">⚠︎ ${esc(g.watch)}</p>` : ''}
          <p><span class="sp-badge">Prepared draft, awaiting review by a qualified voice professional</span></p>
        </section>`;
      })()}
      ${articulationVideoHtml(videoFor(acc, sym, 'isolated'), 'Isolated Sound')}
      ${articulationVideoHtml(videoFor(acc, sym, 'word'), 'Example Word')}
      <h2 class="guide-heading">Hear it in words</h2>
      <div class="chips">${chips}</div>
      ${tryItHtml(`Record yourself saying ${hasIso ? `the sound /${sym}/` : `“${p.examples.find(x => speakableWord(x, acc)) ?? p.examples[0]}”`}, then compare.`)}
      <nav class="sound-footnav" aria-label="Neighbouring sounds">
        ${prevSym ? `<button class="btn-lite sound-step-wide" data-step="${esc(prevSym)}" type="button"
          aria-label="Previous sound: ${esc(navLabel(prevSym))}">‹ Previous: ${esc(navLabel(prevSym))}</button>` : '<span></span>'}
        ${nextSym ? `<button class="btn-lite sound-step-wide" data-step="${esc(nextSym)}" type="button"
          aria-label="Next sound: ${esc(navLabel(nextSym))}">Next: ${esc(navLabel(nextSym))} ›</button>` : '<span></span>'}
      </nav>
    </main>`;

  wireBrandHome();
  wireArticulationVideos(app);
  // A phoneme request plays the phoneme or nothing — no word stand-in.
  document.getElementById('say-sym')?.addEventListener('click', () => playPhoneme(slug, acc));
  document.getElementById('say-syl')?.addEventListener('click', () => playPhoneme(slug + '_syllable', acc));
  document.getElementById('say-syl-hero')?.addEventListener('click', () => playPhoneme(slug + '_syllable', acc));
  wireTryIt(app, () => {
    if (hasIso) { playPhoneme(slug, acc); return; }
    const w = p.examples.find(x => speakableWord(x, acc));
    if (w) speak(w, { lang, accent: acc });
  });
  app.querySelectorAll('[data-say]').forEach(b =>
    b.addEventListener('click', () => speak(b.dataset.say, { lang, accent: acc })));

  // Prev/Next REPLACE this page in the back history: after /ɪ/ → /e/ → /æ/
  // the main Back button returns straight to the inventory. record() inside
  // the next render handles the audio/mic/try-it cleanup.
  app.querySelectorAll('[data-step]').forEach(b =>
    b.addEventListener('click', () => {
      if (!b.dataset.step) return;
      navStack.pop();
      renderSoundDetail(b.dataset.step, accent, { focusHeading: true });
    }));

  window.scrollTo(0, 0);
  if (focusHeading) document.getElementById('sound-title')?.focus();
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
    // A fixed queue (Accent Bridge) plays each entry exactly once —
    // never generated, padded or duplicated.
    queue: lesson.fixedQueue ? [...lesson.fixedQueue] : generateLesson(lesson),
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
  else if (ex.type === 'bridge') renderBridgeRound(s, ex);
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
          <button class="btn btn-primary" id="again">${s.lesson.bridgeRoute ? 'Replay' : arcade ? 'Play again' : 'Practice again'}</button>
          <button class="btn" id="home">${s.lesson.bridgeRoute ? 'Return to Practice' : 'Done'}</button>
        </div>
      </main>`;
    document.getElementById('again').addEventListener('click', () =>
      startLesson(s.lesson.remake ? s.lesson.remake()
        : arcade ? modeLesson(s.lesson.mode, s.lesson.accent) : practiceLesson(s.lesson.track)));
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
//
// A SAME-origin frame is not a clickjacking vector (an attacker cannot
// serve from this origin), so it is allowed — that is how the local test
// runner (tests/run-all.html) hosts the app. Cross-origin embedding gets
// the bust-or-refuse treatment, and crucially the app no longer half-boots
// into the gutted document afterwards.
const framedHostile = (() => {
  if (window.top === window.self) return false;
  try { return window.top.location.origin !== window.location.origin; }
  catch { return true; }          // cross-origin access throws → hostile
})();
if (framedHostile) {
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

if (!framedHostile) {
  // One-time: turn any old "Train Any Text" draft into a real project. The
  // original localStorage value is left untouched as a backup.
  migrateLegacyCustomText().catch(err => console.warn('migration skipped:', err));

  // Recorded-take object URLs are per-session; let them go on unload.
  window.addEventListener('pagehide', () => { try { teardownAV(); releaseTryIt(); } catch {} });

  // The notebook mounts OUTSIDE #app, once, so it survives every render.
  mountNotebook().catch(err => console.warn('notebook unavailable:', err));

  if (location.hash === '#audit') renderAudioAudit();        // owner ear-check tool
  else if (location.hash === '#review') renderContentReview(); // owner writing-review tool
  else gateThreshold();   // threshold for fresh users; grandfathers everyone else

  // Typing #audit/#review into the address bar mid-session works too — a
  // bare hash change doesn't reload the page, so the boot check alone
  // would miss it.
  window.addEventListener('hashchange', () => {
    if (location.hash === '#audit') renderAudioAudit();
    else if (location.hash === '#review') renderContentReview();
  });
}
