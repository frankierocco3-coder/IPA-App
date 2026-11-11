// Prosody: the rhythm and tune of an accent, as the course already states it.
//
// WHY THIS FILE IS SO SMALL. Every claim here is lifted from the `rhythm`
// field of js/data/dialects.js, the published Dialect Accuracy Standard.
// Nothing is added. That field has been authored for all five accents since
// the standard was written, and until now it was RENDERED once as a note
// (js/main.js:10862) and never taught — read, never drilled.
//
// WHAT WAS REJECTED, AND WHY IT MATTERS. The obvious prosody drill is "which
// syllable carries the stress", answered from pron.json. It is wrong here.
// tools/rebuild_pron.py:177 keeps only the FIRST CMUdict pronunciation per
// word, so a noun/verb stress pair stores one arbitrary form — and the drill
// would mark the other reading wrong. Measured: 84 of 88 such homographs
// pass every plausible guard and reach the learner, so the app would tell an
// actor that PER-fect, RE-cord, PRO-duce and SUB-ject are incorrect. Lexical
// stress is also accent-INVARIANT (toRP/toSsbe/toCockney/toAus never touch a
// stress mark), so it could not have taught an accent anything regardless.
//
// THE DISCRIMINATOR RULE. Each clause below is true of its own accent and
// FALSE of the other four, because a question whose distractors are also
// true has no right answer. Function-word reduction is therefore NOT used:
// Neutral American, Standard British and Cockney all reduce, and the
// standard says so for each. What survives is tune and the rhythmic carrier
// — a mid-fall, a wide fall, a level tail, a glottal pulse, a rising
// statement. Self-naming tells are removed ("the innit-style tags" hands
// Cockney over), which is editing published prose, not adding to it.
//
// Owner-editorial, like everything else in this app: no voice professional
// has read it. See the awaiting-review badges.

export const PROSODY = {
  nam: {
    clause: 'statements settle on a characteristic mid-fall, and the tune moves in smaller steps than British varieties',
    tell: 'Stress-timed, with a mid-fall on statements.',
  },
  rp: {
    clause: 'stresses are measured and evenly weighted, and the intonation falls are wide and controlled',
    tell: 'Evenly weighted stresses; wide, controlled falls.',
  },
  ssbe: {
    clause: 'the falls are smaller and the ends of phrases run flatter, on more level tails',
    tell: 'Smaller falls than Traditional RP, with level tails.',
  },
  cockney: {
    clause: 'speech runs quick, forward and heavily linked, with the glottal stop carrying much of the consonant rhythm',
    tell: 'Quick and linked; the glottal stop carries the rhythm.',
  },
  aus: {
    clause: 'statements frequently carry a rising contour without becoming questions, over long open vowels',
    tell: 'Rising statements (uptalk) that are not questions.',
  },
};
