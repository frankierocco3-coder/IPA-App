# Writing brief — lesson group titles

Not artwork. Forty-odd short titles, for Frankie. Written 2026-11-17.

## What this is for

The Voice & Speech Learn page (Field Guide Plus) splits each stage into
**groups**, where a group is the run of lessons closing on a checkpoint.
The handoff's mockup titles them — "Hear the accent", "Compare the
vowels" — and those titles do real work: they say what the group is *for*,
which neither the lesson titles nor the checkpoint can say on their own.

**Nothing in the course data carries such a name, and none can be derived.**
Every checkpoint in every course is titled "Checkpoint game", so there is
nothing to read a name out of. Rather than invent forty of them and put
words in your mouth, the page currently ships the groups **unnamed** — the
box and the checkpoint's own card carry the structure. It reads fine. A
title per group would read better.

## What the groups actually are

Measured from the real checkpoint boundaries, not assumed. The mockup's
"two groups of three" is true of exactly one stage in the whole app.

| course | stage | groups |
|---|---|---|
| Neutral American | Meet the Accent | 3 + 3 |
| Neutral American | The Sounds | 3 + 3 + 1 |
| Neutral American | Putting It to Work | 3 + 2 |
| Traditional RP | Meet the Accent | 3 + 1 |
| Traditional RP | The Sounds | 3 + 3 + 1 |
| Traditional RP | Putting It to Work | 3 + 2 |
| Australian | Meet the Accent | 3 + 3 |
| Australian | The Sounds | 3 + 3 + 1 |
| Australian | Putting It to Work | 3 + 2 |
| Standard British | Meet the Accent | 3 + 3 |
| Standard British | The Sounds | 3 + 1 |
| Standard British | Putting It to Work | 3 + 1 |
| Cockney | Meet the Accent | 3 + 3 |
| Cockney | The Sounds | 3 + 1 |
| Cockney | Putting It to Work | 3 + 1 |
| IPA Foundations | seven stages | mostly 3 + 1, two at 3 + 3, one 3 + 2 |

That is **40 groups across 16 stages**. Note the trailing groups of one:
a stage can end without a checkpoint, and that last lonely lesson is still
a group. A title like "One more thing" covers that case honestly.

## What a good title does

The mockup's two are the model:

* **"Hear the accent"** — Meet the accent, R is everywhere, checkpoint.
  Says the group is about *listening*, before any producing.
* **"Compare the vowels"** — Flat BATH open LOT, The American GOAT,
  checkpoint. Says the group is about *contrast*.

So: a verb phrase naming the work, two to four words, lower case after the
first. Not a summary of the lessons — the lesson titles are right there.
Not a number — the stage picker already numbers things.

Avoid: "Part one", "Group A", "Lessons 1–3", anything the page can already
compute. Those are worse than no title, which is why none shipped.

## How to give them to me

A list per stage is enough — I will wire them. Something like:

```
Neutral American · Meet the Accent
  1. Hear the accent
  2. Compare the vowels

Neutral American · The Sounds
  1. ...
  2. ...
  3. ...
```

I will add a `groups: ['…', '…']` field to each unit in
`js/data/dialect-course.js` and render it above each box. A stage with
fewer titles than groups simply leaves the extra ones unnamed, so this can
land course by course rather than all forty at once — start with Neutral
American if you want to see it before committing to the rest.

## For the record

Nothing here blocks anything. The page is live and complete without these;
they are an upgrade, exactly as the KIT, DRESS & TRAP vignettes were.
See [ART_BRIEF_KIT_DRESS_TRAP.md](ART_BRIEF_KIT_DRESS_TRAP.md).
