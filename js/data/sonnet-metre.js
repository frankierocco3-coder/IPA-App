// What metre a sonnet is in.
//
// The scanner used to assume ten syllables for every verse line, which is
// right 153 times out of 154 and catastrophically wrong the once:
// SONNET 145 IS IN IAMBIC TETRAMETER, eight syllables to the line, four
// beats rather than five. Before this file existed the Scan tab flagged
// all fourteen of its lines as bent metre. They are not bent. The poem is
// in eights and keeps to them.
//
// This lives outside js/data/sonnets.js on purpose. That file is the
// Shakespeare text and is byte-locked in launch_lint (sha256 pin); the
// metre is OUR reading of the text, so it belongs beside it, not in it.
//
// A learner who lands on 145 is told what is different rather than left
// to wonder why the page stopped flagging things, which is why the
// exception carries a `note` and not just a number.

export const IAMBIC = {
  pentameter: { name: 'Iambic pentameter', feet: 5, feetWord: 'five', expected: 10, syllables: 'ten' },
  tetrameter: { name: 'Iambic tetrameter', feet: 4, feetWord: 'four', expected: 8, syllables: 'eight' },
};

export const PENTAMETER = IAMBIC.pentameter;

// Keyed by sonnet number. Everything absent is pentameter.
const EXCEPTIONS = {
  145: {
    metre: 'tetrameter',
    note: 'Sonnet 145 is the only one in the sequence written in eights rather '
      + 'than tens, so the pulse here is four beats to the line and not five. '
      + 'Nothing below is irregular for being short: it is a different metre, '
      + 'kept to.',
  },
};

export function metreOfSonnet(n) {
  const ex = EXCEPTIONS[n];
  if (!ex) return PENTAMETER;
  return { ...IAMBIC[ex.metre], note: ex.note };
}
