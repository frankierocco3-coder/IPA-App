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

  const failed = results.filter(r => !r.pass);
  console.log(`regression tests: ${results.length - failed.length}/${results.length} passed`);
  failed.forEach(f => console.warn('FAIL:', f.name, '—', f.detail ?? ''));
  return { total: results.length, failed: failed.length, results: [...results] };
}
