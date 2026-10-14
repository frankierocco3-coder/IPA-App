// Shakespeare course figures. Owner-supplied, intake 2026-10-14. Same
// mechanism as js/data/acting/art.js and js/data/character/art.js: a
// { fig: '<key>' } block in a lesson body names an entry here, and a key
// with no entry renders NOTHING rather than a broken image, so an entry is
// added only once its file ships in img/lessons/shakespeare/.
//
// THESE ARE PNG, NOT JPEG, AND THAT IS THE ONE DEPARTURE. Every other
// drawing in img/lessons/ is a full illustration with its own background and
// ships as baseline JPEG. These are cutouts on transparency, drawn in the
// icon style, and they are meant to sit on the page colour rather than in a
// box of their own. JPEG cannot carry the alpha, so the format follows the
// artwork. They are quantised to a 256-colour palette, which is visually
// lossless on flat illustration and holds them near the 268KB average of the
// commedia plates rather than at the 1.6MB they arrived as.
//
// Captions are learner copy in house style. Alt text describes what is in
// the picture, not what the lesson concludes from it.

const DIR = 'img/lessons/shakespeare/';

export const SHAKESPEARE_FIGURES = {
  // Illustrates sh-quartos. The point the picture has to carry is SIZE and
  // CHEAPNESS: a play in his lifetime was a thin stitched pamphlet, and the
  // grand volume did not exist until he had been dead seven years. Three
  // separate slight objects say that better than any one of them would.
  //
  // The three titles are well chosen and not arbitrary: all three were
  // printed in quarto around 1600, and the named author on the Henry IV
  // sheet is right for that date rather than an anachronism, since his name
  // began appearing on title pages from the late 1590s. Earlier quartos were
  // commonly anonymous, which the lesson says and this picture does not
  // contradict, because none of these is an early one.
  //
  // It is a stylised illustration, not a facsimile. A real title page of the
  // period is far denser, carrying a long descriptive title, the printer,
  // the bookseller and the address. The caption says so rather than letting
  // a reader take this for a photograph of the thing.
  'sh-quartos-sheets': {
    title: 'Plays as they were first printed',
    file: 'quartos.png',
    w: 1024, h: 1024,
    alt: 'Three loose printed sheets lying overlapped on top of one another, their corners worn and their edges foxed and stained. Each carries a title in large dark type under a band of green and red floral ornament: Much Ado About Nothing, A Midsummer Night’s Dream, and in front Henry IV Part Two, which also names William Shakespeare and has the word London at its foot.',
    caption: 'A play in his lifetime was sold like this, as a thin stitched pamphlet of a few leaves, not as a book. A stylised illustration rather than a facsimile: a real title page of the period is far denser, and carries the printer, the bookseller and the address as well as the title.',
  },
};

export const shakespeareFigure = key =>
  (SHAKESPEARE_FIGURES[key] ? { ...SHAKESPEARE_FIGURES[key], src: DIR + SHAKESPEARE_FIGURES[key].file } : null);
