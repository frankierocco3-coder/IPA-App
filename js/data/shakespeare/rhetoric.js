// The rhetoric shelf — seventeen figures, built exactly like the lexicon.
//
// A GLOSSARY, not seventeen lessons: seventeen lessons on figures of
// speech would be the dullest part of the app. Written for the Shakespeare
// course, which no longer owns it; the shelf is The Figures, in the
// Rhetoric Library, since 2026-09-28.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'RH-<3 digits>'. STABLE FOREVER — never renumber, never
//            reuse. Retire an id rather than reassign it.
//   term     the figure, in the form an actor is likeliest to meet it
//   what     what it is, in one plain sentence. A definition.
//   effect   WHAT IT DOES TO A LISTENER OR AN ARGUMENT. A definition is a
//            dictionary; this is the craft, and it leads because this is a
//            rhetoric shelf.
//   performance  How a speaker or actor might embody it. SECOND, and kept
//            separate on purpose (owner order 2026-09-29). The two used to
//            be one `note` field written actor-first, which was correct
//            while this shelf belonged to the Shakespeare course and wrong
//            the moment it moved to Rhetoric: an acting choice was being
//            stated as what the figure IS. Three entries said so outright
//            and were corrected in the same pass.
//   examples ONE per figure, { text, source, inApp? }. Where the example is
//            drawn from this app's own corpus it carries inApp: true and is
//            machine-verified, line for line, against the sonnets and the
//            scenes. The cited ones cannot be: nothing in this repository
//            holds Lincoln or the King James Bible, so they are drawn from
//            the best-known passages in English precisely so that an error
//            is visible to any reader who knows them. They deserve a human
//            pass.
//
// COPYRIGHT. Every cited source is public domain: Shakespeare, Marlowe,
// the King James Bible, Lincoln, Patrick Henry, Sojourner Truth,
// Wordsworth, Whitman, Burns, Dickens, Dumas, Marvell, Milton, Tennyson,
// Voltaire, Virgil. Churchill and King are the two most quoted rhetors
// in English and appear NOWHERE here, because both are still in
// copyright. Kennedy's inaugural is included as a United States
// Government work. The same discipline js/data/idiom.js follows.
//
// HOUSE STYLE applies to `what`, `effect` and `performance`. It does NOT apply to
// `examples`: quotations keep the edition's own spelling and
// punctuation, including the em dashes that our own prose never uses.
//
// ACCURACY. The names of figures are not stable across sources. Several
// of these carry two or three names in different handbooks, and the
// boundaries between neighbours (ploce and antanaclasis, antimetabole
// and chiasmus) are drawn differently depending on who is drawing them.
// Where that is true the entry says so rather than pretending the
// terminology is settled. An actor needs the effect, not the taxonomy.

