// The rhetoric shelf — seventeen figures, built exactly like the lexicon.
//
// A GLOSSARY, not seventeen lessons: seventeen lessons on figures of
// speech would be the dullest part of the app. Written for the Shakespeare
// course, which no longer owns it; the shelf is The Shapes of Argument, in the
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
//
// THERE IS NO PERFORMANCE FIELD. This shelf carried one paragraph mixing
// the rhetorical effect with how an actor might embody it, inherited from
// the Shakespeare course. It was split in two on 2026-09-29 and the acting
// half was removed the same day (owner order): rhetoric is its own
// workspace and this shelf is about what a figure does to a listener.
// Acting keeps its own courses for the rest. The removed text is in git
// history if it is ever wanted in the Acting course, where it belongs.
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
// HOUSE STYLE applies to `what` and `effect`. It does NOT apply to
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
    examples: [
      { text: 'To be, or not to be, that is the question:',
        source: 'The Nunnery Scene, Hamlet', inApp: true },
    ] },

  { id: 'RH-002', term: 'Anaphora',
    what: 'The same word or phrase beginning several clauses or lines in a row.',
    effect: 'It builds by counting. Each repetition tells the listener that the speaker has not finished and the list is not exhausted, so the pressure comes from accumulation rather than from any single item.',
    examples: [
      { text: 'we can not dedicate, we can not consecrate, we can not hallow this ground',
        source: 'Lincoln, Gettysburg Address, 1863' },
    ] },

  { id: 'RH-003', term: 'Polysyndeton',
    what: 'Conjunctions kept in where they could be dropped, so items are chained rather than listed.',
    effect: 'It makes a list feel endless, because every conjunction promises another item. A quantity that would be plainly finite in a bare list becomes, to a listener, a quantity with no end in sight.',
    examples: [
      { text: 'And God said, Let there be light: and there was light. And God saw the light, that it was good',
        source: 'Genesis 1, King James Bible' },
    ] },

  { id: 'RH-004', term: 'Asyndeton',
    what: 'Conjunctions removed, so items arrive one after another with nothing between them.',
    effect: 'It makes a list fast, and speed by itself carries no attitude. The same stripped conjunctions can read as a mind outrunning itself or as a report so complete that it needs no joins.',
    examples: [
      { text: 'I came, I saw, I conquered.',
        source: 'Julius Caesar, reported by Plutarch and Suetonius' },
    ] },

  { id: 'RH-005', term: 'Epistrophe',
    what: 'The same word or phrase ending several clauses in a row. The mirror of anaphora.',
    effect: 'Where anaphora builds forward, this one closes. Each clause sets out from somewhere different and arrives at the same word, so the repetition lands as something the speaker cannot get around.',
    examples: [
      { text: 'of the people, by the people, for the people',
        source: 'Lincoln, Gettysburg Address, 1863' },
    ] },

  { id: 'RH-006', term: 'Epizeuxis',
    what: 'A word repeated immediately, with nothing in between.',
    effect: 'It marks the place where a speaker cannot move on. It is the least literary figure on the shelf and the most immediately recognisable, because it is what people actually do under pressure.',
    examples: [
      { text: 'O Romeo, Romeo, wherefore art thou Romeo?',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
    ] },

  { id: 'RH-007', term: 'Ploce',
    what: 'A word repeated across a passage, often with a turn on its sense each time. Some handbooks separate this from antanaclasis, where the second use clearly changes meaning; the line between them is not firmly drawn.',
    effect: 'It keeps a word in the air and works it. The listener hears the same word arrive with a different weight each time, which lets a speaker make an argument without ever stating it.',
    examples: [
      { text: 'Put out the light, and then put out the light.',
        source: 'Othello V.ii' },
    ] },

  { id: 'RH-008', term: 'Antimetabole',
    what: 'Two terms repeated in reverse order, so the second half inverts the first. Often used interchangeably with chiasmus, though chiasmus is the broader term for any mirrored structure.',
    effect: 'It sounds like proof. The symmetry implies that the halves have been weighed against each other and the conclusion follows, so the structure persuades before the content has been examined. That is why it is the favourite figure of anybody winning an argument they may not deserve to win.',
    examples: [
      { text: 'Fair is foul, and foul is fair',
        source: 'The witches, Macbeth I.i' },
    ] },

  { id: 'RH-009', term: 'Apostrophe',
    what: 'Turning away from the people present to address somebody absent, something abstract, or a thing.',
    effect: 'It changes who is being addressed, and with that what kind of speech this is. Turning to somebody absent or to something abstract converts an exchange into a declaration.',
    examples: [
      { text: 'O death, where is thy sting? O grave, where is thy victory?',
        source: '1 Corinthians 15:55, King James Bible' },
    ] },

  { id: 'RH-010', term: 'Erotema',
    what: 'A question asked without expecting an answer. The rhetorical question.',
    effect: 'It is an assertion wearing a question mark. The listener supplies the answer, which makes them a participant in the claim rather than a recipient of it, and an answer somebody reached alone is harder for them to abandon.',
    examples: [
      { text: 'If you prick us, do we not bleed?',
        source: 'Shylock, The Merchant of Venice III.i' },
    ] },

  { id: 'RH-011', term: 'Hyperbole',
    what: 'Deliberate overstatement, not meant to be believed literally.',
    effect: 'It states a size nobody is meant to accept and asks the listener to read the feeling behind it. Because the literal claim is unavailable, the listener supplies a scale of their own, and what they supply is usually larger than any true figure would have given.',
    examples: [
      { text: 'Will all great Neptune’s ocean wash this blood',
        source: 'After the Murder, Macbeth', inApp: true },
    ] },

  { id: 'RH-012', term: 'Oxymoron',
    what: 'Two contradictory words joined into one phrase.',
    effect: 'It holds two incompatible things in one phrase without resolving them, so the listener has to carry the contradiction rather than settle it.',
    examples: [
      { text: 'Good night, good night. Parting is such sweet sorrow',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
    ] },

  { id: 'RH-013', term: 'Paradox',
    what: 'A statement that contradicts itself on the surface and turns out to hold.',
    effect: 'Larger and slower than an oxymoron: a whole thought that contradicts itself on the surface and holds underneath. It is what a speaker reaches for when the plain version would sound like a lie.',
    examples: [
      { text: 'Cowards die many times before their deaths; The valiant never taste of death but once.',
        source: 'Caesar, Julius Caesar II.ii' },
    ] },

  { id: 'RH-014', term: 'Tricolon',
    what: 'Three parallel items in a row, often building in weight.',
    effect: 'Three is the point at which a listener hears a pattern and starts expecting completion. The third item lands hardest because it was anticipated, and that expectation is what makes breaking a set of three one of the strongest moves available.',
    examples: [
      { text: 'Friends, Romans, countrymen',
        source: 'Antony, Julius Caesar III.ii' },
    ] },

  { id: 'RH-015', term: 'Epanalepsis',
    what: 'The same word or phrase at the beginning and at the end of one clause or sentence.',
    effect: 'The word closes the door it opened. A clause that ends where it began has not travelled, so it arrives as a rule rather than as a thought in progress.',
    examples: [
      { text: 'Nothing will come of nothing.',
        source: 'Lear, King Lear I.i' },
    ] },

  { id: 'RH-016', term: 'Stichomythia',
    what: 'Rapid alternating single lines, or fragments of a line, traded between two speakers.',
    effect: 'It is a property of an exchange rather than of one speaker. The pace is written into the text, and what it shows is two people neither of whom is leaving room for the other.',
    examples: [
      { text: 'Hamlet, thou hast thy father much offended. / Mother, you have my father much offended.',
        source: 'Hamlet III.iv' },
    ] },

  { id: 'RH-017', term: 'Aposiopesis',
    what: 'A sentence broken off before it finishes, usually because the speaker cannot or will not complete it.',
    effect: 'The break is the event. A sentence abandoned tells a listener that something arrived mid-thought which the speaker could not or would not say, and the listener fills the gap themselves.',
    examples: [
      { text: 'I will have such revenges on you both That all the world shall—I will do such things—',
        source: 'Lear, King Lear II.iv' },
    ] },

];

export const RHETORIC_BY_ID = id => RHETORIC.find(r => r.id === id) ?? null;
