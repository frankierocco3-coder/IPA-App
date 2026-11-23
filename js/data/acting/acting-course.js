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

// PREPARING THE PERFORMANCE IS WITHDRAWN (owner order, 2026-10-25). The
// course stops at how behavior works and no longer carries the
// rehearsal-and-production half: monologue work, scene work, the
// two-hander, rehearsal preparation and taking the work into the room.
//
// A FLAG, NOT A DELETION — the same mechanism as ROLE_LIVE, SPEECH_LIVE and
// every other withdrawal in this repo. Flip this to true and the module,
// its eight remaining lessons and its Library shelf all come back whole.
//
// THE EIGHT RECORDS STAY in ACTING_LESSONS_ALL below, and their approvals
// stay in js/data/speech/reviews.js. The approvals are DORMANT rather than
// removed: all eight carry the owner's own editorial verdict, and deleting
// them would mean eight lessons had to be re-approved before the flag could
// ever be flipped back, which would make "comes back whole" false. They
// point at nothing while the flag is off, which costs nothing — nothing
// reads the ledger in the lesson-to-approval direction.
//
// IDS ARE NOT RETIRED, because the lessons are not gone. If this ever
// becomes a real deletion, retire all eight and never reuse them, the way
// sh-speechaction, sh-shapes and sh-playfigure were retired when Rhetoric
// left Shakespeare.
//
// 'ac-fourthwall' is the ONE lesson kept (owner order, same day). It did
// not stay behind the flag — it moved to module 'work', keeping its id.
// See the record itself for why it lands there.
export const PERFORMANCE_LIVE = false;

// THROUGH ANALYSIS IS WITHDRAWN (owner order, 2026-11-22: "get rid of
// through analysis"). It was module 1 lesson 2, between The Four Lists
// and Marking Up the Script.
//
// A FLAG AND NOT A DELETION, which is this project's answer every time
// and matters more here than usual. `ac-analysis` is STORAGE: every
// learner who finished it has that id in their completed set, and hard
// constraint 5 says progress is never destroyed without a migration. The
// record stays in ACTING_LESSONS_ALL, its ledger entry stays in
// js/data/speech/reviews.js, and the filters below take it out of the
// course. Flip this to true and it comes back published rather than as a
// draft gate, which is the same contract PERFORMANCE_LIVE keeps.
//
// Deleting the record outright is a one line change from here if that is
// what the owner wants; this is the reversible half of it.
export const ANALYSIS_LIVE = false;

const ACTING_MODULES_ALL = [
  // SCRIPT ANALYSIS COMES FIRST (owner order, 2026-10-21), on the way it
  // is actually taught: table work before anybody is on their feet, and
  // only once beats, objectives and a physical score exist does a scene
  // arrive. The modules swapped places; NEITHER ID MOVED, so every
  // completed lesson survived the reorder.
  //
  // The code agreed with the owner before he said it. Script Analysis
  // uses this course's situation vocabulary exactly once in five lessons
  // and defines its own terms, so it stands alone; Where Behavior Comes
  // From leans on reading the text in five of its seven. The dependency
  // only ever ran one way, and it ran against the old order.
  //
  // Renamed from Investigating the Text (owner order, 2026-09-24): the
  // blurb had called it "the script-analysis course" since it was
  // written, and the module now also teaches how to RECORD the analysis
  // on the page, not only how to do it. The id stays 'text' — ids are
  // never renamed here, which is what keeps stored progress intact.
  { n: 1, id: 'text', title: 'Script Analysis',
    // 'subtext' was dropped from this list on 2026-10-21. It appeared
    // once in the whole module, inside another lesson's list of tools,
    // and no lesson teaches it — the blurb was promising a fifth thing
    // the module does not deliver. Put it back only alongside a lesson
    // that earns it.
    blurb: 'Discover what the scene gives you before deciding how to play it.' },
  // Being Off Book opens this module (owner order, 2026-08-20). It used
  // to close it, which was backwards: none of the rest can be worked
  // while an actor is still holding the script. Now that analysis comes
  // first, it also sits where rehearsal actually puts it — you read and
  // mark a script before you learn it.
  //
  // RENAMED TWICE. The Actor’s Work -> The Situation at Hand (owner
  // order, 2026-09-26) -> Where Behavior Comes From (owner order,
  // 2026-10-21). The id stays 'work' through both — ids are never renamed
  // here, which is what keeps stored progress intact across a rename.
  //
  // The first rename fixed a name that described the whole course: every
  // one of the five modules is the actor's work. The second fixed a name
  // that covered about three of seven chapters. Circumstances are the
  // situation; objective, obstacle, stakes and urgency are the pursuit
  // inside it, and the path icons split the module on exactly that seam —
  // three 'read' lessons, then four 'decide'. The new name is the one
  // thing all seven have in common, and it is what the course's governing
  // principle says in its first clause.
  { n: 2, id: 'work', title: 'Where Behavior Comes From',
    // The list named four elements and the module teaches five; urgency
    // added 2026-10-21. It was the one thing a learner reading the module
    // card could not see was coming. The blurb used to open "then where
    // behavior comes from", which is now the title directly above it, so
    // it was reworded to stop the card saying the same thing twice.
    blurb: 'Behavior grows from circumstance, pursuit and resistance — not a decision about mood.' },
  { n: 3, id: 'listening', title: 'Listening and Responding',
    blurb: 'Receive the other person before deciding how to answer.' },
  // Tempo-Rhythm was inserted here (owner order, 2026-08-26); Building a
  // Character sat beside it until 2026-09-23, when the whole module moved
  // to the Building a Character course. Its lessons kept their ids, so
  // nothing stored on a device broke. Preparing the Performance has moved
  // 4 -> 6 -> 5 across those two changes, again without touching ids.
  { n: 4, id: 'rhythm', title: 'Tempo-Rhythm',
    blurb: 'Learn how a character moves through time — in speech, action and silence.' },
  // WITHDRAWN behind PERFORMANCE_LIVE (owner order, 2026-10-25). The record
  // stays so the module can return with its title and blurb intact; the
  // filter below is what removes it from the course.
  { n: 5, id: 'performance', title: 'Preparing the Performance',
    blurb: 'The rehearsal-and-production course: monologue and scene work, and carrying it all into the room.' },
];

