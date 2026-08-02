// Audio for Speechcraft.
//
// Prefers pre-generated voice clips (audio/<accent>/<word>.mp3, made by
// tools/generate_voices.py with ElevenLabs) and falls back to the device's
// own TTS for anything not yet recorded — so the app keeps working with no
// clips at all, and improves word by word as clips are added.
//
// Clips are static files: no API key ever ships in the app.
//
// Two kinds of audio, never interchangeable:
//   speak(word)            — a WORD, from audio/<accent>/<voice>/, TTS fallback
//   playPhoneme(slug, acc) — an ISOLATED SOUND, from audio/phonemes/, no
//                            fallback of any kind: a word is not a phoneme,
//                            and TTS cannot say a bare IPA character.

import { KNOWN_BAD, APPROVED_PHONEMES } from './data/audio-flags.js';

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
export const ACCENT_LANG = { rp: 'en-GB', nam: 'en-US', aus: 'en-AU', ssbe: 'en-GB' };

// …and back again, so a spoken language picks the right clip folder. Two
// accents can share a TTS language (Traditional RP and Standard British are both
// en-GB), so callers with a known accent pass it explicitly — the lang
// mapping is only the fallback.
const LANG_DIR = { 'en-GB': 'rp', 'en-US': 'nam', 'en-AU': 'aus' };

// (An earlier build stored a per-course voice preference under
// 'speechcraft-voice-prefs'. It is deliberately ignored now — playback is
// random across a course's approved voices — and a stale key is harmless.)

// Which words have a recorded clip: {accent: {voice key: [words]}}. Each
// accent can have several voices (male/female); we pick between them at
// random so an accent is heard from more than one speaker — that's how you
// learn to recognise the accent itself rather than one person's voice.
// Until the index loads (or if it never does) every word uses device TTS.
let clipIndex = null;
let indexResolve;
export const indexReady = new Promise(r => { indexResolve = r; });
export const clipIndexLoaded = () => clipIndex != null;
fetch('audio/index.json')
  .then(r => (r.ok ? r.json() : null))
  .then(idx => { if (idx) clipIndex = idx; indexResolve(); })
  .catch(() => { indexResolve(); });

const clipName = word => word.toLowerCase().replace(/[^a-z0-9]+/g, '_');

// Voice keys for this accent that actually have this word recorded —
// excluding clips a human ear has rejected (see data/audio-flags.js).
const badSet = new Set(KNOWN_BAD);
// (exported for tests/audio.test.js — not part of the app-facing API)
export function voicesWith(dir, word) {
  const variants = clipIndex?.[dir];
  if (!variants) return [];
  const name = clipName(word);
  return Object.keys(variants).filter(v =>
    variants[v].includes(name) && !badSet.has(`${dir}/${v}/${name}`));
}

// True when `text` is speakable prose (a word/sentence), not a bare IPA
// string. speak() refuses IPA-only input — device TTS mangles it. A single
// ASCII letter alone ("a", "I") is a real word; "ʃɪp" (only its p is ASCII)
// is not.
export const isWordText = text => {
  const t = String(text ?? '').trim();
  return /^[a-zA-Z]$/.test(t) || /[a-zA-Z]{2,}/.test(t);
};

// ── Isolated phonemes ─────────────────────────────────────────
// Clips live in audio/phonemes/<accent>/<voice>/<slug>.mp3 and play ONLY
// when listed in APPROVED_PHONEMES — candidates that nobody has listened
// to never reach a learner. No word fallback, no TTS fallback, ever.
const approvedSet = new Set(APPROVED_PHONEMES);

function phonemeVariants(slug, accent) {
  // Voice keys come from the approved entries themselves — 'f'/'m' for the
  // original dialects, named speakers (alyx/peach) for newer ones.
  const out = [];
  for (const id of approvedSet) {
    const [a, v, s] = id.split('/');
    if (a === accent && s === slug) out.push(v);
  }
  return out;
}

export const hasPhonemeClip = (slug, accent) => phonemeVariants(slug, accent).length > 0;

/** Play an approved isolated-phoneme clip. Returns false when none exists. */
export function playPhoneme(slug, accent) {
  const options = phonemeVariants(slug, accent);
  if (!options.length) return false;
  if (current) { current.pause(); current = null; }
  if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
  const voice = options[Math.floor(Math.random() * options.length)];
  const el = new Audio(`audio/phonemes/${accent}/${voice}/${slug}.mp3`);
  current = el;
  el.play().catch(() => {});   // a missing approved file stays silent — never a word, never TTS
  return true;
}

let current = null;

