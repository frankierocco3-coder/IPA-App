// Shakespeare — the fifth workspace (owner decision 2026-09-24:
// Shakespeare is its OWN course, not a module inside Acting).
//
// Outline and plan: docs/SHAKESPEARE_COURSE_OUTLINE.md. ALL SEVEN MODULES
// ARE WRITTEN as of 2026-09-25: 40 lessons, plus two Library shelves (the
// 160-entry lexicon and the 17-entry rhetoric glossary). The outline
// estimated roughly 42 lessons and the built course is 40, because
// module 6 keeps its figures as a SHELF rather than expanding them into
// seventeen lessons, which is what the outline asked for.
//
// Records have the same shape as js/data/acting/acting-course.js and are
// shown by the same lesson, chapter and module screens (main.js resolves
// which course a lesson id belongs to through BOOKS). Lesson ids are
// 'sh-…' and never collide with Acting's 'ac-…' or Character's 'ch-…'.
//
// HIDDEN: the workspace is behind SHAKESPEARE_LIVE (js/views/context.js)
// and an owner preview flag, the mechanism CHARACTER_LIVE used. The course
// is now COMPLETE ENOUGH TO STAND ALONE, which is the launch condition,
// but launching is an owner decision and the content is unreviewed. Each
// lesson needs a publication entry in js/data/speech/reviews.js, the
// ledger Acting and Character share. NOTHING HERE IS APPROVED.
//
// THE ORGANISING IDEA. Shakespeare is not a separate craft. It is the
// craft this app already teaches, applied to text that is harder to read
// and easier to be frightened of. The course refuses reverence, and it
// refuses treating the verse as rules to obey.
//
// THREE THINGS THIS COURSE DELIBERATELY DOES NOT RE-TEACH, because
// lessons that repeated them would be worse than the thing itself:
//   * vocabulary, archaic words, elisions and changed meanings — the
//     160-entry lexicon (js/data/shakespeare-lexicon.js) is the shelf,
//     and lessons point AT it
//   * syllable counting and scansion mechanics — the Scan tab already
//     marks every syllable, counts it and flags what is not ten
//   * objectives, obstacles, beats, subtext and actions — Acting owns
//     these, and Script Analysis and Playable Actions are already built
//
// HOUSE STYLE: no em dashes, no en dashes, no contractions, curly quotes,
// and no practitioner names in lesson bodies (sources are credited on
// Sources & Credits). Playwrights and characters are named freely.
//
// ACCURACY. Every example points at a text this app already carries: the
// 154 sonnets and the eight Shakespeare scenes on the Scenes shelf. Where
// a claim is contested among scholars, the lesson says so rather than
// teaching one school as fact. Modules 4 and 5 are where that matters
// most: a great deal of what is taught about irregular lines, and about
// Folio capitalisation and punctuation, is interpretation presented as
// rule. Lesson 5.3 carries that weight deliberately and says outright
// that the typography is very largely the printing house, not the author.
//
// WRITTEN ONLY and NEVER SCORED, like Acting and Building a Character.

export const SHAKESPEARE_PRINCIPLE =
  'The verse is not a constraint on the acting. It is information about the acting, written down by somebody who expected actors to read it.';

// Numbers follow the outline, and all seven are now written.
// Module 1 is deliberately the shortest and least actor-facing; every
// lesson in it ends at a consequence for performance.
export const SHAKESPEARE_MODULES = [
  { n: 1, id: 'context', title: 'Shakespeare 101',
    blurb: 'Who he was, what is documented, and the conditions the plays were built for. The shortest module here, and every lesson is pointed at a consequence for performance.' },
  { n: 2, id: 'language', title: 'The Language',
    blurb: 'Why it feels hard, what actually changed since then, and how to find the plain sentence without flattening the line you have to speak.' },
  { n: 3, id: 'form', title: 'Verse and Prose',
    blurb: 'Which one you are in, why he moves between them, and what the crossing tells you about the person speaking.' },
  { n: 4, id: 'metre', title: 'Iambic Pentameter',
    blurb: 'The pulse under the line, what happens when it bends, and why an irregular line is information rather than a mistake.' },
  { n: 5, id: 'folio', title: 'The First Folio and Textual Clues',
    blurb: 'Where the plays came from, why two editions of one play disagree, and how much of what looks like instruction is somebody else at the printing house.' },
  { n: 6, id: 'rhetoric', title: 'Rhetoric',
    blurb: 'Speech built to do something to another person: what the shapes are for, and how to play the intention rather than the label.' },
  { n: 7, id: 'soliloquy', title: 'Soliloquies and Monologues',
    blurb: 'Who you are talking to, what it costs to include the audience, and how to think a speech rather than recite it.' },
];

