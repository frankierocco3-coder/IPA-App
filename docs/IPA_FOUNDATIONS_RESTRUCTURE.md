# IPA Foundations — restructure proposal

For Frankie. Written 2026-11-17, from measurements against the running
tree. Nothing here is built; it is a decision document.

The ask was two questions: how do we teach IPA more efficiently, and
restructure IPA Foundations so there is a "reading and writing IPA"
section that teaches not just the sounds but how to read and write them.

## A correction before anything else

In chat I said the course is ordered by phonetic category, that this
delays readable words, and I offered a table showing a coverage-optimal
order unlocking 20,487 words where the course order reaches 1,462.

**That comparison was against the wrong corpus, and reordering is not the
fix.** Those numbers came from `pron.json`, the 126,052-entry dictionary.
The lesson engine never touches it. `genBuild`, `genGapBuild`,
`genTypeWord` and the rest all draw from `poolFor()`, a hand-curated list
in `js/data/phonemes.js`.

Measured against the pool the lessons actually serve:

| sounds taught | current course order | greedy coverage-optimal | hand-tuned for contrast |
|---|---|---|---|
| 20 | **17 words** | 19 | 15 |
| 25 | **25 words** | 27 | 25 |
| 32 | **45 words** | 42 | 42 |

The orders are within noise of each other. The current category order is
fine. I was wrong, and the real findings below are more useful anyway.

## What is there now

Seven stages, **24 authored lessons and 9 synthesized checkpoints — 33
things a learner walks through.** Read from the running app, not from the
course file: `expandUnit()` in `js/views/context.js` inserts a checkpoint
after **every second lesson** (`n = (i + 1) / 2`), so the checkpoints are
generated, not authored. The `checkpointGame` / `checkpointFinal` arrays
in `dialect-course.js` are hand-written *question queues* for a unit's
first and second checkpoint — not extra checkpoints, and not every unit
has them.

| stage | walk | lessons, in order |
|---|---|---|
| 1 The Instrument | 4 | in-1, in-2, **chk**, in-3 |
| 2 Short Vowels | 6 | v1-1, v1-2, **chk**, v1-3, v1-4, **chk** |
| 3 Long Vowels | 4 | v2-1, v2-2, **chk**, v2-3 |
| 4 Diphthongs | 4 | d-1, d-2, **chk**, d-3 |
| 5 Stops & Nasals | 4 | c1-1, c1-2, **chk**, c1-3 |
| 6 Fricatives & Friends | 6 | c2-1, c2-2, **chk**, c2-3, c2-4, **chk** |
| **7 Reading & Writing IPA** | **5** | **r-1, r-2, chk, r-3, r-4** |

**The section you asked for already exists** — stage 7, with `typeWord`,
`spellBlank`, `gapBuild`, `fillBlank`, `sentenceToEnglish` and
`englishToIpa`. Its blurb reads "Sight-reading fluency: spelling to
transcription and back, words to full sentences."

`r-1` is the **29th** of 33 things a learner walks through. That is why
you have never seen it, and that placement is the smaller of the two
problems.

## Four findings

### 1. Nothing in this app asks a learner to write IPA

Checked at the generator level, not inferred:

| generator | answer type | what the learner actually does |
|---|---|---|
| `genTypeWord` | `typein` | reads IPA, **types the English spelling** |
| `genSpellBlank` | `choice` | picks the English spelling |
| `genSentenceToEnglish` | `choice` | picks what the IPA line says |
| `genEnglishToIpa` | `choice` | picks the right transcription from a list |
| `genFillBlank` | `choice` | picks the one missing symbol |
| `genGapBuild` | `gapbuild` | fills 2 gaps from **the answers + 3 distractors** |
| `genBuild` | `build` | orders **the answer's own symbols + 3 distractors** |

Counted across the whole engine, every exercise the app can generate for
any course is one of five shapes: **18 `choice`, 2 `build`, 1 `match`, 1
`gapbuild`, and 1 `typein`** — and the `typein` is the one above, which
asks for English. There is no other free-text field on the learning path
in any course.

