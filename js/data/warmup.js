// The Warmup — body and voice, in four movements (owner order,
// 2026-09-20; copy source docs/WARMUP_COPY.md, which replaced the
// original nine-step warmup of 2026-09-17). WRITTEN guidance only: no
// audio, no recording, no evaluation, nothing scored. The copy is
// deliberately behavioural — what to do, gently — and makes no anatomical
// or therapeutic claims; the shared comfort and safety lines
// (js/data/speech/course.js) render on the page with it.
//
// Each movement runs on its own, or all four run in order as "the whole
// thing", about twelve minutes end to end.
export const WARMUP_MOVEMENTS = [
  { id: 'body', title: 'The body', emoji: '🤸', minutes: 4, steps: [
    { title: 'Arrive',
      text: 'Stand with your feet under your hips and let your attention come into the room. Look at three things that are actually there. One slow breath in, one slow breath out. That is the whole step.' },
    { title: 'Shake it off',
      text: 'Shake out one hand, then the arm, then the shoulder. Change sides. Then a foot, then the leg. Keep it loose and a little silly. About thirty seconds, and it is meant to look ridiculous.' },
    { title: 'Roll down',
      text: 'Let your head go heavy and follow it down, one piece of your back at a time, until your arms are hanging. Stay there and breathe twice. Come back up slowly, with your head arriving last. Twice is plenty. Bend your knees as much as you like; nothing here should pull.' },
    { title: 'Shoulders and arms',
      text: 'Roll your shoulders back three times, then forward three times. Reach one arm up as if taking something off a high shelf, and change sides. Easy reaches, not stretches.' },
    { title: 'Head and jaw',
      text: 'Turn your head slowly to one side, then the other, as if someone said your name. Let your jaw hang open for a moment, then let it close. Move your jaw gently side to side. If anything clicks or complains, do less of it.' },
    { title: 'Wake the face',
      text: 'Screw your whole face up small. Then open it as wide as it goes, eyes included. Three times. Then rub your cheeks and your jaw briskly with your fingertips, the way you would warm cold hands.' },
    { title: 'Stand',
      text: 'Feet under your hips, weight even, knees soft, crown of your head the highest point. Notice you are standing. This is where you will speak from.' },
  ] },
  { id: 'breath', title: 'The breath', emoji: '🌬️', minutes: 2, steps: [
    { title: 'Let it fall in',
      text: 'Breathe out gently, all the way, then wait. Let the next breath arrive by itself rather than pulling it in. Five breaths like that. If you find yourself working, do less.' },
    { title: 'Low and quiet',
      text: 'Rest a hand low on your belly and let the breath arrive under it, without lifting your shoulders. Five easy breaths. Quiet is correct.' },
    { title: 'The long out',
      text: 'Breathe in easily, then let the air out on a soft “sss” for as long as it stays comfortable. Stop before you run out. Three times, and the point is the ease, not the length.' },
  ] },
  { id: 'voice', title: 'The voice', emoji: '🎶', minutes: 4, steps: [
    { title: 'Gentle hum',
      text: 'On an easy breath, hum quietly at a comfortable pitch, the way you would agree with someone across a table. Feel the buzz around your lips and nose. A few short hums, then a few longer ones.' },
    { title: 'Hum into the room',
      text: 'Same hum, now aimed at the far wall rather than the floor. Do not push. Let it carry because it is easy, not because you sent it.' },
    { title: 'Small slides',
      text: 'Still humming, let the pitch drift a little up and a little down, like a small sigh. Stay inside the range that feels effortless. The edges of your range are not part of a warmup.' },
    { title: 'Open onto a vowel',
      text: 'Hum, and halfway through let your mouth open so the hum becomes “maah”. Then “mooh”, then “meeh”. Six or seven of them, quietly.' },
    { title: 'Easy range',
      text: 'Slide from comfortable down to low and back on “nyah”, then comfortable up and back. Three or four times. If a note takes effort, that note is not part of today.' },
  ] },
  { id: 'words', title: 'The words', emoji: '👄', minutes: 2, steps: [
    { title: 'Lips and tongue',
      text: 'Flutter your lips if that comes easily. If it does not, skip it, it proves nothing. Then let your tongue stretch gently out and back, and run its tip slowly along the ridge behind your top teeth.' },
    { title: 'Wake the articulators',
      text: 'Speak, quietly and precisely: buh duh guh, guh duh buh. A few times. Then, still quiet and exact: the tip of the tongue, the teeth, the lips. Slow and clean beats fast and blurry.' },
    { title: 'Two lines, cold',
      text: 'Say these twice, quietly, without rushing: “A little bottle of butter.” Then: “Red leather, yellow leather.” If a word trips you, slow down rather than repeat it harder.' },
    { title: 'Count out',
      text: 'Count from one to ten at your ordinary speaking pitch, one number per easy breath, as if telling someone across the room. Let each number land somewhere specific.' },
    { title: 'First line',
      text: 'Take the first line of the text you are working on, or any line you know and love, and say it once, easily, to the room. Not a performance; a greeting. You are warm.' },
  ] },
];

// 'all' is the whole thing: every movement, in order.
export const WARMUP_ALL = { id: 'all', title: 'The whole thing', emoji: '🔥',
  minutes: WARMUP_MOVEMENTS.reduce((n, m) => n + m.minutes, 0) };

export const warmupById = id => id === 'all' ? WARMUP_ALL
  : WARMUP_MOVEMENTS.find(m => m.id === id) ?? null;

// Steps for a run, each tagged with the movement it belongs to.
export const warmupSteps = id => (id === 'all' ? WARMUP_MOVEMENTS
  : WARMUP_MOVEMENTS.filter(m => m.id === id))
  .flatMap(m => m.steps.map(s => ({ ...s, movement: m.title })));
