// Narration kept on this device, for offline listening.
//
// WHY THIS EXISTS (2026-10-04, docs/STORE_PLAN.md). Sonnet narration is
// 212.9MB across 5,159 files — 73% of all the audio, for a reader
// enhancement on one shelf. A store build bundles the 75.6MB of course
// audio and leaves narration out, so the app needs a way to fetch a
// reading afterwards. On the web the same mechanism is worth having on
// its own terms: it makes offline narration something you ASK for rather
// than something the cache happened to keep.
//
// THE HONESTY PROBLEM THIS SOLVES. js/data/audio-coverage.js is generated
// at build time from what is on disk, and until now it was the only
// answer to "which readings exist". In a bundle it regenerates to zero,
// which is correct — but then nothing could ever become available again,
// because a build-time constant cannot learn. `localNarration()` is the
// second half of that answer: what this DEVICE has. The reader offers a
// voice when EITHER says so, and claims nothing it cannot play.
//
// Storage: one record per line, keyed by the clip's own relative path, so
// a half-finished download is simply fewer rows and resuming is free.

import { STORES, dbSupported, idbAllBy, idbPut, idbDeleteMany } from './db.js';
import { audioUrl } from './audio.js';

/** The set a line belongs to: one sonnet in one dialect. */
export const narrationSetId = (n, dialect) => `sonnet:${n}:${dialect}`;
/**
 * The clip path for one line, which is also its record id.
 *
 * `line` IS 1-BASED, because the files are: sonnets/nam/18-1.mp3 through
 * 18-14.mp3, with no 18-0. The reader agrees — every call site passes
 * `i + 1` into clip() — so the stored keys line up with what playback
 * asks for. A 0-based loop here fetched a 404 for line 0 and silently
 * missed the last line, leaving a reading that looked downloaded and was
 * one line short.
 */
export const narrationPath = (n, dialect, line) => `sonnets/${dialect}/${n}-${line}.mp3`;

// Object URLs handed to <audio>. Revoked together on teardown — the shell
// calls releaseNarrationUrls() from teardownAV, the same way recordings
// release theirs, because a reader re-rendered a dozen times would
// otherwise leak a dozen sets of blobs for the life of the tab.
const liveUrls = new Set();

export function releaseNarrationUrls() {
  for (const u of liveUrls) {
    try { URL.revokeObjectURL(u); } catch { /* already gone */ }
  }
  liveUrls.clear();
}

/** Every stored line of one reading, as { '<path>': blob }. */
async function storedSet(n, dialect) {
  if (!dbSupported()) return {};
  const rows = await idbAllBy(STORES.narration, 'setId', narrationSetId(n, dialect))
    .catch(() => []);
  const out = {};
  for (const r of rows) if (r?.id && r.blob) out[r.id] = r.blob;
  return out;
}

/**
 * Is this whole reading here? `lineCount` comes from the sonnet itself, so
 * a partial download is never mistaken for a complete one — the same rule
 * tools/longform_coverage.py applies when generating the build-time list.
 */
export async function narrationComplete(n, dialect, lineCount) {
  const have = await storedSet(n, dialect);
  for (let i = 1; i <= lineCount; i++) {
    if (!have[narrationPath(n, dialect, i)]) return false;
  }
  return lineCount > 0;
}

/**
 * Playable URLs for a reading, as { lineIndex: objectURL }, or null when
 * it is not all here. Callers must not hold these past a teardown.
 */
export async function narrationUrls(n, dialect, lineCount) {
  const have = await storedSet(n, dialect);
  const urls = {};
  for (let i = 1; i <= lineCount; i++) {
    const blob = have[narrationPath(n, dialect, i)];
    if (!blob) return null;                       // partial is not playable
    const u = URL.createObjectURL(blob);
    liveUrls.add(u);
    urls[i] = u;
  }
  return urls;
}

/** Bytes this reading occupies, or 0 if none of it is here. */
export async function narrationBytes(n, dialect) {
  const have = await storedSet(n, dialect);
  return Object.values(have).reduce((t, b) => t + (b?.size ?? 0), 0);
}

// THE ONE EXTERNAL ORIGIN IN THIS APP, and the only file allowed to name
// it (tools/security_audit.py enforces that, and fails if it appears
// anywhere else). Hard constraint 3 was amended for this on 2026-10-04 by
// the owner's explicit decision: a store bundle ships without the 212.9MB
// of readings and has no same-origin copy to fetch, so narration — and
// only narration — may come from the audio site.
//
// It buys `connect-src` and nothing more. The bytes are stored and played
// from blob: URLs, so `media-src` stays at 'self' blob: and no remote URL
// is ever handed to an <audio> element. If the audio moves to a custom
// domain (docs/CUSTOM_DOMAIN.md), this moves with it.
export const NARRATION_ORIGIN = 'https://frankierocco3-coder.github.io';
const remoteNarrationUrl = rel => `${NARRATION_ORIGIN}/IPA-Audio/${rel}`;

/**
 * Fetch and store one reading. Reports progress as a fraction, and
 * resolves { ok, stored, failed, source }. Already-stored lines are
 * skipped, so calling it again after a failure finishes the job rather
 * than restarting.
 *
 * SAME-ORIGIN FIRST, ALWAYS. On the web audioUrl() already resolves to the
 * audio site and nothing external happens. Only when that answers 404 —
 * which is what a bundle looks like, because it carries course audio and
 * no readings — does it fall back to the remote origin. The probe runs
 * ONCE per download rather than per line, so the web path costs nothing.
 */
export async function downloadNarration(n, dialect, lineCount, onProgress) {
  if (!dbSupported()) return { ok: false, stored: 0, failed: lineCount, source: 'none' };
  const have = await storedSet(n, dialect);
  let stored = 0, failed = 0;

  // One probe decides where the rest of this reading comes from.
  let useRemote = false;
  const firstMissing = (() => {
    for (let i = 1; i <= lineCount; i++) {
      if (!have[narrationPath(n, dialect, i)]) return narrationPath(n, dialect, i);
    }
    return null;
  })();
  if (firstMissing) {
    try {
      const probe = await fetch(audioUrl(firstMissing), { method: 'HEAD' });
      useRemote = !probe.ok;
    } catch {
      useRemote = true;                           // no same-origin copy at all
    }
  }
  const urlFor = path => (useRemote ? remoteNarrationUrl(path) : audioUrl(path));

  for (let i = 1; i <= lineCount; i++) {
    const path = narrationPath(n, dialect, i);
    if (have[path]) { stored++; onProgress?.(i / lineCount); continue; }
    try {
      const res = await fetch(urlFor(path));
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      await idbPut(STORES.narration,
        { id: path, setId: narrationSetId(n, dialect), blob, savedAt: Date.now() });
      stored++;
    } catch {
      failed++;                                   // offline, or a line that was never recorded
    }
    onProgress?.(i / lineCount);
  }
  return { ok: failed === 0 && stored === lineCount, stored, failed,
           source: useRemote ? 'remote' : 'same-origin' };
}

/** Remove one reading from this device. */
export async function removeNarration(n, dialect, lineCount) {
  if (!dbSupported()) return 0;
  const keys = [];
  for (let i = 1; i <= lineCount; i++) keys.push(narrationPath(n, dialect, i));
  // One transaction, so a reading never half-disappears.
  await idbDeleteMany(STORES.narration, keys).catch(() => {});
  releaseNarrationUrls();                         // any URL into it is now dead
  return keys.length;
}
