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
import { createProject, getProject, deleteProject } from '../js/projects.js';
import { saveTake, listTakes, deleteTake, deleteTakesFor, setBestTake, takeUrl,
         takesPresence, listAllTakes } from '../js/recordings.js';
import { setPersonal, getPersonal, deletePersonal } from '../js/overrides.js';
import { dbSupported, CONTENT_STORES, openRaw, dbErrorMessage } from '../js/db.js';
import { QUICK_QUESTIONS, ANSWER_STATUS, newDissection, dissectionFor, putDissection,
         getDissection, saveAnswer, deleteDissection, deleteDissectionsFor,
         materialTypeFrom, coverageOf, coverageLine, createSaver, MAX_ANSWER_LEN,
         attachImportedDissection } from '../js/dissect.js';
import { validateDissection, validateProjectBundle, importResultMessage } from '../js/validate.js';
import { PLAYABLE_ACTIONS, ACTION_PAIRS, ACTION_CATEGORIES, actionById,
         searchActions } from '../js/data/playable.js';
import { emptyProject, saveProject } from '../js/projects.js';
import { phonemeVariantsFrom, hasPhonemeClip, hasWordClip, indexReady } from '../js/audio.js';
import { store } from '../js/state.js';
import { CAPABILITIES } from '../js/capabilities.js';
import { tryItHtml, performCaptureHtml } from '../js/record-ui.js';
import { startRecording, isRecording, micErrorMessage, recordingSupported } from '../js/perform.js';
import { openDB, idbGet, STORES } from '../js/db.js';
import { DIALECT_ACTION, actionFor } from '../js/data/action.js';
import { RECASTS, TRANSPOSITION_REVIEW, approvedTranspositions } from '../js/data/recasts.js';
import { videoLookup } from '../js/data/media-videos.js';
import { BRIDGE_ROUTES, routeFor, loadBridgePrefs, saveBridgePrefs } from '../js/data/bridge.js';
import { IDIOM } from '../js/data/idiom.js';

const results = [];
const ok = (name) => results.push({ name, pass: true });
const bad = (name, detail) => results.push({ name, pass: false, detail });
const check = (name, cond, detail) => (cond ? ok(name) : bad(name, detail));

// The one ordered nav config, as both surfaces must render it.
export const EXPECTED_NAV = ['Learn', 'Practice', 'Library', 'Studio', 'Progress', 'More'];

