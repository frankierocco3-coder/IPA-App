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
//   example  a VERBATIM line from a text this app already carries
//   source   where that line lives, as a reader would look for it
//
// EVERY EXAMPLE IS VERIFIABLE. The lines come from the 154 sonnets and
// the eight Shakespeare scenes on the Scenes shelf, and the suite checks
// each one against that corpus, the same discipline the Script Analysis
// records use for their 347 quotations. Nothing here is invented, and no
// example is quoted from a text the reader cannot open in this app.
//
// HOUSE STYLE applies to `what` and `note`. It does NOT apply to
// `example` or `source`: quotations keep the edition's own spelling and
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
    example: 'To be, or not to be, that is the question:',
    source: 'The Nunnery Scene, Hamlet' },

  { id: 'RH-002', term: 'Anaphora',
    what: 'The same word or phrase beginning several clauses or lines in a row.',
    note: 'It builds. Each repetition says the speaker has not finished and the list is not exhausted, which is why it is the engine of accusation and complaint. The pressure on the listener comes from the count, so do not decorate each item differently: let them accumulate.',
    example: 'And needy nothing trimm’d in jollity,',
    source: 'Sonnet 66, line 3 — ten of its lines begin with “And”' },

  { id: 'RH-003', term: 'Polysyndeton',
    what: 'Conjunctions kept in where they could be dropped, so items are chained rather than listed.',
    note: 'It makes a list feel endless, because every “and” promises another one. Useful when a character is overwhelmed by the sheer number of things, and it is the reason Sonnet 66 feels like a man running out of patience rather than making a case.',
    example: 'And gilded honour shamefully misplac’d,',
    source: 'Sonnet 66, line 5' },

  { id: 'RH-004', term: 'Asyndeton',
    what: 'Conjunctions removed, so items arrive one after another with nothing between them.',
    note: 'The opposite pressure to polysyndeton. It is fast and it sounds out of control, because nothing is joining the items up. A speaker using it has stopped organising and started piling.',
    example: 'Is perjur’d, murderous, bloody, full of blame,',
    source: 'Sonnet 129, line 3' },

  { id: 'RH-005', term: 'Epistrophe',
    what: 'The same word or phrase ending several clauses in a row. The mirror of anaphora.',
    note: 'Where anaphora builds forward, this one closes doors. Each clause arrives somewhere different and lands on the same word, so the repetition sounds like a verdict the speaker cannot get away from.',
    example: 'Shall sleep no more. Macbeth shall sleep no more!”',
    source: 'After the Murder, Macbeth' },

  { id: 'RH-006', term: 'Epizeuxis',
    what: 'A word repeated immediately, with nothing in between.',
    note: 'The least literary of the figures and the most human: it is what people actually do under pressure. It marks the place where the speaker cannot move on, so resist the urge to vary the two. The sameness is the point.',
    example: 'O Romeo, Romeo, wherefore art thou Romeo?',
    source: 'The Balcony, Romeo and Juliet' },

  { id: 'RH-007', term: 'Ploce',
    what: 'A word repeated across a passage, often with a turn on its sense each time. Some handbooks separate this from antanaclasis, where the second use clearly changes meaning; the line between them is not firmly drawn.',
    note: 'It keeps a word in the air and works it. The listener hears the same word arrive with a different weight, which is how a speaker can argue without ever stating the argument.',
    example: 'O swear not by the moon, th’inconstant moon,',
    source: 'The Balcony, Romeo and Juliet' },

  { id: 'RH-008', term: 'Antimetabole',
    what: 'Two terms repeated in reverse order, so the second half inverts the first. Often used interchangeably with chiasmus, though chiasmus is the broader term for any mirrored structure.',
    note: 'It sounds like proof. The symmetry implies the two halves have been weighed against each other and the conclusion follows, which is why it is the favourite figure of anyone winning an argument they may not deserve to win.',
    example: 'the power of beauty will sooner transform honesty from what it is to a bawd than the force of honesty can translate beauty into his likeness',
    source: 'The Nunnery Scene, Hamlet' },

  { id: 'RH-009', term: 'Apostrophe',
    what: 'Turning away from the people present to address somebody absent, something abstract, or a thing.',
    note: 'It changes who the scene is with. A character who stops talking to the person in front of them and starts talking to Time, or death, or a country, has done something to the person they abandoned, and that abandonment is playable.',
    example: 'Devouring Time, blunt thou the lion’s paws,',
    source: 'Sonnet 19, line 1' },

  { id: 'RH-010', term: 'Erotema',
    what: 'A question asked without expecting an answer. The rhetorical question.',
    note: 'It is an assertion wearing a question mark, and it obliges the listener to supply the answer themselves, which makes them complicit in it. Ask it as a real question and it dies; ask it as a move against somebody and it works.',
    example: 'Shall I compare thee to a summer’s day?',
    source: 'Sonnet 18, line 1' },

  { id: 'RH-011', term: 'Hyperbole',
    what: 'Deliberate overstatement, not meant to be believed literally.',
    note: 'The size of the exaggeration is the size of the feeling, and a character reaching for it has run out of accurate words. Play the need rather than the scale: a man who says the ocean could not wash his hands clean is not estimating, he is failing to cope.',
    example: 'Will all great Neptune’s ocean wash this blood',
    source: 'After the Murder, Macbeth' },

  { id: 'RH-012', term: 'Oxymoron',
    what: 'Two contradictory words joined into one phrase.',
    note: 'It holds two feelings at once without resolving them, which is why it turns up whenever somebody is in two states and refuses to choose. The actor who plays only one half of it throws away the reason the phrase exists.',
    example: 'Good night, good night. Parting is such sweet sorrow',
    source: 'The Balcony, Romeo and Juliet' },

  { id: 'RH-013', term: 'Paradox',
    what: 'A statement that contradicts itself on the surface and turns out to hold.',
    note: 'Larger than an oxymoron and slower: a whole thought rather than a phrase. It is what a character reaches for when the plain version of the truth would sound like a lie. Hamlet names the device by hand in the middle of using it.',
    example: 'This was sometime a paradox, but now the time gives',
    source: 'The Nunnery Scene, Hamlet' },

  { id: 'RH-014', term: 'Tricolon',
    what: 'Three parallel items in a row, often building in weight.',
    note: 'Three is the number at which a listener hears a pattern and expects completion, which is why the third item lands hardest and why breaking the set of three is such a strong move. If the third is weaker than the second, something is wrong with the reading.',
    example: '‘Fair, kind, and true,’ is all my argument,',
    source: 'Sonnet 105, line 9' },

  { id: 'RH-015', term: 'Epanalepsis',
    what: 'A passage that ends where it began, returning to its opening words.',
    note: 'It frames, and the frame tells you nothing has moved. A speaker who arrives back at their first phrase has argued their way round a circle, and whether that is exhaustion or a trap depends on the scene.',
    example: 'Tir’d with all these, from these would I be gone,',
    source: 'Sonnet 66, line 13 — the sonnet opens on the same phrase' },

  { id: 'RH-016', term: 'Stichomythia',
    what: 'Rapid alternating single lines, or fragments of a line, traded between two speakers.',
    note: 'Timing written into the text. The exchange is fast because neither speaker is leaving room, and pauses inserted between the fragments turn a scene of two frightened people into two people having a chat. See also the lesson on shared lines.',
    example: 'Did not you speak?',
    source: 'After the Murder, Macbeth' },

  { id: 'RH-017', term: 'Aposiopesis',
    what: 'A sentence broken off before it finishes, usually because the speaker cannot or will not complete it.',
    note: 'The break is the event. Something has interrupted the thought from inside, and the actor has to know what: a sound, a fear, a thing they decided not to say. Lady Macbeth interrupts her own sentence twice in one line, and both breaks are her listening.',
    example: 'Confounds us.—Hark!—I laid their daggers ready;',
    source: 'After the Murder, Macbeth' },

];

export const RHETORIC_BY_ID = id => RHETORIC.find(r => r.id === id) ?? null;
