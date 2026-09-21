# BUILD — Using the Fourth Wall

Status: **draft copy awaiting the owner's read. Nothing installed.**
Author: Tess (house copy, not verbatim owner copy — house style applies:
no em dashes, no contractions, typographic quotes).
Date: 2026-09-14.

## What this is

One new Acting chapter on the fourth wall as a **used, imagined surface**:
the convention that the open side of a realistic set is still part of the
character's world, and the craft of actually living behind it. Explicitly
NOT about breaking the wall or direct address — the copy says so up front.

## Placement

* **Module 6 · Preparing the Performance**, new `order: 6` — after
  "Applying Technique in a Scene" (5), before "Taking the Work Into
  Performance" (which moves 6 → 7). The wall is built in rehearsal and
  used in performance, so it sits on the bridge between the two.
* Library shelf: `rehearsal` collection ("Actions & Rehearsal"), inserted
  before `ac-performance`.
* New id: `ac-fourthwall`. Ids never collide with anything shipped.
* `requiredReviewer: 'acting-professional'` like every acting chapter;
  no reviews-ledger entry, so it ships as a visible draft exactly like
  the rest of the course.

## Review / credit debt

No practitioner names appear in the body (house rule). The ideas lean on
the standard lineage — points of attention on an imagined wall and public
solitude (Stanislavski), the mirror/object exercises (Uta Hagen) — so
**Sources & Credits needs two entries** when this installs. That joins the
existing sign-off batch.

## Glossary addition (ACTING_GLOSSARY)

```
'fourth-wall': { term: 'The fourth wall',
  def: 'The imagined wall along the open side of the stage, treated as part of the character's world. Built in rehearsal with specific objects at specific distances, so the actor has somewhere real to look.' },
```

(Install note: the apostrophe in "character's" must be the typographic
one in source, matching the rest of the glossary.)

## The lesson record

```js
{ id: 'ac-fourthwall', module: 'performance', order: 6,
  title: 'Using the Fourth Wall',
  requiredReviewer: 'acting-professional',
  objective: 'Treat the open side of the stage as part of the character's world, with real places to look and real distances to focus.',
  orientation: 'The fourth wall is not there to be broken. On most nights it is there to be used.',
  reflection: 'Take a scene you know that happens indoors. What is on the fourth wall, exactly where, and how far away?',
  glossary: ['fourth-wall'],
  body: [
    { p: 'A realistic set has three walls. The fourth one, the one that would complete the room, is missing, and the audience sits where it belongs. The convention says: for the character, the wall is still there. The room is whole. The character can lean near it, glance at it, stare out of a window in it, and never once notice the several hundred people breathing where the wallpaper should be.' },
    { p: 'This chapter is not about breaking that wall. Direct address, the aside, the confidant speech to the house: those are real tools, and some plays are built on them, but they are a different subject. This is the ordinary night in a realistic play, where the wall stays up and the actor has to live behind it. Used well, the fourth wall is not a limitation to be coped with. It is a quarter of the character's world that happens to be invisible, and it is yours to furnish.' },
    { h: 'Build the wall before you need it' },
    { p: 'A wall you have not built is a wall you cannot use, and the failure is visible. Eyes with nowhere to land drift across the house, focus on nothing, or lock politely into the middle distance, and every one of those reads from the back row. So build it in rehearsal, as deliberately as the designer built the other three. Decide what is on it and where. Then keep it there, every run, every night.' },
    { list: [
      'A window, and, more important, what the character sees through it.',
      'Something at eye level with a history: a mirror, a photograph, a clock the character has looked at ten thousand times.',
      'Something small and specific: a stain, a crack, a nail where a picture used to hang.',
      'The agreed geography: if there is a window, everyone in the company looks through it in the same place.',
    ] },
    { p: 'Specificity is the whole trick. “The wall” gives your attention nothing to do. “The damp patch above the light switch that has been spreading all winter” gives it a job, and attention with a job is what an audience reads as belief.' },
    { h: 'The eyes give it away' },
    { p: 'The difference between a real fourth wall and a faked one is focus. Eyes focused twenty feet out, on actual faces in the fifth row, look like exactly what they are. A view through a window is focused far beyond the back wall of the theatre. A mirror is focused at roughly twice your distance from the glass, because that is where the reflection lives. A clock is focused at ten feet. Give every object on your wall its distance, and let your eyes do what eyes do at that distance. Get this right and the audience believes the object without being told. Let your focus land on the house instead, and the wall comes down without a word being spoken.' },
    { h: 'Private in public' },
    { p: 'What the wall finally buys is privacy. A character alone on stage is supposed to be genuinely alone: thinking, deciding, doing the unguarded things people only do when nobody is watching, while several hundred people watch. That is only possible when your attention has somewhere to live inside the world of the play. The window, the mirror, the photograph: these are not decoration, they are where a private person's attention actually goes. The moment some part of you checks the audience instead, the privacy is gone, and the audience feels the difference before they could name it.' },
    { h: 'What using it buys you' },
    { list: [
      'Cheating out stops being a stage direction and starts having a reason: the interesting thing is out there.',
      'Blocking opens up, because the downstage quarter of the room is playable space instead of a cliff edge.',
      'Solo scenes have somewhere to happen: business at the mirror, a watch kept at the window, a letter read in the best light in the room.',
      'The beginner tells disappear: the dead middle-distance stare, the eyes scanning the exit signs, the guilty flick down to the front row.',
    ] },
    { p: 'One classic rehearsal problem makes a useful private drill: do something real in an imaginary mirror hanging in the middle of the audience. Fix your hair. Check your collar. Practice until your focus sits at the reflection's distance and the task is genuinely absorbing. An observer should be able to tell where the mirror hangs, and they should never once catch your eye.' },
    { p: 'None of this seals you off from the house. The audience still gets your voice, your face and most of your body precisely because the missing wall is missing. The convention is a trade: the theatre removes a wall so they can see in, and you rebuild it in imagination so there is something worth seeing.' },
  ] },
```

## Install checklist (on approval)

1. `js/data/acting/acting-course.js` — insert the record; bump `ac-performance`
   to `order: 7`; add `'fourth-wall'` to `ACTING_GLOSSARY`; add
   `'ac-fourthwall'` to the `rehearsal` collection before
   `'ac-performance'`.
2. Sources & Credits — add the Stanislavski and Hagen entries.
3. Suite pins — acting lesson count and any module/collection count pins
   move up by one; run the five gates + full browser suite.
4. Push only on the owner's "push it".
