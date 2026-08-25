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
// Cue anchors are NAMES, never raw coordinates: the renderer owns the
// geometry, so a diagram can be redrawn without rewriting the teaching.
//   lips · teeth · tongueFront · tongueBack · jaw · voicebox · airflow

export const ARTICULATION = {
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
};

export const articulationFor = sym => ARTICULATION[sym] ?? null;

/** How many phonemes have a written guide yet. Honest, never rounded up. */
export const articulationCount = () => Object.keys(ARTICULATION).length;
