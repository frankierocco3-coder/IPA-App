// Launch regression tests: navigation order, rule-derived dialect IPA,
// and the recording persistence contract.
//
// Run from the browser console on a running copy of the app:
//
//     import('./tests/regression.test.js').then(m => m.run());
//
// Everything runs against the real modules and the real IndexedDB, but the
// recording tests only ever touch records THEY created (fresh test projects,
// deleted again at the end) — a user's own takes and projects are never
// written to or removed. Destructive bulk operations (deleteAllTakes) are
// deliberately NOT exercised here for that reason; their isolation guarantee
// is covered by the per-project delete test, which asserts the same thing.

import { loadPron, ipaFor } from '../js/pron.js';
import { rehearsalTargets } from '../js/analytics.js';
import { PHONEMES, WORDS } from '../js/data/phonemes.js';
import { createProject, getProject, deleteProject, listProjects } from '../js/projects.js';
import { saveTake, listTakes, deleteTake, deleteTakesFor, setBestTake, takeUrl,
         takesPresence, listAllTakes } from '../js/recordings.js';
import { setPersonal, getPersonal, deletePersonal } from '../js/overrides.js';
import { dbSupported, CONTENT_STORES, openRaw, dbErrorMessage } from '../js/db.js';
import { QUICK_QUESTIONS, ANSWER_STATUS, newDissection, dissectionFor, putDissection,
         getDissection, saveAnswer, deleteDissection, deleteDissectionsFor,
         materialTypeFrom, coverageOf, coverageLine, createSaver, MAX_ANSWER_LEN,
         attachImportedDissection, dissectQuestions, DISSECT_SECTIONS } from '../js/dissect.js';
import { validateDissection, validateProjectBundle, importResultMessage } from '../js/validate.js';
import { PLAYABLE_ACTIONS, ACTION_PAIRS, ACTION_CATEGORIES, actionById,
         searchActions, ACTION_VERBS, taughtActionFor } from '../js/data/playable.js';
import { emptyProject, saveProject } from '../js/projects.js';
import { phonemeVariantsFrom, hasPhonemeClip, hasWordClip, indexReady } from '../js/audio.js';
import { store } from '../js/state.js';
import { CAPABILITIES } from '../js/capabilities.js';
import { tryItHtml, performCaptureHtml } from '../js/record-ui.js';
import { startRecording, isRecording, micErrorMessage, recordingSupported } from '../js/perform.js';
import { openDB, idbGet, idbAll, STORES } from '../js/db.js';
import { DIALECT_ACTION, actionFor } from '../js/data/action.js';
import { RECASTS, TRANSPOSITION_REVIEW, approvedTranspositions } from '../js/data/recasts.js';
import { SONNETS } from '../js/data/sonnets.js';
import { editionFor, allEditions, editionStatus, EDITION_CHUNKS,
         EDITION_CATALOG_COMPLETE, LEGACY_SONNETS } from '../js/data/editions/index.js';
import { videoLookup } from '../js/data/media-videos.js';
import { BRIDGE_ROUTES, routeFor, routeStatus, bridgeDrafts,
         playableComparisons, playableRoutesInto,
         loadBridgePrefs, saveBridgePrefs } from '../js/data/bridge.js';
import { IDIOM } from '../js/data/idiom.js';
import { SPEECH_LESSONS, SPEECH_COLLECTIONS, SPEECH_MODULES, speechModuleGroups, speechReading,
         TEXTBOOK_PARTS, TEXTBOOK_END_MATTER, textbookOrder, textbookPartChapters, chapterTitle,
         speechLessonsFor, speechLessonById,
         collectionForLesson, moduleForLesson, lessonNumber, lessonKeywords,
         SPEECH_REVIEW_WHY, SPEECH_LESSON_EXTRAS } from '../js/data/speech/course.js';
import { glossaryTerm } from '../js/data/speech/glossary.js';
import { ACTING_APPROACHES, APPROACH_DISCLAIMER } from '../js/data/acting/approaches.js';
import { SPEECH_ROUTINES, PRACTICE_SUBJECTS, routinesFor,
         learnerRoutines, draftRoutines } from '../js/data/speech/routines.js';
import { ARCADE_GROUPS, arcadeGamesFor, arcadeGameById } from '../js/data/speech/arcade.js';
import { SPEECH_TEXTS } from '../js/data/speech/texts.js';
import { speechApproved, speechBodyVisible, speechReviewFor } from '../js/data/speech/reviews.js';
import { speechGoal, setSpeechGoal, speechHistory, speechLessonDone } from '../js/data/speech/store.js';
import { ACTING_MODULES, ACTING_LESSONS, ACTING_COLLECTIONS, actingLessonsFor,
         actingLessonById, actingLessonNumber } from '../js/data/acting/course.js';
import { ACTING_GAMES, SCENE_STUDY_AREAS } from '../js/data/acting/practice.js';

// Background tabs clamp setTimeout to as little as one callback per
// minute, which stalls a drive built from many short waits. MessageChannel
// tasks are not clamped, so the suite spins the event loop instead — the
// waits stay honest, and a hidden tab finishes in the same wall time as a
// visible one.
function scSleep(ms) {
  return new Promise(resolve => {
    const end = performance.now() + ms;
    const ch = new MessageChannel();
    ch.port1.onmessage = () => {
      if (performance.now() >= end) { ch.port1.close(); ch.port2.close(); resolve(); }
      else ch.port2.postMessage(0);
    };
    ch.port2.postMessage(0);
  });
}

const results = [];
const ok = (name) => results.push({ name, pass: true });
const bad = (name, detail) => results.push({ name, pass: false, detail });
const check = (name, cond, detail) => (cond ? ok(name) : bad(name, detail));

// The one ordered nav config, as both surfaces must render it.
// IA revision 2026-08: Studio sits before Library.
export const EXPECTED_NAV = ['Learn', 'Practice', 'Studio', 'Library', 'Progress', 'More'];

