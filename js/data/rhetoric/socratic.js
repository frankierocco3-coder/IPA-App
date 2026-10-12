// The Socratic Method — the elenchus, and it is a CYCLE.
//
// Owner decision 2026-10-12, revised the same day against three outside
// accounts of the method.
//
// ── WHY THIS SHELF EXISTS ─────────────────────────────────────
// The Arguing group held four shelves and every one of them was argument
// going wrong: two taxonomies of error, Schopenhauer's thirty-eight
// tricks, thirty-six stratagems of deception. Four shelves on how people
// cheat and nothing on how to do it properly. This is the one classical
// procedure for arguing that is trying to get somewhere TRUE.
//
// ── THE IRONY IS NOT DECORATION, IT IS THE OPEN QUESTION ──────
// Added 2026-10-12 after two outside accounts leaned on Socratic irony
// as a technique for handling people you consider beneath you.
// SOCRATIC_LEAD states that the questioner must not already know the
// answer. That is a POSITION, not a settled fact, and it is the oldest
// argument there is about this method — so the shelf now says so beside
// the claim instead of letting a reader take it as given.
// Both quotations in SOCRATIC_IRONY are Jowett's Euthyphro, the same
// source and the same scoping as every other quotation here, which is
// why the footing in SOCRATIC_NOTE did not have to widen. The second one
// is the strongest internal evidence AGAINST the lead's position and is
// here for that reason: do not quietly drop it to make the shelf tidier.
//
// ── THE FIRST DRAFT WAS LINEAR AND THAT WAS WRONG ─────────────
// It ran six moves and stopped at the first contradiction. Every outside
// account makes the fifth step REPEAT, and the text settles it: Euthyphro
// revises three times — dear to the gods, then what all the gods love,
// then ministering to them, and back to the beginning. The loop IS the
// method. Aporia is where the loop LANDS, not a move you perform. Move 6
// is the return and move 7 is the terminus; do not flatten them back.
//
// ── MOVE 2 IS REFLECTION, NOT STEELMANNING ───────────────────
// The first draft said "take the answer at its strongest", which is a
// modern norm smuggled into a classical method. What Socrates does is
// reflect it back ACCURATELY and get it confirmed — "Was not that said?"
// Improving somebody's argument for them is a different act and does not
// belong here.
//
// ── THE APOPHATIC PAYOFF ─────────────────────────────────────
// Move 7 is not failure. You may never say what piety IS, and you will
// have established what it is NOT, which is a real result. Without this
// the method reads as an elaborate way to end with nothing.
//
// ── STEP COUNT IS NOT CANONICAL ──────────────────────────────
// Outside accounts give five, or three. This gives seven. SOCRATIC_COUNT
// says so on the shelf rather than presenting a number as settled. Those
// five-step mnemonics (Receive, Reflect, Refine, Restate, Repeat) are a
// modern coaching framework, somebody's packaging, and are deliberately
// NOT used here.
//
// ── QUOTATIONS ───────────────────────────────────────────────
// Every Euthyphro line is Jowett, verbatim, verified 2026-10-12 against
// Project Gutenberg #1642. Public domain IN THE UNITED STATES, the same
// footing and the same scoping as the Jowett already used for the Plato
// pathway. One outside account misquotes the key line as "either we are
// wrong in the former assertion"; Jowett wrote "Then either we were wrong
// in our former assertion". Check the text, not the video.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'SM-<3 digits>'. STABLE FOREVER.
//   n        1 to 7, in order, because the order is the method.
//   term     the move, as an instruction.
//   what     what the move IS, in one plain sentence.
//   misuse   how it gets weaponised. NOT `overlook`: every other shelf
//            here says what a TRICK hides, and an honest method hides
//            nothing. The suite pins misuse present and overlook absent on
//            every step, so this cannot be "tidied" into its neighbours.
//   ask      the question that keeps you honest while doing it.
//   examples TWO: the dialogue, then where you would use it now.
//
// NOT APPROVED. Awaiting a rhetoric reviewer, like every record here.

export const SOCRATIC_NOTE =
  'What Socrates did and what Plato wrote are not the same question. The early '
  + 'dialogues are literary works rather than transcripts, and the method below is '
  + 'reconstructed from them. The quoted lines are Benjamin Jowett’s translation of '
  + 'Euthyphro, public domain in the United States; readers elsewhere should check '
  + 'the copyright law where they live.';

export const SOCRATIC_LEAD =
  'Seven moves, and the sixth returns to the first. Two conditions hold the whole '
  + 'thing up: the questioner must not already know the answer, and the other person '
  + 'must be free to leave. Remove either and this stops being an examination and '
  + 'becomes a trap.';

export const SOCRATIC_IRONY =
  'The not knowing is a declared pose, and whether it is sincere is the oldest argument '
  + 'about this method. Socrates tells Euthyphro “I think that I cannot do better than be '
  + 'your disciple”, and he is on his way to his own trial at the time. Later in the same '
  + 'dialogue he says “I think that you could have answered in much fewer words the chief '
  + 'question which I asked, Euthyphro, if you had chosen”, which is not the remark of a man '
  + 'with no idea where the answer lies. The Greek word behind this was an accusation rather '
  + 'than a compliment, nearer to dissembling than to anything approving. The condition above '
  + 'takes a side, and what hangs on it is practical: a questioner who already holds the answer '
  + 'is either teaching by question or laying a trap, and the test between the two is whether '
  + 'the other person is free to arrive somewhere unplanned.';

