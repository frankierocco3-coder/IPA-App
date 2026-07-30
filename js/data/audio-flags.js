// Audio quality flags — the single source of truth for which clips may play.
//
// Every entry here exists because Frankie LISTENED and judged it. Code must
// never add to these lists; the #audit page exports a new version of this
// file for a human to review and commit. See docs/AUDIO_RECORDING_SPEC.md.

// Clips rejected by ear. Playback skips these; they are queued for
// regeneration. Format: '<dialect>/<voice>/<clip-name>' (no extension).
export const KNOWN_BAD = [
  'nam/f/strut',   // vowel drifts toward "stroot" — not /strʌt/
  'nam/f/car',     // uvular/French-sounding R — must be American approximant
];

// Isolated-phoneme clips approved by ear. A phoneme control only plays
// when its clip is listed here — generated-but-unheard candidates never
// reach learners. Format: '<dialect>/<voice>/<phoneme-slug>'.
// (No isolated phoneme clips have been produced yet — next milestone.)
export const APPROVED_PHONEMES = [];
