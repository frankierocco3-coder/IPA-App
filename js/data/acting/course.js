// The Acting workspace — "Acting & Scene Work".
//
// BOUNDARY (owner order 2026-08-13):
//   Speech  = clarity, confidence, persuasion, vocal freedom, general
//             spoken communication.
//   Acting  = behavior within circumstances while pursuing an objective.
//   IPA     = understanding and representing speech sounds.
//   Accents = changing sound patterns and linguistic behavior.
//
// ONE AUTHORITATIVE RECORD PER CONCEPT. A lesson here either:
//   • owns its writing (`body`), or
//   • declares `sharedFrom` — the id of the record that owns it
//     (a Speech chapter, the Playable Actions library, or the shared
//     Question Everything framework). Shared records are LINKED, never
//     copied, so the two workspaces can never drift apart.
//
// REVIEW: every lesson whose writing was authored in this build is a
// DRAFT requiring a qualified acting teacher or coach. Lessons that
// merely point at existing approved material inherit that material's
// status. Nothing is approved here; see js/data/speech/reviews.js
// (the shared ledger — absence means draft) and docs/SPEECH_REVIEW.md.
//
// WRITTEN AND TEXT-BASED ONLY: no audio, recording, microphone,
// playback, speaking evaluation, phonemes or video anywhere.
//
// NEVER SCORED: character interpretation, objective choices,
// relationships, subtext, emotional effect, beat placement and
// playable actions are explorations. Acting records completion and
// exploration; it never declares one artistic answer correct.

export const ACTING_PRINCIPLE =
  'A character’s behavior and dialogue arise from the situation they are in, what they want within that situation, and how each situation serves the larger movement of the story.';

export const ACTING_MODULES = [
  // Being Off Book opens Module 1 (owner order, 2026-08-20). It used to
  // close it, which was backwards: none of the rest can be worked while
  // an actor is still holding the script.
  { n: 1, id: 'work', title: 'The Actor’s Work',
    blurb: 'Securing the text first, then where behavior comes from: circumstances, objective, obstacle, stakes.' },
  { n: 2, id: 'text', title: 'Investigating the Text',
    blurb: 'Reading a scene for what it actually gives you: facts, relationship, turns, subtext, action.' },
  { n: 3, id: 'listening', title: 'Listening and Responding',
    blurb: 'The live half of acting: receiving the other person before you answer them.' },
  // Building a Character and Tempo-Rhythm were inserted here (owner order,
  // 2026-08-26). Read as an arc the course used to jump from listening
  // straight to rehearsal, with nowhere that built the person doing the
  // work. Preparing the Performance moved from 4 to 6; lesson ids did not
  // change, so nothing already stored on a device breaks.
  { n: 4, id: 'character', title: 'Building a Character',
    blurb: 'Two roads to a person, through analysis and through feeling, and the goal is both.' },
  { n: 5, id: 'rhythm', title: 'Tempo-Rhythm',
    blurb: 'How a character moves through time, in speech and in silence.' },
  { n: 6, id: 'performance', title: 'Preparing the Performance',
    blurb: 'Monologue and scene work, rehearsal, and carrying it all into the room.' },
];

