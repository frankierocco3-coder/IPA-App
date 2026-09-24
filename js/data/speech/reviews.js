// Speech content governance ledger — the single record of review
// status for every Speech-system content record (course lessons,
// routines, approaches, practice texts).
//
// Follows the edition-reviews.js pattern: ABSENCE FROM THIS LEDGER
// MEANS DRAFT. A record becomes approved only when a human reviewer
// of the REQUIRED TYPE is recorded here by the owner, one entry at a
// time — never in code sweeps, and never by Claude, who may not
// approve his own writing.
//
// Required reviewer types (owner order, Phase 14):
//   'voice-professional'  — anatomy & vocal health: appropriately
//                           qualified voice professional or
//                           speech-language pathologist
//   'acting-professional' — acting principles and methods: qualified
//                           acting teacher or coach
//   'rhetoric'            — knowledgeable rhetoric/oratory reviewer
//   'dialect'             — qualified reviewer for the relevant
//                           dialect or route
//   'editorial'           — literary/editorial accuracy
//
// Entry shape (mirrors EDITION_REVIEWS):
//   'record-id': { verdict: 'approved', reviewerType, reviewer,
//                  date: 'YYYY-MM-DD', version: 1, notes? }
//
// LEARNER-FACING POLICY (mirrors the accepted bridge/edition/DiA
// precedent):
//   - requiredReviewer 'editorial' records may render learner-facing
//     while their editorial review is pending, exactly as Playable
//     Actions and the preface did on owner acceptance; they remain
//     listed in #review until reviewed.
//   - requiredReviewer 'voice-professional', 'acting-professional' and
//     'dialect' records NEVER render their bodies learner-facing while
//     draft: learners see an honest awaiting-review state; full drafts
//     live in the protected #review area only.
//   - Routines additionally gate on reviewBatch (only batch 1 may be
//     learner-facing at all — the other sixteen are #review-only).

