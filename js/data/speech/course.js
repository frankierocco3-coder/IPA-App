// The Speech course — written, progressive, interactive-only.
//
// BINDING RULES (owner order 2026-08-12, Speech system build):
//   - Written and interactive only: no audio, synthesis, recording,
//     microphone, playback controls, video or external AI anywhere in
//     this pathway.
//   - The two central practice statements are preserved EXACTLY and
//     lint-pinned:
//       "Practice one element at a time so you can recognize and
//        control it. Then carry that skill into thought, listening,
//        movement and response."
//       "Practice the parts. Communicate as a whole."
//   - "Automatic" / "automaticity" / "second nature" describe fluent
//     memory. NEVER "autonomic" — that word describes involuntary
//     body systems, not memory.
//   - The alphabet experiment carries NO personal attribution.
//   - Anatomy and vocal-health lessons (Stage 1) are DRAFTS requiring
//     review by an appropriately qualified voice professional or
//     speech-language pathologist before any learner sees their
//     bodies. Titles may appear in the outline with an honest
//     awaiting-review state.
//   - No lesson prescribes treatment, diagnoses, teaches one
//     universal "correct posture"/"proper support"/tongue position,
//     tells users to press or massage their throats, or claims the
//     tongue supplies airflow.
//   - Safety line (verbatim, reused wherever exertion appears):
//       "Stop if you experience pain, burning, dizziness or
//        increasing strain. Persistent hoarseness or vocal difficulty
//        should be evaluated by a qualified professional."
//
// Every record carries governance fields; see docs/SPEECH_REVIEW.md
// and js/data/speech/reviews.js. Claude never approves its own drafts.

export const PRACTICE_PRINCIPLE_LONG =
  'Practice one element at a time so you can recognize and control it. Then carry that skill into thought, listening, movement and response.';
export const PRACTICE_PRINCIPLE_SHORT =
  'Practice the parts. Communicate as a whole.';

export const SPEECH_SAFETY_LINE =
  'Stop if you experience pain, burning, dizziness or increasing strain. Persistent hoarseness or vocal difficulty should be evaluated by a qualified professional.';

// Movement/comfort framing reused by physical explorations (Phase 13).
export const SPEECH_COMFORT_LINE =
  'Do this seated or standing, whichever suits you. Every step is optional — adapt or skip anything that isn’t comfortable, and breathe through your mouth, your nose or both, however you breathe best.';

// Internal stage ids order the Learn pathway. The LIBRARY presents the
// same records as four named collections (2026-08-13 IA order) — never
// labelled "Stage 1/2/3" there. One set of records, two arrangements.
export const SPEECH_STAGES = [
  { id: 'start', title: 'Start Here', blurb: 'How this course works — and why parts-then-whole practice is the fastest honest route.' },
  { id: 'foundation', title: 'The Speaking Instrument', blurb: 'Body, breath, effort, voice, articulation — and knowing when to stop.' },
  { id: 'meaning', title: 'Shaping Meaning', blurb: 'Pace, pause, emphasis, intention, urgency — choices, not rules.' },
  { id: 'whole', title: 'The Whole Speaker', blurb: 'Putting it back together while you think, listen, move and respond.' },
];

// COURSE MODULES (Learn). The same records the Library shelves — two
// arrangements of one authoritative source, never two copies. Modules
// are numbered 1–4 and lessons inside them 1.1…4.4, with no gaps.
export const SPEECH_MODULES = [
  { n: 1, stage: 'start', title: 'Speechcraft Principles',
    blurb: 'Why this course practises parts before wholes — and what fluency buys you.' },
  { n: 2, stage: 'foundation', title: 'Your Speaking Instrument',
    blurb: 'Body, breath, effort, voice, articulation — and knowing when to stop.' },
  { n: 3, stage: 'meaning', title: 'What & Why?',
    blurb: 'Pace, pause, emphasis, intention, urgency — choices, not rules.' },
  { n: 4, stage: 'whole', title: 'Mix It',
    blurb: 'Putting it back together while you think, listen, move and respond.' },
];

// DISPLAY-ORDER METADATA (2026-08-13). Purely presentational: the
// authoritative `order` field and every lesson id stay exactly as they
// are, so saved completion records keep resolving. Learn groups the
// same records for scanning; the Library keeps the canonical order.
export const SPEECH_MODULE_GROUPS = {
  1: [
    { title: 'How the course works',
      blurb: 'Why this course practises one element at a time.',
      lessons: ['wsm', 'sp-start-parts'] },
    { title: 'Understanding fluency',
      blurb: 'What fluency buys you, and what it means for prepared speaking.',
      lessons: ['sp-start-alphabet', 'sp-start-fluency', 'sp-start-offbook'] },
  ],
  2: [
    { title: 'Air and voice',
      blurb: 'Where the sound comes from and how it is powered.',
      lessons: ['sp-f-instrument', 'sp-f-breath', 'sp-f-voice'] },
    { title: 'Ease and coordination',
      blurb: 'Useful effort, and the parts that do the most work.',
      lessons: ['sp-f-effort', 'sp-f-jaw'] },
    { title: 'Clarity and care',
      blurb: 'Being understood, and knowing when to stop.',
      lessons: ['sp-f-articulation', 'sp-f-health'] },
  ],
  3: [
    { title: 'Purpose and action',
      blurb: 'Decide what the words should do before shaping how they sound.',
      lessons: ['sp-m-intention', 'sp-m-want', 'sp-m-urgency'] },
    { title: 'Rhythm and structure',
      blurb: 'The delivery choices that carry a decided intention.',
      lessons: ['sp-m-pace', 'sp-m-emphasis'] },
  ],
  4: [
    { title: 'Body and attention',
      blurb: 'Speech inside a moving body, with attention pointed outward.',
      lessons: ['sp-w-movement', 'sp-w-presence'] },
    { title: 'Putting everything together',
      blurb: 'Letting the parts run while you think, listen and respond.',
      lessons: ['sp-w-integration', 'sp-w-applying'] },
  ],
};

export const speechModuleGroups = n => SPEECH_MODULE_GROUPS[n] ?? [];

