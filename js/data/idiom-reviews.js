// Words & Expressions review ledger — the gate the idiom library never had.
//
// Built 2026-09-27 on owner order. Until that day this was the only body of
// learner-facing writing in the app with NO review gate at all: sonnets,
// lessons, Dialect in Action pieces and Accent Bridge comparisons each
// answer to a ledger, and an idiom entry shipped the moment it was written.
// 219 American entries were added that day and reached learners on push
// with nobody but Claude having read them. That is what this closes.
//
// ── The rule ──────────────────────────────────────────────────
// ABSENCE FROM THIS FILE MEANS DRAFT, the same rule edition-reviews.js and
// speech/reviews.js use. A draft renders ONLY in the protected #review
// area, never on a learner surface and never in a drill.
//
// ── Three states, because two would have required a lie ───────
//   approved  a NAMED human recorded a dialect read here: that the term is
//             really said, in that register, with that meaning, by speakers
//             of that dialect. Claude may write these entries and may never
//             approve them.
//   carried   present in the app BEFORE this gate existed. Not a review and
//             not pretending to be one. See below.
//   draft     everything else, including every word Claude wrote today.
//
// ── What "carried" actually means ─────────────────────────────
// The 426 ids below predate the gate. js/data/idiom.js records their
// provenance: "SOURCE: idiom-lists-v1.md, authored and reviewed as prose,
// then converted here." That is a real and documented history, and it is
// NOT a named specialist review — no reviewer, no date, no credential.
//
// They are carried rather than hidden because a gate introduced on Monday
// must not delete Friday's app: these entries have been live for weeks,
// across five dialects, and withdrawing them wholesale would be a content
// regression dressed up as governance. They stay visible, they are listed
// in #review as still owing a named dialect read, and the distinction is
// recorded here rather than smoothed into the word "approved".
//
// The honest summary: nothing in this library has had a named specialist
// review. 426 entries have documented provenance; 219 have Claude.

export const CARRIED_PROVENANCE =
  'Present before the review gate existed (2026-09-27). Converted from '
  + 'idiom-lists-v1.md, which js/data/idiom.js records as authored and '
  + 'reviewed as prose. NOT a named specialist review: no reviewer, no date. '
  + 'Still owes a dialect read by a native or expert speaker.';

