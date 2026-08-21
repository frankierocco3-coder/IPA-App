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

// The Question Everything question set — the textbook AND the per-project
// worksheet run on these exact sections and asks (owner order,
// 2026-08-20: a project gets everything from Question Everything,
// not a six-question summary of it).
export const DISSECT_SECTIONS = [
  { h: '1. What is happening?',
    lead: 'Begin with facts before interpretation.',
    asks: ['Where am I?', 'When is this happening?', 'Who am I speaking to?',
      'What is our relationship?', 'What has just happened?', 'Why am I speaking now?',
      'What does each person know?', 'What does each person not know?',
      'What has already been said or done?', 'What are the immediate circumstances?',
      'What is at stake?', 'What might happen if nothing changes?', 'Is anyone else present?',
      'Are there social, physical or practical limitations affecting the conversation?',
      'What facts come directly from the text?', 'What circumstances must I reasonably imagine?'],
    close: ['Keep facts, reasonable assumptions and personal interpretation clearly distinguished.'] },
  { h: '2. What does the speaker want?',
    lead: 'Identify the change the speaker wants to create.',
    asks: ['What do I want from the other person?', 'What do I want them to understand?',
      'What do I want them to feel?', 'What do I want them to admit?',
      'What do I want them to decide?', 'What do I want them to do next?',
      'Why do I need this from them now?', 'What happens if I succeed?',
      'What happens if I fail?', 'Is my stated goal different from what I truly want?',
      'Does my objective change during the text?',
      'Can I describe my objective as an active attempt to affect another person?'],
    close: ['An emotion is not necessarily an objective. “I am angry” describes a feeling. “I want them to admit what they did” gives the actor something playable.'] },
  { h: '3. What is resisting the speaker?',
    lead: 'Find what prevents the speaker from getting what they want.',
    asks: ['What does the other person want?', 'Why might they refuse me?', 'What do they fear?',
      'What do I fear?', 'What truth is being avoided?', 'Is someone protecting a secret?',
      'Is pride preventing honesty?', 'Are status or social rules limiting what can be said?',
      'Is time running out?', 'Is there a practical or physical obstacle?',
      'Am I working against my own behavior?', 'Do I want two conflicting things?',
      'What would make giving in dangerous for the other person?',
      'What makes this conversation difficult?', 'Why has the problem not already been solved?'],
    close: ['Resistance creates dramatic pressure. The stronger the resistance, the more urgently and inventively the speaker must act.'] },
  { h: '4. What is the speaker doing to change them?',
    lead: 'Examine what the speaker is doing with the words.',
    asks: ['Which action best describes what I am trying to accomplish?'],
    close: ['The same words can produce completely different scenes when the speaker’s action changes.'],
    playable: true },
  { h: '5. What changes?',
    lead: 'Find the turns, discoveries and shifts inside the text.',
    asks: ['Where does a new thought begin?', 'Where does the subject change?',
      'Where does the speaker receive new information?', 'Where does a tactic fail?',
      'Where does the speaker try a different action?',
      'Where does the emotional temperature change?',
      'Where does the speaker become more direct?', 'Where do they retreat or protect themselves?',
      'Where is something finally admitted?', 'Where does a memory alter the present moment?',
      'Where do the stakes increase?', 'Where does the balance of power change?',
      'Where does the speaker contradict themselves?',
      'Where does the rhythm or sentence structure suggest a shift?',
      'Which words signal a turn?', 'What is different after the change?'],
    close: ['These shifts create the beats of the scene. A beat is not merely a pause; it marks a change in thought, action, information or relationship.'] },
  { h: '6. What happens after?',
    lead: 'Imagine the immediate consequence of the final line.',
    asks: ['What do I expect the other person to do?', 'What response am I waiting for?',
      'What decision have I forced?', 'What remains unresolved?', 'What would silence mean?',
      'What would agreement mean?', 'What would rejection mean?', 'Has the relationship changed?',
      'Has power shifted?', 'What action might I take next?',
      'Am I preparing to stay, leave, fight, confess, forgive or withdraw?',
      'What new problem has been created?',
      'Does the final line complete an action or begin one?',
      'What does the speaker believe will happen?', 'What might actually happen instead?'],
    close: ['The final line is rarely the end of the dramatic event. It is usually the speaker’s last attempt to make something happen next.'] },
];

