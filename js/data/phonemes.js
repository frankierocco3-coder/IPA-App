// English-relevant IPA phoneme inventory (RP reference accent).
// `examples`: words containing the sound, first one is the anchor/carrier word.
// `hint`: articulatory description used in description-based exercises.

export const PHONEMES = {
  // ── Short vowels ────────────────────────────────────────────
  'ɪ': { type: 'vowel', name: 'KIT vowel', hint: 'near-close front lax vowel', examples: ['kit', 'bid', 'ship', 'gym'] },
  'e': { type: 'vowel', name: 'DRESS vowel', hint: 'mid front vowel', examples: ['dress', 'bed', 'head', 'said'] },
  'æ': { type: 'vowel', name: 'TRAP vowel', hint: 'near-open front vowel', examples: ['trap', 'cat', 'hand', 'bad'] },
  'ʌ': { type: 'vowel', name: 'STRUT vowel', hint: 'open-mid back unrounded vowel', examples: ['strut', 'cup', 'love', 'blood'] },
  'ʊ': { type: 'vowel', name: 'FOOT vowel', hint: 'near-close back lax rounded vowel', examples: ['foot', 'put', 'good', 'could'] },
  'ɒ': { type: 'vowel', name: 'LOT vowel', hint: 'open back rounded vowel', examples: ['lot', 'odd', 'wash', 'stop'] },
  'ə': { type: 'vowel', name: 'schwa', hint: 'mid central vowel — the unstressed “uh”', examples: ['about', 'sofa', 'banana', 'the'] },

  // ── Long vowels ─────────────────────────────────────────────
  'iː': { type: 'vowel', name: 'FLEECE vowel', hint: 'close front long vowel', examples: ['fleece', 'sea', 'machine', 'key'] },
  'ɑː': { type: 'vowel', name: 'PALM/BATH vowel', hint: 'open back long unrounded vowel', examples: ['palm', 'father', 'start', 'bath'] },
  'ɔː': { type: 'vowel', name: 'THOUGHT vowel', hint: 'open-mid back long rounded vowel', examples: ['thought', 'law', 'north', 'war'] },
  'uː': { type: 'vowel', name: 'GOOSE vowel', hint: 'close back long rounded vowel', examples: ['goose', 'two', 'blue', 'group'] },
  'ɜː': { type: 'vowel', name: 'NURSE vowel', hint: 'open-mid central long vowel', examples: ['nurse', 'stir', 'learn', 'word'] },

  // ── Diphthongs ──────────────────────────────────────────────
  'eɪ': { type: 'diphthong', name: 'FACE diphthong', hint: 'glides from mid front toward close front', examples: ['face', 'day', 'break', 'rain'] },
  'aɪ': { type: 'diphthong', name: 'PRICE diphthong', hint: 'glides from open toward close front', examples: ['price', 'high', 'try', 'buy'] },
  'ɔɪ': { type: 'diphthong', name: 'CHOICE diphthong', hint: 'glides from back rounded toward close front', examples: ['choice', 'boy', 'noise', 'join'] },
  'əʊ': { type: 'diphthong', name: 'GOAT diphthong', hint: 'glides from mid central toward close back', examples: ['goat', 'show', 'no', 'soap'] },
  'aʊ': { type: 'diphthong', name: 'MOUTH diphthong', hint: 'glides from open toward close back', examples: ['mouth', 'now', 'out', 'crowd'] },
  'ɪə': { type: 'diphthong', name: 'NEAR diphthong', hint: 'glides from close front toward schwa', examples: ['near', 'here', 'beer', 'idea'] },
  'eə': { type: 'diphthong', name: 'SQUARE diphthong', hint: 'glides from mid front toward schwa', examples: ['square', 'fair', 'there', 'care'] },
  'ʊə': { type: 'diphthong', name: 'CURE diphthong', hint: 'glides from close back toward schwa', examples: ['cure', 'tour', 'pure', 'jury'] },

  // ── Stops & nasals ──────────────────────────────────────────
  'p': { type: 'consonant', name: 'p', hint: 'voiceless bilabial plosive', examples: ['pen', 'happy', 'cup', 'apple'] },
  'b': { type: 'consonant', name: 'b', hint: 'voiced bilabial plosive', examples: ['bad', 'baby', 'job', 'rubber'] },
  't': { type: 'consonant', name: 't', hint: 'voiceless alveolar plosive', examples: ['tea', 'better', 'cat', 'walked'] },
  'd': { type: 'consonant', name: 'd', hint: 'voiced alveolar plosive', examples: ['did', 'ladder', 'bed', 'played'] },
  'k': { type: 'consonant', name: 'k', hint: 'voiceless velar plosive', examples: ['cat', 'key', 'school', 'back'] },
  'g': { type: 'consonant', name: 'g', hint: 'voiced velar plosive', examples: ['get', 'bigger', 'dog', 'ghost'] },
  'm': { type: 'consonant', name: 'm', hint: 'bilabial nasal', examples: ['man', 'summer', 'lamb', 'time'] },
  'n': { type: 'consonant', name: 'n', hint: 'alveolar nasal', examples: ['no', 'dinner', 'sun', 'know'] },
  'ŋ': { type: 'consonant', name: 'eng', hint: 'velar nasal — the “ng” sound', examples: ['sing', 'long', 'thanks', 'finger'] },

  // ── Fricatives ──────────────────────────────────────────────
  'f': { type: 'consonant', name: 'f', hint: 'voiceless labiodental fricative', examples: ['fat', 'coffee', 'rough', 'photo'] },
  'v': { type: 'consonant', name: 'v', hint: 'voiced labiodental fricative', examples: ['van', 'river', 'love', 'of'] },
  'θ': { type: 'consonant', name: 'theta', hint: 'voiceless dental fricative — “th” in think', examples: ['think', 'author', 'bath', 'three'] },
  'ð': { type: 'consonant', name: 'eth', hint: 'voiced dental fricative — “th” in this', examples: ['this', 'other', 'breathe', 'they'] },
  's': { type: 'consonant', name: 's', hint: 'voiceless alveolar fricative', examples: ['see', 'missing', 'bus', 'city'] },
  'z': { type: 'consonant', name: 'z', hint: 'voiced alveolar fricative', examples: ['zoo', 'lazy', 'buzz', 'dogs'] },
  'ʃ': { type: 'consonant', name: 'esh', hint: 'voiceless postalveolar fricative — “sh”', examples: ['ship', 'sure', 'station', 'wish'] },
  'ʒ': { type: 'consonant', name: 'ezh', hint: 'voiced postalveolar fricative — “s” in measure', examples: ['measure', 'vision', 'usual', 'beige'] },
  'h': { type: 'consonant', name: 'h', hint: 'voiceless glottal fricative', examples: ['hat', 'ahead', 'who', 'behind'] },

  // ── Affricates & approximants ───────────────────────────────
  'tʃ': { type: 'consonant', name: 'ch', hint: 'voiceless postalveolar affricate — “ch”', examples: ['chin', 'teacher', 'match', 'nature'] },
  'dʒ': { type: 'consonant', name: 'j', hint: 'voiced postalveolar affricate — “j”', examples: ['jam', 'magic', 'bridge', 'age'] },
  'l': { type: 'consonant', name: 'l', hint: 'alveolar lateral approximant', examples: ['leg', 'yellow', 'feel', 'little'] },
  'r': { type: 'consonant', name: 'r', hint: 'postalveolar approximant', examples: ['red', 'sorry', 'try', 'write'] },
  'w': { type: 'consonant', name: 'w', hint: 'labial-velar approximant', examples: ['wet', 'away', 'one', 'quick'] },
  'j': { type: 'consonant', name: 'yod', hint: 'palatal approximant — “y” in yes', examples: ['yes', 'beyond', 'few', 'use'] },
};