The two "build" shapes hand the learner every correct symbol and three
wrong ones; `renderBuild` then disables each tile as it is used, so the
remaining choices narrow with every tap.

**And the production-*shaped* exercises are not late — they start at walk
position 3.** Every synthesized checkpoint appends `fillBlank` and
`gapBuild` to its type list, so from the first checkpoint onward a
learner meets gap-filling constantly:

| walk | lesson | production-shaped types |
|---|---|---|
| 3 | chk-instrument-1 | fillBlank, gapBuild |
| 7, 10 | chk-vowels-1-1/2 | fillBlank, gapBuild |
| 14 | v2-3 | build |
| 16 | d-2 | build |
| 29 | r-1 | **typeWord, spellBlank** |
| 32 | r-3 | **sentenceToEnglish, englishToIpa** |

17 of the 33 carry at least one. So the problem was never "writing comes
last". **The writing-shaped tasks arrive early and none of them is
writing.** `gapBuild` is the worst offender precisely because it looks
the most like transcription: two gaps, filled from the answer's own
symbols plus three distractors.

That is recognition wearing production's clothes. **Reading is taught.
Writing is not taught anywhere, in any course.** A free-text IPA field
does exist — `.ipa-input` in `openWordEditor` — but only in rehearsal
Studio, off the learning path entirely.

### 2. The corpus is 85 words and 14 sentences

`poolFor(null)` resolves to the RP reference, which yields **85 words**:
54 shared plus 31 RP-tagged. `SENTENCES` has **14 entries**, total, and
both sentence generators `pick()` from it.

So r-3 and r-4 together serve 16 exercises from 14 sentences.

Twelve of the 44 taught sounds have two or fewer words in the pool:

| sound | words | sound | words |
|---|---|---|---|
| /ʊ/ | 1 (full) | /ʌ/ | 2 |
| /v/ | 1 (vision) | /ɜː/ | 2 |
| /r/ | 1 (grass) | /aʊ/ | 2 |
| /dʒ/ | 1 (jam) | /ʊə/ | 2 |
| /ɔɪ/ | 1 (boy) | /ŋ/ | 2 |
| | | /ʒ/ | 2 |
| | | /tʃ/ | 2 |

Lesson c2-3 teaches /tʃ dʒ l r w j/ and uses `symbolToWord` — "which word
has this sound?" — where /r/ and /dʒ/ have one candidate each. The answer
cannot vary.

This is the binding constraint on the whole course, and it is why
reordering changes nothing.

### 3. The reading stage unlocks no new reading

Words in the pool that a learner can fully decode after each lesson:

| after | sounds | readable | newly readable |
|---|---|---|---|
| in-3 (lesson 3) | 13 | 5 | bar, bath, start |
| v1-4 (lesson 7) | 20 | 17 | — |
| v2-3 (lesson 10) | 22 | 19 | — |
| d-3 (lesson 13) | 30 | 32 | beer, care, fair, tour |
| c1-3 (lesson 16) | 32 | 45 | — |
| c2-2 (lesson 18) | 38 | 60 | 11 words |
| **c2-3 (lesson 19)** | 44 | **85** | **25 words at once** |
| r-1 … r-4 | 44 | 85 | **zero** |

Two things fall out of this.

The four reading lessons add **nothing** to what is readable. Everything
is already unlocked by the time a learner arrives. Stage 7 is a
destination, not a build-up — which is exactly the structural complaint
you made.

And /l r w j/ sit in lesson 19 of 24 because they are classified
"glides", and glides come last on the IPA consonant chart. They unlock 25
of the 85 words — nearly a third of the corpus — in one lesson. That is
the one place the category ordering does cost something real.

### 4. The distractor tiles teach symbols the course does not have

**FIXED 2026-11-17 on branch `fix/distractor-inventory`.** Kept here
because the measurement is the reason the palette in A is specified the
way it is.

Found by driving the app. A Core IPA "Build a Word" served *ship* with
the tiles **ɪ eː ʃ aʊ p j** — and `eː` is the Australian SQUARE vowel,
listed in `ACCENT_FOREIGN.rp`, which does not exist in this course.