export const RHETORIC = [

  { id: 'RH-001', term: 'Antithesis',
    what: 'Two opposed ideas set against each other in a balanced structure.',
    effect: 'It sets two things in opposition and makes the opposition itself the content. A listener does not have to be told that the two options exclude each other, because the shape says so before the sense arrives. That is why antithesis can smuggle a false choice as easily as it can clarify a real one.',
    performance: 'Find both halves and let them genuinely oppose. Where the speaker is still weighing them the figure is a decision in progress; where the decision is already made it is a verdict being read out. Those are different scenes, and the words do not tell you which one you are in.',
    examples: [
      { text: 'To be, or not to be, that is the question:',
        source: 'The Nunnery Scene, Hamlet', inApp: true },
    ] },

  { id: 'RH-002', term: 'Anaphora',
    what: 'The same word or phrase beginning several clauses or lines in a row.',
    effect: 'It builds by counting. Each repetition tells the listener that the speaker has not finished and the list is not exhausted, so the pressure comes from accumulation rather than from any single item.',
    performance: 'Let them accumulate. Decorating each item differently breaks the count, and the count is the only thing generating the pressure.',
    examples: [
      { text: 'we can not dedicate, we can not consecrate, we can not hallow this ground',
        source: 'Lincoln, Gettysburg Address, 1863' },
    ] },

  { id: 'RH-003', term: 'Polysyndeton',
    what: 'Conjunctions kept in where they could be dropped, so items are chained rather than listed.',
    effect: 'It makes a list feel endless, because every conjunction promises another item. A quantity that would be plainly finite in a bare list becomes, to a listener, a quantity with no end in sight.',
    performance: 'It suits somebody overwhelmed by the sheer number of things rather than by any one of them. Sonnet 66 runs on it, which is why that poem sounds like a man running out of patience rather than making a case.',
    examples: [
      { text: 'And God said, Let there be light: and there was light. And God saw the light, that it was good',
        source: 'Genesis 1, King James Bible' },
    ] },

  { id: 'RH-004', term: 'Asyndeton',
    what: 'Conjunctions removed, so items arrive one after another with nothing between them.',
    effect: 'It makes a list fast, and speed by itself carries no attitude. The same stripped conjunctions can read as a mind outrunning itself or as a report so complete that it needs no joins.',
    performance: 'Decide which before playing it. Three verbs with nothing between them can be a man losing his grip, or a general describing a conquest as though it cost him nothing.',
    examples: [
      { text: 'I came, I saw, I conquered.',
        source: 'Julius Caesar, reported by Plutarch and Suetonius' },
    ] },

  { id: 'RH-005', term: 'Epistrophe',
    what: 'The same word or phrase ending several clauses in a row. The mirror of anaphora.',
    effect: 'Where anaphora builds forward, this one closes. Each clause sets out from somewhere different and arrives at the same word, so the repetition lands as something the speaker cannot get around.',
    performance: 'The final word is the event and everything before it is approach. Vary the approach; keep the landing identical.',
    examples: [
      { text: 'of the people, by the people, for the people',
        source: 'Lincoln, Gettysburg Address, 1863' },
    ] },

  { id: 'RH-006', term: 'Epizeuxis',
    what: 'A word repeated immediately, with nothing in between.',
    effect: 'It marks the place where a speaker cannot move on. It is the least literary figure on the shelf and the most immediately recognisable, because it is what people actually do under pressure.',
    performance: 'Resist varying the two. The sameness is the information: a second saying of the same word reports that the first one did not work.',
    examples: [
      { text: 'O Romeo, Romeo, wherefore art thou Romeo?',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
    ] },

  { id: 'RH-007', term: 'Ploce',
    what: 'A word repeated across a passage, often with a turn on its sense each time. Some handbooks separate this from antanaclasis, where the second use clearly changes meaning; the line between them is not firmly drawn.',
    effect: 'It keeps a word in the air and works it. The listener hears the same word arrive with a different weight each time, which lets a speaker make an argument without ever stating it.',
    performance: 'The change of weight has to be audible or the repetition reads as an accident. Know what each instance means before deciding how it sounds.',
    examples: [
      { text: 'Put out the light, and then put out the light.',
        source: 'Othello V.ii' },
    ] },

  { id: 'RH-008', term: 'Antimetabole',
    what: 'Two terms repeated in reverse order, so the second half inverts the first. Often used interchangeably with chiasmus, though chiasmus is the broader term for any mirrored structure.',
    effect: 'It sounds like proof. The symmetry implies that the halves have been weighed against each other and the conclusion follows, so the structure persuades before the content has been examined. That is why it is the favourite figure of anybody winning an argument they may not deserve to win.',
    performance: 'The turn is the point. Both halves need the same weight or the mirror fails, and the pause at the pivot is where the listener does the arithmetic.',
    examples: [
      { text: 'Fair is foul, and foul is fair',
        source: 'The witches, Macbeth I.i' },
    ] },

  { id: 'RH-009', term: 'Apostrophe',
    what: 'Turning away from the people present to address somebody absent, something abstract, or a thing.',
    effect: 'It changes who is being addressed, and with that what kind of speech this is. Turning to somebody absent or to something abstract converts an exchange into a declaration.',
    performance: 'It also does something to the person abandoned. A character who stops speaking to the man in front of them and starts speaking to death has left the room without moving, and the leaving is playable.',
    examples: [
      { text: 'O death, where is thy sting? O grave, where is thy victory?',
        source: '1 Corinthians 15:55, King James Bible' },
    ] },

  { id: 'RH-010', term: 'Erotema',
    what: 'A question asked without expecting an answer. The rhetorical question.',
    effect: 'It is an assertion wearing a question mark. The listener supplies the answer, which makes them a participant in the claim rather than a recipient of it, and an answer somebody reached alone is harder for them to abandon.',
    performance: 'Most often it is a move against somebody rather than an enquiry, and playing it as a genuine question gives the move away. That is a tendency and not a rule: a speaker can ask one and mean it, and the moment where a rhetorical question turns real is worth finding rather than smoothing over.',
    examples: [
      { text: 'If you prick us, do we not bleed?',
        source: 'Shylock, The Merchant of Venice III.i' },
    ] },

  { id: 'RH-011', term: 'Hyperbole',
    what: 'Deliberate overstatement, not meant to be believed literally.',
    effect: 'It states a size nobody is meant to accept and asks the listener to read the feeling behind it. Because the literal claim is unavailable, the listener supplies a scale of their own, and what they supply is usually larger than any true figure would have given.',
    performance: 'It can be a failure to cope or a deliberate instrument, and the two play differently. A man who says the ocean could not wash his hands clean is not estimating. A speaker who reaches for that size on purpose knows exactly what they are doing with it.',
    examples: [
      { text: 'Will all great Neptune’s ocean wash this blood',
        source: 'After the Murder, Macbeth', inApp: true },
    ] },

  { id: 'RH-012', term: 'Oxymoron',
    what: 'Two contradictory words joined into one phrase.',
    effect: 'It holds two incompatible things in one phrase without resolving them, so the listener has to carry the contradiction rather than settle it.',
    performance: 'Playing only one half throws away the reason the phrase exists. Both have to be present, and neither is allowed to win.',
    examples: [
      { text: 'Good night, good night. Parting is such sweet sorrow',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
    ] },

  { id: 'RH-013', term: 'Paradox',
    what: 'A statement that contradicts itself on the surface and turns out to hold.',
    effect: 'Larger and slower than an oxymoron: a whole thought that contradicts itself on the surface and holds underneath. It is what a speaker reaches for when the plain version would sound like a lie.',
    performance: 'It needs time. A paradox delivered at speed reads as a slip of the tongue, because the listener has not been given the beat in which the second half turns out to be true.',
    examples: [
      { text: 'Cowards die many times before their deaths; The valiant never taste of death but once.',
        source: 'Caesar, Julius Caesar II.ii' },
    ] },

  { id: 'RH-014', term: 'Tricolon',
    what: 'Three parallel items in a row, often building in weight.',
    effect: 'Three is the point at which a listener hears a pattern and starts expecting completion. The third item lands hardest because it was anticipated, and that expectation is what makes breaking a set of three one of the strongest moves available.',
    performance: 'If the third is weaker than the second, something is wrong with the reading rather than with the writing.',
    examples: [
      { text: 'Friends, Romans, countrymen',
        source: 'Antony, Julius Caesar III.ii' },
    ] },

  { id: 'RH-015', term: 'Epanalepsis',
    what: 'The same word or phrase at the beginning and at the end of one clause or sentence.',
    effect: 'The word closes the door it opened. A clause that ends where it began has not travelled, so it arrives as a rule rather than as a thought in progress.',
    performance: 'It suits a speaker refusing to be argued out of something. Play the return as a return, not as a fresh word that happens to be the same.',
    examples: [
      { text: 'Nothing will come of nothing.',
        source: 'Lear, King Lear I.i' },
    ] },

  { id: 'RH-016', term: 'Stichomythia',
    what: 'Rapid alternating single lines, or fragments of a line, traded between two speakers.',
    effect: 'It is a property of an exchange rather than of one speaker. The pace is written into the text, and what it shows is two people neither of whom is leaving room for the other.',
    performance: 'Primarily a dramatic technique, and the one entry here that belongs as much to the Acting course as to this one. Pauses inserted between the fragments turn two frightened people into two people having a conversation. See also the lesson on shared lines.',
    examples: [
      { text: 'Hamlet, thou hast thy father much offended. / Mother, you have my father much offended.',
        source: 'Hamlet III.iv' },
    ] },

  { id: 'RH-017', term: 'Aposiopesis',
    what: 'A sentence broken off before it finishes, usually because the speaker cannot or will not complete it.',
    effect: 'The break is the event. A sentence abandoned tells a listener that something arrived mid-thought which the speaker could not or would not say, and the listener fills the gap themselves.',
    performance: 'The speaker has to know exactly what interrupted: a fear, a realisation, a thing decided against. Lear breaks off twice inside one threat, and the second break is the admission that he cannot name the revenges he is promising.',
    examples: [
      { text: 'I will have such revenges on you both That all the world shall—I will do such things—',
        source: 'Lear, King Lear II.iv' },
    ] },

];

export const RHETORIC_BY_ID = id => RHETORIC.find(r => r.id === id) ?? null;
