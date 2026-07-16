// TTS via the Web Speech API, preferring a British English voice so RP
// content sounds roughly right. Swappable later for recorded audio.

let voice = null;

function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find(v => /en[-_]GB/i.test(v.lang) && /Daniel|Serena|Kate/i.test(v.name)) ??
    voices.find(v => /en[-_]GB/i.test(v.lang)) ??
    voices.find(v => /^en/i.test(v.lang)) ??
    voices[0]
  );
}

speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); };
voice = pickVoice();

export function speak(text, { rate = 0.85 } = {}) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!voice) voice = pickVoice();
  if (voice) u.voice = voice;
  u.rate = rate;
  speechSynthesis.speak(u);
}