// Words with full RP transcriptions, used by build-the-transcription
// and minimal-pair exercises. Segments are keys of PHONEMES.
export const WORDS = [
  { word: 'ship', ipa: ['ʃ', 'ɪ', 'p'] },
  { word: 'sheep', ipa: ['ʃ', 'iː', 'p'] },
  { word: 'cat', ipa: ['k', 'æ', 't'] },
  { word: 'cut', ipa: ['k', 'ʌ', 't'] },
  { word: 'bed', ipa: ['b', 'e', 'd'] },
  { word: 'bad', ipa: ['b', 'æ', 'd'] },
  { word: 'full', ipa: ['f', 'ʊ', 'l'] },
  { word: 'fool', ipa: ['f', 'uː', 'l'] },
  { word: 'thin', ipa: ['θ', 'ɪ', 'n'] },
  { word: 'this', ipa: ['ð', 'ɪ', 's'] },
  { word: 'sing', ipa: ['s', 'ɪ', 'ŋ'] },
  { word: 'chip', ipa: ['tʃ', 'ɪ', 'p'] },
  { word: 'jam', ipa: ['dʒ', 'æ', 'm'] },
  { word: 'yes', ipa: ['j', 'e', 's'] },
  { word: 'wash', ipa: ['w', 'ɒ', 'ʃ'] },
  { word: 'day', ipa: ['d', 'eɪ'] },
  { word: 'high', ipa: ['h', 'aɪ'] },
  { word: 'boy', ipa: ['b', 'ɔɪ'] },
  { word: 'go', ipa: ['g', 'əʊ'] },
  { word: 'now', ipa: ['n', 'aʊ'] },
  { word: 'beer', ipa: ['b', 'ɪə'] },
  { word: 'care', ipa: ['k', 'eə'] },
  { word: 'law', ipa: ['l', 'ɔː'] },
  { word: 'nurse', ipa: ['n', 'ɜː', 's'] },
  { word: 'measure', ipa: ['m', 'e', 'ʒ', 'ə'] },
  { word: 'vision', ipa: ['v', 'ɪ', 'ʒ', 'ə', 'n'] },
  { word: 'think', ipa: ['θ', 'ɪ', 'ŋ', 'k'] },
  { word: 'about', ipa: ['ə', 'b', 'aʊ', 't'] },
  { word: 'sofa', ipa: ['s', 'əʊ', 'f', 'ə'] },
  { word: 'teacher', ipa: ['t', 'iː', 'tʃ', 'ə'] },
  { word: 'yellow', ipa: ['j', 'e', 'l', 'əʊ'] },
  { word: 'zoo', ipa: ['z', 'uː'] },
  { word: 'tour', ipa: ['t', 'ʊə'] },
  { word: 'pure', ipa: ['p', 'j', 'ʊə'] },
  // RP-specific: non-rhotic + BATH/PALM words
  { word: 'car', ipa: ['k', 'ɑː'], rp: true, note: 'non-rhotic: no /r/ at the end' },
  { word: 'start', ipa: ['s', 't', 'ɑː', 't'], rp: true, note: 'non-rhotic: /r/ before a consonant is dropped' },
  { word: 'north', ipa: ['n', 'ɔː', 'θ'], rp: true, note: 'non-rhotic: vowel lengthens instead of /r/' },
  { word: 'word', ipa: ['w', 'ɜː', 'd'], rp: true, note: 'non-rhotic: NURSE vowel, no /r/' },
  { word: 'bath', ipa: ['b', 'ɑː', 'θ'], rp: true, note: 'BATH word: RP uses long /ɑː/, not /æ/' },
  { word: 'dance', ipa: ['d', 'ɑː', 'n', 's'], rp: true, note: 'BATH word: RP /ɑː/' },
  { word: 'grass', ipa: ['g', 'r', 'ɑː', 's'], rp: true, note: 'BATH word: RP /ɑː/' },
  { word: 'ask', ipa: ['ɑː', 's', 'k'], rp: true, note: 'BATH word: RP /ɑː/' },
  { word: 'here', ipa: ['h', 'ɪə'], rp: true, note: 'non-rhotic: NEAR diphthong, no /r/' },
  { word: 'four', ipa: ['f', 'ɔː'], rp: true, note: 'non-rhotic: THOUGHT vowel, no /r/' },
];

// Minimal pairs for listening discrimination.
export const MINIMAL_PAIRS = [
  ['ship', 'sheep'], ['cat', 'cut'], ['bed', 'bad'],
  ['full', 'fool'], ['thin', 'this'], ['chip', 'ship'],
];