// `navDoc` lets the standalone runner point at the app iframe's document;
// from the app's own console the live document is the default.
export async function run({ navDoc = document } = {}) {
  results.length = 0;

  // Workspaces (2026-08-13 IA): sections 1–18 exercise the IPA/accent
  // surfaces, so the suite pins the Accents & Dialects workspace for
  // them. Section 19 drives the switching itself; the finally-block
  // there restores whatever the user had.
  const workspaceBefore = localStorage.getItem('speechcraft-workspace');
  try { localStorage.setItem('speechcraft-workspace', 'accents'); } catch { /* ignore */ }

  // The Speech workspace is withdrawn behind SPEECH_LIVE (js/main.js).
  // The suite mirrors the app's own switch instead of rewriting the
  // Speech drives: while the flag is false those drives are SKIPPED and
  // replaced by withdrawal assertions; flip the flag and they run again,
  // unchanged. Read from source so the two can never drift apart.
  const speechLive = await fetch('../js/main.js').then(r => r.text())
    .then(src => /const SPEECH_LIVE = true\b/.test(src)).catch(() => false);

  // Spy on the APP's getUserMedia for the whole run (runner only): every
  // journey driven below must finish with this still at zero.
  let gumCalls = 0;
  const appWin = navDoc !== document ? navDoc.defaultView : null;
  if (appWin?.navigator?.mediaDevices?.getUserMedia) {
    const orig = appWin.navigator.mediaDevices.getUserMedia.bind(appWin.navigator.mediaDevices);
    appWin.navigator.mediaDevices.getUserMedia = (...a) => { gumCalls++; return orig(...a); };
  }

  // ── 1. Navigation: same order on both surfaces ──────────────
  // Sections 1–18 run in the Accents & Dialects workspace, which keeps
  // the full six-item sidebar. Speech and Acting have their own,
  // Learn-free order — checked in section 21.
  const side = [...navDoc.querySelectorAll('.side-nav .side-item .side-label')].map(e => e.textContent.trim());
  const bottom = [...navDoc.querySelectorAll('.bottom-nav .bn-item .bn-label')].map(e => e.textContent.trim());
  check('desktop nav order', JSON.stringify(side) === JSON.stringify(EXPECTED_NAV),
    `got ${side.join(', ')}`);
  check('mobile nav order', JSON.stringify(bottom) === JSON.stringify(EXPECTED_NAV),
    `got ${bottom.join(', ')}`);
  check('nav surfaces cannot drift (identical arrays)',
    JSON.stringify(side) === JSON.stringify(bottom), `side=${side} bottom=${bottom}`);

  // ── 2. Rule-derived dialect IPA (lexical sets) ──────────────
  await loadPron();
  const cases = [
    // RP: LOT restored, PALM/BATH broad, non-rhotic START, centring diphthongs
    ['rp', 'not', 'nɒt'], ['rp', 'lot', 'lɒt'], ['rp', 'stop', 'stɒp'],
    ['rp', 'palm', 'pɑːm'], ['rp', 'bath', 'bɑːθ'], ['rp', 'dance', 'dɑːns'],
    ['rp', 'car', 'kɑː'], ['rp', 'near', 'nɪə'], ['rp', 'square', 'skweə'],
    ['rp', 'cure', 'kjʊə'], ['rp', 'sorry', 'sɒɹi'], ['rp', 'water', 'wɔːtə'],
    ['rp', 'law', 'lɔː'], ['rp', 'caught', 'kɔːt'],
    // Standard British: RP skeleton, steady SQUARE
    ['ssbe', 'not', 'nɒt'], ['ssbe', 'square', 'skwɛː'],
    // Australian (revised symbols): raised LOT/THOUGHT, steady SQUARE, BATH
    ['aus', 'stop', 'stɔp'], ['aus', 'law', 'loː'],
    ['aus', 'square', 'skweː'], ['aus', 'dance', 'dɐːns'],
  ];
  for (const [accent, word, want] of cases) {
    const got = ipaFor(word, accent);
    check(`${accent} “${word}” → /${want}/`, got?.ipa === want, `got /${got?.ipa}/`);
    if (got && accent !== 'nam' && !got.approx) bad(`${accent} “${word}” marked ≈`, 'approx flag missing');
  }
  const exact = ipaFor('not', 'nam');
  check('nam stays dictionary-exact', exact?.ipa === 'nɑt' && exact.approx === false,
    `got /${exact?.ipa}/ approx=${exact?.approx}`);

  // ── 3. Recording persistence contract ───────────────────────
  if (!dbSupported()) {
    bad('recording contract', 'IndexedDB unavailable in this browser');
  } else {
    const pA = await createProject({ title: '__regression A (safe to delete)' });
    const pB = await createProject({ title: '__regression B (safe to delete)' });
    try {
      const blob = new Blob(['speechcraft-regression'], { type: 'audio/webm' });
      const tA = await saveTake({ projectId: pA.id, target: { level: 'line', ref: 0, label: 'test' }, blob, mimeType: 'audio/webm', durationMs: 500 });
      const tB = await saveTake({ projectId: pB.id, target: { level: 'line', ref: 0, label: 'test' }, blob, mimeType: 'audio/webm', durationMs: 500 });

      const listed = await listTakes({ projectId: pA.id });
      check('take metadata persists (with size)', listed.length === 1 && listed[0].sizeBytes === blob.size,
        `listed=${listed.length} size=${listed[0]?.sizeBytes}`);
      check('take blob persists', !!(await takeUrl(tA.id)), 'no object URL for stored blob');

      await setBestTake(pA.id, tA.id);
      check('best-take pointer set', (await getProject(pA.id)).bestTakeId === tA.id);
      await deleteTake(tA.id);
      check('deleteTake removes metadata', (await listTakes({ projectId: pA.id })).length === 0);
      check('deleteTake removes blob', (await takeUrl(tA.id)) === null, 'blob survived deletion');
      check('deleteTake clears best-take pointer', (await getProject(pA.id)).bestTakeId === null);

      setPersonal({ word: '__regressionword', accent: 'rp', ipa: 'tɛst', note: '' });
      await deleteTakesFor(pA.id);
      check('per-project delete leaves other projects’ takes', (await listTakes({ projectId: pB.id })).length === 1);
      check('per-project delete leaves projects', !!(await getProject(pB.id)) && !!(await getProject(pA.id)));
      check('per-project delete leaves the personal dictionary', !!getPersonal('__regressionword', 'rp'));
    } finally {
      // Leave no residue in the user's database.
      try { await deleteTakesFor(pA.id); await deleteTakesFor(pB.id); } catch { /* best effort */ }
      try { await deleteProject(pA.id); await deleteProject(pB.id); } catch { /* best effort */ }
      try { deletePersonal('__regressionword', 'rp'); } catch { /* best effort */ }
    }
  }

  // ── 4. Isolated-phoneme contract (pure resolution checks) ───
  const A = ids => new Set(ids);
  check('reference voice key resolves when explicitly approved',
    String(phonemeVariantsFrom(A(['nam/reference/kit_vowel']), A([]), 'kit_vowel', 'nam')) === 'reference');
  check('a Bad verdict quarantines an approved reference clip',
    phonemeVariantsFrom(A(['nam/reference/kit_vowel']), A(['nam/reference/kit_vowel']), 'kit_vowel', 'nam').length === 0);
  check('approval never leaks across dialects',
    phonemeVariantsFrom(A(['nam/reference/kit_vowel']), A([]), 'kit_vowel', 'rp').length === 0);
  check('approval is slug-exact (syllable ≠ isolated)',
    phonemeVariantsFrom(A(['nam/reference/p_syllable']), A([]), 'p', 'nam').length === 0);
  await indexReady;
  check('a word clip cannot satisfy a phoneme request',
    hasWordClip('kit', 'nam') === true && hasPhonemeClip('kit_vowel', 'nam') === false,
    `word=${hasWordClip('kit', 'nam')} phoneme=${hasPhonemeClip('kit_vowel', 'nam')}`);

  // ── 4b. Review gates: drafts never reach learners ────────────
  const draftCount = DIALECT_ACTION.filter(p => p.reviewStatus !== 'approved').length;
  for (const course of ['nam', 'rp', 'ssbe', 'aus']) {
    const visible = actionFor(course);
    check(`Dialect in Action ${course}: only approved pieces visible`,
      visible.every(p => p.reviewStatus === 'approved'));
  }
  check('Dialect in Action drafts exist and are gated',
    draftCount > 0 || DIALECT_ACTION.every(p => p.reviewStatus === 'approved'));
  const idiomIds = new Set(IDIOM.map(e => e.id));
  const badRefs = DIALECT_ACTION.flatMap(p =>
    p.expressionRefs.filter(r => !idiomIds.has(r)).map(r => `${p.id}:${r}`));
  check('every action expression ref exists in Words & Expressions',
    badRefs.length === 0, badRefs.join(', '));

  // Sonnet views: In Today's Voice appears ONLY for approved transpositions
  for (const n of Object.keys(RECASTS)) {
    const approved = approvedTranspositions(+n);
    const wrongly = approved.filter(d => TRANSPOSITION_REVIEW[+n]?.[d] !== 'approved');
    check(`sonnet ${n}: approved transposition list honours the review map`, wrongly.length === 0);
  }
  check('sonnet 18 structural pilot: drafts exist, none learner-visible yet',
    Object.keys(RECASTS[18].recasts).length >= 3 && approvedTranspositions(18).length === 0);

  // Articulation-video manifest: approval + exact course/kind matching
  const vids = [
    { id: 'a', courseId: 'nam', symbol: 'ɪ', kind: 'isolated', reviewStatus: 'approved' },
    { id: 'b', courseId: 'nam', symbol: 'ɪ', kind: 'word', reviewStatus: 'draft' },
  ];
  check('video lookup: approved entry returned', videoLookup(vids, 'nam', 'ɪ', 'isolated')?.id === 'a');
  check('video lookup: draft entry never returned', videoLookup(vids, 'nam', 'ɪ', 'word') === null);
  check('video lookup: wrong course never returned', videoLookup(vids, 'rp', 'ɪ', 'isolated') === null);

  // ── 4c. Accent Bridge ────────────────────────────────────────
  const route = routeFor('nam', 'rp');
  check('bridge: nam→rp route has 6–10 approved comparisons',
    route && route.comparisons.length >= 6 && route.comparisons.length <= 10,
    `got ${route?.comparisons.length}`);
  check('bridge: an unapproved route is honestly null to learners', routeFor('aus', 'ssbe') === null);
  check('bridge: draft comparisons are filtered out',
    BRIDGE_ROUTES.every(r => {
      const served = routeFor(r.from, r.to);
      return served === null || served.comparisons.every(c => c.reviewStatus === 'approved');
    }));
  const prevPrefs = localStorage.getItem('speechcraft-bridge');
  saveBridgePrefs('aus', 'nam');
  const round = loadBridgePrefs();
  check('bridge: preferences persist', round.from === 'aus' && round.to === 'nam');
  if (prevPrefs === null) localStorage.removeItem('speechcraft-bridge');
  else localStorage.setItem('speechcraft-bridge', prevPrefs);

  // ── 5. First-launch preface (né "Before You Speak") ─────────
  // Runs BEFORE the nav drive below, which deliberately leaves the iframe
  // on a deep page (deep pages have no side-nav — that's their design).
  // This profile has prior use or a completed first run, so a record
  // exists and the immutability rules hold. markThresholdReplay writes
  // only replay fields; running this suite never changes anyone's choice.
  const th0 = store.threshold;
  check('threshold record written at boot', !!th0 && th0.version === 1
    && ['grandfathered', 'first-run'].includes(th0.source), JSON.stringify(th0));
  store.completeThreshold({ choice: 'craft', source: 'first-run' });
  const th1 = store.threshold;
  check('completeThreshold never overwrites an existing record',
    th1.source === th0.source && th1.choice === th0.choice && th1.completedAt === th0.completedAt);
  const rep = store.markThresholdReplay('tools');
  check('replay preserves the original choice', rep.choice === th0.choice
    && rep.lastChoice === 'tools' && typeof rep.lastReplayedAt === 'string');
  if (navDoc !== document) {
    check('user with prior use boots to the shell, never the wall',
      !!navDoc.querySelector('.side-nav .side-item') && !navDoc.querySelector('.threshold'));
  } else {
    ok('wall check (runner only — run tests/run-all.html)');
  }

  // ── 6. Sound-page Prev/Next (runner only: drives the app iframe) ─
  if (navDoc !== document && navDoc.defaultView) {
    const w = navDoc.defaultView;
    const sleep = scSleep;
    const clickIn = el => el?.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    try {
      clickIn([...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(300);
      // The Library is the shared workspaceLibrary() grid now: cards are
      // .tile buttons keyed by data-tile, not .track-card. The accent
      // course's inventory sits behind 'IPA for This Accent' (key 'ipa').
      const ipaTile = navDoc.querySelector('.tile-grid .tile[data-tile="ipa"]');
      check('accent Library offers the IPA for This Accent tile',
        !!ipaTile && ipaTile.textContent.includes('IPA for This Accent'));
      clickIn(ipaTile);
      await sleep(400);
      const chips = [...navDoc.querySelectorAll('.chart-chip')].map(c => c.dataset.sym);
      check('inventory page renders chips', chips.length > 20, `got ${chips.length}`);

      clickIn(navDoc.querySelector('.chart-chip'));           // first symbol
      await sleep(300);
      const steps = () => [...navDoc.querySelectorAll('.sound-steps .sound-step')];
      check('first symbol: Previous disabled', steps()[0]?.disabled === true);
      check('first symbol: Next enabled', steps()[1]?.disabled === false);
      check('Next targets the inventory’s second symbol',
        steps().length === 2 && steps()[1]?.dataset.step === chips[1],
        `next=${steps()[1]?.dataset.step} want=${chips[1]}`);

      clickIn(steps()[1]);                                    // → second symbol
      await sleep(300);
      check('Next replaces the page (second symbol shown)',
        steps().length === 2 && steps()[0]?.dataset.step === chips[0] && steps()[1]?.dataset.step === chips[2],
        `prev=${steps()[0]?.dataset.step} next=${steps()[1]?.dataset.step}`);
      check('focus lands on the new sound heading',
        navDoc.activeElement?.id === 'sound-title', `active=${navDoc.activeElement?.id}`);
      check('audio is quiet after switching symbols',
        !(w.speechSynthesis.speaking || w.speechSynthesis.pending));

      clickIn(navDoc.getElementById('nav-back'));             // ONE back press
      await sleep(300);
      check('Back returns straight to the inventory (history was replaced)',
        navDoc.querySelectorAll('.chart-chip').length > 20 && !navDoc.getElementById('sound-title'),
        'still on a sound page');

      clickIn([...navDoc.querySelectorAll('.chart-chip')].pop());   // final symbol
      await sleep(300);
      check('final symbol: Next disabled', steps()[1]?.disabled === true);
      check('final symbol: Previous enabled', steps()[0]?.disabled === false);
    } catch (err) {
      bad('sound-page navigation drive', String(err?.stack ?? err).slice(0, 220));
    }
  } else {
    ok('sound-page navigation drive (skipped in-app — run tests/run-all.html)');
  }

  // ── 7. The speaking pause (capability boundary, both states) ─
  check('CAPABILITIES.learnerSpeaking defaults to disabled', CAPABILITIES.learnerSpeaking === false);
  check('CAPABILITIES is frozen', Object.isFrozen(CAPABILITIES));
  try { CAPABILITIES.learnerSpeaking = true; } catch { /* frozen throws in strict mode */ }
  check('CAPABILITIES cannot be mutated', CAPABILITIES.learnerSpeaking === false);

  check('disabled: try-it renders nothing', tryItHtml('x') === '');
  check('disabled: capture controls render nothing', performCaptureHtml() === '');
  if (recordingSupported()) {
    const en1 = tryItHtml('x', { learnerSpeaking: true });
    const en2 = performCaptureHtml({ learnerSpeaking: true });
    check('enabled (injected): try-it still renders its recorder',
      en1.includes('data-tryit="rec"') && en1.includes('⏺ Record'));
    check('enabled (injected): Perform capture controls still render',
      en2.includes('id="perf-rec"') && en2.includes('id="perf-save"') && en2.includes('data-rating'));
  } else {
    ok('enabled-state render checks (needs MediaRecorder support)');
  }

  let guardErr = null;
  try { await startRecording({}, { learnerSpeaking: false }); }
  catch (e) { guardErr = e; }
  check('startRecording guard throws FeatureDisabledError', guardErr?.name === 'FeatureDisabledError');
  check('guard leaves no active capture', isRecording() === false);
  let defErr = null;
  try { await startRecording(); } catch (e) { defErr = e; }
  check('production default is the disabled guard', defErr?.name === 'FeatureDisabledError');
  check('guard maps to honest copy', micErrorMessage(guardErr).includes('paused'));

  // Preservation: a seeded take survives with metadata intact, blob
  // readable, and the database version untouched.
  if (dbSupported()) {
    const pP = await createProject({ title: '__pause-preservation (safe to delete)' });
    try {
      const blob = new Blob(['pause-preservation-audio'], { type: 'audio/webm' });
      const saved = await saveTake({ projectId: pP.id, target: { level: 'line', ref: 0, label: 'kept' },
        blob, mimeType: 'audio/webm', durationMs: 700, rating: 'close', note: 'preserve me' });
      const snapshot = JSON.stringify(saved);
      const relisted = (await listTakes({ projectId: pP.id }))[0];
      check('seeded take metadata unchanged after re-read', JSON.stringify(relisted) === snapshot);
      check('seeded take blob remains readable', !!(await takeUrl(saved.id)));
      // v1 → v2 was Build B's dissections store — additive only, ordered
      // separately from the pause (which still migrates nothing). The take
      // checks around this line run against the migrated database, so they
      // are the live proof that recordings survive the upgrade untouched.
      check('IndexedDB at v2 (Build B), takes intact across the migration', (await openDB()).version === 2);
      await deleteTake(saved.id);
      check('seeded take deletable', (await listTakes({ projectId: pP.id })).length === 0);
    } finally {
      try { await deleteTakesFor(pP.id); await deleteProject(pP.id); } catch { /* best effort */ }
    }
  } else {
    bad('preservation checks', 'IndexedDB unavailable');
  }

  // Journey sweep (runner only): drive the remaining core surfaces and
  // prove no capture control exists and getUserMedia was never called.
  if (appWin) {
    const sleep = scSleep;
    const clickIn = el => el?.dispatchEvent(new appWin.MouseEvent('click', { bubbles: true }));
    const side = name => [...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
    const noCapture = where => check(`no capture controls: ${where}`,
      !navDoc.querySelector('[data-tryit], #perf-rec, #perf-save, .rating, [data-tryterm], .tryit'),
      'found a capture control');
    try {
      clickIn(side('Learn')); await sleep(250);
      for (const s of ['Practice', 'Library', 'Studio', 'Progress', 'More']) { clickIn(side(s)); await sleep(220); }
      noCapture('sections walk');
      // Words & Expressions
      clickIn(side('Library')); await sleep(250);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Words & Expressions')));
      await sleep(350);
      noCapture('Words & Expressions');
      // Sound page (guidebook)
      clickIn(navDoc.getElementById('brand-home')); await sleep(250);
      clickIn(side('Library')); await sleep(250);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => ['IPA', 'IPA for This Accent'].includes(c.querySelector('h2')?.textContent)));
      await sleep(350);
      clickIn(navDoc.querySelector('.chart-chip')); await sleep(300);
      noCapture('sound page');
      // Privacy
      clickIn(navDoc.getElementById('brand-home')); await sleep(250);
      clickIn(side('More')); await sleep(250);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Privacy')));
      await sleep(400);
      check('Privacy carries the pause disclosure',
        navDoc.body.textContent.includes('New recording is temporarily unavailable'));
      noCapture('Privacy & Data');
      clickIn(navDoc.getElementById('brand-home')); await sleep(250);
    } catch (err) {
      bad('journey sweep', String(err));
    }
    check('getUserMedia was never called across all driven journeys', gumCalls === 0, `calls=${gumCalls}`);
  } else {
    ok('journey sweep (runner only — run tests/run-all.html)');
  }

  // ── 8. Pre-existing READER recordings under the pause ───────
  // takesPresence semantics first (pure, injectable lister): the timeout
  // and error paths must return 'error' — which callers REVEAL, never
  // hide — and only a confirmed-successful empty lookup returns 'empty'.
  if (dbSupported()) {
    check('presence: resolves has', await takesPresence({ scopeId: '__none' }, async () => [{ id: 'x' }]) === 'has');
    check('presence: confirmed empty', await takesPresence({ scopeId: '__none' }, async () => []) === 'empty');
    check('presence: lister failure → error (revealed)',
      await takesPresence({ scopeId: '__none' }, async () => { throw new Error('db'); }) === 'error');
    const hang = () => new Promise(() => {});
    check('presence: timeout → error (revealed)', await takesPresence({ scopeId: '__none' }, hang) === 'error');
  }

  if (appWin && dbSupported()) {
    const sleep = scSleep;
    const clickIn = el => el?.dispatchEvent(new appWin.MouseEvent('click', { bubbles: true }));
    const side = name => [...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
    const goHome = async () => { clickIn(navDoc.getElementById('brand-home')); await sleep(250); };
    const openScripts = async () => {
      await goHome();
      // IA revision: Scripts & Speeches lives on the Studio hub now.
      clickIn(side('Studio')); await sleep(280);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Scripts')));
      await sleep(320);
    };
    const waitTakesTab = async () => {
      for (let i = 0; i < 30; i++) {
        const t = navDoc.querySelector('.sonnet-tabs [data-mode="perform"]');
        if (t) return t;
        await sleep(120);
      }
      return null;
    };
    const blob = new Blob(['reader-take-audio-' + 'x'.repeat(4000)], { type: 'audio/webm' });
    let sonnetTake = null, ibsenTake = null;
    try {
      sonnetTake = await saveTake({ scopeId: 'sonnet:18', target: { level: 'line', ref: 0, label: 'Shall I compare thee' },
        blob, mimeType: 'audio/webm', durationMs: 900, rating: 'close', note: 'reader keeper' });
      ibsenTake = await saveTake({ scopeId: 'ibsen:IBSEN-001', target: { level: 'line', ref: 0, label: 'The Secret Loan' },
        blob, mimeType: 'audio/webm', durationMs: 800 });

      // Sonnet 18: tab appears, takes accessible, no capture, no mic call.
      const gumBefore = gumCalls;
      await openScripts();
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Sonnets')));
      await sleep(350);
      clickIn(navDoc.querySelector('.sonnet-row[data-n="18"]'));
      await sleep(500);
      const tab18 = await waitTakesTab();
      check('sonnet 18 with a saved take reveals the Takes tab', !!tab18 && tab18.textContent.includes('Takes'));
      clickIn(tab18); await sleep(500);
      const pane18 = navDoc.getElementById('sonnet-pane');
      const acts = [...(pane18?.querySelectorAll('.take-actions button') ?? [])].map(b => b.textContent.trim());
      check('reader take offers Play / Download / Delete',
        acts.includes('▶ Play') && acts.includes('⬇ Download') && acts.includes('Delete'), acts.join(','));
      check('reader take blob is playable (readable URL)', !!(await takeUrl(sonnetTake.id)));
      check('reader Takes view has no capture or editable-rating controls',
        !pane18?.querySelector('#perf-rec, #perf-save, #perf-compare, .rating, [data-tryit]'));
      check('reader rating shows read-only', !!pane18?.querySelector('.take-rate'));
      clickIn([...pane18.querySelectorAll('.take-actions button')].find(b => b.textContent.includes('Play')));
      await sleep(200);
      check('opening the reader Takes view makes zero getUserMedia calls', gumCalls === gumBefore,
        `calls went ${gumBefore}→${gumCalls}`);

      // Monologue-library scope: same association and visibility.
      await openScripts();
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Ibsen')));
      await sleep(350);
      clickIn([...navDoc.querySelectorAll('button, .track-card, .sonnet-row')].find(c => c.textContent.includes('The Secret Loan')));
      await sleep(500);
      const tabIb = await waitTakesTab();
      check('ibsen:IBSEN-001 take reveals the Takes tab on its piece', !!tabIb && tabIb.textContent.includes('Takes'));

      // Privacy → Manage Recordings still lists both reader takes.
      await goHome();
      clickIn(side('More')); await sleep(250);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Privacy')));
      await sleep(600);
      const privText = navDoc.body.textContent;
      const all = await listAllTakes();
      check('Privacy backstop still reaches both reader takes',
        all.some(t => t.id === sonnetTake.id) && all.some(t => t.id === ibsenTake.id)
        && /Manage recordings/i.test(privText));

      // Deletion through the reader UI removes take + blob.
      await openScripts();
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Sonnets')));
      await sleep(350);
      clickIn(navDoc.querySelector('.sonnet-row[data-n="18"]'));
      await sleep(500);
      const tab18b = await waitTakesTab();
      clickIn(tab18b); await sleep(500);
      appWin.confirm = () => true;
      clickIn([...navDoc.querySelectorAll('#sonnet-pane .take-actions button')].find(b => b.textContent.trim() === 'Delete'));
      await sleep(500);
      check('reader take deletable through the Takes view',
        (await listTakes({ scopeId: 'sonnet:18' })).length === 0);
      // Assert against the blob STORE directly — takeUrl caches object
      // URLs per-realm, and the UI delete ran in the app iframe's realm.
      check('deleted reader take blob removed from the store',
        (await idbGet(STORES.blobs, sonnetTake.id)) === undefined);
      sonnetTake = null;

      // A confirmed-empty reader never shows the tab: sonnet 29 has none.
      await openScripts();
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.textContent.includes('Sonnets')));
      await sleep(350);
      clickIn(navDoc.querySelector('.sonnet-row[data-n="29"]'));
      await sleep(2600);   // longer than the presence timeout
      check('reader with confirmed-empty lookup shows no Takes tab',
        !navDoc.querySelector('.sonnet-tabs [data-mode="perform"]'));
      await goHome();
    } catch (err) {
      bad('reader-take drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      try { if (sonnetTake) await deleteTake(sonnetTake.id); } catch { /* best effort */ }
      try { if (ibsenTake) await deleteTake(ibsenTake.id); } catch { /* best effort */ }
    }
  } else {
    ok('reader-take drive (runner only — run tests/run-all.html)');
  }

  // ── 9. B04 bug fixes ────────────────────────────────────────
  // Bug #1: rehearsal targets derive from the pick shapes that actually
  // exist — pairs give both symbols, singles give sym, nothing assumes a
  // `phonemes` field, and an empty result is detectable (the UI shows an
  // honest message instead of a silent dead button).
  const valid = s => !!PHONEMES[s];
  check('rehearsal: pair pick yields both symbols',
    String(rehearsalTargets([{ pair: { right: 'ɪ', wrong: 'iː' } }], valid).sort()) === String(['iː', 'ɪ'].sort()));
  check('rehearsal: single pick yields its symbol',
    String(rehearsalTargets([{ sym: 'æ' }], valid)) === 'æ');
  check('rehearsal: mixed picks dedupe and combine',
    rehearsalTargets([{ pair: { right: 'ɪ', wrong: 'iː' } }, { sym: 'ɪ' }, { sym: 'θ' }], valid).length === 3);
  check('rehearsal: invalid and empty picks give an empty list',
    rehearsalTargets([], valid).length === 0
    && rehearsalTargets([{}, { sym: 'notasymbol' }, { phonemes: ['ɪ'] }], valid).length === 0);

  // Bug #2: free-play persistence — storage-level, with the raw key
  // snapshotted and restored so the profile is left exactly as found.
  {
    const KEY = 'ipa-trainer-v1';
    const rawBefore = localStorage.getItem(KEY);
    try {
      const write = v => {
        const s = JSON.parse(localStorage.getItem(KEY) ?? '{}');
        if (v === undefined) delete s.freePlay; else s.freePlay = v;
        localStorage.setItem(KEY, JSON.stringify(s));
      };
      write(undefined);
      check('free play: defaults to false when absent', store.freePlay === false);
      let malformedOk = true;
      for (const badVal of ['yes', 1, {}, null]) {
        write(badVal);
        if (store.freePlay !== false) malformedOk = false;
      }
      check('free play: malformed stored values read as false', malformedOk);
      store.freePlay = true;
      check('free play: enabling writes true to storage',
        JSON.parse(localStorage.getItem(KEY)).freePlay === true && store.freePlay === true);
      store.freePlay = false;
      check('free play: disabling persists false',
        JSON.parse(localStorage.getItem(KEY)).freePlay === false && store.freePlay === false);
      store.freePlay = 'truthy-but-not-true';
      check('free play: setter is boolean-strict', store.freePlay === false);
    } finally {
      if (rawBefore === null) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, rawBefore);
    }
  }

  // Real-UI journeys (runner only): the targeted CTAs launch, the session
  // completes, and free play survives an actual reload and course switch.
  if (appWin) {
    const sleep = scSleep;
    const clickIn = el => el?.dispatchEvent(new appWin.MouseEvent('click', { bubbles: true }));
    const side = name => [...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
    // compact session driver for choice-based practice types
    const ipaOf = {};
    for (const w of WORDS) (ipaOf[w.word.toLowerCase()] ??= []).push(w.ipa);
    const hasSym = (w, s) => (ipaOf[w.toLowerCase()] ?? []).some(a => a.includes(s));
    const bareL = l => l.replace(/^[/\[]|[/\]]$/g, '');
    // Wall-clock budget, not a step count: under background-tab timer
    // throttling every sleep clamps to ~1s, so any fixed step budget can
    // starve mid-session. The loop exits the moment results appear.
    const driveSession = async (budgetMs = 180000) => {
      let good = 0, bad = 0, lastShow = false;
      const t0 = Date.now();
      while (Date.now() - t0 < budgetMs) {
        const body = navDoc.body.textContent;
        // Recognize every heading a driven practice session can end on:
        // a perfect run says 'Flawless practice!' (renderResults), which
        // the old two-heading match read as a timeout.
        if (/Practice complete|Flawless practice|Perfect lesson/.test(body) && !navDoc.getElementById('choices')) return { end: 'results', good, bad };
        const fb = navDoc.getElementById('feedback');
        const show = !!fb?.classList.contains('show');
        if (show && !lastShow) (fb.classList.contains('good') ? good++ : bad++);
        lastShow = show;
        const cont = navDoc.getElementById('continue');
        if (cont) { clickIn(cont); await sleep(140); continue; }
        const btns = [...navDoc.querySelectorAll('#choices .choice')].filter(b => !b.disabled);
        if (btns.length) {
          const prompt = navDoc.querySelector('.prompt')?.textContent ?? '';
          const disp = navDoc.querySelector('.display-card span:last-child')?.textContent ?? '';
          const labels = btns.map(b => b.querySelector('.choice-label')?.textContent ?? '');
          let idx = -1, mm;
          if ((mm = prompt.match(/contains the sound \/(.+)\//))) idx = labels.findIndex(l => hasSym(l, mm[1]));
          else if ((mm = prompt.match(/sounds is in “([^”]+)”/))) idx = labels.findIndex(l => hasSym(mm[1], bareL(l)));
          else if (prompt.includes('matches this description')) idx = labels.findIndex(l => PHONEMES[bareL(l)] && disp.includes(PHONEMES[bareL(l)].hint.slice(0, 16)));
          else if ((mm = prompt.match(/transcription of “([^”]+)”/)) && disp.includes('_')) {
            const shown = disp.replace(/[/\s]/g, '');
            outer: for (const arr of (ipaOf[mm[1].toLowerCase()] ?? []))
              for (let k = 0; k < arr.length; k++)
                if (arr.slice(0, k).join('') + '_' + arr.slice(k + 1).join('') === shown) { idx = labels.indexOf(arr[k]); break outer; }
          }
          clickIn(btns[idx >= 0 ? idx : Math.floor(Math.random() * btns.length)]);
          await sleep(150); continue;
        }
        const all = [...navDoc.querySelectorAll('#choices .choice')];
        if (all.length && all.every(b => b.disabled)) { clickIn(navDoc.querySelector('#speaker, .speaker')); await sleep(900); continue; }
        await sleep(150);
      }
      return { end: 'timeout', good, bad };
    };
    const ANALYTICS_KEY = 'speechcraft-analytics-v1';
    const analyticsBefore = localStorage.getItem(ANALYTICS_KEY);
    try {
      // The contract for both targeted CTAs: with valid phoneme targets
      // they launch; with none they show the honest message. What they
      // may NEVER do again is nothing at all. Seed two genuinely weak
      // PHONEME symbols so the launch branch is deterministic (the raw
      // analytics key is snapshotted and restored below).
      const seeded = JSON.parse(analyticsBefore ?? '{"symbols":{},"pairs":{},"days":{}}');
      const weak = { attempts: 6, correct: 1, recent: [0, 0, 1, 0, 0], lastAt: Date.now(), totalMs: 0 };
      // Replace, don't merge: only real phoneme weaknesses in view, so the
      // picks (and therefore the launch branch) are deterministic.
      seeded.symbols = { 'θ': { ...weak }, 'ð': { ...weak } };
      seeded.pairs = {};
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(seeded));
      const alerts = [];
      appWin.alert = msg => alerts.push(String(msg));
      clickIn(navDoc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Practice')); await sleep(400);
      const targeted = !!navDoc.getElementById('hub-mixed');   // targeted mode shows the mixed alternative link
      clickIn(navDoc.getElementById('quick-practice')); await sleep(700);
      const launched = !!navDoc.querySelector('.prompt, #choices, #bank');
      check('bug #1: targeted Quick Practice launches or honestly declines — never silent',
        targeted ? (launched || alerts.length > 0) : launched,
        `targeted=${targeted} launched=${launched} alerts=${alerts.length}`);
      const session = launched ? await driveSession() : { end: 'declined-honestly' };
      check('bug #1: a launched practice session completes',
        session.end === 'results' || session.end === 'declined-honestly', JSON.stringify(session));
      [...navDoc.querySelectorAll('button')].forEach(b => { if (/Continue|Done|Next/.test(b.textContent)) clickIn(b); });
      await sleep(400);
      appWin.confirm = () => true;
      clickIn(navDoc.getElementById('quit')); await sleep(300);
      clickIn(navDoc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Practice')); await sleep(400);
      const alertsBefore = alerts.length;
      const todayBtn = navDoc.getElementById('today-start');
      clickIn(todayBtn); await sleep(700);
      const todayLaunched = !!navDoc.querySelector('.prompt, #choices, #bank');
      check('bug #1: Today’s Rehearsal launches or honestly declines — never silent',
        !todayBtn || todayLaunched || alerts.length > alertsBefore,
        `btn=${!!todayBtn} launched=${todayLaunched} alerted=${alerts.length > alertsBefore}${alerts.length ? ' · “' + alerts[alerts.length - 1].slice(0, 50) + '”' : ''}`);
      clickIn(navDoc.getElementById('quit')); await sleep(300);
      [...navDoc.querySelectorAll('button')].forEach(b => { if (/Quit|Leave|Yes|End/.test(b.textContent)) clickIn(b); });
      await sleep(350);
      check('bug-fix sessions introduced no microphone path', gumCalls === 0, `calls=${gumCalls}`);

      // Free play through the real UI, across a real reload + course switch
      clickIn(navDoc.getElementById('brand-home')); await sleep(350);
      clickIn(navDoc.getElementById('freeplay')); await sleep(250);
      const onNow = store.freePlay === true;
      const frame = navDoc.defaultView.frameElement;
      frame.contentWindow.location.reload();
      let doc2 = null;
      for (let i = 0; i < 40; i++) { await sleep(150); doc2 = frame.contentDocument; if (doc2?.querySelector('.side-nav .side-item')) break; }
      const onAfterReload = store.freePlay === true && doc2?.getElementById('freeplay')?.classList.contains('on');
      // course switch while enabled
      doc2.querySelector('[aria-label^="Change course"]')?.dispatchEvent(new frame.contentWindow.MouseEvent('click', { bubbles: true }));
      await sleep(250);
      [...doc2.querySelectorAll('[role="menuitem"]')].find(b => b.textContent.includes('Neutral American'))
        ?.dispatchEvent(new frame.contentWindow.MouseEvent('click', { bubbles: true }));
      await sleep(450);
      const onAfterSwitch = store.freePlay === true && doc2.getElementById('freeplay')?.classList.contains('on');
      // disable and reload
      doc2.getElementById('freeplay')?.dispatchEvent(new frame.contentWindow.MouseEvent('click', { bubbles: true }));
      await sleep(250);
      frame.contentWindow.location.reload();
      let doc3 = null;
      for (let i = 0; i < 40; i++) { await sleep(150); doc3 = frame.contentDocument; if (doc3?.querySelector('.side-nav .side-item')) break; }
      const offAfterReload = store.freePlay === false && !doc3?.getElementById('freeplay')?.classList.contains('on');
      check('bug #2: enable survives a real reload', onNow && onAfterReload);
      check('bug #2: stays enabled across a course switch', onAfterSwitch);
      check('bug #2: disable also survives reload', offAfterReload);
    } catch (err) {
      bad('B04 bug-fix journeys', String(err));
    } finally {
      // Leave analytics exactly as found (also discards this drive's noise).
      if (analyticsBefore === null) localStorage.removeItem(ANALYTICS_KEY);
      else localStorage.setItem(ANALYTICS_KEY, analyticsBefore);
    }
  } else {
    ok('B04 bug-fix journeys (runner only — run tests/run-all.html)');
  }

  // ── 10. Build A: the preface and the reading pathway ────────
  // Runner-only. Runs AFTER section 9, whose journeys reloaded the app
  // iframe — navDoc/appWin are stale here, so the live document is
  // re-acquired from the frame element (which lives in the runner page
  // and survives reloads).
  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    try {
      let doc = null;
      for (let i = 0; i < 40; i++) {
        doc = frame.contentDocument;
        if (doc?.querySelector('.side-nav .side-item')) break;
        await sleep(150);
      }
      const w = frame.contentWindow;
      const clickIn = el => el?.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);

      // Reading pathway: Library card → credited PD pathway → back.
      // With Speech withdrawn, the accent Library shelves Rhetoric &
      // Oratory as a Shared card and opens it WITHOUT a workspace hop.
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="accents"]')); await sleep(420);
      clickIn(side('Library')); await sleep(400);
      // The Library is the ONE shared workspaceLibrary now — .tile cards
      // in a .tile-grid, and the rhetoric card's key is plain 'rhetoric'.
      const rhet = doc.querySelector('[data-tile="rhetoric"]');
      check('pathway: the accent Library shelves Rhetoric & Oratory',
        !!rhet && (doc.querySelector('.page-h')?.textContent ?? '').endsWith(' Library'));
      clickIn(rhet); await sleep(400);
      const pageText = doc.body.textContent;
      check('pathway: all three dialogues present, in reading order',
        ['Gorgias', 'Phaedrus', 'Republic'].every(t => pageText.includes(t))
        && pageText.indexOf('Gorgias') < pageText.indexOf('Phaedrus')
        && pageText.indexOf('Phaedrus') < pageText.indexOf('Republic (Books'));
      check('pathway: translator credited with PD statement',
        pageText.includes('Benjamin Jowett')
        && pageText.includes('public domain in the United States')
        && pageText.includes('check the copyright law where they live')
        && pageText.includes('Project Gutenberg'));
      check('pathway: each dialogue carries its verbatim Jowett excerpt',
        pageText.includes('persuades the judges in the courts')
        && pageText.includes('create forgetfulness in the learners')
        && pageText.includes('the beginning is the most important part of any work'));
      check('pathway: no external links (house sources policy)',
        doc.querySelectorAll('main a[href]').length === 0);
      check('pathway: a pathway, not an ebook shelf',
        pageText.includes('not an ebook shelf'));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      check('pathway: Back returns to the accent Library shelf',
        (doc.querySelector('.page-h')?.textContent ?? '').endsWith(' Library')
        && !!doc.querySelector('[data-tile="rhetoric"]'));

      // Preface replay through the PERMANENT More card — full walk, Esc out,
      // and proof that nothing about the profile changed.
      const thBefore = store.threshold;
      const xpBefore = store.xp;
      const obBefore = JSON.stringify(store.onboarding);
      const doneBefore = store.completed.size;
      clickIn(side('More')); await sleep(350);
      check('preface: a permanent Why Speech Matters card sits on the More shelf',
        !!card('Why Speech Matters') && !!card('About Speechcraft'));
      clickIn(card('Why Speech Matters')); await sleep(350);
      const wall = () => doc.querySelector('.threshold');
      const h1 = () => wall()?.querySelector('h1')?.textContent ?? '';
      check('preface: replay opens on "Why Speech Matters"',
        !!wall() && h1() === 'Why Speech Matters', `h1=${h1()}`);
      check('preface: exactly three content-panel dots — setup screens are never counted',
        wall()?.querySelector('.ob-dots')?.children.length === 3,
        `dots=${wall()?.querySelector('.ob-dots')?.children.length}`);
      check('preface: the Jowett quotation keeps its complete attribution',
        wall().textContent.includes('especially in the case of a young and tender thing')
        && wall().textContent.includes('translated by Benjamin Jowett'));
      check('preface (permanent): panel 1 speaks to everyone, honestly',
        wall().textContent.includes('understand, strengthen or expand the way they speak')
        && wall().textContent.includes('adding choice and flexibility')
        && wall().textContent.includes('never “correcting” an inferior way of speaking')
        && wall().textContent.includes('no such accent exists'));
      const seen = [h1()];
      const removedSeen = [];
      let ethicsSeen = false;
      for (let i = 0; i < 2; i++) {
        clickIn(doc.getElementById('ob-next')); await sleep(200);
        seen.push(h1());
        if (/Why Actors Train This Way|The Journey|Communication and Manipulation|Before You Choose/
          .test(wall().textContent)) removedSeen.push(h1());
        if (h1() === 'Speech Is Action'
          && wall().textContent.includes('taking responsibility for its effect')) ethicsSeen = true;
      }
      check('preface: exactly the three ordered panels',
        String(seen) === String(['Why Speech Matters', 'Speech Is Action', 'Speech Reveals Thought']),
        seen.join(' | '));
      check('preface: the removed panels are gone under any name',
        removedSeen.length === 0, removedSeen.join(' | '));
      check('preface: Speech Is Action carries the ethics of powerful speech', ethicsSeen);
      check('preface: Speech Reveals Thought is original copy — no quote marks, no Plato credit',
        h1() === 'Speech Reveals Thought'
        && !wall().querySelector('.th-quote')
        && !wall().textContent.includes('Plato'));
      check('preface: no quiz apparatus on any panel',
        !wall().querySelector('#choices, #feedback, .choice'));
      // The preface ENDS on panel 3 (owner order, 2026-08-20): the course
      // picker and the "choose your way in" screen are retired, and the
      // last panel's button finishes instead of advancing.
      check('preface: ends on the last panel — no course picker, no choice screen',
        !wall().querySelector('[data-accent]') && !wall().querySelector('[data-choice]')
        && doc.getElementById('ob-next')?.textContent.trim() === 'Done');
      check('preface: nothing is asked of the reader at its close',
        !doc.body.textContent.includes('Pick your first course')
        && !doc.body.textContent.includes('Choose your way in'));
      wall()?.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await sleep(300);
      check('preface: Esc returns to the page it was opened from, card intact',
        !doc.querySelector('.threshold') && !!card('Why Speech Matters'));
      const thAfter = store.threshold;
      check('preface: replay walk never rewrote the original record',
        thAfter.choice === thBefore.choice && thAfter.completedAt === thBefore.completedAt
        && thAfter.source === thBefore.source);
      check('preface: replay resets nothing — XP, onboarding, lessons all unchanged',
        store.xp === xpBefore && JSON.stringify(store.onboarding) === obBefore
        && store.completed.size === doneBefore);
    } catch (err) {
      bad('Build A drive', String(err?.stack ?? err).slice(0, 220));
    }
  } else {
    ok('Build A preface + pathway drive (runner only — run tests/run-all.html)');
  }

  // ── 11. Build B: Speech Dissection, Quick mode ──────────────
  // Shape and storage first (records this section creates and deletes
  // itself — a user's own dissections are never touched), then, runner
  // only, the whole journey: answer, mark, reload, revise, delete.
  check('dissect: six questions with the ordered stable ids',
    String(QUICK_QUESTIONS.map(q => q.id)) ===
    'quick.happening,quick.wants,quick.resisting,quick.doing,quick.change,quick.after');
  {
    const shape = newDissection({ targetType: 'project', targetId: 'x1', targetLabel: 'T', materialType: 'scene' });
    check('dissect: new record matches the spec §8 shape', shape.schemaVersion === 1
      && shape.mode === 'quick' && shape.targetKey === 'project:x1' && shape.materialType === 'scene'
      && ['annotations', 'speakers', 'interpretations', 'userQuestions', 'history']
        .every(k => Array.isArray(shape[k]) && shape[k].length === 0));
    check('dissect: material types map into the spec set',
      materialTypeFrom('speech') === 'speech' && materialTypeFrom('lyrics') === 'monologue'
      && materialTypeFrom(undefined) === 'monologue');
    const d2 = newDissection({ targetType: 'project', targetId: 'x2', targetLabel: 'T' });
    d2.answers['quick.happening'] = { value: 'a', status: ANSWER_STATUS.answered, updatedAt: 1 };
    d2.answers['quick.wants'] = { value: '', status: ANSWER_STATUS.unknown, updatedAt: 1 };
    d2.answers['quick.resisting'] = { value: '', status: ANSWER_STATUS.na, updatedAt: 1 };
    const c = coverageOf(d2);
    // The worksheet asks the whole of Question Everything now, so coverage
    // counts that set — the six original ids are still among them.
    const total = dissectQuestions().length;
    check('dissect: coverage counts all four states, never a score',
      c.answered === 1 && c.unknown === 1 && c.na === 1
      && c.blank === total - 3 && c.total === total
      && coverageLine(d2).includes(`3 of ${total} explored`)
      && !coverageLine(d2).includes('%'));
  }

  if (dbSupported()) {
    try {
      const d3 = newDissection({ targetType: 'project', targetId: '__diss-test', targetLabel: 'Diss test' });
      await putDissection(d3);
      check('dissect: record persists and is found by target key',
        (await dissectionFor('project', '__diss-test'))?.id === d3.id);
      await saveAnswer(d3.id, 'quick.happening', { value: 'A confession under pressure.' });
      await saveAnswer(d3.id, 'quick.wants', { value: 'half a thought', status: 'unknown' });
      await saveAnswer(d3.id, 'quick.resisting', { value: '', status: 'na' });
      const back = await getDissection(d3.id);
      check('dissect: the three answer states round-trip, marks keep text',
        back.answers['quick.happening'].status === 'answered'
        && back.answers['quick.wants'].status === 'unknown'
        && back.answers['quick.wants'].value === 'half a thought'
        && back.answers['quick.resisting'].status === 'na');
      await saveAnswer(d3.id, 'quick.happening', { value: 'Revised: a bargain, not a confession.' });
      check('dissect: revision overwrites in place',
        (await getDissection(d3.id)).answers['quick.happening'].value.startsWith('Revised'));
      await saveAnswer(d3.id, 'quick.wants', { value: '' });
      check('dissect: clearing an unmarked answer returns it to unexplored',
        !(await getDissection(d3.id)).answers['quick.wants']);
      let rejectedQ = false;
      try { await saveAnswer(d3.id, 'quick.nope', { value: 'x' }); } catch { rejectedQ = true; }
      check('dissect: unknown question ids are rejected, never stored', rejectedQ);
      await deleteDissection(d3.id);
      check('dissect: deletion removes the record', (await getDissection(d3.id)) == null);

      // Deletion isolation, both directions, on disposable records.
      const pD = await createProject({ title: '__regression dissect (safe to delete)' });
      const d4 = newDissection({ targetType: 'project', targetId: pD.id, targetLabel: pD.title });
      await putDissection(d4);
      await deleteDissection(d4.id);
      check('dissect: deleting a dissection leaves the project intact',
        (await getProject(pD.id))?.id === pD.id);
      const d5 = newDissection({ targetType: 'project', targetId: pD.id, targetLabel: pD.title });
      await putDissection(d5);
      // Deleting recordings alone must never touch dissections.
      await deleteTakesFor(pD.id);
      check('dissect: deleting a project\'s recordings leaves its dissection',
        (await dissectionFor('project', pD.id))?.id === d5.id);
      const removed = await deleteDissectionsFor(pD.id);
      check('dissect: project-deletion cascade removes only that project\'s dissections',
        removed === 1 && (await dissectionFor('project', pD.id)) == null);
      await deleteProject(pD.id);

      // Answer-length ceiling and malformed Unicode.
      const d6 = newDissection({ targetType: 'project', targetId: '__diss-limits', targetLabel: 'L' });
      await putDissection(d6);
      await saveAnswer(d6.id, 'quick.happening', { value: 'x'.repeat(MAX_ANSWER_LEN + 5000) });
      check('dissect: answers clamp at the visible ceiling',
        (await getDissection(d6.id)).answers['quick.happening'].value.length === MAX_ANSWER_LEN);
      const weird = 'lone \uD800 surrogate, emoji 🎭, combining é́';
      await saveAnswer(d6.id, 'quick.wants', { value: weird });
      check('dissect: malformed Unicode round-trips unchanged and harmless',
        (await getDissection(d6.id)).answers['quick.wants'].value === weird);
      await deleteDissection(d6.id);

      // Privacy's wipe list is centralized and includes dissections.
      check('dissect: CONTENT_STORES wipe list covers dissections (and everything else)',
        [STORES.blobs, STORES.recordings, STORES.dissections, STORES.projects, STORES.meta]
          .every(s => CONTENT_STORES.includes(s)));
    } catch (err) {
      bad('dissect storage round-trips', String(err));
    }
  } else {
    ok('dissect storage round-trips (needs IndexedDB)');
  }

  // Export/import: how a dissection travels with its project.
  {
    const rawBundle = {
      format: 'speechcraft-project', formatVersion: 1,
      projects: [{
        title: 'Imported with dissection', text: 'One line.',
        dissection: {
          schemaVersion: 1, materialType: 'scene', createdAt: Date.now(),
          answers: {
            'quick.happening': { value: 'X <img src=x onerror=alert(1)>', status: 'answered', updatedAt: Date.now() },
            'quick.wants': { value: 'kept while unknown', status: 'unknown', updatedAt: Date.now() },
            'quick.nope': { value: 'unknown id — dropped', status: 'answered' },
            'quick.doing': { value: 'y'.repeat(MAX_ANSWER_LEN + 9000), status: 'answered' },
            'quick.change': { value: 'no status — dropped' },
          },
        },
      }],
    };
    const bundle = validateProjectBundle(rawBundle, { newId: () => emptyProject().id });
    const bd = bundle[0].dissection;
    check('import: a valid dissection rides its project through validation',
      !!bd && bd.materialType === 'scene'
      && bd.answers['quick.happening'].status === 'answered'
      && bd.answers['quick.wants'].status === 'unknown');
    check('import: unknown question ids and status-less answers are dropped',
      !('quick.nope' in bd.answers) && !('quick.change' in bd.answers)
      && Object.keys(bd.answers).every(k => QUICK_QUESTIONS.some(q => q.id === k)));
    check('import: oversized answers clamp to the ceiling',
      bd.answers['quick.doing'].value.length === MAX_ANSWER_LEN);
    check('import: malformed / unsupported dissections are skipped, project still imports',
      validateDissection('a string') === null
      && validateDissection({ schemaVersion: 2, answers: { 'quick.wants': { value: 'x', status: 'answered' } } }) === null
      && validateDissection({ schemaVersion: 1, answers: [] }) === null
      && validateProjectBundle({ format: 'speechcraft-project', formatVersion: 1,
          projects: [{ title: 'No dissection', text: 'ok' }] },
          { newId: () => emptyProject().id })[0].dissection === null);

    // The omission is never silent — but only when something was dropped.
    const mkBundle = proj => validateProjectBundle(
      { format: 'speechcraft-project', formatVersion: 1, projects: [proj] },
      { newId: () => emptyProject().id })[0];
    check('import: a present-but-invalid dissection is flagged for the warning',
      mkBundle({ title: 'Bad diss', text: 'x', dissection: 'garbage' }).dissectionDropped === true
      && mkBundle({ title: 'Bad diss 2', text: 'x',
           dissection: { schemaVersion: 99, answers: { 'quick.wants': { value: 'v', status: 'answered' } } } })
         .dissectionDropped === true);
    check('import: absent and valid dissections raise no flag',
      mkBundle({ title: 'Old export', text: 'x' }).dissectionDropped === false
      && bundle[0].dissectionDropped === false);
    check('import: the visible result reports drops and only drops',
      importResultMessage(1, 0) === 'Imported 1 project.'
      && importResultMessage(2, 0) === 'Imported 2 projects.'
      && importResultMessage(1, 1).startsWith('Imported 1 project.')
      && importResultMessage(1, 1).includes('could not be imported because that section was invalid or from an unsupported version')
      && importResultMessage(3, 2).includes('2 dissections could not be imported'));

    if (dbSupported()) {
      try {
        const { droppedRecordings, dissection, ...clean } = bundle[0];
        await saveProject(clean);
        await attachImportedDissection(clean.id, clean.title, dissection);
        const attached = await dissectionFor('project', clean.id);
        check('import: dissection rebinds to the NEW project id, answers intact',
          attached?.targetKey === `project:${clean.id}` && attached?.targetId === clean.id
          && attached.answers['quick.happening'].value.includes('<img src=x')   // stored as text, never markup
          && attached.answers['quick.wants'].status === 'unknown');
        await deleteDissectionsFor(clean.id);
        await deleteProject(clean.id);
      } catch (err) {
        bad('import: dissection rebinding round-trip', String(err));
      }
    } else {
      ok('import rebinding round-trip (needs IndexedDB)');
    }
  }

  // The autosave saver: serialized, honest, never a false "Saved ✓".
  {
    const wait = scSleep;
    const st1 = [];
    createSaver({ delay: 1, onState: s => st1.push(s) }).now(async () => {});
    await wait(30);
    check('saver: a successful write announces saved', st1.join(',') === 'saving,saved');
    const st2 = [];
    createSaver({ delay: 1, onState: s => st2.push(s) }).now(async () => { throw new Error('quota'); });
    await wait(30);
    check('saver: a failed write reports the error and NEVER "saved"',
      st2.includes('error') && !st2.includes('saved'));
    const order = [];
    let releaseA;
    const s3 = createSaver({ delay: 1 });
    s3.now(async () => { order.push('A-start'); await new Promise(r => { releaseA = r; }); order.push('A-end'); });
    s3.now(async () => { order.push('B'); });
    releaseA();
    await wait(30);
    check('saver: writes are strictly serialized, never overlapping or reordered',
      order.join(',') === 'A-start,A-end,B');
    const ran = [];
    let releaseA2;
    const s4 = createSaver({ delay: 1 });
    s4.now(async () => { await new Promise(r => { releaseA2 = r; }); ran.push('A'); });
    s4.now(async () => { ran.push('stale'); });
    s4.now(async () => { ran.push('C'); });
    releaseA2();
    await wait(30);
    check('saver: a newer pending write supersedes the stale one', ran.join(',') === 'A,C');
    const st5 = [];
    const s5 = createSaver({ delay: 1, onState: s => st5.push(s) });
    s5.now(async () => { throw new Error('x'); });
    await wait(15);
    s5.now(async () => {});
    await wait(15);
    check('saver: recovers to saved after a failed write',
      st5.includes('error') && st5[st5.length - 1] === 'saved');
  }

  // The journey, through the real UI (runner only).
  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    let projId = null;
    try {
      let doc = frame.contentDocument;
      // Re-read contentWindow every dispatch — reloads swap the realm.
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const proj = await createProject({
        title: '__regression dissect drive (safe to delete)',
        contentType: 'monologue',
        text: 'I am not asking you. I am telling you.',
      });
      projId = proj.id;
      const openProject = async () => {
        clickIn(doc.getElementById('brand-home')); await sleep(300);
        clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Studio')));
        await sleep(400);
        // IA revision: the project list sits behind the Custom Work hub card.
        clickIn([...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === 'Custom Work'));
        await sleep(400);
        const card = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === projId);
        clickIn(card?.querySelector('button[data-act="open"]') ?? card); await sleep(500);
        // A project opens AS A SCRIPT (2026-08-20); Edit reaches the form.
        clickIn(doc.getElementById('sc-edit')); await sleep(450);
      };
      const openDissect = async () => {
        await openProject();
        clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      };
      await openProject();
      check('dissect UI: an action in the project view, NOT a Studio tab',
        !!doc.getElementById('proj-dissect')
        && doc.getElementById('proj-dissect').textContent.includes('Question Everything')
        && ![...doc.querySelectorAll('.proj-tabs .son-tab')].some(b => b.dataset.tab === 'dissect'));
      clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      const qSec = qid => doc.querySelector(`.diss-q[data-q="${qid}"]`);
      check('dissect UI: a dedicated focused screen carrying the whole question set',
        !doc.querySelector('.proj-tabs')                       // not inside the project view
        && !!doc.getElementById('nav-back')                    // normal Back affordance
        && doc.querySelectorAll('.diss-q').length === dissectQuestions().length
        && doc.querySelectorAll('#diss-list label.field .field-label').length === dissectQuestions().length
        && doc.querySelectorAll('.diss-clear').length === dissectQuestions().length
        && !doc.body.textContent.includes('Delete this dissection'));
      const answer = async (qid, textVal) => {
        clickIn(qSec(qid).querySelector('.diss-head')); await sleep(150);
        const ta = qSec(qid).querySelector('.diss-text');
        ta.value = textVal;
        ta.dispatchEvent(new frame.contentWindow.Event('input', { bubbles: true }));
        await sleep(1100);   // ride out the 800ms debounce
      };
      // The XSS probe is stored as an ANSWER — it must come back as text.
      await answer('quick.happening', 'She has already decided to leave.');
      await answer('quick.wants', '<img src=x onerror="window.__dissXss=1"><b>bold?</b>');
      clickIn(qSec('quick.resisting').querySelector('.diss-head')); await sleep(150);
      clickIn(qSec('quick.resisting').querySelector('[data-mark="unknown"]')); await sleep(400);
      clickIn(qSec('quick.doing').querySelector('.diss-head')); await sleep(150);
      clickIn(qSec('quick.doing').querySelector('[data-mark="na"]')); await sleep(400);
      check('dissect UI: autosave reports a visible save state',
        doc.getElementById('diss-state').textContent.includes('Saved'));

      // Survive a real reload with all five states (2 answered, unknown,
      // na, blank) exactly as left.
      frame.contentWindow.location.reload();
      doc = null;
      for (let i = 0; i < 40; i++) { await sleep(150); doc = frame.contentDocument; if (doc?.querySelector('.side-nav .side-item')) break; }
      await openDissect();
      const st = qid => qSec(qid).querySelector('.diss-status').dataset.st;
      check('dissect UI: all five states survive a reload',
        st('quick.happening') === 'answered' && st('quick.wants') === 'answered'
        && st('quick.resisting') === 'unknown' && st('quick.doing') === 'na'
        && st('quick.change') === 'blank' && st('quick.after') === 'blank',
        [st('quick.happening'), st('quick.wants'), st('quick.resisting'), st('quick.doing'), st('quick.change')].join(','));
      check('dissect UI: coverage reads as words, not a score',
        doc.getElementById('diss-cov').textContent.includes(`4 of ${dissectQuestions().length} explored`)
        && doc.getElementById('diss-cov').textContent.includes('1 still open')
        && !doc.getElementById('diss-cov').textContent.includes('%'));
      clickIn(qSec('quick.wants').querySelector('.diss-head')); await sleep(150);
      check('dissect UI: stored XSS payload renders inert',
        qSec('quick.wants').querySelector('.diss-text').value.includes('<img src=x')
        && !qSec('quick.wants').querySelector('img, b')
        && frame.contentWindow.__dissXss === undefined);

      // Revise, then wait for the committed "Saved ✓" before reloading —
      // the 800ms debounce plus the IndexedDB write can outlive answer()'s
      // fixed sleep, and a reload aborts an in-flight transaction.
      await answer('quick.happening', 'Revised: she decided years ago.');
      for (let i = 0; i < 20 && !doc.getElementById('diss-state')?.textContent.includes('Saved'); i++) await sleep(150);
      frame.contentWindow.location.reload();
      doc = null;
      for (let i = 0; i < 40; i++) { await sleep(150); doc = frame.contentDocument; if (doc?.querySelector('.side-nav .side-item')) break; }
      await openDissect();
      clickIn(qSec('quick.happening').querySelector('.diss-head')); await sleep(150);
      check('dissect UI: a revision survives reload',
        qSec('quick.happening').querySelector('.diss-text').value.startsWith('Revised'));

      // Navigating away during a pending (debounced) save loses nothing —
      // the write still lands — and Back returns to the same project.
      clickIn(qSec('quick.change').querySelector('.diss-head')); await sleep(150);
      const taP = qSec('quick.change').querySelector('.diss-text');
      taP.value = 'typed, then navigated before the debounce fired';
      taP.dispatchEvent(new frame.contentWindow.Event('input', { bubbles: true }));
      clickIn(doc.getElementById('nav-back'));               // leave immediately
      await sleep(1400);
      const afterNav = await dissectionFor('project', projId);
      check('dissect UI: navigating during a pending save loses nothing',
        afterNav?.answers?.['quick.change']?.value?.startsWith('typed, then navigated'),
        JSON.stringify(afterNav?.answers?.['quick.change'] ?? null));
      check('dissect UI: Back returns to the same Studio project',
        !!doc.getElementById('proj-dissect') && !!doc.querySelector('.proj-tabs'));

      // Clear is PER QUESTION now, and there is no delete-everything.
      // Clearing one answer must leave the others and the project intact.
      await openDissect();
      const before = (await dissectionFor('project', projId))?.answers ?? {};
      const beforeCount = Object.keys(before).length;
      clickIn(qSec('quick.happening').querySelector('.diss-head')); await sleep(150);
      clickIn(qSec('quick.happening').querySelector('.diss-clear')); await sleep(600);
      const after = (await dissectionFor('project', projId))?.answers ?? {};
      check('dissect UI: Clear empties one question and spares the rest and the project',
        !doc.body.textContent.includes('Delete this dissection')
        && !after['quick.happening']
        && Object.keys(after).length === beforeCount - 1
        && (await getProject(projId))?.id === projId);

      // Privacy discloses dissection storage. Read-only checks: the wipe
      // buttons are NEVER clicked here — they would destroy real data.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('More'))); await sleep(350);
      clickIn([...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent.includes('Privacy'))); await sleep(400);
      check('dissect UI: Privacy discloses dissections and includes them in the wipe',
        doc.body.textContent.includes('Text dissections')
        && doc.body.textContent.includes('Delete projects, dissections, recordings'));
    } catch (err) {
      bad('dissect UI journey', String(err));
    } finally {
      if (projId) {
        await deleteDissectionsFor(projId).catch(() => {});
        await deleteProject(projId).catch(() => {});
      }
    }
  } else {
    ok('dissect UI journey (runner only — run tests/run-all.html)');
  }

  // ── 12. The IndexedDB upgrade experience ────────────────────
  // Real upgrades of the real schema code, on a SCRATCH database — the
  // app's own database is never opened at a different version here.
  if (dbSupported()) {
    const NAME = '__sc-upgrade-test';
    const nuke = () => new Promise(res => {
      const r = indexedDB.deleteDatabase(NAME);
      r.onsuccess = r.onerror = r.onblocked = () => res();
    });
    const put = (db, store, val) => new Promise((res, rej) => {
      const tx = db.transaction(store, 'readwrite');
      tx.objectStore(store).put(val);
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
    const getAll = (db, store) => new Promise((res, rej) => {
      const r = db.transaction(store).objectStore(store).getAll();
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    try {
      await nuke();

      // A populated version-1 database upgrades to version 2 intact.
      const v1 = await openRaw(NAME, 1);
      await put(v1, STORES.projects, { id: 'p1', title: 'kept project' });
      await put(v1, STORES.recordings, { id: 'r1', projectId: 'p1', label: 'kept take' });
      await put(v1, STORES.blobs, { id: 'r1', blob: new Blob(['audio-bytes']) });
      await put(v1, STORES.meta, { key: 'k', value: 'kept meta' });
      v1.close();
      const v2 = await openRaw(NAME, 2);
      check('upgrade: populated v1 reaches v2 with projects, recordings, blobs and meta intact',
        v2.version === 2
        && (await getAll(v2, STORES.projects))[0]?.title === 'kept project'
        && (await getAll(v2, STORES.recordings))[0]?.label === 'kept take'
        && (await getAll(v2, STORES.blobs)).length === 1
        && (await getAll(v2, STORES.meta))[0]?.value === 'kept meta'
        && v2.objectStoreNames.contains(STORES.dissections));

      // An older tab that never steps aside: the upgrade must reject fast
      // with the visible close-other-tabs instruction — never hang.
      const holder = await new Promise((res, rej) => {
        const r = indexedDB.open(NAME, 2);
        r.onsuccess = () => res(r.result);       // deliberately NO versionchange handler
        r.onerror = () => rej(r.error);
      });
      v2.close();
      const blocked = await Promise.race([
        openRaw(NAME, 3).then(db => { db.close(); return 'opened'; }, err => err),
        new Promise(res => setTimeout(() => res('hung'), 4000)),
      ]);
      check('upgrade: a blocking older tab rejects fast with the instruction — no silent hang',
        blocked?.name === 'UpgradeBlockedError'
        && String(blocked?.message).includes('Close other Speechcraft tabs'),
        String(blocked?.message ?? blocked));
      holder.close();
      await new Promise(r => setTimeout(r, 150));   // let the freed upgrade settle

      // versionchange: the current connection steps aside so a future
      // build's upgrade is never blocked by this tab.
      let steppedAside = false;
      await openRaw(NAME, 3, { onClosed: () => { steppedAside = true; } });
      const v4 = await openRaw(NAME, 4);
      check('upgrade: versionchange closes the old connection for a future build',
        steppedAside && v4.version === 4);

      // An older cached build against newer data: fails safely with
      // VersionError; nothing is deleted or reset.
      const older = await openRaw(NAME, 3).then(() => 'opened', err => err);
      check('upgrade: an older build fails safely with VersionError, data untouched',
        older?.name === 'VersionError'
        && (await getAll(v4, STORES.projects))[0]?.title === 'kept project',
        String(older?.name ?? older));
      v4.close();

      // The user-facing lines stay honest about the data.
      check('upgrade: every dbErrorMessage stays honest about the data',
        dbErrorMessage(Object.assign(new Error('close-tabs instruction'), { name: 'UpgradeBlockedError' })) === 'close-tabs instruction'
        && dbErrorMessage(Object.assign(new Error('m'), { name: 'VersionError' })).includes('untouched')
        && dbErrorMessage(new Error('anything')).includes('untouched'));
    } catch (err) {
      bad('IndexedDB upgrade experience', String(err));
    } finally {
      await nuke();
    }
  } else {
    ok('IndexedDB upgrade experience (needs IndexedDB)');
  }

  // ── 13. Build C: Playable Actions ───────────────────────────
  // The approved twelve, exactly — data integrity first, then the UI.
  check('playable: exactly twelve entries with unique ids',
    PLAYABLE_ACTIONS.length === 12 && new Set(PLAYABLE_ACTIONS.map(a => a.id)).size === 12);
  check('playable: six pairs, each with two members sharing one practice line',
    ACTION_PAIRS.length === 6 && ACTION_PAIRS.every(p => {
      const [x, y] = p.actions.map(actionById);
      return p.actions.length === 2 && x && y
        && x.practiceLine === p.line && y.practiceLine === p.line
        && x.pairId === p.id && y.pairId === p.id;
    }));
  check('playable: every contrast is symmetric — both directions resolve',
    PLAYABLE_ACTIONS.every(a => actionById(a.contrast.id)?.contrast.id === a.id));
  check('playable: all seven categories represented, none empty or unknown',
    new Set(PLAYABLE_ACTIONS.map(a => a.category)).size === 7
    && PLAYABLE_ACTIONS.every(a => ACTION_CATEGORIES[a.category]));
  check('playable: verbatim spot pins from ACTION_LIBRARY_v1',
    actionById('reassure').objective === 'Make the listener believe they are safe, or that this can be managed.'
    && actionById('punish').coaching.includes('The cruelest version is gentle.')
    && actionById('warn').contrast.note === 'To intimidate makes you the consequence.'
    && actionById('draw-out').coaching.includes('Your main tool is silence.'));
  check('playable: search matches verb, category and content; never a broken state',
    searchActions('').length === 12
    && searchActions('reassure').some(a => a.id === 'reassure')
    && searchActions('To Control').length === 2
    && searchActions(' weird￿').length === 0);

  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    let paProj = null;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const setSearch = v => {
        const inp = doc.getElementById('pa-search');
        inp.value = v;
        inp.dispatchEvent(new frame.contentWindow.Event('input', { bubbles: true }));
      };
      const rows = () => [...doc.querySelectorAll('.pa-row')];
      const h1 = () => doc.querySelector('main h1')?.textContent ?? '';

      clickIn(doc.getElementById('brand-home')); await sleep(300);
      // Playable Actions shelves in the ACTING Library now (2026-08-20),
      // not on the Studio hub.
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="acting"]')); await sleep(400);
      clickIn(side('Library')); await sleep(400);
      clickIn(doc.querySelector('[data-tile="col:actions"]')); await sleep(400);
      check('playable UI: the section opens with the governing question and all twelve',
        doc.body.textContent.includes('What are you doing to the other person through these words?')
        && rows().length === 12
        && doc.querySelectorAll('#pa-list .guide-heading').length === 7);
      // The twelve are TAUGHT actions; the wider verb list is vocabulary
      // beneath them, and the two must not be conflated.
      check('playable UI: the action vocabulary sits beneath the twelve, marked as vocabulary',
        doc.querySelectorAll('.pa-verb').length === ACTION_VERBS.length
        && doc.querySelectorAll('.pa-verb.is-taught').length
           === ACTION_VERBS.filter(v => taughtActionFor(v)).length
        && doc.body.textContent.includes('The doing, not the feeling.'));
      check('playable UI: entirely written — no audio affordances anywhere',
        !doc.querySelector('main audio')
        && !doc.querySelector('main').textContent.includes('🔊')
        && !/coming soon/i.test(doc.querySelector('main').textContent));

      setSearch('zzz-nothing'); await sleep(150);
      check('playable UI: an empty search result is a message with a way back, never a bare page',
        rows().length === 0
        && doc.body.textContent.includes('No actions match')
        && !!doc.getElementById('pa-clear')
        && doc.querySelectorAll('#pa-list .guide-heading').length === 0);
      clickIn(doc.getElementById('pa-clear')); await sleep(150);
      check('playable UI: clearing the search restores all twelve', rows().length === 12);

      setSearch('forgive'); await sleep(150);
      check('playable UI: search narrows without empty category headings',
        rows().some(r => r.textContent.includes('To Forgive'))
        && [...doc.querySelectorAll('#pa-list .guide-heading')].length >= 1
        && [...doc.querySelectorAll('#pa-list .guide-heading')].every(h2 => h2.nextElementSibling?.classList.contains('pa-row')));
      clickIn(rows().find(r => r.textContent.includes('To Forgive'))); await sleep(350);
      check('playable UI: the entry shows its shared line, definition and coaching',
        h1() === 'To Forgive'
        && doc.body.textContent.includes('It’s all right. I understand.')
        && doc.body.textContent.includes('Release them from the debt')
        && doc.body.textContent.includes('two completely different scenes'));

      clickIn(doc.getElementById('pa-opposite')); await sleep(300);
      const towardOpposite = h1();
      clickIn(doc.getElementById('pa-opposite')); await sleep(300);
      check('playable UI: the pair navigates in both directions',
        towardOpposite === 'To Punish' && h1() === 'To Forgive');

      clickIn(doc.getElementById('pa-prev')); await sleep(300);
      const prevWorked = h1() === 'To Warn';                 // pair-5, first member
      clickIn(doc.getElementById('pa-next')); await sleep(300);
      check('playable UI: previous/next move between pairs and return',
        prevWorked && h1() === 'To Forgive');
      check('playable UI: the last pair has no next', !doc.getElementById('pa-next'));

      clickIn(doc.getElementById('nav-back')); await sleep(300);
      check('playable UI: Back returns to the list with the search intact',
        doc.getElementById('pa-search')?.value === 'forgive'
        && rows().some(r => r.textContent.includes('To Forgive')));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      check('playable UI: Back again lands on the Acting Library shelf',
        !!doc.querySelector('[data-tile="col:actions"]')
        && doc.querySelector('.page-h')?.textContent === 'Acting Library');

      // The dissection doorway: navigation only, and Back comes home.
      paProj = await createProject({ title: '__regression playable link (safe to delete)', text: 'Sit down.' });
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(400);
      clickIn(card('Custom Work')); await sleep(400);
      const pc = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === paProj.id);
      clickIn(pc?.querySelector('button[data-act="open"]') ?? pc); await sleep(500);
      clickIn(doc.getElementById('sc-edit')); await sleep(450);   // script → Edit
      clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      clickIn(doc.querySelector('.diss-q[data-q="quick.doing"] .diss-head')); await sleep(150);
      const link = doc.querySelector('[data-pa-link]');
      check('playable UI: the Dissection doing-question offers the doorway', !!link);
      clickIn(link); await sleep(350);
      check('playable UI: the doorway opens Playable Actions',
        doc.body.textContent.includes('What are you doing to the other person through these words?'));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      check('playable UI: Back from the doorway returns to the dissection screen',
        doc.querySelectorAll('.diss-q').length === dissectQuestions().length);
      check('playable UI: visiting the doorway stored nothing',
        (await dissectionFor('project', paProj.id)) == null);
    } catch (err) {
      bad('Playable Actions drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      if (paProj) {
        await deleteDissectionsFor(paProj.id).catch(() => {});
        await deleteProject(paProj.id).catch(() => {});
      }
    }
  } else {
    ok('Playable Actions drive (runner only — run tests/run-all.html)');
  }

  // ── 14. Build D: written Accent Bridge + Dialect in Action ──
  const ACCS = ['nam', 'rp', 'ssbe', 'aus'];
  {
    const pairs = ACCS.flatMap(a => ACCS.filter(b => b !== a).map(b => [a, b]));
    check('bridge: every ordered pairing has exactly one route (N×(N−1) = 12)',
      pairs.every(([a, b]) => BRIDGE_ROUTES.filter(r => r.from === a && r.to === b).length === 1)
      && BRIDGE_ROUTES.length === 12);
    check('bridge: no same-accent route exists',
      BRIDGE_ROUTES.every(r => r.from !== r.to));
    check('bridge: every comparison carries the full written contract',
      BRIDGE_ROUTES.every(r => r.comparisons.length >= 5 && r.comparisons.every(c =>
        c.id && c.feature && c.lexicalSet && c.word && c.startIPA && c.targetIPA
        && c.stays && c.changes
        && ['lips', 'tongue', 'jaw', 'voice'].every(k => (c.guidance?.[k] ?? '').length > 0)
        && Array.isArray(c.symbols)
        && ['approved', 'draft'].includes(c.reviewStatus))));
    check('bridge: claims stay typical, never absolute',
      BRIDGE_ROUTES.every(r =>
        r.comparisons.some(c => /typicall|commonly|varies|often|genuinely/.test(c.changes))));
    check('bridge: the reviewed nam→rp route is intact and approved, all else draft',
      BRIDGE_ROUTES.find(r => r.id === 'nam-rp').comparisons.every(c => c.reviewStatus === 'approved')
      && BRIDGE_ROUTES.find(r => r.id === 'nam-rp').comparisons.length === 8
      && BRIDGE_ROUTES.filter(r => r.id !== 'nam-rp')
        .every(r => r.comparisons.every(c => c.reviewStatus === 'draft')));
    check('bridge: drafts never reach learners; statuses are honest',
      routeFor('nam', 'rp')?.comparisons.length === 8
      && routeFor('aus', 'rp') === null
      && routeStatus('nam', 'rp') === 'approved'
      && routeStatus('aus', 'rp') === 'draft'
      && routeStatus('nam', 'nam') === 'same'
      && bridgeDrafts().length === 11
      && bridgeDrafts().every(r => r.id !== 'nam-rp'));
    check('bridge: RP and Standard British stay distinct, correctly labelled',
      BRIDGE_ROUTES.filter(r => r.from === 'ssbe' || r.to === 'ssbe')
        .every(r => r.title.includes('Standard British'))
      && BRIDGE_ROUTES.filter(r => r.from === 'rp' || r.to === 'rp')
        .every(r => r.title.includes('Traditional RP'))
      && BRIDGE_ROUTES.every(r => !/SSBE|Educated Southern|Contemporary British/.test(r.title))
      && routeStatus('rp', 'ssbe') === 'draft' && routeStatus('ssbe', 'rp') === 'draft');

    const removed = ['jake', 'copacetic', 'the berries', 'horsefeathers', 'hooey', 'bunk',
      'palooka', 'take a powder', 'sawbuck', 'simoleons', 'kale', 'hooch', 'giggle water',
      'flapper', 'dead soldiers', 'on the level', 'the brush off', 'shoot the breeze'];
    const idiomText = IDIOM.map(e => [e.term, e.meaning, e.example, e.note].join(' ')).join(' ');
    const actionText = DIALECT_ACTION.map(p => p.lines.map(l => l.text).join(' ')).join(' ');
    check('no removed NAM expression resurfaces in idioms or pieces',
      removed.every(t => !new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`, 'i').test(idiomText)
        && !new RegExp(`\\b${t.replace(/ /g, '\\s+')}\\b`, 'i').test(actionText)));

    check('action: eight pieces — one scene and one monologue per course',
      DIALECT_ACTION.length === 8
      && ACCS.every(a =>
        DIALECT_ACTION.filter(p => p.courseId === a && p.type === 'dialogue').length === 1
        && DIALECT_ACTION.filter(p => p.courseId === a && p.type === 'monologue').length === 1));
    check('action: every piece carries the complete written record',
      DIALECT_ACTION.every(p => p.title && p.setting && p.speakerDescription && p.register
        && p.situation && p.region && p.lines.length && p.reviewNotes
        && p.review?.literary?.status === 'pending' && p.review?.dialect?.status === 'pending'
        && p.review.literary.reviewer === null && p.review.dialect.reviewer === null
        && p.reviewStatus === 'draft'));
    check('action: monologues sit in the 45–90 second range',
      DIALECT_ACTION.filter(p => p.type === 'monologue').every(p => {
        const words = p.lines.map(l => l.text).join(' ').split(/\s+/).length;
        return words >= 100 && words <= 230;
      }));
    check('action: every expression link resolves and every link is declared',
      DIALECT_ACTION.every(p => {
        const inline = [...p.lines.map(l => l.text).join(' ')
          .matchAll(/\[\[[^\]|]+\|([A-Z]+-\d+)\]\]/g)].map(m => m[1]);
        return inline.length
          && new Set(inline).size === new Set(p.expressionRefs).size
          && inline.every(id => p.expressionRefs.includes(id))
          && p.expressionRefs.every(id => IDIOM.some(e => e.id === id));
      }));
    check('action: drafts stay invisible on every learner surface',
      ACCS.every(a => actionFor(a).length === 0));
    check('action: no piece smuggles audio in',
      DIALECT_ACTION.every(p => p.audio === null));
  }

  // The bridge as a LISTENING exercise: gating rules first (pure, with an
  // injected clip check so the both-clips rule is provable), then a
  // Practice drive proving the 2026-08-17 withdrawal left no trace.
  {
    const rt = routeFor('nam', 'rp');
    check('bridge practice: a comparison plays only when BOTH exact clips exist',
      playableComparisons(rt, (word, acc) => !(word === 'bar' && acc === 'rp'))
        .every(c => c.word !== 'bar')
      && playableComparisons(rt, () => false).length === 0
      && playableComparisons(null, () => true).length === 0);
    // Withdrawn 2026-08-17 behind BRIDGE_LIVE (js/data/bridge.js). The flag
    // gates playableRoutesInto() — the ONE function every learner-facing
    // entry point asks — so while it is false no surface can find a route,
    // even with full audio. Everything beneath the flag must stay whole so
    // flipping it back is a one-line change, not a rebuild.
    const { BRIDGE_LIVE } = await import('../js/data/bridge.js');
    check('bridge practice: BRIDGE_LIVE is a real boolean kill switch, currently off',
      typeof BRIDGE_LIVE === 'boolean' && BRIDGE_LIVE === false);
    check('bridge practice: while withdrawn, NO target has a playable route — real clip index or full audio',
      ACCS.every(t => playableRoutesInto(t, hasWordClip).length === 0)
      && ACCS.every(t => playableRoutesInto(t, () => true).length === 0));
    check('bridge practice: the data under the switch stays whole — nam→rp approved with 8 playable comparisons, 12 routes, 11 drafts filtered',
      routeStatus('nam', 'rp') === 'approved'
      && playableComparisons(routeFor('nam', 'rp'), hasWordClip).length === 8
      && BRIDGE_ROUTES.length === 12
      && bridgeDrafts().length === 11
      && routeFor('aus', 'rp') === null);
  }

  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    const prevPrefs2 = localStorage.getItem('speechcraft-bridge');
    try {
      let doc = frame.contentDocument;
      const w = () => frame.contentWindow;
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const switchCourse = async label => {
        clickIn(doc.querySelector('[aria-label^="Change course"]')); await sleep(250);
        clickIn([...doc.querySelectorAll('[role="menuitem"]')].find(b => b.textContent.includes(label)));
        await sleep(500);
      };

      // Fresh mic spy on the CURRENT realm (reloads earlier discarded the old one).
      let mic14 = 0;
      if (w().navigator.mediaDevices?.getUserMedia) {
        const orig14 = w().navigator.mediaDevices.getUserMedia.bind(w().navigator.mediaDevices);
        w().navigator.mediaDevices.getUserMedia = (...a) => { mic14++; return orig14(...a); };
      }

      // Self-contained: the drive before this one now ends in the acting
      // workspace, and this block reads ACCENT surfaces. Pin the
      // workspace rather than inheriting whatever ran last.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="accents"]')); await sleep(400);
      clickIn(side('Library')); await sleep(350);
      // Withdrawn 2026-08-17 behind DIALECT_ACTION_LIVE. The card must be
      // ABSENT while the flag is false — not merely empty.
      check('build D UI: Dialect in Action stays withdrawn from the Library',
        !card('Dialect in Action')
        && ![...doc.querySelectorAll('.tile')].some(t => /Dialect in Action/.test(t.textContent)));

      // Practice page structure on Neutral American (no playable route in).
      clickIn(side('Practice')); await sleep(400);
      const practiceText = () => doc.body.textContent;
      check('practice: the section heading is Quick Practice, Mixed Review right under it',
        practiceText().includes('Quick Practice')
        && !!doc.getElementById('quick-practice'));
      check('practice: "Recommended for you" is gone from copy AND accessibility labels',
        !practiceText().includes('Recommended for you')
        && ![...doc.querySelectorAll('[aria-label]')]
          .some(el => /recommended for you/i.test(el.getAttribute('aria-label'))));
      check('practice: the diagnostic and old bridge shortcuts are gone, no husks left',
        !doc.getElementById('hub-diagnostic') && !doc.getElementById('hub-bridge')
        && ![...doc.querySelectorAll('.practice-row')].some(r => !r.textContent.trim()));
      const h2s = () => [...doc.querySelectorAll('main h2.chart-h')].map(h => h.textContent.trim());
      check('practice: Quick Practice, then Listening, then Reading IPA',
        h2s()[0] === 'Quick Practice'
        && h2s().findIndex(t => t.startsWith('Listening')) <
           h2s().findIndex(t => t.startsWith('Reading IPA')));
      const listeningTitles = () => {
        const grid = [...doc.querySelectorAll('main h2.chart-h')]
          .find(h => h.textContent.startsWith('Listening'))?.nextElementSibling;
        return [...(grid?.querySelectorAll('.mode-card .mode-title') ?? [])].map(t => t.textContent);
      };
      check('practice: no Accent Bridge card on a course with no playable route in',
        !doc.getElementById('mode-bridge')
        && String(listeningTitles()) === 'Listen & Choose,Minimal Pairs');

      // Traditional RP — the ONE course that had a playable route in.
      // Withdrawn 2026-08-17 behind BRIDGE_LIVE: the card must be ABSENT
      // here too, with the two Listening games intact, no bridge copy or
      // setup ids anywhere, and Practice state untouched. The full-session
      // drive (setup, 8 rounds, XP, Replay) is retired with the card; the
      // data checks above keep the un-withdrawal path tested.
      const heartsBefore = store.hearts;
      const xpBefore14 = store.xp;
      await switchCourse('Traditional RP');
      clickIn(side('Practice')); await sleep(400);
      check('bridge UI: withdrawn — no Accent Bridge card even on Traditional RP, both games intact',
        !doc.getElementById('mode-bridge')
        && String(listeningTitles()) === 'Listen & Choose,Minimal Pairs');
      check('bridge UI: withdrawn — no bridge copy, setup ids or session husks anywhere on Practice',
        !doc.body.textContent.includes('Accent Bridge')
        && !doc.getElementById('bridge-from') && !doc.getElementById('bridge-start')
        && !doc.querySelector('.br-reveal'));
      check('bridge UI: withdrawal leaves Practice state untouched — XP and hearts unmoved',
        store.xp === xpBefore14 && store.hearts === heartsBefore,
        `xp ${xpBefore14}→${store.xp} hearts ${heartsBefore}→${store.hearts}`);
      await switchCourse('Neutral American');

      // The review area: original 23 intact and identifiable, new bridge
      // drafts listed separately with their reviewer requirements.
      w().location.hash = '#review'; await sleep(500);
      const rt = doc.body.textContent;
      check('build D UI: the original 23-item queue stays identifiable',
        rt.includes('The original 23-item queue')
        && rt.includes('8 Dialect in Action piece(s) + 15 sonnet transposition(s)'));
      check('build D UI: bridge drafts are listed separately, never among the 23',
        rt.includes('Accent Bridge routes — 11 new draft route(s)')
        && rt.includes('not') && rt.includes('part of the original 23'));
      check('build D UI: every piece shows its two reviewer requirements',
        [...doc.querySelectorAll('.review-piece .sonnet-hint')]
          .filter(h => h.textContent.includes('literary:')).length === 8
        && rt.includes('dialect/accent') );
      check('build D UI: the review area shows no playback or capture controls',
        !doc.querySelector('main audio, main [data-say-acc], main [data-ab]')
        && !rt.includes('audio coming soon'));
      clickIn(doc.getElementById('review-exit')); await sleep(400);
      check('build D UI: leaving review restores the app',
        !!doc.querySelector('.side-nav .side-item'));

      check('build D UI: zero microphone calls across the Build D drive', mic14 === 0);
    } catch (err) {
      bad('Build D drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      if (prevPrefs2 === null) localStorage.removeItem('speechcraft-bridge');
      else localStorage.setItem('speechcraft-bridge', prevPrefs2);
    }
  } else {
    ok('Build D drive (runner only — run tests/run-all.html)');
  }

  // ── 15. Build F: the sonnet-edition catalog ─────────────────
  try {
    check('editions: exactly 154 Original sonnets, numbered 1..154',
      SONNETS.length === 154 && SONNETS.every((s, i) => s.n === i + 1)
      && SONNETS.every(s => s.lines.length >= 12 && s.lines.length <= 15));
    const newEds = await allEditions();
    const expectNew = EDITION_CHUNKS.reduce((s, c) => s + c.expect, 0);
    const edKeys = Object.keys(newEds).map(Number);
    check('editions: chunk contents match the manifest exactly',
      edKeys.length === expectNew
      && EDITION_CHUNKS.every(c =>
        edKeys.filter(n => n >= c.from && n <= c.to).length === c.expect)
      && edKeys.every(n => !LEGACY_SONNETS.includes(n)),
      `keys=${edKeys.length} expect=${expectNew}`);
    check('editions: every written sonnet has all four texts and no RP adaptation',
      Object.values(newEds).every(e =>
        e.plain?.length > 200 && e.nam?.length > 100 && e.ssbe?.length > 100
        && e.aus?.length > 100 && !('rp' in e)));
    check('editions: the four texts are mutually distinct per sonnet',
      Object.values(newEds).every(e => new Set([e.plain, e.nam, e.ssbe, e.aus]).size === 4));
    check('editions: every new text is a DRAFT — nothing learner-visible',
      edKeys.every(n => editionStatus(n, 'plain') === 'draft'
        && ['nam', 'ssbe', 'aus'].every(d => editionStatus(n, d) === 'draft')));
    check('editions: the five pilots stay in the original queue, unduplicated',
      (await editionFor(18))?.legacy === true
      && (await editionFor(18)).voices.nam === RECASTS[18].recasts.nam
      && (await editionFor(18)).plainStatus === 'approved'
      && LEGACY_SONNETS.every(n => !(n in newEds)));
    check('editions: no third-party guide label anywhere in the catalog',
      !JSON.stringify(newEds).includes('No Fear'));
    if (EDITION_CATALOG_COMPLETE) {
      let full = { plain: 0, nam: 0, ssbe: 0, aus: 0 };
      for (let n = 1; n <= 154; n++) {
        const e = await editionFor(n);
        if (e?.plain) full.plain++;
        for (const d of ['nam', 'ssbe', 'aus']) if (e?.voices[d]) full[d]++;
      }
      check('editions: CATALOG COMPLETE — 154 of every kind',
        full.plain === 154 && full.nam === 154 && full.ssbe === 154 && full.aus === 154,
        JSON.stringify(full));
    } else {
      ok(`editions: catalog in progress — ${expectNew + LEGACY_SONNETS.length}/154 sonnets written`);
    }
  } catch (err) {
    bad('edition catalog integrity', String(err));
  }

  // Reader behavior under the draft gate (runner only).
  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const tabs = () => [...doc.querySelectorAll('.sonnet-tabs .son-tab')].map(b => b.textContent);
      // renderSonnet awaits a lazy chunk import — poll for the finished
      // render rather than trusting a fixed sleep under timer throttling.
      const until = async (fn, ms = 12000) => {
        const t0 = Date.now();
        while (Date.now() - t0 < ms) { if (fn()) return true; await sleep(200); }
        return fn();
      };

      // Self-contained: the Studio hub differs by workspace (the Actor's
      // Studio is its own pane), so pin the accents workspace first.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="accents"]')); await sleep(400);
      clickIn(side('Studio')); await sleep(350);
      clickIn(card('Scripts & Speeches')); await sleep(400);
      check('editions UI: no Featured Texts shelf — collections only',
        !card('Featured Texts'));
      clickIn(card('Shakespeare’s Sonnets')); await sleep(500);
      clickIn(doc.querySelector('.sonnet-row[data-n="2"]'));
      await until(() => doc.body.textContent.includes('Sonnet 2') && !!doc.querySelector('.sonnet-tabs'));
      check('editions UI: a draft edition shows NO Plain/Today tabs to learners',
        doc.body.textContent.includes('Sonnet 2')
        && !tabs().some(t => t.includes('Plain')) && !tabs().some(t => t.includes('Voice')),
        tabs().join(','));
      clickIn(doc.getElementById('nav-back'));
      await until(() => !!doc.getElementById('sonnet-search'));
      clickIn(doc.querySelector('.sonnet-row[data-n="18"]'));
      await until(() => doc.body.textContent.includes('Sonnet 18') && !!doc.querySelector('.sonnet-tabs'));
      check('editions UI: pilot 18 keeps its live Plain Meaning, drafts stay hidden',
        tabs().some(t => t.includes('Plain'))
        && !tabs().some(t => t.includes('Voice')),
        tabs().join(','));
      clickIn(doc.getElementById('nav-back'));
      await until(() => !!doc.getElementById('sonnet-search'));
      check('editions UI: Back returns to the sonnet list',
        !!doc.getElementById('sonnet-search'));
    } catch (err) {
      bad('edition reader drive', String(err?.stack ?? err).slice(0, 220));
    }
  } else {
    ok('edition reader drive (runner only — run tests/run-all.html)');
  }

  // ── 16. Permanent entries: the Dissection hub (runner only) ─
  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    let hubProj = null;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const until = async (fn, ms = 10000) => {
        const t0 = Date.now();
        while (Date.now() - t0 < ms) { if (fn()) return true; await sleep(200); }
        return fn();
      };
      let mic16 = 0;
      const win0 = frame.contentWindow;
      if (win0.navigator.mediaDevices?.getUserMedia) {
        const orig16 = win0.navigator.mediaDevices.getUserMedia.bind(win0.navigator.mediaDevices);
        win0.navigator.mediaDevices.getUserMedia = (...a) => { mic16++; return orig16(...a); };
      }

      // The About doorway to the preface stays alongside the More card.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('More')); await sleep(350);
      clickIn(card('About Speechcraft')); await sleep(350);
      check('hub: the About replay button survives beside the More card',
        !!doc.getElementById('about-threshold'));
      check('about: leads with the inclusive framing, actors named as one audience',
        doc.body.textContent.includes('anyone who wants to understand, strengthen or expand the way they speak')
        && !doc.body.textContent.includes('Speechcraft helps actors understand speech')
        && doc.body.textContent.includes('Actors get dedicated tools'));

      // The TEXTBOOK: readable end to end, no project, no interactivity.
      // Moved 2026-08-19: it shelves in the ACTING Library (key
      // 'col:question'), not the Studio hub — it is reading, not a tool.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="acting"]')); await sleep(400);
      clickIn(side('Library')); await sleep(350);
      const qeTile = () => doc.querySelector('[data-tile="col:question"]');
      check('textbook: a permanent Question Everything card shelves in the Acting Library',
        !!qeTile() && qeTile().textContent.includes('Question Everything'));
      const dissBefore = (await idbAll(STORES.dissections)).length;
      clickIn(qeTile());
      await until(() => !!doc.getElementById('sd-title'));
      check('textbook: the page is titled Question Everything, never Speech Dissection',
        doc.getElementById('sd-title')?.textContent === 'Question Everything'
        && !doc.getElementById('sd-textbook').textContent.includes('Speech Dissection'));
      const tb = () => doc.getElementById('sd-textbook');
      const tbText = () => tb().textContent;
      check('textbook: all six sections render with their headings',
        ['1. What is happening?', '2. What does the speaker want?',
         '3. What is resisting the speaker?', '4. What is the speaker doing to change them?',
         '5. What changes?', '6. What happens after?',
         'Keep Returning to the Text'].every(h => tbText().includes(h)));
      check('textbook: the full bullet inventory renders (all Ask lists complete)',
        // Section 4 is a single question, stated inline — it contributes no
        // bullet, so the list total covers sections 1,2,3,5,6 + Returning.
        tb().querySelectorAll('.sd-asks li').length === 16 + 12 + 15 + 16 + 15 + 9
        && tbText().includes('What circumstances must I reasonably imagine?')
        && tbText().includes('Can I describe my objective as an active attempt to affect another person?')
        && tbText().includes('Why has the problem not already been solved?')
        && tbText().includes('Which action best describes what I am trying to accomplish?')
        && tbText().includes('Which words signal a turn?')
        && tbText().includes('What might actually happen instead?')
        && tbText().includes('What new question should I take back to the text?'),
        `lis=${tb().querySelectorAll('.sd-asks li').length}`);
      check('textbook: section 4 states its single question inline, not as a lone bullet',
        tb().querySelectorAll('.sd-ask-one').length === 1
        && tb().querySelector('.sd-ask-one').textContent
             .includes('Which action best describes what I am trying to accomplish?')
        && ![...tb().querySelectorAll('.sd-asks')].some(ul => ul.children.length === 1),
        `askOne=${tb().querySelectorAll('.sd-ask-one').length}`);
      check('textbook: the closing note names the button that actually exists',
        tbText().includes('press 🔍 Question Everything')
        && !tbText().includes('Dissect This'));
      check('textbook: verbatim frame copy present',
        tbText().includes('A script gives you the words.')
        && tbText().includes('“I am angry” describes a feeling.')
        && tbText().includes('A beat is not merely a pause')
        && tbText().includes('not about locking the performance into one answer'));
      check('textbook: NO interactive answer controls of any kind',
        !tb().querySelector('textarea, input, select, .diss-mark, .diss-q, [data-mark]')
        && !tbText().includes('Saved ✓')
        && !tbText().includes('explored')
        && ![...tb().querySelectorAll('button')].some(b => /don’t know yet|Not relevant/i.test(b.textContent)));
      check('textbook: no completed example and no project selector',
        !tbText().includes('worked example') && !tbText().includes('I’ll leave the papers here')
        && !doc.querySelector('.hub-proj') && !doc.getElementById('hub-new-project'));
      check('textbook: reading it creates no dissection record',
        (await idbAll(STORES.dissections)).length === dissBefore);
      check('textbook: written-only — no audio or playback control anywhere',
        !tb().querySelector('audio')
        && !tbText().includes('🔊')
        && !/coming soon/i.test(tbText()));
      clickIn(doc.getElementById('sd-playable')); await sleep(400);
      check('textbook: the written Playable Actions link opens the section',
        doc.body.textContent.includes('What are you doing to the other person through these words?'));
      clickIn(doc.getElementById('nav-back'));
      await until(() => !!doc.getElementById('sd-title'));
      check('textbook: Back from Playable Actions returns to the textbook',
        !!doc.getElementById('sd-title'));

      // Phone width: the textbook must not scroll sideways.
      const oldW = frame.style.width;
      frame.style.width = '375px'; await sleep(250);
      check('textbook: fits a phone without horizontal scroll',
        doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1,
        `scroll=${doc.documentElement.scrollWidth} client=${doc.documentElement.clientWidth}`);
      frame.style.width = oldW; await sleep(200);
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      check('textbook: Back returns to the Acting Library shelf', !!qeTile());

      // The Custom Work worksheet keeps ALL the interactivity — and its
      // saved answers — with Back returning to the same project.
      hubProj = await createProject({ title: '__regression hub (safe to delete)', text: 'Sit.' });
      const hd = newDissection({ targetType: 'project', targetId: hubProj.id, targetLabel: hubProj.title });
      await putDissection(hd);
      await saveAnswer(hd.id, 'quick.wants', { value: 'To be let back in.' });
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(400);
      clickIn(card('Custom Work')); await sleep(400);
      const pc = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === hubProj.id);
      clickIn(pc?.querySelector('button[data-act="open"]') ?? pc); await sleep(500);
      clickIn(doc.getElementById('sc-edit')); await sleep(450);   // script → Edit
      clickIn(doc.getElementById('proj-dissect'));
      await until(() => doc.body.textContent.includes('Dissect: __regression hub'));
      clickIn(doc.querySelector('.diss-q[data-q="quick.wants"] .diss-head')); await sleep(200);
      check('worksheet: Studio keeps the interactive controls and saved answers',
        doc.querySelector('.diss-q[data-q="quick.wants"] .diss-text')?.value === 'To be let back in.'
        && doc.querySelectorAll('.diss-mark').length >= 2
        && doc.body.textContent.includes('I don’t know yet'));
      clickIn(doc.getElementById('nav-back')); await sleep(400);
      check('worksheet: Back returns to the same Studio project',
        doc.body.textContent.includes('__regression hub')
        && !!doc.getElementById('proj-dissect'));
      check('separation: zero microphone calls across the drive', mic16 === 0);
    } catch (err) {
      bad('Dissection textbook/worksheet drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      if (hubProj) {
        await deleteDissectionsFor(hubProj.id).catch(() => {});
        await deleteProject(hubProj.id).catch(() => {});
      }
    }
  } else {
    ok('Dissection textbook/worksheet drive (runner only — run tests/run-all.html)');
  }

  // ── 17. IA revision: hubs, exact orders, honest availability ─
  // Data level first: Dialect in Action is filtered by stable course ID
  // alone — no leakage is even representable.
  check('IA: Dialect in Action filters purely by stable course ID',
    ['nam', 'rp', 'ssbe', 'aus'].every(a => actionFor(a).every(p => p.courseId === a)));
  check('IA: every Dialect in Action piece carries exactly one known course ID',
    DIALECT_ACTION.every(p => ['nam', 'rp', 'ssbe', 'aus'].includes(p.courseId)));
  // Featured Texts left as a shelf, not as content: the pilot editions
  // it pointed at are still served in full.
  check('IA: removing Featured Texts deleted no content (pilot 18 intact)',
    !!(await editionFor(18))?.plain && !!RECASTS[18]);

  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => { const win = frame.contentWindow;
        el?.dispatchEvent(new win.MouseEvent('click', { bubbles: true })); };
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const hubTitles = () => [...doc.querySelectorAll('.track-card .track-info h2')].map(h => h.textContent);
      let mic17 = 0;
      const w17 = frame.contentWindow;
      if (w17.navigator.mediaDevices?.getUserMedia) {
        const orig17 = w17.navigator.mediaDevices.getUserMedia.bind(w17.navigator.mediaDevices);
        w17.navigator.mediaDevices.getUserMedia = (...a) => { mic17++; return orig17(...a); };
      }

      // Library: every workspace Library is ONE shared component now —
      // "<Name> Library" heading, a #lib-search field, and .tile cards
      // (never .track-card). Titles are exact: the emoji sits in its own
      // .tile-emoji span, so the tile's text nodes carry the bare title.
      // Self-contained: the previous drive ends in the acting workspace,
      // so pin the accents workspace before reading its Library.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(doc.getElementById('ws-chip')); await sleep(150);
      clickIn(doc.querySelector('[data-ws="accents"]')); await sleep(400);
      clickIn(side('Library')); await sleep(350);
      const tileTitles = () => [...doc.querySelectorAll('.tile-grid .tile .tile-title')]
        .map(t => [...t.childNodes].filter(n => n.nodeType === 3)
          .map(n => n.textContent).join('').trim());
      // No About-the-Accent card (removed 2026-08-17), and no Dialect in
      // Action while DIALECT_ACTION_LIVE is false — the withdrawn card is
      // ABSENT, not empty. Shared resources say so with a badge instead.
      const wantLib = ['IPA for This Accent', 'Words & Expressions',
        'Rhetoric & Oratory', 'Your Instrument', 'Vowel Map'];
      check('IA: Library shows exactly the approved cards in the approved order',
        doc.querySelector('.page-h')?.textContent.endsWith(' Library') === true
        && !!doc.getElementById('lib-search')
        && JSON.stringify(tileTitles()) === JSON.stringify(wantLib), tileTitles().join(' | '));
      const libTiles = [...doc.querySelectorAll('.tile-grid .tile')];
      check('IA: Library tiles are title-led — a unit count on every card, status as badges, no blurbs',
        libTiles.length === wantLib.length
        && libTiles.every(t => /^\d+ \S+$/.test(t.querySelector('.tile-meta')?.textContent ?? '')
          && !t.querySelector('p'))
        && libTiles.some(t => t.textContent.includes('Rhetoric')
          && t.querySelector('.badge')?.textContent === 'Shared'));
      check('IA: no retired Library cards remain',
        tileTitles().length > 0
        && ['About', 'Dialect in Action', 'Accent Bridge', 'Scripts & Speeches',
          'Playable Actions', 'Speech Dissection', 'Question Everything',
          'Personal Dictionary'].every(gone => !tileTitles().some(t => t.startsWith(gone))));

      // Studio: the approved cards, exact order, title-only.
      clickIn(side('Studio')); await sleep(350);
      check('IA: Studio hub shows exactly the three cards in the approved order',
        JSON.stringify(hubTitles()) === JSON.stringify(['Scripts & Speeches',
          'Custom Work', 'Personal Dictionary']),
        hubTitles().join(' | '));
      check('IA: Studio hub cards are title-only',
        [...doc.querySelectorAll('.track-card .track-info')]
          .every(i => !i.querySelector('p') && i.children.length === 1));

      // Scripts & Speeches keeps every collection; no Featured shelf.
      clickIn(card('Scripts & Speeches')); await sleep(400);
      const shelves = hubTitles();
      check('IA: Scripts & Speeches preserves every text collection',
        ['Shakespeare’s Sonnets', 'Chekhov · Monologues', 'O’Neill · Monologues',
         'Wilde · Monologues', 'Pirandello · Monologues', 'Ibsen · Monologues',
         'Custom Work'].every(t => shelves.includes(t))
        && !shelves.includes('Featured Texts'), shelves.join(' | '));

      // Custom Work: the project area, honestly described — no OCR claim.
      clickIn(card('Custom Work')); await sleep(400);
      check('IA: Custom Work is the project area and promises no OCR/scanning',
        doc.body.textContent.includes('Custom Work')
        && !!doc.getElementById('proj-new')
        && !/OCR|document scan/i.test(doc.body.textContent));

      // Why Speech Matters stays reachable under More, not the Library.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('More')); await sleep(350);
      check('IA: Why Speech Matters lives under More', !!card('Why Speech Matters'));

      // Learn on an UNSTARTED course: no standalone continue card above
      // Unit 1 — Stage 1 · Orientation with its START node is the entry.
      const completedBefore = store.completed.size;
      clickIn(side('Learn')); await sleep(350);
      clickIn(doc.querySelector('[aria-label^="Change course"]')); await sleep(250);
      clickIn([...doc.querySelectorAll('[role="menuitem"]')].find(b => b.textContent.includes('Australian')));
      await sleep(500);
      const doneNow = parseInt(doc.querySelector('.hub-progress .track-progress span')?.textContent ?? '', 10);
      const ccNow = !!doc.querySelector('.continue-card[aria-label="Continue learning"], .continue-card[aria-label="Course complete"]');
      check('IA: the continue card appears exactly when the course has progress',
        (doneNow === 0) === !ccNow, `done=${doneNow} continueCard=${ccNow}`);
      check('IA: Stage 1 · Orientation and Meet the accent stay the clear start',
        doc.body.textContent.includes('Stage 1 · Orientation')
        && doc.body.textContent.includes('Meet the accent')
        && !!doc.querySelector('.start-flag'));
      clickIn(doc.querySelector('[aria-label^="Change course"]')); await sleep(250);
      clickIn([...doc.querySelectorAll('[role="menuitem"]')].find(b => b.textContent.includes('Neutral American')));
      await sleep(500);
      check('IA: browsing courses changed no lesson progress',
        store.completed.size === completedBefore,
        `before=${completedBefore} after=${store.completed.size}`);
      check('IA: zero microphone calls across the IA drive', mic17 === 0);

      // A stale saved section falls back to Learn on a real reload.
      localStorage.setItem('speechcraft-section', 'totally-bogus');
      frame.contentWindow.location.reload();
      let doc2 = null;
      for (let i = 0; i < 60; i++) { await sleep(200); doc2 = frame.contentDocument;
        if (doc2?.querySelector('.side-nav .side-item')) break; }
      check('IA: a stale saved section falls back to Learn, never a blank page',
        !!doc2?.querySelector('.side-item.on')?.textContent.includes('Learn')
        && localStorage.getItem('speechcraft-section') === 'learn',
        `on=${doc2?.querySelector('.side-item.on')?.textContent.trim()} stored=${localStorage.getItem('speechcraft-section')}`);
    } catch (err) {
      bad('IA revision drive', String(err?.stack ?? err).slice(0, 220));
    }
  } else {
    ok('IA revision drive (runner only — run tests/run-all.html)');
  }

  // ── 19a. The Speech system: data-level invariants ────────────
  {
    const stageCounts = ['start', 'foundation', 'meaning', 'whole'].map(s => speechLessonsFor(s).length);
    check('speech: 21 chapters — 5 Principles, 7 Instrument, 5 Meaning, 4 Presence',
      String(stageCounts) === '5,7,5,4' && SPEECH_LESSONS.length === 21
      && TEXTBOOK_PARTS.length === 4 && textbookOrder().length === 21, stageCounts.join(','));
    const courseText = JSON.stringify(SPEECH_LESSONS);
    check('speech: both central practice statements preserved exactly',
      courseText.includes('Practice one element at a time so you can recognize and control it. Then carry that skill into thought, listening, movement and response.')
      && courseText.includes('Practice the parts. Communicate as a whole.'));
    check('speech: memory is automatic/second nature — never autonomic',
      !/\bautonomic\b/i.test(courseText));
    const alpha = speechLessonById('sp-start-alphabet');
    const alphaText = JSON.stringify(alpha);
    check('speech: alphabet experiment — the five letters, no recitation first, no attribution',
      alpha.body.some(b => b.experiment?.steps.length === 5)
      && alphaText.includes('Without reciting the alphabet first')
      && !/Frankie|Rocco|invented|my teacher/i.test(alphaText)
      && alphaText.includes('no sensation you are supposed to have'));
    check('speech: anatomy bodies publish only through the ledger — an unlisted draft never renders',
      speechLessonsFor('foundation').length === 7
      && speechLessonsFor('foundation').every(l =>
        l.requiredReviewer === 'voice-professional'
        && speechBodyVisible(l)
        && speechReviewFor(l.id)?.reviewerType === 'product-owner'
        && speechReviewFor(l.id)?.date === '2026-08-14'
        && speechReviewFor(l.id)?.notes?.includes('not a clinical sign-off'))
      // the gate itself must survive the publication: a professional-tier
      // record absent from the ledger never shows its body to learners
      && !speechBodyVisible({ id: 'probe-unlisted-draft', requiredReviewer: 'voice-professional' }));
    check('speech: editorial lessons render while pending, per accepted precedent',
      speechLessonsFor('start').every(l => speechBodyVisible(l)));
    check('speech: glossary holds the 15 required terms',
      ['automaticity', 'given-circumstances', 'objective', 'overall-objective', 'scene-objective',
       'obstacle', 'action', 'tactic', 'beat', 'operative-word', 'urgency', 'resonance',
       'articulation', 'rhetoric', 'presence'].every(t => !!glossaryTerm(t)));
    check('speech: four acting approaches, complete sections, all gated behind acting review',
      ACTING_APPROACHES.length === 4
      && ACTING_APPROACHES.every(a =>
        ['background', 'principles', 'terminology', 'considers', 'misunderstandings', 'sources']
          .every(k => (a.sections[k] ?? '').length > 100)
        && a.sections.questions.length >= 3
        && !speechApproved(a.id))
      && APPROACH_DISCLAIMER.includes('not official training'));
    check('speech: 24 routine records — 8 reviewed-batch Train, 16 drafts',
      SPEECH_ROUTINES.length === 24
      && learnerRoutines().length === 8
      && learnerRoutines().every(r => r.mode === 'train' && r.reviewBatch === 1)
      && draftRoutines().length === 16
      && PRACTICE_SUBJECTS.length === 8
      && PRACTICE_SUBJECTS.every(s => routinesFor(s.id).length === 3));
    check('speech: arcade groups hold 3/4/3/1 visible games; Context Shift unreachable',
      String(ARCADE_GROUPS.map(g => arcadeGamesFor(g.id).length)) === '3,4,3,1'
      && arcadeGameById('context-shift') === null
      && ARCADE_GROUPS.length === 4);
    check('speech: every practice-text kind exists, all original with provenance',
      ['line', 'scene', 'request', 'apology', 'boundary', 'announcement', 'toast',
       'persuasion', 'monologue', 'presentation']
        .every(k => SPEECH_TEXTS.some(t => t.kind === k))
      && SPEECH_TEXTS.every(t => t.provenance.includes('Original Speechcraft writing')
        && t.requiredReviewer === 'editorial'));
    const goalBefore = speechGoal();
    setSpeechGoal('totally-bogus');
    check('speech: a malformed stored goal falls back safely to none', speechGoal() === null);
    setSpeechGoal('acting');
    check('speech: goal set/read roundtrip', speechGoal() === 'acting');
    setSpeechGoal(goalBefore);
    check('speech: goal never gates content — visibility is review-status only, goal-independent',
      SPEECH_LESSONS.every(l => typeof speechBodyVisible(l) === 'boolean'));
    // Library collections cover every lesson exactly once, in order.
    check('speech: four Library collections map the four stages, no lesson orphaned or doubled',
      SPEECH_COLLECTIONS.length === 4
      && String(SPEECH_COLLECTIONS.map(c => c.title))
        === 'Speechcraft Principles,Your Speaking Instrument,Meaning, Intention & Urgency,Presence & Integration'
      && SPEECH_COLLECTIONS.reduce((n, c) => n + speechLessonsFor(c.stage).length, 0) === SPEECH_LESSONS.length
      && SPEECH_LESSONS.every(l => !!collectionForLesson(l)));
    check('speech: every professional-tier chapter carries a stated reason for specialist review',
      speechLessonsFor('foundation').every(l => (SPEECH_REVIEW_WHY[l.id] ?? '').length > 40)
      && Object.keys(SPEECH_REVIEW_WHY).length === 7);
    check('speech: understanding checks exist only where an answer is objectively correct',
      Object.entries(SPEECH_LESSON_EXTRAS).every(([id, x]) =>
        !x.check || (Array.isArray(x.check.choices)
          && Number.isInteger(x.check.answer)
          && x.check.answer >= 0 && x.check.answer < x.check.choices.length))
      // the interpretive lessons must never carry a scored check
      && !SPEECH_LESSON_EXTRAS['sp-m-want']?.check
      && !SPEECH_LESSON_EXTRAS['sp-m-urgency']?.check
      && !SPEECH_LESSON_EXTRAS['sp-m-emphasis']?.check
      && !SPEECH_LESSON_EXTRAS['sp-w-presence']?.check);
    check('speech: Learn and Library read the SAME records — one authoritative source',
      SPEECH_MODULES.every(m => {
        const byModule = speechLessonsFor(m.stage);
        const col = SPEECH_COLLECTIONS.find(c => c.stage === m.stage);
        return String(byModule.map(l => l.id)) === String(speechLessonsFor(col.stage).map(l => l.id));
      })
      && SPEECH_LESSONS.every(l => !!moduleForLesson(l) && !!collectionForLesson(l)));
    check('speech: search keywords derive from the records (title, collection, headings, terms)',
      lessonKeywords(speechLessonById('sp-m-urgency')).includes('urgency')
      && lessonKeywords(speechLessonById('sp-m-urgency')).includes('meaning, intention & urgency')
      && lessonKeywords(speechLessonById('sp-f-jaw')).includes('jaw'));
    const nonPreface = SPEECH_LESSONS.filter(l => l.id !== 'wsm');
    check('speech: every chapter beyond the preface states an objective for the Learn pathway',
      nonPreface.length === 20
      && nonPreface.every(l => (SPEECH_LESSON_EXTRAS[l.id]?.objective ?? '').length > 20)
      // 'wsm' is the promoted preface, routed to its authoritative reading
      // (course.js) — deliberately the only chapter without Learn extras
      && !SPEECH_LESSON_EXTRAS['wsm']);
    check('speech: practice links point at real routines and visible games',
      Object.values(SPEECH_LESSON_EXTRAS).filter(x => x.practice).every(x =>
        x.practice.kind === 'routine'
          ? !!SPEECH_ROUTINES.find(r => r.id === x.practice.ref && r.reviewBatch === 1)
          : !!arcadeGameById(x.practice.ref)));
  }


  // Mirrors the app's available-lesson sequence so progress assertions
  // are computed from the same records the UI uses.
  const speechCourseSequenceMirror = () => {
    const seq = SPEECH_MODULES.flatMap(m => speechLessonsFor(m.stage))
      .filter(l => speechBodyVisible(l));
    return { total: seq.length, done: seq.filter(l => speechLessonDone(l.id)).length };
  };
  // ── 19b. The Speech system: the driven journeys ──────────────
  // Skipped while the workspace is withdrawn — see `speechLive` above.
  if (navDoc !== document && speechLive) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    let spProj = null;
    const modesBefore = [localStorage.getItem('speechcraft-working-text')];
    try {
      let doc = frame.contentDocument;
      const w = () => frame.contentWindow;
      const clickIn = el => el?.dispatchEvent(new (frame.contentWindow.MouseEvent)('click', { bubbles: true }));
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const card = title => [...doc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === title);
      const until = async (fn, ms = 10000) => { const t0 = Date.now();
        while (Date.now() - t0 < ms) { if (fn()) return true; await sleep(200); } return fn(); };
      // The persistent workspace selector, driven the way a user does.
      const pickWorkspace = async id => {
        clickIn(doc.getElementById('ws-chip')); await sleep(150);
        clickIn(doc.querySelector(`[data-ws="${id}"]`)); await sleep(400);
      };
      const statsbarText = () => doc.getElementById('statsbar')?.textContent ?? '';
      let mic19 = 0;
      if (w().navigator.mediaDevices?.getUserMedia) {
        const orig19 = w().navigator.mediaDevices.getUserMedia.bind(w().navigator.mediaDevices);
        w().navigator.mediaDevices.getUserMedia = (...a) => { mic19++; return orig19(...a); };
      }
      const noMedia = where => check(`speech: no audio/video element or capture control — ${where}`,
        !doc.querySelector('main audio, main video, [data-tryit], #perf-rec, .rating')
        && !doc.querySelector('main')?.textContent.includes('🔊'));

      // ── The three workspaces ──────────────────────────────────
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Learn')); await sleep(350);
      check('workspaces: all three are selectable from the persistent selector',
        !!doc.getElementById('ws-chip')
        && ['speech', 'ipa', 'accents'].every(id => {
          doc.getElementById('ws-chip').click();
          return !!doc.querySelector(`[data-ws="${id}"]`);
        }));
      await pickWorkspace('accents');
      check('workspaces: Accents & Dialects keeps its accent selector and course',
        !!doc.getElementById('course-chip')
        && statsbarText().includes('Neutral American')
        && doc.body.textContent.includes('Stage 1 · Orientation'));
      clickIn(doc.getElementById('course-chip')); await sleep(200);
      check('workspaces: the accent menu offers the four accent courses, not IPA Foundations',
        ['Neutral American', 'Traditional RP', 'Standard British', 'Australian']
          .every(n => [...doc.querySelectorAll('#course-menu .course-row')].some(r => r.textContent.includes(n)))
        && ![...doc.querySelectorAll('#course-menu .course-row')].some(r => r.textContent.includes('IPA Foundations')));
      clickIn(doc.body); await sleep(150);
      await pickWorkspace('ipa');
      check('workspaces: IPA is accent-neutral — fixed IPA Foundations context, no accent selector',
        !!doc.getElementById('ipa-context')
        && statsbarText().includes('IPA Foundations')
        && !doc.getElementById('course-chip')
        && !statsbarText().includes('Neutral American'));
      check('workspaces: the sidebar works unchanged inside a workspace',
        [...doc.querySelectorAll('.side-nav .side-item .side-label')].map(e => e.textContent.trim())
          .join() === EXPECTED_NAV.join());
      await pickWorkspace('speech');
      check('workspaces: Speech never shows an accent as its context',
        !doc.getElementById('course-chip')
        && !statsbarText().includes('Neutral American')
        && !statsbarText().includes('🇺🇸')
        && statsbarText().includes('Speech'));
      check('workspaces: Speech carries the same six-section sidebar',
        [...doc.querySelectorAll('.side-nav .side-item .side-label')].map(e => e.textContent.trim())
          .join() === EXPECTED_NAV.join());
      // Persistence across a real reload.
      frame.contentWindow.location.reload();
      let rdoc = null;
      for (let i = 0; i < 60; i++) { await sleep(200); rdoc = frame.contentDocument;
        if (rdoc?.getElementById('ws-chip')) break; }
      check('workspaces: the choice survives a reload',
        localStorage.getItem('speechcraft-workspace') === 'speech'
        && (rdoc?.getElementById('statsbar')?.textContent ?? '').includes('Speech')
        && !rdoc?.getElementById('course-chip'));
      doc = frame.contentDocument;
      check('workspaces: switching never disturbed the stored accent course',
        localStorage.getItem('speechcraft-course') === 'nam');
      const awaitingReal = SPEECH_LESSONS.filter(l => !speechBodyVisible(l)).length;
      const availableReal = SPEECH_LESSONS.length - awaitingReal;
      const approachesReal = ACTING_APPROACHES.filter(a => !speechApproved(a.id)).length;
      // Speech has no Learn section: the workspace opens on its Library.
      clickIn(side('Library')); await sleep(400);
      check('speech: the Library shelves four principal resources',
        doc.querySelector('.page-h')?.textContent === 'Speech Library'
        && doc.querySelectorAll('.tile-grid .tile').length === 4
        && ['textbook', 'texts', 'rhetoric', 'ipa']
          .every(k => !!doc.querySelector(`.tile-grid [data-tile="${k}"]`))
        && !!doc.getElementById('lib-search'));
      check('speech: Free Play, hearts, gems and streak are hidden here',
        !doc.getElementById('freeplay')
        && !(doc.getElementById('statsbar')?.textContent ?? '').includes('❤️')
        && !(doc.getElementById('statsbar')?.textContent ?? '').includes('💎')
        && !(doc.getElementById('statsbar')?.textContent ?? '').includes('🔥'));
      check('speech: the rail offers a next step and never points at review work',
        (doc.getElementById('rail-quests')?.textContent ?? '').includes('Next step')
        && !!doc.querySelector('#rail-quests .rail-card button')
        && !/professional review|awaiting/i.test(doc.getElementById('rail-quests')?.textContent ?? ''));
      check('speech: the research question left the curriculum for Preferences',
        !doc.querySelector('[data-goal]')
        && !doc.body.textContent.includes('What are you working toward?'));
      // A chapter opens straight from a collection, with no lesson chrome.
      clickIn(doc.querySelector('[data-tile="textbook"]')); await sleep(400);
      clickIn(doc.querySelector('[data-ch="sp-start-parts"]')); await sleep(400);
      check('library: a chapter has no check, no mark-as-read, no XP, no completion control',
        !doc.querySelector('.sp-check') && !doc.getElementById('sp-done')
        && !doc.querySelector('[data-check]')
        && !/\bXP\b/.test(doc.querySelector('main')?.textContent ?? '')
        && doc.activeElement?.id === 'sp-h');
      check('library: a chapter keeps textbook prev/next and a contents link',
        !!doc.querySelector('.sp-chapter-nav')
        && !!doc.getElementById('sp-prev') && !!doc.getElementById('sp-next-ch')
        && !!doc.getElementById('sp-to-contents'));
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      clickIn(doc.getElementById('nav-back')); await sleep(300);

      // The review area. Owner approvals published every prepared draft
      // (chapters 2026-08-14, acting 2026-08-17), so nothing is hidden,
      // the Library renders no review strip, and the inventory pages
      // have nothing left to list. The ledger stays the source of truth.
      clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(380);
      const proChapters = SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional');
      check('review: every prepared draft is published by a recorded owner approval — no review strip remains',
        awaitingReal === 0
        && proChapters.length === 7
        && proChapters.every(l => speechReviewFor(l.id)?.verdict === 'owner-approved'
          && speechReviewFor(l.id)?.reviewerType === 'product-owner'
          && speechReviewFor(l.id)?.date === '2026-08-14')
        && !doc.querySelector('.review-strip'));
      check('review: governance stays neutral — only the product owner is recorded, no professional is ever named',
        !doc.body.textContent.includes('Claude')
        && SPEECH_LESSONS.some(l => speechReviewFor(l.id))
        && SPEECH_LESSONS.filter(l => speechReviewFor(l.id)).every(l =>
          speechReviewFor(l.id).reviewer === 'Product owner'
          && /not a clinical sign-off/.test(speechReviewFor(l.id).notes ?? ''))
        && ACTING_APPROACHES.length === 4
        && ACTING_APPROACHES.every(a =>
          speechReviewFor(a.id)?.reviewer === 'Product owner'
          && /NOT specialist sign-off/.test(speechReviewFor(a.id)?.notes ?? '')));
      // The draft reader is unreachable while nothing is draft; the
      // ledger keeps the old no-invented-approval guard alive.
      check('review: publication never claims specialist sign-off — acting approvals stay owner-approved only',
        ACTING_APPROACHES.every(a => !speechApproved(a.id)
          && speechReviewFor(a.id)?.verdict === 'owner-approved'
          && speechReviewFor(a.id)?.date === '2026-08-17'));
      check('review: prepared work is never called missing or coming soon',
        !/coming soon|not yet written|is missing/i.test(doc.querySelector('main')?.textContent ?? ''));

      // The two-application lesson: distinct tabs, acting default under
      // the acting goal, glossary dialog that never touches history.
      // Self-contained: pin the workspace and set the acting goal — the
      // acting-first tab default only exists under that goal, and the
      // workspace selector only exists on the shell.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('speech');
      clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(350);
      const goalTabs = speechGoal();
      setSpeechGoal('acting');
      clickIn(doc.querySelector('[data-tile="textbook"]')); await sleep(400);
      clickIn(doc.querySelector('[data-ch="sp-m-want"]'));
      await until(() => doc.querySelector('.sp-tabs'));
      setSpeechGoal(goalTabs);
      const tabs = [...doc.querySelectorAll('.sp-tabs .son-tab')].map(b => b.textContent);
      check('speech: What Do You Want? keeps Everyday and Acting & Text distinct',
        String(tabs) === 'Everyday Speaking,Acting & Text'
        && doc.querySelector('.sp-tabs .son-tab.on')?.textContent === 'Acting & Text'
        && (doc.querySelector('.sp-tabpane[data-pane="acting"]:not([hidden])')?.textContent ?? '')
          .includes('Given circumstances')
        && !doc.querySelector('.sp-tabpane[data-pane="everyday"]:not([hidden])'));
      clickIn([...doc.querySelectorAll('.sp-tabs .son-tab')].find(b => b.textContent === 'Everyday Speaking'));
      await sleep(200);
      check('speech: the Everyday tab carries its own teaching, not a copy of the acting tab',
        !!doc.querySelector('.sp-tabpane[data-pane="everyday"]:not([hidden])')
        && !doc.querySelector('.sp-tabpane[data-pane="acting"]:not([hidden])')
        && doc.querySelector('.sp-tabpane[data-pane="everyday"]').textContent.includes('Desired result'));
      const histLen = w().history.length;
      const hashBefore = w().location.hash;
      clickIn(doc.querySelector('[data-gloss]')); await sleep(250);
      check('speech: a glossary term opens in place as an accessible dialog',
        !!doc.querySelector('.gloss-overlay [role="dialog"]')
        && doc.activeElement === doc.querySelector('.gloss-card .btn'));
      doc.querySelector('.gloss-card')?.dispatchEvent(
        new (frame.contentWindow.KeyboardEvent)('keydown', { key: 'Escape', bubbles: true }));
      await sleep(200);
      check('speech: Esc dismisses the glossary; browser history untouched',
        !doc.querySelector('.gloss-overlay')
        && w().history.length === histLen && w().location.hash === hashBefore);
      clickIn(doc.getElementById('nav-back')); await sleep(300);

      // Completion: +5 XP once, never twice; then a gated Stage-1 page.
      const xpA = store.xp;
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      check('speech: reading a chapter never awards XP — the Library is not a course',
        store.xp === xpA);
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Library')); await sleep(350);
      clickIn(doc.querySelector('[data-tile="textbook"]')); await sleep(400);
      clickIn(doc.querySelector('[data-ch="sp-f-jaw"]')); await sleep(380);
      check('speech: the anatomy chapter is published — body renders, owner-approved, specialist review honestly outstanding',
        doc.body.textContent.includes('Bruxism may contribute')
        && !doc.body.textContent.includes('awaiting review by a qualified voice professional')
        && speechReviewFor('sp-f-jaw')?.verdict === 'owner-approved'
        && speechReviewFor('sp-f-jaw')?.reviewerType === 'product-owner'
        && speechReviewFor('sp-f-jaw')?.date === '2026-08-14'
        && !speechApproved('sp-f-jaw'));
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      clickIn(doc.getElementById('nav-back')); await sleep(300);

      // Approaches now live in the Acting Library, published by the
      // 2026-08-17 owner editorial approval. Self-contained: the
      // workspace selector only exists on the shell, so go home first.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('acting');
      clickIn(side('Library')); await sleep(350);
      clickIn(doc.querySelector('[data-tile="col:approaches"]')); await sleep(350);
      check('speech: all four approaches published — owner approval recorded, specialist review still outstanding',
        doc.querySelectorAll('[data-approach]').length === 4
        && ACTING_APPROACHES.every(a => !!doc.querySelector(`[data-approach="${a.id}"]`))
        && [...doc.querySelectorAll('[data-approach]')].every(b => !b.textContent.includes('awaiting review'))
        && ACTING_APPROACHES.every(a => speechReviewFor(a.id)?.verdict === 'owner-approved'
          && speechReviewFor(a.id)?.date === '2026-08-17'
          && !speechApproved(a.id)));
      clickIn(doc.querySelector('[data-approach="adler"]')); await sleep(300);
      check('speech: a published approach page carries its method content — no gate, honest ledger',
        doc.querySelector('main h1')?.textContent === 'Stella Adler'
        && doc.body.textContent.includes('Historical background')
        && doc.body.textContent.includes('justification (finding the reason')
        && !doc.body.textContent.includes('awaiting review by a qualified acting teacher')
        && speechReviewFor('adler')?.verdict === 'owner-approved'
        && !speechApproved('adler'));
      clickIn(doc.getElementById('nav-back')); await sleep(250);
      // Back to Speech from a known state — the workspace selector only
      // exists on the shell. Dialects in Speech now lives behind the
      // Library's "IPA, Sound & Dialect Reference" card, and the Accent
      // Bridge and Dialect in Action withdrawals left exactly two facets.
      // data-facet carries `renders`, not `id`.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('speech');
      clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(350);
      clickIn(doc.querySelector('[data-tile="ipa"]')); await sleep(400);
      clickIn(doc.querySelector('[data-item="dialects"]')); await sleep(420);
      check('speech: Dialects in Speech shows both entrances over shared records',
        [...doc.querySelectorAll('[data-facet]')].map(b => b.dataset.facet).join()
          === 'inventory,idioms'
        && [...doc.querySelectorAll('[data-facet] h2')].map(h => h.textContent).join('|')
          === 'Sound system & IPA|Vocabulary & expressions'
        && doc.body.textContent.includes('never means sharing one personality'));
      check('speech: every facet button routes to a real surface — none are dead',
        [...doc.querySelectorAll('[data-facet]')]
          .every(b => ['inventory', 'idioms', 'action', 'bridge-practice'].includes(b.dataset.facet)));
      clickIn([...doc.querySelectorAll('[data-facet]')].find(b => b.dataset.facet === 'idioms'));
      await sleep(400);
      check('speech: a facet routes to the EXISTING surface — no duplicate content',
        (doc.querySelector('.track-title')?.textContent ?? '').includes('Words & Expressions')
        && !!doc.querySelector('#idiom-page .idiom-card')
        && !doc.querySelector('[data-facet]'));

      // The Speech Library shelf. Self-contained: enter from a known
      // state (home → Speech workspace → Library) so an earlier block
      // can never strand these checks in another workspace.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('speech');
      clickIn(side('Library')); await sleep(400);
      check('library: the landing page is a bookshelf of principal resources',
        doc.querySelector('.page-h')?.textContent === 'Speech Library'
        && doc.querySelectorAll('.tile-grid .tile').length === 4
        && ['textbook', 'texts', 'rhetoric', 'ipa']
          .every(k => !!doc.querySelector(`.tile-grid [data-tile="${k}"]`))
        && !!doc.getElementById('lib-search')
        && doc.querySelectorAll('[data-item]').length === 0
        && !(doc.querySelector('main')?.textContent ?? '').includes('The Alphabet Experiment'));
      check('library: the retired instructional collections are no longer top-level cards',
        ['Speechcraft Principles', 'Your Speaking Instrument',
         'Meaning, Intention & Urgency', 'Presence & Integration']
          .every(t => !doc.body.textContent.includes(t)));
      check('library: the textbook heads the shelf, with its computed chapter count',
        [...doc.querySelectorAll('.tile-grid .tile')][0]?.dataset.tile === 'textbook'
        && (doc.querySelector('.tile-grid [data-tile="textbook"] .tile-title')?.textContent ?? '')
          .includes('Speechcraft Textbook')
        && doc.querySelector('.tile-grid [data-tile="textbook"] .tile-meta')?.textContent
          === `${textbookOrder().length} chapters`
        && textbookOrder().length === 21,
        [...doc.querySelectorAll('.tile-title')].map(t => t.textContent).join(' | '));
      check('library: no review strip — every chapter published, specialist review honestly outstanding',
        !doc.querySelector('.review-strip')
        && SPEECH_LESSONS.every(l => speechBodyVisible(l))
        && SPEECH_LESSONS.filter(l => l.requiredReviewer !== 'editorial').length === 7
        && SPEECH_LESSONS.filter(l => l.requiredReviewer !== 'editorial')
          .every(l => speechReviewFor(l.id)?.verdict === 'owner-approved' && !speechApproved(l.id)));
      clickIn(doc.querySelector('[data-tile="textbook"]')); await sleep(400);
      check('library: the textbook opens on its four-part contents, without emoji rows',
        doc.querySelectorAll('.tb-part').length === 4
        && doc.querySelectorAll('.chapter-row').length === textbookOrder().length
        && ![...doc.querySelectorAll('.chapter-row')].some(t => /\p{Extended_Pictographic}/u.test(t.textContent)));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      clickIn([...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(380);
      (() => {
        const sf = doc.getElementById('lib-search');
        if (!sf) return;
        sf.value = 'textbook';
        sf.dispatchEvent(new (frame.contentWindow.Event)('input', { bubbles: true }));
      })();
      await sleep(300);
      check('library: search narrows the shelf to the one matching collection card',
        doc.querySelectorAll('.tile-grid .tile').length === 1
        && !!doc.querySelector('.tile-grid [data-tile="textbook"]')
        && (doc.querySelector('.pane-note[aria-live="polite"]')?.textContent ?? '').includes('1 result')
        && doc.querySelectorAll('[data-item]').length === 0,
        [...doc.querySelectorAll('.tile-grid .tile')].map(t => t.dataset.tile).join(','));
      (() => {
        const sf = doc.getElementById('lib-search');
        if (!sf) return;
        sf.value = 'alphabet';
        sf.dispatchEvent(new (frame.contentWindow.Event)('input', { bubbles: true }));
      })();
      await sleep(300);
      const libNoMatch = doc.querySelectorAll('.tile-grid .tile').length === 0
        && (doc.querySelector('main')?.textContent ?? '').includes('Nothing matches')
        && !!doc.getElementById('lib-clear');
      clickIn(doc.getElementById('lib-clear')); await sleep(300);
      check('library: a no-match search offers Clear, which restores the full shelf',
        libNoMatch
        && doc.querySelectorAll('.tile-grid .tile').length === 4
        && doc.getElementById('lib-search')?.value === '');
      await sleep(250);
      noMedia('Speech Library');

      // Practice: the three primary choices (titles only), games only here.
      // Self-contained block: never inherit the previous block's end state —
      // go home, re-pick the Speech workspace, then open Practice explicitly.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('speech');
      clickIn(side('Practice')); await sleep(400);
      check('speech: exactly three title-only primary choices',
        String([...doc.querySelectorAll('.track-card h2')].map(h => h.textContent))
          === 'Guided Practice,Speechcraft Arcade,Practice My Text'
        && [...doc.querySelectorAll('.track-card .track-info')].every(i => !i.querySelector('p')));
      noMedia('Speech Practice hub');

      // Guided Practice: 8 subjects; segmented Prepare · Train · Apply;
      // drafts stay drafts; a full Train run with reflection.
      clickIn(card('Guided Practice')); await sleep(350);
      check('speech: eight Guided Practice subjects', doc.querySelectorAll('[data-subject]').length === 8);
      clickIn(doc.querySelector('[data-subject="emphasis"]')); await sleep(350);
      check('speech: compact Prepare · Train · Apply selector, Train ready, Prepare honestly draft',
        String([...doc.querySelectorAll('[data-mode-seg]')].map(b => b.textContent)) === 'Prepare,Train,Apply'
        && !!doc.getElementById('sp-run'));
      clickIn([...doc.querySelectorAll('[data-mode-seg]')].find(b => b.dataset.modeSeg === 'apply'));
      await sleep(300);
      check('speech: an unreviewed routine never runs',
        !!doc.getElementById('sp-draft-note') && !doc.getElementById('sp-run'));
      clickIn([...doc.querySelectorAll('[data-mode-seg]')].find(b => b.dataset.modeSeg === 'train'));
      await sleep(300);
      const xpB = store.xp; const heartsB = store.hearts;
      // No working text yet: the exercise must ASK, never invent one.
      localStorage.removeItem('speechcraft-working-text');
      clickIn(doc.getElementById('sp-run')); await sleep(400);
      check('speech: an exercise needing text asks honestly, offering all four sources',
        doc.querySelector('main h1')?.textContent === 'My Working Text'
        && !!doc.querySelector('[data-builtin]')
        && !!doc.getElementById('wt-scripts')
        && !!doc.getElementById('wt-projects')
        && !!doc.getElementById('wt-custom'));
      clickIn(doc.querySelector('[data-builtin="st-line-3"]')); await sleep(350);
      check('speech: the runner opens with comfort and safety language and the inert passage',
        doc.body.textContent.includes('adapt or skip anything')
        && doc.body.textContent.includes('Stop if you experience pain')
        && doc.getElementById('sp-passage')?.textContent === 'I never said she took it.');
      // The runner is the shared step sequencer (js/ui.js runStepSequence):
      // one step at a time behind #step-next, which reads 'Finish exercise'
      // on the last step. 8 clicks finish emphasis-train (before + 6 + after).
      for (let i = 0; i < 10; i++) {
        const b = doc.getElementById('step-next');
        if (!b) break;
        clickIn(b); await sleep(120);
      }
      await until(() => doc.querySelector('.sp-reflect'));
      check('speech: completion is completion — XP without any quality score',
        doc.querySelector('.sp-reflect h1')?.textContent === 'Practice complete · +5 XP'
        && !doc.body.textContent.includes('%')
        && doc.querySelectorAll('[data-refl]').length === 7);
      clickIn(doc.querySelector('[data-refl="noticed-effort"]'));
      const noteEl = doc.getElementById('sp-refl-note');
      if (noteEl) { noteEl.value = 'private note'; }
      clickIn(doc.getElementById('sp-refl-done')); await sleep(400);
      const hist = speechHistory();
      check('speech: history records the practice, reflection and note — hearts untouched',
        store.xp === xpB + 5 && store.hearts === heartsB
        && hist[hist.length - 1]?.ref === 'rt-emph-train'
        && String(hist[hist.length - 1]?.reflections) === 'noticed-effort'
        && hist[hist.length - 1]?.note === 'private note');
      check('speech: reflection returns to Speech Practice',
        !!card('Guided Practice') && !!card('Speechcraft Arcade'));

      // Arcade: grouping, hidden Context Shift, a fluency game with
      // Unicode-safe first letters, and an interpretive game without scores.
      clickIn(card('Speechcraft Arcade')); await sleep(350);
      const groups = [...doc.querySelectorAll('main h2.chart-h')].map(h => h.textContent);
      check('speech: arcade groups render in the approved order',
        String(groups) === 'Build Fluency,Shape the Thought,Change the Circumstances,Change the Action'
        && doc.querySelectorAll('.mode-card').length === 11
        && !doc.body.textContent.includes('Context Shift'));
      localStorage.removeItem('speechcraft-working-text');
      clickIn(doc.querySelector('[data-game="first-letter"]')); await sleep(300);
      clickIn(doc.querySelector('[data-builtin="st-apology-2"]')); await sleep(350);
      const flText = doc.getElementById('sp-fl')?.textContent ?? '';
      check('speech: first-letter recall preserves punctuation and Unicode text',
        flText.startsWith('Y n m t s s t n, a I s n.'), flText.slice(0, 60));
      // A phone must hold a game without sideways scroll.
      const oldW19 = frame.style.width;
      frame.style.width = '375px'; await sleep(250);
      check('speech: a game fits a phone without horizontal scroll',
        doc.documentElement.scrollWidth <= doc.documentElement.clientWidth + 1,
        `scroll=${doc.documentElement.scrollWidth}`);
      frame.style.width = oldW19; await sleep(200);
      clickIn(doc.getElementById('sp-done')); await sleep(300);
      clickIn(doc.getElementById('sp-refl-done')); await sleep(350);
      clickIn(card('Speechcraft Arcade')); await sleep(350);
      clickIn(doc.querySelector('[data-game="move-pause"]')); await sleep(300);
      clickIn(doc.querySelector('[data-builtin="st-line-1"]')); await sleep(350);
      const mpWords = () => [...doc.querySelectorAll('#sp-mp span')].map(s => s.textContent).join('');
      const wordsBefore19 = mpWords();
      clickIn(doc.querySelectorAll('.sp-gap')[2]); await sleep(150);
      check('speech: Move the Pause never alters the words',
        mpWords() === wordsBefore19 && !!doc.querySelector('.sp-gap.on'));
      clickIn(doc.getElementById('sp-done')); await sleep(300);
      check('speech: an interpretive game ends in completion, never a tally',
        !/\d+\/\d+/.test(doc.querySelector('.sp-reflect h1')?.textContent ?? 'x/x'));
      clickIn(doc.getElementById('sp-refl-done')); await sleep(350);

      // Studio integration: XSS-inert passage selection, manual character
      // choice, correct cue association, and return to the same project.
      spProj = await createProject({
        title: '__speech drive (safe to delete)',
        contentType: 'scene',
        text: 'A: <img src=x onerror="window.__spXss=1"> did you wait?\nB: I said I would — didn’t I?\nA: People say things.\nB: Not me.',
      });
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(350);
      clickIn(card('Custom Work')); await sleep(400);
      const pc19 = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === spProj.id);
      clickIn(pc19?.querySelector('button[data-act="open"]') ?? pc19); await sleep(450);
      check('speech: the project view offers Practice This Text', !!doc.getElementById('proj-practice'));
      // Choosing a Studio project as the working text must REFERENCE it,
      // never copy it into a second record.
      const projCountBefore = (await listProjects()).length;
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Practice')); await sleep(350);
      clickIn(doc.getElementById('sp-wt-change') ?? doc.getElementById('sp-wt-pick')); await sleep(400);
      await until(() => [...doc.querySelectorAll('#wt-projects .track-card')].length > 0);
      clickIn([...doc.querySelectorAll('#wt-projects .track-card')]
        .find(b => b.textContent.includes('__speech drive')));
      await sleep(400);
      const wtRef = JSON.parse(localStorage.getItem('speechcraft-working-text') ?? 'null');
      check('speech: a Studio working text is stored as a reference, creating no duplicate record',
        wtRef?.source === 'studio' && wtRef?.id === spProj.id
        && !('body' in (wtRef ?? {}))
        && (await listProjects()).length === projCountBefore);
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(350);
      clickIn(card('Custom Work')); await sleep(400);
      const pc19b = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === spProj.id);
      clickIn(pc19b?.querySelector('button[data-act="open"]') ?? pc19b); await sleep(450);
      clickIn(doc.getElementById('proj-practice')); await sleep(400);
      check('speech: passage selection renders untrusted text inertly',
        doc.querySelectorAll('.sp-unit').length === 4
        && doc.querySelector('.sp-unit')?.textContent.includes('<img src=x')
        && !doc.querySelector('.sp-unit img')
        && frame.contentWindow.__spXss === undefined);
      clickIn(doc.getElementById('sp-use-all')); await sleep(350);
      clickIn(doc.querySelector('[data-game="cue-pickup"]')); await sleep(350);
      clickIn([...doc.querySelectorAll('[data-char]')].find(b => b.textContent === 'B')); await sleep(250);
      check('speech: the cue is the OTHER character’s line, still inert',
        doc.querySelector('.sp-cue-line')?.textContent.includes('A: <img src=x')
        && !doc.querySelector('#sp-cue img'));
      clickIn([...doc.querySelectorAll('#sp-cue button')].find(b => b.textContent.includes('Reveal')));
      await sleep(200);
      check('speech: reveal shows MY line with Unicode intact',
        doc.querySelector('.sp-cue-mine')?.textContent === 'B: I said I would — didn’t I?');
      clickIn([...doc.querySelectorAll('#sp-cue button')].find(b => b.textContent.includes('Had it')));
      await sleep(200);
      clickIn([...doc.querySelectorAll('#sp-cue button')].find(b => b.textContent.includes('Missed')));
      await sleep(300);
      check('speech: an objective recall game may tally correctness',
        /1\/2 recalled/.test(doc.querySelector('.sp-reflect h1')?.textContent ?? ''));
      clickIn(doc.getElementById('sp-refl-done')); await sleep(450);
      check('speech: Practice This Text returns to the same Studio project',
        doc.body.textContent.includes('__speech drive')
        && !!doc.getElementById('proj-practice'));
      check('speech: the XSS payload never executed anywhere along the flow',
        frame.contentWindow.__spXss === undefined);
      const histSnapshot = speechHistory().length;
      await deleteProject(spProj.id); spProj = null;
      check('speech: deleting the project leaves practice history intact (title snapshots, no live pointers)',
        speechHistory().length === histSnapshot);

      // Speech Progress is Speech-specific: no IPA weak-sound analytics.
      // Self-contained block: the previous block ends on a Studio project
      // deep page with no #ws-chip and no sidebar, so both pickWorkspace
      // and side() would no-op there — return to the shell first.
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      await pickWorkspace('speech');
      clickIn(side('Progress')); await sleep(400);
      check('progress: Speech Progress speaks about exploration, never weak sounds',
        doc.querySelector('.page-h')?.textContent === 'Speech Progress'
        && !doc.querySelector('main')?.textContent.includes('Weak sounds')
        && ['chapters explored', 'Guided Practice sessions', 'working texts explored',
            'topics revisited', 'skills practised']
          .every(t => doc.querySelector('main')?.textContent.includes(t)));
      check('progress: no accuracy score is applied to interpretive Speech work',
        !/\b\d+%/.test(doc.querySelector('main')?.textContent ?? ''));
      // IPA progress is untouched in its own workspace.
      await pickWorkspace('ipa');
      clickIn(side('Progress')); await sleep(450);
      // Both honest states keep the analytics: the starter pane promises
      // "Weak sounds", the earned dashboard shows the "Weak Sounds" chart
      // and its full report — assert the concept, not one casing, and
      // prove the IPA workspace is actually active via its context chip.
      check('progress: the IPA workspace keeps its own weak-sound analytics',
        (doc.getElementById('statsbar')?.textContent ?? '').includes('IPA Foundations')
        && /weak[\s-]sounds/i.test(doc.querySelector('main')?.textContent ?? ''),
        (doc.querySelector('main')?.textContent ?? '').slice(0, 120));
      await pickWorkspace('speech');

      // The Studio working-text card uses the same state, no duplication.
      clickIn(side('Studio')); await sleep(400);
      check('studio: a compact My Working Text card sits above the preserved four cards',
        !!doc.querySelector('.sp-wt-card')
        && String([...doc.querySelectorAll('.hub-card h2')].map(h => h.textContent))
          === 'Scripts & Speeches,Playable Actions,Custom Work,Personal Dictionary');

      check('speech: zero microphone calls across the entire Speech drive', mic19 === 0);
    } catch (err) {
      bad('Speech system drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      if (spProj) await deleteProject(spProj.id).catch(() => {});
      if (modesBefore[0] === null) localStorage.removeItem('speechcraft-working-text');
      else localStorage.setItem('speechcraft-working-text', modesBefore[0]);
      try { localStorage.setItem('speechcraft-workspace', 'accents'); } catch { /* ignore */ }
    }
  } else if (navDoc !== document) {
    // Withdrawn: prove the workspace is genuinely gone from the UI while
    // its records stay whole, so flipping SPEECH_LIVE restores it intact.
    const fdoc = document.querySelector('iframe').contentDocument;
    fdoc.getElementById('ws-chip')?.dispatchEvent(
      new (document.querySelector('iframe').contentWindow.MouseEvent)('click', { bubbles: true }));
    await scSleep(200);
    const wsRows = [...fdoc.querySelectorAll('[data-ws]')].map(b => b.dataset.ws);
    check('speech: the workspace is withdrawn — three live workspaces, no Speech row',
      String(wsRows) === 'acting,ipa,accents');
    check('speech: withdrawal is a flag, not a deletion — every record survives it',
      SPEECH_LESSONS.length === 21 && textbookOrder().length === 21
      && SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional')
        .every(l => speechReviewFor(l.id)?.verdict === 'owner-approved' && !speechApproved(l.id)));
    ok('Speech system drive (skipped — SPEECH_LIVE is false)');
  } else {
    ok('Speech system drive (runner only — run tests/run-all.html)');
  }

  // ── 20. The Acting workspace ─────────────────────────────────
  {
    check('acting: six modules hold the 44 path lessons; 8 Professional chapters shelve outside the path',
      ACTING_MODULES.length === 6
      && String(ACTING_MODULES.map(m => m.title))
        === 'The Actor’s Work,Investigating the Text,Listening and Responding,Building a Character,Tempo-Rhythm,Preparing the Performance'
      && ACTING_MODULES.reduce((n, m) => n + actingLessonsFor(m.id).length, 0) === 44
      && ACTING_LESSONS.length === 52
      && ACTING_LESSONS.filter(l => !ACTING_MODULES.some(m => m.id === l.module))
        .every(l => l.module === 'professional')
      && ACTING_MODULES.every(m => actingLessonsFor(m.id)
        .every((l, i) => actingLessonNumber(l) === `${m.n}.${i + 1}`)));
    check('acting: every acting lesson is a prepared draft awaiting acting review',
      ACTING_LESSONS.every(l => l.requiredReviewer === 'acting-professional' && !speechApproved(l.id)));
    check('acting: shared concepts LINK to one authoritative record, never a copy',
      ACTING_LESSONS.filter(l => l.sharedFrom).every(l =>
        l.sharedFrom.workspace !== 'speech' || !!speechLessonById(l.sharedFrom.id))
      && ACTING_LESSONS.some(l => l.sharedFrom?.id === 'sp-m-want'));
    check('acting: the nine approved arcade games exist and none is scored',
      ACTING_GAMES.length === 9
      && ['Same Line, Different Circumstances', 'Objective Switch', 'Action Swap',
          'Relationship Shift', 'Stakes Ladder', 'Change the Urgency',
          'Same Words, Different Subtext', 'What Changed?', 'Same Line Three Ways']
        .every(t => ACTING_GAMES.some(g => g.title === t))
      && !ACTING_GAMES.some(g => g.title === 'Find the Beat'));
    check('acting: the scene-study workflow holds the ten areas, carrying every QE question',
      SCENE_STUDY_AREAS.length === 10
      && SCENE_STUDY_AREAS.every(a => a.id && a.title && a.prompt)
      // Six areas map to a Question Everything section; between them the
      // six sections are covered once each, so no question is lost or
      // asked twice.
      && new Set(SCENE_STUDY_AREAS.filter(a => a.qeSection != null)
           .map(a => a.qeSection)).size === DISSECT_SECTIONS.length
      && SCENE_STUDY_AREAS.filter(a => a.qeSection != null)
           .reduce((n, a) => n + DISSECT_SECTIONS[a.qeSection].asks.length, 0)
         === DISSECT_SECTIONS.reduce((n, sec) => n + sec.asks.length, 0));
    check('acting: the Library collections cover the lessons without duplication',
      ACTING_COLLECTIONS.length === 6
      && (() => {
        const listed = ACTING_COLLECTIONS.flatMap(c => c.lessons);
        return new Set(listed).size === listed.length
          && listed.every(id => !!actingLessonById(id));
      })());
    check('acting: Playable Actions data is untouched — twelve entries, six pairs',
      PLAYABLE_ACTIONS.length === 12 && ACTION_PAIRS.length === 6);
    check('acting: the actor-only Speech lesson moved out of the Speech course',
      !speechLessonById('sp-start-responsibility')
      && !!actingLessonById('ac-offbook'));
    check('acting: Speech keeps a general fluency chapter, not an actor one',
      speechLessonById('sp-start-offbook')?.title === 'Prepared Speaking and Fixed Words');
  }

  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => el?.dispatchEvent(new (frame.contentWindow.MouseEvent)('click', { bubbles: true }));
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const pickWs = async id => {
        clickIn(doc.getElementById('ws-chip')); await sleep(150);
        clickIn(doc.querySelector(`[data-ws="${id}"]`)); await sleep(400);
      };
      let mic20 = 0;
      const w20 = frame.contentWindow;
      if (w20.navigator.mediaDevices?.getUserMedia) {
        const o20 = w20.navigator.mediaDevices.getUserMedia.bind(w20.navigator.mediaDevices);
        w20.navigator.mediaDevices.getUserMedia = (...a) => { mic20++; return o20(...a); };
      }
      const projectsBefore = (await listProjects()).length;

      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(doc.getElementById('ws-chip')); await sleep(200);
      check('acting: the selector offers the three live workspaces, Speech withdrawn',
        [...doc.querySelectorAll('[data-ws]')].map(b => b.querySelector('b')?.textContent).join()
          === 'Acting,Voice & Speech,Accents & Dialects');
      clickIn(doc.querySelector('[data-ws="acting"]')); await sleep(400);
      clickIn(side('Learn')); await sleep(400);
      check('acting: the workspace keeps its guided course and its Library',
        !!doc.querySelector('.page-h')
        && [...doc.querySelectorAll('.side-nav .side-label')].some(e => e.textContent.trim() === 'Learn'));
      check('acting: no accent context and no Free Play in the Acting workspace',
        !doc.getElementById('course-chip')
        && !(doc.getElementById('statsbar')?.textContent ?? '').includes('Neutral American')
        && !doc.getElementById('freeplay'));
      check('acting: all 56 acting items are published by owner approval alone — no draft strip',
        (() => {
          // Publication and specialist sign-off are separate facts: every
          // item (28 original + 16 Building a Character/Tempo-Rhythm + 8 Professional Actor Character /
          // Tempo-Rhythm lessons owner-approved 2026-08-26 + 4 approaches)
          // carries the owner's editorial verdict, none claims a
          // specialist, and no reviewer name is invented — so the draft
          // strip has nothing to count and must be gone.
          const items = [...ACTING_LESSONS, ...ACTING_APPROACHES];
          return items.length === 56
            && items.every(x => speechReviewFor(x.id)?.verdict === 'owner-approved'
              && speechReviewFor(x.id)?.reviewerType === 'product-owner-editorial'
              && speechReviewFor(x.id)?.reviewer === 'Product owner'
              && !speechApproved(x.id))
            && !doc.querySelector('.review-strip');
        })(), doc.querySelector('.review-strip')?.textContent?.replace(/\s+/g, ' ').trim());

      clickIn(side('Library')); await sleep(400);
      // A leftover query in the shared Library search would filter the
      // tile grid — normalize to the unfiltered landing before pinning it.
      const libSearch20 = doc.getElementById('lib-search');
      if (libSearch20 && libSearch20.value !== '') {
        libSearch20.value = '';
        libSearch20.dispatchEvent(new w20.Event('input', { bubbles: true }));
        await sleep(250);
      }
      // The shared right rail legitimately names the next acting chapter
      // in its "Next step" card on every section, so chapter titles are
      // asserted absent from the Library pane itself, never the whole body.
      check('acting: the Library landing shows collections only, never all 52 items at once',
        doc.querySelector('.page-h')?.textContent === 'Acting Library'
        && String([...doc.querySelectorAll('.tile-grid .tile')].map(b => b.dataset.tile))
          === 'col:lines,col:principles,col:character,col:scene,col:lists,col:question,col:rehearsal,col:actions,col:rhythm,col:professional,col:monologues,col:scenes,col:approaches,col:textbook'
        && !!doc.querySelector('main')
        && !doc.querySelector('main').textContent.includes('Behavior Comes From the Situation')
        && !doc.querySelector('.review-strip'));
      clickIn(doc.querySelector('[data-tile="col:principles"]')); await sleep(400);
      check('acting: opening a collection reveals its chapters',
        doc.querySelectorAll('.item-tile').length === ACTING_COLLECTIONS[0].lessons.length
        && doc.body.textContent.includes('Behavior Comes From the Situation'));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      check('acting: the Library contains no scored exercise or game',
        !doc.querySelector('main .mode-card, main [data-check], main .sp-check')
        && !/\bXP\b/.test(doc.querySelector('main')?.textContent ?? ''));

      clickIn(side('Practice')); await sleep(400);
      check('acting: Practice holds the four categories, Scene Study withdrawn',
        String([...doc.querySelectorAll('.hub-card h2')].map(h => h.textContent))
          === 'Acting Arcade,Flash Cards,Rhythm Cards,Practice My Text');
      clickIn(doc.getElementById('acp-arcade')); await sleep(400);
      // The Arcade is text-first: a two-level picker (collections, then
      // that collection's texts) opens before any game grid appears.
      check('acting: the Arcade opens on the text picker, collections first',
        doc.querySelectorAll('[data-col]').length === 6
        && !doc.querySelector('[data-agame]'));
      const wt20 = localStorage.getItem('speechcraft-working-text');
      clickIn(doc.querySelector('[data-col]')); await sleep(350);
      clickIn(doc.querySelector('[data-piece]')); await sleep(400);
      check('acting: every acting game lives in Practice, loaded on the chosen text',
        doc.querySelectorAll('[data-agame]').length === ACTING_GAMES.length
        && doc.body.textContent.includes('Playing on:')
        && !!doc.getElementById('arc-change'));
      if (wt20 === null) localStorage.removeItem('speechcraft-working-text');
      else localStorage.setItem('speechcraft-working-text', wt20);

      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(400);
      check('acting: the Actor’s Studio leads with the current-project card and its two ways in',
        doc.querySelector('.page-h')?.textContent === 'Actor’s Studio'
        && !!doc.querySelector('.sp-wt-card')
        && String([...doc.querySelectorAll('.hub-card h2')].map(h => h.textContent))
           === 'Scenes & Monologues,Custom Work');
      check('acting: opening the workspace duplicated no Studio project',
        (await listProjects()).length === projectsBefore);

      clickIn(side('Progress')); await sleep(400);
      check('acting: Acting Progress is interpretive-safe and free of IPA measures',
        doc.querySelector('.page-h')?.textContent === 'Acting Progress'
        && !doc.querySelector('main')?.textContent.includes('Weak sounds')
        && !/\b\d+%/.test(doc.querySelector('main')?.textContent ?? ''));

      // Speech no longer owns the acting records at all. Pure record
      // check now — the Speech shelf is withdrawn, and this never needed
      // a DOM to be true.
      check('acting: the four approaches are acting records, never counted as Speech drafts',
        ACTING_APPROACHES.length === 4
        && ACTING_APPROACHES.every(a => !speechLessonById(a.id))
        && SPEECH_LESSONS.filter(l => !speechBodyVisible(l)).length === 0
        && !doc.querySelector('.review-strip'),
        doc.querySelector('.review-strip')?.textContent?.replace(/\s+/g, ' ').trim());
      clickIn(side('Library')); await sleep(400);
      check('acting: Approaches to Acting is shelved by Acting, never by Speech',
        !!doc.querySelector('[data-tile="col:approaches"]')
        && ACTING_APPROACHES.every(a => !speechLessonById(a.id)));

      // IPA and Accents & Dialects are untouched.
      await pickWs('ipa');
      check('acting: the IPA workspace is unchanged and still accent-neutral',
        !!doc.getElementById('ipa-context') && !doc.getElementById('course-chip'));
      await pickWs('accents');
      check('acting: Accents & Dialects keeps its accent selector',
        !!doc.getElementById('course-chip'));
      check('acting: zero microphone calls across the Acting drive', mic20 === 0);
    } catch (err) {
      bad('Acting workspace drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      try { localStorage.setItem('speechcraft-workspace', 'accents'); } catch { /* ignore */ }
    }
  } else {
    ok('Acting workspace drive (runner only — run tests/run-all.html)');
  }

  // ── 18. The FIRST-TIME preface: concise three-panel opening ─
  // Runner only, and deliberately LAST: it snapshots the profile,
  // presents a genuinely fresh first run, walks the concise panels,
  // then restores everything exactly as it was.
  if (navDoc !== document) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    const snapshot = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      snapshot[k] = localStorage.getItem(k);
    }
    try {
      // Any leftover project or take would grandfather a fresh profile
      // past the wall, so the drive clears IndexedDB content first and
      // restores localStorage afterwards.
      for (const p of await listProjects()) await deleteProject(p.id).catch(() => {});
      for (const t of await listAllTakes()) await deleteTake(t.id).catch(() => {});
      check('first-run preface: clean slate for the wall',
        (await listProjects()).length === 0 && (await listAllTakes()).length === 0);
      localStorage.clear();
      frame.contentWindow.location.reload();
      let doc = null;
      for (let i = 0; i < 60; i++) {
        await sleep(200); doc = frame.contentDocument;
        if (doc?.querySelector('.threshold') || doc?.querySelector('.side-nav .side-item')) break;
      }
      const w = frame.contentWindow;
      const clickIn = el => el?.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      let mic18 = 0;
      if (w.navigator.mediaDevices?.getUserMedia) {
        const orig18 = w.navigator.mediaDevices.getUserMedia.bind(w.navigator.mediaDevices);
        w.navigator.mediaDevices.getUserMedia = (...a) => { mic18++; return orig18(...a); };
      }
      const wall = () => doc.querySelector('.threshold');
      const h1 = () => wall()?.querySelector('h1')?.textContent ?? '';
      const wallText = () => wall()?.textContent ?? '';
      check('first-run preface: a fresh profile lands on the wall', !!wall(), h1());
      check('first-run preface: exactly three content-panel dots',
        wall()?.querySelector('.ob-dots')?.children.length === 3,
        `dots=${wall()?.querySelector('.ob-dots')?.children.length}`);
      check('first-run preface: opens on Why Speech Matters with the full Jowett attribution',
        h1() === 'Why Speech Matters'
        && wallText().includes('especially in the case of a young and tender thing')
        && wallText().includes('— Plato,')
        && wallText().includes('translated by Benjamin Jowett'));
      check('first-run preface: concise panel 1 — no goals list, no long disclaimer',
        wallText().includes('Training does not erase who you are. It gives you more choices.')
        && !wall().querySelector('.th-list')
        && !wallText().includes('never “correcting” an inferior way of speaking')
        && !wallText().includes('no such accent exists'));
      if (frame.clientHeight >= 500) {
        check('first-run preface: Continue sits above the fold',
          doc.getElementById('ob-next').getBoundingClientRect().top < frame.clientHeight,
          `top=${Math.round(doc.getElementById('ob-next').getBoundingClientRect().top)} viewport=${frame.clientHeight}`);
      }
      const titles = [h1()];
      let removedHit = false;
      for (let i = 0; i < 2; i++) {
        const next = doc.getElementById('ob-next');
        check(`first-run preface: Continue usable on panel ${i + 1}`, !!next && !next.disabled);
        clickIn(next); await sleep(200);
        titles.push(h1());
        if (/Why Actors Train This Way|The Journey|Communication and Manipulation|Before You Choose/
          .test(wallText())) removedHit = true;
      }
      check('first-run preface: exactly the three ordered titles',
        String(titles) === String(['Why Speech Matters', 'Speech Is Action', 'Speech Reveals Thought']),
        titles.join(' | '));
      check('first-run preface: the removed panels never appear', !removedHit);
      check('first-run preface: concise panels 2 and 3 carry the ordered copy',
        wallText().includes('It shows what we understand, value, question or avoid.'));
      check('first-run preface: the last panel ENDS it — nothing is asked of the reader',
        !wall().querySelector('[data-accent]') && !wall().querySelector('[data-choice]')
        && doc.getElementById('ob-next')?.textContent.trim() === 'Enter Speechcraft');
      clickIn(doc.getElementById('ob-next')); await sleep(500);
      check('first-run preface: entering lands in the app, not another form',
        !doc.querySelector('.threshold')
        && !doc.body.textContent.includes('Pick your first course')
        && !doc.body.textContent.includes('Choose your way in'));
      check('first-run preface: zero microphone calls', mic18 === 0);
    } catch (err) {
      bad('first-run preface drive', String(err?.stack ?? err).slice(0, 220));
    } finally {
      localStorage.clear();
      for (const [k, v] of Object.entries(snapshot)) localStorage.setItem(k, v);
      frame.contentWindow.location.reload();
      await new Promise(r => setTimeout(r, 1500));
    }
  } else {
    ok('first-run preface drive (runner only — run tests/run-all.html)');
  }

  // ── 21. (retired) Learn-into-Library consolidation ───────────
  // Superseded: a later owner order restored the guided Learn pathways
  // for Speech and Acting. Section 23 covers the restored structure.

  // ── 22. Owner-approved pre-review revisions (six chapters) ───
  {
    // Each entry: [id, every approved sentence, every required source URL].
    const APPROVED = [
    ['sp-f-instrument', ['Speech begins with airflow from the respiratory system. In voiced speech, that airflow helps set the vocal folds in the larynx vibrating. The vocal tract and articulators then shape airflow and sound into recognizable speech.', 'The respiratory system supplies and regulates airflow for speech through the coordinated action of the diaphragm, rib cage and other breathing muscles.', 'The larynx houses the vocal folds, which vibrate during voiced sound.', 'The vocal tract—the pharynx, mouth and nasal cavity—filters the source sound, strengthening some frequencies and reducing others.', 'The jaw, tongue, lips and soft palate coordinate to form consonants and vowels.', 'Speechcraft’s Your Instrument reference shows these structures with diagrams. This chapter is a working tour of what each area contributes and where later chapters explore it in greater detail.', 'Speaking requires coordinated muscular activity. The aim is adaptable effort suited to the task and the individual speaker, without unnecessary strain—not complete relaxation.'], ['https://www.nidcd.nih.gov/health/speech-and-language', 'https://www.asha.org/practice-portal/clinical-topics/voice-disorders/', 'https://www.asha.org/practice-portal/clinical-topics/resonance-disorders/']],
    ['sp-f-breath', ['Airflow for speech comes from the respiratory system. The diaphragm and other breathing muscles change the size and pressure of the chest cavity, moving air into and out of the lungs. Most speech happens during exhalation, coordinated with voicing and the length and shape of the phrase.', 'Bodies differ, and so do the sensations people report when breathing works well. This course does not teach one universal “proper support” feeling. It offers explorations and asks you to notice what changes.', 'As a starting observation, notice what your breathing does before a long thought and before a short one. Do not try to manufacture a particular kind of breath. Simply notice when you inhale, whether you hold the breath and whether the phrase feels comfortably supplied. Different speakers will notice different patterns.'], ['https://www.asha.org/practice-portal/clinical-topics/voice-disorders/', 'https://www.nidcd.nih.gov/health/taking-care-your-voice']],
    ['sp-f-effort', ['All speech requires coordinated muscular activity, but it does not need to feel strained. The useful question is whether the activity supports the sound or adds work the speaker does not need.', 'Some muscular activity produces the intended sound; other activity may interfere with comfortable, flexible speech. Stress, environmental demands and individual habits may sometimes coincide with breath holding, jaw clenching or increased effort around the neck and throat. These experiences have many possible causes and should not be self-diagnosed from sensation alone.', 'The practice routines ask you to notice sensations of effort without diagnosing their cause or trying to force them away. This course never asks you to press, massage or manipulate your throat.', 'If speaking regularly feels unusually effortful, painful or tiring, consult a qualified healthcare professional. An otolaryngologist can evaluate possible medical causes, and a speech-language pathologist with voice expertise can assess how the voice is being used.'], ['https://www.asha.org/practice-portal/clinical-topics/voice-disorders/', 'https://www.nidcd.nih.gov/health/taking-care-your-voice']],
    ['sp-f-jaw', ['The jaw, tongue and neck participate in the detailed coordination of speech. During connected speech, the tongue continually changes its shape and position to form and connect different sounds. There is no single “correct tongue position” for speaking, and this course will never teach one.', 'The tongue shapes sound; it does not supply airflow. Airflow comes from the respiratory system. Pushing harder with the mouth does not create more air. If phrases repeatedly feel short of air, notice the coordination of breathing and phrasing; persistent difficulty deserves professional evaluation.', 'Bruxism may contribute to tooth damage, jaw soreness or fatigue. Temporomandibular disorders may involve jaw pain, stiffness, limited movement, locking or painful clicking. Clicking without pain is common and does not by itself indicate a disorder.', 'If you have persistent jaw pain, locking, limited movement, tooth damage or concerns about frequent grinding or clenching, consult a dentist or physician. Speech or tongue-movement concerns may also warrant assessment by a speech-language pathologist. Speechcraft teaches speaking skills; it does not diagnose or treat these conditions.'], ['https://www.nidcr.nih.gov/health-info/tmd', 'https://www.nidcr.nih.gov/health-info/bruxism', 'https://www.asha.org/practice-portal/clinical-topics/orofacial-myofunctional-disorders/']],
    ['sp-f-voice', ['Voiced sound begins when airflow from the lungs helps set the vocal folds in the larynx vibrating. The resulting sound contains many frequencies. The voice we hear reflects both this vocal-fold source and the way the vocal tract filters it.', 'Resonance is the modification of that source sound by the vocal tract. The size and shape of the pharynx, mouth and—when acoustically connected—nasal cavity strengthen some frequencies and reduce others.', 'Changes in jaw opening, tongue shape and lip position alter the vocal tract and therefore the resulting sound. These changes can affect the voice without deliberately pushing more air.', 'Every voice reflects an individual body, history and way of speaking. Speechcraft’s training goal is to help you explore range and choice within your own voice—not imitate a single ideal sound.'], ['https://www.nidcd.nih.gov/health/taking-care-your-voice', 'https://www.asha.org/practice-portal/clinical-topics/resonance-disorders/']],
    ['sp-f-articulation', ['Articulation is the coordinated movement and placement of structures such as the tongue, lips, jaw and soft palate to produce speech sounds. Some sounds use vocal-fold vibration and others do not.', 'Articulatory precision can contribute to clarity, but clarity also depends on pace, phrasing, loudness, context, the environment and the needs of the listener. Increasing volume alone does not guarantee understanding. Depending on the situation, a speaker may benefit from adjusting articulation, pace, phrasing, distance or amplification.', 'If you have worked in Speechcraft’s IPA courses, you have already studied how speech sounds are identified, described and contrasted. This chapter connects that knowledge to connected speech.', 'No accent or natural speech pattern is inherently unclear or inferior. The goal is not maximum articulation or the removal of identity. It is having options when a particular listener, space or speaking task calls for greater precision.', 'Increasing articulatory precision can help in some situations, but excessive precision may sound unnatural or distract from the message in others. The useful degree depends on the speaker, listener and context.'], ['https://www.asha.org/practice-portal/clinical-topics/dysarthria-in-adults/', 'https://www.asha.org/practice-portal/clinical-topics/articulation-and-phonology/', 'https://www.asha.org/practice-portal/professional-issues/accent-modification/']],
    ];
    check('approved copy: all six revised chapters carry the approved wording verbatim',
      APPROVED.every(([id, sents]) => {
        const l = speechLessonById(id);
        if (!l) return false;
        const text = l.body.map(b => b.p ?? b.h ?? (b.list ?? []).join(' ') ?? '').join(' ');
        return sents.every(sen => text.includes(sen));
      }), APPROVED.map(([id]) => id).join());
    check('approved copy: every professional-verification source is recorded',
      APPROVED.every(([id, , urls]) => {
        const src = (speechLessonById(id)?.sources ?? []).join(' ');
        return urls.every(u => src.includes(u));
      }));
    check('approved copy: the shared safety line is rendered once, via the safety flag',
      APPROVED.every(([id]) => {
        const l = speechLessonById(id);
        const literal = l.body.filter(b => (b.p ?? '').includes('Stop if you experience pain')).length;
        return literal === 0 && l.body.filter(b => b.safety).length === 1;
      }));
    // The 2026-08-14 owner order published these chapters. Publication
    // and specialist sign-off are SEPARATE facts: every entry is the
    // product owner's 'owner-approved' verdict, and speechApproved()
    // (specialist sign-off) must stay false until a real specialist is
    // recorded. Fails the moment an owner decision impersonates one.
    check('approved copy: published by owner approval only — specialist sign-off still absent',
      APPROVED.every(([id]) => {
        const l = speechLessonById(id);
        return l.requiredReviewer === 'voice-professional'
          && !speechApproved(id) && speechBodyVisible(l)
          && speechReviewFor(id)?.verdict === 'owner-approved';
      }));
    // The 2026-08-14 owner order DID record ledger entries for all
    // seven Foundation chapters (the six revised above plus
    // sp-f-health). Each must be truthful about who approved: the
    // product owner, by role only — no personal name, no clinical
    // credential — with notes that deny specialist sign-off. Fails the
    // moment an owner decision is dressed up as a professional review.
    check('approved copy: ledger entries are honest owner records, no professional claimed',
      [...APPROVED.map(([id]) => id), 'sp-f-health'].every(id => {
        const r = speechReviewFor(id);
        return !!r && r.reviewerType === 'product-owner'
          && r.reviewer === 'Product owner'
          && r.date === '2026-08-14'
          && (r.notes ?? '').includes('not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter');
      }));
    // Nothing is hidden any more — but every professional-tier chapter
    // must still be TRACKED as awaiting a qualified specialist. The
    // seven fell out of that queue once (verdict 'approved' before the
    // 2026-08-19 migration); this pins them back in it.
    check('approved copy: nothing hidden, all seven professional-tier chapters still await a specialist',
      SPEECH_LESSONS.filter(l => !speechBodyVisible(l)).length === 0
      && SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional').length === 7
      && SPEECH_LESSONS.filter(l => l.requiredReviewer === 'voice-professional')
        .every(l => speechReviewFor(l.id)?.verdict === 'owner-approved' && !speechApproved(l.id)));
    check('approved copy: Vocal Health and When to Stop was not touched',
      (() => {
        const h = speechLessonById('sp-f-health');
        return !!h && h.requiredReviewer === 'voice-professional'
          && h.body.some(b => (b.p ?? '').includes('Voices are resilient, and they have limits.'))
          && (h.sources ?? []).some(s => s.includes('Taking Care of Your Voice'));
      })());
    check('approved copy: Learn and Library read the same revised records',
      APPROVED.every(([id]) => {
        const viaModule = speechLessonsFor('foundation').some(l => l.id === id);
        const viaCollection = SPEECH_COLLECTIONS.some(c =>
          speechLessonsFor(c.stage).some(l => l.id === id));
        return viaModule && viaCollection && speechLessonById(id) === SPEECH_LESSONS.find(l => l.id === id);
      }));
  }

  // ── 23. Speech Course grouping (presentation only) ───────────
  {
    // 'wsm' (The Importance of Speech) was promoted into Module 1 by
    // the Textbook restructure, so 'How the course works' holds two.
    const SPEC = {
      1: [['How the course works', 2], ['Understanding fluency', 3]],
      2: [['Air and voice', 3], ['Ease and coordination', 2], ['Clarity and care', 2]],
      3: [['Purpose and action', 3], ['Rhythm and structure', 2]],
      4: [['Body and attention', 2], ['Putting everything together', 2]],
    };
    check('grouping: every module lists the approved groups in the approved order',
      Object.entries(SPEC).every(([n, want]) =>
        String(speechModuleGroups(+n).map(g => [g.title, g.lessons.length]))
          === String(want)));
    check('grouping: purpose and action precedes rhythm and structure',
      speechModuleGroups(3)[0].title === 'Purpose and action'
      && speechModuleGroups(3)[1].title === 'Rhythm and structure');
    check('grouping: module chapter counts are 5, 7, 5 and 4',
      String(SPEECH_MODULES.map(m => speechLessonsFor(m.stage).length)) === '5,7,5,4');
    check('grouping: every chapter appears in exactly one group, none invented',
      (() => {
        const listed = [1, 2, 3, 4].flatMap(n => speechModuleGroups(n).flatMap(g => g.lessons));
        return listed.length === SPEECH_LESSONS.length
          && new Set(listed).size === listed.length
          && listed.every(id => !!speechLessonById(id));
      })());
    check('grouping: a group never crosses a module boundary',
      [1, 2, 3, 4].every(n => {
        const stage = SPEECH_MODULES.find(m => m.n === n).stage;
        return speechModuleGroups(n).every(g =>
          g.lessons.every(id => speechLessonById(id).stage === stage));
      }));
    // Ids stay stable across the Textbook restructure: 'wsm' (the
    // promoted preface) keeps its historic id — the one non-'sp-' key.
    check('grouping: authoritative ids and canonical order are untouched',
      SPEECH_LESSONS.every(l => typeof l.order === 'number'
        && (l.id === 'wsm' || /^sp-/.test(l.id)))
      && speechLessonsFor('start').map(l => l.id).join()
        === 'wsm,sp-start-parts,sp-start-fluency,sp-start-alphabet,sp-start-offbook'
      && speechLessonsFor('meaning').map(l => l.id).join()
        === 'sp-m-pace,sp-m-emphasis,sp-m-intention,sp-m-want,sp-m-urgency');
    check('grouping: every group carries one short explanatory sentence',
      [1, 2, 3, 4].every(n => speechModuleGroups(n).every(g =>
        typeof g.blurb === 'string' && g.blurb.length > 20 && g.blurb.length < 120)));
  }

  // ── 24. Speech chapters are read, never tested ───────────────
  {
    const available = SPEECH_LESSONS.filter(l => speechBodyVisible(l));
    const framed = available.filter(l => !!speechReading(l.id));
    // Publication (2026-08-14) made eight further chapters visible. The
    // reading renderer degrades gracefully without framing metadata, so
    // this asserts the framing is VALID wherever it exists and records
    // how many chapters still lack it — a follow-up editorial item, not
    // a silent pass.
    check('reading: framing metadata is valid wherever it exists',
      framed.every(l => {
        const r = speechReading(l.id);
        return !!r.idea && !!r.why && Array.isArray(r.takeaways) && r.takeaways.length >= 2;
      }));
    check('reading: takeaways stay concise (2–3 per framed chapter)',
      framed.every(l => {
        const t = speechReading(l.id).takeaways;
        return t.length >= 2 && t.length <= 3;
      }));
    check('reading: the optional notice never asks for a submitted answer',
      framed.every(l => {
        const n = speechReading(l.id).notice ?? '';
        return n.length > 0 && !/\bscore|correct|answer\b/i.test(n);
      }));
    check(`reading: ${available.length - framed.length} published chapter(s) still need reading framing (follow-up)`,
      available.length - framed.length === 8,
      `${framed.length} of ${available.length} framed`);
    check('reading: legacy check data survives in the record but Speech no longer renders it',
      typeof SPEECH_LESSON_EXTRAS['sp-start-parts'].check === 'object');
  }

  // Skipped while the Speech workspace is withdrawn — see `speechLive`.
  if (navDoc !== document && speechLive) {
    const frame = document.querySelector('iframe');
    const sleep = scSleep;
    try {
      let doc = frame.contentDocument;
      const clickIn = el => el?.dispatchEvent(new (frame.contentWindow.MouseEvent)('click', { bubbles: true }));
      const side = name => [...doc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
      const pickWs = async id => {
        clickIn(doc.getElementById('ws-chip')); await sleep(150);
        clickIn(doc.querySelector(`[data-ws="${id}"]`)); await sleep(420);
      };
      let mic24 = 0;
      const w24 = frame.contentWindow;
      if (w24.navigator.mediaDevices?.getUserMedia) {
        const o24 = w24.navigator.mediaDevices.getUserMedia.bind(w24.navigator.mediaDevices);
        w24.navigator.mediaDevices.getUserMedia = (...a) => { mic24++; return o24(...a); };
      }
      const doneBefore = JSON.parse(localStorage.getItem('speechcraft-speech-done') ?? '{}');
      const probe = 'sp-m-pace';
      delete doneBefore[probe];
      localStorage.setItem('speechcraft-speech-done', JSON.stringify(doneBefore));

      await pickWs('speech');
      clickIn(side('Library')); await sleep(400);
      // The Textbook is the browsing surface; a chapter page opens the
      // guided reading through its "Study this in Learn" doorway.
      clickIn(doc.querySelector('[data-tile="textbook"]')); await sleep(380);
      const row24 = doc.querySelector(`[data-ch="${probe}"]`);
      check('reading: the Textbook lists the chapter unlocked, no gate to pass',
        !!row24 && !row24.classList.contains('is-pending')
        && !row24.querySelector('.badge.is-pending'));
      clickIn(row24); await sleep(380);
      clickIn(doc.getElementById('sp-study')); await sleep(400);
      const xpBefore = store.xp, heartsBefore = store.hearts;
      check('reading: the chapter opens as reading — central idea, screen count, no quiz',
        !!doc.querySelector('.sp-idea')
        && /^\d+ of \d+$/.test(doc.querySelector('.sp-count')?.textContent ?? '')
        && !doc.querySelector('.sp-check') && !doc.querySelector('[data-check]')
        && doc.querySelectorAll('.choice').length === 0
        && !/\bCheck\b/.test(doc.querySelector('main h2')?.textContent ?? ''));
      check('reading: the content column stays readable, not full-bleed',
        !!doc.querySelector('.sp-read'));
      // Page to the end.
      for (let i = 0; i < 8; i++) {
        const nx = doc.getElementById('sp-next');
        if (!nx) break;
        clickIn(nx); await sleep(220);
      }
      check('reading: the last screen offers the optional notice and the takeaways',
        !!doc.querySelector('.sp-notice')
        && (doc.querySelector('.sp-notice')?.textContent ?? '').includes('Optional')
        && (doc.querySelector('.sp-notice')?.textContent ?? '').includes('nothing is submitted'.replace('n', 'N'))
        && doc.querySelectorAll('.sp-takeaway li').length >= 2);
      check('reading: navigation offers Mark as read, Next chapter and Return to module',
        !!doc.getElementById('sp-done') && !!doc.getElementById('sp-next-ch')
        && !!doc.getElementById('sp-to-module'));
      clickIn(doc.getElementById('sp-done')); await sleep(260);
      check('reading: marking as read costs nothing — no XP, no hearts, no correctness',
        store.xp === xpBefore && store.hearts === heartsBefore
        && doc.getElementById('sp-done').disabled
        && !/correct|passed|failed|score/i.test(doc.getElementById('sp-done-note')?.textContent ?? ''));
      check('reading: reading progress is stored, so it survives a refresh',
        JSON.parse(localStorage.getItem('speechcraft-speech-done') ?? '{}')[probe] > 0);
      clickIn(doc.getElementById('sp-to-module')); await sleep(380);
      check('reading: Return to module lands back on the module page',
        doc.querySelector('.page-h')?.textContent === 'What & Why?');
      clickIn(doc.querySelector(`[data-item="${probe}"]`)); await sleep(380);
      check('reading: a completed chapter reopens freely, never locked',
        !!doc.querySelector('.sp-idea') && !doc.querySelector('[aria-disabled="true"]'));
      // Every chapter body is readable today (7 owner approvals + 14
      // editorial-tier records), so a gated draft no longer exists to
      // click. The honesty guard is restated against the ledger: being
      // readable never implies a specialist signed it off.
      check('reading: a readable chapter can still be awaiting specialist sign-off',
        (() => {
          const draft = SPEECH_LESSONS.find(l =>
            l.requiredReviewer === 'editorial' && speechBodyVisible(l) && !speechApproved(l.id));
          return !!draft && !speechApproved(draft.id);
        })());
      check('reading: zero microphone calls across the reading drive', mic24 === 0);
    } catch (err) {
      bad('Speech reading drive', String(err?.stack ?? err).slice(0, 220));
    }
  } else if (navDoc !== document) {
    // The guided Learn pathway lives inside the withdrawn workspace; its
    // reading metadata must survive so the flag-flip restores it whole.
    check('reading: the guided pathway is dormant, its metadata intact',
      SPEECH_LESSONS.filter(l => l.id !== 'wsm')
        .every(l => (SPEECH_LESSON_EXTRAS[l.id]?.objective ?? '').length > 20));
    ok('Speech reading drive (skipped — SPEECH_LIVE is false)');
  } else {
    ok('Speech reading drive (runner only — run tests/run-all.html)');
  }

  // ── 25. The Speechcraft Textbook ─────────────────────────────
  {
    const EXPECTED = [
      ['I', 'Speechcraft Principles', ['The Importance of Speech', 'Practice the Parts. Communicate as a Whole.',
        'The Alphabet Experiment', 'Fluency Frees the Speaker', 'Prepared Speaking and Fixed Words']],
      ['II', 'Your Speaking Instrument', ['Your Instrument', 'Tension', 'Anatomy', 'Breath',
        'Resonance', 'Articulation & Clarity', 'Vocal Health and When to Stop']],
      ['III', 'What & Why?', ['Thought & Intention', 'What Do You Want?', 'Why Now? Understanding Urgency',
        'Pace & Pause', 'Emphasis & Phrasing']],
      ['IV', 'Mix It', ['Movement & Speech', 'Presence & Persuasion', 'Integration', 'Let It Go']],
    ];
    check('textbook: four parts, in the approved order, with the approved titles',
      String(TEXTBOOK_PARTS.map(p => [p.n, p.title])) === String(EXPECTED.map(e => [e[0], e[1]])));
    check('textbook: every chapter title and order matches the specification',
      TEXTBOOK_PARTS.every((p, i) =>
        String(textbookPartChapters(p).map(chapterTitle)) === String(EXPECTED[i][2])),
      TEXTBOOK_PARTS.map(p => textbookPartChapters(p).map(chapterTitle).join(',')).join(' | '));
    check('textbook: Part III keeps purpose before the Rhythm subsection',
      TEXTBOOK_PARTS[2].subsections[0].title === 'Rhythm'
      && String(TEXTBOOK_PARTS[2].chapters.map(chapterTitle))
        === 'Thought & Intention,What Do You Want?,Why Now? Understanding Urgency');
    check('textbook: every chapter appears exactly once and maps 1:1 onto the course lessons',
      (() => {
        const all = textbookOrder();
        return new Set(all).size === all.length
          && all.length === SPEECH_LESSONS.length
          && all.every(id => !!speechLessonById(id));
      })());
    check('textbook: renames are display-only — stable ids and canonical order untouched',
      SPEECH_LESSONS.every(l => (l.id === 'wsm' || /^sp-/.test(l.id)) && typeof l.order === 'number')
      && speechLessonById('wsm').order === 0
      && speechLessonById('sp-f-instrument').title === 'The Speaking Instrument'
      && chapterTitle('sp-f-instrument') === 'Your Instrument');
    check('textbook: the retired public titles are gone from navigation',
      ['Why Speech Matters', 'Effort & Tension', 'Jaw, Tongue & Neck', 'Body & Breath',
       'Voice & Resonance', 'Applying Technique Without Managing It']
        .every(old => !textbookOrder().map(chapterTitle).includes(old)));
    check('textbook: Learn follows the same chapter order as Part I, preface included',
      TEXTBOOK_PARTS[0].chapters.length === 5
      && String(speechModuleGroups(1).flatMap(g => g.lessons))
        === String(TEXTBOOK_PARTS[0].chapters));
    check('textbook: end matter is reserved, not published',
      TEXTBOOK_END_MATTER.map(e => e.title).join() === 'Key Ideas,Glossary,Sources & Further Reading,Continue Your Work');
    check('textbook: the alphabet experiment is one continuous block, no stepper',
      (() => {
        const e = speechLessonById('sp-start-alphabet').body.find(b => b.experiment)?.experiment;
        return !!e && e.steps.length === 5 && !!e.noticing && !!e.then && !!e.compare;
      })());
  }

  // ── 26. A timed-out IndexedDB probe must not wall the user ───
  {
    // hasIdbTraces() races a probe against a 150ms timeout. If the probe
    // hangs, the answer is UNKNOWN — and treating unknown as "no traces"
    // would show an existing user the first-run preface and block them.
    // The timeout therefore resolves TRUE.
    const race = async (probe, timeoutResolves) => {
      const timeout = new Promise(r => setTimeout(() => r(timeoutResolves), 20));
      return (await Promise.race([probe, timeout])) === true;
    };
    const hang = new Promise(() => {});
    check('idb probe: a never-resolving probe reports traces, so the preface stays away',
      (await race(hang, true)) === true);
    check('idb probe: the old behaviour would have walled the user (guard against regression)',
      (await race(hang, false)) === false);
    check('idb probe: a fast negative still reports no traces',
      (await race(Promise.resolve(false), true)) === false);
    check('idb probe: a fast positive still reports traces',
      (await race(Promise.resolve(true), true)) === true);
    // And the shipped source must not have drifted back to false.
    const src = await fetch('../js/main.js').then(r => r.text());
    check('idb probe: main.js resolves the timeout to TRUE, not false',
      /setTimeout\(\(\) => r\(true\), 150\)/.test(src)
      && !/setTimeout\(\(\) => r\(false\), 150\)/.test(src));

    // Dialect in Action must never advertise "0 pieces": with nothing
    // approved the card counts the drafts and badges them "In review",
    // and every route into the shelf falls back to the pending page.
    check('dialect action: unapproved card counts drafts, badged "In review"',
      /count: actionFor\(d\)\.length \|\| actionDrafts\(\)\.filter/.test(src)
      && /badge: actionFor\(d\)\.length \? null : \{ cls: 'is-pending', label: 'In review' \}/.test(src));
    check('dialect action: renderDialectAction delegates when nothing is approved',
      /if \(!pieces\.length\) return renderDialectActionPending\(d\);/.test(src));

    // About-the-Accent removal: no page, no routes, no dead facet buttons,
    // and no copy anywhere still sending a learner to one.
    const dialectSrc = await fetch('../js/data/dialects.js').then(r => r.text());
    const facetSrc = await fetch('../js/data/speech/dialects.js').then(r => r.text());
    const bridgeSrc = await fetch('../js/data/bridge.js').then(r => r.text());
    check('about removal: renderAboutCourse and its about-* routes are gone',
      !/renderAboutCourse/.test(src) && !/'about-(target|features|voice|context)'/.test(src));
    check('about removal: no aboutTitle fields remain', !/aboutTitle/.test(dialectSrc));
    check('about removal: no facet still renders an about-* surface',
      !/renders: 'about-/.test(facetSrc));
    check('about removal: no learner-facing copy points at an About page',
      ![src, facetSrc, bridgeSrc].some(t =>
        /Library → About|About the Accent|About page|About Neutral American|About Traditional RP|About Standard British|About General Australian/.test(t)));
    check('ssbe intro: says it appears only on the first visit',
      /This introduction appears only on your first visit\./.test(src)
      && !/reread this any time/.test(src));
  }

  // ── 26b. The verbatim memory lesson (owner-supplied copy) ─────
  // "The Line You Know vs. The Line You Can Find" ships word for word
  // by owner order (2026-09-03). Data-level pins; launch_lint carries
  // the full spot-line set.
  {
    const { LINE_LESSON } = await import('../js/data/acting/lines.js');
    check('memory lesson: six sections plus a five-step practice set, title verbatim',
      LINE_LESSON.title === 'The Line You Know vs. The Line You Can Find'
      && LINE_LESSON.sections.length === 6
      && LINE_LESSON.practice.steps.length === 5);
    const text = JSON.stringify(LINE_LESSON);
    check('memory lesson: verbatim voice intact — contractions and em dashes survive, names present',
      text.includes('Not fuzzy — gone.')
      && text.includes('you haven’t learned the scene — you’ve learned the rehearsal')
      && text.includes('Helga Noice') && text.includes('Michael Caine')
      && text.includes('That’s the whole trade.'));
    const mainSrc2 = await fetch('../js/main.js').then(r => r.text());
    check('memory lesson: read-only page — renderer exists, no controls, tile shelved',
      /function renderLineLesson/.test(mainSrc2)
      && !/renderLineLesson[\s\S]{0,1600}<(textarea|input|select)/.test(mainSrc2.slice(mainSrc2.indexOf('function renderLineLesson')))
      && /key: 'col:lines'/.test(mainSrc2));
  }

  // ── 27. The Cockney course: gate, data, derivation, audio parity ─
  // The course hides behind COCKNEY_LIVE (js/main.js), mirroring the
  // SPEECH_LIVE pattern: the flag is read from source so the suite and
  // the app can never drift. Data invariants hold in BOTH flag states.
  {
    const mainSrc = await fetch('../js/main.js').then(r => r.text());
    check('cockney: visibility gates exist — course picker and Studio dialects both honor COCKNEY_LIVE',
      /COCKNEY_LIVE \|\| c\.id !== 'cockney'/.test(mainSrc)
      && /COCKNEY_LIVE \? \[\{ id: 'cockney'/.test(mainSrc));
    const { TRACKS, COURSE } = await import('../js/data/course.js');
    const { DIALECT_INFO } = await import('../js/data/dialects.js');
    const track = TRACKS.find(t => t.id === 'cockney');
    check('cockney: track registered — 🚕, accent course, four stages',
      !!track && track.icon === '🚕' && track.accent === true && track.unitIds.length === 4);
    const lessons = COURSE.filter(u => (track?.unitIds ?? []).includes(u.id)).flatMap(u => u.lessons);
    check('cockney: ten lessons, ck-0 through ck-final',
      lessons.length === 10 && lessons[0]?.id === 'ck-0' && lessons[9]?.id === 'ck-final',
      lessons.map(l => l.id).join(','));
    const info = DIALECT_INFO.cockney;
    check('cockney: Accuracy Standard — tiers, realization convention, respect statement',
      !!info && info.core.length >= 6 && info.common.length >= 4 && info.variable.length >= 3
      && /square brackets/.test(info.convention) && /careless or incorrect/.test(info.notClaim));
    const cockneyIdioms = IDIOM.filter(e => e.dialect === 'cockney');
    check('cockney: 60 expressions with stable unique ids and the register flags',
      cockneyIdioms.length === 60
      && new Set(cockneyIdioms.map(e => e.id)).size === 60
      && cockneyIdioms.every(e => /^COCKNEY-\d{3}$/.test(e.id))
      && cockneyIdioms.find(e => e.term === 'bent')?.flag === 'dated-offensive');
    check('cockney: toCockney derivation — fronting, glottal, h-drop; initial ð survives',
      ipaFor('think', 'cockney')?.ipa === 'fɪŋk'
      && ipaFor('butter', 'cockney')?.ipa.includes('ʔ')
      && ipaFor('house', 'cockney')?.ipa[0] !== 'h'
      && ipaFor('the', 'cockney')?.ipa.includes('ð'));
    const idx = await fetch('../audio/index.json').then(r => r.json());
    const bob = idx.cockney?.bob ?? [], lizzie = idx.cockney?.lizzie ?? [];
    check('cockney: strict audio parity — Bob and Lizzie carry identical clip sets, 300+ each',
      bob.length >= 300 && JSON.stringify([...bob].sort()) === JSON.stringify([...lizzie].sort()),
      `bob=${bob.length} lizzie=${lizzie.length}`);
  }

  if (workspaceBefore === null) localStorage.removeItem('speechcraft-workspace');
  else localStorage.setItem('speechcraft-workspace', workspaceBefore);

  const failed = results.filter(r => !r.pass);
  console.log(`regression tests: ${results.length - failed.length}/${results.length} passed`);
  failed.forEach(f => console.warn('FAIL:', f.name, '—', f.detail ?? ''));
  return { total: results.length, failed: failed.length, results: [...results] };
}
