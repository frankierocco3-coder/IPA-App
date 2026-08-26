// How each sound is physically made — the teaching layer.
//
// This file holds WORDS, not drawings. js/diagram.js already knows the
// geometry of every phoneme (a vowel from tongue height, backness and
// rounding; a consonant from place, manner and voicing) and draws it as
// original SVG. What was missing was the instruction: where to put the
// teeth, what the jaw does, what a learner should feel.
//
// Every entry is ORIGINAL writing describing standard articulatory
// phonetics. Facts about how the human vocal tract makes /v/ belong to
// nobody; no illustration or wording is copied from any other product.
//
// REVIEW STATUS: draft. This is professional-tier content by the rule in
// js/data/speech/reviews.js — it tells a learner what to do with their
// body — so it carries the awaiting-review badge until an appropriately
// qualified voice professional or speech-language pathologist has read
// it. Nothing here diagnoses, and nothing prescribes force or strain.
//
// `cues` is OPTIONAL and only the first three entries carry it. It placed
// leader labels on the generated diagram in js/diagram.js, and no sound
// reaches that any more: all 62 have hand-drawn artwork, which replaces
// the generated picture outright. Writing cues for the rest would be data
// nothing renders. The field stays supported so the fallback still works
// if a file ever goes missing.
//   lips · teeth · tongueFront · tongueBack · jaw · voicebox · airflow

