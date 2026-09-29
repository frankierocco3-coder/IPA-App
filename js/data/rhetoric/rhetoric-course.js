// Rhetoric — the sixth workspace, and its own course.
//
// Owner decision 2026-09-28: a separate workspace, like Acting, Building a
// Character and Shakespeare, not a module inside one of them.
//
// WHY IT IS SEPARATE AND NOT PART OF SHAKESPEARE. The Shakespeare course
// already has a three-lesson Rhetoric module, and it stays: that module is
// rhetoric AS SHAKESPEARE USES IT, aimed at a verse speech an actor has to
// play tonight. This course is the craft itself, which an actor needs for
// a modern audition speech, a director needs for a note, and a person
// needs for a wedding toast or a resignation. The two point at each other
// rather than repeating each other, and where they overlap this one is the
// general case.
//
// NOT TO BE CONFUSED WITH `RHETORIC_LIVE` in js/main.js. That flag hides a
// READING PATHWAY of three Plato dialogues (Gorgias, Phaedrus, Republic)
// and has nothing to do with this course. The course flag is
// RHETORIC_COURSE_LIVE in js/views/context.js. Two different things, two
// different names, on purpose.
//
// THE FIGURES ARE ALREADY WRITTEN. js/data/shakespeare/rhetoric.js holds
// seventeen figures with verified examples, shelved here as The Shapes of
// Argument since 2026-09-28. Module 4 teaches what a figure IS and sends
// the reader to that shelf rather than restating it, which is why it is
// six lessons and not seventeen. Note what the shelf does NOT hold:
// metaphor, which is why rh-metaphor is a lesson rather than a pointer.
//
// REVIEW: every lesson here is a draft until a human records it in
// js/data/speech/reviews.js. Required reviewer is 'rhetoric' — a
// knowledgeable rhetoric or oratory reviewer — which is the reviewer type
// that ledger already defines. Claude may write these and may never
// approve them.

// REVISED 2026-09-29. It used to open "Persuasion is not something done to
// a person", which contradicted the app's own preface three screens away:
// that says plainly that speech is an action performed upon somebody. Both
// cannot be true, and the preface is right. What distinguishes honest
// persuasion is not that nothing is being done, it is what the person is
// left able to do afterwards.
export const RHETORIC_PRINCIPLE =
  'Ethical persuasion is not merely something done to a person. It makes your reasons available while leaving them able to examine those reasons, question them and refuse them, and the same craft that does it honestly is the craft that does it dishonestly.';

// ── Before You Begin ──────────────────────────────────────────
// The warning, shown once on the first visit to Rhetoric and readable any
// time from the Library. Owner order 2026-09-29.
//
// It is NOT a lesson: it carries no objective, no reflection and no ledger
// entry, because it is not making a claim about rhetoric that a reviewer
// would sign. It is the condition on using the shelves, and it has to be
// readable before anything is approved, which a gated lesson could not be.
//
// The three speakers are the point. The course cannot tell them apart for
// a reader and does not pretend to; what it can do is say that the tools
// work identically for all three, which is the fact the whole subject has
// been accused of ever since Athens.
export const RHETORIC_THRESHOLD = {
  title: 'Before You Begin',
  lead: 'This course teaches how speech moves people. That knowledge does not arrive with a conscience attached, and it is worth being plain about that before you take any of it.',
  speakers: [
    { h: 'The speaker who knows',
      p: 'They say what they have actually examined. Their confidence is earned, it matches what they understand, and it can be checked by anybody who cares to. When they reach for a technique, the technique is carrying something true to somebody who did not have it.' },
    { h: 'The speaker who is certain',
      p: 'They speak past the edge of what they know, and they are not lying. They have mistaken the feeling of being sure for the fact of being right, which everybody does. Everything in this course makes them more convincing without making them any more correct.' },
    { h: 'The speaker who is working you',
      p: 'They understand exactly how an audience moves, and they use that to stop the audience examining anything. This is the speaker rhetoric has been accused of producing since the subject was invented, and the accusation is not unfair: the craft does produce them.' },
  ],
  hard: 'From the outside, at speed, in a room, the three are frequently indistinguishable. That is the problem, and no technique in this course solves it. The tools work identically for all three.',
  emotion: [
    'Emotion grounded in knowledge deepens understanding. It makes a consequence real enough to act on, and without it a true argument frequently moves nobody at all.',
    'Emotion covering an absence of knowledge replaces understanding. It supplies the certainty the evidence did not, and it feels, to everybody present, exactly like the first one.',
    'Same feeling in the room. Opposite function. Telling them apart in yourself, before you worry about anybody else, is most of what this course is for.',
  ],
  condition: 'You can skip all of it and use the shelves. The figures and the fallacies are open to anybody who opens them. But knowing how a thing works on people is not a neutral possession, and there is only one honest condition on holding it: whatever you learn to do to somebody, be willing to have it done to you.',
};

// Six modules. Modules 1 to 4 are written; 5 and 6 are outlined and carry
// no lessons yet, which is why the shelf shows four collections.
// RHETORIC_COLLECTIONS filters to modules that actually have lessons, so a
// module joins the Library by being written and never before.
export const RHETORIC_MODULES = [
  { n: 1, id: 'ground', title: 'What is Rhetoric?',
    blurb: 'The word, the reputation it lost, and the three questions every persuasive speech answers.' },
  { n: 2, id: 'audience', title: 'The Person Opposite',
    blurb: 'Who you are actually talking to, what they already believe, and why timing is part of the argument.' },
  { n: 3, id: 'invention', title: 'Finding the Argument',
    blurb: 'Where arguments come from, how they are ordered, and what counts as proof to a listener rather than to a logician.' },
  { n: 4, id: 'shape', title: 'The Shapes of Language',
    blurb: 'Clarity before ornament, the level a moment can hold, and why a figure is a claim rather than a decoration.' },
  { n: 5, id: 'delivery', title: 'Delivery',
    blurb: 'The half of rhetoric that is not on the page: voice, body, pause, and the room.' },
  { n: 6, id: 'ethics', title: 'Honest Persuasion',
    blurb: 'The line between persuading somebody and working on them, and how to tell which one you are doing.' },
];

// Module 4 is NOT ⚖️, which is The Shapes of Argument's tile on the same
// Library. Two shelves with one icon read as a duplicate of each other.
const SHELF_ICON = { ground: '🏛️', audience: '👂', invention: '🔎',
  shape: '🪶', delivery: '🗣️', ethics: '⚓' };

