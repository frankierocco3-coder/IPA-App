// Dialects in Speech — ONE shared structure, TWO entrances.
//
// This module holds NO dialect content of its own. Both entrances are
// facet maps over the SAME existing, review-governed records (sound
// inventories, Words & Expressions, Dialect in Action) — nothing is
// duplicated, and the
// existing dialect labels, course separation, approval gates and
// banned-terminology rules apply unchanged because the records are
// the same records.
//
//   IPA & Accents entrance — the sound system: how the dialect SOUNDS.
//   Speech entrance        — the dialect in use: how people SPEAK it.
//
// `renders` names the existing surface main.js routes each facet to.

export const DIALECT_FACETS = {
  ipa: [
    { id: 'sounds', title: 'Sound system & IPA', renders: 'inventory',
      note: 'Every vowel and consonant of the course target, with tongue placement, realizations and rhythm.' },
    { id: 'compare', title: 'Articulation & sound comparisons', renders: 'bridge-practice',
      note: 'Side-by-side comparisons where a reviewed route exists (Accent Bridge).' },
  ],
  speech: [
    { id: 'words', title: 'Vocabulary & expressions', renders: 'idioms',
      note: 'The words and expressions, each with context, register and usage notes.' },
  ],
};

// Pinned honesty line for both entrances (lint-guarded in spirit by the
// existing dialect standards): variation is the norm, stereotype is not
// a fact about speakers.
export const DIALECT_VARIATION_LINE =
  'Every dialect varies inside itself — by region, generation, situation and speaker. Sharing an accent never means sharing one personality, rhythm, status or way of behaving; how any person speaks grows from their circumstances, relationships and identity.';
