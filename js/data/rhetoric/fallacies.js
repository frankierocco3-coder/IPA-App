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
//   what     what the error IS, in one plain sentence
//   note     THE FIELD THAT EARNS THE SHELF: why it works on a listener,
//            and what it feels like from inside the argument. A
//            definition tells you the name. This tells you how to catch
//            it in the room, which is the only place it matters.
//   examples three each: a minimal constructed case, and real ones where
//            a real one exists. Every entry says which is which.
//
// ON THE EXAMPLES. A fallacy example has to be a BAD argument, and bad
// arguments are mostly anonymous: people do not sign them. So most of
// these are constructed, and each says so in its source line rather than
// borrowing false authority. Where Aristotle gives his own example it is
// cited to him, and where a famous instance exists it is named.
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
    examples: [
      { text: 'Nothing is better than lifelong happiness. A cheese sandwich is better than nothing. So a cheese sandwich is better than lifelong happiness.', source: 'Constructed. The textbook shape, because the two senses of “nothing” are impossible to miss once separated.' },
      { text: 'The end of a thing is its perfection. Death is the end of life. Therefore death is the perfection of life.', source: 'Constructed on Aristotle’s pattern; “end” as purpose against “end” as finish.' },
      { text: 'A feather is light. What is light cannot be dark. So a feather cannot be dark.', source: 'Traditional schoolroom example, in circulation since the medieval logic texts.' },
    ] },

  { id: 'FA-002', term: 'Amphiboly', group: 'language',
    what: 'The grammar, rather than a single word, can be read two ways, and the argument uses both.',
    note: 'Equivocation happens in a word; this happens in a sentence. It is the fallacy of headlines and of oracles, and the reason legal drafting is so ugly: the ugliness is the cost of closing the second reading. If a sentence in an argument can be diagrammed two ways, find out which one the speaker needs before you agree to it.',
    examples: [
      { text: 'The oracle told Croesus that if he crossed the river he would destroy a great empire. He crossed, and destroyed his own.', source: 'Herodotus, Histories I — the most famous amphiboly in antiquity.' },
      { text: 'The teacher told the student that he was confused.', source: 'Constructed. Nothing in it is an ambiguous word; the pronoun is, and the whole meaning turns on it.' },
      { text: 'Visiting relatives can be tiresome.', source: 'Constructed. Two readings, opposite complaints, and no word in it is ambiguous on its own.' },
    ] },

  { id: 'FA-003', term: 'Composition', group: 'language',
    what: 'Words that should be taken separately are taken together, and the sentence changes meaning.',
    note: 'THIS IS NOT THE MODERN PART-AND-WHOLE FALLACY, which shares the name and is a different error entirely. Aristotle’s composition is about grouping: the same words, combined one way, say something they do not say combined another way. It is a real ambiguity of reading rather than a mistake about parts and wholes, which is why it sits among the six that depend on language. The modern version is on the families shelf, where it belongs.',
    examples: [
      { text: 'Is it possible for a man who is sitting to walk? Taken together, no. Taken apart — a man who is sitting is able to walk — yes.', source: 'Aristotle, Sophistical Refutations — his own example of the figure.' },
      { text: 'I can carry five stones and I can carry ten stones, so I can carry five and ten stones.', source: 'Constructed on the classical pattern; each separately, not both together.' },
      { text: 'He learned to fight while blind drunk. Combined, a boast; separated, two different claims.', source: 'Constructed. The words never change and the grouping does all the work.' },
    ] },

  { id: 'FA-004', term: 'Division', group: 'language',
    what: 'Words that should be taken together are taken apart, and the sentence changes meaning. The mirror of composition.',
    note: 'Again NOT the modern whole-to-parts fallacy that borrowed the name. Aristotle’s division separates what was meant as one unit. The arithmetic form is the clearest: a sum said of a total, then said of each part of it. Watch for a phrase that was doing one job being split into two jobs.',
    examples: [
      { text: 'Five is two and three. So five is two, and five is three.', source: 'Aristotle, Sophistical Refutations — the classical example, and the reason the figure is easy to state and hard to spot.' },
      { text: 'Two and three are even and odd. So two and three are even, and two and three are odd.', source: 'Constructed on the classical pattern.' },
      { text: 'The men carried the boat. Together they did; separately, not one of them could.', source: 'Constructed. Splitting the subject splits the claim.' },
    ] },

  { id: 'FA-005', term: 'Accent', group: 'language',
    what: 'The meaning is changed by where the stress falls, or by how the words are pointed and read aloud.',
    note: 'Aristotle meant Greek pitch accent, where the written word is genuinely ambiguous until spoken. In English it is the fallacy of emphasis, and it is the one on this shelf that belongs most obviously to an actor: the same line, stressed differently, makes a different claim, and an argument can be smuggled in entirely through delivery. Quotation out of context is its modern form.',
    examples: [
      { text: 'I did not say he stole the money. Seven words, seven meanings, one for each word you stress.', source: 'Constructed; the standard demonstration, and the cleanest proof that emphasis is a claim.' },
      { text: 'We should not speak ILL of our friends.', source: 'Constructed. The stress grants permission to speak ill of everybody else, and the sentence never says so.' },
      { text: 'A review reading “a triumph, if you ignore the second act” quoted on the poster as “a triumph”.', source: 'Constructed from common practice; the fallacy of accent by excision.' },
    ] },

  { id: 'FA-006', term: 'Figure of speech', group: 'language',
    what: 'Two words that share a form are assumed to share a kind of meaning.',
    note: 'The error of arguing from grammar to reality. A verb form or a noun ending gets treated as evidence about the thing itself. It is the least-used name on this list and the error is everywhere, usually as a claim that because two words look alike they must work alike.',
    examples: [
      { text: 'Flammable and inflammable look like opposites, so they must mean opposite things.', source: 'Constructed; they mean the same, and the form is the whole reason anybody thinks otherwise.' },
      { text: 'He is a hard worker, so he works hard on everything he touches.', source: 'Constructed. The adjective describes a habit, not a guarantee.' },
      { text: 'Whatever is capable of being seen is a visible. This is capable of being seen. So this is a visible thing.', source: 'Aristotle, Sophistical Refutations — the form of the word standing in for the argument.' },
    ] },

  // ── Not depending on language: the seven ─────────────────────
  { id: 'FA-007', term: 'Accident', group: 'matter',
    what: 'A property that a thing happens to have is treated as one it must have, and a rule is applied where it does not reach.',
    note: 'The fallacy of the rule pressed past its purpose. Every general statement has an unstated scope, and this is what happens when the scope is ignored: the rule is true, the case is real, and the two have nothing to do with each other. It overlaps with the next entry, and the handbooks disagree about where one ends.',
    examples: [
      { text: 'What you bought yesterday you ate today. You bought raw meat yesterday. So you ate raw meat today.', source: 'Aristotle, Sophistical Refutations — his own example, and still the clearest.' },
      { text: 'Cutting people with knives is a crime. Surgeons cut people with knives. So surgeons are criminals.', source: 'Traditional; the rule is real and the scope is doing all the work.' },
      { text: 'Lying is wrong, so you must tell the murderer at the door where your friend is hiding.', source: 'Constructed from the standing philosophical case, which exists because the fallacy is not always easy to answer.' },
    ] },

  { id: 'FA-008', term: 'Secundum quid', group: 'matter',
    what: 'A statement true only with a qualification is taken as true without it, or the reverse.',
    note: 'Also called converse accident, and often given as hasty generalisation, which is the same move from the other end. Listen for the qualification going quietly missing between one sentence and the next. The speaker rarely removes it on purpose; it falls off, and the argument gets stronger as it falls.',
    examples: [
      { text: 'This medicine helps people with the condition. So this medicine helps people.', source: 'Constructed. One dropped qualification and the claim has changed entirely.' },
      { text: 'I met two rude people from that city, so the people there are rude.', source: 'Constructed; the same error running the other way, from a sample to everybody.' },
      { text: 'Indian food is spicy.', source: 'Constructed from ordinary speech. True of some dishes, false as stated, and almost nobody hears the missing word.' },
    ] },

  { id: 'FA-009', term: 'Ignoratio elenchi', group: 'matter',
    what: 'Something is proved, and it is not the thing that was in dispute.',
    note: 'Irrelevant conclusion, or missing the point. The broadest name on the list: some handbooks treat every other fallacy as a species of it, which is a fair complaint. Its power is that the proof can be genuinely good. The audience watches an argument succeed and does not notice it was aimed elsewhere. The counter is one question, asked flatly: what was the claim?',
    examples: [
      { text: 'A lawyer proves at length that the crime was terrible, when the question before the court was whether this defendant committed it.', source: 'Constructed; the courtroom form, and the reason judges interrupt.' },
      { text: 'We should not fund the programme. — So you think the problem does not matter?', source: 'Constructed. The reply refutes a claim nobody made, which is why this shape also gets called the straw man.' },
      { text: 'This policy is popular, therefore it is right.', source: 'Constructed. Popularity is proved and rightness was the question.' },
    ] },

  { id: 'FA-010', term: 'Begging the question', group: 'matter',
    what: 'The thing to be proved is assumed somewhere in the proof.',
    note: 'Petitio principii. Note what it does NOT mean: in ordinary modern use the phrase has come to mean “raises the question”, and that use is now commoner than the logical one. In an argument it means the circle, and the circle is usually wide enough that nobody sees it close. The test is to write the premises and the conclusion down and look for the conclusion sitting in a premise wearing different words.',
    examples: [
      { text: 'This book is true, because it says of itself that it is true, and a true book would not lie.', source: 'Constructed; a tight circle, shown small so the shape is visible.' },
      { text: 'Free speech benefits a society, because it is good for a community when people can speak freely.', source: 'Constructed. The premise restates the conclusion and adds nothing.' },
      { text: 'He is untrustworthy, and I know because he denies it, which is exactly what an untrustworthy person would do.', source: 'Constructed. A circle built so that evidence against it counts for it.' },
    ] },

  { id: 'FA-011', term: 'False cause', group: 'matter',
    what: 'Something is treated as the cause of a thing when it is not, often because it merely came first.',
    note: 'Non causa pro causa, and its famous subspecies, post hoc ergo propter hoc: after this, therefore because of this. Human beings are built to find causes and will supply one whether or not there is one to find. Two questions dissolve most instances: what else changed at the same time, and what would we expect to see if this were NOT the cause?',
    examples: [
      { text: 'The team lost every match I attended. I should stop attending.', source: 'Constructed; harmless, and exactly the shape of the harmful ones.' },
      { text: 'Crime fell after the policy passed, so the policy reduced crime.', source: 'Constructed. Crime was already falling, which the argument never mentions because it never looked.' },
      { text: 'The cock crows before dawn, so the cock causes the dawn.', source: 'Traditional; the oldest illustration of post hoc, and it survives because nobody can pretend to believe it.' },
    ] },

  { id: 'FA-012', term: 'Affirming the consequent', group: 'matter',
    what: 'From “if this, then that” and “that”, it is concluded that “this”.',
    note: 'The one formal fallacy on the list, and the one that feels most like reasoning while being none. It is how conspiracy theories are built and how bad diagnoses are made: the theory predicts the evidence, the evidence appears, and the theory is declared proved. But other causes predict the same evidence. Always ask what else would produce exactly this.',
    examples: [
      { text: 'If it rained, the ground is wet. The ground is wet. So it rained.', source: 'Constructed; the minimal form. A burst pipe produces the same wet ground.' },
      { text: 'If he were guilty he would look nervous. He looks nervous. So he is guilty.', source: 'Constructed, and the reason demeanour is such poor evidence in a courtroom.' },
      { text: 'A true prophet would predict a disaster. A disaster was predicted. So the prophet is true.', source: 'Constructed. The prediction was also made by everyone who predicts disasters continually.' },
    ] },

  { id: 'FA-013', term: 'Many questions', group: 'matter',
    what: 'Two questions are asked as one, so that any single answer concedes the first.',
    note: 'Plurium interrogationum, and the loaded question. It is not really a fallacy of arguing but of trapping: the damage is done by answering at all. The only sound response is to refuse the frame and separate the questions out loud, which always sounds evasive, which is why the trap works. For an actor it is one of the most playable moves on this shelf, because the victim can see it and still cannot get out.',
    examples: [
      { text: 'Have you stopped beating your wife?', source: 'Traditional; the canonical example, and still the clearest because both answers convict.' },
      { text: 'Why are you so defensive about this?', source: 'Constructed from ordinary speech. The question assumes the defensiveness, and denying it performs it.' },
      { text: 'Will you admit your first mistake, or shall we go through the others?', source: 'Constructed. Two questions welded together, and no answer that does not concede.' },
    ] },

];

export const fallacyById = id => FALLACIES.find(f => f.id === id) ?? null;
export const fallaciesIn = group => FALLACIES.filter(f => f.group === group);