export const ACTING_LESSONS = [

  // ── Module 1 · The Actor’s Work ───────────────────────────────
  { id: 'ac-behavior', module: 'work', order: 2,
    title: 'Behavior Comes From the Situation',
    requiredReviewer: 'acting-professional',
    objective: 'Understand behavior as a product of circumstance and pursuit, not a decision about mood.',
    orientation: 'The most common trap in early acting work is deciding how a line should sound. This chapter replaces that question with a better one.',
    reflection: 'Think of a conversation this week where you behaved in a way that surprised you. What was the situation asking of you?',
    body: [
      { p: ACTING_PRINCIPLE },
      { p: 'Behavior is not chosen from a menu of feelings. It comes out of a person in a particular situation, wanting something, meeting resistance. Change the situation and the behavior changes with it. The same words spoken by someone who has just been fired, or just been forgiven, are not the same words at all.' },
      { p: 'This is why the actor’s first job is not delivery. It is understanding: what is happening, who these people are to each other, what has just occurred, what is at stake, and what this character is trying to get. Delivery is the last thing to settle, and mostly it settles itself once everything else is in place.' },
      { h: 'What this rules out' },
      { list: [
        'Deciding in advance that a line is “angry” and then performing anger.',
        'Playing a summary of the character (“she’s bitter”) instead of what she is doing right now.',
        'Fixing a reading in rehearsal and repeating it regardless of what your partner gives you.',
      ] },
      { p: 'None of these is a moral failing. They are simply less useful than the alternative, because they replace a living situation with a fixed decision.' },
    ] },

  { id: 'ac-circumstances', module: 'work', order: 3,
    title: 'Given Circumstances',
    requiredReviewer: 'acting-professional',
    objective: 'Gather the facts a text establishes before inventing anything.',
    orientation: 'Given circumstances are everything the play tells you is true. They are the ground the character stands on.',
    reflection: 'For your scene: which three circumstances change the most if you get them wrong?',
    glossary: ['given-circumstances'],
    body: [
      { p: 'The given circumstances are the facts the text establishes: who the character is, where and when the scene happens, what has already occurred, what each person knows, and what the world of the play permits or forbids. They are given because the writer gave them to you; they are not open to preference.' },
      { p: 'Working from circumstances is what keeps an interpretation honest. An actor who has read carefully cannot play a casual goodbye in a scene where the text says the train leaves in four minutes.' },
      { h: 'Where to look' },
      { list: [
        'What characters say about themselves, treated as claims rather than facts.',
        'What other characters say about them, also claims.',
        'What the stage directions establish, in plays where they carry authority.',
        'What the events of the play require to have been true.',
        'What the period, place and social world make likely or impossible.',
      ] },
      { p: 'Speechcraft’s Question Everything framework, in the Actor’s Studio, walks this systematically for a text you are working on.' },
    ] },

  { id: 'ac-facts', module: 'work', order: 4,
    title: 'Facts, Assumptions and Unknowns',
    requiredReviewer: 'acting-professional',
    objective: 'Separate what the text states from what you have quietly assumed, and name what nobody can know.',
    orientation: 'Three different kinds of knowledge get treated as one, and that is where most confident wrong choices come from.',
    reflection: 'List one assumption you have been treating as a fact. What changes if the opposite is true?',
    body: [
      { p: 'A fact is something the text establishes. An assumption is something you have supplied, often without noticing. An unknown is something the text genuinely leaves open, and those are gifts rather than gaps.' },
      { p: 'The discipline is simply to sort them. “She has been waiting an hour” may be a fact. “She is furious about it” is an assumption: a legitimate choice, but yours, not the play’s. “Whether she has decided to leave him before the scene starts” may be a real unknown, and deciding it deliberately is one of the most powerful choices an actor makes.' },
      { h: 'Why the sort matters' },
      { list: [
        'Facts constrain honestly; they stop an interpretation drifting away from the play.',
        'Assumptions, once named, can be tested: try the opposite and see what the scene does.',
        'Unknowns are where the actor’s imagination is genuinely invited in.',
      ] },
      { p: 'Nothing here is scored. Two skilled actors will sort the same scene differently and both may be right.' },
    ] },

  { id: 'ac-objective', module: 'work', order: 5,
    title: 'Objective',
    requiredReviewer: 'acting-professional',
    sharedNote: 'The shared definition of objective, and the everyday-speaking version of the same idea, lives in the Speech chapter “What Do You Want?”. This lesson is its acting application.',
    sharedFrom: { workspace: 'speech', id: 'sp-m-want', label: 'What Do You Want? (Speech)' },
    objective: 'State what your character is trying to get from the other person, in playable terms.',
    orientation: 'An objective is a pursuit, not a mood. It is something another person can give you, or refuse.',
    reflection: 'Write your scene objective as “I want you to ___.” Does it name something the other person can actually do?',
    glossary: ['objective', 'overall-objective', 'scene-objective'],
    body: [
      { p: 'An objective is what the character is trying to get, usually from the other person in the room. “Make her stay.” “Get him to admit it.” “Be forgiven.” It is testable: at the end of the scene you either got it, lost it, or the situation changed under you.' },
      { p: 'Emotional states are not objectives. “Be angry” gives you nothing to do and nobody to do it to. If a strong feeling is genuinely present in the scene, it arrives as a consequence of pursuing something under pressure, not as an instruction to yourself.' },
      { h: 'Scene objective and overall objective' },
      { list: [
        'The scene objective is what you want here, now, from this person.',
        'The overall objective is what the character wants across the whole play.',
        'A good scene objective serves the overall one, even when the character does not know it.',
      ] },
    ] },

  { id: 'ac-obstacle', module: 'work', order: 6,
    title: 'Obstacle',
    requiredReviewer: 'acting-professional',
    objective: 'Identify what stands between the character and what they want.',
    orientation: 'No obstacle, no scene. Resistance is what makes pursuit visible.',
    reflection: 'What is the strongest obstacle in your scene, and is it in the other person, the situation, or your own character?',
    glossary: ['obstacle'],
    body: [
      { p: 'An obstacle is whatever resists the objective. It may be the other person’s opposing want, the situation (time, distance, a locked door, the presence of a third party), or something inside the character: fear, loyalty, shame, a promise they made.' },
      { p: 'Obstacles are worth finding precisely, because the size and kind of resistance shape everything the character does. Pursuit against mild resistance looks like conversation; pursuit against serious resistance looks like strategy.' },
      { h: 'A useful test' },
      { p: 'If a scene feels flat in rehearsal, the objective is often fine and the obstacle has gone missing. The actor has quietly assumed the other person will cooperate. Restore the resistance and the scene usually starts moving again.' },
    ] },

  { id: 'ac-stakes', module: 'work', order: 7,
    title: 'Stakes',
    requiredReviewer: 'acting-professional',
    objective: 'Know what this character stands to win or lose, and let that calibrate the scene.',
    orientation: 'Stakes are the answer to “so what?”, and the scene is only as alive as its answer.',
    reflection: 'If your character fails in this scene, what is the worst honest consequence?',
    body: [
      { p: 'Stakes are what the outcome costs. What does the character gain if this goes well, and lose if it does not? Stakes are established by the circumstances, not chosen for effect, and reading them accurately is more useful than inflating them.' },
      { p: 'Raising the stakes arbitrarily produces a familiar kind of bad acting: everything urgent, nothing meaning anything. Reading them accurately produces the opposite, a scene where a small thing can matter enormously because of what surrounds it.' },
      { h: 'Kinds of stakes worth naming' },
      { list: [
        'Practical: money, the job, the room, the deadline.',
        'Relational: whether this person stays, trusts you, forgives you.',
        'Internal: whether the character can go on thinking of themselves as they do.',
      ] },
    ] },

  { id: 'ac-urgency', module: 'work', order: 8,
    title: 'Urgency',
    requiredReviewer: 'acting-professional',
    sharedNote: 'Urgency as a general speaking principle is taught in the Speech chapter “Why Now? Understanding Urgency”. This lesson applies it to dramatic circumstances.',
    sharedFrom: { workspace: 'speech', id: 'sp-m-urgency', label: 'Why Now? Understanding Urgency (Speech)' },
    objective: 'Answer why this scene happens now, and let that answer shape behavior.',
    orientation: 'Every scene has to justify its own timing. The text usually tells you how.',
    reflection: 'Why can your character not have this conversation tomorrow instead?',
    glossary: ['urgency'],
    body: [
      { p: 'Urgency is the need to affect something now, and, as the Speech chapter establishes, it is not automatically faster or louder speech. It can produce slowness, precision, repetition, stillness or a change of tactic.' },
      { p: 'In dramatic circumstances, urgency is usually written into the situation: something has just happened, something is about to, someone is about to leave, a decision is being made tonight, an opportunity is closing. Find it in the text before inventing it.' },
      { h: 'Where dramatic urgency comes from' },
      { list: [
        'A deadline the circumstances impose.',
        'New information that has just arrived.',
        'A window that is closing: the other person is leaving, or will not be alone again.',
        'A consequence that becomes irreversible after this scene.',
      ] },
    ] },

  { id: 'ac-offbook', module: 'work', order: 1,
    title: 'Being Off Book',
    requiredReviewer: 'acting-professional',
    sharedNote: 'The general principle, that fluency frees attention, is taught in the Speech chapter “Fluency Frees the Speaker”. This lesson is the actor’s specific obligation.',
    sharedFrom: { workspace: 'speech', id: 'sp-start-fluency', label: 'Fluency Frees the Speaker (Speech)' },
    objective: 'Treat secure text as the entry ticket to the real work, not as the work itself.',
    orientation: 'Knowing the words is preparation, not acting.',
    reflection: 'Which lines are still not automatic? Those are tonight’s work, not tomorrow’s.',
    body: [
      { p: 'Being off book is the professional actor’s responsibility. The words are fixed and they are not yours to approximate: the exact language should become secure enough that you are no longer searching for the next one.' },
      { p: 'Knowing the words is preparation, not acting. Fluency frees the actor to listen, respond and pursue the objective. An actor still hunting for text has no attention left for the other person, and acting lives in what happens between people.' },
      { h: 'What securing text actually buys' },
      { list: [
        'Attention for the other actor, instead of for your own next line.',
        'The ability to be genuinely affected and still land the text.',
        'Freedom to move, to wait, to change tactics mid-thought.',
        'A rehearsal room that can work on the scene rather than on the lines.',
      ] },
      { p: 'Speechcraft’s Practice section holds text-based recall exercises: Vanishing Text, Cue Pickup, First-Letter Recall, built for exactly this stage of the work.' },
    ] },

  // ── Module 2 · Investigating the Text ─────────────────────────
  { id: 'ac-question', module: 'text', order: 1,
    title: 'Question Everything',
    requiredReviewer: 'acting-professional',
    sharedNote: 'Question Everything is one shared framework. The complete textbook lives in the Studio; this lesson introduces its use on a scene.',
    sharedFrom: { workspace: 'studio', id: 'question-everything', label: 'Question Everything (textbook)' },
    objective: 'Use a systematic set of questions instead of a first impression.',
    orientation: 'The questions are not a quiz. They are a way of refusing to settle too early.',
    reflection: 'Which question about your scene are you avoiding because you do not like the answer?',
    body: [
      { p: 'A script gives you the words. Question Everything helps you discover what is happening underneath them, systematically, so the investigation does not stop at whatever occurred to you first.' },
      { p: 'The framework is shared across Speechcraft: the same questions, the same saved answers, whether you reach them from Speech or from Acting. In the Actor’s Studio they apply to your selected project, with optional answers, “I don’t know yet” and “Not relevant” always available. Nothing is required, and no answer is scored.' },
    ] },

  { id: 'ac-who', module: 'text', order: 2,
    title: 'Who Am I Speaking To?',
    requiredReviewer: 'acting-professional',
    objective: 'Let the specific listener shape everything the character says.',
    orientation: 'The same want, aimed at a different person, produces a different scene.',
    reflection: 'What does this person know about your character that nobody else knows?',
    body: [
      { p: 'Speech is aimed. Who the character is speaking to shapes everything: their history together, the power between them, what they already know, what they will not say. All of it moves word choice, timing, how much is left unsaid and what is risked.' },
      { p: 'For a monologue the same question applies with more force, because the answer is not standing in front of you. Who is this addressed to: another character, an absent person, the audience as confidant, the character’s own mind? Each produces a different piece.' },
    ] },

  { id: 'ac-before', module: 'text', order: 3,
    title: 'What Happened Before?',
    requiredReviewer: 'acting-professional',
    objective: 'Establish the moment before, so the scene starts already in motion.',
    orientation: 'Nobody enters a scene from nowhere. What the character carries in shapes the first line.',
    reflection: 'What happened in the sixty seconds before your first line?',
    body: [
      { p: 'The scene is not the beginning of the character’s day. Something happened immediately before, a journey, an argument, a phone call, an hour of waiting, and it is still in the body when the first line arrives.' },
      { p: 'Some of this the text gives you. The rest is a choice, and it is one of the most useful choices available: a specific prior moment makes the opening of a scene concrete instead of generic.' },
    ] },

  { id: 'ac-changed', module: 'text', order: 4,
    title: 'What Has Changed?',
    requiredReviewer: 'acting-professional',
    objective: 'Track what is different by the end, for the character, the relationship and the situation.',
    orientation: 'A scene where nothing changes is usually a scene that has not been read closely enough.',
    reflection: 'What can your character no longer do, or no longer believe, once this scene ends?',
    body: [
      { p: 'Scenes exist because something moves. By the end, something is different: a decision has been made, a fact has come out, a relationship has shifted, an option has closed. Naming the change tells you what the scene is for.' },
      { p: 'Change also gives you the shape of the pursuit. If you know where the character ends up, you can see what they tried, in what order, and where it stopped working.' },
    ] },

  { id: 'ac-relationships', module: 'text', order: 5,
    title: 'Relationships',
    requiredReviewer: 'acting-professional',
    objective: 'Define the relationship in terms specific enough to play.',
    orientation: '“Brother” is a label. What plays is history, power and expectation.',
    reflection: 'What does your character want this person to think of them?',
    body: [
      { p: 'Relationship is not a category, it is a history. “Colleagues” covers admiration, resentment, dependency and rivalry equally, and each produces different behavior on the same line.' },
      { p: 'Useful specifics: how long they have known each other, who has power and over what, what they have done for each other, what they have failed to do, what is habitually left unspoken, and what each wants the other to believe about them.' },
    ] },

  { id: 'ac-beats', module: 'text', order: 6,
    title: 'Beats and Turns',
    requiredReviewer: 'acting-professional',
    objective: 'Divide the scene where the thought, tactic or circumstance turns.',
    orientation: 'Beats are not paragraph breaks. They mark where the pursuit changes.',
    reflection: 'Where in your scene does your character change approach, and why there?',
    glossary: ['beat'],
    body: [
      { p: 'A beat is a unit of the scene in which one action or subject holds. A new beat begins where something turns: the tactic stops working, new information lands, a subject changes, the balance of power shifts.' },
      { p: 'Marking beats is analysis, not performance. Two actors will divide the same scene differently, and neither division is correct. What the exercise buys is attention: it forces you to notice where the scene actually moves rather than playing it as one continuous mood.' },
      { p: 'The Beat Builder exercise in Practice lets you mark turns on your own text.' },
    ] },

  { id: 'ac-subtext', module: 'text', order: 7,
    title: 'Subtext',
    requiredReviewer: 'acting-professional',
    objective: 'Work with the distance between what is said and what is meant.',
    orientation: 'Subtext is not a secret code. It is the ordinary human gap between speech and intention.',
    reflection: 'Where does your character say one thing while pursuing another?',
    body: [
      { p: 'People rarely say exactly what they want. They approach it, test it, disguise it, or talk about something else entirely while pursuing it. Subtext is that gap, and it is completely ordinary; it happens in most real conversations.' },
      { p: 'For the actor, subtext is playable only through pursuit. You do not perform “I secretly resent him”; you pursue something while resentment shapes how you go about it. The line still means what it says on the surface, and something else is happening underneath.' },
      { p: 'The Same Words, Different Subtext exercise in Practice explores this on a fixed line. As everywhere in Acting, there is no correct reading to find.' },
    ] },

  { id: 'ac-actions', module: 'text', order: 8,
    title: 'Playable Actions',
    requiredReviewer: 'acting-professional',
    sharedNote: 'The Playable Actions library, twelve actions and six contrast pairs, is a single shared record used unchanged.',
    sharedFrom: { workspace: 'studio', id: 'playable-actions', label: 'Playable Actions library' },
    objective: 'Name what the character is doing to the other person, in verbs you can play.',
    orientation: 'The governing question: what are you doing to the other person through these words?',
    glossary: ['action', 'tactic'],
    reflection: 'Choose one action for your strongest beat. Then try its opposite. What did the scene do?',
    body: [
      { p: 'An action is what you are doing TO the other person: to reassure, to confront, to draw out, to warn. Actions are playable because they are transitive. They land on someone, and you can tell whether they worked.' },
      { p: 'Speechcraft’s Playable Actions library holds twelve actions organised into six contrast pairs, each pair sharing one practice line so the difference between them is audible in the same words. It lives in the Actor’s Studio and is used unchanged across the app.' },
      { p: 'No action is the correct action for a beat. The library is a vocabulary, not an answer key.' },
    ] },

  // ── Module 3 · Listening and Responding ───────────────────────
  { id: 'ac-attention', module: 'listening', order: 1,
    title: 'Attention on the Other Person',
    requiredReviewer: 'acting-professional',
    objective: 'Move attention off your own performance and onto your partner.',
    orientation: 'Most of what reads as presence is simply attention pointed outward.',
    reflection: 'In your last run-through, what did your partner actually do that you missed?',
    body: [
      { p: 'An actor watching themselves has divided attention, and it shows. An actor genuinely watching their partner has something to respond to, and that reads as presence.' },
      { p: 'This is trainable, and it is mostly a matter of where practice puts your attention. Secure text helps enormously: what is automatic no longer needs supervising, which leaves attention available for the person in front of you.' },
    ] },

  { id: 'ac-receiving', module: 'listening', order: 2,
    title: 'Receiving Before Responding',
    requiredReviewer: 'acting-professional',
    objective: 'Let what your partner does land before you answer it.',
    orientation: 'The gap between receiving and responding is where acting happens.',
    reflection: 'Where in the scene are you answering before you have listened?',
    body: [
      { p: 'Waiting for your cue is not listening. Receiving means letting what the other person does actually affect you before your line arrives, and letting the size of the effect match what they gave you.' },
      { p: 'When this is missing, scenes sound like two people reciting alternately. When it is present, the same text sounds like a conversation, because each line is visibly caused by the one before it.' },
    ] },

  { id: 'ac-moment', module: 'listening', order: 3,
    title: 'Moment-to-Moment Behavior',
    requiredReviewer: 'acting-professional',
    objective: 'Play the scene as it happens rather than as it was planned.',
    orientation: 'A plan is useful. A plan executed regardless of the other person is not acting.',
    reflection: 'What in your scene is fixed by the text, and what is genuinely free to change each time?',
    body: [
      { p: 'Preparation gives you circumstances, objective, obstacle and a vocabulary of actions. It does not give you a performance to reproduce. The scene is played forward each time, in response to what is actually happening.' },
      { p: 'This is not an argument against rehearsal, quite the opposite. Thorough preparation is what makes moment-to-moment work possible, because the things that must be reliable are reliable, leaving the live things free.' },
    ] },

  { id: 'ac-newinfo', module: 'listening', order: 4,
    title: 'Allowing New Information to Affect You',
    requiredReviewer: 'acting-professional',
    objective: 'Let what you learn in the scene change what you do next.',
    orientation: 'Characters who learn nothing produce scenes that go nowhere.',
    reflection: 'What does your character learn in this scene, and at exactly which line?',
    body: [
      { p: 'Scenes deliver information: a confession, a refusal, a fact the character did not have. The question is whether it lands. An actor who already knows the whole play can quietly stop being surprised by it.' },
      { p: 'Find the exact line where each piece of new information arrives, and let it cost something. The adjustment that follows, a change of tactic, a pause, a retreat, is often the most alive moment in the scene.' },
    ] },

  { id: 'ac-repetition', module: 'listening', order: 5,
    title: 'Repetition Without Predetermining Delivery',
    requiredReviewer: 'acting-professional',
    objective: 'Repeat the work without freezing it.',
    orientation: 'Rehearsal repeats the situation, not the reading.',
    reflection: 'What stayed identical in your last two run-throughs that did not need to?',
    body: [
      { p: 'Repetition is how the work becomes reliable. It is also how a scene dies, if what is repeated is a performance rather than a pursuit. The difference is what you are repeating: the circumstances, the objective and the listening, or a remembered set of line-readings.' },
      { p: 'A practical test: if a run-through would be unchanged had your partner done something different, the scene has been fixed rather than rehearsed.' },
    ] },

  { id: 'ac-playing', module: 'listening', order: 6,
    title: 'Playing the Objective Instead of Displaying Emotion',
    requiredReviewer: 'acting-professional',
    objective: 'Pursue something, and let feeling arrive as a consequence.',
    orientation: 'Displayed emotion is a report. Pursuit is an event.',
    reflection: 'Where are you showing a feeling instead of trying to get something?',
    body: [
      { p: 'Emotion cannot be played directly with any reliability; attempts to produce it on command usually produce its indication instead. What can be played is a pursuit under real resistance, and feeling tends to arrive on its own when the pursuit matters.' },
      { p: 'This course takes no position on which of the many approaches to emotional life an actor should adopt; the Approaches to Acting introductions in the Library describe several. What it does insist on is that “be sad” is not a playable instruction, while “get her to stay” is.' },
    ] },

  // ── Module 4 · Preparing the Performance ──────────────────────
  { id: 'ac-monologue', module: 'performance', order: 1,
    title: 'Monologue Work',
    requiredReviewer: 'acting-professional',
    objective: 'Treat a monologue as a scene with the other person still in it.',
    orientation: 'A monologue is not a solo. It is a pursuit that happens to be uninterrupted.',
    reflection: 'Who is your monologue aimed at, and what do you want from them?',
    body: [
      { p: 'The questions do not change: circumstances, who this is addressed to, what the character wants, what resists, what changes. The only difference is that the other person does not answer in words, which does not mean they do not answer.' },
      { p: 'Locate the turns. A monologue that plays as one continuous statement is usually several distinct attempts that have been flattened together. Where does the character change approach because the first one did not work?' },
    ] },

  { id: 'ac-scene', module: 'performance', order: 2,
    title: 'Scene Work',
    requiredReviewer: 'acting-professional',
    objective: 'Bring the whole investigation into two-person work.',
    orientation: 'Scene work is where preparation meets someone else’s preparation.',
    reflection: 'What does your partner want, and how does it collide with what you want?',
    body: [
      { p: 'Everything prepared alone gets tested here: your reading of the circumstances, your objective, your actions. Some of it will not survive contact with the other actor’s choices, and that is the process working, not failing.' },
      { p: 'Two disciplines matter most: know what YOU want, and genuinely watch what THEY do. A scene in which both actors manage this rarely needs much else.' },
    ] },

  { id: 'ac-rehearsal', module: 'performance', order: 3,
    title: 'Rehearsal Preparation',
    requiredReviewer: 'acting-professional',
    objective: 'Arrive with the work that can only be done alone already done.',
    orientation: 'Rehearsal time is for what needs two people. Everything else is homework.',
    reflection: 'What are you hoping rehearsal will solve that you could settle tonight?',
    body: [
      { p: 'Text security, a first reading of the circumstances, an objective you are willing to test, questions you cannot answer alone: that is a well-prepared arrival. Rehearsal then spends its time on what actually requires the room.' },
      { p: 'Keep rehearsal notes as questions rather than verdicts where you can. “Why does she stay after that line?” travels better into the next rehearsal than “play this colder”.' },
      { p: 'The Actor’s Studio holds Rehearsal Notes alongside your scene study, so the questions and the work live with the text.' },
    ] },

  { id: 'ac-integrating', module: 'performance', order: 4,
    title: 'Integrating Voice, Thought, Listening and Movement',
    requiredReviewer: 'acting-professional',
    sharedNote: 'The general integration principle is taught in the Speech chapter “Voice, Thought, Listening, Movement & Response”. This lesson applies it to scene work.',
    sharedFrom: { workspace: 'speech', id: 'sp-w-integration', label: 'Voice, Thought, Listening, Movement & Response (Speech)' },
    objective: 'Test whether technique survives being inside a scene.',
    orientation: 'Whatever collapses when the other actor arrives goes back into practice.',
    reflection: 'Which prepared element disappeared the moment you ran the scene with a partner?',
    body: [
      { p: 'Isolated work is temporary by design. In a scene the actor is speaking, listening, moving and responding at once, and whichever element still needs conscious management will take attention from the others.' },
      { p: 'Use the collapse diagnostically. If clarity vanishes under pressure, that is articulation practice, not an acting problem. If the objective vanishes, that is scene work. The Speech workspace holds the general training for each element.' },
    ] },

  { id: 'ac-applying', module: 'performance', order: 5,
    title: 'Applying Technique in a Scene',
    requiredReviewer: 'acting-professional',
    sharedNote: 'The general principle is taught in the Speech chapter “Applying Technique Without Managing It”.',
    sharedFrom: { workspace: 'speech', id: 'sp-w-applying', label: 'Applying Technique Without Managing It (Speech)' },
    objective: 'Leave the technique in the background where it belongs.',
    orientation: 'In performance, attention belongs to the other person, not to your own craft.',
    reflection: 'What were you supervising during your last run that could have been left alone?',
    body: [
      { p: 'An actor consciously managing breath, pace and beat structure while playing a scene has no attention left for the person opposite. Trust the preparation: what practice made reliable will be there unsupervised.' },
      { p: 'When something wobbles, note it and finish the scene with your attention where it belongs. The wobble is tomorrow’s practice, not tonight’s emergency.' },
    ] },

  { id: 'ac-performance', module: 'performance', order: 6,
    title: 'Taking the Work Into Performance',
    requiredReviewer: 'acting-professional',
    objective: 'Carry preparation into the room without carrying a fixed performance.',
    orientation: 'The audience changes the room. The work should be able to survive that.',
    reflection: 'What are you willing to let be different tonight?',
    body: [
      { p: 'Performance adds an audience, nerves, and the fact that this run cannot be stopped. What survives that is the work that was built on pursuit and listening rather than on a remembered shape.' },
      { p: 'Two things travel well: knowing exactly what you want in each scene, and being genuinely available to your partner. Almost everything else can be rebuilt live from those two.' },
      { p: 'Nothing in Speechcraft evaluates a performance. This course prepares the work; what happens in the room belongs to you and the people you make it with.' },
    ] },

  // ── Module 4 · Building a Character ─────────────
  { id: 'ac-character', module: 'character', order: 1,
    title: 'Building a Character',
    requiredReviewer: 'acting-professional',
    objective: 'Know the two ways actors build a person, and that the real goal is using both.',
    orientation: 'There are two roads into a character. The destination is not choosing one. The destination is walking both.',
    reflection: 'Which road do you reach for first, and when did you last walk the other one?',
    body: [
      { p: 'Every actor has a different process, and there is no right answer. What there are is lessons: tools you can pick up, try against your own work, and keep or discard. That is the point of this whole course, not just this module. Speechcraft hands you a pile of curated tools and ideas, you sort through them, you keep what helps, and out of what you keep you build your own way of telling a story through a character. Nobody can hand you a method. You assemble one.' },
      { p: 'That said, most processes travel one of two broad roads. Some actors start with the script: they read, they dig, they list facts, they work out the world and who this person is inside it. Others start with themselves: they improvise, they play, they try voices and walks until somebody unexpected shows up. The first road runs through analysis. The second runs through feeling.' },
      { p: 'Here is the part that matters most, so it comes first: the goal is both. Analysis without feeling gives you a well-researched cardboard cutout. Feeling without analysis gives you a vivid stranger who may not belong in the play. The finished character is what happens where the two roads meet. Start with analysis and bring what you learn into the improvising, or start with feeling and take what you find back to the text. One then the other, or the other then the one. There is no right order and no right answer. There is only the meeting.' },
      { p: 'This module gives you the map and then walks the feeling road end to end, because the analysis road already has its tools built: the whole of Investigating the Text, and the Four Lists in the Library. The next lesson shows you how those tools become a person. Everything after that is the feeling road, which nothing else in Speechcraft teaches. Wherever you are standing when you finish, the last step is always the same: cross over.' },
    ] },
  { id: 'ac-hired', module: 'character', order: 2,
    title: 'What You Are Hired For',
    requiredReviewer: 'acting-professional',
    objective: 'Know the actor’s actual job: arrive off book, arrive with a person, and make choices without being asked.',
    orientation: 'Building a character is not homework for its own sake. It is what lets you do the job you were hired for.',
    reflection: 'In your last rehearsal, how many choices did you offer before anyone asked you for one?',
    body: [
      { p: 'Job requirement number one is being off book, and it sits at number one for two reasons. The first is plainly professional: it is the minimum, the entry ticket, the thing that makes you usable at all. The second is the deeper one. Text you own completely is text you no longer think about, and the attention it frees up is what lets you actually play: make a different choice on this pass, then another, and follow what those choices uncover. Discoveries come from free attention, and free attention comes from being off book. You met this at the very start of the course, in Being Off Book and the Alphabet Experiment. This is why it was first.' },
      { p: 'Here is what the freedom is for. Your job is to walk into the rehearsal room, the stage, the set, already carrying an idea of who this person is, built from the research and preparation you did before you showed up, and then to take control and make choices based on that knowledge. Never wait for a director to ask you for a choice. Never ask whether you are allowed to try something. Make the choice. That is not boldness for its own sake. That is literally the service you were hired to provide.' },
      { p: 'Think about hiring any other professional. If you hired a chef and they kept asking you how to prepare each ingredient, when to season, whether they were allowed to make every small decision, you would start wondering why you hired them. Their uncertainty would slow the whole kitchen down and force you to do their job for them. An actor who waits to be told is that chef. The director hired you to bring a person into the room, not to ask permission to have one.' },
      { p: 'Which is what this module is actually for. Everything that follows, both roads of it, exists so that when you arrive, you arrive loaded: a person already built, choices already available, ready to offer instead of ready to ask.' },
    ] },
  { id: 'ac-analysis', module: 'character', order: 3,
    title: 'Through Analysis',
    requiredReviewer: 'acting-professional',
    objective: 'Build a character from what the text gives you: the world, the facts, and what everyone says.',
    orientation: 'This road starts at the desk. You read your way to the person.',
    reflection: 'Take a character you know. What is the single fact of their world that shaped them most before the play began?',
    body: [
      { p: 'The analysis road works like detective work. You read the whole play, more than once, and you collect what it actually states: the world this person lives in, what they do for a living, who they answer to, what they want out loud and what they seem to want underneath. You gather what they say about themselves, what they say about everyone else, and what everyone else says about them. Then you look for the places where those accounts disagree, because the disagreements are where the person is hiding.' },
      { p: 'You already own the tools for this road. Investigating the Text is eight lessons of exactly this work: facts, relationships, beats, subtext, playable actions. The Four Lists in the Library turns the reading into four concrete inventories on your own script. This lesson is not here to repeat them. It is here to point them at a new target.' },
      { p: 'Because here is the shift: those tools are usually aimed at understanding a scene. Aim them at building a person instead. The world of the play tells you what shaped this character before page one. The facts tell you what they cannot escape. The gap between what they claim and what others report tells you what they are hiding, and a person is mostly made of what they are hiding. Analysis done this way does not end in notes. It ends in somebody.' },
      { p: 'And when it does, do not stop there. Take that somebody to the other road. Carry everything the desk gave you into an empty room and let the person improvise, and watch the research turn into behavior. Or if you came here from the feeling road, run your discovered character through these tools and find out whether they can survive the facts of the play. Either order works. No right answers. The character is finished where the two roads meet.' },
    ] },
  { id: 'ac-inside', module: 'character', order: 4,
    title: 'Through Feeling',
    requiredReviewer: 'acting-professional',
    objective: 'Understand where your characters actually come from, and start the search there.',
    orientation: 'The other road does not start at the desk. It starts with everything you have ever absorbed.',
    reflection: 'Who has spoken up in you before, unprompted? And can you name where you absorbed them from?',
    body: [
      { p: 'Start with how a person learns to be anything. A doctor behaves like a doctor because doctors have been shown behaving that way. A truck driver talks like a truck driver because that is how truck drivers talk, and everyone, including the truck driver, learned it from somewhere. Behavior is not born in us. It is absorbed, from every person we have ever watched.' },
      { p: 'And you have watched more than the people in your life. You were never a cowboy. You never robbed a bank. But you know exactly how a cowboy leans in a doorway and exactly how a bank robber tells a room to stay calm, because the movies and television have been feeding you cowboys and bank robbers since before you could read. To the part of you that produces behavior, a remembered performance is as real as a remembered person. It does not sort its library into firsthand and secondhand. It just shelves everything.' },
      { p: 'Which means the cast is already in the building. A lifetime of absorbed people: met, overheard, watched on screens. So when this road says look inside instead of out, it is not mysticism. The inside IS the outside, collected. Improvise out loud with no plan, play the recording back, and one of them will step forward, someone you never planned, saying things you did not write. That is not invention from nothing. That is the library lending.' },
      { p: 'So forget building a character the way you would build a shelf. There is no finishing it. You are pulling somebody out of a collection you spent your whole life making, and you will know it is working when they start saying things you did not plan.' },
    ] },
  { id: 'ac-archetypes', module: 'character', order: 5,
    title: 'The Universal Cast',
    requiredReviewer: 'acting-professional',
    objective: 'Recognize archetypes: the characters every culture already knows.',
    orientation: 'Some characters exist everywhere. Change the country, change the language, change the century, and there they still are.',
    reflection: 'Which archetype do you play without trying? And which one have you never once been cast as?',
    body: [
      { p: 'Certain characters show up in every tradition that has ever put people in front of an audience. The braggart who folds the moment he is tested. The miser. The trickster servant who is smarter than his master. The young lovers that everything conspires against. The tyrant. The fool who is the only one telling the truth. Italian street theatre had them in masks. Sanskrit drama had them. Shadow plays had them. Your favorite sitcom has them tonight. Different names, different clothes, same people.' },
      { p: 'They survive because they cross every barrier. An audience that shares none of your language still recognizes the braggart within seconds, because they grew up with their own. That recognition is money in the bank: the audience meets you halfway before you have earned anything. It also explains what happens when you improvise. The people who step forward out of you tend to be archetypes wearing specifics, because the universal cast is the deepest layer of everything you absorbed.' },
      { p: 'Use them as skeletons, never as cages. An archetype is where a character starts, not where it ends. Play the type alone and you have a cartoon that anyone could do. Build the specifics on top, this braggart, from this place, with this wound, and you have a person the audience recognizes instantly and has still never met. Recognized at first sight, surprising ever after. That is the pairing to aim for.' },
    ] },
  { id: 'ac-room', module: 'character', order: 6,
    title: 'The Empty Room',
    requiredReviewer: 'acting-professional',
    objective: 'Set up a space where you can improvise without watching yourself.',
    orientation: 'This part takes no talent at all. It takes a door that closes.',
    reflection: 'Where and when could you do this without being overheard? Name the room and the hour.',
    body: [
      { p: 'The setup could not be plainer. A recorder. A room where nobody can hear you. Enough floor to move around on. Say the date, say what you are working on, and go.' },
      { p: 'The privacy is the whole machine. The second some part of you starts wondering how this sounds to another person, you are performing instead of finding, and whatever was about to show up will not. Self-consciousness kills this work faster than anything else. So no audience, no roommate down the hall, no phone face up on the table.' },
      { p: 'And record everything. Keep all of it. This method was invented on cassette tape, when every reel cost money and had to live in a shoebox, so you had to decide what mattered while you were still making it. You do not. Your phone holds more hours than you will ever fill. Let it run, make the mess, and save the judging for later. Later is when judging is useful.' },
      { p: 'One honest note: Speechcraft cannot do this part with you. The app does not record and does not listen. This is you, a phone, a shut door, and half an hour nobody needs you for. Bring back whatever turns out to be worth keeping.' },
    ] },
  { id: 'ac-waysin', module: 'character', order: 7,
    title: 'Three Ways In',
    requiredReviewer: 'acting-professional',
    objective: 'Start an improvisation from a fragment, a physical detail or a vocal stance.',
    orientation: 'You do not need a whole character to start. You need one piece. The rest follows the piece.',
    reflection: 'Write down three fragments of speech you overheard this week. Which one has a person standing behind it?',
    body: [
      { p: 'Way one: a scrap of overheard speech. Keep your ears open all week. People hand you material constantly: arguments through car windows, one side of a phone call, a guy narrating his grievance to a whole train. Take one scrap and repeat it out loud until an attitude wakes up inside it. One word can be enough. Say “sir” over and over with a little acid in it and watch a whole officious clerk assemble himself around the word.' },
      { p: 'Way two: a physical detail. How somebody lights a cigarette. How they hold a bottle, or will not put down their bag, or cross a room like the floor owes them money. Commit to one honest gesture and the rest of the body tends to show up around it.' },
      { p: 'Way three, and the strongest: a vocal stance. This is not doing an impression. An impression is hollow. This is letting a way of speaking steer the improv from the inside. Take something you know by heart and say it in a voice that is nothing like yours. Listen to what the voice does to the words. It will make choices you would never have made on purpose.' },
      { p: 'And a fourth door, since it is standing open: some people are already performing. A teacher in front of a class. A preacher in the pulpit. A gym instructor counting reps. A man yelling at traffic. Walk in through any of them.' },
    ] },
  { id: 'ac-noaim', module: 'character', order: 8,
    title: 'Do Not Aim',
    requiredReviewer: 'acting-professional',
    objective: 'Improvise without steering toward a result.',
    orientation: 'The fastest way to ruin this is to try to make it good while it is still coming out.',
    reflection: 'Play back something you improvised. Where can you hear yourself trying to be good?',
    body: [
      { p: 'When you improvise, aim at nothing. Do not try to be funny. Do not try to be moving. Do not try to be anything. Become the person, get into the situation, and let whatever happens happen. Your entire job is to cut loose and let the character talk.' },
      { p: 'The finished piece is not your concern right now. The character rambles? Let them ramble. Repeats themselves? People repeat themselves. Makes no sense? Fine. Judging while you create shuts the whole factory down, and creating is the only thing on the schedule today.' },
      { p: 'And expect waste. Plan on it. Throw everything at the wall, because you cannot know in advance what sticks. Three good minutes come out of hours of tape. Hours. That is not you failing, that is the arithmetic of the method, and knowing the arithmetic going in is what gets you through the long stretch where all of it sounds like nothing.' },
    ] },
  { id: 'ac-transcribe', module: 'character', order: 9,
    title: 'Listen, Transcribe, Go Again',
    requiredReviewer: 'acting-professional',
    objective: 'Turn raw improvisation into material through a loop you repeat.',
    orientation: 'The recording is not the work. The recording is the dirt you sift the work out of.',
    reflection: 'Read your oldest transcription again. Is there someone in it you did not notice at the time?',
    body: [
      { p: 'Now play it all back and listen for the parts you like the sound of. Not the cleverest parts. The parts where somebody real flickers past. This is panning for gold, and the ratio is supposed to be terrible: a lot of dirt, a little glitter. That is the deal you signed in the last lesson.' },
      { p: 'Whatever glitters, write it down. Keep every transcription, including the ones you have no use for. A scrap that reads as nothing in March has a way of starting a whole person in September. Your pile of transcriptions is an asset. It only grows.' },
      { p: 'Then work your gold. Take a fragment, clean it up, learn it by heart, and use it to launch the next improv. Pocket what you keep and go back for the next batch of dirt. Around and around: improvise, sift, transcribe, launch. The pile gets richer every pass, and the person in it gets more definite.' },
      { p: 'Once something is on paper, interrogate it with boring questions. What was this person doing ten minutes ago? What is in their pockets? How old are they, and what has that age done to the voice and the posture? The answers are not the point. The point is what the questions shake loose.' },
    ] },
  { id: 'ac-essence', module: 'character', order: 10,
    title: 'The Person, Not the Props',
    requiredReviewer: 'acting-professional',
    objective: 'Keep the character active and clear without decorating them.',
    orientation: 'A costume and a mimed steering wheel are two ways to hide the fact that nobody is home.',
    reflection: 'Watch your character with the sound off in your head. Is there anything to see?',
    body: [
      { p: 'Keep the character doing something. Standing, moving, working on the other person. And skip the decoration. No costume, no mime. The moment you mime driving a car, the audience starts grading your driving, and they stop watching the human being. The human being is the act. Everything else is a hat.' },
      { p: 'Want to know if it is working? Imagine playing it for a room that does not speak the language. Would they watch anyway? If the whole thing collapses without the words, there is no character yet. There is a script with a costume on. Notice this is the archetype test from earlier, pointed at your own work: the universal cast crosses every language barrier, and a built character should too.' },
      { p: 'Two more habits, and then the door. Let the character say the opposite of what the room expects, because nobody buys a ticket to hear your opinions recited. Give the worst person in the piece their side of the story; even the jerk thinks he is right, and he is more interesting the moment he gets to say why. Then hold everything you make to one final test: put on stage exactly what you would want to see if you were the one in the seat.' },
      { p: 'That is the feeling road, end to end. Now cross over. Take the person you found in the empty room back to the desk and run them through the analysis: the world of the play, the facts, the four lists. Find out what your discovery cannot escape and what they are hiding. Or next time, walk the roads in the other order and see what changes. One then the other, or the other then the one. No right answers. The character is finished where the two roads meet.' },
    ] },

  // ── Module 5 · Tempo-Rhythm ─────────────────────
  { id: 'ac-dials', module: 'rhythm', order: 1,
    title: 'Two Dials, Not One',
    requiredReviewer: 'acting-professional',
    objective: 'Separate tempo from rhythm, and know which one is wrong.',
    orientation: 'Most actors have one word for speed and use it for two different things. That is one control for two dials.',
    reflection: 'Take a speech you know well. Is the problem its speed, or the pattern inside the speed?',
    body: [
      { p: 'Tempo is how fast you are going. Rhythm is the pattern inside the speed, the long and the short of it. They are separate dials and they turn separately. Fast and smooth is one thing. Fast and jagged is a different animal. Slow and steady, slow and broken: four states, two dials.' },
      { p: 'Why care? Because the repairs are different. Wrong tempo, change the speed. Wrong rhythm, and changing the speed just hauls the same bad pattern along at a new rate. You have heard the note a hundred times: pick up the pace. And the scene did not get better, did it? Because the scene was dragging in its rhythm, and nobody touched that dial.' },
      { p: 'Three traps, so you can spot yourself in them. The actor whose body is rhythmic and whose speech is not, or the reverse. The actor with one rhythm for every role, always recognizably themselves in a different coat. And the actor who nails the metre perfectly with nothing alive underneath it.' },
    ] },
  { id: 'ac-feeling', module: 'rhythm', order: 2,
    title: 'Rhythm Reaches Feeling',
    requiredReviewer: 'acting-professional',
    objective: 'Use tempo-rhythm as a way into feeling.',
    orientation: 'You cannot order a feeling to show up. You can set a speed. That loophole is the whole trick.',
    reflection: 'What circumstance would make your character move at the speed you have given them?',
    body: [
      { p: 'There are three doors into an actor. Text reaches the mind. Objective reaches the will. And tempo-rhythm reaches the feelings, which answer to nobody. Try commanding yourself to dread something. Nothing happens. Now set the rhythm of dread, the caught breath, the too-still hands, and give it a minute. The feeling walks in on its own, behind the rhythm, like it was invited.' },
      { p: 'But it does not work empty. A rhythm with nothing behind it is drumming on a table. Give it a circumstance to sit on and the two start feeding each other: the situation shapes the rhythm, and the rhythm starts showing you corners of the situation you had not imagined yet.' },
      { p: 'And never mistake speed for meaning. A march, a stroll and a funeral can move at exactly the same tempo and share nothing else on earth. When a rhythm feels arbitrary, you are not missing a better rhythm. You are missing the circumstance that would make this one inevitable.' },
    ] },
  { id: 'ac-tworhythms', module: 'rhythm', order: 3,
    title: 'Two Rhythms at Once',
    requiredReviewer: 'acting-professional',
    objective: 'Mark an inner and an outer rhythm on the same speech, and play the gap between them.',
    orientation: 'A person hiding something runs two rhythms at once. The gap between them is what the audience is actually reading.',
    reflection: 'Where in your script is your character calmer on the outside than on the inside?',
    body: [
      { p: 'Watch anyone waiting on terrible news. The body is stone. Inside, the pulse is sprinting. Watch a good liar: the speech is even, almost bored, and underneath it every gear is screaming. Inside and outside do not match, and most of the time they should not, because the distance between them is where the performance lives.' },
      { p: 'Better yet, the two rhythms push on each other. The harder you clamp the outside steady, the faster the inside runs, and the faster the inside runs, the harder the outside is to hold. Do not solve that loop. Play it. It plays beautifully.' },
      { p: 'One mind can split the same way, resolve at one speed and doubt at another, both running at once. So when a scene feels flat and every other thing about it checks out, look here first. You have probably given the character one rhythm in a moment that is begging for two.' },
    ] },
  { id: 'ac-harmony', module: 'rhythm', order: 4,
    title: 'Harmony, Not Unison',
    requiredReviewer: 'acting-professional',
    objective: 'Hear a scene as separate rhythms sounding together.',
    orientation: 'Two people in the same rhythm are singing in unison. A scene almost never wants unison.',
    reflection: 'In this scene, are you in harmony with the other character or in unison? If it is unison, did you choose it?',
    body: [
      { p: 'Everybody in a room is running their own rhythm. When a group truly shares one, that is unison, and unison is a special effect: soldiers on parade, a chorus, a mob with one idea in its head. The sameness is the point there. A scene is not built like that. A scene is harmony: different lines, sounding at the same time.' },
      { p: 'Think about what a chord is. Different notes. Two players on the same note are not making a chord, they are making one note louder. What the audience actually receives from two characters is the interval between them, and here is the thing about the interval: nobody plays it. You hold your line, the other actor holds theirs, and the music happens in the space neither of you owns.' },
      { p: 'Some intervals sit sweet. Some grate. Both are music, so a scene where two rhythms refuse to settle is not a scene going wrong. The thing to fear is accidental unison: a scene rehearsed until everybody has drifted onto one polite shared pace. It sounds tidy. It sounds finished. It sounds nothing like people.' },
    ] },
  { id: 'ac-rests', module: 'rhythm', order: 5,
    title: 'Notes and Rests',
    requiredReviewer: 'acting-professional',
    objective: 'Treat pauses as part of the rhythm, not gaps in it.',
    orientation: 'Syllables are the notes. Pauses are the rests. And a rest is written into the music. It is not the music stopping.',
    reflection: 'Which of your pauses are carrying something? Which are just waiting?',
    body: [
      { p: 'Speech is time, divided. Words take some of it, pauses take the rest, and both of them carry rhythm. Long sounds, short sounds, hard stresses, soft ones. That is the entire toolkit, and every rhythm anyone has ever spoken was built out of it.' },
      { p: 'Here is the failure you already know: the dead pause. The silence where the rhythm just drops. You feel the thread snap, the audience feels it snap, and the next line has to start the engine cold. The fix costs nothing to describe and takes real practice to own: keep a silent count running under the pause. The rhythm never stops. Only the sound does.' },
      { p: 'That same count is your bridge between phrases that do not share a rhythm, which in prose is most of them. One phrase runs long, the next is three words, each has its own shape. Do not iron them into one measure. Keep counting across the joins and let the count carry you over.' },
    ] },
  { id: 'ac-speeds', module: 'rhythm', order: 6,
    title: 'The Two Missing Speeds',
    requiredReviewer: 'acting-professional',
    objective: 'Build true slow speech and true fast speech.',
    orientation: 'Most stage speech is neither slow nor fast. It is long pauses with the words rushed out in between. Two speeds are missing.',
    reflection: 'Can you say your hardest line at half speed without it dying, and at double speed without it turning to mush?',
    body: [
      { p: 'True slow is hard because slow wants to die. The words drift apart, the line stalls, restarts, and now the audience can hear the machinery. What keeps a slow line alive is sound, not silence. Let the vowels carry. Keep the line sounding all the way through its length instead of chopping it into pieces with air between them.' },
      { p: 'True fast is a separate discipline, and it is not rushing. Fast is built out of slow. Take the passage at a crawl, slower than you will ever perform it, every consonant finished like you are being paid by the consonant. Repeat until your mouth knows it without you. Then, and only then, accelerate. Speed built any other way turns to mush, and it turns to mush at exactly the moment you most need every word to land.' },
      { p: 'Last thing. Both speeds need a reason to exist. Slow with no reason behind it is pompous. Fast with no reason behind it is a party trick. Circumstance first, speed second. That order never flips.' },
    ] },

  // ── The Professional Actor ─────────────────────────────────
  // A Library-only collection: how to be hired and stay hired. The
  // module id 'professional' is deliberately NOT in ACTING_MODULES,
  // so these chapters shelve in the Library and never appear on the
  // Learn path. Tips read in any order; nothing here is sequenced.
  // Core professional truths (off book above all) repeat elsewhere in
  // the app BY OWNER ORDER: what matters most should keep coming up.
  { id: 'ac-pro-offbook', module: 'professional', order: 1,
    title: 'Off Book Is the Minimum',
    requiredReviewer: 'acting-professional',
    objective: 'Treat knowing the words as the entry ticket, never the achievement.',
    orientation: 'You will hear this more than once in this app. That is on purpose.',
    reflection: 'Which of your current lines still cost you attention? Those are tonight’s work.',
    body: [
      { p: 'Being off book is job requirement number one, and it earns that spot twice over. Professionally, it is simply the minimum: an actor holding a script in week three is a problem everyone else in the room now has to manage. Craft-wise, it is the key that unlocks everything. Text you own completely is text you no longer think about, and the attention it frees is what lets you play, choose, and discover.' },
      { p: 'Notice what the room can do when you are off book and what it cannot do when you are not. Off book, you can look the other actor in the eye, take a note and apply it on the next pass, try a completely different choice on a whim. On book, every one of those doors is closed, because a piece of your head is still reading.' },
      { p: 'There is no shortcut and no substitute. Drill the lines until they are boring, because boring is the goal: words so automatic they cost you nothing. What you save on remembering, you spend on acting.' },
    ] },
  { id: 'ac-pro-choices', module: 'professional', order: 2,
    title: 'Make Choices, Never Ask Permission',
    requiredReviewer: 'acting-professional',
    objective: 'Understand that making choices is the service you were hired to provide.',
    orientation: 'The director did not hire you to ask what to do. The director hired you so there would be one less thing to do.',
    reflection: 'In your last rehearsal, how many choices did you offer before anyone asked you for one?',
    body: [
      { p: 'Your job is to walk in already carrying an idea of who this person is, built from the research and preparation you did before you showed up, and then to make choices based on that knowledge. Never wait for a director to ask you for a choice. Never ask whether you are allowed to try something. Make the choice, offer it, and let the room respond to something real.' },
      { p: 'Think about hiring any other professional. If you hired a chef and they kept asking you how to prepare each ingredient, when to season, whether they were allowed to make every small decision, you would start wondering why you hired them. Their uncertainty would slow the whole kitchen down and force you to do their job for them. An actor who waits to be told is that chef.' },
      { p: 'A wrong choice, made fully, is useful: the director now knows something about the scene and can steer. No choice teaches nobody anything, and it quietly hands your job to someone who already has their own. Bring the person into the room. That is what the call time is for.' },
    ] },
  { id: 'ac-pro-notes', module: 'professional', order: 3,
    title: 'Taking a Note',
    requiredReviewer: 'acting-professional',
    objective: 'Receive direction like a professional: take it, apply it, move on.',
    orientation: 'A note is not a criticism of you. It is information about the show.',
    reflection: 'Think of the last note you resisted. What was it protecting?',
    body: [
      { p: 'When a note comes, take it. Do not defend the old choice, do not explain what you were going for, do not relitigate the scene. The director watched it and wants something different; your account of your intentions changes nothing about what the audience will see. Say thank you, and thank you is a complete sentence.' },
      { p: 'Then actually apply it, visibly, on the next pass. A note applied fast tells the room you are steerable, and steerable actors get hired again. A note that vanishes into a nod and never appears in the work is worse than arguing, because now the director wonders whether you listened at all.' },
      { p: 'Applying a note is not surrendering your character. You built the person; the note adjusts the person; you are the one who knows how to make the adjustment true. Take the note INTO the character you built rather than dropping the character to obey it. That is the difference between a puppet and a professional.' },
    ] },
  { id: 'ac-pro-early', module: 'professional', order: 4,
    title: 'Early Is On Time',
    requiredReviewer: 'acting-professional',
    objective: 'Run your rehearsal conduct so the room never has to think about you.',
    orientation: 'Early is on time. On time is late. Late is unacceptable.',
    reflection: 'What time do you actually arrive, measured honestly against your last three calls?',
    body: [
      { p: 'Say it again, because it runs the whole working life: early is on time, on time is late, and late is unacceptable. Walking in at the call time means the room is now waiting while you take off your coat, find your script and settle. Walking in early means that at the call time you are already warmed, ready and reachable. One of those people gets remembered fondly.' },
      { p: 'The rest of rehearsal etiquette is the same idea wearing different clothes: make yourself easy to work with. Pencil, never pen, because blocking changes. Mark your script so the same question never gets asked twice. Know whose room it is, and it is not yours. Keep your problems small and your solutions ready.' },
      { p: 'None of this is servility. It is craft applied to the workplace. The same discipline that gets you off book gets you in the building twenty minutes early, and the room can feel both.' },
    ] },
  { id: 'ac-pro-director', module: 'professional', order: 5,
    title: 'What a Director Actually Wants',
    requiredReviewer: 'acting-professional',
    objective: 'Bring options and solutions, not questions and problems.',
    orientation: 'The director has a hundred fires. Do not be the hundred and first.',
    reflection: 'Last time something was wrong in a scene, did you bring the problem or the solution?',
    body: [
      { p: 'What a director wants from you is simple to say: options, not questions. Arrive with two or three real ways the scene could go, played fully enough to judge. Now the director’s job is choosing, which is fast and pleasant, instead of inventing your performance for you, which is slow and is not their job.' },
      { p: 'When something is wrong, report it WITH a proposed fix. A costume that blocks the cross, a prop that will not open, a line that fights the blocking: fine, say so, and in the same breath say what you would do about it. A problem plus a solution is collaboration. A problem alone is a task you just assigned to a person with a hundred of them.' },
      { p: 'And learn each director’s language fast. Some speak in images, some in actions, some in results. Translating their note into your process is your work, not theirs, and the actors who translate quickly are the ones every director calls again.' },
    ] },
  { id: 'ac-pro-audition', module: 'professional', order: 6,
    title: 'The Audition Is the Job',
    requiredReviewer: 'acting-professional',
    objective: 'Treat the audition as a demonstration of what hiring you is like.',
    orientation: 'They are not only casting the role. They are casting the weeks of work that come with you.',
    reflection: 'In your last audition, what did your behavior tell them about week three of rehearsals with you?',
    body: [
      { p: 'An audition shows two things, and the scene is only one of them. The other is what you are like to work with: prepared or scrambling, off book or buried in the pages, adjustable or brittle when they throw you a change. Every behavior in that room is a free sample of every rehearsal you would ever have together.' },
      { p: 'So run the audition the way you would run the job. Fully prepared, choices made, person built. When they redirect you, and they often redirect you just to see what happens, take the note visibly and completely, because that moment is the whole interview. They may not remember your reading. They will remember whether you could change.' },
      { p: 'Then leave it in the room. The audition is the work; the booking is the weather. Actors who treat every audition as a finished performance, given freely, walk out intact either way, and walk in better next time.' },
    ] },
  { id: 'ac-pro-stageset', module: 'professional', order: 7,
    title: 'Stage and Set Are Different Countries',
    requiredReviewer: 'acting-professional',
    objective: 'Know how the job changes when the medium changes.',
    orientation: 'Same craft, different physics. Visit both like a local.',
    reflection: 'Which country are you a local in? What would the other one charge you at the border?',
    body: [
      { p: 'On stage, the performance is built by repetition and then given whole, live, hundreds of times, reaching the back row every night. The discipline is consistency: hitting the mark, the light and the laugh the same way twice a night for two months without letting it go dead.' },
      { p: 'On set, everything is inverted. The performance is assembled from takes, out of order, with the climax possibly shot before the meeting scene. The camera stands where the back row used to be, so the work that reached fifty meters now needs to reach one. The discipline is freshness in fragments: take twelve must be as alive as take one, and continuity means your coffee cup is in the same hand every time.' },
      { p: 'Neither is the senior service. An actor who can fill a house and then, the next month, do almost nothing in a close-up and have it read, is not doing two jobs. They are doing one job with the volume knob under their control, and that knob is a professional skill in itself.' },
    ] },
  { id: 'ac-pro-reputation', module: 'professional', order: 8,
    title: 'Your Reputation Is the Career',
    requiredReviewer: 'acting-professional',
    objective: 'Understand that the long game is being the person people want in the room.',
    orientation: 'Talent gets you noticed. Reputation gets you rehired.',
    reflection: 'If the stage manager from your last job were asked about you, what two words would they use?',
    body: [
      { p: 'The industry is smaller than it looks, and it talks. Directors trade names, stage managers remember everything, and casting keeps lists that never get shown to anyone. Ten years in, most work arrives because somebody in a room said the sentence: they were great, and they were easy. Both halves of that sentence are earned on every job, including the small ones. Especially the small ones.' },
      { p: 'Easy does not mean silent, and it does not mean agreeing with everything. It means prepared, on time, choice-making, note-taking, problem-solving: everything in this collection, practiced until it is just what you are like. Difficult and brilliant works for a very short list of people, and the list is shorter than the people on it think.' },
      { p: 'Here is the compounding effect nobody explains early enough: every room you are good in produces three people who will say your name in rooms you have never entered. Play the long game. The role ends. The reputation is the career.' },
    ] },
];

