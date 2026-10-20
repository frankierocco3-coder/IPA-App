# Speechcraft — roadmap

Decisions and open work, so nothing lives only in a chat window.
Build orders are numbered and live beside this file in `docs/`.

---

## Build orders

| # | Slice | Status | Order file |
|---|---|---|---|
| 01 | **Before You Speak** — first-launch threshold | In flight | `BUILD_01_BEFORE_YOU_SPEAK.md` |
| 02 | **Speech Dissection — Quick mode** on one integration point | Specced, not ordered | — |
| 03 | **Playable Actions** — Action Library, 12 contrast-pair entries in TEXT BOOK | Specced, not ordered | — |

Reference: `SPEECH_DISSECTION_SPEC.md` (framework, data model, Action Library),
`THRESHOLD_COPY.md` (verbatim copy), `IDIOM_CONTENT_v1.md` (shipped).

**Before ordering 02:** run one full Guided dissection by hand, on a real piece, with a
pen. If completing it once is a slog, no interface fixes that, and it's far cheaper to
learn now than after the UI exists.

---

## Unbuilt — ranked by my read of the impact

### 1. The app never asks the user to speak

Fifteen practice games — Matching, Decode the Word, Spell It, Fill the Gaps, Build a
Word, Listen & Choose, Find the Word, Name That Sound, Missing Symbol, Minimal Pairs,
Read a Sentence, Transcribe a Sentence, Accent Shift, Name the Accent, Native Idioms.
Every one is tap, type, or listen. A user can max XP, hold a 100-day streak and finish
all 77 lessons **without making a sound.** Recording exists only in My Texts, off the
main loop, optional.

The product is currently an excellent IPA literacy app. The name on the door says
Speechcraft.

Smallest honest fix: one game — record three seconds, play back against the reference
clip, self-rate. No speech recognition, no ML scoring. Self-comparison against a model is
what voice coaches actually do in the room, and it sidesteps the fact that nobody but
Frankie can verify audio.

### 2. Nothing tells a user they are getting better at speaking

Weak Sounds ranks *answers*. Once takes exist in the main loop, a self-rating after each
one turns a pile of recordings into a progress line.

### 3. Hearts may be fighting the audience

The Duolingo economy suits casual learners on a ten-year horizon. An actor cramming a
dialect for Thursday and losing hearts on a transcription question is being punished for
the wrong thing. Candidate: a rehearsal mode — same content, no hearts, no streak.

### 4. The audition workflow does not exist

Real job: sides land Monday, audition Thursday, in dialect. Current path is "paste text
into My Texts." No PDF or photo import, no deadline, no daily plan.

### 5. The audio strategy caps the dialect roadmap

12,638 MP3s (~480MB) for three dialects, against a ~1GB Pages soft limit. Actors want
Cockney, Southern US, New York, Irish, Scottish. At current bytes-per-dialect they do not
fit. This is an architecture decision blocking a content roadmap — solve it before
generating another library.

### 6. No way to know whether anyone uses it

No accounts, no analytics — deliberate and good for privacy, but "eventually acting
schools" needs at minimum a way for a teacher to see that a student practiced. Collides
head-on with the no-backend constraint. A decision, not a feature.

---

## Smaller, known

- **A lesson refuting the iambic-heartbeat myth.** Audited 2026-10-19 from five angles
  (cardiology, metrics scholarship, early modern sources, linguistics, origin-tracing);
  all five came back *undermines*, high confidence. The course is ALREADY RIGHT and needs
  no correction: 4.1 grounds the iamb in English being stress-timed, 4.2 calls the line a
  unit of thought and breath, and the module blurb says "the pulse under the line" with no
  anatomy anywhere. The open question is only whether to NAME and refute the claim, since
  actors arrive having been taught it. The material if we do:
  * The heartbeat is a TROCHEE, not an iamb. S1 is the longer, lower sound and comes
    first. Which beat is louder depends on where the stethoscope sits (S1 at the apex, S2
    at the base), so "da-DUM" is a choice of listening position, not a fact about hearts.
  * The pulse you FEEL is one beat per cycle. A palpable two-peaked pulse is pathological.
    So the persuasive version, that it matches the rhythm inside you, is backwards.
  * Harvey's *De Motu Cordis* is 1628, twelve years after Shakespeare died. S1 and S2 had
    not been distinguished by anyone, so "that is why Shakespeare used it" is anachronism.
  * Nothing in the heart groups into five. Pentameter is the half the heart cannot supply
    and the half nobody checks.
  * ORIGIN: traceable to an 1875 essay by Oliver Wendell Holmes Sr, which was about
    BREATHING rather than the heart and named iambic TETRAMETER. The claim has drifted
    from its own source in both the organ and the line length.
  * Against us, fairly: Cysarz et al. 2004 found verse recitation really does synchronise
    heart rate and respiration. The body-rhythm intuition is not empty. It is just breath
    driving heart, not heart driving metre.
  * The practical damage, and the reason it may be worth refuting: teach someone it is a
    heartbeat and they start thumping the stress, which is exactly what 4.1 tells them not
    to do.

- **`CLAUDE.md` has drifted.** It describes "Text & Delivery"; the shipped nav is LEARN ·
  PRACTICE · TEXT BOOK · QUESTS · SHOP · PROFILE · MORE. Quests, Shop and the gem economy
  aren't in its Current State section. Every session that reads it starts misled.
- **Spec §4.4 The Language is sixteen questions** — half again the next longest. Split it
  (what is said / how it is said) before it gets a UI, or it becomes the section everyone
  abandons.
- **Contemporary slang needs a currency check.** `mid`, `slaps`, `lowkey` move fast;
  stale slang taught confidently is worse than none.
- **Australian beer-size regionalism** (`pot` / `middy` / `schooner`) is simplified in the
  shipped idiom data and genuinely varies by state.
- **No voice has been ear-checked** against the taught IPA. Frankie-only; cannot be
  delegated to any agent.
- **Firefox and Safari untested**, Safari especially for MediaRecorder.

---

## Settled decisions

- Action Library goes in **TEXT BOOK** as "Playable Actions," not a new nav item.
- Twelve deep Action entries as contrast pairs, not 56 shallow ones.
- Plato and Socrates supply *method*; Mao is a *case study*, examined not adopted. Any
  manipulation curriculum draws from several traditions so the method reads as method,
  not politics.
- The four speaker types stay out of the threshold copy — taxonomy, not invitation.
- The threshold awards no XP and is not a track in LEARN.
- American spelling in user-facing copy.
- Slurs excluded from the browsable idiom list; if period-text comprehension ever needs
  them, that is a separate, historically framed reference with no drills.
