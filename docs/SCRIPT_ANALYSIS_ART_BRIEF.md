# Script Analysis — chapter art brief

Six hero images, one per chapter of the Script Analysis shelf. They sit at
the top of the preview panel on the right, above the chapter title.

**The page works without them.** `CHAPTER_ART` in `js/main.js` is empty, and
a chapter with no entry simply draws no frame — the panel starts at the
title instead. Add entries as the images land; nothing else changes.

## Shape and size

- **Aspect 3 : 1** (wide letterbox). The frame is the full width of the
  preview panel, which is about 560px at the 1180px desktop measure.
- **Deliver 1680 × 560**, so there is retina headroom at that slot.
- **JPEG**, `img/ui/`, named `script-card-<id>.jpg` using the ids below.
- Keep the important content away from the outer 6% on every side — the
  frame is the panel's own top corners, so the image is rounded there.

## House style

Match the existing Acting band images (`img/ui/acting-band-*.jpg`): warm
cream and sage palette, natural light, photographic rather than
illustrated, people at work rather than posed. These are wider and taller
than the bands, so they can hold a real scene instead of a strip.

No text in the image. No IPA symbols. No faces looking at camera.

## The six

| id | chapter | what it shows |
|---|---|---|
| `col:lines` | Lines & Memory | An actor off book, script face-down beside them, lips moving — the moment the text stops being read and starts being known. |
| `ac-fourlists` | The Four Lists | A page divided into four handwritten columns, pen mid-stroke. The lists are the subject, not the hand. |
| `ac-analysis` | Through Analysis | The marked-up script on a table under a window, annotations in red running into the margin — this is the one the owner's mockup shows. |
| `ac-markup` | Marking Up the Script | A script carrying a working system of marks: beats bracketed, breaths ticked, one line underscored twice. Read at speed, not decorated. |
| `ac-ownmarks` | Finding Your Own Marks | Two scripts side by side marked differently by two actors — the point is that the systems disagree and both work. |
| `ac-question` | Question Everything | A script ringed with questions rather than answers; a pencil resting, nothing filled in yet. |

## Wiring them up

In `js/main.js`, fill `CHAPTER_ART`:

```js
const CHAPTER_ART = {
  'ac-analysis': { src: 'img/ui/script-card-ac-analysis.jpg',
    alt: 'A marked-up script on a table under a window, annotations in red running into the margin.' },
};
```

The `alt` is required and is read aloud — describe what is in the picture,
not what the chapter is about. `tools/launch_lint.py` does not pin these
(it reads `learn-scenes.js` only), so a typo in a filename shows as a
missing image rather than a failed gate: check the page after adding one.