**Five generators leaked, not three, and the rate depends on how many
sounds the lesson teaches.** 320 generated exercises per cell:

| generator | 3-sound lesson | 6-sound lesson |
|---|---|---|
| `genFillBlank` | **92%** | 18% |
| `genGapBuild` | **72%** | 66% |
| `genBuild` | **71%** | 65% |
| `genSoundToSymbol` | **58%** | 0% |
| `genDescription` | **52%** | 0% |
| `genSymbolToWord`, `genMatch`, `genMinimalPair` | 0% | 0% |

`genSoundToSymbol` and `genDescription` fill their three distractor slots
from the lesson's own sounds first and only reach for foreign filler when
the lesson is small — so a six-sound probe reports them clean. **Most IPA
Foundations lessons teach three sounds.** My first measurement used a
twelve-sound lesson and a walk that only matched bare symbols, so it
missed both of them; their choices are labelled `/ɪ/` with slashes. Two
wrong readings before the right one — do not re-measure with a large
lesson and conclude they are fine.

All 18 non-RP symbols turned up, `ʔ` (a Cockney *narrow* realization) and
`ɚ`/`ɝ` (American r-coloured vowels) among them.

The cause was one expression repeated six times. `poolFor()` carefully
drops shared words carrying foreign symbols — its own comment says they
are dropped "rather than taught wrong" — and then every distractor list
was drawn from `Object.keys(PHONEMES)`, all 62 symbols across all five
accents, pouring them straight back in.

**The fix:** a memoised `inventoryFor(accent)` wrapping the already
exported `phonemesForAccent()`, used at all six sites — the five above
plus `genShiftBuild`. `genDescription` had no `accent` parameter at all
and now takes one.

Verified after the change: **0 foreign symbols in 5,040 generated
exercises**, and **all 118 lessons across all seven tracks still fill to
`EXERCISES_PER_LESSON`** (three runs each), so the narrower pool starves
no generator.

Two things that look like leaks and are not, both confirmed by reading
the code rather than the counter:

* **Shift drills** show the *source* accent's symbols by design —
  `genShiftBuild`'s own comment calls them "segments from the source form
  the learner must NOT carry over". 139 of 139 remaining cross-inventory
  hits were these.
* **`genAccentFact`** asks "How does Cockney pronounce *hair*?" with
  choices `[eə] [ɛː] [hɛː]`. The `[eə]` is the RP wrong answer, which is
  the question. Authored content, not a generated distractor.
* A third was an artefact of my own probe: the word pool contains the
  English word **"i"**, and `i` is also a phoneme key, so `symbolToWord`
  read as a 3–5% leak until the check excluded real words.

## What I propose

Three pieces, in this order. The first two are what make the third worth
doing.

### A. A real writing exercise

Add a `palette` mode to `genBuild`: instead of `target + 3 distractors`,
offer the **full inventory from `phonemesForAccent(accent)`** — 44
symbols for this course, and crucially not the 62 in `PHONEMES` (see
finding 4) — and make tiles reusable so a word like *little* /lɪtl/ can
take /l/ twice.

That turns the app's hardest existing exercise from "put five given
symbols in order" into "transcribe this word". It is the difference
between recognising IPA and writing it.

Cost: a flag on `genBuild`, one conditional around `btn.disabled = true`
in `renderBuild`, and CSS for the tile bank. The tile markup is already
an unbounded `ex.tiles.map(...)`, so nothing structural changes. **No
audio, no new corpus, no new renderer.**

**On the CSS — superseded 2026-11-17, and the news is mixed.**

What I first reported here was that `.tile-bank` stacks tiles full-width
and the palette would need a new wrapped grid. The real cause was a class
collision: `.tile` names both the exercise chip and the module card, and
the card is defined later in the file at equal specificity, so it won and
handed every symbol `width: 100%` and `min-height: 104px`. That is fixed
(`.tile-bank .tile, .answer-row .tile`), and the bank is now the centred
wrapped row it always intended to be.

