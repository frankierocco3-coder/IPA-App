// The connected Speech glossary — context-sensitive definitions that
// open WITHOUT leaving the lesson (accessible popover; focus managed;
// dismiss on Esc/close; never touches browser history, so Back is
// untouched). Separate from the learner's Personal Dictionary.
//
// Definitions are deliberately concise and are THE single source of
// each term's wording — every surface that defines these terms renders
// from here, so definitions stay consistent across the app.

export const SPEECH_GLOSSARY = {
  'automaticity': {
    term: 'Automaticity',
    def: 'The property of a well-practiced skill or memory that lets it run with little conscious effort — automatic, second nature. Fluent recall frees attention for thinking, listening and responding. This is a property of practiced skill and memory, not of the involuntary body systems that run on their own.',
  },
  'given-circumstances': {
    term: 'Given circumstances',
    def: 'The facts a text establishes for the actor: who the character is, where and when the scene happens, the relationships, what has already occurred and what each person knows.',
  },
  'objective': {
    term: 'Objective',
    def: 'What a speaker or character is trying to get — usually from another person. An objective is a pursuit, not an emotional state: “make her stay” is an objective; “be sad” is not.',
  },
  'overall-objective': {
    term: 'Overall objective',
    def: 'What a character wants across the whole play — the long arc that every scene objective ultimately serves.',
  },
  'scene-objective': {
    term: 'Scene objective',
    def: 'What a character wants from the other person in this particular scene, right now.',
  },
  'obstacle': {
    term: 'Obstacle',
    def: 'Whatever resists the objective: the other person, the situation, or something inside the character. Resistance is what makes pursuit visible.',
  },
  'action': {
    term: 'Action',
    def: 'What a speaker does TO the other person through the words — to reassure, to confront, to draw out. Actions are playable; emotional states are not.',
  },
  'tactic': {
    term: 'Tactic',
    def: 'A specific approach chosen to pursue an objective — one way of trying. When a tactic meets resistance, the speaker can adjust and try another.',
  },
  'beat': {
    term: 'Beat',
    def: 'A unit of a scene or speech in which one thought, action or subject holds. A new beat begins where the thought, tactic or circumstance turns.',
  },
  'operative-word': {
    term: 'Operative word',
    def: 'The word a thought turns on — the one that carries the point of the sentence. Change which word is operative and the thought itself changes.',
  },
  'urgency': {
    term: 'Urgency',
    def: 'The need to affect something now. Urgency is not automatically faster or louder speech — it can produce slowness, precision, repetition, stillness or a change of action.',
  },
  'resonance': {
    term: 'Resonance',
    def: 'The shaping and reinforcing of vocal sound by the spaces of the vocal tract — throat, mouth and, for some sounds, the nasal passages. Resonance is shaping, not pushing.',
  },
  'articulation': {
    term: 'Articulation',
    def: 'The shaping of the voiced airstream into distinct speech sounds by the jaw, tongue, lips and soft palate. Clarity comes mostly from precision, not volume.',
  },
  'rhetoric': {
    term: 'Rhetoric',
    def: 'The craft of effective and persuasive communication — discovering what will move a particular audience and structuring speech accordingly. Speechcraft’s full pathway lives in Library → Rhetoric & Oratory.',
  },
  'presence': {
    term: 'Presence',
    def: 'The quality of being fully engaged with the people in front of you rather than with your own performance. Largely made of attention — which fluency frees.',
  },
};

export const glossaryTerm = id => SPEECH_GLOSSARY[id] ?? null;
