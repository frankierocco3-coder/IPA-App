// Guided Practice — eight subjects × Prepare / Train / Apply = 24
// routine records.
//
// REVIEW MODEL (owner order): the eight TRAIN routines are the initial
// review batch (`reviewBatch: 1`) — complete, coherent, and written as
// claim-free attention/control explorations (editorial review tier).
// The sixteen Prepare/Apply records are DRAFTS: inspectable in the
// protected #review area, never learner-facing, and never approved by
// Claude. No mandatory internal five-step formula — the deferred
// Notice → Isolate → Add Language → Integrate → Reflect sequence
// remains deferred.
//
// Every routine is written-and-interactive only (no audio, recording,
// timing pressure or evaluation), physically optional throughout
// (seated/standing, limited-movement alternatives, "if comfortable",
// every step skippable, no forced breath holds, no assumption of nasal
// breathing), and interpretive: completion only, never a quality score.

import { SPEECH_SAFETY_LINE, SPEECH_COMFORT_LINE } from './course.js';

export { SPEECH_SAFETY_LINE, SPEECH_COMFORT_LINE };

export const PRACTICE_SUBJECTS = [
  { id: 'breath', title: 'Body & Breath', icon: '🫁' },
  { id: 'voice', title: 'Voice & Resonance', icon: '🔔' },
  { id: 'articulation', title: 'Articulation & Clarity', icon: '🎯' },
  { id: 'pace', title: 'Pace & Pause', icon: '⏸' },
  { id: 'emphasis', title: 'Emphasis & Phrasing', icon: '💡' },
  { id: 'intention', title: 'Thought & Intention', icon: '🧭' },
  { id: 'movement', title: 'Movement & Speech', icon: '🚶' },
  { id: 'presence', title: 'Presence & Persuasion', icon: '🎤' },
];

// mode labels for the compact segmented selector: Prepare · Train · Apply
export const ROUTINE_MODES = ['prepare', 'train', 'apply'];

