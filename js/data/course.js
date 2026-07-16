// Course structure: units → lessons. Each lesson names its target phonemes
// and the exercise mix; the engine generates concrete exercises from that.

export const COURSE = [
  {
    id: 'vowels-1',
    title: 'Short Vowels',
    color: '#58cc02',
    icon: 'ɪ',
    blurb: 'The six short vowels of English, plus the humble schwa.',
    lessons: [
      { id: 'v1-1', title: 'KIT, DRESS & TRAP', phonemes: ['ɪ', 'e', 'æ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-2', title: 'STRUT, FOOT & LOT', phonemes: ['ʌ', 'ʊ', 'ɒ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-3', title: 'Meet the schwa', phonemes: ['ə', 'ɪ', 'ʌ'], types: ['symbolToWord', 'soundToSymbol', 'description'] },
      { id: 'v1-4', title: 'Short vowels round-up', phonemes: ['ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə'], types: ['soundToSymbol', 'match', 'minimalPair'] },
    ],
  },
  {
    id: 'vowels-2',
    title: 'Long Vowels',
    color: '#1cb0f6',
    icon: 'iː',
    blurb: 'Five long vowels — the length mark ː is your friend.',
    lessons: [
      { id: 'v2-1', title: 'FLEECE & GOOSE', phonemes: ['iː', 'uː', 'ɪ', 'ʊ'], types: ['symbolToWord', 'soundToSymbol', 'minimalPair'] },
      { id: 'v2-2', title: 'PALM, THOUGHT & NURSE', phonemes: ['ɑː', 'ɔː', 'ɜː'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v2-3', title: 'Long vs short', phonemes: ['iː', 'ɪ', 'uː', 'ʊ', 'ɑː', 'æ'], types: ['soundToSymbol', 'minimalPair', 'build'] },
    ],
  },
  {
    id: 'diphthongs',
    title: 'Diphthongs',
    color: '#ce82ff',
    icon: 'aɪ',
    blurb: 'Vowels that travel — eight glides from one position to another.',
    lessons: [
      { id: 'd-1', title: 'FACE, PRICE & CHOICE', phonemes: ['eɪ', 'aɪ', 'ɔɪ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'd-2', title: 'GOAT & MOUTH', phonemes: ['əʊ', 'aʊ'], types: ['symbolToWord', 'soundToSymbol', 'build'] },
      { id: 'd-3', title: 'NEAR, SQUARE & CURE', phonemes: ['ɪə', 'eə', 'ʊə'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'consonants-1',
    title: 'Stops & Nasals',
    color: '#ff9600',
    icon: 'ŋ',
    blurb: 'Familiar friends — plus /ŋ/, the sound at the end of “sing”.',
    lessons: [
      { id: 'c1-1', title: 'Plosives', phonemes: ['p', 'b', 't', 'd', 'k', 'g'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c1-2', title: 'Nasals', phonemes: ['m', 'n', 'ŋ'], types: ['description', 'symbolToWord', 'soundToSymbol'] },
      { id: 'c1-3', title: 'Stops & nasals round-up', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['soundToSymbol', 'match', 'build'] },
    ],
  },
  {
    id: 'consonants-2',
    title: 'Fricatives & Friends',
    color: '#ff4b4b',
    icon: 'θ',
    blurb: 'Where IPA earns its keep: θ, ð, ʃ, ʒ and company.',
    lessons: [
      { id: 'c2-1', title: 'The two “th” sounds', phonemes: ['θ', 'ð', 'f', 'v'], types: ['description', 'symbolToWord', 'minimalPair'] },
      { id: 'c2-2', title: 'Hissers & hushers', phonemes: ['s', 'z', 'ʃ', 'ʒ', 'h'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-3', title: 'Affricates & glides', phonemes: ['tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-4', title: 'Consonant round-up', phonemes: ['θ', 'ð', 'ʃ', 'ʒ', 'tʃ', 'dʒ', 'ŋ', 'j'], types: ['soundToSymbol', 'build', 'match'] },
    ],
  },
  {
    id: 'rp',
    title: 'RP: Received Pronunciation',
    color: '#2b70c9',
    icon: '🇬🇧',
    accent: true,
    blurb: 'The classic “BBC English” accent — non-rhoticity, the BATH split, and full transcriptions.',
    lessons: [
      { id: 'rp-1', title: 'Where did the R go?', rpOnly: true, phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə'], types: ['rpFact', 'build', 'soundToSymbol'] },
      { id: 'rp-2', title: 'The BATH split', rpOnly: true, phonemes: ['ɑː', 'æ'], types: ['rpFact', 'build', 'minimalPair'] },
      { id: 'rp-3', title: 'Transcribe like the BBC', rpOnly: true, phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə', 'eə'], types: ['build', 'rpFact', 'soundToSymbol'] },
    ],
  },
];

export const EXERCISES_PER_LESSON = 8;
