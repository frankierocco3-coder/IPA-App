// How arguments go wrong — the modern errors, grouped by what the speaker
// is DOING rather than alphabetically.
//
// Owner decision 2026-09-28. He kept Aristotle's thirteen as their own
// closed shelf and asked for this one because of how it is organised: not
// a glossary but eight families, each answering "what is this person
// doing to me?" That is the same principle the figures shelf runs on, and
// it is the reason this is usable in a room. A listener cannot hold forty
// names. They can hold eight questions.
//
// ── The Aristotle overlap, handled rather than hidden ─────────
// FIVE of the entries below ARE fallacies from js/data/rhetoric/fallacies.js
// wearing modern names: irrelevant conclusion is ignoratio elenchi,
// begging the question and loaded question are his, false cause is his,
// and post hoc is a species of it. Two shelves defining the same error
// twice would make the app look as though it did not know. So every such
// entry carries `alsoAristotle` with the FA id, says so in its note, and
// defines nothing twice. The overlap becomes the lesson: the errors did
// not change in two thousand years, only the names did.
//
// ── Entry shape ───────────────────────────────────────────────
//   id           'MF-<3 digits>'. STABLE FOREVER.
//   term         the name in its commonest modern form
//   family       key into FAMILIES below
//   what         the error in one plain sentence
//   overlook     what the tactic makes an audience fail to notice. This is
//                the field that makes the shelf usable: naming a fallacy
//                is not the point, seeing what it hid is.
//   ask          the diagnostic question, in the words you would use.
//                Owner order 2026-09-28: the `repair` field was removed. Three
//                fields per card was one more than the page could carry, and
//                the question is the part a reader actually uses in a room.
//   note         optional; used where the name is disputed or dating
//   alsoAristotle  optional FA id, where this IS one of the thirteen
//
// ── What is deliberately NOT here ─────────────────────────────
// Nutpicking, which is internet jargon that will date badly and which
// "cherry-picking" already covers for argument purposes. If it outlives
// this decade it can be added; an entry is cheap and a wrong entry is not.
//
// NOT APPROVED. Written by Claude, awaiting a reviewer, like everything
// else in this course.

export const FAMILIES = [
  { id: 'distort', n: 1, icon: '🪞', title: 'Distorting the other position',
    lead: 'The argument being attacked is not the argument that was made. Every one of these works by replacing the opponent with a version of them that is easier to beat.',
    counter: 'Can you state their position in words they would accept? If not, you are not arguing with them yet.' },
  { id: 'avoid', n: 2, icon: '🚪', title: 'Avoiding the question',
    lead: 'The question asked is not the question answered, and the swap is covered by motion. These are the hardest to catch live, because something IS being argued, often well.',
    counter: 'What was the question? Ask it again, in the same words, and watch what happens.' },
  { id: 'person', n: 3, icon: '👤', title: 'Attacking the person',
    lead: 'The speaker is examined instead of the claim. A person’s expertise, honesty and interest CAN be relevant; this becomes a fallacy when it replaces the examination rather than informing it.',
    counter: 'If a person you liked said exactly this, would the argument be any better?' },
  { id: 'smuggle', n: 4, icon: '🎒', title: 'Smuggling in assumptions',
    lead: 'Something unproven is carried in as though already agreed. The move is invisible because the premise is never stated, only used.',
    counter: 'Write the argument out in numbered steps. The smuggled premise is the one you have to add to make it work.' },
  { id: 'evidence', n: 5, icon: '📊', title: 'Misusing evidence',
    lead: 'There is evidence, and it will not carry what is being built on it. Firsthand experience is real knowledge and belongs in an argument; the error is claiming more than one experience can establish.',
    counter: 'What would we expect to see if this were false? Has anybody looked?' },
  { id: 'cause', n: 6, icon: '🔗', title: 'Confusing cause and sequence',
    lead: 'Two things happened and a link is asserted between them. Strictly a species of misusing evidence, given its own family because it is the commonest reasoning error in public life.',
    counter: 'What else changed at the same time, and what would break the link if it were there?' },
  { id: 'authority', n: 7, icon: '🏅', title: 'Borrowing authority',
    lead: 'Something other than the evidence is offered as the reason to believe: a crowd, an expert, an age, a novelty, nature itself. Expert testimony is NOT inherently fallacious and this family is not an argument against expertise.',
    counter: 'Is this person qualified in THIS subject, representing the evidence accurately, and giving reasons I could examine?' },
  { id: 'emotion', n: 8, icon: '🔥', title: 'Replacing judgment with feeling',
    lead: 'Emotion is not a fallacy and this family does not say it is. Emotion can show a listener why true evidence matters. It turns fallacious when it stands IN PLACE of the evidence that is missing.',
    counter: 'Take the feeling out and read what is left. Is there still an argument there?' },
];

