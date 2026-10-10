// The thirty-eight stratagems — Schopenhauer, and only him.
//
// Owner decision 2026-10-09. A fourth reference shelf in the Rhetoric
// Library, beside the figures and the two fallacy shelves.
//
// WHY IT IS A SEPARATE SHELF AND NOT MORE FALLACIES. The three shelves
// already there are taxonomies of BAD REASONING. A fallacy is something a
// person falls into; most of them are honest mistakes and several are
// invisible to whoever is making them. These are not errors. They are
// tactics, chosen on purpose by somebody who knows their case is weak and
// intends to win anyway. That is a different object and it needs a
// different shelf, or the word "fallacy" has to stretch until it means
// nothing.
//
// It is also the reference that module 6 was missing. "Honest Persuasion"
// asks where the line falls between persuading somebody and working on
// them. This is the catalogue of working on them.
//
// THE LIST IS CLOSED, and that is the reason to use it — the same reason
// the thirteen are Aristotle's and nobody else's. An earlier draft of this
// shelf proposed keeping about fifteen of the thirty-eight, the ones that
// seemed most useful. That was wrong: a selection is somebody's taste
// wearing a historical name, and the moment it is a selection the reader
// cannot tell what was left out or why. Thirty-eight is what he wrote.
//
// NO GROUPING. The other three shelves group, and this one does not,
// because Schopenhauer does not. He gives a flat numbered sequence and the
// numbering is how the work is cited. Inventing eight families for him
// would be inventing scholarship. The search carries findability instead.
//
// SOURCE. Arthur Schopenhauer, The Art of Controversy, translated by
// T. Bailey Saunders. Project Gutenberg #10731, which records it as public
// domain in the United States. Same footing as the Jowett, and the same
// scoping rule applies: NEVER claim it is public domain worldwide.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'ST-<3 digits>'. STABLE FOREVER — never renumber, never
//            reuse. Retire an id rather than reassign it.
//   n        his numeral, as the work is cited. Display only.
//   term     the name. WHERE HE NAMES IT, IT IS HIS NAME — the Extension,
//            the Homonymy, and the Latin tags he gives. He names fewer
//            than a third of them; the rest carry a plain handle written
//            for this app, which is why `term` is not presented anywhere
//            as his wording.
//   latin    OPTIONAL. His Latin tag, only where he actually gives one.
//   what     what the tactic IS, in one plain sentence.
//   overlook what it makes the person on the receiving end fail to notice.
//   ask      the question that catches it.
//   examples ONE. `source` is OPTIONAL and is a TAG, never a remark.
//   alsoFallacy OPTIONAL. The FA- or MF- id of the same move on another
//            shelf. Fourteen of these restate something the fallacy shelves
//            already define, and the pointer is how the app says so
//            without defining anything twice — the mechanism `alsoAristotle`
//            already uses between the other two shelves. The overlap is
//            not an embarrassment: it is the lesson. The moves did not
//            change in two thousand years, only the names did.
//
// THERE IS NO FOURTH FIELD, and there must not be. Schopenhauer gives a
// counter-move for several of these and it is tempting to carry them. The
// owner removed `repair` from the modern shelf on 2026-09-28 because three
// fields per card was one more than the page could hold. Where his
// defence is the most useful thing in an entry it has gone into `ask`,
// which is the field a reader actually uses in a room.
//
// HOUSE STYLE applies to `what`, `overlook` and `ask`. It does NOT apply
// to the examples, which have to be allowed to sound like people talking.
//
// ON THE EXAMPLES, AND WHY SEVERAL OF HIS ARE NOT HERE. Where his own
// example is clean and better than anything written for this app, it is
// his, tagged. Where it is not, it has been replaced, and the reasons are
// worth recording because somebody will otherwise put them back:
//   * III is Aristotle's Moor, which makes its point about skin and teeth.
//   * XII and XXXII run on religious and political labels of the 1830s.
//   * XVI leads with "why don't you hang yourself?"
//   * XIII assumes a child owes a father obedience in all things.
//   * XXXVI quotes Faust in German.
//   * XXX turns on a Latin pun that needs a paragraph to land.
// Every one of those entries carries a written example instead. Nothing
// was cut for being unflattering to Schopenhauer; only for being unusable.
//
// A TRANSCRIPTION NOTE. The Gutenberg e-text heads stratagem 11 "XL.",
// which is forty. It is a slip in the e-text, not in Schopenhauer. This
// file numbers it XI.
//
// XXV AND XXXIV ARE NOT DIRTY. He lists the single counter-instance and
// pressing an evasion among the tricks, and both are simply good practice
// — the first is how a universal claim is properly tested, the second is
// paying attention. Their `what` says so. Do not rewrite them into
// something shabbier for the sake of a tidy shelf.
//
// NOT APPROVED. Written by Claude and awaiting a rhetoric reviewer, like
// every other record in this course. Claude never approves its own work.

