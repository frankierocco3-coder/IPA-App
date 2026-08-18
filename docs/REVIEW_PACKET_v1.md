# Speechcraft review packet — v1 (Build E)

Prepared 2026-08-11. **34 items**: 8 Dialect in Action pieces + 15 sonnet
transpositions (the original 23-item queue) + 11 new Accent Bridge routes.

This packet PREPARES review. It changes no status and contains no
verdicts — every `Reviewer / Verdict / Revision notes / Approval date`
block below is blank until a human fills it. Claude authored the drafts
and this packet; **Claude cannot approve its own dialect or literary
writing**, and nothing here may be batch-approved.

To approve an item after review: set its status field in the named data
file, record the reviewer's name and date there AND in this packet, and
commit. Approved content reaches learner surfaces automatically.

Canonical text locations (texts are reproduced in full below; the data
file is authoritative if they ever drift):

- Dialect in Action — `js/data/action.js`
- Sonnet transpositions — `js/data/recasts.js`
- Accent Bridge routes — `js/data/bridge.js`

## Master source list (cited per-claim in Part C)

- **Wells** — J. C. Wells, *Accents of English* (CUP, 1982): the lexical-set
  framework (vol. 1), England incl. RP & BATH broadening (vol. 2), General
  American (vol. 3).
- **Cruttenden/Gimson** — A. Cruttenden (ed.), *Gimson's Pronunciation of
  English* (Routledge): the Traditional RP inventory this course follows,
  incl. centring diphthongs, yod retention, CURE variability.
- **Roach** — P. Roach, "British English: Received Pronunciation", *JIPA*
  (CUP): RP illustration.
- **Lindsey** — G. Lindsey, *English After RP: Standard British Pronunciation
  Today* (Palgrave Macmillan, 2019): SQUARE /ɛː/, happY tensing, GOOSE
  fronting, yod coalescence, glottalling as contemporary SSB features.
- **Hillenbrand** — J. Hillenbrand, "American English: Southern Michigan",
  *JIPA* (CUP): regionally-unmarked American illustration (rhoticity,
  /ɝ ɚ/, flat BATH, tapping).
- **Cox & Fletcher** — F. Cox & J. Fletcher, *Australian English Pronunciation
  and Transcription* (CUP): the revised (HCE-style) Australian vowel system
  (/ɐ ɐː ʉː æɪ ɑe æɔ əʉ eː ɔ oː/), BATH regional variation, Broad–General–
  Cultivated.
- **Macquarie** — Macquarie University Dept. of Linguistics, phonemic
  transcription of Australian English; *Australian Voices* (variation).

These are the same works cited under More → Sources & Credits; Part C attaches
them claim-by-claim as required — a generic About-page link is NOT
sufficient for approval.

---

# Part A — Dialect in Action (8 pieces)

**Required reviewers per piece: TWO** — (1) *literary*: rhythm, register,
believability, no parody; (2) *dialect*: a native or expert speaker of the
course accent confirming the expressions land naturally for the stated
speaker, age and region.

**Shared checklist (apply to every piece):**
- [ ] Reads as speech a real person of this age/region would produce
- [ ] Every marked expression is used correctly and feels incidental, not showcased
- [ ] No stereotype, no "slang salad", no costume register
- [ ] Register labels (formality, age, region, period) match the text
- [ ] Situation/objective line matches what the text actually does
- [ ] Expression IDs resolve to the right Words & Expressions entries

---

## A1. `nam-exchange-plans` — "Changing Plans" (dialogue)

- **Target dialect:** Neutral American · **Register:** casual, friends late-20s · **Region claim:** broadly urban U.S., unmarked · **Period:** contemporary
- **Learner benefit:** hears 7 high-frequency casual Americanisms (bail on, flake, my bad, ride, sketchy, bummed, hit me up) doing real conversational work — apology/negotiation between friends.
- **Situation/objective:** Dana cancels last-minute and wants the friendship kept easy; Marcus wants her to feel the cost first.
- **Complete text:**
  > Dana: Hey — so, don't hate me, but I have to **bail on** tonight.
  > Marcus: Again? You are such a **flake**.
  > Dana: I know, I know. **My bad**. Work blew up and my **ride** fell through.
  > Marcus: You could take the train like a normal person.
  > Dana: At eleven at night? That station is **sketchy** and you know it.
  > Marcus: Fair. Honestly I'm pretty **bummed** — I was looking forward to it.
  > Dana: Next weekend, I promise. **Hit me up** Saturday morning and we'll figure it out.
  > Marcus: Fine. But you're buying breakfast.
- **Source support:** expressions are entries NAM-038/040/042/044/039/046/043 in the shipped Words & Expressions data (already ear-reviewed as vocabulary); this piece tests their *use in context*, which is new.
- **Likely accuracy concerns:** "my bad" + "hit me up" density in eight lines — plausible for late-20s speakers, but the dialect reviewer should confirm it doesn't read as a decade too young.
- **Stereotype / forced-slang risk:** low; the deliberately unmarked region is the safety and the limitation — reviewer should confirm nothing accidentally region-marks it.
- **Register/age assumptions:** friends who talk weekly; mild teasing without real anger; "like a normal person" as affectionate jab.
- **Literary concerns:** none beyond pacing of the last two lines (resolution may be one beat quick).
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A2. `nam-mono-roadtrip` — "The Road Trip That Wasn't" (monologue, ~60s)

