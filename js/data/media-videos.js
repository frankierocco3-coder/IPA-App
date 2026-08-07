// Articulation-video manifest — the single typed registry for human
// mouth-articulation footage on the sound pages.
//
// NO VIDEOS EXIST YET. This file is the system, not the production: the
// player component renders ONLY for an entry whose reviewStatus is
// 'approved' and never fabricates availability. With the list empty the
// sound pages simply show nothing extra (Frankie's standing call: honest
// absence over "coming soon" chrome).
//
// ── Entry shape ───────────────────────────────────────────────
//   id            stable slug, e.g. 'nam-kit-isolated'
//   courseId      'nam' | 'rp' | 'ssbe' | 'aus' — the ONLY course whose
//                 pages may show this footage (exact-dialect rule)
//   symbol        PHONEMES key, e.g. 'ɪ'
//   kind          'isolated' | 'word' — two separately replayable videos
//   word          the example word for kind 'word' (null for isolated)
//   video         repo path, e.g. 'media/video/nam/kit_isolated.mp4'
//   poster        still shown before playback
//   captions      WebVTT path (captions/transcript are required for
//                 approval — accessibility is not optional)
//   speaker       who is on camera (internal, not learner-facing)
//   reviewStatus  'draft' | 'approved'
//   reviewer      who approved it, or null
//   articulation  { lips, tongue, jaw, voice } — the four instruction
//                 lines rendered beside the player
//
// Storage plan and hosting recommendation: docs/MEDIA_HOSTING.md.

export const ARTICULATION_VIDEOS = [];

// Pure lookup, exported for tests: only an approved entry for exactly this
// course + symbol + kind is ever returned.
export const videoLookup = (list, courseId, symbol, kind) =>
  list.find(v => v.courseId === courseId && v.symbol === symbol
    && v.kind === kind && v.reviewStatus === 'approved') ?? null;

export const videoFor = (courseId, symbol, kind) =>
  videoLookup(ARTICULATION_VIDEOS, courseId, symbol, kind);
