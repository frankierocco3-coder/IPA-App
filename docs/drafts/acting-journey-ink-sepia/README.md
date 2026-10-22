# The Actor's Journey — ink-and-sepia candidates (2026-10-20)

The art direction that SHIPPED for Acting's Learn page. Two pictures were
painted for the descent below the stage and one was chosen.

Nothing in this folder ships: `tools/build_artifact.py` excludes `docs/`.
That is the whole reason it is here. `img/` ships wholesale, so a rejected
candidate left beside the selected one is a download every learner pays for
and nobody ever sees — the same 468KB mistake recorded in
`../learn-path-draft-1/README.md`.

## What shipped

| File | Where |
|---|---|
| `img/ui/acting-stage-vintage-cel-v1.jpg` | the stage band at the top — `scene.art` |
| `img/ui/acting-journey-vintage-cel-v1.jpg` | the descent behind the path — `scene.journeyArt` |

Both are wired in `js/data/learn-scenes.js` under `acting:`, with
`journeyFocus: [10, 30, 50, 70, 90]` choosing which bands of the tall
painting sit behind which stretch of the path.

## What did not

`acting-journey-classic-cel.jpg` (940x1673) — the classic-cel treatment of
the same descent. Not selected; kept because the choice between the two was
a taste call and taste calls get revisited.

To revive it: drop it back in `img/ui/`, point `journeyArt` at it, and
**bump `VERSION` in `sw.js`** — media goes through `cacheFirst`, which never
revalidates, so an installed copy would keep serving the old picture. See
the `sc-v48` note in `sw.js`.
