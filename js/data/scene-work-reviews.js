// Review ledger for Scene Work (js/data/scene-work.js).
//
// EVERY record starts as a draft by construction: absence from this map
// IS draft status. A scene's working notes reach learners only when a
// HUMAN records their approval here. Claude may author and revise these
// drafts and can never approve its own literary writing, and nothing
// may be batch-approved.
//
// Key: the scene id, exactly as js/data/scenes.js spells it.
// Record shape, write every field:
//   'macbeth-decision': {
//     literary: { status: 'approved', reviewer: 'A. Name', date: '2026-…' },
//     verdict: 'approved',
//     revisionNotes: '…or empty…',
//   }
//
// WHAT A REVIEWER IS AGREEING TO. Not that these are the only readings.
// The notes claim two different kinds of thing and they carry different
// weight:
//   `metre` and `patterns` are CHECKABLE. A syllable count, a rhyme, a
//   repeated word, a line split between two speakers. If one of these
//   is wrong it is simply wrong, and approving it says it was verified
//   against the text on the page.
//   `circumstances`, `people` and `beats` are READINGS, offered for an
//   actor to argue with. Approving them says they are defensible and
//   honestly framed, not that they are the truth about the scene.
//   `contested` is where a scene's usual reading is named as a reading.
//   A reviewer should be hardest on this field, because it is the one
//   that stops the app from quietly teaching received opinion as fact.
//
// An acting teacher or director is the right reviewer for the readings.
// The metre and pattern claims can be checked by anyone willing to
// count, and should be, separately.

export const SCENE_WORK_REVIEWS = {};

// A scene's notes are visible only with a NAMED reviewer and a verdict
// of approved. Both, every time: a verdict with nobody's name on it is
// how a review ledger turns into a formality.
export function sceneWorkApproved(id, ledger = SCENE_WORK_REVIEWS) {
  const r = ledger[id];
  return !!r && r.verdict === 'approved'
    && !!r.literary && r.literary.status === 'approved'
    && typeof r.literary.reviewer === 'string' && r.literary.reviewer.trim().length > 1;
}