export const RHETORIC_LESSONS = [

  // ── Module 1 · What is Rhetoric? ───────────────────────────────
  { id: 'rh-what', module: 'ground', order: 1,
    title: 'What the Word Actually Means',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Replace the modern insult with the working definition, and see why the craft was taught to children.',
    orientation: 'A subject that spent two thousand years as the centre of education and now survives mostly as a complaint.',
    reflection: 'Think of the last time you heard the word rhetoric used out loud. Was it a description or an accusation?',
    body: [
      { p: 'When somebody says that a speech was “just rhetoric”, they mean it was empty: words arranged to sound like an argument without being one. That is the ordinary modern use of the word, and it is worth starting there, because it is the meaning you will have to work against.' },
      { p: 'The older meaning is almost the reverse. Rhetoric was the study of how speech changes what people think and do, and it was taught as a practical subject to children, alongside grammar and logic, for most of the history of European education. It was not a warning about persuasion. It was instruction in it.' },
      { h: 'The working definition' },
      { p: 'Rhetoric is the study of what makes speech effective, and the practice of making your own speech effective on purpose rather than by luck.' },
      { p: 'Two halves, and both matter. The study half is why this is a subject and not a knack: the effects are describable, repeatable and teachable. The practice half is why it belongs in an acting app: reading about persuasion does not make anybody persuasive, any more than reading about breathing changes a voice.' },
      { h: 'Why it lost its name' },
      { p: 'Because the same craft that lets an honest person make a true case clearly is the craft that lets a dishonest one make a false case convincingly. Rhetoric is a set of tools, and tools do not choose their user. That is a real problem and this course does not pretend otherwise: module 6 is about nothing else.' },
      { p: 'But abandoning the study does not remove the tools from the world. It only removes them from the people who wanted to use them honestly, and leaves them with everybody else.' },
      { h: 'What you get out of it' },
      { p: 'An actor gets the structure under a speech, which is the difference between reciting an argument and making one. A speaker gets a method for building a case instead of hoping one arrives. Anybody gets a better ear for what is being done to them, which is the defensive use and arguably the more valuable one.' },
    ] },

  { id: 'rh-three', module: 'ground', order: 2,
    title: 'Ethos, Pathos, Logos',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Learn the three appeals as three separate questions a listener is asking, not as three labels to sort sentences into.',
    orientation: 'Every listener is silently asking three things at once, and a speech has to answer all of them.',
    reflection: 'Take something you failed to persuade somebody of. Which of the three were you answering, and which did they actually need?',
    body: [
      { p: 'The oldest and most useful division in the subject says that persuasion works through three appeals. They are usually given their Greek names, which makes them sound more technical than they are.' },
      { h: 'Ethos: why should I trust you?' },
      { p: 'The listener is judging the speaker before they judge the argument. Competence, honesty, and whether this person seems to have the listener’s interest anywhere in mind. It is not reputation, though reputation helps. It is what the speaking itself shows about the speaker.' },
      { p: 'Ethos is why admitting a weakness in your own case can strengthen it, and why over-claiming destroys it. A speaker who has been caught exaggerating once has to win the argument twice.' },
      { h: 'Pathos: why should I care?' },
      { p: 'The listener has to want the outcome before the reasons matter. Pathos is not manipulation and it is not sentiment: it is the work of making a consequence real enough to feel. A number nobody can picture persuades nobody.' },
      { p: 'The common failure is not too little feeling but feeling aimed at the wrong thing. Making a listener sad is easy. Making them sad about the specific thing your argument is about is the craft.' },
      { h: 'Logos: does this hold together?' },
      { p: 'The reasoning itself. Whether the claim follows from the evidence, whether the evidence is what it says it is, and whether the case survives the obvious objection.' },
      { p: 'Logos alone almost never persuades, which offends people who think it should. A watertight argument from somebody the listener distrusts, about something they do not care about, moves nobody. That is not a flaw in listeners. It is what listeners are for.' },
      { h: 'Use them as questions' },
      { p: 'The three are worth very little as categories for labelling sentences after the fact, which is how they are usually taught. They are worth a great deal as a checklist before you speak. Have I given them a reason to trust me. Have I made them care. Does it hold together. A speech that fails is almost always failing one of those three, and naming which one is most of the repair.' },
    ] },

  { id: 'rh-occasions', module: 'ground', order: 3,
    title: 'The Three Occasions',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Identify what kind of speech you are making, because the kind decides what counts as a good one.',
    orientation: 'Speeches about the future, the past and the present are three different jobs, and confusing them is a common way to fail.',
    reflection: 'Name a speech you have to make soon. Which occasion is it? What happens if you treat it as one of the others?',
    body: [
      { p: 'The classical tradition sorted speech by the time it is about, which sounds abstract and turns out to be the most practical division in the subject.' },
      { h: 'Deliberative: about the future' },
      { p: 'Should we do this. A proposal, a pitch, a plan, an argument in a meeting. The question is what to do next, and the standard is advantage: is this better or worse for us than the alternative.' },
      { p: 'Deliberative speech goes wrong when it argues about blame instead of about the decision. The moment a planning conversation becomes an argument about who caused the problem, it has changed occasion and stopped doing its job.' },
      { h: 'Forensic: about the past' },
      { p: 'What happened, and who is responsible. A trial, an investigation, an apology, most domestic arguments. The standard is justice, and the material is evidence.' },
      { p: 'Forensic speech goes wrong when it smuggles in the future. Deciding what somebody did and deciding what to do about them are separate questions, and collapsing them is how a conversation about one mistake becomes a verdict on a person.' },
      { h: 'Epideictic: about the present' },
      { p: 'Praise and blame. A eulogy, a toast, an award, a tribute, a denunciation. The question is what we value, and the standard is whether the audience leaves holding the values the speaker held up.' },
      { p: 'This is the one modern speakers underrate, because it looks like it is not doing anything. It is doing the most durable thing: a community’s sense of what is admirable is built almost entirely out of epideictic speech, at funerals and prize-givings and retirements.' },
      { h: 'Why an actor needs this' },
      { p: 'Because a character making the wrong kind of speech for the situation is a whole characterisation, and playing it requires knowing which kind they are making. A man who answers a question about what to do next by relitigating the past is not merely unhelpful. He is refusing the occasion, and that refusal is playable.' },
    ] },

  { id: 'rh-canons', module: 'ground', order: 4,
    title: 'The Five Canons',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Get the map of the whole craft, so the rest of the course has somewhere to sit.',
    orientation: 'Five stages from having nothing to standing up, and most people skip three of them.',
    reflection: 'Which of the five do you actually do? Which do you skip and then blame on nerves?',
    body: [
      { p: 'The tradition breaks the work into five stages, in order. They are the spine of this course, and the later modules are each an expansion of one of them.' },
      { h: 'Invention: finding what to say' },
      { p: 'Not inventing in the modern sense of making up. Finding: locating the available arguments in a situation, most of which are already there before you start. Module 3.' },
      { h: 'Arrangement: deciding the order' },
      { p: 'Which argument first, what the listener needs to already accept before the next point will land, and where the objection goes. Order changes whether an identical set of reasons persuades. Module 3.' },
      { h: 'Style: choosing the words' },
      { p: 'Including the figures, which are shapes of thought rather than decoration. Module 4.' },
      { h: 'Memory: holding it' },
      { p: 'The stage that looks obsolete and is not. A speaker reading a script cannot watch the room, and a speaker who cannot watch the room cannot adjust. Speechcraft treats this as a live skill: see Lines and Memory in the Acting Library.' },
      { h: 'Delivery: speaking it' },
      { p: 'Voice, body, pause, eye. The half that does not survive on paper and decides most of the outcome. Module 5, and the reason a rhetoric course belongs beside a voice course rather than in a library.' },
      { h: 'The common failure' },
      { p: 'Most inexperienced speakers begin at style. They know roughly what they think, they have not looked for what else could be said, they have not decided an order, and they spend their preparation on wording. Then the nerves get blamed for a structural problem.' },
    ] },

  { id: 'rh-claim', module: 'ground', order: 5,
    title: 'Claim, Reason, Evidence',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Learn the smallest complete unit of an argument, and test any speech against it.',
    orientation: 'One claim, because it is supported by a reason, which rests on evidence. Most failed arguments are missing the middle.',
    reflection: 'Write your next argument as three lines: claim, reason, evidence. If the reason is only the claim again, you have found the problem.',
    body: [
      { p: 'An argument, reduced as far as it will go, is a claim supported by a reason that rests on something the listener already accepts.' },
      { p: 'The claim is what you want them to believe or do. The reason is why that follows. The evidence is what the reason stands on: a fact, an example, an authority, or something the listener already holds to be true.' },
      { h: 'The middle is what goes missing' },
      { p: 'Claims are easy and evidence is easy. The reason is the step that connects them, and it is the step people leave out, usually because it is obvious to the speaker. It is almost never obvious to the listener, who does not share the speaker’s head.' },
      { p: 'A test: state the claim, then say “because”, then finish the sentence. If what follows is the claim again in other words, the argument is circular and no amount of delivery will save it.' },
      { h: 'The unstated premise' },
      { p: 'Every argument rests on something unsaid, and the unsaid part is where disagreement usually lives. Two people arguing about a decision are frequently agreed on every fact and divided on one buried assumption neither has said out loud.' },
      { p: 'Finding your own unstated premise is the most useful single habit in this subject, and the hardest, because it is invisible from the inside. It is also, for an actor, where a scene is: two characters who cannot resolve an argument because neither has noticed what they disagree about.' },
    ] },

  { id: 'rh-bad', module: 'ground', order: 6,
    title: 'Why It Got Its Bad Name',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Take the oldest objection to rhetoric seriously enough to answer it, rather than defining it away.',
    orientation: 'The charge is that the craft teaches people to win arguments they ought to lose. It is not a foolish charge.',
    reflection: 'Where is the line, for you, between making your case well and working on somebody? Write the sentence before module 6 argues with it.',
    body: [
      { p: 'The complaint is old. It was made in Athens, by philosophers, against teachers who advertised that they could make the weaker argument appear the stronger, and it has never been fully answered.' },
      { p: 'It deserves stating at full strength. If skill at persuasion can be taught separately from having good reasons, then teaching it hands an advantage to whoever is most willing to use it, regardless of whether they are right. A world where everybody is equally skilled is fair. A world where only some are is not, and teaching the skill widens the gap before it closes it.' },
      { h: 'The three usual answers, and what each is worth' },
      { p: 'The first says that rhetoric is neutral, like a knife. True, and not much comfort: the question was never whether tools are neutral but what follows from putting them about.' },
      { p: 'The second says that good arguments are easier to make well, so the craft favours truth on balance. Partly true, and it is the most honest of the three, but anybody who has watched a confident falsehood beat a hesitant fact knows the balance is not reliable.' },
      { p: 'The third says that the defensive use justifies the study: you cannot see what is being done to you unless you know how it is done. This one holds up best, and it is the reason the subject survives in a world suspicious of it.' },
      { h: 'Where this course lands' },
      { p: 'Nowhere comfortable, on purpose. The tools are real, they work, and they do not care who holds them. Learning them makes you more effective and more responsible in the same movement, and the responsibility is not a bonus lesson at the end. It is why module 6 exists and why this lesson is in module 1 rather than hidden at the back.' },
    ] },

  // ── Module 2 · The Person Opposite ─────────────────────────────
  // Written 2026-09-28. Module 1 answered what rhetoric is; this one is
  // about the only thing that decides whether any of it works.
  //
  // WHAT IT DELIBERATELY DOES NOT RE-TEACH. Ethos and pathos are module 1
  // (rh-three) and are pointed at, not restated. The unstated premise is
  // module 1 (rh-claim) from the SPEAKER’s side, finding your own buried
  // assumption; rh-supply is the listener’s side of the same fact, and says
  // so. Voice, body and pause are module 5, and rh-adjust says so rather
  // than starting delivery early.

  { id: 'rh-who', module: 'audience', order: 1,
    title: 'Who Is Actually Listening',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Identify the listener whose mind actually has to change, who is frequently not the person being addressed.',
    orientation: 'The person you are speaking to and the person you are trying to move are often two different people.',
    reflection: 'Think of an argument you lost. Who else was in the room, and were you speaking to them or at your opponent?',
    body: [
      { p: 'The first question in this craft is not what to say. It is who the saying is for, and the answer is less obvious than it looks, because the person being addressed and the person who decides are regularly not the same person.' },
      { h: 'The decisive listener' },
      { p: 'A lawyer speaks to a witness and argues to the jury. In a meeting you answer the loudest objection in the room and persuade the quiet person who has not spoken yet, because they are the one who has not made up their mind. In a family argument the two people shouting are rarely each other’s audience; the audience is the third person at the table, and both of them know it.' },
      { p: 'A speech aimed at the wrong listener can be faultless and useless. This is the commonest structural failure in ordinary speech, and it is invisible from inside, because the speaker is getting a response. It is simply a response from somebody whose mind was never the point.' },
      { h: 'The overhearer' },
      { p: 'Most speech has an audience beyond the room: the minutes, the recording, the person who will be told about it afterwards, the version that gets repeated. Knowing they are there changes what can be said and often changes what should be.' },
      { p: 'It is worth being honest about the cost. Speaking for the record is how an exchange stops being an exchange. A conversation in which both people are performing for somebody absent has the shape of a discussion and none of the function, and everybody present can feel it.' },
      { h: 'For an actor' },
      { p: 'A character speaking to one person while aiming at another is among the most playable situations there is, and it is written into a great many scenes. Somebody answers the question their scene partner asked, and builds the answer for the person listening at the door. Nothing in the words announces it. Everything in where the line is aimed does.' },
      { p: 'The doing is the acting, which is the same instruction the Acting course gives about objective. Playable Actions in the Acting Library is the shelf for naming what the line is doing, and to whom.' },
    ] },

  { id: 'rh-common', module: 'audience', order: 2,
    title: 'What They Already Believe',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Build from something the listener already holds, because there is nothing else available to build with.',
    orientation: 'You do not choose the starting point of an argument. They do.',
    reflection: 'Name one thing the person you need to persuade believes that you believe too. That sentence is where your argument starts.',
    body: [
      { p: 'The tradition holds that arguments begin from opinions already held by the people you are speaking to. Not because those opinions are true, and not as a gesture of respect, but because nothing else will bear weight.' },
      { p: 'A premise the listener does not accept is not a premise. It is a second argument you have not made yet, and stacking the first on top of it means neither one stands.' },
      { h: 'Common ground is structural, not polite' },
      { p: 'Every step of an argument rests on something already accepted, or the step does not get taken. This is why finding shared ground is the real preparation and why it cannot be done in the room: it is research about a person, and it takes longer than choosing words.' },
      { h: 'The two common failures' },
      { p: 'The first is assuming shared premises that are not shared. The speaker builds from their own world and never notices the gap, and the argument fails at a joint neither party can see. Two people can agree on every fact in a dispute and divide on one buried value, which is the point module 1 makes about the unstated premise.' },
      { p: 'The second is refusing to stand on a belief you think is wrong. You can start from somebody’s premise and end somewhere they did not expect. That is what an argument is for. Refusing the starting point because you dislike it guarantees you never get anywhere near the conclusion.' },
      { h: 'When there is no common ground' },
      { p: 'Sometimes there genuinely is none, and the honest move is to say the disagreement is deeper than the subject in front of you. Manufacturing agreement you do not feel is worse than admitting the gap: it is visible, and it costs the one thing that was holding the exchange together, which module 1 calls ethos.' },
      { h: 'For an actor' },
      { p: 'Characters talk past each other because each is standing on ground the other does not hold, and neither has noticed. What is playable is the certainty. A person who thinks their premise is obvious does not argue for it; they repeat the conclusion louder, which is exactly what people do.' },
    ] },

  { id: 'rh-supply', module: 'audience', order: 3,
    title: 'The Argument They Finish',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Learn why a conclusion the listener reaches is held harder than one they are handed, and where that stops being honest.',
    orientation: 'The strongest arguments leave a step for the listener to take.',
    reflection: 'Take an argument you made recently. Which step could you have left out and trusted them to supply?',
    body: [
      { p: 'The classical name for an argument with a step left unsaid is the enthymeme, and it is the ordinary shape of real persuasion. The speaker states a claim and a reason; the listener supplies the premise that joins them, usually without noticing they have done it.' },
      { p: 'Module 1 approached the unstated premise from the speaker’s side: finding the assumption buried in your own case. This is the same fact from the other side. The listener completes the argument, and the completing is where the persuading happens.' },
      { h: 'Why the missing step is the strong one' },
      { p: 'A conclusion you arrived at yourself is yours. One that was handed to you belongs to the person who handed it over, and it can be handed back the moment they are out of the room. Nobody defends a position they were merely given with the energy they bring to one they worked out.' },
      { p: 'It is also a test. If the listener supplies the premise, they hold it, and you have confirmed your common ground without asking. If they do not supply it, the argument stalls in a way you can see, which is better information than agreement would have been.' },
      { h: 'The same move is the best way to smuggle' },
      { p: 'A premise that is never stated is a premise that is never examined. This is precisely the mechanism behind the family of errors All Fallacies groups under smuggling in assumptions, and the efficiency that makes the enthymeme good is what makes it dangerous.' },
      { p: 'The line is straightforward to state and requires honesty to hold. Leaving a step out because the listener already holds it is argument. Leaving it out because they would reject it if they heard it said aloud is not.' },
      { h: 'For an actor and anybody who writes' },
      { p: 'The audience finishing the thought is the engine of a good line. A line that explains itself has nothing left for anybody to do, and lands dead. The laugh, or the silence, happens in the half second where they get there first, and an actor who fills that half second has taken the moment away from the only person who could have had it.' },
    ] },

  { id: 'rh-resist', module: 'audience', order: 4,
    title: 'Meeting Resistance',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Find what a listener is actually resisting, which is rarely the claim they are arguing against.',
    orientation: 'Almost nobody resists a proposition. They resist what accepting it would cost.',
    reflection: 'Think of somebody who will not be moved on something. What would it cost them to agree with you?',
    body: [
      { p: 'People hold positions for reasons that are frequently not the reason they give, and this is not usually dishonesty. The stated reason is the one available for saying out loud.' },
      { h: 'What resistance usually is' },
      { p: 'The cost of agreeing. Being wrong in front of people who watched them be certain. A loyalty to somebody who holds the same view. An identity the position is part of. Work they would have to do, money they would have to spend, or an apology that would become owed the moment they conceded.' },
      { p: 'Argue with the stated reason and you can win every exchange in the conversation and move nobody, because you have been dismantling a position that was never load bearing.' },
      { h: 'Build their case before you touch it' },
      { p: 'State their position in words they would accept. If you cannot do it, you are not arguing with them yet, you are arguing with a version of them, and All Fallacies has a whole family about what that produces.' },
      { p: 'Doing it properly buys something no technique buys: a listener who has just heard their own view put fairly is, for a short while, actually listening. That is the practical value, and it is why the habit survives in every serious account of the subject.' },
      { h: 'Concession' },
      { p: 'Conceding a real point is the cheapest credibility available. It narrows the argument to what genuinely divides you, and it demonstrates that you are capable of being moved, which is the precondition for asking somebody else to be.' },
      { p: 'False concession does the opposite. The sentence that begins by granting something and pivots on “but” before the granting has landed is heard as a tactic, because it is one, and it costs more than the point was worth.' },
      { h: 'Knowing when to stop' },
      { p: 'Some people will not be moved, and continuing past that point is not persistence. It is a failure to notice. The craft includes recognising the moment when the person in front of you has become the occasion rather than the audience, and the listener who matters is somebody else in the room.' },
    ] },

  { id: 'rh-timing', module: 'audience', order: 5,
    title: 'Timing',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Judge whether the moment can receive the argument, because one made too early fails the way a wrong one fails.',
    orientation: 'The tradition treated the right moment as part of the argument rather than as luck.',
    reflection: 'Name something true you said at the wrong moment. What happened to it afterwards?',
    body: [
      { p: 'Greek had a word for the opportune moment, and the tradition treated finding it as a skill rather than a piece of good fortune. It has nothing to do with scheduling. It is about the state of the listener and the state of the room.' },
      { h: 'Too early looks exactly like wrong' },
      { p: 'A true argument made into a moment that cannot receive it gets rejected, and the rejection is the expensive part. The argument is now harder to make later, because it has been refused once and reviving it means asking somebody to reverse themselves rather than to decide.' },
      { p: 'This is why the instinct to say the true thing immediately is not always the honest one. Waiting is sometimes the only way the true thing gets heard at all.' },
      { h: 'What makes a moment' },
      { p: 'What has just happened. What they have just conceded, which is a door that closes quickly. What they are frightened of right now rather than in general. How tired everybody is. Who has just left the room, and whether the thing that could not be said in front of them can be said now.' },
      { h: 'Making the moment instead of waiting for it' },
      { p: 'A good speaker builds receptiveness rather than hoping for it: naming an objection before it hardens into a position, asking for something smaller first, or separating a decision from the question of who was to blame for needing it.' },
      { h: 'The honest limit' },
      { p: 'Timing is also the most respectable excuse available. An argument permanently postponed until the moment is right is sometimes an argument the speaker is afraid to make, and the vocabulary of good judgement is what makes that comfortable. Worth asking which one is happening, because from the inside they feel identical.' },
      { h: 'For an actor' },
      { p: 'A scene turns on when a line arrives. The same sentence one beat earlier is a different event, and frequently a different play. That is the subject of Tempo-Rhythm in the Acting course, and this is the argument-side of it: a character who says the right thing at the wrong moment has not been clumsy, they have been early, and early is playable.' },
    ] },

  { id: 'rh-adjust', module: 'audience', order: 6,
    title: 'Adjusting While You Speak',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Change the route through an argument in the room, which is what all the preparation was for.',
    orientation: 'A speaker who cannot watch the listener is reciting, not arguing.',
    reflection: 'When did you last change an argument mid-sentence because of somebody’s face? What did you see?',
    body: [
      { p: 'Everything in this module so far is preparation, and none of it survives contact unchanged. The listener you prepared for is an estimate. The one in front of you is the fact.' },
      { h: 'Why memory is a live skill' },
      { p: 'Module 1 lists memory as one of the five canons and calls it the stage that looks obsolete and is not. This is why. A speaker reading a script is watching the page, and a speaker watching the page cannot see the moment the room turns. Lines and Memory, in the Acting Library, is the practical shelf for that problem.' },
      { h: 'What to watch for' },
      { p: 'The moment they stop listening and begin waiting to speak, which has a look. The nod that means agreement against the nod that means go on, which are different. Questions that are objections wearing a question mark. And the particular stillness of somebody who has decided and is being polite about it.' },
      { h: 'What to change, and what not to' },
      { p: 'Change the route: the order, the example, which premise you are standing on, how much you are asking for. Any of those can move without damage.' },
      { p: 'Do not change the claim. A speaker who revises what they are arguing for in response to resistance is heard as having no position, and the listener stops attending to the argument and starts watching the speaker manoeuvre. The claim is the one fixed thing; everything else was always negotiable.' },
      { h: 'Delivery is the next module' },
      { p: 'Voice, body, pause and the room are module 5, and they are half of whether any of this arrives. This lesson is about the argument rather than the speaking of it, and the separation is deliberate: a great many speakers try to fix a structural problem with delivery, which module 1 warns about in its account of the canons.' },
      { h: 'For an actor' },
      { p: 'This is listening, which is the live half of the job and the thing the Acting course spends a whole collection on in Listening and Responding. A character who adjusts is doing something visibly different from a character who delivers, and an audience can tell instantly which one they are watching, even when they could not say what the difference was.' },
    ] },

  // ── Module 3 · Finding the Argument ────────────────────────────
  // Written 2026-09-29. This is the first and second canons, invention and
  // arrangement, which module 1 explicitly sends here.
  //
  // WHAT IT DELIBERATELY DOES NOT RE-TEACH. Claim, reason and evidence is
  // module 1 (rh-claim). Common ground is module 2 (rh-common), and rh-order
  // leans on it rather than restating it. The enthymeme from the listener's
  // side is module 2 (rh-supply); rh-proof treats it as one of two MODES of
  // proof and points there for what the listener does with it. Figures are
  // module 4 and delivery is module 5. Named errors stay on the fallacy
  // shelves: this module points at them and defines none of them twice.

  { id: 'rh-find', module: 'invention', order: 1,
    title: 'Where Arguments Come From',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Treat invention as finding rather than inventing, because most of what you need is already in the situation.',
    orientation: 'The arguments are usually there before you arrive. The work is locating them.',
    reflection: 'Take a case you have to make. List every argument available to you, including the ones you will not use. Which did you miss the first time?',
    body: [
      { p: 'The first canon is invention, and the word is misleading in modern English. It does not mean making something up. It means finding what is already available in this particular case, which is a search rather than an act of creation.' },
      { h: 'Why searching beats inventing' },
      { p: 'A speaker who asks what shall I say produces whatever occurs to them, and what occurs first is usually the most obvious thing available. A speaker who asks what is available here produces a list, and then chooses from it.' },
      { p: 'The difference shows under pressure. An argument you picked out of five is one you can abandon for another. An argument that simply arrived is the only one you have, and when it fails you have nothing left to say.' },
      { h: 'Collect before you choose' },
      { p: 'Write down the arguments you do not intend to use. The weak ones are worth having on paper because they are what the other side will reach for, and because a case you can argue from both directions is one you actually understand.' },
      { p: 'This is also the honest test of whether you have a case at all. If the search produces one argument and it is the one you started with, you have a conviction rather than an argument, and the rest of this module will not help until that changes.' },
      { h: 'For an actor' },
      { p: 'Characters do this badly, visibly, and in ways worth playing. Somebody with one argument repeats it louder. Somebody with five is calm, because losing one costs them nothing. How much a person has in reserve is legible in how they behave when contradicted.' },
    ] },

  { id: 'rh-topics', module: 'invention', order: 2,
    title: 'The Common Topics',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Learn the handful of questions that generate arguments about anything, so that a blank page stops being blank.',
    orientation: 'A few questions, asked of any subject, produce more arguments than most speakers can use.',
    reflection: 'Run your case through definition, comparison and cause. Which one produced an argument you had not thought of?',
    body: [
      { p: 'The tradition calls these the topics, or the commonplaces, and both names obscure what they are. The Greek means places: places to go and look. They are not subjects and they are not arguments. They are the small number of questions that reliably produce arguments when asked of anything at all.' },
      { h: 'Definition: what kind of thing is this?' },
      { p: 'A surprising number of disputes are about whether something belongs in a category, and almost none of them announce themselves that way. Settle what a thing is and the argument about what to do often settles with it.' },
      { h: 'Comparison: what is it like, and is it more or less?' },
      { p: 'Analogy and degree. If we already act on something worse, this follows. If we refuse something smaller, this cannot stand. Comparison is the topic that does the most work in ordinary argument and the one most open to abuse, which is why false equivalence sits on the fallacy shelf.' },
      { h: 'Relationship: what caused it, what follows from it, what is its opposite?' },
      { p: 'Cause backwards and consequence forwards. The opposite is the one people forget: showing what the contrary would look like frequently makes a claim visible that direct statement could not.' },
      { h: 'Circumstance: is it possible, and has it happened before?' },
      { p: 'Whether a thing can be done, and whether it has been. Precedent is among the strongest moves available in almost any setting, because it converts an argument about the future into a statement about the past.' },
      { h: 'Testimony: who says so, and what do they gain?' },
      { p: 'Witnesses, documents, records, numbers, precedent. The tradition keeps these separate from the rest because they are not made by the speaker, only presented. Presenting them well is a real skill and an underrated one.' },
      { h: 'Use them as a checklist' },
      { p: 'Run the subject through each in turn. Most will produce nothing, which is fine and expected. One or two will produce something you had not thought of, and that is the entire return on the method.' },
    ] },

  { id: 'rh-stasis', module: 'invention', order: 3,
    title: 'Finding the Real Disagreement',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Identify which question is actually in dispute, because arguing the wrong one is the commonest way to lose.',
    orientation: 'Four questions, in order. The argument lives at the first one you disagree about.',
    reflection: 'In a dispute you are in, which of the four is the real one? Are you arguing there, or somewhere more comfortable?',
    body: [
      { p: 'The tradition has a doctrine for this, and it is the most immediately useful thing in the whole subject. The name means the standing point: the place where an argument comes to rest and the two sides are genuinely opposed.' },
      { h: 'Did it happen?' },
      { p: 'A question of fact. Either it occurred or it did not, and evidence settles it or nothing does.' },
      { h: 'What is it?' },
      { p: 'A question of definition. Both sides agree on what happened and divide on what to call it. A great many public arguments are here and almost none of them say so.' },
      { h: 'How serious is it?' },
      { p: 'A question of quality. Agreed on the facts, agreed on the name, divided on whether it is grave or trivial, excusable or not.' },
      { h: 'Is this the right place to settle it?' },
      { p: 'A question of procedure. Who decides, under what authority, by what process. It sounds like a technicality and it is frequently the whole case.' },
      { h: 'Why the order matters' },
      { p: 'You are in dispute at the FIRST point where you diverge, and everything after it is not yet in question. Two people arguing about how serious something is, who have not noticed they disagree about what it is, will not converge no matter how long they go on, because they are answering different questions and each can hear that the other is not making sense.' },
      { h: 'The honest part' },
      { p: 'People move between the four to avoid losing, and doing it deliberately is a tactic rather than an argument. Retreating from a strong claim to a modest one, or raising the standard once it has been met, both have names on All Fallacies. Naming the level out loud is usually enough to stop it.' },
      { h: 'For an actor' },
      { p: 'Two characters stuck at different levels is a scene that can run for pages without resolving, which is exactly why writers use it. Neither is being stupid. Each is answering the question they think is in front of them, and the audience can see both.' },
    ] },

  { id: 'rh-proof', module: 'invention', order: 4,
    title: 'What Counts as Proof',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Judge evidence by what a listener can do with it, rather than by what would satisfy a logician.',
    orientation: 'A listener is not a proof checker, and what moves them is not therefore irrational.',
    reflection: 'What is the most vivid TRUE thing you could show them? Why is it not in your argument yet?',
    body: [
      { p: 'The tradition separates the proofs a speaker makes from the proofs a speaker finds. Reasoning is made. Documents, witnesses, records and numbers are found, and they need presenting rather than constructing, which is a different job and one most speakers do carelessly.' },
      { h: 'Two ways to reason' },
      { p: 'From cases to a general claim, which is the example, and from a shared premise to a conclusion, which is the enthymeme. Module 2 covers what the listener does with the second, and the short version is that they finish it themselves, which is why it holds.' },
      { h: 'Why the vivid beats the general' },
      { p: 'One case a listener can picture moves them more than a figure covering a million people. This is worth being honest about rather than scolding: it is not a defect in listeners, it is how understanding works. A number is a claim about a world nobody has seen. An instance is a thing you can hold, and a speaker who supplies none has left the listener nothing to think with.' },
      { p: 'THE LINE IS SHARP AND WORTH SAYING PLAINLY. Using a vivid case to illustrate a general claim that is true is teaching. Using one to stand in place of a general claim that is not true is the move All Fallacies files under misusing evidence. Same technique, opposite honesty, and the only difference is whether the general claim would survive without the story.' },
      { h: 'What evidence cannot do' },
      { p: 'It cannot make somebody care. A listener who does not want the outcome will find the evidence uninteresting rather than unconvincing, and no amount of it changes that. That is what module 1 means by pathos, and it is why evidence alone loses arguments it should win.' },
      { h: 'Test your own' },
      { p: 'Ask what you would expect to see if the claim were false, and whether anybody has looked. If the answer is that nothing would look different, you are not holding evidence. You are holding an interpretation.' },
    ] },

  { id: 'rh-order', module: 'invention', order: 5,
    title: 'The Order of a Case',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Arrange the same reasons so that they build, because order decides whether an identical set of arguments persuades.',
    orientation: 'Arrangement is the second canon, and the one most often skipped entirely.',
    reflection: 'Write your arguments on separate lines and reorder them. Which order makes the last one land hardest?',
    body: [
      { p: 'The same arguments, in a different order, win or lose. This is the least intuitive claim in the course and the easiest to verify: take three reasons, put the weakest first, then put it last, and read both aloud.' },
      { h: 'The classical parts, without the pedantry' },
      { p: 'An opening that gives them a reason to listen. The facts, told plainly. The proposition, which is what you are actually asking for. The proof. The answer to the objection. The close. It is not a template to fill in, and treating it as one produces the stiff, over-signposted speech everybody recognises. It is a checklist for what is MISSING, which is usually the proposition.' },
      { h: 'What decides the order' },
      { p: 'Dependency. Every step has to stand on something the listener already accepts, so the order is set by what they must agree to before the next point can land. The first stone is the common ground from module 2, and if you cannot name it the order will not come out right however you shuffle it.' },
      { h: 'Strongest first or strongest last' },
      { p: 'The tradition argues about this and so has everybody since, which is itself the useful information: there is no settled answer. Strong first buys the attention you need to be heard at all. Strong last is what they carry out of the room. The common compromise is to open strong, put the rest in the middle, and finish strongest.' },
      { p: 'What actually decides it is whether they will still be listening at the end. If attention is uncertain, lead. If you have the room, build.' },
      { h: 'The statement of facts is never neutral' },
      { p: 'A plain account of what happened is already an argument. What you include, what you leave out and the order you tell it in do most of the work, and they do it before anybody thinks to start disagreeing. In many cases it is the most powerful part of the speech and the part least defended against.' },
      { h: 'For an actor' },
      { p: 'The order a character puts things in shows their mind. Somebody who states the conclusion first and reasons backwards is not the same person as somebody who builds to it and cannot say it until the end. Neither is written in the words. Both are in the sequence.' },
    ] },

  { id: 'rh-objection', module: 'invention', order: 6,
    title: 'Where the Objection Goes',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Answer the strongest objection on purpose, and decide deliberately whether to raise it before they do.',
    orientation: 'Every case has one real objection. Behaving as though it does not is the most visible weakness a speech can have.',
    reflection: 'What is the strongest thing that can be said against you? If you cannot state it well, you do not yet understand your own case.',
    body: [
      { p: 'Refutation is a part of arrangement rather than an afterthought, and where it goes is a decision. Most speakers make it by accident, which usually means leaving the objection out and hoping.' },
      { h: 'Find the real one' },
      { p: 'Not the easiest objection, which is the one speakers answer because answering it feels good. The real one is the objection you keep hoping nobody raises, and you already know what it is.' },
      { h: 'Raise it yourself, or wait' },
      { p: 'If they will certainly think of it, raise it first. You get to state it in your own words, you get the credit for honesty, and you are answering rather than defending. If they will probably not think of it, raising it hands them a weapon they did not have.' },
      { p: 'So the question is likelihood, and the temptation is to answer it conveniently rather than accurately. Be honest about how obvious the objection is. A speaker who convinces themselves nobody will notice is usually the only person in the room who has not.' },
      { h: 'How to answer one' },
      { p: 'Concede what is true in it, then show precisely what it does not reach. An objection that is flatly denied stays alive in the listener, because they can see the part of it that was right and now they are watching you avoid it.' },
      { h: 'The one you cannot answer' },
      { p: 'Sometimes there is an objection you genuinely cannot meet. Saying so costs far less than concealing it. A case with an acknowledged weakness is still a case, and listeners will weigh it. A case caught hiding one is finished, and the weakness is no longer the issue.' },
      { h: 'For an actor' },
      { p: 'A character gives themselves away by which objection they will not name. Everything they are willing to argue about is a screen in front of the one thing they are not, and an audience feels the shape of the absence long before it is spoken.' },
    ] },

  // ── Module 4 · The Shapes of Language ──────────────────────────
  // Written 2026-09-29. This is the third canon, style, which module 1
  // sends here.
  //
  // WHY IT IS SIX LESSONS AND NOT SEVENTEEN. The figures are a GLOSSARY
  // on The Shapes of Argument, with an example each. Teaching them one per
  // lesson would be the dullest stretch in the app, and it would teach the
  // names rather than the craft. rh-figure teaches what a figure IS and
  // hands the reader the shelf.
  //
  // WHY METAPHOR IS A LESSON AND NOT A POINTER. The shelf does not hold
  // it. Seventeen figures, and all but a few are shapes of ARRANGEMENT;
  // metaphor is the most consequential turn of MEANING in the language and
  // there is nowhere else in the app it is taught.
  //
  // WHAT IT DELIBERATELY DOES NOT RE-TEACH. Arrangement of the whole case
  // is module 3 (rh-order), and rh-sentence says outright that it is the
  // same principle one scale down. Why a vivid instance beats a general
  // figure is module 3 (rh-proof), which owns it as a question about
  // EVIDENCE; rh-clear touches the same fact about WORDS and points there.
  // Voice, breath, pause and the room are module 5, and rh-sentence and
  // rh-notice both mark the border rather than starting delivery early.
  // Named errors stay on the fallacy shelves.

  { id: 'rh-clear', module: 'shape', order: 1,
    title: 'Clarity Comes First',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Put being understood ahead of being admired, because a sentence the listener has to solve has already lost its moment.',
    orientation: 'The tradition ranked the virtues of style, and ornament came last in the list every time.',
    reflection: 'Find a sentence of your own you are proud of. Say it aloud to somebody outside the subject. Did they need it twice?',
    body: [
      { p: 'Style is the third canon: the choice of words and the shape of sentences. It has the worst reputation of the five, because it is the stage most people think rhetoric consists entirely of, and because it is the one that can be practised without having anything to say.' },
      { p: 'The correction is to stop treating style as decoration applied to a finished argument. It is how the argument arrives, and an argument that arrives wrong has not arrived.' },
      { h: 'The virtues, in order' },
      { p: 'The tradition lists four qualities of good style and puts them in a sequence: correctness, clarity, appropriateness, ornament. The order is the whole teaching, and ornament is at the back of it.' },
      { p: 'Correctness comes first for an unglamorous reason. Errors in the language your listener speaks spend credibility on nothing at all, and module 1 calls that ethos: the least interesting way to lose it is to lose it on a mistake that had no bearing on your case.' },
      { h: 'Why clarity outranks everything after it' },
      { p: 'A reader can go back. A listener cannot, and a listener who has stopped to work out your last sentence has missed the one you are saying now. Speech happens once, at your pace, and every obscurity costs the sentence after it as well as itself.' },
      { p: 'So clarity in speech is not the same virtue as clarity on a page. It is a constraint on how much a single sentence may carry, and most unclear speech is not badly worded. It is overloaded.' },
      { h: 'What obscurity is usually doing' },
      { p: 'Three honest causes. The speaker has not finished thinking, and the sentence is doing the thinking in public. The subject is genuinely difficult and has not been broken into pieces yet. Or the sentence is carrying three claims and would be three sentences.' },
      { p: 'And one dishonest one, which is worth naming plainly because it is common and rewarded: obscurity as a claim to depth. A sentence nobody can pin down cannot be shown to be wrong, and it borrows the authority of difficulty without doing anything difficult. It is the only failure of clarity that gets mistaken for a strength.' },
      { h: 'Abstraction' },
      { p: 'An abstract noun is a lid. Put one on a sentence and the listener cannot see what is inside, which is frequently the point and frequently an accident. Restructuring is not a decision, an initiative is not a thing anybody did, and a challenge is not a problem until somebody says whose.' },
      { p: 'This is a fact about words, and it has a companion in module 3, which says the same thing about evidence: one case a listener can picture does more than a figure covering a million people. Concrete language and concrete proof are the same instinct at two different stages of the work.' },
      { h: 'The test' },
      { p: 'Say it to somebody who does not work in your subject, and watch for the slow nod. The slow nod is not agreement. It is a person deciding not to ask, and every one of them marks a sentence to cut or split.' },
      { p: 'An actor has a version of the same test, and it is stricter. You cannot play a sentence you have not understood, and an audience can hear the difference between a performer who knows what a line means and one who has learnt its shape. A line you can only deliver is a line you have not read.' },
    ] },

  { id: 'rh-levels', module: 'shape', order: 2,
    title: 'High, Middle and Plain',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Match the level of language to the occasion, the subject and the listener, because a mismatch is heard as a misjudgement about all three.',
    orientation: 'Three registers. The skill is not managing the grand one, it is knowing what the moment can hold.',
    reflection: 'Name a speech pitched too high for its occasion. What did the excess actually tell you about the speaker?',
    body: [
      { p: 'The tradition divides style into three levels, and the division survives because it describes something speakers get wrong constantly and cannot name.' },
      { h: 'Plain' },
      { p: 'For teaching and for proving. Short constructions, ordinary words, nothing calling attention to itself. It is not the artless level, and it is the hardest of the three to do well, because there is nothing in it to hide behind: if the thought is thin, a plain sentence shows it immediately.' },
      { h: 'Middle' },
      { p: 'The working register of nearly all real speech. Fuller than plain, no heat in it, pleasant enough to keep somebody listening through an explanation that has several steps. Most speech should live here and most speakers can already do it.' },
      { h: 'Grand' },
      { p: 'For moving people to feel something or to act. Longer sentences, stronger figures, a subject the audience already agrees is serious. It is the level everybody thinks of as rhetoric and the one that fails most visibly.' },
      { h: 'Appropriateness decides, not taste' },
      { p: 'The third virtue of style governs the choice, and three things set it: the occasion, which module 1 divides into decisions, judgements and praise; the subject, and specifically how grave the audience already believes it to be; and the listener, which is the whole of module 2.' },
      { p: 'None of those is a preference. The level is not something you choose because it suits you, and a speaker with one register is not stylish. They are limited, and they will be right about one occasion in three.' },
      { h: 'The mismatch, both directions' },
      { p: 'Grand language on a small subject is the commoner error and the more expensive. The audience does not hear grandeur, they hear somebody who has misjudged what matters, and that judgement transfers instantly to everything else the speaker says.' },
      { p: 'Plain language on a genuinely grave matter fails the other way, and speakers who pride themselves on plainness rarely believe it. At a funeral, in an apology, on the occasion somebody has waited years for, flatness does not read as restraint. It reads as insufficient care, which is a claim about how much the speaker minds.' },
      { h: 'Height is spent, not held' },
      { p: 'The grand style draws on the audience’s willingness to be moved, and that account is finite. A speech at height throughout arrives nowhere, because there is no height left to arrive at, and the audience has stopped registering the elevation by the middle.' },
      { p: 'Which is why coming down is a technique rather than a failure of nerve. A plain sentence after a long ascent carries more weight than anything in the ascent, and it is the most reliable way in this whole subject to make one sentence land.' },
      { h: 'For an actor' },
      { p: 'Level is characterisation before it is style. A person who speaks in one register whatever the room is a specific person, usually one who is frightened of something; a person who moves between registers has a different kind of authority, and the movement is where it shows.' },
      { p: 'And a character reaching for the grand style and not managing it is among the most exposed things available to play. Nothing in the words says the reach failed. Everything in the gap between the size of the sentence and the size of the speaker does.' },
    ] },

  { id: 'rh-figure', module: 'shape', order: 3,
    title: 'What a Figure Actually Is',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Understand a figure as a shape that makes a claim, so that naming one stops being mistaken for using one.',
    orientation: 'Not an ornament added to a sentence. A pattern that asserts something the words do not say.',
    reflection: 'Put one sentence of your own into a shape: balance it against its opposite, or repeat its opening words. What changed in the meaning, rather than the sound?',
    body: [
      { p: 'The figures arrive with long Greek names and a reputation for being a vocabulary test. The Shapes of Argument, in this Library, holds seventeen of them with an example each, and that shelf is where you meet them. This lesson is about what they are, which the names conceal.' },
      { p: 'A figure is a departure from the plainest available way of saying a thing, where the departure does work. If the plainest way would have done the same job, there is no figure, only a longer sentence.' },
      { h: 'Two families' },
      { p: 'The tradition separates shapes of arrangement from turns of meaning, and calls them schemes and tropes. In a shape of arrangement the words mean what they usually mean and the ORDER does the work: repetition, balance, reversal, a series. In a turn of meaning a word stops meaning itself: one thing called another, a thing overstated, a thing named as its own opposite.' },
      { p: 'The shelf is weighted toward the first family, and it is honest about that. The most consequential member of the second is metaphor, which the shelf does not hold at all, and it has the next lesson to itself.' },
      { h: 'The shape is the claim' },
      { p: 'This is the part that turns a vocabulary list into a subject. A pattern asserts something that no word in the sentence states.' },
      { p: 'Balance claims that two things are the same kind of thing and can be weighed against each other. Setting two halves in opposition claims that they genuinely are opposed, rather than merely different. Repeating the opening words of successive clauses claims the items are members of one series, of one importance, going in one direction. Three claims, none of them argued, all of them carried by the form.' },
      { p: 'So a figure is not decoration on an argument. It is frequently the argument, delivered in a way that never has to defend itself.' },
      { h: 'Which means a figure can lie' },
      { p: 'A balanced sentence can hold two things that are not comparable, and the balance does the persuading before anybody examines the pair. All Fallacies has a whole family for what that produces, and this is the mechanism underneath it.' },
      { p: 'It is also exactly what module 2 describes: a premise that is never stated is a premise that is never examined. A figure can carry the unstated step in its shape, which is more efficient than saying it and completely invisible.' },
      { h: 'Naming is not the skill' },
      { p: 'Being able to say that a sentence is an antimetabole is worth having for reading and worth nothing for speaking. Nobody builds a sentence by selecting a figure from a list of seventeen.' },
      { p: 'What the shelf is for is noticing. Once you can see the shapes, you see them working on you, which is the defensive use module 1 argues is the best reason to study any of this, and a few of them settle into your hand without being chosen.' },
      { h: 'For an actor' },
      { p: 'The shape is the route the thought took, so the shape is evidence about the thinking. A speech in balanced pairs is a mind weighing two things and not yet done. A speech in mounting repetitions is a mind that has stopped weighing and is now driving. Neither is stated anywhere in the words, and both are on the page in the pattern.' },
    ] },

  { id: 'rh-metaphor', module: 'shape', order: 4,
    title: 'Metaphor Is an Argument',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'See that a metaphor makes a claim about what kind of thing something is, and test that claim before using it.',
    orientation: 'The most powerful single move in style, and the one that persuades without ever stating what it says.',
    reflection: 'Find the metaphor inside an argument you believe. Say plainly what the comparison asserts. Does it survive being said plainly?',
    body: [
      { p: 'A metaphor says one thing is another. Everybody present knows it is not literally so and makes the transfer anyway, and what transfers is not a picture. It is a set of conclusions, and they arrive already agreed.' },
      { h: 'What actually crosses over' },
      { p: 'Call a negotiation a battle. Nothing further needs arguing: there are two sides, one of them wins, ground given is ground lost, and compromise becomes a kind of defeat. Nobody said any of that, and everybody in the room now believes it.' },
      { p: 'Call the same negotiation a piece of building work. The conclusions invert. Both parties are working on one object, what one adds the other does not lose, and the question stops being how much to concede and becomes what to make.' },
      { p: 'Neither is a fact about the negotiation. Both decide how the negotiation will be conducted, and they decide it before the first substantive sentence.' },
      { h: 'It answers a question module 3 asks' },
      { p: 'Module 3 says an argument comes to rest at the first question the two sides diverge on, and that the second of those questions is what a thing IS. A metaphor answers that question. It settles the definition, silently, and whoever set the metaphor has chosen the ground the argument will be fought on.' },
      { p: 'This is why metaphor belongs with invention rather than with ornament, and why it is in this module under protest: it is filed as style because it is made of words, and it behaves like a premise.' },
      { h: 'The dead ones are the strongest' },
      { p: 'A strong economy, a broken system, the head of an organisation, a war on something. Nobody hears these as figures, which is precisely what makes them effective: a dead metaphor is a claim that has stopped being examined because it has stopped being visible.' },
      { p: 'They are not faults. Language runs on them and speech would be unusable without them. But the ones near the centre of your own argument are worth waking up, because an assumption you inherited in a phrase is still an assumption you are asserting.' },
      { h: 'Test your own' },
      { p: 'Say plainly what the comparison asserts, in a sentence with no figure in it, and ask whether you would defend that sentence out loud. If the metaphor is claiming more than you would say, it is doing work you have not earned, and the audience is being asked to accept it on the strength of the phrasing.' },
      { p: 'THE LINE IS THE SAME ONE MODULE 2 DRAWS. A metaphor that makes a true relation graspable is teaching, and it is frequently the only way a difficult thing becomes holdable at all. A metaphor that imports conclusions the speaker could not defend if they were stated is smuggling, in the most efficient form the language offers.' },
      { h: 'Following one too far' },
      { p: 'A metaphor extended past its use starts generating conclusions nobody meant. If the battle acquires a budget and a stakeholder, the figure has collapsed, and the audience has stopped following the argument and started watching the machinery. The repair is to stop earlier, not to build the comparison out further.' },
      { h: 'For an actor' },
      { p: 'A character’s metaphors are the surest evidence there is of how they see. Somebody who speaks about their family in the language of business, or their work in the language of war, or their own body as something separate that has let them down, has told you what they believe they are inside, and they have not said a word about it.' },
      { p: 'It is available to be played and it must never be announced. The moment the performance underlines the figure, the character becomes somebody making a comparison rather than somebody for whom that is simply what the thing is.' },
    ] },

  { id: 'rh-sentence', module: 'shape', order: 5,
    title: 'The Shape of a Sentence',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Build a sentence whose shape carries its meaning, and put the weight where you want it to fall.',
    orientation: 'Where the important word sits, and how long the listener is made to wait for it.',
    reflection: 'Take your most important sentence and move its key word to the end. Read both aloud. Which one lands?',
    body: [
      { p: 'Module 3 was the order of the arguments. This is the order inside one sentence, which is the same principle one scale down, and it is the scale at which most speakers have never made a decision at all.' },
      { h: 'Two shapes' },
      { p: 'A suspended sentence withholds its completion: the listener cannot know what is being said until the final clause arrives, and the meaning of everything before it is provisional until then. A running sentence states its point and then adds to it, so the listener has the claim early and the rest accumulates.' },
      { p: 'Suspension buys attention and spends goodwill. It is a small demand made of the listener, and it pays only if the ending justifies the wait. A running sentence is easier to follow, harder to make memorable, and the right default for anything complicated.' },
      { h: 'The end of a sentence is the strongest position' },
      { p: 'Whatever sits last is what the listener carries. The opening is second strongest, and the middle is where things go to be unnoticed, which is worth knowing in both directions: it is where a qualification goes when you want it heard less, and noticing that in somebody else’s sentence is the defensive skill.' },
      { p: 'Most weak sentences are weak because the important word is in the middle and something procedural is at the end. The repair is not more words. It is moving one.' },
      { h: 'Length is a rhythm, and sameness is silence' },
      { p: 'A run of sentences of the same length stops being heard as sentences at all. It becomes a texture, and the listener’s attention drifts off it without any single sentence being at fault.' },
      { p: 'So a short sentence after three long ones is emphasis that costs nothing and needs no figure. This is the cheapest technique in the module and the most reliable.' },
      { h: 'Why three' },
      { p: 'Two items read as a comparison, and the listener weighs them against each other. Four or more read as a list, and the listener stops attending to the members. Three reads as complete, which is why the series of three is the most heavily used shape in English public speech. It is on the shelf as tricolon, and the reason it works is arithmetic about attention rather than magic about the number.' },
      { h: 'This is the page, not the room' },
      { p: 'Breath, pause and pace are module 5, and they are half of whether a sentence arrives. They can support a shape or fight it, and they cannot rescue a sentence whose weight is in the wrong place. Composition first, because delivery has nothing to work with otherwise.' },
      { h: 'For an actor' },
      { p: 'The shape of a sentence is written instruction about the thought, and the suspended sentence is the clearest case. It cannot be played by somebody who knows how it ends, because the character does not: they are assembling it as they speak, the delay is the event, and an actor who has decided the destination in advance flattens the only thing happening.' },
      { p: 'Verse makes the same demand with a metre instead of a clause, which is what the Verse and Prose module in the Shakespeare course is about. The instruction is identical: the shape tells you where the thought was still moving.' },
    ] },

  { id: 'rh-notice', module: 'shape', order: 6,
    title: 'Using One Without Announcing It',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Decide whether a figure should be noticed, because a shape the listener sees as technique stops arguing and starts advertising.',
    orientation: 'The same figure can be invisible or ceremonial. Which one it is depends on whether the occasion licenses the display.',
    reflection: 'Think of a speech where you noticed the technique. What did noticing do to your trust in the speaker?',
    body: [
      { p: 'The moment a listener thinks that was well put, their attention has moved from the argument to the speaker, and the argument is standing still waiting for them to come back. Sometimes that trade is worth making. Most of the time it is a loss, and it is a loss the speaker never sees, because from the inside it feels like the line went well.' },
      { h: 'What makes a figure visible' },
      { p: 'Density, first: one is a sentence, three in a row is a style, and a style is a thing the audience is now watching. Second, disproportion, which is the level-of-style error from earlier in this module in miniature: a grand shape on a small point announces itself by being too large for what it carries. Third, and least under your control, a shape the audience has heard used to sell things. Some patterns have been spent by advertising and cannot be borrowed back.' },
      { h: 'When you want it seen' },
      { p: 'Some occasions license visible artifice and some require it. Module 1 calls them epideictic: the toast, the eulogy, the tribute, the award. The audience has come partly for the language, everybody present knows the speech was written, and plainness there does not read as honesty. It reads as insufficient care.' },
      { p: 'Ceremony is the place a figure is supposed to show. The mistake is carrying the ceremonial register into the other two occasions, where it does something close to the opposite.' },
      { h: 'When it costs you' },
      { p: 'In speech about a decision, and in speech about what somebody did, visible artifice raises a question the speaker cannot answer: what is it for. A listener who has just admired a sentence begins wondering why that sentence needed to be admirable, and suspicion of technique is the one defence almost every audience has, whatever else they know about rhetoric.' },
      { h: 'One at a time, on the sentence that matters' },
      { p: 'The economy is the same as the grand style earlier in this module. Attention spent on a minor point is not available later, and the commonest waste in prepared speech is the best shape in it landing on the third least important claim. Find the sentence the whole case rests on, and let that one have the shape.' },
      { h: 'The honest reason, which is not an aesthetic one' },
      { p: 'A listener who is admiring is not examining. That is the entire problem, and it is the condition this course was opened with: what distinguishes honest persuasion is what the listener is left able to do. A figure that dazzles and moves on quickly has taken the examining away, and it is the exact accusation module 6 has to answer.' },
      { h: 'The test on the page' },
      { p: 'Read the sentence and ask whether a person in that situation could plausibly have said it that way. A shape only a prepared speaker could have produced announces the preparation, and announcing the preparation is how a speech stops being addressed to anybody.' },
      { h: 'For an actor' },
      { p: 'A character using a figure is using it for a reason inside the scene, and the reason is never that the writer liked the shape. Somebody who has clearly prepared their sentences is a specific person in a specific state, and frequently one who is frightened of what happens if they improvise.' },
      { p: 'The danger is presenting the figure. Presenting it tells the audience the speaker is performing rather than arguing, and if that is not true of the character, it is not the character showing. It is the actor.' },
    ] },

];

export const RHETORIC_COLLECTIONS = RHETORIC_MODULES
  .filter(m => RHETORIC_LESSONS.some(l => l.module === m.id))
  .map(m => ({
    id: m.id,
    icon: SHELF_ICON[m.id] ?? '🏛️',
    title: m.title,
    note: m.blurb,
    lessons: RHETORIC_LESSONS.filter(l => l.module === m.id)
      .sort((a, b) => a.order - b.order).map(l => l.id),
  }));

export const rhetoricLessonById = id => RHETORIC_LESSONS.find(l => l.id === id) ?? null;
export const rhetoricLessonsFor = moduleId =>
  RHETORIC_LESSONS.filter(l => l.module === moduleId).sort((a, b) => a.order - b.order);
