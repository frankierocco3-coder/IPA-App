// The Dialect Accuracy Standard — one record per course, the single truth
// source for what each accent target IS. The About pages, the IPA
// reference's "Common realizations & connected speech" section, and the
// Sources & Credits references all render from here, so the Library,
// Guidebooks and About cards can never drift apart.
//
// Notation: /…/ is broad phonemic transcription; […] is a spoken
// realization. Realizations are teaching content, never extra phonemes.
// The English R is written /r/ by broad-dictionary convention; its precise
// phonetic symbol is [ɹ].

export const DIALECT_INFO = {
  nam: {
    icon: '🇺🇸',
    color: '#b05f4d',
    target: 'A performance target based on broadly regionally unmarked U.S. speech. It is rhotic and avoids strongly identifiable regional features — but no single pronunciation represents every American speaker. This course teaches one consistent target while identifying the common areas of variation.',
    period: 'Contemporary — present-day stage, film and broadcast work.',
    context: 'The default working accent for American roles when a script names no region. Real American speech spans dozens of regional and social varieties; “neutral” describes the goal of unmarkedness, not a claim that most Americans talk this way.',
    notClaim: 'It does not claim that all Americans share one vowel system, that unmarked speech is “correct”, or that any real region speaks exactly this way.',
    core: [
      'Rhotic /r/ in every position, spoken as the approximant [ɹ]',
      'Flat BATH: /æ/ in bath, dance, grass, ask',
      'Open unrounded LOT /ɑ/; GOAT starts back and rounded at /oʊ/',
      'R-coloured vowels: stressed NURSE /ɝ/, unstressed lettER /ɚ/',
      'LOT–THOUGHT kept distinct (/ɑ/ vs /ɔː/) as the course target',
    ],
    common: [
      'T/D tapping between vowels: /t d/ → [ɾ] (better [ˈbeɾɚ], ladder [ˈlæɾɚ])',
      'Dark L [ɫ] in most positions',
      'Yod-dropping after /t d n/: tune /tuːn/, duty /ˈduːti/, new /nuː/',
      '/æ/ raising before nasals: man, dance drift toward [ɛə]',
      'Weak forms in connected speech: can /kən/, was /wəz/, of /əv/',
    ],
    variable: [
      'The cot–caught merger: many Americans say THOUGHT words with /ɑ/ — completely standard; this course keeps the distinction so its recordings stay consistent',
      'Degree of /æ/ raising and tapping varies by speaker and formality',
    ],
    convention: 'Broad transcription with learner-friendly symbols: /iː uː ɔː/ keep their length marks by convention, not because American English has a contrastive length system — duration varies with context. /r/ is written per dictionary practice; realizations like [ɾ] and [ɫ] appear in square brackets only.',
    rhythm: 'Stress-timed: stressed syllables anchor the rhythm while function words compress and weaken. Intonation moves in smaller steps than British varieties, with a characteristic mid-fall on statements.',
    differsFrom: { id: 'rp', label: 'Traditional RP', how: 'Neutral American keeps every /r/ and flat BATH /æ/ where RP drops post-vocalic /r/ and broadens BATH to /ɑː/; American GOAT starts back and rounded /oʊ/ vs RP’s schwa-start /əʊ/; American taps its /t/ where RP articulates it carefully.' },
    sources: [
      'Hillenbrand, J. — “American English: Southern Michigan”, Journal of the International Phonetic Association (Cambridge University Press): an illustrative regionally-unmarked American variety.',
      'Wells, J. C. — Accents of English (Cambridge University Press): lexical sets and cross-accent comparison.',
    ],
  },

  rp: {
    icon: '🎩',
    color: '#6b7fa3',
    target: 'The historical prestige accent associated with twentieth-century British broadcasting, upper- and upper-middle-class speech, and classical stage performance — including the later performance traditions for writers such as Shakespeare, Wilde and Shaw.',
    period: 'Historical: codified in the early-to-mid twentieth century (the Gimson-style description this course follows). Still alive as a stage, period-drama and character accent.',
    context: 'Learned as a marker of class and education rather than region; the accent of the early BBC and the classical theatre. Shakespeare himself spoke nothing like it — RP is how his plays came to be performed centuries later.',
    notClaim: 'It does not claim to be how most British people speak today, nor the pronunciation of Shakespeare’s own era. For a present-day British target, see Standard British.',
    core: [
      'Non-rhotic: /r/ only before a vowel — long vowels and centring diphthongs stand where r vanished',
      'The BATH split: bath, dance, grass, ask take /ɑː/',
      'Full centring diphthongs: NEAR /ɪə/, SQUARE /eə/, CURE /ʊə/',
      'Careful, fully articulated /t/ — no glottal replacement',
      'Yod retention: tune /tjuːn/, duty /ˈdjuːtɪ/ keep /tj dj/ separate',
      'Conservative lax happY endings: happy /ˈhæpɪ/',
    ],
    common: [
      'Linking R: “far away” /fɑːr əˈweɪ/ — the silent r returns before a vowel',
      'Intrusive R: an unwritten r appears between vowels (“law and order”)',
      'Clear [l] before vowels, dark [ɫ] finally (feel, little)',
      'Crisp aspiration on stressed voiceless plosives',
      'Weak forms throughout connected speech: can /kən/, of /əv/',
    ],
    variable: [
      'CURE /ʊə/ already merging toward /ɔː/ for some later RP speakers (sure, poor)',
      'Degree of “plumminess” — the marked upper-class varieties push every feature further',
    ],
    convention: 'The traditional Gimson-style inventory and symbols, matching classic dictionaries and stage-speech manuals. Broad transcription throughout; realizations such as [ɫ] appear in square brackets.',
    rhythm: 'Measured, evenly weighted stresses; wide controlled intonation falls; precision of articulation carries the accent’s authority.',
    differsFrom: { id: 'ssbe', label: 'Standard British', how: 'Traditional RP glides SQUARE /eə/, holds a careful /t/, keeps its yods and ends happY words lax /ɪ/ — Standard British holds SQUARE steady at /ɛː/, often realizes /t/ as [ʔ], fuses yods (tune /tʃuːn/) and tenses happY to /i/. RP reads one generation older, more formal, more classed.' },
    sources: [
      'Roach, P. — “British English: Received Pronunciation”, Journal of the International Phonetic Association (Cambridge University Press).',
      'Cruttenden, A. (ed.) — Gimson’s Pronunciation of English (Routledge): the traditional inventory this course follows.',
    ],
  },

  ssbe: {
    icon: '🇬🇧',
    color: '#7d6b9e',
    target: 'A modern pronunciation target for present-day British roles and conversation — the mainstream, present-day counterpart to Traditional RP. It keeps the classic non-rhotic skeleton while including the pronunciation patterns most of today’s speakers actually use.',
    period: 'Contemporary — the British English of present-day film, TV and everyday professional life.',
    context: 'The natural target for characters living now. Real speakers vary by age, region and setting, so this course labels every feature honestly: core target, common contemporary, or variable.',
    notClaim: 'It does not claim to be a single accent every British person shares, and it is deliberately separate from Traditional RP — playing a period drama in this target is as anachronistic as the reverse.',
    core: [
      'Non-rhotic with the classic skeleton: broad BATH /ɑː/, rounded LOT /ɒ/, GOAT /əʊ/',
      'Steady SQUARE /ɛː/ — a long monophthong where RP glided /eə/',
      'Fronted GOOSE: broad /uː/, spoken far forward, closer to [ʉː]',
      'happY tensing: the weak final vowel of happy, city is tense /i/',
      'Open, lowered TRAP /æ/, close to [a]',
    ],
    common: [
      '/t/ realized as a glottal stop [ʔ] before consonants, word-finally and before unstressed syllables: /ˈbetə/ → [ˈbeʔə] — [ʔ] is a realization of /t/, never an extra phoneme',
      'Yod coalescence: tune /tʃuːn/, duty /ˈdʒuːti/',
      'Linking and intrusive R',
      'Weak-vowel merger: unstressed /ɪ/ and /ə/ falling together for many speakers',
    ],
    variable: [
      'NEAR smoothing: /ɪə/ toward a long [ɪː] for some speakers',
      'L-vocalisation in relaxed speech: dark final /l/ toward [o] (milk ≈ [mɪok])',
      'GOAT and GOOSE take backer, rounder qualities before /l/ (goal, gold)',
      'Heavier glottalling in casual registers; careful speech keeps [t]',
    ],
    convention: 'RP-derived broad symbols updated where the contemporary sound has genuinely moved (/ɛː/), with realizations in square brackets. Broad /uː/ is kept for GOOSE — the symbol names the phoneme, not the exact modern tongue position.',
    rhythm: 'Lighter and quicker than Traditional RP: smaller intonation falls, more level tails, and heavy reduction of function words in connected speech. Register matters — the same speaker glottals more at the pub than in a job interview.',
    differsFrom: { id: 'rp', label: 'Traditional RP', how: 'Standard British is Traditional RP one generation on: SQUARE steadies to /ɛː/, non-initial /t/ commonly becomes [ʔ], yods fuse, happY tenses to /i/, GOOSE fronts. The skeleton — non-rhoticity, BATH, LOT, GOAT — is shared, which is why the course drills the two side by side.' },
    sources: [
      'Lindsey, G. — English After RP: Standard British Pronunciation Today (Palgrave Macmillan): the contemporary description this course follows.',
      'Wells, J. C. — Accents of English (Cambridge University Press): lexical sets and the RP baseline.',
    ],
  },

  cockney: {
    icon: '🚕',
    color: '#a8825a',
    target: 'Broad working-class London speech: the accent of the East End market, the black cab and a century of London stage and screen. A first-class audition dialect, taught with its full feature set rather than a softened stage version.',
    period: 'Contemporary, with traditional features labelled where they are receding. The accent has been described continuously since the nineteenth century and is still alive across London and the estuary towns.',
    context: 'For characters who are London working class, past or present. Real speakers range from full broad Cockney to milder Estuary blends; this course teaches the broad end and labels every feature honestly so an actor can dial the strength to the role.',
    notClaim: 'It does not claim that Cockney is careless or incorrect English: it is a rule-governed accent with its own system, and this course treats it with the same respect as any other. It is also not Multicultural London English, a newer London variety with a different feature set.',
    core: [
      'TH-fronting: /θ/ realized [f] and non-initial /ð/ realized [v]: think [fɪŋk], brother [ˈbrʌvə]',
      '/t/ realized as a glottal stop [ʔ] between vowels and word-finally: butter [ˈbʌʔə], what [wɒʔ]',
      'H-dropping in content words: house [aʊs], hammer [ˈæmə]',
      'L-vocalization: dark /l/ becomes an [o]-like vowel: milk [mɪok], well [weo]',
      'Yod coalescence: tune [tʃuːn], Tuesday [ˈtʃuːzdeɪ], duty [ˈdʒuːʔi]',
      'The diphthong shift: FACE realized [æɪ], PRICE realized [ɑɪ], GOAT realized [æʊ]',
      'Non-rhotic with broad BATH /ɑː/: the London skeleton underneath is shared with Standard British',
    ],
    common: [
      'Word-initial /ð/ in function words realized [d] or dropped: the, them',
      'MOUTH flattened toward a long [æː]: mouth [mæːf], about [əˈbæːʔ]',
      'Final unstressed -er opened toward [ɐ]: dinner [ˈdɪnɐ]',
      'me for my in casual speech: me brother — grammar, taught with the expressions rather than drilled',
      'innit as an all-purpose tag question',
    ],
    variable: [
      'How far the diphthong shift travels: broad speakers go further than young Estuary-leaning ones',
      'Hypercorrect h-insertion in careful speech by natural h-droppers',
      'Rhyming slang in live use: recognition is essential for an actor, active use varies hugely by speaker and generation',
      'TH-fronting of initial /ð/: this, that keep [ð] or [d] more often than [v]',
    ],
    convention: 'Broad symbols are shared with Standard British: the phoneme system underneath is the same, and what makes Cockney is the realizations. So drills write Cockney forms in square brackets: think is still /θɪŋk/ underneath, and [fɪŋk] is how the accent says it. The diphthong shift is taught the same way: FACE keeps its broad /eɪ/, spoken [æɪ].',
    rhythm: 'Quick, forward and heavily linked, with strong reduction of function words and the glottal stop carrying much of the consonant rhythm. Intonation is lively, with wide rises on the innit-style tags. Register matters: the same speaker glottals and fronts more at the market than at a job interview.',
    differsFrom: { id: 'ssbe', label: 'Standard British', how: 'Cockney and Standard British share a skeleton: non-rhotic, broad BATH, rounded LOT. Cockney then goes where Standard British does not: TH-fronting, h-dropping, the full diphthong shift, and glottal replacement as the norm rather than a relaxed-speech option. Standard British reads neutral and professional; Cockney reads local, working class and unmistakably London.' },
    sources: [
      'Wells, J. C. — Accents of English 2: The British Isles (Cambridge University Press): the London chapter this course follows for the feature set and the diphthong shift.',
      'Sivertsen, E. — Cockney Phonology (Oslo University Press): the classic descriptive study.',
      'Matthews, W. — Cockney Past and Present (Routledge): history and lexicon.',
      'Lindsey, G. — English After RP: Standard British Pronunciation Today (Palgrave Macmillan): the contemporary London backdrop and the Estuary boundary.',
    ],
  },

  aus: {
    icon: '🇦🇺',
    color: '#5f8a86',
    target: 'General Australian English — the mainstream variety most Australians speak — described with the revised (HCE-style) Australian transcription system used in Australian phonetics references.',
    period: 'Contemporary. Australian runs on a historical spectrum from Broad through General to Cultivated (an RP-leaning variety now recessive); General is the present-day mainstream and this course’s target.',
    context: 'Remarkably uniform across a vast country compared with Britain or America, but not without variation: BATH words split regionally (dance with /ɐː/ or /æ/ by state), and social register moves speakers along the Broad–General spectrum.',
    notClaim: 'It does not claim that all Australians sound alike, that Broad (“ocker”) Australian is the standard, or that the older RP-based symbol set describes these vowels accurately.',
    core: [
      'Non-rhotic: /r/ only before a vowel',
      'Central open vowels: STRUT /ɐ/, PALM/BATH /ɐː/',
      'Fronted GOOSE /ʉː/',
      'Raised LOT /ɔ/ and THOUGHT /oː/ — higher than their RP counterparts',
      'Steady SQUARE /eː/ — a monophthong, no glide',
      'Shifted diphthongs: FACE /æɪ/, PRICE /ɑe/, MOUTH /æɔ/, GOAT /əʉ/, CHOICE /oɪ/',
    ],
    common: [
      'Linking R and intrusive R (“law-r-and order”)',
      'T/D tapping between vowels: better [ˈbeɾə], ladder [ˈlæɾə]',
      'Dark [ɫ], often vocalized word-finally (milk, feel)',
      'Yod coalescence: tune /tʃʉːn/, duty /ˈdʒʉːtiː/',
      'FLEECE with a small onglide: /iː/ spoken as [ɪi]',
    ],
    variable: [
      'Regional TRAP–BATH split: dance, castle, grasp take /ɐː/ or /æ/ by region — both genuinely Australian',
      'Optional word-final T-glottalisation: got as [gɔʔ] in relaxed speech',
      'CURE /ʊə/ rare and receding — most speakers merge CURE words toward /oː/ (sure ≈ shore)',
      'Broad–General–Cultivated spectrum: the diphthongs widen as speech gets broader',
    ],
    convention: 'The revised Australian (HCE-style) symbol set: /ɔ oː eː ɑe oɪ/ replace the RP-based LOT/THOUGHT/SQUARE/PRICE/CHOICE symbols, because the Australian vowels genuinely sit elsewhere. Realizations like [ɾ] and [ɪi] appear in square brackets.',
    rhythm: 'Rides its long open vowels; statements frequently carry a rising contour (uptalk) without becoming questions; overall delivery flatter and more level than RP’s wide falls.',
    differsFrom: { id: 'rp', label: 'Traditional RP', how: 'Both are non-rhotic with a BATH split, but Australian centralises STRUT and PALM (/ɐ ɐː/), fronts GOOSE (/ʉː/), raises LOT and THOUGHT (/ɔ oː/), flattens SQUARE to /eː/ and re-aims every closing diphthong — the shared skeleton wears entirely different vowels.' },
    sources: [
      'Macquarie University, Department of Linguistics — Phonemic (broad) transcription of Australian English: the revised transcription system this course uses.',
      'Macquarie University, Australian Voices — The Australian Accent: variation, and the Broad–General–Cultivated spectrum.',
      'Cox, F. & Fletcher, J. — Australian English Pronunciation and Transcription (Cambridge University Press).',
    ],
  },
};
