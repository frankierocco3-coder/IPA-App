// Articulation artwork.
//
// Hand-drawn illustrations, one per sound. They replace the generated
// diagram in js/diagram.js wherever they exist: a real drawing beats a
// parametric one every time.
//
// EVERY SYMBOL BELOW IS COPIED FROM THE ASSET PACK'S OWN manifest.json,
// never read off a filename. The filenames transliterate ("eth-voiced",
// "turned-script-a") and transliterations are lossy; the manifest is the
// source of truth for which drawing belongs to which sound. It ships
// alongside the images at img/articulation/manifest.json so this mapping
// stays checkable.
//
// FORMAT: the drawings arrived as PNG at about 1.55 MB each and are
// shown at roughly 350 x 430, so every sound page was pulling four times
// the pixels any screen would use. They are stored here as JPEG q90 at
// the SAME pixel dimensions the artist delivered: nothing resized,
// nothing cropped, 68 MB down to 8 MB. Only the extension differs from
// the manifest's `file` field.
//
// The drawings are 4:5 portrait and are shown whole, never cropped.
// Coral marks show airflow, release, movement or contact. Dark curved
// marks at the throat show vocal-fold vibration on a voiced sound.

const DIR = 'img/articulation/';

// IPA symbol -> file name in DIR.
export const ART = {
  's': '001-ipa-s.jpg',
  'ð': '002-ipa-eth-voiced.jpg',
  'θ': '003-ipa-theta-voiceless.jpg',
  'v': '004-ipa-v-voiced.jpg',
  'f': '005-ipa-f-voiceless.jpg',
  'ʊə': '007-diphthong-upsilon-schwa.jpg',
  'aɪ': '008-diphthong-a-small-cap-i.jpg',
  'ɔɪ': '009-diphthong-open-o-small-cap-i.jpg',
  'əʊ': '010-diphthong-schwa-upsilon.jpg',
  'aʊ': '011-diphthong-a-upsilon.jpg',
  'ɪə': '012-diphthong-small-cap-i-schwa.jpg',
  'eɪ': '013-diphthong-e-small-cap-i.jpg',
  'eə': '014-diphthong-e-schwa.jpg',
  'iː': '015-vowel-long-i.jpg',
  'ɪ': '016-vowel-small-cap-i.jpg',
  'ɑː': '018-vowel-long-script-a.jpg',
  'æ': '019-vowel-ash.jpg',
  'ʌ': '020-vowel-turned-v.jpg',
  'e': '021-vowel-e.jpg',
  'ɔː': '022-vowel-long-open-o.jpg',
  'ɒ': '023-vowel-turned-script-a.jpg',
  'ʊ': '024-vowel-upsilon.jpg',
  'ɜː': '025-vowel-long-reversed-e.jpg',
  'ə': '026-vowel-schwa.jpg',
  'uː': '027-vowel-long-u.jpg',
  'm': '028-consonant-m.jpg',
  'w': '029-consonant-w.jpg',
  'g': '030-consonant-g.jpg',
  'dʒ': '031-consonant-dzh.jpg',
  'r': '032-consonant-r.jpg',
  'l': '033-consonant-l.jpg',
  'ŋ': '034-consonant-eng.jpg',
  'n': '035-consonant-n.jpg',
  'j': '036-consonant-j.jpg',
  'tʃ': '037-consonant-tsh.jpg',
  'k': '039-consonant-k.jpg',
  'd': '040-consonant-d.jpg',
  'p': '041-consonant-p.jpg',
  't': '042-consonant-t.jpg',
  'b': '043-consonant-b.jpg',
  'h': '044-consonant-h.jpg',
  'ʒ': '045-consonant-ezh.jpg',
  'ʃ': '046-consonant-esh.jpg',
  'z': '047-consonant-z.jpg',

  // Batch 2 (048-065): the accent-specific and allophonic sounds. Shipped
  // with no manifest, so each symbol here was read off its own image's
  // header bar and checked against the app inventory, never guessed from
  // the filename.
  'ɛː': '048-vowel-long-open-mid-front-square.jpg',
  'i': '049-vowel-happy-short-i.jpg',
  'ʔ': '050-consonant-glottal-stop.jpg',
  'ɑ': '051-vowel-american-lot-palm.jpg',
  'oʊ': '052-diphthong-american-goat.jpg',
  'ɝ': '053-vowel-american-nurse-rhotacized.jpg',
  'ɚ': '054-vowel-american-letter-rhotacized-schwa.jpg',
  'ɐ': '055-vowel-australian-strut.jpg',
  'ɐː': '056-vowel-australian-palm-bath.jpg',
  'ɔ': '057-vowel-australian-lot.jpg',
  'oː': '058-vowel-australian-thought.jpg',
  'eː': '059-vowel-australian-square.jpg',
  'æɔ': '060-diphthong-australian-mouth.jpg',
  'æɪ': '061-diphthong-australian-face.jpg',
  'ɑe': '062-diphthong-australian-price.jpg',
  'oɪ': '063-diphthong-australian-choice.jpg',
  'əʉ': '064-diphthong-australian-goat.jpg',
  'ʉː': '065-vowel-australian-goose.jpg',
};

// The three overview charts that came with the drawings, kept as PNG:
// they are flat colour and crisp type, where PNG is both smaller and
// sharper than JPEG. All three together are under half a megabyte.
export const CHARTS = {
  'diphthongs': { file: '006-diphthongs-chart.png', title: 'Diphthongs' },
  'vowels': { file: '017-vowels-chart.png', title: 'Vowels' },
  'consonants': { file: '038-consonants-chart.png', title: 'Consonants' },
};

/** The artwork path for a sound, or null when there is none yet. */
export const artFor = sym => (ART[sym] ? DIR + ART[sym] : null);

/** The overview chart for a section of the IPA chart, or null. */
export const chartFor = key => (CHARTS[key] ? { ...CHARTS[key], src: DIR + CHARTS[key].file } : null);

/** How many sounds have artwork. Honest, never rounded up. */
export const artCount = () => Object.keys(ART).length;