export const actingLessonsFor = moduleId =>
  ACTING_LESSONS.filter(l => l.module === moduleId).sort((a, b) => a.order - b.order);

export const actingLessonById = id => ACTING_LESSONS.find(l => l.id === id) ?? null;

export const actingModuleFor = l => ACTING_MODULES.find(m => m.id === l.module) ?? null;

export function actingLessonNumber(l) {
  const m = actingModuleFor(l);
  if (!m) return '';
  const within = actingLessonsFor(l.module).findIndex(x => x.id === l.id);
  return `${m.n}.${within + 1}`;
}

// ── Acting Library collections ────────────────────────────────
// The same lesson records, shelved for browsing. Approaches to Acting
// is listed separately because it is drafted in its own record file.
export const ACTING_COLLECTIONS = [
  // Same order the Learn module teaches: Being Off Book first. The shelf
  // and the pathway must not disagree about what comes first.
  { id: 'principles', icon: '🎯', title: 'Acting Principles',
    lessons: ['ac-offbook', 'ac-behavior', 'ac-circumstances', 'ac-facts', 'ac-objective',
              'ac-obstacle', 'ac-stakes', 'ac-urgency', 'ac-attention', 'ac-receiving'] },
  { id: 'scene', icon: '🔍', title: 'Text Investigation',
    lessons: ['ac-question', 'ac-who', 'ac-before', 'ac-changed', 'ac-relationships',
              'ac-beats', 'ac-subtext', 'ac-monologue', 'ac-scene'] },
  { id: 'rehearsal', icon: '🎬', title: 'Actions & Rehearsal',
    lessons: ['ac-actions', 'ac-moment', 'ac-newinfo', 'ac-repetition', 'ac-playing',
              'ac-rehearsal', 'ac-integrating', 'ac-applying', 'ac-performance'] },
  { id: 'character', icon: '🧍', title: 'Building a Character',
    lessons: ['ac-character', 'ac-hired', 'ac-analysis', 'ac-inside', 'ac-archetypes',
              'ac-room', 'ac-waysin', 'ac-noaim', 'ac-transcribe', 'ac-essence'] },
  { id: 'professional', icon: '💼', title: 'The Professional Actor',
    lessons: ['ac-pro-offbook', 'ac-pro-choices', 'ac-pro-notes', 'ac-pro-early',
              'ac-pro-director', 'ac-pro-audition', 'ac-pro-stageset', 'ac-pro-reputation'] },
  { id: 'rhythm', icon: '🎼', title: 'Tempo-Rhythm',
    lessons: ['ac-dials', 'ac-feeling', 'ac-tworhythms', 'ac-harmony', 'ac-rests',
              'ac-speeds'] },
];

// ── Acting glossary ───────────────────────────────────────────
// Terms specific to the acting work. Shared terms (objective, beat,
// action, urgency…) come from the ONE Speechcraft glossary — this map
// only adds what acting needs beyond it.
export const ACTING_GLOSSARY = {
  'subtext': { term: 'Subtext',
    def: 'The distance between what a character says and what they are pursuing or feeling underneath it. Played through pursuit, never performed directly.' },
  'stakes': { term: 'Stakes',
    def: 'What the character stands to gain or lose by the outcome of the scene. Read from the circumstances rather than inflated for effect.' },
  'moment-before': { term: 'The moment before',
    def: 'What happened immediately before the scene begins, sometimes given by the text, otherwise a deliberate choice that makes the opening concrete.' },
  'adjustment': { term: 'Adjustment',
    def: 'What a character changes because of what the other person just did. The visible sign that the pursuit is live rather than planned.' },
  'off-book': { term: 'Off book',
    def: 'Knowing the exact text securely enough that no attention is spent retrieving it. Preparation for the work, not the work itself.' },
  'facts-assumptions': { term: 'Facts, assumptions and unknowns',
    def: 'Three kinds of knowledge about a text: what it states, what the actor has supplied, and what it deliberately leaves open.' },
};