function playClip(dir, voice, word, fallback) {
  const el = new Audio(`audio/${dir}/${voice}/${clipName(word)}.mp3`);
  current = el;
  // A 404 fires both 'error' and a play() rejection — guard so the fallback
  // runs only once. Strict courses never fall to TTS, even on a 404.
  let handled = false;
  const fall = () => {
    if (handled) return;
    handled = true;
    if (fallback?.strict) { console.warn(`[audio] ${dir} clip failed for “${word}” — staying silent`); return; }
    deviceSpeak(word, fallback);
  };
  el.addEventListener('error', fall, { once: true });
  el.play().catch(fall);
}

// Browsers gate speechSynthesis behind a user gesture and won't speak until
// the engine is "unlocked" by a first utterance inside one. Prime it on the
// very first pointer/key interaction so later taps actually produce sound.
let ttsUnlocked = false;
function unlockTTS() {
  if (ttsUnlocked) return;
  ttsUnlocked = true;
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    speechSynthesis.speak(u);
  } catch { /* no TTS here */ }
}
if (typeof window !== 'undefined') {
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, unlockTTS, { once: true, capture: true }));
}

// Held so Chrome cannot garbage-collect an utterance mid-speech — a real
// bug that manifests as random total silence.
let liveUtterance = null;

function deviceSpeak(text, { rate = 0.85, lang = 'en-GB' }) {
  if (!('speechSynthesis' in window)) return;
  // Only cancel when something is actually queued — a bare cancel() on an idle
  // engine can leave Chrome stuck and swallow the next utterance.
  if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
  // A stale paused engine silently queues everything forever — always clear
  // the paused state before speaking.
  try { speechSynthesis.resume(); } catch {}
  const u = new SpeechSynthesisUtterance(text);
  liveUtterance = u;
  u.addEventListener('end', () => { if (liveUtterance === u) liveUtterance = null; }, { once: true });
  if (!voiceCache[lang]) voiceCache[lang] = pickVoice(lang);
  const voice = voiceCache[lang];
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? lang;
  u.rate = rate;
  speechSynthesis.speak(u);
  // Chrome frequently stalls right after speak(); a resume() kick unsticks it.
  setTimeout(() => { try { if (speechSynthesis.speaking) speechSynthesis.resume(); } catch {} }, 80);
}

// `device: true` skips the pre-baked ElevenLabs clips and always uses the
// browser voice — used for running text (sonnets, monologues), where only a
// few words would have clips and the mix of clip/robot voices is jarring.
// EVERY course is strict: course audio plays a real recording or nothing.
// Device TTS exists only behind an explicit, labelled device:true request
// (running-text readings). A silent gap is a bug the deploy-gated coverage
// check exists to catch — never something to paper over with a robot voice.

// The universal resolver: one place that decides what a request maps to.
// Returns { status, kind, dir, voice, path, text } so the UI can render
// truthful availability and the tests can assert on exact routing.
export function resolveAudio({ kind = 'word', accent = null, lang = 'en-GB', text = null, slug = null }) {
  if (kind === 'phoneme' || kind === 'phonemeInSyllable') {
    const theSlug = kind === 'phonemeInSyllable' ? `${slug}_syllable` : slug;
    const options = phonemeVariants(theSlug, accent);
    if (!options.length) return { status: 'unavailable', kind, dir: accent, voice: null, path: null, text: null };
    const voice = options[Math.floor(Math.random() * options.length)];
    return { status: 'ok', kind, dir: accent, voice,
             path: `audio/phonemes/${accent}/${voice}/${theSlug}.mp3`, text: null };
  }
  // word | expression | sentence — all resolve by EXACT displayed text;
  // the filename derives from that text, so cross-content substitution is
  // structurally impossible.
  const dir = accent ?? LANG_DIR[lang] ?? 'rp';
  if (!isWordText(text)) return { status: 'unavailable', kind, dir, voice: null, path: null, text };
  const options = voicesWith(dir, text);
  if (!options.length) return { status: 'unavailable', kind, dir, voice: null, path: null, text };
  const voice = options[Math.floor(Math.random() * options.length)];
  return { status: 'ok', kind, dir, voice, path: `audio/${dir}/${voice}/${clipName(text)}.mp3`, text };
}

// True when a real, playable recording exists for this text in this course.
export const hasWordClip = (text, accent) => voicesWith(accent, text).length > 0;

