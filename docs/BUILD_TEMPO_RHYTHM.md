# Building a Character — Module 4 of The Actor's Work

Design proposal. Nothing built yet. Structure is here to be argued with.

Owner decision: **not a separate workspace.** Building a Character goes inside
Acting, as a module in the course that already exists.

---

## Why it belongs there

The Acting course is already a real four-module, 35-lesson arc:

| # | Module | Lessons | What it does |
|---|---|---:|---|
| 1 | The Actor's Work | 8 | Off book, then circumstances, objective, obstacle, stakes, urgency |
| 2 | Investigating the Text | 8 | What the scene actually gives you: facts, relationship, beats, subtext, actions |
| 3 | Listening and Responding | 6 | The live half: receiving before answering |
| 4 | Preparing the Performance | 6 | Monologue, scene, rehearsal, into the room |

Read as an arc there is a hole in it. You establish the situation, you read the
text, you learn to receive the other actor, and then you go straight to
rehearsal. Nowhere do you build the person who is doing all that.

**Building a Character becomes the new Module 4**, and Preparing the Performance
moves to 5. The arc then reads: situation, text, listening, **the person**,
performance.

The argument that decided it is the script. Character work and scene work happen
on the same text in the same sitting. Separating them into different workspaces
would make an actor switch context to move between "what am I doing to her in
this line" and "what is my tempo-rhythm here" on the same speech, on the same
rail. That is friction paid every session for an organisational benefit that is
mostly cosmetic.

Two supporting reasons. A workspace is a promise of five populated sections, and
Speech is withdrawn right now because that promise was made and could not be
filled. And the consistency debt already on the to-do list gets worse with a
fifth workspace, not better.

---

## Provenance

The thinking comes from Stanislavski, *Building a Character*, chapters 11 and 12.
Ideas are not copyrightable; the Elizabeth Reynolds Hapgood translation is, and
stays in copyright into the 2040s. **Every word Speechcraft ships is original
prose** with Stanislavski credited as the source, the way the Acting Library
already handles its sources. Nothing is reproduced or paraphrased line by line.

`requiredReviewer: 'acting-professional'`, the same tier every other Acting
lesson already carries. This is craft, not anatomy, so it does not need the voice
professional who gates the articulation guides.

---

## The module

Seven lessons, which sits naturally beside the existing 8 / 8 / 6 / 6.

| # | Lesson | What the learner leaves with |
|---|---|---|
| 4.1 | The Four Lists | Already built. Becomes the module's entry point rather than a loose Library tile |
| 4.2 | Two Dials, Not One | Can separate tempo from rhythm and say which one is wrong |
| 4.3 | Rhythm Reaches Feeling | Understands why rhythm gets to feeling when instruction cannot, and why it dies without circumstances |
| 4.4 | Two Rhythms at Once | Can mark an inner and an outer rhythm and play the gap between them |
| 4.5 | Harmony, Not Unison | Hears a scene as separate rhythms sounding together, and knows unison is an effect |
| 4.6 | Notes and Rests | Treats pauses as rhythm rather than absence |
| 4.7 | The Two Missing Speeds | Has a method for sustained legato and for real patter |

**The Four Lists stays exactly where it is** in the Acting Library. Lesson 4.1
points at it, the way Speech lessons already point at their Library chapter. It
does not move, it is not duplicated, and nothing about its storage changes.

**4.4 and 4.7 are the ones with no equivalent anywhere else in Speechcraft.** If
the build gets cut short, cut from the middle.

---

## The eight ideas behind it

Stripped of the source's classroom narrative. Six of these became lessons; two
are folded into 4.3.

1. **Tempo and rhythm are two different things.** Tempo is how fast. Rhythm is
   the pattern of long and short, stressed and unstressed, inside that speed.
   Most actors have one word for both and therefore one control where there
   should be two. → 4.2

2. **Rhythm changes what you feel, not just how you sound.** Feeling cannot be
   commanded; tempo can. Set the rhythm from outside and the feeling follows it
   in. Three doors: the mind through the text, the will through objectives, the
   feelings through tempo-rhythm. → 4.3

3. **It does not work in the abstract.** A rhythm with nothing behind it stays
   dead. It needs circumstances, and then the two feed each other. → folded into
   4.3, because on its own it is a caveat rather than a lesson

