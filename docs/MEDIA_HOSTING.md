# Media storage & hosting plan (articulation video)

## Where we stand
- Repo today: ~560 MB, almost entirely pre-generated MP3 word/idiom/
  sonnet audio. GitHub recommends < 1 GB per repository and GitHub Pages
  sites should stay comfortably under that.
- The video manifest (`js/data/media-videos.js`) ships EMPTY. The player
  component only activates for approved entries, so this plan can be
  decided later without blocking anything.

## What video will cost
Per supported sound, the design wants two clips (Isolated Sound +
Example Word), each roughly 5–15 s of front-facing mouth footage:

| Item | Est. size |
| --- | --- |
| One 720p H.264 clip, 5–15 s | 1.5–4 MB |
| Poster JPEG | ~60–120 KB |
| WebVTT captions | ~1 KB |
| One sound (2 clips + posters + captions) | ~3–8 MB |
| Neutral American pilot (10 sounds) | ~30–80 MB |
| One full course (~45 sounds) | ~150–350 MB |
| All four courses | 0.6–1.4 GB — **exceeds the repo** |

## Recommendation (preserves the privacy & network model)
1. **Pilot in-repo.** Up to ~10 sounds (≤ 80 MB) can live in this repo at
   `media/video/<dialect>/…` with no architectural change.
2. **Scale via a sibling media repository.** GitHub project sites for one
   account share a single origin: `frankierocco3-coder.github.io/IPA-App`
   and a future `frankierocco3-coder.github.io/IPA-Media` are the SAME
   origin, so the strict CSP (`default-src 'self'`) and the
   no-external-request rule both hold with zero exceptions — while each
   repo gets its own ~1 GB budget. Manifest paths simply become
   `/IPA-Media/video/…`.
3. **Do not** adopt a third-party video host/CDN — that breaks the
   privacy model (external requests, tracking surface) and would need a
   deliberate decision recorded here first.

Compression notes for production: 720p, H.264 baseline, AAC audio or
silent, `-crf 26`–`28`, `faststart` for inline mobile playback. Posters
from the first clean frame. Captions authored with the script, not
auto-generated.

The same sibling-repo route is also the escape hatch for the audio
narration backlog (~169k credits of monologue narration) already noted in
CLAUDE.md as gated on storage.
