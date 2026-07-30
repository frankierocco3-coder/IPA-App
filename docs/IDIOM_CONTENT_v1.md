# Speechcraft — Idiom, Slang & Colloquialism Lists

**Draft v1 for review.** Three dialects: RP/British, General American, Australian.
Nothing is wired into the app yet — this is content to proof before it becomes `js/data/idiom.js`.

## Field definitions

Each entry carries the tags the eventual data module needs:

| Field | Values | Why |
|---|---|---|
| `era` | `period` (c.1890–1930) · `contemporary` · `both` | Your libraries are period plays; screen work is modern. An actor needs to know which is which. |
| `flag` | `null` · `vulgar` · `slur` · `dated-offensive` | Off by default in the UI. Flagged entries exist because actors get cast in roles that use this language. |
| `type` | `word` · `phrase` · `saying` | Sayings ("flat out like a lizard drinking") behave differently from single words in drills. |

**`period` does not mean dead.** It means *characteristic of that era* — an actor playing Wilde should reach for it, an actor in a modern self-tape should not. A few terms marked `both` are genuinely continuous.

---

## 1. RP / Upper & Upper-Middle British

**Read this first.** RP is a class accent, not a regional one. There is no folk slang attached to it the way there is to Cockney or Scouse — what follows is the idiom of the class that *speaks* RP: public school, country house, officers' mess, Society. That's exactly what Wilde's characters use. If you later add Cockney or Estuary, that list will look completely different and be three times as rich.

### Period — Society and public school (c.1890–1930)

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| bally | Mild euphemism for "bloody" | word | — | "The bally thing won't start." |
| beastly | Unpleasant, horrid | word | — | "What beastly weather we're having." |
| topping | Excellent | word | — | "A topping idea, old man." |
| ripping | Splendid | word | — | "We had a ripping time at Ascot." |
| spiffing | First-rate | word | — | "Spiffing! I shall tell Mother at once." |
| what rot | What nonsense | phrase | — | "Marry him? What utter rot." |
| piffle | Nonsense | word | — | "Don't talk piffle, Algernon." |
| by Jove | Mild exclamation of surprise | phrase | — | "By Jove, she's done it." |
| good egg | A thoroughly decent person | phrase | — | "Carruthers? Frightfully good egg." |
| bad hat | A disreputable man | phrase | — | "Steer clear of him — he's a bad hat." |
| bounder | An ill-bred, presumptuous man | word | — | "The fellow's an absolute bounder." |
| cad | A man who behaves dishonourably, esp. to women | word | — | "No gentleman would — only a cad." |
| blackguard | A scoundrel (**say "BLAG-gard"**, /ˈblæɡɑːd/) | word | — | "You blackguard, you've ruined her." |
| rotter | A contemptible person | word | — | "He's a frightful rotter." |
| dash it all | Mild curse of frustration | saying | — | "Dash it all, must you always be right?" |
| hang it | Mild curse | phrase | — | "Oh, hang it, I'll come along." |
| deuced | Damned (softened) | word | — | "A deuced awkward business." |
| confound it | Mild curse | phrase | — | "Confound it, where's my hat?" |
| I say | Attention-getter / mild protest | phrase | — | "I say, that's rather thick." |
| rather thick | A bit much, unfair | phrase | — | "Reading my letters? Rather thick." |
| old bean / old thing / old boy | Affectionate address, man to man | phrase | — | "Steady on, old bean." |
| rather! | Emphatic yes | word | — | "Care to join us?" "Rather!" |
| right-ho | Very well, agreed | phrase | — | "Right-ho, I'll see to it." |
| toodle-pip | Goodbye | phrase | — | "Toodle-pip, see you at dinner." |
| cheerio | Goodbye | word | both | "Cheerio, then." |
| blotto | Very drunk | word | — | "He was completely blotto by nine." |
| squiffy | Slightly drunk | word | — | "I'm a touch squiffy, I confess." |
| tight | Drunk | word | — | "Don't get tight before the speeches." |
| the wireless | The radio | phrase | — | "It was on the wireless this morning." |
| to motor down | To travel by car | phrase | — | "We'll motor down on Friday." |
| send a wire | Send a telegram | phrase | — | "Wire me the moment you arrive." |
| the Season | The Society calendar, May–August | phrase | — | "She's coming out this Season." |
| one's people | One's family | phrase | — | "My people are in Shropshire." |
| in Society | Among the fashionable classes | phrase | — | "One simply doesn't, not in Society." |
| prep | Homework, at a public school | word | both | "I've prep until seven." |
| tuck / tuck shop | Food and sweets at school | word | both | "Spent all my money at the tuck shop." |
| jumped-up | Presumptuous, risen above one's station | word | both | "Some jumped-up clerk from the City." |

