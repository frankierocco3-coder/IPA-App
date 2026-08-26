# What needs review

Every unapproved item in Speechcraft, grouped by the reviewer who has to sign
it off. Counts are read from the modules, not carried over from notes.

## The whole queue

| What | Items | Reviewer | Can a learner see it now? |
|---|---:|---|---|
| Sonnet learning editions | **616** | literary; plus dialect for the voice versions | No |
| Accent Bridge comparisons | **73** | dialect, per accent | No (also behind a kill switch) |
| Articulation guides | **62** | voice professional or SLP | **Yes**, badged draft |
| Speech chapters | **39** | voice professional or SLP; acting teacher | **Yes**, owner-approved |
| Dialect in Action pieces | **8** | literary AND dialect | No (also behind a kill switch) |
| | **798** | | |

The 616 sonnet texts are 154 sonnets by four versions each: Plain Meaning plus
Neutral American, Standard British and Australian. The five pilot sonnets
(18, 29, 73, 116, 130) are inside that number, not extra.

---

## The distinction that matters

**Two of these are already in front of learners.** The 62 articulation guides
and the 39 Speech chapters are visible today. The guides carry a draft badge;
the Speech chapters are published under owner approval and are still waiting on
a specialist. Nothing about them is hidden or dishonest, but they are the ones
where review is about risk rather than availability.

**The other 686 are invisible until approved.** No learner has ever seen a
sonnet edition, a bridge comparison or an action piece. Reviewing those unlocks
content; reviewing the first two validates content already in use.

If you only get one reviewer, get the voice professional. They cover the 62
guides and most of the 39 Speech chapters, which is everything currently live.

---

## By reviewer

### Voice professional or speech-language pathologist

**62 articulation guides.** Full text with verdict lines:
`docs/REVIEW_ARTICULATION_GUIDES.md`. Live in the app now, badged draft.

**Most of the 39 Speech chapters.** Anatomy, breath and vocal-health bodies.
Currently `owner-approved`, which publishes them but does NOT clear the
specialist requirement. See `docs/SPEECH_REVIEW.md` and the in-app `#review`
gate.

### Dialect reviewer, one per accent

**73 Accent Bridge comparisons** across 11 routes. The nam to rp route is
already approved and is not in this list.

| Route | Awaiting |
|---|---:|
| Neutral American to Standard British | 7 |
| Neutral American to Australian | 7 |
| Traditional RP to Neutral American | 7 |
| Traditional RP to Standard British | 5 |
| Traditional RP to Australian | 7 |
| Standard British to Neutral American | 7 |
| Standard British to Traditional RP | 5 |
| Standard British to Australian | 7 |
| Australian to Neutral American | 7 |
| Australian to Traditional RP | 7 |
| Australian to Standard British | 7 |

Claims are cited source by source in `docs/REVIEW_PACKET_v1.md`.
Note the Bridge is also switched off (`BRIDGE_LIVE = false`), so approving
these does not by itself put them in front of anyone.

### Literary reviewer, plus dialect for the voice versions

**616 sonnet learning editions.** 154 sonnets by four versions. The ledger
`js/data/edition-reviews.js` is empty, so every one reads as draft. The
in-app `#review` gate has a per-sonnet inspector.

### Literary AND dialect together

**8 Dialect in Action pieces.** Each needs both sign-offs; the `review` field
on each piece has separate `literary` and `dialect` slots.

| Piece | Course | Type |
|---|---|---|
| Changing Plans | nam | dialogue |
| The Road Trip That Wasn't | nam | monologue |
| The Garden Party Question | rp | dialogue |
| The Tuck Shop Ledger | rp | monologue |
| After the Shift | ssbe | dialogue |
| Moving Day | ssbe | monologue |
| Over the Fence | aus | dialogue |
| The One About the Tent | aus | monologue |

---

## How to record a verdict

Per item, with a name and a date. The rule across this project is that batch
approval does not count and an unnamed reviewer does not count. Approval means
editing the `reviewStatus` or ledger entry in the data file.

Claude is never a reviewer on any of these.

## Where to read drafts as a learner would see them

Open the app and go to `#review`. It renders the written drafts in their real
presentation rather than as raw data, which is the honest way to judge them.

