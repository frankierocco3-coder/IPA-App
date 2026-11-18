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

// Six modules, ALL WRITTEN as of 2026-09-29: thirty-six lessons.
// RHETORIC_COLLECTIONS filters to modules that actually have lessons, so a
// module joins the Library by being written and never before. The filter
// is a no-op today and stays, because it is what makes a half-written
// seventh module impossible to ship by accident.
//
// WRITTEN IS NOT APPROVED. Not one of the thirty-six is published: every
// record needs an entry in js/data/speech/reviews.js from a knowledgeable
// rhetoric or oratory reviewer, and Claude may never approve his own
// writing. The workspace is live and its whole body is gated.
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
    orientation: 'A subject that sat at the centre of European education for centuries and now survives mostly as a complaint.',
    reflection: 'Think of the last time you heard the word rhetoric used out loud. Was it a description or an accusation?',
    body: [
      { p: 'When somebody says that a speech was “just rhetoric”, they mean it was empty: words arranged to sound like an argument without being one. That is the ordinary modern use of the word, and it is worth starting there, because it is the meaning you will have to work against.' },
      { p: 'The older meaning is almost the reverse. Rhetoric was the study of how speech changes what people think and do, and it was taught as a practical subject, alongside grammar and logic, for most of the history of European education. Those three were the foundation of the course, and a student met rhetoric as an ordinary part of being educated rather than as a specialism. It was not a warning about persuasion. It was instruction in it.' },
      { h: 'The working definition' },
      { key: 'Rhetoric is the study of what makes speech effective, and the practice of making your own speech effective on purpose rather than by luck.' },
      { p: 'Two halves, and both matter. The study half is why this is a subject and not a knack: the effects are describable, repeatable and teachable. The practice half is why it belongs in an acting app: reading about persuasion does not make anybody persuasive, any more than reading about breathing changes a voice.' },
      { h: 'Why it lost its name' },
      { p: 'Because the same craft that lets an honest person make a true case clearly is the craft that lets a dishonest one make a false case convincingly. Rhetoric is a set of tools, and tools do not choose their user. That is a real problem and this course does not pretend otherwise: module 6 is about nothing else.' },
      { p: 'But abandoning the study does not remove the tools from the world. It only removes them from the people who wanted to use them honestly, and leaves them with everybody else.' },
      { h: 'What you get out of it' },
      { p: 'Three different people get three different things out of the same material.' },
      { defs: [
        { label: 'An actor', text: 'The structure under a speech, which is the difference between reciting an argument and making one.' },
        { label: 'A speaker', text: 'A method for building a case instead of hoping one arrives.' },
        { label: 'Anybody', text: 'A better ear for what is being done to them, which is the defensive use and arguably the more valuable one.' },
      ] },
      { qa: [
        { q: 'Why does the working definition have two halves, and what does each one answer?',
          a: 'The study half is why rhetoric is a subject rather than a knack: the effects are describable, repeatable and teachable. The practice half is why it belongs in an acting app: reading about persuasion does not make anybody persuasive.' },
        { q: 'The same craft serves an honest case and a dishonest one. Why is that not an argument for abandoning the study?',
          a: 'Abandoning it does not remove the tools from the world. It only removes them from the people who wanted to use them honestly, and leaves them with everybody else.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'The definition to keep',
        lead: 'Three things the working definition commits you to.',
        items: [
          'The effects are describable, repeatable and teachable. That is the study half.',
          'Reading about persuasion changes nothing on its own. That is the practice half.',
          'The defensive use — hearing what is being done to you — is arguably the more valuable one.',
        ] } },
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
      { defs: [
        { label: 'Ethos', text: 'Why should I trust you?' },
        { label: 'Pathos', text: 'Why should I care?' },
        { label: 'Logos', text: 'Does this hold together?' },
      ] },
      { h: 'Ethos: why should I trust you?' },
      { p: 'The listener is judging the speaker before they judge the argument. Competence, honesty, and whether this person seems to have the listener’s interest anywhere in mind. It is not reputation, though reputation helps. It is what the speaking itself shows about the speaker.' },
      { p: 'Ethos is why admitting a weakness in your own case can strengthen it, and why over-claiming destroys it. A speaker who has been caught exaggerating once has to win the argument twice.' },
      { h: 'Pathos: why should I care?' },
      { p: 'The listener has to want the outcome before the reasons matter. Pathos is not manipulation and it is not sentiment: it is the work of making a consequence real enough to feel. A number nobody can picture persuades nobody.' },
      { p: 'The common failure is not too little feeling but feeling aimed at the wrong thing. Making a listener sad is easy. Making them sad about the specific thing your argument is about is the craft.' },
      { h: 'Logos: does this hold together?' },
      { p: 'The reasoning itself. Whether the claim follows from the evidence, whether the evidence is what it says it is, and whether the case survives the obvious objection.' },
      { p: 'Logos alone is frequently not enough, which offends people who think it should be. A watertight argument from somebody the listener distrusts, about something they do not care about, can move nobody at all. That is not a flaw in listeners. It is what listeners are for.' },
      { h: 'Use them as questions' },
      { key: 'The three are worth very little as categories for labelling sentences after the fact, which is how they are usually taught. They are worth a great deal as a checklist before you speak.' },
      { p: 'Have I given them a reason to trust me. Have I made them care. Does it hold together. A speech that fails is almost always failing one of those three, and naming which one is most of the repair.' },
      { qa: [
        { q: 'A speaker gives a watertight argument and nobody moves. Which appeal has probably failed, and why is that not the listeners’ fault?',
          a: 'Ethos or pathos. A sound argument from somebody the listener distrusts, about something they do not care about, can move nobody at all — which is not a flaw in listeners, it is what listeners are for.' },
        { q: 'The lesson says the common failure of pathos is not too little feeling. What is it?',
          a: 'Feeling aimed at the wrong thing. Making a listener sad is easy; making them sad about the specific thing your argument is about is the craft.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'When a speech did not land',
        lead: 'Name the appeal that failed before you rewrite anything.',
        items: [
          'They did not trust you. Go back to ethos: what did the speaking itself show about the speaker?',
          'They did not care. Go back to pathos: was the consequence real enough to feel?',
          'It did not hold. Go back to logos: does the claim follow, and does it survive the obvious objection?',
        ] } },
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
      { table: {
        head: ['Occasion', 'Time', 'The question', 'The standard'],
        rows: [
          ['Deliberative', 'The future', 'Should we do this?', 'Advantage'],
          ['Forensic', 'The past', 'What happened, and who is responsible?', 'Justice'],
          ['Epideictic', 'The present', 'What is admirable?', 'Honour'],
        ] } },
      { h: 'Deliberative: about the future' },
      { p: 'Should we do this. A proposal, a pitch, a plan, an argument in a meeting. The question is what to do next, and the standard is advantage: is this better or worse for us than the alternative.' },
      { p: 'Deliberative speech goes wrong when it argues about blame instead of about the decision. The moment a planning conversation becomes an argument about who caused the problem, it has changed occasion and stopped doing its job.' },
      { h: 'Forensic: about the past' },
      { p: 'What happened, and who is responsible. A trial, an investigation, an apology, most domestic arguments. The standard is justice, and the material is evidence.' },
      { p: 'Forensic speech goes wrong when it smuggles in the future. Deciding what somebody did and deciding what to do about them are separate questions, and collapsing them is how a conversation about one mistake becomes a verdict on a person.' },
      { h: 'Epideictic: about the present' },
      { p: 'Praise and blame. A eulogy, a toast, an award, a tribute, a denunciation. The tradition gives its end as honour: the question is what is admirable, and the standard is whether the audience leaves holding the values the speaker held up.' },
      { p: 'This is the one modern speakers underrate, because it looks like it is not doing anything. What it does is slower and harder to see.' },
      { key: 'A community rehearses what it admires at funerals and prize-givings and retirements, and speech of this kind is where that happens out loud.' },
      { qa: [
        { q: 'A planning meeting turns into an argument about who caused the problem. What has happened, in the terms of this lesson?',
          a: 'It has changed occasion. A deliberative speech about what to do next has become a forensic one about the past, and it has stopped doing its job.' },
        { q: 'What goes wrong when forensic speech smuggles in the future?',
          a: 'Deciding what somebody did and deciding what to do about them are separate questions. Collapsing them is how a conversation about one mistake becomes a verdict on a person.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Name the occasion first',
        lead: 'Before you prepare anything, settle which of the three you are making.',
        items: [
          'If the question is what to do next, the standard is advantage. Argue the decision, not the blame.',
          'If the question is what happened, the standard is justice. Stay on the evidence and leave the consequence to a separate conversation.',
          'If the question is what is admirable, the standard is honour. Ask what you want the room holding when they leave.',
        ] } },
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
      { steps: [
        { title: 'Invention', text: 'Finding what to say. Module 3.' },
        { title: 'Arrangement', text: 'Deciding the order. Module 3.' },
        { title: 'Style', text: 'Choosing the words. Module 4.' },
        { title: 'Memory', text: 'Holding it. Lines and Memory, in the Acting Library.' },
        { title: 'Delivery', text: 'Speaking it. Module 5.' },
      ] },
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
      { key: 'Most inexperienced speakers begin at style.' },
      { p: 'They know roughly what they think, they have not looked for what else could be said, they have not decided an order, and they spend their preparation on wording. Then the nerves get blamed for a structural problem.' },
      { qa: [
        { q: 'Why does the course treat memory as a live skill rather than an obsolete stage?',
          a: 'A speaker reading a script cannot watch the room, and a speaker who cannot watch the room cannot adjust.' },
        { q: 'Invention is not inventing in the modern sense. What is it?',
          a: 'Finding: locating the available arguments in a situation, most of which are already there before you start.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Start at the right end',
        lead: 'The order is the point. Taken out of order, the five stop helping.',
        items: [
          'Look for what else could be said before you decide what you think.',
          'Decide the order before you decide the words.',
          'Leave the wording last, not first.',
          'If it keeps going wrong in the room, check the structure before you blame the nerves.',
        ] } },
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
      { defs: [
        { label: 'Claim', text: 'What you want them to believe or do.' },
        { label: 'Reason', text: 'Why that follows.' },
        { label: 'Evidence', text: 'What the reason stands on: a fact, an example, an authority, or something the listener already holds to be true.' },
      ] },
      { h: 'The middle is what goes missing' },
      { p: 'Claims are easy and evidence is easy. The reason is the step that connects them, and it is the step people leave out, usually because it is obvious to the speaker. It is almost never obvious to the listener, who does not share the speaker’s head.' },
      { key: 'State the claim, then say “because”, then finish the sentence. If what follows is the claim again in other words, the argument is circular and no amount of delivery will save it.' },
      { h: 'The unstated premise' },
      { p: 'Every argument rests on something unsaid, and the unsaid part is where disagreement usually lives. Two people arguing about a decision are frequently agreed on every fact and divided on one buried assumption neither has said out loud.' },
      { p: 'Finding your own unstated premise is the most useful single habit in this subject, and the hardest, because it is invisible from the inside. It is also, for an actor, where a scene is: two characters who cannot resolve an argument because neither has noticed what they disagree about.' },
      { qa: [
        { q: 'Which of the three goes missing most often, and why?',
          a: 'The reason. It is the step that connects the claim to the evidence, and people leave it out because it is obvious to them — it is almost never obvious to the listener, who does not share the speaker’s head.' },
        { q: 'Two people agree on every fact and still cannot settle the argument. Where is the disagreement?',
          a: 'In an unstated premise. Every argument rests on something unsaid, and the unsaid part is usually where the disagreement lives.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'The three-line test',
        lead: 'Write any argument of yours as three lines before you speak it.',
        items: [
          'Line one, the claim: what you want them to believe or do.',
          'Line two, because…: the reason. If it is the claim again in other words, stop here.',
          'Line three, the evidence: something the listener already accepts.',
          'Then ask what you have assumed and not said. That is where the argument actually is.',
        ] } },
    ] },

  { id: 'rh-bad', module: 'ground', order: 6,
    title: 'Why It Got Its Bad Name',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Take the oldest objection to rhetoric seriously enough to answer it, rather than defining it away.',
    orientation: 'The charge is that the craft teaches people to win arguments they ought to lose. It is not a foolish charge.',
    reflection: 'Where is the line, for you, between making your case well and working on somebody? Write the sentence before module 6 argues with it.',
    body: [
      { p: 'The complaint is old. It was made in Athens, by philosophers, against teachers who advertised that they could make the weaker argument appear the stronger, and the defences offered since have not closed it.' },
      { p: 'It deserves stating at full strength.' },
      { key: 'If skill at persuasion can be taught separately from having good reasons, then teaching it hands an advantage to whoever is most willing to use it, regardless of whether they are right.' },
      { p: 'A world where everybody is equally skilled is fair. A world where only some are is not, and teaching the skill widens the gap before it closes it.' },
      { h: 'The three usual answers, and what each is worth' },
      { p: 'The first says that rhetoric is neutral, like a knife. True, and not much comfort: the question was never whether tools are neutral but what follows from putting them about.' },
      { p: 'The second says that good arguments are easier to make well, so the craft favours truth on balance. Partly true, and it is the most honest of the three, but anybody who has watched a confident falsehood beat a hesitant fact knows the balance is not reliable.' },
      { p: 'The third says that the defensive use justifies the study: you cannot see what is being done to you unless you know how it is done. This course takes that one to be the strongest of the three, and it is the reason the subject survives in a world suspicious of it.' },
      { h: 'Where this course lands' },
      { p: 'Nowhere comfortable, on purpose. The tools are real, they work, and they do not care who holds them.' },
      { qa: [
        { q: 'Which of the three usual answers does this course take to be the strongest, and why?',
          a: 'The defensive one: you cannot see what is being done to you unless you know how it is done. It is the reason the subject survives in a world suspicious of it.' },
        { q: 'What is wrong with answering the charge by saying that rhetoric is neutral, like a knife?',
          a: 'It is true and it is not much comfort. The question was never whether tools are neutral but what follows from putting them about.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Why this lesson is in module 1',
        text: 'Learning the craft makes you more effective and more responsible in the same movement, and the responsibility is not a bonus lesson at the end. It is why module 6 exists, and why the oldest objection to the subject is stated here rather than hidden at the back.' } },
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
      { p: 'The pattern is everywhere once you look for it.' },
      { list: [
        'A lawyer speaks to a witness and argues to the jury.',
        'In a meeting you answer the loudest objection in the room and persuade the quiet person who has not spoken yet, because they are the one who has not made up their mind.',
        'In a family argument the two people shouting are frequently not each other’s audience; the audience is the third person at the table.',
      ] },
      { key: 'A speech aimed at the wrong listener can be faultless and useless.' },
      { p: 'It is a common structural failure and an invisible one from inside, because the speaker is getting a response. It is simply a response from somebody whose mind was never the point.' },
      { h: 'The overhearer' },
      { p: 'Much speech has an audience beyond the room: the minutes, the recording, the person who will be told about it afterwards, the version that gets repeated. Knowing they are there changes what can be said and often changes what should be.' },
      { p: 'It is worth being honest about the cost. Speaking for the record is how an exchange stops being an exchange. A conversation in which both people are performing for somebody absent has the shape of a discussion and none of the function, and everybody present can feel it.' },
      { qa: [
        { q: 'Why is aiming at the wrong listener invisible from inside?',
          a: 'Because the speaker is getting a response. It is simply a response from somebody whose mind was never the point.' },
        { q: 'What does speaking for the record cost the conversation you are actually in?',
          a: 'It stops being an exchange. A conversation in which both people are performing for somebody absent has the shape of a discussion and none of the function, and everybody present can feel it.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Before you open your mouth',
        lead: 'Two questions, and they take a second each.',
        items: [
          'Whose mind actually has to change? Name the person.',
          'Is that the person you are addressing? Often it is not.',
          'Who else hears this: the minutes, the recording, the person who gets told afterwards?',
          'Getting a response is not evidence you reached the right listener.',
        ] } },
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
      { key: 'A premise the listener does not accept is not a premise. It is a second argument you have not made yet, and stacking the first on top of it means neither one stands.' },
      { h: 'Common ground is structural, not polite' },
      { p: 'Every step of an argument rests on something already accepted, or the step does not get taken. This is why finding shared ground is the real preparation and why it cannot be done in the room: it is research about a person, and it takes longer than choosing words.' },
      { h: 'The two common failures' },
      { sub: 'Assuming premises that are not shared' },
      { p: 'The speaker builds from their own world and never notices the gap, and the argument fails at a joint neither party can see. Two people can agree on every fact in a dispute and divide on one buried value, which is the point module 1 makes about the unstated premise.' },
      { sub: 'Refusing to stand on a belief you think is wrong' },
      { p: 'You can start from somebody’s premise and end somewhere they did not expect. That is what an argument is for. Refusing the starting point because you dislike it guarantees you never get anywhere near the conclusion.' },
      { h: 'When there is no common ground' },
      { p: 'Sometimes there genuinely is none, and the honest move is to say the disagreement is deeper than the subject in front of you. Manufacturing agreement you do not feel is worse than admitting the gap: it is visible, and it costs the one thing that was holding the exchange together, which module 1 calls ethos.' },
      { qa: [
        { q: 'Why does the course call common ground structural rather than polite?',
          a: 'Every step of an argument rests on something already accepted, or the step does not get taken. Without it there is nothing to build with.' },
        { q: 'Why can the real preparation not be done in the room?',
          a: 'It is research about a person, and it takes longer than choosing words.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'Finding the ground',
        lead: 'You do not choose the starting point of an argument. They do.',
        items: [
          'Write one sentence they believe that you believe too. Start there.',
          'Check every step for the thing it assumes, and ask whether they hold it.',
          'You may stand on a premise you think is wrong and still end somewhere they did not expect.',
          'If there is genuinely no ground, say the disagreement is deeper rather than manufacturing agreement.',
        ] } },
    ] },

  { id: 'rh-supply', module: 'audience', order: 3,
    title: 'The Argument They Finish',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Learn why a conclusion the listener reaches is held harder than one they are handed, and where that stops being honest.',
    orientation: 'The strongest arguments leave a step for the listener to take.',
    reflection: 'Take an argument you made recently. Which step could you have left out and trusted them to supply?',
    body: [
      { p: 'An argument with a step left unsaid is the ordinary shape of real persuasion. The speaker states a claim and a reason, and the listener supplies the premise that joins them, usually without noticing they have done it.' },
      { p: 'The classical name attached to this is the enthymeme, and the name is less settled than handbooks make it sound: the tradition’s own account is of a deduction from probabilities and signs, and the tidy modern definition of a syllogism with one premise missing is a later gloss that scholars dispute. Nothing below turns on which is right. The thing itself is not in question.' },
      { p: 'Module 1 approached the unstated premise from the speaker’s side: finding the assumption buried in your own case. This is the same fact from the other side. The listener completes the argument, and the completing is where the persuading happens.' },
      { h: 'Why the missing step is the strong one' },
      { p: 'A conclusion you arrived at yourself is yours. One that was handed to you belongs to the person who handed it over, and it can be handed back the moment they are out of the room. Few people defend a position they were merely given with the energy they bring to one they worked out.' },
      { p: 'It is also a test. If the listener supplies the premise, they hold it, and you have confirmed your common ground without asking. If they do not supply it, the argument stalls in a way you can see, which is better information than agreement would have been.' },
      { h: 'The same move is the best way to smuggle' },
      { p: 'A premise that is never stated is a premise that is never examined. This is precisely the mechanism behind the family of errors All Fallacies groups under smuggling in assumptions, and the efficiency that makes the enthymeme good is what makes it dangerous.' },
      { p: 'The line is straightforward to state and requires honesty to hold.' },
      { key: 'Leaving a step out because the listener already holds it is argument. Leaving it out because they would reject it if they heard it said aloud is not.' },
      { qa: [
        { q: 'Why is a conclusion the listener reached held harder than one they were handed?',
          a: 'A conclusion you arrived at yourself is yours. One that was handed to you belongs to the person who handed it over, and it can be handed back the moment they are out of the room.' },
        { q: 'The listener does not supply the missing premise and the argument stalls. Why is that useful?',
          a: 'Because you can see it. A stall is better information than agreement would have been: it tells you the common ground you assumed is not there.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Leaving the step out',
        lead: 'The same move is the strongest honest one and the easiest dishonest one.',
        items: [
          'Leave it out when they already hold it. They will complete the argument and hold the conclusion harder for it.',
          'Say it out loud when they would reject it. A premise never stated is a premise never examined.',
          'Watch whether they supply it. If they do, your common ground is confirmed without your having asked.',
        ] } },
    ] },

  { id: 'rh-resist', module: 'audience', order: 4,
    title: 'Meeting Resistance',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Find what a listener is actually resisting, which is rarely the claim they are arguing against.',
    orientation: 'People rarely resist only a proposition. They resist what accepting it would cost.',
    reflection: 'Think of somebody who will not be moved on something. What would it cost them to agree with you?',
    body: [
      { p: 'People hold positions for reasons that are frequently not the reason they give, and this is not usually dishonesty. The stated reason is the one available for saying out loud.' },
      { h: 'What resistance usually is' },
      { p: 'The cost of agreeing, which takes more shapes than it looks like it does.' },
      { list: [
        'Being wrong in front of people who watched them be certain.',
        'A loyalty to somebody who holds the same view.',
        'An identity the position is part of.',
        'Work they would have to do, or money they would have to spend.',
        'An apology that would become owed the moment they conceded.',
      ] },
      { key: 'Argue with the stated reason and you can win every exchange in the conversation and move nobody, because you have been dismantling a position that was never load bearing.' },
      { h: 'Build their case before you touch it' },
      { p: 'State their position in words they would accept. If you cannot do it, you are not arguing with them yet, you are arguing with a version of them, and All Fallacies has a whole family about what that produces.' },
      { p: 'Doing it properly buys something no other move buys: a listener who has just heard their own view put fairly is more likely, for a short while, to be actually listening. That is the practical value, and it is why the habit is recommended across the serious accounts of the subject.' },
      { h: 'Concession' },
      { p: 'Conceding a real point is the cheapest credibility available. It narrows the argument to what genuinely divides you, and it demonstrates that you are capable of being moved, which is the precondition for asking somebody else to be.' },
      { p: 'False concession does the opposite. The sentence that begins by granting something and pivots on “but” before the granting has landed is heard as a tactic, because it is one, and it costs more than the point was worth.' },
      { h: 'Knowing when to stop' },
      { p: 'Some people will not be moved, and continuing past that point is not persistence. It is a failure to notice. The craft includes recognising the moment when the person in front of you has become the occasion rather than the audience, and the listener who matters is somebody else in the room.' },
      { qa: [
        { q: 'What does stating the other side’s position fairly actually buy you?',
          a: 'A listener who has just heard their own view put fairly is more likely, for a short while, to be actually listening. That is the practical value, not the courtesy.' },
        { q: 'Why is false concession worse than making no concession at all?',
          a: 'The sentence that grants something and pivots on “but” before the granting has landed is heard as a tactic, because it is one, and it costs more than the point was worth.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Working with resistance',
        lead: 'In order, because each step needs the one before it.',
        items: [
          'Ask what agreeing would cost them. That is usually what they are defending.',
          'State their position in words they would accept. If you cannot, you are arguing with a version of them.',
          'Concede a real point. It narrows the argument and shows you can be moved.',
          'Notice when they have become the occasion rather than the audience, and speak to whoever else is in the room.',
        ] } },
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
      { key: 'A true argument made into a moment that cannot receive it gets rejected, and the rejection is the expensive part.' },
      { p: 'The argument is now harder to make later, because it has been refused once and reviving it means asking somebody to reverse themselves rather than to decide.' },
      { p: 'This is why the instinct to say the true thing immediately is not always the honest one. Waiting is sometimes the only way the true thing gets heard at all.' },
      { h: 'What makes a moment' },
      { list: [
        'What has just happened.',
        'What they have just conceded, which is a door that closes quickly.',
        'What they are frightened of right now rather than in general.',
        'How tired everybody is.',
        'Who has just left the room, and whether the thing that could not be said in front of them can be said now.',
      ] },
      { h: 'Making the moment instead of waiting for it' },
      { p: 'A good speaker builds receptiveness rather than hoping for it.' },
      { list: [
        'Naming an objection before it hardens into a position.',
        'Asking for something smaller first.',
        'Separating a decision from the question of who was to blame for needing it.',
      ] },
      { h: 'The honest limit' },
      { p: 'Timing is also the most respectable excuse available. An argument permanently postponed until the moment is right is sometimes an argument the speaker is afraid to make, and the vocabulary of good judgement is what makes that comfortable. Worth asking which one is happening, because from the inside they feel identical.' },
      { qa: [
        { q: 'Why is the instinct to say the true thing immediately not always the honest one?',
          a: 'A true argument made into a moment that cannot receive it gets refused, and reviving it later means asking somebody to reverse themselves rather than to decide. Waiting is sometimes the only way the true thing gets heard at all.' },
        { q: 'How do you tell good timing from avoidance?',
          a: 'You frequently cannot, from the inside — they feel identical. The honest move is to ask the question rather than to assume the flattering answer.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Reading the moment',
        lead: 'The right moment is part of the argument, not a piece of luck beside it.',
        items: [
          'Ask whether this moment can receive the argument before you ask whether the argument is right.',
          'Spend what has just been conceded. That door closes quickly.',
          'Build receptiveness rather than waiting for it: a smaller ask, an objection named early, blame separated from the decision.',
          'If you keep postponing, ask once whether it is judgement or fear.',
        ] } },
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
      { list: [
        'The moment they stop listening and begin waiting to speak, which has a look.',
        'The nod that means agreement against the nod that means go on, which are different.',
        'Questions that are objections wearing a question mark.',
        'The particular stillness of somebody who has decided and is being polite about it.',
      ] },
      { h: 'What to change, and what not to' },
      { p: 'Change the route: the order, the example, which premise you are standing on, how much you are asking for. Any of those can move without damage.' },
      { p: 'Do not change the claim. A speaker who revises what they are arguing for in response to resistance is heard as having no position, and the listener stops attending to the argument and starts watching the speaker manoeuvre.' },
      { key: 'The claim is the one fixed thing; everything else was always negotiable.' },
      { h: 'Delivery is the next module' },
      { p: 'Voice, body, pause and the room are module 5, and they are half of whether any of this arrives. This lesson is about the argument rather than the speaking of it, and the separation is deliberate: a great many speakers try to fix a structural problem with delivery, which module 1 warns about in its account of the canons.' },
      { qa: [
        { q: 'Why does a speaker reading from a script lose the thing this lesson is about?',
          a: 'They are watching the page, and a speaker watching the page cannot see the moment the room turns. That is why module 1 lists memory as a live skill rather than an obsolete stage.' },
        { q: 'What may move in the room, and what may not?',
          a: 'The route may move: the order, the example, which premise you stand on, how much you are asking for. The claim may not.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'What all the preparation was for',
        lead: 'The listener you prepared for is an estimate. The one in front of you is the fact.',
        items: [
          'Watch the face, not the page. Everything else in this module assumed you could.',
          'Move the route freely: order, example, premise, the size of the ask.',
          'Leave the claim where it is, or they stop following the argument and start watching you manoeuvre.',
          'If the trouble is structural, delivery will not fix it. Go back to the canons.',
        ] } },
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
      { p: 'The difference shows under pressure.' },
      { key: 'An argument you picked out of five is one you can abandon for another. An argument that simply arrived is the only one you have, and when it fails you have nothing left to say.' },
      { h: 'Collect before you choose' },
      { p: 'Write down the arguments you do not intend to use. The weak ones are worth having on paper because they are what the other side will reach for, and because a case you can argue from both directions is one you actually understand.' },
      { p: 'This is also the honest test of whether you have a case at all. If the search produces one argument and it is the one you started with, you have a conviction rather than an argument, and the rest of this module will not help until that changes.' },
      { qa: [
        { q: 'What is the difference between asking “what shall I say” and “what is available here”?',
          a: 'The first produces whatever occurs to you, which is usually the most obvious thing. The second produces a list, and then you choose from it.' },
        { q: 'Why write down the arguments you do not intend to use?',
          a: 'The weak ones are what the other side will reach for, and a case you can argue from both directions is one you actually understand.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Search, then choose',
        lead: 'Invention is finding, not making up. Treat it as a search with two stages.',
        items: [
          'Ask what is available here, not what you want to say.',
          'Write every argument down, including the ones you will not use.',
          'Choose from the list. Five arguments means four spares when one fails.',
          'One argument, and it is the one you started with? That is a conviction, not a case.',
        ] } },
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
      { p: 'Analogy and degree. If we already act on something worse, this follows. If we refuse something smaller, this cannot stand. Comparison does a great deal of the work in ordinary argument and is among the most open to abuse, which is why false equivalence sits on the fallacy shelf.' },
      { h: 'Relationship: what caused it, what follows from it, what is its opposite?' },
      { p: 'Cause backwards and consequence forwards. The opposite is the one people forget: showing what the contrary would look like frequently makes a claim visible that direct statement could not.' },
      { h: 'Circumstance: is it possible, and has it happened before?' },
      { p: 'Whether a thing can be done, and whether it has been. Precedent is a strong move in almost any setting, because it converts an argument about the future into a statement about the past.' },
      { h: 'Testimony: who says so, and what do they gain?' },
      { p: 'Witnesses, documents, records, numbers, precedent. The tradition keeps these separate from the rest because they are not made by the speaker, only presented. Presenting them well is a real skill and an underrated one.' },
      { h: 'Use them as a checklist' },
      { p: 'Run the subject through each in turn.' },
      { key: 'Most will produce nothing, which is fine and expected. One or two will produce something you had not thought of, and that is the entire return on the method.' },
      { qa: [
        { q: 'The Greek word behind “topics” means places. Places to do what?',
          a: 'Places to go and look. They are not subjects and they are not arguments — they are the small number of questions that reliably produce arguments when asked of anything at all.' },
        { q: 'Which of the five is not made by the speaker, and what does that change?',
          a: 'Testimony: witnesses, documents, records, numbers, precedent. They are presented rather than constructed, which is a different skill and an underrated one.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'The five places to look',
        lead: 'Ask each of these about any subject. Carry the list; a blank page stops being blank.',
        items: [
          'Definition — what kind of thing is this?',
          'Comparison — what is it like, and is it more or less?',
          'Relationship — what caused it, what follows from it, what is its opposite?',
          'Circumstance — is it possible, and has it happened before?',
          'Testimony — who says so, and what do they gain?',
        ] } },
    ] },

  { id: 'rh-stasis', module: 'invention', order: 3,
    title: 'Finding the Real Disagreement',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Identify which question is actually in dispute, because arguing the wrong one is a reliable way to lose.',
    orientation: 'Four questions, in order. The argument lives at the first one you disagree about.',
    reflection: 'In a dispute you are in, which of the four is the real one? Are you arguing there, or somewhere more comfortable?',
    body: [
      { p: 'The tradition has a doctrine for this, and this course finds it the most immediately useful thing in the subject. The name means the standing point: the place where an argument comes to rest and the two sides are genuinely opposed.' },
      { steps: [
        { title: 'Fact', text: 'Did it happen?' },
        { title: 'Definition', text: 'What is it?' },
        { title: 'Quality', text: 'How serious is it?' },
        { title: 'Procedure', text: 'Is this the right place to settle it?' },
      ] },
      { h: 'Did it happen?' },
      { p: 'A question of fact. Either it occurred or it did not, and evidence settles it or nothing does.' },
      { h: 'What is it?' },
      { p: 'A question of definition. Both sides agree on what happened and divide on what to call it. A great many public arguments are here and almost none of them say so.' },
      { h: 'How serious is it?' },
      { p: 'A question of quality. Agreed on the facts, agreed on the name, divided on whether it is grave or trivial, excusable or not.' },
      { h: 'Is this the right place to settle it?' },
      { p: 'A question of procedure. Who decides, under what authority, by what process. It sounds like a technicality and it is frequently the whole case.' },
      { h: 'Why the order matters' },
      { key: 'You are in dispute at the FIRST point where you diverge, and everything after it is not yet in question.' },
      { p: 'Two people arguing about how serious something is, who have not noticed they disagree about what it is, will not converge no matter how long they go on, because they are answering different questions and each can hear that the other is not making sense.' },
      { h: 'The honest part' },
      { p: 'People move between the four to avoid losing, and doing it deliberately is a tactic rather than an argument. Retreating from a strong claim to a modest one, or raising the standard once it has been met, both have names on All Fallacies. Naming the level out loud is usually enough to stop it.' },
      { qa: [
        { q: 'Why does the order of the four matter rather than the list?',
          a: 'The argument lives at the first point where the two sides diverge. Everything after it is not yet in question, so arguing there is arguing about nothing.' },
        { q: 'A question of procedure sounds like a technicality. Why is it on the list?',
          a: 'Who decides, under what authority, by what process is frequently the whole case.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Find the standing point',
        lead: 'Walk the four in order and stop at the first one you actually disagree about.',
        items: [
          'Did it happen? If you agree, go on.',
          'What is it? A great many public arguments live here and almost none of them say so.',
          'How serious is it? Only once the name is settled.',
          'Is this the right place to settle it? Who decides, and by what process.',
          'If somebody slides between levels, name the level out loud. That is usually enough.',
        ] } },
    ] },

  { id: 'rh-proof', module: 'invention', order: 4,
    title: 'What Counts as Proof',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Judge evidence by what a listener can do with it, rather than by what would satisfy a logician.',
    orientation: 'A listener is not a proof checker, and what moves them is not therefore irrational.',
    reflection: 'What is the most vivid TRUE thing you could show them? Why is it not in your argument yet?',
    body: [
      { p: 'The tradition separates the proofs a speaker makes from the proofs a speaker finds.' },
      { defs: [
        { label: 'Made', text: 'Reasoning. The speaker constructs it.' },
        { label: 'Found', text: 'Documents, witnesses, records and numbers. They need presenting rather than constructing, which is a different job and one most speakers do carelessly.' },
      ] },
      { h: 'Two ways to reason' },
      { defs: [
        { label: 'The example', text: 'From cases to a general claim.' },
        { label: 'The enthymeme', text: 'From a shared premise to a conclusion. Module 2 covers what the listener does with it, and the short version is that they finish it themselves, which is why it holds.' },
      ] },
      { h: 'Why the vivid beats the general' },
      { p: 'One case a listener can picture usually moves them more than a figure covering a million people. This is worth being honest about rather than scolding: it is not a defect in listeners, it is how understanding works. A number is a claim about a world nobody has seen. An instance is a thing you can hold, and a speaker who supplies none has left the listener nothing to think with.' },
      { key: 'Using a vivid case to illustrate a general claim that is true is teaching. Using one to stand in place of a general claim that is not true is the move All Fallacies files under misusing evidence. Same technique, opposite honesty, and the only difference is whether the general claim would survive without the story.' },
      { h: 'What evidence cannot do' },
      { p: 'It cannot make somebody care. A listener who does not want the outcome will find the evidence uninteresting rather than unconvincing, and no amount of it changes that. That is what module 1 means by pathos, and it is why evidence alone loses arguments it should win.' },
      { h: 'Test your own' },
      { p: 'Ask what you would expect to see if the claim were false, and whether anybody has looked. If the answer is that nothing would look different, you are not holding evidence. You are holding an interpretation.' },
      { qa: [
        { q: 'One vivid case usually moves a listener more than a figure covering a million people. Why is that not a defect in listeners?',
          a: 'It is how understanding works. A number is a claim about a world nobody has seen; an instance is a thing you can hold, and a speaker who supplies none has left the listener nothing to think with.' },
        { q: 'What can evidence not do, however much of it you have?',
          a: 'Make somebody care. A listener who does not want the outcome finds the evidence uninteresting rather than unconvincing — which is what module 1 means by pathos.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Testing your own evidence',
        lead: 'Four questions, before anybody else asks them.',
        items: [
          'What would I expect to see if this were false? Has anybody looked?',
          'Would the general claim survive without the story? If not, the story is standing in for it.',
          'Is there one true vivid thing I could show them, and why is it not in the argument yet?',
          'Do they want this outcome? If not, more evidence is not the missing piece.',
        ] } },
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
      { olist: [
        'An opening that gives them a reason to listen.',
        'The facts, told plainly.',
        'The proposition, which is what you are actually asking for.',
        'The proof.',
        'The answer to the objection.',
        'The close.',
      ] },
      { p: 'It is not a template to fill in, and treating it as one produces the stiff, over-signposted speech everybody recognises.' },
      { key: 'It is a checklist for what is MISSING, which is usually the proposition.' },
      { h: 'What decides the order' },
      { p: 'Dependency. Every step has to stand on something the listener already accepts, so the order is set by what they must agree to before the next point can land. The first stone is the common ground from module 2, and if you cannot name it the order will not come out right however you shuffle it.' },
      { h: 'Strongest first or strongest last' },
      { p: 'The tradition argues about this and so has everybody since, which is itself the useful information: there is no settled answer. Strong first buys the attention you need to be heard at all. Strong last is what they carry out of the room. The common compromise is to open strong, put the rest in the middle, and finish strongest.' },
      { p: 'What actually decides it is whether they will still be listening at the end. If attention is uncertain, lead. If you have the room, build.' },
      { h: 'The statement of facts is never neutral' },
      { p: 'A plain account of what happened is already an argument. What you include, what you leave out and the order you tell it in do most of the work, and they do it before anybody thinks to start disagreeing. In many cases it is the most powerful part of the speech and the part least defended against.' },
      { qa: [
        { q: 'What sets the order of a case, if not the strength of the arguments?',
          a: 'Dependency. Every step has to stand on something the listener already accepts, so the order is set by what they must agree to before the next point can land.' },
        { q: 'Strongest first or strongest last — what does the lack of a settled answer tell you?',
          a: 'That it depends on attention. Strong first buys the hearing you need at all; strong last is what they carry out of the room. If attention is uncertain, lead. If you have the room, build.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Putting a case in order',
        lead: 'Take the same reasons and move them. It is the cheapest improvement in the course.',
        items: [
          'Name the common ground first. If you cannot, no amount of shuffling will come out right.',
          'Order by dependency: what must they accept before the next point can land?',
          'Check the list of parts for what is missing, not for what to fill in. It is usually the proposition.',
          'Tell the facts deliberately. A plain account is already an argument, and the least defended against.',
        ] } },
    ] },

  { id: 'rh-objection', module: 'invention', order: 6,
    title: 'Where the Objection Goes',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Answer the strongest objection on purpose, and decide deliberately whether to raise it before they do.',
    orientation: 'Most cases have one objection that really matters. Behaving as though it does not is among the most visible weaknesses a speech can have.',
    reflection: 'What is the strongest thing that can be said against you? If you cannot state it well, you do not yet understand your own case.',
    body: [
      { p: 'Refutation is a part of arrangement rather than an afterthought, and where it goes is a decision. Most speakers make it by accident, which usually means leaving the objection out and hoping.' },
      { h: 'Find the real one' },
      { p: 'Not the easiest objection, which is the one speakers answer because answering it feels good.' },
      { key: 'The real one is the objection you keep hoping nobody raises, and you already know what it is.' },
      { h: 'Raise it yourself, or wait' },
      { defs: [
        { label: 'They will think of it', text: 'Raise it first. You state it in your own words, you get the credit for honesty, and you are answering rather than defending.' },
        { label: 'They probably will not', text: 'Leave it. Raising it hands them a weapon they did not have.' },
      ] },
      { p: 'So the question is likelihood, and the temptation is to answer it conveniently rather than accurately. Be honest about how obvious the objection is. A speaker who convinces themselves nobody will notice is usually the only person in the room who has not.' },
      { h: 'How to answer one' },
      { p: 'Concede what is true in it, then show precisely what it does not reach. An objection that is flatly denied stays alive in the listener, because they can see the part of it that was right and now they are watching you avoid it.' },
      { h: 'The one you cannot answer' },
      { p: 'Sometimes there is an objection you genuinely cannot meet. Saying so costs far less than concealing it. A case with an acknowledged weakness is still a case, and listeners will weigh it. A case caught hiding one is finished, and the weakness is no longer the issue.' },
      { qa: [
        { q: 'Why does flatly denying an objection leave it alive in the listener?',
          a: 'They can see the part of it that was right, and now they are watching you avoid it. Concede what is true in it, then show precisely what it does not reach.' },
        { q: 'What is the danger in deciding how likely an objection is?',
          a: 'The temptation is to answer it conveniently rather than accurately. A speaker who convinces themselves nobody will notice is usually the only person in the room who has not.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Handling the objection that matters',
        lead: 'Most cases have one. Decide about it on purpose rather than by omission.',
        items: [
          'Name the objection you keep hoping nobody raises. That is the real one.',
          'Decide honestly how likely they are to reach it, then raise it or leave it on that basis.',
          'Answer by conceding what is true in it and showing exactly what it does not reach.',
          'If you genuinely cannot meet it, say so. A case caught hiding a weakness is finished.',
        ] } },
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
    orientation: 'The tradition ranked the virtues of style, and ornament came last in the ranking.',
    reflection: 'Find a sentence of your own you are proud of. Say it aloud to somebody outside the subject. Did they need it twice?',
    body: [
      { p: 'Style is the third canon: the choice of words and the shape of sentences. It has the poorest reputation of the five, because it is the stage most people think rhetoric consists entirely of, and because it is the one that can be practised without having anything to say.' },
      { p: 'The correction is to stop treating style as decoration applied to a finished argument. It is how the argument arrives, and an argument that arrives wrong has not arrived.' },
      { h: 'The virtues, in order' },
      { p: 'The tradition lists four qualities of good style and puts them in a sequence.' },
      { olist: [
        'Correctness — errors in your listener’s language spend credibility on nothing at all.',
        'Clarity — speech happens once, at your pace.',
        'Appropriateness — the next lesson is about nothing else.',
        'Ornament — last, and the ordering is the teaching.',
      ] },
      { key: 'The order is the whole teaching, and ornament is at the back of it.' },
      { p: 'Correctness comes first for an unglamorous reason. Errors in the language your listener speaks spend credibility on nothing at all, and module 1 calls that ethos: the least interesting way to lose it is to lose it on a mistake that had no bearing on your case.' },
      { h: 'Why clarity outranks everything after it' },
      { p: 'A reader can go back. A listener cannot, and a listener who has stopped to work out your last sentence has missed the one you are saying now. Speech happens once, at your pace, and every obscurity costs the sentence after it as well as itself.' },
      { p: 'So clarity in speech is not the same virtue as clarity on a page. It is a constraint on how much a single sentence may carry, and a great deal of unclear speech is not badly worded. It is overloaded.' },
      { h: 'What obscurity is usually doing' },
      { p: 'Three honest causes.' },
      { list: [
        'The speaker has not finished thinking, and the sentence is doing the thinking in public.',
        'The subject is genuinely difficult and has not been broken into pieces yet.',
        'The sentence is carrying three claims and would be three sentences.',
      ] },
      { p: 'And one dishonest one, which is worth naming plainly because it is common and rewarded: obscurity as a claim to depth.' },
      { key: 'A sentence nobody can pin down cannot be shown to be wrong, and it borrows the authority of difficulty without doing anything difficult.' },
      { p: 'It is the one failure of clarity that regularly gets mistaken for a strength.' },
      { h: 'Abstraction' },
      { p: 'An abstract noun is a lid. Put one on a sentence and the listener cannot see what is inside, which is frequently the point and frequently an accident. Restructuring is not a decision, an initiative is not a thing anybody did, and a challenge is not a problem until somebody says whose.' },
      { p: 'This is a fact about words, and it has a companion in module 3, which says the same thing about evidence: one case a listener can picture does more than a figure covering a million people. Concrete language and concrete proof are the same instinct at two different stages of the work.' },
      { h: 'The test' },
      { p: 'Say it to somebody who does not work in your subject, and watch for the slow nod. The slow nod is not agreement. It is a person deciding not to ask, and every one of them marks a sentence to cut or split.' },
      { p: 'An actor has a version of the same test, and it is stricter. You cannot play a sentence you have not understood, and an audience tends to hear the difference between a performer who knows what a line means and one who has learnt its shape. A line you can only deliver is a line you have not read.' },
      { qa: [
        { q: 'Why is clarity in speech a different virtue from clarity on a page?',
          a: 'A reader can go back and a listener cannot. It is therefore a constraint on how much one sentence may carry, which is why a great deal of unclear speech is not badly worded but overloaded.' },
        { q: 'What is the slow nod, and what should you do about it?',
          a: 'It is not agreement. It is a person deciding not to ask, and every one of them marks a sentence to cut or split.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Cutting for the ear',
        lead: 'A sentence the listener has to solve has already lost its moment.',
        items: [
          'One claim per sentence. Three claims in one sentence is three sentences.',
          'Lift the lid off the abstract nouns: who did it, and to whom?',
          'Say it to somebody outside your subject and count the slow nods.',
          'If you cannot say it plainly, you have not finished thinking it.',
        ] } },
    ] },

  { id: 'rh-levels', module: 'shape', order: 2,
    title: 'High, Middle and Plain',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Match the level of language to the occasion, the subject and the listener, because a mismatch is heard as a misjudgement about all three.',
    orientation: 'Three registers. The skill is not managing the grand one, it is knowing what the moment can hold.',
    reflection: 'Name a speech pitched too high for its occasion. What did the excess actually tell you about the speaker?',
    body: [
      { p: 'The tradition divides style into three levels, and the division survives because it describes something speakers get wrong often and cannot name.' },
      { table: {
        head: ['Level', 'What it is for', 'Where it fails'],
        rows: [
          ['Plain', 'Teaching and proving', 'Nothing to hide behind — a thin thought shows at once'],
          ['Middle', 'Explanation with several steps', 'Rarely. Most speakers can already manage it'],
          ['Grand', 'Moving people to feel or to act', 'Its failures are the hardest of the three to hide'],
        ] } },
      { h: 'Plain' },
      { p: 'For teaching and for proving. Short constructions, ordinary words, nothing calling attention to itself. It is not the artless level, and it is the hardest of the three to do well, because there is nothing in it to hide behind: if the thought is thin, a plain sentence shows it immediately.' },
      { h: 'Middle' },
      { p: 'The working register of most real speech. Fuller than plain, no heat in it, pleasant enough to keep somebody listening through an explanation that has several steps. Most speech belongs here, and most speakers can already manage it.' },
      { h: 'Grand' },
      { p: 'For moving people to feel something or to act. Longer sentences, stronger figures, a subject the audience already agrees is serious. It is the level everybody thinks of as rhetoric, and the one whose failures are hardest to hide.' },
      { h: 'Appropriateness decides, not taste' },
      { p: 'The third virtue of style governs the choice, and three things set it: the occasion, which module 1 divides into decisions, judgements and praise; the subject, and specifically how grave the audience already believes it to be; and the listener, which is the whole of module 2.' },
      { p: 'None of those is a preference. The level is not something you choose because it suits you.' },
      { key: 'A speaker with one register is not stylish. They are limited, and they will be right only when the occasion happens to suit them.' },
      { h: 'The mismatch, both directions' },
      { p: 'Grand language on a small subject is the commoner error and the more expensive. The audience does not hear grandeur, they hear somebody who has misjudged what matters, and that judgement carries over to everything else the speaker says.' },
      { p: 'Plain language on a genuinely grave matter fails the other way, and speakers who pride themselves on plainness are the slowest to believe it. At a funeral, in an apology, on the occasion somebody has waited years for, flatness does not read as restraint. It reads as insufficient care, which is a claim about how much the speaker minds.' },
      { h: 'Height is spent, not held' },
      { key: 'The grand style draws on the audience’s willingness to be moved, and that account is finite.' },
      { p: 'A speech at height throughout arrives nowhere, because there is no height left to arrive at, and an audience stops registering the elevation long before the end.' },
      { p: 'Which is why coming down is a technique rather than a failure of nerve. A plain sentence after a long ascent carries more weight than anything in the ascent, and it is among the most reliable ways in this subject to make one sentence land.' },
      { qa: [
        { q: 'Which mismatch is the commoner and the more expensive, and what does the audience actually hear?',
          a: 'Grand language on a small subject. They do not hear grandeur, they hear somebody who has misjudged what matters — and that judgement carries over to everything else the speaker says.' },
        { q: 'Why does plainness fail at a funeral or in an apology?',
          a: 'Flatness on a genuinely grave matter does not read as restraint. It reads as insufficient care, which is a claim about how much the speaker minds.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Choosing the level',
        lead: 'Three things set it, and none of them is your taste.',
        items: [
          'The occasion — a decision, a judgement or a piece of praise.',
          'The subject — specifically, how grave the audience already believes it to be.',
          'The listener — the whole of module 2.',
          'Then spend the height rather than holding it. Come down for the sentence that has to land.',
        ] } },
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
      { key: 'A figure is a departure from the plainest available way of saying a thing, where the departure does work. If the plainest way would have done the same job, there is no figure, only a longer sentence.' },
      { h: 'Two families' },
      { p: 'The tradition separates shapes of arrangement from turns of meaning, and calls them schemes and tropes.' },
      { defs: [
        { label: 'Schemes', text: 'Shapes of arrangement. The words mean what they usually mean and the ORDER does the work: repetition, balance, reversal, a series.' },
        { label: 'Tropes', text: 'Turns of meaning. A word stops meaning itself: one thing called another, a thing overstated, a thing named as its own opposite.' },
      ] },
      { p: 'The shelf is weighted toward the first family, and it is honest about that. The most consequential member of the second is metaphor, which the shelf does not hold at all, and it has the next lesson to itself.' },
      { h: 'The shape is the claim' },
      { p: 'This is the part that turns a vocabulary list into a subject. A pattern asserts something that no word in the sentence states.' },
      { list: [
        'Balance claims that two things are the same kind of thing and can be weighed against each other.',
        'Setting two halves in opposition claims that they genuinely are opposed, rather than merely different.',
        'Repeating the opening words of successive clauses claims the items are members of one series, of one importance, going in one direction.',
      ] },
      { p: 'Three claims, none of them argued, all of them carried by the form.' },
      { p: 'So a figure is not decoration on an argument. It is frequently the argument, delivered in a way that never has to defend itself.' },
      { h: 'Which means a figure can lie' },
      { p: 'A balanced sentence can hold two things that are not comparable, and the balance does the persuading before anybody examines the pair. All Fallacies has a whole family for what that produces, and this is the mechanism underneath it.' },
      { p: 'It is also exactly what module 2 describes: a premise that is never stated is a premise that is never examined. A figure can carry the unstated step in its shape, which is more efficient than saying it and completely invisible.' },
      { h: 'Naming is not the skill' },
      { p: 'Being able to say that a sentence is an antimetabole is worth having for reading and worth nothing for speaking. Almost nobody builds a sentence by selecting a figure from a list of seventeen.' },
      { p: 'What the shelf is for is noticing. Once you can see the shapes, you see them working on you, which is the defensive use module 1 takes to be the strongest reason to study any of this, and a few of them settle into your hand without being chosen.' },
      { cta: { page: 'figures', label: 'Open The Shapes of Argument' } },
      { qa: [
        { q: 'When is a departure from the plainest wording not a figure at all?',
          a: 'When the plainest way would have done the same job. Then it is not a figure, only a longer sentence.' },
        { q: 'How can a figure lie without any word in it being false?',
          a: 'The pattern asserts something no word states. A balanced sentence can hold two things that are not comparable, and the balance does the persuading before anybody examines the pair.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'What to take from the shelf',
        lead: 'Naming a figure is worth having for reading and worth nothing for speaking.',
        items: [
          'Ask what the SHAPE is claiming, separately from what the words say.',
          'Balance asserts comparability. Opposition asserts that two things really are opposed.',
          'A figure can carry the unstated premise in its form, where nobody examines it.',
          'Learn to notice them. Almost nobody builds a sentence by picking from a list of seventeen.',
        ] } },
    ] },

  { id: 'rh-metaphor', module: 'shape', order: 4,
    title: 'Metaphor Is an Argument',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'See that a metaphor makes a claim about what kind of thing something is, and test that claim before using it.',
    orientation: 'Among the most powerful moves in style, and the one that persuades without ever stating what it says.',
    reflection: 'Find the metaphor inside an argument you believe. Say plainly what the comparison asserts. Does it survive being said plainly?',
    body: [
      { p: 'A metaphor says one thing is another. Everybody present knows it is not literally so, and makes the transfer anyway, and what transfers is not a picture. It is a set of conclusions, and they arrive already agreed.' },
      { h: 'What actually crosses over' },
      { p: 'Call a negotiation a battle. Nothing further needs arguing: there are two sides, one of them wins, ground given is ground lost, and compromise becomes a kind of defeat. Nobody said any of that, and the room is now working on the assumption that it is true.' },
      { p: 'Call the same negotiation a piece of building work. The conclusions invert. Both parties are working on one object, what one adds the other does not lose, and the question stops being how much to concede and becomes what to make.' },
      { table: {
        head: ['', 'Called a battle', 'Called building work'],
        rows: [
          ['The parties', 'Two sides', 'Two people on one object'],
          ['A concession', 'Ground lost', 'Material added'],
          ['The question', 'How much to give up', 'What to make'],
        ] } },
      { p: 'Neither is a fact about the negotiation. Both decide how the negotiation will be conducted, and they decide it before the first substantive sentence.' },
      { h: 'It answers a question module 3 asks' },
      { p: 'Module 3 says an argument comes to rest at the first question the two sides diverge on, and that the second of those questions is what a thing IS. A metaphor answers that question. It settles the definition, silently, and whoever set the metaphor has chosen the ground the argument will be fought on.' },
      { p: 'This is why metaphor belongs with invention rather than with ornament, and why it is in this module under protest: it is filed as style because it is made of words, and it behaves like a premise.' },
      { h: 'The dead ones are the strongest' },
      { p: 'A strong economy, a broken system, the head of an organisation, a war on something. Nobody hears these as figures, which is precisely what makes them effective.' },
      { key: 'A dead metaphor is a claim that has stopped being examined because it has stopped being visible.' },
      { p: 'They are not faults. Language runs on them and speech would be unusable without them. But the ones near the centre of your own argument are worth waking up, because an assumption you inherited in a phrase is still an assumption you are asserting.' },
      { h: 'Test your own' },
      { p: 'Say plainly what the comparison asserts, in a sentence with no figure in it, and ask whether you would defend that sentence out loud. If the metaphor is claiming more than you would say, it is doing work you have not earned, and the audience is being asked to accept it on the strength of the phrasing.' },
      { key: 'A metaphor that makes a true relation graspable is teaching, and it is frequently the only way a difficult thing becomes holdable at all. A metaphor that imports conclusions the speaker could not defend if they were stated is smuggling, in one of the most efficient forms the language offers.' },
      { p: 'It is the same line module 2 draws about the step left unsaid.' },
      { h: 'Following one too far' },
      { p: 'A metaphor extended past its use starts generating conclusions nobody meant. If the battle acquires a budget and a stakeholder, the figure has collapsed, and the audience has stopped following the argument and started watching the machinery. The repair is to stop earlier, not to build the comparison out further.' },
      { qa: [
        { q: 'Module 3 says an argument rests at the first question the two sides diverge on. Which of those questions does a metaphor answer?',
          a: 'What a thing IS. It settles the definition silently, and whoever set the metaphor has chosen the ground the argument will be fought on.' },
        { q: 'Why does this lesson say metaphor sits in the style module under protest?',
          a: 'It is filed as style because it is made of words, and it behaves like a premise. By what it does, it belongs with invention.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Testing a metaphor',
        lead: 'Before you use one near the centre of a case.',
        items: [
          'Say plainly what the comparison asserts, in a sentence with no figure in it.',
          'Ask whether you would defend that sentence out loud. If not, it is doing work you have not earned.',
          'Wake the dead ones. An assumption you inherited in a phrase is still an assumption you are asserting.',
          'Stop before the figure starts generating conclusions nobody meant.',
        ] } },
    ] },

  { id: 'rh-sentence', module: 'shape', order: 5,
    title: 'The Shape of a Sentence',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Build a sentence whose shape carries its meaning, and put the weight where you want it to fall.',
    orientation: 'Where the important word sits, and how long the listener is made to wait for it.',
    reflection: 'Take your most important sentence and move its key word to the end. Read both aloud. Which one lands?',
    body: [
      { p: 'Module 3 was the order of the arguments. This is the order inside one sentence, which is the same principle one scale down, and it is the scale at which a great many speakers have never made a decision at all.' },
      { h: 'Two shapes' },
      { defs: [
        { label: 'Suspended', text: 'Withholds its completion. The listener cannot know what is being said until the final clause arrives, and everything before it is provisional until then.' },
        { label: 'Running', text: 'States its point and then adds to it. The listener has the claim early and the rest accumulates.' },
      ] },
      { p: 'Suspension buys attention and spends goodwill. It is a small demand made of the listener, and it pays only if the ending justifies the wait. A running sentence is easier to follow, harder to make memorable, and the right default for anything complicated.' },
      { h: 'The end of a sentence is the strongest position' },
      { key: 'Whatever sits last is what the listener carries.' },
      { p: 'The opening is second strongest, and the middle is where things go to be unnoticed, which is worth knowing in both directions: it is where a qualification goes when you want it heard less, and noticing that in somebody else’s sentence is the defensive skill.' },
      { p: 'A great many weak sentences are weak because the important word is in the middle and something procedural is at the end.' },
      { key: 'The repair is not more words. It is moving one.' },
      { h: 'Length is a rhythm, and sameness is silence' },
      { p: 'A run of sentences of the same length stops being heard as sentences at all. It becomes a texture, and the listener’s attention drifts off it without any single sentence being at fault.' },
      { p: 'So a short sentence after three long ones is emphasis that costs nothing and needs no figure. It is among the cheapest techniques in the module and among the most reliable.' },
      { h: 'Why three' },
      { defs: [
        { label: 'Two', text: 'Reads as a comparison. The listener weighs them against each other.' },
        { label: 'Three', text: 'Reads as complete, which is why the series of three recurs so heavily in English public speech. It is on the shelf as tricolon.' },
        { label: 'Four or more', text: 'Reads as a list. The listener stops attending to the members.' },
      ] },
      { p: 'The likeliest reason it works is arithmetic about attention rather than magic about the number.' },
      { h: 'This is the page, not the room' },
      { p: 'Breath, pause and pace are module 5, and they are half of whether a sentence arrives. They can support a shape or fight it, and they cannot rescue a sentence whose weight is in the wrong place. Composition first, because delivery has nothing to work with otherwise.' },
      { qa: [
        { q: 'What does a suspended sentence buy, and what does it spend?',
          a: 'It buys attention and spends goodwill. It is a demand made of the listener, and it pays only if the ending justifies the wait.' },
        { q: 'Why does a run of sentences of the same length lose a listener?',
          a: 'It stops being heard as sentences and becomes a texture. Attention drifts off it without any single sentence being at fault.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Where the weight falls',
        lead: 'Four moves, and none of them needs a figure.',
        items: [
          'Put the important word last. Whatever sits there is what they carry.',
          'Default to running sentences for anything complicated; suspend only when the ending earns the wait.',
          'Vary the lengths. A short sentence after three long ones is free emphasis.',
          'Three items reads as complete. Two reads as a comparison, four as a list.',
        ] } },
    ] },

  // ── Module 5 · Delivery ────────────────────────────────────────
  // Written 2026-09-29. The fifth canon.
  //
  // WHY THIS IS NOT A VOICE MODULE. Acting's Tempo-Rhythm module already
  // teaches the craft of it, and teaches it well: tempo against rhythm as
  // two dials (ac-dials), pauses as rests written into the music
  // (ac-rests), and the two missing speeds (ac-speeds). Writing pace and
  // pause again here would be the Shakespeare-rhetoric mistake all over
  // again, one subject taught twice under two owners. This module is what
  // delivery does to an ARGUMENT and to a LISTENER, and it points at the
  // craft rather than restating it.
  //
  // WHAT IT DELIBERATELY DOES NOT RE-TEACH. Changing the route through an
  // argument mid-room is module 2 (rh-adjust); rh-body and rh-nerve treat
  // eye and attention as what MAKES that possible and say so. Weight at
  // the end of a sentence is module 4 (rh-sentence), and rh-stress is the
  // same question in the mouth, where stress can overrule position. The
  // level a room can hold is module 4 (rh-levels). Memory is module 1 and
  // the Lines and Memory page. Named errors stay on the fallacy shelves.
  //
  // STALE SINCE 2026-10-12, and corrected rather than deleted so the
  // reason survives. This used to say every cross-reference had been
  // checked against the app: Tempo-Rhythm, Two Rhythms at Once, Listening
  // and Responding, Lines and Memory and the Warmup. Most of those
  // pointers lived in the nineteen "For an actor" sections, and the owner
  // removed all nineteen that day — rhetoric is a separate course and does
  // not justify itself by what an actor gets from it.
  //
  // Two pointers to Lines and Memory survive, inside the teaching about
  // memory as a canon rather than in a justification section. They are
  // kept deliberately. The rule they were written under still holds: a
  // pointer to a shelf that is not there is worse than no pointer, so
  // check the name against the app before adding another.

  { id: 'rh-arrives', module: 'delivery', order: 1,
    title: 'The Half That Is Not on the Page',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'See how much of an argument is decided after the words are fixed, and what delivery cannot repair.',
    orientation: 'The tradition put delivery last of the five canons, and several of its teachers thought it mattered most.',
    reflection: 'Think of two people making the same case, one convincing and one not. What was different? Name it precisely.',
    body: [
      { p: 'The fifth canon is delivery: the voice and the body doing the speaking. It is the stage that does not survive on paper, which is why it is the least written about and among the most decisive.' },
      { h: 'The oldest claim about it' },
      { p: 'The tradition records an orator asked what mattered most in oratory, who answered delivery. Asked what came second, he answered delivery. Asked what came third, delivery.' },
      { p: 'It is an overstatement and the overstatement is the point. Everything found, ordered and worded in the four canons before it arrives through this one, and an argument nobody attended to was not made.' },
      { h: 'What is actually being decided' },
      { list: [
        'Whether they are listening at all.',
        'Which of your sentences they carry out of the room.',
        'Whether you appear to believe what you are saying, which is module 1’s ethos arriving before a single one of your reasons does.',
      ] },
      { p: 'None of that is in the words, and much of it is settled early, before you have said anything you would want judged.' },
      { h: 'What it cannot do' },
      { p: 'It cannot repair a structure. Module 1 says most inexperienced speakers begin at style and then blame nerves for what was a structural problem, and delivery is where that bill arrives. A case in the wrong order, or resting on a premise the listener does not hold, is delivered confidently and fails confidently.' },
      { p: 'Which gives a diagnostic worth having.' },
      { key: 'If a speech went badly and you can name the sentence where you lost them, that is a delivery problem. If you cannot, the fault is earlier and no amount of work on the speaking will find it.' },
      { h: 'The hazard, stated once' },
      { p: 'Delivery works identically for a true case and a false one, and it does so with particular reliability, because it operates below the level at which anybody is examining. Before You Begin says the speaker who knows, the speaker who is merely certain and the speaker who is working you are frequently indistinguishable in a room. This is the canon that makes them so.' },
      { h: 'Where the craft of it lives' },
      { p: 'This module is about what delivery does to an argument and to a listener. The physical craft is taught elsewhere in this app and taught properly: Tempo-Rhythm in the Acting course for speed and pause, and the Warmup in Acting Practice for the body and the voice before you use them.' },
      { p: 'Nothing here repeats that. The two are meant to be held together, and a reader who wants the technique should go and get it there.' },
      { qa: [
        { q: 'Why is the old claim that delivery matters first, second and third an overstatement worth keeping?',
          a: 'Because everything found, ordered and worded in the four canons before it arrives through this one, and an argument nobody attended to was not made.' },
        { q: 'What is the one thing delivery cannot do?',
          a: 'Repair a structure. A case in the wrong order, or resting on a premise the listener does not hold, is delivered confidently and fails confidently.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'Where the craft of it lives',
        lead: 'This module is what delivery does to an argument. The physical technique is taught elsewhere in this app, and taught properly.',
        items: [
          'Tempo-Rhythm, in the Acting course — speed, pause, and the two missing speeds.',
          'The Warmup, in Acting Practice — the body and the voice before you use them.',
          'Lines and Memory, in the Acting Library — the fourth canon, which is what lets you watch the room.',
        ] } },
    ] },

  { id: 'rh-stress', module: 'delivery', order: 2,
    title: 'Which Word Carries the Line',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Place emphasis deliberately, because the stressed word decides what the sentence is actually claiming.',
    orientation: 'One sentence, seven words, seven different arguments, and not a word changes.',
    reflection: 'Take your central sentence. Say it aloud stressing a different word each time. How many of those did you not mean?',
    body: [
      { p: 'Module 4 asked where the important word sits in a sentence, which is a question about the page. This is the same question in the mouth, and it is the more powerful of the two, because stress can overrule position: a word buried in the middle takes the weight the moment you put it there.' },
      { h: 'The demonstration' },
      { p: 'Take the sentence “I never said he stole the money.”' },
      { table: {
        head: ['Lean on', 'And the claim becomes'],
        rows: [
          ['I', 'Somebody else said it.'],
          ['never', 'You did not say it — which leaves open what you implied.'],
          ['said', 'You did not say it. You wrote it, or let it be understood.'],
          ['he', 'Somebody else took the money.'],
          ['stole', 'He took it, but not by stealing.'],
          ['the', 'It was money, but not that money.'],
          ['money', 'He took something, and the something was not money.'],
        ] } },
      { key: 'Seven placements, seven different claims, several of them admissions, and the sentence is identical every time.' },
      { p: 'Nothing about this is subtle, and it is rarely done on purpose.' },
      { h: 'What emphasis actually is' },
      { p: 'A claim about contrast. Stressing a word says: this one, rather than the alternative. That is why it changes the argument and not merely the volume.' },
      { p: 'It also explains the common fault, which is too much rather than too little. A speaker who wants to be taken seriously stresses heavily and continuously, and asserts nothing at all: if every word is set against an alternative, no contrast has been drawn.' },
      { key: 'Emphasis is paid for by the unstressed words around it.' },
      { h: 'The dishonest version' },
      { p: 'Because stress asserts a contrast, it can assert one that was never argued. Emphasis can imply that somebody would disagree, that a finding is surprising, or that a source is doubtful, and none of it has been said, so none of it can be answered.' },
      { key: 'This is module 2’s smuggling performed with the voice, and it is the hardest form to call out, because the transcript exonerates you.' },
      { p: 'The words on the page are exactly what you would have been willing to defend.' },
      { qa: [
        { q: 'What is emphasis actually asserting, beyond loudness?',
          a: 'A contrast. Stressing a word says: this one, rather than the alternative — which is why it changes the argument and not merely the volume.' },
        { q: 'Why is heavy, continuous stress self-defeating?',
          a: 'If every word is set against an alternative, no contrast has been drawn. Emphasis is paid for by the unstressed words around it.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Placing the stress',
        lead: 'Module 4 asked where the important word sits. This is the same question in the mouth, and it can overrule position.',
        items: [
          'Say your central sentence seven ways and hear how many claims you did not mean.',
          'Choose one word. One contrast per sentence is what a listener can hold.',
          'Let the rest go unstressed. That is what pays for the one you chose.',
          'Watch for a stress that implies disagreement, surprise or doubt nobody argued for. That one is a smuggled premise.',
        ] } },
    ] },

  { id: 'rh-silence', module: 'delivery', order: 3,
    title: 'Silence',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Use silence as part of the argument rather than as the gap you are trying to get out of.',
    orientation: 'An under-used instrument, and one of the few that costs nothing.',
    reflection: 'When a silence last felt unbearable to you, how long was it really? Count it next time.',
    body: [
      { p: 'Acting owns the craft of the pause and has the better metaphor for it: a rest is written into the music, and it is not the music stopping. That is Tempo-Rhythm, and it is the right way to think about timing a line.' },
      { p: 'This lesson is the other half. Not what a pause does to a line, but what silence does to somebody’s reasoning.' },
      { h: 'Before, and after' },
      { defs: [
        { label: 'Before', text: 'Buys attention for what follows. The room registers the break and turns toward it, which is why the pause is the cheapest emphasis available and needs no figure.' },
        { label: 'After', text: 'Is where the sentence is understood. A speaker who moves straight on has answered their own point before anybody had the chance to be persuaded by it.' },
      ] },
      { p: 'Many speakers manage the first occasionally and the second rarely, because the second feels like failure from the inside.' },
      { h: 'The half second that belongs to them' },
      { p: 'Module 2 says the strongest arguments leave a step for the listener to take, and that a conclusion somebody reaches themselves is held harder than one handed over. Silence is when they take it.' },
      { key: 'The unstated step is a structural device on the page and a timing device in the room, and they are the same device.' },
      { p: 'A speaker who fills that gap has taken the conclusion back and returned it ready-made, which is the weaker form of the identical argument.' },
      { h: 'Why it feels longer than it is' },
      { p: 'Two seconds is a long pause and can feel like ten from inside. The distortion is ordinary rather than a personal failing, and the cure is to have measured one once. Very little that sounds unbearably slow to a speaker is noticed as slow by a room.' },
      { h: 'The silence after a question' },
      { p: 'A question asked and then left alone does work that no follow-up does. A speaker who asks and then rescues everybody from the discomfort has asked nothing, and has taught the room that their questions are rhetorical.' },
      { p: 'It is also where silence stops being neutral. An answer extracted by waiting is not quite the same as one offered, and a long enough silence is pressure whatever the words were. Worth keeping in view, because it is the one instrument in this module that works on somebody without their noticing it is being used.' },
      { h: 'What it is not' },
      { p: 'It is not the silence of somebody searching for the next word. A room usually tells the difference: one silence is aimed at them and the other is simply happening in front of them, and only the first one is doing anything.' },
      { qa: [
        { q: 'Why does a pause feel so much longer to the speaker than to the room?',
          a: 'The distortion is ordinary rather than a personal failing — two seconds can feel like ten from inside. Very little that sounds unbearably slow to a speaker is noticed as slow by a room.' },
        { q: 'Where does silence stop being neutral?',
          a: 'After a question. An answer extracted by waiting is not quite the same as one offered, and a long enough silence is pressure whatever the words were.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Using the gap',
        lead: 'The one instrument in this module that costs nothing.',
        items: [
          'Pause before the sentence you want heard. It is emphasis without a figure.',
          'Pause after it, and leave it alone. That is where they do the understanding.',
          'Ask a question and let it sit, or you have taught the room your questions are rhetorical.',
          'Measure a two-second pause once, so you stop believing the one in your head.',
        ] } },
    ] },

  { id: 'rh-body', module: 'delivery', order: 4,
    title: 'The Body Argues First',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Know what the body has already claimed before the first sentence, and what it cannot honestly claim at all.',
    orientation: 'A listener has concluded something about a speaker before the speaker has said anything worth judging.',
    reflection: 'Watch somebody speak for one minute with the sound off. What did you conclude, and on what evidence?',
    body: [
      { p: 'The audience starts reading a speaker on arrival: how they stand, how they get to the place they are speaking from, what they do with their hands while somebody else is still talking. Whatever that produces is in place before the first argument, and every argument afterwards is heard through it. Module 1 calls this ethos and puts it first for exactly this reason.' },
      { h: 'Stillness' },
      { p: 'Stillness reads as authority and is rarer than it sounds. Most untrained movement is discharge rather than expression.' },
      { list: [
        'Weight shifting from foot to foot.',
        'Hands finding pockets.',
        'A step backwards after a strong sentence, which undoes the sentence.',
      ] },
      { p: 'None of it is meant. All of it is read.' },
      { p: 'The remedy is not to freeze, which reads as fear being held still. It is to give the body somewhere to be, so that what does move is movement rather than leakage.' },
      { h: 'Gesture that means something' },
      { p: 'A gesture that shapes what is being said helps a listener hold it: two things weighed against each other, a sequence laid out in the air, a size shown. It is doing the work module 4 gives to a figure, in a different medium.' },
      { p: 'A gesture that runs continuously underneath everything stops carrying information and becomes weather. The audience stops seeing it quickly, which means the one time you needed a gesture to land, it did not.' },
      { h: 'The eye' },
      { p: 'Eye contact is what makes a speech addressed rather than merely delivered. It is also the thing that makes module 2 possible at all: a speaker looking at the room is receiving information continuously and can change the route, and a speaker looking at a page is reciting and will find out afterwards.' },
      { h: 'An honest limit' },
      { p: 'There is a large popular literature claiming that particular gestures reveal particular inner states, and much of it is not supported by anything. Nothing in this lesson says a body reveals the truth about a speaker.' },
      { key: 'A body makes claims, listeners read those claims whether or not they are accurate, and a speaker who ignores this is not being authentic, only unaware.' },
      { p: 'Before You Begin puts the harder version of it plainly, and it applies here more than anywhere else in the course: from the outside, at speed, the confident and the correct look the same.' },
      { qa: [
        { q: 'Why is freezing not the remedy for untrained movement?',
          a: 'It reads as fear being held still. The remedy is to give the body somewhere to be, so that what does move is movement rather than leakage.' },
        { q: 'What makes eye contact a condition of module 2 rather than a piece of stage manner?',
          a: 'A speaker looking at the room is receiving information continuously and can change the route. A speaker looking at a page is reciting, and will find out afterwards.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'What the body has already said',
        lead: 'The reading starts on arrival, before the first argument.',
        items: [
          'Give the body somewhere to be, so movement is movement and not discharge.',
          'Gesture to shape the thought — two things weighed, a sequence laid out, a size shown.',
          'Stop gesturing the rest of the time, or the one you needed will not land.',
          'Look at the room. It is what makes adjusting possible at all.',
        ] } },
    ] },

  { id: 'rh-room', module: 'delivery', order: 5,
    title: 'The Room',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Read the physical conditions as part of the argument, and change them when you are able to.',
    orientation: 'The room has already made several decisions about how your speech is going to go.',
    reflection: 'Think of a meeting that went badly. Describe the room it happened in. How much of it was the room?',
    body: [
      { p: 'A speech does not happen in the abstract. It happens somewhere, and where decides a surprising amount of what is possible inside it. This is among the least discussed items in the subject and among the most decisive.' },
      { h: 'What the arrangement decides' },
      { p: 'Whether people can see each other changes what they are willing to say. A room where everybody faces the speaker produces an audience. A room where they face each other produces a discussion. Choosing between those is a rhetorical decision, and almost nobody notices making it.' },
      { p: 'Size sets the level of style, which is module 4: a large room will not hold a quiet, intimate sentence, and a small one refuses a grand one and makes the speaker look as though they have misjudged the occasion, which they have.' },
      { h: 'Changing it is legitimate, and frequently decisive' },
      { list: [
        'Moving a conversation somewhere else.',
        'Standing when everybody else is sitting, or sitting when everybody expects you to stand.',
        'Asking for a screen to be turned off.',
        'Waiting until somebody has left the room.',
      ] },
      { p: 'None of these is a trick played around the argument.' },
      { key: 'The conditions are part of the occasion, and arranging them is as much a part of preparation as deciding the order of your reasons.' },
      { h: 'What has just happened in it' },
      { p: 'A room carries whatever preceded you. Following an item that was long and badly run, or bad news, or somebody who was funny, changes what your first half minute has to do before it can do anything else.' },
      { p: 'Often this is knowable in advance, and a speaker who has asked what comes before them has bought information nobody else in the room has bothered to get. Module 2 treats the moment as part of the argument, and this is the most practical form of that.' },
      { h: 'Unglamorous and worth knowing' },
      { p: 'A microphone flattens a voice: the quiet end of your range disappears, so emphasis has to come from stress and silence rather than volume. Sitting costs breath, and what breath pays for is the ends of sentences, which is where module 4 put the important word.' },
      { p: 'Neither is a reason to avoid a microphone or a chair. Both are reasons to know which one you are in before you find out.' },
      { h: 'The one to check first' },
      { p: 'Whether they can hear you. It is the least interesting item here and among the most decisive, and a speaker who has not checked it has made every other preparation conditional on luck.' },
      { qa: [
        { q: 'What does the seating arrangement decide before anybody speaks?',
          a: 'What people are willing to say. A room where everybody faces the speaker produces an audience; a room where they face each other produces a discussion.' },
        { q: 'What does a microphone take away, and what has to replace it?',
          a: 'It flattens the voice and the quiet end of your range disappears, so emphasis has to come from stress and silence rather than volume.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Before you speak in it',
        lead: 'The room has already made several decisions. Find out which.',
        items: [
          'Can they hear you? Check it first, however dull it is.',
          'Who faces whom — are you making an audience or a discussion?',
          'How big is it? Size sets the level of style you can get away with.',
          'What happens immediately before you, and what will your first half minute have to clear?',
        ] } },
    ] },

  { id: 'rh-nerve', module: 'delivery', order: 6,
    title: 'Nerves',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Treat nerves as a set of specific, predictable effects with structural answers, rather than as a state to be talked out of.',
    orientation: 'Being told to relax rarely helps anybody. Knowing exactly what nerves do is more useful than being reassured.',
    reflection: 'What does your own nerve actually do? Name the physical effect, not the feeling.',
    body: [
      { p: 'Nerve is not a defect of character, and for most people it does not simply go away with experience. What experience changes is its shape: it arrives earlier, lasts a shorter time and becomes more manageable. Expecting it to disappear is most of what makes it worse.' },
      { h: 'What it does, specifically' },
      { list: [
        'It speeds everything up, and the speaker cannot hear that it has.',
        'It shortens the breath, which drops the ends of sentences — precisely where module 4 put the word that mattered.',
        'It sends the eyes up and away, which costs the information module 2 depends on.',
        'It makes silences feel twice their true length, so they get filled.',
        'It turns attention inward at the exact moment the job is to be watching somebody else.',
      ] },
      { key: 'Every item on that list is specific, and every one has a structural answer rather than an emotional one.' },
      { h: 'The answers are structural' },
      { p: 'Know your first sentence exactly, because the speed of the whole thing is set in it. Know the shape rather than the wording: a memorised wording has one failure mode and it is total, while a known shape can be rebuilt live.' },
      { p: 'Have more arguments than you need. Module 3 recommends that for a different reason and it pays again here, because a speaker holding five is calm when one fails, and a speaker holding one is not.' },
      { p: 'And give the body somewhere to be before you begin, which is what the Warmup in Acting Practice is for.' },
      { h: 'The part that is not a problem' },
      { p: 'Some nerve is the price of caring how it goes, and a room reads it accurately as that. An audience tends to forgive visible nerve more readily than evident indifference, and the speaker who is entirely comfortable is frequently the one nobody believes has anything at stake.' },
      { h: 'The thing that helps most' },
      { p: 'Attention outward. Nerve is attention pointed at yourself, and the most reliable way to reduce it is to take on a job that requires watching somebody else: what they have understood, what they are resisting, whether the last point landed.' },
      { p: 'Module 2 calls that adjusting and the Acting course calls it Listening and Responding. It is the same instruction either way, and the fact that it also happens to be the cure for nerves is the most practical thing in this module.' },
      { qa: [
        { q: 'What does experience actually change about nerve, if it does not remove it?',
          a: 'Its shape. It arrives earlier, lasts a shorter time and becomes more manageable. Expecting it to disappear is most of what makes it worse.' },
        { q: 'Why is a memorised wording more fragile than a known shape?',
          a: 'A memorised wording has one failure mode and it is total. A known shape can be rebuilt live.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'The structural answers',
        lead: 'Nerve is a list of specific effects, so it gets a list of specific answers.',
        items: [
          'Know your first sentence exactly. The speed of the whole thing is set in it.',
          'Know the shape, not the wording. One has a total failure mode; the other can be rebuilt live.',
          'Carry more arguments than you need. Five is calm when one fails; one is not.',
          'Give the body somewhere to be first — the Warmup, in Acting Practice.',
          'Point attention outward: what have they understood, what are they resisting, did the last point land?',
        ] } },
    ] },

  // ── Module 6 · Honest Persuasion ───────────────────────────────
  // Written 2026-09-29. The module the whole course has been deferring
  // to, and the one it owes: rh-what promises it ("module 6 is about
  // nothing else"), rh-bad asks the reader to write their own line
  // BEFORE this module argues with it, and rh-supply, rh-metaphor and
  // rh-notice each hand it a specific debt. Those debts are paid here by
  // name rather than in general.
  //
  // IT DOES NOT ARRIVE AS A CODE OF CONDUCT. Every tool in this course
  // appears on both sides of the line, which is the fact the threshold
  // opens with, so a list of forbidden moves would be both useless and
  // dishonest. The line is about what the LISTENER is left able to do,
  // which is what RHETORIC_PRINCIPLE says and what rh-line unpacks.
  //
  // IT IS ADDRESSED INWARD ON PURPOSE. An ethics of persuasion that
  // mainly produced ways to accuse other people would be doing the exact
  // thing module 1 warns this subject does. rh-defence is the one lesson
  // pointed outward, and it says plainly that the defence has a cost.
  //
  // WHAT IT DELIBERATELY DOES NOT RE-TEACH. Named errors stay on the two
  // fallacy shelves and are pointed at, never redefined. Pathos is module
  // 1. The unstated premise is module 1 and module 2. Stating the other
  // side fairly is module 2 (rh-resist). The threshold is not a lesson
  // and is quoted as the condition it is.

  { id: 'rh-line', module: 'ethics', order: 1,
    title: 'Where the Line Is',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'State the difference between persuading somebody and working on them in a form you can actually apply in a room.',
    orientation: 'Not technique, not sincerity, not outcome. What the person is left able to do.',
    reflection: 'Module 1 asked you to write your own line before this module argued with it. Get that sentence out and compare.',
    body: [
      { p: 'Module 1 put the charge at full strength and promised this module would answer it: if skill at persuasion can be taught separately from having good reasons, then teaching it hands an advantage to whoever is most willing to use it. Four modules of tools later, nothing has weakened that. This one has to say where the line falls.' },
      { h: 'What the line is not' },
      { p: 'It is not technique. Every tool in this course appears on both sides: the figure, the metaphor, the silence, the order of a case, the stress on a word. There is no move that is manipulative in itself, which is why a list of forbidden moves cannot be the answer and why both fallacy shelves are diagnostic rather than a code of conduct.' },
      { p: 'It is not sincerity. Believing your case is entirely compatible with doing something indefensible to get it accepted, and the next lesson is about nothing else.' },
      { p: 'It is not outcome. A true claim can be planted dishonestly and a false one argued in good faith. Judging yourself by whether you turned out to be right is judging yourself by luck.' },
      { h: 'The line' },
      { key: 'Ethical persuasion makes your reasons available while leaving the person able to examine them, question them and refuse them.' },
      { p: 'Every word there is carrying weight.' },
      { defs: [
        { label: 'Available', text: 'The reasons have to be visible, which rules out the case that only works while part of it stays out of sight.' },
        { label: 'Examine', text: 'They need the time and the information to check.' },
        { label: 'Question', text: 'They have to be able to raise an objection without paying for raising it.' },
        { label: 'Refuse', text: 'A persuasion that does not survive a refusal was not persuasion.' },
      ] },
      { h: 'Refusal is the sharpest of the four' },
      { p: 'Ask what happens if they say no. If the answer is that you accept it, you were arguing. If the answer is that you escalate, wear them down, raise the cost of refusing or go around them, then the argument was a formality and the pressure was the actual mechanism.' },
      { p: 'It is easy to feel from the receiving end and hard to see in yourself, which is the whole difficulty.' },
      { h: 'Three tests you can apply to yourself' },
      { steps: [
        { title: 'The reversal', text: 'Would you accept this being done to you by somebody arguing the opposite? Before You Begin sets this as the single condition on holding the craft at all, and it is the most reliable of the three.' },
        { title: 'The daylight test', text: 'Would your case survive the listener knowing exactly what you are doing and why? An honest technique survives being named out loud.' },
        { title: 'The interest test', text: 'Would it survive their knowing what you get out of it?' },
      ] },
      { p: 'Saying that you are putting the strongest objection first so that nobody thinks you are hiding it costs you nothing, because it was true.' },
      { h: 'Where it actually sits' },
      { p: 'The line does not fall between persuasion and plain information, which is a fiction: module 3 says a statement of facts is already an argument, and the most powerful part of many speeches is the part nobody thought to defend against.' },
      { key: 'It falls between persuasion that can be checked and persuasion built so that it cannot be.' },
      { qa: [
        { q: 'Why can the line not be a list of forbidden moves?',
          a: 'Every tool in this course appears on both sides of it — the figure, the metaphor, the silence, the order of a case, the stress on a word. There is no move that is manipulative in itself.' },
        { q: 'Why is being right about the outcome no defence?',
          a: 'A true claim can be planted dishonestly and a false one argued in good faith. Judging yourself by whether you turned out to be right is judging yourself by luck.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Ask what happens if they say no',
        lead: 'Refusal is the sharpest of the four words, and the fastest to apply.',
        items: [
          'If you accept the no, you were arguing.',
          'If you escalate, wear them down, raise the cost of refusing or go around them, the argument was a formality and the pressure was the mechanism.',
          'It is easy to feel from the receiving end and hard to see in yourself. That is the whole difficulty.',
        ] } },
    ] },

  { id: 'rh-sincere', module: 'ethics', order: 2,
    title: 'Sincerity Is Not the Test',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Stop treating your own conviction as evidence that you are arguing honestly.',
    orientation: 'The second of the three speakers is not lying. That is exactly what makes them the hard case.',
    reflection: 'Name something you are certain of and cannot fully evidence. What are you doing with that certainty when you argue?',
    body: [
      { p: 'Before You Begin describes three speakers, and the middle one is the difficulty: they speak past the edge of what they know and they are not lying. They have mistaken the feeling of being sure for the fact of being right, which everybody does at some point, including you.' },
      { h: 'Why sincerity feels like it ought to count' },
      { p: 'Because deception seems to require an intention to deceive, so where the intention is absent the charge looks absurd. But the listener is not injured by your intention. They are injured by walking out more confident than the evidence supports, and a sincere speaker does that as efficiently as a cynical one, with more conviction behind it.' },
      { h: 'The specific failure' },
      { key: 'It is not saying false things. It is conveying more certainty than you hold.' },
      { p: 'The honest version of most claims has a qualification somewhere in it, and the qualification is the first thing to go, because it weakens the line and very few people in the room will notice it missing.' },
      { p: 'The tradition has a name for dropping a qualification and it is on The 13 Fallacies, filed as an error rather than a sin. That is the right place for it: this mostly happens to people who are trying.' },
      { h: 'What honest confidence sounds like' },
      { p: 'Confidence proportioned to what you actually have. That means saying which parts you are sure of and which you are not, and it is not hedging. Hedging is uniform vagueness spread over a whole case; this is precision about where the strength is and where it is not.' },
      { p: 'It also costs far less than people fear. A speaker who marks the weak joint in their own case is generally believed more readily on the strong ones, which is module 1’s ethos and module 3’s instruction to answer the real objection before somebody else raises it.' },
      { h: 'The test' },
      { p: 'Ask what would change your mind, and whether anything could. Module 3 puts that question to your evidence. Here it goes to you.' },
      { key: 'A position that nothing could change is not a conclusion you reached. It is one you are defending.' },
      { p: 'You are entitled to hold it as a commitment. You are not entitled to present it as an argument.' },
      { qa: [
        { q: 'Why is a sincere speaker not let off by the absence of an intention to deceive?',
          a: 'The listener is not injured by your intention. They are injured by walking out more confident than the evidence supports, and a sincere speaker does that as efficiently as a cynical one, with more conviction behind it.' },
        { q: 'What is the difference between hedging and honest confidence?',
          a: 'Hedging is uniform vagueness spread over a whole case. Honest confidence is precision about where the strength is and where it is not.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'Confidence proportioned to what you have',
        lead: 'It costs far less than people fear, and it buys the strong parts of your case.',
        items: [
          'Say which parts you are sure of and which you are not.',
          'Put the qualification back. It is always the first thing to go.',
          'Mark the weak joint yourself — you will be believed more readily on the strong ones.',
          'Ask what would change your mind, and whether anything could.',
        ] } },
    ] },

  { id: 'rh-pressure', module: 'ethics', order: 3,
    title: 'The Moves That Remove Examination',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Recognise the specific mechanisms that take away a listener’s ability to examine, in other people and in yourself.',
    orientation: 'Manipulation is not a tone of voice. It is a short list of things done to the conditions for thinking.',
    reflection: 'When did somebody last make it expensive for you to say no? What exactly did they do?',
    body: [
      { p: 'The line is about what the listener can still do. So the dishonest moves are not the ones that argue hard. They are the ones that go after the conditions under which arguing is possible at all, and there are not many of them.' },
      { h: 'Urgency that is manufactured' },
      { p: 'Among the most effective, and the most common. Examination takes time, so removing time removes examination without touching the argument. A real deadline is a fact about the world and a manufactured one is a claim, and the question that separates them can be asked out loud: what actually happens if this waits a week.' },
      { h: 'Volume' },
      { p: 'More claims than anybody could answer, delivered fast, so that failing to rebut each one reads as agreement. All Fallacies has a name for it. It is not an argument at all, it is an attack on the listener’s capacity to keep up, and the counter is to refuse the pace and take one claim.' },
      { h: 'Raising the cost of the question' },
      { p: 'Making the objection socially expensive rather than answering it: meeting a question with visible surprise that it was asked, or with an implication about the person asking. Nothing false has been said, and that question will not be raised again, by them or by anybody who watched.' },
      { h: 'Isolation' },
      { p: 'Separating somebody from the people who would give them another view, or from the information that would check yours. This is the most serious item here and the least like ordinary argument, and it is worth naming because it almost never announces itself. It arrives looking like confidentiality, or efficiency, or not troubling anybody else with it yet.' },
      { h: 'Aiming at a known weakness' },
      { p: 'Going at the one thing about this particular person that gets past their judgement: their fear about their job, their guilt about their family, their need to be the reasonable one in the room.' },
      { p: 'This is where pathos stops being module 1’s honest work of making a consequence real, and the difference is testable.' },
      { key: 'Ask whether the feeling you are raising is ABOUT the thing you want them to decide. If it is, you are helping them see what is at stake. If it is not, you are using a lever that happens to be attached to them.' },
      { h: 'The uncomfortable part' },
      { p: 'Every one of these has a legitimate twin, which is why they cannot be banned and why a list of forbidden moves would have been useless anyway.' },
      { table: {
        head: ['The move', 'Its legitimate twin'],
        rows: [
          ['Manufactured urgency', 'A real deadline, which is a fact about the world'],
          ['Volume — more claims than anybody could answer', 'A case that honestly does require a great deal of evidence'],
          ['Raising the cost of the question', 'A question really asked in bad faith'],
          ['Isolation', 'A matter that really is confidential'],
          ['Aiming at a known weakness', 'A feeling that really is relevant to the decision'],
        ] } },
      { p: 'What separates each from its twin is the test from the last lesson, applied to the EFFECT rather than to the move.' },
      { key: 'When you are finished, can this person still examine, question and refuse.' },
      { qa: [
        { q: 'Why is manufactured urgency so effective without touching the argument at all?',
          a: 'Examination takes time, so removing time removes examination. The question that separates a real deadline from a manufactured one can be asked out loud: what actually happens if this waits a week.' },
        { q: 'Which of the five does the lesson call the most serious, and why is it hard to spot?',
          a: 'Isolation. It almost never announces itself — it arrives looking like confidentiality, or efficiency, or not troubling anybody else with it yet.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Manipulation is not a tone of voice',
        lead: 'It is a short list of things done to the conditions for thinking. Learn the list.',
        items: [
          'Urgency that is manufactured — ask what happens if this waits a week.',
          'Volume — refuse the pace and take one claim.',
          'Raising the cost of the question — notice who stopped asking, and why.',
          'Isolation — notice when you are being kept from another view.',
          'A feeling that is not about the decision — that is a lever, not a reason.',
        ] } },
    ] },

  { id: 'rh-advocate', module: 'ethics', order: 4,
    title: 'Making a Case You Do Not Hold',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Separate arguing for a position from asserting it, and know what has to stay visible for that to remain honest.',
    orientation: 'Lawyers do it, actors do it, and so does anybody asked to present the other side in a meeting.',
    reflection: 'When did you last argue for something you were not sure of? Did the room know that was what was happening?',
    body: [
      { p: 'The tradition’s central exercise was arguing both sides of a question, and it is also the oldest thing the subject was attacked for. Module 3 asks you to write down the arguments you do not intend to use, and gives the reason: a case you can argue from both directions is one you actually understand.' },
      { h: 'Why it is not lying' },
      { p: 'Because the frame is understood. A defence advocate is not claiming a personal belief in the client’s innocence, everybody present knows what that role is, and the whole arrangement depends on both sides being put as well as they can be. An actor is not asserting the character’s opinions.' },
      { p: 'In both cases the listener knows what kind of speech they are hearing, which is precisely the availability the line requires. Nothing is hidden, so nothing needs to be.' },
      { h: 'Where it goes wrong' },
      { p: 'When the frame stops being visible. Somebody presenting a position they were handed, in a room that believes they are giving their own view, is not doing advocacy. They are borrowing the credibility of sincerity for a case they do not hold, and the listener cannot discount it because they do not know there is anything to discount.' },
      { key: 'The repair is one sentence and it costs almost nothing: say which of the two you are doing.' },
      { h: 'The harder version' },
      { key: 'Arguing a position well tends to shift what you believe about it in the direction you argued.' },
      { p: 'That is worth knowing about yourself. The exercise is genuinely educational and it is simultaneously a mechanism for talking yourself into things, and the second one is invisible from inside while it is happening.' },
      { qa: [
        { q: 'What makes advocacy honest rather than a lie?',
          a: 'The frame is understood. The listener knows what kind of speech they are hearing, which is precisely the availability the line requires. Nothing is hidden, so nothing needs to be.' },
        { q: 'Somebody presents a position they were handed, in a room that believes it is their own view. What exactly has gone wrong?',
          a: 'They are borrowing the credibility of sincerity for a case they do not hold, and the listener cannot discount it because they do not know there is anything to discount.' },
      ] },
      { panel: { tone: 'sage', icon: 'book', title: 'Keeping the frame visible',
        lead: 'Arguing for a position and asserting it are two different speech acts. The room has to know which it is getting.',
        items: [
          'Say which of the two you are doing. One sentence, almost no cost.',
          'Write the other side’s case down. A case you can argue both ways is one you understand.',
          'Afterwards, check what you now believe. Arguing well moves you in the direction you argued.',
        ] } },
    ] },

  { id: 'rh-defence', module: 'ethics', order: 5,
    title: 'When You Are the Audience',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Use the craft in the direction it is most reliably useful, which is on what is being done to you.',
    orientation: 'Module 1 calls the defensive use the strongest argument for studying any of this. This is it, cashed out.',
    reflection: 'Think of something you were persuaded of and later reversed. What did you not ask at the time?',
    body: [
      { p: 'Module 1 sets out three defences of the subject and finds the third the strongest: you cannot see what is being done to you unless you know how it is done. Five modules later that comes down to a short list of things to notice.' },
      { h: 'Four questions' },
      { defs: [
        { label: 'The request', text: 'What is being asked of me, plainly? A case that resists being reduced to a request is frequently built that way on purpose.' },
        { label: 'The premise', text: 'What would I have to believe for this to follow? That is module 1’s unstated premise, and it is where the disagreement usually turns out to be.' },
        { label: 'The objection', text: 'What is the strongest thing against this, and did they mention it? Module 3 says a case caught hiding its weakness is finished; from this side you are checking whether it was hidden.' },
        { label: 'The refusal', text: 'What happens if I say no? The line from the first lesson, from the receiving end. The fastest of the four and usually the most informative.' },
      ] },
      { h: 'What naming a fallacy is for' },
      { p: 'Both shelves say it at the top and it belongs here too: naming one begins an examination, it does not finish one.' },
      { key: 'A named fallacy is a reason to look harder at a step, not a verdict on a conclusion, and a badly argued case can still be perfectly true.' },
      { cta: { page: 'fallacies', label: 'Open All Fallacies' } },
      { p: 'Used as a verdict, the shelves become the thing module 1 warns the whole subject can be, which is a way of winning without having the better case. The word for that is not scepticism.' },
      { h: 'The defence has a cost' },
      { p: 'Permanent suspicion is not the goal and it is not free. Somebody who has learned to see technique everywhere can become unpersuadable, which is not the same thing as being careful. It is its own error, and it makes you proof against good arguments as reliably as bad ones.' },
      { p: 'The aim is to notice the mechanism and remain movable by a real reason. That is harder than either credulity or refusal, and it is the actual skill this module is asking for.' },
      { h: 'The asymmetry worth remembering' },
      { p: 'Most people are better at seeing this in others than in themselves, and you should assume you are one of them. Everything in this module works more reliably outward than inward, which is exactly why the last lesson is about what you owe rather than about what to watch for.' },
      { qa: [
        { q: 'What is the aim of the defensive use, if it is not suspicion?',
          a: 'To notice the mechanism and remain movable by a real reason. That is harder than either credulity or refusal, and it is the actual skill the module is asking for.' },
        { q: 'What happens when the fallacy shelves are used as a verdict rather than a starting point?',
          a: 'They become the thing module 1 warns the whole subject can be: a way of winning without having the better case. The word for that is not scepticism.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'The defence has a cost',
        lead: 'Permanent suspicion is not the goal, and it is not free.',
        items: [
          'Name a fallacy to begin an examination, never to finish one.',
          'A badly argued case can still be perfectly true.',
          'Somebody who sees technique everywhere becomes unpersuadable, which is not the same thing as careful.',
          'Assume you are better at seeing all of this in other people than in yourself.',
        ] } },
    ] },

  { id: 'rh-owe', module: 'ethics', order: 6,
    title: 'What You Owe',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Take on the one obligation that comes with holding this craft, and know what to do once you have already crossed the line.',
    orientation: 'The end of the course, and the same condition it opened with.',
    reflection: 'Where have you already used something from this course on somebody? Would you have accepted it?',
    body: [
      { p: 'Six modules, and the subject does not resolve. The tools are real, they work, and they do not care who is holding them. That was module 1’s position and nothing since has improved on it.' },
      { p: 'What can be settled is what follows for you.' },
      { h: 'The condition' },
      { p: 'Before You Begin states it, and the course ends where it started.' },
      { key: 'Whatever you learn to do to somebody, be willing to have it done to you.' },
      { p: 'It does not decide hard cases and it is not a philosophy. It is the one thing on this shelf you can apply in a room, in the moment, at speed, without consulting anything.' },
      { h: 'It is addressed inward, on purpose' },
      { p: 'You cannot make other people argue honestly, and nothing in this module is leverage over them. All of it is aimed at the only speaker you control.' },
      { p: 'That is unsatisfying and it is the truthful version. An ethics of persuasion that mainly handed you ways to accuse other people would be a sixth module doing precisely what module 1 warns this subject does.' },
      { h: 'When you find you have crossed it' },
      { p: 'You will, and the useful question is what to do afterwards rather than how to be certain of never doing it. Say so, to the person. A speaker who goes back to a decision and says that the case was pushed harder than it deserved gives back the exact thing that was taken, which was the chance to examine it.' },
      { p: 'It usually costs less than it feels as though it will. Refusing to pay it turns one overreach into a standing position you now have to keep defending, and defending it will require more of the same.' },
      { h: 'What the craft is for' },
      { p: 'The honest use is simple and it is worth ending on.' },
      { key: 'Most true things are not self-evident and do not arrive persuasively by themselves.' },
      { p: 'Somebody has to carry them into a room where attention is short, the stakes are real, and another person is arguing the other way. That work takes skill, and without it the better case loses to the better speaker as a matter of routine.' },
      { p: 'That is the argument for learning this. Not that the craft is neutral, which module 1 calls cold comfort and means it, but that the alternative is leaving it entirely to people who are not asking the question this module asks.' },
      { h: 'The last thing' },
      { p: 'This course has taught you to find arguments, to order them, to shape them and to deliver them. None of it tells you whether you are right. That was never on offer here, it is the work of a lifetime, and the only protection anybody has against becoming the second of the three speakers is the habit of going and checking.' },
      { qa: [
        { q: 'Why is this module addressed inward rather than giving you ways to call out other people?',
          a: 'You cannot make other people argue honestly, and none of it is leverage over them. An ethics of persuasion that mainly handed you accusations would be doing precisely what module 1 warns this subject does.' },
        { q: 'You find you have crossed the line. What does the course ask of you?',
          a: 'Say so, to the person. A speaker who goes back to a decision and admits the case was pushed harder than it deserved gives back the exact thing that was taken, which was the chance to examine it.' },
      ] },
      { panel: { tone: 'sage', icon: 'lamp', title: 'What you carry out of the course',
        lead: 'Six modules, and the subject does not resolve. This part does.',
        items: [
          'Whatever you learn to do to somebody, be willing to have it done to you.',
          'When you cross the line, say so to the person. It costs less than it feels as though it will.',
          'The alternative to learning this is leaving it to people who are not asking the question this module asks.',
          'Nothing here tells you whether you are right. Go and check.',
        ] } },
    ] },

  { id: 'rh-notice', module: 'shape', order: 6,
    title: 'Using One Without Announcing It',
    attribution: 'Speechcraft original',
    requiredReviewer: 'rhetoric',
    objective: 'Decide whether a figure should be noticed, because a shape the listener sees as technique stops arguing and starts advertising.',
    orientation: 'The same figure can be invisible or ceremonial. Which one it is depends on whether the occasion licenses the display.',
    reflection: 'Think of a speech where you noticed the technique. What did noticing do to your trust in the speaker?',
    body: [
      { p: 'The moment a listener thinks that was well put, their attention has moved from the argument to the speaker, and the argument is standing still waiting for them to come back. Sometimes that trade is worth making. Most of the time it is a loss, and it is a loss the speaker rarely sees, because from the inside it feels like the line went well.' },
      { h: 'What makes a figure visible' },
      { list: [
        'Density. One is a sentence, three in a row is a style, and a style is a thing the audience is now watching.',
        'Disproportion — the level-of-style error from earlier in this module, in miniature. A grand shape on a small point announces itself by being too large for what it carries.',
        'A shape the audience has heard used to sell things. Some patterns have been spent by advertising and cannot be borrowed back. This one is least under your control.',
      ] },
      { h: 'When you want it seen' },
      { p: 'Some occasions license visible artifice and some require it. Module 1 calls them epideictic: the toast, the eulogy, the tribute, the award. The audience has come partly for the language, everybody present knows the speech was written, and plainness there does not read as honesty. It reads as insufficient care.' },
      { p: 'Ceremony is the place a figure is supposed to show. The mistake is carrying the ceremonial register into the other two occasions, where it does something close to the opposite.' },
      { h: 'When it costs you' },
      { p: 'In speech about a decision, and in speech about what somebody did, visible artifice raises a question the speaker cannot answer: what is it for. A listener who has just admired a sentence begins wondering why that sentence needed to be admirable, and suspicion of technique is a defence almost every audience has, whatever else they know about rhetoric.' },
      { h: 'One at a time, on the sentence that matters' },
      { p: 'The economy is the same as the grand style earlier in this module. Attention spent on a minor point is not available later, and a common waste in prepared speech is the best shape in it landing on the third least important claim.' },
      { key: 'Find the sentence the whole case rests on, and let that one have the shape.' },
      { h: 'The honest reason, which is not an aesthetic one' },
      { key: 'A listener who is admiring is not examining.' },
      { p: 'That is the entire problem, and it is the condition this course was opened with: what distinguishes honest persuasion is what the listener is left able to do. A figure that dazzles and moves on quickly has taken the examining away, and it is the exact accusation module 6 has to answer.' },
      { h: 'The test on the page' },
      { p: 'Read the sentence and ask whether a person in that situation could plausibly have said it that way. A shape only a prepared speaker could have produced announces the preparation, and announcing the preparation is how a speech stops being addressed to anybody.' },
      { qa: [
        { q: 'Which occasion licenses visible artifice, and what does plainness read as there?',
          a: 'The epideictic one — the toast, the eulogy, the tribute, the award. The audience has come partly for the language, and plainness there does not read as honesty. It reads as insufficient care.' },
        { q: 'What question does visible artifice raise in a speech about a decision?',
          a: 'What is it for. A listener who has just admired a sentence begins wondering why that sentence needed to be admirable.' },
      ] },
      { panel: { tone: 'sage', icon: 'target', title: 'Deciding whether it should show',
        lead: 'The same figure can be invisible or ceremonial. The occasion decides, not your taste.',
        items: [
          'Ceremony is where a figure is supposed to show. Carry that register into the other two occasions and it does the opposite.',
          'One shape, on the sentence the whole case rests on. Not the third least important claim.',
          'Three in a row is a style, and a style is a thing the audience is watching instead of the argument.',
          'Ask whether a person in that situation could plausibly have said it that way.',
        ] } },
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
