// Review ledger for the Build F sonnet editions (js/data/editions/).
//
// EVERY edition text starts as a draft by construction: absence from this
// map IS draft status. A text reaches learners only when a HUMAN reviewer
// records their approval here — Claude may author and revise drafts but
// can never approve its own literary or dialect writing, and nothing may
// be batch-approved.
//
// Key: '<sonnet>.<kind>' where kind is 'plain' | 'nam' | 'ssbe' | 'aus'.
// Record shape (write every field):
//   '18.nam': {
//     literary: { status: 'approved', reviewer: 'A. Name', date: '2026-…' },
//     dialect:  { status: 'approved', reviewer: 'B. Name', date: '2026-…' },
//     verdict: 'approved',            // set by the final human reviewer
//     revisionNotes: '…or empty…',
//   }
// Plain Meaning needs the literary review only; a voice needs BOTH
// literary and dialect/register review before the loader treats it as
// approved (editions/index.js enforces this).
//
// The five pilot sonnets (18, 29, 73, 116, 130) are NOT tracked here —
// their 15 transpositions remain the original review queue in
// js/data/recasts.js (TRANSPOSITION_REVIEW), and their Plain Meanings
// are live by prior owner decision.

// ── Working set, batch 1 (owner read and approved 2026-09-24) ──
// Plain Meanings only: the Shakespeare course is Neutral American, so no
// dialect voice is written or reviewed here (owner decision, same day).
//
// These are OWNER EDITORIAL approvals. Frankie read each Plain Meaning
// against its original at #review and spoke for it individually; nothing
// was batch-approved, and no credentialed Shakespeare scholar has
// reviewed any of them. The revisionNotes on every entry say so, because
// the reviewer field alone would imply more than happened.
const OWNER_LIT = { status: 'approved', reviewer: 'Product owner', date: '2026-09-24' };
const OWNER_NOTE = 'Owner editorial approval, read against the original at #review. '
  + 'NOT a scholarly sign-off: no Shakespeare specialist has reviewed this text.';

// A VOICE needs a dialect/register review as well as a literary one, and
// the owner gives both. He is a native speaker of Neutral American and
// recorded the app's 42 nam phonemes himself, so the register read is
// his to give — but it is one person signing both halves, which the
// note states rather than leaving the two reviewer fields to imply
// independence they do not have.
const OWNER_DIA = { status: 'approved', reviewer: 'Product owner', date: '2026-09-24' };
const VOICE_NOTE = 'Owner approval, read line by line against the original. Both the '
  + 'literary and the Neutral American register read are his: he is a native speaker of '
  + 'the target dialect. ONE person signed both halves — NOT an independent specialist '
  + 'review, and NOT a scholarly sign-off on the Shakespeare.';