export const SOCRATIC_COUNT =
  'The number of steps is not settled. Other accounts give five, or three. Seven is '
  + 'how it is broken down here, and the divisions matter less than the fact that it '
  + 'goes round.';

export const SOCRATIC_STEPS = [

  { id: 'SM-001', n: 1, term: 'Ask what it is, not whether it is',
    what: 'The question is for a definition rather than a yes or a no. What is courage, rather than was that courageous.',
    misuse: 'Demanding a definition for a word nobody was confused by, in order to stall. If no answer would move things on, it is not a question.',
    ask: 'Could any answer to this take us somewhere, or is the asking the point?',
    examples: [
      { text: '“And what is piety, and what is impiety?” Euthyphro answers with what he is doing right now, which is an instance and not a definition.',
        source: 'Plato, Euthyphro, tr. Jowett' },
      { text: '“Before we argue about whether it is fair, tell me what you are counting as fair.”' },
    ] },

  { id: 'SM-002', n: 2, term: 'Reflect it back and have it confirmed',
    what: 'Their position is restated in your own words and they are asked whether that is what they meant, before anything is tested.',
    misuse: 'Restating it WORSE and taking the nod anyway, which is the straw man with a procedure wrapped around it. Or restating it BETTER, which flatters and tests nothing.',
    ask: 'Would they recognise my version as theirs, and have I actually asked them?',
    examples: [
      { text: '“Come, then, and let us examine what we are saying. That thing or person which is dear to the gods is pious, and that thing or person which is hateful to the gods is impious, these two being the extreme opposites of one another. Was not that said?”',
        source: 'Plato, Euthyphro, tr. Jowett' },
      { text: '“So your position is that the deadline caused it, not the budget. Have I got that right?”' },
    ] },

  { id: 'SM-003', n: 3, term: 'Collect the admissions one at a time',
    what: 'Each further point is put on its own and granted on its own, so every step is something they actually agreed to.',
    misuse: 'Running several together so one yes carries three claims, which is how a conclusion arrives that nobody consented to.',
    ask: 'Is that one thing I am agreeing to, or several wearing one sentence?',
    examples: [
      { text: 'Euthyphro grants, separately, that piety is what is dear to the gods, that the gods quarrel, and that they quarrel about what is good and just.' },
      { text: '“You agree the figures were late. And separately, that nobody chased them. Yes to both?”' },
    ] },

  { id: 'SM-004', n: 4, term: 'Produce the case it does not survive',
    what: 'One real case is brought that the definition cannot cover, chosen because it genuinely follows from their words and is genuinely wrong.',
    misuse: 'Reaching for a case so far-fetched it tests nothing, or one that beats the wording on a technicality rather than beating the idea.',
    ask: 'Is this a case they would accept as a fair test, before they know what it does?',
    examples: [
      { text: 'If piety is what is dear to the gods, and the gods quarrel, then the same act is dear to some and hateful to others — pious and impious at once. The definition is Euthyphro’s own and it does the damage itself.' },
      { text: '“By that rule the night shift would have been in breach every week last year. Is that what we are saying?”' },
    ] },

  { id: 'SM-005', n: 5, term: 'Show the contradiction, and say “we”',
    what: 'The admissions are set beside the original claim and the clash is left standing. Nothing is put in its place, and the error is owned jointly.',
    misuse: 'Saying “you are wrong”, which is usually available and usually justified and reliably ends the conversation. Or carrying on past the contradiction to install your own answer, which turns an examination into a trap.',
    ask: 'Am I showing them the problem, or using the problem to sell something?',
    examples: [
      { text: '“Then either we were wrong in our former assertion; or, if we were right then, we are wrong now.” He had every ground to say you, and says we.',
        source: 'Plato, Euthyphro, tr. Jowett' },
      { text: '“Then both of those cannot hold. I do not know which one goes.”' },
    ] },

  { id: 'SM-006', n: 6, term: 'Begin again from the new definition',
    what: 'They revise, and the revision is taken seriously and put through the same examination. This is the step that makes it a method rather than a gotcha.',
    misuse: 'Treating the first contradiction as the finish, which is a debate win rather than an inquiry. Or looping past the point of use, until the other person is simply worn out.',
    ask: 'Is this version better than the last one, and am I testing it or just circling?',
    examples: [
      { text: 'Euthyphro revises: “what all the gods love is pious, and what they all hate is impious.” Socrates starts over. Euthyphro revises twice more and ends where he began.',
        source: 'Plato, Euthyphro, tr. Jowett' },
      { text: '“All right, that is a better version. Does it survive the night-shift case?”' },
    ] },

  { id: 'SM-007', n: 7, term: 'End at not knowing, and at what it is not',
    what: 'The honest finish is that the question is open. You will not always learn what the thing is, and you will have established what it is not, which is a real result rather than a consolation.',
    misuse: 'Performing a humility you do not have, as cover for the position you intended to arrive at. False aporia is worse than an argument, because it cannot be answered.',
    ask: 'Did I come into this willing to leave without a conclusion?',
    examples: [
      { text: '“Another time, Socrates; for I am in a hurry, and must go now.” Socrates: “Alas! my companion, and will you leave me in despair? I was hoping that you would instruct me in the nature of piety and impiety.”',
        source: 'Plato, Euthyphro, tr. Jowett' },
      { text: '“I still cannot tell you what fair means here. I can tell you it is not just whatever the rota says, and we both thought it was an hour ago.”' },
    ] },

];

export const socraticById = id => SOCRATIC_STEPS.find(s => s.id === id) ?? null;
