// Review ledger for the Build F sonnet editions (js/data/editions/).
//
// EVERY edition text starts as a draft by construction: absence from this
// map IS draft status. A text reaches learners only when a HUMAN reviewer
// records their approval here — Claude may author and revise drafts but
// can never approve its own literary or dialect writing, and nothing may
// be batch-approved.
//
// Key: '<sonnet>.<kind>' where kind is 'plain' | 'nam' | 'ssbe' | 'aus'.
// Record shape (write every field):
//   '18.nam': {
//     literary: { status: 'approved', reviewer: 'A. Name', date: '2026-…' },
//     dialect:  { status: 'approved', reviewer: 'B. Name', date: '2026-…' },
//     verdict: 'approved',            // set by the final human reviewer
//     revisionNotes: '…or empty…',
//   }
// Plain Meaning needs the literary review only; a voice needs BOTH
// literary and dialect/register review before the loader treats it as
// approved (editions/index.js enforces this).
//
// THE FIVE PILOT SONNETS ARE TRACKED HERE TOO, since 2026-09-25. Their
// TEXTS still live in js/data/recasts.js — that is unchanged — but their
// APPROVAL is resolved here like every other sonnet's. Before that they
// answered to a second map, TRANSPOSITION_REVIEW, which recorded a flat
// 'approved' string with no reviewer and no literary/dialect split. Five
// of the most-read texts in the app would have carried a thinner audit
// trail than sonnet 12, and the frontier reaching sonnet 18 is what
// surfaced it. One ledger, one standard, 154 sonnets.

// ── Working set, batch 1 (owner read and approved 2026-09-24) ──
// Plain Meanings only: the Shakespeare course is Neutral American, so no
// dialect voice is written or reviewed here (owner decision, same day).
//
// These are OWNER EDITORIAL approvals. Frankie read each Plain Meaning
// against its original at #review and spoke for it individually; nothing
// was batch-approved, and no credentialed Shakespeare scholar has
// reviewed any of them. The revisionNotes on every entry say so, because
// the reviewer field alone would imply more than happened.
const OWNER_LIT = { status: 'approved', reviewer: 'Product owner', date: '2026-09-24' };
const OWNER_NOTE = 'Owner editorial approval, read against the original at #review. '
  + 'NOT a scholarly sign-off: no Shakespeare specialist has reviewed this text.';

// A VOICE needs a dialect/register review as well as a literary one, and
// the owner gives both. He is a native speaker of Neutral American and
// recorded the app's 42 nam phonemes himself, so the register read is
// his to give — but it is one person signing both halves, which the
// note states rather than leaving the two reviewer fields to imply
// independence they do not have.
const OWNER_DIA = { status: 'approved', reviewer: 'Product owner', date: '2026-09-24' };

// Batch 4 was read on the 25th. The date is the day the reviewer actually
// read it, never the day the batch was written, so it gets its own pair
// rather than borrowing the 24th's.
const OWNER_LIT_25 = { status: 'approved', reviewer: 'Product owner', date: '2026-09-25' };
const OWNER_DIA_25 = { status: 'approved', reviewer: 'Product owner', date: '2026-09-25' };
const VOICE_NOTE = 'Owner approval, read line by line against the original. Both the '
  + 'literary and the Neutral American register read are his: he is a native speaker of '
  + 'the target dialect. ONE person signed both halves — NOT an independent specialist '
  + 'review, and NOT a scholarly sign-off on the Shakespeare.';

// ── The five pilots' Plain Meanings, MIGRATED 2026-09-25 ──
// These are NOT new approvals. Sonnets 18, 29, 73, 116 and 130 have had
// live Plain Meanings since the pilots shipped, recorded as
// `plain: 'approved'` in TRANSPOSITION_REVIEW and read by the owner on
// 2026-09-24. Unifying the gate means the loader reads this file instead
// of that map, so without these five entries five live texts would have
// silently reverted to draft — a content regression dressed up as a
// refactor. The verdict is the owner's existing one, carried across with
// its reviewer named for the first time.
const PILOT_MIGRATION = ' Plain Meaning live since the pilots shipped; this entry '
  + 'MIGRATES the owner’s existing approval (recorded 2026-09-24) into the one '
  + 'ledger when the gate was unified on 2026-09-25. No new review took place.';