- **Target dialect:** Neutral American · **Register:** casual narrative, early-30s, break room · **Region:** broadly urban U.S.
- **Learner benefit:** sustained casual storytelling arc (setup → disaster → reversal) carrying 6 expressions (ride, bogus, sketchy, stoked, bail, crashed) across ~140 words.
- **Situation/objective:** wants coworkers to relive the disaster as fondly as the teller does.
- **Complete text:**
  > So we had this whole camping trip planned, right? Months of planning. And the morning we leave, Jesse texts me that his car won't start. No warning. So now I'm everyone's **ride**, which — fine, whatever.
  > Except the GPS takes us down this completely **bogus** back road, forty minutes of gravel, and we end up at a motel that was, no exaggeration, the single most **sketchy** building I have ever paid money to sleep in. The sign was hand-painted. Part of the sign was crossed out.
  > And here's the thing — I'd been so **stoked** about this trip. I told everyone at work. So I refused to **bail**. We stayed. We roasted marshmallows over a camp stove in the parking lot, we told stories, and around midnight we just **crashed**, all four of us, in one room.
  > Best terrible trip of my life. Ask me literally anything about it.
- **Source support:** NAM-044/045/039/047/038/050 in shipped W&E data.
- **Likely accuracy concerns:** "bogus" reads slightly older/'90s to some ears — confirm it still sits naturally in an early-30s mouth (it plausibly does, as light irony).
- **Stereotype risk:** low.
- **Register/age assumptions:** animated but not performing; "right?" and "here's the thing" as authentic discourse markers.
- **Literary concerns:** the crossed-out-sign beat is the piece's best moment — reviewer should protect it in any revision.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A3. `rp-exchange-garden` — "The Garden Party Question" (dialogue)