export const MODERN_FALLACIES = [

  // 1 · Distorting the other position
  { id: 'MF-001', term: 'Straw man', family: 'distort',
    what: 'The other person’s position is replaced with a weaker or more extreme version, and that version is attacked.',
    overlook: 'That the argument being demolished was never made. The audience watches a real refutation of an unreal claim and scores it as a win.',
    ask: 'Would the other person recognise that as their position?',
    note: 'Modern name, not Aristotle’s, though it functions as a species of his ignoratio elenchi. The strongest habit in this whole shelf is the opposite move: build their case at its best before you touch it.' },
  { id: 'MF-002', term: 'False equivalence', family: 'distort',
    what: 'Two things different in kind or scale are presented as comparable.',
    overlook: 'The difference in degree. The form of the comparison does the persuading before anybody checks the sizes.',
    ask: 'Are these the same kind of thing, and are they the same size?' },
  { id: 'MF-003', term: 'Quote mining', family: 'distort',
    what: 'Words are lifted out of their context so that they appear to say something else.',
    overlook: 'The sentence on either side. A quotation looks like evidence precisely because it is verbatim.',
    ask: 'What came immediately before and after, and does the speaker still hold this?',
    note: 'Aristotle’s accent, the fallacy of emphasis, is the same move made with stress rather than scissors. See FA-005.' },
  { id: 'MF-004', term: 'Motte-and-bailey', family: 'distort',
    what: 'A strong, contentious claim is advanced, and when challenged the speaker retreats to a modest claim nobody disputes, then returns to the strong one later.',
    overlook: 'That two different claims are in play. Each looks reasonable at the moment it is defended.',
    ask: 'Which version are we discussing right now, and is it the version that was asserted?',
    note: 'Named in 2005 from a form of Norman castle: an indefensible field around a defensible tower. Recent, and it has stuck because nothing else named the move.' },

  // 2 · Avoiding the question
  { id: 'MF-005', term: 'Red herring', family: 'avoid',
    what: 'Attention is drawn to a different issue so the original question fades from view.',
    overlook: 'That the question was never answered. A red herring usually introduces something TRUE, which is why it works.',
    ask: 'Did that answer the question, or did it make me think about something else?',
    note: 'The classic pairing with the straw man, and the two are regularly confused. A straw man SUBSTITUTES an argument and attacks it. A red herring CHANGES THE SUBJECT. A single passage can do both.' },
  { id: 'MF-006', term: 'Whataboutism', family: 'avoid',
    what: 'A criticism is met by pointing at somebody else’s wrongdoing.',
    overlook: 'That the original charge is undisturbed. The other party’s guilt, even if real, is not a defence.',
    ask: 'If that is also true, does it make this less true?' },
  { id: 'MF-007', term: 'Moving the goalposts', family: 'avoid',
    what: 'The standard of proof is raised once the original standard has been met.',
    overlook: 'That the first demand was satisfied. Each new demand sounds reasonable on its own.',
    ask: 'What would change your mind? Get the answer BEFORE presenting the evidence.' },
  { id: 'MF-008', term: 'Burden shifting', family: 'avoid',
    what: 'The person making a claim demands that others disprove it rather than supporting it.',
    overlook: 'That nothing has been offered yet. Being unable to disprove something feels like losing.',
    ask: 'Who made the claim? That is who owes the reason.' },
  { id: 'MF-009', term: 'Gish gallop', family: 'avoid',
    what: 'So many weak claims are made so quickly that answering them all is impossible in the time available.',
    overlook: 'That volume is not weight. Every unanswered claim looks conceded.',
    ask: 'Which of these actually carries the argument? Answer that one properly.',
    note: 'Principally a debate tactic rather than a reasoning error, named in the 1990s. The individual claims still each need examining, which is exactly the thing the tactic makes impossible.' },
  { id: 'MF-010', term: 'Irrelevant conclusion', family: 'avoid',
    what: 'Something is proved, and it is not the thing in dispute.',
    overlook: 'That a real proof succeeded at the wrong target.',
    ask: 'What was the claim, and is this a proof of THAT?',
    alsoAristotle: 'FA-009',
    note: 'This IS Aristotle’s ignoratio elenchi under its modern name, and he treats it as the general case that several of the others are species of. Defined once, on the Thirteen shelf.' },

  // 3 · Attacking the person
  { id: 'MF-011', term: 'Ad hominem', family: 'person',
    what: 'The speaker’s character is attacked instead of the argument answered.',
    overlook: 'That the argument is still standing. Discrediting a person feels like refuting them.',
    ask: 'If somebody blameless said exactly this, would it be any better an argument?',
    note: 'The commonest false accusation on this shelf. Questioning a witness’s reliability, an expert’s field or a funder’s interest is legitimate and often necessary. It becomes the fallacy when it REPLACES examination rather than informing it.' },
  { id: 'MF-012', term: 'Tu quoque', family: 'person',
    what: 'A criticism is rejected on the ground that the critic is guilty of the same thing.',
    overlook: 'That hypocrisy does not make a claim false. The doctor who smokes is still right about smoking.',
    ask: 'Is the point wrong, or just badly placed in this mouth?' },
  { id: 'MF-013', term: 'Guilt by association', family: 'person',
    what: 'A position is discredited because somebody unpleasant also holds it.',
    overlook: 'That bad people hold true beliefs too, and that agreement is not endorsement.',
    ask: 'Is the argument different because of who else makes it?' },
  { id: 'MF-014', term: 'Genetic fallacy', family: 'person',
    what: 'A claim is judged entirely by where it came from rather than whether it is true.',
    overlook: 'That origin and truth are different questions. A tainted source can still report a fact.',
    ask: 'Where it came from aside, is it true?' },

  // 4 · Smuggling in assumptions
  { id: 'MF-015', term: 'Begging the question', family: 'smuggle',
    what: 'The conclusion is assumed somewhere inside the premises.',
    overlook: 'The circle, when it is wide enough that the beginning and the end look like different sentences.',
    ask: 'Is there independent support here, or is the conclusion restated in other words?',
    alsoAristotle: 'FA-010',
    note: 'Aristotle’s petitio principii, unchanged. Defined once, on the Thirteen shelf. Note the modern drift: in ordinary speech the phrase now usually means "raises the question", which is not this.' },
  { id: 'MF-016', term: 'Loaded question', family: 'smuggle',
    what: 'An unproven assumption is hidden inside a question, so that answering concedes it.',
    overlook: 'The premise. The trap is that any direct answer accepts it.',
    ask: 'What am I agreeing to by answering at all?',
    alsoAristotle: 'FA-013',
    note: 'Aristotle’s many questions. Defined once, on the Thirteen shelf.' },
  { id: 'MF-017', term: 'False dilemma', family: 'smuggle',
    what: 'Two options are presented when more exist.',
    overlook: 'The third option, and usually the compromise. The structure feels like rigour.',
    ask: 'Are these the only two? What is between them, and what is outside them?' },
  { id: 'MF-018', term: 'No True Scotsman', family: 'smuggle',
    what: 'A counterexample appears and the group is redefined to exclude it.',
    overlook: 'That the claim has become unfalsifiable and therefore empty.',
    ask: 'Was that definition in place before the counterexample, or after it?' },
  { id: 'MF-019', term: 'Special pleading', family: 'smuggle',
    what: 'An exception is claimed for one’s own case without a reason that would apply to anybody else’s.',
    overlook: 'That the rule was accepted until it bit.',
    ask: 'Would that exception be allowed to somebody on the other side?' },

  // 5 · Misusing evidence
  { id: 'MF-020', term: 'Hasty generalisation', family: 'evidence',
    what: 'A broad conclusion is drawn from too few cases.',
    overlook: 'How small the sample was, because the cases are usually vivid.',
    ask: 'How many, chosen how?' },
  { id: 'MF-021', term: 'Anecdotal fallacy', family: 'evidence',
    what: 'One personal story is treated as sufficient proof of a general claim.',
    overlook: 'The cases that did not become stories. A story is concrete and a statistic is not, so the story wins the room.',
    ask: 'What does this experience genuinely show, and what does it not establish by itself?',
    note: 'THIS ENTRY IS NOT A DISMISSAL OF LIVED EXPERIENCE. Firsthand knowledge is real knowledge and frequently sees what the research missed. The error is in the size of the conclusion, never in the having of the experience.' },
  { id: 'MF-022', term: 'Cherry-picking', family: 'evidence',
    what: 'Favourable evidence is presented and contrary evidence left out.',
    overlook: 'The missing half. Every fact offered can be true.',
    ask: 'What does the evidence that was not mentioned look like?' },
  { id: 'MF-023', term: 'Survivorship bias', family: 'evidence',
    what: 'Only the surviving cases are examined, because the failures are no longer visible to be counted.',
    overlook: 'That the sample selected itself. Nobody hides the failures; they are simply gone.',
    ask: 'Who is missing from this data, and why can I not see them?' },
  { id: 'MF-024', term: 'Appeal to ignorance', family: 'evidence',
    what: 'Something is held true because it has not been disproved, or false because it has not been proved.',
    overlook: 'That absence of evidence has been converted into evidence.',
    ask: 'Has anybody looked, and would we expect to have found it by now if it were there?' },
  { id: 'MF-025', term: 'Texas sharpshooter', family: 'evidence',
    what: 'A pattern is found after the data is examined and then presented as though it had been predicted.',
    overlook: 'The hypothesis that was written afterwards. Any large enough body of data contains patterns.',
    ask: 'Was this prediction made before the data was seen?',
    note: 'Named for a man firing at a barn and painting the target around the closest cluster of holes. The name teaches nothing without the story, which is why the story is here.' },

  // 6 · Confusing cause and sequence
  { id: 'MF-026', term: 'Post hoc', family: 'cause',
    what: 'One thing followed another, so the first is treated as the cause.',
    overlook: 'Everything else that changed in between.',
    ask: 'What else happened at the same time?',
    alsoAristotle: 'FA-011',
    note: 'A species of Aristotle’s false cause, which is defined on the Thirteen shelf. Post hoc ergo propter hoc: after this, therefore because of this.' },
  { id: 'MF-027', term: 'Correlation and causation', family: 'cause',
    what: 'Two things vary together, so one is said to cause the other.',
    overlook: 'The third thing causing both, and the possibility that the arrow points the other way.',
    ask: 'Could something else be causing both, and could the causation run backwards?' },
  { id: 'MF-028', term: 'Single-cause fallacy', family: 'cause',
    what: 'A result with several interacting causes is attributed to one.',
    overlook: 'That the chosen cause is usually the one that suits the speaker.',
    ask: 'What else contributed, and would removing this one really have prevented it?' },
  { id: 'MF-029', term: 'Slippery slope', family: 'cause',
    what: 'One step is said to lead inevitably to an extreme end, without the links being shown.',
    overlook: 'The missing steps. The end point is vivid and the chain is never examined.',
    ask: 'What makes each step follow from the one before it?',
    note: 'A SLIPPERY SLOPE IS NOT AUTOMATICALLY A FALLACY. It becomes a sound causal argument the moment the speaker can give evidence for each link, and some of the most important arguments in law and policy are exactly this done well.' },

  // 7 · Borrowing authority
  { id: 'MF-030', term: 'Appeal to popularity', family: 'authority',
    what: 'Something is held true because many people believe it.',
    overlook: 'That everybody can be wrong together, and frequently has been.',
    ask: 'What do the people who believe this know that I do not?' },
  { id: 'MF-031', term: 'Appeal to authority', family: 'authority',
    what: 'Something is held true because an important person said it.',
    overlook: 'Whether the authority is an authority in THIS subject, and whether they gave reasons.',
    ask: 'Qualified in this field, representing the evidence accurately, and giving reasons I could examine?',
    note: 'THIS IS NOT AN ARGUMENT AGAINST EXPERTISE, and it is the entry most often misused as one. Deferring to qualified consensus is usually rational. The fallacy is surrendering judgment, not exercising it by trusting somebody who has looked properly.' },
  { id: 'MF-032', term: 'Appeal to tradition', family: 'authority',
    what: 'Something is right because it has always been done.',
    overlook: 'Whether it ever worked, and whether the conditions still hold.',
    ask: 'What was the reason originally, and is that reason still true?' },
  { id: 'MF-033', term: 'Appeal to novelty', family: 'authority',
    what: 'Something is better because it is new.',
    overlook: 'That the old thing survived a test the new one has not taken yet.',
    ask: 'New compared to what, and better in what respect?' },
  { id: 'MF-034', term: 'Appeal to nature', family: 'authority',
    what: 'Something is good because it is natural, or bad because it is not.',
    overlook: 'That natural covers hemlock and lightning, and unnatural covers antibiotics.',
    ask: 'What is natural doing in this argument that safe or effective could not do better?' },

  // 8 · Replacing judgment with feeling
  { id: 'MF-035', term: 'Appeal to fear', family: 'emotion',
    what: 'Fear is produced in place of the evidence for the claim.',
    overlook: 'That no link was shown between the frightening thing and the proposal.',
    ask: 'How likely is this, and does the proposal actually prevent it?' },
  { id: 'MF-036', term: 'Appeal to pity', family: 'emotion',
    what: 'Sympathy is offered as a substitute for the reasons.',
    overlook: 'That suffering is real and still does not establish the claim attached to it.',
    ask: 'If I feel for them and the claim is separate, which one am I being asked to accept?' },
  { id: 'MF-037', term: 'Appeal to ridicule', family: 'emotion',
    what: 'The position is made to look absurd instead of being answered.',
    overlook: 'That laughter closes a question without settling it, and makes reopening it embarrassing.',
    ask: 'Take the joke away. What is the objection underneath?' },
  { id: 'MF-038', term: 'Appeal to outrage', family: 'emotion',
    what: 'Indignation is generated so that examination feels like disloyalty.',
    overlook: 'The step that was skipped while everybody was angry. Anger is urgent and urgency prevents checking.',
    ask: 'What am I being encouraged not to ask while I am angry?' },
  { id: 'MF-039', term: 'Appeal to flattery', family: 'emotion',
    what: 'The audience is made to feel clever or virtuous for agreeing.',
    overlook: 'That agreement is being sold as an identity rather than a judgment.',
    ask: 'Would I still hold this if believing it made me look foolish?' },
  { id: 'MF-040', term: 'Appeal to consequences', family: 'emotion',
    what: 'A claim is held true or false because of what would follow from accepting it.',
    overlook: 'That the world is not obliged to be convenient.',
    ask: 'Am I judging whether this is true, or whether I want it to be?' },

];

export const familyById = id => FAMILIES.find(f => f.id === id) ?? null;
export const fallaciesInFamily = id => MODERN_FALLACIES.filter(f => f.family === id);
export const aristotleOverlaps = () => MODERN_FALLACIES.filter(f => f.alsoAristotle);