export const moduleForLesson = l => SPEECH_MODULES.find(m => m.stage === l.stage) ?? null;

// "2.3" — module number and the lesson's position inside it. Derived,
// so the sequence can never develop gaps.
export function lessonNumber(l) {
  const m = moduleForLesson(l);
  if (!m) return '';
  const within = SPEECH_LESSONS.filter(x => x.stage === l.stage)
    .sort((a, b) => a.order - b.order).findIndex(x => x.id === l.id);
  return `${m.n}.${within + 1}`;
}

// Library collections (Speech workspace): the four browsable shelves.
export const SPEECH_COLLECTIONS = [
  { id: 'principles', stage: 'start', title: 'Speechcraft Principles', icon: '🧩' },
  { id: 'instrument', stage: 'foundation', title: 'Your Speaking Instrument', icon: '🫁' },
  { id: 'meaning', stage: 'meaning', title: 'Meaning, Intention & Urgency', icon: '🧭' },
  { id: 'presence', stage: 'whole', title: 'Presence & Integration', icon: '🎤' },
];

export const collectionForLesson = l =>
  SPEECH_COLLECTIONS.find(c => c.stage === l.stage) ?? null;

// Why each professional-tier lesson needs review — shown verbatim on
// the read-only review-status page.
export const SPEECH_REVIEW_WHY = {
  'sp-f-instrument': 'Describes respiratory, laryngeal and vocal-tract anatomy; a voice professional must confirm the description is accurate and appropriately general.',
  'sp-f-breath': 'Teaches breath-for-speech concepts; must be confirmed as physiologically accurate and free of one-size-fits-all “support” claims.',
  'sp-f-effort': 'Discusses muscular effort and tension in speaking; must be confirmed as accurate and non-diagnostic.',
  'sp-f-jaw': 'Mentions TMD and bruxism (paraphrased from NIDCR/ASHA guidance); a professional must confirm the health information is accurate, current and non-prescriptive.',
  'sp-f-voice': 'Describes vocal-fold function and resonance; must be confirmed as anatomically accurate at the intended level.',
  'sp-f-articulation': 'Describes articulator function; must be confirmed as accurate and consistent with the IPA course’s teaching.',
  'sp-f-health': 'Gives vocal-health guidance and when-to-seek-help signals (paraphrased from NIDCD/ASHA); a professional must confirm the guidance and thresholds are sound.',
};

// content shape:
//   { id, stage, order, title, kind: 'lesson',
//     application: { general: bool, acting: bool },
//     glossary: [termIds],
//     body: [ {h?, p?, list?, tabs?, experiment?, safety?, comfort?} ... ],
//     sources: [strings], requiredReviewer, // see reviews.js for status
//   }
// Body items render through inert text APIs only — strings here are
// trusted repo-authored copy, but the renderer still escapes them.

