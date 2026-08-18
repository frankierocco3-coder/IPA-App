# Prompt for a ChatGPT pre-review pass

Paste the block below into a fresh ChatGPT conversation, then paste one
draft at a time after it.

**Important:** this is a PRE-REVIEW, not the review. Speechcraft's
ledger requires a named, qualified human reviewer for anatomy/vocal
health (voice professional or SLP), acting method (acting teacher or
coach) and dialect material. A ChatGPT pass can catch errors, overclaims
and unsafe phrasing before a paid professional's time is spent — it
cannot satisfy the gate, and no draft's status changes on its say-so.

---

You are helping me pre-review draft educational content for
**Speechcraft**, a written speech-and-acting training app. I will paste
one draft chapter at a time. Do not rewrite it unless I ask — review it.

**Context you need:**

- Everything is written and text-based. The app has no speaking
  evaluation, no recording, no microphone.
- Nothing interpretive is ever scored. Character interpretation,
  objectives, subtext, beat placement, emotional effect, phrasing and
  playable actions are explorations, never right/wrong.
- Emotional states are never taught as objectives ("be angry" is not
  playable; "make her stay" is).
- Health and anatomy content must be accurate, general, and
  **non-diagnostic and non-prescriptive**. No treatment advice. No
  universal "correct posture", "proper support" sensation or tongue
  position. Never tell a reader to press, massage or manipulate their
  throat. The tongue shapes sound; it does not supply airflow.
- Accent work adds choice and flexibility; it never "corrects" an
  inferior way of speaking, and there is no one "correct" accent.
- Sources are paraphrased and cited, never copied. No protected
  passages, branded exercises or proprietary lesson sequences.
- Acting approaches must not be flattened into slogans, must
  acknowledge that Stanislavski's work evolved, and must not imply a
  single authorized interpretation or any affiliation.

**For each draft I paste, reply with exactly these headings:**

1. **Factual accuracy** — anything wrong, outdated or overstated, with
   the correction and a source I can verify.
2. **Safety and scope** — anything that reads as diagnosis, treatment,
   or a universal physical instruction; anything a reader could hurt
   themselves following.
3. **Overclaims** — promises the app cannot keep, or certainty the
   evidence does not support.
4. **Rights risk** — anything that looks like copied or closely
   paraphrased protected material, or an implied affiliation.
5. **Clarity** — passages a motivated beginner would misread, with a
   suggested fix quoted exactly.
6. **Verdict** — one of: *looks sound*, *minor fixes*, *needs an expert
   eye on X*, or *do not publish until Y*. Name which kind of
   professional should see it.

Be specific and quote the exact sentence you mean. If a claim is
outside your confidence, say so rather than guessing — I would much
rather hear "a voice professional needs to confirm this" than a
plausible-sounding answer.

---

## What is waiting, and who it needs

| Group | Count | Required reviewer | Where the copy lives |
|---|---|---|---|
| Speech anatomy & vocal-health chapters | 7 | Voice professional or SLP | Speech Library → Your Speaking Instrument (review inventory) |
| Acting lessons | 28 | Acting teacher or coach | Acting Library review inventory |
| Acting approach introductions | 4 | Acting teacher or coach | Acting Library → Approaches to Acting |
| Dialect in Action pieces | 8 | Dialect reviewer (per accent) + literary | `#review` |
| Accent Bridge routes | 11 of 12 | Dialect reviewer (both ends) | `#review` |
| Sonnet transpositions | 15 | Literary + dialect/register | `#review` |
| Sonnet edition drafts | 616 | Literary (+ dialect for voices) | `#review` sonnet inspector |
| Guided Practice routines | 16 of 24 | Editorial | `#review` |
| Practice texts | 22 | Editorial | `#review` |

The two professional gates that block learner-facing content are the
**7 Speech chapters** and the **32 Acting drafts** (28 + 4). Everything
else is either editorial-tier (already visible while pending) or held
in the protected review area.

## Getting the copy out

Open the app, then:

- **Speech drafts:** Speech Library → the review strip ("7 Speech
  drafts awaiting professional review") → *Open draft* on any row. The
  full prepared copy is on the page.
- **Acting drafts:** Acting Library → the review strip ("32 Acting
  drafts…") → filter by *Acting lessons* or *Acting approach
  introductions* → *Open draft*.
- **Everything else:** add `#review` to the URL for the protected
  owner review area.

Source files, if you would rather copy from the repo directly:
`js/data/speech/course.js`, `js/data/acting/course.js`,
`js/data/acting/approaches.js`, `js/data/speech/routines.js`,
`js/data/speech/texts.js`, `js/data/action.js`, `js/data/bridge.js`,
`js/data/editions/`.

## Recording an approval

An approval is a human decision. When a qualified reviewer signs off,
add an entry to `js/data/speech/reviews.js` with their **name**, the
**date** and the **reviewer type** — absence from that ledger is what
makes something a draft. Nothing in the app changes status any other
way, and no AI pass (mine or ChatGPT's) may set it.
