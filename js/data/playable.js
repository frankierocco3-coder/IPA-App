// Playable Actions — content v1. VERBATIM from docs/ACTION_LIBRARY_v1.md
// (approved source; build order C). Twelve entries, six contrast pairs,
// each pair sharing one practice line. Do not rewrite, extend or invent
// entries here — the source document is the authority, and launch_lint
// pins the verbs, the pair relationships and the practice lines.
//
// The teaching distinction (spec §7): emotion is what the speaker feels;
// action is what the speaker is doing to the listener. Entirely written —
// the practice line is text for private exploration, never audio.

// Shown once at the top of the section.
export const GOVERNING_QUESTION = 'What are you doing to the other person through these words?';
export const ACTION_DISTINCTION =
  'Emotion is what you feel. Action is what you are doing to someone else. An actor ' +
  'playing sadness gives a performance about themselves. An actor playing <i>to shame</i> ' +
  'gives a performance about someone else.';

// The pair lesson, from the source document.
export const PAIR_LESSON = 'The same words, two actions, two completely different scenes. That contrast is the lesson.';

export const ACTION_CATEGORIES = {
  connect: 'To Connect',
  persuade: 'To Persuade',
  discover: 'To Discover',
  protect: 'To Protect',
  control: 'To Control',
  relationship: 'To Change the Relationship',
  reveal: 'To Reveal',
};

export const ACTION_PAIRS = [
  { id: 'pair-1', line: 'Nothing is going to happen to you tonight.', actions: ['reassure', 'dismiss'] },
  { id: 'pair-2', line: 'I did it.', actions: ['confess', 'justify'] },
  { id: 'pair-3', line: 'Tell me what happened.', actions: ['confront', 'draw-out'] },
  { id: 'pair-4', line: 'Sit down.', actions: ['command', 'appeal-to'] },
  { id: 'pair-5', line: 'You don’t want to do that.', actions: ['warn', 'intimidate'] },
  { id: 'pair-6', line: 'It’s all right. I understand.', actions: ['forgive', 'punish'] },
];

