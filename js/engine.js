// Exercise generator. Everything is derived from PHONEMES/WORDS so that
// distractors are provably wrong (checked against real transcriptions).

import { PHONEMES, WORDS, MINIMAL_PAIRS } from './data/phonemes.js';
import { EXERCISES_PER_LESSON } from './data/course.js';

const shuffle = arr => arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const contains = (entry, ph) => entry.ipa.includes(ph);
const wordsWith = ph => WORDS.filter(w => contains(w, ph));
const wordsWithout = phs => WORDS.filter(w => phs.every(p => !contains(w, p)));
const ipaString = entry => '/' + entry.ipa.join('') + '/';

// ── Individual generators ─────────────────────────────────────

function genSymbolToWord(target) {
  const correctPool = wordsWith(target);
  if (!correctPool.length) return null;
  const correct = pick(correctPool);
  const distractors = shuffle(wordsWithout([target]).filter(w => w.word !== correct.word)).slice(0, 3);
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

function genSoundToSymbol(target, lessonPhonemes) {
  const wordPool = wordsWith(target);
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
function genMatch(lessonPhonemes) {
  const phs = shuffle([...lessonPhonemes]);
  const chosen = [];
  for (const ph of phs) {
    if (chosen.length === 4) break;
    const others = [...chosen.map(c => c.ph)];
    const candidates = wordsWith(ph).filter(w =>
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

function genBuild(lessonPhonemes, { rpOnly = false } = {}) {
  const pool = WORDS.filter(w =>
    (rpOnly ? w.rp : true) &&
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

// RP feature question: correct RP transcription vs plausible wrong ones.
function genRpFact() {
  const entry = pick(WORDS.filter(w => w.rp));
  const wrongs = [];
  // Rhotic error: insert an r after the long vowel / centring diphthong.
  const rhotic = entry.ipa.flatMap(p => (['ɑː', 'ɔː', 'ɜː', 'ɪə', 'eə', 'ʊə'].includes(p) ? [p, 'r'] : [p]));
  if (rhotic.join('') !== entry.ipa.join('')) wrongs.push(rhotic);
  // BATH error: flat /æ/ instead of /ɑː/.
  const flat = entry.ipa.map(p => (p === 'ɑː' ? 'æ' : p));
  if (flat.join('') !== entry.ipa.join('')) wrongs.push(flat);
  // Vowel swap fallback.
  if (wrongs.length < 2) wrongs.push(entry.ipa.map(p => (p === 'ɔː' ? 'ɒ' : p === 'ɜː' ? 'e' : p === 'ɪə' ? 'iː' : p)));
  const uniqueWrongs = [...new Map(wrongs.map(w => [w.join(''), w])).values()]
    .filter(w => w.join('') !== entry.ipa.join(''))
    .slice(0, 2);
  const choices = shuffle([
    { label: '/' + entry.ipa.join('') + '/', ok: true },
    ...uniqueWrongs.map(w => ({ label: '/' + w.join('') + '/' })),
  ]);
  return {
    type: 'choice',
    prompt: `How does RP pronounce “${entry.word}”?`,
    audioText: entry.word,
    display: entry.word,
    choices,
    explain: `RP: ${ipaString(entry)}${entry.note ? ` — ${entry.note}` : ''}`,
  };
}

// ── Lesson assembly ───────────────────────────────────────────

const GENERATORS = {
  symbolToWord: l => genSymbolToWord(pick(l.phonemes)),
  soundToSymbol: l => genSoundToSymbol(pick(l.phonemes), l.phonemes),
  description: l => genDescription(pick(l.phonemes), l.phonemes),
  match: l => genMatch(l.phonemes),
  build: l => genBuild(l.phonemes, { rpOnly: l.rpOnly }),
  minimalPair: () => genMinimalPair(),
  rpFact: () => genRpFact(),
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
