// Acting Practice — the Acting Arcade and the Scene Study workflow.
//
// ALL GAMES LIVE IN PRACTICE. Learn and Library may link to a game;
// they never contain one. Every game is written and text-based: no
// audio, recording, microphone, playback or speaking evaluation.
//
// NOTHING HERE IS SCORED. Character interpretation, objectives,
// relationships, subtext, emotional effect, beat placement and
// playable actions are explorations — the app records that you
// explored them, never whether you were right.
//
// Several of these games share the deterministic deck engine already
// used by the Speech Arcade (js/data/speech/arcade.js); the decks
// below are the acting-specific material.

export const ACTING_GAMES = [
  { id: 'ac-same-line', title: 'Same Line, Different Circumstances', icon: '🎭',
    blurb: 'The words stay fixed. Everything around them changes.',
    how: 'The line is fixed; the game deals new circumstances — who is speaking, who is listening, the relationship, what just happened, the stakes. Speak the same words inside each new world.',
    deck: 'circumstances' },
  { id: 'ac-objective-switch', title: 'Objective Switch', icon: '🧭',
    blurb: 'Same words — now you want something else from them.',
    how: 'The text holds still while the game changes what your character wants from the listener. Notice what shifts without being told to shift.',
    deck: 'objectives' },
  { id: 'ac-action-swap', title: 'Action Swap', icon: '🎯',
    blurb: 'Words, objective and circumstances hold. Only the action changes.',
    how: 'Keep everything stable except what you are DOING to the other person. The verbs come from the Playable Actions library, used unchanged.',
    deck: 'actions' },
  { id: 'ac-relationship', title: 'Relationship Shift', icon: '🔗',
    blurb: 'Same scene, different history between these two people.',
    how: 'The game deals a new relationship — how long they have known each other, who holds power, what is unsaid. The text never changes.',
    deck: 'relationships' },
  { id: 'ac-stakes-ladder', title: 'Stakes Ladder', icon: '🪜',
    blurb: 'Climb the same line through rising consequence.',
    how: 'The game raises what the outcome costs, one rung at a time. Notice where the change makes a real difference and where it does not — inflating stakes is not the same as reading them.',
    deck: 'stakes' },
  { id: 'ac-urgency', title: 'Change the Urgency', icon: '⏱',
    blurb: 'Why now? Change the answer and play it again.',
    how: 'Each card supplies a different reason this must happen now. Urgency is not automatically faster or louder — see what it actually does to your pursuit.',
    deck: 'urgency' },
  { id: 'ac-find-beat', title: 'Find the Beat', icon: '🧱',
    blurb: 'Mark where the scene turns.',
    how: 'Mark beat boundaries wherever the thought, tactic, circumstance or resistance changes. Different actors divide the same scene differently — your divisions are choices to explore.',
    tool: 'beats' },
  { id: 'ac-subtext', title: 'Same Words, Different Subtext', icon: '🎚',
    blurb: 'One line, several things going on underneath it.',
    how: 'The game supplies what the character is actually pursuing while saying this. The surface meaning never changes; what sits under it does.',
    deck: 'subtext' },
  { id: 'ac-what-changed', title: 'What Changed?', icon: '🔀',
    blurb: 'Locate the exact line where something turns.',
    how: 'Work through the passage and mark the moment new information lands or the balance shifts. Then ask what your character does differently after it.',
    tool: 'beats' },
  { id: 'ac-three-ways', title: 'Same Line Three Ways', icon: '3️⃣',
    blurb: 'Three complete pursuits through one unchanged line.',
    how: 'The game gives you three different combinations of objective, obstacle and action for the same words. Play all three. None of them is the correct one.',
    deck: 'threeways' },
];

export const actingGameById = id => ACTING_GAMES.find(g => g.id === id) ?? null;

