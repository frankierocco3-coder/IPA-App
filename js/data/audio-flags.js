// Audio quality flags — the single source of truth for which clips may play.
//
// Every entry here exists because Frankie LISTENED and judged it. Code must
// never add to these lists; the #audit page exports a new version of this
// file for a human to review and commit. See docs/AUDIO_RECORDING_SPEC.md.

// Clips rejected by ear. Playback skips these; they are queued for
// regeneration. Format: '<dialect>/<voice>/<clip-name>' (no extension).
export const KNOWN_BAD = [
  'nam/f/car',     // uvular/French-sounding R — must be American approximant
  'nam/f/care',    // rejected in the 2026-07-30 ear-check
  'nam/f/strut',   // vowel drifts toward "stroot" — not /strʌt/
  'nam/f/was',     // rejected in the 2026-07-30 ear-check
  'nam/m/car',     // rejected in the 2026-07-30 ear-check — BOTH nam voices fail this word
  'nam/m/law',     // rejected in the 2026-07-30 ear-check
  'nam/m/strut',   // rejected in the 2026-07-30 ear-check — BOTH nam voices fail this word
];
// With every variant of nam "strut" and nam "car" rejected, those two words
// fall back to the device voice (words may; phonemes never) until they are
// regenerated and re-approved.

// Isolated-phoneme clips approved for playback.
//
// 2026-07-30: the owner briefly batch-approved 350 TTS-coaxed candidates,
// then REVERSED the decision the same day after listening — coaxed TTS
// phonemes weren't good enough, and the plan is to record human ones
// (see docs/PHONEME_RECORDING_PLAN.md, including how to add recordings).
// The candidates were removed from the repo (recoverable from git
// history). Until human recordings land and are approved here, sound
// pages show a decorative symbol and words carry the audio.
//
// 2026-09-22: the first HUMAN recordings — Frankie's own voice. The whole
// General American course (42: the 16-sound pilot, then the other 26),
// every one marked Good by ear at #audit.
export const APPROVED_PHONEMES = [
  'nam/reference/american_goat',
  'nam/reference/american_letter',
  'nam/reference/american_lot_palm',
  'nam/reference/american_nurse',
  'nam/reference/b_syllable',
  'nam/reference/ch_syllable',
  'nam/reference/choice_diphthong',
  'nam/reference/d_syllable',
  'nam/reference/dress_vowel',
  'nam/reference/eng',
  'nam/reference/esh',
  'nam/reference/eth',
  'nam/reference/ezh',
  'nam/reference/f',
  'nam/reference/face_diphthong',
  'nam/reference/fleece_vowel',
  'nam/reference/foot_vowel',
  'nam/reference/g_syllable',
  'nam/reference/goose_vowel',
  'nam/reference/h',
  'nam/reference/happy_vowel',
  'nam/reference/j_syllable',
  'nam/reference/k_syllable',
  'nam/reference/kit_vowel',
  'nam/reference/l',
  'nam/reference/m',
  'nam/reference/mouth_diphthong',
  'nam/reference/n',
  'nam/reference/p_syllable',
  'nam/reference/price_diphthong',
  'nam/reference/r',
  'nam/reference/s',
  'nam/reference/schwa',
  'nam/reference/strut_vowel',
  'nam/reference/t_syllable',
  'nam/reference/theta',
  'nam/reference/thought_vowel',
  'nam/reference/trap_vowel',
  'nam/reference/v',
  'nam/reference/w_syllable',
  'nam/reference/yod_syllable',
  'nam/reference/z',
];
