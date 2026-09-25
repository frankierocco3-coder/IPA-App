// Shakespeare — the fifth workspace (owner decision 2026-09-24:
// Shakespeare is its OWN course, not a module inside Acting).
//
// Outline and plan: docs/SHAKESPEARE_COURSE_OUTLINE.md. Seven modules are
// planned, roughly 42 lessons. WRITTEN SO FAR: modules 2, 3 and 4, the
// language and the verse, which the outline calls the spine. Module
// numbers follow the outline so each keeps its number as the rest arrive.
//
// Records have the same shape as js/data/acting/acting-course.js and are
// shown by the same lesson, chapter and module screens (main.js resolves
// which course a lesson id belongs to through BOOKS). Lesson ids are
// 'sh-…' and never collide with Acting's 'ac-…' or Character's 'ch-…'.
//
// HIDDEN: the workspace is behind SHAKESPEARE_LIVE (js/views/context.js)
// and an owner preview flag, the mechanism CHARACTER_LIVE used. It turns
// on when the course can stand alone, which 18 of 42 lessons is not. Each
// lesson also needs a publication entry in js/data/speech/reviews.js, the
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
// teaching one school as fact. Module 4 is where that matters most: a
// great deal of what is taught about irregular lines is interpretation
// presented as rule.
//
// WRITTEN ONLY and NEVER SCORED, like Acting and Building a Character.

export const SHAKESPEARE_PRINCIPLE =
  'The verse is not a constraint on the acting. It is information about the acting, written down by somebody who expected actors to read it.';

// Numbers follow the outline. Modules 1, 5, 6 and 7 are planned and not
// yet written, so they are absent rather than listed empty.
export const SHAKESPEARE_MODULES = [
  { n: 2, id: 'language', title: 'The Language',
    blurb: 'Why it feels hard, what actually changed since then, and how to find the plain sentence without flattening the line you have to speak.' },
  { n: 3, id: 'form', title: 'Verse and Prose',
    blurb: 'Which one you are in, why he moves between them, and what the crossing tells you about the person speaking.' },
  { n: 4, id: 'metre', title: 'Iambic Pentameter',
    blurb: 'The pulse under the line, what happens when it bends, and why an irregular line is information rather than a mistake.' },
];

export const SHAKESPEARE_LESSONS = [

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

];

// One Library shelf per module, in path order.
const SHELF_ICON = { language: '🗝️', form: '📐', metre: '🥁' };
export const SHAKESPEARE_COLLECTIONS = SHAKESPEARE_MODULES.map(m => ({
  id: m.id, icon: SHELF_ICON[m.id], title: m.title,
  lessons: SHAKESPEARE_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
