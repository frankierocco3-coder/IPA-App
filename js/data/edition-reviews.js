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
};
