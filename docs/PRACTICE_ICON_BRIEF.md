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

# BATCH 1 — eight icons, every hub card in Practice

These are the big cards, rendered at 46px in a tinted plate. Generating
just these eight finishes every track-card in every live Practice pane.
**Start here. If you stop after this batch, Practice is still coherent.**

| # | File | Card | Where | Draw |
| --- | --- | --- | --- | --- |
| 1 | `warmup.png` | Warmup | Acting **and** Character Practice | A small stylised flame with a soft gold-into-terracotta glow, rounded and friendly rather than fierce. Replaces 🔥. If a flame reads as a warning, the alternative is a figure mid-stretch, arms overhead. |
| 2 | `arcade.png` | Acting Arcade | Acting Practice | A vintage arcade joystick: terracotta ball top, olive base, slight tilt. Reads instantly at coin size. Replaces 🕹. |
| 3 | `flash-cards.png` | Flash Cards | Acting Practice | A small fanned stack of blank cards, the top one tilted and lifting. **Blank faces — the style block forbids letters.** Replaces 🃏. |
| 4 | `mask-cards.png` | Mask Cards | Character Practice | One commedia half-mask in profile — the long-nosed leather kind, lavender or slate shading. Distinct from the generic theatre mask. Replaces 🃏. |
| 5 | `one-line.png` | One Line, Many Masks | Character Practice | Three small commedia masks overlapping in a row, receding slightly, so the idea of one line passing through several characters is legible. Replaces 🎭. |
| 6 | `sonnets.png` | The Sonnets | Shakespeare Practice | A small open book with a quill resting across it, gold nib. Must not be confused with `scripts.png`, which is already a script. Replaces 📜. |
| 7 | `name-the-move.png` | Name the Move | Rhetoric Practice, **all three decks** | A balance scale, slightly off level. One icon serves all three cards: they are the same exercise on different decks, and the titles are identical, so three different icons would imply three different things. Replaces 🧩 🧭 ⚖️. |
| 8 | `bridge.png` | Accent Bridge | Accents & Dialects Practice | A small arched stone bridge in sage and muted sage, seen side-on. Replaces 🌉. |

---

## Already covered — no art needed

Five Practice cards can be wired from the set you already have. I will do
these whatever you decide about new art.

| Card | Where | Reuses |
| --- | --- | --- |
| Rhythm Cards | Acting Practice | `rhythm.png` |
| Practice My Text | Acting Practice | `scripts.png` |
| Shakespeare's Scenes | Shakespeare Practice | `scenes.png` |
| Rhetoric Library | Rhetoric Practice | `rhetoric.png` |
| Words & Expressions | Accents Practice | `words.png` |

---

# BATCH 2 — the fourteen accent game tiles

**Read this before generating them.** These sit on `.mode-card`, a smaller
component, and `.mode-icon` currently renders at **26px**
(css/style.css:215). A richly shaded storybook plate at 26px turns to mush.
If you want these, I will raise the rendered size to about 36px first and we
check one before you make the other thirteen.

So: generate **`listen.png` first, on its own**, and we look at it at real
size. If it holds, the rest are worth doing. If it does not, these fourteen
stay on emoji and batch 1 still stands on its own.

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
