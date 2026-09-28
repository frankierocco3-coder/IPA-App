// The rhetoric shelf — seventeen figures, built exactly like the lexicon.
//
// Outline decision (docs/SHAKESPEARE_COURSE_OUTLINE.md): the seventeen
// devices are a GLOSSARY, not seventeen lessons. Seventeen lessons on
// figures of speech would be the dullest part of the app. Module 6
// teaches what rhetoric is for in three lessons and sends the reader
// here for the names.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'RH-<3 digits>'. STABLE FOREVER — never renumber, never
//            reuse. Retire an id rather than reassign it.
//   term     the figure, in the form an actor is likeliest to meet it
//   what     what it is, in one plain sentence. A definition.
//   note     THE FIELD THAT EARNS THE SHELF: what the figure does to the
//            person being spoken to. A definition is a dictionary; this
//            is the craft. Every note is about effect on a listener,
//            never about admiring the pattern.
//   examples FIVE per figure (owner order 2026-09-28), each
//            { text, source, inApp? }. One is always drawn from this
//            app's own corpus and carries inApp: true; the rest come
//            from the wider history of argument in English.
//
// WHY FIVE, AND WHAT IT COST. The shelf used to carry ONE example per
// figure, every one of them from the 154 sonnets and the eight scenes,
// and the suite checked every one against that corpus. That was a real
// guarantee and it is now only partly true, so it is worth being exact
// about what changed.
//
//   The 17 inApp examples are still machine-verified, line for line,
//   against the sonnets and scenes. That check still runs and still
//   fails the build.
//
//   The other 68 are CITED, not verified. Nothing in this repository
//   holds Lincoln or the King James Bible, so no check can confirm the
//   wording. They are drawn from the best-known passages in English
//   precisely so that an error is visible to any reader who knows them,
//   which is the only check available. They deserve a human pass.
//
// COPYRIGHT. Every cited source is public domain: Shakespeare, Marlowe,
// the King James Bible, Lincoln, Patrick Henry, Sojourner Truth,
// Wordsworth, Whitman, Burns, Dickens, Dumas, Marvell, Milton, Tennyson,
// Voltaire, Virgil. Churchill and King are the two most quoted rhetors
// in English and appear NOWHERE here, because both are still in
// copyright. Kennedy's inaugural is included as a United States
// Government work. The same discipline js/data/idiom.js follows.
//
// HOUSE STYLE applies to `what` and `note`. It does NOT apply to
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
    note: 'The commonest figure in the plays and the most useful to find. It hands you the argument: the character is choosing, and the structure shows you the two things they are choosing between. Play the opposition and the line does most of the work for you.',
    examples: [
      { text: 'To be, or not to be, that is the question:',
        source: 'The Nunnery Scene, Hamlet', inApp: true },
      { text: 'It was the best of times, it was the worst of times',
        source: 'Dickens, A Tale of Two Cities, 1859' },
      { text: 'Give me liberty, or give me death!',
        source: 'Patrick Henry, St John’s Church, Virginia, 1775' },
      { text: 'Not that I loved Caesar less, but that I loved Rome more.',
        source: 'Brutus, Julius Caesar III.ii' },
      { text: 'Many are called, but few are chosen.',
        source: 'Matthew 22:14, King James Bible' },
    ] },

  { id: 'RH-002', term: 'Anaphora',
    what: 'The same word or phrase beginning several clauses or lines in a row.',
    note: 'It builds. Each repetition says the speaker has not finished and the list is not exhausted, which is why it is the engine of accusation and complaint. The pressure on the listener comes from the count, so do not decorate each item differently: let them accumulate.',
    examples: [
      { text: 'And needy nothing trimm’d in jollity,',
        source: 'Sonnet 66, line 3 — ten of its lines begin with “And”', inApp: true },
      { text: 'Blessed are the poor in spirit … Blessed are they that mourn … Blessed are the meek',
        source: 'Matthew 5, King James Bible' },
      { text: 'This royal throne of kings, this sceptred isle, this earth of majesty',
        source: 'John of Gaunt, Richard II II.i' },
      { text: 'we can not dedicate, we can not consecrate, we can not hallow this ground',
        source: 'Lincoln, Gettysburg Address, 1863' },
      { text: 'A time to be born, and a time to die; a time to plant, and a time to pluck up',
        source: 'Ecclesiastes 3, King James Bible' },
    ] },

  { id: 'RH-003', term: 'Polysyndeton',
    what: 'Conjunctions kept in where they could be dropped, so items are chained rather than listed.',
    note: 'It makes a list feel endless, because every “and” promises another one. Useful when a character is overwhelmed by the sheer number of things, and it is the reason Sonnet 66 feels like a man running out of patience rather than making a case.',
    examples: [
      { text: 'And gilded honour shamefully misplac’d,',
        source: 'Sonnet 66, line 5', inApp: true },
      { text: 'And God said, Let there be light: and there was light. And God saw the light, that it was good',
        source: 'Genesis 1, King James Bible' },
      { text: 'and the rain descended, and the floods came, and the winds blew, and beat upon that house',
        source: 'Matthew 7:25, King James Bible' },
      { text: 'If there be cords, or knives, or poison, or fire, or suffocating streams',
        source: 'Othello III.iii' },
      { text: 'Tomorrow, and tomorrow, and tomorrow',
        source: 'Macbeth V.v' },
    ] },

  { id: 'RH-004', term: 'Asyndeton',
    what: 'Conjunctions removed, so items arrive one after another with nothing between them.',
    note: 'The opposite pressure to polysyndeton. It is fast and it sounds out of control, because nothing is joining the items up. A speaker using it has stopped organising and started piling.',
    examples: [
      { text: 'Is perjur’d, murderous, bloody, full of blame,',
        source: 'Sonnet 129, line 3', inApp: true },
      { text: 'I came, I saw, I conquered.',
        source: 'Julius Caesar, reported by Plutarch and Suetonius' },
      { text: 'government of the people, by the people, for the people',
        source: 'Lincoln, Gettysburg Address, 1863' },
      { text: 'Friends, Romans, countrymen, lend me your ears',
        source: 'Antony, Julius Caesar III.ii' },
      { text: 'Are all thy conquests, glories, triumphs, spoils, Shrunk to this little measure?',
        source: 'Antony, Julius Caesar III.i' },
    ] },

  { id: 'RH-005', term: 'Epistrophe',
    what: 'The same word or phrase ending several clauses in a row. The mirror of anaphora.',
    note: 'Where anaphora builds forward, this one closes doors. Each clause arrives somewhere different and lands on the same word, so the repetition sounds like a verdict the speaker cannot get away from.',
    examples: [
      { text: 'Shall sleep no more. Macbeth shall sleep no more!”',
        source: 'After the Murder, Macbeth', inApp: true },
      { text: 'of the people, by the people, for the people',
        source: 'Lincoln, Gettysburg Address, 1863 — three endings on the same two words' },
      { text: 'When I was a child, I spake as a child, I understood as a child, I thought as a child',
        source: '1 Corinthians 13:11, King James Bible' },
      { text: 'And ain’t I a woman?',
        source: 'Sojourner Truth, Akron, Ohio, 1851 — the question closes passage after passage' },
      { text: 'For Brutus is an honourable man; So are they all, all honourable men.',
        source: 'Antony, Julius Caesar III.ii' },
    ] },

  { id: 'RH-006', term: 'Epizeuxis',
    what: 'A word repeated immediately, with nothing in between.',
    note: 'The least literary of the figures and the most human: it is what people actually do under pressure. It marks the place where the speaker cannot move on, so resist the urge to vary the two. The sameness is the point.',
    examples: [
      { text: 'O Romeo, Romeo, wherefore art thou Romeo?',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
      { text: 'Howl, howl, howl, howl! O, you are men of stones.',
        source: 'Lear, King Lear V.iii' },
      { text: 'Words, words, words.',
        source: 'Hamlet II.ii' },
      { text: 'Verily, verily, I say unto you',
        source: 'John 3, King James Bible' },
      { text: 'O horror, horror, horror!',
        source: 'Macduff, Macbeth II.iii' },
    ] },

  { id: 'RH-007', term: 'Ploce',
    what: 'A word repeated across a passage, often with a turn on its sense each time. Some handbooks separate this from antanaclasis, where the second use clearly changes meaning; the line between them is not firmly drawn.',
    note: 'It keeps a word in the air and works it. The listener hears the same word arrive with a different weight, which is how a speaker can argue without ever stating the argument.',
    examples: [
      { text: 'O swear not by the moon, th’inconstant moon,',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
      { text: 'Put out the light, and then put out the light.',
        source: 'Othello V.ii — the candle, then her life' },
      { text: 'Let the dead bury their dead.',
        source: 'Matthew 8:22, King James Bible' },
      { text: 'Judge not, that ye be not judged.',
        source: 'Matthew 7:1, King James Bible' },
      { text: 'The king is dead, long live the king.',
        source: 'Traditional acclamation, French court, from 1422' },
    ] },

  { id: 'RH-008', term: 'Antimetabole',
    what: 'Two terms repeated in reverse order, so the second half inverts the first. Often used interchangeably with chiasmus, though chiasmus is the broader term for any mirrored structure.',
    note: 'It sounds like proof. The symmetry implies the two halves have been weighed against each other and the conclusion follows, which is why it is the favourite figure of anyone winning an argument they may not deserve to win.',
    examples: [
      { text: 'the power of beauty will sooner transform honesty from what it is to a',
        source: 'The Nunnery Scene, Hamlet', inApp: true },
      { text: 'Fair is foul, and foul is fair',
        source: 'The witches, Macbeth I.i' },
      { text: 'One for all, and all for one.',
        source: 'Dumas, The Three Musketeers, 1844' },
      { text: 'Ask not what your country can do for you, ask what you can do for your country.',
        source: 'Kennedy, Inaugural Address, 1961' },
      { text: 'Eat to live, and not live to eat.',
        source: 'Proverbial; given to Socrates by Diogenes Laertius' },
    ] },

  { id: 'RH-009', term: 'Apostrophe',
    what: 'Turning away from the people present to address somebody absent, something abstract, or a thing.',
    note: 'It changes who the scene is with. A character who stops talking to the person in front of them and starts talking to Time, or death, or a country, has done something to the person they abandoned, and that abandonment is playable.',
    examples: [
      { text: 'Devouring Time, blunt thou the lion’s paws,',
        source: 'Sonnet 19, line 1', inApp: true },
      { text: 'Blow, winds, and crack your cheeks! rage! blow!',
        source: 'Lear, King Lear III.ii' },
      { text: 'O death, where is thy sting? O grave, where is thy victory?',
        source: '1 Corinthians 15:55, King James Bible' },
      { text: 'Milton! thou shouldst be living at this hour',
        source: 'Wordsworth, London, 1802' },
      { text: 'O Captain! my Captain!',
        source: 'Whitman, 1865' },
    ] },

  { id: 'RH-010', term: 'Erotema',
    what: 'A question asked without expecting an answer. The rhetorical question.',
    note: 'It is an assertion wearing a question mark, and it obliges the listener to supply the answer themselves, which makes them complicit in it. Ask it as a real question and it dies; ask it as a move against somebody and it works.',
    examples: [
      { text: 'Shall I compare thee to a summer’s day?',
        source: 'Sonnet 18, line 1', inApp: true },
      { text: 'If you prick us, do we not bleed?',
        source: 'Shylock, The Merchant of Venice III.i' },
      { text: 'Am I my brother’s keeper?',
        source: 'Genesis 4:9, King James Bible' },
      { text: 'Was this the face that launch’d a thousand ships?',
        source: 'Marlowe, Doctor Faustus, c.1592' },
      { text: 'What is the city but the people?',
        source: 'Sicinius, Coriolanus III.i' },
    ] },

  { id: 'RH-011', term: 'Hyperbole',
    what: 'Deliberate overstatement, not meant to be believed literally.',
    note: 'The size of the exaggeration is the size of the feeling, and a character reaching for it has run out of accurate words. Play the need rather than the scale: a man who says the ocean could not wash his hands clean is not estimating, he is failing to cope.',
    examples: [
      { text: 'Will all great Neptune’s ocean wash this blood',
        source: 'After the Murder, Macbeth', inApp: true },
      { text: 'An hundred years should go to praise Thine eyes',
        source: 'Marvell, To His Coy Mistress, c.1650' },
      { text: 'the world itself could not contain the books that should be written',
        source: 'John 21:25, King James Bible' },
      { text: 'forty thousand brothers Could not, with all their quantity of love, Make up my sum',
        source: 'Hamlet V.i' },
      { text: 'I will do such things— What they are yet I know not, but they shall be The terrors of the earth.',
        source: 'Lear, King Lear II.iv' },
    ] },

  { id: 'RH-012', term: 'Oxymoron',
    what: 'Two contradictory words joined into one phrase.',
    note: 'It holds two feelings at once without resolving them, which is why it turns up whenever somebody is in two states and refuses to choose. The actor who plays only one half of it throws away the reason the phrase exists.',
    examples: [
      { text: 'Good night, good night. Parting is such sweet sorrow',
        source: 'The Balcony, Romeo and Juliet', inApp: true },
      { text: 'darkness visible',
        source: 'Milton, Paradise Lost, 1667' },
      { text: 'I must be cruel, only to be kind.',
        source: 'Hamlet III.iv' },
      { text: 'His honour rooted in dishonour stood',
        source: 'Tennyson, Idylls of the King, 1859' },
      { text: 'O brawling love! O loving hate!',
        source: 'Romeo, Romeo and Juliet I.i' },
    ] },

  { id: 'RH-013', term: 'Paradox',
    what: 'A statement that contradicts itself on the surface and turns out to hold.',
    note: 'Larger than an oxymoron and slower: a whole thought rather than a phrase. It is what a character reaches for when the plain version of the truth would sound like a lie. Hamlet names the device by hand in the middle of using it.',
    examples: [
      { text: 'This was sometime a paradox, but now the time gives',
        source: 'The Nunnery Scene, Hamlet', inApp: true },
      { text: 'The child is father of the man.',
        source: 'Wordsworth, My Heart Leaps Up, 1802' },
      { text: 'Cowards die many times before their deaths; The valiant never taste of death but once.',
        source: 'Caesar, Julius Caesar II.ii' },
      { text: 'whosoever will save his life shall lose it',
        source: 'Matthew 16:25, King James Bible' },
      { text: 'I know one thing: that I know nothing.',
        source: 'Proverbial summary of Socrates, from Plato’s Apology' },
    ] },

  { id: 'RH-014', term: 'Tricolon',
    what: 'Three parallel items in a row, often building in weight.',
    note: 'Three is the number at which a listener hears a pattern and expects completion, which is why the third item lands hardest and why breaking the set of three is such a strong move. If the third is weaker than the second, something is wrong with the reading.',
    examples: [
      { text: '‘Fair, kind, and true,’ is all my argument,',
        source: 'Sonnet 105, line 9', inApp: true },
      { text: 'Friends, Romans, countrymen',
        source: 'Antony, Julius Caesar III.ii' },
      { text: 'I came, I saw, I conquered.',
        source: 'Julius Caesar, reported by Plutarch and Suetonius' },
      { text: 'of the people, by the people, for the people',
        source: 'Lincoln, Gettysburg Address, 1863' },
      { text: 'Life, Liberty and the pursuit of Happiness',
        source: 'Declaration of Independence, 1776' },
    ] },

  { id: 'RH-015', term: 'Epanalepsis',
    what: 'A passage that ends where it began, returning to its opening words.',
    note: 'It frames, and the frame tells you nothing has moved. A speaker who arrives back at their first phrase has argued their way round a circle, and whether that is exhaustion or a trap depends on the scene.',
    examples: [
      { text: 'Tir’d with all these, from these would I be gone,',
        source: 'Sonnet 66, line 13 — the sonnet opens on the same phrase', inApp: true },
      { text: 'Nothing will come of nothing.',
        source: 'Lear, King Lear I.i' },
      { text: 'Blood hath bought blood, and blows have answer’d blows',
        source: 'King John II.i' },
      { text: 'Man’s inhumanity to man Makes countless thousands mourn!',
        source: 'Burns, Man Was Made to Mourn, 1784' },
      { text: 'Common sense is not so common.',
        source: 'Voltaire, Dictionnaire philosophique, 1764' },
    ] },

  { id: 'RH-016', term: 'Stichomythia',
    what: 'Rapid alternating single lines, or fragments of a line, traded between two speakers.',
    note: 'Timing written into the text. The exchange is fast because neither speaker is leaving room, and pauses inserted between the fragments turn a scene of two frightened people into two people having a chat. See also the lesson on shared lines.',
    examples: [
      { text: 'Did not you speak?',
        source: 'After the Murder, Macbeth', inApp: true },
      { text: 'Hamlet, thou hast thy father much offended. / Mother, you have my father much offended.',
        source: 'Hamlet III.iv' },
      { text: 'I would I knew thy heart. / ’Tis figur’d in my tongue.',
        source: 'Richard III I.ii' },
      { text: 'Wilt thou go with me? / No. / What wilt thou do? / Die.',
        source: 'The pattern of the Antigone and Creon exchanges, Sophocles, c.441 BC' },
      { text: 'Art thou not Romeo, and a Montague? / Neither, fair saint, if either thee dislike.',
        source: 'Romeo and Juliet II.ii' },
    ] },

  { id: 'RH-017', term: 'Aposiopesis',
    what: 'A sentence broken off before it finishes, usually because the speaker cannot or will not complete it.',
    note: 'The break is the event. Something has interrupted the thought from inside, and the actor has to know what: a sound, a fear, a thing they decided not to say. Lady Macbeth interrupts her own sentence twice in one line, and both breaks are her listening.',
    examples: [
      { text: 'Confounds us.—Hark!—I laid their daggers ready;',
        source: 'After the Murder, Macbeth', inApp: true },
      { text: 'I will have such revenges on you both That all the world shall—I will do such things—',
        source: 'Lear, King Lear II.iv' },
      { text: 'Quos ego—',
        source: 'Neptune, Virgil, Aeneid I, c.19 BC — the textbook instance, a threat too large to finish' },
      { text: 'Why, you—! But no. I will say nothing.',
        source: 'The common stage shape of the figure, after Lear and Neptune' },
      { text: 'But break, my heart, for I must hold my tongue.',
        source: 'Hamlet I.ii' },
    ] },

];

export const RHETORIC_BY_ID = id => RHETORIC.find(r => r.id === id) ?? null;