So the palette needs **no new layout**. But it still does not fit.
Measured at 375x812, where the bank is 327px wide:

| tiles | bank height at the standard chip | fits on one screen |
|---|---|---|
| 8 — the worst real exercise today | 106px | yes |
| 20 | 222px | yes |
| 32 | 396px | **no**, 128px over |
| **44 — the full inventory** | **512px** | **no, 244px over** |

Two ways out, both measured:

* a **tight chip variant** — 36x34 with a 5px gap gives 8 per row and a
  229px bank, which fits with room to spare. The cost is a 34px tap
  target, under the 44px guideline.
* **better: the palette holds only the sounds taught so far.** That stays
  under 20 for most of the course — comfortably inside the standard chip
  — and only reaches 44 in the final stage, where the tight variant can
  take over. It is also the better teaching: a learner three stages in
  should not be choosing from symbols they have never met.

I would do the second. It costs one filter on the symbol list and removes
the accessibility trade entirely for all but the last stage.

This matters because of the standing rule it sits under: **in any game or
exercise, nothing may require scrolling to reach** (owner, 2026-11-17).
Verify it by measuring `scrollHeight - innerHeight` at 375x812, not by
looking at a desktop pane — the pane is 832px tall and hides it.

### B. Triple the corpus, for free

**154 single words already have RP recordings in both voices and are not
in the course pool.** 142 of them also have a `pron.json` entry, so their
transcriptions do not need writing from scratch.

They include exactly the words the thin sounds need: *foot, good, could,
put* for /ʊ/; *cup, bus, but, blood, love, sun, one* for /ʌ/; *chin,
choice, match* for /tʃ/; *bridge, gym, join, age* for /dʒ/; *break* for
/r/; *van* for /v/; *crowd, out, mouth* for /aʊ/; *noise, join* for /ɔɪ/.

**56 of the 142 need no conversion at all** — their `pron.json`
transcription already uses only symbols the course teaches. The other 86
need a rule table of eight entries plus stress-mark stripping:

| `pron.json` | occurrences | RP reference |
|---|---|---|
| `ɹ` | 29 | `r` |
| `ɚ` | 16 | `ə` |
| `ɑ` | 13 | `ɒ` or `ɑː` (per word) |
| `ɡ` | 12 | `g` — **different Unicode glyph, same sound** |
| `i` | 11 | `iː` or `ɪ` (happY) |
| `ɛ` | 12 | `e` |
| `oʊ` | 7 | `əʊ` |
| `ɝ` | 2 | `ɜː` |
| `ˈ` `ˌ` | 47 | strip |

Two of those are traps worth naming. `ɡ` (U+0261) against `g` (U+0067) is
a glyph difference that will pass a visual check and fail an inventory
check in `dialect_lint.py`. And `ɑ` → `ɒ`/`ɑː` and `i` → `iː`/`ɪ` are
**not mechanical** — they split per word, so those entries want eyes on
them rather than a regex.

The 12 RP-recorded words with no `pron.json` entry are all idiom slang —
*blackguard, blotto, chuffed, deuced, dodgy, gormless, knackered, piffle,
plummy, squiffy, whinge, wonky* — and belong in the idiom shelf, not here.

Pool after this: **85 → 227 words** — all 142 convert cleanly under the
table above, checked by applying it. No ElevenLabs spend, no booth time,
every word already playable.

The 14 sentences are a separate matter, and they are writing, not code. A
reading course wants perhaps 60. That is yours when you want it.

### C. Then restructure

With a writing exercise and a corpus that supports it, the restructure
you described becomes buildable: **reading and writing inside every
stage, not a stage of their own.**

The shape I would build, keeping every contrast cluster intact. The last
two columns are measured — words in the pool a learner can fully decode
by the end of that stage, before and after the expansion in B:

