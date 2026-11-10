// Scansion helper — splits a line into syllables and lays the iambic
// pentameter pulse over them (weak–STRONG ×5). English syllabification has
// no perfect rule set, so this is a computed guide, not gospel: it teaches
// where the metre *expects* stress, which is exactly the tension an actor
// plays against natural word stress. Trust your ear over the marks.

const STRONG = 'strong';
const WEAK = 'weak';

function isVowel(s, i) {
  const c = s[i];
  if ('aeiou'.includes(c)) return true;
  if (c === 'y') return i !== 0;      // y is a vowel except word-initially
  return false;
}

// HIATUS. Two vowel letters side by side are usually one sound (boat, rain,
// field), but after /i/ and /u/ they are often two syllables: ra-di-o,
// ac-tu-al, a-ca-de-mi-a. Treating every vowel run as a single nucleus lost
// that syllable, which was the single largest source of undercounting.
//
// The exceptions are where the consonant before swallows the glide into one
// sound: `ci ti si xi` become /ʃ/ (special, action, Asia, anxious), `ni li`
// become /j/ (union, million, brilliant), and `gu qu` are /ɡw kw/ (guard,
// quality). Those keep their run intact.
//
// `ie` is deliberately NOT split: field, piece, believe and chief outnumber
// quiet and alien, so splitting it costs more than it wins.
const HIATUS_KEEP_I = 'ctsxnl';
const HIATUS_KEEP_U = 'gq';

// Vowel-group nuclei as [start, end) ranges over a letters-only string.
function nuclei(s) {
  const groups = [];
  let i = 0;
  while (i < s.length) {
    if (isVowel(s, i)) {
      let j = i;
      while (j < s.length && isVowel(s, j)) j++;
      let a = i;
      for (let k = i; k < j - 1; k++) {
        const v = s[k], next = s[k + 1], prev = k > 0 ? s[k - 1] : '';
        const cut = (v === 'i' && 'aou'.includes(next) && !HIATUS_KEEP_I.includes(prev))
          || (v === 'u' && 'aeio'.includes(next) && !HIATUS_KEEP_U.includes(prev));
        if (cut) { groups.push([a, k + 1]); a = k + 1; }
      }
      groups.push([a, j]);
      i = j;
    } else i++;
  }
  return groups;
}

// Two letters, one sound. These can OPEN a syllable, so they travel to the
// next one: fa|ther, bu|shel, ne|phew.
const DIGRAPHS = new Set(['th', 'ch', 'sh', 'ph', 'wh', 'gh', 'qu']);
// Two letters, one sound, that can only CLOSE one — no English syllable
// begins /ck/ or /ŋ/. They stay with the vowel before them, so the cut falls
// after the pair: wick|ed, sing|er. Listing them as ordinary digraphs sent
// them forward and produced `wi|cked`.
const CODA_DIGRAPHS = new Set(['ck', 'ng']);

