// Pronunciation lookup for arbitrary text. The dictionary is General
// American IPA (converted from CMUdict, public domain, ~126k words) and is
// lazy-loaded — a big file we only fetch the first time Sound mode opens.
// Other dialects are derived by rule from the American form and are marked
// approximate (≈): word-level IPA can't know lexical sets, so the transforms
// catch the systematic shifts the course teaches, not every word's history.

let PRON = null;
let loading = null;

export function loadPron() {
  if (PRON) return Promise.resolve(PRON);
  if (loading) return loading;
  loading = fetch(new URL('./data/pron.json', import.meta.url))
    .then(r => r.json())
    .then(d => { PRON = d; return d; })
    .catch(err => { loading = null; throw err; });
  return loading;
}

export const pronReady = () => PRON != null;

const cleanKey = w => w.toLowerCase().replace(/[^a-z']/g, '');

const V = 'ɑæʌɔɛɪiʊuəeaoɜɐʉy';   // IPA vowel letters (for rhoticity checks)

// General American → RP: non-rhotic, r-coloured vowels open out.
function toRP(s) {
  s = s.replace(/ɝ/g, 'ɜː').replace(/ɚ/g, 'ə');
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'ɹ') { if (V.includes(s[i + 1])) out += 'ɹ'; }   // drop unless pre-vocalic
    else out += s[i];
  }
  return out.replace(/oʊ/g, 'əʊ').replace(/ɑ(?!ː)/g, 'ɑː');
}

// RP → Australian (HCE/revised symbols): centralised open vowels, fronted
// GOOSE, shifted diphthongs, raised LOT/THOUGHT, steady SQUARE.
// Order matters: CHOICE before THOUGHT (both start with ɔ), and LOT's
// ɒ→ɔ only after every original ɔ has been consumed.
function toAus(s) {
  s = toRP(s);
  return s
    .replace(/ɔɪ/g, 'oɪ').replace(/ɔː?/g, 'oː').replace(/ɒ/g, 'ɔ')
    .replace(/eə/g, 'eː')
    .replace(/eɪ/g, 'æɪ').replace(/aɪ/g, 'ɑe').replace(/aʊ/g, 'æɔ').replace(/əʊ/g, 'əʉ')
    .replace(/ɑː/g, 'ɐː').replace(/ʌ/g, 'ɐ').replace(/uː?/g, 'ʉː');
}

// Returns { ipa, approx } or null if the word isn't in the dictionary.
export function ipaFor(word, accent) {
  if (!PRON) return null;
  const am = PRON[cleanKey(word)];
  if (!am) return null;
  if (accent === 'rp') return { ipa: toRP(am), approx: true };
  if (accent === 'aus') return { ipa: toAus(am), approx: true };
  return { ipa: am, approx: false };            // nam / General American (exact)
}