export const EDITION_REVIEWS = {
  '12.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '15.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '30.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '55.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '60.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },

  // ── Batch 2, love and loss (owner read and approved 2026-09-24) ──
  '27.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '40.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Reads "this more" as the mistress and the sonnet as '
      + 'betrayal, which is the majority reading but not the only one; approved with that '
      + 'single reading by owner decision after the alternative was raised.' },
  '64.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '65.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '71.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Closing sentence rewritten before approval: it had '
      + 'addressed reviewers rather than the learner.' },

  // ── Batch 3, worth and its withdrawal (owner approved 2026-09-24) ──
  '87.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '91.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '94.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Checked specifically for a hidden verdict: the text '
      + 'keeps the poem ambiguous between praise and warning rather than resolving what '
      + 'four centuries of critics have not.' },
  '104.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '106.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },

  // ── Batch 4, the Dark Lady group (owner approved 2026-09-24) ──
  '127.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: added a note that "black" in '
      + 'this group carries associations a modern reader cannot hear neutrally, and that '
      + 'the performance choice should be made deliberately.' },
  '129.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: the opening phrase is now '
      + 'glossed as physical (spirit as semen, expense as spending, a pun on waist), which '
      + 'the feature spec requires for sexual language and the draft had passed over.' },
  '138.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '141.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: two clauses reversed the '
      + 'original sense, on "tender feeling, to base touches prone" and on "who leaves '
      + 'unswayed the likeness of a man".' },
  '147.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: added a note on the closing '
      + 'line, where blackness is doing moral work rather than description.' },

  // ── In Today's Voice, Neutral American — batch 1 (2026-09-24) ──
  // The FIRST dialect voices approved anywhere in the catalog. Until now
  // every one of the 154 x 3 transpositions was a draft.
  //
  // What this unlocks: the transpositions are written one line per line
  // of the original, so an approved nam voice makes Side by Side pair up
  // line for line on that sonnet instead of showing the Plain Meaning
  // paragraph. That is the point of approving them.
  //
  // A voice needs BOTH a literary and a dialect/register review, and
  // these carry both from the same person. He is a native speaker of the
  // target register and recorded the app's 42 Neutral American phonemes
  // himself, so the dialect read is genuinely his to give. It is still
  // an OWNER read rather than an independent specialist's, and it is not
  // a scholarly sign-off on the Shakespeare. The notes say so on every
  // entry, because the reviewer field alone would imply more.
  //
  // Read five at a time, line by line against the original, and called
  // individually. Four lines were rewritten first and re-read before the
  // batch was approved; each entry records which and why.
  '1.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 8 rewritten before approval: “thy sweet self” is '
      + 'his OWN self, and the draft split the line between him and the speaker '
      + '(“someone I care about”), which loses the self-harm the line is about.' },
  '2.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 9 rewritten before approval: the draft replaced '
      + '“How much more praise deserv’d” with a bare stage direction, throwing away the '
      + 'comparative the whole sestet turns on.' },
  '3.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 5 to 7 redistributed before approval: the draft '
      + 'compressed the original’s 5 AND 6 into its line 5, so lines 6 and 7 were '
      + 'answering the line above them. Matching line COUNTS had hidden it — only '
      + 'reading the pairs shows it.' },
  '4.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 1 rewritten before approval: “unthrifty” is '
      + 'spendthrift, and the draft’s “cheap” pulled toward the miser, who is line 5.' },
  '5.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },

  // ── Batch 2, sonnets 6 to 10 (owner approved 2026-09-24) ──
  // Heavier than batch 1: three of the five had drifted, plus an
  // invented line. The failure is always the same shape — one line
  // swallows a line and a half of the original and pushes everything
  // after it a step out — and the line COUNTS stay perfect throughout,
  // so alignedLines() cannot see any of it. Only reading the pairs can.
  '6.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 9 and 10 un-swapped before approval: the '
      + 'original puts the claim on 9 and the condition on 10, and the draft had them '
      + 'the other way round.' },
  '7.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged. Its opening quatrain '
      + 'redistributes Shakespeare’s enjambment and still pairs.' },
  '8.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 5 to 7 rewritten before approval: the draft '
      + 'dropped the conditional. Shakespeare allows that the harmony MIGHT offend him '
      + 'and says it would only be a gentle reproof; the draft asserted both and rewired '
      + 'the rhetoric with an added “Here’s why:”.' },
  '9.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 4 to 8 redistributed before approval: line 4 had '
      + 'swallowed the original’s 4 AND 5, so the contrast between the world’s grief and '
      + 'the ordinary widow’s consolation fell on the wrong lines.' },
  '10.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Three fixes before approval: lines 5 to 8 had drifted '
      + 'by one and lost “murderous hate” entirely; line 8 was INVENTED commentary with '
      + 'no counterpart in the sonnet (“That’s not neutrality. That’s hate with a plan.”) '
      + 'and is gone; line 13’s “for love of me” is his love for the speaker, and the '
      + 'draft had turned it around.' },

  // ── Batch 3, sonnets 11 to 15 (owner approved 2026-09-24) ──
  // The cleanest batch so far: no drift anywhere, and nothing rewritten.
  // Three word choices in 11 were raised, weighed and deliberately left,
  // which is recorded here so nobody "fixes" them later.
  '11.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged, with three readings considered and '
      + 'KEPT: line 14 renders Shakespeare\u2019s \u201ccopy\u201d as \u201coriginal\u201d, which is right for '
      + 'a modern ear \u2014 in Elizabethan printing the copy is the master a printer works '
      + 'from, and \u201ccopy\u201d now means the opposite. Line 7\u2019s consequence sits in line 8, '
      + 'and \u201cfor store\u201d is softened to \u201cbuilt without care\u201d; both are half a line and '
      + 'self-correcting.' },
  '12.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },
  '13.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged. \u201cDetermination\u201d is read in its legal '
      + 'sense, as the lease running out, which is correct.' },
  '14.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },
  '15.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },
};
