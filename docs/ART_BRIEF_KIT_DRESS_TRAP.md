# Art brief — KIT, DRESS & TRAP (IPA Foundations, lesson 5)

Three small vignettes, plus one you already own. Written 2026-11-13.

## What is already in place

The lesson ships **illustrated today**. Each row carries the articulation
plate the app already maps for that symbol, cropped to the vocal tract:

| Row | Symbol | Plate |
|---|---|---|
| KIT | /ɪ/ | `img/articulation/016-vowel-small-cap-i.jpg` |
| DRESS | /e/ | `img/articulation/021-vowel-e.jpg` |
| TRAP | /æ/ | `img/articulation/019-vowel-ash.jpg` |

The crop is deliberate and is doing real work: uncropped, all three render
as the same grey smudge at 46px, which implies a difference the eye cannot
find. Framed on the tongue alone they differ visibly — high and bunched for
/ɪ/, lower and flatter for /æ/ — which is exactly what the row text claims.

The quiz header illustration the handoff asks for already exists too:
`img/voice-path/headphones-script.png`.

**So nothing is blocked.** What follows is an upgrade, not a gap.

## What to draw, if you want the handoff's look

The handoff pictures small ink-and-wash vignettes rather than diagrams —
concrete objects, editorial watercolour, warm parchment ground, the register
of the existing Speechcraft cards. Three are wanted, one per row.

The handoff's own subjects were a wooden chair, a hand setting down a teacup,
and a person on a bench — because it taught with **sit / set / sat**. Those
three words have no recordings in any of the ten accent-voice pairs, so the
lesson teaches with **bid / bed / bad** instead: the only other complete
minimal triplet in the library, and the one that keeps the handoff's stated
reason for a triplet at all ("the same surrounding consonants so the learner
can focus on the vowel").

So the subjects move with the words:

| Row | Word | Subject | Note |
|---|---|---|---|
| KIT /ɪ/ | **bid** | A raised auction paddle, or a hand lifting a numbered card | Reads instantly at thumbnail size; avoid text on the paddle |
| DRESS /e/ | **bed** | A made bed seen from the side, or a turned-down corner | The easiest of the three; keep it simple and low-contrast |
| TRAP /æ/ | **bad** | A bruised or half-spoiled apple | The abstract one. An apple with one dark bruise reads as "bad" without a face or a symbol |

Constraints that matter:

- **They are seen at 46–54px square.** Whatever is drawn has to survive that.
  One clear silhouette, few elements, strong value contrast. Detail below
  about 1/8 of the frame will disappear.
- **The three must differ at a glance.** That is the whole reason the plates
  needed cropping. Three objects of similar size and colour in similar
  framing will repeat the same failure.
- Square-ish, with the subject centred — the app crops to a square.
- No lettering. The row already carries the word and the symbol.

## How to swap them in

It is a data change, not a code change. In `js/data/dialect-course.js`,
lesson `v1-1`, each row currently resolves its picture from its `ipa`.
Add the file to the row and the renderer will prefer it. Say the word and
I will wire it in one edit.

## The one thing still missing

Nothing in this lesson. For the record, the outstanding audio elsewhere is
unchanged: `mad` (needs the ElevenLabs key), the two monotone vowel takes,
and the two deliveries of "Leave the keys by the door."
