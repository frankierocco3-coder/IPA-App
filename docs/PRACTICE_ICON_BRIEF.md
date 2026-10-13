# Practice icons — what to generate

Written 2026-10-08. Batch 3 of the illustrated icon set, after batch 1
(Studio, Actor's Studio, More — 2026-09-15) and batch 2 (the Library
collection cards).

**Why this batch exists.** Practice is the only hub family still running on
raw emoji. Studio, More and every Library shelf carry drawn icons; the five
Practice panes carry none, so the same kind of card wears two different
visual languages depending on which section you are in. The colour emoji
also fight the editorial theme hardest at this size — the green puzzle
piece and the blue lettered block are the loudest things on the page.

**The plumbing already exists.** `cardGlyph` (js/main.js:257) swaps an image
in when a card carries `img:`, `.track-glyph.has-img` is styled
(css/style.css:2234), and three hubs already use it. Nothing new needs
building: these cards simply never got wired.

---

## The style block — paste this with EVERY request

Verbatim from `docs/ICON_STYLE_BLOCK.md`. Do not reword it, or the batch
will not match the ones already shipped. One image per request, all in one
ChatGPT thread, so the style holds across the set.

> Create a single richly illustrated icon for a warm, editorial-style
> education app for actors. Style: one centered object rendered like a
> miniature storybook illustration — soft dimensional shading, gentle
> top-left light, subtle color texture, rounded friendly forms with
> real volume, a fine deep-olive contour (#2F3A2E). Warm and inviting,
> slightly vintage, like a beautifully printed children's-encyclopedia
> plate. Use only this palette and richer shades or highlights of it:
> cream #F6F1E8, deep olive #2F3A2E, sage green #6F8657, muted sage
> #8D997D, terracotta #C0604A, warm gold #C9A24B, muted lavender
> #A99BC4, slate blue #6F87A3. No neon, no pure white glare. One
> strong, simple silhouette that stays readable at coin size: the
> richness lives in the shading, not in tiny details. Absolutely no
> text, letters, or numbers. No background of any kind — fully
> transparent. The object fills about 70% of the frame with even
> margins. PNG, 1024×1024, transparent background.

Then add one line naming the object. The subjects are below.

---

## WHAT THE FIRST THREE TAUGHT (2026-10-13) — read before generating

Warmup, Acting Arcade and Flash Cards are installed. Getting them took six
generations rather than three, and every wasted one is covered below.

**1. ATTACH AN EXISTING `img/ui/` FILE AS A REFERENCE IMAGE.** This is the
single highest-leverage thing on the page and it is not in the style block.
Words cannot carry the finish; one attached icon does. Pick the shipped icon
closest in STRUCTURE, not in subject:

| Generating | Attach | Why |
| --- | --- | --- |
| an object with a base, stem and top | `rhythm.png` | the metronome is structurally a joystick |
| anything made of paper or card | `scripts.png` | proves the house draws paper BLANK |
| a person | `character.png` | see point 4 |
| a head, mouth or voice | `instrument.png` | the house head treatment |

**2. "ABOUT 70% OF THE FRAME" IS ASPIRATIONAL. The shipped set is the real
spec.** Measured ink-box fill of icons already in `img/ui/`:

```
rhythm.png      68% wide   92% tall
scripts.png     82%        85%
scenes.png      91%        72%
character.png   51%        92%
```

So anything from about 50% to 90% is in family. What actually matters is
filling the frame in BOTH directions — say so explicitly in the prompt. A
standing figure came back 22% wide and 89% tall and was a 10px smear at card
size. The same subject as a side bend came back 57% wide and worked.

**3. COMPACT OBJECTS AT A SLIGHT ANGLE SURVIVE 46px. FIGURES STRUGGLE.**
Six of the eight subjects here are objects for this reason. An object with
one bright accent against a muted body (the joystick's terracotta ball) has
a focal point that survives the shrink. If a subject can be drawn as either
a person or an object, draw the object.

**4. THE HOUSE DRAWS PEOPLE AS MANNEQUINS, NOT AS PEOPLE.** `character.png`
is a jointed wooden artist's mannequin with a blank egg head;
`instrument.png` is a smooth featureless head. Neither has anatomy, hair or
fabric folds. A realistic figure will not match the set.
**EXCEPTION, OWNER DECISION 2026-10-13: `warmup.png` IS a realistic figure.**
It was offered as a mannequin and the owner chose the realistic version after
seeing both. Do not "correct" it toward `character.png`.

**5. ALWAYS CHECK THE FILE, NEVER THE CHAT COPY.** Images pasted into chat
are converted to lossy webp with the alpha flattened for display, so a
transparent icon LOOKS like it has a white box. Judge from the file.

**6. THE FOUR MEASUREMENTS THAT PREDICT SUCCESS.** Run these before
installing anything; all four are cheap and each one caught a real reject:

* **corner pixels** — all four must be `(0,0,0,0)`, checked again AFTER the
  176px resize, not only before it;
* **ink-box fill** — width and height as a percentage of the frame, against
  the table in point 2;
* **a 46px render, looked at** — this is the actual test and nothing else
  substitutes for it;
* **palette distance** — nearest house colour for each dominant band. The
  flash cards landed within 16 of four house values; a rejected flame was 39
  off on one channel and visibly hot. Anything past about 35 reads wrong.

**7. INK DENSITY — THE MEASUREMENT THAT FRAME FILL MISSES.** The share of an
icon's bounding box that is actually drawn. It earned its place twice in one
day: it explained a weak icon after the fact, then steered a strong one
before the fact.

```
sonnets.png   69%   open book, solid mass
within.png    67%   nesting doll
status.png    29%   seesaw — a steep diagonal plank is mostly empty air
```

The seesaw measured 91% × 85% frame fill with a healthy 1.08 aspect, and it
STILL sits visibly lighter on the shelf than its neighbours. Neither of the
other measurements predicted that; density did.

So every prompt since says **"keep the forms SOLID AND HEAVY: big masses
filling their outlines, with the detail living in the shading rather than in
fine pattern"**, and the three icons after it came back at 66–69%.

Where a subject is inherently sparse — a balance scale has open air under
its beam — put the mass where it counts instead. `name-the-move.png` is only
37% dense but reads cleanly, because the prompt demanded big solid pans and
thick straight hangers rather than fine chains. **It is not density for its
own sake; it is mass in the parts that carry the idea.**

---

# BATCH 1 — SEVEN icons, every hub card in Practice — ✅ COMPLETE

These are the big cards, rendered at 46px in a tinted plate.

**BATCH 1 IS DONE (2026-10-13).** Every hub card in every LIVE Practice pane
carries drawn art. Four panes are whole — Acting, Character, Shakespeare and
Rhetoric Practice — and the Character Library is five shelves of five.

**IT WAS SEVEN ICONS, NOT EIGHT. `bridge.png` WAS MISFILED HERE** and has
moved to batch 2 where it belongs. Accent Bridge is a `.mode-card` rendering
at **26px** (js/main.js, `.mode-icon` in css/style.css), not a `.track-card`
at 46px. That is the second time this brief filed a 26px mode-card as a 46px
track card; Words & Expressions was the first, in the reuse table below.
The rule that catches it is already written there and is worth repeating
here: **check the COMPONENT, not the card.**

An audit of every hub card in js/main.js confirms the completion. The only
ones still on emoji are the withdrawn Speech workspace, withdrawn Scene
Study, the warmup movement chooser inside the Warmup page, and Studio cards
— none of which is a live Practice hub card. The Accents Practice pane has
no hub cards at all; it is built entirely from mode-cards, which is why
batch 2 is the whole of what remains there.

| # | File | Card | Where | Draw |
| --- | --- | --- | --- | --- |
| 1 | ✅ `warmup.png` | Warmup | Acting **and** Character Practice | **DONE.** A person in a standing side bend, arms curving overhead. NOT the flame this brief originally specified: a flame in a Duolingo-shaped app reads as a streak counter, and streaks were removed on purpose 2026-10-05. Realistic figure by owner decision — see point 4 above. |
| 2 | ✅ `arcade.png` | Acting Arcade | Acting Arcade **and** Speechcraft Arcade | **DONE.** A vintage arcade joystick: terracotta ball top, sage base, gold ring, slight angle. One icon serves both arcade cards (owner: "this is for all the arcade images"); the Speech one is invisible behind SPEECH_LIVE but wired so that pane is already right when the flag flips. |
| 3 | ✅ `flash-cards.png` | Flash Cards | Acting Practice | **DONE.** A fanned stack, blue/terracotta/sage/lavender edges behind a cream top card. The top card carries RULED LINES, which are rules rather than letters, and they do real work: they say index card rather than playing card, which is what a cue-line drill actually uses. Better than what this brief asked for. |
| 4 | ✅ `commedia.png` | Mask Cards | Character Practice **and** the Commedia Library shelf | **DONE**, and the file is `commedia.png` not `mask-cards.png` because it serves two surfaces. One lavender leather half-mask with gold ridge highlights, eye openings cut right through so the tinted plate shows behind them. The gold edges are what carry it at 42px. |
| 5 | ✅ `one-line.png` | One Line, Many Masks | Character Practice | **DONE.** THREE masks overlapping, lavender/terracotta/sage. It was generated for the Commedia shelf, measured badly at the 42px that shelf renders, and swapped here — three heavily modelled overlapping objects is too much for 42px, but at 46px "several" still reads even when the mask shapes go soft. The three say *many*; the single mask says *commedia*. Do not swap them back. |
| 6 | ✅ `sonnets.png` | The Sonnets | Shakespeare Practice | **DONE.** An open book lying flat, slate-blue cloth binding, a quill across it with a gold nib. Densest icon in the set at 69%. Pages blank — the instruction had to say so six ways, because a book is one of the strongest text priors a model has. |
| 7 | ✅ `name-the-move.png` | Name the Move | Rhetoric Practice, **all three decks** | **DONE.** A brass balance scale on a slate-blue base. One icon on all three cards: same exercise, same title, three decks — three glyphs would imply three games. Wired through `RHET_DECKS` so each deck keeps its own emoji as the fallback. Slate blue because `rhetoric.png` below it is a terracotta lectern and this repeats three times in that column. |
| + | ✅ `shakespeare-scenes.png` | Shakespeare's Scenes | Shakespeare Practice | **DONE, not in the original list.** A featureless mannequin in a terracotta doublet holding a skull. Owner order 2026-10-13. It needed its OWN file because `scenes.png` serves three other surfaces holding 27 scenes across ten authors — a skull there would label Chekhov, Ibsen, O'Neill and Wilde as Shakespeare. Known weakness: at 46px the bone skull and the wooden head read as two similar pale ovals; if respun, fix the contrast, not the composition. |

---

## Already covered — no art needed

**ALL FOUR ARE WIRED (2026-10-13, commit e4885c1).** This needed no
generation at all and had been sitting here unactioned.

| Card | Where | Reuses |
| --- | --- | --- |
| Rhythm Cards | Acting Practice | ✅ `rhythm.png` |
| Practice My Text | Acting Practice | ✅ `scripts.png` |
| Shakespeare's Scenes | Shakespeare Practice | ✅ `scenes.png` |
| Rhetoric Library | Rhetoric Practice | ✅ `rhetoric.png` |

**A FIFTH ROW USED TO BE HERE AND IT WAS WRONG.** This brief listed Words &
Expressions in Accents Practice as a ready reuse of `words.png`. It is not a
`.track-card` at 46px — it is a **`.mode-card` rendering its icon at 26px**
(js/main.js, inside `PRACTICE_GROUPS`), which is exactly the component batch
2 below is held back on. Wiring it would have shipped the mush that deferral
exists to avoid. It belongs with batch 2 and moves when the render size does.

Check the COMPONENT before calling a card a free reuse: `.track-glyph` at
46px takes art today, `.mode-icon` at 26px does not.

---

# BATCH 2 — SIXTEEN mode-card tiles, and the only work left

**Read this before generating them.** These sit on `.mode-card`, a smaller
component, and `.mode-icon` currently renders at **26px**
(css/style.css:215). A richly shaded storybook plate at 26px turns to mush.
If you want these, I will raise the rendered size to about 36px first and we
check one before you make the rest.

So: generate **`listen.png` first, on its own**, and we look at it at real
size. If it holds, the rest are worth doing. If it does not, these stay on
emoji and batch 1 still stands on its own.

**THE SIZE DECISION IS THE BLOCKER AND IT IS THE OWNER'S.** Nothing here
should be generated until 26px becomes ~36px, because the evidence is now
measured rather than guessed: the seesaw reads at 42px and is already the
lightest thing on its shelf, and the three overlapping masks stopped reading
as masks at all at 42px. 26px is a third smaller again.

**TWO TILES JOINED THIS BATCH FROM BATCH 1, BOTH MISFILED BY THIS BRIEF:**

| Tile | Was listed as | Actually |
| --- | --- | --- |
| `bridge.png` — Accent Bridge | a batch 1 track card | `.mode-card` at 26px |
| `words.png` — Words & Expressions | a free reuse, "no art needed" | `.mode-card` at 26px |

Same mistake twice. **Check the COMPONENT, not the card:** `.track-glyph` at
46px and `.tile-img` at 42px take art today; `.mode-icon` at 26px does not.

One quirk worth knowing for `bridge.png`: the Accent Bridge card only
renders where a playable route exists, which today is Neutral American to
Traditional RP and nothing else. It is invisible on four of the five accent
courses, so check it on Neutral American or you will think the install
failed.

| File | Game | Draw |
| --- | --- | --- |
| `listen.png` | Listen & Choose | A pair of over-ear headphones, slate blue and olive. |
| `pairs.png` | Minimal Pairs | Two tuning forks side by side, one slightly taller. |
| `match.png` | Matching | Two rounded tiles meeting edge to edge, one sage, one terracotta. |
| `decode.png` | Decode the Word | A small brass key, warm gold, lying at a slight angle. |
| `find.png` | Find the Word | A magnifying glass over a short sound wave. The wave is what keeps it distinct from `question.png`. |
| `name-sound.png` | Name That Sound | A single rounded speech bubble, muted lavender. |
| `read-sentence.png` | Read a Sentence | An open book seen face-on, pages blank. |
| `spell.png` | Spell It | A sharpened pencil at an angle, gold barrel, olive tip. |
| `gaps.png` | Fill the Gaps | A puzzle piece hovering just above the slot it fits. |
| `build.png` | Build a Word | Three rounded blocks stacked slightly off-centre. Blank faces. |
| `missing.png` | Missing Symbol | A single empty rounded frame with a soft inner shadow. |
| `write-sentence.png` | Transcribe a Sentence | A dip pen with a gold nib, resting on a ruled line. |
| `shift.png` | Accent Shift | Two curved arrows chasing each other in a circle, sage and terracotta. |
| `name-accent.png` | Name the Accent | A small globe on a stand, slate blue oceans, sage land. |

---

## Not in scope

* **Quick Practice** (🎯) sits inline in a text line on the Quick Practice
  card, not in a glyph tile, so it needs a layout change rather than an
  icon. Left alone deliberately.
* **Speech Practice** is withdrawn behind `SPEECH_LIVE = false`. No art for
  a pane nobody can reach.
* **Scene Study** is behind `SCENE_STUDY_LIVE = false`, same reason.

---

## What happens when you hand them over

Put them anywhere I can read and tell me where. Then, per the pipeline in
`docs/ICON_STYLE_BLOCK.md`:

1. I open each file to identify it — never trusting filename or order.
2. Copy to `img/ui/<slug>.png`, `sips -z 176 176`, and verify the corner
   pixel is still `(0,0,0,0)` with the stdlib PNG probe.
3. Wire `img:` onto each card; the emoji stays in the data as the fallback,
   so a missing file degrades to today's behaviour rather than a blank.
4. Confirm `img/ui/` lands in the build artifact, run the gates and the
   browser suite, and show you the panes before anything is pushed.

**Label-check at full resolution before install**, as with all AI art here.
