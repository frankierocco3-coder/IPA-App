// Speechcraft Arcade — grouped written/interactive games.
//
// BINDING RULES: no audio, recording, microphone or video; no emotion
// prescribed; no interpretation declared universally correct; no AI-
// generated acting interpretations — every transformation is
// deterministic and local. Games use built-in practice texts
// (texts.js) or compatible Studio text, always rendered inertly.
//
// GROUPING is part of the approved product surface (lint-pinned):
//   Build Fluency          — Vanishing Text, Cue Pickup, First-Letter Recall
//   Shape the Thought      — Change the Word Change the Thought, Move the
//                            Pause, Change the Tempo, Beat Builder
//   Change the Circumstances — Same Line Different Circumstances,
//                            Change the Objective, Obstacle Drop
//   Change the Action      — Change the Action
//
// CONTEXT SHIFT is approved for the roadmap but HIDDEN until the
// Speaking in Context pathway exists (`hidden: true` — no card, no
// placeholder, no "coming soon").
//
// scoring: 'objective' games may give correct/incorrect feedback;
// 'interpretive' games record completion only — never a quality score.

export const ARCADE_GROUPS = [
  { id: 'fluency', title: 'Build Fluency',
    blurb: 'Make the words automatic, so attention comes free.' },
  { id: 'thought', title: 'Shape the Thought',
    blurb: 'Same words — different centers, groupings and tempos.' },
  { id: 'circumstances', title: 'Change the Circumstances',
    blurb: 'The situation speaks too. Change it and listen.' },
  { id: 'action', title: 'Change the Action',
    blurb: 'What are the words DOING? Try doing something else.' },
];

export const ARCADE_GAMES = [

  // ── Build Fluency (objective — recall has right answers) ──────
  { id: 'vanishing', group: 'fluency', title: 'Vanishing Text', icon: '🫥',
    scoring: 'objective', needsScene: false,
    blurb: 'The passage fades away in stages while the layout holds. Speak or recall it; reset any time.',
    how: 'Words progressively hide (layout preserved so the shape of the text still guides you). Recall the hidden words; reveal to check yourself; reset restores everything.' },
  { id: 'cue-pickup', group: 'fluency', title: 'Cue Pickup', icon: '🎬',
    scoring: 'objective', needsScene: true,
    blurb: 'See the other character’s cue. Recall your next line.',
    how: 'For scenes: the other character’s line is shown as your cue; recall your line, then reveal to check. Works through a scene in order.' },
  { id: 'first-letter', group: 'fluency', title: 'First-Letter Recall', icon: '🔤',
    scoring: 'objective', needsScene: false,
    blurb: 'Every word shrinks to its first letter. Punctuation stays. Rebuild the passage from the skeleton.',
    how: 'Words become first-letter prompts with punctuation and line breaks preserved (Unicode-safe). Recall the full text; reveal to check.' },

  // ── Shape the Thought (interpretive — no correct answer) ──────
  { id: 'operative', group: 'thought', title: 'Change the Word, Change the Thought', icon: '💡',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Make a different word operative and watch the thought move its center.',
    how: 'Pick any word in the sentence to be the operative word. The game highlights your choice and asks what question this version answers. Every word is a legitimate experiment.' },
  { id: 'move-pause', group: 'thought', title: 'Move the Pause', icon: '⏸',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Place a pause anywhere. Move it. The words never change; the shape of the thought does.',
    how: 'Place a pause marker between any two words and move it freely — the text itself never changes. No placement carries a guaranteed meaning; the game asks what each placement did FOR YOU.' },
  { id: 'tempo', group: 'thought', title: 'Change the Tempo', icon: '🎚',
    scoring: 'interpretive', needsScene: false,
    blurb: 'The same passage under different clocks — and different reasons for the clock.',
    how: 'Explore contrasting speeds driven by circumstances (time is short; being misunderstood is fatal; the listener is writing this down). Slow is not inherently authoritative and fast is not inherently nervous — the circumstance decides what the tempo means.' },
  { id: 'beats', group: 'thought', title: 'Beat Builder', icon: '🧱',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Divide a passage where the thought turns.',
    how: 'Mark beat boundaries wherever thought, action, circumstance or resistance changes. Different readers hear different turns — your divisions are choices to explore, not answers to grade.' },

  // ── Change the Circumstances (interpretive) ───────────────────
  { id: 'same-line', group: 'circumstances', title: 'Same Line, Different Circumstances', icon: '🎭',
    scoring: 'interpretive', needsScene: false,
    blurb: 'The words stay fixed. Everything around them changes.',
    how: 'The line is fixed; the game deals new circumstances — who is speaking, who is listening, relationship, location, what just happened, what both know, the stakes, the objective. Speak the same words inside each new world.' },
  { id: 'objective-swap', group: 'circumstances', title: 'Change the Objective', icon: '🧭',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Same words — but now you want something else from the listener.',
    how: 'The words stay stable while the game changes what the speaker wants from the listener. Notice what shifts without being told to shift.' },
  { id: 'obstacle-drop', group: 'circumstances', title: 'Obstacle Drop', icon: '🪨',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Mid-passage, a new obstacle lands. The pursuit continues.',
    how: 'A new obstacle drops in while the words continue — the listener stops believing you, time runs out, someone else walks in. The game never prescribes how you should feel about it; it asks what you DO about it.' },

  // ── Change the Action (interpretive) ──────────────────────────
  { id: 'action-swap', group: 'action', title: 'Change the Action', icon: '🎯',
    scoring: 'interpretive', needsScene: false,
    blurb: 'Words, objective and circumstances hold still. Only what you’re DOING changes.',
    how: 'Keep the words, the objective and the circumstances stable while changing the playable action — to reassure, to warn, to draw out. Speechcraft’s Playable Actions library supplies the verbs.' },

  // ── Roadmap-approved, HIDDEN until Speaking in Context exists ──
  { id: 'context-shift', group: 'circumstances', title: 'Context Shift', icon: '🌐',
    scoring: 'interpretive', needsScene: false, hidden: true,
    blurb: '', how: '' },
];