// Ids that predate the gate. A flat list, not 426 object literals, because
// they share one provenance exactly — spelling it out per entry would imply
// 426 separate judgements that were never made.
export const CARRIED = new Set([
  'AUS-001', 'AUS-002', 'AUS-003', 'AUS-004', 'AUS-005', 'AUS-006',
  'AUS-007', 'AUS-008', 'AUS-009', 'AUS-010', 'AUS-011', 'AUS-012',
  'AUS-013', 'AUS-014', 'AUS-015', 'AUS-016', 'AUS-017', 'AUS-018',
  'AUS-019', 'AUS-020', 'AUS-021', 'AUS-022', 'AUS-023', 'AUS-024',
  'AUS-025', 'AUS-026', 'AUS-027', 'AUS-028', 'AUS-029', 'AUS-030',
  'AUS-031', 'AUS-032', 'AUS-033', 'AUS-034', 'AUS-035', 'AUS-036',
  'AUS-037', 'AUS-038', 'AUS-039', 'AUS-040', 'AUS-041', 'AUS-042',
  'AUS-043', 'AUS-044', 'AUS-045', 'AUS-046', 'AUS-047', 'AUS-048',
  'AUS-049', 'AUS-050', 'AUS-051', 'AUS-052', 'AUS-053', 'AUS-054',
  'AUS-055', 'AUS-056', 'AUS-057', 'AUS-058', 'AUS-059', 'AUS-060',
  'AUS-061', 'AUS-062', 'AUS-063', 'AUS-064', 'AUS-065', 'AUS-066',
  'AUS-067', 'AUS-068', 'AUS-069', 'AUS-070', 'AUS-071', 'AUS-072',
  'AUS-073', 'AUS-074', 'AUS-075', 'AUS-076', 'AUS-077', 'AUS-078',
  'AUS-079', 'AUS-080', 'AUS-081', 'AUS-082', 'AUS-083', 'AUS-084',
  'AUS-085', 'AUS-086', 'AUS-087', 'AUS-088', 'AUS-089', 'AUS-090',
  'COCKNEY-001', 'COCKNEY-002', 'COCKNEY-003', 'COCKNEY-004', 'COCKNEY-005', 'COCKNEY-006',
  'COCKNEY-007', 'COCKNEY-008', 'COCKNEY-009', 'COCKNEY-010', 'COCKNEY-011', 'COCKNEY-012',
  'COCKNEY-013', 'COCKNEY-014', 'COCKNEY-015', 'COCKNEY-016', 'COCKNEY-017', 'COCKNEY-018',
  'COCKNEY-019', 'COCKNEY-020', 'COCKNEY-021', 'COCKNEY-022', 'COCKNEY-023', 'COCKNEY-024',
  'COCKNEY-025', 'COCKNEY-026', 'COCKNEY-027', 'COCKNEY-028', 'COCKNEY-029', 'COCKNEY-030',
  'COCKNEY-031', 'COCKNEY-032', 'COCKNEY-033', 'COCKNEY-034', 'COCKNEY-035', 'COCKNEY-036',
  'COCKNEY-037', 'COCKNEY-038', 'COCKNEY-039', 'COCKNEY-040', 'COCKNEY-041', 'COCKNEY-042',
  'COCKNEY-043', 'COCKNEY-044', 'COCKNEY-045', 'COCKNEY-046', 'COCKNEY-047', 'COCKNEY-048',
  'COCKNEY-049', 'COCKNEY-050', 'COCKNEY-051', 'COCKNEY-052', 'COCKNEY-053', 'COCKNEY-054',
  'COCKNEY-055', 'COCKNEY-056', 'COCKNEY-057', 'COCKNEY-058', 'COCKNEY-059', 'COCKNEY-060',
  'NAM-030', 'NAM-034', 'NAM-038', 'NAM-039', 'NAM-040', 'NAM-041',
  'NAM-042', 'NAM-043', 'NAM-044', 'NAM-046', 'NAM-047', 'NAM-049',
  'NAM-050', 'NAM-052', 'NAM-053', 'NAM-054', 'NAM-055', 'NAM-056',
  'NAM-058', 'NAM-059', 'NAM-060', 'NAM-061', 'NAM-062', 'NAM-063',
  'NAM-064', 'NAM-065', 'NAM-066', 'NAM-067', 'NAM-068', 'NAM-069',
  'NAM-070', 'RP-001', 'RP-002', 'RP-003', 'RP-004', 'RP-005',
  'RP-006', 'RP-007', 'RP-008', 'RP-009', 'RP-010', 'RP-011',
  'RP-012', 'RP-013', 'RP-014', 'RP-015', 'RP-016', 'RP-017',
  'RP-018', 'RP-019', 'RP-020', 'RP-021', 'RP-022', 'RP-023',
  'RP-024', 'RP-025', 'RP-026', 'RP-027', 'RP-028', 'RP-029',
  'RP-030', 'RP-031', 'RP-032', 'RP-033', 'RP-034', 'RP-035',
  'RP-036', 'RP-037', 'RP-038', 'RP-039', 'RP-040', 'RP-041',
  'RP-042', 'RP-043', 'RP-044', 'RP-045', 'RP-046', 'RP-047',
  'RP-048', 'RP-049', 'RP-050', 'RP-051', 'RP-052', 'RP-053',
  'RP-054', 'RP-055', 'RP-056', 'RP-057', 'RP-058', 'RP-059',
  'RP-060', 'RP-061', 'RP-062', 'RP-063', 'RP-064', 'SSBE-001',
  'SSBE-002', 'SSBE-003', 'SSBE-004', 'SSBE-005', 'SSBE-006', 'SSBE-007',
  'SSBE-008', 'SSBE-009', 'SSBE-010', 'SSBE-011', 'SSBE-012', 'SSBE-013',
  'SSBE-014', 'SSBE-015', 'SSBE-016', 'SSBE-017', 'SSBE-018', 'SSBE-019',
  'SSBE-020', 'SSBE-021', 'SSBE-022', 'SSBE-023', 'SSBE-024', 'SSBE-025',
  'SSBE-026', 'SSBE-027', 'SSBE-028', 'SSBE-029', 'SSBE-030', 'SSBE-031',
  'SSBE-032', 'SSBE-033', 'SSBE-034', 'SSBE-035', 'SSBE-036', 'SSBE-037',
  'SSBE-038', 'SSBE-039', 'SSBE-040', 'SSBE-041', 'SSBE-042', 'SSBE-043',
  'SSBE-044', 'SSBE-045', 'SSBE-046', 'SSBE-047', 'SSBE-048', 'SSBE-049',
  'SSBE-050', 'SSBE-051', 'SSBE-052', 'SSBE-053', 'SSBE-054', 'SSBE-055',
  'SSBE-056', 'SSBE-057', 'SSBE-058', 'SSBE-059', 'SSBE-060', 'SSBE-061',
  'SSBE-062', 'SSBE-063', 'SSBE-064', 'SSBE-065', 'SSBE-066', 'SSBE-067',
  'SSBE-068', 'SSBE-069', 'SSBE-070', 'SSBE-071', 'SSBE-072', 'SSBE-073',
  'SSBE-074', 'SSBE-075', 'SSBE-076', 'SSBE-077', 'SSBE-078', 'SSBE-079',
  'SSBE-080', 'SSBE-081', 'SSBE-082', 'SSBE-083', 'SSBE-084', 'SSBE-085',
  'SSBE-086', 'SSBE-087', 'SSBE-088', 'SSBE-089', 'SSBE-090', 'SSBE-091',
  'SSBE-092', 'SSBE-093', 'SSBE-094', 'SSBE-095', 'SSBE-096', 'SSBE-097',
  'SSBE-098', 'SSBE-099', 'SSBE-100', 'SSBE-101', 'SSBE-102', 'SSBE-103',
  'SSBE-104', 'SSBE-105', 'SSBE-106', 'SSBE-107', 'SSBE-108', 'SSBE-109',
  'SSBE-110', 'SSBE-111', 'SSBE-112', 'SSBE-113', 'SSBE-114', 'SSBE-115',
  'SSBE-116', 'SSBE-117', 'SSBE-118', 'SSBE-119', 'SSBE-120', 'SSBE-121',
  'SSBE-122', 'SSBE-123', 'SSBE-124', 'SSBE-125', 'SSBE-126', 'SSBE-127',
  'SSBE-128', 'SSBE-129', 'SSBE-130', 'SSBE-131', 'SSBE-132', 'SSBE-133',
  'SSBE-134', 'SSBE-135', 'SSBE-136', 'SSBE-137', 'SSBE-138', 'SSBE-139',
  'SSBE-140', 'SSBE-141', 'SSBE-142', 'SSBE-143', 'SSBE-144', 'SSBE-145',
  'SSBE-146', 'SSBE-147', 'SSBE-148', 'SSBE-149', 'SSBE-150', 'SSBE-151',
  'SSBE-152', 'SSBE-153', 'SSBE-154', 'SSBE-155', 'SSBE-156', 'SSBE-157',
  'SSBE-158', 'SSBE-159', 'SSBE-160', 'SSBE-161', 'SSBE-162', 'SSBE-163',
  'SSBE-164', 'SSBE-165', 'SSBE-166', 'SSBE-167', 'SSBE-168', 'SSBE-169',
  'SSBE-170', 'SSBE-171', 'SSBE-172', 'SSBE-173', 'SSBE-174', 'SSBE-175',
  'SSBE-176', 'SSBE-177', 'SSBE-178', 'SSBE-179', 'SSBE-180', 'SSBE-181'
]);

// Named reviews, recorded ONE AT A TIME by the owner. Shape:
//   'NAM-042': { verdict: 'approved',
//                dialect: { status: 'approved', reviewer: 'A. Name',
//                           date: '2026-..-..' },
//                notes: 'what the reviewer actually checked' }
// A verdict with nobody's name on it is not an approval, which is why the
// reviewer field is tested and not just the status.
export const IDIOM_REVIEWS = {};

export function idiomStatus(id) {
  const r = IDIOM_REVIEWS[id];
  if (r && r.verdict === 'approved'
      && r.dialect?.status === 'approved' && r.dialect?.reviewer) return 'approved';
  if (r) return 'draft';
  return CARRIED.has(id) ? 'carried' : 'draft';
}

// What a learner may see. Carried entries render; drafts never do.
export const idiomVisible = id => idiomStatus(id) !== 'draft';

// Everything still owing a named dialect read — carried and draft alike.
// The #review page lists both, because both are true and only one of them
// is currently hidden.
export const idiomAwaiting = id => idiomStatus(id) !== 'approved';
