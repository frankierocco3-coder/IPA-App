// Dialect in Action — the course's words and expressions inside believable
// speech: short exchanges and monologues with a real speaker, situation
// and register, never a slang parade.
//
// ── Entry shape ───────────────────────────────────────────────
//   id                 stable slug, never reused
//   courseId           'nam' | 'rp' | 'ssbe' | 'aus'
//   title              learner-facing name
//   type               'dialogue' | 'monologue'
//   setting            where/when this is spoken
//   speakerDescription who is speaking (believable age range, background)
//   register           formality label shown to the learner
//   situation          what is happening and what the speaker(s) want —
//                      the piece's situation and objective in one line
//   region             where this speech would be at home
//   lines              [{ speaker, text }] — speaker null for monologues.
//                      [[term|ID]] marks a Words & Expressions occurrence;
//                      the renderer highlights it and opens that entry.
//   expressionRefs     every W&E id used, for validation and listing
//   ipa                optional full-piece IPA (null until authored)
//   audio              exact-dialect recording base, or null. NEVER another
//                      dialect's audio, never a device voice: no approved
//                      file for this course = no play control at all.
//   reviewStatus       'draft' | 'approved' — drafts render ONLY in the
//                      owner review gate (#review), never in the Library.
//                      'approved' requires BOTH reviews below approved.
//   review             { literary: { status, reviewer, date },
//                        dialect:  { status, reviewer, date } } — each
//                      status 'pending' | 'approved'; reviewer is a
//                      human's name, never Claude (Claude cannot approve
//                      its own dialect or literary writing).
//   reviewNotes        provenance + what review still has to check
//
// All pieces are ORIGINAL Speechcraft writing. Every draft below awaits a
// native-speaker read for dialect and register accuracy — being here does
// not mean reviewed.

