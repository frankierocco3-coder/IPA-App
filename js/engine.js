// Exercise generator. Everything is derived from PHONEMES/WORDS so that
// distractors are provably wrong (checked against real transcriptions).

import { PHONEMES, WORDS, MINIMAL_PAIRS } from './data/phonemes.js';
import { EXERCISES_PER_LESSON } from './data/course.js';

const shuffle = arr => arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const contains = (entry, ph) => entry.ipa.includes(ph);
const ipaString = entry => '/' + entry.ipa.join('') + '/';

// The core course uses RP as its reference accent, so untagged and
// RP-tagged words form the default pool; other accents get their own.
const poolFor = accent => WORDS.filter(w => !w.accent || w.accent === (accent ?? 'rp'));
const wordsWith = (ph, accent) => poolFor(accent).filter(w => contains(w, ph));
const wordsWithout = (phs, accent) => poolFor(accent).filter(w => phs.every(p => !contains(w, p)));

const ACCENT_NAMES = { rp: 'RP', nam: 'Neutral American' };

// ── Individual generators ─────────────────────────────────────

function genSymbolToWord(target, accent) {
  const correctPool = wordsWith(target, accent);
  if (!correctPool.length) return null;
  const correct = pick(correctPool);
  const distractors = shuffle(wordsWithout([target], accent).filter(w => w.word !== correct.word)).slice(0, 3);
  if (distractors.length < 3) return null;
  const choices = shuffle([{ label: correct.word, ok: true }, ...distractors.map(d => ({ label: d.word }))]);
  return {
    type: 'choice',
    prompt: `Which word contains the sound /${target}/?`,
    display: `/${target}/`,
    displayHint: PHONEMES[target].hint,
    choices,
    explain: `“${correct.word}” is ${ipaString(correct)} — it has /${target}/. (${PHONEMES[target].name})`,
  };
}

function genSoundToSymbol(target, lessonPhonemes, accent) {
  const wordPool = wordsWith(target, accent);
  if (!wordPool.length) return null;
  const word = pick(wordPool);
  const wrong = shuffle(lessonPhonemes.filter(p => p !== target && !contains(word, p)));
  const filler = shuffle(Object.keys(PHONEMES).filter(p => !lessonPhonemes.includes(p) && !contains(word, p) && PHONEMES[p].type === PHONEMES[target].type));
  const distractors = [...wrong, ...filler].slice(0, 3);
  if (distractors.length < 3) return null;
  const choices = shuffle([{ label: `/${target}/`, ok: true }, ...distractors.map(d => ({ label: `/${d}/` }))]);
  return {
    type: 'choice',
    prompt: `Listen. Which of these sounds is in “${word.word}”?`,
    audioText: word.word,
    display: word.word,
    choices,
    explain: `“${word.word}” is ${ipaString(word)} — it contains /${target}/.`,
  };
}

function genDescription(target, lessonPhonemes) {
  const sameType = p => PHONEMES[p].type === PHONEMES[target].type;
  const wrong = shuffle(lessonPhonemes.filter(p => p !== target && sameType(p)));
  const filler = shuffle(Object.keys(PHONEMES).filter(p => !lessonPhonemes.includes(p) && sameType(p)));
  const distractors = [...wrong, ...filler].slice(0, 3);
  if (distractors.length < 3) return null;
  const choices = shuffle([{ label: `/${target}/`, ok: true }, ...distractors.map(d => ({ label: `/${d}/` }))]);
  return {
    type: 'choice',
    prompt: 'Which symbol matches this description?',
    display: PHONEMES[target].hint,
    smallDisplay: true,
    choices,
    explain: `/${target}/ — ${PHONEMES[target].hint}. As in “${PHONEMES[target].examples[0]}”.`,
  };
}

// 4 symbol↔word pairs where each word contains exactly its own symbol
// and none of the other three.
function genMatch(lessonPhonemes, accent) {
  const phs = shuffle([...lessonPhonemes]);
  const chosen = [];
  for (const ph of phs) {
    if (chosen.length === 4) break;
    const others = [...chosen.map(c => c.ph)];
    const candidates = wordsWith(ph, accent).filter(w =>
      others.every(o => !contains(w, o)) &&
      chosen.every(c => !contains(c.entry, ph)) &&
      !chosen.some(c => c.entry.word === w.word)
    );
    if (candidates.length) chosen.push({ ph, entry: pick(candidates) });
  }
  if (chosen.length < 3) return null;
  return {
    type: 'match',
    prompt: 'Match each symbol to a word that contains it.',
    pairs: chosen.map(c => ({ sym: `/${c.ph}/`, word: c.entry.word })),
  };
}