export const EDITION_REVIEWS = {
  '18.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE + PILOT_MIGRATION },
  '29.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE + PILOT_MIGRATION },
  '73.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE + PILOT_MIGRATION },
  '116.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE + PILOT_MIGRATION },
  '130.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE + PILOT_MIGRATION },

  '12.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '15.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '30.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '55.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '60.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },

  // ── Batch 2, love and loss (owner read and approved 2026-09-24) ──
  '27.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '40.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Reads "this more" as the mistress and the sonnet as '
      + 'betrayal, which is the majority reading but not the only one; approved with that '
      + 'single reading by owner decision after the alternative was raised.' },
  '64.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '65.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '71.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Closing sentence rewritten before approval: it had '
      + 'addressed reviewers rather than the learner.' },

  // ── Batch 3, worth and its withdrawal (owner approved 2026-09-24) ──
  '87.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '91.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '94.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Checked specifically for a hidden verdict: the text '
      + 'keeps the poem ambiguous between praise and warning rather than resolving what '
      + 'four centuries of critics have not.' },
  '104.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '106.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },

  // ── Batch 4, the Dark Lady group (owner approved 2026-09-24) ──
  '127.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: added a note that "black" in '
      + 'this group carries associations a modern reader cannot hear neutrally, and that '
      + 'the performance choice should be made deliberately.' },
  '129.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: the opening phrase is now '
      + 'glossed as physical (spirit as semen, expense as spending, a pun on waist), which '
      + 'the feature spec requires for sexual language and the draft had passed over.' },
  '138.plain': { literary: OWNER_LIT, verdict: 'approved', revisionNotes: OWNER_NOTE },
  '141.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: two clauses reversed the '
      + 'original sense, on "tender feeling, to base touches prone" and on "who leaves '
      + 'unswayed the likeness of a man".' },
  '147.plain': { literary: OWNER_LIT, verdict: 'approved',
    revisionNotes: OWNER_NOTE + ' Revised before approval: added a note on the closing '
      + 'line, where blackness is doing moral work rather than description.' },

  // ── In Today's Voice, Neutral American — batch 1 (2026-09-24) ──
  // The FIRST dialect voices approved anywhere in the catalog. Until now
  // every one of the 154 x 3 transpositions was a draft.
  //
  // What this unlocks: the transpositions are written one line per line
  // of the original, so an approved nam voice makes Side by Side pair up
  // line for line on that sonnet instead of showing the Plain Meaning
  // paragraph. That is the point of approving them.
  //
  // A voice needs BOTH a literary and a dialect/register review, and
  // these carry both from the same person. He is a native speaker of the
  // target register and recorded the app's 42 Neutral American phonemes
  // himself, so the dialect read is genuinely his to give. It is still
  // an OWNER read rather than an independent specialist's, and it is not
  // a scholarly sign-off on the Shakespeare. The notes say so on every
  // entry, because the reviewer field alone would imply more.
  //
  // Read five at a time, line by line against the original, and called
  // individually. Four lines were rewritten first and re-read before the
  // batch was approved; each entry records which and why.
  '1.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 8 rewritten before approval: “thy sweet self” is '
      + 'his OWN self, and the draft split the line between him and the speaker '
      + '(“someone I care about”), which loses the self-harm the line is about.' },
  '2.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 9 rewritten before approval: the draft replaced '
      + '“How much more praise deserv’d” with a bare stage direction, throwing away the '
      + 'comparative the whole sestet turns on.' },
  '3.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 5 to 7 redistributed before approval: the draft '
      + 'compressed the original’s 5 AND 6 into its line 5, so lines 6 and 7 were '
      + 'answering the line above them. Matching line COUNTS had hidden it — only '
      + 'reading the pairs shows it.' },
  '4.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Line 1 rewritten before approval: “unthrifty” is '
      + 'spendthrift, and the draft’s “cheap” pulled toward the miser, who is line 5.' },
  '5.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },

  // ── Batch 2, sonnets 6 to 10 (owner approved 2026-09-24) ──
  // Heavier than batch 1: three of the five had drifted, plus an
  // invented line. The failure is always the same shape — one line
  // swallows a line and a half of the original and pushes everything
  // after it a step out — and the line COUNTS stay perfect throughout,
  // so alignedLines() cannot see any of it. Only reading the pairs can.
  '6.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 9 and 10 un-swapped before approval: the '
      + 'original puts the claim on 9 and the condition on 10, and the draft had them '
      + 'the other way round.' },
  '7.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged. Its opening quatrain '
      + 'redistributes Shakespeare’s enjambment and still pairs.' },
  '8.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 5 to 7 rewritten before approval: the draft '
      + 'dropped the conditional. Shakespeare allows that the harmony MIGHT offend him '
      + 'and says it would only be a gentle reproof; the draft asserted both and rewired '
      + 'the rhetoric with an added “Here’s why:”.' },
  '9.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Lines 4 to 8 redistributed before approval: line 4 had '
      + 'swallowed the original’s 4 AND 5, so the contrast between the world’s grief and '
      + 'the ordinary widow’s consolation fell on the wrong lines.' },
  '10.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Three fixes before approval: lines 5 to 8 had drifted '
      + 'by one and lost “murderous hate” entirely; line 8 was INVENTED commentary with '
      + 'no counterpart in the sonnet (“That’s not neutrality. That’s hate with a plan.”) '
      + 'and is gone; line 13’s “for love of me” is his love for the speaker, and the '
      + 'draft had turned it around.' },

  // ── Batch 3, sonnets 11 to 15 (owner approved 2026-09-24) ──
  // The cleanest batch so far: no drift anywhere, and nothing rewritten.
  // Three word choices in 11 were raised, weighed and deliberately left,
  // which is recorded here so nobody "fixes" them later.
  '11.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged, with three readings considered and '
      + 'KEPT: line 14 renders Shakespeare\u2019s \u201ccopy\u201d as \u201coriginal\u201d, which is right for '
      + 'a modern ear \u2014 in Elizabethan printing the copy is the master a printer works '
      + 'from, and \u201ccopy\u201d now means the opposite. Line 7\u2019s consequence sits in line 8, '
      + 'and \u201cfor store\u201d is softened to \u201cbuilt without care\u201d; both are half a line and '
      + 'self-correcting.' },
  '12.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },
  '13.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged. \u201cDetermination\u201d is read in its legal '
      + 'sense, as the lease running out, which is correct.' },
  '14.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },
  '15.nam': { literary: OWNER_LIT, dialect: OWNER_DIA, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged.' },

  // ── Batch 4, sonnets 16 to 20 (owner approved 2026-09-25) ──
  // The batch that reached the first PILOT. Sonnet 18 is the first of the
  // five to carry a full record here: before the gate was unified on
  // 2026-09-25 it could only have been approved as a flat string with
  // nobody's name on it, which is why the unification came first.
  // One sonnet was rewritten (16). Four were approved unchanged, with
  // several readings raised, weighed and KEPT — recorded so nobody
  // “fixes” them later believing they were oversights.
  '16.nam': { literary: OWNER_LIT_25, dialect: OWNER_DIA_25, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' REWRITTEN before approval. Two line crossings were '
      + 'found by reading the pairs: lines 1 and 2 had swapped their content, so the '
      + 'numbered line about a “mightier way” sat beside the one about the bloody tyrant, '
      + 'and “barren rhyme” was used twice because half of line 4 had migrated up to line '
      + '2; lines 11 and 12 had inverted the negation and the verb. Both are now where '
      + 'the original puts them. The line counts never changed, so alignedLines could '
      + 'not have caught either one. Two readings KEPT: line 7 renders “virtuous wish” as '
      + '“gladly”, dropping the chastity sense, and line 9 names “lines of life” as '
      + 'children outright, which the original leaves as euphemism.' },
  '17.nam': { literary: OWNER_LIT_25, dialect: OWNER_DIA_25, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged, with two word choices in line 11 '
      + 'raised and KEPT: “true measure” for “true rights” (what is rightfully owed you), '
      + 'which sits directly above “meter” in line 12 where the metrical word actually '
      + 'belongs; and “poet’s hype” for “poet’s rage”, which moves poetic frenzy toward '
      + 'commercial overselling. Both were offered for change and deliberately left.' },
  '18.nam': { literary: OWNER_LIT_25, dialect: OWNER_DIA_25, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' THE FIRST PILOT RECORDED HERE. Its text still lives in '
      + 'js/data/recasts.js; only the approval moved. This is also the first pilot '
      + 'transposition a learner can see: In Today’s Voice now appears on sonnet 18 in '
      + 'Neutral American. Approved unchanged, and it is LOOSER than sonnets 1 to 17 '
      + 'because it was written earlier, as the structural pilot, before the later '
      + 'batches set the bar. Four readings were raised and KEPT: “eternal” is dropped at '
      + 'lines 9 and 12 though it is the hinge the poem turns on; line 8 renders '
      + '“nature’s changing course” as “time”, flattening the original’s chance-or-nature '
      + 'pairing; line 13 renders “eyes can see” as “read”; and the couplet’s two claims, '
      + 'that the verse lives and that it gives life, collapse into one. Never drifts '
      + 'across a line: all fourteen carry their own line’s sense.' },
  '19.nam': { literary: OWNER_LIT_25, dialect: OWNER_DIA_25, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged. One reading raised and KEPT: line '
      + '14 ends “my love stays young in this”, where the original names the verse '
      + 'outright, so the pronoun points at nothing inside the American text. Offered '
      + 'as “in my verse” and deliberately left.' },
  '20.nam': { literary: OWNER_LIT_25, dialect: OWNER_DIA_25, verdict: 'approved',
    revisionNotes: VOICE_NOTE + ' Approved unchanged, and it carries ONE DELIBERATE '
      + 'EDITORIAL INTERVENTION, signed knowingly rather than let through: line 4 '
      + 'renders “as is false women’s fashion” as what convention keeps accusing women '
      + 'of. Shakespeare states it; the text attributes it to custom instead. That is '
      + 'the one place in twenty sonnets where the voice argues with the original rather '
      + 'than carrying it, and the Plain Meaning frames it the same way. Line 13 keeps '
      + '“marked you out” for “prick’d thee out”, which drops the bawdy pun the Plain '
      + 'Meaning already tells reviewers to note.' },
};

// Approval resolution — draft by construction unless a human recorded
// the required review(s) above. Plain needs the literary review; a voice
// needs BOTH literary and dialect/register review. A verdict with nobody's
// name on it is not an approval, which is why the reviewer field is
// checked and not just the status.
//
// It lives here, beside the ledger it reads, so that recasts.js can
// resolve approval without importing editions/index.js — index.js already
// imports recasts.js, and the reverse would be a cycle. index.js
// re-exports this, so every existing caller is untouched.
export function editionStatus(n, kind) {
  const r = EDITION_REVIEWS[`${n}.${kind}`];
  if (!r || r.verdict !== 'approved') return 'draft';
  const lit = r.literary?.status === 'approved' && r.literary?.reviewer;
  if (kind === 'plain') return lit ? 'approved' : 'draft';
  const dia = r.dialect?.status === 'approved' && r.dialect?.reviewer;
  return lit && dia ? 'approved' : 'draft';
}