export const ARTICULATION = {

  // ── Consonants ────────────────────────────────────

  p: {
    summary: 'Both lips closed, pressure behind them, then released. No voice.',
    cues: [
      { at: 'lips', text: 'lips closed, then released' },
      { at: 'airflow', text: 'pressure builds, then pops' },
      { at: 'voicebox', text: 'voice off' },
    ],
    steps: [
      'Close both lips and stop the air completely.',
      'Let a little pressure build behind them.',
      'Release. In English, at the start of a stressed syllable /p/ comes with a puff of air. Hold a hand in front of your mouth on "pie" and you should feel it.',
    ],
    contrast: { sym: 'b', note: '/b/ is the same closure and release with the voice on, and without the puff. Pie and buy differ by nothing else.' },
    watch: 'At the end of a word ("cap") the release can be very small or absent. That is normal English, not a mistake.',
  },

  b: {
    summary: 'Both lips closed, pressure behind them, then released with the voice on.',
    steps: [
      'Close both lips and stop the air completely.',
      'Let a little pressure build behind them.',
      'Release with the voice already running. A finger on your throat should feel the buzz start before the lips part.',
    ],
    contrast: { sym: 'p', note: '/p/ is the same closure and release with the voice off, and with a puff of air after it. Buy and pie differ by nothing else.' },
    watch: 'Between vowels the closure can be very short. That is ordinary speech, not laziness.',
  },

  t: {
    summary: 'Tongue tip seals against the ridge behind your top teeth, then releases. No voice.',
    steps: [
      'Press the tip of your tongue against the ridge just behind your top teeth, sealing the air in.',
      'Let pressure build behind the seal.',
      'Release. At the start of a stressed syllable it carries a puff of air. Hold a hand in front of your mouth on "tea" and you should feel it.',
    ],
    contrast: { sym: 'd', note: '/d/ is the same seal and release with the voice on, and without the puff.' },
    watch: 'Between vowels many accents tap it, and before a consonant or at the end of a word many replace it with a glottal stop. Both are ways of saying /t/, not different consonants.',
  },

  d: {
    summary: 'Tongue tip seals against the ridge behind your top teeth, then releases, with the voice on.',
    steps: [
      'Press the tip of your tongue to the ridge behind your top teeth.',
      'Build a little pressure behind the seal.',
      'Release with the voice already running.',
    ],
    contrast: { sym: 't', note: 'The same seal with the voice off and a puff of air on release. Do and to differ by nothing else.' },
    watch: 'At the end of a word the voicing often fades before the release. That is normal English.',
  },

  k: {
    summary: 'The back of the tongue lifts to the soft palate, seals the air in, then lets it go. No voice.',
    steps: [
      'Lift the back of your tongue until it seals against the soft palate, at the very back of the roof of your mouth.',
      'Let pressure build behind the seal. Nothing escapes.',
      'Release. At the start of a stressed syllable the release carries a puff of air. Hold a hand in front of your mouth on "cat" and you should feel it.',
    ],
    contrast: { sym: 'g', note: '/g/ is the same seal and release with the voice on, and without the puff. Coat and goat differ by nothing else.' },
    watch: 'The contact is further back than most people expect. If you feel it near your teeth you have made /t/.',
  },

  g: {
    summary: 'The back of the tongue seals against the soft palate, then releases, with the voice on.',
    steps: [
      'Lift the back of your tongue until it seals against the soft palate.',
      'Build pressure behind the seal.',
      'Release with the voice running.',
    ],
    contrast: { sym: 'k', note: 'The same seal and release with the voice off and a puff of air after it. Goat and coat differ by nothing else.' },
    watch: 'The contact is a long way back. If you feel it near your teeth you have made /d/.',
  },

  'ʔ': {
    summary: 'Nothing happens in the mouth. The vocal folds themselves close, cut the sound off, and release.',
    steps: [
      'Leave your tongue and lips wherever the surrounding sounds put them. This sound has no mouth position of its own.',
      'Close your vocal folds so the sound stops completely, the way they close before a cough.',
      'Release them.',
    ],
    contrast: { sym: 't', note: 'This is a way of saying /t/, not a separate consonant. Better as [beʔə] and [betə] is the same word either way.' },
    watch: 'Use varies by speaker, by setting and by where it falls in the word, and careful speech tends to keep [t]. It is a choice, not a rule to apply everywhere.',
  },

  m: {
    summary: 'Lips closed, soft palate dropped, the voice going out through your nose.',
    steps: [
      'Close both lips gently.',
      'Let the soft palate drop so the voice goes up and out through your nose.',
      'Voice on. Pinch your nose while holding the sound and it should stop dead.',
    ],
    contrast: { sym: 'b', note: '/b/ has the same lip closure, but the soft palate stays raised so pressure builds and bursts. /m/ never builds pressure: the air has somewhere to go.' },
    watch: 'You can hold this as long as your breath lasts, which is why it is used for humming and warm-ups.',
  },

  n: {
    summary: 'Tongue tip on the ridge behind your top teeth, soft palate dropped, the voice going out through your nose.',
    steps: [
      'Touch the tip of your tongue to the ridge behind your top teeth, sealing the mouth.',
      'Let the soft palate drop so the voice goes out through your nose.',
      'Voice on. Pinch your nose and the sound stops.',
    ],
    contrast: { sym: 'd', note: 'The same tongue position. /d/ raises the soft palate so pressure builds and bursts; /n/ leaves the nose open so nothing builds.' },
    watch: 'Before /k/ or /g/ the tongue often slides back and it becomes /ŋ/. Listen to the middle of "income".',
  },

  'ŋ': {
    summary: 'The back of the tongue seals against the soft palate and the voice comes out through your nose instead.',
    steps: [
      'Lift the back of your tongue to the soft palate, the same seal you make for /k/.',
      'Keep that seal and let the soft palate drop, opening the way up into your nose.',
      'Voice on throughout. Pinch your nose while holding the sound and it should stop dead. That is the test that the air is going where it should.',
    ],
    contrast: { sym: 'n', note: '/n/ sends the voice out through the nose in exactly the same way, but seals at the ridge behind your teeth instead of at the back. Sin and sing differ only in where the tongue blocks.' },
    watch: 'In most English accents "sing" ends here, with no /g/ after it. Some accents do add one. That is a feature of those accents, not a fault.',
  },

  f: {
    summary: 'Top teeth resting on the bottom lip, air pushing through, no voice.',
    steps: [
      'Rest your top teeth lightly on your bottom lip. Lightly: this is a contact, not a bite.',
      'Push air out so it hisses between teeth and lip.',
      'Keep the voice off. A finger on your throat should feel nothing.',
    ],
    contrast: { sym: 'v', note: '/v/ is the same mouth with the voice on. Alternate them on one breath: ffff-vvvv. Only the buzz changes.' },
    watch: 'If it sounds like /p/, the lips have met each other instead of teeth meeting lip.',
  },

  v: {
    summary: 'Top teeth resting on the bottom lip, voice on, air pushing through.',
    cues: [
      { at: 'teeth', text: 'top teeth on bottom lip' },
      { at: 'airflow', text: 'air pushes through the gap' },
      { at: 'voicebox', text: 'voice on' },
    ],
    steps: [
      'Rest your top teeth lightly on your bottom lip. Lightly: this is a contact, not a bite.',
      'Push air out so it hisses between teeth and lip.',
      'Now switch your voice on. Put a finger on your throat and you should feel it buzz.',
    ],
    contrast: { sym: 'f', note: '/f/ is the same mouth with the voice off. Alternate them on one breath: ffff-vvvv. Only the buzz changes.' },
    watch: 'If it sounds like /b/, the lip has met the other lip instead of the teeth.',
  },

  'θ': {
    summary: 'Tongue tip against or between the teeth, air hissing through, no voice.',
    steps: [
      'Put the tip of your tongue lightly against the back of your top teeth, or just between the teeth. Both are used.',
      'Push air through the narrow gap so it hisses.',
      'Keep the voice off.',
    ],
    contrast: { sym: 'ð', note: 'The same position with the voice on. Thigh and thy differ by nothing else.' },
    watch: 'Using /f/ or /t/ here instead is a real feature of several accents. If it is not the accent you are working in, check that the tongue is actually reaching the teeth.',
  },

  'ð': {
    summary: 'Tongue tip against or between the teeth, air pushing through, voice on.',
    steps: [
      'Tongue tip lightly to the back of your top teeth, or just between them.',
      'Push air through the gap.',
      'Voice on. A finger on your throat should buzz.',
    ],
    contrast: { sym: 'θ', note: 'The same mouth with the voice off. This and thistle begin differently for that reason alone.' },
    watch: 'Contact is usually very light in running speech. It is common at the start of small function words and much rarer elsewhere.',
  },

  s: {
    summary: 'Tongue tip close to the ridge behind your top teeth, air hissing through a narrow channel, no voice.',
    steps: [
      'Bring the tip of your tongue near the ridge behind your top teeth without touching it.',
      'Push air through the narrow channel so it hisses.',
      'Keep the voice off.',
    ],
    contrast: { sym: 'z', note: 'The same mouth with the voice on. Run them together on one breath: sssss-zzzzz.' },
    watch: 'If the air escapes over the sides of the tongue rather than down the centre the sound goes slushy. The channel should be central and narrow.',
  },

  z: {
    summary: 'Tongue tip close to the ridge behind your top teeth, voice on, air hissing through a narrow channel.',
    steps: [
      'Bring the tip of your tongue close to the ridge just behind your top teeth, without touching it.',
      'Push air through the gap so it hisses. The channel is narrow, which is why this is one of the loudest sounds in English.',
      'Switch your voice on. A finger on your throat should feel it buzz.',
    ],
    contrast: { sym: 's', note: '/s/ is the same mouth with the voice off. Run them together on one breath: sssss-zzzzz. Only the buzz changes.' },
    watch: 'At the end of a word the buzz often fades before the hiss does. That is ordinary English, not an error.',
  },

  'ʃ': {
    summary: 'The tongue drawn back from the /s/ position, the channel wider, lips usually rounded. No voice.',
    steps: [
      'Start from /s/, then draw the tongue back a little and let the channel broaden.',
      'Round the lips slightly. Most speakers do.',
      'Push air through, voice off.',
    ],
    contrast: { sym: 's', note: '/s/ sits further forward with a narrower channel and no lip rounding. Sip and ship differ by that shift.' },
    watch: 'The lip rounding is optional but it deepens the sound, and most native speakers use it.',
  },

  'ʒ': {
    summary: 'The /ʃ/ mouth with the voice on.',
    steps: [
      'Set up as for /ʃ/: tongue back of the /s/ position, channel broad, lips slightly rounded.',
      'Push air through the channel.',
      'Voice on.',
    ],
    contrast: { sym: 'ʃ', note: 'An identical mouth with the voice off. Only the buzz separates them.' },
    watch: 'This is the rarest consonant in English and it almost never starts a word. Measure, vision and beige are where it lives.',
  },

  h: {
    summary: 'No mouth position of its own: breath through an open throat while the mouth is already shaped for the vowel that follows.',
    steps: [
      'Set your mouth for the vowel that comes next, and do not move it.',
      'Push a breath through the open throat before the voice starts.',
      'Let the voice come in as the vowel begins.',
    ],
    contrast: { sym: 'ʔ', note: 'The glottal stop closes the vocal folds. /h/ leaves them open and lets breath through. They are opposites made in the same place.' },
    watch: 'Dropping it at the start of words is a well-known feature of many accents. It is a feature rather than a fault, but it is accent-specific: check which accent you are in.',
  },

  'tʃ': {
    summary: 'A closure released slowly into a hiss, so a stop and a fricative run together as one sound.',
    steps: [
      'Seal the tongue against the ridge as for /t/, but slightly further back.',
      'Release slowly instead of sharply, so the air escapes as a hiss.',
      'Voice off throughout. The stop and the hiss are one sound, not two.',
    ],
    contrast: { sym: 'dʒ', note: 'The same closure and slow release with the voice on. Chin and gin differ by nothing else.' },
    watch: 'Releasing too fast gives a plain /t/. Not closing first gives a plain /ʃ/. The sound needs both halves.',
  },

  'dʒ': {
    summary: 'The /tʃ/ movement with the voice on: a closure released slowly into a hiss.',
    steps: [
      'Seal as for /d/, slightly further back than usual.',
      'Release slowly so the air escapes as a hiss.',
      'Voice on throughout.',
    ],
    contrast: { sym: 'tʃ', note: 'An identical movement with the voice off. Gin and chin.' },
    watch: 'The same trap as its voiceless partner: too fast and it is /d/, no closure and it is /ʒ/.',
  },

  l: {
    summary: 'Tongue tip on the ridge behind your top teeth, the sides dropped, voice flowing out around it.',
    steps: [
      'Touch the tip of your tongue to the ridge behind your top teeth and keep it there.',
      'Drop the sides of your tongue so the voice escapes around them. That side channel is what makes this /l/ and not /d/.',
      'Voice on. You can hold the sound for as long as your breath lasts.',
    ],
    contrast: { sym: 'r', note: 'For /r/ the tongue never touches anything. If the tip makes contact you have said /l/. Say "led" and "red" slowly and feel where the difference is.' },
    watch: 'Before a consonant and at the end of a word the back of the tongue usually humps up and the sound darkens. Leaf and feel use noticeably different tongue shapes.',
  },

  r: {
    summary: 'The tongue raised toward the ridge but never touching it, with the voice flowing through the gap.',
    steps: [
      'Raise the tip of your tongue toward the ridge behind your top teeth and stop before it touches. Or bunch the body of the tongue upward instead. Both are used by native speakers.',
      'Keep the sides of your tongue against the upper teeth so the air runs down the centre.',
      'Voice on. Many speakers round the lips slightly as well.',
    ],
    contrast: { sym: 'l', note: '/l/ touches the ridge; /r/ does not. Red and led differ by that contact alone.' },
    watch: 'Whether it is pronounced at the end of a word depends entirely on the accent. Broad transcription writes /r/, while the sound most speakers actually make is [ɹ].',
  },

  w: {
    summary: 'Lips rounded and the back of the tongue raised at the same time, then moving straight into the next vowel.',
    steps: [
      'Round your lips tightly, as if for a close back vowel.',
      'At the same time raise the back of your tongue toward the soft palate.',
      'Voice on, and move immediately into the vowel. This sound only exists while it is moving.',
    ],
    contrast: { sym: 'uː', note: 'The GOOSE vowel holds the same shape still. /w/ never holds: it is that shape in motion toward something else.' },
    watch: 'Two things happen at once here, lips and tongue back. Doing only the lips gives a weak, half-made sound.',
  },

  j: {
    summary: 'The front of the tongue raised close to the hard palate, then moving straight into the next vowel.',
    steps: [
      'Raise the front of your tongue toward the hard palate, close but not touching.',
      'Keep the lips relaxed and slightly spread.',
      'Voice on, moving immediately into the vowel.',
    ],
    contrast: { sym: 'iː', note: 'FLEECE holds this position as a vowel. /j/ is the same shape in motion. Touching the palate turns it into a fricative instead.' },
    watch: 'Whether it survives after /t/, /d/ and /n/ varies by accent: tune as [tjuːn] or [tuːn]. Follow the accent you are working in.',
  },


  // ── Vowels ────────────────────────────────────────

  'ɪ': {
    summary: 'Tongue front high but relaxed, jaw slightly open, lips loose.',
    steps: [
      'Start from the FLEECE position, tongue front and high.',
      'Let it drop and relax a little, and let the jaw open slightly.',
      'Keep it short and loose. The muscles should feel slack, not held.',
    ],
    contrast: { sym: 'iː', note: 'FLEECE is higher, tenser and longer. Ship and sheep differ by tongue height and tension, not by length alone.' },
    watch: 'Aiming for a short /iː/ gives the wrong vowel. The looseness is the point of it.',
  },

  e: {
    summary: 'Tongue front at middle height, jaw moderately open, lips relaxed.',
    steps: [
      'Put the front of your tongue at about half the height it reaches for FLEECE.',
      'Open the jaw moderately.',
      'Keep the lips relaxed and slightly spread, and hold one steady position.',
    ],
    contrast: { sym: 'æ', note: 'TRAP is more open, with the jaw further down. Say bed then bad.' },
    watch: 'Exactly how high this vowel sits varies between accents, and it has been shifting over time in several of them.',
  },

  'æ': {
    summary: 'Jaw well open, tongue low and forward, lips relaxed.',
    steps: [
      'Drop your jaw until the mouth is clearly open, further than for the DRESS vowel.',
      'Keep the body of your tongue forward and low, down behind your bottom teeth.',
      'Leave the lips relaxed. Rounding them pulls the sound toward a different vowel entirely.',
    ],
    contrast: { sym: 'e', note: 'The DRESS vowel sits higher with a narrower jaw. Say "bed" then "bad" and feel the jaw drop on the second.' },
    watch: 'How open and how long this vowel is varies a great deal between accents. Match the accent you are working in rather than aiming for one universal version.',
  },

  'ʌ': {
    summary: 'Jaw fairly open, tongue low and slightly behind centre, lips relaxed.',
    steps: [
      'Drop the jaw to roughly half open.',
      'Keep the tongue low, a little behind centre, and completely relaxed.',
      'Lips neutral. No rounding at all.',
    ],
    contrast: { sym: 'ɒ', note: 'LOT is rounded and further back. Cup and cop.' },
    watch: 'This vowel does not exist in many accents of northern England, where the FOOT vowel is used instead. That is a genuine accent difference, not an error.',
  },

  'ʊ': {
    summary: 'Tongue back and high but relaxed, lips loosely rounded, short.',
    steps: [
      'Raise the back of your tongue toward the soft palate, but not as far as for GOOSE.',
      'Round the lips loosely rather than tightly.',
      'Keep it short and slack.',
    ],
    contrast: { sym: 'uː', note: 'GOOSE is higher, tenser, longer and more tightly rounded. Full and fool.' },
    watch: 'Over-rounding turns it into GOOSE. This vowel is loose in both tongue and lips.',
  },

  'ɒ': {
    summary: 'Jaw well open, tongue low and back, lips lightly rounded.',
    steps: [
      'Drop the jaw wide.',
      'Pull the tongue back and keep it low.',
      'Round the lips a little. The rounding is slight, not a pucker.',
    ],
    contrast: { sym: 'ɔː', note: 'THOUGHT is higher, longer and more strongly rounded. Cot and caught, in the accents that keep them apart.' },
    watch: 'Many American accents merge this with PALM and use no rounding at all. Which vowel a word takes depends on the accent.',
  },

  'ə': {
    summary: 'The most relaxed vowel there is: tongue flat in the middle of the mouth, jaw barely open, no effort anywhere.',
    steps: [
      'Let your tongue rest in the middle of your mouth and do nothing with it.',
      'Open the jaw only slightly.',
      'Keep it short and weak. It belongs only in unstressed syllables.',
    ],
    contrast: { sym: 'ʌ', note: 'STRUT is a similar position given full weight and stress. This one never carries stress.' },
    watch: 'Giving it full value makes speech sound over-careful. It is the sound of the syllables you are not pointing at.',
  },

  'iː': {
    summary: 'Front of the tongue high and forward, lips spread wide, jaw almost closed.',
    cues: [
      { at: 'tongueFront', text: 'front of tongue up' },
      { at: 'lips', text: 'lips spread wide' },
      { at: 'jaw', text: 'jaw nearly closed' },
    ],
    steps: [
      'Raise the front of your tongue toward the hard palate, close but not touching. Touching it turns the vowel into /j/.',
      'Spread your lips as if beginning a smile.',
      'Keep the sound steady. In most English accents /iː/ glides very slightly, but it does not swing to another vowel.',
    ],
    contrast: { sym: 'ɪ', note: 'The KIT vowel sits lower and slacker with a relaxed jaw. Sheep and ship differ by tongue height and tension, not by length alone.' },
    watch: 'Pushing the tongue harder does not make it clearer, and tightening the jaw usually makes it worse.',
  },

  'ɑː': {
    summary: 'Jaw wide open, tongue low and pulled back, lips unrounded, held long.',
    steps: [
      'Drop the jaw as far as it comfortably goes.',
      'Pull the body of your tongue back and keep it low.',
      'Leave the lips unrounded and hold the position steady.',
    ],
    contrast: { sym: 'ɒ', note: 'LOT is rounded and shorter. Cart and cot.' },
    watch: 'Which words take this vowel is one of the biggest accent divides in English. Bath, dance and castle take it in some accents and TRAP in others.',
  },

  'ɔː': {
    summary: 'Tongue back at middle height, lips firmly rounded, held long.',
    steps: [
      'Pull the tongue back and set it at about mid height.',
      'Round the lips firmly into a small opening.',
      'Hold the position. It does not move.',
    ],
    contrast: { sym: 'ɒ', note: 'LOT is more open with lighter rounding. Caught and cot, in the accents that keep them apart.' },
    watch: 'Some speakers add a slight glide toward a closer vowel. Whether that belongs depends on the accent you are working in.',
  },

  'uː': {
    summary: 'Tongue back and high, lips tightly rounded, held long.',
    steps: [
      'Raise the back of your tongue toward the soft palate, close but not touching.',
      'Round the lips into a small tight opening.',
      'Hold it steady.',
    ],
    contrast: { sym: 'ʊ', note: 'FOOT is lower, looser and shorter. Fool and full.' },
    watch: 'In many contemporary accents this vowel has moved forward in the mouth and lost some of its rounding. Match the accent rather than an older textbook version.',
  },

  'ɜː': {
    summary: 'Tongue flat in the middle of the mouth, jaw slightly open, lips neutral, held long.',
    steps: [
      'Let the tongue sit centrally, neither forward nor back, at about mid height.',
      'Open the jaw a little.',
      'Keep the lips neutral and hold the position. Nothing moves.',
    ],
    contrast: { sym: 'ə', note: 'Schwa is the same central position, short and unstressed. This is its long, stressed counterpart.' },
    watch: 'In rhotic accents this vowel carries r-colouring and becomes /ɝ/. In non-rhotic ones there is no r sound at all, however the word is spelled.',
  },

  'ɛː': {
    summary: 'Tongue front at open-mid height, jaw moderately open, held as one long steady position.',
    steps: [
      'Set the front of your tongue a little lower than for DRESS.',
      'Open the jaw moderately and keep the lips neutral.',
      'Hold it. This vowel does not move.',
    ],
    contrast: { sym: 'eə', note: 'The older pronunciation glides from a mid front vowel toward schwa. This one holds a single position for its whole length.' },
    watch: 'Both versions are current. Which belongs depends on the accent and the period you are playing.',
  },

  i: {
    summary: 'The FLEECE tongue shape without the length, in unstressed syllables only.',
    steps: [
      'Raise the front of your tongue as for FLEECE, high and forward.',
      'Spread the lips slightly.',
      'Keep it short and unstressed. It never carries the stress of a word.',
    ],
    contrast: { sym: 'ɪ', note: 'KIT is lower and slacker. This vowel keeps FLEECE quality without its weight.' },
    watch: 'Some accents use a KIT-like vowel here instead. Happy, city and coffee are the words to listen for.',
  },


  // ── Diphthongs ────────────────────────────────────

  'eɪ': {
    summary: 'Starts at a mid front vowel and glides up and forward toward a close one. One movement, not two vowels.',
    steps: [
      'Begin where the DRESS vowel sits: tongue forward, jaw moderately open.',
      'Move the tongue up and forward while the sound is still going, letting the jaw close a little as you do.',
      'Let the glide stop short of a full /iː/. This is a movement toward, not an arrival.',
    ],
    contrast: { sym: 'e', note: 'DRESS holds one position. FACE travels. Say "bed" then "bade" and the second should move under you.' },
    watch: 'Stopping the movement early turns it into a long steady vowel, which is a real feature of some accents. If it is not the accent you are working in, keep the glide.',
  },

  'aɪ': {
    summary: 'Starts open and central, then glides up and forward toward a close front vowel.',
    steps: [
      'Begin with the jaw wide and the tongue low and central.',
      'Move the tongue up and forward while the sound continues, closing the jaw as you go.',
      'Let it finish short of a full /iː/.',
    ],
    contrast: { sym: 'ɔɪ', note: 'CHOICE starts back and rounded. PRICE starts open and unrounded. The endings are alike; the beginnings are not.' },
    watch: 'Most of the length belongs to the first half. Rushing to the end makes it sound clipped.',
  },

  'ɔɪ': {
    summary: 'Starts back and rounded at mid height, then glides up and forward toward a close front vowel.',
    steps: [
      'Begin with the tongue back at mid height and the lips rounded.',
      'Move the tongue forward and up while the lips unround.',
      'Finish short of a full /iː/.',
    ],
    contrast: { sym: 'aɪ', note: 'PRICE starts open, central and unrounded. Only the second halves resemble each other.' },
    watch: 'The lips have to travel too, from rounded to spread. Leaving them rounded throughout flattens the sound.',
  },

  'əʊ': {
    summary: 'Starts central and unrounded, then glides back and up toward a close rounded vowel.',
    steps: [
      'Begin on a central vowel, tongue flat and lips unrounded.',
      'Move the tongue back and up while the lips round.',
      'Finish short of a full /uː/.',
    ],
    contrast: { sym: 'ɔː', note: 'THOUGHT holds one rounded position throughout. GOAT starts unrounded and travels into rounding.' },
    watch: 'Starting already rounded gives the American version of this vowel. In a non-rhotic British accent the start is unrounded.',
  },

  'aʊ': {
    summary: 'Starts open and central, then glides back and up toward a close rounded vowel.',
    steps: [
      'Begin with the jaw wide and the tongue low and central.',
      'Move the tongue back and up while the lips round and the jaw closes.',
      'Finish short of a full /uː/.',
    ],
    contrast: { sym: 'əʊ', note: 'GOAT starts from a much less open position. The jaw drop at the start is what separates them.' },
    watch: 'The starting point varies a great deal between accents and is one of the strongest accent markers in this vowel.',
  },

  'ɪə': {
    summary: 'Starts at a close front vowel and glides inward to schwa.',
    steps: [
      'Begin around the KIT position, tongue front and high.',
      'Let the tongue fall back and relax toward the centre.',
      'Finish on a weak schwa. The second half is unstressed.',
    ],
    contrast: { sym: 'iː', note: 'FLEECE holds one position. NEAR starts near it and then moves away.' },
    watch: 'In rhotic accents these words take a vowel plus /r/ instead of a glide. The spelling is the same; the sound is not.',
  },

  'eə': {
    summary: 'Starts at a mid front vowel and glides inward to schwa.',
    steps: [
      'Begin around the DRESS position.',
      'Let the tongue move back and down toward the centre.',
      'Finish on a weak schwa.',
    ],
    contrast: { sym: 'ɛː', note: 'Many contemporary British speakers hold one long open-mid vowel here instead of gliding. Both are current.' },
    watch: 'Which of the two versions belongs depends on the accent and the period. Decide before you choose.',
  },

  'ʊə': {
    summary: 'Starts at a close back rounded vowel and glides inward to schwa.',
    steps: [
      'Begin around the FOOT position, tongue back and high, lips loosely rounded.',
      'Let the tongue move to the centre while the lips unround.',
      'Finish on a weak schwa.',
    ],
    contrast: { sym: 'ɔː', note: 'Many speakers now use THOUGHT for these words instead of the glide, so sure and shore can end up identical.' },
    watch: 'This is the rarest of the centring diphthongs and it is receding in several accents. Its use varies by word as well as by speaker.',
  },


  // ── Accent-specific sounds ────────────────────────

  'ɑ': {
    summary: 'Jaw wide open, tongue low and back, lips completely unrounded.',
    steps: [
      'Drop the jaw wide.',
      'Keep the tongue low and back.',
      'Leave the lips entirely unrounded. That absence of rounding is what marks it.',
    ],
    contrast: { sym: 'ɒ', note: 'The British LOT vowel carries light lip rounding. This one has none.' },
    watch: 'Many American speakers use this vowel for both LOT and THOUGHT words. Whether cot and caught sound alike varies by region.',
  },

  'oʊ': {
    summary: 'Starts at a mid back rounded vowel and glides up and back toward a close one.',
    steps: [
      'Begin with the tongue back at mid height and the lips already rounded.',
      'Move the tongue up and back while the rounding tightens.',
      'Finish short of a full /uː/.',
    ],
    contrast: { sym: 'əʊ', note: 'The British version starts central and unrounded. This one starts back and already rounded.' },
    watch: 'The rounding at the start is the giveaway. Beginning unrounded pulls it toward the British vowel.',
  },

  'ɝ': {
    summary: 'A mid central vowel with r-colouring: the tongue body bunches up, or the tip curls back, while the vowel is sounding.',
    steps: [
      'Start on a neutral mid central vowel, tongue flat and relaxed in the middle of the mouth.',
      'Bunch the body of your tongue upward and slightly back, or curl the tip up toward the roof. Both routes are used by native speakers and either will do.',
      'Keep the voice running through the whole thing. The r-colouring belongs to the vowel; it is not a separate /r/ arriving afterwards.',
    ],
    contrast: { sym: 'ɜː', note: 'The NURSE vowel of a non-rhotic accent has the same tongue height with no bunching and no r-colouring. That is the entire difference.' },
    watch: 'Adding a separate /r/ at the end gives you two sounds where the accent has one. The colouring should be there from the moment the vowel starts.',
  },

  'ɚ': {
    summary: 'Schwa with r-colouring: the tongue bunches or the tip curls while the weak vowel sounds.',
    steps: [
      'Start on a relaxed schwa, tongue central and doing nothing.',
      'Bunch the tongue body up, or curl the tip back, while the vowel continues.',
      'Keep it short and unstressed. This is the weak partner of /ɝ/.',
    ],
    contrast: { sym: 'ə', note: 'Plain schwa has no bunching and no r-colour. Teacher ends with one in a non-rhotic accent and the other in a rhotic one.' },
    watch: 'It is easy to give this too much weight. It belongs in unstressed syllables and should stay light.',
  },

  'ɐ': {
    summary: 'Jaw open, tongue low and central, lips relaxed.',
    steps: [
      'Drop the jaw to a clearly open position.',
      'Keep the tongue low and in the centre of the mouth rather than pulled back.',
      'Lips relaxed, with no rounding.',
    ],
    contrast: { sym: 'ʌ', note: 'It sits more open and more central than the British STRUT vowel.' },
    watch: 'The difference from the British version is small but consistent. Listen for it rather than reading it.',
  },

  'ɐː': {
    summary: 'Jaw wide, tongue low and central, held long.',
    steps: [
      'Drop the jaw wide.',
      'Keep the tongue low and central rather than pulled back.',
      'Hold it long.',
    ],
    contrast: { sym: 'ɑː', note: 'The British PALM vowel is further back. This one is central, and that is what gives it its character.' },
    watch: 'Which words take this vowel rather than TRAP varies within Australia itself. Dance and castle are the ones to check.',
  },

  'ɔ': {
    summary: 'Tongue back at open-mid height, lips rounded, short.',
    steps: [
      'Pull the tongue back and set it at open-mid height, higher than for the British LOT vowel.',
      'Round the lips.',
      'Keep it short.',
    ],
    contrast: { sym: 'ɒ', note: 'It sits noticeably higher in the mouth than the British LOT vowel.' },
    watch: 'The symbol differs from the British course on purpose. It records a real difference in tongue height, not a different spelling of the same sound.',
  },

  'oː': {
    summary: 'Tongue back and close-mid, lips tightly rounded, held long.',
    steps: [
      'Raise the back of the tongue to close-mid, higher than for the British THOUGHT vowel.',
      'Round the lips into a small tight opening.',
      'Hold it.',
    ],
    contrast: { sym: 'ɔː', note: 'The British vowel sits lower, with a wider lip opening.' },
    watch: 'The height and the tight rounding go together. Doing one without the other lands you between the two accents.',
  },

  'eː': {
    summary: 'Tongue front at mid height, held as one long steady position.',
    steps: [
      'Set the front of the tongue at mid height, around the DRESS position.',
      'Open the jaw moderately, lips neutral.',
      'Hold it. There is no glide.',
    ],
    contrast: { sym: 'eə', note: 'The British version glides toward schwa. This one stays where it is for its whole length.' },
    watch: 'Letting it drift toward schwa at the end pulls it back toward the British vowel.',
  },

  'ʉː': {
    summary: 'Tongue high and central, lips rounded, held long.',
    steps: [
      'Raise the tongue high, but keep it in the centre of the mouth rather than at the back.',
      'Round the lips.',
      'Hold it long.',
    ],
    contrast: { sym: 'uː', note: 'The British GOOSE vowel is further back. This one is fronted, and that is the whole difference.' },
    watch: 'Fronting of this vowel is happening across several accents of English. The Australian version is well advanced.',
  },

  'æɔ': {
    summary: 'Starts near-open and front, then glides back and up into rounding.',
    steps: [
      'Begin in the TRAP position, jaw wide and tongue forward.',
      'Move the tongue back and up while the lips round.',
      'Finish short of a close back vowel.',
    ],
    contrast: { sym: 'aʊ', note: 'The British version starts more central. This one starts clearly at the front of the mouth.' },
    watch: 'The front starting point is the whole character of this vowel. Starting centrally loses it.',
  },

  'æɪ': {
    summary: 'Starts near-open and front, then glides up and forward toward a close front vowel.',
    steps: [
      'Begin in the TRAP position, jaw wide and tongue forward.',
      'Move the tongue up and forward, closing the jaw as you go.',
      'Finish short of a full close vowel.',
    ],
    contrast: { sym: 'eɪ', note: 'The British FACE vowel starts at mid height. This one starts much more open, which is why an unfamiliar ear can hear it as PRICE.' },
    watch: 'The wide open start is what marks the accent. Beginning at DRESS height turns it into the British vowel.',
  },

  'ɑe': {
    summary: 'Starts open and back, then travels a long way forward and up to a mid front vowel.',
    steps: [
      'Begin with the jaw wide and the tongue low and back.',
      'Move it forward and up across the mouth. This is the widest journey any English vowel makes.',
      'Finish around mid front height.',
    ],
    contrast: { sym: 'aɪ', note: 'The British version starts more central and travels less far.' },
    watch: 'The distance travelled is the point. A short move sounds like a different accent entirely.',
  },

  'oɪ': {
    summary: 'Starts close-mid, back and rounded, then glides forward and up.',
    steps: [
      'Begin with the tongue back and fairly high, lips rounded.',
      'Move forward and up while the lips unround.',
      'Finish near a close front vowel.',
    ],
    contrast: { sym: 'ɔɪ', note: 'The British version starts lower and more open. This one begins higher in the mouth.' },
    watch: 'The higher start is subtle on the page and obvious in the ear. Listen to it rather than reading it.',
  },

  'əʉ': {
    summary: 'Starts central and unrounded, then glides up into a fronted close rounded vowel.',
    steps: [
      'Begin on a central vowel with the lips unrounded.',
      'Raise the tongue while rounding the lips, keeping it central rather than letting it travel back.',
      'Finish on the fronted GOOSE position.',
    ],
    contrast: { sym: 'əʊ', note: 'The British version ends at the back of the mouth. This one ends in the centre, and that is the difference.' },
    watch: 'Letting the ending drift backward turns it into the British vowel.',
  },
};

export const articulationFor = sym => ARTICULATION[sym] ?? null;

/** How many phonemes have a written guide yet. Honest, never rounded up. */
export const articulationCount = () => Object.keys(ARTICULATION).length;