function genBuild(lessonPhonemes, { accent = null } = {}) {
  const pool = (accent ? WORDS.filter(w => w.accent === accent) : poolFor(null)).filter(w =>
    w.ipa.length >= 2 && w.ipa.length <= 5 &&
    w.ipa.some(p => lessonPhonemes.includes(p))
  );
  if (!pool.length) return null;
  const entry = pick(pool);
  const distractorTiles = shuffle(Object.keys(PHONEMES).filter(p => !entry.ipa.includes(p))).slice(0, 3);
  return {
    type: 'build',
    prompt: `Build the transcription of “${entry.word}”.`,
    audioText: entry.word,
    display: entry.word,
    target: [...entry.ipa],
    tiles: shuffle([...entry.ipa].concat(distractorTiles)),
    explain: `“${entry.word}” = ${ipaString(entry)}${entry.note ? ` — ${entry.note}` : ''}`,
  };
}

function genMinimalPair() {
  const [a, b] = pick(MINIMAL_PAIRS);
  const ea = WORDS.find(w => w.word === a);
  const eb = WORDS.find(w => w.word === b);
  const said = pick([ea, eb]);
  const choices = shuffle([
    { label: ea.word, sub: ipaString(ea), ok: said === ea },
    { label: eb.word, sub: ipaString(eb), ok: said === eb },
  ]);
  return {
    type: 'choice',
    prompt: 'Listen carefully. Which word did you hear?',
    audioText: said.word,
    hideUntilPlayed: true,
    choices,
    explain: `You heard “${said.word}” ${ipaString(said)}.`,
  };
}

// Accent feature question: the accent's correct transcription vs the
// characteristic mistakes a learner of that accent makes.
const ACCENT_ERRORS = {
  rp: [
    // rhotic error: pronouncing the dead /r/
    ipa => ipa.flatMap(p => (['ɑː', 'ɔː', 'ɜː', 'ɪə', 'eə', 'ʊə'].includes(p) ? [p, 'r'] : [p])),
    // flat-BATH error
    ipa => ipa.map(p => (p === 'ɑː' ? 'æ' : p)),
    // vowel-quality slips
    ipa => ipa.map(p => (p === 'ɔː' ? 'ɒ' : p === 'ɜː' ? 'e' : p === 'ɪə' ? 'iː' : p)),
  ],
  nam: [
    // non-rhotic error: dropping the /r/ (and de-rhotacizing ɝ/ɚ)
    ipa => ipa.filter(p => p !== 'r').map(p => (p === 'ɝ' ? 'ɜː' : p === 'ɚ' ? 'ə' : p)),
    // British-vowel errors: broad BATH, rounded LOT, RP GOAT
    ipa => ipa.map(p => (p === 'æ' ? 'ɑː' : p === 'ɑ' ? 'ɒ' : p === 'oʊ' ? 'əʊ' : p)),
    // r-coloring slip: plain vowel + r instead of ɝ/ɚ
    ipa => ipa.flatMap(p => (p === 'ɝ' ? ['ɜː', 'r'] : p === 'ɚ' ? ['ə', 'r'] : [p])),
  ],
};

function genAccentFact(accent) {
  const entry = pick(WORDS.filter(w => w.accent === accent));
  const wrongs = ACCENT_ERRORS[accent].map(fn => fn(entry.ipa));
  const uniqueWrongs = [...new Map(wrongs.map(w => [w.join(''), w])).values()]
    .filter(w => w.join('') !== entry.ipa.join(''))
    .slice(0, 2);
  if (!uniqueWrongs.length) return null;
  const name = ACCENT_NAMES[accent];
  const choices = shuffle([
    { label: '/' + entry.ipa.join('') + '/', ok: true },
    ...uniqueWrongs.map(w => ({ label: '/' + w.join('') + '/' })),
  ]);
  return {
    type: 'choice',
    prompt: `How does ${name} pronounce “${entry.word}”?`,
    audioText: entry.word,
    display: entry.word,
    choices,
    explain: `${name}: ${ipaString(entry)}${entry.note ? ` — ${entry.note}` : ''}`,
  };
}

// ── Lesson assembly ───────────────────────────────────────────

const GENERATORS = {
  symbolToWord: l => genSymbolToWord(pick(l.phonemes), l.accent),
  soundToSymbol: l => genSoundToSymbol(pick(l.phonemes), l.phonemes, l.accent),
  description: l => genDescription(pick(l.phonemes), l.phonemes),
  match: l => genMatch(l.phonemes, l.accent),
  build: l => genBuild(l.phonemes, { accent: l.accent }),
  minimalPair: () => genMinimalPair(),
  accentFact: l => genAccentFact(l.accent),
};

export function generateLesson(lesson) {
  const exercises = [];
  const seen = new Set();
  let guard = 0;
  while (exercises.length < EXERCISES_PER_LESSON && guard++ < 300) {
    // Rotate through types; the guard offset means an exhausted type
    // (no fresh material left) falls through to the others.
    const type = lesson.types[(exercises.length + Math.floor(guard / 15)) % lesson.types.length];
    const ex = GENERATORS[type](lesson);
    if (!ex) continue;
    const key = [
      ex.type, ex.prompt ?? '', ex.display ?? '', ex.audioText ?? '',
      ex.pairs?.map(p => p.sym).join() ?? '',
      ex.choices?.map(c => c.label).sort().join() ?? '',
    ].join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    exercises.push(ex);
  }
  return shuffle(exercises);
}
