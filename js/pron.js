// Pronunciation lookup for arbitrary text. The dictionary is General
// American IPA (converted from CMUdict, ~126k words; BSD-style licence, js/data/pron-licence.js) and is
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

// YOD: General American dropped /j/ after alveolars, so the dictionary has
// no yod to work with — "tune" is tun and "new" is nu. British varieties keep
// it. Which words had one is historical, not predictable from the American
// form (two and tune are both "tu"), so this is a word list like the sets
// above. Only /t d n/: yod after /l/ is dead in modern RP (absolute, lute)
// and after /s z/ it is receding (suit, super), so leaving those yodless is
// the conservative call. An unlisted word stays American under the ≈ marker.
const YOD_WORDS = new Set((
  "tune tunes tuned tuning tuner tuna tunas tunic tube tubes tuba tubular " +
  "tuesday tuesdays tulip tulips tutor tutors tutorial tudor tumor tumult " +
  "tumultuous costume costumes attitude attitudes attitudinal altitude " +
  "aptitude platitude gratitude magnitude latitude longitude fortitude " +
  "ineptitude servitude certitude multitude solitude destitute institute " +
  "institutes institution institutions constitute constitution substitute " +
  "substitutes obtuse astute attune stew stews student students studio " +
  "stupid stupidity steward opportunity opportunities due dues duty duties " +
  "dutiful duly dual duel duet duets duke dukes ducal dune dunes dubious " +
  "duplex duplicity duplicate dupe deuce dew dewy during reduce reduced " +
  "reduces introduce introduced deduce seduce produce produced residue new " +
  "news newly newer newt newts newborn newfound newspaper newscast " +
  "newsroom newsletter newsletters renew renewed renewal knew nude nuke " +
  "nukes nuclear nuclei nucleus nuisance numerous numeral nutrient nuance " +
  "neutral neutron neuron neurotic neurology avenue revenue").split(' '));

// The yod sits between the alveolar and GOOSE /u/ or CURE /ʊ/.
const RE_YOD = /[tdn](?=[uʊ])/g;

// Centring diphthongs: a vowel + non-prevocalic ɹ leaves a schwa glide in
// RP (NEAR /ɪə/, SQUARE /eə/, CURE /ʊə/) rather than a bare vowel.
const RE_NEAR = new RegExp('ɪɹ(?![' + V + '])', 'g');
const RE_SQUARE = new RegExp('ɛɹ(?![' + V + '])', 'g');
const RE_CURE = new RegExp('ʊɹ(?![' + V + '])', 'g');

// happY — the weak final vowel of happy, city, duty. The dictionary now
// carries it as a bare /i/ (CMUdict IY0) and FLEECE as /iː/ (IY1/IY2), so
// the two are finally distinguishable. The Accuracy Standard sets happY per
// accent (dialects.js): Traditional RP keeps it lax /ɪ/, Standard British
// and Cockney tense it to /i/, Australian takes it to /iː/. A bare /i/ that
// is followed by a vowel is NOT happY — it is the neutralised prevocalic
// vowel of material, radio, various — so it is left alone.
// The lookahead has to see PAST a stress mark: with marks in the data a
// prevocalic /i/ can read as `iˈɑ`, and a mark is neither ː nor a vowel,
// so a naive test calls it happY and laxes a vowel that is not one.
const RE_HAPPY = new RegExp('i(?!ː)(?![ˈˌ]?[' + V + '])', 'g');

// General American → the shared British skeleton: non-rhotic, r-coloured
// vowels open out, and the word-aware lexical sets above restore
// LOT/THOUGHT/BATH. Each accent adds its own happY on top.
function toBritish(s, word) {
  if (YOD_WORDS.has(word)) s = s.replace(RE_YOD, '$&j');
  s = s.replace(/ɝ/g, 'ɜː').replace(/ɚ/g, 'ə');
  s = s.replace(RE_NEAR, 'ɪə').replace(RE_SQUARE, 'eə').replace(RE_CURE, 'ʊə');
  let out = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'ɹ') { if (V.includes(s[i + 1])) out += 'ɹ'; }   // drop unless pre-vocalic
    else out += s[i];
  }
  out = out.replace(/oʊ/g, 'əʊ');
  if (LOT_WORDS.has(word)) {
    // THOUGHT is /ɔː/ in the dictionary now, so LOT words reach /ɒ/ from the
    // marked form. Matching bare /ɔ/ here silently stopped firing when the
    // length marks went in, and off/cost/song would have stayed /ɔː/.
    out = out.replace(/ɔː/g, 'ɒ').replace(/ɑ(?!ː)/g, 'ɒ');
  } else if (THOUGHT_WORDS.has(word)) {
    out = out.replace(/ɑ(?!ː)/g, 'ɔː');
  } else if (BATH_WORDS.has(word)) {
    out = out.replace(/æ/g, 'ɑː');
  }
  return out
    .replace(/ɑ(?!ː)/g, 'ɑː');       // PALM/START default for what remains
}

