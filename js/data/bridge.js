// Accent Bridge — explain the target accent in terms of the accent the
// actor already speaks. The learner SELF-SELECTS both ends; the app never
// diagnoses anyone's accent.
//
// Routes are data, not components: adding a new pairing means adding a
// route object here, never a new UI. Comparison entries restate what the
// courses already teach (the Dialect Accuracy Standard in dialects.js and
// the course transcriptions in phonemes.js) — that is why the pilot
// entries ship 'approved': every phonetic claim below is the shipped,
// owner-reviewed curriculum, phrased with "typically" rather than as a
// law of nature. New claims that go BEYOND the curriculum must start
// 'draft' and clear the #review gate first.
//
// Audio honesty: a comparison offers A/B playback ONLY when the exact
// word has an approved recording in BOTH accents (the UI checks the clip
// index at render time). Never another accent's audio, never device TTS.
//
// ── Entry shape ───────────────────────────────────────────────
//   id           stable slug within the route
//   feature      learner-facing headline
//   lexicalSet   Wells set or feature name driving the comparison
//   word         the A/B word — same word, both accents, both recorded
//   startIPA     broad form in the starting accent (from phonemes.js)
//   targetIPA    broad form in the target accent
//   stays        'What stays the same'
//   changes      'What changes'
//   guidance     { lips, tongue, jaw, voice }
//   symbols      PHONEMES keys to link into the target course's guidebook
//   reviewStatus 'approved' | 'draft'