const ACTING_LESSONS_ALL = [

  // ── Module 1 · Where Behavior Comes From ──────────────────────
  { id: 'ac-behavior', module: 'work', order: 2,
    title: 'Behavior Comes From the Situation',
    requiredReviewer: 'acting-professional',
    objective: 'Understand behavior as a product of circumstance and pursuit, not a decision about mood.',
    orientation: 'The most common trap in early acting work is deciding how a line should sound. This chapter replaces that question with a better one.',
    reflection: 'Think of a conversation this week where you behaved in a way that surprised you. What was the situation asking of you?',
    body: [
      { p: ACTING_PRINCIPLE },
      { p: 'Behavior is not chosen from a menu of feelings. It comes out of a person in a particular situation, wanting something, meeting resistance. Change the situation and the behavior changes with it. The same words spoken by someone who has just been fired, or just been forgiven, are not the same words at all.' },
      { p: 'This is why the actor’s first job is not delivery. It is understanding.' },
      { key: 'Delivery is the last thing to settle, and mostly it settles itself once everything else is in place.' },
      { h: 'What this rules out' },
      { list: [
        'Deciding in advance that a line is “angry” and then performing anger.',
        'Playing a summary of the character (“she’s bitter”) instead of what she is doing right now.',
        'Fixing a reading in rehearsal and repeating it regardless of what your partner gives you.',
      ] },
      { p: 'None of these is a moral failing. They are simply less useful than the alternative, because they replace a living situation with a fixed decision.' },
      { panel: { tone: 'sage', icon: 'book', title: 'What there is to understand',
        lead: 'Settle these, and delivery mostly settles itself.',
        items: [
          'What is happening, and who these people are to each other.',
          'What has just occurred, and what is at stake.',
          'What this character is trying to get.',
        ] } },
    ] },

  { id: 'ac-circumstances', module: 'work', order: 3,
    title: 'Given Circumstances',
    requiredReviewer: 'acting-professional',
    objective: 'Gather the facts a text establishes before inventing anything.',
    orientation: 'Given circumstances are everything the play tells you is true. They are the ground the character stands on.',
    reflection: 'For your scene: which three circumstances change the most if you get them wrong?',
    glossary: ['given-circumstances'],
    body: [
      { p: 'The given circumstances are the facts the text establishes: who the character is, where and when the scene happens, what has already occurred, what each person knows, and what the world of the play permits or forbids.' },
      { key: 'Given circumstances are given because the writer gave them to you; they are not open to preference.' },
      { p: 'Working from circumstances is what keeps an interpretation honest.' },
      { h: 'Where to look' },
      { list: [
        'What characters say about themselves, treated as claims rather than facts.',
        'What other characters say about them, also claims.',
        'What the stage directions establish, in plays where they carry authority.',
        'What the events of the play require to have been true.',
        'What the period, place and social world make likely or impossible.',
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'Doing this on your own text',
        items: [
          'Question Everything, in the Actor’s Studio, walks it systematically for the text you are working on.',
          'The test of having read carefully: you cannot play a casual goodbye in a scene where the text says the train leaves in four minutes.',
        ] } },
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
      { p: 'An objective is what the character is trying to get, usually from the other person in the room. “Make her stay.” “Get him to admit it.” “Be forgiven.”' },
      { key: 'An objective is testable: at the end of the scene you either got it, lost it, or the situation changed under you.' },
      { p: 'Emotional states are not objectives.' },
      { h: 'Scene objective and overall objective' },
      { list: [
        'The scene objective is what you want here, now, from this person.',
        'The overall objective is what the character wants across the whole play.',
        'A good scene objective serves the overall one, even when the character does not know it.',
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Writing one you can play',
        items: [
          '“Be angry” gives you nothing to do and nobody to do it to.',
          'A strong feeling arrives as a consequence of pursuing something under pressure, not as an instruction to yourself.',
        ] } },
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
      { p: 'Obstacles are worth finding precisely, because the size and kind of resistance shape everything the character does.' },
      { key: 'Pursuit against mild resistance looks like conversation; pursuit against serious resistance looks like strategy.' },
      { h: 'A useful test' },
      { p: 'If a scene feels flat in rehearsal, the objective is often fine and the obstacle has gone missing.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Restoring the resistance',
        items: [
          'Check whether you have quietly assumed the other person will cooperate.',
          'Restore the resistance, and the scene usually starts moving again.',
        ] } },
    ] },

  { id: 'ac-stakes', module: 'work', order: 6,
    title: 'Stakes',
    requiredReviewer: 'acting-professional',
    objective: 'Know what this character stands to win or lose, and let that calibrate the scene.',
    orientation: 'Stakes are the answer to “so what?”, and the scene is only as alive as its answer.',
    reflection: 'If your character fails in this scene, what is the worst honest consequence?',
    body: [
      { p: 'Stakes are what the outcome costs.' },
      { key: 'Stakes are established by the circumstances, not chosen for effect, and reading them accurately is more useful than inflating them.' },
      { p: 'Reading them accurately produces a scene where a small thing can matter enormously because of what surrounds it.' },
      { h: 'Kinds of stakes worth naming' },
      // RAISED 2026-11-22 (owner order): the examples were the low end of
      // each kind, which taught the categories and not the cost. They are
      // the top of each kind now. The lesson's spine does NOT move with
      // them: the panel below still says read them rather than inflate
      // them, and these are high because the circumstances make them
      // high, not because a bigger word was chosen.
      { list: [
        'Practical: the rent that is already late, the job that was the last offer, the deadline that ends in a courtroom.',
        'Relational: whether this person stays married to you, whether they ever speak to you again, whether they forgive the thing you have not told them yet.',
        'Internal: whether the character can go on believing they are the person they have always said they are.',
      ] },
      { p: 'None of those is louder than the others. A scene about rent can cost more than a scene about a death, if the rent is the last thing holding a life together and the death is at arm’s length.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Read them, do not inflate them',
        items: [
          'Ask what the character gains if this goes well, and loses if it does not.',
          'Raising them arbitrarily produces a familiar kind of bad acting: everything urgent, nothing meaning anything.',
        ] } },
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
    // REWRITTEN DEEPER 2026-11-22 (owner order). The lesson was four
    // sentences, a list and a panel: it named the idea and left the actor
    // to apply it. What it was missing is the part that is actually hard,
    // which is not what urgency IS but how to find the clock in a
    // particular scene and what the pressure does to behaviour once you
    // have. The original four lines all survive, in order, at the top.
    body: [
      { p: 'Urgency is the need to affect something now.' },
      { p: 'In dramatic circumstances, urgency is usually written into the situation.' },
      { key: 'Find it in the text before inventing it.' },
      { h: 'Where dramatic urgency comes from' },
      { list: [
        'A deadline the circumstances impose.',
        'New information that has just arrived.',
        'A window that is closing: the other person is leaving, or will not be alone again.',
        'A consequence that becomes irreversible after this scene.',
        'A cost that rises for every minute the thing goes unsaid.',
        'A third person who is about to walk through the door.',
      ] },
      { h: 'Why today, and not a week ago' },
      { p: 'A scene that could have happened last Tuesday, or next Tuesday, has not found its urgency yet. The question is not whether your character wants something. It is what makes today the day they have to do something about it.' },
      { p: 'Writers answer that question somewhere on the page, usually early, and usually in a line that sounds like information rather than pressure. Somebody mentions a flight, a hearing, a result that comes back on Friday. That is the clock, handed to you in passing.' },
      { key: 'Two things supply the answer, and they behave differently: something has just changed, or something is about to.' },
      { p: 'A change that has just landed gives you a person still absorbing it, working a half step behind their own situation. A change that is coming gives you a person trying to get in front of it, working a half step ahead. Decide which one your scene is running on before you decide anything else, because almost every behavioural choice in the scene follows from it.' },
      { h: 'What the pressure does to behaviour' },
      { p: 'Urgency is a pressure, not a tempo. It changes what a person is willing to do, not only how fast they do it.' },
      { list: [
        'It narrows the tactics: there is no longer time for the long way round, so people go at the thing directly.',
        'It cuts the social opening. Nobody asks how the drive was.',
        'It produces repetition, because being understood has stopped being optional.',
        'It makes interruption reasonable, where in a slower scene it would be rude.',
        'It can produce stillness and quiet, when any movement would cost them the thing they want.',
        'It makes people bargain with things they would not normally offer.',
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Reading urgency',
        items: [
          'As the Speech chapter establishes, it is not automatically faster or louder speech. It can produce slowness, precision, repetition, stillness or a change of tactic.',
          'It is usually written into the situation: something has just happened, something is about to, someone is about to leave, a decision is being made tonight, an opportunity is closing.',
        ] } },
      { h: 'The familiar bad version' },
      { p: 'Played as general speed, urgency becomes faster lines and more volume with nothing underneath, and it reads as an actor in a hurry rather than a person who has run out of time. The giveaway is that it is even: real pressure is uneven, because it comes and goes as the character gets closer to the thing and further from it again.' },
      { key: 'The test: slow the scene down on purpose. Whatever pressure survives the slowing was real, and whatever disappears was speed pretending.' },
      { h: 'Urgency and stakes are not the same thing' },
      { p: 'Stakes are what the outcome costs. Urgency is how little time there is to affect it. A scene can carry enormous stakes and no urgency, which is what a deathbed scene often is, and it can carry small stakes under a hard clock, which is most comedy. Knowing which of the two your scene is short of tells you what to go looking for in the text.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Finding it in the scene in front of you',
        items: [
          'Name the clock out loud: what exactly runs out, and when.',
          'Name the cost of missing it in this character’s terms, not in general terms.',
          'Find the line where the text hands you the clock, and say it like somebody who knows what it means.',
          'Then take the speed out and play it slowly once. What is left is your urgency.',
        ] } },
    ] },

  // THE PHYSICAL SCORE (owner order, 2026-10-21). Added at the end of
  // this module on purpose: it is the test of everything the module has
  // just named. Circumstances, objective, obstacle, stakes and urgency
  // are all claims until a body has to carry them with the words taken
  // away, and this is the exercise that takes them away.
  //
  // It sits here rather than in Preparing the Performance because the
  // owner's own training order puts it before a scene arrives, not
  // inside scene work, and because module 5 already holds nine lessons
  // doing two jobs.
  //
  // NOT PUBLISHED. There is no entry for this id in
  // js/data/speech/reviews.js, so it renders as a draft gate to every
  // learner until the owner approves it. That is deliberate: it is new
  // writing, and nothing here approves its own copy.
  { id: 'ac-physicalscore', module: 'work', order: 8,
    title: 'The Physical Score',
    requiredReviewer: 'acting-professional',
    objective: 'Play the scene with the words taken away, and find out which of your choices was real.',
    orientation: 'Words will carry an intention you have not actually made. A body will not.',
    reflection: 'Which moment went vague the second you could not speak?',
    body: [
      { p: 'A physical score is the scene played silently: no lines, no mouthing, nothing but what the character physically does. You still pursue the objective, you still meet the obstacle, you still take in whatever the other person gives you. You simply cannot say any of it.' },
      { p: 'It is a test rather than a performance. Speech is generous, and it will cover for a choice you have not really made: an actor who has not decided what they want can still say the line convincingly enough to get through a rehearsal. Take the line away and there is nothing left to hide behind.' },
      { key: 'Either you are doing something to the other person or you are standing there.' },
      { h: 'Running it' },
      { steps: [
        'Know the scene well enough that you are not trying to remember it. This is work for a secure text.',
        'Decide, before you start, what you want and what is in the way. Write both down in a sentence each.',
        'Play the scene through in silence, at the real length, taking the time the lines would have taken.',
        'Do whatever the character would do: cross the room, take the chair, pick the thing up, put it down, turn away, wait.',
        'Where you find yourself inventing business to fill a gap, stop and mark the moment. That gap is a choice you have not made.',
        'Run it a second time and keep only what was doing something. Decoration falls away fast on the second pass.',
        'Then put the words back and notice what survived.',
      ] },
      { h: 'What it tells you' },
      { list: [
        'Where the objective is real, because something visibly changes when you pursue it.',
        'Where the obstacle is real, because you can see it cost you something.',
        'Which moments were carried entirely by the writing and not by you.',
        'Where you were waiting for your cue rather than listening.',
      ] },
      { p: 'Work gently and inside what your body allows today.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'It asks nothing strenuous of you',
        items: [
          'None of this needs falls, lifts or anything strenuous to be useful.',
          'A physical score done sitting in a chair still answers the question it is asking.',
        ] } },
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
      // THE OPENING PARAGRAPH WAS CUT (owner order, 2026-11-22). It began
      // 'Being off book is the professional actor's responsibility' and
      // ran to 'no longer searching for the next one'.
      //
      // AND THE SENTENCE AFTER IT WENT WITH IT, which was not asked for
      // and is the same cut: 'Knowing the words is preparation, not
      // acting' is this lesson's `orientation` word for word, so with the
      // paragraph above removed the body opened by repeating the line
      // already printed at the top of the page.
      { p: 'Fluency frees the actor to listen, respond and pursue the objective.' },
      { key: 'An actor still hunting for text has no attention left for the other person, and acting lives in what happens between people.' },
      { h: 'What securing text actually buys' },
      { list: [
        'Attention for the other actor, instead of for your own next line.',
        'The ability to be genuinely affected and still land the text.',
        'Freedom to move, to wait, to change tactics mid-thought.',
        'A rehearsal room that can work on the scene rather than on the lines.',
      ] },
      { p: 'Speechcraft’s Practice section holds text-based recall exercises: Vanishing Text, Cue Pickup, First-Letter Recall, built for exactly this stage of the work.' },
      { p: 'One warning before you trust a clean run.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Fluent is not the same as known',
        items: [
          'Feeling fluent and knowing the lines are two different measurements, and the first one lies.',
          'The Library’s Lines & Memory lesson shows why, and how to test which one you actually have.',
        ] } },
    ],
    doorway: { id: 'lines-memory', label: 'Lines & Memory' } },

  // RE-HOMED 2026-10-25 (owner order): moved out of Preparing the
  // Performance, which is withdrawn behind PERFORMANCE_LIVE above, into
  // Where Behavior Comes From. THE ID DID NOT MOVE, so every learner who
  // had completed it still has it.
  //
  // It lands last in this module, straight after the physical score,
  // because that is the order the work happens in: you build the body,
  // then you build the room the body is standing in. The fourth wall is a
  // given circumstance the set does not supply, which is this module's
  // subject, not a rehearsal-and-production task.
  //
  // Its KIND stays 'perform' in path-labels.js. The kinds are not
  // module-locked — ac-physicalscore is 'drill' inside this same module —
  // and 'it meets an audience' is literally why a fourth wall exists.
  { id: 'ac-fourthwall', module: 'work', order: 9,
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
      { key: 'A wall you have not built is a wall you cannot use, and the failure is visible.' },
      { p: 'Eyes with nowhere to land drift across the house, focus on nothing, or lock politely into the middle distance, and every one of those reads from the back row. So build it in rehearsal, as deliberately as the designer built the other three. Decide what is on it and where. Then keep it there, every run, every night.' },
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
      { p: 'One classic rehearsal problem makes a useful private drill.' },
      { p: 'None of this seals you off from the house. The audience still gets your voice, your face and most of your body precisely because the missing wall is missing. The convention is a trade: the theatre removes a wall so they can see in, and you rebuild it in imagination so there is something worth seeing.' },
      { panel: { tone: 'sage', icon: 'mask', title: 'A private drill: the imaginary mirror',
        lead: 'Hang it in the middle of the audience and do something real in it.',
        items: [
          'Fix your hair. Check your collar.',
          'Practice until your focus sits at the reflection’s distance and the task is genuinely absorbing.',
          'An observer should be able to tell where the mirror hangs, and they should never once catch your eye.',
        ] } },
    ] },

  // ── Module 2 · Script Analysis ────────────────────────────────
  { id: 'ac-fourlists', module: 'text', order: 0,
    title: 'The Four Lists',
    requiredReviewer: 'acting-professional',
    objective: 'Gather the evidence the text gives you before you invent anything.',
    orientation: 'Investigation starts with collection. These are the four things to collect.',
    body: [
      { p: 'Before you interpret a word, collect what the play already states. Five read-throughs and four inventories: the facts the text gives outright, what your character says about themselves, what they say about everyone else, and what everyone else says about them.' },
      { key: 'The lists are evidence rather than biography, and the useful part is where they disagree.' },
      { p: 'A character whose account of themselves contradicts the stated facts, or whose reputation contradicts their own account, has handed you the argument the play is having about them.' },
      // The whole method, not a summary of it (owner order 2026-09-29),
      // rendered from FOUR_LISTS_SECTIONS so the lesson and the page
      // cannot drift apart.
      { fourLists: true },
      { p: 'Everything else in Script Analysis digs into what you collect here, and Question Everything is the interrogation the lists get.' },
      { panel: { tone: 'sage', icon: 'book', title: 'Before you interpret a word',
        items: [
          'The first reading has no pen in it at all.',
          'To work the lists on your own script, open The Four Lists from the Script Analysis shelf. They save with that project.',
        ] } },
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
      { key: 'Six sections, in order, and none of them settles for a first impression.' },
      { p: 'Work them on the text in front of you rather than reading them through.' },
      // THE COMPLETE LIST, not a sample (owner order 2026-09-29). It used
      // to be ten questions quoted as "a taste of the list" with the rest
      // behind a link, which is the version this replaces. It renders from
      // DISSECT_SECTIONS, the same record the textbook page and the
      // per-project worksheet both run on, so there is no second copy.
      { dissect: true },
      { panel: { tone: 'sage', icon: 'target', title: 'Working the questions',
        items: [
          'The value is in the answering, not in the reading.',
          'The questions you least want to answer are usually the ones the scene turns on.',
        ] } },
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
      { p: 'An actor watching themselves has divided attention, and it shows.' },
      { key: 'An actor genuinely watching their partner has something to respond to, and that reads as presence.' },
      { p: 'This is trainable, and it is mostly a matter of where practice puts your attention.' },

      { h: 'What divided attention looks like from outside' },
      { p: 'It rarely looks like distraction. It looks like a small delay, as though every line were being checked before it was released, and an evenness in the face that does not change when the other person changes. An audience cannot see where your attention is. They can see that something is arriving slightly late.' },
      { list: [
        'The eyes go to the partner on your own line and leave on theirs.',
        'You are listening with an expression chosen before the scene started.',
        'Your reactions are the right size for the scene rather than the right size for what just happened.',
        'You know exactly what you are doing next, whatever they do.',
      ] },

      { h: 'Attention is not concentration' },
      { p: 'Concentration is effortful and inward, and a concentrating actor is often the least available person in the room. Attention is the opposite movement: loose, outward, interested. The two are easiest to tell apart when something goes wrong. Concentration is disturbed by a dropped line. Attention uses it.' },

      { h: 'What to put it on' },
      { p: 'Not the words. The words are the one part of the scene you already have. Put it on what the other person is doing while they say them, because that is the only part that is genuinely new tonight.' },
      { list: [
        'Where their weight is, and whether it has just moved.',
        'What their hands have stopped doing.',
        'Where they look when they reach the hard part of the line.',
        'Whether this reading is the same as last night, and what changed.',
        'What they want from you now, which is often not what they are asking for.',
      ] },
      { key: 'Watching for what they want is the version that survives performance, because it is the one that also serves your own objective.' },

      { panel: { tone: 'sage', icon: 'target', title: 'Freeing the attention up',
        lead: 'One thing to do about it, and what it buys.',
        items: [
          'Secure the text first. What is automatic no longer needs supervising.',
          'What that frees is attention for the person in front of you.',
        ] } },

      { h: 'Looking is not attending' },
      { p: 'Actors told to watch their partner often produce a fixed, faintly intense stare, which reads worse than the divided attention it replaced. Attention does not have to be continuous and it does not live only in the eyes. Looking away at the moment a thing lands is frequently the most attentive move available, because it is what a person does when something has actually gone in.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Two tests you can run tonight',
        lead: 'Both are answered after the run, not during it.',
        items: [
          'Name three things your partner did that you had not planned for. If you cannot name one, your attention was inward.',
          'Ask them to change one thing without telling you which. If the run plays identically, you were not watching.',
        ] } },
    ] },

  { id: 'ac-receiving', module: 'listening', order: 2,
    partnerWork: true,
    title: 'Receiving Before Responding',
    requiredReviewer: 'acting-professional',
    objective: 'Let what your partner does land before you answer it.',
    orientation: 'The gap between receiving and responding is where acting happens.',
    reflection: 'Where in the scene are you answering before you have listened?',
    body: [
      { p: 'Waiting for your cue is not listening.' },
      { key: 'Receiving means letting what the other person does actually affect you before your line arrives, and letting the size of the effect match what they gave you.' },

      { h: 'What the gap actually is' },
      { p: 'Between what they do and what you do, something has to happen to you. It does not have to take time. A great deal of receiving happens inside half a second, and what the audience registers is not a pause but the fact that your line could not have been said before theirs.' },

      { h: 'Why waiting for a cue feels like listening' },
      { p: 'Because it is attentive, and attentive to the wrong thing. An actor holding for a cue is tracking the END of the other line, which means tracking its last three or four words. That is a timing operation. It can be performed flawlessly while missing everything the line was about.' },

      { h: 'Letting the size match' },
      { p: 'The common failure is not the absence of a response but a response of the wrong size. A mild remark gets a devastated reaction because the actor knows what it will mean in act three. A genuinely wounding line gets a shrug because the actor has heard it two hundred times in rehearsal. Scale is information: an audience reads the size of your response as the size of the event.' },
      { key: 'If every line lands equally hard, none of them lands.' },

      { h: 'Where the receiving is written' },
      { p: 'You do not have to invent these moments. The text marks most of them.' },
      { list: [
        'Any line that answers a question with something other than the answer.',
        'Any place where your next line changes tactic.',
        'Any line that opens with a refusal: no, wait, listen, stop.',
        'Any silence the writer actually wrote down.',
        'Any repetition of a word your partner has just used.',
      ] },

      { panel: { tone: 'sage', icon: 'lamp', title: 'Listen to the scene and name it',
        lead: 'The same text gives you one of two sounds.',
        items: [
          'Two people reciting alternately: the receiving is missing.',
          'A conversation, where each line is visibly caused by the one before it: it is there.',
        ] } },

      { h: 'The overcorrection' },
      { p: 'Told to receive, actors add pauses. A scene paved with pauses is not a scene that listens, it is a scene that has learned to look thoughtful, and it is slower without being fuller. Receiving is not duration. It is causation.' },
      { key: 'Test: take out every pause you added and play it fast. Whatever still reads as caused was genuinely received, and the rest was decoration.' },
    ] },

  { id: 'ac-moment', module: 'listening', order: 3,
    partnerWork: true,
    title: 'Moment-to-Moment Behavior',
    requiredReviewer: 'acting-professional',
    objective: 'Play the scene as it happens rather than as it was planned.',
    orientation: 'A plan is useful. A plan executed regardless of the other person is not acting.',
    reflection: 'What in your scene is fixed by the text, and what is genuinely free to change each time?',
    body: [
      { p: 'Preparation gives you circumstances, objective, obstacle and a vocabulary of actions. It does not give you a performance to reproduce.' },
      { key: 'The scene is played forward each time, in response to what is actually happening.' },
      { p: 'This is not an argument against rehearsal, quite the opposite.' },

      { h: 'What is fixed, and what is genuinely free' },
      { p: 'Almost every argument about this subject comes from not separating the two. Some of a performance is fixed and should be: it is owed to the writer, to the lighting board and to the other actors. The rest is yours to play forward, and it is where the evening is either alive or not.' },
      { defs: [
        { label: 'Fixed', text: 'The words. The blocking that other people depend on. Entrances, exits, anything cued to light or sound, anything that would be unsafe to vary.' },
        { label: 'Free', text: 'Which action you are playing on a given line. How hard you push. What you do while they speak. How long you take. What you look at. Whether this attempt works.' },
      ] },
      { p: 'The free list is longer than most actors use. Blocking and text being fixed does not fix the behaviour inside them, and a performance that varies nothing at all has decided that the other person cannot affect it.' },

      { h: 'Why a reproduced performance decays' },
      { p: 'Reproduction copies the surface of a thing that was caused. The first time, you took that pause because something genuinely landed; on the twentieth, the pause is there and the thing that caused it is not. The audience does not see a pause of the right length, they see one with nothing inside it. The same decay works on a laugh, a turn, a change of volume. Each is the visible end of something that has quietly stopped happening.' },
      { key: 'Repeat the cause, and the effect comes back on its own. Repeat the effect, and the cause never returns.' },

      { h: 'Playing it forward' },
      { p: 'Playing forward means entering each moment from the one before it rather than from your memory of the run. Practically, that is a small number of habits.' },
      { list: [
        'Start the scene from what is true at the top tonight, not from how it went last night.',
        'Let the attempt genuinely be an attempt: if it works on them, take the win and move, and if it does not, do something else.',
        'Treat your partner’s change as information rather than as an error to absorb.',
        'Finish the line you are on before you start arranging the one after it.',
      ] },

      { panel: { tone: 'sage', icon: 'book', title: 'What the preparation is for',
        lead: 'Thorough preparation is what makes moment-to-moment work possible.',
        items: [
          'Make the things that must be reliable reliable.',
          'That is what leaves the live things free.',
        ] } },

      { h: 'When your partner is fixed and you are not' },
      { p: 'It happens, and it is not a reason to fix yourself to match. You cannot make somebody else play moment to moment, but you can keep giving them something real to answer, and a scene with one live actor in it is still better than a scene with none. Keep your own attempts genuine, keep the sizes honest, and do not punish them by withdrawing: that produces two people performing separately, which is the thing you were trying to avoid.' },
    ] },

  { id: 'ac-newinfo', module: 'listening', order: 4,
    partnerWork: true,
    title: 'Let the Information Affect You',
    requiredReviewer: 'acting-professional',
    objective: 'Let what you learn in the scene change what you do next.',
    orientation: 'Characters who learn nothing produce scenes that go nowhere.',
    reflection: 'What does your character learn in this scene, and at exactly which line?',
    body: [
      { p: 'Scenes deliver information: a confession, a refusal, a fact the character did not have. The question is whether it lands.' },
      { key: 'An actor who already knows the whole play can quietly stop being surprised by it.' },
      { h: 'The problem is that you have read the end' },
      { p: 'Your character finds out on page forty. You found out six weeks ago, and you have run the scene thirty times since. Nothing about rehearsal protects the moment of learning: it erodes it, every single time, and the erosion is invisible from the inside because the line still feels meaningful to say.' },
      { p: 'The answer is not to pretend you do not know. Pretended surprise is one of the easiest things to spot in a theatre. The answer is to play the character’s situation, which is that they do not yet have the information and are therefore still operating on the old picture, right up until the line where the picture breaks.' },

      { h: 'Finding the exact line' },
      { p: 'Vagueness about where it lands is what produces a general cloud of significance over a whole page. Information arrives at a word, not in a region. Mark it.' },
      { list: [
        'Read the scene asking only this: what does my character know at the top that they do not know at the bottom?',
        'Find the first line at which they could not go back to believing the old thing.',
        'Check whether the line before it was still played on the old picture. If it was not, the information arrived early and the moment is gone.',
      ] },

      { h: 'What landing costs' },
      { p: 'A fact that costs nothing has not landed, it has been received. The cost is whatever the character now has to give up: a plan, a story about somebody, an idea of themselves, the thing they came into the room to do. Name it in a few words and the scene usually starts telling you how to play it.' },
      { key: 'The size of the adjustment is the size of the information. That is how an audience knows what it was worth.' },

      { h: 'The adjustment is the acting' },
      { p: 'What happens after is more interesting than the moment itself, and it is where most actors stop. A character who has just learned something does not simply continue. They do one of a small number of things, and choosing which is a real decision.' },
      { list: [
        'Change tactic: the old approach cannot work now, so try another.',
        'Keep going anyway, because admitting the change would cost more than the lie.',
        'Retreat, and buy time to think.',
        'Attack, because the information is an injury and the nearest person did it.',
        'Go quiet, which is the hardest to play and often the truest.',
      ] },

      { panel: { tone: 'sage', icon: 'target', title: 'Working a piece of new information',
        lead: 'Three moves, on each thing the character learns.',
        items: [
          'Find the exact line where it arrives.',
          'Let it cost something.',
          'Play the adjustment that follows: a change of tactic, a pause, a retreat. It is often the most alive moment in the scene.',
        ] } },

      { h: 'Information your character already has' },
      { p: 'Not everything said in a scene is news, and treating it as news is its own mistake. Half of what passes between people who know each other is old ground, deliberately raised. When your partner says a thing your character has heard a hundred times, the live question is not what it means but why it is being said again, now.' },
    ] },

  { id: 'ac-repetition', module: 'listening', order: 5,
    partnerWork: true,
    title: 'Repetition',
    requiredReviewer: 'acting-professional',
    objective: 'Repeat the work without freezing it.',
    orientation: 'Rehearsal repeats the situation, not the reading.',
    reflection: 'What stayed identical in your last two run-throughs that did not need to?',
    body: [
      { p: 'Repetition is how the work becomes reliable. It is also how a scene dies, if what is repeated is a performance rather than a pursuit.' },
      { key: 'The difference is what you are repeating: the circumstances, the objective and the listening, or a remembered set of line-readings.' },
      { h: 'Two things are being repeated and only one of them should be' },
      { defs: [
        { label: 'Repeat the situation', text: 'The circumstances, what you want, what is in the way, what it costs to fail. These should be identical every time, and they are what makes a run reliable.' },
        { label: 'Do not repeat the reading', text: 'The exact pitch of a line, the length of a pause, the turn on a particular word. These were results the first time. Reproduced, they are shapes with nothing in them.' },
      ] },
      { p: 'An actor who has learned the difference can run a scene two hundred times without it dying, because what they are rehearsing is a thing that happens rather than a thing that is performed.' },

      { h: 'How a scene actually freezes' },
      { p: 'It does not usually die of boredom. It dies of success. Something works, everybody notices it working, and from then on it is protected: the pause is held because the pause got the laugh, the line is turned because the turn landed. Within a week the scene is a sequence of preserved results, and the actors are curating rather than playing.' },
      { list: [
        'You can predict your partner’s reading before they give it.',
        'A note from the director feels like it would break something.',
        'You are aware of a moment coming up and looking forward to it.',
        'Nothing in the last three runs surprised you.',
      ] },

      { h: 'Opening a frozen scene again' },
      { p: 'The aim is to make the old result impossible to reach so the cause has to do the work again. Most of these are rehearsal room moves and all of them are temporary: you are not keeping the new version, you are using it to find out what was still alive.' },
      { list: [
        'Run it at half speed, or at double, so no remembered rhythm fits.',
        'Swap what you want: play the whole scene trying to get something adjacent and see what survives.',
        'Change the physical situation: stand when you normally sit, put a door between you.',
        'Play it to the partner you have tonight rather than the one you rehearsed with, especially if they are tired, or different, or late.',
        'Take out every pause and put back only the ones that fight to return.',
      ] },

      { panel: { tone: 'sage', icon: 'target', title: 'A practical test',
        lead: 'Run it on your last rehearsal.',
        items: [
          'Ask whether that run-through would have been unchanged had your partner done something different.',
          'If it would, the scene has been fixed rather than rehearsed.',
        ] } },

      { h: 'The long run' },
      { p: 'Over months the danger reverses. Early on the risk is freezing; later it is drift, where the scene has been varied so often that nobody can find the version that worked. The discipline is the same one from both directions: hold the situation exactly, and leave the behaviour free. Anything you cannot say about the circumstances in one sentence is something that has drifted.' },
    ] },

  { id: 'ac-playing', module: 'listening', order: 6,
    partnerWork: true,
    title: 'Play the Objective, Not the Emotion',
    requiredReviewer: 'acting-professional',
    objective: 'Pursue something, and let feeling arrive as a consequence.',
    orientation: 'Displayed emotion is a report. Pursuit is an event.',
    reflection: 'Where are you showing a feeling instead of trying to get something?',
    body: [
      { p: 'Emotion cannot be played directly with any reliability; attempts to produce it on command usually produce its indication instead.' },
      { key: 'What can be played is a pursuit under real resistance, and feeling tends to arrive on its own when the pursuit matters.' },
      { p: 'This course takes no position on which of the many approaches to emotional life an actor should adopt; the Approaches to Acting introductions in the Library describe several.' },

      { h: 'Why it cannot be played directly' },
      { p: 'Feeling is not under voluntary control in the way an action is. You can decide to cross a room, ask a question or take somebody’s hand, and then do it. You cannot decide to be devastated and then be devastated, and the attempt produces something else instead: a performance of the signs of devastation, which is what indicating means and what an audience reads as acting rather than as a person.' },
      { key: 'An action is something you do to somebody. An emotion is something that happens to you. Only the first can be rehearsed.' },

      { h: 'What makes an objective playable' },
      { p: 'A playable objective is specific, it is about the other person, and you can tell from outside whether it is working. Those three tests throw out most of what actors write in margins.' },
      { defs: [
        { label: 'Not playable', text: 'To be angry. To show that I love him. To be the kind of man who does not back down. To process my grief.' },
        { label: 'Playable', text: 'To get her to stay in the room. To make him say it out loud. To get the keys off the table before she looks. To make her laugh so the subject changes.' },
      ] },
      { p: 'The second list has a common shape: a verb, a person, and a thing that would visibly be different if you succeeded.' },

      { h: 'Converting one into the other' },
      { p: 'When you are handed an unplayable instruction, by a director, a stage direction or yourself, the move is to ask what a person who felt that way would be TRYING TO DO in this room, to this person, right now.' },
      { list: [
        'Be furious, becomes: make him admit what he did.',
        'Be in love with her, becomes: get her to look at me for longer than she means to.',
        'Show that you are afraid, becomes: get out of this conversation without being noticed leaving.',
        'Be devastated, becomes: get somebody to tell me it is not true.',
      ] },
      { p: 'Notice what survives the conversion. The feeling is not thrown away: it is now the reason the pursuit matters, which is where it can do some work.' },

      { panel: { tone: 'sage', icon: 'target', title: 'Playable, or not',
        lead: 'The one thing this course does insist on.',
        items: [
          '“Be sad” is not a playable instruction.',
          '“Get her to stay” is.',
        ] } },

      { h: 'Where the feeling then comes from' },
      { p: 'From the circumstances, the stakes and the resistance, which is why this module sits where it does in the course. If what you want matters, and somebody is genuinely stopping you getting it, feeling arrives without being sent for. When it does not arrive, the usual cause is not a failure of emotional access: it is an objective that was never worth very much, or an obstacle that is not really resisting.' },
      { key: 'A scene with no feeling in it is more often a stakes problem than a feeling problem.' },

      { h: 'And when the feeling does arrive' },
      { p: 'Let it, and keep going. The pursuit does not stop because you are moved, and a character who stops to experience their own emotion is a character who has given up on getting the thing. Most of the strongest moments on a stage are somebody trying to carry on with something while it is happening to them.' },
    ] },

  // ── Module 5 · Preparing the Performance ──────────────────────
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
      { p: 'An action is what you are doing TO the other person: to reassure, to confront, to draw out, to warn.' },
      { key: 'Actions are playable because they are transitive. They land on someone, and you can tell whether they worked.' },
      { p: 'Speechcraft’s Playable Actions library holds twelve actions organised into six contrast pairs, each pair sharing one practice line so the difference between them is audible in the same words. It lives in the Actor’s Studio and is used unchanged across the app.' },
      { panel: { tone: 'sage', icon: 'book', title: 'Using the actions library',
        items: [
          'No action is the correct action for a beat.',
          'The library is a vocabulary, not an answer key.',
        ] } },
    ] },

  { id: 'ac-monologue', module: 'performance', order: 1,
    title: 'Monologue Work',
    requiredReviewer: 'acting-professional',
    objective: 'Treat a monologue as a scene with the other person still in it.',
    orientation: 'A monologue is not a solo. It is a pursuit that happens to be uninterrupted.',
    reflection: 'Who is your monologue aimed at, and what do you want from them?',
    body: [
      { p: 'The questions do not change: circumstances, who this is addressed to, what the character wants, what resists, what changes.' },
      { key: 'The only difference is that the other person does not answer in words, which does not mean they do not answer.' },
      { p: 'Locate the turns.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Where a monologue turns',
        items: [
          'A monologue that plays as one continuous statement is usually several distinct attempts that have been flattened together.',
          'Find where the character changes approach because the first one did not work.',
        ] } },
    ] },

  { id: 'ac-scene', module: 'performance', order: 2,
    partnerWork: true,
    title: 'Scene Work',
    requiredReviewer: 'acting-professional',
    objective: 'Bring the whole investigation into two-person work.',
    orientation: 'Scene work is where preparation meets someone else’s preparation.',
    reflection: 'What does your partner want, and how does it collide with what you want?',
    body: [
      { p: 'Everything prepared alone gets tested here: your reading of the circumstances, your objective, your actions.' },
      { key: 'Some of it will not survive contact with the other actor’s choices, and that is the process working, not failing.' },
      { p: 'A scene in which both actors manage two things rarely needs much else.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Two disciplines matter most',
        items: [
          'Know what YOU want.',
          'Genuinely watch what THEY do.',
        ] } },
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
      { p: 'A scene is built out of what two people do to each other, and most of your preparation happens with the other person absent. That is not a defect of the profession; it is the profession.' },
      { key: 'The skill is knowing what alone-time is for, and what it quietly ruins when it is misused.' },
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
      { p: 'Everything you decided alone is a hypothesis.' },
      { panel: { tone: 'sage', icon: 'target', title: 'The first pass together',
        items: [
          'It is for listening, not for showing your homework.',
          'Expect real contact to kill half of your prepared choices, and let it.',
          'The preparation was not wasted. It is what lets you notice what the other actor is actually doing, instead of clinging to what you expected.',
        ] } },
    ] },

  { id: 'ac-rehearsal', module: 'performance', order: 4,
    title: 'Rehearsal Preparation',
    requiredReviewer: 'acting-professional',
    objective: 'Arrive with the work that can only be done alone already done.',
    orientation: 'Rehearsal time is for what needs two people. Everything else is homework.',
    reflection: 'What are you hoping rehearsal will solve that you could settle tonight?',
    body: [
      { p: 'Text security, a first reading of the circumstances, an objective you are willing to test, questions you cannot answer alone: that is a well-prepared arrival. Rehearsal then spends its time on what actually requires the room.' },
      { key: 'Keep rehearsal notes as questions rather than verdicts where you can.' },
      // A third paragraph here sent the reader to "Rehearsal Notes
      // alongside your scene study" in the Actor's Studio. Removed
      // 2026-10-21: neither is reachable. 'Rehearsal Notes' appears
      // nowhere in the view layer — it was never built, not withdrawn —
      // and scene study sits behind SCENE_STUDY_LIVE, which is false.
      // The lesson's own advice to keep notes as questions survives as
      // the { key } above and the panel below, neither of which needs a
      // feature to act on. It used to say "the paragraph above": that
      // paragraph became the panel in the interiors pass, 2026-11-18.
      { panel: { tone: 'sage', icon: 'book', title: 'Notes that travel',
        items: [
          '“Why does she stay after that line?” travels into the next rehearsal.',
          '“Play this colder” does not.',
        ] } },
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
      { p: 'Use the collapse diagnostically. The Speech workspace holds the general training for each element.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Read the collapse',
        items: [
          'If clarity vanishes under pressure, that is articulation practice, not an acting problem.',
          'If the objective vanishes, that is scene work.',
        ] } },
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
      { p: 'An actor consciously managing breath, pace and beat structure while playing a scene has no attention left for the person opposite.' },
      { key: 'Trust the preparation: what practice made reliable will be there unsupervised.' },
      { panel: { tone: 'sage', icon: 'target', title: 'When something wobbles',
        items: [
          'Note it, and finish the scene with your attention where it belongs.',
          'The wobble is tomorrow’s practice, not tonight’s emergency.',
        ] } },
    ] },

  { id: 'ac-performance', module: 'performance', order: 8,
    title: 'Taking the Work Into Performance',
    requiredReviewer: 'acting-professional',
    objective: 'Carry preparation into the room without carrying a fixed performance.',
    orientation: 'The audience changes the room. The work should be able to survive that.',
    reflection: 'What are you willing to let be different tonight?',
    body: [
      { p: 'Performance adds an audience, nerves, and the fact that this run cannot be stopped.' },
      { key: 'What survives that is the work that was built on pursuit and listening rather than on a remembered shape.' },
      { p: 'Almost everything else can be rebuilt live from two things.' },
      { p: 'Nothing in Speechcraft evaluates a performance. This course prepares the work; what happens in the room belongs to you and the people you make it with.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Two things travel well',
        items: [
          'Knowing exactly what you want in each scene.',
          'Being genuinely available to your partner.',
        ] } },
    ] },

  // ── Module 2 · Script Analysis, continued ─────────────────────
  // It said "Module 4 · Building a Character" until 2026-10-21. That
  // module left this course on 2026-09-23 and these three records are
  // module 2, so the header named a module that no longer exists, above
  // lessons belonging to a different one. The records are deliberately
  // NOT reordered: the path sorts by `order`, so moving them would churn
  // the file without changing anything a learner sees.
  { id: 'ac-analysis', module: 'text', order: 1,
    title: 'Through Analysis',
    requiredReviewer: 'acting-professional',
    objective: 'Build a character from what the text gives you: the world, the facts, and what everyone says.',
    orientation: 'This work starts at the desk. You read your way to the person.',
    reflection: 'Take a character you know. What is the single fact of their world that shaped them most before the play began?',
    body: [
      { p: 'Analysis works like detective work. You read the whole play, more than once, and you collect what it actually states: the world this person lives in, what they do for a living, who they answer to, what they want out loud and what they seem to want underneath. You gather what they say about themselves, what they say about everyone else, and what everyone else says about them. Then you look for the places where those accounts disagree, because the disagreements are where the person is hiding.' },
      { p: 'You already own the tools. This module does exactly this work: facts, relationships, beats, subtext, playable actions. The Four Lists in the Library turns the reading into four concrete inventories on your own script. This lesson is not here to repeat them. It is here to point them at a new target.' },
      { p: 'Because here is the shift: those tools are usually aimed at understanding a scene. Aim them at building a person instead.' },
      { key: 'Analysis done this way does not end in notes. It ends in somebody.' },
      // The paragraph that stood here was removed on 2026-10-21. It sent
      // the reader to 'the other road' and 'the feeling road' — the two-
      // roads structure that left this course for Building a Character on
      // 2026-09-23. It had been pointing at nothing for a month. The
      // lesson now ends on 'It ends in somebody', which was always the
      // line the paragraph was walking away from. SINCE 2026-11-18 a
      // { panel } sits after it, which is what pairs the reflection into
      // the two boxes at the foot; the { key } is still the last prose.
      //
      // THE DEEPER QUESTION IS STILL OPEN: this record teaches building a
      // character from a text, which is Building a Character's subject,
      // and it reads as the ninth sibling of the eight lessons handed over
      // in September. Moving it is an owner decision, not a correction.
      { panel: { tone: 'sage', icon: 'book', title: 'Aiming the tools at a person',
        items: [
          'The world of the play tells you what shaped this character before page one.',
          'The facts tell you what they cannot escape.',
          'The gap between what they claim and what others report tells you what they are hiding, and a person is mostly made of what they are hiding.',
        ] } },
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

      // ── OWNER REMINDER, 2026-11-22: REPLACE BOTH EXAMPLES ──────────
      // Frankie asked to be reminded that the two marked-up passages in
      // this lesson are to be swapped for different ones. They are the
      // Macbeth I.7 beats-and-actions page below, and the Romeo and
      // Juliet cut further down.
      //
      // NOT CHANGED HERE ON PURPOSE. Choosing the replacement passages is
      // his call: the marks have to land on lines that genuinely turn
      // where the beat line is drawn, and that is an editorial judgement
      // about the text, not a formatting job. Logged in docs/ROADMAP.md
      // so it survives this session.
      //
      // When the new passages arrive, only the `rows` change. The `key`
      // and `note` are about the notation rather than the play, and the
      // markup block renders whatever rows it is given.
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
      { key: 'A mark you cannot read at speed is worse than no mark, because it stops you.' },
      { p: 'If you have to work out what your own page means, the page has become another thing to act around.' },
      { panel: { tone: 'sage', icon: 'book', title: 'Marking the margin',
        items: [
          'The margin takes what is not a mark: a fact you looked up, a question you cannot answer yet, the thing you noticed on the fourth read.',
          'Date the notes that are decisions, so you know whether one is from before or after the director changed something.',
          'Mark a cut so you can still read what is under it. Cuts get restored more often than anyone expects.',
        ] } },
    ] },

  { id: 'ac-ownmarks', module: 'text', order: 3,
    title: 'Finding Your Own Marks',
    requiredReviewer: 'acting-professional',
    objective: 'Build a marking system you will actually keep using, from what you keep needing.',
    orientation: 'The right system is the one that survives a week of rehearsal without being abandoned.',
    reflection: 'Think back to the last thing you performed. What did you keep forgetting? That is the thing your system has to hold.',
    body: [
      { p: 'Actors who have been doing this a long time mark very differently from one another, and the differences are not arbitrary. They come from what each person keeps losing. Somebody who forgets why they are in the room writes objectives at the top of every page. Somebody who rushes marks breath and nothing else. Somebody who goes up on lines marks only the cue words.' },
      { key: 'The system is a record of a weakness, which is why copying someone else’s rarely holds.' },

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
      { p: 'When a production ends, the page you kept is a record of how you solved that part, and it is worth reading again before you solve the next one.' },
      { panel: { tone: 'sage', icon: 'book', title: 'Keeping the page usable',
        items: [
          'Use pencil for anything a director might change.',
          'Keep the marks that are yours separate from the marks that came from the room.',
        ] } },
    ] },
  { id: 'ac-dials', module: 'rhythm', order: 1,
    title: 'Two Dials, Not One',
    requiredReviewer: 'acting-professional',
    objective: 'Separate tempo from rhythm, and know which one is wrong.',
    orientation: 'Most actors have one word for speed and use it for two different things. That is one control for two dials.',
    reflection: 'Take a speech you know well. Is the problem its speed, or the pattern inside the speed?',
    body: [
      { p: 'Tempo is how fast you are going. Rhythm is the pattern inside the speed, the long and the short of it.' },
      { key: 'Tempo and rhythm are separate dials and they turn separately.' },
      { p: 'Fast and smooth is one thing. Fast and jagged is a different animal. Slow and steady, slow and broken: four states, two dials.' },
      { fig: 'rhythm-dials' },
      { p: 'Why care? Because the repairs are different. Wrong tempo, change the speed. Wrong rhythm, and changing the speed just hauls the same bad pattern along at a new rate. You have heard the note a hundred times: pick up the pace. And the scene did not get better, did it? Because the scene was dragging in its rhythm, and nobody touched that dial.' },

      { h: 'The four states, with people in them' },
      { p: 'Say them out loud and you will recognise everybody you have ever worked with.' },
      { defs: [
        { label: 'Slow and even', text: 'A judge summing up. A priest at a graveside. Somebody choosing every word because the wrong one would cost them. Nothing hurried and nothing broken.' },
        { label: 'Slow and broken', text: 'Somebody working it out while they speak, or lying and not enjoying it. Unhurried overall, and stalling and restarting inside that.' },
        { label: 'Fast and even', text: 'A briefing. A pitch that has been given four hundred times. Quick, regular, frictionless, and very often a way of not being interrupted.' },
        { label: 'Fast and broken', text: 'Panic. Interruption. Somebody whose thoughts are arriving faster than their mouth can sort them.' },
      ] },
      { p: 'Two of those four are fast and they have nothing else in common. That is the entire argument for the second dial.' },

      { h: 'Which dial is wrong' },
      { p: 'This is the part you can use tonight, because almost no note tells you which one it means.' },
      { list: [
        'The scene feels slow and you cannot find a single slow line: it is the rhythm. Everything is arriving at the same length.',
        'The scene feels rushed but every line is landing: it is the tempo. Take it down and leave the pattern alone.',
        'You have picked up the pace twice and it has not helped: stop turning that dial. It is the other one.',
        'The speech is right and the body is wrong, or the reverse: two dials on two instruments, and the most common version of all.',
      ] },

      { h: 'A drill that proves you have both' },
      { p: 'Take eight lines you know cold. Run them fast and even. Then fast and broken. Then slow and even, then slow and broken. Same words, same objective, four different people.' },
      { key: 'If two of the four come out sounding the same, that is the dial you do not have yet.' },

      { panel: { tone: 'sage', icon: 'mask', title: 'Three traps, so you can spot yourself in them',
        items: [
          'The actor whose body is rhythmic and whose speech is not, or the reverse.',
          'The actor with one rhythm for every role, always recognizably themselves in a different coat.',
          'The actor who nails the metre perfectly with nothing alive underneath it.',
        ] } },
    ] },
  { id: 'ac-feeling', module: 'rhythm', order: 2,
    title: 'Rhythm Reaches Feeling',
    requiredReviewer: 'acting-professional',
    objective: 'Use tempo-rhythm as a way into feeling.',
    orientation: 'You cannot order a feeling to show up. You can set a speed. That loophole is the whole trick.',
    reflection: 'What circumstance would make your character move at the speed you have given them?',
    body: [
      { p: 'There are three doors into an actor.' },
      { key: 'Text reaches the mind. Objective reaches the will. And tempo-rhythm reaches the feelings, which answer to nobody.' },
      { p: 'Try commanding yourself to dread something. Nothing happens. Now set the rhythm of dread, the caught breath, the too-still hands, and give it a minute. The feeling walks in on its own, behind the rhythm, like it was invited.' },
      { p: 'But it does not work empty. Give it a circumstance to sit on and the two start feeding each other: the situation shapes the rhythm, and the rhythm starts showing you corners of the situation you had not imagined yet.' },
      { p: 'And never mistake speed for meaning. A march, a stroll and a funeral can move at exactly the same tempo and share nothing else on earth.' },

      { h: 'How you actually find one' },
      { p: 'Not by naming the feeling and waiting. By finding the body it lives in, and that is a shorter list than it sounds: where the breath sits, what the hands have stopped doing, how long you can bear a silence before filling it, how far you move on each impulse.' },
      { defs: [
        { label: 'Dread', text: 'The caught breath. The too-still hands. A long wait before anything at all, and then not much.' },
        { label: 'Elation', text: 'Breath high and quick, movement starting before the thought has finished, no waiting anywhere.' },
        { label: 'Grief, the real kind', text: 'Very slow and very even, with almost no gesture. The performed kind is broken and busy, which is how you can tell them apart from the back row.' },
        { label: 'Cornered', text: 'Fast and broken, with sudden stops where the person checks whether they have just given themselves away.' },
      ] },
      { p: 'Set one of those running for a full minute, honestly, with the circumstance underneath it. Then stop arranging it and see what turns up.' },

      { h: 'Where it fails' },
      { p: 'It fails when it is used as a machine for producing feeling to order, which is exactly what it looks like from outside. The rhythm is a door, not a generator. Set one with no circumstance under it and you get the shape of the feeling with nothing inside, and an audience reads that as technique, which is the kindest available word for it.' },
      { key: 'The rhythm opens the door. The circumstance is what walks through it.' },

      { panel: { tone: 'sage', icon: 'lamp', title: 'If the rhythm is not going anywhere',
        items: [
          'A rhythm with nothing behind it is drumming on a table.',
          'When a rhythm feels arbitrary, you are not missing a better rhythm.',
          'You are missing the circumstance that would make this one inevitable.',
        ] } },
    ] },
  { id: 'ac-tworhythms', module: 'rhythm', order: 3,
    title: 'Two Rhythms at Once',
    requiredReviewer: 'acting-professional',
    objective: 'Mark an inner and an outer rhythm on the same speech, and play the gap between them.',
    orientation: 'A person hiding something runs two rhythms at once. The gap between them is what the audience is actually reading.',
    reflection: 'Where in your script is your character calmer on the outside than on the inside?',
    body: [
      { p: 'Watch anyone waiting on terrible news. The body is stone. Inside, the pulse is sprinting. Watch a good liar: the speech is even, almost bored, and underneath it every gear is screaming.' },
      { key: 'Inside and outside do not match, and most of the time they should not, because the distance between them is where the performance lives.' },
      { fig: 'rhythm-two' },
      { p: 'Better yet, the two rhythms push on each other. The harder you clamp the outside steady, the faster the inside runs, and the faster the inside runs, the harder the outside is to hold.' },
      { p: 'One mind can split the same way, resolve at one speed and doubt at another, both running at once.' },

      { h: 'The text usually tells you where' },
      { p: 'You are not hunting for these. Writers put them where they want them, and they leave fingerprints.' },
      { list: [
        'A character who is being asked a direct question and answers a different one.',
        'Short, flat, polite lines in a scene that is anything but polite.',
        'Any line that a stage direction describes as calm, quiet or pleasant.',
        'A character who has just learned something and does not mention it.',
        'Anybody waiting for somebody else to leave.',
      ] },

      { h: 'Building them' },
      { p: 'Set the outside first, because it is the one you are choosing, and it has to be holdable for the length of the scene. Then set the inside running and leave it alone. The mistake is to play the inside, which is how actors end up signalling the secret they are supposed to be keeping.' },
      { key: 'Play the outside. Let the inside leak.' },
      { p: 'What the audience reads is the cost of holding the outer rhythm steady, and that cost shows in the places you are not managing: a hand, the length of a breath, how long it takes you to answer, a word that comes out slightly too fast and is immediately corrected.' },

      { h: 'Two ways it goes wrong' },
      { defs: [
        { label: 'One rhythm', text: 'The outside and the inside match, so the scene plays as honest and goes flat. Usually because the actor decided what the character is feeling and then showed it.' },
        { label: 'Both played', text: 'The outside is calm and the actor keeps showing you the inside anyway, in case you missed it. Now there is no secret and no gap, just an actor doing two things at once.' },
      ] },

      { panel: { tone: 'sage', icon: 'target', title: 'When a scene feels flat',
        items: [
          'If every other thing about it checks out, look here first.',
          'You have probably given the character one rhythm in a moment that is begging for two.',
          'Do not solve that loop. Play it. It plays beautifully.',
        ] } },
    ] },
  { id: 'ac-harmony', module: 'rhythm', order: 4,
    title: 'Harmony, Not Unison',
    requiredReviewer: 'acting-professional',
    objective: 'Hear a scene as separate rhythms sounding together.',
    orientation: 'Two people in the same rhythm are singing in unison. A scene almost never wants unison.',
    reflection: 'In this scene, are you in harmony with the other character or in unison? If it is unison, did you choose it?',
    body: [
      { p: 'Everybody in a room is running their own rhythm. When a group truly shares one, that is unison, and unison is a special effect: soldiers on parade, a chorus, a mob with one idea in its head. The sameness is the point there. A scene is not built like that.' },
      { key: 'A scene is harmony: different lines, sounding at the same time.' },
      { p: 'Think about what a chord is. Different notes. Two players on the same note are not making a chord, they are making one note louder. What the audience actually receives from two characters is the interval between them, and here is the thing about the interval: nobody plays it. You hold your line, the other actor holds theirs, and the music happens in the space neither of you owns.' },
      { fig: 'rhythm-harmony' },
      { p: 'Some intervals sit sweet. Some grate. Both are music, so a scene where two rhythms refuse to settle is not a scene going wrong.' },

      { h: 'What the interval is made of' },
      { p: 'It is not mystical and you can list it. Everything in this list is something an audience can hear without being able to name.' },
      { list: [
        'Who is quicker to answer, and by how much.',
        'Who finishes their thoughts and who abandons them halfway.',
        'Whose lines are getting longer across the scene and whose are getting shorter.',
        'Who is comfortable in a silence, and who cannot leave one alone.',
        'Who changes pace when the subject changes, and who does not notice it changed.',
      ] },

      { h: 'Holding your own line' },
      { p: 'The practical difficulty is that rhythm is contagious. Spend four hours in a room with somebody and your pace drifts towards theirs without either of you deciding anything. That is fine at a read-through and fatal by the third week.' },
      { key: 'Your rhythm comes from your character\u2019s circumstances, not from the pace of the person opposite you.' },
      { p: 'If your character is in a hurry and theirs is not, you stay in a hurry. Matching them is not generosity, it is the scene quietly losing its only engine.' },

      { h: 'When unison is right' },
      { p: 'Sometimes it is exactly the point, and then it should be chosen rather than arrived at: two people who have been married for forty years finishing each other\u2019s rhythm, a crowd that has become one thing, a pair who have just agreed something and are briefly in step. Played deliberately, unison is powerful because the audience has spent the whole evening hearing intervals and suddenly there are none.' },

      { panel: { tone: 'sage', icon: 'mask', title: 'The thing to fear is accidental unison',
        items: [
          'A scene rehearsed until everybody has drifted onto one polite shared pace.',
          'It sounds tidy. It sounds finished. It sounds nothing like people.',
        ] } },
    ] },
  { id: 'ac-rests', module: 'rhythm', order: 5,
    title: 'Notes and Rests',
    requiredReviewer: 'acting-professional',
    objective: 'Treat pauses as part of the rhythm, not gaps in it.',
    orientation: 'Syllables are the notes. Pauses are the rests. And a rest is written into the music. It is not the music stopping.',
    reflection: 'Which of your pauses are carrying something? Which are just waiting?',
    body: [
      { p: 'Speech is time, divided. Words take some of it, pauses take the rest, and both of them carry rhythm. Long sounds, short sounds, hard stresses, soft ones. That is the entire toolkit, and every rhythm anyone has ever spoken was built out of it.' },
      { p: 'Here is the failure you already know: the dead pause. The silence where the rhythm just drops. You feel the thread snap, the audience feels it snap, and the next line has to start the engine cold. The fix costs nothing to describe and takes real practice to own.' },
      { key: 'The rhythm never stops. Only the sound does.' },
      { fig: 'rhythm-rests' },
      { p: 'That same count is your bridge between phrases that do not share a rhythm, which in prose is most of them. One phrase runs long, the next is three words, each has its own shape.' },

      { h: 'Verse makes the count visible' },
      { p: 'A line of pentameter is five feet, and a foot is a beat: da DUM, five times. Say it and you can feel where the count is, which is why the diagram above uses verse rather than prose. Prose has exactly the same count running under it. Verse is just the case where somebody wrote it down for you.' },
      { quote: 'But soft, what light through yonder window breaks' },
      { p: 'Ten syllables, five beats, and then the line stops. The beat does not. Whatever you do in the silence after breaks, beat six is arriving whether you use it or not, and the audience can feel whether you are in it or have fallen out of it.' },

      { h: 'Four kinds of silence, and only one of them is dead' },
      { defs: [
        { label: 'The held rest', text: 'The count runs, you are still pursuing the thing, and the silence is doing work. It reads as a decision.' },
        { label: 'The filled rest', text: 'Something physical happens in it: a look, a step, a hand that stops. The count is carried by the body instead of the voice.' },
        { label: 'The caught rest', text: 'The silence happens TO the character, because something landed. Often the best moment in a scene.' },
        { label: 'The dead pause', text: 'The count drops. The thread snaps, the audience feels it snap, and the next line has to start the engine from cold.' },
      ] },

      { h: 'Dynamics, which is the same idea wearing a different hat' },
      { p: 'Musicians have a word for the other half of this. A phrase is not only long and short, it is loud and soft, and the two work together: a long quiet phrase and a long loud phrase are different rhythms even at an identical tempo. Actors tend to have one dial here too, and it is usually volume. Try varying the ATTACK instead, which is how hard a phrase begins, and leave the volume alone. A soft phrase begun hard is one of the most useful sounds available to an actor, and almost nobody uses it.' },

      { panel: { tone: 'sage', icon: 'target', title: 'Keep the count running',
        lead: 'Two places it does the work.',
        items: [
          'Under the pause: keep a silent count going, so the rhythm never stops and only the sound does.',
          'Across the joins: do not iron two phrases into one measure. Let the count carry you over.',
        ] } },
    ] },
  { id: 'ac-speeds', module: 'rhythm', order: 6,
    title: 'The Two Missing Speeds',
    requiredReviewer: 'acting-professional',
    objective: 'Build true slow speech and true fast speech.',
    orientation: 'Most stage speech is neither slow nor fast. It is long pauses with the words rushed out in between. Two speeds are missing.',
    reflection: 'Can you say your hardest line at half speed without it dying, and at double speed without it turning to mush?',
    body: [
      { p: 'True slow is hard because slow wants to die. The words drift apart, the line stalls, restarts, and now the audience can hear the machinery. What keeps a slow line alive is sound, not silence. Let the vowels carry. Keep the line sounding all the way through its length instead of chopping it into pieces with air between them.' },
      { p: 'True fast is a separate discipline, and it is not rushing.' },
      { key: 'Fast is built out of slow.' },
      { p: 'Take the passage at a crawl, slower than you will ever perform it, every consonant finished like you are being paid by the consonant. Repeat until your mouth knows it without you. Then, and only then, accelerate. Speed built any other way turns to mush, and it turns to mush at exactly the moment you most need every word to land.' },
      { fig: 'rhythm-speeds' },

      { h: 'Why stretched slow is not slow' },
      { p: 'Watch the second row of the diagram. The words themselves are ordinary length and the gaps are enormous, which is what most actors produce when they are asked to slow down. It is not slower speech. It is normal speech with holes in it, and every hole is a place for the line to die.' },
      { p: 'True slow is a longer SOUND, not a longer silence. The vowels take the time, the line keeps sounding from one end to the other, and the thought stays joined up while it crosses. Try it on one sentence: hold every vowel twice as long as feels sensible and do not lengthen a single gap. It will feel absurd and it will sound, from outside, like somebody who means it.' },

      { h: 'Building fast, in four passes' },
      { p: 'Fast is built out of slow, and the order never changes. Each pass has a job and skipping one is why the mush arrives.' },
      { olist: [
        'Crawl it. Slower than any performance, every consonant finished, no expression at all. You are teaching your mouth, not acting.',
        'Crawl it again until you stop having to think about the hard joins. There are usually three or four, and they are where the speed will break later.',
        'Take it to a brisk, even conversational pace. Still no colour. If a word blurs, you are not ready and the crawl was too short.',
        'Only now play it. The speed is already in your mouth, so the attention is free for the person you are talking to.',
      ] },
      { key: 'If it turns to mush at speed, the answer is always to go back to the crawl. It is never to try harder at speed.' },

      { h: 'What each speed costs the audience' },
      { p: 'Slow buys weight and spends patience. Fast buys pressure and spends comprehension. Both of those are real prices and both are worth paying in the right place, which is why the next line of this lesson is the one that matters most.' },
      { p: 'Last thing. Both speeds need a reason to exist.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Neither speed is free',
        items: [
          'Slow with no reason behind it is pompous.',
          'Fast with no reason behind it is a party trick.',
          'Circumstance first, speed second. That order never flips.',
        ] } },
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
      { p: 'Being off book is job requirement number one, and it earns that spot twice over. Professionally, it is simply the minimum: an actor holding a script in week three is a problem everyone else in the room now has to manage. Craft-wise, it is the key that unlocks everything.' },
      { key: 'Text you own completely is text you no longer think about, and the attention it frees is what lets you play, choose, and discover.' },
      { p: 'Notice what the room can do when you are off book and what it cannot do when you are not. Off book, you can look the other actor in the eye, take a note and apply it on the next pass, try a completely different choice on a whim. On book, every one of those doors is closed, because a piece of your head is still reading.' },
      { p: 'There is no shortcut and no substitute.' },
      { panel: { tone: 'sage', icon: 'target', title: 'How the text gets owned',
        items: [
          'Drill the lines until they are boring. Boring is the goal: words so automatic they cost you nothing.',
          'What you save on remembering, you spend on acting.',
        ] } },
    ] },
  { id: 'ac-pro-choices', module: 'professional', order: 3,
    title: 'Make Choices, Never Ask Permission',
    requiredReviewer: 'acting-professional',
    objective: 'Understand that making choices is the service you were hired to provide.',
    orientation: 'The director did not hire you to ask what to do. The director hired you so there would be one less thing to do.',
    reflection: 'In your last rehearsal, how many choices did you offer before anyone asked you for one?',
    body: [
      { p: 'Your job is to walk in already carrying an idea of who this person is, built from the research and preparation you did before you showed up, and then to make choices based on that knowledge.' },
      { p: 'Think about hiring any other professional. If you hired a chef and they kept asking you how to prepare each ingredient, when to season, whether they were allowed to make every small decision, you would start wondering why you hired them. Their uncertainty would slow the whole kitchen down and force you to do their job for them. An actor who waits to be told is that chef.' },
      { key: 'A wrong choice, made fully, is useful: the director now knows something about the scene and can steer.' },
      { p: 'No choice teaches nobody anything, and it quietly hands your job to someone who already has their own. Bring the person into the room. That is what the call time is for.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Walk in carrying the choice',
        items: [
          'Never wait for a director to ask you for a choice.',
          'Never ask whether you are allowed to try something.',
          'Make the choice, offer it, and let the room respond to something real.',
        ] } },
    ] },
  { id: 'ac-pro-notes', module: 'professional', order: 4,
    title: 'Taking a Note',
    requiredReviewer: 'acting-professional',
    objective: 'Receive direction like a professional: take it, apply it, move on.',
    orientation: 'A note is not a criticism of you. It is information about the show.',
    reflection: 'Think of the last note you resisted. What was it protecting?',
    body: [
      { p: 'When a note comes, take it. The director watched it and wants something different; your account of your intentions changes nothing about what the audience will see.' },
      { key: 'Say thank you, and thank you is a complete sentence.' },
      { p: 'Then actually apply it, visibly, on the next pass. A note applied fast tells the room you are steerable, and steerable actors get hired again.' },
      { p: 'Applying a note is not surrendering your character. You built the person; the note adjusts the person; you are the one who knows how to make the adjustment true. That is the difference between a puppet and a professional.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Taking a note',
        items: [
          'Do not defend the old choice, do not explain what you were going for, do not relitigate the scene.',
          'A note that vanishes into a nod and never appears in the work is worse than arguing, because now the director wonders whether you listened at all.',
          'Take the note INTO the character you built rather than dropping the character to obey it.',
        ] } },
    ] },
  { id: 'ac-pro-early', module: 'professional', order: 5,
    title: 'Early Is On Time',
    requiredReviewer: 'acting-professional',
    objective: 'Run your rehearsal conduct so the room never has to think about you.',
    orientation: 'Early is on time. On time is late. Late is unacceptable.',
    reflection: 'What time do you actually arrive, measured honestly against your last three calls?',
    body: [
      { p: 'Say it again, because it runs the whole working life.' },
      { key: 'Early is on time, on time is late, and late is unacceptable.' },
      { p: 'Walking in at the call time means the room is now waiting while you take off your coat, find your script and settle. Walking in early means that at the call time you are already warmed, ready and reachable. One of those people gets remembered fondly.' },
      { p: 'The rest of rehearsal etiquette is the same idea wearing different clothes: make yourself easy to work with.' },
      { p: 'None of this is servility. It is craft applied to the workplace. The same discipline that gets you off book gets you in the building twenty minutes early, and the room can feel both.' },
      { panel: { tone: 'sage', icon: 'book', title: 'Make yourself easy to work with',
        items: [
          'Pencil, never pen, because blocking changes.',
          'Mark your script so the same question never gets asked twice.',
          'Know whose room it is, and it is not yours.',
          'Keep your problems small and your solutions ready.',
        ] } },
    ] },
  { id: 'ac-pro-director', module: 'professional', order: 6,
    title: 'What a Director Actually Wants',
    requiredReviewer: 'acting-professional',
    objective: 'Bring options and solutions, not questions and problems.',
    orientation: 'The director has a hundred fires. Do not be the hundred and first.',
    reflection: 'Last time something was wrong in a scene, did you bring the problem or the solution?',
    body: [
      { p: 'What a director wants from you is simple to say: options, preparedness, and going full out. This is no time to be shy. Now the director’s job is choosing, which is fast and pleasant, instead of inventing your performance for you, which is slow and is not their job.' },
      { p: 'When something is wrong, report it WITH a proposed fix. A costume that blocks the cross, a prop that will not open, a line that fights the blocking: fine, say so, and in the same breath say what you would do about it. A problem plus a solution is collaboration.' },
      { key: 'A problem alone is a task you just assigned to a person with a hundred of them.' },
      { p: 'And learn each director’s language fast. Some speak in images, some in actions, some in results, and the actors who translate quickly are the ones every director calls again.' },
      { panel: { tone: 'sage', icon: 'target', title: 'What to bring, and what to carry',
        items: [
          'Arrive with two or three real ways the scene could go, played fully enough to judge.',
          'Translating their note into your process is your work, not theirs.',
        ] } },
    ] },
  { id: 'ac-pro-audition', module: 'professional', order: 1,
    title: 'The Audition Is the Job',
    requiredReviewer: 'acting-professional',
    objective: 'Treat the audition as a demonstration of what hiring you is like.',
    orientation: 'They are not only casting the role. They are casting the weeks of work that come with you.',
    reflection: 'In your last audition, what did your behavior tell them about week three of rehearsals with you?',
    body: [
      { p: 'An audition shows two things, and the scene is only one of them. The other is what you are like to work with: prepared or scrambling, off book or buried in the pages, adjustable or brittle when they throw you a change.' },
      { key: 'Every behavior in that room is a free sample of every rehearsal you would ever have together.' },
      { p: 'So run the audition the way you would run the job. When they redirect you, and they often redirect you just to see what happens, take the note visibly and completely, because that moment is the whole interview. They may not remember your reading. They will remember whether you could change.' },
      { p: 'Then leave it in the room. The audition is the work; the booking is the weather.' },
      { panel: { tone: 'sage', icon: 'target', title: 'Run it the way you would run the job',
        items: [
          'Fully prepared, choices made, person built.',
          'Treat every audition as a finished performance, given freely. You walk out intact either way, and walk in better next time.',
        ] } },
    ] },
  { id: 'ac-pro-stageset', module: 'professional', order: 7,
    title: 'Stage and Set Are Different Countries',
    requiredReviewer: 'acting-professional',
    objective: 'Know how the job changes when the medium changes.',
    orientation: 'Same craft, different physics. Visit both like a local.',
    reflection: 'Which country are you a local in? What would the other one charge you at the border?',
    body: [
      { p: 'On stage, the performance is built by repetition and then given whole, live, hundreds of times, reaching the back row every night.' },
      { p: 'On set, everything is inverted. The performance is assembled from takes, out of order, with the climax possibly shot before the meeting scene. The camera stands where the back row used to be, so the work that reached fifty meters now needs to reach one, and continuity means your coffee cup is in the same hand every time.' },
      { p: 'Neither is the senior service. An actor who can fill a house and then, the next month, do almost nothing in a close-up and have it read, is not doing two jobs.' },
      { key: 'They are doing one job with the volume knob under their control, and that knob is a professional skill in itself.' },
      { panel: { tone: 'sage', icon: 'mask', title: 'The discipline each one asks for',
        items: [
          'On stage, consistency: hitting the mark, the light and the laugh the same way twice a night for two months without letting it go dead.',
          'On set, freshness in fragments: take twelve must be as alive as take one.',
        ] } },
    ] },
  { id: 'ac-pro-reputation', module: 'professional', order: 8,
    title: 'Your Reputation Is the Career',
    requiredReviewer: 'acting-professional',
    objective: 'Understand that the long game is being the person people want in the room.',
    orientation: 'Talent gets you noticed. Reputation gets you rehired.',
    reflection: 'If the stage manager from your last job were asked about you, what two words would they use?',
    body: [
      { p: 'The industry is smaller than it looks, and it talks. Directors trade names, stage managers remember everything, and casting keeps lists that never get shown to anyone.' },
      { key: 'Ten years in, most work arrives because somebody in a room said the sentence: they were great, and they were easy.' },
      { p: 'Both halves of that sentence are earned on every job, including the small ones. Especially the small ones.' },
      { p: 'Easy does not mean silent, and it does not mean agreeing with everything. It means prepared, on time, choice-making, note-taking, problem-solving: everything in this collection, practiced until it is just what you are like. Difficult and brilliant works for a very short list of people, and the list is shorter than the people on it think.' },
      { p: 'Here is the compounding effect nobody explains early enough.' },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Play the long game',
        items: [
          'Every room you are good in produces three people who will say your name in rooms you have never entered.',
          'The role ends. The reputation is the career.',
        ] } },
    ] },
];