// Traditional RP: the shared skeleton with the conservative lax happY
// ("Conservative lax happY endings: happy /ˈhæpɪ/" — dialects.js, rp.core).
function toRP(s, word) {
  return toBritish(s, word).replace(RE_HAPPY, 'ɪ');
}

// RP → Australian (HCE/revised symbols): centralised open vowels, fronted
// GOOSE, shifted diphthongs, raised LOT/THOUGHT, steady SQUARE.
// Order matters: CHOICE before THOUGHT (both start with ɔ), and LOT's
// ɒ→ɔ only after every original ɔ has been consumed.
function toAus(s, word) {
  // happY goes all the way to /iː/ here (duty /ˈdʒʉːtiː/, dialects.js aus).
  s = toBritish(s, word).replace(RE_HAPPY, 'iː');
  return s
    .replace(/ɔɪ/g, 'oɪ').replace(/ɔː?/g, 'oː').replace(/ɒ/g, 'ɔ')
    .replace(/eə/g, 'eː')
    .replace(/eɪ/g, 'æɪ').replace(/aɪ/g, 'ɑe').replace(/aʊ/g, 'æɔ').replace(/əʊ/g, 'əʉ')
    .replace(/ɑː/g, 'ɐː').replace(/ʌ/g, 'ɐ')
    // GOOSE keeps whatever length it came with: /uː/ is foreign to Australian
    // (engine.js ACCENT_FOREIGN), and the old /uː?/ flattened the weak /u/
    // of influence and situation into a long vowel.
    .replace(/u(ː?)/g, 'ʉ$1');
}

// General American → Standard British: RP's skeleton with the steady
// SQUARE /ɛː/. Fine-grained contemporary features (glottalling, yod
// coalescence) are realizations, not respellings — the broad form is RP-like.
function toSsbe(s, word) {
  // happY stays tense /i/ here — "happY tensing: the weak final vowel of
  // happy, city is tense /i/" (dialects.js, ssbe.core) — so this builds on
  // the shared skeleton rather than on RP, which laxes it to /ɪ/.
  return toBritish(s, word).replace(/eə/g, 'ɛː');
}

// Standard British → Cockney: the SPOKEN realizations, because with this
// accent the realizations ARE the target (Dialect Accuracy Standard,
// dialects.js). TH-fronting, h-dropping, intervocalic and final glottal
// /t/, yod coalescence. The diphthong shift stays in the broad symbols
// (taught in lesson copy), matching the course convention. Approximate,
// like every derived accent.
function toCockney(s, word) {
  s = toSsbe(s, word);
  // Chewsday. Only before GOOSE/CURE: bare /tj/ also spans a morpheme
  // boundary (courtyard, light-year, Goodyear) and those never coalesce.
  s = s.replace(/tj(?=[uʊ])/g, 'tʃ').replace(/dj(?=[uʊ])/g, 'dʒ');
  s = s.replace(/^([ˈˌ]?)h/, '$1');                            // h-dropping, word-initial
  s = s.replace(/θ/g, 'f');                                    // TH-fronting
  // non-initial /ð/ → v. The optional mark keeps this anchored to a REAL
  // preceding segment: `ˈð` at the head of a word is still word-initial
  // and must survive, which a bare /(.)ð/ would not respect.
  s = s.replace(/(.)([ˈˌ]?)ð/g, '$1$2v');
  const VOW = 'ɪeæʌʊɒəiuɛɜɑɔaː';
  s = s.replace(new RegExp('([' + VOW + '])t(?=[' + VOW + '])', 'g'), '$1ʔ');   // butter
  s = s.replace(new RegExp('([' + VOW + '])t$'), '$1ʔ');                        // what
  return s;
}

// ── Stress, for scansion ──────────────────────────────────────
// The dictionary carries ˈ/ˌ at syllable onsets (tools/rebuild_pron.py), so
// the stress pattern is already in the data — this just reads it out as one
// number per syllable: 1 primary, 2 secondary, 0 unstressed.
//
// MONOSYLLABLES RETURN null, deliberately. CMUdict gives every one of them a
// stress digit, but in a line of verse a one-syllable word takes whatever the
// metre hands it — "of" and "the" are not stressed because a dictionary says
// so in isolation. Only polysyllables have stress the metre has to bargain
// with, and those are the ones scansion cares about.
const NUCLEI = ['eɪ', 'aɪ', 'ɔɪ', 'oʊ', 'aʊ'];
const SINGLE = 'ɑæʌɔɛɪiʊuəɝɚ';

export function stressOf(word) {
  if (!PRON) return null;
  const s = PRON[cleanKey(word)];
  if (!s) return null;
  const out = [];
  let mark = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === 'ˈ') { mark = 1; continue; }
    if (c === 'ˌ') { mark = 2; continue; }
    const two = s.slice(i, i + 2);
    if (NUCLEI.includes(two)) { out.push(mark); mark = 0; i++; continue; }
    if (SINGLE.includes(c)) {
      out.push(mark); mark = 0;
      if (s[i + 1] === 'ː') i++;
    }
  }
  return out.length > 1 ? out : null;
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