export const PLAYABLE_ACTIONS = [
  {
    id: 'reassure', category: 'connect', verb: 'To Reassure',
    pairId: 'pair-1', practiceLine: 'Nothing is going to happen to you tonight.',
    objective: 'Make the listener believe they are safe, or that this can be managed.',
    resistance: 'Fear, distrust, the sense that you don’t understand how bad it is.',
    coaching: 'Do not “act calm.” Calm is what it may look like from outside; it is not what you are doing. Put your attention on changing their expectation of danger — watch their face until it changes.',
    contrast: { id: 'dismiss', note: 'To dismiss can sound identical. Reassurance takes the fear seriously.' },
  },
  {
    id: 'dismiss', category: 'relationship', verb: 'To Dismiss',
    pairId: 'pair-1', practiceLine: 'Nothing is going to happen to you tonight.',
    objective: 'Make the listener’s concern stop counting, so you don’t have to answer it.',
    resistance: 'They believe it matters. They may be right.',
    coaching: 'You are not angry — you are finished. The subject is closed because you closed it. Notice you don’t need them to agree; you need them to stop.',
    contrast: { id: 'reassure', note: 'To reassure engages the fear. Dismissal declines to.' },
  },
  {
    id: 'confess', category: 'reveal', verb: 'To Confess',
    pairId: 'pair-2', practiceLine: 'I did it.',
    objective: 'Put the truth in the room and hand the listener what happens next.',
    resistance: 'Their disbelief, or your own fear of what follows.',
    coaching: 'Confession gives away power. If you are still managing their reaction, you are not confessing — you’re negotiating. Say it and let it land.',
    contrast: { id: 'justify', note: 'To justify keeps the power. Confession surrenders it.' },
  },
  {
    id: 'justify', category: 'protect', verb: 'To Justify',
    pairId: 'pair-2', practiceLine: 'I did it.',
    objective: 'Make the listener agree that what you did was reasonable.',
    resistance: 'Their judgment, already forming.',
    coaching: 'You are building a case, and the verdict matters to you. Watch for the moment they’re not buying it — that’s when the tactic has to change.',
    contrast: { id: 'confess', note: 'To confess accepts the consequence. Justification argues with it.' },
  },
  {
    id: 'confront', category: 'discover', verb: 'To Confront',
    pairId: 'pair-3', practiceLine: 'Tell me what happened.',
    objective: 'Make them face the thing they are working around.',
    resistance: 'Evasion, deflection, changing the subject.',
    coaching: 'You want them to look at it, not to lose. If winning starts to matter more than the answer, you’ve stopped confronting and started attacking.',
    contrast: { id: 'draw-out', note: 'To draw out invites. Confrontation refuses to let them leave.' },
  },
  {
    id: 'draw-out', category: 'discover', verb: 'To Draw Out',
    pairId: 'pair-3', practiceLine: 'Tell me what happened.',
    objective: 'Make it safe enough that they tell you on their own.',
    resistance: 'Shame, fear of your reaction, the habit of not saying.',
    coaching: 'Your main tool is silence. Leave the space and let them fill it. The temptation is to help them along — resist it.',
    contrast: { id: 'confront', note: 'To confront pushes. Drawing out waits, which is harder to play.' },
  },
  {
    id: 'command', category: 'control', verb: 'To Command',
    pairId: 'pair-4', practiceLine: 'Sit down.',
    objective: 'Produce the action without discussion.',
    resistance: 'Their status, their pride, their own plan.',
    coaching: 'A command assumes compliance. The moment you argue for it, it isn’t one any more. Expect to be obeyed and you will often sound as though you should be.',
    contrast: { id: 'appeal-to', note: 'To appeal to asks. A command doesn’t leave the option open.' },
  },
  {
    id: 'appeal-to', category: 'persuade', verb: 'To Appeal To',
    pairId: 'pair-4', practiceLine: 'Sit down.',
    objective: 'Make them want to do it, so the choice stays theirs.',
    resistance: 'Suspicion of being handled.',
    coaching: 'You need something from them and you are admitting it. Appeal costs you status on purpose — that cost is what makes it work.',
    contrast: { id: 'command', note: 'To command removes the choice. Appeal depends on it.' },
  },
  {
    id: 'warn', category: 'persuade', verb: 'To Warn',
    pairId: 'pair-5', practiceLine: 'You don’t want to do that.',
    objective: 'Show them a consequence they haven’t seen, so they stop for their own sake.',
    resistance: 'They think they’ve already weighed it.',
    coaching: 'A warning is on the listener’s side. You are pointing at something out there, not at yourself. If you’re the danger, you’re not warning.',
    contrast: { id: 'intimidate', note: 'To intimidate makes you the consequence.' },
  },
  {
    id: 'intimidate', category: 'control', verb: 'To Intimidate',
    pairId: 'pair-5', practiceLine: 'You don’t want to do that.',
    objective: 'Make them believe you are the consequence, so fear does the deciding.',
    resistance: 'Their nerve, their status, witnesses.',
    coaching: 'Volume is the amateur’s version. The stronger choice is quiet and unhurried — let them do the imagining. You are not describing a danger; you are one.',
    contrast: { id: 'warn', note: 'To warn points outward. Intimidation points at you.' },
  },
  {
    id: 'forgive', category: 'relationship', verb: 'To Forgive',
    pairId: 'pair-6', practiceLine: 'It’s all right. I understand.',
    objective: 'Release them from the debt, and take the weight off yourself too.',
    resistance: 'Their guilt — which can be harder to shift than defiance.',
    coaching: 'Forgiveness is an act, not a mood. Something is actually being put down. If you’re still holding it, you’re performing generosity, which the listener will feel.',
    contrast: { id: 'punish', note: 'To punish keeps the debt open while sounding like it doesn’t.' },
  },
  {
    id: 'punish', category: 'relationship', verb: 'To Punish',
    pairId: 'pair-6', practiceLine: 'It’s all right. I understand.',
    objective: 'Make them feel what they did, and know that you are the one deciding.',
    resistance: 'Their defenses, their counter-accusation.',
    coaching: 'The cruelest version is gentle. “I understand” can be a door closing. You are not losing your temper — you are collecting.',
    contrast: { id: 'forgive', note: 'To forgive ends it. Punishment keeps the account open.' },
  },
];

export const actionById = (id) => PLAYABLE_ACTIONS.find(a => a.id === id) ?? null;
export const pairById = (id) => ACTION_PAIRS.find(p => p.id === id) ?? null;
export const pairIndexOf = (pairId) => ACTION_PAIRS.findIndex(p => p.id === pairId);

/** Case-insensitive search over verb, category name, and the written content. */
export function searchActions(q) {
  const needle = String(q ?? '').trim().toLowerCase();
  if (!needle) return PLAYABLE_ACTIONS;
  return PLAYABLE_ACTIONS.filter(a =>
    [a.verb, ACTION_CATEGORIES[a.category], a.objective, a.resistance, a.coaching, a.practiceLine]
      .some(s => s.toLowerCase().includes(needle)));
}
