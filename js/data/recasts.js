// Sonnet learning editions — original Speechcraft content.
//
// Three views per supported sonnet:
//   Original         — Shakespeare's public-domain wording (sonnets.js)
//   Plain Meaning    — an independently written explanation of the literal
//                      meaning, imagery and emotional movement
//   In Today's Voice — original CREATIVE DIALECT TRANSPOSITIONS: the ideas
//                      re-voiced in a contemporary register. NOT literal
//                      translations, NOT "accent performances" (performing
//                      the original words in an accent is the Perform
//                      tab's job), and no claim of strict iambic
//                      pentameter — the meter has not been formally
//                      reviewed.
//
// All content is original to Speechcraft. No third-party modern study
// guides or translations were consulted or reproduced. Traditional RP
// deliberately offers Original + Plain Meaning only — a slang RP
// "translation" would be a costume, not a register.
//
// REVIEW GATE: a transposition reaches learners only when its dialect
// entry below is 'approved' in TRANSPOSITION_REVIEW. Everything starts
// 'draft' and renders only on the owner #review page until Frankie has
// checked it for literary faithfulness and dialect accuracy
// (checklist: docs/RECAST_REVIEW.md). Plain Meaning is already live and
// is NOT gated by this map.

export const TRANSPOSITION_LABELS = {
  nam: 'Neutral American Transposition',
  ssbe: 'Standard British Transposition',
  aus: 'Australian Transposition',
  rp: 'Traditional RP Transposition',
};

// Sonnet 18 is the structural pilot: every view wired end to end, all
// transpositions still awaiting review.
export const TRANSPOSITION_REVIEW = {
  18: { nam: 'draft', ssbe: 'draft', aus: 'draft' },
  29: { nam: 'draft', ssbe: 'draft', aus: 'draft' },
  73: { nam: 'draft', ssbe: 'draft', aus: 'draft' },
  116: { nam: 'draft', ssbe: 'draft', aus: 'draft' },
  130: { nam: 'draft', ssbe: 'draft', aus: 'draft' },
};

// The dialects of sonnet `n` a learner may see under In Today's Voice:
// approved AND actually written. No approval, no tab — never a dead tab.
export const approvedTranspositions = n =>
  Object.keys(RECASTS[n]?.recasts ?? {})
    .filter(d => TRANSPOSITION_REVIEW[n]?.[d] === 'approved');

