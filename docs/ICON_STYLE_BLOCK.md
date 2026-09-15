# The Speechcraft icon style block

The exact ChatGPT prompt style that produced the shipped img/ui/ set
(11 icons, installed 2026-09-15, commit 9c49e0d). Any future batch —
the Library collection cards are the natural batch 2 — MUST reuse this
block verbatim so the set stays one set.

## Style block (paste with every icon request)

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

## The pipeline (what worked)

1. Owner generates in ChatGPT (one image per icon, one thread for
   style consistency), downloads the PNGs to a folder Tess can reach.
2. Tess identifies each file by opening it (never trust order), then:
   copy into `img/ui/<slug>.png`, `sips -z 176 176`, verify the corner
   pixel is (0,0,0,0) with the stdlib PNG probe (sips preserves alpha;
   ChatGPT delivered true transparency — no white keying was needed).
3. Wire via `cardGlyph(c)` in js/main.js: cards carry `img:`; the emoji
   stays in the data as fallback. `.track-glyph.has-img` renders the
   tint plate. Confirm `img/ui/` lands in the build artifact.
4. Label-check at full resolution before install, like all AI art.

## Shipped batch 1 (for reference)

scripts, custom-work, dictionary, profile, preferences, privacy,
feedback, why-speech, about, credits, shop — mapped to Studio,
Actor's Studio and More cards.
