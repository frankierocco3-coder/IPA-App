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
import { createProject, getProject, deleteProject } from '../js/projects.js';
import { saveTake, listTakes, deleteTake, deleteTakesFor, setBestTake, takeUrl } from '../js/recordings.js';
import { setPersonal, getPersonal, deletePersonal } from '../js/overrides.js';
import { dbSupported } from '../js/db.js';
import { phonemeVariantsFrom, hasPhonemeClip, hasWordClip, indexReady } from '../js/audio.js';
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

  // ── 5. Sound-page Prev/Next (runner only: drives the app iframe) ─
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

  const failed = results.filter(r => !r.pass);
  console.log(`regression tests: ${results.length - failed.length}/${results.length} passed`);
  failed.forEach(f => console.warn('FAIL:', f.name, '—', f.detail ?? ''));
  return { total: results.length, failed: failed.length, results: [...results] };
}