4. **The same tempo can carry opposite content.** A march, a stroll and a funeral
   can move at one speed and share nothing else. → folded into 4.3

5. **Inside and outside can differ, and that difference is the performance.**
   Racing within, still without. Anyone concealing something runs two rhythms,
   and the gap is what an audience reads. → 4.4

6. **Harmony, not unison.** Everyone runs their own rhythm, and a scene is
   separate lines sounding together. Everyone on one rhythm is unison, which is
   an effect: soldiers, a chorus, a crowd with a single urge. A chord needs
   different notes, and the interval between two characters is not something
   either actor plays alone. → 4.5

7. **Speech is made of notes and rests.** Sounds, syllables and words are the
   notes; pauses are the rests. Both carry rhythm. → 4.6

8. **Two speeds most actors do not have.** Genuinely slow sustained speech that
   stays alive, and genuinely fast speech that stays intelligible. The second is
   built from the first: exaggeratedly slow and precise, repeated, then
   accelerated. The common failure is neither, just long pauses with the words
   rushed out between them. → 4.7

Two further ideas belong in the writing but not as lessons: a silent count that
runs through pauses so rhythm survives them, and the fact that a wrong rhythm
does not merely fail to help but actively prevents the feeling arriving.

## The three failures to name

More useful to a learner than the theory, because they are recognisable. These
belong in 4.2 and 4.5.

| Failure | What it sounds like |
|---|---|
| **Split** | Rhythmic in the body, arhythmic in speech, or the reverse |
| **One gear** | A single tempo-rhythm for every role. The permanently noble father, the permanently fluttering ingenue |
| **Empty metre** | Metrically perfect, subtextually hollow. Or the reverse: subtext so heavy the verse collapses into prose |

---

## The two tools

Both go on the script rail that already carries the Four Lists, beats and
highlighting. Both are markup, so both work under the current no-recording rule.

**Rhythm marking, two tracks.** Per speech: an **outer** track for what the
audience sees, an **inner** track for what is underneath, each with a free-text
circumstance that justifies it. Where the two diverge the app marks the gap,
because that divergence is lesson 4.4 made visible on the learner's own script.
Stored beside `marks` and `fourLists` on the project record: one more key, no
schema change, same autosave.

**Rhythm cards.** Take a speech they have marked, deal it back with a different
tempo-rhythm assigned and a circumstance that would justify it, and have them
re-read under the new instruction. The most transferable exercise in the two
chapters, and it needs no audio, no scoring and no recording. Lives in Acting
Practice beside the existing decks.

---

## What this deliberately does not do

- **No new workspace, no kill switch, no `js/data/character/`.** It is a module
  in `js/data/acting/course.js` like every other lesson.
- **No audio.** No metronome tick, no click track. The text-first rule defers all
  new audio, and a browser-generated tick is new audio.
- **No recording or scoring of the learner.** `CAPABILITIES.learnerSpeaking` is
  frozen false. Nothing asks them to make a sound.
- **No claim to detect rhythm.** The app never tells a learner what their
  tempo-rhythm is. They mark it themselves.
- **No metric scansion.** `scanLine()` exists for verse and is explicitly
  heuristic. Tempo-rhythm is not scansion and must not borrow its machinery or
  its confidence.

---

## Build order

1. Renumber: Preparing the Performance becomes Module 5. One `n` change plus the
   module id ordering. Lesson ids do not change, so nothing stored breaks.
2. Add the Building a Character module record and its seven lesson records, all
   `requiredReviewer: 'acting-professional'`.
3. Write 4.2 first and show it before the other five, the way the articulation
   guides were shown one at a time before the batch.
4. Rhythm marking on the script rail.
5. Rhythm cards in Acting Practice.

The Library collection tile should follow whatever the existing per-module
collection pattern does; confirm before assuming it appears automatically.

---

## Open questions

1. **Does Module 4 open with the Four Lists, or should the lists stay purely a
   Library reference** and the module be seven lessons of tempo-rhythm?
2. **A silent visual pulse: yes or no?** It would carry 4.2 and 4.7 far better
   than prose. It is not audio, so the text-first rule does not obviously block
   it. It is also the likeliest thing here to feel like a gimmick.
3. **Module title.** "Building a Character" is the source's title and your
   original order. Worth checking it does not read as a promise of more than the
   module delivers.
