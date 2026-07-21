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
    id: 'reading',
    title: 'Reading & Writing IPA',
    color: '#0d9488',
    icon: '✍️',
    blurb: 'Sight-reading fluency: spelling to transcription and back, words to full sentences.',
    lessons: [
      { id: 'r-1', title: 'Decode the word', guide: 'Sight-reading starts here: look at a transcription and know the word — no sounding out, no hesitation. Then the reverse: see the IPA, supply the missing English letters. Remember that English spelling lies; the IPA never does.', phonemes: ['ɪ', 'iː', 'æ', 'e', 'ʃ', 'tʃ'], types: ['typeWord', 'spellBlank'] },
      { id: 'r-2', title: 'Mind the gaps', guide: 'Transcriptions with holes in them. One or more symbols are missing — hear the word, feel the sounds in order, and fill every gap. This is where symbol knowledge becomes muscle memory.', phonemes: ['ɪ', 'iː', 'æ', 'ʌ', 'ʃ', 'θ', 'ð', 'ŋ'], types: ['gapBuild', 'fillBlank'] },
      { id: 'r-3', title: 'Read the sentence', guide: 'Whole sentences now. Read a full line of IPA and say what it means, then flip it: pick the correct transcription of an English sentence. The wrong answers differ by a single sound — ship for sheep, bed for bad — so read every symbol.', phonemes: ['ɪ', 'iː', 'æ', 'e', 'ð', 'ə'], types: ['sentenceToEnglish', 'englishToIpa'] },
      { id: 'r-4', title: 'Reading round-up', guide: 'Everything at once: type spellings from IPA, fill transcription gaps, and read full sentences in both directions. Fluency is when none of this feels like translation anymore.', phonemes: ['ɪ', 'iː', 'æ', 'ʃ', 'tʃ', 'θ', 'ð', 'ə'], types: ['typeWord', 'gapBuild', 'sentenceToEnglish', 'englishToIpa', 'spellBlank'] },
    ],
  },
  {
    id: 'nam-intro',
    title: 'Stage 1 · Orientation',
    color: '#c0392b',
    icon: '📍',
    blurb: 'What Neutral American is, and why actors start here.',
    lessons: [
      { id: 'nam-0', title: 'Meet the accent', accent: 'nam', guide: 'Neutral American is the actor’s home base: American speech with the regional fingerprints sanded off — nobody can place you in Boston, Texas, or Chicago. It’s rhotic (every r is spoken), BATH words stay flat /æ/, LOT opens to /ɑ/, and GOAT starts back and rounded at /oʊ/. Directors reach for it whenever the script doesn’t say otherwise, which is why it’s the standard every other accent gets measured against. This first lesson is a gentle tour — the stages after it go deep.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ', 'æ'], types: ['accentFact', 'soundToSymbol', 'fillBlank'] },
    ],
  },
  {
    id: 'nam',
    title: 'Stage 2 · The Sounds',
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
    id: 'nam-shift',
    title: 'Stage 3 · Shift Work',
    color: '#c0392b',
    icon: '🔧',
    blurb: 'Arriving at Neutral American from British forms — the actor’s transformation skill.',
    lessons: [
      { id: 'nam-s1', title: 'Into American I', shiftTo: 'nam', guide: 'You know the sounds; now practice arriving at them. Given the British form of a word, produce the American one: restore the r’s, flatten BATH to /æ/, unround LOT to /ɑ/. The wrong answers will tempt you with the form you started from — that’s the trap your mouth sets on stage too.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'æ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'nam-s2', title: 'Into American II', shiftTo: 'nam', guide: 'Same skill, harder mix — building transcriptions from the British form and checking your ear between rounds. By the end of this stage the shift should feel like flipping a switch.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'oʊ', 'æ'], types: ['shiftBuild', 'shiftChoice', 'accentEar'] },
    ],
  },
  {
    id: 'nam-mastery',
    title: 'Stage 4 · Mastery',
    color: '#c0392b',
    icon: '🏆',
    blurb: 'The final: everything from every stage, mixed and at speed.',
    lessons: [
      { id: 'nam-final', title: 'Neutral American final', accent: 'nam', shiftTo: 'nam', count: 12, guide: 'Twelve questions, every exercise type, everything the course taught: the r-colored vowels, flat BATH, open LOT, American GOAT, full transcriptions, shifts from British forms, and your ear. Pass this and Neutral American is yours — the course is complete.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ', 'æ'], types: ['accentFact', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar'] },
    ],
  },
  {
    id: 'shift',
    title: 'Accent Shift Drills',
    color: '#7c3aed',
    icon: '⇄',
    blurb: 'The working actor’s skill: transform a word between accents on command.',
    lessons: [
      { id: 'sh-1', title: 'Hear the difference', guide: 'Before you can shift an accent, you have to hear the shift. Same word, two accents: American keeps its r’s and flat vowels; RP drops post-vocalic r and broadens BATH. Listen for /r/ at word ends, /æ/ vs /ɑː/, and where the GOAT glide starts.', phonemes: ['ɑː', 'ɑ', 'æ', 'oʊ', 'əʊ'], types: ['accentEar', 'shiftChoice'] },
      { id: 'sh-2', title: 'Shift into RP', shiftTo: 'rp', guide: 'Take American words into RP: delete the /r/ unless a vowel follows (and let the vowel lengthen or centre), broaden BATH words from /æ/ to /ɑː/, round LOT to /ɒ/, and start GOAT at schwa: /əʊ/. Your r-colored /ɝ ɚ/ lose their hooks: /ɜː ə/.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ', 'ə'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'sh-3', title: 'Shift into American', shiftTo: 'nam', guide: 'Now the other direction: restore every written r — bare after vowels (car /kɑr/), hooked in NURSE and lettER (/ɝ ɚ/). Flatten BATH back to /æ/, unround LOT to /ɑ/, and start GOAT back and rounded: /oʊ/.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'æ', 'oʊ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'sh-4', title: 'Round trip', guide: 'Both directions, mixed and at speed — plus your ear keeping you honest. This is the drill that makes an accent a switch you flip, not a costume you put on slowly.', phonemes: ['ɑː', 'ɑ', 'ɝ', 'ɜː', 'oʊ', 'əʊ', 'æ'], types: ['shiftChoice', 'shiftBuild', 'accentEar'] },
    ],
  },
  {
    id: 'rp-intro',
    title: 'Stage 1 · Orientation',
    color: '#2b70c9',
    icon: '📍',
    blurb: 'What RP is, and where it lives in classical theatre.',
    lessons: [
      { id: 'rp-0', title: 'Meet the accent', accent: 'rp', guide: 'Received Pronunciation is the prestige British accent of the classical stage — Shakespeare, Wilde, Shaw, and every butler ever written. Its signature moves: the written r goes silent unless a vowel follows (car /kɑː/), BATH words broaden to /ɑː/, LOT stays rounded /ɒ/, and GOAT starts at the neutral schwa: /əʊ/. Where an r vanished, a long vowel or centring diphthong stands in its place. This lesson is the guided tour; the stages after it build the accent piece by piece.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ'], types: ['accentFact', 'soundToSymbol', 'fillBlank'] },
    ],
  },
  {
    id: 'rp',
    title: 'Stage 2 · The Sounds',
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
  {
    id: 'rp-shift',
    title: 'Stage 3 · Shift Work',
    color: '#2b70c9',
    icon: '🔧',
    blurb: 'Arriving at RP from American forms — the transformation drilled both ways.',
    lessons: [
      { id: 'rp-s1', title: 'Into RP I', shiftTo: 'rp', guide: 'Given the American form, produce the RP one: delete the r unless a vowel follows and let the vowel lengthen or centre in its place, broaden BATH to /ɑː/, round LOT to /ɒ/. Watch for the trap answers — they’re the American habits you’re leaving behind.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'rp-s2', title: 'Into RP II', shiftTo: 'rp', guide: 'Heavier building work, plus ear checks: hear a word cold and know instantly whether it’s RP. The hooks come off the r-colored vowels — /ɝ/ becomes /ɜː/, /ɚ/ becomes plain schwa.', phonemes: ['ɑː', 'ɜː', 'ə', 'əʊ', 'ɪə'], types: ['shiftBuild', 'shiftChoice', 'accentEar'] },
    ],
  },
  {
    id: 'rp-mastery',
    title: 'Stage 4 · Mastery',
    color: '#2b70c9',
    icon: '🏆',
    blurb: 'The final: the whole accent, mixed and at speed.',
    lessons: [
      { id: 'rp-final', title: 'RP final', accent: 'rp', shiftTo: 'rp', count: 12, guide: 'Twelve questions across every exercise type: silent r’s, broad BATH, rounded LOT, centring diphthongs, full transcriptions, shifts from American forms, and ear checks. Pass it and the course is complete — RP earned, not worn.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ', 'ɪə'], types: ['accentFact', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar'] },
    ],
  },
];

// Top-level navigation: each track is a self-contained section with its
// own units, lessons, and unlock chain.
export const TRACKS = [
  {
    id: 'core',
    title: 'IPA Foundations',
    icon: 'ʃə',
    color: '#58cc02',
    blurb: 'The alphabet itself — every English sound, then reading and writing it fluently.',
    unitIds: ['vowels-1', 'vowels-2', 'diphthongs', 'consonants-1', 'consonants-2', 'reading'],
  },
  {
    id: 'nam',
    title: 'Neutral American',
    icon: '🇺🇸',
    color: '#c0392b',
    accent: true,
    blurb: 'A complete course: orientation → the sounds → shift work → mastery final.',
    unitIds: ['nam-intro', 'nam', 'nam-shift', 'nam-mastery'],
  },
  {
    id: 'rp',
    title: 'RP · Received Pronunciation',
    icon: '🇬🇧',
    color: '#2b70c9',
    accent: true,
    blurb: 'A complete course: orientation → the sounds → shift work → mastery final.',
    unitIds: ['rp-intro', 'rp', 'rp-shift', 'rp-mastery'],
  },
  {
    id: 'shift',
    title: 'Accent Shift Drills',
    icon: '⇄',
    color: '#7c3aed',
    drills: true,
    blurb: 'Transform words between Neutral American and RP on command — both directions, plus ear training.',
    unitIds: ['shift'],
  },
];

export const EXERCISES_PER_LESSON = 8;

// Arcade: every exercise type, playable on its own as an endless game.
// `phonemes` seeds the generators that need a target pool; the broad set
// is the full RP-reference inventory (all have untagged words).
const BROAD = [
  'ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə', 'iː', 'ɑː', 'ɔː', 'uː', 'ɜː',
  'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɪə', 'eə', 'ʊə',
  'p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ', 'f', 'v', 'θ', 'ð',
  's', 'z', 'ʃ', 'ʒ', 'h', 'tʃ', 'dʒ', 'l', 'r', 'w', 'j',
];

export const MODES = [
  { id: 'match', title: 'Matching', icon: '🃏', type: 'match', phonemes: BROAD, blurb: 'Match symbols to words.' },
  { id: 'decode', title: 'Decode the Word', icon: '🔡', type: 'typeWord', blurb: 'Read IPA, type the word.' },
  { id: 'spell', title: 'Spell It', icon: '✏️', type: 'spellBlank', blurb: 'Fill the missing letters.' },
  { id: 'gaps', title: 'Fill the Gaps', icon: '🧩', type: 'gapBuild', phonemes: BROAD, blurb: 'Complete the transcription.' },
  { id: 'build', title: 'Build a Word', icon: '🔨', type: 'build', phonemes: BROAD, blurb: 'Assemble it from tiles.' },
  { id: 'listen', title: 'Listen & Choose', icon: '🎧', type: 'soundToSymbol', phonemes: BROAD, blurb: 'Hear it, pick the symbol.' },
  { id: 'find', title: 'Find the Word', icon: '🔍', type: 'symbolToWord', phonemes: BROAD, blurb: 'Which word has this sound?' },
  { id: 'name', title: 'Name That Sound', icon: '💬', type: 'description', phonemes: BROAD, blurb: 'Match the description.' },
  { id: 'missing', title: 'Missing Symbol', icon: '⬜', type: 'fillBlank', phonemes: BROAD, blurb: 'One symbol is missing.' },
  { id: 'pairs', title: 'Minimal Pairs', icon: '👂', type: 'minimalPair', blurb: 'Which word did you hear?' },
  { id: 'readsent', title: 'Read a Sentence', icon: '📖', type: 'sentenceToEnglish', blurb: 'Decode a full IPA line.' },
  { id: 'writesent', title: 'Transcribe a Sentence', icon: '📝', type: 'englishToIpa', blurb: 'Pick the right transcription.' },
  { id: 'shift', title: 'Accent Shift', icon: '⇄', type: 'shiftChoice', blurb: 'Transform between accents.' },
  { id: 'earacc', title: 'Name the Accent', icon: '🌍', type: 'accentEar', blurb: 'RP or American?' },
];
