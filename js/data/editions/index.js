// Sonnet learning editions — the Build F written catalog.
//
// Goal: a complete written learning edition for all 154 sonnets. Every
// sonnet keeps its Original view (js/data/sonnets.js, byte-locked by
// launch_lint); this catalog adds, per sonnet:
//   plain — Plain Meaning: original Speechcraft prose explaining the
//           literal argument, the speaker's situation, essential imagery,
//           the emotional progression, the volta, and the couplet.
//   nam   — In Today's Voice, Neutral American
//   ssbe  — In Today's Voice, Standard British (class-neutral,
//           deliberately distinct from Traditional RP)
//   aus   — In Today's Voice, Australian
//
// DELIBERATE DECISION — NO TRADITIONAL RP ADAPTATION: Traditional RP is
// principally a pronunciation target, not a fixed modern slang register;
// a "period slang" version would be a costume, not a voice. The RP
// course offers Original + Plain Meaning only. launch_lint fails the
// build if an `rp:` adaptation ever appears in a chunk.
//
// STORAGE: content lives in per-range chunk modules (sonnets-001-014.js
// etc.) loaded with dynamic import() ONLY when a sonnet is opened — the
// app shell never parses the catalog. Tests and the review page load
// chunks on demand too.
//
// REVIEW: every text here is a DRAFT until a human approves it in
// js/data/edition-reviews.js (see that file for the ledger shape).
// Learner surfaces render only approved texts; drafts appear solely in
// the protected #review interface.
//
// THE FIVE PILOT SONNETS (18, 29, 73, 116, 130) stay in
// js/data/recasts.js — the loader below serves them from there so the
// original 23-item review queue remains the single home of those drafts
// and nothing is duplicated. That is a decision about where the TEXT
// lives.
//
// ONE GATE (2026-09-25). Approval is NOT split by where the text lives:
// every one of the 154 sonnets answers to edition-reviews.js through
// editionStatus, which demands a verdict AND a named reviewer for each
// required review. The pilots used to answer to a second, weaker map
// (TRANSPOSITION_REVIEW: a flat 'approved' string, no reviewer, no
// literary/dialect split), which would have given five of the most-read
// texts in the app a thinner audit trail than sonnet 12 has. That map is
// now history, not a gate — see recasts.js.
//
// editionStatus itself moved to edition-reviews.js, beside the ledger it
// reads, so recasts.js can resolve approval without importing this
// module and forming a cycle. Re-exported here: every existing caller is
// unchanged.

import { RECASTS } from '../recasts.js';
import { editionStatus } from '../edition-reviews.js';

export { editionStatus };

export const LEGACY_SONNETS = [18, 29, 73, 116, 130];

// Grows batch by batch; `expect` = entries in the chunk (range minus any
// legacy sonnets inside it). launch_lint cross-checks every chunk file
// against this manifest.
export const EDITION_CHUNKS = [
  { file: 'sonnets-001-014', from: 1, to: 14, expect: 14 },
  { file: 'sonnets-015-028', from: 15, to: 28, expect: 13 },
  { file: 'sonnets-029-042', from: 29, to: 42, expect: 13 },
  { file: 'sonnets-043-056', from: 43, to: 56, expect: 14 },
  { file: 'sonnets-057-070', from: 57, to: 70, expect: 14 },
  { file: 'sonnets-071-084', from: 71, to: 84, expect: 13 },
  { file: 'sonnets-085-098', from: 85, to: 98, expect: 14 },
  { file: 'sonnets-099-112', from: 99, to: 112, expect: 14 },
  { file: 'sonnets-113-126', from: 113, to: 126, expect: 13 },
  { file: 'sonnets-127-140', from: 127, to: 140, expect: 13 },
  { file: 'sonnets-141-154', from: 141, to: 154, expect: 14 },
];

// Flipped to true by the FINAL batch; integrity checks then demand the
// full 154 of every kind. FLIPPED 2026-08-12 — the catalog is complete:
// 149 new sonnets in 11 chunks + the 5 pilots in recasts.js = 154.
export const EDITION_CATALOG_COMPLETE = true;

// ── Line-for-line alignment ───────────────────────────────────
// The In Today's Voice transpositions are written one line per line of
// the original, so all 154 Neutral American texts pair up with the verse
// exactly. That is worth using and worth checking: this
// returns the split lines ONLY when the count matches, and null when it
// does not, so a pane can never draw an alignment that is not there.
//
// ALL 154 match as of 2026-09-25. Four did not (26, 29, 73 and 112): two
// had compressed four lines of the original into three, two had spread
// them over more, and all four were re-lineated to fourteen. The fallback
// stays because it still protects ssbe and aus, where nothing is aligned
// yet, and because falling back is the correct failure.
//
// Alignment is not permission. A caller still has to check the review
// gate — this answers a question about SHAPE, not about approval.
export function alignedLines(text, originalLineCount) {
  if (typeof text !== 'string' || !originalLineCount) return null;
  const ls = text.split('\n').map(l => l.trim()).filter(Boolean);
  return ls.length === originalLineCount ? ls : null;
}

const chunkCache = new Map();

async function loadChunk(chunk) {
  if (!chunkCache.has(chunk.file)) {
    chunkCache.set(chunk.file, import(`./${chunk.file}.js`).then(m => m.EDITIONS));
  }
  return chunkCache.get(chunk.file);
}

/**
 * The full edition record for one sonnet, or null when its batch is not
 * written yet. Uniform shape for legacy and new sonnets:
 *   { n, legacy, plain, plainStatus, voices: {nam,ssbe,aus}, voiceStatus(d) }
 *
 * `legacy` says where the TEXT lives, and nothing more. Since the gate was
 * unified (2026-09-25) both branches resolve approval the same way, through
 * editionStatus, so a pilot is held to the same named-reviewer standard as
 * any other sonnet.
 */
export async function editionFor(n) {
  if (LEGACY_SONNETS.includes(n)) {
    const r = RECASTS[n];
    if (!r) return null;
    return {
      n, legacy: true,
      plain: r.plain,
      plainStatus: editionStatus(n, 'plain'),
      voices: { nam: r.recasts.nam ?? null, ssbe: r.recasts.ssbe ?? null, aus: r.recasts.aus ?? null },
      voiceStatus: d => editionStatus(n, d),
    };
  }
  const chunk = EDITION_CHUNKS.find(c => n >= c.from && n <= c.to);
  if (!chunk) return null;
  const editions = await loadChunk(chunk);
  const e = editions[n];
  if (!e) return null;
  return {
    n, legacy: false,
    plain: e.plain,
    plainStatus: editionStatus(n, 'plain'),
    voices: { nam: e.nam, ssbe: e.ssbe, aus: e.aus },
    voiceStatus: d => editionStatus(n, d),
  };
}

/** Every written NEW edition (legacy pilots excluded) — for tests and
 *  the review interface only; never on the app's hot path. */
export async function allEditions() {
  const out = {};
  for (const chunk of EDITION_CHUNKS) {
    const editions = await loadChunk(chunk);
    for (const [n, e] of Object.entries(editions)) out[n] = e;
  }
  return out;
}
