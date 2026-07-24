// Audio for Speechcraft.
//
// Prefers pre-generated voice clips (audio/<accent>/<word>.mp3, made by
// tools/generate_voices.py with ElevenLabs) and falls back to the device's
// own TTS for anything not yet recorded — so the app keeps working with no
// clips at all, and improves word by word as clips are added.
//
// Clips are static files: no API key ever ships in the app.

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

// Map an accent id to the TTS language that should voice it.
export const ACCENT_LANG = { rp: 'en-GB', nam: 'en-US', aus: 'en-AU' };

// …and back again, so a spoken language picks the right clip folder.
const LANG_DIR = { 'en-GB': 'rp', 'en-US': 'nam', 'en-AU': 'aus' };

// Which words have a recorded clip: {accent: {voice key: [words]}}. Each
// accent can have several voices (male/female); we pick between them at
// random so an accent is heard from more than one speaker — that's how you
// learn to recognise the accent itself rather than one person's voice.
// Until the index loads (or if it never does) every word uses device TTS.
let clipIndex = null;
fetch('audio/index.json')
  .then(r => (r.ok ? r.json() : null))
  .then(idx => { if (idx) clipIndex = idx; })
  .catch(() => {});

const clipName = word => word.toLowerCase().replace(/[^a-z0-9]+/g, '_');

// Voice keys for this accent that actually have this word recorded.
function voicesWith(dir, word) {
  const variants = clipIndex?.[dir];
  if (!variants) return [];
  const name = clipName(word);
  return Object.keys(variants).filter(v => variants[v].includes(name));
}

let current = null;

function playClip(dir, voice, word, fallback) {
  const el = new Audio(`audio/${dir}/${voice}/${clipName(word)}.mp3`);
  current = el;
  // If the file turns out to be missing or unplayable, fall back to TTS.
  el.addEventListener('error', () => deviceSpeak(word, fallback), { once: true });
  el.play().catch(() => deviceSpeak(word, fallback));
}

function deviceSpeak(text, { rate = 0.85, lang = 'en-GB' }) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (!voiceCache[lang]) voiceCache[lang] = pickVoice(lang);
  const voice = voiceCache[lang];
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? lang;
  u.rate = rate;
  speechSynthesis.speak(u);
}

export function speak(text, { rate = 0.85, lang = 'en-GB' } = {}) {
  speechSynthesis.cancel();
  if (current) { current.pause(); current = null; }

  const dir = LANG_DIR[lang] ?? 'rp';
  const options = voicesWith(dir, text);
  if (options.length) {
    const voice = options[Math.floor(Math.random() * options.length)];
    return playClip(dir, voice, text, { rate, lang });
  }
  deviceSpeak(text, { rate, lang });
}
