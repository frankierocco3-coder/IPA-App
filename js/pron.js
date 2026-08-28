// Pronunciation lookup for arbitrary text. The dictionary is General
// American IPA (converted from CMUdict, public domain, ~126k words) and is
// lazy-loaded — a big file we only fetch the first time Sound mode opens.
// Other dialects are derived by rule from the American form and are marked
// approximate (≈): word-level IPA can't fully know lexical sets, so the
// transforms catch the systematic shifts plus a CONSERVATIVE word list for
// the sets the American mergers erased. This never makes non-American
// output dictionary-exact — the ≈ stays, and users can correct any word.

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

// ── Conservative lexical-set word lists ───────────────────────
// General American folds LOT into PALM (/ɑ/) and sometimes THOUGHT too,
// and BATH into TRAP (/æ/). A word-level dictionary can't undo that by
// rule, so these lists carry the common words back to their British sets.
// Deliberately conservative: an unlisted word falls back to the systematic
// default (START/PALM /ɑː/), which the ≈ marker already owns up to.

// LOT (and CLOTH, which modern RP says with the same /ɒ/)
const LOT_WORDS = new Set(('not lot hot got pot spot dot rot shot plot knot cot ' +
  'top stop shop drop chop pop crop prop job rob mob sob odd god body copy ' +
  'topic profit proper property probable problem possible pocket rocket ' +
  'model modern modest novel monitor comic comedy common promise bottle ' +
  'bottom box fox rock clock block lock sock knock shock stock dock doctor ' +
  'on gone honest office often off cost lost soft cloth cross boss loss toss ' +
  'song long wrong strong dog want wants wanted what was wash watch watches ' +
  'watching swan wander quality quantity squad squash sorry borrow tomorrow ' +
  'sorrow follow hollow hobby jolly solid volume yacht').split(' '));

// THOUGHT words this dictionary merged all the way to /ɑ/ (most THOUGHT
// words keep /ɔ/ and are handled by the systematic ɔ→ɔː rule instead).
const THOUGHT_WORDS = new Set('caught bought cause chalk awe awful raw august auburn audio'.split(' '));

// BATH: flat American /æ/, broad British /ɑː/ (Australian varies by region)
const BATH_WORDS = new Set(("bath baths path paths laugh laughs laughter staff " +
  "craft crafts draft giraffe half calf ask asks asked task tasks mask masks " +
  "flask basket grass glass class classes pass past last fast vast mast cast " +
  "castle nasty after rather aunt advance advanced chance chances dance " +
  "dances danced france glance glances branch demand demands command commands " +
  "answer answers plant plants grant slant can't shan't example examples " +
  "sample samples banana").split(' '));

// Centring diphthongs: a vowel + non-prevocalic ɹ leaves a schwa glide in
// RP (NEAR /ɪə/, SQUARE /eə/, CURE /ʊə/) rather than a bare vowel.
const RE_NEAR = new RegExp('ɪɹ(?![' + V + '])', 'g');
const RE_SQUARE = new RegExp('ɛɹ(?![' + V + '])', 'g');
const RE_CURE = new RegExp('ʊɹ(?![' + V + '])', 'g');

// General American → RP: non-rhotic, r-coloured vowels open out, and the
// word-aware lexical sets above restore LOT/THOUGHT/BATH.
function toRP(s, word) {
  s = s.replace(/ɝ/g, 'ɜː').replace(/ɚ/g, 'ə');
  s = s.replace(RE_NEAR, 'ɪə').replace(RE_SQUARE, 'eə').replace(RE_CURE, 'ʊə');
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'ɹ') { if (V.includes(s[i + 1])) out += 'ɹ'; }   // drop unless pre-vocalic
    else out += s[i];
  }
  out = out.replace(/oʊ/g, 'əʊ');
  if (LOT_WORDS.has(word)) {
    out = out.replace(/ɔ(?![ːɪ])/g, 'ɒ').replace(/ɑ(?!ː)/g, 'ɒ');
  } else if (THOUGHT_WORDS.has(word)) {
    out = out.replace(/ɑ(?!ː)/g, 'ɔː');
  } else if (BATH_WORDS.has(word)) {
    out = out.replace(/æ/g, 'ɑː');
  }
  return out
    .replace(/ɔ(?![ːɪ])/g, 'ɔː')     // THOUGHT words the dictionary kept as /ɔ/
    .replace(/ɑ(?!ː)/g, 'ɑː');       // PALM/START default for what remains
}

// RP → Australian (HCE/revised symbols): centralised open vowels, fronted
// GOOSE, shifted diphthongs, raised LOT/THOUGHT, steady SQUARE.
// Order matters: CHOICE before THOUGHT (both start with ɔ), and LOT's
// ɒ→ɔ only after every original ɔ has been consumed.
function toAus(s, word) {
  s = toRP(s, word);
  return s
    .replace(/ɔɪ/g, 'oɪ').replace(/ɔː?/g, 'oː').replace(/ɒ/g, 'ɔ')
    .replace(/eə/g, 'eː')
    .replace(/eɪ/g, 'æɪ').replace(/aɪ/g, 'ɑe').replace(/aʊ/g, 'æɔ').replace(/əʊ/g, 'əʉ')
    .replace(/ɑː/g, 'ɐː').replace(/ʌ/g, 'ɐ').replace(/uː?/g, 'ʉː');
}

// General American → Standard British: RP's skeleton with the steady
// SQUARE /ɛː/. Fine-grained contemporary features (glottalling, yod
// coalescence) are realizations, not respellings — the broad form is RP-like.
function toSsbe(s, word) {
  return toRP(s, word).replace(/eə/g, 'ɛː');
}

// Standard British → Cockney: the SPOKEN realizations, because with this
// accent the realizations ARE the target (Dialect Accuracy Standard,
// dialects.js). TH-fronting, h-dropping, intervocalic and final glottal
// /t/, yod coalescence. The diphthong shift stays in the broad symbols
// (taught in lesson copy), matching the course convention. Approximate,
// like every derived accent.
function toCockney(s, word) {
  s = toSsbe(s, word);
  s = s.replace(/tj/g, 'tʃ').replace(/dj/g, 'dʒ');            // Chewsday
  s = s.replace(/^([ˈˌ]?)h/, '$1');                            // h-dropping, word-initial
  s = s.replace(/θ/g, 'f');                                    // TH-fronting
  s = s.replace(/(.)ð/g, '$1v');                               // non-initial /ð/ → v
  const VOW = 'ɪeæʌʊɒəiuɛɜɑɔaː';
  s = s.replace(new RegExp('([' + VOW + '])t(?=[' + VOW + '])', 'g'), '$1ʔ');   // butter
  s = s.replace(new RegExp('([' + VOW + '])t$'), '$1ʔ');                        // what
  return s;
}

// Returns { ipa, approx } or null if the word isn't in the dictionary.
export function ipaFor(word, accent) {
  if (!PRON) return null;
  const key = cleanKey(word);
  const am = PRON[key];
  if (!am) return null;
  if (accent === 'rp') return { ipa: toRP(am, key), approx: true };
  if (accent === 'ssbe') return { ipa: toSsbe(am, key), approx: true };
  if (accent === 'cockney') return { ipa: toCockney(am, key), approx: true };
  if (accent === 'aus') return { ipa: toAus(am, key), approx: true };
  return { ipa: am, approx: false };            // nam / General American (exact)
}
