# Store listing copy

Drafted 2026-10-05 for App Store Connect and Google Play Console. Every
number here was counted from the repository or read off the running app, not
estimated. Nothing claims a capability the app does not have.

**Counts used, and where they came from:**

| | |
| --- | --- |
| 6 courses / 111 steps | IPA Foundations 30, Neutral American 18, Traditional RP 17, Standard British 14, Cockney 14, Australian 18 — read off the running app |
| 4 further courses | Acting 41, Building a Character 47, Shakespeare 37, Rhetoric 36 records |
| 62 sounds, 70 drawings | `dialect_lint`, `img/articulation/` |
| 154 sonnets · 178 monologues · 27 scenes | `sonnets.js`, the Scripts shelf, `scenes.js` |
| 160-word Shakespeare dictionary | `shakespeare-lexicon.js` |
| 9,241 recordings | `find ../IPA-Audio -name '*.mp3'` |

---

## Apple — App Store Connect

**App Name** (30 max) — 26 used

```
Speechcraft: IPA & Accents
```

**Subtitle** (30 max) — 25 used

```
Speech training for actors
```

**Promotional Text** (170 max, editable without review) — 149 used

```
Six courses, the full IPA, 154 sonnets and over 9,000 recordings. No streaks, no points, nothing scored against you. Works offline. Collects nothing.
```

**Keywords** (100 max) — 99 used. Deliberately excludes words already in the
name and subtitle, which Apple indexes separately.

```
phonetics,dialect,acting,voice,Shakespeare,monologue,audition,elocution,pronunciation,diction,drama
```

**Description**

```
Speechcraft teaches you to hear speech precisely, then reproduce it.

It is built for actors, and useful to anyone who works with their voice.

THE ALPHABET OF SOUNDS
IPA Foundations takes you through all 62 sounds of English in 30 steps —
vowels, diphthongs, consonants, then reading and writing transcription
fluently. Every sound has a hand-drawn cross-section showing where the
tongue goes, what the jaw does, and how the sound is made.

FIVE ACCENTS, TAUGHT PROPERLY
Neutral American, Traditional RP, Standard British, Cockney and Australian.
Each is a full course: orientation, the sounds, shift drills, and a mastery
final. Accents are taught as a target with their variation named honestly,
never as a single "correct" way to speak.

REAL RECORDINGS, OR SILENCE
Over 9,000 recordings. Where a recording exists you hear a real voice. Where
one does not, the app says so and stays quiet — it will never substitute a
robot voice and call it an accent.

TEXT YOU WILL ACTUALLY AUDITION WITH
All 154 Shakespeare sonnets, with a plain-meaning reading and a line-by-line
modern transposition beside the verse. 178 monologues from Chekhov, O'Neill,
Wilde, Pirandello and Ibsen. 27 two-hander scenes. A 160-word dictionary of
the Shakespeare words that send actors on stage playing the wrong thing.

FOUR MORE COURSES
Acting, Building a Character, Shakespeare, and Rhetoric. Commedia dell'arte
is taught from the masks up, with drawn stance and walk for each character.

A STUDIO FOR YOUR OWN SCRIPT
Paste a speech and get approximate IPA, scansion, and your own pronunciation
dictionary. Your text stays on your device.

WHAT IT DOES NOT DO
No streaks. No points. No hearts. Nothing is scored against you and nothing
is ever lost by getting something wrong. There is no shop, no currency, and
nothing to buy.

It also collects nothing. No account, no sign-in, no analytics, no
advertising, no third-party anything. Your progress and your work live on
your device and never leave it. It works fully offline.

HONEST ABOUT ITS LIMITS
General American pronunciation is dictionary-exact. The other accents are
rule-derived from it and marked with ≈ wherever that applies, so you always
know which you are looking at.
```

**Support URL**

```
https://github.com/frankierocco3-coder/IPA-App/issues
```

**Privacy Policy URL**

```
https://frankierocco3-coder.github.io/IPA-App/privacy.html
```

Terms, if a field is offered:
`https://frankierocco3-coder.github.io/IPA-App/terms.html`

---

## Apple — privacy nutrition label

**Answer: Data Not Collected.** Tick nothing else. This is true of every
category and the deploy gate enforces it: `security_audit.py` fails the build
if browser code names an external origin, and the one amendment made
(`js/narration.js` fetching sonnet readings) carries no identifiers and is
gate-scoped to a single file.

| Apple category | Answer |
| --- | --- |
| Contact Info | Not collected |
| Health & Fitness | Not collected |
| Financial Info | Not collected |
| Location | Not collected |
| Sensitive Info | Not collected |
| Contacts | Not collected |
| User Content | Not collected — stays on device |
| Browsing / Search History | Not collected |
| Identifiers | Not collected |
| Purchases | Not collected |
| Usage Data | Not collected |
| Diagnostics | Not collected |
| Other Data | Not collected |

**Tracking: No.** No ATT prompt is needed.

---

## Google Play

**App name** (30 max)

```
Speechcraft: IPA & Accents
```

**Short description** (80 max) — 76 used

```
The IPA and five accents, with real recordings. Nothing scored, nothing sold.
```

**Full description** — the Apple description above works unchanged.

**Data safety form:** no data collected, no data shared, no data encrypted in
transit because none is sent. Note that the Android shell declares `INTERNET`
solely so optional sonnet narration can be downloaded on request; nothing is
uploaded, ever.

---

## Age rating — a judgement call, not a default

**Do not answer "no objectionable content" without reading this.**

Words & Expressions carries terms flagged as vulgar or dated. They are hidden
behind a toggle that is off by default, they never appear in drills, and they
exist because scripts use them. The classic drama shelves are adult works:
Chekhov, O'Neill, Wilde, Ibsen, Pirandello.

Answer the questionnaire honestly — most likely **infrequent/mild profanity or
crude humour**, which lands around 12+ on Apple and Teen on Google. Claiming
4+ and being found out later is a far worse outcome than a 12+ badge.

This is the owner's call and it is the one listing answer that should not be
guessed.

---

## Still missing

**The 1024×1024 icon**, no alpha, no rounded corners. The only hard blocker
left in the submission package, and it needs the source artwork — `icon-512`
will not upscale cleanly.

Screenshots are done: `docs/STORE_SCREENSHOTS.md`, six at 1320×2868.