- **Target dialect:** Traditional RP · **Register:** polished conversational, period (mid-20th c.) · **Speakers:** aunt (60s), adult nephew
- **Learner benefit:** period politeness system in action — obligation negotiated through warmth (frightfully, awfully, it simply isn't done, quite so, cheerio).
- **Situation/objective:** Aunt Margaret wants Edward committed on her terms; Edward wants to yield gracefully without appearing managed.
- **Complete text:**
  > Aunt Margaret: Edward, you will be joining us on Saturday? Your uncle has been **frightfully** keen to see you.
  > Edward: I shall try, Aunt. Though I confess the trains have been **awfully** unreliable of late.
  > Aunt Margaret: Then you must simply come up on Friday evening and stay the night.
  > Edward: I shouldn't wish to put you to any trouble.
  > Aunt Margaret: Trouble? Nonsense. Arriving halfway through the afternoon, however — **it simply isn't done**.
  > Edward: **Quite so**. Friday evening, then. I shall bring the good marmalade as a peace offering.
  > Aunt Margaret: That would be most acceptable. **Cheerio**, dear — do give my love to your mother.
- **Source support:** RP-038/039/041/040/025 in shipped W&E data; period register per the Traditional RP course's About framing (historical prestige accent).
- **Likely accuracy concerns:** "Cheerio" as a parting from an older woman to a nephew — attested, but the dialect reviewer should confirm it doesn't tip the scene toward pastiche; "the good marmalade" is the humanizing detail that guards against butler parody — keep it.
- **Stereotype risk:** MODERATE by nature — period upper-middle RP is half a costume already; the reviewer's main call is whether warmth wins over caricature.
- **Register/age assumptions:** family intimacy inside formal grammar ("you will be joining us?" as soft command).
- **Literary concerns:** none; the marmalade turn lands the relationship.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A4. `rp-mono-schooldays` — "The Tuck Shop Ledger" (monologue, ~60s)

- **Target dialect:** Traditional RP · **Register:** measured, anecdotal, retired schoolmaster (70s) · **Period:** reminiscence of mid-century school life
- **Learner benefit:** sustained period cadence; tuck shop / prep as cultural vocabulary; self-mockery in a formal register.
- **Situation/objective:** wants listeners to feel a child's seriousness about small institutions — and to laugh at him only as much as he laughs at himself.
- **Complete text:**
  > When I was a boy at school, the great institution — the true centre of civic life — was not the chapel, nor the cricket pitch. It was the **tuck shop**.
  > One did one's **prep** with half a mind, always, on whether the barley sugar would run out before Wednesday. And there was a ledger — a genuine ledger — in which every boy's credit was recorded in the proprietor's tremendous copperplate hand. To appear in that ledger in red ink was social ruin.
  > Boys would **whinge**, naturally, that the prices were scandalous, and we were all quite **knackered** by term's end from rationing our shillings. But I learnt more about credit, patience and reputation from that little shop than from any master in the place.
  > I still cannot pass a sweet shop without checking, instinctively, whether my name is in the book.
- **Source support:** RP-036/035/051/044 in shipped W&E data.
- **Likely accuracy concerns (FLAGGED IN DATA):** "knackered" — plausibly too casual/physical for this speaker's register even in self-mockery; "whinge" is fine colloquially but check it against the period voice. These two are the piece's main review questions.
- **Stereotype risk:** moderate (see A3); the ledger specificity is the defense.
- **Register/age assumptions:** "One did one's prep" impersonal-one is deliberate and must survive review.
- **Literary concerns:** final line is the piece; protect it.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A5. `ssbe-exchange-pub` — "After the Shift" (dialogue)

- **Target dialect:** Standard British (contemporary) · **Register:** relaxed colleagues, late 20s, pub · **Region:** contemporary southern Britain
- **Learner benefit:** the modern British workplace-friends register: knackered, sorted, proper, chuffed, gutted, cheers, mate — celebration and commiseration in one exchange.
- **Situation/objective:** Priya wants to put a stressful week down; Tom wants to mark her win.
- **Complete text:**
  > Priya: Right, that's me done. I am absolutely **knackered**.
  > Tom: Same. Long week. Did the Henderson thing get **sorted** in the end?
  > Priya: It did, actually — signed off this afternoon. I'm **proper** relieved.
  > Tom: You should be **chuffed**, that one's been hanging over you for weeks.
  > Priya: Honestly? I was **gutted** when they nearly pulled it on Tuesday. Didn't sleep.
  > Tom: Well, it's done now. First round's on me.
  > Priya: **Cheers**, **mate**. Next one's mine.
- **Source support:** SSBE-006/005/004/009/008/003/002 in shipped W&E data.
- **Likely accuracy concerns:** "proper relieved" as intensifier — genuinely current but register-marked (informal, southern); confirm it fits this speaker rather than reading as put-on matey-ness (the data's own flag).
- **Stereotype risk:** low-moderate — seven marked expressions in seven lines is the maximum safe density; reviewer should confirm none feels inserted.
- **Register/age assumptions:** class-neutral; colleagues, not old friends — the warmth is earned during the scene.
- **Literary concerns:** none.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A6. `ssbe-mono-flat` — "Moving Day" (monologue, ~60s)

- **Target dialect:** Standard British · **Register:** conversational, wry, mid-20s renter
- **Learner benefit:** contemporary narrative register with expressions as seasoning (dodgy, skint, shattered, buzzing) — exactly the "incidental, not showcased" model.
- **Situation/objective:** wants the friend to understand the move was worth every disaster — while talking themselves into it too.
- **Complete text:**
  > So I finally moved out on Saturday. Own flat. Tiny — genuinely, the oven door touches the opposite wall when it's open — but mine.
  > The move itself was a nightmare. The van company I booked turned out to be properly **dodgy** — the driver turned up two hours late with a van half the size I'd paid for. And I was already **skint** from the deposit, so hiring a second one wasn't happening.
  > In the end my sister drove up and we did four trips in her tiny hatchback with the back seats down. Took all day. We were both completely **shattered** by the end of it.
  > But Sunday morning I made a cup of tea in my own kitchen, in the quiet, no one else's washing up in the sink — and honestly? **Buzzing**. Best cup of tea of my life.
- **Source support:** SSBE-018/014/007/010 in shipped W&E data.
- **Likely accuracy concerns:** single-word "Buzzing." as a sentence — current for mid-20s; confirm longevity (slang that dates fastest is affect slang).
- **Stereotype risk:** low.
- **Register/age assumptions:** first-flat renter economics (deposit → skint) is the realism anchor.
- **Literary concerns:** oven-door detail and final line carry the piece.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A7. `aus-exchange-fence` — "Over the Fence" (dialogue)

- **Target dialect:** General Australian · **Register:** easy suburban neighbourliness; speakers 40s and 60s
- **Learner benefit:** the Australian invitation dance — understatement both ways (nothing flash / plenty going spare / bring a chair) with arvo, barbie, dead set, fair dinkum, mate, esky, coldie in natural positions.
- **Situation/objective:** Ray wants to upgrade an acquaintance into an invitation; Col wants to accept without making it a big deal.
- **Complete text:**
  > Col: Morning! Big plans for the **arvo**?
  > Ray: Having a few people round for a **barbie**, actually. Nothing flash.
  > Col: Very nice. Weather's meant to hold, too.
  > Ray: That's what they reckon. You and Helen should come over — plenty going spare.
  > Col: Yeah? **Dead set**?
  > Ray: **Fair dinkum**, **mate** — bring a chair and whatever you want in the **esky**.
  > Col: Righto, you're on. I'll bring a **coldie** or two for the cause.
  > Ray: Good man. Come round about four.
- **Source support:** AUS-001/002/015/016/004/020/011 in shipped W&E data.
- **Likely accuracy concerns:** "Fair dinkum" as a *confirmation reply* — genuine, but stacked directly on "Dead set?" it risks tourist-brochure density (the data's own flag). "Coldie" age-band check: plausibly a 60s speaker's word; confirm.
- **Stereotype risk:** MODERATE — this is the piece closest to the "Strine brochure" line; the weather small-talk and "Righto, you're on" are the naturalizing ballast.
- **Register/age assumptions:** neighbours friendly-but-not-close; first-name + surname-household ("You and Helen").
- **Literary concerns:** none.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## A8. `aus-mono-camping` — "The One About the Tent" (monologue, ~65s)

- **Target dialect:** General Australian · **Register:** relaxed family-legend storytelling, 50s
- **Learner benefit:** long-form Australian narrative rhythm; drongo/crook/esky/arvo/dead set carried by self-deprecation.
- **Situation/objective:** wants the family legend told properly — owning the failure so completely the story becomes theirs.
- **Complete text:**
  > Every family's got one story that gets dragged out at Christmas, and ours is the tent. Nineteen ninety-eight. We drive six hours to the coast, get there late in the **arvo**, and I announce — very confidently — that I don't need the instructions.
  > An hour later the thing looks less like a tent and more like modern art, my brother-in-law's calling me a **drongo** from his fold-out chair — not helping, mind you, just commentating — and the kids have given up and started eating everything in the **esky**.
  > Then it starts raining. **Dead set**, the moment the last peg goes in. And I'd been feeling a bit **crook** all day, so I just stood there in the rain and started laughing. Couldn't stop.
  > Twenty-five years on, nobody remembers the beach. Just the tent. And to be fair — that's a better story anyway.
- **Source support:** AUS-001/018/020/015/012 in shipped W&E data.
- **Likely accuracy concerns (FLAGGED IN DATA):** "drongo" must land as affectionate family teasing, not abuse — the fold-out-chair detail does that work; reviewer to confirm. "Dead set" as sentence-opener intensifier: current.
- **Stereotype risk:** low-moderate; period anchor (1998) helps.
- **Register/age assumptions:** speaker in their 50s telling a 25-year-old story — arithmetic holds.
- **Literary concerns:** "not helping, mind you, just commentating" is the voice; protect it.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

---

# Part B — Sonnet transpositions (15 items)

**Required reviewers per item: TWO** — (1) *literary*: faithfulness to the
sonnet's argument, imagery and emotional progression, per
`docs/RECAST_REVIEW.md`; (2) *dialect/register*: the contemporary voice
rings true for its accent community without caricature. The Plain
Meaning prose for these five sonnets is already live and is NOT under
review here (listed for context only).

**Shared checklist (apply to every transposition):**
- [ ] Argument survives line-group by line-group (no stanza's claim lost or inverted)
- [ ] Major images survive (named in each item below)
- [ ] The volta lands in the same place and direction
- [ ] Speaker→listener relationship unchanged
- [ ] Register contemporary and natural; no forced slang, no caricature
- [ ] No accidental echo of any commercial modern-English guide
- [ ] Distinct from the Plain Meaning prose (adaptation, not explanation)

**Learner benefit (all 15):** the actor sees the sonnet's ACTION — what the
speaker does to the listener — separated from its Elizabethan surface,
then carries that action back into the original text in their own accent
work. **Target dialects:** as labelled. **Source support:** original text
from the repo's public-domain sonnets (`js/data/sonnets.js`); no external
modern-English guide consulted.

### Sonnet 18 — images that must survive: summer's day, rough winds on May buds, summer's short lease, sun too hot/dimmed, eternal summer, death's brag, lines that give life

## B1. `18.nam` — Neutral American
> Should I say you're like a summer day? / Honestly, you're better — steadier, more easygoing. / Rough winds beat up the May flowers, / and summer's gone before you know it. / Some days the sun burns way too hot; / other days it barely shows at all. / Everything beautiful slips eventually — / bad luck or just time doing what time does. / But your summer? Not going anywhere. / The glow you've got stays yours. / And death doesn't get to brag he ever caught you, / because you're written into something permanent now. / As long as people breathe and read, / this keeps you alive.
- **Accuracy concerns:** "steadier, more easygoing" for "more lovely and more temperate" — temperate→easygoing is a stretch worth a literary look. 13 lines vs 14 — line-structure deviation is declared policy but note it.
- **Register assumptions:** neutral contemporary American, no age marking.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B2. `18.ssbe` — Standard British
> Shall I say you're like a summer's day? / Bit unfair on you, honestly — you're lovelier, more settled. / The wind batters those May buds about, / and summer's booked such a short slot anyway. / Some days the sun's an absolute furnace; / half the time it can't be bothered to come out. / Everything gorgeous fades in the end — / rotten luck, or just nature getting on with it. / But your summer isn't going anywhere. / What you've got doesn't wear off. / And death can't go round claiming he's had you, / not when you're kept safe in these lines. / Long as anyone's breathing, anyone's reading, / this lives — and it keeps you living.
- **Accuracy concerns:** "booked such a short slot" — good contemporary rendering of "summer's lease"; confirm it isn't too office-flavoured for the love register. "can't be bothered to come out" personifies the sun further than the original dims it — acceptable? literary call.
- **Register assumptions:** class-neutral contemporary British; understatement as the voice's engine.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B3. `18.aus` — Australian
> Reckon I should call you a summer's day? / Nah — you're lovelier than that, and less full-on. / The wind knocks the May buds around, / and summer's over before you've settled in. / Some days that sun is just brutal; / others it barely fronts up at all. / Every beautiful thing fades eventually — / rough luck, or nature doing its rounds. / But your summer's not going anywhere, mate. / What you've got, you keep. / And death doesn't get to skite he ever got you, / because these lines have already got you safe. / Long as anyone's still breathing and reading, / this keeps you here.
- **Accuracy concerns:** "skite" for "brag" — exact meaning, but check currency band (leans older/rural to some ears; may be perfect for the register or may date it). "mate" in a love poem — the one word most likely to read as costume here; dialect reviewer's call.
- **Register assumptions:** relaxed General Australian; affection through understatement.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

### Sonnet 29 — images that must survive: outcast state, deaf heaven, envy list, self-disdain, the lark at break of day rising from sullen earth to heaven's gate, wealth beyond kings

## B4. `29.nam` — Neutral American
> When my luck's gone and nobody's calling, / I sit alone and feel like a complete outcast, / yelling at a sky that isn't listening, / looking at myself and hating what I see — / wishing I had that guy's prospects, that guy's face, / this one's friends, that one's talent, another one's freedom — / least happy with the things I usually love. / But right in the middle of despising myself, / you cross my mind — and everything lifts, / like a lark at sunrise taking off from the cold ground / to sing right up at heaven's door. / Remembering the love you give me is worth so much, / I wouldn't trade my life for a king's.
- **Accuracy concerns:** "nobody's calling" as "in disgrace with fortune and men's eyes" compresses disgrace to unpopularity — arguably softens the shame; literary call. "cold ground" for "sullen earth" loses the mood-word.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B5. `29.ssbe` — Standard British
> When it's all gone wrong and nobody wants to know, / I sit about on my own feeling like a proper outcast, / having a go at a sky that couldn't care less, / looking at myself and absolutely hating it — / wanting his luck, wanting her looks, / this one's mates, that one's talent, everyone's options — / bored, even, of the things I usually love. / And then, mid-wallow, right at my worst, / I happen to think of you — and everything lifts, / like a lark going up at dawn off the dark ground, / singing its heart out at heaven's gate. / What your love's worth, once I remember it, / I wouldn't swap places with a king.
- **Accuracy concerns:** "mid-wallow" — modern-therapeutic flavour; strong but anachronistic-adjacent; literary call. "bored, even, of" for "with what I most enjoy contented least" is a good solve.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B6. `29.aus` — Australian
> When my luck's shot and no one's picking up, / I sit out here on my own like a proper outsider, / bunging it on at a sky that isn't listening, / copping a look at myself and hating it — / jealous of his chances, her looks, / this bloke's mates, that one's talent, everyone's run of it — / even the stuff I love feels flat. / Then right in the middle of the sulk, / you come to mind — and up it all goes, / like a lark off the dark paddock at first light, / belting it out at heaven's gate. / Remembering what your love's worth, / I wouldn't swap spots with a king. Not a chance.
- **Accuracy concerns:** "bunging it on" (= making a scene) for "trouble deaf heaven with my bootless cries" — meaning fits, but currency/region check needed. "paddock" for "earth" is the transposition's best Australian image — confirm it earns its place. Extra half-line "Not a chance." breaks the couplet shape deliberately; keep or cut is a literary call.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

### Sonnet 73 — images that must survive: yellow leaves/bare boughs, bare ruined choirs, twilight after sunset, black night as death's second self, glowing fire on youth's ashes, consumed by what nourished it, loving what you must leave

## B7. `73.nam` — Neutral American
> You see it in me — that late-fall look, / a few yellow leaves hanging on, or none, / branches shaking against the cold, / bare ruined bleachers where the birds used to sing. / You see the end of a day in me too: / sun's down, the light in the west going fast, / night coming on to close it all out — / death's understudy, putting everything to rest. / And you see a fire burning low, / lying on the ashes of everything it was, / going out on the very thing that fed it. / You see all that — and it makes your love stronger. / You love hardest what you can't keep long.
- **Accuracy concerns:** "bleachers" for "bare ruined choirs" — the boldest image swap in the set: it keeps "tiered structure where song happened" but loses the sacred/monastic resonance entirely. This is THE review question for all three 73s. "understudy" for "Death's second self" is theatrical and strong.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B8. `73.ssbe` — Standard British
> You can see it in me — proper end of autumn, / a few yellow leaves still hanging about, or none, / branches shivering in the cold, / bare ruined stands where the birds used to sing. / You see the tail end of a day as well: / sun gone, the last light fading in the west, / night coming in to shut it all down — / death's stand-in, tucking everything away. / And you see a fire that's nearly done, / glowing on the ashes of what it used to be, / put out by the very thing that kept it going. / Seeing that, your love gets stronger, doesn't it — / you love properly what you're about to lose.
- **Accuracy concerns:** "stands" (same choirs problem as B7). Tag question "doesn't it" turns the couplet's statement into a shared observation — a genuine register move that slightly softens the imperative force; literary call.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B9. `73.aus` — Australian
> You can see it on me — late autumn, basically: / a few yellow leaves hanging on, or none at all, / branches rattling in the cold, / bare ruined grandstands where the birds used to sing. / You can see the end of a day in me too: / sun's gone, the west fading out fast, / night rolling in to shut the whole thing down — / death's offsider, tucking everything in. / And you can see a campfire burning low, / sitting on the ash of everything it was, / dying on the same stuff that got it going. / You see all that — and you love me harder for it. / You love best what you're about to lose.
- **Accuracy concerns:** "offsider" for "Death's second self" — excellent Australian solve if current; confirm. "grandstands" (choirs problem again). "campfire" localizes the fire image — gain or loss? literary call.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

### Sonnet 116 — images that must survive: marriage of true minds, impediments refused, the ever-fixed mark and tempests, the star to wandering barks, love not Time's fool, bending sickle, edge of doom, the staked couplet

## B10. `116.nam` — Neutral American
> Don't tell me two people who really get each other / can't make it work. It isn't love / if it changes the second things change, / or walks when the other person stumbles. / No — love's the lighthouse in the storm, / taking the hits and never moving, / the north star for every lost boat out there — / you can measure its height, never its worth. / Love isn't time's fool, even though / young faces fall inside time's reach. / It doesn't fade by the hour or the week — / it holds right out to the edge of everything. / If I'm wrong about this, and you can prove it, / I never wrote a word, and nobody ever loved.
- **Accuracy concerns:** the sickle image ("within his bending sickle's compass come") is compressed into "inside time's reach" — the scythe is gone; all three 116s make this cut. Is losing Time-as-reaper acceptable? The single biggest shared literary question in Part B.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B11. `116.ssbe` — Standard British
> Don't give me reasons two people who properly know each other / can't stay the course. It isn't love / if it shifts the moment things shift, / or clears off when the other one wobbles. / No — love's the lighthouse in the weather, / battered and not budging an inch, / the fixed star for every boat that's lost itself — / you can measure where it sits, never what it's worth. / Love isn't time's fool, even though / every lovely face sits inside time's reach. / It doesn't wear out by the hour or the week — / it sees things through to the absolute end. / If that's wrong, and anyone can prove it, / I never wrote a thing, and no one ever loved.
- **Accuracy concerns:** as B10 (sickle). "wobbles" for "bends with the remover to remove" — the original line is about the OTHER person withdrawing; "wobbles" reads as faltering rather than leaving; check against B10's "stumbles" (same softening).
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B12. `116.aus` — Australian
> Don't come at me with reasons two people who get each other / can't go the distance. It isn't love / if it changes when the weather changes, / or shoots through when the other one struggles. / No — love's the lighthouse in the storm, / copping it all and not shifting a millimetre, / the star every lost boat steers home by — / you can mark where it sits, never what it's worth. / Love's not time's fool, even though / every young face is inside time's swing. / It doesn't wear out by the hour or the week — / it goes the full stretch, right to the end. / If I've got that wrong, and you can prove it, / I never wrote a word — and no one's ever loved.
- **Accuracy concerns:** "inside time's swing" quietly RESTORES the sickle's motion — the strongest of the three on that image; note as the model if B10/B11 revise. "shoots through" (leaves abruptly) — currency check.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

### Sonnet 130 — images that must survive: the full refusal list (sun, coral, snow, wires, roses, perfume, music, goddess) and the "false compare" turn

## B13. `130.nam` — Neutral American
> My girlfriend's eyes are nothing like the sun. / Coral's way redder than her lips. / Snow's white — her skin's just skin. / Her hair? It's hair. Regular hair. / I've seen roses, pink and deep red — / her cheeks aren't roses, sorry. / And some perfumes honestly smell better / than her breath does some mornings. / I love hearing her talk — but let's be real, / music sounds better. / Never seen a goddess walk, myself; / she walks on the ground like the rest of us. / And still — I swear she's as rare / as any woman anyone ever lied a poem about.
- **Accuracy concerns:** "black wires grow on her head" is neutralized to "Regular hair," dropping the period detail deliberately (the original line needs historical framing to avoid misreading — dropping it is defensible, note the decision). "girlfriend" fixes the relationship more specifically than "mistress"; fine for the register, note it. "some mornings" adds a comic beat the original doesn't have — charm vs. drift, literary call.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B14. `130.ssbe` — Standard British
> My girlfriend's eyes are nothing like the sun. / Coral's miles redder than her mouth. / If snow's white, well — her skin's more of a normal colour. / Her hair's just hair, isn't it. / I've seen proper roses, pink and red — / nothing like that going on in her cheeks. / And some perfumes, honestly, are nicer / than her breath first thing. / I love listening to her — still, / music's got the edge, hasn't it. / Can't say I've ever seen a goddess about; / she walks on the pavement like everyone else. / And yet — I swear she's as rare / as any woman ever flattered with rubbish comparisons.
- **Accuracy concerns:** as B13 (wires). Double tag questions ("isn't it" / "hasn't it") — twice may be once too many; register call. "rubbish comparisons" for "false compare" — exact and natural.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

## B15. `130.aus` — Australian
> My girlfriend's eyes are nothing like the sun. / Coral's heaps redder than her lips. / Snow's white; her skin's just... skin. / Her hair's ordinary hair, no drama. / I've seen proper roses, pink and red — / her cheeks aren't in that race. / And fair warning, some perfumes smell better / than her breath of a morning. / I love hearing her talk — but straight up, / music's nicer on the ear. / Never seen a goddess cruise past, myself; / she walks on the footpath like the rest of us. / And still — I swear she's as rare / as any woman ever dressed up in dodgy comparisons.
- **Accuracy concerns:** as B13 (wires). "of a morning" — genuinely Australian/British temporal idiom, quietly excellent. "cruise past" for the goddess — confirm it stays wry rather than flip.
- Reviewer (literary): ________  Verdict: ________  Revision notes: ________  Date: ________
- Reviewer (dialect): ________  Verdict: ________  Revision notes: ________  Date: ________

---

# Part C — Accent Bridge routes (11 new drafts)

**Required reviewer per route: ONE dialect/accent reviewer qualified in
BOTH ends of the route** (phonetician, accredited dialect coach, or
equivalent). The reviewer confirms: (1) each claim correctly restates the
two course targets; (2) each example word actually contains the contrast;
(3) the Lips/Tongue/Jaw/Voicing guidance is anatomically right;
(4) variation is flagged where real speakers vary; (5) nothing invents a
distinction to make the route feel complete.

**Shared checklist (apply per comparison):**
- [ ] startIPA and targetIPA are the two courses' broad forms
- [ ] The example word contains the feature in both accents
- [ ] "Typically" phrasing wherever variation exists
- [ ] Realizations ([ʔ], [ɾ]) never presented as new phonemes
- [ ] Articulation guidance safe and accurate
- [ ] The claim-specific source below actually supports the claim

**Claims under review** are the full comparison entries in
`js/data/bridge.js` (feature, IPA pair, stays/changes, guidance). Per-claim
source citations follow; the About-page links remain as learner-facing
context but the citations HERE are the approval basis.

## C1. `nam-ssbe` — Neutral American → Standard British (7 comparisons)
- rhoticity loss (car /kɑr/→/kɑː/): **Wells** vol. 1 §3.2 (rhoticity), **Lindsey** (SSB non-rhoticity); linking r **Lindsey**.
- NURSE /ɝ/→/ɜː/: **Hillenbrand** (American /ɝ/), **Lindsey**/**Cruttenden** (British plain /ɜː/).
- BATH /æ/→/ɑː/ with word-set incidence: **Wells** vol. 1 §2.2 & vol. 2 (BATH broadening; set membership word-by-word).
- LOT /ɑ/→/ɒ/: **Hillenbrand** (unrounded /ɑ/), **Cruttenden**/**Lindsey** (rounded /ɒ/).
- GOAT /oʊ/→/əʊ/: **Wells** vol. 3 (Am. GOAT), **Lindsey** (SSB central onset).
- SQUARE /ɛr/→/ɛː/ monophthong: **Lindsey** (the signature SSB monophthonging; the course's core claim).
- yod coalescence tune /tuːn/→/tʃuːn/: **Wells** vol. 3 (Am. yod-dropping), **Lindsey** (SSB coalescence).
- **Likely concerns:** none structural; reviewer should sanity-check "grass" vs "gas/mass" incidence examples.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C2. `nam-aus` — Neutral American → Australian (7 comparisons)
- non-rhoticity + central START /kɑr/→/kɐː/: **Wells** vol. 1 §3.2; **Cox & Fletcher**/**Macquarie** (/ɐː/ central quality).
- FACE /eɪ/→/æɪ/, MOUTH /aʊ/→/æɔ/, GOAT /oʊ/→/əʉ/, GOOSE /uː/→/ʉː/: **Cox & Fletcher** (revised Australian diphthong and GOOSE symbols); **Macquarie** transcription system.
- NURSE /ɝ/→/ɜː/: **Hillenbrand**; **Cox & Fletcher** (Australian /ɜː/).
- BATH quality /ɐː/ + regional dance/castle incidence: **Cox & Fletcher** and **Macquarie Australian Voices** (regional TRAP–BATH variation — the route's explicit "both fully Australian" claim).
- **Likely concerns:** the Broad-vs-General width warnings ("General keeps it moderate") — reviewer to confirm they help rather than confuse.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C3. `rp-nam` — Traditional RP → Neutral American (7 comparisons)
- rhoticity restored; NURSE /ɜː/→/ɝ/; lettER /ə/→/ɚ/: **Hillenbrand**; **Wells** vol. 3 (r-coloured vowels).
- BATH /ɑː/→/æ/ (+ pre-nasal [ɛə] raising note): **Wells** vol. 3; **Hillenbrand** (/æ/ raising).
- LOT /ɒ/→/ɑ/ with father–bother merger: **Wells** vol. 3 §6.1 (the merger claim).
- GOAT /əʊ/→/oʊ/: **Wells** vol. 3.
- yod-dropping + tapping [ɾ] (duty): **Wells** vol. 3 (both; tap as realization).
- **Likely concerns:** the tap explained inside a yod-dropping entry — two features in one card; reviewer may split.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C4. `rp-ssbe` — Traditional RP → Standard British (5 comparisons)
- SQUARE /eə/→/ɛː/: **Lindsey** (monophthonging), **Cruttenden** (RP /eə/ baseline).
- happY /ɪ/→/i/ tensing: **Lindsey**; **Cruttenden** (conservative /ɪ/).
- yod coalescence /tj/→/tʃ/: **Lindsey**; **Cruttenden** (RP retention).
- T-glottalling [ʔ] as register-sensitive realization: **Lindsey** (environments; realization-not-phoneme framing).
- CURE /ʊə/→/ɔː/ "common, not compulsory": **Cruttenden** (RP-era drift already noted), **Lindsey** (contemporary merger); the entry's explicit variability phrasing is the claim.
- **Likely concerns:** the deliberately small route — reviewer confirms nothing essential is missing rather than that nothing is wrong.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C5. `rp-aus` — Traditional RP → Australian (7 comparisons)
- FACE→/æɪ/, PRICE→/ɑe/, MOUTH→/æɔ/, GOAT→/əʉ/, GOOSE→/ʉː/: **Cox & Fletcher**/**Macquarie** (revised system); **Cruttenden** for the RP starting forms.
- SQUARE /eə/→/eː/ (vs SSB /ɛː/ — the height difference is deliberate): **Cox & Fletcher** (/eː/), **Lindsey** (/ɛː/ for contrast).
- BATH central /ɐː/ + regional incidence: **Cox & Fletcher**; **Macquarie Australian Voices**.
- **Likely concerns:** L-vocalisation mentioned inside the GOOSE card ("school ≈ [skʉːo]") — flagged as relaxed-speech realization; confirm the bracket notation reads clearly.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C6. `ssbe-nam` — Standard British → Neutral American (7 comparisons)
- rhoticity restored (car, SQUARE /ɛː/→/ɛr/): **Hillenbrand**; **Wells** vol. 3.
- BATH→/æ/, LOT→/ɑ/ (father–bother), NURSE→/ɝ/, GOAT→/oʊ/: as C3 citations.
- glottal→tap swap on 'better' (/ˈbeʔə/→[ˈbeɾɚ]): **Lindsey** (SSB glottalling), **Wells** vol. 3 & **Hillenbrand** (Am. tapping) — both explicitly realizations of /t/.
- **Likely concerns:** presenting [ʔ]→[ɾ] as "relaxing the other way" — pedagogically neat; reviewer confirms it's not too neat.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C7. `ssbe-rp` — Standard British → Traditional RP (5 comparisons)
- SQUARE /ɛː/→/eə/ glide restored: **Cruttenden**; **Lindsey**.
- careful [t] everywhere (no glottalling): **Cruttenden** (RP carefully articulated /t/).
- yod separation /tʃuːn/→/tjuːn/: **Cruttenden**.
- happY laxing /i/→/ɪ/: **Cruttenden** (conservative RP happY).
- CURE /ɔː/→/ʊə/ "safer period choice, not absolute": **Cruttenden** (including late-RP /ɔː/ drift — the entry says so).
- **Likely concerns:** none beyond the period-direction framing ("one generation back").
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C8. `ssbe-aus` — Standard British → Australian (7 comparisons)
- FACE→/æɪ/, MOUTH→/æɔ/, GOAT endpoint→/ʉ/: **Cox & Fletcher**/**Macquarie**.
- LOT /ɒ/→/ɔ/ and THOUGHT /ɔː/→/oː/ raising ("the ladder one rung up"): **Cox & Fletcher** (raised Australian back vowels).
- STRUT /ʌ/→/ɐ/: **Cox & Fletcher** (central /ɐ/).
- BATH quality + incidence: as C2.
- **Likely concerns:** "the ladder" metaphor spans two entries — confirm each stands alone.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C9. `aus-nam` — Australian → Neutral American (7 comparisons)
- rhoticity restored + START /ɐː/→/ɑr/ backing: **Hillenbrand**; **Cox & Fletcher** (central start point).
- FACE /æɪ/→/eɪ/, PRICE /ɑe/→/aɪ/, MOUTH /æɔ/→/aʊ/, GOAT /əʉ/→/oʊ/: **Cox & Fletcher** (Australian forms), **Wells** vol. 3 (American forms).
- STRUT /ɐ/→/ʌ/: **Cox & Fletcher**; **Wells** vol. 3.
- BATH flattens including dance/castle ("the regional split doesn't exist in American"): **Wells** vol. 3 (uniform flat BATH).
- **Likely concerns:** claiming /ʌ/ is "a step back and slightly up" from /ɐ/ — small distinction; reviewer confirms the guidance helps.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C10. `aus-rp` — Australian → Traditional RP (7 comparisons)
- FACE→/eɪ/, GOAT→/əʊ/, GOOSE→/uː/ retreat: **Cruttenden** (RP targets), **Cox & Fletcher** (starting forms).
- SQUARE /eː/→/eə/ glide: **Cruttenden**.
- THOUGHT /oː/→/ɔː/ + LOT /ɔ/→/ɒ/ lowering: **Cruttenden**; **Cox & Fletcher**.
- yod separation /tʃʉːn/→/tjuːn/ (+ vowel retreat): **Cruttenden** (retention), **Cox & Fletcher** (Australian coalescence).
- BATH /ɐː/→/ɑː/ backing + incidence becomes fixed: **Wells** vol. 2 (RP full broad set); **Cox & Fletcher** (Australian variability being left behind).
- **Likely concerns:** "RP never vocalises [ɫ]" in the GOOSE card — correct for the course target; reviewer confirms the absolute is safe HERE (it is a core RP course claim, not a variation).
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

## C11. `aus-ssbe` — Australian → Standard British (7 comparisons)
- FACE→/eɪ/, PRICE→/aɪ/, GOAT→/əʊ/: **Lindsey** (SSB), **Cox & Fletcher** (Australian).
- LOT /ɔ/→/ɒ/ + THOUGHT /oː/→/ɔː/ ("one step down"): **Lindsey**/**Cruttenden**; **Cox & Fletcher**.
- SQUARE /eː/→/ɛː/ one-height-step opening (both steady): **Cox & Fletcher** (/eː/), **Lindsey** (/ɛː/) — the route's "small but audible" honesty is the claim.
- STRUT /ɐ/→/ʌ/: as C9.
- BATH: as C10.
- **Likely concerns:** GOOSE deliberately ABSENT (both accents front it — no invented contrast); reviewer should confirm the omission as a feature of the route, per the no-invented-distinctions rule.
- Reviewer: ________  Verdict: ________  Revision notes: ________  Date: ________

---

*End of packet v1. 34 items awaiting human review. No statuses were
changed in its preparation.*
