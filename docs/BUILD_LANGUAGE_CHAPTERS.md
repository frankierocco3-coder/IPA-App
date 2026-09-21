# BUILD — The Words They Choose / Three Ways to Move Someone

Status: **PARKED by owner order 2026-09-15 — a potentiality, not a
plan. The owner read the drafts and chose to hold them. Do NOT install
without a fresh owner go-ahead; the copy below is ready if that comes.**
Author: Tess (house copy — no em dashes, no contractions, typographic
quotes; no practitioner names in bodies).
Date: 2026-09-15.

## What these are

Two Acting chapters distilled from the on-mission threads of the
Bonhoeffer/stupidity video the owner shared: the hollow-language essay
tradition (euphemism and cliché as evidence) and the classical three
appeals (logos, ethos, pathos), both refracted through the craft lens.
Everything political, historical and name-driven in the source video is
deliberately left out.

## Placement

1. **The Words They Choose** — Module 2 · Investigating the Text,
   `order: 10` (after Subtext; Playable Actions moves 10 → 11 —
   numbering updated 2026-09-16 after Finding the Objective shipped as
   2.8). Reading a
   character's softened language as evidence is text investigation.
   Id: `ac-wordschoice`. Shelf: the `scene` collection, after subtext.
2. **Three Ways to Move Someone** — Module 3 · Listening and
   Responding, `order: 7` (closes the module, after Playing the
   Objective). The appeals are tactic families aimed at the partner.
   Id: `ac-appeals`. Shelf: the `rehearsal` collection? No — module 3
   lessons shelve in `principles`/`rehearsal` split; ac-attention and
   ac-receiving sit in `principles`; the later module-3 lessons sit in
   `rehearsal`. Slot `ac-appeals` into `rehearsal` after `ac-playing`.

Both `requiredReviewer: 'acting-professional'`; owner-approved ledger
entries on install (standard badge-route wording); suite pins move
46 → 48 path lessons, 54 → 56 records, 58 → 60 published items.

## Credit debt

Sources & Credits batch grows by two: Aristotle (Rhetoric — the three
appeals) and George Orwell (Politics and the English Language — the
euphemism and cliché analysis). Neither is named in the bodies.

## Chapter 1 — The Words They Choose

```js
{ id: 'ac-wordschoice', module: 'text', order: 10,
  title: 'The Words They Choose',
  requiredReviewer: 'acting-professional',
  objective: 'Read a character’s euphemisms and clichés as evidence of what they cannot afford to say.',
  orientation: 'Nobody says “we had to make some difficult decisions” by accident. Softened language is a choice, and choices are evidence.',
  reflection: 'Find one softened phrase in your script. What is the hard sentence underneath it, and why can this character not say that sentence?',
  body: [
    { p: 'Language hides as much as it reveals. A euphemism is a soft word laid over a hard fact: “necessary sacrifices” for “you will be worse off”, “letting you go” for “you are fired”, “we grew apart” for something much more specific and much more painful. A cliché is different but related: a ready-made phrase reached for so the speaker does not have to build a thought of their own.' },
    { p: 'Writers know this. When a character reaches for a euphemism, the writer put it in their mouth, and the question is why. Softened language marks the exact spot where a character cannot afford the plain sentence: too cruel, too costly, too revealing, too final. The gap between the soft words and the hard fact underneath them is subtext with a paper trail.' },
    { h: 'Reading the evidence' },
    { list: [
      'Euphemisms: name the hard fact being softened, and who the softening protects. It is not always the listener.',
      'Clichés: mark where the character stops thinking and starts reciting. Recitation is a behavior, and it has causes.',
      'Plain speech: notice what this character says directly that everyone around them will not. That contrast is characterization.',
      'The shift: the moment softened language turns plain, or plain language goes soft. That moment is almost always a beat.',
    ] },
    { p: 'The shift is the gold. A character who has spoken in company language for two acts and then says one short, plain, terrible sentence has changed in front of the audience, and the writer built that change into the diction long before the plot caught up. Find the shift and you have found a turn worth playing.' },
    { h: 'Your own habit' },
    { p: 'The same discipline applies to your own speech about the work. “It felt off” is a cliché; it names nothing and helps nobody. “I stopped listening after her line because I was preparing mine” is the real thing, and it can be worked on. Rehearsal notes, feedback, self-assessment: say the concrete sentence. An actor who practices naming the real thing in the rehearsal room gets visibly better at spotting characters who are built to avoid it.' },
    { p: 'Precision is not pedantry. The audience never hears your analysis, but they feel its absence. An actor who knows exactly which fact the euphemism is hiding can play the hiding, and hiding, unlike vagueness, is an action.' },
  ] },
```

## Chapter 2 — Three Ways to Move Someone

```js
{ id: 'ac-appeals', module: 'listening', order: 7,
  title: 'Three Ways to Move Someone',
  requiredReviewer: 'acting-professional',
  objective: 'Recognize the three appeals a character can use to move another person: argument, standing, and feeling.',
  orientation: 'Nobody is persuaded by logic alone, on stage or off. There are three levers, and characters pull all three.',
  reflection: 'In your scene, which appeal does your character lead with? And which one do they reach for when the first one fails?',
  body: [
    { p: 'Classical rhetoric sorted persuasion into three appeals, and the sorting has never been improved on. Argument, called logos: the case itself, reasons and evidence. Standing, called ethos: who the speaker is to the listener, and whether that person is trusted, owed, feared or loved. Feeling, called pathos: what the words stir, from pity to pride to dread.' },
    { p: 'Watch any strong scene and you can mark which lever is being pulled. One character lays out the reasons. Another says “after everything I have done for you”, which is not a reason at all; it is standing, presented for payment. A third skips both and paints what tomorrow looks like if the listener refuses. Same objective, three entirely different pursuits.' },
    { h: 'Why this matters to pursuit' },
    { list: [
      'The three appeals are three families of tactic for one objective. “Convince her to stay” can be argued, invoked or evoked, and each is a different scene.',
      'The appeal a character chooses reveals the relationship. People argue facts with an equal, pull rank where they have it, and reach for feeling when they have nothing else to spend.',
      'A beat turn is often a change of appeal. The reasons fail, and suddenly the character is talking about loyalty, or fear. Mark those switches; they are the scene moving.',
    ] },
    { p: 'There is a listening side to this too. In a scene you are not only the speaker; you are also the one being moved, and the appeal that actually lands on your character is characterization. A person who is immune to excellent reasons but melts at one mention of loyalty has just been described precisely, without a word of biography.' },
    { p: 'None of this is cynicism. Every real conversation runs on all three appeals at once, and naming them is not a trick; it is resolution. The actor who can say “this speech is standing, not argument, and it collapses into feeling at the turn” has something exact to play, where “be persuasive” offers nothing at all.' },
  ] },
```

## Install checklist (on approval)

1. `js/data/acting/acting-course.js` — insert both records; `ac-actions` moves
   to `order: 11`; add `'ac-wordschoice'` to the `scene` collection
   after `'ac-subtext'` and `'ac-appeals'` to the `rehearsal`
   collection after `'ac-playing'`.
2. `js/data/speech/reviews.js` — two owner-approved entries, standard
   no-specialist wording.
3. Sources & Credits batch — Aristotle (Rhetoric), George Orwell
   (Politics and the English Language).
4. Suite pins: 46 → 48 path lessons, 54 → 56 records, 58 → 60 items;
   acting shelf order string unchanged in keys (collections only
   reorder internally by lesson list, which is not pinned).
5. Gates + full suite; push only on "push it".