### Contemporary — modern British, still class-inflected

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| frightfully | Very (now knowingly posh) | word | both | "Frightfully kind of you." |
| awfully | Very | word | both | "I'm awfully sorry." |
| quite so | I agree entirely | phrase | both | "Quite so. Couldn't agree more." |
| it simply isn't done | That's socially unacceptable | saying | both | "Wear brown to a funeral? It isn't done." |
| chuffed | Very pleased | word | contemporary | "I'm dead chuffed with it." |
| gutted | Bitterly disappointed | word | contemporary | "Absolutely gutted, I was." |
| knackered | Exhausted | word | — | "I'm knackered — bed for me." |
| shattered | Exhausted | word | contemporary | "Shattered after that rehearsal." |
| faffing about | Wasting time fussing | phrase | contemporary | "Stop faffing about and get in." |
| dodgy | Suspect, unreliable, unsafe | word | contemporary | "The brakes felt a bit dodgy." |
| naff | Tasteless, poor quality | word | contemporary | "That waistcoat's a bit naff." |
| wonky | Unstable, askew | word | both | "The table's gone wonky." |
| gormless | Vacantly stupid | word | both | "Don't stand there looking gormless." |
| whinge | To complain persistently | word | both | "Stop whingeing and help." |
| natter / chin-wag | A chat | word | both | "We had a good natter about it." |
| put a sock in it | Be quiet | saying | both | "Oh, put a sock in it." |
| gone to the dogs | Deteriorated badly | saying | both | "This club's gone to the dogs." |
| a shambles | A disorganised mess | word | both | "The whole production was a shambles." |
| a spot of | A small amount of | phrase | both | "A spot of lunch?" |
| plummy | Of an exaggeratedly posh voice | word | both | "Frightfully plummy vowels." |
| sod's law | Whatever can go wrong will | saying | vulgar (mild) | "Sod's law — it rained." |
| bloody | All-purpose intensifier | word | vulgar (mild) | "It's bloody freezing." |
| bugger | Curse; also a person (affectionate or not) | word | vulgar | "Bugger it." / "Cheeky bugger." |
| can't be arsed | Can't be bothered | phrase | vulgar | "I can't be arsed with it tonight." |
| taking the mickey | Mocking, teasing | saying | — | "Are you taking the mickey?" |
| taking the piss | Same, stronger | saying | vulgar | "You're taking the piss, surely." |
| bollocks | Nonsense; also testicles | word | vulgar | "That's absolute bollocks." |

### U and non-U — the sharpest class tell you have

Not slang, but the single most useful thing on this page for an actor playing class. Nancy Mitford's 1954 distinction: the **U** (upper-class) word versus the **non-U** (aspirational middle-class) word. Getting these backwards reads instantly false to a British ear, no matter how good the vowels are.

| U (upper) | non-U (middle) |
|---|---|
| lavatory / loo | toilet |
| sofa | settee, couch |
| napkin | serviette |
| pudding | dessert, sweet |
| lunch | dinner (midday meal) |
| dinner | tea (evening meal) |
| drawing room | lounge |
| looking-glass | mirror |
| scent | perfume |
| rich | wealthy |
| How d'you do? | Pleased to meet you |
| What? | Pardon? |
| jam | preserve |
| spectacles | glasses |
| chimneypiece | mantelpiece |
| writing-paper | note-paper |
| ill | sick |
| die | pass on / pass away |