export const SPEECH_LESSONS = [

  // ── Part I · Speechcraft Principles ───────────────────────────
  {
    id: 'wsm', stage: 'start', order: 0,
    title: 'The Importance of Speech',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['rhetoric', 'presence'],
    requiredReviewer: 'editorial',
    body: [
      { quote: 'The beginning is the most important part of the work, especially in the case of a young and tender thing.',
        attribution: '— Plato, Republic 377a–b, translated by Benjamin Jowett' },
      { p: 'How you speak shapes how people understand you, how far they trust you, what they remember of you, and how they respond to you. Speech is not decoration. It is action.' },
      { p: 'Speechcraft is for anyone who wants to understand, strengthen or expand the way they speak — including anyone who wants to:' },
      { list: [
        'speak with greater clarity',
        'speak more confidently',
        'command attention without merely becoming louder',
        'organize and express thoughts effectively',
        'understand rhetoric and persuasion',
        'explore different kinds of speakers and speaking situations',
        'develop a more intentional personal voice',
        'modify or neutralize aspects of an accent — adding choice and flexibility, never “correcting” an inferior way of speaking',
        'learn another English accent',
        'prepare a speech, scene, monologue or presentation',
        'investigate how language creates action',
      ] },
      { p: 'No app can erase who you are, guarantee confidence, or hand you the one “correct” accent — no such accent exists. What deliberate training can do is give you more choices, and more command of the choices you already make.' },
      { h: 'Speech Is Action' },
      { p: 'Speaking is something we do to another person. A speaker may set out to persuade, reassure, challenge, inspire, inform, confront, entertain, comfort, negotiate, command, question, reveal, conceal — or simply connect.' },
      { p: 'The same words can land completely differently depending on intention, relationship, timing, rhythm, emphasis and delivery. That is as true in everyday conversation, teaching, leadership and interviews as it is in public speaking, presentations, advocacy, rhetoric, performance — and the difficult personal conversations that matter most.' },
      { p: 'Powerful speech can clarify and connect. It can also pressure, mislead or manipulate. Developing your speech includes taking responsibility for its effect.' },
      { h: 'Speech Reveals Thought' },
      { p: 'Speech reveals thought. It reveals what we understand and what remains uncertain, how our ideas are organized, what we value, what we avoid, how we see the person in front of us — and how clearly we have examined our own position.' },
      { p: 'Strengthening speech is therefore never just polishing pronunciation. It can mean strengthening attention, listening, intention, vocabulary, structure, reasoning — the whole relationship between thought and expression.' },
      { p: 'The IPA, rhetoric, accent study, text analysis and deliberate practice are different tools within that one larger craft. Speechcraft teaches them together.' },
    ],
  },

  {
    id: 'sp-start-parts', stage: 'start', order: 1,
    title: 'Practice the Parts. Communicate as a Whole.',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Speaking well involves many elements at once: breath, voice, articulation, pace, emphasis, intention, listening, movement. Trying to improve all of them at the same time usually improves none of them — there is too much to attend to at once.' },
      { p: PRACTICE_PRINCIPLE_LONG },
      { p: 'That is the whole method of this course. Isolate one element until you can recognize it and control it. Then put it back inside real speaking — where your attention belongs to what you are saying and to the person you are saying it to.' },
      { p: PRACTICE_PRINCIPLE_SHORT },
      { h: 'What this looks like in practice' },
      { list: [
        'A pianist drills the left hand alone, then plays the piece.',
        'A tennis player isolates the toss, then serves.',
        'A speaker explores pause placement in one sentence, then gives the toast.',
      ] },
      { p: 'The isolation is never the goal. The conversation, the presentation, the scene — the whole — is the goal. Isolation is just the fastest honest way to build a part strong enough to survive inside the whole.' },
    ],
  },
  {
    id: 'sp-start-fluency', stage: 'start', order: 2,
    title: 'Fluency Frees the Speaker',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'When something you know becomes fluent — automatic, second nature — it stops consuming your attention. You do not sound out familiar words letter by letter; reading them is automatic, which frees you to think about what the sentence means.' },
      { p: 'Speech works the same way. Whatever is not yet fluent — the next word, the structure of the argument, the name you keep forgetting — pulls attention away from thinking, listening and responding. Whatever is fluent gives that attention back.' },
      { p: 'Psychologists call this automaticity: with enough of the right practice, a skill runs with little conscious effort. (This is a property of practiced memory and skill — a different thing entirely from the body systems that run on their own, like digestion.)' },
      { p: 'This course keeps returning to that trade: spend effort in practice, where effort is cheap, so that effort is not demanded from you in the moment of speaking, where attention is precious.' },
    ],
  },
  {
    id: 'sp-start-alphabet', stage: 'start', order: 3,
    title: 'The Alphabet Experiment',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Here is a two-minute experiment you can run on yourself. It needs no preparation — just the alphabet you have known since childhood.' },
      { experiment: {
          // Rendered as an interactive, self-paced sequence. No scoring,
          // no timing, no recording — self-observation only. No personal
          // attribution anywhere (binding).
          steps: [
            'Without reciting the alphabet first, name the 3rd letter.',
            'Now the 13th letter.',
            'Now the 14th.',
            'Now the 16th.',
            'Now the 23rd.',
          ],
          noticing: 'What did you notice while you searched? Where did your attention go? What happened to your breath? Did anything in your body work harder than it needed to? People notice different things here — there is no sensation you are supposed to have.',
          then: 'Now recite the alphabet straight through, as you normally would.',
          compare: 'Compare the two experiences. The letters were identical — the same 26 items, in the same memory. What changed was the kind of retrieval: effortful search versus fluent sequence. Fluent recall left your attention free; effortful search spent it.',
        } },
      { p: 'Everything in this course aims at that difference. Whatever you will need while speaking — words, structure, technique — serves you best when it is fluent enough that you are not searching for it.' },
    ],
  },
  {
    id: 'sp-start-offbook', stage: 'start', order: 4,
    title: 'General Fluency and Prepared Speaking',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity'],
    requiredReviewer: 'editorial',
    body: [
      { h: 'General prepared speaking' },
      { p: 'For a presentation, a toast, an interview or a difficult conversation, fluency may mean internalizing ideas, structure, transitions and essential language rather than memorizing every word. You secure the skeleton — the order of thoughts, the key sentences, the phrases that must land exactly — and speak the rest freshly each time.' },
      { h: 'When the words are fixed' },
      { p: 'Some speaking has fixed words — a legal statement, a liturgy, a script. There, fluency means the exact language, secure enough that you are not searching for the next word. Actors carry the strongest version of this obligation; the Acting workspace teaches it as Being Off Book.' },
      { p: 'The two kinds of preparation are different jobs. Confusing them causes trouble in both directions: memorizing a conversation word-for-word makes it brittle; paraphrasing a fixed text breaks it.' },
    ],
  },
  // ── Stage 1 · Foundation ──────────────────────────────────────
  // ALL Stage 1 bodies are DRAFTS behind professional review (voice
  // professional / SLP). Learner surfaces show the outline with an
  // honest awaiting-review state until approval lands in reviews.js.
  {
    id: 'sp-f-instrument', stage: 'foundation', order: 1,
    title: 'The Speaking Instrument',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['resonance', 'articulation'],
    requiredReviewer: 'voice-professional',
    sources: [
      'NIDCD — Voice, Speech, and Language — https://www.nidcd.nih.gov/health/speech-and-language',
      'ASHA — Voice Disorders — https://www.asha.org/practice-portal/clinical-topics/voice-disorders/',
      'ASHA — Resonance Disorders — https://www.asha.org/practice-portal/clinical-topics/resonance-disorders/',
    ],
    body: [
      { p: 'Speech begins with airflow from the respiratory system. In voiced speech, that airflow helps set the vocal folds in the larynx vibrating. The vocal tract and articulators then shape airflow and sound into recognizable speech.' },
      { list: [
        'The respiratory system supplies and regulates airflow for speech through the coordinated action of the diaphragm, rib cage and other breathing muscles.',
        'The larynx houses the vocal folds, which vibrate during voiced sound.',
        'The vocal tract—the pharynx, mouth and nasal cavity—filters the source sound, strengthening some frequencies and reducing others.',
        'The jaw, tongue, lips and soft palate coordinate to form consonants and vowels.',
      ] },
      { p: 'Speechcraft’s Your Instrument reference shows these structures with diagrams. This chapter is a working tour of what each area contributes and where later chapters explore it in greater detail.' },
      { p: 'Speaking requires coordinated muscular activity. The aim is adaptable effort suited to the task and the individual speaker, without unnecessary strain—not complete relaxation.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-breath', stage: 'foundation', order: 2,
    title: 'Body & Breath',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: [],
    requiredReviewer: 'voice-professional',
    sources: [
      'ASHA — Voice Disorders — https://www.asha.org/practice-portal/clinical-topics/voice-disorders/',
      'NIDCD — Taking Care of Your Voice — https://www.nidcd.nih.gov/health/taking-care-your-voice',
    ],
    body: [
      { p: 'Airflow for speech comes from the respiratory system. The diaphragm and other breathing muscles change the size and pressure of the chest cavity, moving air into and out of the lungs. Most speech happens during exhalation, coordinated with voicing and the length and shape of the phrase.' },
      { p: 'Bodies differ, and so do the sensations people report when breathing works well. This course does not teach one universal “proper support” feeling. It offers explorations and asks you to notice what changes.' },
      { comfort: true },
      { p: 'As a starting observation, notice what your breathing does before a long thought and before a short one. Do not try to manufacture a particular kind of breath. Simply notice when you inhale, whether you hold the breath and whether the phrase feels comfortably supplied. Different speakers will notice different patterns.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-effort', stage: 'foundation', order: 3,
    title: 'Effort & Tension',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: [],
    requiredReviewer: 'voice-professional',
    sources: [
      'ASHA — Voice Disorders — https://www.asha.org/practice-portal/clinical-topics/voice-disorders/',
      'NIDCD — Taking Care of Your Voice — https://www.nidcd.nih.gov/health/taking-care-your-voice',
    ],
    body: [
      { p: 'All speech requires coordinated muscular activity, but it does not need to feel strained. The useful question is whether the activity supports the sound or adds work the speaker does not need.' },
      { p: 'Some muscular activity produces the intended sound; other activity may interfere with comfortable, flexible speech. Stress, environmental demands and individual habits may sometimes coincide with breath holding, jaw clenching or increased effort around the neck and throat. These experiences have many possible causes and should not be self-diagnosed from sensation alone.' },
      { p: 'The practice routines ask you to notice sensations of effort without diagnosing their cause or trying to force them away. This course never asks you to press, massage or manipulate your throat.' },
      { p: 'If speaking regularly feels unusually effortful, painful or tiring, consult a qualified healthcare professional. An otolaryngologist can evaluate possible medical causes, and a speech-language pathologist with voice expertise can assess how the voice is being used.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-jaw', stage: 'foundation', order: 4,
    title: 'Jaw, Tongue & Neck',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['articulation'],
    requiredReviewer: 'voice-professional',
    sources: [
      'NIDCR — TMD — https://www.nidcr.nih.gov/health-info/tmd',
      'NIDCR — Bruxism — https://www.nidcr.nih.gov/health-info/bruxism',
      'ASHA — Orofacial Myofunctional Disorders — https://www.asha.org/practice-portal/clinical-topics/orofacial-myofunctional-disorders/',
    ],
    body: [
      { p: 'The jaw, tongue and neck participate in the detailed coordination of speech. During connected speech, the tongue continually changes its shape and position to form and connect different sounds. There is no single “correct tongue position” for speaking, and this course will never teach one.' },
      { p: 'The tongue shapes sound; it does not supply airflow. Airflow comes from the respiratory system. Pushing harder with the mouth does not create more air. If phrases repeatedly feel short of air, notice the coordination of breathing and phrasing; persistent difficulty deserves professional evaluation.' },
      { h: 'When the area itself needs care' },
      { p: 'Bruxism may contribute to tooth damage, jaw soreness or fatigue. Temporomandibular disorders may involve jaw pain, stiffness, limited movement, locking or painful clicking. Clicking without pain is common and does not by itself indicate a disorder.' },
      { p: 'If you have persistent jaw pain, locking, limited movement, tooth damage or concerns about frequent grinding or clenching, consult a dentist or physician. Speech or tongue-movement concerns may also warrant assessment by a speech-language pathologist. Speechcraft teaches speaking skills; it does not diagnose or treat these conditions.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-voice', stage: 'foundation', order: 5,
    title: 'Voice & Resonance',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['resonance'],
    requiredReviewer: 'voice-professional',
    sources: [
      'NIDCD — Taking Care of Your Voice — https://www.nidcd.nih.gov/health/taking-care-your-voice',
      'ASHA — Resonance Disorders — https://www.asha.org/practice-portal/clinical-topics/resonance-disorders/',
    ],
    body: [
      { p: 'Voiced sound begins when airflow from the lungs helps set the vocal folds in the larynx vibrating. The resulting sound contains many frequencies. The voice we hear reflects both this vocal-fold source and the way the vocal tract filters it.' },
      { p: 'Resonance is the modification of that source sound by the vocal tract. The size and shape of the pharynx, mouth and—when acoustically connected—nasal cavity strengthen some frequencies and reduce others.' },
      { p: 'Changes in jaw opening, tongue shape and lip position alter the vocal tract and therefore the resulting sound. These changes can affect the voice without deliberately pushing more air.' },
      { p: 'Every voice reflects an individual body, history and way of speaking. Speechcraft’s training goal is to help you explore range and choice within your own voice—not imitate a single ideal sound.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-articulation', stage: 'foundation', order: 6,
    title: 'Articulation & Clarity',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['articulation', 'operative-word'],
    requiredReviewer: 'voice-professional',
    sources: [
      'ASHA — Dysarthria in Adults — https://www.asha.org/practice-portal/clinical-topics/dysarthria-in-adults/',
      'ASHA — Speech Sound Disorders: Articulation and Phonology — https://www.asha.org/practice-portal/clinical-topics/articulation-and-phonology/',
      'ASHA — Accent Modification — https://www.asha.org/practice-portal/professional-issues/accent-modification/',
    ],
    body: [
      { p: 'Articulation is the coordinated movement and placement of structures such as the tongue, lips, jaw and soft palate to produce speech sounds. Some sounds use vocal-fold vibration and others do not.' },
      { p: 'Articulatory precision can contribute to clarity, but clarity also depends on pace, phrasing, loudness, context, the environment and the needs of the listener. Increasing volume alone does not guarantee understanding. Depending on the situation, a speaker may benefit from adjusting articulation, pace, phrasing, distance or amplification.' },
      { p: 'If you have worked in Speechcraft’s IPA courses, you have already studied how speech sounds are identified, described and contrasted. This chapter connects that knowledge to connected speech.' },
      { p: 'No accent or natural speech pattern is inherently unclear or inferior. The goal is not maximum articulation or the removal of identity. It is having options when a particular listener, space or speaking task calls for greater precision.' },
      { p: 'Increasing articulatory precision can help in some situations, but excessive precision may sound unnatural or distract from the message in others. The useful degree depends on the speaker, listener and context.' },
      { safety: true },
    ],
  },
  {
    id: 'sp-f-health', stage: 'foundation', order: 7,
    title: 'Vocal Health and When to Stop',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: [],
    requiredReviewer: 'voice-professional',
    sources: [
      'NIDCD — “Taking Care of Your Voice” (vocal health guidance, paraphrased)',
      'ASHA Practice Portal — Voice Disorders (signs that warrant evaluation, paraphrased)',
    ],
    body: [
      { p: 'Voices are resilient, and they have limits. Extended loud use, shouting over noise, smoking or vaping, dehydration and speaking through illness all ask more of the vocal folds than they are built to give indefinitely. Stress can add its own load — jaw clenching and effortful speech often travel with it.' },
      { p: 'General care that voice-health organizations consistently recommend: hydration, vocal rest after heavy use, amplification instead of shouting where possible, and attention to how your voice feels after work.' },
      { p: 'Know the signals that deserve professional evaluation rather than more practice: hoarseness that persists beyond a couple of weeks, pain with speaking, a voice that tires dramatically faster than it used to, or losing notes you used to have. None of these is a diagnosis — they are reasons to see a qualified professional, such as an otolaryngologist or a speech-language pathologist.' },
      { p: 'Every practice routine in this course assumes one rule outranks the routine:' },
      { safety: true },
    ],
  },

  // ── Stage 2 · Shaping Meaning ─────────────────────────────────
  {
    id: 'sp-m-pace', stage: 'meaning', order: 1,
    title: 'Pace & Pause',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['beat', 'urgency'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'There is no universally correct pace, pause, emphasis or phrasing. These choices depend on who is speaking, what they want, who they are addressing and the circumstances surrounding the communication.' },
      { p: 'Pace is how quickly thoughts arrive; pauses are where thinking, landing and listening happen. A pause can hand the listener time to catch up, mark the edge of a thought, apply pressure, or simply be the moment you find the next idea. The same pause reads differently in different circumstances — which is why no list of “pause rules” survives contact with real speaking.' },
      { p: 'What CAN be trained: control. Being able to place a pause where you choose, hold it as long as you choose, and change tempo without losing the thought. The Practice section trains exactly that, one variable at a time — then puts it back into whole speech.' },
    ],
  },
  {
    id: 'sp-m-emphasis', stage: 'meaning', order: 2,
    title: 'Emphasis & Phrasing',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['operative-word'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'In any sentence, some words carry the thought and others carry the grammar. The operative word is the one the thought turns on — and changing it changes the thought: “I never said she took it” means seven different things depending on which word does the work.' },
      { p: 'Phrasing is grouping: which words travel together as one unit of thought. Group them one way and the idea is plain; group them another way and a different idea appears, or none at all.' },
      { p: 'Neither emphasis nor phrasing has a single correct answer, because both express what the SPEAKER means, and speakers mean different things with the same words. The Arcade game “Change the Word, Change the Thought” lets you feel this directly.' },
    ],
  },
  {
    id: 'sp-m-intention', stage: 'meaning', order: 3,
    title: 'Thought & Intention',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['objective', 'action'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Delivery choices — pace, pause, emphasis, tone — are downstream of something simpler: what you are trying to DO to the person listening. Speech aimed at reassuring moves differently from speech aimed at warning, even with identical words.' },
      { p: 'This is why this course never teaches delivery as decoration. Decide what you want your words to do, and many delivery choices start making themselves. Fail to decide, and no amount of technique will make the speech land anywhere in particular.' },
      { p: 'The next two lessons make this concrete — first for everyday speaking, then for working on scripted text.' },
    ],
  },
  {
    id: 'sp-m-want', stage: 'meaning', order: 4,
    title: 'What Do You Want?',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['objective', 'overall-objective', 'scene-objective', 'obstacle', 'action', 'tactic', 'beat', 'given-circumstances'],
    requiredReviewer: 'editorial',
    body: [
      { tabs: {
        everyday: {
          label: 'Everyday Speaking',
          items: [
            { h: 'Purpose', p: 'What is this communication for? Inform, persuade, repair, warn, celebrate, ask — name it in one sentence.' },
            { h: 'Audience', p: 'Who exactly is listening, and what do they already believe, know and feel about this?' },
            { h: 'Desired result', p: 'If this goes well, what does the listener DO afterward? “They understand” is weaker than “they approve the budget” or “they forgive me.”' },
            { h: 'Resistance', p: 'What stands between you and that result — doubt, competing interests, history, fatigue? Speaking that ignores resistance bounces off it.' },
            { h: 'Stakes', p: 'What happens if this communication fails? What becomes possible if it succeeds? Stakes calibrate how much this moment matters.' },
            { h: 'Why now', p: 'Why must this happen today, in this conversation, rather than someday? If there is no answer, the listener will feel that too.' },
          ],
        },
        acting: {
          label: 'Acting & Text',
          intro: 'The playwright supplies the dialogue. The actor’s behavior, timing and actions grow from the circumstances, the objective, the obstacles and the responses encountered while pursuing what the character wants. “Be angry” or “be sad” is not an objective — emotional states are weather, not destinations. An objective is something you are trying to get from the other person.',
          items: [
            { h: '1 · Given circumstances', p: 'The facts the text establishes: who, where, when, relationships, events already past, what each person knows.' },
            { h: '2 · Overall objective', p: 'What the character wants across the whole play — the long arc every scene serves.' },
            { h: '3 · Scene objective', p: 'What the character wants from the other person in THIS scene, now.' },
            { h: '4 · Obstacle', p: 'What resists — the other person, the situation, the character’s own conflict. No obstacle, no scene.' },
            { h: '5 · Playable action / tactic', p: 'What the character DOES to get what they want: to reassure, to confront, to draw out. (Speechcraft’s Playable Actions library lives in the Studio.)' },
            { h: '6 · Response', p: 'What actually comes back from the other person — which the actor must genuinely receive, not merely wait through.' },
            { h: '7 · Adjustment', p: 'What the character changes because of that response. Pursuit is a live negotiation, not a plan executed regardless.' },
            { h: '8 · Beat', p: 'A unit of the scene where one action or subject holds; a new beat begins where the thought, tactic or circumstance turns.' },
            { h: '9 · Outcome', p: 'What the character has won, lost or learned by scene’s end — the launch point of the next scene.' },
          ],
        },
      } },
    ],
  },
  {
    id: 'sp-m-urgency', stage: 'meaning', order: 5,
    title: 'Why Now? Understanding Urgency',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['urgency', 'given-circumstances', 'objective'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Urgency is the need to affect something now. It is not automatically speaking faster, louder or with greater visible emotion.' },
      { tabs: {
        everyday: {
          label: 'Everyday Speaking',
          intro: 'Real urgency comes from the situation: stakes, time pressure, consequences, resistance, new information, a disappearing opportunity. When the need is real, it may show up as:',
          items: [
            { h: 'Faster speech', p: 'when time itself is the pressure.' },
            { h: 'Deliberate slowness', p: 'when being misunderstood is the one unaffordable outcome.' },
            { h: 'Precision', p: 'choosing exactly the right word because approximately right will fail.' },
            { h: 'Repetition', p: 'refusing to let the key point slip past.' },
            { h: 'Stillness or silence', p: 'stopping everything until the listener actually engages.' },
            { h: 'Interruption', p: 'the cost of waiting has exceeded the cost of rudeness.' },
            { h: 'Greater focus on the listener', p: 'checking, reading, adjusting — because their response is the whole point.' },
            { h: 'A change of action', p: 'abandoning the approach that isn’t working, mid-sentence if necessary.' },
          ],
        },
        acting: {
          label: 'Acting & Text',
          intro: 'On text, urgency answers the question every scene must answer: why is this happening NOW — not yesterday, not after dinner? Look for it in the given circumstances: what has just happened, what is about to happen, what disappears if the character waits. A character out of time behaves differently from a character killing time, even on the same line — and “faster and louder” is only one of the many shapes that difference can take.',
          items: [],
        },
      } },
    ],
  },

  // ── Stage 3 · The Whole Speaker ───────────────────────────────
  {
    id: 'sp-w-movement', stage: 'whole', order: 1,
    title: 'Movement & Speech',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: [],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Speech happens in a body that is usually doing something else at the same time — walking to the whiteboard, setting down a glass, crossing to the window, holding someone’s eye. Isolated practice happens standing still; speaking mostly doesn’t.' },
      { comfort: true },
      { p: 'The training question is whether a skill survives motion. A pause you can hold while standing still but lose the moment you gesture is not yours yet. The Apply routines in Speech Practice add movement deliberately — walk and speak, handle an object and speak, change your distance from the listener and speak — always within what is comfortable for your body.' },
      { p: 'Movement is also meaning. Approaching, retreating, turning away, stopping: listeners read all of it as part of the message. There is no one correct way to move while speaking — but there is a difference between movement you chose and movement that leaked.' },
    ],
  },
  {
    id: 'sp-w-presence', stage: 'whole', order: 2,
    title: 'Presence & Persuasion',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['presence', 'rhetoric'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Presence is not a mystery and not a gift. Most of what audiences call presence is attention, pointed outward: a speaker fully engaged with the people in front of them, rather than with their own performance, reads as present.' },
      { p: 'Everything this course isolates — breath that doesn’t need managing, words that don’t need searching for, pace that responds to the listener — buys back the attention that presence is made of. Fluency is upstream of presence.' },
      { p: 'Persuasion adds direction to that attention: knowing what you want the listener to think, feel or do, and shaping the speaking toward it. Speechcraft’s full study of persuasive structure — the classical craft of rhetoric and oratory — lives in the Library, and rewards a visit when you are ready to go deep.' },
    ],
  },
  {
    id: 'sp-w-integration', stage: 'whole', order: 3,
    title: 'Voice, Thought, Listening, Movement & Response',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'Isolated practice is temporary by design. The goal was never to speak while thinking about breath — it was for breath to take care of itself while you think, listen, move and respond.' },
      { p: 'Integration has a simple test: add the other demands back and see what survives. Speak the passage while walking. While really listening for the response. While the circumstances change under you (the Arcade is built for exactly this). A skill that survives is integrated; a skill that collapses goes back into focused practice — no verdict attached, that is simply the loop.' },
      { p: PRACTICE_PRINCIPLE_SHORT },
    ],
  },
  {
    id: 'sp-w-applying', stage: 'whole', order: 4,
    title: 'Applying Technique Without Managing It',
    kind: 'lesson', application: { general: true, acting: true },
    glossary: ['automaticity', 'presence'],
    requiredReviewer: 'editorial',
    body: [
      { p: 'In the moment of real speaking, technique belongs in the background. A speaker consciously managing pace, breath, emphasis and posture at once has no attention left for the only things that cannot be automated: this thought, this listener, this moment.' },
      { p: 'Trust the preparation. If practice made a skill fluent, it will be there without supervision — and if it isn’t there yet, mid-speech is not where it gets built. Notice what wobbled, finish the speaking with your attention where it belongs, and take the wobble back to practice afterward.' },
      { p: 'That is the whole course in one loop: isolate, secure, integrate, speak — and let the speaking itself tell you what to practice next.' },
    ],
  },
];

// Learn-pathway extras (2026-08-13 IA order): a one-line objective for
// every lesson; an understanding CHECK only where an objectively
// correct answer exists (never for interpretive choices — intention,
// emotional effect, phrasing and playable actions are NEVER scored);
// and a Practice link where a routine or game trains the skill.
export const SPEECH_LESSON_EXTRAS = {
  'sp-start-parts': {
    objective: 'Understand why this course isolates one element at a time — and why isolation is never the goal.',
    check: { q: 'In this course, what is isolated practice FOR?',
      choices: ['Replacing whole communication with drills',
                'Building a part strong enough to survive inside whole communication',
                'Proving which element matters most'], answer: 1 },
  },
  'sp-start-fluency': {
    objective: 'Know what automaticity is and why fluent skills free attention.',
    check: { q: 'What does automaticity give back to a speaker?',
      choices: ['A faster speaking rate', 'Attention, freed for thinking and listening',
                'A guarantee of confidence'], answer: 1 },
  },
  'sp-start-alphabet': {
    objective: 'Feel the difference between effortful retrieval and fluent sequential recall — in your own attention.',
  },
  'sp-start-offbook': {
    objective: 'Distinguish preparing your own words from preparing words that are fixed.',
    check: { q: 'For a text whose words are fixed, fluency means…',
      choices: ['Internalizing the gist so you can paraphrase',
                'The exact language secure enough that you stop searching for the next word',
                'Matching a recording of another performance'], answer: 1 },
  },
  'sp-f-instrument': { objective: 'Tour the physical chain of speech: breath, larynx, vocal tract, articulators.' },
  'sp-f-breath': { objective: 'Understand the exhale as the power source speech manages.',
    practice: { kind: 'routine', ref: 'rt-breath-train', label: 'Body & Breath — Train' } },
  'sp-f-effort': { objective: 'Tell useful effort from friction — without chasing total relaxation.' },
  'sp-f-jaw': { objective: 'Know what the jaw, tongue and neck do in speech, and which conditions deserve professional care.' },
  'sp-f-voice': { objective: 'Understand vocal-fold sound and resonance as shaping, not forcing.',
    practice: { kind: 'routine', ref: 'rt-voice-train', label: 'Voice & Resonance — Train' } },
  'sp-f-articulation': { objective: 'Treat clarity as adjustable precision in service of the listener.',
    practice: { kind: 'routine', ref: 'rt-artic-train', label: 'Articulation & Clarity — Train' } },
  'sp-f-health': { objective: 'Know the care basics and the signals that mean stop and see a professional.' },
  'sp-m-pace': { objective: 'Own pace and pause as controllable choices with no universal rules.',
    practice: { kind: 'routine', ref: 'rt-pace-train', label: 'Pace & Pause — Train' } },
  'sp-m-emphasis': { objective: 'Find the operative word and hear how moving it moves the thought.',
    practice: { kind: 'game', ref: 'operative', label: 'Change the Word, Change the Thought' } },
  'sp-m-intention': { objective: 'Put intention upstream of delivery: decide what the words should DO.',
    practice: { kind: 'routine', ref: 'rt-int-train', label: 'Thought & Intention — Train' } },
  'sp-m-want': { objective: 'Name purpose, audience, result and resistance — or circumstances, objective and obstacle on text.',
    practice: { kind: 'game', ref: 'objective-swap', label: 'Change the Objective' } },
  'sp-m-urgency': { objective: 'Understand urgency as the need to affect something now — in all its shapes.',
    practice: { kind: 'game', ref: 'tempo', label: 'Change the Tempo' } },
  'sp-w-movement': { objective: 'Test whether a skill survives motion, and choose movement instead of leaking it.',
    practice: { kind: 'routine', ref: 'rt-move-train', label: 'Movement & Speech — Train' } },
  'sp-w-presence': { objective: 'Treat presence as attention pointed outward — and fluency as what frees it.',
    practice: { kind: 'routine', ref: 'rt-pres-train', label: 'Presence & Persuasion — Train' } },
  'sp-w-integration': { objective: 'Use the add-it-back test: a skill is yours when it survives thinking, listening, moving and responding.' },
  'sp-w-applying': { objective: 'Let technique run in the background while attention stays on this thought, this listener.' },
};

// Search keywords for the Library search field. Derived from the
// records themselves (title, collection, glossary terms and the
// lesson's own headings) — never a hand-maintained second list.
export function lessonKeywords(l) {
  const heads = l.body.filter(b => b.h).map(b => b.h);
  const terms = (l.glossary ?? []).map(id => id.replace(/-/g, ' '));
  const col = SPEECH_COLLECTIONS.find(c => c.stage === l.stage)?.title ?? '';
  return [l.title, col, ...heads, ...terms].join(' ').toLowerCase();
}

// READING METADATA (2026-08-13) for the guided Speech reading flow.
// NEW authored copy — short framing only. It never restates a factual
// or health claim: the chapter's own approved writing remains the sole
// source of substance, unedited. Flagged for editorial review.
export const SPEECH_READING = {
  'sp-start-parts': {
    idea: 'Improve one element at a time, then put it back into whole speaking.',
    why: 'Trying to fix everything at once usually fixes nothing — there is too much to attend to.',
    notice: 'Next time you speak, notice how many things you are trying to manage at once.',
    takeaways: ['Isolation is a method, never the goal.',
      'A part is ready when it survives inside the whole.',
      'The conversation is what you are practising for.'] },
  'sp-start-fluency': {
    idea: 'What is fluent stops costing you attention.',
    why: 'Attention spent retrieving words is attention taken from thinking and listening.',
    notice: 'Notice what happens to your breathing when you search for a word.',
    takeaways: ['Fluency frees attention rather than adding polish.',
      'Practice is where effort belongs; speaking is where attention belongs.'] },
  'sp-start-alphabet': {
    idea: 'Effortful retrieval and fluent recall feel completely different from the inside.',
    why: 'You can feel the difference this course is built on, using something you already know.',
    notice: 'Run the experiment slowly and watch where your attention goes.',
    takeaways: ['The same memory can be effortful or automatic.',
      'Fluent recall leaves attention free; searching spends it.'] },
  'sp-start-offbook': {
    idea: 'Preparing your own words and preparing fixed words are different jobs.',
    why: 'Confusing the two makes conversations brittle and fixed texts unreliable.',
    notice: 'Think of something you will say this week. Which kind of preparation does it need?',
    takeaways: ['Your own words: secure the structure, speak the rest freshly.',
      'Fixed words: secure the exact language.'] },
  'sp-m-pace': {
    idea: 'There is no universally correct pace or pause — only choices that suit the moment.',
    why: 'Rules about speed collapse the moment the situation changes.',
    notice: 'Try a sentence quickly, then allow space between its thoughts.',
    takeaways: ['Pace and pause answer the situation, not a rule.',
      'What can be trained is control, not one correct speed.'] },
  'sp-m-emphasis': {
    idea: 'The word you land on decides what the sentence means.',
    why: 'Emphasis is not decoration — it is where the thought actually turns.',
    notice: 'Say one sentence three times, landing a different word each time.',
    takeaways: ['Every emphasis answers a different question.',
      'Grouping words changes the idea as much as stressing them.'] },
  'sp-m-intention': {
    idea: 'Decide what the words should do before deciding how they should sound.',
    why: 'Delivery choices follow from intention; without one, nothing lands anywhere in particular.',
    notice: 'Before your next difficult message, name in one sentence what you want it to do.',
    takeaways: ['Intention sits upstream of delivery.',
      'Undecided intention produces undecided speech.'] },
  'sp-m-want': {
    idea: 'Name what you want from the person in front of you.',
    why: 'A pursuit can be played and tested; a mood cannot.',
    notice: 'Write your next request as “I want you to ___.” Does it name something they can do?',
    takeaways: ['Purpose, audience, result and resistance shape everything else.',
      'On text, circumstances and objective do the same work.'] },
  'sp-m-urgency': {
    idea: 'Urgency is the need to affect something now — not speed or volume.',
    why: 'Real urgency can slow speech down as easily as speed it up.',
    notice: 'Ask why a conversation you are avoiding cannot simply wait.',
    takeaways: ['Urgency comes from stakes and timing, not from performance.',
      'It can produce stillness, precision or silence.'] },
  'sp-w-movement': {
    idea: 'A skill is yours when it survives a moving body.',
    why: 'Isolated practice happens standing still; speaking mostly does not.',
    notice: 'Say something familiar while walking, and notice what changes.',
    takeaways: ['Test skills under motion before trusting them.',
      'Movement is meaning: chosen or leaked.'] },
  'sp-w-presence': {
    idea: 'Presence is mostly attention pointed outward.',
    why: 'What audiences call presence is usually engagement, not charisma.',
    notice: 'In your next conversation, watch the other person rather than yourself.',
    takeaways: ['Fluency buys back the attention presence is made of.',
      'Persuasion adds direction to that attention.'] },
  'sp-w-integration': {
    idea: 'Add the other demands back and see what survives.',
    why: 'Integration is the whole point — isolation was always temporary.',
    notice: 'Speak a prepared passage while genuinely listening for a reply.',
    takeaways: ['What collapses goes back to focused practice — no verdict attached.',
      'What survives is genuinely yours.'] },
  'sp-w-applying': {
    idea: 'In the moment, technique belongs in the background.',
    why: 'Attention spent supervising your craft is attention taken from the listener.',
    notice: 'Afterwards, note what wobbled — not during.',
    takeaways: ['Trust the preparation while speaking.',
      'Mid-speech is not where a skill gets built.'] },
};

export const speechReading = id => SPEECH_READING[id] ?? null;

// ── THE SPEECHCRAFT TEXTBOOK (2026-08-13) ─────────────────────
// Structure and DISPLAY titles only. Every stable id and the canonical
// `order` field are untouched, so saved read-state keeps resolving;
// renames are presentation, applied through chapterTitle() everywhere.
// 'wsm' is the preface, promoted to the first regular chapter of Part I
// and routed to its existing authoritative reading — never copied.
export const CHAPTER_TITLES = {
  'sp-f-instrument': 'Your Instrument',
  'sp-f-effort': 'Tension',
  'sp-f-jaw': 'Anatomy',
  'sp-f-breath': 'Breath',
  'sp-f-voice': 'Resonance',
  'sp-w-integration': 'Integration',
  'sp-w-applying': 'Let It Go',
};
export const chapterTitle = id =>
  CHAPTER_TITLES[id] ?? (speechLessonById(id)?.title ?? '');

export const TEXTBOOK_PARTS = [
  { n: 'I', title: 'Speechcraft Principles', tone: 'is-sage',
    chapters: ['wsm', 'sp-start-parts', 'sp-start-alphabet',
               'sp-start-fluency', 'sp-start-offbook'] },
  { n: 'II', title: 'Your Speaking Instrument', tone: 'is-terracotta',
    chapters: ['sp-f-instrument', 'sp-f-effort', 'sp-f-jaw', 'sp-f-breath',
               'sp-f-voice', 'sp-f-articulation', 'sp-f-health'] },
  { n: 'III', title: 'What & Why?', tone: 'is-blue',
    chapters: ['sp-m-intention', 'sp-m-want', 'sp-m-urgency'],
    subsections: [{ title: 'Rhythm', chapters: ['sp-m-pace', 'sp-m-emphasis'] }] },
  { n: 'IV', title: 'Mix It', tone: 'is-lavender',
    chapters: ['sp-w-movement', 'sp-w-presence', 'sp-w-integration', 'sp-w-applying'] },
];

// Flat reading order across the whole textbook, for Previous / Next.
export const textbookOrder = () => TEXTBOOK_PARTS.flatMap(p =>
  [...p.chapters, ...(p.subsections ?? []).flatMap(s => s.chapters)]);

export const partForChapter = id =>
  TEXTBOOK_PARTS.find(p => textbookPartChapters(p).includes(id)) ?? null;

export const textbookPartChapters = p =>
  [...p.chapters, ...(p.subsections ?? []).flatMap(s => s.chapters)];

// End matter is RESERVED, not written. Nothing renders as a page until
// its copy exists and has been through the editorial audit.
export const TEXTBOOK_END_MATTER = [
  { id: 'key-ideas', title: 'Key Ideas' },
  { id: 'glossary', title: 'Glossary' },
  { id: 'sources', title: 'Sources & Further Reading' },
  { id: 'continue', title: 'Continue Your Work' },
];

export const speechLessonsFor = stageId =>
  SPEECH_LESSONS.filter(l => l.stage === stageId).sort((a, b) => a.order - b.order);

export const speechLessonById = id => SPEECH_LESSONS.find(l => l.id === id) ?? null;
