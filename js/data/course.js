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
      { id: 'v1-1', title: 'KIT, DRESS & TRAP', guide: 'Three front vowels, stacked by how open your mouth is: /ɪ/ is nearly closed (kit), /e/ is halfway (dress), /æ/ is nearly open (trap). Say them in a row and feel your jaw drop.', phonemes: ['ɪ', 'e', 'æ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-2', title: 'STRUT, FOOT & LOT', guide: 'Three more short vowels, made further back in the mouth: /ʌ/ is open and relaxed (strut), /ʊ/ is high with rounded lips (foot), /ɒ/ is low with rounded lips (lot).', phonemes: ['ʌ', 'ʊ', 'ɒ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-3', title: 'Meet the schwa', guide: 'The schwa /ə/ is the most common sound in English — the colourless \'uh\' in every unstressed syllable: a-bout, so-fa, ba-na-na. If a vowel is unstressed, it\'s probably a schwa.', phonemes: ['ə', 'ɪ', 'ʌ'], types: ['symbolToWord', 'soundToSymbol', 'description'] },
      { id: 'v1-4', title: 'Short vowels round-up', guide: 'All seven short vowels together: /ɪ e æ ʌ ʊ ɒ ə/. This round-up mixes them so you can tell neighbours apart — especially /æ/ vs /ʌ/ (cat vs cut) and /ɪ/ vs /e/ (bid vs bed).', phonemes: ['ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə'], types: ['soundToSymbol', 'match', 'minimalPair'] },
    ],
  },
  {
    id: 'vowels-2',
    title: 'Long Vowels',
    color: '#1cb0f6',
    icon: 'iː',
    blurb: 'Five long vowels — the length mark ː is your friend.',
    lessons: [
      { id: 'v2-1', title: 'FLEECE & GOOSE', guide: 'The length mark ː means \'hold it longer\'. /iː/ (fleece) is a longer, tenser cousin of /ɪ/ (kit); /uː/ (goose) pairs the same way with /ʊ/ (foot). Ship–sheep and full–fool live or die on this difference.', phonemes: ['iː', 'uː', 'ɪ', 'ʊ'], types: ['symbolToWord', 'soundToSymbol', 'minimalPair'] },
      { id: 'v2-2', title: 'PALM, THOUGHT & NURSE', guide: 'Three long vowels from the back and centre of the mouth: /ɑː/ (palm), /ɔː/ (thought), and /ɜː/ (nurse) — the long neutral vowel in stir, learn, word.', phonemes: ['ɑː', 'ɔː', 'ɜː'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v2-3', title: 'Long vs short', guide: 'Long versus short, head to head. Every pair here differs mainly by length and tension: /iː–ɪ/, /uː–ʊ/, /ɑː–æ/. Listen for duration, not just quality.', phonemes: ['iː', 'ɪ', 'uː', 'ʊ', 'ɑː', 'æ'], types: ['soundToSymbol', 'minimalPair', 'build'] },
    ],
  },
  {
    id: 'diphthongs',
    title: 'Diphthongs',
    color: '#ce82ff',
    icon: 'aɪ',
    blurb: 'Vowels that travel — eight glides from one position to another.',
    lessons: [
      { id: 'd-1', title: 'FACE, PRICE & CHOICE', guide: 'Diphthongs are vowels in motion — one vowel gliding into another within a syllable. /eɪ/ (face), /aɪ/ (price), and /ɔɪ/ (choice) all glide toward an /ɪ/-like sound.', phonemes: ['eɪ', 'aɪ', 'ɔɪ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'd-2', title: 'GOAT & MOUTH', guide: 'Two glides that travel toward /ʊ/: /əʊ/ starts at schwa (goat, show), /aʊ/ starts open (mouth, now). The starting point is what separates them.', phonemes: ['əʊ', 'aʊ'], types: ['symbolToWord', 'soundToSymbol', 'build'] },
      { id: 'd-3', title: 'NEAR, SQUARE & CURE', guide: 'The centring diphthongs glide toward schwa — /ɪə/ (near), /eə/ (square), /ʊə/ (cure). They mostly appear where an r used to be pronounced, which is why RP loves them.', phonemes: ['ɪə', 'eə', 'ʊə'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'consonants-1',
    title: 'Stops & Nasals',
    color: '#ff9600',
    icon: 'ŋ',
    blurb: 'Familiar friends — plus /ŋ/, the sound at the end of “sing”.',
    lessons: [
      { id: 'c1-1', title: 'Plosives', guide: 'Plosives block the air, then release it. They come in voiceless/voiced pairs made at the same spot: /p b/ at the lips, /t d/ at the tooth ridge, /k g/ at the back of the mouth.', phonemes: ['p', 'b', 't', 'd', 'k', 'g'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c1-2', title: 'Nasals', guide: 'Nasals send the air through your nose: /m/ at the lips, /n/ at the tooth ridge, and /ŋ/ at the back — the \'ng\' in sing. English never starts a word with /ŋ/, but it ends plenty.', phonemes: ['m', 'n', 'ŋ'], types: ['description', 'symbolToWord', 'soundToSymbol'] },
      { id: 'c1-3', title: 'Stops & nasals round-up', guide: 'All nine stops and nasals mixed: /p b t d k g m n ŋ/. Watch for /ŋ/ hiding in spelling — \'thanks\' has it, and \'finger\' has /ŋg/, two sounds.', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['soundToSymbol', 'match', 'build'] },
    ],
  },
  {
    id: 'consonants-2',
    title: 'Fricatives & Friends',
    color: '#ff4b4b',
    icon: 'θ',
    blurb: 'Where IPA earns its keep: θ, ð, ʃ, ʒ and company.',
    lessons: [
      { id: 'c2-1', title: 'The two “th” sounds', guide: 'English has two \'th\' sounds and four lip-teeth friends. /θ/ (think) is voiceless, /ð/ (this) is voiced — same tongue position, different buzz. Same pairing for /f/ (fat) and /v/ (van).', phonemes: ['θ', 'ð', 'f', 'v'], types: ['description', 'symbolToWord', 'minimalPair'] },
      { id: 'c2-2', title: 'Hissers & hushers', guide: 'The hissers /s z/ are made at the tooth ridge; the hushers /ʃ ʒ/ slightly further back with rounded lips — ship, measure. /h/ is just breath through an open throat.', phonemes: ['s', 'z', 'ʃ', 'ʒ', 'h'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-3', title: 'Affricates & glides', guide: 'Affricates are a stop released into a fricative: /tʃ/ (chin), /dʒ/ (jam). The approximants /l r w j/ barely obstruct the air at all — they\'re almost vowels.', phonemes: ['tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-4', title: 'Consonant round-up', guide: 'The consonants that make IPA worth learning: both th-sounds, both hushers, both affricates, /ŋ/, and /j/ — the \'y\' sound hiding in few /fjuː/ and use /juːz/.', phonemes: ['θ', 'ð', 'ʃ', 'ʒ', 'tʃ', 'dʒ', 'ŋ', 'j'], types: ['soundToSymbol', 'build', 'match'] },
    ],
  },
  {
    id: 'nam',
    title: 'Neutral American',
    color: '#c0392b',
    icon: '🇺🇸',
    accent: true,
    blurb: 'The baseline stage accent for American actors — rhotic, flat BATH, open LOT.',
    lessons: [
      { id: 'nam-1', title: 'R is everywhere', accent: 'nam', guide: 'Neutral American is rhotic: every written r is spoken. After a vowel it colors the vowel itself — the stressed NURSE vowel becomes /ɝ/ (word, learn) and the unstressed lettER ending becomes /ɚ/ (teacher, father). Elsewhere the /r/ simply survives: car /kɑr/, here /hɪr/.', phonemes: ['ɝ', 'ɚ', 'ɑ'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'nam-2', title: 'Flat BATH, open LOT', accent: 'nam', guide: 'Two vowels separate American from British at a glance. BATH words keep flat /æ/ — bath, dance, grass, ask — where RP broadens to /ɑː/. And LOT words open and unround to /ɑ/ — lot, stop, father — where RP keeps rounded /ɒ/.', phonemes: ['æ', 'ɑ'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'nam-3', title: 'The American GOAT', accent: 'nam', guide: 'The GOAT diphthong starts differently on each side of the Atlantic. American /oʊ/ begins back and rounded (go, home, soap); RP /əʊ/ begins at the neutral schwa. Your ear will catch it faster than your eye.', phonemes: ['oʊ', 'ɑ', 'ɚ'], types: ['accentFact', 'soundToSymbol', 'build'] },
      { id: 'nam-4', title: 'Transcribe American', accent: 'nam', guide: 'Full Neutral American transcriptions. Keep every /r/, keep BATH flat at /æ/, open LOT to /ɑ/, start GOAT at /oʊ/, and give r-colored vowels their hooks: /ɝ/ stressed, /ɚ/ unstressed.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ'], types: ['build', 'accentFact', 'soundToSymbol'] },
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
      { id: 'rp-1', title: 'Where did the R go?', accent: 'rp', guide: 'RP is non-rhotic: /r/ is only pronounced before a vowel. Everywhere else it vanished, leaving a long vowel or centring diphthong behind — car /kɑː/, north /nɔːθ/, word /wɜːd/, here /hɪə/.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'rp-2', title: 'The BATH split', accent: 'rp', guide: 'In RP, a set of words spelled with \'a\' — bath, dance, grass, ask — take long /ɑː/ instead of flat /æ/. This BATH split is one of the sharpest dividers between RP and most other accents.', phonemes: ['ɑː', 'æ'], types: ['accentFact', 'build', 'minimalPair'] },
      { id: 'rp-3', title: 'Transcribe like the BBC', accent: 'rp', guide: 'Everything together: transcribe full words the way an RP speaker says them. Remember — no /r/ unless a vowel follows, BATH words take /ɑː/, and unstressed syllables collapse to schwa.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə', 'eə'], types: ['build', 'accentFact', 'soundToSymbol'] },
    ],
  },
];

export const EXERCISES_PER_LESSON = 8;