// Returns what actually happened: 'clip' | 'tts' | 'silent' — the tests
// assert on this; app callers are free to ignore it.
export function speak(text, { rate = 0.85, lang = 'en-GB', device = false, accent = null, kind = 'word' } = {}) {
  if (!isWordText(text)) return 'silent';   // bare IPA is playPhoneme's job, never TTS's
  if (current) { current.pause(); current = null; }
  if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();

  if (device) {                              // explicit, labelled device reading
    deviceSpeak(text, { rate, lang });
    return 'tts';
  }
  const r = resolveAudio({ kind, accent, lang, text });
  if (r.status === 'ok') {
    playClip(r.dir, r.voice, text, { rate, lang, strict: true });
    return 'clip';
  }
  console.warn(`[audio] no ${r.dir} recording for “${text}” — staying silent (strict)`);
  return 'silent';
}

// Speak a device utterance and call `done` when it finishes (or errors).
function deviceSpeakThen(text, lang, done) {
  if (!('speechSynthesis' in window)) { done(); return; }
  try { speechSynthesis.resume(); } catch {}
  const u = new SpeechSynthesisUtterance(text);
  liveUtterance = u;
  if (!voiceCache[lang]) voiceCache[lang] = pickVoice(lang);
  const v = voiceCache[lang];
  if (v) u.voice = v;
  u.lang = v?.lang ?? lang;
  u.rate = 0.85;
  u.addEventListener('end', done, { once: true });
  u.addEventListener('error', done, { once: true });
  speechSynthesis.speak(u);
  setTimeout(() => { try { if (speechSynthesis.speaking) speechSynthesis.resume(); } catch {} }, 80);
}

// ── Controllable reading (play / pause / resume / stop) ───────
// A single "reading" at a time: a sequence of lines, each a clip or the
// device voice. Listeners hear state changes so a play/pause button can track
// it. `seq` is null when nothing is reading.
let seq = null;
let onState = null;

export function setSpeechListener(fn) { onState = fn; }
function emit(state) { try { onState?.(state); } catch {} }

export function stopSpeech() {
  const wasReading = seq != null || (current != null) || speechSynthesis.speaking;
  if (seq) seq.cancelled = true;
  seq = null;
  if (current) { current.pause(); current = null; }
  try { speechSynthesis.cancel(); } catch {}
  if (wasReading) emit('stopped');
}

export function pauseSpeech() {
  if (!seq || seq.paused) return;
  seq.paused = true;
  if (seq.el && !seq.el.paused) seq.el.pause();
  if (seq.tts) { try { speechSynthesis.pause(); } catch {} }
  emit('paused');
}

export function resumeSpeech() {
  if (!seq || !seq.paused) return;
  seq.paused = false;
  if (seq.el) seq.el.play().catch(() => {});
  if (seq.tts) { try { speechSynthesis.resume(); } catch {} }
  emit('playing');
}

// Read one line: a clip if given, else the device voice (with fallback).
export function speakLine(text, { lang = 'en-GB', clipUrl = null } = {}) {
  stopSpeech();
  if (clipUrl) {
    const el = new Audio(clipUrl);
    current = el;
    let handled = false;
    const fall = () => { if (handled) return; handled = true; deviceSpeak(text, { lang }); };
    el.addEventListener('error', fall, { once: true });
    el.play().catch(fall);
  } else {
    deviceSpeak(text, { lang });
  }
}

// Read a whole passage line by line — each line uses its clip when present,
// the device voice otherwise, chained into one flowing reading that can be
// paused and resumed.
export function speakSequence(items /* [{ text, clipUrl }] */, { lang = 'en-GB' } = {}) {
  stopSpeech();
  seq = { items, i: 0, lang, cancelled: false, paused: false, el: null, tts: false };
  emit('playing');
  stepSeq();
}

function stepSeq() {
  if (!seq || seq.cancelled) return;
  if (seq.i >= seq.items.length) { emit('ended'); seq = null; return; }
  const { text, clipUrl } = seq.items[seq.i];
  const next = () => { if (seq && !seq.cancelled) { seq.i++; stepSeq(); } };
  seq.el = null;
  seq.tts = false;
  if (clipUrl) {
    const el = new Audio(clipUrl);
    seq.el = el;
    current = el;
    let handled = false;
    const advance = () => { if (handled) return; handled = true; next(); };
    const fail = () => { if (handled) return; handled = true; seq.el = null; playTtsLine(text, next); };
    el.addEventListener('ended', advance, { once: true });
    el.addEventListener('error', fail, { once: true });
    if (!seq.paused) el.play().catch(fail);
  } else {
    playTtsLine(text, next);
  }
}

function playTtsLine(text, next) {
  if (!seq) return;
  seq.tts = true;
  deviceSpeakThen(text, seq.lang, () => { if (seq) seq.tts = false; next(); });
}