export const RECASTS = {
  18: {
    plain: 'The speaker wonders whether to compare the loved one to a summer’s day, and decides the comparison sells them short: summer is windy, too brief, sometimes too hot, often dimmed — and everything beautiful eventually fades by chance or by nature’s course. The loved one’s summer, though, will never fade or lose its beauty, and death will never claim them — because this poem preserves them. The closing couplet lands the turn: as long as people live and read, these lines live, and they keep the loved one alive.',
    recasts: {
      nam: `Should I say you're like a summer day?\nHonestly, you're better — steadier, more easygoing.\nRough winds beat up the May flowers,\nand summer's gone before you know it.\nSome days the sun burns way too hot;\nother days it barely shows at all.\nEverything beautiful slips eventually —\nbad luck or just time doing what time does.\nBut your summer? Not going anywhere.\nThe glow you've got stays yours.\nAnd death doesn't get to brag he ever caught you,\nbecause you're written into something permanent now.\nAs long as people breathe and read,\nthis keeps you alive.`,
      ssbe: `Shall I say you're like a summer's day?\nBit unfair on you, honestly — you're lovelier, more settled.\nThe wind batters those May buds about,\nand summer's booked such a short slot anyway.\nSome days the sun's an absolute furnace;\nhalf the time it can't be bothered to come out.\nEverything gorgeous fades in the end —\nrotten luck, or just nature getting on with it.\nBut your summer isn't going anywhere.\nWhat you've got doesn't wear off.\nAnd death can't go round claiming he's had you,\nnot when you're kept safe in these lines.\nLong as anyone's breathing, anyone's reading,\nthis lives — and it keeps you living.`,
      aus: `Reckon I should call you a summer's day?\nNah — you're lovelier than that, and less full-on.\nThe wind knocks the May buds around,\nand summer's over before you've settled in.\nSome days that sun is just brutal;\nothers it barely fronts up at all.\nEvery beautiful thing fades eventually —\nrough luck, or nature doing its rounds.\nBut your summer's not going anywhere, mate.\nWhat you've got, you keep.\nAnd death doesn't get to skite he ever got you,\nbecause these lines have already got you safe.\nLong as anyone's still breathing and reading,\nthis keeps you here.`,
    },
  },
  29: {
    plain: 'The speaker is at rock bottom — out of luck, out of favour, and ashamed of it. Alone, they cry to a heaven that doesn’t answer, curse their situation, and envy everyone: the hopeful, the good-looking, the well-connected, the talented, the free. Then comes the turn: almost despising themselves, they happen to think of the loved one — and their mood lifts like a lark rising at dawn from dark earth to sing at heaven’s gate. Remembering that love feels like such wealth that they wouldn’t trade places with kings.',
    recasts: {
      nam: `When my luck's gone and nobody's calling,\nI sit alone and feel like a complete outcast,\nyelling at a sky that isn't listening,\nlooking at myself and hating what I see —\nwishing I had that guy's prospects, that guy's face,\nthis one's friends, that one's talent, another one's freedom —\nleast happy with the things I usually love.\nBut right in the middle of despising myself,\nyou cross my mind — and everything lifts,\nlike a lark at sunrise taking off from the cold ground\nto sing right up at heaven's door.\nRemembering the love you give me is worth so much,\nI wouldn't trade my life for a king's.`,
      ssbe: `When it's all gone wrong and nobody wants to know,\nI sit about on my own feeling like a proper outcast,\nhaving a go at a sky that couldn't care less,\nlooking at myself and absolutely hating it —\nwanting his luck, wanting her looks,\nthis one's mates, that one's talent, everyone's options —\nbored, even, of the things I usually love.\nAnd then, mid-wallow, right at my worst,\nI happen to think of you — and everything lifts,\nlike a lark going up at dawn off the dark ground,\nsinging its heart out at heaven's gate.\nWhat your love's worth, once I remember it,\nI wouldn't swap places with a king.`,
      aus: `When my luck's shot and no one's picking up,\nI sit out here on my own like a proper outsider,\nbunging it on at a sky that isn't listening,\ncopping a look at myself and hating it —\njealous of his chances, her looks,\nthis bloke's mates, that one's talent, everyone's run of it —\neven the stuff I love feels flat.\nThen right in the middle of the sulk,\nyou come to mind — and up it all goes,\nlike a lark off the dark paddock at first light,\nbelting it out at heaven's gate.\nRemembering what your love's worth,\nI wouldn't swap spots with a king. Not a chance.`,
    },
  },
  73: {
    plain: 'The speaker asks the loved one to look at them and see late autumn: a few yellow leaves shaking on bare branches — branches the poet calls ruined choirs where birds sang late. Then twilight: the light after sunset fading as night, death’s twin, closes everything down. Then a dying fire: glowing on the ashes of its own youth, consumed by the very thing that fed it. The couplet turns it toward the loved one: seeing all this makes your love stronger — you love well what you must lose soon.',
    recasts: {
      nam: `You see it in me — that late-fall look,\na few yellow leaves hanging on, or none,\nbranches shaking against the cold,\nbare ruined bleachers where the birds used to sing.\nYou see the end of a day in me too:\nsun's down, the light in the west going fast,\nnight coming on to close it all out —\ndeath's understudy, putting everything to rest.\nAnd you see a fire burning low,\nlying on the ashes of everything it was,\ngoing out on the very thing that fed it.\nYou see all that — and it makes your love stronger.\nYou love hardest what you can't keep long.`,
      ssbe: `You can see it in me — proper end of autumn,\na few yellow leaves still hanging about, or none,\nbranches shivering in the cold,\nbare ruined stands where the birds used to sing.\nYou see the tail end of a day as well:\nsun gone, the last light fading in the west,\nnight coming in to shut it all down —\ndeath's stand-in, tucking everything away.\nAnd you see a fire that's nearly done,\nglowing on the ashes of what it used to be,\nput out by the very thing that kept it going.\nSeeing that, your love gets stronger, doesn't it —\nyou love properly what you're about to lose.`,
      aus: `You can see it on me — late autumn, basically:\na few yellow leaves hanging on, or none at all,\nbranches rattling in the cold,\nbare ruined grandstands where the birds used to sing.\nYou can see the end of a day in me too:\nsun's gone, the west fading out fast,\nnight rolling in to shut the whole thing down —\ndeath's offsider, tucking everything in.\nAnd you can see a campfire burning low,\nsitting on the ash of everything it was,\ndying on the same stuff that got it going.\nYou see all that — and you love me harder for it.\nYou love best what you're about to lose.`,
    },
  },
  116: {
    plain: 'The speaker refuses to accept any obstacle to the marriage of true minds. Real love doesn’t change when circumstances change, or leave when the other person falters. It’s a fixed seamark that watches storms and is never shaken; the star that guides every wandering ship, beyond valuation. Love isn’t at the mercy of time, even though youth and beauty fall within time’s reach; it doesn’t alter with hours and weeks but holds out to the edge of doom. The couplet stakes everything: if this is an error and provable, the poet never wrote and no one ever loved.',
    recasts: {
      nam: `Don't tell me two people who really get each other\ncan't make it work. It isn't love\nif it changes the second things change,\nor walks when the other person stumbles.\nNo — love's the lighthouse in the storm,\ntaking the hits and never moving,\nthe north star for every lost boat out there —\nyou can measure its height, never its worth.\nLove isn't time's fool, even though\nyoung faces fall inside time's reach.\nIt doesn't fade by the hour or the week —\nit holds right out to the edge of everything.\nIf I'm wrong about this, and you can prove it,\nI never wrote a word, and nobody ever loved.`,
      ssbe: `Don't give me reasons two people who properly know each other\ncan't stay the course. It isn't love\nif it shifts the moment things shift,\nor clears off when the other one wobbles.\nNo — love's the lighthouse in the weather,\nbattered and not budging an inch,\nthe fixed star for every boat that's lost itself —\nyou can measure where it sits, never what it's worth.\nLove isn't time's fool, even though\nevery lovely face sits inside time's reach.\nIt doesn't wear out by the hour or the week —\nit sees things through to the absolute end.\nIf that's wrong, and anyone can prove it,\nI never wrote a thing, and no one ever loved.`,
      aus: `Don't come at me with reasons two people who get each other\ncan't go the distance. It isn't love\nif it changes when the weather changes,\nor shoots through when the other one struggles.\nNo — love's the lighthouse in the storm,\ncopping it all and not shifting a millimetre,\nthe star every lost boat steers home by —\nyou can mark where it sits, never what it's worth.\nLove's not time's fool, even though\nevery young face is inside time's swing.\nIt doesn't wear out by the hour or the week —\nit goes the full stretch, right to the end.\nIf I've got that wrong, and you can prove it,\nI never wrote a word — and no one's ever loved.`,
    },
  },
  130: {
    plain: 'The speaker catalogues everything a conventional love poem would claim and refuses each one: the mistress’s eyes aren’t like the sun, her lips aren’t coral-red, her skin isn’t snow-white, her hair is ordinary, her cheeks aren’t roses, her breath isn’t perfume, her voice isn’t music, and she walks on the ground like anyone. The turn: and yet — the speaker’s love is as rare as any woman ever lied about with false comparisons. It’s a love poem against exaggeration: she’s real, and that’s the point.',
    recasts: {
      nam: `My girlfriend's eyes are nothing like the sun.\nCoral's way redder than her lips.\nSnow's white — her skin's just skin.\nHer hair? It's hair. Regular hair.\nI've seen roses, pink and deep red —\nher cheeks aren't roses, sorry.\nAnd some perfumes honestly smell better\nthan her breath does some mornings.\nI love hearing her talk — but let's be real,\nmusic sounds better.\nNever seen a goddess walk, myself;\nshe walks on the ground like the rest of us.\nAnd still — I swear she's as rare\nas any woman anyone ever lied a poem about.`,
      ssbe: `My girlfriend's eyes are nothing like the sun.\nCoral's miles redder than her mouth.\nIf snow's white, well — her skin's more of a normal colour.\nHer hair's just hair, isn't it.\nI've seen proper roses, pink and red —\nnothing like that going on in her cheeks.\nAnd some perfumes, honestly, are nicer\nthan her breath first thing.\nI love listening to her — still,\nmusic's got the edge, hasn't it.\nCan't say I've ever seen a goddess about;\nshe walks on the pavement like everyone else.\nAnd yet — I swear she's as rare\nas any woman ever flattered with rubbish comparisons.`,
      aus: `My girlfriend's eyes are nothing like the sun.\nCoral's heaps redder than her lips.\nSnow's white; her skin's just... skin.\nHer hair's ordinary hair, no drama.\nI've seen proper roses, pink and red —\nher cheeks aren't in that race.\nAnd fair warning, some perfumes smell better\nthan her breath of a morning.\nI love hearing her talk — but straight up,\nmusic's nicer on the ear.\nNever seen a goddess cruise past, myself;\nshe walks on the footpath like the rest of us.\nAnd still — I swear she's as rare\nas any woman ever dressed up in dodgy comparisons.`,
    },
  },
};
