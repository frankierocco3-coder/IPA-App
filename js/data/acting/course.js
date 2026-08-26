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
    blurb: 'Finding the person: the evidence in the text, then the people already in you.' },
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
  { id: 'ac-lists', module: 'character', order: 1,
    title: 'The Four Lists',
    requiredReviewer: 'acting-professional',
    objective: 'Gather the evidence the text gives you before you invent anything.',
    orientation: 'Everything else in this module is invention. This is the part that is not.',
    reflection: 'Which of your four lists came out shortest? What does that absence tell you?',
    body: [
      { p: 'Before you build a person you collect what the play already states. Five read-throughs and four inventories: the facts the text gives outright, what your character says about themselves, what they say about everyone else, and what everyone else says about them. The first reading has no pen in it at all.' },
      { p: 'The lists are evidence rather than biography, and the useful part is where they disagree. A character whose account of themselves contradicts the stated facts, or whose reputation contradicts their own account, has handed you the argument the play is having about them.' },
      { p: 'The rest of this module works the other way round, outward from you rather than inward from the text. The two need each other. The lists keep the invention honest, and the invention keeps the lists from sitting inert on the page.' },
    ] },
  { id: 'ac-inside', module: 'character', order: 2,
    title: 'Looking Inside, Not Out',
    requiredReviewer: 'acting-professional',
    objective: 'Start from the people already in you rather than hunting for characters in the world.',
    orientation: 'Observation is usually taught as looking outward. This module looks the other way.',
    reflection: 'Who has spoken up in you before, unprompted? A voice you fall into, a person you can do without preparing.',
    body: [
      { p: 'You are already carrying a cast. Improvise aloud with no text and no plan, doing a voice for the sake of doing it, and listen back afterwards. What comes out is often a monologue you did not intend, spoken by someone who was waiting for the chance. Do this enough times and the recordings sort themselves into distinct people, none of whom you found by going out and looking.' },
      { p: 'It works because you have been collecting people your whole life, and not only the ones you have met. Playing a soldier, you draw on remembered performances of soldiers as readily as on anything you have lived through, and the part of you that generates behavior does not sort them into borrowed and real. The available cast is far larger than your acquaintance.' },
      { p: 'Do not treat a character as a fixed object to be completed. They behave more like clouds of behavior and attitude that shade into one another, and the work is experimenting until one of them starts breathing on its own. The aim is not a finished description. It is a person with enough force to be worth watching.' },
    ] },
  { id: 'ac-room', module: 'character', order: 3,
    title: 'The Empty Room',
    requiredReviewer: 'acting-professional',
    objective: 'Set up conditions in which you can improvise without watching yourself.',
    orientation: 'What this needs is not talent. It is a room where nobody can hear you.',
    reflection: 'Where and when could you do this without being overheard? Name the room and the hour.',
    body: [
      { p: 'The setup is deliberately plain. A recorder, a room where you are genuinely alone and cannot be overheard, and enough space to move around in. Note the date and what you are working on, start recording, and begin.' },
      { p: 'Privacy is a working condition rather than a preference. Self-consciousness ruins this kind of work. If any part of you is managing how it sounds to someone else you are editing rather than finding, and the thing you were about to say will not arrive.' },
      { p: 'Record everything, and keep it. This method was built on cassette tape, where the reel ran out and every one you kept was one you had to store, so you were forced to decide what mattered while you were still making it. That constraint is gone. A phone will hold more hours than you are ever going to record, which means you can stop judging at the moment of creation and leave that job to later, where it belongs.' },
      { p: 'Speechcraft cannot do this part for you. This app does not record and does not listen. Use your own phone, a room with the door shut, and half an hour that nobody needs you for. What comes back here afterwards is whatever you decide to keep.' },
    ] },
  { id: 'ac-waysin', module: 'character', order: 4,
    title: 'Three Ways In',
    requiredReviewer: 'acting-professional',
    objective: 'Start an improvisation from a fragment, a physical detail or a vocal stance.',
    orientation: 'You do not need a character before you begin. You need one small piece of one.',
    reflection: 'Write down three fragments of speech you have overheard this week. Which of them has a person standing behind it?',
    body: [
      { p: 'The first way in is an overheard fragment. Collect scraps of real speech as you go through the week, then begin by repeating one until it summons an attitude. A single word will often carry a whole person: one repeated “sir” can build an entire officious clerk before you have decided anything else about him.' },
      { p: 'The second is a physical detail. The way someone lights a cigarette, how they hold a bottle, how an old man crosses a room. One gesture, worked honestly, tends to bring the rest of the body along with it.' },
      { p: 'The third is the most powerful, and it is a vocal stance. Not mimicry, which stays hollow, but letting a vocal posture shape the improvisation from inside. Recite something you know by heart in a voice nothing like your own and listen to what happens to the words.' },
      { p: 'There is a fourth entry point as well: any situation where a person is already performing. A teacher in front of a class, a preacher, a gym instructor, someone shouting in the street.' },
    ] },
  { id: 'ac-noaim', module: 'character', order: 5,
    title: 'Do Not Aim',
    requiredReviewer: 'acting-professional',
    objective: 'Improvise without steering toward a result.',
    orientation: 'The usual way this fails is trying to make it good while it is still happening.',
    reflection: 'Play back something you improvised. Where can you hear yourself trying to make it good?',
    body: [
      { p: 'Aim at nothing in particular. Not funny, not moving, not clever. Become the person, get into the situation, and find out what happens from there. The whole goal while improvising is to play, cut loose, and let the character speak.' },
      { p: 'This is not the moment to think about the finished piece. Whether the character is articulate does not matter yet, and neither does whether any of it will be usable. Judging while you generate stops the generating, and generating is the only thing this stage is for.' },
      { p: 'Expect most of it to be waste, and throw everything at the wall to find out what sticks. A finished monologue of around three minutes comes out of hours of improvising. That ratio is the method working as designed rather than a sign of failure, and knowing it beforehand is what lets you keep going through the first bad stretch.' },
    ] },
  { id: 'ac-transcribe', module: 'character', order: 6,
    title: 'Listen, Transcribe, Go Again',
    requiredReviewer: 'acting-professional',
    objective: 'Turn raw improvisation into material through a loop you repeat.',
    orientation: 'You are not making a piece yet. You are producing dirt to sift.',
    reflection: 'Take your oldest transcription. Read it now. Is there someone in it you did not notice at the time?',
    body: [
      { p: 'Review what you recorded and find the parts you like the sound of. Not the parts with the best ideas, the parts that sound like someone. This is sifting, and the ratio is supposed to be poor: you accumulate a great deal of dirt in order to find a little gold. Transcribe whatever you find, keep the transcriptions, and return to them later, because a fragment that reads as nothing in March can start a person in September.' },
      { p: 'Then clean what you found. A fragment that survives the sift still has dirt on it, and working it over is what turns a lucky moment into something you can use twice. Once it is clean you put it in your pocket and go back for the next batch: learn the fragment, use it as the launching point for the next improvisation, and start sifting again with what you already have on you. The material gets denser with each pass rather than longer.' },
      { p: 'The clearer and more consistent a piece becomes, the easier it is to memorize and perform, which means trouble holding a piece is usually evidence that it is not finished yet.' },
      { p: 'Once something is written down, start asking the plain questions the improvising skipped. What was this person doing ten minutes ago. What are they wearing and carrying. How old are they, and what does that do to the voice and the posture. Are we indoors or out, and is it warm or cold. These are ordinary questions, and their value is in jogging the imagination rather than in the answers themselves.' },
    ] },
  { id: 'ac-essence', module: 'character', order: 7,
    title: 'The Person, Not the Props',
    requiredReviewer: 'acting-professional',
    objective: 'Keep the character active and legible without decorating them.',
    orientation: 'A costume and a mimed steering wheel are two ways of hiding a character who is not there.',
    reflection: 'Watch your character with the sound turned off in your head. Is there anything to see?',
    body: [
      { p: 'Keep them active: standing, moving, engaged. Avoid mime and costume, because both pull an audience toward assessing the imitation instead of watching the person. What you are after is whoever is underneath, not the props that announce them.' },
      { p: 'Here is a test for whether it is working. Imagine performing to an audience who do not speak the character’s language. Would they still find it worth watching? If the answer depends on the words being understood, the character is not yet doing enough on their own.' },
      { p: 'Two more things worth carrying out of this. Play against expectation, because a character who says the opposite of what is expected is more alive than one delivering your opinion for you. And give the worst person in the piece their own side of the story. One final test covers all of it: put on stage what you would most want to see if you were the one sitting in the audience.' },
    ] },

  // ── Module 5 · Tempo-Rhythm ─────────────────────
  { id: 'ac-dials', module: 'rhythm', order: 1,
    title: 'Two Dials, Not One',
    requiredReviewer: 'acting-professional',
    objective: 'Separate tempo from rhythm, and know which of the two is wrong.',
    orientation: 'Most actors have one word for speed and use it to describe two different things. Pulling them apart gives you two controls where you had one.',
    reflection: 'Take a speech you know well. Is the problem its speed, or the pattern inside the speed?',
    body: [
      { p: 'Tempo is how fast. Rhythm is the pattern of long and short, stressed and unstressed, that fills the time the tempo gives you. They move independently. You can be fast and even, fast and jagged, slow and steady, or slow and broken. Four different states, from two dials.' },
      { p: 'This matters because the repairs are different. If the tempo is wrong you change the speed. If the rhythm is wrong, changing the speed simply carries the same wrong pattern along at a new rate. A note that a scene is dragging is usually a rhythm problem described as a tempo problem, which is why going faster so often fails to fix it.' },
      { p: 'There are three ways actors go wrong here, and they are worth recognizing in yourself. Some are rhythmic in the body and arhythmic in speech, or the reverse. Some carry one tempo-rhythm into every role, so that the same actor is recognizably the same person in each part. And some deliver metre with great precision and nothing underneath it.' },
    ] },
  { id: 'ac-feeling', module: 'rhythm', order: 2,
    title: 'Rhythm Reaches Feeling',
    requiredReviewer: 'acting-professional',
    objective: 'Use tempo-rhythm as a way into feeling, and know why it fails without circumstances.',
    orientation: 'Feeling cannot be instructed. Speed can. That gap is the whole usefulness of this idea.',
    reflection: 'What circumstance would make your character move at the speed you have given them?',
    body: [
      { p: 'There are three ways into an actor. The mind is reached through the text, the will through the objective, and the feelings through tempo-rhythm. The first two are familiar. The third is the useful one, because feeling is the part that refuses to be commanded. You cannot tell yourself to dread something. You can set a rhythm and let the dread arrive behind it.' },
      { p: 'It fails in the abstract. A rhythm with nothing behind it is drumming, and it produces nothing that lasts past the exercise. It needs circumstances and images to sit on. Once they are there the two feed each other: the situation suggests the rhythm, and the rhythm suggests more of the situation than you had thought of.' },
      { p: 'Speed alone never describes a moment. A military march, a walk home and a funeral procession can all move at the same tempo and have nothing else in common. Whenever a rhythm feels arbitrary, the missing piece is almost always the circumstance that would make it inevitable.' },
    ] },
  { id: 'ac-tworhythms', module: 'rhythm', order: 3,
    title: 'Two Rhythms at Once',
    requiredReviewer: 'acting-professional',
    objective: 'Mark an inner and an outer tempo-rhythm on the same speech, and play the distance between them.',
    orientation: 'A person concealing something is running two rhythms at once. The gap between them is what an audience actually reads.',
    reflection: 'Where in your script is your character calmer on the outside than on the inside?',
    body: [
      { p: 'Your inner tempo-rhythm and your outer one do not have to match, and much of the time they should not. Someone waiting for news they dread sits very still. Someone lying speaks evenly. Someone grieving at a formal occasion behaves correctly throughout. In each case the outside is quiet and the inside is not, and the performance lives in the distance between them.' },
      { p: 'The two also feed each other. The harder the effort to keep the outside steady, the faster the inside tends to run, which makes the outside harder to hold. That is a loop you can play rather than a contradiction you have to resolve.' },
      { p: 'The same doubling happens inside a single mind. Hamlet is the standing example, where resolve and doubt run at different speeds at the same time. When a scene feels flat and everything else is right, it is often because you have given the character one rhythm where the situation is asking for two.' },
    ] },
  { id: 'ac-harmony', module: 'rhythm', order: 4,
    title: 'Harmony, Not Unison',
    requiredReviewer: 'acting-professional',
    objective: 'Hear a scene as separate rhythms sounding together rather than one rhythm shared.',
    orientation: 'Two people in the same rhythm are singing in unison. That is an effect, and it is almost never what a scene wants.',
    reflection: 'In this scene, are you in harmony with the other character or in unison with them? If it is unison, did you choose it?',
    body: [
      { p: 'Everyone carries their own tempo-rhythm, on stage as in life. When a group genuinely shares one, that is unison: a single line, doubled. Soldiers in formation have it, a chorus has it, and a crowd seized by one urge has it, and in each case the sameness is the point. Ordinary scenes are not built that way. They are harmony, which means separate lines sounding at the same time.' },
      { p: 'A chord needs different notes. Two players on the same note are not making a chord, they are making that note louder. What an audience receives between two characters is the interval between their rhythms, and no single actor plays that interval. You hold your own line. The harmony is what happens in the space between yours and theirs, and it is not something either of you can perform alone.' },
      { p: 'Some intervals sit comfortably and some grate, and both are music. A scene where two rhythms refuse to settle is not a scene going wrong. And when two lines do resolve into one, that resolution lands precisely because they were apart before it. The failure to watch for is unison arrived at by accident: a scene rehearsed until everyone has quietly agreed on a pace. It will sound tidy and it will not sound like people.' },
    ] },
  { id: 'ac-rests', module: 'rhythm', order: 5,
    title: 'Notes and Rests',
    requiredReviewer: 'acting-professional',
    objective: 'Treat pauses as part of the rhythm rather than gaps in it.',
    orientation: 'Sounds and syllables are the notes. Pauses are the rests. A rest is written into the music; it is not an absence of music.',
    reflection: 'Which of your pauses are carrying something, and which are just waiting?',
    body: [
      { p: 'Speech divides time. Sounds, syllables and words fill some of it and pauses fill the rest, and both carry the rhythm. Some sounds are clipped and some are weighty; some syllables take a strong stress, some a weak one, some none at all. Out of those few materials every rhythm in speech is built.' },
      { p: 'The common failure is the dead pause: a silence that drops the rhythm completely, so that both the actor and the audience lose the thread and have to be gathered up again when the words return. The repair is to keep a silent count running underneath the pause. The rhythm continues; only the sound stops.' },
      { p: 'That same count is what carries you between phrases of different rhythm. Prose does not scan, and its tempo-rhythm is mixed by nature: one phrase long, the next short, each with a pattern of its own. Rather than forcing them into one measure, keep the count going across the join and let it bridge them.' },
    ] },
  { id: 'ac-speeds', module: 'rhythm', order: 6,
    title: 'The Two Missing Speeds',
    requiredReviewer: 'acting-professional',
    objective: 'Build sustained slow speech and genuine patter, the two speeds most actors do not have.',
    orientation: 'Most speech on a stage is neither slow nor fast. It is long pauses with the words hurried out between them.',
    reflection: 'Can you say your hardest line at half speed without it going dead, and at double speed without it going to mush?',
    body: [
      { p: 'Real slowness is hard because slow tends to go dead. The words separate, the line stops and restarts, and the audience feels the machinery. What keeps a slow line alive is sound rather than silence: the vowels sustain, and the line keeps sounding through its whole length instead of being broken into pieces with gaps between them.' },
      { p: 'Real speed is a different discipline, and it is not rushing. Patter is built out of exaggerated slowness. You take the passage far slower than it will ever be played, with every consonant fully finished, and repeat it until your mouth knows the words without you. Only then do you accelerate. Speed reached any other way turns to mush, and the audience stops receiving the words at exactly the moment you most want them to.' },
      { p: 'Both speeds have to stay motivated. A slow line that is slow for no reason is portentous, and a fast one that is fast for no reason is a trick. The circumstance comes first, as it always does here, and the speed follows it.' },
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
    lessons: ['ac-lists', 'ac-inside', 'ac-room', 'ac-waysin', 'ac-noaim',
              'ac-transcribe', 'ac-essence'] },
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
