// The thirteen fallacies — Aristotle's list, and only his.
//
// Owner decision 2026-09-28: "lets just use aristotles". A shelf of its
// own, NOT filed with the figures (owner correction the same day). The
// two are opposites and mixing them would teach the wrong thing: a figure
// is a shape that makes an argument land, a fallacy is a shape that makes
// a bad argument look like a good one. Same craft, opposite direction.
//
// THE LIST IS CLOSED, which is the reason to use it. Modern handbooks run
// to a hundred or more named fallacies, most of them Latin labels nobody
// says out loud and several of them the same error under three names.
// Aristotle names thirteen in Sophistical Refutations and divides them
// once, cleanly: six that depend on language and seven that do not. An
// actor or a speaker can hold thirteen. Nobody holds a hundred.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'FA-<3 digits>'. STABLE FOREVER — never renumber, never
//            reuse. Retire an id rather than reassign it.
//   term     the name in the form it is usually met, with the traditional
//            Latin or Greek label where that is what handbooks print
//   group    'language' (in dictione) | 'matter' (extra dictionem)
//   modern   OPTIONAL. The name this error goes by in modern handbooks,
//            shown in parentheses after the classical one (owner order
//            2026-09-28). Present only where the modern name is genuinely
//            different: equivocation, amphiboly and the rest are still
//            called what Aristotle called them, and inventing a modern
//            alias for them would be inventing scholarship.
//   what     what the error IS, in one plain sentence
//   note     THE FIELD THAT EARNS THE SHELF: why it works on a listener,
//            and what it feels like from inside the argument. A
//            definition tells you the name. This tells you how to catch
//            it in the room, which is the only place it matters.
//   overlook what the error makes a listener fail to notice, and
//   ask      the question that catches it — both added 2026-09-28 so this
//            shelf reads exactly like All Fallacies next door. The two are
//            the same craft and were being presented two different ways.
//   examples ONE, the strongest, same order and same day. `source` is
//            OPTIONAL and carries a SHORT provenance tag, nothing else.
//
// ON THE EXAMPLES. A fallacy example has to be a BAD argument, and bad
// arguments are mostly anonymous: people do not sign them. So most of
// these are written for this course, and the shelf says so once, at the
// top, instead of stamping every card. `source` appears ONLY where there
// is a real one: Aristotle's own examples, and the two stock cases old
// enough that inventing them here would be a lie.
//
// The source line is a TAG, not a remark. Owner order 2026-09-28: the
// commentary that used to ride along with it ("the canonical example, and
// still the clearest because both answers convict") is gone from every
// entry. It praised the choice of example instead of teaching anything,
// and a reader does not need to be told an example is good. Do not put a
// sentence back in this field.
//
// HOUSE STYLE applies to `what` and `note`. It does NOT apply to the
// examples, which have to be allowed to sound like people talking.
//
// ACCURACY. The names are not stable across sources, and the boundaries
// between several of these are argued about to this day: accident and
// secundum quid overlap, and ignoratio elenchi is broad enough that some
// handbooks treat every other fallacy as a species of it. Where that is
// true the entry says so rather than pretending the taxonomy is settled.
//
// NOT APPROVED. Written by Claude and awaiting a reviewer, like every
// other record in this course.

export const FALLACY_GROUPS = {
  language: {
    label: 'Depending on language',
    lead: 'Six errors that live in the words themselves. The argument looks valid because a word or a construction is doing two jobs at once, and the listener only notices one of them.',
  },
  matter: {
    label: 'Not depending on language',
    lead: 'Seven errors that survive translation. Nothing is wrong with the words; what is wrong is the move being made with them.',
  },
};

