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

export const EDITION_REVIEWS = {};
