// Further Reading — the books and the people, per course.
//
// Owner order 2026-10-12: "i want a reference list in more for each separate
// course of books and people to read and research."
//
// ── WHY THIS DOES NOT BREAK THE NO-NAMES RULE ─────────────────
// The house rule is NO PRACTITIONER NAMED IN A LESSON BODY, and it holds.
// Meisner, Bogosian and the rest stay out of the chapters. This is the
// same category as Sources & Credits, which has always named Jowett,
// Saunders, Scala, Andreini, Perrucci, Wells and Cruttenden without
// controversy. The rule keeps names out of the teaching; it was always
// going to need a page where they are credited properly, and this is it.
//
// ── IT IS NOT SOURCES & CREDITS, AND THE DIFFERENCE MATTERS ───
// Sources & Credits answers "where did this claim come from" and carries
// publishers, translators and licences because it is a citation list.
// This answers "where do I go next" and deliberately does not: a reading
// list wants the author, the book and the reason, and a publisher is
// noise in that sentence. Where the two overlap, this one points AT the
// credits page rather than restating it.
//
// ── ACTING IS NOT IN THIS FILE, ON PURPOSE ───────────────────
// js/data/acting/approaches.js already carries a full bibliography for
// Stanislavski, Adler, Meisner and Michael Chekhov. All four are
// owner-approved and live. The `sources` field was referenced in exactly
// ONE place in the whole app — the owner's #review inventory — so four
// checked bibliographies were sitting in the data where no reader could
// ever reach them. The page reads them from there and does NOT copy them:
// linked, never duplicated, the same rule the Shared cards follow. Edit
// an approach's sources and this page changes with it.
//
// ── TWO COURSES HAVE NOTHING, AND SAY SO ─────────────────────
// Shakespeare and Voice & Speech name no practitioner anywhere in the
// repository. Rather than invent two plausible reading lists, they carry
// an honest empty state. Voice & Speech having none is the same fact as
// it being the course that most needs a specialist reviewer and has never
// had one, which is worth a reader knowing.
// DO NOT FILL THESE IN WITH A GENERIC LIST. If a name goes here it is
// because the course actually draws on it.
//
// ── SHAPE ─────────────────────────────────────────────────────
//   id       'FR-<course key>'. Matches the workspace id where one exists.
//   title    the course, as the workspace names it.
//   lead     one sentence on what this course owes to.
//   entries  { who, what, why } — the person, the way in, and what you
//            would go to them FOR. The `why` is the whole point: a bare
//            bibliography tells a reader nothing about where to start.
//   pointer  OPTIONAL. Sends the reader somewhere in the app instead of
//            listing again. Used by Accents, whose thirteen references are
//            already on the credits page in full.
//   empty    OPTIONAL. The honest statement when a course has no named
//            sources. Mutually exclusive with entries.
//
// NOT APPROVED. The `why` lines are editorial judgement about what a
// reader would go to a book for, written by Claude, and no specialist has
// checked them.

export const FURTHER_READING = [

  // Acting is assembled at render time from ACTING_APPROACHES. It appears
  // in the page before this list and is not represented here.

  { id: 'FR-character', title: 'Building a Character',
    lead: 'A course about inventing a person, playing a role you have been handed, and the ready-made characters of the commedia.',
    entries: [
      { who: 'Eric Bogosian',
        what: '“Building Character: My Method for Creating the Solos”, the afterword to Wake Up and Smell the Coffee',
        why: 'The method behind the final module: build from people you have actually watched, out loud, before you write anything down.' },
      { who: 'Flaminio Scala',
        what: 'Il teatro delle favole rappresentative (1611)',
        why: 'Fifty scenarios as the companies actually used them. The nearest thing to seeing the shape of a commedia performance from the inside.' },
      { who: 'Francesco Andreini',
        what: 'Le bravure del Capitano Spavento (1607)',
        why: 'One performer’s published stock of material for a single mask. Read it for how much a character is a collection of prepared pieces.' },
      { who: 'Andrea Perrucci',
        what: 'Dell’arte rappresentativa premeditata e all’improvviso (1699)',
        why: 'A treatise on acting from a script and acting improvised, by somebody who did both, and the earliest description of the principal masks.' },
    ] },

  { id: 'FR-shakespeare', title: 'Shakespeare',
    lead: 'The language, the verse, and the text that is harder to read than it is to play.',
    empty: 'This course names no practitioner. Its claims come from the plays and the sonnets themselves, which the app carries in full, and from the standard editorial apparatus rather than from any one teacher. That is a gap rather than a principle: a verse teacher or a Shakespeare scholar reviewing this course would almost certainly add to this page, and nobody has yet.' },

  { id: 'FR-rhetoric', title: 'Rhetoric',
    lead: 'How speech changes what people think and do. Nearly every text this course leans on is ancient, out of copyright, and in the app already. One exception is listed last, it is modern, it is in print, and it is here because of how often it is quoted backwards.',
    entries: [
      { who: 'Aristotle',
        what: 'Rhetoric, and Sophistical Refutations',
        why: 'The three appeals, the three occasions and the five canons come from the first. The thirteen fallacies are the whole of the second, and the division into those that depend on language and those that do not is his.' },
      { who: 'Plato',
        what: 'Gorgias and Phaedrus',
        why: 'The case against rhetoric, made better than anybody has made it since. Read Gorgias if you are ever tempted to think this craft is neutral.' },
      { who: 'Arthur Schopenhauer',
        what: 'The Art of Controversy, translated by T. Bailey Saunders',
        why: 'Thirty-eight ways to win an argument you deserve to lose. Short, nasty, and the shelf of that name is drawn from it.' },
      { who: 'Anonymous',
        what: 'The Thirty-Six Stratagems (三十六計)',
        why: 'A Chinese military text rather than a rhetorical one, and on the shelf here because deception does not change much between a battlefield and a meeting.' },
      { who: 'David Robson',
        what: 'The Intelligence Trap (2019). In print, and the only modern book on this page.',
        why: 'It argues that intelligence, education and expertise make a person more prone to certain errors rather than less, and it says so to the reader rather than about the reader’s opponents. It is cited constantly as proof that other people are fools, which is the reverse of the book. Worth reading for the habits it names: being better at building a case for what you already believe, seeing everybody’s distortions except your own, and treating a qualification as permission to stop listening.' },
    ] },

  { id: 'FR-speech', title: 'Voice & Speech',
    lead: 'The instrument, the sounds, and the alphabet of speech.',
    empty: 'This course names no practitioner, and that is worth stating plainly rather than hiding. Its anatomy and vocal-health material is written from general reference and has never been checked by a voice professional or a speech-language pathologist. It is the course on which this app most needs a specialist and has least to show, and a reading list assembled without one would be a guess dressed as a recommendation.' },

  { id: 'FR-accents', title: 'Accents & Dialects',
    lead: 'Each course follows a published description of its accent, and those are cited in full rather than summarised.',
    pointer: { label: 'The thirteen references are on Sources & Credits', section: 'credits' } },

];

export const furtherReadingById = id => FURTHER_READING.find(f => f.id === id) ?? null;
