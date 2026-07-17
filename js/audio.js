// TTS via the Web Speech API. Picks the highest-quality voice the device
// offers for the requested language (enhanced/premium first), so RP content
// speaks British and Neutral American content speaks American.
// Swappable later for recorded audio files.

const voiceCache = {};

function scoreVoice(v, lang) {
  let s = 0;
  const wanted = lang.replace('-', '[-_]');
  if (new RegExp(wanted, 'i').test(v.lang)) s += 100;
  else if (/^en/i.test(v.lang)) s += 40;
  else return 0;
  // Higher-quality tiers reveal themselves in the name on Apple devices.
  if (/enhanced|premium|natural|neural/i.test(v.name)) s += 50;
  // Known-good named voices beat novelty ones (Grandma, Rocko, Bells…).
  if (/daniel|serena|kate|stephanie|martha|oliver|arthur|samantha|alex|allison|ava|joelle|nathan|noelle|tom|zoe/i.test(v.name)) s += 20;
  if (/eddy|flo|grandma|grandpa|rocko|sandy|shelley|reed|bells|organ|cellos|zarvox|trinoids|jester|whisper|bad news|good news|bubbles|boing|albert|fred|junior|kathy|ralph/i.test(v.name)) s -= 30;
  if (v.localService) s += 5; // no network hiccups mid-lesson
  return s;
}

function pickVoice(lang) {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  return voices.reduce((best, v) => (scoreVoice(v, lang) > scoreVoice(best, lang) ? v : best), voices[0]);
}

speechSynthesis.onvoiceschanged = () => { Object.keys(voiceCache).forEach(k => delete voiceCache[k]); };

export function speak(text, { rate = 0.85, lang = 'en-GB' } = {}) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!voiceCache[lang]) voiceCache[lang] = pickVoice(lang);
  const voice = voiceCache[lang];
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? lang;
  u.rate = rate;
  speechSynthesis.speak(u);
}

// Map an accent id to the TTS language that should voice it.
export const ACCENT_LANG = { rp: 'en-GB', nam: 'en-US' };
