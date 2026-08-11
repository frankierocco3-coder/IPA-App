// Speech Dissection — Quick mode (Build B). The six-question analytical
// pass an actor runs on a piece of text, per docs/SPEECH_DISSECTION_SPEC.md
// §1/§3/§8 and docs/BUILD_02_DISSECT_QUICK.md.
//
// Storage: IndexedDB store 'dissections' (DB v2) — these are unbounded
// user-authored analyses, never localStorage. One dissection per target in
// this build. Every stored string is UNTRUSTED on read: it round-trips
// through IndexedDB and reaches innerHTML, so every renderer must esc()
// without exception.
//
// Product rules baked in here:
//   - Question ids are stable FOREVER. Renaming one orphans a saved answer.
//   - 'unknown' ("I don't know yet") and 'na' ("Not relevant") are
//     first-class answers, not empty states.
//   - Completion is never "all six answered" — coverage, not a score.
//   - Marking unknown/na never erases typed text: the value is kept so an
//     unfinished thought is never lost, only re-labelled.

import { STORES, idbGet, idbPut, idbDelete, idbAllBy, uid } from './db.js';

// The six. Stable ids from the build order — never rename.
export const QUICK_QUESTIONS = [
  { id: 'quick.happening', q: 'What is happening?' },
  { id: 'quick.wants',     q: 'What does the speaker want?' },
  { id: 'quick.resisting', q: 'What is the listener resisting?' },
  { id: 'quick.doing',     q: 'What is the speaker doing to change them?' },
  { id: 'quick.change',    q: 'Where does the exchange change?' },
  { id: 'quick.after',     q: 'What is different at the end?' },
];

export const ANSWER_STATUS = { answered: 'answered', unknown: 'unknown', na: 'na' };

// The spec's material types. Studio content types that match pass through;
// 'lyrics' and 'other' fall back to 'monologue' (the closest single-voice
// reading of a text — revisit if lyric-specific analysis ever ships).
const MATERIAL_TYPES = ['monologue', 'scene', 'speech', 'conversation', 'interview', 'debate'];
export const materialTypeFrom = (contentType) =>
  MATERIAL_TYPES.includes(contentType) ? contentType : 'monologue';

/** A fresh Quick record in the §8 shape — reserved fields declared empty
 *  so later modes need no migration. */
export function newDissection({ targetType, targetId, targetLabel, materialType }) {
  const now = Date.now();
  return {
    id: uid('diss'),
    schemaVersion: 1,
    targetKey: `${targetType}:${targetId}`,
    targetType,
    targetId,
    targetLabel: String(targetLabel ?? '').slice(0, 200),
    materialType: materialTypeFrom(materialType),
    mode: 'quick',
    level: 'beginner',
    createdAt: now,
    updatedAt: now,
    answers: {},
    actions: [],
    // reserved — see spec §8; empty now so later features need no migration
    annotations: [],
    speakers: [],
    interpretations: [],
    userQuestions: [],
    history: [],
  };
}

export const getDissection = (id) => idbGet(STORES.dissections, id);

/** The dissection for a target, or null. One per target in this build. */
export async function dissectionFor(targetType, targetId) {
  const all = await idbAllBy(STORES.dissections, 'targetKey', `${targetType}:${targetId}`);
  return all[0] ?? null;
}

export const putDissection = (d) => idbPut(STORES.dissections, { ...d, updatedAt: Date.now() });

/**
 * Write one answer. `status` may be 'answered' | 'unknown' | 'na';
 * omitted, it is derived: non-empty text → answered, empty → the answer
 * record is removed (back to genuinely unanswered). Text is always kept
 * alongside unknown/na — never lose an unfinished thought.
 */
export async function saveAnswer(id, questionId, { value, status } = {}) {
  const d = await getDissection(id);
  if (!d) throw new Error('no such dissection');
  if (!QUICK_QUESTIONS.some(q => q.id === questionId)) throw new Error('unknown question id');
  const text = String(value ?? '');
  const st = status ?? (text.trim() ? ANSWER_STATUS.answered : null);
  if (st === null) delete d.answers[questionId];
  else d.answers[questionId] = { value: text, status: st, updatedAt: Date.now() };
  await putDissection(d);
  return d;
}

export const deleteDissection = (id) => idbDelete(STORES.dissections, id);

/** Remove every dissection attached to a project — called from project
 *  deletion, which already cascades to the project's recordings. */
export async function deleteDissectionsFor(projectId) {
  const all = await idbAllBy(STORES.dissections, 'targetKey', `project:${projectId}`);
  for (const d of all) await idbDelete(STORES.dissections, d.id);
  return all.length;
}

/** Coverage, never a score: how many of the six are explored, and how. */
export function coverageOf(d) {
  const counts = { answered: 0, unknown: 0, na: 0, blank: 0, total: QUICK_QUESTIONS.length };
  for (const { id } of QUICK_QUESTIONS) {
    const a = d?.answers?.[id];
    if (!a) counts.blank++;
    else if (a.status === ANSWER_STATUS.unknown) counts.unknown++;
    else if (a.status === ANSWER_STATUS.na) counts.na++;
    else counts.answered++;
  }
  return counts;
}

/** Plain-language coverage line. Deliberately no percentage. */
export function coverageLine(d) {
  const c = coverageOf(d);
  const bits = [`${c.answered + c.unknown + c.na} of ${c.total} explored`];
  if (c.unknown) bits.push(`${c.unknown} still open`);
  if (c.na) bits.push(`${c.na} not relevant`);
  return bits.join(' · ');
}