// `navDoc` lets the standalone runner point at the app iframe's document;
// from the app's own console the live document is the default.
export async function run({ navDoc = document } = {}) {
  results.length = 0;

  // Spy on the APP's getUserMedia for the whole run (runner only): every
  // journey driven below must finish with this still at zero.
  let gumCalls = 0;
  const appWin = navDoc !== document ? navDoc.defaultView : null;
  if (appWin?.navigator?.mediaDevices?.getUserMedia) {
    const orig = appWin.navigator.mediaDevices.getUserMedia.bind(appWin.navigator.mediaDevices);
    appWin.navigator.mediaDevices.getUserMedia = (...a) => { gumCalls++; return orig(...a); };
  }

  // ── 1. Navigation: same order on both surfaces ──────────────
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
  check('bridge: unwritten route is honestly null', routeFor('aus', 'ssbe') === null);
  check('bridge: draft comparisons are filtered out',
    BRIDGE_ROUTES.every(r => routeFor(r.from, r.to).comparisons.every(c => c.reviewStatus === 'approved')));
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const clickIn = el => el?.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
    try {
      clickIn([...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes('Library')));
      await sleep(300);
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === 'IPA'));
      await sleep(400);
      const chips = [...navDoc.querySelectorAll('.chart-chip')].map(c => c.dataset.sym);
      check('inventory page renders chips', chips.length > 20, `got ${chips.length}`);

      clickIn(navDoc.querySelector('.chart-chip'));           // first symbol
      await sleep(300);
      const steps = () => [...navDoc.querySelectorAll('.sound-steps .sound-step')];
      check('first symbol: Previous disabled', steps()[0]?.disabled === true);
      check('first symbol: Next enabled', steps()[1]?.disabled === false);
      check('Next targets the inventory’s second symbol', steps()[1]?.dataset.step === chips[1],
        `next=${steps()[1]?.dataset.step} want=${chips[1]}`);

      clickIn(steps()[1]);                                    // → second symbol
      await sleep(300);
      check('Next replaces the page (second symbol shown)',
        steps()[0]?.dataset.step === chips[0] && steps()[1]?.dataset.step === chips[2],
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
      bad('sound-page navigation drive', String(err));
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
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
      clickIn([...navDoc.querySelectorAll('.track-card')].find(c => c.querySelector('h2')?.textContent === 'IPA'));
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const clickIn = el => el?.dispatchEvent(new appWin.MouseEvent('click', { bubbles: true }));
    const side = name => [...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
    const goHome = async () => { clickIn(navDoc.getElementById('brand-home')); await sleep(250); };
    const openScripts = async () => {
      await goHome();
      clickIn(side('Library')); await sleep(280);
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
      bad('reader-take drive', String(err));
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const clickIn = el => el?.dispatchEvent(new appWin.MouseEvent('click', { bubbles: true }));
    const side = name => [...navDoc.querySelectorAll('.side-item')].find(b => b.textContent.includes(name));
    // compact session driver for choice-based practice types
    const ipaOf = {};
    for (const w of WORDS) (ipaOf[w.word.toLowerCase()] ??= []).push(w.ipa);
    const hasSym = (w, s) => (ipaOf[w.toLowerCase()] ?? []).some(a => a.includes(s));
    const bareL = l => l.replace(/^[/\[]|[/\]]$/g, '');
    const driveSession = async (maxSteps = 130) => {
      let good = 0, bad = 0, lastShow = false;
      for (let i = 0; i < maxSteps; i++) {
        const body = navDoc.body.textContent;
        if (/Practice complete|Perfect lesson/.test(body) && !navDoc.getElementById('choices')) return { end: 'results', good, bad };
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
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
      clickIn(side('Library')); await sleep(350);
      const rhet = card('Rhetoric & Oratory');
      check('pathway: Library shows the Rhetoric & Oratory card', !!rhet);
      clickIn(rhet); await sleep(350);
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
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      check('pathway: Back returns to the Library shelf',
        !!card('Rhetoric & Oratory') && !!card('Scripts & Speeches'));

      // Preface replay: About → Why Speech Matters → full walk → Esc out.
      const thBefore = store.threshold;
      const xpBefore = store.xp;
      clickIn(side('More')); await sleep(350);
      clickIn(card('About Speechcraft')); await sleep(350);
      check('preface: About carries the new heading and replay button',
        doc.body.textContent.includes('Why Speech Matters') && !!doc.getElementById('about-threshold'));
      clickIn(doc.getElementById('about-threshold')); await sleep(350);
      const wall = () => doc.querySelector('.threshold');
      const h1 = () => wall()?.querySelector('h1')?.textContent ?? '';
      check('preface: replay opens on "Why Speech Matters"',
        !!wall() && h1() === 'Why Speech Matters', `h1=${h1()}`);
      check('preface: nine progress dots',
        wall()?.querySelector('.ob-dots')?.children.length === 9,
        `dots=${wall()?.querySelector('.ob-dots')?.children.length}`);
      const seen = [h1()];
      for (let i = 0; i < 6; i++) {
        clickIn(doc.getElementById('ob-next')); await sleep(200);
        seen.push(h1());
      }
      check('preface: panels walk sound-to-performance and end in reflection',
        String(seen) === String(['Why Speech Matters', 'Speech Is Action', 'Speech Reveals Thought',
          'Why Actors Train This Way', 'Communication and Manipulation', 'The Journey', 'Before You Choose']),
        seen.join(' | '));
      check('preface: reflection ending has no quiz apparatus',
        !wall().querySelector('#choices, #feedback, .choice'));
      clickIn(doc.getElementById('ob-next')); await sleep(250);
      check('preface: course picker kept, preselected on replay',
        !!wall()?.querySelector('[data-accent]') && doc.getElementById('ob-next')?.disabled === false);
      clickIn(doc.getElementById('ob-next')); await sleep(250);
      check('preface: choice screen kept with both ways in',
        wall()?.querySelectorAll('[data-choice]').length === 2);
      wall()?.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await sleep(300);
      check('preface: Esc exits the replay back to About',
        !doc.querySelector('.threshold') && !!doc.getElementById('about-threshold'));
      const thAfter = store.threshold;
      check('preface: replay walk never rewrote the original record',
        thAfter.choice === thBefore.choice && thAfter.completedAt === thBefore.completedAt
        && thAfter.source === thBefore.source);
      check('preface: awards no XP', store.xp === xpBefore);
    } catch (err) {
      bad('Build A drive', String(err));
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
    check('dissect: coverage counts all four states, never a score',
      c.answered === 1 && c.unknown === 1 && c.na === 1 && c.blank === 3
      && coverageLine(d2).includes('3 of 6 explored') && !coverageLine(d2).includes('%'));
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
      && importResultMessage(3, 2).includes('2 Speech Dissections could not be imported'));

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
    const wait = ms => new Promise(r => setTimeout(r, ms));
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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
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
        const card = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === projId);
        clickIn(card?.querySelector('button[data-act="open"]') ?? card); await sleep(450);
      };
      const openDissect = async () => {
        await openProject();
        clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      };
      await openProject();
      check('dissect UI: an action in the project view, NOT a Studio tab',
        !!doc.getElementById('proj-dissect')
        && ![...doc.querySelectorAll('.proj-tabs .son-tab')].some(b => b.dataset.tab === 'dissect'));
      clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      const qSec = qid => doc.querySelector(`.diss-q[data-q="${qid}"]`);
      check('dissect UI: a dedicated focused screen with six questions behind real labels',
        !doc.querySelector('.proj-tabs')                       // not inside the project view
        && !!doc.getElementById('nav-back')                    // normal Back affordance
        && doc.querySelectorAll('.diss-q').length === 6
        && doc.querySelectorAll('#diss-list label.field .field-label').length === 6);
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
        doc.getElementById('diss-cov').textContent.includes('4 of 6 explored')
        && doc.getElementById('diss-cov').textContent.includes('1 still open'));
      clickIn(qSec('quick.wants').querySelector('.diss-head')); await sleep(150);
      check('dissect UI: stored XSS payload renders inert',
        qSec('quick.wants').querySelector('.diss-text').value.includes('<img src=x')
        && !qSec('quick.wants').querySelector('img, b')
        && frame.contentWindow.__dissXss === undefined);

      // Revise, reload, confirm the revision stuck.
      await answer('quick.happening', 'Revised: she decided years ago.');
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

      // Delete the dissection alone; the project must survive.
      await openDissect();
      frame.contentWindow.confirm = () => true;
      clickIn(doc.getElementById('diss-del')); await sleep(400);
      check('dissect UI: delete resets the pane and spares the project',
        (await dissectionFor('project', projId)) == null
        && (await getProject(projId))?.id === projId
        && doc.getElementById('diss-cov').textContent.includes('Nothing explored yet'));

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
    const sleep = ms => new Promise(r => setTimeout(r, ms));
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
      clickIn(side('Library')); await sleep(350);
      clickIn(card('Playable Actions')); await sleep(350);
      check('playable UI: the section opens with the governing question and all twelve',
        doc.body.textContent.includes('What are you doing to the other person through these words?')
        && rows().length === 12
        && doc.querySelectorAll('#pa-list .guide-heading').length === 7);
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
      clickIn(doc.getElementById('nav-back')); await sleep(300);
      check('playable UI: Back again lands on the Library shelf', !!card('Playable Actions'));

      // The dissection doorway: navigation only, and Back comes home.
      paProj = await createProject({ title: '__regression playable link (safe to delete)', text: 'Sit down.' });
      clickIn(doc.getElementById('brand-home')); await sleep(300);
      clickIn(side('Studio')); await sleep(400);
      const pc = [...doc.querySelectorAll('.proj-card')].find(c => c.dataset.id === paProj.id);
      clickIn(pc?.querySelector('button[data-act="open"]') ?? pc); await sleep(450);
      clickIn(doc.getElementById('proj-dissect')); await sleep(450);
      clickIn(doc.querySelector('.diss-q[data-q="quick.doing"] .diss-head')); await sleep(150);
      const link = doc.querySelector('[data-pa-link]');
      check('playable UI: the Dissection doing-question offers the doorway', !!link);
      clickIn(link); await sleep(350);
      check('playable UI: the doorway opens Playable Actions',
        doc.body.textContent.includes('What are you doing to the other person through these words?'));
      clickIn(doc.getElementById('nav-back')); await sleep(350);
      check('playable UI: Back from the doorway returns to the dissection screen',
        doc.querySelectorAll('.diss-q').length === 6);
      check('playable UI: visiting the doorway stored nothing',
        (await dissectionFor('project', paProj.id)) == null);
    } catch (err) {
      bad('Playable Actions drive', String(err));
    } finally {
      if (paProj) {
        await deleteDissectionsFor(paProj.id).catch(() => {});
        await deleteProject(paProj.id).catch(() => {});
      }
    }
  } else {
    ok('Playable Actions drive (runner only — run tests/run-all.html)');
  }

  const failed = results.filter(r => !r.pass);
  console.log(`regression tests: ${results.length - failed.length}/${results.length} passed`);
  failed.forEach(f => console.warn('FAIL:', f.name, '—', f.detail ?? ''));
  return { total: results.length, failed: failed.length, results: [...results] };
}