export const SPEECH_ROUTINES = [

  // ── Body & Breath ─────────────────────────────────────────────
  { id: 'rt-breath-prepare', subject: 'breath', mode: 'prepare',
    title: 'Arriving in the body', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Settle wherever you are — seated or standing, whatever suits you.',
      'If comfortable, let your next few breaths happen without adjusting them. Just watch.',
      'Notice, without changing anything: where does breath movement show up — belly, ribs, chest, shoulders?',
      'Notice what your jaw and hands are doing right now. No corrections — just information.',
    ] },
  { id: 'rt-breath-train', subject: 'breath', mode: 'train',
    title: 'The exhale carries the phrase', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Pick one sentence you know cold — or take one from the practice texts.',
      'Read it silently once. Notice: did your breath do anything to get ready?',
      'Speak the sentence at an easy, everyday volume. Notice where in the sentence the breath was released — early, evenly, saved up?',
      'Speak it again, deliberately letting more air go in the first half. What changed at the end of the thought?',
      'Speak it again, deliberately even. No version is “correct” — you are mapping the control you already have.',
      'Last pass: forget the breath entirely and just say the sentence to an imagined listener. Notice whether the system handled it without you.',
    ] },
  { id: 'rt-breath-apply', subject: 'breath', mode: 'apply',
    title: 'Breath inside real speaking', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material — a passage you know well, or a practice text you have run a few times.',
      'Decide who you are speaking to and why (one sentence each).',
      'Speak the passage through to that imagined listener, walking a few easy steps if comfortable — or shifting posture in place.',
      'Afterward: where did the breath take care of itself? Where did it need managing? That second list is tomorrow’s Train material.',
    ] },

  // ── Voice & Resonance ─────────────────────────────────────────
  { id: 'rt-voice-prepare', subject: 'voice', mode: 'prepare',
    title: 'Waking the sound', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Seated or standing. If comfortable, let out a small, easy sigh of sound — the kind that happens naturally when sitting down.',
      'Try a gentle, comfortable hum on any pitch, only if that feels easy today.',
      'Notice where you feel vibration — lips, face, chest? There is no target; bodies differ.',
      'Skip anything that isn’t comfortable. This is a check-in, not a workout.',
    ] },
  { id: 'rt-voice-train', subject: 'voice', mode: 'train',
    title: 'One sentence, three rooms', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take one sentence — yours or a practice text.',
      'Say it as if to one person an arm’s length away.',
      'Say it as if across a kitchen — same words, same easy effort, just a bigger imagined space.',
      'Say it as if to the back row of a small room. Notice what changed: more air? more space in the mouth? slower? All of those are legitimate tools — notice which YOU reached for.',
      'Return to arm’s length. Notice the trip back down.',
      'None of the three versions is the correct one; the skill is knowing which room you’re in and having all three available.',
    ] },
  { id: 'rt-voice-apply', subject: 'voice', mode: 'apply',
    title: 'A voice that fits the moment', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material and give it a concrete situation: who is listening, how far away, what is at stake.',
      'Speak it through in that situation, letting the space and stakes size the voice.',
      'Change ONE circumstance — a bigger room, a sleeping child nearby, one listener instead of ten — and speak it again.',
      'Afterward: did the voice adjust on its own, or did you have to manage it? Note one discovery.',
    ] },

  // ── Articulation & Clarity ────────────────────────────────────
  { id: 'rt-artic-prepare', subject: 'articulation', mode: 'prepare',
    title: 'Waking the articulators', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'If comfortable, let the jaw hang loose for a breath or two — no stretching, just release.',
      'Say a few easy syllable runs at a lazy pace: “ba-da-ga, pa-ta-ka” — clarity, not speed.',
      'Notice which sounds felt crisp and which smudged. Information, not judgment.',
    ] },
  { id: 'rt-artic-train', subject: 'articulation', mode: 'train',
    title: 'The precision dial', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take one sentence with some consonant traffic — or grab a practice text.',
      'Say it at your normal, everyday precision.',
      'Say it at maximum precision — every consonant carved, unhurried. Feel where the extra work happens: tongue tip? lips?',
      'Say it deliberately under-articulated — soft edges, casual.',
      'Now find the middle that a listener across a table would find effortless. That target moves with the room and the listener — the skill is owning the whole dial, not one setting.',
    ] },
  { id: 'rt-artic-apply', subject: 'articulation', mode: 'apply',
    title: 'Clarity with somewhere to go', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material. Pick the two or three words in it the listener absolutely must catch.',
      'Speak the passage to an imagined listener, letting those words get the extra precision and everything else stay easy.',
      'Change the listener — someone hearing it through a bad phone line, someone tired, a room with echo — and let the dial adjust.',
      'Afterward: note where precision helped the thought, and anywhere it started to sound like a correction.',
    ] },

  // ── Pace & Pause ──────────────────────────────────────────────
  { id: 'rt-pace-prepare', subject: 'pace', mode: 'prepare',
    title: 'Finding your idle', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Say a sentence about your day, as if to a friend — no assignment, just talk.',
      'Notice, after the fact: was that quick? unhurried? Where did it breathe?',
      'That is your idle — today’s baseline. Not right, not wrong: the reference point the next routine works against.',
    ] },
  { id: 'rt-pace-train', subject: 'pace', mode: 'train',
    title: 'Owning the pause', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take one sentence of at least a dozen words — yours or a practice text.',
      'Speak it with no pause at all, one even ribbon.',
      'Choose one spot and place a real pause there — long enough to be a choice, not a hiccup. Speak it.',
      'Move the pause somewhere else. Speak it again. Did the thought change its shape?',
      'Now hold one pause twice as long as feels polite. Notice what it costs and what it buys — no verdicts, different pauses do different work in different circumstances.',
      'Finish by speaking the sentence with the pause wherever YOU now want it — a decision, not a default.',
    ] },
  { id: 'rt-pace-apply', subject: 'pace', mode: 'apply',
    title: 'Tempo that answers the moment', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material and set circumstances: listener, stakes, and how much time you have.',
      'Speak it inside those circumstances.',
      'Change the clock — you now have half the time; then, all the time in the world — and speak it under each.',
      'Afterward: which tempo choices came from the circumstances, and which were just habit? Note one.',
    ] },

  // ── Emphasis & Phrasing ───────────────────────────────────────
  { id: 'rt-emph-prepare', subject: 'emphasis', mode: 'prepare',
    title: 'Hearing the landing word', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Say any sentence about your plans — once, naturally.',
      'Which word landed hardest? (There usually is one, even unplanned.)',
      'Say it again landing a DIFFERENT word. Just notice that you can.',
    ] },
  { id: 'rt-emph-train', subject: 'emphasis', mode: 'train',
    title: 'Moving the operative word', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take one sentence — a practice text works well here.',
      'Speak it once without planning. Notice which word carried it.',
      'Now deliberately make the FIRST content word operative. Speak it.',
      'Move the emphasis to a middle word, then to the last word. Speak each version.',
      'For each version, ask: what question would this version be answering? Emphasis is an answer to something — that is why no single version is correct.',
      'Choose the version that matches what YOU would mean, and speak it once more like you mean it.',
    ] },
  { id: 'rt-emph-apply', subject: 'emphasis', mode: 'apply',
    title: 'Phrasing a real thought', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material of a few sentences.',
      'Mark (mentally or on paper) the one word per sentence the thought turns on.',
      'Speak the passage to an imagined listener, trusting those landings and letting everything else be easy.',
      'Change what you want from the listener, and notice whether any operative words moved on their own.',
    ] },

  // ── Thought & Intention ───────────────────────────────────────
  { id: 'rt-int-prepare', subject: 'intention', mode: 'prepare',
    title: 'One want, one sentence', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Think of something you actually want from someone this week.',
      'Say it as one plain sentence, out loud or silently: “I want ___ to ___.”',
      'Notice how much easier words get when the want is named first.',
    ] },
  { id: 'rt-int-train', subject: 'intention', mode: 'train',
    title: 'Same words, different want', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take one short passage — practice texts include lines built for this.',
      'Decide: you want the listener to feel safe. Speak the passage wanting that.',
      'Now you want them to take you seriously. Same words. Speak it.',
      'Now you want them to leave. Same words. Speak it.',
      'Notice what changed without being told to change — pace, weight, where you looked. That is intention doing delivery’s work.',
      'No version was the correct one. The words never owned the meaning; the want did.',
    ] },
  { id: 'rt-int-apply', subject: 'intention', mode: 'apply',
    title: 'Intention under resistance', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material. Name your objective: what should the listener do or feel?',
      'Name the resistance: why might they not?',
      'Speak the passage to that resisting listener. Let the resistance matter.',
      'Halfway through, imagine the resistance visibly softening — and let that response change something in you. Finish the passage.',
      'Afterward: what adjusted when they “responded”? That adjustment is the live part of speaking.',
    ] },

  // ── Movement & Speech ─────────────────────────────────────────
  { id: 'rt-move-prepare', subject: 'movement', mode: 'prepare',
    title: 'Speech in a moving body', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'If comfortable, stand; otherwise any position works — movement here can be as small as turning your head.',
      'Say an easy sentence while completely still.',
      'Say it again while shifting your weight, turning, or taking one step — whatever is available to you.',
      'Notice: did the sentence change when the body moved? No judgment — just the baseline.',
    ] },
  { id: 'rt-move-train', subject: 'movement', mode: 'train',
    title: 'The skill that survives motion', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Pick one skill you have trained — a placed pause, a landed word — and one secure sentence to carry it.',
      'Deliver it still, with the skill in place.',
      'Deliver it while walking a few steps, or making any comfortable movement — turning, gesturing, shifting in your chair.',
      'Did the skill survive the motion? If it wobbled, do it once more, slower, letting the movement and the sentence share attention.',
      'Deliver it once more while doing a small task with your hands (moving a cup, folding something). The goal is not multitasking for its own sake — it is speech that keeps its shape inside a life.',
    ] },
  { id: 'rt-move-apply', subject: 'movement', mode: 'apply',
    title: 'Staging yourself', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure material and a situation with a reason to move — showing something, crossing to someone, leaving.',
      'Decide one movement that MEANS something in the passage (approach on the appeal; stop on the decision). Keep it within what is comfortable.',
      'Speak the passage with the movement where you planned it.',
      'Then speak it once letting movement happen wherever it wants. Compare: which moves were chosen, which leaked?',
    ] },

  // ── Presence & Persuasion ─────────────────────────────────────
  { id: 'rt-pres-prepare', subject: 'presence', mode: 'prepare',
    title: 'Attention, pointed outward', minutes: 2, tryWithText: false,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Look around wherever you are and name (silently) five things you can see, in detail.',
      'Notice what that did to the noise in your head. Presence is mostly this: attention with somewhere to go.',
      'Carry that outward attention into the next thing you say to anyone today.',
    ] },
  { id: 'rt-pres-train', subject: 'presence', mode: 'train',
    title: 'Speaking TO, not AT', minutes: 5, tryWithText: true,
    requiredReviewer: 'editorial', reviewBatch: 1,
    steps: [
      'Take a short passage and put an imagined listener somewhere specific — that chair, that corner. Give them a face and a current mood.',
      'Speak the passage AT them: correct words, attention on yourself and how you sound.',
      'Now speak it TO them: attention on their face, watching for whether it lands, adjusting if it doesn’t.',
      'Notice the difference in your own body between AT and TO. Most of what audiences call presence lives in that difference.',
      'Once more, TO them — and let one moment of their imagined reaction actually change how you say the next line.',
    ] },
  { id: 'rt-pres-apply', subject: 'presence', mode: 'apply',
    title: 'The room is part of the speech', minutes: 8, tryWithText: true,
    requiredReviewer: 'editorial', draft: true,
    steps: [
      'Choose secure persuasive material — the practice texts include openings and appeals.',
      'Define the room: how many listeners, what they want, what they doubt.',
      'Deliver the passage to that room, letting your attention live on them, not on your delivery.',
      'Change the room’s mood — warm, skeptical, distracted — and deliver it again, adjusting to what you “see.”',
      'Afterward: note one moment your attention snapped back to yourself, and what pulled it there. That is next session’s material.',
    ] },
];

export const routinesFor = subjectId =>
  SPEECH_ROUTINES.filter(r => r.subject === subjectId);

export const routineById = id => SPEECH_ROUTINES.find(r => r.id === id) ?? null;

// The learner-facing gate: ONLY batch-1 routines may render outside the
// protected review area. Everything else is a draft, full stop.
export const learnerRoutines = () => SPEECH_ROUTINES.filter(r => r.reviewBatch === 1);
export const draftRoutines = () => SPEECH_ROUTINES.filter(r => r.reviewBatch !== 1);
