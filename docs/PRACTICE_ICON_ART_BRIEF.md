# Practice mode icons — brief for the owner

Ten small icons, one per Practice exercise that does not have one yet.
They render in the tinted tile on the left of each card on the Practice
hub, the way five modes already do.

**Everything structural is built and shipped.** The cards group by family,
each family carries its colour, the tile is drawn and the illustrated
glyph renders wherever `img` exists on the mode record. A mode without art
simply shows its emoji, which is the intended intermediate state. The
artwork is the only thing left. See `js/data/dialect-course.js` (`MODES`)
and `ipaPracticePane` in `js/main.js`.

## What the app needs

* **176 x 176, square.** Exactly matching the five already in place.
  Shipped as PNG with transparency, 28KB to 52KB each.
* **PNG out of the generator, not WEBP.** `tools/build_artifact.py` ships
  `.jpg/.png/.svg/.json` only, so a .webp lands in git and never reaches
  the live site.
* **File names** `img/ui/practice-<id>.png`, using the mode ids below.
  **The ids are storage and never change.** I wire the file to the mode;
  you only have to name it right.
* **No text, no lettering, no IPA symbols drawn as art.** The one
  exception already in the set is `ipa.png`, which is a wordmark by
  design. Everything else carries its words in the card beside it.

## THE SIZE RULE, which decides everything else

**These display at 36 x 36.** Not 132, not 92. Thirty-six.

That is the whole brief in one number. A busy picture at 36px is a smudge.
Look at the five that work: `flash-cards.png` is a deck and nothing else,
`globe.png` is a globe and nothing else, `one-line.png` is one page with
one line on it. Each is **a single object, centred, filling most of the
square, read in one glance.**

So: one object. No scenes, no hands, no rooms, no figures, no backgrounds.
If you need two things to say it, the idea is too complicated for this
size and I should pick a different object.

## The house style

Match the five in place: `img/ui/flash-cards.png`, `ipa.png`, `globe.png`,
`one-line.png`, `dictionary.png`.

* Small object illustration, softly shaded, gently glossy, with a warm
  light from the upper left and a soft contact shadow.
* Slightly rounded, friendly forms. Not flat vector, not photographic.
* The app's palette: olive and sage green, warm ochre and gold, rust
  terracotta, cream, muted slate blue. No neon, no pure black.
* Transparent background. The card supplies the tinted tile behind it.
* Centred, with a little breathing room at the edges of the square.

A style preamble to paste in front of each prompt below:

> A single small object icon, softly shaded digital illustration, gently
> glossy, warm light from the upper left with a soft contact shadow.
> Rounded friendly forms, not flat vector and not photographic. Warm
> earthy palette: olive and sage green, ochre and gold, rust terracotta,
> cream, muted slate blue. Centred on a fully transparent background,
> filling most of the square with a little breathing room. Square, 1:1.
> One object only. No text, no lettering, no numbers, no background scene.

## The ten

Grouped by the family they sit in, because the family's colour sits right
beside the icon and a clashing object looks wrong there.

### Listening — slate blue family

**1. `practice-listen`** — *Listen & Choose. Hear it, pick the symbol.*
> A pair of over-ear headphones, three-quarter view, earcups facing the
> viewer. Currently a stock headphone emoji.

**2. `practice-pairs`** — *Minimal Pairs. Which word did you hear?*
> Two small tuning forks crossed, or two identical sound-wave discs side
> by side with one very slightly different. The idea is **two things that
> are nearly the same**. Avoid an ear: `practice-listen` already owns the
> listening gesture and at 36px two ear-ish icons will not be told apart.

### Reading IPA — gold family

**3. `practice-find`** — *Find the Word. Which word has this sound?*
> A magnifying glass over a small card or page corner. Glass at a
> three-quarter angle so it reads as a lens rather than a circle.

**4. `practice-name`** — *Name That Sound. Match the description.*
> A single speech bubble with a small gold label tag attached, or a speech
> bubble with a tiny luggage-style name tag. The idea is **putting a name
> to a sound**.

### Transcription — sage green family

**5. `practice-spell`** — *Spell It. Fill the missing letters.*
> A fountain pen or dip pen resting on a small card, nib toward the lower
> left. Pen only, no hand.

**6. `practice-gaps`** — *Fill the Gaps. Complete the transcription.*
> A small page with a line of writing where one segment is a visibly empty
> slot, drawn as a recessed blank tile in the line. Not a jigsaw piece:
> the puzzle emoji currently there reads as a game rather than as writing.

**7. `practice-build`** — *Build a Word. Assemble it from tiles.*
> Three or four small blank letter tiles, like Scrabble tiles with no
> letters on them, stacked or slotting together. Blank is important, since
> no text is allowed and a tile with a letter would date it to one word.

**8. `practice-missing`** — *Missing Symbol. One symbol is missing.*
> A short row of three small tiles with the middle one empty, drawn as an
> outlined dashed recess. Distinct from `practice-gaps` by being a **row
> of discrete tiles** rather than a page of writing.

**9. `practice-writesent`** — *Transcribe a Sentence. Pick the right
transcription.*
> A small page with two or three ruled lines of writing on it and a pen
> laid across the lower corner. The fuller cousin of `practice-spell`.

### Accent & Vocabulary — terracotta family

**10. `practice-shift`** — *Accent Shift. Transform between accents.*
> Two curved arrows chasing each other in a circle, or two small speech
> bubbles exchanging places with a curved arrow between them. The idea is
> **the same thing said two ways**.

## When they arrive

Drop them in `img/ui/` with those names and tell me. Each one is a single
`img:` line on its mode record in `js/data/dialect-course.js`, next to the
`icon:` that stays as the fallback. Nothing else changes, and a mode whose
art has not landed keeps working.
