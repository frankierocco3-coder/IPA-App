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
// seventeen figures with verified examples. Module 4 teaches what a figure
// IS and sends the reader to that shelf rather than restating it; the
// shelf moves to this workspace when module 4 is built.
//
// REVIEW: every lesson here is a draft until a human records it in
// js/data/speech/reviews.js. Required reviewer is 'rhetoric' — a
// knowledgeable rhetoric or oratory reviewer — which is the reviewer type
// that ledger already defines. Claude may write these and may never
// approve them.

export const RHETORIC_PRINCIPLE =
  'Persuasion is not something done to a person. It is the work of making your reasons available to somebody who does not yet hold them, and the same craft that does it honestly is the craft that does it dishonestly.';

// Six modules. Module 1 is written; 2 to 6 are outlined and carry no
// lessons yet, which is why the shelf shows one collection and not six.
export const RHETORIC_MODULES = [
  { n: 1, id: 'ground', title: 'What Rhetoric Is',
    blurb: 'The word, the reputation it lost, and the three questions every persuasive speech answers.' },
  { n: 2, id: 'audience', title: 'The Person Opposite',
    blurb: 'Who you are actually talking to, what they already believe, and why timing is part of the argument.' },
  { n: 3, id: 'invention', title: 'Finding the Argument',
    blurb: 'Where arguments come from, how they are ordered, and what counts as proof to a listener rather than to a logician.' },
  { n: 4, id: 'shape', title: 'The Shapes of Language',
    blurb: 'Figures as structures of thought rather than ornament, and how to play one without announcing it.' },
  { n: 5, id: 'delivery', title: 'Delivery',
    blurb: 'The half of rhetoric that is not on the page: voice, body, pause, and the room.' },
  { n: 6, id: 'ethics', title: 'Honest Persuasion',
    blurb: 'The line between persuading somebody and working on them, and how to tell which one you are doing.' },
];

const SHELF_ICON = { ground: '🏛️', audience: '👂', invention: '🔎',
  shape: '⚖️', delivery: '🗣️', ethics: '⚓' };

export const RHETORIC_LESSONS = [

  // ── Module 1 · What Rhetoric Is ───────────────────────────────
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