*Caveat: this is a 1950s snapshot. Some has softened — "glasses" is now unmarked, "pardon" still carries the tell. Worth an era note if it goes in the app.*

---

## 2. General / Neutral American

**Read this first.** Neutral American is defined by the *absence* of regional markers, so its slang is national-general — the stuff you'd hear anywhere from a network broadcast to a college campus. The vivid regional material (*y'all, fixin' to, bless your heart* / *brick, mad late, tight*) belongs to the Southern and New York accents you haven't built yet, and putting it here would teach actors to sound like they're from somewhere while claiming they're from nowhere. I've kept it out and noted it below.

### Period — c.1890–1930, the O'Neill era

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| swell | Excellent; also a fashionable person | word | — | "That's just swell." |
| keen | Great, appealing | word | — | "What a keen little car." |
| the bee's knees | The finest thing going | saying | — | "She thinks she's the bee's knees." |
| the cat's pajamas | Outstanding | saying | — | "That band is the cat's pajamas." |
| the berries | Excellent | phrase | — | "This place is the berries." |
| hotsy-totsy | Just fine | word | — | "Everything's hotsy-totsy." |
| jake | Fine, all right | word | — | "Don't worry, everything's jake." |
| copacetic | Entirely satisfactory | word | both | "We're copacetic." |
| applesauce | Nonsense | word | — | "Aw, applesauce." |
| horsefeathers | Nonsense | word | — | "Horsefeathers! I saw you." |
| hooey | Nonsense | word | — | "That's a lot of hooey." |
| baloney | Nonsense | word | both | "Don't feed me that baloney." |
| bunk | Nonsense | word | both | "The whole story's bunk." |
| sap | A gullible fool | word | — | "Some sap paid full price." |
| palooka | An oaf; a second-rate fighter | word | — | "He's a palooka, not a contender." |
| mug | A tough; also a face | word | both | "A couple of mugs on the corner." |
| take a powder | Leave quickly | saying | — | "You'd better take a powder." |
| beat it | Get out | phrase | both | "Beat it, kid." |
| dogs | Feet | word | — | "My dogs are barking." |
| gams | Legs (esp. a woman's) | word | dated-offensive | "Some gams on that dame." |
| jalopy | A battered old car | word | — | "That jalopy won't make the hill." |
| two bits | 25 cents; a trivial sum | phrase | both | "Not worth two bits." |
| sawbuck | A ten-dollar bill | word | — | "Slipped him a sawbuck." |
| clams / simoleons / kale | Money | word | — | "Fifty clams, cash." |
| speakeasy | An illegal bar | word | — | "There's a speakeasy off Bleecker." |
| hooch | Illicit liquor | word | both | "Bad hooch — it'll blind you." |
| bathtub gin | Home-distilled spirits | phrase | — | "Nothing but bathtub gin." |
| giggle water | Alcohol | phrase | — | "Bring the giggle water." |
| blind pig | A low speakeasy | phrase | — | "A blind pig on the waterfront." |
| bootleg | To traffic illegal liquor | word | both | "He bootlegged all through '24." |
| flapper | A modern young woman of the 1920s | word | — | "She's turned flapper on us." |
| sheik | A dashing young man | word | — | "Thinks he's some kind of sheik." |
| dead soldier | An empty bottle | phrase | both | "Dead soldiers all over the floor." |
| no dice | No luck; refused | phrase | both | "Asked him twice. No dice." |
| on the level | Honest, sincere | phrase | both | "Are you on the level with me?" |
| the brush-off | A curt dismissal | phrase | both | "She gave me the brush-off." |
| dame / broad | A woman | word | dated-offensive | "Who's the dame in the hat?" |

### Contemporary — modern general American

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| bail (on) | Leave; abandon a plan or person | word | contemporary | "He bailed on us at the last second." |
| sketchy | Dubious, unsafe, unreliable | word | contemporary | "That neighborhood's sketchy at night." |
| flake / flaky | Someone who fails to show up | word | contemporary | "Total flake — third time now." |
| ghost (someone) | Cut all contact without explanation | word | contemporary | "She ghosted me after two dates." |
| my bad | My mistake | phrase | contemporary | "My bad, I read the call sheet wrong." |
| hit me up | Get in touch | phrase | contemporary | "Hit me up when you land." |
| ride | One's car | word | contemporary | "Nice ride." |
| bogus | Fake; unfair | word | contemporary | "That excuse is bogus." |
| bummed | Disappointed | word | contemporary | "Pretty bummed about the callback." |
| stoked / psyched | Excited | word | contemporary | "I'm so stoked for this." |
| amped / wired | Keyed up, over-energised | word | contemporary | "Too much coffee — I'm wired." |
| blow off | Skip; ignore | phrase | contemporary | "Don't blow off the warm-up." |
| crash | To sleep; to attend uninvited | word | both | "Can I crash on your couch?" |
| jonesing for | Craving | phrase | contemporary | "Jonesing for a real coffee." |
| salty | Bitter, resentful | word | contemporary | "He's still salty about it." |
| throw shade | Insult subtly | saying | contemporary | "She threw so much shade." |
| lowkey | Somewhat; secretly | word | contemporary | "Lowkey nervous about tomorrow." |
| mid | Mediocre, overrated | word | contemporary | "The second act was mid." |
| slaps | Is excellent (esp. of music) | word | contemporary | "This track slaps." |
| shoot the breeze | Chat idly | saying | both | "We shot the breeze for an hour." |
| touch base | Make brief contact | saying | both | "Let's touch base Monday." |
| ballpark | Approximate | word | both | "Ballpark, about two hours." |
| out of left field | Completely unexpected | saying | both | "The rewrite came out of left field." |
| Monday-morning quarterback | Someone wise after the event | saying | both | "Easy to be a Monday-morning quarterback." |
| take a rain check | Postpone an invitation | saying | both | "Rain check on dinner?" |
| bust someone's chops | Give someone a hard time | saying | both | "Quit busting my chops." |
| spill the beans | Reveal a secret | saying | both | "Somebody spilled the beans." |
| hold your horses | Wait | saying | both | "Hold your horses, I'm coming." |
| the john | The bathroom | word | both | "Where's the john?" |
| buck | A dollar | word | both | "Twenty bucks, tops." |
| hick / rube / yokel | An unsophisticated country person | word | dated-offensive | "They think we're all hicks out here." |
| pissed / pissed off | Angry (**not** drunk — see false friends) | word | vulgar (mild) | "He was pissed I missed the cue." |
| helluva | Remarkable; considerable | word | vulgar (mild) | "That's a helluva performance." |

---

## 3. Australian

**Read this first.** This is the only one of your three dialects with a genuinely dense, distinctive lexicon — Australian English generates slang faster than any other variety of English, largely through the *-o* and *-ie* diminutives (`arvo`, `servo`, `bottle-o`, `bikkie`, `sunnies`, `mozzie`). Teach the *pattern* and an actor can generate new words correctly, which is worth more than memorising fifty of them.

Register warning: Australian speech carries far more casual profanity than either British or American, and it often signals affection rather than aggression. An actor who scrubs it out will sound stiff and wrong. That's the strongest argument for keeping your `vulgar` flag available rather than cutting the material.

### Core — the productive patterns

| Pattern | Rule | Examples |
|---|---|---|
| **-o** | Clip the word, add -o | arvo (afternoon), servo (service station), bottle-o (off-licence), reg-o (registration), muso (musician), garbo (refuse collector), smoko (work break) |
| **-ie / -y** | Clip, add -ie | bikkie (biscuit), sunnies (sunglasses), mozzie (mosquito), tinnie (can of beer), barbie (barbecue), brekkie (breakfast), coldie (cold beer), sickie (false sick day), trackies (tracksuit) |

### Contemporary and continuous

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| arvo | Afternoon | word | both | "See you this arvo." |
| barbie | Barbecue | word | contemporary | "Chuck it on the barbie." |
| bloke | A man | word | both | "Decent bloke, that one." |
| mate | Universal address; also a warning when cold | word | both | "Thanks, mate." / "*Mate.*" |
| bludger | An idler who lives off others | word | both | "He's a bludger, never worked a day." |
| bogan | An unrefined, uncultured person | word | contemporary | "Bit of a bogan, but harmless." |
| bush tucker | Native food gathered from the bush | phrase | both | "He knows his bush tucker." |
| cark it | To die; to break down | phrase | contemporary | "The ute finally carked it." |
| chuck a sickie | Take a day off feigning illness | saying | contemporary | "Chucked a sickie and went to the beach." |
| chunder | To vomit | word | vulgar (mild) | "He chundered in the taxi." |
| coldie | A cold beer | word | contemporary | "Grab us a coldie." |
| crook | Ill; also broken or unfair | word | both | "I'm feeling crook." |
| dag | An amusingly scruffy or daggy person | word | both | "You're such a dag." |
| daks | Trousers | word | both | "Trackie dacks and thongs." |
| dead set | Genuinely, absolutely | phrase | contemporary | "Dead set legend, he is." |
| fair dinkum | Genuine, true | phrase | both | "Fair dinkum, I saw it myself." |
| dob (someone) in | Inform on someone | word | both | "Nobody likes a dobber." |
| drongo | A fool | word | both | "Don't be a drongo." |
| dunny | Toilet, esp. an outdoor one | word | both | "Out the back, past the dunny." |
| esky | An insulated cool box | word | contemporary | "Ice is in the esky." |
| fair go | A fair chance; also a protest | phrase | both | "Give the bloke a fair go." |
| footy | Football (code varies by state) | word | contemporary | "Watching the footy." |
| galah | A loud, silly person (a pink cockatoo) | word | both | "Carrying on like a pack of galahs." |
| give it a burl | Give it a try | saying | both | "Go on, give it a burl." |
| good onya | Well done | phrase | contemporary | "Good onya, mate." |
| grog | Alcohol | word | both | "Bring your own grog." |
| hard yakka | Hard physical work | phrase | both | "It's hard yakka in that heat." |
| heaps | Very, a lot | word | contemporary | "Heaps good." |
| larrikin | A mischievous but likeable rogue | word | both | "He was always a bit of a larrikin." |
| lollies | Sweets, candy | word | both | "The kids are full of lollies." |
| no worries | It's fine; you're welcome; certainly | phrase | both | "No worries, I'll sort it." |
| ocker | A boorish, aggressively Australian man; also the broad accent | word | both | "Full ocker, that voice." |
| the oldies | One's parents | phrase | contemporary | "Staying with the oldies." |
| piker | Someone who backs out of plans | word | both | "Don't be a piker." |
| ratbag | A rogue; a troublemaker | word | both | "Cheeky little ratbag." |
| reckon | To think; also emphatic agreement | word | both | "Yeah, I reckon." |
| ripper | Excellent | word | both | "You little ripper!" |
| rort | A scam, esp. institutional | word | both | "The whole scheme's a rort." |
| rug up | Dress warmly | phrase | both | "Rug up, it's cold out." |
| sanger / sango | Sandwich | word | contemporary | "Just a sanger for lunch." |
| she'll be right | It'll be fine | saying | both | "She'll be right, don't stress." |
| she'll be apples | Same, older | saying | period | "She'll be apples, mate." |
| your shout | Your turn to buy the round | phrase | both | "My shout — what're you having?" |
| skerrick | The tiniest amount | word | both | "Not a skerrick left." |
| smoko | A short work break | word | both | "We'll do it after smoko." |
| spit the dummy | Throw a tantrum | saying | contemporary | "He spat the dummy and walked out." |
| have a squiz | Have a look | saying | both | "Have a squiz at this." |
| station | A very large rural property | word | both | "Grew up on a cattle station." |
| stickybeak | A nosy person; to pry | word | both | "Just having a stickybeak." |
| stubby | A small bottle of beer | word | contemporary | "Pass me a stubby." |
| sunnies | Sunglasses | word | contemporary | "Where'd I put my sunnies?" |
| togs | Swimwear | word | both | "Don't forget your togs." |
| too right | Absolutely | phrase | both | "Too right it was." |
| true blue | Loyal; authentically Australian | phrase | both | "True blue, that fella." |
| ute | A utility vehicle / pickup | word | both | "Threw it in the back of the ute." |
| whinge | Complain persistently | word | both | "Stop whingeing." |
| woop woop | A remote, nowhere place | phrase | both | "He lives out in woop woop." |
| yobbo | A loutish, aggressive man | word | both | "Bunch of yobbos out front." |
| iffy | Doubtful, unreliable | word | both | "The weather looks iffy." |
| pot / middy / schooner | Beer glass sizes — **and they change by state** | word | both | "A pot in Melbourne is a middy in Sydney." |

### Period Australian — for bush and colonial text

| Term | Meaning | Type | Flag | In use |
|---|---|---|---|---|
| bonzer | Excellent, first-rate | word | period | "A bonzer day for it." |
| cobber | A close friend | word | period | "G'day, cobber." |
| ridgy-didge | Genuine, authentic | phrase | period | "Ridgy-didge, straight up." |
| hooroo | Goodbye | word | period | "Hooroo, then." |
| swag / swagman | A bedroll / an itinerant labourer carrying one | word | period | "A swagman camped by the billabong." |
| billy | A tin can for boiling tea over a fire | word | period | "Boil the billy." |
| billabong | An oxbow lake / waterhole | word | both | "Down by the billabong." |
| jumbuck | A sheep | word | period | "Grabbed that jumbuck." |
| up a gum tree | In serious difficulty | saying | period | "We're properly up a gum tree." |
| bush telegraph | The informal rural rumour network | phrase | period | "The bush telegraph got there first." |
| on the turps | On a drinking bout | phrase | both | "He's been on the turps all week." |
| done like a dinner | Utterly defeated | saying | both | "Done like a dinner, we were." |

### Sayings — the ones that carry the voice

| Saying | Meaning |
|---|---|
| flat out like a lizard drinking | Extremely busy (also a pun — flat out = fast, and flat out = lying flat) |
| mad as a cut snake | Furious, or unhinged |
| carrying on like a pork chop | Making an unnecessary fuss |
| away with the pixies | Not paying attention, daydreaming |
| couldn't organise a chook raffle in a pub | Utterly incompetent |
| dry as a dead dingo's donger | Extremely thirsty (`vulgar`) |
| build a bridge and get over it | Stop dwelling on it |
| you right? | Do you need something? (not "are you unwell") |
| bloody oath | Absolutely, emphatically yes (`vulgar (mild)`) |
| not here to muck spiders | I'm here for a reason — get on with it (`vulgar` in the original) |

### Flagged — vulgar but everyday

| Term | Meaning | Flag |
|---|---|---|
| bugger / buggered | Curse; also broken or exhausted — "she's buggered" | vulgar |
| bloody | Universal intensifier, far more frequent than in US speech | vulgar (mild) |
| rack off | Go away | vulgar (mild) |
| root / rooting | **Sexual intercourse.** Not cheering. See false friends. | vulgar |
| shithouse | Terrible, of poor quality | vulgar |
| piss off | Go away | vulgar |
| on the piss | Out drinking | vulgar |

---

## 4. Cross-dialect false friends — highest practical value

The fastest way to break the illusion isn't a wrong vowel, it's a right word used wrong. These are the traps.

| Word | RP / British | General American | Australian |
|---|---|---|---|
| **thongs** | Underwear | Underwear | **Flip-flops.** "I'll just get my thongs on" is unremarkable. |
| **pissed** | **Drunk** | **Angry** | **Drunk** |
| **root** | Cheer for; a plant part | **Cheer for** ("rooting for you") | **Have sex.** A visiting American saying "I'm rooting for your team" is a genuine and well-documented disaster. |
| **fanny** | **Vulva** (vulgar) | Buttocks (mild, dated) | **Vulva** (vulgar) |
| **rubber** | Eraser | **Condom** | Eraser |
| **chips** | Hot fries | Crisps (cold, bagged) | Both, context-dependent |
| **biscuit** | A sweet cookie | A soft savoury scone | A sweet cookie |
| **jumper** | A pullover | A sleeveless dress | A pullover |
| **pants** | **Underwear** | Trousers | Trousers |
| **braces** | Trouser suspenders | Teeth straighteners | Trouser suspenders |
| **suspenders** | Stocking holders | Trouser braces | Stocking holders |
| **bum bag** | Waist pouch | *fanny pack* | bum bag |
| **first floor** | The floor **above** ground | The ground floor | The floor above ground |
| **entrée** | A starter | **The main course** | A starter |
| **capsicum** | Pepper | Bell pepper | **Capsicum** |
| **doona** | Duvet | Comforter | **Doona** |
| **arvo/servo** | — | — | Australian only — an actor sprinkling these into an RP script is a common tell |
| **y'all** | — | Southern US only, **not** neutral | — |

---

## Accuracy notes — please check these

I've written this from knowledge, and there are places I'd want a native speaker to confirm rather than have you ship on my word:

1. **Currency of contemporary slang.** Terms like `mid`, `slaps`, `lowkey` move fast. Some may already read as dated to a 20-year-old, which is worse than using nothing. Worth a review before these go in front of students.
2. **Australian regional variation.** The beer-size terms (`pot`/`middy`/`schooner`) genuinely differ by state and I've simplified. Same for `footy`, which means different codes in Melbourne vs Sydney vs Perth.
3. **`skerrick`, `she'll be apples`, `ridgy-didge`, `hooroo`** — I've marked these period, but they may survive in older or rural speech more than I've credited.
4. **U/non-U** is a 1954 snapshot. I flagged the softening but the exact current state of each pair is worth checking.
5. **Period American money slang** (`simoleons`, `kale`, `clams`) — attested, but I'm less sure how *common* each was versus literary.
6. **No IPA yet.** Every entry will need transcription in its dialect, and per your own notes RP and Australian IPA are rule-derived from General American and marked ≈. Slang is exactly where rule-derivation is least reliable — irregular, often regional, sometimes deliberately distorted. `blackguard` → /ˈblæɡɑːd/ is the kind of thing no rule will get right. Budget for hand-transcription.

## Deliberately excluded

- **Regional US** (Southern, New York, Boston, Chicago) — waiting on those accents, as you said. Worth noting these will be your richest American lists by far.
- **Cockney, Estuary, Scouse, Geordie, Scots** — same reason. Cockney rhyming slang alone is a list of its own.
- **Māori-derived and NZ terms** — often confused with Australian; worth keeping strictly separate if you ever add NZ.
- **Slurs.** Australian, British and American period literature all contain racial slurs an actor may encounter in a script — most acutely in Australian colonial writing and American plays of the O'Neill era. I have not listed them. If comprehension of period text requires it, that belongs in a separate, deliberately-designed reference with historical framing, no example sentences, and no practice drills — not mixed into a browsable slang list where the app might serve one as an exercise. Tell me if you want that built and I'll treat it as its own piece of work.

## Suggested next steps

1. You proof the three lists and strike anything that reads false.
2. I convert to `js/data/idiom.js` matching your library conventions — same tagged-object shape as `IBSEN`, so `LIBRARIES`-style registration works.
3. Decide the UI surface: a browsable reference under **Text & Delivery**, or drills in the **Arcade**, or both.
4. Hand-transcribe IPA per dialect. This is the real work and shouldn't be automated.
