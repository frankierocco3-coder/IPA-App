# Shakespeare: module outline (draft for owner approval)

Drafted 2026-09-24, **revised the same day after reading the app**.
Nothing here is built.

## What the first draft got wrong

The first version proposed nine lessons, with three of them — what
pentameter is, how to scan a line, and what an irregular line looks like
— as the spine to build first.

**Two of those three already exist and are better than a lesson.** Open
any of the 154 sonnets and there is a **📐 Scan** tab that marks every
syllable ´ or ˘, counts it in the margin, and flags any line that is not
ten. Its own copy explains the metre:

> Iambic pentameter is five beats of weak–STRONG (di-DUM ×5) — ten
> syllables a line... A count that isn't 10 is where the metre bends — a
> feminine ending, an extra foot, a headless line. **Those are moments to
> notice, not fix.**

and then hedges itself correctly:

> The splits are computed, not perfect — the map, not the territory.
> Trust your ear where they disagree.

A written lesson explaining pentameter would be a worse version of a
tool the learner can already use on a real line. So those two lessons are
**cut**, and the module's job changes: it teaches what the tool cannot,
and points at the tool for the rest.

## The gap the tool leaves, which is the module's centre

The Scan tab **finds** the bent lines. It never says **what they mean**.
A learner sees ⚠ next to a line of eleven syllables and is told it is a
moment to notice. Notice for what? That is the whole craft, and nothing
in the app answers it.

That is lesson 4, and it is the reason the module exists.

## A product finding, separate from the lessons

**Scansion is on the sonnets only.** `renderSonnet` passes verse framing;
`renderPiece` (monologues) passes `verse: false` and gets the prose
version. The eight Shakespeare **scenes** — the dramatic verse an actor
actually works on — have Read, Flash Cards, Highlight, Beats, Rhythm
(which is the tempo tracker, not scansion), Exercises, IPA and Question
Everything, and **no way to scan a line at all**.

So the tool is pointed at the poems and not at the plays. Extending the
Scan view to the Scenes shelf is a small change against existing code and
worth more to an actor than any lesson in this outline. **Owner decision,
and I would do it before writing a word of the module.**

## What already exists to build on

* **The Scan tab** on all 154 sonnets, with the metre explainer and the
  honest caveat, flagging irregular lines.
* **Plain Meaning** sitting one tab away from the verse, so the prose
  reading is never more than a tap.
* **Recorded audio** in Neutral American, Traditional RP and Australian
  on the sonnets, with a dialect switcher.
* **Eight Shakespeare scenes**, verbatim, already parsed for the
  role-based tools: The Balcony, The Nightingale and the Lark, The
  Nunnery Scene, The Decision, After the Murder, Kill Claudio, The First
  Encounter, The Quarrel.
* `scanLine()` and `syllabify()` in `js/scan.js`.

All public domain. No rights, no clips, no exposure.

## The module (7 lessons, down from 9)

| # | Lesson | One line |
|---|---|---|
| 1 | Why This Feels Hard | The real obstacles, and the biggest one: playing Shakespeare instead of playing a person. |
| 2 | Words You Do Not Know | Look it up once, then stop thinking about it. Intention carries an audience past vocabulary. |
| 3 | The Sentence Underneath | Why the word order inverts, how to find the spine of a sentence, and why translating in your head while speaking kills it. |
| 4 | Reading a Bent Line | **The centre.** The app shows you where the metre bends; this says what each kind of bend is telling you. |
| 5 | Shared Lines | Two actors splitting one line of verse is an instruction about timing. Pick it up, or take the pause the text wrote for you. |
| 6 | Verse and Prose | Who speaks which, and what it means when a character changes. |
| 7 | Where to See It Done | Named performances and the exact moment worth watching, with what to watch for. |

**Cut from the first draft:** "What the Pentameter Is" and "Scanning a
Line". The Scan tab does both, interactively, on real text. Lesson 4
opens by sending the learner there rather than re-explaining it.

## Two things it deliberately does not do

**No hosted clips.** Lesson 7 follows the pattern the Slapstick chapter
already uses: name the performance, name the moment, say what to watch
for. Self-hosting other people's performances is the one real legal
exposure in this area and the app does not need it.

**No claim that any pronunciation is authentic.** Original pronunciation
is a real subject and an obvious tie-in for a dialect app, and it is also
where confident nonsense lives. If it goes in, it gets its own lesson
framed as one reconstruction among several. Left out on purpose.
**Owner decision.**

## Open questions

1. **Extend Scan to the Scenes shelf first?** Recommended: yes, before
   any lesson is written.
2. **Module in Acting, or its own workspace?** Recommended: module.
3. **Does lesson 7 name living actors?** The app has avoided naming
   living people in learner copy everywhere else. The safer version names
   the production and the scene. **Needs your call.**
4. **Original pronunciation: in or out?**
5. **Where in the Acting path?** After Investigating the Text is the
   natural home; it is also advanced, which argues for late.

## Build order, when approved

1. Extend the Scan view to scenes (code, not content).
2. Lesson 4, which is the one nothing else in the app or anywhere else
   in this outline can do.
3. Lessons 1–3, the language.
4. Lessons 5–7.