| stage | sounds | readable now | readable after B |
|---|---|---|---|
| 1 The Instrument | — (unchanged) | — | — |
| 2 First Vowels & Stops | ɪ e æ p b t d k g | 5 | **11** |
| 3 Nasals & Approximants | m n ŋ l r w j | 7 | **23** |
| 4 Schwa & Short Vowels | ə ʌ ʊ ɒ | 15 | **47** |
| 5 Hissers & Hushers | s z ʃ ʒ h | 25 | **73** |
| 6 Long Vowels | iː uː ɑː ɔː ɜː | 43 | **124** |
| 7 The TH Sounds | θ ð f v | 55 | **157** |
| 8 Diphthongs | eɪ aɪ ɔɪ əʊ aʊ ɪə eə ʊə | 82 | **212** |
| 9 Affricates | tʃ dʒ | 85 | **227** |
| 10 Sight-Reading | — | 85 | 227 |

Each of stages 2–9 closes with a read-and-write lesson over the words
that stage has just unlocked, then its checkpoint.

**Vowels and stops have to share stage 2.** I first drafted the vowels
alone, which is tidier teaching and gives a reading lesson with **zero**
eligible words — three vowels decode nothing on their own. Consonants
have to arrive in the same breath for reading to start at all.

**And stage 3 is why B comes first.** On today's pool it unlocks two
words — *can* and *in*. That is not a reading lesson. After the
expansion it unlocks twelve. Every stage in that right-hand column has
enough to work with; four stages in the left-hand one do not. The
restructure does not stand up on the corpus we have.

Moving /l r w j/ from lesson 19 to stage 3 is the only reordering I would
make, and it is not about the coverage table — it is so that an early
reading lesson has words to use at all.

Today's stage 7 becomes stage 10 and survives as the capstone it already
is, with `r-1`…`r-4` keeping their ids.

**The id cost is the one thing here that is not cheap, and it is not
optional.** Lesson ids are storage: `state.js` keys completed lessons on
them, and checkpoints are *synthesized* as `chk-<unitId>-<n>` from the
unit id and the index within that unit. This proposal regroups sounds
across almost every unit, so:

* Keeping a unit id while changing which lessons sit in it **renames its
  checkpoint ids** and silently moves progress. `vowels-1` holding a
  different set of lessons is exactly this case.
* Keeping a lesson id while changing its `phonemes` is safe — progress
  follows the id, and the id does not encode the content.

So the shape that costs nothing is: **new unit ids for the new stages,
old unit ids retired and never reused, lesson ids carried over
unchanged** wherever a lesson survives in substance. `v1-1` stays `v1-1`
even if it moves stage. The comment at the top of `dialect-course.js`
already says a new unit renames nothing; the converse — a *reused* unit
with new contents does — is the trap.

Anyone already part-way through IPA Foundations keeps every lesson they
have finished and gains some unfinished new ones. Nobody loses a tick.
That is worth checking by hand before it ships, not asserting.

## The decision that is yours

**What is IPA Foundations' reference accent?**

The course is described as accent-neutral, but `poolFor(null)` falls
through to `'rp'`, so in practice it is RP-reference. That matters now
because `pron.json` is CMUdict-derived **General American** and is
dictionary-exact only there.

- **Keep RP.** 56 of the 142 need no conversion; the other 86 carry
  rule-derived transcriptions.
  The house convention marks those "≈" — and an "≈" in the course that
  teaches the alphabet undercuts the thing it is teaching. The honest
  version is to hand-check all 86, which is your time, not mine.
- **Switch to General American.** 148 of the 155 nam-recorded words are
  dictionary-exact, no mapping, no "≈", and the nam voices are the ones
  with your 42 approved isolated-phoneme recordings. The cost is that the
  foundations course stops being accent-neutral in name as well as in
  fact, and the five accent courses then teach deltas from it.

I would switch to General American. The course already is not neutral;
this makes it honest and removes the only source of approximation from
the one course whose whole job is accuracy. But it reframes the course,
so it is your call and I have not touched anything.

## What this does not fix

* **No specialist review.** Still owner-editorial throughout, and the
  badges still say so.
* **Nothing asks the learner to speak.** `CAPABILITIES.learnerSpeaking`
  stays `false`. A writing palette is production with the fingers, not
  the mouth. This remains the top item on the roadmap.
* **The 14 sentences.** Code cannot write those.
