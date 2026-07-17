// TTS via the Web Speech API. Picks the highest-quality British English
// voice the device offers (enhanced/premium voices first), so audio is as
// good as each device allows. Swappable later for recorded audio files.

let voice = null;

function scoreVoice(v) {
  let s = 0;
  if (/en[-_]GB/i.test(v.lang)) s += 100;
  else if (/^en/i.test(v.lang)) s += 40;
  else return 0;
  // Higher-quality tiers reveal themselves in the name on Apple devices.
  if (/enhanced|premium|natural|neural/i.test(v.name)) s += 50;
  // Known-good named voices beat novelty ones (Grandma, Rocko, Bells…).
  if (/daniel|serena|kate|stephanie|martha|oliver|arthur/i.test(v.name)) s += 20;
  if (/eddy|flo|grandma|grandpa|rocko|sandy|shelley|reed|bells|organ|cellos|zarvox|trinoids|jester|whisper|bad news|good news|bubbles|boing|albert/i.test(v.name)) s -= 30;
  if (v.localService) s += 5; // no network hiccups mid-lesson
  return s;
}

function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  return voices.reduce((best, v) => (scoreVoice(v) > scoreVoice(best) ? v : best), voices[0]);
}

speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); };
voice = pickVoice();

export function speak(text, { rate = 0.85 } = {}) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!voice) voice = pickVoice();
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? 'en-GB';
  u.rate = rate;
  speechSynthesis.speak(u);
}