export const DIALECT_ACTION = [

  // ── Neutral American ────────────────────────────────────────
  {
    id: 'nam-exchange-plans',
    courseId: 'nam',
    title: 'Changing Plans',
    type: 'dialogue',
    setting: 'A phone call on a Friday afternoon',
    speakerDescription: 'Two friends in their late twenties, city apartment dwellers',
    register: 'Casual — friends who talk every week',
    situation: 'Dana has to cancel tonight’s plans at the last minute and wants to keep the friendship easy; Marcus wants her to feel the cost before letting her off the hook.',
    region: 'Broadly urban U.S., deliberately unmarked',
    lines: [
      { speaker: 'Dana', text: 'Hey — so, don’t hate me, but I have to [[bail on|NAM-038]] tonight.' },
      { speaker: 'Marcus', text: 'Again? You are such a [[flake|NAM-040]].' },
      { speaker: 'Dana', text: 'I know, I know. [[My bad|NAM-042]]. Work blew up and my [[ride|NAM-044]] fell through.' },
      { speaker: 'Marcus', text: 'You could take the train like a normal person.' },
      { speaker: 'Dana', text: 'At eleven at night? That station is [[sketchy|NAM-039]] and you know it.' },
      { speaker: 'Marcus', text: 'Fair. Honestly I’m pretty [[bummed|NAM-046]] — I was looking forward to it.' },
      { speaker: 'Dana', text: 'Next weekend, I promise. [[Hit me up|NAM-043]] Saturday morning and we’ll figure it out.' },
      { speaker: 'Marcus', text: 'Fine. But you’re buying breakfast.' },
    ],
    expressionRefs: ['NAM-038', 'NAM-040', 'NAM-042', 'NAM-044', 'NAM-039', 'NAM-046', 'NAM-043'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft. Review for natural rhythm and register; confirm no expression feels forced.',
  },
  {
    id: 'nam-mono-roadtrip',
    courseId: 'nam',
    title: 'The Road Trip That Wasn’t',
    type: 'monologue',
    setting: 'Telling a story to coworkers in a break room',
    speakerDescription: 'A speaker in their early thirties, any background — an ordinary storyteller',
    register: 'Casual narrative — animated but not performing',
    situation: 'The speaker wants the room to relive the disaster as fondly as they do — turning a failed trip into a badge of honor.',
    region: 'Broadly urban U.S., deliberately unmarked',
    lines: [
      { speaker: null, text: 'So we had this whole camping trip planned, right? Months of planning. And the morning we leave, Jesse texts me that his car won’t start. No warning. So now I’m everyone’s [[ride|NAM-044]], which — fine, whatever.' },
      { speaker: null, text: 'Except the GPS takes us down this completely [[bogus|NAM-045]] back road, forty minutes of gravel, and we end up at a motel that was, no exaggeration, the single most [[sketchy|NAM-039]] building I have ever paid money to sleep in. The sign was hand-painted. Part of the sign was crossed out.' },
      { speaker: null, text: 'And here’s the thing — I’d been so [[stoked|NAM-047]] about this trip. I told everyone at work. So I refused to [[bail|NAM-038]]. We stayed. We roasted marshmallows over a camp stove in the parking lot, we told stories, and around midnight we just [[crashed|NAM-050]], all four of us, in one room.' },
      { speaker: null, text: 'Best terrible trip of my life. Ask me literally anything about it.' },
    ],
    expressionRefs: ['NAM-044', 'NAM-045', 'NAM-039', 'NAM-047', 'NAM-038', 'NAM-050'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft, ~140 words (~60s spoken). Check pacing and that the expressions read as natural speech.',
  },

  // ── Traditional RP ──────────────────────────────────────────
  {
    id: 'rp-exchange-garden',
    courseId: 'rp',
    title: 'The Garden Party Question',
    type: 'dialogue',
    setting: 'A sitting room, mid-twentieth century, before a family occasion',
    speakerDescription: 'An aunt in her sixties and her adult nephew — comfortable upper-middle household',
    register: 'Polished conversational — warm but correct',
    situation: 'Aunt Margaret wants Edward committed to the family occasion on her terms; Edward wants to yield gracefully without appearing managed.',
    region: 'Southern England, period prestige register',
    lines: [
      { speaker: 'Aunt Margaret', text: 'Edward, you will be joining us on Saturday? Your uncle has been [[frightfully|RP-038]] keen to see you.' },
      { speaker: 'Edward', text: 'I shall try, Aunt. Though I confess the trains have been [[awfully|RP-039]] unreliable of late.' },
      { speaker: 'Aunt Margaret', text: 'Then you must simply come up on Friday evening and stay the night.' },
      { speaker: 'Edward', text: 'I shouldn’t wish to put you to any trouble.' },
      { speaker: 'Aunt Margaret', text: 'Trouble? Nonsense. Arriving halfway through the afternoon, however — [[it simply isn’t done|RP-041]].' },
      { speaker: 'Edward', text: '[[Quite so|RP-040]]. Friday evening, then. I shall bring the good marmalade as a peace offering.' },
      { speaker: 'Aunt Margaret', text: 'That would be most acceptable. [[Cheerio|RP-025]], dear — do give my love to your mother.' },
    ],
    expressionRefs: ['RP-038', 'RP-039', 'RP-041', 'RP-040', 'RP-025'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft. Review for period accuracy and warmth — must not tip into butler parody.',
  },
  {
    id: 'rp-mono-schooldays',
    courseId: 'rp',
    title: 'The Tuck Shop Ledger',
    type: 'monologue',
    setting: 'An after-dinner reminiscence among old friends',
    speakerDescription: 'A retired schoolmaster, seventies, fond rather than pompous',
    register: 'Measured, anecdotal, gently self-mocking',
    situation: 'The speaker wants his listeners to feel the seriousness a child attaches to small institutions — and to laugh at him only as much as he laughs at himself.',
    region: 'Southern England, period prestige register',
    lines: [
      { speaker: null, text: 'When I was a boy at school, the great institution — the true centre of civic life — was not the chapel, nor the cricket pitch. It was the [[tuck shop|RP-036]].' },
      { speaker: null, text: 'One did one’s [[prep|RP-035]] with half a mind, always, on whether the barley sugar would run out before Wednesday. And there was a ledger — a genuine ledger — in which every boy’s credit was recorded in the proprietor’s tremendous copperplate hand. To appear in that ledger in red ink was social ruin.' },
      { speaker: null, text: 'Boys would [[whinge|RP-051]], naturally, that the prices were scandalous, and we were all quite [[knackered|RP-044]] by term’s end from rationing our shillings. But I learnt more about credit, patience and reputation from that little shop than from any master in the place.' },
      { speaker: null, text: 'I still cannot pass a sweet shop without checking, instinctively, whether my name is in the book.' },
    ],
    expressionRefs: ['RP-036', 'RP-035', 'RP-051', 'RP-044'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft, ~150 words. Review period vocabulary and cadence; "knackered" register check for this speaker.',
  },

  // ── Standard British ────────────────────────────────────────
  {
    id: 'ssbe-exchange-pub',
    courseId: 'ssbe',
    title: 'After the Shift',
    type: 'dialogue',
    setting: 'A pub near the office, Thursday evening',
    speakerDescription: 'Two colleagues in their late twenties, present-day Britain',
    register: 'Relaxed workplace-friends register',
    situation: 'Priya wants to put a stressful week down for good; Tom wants to mark her win and steer the evening toward celebration.',
    region: 'Contemporary southern Britain',
    lines: [
      { speaker: 'Priya', text: 'Right, that’s me done. I am absolutely [[knackered|SSBE-006]].' },
      { speaker: 'Tom', text: 'Same. Long week. Did the Henderson thing get [[sorted|SSBE-005]] in the end?' },
      { speaker: 'Priya', text: 'It did, actually — signed off this afternoon. I’m [[proper|SSBE-004]] relieved.' },
      { speaker: 'Tom', text: 'You should be [[chuffed|SSBE-009]], that one’s been hanging over you for weeks.' },
      { speaker: 'Priya', text: 'Honestly? I was [[gutted|SSBE-008]] when they nearly pulled it on Tuesday. Didn’t sleep.' },
      { speaker: 'Tom', text: 'Well, it’s done now. First round’s on me.' },
      { speaker: 'Priya', text: '[[Cheers|SSBE-003]], [[mate|SSBE-002]]. Next one’s mine.' },
    ],
    expressionRefs: ['SSBE-006', 'SSBE-005', 'SSBE-004', 'SSBE-009', 'SSBE-008', 'SSBE-003', 'SSBE-002'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft. Review that the register sits naturally between colleagues, not forced matey-ness.',
  },
  {
    id: 'ssbe-mono-flat',
    courseId: 'ssbe',
    title: 'Moving Day',
    type: 'monologue',
    setting: 'Recounting the week to a friend over coffee',
    speakerDescription: 'A renter in their mid-twenties, first flat without housemates',
    register: 'Conversational, wry, present-day',
    situation: 'The speaker wants their friend to understand the move was worth every disaster — and is quietly talking themselves into believing it too.',
    region: 'Contemporary southern Britain',
    lines: [
      { speaker: null, text: 'So I finally moved out on Saturday. Own flat. Tiny — genuinely, the oven door touches the opposite wall when it’s open — but mine.' },
      { speaker: null, text: 'The move itself was a nightmare. The van company I booked turned out to be properly [[dodgy|SSBE-018]] — the driver turned up two hours late with a van half the size I’d paid for. And I was already [[skint|SSBE-014]] from the deposit, so hiring a second one wasn’t happening.' },
      { speaker: null, text: 'In the end my sister drove up and we did four trips in her tiny hatchback with the back seats down. Took all day. We were both completely [[shattered|SSBE-007]] by the end of it.' },
      { speaker: null, text: 'But Sunday morning I made a cup of tea in my own kitchen, in the quiet, no one else’s washing up in the sink — and honestly? [[Buzzing|SSBE-010]]. Best cup of tea of my life.' },
    ],
    expressionRefs: ['SSBE-018', 'SSBE-014', 'SSBE-007', 'SSBE-010'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft, ~150 words. Review for contemporary register; expressions should feel incidental.',
  },

  // ── Australian ──────────────────────────────────────────────
  {
    id: 'aus-exchange-fence',
    courseId: 'aus',
    title: 'Over the Fence',
    type: 'dialogue',
    setting: 'Adjacent front yards, Saturday late morning',
    speakerDescription: 'Two neighbours, forties and sixties, friendly but not close',
    register: 'Easy suburban neighbourliness',
    situation: 'Ray wants to turn a nodding acquaintance into a proper invitation; Col wants to accept without making it a bigger deal than it is.',
    region: 'General Australian, suburban',
    lines: [
      { speaker: 'Col', text: 'Morning! Big plans for the [[arvo|AUS-001]]?' },
      { speaker: 'Ray', text: 'Having a few people round for a [[barbie|AUS-002]], actually. Nothing flash.' },
      { speaker: 'Col', text: 'Very nice. Weather’s meant to hold, too.' },
      { speaker: 'Ray', text: 'That’s what they reckon. You and Helen should come over — plenty going spare.' },
      { speaker: 'Col', text: 'Yeah? [[Dead set|AUS-015]]?' },
      { speaker: 'Ray', text: '[[Fair dinkum|AUS-016]], [[mate|AUS-004]] — bring a chair and whatever you want in the [[esky|AUS-020]].' },
      { speaker: 'Col', text: 'Righto, you’re on. I’ll bring a [[coldie|AUS-011]] or two for the cause.' },
      { speaker: 'Ray', text: 'Good man. Come round about four.' },
    ],
    expressionRefs: ['AUS-001', 'AUS-002', 'AUS-015', 'AUS-016', 'AUS-004', 'AUS-020', 'AUS-011'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft. Review that it reads as ordinary neighbourly Australian, not tourist-brochure Strine.',
  },
  {
    id: 'aus-mono-camping',
    courseId: 'aus',
    title: 'The One About the Tent',
    type: 'monologue',
    setting: 'A story told at a family gathering',
    speakerDescription: 'A speaker in their fifties retelling a long-running family legend',
    register: 'Relaxed storytelling, self-deprecating',
    situation: 'The speaker wants the family legend told properly — owning the failure so completely that the story becomes theirs.',
    region: 'General Australian',
    lines: [
      { speaker: null, text: 'Every family’s got one story that gets dragged out at Christmas, and ours is the tent. Nineteen ninety-eight. We drive six hours to the coast, get there late in the [[arvo|AUS-001]], and I announce — very confidently — that I don’t need the instructions.' },
      { speaker: null, text: 'An hour later the thing looks less like a tent and more like modern art, my brother-in-law’s calling me a [[drongo|AUS-018]] from his fold-out chair — not helping, mind you, just commentating — and the kids have given up and started eating everything in the [[esky|AUS-020]].' },
      { speaker: null, text: 'Then it starts raining. [[Dead set|AUS-015]], the moment the last peg goes in. And I’d been feeling a bit [[crook|AUS-012]] all day, so I just stood there in the rain and started laughing. Couldn’t stop.' },
      { speaker: null, text: 'Twenty-five years on, nobody remembers the beach. Just the tent. And to be fair — that’s a better story anyway.' },
    ],
    expressionRefs: ['AUS-001', 'AUS-018', 'AUS-020', 'AUS-015', 'AUS-012'],
    ipa: null,
    audio: null,
    reviewStatus: 'draft',
    review: {
      literary: { status: 'pending', reviewer: null, date: null },
      dialect: { status: 'pending', reviewer: null, date: null },
    },
    reviewNotes: 'Original Speechcraft draft, ~160 words. Review Australian idiom placement and that "drongo" lands as affectionate.',
  },
];

// ── Kill switch (2026-08-17, owner decision) ──────────────────
// Dialect in Action is withdrawn from the learner-facing app "for now".
// NOTHING is deleted: the 8 written pieces, their review records and every
// renderer stay exactly as they are. Flip this to true and the Library
// card, the Dialects-in-Speech facet and the Acting shortcut all return.
export const DIALECT_ACTION_LIVE = false;

// Learner-facing: ONLY approved pieces, for this course. Nothing here is
// ever borrowed from another accent. While nothing is approved the Library
// entry stays visible but reads "In review" and opens the pending page —
// an honest "written, not cleared yet", never a readable-looking shelf.
export const actionFor = courseId =>
  DIALECT_ACTION.filter(p => p.courseId === courseId && p.reviewStatus === 'approved');

// Owner review gate (#review): everything not yet approved.
export const actionDrafts = () =>
  DIALECT_ACTION.filter(p => p.reviewStatus !== 'approved');