export const STRATAGEM_SOURCE = 'Arthur Schopenhauer, The Art of Controversy, '
  + 'translated by T. Bailey Saunders';

export const STRATAGEMS = [

  { id: 'ST-001', n: 'I', term: 'The Extension', alsoFallacy: 'MF-001',
    what: 'Your claim is restated more widely than you made it, and the wider version is the one attacked.',
    overlook: 'That the wider version was never yours. The refutation is real, and it lands on something you did not say.',
    ask: 'Is that what I claimed, or a larger claim you have put in my mouth?',
    examples: [
      { text: 'I asserted that the English were supreme in drama. My opponent replied that it was a well-known fact that in music, and consequently in opera, they could do nothing at all.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-002', n: 'II', term: 'The Homonymy', alsoFallacy: 'FA-001',
    what: 'A word in your claim is carried across to a second thing that shares nothing with the first except the word, and that second thing is refuted instead.',
    overlook: 'That the word changed what it was pointing at. The refutation is sound about the second thing and says nothing at all about the first.',
    ask: 'Which of the two things that word covers am I being answered on?',
    examples: [
      { text: 'Every light can be extinguished. The intellect is a light. Therefore it can be extinguished.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-003', n: 'III', term: 'The relative made absolute', alsoFallacy: 'FA-008',
    what: 'Something you said about a particular case is answered as though you had said it without any limit at all.',
    overlook: 'The limit you put on it, which fell away quietly between your sentence and the reply.',
    ask: 'Did I say that generally, or about one case?',
    examples: [
      { text: 'I praised their discipline, not their arguments. You are answering me as though I had endorsed every word they ever wrote.' },
    ] },

  { id: 'ST-004', n: 'IV', term: 'Hiding the conclusion',
    what: 'The premises are put to you one at a time, out of order and mixed into other talk, so that you never see what they add up to until all of them are granted.',
    overlook: 'Where the questions are going. Each one is harmless by itself, which is exactly why you grant it.',
    ask: 'If I grant that, what does it let you claim later?',
    examples: [
      { text: 'Would you agree that people deserve second chances? And that this was a long time ago? And that there has been no trouble since? Then you accept he should be reinstated.' },
    ] },

  { id: 'ST-005', n: 'V', term: 'Premises he does not hold', latin: 'ex concessis',
    what: 'The argument is built on premises you accept, by somebody who does not accept them, because a true conclusion can follow from false premises.',
    overlook: 'That the argument is aimed at what you believe rather than at what is so. It was never meant to survive outside your own assumptions.',
    ask: 'Do you hold these premises yourself, or only expect me to?',
    examples: [
      { text: 'Your own handbook says that any delay counts as a failure. By your handbook, then, this project failed.' },
    ] },

  { id: 'ST-006', n: 'VI', term: 'Question-begging in disguise', alsoFallacy: 'FA-010',
    what: 'The thing to be proved is obtained in advance, renamed or widened so that granting it does not feel like granting the point.',
    overlook: 'That you conceded the conclusion when you accepted the larger case it was sitting inside.',
    ask: 'If I accept that, is there anything left to argue about?',
    examples: [
      { text: 'Can we agree that no human knowledge is ever certain? Good. Then medicine is not certain either.' },
    ] },

  { id: 'ST-007', n: 'VII', term: 'Questioning him to it',
    what: 'Instead of stating the case, a great many wide questions are asked at speed, and the conclusion is drawn from the answers before anybody has followed the steps.',
    overlook: 'The gap between what you answered and what is now said to follow from it. Volume and pace cover the distance.',
    ask: 'Which of my answers is that built on? Take it one at a time.',
    examples: [
      { text: 'You said the budget was tight, you said the deadline moved, you said nobody was happy about it, so by your own account the whole thing was doomed from the start. Your words, not mine.' },
    ] },

  { id: 'ST-008', n: 'VIII', term: 'Making him angry',
    what: 'You are provoked on purpose, because an angry person argues worse and sees their own advantage less clearly.',
    overlook: 'That the provocation is the tactic rather than a by-product of it. You start defending your temper instead of your case.',
    ask: 'Is the thing making me angry any part of the argument?',
    examples: [
      { text: 'I would go through it again, but you did not follow it the first time, so I am not sure there is much point.' },
    ] },

  { id: 'ST-009', n: 'IX', term: 'Scrambling the order',
    what: 'The questions are put in an order that has nothing to do with the conclusion they build, so that the direction cannot be read off them.',
    overlook: 'The shape of the argument, which the proper order would have shown you at once.',
    ask: 'Put those questions in the order your conclusion needs. Do they still work?',
    examples: [
      { text: 'Four questions about staffing, one about the weather, two about last year, and then the conclusion, which needed only the second and the last.' },
    ] },

  { id: 'ST-010', n: 'X', term: 'Asking the converse',
    what: 'Somebody who is disagreeing out of habit is asked for the opposite of what the asker actually wants granted.',
    overlook: 'That your contrariness has been turned into the mechanism. You are still refusing, and you are refusing to order.',
    ask: 'Would I answer this the same way if somebody I agreed with had asked it?',
    examples: [
      { text: 'You will say no to anything I propose, so: I take it you would not want the review brought forward?' },
    ] },

  { id: 'ST-011', n: 'XI', term: 'Smuggling the generalisation',
    what: 'The particular cases are granted one by one, and the general rule they are said to support is introduced later as though it had already been agreed.',
    overlook: 'That you never granted the rule. You granted the instances, and the rule arrived afterwards wearing their authority.',
    ask: 'Did I agree to the rule, or only to the examples?',
    examples: [
      { text: 'You accepted the first case, and the second, and the third. So, as we have established, this is simply how the department behaves.' },
    ] },

  { id: 'ST-012', n: 'XII', term: 'Choosing the metaphor first',
    what: 'The thing under discussion has no settled name, so it is named early in whichever terms favour one side, and after that the name does the arguing.',
    overlook: 'That the name was itself a claim. Once a word is in the room the argument is being had on its terms.',
    ask: 'What would somebody with no stake in this call it?',
    examples: [
      { text: 'What one man calls placing in safe custody, another calls throwing into prison.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-013', n: 'XIII', term: 'The glaring alternative', alsoFallacy: 'MF-017',
    what: 'You are offered a choice between the proposition and a deliberately extreme opposite, so that the proposition looks moderate by comparison.',
    overlook: 'The positions that were not offered. Two is almost never the number of things a person can think.',
    ask: 'Are those the only two? What sits between them?',
    examples: [
      { text: 'So which is it: do we check every single claim that comes through the door, or do we just believe whatever anybody tells us?' },
    ] },

  { id: 'ST-014', n: 'XIV', term: 'Declaring it proved', alsoFallacy: 'FA-011',
    what: 'The conclusion is announced in a tone of triumph although nothing granted supports it, on the chance that confidence will pass for proof.',
    overlook: 'That no step was ever taken. Certainty is standing where the inference should be.',
    ask: 'Which of the things I granted gets you there?',
    examples: [
      { text: 'Well, there we are. I think we can take it as settled.' },
    ] },

  { id: 'ST-015', n: 'XV', term: 'The decoy proposition',
    what: 'A true but not obviously true statement is offered as though the proof depended on it, so that rejecting it looks foolish and accepting it can be claimed as the proof.',
    overlook: 'That both answers were arranged in advance to serve. There was no third thing available to say.',
    ask: 'What happens to your argument if I neither accept that nor reject it?',
    examples: [
      { text: 'Surely you would at least concede that people sometimes act against their own interests? No? Then there is no talking to you. Yes? Then my point is made.' },
    ] },

  { id: 'ST-016', n: 'XVI', term: 'Arguing from his own admissions', latin: 'ex concessis', alsoFallacy: 'MF-012',
    what: 'Your claim is set against something else you have said, done, or are taken to believe, and the inconsistency is offered as a refutation.',
    overlook: 'That an inconsistency in you is not an error in the claim. You can be a hypocrite and still be right.',
    ask: 'Suppose I am inconsistent. Is the claim true or false?',
    examples: [
      { text: 'He maintains that Berlin is an unpleasant place to live in. Why does he not leave by the first train?',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-017', n: 'XVII', term: 'The improvised distinction',
    what: 'Pressed by a counter-proof, the speaker produces a distinction that had not occurred to them until that moment and that their original claim did not contain.',
    overlook: 'That the distinction is new. It is delivered as though it had been meant all along.',
    ask: 'Was that distinction anywhere in what you said before I answered it?',
    examples: [
      { text: 'Ah, but I was talking about the policy as written, not the policy as applied. Those are quite different things.' },
    ] },

  { id: 'ST-018', n: 'XVIII', term: 'Breaking it off', alsoFallacy: 'MF-005',
    what: 'Seeing where your argument is going to end, the other person interrupts it, abandons it, or leads the talk somewhere else before it arrives.',
    overlook: 'That the subject changed at the precise moment it was about to be settled.',
    ask: 'We were on something else a moment ago. May we finish it?',
    examples: [
      { text: 'Yes, yes, but this is all rather in the weeds. Can we step back and talk about what we are really trying to achieve here?' },
    ] },

  { id: 'ST-019', n: 'XIX', term: 'Going general',
    what: 'Challenged on a particular point with nothing to say about it, the speaker argues against the whole category the point belongs to.',
    overlook: 'That the particular point was never answered. Something large was said in the place where something relevant was due.',
    ask: 'I asked about this one. What is wrong with this one?',
    examples: [
      { text: 'You want to know why this study will not do? Because studies in general are far less reliable than people imagine.' },
    ] },

  { id: 'ST-020', n: 'XX', term: 'Drawing it yourself', alsoFallacy: 'FA-011',
    what: 'Once the premises are granted the conclusion is stated without ever being asked for, and any premise still missing is supplied as though it had been granted too.',
    overlook: 'The step you never agreed to, which arrives inside a sentence that sounds like a summary of what you did agree to.',
    ask: 'Which of those did I actually grant?',
    examples: [
      { text: 'So we are agreed: the costs are rising, the team is stretched, and the project should therefore be cancelled.' },
    ] },

  { id: 'ST-021', n: 'XXI', term: 'Answering sophistry with sophistry',
    what: 'A bad argument is met with an equally bad one rather than exposed, because the aim is the victory and not the truth.',
    overlook: 'That neither argument was any good. The exchange looks like a contest and settles nothing whatever.',
    ask: 'Is either of these an argument I would accept from somebody on my own side?',
    examples: [
      { text: 'You only think that because of where you work. Well, you only think that because of where you went to school.' },
    ] },

  { id: 'ST-022', n: 'XXII', term: 'Crying question-begging', latin: 'petitio principii',
    what: 'A fair admission is refused on the ground that granting it would concede the whole point, when it would do no such thing.',
    overlook: 'That a premise close to the conclusion is not the conclusion. The refusal has the sound of rigour.',
    ask: 'Does granting that settle the matter, or only make it likely?',
    examples: [
      { text: 'I am not going to agree that the two cases are similar. That is the very thing you are trying to prove.' },
    ] },

  { id: 'ST-023', n: 'XXIII', term: 'Goading him into exaggerating',
    what: 'Being contradicted pushes people into overstating. The overstated version is then refuted, and the original is treated as having fallen with it.',
    overlook: 'That you widened your own claim under pressure, and were beaten on the wider one you never meant.',
    ask: 'Am I still defending what I said, or what I was pushed into saying?',
    examples: [
      { text: 'I said the policy has failed in three districts. By the fourth round of being told I was wrong I was saying it had failed everywhere, which is not true, and that is the version he refuted.' },
    ] },

  { id: 'ST-024', n: 'XXIV', term: 'The false syllogism', alsoFallacy: 'MF-001',
    what: 'Consequences are forced out of your claim that it does not contain and you did not mean, usually absurd ones, and their absurdity is charged to you.',
    overlook: 'That the inference belongs to them. The absurdity is in their reasoning, not in your position.',
    ask: 'Show me how that follows from what I said.',
    examples: [
      { text: 'You say the rule should have exceptions. Then you think rules mean nothing at all, and everybody should do as they please.' },
    ] },

  { id: 'ST-025', n: 'XXV', term: 'The single instance', latin: 'instantia',
    what: 'One counterexample is produced against a general claim, which is enough to overthrow it, and which is honest work when the example is true, really falls under the claim, and really contradicts it.',
    overlook: 'Whether all three of those hold. A case that is untrue, or outside what you meant, or not actually inconsistent, looks identical to one that lands.',
    ask: 'Is that case real, is it the kind of case I meant, and does it genuinely contradict me?',
    examples: [
      { text: 'All ruminants are horned — a proposition which may be upset by the single instance of the camel.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-026', n: 'XXVI', term: 'Turning the tables', latin: 'retorsio argumenti',
    what: 'Your own argument is taken up and pointed back at you, so that the grounds you offered become grounds for the opposite conclusion.',
    overlook: 'Whether the reversal actually holds. It lands on the ear a good while before anybody examines it.',
    ask: 'Does my reason really support that, or does it only sound as though it might?',
    examples: [
      { text: 'So-and-so is a child, you must make allowance for him. Just because he is a child, I must correct him; otherwise he will persist in his bad habits.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-027', n: 'XXVII', term: 'Pressing where he flinched',
    what: 'Anger at one particular argument is read as a sign that it has found the weak place, and it is pushed harder for exactly that reason.',
    overlook: 'That your reaction has become evidence. The temper you lost is now part of their case against you.',
    ask: 'Am I angry because this is unfair, or because it is close?',
    examples: [
      { text: 'Interesting that this is the one you raise your voice about. Let us stay on it a while longer.' },
    ] },

  { id: 'ST-028', n: 'XXVIII', term: 'Playing to the room', latin: 'ad auditores',
    what: 'In front of an audience that cannot judge, an objection is raised that only a specialist could see is empty, and the specialist cannot answer it briefly.',
    overlook: 'That a real answer would take longer than the room will sit still for. The silence gets scored as a defeat.',
    ask: 'Could that objection be answered in one sentence? If not, has it been answered at all?',
    examples: [
      { text: 'He says the rock was molten at some four hundred and eighty degrees, and covered by the sea. At that heat the sea would have boiled away long before. The room laughs, and the explanation about pressure would take a lecture.',
        source: 'after Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-029', n: 'XXIX', term: 'The diversion', latin: 'mutatio controversiae', alsoFallacy: 'MF-005',
    what: 'Losing, the other person begins suddenly on something else, as though it bore on the question in dispute.',
    overlook: 'That the subject moved. The new topic arrives carrying all the energy of the old one and none of its relevance.',
    ask: 'Is this the thing we were deciding?',
    examples: [
      { text: 'We were discussing whether the figures add up. We are now discussing the tone of an email somebody sent in March.' },
    ] },

  { id: 'ST-030', n: 'XXX', term: 'The appeal to authority', latin: 'argumentum ad verecundiam', alsoFallacy: 'MF-031',
    what: 'An authority is produced in place of a reason, chosen to fit what this particular listener will be impressed by rather than what the question needs.',
    overlook: 'Whether the authority is an authority on this, and whether they gave reasons that could be examined by anybody.',
    ask: 'Qualified on this question, quoted accurately, and giving reasons I could check?',
    examples: [
      { text: 'The head of the institute has no doubt about it whatsoever. Are you really setting yourself up against the head of the institute?' },
    ] },

  { id: 'ST-031', n: 'XXXI', term: 'Pleading incompetence',
    what: 'Having no answer, a person declares the point to be beyond them, in a manner arranged so the room hears that it is nonsense.',
    overlook: 'That no objection was made at all. A refusal to engage has been dressed up as modesty.',
    ask: 'Is that a criticism I can answer, or only a shrug?',
    examples: [
      { text: 'What you now say passes my poor powers of comprehension; it may be all very true, but I cannot understand it, and I refrain from any expression of opinion on it.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-032', n: 'XXXII', term: 'The odious category', alsoFallacy: 'MF-013',
    what: 'A claim is filed under a discredited label, and the label is left to do the work an argument would have had to do.',
    overlook: 'That two things were assumed at once and neither was shown: that the claim belongs in that category, and that the category is finished.',
    ask: 'Does it really belong there, and even if it does, what follows?',
    examples: [
      { text: 'That is just managerialism. We went through all that in the nineties.' },
    ] },

  { id: 'ST-033', n: 'XXXIII', term: 'Fine in theory, not in practice',
    what: 'The premises are granted and the conclusion denied, on the ground that reasoning does not survive contact with the world.',
    overlook: 'That this is not an objection. If it fails in practice then something is wrong in the theory, and naming that thing is the work being avoided.',
    ask: 'Which part of it is wrong, then?',
    examples: [
      { text: 'That is all very well in theory, but it will not do in practice.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-034', n: 'XXXIV', term: 'Pressing the evasion',
    what: 'A question answered with another question, or with something beside the point, marks the place the other person does not want examined, and the questioner returns to exactly that place. This one is simply paying attention.',
    overlook: 'Nothing, from your side. What it exposes is that the evasion was information, and that the evader often does not know what they have given away.',
    ask: 'That was not an answer. May I have the answer?',
    examples: [
      { text: 'I asked who signed it off. You have told me the process was followed. Who signed it off?' },
    ] },

  { id: 'ST-035', n: 'XXXV', term: 'Working on his will', latin: 'argumentum ab utili',
    what: 'Rather than argue at all, you are shown that holding the position will cost you something, and your own interest does the rest.',
    overlook: 'That your mind changed for a reason with no bearing whatever on whether the thing is true.',
    ask: 'Would I still believe this if it cost me nothing?',
    examples: [
      { text: 'He is all for agricultural machinery, since one engine does the work of many men. Mention that carriages will shortly be worked by steam, and that his stud will be worth a fraction of what it is, and see what he says.',
        source: 'after Schopenhauer, The Art of Controversy' },
    ] },

  { id: 'ST-036', n: 'XXXVI', term: 'Bombast',
    what: 'Grand and obscure language is used in the place where an argument should be, on the reasonable assumption that a person who hears words will suppose there is a thought behind them.',
    overlook: 'That nothing was said. Not understanding it feels like your failure rather than theirs, so you let it pass.',
    ask: 'Can you put that in ordinary words?',
    examples: [
      { text: 'The proposal is insufficiently isomorphic with the underlying strategic paradigm to warrant implementation at this juncture.' },
    ] },

  { id: 'ST-037', n: 'XXXVII', term: 'Refuting the bad proof',
    what: 'The other person is right but has argued it badly. The bad argument is demolished, and the position is claimed to have fallen with it.',
    overlook: 'That the claim itself was never touched. A bad proof of a true thing leaves the thing true.',
    ask: 'You have beaten my argument. Have you beaten the claim?',
    examples: [
      { text: 'He defended a sound policy with one terrible statistic. The statistic was taken apart in a minute, and the policy was treated as having gone down with it.' },
    ] },

  { id: 'ST-038', n: 'XXXVIII', term: 'Becoming personal', latin: 'argumentum ad personam', alsoFallacy: 'MF-011',
    what: 'Losing, a person abandons the subject altogether and attacks the one arguing. He puts it last because it is the last thing left.',
    overlook: 'That the subject was dropped. The room remembers the insult and forgets the question it replaced.',
    ask: 'That has no bearing on the point in dispute. What about the point?',
    examples: [
      { text: 'It is an appeal from the virtues of the intellect to the virtues of the body, or to mere animalism.',
        source: 'Schopenhauer, The Art of Controversy' },
    ] },

];

export const stratagemById = id => STRATAGEMS.find(s => s.id === id) ?? null;
