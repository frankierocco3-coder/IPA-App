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

// Vowel-group nuclei as [start, end) ranges over a letters-only string.
function nuclei(s) {
  const groups = [];
  let i = 0;
  while (i < s.length) {
    if (isVowel(s, i)) {
      let j = i;
      while (j < s.length && isVowel(s, j)) j++;
      groups.push([i, j]);
      i = j;
    } else i++;
  }
  return groups;
}

const DIGRAPHS = new Set(['th', 'ch', 'sh', 'ph', 'wh', 'gh', 'ck', 'ng', 'qu']);

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
  // final '-ed' where the e isn't sounded
  if (letters.endsWith('ed') && groups.length >= 2) {
    const eIdx = letters.length - 2;
    const c = letters[letters.length - 3];
    const eGroup = groups[groups.length - 1];
    if (eGroup[0] === eIdx && c !== 't' && c !== 'd') groups.pop();
  }
  // final '-es' silent after a magic-e stem (shines, makes, hopes) but kept
  // syllabic after a sibilant/soft consonant (roses, boxes, faces, changes).
  if (letters.endsWith('es') && groups.length >= 2) {
    const eIdx = letters.length - 2;
    const c = letters[letters.length - 3];
    const c2 = letters[letters.length - 4];
    const syllabic = 'szxcg'.includes(c) || (c === 'h' && (c2 === 'c' || c2 === 's'));
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
      b = DIGRAPHS.has(pair) ? cStart : cStart + 1;  // keep digraph with next syllable
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

// Scan a whole line: syllables per word + the iambic pulse across the line.
export function scanLine(line) {
  const tokens = line.split(/(\s+)/);                 // keep spaces as tokens
  const words = [];
  let count = 0;
  for (const tok of tokens) {
    if (/^\s+$/.test(tok) || tok === '') { words.push({ space: true }); continue; }
    const syls = syllabify(tok).map(text => ({ text, stress: '' }));
    words.push({ syllables: syls });
    count += syls.length;
  }
  // Assign the pulse: position 1 weak, 2 STRONG, 3 weak … (iambic).
  let p = 0;
  for (const w of words) {
    if (!w.syllables) continue;
    for (const s of w.syllables) { p++; s.stress = p % 2 === 0 ? STRONG : WEAK; }
  }
  return { words, count, expected: 10, regular: count === 10 };
}
