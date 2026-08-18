// Scene Study notes — localStorage only, NO database change.
//
// STORAGE DECISION (owner order 2026-08-13, §9/§10): associating scene
// study notes (and, later, actions) with a text does NOT require an
// IndexedDB migration, so no storage gate was tripped:
//   • Question Everything answers keep using the EXISTING dissections
//     store, unchanged — same records, same autosave, same marks.
//   • Scene Study notes are small per-text strings keyed by the
//     working-text id, kept here in localStorage.
//   • Playable Actions are BROWSED from their existing shared record;
//     no action↔project association is written to IndexedDB in this
//     build, so DB_VERSION stays at 2 and no migration exists to run.
//
// Keys are namespaced by the working text's id, so a Studio project and
// a provided Speechcraft text never collide, and deleting a project
// leaves nothing dangling (an orphan note is simply never read).

const KEY = 'speechcraft-scene-study';
const MAX_NOTE = 4000;

function readAll() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch { return {}; }
}

export function sceneStudyNotes(textId) {
  const all = readAll();
  const one = all[textId];
  return one && typeof one === 'object' && !Array.isArray(one) ? one : {};
}

export function saveSceneStudyNote(textId, areaId, value) {
  try {
    const all = readAll();
    const one = { ...(all[textId] ?? {}) };
    const text = String(value ?? '').slice(0, MAX_NOTE);
    if (text.trim()) one[areaId] = text; else delete one[areaId];
    if (Object.keys(one).length) all[textId] = one; else delete all[textId];
    localStorage.setItem(KEY, JSON.stringify(all));
    return true;
  } catch { return false; }
}

export function sceneStudyCoverage(textId, areaIds) {
  const notes = sceneStudyNotes(textId);
  const explored = areaIds.filter(id => (notes[id] ?? '').trim()).length;
  return { explored, open: areaIds.length - explored, total: areaIds.length };
}

export function wipeSceneStudy() {
  try { localStorage.removeItem(KEY); } catch { /* best effort */ }
}