export const arcadeGamesFor = groupId =>
  ARCADE_GAMES.filter(g => g.group === groupId && !g.hidden);

export const arcadeGameById = id => {
  const g = ARCADE_GAMES.find(x => x.id === id);
  return g && !g.hidden ? g : null;
};

// Circumstance decks for Same Line, Different Circumstances — original,
// deterministic, dealt locally (no AI, no network). Each card changes
// the WORLD, never prescribes the feeling or the reading.
export const CIRCUMSTANCE_DECK = [
  { speaker: 'You, to your oldest friend', place: 'their kitchen, late', prior: 'they just told you something they’ve told no one else', know: 'you both know their family never talks like this', stakes: 'the friendship deepens or retreats', objective: 'keep them talking' },
  { speaker: 'You, to a new colleague', place: 'an office corridor', prior: 'a meeting just went badly for them', know: 'only you saw what actually happened', stakes: 'they trust you or they don’t', objective: 'steady them without embarrassing them' },
  { speaker: 'A parent, to an adult child', place: 'a parked car outside the airport', prior: 'the suitcase is already in the trunk', know: 'both know this goodbye is longer than usual', stakes: 'the last thing said before months apart', objective: 'send them off light, not heavy' },
  { speaker: 'You, to a room of strangers', place: 'a community meeting', prior: 'the last speaker dismissed the issue', know: 'half the room agrees with the last speaker', stakes: 'the vote happens in ten minutes', objective: 'change three minds' },
  { speaker: 'You, to someone you owe an apology', place: 'their doorstep', prior: 'they didn’t expect you', know: 'they heard your side from someone else first', stakes: 'this is the only chance you’ll get', objective: 'be let in — literally or otherwise' },
  { speaker: 'A manager, to a team', place: 'a video call, cameras on', prior: 'rumors have been circulating for a week', know: 'you can’t share everything yet', stakes: 'people are deciding whether to quit', objective: 'buy honest time' },
  { speaker: 'You, to a skeptical expert', place: 'their office, by appointment', prior: 'they’ve rejected ideas like yours before', know: 'you have one piece of evidence they haven’t seen', stakes: 'their endorsement opens every other door', objective: 'earn one more meeting' },
  { speaker: 'You, to someone about to make a mistake', place: 'a hallway, in passing', prior: 'they’ve already decided', know: 'you were wrong the last time you warned them', stakes: 'the mistake is nearly irreversible', objective: 'make them pause without commanding them' },
];

// Objective deck for Change the Objective — verbs of pursuit, never
// emotional states.
export const OBJECTIVE_DECK = [
  'Make them feel safe enough to stay.',
  'Get them to take you seriously.',
  'Get them to leave — kindly.',
  'Make them ask the question you can’t raise yourself.',
  'Win one more minute of their attention.',
  'Get them to admit what they already know.',
  'Make them laugh — as a way back to each other.',
  'Get their permission without asking for it outright.',
];

// Obstacle deck for Obstacle Drop — situations, never prescribed
// emotional results.
export const OBSTACLE_DECK = [
  'They’ve stopped believing you — you can see it.',
  'You have thirty seconds less than you thought.',
  'Someone else just walked in.',
  'They start agreeing too quickly — suspiciously quickly.',
  'The one word you need has gone missing.',
  'They’re about to cry, and that changes what’s possible.',
  'Your phone buzzes — it might be the call.',
  'They turn away to leave mid-sentence.',
];

// Tempo circumstance deck for Change the Tempo.
export const TEMPO_DECK = [
  { label: 'Time is short', note: 'The window closes in one minute. What does that actually do to the tempo — everywhere, or only in places?' },
  { label: 'Being misunderstood is fatal', note: 'One misheard word ruins everything. Notice where the tempo pays for precision.' },
  { label: 'They’re writing it down', note: 'The listener is taking notes. What earns a pause now?' },
  { label: 'You’re not sure you should be saying this', note: 'Every phrase is a decision to keep going.' },
  { label: 'You’ve said this a hundred times', note: 'It’s routine for you — but this listener is hearing it first.' },
  { label: 'All the time in the world', note: 'Nothing is chasing you. What does the tempo do when nothing pushes it?' },
];