export const SHAKESPEARE_LESSONS = [

  // ── Module 1 · Shakespeare 101 ────────────────────────────────
  // The least actor-facing module in the course, and deliberately the
  // shortest. Every lesson ends at a consequence for performance, or it
  // becomes a history lecture with nobody in the room.

  { id: 'sh-whymatters', module: 'context', order: 1,
    title: 'Why He Still Matters to Actors',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Make the case for the work to somebody who suspects the whole thing is snobbery.',
    orientation: 'The suspicion is reasonable. The answer is not about greatness.',
    reflection: 'What is the strongest argument you have heard against spending time on this, and does anything below actually answer it?',
    body: [
      { p: 'A lot of what surrounds these plays is snobbery, and pretending otherwise insults the reader. The reverence, the received pronunciation, the assumption that liking them proves something about you: none of it comes from the plays and none of it is required to work on them.' },
      { p: 'The case for an actor is narrower and more practical than the case for greatness. It is that this text asks more of you than almost anything else you will be handed, and the things it asks are the things that transfer.' },
      { list: [
        'Long thoughts. A modern script rarely asks you to hold one idea through eight lines without losing the listener. This does, constantly, and learning to do it improves everything shorter.',
        'Language as action. The characters talk in order to change somebody, so there is nowhere to hide behind atmosphere.',
        'Argument under feeling. The speeches are built, and finding the build is a discipline you take into any text.',
        'Breath and stamina. A speech that runs on for fifteen lines trains a capacity you will not build any other way.',
      ] },
      { p: 'There is also the plain professional fact. Audition panels use it, drama schools use it, and a great deal of paid work assumes it. That is not a reason to love the work, but it is an honest reason to be able to do it.' },
      { p: 'What this course does not claim is that the plays are universal, or that they contain everything, or that an actor who cannot do them is deficient. They are four hundred years old, they carry the assumptions of the people who made them, and some of those assumptions are ugly. You can work on the text without signing up to any of that.' },
    ] },

  { id: 'sh-whowas', module: 'context', order: 2,
    title: 'Who Shakespeare Was',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Separate what is documented from what is guessed, and understand why the gaps attract so much nonsense.',
    orientation: 'A working actor and shareholder who wrote the plays his company needed.',
    reflection: 'Does anything in the documented record change how you would approach a speech? Be honest: usually it does not, and that is worth knowing.',
    body: [
      { p: 'The documented facts are thinner than the reputation and more useful than the legend. He was baptised in Stratford-upon-Avon in April 1564 and buried there in April 1616. He married in 1582 and had three children. By the early 1590s he was in London, working in the theatre, and somebody thought him established enough to attack in print.' },
      { p: 'From 1594 he was with the Lord Chamberlain’s Men, which became the King’s Men in 1603 when the new king took over its patronage. He was a sharer: a part-owner of the company and later of the playhouse, not an employee. He made money from the theatre as a business, and he retired comfortable.' },
      { h: 'What that one fact changes' },
      { p: 'Being a sharer is the most useful thing on the list. It means he wrote for a company he was inside, for actors whose voices and bodies he knew, on a stage he had a financial stake in, under time pressure, for money. These are working scripts written by somebody who would be standing on the same stage. They were not sent out into the world to be admired.' },
      { h: 'The gaps, and what fills them' },
      { p: 'There are real blanks. Nobody knows what he was doing between the mid 1580s and about 1592. No manuscript of a play survives in his hand. We have his will and some signatures and very little else that is personal.' },
      { p: 'Those gaps attract invention, including the theories that somebody else wrote the plays. Those theories have no documentary support and they began nearly two centuries after his death, largely on the assumption that a man of his background could not have written them. That assumption is the interesting part, and it is not about evidence.' },
      { p: 'For an actor none of it matters much. The scripts exist, the company that first played them is documented, and the work in front of you is the same either way.' },
    ] },

  { id: 'sh-england', module: 'context', order: 3,
    title: 'Elizabethan and Jacobean England',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Know the few assumptions the plays expect you to share, and ignore the rest.',
    orientation: 'The plays assume a world. You need about five things from it.',
    reflection: 'In your scene, what does a character take for granted that an audience today would not?',
    body: [
      { p: 'A history course would give you decades of detail. An actor needs the handful of assumptions that change what a line means, and there are fewer than you would expect.' },
      { list: [
        'Rank was visible and it governed how people spoke to each other. Who may address whom, and how, is live information in almost every scene.',
        'Order was believed to run from the top down, so disturbing it at the top was understood to disturb everything below. That belief is why a murdered king produces an unnatural night rather than only a crime.',
        'Marriage was property and alliance as well as feeling, which is why fathers behave as they do about daughters.',
        'Religion had recently been rearranged by force, twice, and talking about it carelessly was dangerous. Plays set their trouble in other countries and other centuries for a reason.',
        'Death was near and public. Plague closed the theatres repeatedly, and executions were attended.',
      ] },
      { h: 'What to do with this' },
      { p: 'Not research. The point is not to acquire a period manner, and an actor who plays the period rather than the person has swapped one kind of hiding for another. The point is that when a line seems to make no sense, the missing piece is often one of those five assumptions rather than a word you do not know.' },
      { p: 'The Balcony scene turns on two of them at once. A marriage decided by families, and a name that carries an entire feud, are both things the audience already understood. What is left for you to play is two people who cannot get past either.' },
    ] },

  { id: 'sh-theatre', module: 'context', order: 4,
    title: 'What the Theatre Was Like',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand the physical conditions the plays were written for, and what those conditions demand of a speaker.',
    orientation: 'Daylight, no set, and a crowd standing close enough to touch you.',
    reflection: 'If the audience could see each other as clearly as they could see you, what would that do to a soliloquy?',
    body: [
      { p: 'Public performances happened in the afternoon, outdoors, in daylight. There was no artificial lighting, so nothing could be darkened, isolated or spotlit. Everybody could see everybody, including each other.' },
      { p: 'There was no set in the modern sense. A few properties, a trapdoor, a gallery above, doors at the back. Location was established by somebody saying where they were, which is why so many scenes open by telling you.' },
      { h: 'The four consequences' },
      { list: [
        'Night is made in the language. If a scene is dark, the words do the darkening, and an actor who does not play that is fighting the text.',
        'There is no isolation. A soliloquy is not a man alone in a pool of light. It is a man visible to two thousand people who can all see one another.',
        'Nothing tells the audience where to look. Attention is won by what is happening, not by a lighting cue, and a scene that stops being interesting loses the room immediately.',
        'The audience is a participant. They are standing, they are close, and they were known to respond out loud.',
      ] },
      { p: 'None of this is nostalgia, and no modern production has to reproduce it. It matters because the scripts were built to work under those conditions, and much of what looks like ornament turns out to be function. The descriptions are doing the set. The direct address is doing the lighting.' },
    ] },

  { id: 'sh-globe', module: 'context', order: 5,
    title: 'The Globe and Its Conditions',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Read the building as an instrument, and understand what a thrust stage does to playing.',
    orientation: 'A stage pushed into the middle of a standing crowd, with the audience on three sides.',
    reflection: 'On a stage with an audience on three sides, where can you stand so that everybody can see your face? The answer is nowhere, and that is the lesson.',
    body: [
      { p: 'The company built the Globe in 1599, on the south bank of the Thames, out of the timbers of an earlier playhouse they had dismantled. It burned down in 1613 when a cannon fired during a performance set the thatch alight, and it was rebuilt the following year. From 1608 the company also played indoors, at Blackfriars, by candlelight, to a smaller and richer audience.' },
      { p: 'The Globe was round, open to the sky in the middle, with galleries of seats around the walls and a yard where people stood. The stage projected out into that yard.' },
      { h: 'What a thrust stage does' },
      { list: [
        'You cannot face everybody. There is no fourth wall to play to, because there is no fourth wall. Somebody is always behind you.',
        'So the performance has to keep moving. Not restlessly, but a speech delivered from one spot to one direction abandons a third of the room.',
        'The audience is visible to itself. People are watching each other watch, and a laugh spreads because the room can see it start.',
        'Distances are short. The back of the yard is close. Intimacy is available in a way it is not in a large modern proscenium house.',
      ] },
      { p: 'The Blackfriars contrast is worth holding too. Indoors, by candle, a quieter and more expensive room, the plays could get smaller and more intricate. The same company was working both ways at once, which is a useful corrective to any idea that there is one correct scale for this text.' },
    ] },

  { id: 'sh-players', module: 'context', order: 6,
    title: 'Who Performed Them',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand how the company worked, and how the way actors received their text changes how the text is built.',
    orientation: 'A small company, no women on stage, almost no rehearsal, and parts written for known bodies.',
    reflection: 'If you only had your own lines and the last few words before each of them, what would you have to get from the cue itself?',
    body: [
      { p: 'The company was small, a dozen or so sharers and hired men, and everybody doubled. A play with thirty named parts was performed by far fewer than thirty people, and the doubling was planned: a character who dies in act three frees an actor for act four.' },
      { p: 'Every part was played by a male performer. Women’s roles were taken by boys and young men trained in the company. Women did not appear on the English professional stage until after the theatres reopened in 1660.' },
      { h: 'The thing that changes how you read' },
      { p: 'Actors were not given the whole play. They were given their own part: their lines, and a few words of cue before each one. A performer might not know how the play ended, or what was said about them when they were offstage.' },
      { p: 'That single fact explains a great deal about how the text is built. The cue has to be unmistakable, so the last words before your line are doing work. Information you need must be in your own lines, because it may not reach you any other way. And a speech has to carry its own shape, since nobody is going to explain the arc to you in a rehearsal room that barely existed.' },
      { p: 'You can test it. Take your part out of the scene, look only at your lines and the words immediately before them, and see how much you can still tell. The answer is usually more than you expected, and the places where it fails are worth marking.' },
      { h: 'Written for known people' },
      { p: 'The parts were written for specific actors whose abilities the writer knew. The company had a leading tragedian and it had a clown, and when the clown was replaced by a different performer the comic parts changed character with him: less physical knockabout, more wit and song. Roles were tailored to bodies and voices that existed.' },
      { p: 'The consequence for you is permission. These parts were shaped around particular people, and nothing about them requires a particular kind of voice or physique now. There is no correct instrument for any of them.' },
    ] },

  { id: 'sh-genres', module: 'context', order: 7,
    title: 'Comedy, Tragedy, History, Romance',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Know what each kind promised an audience, and what the promise gives an actor.',
    orientation: 'Four labels, one of which the author never used.',
    reflection: 'What does your play promise its audience in the first five minutes, and does your character know about that promise?',
    body: [
      { p: 'The First Folio sorted the plays into three groups: comedies, histories and tragedies. Romance is a later invention, applied by critics in the nineteenth century to the strange late plays that fit none of the three. It is a useful category and it is not the author’s.' },
      { h: 'What each one promised' },
      { list: [
        'Comedy promised survival and usually marriage. The obstacles are real and the danger is real, and the promise is that the world reassembles at the end.',
        'Tragedy promised that it would not. The audience knew from the start that the central figure would be destroyed, and the interest was in how and by what.',
        'History promised a known story about the recent national past, with the outcome already settled and the audience aware of it.',
        'Romance, as the later label has it, promised loss followed by an unlikely restoration, with time passing on a scale the other kinds do not attempt.',
      ] },
      { h: 'What the promise gives you' },
      { p: 'Mostly it gives the audience information that your character does not have, and that gap is the engine. In a tragedy the room knows the ending and the character does not, which is where dramatic irony comes from and why a hopeful line can be unbearable. In a comedy the room knows it will probably be all right, which lets a scene be more frightening than it could otherwise afford to be.' },
      { p: 'What it does not give you is a playing style. There is no comic manner and no tragic manner. A character in a comedy wants something and is being prevented, exactly as in a tragedy, and plays it with the same seriousness. The genre is a contract with the audience, not an instruction to you.' },
    ] },

  // ── Module 2 · The Language ───────────────────────────────────

  { id: 'sh-hard', module: 'language', order: 1,
    title: 'Why This Feels Hard',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Name the real obstacles in the text, and recognise the largest one, which is not in the text at all.',
    orientation: 'The difficulty is real. Very little of it is the difficulty people assume.',
    reflection: 'Think of the last time you heard Shakespeare spoken badly. Was the problem that the actor did not understand the words, or that they were performing the fact of it being Shakespeare?',
    body: [
      { p: 'There is an honest list of what makes this text harder to read than a modern script, and it is shorter than its reputation. Some words have moved meaning. The word order inverts. The sentences run long, and an image can sit three clauses away from the thing it describes. Most of it is verse, which looks like it demands something special.' },
      { p: 'Every item on that list is solvable, and this app solves most of them for you. The lexicon shelf handles the words that moved. The Scan tab counts the syllables. Plain Meaning tells you what a sonnet argues, and Side by Side sets it against the original line for line. None of that is the real obstacle.' },
      { h: 'The obstacle that is not on the list' },
      { p: 'The real problem is reverence. An actor who knows the text is important starts performing the importance, and what an audience gets is a person announcing that they are doing Shakespeare. The words arrive beautifully and nothing happens between two people.' },
      { p: 'It shows up in recognisable ways, and every one of them is a way of avoiding the other person in the scene.' },
      { list: [
        'A voice that gets larger and slower than the actor uses anywhere else in their life.',
        'Every line delivered at the same level of significance, so nothing can be more important than anything else.',
        'Beautiful sound arriving with no argument underneath it, because the sense was never worked out.',
        'The actor watching themselves speak, which an audience can always see.',
      ] },
      { p: 'The cause is simple enough. Most people meet these plays as literature before they meet them as scripts, and literature asks to be admired. A script asks to be used. The character has no idea they are in a famous play. They want something from somebody who is standing right there, and they are saying this in order to get it.' },
      { p: 'That is the whole correction, and the rest of this module is how to carry it out. Work out what the sentence says. Work out what the person wants. Then speak the line as written, at the size the situation actually is.' },
    ] },

  { id: 'sh-earlymodern', module: 'language', order: 2,
    title: 'Early Modern English',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand what actually changed in the language between then and now, and how little of it affects what you do on stage.',
    orientation: 'It is not a foreign language. It is your language, four hundred years younger.',
    reflection: 'Read any ten lines aloud without stopping to look anything up. How much did you follow? The answer is usually more than you expect.',
    body: [
      { p: 'The English in these plays is called Early Modern English, and the word doing the work is Modern. It is the same language you speak. A speaker of Old English would find your sentences incomprehensible and you would find theirs unreadable. Shakespeare you can read, slowly, on a first pass, with gaps.' },
      { p: 'What changed is smaller than it feels, and most of it is on the page rather than in the mouth.' },
      { h: 'What actually moved' },
      { list: [
        'Some words changed meaning entirely. “Nice” meant fussy or trivial. “Brave” meant splendid. “Want” meant lack. These are the dangerous ones, because you will not notice you have them wrong.',
        'Some words dropped out of use altogether. These are the safe ones: you know you do not know them, so you look them up.',
        'The second person split two ways, thou and you, and the choice between them carried meaning. That is its own lesson.',
        'Verbs took endings that are gone now: thou hast, he doth, she knoweth.',
        'Syllables were elided to fit the metre: o’er, ’tis, ne’er. These are scansion facts before they are vocabulary.',
      ] },
      { p: 'Three of those five are in the lexicon shelf, with an actor-facing note on every entry, so this course does not drill them. Open Shakespeare’s Language and work through the false friends first. They are the ones that send a performer on stage playing the wrong thing.' },
      { h: 'What did not move' },
      { p: 'Almost everything that matters to an actor. The order of subject and verb in a plain sentence. The way a question rises. The fact that a short word landing after several long ones gets weight. The way a person interrupts themselves when they are frightened. You already have all of it, because you speak the language it grew into.' },
      { p: 'Pronunciation is a separate question and a contested one. The plays were spoken with sounds that are not the sounds of any living accent, and the reconstruction of that is a scholarly field with real disagreement inside it. This course does not ask you to attempt it. Speak the text in the accent you are working in, which for this course is Neutral American.' },
    ] },

  { id: 'sh-syntax', module: 'language', order: 3,
    title: 'The Sentence Underneath',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Find the plain sentence inside an inverted line, and understand why you must never speak the rearranged version.',
    orientation: 'Find the sentence. Then put it back.',
    reflection: 'Take a line you find knotty and write the plain version beside it. What did the original put first that your version puts last, and why might that order be the point?',
    body: [
      { p: 'A great deal of what feels difficult is word order. Modern English mostly runs subject, verb, object, and departs from it rarely. This text departs from it constantly, partly for metre, partly for rhyme, and often because the order itself is doing something.' },
      { p: 'The technique is two steps and the second one matters more than the first.' },
      { steps: [
        'Find the plain sentence. Rearrange the line in your head or on paper until it runs the way you would say it. Who is doing what to whom.',
        'Put it back. Speak the line exactly as written, now that you know what it says.',
      ] },
      { p: 'The second step is where actors go wrong. Having done the work of untangling a line, it is tempting to speak the untangled version, or to speak the original while thinking in the untangled order, which sounds almost the same and is just as flat. The rearranged sentence was a tool. It is not the line.' },
      { h: 'Why the order is the point' },
      { p: 'Consider what inversion does. Putting the object first puts the object first in the listener’s mind. Holding the verb back holds the action back, and the listener waits for it. A sentence that arrives in an unexpected order makes the person hearing it work, and that work is part of what the speech is doing to them.' },
      { p: 'Macbeth does not say that he has done the deed and then ask whether she heard a noise. He says “I have done the deed.” and then “Didst thou not hear a noise?” The order is the man: the fact first, flat, and then the fear arriving underneath it. Rearranged into comfortable modern order, both halves lose their edges.' },
      { p: 'So the plain sentence is private. It lives in your preparation, on your script, in the margin. What the audience hears is the line as written, spoken by somebody who knows exactly what it means.' },
      { h: 'The one thing to watch' },
      { p: 'If you cannot find the plain sentence, the problem is usually punctuation rather than vocabulary. Long speeches carry subordinate clauses that push the main verb a long way from its subject. Find the main verb first, then the thing doing it, then everything else hangs off those two.' },
    ] },

  { id: 'sh-context', module: 'language', order: 4,
    title: 'Meaning From Context',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Handle a word you do not know without stopping the scene, and know which words are worth stopping for.',
    orientation: 'You will not have a glossary on stage. You will have the sentence.',
    reflection: 'Find a word in your text that you have been skating over. Do you actually know it, or have you decided it is atmosphere?',
    body: [
      { p: 'In rehearsal you look everything up. That is not in question, and the lexicon shelf exists for it. This lesson is about the other situation: you are speaking, a word arrives that you do not fully own, and you cannot stop.' },
      { p: 'The sentence usually tells you. A word sits inside a structure that constrains what it can mean, and the structure is still modern English. If somebody is described as doing a thing to another person, you know the word is a verb and you know roughly what kind of verb from what happens next. That is often enough to speak it truthfully.' },
      { h: 'The three kinds, and what each one costs' },
      { list: [
        'A word you do not know and know you do not know. The cheapest kind. Look it up once and it is yours.',
        'A word that has moved meaning. The expensive kind, because nothing warns you. These are why the lexicon puts false friends first.',
        'A word you are treating as atmosphere. The most common kind, and the one nobody admits to. You have decided it sounds like it means something in the right area, and you have never tested that.',
      ] },
      { p: 'The third kind is worth being honest about, because it is where most vagueness in Shakespeare performance comes from. An audience cannot tell you which word an actor has skated over, but they can hear the moment of soft focus, and they stop leaning in.' },
      { h: 'The test' },
      { p: 'Go through your speech and mark every word you could not define to somebody who asked. Not paraphrase, define. That list is your homework, and it is always longer than you expected on the first pass and shorter than you feared on the second.' },
      { p: 'Then decide which ones matter. A word carrying the argument has to be exact. A word inside a list of examples can survive on the sense you get from its neighbours. Spend your preparation where the sentence turns.' },
    ] },

  { id: 'sh-paraphrase', module: 'language', order: 5,
    title: 'Say It In Your Own Words',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Use complete paraphrase as the test of whether you understand a speech, and know what the test cannot tell you.',
    orientation: 'If you cannot say it in your own words, you do not yet know what you are saying.',
    reflection: 'Paraphrase your speech out loud to somebody who does not know it. Where did you hesitate? That hesitation is the part you have not understood.',
    body: [
      { p: 'This is the oldest exercise in the work and it is still the most reliable. Take your speech and say the whole thing in your own language, line by line, leaving nothing out. Not a summary. A replacement, of roughly the same length, that means the same thing.' },
      { p: 'It is uncomfortable, which is the point. Summary lets you skip. Replacement does not: every clause has to become something, and the clauses you do not understand are the ones where you find yourself producing noise.' },
      { steps: [
        'Work line by line, not sentence by sentence, at first. It keeps you honest about the parts you were gliding over.',
        'Say it aloud rather than writing it. Writing lets you pause and tidy; speaking exposes the gaps in real time.',
        'Keep the length. A paraphrase half the length of the original has dropped something.',
        'Do it to a person if you can. An audience of one catches vagueness faster than you will catch it yourself.',
        'Then go back to the text and speak the original, in the same tempo you used for the paraphrase.',
      ] },
      { p: 'That last step is where the value arrives. The paraphrase is not the performance and was never meant to be. It is a way of loading the sense so that when you return to the written line, you are speaking it rather than reciting it.' },
      { h: 'What this test cannot tell you' },
      { p: 'Paraphrase proves you understand the argument. It proves nothing about sound, rhythm, image or the order the thought arrives in, and those are half of what the line is doing. A speech you can paraphrase perfectly can still be spoken flat.' },
      { p: 'It also has a trap. Having found a clear modern version, an actor can fall in love with its clarity and start reaching for it, which produces a performance that is explaining the speech rather than making it. The paraphrase goes back in the drawer once it has done its work.' },
      { p: 'For the sonnets you can see this done: the Plain Meaning tab is a paraphrase of the argument, and In Today’s Voice is a full replacement, line for line. Read either against the original on the Side by Side tab and you are looking at exactly this exercise, completed by somebody else. Doing it yourself is the part that teaches.' },
    ] },

  { id: 'sh-thouyou', module: 'language', order: 6,
    title: 'Thou and You',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Read the second person as a status move, and notice the moment a character switches.',
    orientation: 'Two words for one person, and choosing between them says something every time.',
    reflection: 'In your scene, which one does your character use, and does it ever change? If it changes, what happened in the line before?',
    body: [
      { p: 'Early Modern English had two second persons where we have one. Thou, thee, thy and thine were singular and familiar. You, your and yours were plural, and also singular when the situation called for distance or respect. Modern English kept only the second set, which is why the distinction is invisible to us and was not invisible to them.' },
      { h: 'Roughly how it worked' },
      { list: [
        'Thou to somebody below you in rank, to a child, to an intimate, or to God.',
        'You to somebody above you, to somebody you do not know, or to somebody you are being careful with.',
        'Thou to somebody who has earned you, as an insult. Dropping to the familiar form with a stranger is a deliberate reduction of them.',
        'Thou in a moment of sudden closeness, where the distance drops because feeling has overtaken manners.',
      ] },
      { p: 'The word “roughly” is doing real work in that list. The usage was already unstable in this period and it varies by play, by character, by editor and sometimes inside a single speech for reasons nobody has satisfactorily explained. Anyone who tells you the rule is firm is overstating it.' },
      { h: 'What to do with it' },
      { p: 'Do not build a theory. Find the switches. A character who has been saying you for forty lines and suddenly says thou has done something, and whatever happened in the line before is the cause. That is a playable event, and it is on the page.' },
      { p: 'The reverse matters as much. A character who has been intimate and retreats to you has put something between themselves and the other person, and an audience feels the temperature change even without knowing why.' },
      { p: 'This connects directly to status, which Building a Character teaches as its own module. The pronoun is one of the cleanest status moves in the text, because it is a single word, it is unambiguous on the page, and it costs nothing to play. Find it, mark it, and let the switch land.' },
      { p: 'The lexicon shelf carries the grammar entries if you want the forms laid out. This lesson is only asking you to notice when one becomes the other.' },
    ] },

  // ── Module 3 · Verse and Prose ────────────────────────────────

  { id: 'sh-tellapart', module: 'form', order: 1,
    title: 'Telling Them Apart',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Know at a glance which form you are in, and know why the page is not always reliable about it.',
    orientation: 'The page tells you, and it is right most of the time.',
    reflection: 'Open a scene you are working on. Before reading a word, look at the right-hand edge of the text. What does the shape tell you?',
    body: [
      { p: 'Verse is set one line at a time, each beginning with a capital, each ending where the poet ended it. Prose runs to the edge of the page and wraps wherever the page happens to end. In a well-set edition you can tell which one you are in from across the room, without reading anything.' },
      { p: 'That is the whole test, and for most scenes it is enough. Look at the right-hand margin. Ragged and short, with capitals marching down the left, means verse. Full and justified, wrapping like a paragraph, means prose.' },
      { h: 'Why the page can lie to you' },
      { p: 'A fixed-width file, a narrow phone screen or a badly typeset edition can make prose look lineated, because hard wraps at a fixed width produce exactly the ragged left-capital shape that verse produces. This is not hypothetical. This app shipped a scene as verse that is prose throughout, and the error survived until somebody asked the scene what form it was in rather than looking at its shape.' },
      { p: 'Kill Claudio, from Much Ado About Nothing, is on the Scenes shelf and is prose from beginning to end. It had been rendering with the source edition’s hard wraps treated as line endings, which put false line breaks through the middle of Beatrice’s sentences.' },
      { h: 'The reliable test' },
      { p: 'Form comes from the record, never from the shape. In practice that means the edition you are working from, and knowing that editions disagree. When you need certainty, count: a verse line will usually run to about ten syllables and a prose sentence will run to whatever length the thought needs.' },
      { p: 'The Scan tab does this for you on the eight Shakespeare scenes. Where a scene is in verse it counts by the line against the ten-syllable frame. Where a scene is in prose it works by the sentence and flags nothing, because there is no count to miss.' },
    ] },

  { id: 'sh-whymove', module: 'form', order: 2,
    title: 'Why He Moves Between Them',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand the reasons a scene changes form, and reject the single rule most people are taught.',
    orientation: 'It is not a rule about class, and the plays break that rule constantly.',
    reflection: 'Find a prose passage spoken by a high-status character. What is happening in it that verse would have made harder?',
    body: [
      { p: 'The rule people are taught is that nobles speak verse and commoners speak prose. It is not nothing: the pattern exists and you will see it. It is also broken so often, and by such important characters, that using it as a rule will mislead you more than it helps.' },
      { p: 'Hamlet is a prince and speaks a great deal of prose. Beatrice and Benedick are gentry and their best scenes are prose throughout. Lear speaks prose when he has lost his reason. If rank decided the form, none of that would happen.' },
      { h: 'What actually seems to govern it' },
      { list: [
        'Register. Verse is heightened. Prose is the form that can be plain, quick, coarse or funny without effort.',
        'Function. Argument, persuasion and self-examination tend to arrive in verse. Business, banter, information and mockery tend to arrive in prose.',
        'Who is present. Characters change form depending on who is in the room with them, which is a status move as much as a formal one.',
        'State of mind. A character coming apart may leave verse. A character gathering themselves may return to it.',
      ] },
      { p: 'Every one of those is a tendency rather than a law, and any two of them can point in opposite directions inside the same scene. The useful position is not that there is a rule but that there is a reason, and the reason is available if you look at what is happening when the form changes.' },
      { h: 'The honest caveat' },
      { p: 'Some of the variation is not meaningful at all. Scribes, compositors and editors all touched these texts, and lineation is one of the things they touched most. A passage set as prose in one edition appears as verse in another. Where the evidence is thin, the form is an editor’s judgement, and treating it as the playwright speaking to you directly is a mistake this course would rather you avoided.' },
      { p: 'So: look for the reason, and hold it loosely. A form change with an obvious cause in the scene is worth playing. A form change nobody can explain may be somebody else’s decision about a page.' },
    ] },

  { id: 'sh-switchreveals', module: 'form', order: 3,
    title: 'What the Switch Reveals',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Read a change of form as information about the person speaking, and turn that into something playable.',
    orientation: 'When the form changes, something about the person has changed with it.',
    reflection: 'Where your character changes form, what would have to be true for that change to be involuntary rather than chosen?',
    body: [
      { p: 'The previous lesson said there is a reason. This one is about using it. A change of form is one of the few pieces of character information that is visible on the page before you have decided anything, and it costs nothing to notice.' },
      { h: 'The three questions' },
      { steps: [
        'What changed in the situation at that exact point? Somebody entered, somebody left, a subject arrived, a lie started.',
        'Is the change chosen or involuntary? A character who drops into prose to be understood is doing something. A character who loses verse because they are coming apart is having something done to them.',
        'What would the other form have cost? If the speech had stayed in verse, what could it not have said, or not said that quickly?',
      ] },
      { p: 'The second question is the one that pays. Chosen and involuntary are completely different performances of the same textual event. Playing a deliberate descent into plainness looks nothing like playing a man whose formal speech has stopped working.' },
      { h: 'Status, and who is in the room' },
      { p: 'Form is a social instrument. Speaking verse to somebody in prose can be condescension or can be the speaker failing to come down to meet them. Matching somebody else’s prose can be respect, or complicity, or a trap. The choice is about the other person, which makes it playable in the ordinary way: you are doing something to somebody.' },
      { p: 'This is the same work Script Analysis teaches, applied to a signal that only exists in this kind of text. The objective, the obstacle and the action all still apply. The form change is evidence about what the objective is.' },
      { h: 'One warning' },
      { p: 'Do not perform the form change. An audience should feel that something shifted, not watch an actor arrive at a shift. If you have understood why it happens, the change will happen in you and arrive on its own.' },
    ] },

  { id: 'sh-findswitch', module: 'form', order: 4,
    title: 'Finding the Switch',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Work a real scene that crosses from verse into prose and back, using the app to see where it happens.',
    orientation: 'One scene, two crossings, and an argument about where the first one is.',
    reflection: 'Having seen where the edition puts the crossing, do you agree with it? What would change in your performance if it came four lines earlier?',
    body: [
      { p: 'The Nunnery Scene from Hamlet is on the Scenes shelf, and it crosses form twice. It is the clearest worked example in the app because the crossings are audible in the acting, not only visible on the page.' },
      { p: 'It opens in verse, with the most famous soliloquy in the language. Somewhere after Ophelia is discovered it goes into prose, and it stays there for the whole of the confrontation. Then Hamlet leaves, Ophelia is alone, and the verse comes back with her.' },
      { h: 'Walk it yourself' },
      { steps: [
        'Open the Nunnery Scene from the Scenes shelf and read it once, straight through, without thinking about form.',
        'Open the Scan tab. It marks every crossing between the two forms, and it scans verse by the line and prose by the sentence.',
        'Find the first crossing. Ask what has just happened in the scene at that point.',
        'Find the second. Ask what is different about Ophelia alone.',
        'Then read the confrontation aloud as if it were verse, and again as the prose it is. The difference is the lesson.',
      ] },
      { h: 'The argument about the first crossing' },
      { p: 'Editors do not agree about exactly where the prose begins. From the long speeches onward it is beyond dispute, because they are too long and too unlineated to be anything else. The four short exchanges before that could be read either way, and this edition sets them as prose while recording that the choice is contested.' },
      { p: 'That disagreement is worth more to you than a settled answer would be. It tells you the crossing is a zone rather than a line, and it puts the decision back where it belongs, which is with the actor and the production.' },
      { h: 'What the second crossing is doing' },
      { p: 'Ophelia alone returns to verse. Whatever the confrontation did to her formal speech, it ends when he leaves. That is either her recovering herself or the play returning to its own register around her, and the two readings produce different performances of the same lines.' },
      { p: 'This scene was rendering incorrectly in this app until 2026-09-24: the whole thing was set as verse, which put seven false line endings through one speech. It is named here because a course about reading the page honestly should say when its own page was wrong.' },
    ] },

  // ── Module 4 · Iambic Pentameter ──────────────────────────────

  { id: 'sh-iamb', module: 'metre', order: 1,
    title: 'What an Iamb Is',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Hear the weak-strong pair underneath ordinary English, and stop treating it as something imposed on the line.',
    orientation: 'Weak then strong. You have been speaking in them all day.',
    reflection: 'Say your own name, then your address, then what you had for breakfast. How many weak-strong pairs turned up without you arranging them?',
    body: [
      { p: 'An iamb is two syllables, the first lighter than the second. Not loud and quiet. Lighter and heavier, the way “before” is lighter on the first half and lands on the second, or “again”, or “the door”, or “I think”.' },
      { p: 'English falls into this shape by itself. It is a stress-timed language, which means the weight is unevenly distributed and the listener uses that unevenness to find the sense. The weak-strong pair is the commonest unit that unevenness produces, which is why verse built out of it sounds like speech rather than like chanting.' },
      { h: 'Why this matters to you and not only to scholars' },
      { p: 'Because it reframes the whole thing. The metre is not a pattern laid on top of natural speech that you then have to fight or obey. It is a description of what English does anyway, written down and made regular. An actor who understands that stops asking how to speak verse naturally, because the question dissolves.' },
      { p: 'It also means the iamb is not a performance instruction. You do not hit the second syllable. You do not lean on it. If you speak the sentence meaning what it says, the weak-strong pairs take care of themselves, because they were derived from people speaking sentences and meaning them.' },
      { h: 'What to actually do' },
      { list: [
        'Say the line the way you would say it if you meant it. Do not arrange anything.',
        'Notice where the weight fell. It will mostly have fallen on the strong halves without your help.',
        'Where it did not, that is worth a second look, and the rest of this module is about those places.',
      ] },
      { p: 'The one habit to avoid from the start is the sing-song. An actor who has just learned what an iamb is often starts producing a regular tick underneath everything, and it flattens sense, kills the operative words and makes five lines sound identical. The metre is information. It is not a rhythm to perform.' },
    ] },

  { id: 'sh-pentameter', module: 'metre', order: 2,
    title: 'Five of Them',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand the ten-syllable line as a unit of thought and breath, not as a counting exercise.',
    orientation: 'Five pairs, ten syllables, and a length that is not an accident.',
    reflection: 'Read a line of pentameter on one breath. Then read three. Where did your body want to stop?',
    body: [
      { p: 'Pentameter means five feet. Five iambs, ten syllables, weak-strong five times over. That is the standard line, and it is the frame every irregularity is measured against.' },
      { p: 'The counting is the least interesting thing about it, and the Scan tab does the counting for you on all 154 sonnets and on the verse scenes. What matters is why the line is that length.' },
      { h: 'Why ten' },
      { p: 'Ten syllables is about as much as an adult can speak on one comfortable breath while still shaping it. It is also about as much as a listener can hold as a single unit before needing the sense to land. The line is the size of one thought, delivered in one breath, received in one piece.' },
      { p: 'That is the practical consequence and it is worth more than the arithmetic. The line is a breath unit and a sense unit at the same time. When those two agree, the verse carries itself. When they disagree, which happens constantly, the disagreement is the information.' },
      { h: 'Using the line as a unit' },
      { list: [
        'Try a whole line on one breath before deciding anything about it. If that is impossible, the line is telling you something.',
        'Notice whether the thought finishes where the line does. Often it does not, and that is its own lesson later in this module.',
        'Do not take a breath at the end of every line as a habit. The line end is a unit boundary, not an instruction to inhale.',
      ] },
      { p: 'One more thing about the number ten. It is the frame, not a quota. Lines of eleven and nine syllables are everywhere and are not errors. The Scan tab flags them because a flag is useful, not because a flagged line is a broken one, and the next lesson is about what the flags actually mean.' },
      { p: 'Sonnet 145 is a useful reminder that the frame itself can change. It is the only sonnet in the sequence written in tetrameter, four feet and eight syllables, and this app once flagged all fourteen of its lines as irregular because it assumed pentameter everywhere. The metre of a text is a fact about that text, not a setting.' },
    ] },

  { id: 'sh-readscan', module: 'metre', order: 3,
    title: 'Reading the Scan',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Use the app’s scanner on a real line, and understand precisely what it can and cannot hear.',
    orientation: 'A tool that counts is useful. A tool you trust blindly is not.',
    reflection: 'Find a line where you disagree with the count. Who is right, and how would you settle it?',
    body: [
      { p: 'The Scan tab breaks a line into syllables, counts them, and tells you whether the count matches the frame. It is available on all 154 sonnets and on the Shakespeare scenes, and it is the fastest way to see the shape of a speech.' },
      { h: 'What it does well' },
      { list: [
        'Counting. It is fast, consistent, and does not get bored on line ninety.',
        'Finding the exceptions. A line that is not ten is visible immediately, which is where your attention should go.',
        'Handling prose honestly. On a prose scene it works by the sentence and flags nothing, because there is no frame to miss.',
        'Marking crossings. Where a scene moves between verse and prose it says so.',
      ] },
      { h: 'What it cannot hear' },
      { p: 'It is a heuristic, and roughly four lines in five of regular verse land on exactly ten. The rest do not, and the reasons are things a syllable counter cannot resolve.' },
      { list: [
        'Elision. Whether “flower” is one syllable or two in a given line is a choice the speaker makes, and the right answer is often the one that fits.',
        'Contraction in performance. A word can be compressed in the mouth in a way the spelling does not record.',
        'Names and unusual words, where the dictionary and the verse disagree.',
        'Where the stress actually falls. It counts syllables. It does not tell you which ones carry the weight, and weight is the part that matters.',
      ] },
      { p: 'That last point is the important one. Scansion in the full sense is about stress, not syllable count, and this tool does the count. A line can be exactly ten syllables and still be doing something strange with its stresses, and the tool will pass it in silence.' },
      { h: 'How to use it, then' },
      { p: 'Use it to find where to look. A flagged line is an invitation to read that line carefully, not a verdict that something is wrong. An unflagged line is not a guarantee that nothing is happening. You are the instrument that hears; the scanner is the instrument that counts.' },
      { p: 'And when the tool and your ear disagree, say so out loud in rehearsal. The disagreement is usually about elision, and elision is a performance decision that belongs to you.' },
    ] },

  { id: 'sh-bends', module: 'metre', order: 4,
    title: 'When the Line Bends',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Treat an irregular line as information, and resist the readings that are offered as rules.',
    orientation: 'This is the centre of the module. A line that is not ten is not a mistake.',
    reflection: 'Take an irregular line in your text. Write down three things it might mean. Which of the three does the scene support?',
    body: [
      { p: 'Once you know the frame, the lines that depart from it stand out, and the departures are frequent. This is the lesson the rest of the module hangs from, and it has one argument: an irregularity is a fact about the line, and what it means is an interpretation you have to earn.' },
      { h: 'The kinds you will meet' },
      { list: [
        'An extra syllable at the end, which is a feminine ending, and has its own lesson next.',
        'A reversed first foot, strong then weak, which puts a push on the opening word.',
        'A short line, which leaves silence to be accounted for.',
        'A long line, beyond the eleventh syllable, which crowds.',
        'A broken line, shared with another speaker or left hanging.',
      ] },
      { p: 'Each of those is genuinely on the page. You can point at it and two people will agree it is there. That is where the reliable part ends.' },
      { h: 'The part that is interpretation' },
      { p: 'A great deal of teaching attaches fixed meanings to these: a short line always means a pause, a reversed foot always means urgency, a feminine ending always means uncertainty. Those readings are often useful and they are not rules. The same irregularity means different things in different scenes, and some of them mean nothing at all because the text has been through several hands.' },
      { p: 'Editorial history matters here more than anywhere else in the course. Lineation is one of the most-altered features of these texts. A short line in your edition may be a short line the playwright wrote, or a compositor fitting a page, or an editor making a decision about a damaged passage. Treating every one as a deliberate signal will have you playing an editor’s accident.' },
      { h: 'The method that survives all that' },
      { steps: [
        'Notice the irregularity. State what it is, plainly, without interpreting it.',
        'Ask what is happening in the scene at that moment.',
        'Propose two or three things it could be doing, and say them out loud.',
        'Choose the one the scene supports, and be able to say why.',
        'Hold it loosely. If your partner does something different, the reading can change.',
      ] },
      { p: 'That is slower than being handed a rule, and it is the difference between an actor using the text and an actor obeying a system. The verse is information about the acting. Information has to be read, and reading involves judgement.' },
    ] },

  { id: 'sh-endings', module: 'metre', order: 5,
    title: 'Feminine Endings and Inversions',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Recognise the two commonest bends, and know the readings they usually carry without treating those readings as law.',
    orientation: 'Two departures you will meet on almost every page.',
    reflection: 'Find one of each in your text. What does the scene make you think each one is doing?',
    body: [
      { p: 'Of all the ways a line departs from the frame, two turn up constantly. Learning to spot them takes an afternoon, and they account for a large share of everything the Scan tab flags.' },
      { h: 'The feminine ending' },
      { p: 'An eleventh syllable, unstressed, hanging off the end of the line. The five pairs are complete and then there is one more beat that belongs to none of them. “To be, or not to be, that is the question” is the example everybody knows, and the trailing syllable of “question” is the thing in question.' },
      { p: 'It is very common, and it is often not doing anything in particular: the word the sense needed simply had an extra syllable. Where it does carry something, the usual readings are that the thought is unresolved, that it trails rather than lands, or that the speaker has not finished thinking.' },
      { p: 'The useful discipline is to notice it and then ask whether it matters here. An actor who plays every feminine ending as hesitation will sound hesitant for five acts.' },
      { h: 'The inverted foot' },
      { p: 'A pair that runs strong-weak instead of weak-strong, most often the first pair in the line. The line opens on a push rather than a lift, and the first word gets weight it would not otherwise have.' },
      { p: 'This one tends to be more meaningful than the feminine ending, because the opening of a line is a position of emphasis anyway, and reversing the foot doubles that. A character starting a line on a stressed imperative is doing something with it.' },
      { p: 'Lady Macbeth’s “Infirm of purpose!” opens on the stressed syllable of a word that is an accusation, and it arrives as an interruption of her husband mid-line. The push is the point, and you can hear it without knowing what the foot is called.' },
      { h: 'Both together' },
      { list: [
        'Spot them. Both are visible on the page and the Scan tab will flag the eleven-syllable lines for you.',
        'Ask whether this instance is carrying anything, or whether the word simply had a spare syllable.',
        'If it is carrying something, name what, in terms of what the character is doing to somebody.',
        'Do not perform the device. Play the intention and let the shape happen.',
      ] },
    ] },

  { id: 'sh-caesura', module: 'metre', order: 6,
    title: 'Caesura',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Find the break inside a line and read it as a thought changing direction.',
    orientation: 'The pause that lives in the middle of the line rather than at the end of it.',
    reflection: 'Find a line in your text with a strong break in the middle. What is different about the speaker before and after it?',
    body: [
      { p: 'A caesura is a break inside a line. Not the line ending, which comes with the form, but a stop or a turn somewhere in the middle of the ten syllables. It is usually marked by punctuation, and sometimes only by sense.' },
      { p: 'The app does not find these for you. The Scan tab counts syllables and marks line boundaries, and the internal break is not something it looks for. This is work you do with a pencil.' },
      { h: 'Why it is worth finding' },
      { p: 'Because a line with a strong break in the middle is two things, not one, and the relationship between the halves is where the acting is. A thought that changes direction mid-line has changed direction because of something, and that something is playable.' },
      { p: 'Look at Macbeth after the murder: “I have done the deed. Didst thou not hear a noise?” The break falls after the fourth syllable, and everything on either side of it is a different man. The statement is flat and finished. The question that follows has fear in it. One line, two states, and the hinge is the break.' },
      { h: 'What a caesura can be doing' },
      { list: [
        'A thought completing, and a new one starting in the same breath.',
        'A correction, where the speaker rejects what they just said.',
        'A turn toward a different listener, or from the room to themselves.',
        'A place where feeling interrupts the sentence that was underway.',
      ] },
      { h: 'Marking them' },
      { steps: [
        'Read the speech aloud once without stopping anywhere except full stops.',
        'Mark every place inside a line where you wanted to stop and did not.',
        'For each one, say what changes across the break: subject, listener, temperature, intention.',
        'Then read it again, letting the breaks be as long as the change requires.',
      ] },
      { p: 'The length is the thing actors get wrong in both directions. A caesura is not a rest of fixed value, and it is not nothing either. It is as long as the change takes. Some are a hair. Some are the longest silence in the scene.' },
      { p: 'Script Analysis teaches marking a script, and the caesura belongs on that page alongside the beat changes and the operative words. It is one of the few marks that comes from the form rather than from your reading of the situation.' },
    ] },

  { id: 'sh-enjambment', module: 'metre', order: 7,
    title: 'Enjambment and End-Stopping',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Tell whether a thought finishes with its line or runs past it, and know what each does to your breath.',
    orientation: 'Whether the sense stops where the line stops changes how the speech moves.',
    reflection: 'Count the end-stopped and run-on lines in your speech. Does the proportion change as the speech goes on?',
    body: [
      { p: 'An end-stopped line finishes its thought where it finishes its ten syllables. The sense and the form agree, usually with punctuation at the end, and the line arrives as a complete unit.' },
      { p: 'An enjambed line does not. The sense runs past the line ending into the next line, and the two disagree. The form says stop and the sentence says keep going.' },
      { p: 'Like the caesura, this is not something the Scan tab finds. It counts syllables and knows where lines end; whether the sense ended there is a reading, and it is yours to make.' },
      { h: 'What each one does' },
      { list: [
        'End-stopped lines give a speech weight and deliberateness. Each thought lands. A run of them can feel formal, controlled, or ceremonial, and too many in a row can feel like a list.',
        'Enjambed lines give a speech momentum. The thought outruns the frame, which makes a speaker sound driven, urgent or unable to stop.',
        'A speech that moves from one to the other is telling you something about the speaker across its length.',
      ] },
      { h: 'What it does to your breath' },
      { p: 'This is the practical half. An end-stopped line offers you a breath at the end and you can take it without hurting the sense. An enjambed line does not, and taking one anyway breaks the thought in half.' },
      { p: 'A long run of enjambment will therefore make demands on you, and those demands are part of the character’s state. A speaker who cannot stop is a speaker who is running out of air, and an actor who breathes comfortably through that passage has smoothed out exactly the thing the text built.' },
      { h: 'The mistake in each direction' },
      { p: 'Breathing at every line ending, whether the sense finished or not, produces the sing-song and destroys the sentences. It is the commonest fault in verse speaking and it comes from treating the line as a rule rather than a unit.' },
      { p: 'Ignoring line endings entirely, and speaking the whole speech as prose that happens to be typed in short lines, throws away the form. The line ending is real even when the sentence runs past it, and a very slight lift or suspension at that point is what lets an audience hear both the sentence and the verse at once.' },
      { p: 'Between those two there is a large amount of room, and how you use it is interpretation rather than rule.' },
    ] },

  { id: 'sh-sharedlines', module: 'metre', order: 8,
    title: 'Shared Lines',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Recognise a line split between two speakers, and treat it as an instruction about timing.',
    orientation: 'When two people finish one line between them, the text has written the timing.',
    reflection: 'Find a shared line in your scene. What happens to the moment if you leave a pause in the middle of it?',
    body: [
      { p: 'Sometimes one ten-syllable line is divided between two speakers. One character says part of it, another finishes it, and the line is complete only when both have spoken. On the page the second speaker’s text is often indented to show where it picks up.' },
      { p: 'This is one of the few places where the form gives something close to a direct instruction, and it is about timing. The line wants to be completed as a line, which means the second speaker comes in on the heel of the first.' },
      { h: 'The Macbeth example' },
      { p: 'After the murder, Macbeth and his wife speak in fragments that are counting toward whole lines between them.' },
      { list: [
        'She says she heard the owl scream and the crickets cry, then asks: “Did not you speak?”',
        'He answers: “When?”',
        'She answers: “Now.”',
        'He asks: “As I descended?”',
        'She answers: “Ay.”',
      ] },
      { p: 'Those fragments are short because two people are speaking too fast and too quietly for whole lines. Played with pauses between them, the scene becomes a series of considered exchanges between two calm people. Played as the text sets them, it is what it is: two people who have just committed a murder, listening for sounds in the house.' },
      { h: 'Pick it up, or take the pause the text wrote' },
      { p: 'The shared line says come in immediately. The opposite case says the opposite: where a speaker leaves a line short and nobody completes it, the missing syllables are a silence the text has written, and that silence belongs in the performance.' },
      { p: 'Those two together give you a timing notation that is surprisingly precise for something four hundred years old. A shared line is fast. An unshared short line is a held beat. Neither is a suggestion about mood; both are about when the next sound happens.' },
      { h: 'The caution, which applies to all of module 4' },
      { p: 'Lineation was altered by everyone who handled these texts, and shared lines are exactly the kind of arrangement an editor may have imposed to tidy a passage. Where a shared line is clear in the earliest texts, it is strong evidence. Where it appears in a modern edition and not in the early ones, you are reading an editor’s reading.' },
      { p: 'That does not make it useless. It makes it a proposal, from somebody who thought carefully about the passage, which you are free to accept or decline.' },
    ] },

  // ── Module 5 · The First Folio and Textual Clues ──────────────
  // THE ACCURACY HAZARD OF THE WHOLE COURSE lives here. A well-known
  // school of teaching treats Folio capitalisation and punctuation as
  // acting instruction from the author. A good deal of it is compositor
  // habit and printing-house style. This module's actual subject is that
  // the question is CONTESTED, and 5.3 carries that weight.

  { id: 'sh-folio', module: 'folio', order: 1,
    title: 'What the First Folio Is',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Know where the plays came from, and why half of them survive only because of one book.',
    orientation: 'Published in 1623, seven years after he died, by two men who had acted beside him.',
    reflection: 'Eighteen plays exist only because somebody bothered. Does that change how you think about the text you are holding?',
    body: [
      { p: 'In 1623 two members of the company collected thirty-six plays into a single large volume. They had both acted with the author for years, and they are named in his will. The book is now called the First Folio, after its format: large sheets folded once, the size reserved for serious books.' },
      { p: 'Roughly half the plays in it had never been printed in any form. Without that volume they would be gone. Not damaged or disputed, gone, in the way that most plays of the period are gone.' },
      { h: 'What that means for the text in your hand' },
      { p: 'For those plays the Folio is the only witness. There is nothing to compare it against, so where it is confusing or obviously wrong, an editor has to make a decision and print something. Your edition is the result of many such decisions, and a good one will tell you where they were made.' },
      { p: 'For the other plays there are earlier printed versions to set beside it, which produces a different problem: two texts that disagree. That is the next lesson.' },
      { h: 'What it does not mean' },
      { p: 'It does not mean the Folio is the author speaking directly to you. It was assembled seven years after his death from whatever copy could be found, which differed from play to play: theatre manuscripts for some, earlier printed editions for others, and in places a mixture. It was then set in type by workmen who introduced their own habits, which is the subject of 5.3.' },
      { p: 'The book is the reason the plays exist. It is not a transcript of the author’s intentions, and the distance between those two statements is most of this module.' },
    ] },

  { id: 'sh-quartos', module: 'folio', order: 2,
    title: 'Quartos and the Folio',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand why two versions of one play can disagree, sometimes wildly, and what an actor does about it.',
    orientation: 'Two texts of the same play, both early, both different.',
    reflection: 'If your speech is shorter in one early edition and longer in another, which one are you performing, and do you know why?',
    body: [
      { p: 'Before the Folio, individual plays were printed in small cheap editions called quartos, again after the format. Some plays exist in several, and where a quarto and the Folio both survive they rarely match.' },
      { p: 'Sometimes the difference is trivial. Sometimes it is enormous: whole speeches present in one and absent from the other, lines assigned to different characters, endings that are not the same ending.' },
      { h: 'Hamlet is the clearest case' },
      { p: 'Three early texts survive. The first quarto is much shorter than the others and differs throughout, including in the most famous speech in the language, which begins the same way and then goes somewhere else. The second quarto is long. The Folio is different again, cutting some passages the second quarto has and adding others it does not.' },
      { p: 'Almost every modern Hamlet is a conflation: an editor has combined them into a text that no early edition contains and that was probably never performed in that form.' },
      { h: 'King Lear, and why editors changed their minds' },
      { p: 'The quarto and the Folio of Lear differ so substantially that they have been argued to be two distinct versions, possibly representing a revision. Some modern editions now print both rather than merging them, which is a real change in editorial practice and an admission that merging was always a choice.' },
      { h: 'What an actor does' },
      { p: 'Find out which text your edition is following and where it departs. A good edition says so in its notes, and those notes are worth ten minutes of your time.' },
      { p: 'Then treat a disputed passage as a choice rather than a fact. If a speech exists in one text and not another, the production is choosing to include it, and knowing that is different from assuming it was always there.' },
      { p: 'What you should not do is assume the longer version is the real one, or that the earliest is the truest. Neither follows, and both are common assumptions.' },
    ] },

  { id: 'sh-capitals', module: 'folio', order: 3,
    title: 'Whose Capital Letter Is That',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand who actually put the capitals, italics and spellings on the page, and why a whole school of teaching rests on shaky ground.',
    orientation: 'This is the lesson that will put you at odds with a teacher, so it is careful.',
    reflection: 'If you were taught that every capitalised word is an emphasis, what evidence were you given for it? The answer is usually none, and that is the point.',
    body: [
      { p: 'There is a widely taught approach that treats the Folio page as a set of instructions from the author: capitalised words are to be stressed, italics are significant, spelling variants signal length or weight, and the punctuation marks the breaths. Actors are told to work from an unedited Folio text and follow its typography.' },
      { p: 'The appeal is obvious. It promises direct contact with the author across four hundred years, and it hands an actor concrete things to do. Some of the people who teach it are serious practitioners and their students often speak verse well.' },
      { h: 'The problem' },
      { p: 'The typography is very largely not the author’s. It belongs to the printing house.' },
      { list: [
        'The Folio was set in type by several different workmen, whose individual habits are identifiable from their consistent spelling preferences. Where those habits differ, the page differs, and the author did not change his mind at the boundary.',
        'Capitalising nouns was ordinary practice in printing of the period. It was not a mark of emphasis, and it appears on words nobody would argue should be stressed.',
        'Compositors adjusted spelling and punctuation to make lines fit the width of the column. Setting type is a physical craft with physical constraints.',
        'No manuscript of a play in the author’s hand survives, so there is nothing to compare the printed page against.',
      ] },
      { h: 'What this course says' },
      { p: 'That the question is contested, and that an actor who believes the typography is the author speaking has been misled about where it came from. That is a claim about evidence, not about whether the technique produces good work.' },
      { p: 'Because it sometimes does. Looking hard at an unfamiliar version of a page makes you read more slowly, notice words you had skated over, and question choices your edition made silently. Those are real benefits, and they do not require the historical claim to be true.' },
      { p: 'So use it as a lens and not as an authority. If a capital makes you look twice at a word, that is worth something. If you are stressing a word because a workman in 1623 capitalised it, you have handed your performance to a stranger.' },
    ] },

  { id: 'sh-punctuation', module: 'folio', order: 4,
    title: 'Punctuation and Lineation',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Judge how far to trust the arrangement of the page, and know which parts of it are most likely to be somebody else.',
    orientation: 'Punctuation is the most-altered thing on the page, and lineation is the second.',
    reflection: 'Look at the punctuation in your speech. Which marks are doing work you could not do without them?',
    body: [
      { p: 'Early modern punctuation worked differently from ours. It was closer to a guide for speaking aloud than a system of grammar, which is the grain of truth in the idea that the marks are performance information.' },
      { p: 'The difficulty is that this tells you about the period, not about the author. A compositor punctuating by the conventions of his trade produces rhetorical punctuation too, and you cannot tell from the page which of them did it.' },
      { h: 'Lineation, and why it matters more' },
      { p: 'Where the lines break is the arrangement most likely to have been altered, and it is the one module 4 depends on. A short line, a shared line, a passage set as prose rather than verse: every one of those is a decision somebody made, and not always the author.' },
      { p: 'This is why module 4 keeps saying the same thing. An irregular line is a fact about the page you are holding. Whether it is a fact about the writing is a separate question, and often an open one.' },
      { h: 'A working position' },
      { list: [
        'Trust the words first. Vocabulary and word order are far more stable than punctuation across editions.',
        'Trust the sense over the marks. If the punctuation makes the sentence say something the words do not support, the punctuation is wrong.',
        'Treat a full stop as more reliable than a comma. Small marks were changed most freely.',
        'Where lineation carries weight, check whether your edition notes a disagreement. If it does, that is a decision you are inheriting.',
        'Do not build a performance on a single mark that only one edition has.',
      ] },
      { p: 'None of this means ignore the page. It means know which parts of it are load-bearing. The sentence is. The semicolon may not be.' },
    ] },

  { id: 'sh-directions', module: 'folio', order: 5,
    title: 'Stage Directions',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Tell an early stage direction from a later editor’s addition, and know why almost all the familiar ones are additions.',
    orientation: 'Most of the stage directions in your edition were written centuries after the play.',
    reflection: 'Open your scene. How many of its directions could you delete without losing anything the dialogue does not already say?',
    body: [
      { p: 'The early texts carry very few directions. Entrances, exits, a handful of actions that the dialogue cannot supply. They are sparse because the company did not need them: the writer was in the building.' },
      { p: 'Almost everything else in a modern edition was added by editors from the eighteenth century onward, and it is usually not marked as an addition unless the edition is a careful one.' },
      { h: 'The additions to watch' },
      { list: [
        'Locations. Headings such as “A room in the castle” are editorial nearly without exception. The early texts do not say where scenes happen, because the stage did not change.',
        'Act and scene divisions. Largely imposed later, and they can cut across the way a play actually moves.',
        'Asides. Marking a line as an aside is an interpretation, and a strong one: it decides that nobody else hears it.',
        'Emotional or manner directions. Anything telling you how to feel while speaking is later, and you are free to ignore it.',
      ] },
      { p: 'This app is not innocent of it. The Macbeth scene on the Scenes shelf opens with a location heading that came with the source edition and is not authorial. It is left in place because the scene is reproduced as the edition prints it, and named here so that a reader knows what they are looking at.' },
      { p: 'The scene records also mark where our own cut begins mid-speech, and the app labels that as ours rather than letting it pass as the edition’s. The principle is the same one: say who wrote what.' },
      { h: 'The genuine ones' },
      { p: 'Some early directions are unmistakable and wonderful, and they tend to describe actions the dialogue cannot cover: a bear driving somebody offstage, a statue moving. When a direction tells you something you could not get from the words, it is likelier to be early. When it tells you a room or a mood, it is likelier to be an editor.' },
    ] },

  { id: 'sh-clues', module: 'folio', order: 6,
    title: 'Using Clues Without Obeying Them',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Read an edition knowing which choices are the author’s and which are an editor’s, and hold the difference while you work.',
    orientation: 'The page is evidence. It is not an instruction manual, and the difference is the module.',
    reflection: 'Name one thing you have been doing in a speech because the page told you to. Do you know who put it there?',
    body: [
      { p: 'This module has taken several things away. It is worth saying plainly what is left, because the answer is: nearly everything that matters.' },
      { h: 'What is reliable' },
      { list: [
        'The words. Vocabulary and word order are stable across editions to a degree nothing else on the page is.',
        'The sense. What the sentence argues survives every compositor.',
        'The form, broadly. Whether a passage is verse or prose is usually agreed, even where the exact crossing is not.',
        'Large-scale structure. Who is in a scene, what happens, what changes.',
      ] },
      { h: 'What is a proposal' },
      { list: [
        'Punctuation, especially the small marks.',
        'Capitalisation, italics and spelling.',
        'Exact lineation, including short and shared lines.',
        'Locations, asides and any direction about manner.',
      ] },
      { p: 'A proposal is not worthless. It came from somebody who thought about the passage, often for years, and it is frequently right. It is simply not the same kind of thing as the words, and treating the two as equally authoritative is the error this module exists to prevent.' },
      { h: 'The working habit' },
      { steps: [
        'Read the edition’s introduction on its text. Five minutes, and it tells you what you are holding.',
        'Note where it records a disagreement. Those are the live places.',
        'When something on the page tells you to do something, ask who wrote it before you obey it.',
        'Make your choice as a choice, and be able to say why.',
      ] },
      { p: 'That habit is the whole point, and it generalises past this author. An actor who knows the difference between the text and the edition is harder to mislead, in any period, by anybody.' },
    ] },

  // ── Module 6 · Rhetoric ───────────────────────────────────────
  // Three lessons and a shelf. The seventeen figures are a GLOSSARY
  // (js/data/shakespeare/rhetoric.js), not seventeen lessons: that would
  // be the dullest part of the app.

  { id: 'sh-speechaction', module: 'rhetoric', order: 1,
    title: 'Speech As Action',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Understand what rhetoric is for, and stop treating it as decoration.',
    orientation: 'A structure built to do something to another person.',
    reflection: 'In your speech, what does the other person do differently because of it? If the answer is nothing, something has been missed.',
    body: [
      { p: 'Rhetoric has a bad reputation, and the word is now mostly used to mean empty. In the period these plays were written it meant something closer to the opposite: the study of how speech changes people, taught at school, to boys, as a practical skill.' },
      { p: 'The characters went to that school. So did the audience, in whatever measure. When a character builds a speech in a recognisable shape, they are doing something deliberate, and the room could hear the deliberation.' },
      { h: 'Why this is an acting lesson and not a literature lesson' },
      { p: 'Because it says the same thing Acting says, in different words. A speech is an action taken against somebody to get something. Rhetoric is the name for how that action is built.' },
      { p: 'Which means the figures are not ornament laid on afterwards. A character does not decide to persuade and then decorate. The shape is the persuasion.' },
      { h: 'The test' },
      { p: 'Every time you find a device, ask what it is doing to the listener. Not what it is called and not what it sounds like: what it does.' },
      { p: 'A list of three makes the third item land. A repeated opening makes a complaint feel endless. A question they have to answer in their own head makes them complicit. Those are effects on a person, and effects on a person are playable in the ordinary way.' },
      { p: 'The rhetoric shelf gives you seventeen of these with the effect written out on each one. Use it the way you use the lexicon: not to memorise, but to look something up when you find it.' },
    ] },

  { id: 'sh-shapes', module: 'rhetoric', order: 2,
    title: 'The Shapes of Thought',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Recognise the handful of structures that carry most of the work, and read them as evidence of what a character wants.',
    orientation: 'A few shapes do most of the lifting, and they are easy to see once you know them.',
    reflection: 'Find the antitheses in your speech. Do they all pull the same way, or is the character arguing with themselves?',
    body: [
      { p: 'You do not need all seventeen to start. Four shapes account for most of what you will meet, and each one tells you something different about the person speaking.' },
      { h: 'Antithesis: the character is choosing' },
      { p: 'Two things set against each other. It is the commonest structure in the plays and the most immediately useful, because it hands you the alternatives the character is weighing. Find them, play the opposition, and the line does much of the work.' },
      { p: 'A speech full of antitheses is a mind that keeps splitting. A speech with one, late, is a mind that has arrived somewhere.' },
      { h: 'Repetition: the character is stuck, or building' },
      { p: 'Repetition at the start of clauses builds and accumulates. Repetition at the end closes doors. A word repeated immediately, with nothing between, is somebody who cannot move past it. In every case the repetition is not emphasis for its own sake; it is a report on what the speaker cannot leave alone.' },
      { h: 'Lists: the character is piling or chaining' },
      { p: 'A list with the conjunctions stripped out is fast and out of control. A list with every conjunction kept is relentless and feels endless. Same items, different states of mind, and the difference is visible on the page.' },
      { h: 'Balance and inversion: the character is proving' },
      { p: 'Mirrored structures sound like proof, because symmetry implies something has been weighed. That is why they belong to characters winning arguments, and why they are worth distrusting when you find them.' },
      { p: 'Four shapes. Antithesis, repetition, lists, balance. The other thirteen entries on the shelf are refinements of these.' },
    ] },

  { id: 'sh-playfigure', module: 'rhetoric', order: 3,
    title: 'Playing the Figure',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Turn a device you have found into an intention you can play, without ever performing the label.',
    orientation: 'Find the device, then forget its name.',
    reflection: 'Could somebody watching you tell which figure you had identified? If yes, you are performing the analysis.',
    body: [
      { p: 'The danger with this module is that an actor learns the names and starts showing them. It is a real failure mode and it sounds like somebody pointing at their own speech.' },
      { p: 'The method is three steps, and the third is the one that matters.' },
      { steps: [
        'Find it. Mark the device on the page, in the margin, with its name if that helps you.',
        'Name the effect. Not the figure: what it does to the person hearing it. The shelf gives you this on every entry.',
        'Throw the name away. Play the intention. The shape will happen because it is written into the words, and it does not need your help.',
      ] },
      { h: 'Why the shape does not need help' },
      { p: 'Because it is already there. The repetition repeats whether or not you lean on it. The three items arrive in order whether or not you count them aloud. An actor who reinforces a structure the text has already built produces the same effect twice, and the second one sounds like technique.' },
      { p: 'Trust the writing. It was made by somebody who expected actors to say it, and the effects were built to survive ordinary speaking.' },
      { h: 'What to do instead' },
      { p: 'Spend the attention on the person you are speaking to. A device is a move against somebody, so the useful question is never how to perform the antithesis. It is what you need this person to understand, and why the plain version would not have worked.' },
      { p: 'This is the same instruction module 3 gave about form changes and module 4 gave about irregular lines, which is not an accident. Everything in this course arrives at the same place: the text is information, the information is about what you are doing to somebody, and the doing is the acting.' },
    ] },

  // ── Module 7 · Soliloquies and Monologues ─────────────────────

  { id: 'sh-soliloquy', module: 'soliloquy', order: 1,
    title: 'What a Soliloquy Is',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Define the form by what it does, and rule out the two ways it is usually got wrong.',
    orientation: 'Neither a poem recited nor a private mutter.',
    reflection: 'Is your speech a soliloquy or a monologue? What changes if you have it the wrong way round?',
    body: [
      { p: 'A soliloquy is a speech made when the character is alone on stage, or believes they are. A monologue is a long speech made to other people who are present. The distinction sounds academic and it is not: it decides who you are talking to, which decides everything else.' },
      { h: 'The two failures' },
      { p: 'The first is recitation. The speech is treated as a set piece, the language is made beautiful, and the actor performs the quality of the writing. It is the reverence problem from the first module, and it is commonest in the famous speeches for obvious reasons.' },
      { p: 'The second is the private mutter. In reaction against recitation, the actor plays it as interior monologue: small, naturalistic, half-heard, as if the audience were eavesdropping on somebody thinking. It is more modern and no more accurate.' },
      { p: 'Both fail for the same reason. They remove the audience. One plays at them and the other pretends they are not there, and neither uses them.' },
      { h: 'What it actually is' },
      { p: 'A character working something out, out loud, in front of people, under conditions where everybody can see everybody. The theatre these were built for had no darkness to hide the room, which means the audience was always a visible presence and the form was built knowing that.' },
      { p: 'So the question is not whether to acknowledge them. It is what they are to you, and that is the next lesson.' },
    ] },

  { id: 'sh-whotalking', module: 'soliloquy', order: 2,
    title: 'Who Are You Talking To',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Make the central choice of the form, and understand how completely it changes the speech.',
    orientation: 'The audience, yourself, God, or nobody. Pick one, and mean it.',
    reflection: 'Try your speech on each of the four. Which one makes the hardest lines easiest to say?',
    body: [
      { p: 'This is the decision the whole form turns on, and it is genuinely open. The text rarely settles it, productions differ, and the same speech works under more than one choice.' },
      { list: [
        'The audience. You are talking to the room, and they are a party to what you are deciding. This makes them complicit, which is useful when a character is contemplating something appalling.',
        'Yourself. An argument between parts of one person, conducted aloud. The audience overhears rather than participates.',
        'God, or fate, or the dead. An appeal upward or outward, to something that does not answer. The silence becomes part of the scene.',
        'Nobody. The words come out because the pressure is too great to hold them in. Closest to the modern instinct, and the least useful most of the time, because it gives you nothing to play against.',
      ] },
      { h: 'How to choose' },
      { p: 'Test all four. Say the speech four times, once on each, and notice which one makes the difficult lines land. Not the pretty lines: the difficult ones, where the argument turns or the character says something they cannot take back.' },
      { p: 'The hard lines are the test because the right choice gives you somewhere to put them. A question with no listener is inert. The same question asked of a room, or of God, has a shape.' },
      { h: 'It can change inside a speech' },
      { p: 'Long speeches often move. A man starts talking to himself and ends up appealing to the audience, or begins with God and ends alone. The point where it turns is usually the point where the argument fails, and that turn is one of the most playable events in the form.' },
      { p: 'What does not work is having no answer. A speech with an undecided listener arrives as general, and general is the one thing an audience will not lean into.' },
    ] },

  { id: 'sh-audience', module: 'soliloquy', order: 3,
    title: 'The Audience As Scene Partner',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Use direct address as a relationship, and know what it costs.',
    orientation: 'Look at them and they become a character in the play.',
    reflection: 'If the audience is a person, who are they? A friend, a judge, an accomplice, a stranger?',
    body: [
      { p: 'Direct address is not a device for making a speech livelier. It gives you a scene partner, and everything that applies to a scene partner applies to them: they have a relationship with you, they can be persuaded, and they can refuse.' },
      { p: 'Once you accept that, the useful question is the one you would ask about any partner. Who are they to this character? A confidant, a jury, a crowd being worked, somebody being let in on a secret, somebody being implicated in it.' },
      { h: 'What it costs' },
      { list: [
        'You cannot take it back. An audience you have spoken to directly is in the play, and ignoring them afterwards reads as a decision.',
        'It is live. They respond differently every night, and a performance built on one response will break.',
        'It exposes you. Playing to the fourth wall protects you. Speaking to a person in row four does not.',
        'It can flatter. Charm is easy to get this way, and easy to start pursuing, and pursuing it turns a character into a performer.',
      ] },
      { h: 'The gain' },
      { p: 'It makes the speech happen now. A character asking a real question of real people gets real silence back, and the silence is different every night, which means the speech cannot be a recitation even if you wanted it to be.' },
      { p: 'The playing conditions of the original theatre made this the default rather than a choice: daylight, a standing crowd, no way to hide the room. Any production can decline it. Declining it knowingly is different from never having considered it.' },
    ] },

  { id: 'sh-thinking', module: 'soliloquy', order: 4,
    title: 'Thinking, Not Reciting',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Play a speech as something being worked out now, rather than a conclusion already reached.',
    orientation: 'The character does not know how the speech ends.',
    reflection: 'Where in your speech does the thought genuinely change direction? Mark those places. They are the whole performance.',
    body: [
      { p: 'You know the speech. You have learned it, you know its last line, and you know what the character decides. The character does not. That gap is the single largest problem in playing the form, and everything else in this lesson is a way of managing it.' },
      { h: 'What reciting looks like from outside' },
      { p: 'An audience can tell within about two lines. The delivery has a settled quality, the emphases are the same every time, and the ending is audible in the beginning. Nothing is at risk, so there is nothing to watch.' },
      { h: 'What thinking looks like' },
      { p: 'A thought that arrives, gets tested, and turns out to be insufficient, so another one has to be found. The pauses fall where the difficulty is rather than where the punctuation is. The speaker surprises themselves.' },
      { h: 'How to get it' },
      { steps: [
        'Find the turns. Mark every place the thought changes direction, rejects itself, or starts over. These are the joints of the speech.',
        'At each turn, ask what made it turn. A word that was wrong, a consequence that appeared, a feeling that arrived.',
        'Let each section be genuinely insufficient. If the first movement solved the problem the speech would stop there, and it does not.',
        'Do not decide in advance how long the pauses are. A thought takes the time it takes, and it takes a different time tonight.',
        'Speak the whole thing to somebody, badly, without performing it, and notice where you actually had to think.',
      ] },
      { p: 'The caesura work in module 4 feeds directly into this. A break inside a line is very often a thought changing direction, which means the form has already marked some of the joints for you.' },
    ] },

  { id: 'sh-discovery', module: 'soliloquy', order: 5,
    title: 'Discovery',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Find the place where the character learns something mid-speech, and let it cost them.',
    orientation: 'The moment the speech stops being the speech they started.',
    reflection: 'What does your character know at the end that they did not know at the beginning? If the answer is nothing, look again.',
    body: [
      { p: 'Most speeches worth playing contain a discovery. The character sets out to say one thing and finds out something else on the way, and the discovery is why the speech exists rather than a shorter statement of its conclusion.' },
      { p: 'Finding it is a reading job. Ask what the character knows at the start and what they know at the end, and the difference tells you what was learned. Then find the line where it happened.' },
      { h: 'What a discovery does to a speech' },
      { list: [
        'Everything before it is a different speech from everything after it.',
        'It usually costs something. A discovery that leaves the character comfortable is probably not one.',
        'It is often involuntary. The character was not looking for it, which is why it lands.',
        'It frequently arrives on a small word rather than a grand one.',
      ] },
      { h: 'The mistake' },
      { p: 'Playing the discovery as a decision. A decision is chosen and can be performed; a discovery happens to somebody. If an audience sees an actor arrive at a pre-planned realisation, the moment is gone and what is left is a demonstration of it.' },
      { p: 'The other mistake is finding too many. A speech with a discovery every four lines has none, because nothing has been allowed to cost anything.' },
      { h: 'After it' },
      { p: 'Something has to be different. A character who discovers something and then continues in the same manner has not discovered it. The change can be small, but it has to be there, and it is usually the most watchable thing in the speech.' },
    ] },

  { id: 'sh-famous', module: 'soliloquy', order: 6,
    title: 'The Famous Ones',
    attribution: 'Speechcraft original',
    requiredReviewer: 'acting-professional',
    objective: 'Work a speech everybody has heard, without imitating the recordings or fighting them.',
    orientation: 'The hardest speeches to play are the ones the room can already recite.',
    reflection: 'Whose version of your speech is in your head? Be specific. You cannot put it down until you know you are carrying it.',
    body: [
      { p: 'Some speeches arrive pre-owned. The audience knows the first line, half of them know several more, and a number of famous performances are sitting in the room whether anybody wants them there or not. The Nunnery Scene on the Scenes shelf opens with the most heavily owned speech in the language.' },
      { h: 'The two wrong responses' },
      { p: 'The first is imitation, usually unconscious. An actor who has heard a speech many times reproduces its shape without noticing, and the result is a copy of a reading somebody else earned.' },
      { p: 'The second is contrarianism: doing something different on purpose, specifically to avoid the famous version. This is still the famous version deciding your performance, just inverted, and it usually produces choices the text does not support.' },
      { h: 'The working method' },
      { steps: [
        'Name what you are carrying. Say out loud whose version is in your head. Unnamed, it operates on you unexamined.',
        'Go back to the sentence. Paraphrase it completely, as module 2 taught, as though you had never heard it. Most famous speeches are much plainer than their reputation.',
        'Do the ordinary work. Circumstances, who you are talking to, what you want, where the thought turns. Nothing here is special.',
        'Let the famous line be ordinary. It is almost always simple, and simple is what the imitations tend to lose.',
        'Check your choices against the text and not against the recordings. If a choice is only defensible as different, drop it.',
      ] },
      { h: 'The consolation' },
      { p: 'A famous speech is famous because it works, and it mostly works by being clear. The reason it survived is not that it is difficult. The audience knowing it is a smaller problem than it feels, because what they know is the words, and the words were never the part that was yours.' },
    ] },

];

// One Library shelf per module, in path order.
const SHELF_ICON = { context: '🏛️', language: '🗝️', form: '📐',
  metre: '🥁', folio: '📜', rhetoric: '⚖️', soliloquy: '🗣️' };
export const SHAKESPEARE_COLLECTIONS = SHAKESPEARE_MODULES.map(m => ({
  id: m.id, icon: SHELF_ICON[m.id], title: m.title,
  lessons: SHAKESPEARE_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