// Split one word into syllable chunks, preserving the original glyphs.
export function syllabify(word) {
  // letters-only, lowercase; remember how each letter maps back to the word
  const map = [];                      // map[k] = index in `word` of k-th letter
  let letters = '';
  for (let i = 0; i < word.length; i++) {
    const c = word[i].toLowerCase();
    if (c >= 'a' && c <= 'z') { letters += c; map.push(i); }
  }
  if (letters.length === 0) return [word];

  let groups = nuclei(letters);

  // Drop a silent final 'e' (name, love) — but keep syllabic '-le' (candle)
  // and keep '-Ced' where C is t/d (wanted) while dropping it elsewhere (wished).
  const dropSilent = (endsWith, guard) => {
    if (groups.length < 2) return;
    const last = groups[groups.length - 1];
    if (last[1] !== letters.length) return;         // only word-final nuclei
    if (guard()) groups.pop();
  };
  // final lone 'e'
  dropSilent('e', () => {
    const last = groups[groups.length - 1];
    if (!(last[1] - last[0] === 1 && letters[last[0]] === 'e')) return false;
    const before = letters[last[0] - 1], before2 = letters[last[0] - 2];
    if (before === 'l' && before2 && !isVowel(letters, last[0] - 2)) return false; // -Cle stays
    return true;                                     // silent e
  });
  // final '-ed' where the e isn't sounded. It IS sounded after /t d/ (wanted,
  // waded), which the rule handles, and in a closed set of adjectives and
  // stems where the spelling only looks like a suffix — ragged, wicked,
  // hatred, Alfred. Every word below was read out of the dictionary rather
  // than remembered: it is exactly the set whose IPA ends in a sounded /ɪd əd/
  // after a consonant. `blessed`, `learned`, `aged` and `dogged` are NOT here
  // on purpose — this dictionary gives them one syllable (blɛst, lɝnd), and
  // claiming two would put the speller and the dictionary into the very
  // disagreement that suppresses word stress in js/scan.js.
  const SYLLABIC_ED = new Set((
    'crooked jagged legged naked ragged rugged sacred wicked wretched '
    + 'hatred hundred kindred '
    + 'ahmed alfred allred alred gared jared khaled manfred medved mildred '
    + 'mohammed nedved wilfred winfred winifred').split(' '));
  if (letters.endsWith('ed') && groups.length >= 2) {
    const eIdx = letters.length - 2;
    const c = letters[letters.length - 3];
    const eGroup = groups[groups.length - 1];
    if (eGroup[0] === eIdx && c !== 't' && c !== 'd' && !SYLLABIC_ED.has(letters)) {
      groups.pop();
    }
  }
  // final '-es' silent after a magic-e stem (shines, makes, hopes) but kept
  // syllabic after a sibilant/soft consonant (roses, boxes, faces, changes).
  if (letters.endsWith('es') && groups.length >= 2) {
    const eIdx = letters.length - 2;
    const c = letters[letters.length - 3];
    const c2 = letters[letters.length - 4];
    // `-Cle` keeps its vowel through the plural exactly as it does in the
    // singular: candle/candles, wrinkle/wrinkles, table/tables. Without this
    // the plural lost a syllable the singular kept — `wrinkles` scanned as
    // one. The silent-e rule above already guards the same shape.
    const syllabicLe = c === 'l' && c2 !== undefined
      && !isVowel(letters, letters.length - 4);
    const syllabic = 'szxcg'.includes(c) || (c === 'h' && (c2 === 'c' || c2 === 's'))
      || syllabicLe;
    const eGroup = groups[groups.length - 1];
    if (eGroup[0] === eIdx && !syllabic) groups.pop();
  }

  // Internal silent 'e' of a magic-e stem before a common suffix:
  // love+ly, move+ment, hope+ful, care+less, awe+some, kind+ness.
  const SUFFIX = /^(ly|ness|less|ment|ful|some)$/;
  for (let g = groups.length - 2; g >= 1; g--) {
    const grp = groups[g];
    if (grp[1] - grp[0] === 1 && letters[grp[0]] === 'e' && SUFFIX.test(letters.slice(grp[1]))) {
      groups.splice(g, 1);
    }
  }
  // Silent stem 'e' in some/here/there/where compounds: sometime, therefore.
  for (const [pre, ei] of [['some', 3], ['here', 3], ['there', 4], ['where', 4]]) {
    if (!letters.startsWith(pre) || letters.length <= pre.length) continue;
    const gi = groups.findIndex(gr => gr[0] === ei && gr[1] - gr[0] === 1 && letters[ei] === 'e');
    if (gi > 0) groups.splice(gi, 1);
  }

  if (groups.length <= 1) return [word];

  // Boundary letter-index between each pair of nuclei.
  const bounds = [];
  for (let g = 0; g < groups.length - 1; g++) {
    const cStart = groups[g][1], cEnd = groups[g + 1][0];
    const n = cEnd - cStart;                         // consonants between nuclei
    let b;
    if (n <= 0) b = cEnd;                            // V-V: split at next vowel
    else if (n === 1) b = cStart;                    // V-CV: consonant onsets next
    else {
      const pair = letters.slice(cStart, cStart + 2);
      if (CODA_DIGRAPHS.has(pair)) b = cStart + 2;   // the pair closes this syllable
      else if (DIGRAPHS.has(pair)) b = cStart;       // the pair opens the next one
      else b = cStart + 1;                           // one consonant onsets the next
    }
    bounds.push(map[b]);                             // back to original index
  }

  // Cut the original word at those indices; leading punctuation rides along.
  const chunks = [];
  let start = 0;
  for (const b of bounds) { chunks.push(word.slice(start, b)); start = b; }
  chunks.push(word.slice(start));
  return chunks.filter(Boolean);
}

// Scan a whole line: syllables per word, the metrical pulse across the line,
// and — where the dictionary can supply it — the word's own stress.
//
// `expected` is the line's syllable target, which is a property of the
// METRE and not a constant: ten for pentameter, eight for the one sonnet
// in tetrameter. Callers that know the text pass it; callers that do not
// get pentameter, which is the overwhelming default here.
//
// `opts.stressOf(word)` returns one number per syllable (1 primary, 2
// secondary, 0 unstressed) or null. js/pron.js supplies it from the
// dictionary's ˈ/ˌ marks. Without it this behaves exactly as it always did.
//
// TWO RULES KEEP IT HONEST:
//
// 1. A pattern is used ONLY when it has the same number of syllables as the
//    speller found. They disagree about 5% of the time (`wrinkles`, `ragged`,
//    `fuel`), and a pattern laid over the wrong number of chunks would mark
//    the wrong syllable with total confidence. A mismatch means "unknown".
// 2. MONOSYLLABLES NEVER CARRY WORD STRESS HERE. `stressOf` returns null for
//    them because the dictionary does not mark them, and that is the right
//    answer for scansion anyway: in a line of verse a one-syllable word takes
//    whatever the metre hands it. Only polysyllables have a fixed stress the
//    metre has to bargain with, and that bargain is the thing worth seeing.
export function scanLine(line, expected = 10, opts = {}) {
  const { stressOf = null, verse = true } = opts;
  const tokens = line.split(/(\s+)/);                 // keep spaces as tokens
  const words = [];
  let count = 0;
  for (const tok of tokens) {
    if (/^\s+$/.test(tok) || tok === '') { words.push({ space: true }); continue; }
    const chunks = syllabify(tok);
    const pat = stressOf ? stressOf(tok) : null;
    const known = !!pat && pat.length === chunks.length;
    const syls = chunks.map((text, i) => ({
      text,
      stress: '',                                     // what the metre wants
      word: known ? (pat[i] > 0 ? STRONG : WEAK) : null,   // what the word says
      clash: false,
    }));
    words.push({ syllables: syls, known });
    count += syls.length;
  }
  // The pulse: position 1 weak, 2 STRONG, 3 weak … (iambic).
  let p = 0;
  for (const w of words) {
    if (!w.syllables) continue;
    for (const s of w.syllables) {
      p++;
      const beat = p % 2 === 0 ? STRONG : WEAK;
      if (verse) {
        // Verse shows the BEAT, and flags where the word fights it — the
        // inversions and spondees an actor has to decide about.
        s.stress = beat;
        s.clash = s.word !== null && s.word !== beat;
      } else {
        // Prose has no beat to lay down, so it shows word stress or nothing.
        // Leaving a monosyllable unmarked is the honest answer, not a guess.
        s.stress = s.word ?? '';
      }
    }
  }
  return { words, count, expected, regular: count === expected };
}