// The project worksheet's questions: every section of Question Everything
// and every ask beneath it. The six original headline ids are preserved
// exactly, so any answer written before this expanded the set is still
// found and still shown.
export function dissectQuestions() {
  const out = [];
  DISSECT_SECTIONS.forEach((sec, si) => {
    const head = QUICK_QUESTIONS[si];
    if (head) out.push({ id: head.id, q: `${sec.h.replace(/^\d+\.\s*/, '')}`, section: sec.h });
    (sec.asks ?? []).forEach((a, ai) => out.push({ id: `qe.${si}.${ai}`, q: a, section: sec.h }));
  });
  return out;
}

export const ANSWER_STATUS = { answered: 'answered', unknown: 'unknown', na: 'na' };

// Per-answer ceiling. The spec calls analyses "large, unbounded" as the
// reason they live in IndexedDB, not as a promise of infinite fields —
// this matches LIMITS.notes (20k chars ≈ 3,500 words per answer, far past
// any real analysis) and is enforced visibly via the textarea's maxlength,
// so the clamp below can never silently truncate what the user sees.
// Whole-record ceiling follows: 6 × 20k + fixed fields < 125k chars.
export const MAX_ANSWER_LEN = 20000;

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
  // The worksheet asks the WHOLE Question Everything set (2026-08-20), so
  // the guard has to know all of them — it previously knew only the
  // original six and threw on every other answer, silently losing it.
  if (!dissectQuestions().some(q => q.id === questionId)) throw new Error('unknown question id');
  const text = String(value ?? '').slice(0, MAX_ANSWER_LEN);
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
  const qs = dissectQuestions();
  const counts = { answered: 0, unknown: 0, na: 0, blank: 0, total: qs.length };
  for (const { id } of qs) {
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

/**
 * Debounced, strictly serialized autosave. One write runs at a time; a
 * touch during a write queues (and replaces any previously queued) job,
 * so saves can never overlap or land out of order — the newest job always
 * runs last and its verdict is the one announced. `onState` receives
 * 'saving' | 'saved' | 'error'; a failed write NEVER reports 'saved'.
 */
export function createSaver({ delay = 800, onState = () => {} } = {}) {
  let timer = null, running = false, queued = null;
  const pump = async (job) => {
    running = true;
    onState('saving');
    let ok = true;
    try { await job(); } catch { ok = false; }
    if (queued) { const j = queued; queued = null; return pump(j); }
    running = false;
    onState(ok ? 'saved' : 'error');
  };
  return {
    /** Schedule `job` after the debounce window. */
    touch(job) {
      onState('saving');
      clearTimeout(timer);
      timer = setTimeout(() => this.now(job), delay);
    },
    /** Run `job` immediately (or queue it behind the in-flight write). */
    now(job) {
      clearTimeout(timer);
      if (running) queued = job;
      else pump(job);
    },
  };
}

/**
 * Attach a VALIDATED imported dissection (from validate.js) to a freshly
 * imported project. The record is rebuilt from scratch around the NEW
 * project id — nothing from the file becomes a key or id, and only the
 * six known question ids can carry answers (validate.js already enforced
 * both, but this constructor is the second wall).
 */
export async function attachImportedDissection(projectId, projectTitle, clean) {
  if (!clean) return null;
  const d = newDissection({
    targetType: 'project',
    targetId: projectId,
    targetLabel: projectTitle,
    materialType: clean.materialType,
  });
  if (clean.createdAt) d.createdAt = clean.createdAt;
  for (const { id: qid } of QUICK_QUESTIONS) {
    const a = clean.answers?.[qid];
    if (!a) continue;
    d.answers[qid] = {
      value: String(a.value ?? '').slice(0, MAX_ANSWER_LEN),
      status: Object.values(ANSWER_STATUS).includes(a.status) ? a.status : ANSWER_STATUS.answered,
      updatedAt: a.updatedAt ?? Date.now(),
    };
  }
  await putDissection(d);
  return d;
}
