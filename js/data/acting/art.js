// Acting lesson figures — owner-supplied illustrations (2026-09-21 intake;
// source WebP from the owner, shipped as baseline JPEG q90 like every other
// drawing in the app). Referenced from acting chapter bodies via
// { fig: '<key>' } blocks, the same shape Speech chapters use with
// voice-art.js. A figure sits under the same review status as the chapter
// that carries it.
//
// Captions are learner copy: house style, no em dashes, no contractions.
// Alt text describes what is in the picture for a reader who cannot see
// it, not what the lesson wants them to conclude from it.

const DIR = 'img/lessons/';

export const ACTING_FIGURES = {
  'fourth-wall-theatre': {
    title: 'The fourth wall: the theatre',
    file: 'fourth-wall-theatre.jpg',
    alt: 'A theatre seen from the audience. Through a proscenium arch framed by red curtains, a realistic living-room set has three walls, a sofa, a window and a doorway. A young man and a young woman stand talking in the middle of the room. Rows of people sit in the dark in front of the stage, looking into the room through its open front.',
    caption: 'What the building is. A stage, a room with its front wall missing, and an audience sitting where that wall should be.',
  },
  'fourth-wall-house': {
    title: 'The fourth wall: the room you play',
    file: 'fourth-wall-house.jpg',
    alt: 'The same living room and the same two people, now seen from the garden of a real house, through a large front window framed by trees and flowering shrubs. The room is complete, and the two of them are absorbed in their conversation.',
    caption: 'What you play. The same room, whole, inside a real house. The fourth wall is there, and the life behind it goes on whether anyone is looking in or not.',
  },
};

export const actingFigure = key =>
  (ACTING_FIGURES[key] ? { ...ACTING_FIGURES[key], src: DIR + ACTING_FIGURES[key].file } : null);