// PRODUCT-OWNER APPROVAL (2026-08-14). The owner approved the Speech
// textbook chapters for learner-facing publication. The reviewer is
// recorded truthfully as the product owner — no clinical or acting
// professional has reviewed anything, and no name or credential is
// invented. Acting drafts are untouched and remain in review.
//
// MIGRATED 2026-08-19: these entries originally used verdict 'approved',
// which speechApproved() reads as SPECIALIST sign-off — so the seven
// chapters silently left the awaiting-specialist queue while their own
// notes said no specialist had reviewed them. They now carry the
// 'owner-approved' verdict the Acting order introduced: published
// exactly as before, specialist review honestly still outstanding.
export const SPEECH_REVIEWS = {
  'sp-f-instrument': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-breath': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-effort': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-hides': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-09-03', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-costs': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-09-03', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-diaphragm': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-09-03', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-ease': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-09-03', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-jaw': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-voice': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-articulation': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },
  'sp-f-health': { verdict: 'owner-approved', reviewerType: 'product-owner', reviewer: 'Product owner',
    date: '2026-08-14', version: 1,
    notes: 'Approved by the product owner for learner-facing publication. This is an owner decision, not a clinical sign-off: no doctor, speech-language pathologist or voice specialist has reviewed this chapter.' },

// PRODUCT-OWNER EDITORIAL APPROVAL (2026-08-17) — the 32 Acting items.
// verdict 'owner-approved' is deliberately DISTINCT from 'approved':
// it publishes the material for preview while recording, truthfully,
// that no acting professional has reviewed it. Specialist review is
// still outstanding for every item below.
  'ac-behavior': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-circumstances': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-facts': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-objective': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-obstacle': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-stakes': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-urgency': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-offbook': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-question': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-who': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-before': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-changed': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-relationships': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-beats': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-subtext': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-actions': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-attention': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-receiving': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-moment': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-newinfo': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-repetition': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-playing': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-monologue': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-scene': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-rehearsal': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-integrating': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-applying': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-performance': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  // Using the Fourth Wall (6.6), owner-approved 2026-09-14 after a
  // full read of the draft copy (docs/BUILD_FOURTH_WALL.md). Same
  // editorial decision as the rest of the Acting course.
  'ac-fourthwall': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-14', version: 1,
    notes: 'Editorially approved by the product owner for publication on 2026-09-14. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },

  'ac-objective-text': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-16', version: 1,
    notes: 'Editorially approved by the product owner for publication on 2026-09-16. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },

  'ac-twohander': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-17', version: 1,
    notes: 'Editorially approved by the product owner for publication on 2026-09-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },

  // Building a Character (4.1-4.7) and Tempo-Rhythm (5.1-5.6),
  // owner-approved 2026-08-26 by the same editorial decision as the
  // original 28 Acting lessons. Specialist review is still owed.
  'ac-inside': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-room': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-waysin': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-noaim': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-transcribe': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-essence': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-dials': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-feeling': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-tworhythms': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-harmony': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-rests': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-speeds': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-26', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-26. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },

  // Module 4 rebuild (two roads, ten lessons) and The Professional
  // Actor collection, owner-approved 2026-08-27 by the same editorial
  // decision as the rest of Acting. Specialist review is still owed.
  'ac-fourlists': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-character': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-analysis': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-archetypes': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-offbook': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-choices': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-notes': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-early': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-director': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-audition': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-stageset': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ac-pro-reputation': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-27', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-27. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'stanislavski': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'adler': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'meisner': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'chekhov': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-08-17', version: 1,
    notes: 'Editorially approved by the product owner for preview publication on 2026-08-17. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },

  // ── Building a Character (owner order 2026-09-23) ────────────
  // The course launches on the owner's editorial approval, exactly as
  // Acting did. Specialist review by a named acting teacher or coach
  // remains OUTSTANDING for every record below and is tracked in
  // #review; awaitingSpecialist() stays true until one signs off.
  'ch-cm-why': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-history': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-slapstick': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-scenario': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-form': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-archetypes': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-mask': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-cast': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-pantalone': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-dottore': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-lovers': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-capitano': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-brighella': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-arlecchino': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-colombina': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-pulcinella': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-pedrolino': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-cm-lazzi': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-own': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-leads': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-imaginary': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-weight': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-walk': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-animal': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ph-gesture': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-vo-follows': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-vo-qualities': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-vo-rhythm': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-vo-accent': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-vo-habit': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-inside': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-room': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-waysin': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-everyday': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-noaim': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-transcribe': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-essence': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-questions': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-st-play': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-st-body': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-st-voice': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-st-seesaw': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-st-space': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ro-page': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ro-howfar': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ro-holding': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
  'ch-ro-bible': { verdict: 'owner-approved', reviewerType: 'product-owner-editorial',
    reviewer: 'Product owner', date: '2026-09-23', version: 1,
    notes: 'Editorially approved by the product owner for learner-facing publication on 2026-09-23. This is an owner editorial decision, NOT specialist sign-off: no qualified acting teacher, coach or studio has reviewed this material, and none is named.' },
};

export const speechReviewFor = id => SPEECH_REVIEWS[id] ?? null;

// Specialist sign-off by a qualified professional.
export const speechApproved = id => SPEECH_REVIEWS[id]?.verdict === 'approved';

// Cleared to appear to learners — specialist sign-off OR an explicit
// product-owner editorial approval. Publication and specialist review
// are separate facts and must stay separately queryable.
export const speechPublished = id =>
  ['approved', 'owner-approved'].includes(SPEECH_REVIEWS[id]?.verdict);

// Still awaiting a qualified specialist, whether or not it is published.
export const awaitingSpecialist = id => SPEECH_REVIEWS[id]?.verdict !== 'approved';

// The learner-body gate for a content record: professional-tier
// content requires an approval entry; editorial-tier content may show
// while pending (still listed in #review).
export const speechBodyVisible = record =>
  record.requiredReviewer === 'editorial' ? true : speechPublished(record.id);

// Truthful label for whoever signed a record off.
export const speechReviewerLabel = id => {
  const r = SPEECH_REVIEWS[id];
  return r ? `${r.reviewer} · ${r.date}` : 'None recorded';
};