export const BRIDGE_ROUTES = [
  {
    id: 'nam-rp',
    from: 'nam',
    to: 'rp',
    title: 'Neutral American → Traditional RP',
    intro: 'You already have most of this accent. These are the changes that typically carry the distance — worked through sounds you use every day.',
    comparisons: [
      {
        id: 'rhoticity',
        feature: 'The r after a vowel goes silent',
        lexicalSet: 'START',
        word: 'bar',
        startIPA: 'bɑr',
        targetIPA: 'bɑː',
        stays: 'The vowel’s open, back starting position — your PALM vowel is already close.',
        changes: 'RP typically drops /r/ unless a vowel follows, and the vowel carries the length instead: bar /bɑː/, start /stɑːt/. Before a vowel the r returns — “bar of soap” links it.',
        guidance: {
          lips: 'Neutral — no rounding for the vanished r.',
          tongue: 'Stays low and back for the vowel; the tip never rises toward an r.',
          jaw: 'Open, relaxed, and hold it — the length lives in the vowel.',
          voice: 'Give the vowel the time you used to give the r.',
        },
        symbols: ['ɑː'],
        reviewStatus: 'approved',
      },
      {
        id: 'nurse',
        feature: 'NURSE loses its hook',
        lexicalSet: 'NURSE',
        word: 'nurse',
        startIPA: 'nɝs',
        targetIPA: 'nɜːs',
        stays: 'A long central vowel in the middle of the mouth — the address is the same.',
        changes: 'The r-colouring comes off entirely: /ɝ/ typically opens into plain long /ɜː/. If any r survives, the accent breaks.',
        guidance: {
          lips: 'Loosely neutral, slightly spread.',
          tongue: 'Flat and central — release the bunched r shape completely.',
          jaw: 'Mid-open and still.',
          voice: 'Long, even, uncoloured — think of a held, thoughtful “er…”.',
        },
        symbols: ['ɜː'],
        reviewStatus: 'approved',
      },
      {
        id: 'letter',
        feature: 'Word endings relax to schwa',
        lexicalSet: 'lettER',
        word: 'teacher',
        startIPA: 'ˈtiːtʃɚ',
        targetIPA: 'ˈtiːtʃə',
        stays: 'The stress pattern and everything before the ending.',
        changes: 'The unstressed r-coloured /ɚ/ typically becomes a plain schwa /ə/ — teacher, father, doctor all end on the neutral vowel.',
        guidance: {
          lips: 'Completely relaxed.',
          tongue: 'Falls to neutral centre — no r gesture at all.',
          jaw: 'Barely open; this is the smallest vowel in the system.',
          voice: 'Short and unstressed — let the ending almost disappear.',
        },
        symbols: ['ə'],
        reviewStatus: 'approved',
      },
      {
        id: 'bath',
        feature: 'BATH words broaden',
        lexicalSet: 'BATH',
        word: 'dance',
        startIPA: 'dæns',
        targetIPA: 'dɑːns',
        stays: 'TRAP itself — cat and hand typically keep /æ/ in both accents.',
        changes: 'A specific set of words — bath, dance, grass, ask, after — typically moves from flat /æ/ to long back /ɑː/. It is word-by-word knowledge, not a spelling rule.',
        guidance: {
          lips: 'Unrounded, relaxed open.',
          tongue: 'Slides from front-raised /æ/ to low and back.',
          jaw: 'Opens noticeably further than the American vowel.',
          voice: 'Long and unhurried — the broadness is duration as much as position.',
        },
        symbols: ['ɑː'],
        reviewStatus: 'approved',
      },
      {
        id: 'lot',
        feature: 'LOT rounds',
        lexicalSet: 'LOT',
        word: 'stop',
        startIPA: 'stɑp',
        targetIPA: 'stɒp',
        stays: 'A short vowel in a low, back position.',
        changes: 'Your open unrounded /ɑ/ typically gains lip-rounding and lifts slightly: /ɒ/. Lot, stop, want, what all round.',
        guidance: {
          lips: 'Lightly rounded — the defining move.',
          tongue: 'Low and back, a touch higher than American /ɑ/.',
          jaw: 'Open, slightly less than for /ɑ/.',
          voice: 'Keep it short — rounding, not length, is the change.',
        },
        symbols: ['ɒ'],
        reviewStatus: 'approved',
      },
      {
        id: 'goat',
        feature: 'GOAT starts in the centre',
        lexicalSet: 'GOAT',
        word: 'go',
        startIPA: 'goʊ',
        targetIPA: 'gəʊ',
        stays: 'A glide that finishes near /ʊ/.',
        changes: 'The starting point typically moves from back-and-rounded /o/ to the neutral centre: /əʊ/. Begin the glide at schwa and travel to /ʊ/.',
        guidance: {
          lips: 'Unrounded at the start; rounding arrives only during the glide.',
          tongue: 'Starts dead centre, then lifts back.',
          jaw: 'Mid-open to nearly closed across the glide.',
          voice: 'Let the journey be audible — the start is the tell.',
        },
        symbols: ['əʊ'],
        reviewStatus: 'approved',
      },
      {
        id: 'near',
        feature: 'NEAR becomes a journey to schwa',
        lexicalSet: 'NEAR',
        word: 'here',
        startIPA: 'hɪr',
        targetIPA: 'hɪə',
        stays: 'The close front /ɪ/ starting position.',
        changes: 'Where you say vowel-plus-r, RP typically glides from /ɪ/ toward schwa: a centring diphthong /ɪə/. The r is gone; the glide replaces it.',
        guidance: {
          lips: 'Relaxed throughout.',
          tongue: 'High front, then falls to neutral centre — never toward an r.',
          jaw: 'Drifts slightly open as the glide lands.',
          voice: 'Two audible moments in one syllable: ih… uh.',
        },
        symbols: ['ɪə'],
        reviewStatus: 'approved',
      },
      {
        id: 'yod',
        feature: 'The yod comes back',
        lexicalSet: 'yod retention (tune, duty, new)',
        word: 'tune',
        startIPA: 'tuːn',
        targetIPA: 'tjuːn',
        stays: 'The long GOOSE vowel itself.',
        changes: 'After /t d n/, Traditional RP typically keeps a /j/ your accent dropped: tune /tjuːn/, duty /ˈdjuːtɪ/, new /njuː/ — two crisp sounds, never fused into “choon”.',
        guidance: {
          lips: 'Neutral into rounded as the /uː/ arrives.',
          tongue: 'Tip makes the /t/, then the FRONT glides through /j/ before the vowel.',
          jaw: 'Nearly closed through the /j/.',
          voice: 'Keep /t/ and /j/ separate and quick — precision, not effort.',
        },
        symbols: ['j', 'uː'],
        reviewStatus: 'approved',
      },
    ],
  },
];

// The route for a self-selected pairing, approved comparisons only.
// null = an honest "this route isn't written yet".
export function routeFor(from, to) {
  const r = BRIDGE_ROUTES.find(x => x.from === from && x.to === to);
  if (!r) return null;
  return { ...r, comparisons: r.comparisons.filter(c => c.reviewStatus === 'approved') };
}

// Self-selected preference persistence (its own key; the privacy wipe
// already covers every speechcraft-* key).
const PREF_KEY = 'speechcraft-bridge';
export function loadBridgePrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREF_KEY)) ?? {};
    return { from: p.from ?? 'nam', to: p.to ?? 'rp' };
  } catch { return { from: 'nam', to: 'rp' }; }
}
export function saveBridgePrefs(from, to) {
  try { localStorage.setItem(PREF_KEY, JSON.stringify({ from, to })); } catch { /* fine */ }
}