// ── Decks (original Speechcraft writing, deterministic, local) ──
export const ACTING_DECKS = {
  circumstances: [
    'You are speaking to the person who raised you, in the kitchen where you grew up, an hour after the funeral. You want them to admit they are not coping.',
    'You are speaking to a colleague you barely know, in a stairwell, moments after they covered for your mistake. You want to know what it cost them.',
    'You are speaking to someone you loved five years ago, in a crowded bar, and neither of you expected the other. You want to leave with your dignity.',
    'You are speaking to your closest friend, at 3 a.m., after they called you from somewhere they will not name. You want an address.',
    'You are speaking to someone who has power over your work, in their office, having asked for the meeting. You want a decision today.',
    'You are speaking to a stranger who has just done something dangerous, on a train platform. You want them to sit down.',
    'You are speaking to your younger sibling, in a hospital corridor, with news you have not decided how to tell. You want another minute before you say it.',
    'You are speaking to the person who betrayed you, at their front door, uninvited. You want them to say it out loud.',
  ],
  objectives: [
    'Get them to stay in the room.',
    'Get them to tell you the truth without asking for it.',
    'Make them feel safe enough to put it down.',
    'Get them to take responsibility.',
    'Make them laugh — as the only route back.',
    'Get them to give you permission.',
    'Make them stop treating you as who you were.',
    'Get them to leave, without hurting them.',
  ],
  relationships: [
    'You have known each other three weeks and they already know too much about you.',
    'They were your teacher; now you are their equal, and neither of you has said so.',
    'You are family. Neither of you has raised the thing that happened.',
    'You have worked side by side for eleven years and have never met outside the building.',
    'They owe you, and you have never once mentioned it.',
    'You owe them, and they mention it constantly.',
    'You were rivals. You are now the only two people who understand this.',
    'You are strangers with one enormous thing in common.',
  ],
  stakes: [
    'Rung 1: the outcome is inconvenient, nothing more.',
    'Rung 2: the outcome costs you a week of work.',
    'Rung 3: someone else will hear about this by tomorrow.',
    'Rung 4: the relationship does not survive getting it wrong.',
    'Rung 5: this is the last conversation you will have with this person.',
  ],
  urgency: [
    'They are leaving in ninety seconds and you do not know when you will see them again.',
    'You have all the time in the world — and the silence is doing the work.',
    'Someone else will walk in at any moment.',
    'You have just learned something that changes everything, and they have not.',
    'You have said this before and it did not land. This is the last attempt.',
    'Nothing is chasing you. You simply cannot carry it any longer.',
  ],
  subtext: [
    'On the surface you are discussing arrangements. Underneath, you are asking whether they still want you here.',
    'On the surface you are being generous. Underneath, you are making sure they know what it cost.',
    'On the surface you are calm. Underneath, you are deciding whether to say the unsayable thing.',
    'On the surface you are agreeing. Underneath, you have already decided to do the opposite.',
    'On the surface you are asking a practical question. Underneath, you are checking whether they lied.',
    'On the surface you are saying goodbye. Underneath, you are asking them to stop you.',
  ],
  threeways: [
    'One: you want their agreement · the obstacle is their pride · your action is to appeal to them.',
    'Two: you want their agreement · the obstacle is their pride · your action is to confront them.',
    'Three: you want their agreement · the obstacle is your own doubt · your action is to draw them out.',
  ],
};

// ── The Scene Study workflow (Actor's Studio) ─────────────────
// Ten areas, completed in ANY order. Coverage is reported as
// exploration ("6 of 10 areas explored · 2 still open"), never as a
// score, and completing them never makes an interpretation correct.
export const SCENE_STUDY_AREAS = [
  { id: 'circumstances', title: 'Given circumstances',
    prompt: 'What does the text establish as true? Where, when, who, and what has already happened?' },
  { id: 'facts', title: 'Facts, assumptions and unknowns',
    prompt: 'Sort what you know: what the text states, what you have supplied, and what it deliberately leaves open.' },
  { id: 'relationship', title: 'Relationship',
    prompt: 'Who are these people to each other — history, power, what is habitually unsaid?' },
  { id: 'objective', title: 'What the character wants',
    prompt: 'What are you trying to get from the other person in this scene? Write it as “I want you to ___.”' },
  { id: 'obstacle', title: 'Obstacle',
    prompt: 'What resists — the other person, the situation, or something in your character?' },
  { id: 'stakes', title: 'Stakes and urgency',
    prompt: 'What does the outcome cost? And why must this happen now rather than tomorrow?' },
  { id: 'beats', title: 'Changes, beats and turns',
    prompt: 'Where does the scene turn — new information, a failed tactic, a shift of power?' },
  { id: 'actions', title: 'Playable actions',
    prompt: 'What are you DOING to the other person, beat by beat? Name it in verbs you can play.' },
  { id: 'questions', title: 'Unresolved questions',
    prompt: 'What can you not answer alone? These are what rehearsal is for.' },
  { id: 'notes', title: 'Rehearsal notes',
    prompt: 'What do you want to try, watch for, or ask about next time you work on this?' },
];

export const sceneStudyArea = id => SCENE_STUDY_AREAS.find(a => a.id === id) ?? null;