// THE WITHDRAWAL, in two of its three filters (owner order, 2026-10-25).
// Same shape as Building a Character's ROLE_LIVE, deliberately: a reader who
// knows one knows both.
//
// Everything downstream imports these names and not the _ALL arrays, so the
// module and its eight lessons are absent from the course rather than hidden
// by each consumer. Nothing had to learn about the flag.
//
// 'ac-fourthwall' is NOT filtered — it carries module: 'work' now, so it
// passes the lesson filter on its own and needs no exception here.
//
// THESE SIT ABOVE THE HELPERS ON PURPOSE. The three accessors below read
// ACTING_LESSONS and ACTING_MODULES, and while an arrow body would not
// evaluate them until call time, a `const` read above its own declaration is
// a temporal-dead-zone throw waiting for the first module-evaluation-time
// caller. There is no Node on this machine to catch that, so the order is
// the proof.
export const ACTING_MODULES = ACTING_MODULES_ALL
  .filter(m => PERFORMANCE_LIVE || m.id !== 'performance');
export const ACTING_LESSONS = ACTING_LESSONS_ALL
  .filter(l => PERFORMANCE_LIVE || l.module !== 'performance')
  .filter(l => ANALYSIS_LIVE || l.id !== 'ac-analysis');

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
const ACTING_COLLECTIONS_ALL = [
  // Same order the Learn module teaches: Being Off Book first. The shelf
  // and the pathway must not disagree about what comes first.
  // EVERY SHELF CARRIES ITS MODULE'S NAME (owner order 2026-10-21). Each
  // of these five holds exactly one Learn module's lessons, in the same
  // order — verified, not assumed — so a shelf with a different name meant
  // the same seven lessons answered to two names depending on which page
  // you were on, and a reader finishing the shelf had no way to know they
  // had finished module 1.
  //
  // 'Acting Principles' also had the exact flaw module 1 was renamed to
  // escape on 2026-09-26: it described the whole course rather than this
  // module. The module was fixed that day and its shelf was not.
  //
  // THE IDS DO NOT MOVE — 'principles', 'listening', 'scene', 'rhythm',
  // 'rehearsal' are storage, and renaming one would strand saved state.
  // 'ac-fourthwall' joined this shelf on 2026-10-25, the same day it joined
  // the module. Every collection mirrors one Learn module, so a lesson that
  // moves module has to move shelf or the shelf and the path disagree about
  // what the chapter is — the fix made here on 2026-09-16, the other way
  // round.
  { id: 'principles', icon: '🎯', title: 'Where Behavior Comes From',
    lessons: ['ac-offbook', 'ac-behavior', 'ac-circumstances', 'ac-objective',
              'ac-obstacle', 'ac-stakes', 'ac-urgency', 'ac-physicalscore',
              'ac-fourthwall'] },
  // Module 3 gets its own shelf (owner order, 2026-09-17): every
  // collection now mirrors one Learn module.
  // 'and', not '&', to match the module exactly: the house writes it out.
  { id: 'listening', icon: '👂', title: 'Listening and Responding',
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
  //
  // WITHDRAWN WITH ITS MODULE behind PERFORMANCE_LIVE (owner order,
  // 2026-10-25). The id 'rehearsal' is storage, so the record stays and the
  // filter below removes it; renaming or deleting it would strand saved
  // state. 'ac-fourthwall' left this list the same day — it is the one
  // lesson kept, and it shelves with module 'work' now.
  //
  // The note that used to sit here said: if module 5 is ever split, it holds
  // nine lessons doing two jobs. It was withdrawn rather than split.
  { id: 'rehearsal', icon: '🎬', title: 'Preparing the Performance',
    lessons: ['ac-actions', 'ac-monologue', 'ac-scene', 'ac-twohander',
              'ac-rehearsal', 'ac-integrating', 'ac-applying',
              'ac-performance'] },
  { id: 'professional', icon: '💼', title: 'The Professional Actor',
    lessons: ['ac-pro-audition', 'ac-pro-offbook', 'ac-pro-choices', 'ac-pro-notes',
              'ac-pro-early', 'ac-pro-director', 'ac-pro-stageset', 'ac-pro-reputation'] },
  { id: 'rhythm', icon: '🎼', title: 'Tempo-Rhythm',
    lessons: ['ac-dials', 'ac-feeling', 'ac-tworhythms', 'ac-harmony', 'ac-rests',
              'ac-speeds'] },
];

// The third filter. The Library shelf goes with its module, the way
// Character's role card goes with ROLE_LIVE; the id 'rehearsal' is storage,
// so the record stays and this removes it.
export const ACTING_COLLECTIONS = ACTING_COLLECTIONS_ALL
  .filter(c => PERFORMANCE_LIVE || c.id !== 'rehearsal')
  // The fourth filter, and it works on the INSIDE of a shelf rather than
  // on the shelf itself: Script Analysis still exists, with one fewer
  // lesson on it. A collection that lists an id the course no longer
  // exports would render a row that opens nothing.
  .map(c => (ANALYSIS_LIVE || !c.lessons.includes('ac-analysis')
    ? c
    : Object.assign({}, c, { lessons: c.lessons.filter(id => id !== 'ac-analysis') })));

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