export const FALLACIES = [

  // ── Depending on language: the six ───────────────────────────
  { id: 'FA-001', term: 'Equivocation', group: 'language',
    what: 'One word used in two senses inside the same argument, as though it were one sense.',
    note: 'The commonest of the thirteen and the hardest to catch live, because the word is genuinely doing both jobs and nobody has lied. Watch for an argument that turns on a single word appearing in both premises. Ask what that word means in each, out loud, and the join usually comes apart in your hands.',
    overlook: 'That the word changed meaning between one premise and the next. Nobody lied, and the word is genuinely doing both jobs.',
    ask: 'What does that word mean in each place it appears? Say both out loud.',
    examples: [
      { text: 'The sign says “Fine for parking here.” So it is fine to park here.' },
    ] },

  { id: 'FA-002', term: 'Amphiboly', group: 'language',
    what: 'The grammar, rather than a single word, can be read two ways, and the argument uses both.',
    note: 'Equivocation happens in a word; this happens in a sentence. It is the fallacy of headlines and of oracles, and the reason legal drafting is so ugly: the ugliness is the cost of closing the second reading. If a sentence in an argument can be diagrammed two ways, find out which one the speaker needs before you agree to it.',
    overlook: 'That the sentence has a second reading. The listener settles on one and never sees the other.',
    ask: 'Which reading do you need for that to follow?',
    examples: [
      { text: 'The teacher told the student that he was confused.' },
    ] },

  { id: 'FA-003', term: 'Composition', group: 'language',
    what: 'Words that should be taken separately are taken together, and the sentence changes meaning.',
    note: 'THIS IS NOT THE MODERN PART-AND-WHOLE FALLACY, which shares the name and is a different error entirely. Aristotle’s composition is about grouping: the same words, combined one way, say something they do not say combined another way. It is a real ambiguity of reading rather than a mistake about parts and wholes, which is why it sits among the six that depend on language. The modern version is on the families shelf, where it belongs.',
    overlook: 'That the words were grouped one way rather than the other, and that the grouping is the whole claim.',
    ask: 'Taken together, or taken separately?',
    examples: [
      { text: 'Is it possible for a man who is sitting to walk? Taken together, no. Taken apart — a man who is sitting is able to walk — yes.',
        source: 'Aristotle, Sophistical Refutations' },
    ] },

  { id: 'FA-004', term: 'Division', group: 'language',
    what: 'Words that should be taken together are taken apart, and the sentence changes meaning. The mirror of composition.',
    note: 'Again NOT the modern whole-to-parts fallacy that borrowed the name. Aristotle’s division separates what was meant as one unit. The arithmetic form is the clearest: a sum said of a total, then said of each part of it. Watch for a phrase that was doing one job being split into two jobs.',
    overlook: 'That the phrase was one unit before it was split, and stopped being true when it was.',
    ask: 'That was said of the whole. Are you now saying it of each part?',
    examples: [
      { text: 'Five is two and three. So five is two, and five is three.',
        source: 'Aristotle, Sophistical Refutations' },
    ] },

  { id: 'FA-005', term: 'Accent', group: 'language',
    what: 'The meaning is changed by where the stress falls, or by how the words are pointed and read aloud.',
    note: 'Aristotle meant Greek pitch accent, where the written word is genuinely ambiguous until spoken. In English it is the fallacy of emphasis, and it is the one on this shelf that belongs most obviously to an actor: the same line, stressed differently, makes a different claim, and an argument can be smuggled in entirely through delivery. Quotation out of context is its modern form.',
    overlook: 'That the emphasis carried a claim the words never made, which is why the speaker can deny it afterwards.',
    ask: 'What do the words say without the stress?',
    examples: [
      { text: 'I did not say he stole the money. Eight words, eight meanings, one for each word you stress.' },
    ] },

  { id: 'FA-006', term: 'Figure of speech', group: 'language',
    what: 'Two words that share a form are assumed to share a kind of meaning.',
    note: 'The error of arguing from grammar to reality. A verb form or a noun ending gets treated as evidence about the thing itself. It is the least-used name on this list and the error is everywhere, usually as a claim that because two words look alike they must work alike.',
    overlook: 'That grammar made two unlike things look like the same kind of thing.',
    ask: 'Are these the same kind of thing, or only the same shape of word?',
    examples: [
      { text: 'Whatever is capable of being seen is a visible. This is capable of being seen. So this is a visible thing.',
        source: 'Aristotle, Sophistical Refutations' },
    ] },

  // ── Not depending on language: the seven ─────────────────────
  { id: 'FA-007', term: 'Accident', group: 'matter',
    modern: 'sweeping generalisation',
    what: 'A property that a thing happens to have is treated as one it must have, and a rule is applied where it does not reach.',
    note: 'The fallacy of the rule pressed past its purpose. Every general statement has an unstated scope, and this is what happens when the scope is ignored: the rule is true, the case is real, and the two have nothing to do with each other. It overlaps with the next entry, and the handbooks disagree about where one ends.',
    overlook: 'The circumstance that puts this case outside the rule. The rule is real, which is what makes it persuasive.',
    ask: 'What is different about this particular case?',
    examples: [
      { text: 'What you bought yesterday you ate today. You bought raw meat yesterday. So you ate raw meat today.',
        source: 'Aristotle, Sophistical Refutations' },
    ] },

  { id: 'FA-008', term: 'Secundum quid', group: 'matter',
    modern: 'hasty generalisation',
    what: 'A statement true only with a qualification is taken as true without it, or the reverse.',
    note: 'Also called converse accident, and often given as hasty generalisation, which is the same move from the other end. Listen for the qualification going quietly missing between one sentence and the next. The speaker rarely removes it on purpose; it falls off, and the argument gets stronger as it falls.',
    overlook: 'The qualification that fell off between one sentence and the next. It usually falls; it is rarely removed.',
    ask: 'True when, where, and for whom?',
    examples: [
      { text: 'This medicine helps people with the condition. So this medicine helps people.' },
    ] },

  { id: 'FA-009', term: 'Ignoratio elenchi', group: 'matter',
    modern: 'irrelevant conclusion',
    what: 'Something is proved, and it is not the thing that was in dispute.',
    note: 'Irrelevant conclusion, or missing the point. The broadest name on the list: some handbooks treat every other fallacy as a species of it, which is a fair complaint. Its power is that the proof can be genuinely good. The audience watches an argument succeed and does not notice it was aimed elsewhere. The counter is one question, asked flatly: what was the claim?',
    overlook: 'That a real proof succeeded at the wrong target. The audience watches an argument work and scores it.',
    ask: 'What was the claim, and is this a proof of that?',
    examples: [
      { text: 'A lawyer proves at length that the crime was terrible, when the question was whether this defendant committed it.' },
    ] },

  { id: 'FA-010', term: 'Begging the question', group: 'matter',
    modern: 'circular reasoning',
    what: 'The thing to be proved is assumed somewhere in the proof.',
    note: 'Petitio principii. Note what it does NOT mean: in ordinary modern use the phrase has come to mean “raises the question”, and that use is now commoner than the logical one. In an argument it means the circle, and the circle is usually wide enough that nobody sees it close. The test is to write the premises and the conclusion down and look for the conclusion sitting in a premise wearing different words.',
    overlook: 'The circle, when it is wide enough that the beginning and the end look like different sentences.',
    ask: 'Is there support here I could accept without already believing the conclusion?',
    examples: [
      { text: 'This book is true, because it says of itself that it is true, and a true book would not lie.' },
    ] },

  { id: 'FA-011', term: 'False cause', group: 'matter',
    modern: 'post hoc',
    what: 'Something is treated as the cause of a thing when it is not, often because it merely came first.',
    note: 'Non causa pro causa, and its famous subspecies, post hoc ergo propter hoc: after this, therefore because of this. Human beings are built to find causes and will supply one whether or not there is one to find. Two questions dissolve most instances: what else changed at the same time, and what would we expect to see if this were NOT the cause?',
    overlook: 'Everything else that changed at the same time. We are built to find causes whether or not there is one.',
    ask: 'What else happened, and what would we see if this were not the cause?',
    examples: [
      { text: 'The cock crows before dawn, so the cock causes the dawn.',
        source: 'Traditional' },
    ] },

  { id: 'FA-012', term: 'Consequent', group: 'matter',
    modern: 'affirming the consequent',
    what: 'From “if this, then that” and “that”, it is concluded that “this”.',
    note: 'Aristotle calls it simply the fallacy of the consequent; the modern handbooks call it affirming the consequent, which is the name most readers will know. The one formal fallacy on the list, and the one that feels most like reasoning while being none. It is how conspiracy theories are built and how bad diagnoses are made: the theory predicts the evidence, the evidence appears, and the theory is declared proved. But other causes predict the same evidence. Always ask what else would produce exactly this.',
    overlook: 'The other causes that produce exactly the same result. The theory predicted the evidence, and so would several others.',
    ask: 'What else would produce exactly this?',
    examples: [
      { text: 'If it rained, the ground is wet. The ground is wet. So it rained.' },
    ] },

  { id: 'FA-013', term: 'Many questions', group: 'matter',
    modern: 'loaded question',
    what: 'Two questions are asked as one, so that any single answer concedes the first.',
    note: 'Plurium interrogationum, and the loaded question. It is not really a fallacy of arguing but of trapping: the damage is done by answering at all. The only sound response is to refuse the frame and separate the questions out loud, which always sounds evasive, which is why the trap works. For an actor it is one of the most playable moves on this shelf, because the victim can see it and still cannot get out.',
    overlook: 'The premise you concede by answering at all. Both answers convict, which is the design.',
    ask: 'What am I agreeing to by answering this?',
    examples: [
      { text: 'Have you stopped beating your wife?',
        source: 'Traditional' },
    ] },

];

export const fallacyById = id => FALLACIES.find(f => f.id === id) ?? null;
export const fallaciesIn = group => FALLACIES.filter(f => f.group === group);
