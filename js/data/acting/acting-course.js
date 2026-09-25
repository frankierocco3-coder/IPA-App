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
  // Renamed from Investigating the Text (owner order, 2026-09-24): the
  // blurb had called it "the script-analysis course" since it was
  // written, and the module now also teaches how to RECORD the analysis
  // on the page, not only how to do it. The id stays 'text' — ids are
  // never renamed here, which is what keeps stored progress intact.
  { n: 2, id: 'text', title: 'Script Analysis',
    blurb: 'What a scene actually gives you — facts, relationship, turns, subtext, action — and how to get it onto the page.' },
  { n: 3, id: 'listening', title: 'Listening and Responding',
    blurb: 'The scene-partner work: the live half of acting, receiving the other person before you answer them.' },
  // Tempo-Rhythm was inserted here (owner order, 2026-08-26); Building a
  // Character sat beside it until 2026-09-23, when the whole module moved
  // to the Building a Character course. Its lessons kept their ids, so
  // nothing stored on a device broke. Preparing the Performance has moved
  // 4 -> 6 -> 5 across those two changes, again without touching ids.
  { n: 4, id: 'rhythm', title: 'Tempo-Rhythm',
    blurb: 'How a character moves through time, in speech and in silence.' },
  { n: 5, id: 'performance', title: 'Preparing the Performance',
    blurb: 'The rehearsal-and-production course: monologue and scene work, and carrying it all into the room.' },
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

  { id: 'ac-objective', module: 'work', order: 4,
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

  { id: 'ac-obstacle', module: 'work', order: 5,
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

  { id: 'ac-stakes', module: 'work', order: 6,
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

  { id: 'ac-urgency', module: 'work', order: 7,
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
      { p: 'One warning before you trust a clean run: feeling fluent and knowing the lines are two different measurements, and the first one lies. The Library’s Lines & Memory lesson shows why, and how to test which one you actually have.' },
    ],
    doorway: { id: 'lines-memory', label: 'Lines & Memory' } },

  // ── Module 2 · Script Analysis ────────────────────────────────
  { id: 'ac-fourlists', module: 'text', order: 0,
    title: 'The Four Lists',
    requiredReviewer: 'acting-professional',
    objective: 'Gather the evidence the text gives you before you invent anything.',
    orientation: 'Investigation starts with collection. These are the four things to collect.',
    body: [
      { p: 'Before you interpret a word, collect what the play already states. Five read-throughs and four inventories: the facts the text gives outright, what your character says about themselves, what they say about everyone else, and what everyone else says about them. The first reading has no pen in it at all.' },
      { p: 'The lists are evidence rather than biography, and the useful part is where they disagree. A character whose account of themselves contradicts the stated facts, or whose reputation contradicts their own account, has handed you the argument the play is having about them.' },
      { p: 'Everything else in Script Analysis digs into what you collect here, and Question Everything, next, is the interrogation the lists get. To work the lists on your own script, open The Four Lists from the Library shelf: they save with that project.' },
    ],
    reflection: 'Which of your four lists came out shortest? What does that absence tell you?' },
  { id: 'ac-question', module: 'text', order: 4,
    title: 'Question Everything',
    requiredReviewer: 'acting-professional',
    sharedNote: 'Question Everything is one shared framework. The complete textbook lives in the Studio; this lesson introduces its use on a scene.',
    sharedFrom: { workspace: 'studio', id: 'question-everything', label: 'Question Everything (textbook)' },
    objective: 'Use a systematic set of questions instead of a first impression.',
    orientation: 'The questions are not a quiz. They are a way of refusing to settle too early.',
    reflection: 'Which question about your scene are you avoiding because you do not like the answer?',
    body: [
      { p: 'A script gives you the words. Question Everything helps you discover what is happening underneath them, systematically, so the investigation does not stop at whatever occurred to you first.' },
      { p: 'A taste of the list, straight from the textbook. What is happening? When is this happening? Who am I speaking to? What is our relationship? What has just happened? Why am I speaking now? What is at stake? What do I want from the other person? What do I want them to feel? What do I want them to admit? Six sections of questions like these, and none of them settles for a first impression.' },
    ] },

  // ── Module 3 · Listening and Responding ───────────────────────
  { id: 'ac-attention', module: 'listening', order: 1,
    partnerWork: true,
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
    partnerWork: true,
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
    partnerWork: true,
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
    partnerWork: true,
    title: 'Let the Information Affect You',
    requiredReviewer: 'acting-professional',
    objective: 'Let what you learn in the scene change what you do next.',
    orientation: 'Characters who learn nothing produce scenes that go nowhere.',
    reflection: 'What does your character learn in this scene, and at exactly which line?',
    body: [
      { p: 'Scenes deliver information: a confession, a refusal, a fact the character did not have. The question is whether it lands. An actor who already knows the whole play can quietly stop being surprised by it.' },
      { p: 'Find the exact line where each piece of new information arrives, and let it cost something. The adjustment that follows, a change of tactic, a pause, a retreat, is often the most alive moment in the scene.' },
    ] },

  { id: 'ac-repetition', module: 'listening', order: 5,
    partnerWork: true,
    title: 'Repetition',
    requiredReviewer: 'acting-professional',
    objective: 'Repeat the work without freezing it.',
    orientation: 'Rehearsal repeats the situation, not the reading.',
    reflection: 'What stayed identical in your last two run-throughs that did not need to?',
    body: [
      { p: 'Repetition is how the work becomes reliable. It is also how a scene dies, if what is repeated is a performance rather than a pursuit. The difference is what you are repeating: the circumstances, the objective and the listening, or a remembered set of line-readings.' },
      { p: 'A practical test: if a run-through would be unchanged had your partner done something different, the scene has been fixed rather than rehearsed.' },
    ] },

  { id: 'ac-playing', module: 'listening', order: 6,
    partnerWork: true,
    title: 'Play the Objective, Not the Emotion',
    requiredReviewer: 'acting-professional',
    objective: 'Pursue something, and let feeling arrive as a consequence.',
    orientation: 'Displayed emotion is a report. Pursuit is an event.',
    reflection: 'Where are you showing a feeling instead of trying to get something?',
    body: [
      { p: 'Emotion cannot be played directly with any reliability; attempts to produce it on command usually produce its indication instead. What can be played is a pursuit under real resistance, and feeling tends to arrive on its own when the pursuit matters.' },
      { p: 'This course takes no position on which of the many approaches to emotional life an actor should adopt; the Approaches to Acting introductions in the Library describe several. What it does insist on is that “be sad” is not a playable instruction, while “get her to stay” is.' },
    ] },

  // ── Module 4 · Preparing the Performance ──────────────────────
  // Playable Actions left Script Analysis on 2026-09-25 with the eight
  // lessons retired around it, but it was ALSO on the Actions &
  // Rehearsal shelf, so retiring it would have emptied a shelf the
  // owner did not ask about. It moved here instead, keeping its id.
  { id: 'ac-actions', module: 'performance', order: 0,
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
    partnerWork: true,
    title: 'Scene Work',
    requiredReviewer: 'acting-professional',
    objective: 'Bring the whole investigation into two-person work.',
    orientation: 'Scene work is where preparation meets someone else’s preparation.',
    reflection: 'What does your partner want, and how does it collide with what you want?',
    body: [
      { p: 'Everything prepared alone gets tested here: your reading of the circumstances, your objective, your actions. Some of it will not survive contact with the other actor’s choices, and that is the process working, not failing.' },
      { p: 'Two disciplines matter most: know what YOU want, and genuinely watch what THEY do. A scene in which both actors manage this rarely needs much else.' },
    ] },


  { id: 'ac-twohander', module: 'performance', order: 3,
    partnerWork: true,
    title: 'Working the Two-Hander',
    requiredReviewer: 'acting-professional',
    objective: 'Rehearse a two-person scene honestly when the other actor is not in the room.',
    orientation: 'Most of your rehearsal life happens alone. The danger is not wasted time; it is learning habits a partner will have to break.',
    reflection: 'Which of your current choices exist only because nobody was there to resist them?',
    glossary: ['off-book'],
    body: [
      { p: 'A scene is built out of what two people do to each other, and most of your preparation happens with the other person absent. That is not a defect of the profession; it is the profession. The skill is knowing what alone-time is for, and what it quietly ruins when it is misused.' },
      { p: 'What it ruins, when it goes wrong, is listening. Run a scene by yourself often enough and you will set melodies: a fixed reading for every line, timed against cues you deliver to yourself in your head. A partner then becomes an interruption to a performance you have already given. Actors call this being married to a reading, and it is built, line by line, in solitary rehearsal.' },
      { h: 'What alone-time is for' },
      { list: [
        'The whole of Script Analysis: facts, relationships, the objective, the beats. Evidence work needs no partner.',
        'Getting off book, including the other role: know their lines nearly as well as yours, because their thought, not their last three words, is your cue.',
        'Choosing what you are DOING in each beat, in playable verbs. What you do can be decided alone; how it will sound cannot.',
        'Reading the other part aloud once, plainly, to learn what it is doing to you. Their speeches are the circumstances of yours.',
      ] },
      { p: 'Give the absent partner a body. A chair, a mark on the wall, an object at eye height: something specific to speak to, at a real distance, so your eyes and voice learn to land on a person instead of drifting into the middle distance. The Using the Fourth Wall chapter builds the same muscle for the audience side of the room.' },
      { p: 'Protect yourself from your own readings. When you speak the text aloud alone, vary the pursuit on purpose: run a speech as three different actions, raise the stakes, change the urgency. The point is not to find the best version; it is to keep any version from hardening. The Action Swap and Same Line Three Ways exercises in Practice are built for exactly this, and every scene on the Scenes shelf works in them.' },
      { h: 'When the partner arrives' },
      { p: 'Everything you decided alone is a hypothesis. The first pass together is for listening, not for showing your homework: expect real contact to kill half of your prepared choices, and let it. The preparation was not wasted; it is what lets you notice what the other actor is actually doing, instead of clinging to what you expected.' },
    ] },

  { id: 'ac-rehearsal', module: 'performance', order: 4,
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

  { id: 'ac-integrating', module: 'performance', order: 5,
    title: 'Putting It Together',
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

  { id: 'ac-applying', module: 'performance', order: 6,
    partnerWork: true,
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

  { id: 'ac-fourthwall', module: 'performance', order: 7,
    title: 'Using the Fourth Wall',
    requiredReviewer: 'acting-professional',
    objective: 'Treat the open side of the stage as part of the character’s world, with real places to look and real distances to focus.',
    orientation: 'The fourth wall is not there to be broken. On most nights it is there to be used.',
    reflection: 'Take a scene you know that happens indoors. What is on the fourth wall, exactly where, and how far away?',
    body: [
      { p: 'A realistic set has three walls. The fourth one, the one that would complete the room, is missing, and the audience sits where it belongs. The convention says: for the character, the wall is still there. The room is whole. The character can lean near it, glance at it, stare out of a window in it, and never once notice the several hundred people breathing where the wallpaper should be.' },
      { fig: 'fourth-wall-theatre' },
      { fig: 'fourth-wall-house' },
      { p: 'This chapter is not about breaking that wall. Direct address, the aside, the confidant speech to the house: those are real tools, and some plays are built on them, but they are a different subject. This is the ordinary night in a realistic play, where the wall stays up and the actor has to live behind it. Used well, the fourth wall is not a limitation to be coped with. It is a quarter of the character’s world that happens to be invisible, and it is yours to furnish.' },
      { h: 'Build the wall before you need it' },
      { p: 'A wall you have not built is a wall you cannot use, and the failure is visible. Eyes with nowhere to land drift across the house, focus on nothing, or lock politely into the middle distance, and every one of those reads from the back row. So build it in rehearsal, as deliberately as the designer built the other three. Decide what is on it and where. Then keep it there, every run, every night.' },
      { list: [
        'A window, and, more important, what the character sees through it.',
        'Something at eye level with a history: a mirror, a photograph, a clock the character has looked at ten thousand times.',
        'Something small and specific: a stain, a crack, a nail where a picture used to hang.',
        'The agreed geography: if there is a window, everyone in the company looks through it in the same place.',
      ] },
      { p: 'Specificity is the whole trick. “The wall” gives your attention nothing to do. “The damp patch above the light switch that has been spreading all winter” gives it a job, and attention with a job is what an audience reads as belief.' },
      { h: 'The eyes give it away' },
      { p: 'The difference between a real fourth wall and a faked one is focus. Eyes focused twenty feet out, on actual faces in the fifth row, look like exactly what they are. A view through a window is focused far beyond the back wall of the theatre. A mirror is focused at roughly twice your distance from the glass, because that is where the reflection lives. A clock is focused at ten feet. Give every object on your wall its distance, and let your eyes do what eyes do at that distance. Get this right and the audience believes the object without being told. Let your focus land on the house instead, and the wall comes down without a word being spoken.' },
      { h: 'Private in public' },
      { p: 'What the wall finally buys is privacy. A character alone on stage is supposed to be genuinely alone: thinking, deciding, doing the unguarded things people only do when nobody is watching, while several hundred people watch. That is only possible when your attention has somewhere to live inside the world of the play. The window, the mirror, the photograph: these are not decoration, they are where a private person’s attention actually goes. The moment some part of you checks the audience instead, the privacy is gone, and the audience feels the difference before they could name it.' },
      { h: 'What using it buys you' },
      { list: [
        'Cheating out stops being a stage direction and starts having a reason: the interesting thing is out there.',
        'Blocking opens up, because the downstage quarter of the room is playable space instead of a cliff edge.',
        'Solo scenes have somewhere to happen: business at the mirror, a watch kept at the window, a letter read in the best light in the room.',
        'The beginner tells disappear: the dead middle-distance stare, the eyes scanning the exit signs, the guilty flick down to the front row.',
      ] },
      { p: 'One classic rehearsal problem makes a useful private drill: do something real in an imaginary mirror hanging in the middle of the audience. Fix your hair. Check your collar. Practice until your focus sits at the reflection’s distance and the task is genuinely absorbing. An observer should be able to tell where the mirror hangs, and they should never once catch your eye.' },
      { p: 'None of this seals you off from the house. The audience still gets your voice, your face and most of your body precisely because the missing wall is missing. The convention is a trade: the theatre removes a wall so they can see in, and you rebuild it in imagination so there is something worth seeing.' },
    ] },

  { id: 'ac-performance', module: 'performance', order: 8,
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
  { id: 'ac-analysis', module: 'text', order: 1,
    title: 'Through Analysis',
    requiredReviewer: 'acting-professional',
    objective: 'Build a character from what the text gives you: the world, the facts, and what everyone says.',
    orientation: 'This road starts at the desk. You read your way to the person.',
    reflection: 'Take a character you know. What is the single fact of their world that shaped them most before the play began?',
    body: [
      { p: 'The analysis road works like detective work. You read the whole play, more than once, and you collect what it actually states: the world this person lives in, what they do for a living, who they answer to, what they want out loud and what they seem to want underneath. You gather what they say about themselves, what they say about everyone else, and what everyone else says about them. Then you look for the places where those accounts disagree, because the disagreements are where the person is hiding.' },
      { p: 'You already own the tools for this road. Script Analysis is the module that does exactly this work: facts, relationships, beats, subtext, playable actions. The Four Lists in the Library turns the reading into four concrete inventories on your own script. This lesson is not here to repeat them. It is here to point them at a new target.' },
      { p: 'Because here is the shift: those tools are usually aimed at understanding a scene. Aim them at building a person instead. The world of the play tells you what shaped this character before page one. The facts tell you what they cannot escape. The gap between what they claim and what others report tells you what they are hiding, and a person is mostly made of what they are hiding. Analysis done this way does not end in notes. It ends in somebody.' },
      { p: 'And when it does, do not stop there. Take that somebody to the other road. Carry everything the desk gave you into an empty room and let the person improvise, and watch the research turn into behavior. Or if you came here from the feeling road, run your discovered character through these tools and find out whether they can survive the facts of the play. Either order works. No right answers. The character is finished where the two roads meet.' },
    ] },

  { id: 'ac-markup', module: 'text', order: 2,
    title: 'Marking Up the Script',
    requiredReviewer: 'acting-professional',
    objective: 'Get the analysis onto the page in marks you can read at speed.',
    orientation: 'Analysis you cannot find again during a run-through is analysis you did not do.',
    reflection: 'Open a script you know. Mark one page for beats only, nothing else. What did you have to decide that you had been avoiding?',
    body: [
      { p: 'Everything in this module happens at a desk, and almost none of it survives the walk into the rehearsal room unless you write it down. A decision you made on Tuesday about where a beat turns is worth nothing on Thursday if you cannot see it on the page in front of you. Marking up is not tidiness. It is the difference between having analysed the scene and being able to use the analysis while somebody is talking to you.' },
      { p: 'There is no standard notation. No two actors mark alike, no school agrees, and nobody is coming to check. What follows is not a system to adopt. It is the small set of marks that keep turning up, and what each one is for.' },

      { h: 'Beats, and what you are doing in them' },
      { p: 'The most common mark in the world is a line across the page where a beat turns, with the action written beside it. That is two decisions recorded in about four seconds: here is where the scene changes, and here is what I am doing until it changes again.' },
      { markup: {
          caption: 'Beats and actions — Macbeth, Act I, Scene 7',
          rows: [
            { beat: 'Beat 1 · The refusal', action: 'to close the subject' },
            { who: 'MACBETH.', text: 'We will proceed |no further| in this business:' },
            { text: 'He hath |honour’d| me of late; and I have bought' },
            { text: '|Golden opinions| from all sorts of people,', side: 'the reason he gives is not the reason he has' },
            { text: 'Which would be worn now in their newest gloss,' },
            { text: 'Not cast aside so soon. //' },
            { beat: 'Beat 2 · The interrogation', action: 'to shame him into it' },
            { who: 'LADY M.', text: 'Was the hope |drunk|' },
            { text: 'Wherein you dress’d yourself? Hath it slept since?', side: '5 questions, no statements' },
            { text: 'And wakes it now, to look so green and pale' },
            { text: 'At what it did so freely? From this time' },
            { text: 'Such I account thy love. Art thou |afeard|' },
          ],
          key: [
            '|word| — the word the line turns on',
            '// — a breath, or a pause you are choosing to take',
            'the line across — a beat change',
            'the margin — the action, and anything you noticed once and will forget',
          ],
          note: 'Two marks and a margin. That is the whole page. A page carrying five kinds of mark is a page you will stop reading.',
      } },
      { p: 'Notice where the beat line falls. It lands mid-speech, because a beat is not a paragraph and it does not wait for somebody to stop talking. Where you draw it is a choice, and two actors will draw it in different places on the same scene. The value is not in getting it right. It is in having had to decide.' },

      { h: 'Operative words' },
      { p: 'Underlining the word a line turns on is the oldest mark there is, and the most abused. Underline one word in a line and you have made a decision. Underline four and you have made none, because a line where everything is stressed sounds exactly like a line where nothing is.' },
      { p: 'The test is subtraction. Say the line, leave the marked word out, and see whether the sense survives. If it does, you have marked the wrong word.' },

      { h: 'Cuts, and marks you can undo' },
      { p: 'Mark a cut so that you can still read what is under it. A line through the words keeps the option open; scribbling them out closes it, and cuts get restored more often than anyone expects.' },
      { markup: {
          caption: 'A cut and a pickup',
          rows: [
            { who: 'BENVOLIO.', text: 'Go then; for ’tis in vain' },
            { text: '~To seek him here that means not to be found.~', side: 'cut 12 Oct — restored 19 Oct' },
            { who: 'ROMEO.', text: 'He jests at scars that never felt a wound. //' },
          ],
          key: ['~word~ — cut, still readable'],
      } },

      { h: 'The margin' },
      { p: 'The margin is where everything goes that is not a mark: a fact you had to look up, a question you cannot answer yet, the thing you noticed on the fourth read and will certainly have lost by the sixth. Date the notes that are decisions. In a long rehearsal you will want to know whether a note is from before or after the director changed something.' },
      { p: 'One rule holds across every system anyone uses: a mark you cannot read at speed is worse than no mark, because it stops you. If you have to work out what your own page means, the page has become another thing to act around.' },
    ] },

  { id: 'ac-ownmarks', module: 'text', order: 3,
    title: 'Finding Your Own Marks',
    requiredReviewer: 'acting-professional',
    objective: 'Build a marking system you will actually keep using, from what you keep needing.',
    orientation: 'The right system is the one that survives a week of rehearsal without being abandoned.',
    reflection: 'Think back to the last thing you performed. What did you keep forgetting? That is the thing your system has to hold.',
    body: [
      { p: 'Actors who have been doing this a long time mark very differently from one another, and the differences are not arbitrary. They come from what each person keeps losing. Somebody who forgets why they are in the room writes objectives at the top of every page. Somebody who rushes marks breath and nothing else. Somebody who goes up on lines marks only the cue words. The system is a record of a weakness, which is why copying someone else’s rarely holds.' },

      { h: 'Four shapes that recur' },
      { p: 'None of these is better than the others. They suit different weaknesses, and most working actors end up with a mix.' },
      { list: [
        'Objective-first. The action for each beat goes at the top of the page in capitals, and the page carries almost nothing else. Suits an actor who plays intention well but drifts from it.',
        'Breath-first. Only breath and pause are marked. Suits long speeches, verse, and anyone whose problem is pace rather than meaning.',
        'Partner-first. The marks are all on the OTHER character’s lines: what they do to you, where they change. Suits an actor who prepares their own half thoroughly and then does not listen.',
        'Bare. A clean script and a separate notebook. Suits an actor who needs the page uncluttered to stay free, and who will genuinely open the notebook.',
      ] },

      { h: 'Two pages, two actors, one scene' },
      { p: 'The same eight lines, marked by somebody working from objectives and by somebody working from breath. Neither page is wrong. They are solving different problems.' },
      { markup: {
          caption: 'Objective-first',
          rows: [
            { beat: 'TO MAKE HER SAY IT', action: '' },
            { who: 'BENEDICK.', text: 'I do love nothing in the world so well as you: is not that |strange|?', side: 'the question is the retreat' },
            { who: 'BEATRICE.', text: 'As strange as the thing I know not.' },
            { beat: 'TO GET OUT OF IT WITHOUT LYING', action: '' },
            { text: 'It were as possible for me to say I loved nothing so well as you;' },
            { text: 'but believe me not, and yet I lie not;' },
            { text: 'I confess nothing, nor I |deny| nothing. I am sorry for my cousin.', side: 'she never actually says it' },
          ],
      } },
      { markup: {
          caption: 'Breath-first — the same lines',
          rows: [
            { who: 'BENEDICK.', text: 'I do love nothing in the world so well as you: // is not that strange?' },
            { who: 'BEATRICE.', text: 'As strange as the thing I know not. //' },
            { text: 'It were as possible for me to say I loved nothing so well as you; //' },
            { text: 'but believe me not, // and yet I lie not; //' },
            { text: 'I confess nothing, // nor I deny nothing. // I am sorry for my cousin.' },
          ],
          note: 'The second page says nothing about meaning and everything about where this woman runs out of air. Read it aloud and the evasion is audible without a single note explaining it.',
      } },

      { h: 'Building yours' },
      { steps: [
        'Perform something, and afterwards write down what you kept losing. Not what went badly — what you kept having to rebuild.',
        'Choose one mark for it. One. A system that starts with six marks does not survive the first week.',
        'Use it on a whole script and see whether you still read it on day five.',
        'Add a second mark only when a second thing keeps going missing.',
      ] },
      { p: 'Use pencil for anything a director might change, and keep the marks that are yours separate from the marks that came from the room. When a production ends, the page you kept is a record of how you solved that part, and it is worth reading again before you solve the next one.' },
    ] },
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
  { id: 'ac-pro-offbook', module: 'professional', order: 2,
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
  { id: 'ac-pro-choices', module: 'professional', order: 3,
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
  { id: 'ac-pro-notes', module: 'professional', order: 4,
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
  { id: 'ac-pro-early', module: 'professional', order: 5,
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
  { id: 'ac-pro-director', module: 'professional', order: 6,
    title: 'What a Director Actually Wants',
    requiredReviewer: 'acting-professional',
    objective: 'Bring options and solutions, not questions and problems.',
    orientation: 'The director has a hundred fires. Do not be the hundred and first.',
    reflection: 'Last time something was wrong in a scene, did you bring the problem or the solution?',
    body: [
      { p: 'What a director wants from you is simple to say: options, preparedness, and going full out. This is no time to be shy. Arrive with two or three real ways the scene could go, played fully enough to judge. Now the director’s job is choosing, which is fast and pleasant, instead of inventing your performance for you, which is slow and is not their job.' },
      { p: 'When something is wrong, report it WITH a proposed fix. A costume that blocks the cross, a prop that will not open, a line that fights the blocking: fine, say so, and in the same breath say what you would do about it. A problem plus a solution is collaboration. A problem alone is a task you just assigned to a person with a hundred of them.' },
      { p: 'And learn each director’s language fast. Some speak in images, some in actions, some in results. Translating their note into your process is your work, not theirs, and the actors who translate quickly are the ones every director calls again.' },
    ] },
  { id: 'ac-pro-audition', module: 'professional', order: 1,
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
    lessons: ['ac-offbook', 'ac-behavior', 'ac-circumstances', 'ac-objective',
              'ac-obstacle', 'ac-stakes', 'ac-urgency'] },
  // Module 3 gets its own shelf (owner order, 2026-09-17): every
  // collection now mirrors one Learn module.
  { id: 'listening', icon: '👂', title: 'Listening & Responding',
    lessons: ['ac-attention', 'ac-receiving', 'ac-moment', 'ac-newinfo',
              'ac-repetition', 'ac-playing'] },
  // TRIMMED TO SIX (owner order 2026-09-25): Lines & Memory, The Four
  // Lists, Through Analysis, Marking Up the Script, Finding Your Own
  // Marks, Question Everything. Nine lessons were retired as redundant —
  // they asked what The Four Lists and Question Everything already ask,
  // and Playable Actions has its own Library shelf. Lines & Memory is a
  // standalone page rather than a lesson, so main.js puts it at the head
  // of this shelf; everything below is in the owner's stated order.
  { id: 'scene', icon: '🔍', title: 'Script Analysis',
    lessons: ['ac-fourlists', 'ac-analysis', 'ac-markup', 'ac-ownmarks', 'ac-question'] },
  // Monologue Work and Scene Work shelve here, matching their Learn
  // module (Preparing the Performance) — the shelf and the path must
  // not disagree about what these chapters are (owner fix, 2026-09-16).
  { id: 'rehearsal', icon: '🎬', title: 'Actions & Rehearsal',
    lessons: ['ac-actions', 'ac-monologue', 'ac-scene', 'ac-twohander',
              'ac-rehearsal', 'ac-integrating', 'ac-applying', 'ac-fourthwall',
              'ac-performance'] },
  { id: 'professional', icon: '💼', title: 'The Professional Actor',
    lessons: ['ac-pro-audition', 'ac-pro-offbook', 'ac-pro-choices', 'ac-pro-notes',
              'ac-pro-early', 'ac-pro-director', 'ac-pro-stageset', 'ac-pro-reputation'] },
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
  'fourth-wall': { term: 'The fourth wall',
    def: 'The imagined wall along the open side of the stage, treated as part of the character’s world. Built in rehearsal with specific objects at specific distances, so the actor has somewhere real to look.' },
};
