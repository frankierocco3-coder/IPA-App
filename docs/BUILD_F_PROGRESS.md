# Build F progress — sonnet edition catalog

Working state for the 154-sonnet written catalog. Updated every batch.
Batch = write chunk → run FULL suite + all five gates → local checkpoint
commit. The five pilots (18, 29, 73, 116, 130) live in recasts.js and are
never duplicated; 149 new sonnets ship in 11 chunks.

| Batch | Chunk file | Sonnets | New entries | Status |
|---|---|---|---|---|
| 1 | sonnets-001-014 | 1–14 | 14 | DONE — suite 283/283, gates pass |
| 2 | sonnets-015-028 | 15–28 (skip 18) | 13 | DONE — suite 283/283, gates pass |
| 3 | sonnets-029-042 | 29–42 (skip 29) | 13 | DONE — suite 283/283, gates pass |
| 4 | sonnets-043-056 | 43–56 | 14 | DONE — suite 283/283, gates pass |
| 5 | sonnets-057-070 | 57–70 | 14 | DONE — suite 283/283, gates pass |
| 6 | sonnets-071-084 | 71–84 (skip 73) | 13 | DONE — suite 283/283, gates pass |
| 7 | sonnets-085-098 | 85–98 | 14 | DONE — suite 283/283, gates pass |
| 8 | sonnets-099-112 | 99–112 | 14 | pending |
| 9 | sonnets-113-126 | 113–126 (skip 116) | 13 | pending |
| 10 | sonnets-127-140 | 127–140 (skip 130) | 13 | pending |
| 11 | sonnets-141-154 | 141–154 | 14 | pending; flips EDITION_CATALOG_COMPLETE=true |

Per-batch procedure:
1. Read the originals for the range from js/data/sonnets.js.
2. Write js/data/editions/<chunk>.js — per sonnet: `plain` (argument,
   situation, imagery, progression, volta, couplet — original prose),
   `nam` / `ssbe` / `aus` (In Today's Voice — argument, images, turn and
   relationship preserved; contemporary, natural, class-neutral ssbe;
   no forced slang; no meter/rhyme claims). NO `rp` adaptation ever.
3. Append the chunk line to EDITION_CHUNKS in editions/index.js
   (batch 11 also flips EDITION_CATALOG_COMPLETE to true).
4. Suite (tests/run-all.html) + all five gates must pass.
5. Local checkpoint commit. Never push/merge/deploy.

All texts are drafts pending human literary + dialect review
(js/data/edition-reviews.js). Claude cannot approve its own writing.
