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
  { n: 4, id: 'performance', title: 'Preparing the Performance',
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
