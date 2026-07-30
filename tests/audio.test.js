// Audio-model tests — run in the browser console with the app loaded:
//   import('./tests/audio.test.js').then(m => m.run());
//
// Verifies the phoneme/word separation contract: quarantined clips are
// never selectable, phoneme requests never fall back to words or TTS, and
// raw IPA never reaches speechSynthesis.

import { isWordText, voicesWith, hasPhonemeClip, playPhoneme } from '../js/audio.js';
import { KNOWN_BAD, APPROVED_PHONEMES } from '../js/data/audio-flags.js';

const results = [];
const check = (name, ok) => results.push({ name, ok });

export async function run() {
  // isWordText: words yes, bare IPA no
  check('isWordText: real word', isWordText('strut') === true);
  check('isWordText: single-letter word "a"', isWordText('a') === true);
  check('isWordText: sentence', isWordText('Read a sentence aloud') === true);
  check('isWordText: bare symbol ʌ', isWordText('ʌ') === false);
  check('isWordText: transcription ʃɪp', isWordText('ʃɪp') === false);
  check('isWordText: empty', isWordText('') === false);

  // Quarantine: flagged clips exist in the flags file…
  check('flags: nam/f/strut quarantined', KNOWN_BAD.includes('nam/f/strut'));
  check('flags: nam/f/car quarantined', KNOWN_BAD.includes('nam/f/car'));

  // …and are excluded from voice selection (index loads async — wait on an
  // unflagged word).
  let tries = 0;
  while (voicesWith('nam', 'ship').length === 0 && tries++ < 50) {
    await new Promise(r => setTimeout(r, 100));
  }
  check('voicesWith: nam strut fully quarantined (device fallback)', voicesWith('nam', 'strut').length === 0);
  check('voicesWith: nam car fully quarantined (device fallback)', voicesWith('nam', 'car').length === 0);
  check('voicesWith: nam care keeps only m', String(voicesWith('nam', 'care')) === 'm');
  check('voicesWith: nam law keeps only f', String(voicesWith('nam', 'law')) === 'f');
  check('voicesWith: unflagged word keeps both voices', voicesWith('nam', 'ship').length === 2);
  check('voicesWith: rp car untouched', voicesWith('rp', 'car').length === 2);

  // Phoneme requests: unapproved → unavailable, never a word, never TTS
  check('hasPhonemeClip: none approved yet',
    APPROVED_PHONEMES.length === 0 ? hasPhonemeClip('strut_vowel', 'nam') === false : true);
  check('playPhoneme: unapproved returns false', APPROVED_PHONEMES.length === 0
    ? playPhoneme('strut_vowel', 'nam') === false : true);
  const wasSpeaking = speechSynthesis.speaking || speechSynthesis.pending;
  playPhoneme('strut_vowel', 'nam');
  check('playPhoneme: never triggers TTS',
    (speechSynthesis.speaking || speechSynthesis.pending) === wasSpeaking);

  const failed = results.filter(r => !r.ok);
  results.forEach(r => console.log((r.ok ? '✓' : '✗') + ' ' + r.name));
  console.log(`audio tests: ${results.length - failed.length}/${results.length}`);
  return { total: results.length, failed: failed.length };
}
