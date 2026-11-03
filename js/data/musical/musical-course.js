// Musical Theatre — the ninth workspace (owner handoff, 2026-11-03).
//
// Frankie's bundle of 3 November 2026 asked for two courses: a history of
// theatre and a musical theatre course. This is the second.
//
// WHERE EVERY WORD CAME FROM:
//   * The Broadway Book Musical was lesson 22 of the same history
//     handoff. It is here rather than in Theatre History because it is
//     this course's opening lesson, and a lesson id belongs to exactly
//     one book. Theatre History therefore walks twenty-two lessons, not
//     twenty-three.
//   * Everything else is speechcraft-musical-theatre-repertoire.md,
//     unchanged in substance: the date convention, the credit key, eight
//     collections with their own working definitions and study focus, and
//     the catalogue's own note on how Speechcraft should organise it.
//
// WHAT THE HANDOFF ASKED FOR AND THIS KEEPS: the date convention and its
// exceptions, the credits as given, the 1961 to 1964 bridge note, and the
// fact that Pop/Rock and Jukebox are CROSS-ERA STYLE TAGS rather than
// periods — which is why they are their own module and not two more
// entries in Repertoire by Era.
//
// THE CATALOGUE IS A REFERENCE RESOURCE AND THE HANDOFF SAYS SO. It is
// "not another history lesson". The eight collections are pages you are
// sent to, with teaching copy of their own, rather than a dramatic arc.
// They are path lessons rather than `reference: true` records for one
// reason: a reference record in this app is reached from a chart inside
// another lesson, and there is no chart to reach these from. On the path
// they are shelved, counted and walkable. If a browse surface is ever
// built for them, they can become reference records then.
//
// SONG AND SHOW TITLES ONLY. No lyric is reproduced anywhere in this
// file, and none should be: the repertoire names what to go and listen
// to, and the recording is not ours to ship.
//
// TWO LESSONS AND EIGHT CATALOGUE PAGES IS NOT YET A COURSE THAT CAN
// STAND ALONE, which is the test Speech failed in 2026-08 and Character
// and Shakespeare both waited for. MUSICAL_LIVE is false in
// js/views/context.js and nothing here is approved. It needs an owner
// editorial entry per record in js/data/speech/reviews.js, and it wants
// more written lessons before the flag is worth flipping.
//
// IDS ARE PERMANENT from the first push.

export const MUSICAL_PRINCIPLE =
  'A musical number is not a break from the acting. It is the same dramatic life carried by other means, and the repertoire is organised so you can find the one that fits the voice and the character you have.';

export const MUSICAL_MODULES = [
  { n: 1, id: 'mt-form', title: 'The Book Musical',
    blurb: 'What a book musical is made of, the traditions it came from, what a song does that speech cannot, and how to approach a number as playable action.' },
  { n: 2, id: 'mt-era', title: 'Repertoire by Era',
    blurb: 'How the catalogue is built, then six working periods from the 1940s songbook to the present, each with its own definition, study focus and representative shows.' },
  { n: 3, id: 'mt-style', title: 'Repertoire by Style',
    blurb: 'The two categories that cut across every period: an original score built on popular music, and a score assembled from one that already existed.' },
];

export const MUSICAL_LESSONS = [
  { id: 'mt-book', module: 'mt-form', order: 1,
    title: 'What a Book Musical Is',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Name the book, the lyrics and the score, and place the Broadway musical inside the longer history of musical storytelling rather than at the start of it.',
    orientation: 'Book, lyrics and score, and the traditions standing behind them',
    reflection: 'What can a character communicate through music and movement that ordinary speech cannot?',
    takeaway: 'A book musical uses a dramatic narrative to organise its characters, dialogue, songs and movement.',
    contents: ['Music was there long before Broadway', 'What is a book musical?', 'The many traditions feeding the form'],
    body: [
      { note: 'Historical discussion includes racist stereotypes, sexual coercion, violence, and a fictional scene involving encouragement of suicide. Plot endings are included.' },
      { h: 'What you will learn' },
      { list: [
        'Define the book, lyrics, and score of a musical.',
      ] },
      { h: 'Music was there long before Broadway' },
      { p: 'Broadway did not invent the combination of music, movement, and drama.' },
      { p: 'Ancient Greek theatre included song and dance. Medieval religious drama used music. Many Asian performance traditions integrate vocal, instrumental, physical, and dramatic expression.' },
      { p: 'Opera, operetta, folk performance, melodrama, and popular entertainments also contributed to the history of musical storytelling.' },
      { p: 'The Broadway book musical is a distinctive development within that larger history, not the origin of musical theatre itself.' },
      { p: 'One correction to the transcript: opera developed around 1600. The nineteenth century brought major changes and expansion, not its initial invention.' },
      { h: 'What is a book musical?' },
      { p: 'A book musical uses a dramatic narrative to organise its characters, dialogue, songs, and usually movement or dance.' },
      { p: 'Its principal written components are:' },
      { table: {
        head: ['Component', 'What it does'],
        rows: [
          ['Book', 'Establishes the dramatic structure, scenes, dialogue, and progression of events.'],
          ['Lyrics', 'Supply the words that are sung.'],
          ['Music', 'Shapes melody, rhythm, harmony, and musical development.'],
        ] } },
      { p: 'The word “book” does not mean the musical must be adapted from a novel.' },
      { p: 'A book musical may use an original story.' },
      { p: 'Nor does it necessarily require constant spoken dialogue. The relationship between narrative and music matters more than a fixed ratio of speaking to singing.' },
      { h: 'The many traditions feeding the form' },
      { p: 'American musical theatre developed through overlapping forms:' },
      { list: [
        'Vaudeville: bills of separate entertainment acts.',
        'Operetta: musical drama often combining songs with spoken dialogue.',
        'Burlesque: historically, comic parody and theatrical exaggeration, not only the later striptease association.',
        'Pantomime and spectacle: visual transformation, physical comedy, dance, and elaborate effects.',
        'Minstrelsy: a hugely influential entertainment industry built around racist caricature.',
        'Popular song and dance: material circulating between theatres, communities, music publishing, and recording.',
      ] },
      { p: 'These influences were neither equally innocent nor culturally isolated.' },
      { p: 'Musical theatre’s history includes invention, exploitation, collaboration, exclusion, and appropriation.' },
      { p: 'Understanding the form requires examining all of them.' },
      { h: 'Knowledge check' },
      { qa: [
        { q: 'What does “book” mean in a book musical?',
          a: 'The dramatic structure, scenes, and dialogue, not necessarily a novel used as source material.' },
      ] },
    ] },

  { id: 'mt-roots', module: 'mt-form', order: 2,
    title: 'Where the Form Came From',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Tell a revue from a book musical, trace the overlapping forms the musical grew out of, and resist the tidy story of a single first.',
    orientation: 'Spectacle, variety, operetta, and the problem with firsts',
    takeaway: 'A memorable milestone is not necessarily a single point of origin.',
    contents: ['The Black Crook and the problem with “firsts”', 'Harrigan and Hart: recognisable urban life', 'The revue and the Ziegfeld Follies', 'The Princess Theatre collaborations'],
    sources: [
      'Harry Ransom Center: The Black Crook collection — https://cdm15878.contentdm.oclc.org/digital/collection/p15878coll29',
      'Internet Broadway Database: Oh, Lady! Lady! — https://www.ibdb.com/broadway-show/oh-lady-lady-6688',
    ],
    body: [
      { note: 'Historical discussion includes racist stereotypes, sexual coercion, violence, and a fictional scene involving encouragement of suicide. Plot endings are included.' },
      { h: 'What you will learn' },
      { list: [
        'Explain how the Broadway musical developed from several theatrical traditions.',
        'Distinguish a revue from a book musical.',
      ] },
      { h: 'The Black Crook and the problem with “firsts”' },
      { p: 'The Black Crook opened in New York in 1866.' },
      { p: 'It combined melodrama, music, ballet, and spectacular visual effects. Its success made it an important landmark.' },
      { p: 'It is often called the first American musical, but that claim depends on how “musical” is defined. Earlier productions had already combined dramatic action with music.' },
      { p: 'It is more useful to describe it as an influential musical spectacle than as the moment a complete form suddenly appeared. The Harry Ransom Center describes it as one of the first successful musicals in the United States. Harry Ransom Center: The Black Crook collection' },
      { defs: [
        { label: 'Historical principle', text: 'A memorable milestone is not necessarily a single point of origin.' },
      ] },
      { h: 'Harrigan and Hart: recognisable urban life' },
      { p: 'Edward Harrigan and Tony Hart developed popular entertainments around working-class New York characters and neighbourhood life.' },
      { p: 'Their “Mulligan Guard” material grew from comic performance into larger musical works. Composer David Braham was an important collaborator.' },
      { p: 'These shows helped bring familiar urban situations and popular song into sustained theatrical entertainment.' },
      { p: 'But their humour also relied heavily on ethnic and racial caricature.' },
      { p: 'The lesson is not that recognisable characters automatically produce respectful representation.' },
      { p: 'A work can make one audience feel seen while reducing another community to a joke.' },
      { h: 'The revue and the Ziegfeld Follies' },
      { p: 'The Ziegfeld Follies began in 1907.' },
      { p: 'A revue typically brings together songs, dances, sketches, and specialty performances without requiring one continuous plot.' },
      { p: 'The Follies offered elaborate design, performers, comedy, and carefully presented spectacle.' },
      { p: 'They also made women’s appearance a major commercial attraction.' },
      { p: 'That history deserves scrutiny, but the performers should not disappear behind descriptions of their bodies. Their work required timing, discipline, musicality, physical skill, and stage presence.' },
      { p: 'A revue is not merely an unsuccessful book musical.' },
      { p: 'It has a different organising principle: the relationship between individual numbers rather than a single developing story.' },
      { h: 'The Princess Theatre collaborations' },
      { p: 'Jerome Kern, Guy Bolton, and P. G. Wodehouse helped develop smaller-scale musicals associated with the Princess Theatre.' },
      { p: 'They used recognisable contemporary situations and worked toward closer relationships among story, character, and song.' },
      { p: 'Their shows included Oh, Boy! and Oh, Lady! Lady!.' },
      { p: 'The transcript’s “Oh Dear!” appears to be a mistaken title. It also describes Bolton too simply as the lyricist: his central contribution was book writing, while Wodehouse was a major lyricist as well as a book collaborator. Credits vary by production. Internet Broadway Database: Oh, Lady! Lady!' },
      { p: 'The important development was coordination.' },
      { p: 'A musical number could belong specifically to these characters in this situation, rather than being inserted mainly because it was attractive entertainment.' },
      { h: 'Knowledge check' },
      { qa: [
        { q: 'How does a revue differ from a book musical?',
          a: 'A revue generally organises separate numbers and sketches without requiring one continuous narrative.' },
        { q: 'Why is calling The Black Crook the first musical problematic?',
          a: 'Earlier works combined music and drama, and the answer depends on the definition being used.' },
      ] },
    ] },

  { id: 'mt-integration', module: 'mt-form', order: 3,
    title: 'Integration, and What a Song Does',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Say what an integrated song actually accomplishes, and test a number by what would be lost if it disappeared.',
    orientation: 'What changes when a number belongs to these people in this situation',
    takeaway: 'Integration means the elements work together dramatically, not that one composer invented storytelling through song.',
    contents: ['Integration was an evolution, not one person’s invention', 'What does an integrated song do?', 'Show Boat: widening the musical’s subject matter', 'Songs belong to particular people'],
    sources: [
      'PBS: Show Boat — https://www.pbs.org/wnet/broadway/shows/show-boat/',
    ],
    body: [
      { note: 'Historical discussion includes racist stereotypes, sexual coercion, violence, and a fictional scene involving encouragement of suicide. Plot endings are included.' },
      { h: 'What you will learn' },
      { list: [
        'Identify what songs and dances accomplish dramatically.',
      ] },
      { h: 'Integration was an evolution, not one person’s invention' },
      { p: 'The transcript calls Kern the “father” of the book musical.' },
      { p: 'That is a useful shortcut only if it does not erase earlier work or collaborators.' },
      { p: 'Gilbert and Sullivan, for example, had already developed close relationships among music, language, character, and plot.' },
      { p: 'Their works were not generally sung-through, as the transcript suggests. Most include substantial spoken dialogue.' },
      { p: 'Nor did integrated musical storytelling require every setting to be contemporary or realistic.' },
      { p: 'The Broadway book musical emerged through many experiments.' },
      { key: 'Integration means the elements work together dramatically, not that one composer invented storytelling through song.' },
      { h: 'What does an integrated song do?' },
      { p: 'A song can:' },
      { list: [
        'Establish a desire.',
        'Change someone’s mind.',
        'Conceal a feeling.',
        'Reveal a private fantasy.',
        'Create or damage a relationship.',
        'Compress time.',
        'Establish a community’s values.',
        'Comment on events.',
        'Return to an earlier idea with a changed meaning.',
      ] },
      { p: 'Not every song must cause a new external event.' },
      { p: 'A number may pause clock time while transforming our understanding of the character.' },
      { p: 'The useful question is:' },
      { key: 'What would become less clear, less complicated, or less powerful if this number disappeared?' },
      { h: 'Show Boat: widening the musical’s subject matter' },
      { p: 'Show Boat opened in 1927, with music by Jerome Kern and book and lyrics by Oscar Hammerstein II, adapted from Edna Ferber’s novel.' },
      { p: 'Florenz Ziegfeld produced it, a reminder that revue spectacle and narrative ambition did not belong to entirely separate worlds. PBS: Show Boat' },
      { p: 'The musical addressed race, relationships, abandonment, labour, and the passage of time.' },
      { p: 'Its dramatic scope helped demonstrate that a musical could sustain subjects beyond light romantic complication.' },
      { p: 'However, its challenges to racism coexist with stereotypes and representational limitations.' },
      { p: 'A production must examine both its achievements and the material it inherits.' },
      { h: 'Songs belong to particular people' },
      { p: 'The transcript groups “Ol’ Man River” and “Can’t Help Lovin’ Dat Man” together as opportunities for Black performers.' },
      { p: 'The character distinctions matter.' },
      { p: '“Ol’ Man River” is associated with Joe, a Black labourer. Julie, who sings “Can’t Help Lovin’ Dat Man,” is a mixed-race character passing as white, and the history of casting that role is complicated.' },
      { p: 'For actors, a famous standard is not only a famous melody.' },
      { p: 'Within a musical, ask:' },
      { list: [
        'Who sings it?',
        'What do they know?',
        'Who hears it?',
        'What does singing reveal or put at risk?',
        'How does its meaning depend on the surrounding scene?',
      ] },
      { p: 'A song’s life outside the theatre can obscure its original dramatic circumstances.' },
      { h: 'Knowledge check' },
      { qa: [
        { q: 'What does integration mean?',
          a: 'The theatrical elements contribute purposefully to character, dramatic development, or the work’s larger meaning.' },
        { q: 'Must every song advance the external plot?',
          a: 'No. A song can transform knowledge, perspective, relationships, or internal resolve.' },
      ] },
    ] },

  { id: 'mt-golden', module: 'mt-form', order: 4,
    title: 'The Golden Age, and Oklahoma!',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Read a Golden Age musical as a single dramatic world, and examine a celebrated work without smoothing over what is uncomfortable in it.',
    orientation: 'One show read closely, contradictions included',
    takeaway: 'Dialogue, music, lyrics, and dance contribute to the same dramatic world.',
    contents: ['What is the “Golden Age”?', 'Oklahoma!: a major synthesis', 'The opening is already a scene', 'Courtship, resistance, and the secondary plot', 'Laurey, Jud, and the dream ballet', 'The ending is not uncomplicated'],
    sources: [
      'Rodgers & Hammerstein: Oklahoma! synopsis — https://rodgersandhammerstein.com/oklahoma-synopsis/',
    ],
    body: [
      { note: 'Historical discussion includes racist stereotypes, sexual coercion, violence, and a fictional scene involving encouragement of suicide. Plot endings are included.' },
      { h: 'What you will learn' },
      { list: [
        'Describe the contributions of the Princess Theatre musicals, Show Boat, and Oklahoma!',
        'Examine celebrated works without ignoring their contradictions.',
      ] },
      { h: 'What is the “Golden Age”?' },
      { p: 'The Broadway musical’s Golden Age is often dated approximately from Oklahoma! in 1943 to the early or mid-1960s.' },
      { p: 'It is a retrospective label, not a rule with universally agreed boundaries.' },
      { p: 'The period is associated with influential book musicals, memorable scores, ambitious choreography, and strong dramatic roles.' },
      { p: 'Important writers included:' },
      { list: [
        'Richard Rodgers and Oscar Hammerstein II.',
        'Rodgers and Lorenz Hart.',
        'Cole Porter.',
        'George and Ira Gershwin.',
        'Irving Berlin.',
        'Alan Jay Lerner and Frederick Loewe.',
      ] },
      { p: 'The term should not imply that everything before was primitive or everything afterward a decline.' },
      { p: 'It describes one influential period, not the only model musical theatre can follow.' },
      { h: 'Oklahoma!: a major synthesis' },
      { p: 'Oklahoma! opened in 1943.' },
      { p: 'Rodgers wrote the music; Hammerstein wrote the book and lyrics. The source was Lynn Riggs’s play Green Grow the Lilacs.' },
      { p: 'Agnes de Mille’s choreography was central to the musical’s dramatic achievement.' },
      { p: 'Set in Oklahoma Territory before statehood, the work brings together courtship, economic tensions, community celebration, fear, and violence.' },
      { p: 'Its importance lies in the coordination of elements:' },
      { key: 'Dialogue, music, lyrics, and dance contribute to the same dramatic world.' },
      { p: 'It did not invent each element. It made their relationship exceptionally influential.' },
      { h: 'The opening is already a scene' },
      { p: 'The opening number, “Oh, What a Beautiful Mornin’,” does more than announce that the show has begun.' },
      { p: 'Curly’s singing establishes a relationship with his surroundings and gives us a first encounter with his confidence and outlook.' },
      { p: 'For an actor, the song should not become a display detached from circumstances.' },
      { p: 'Ask:' },
      { list: [
        'Where have I come from?',
        'What am I noticing?',
        'Who can hear me?',
        'What do I want when I reach them?',
        'What does my apparent ease conceal or establish?',
      ] },
      { p: 'The audience meets a person through music, not a singer waiting for the dialogue to start.' },
      { h: 'Courtship, resistance, and the secondary plot' },
      { p: 'Curly and Laurey are attracted to one another, but their exchanges involve pride, teasing, uncertainty, and resistance.' },
      { p: 'A song can let characters deny an attraction while making it increasingly evident.' },
      { p: 'The secondary relationships involving Ado Annie, Will Parker, and Ali Hakim provide a different comic treatment of desire, commitment, and social expectations.' },
      { p: 'These scenes are part of the musical’s larger conversation about how relationships are negotiated.' },
      { p: 'They also carry dated gender assumptions and ethnic stereotyping that require critical attention.' },
      { p: 'For performance, avoid replacing these characters with a single label such as “flirt,” “fool,” or “foreigner.”' },
      { p: 'Identify the action each person takes to gain freedom, security, pleasure, or advantage.' },
      { h: 'Laurey, Jud, and the dream ballet' },
      { p: 'Laurey agrees to attend the box social with Jud, partly to provoke Curly, while also experiencing fear and uncertainty.' },
      { p: 'Her dream gives those pressures another form.' },
      { p: 'Agnes de Mille’s ballet turns desire, threat, and imagined outcomes into physical action.' },
      { p: 'It is not simply a decorative dance interlude.' },
      { p: 'The dream allows the audience to encounter relationships as Laurey experiences or fears them, rather than as a literal forecast of events.' },
      { p: 'A factual clarification: the substance associated with the dream is presented as smelling salts, not an actual magical potion that the musical asks us to believe possesses supernatural powers. Rodgers & Hammerstein: Oklahoma! synopsis' },
      { defs: [
        { label: 'The performance question', text: 'What becomes expressible through bodies, space, and rhythm that Laurey cannot straightforwardly say?' },
      ] },
      { h: 'The ending is not uncomplicated' },
      { p: 'Curly’s behaviour toward Jud includes cruelty, notably in the song that imagines Jud’s death.' },
      { p: 'Jud’s threatening and coercive behaviour is also central.' },
      { p: 'Neither should disappear behind an easy division between a flawless romantic hero and a disposable villain.' },
      { p: 'After Jud dies during the confrontation following the wedding, the community arranges an immediate trial and Curly is acquitted. That trial is an important part of the ending omitted from the transcript’s quick summary. Rodgers & Hammerstein: Oklahoma! synopsis' },
      { p: 'The celebration therefore raises questions:' },
      { list: [
        'Who belongs to this community?',
        'Whose future is protected?',
        'How does the group treat an outsider?',
        'What does it need to settle quickly so celebration can continue?',
      ] },
      { p: 'The territory’s movement toward statehood also invites questions about which histories and peoples the musical foregrounds, and which remain outside its central picture.' },
      { h: 'Knowledge check' },
      { qa: [
        { q: 'Why is the dream ballet in Oklahoma! significant?',
          a: 'It makes psychological conflict and imagined danger part of the drama through movement.' },
      ] },
    ] },

  { id: 'mt-working', module: 'mt-form', order: 5,
    title: 'Working on a Number',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Work a number from the score and its dramatic context rather than by copying a recording, and carry one dramatic life through speech, song and movement.',
    orientation: 'From the score and the scene, not from the album',
    takeaway: 'The essential question remains the same: What is happening between these people, and why does it need to happen this way?',
    contents: ['A cast recording is not the whole production', 'The Golden Age had many voices', 'Acting through a song', 'Music and movement are acting information', 'Practical exercises'],
    sources: [
      'Library of Congress: Oklahoma! recording — https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/descriptions-and-essays/women-on-the-recording-registry/',
    ],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Approach a musical number as playable action rather than a break from acting.',
      ] },
      { h: 'A cast recording is not the whole production' },
      { p: 'The 1943 Oklahoma! cast album was a major commercial and cultural landmark.' },
      { p: 'Its success helped establish the regular recording and marketing of Broadway musicals.' },
      { p: 'But “the first cast recording” is too broad a claim. Recordings involving stage casts existed earlier. The Library of Congress identifies the album more specifically as a landmark Broadway original-cast release recorded and marketed by a major company. Library of Congress: Oklahoma! recording' },
      { p: 'Recordings let audiences encounter a musical far from its theatre.' },
      { p: 'They also leave things out: scenes, staging, physical relationships, dance, and the live event.' },
      { key: 'Learn the song from the score and dramatic context, not only by imitating the album.' },
      { h: 'The Golden Age had many voices' },
      { p: 'Rodgers and Hammerstein followed Oklahoma! with works including Carousel, South Pacific, The King and I, and The Sound of Music.' },
      { p: 'Lerner and Loewe created Brigadoon and My Fair Lady.' },
      { p: 'Other important musicals included Guys and Dolls, On the Town, Wonderful Town, Kiss Me, Kate, Damn Yankees, West Side Story, and Gypsy.' },
      { p: 'Their variety matters.' },
      { p: 'They do not all use music, dance, or character in the same way. Their creative teams also extend beyond composers and lyricists to book writers, choreographers, directors, orchestrators, designers, musicians, and performers.' },
      { p: 'The history continued through concept musicals, countercultural work, megamusicals, and the many contributions of Stephen Sondheim and later artists.' },
      { p: 'The end of a survey is not the end of theatrical development.' },
      { h: 'Acting through a song' },
      { p: 'The familiar saying that characters sing when emotions become too strong for speech can be useful, but it is not a universal explanation.' },
      { p: 'A character may sing to persuade, entertain, distract, rehearse, remember, lie, or participate in a public ritual.' },
      { p: 'Before rehearsing a number, identify:' },
      { olist: [
        'The trigger: What has just happened?',
        'The listener: To whom is the song directed?',
        'The objective: What does the character want?',
        'The tactics: What do they try?',
        'The turns: Where does something change?',
        'The result: What is different afterward?',
      ] },
      { p: 'Keep responding to the scene partner, including through instrumental passages.' },
      { p: 'A sustained note does not suspend the relationship.' },
      { h: 'Music and movement are acting information' },
      { p: 'A score can guide attention through:' },
      { list: [
        'Repeated phrases.',
        'Pauses.',
        'Rhythmic urgency.',
        'Changes in accompaniment.',
        'Harmonic instability.',
        'Musical returns.',
        'Interruptions and unfinished ideas.',
      ] },
      { p: 'Do not assign a fixed emotion to every musical feature. Test how the music supports or complicates the character’s action.' },
      { p: 'The same applies to choreography.' },
      { p: 'A movement may approach, evade, offer, challenge, conceal, or claim space.' },
      { p: 'Technical execution matters, but so does the relationship that makes it necessary.' },
      { p: 'Work within a comfortable vocal and physical range. Do not force volume, range, or movement to imitate a recording or another performer.' },
      { h: 'Practical exercises' },
      { sub: 'Exercise A: The scene continues into song' },
      { p: 'Write four original lines in which one person asks another to stay.' },
      { p: 'Speak them as a scene.' },
      { p: 'Then repeat them on a simple melody of your own, preserving the same listener and objective.' },
      { p: 'Notice where the musical version changes timing, persuasion, or attention.' },
      { p: 'The aim is not vocal display. It is continuity of action.' },
      { sub: 'Exercise B: What changes during the number?' },
      { p: 'Choose a musical number you know.' },
      { p: 'Without quoting its lyrics, write:' },
      { list: [
        'What is true immediately before it?',
        'What does the character attempt?',
        'Where does their approach change?',
        'What is true immediately afterward?',
      ] },
      { p: 'If nothing changes externally, look for a change in knowledge, resolve, relationship, or the audience’s understanding.' },
      { sub: 'Exercise C: A movement sequence with a purpose' },
      { p: 'Create a short silent sequence in which two people want the same chair.' },
      { p: 'Use approach, hesitation, invitation, refusal, and retreat.' },
      { p: 'Give the sequence a clear beginning, development, and consequence.' },
      { p: 'Then add a simple rhythm without changing its dramatic purpose.' },
      { sub: 'Exercise D: A reprise with new circumstances' },
      { p: 'Create a short original phrase about looking forward to tomorrow.' },
      { p: 'Perform it once before receiving good news.' },
      { p: 'Repeat exactly the same words and melody after learning that a friend is leaving.' },
      { p: 'Explore how changed circumstances alter meaning without requiring exaggerated emotion.' },
      { h: 'Knowledge check' },
      { qa: [
        { q: 'Why should an actor study beyond the cast recording?',
          a: 'The recording cannot supply the entire script, staging, relationships, and physical action.' },
        { q: 'What must continue when dialogue becomes song?',
          a: 'The character’s circumstances, attention, objective, and relationship with the listener.' },
      ] },
      { h: 'Takeaway' },
      { p: 'The book musical does not ask actors to alternate between acting, singing, and dancing as unrelated skills.' },
      { p: 'It asks them to carry one dramatic life through several forms of expression.' },
      { p: 'Speech can establish a problem. Music can deepen or complicate it. Movement can reveal a relationship that neither character can name.' },
      { key: 'The essential question remains the same: What is happening between these people, and why does it need to happen this way?' },
    ] },

  { id: 'mt-rep-guide', module: 'mt-era', order: 6,
    title: 'How the Repertoire Is Organised',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Read the catalogue the way it is built: eight collections, a date convention, a credit key, and a song classified separately from the show it comes from.',
    orientation: 'Eight collections, and why a song needs its own tags rather than its show’s',
    reflection: 'Take a song you already sing. Which of the eight collections does the SHOW belong to, and would you tag the SONG the same way?',
    takeaway: 'Classify the song as well as the show.',
    contents: ['The eight collections', 'How Speechcraft should organise the catalogue'],
    body: [
      { defs: [
        { label: 'Date convention', text: 'Years identify the original Broadway production unless otherwise stated. These are representative listening and repertoire selections, not a complete catalogue or a list of suitable audition cuts for every performer.' },
        { label: 'Credit key', text: 'M = music; L = lyrics; M/L = both.' },
      ] },
      { h: 'The eight collections' },
      { list: [
        '1940s Standards',
        '1940–1960 Golden Age / Traditional',
        '1965–1980 Transitional / Traditional',
        'Later Transitional',
        'Early Contemporary',
        'Contemporary',
        'Pop/Rock',
        'Jukebox',
      ] },
      { p: 'Era boundaries here are proposed teaching labels rather than universal scholarly definitions. Pop/Rock and Jukebox are style tags that cut across every period, not periods of their own.' },
      { p: 'The date ranges leave out 1961 to 1964. Those years carry a Golden Age to Transitional bridge tag: How to Succeed in Business Without Really Trying, She Loves Me, Hello, Dolly!, Funny Girl and Fiddler on the Roof.' },
      { h: 'How Speechcraft should organise the catalogue' },
      { p: 'Keep the eight collections above, but give each song separate searchable fields:' },
      { table: {
        head: ['Field', 'Example'],
        rows: [
          ['Song', '“She Used to Be Mine”'],
          ['Musical', 'Waitress'],
          ['Era', 'Contemporary'],
          ['Musical style', 'Pop / singer-songwriter'],
          ['Score type', 'Original theatrical score'],
          ['Composer', 'Sara Bareilles'],
          ['Lyricist', 'Sara Bareilles'],
          ['Dramatic context', 'Jenna confronting the distance between her present life and her sense of self'],
          ['Performance format', 'Solo'],
          ['Vocal information', 'Range, tessitura, and key checked against the selected published arrangement'],
        ] } },
      { p: 'Classify the song as well as the show. One musical can contain a lyrical ballad, a comic character number, a dance song, and a pop-influenced anthem. They should not all receive identical performance tags.' },
    ] },

  { id: 'mt-rep-1940s', module: 'mt-era', order: 7,
    title: '1940s Standards',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Work the 1940s songbook repertoire: clear phrasing, lyrical elegance, conversational storytelling and a sustained melodic line.',
    takeaway: 'Songs introduced during the 1940s that belong to the American songbook tradition.',
    body: [
      { defs: [
        { label: 'Working definition', text: 'Songs introduced during the 1940s that belong to the American songbook tradition. This category includes stage and film musicals and overlaps with Golden Age repertoire.' },
        { label: 'Study focus', text: 'Clear phrasing, lyrical elegance, conversational storytelling, and sustained melodic lines.' },
      ] },
      { table: {
        head: ['Musical / source', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Pal Joey', '1940', '“Bewitched, Bothered and Bewildered”; “I Could Write a Book”', 'Richard Rodgers, M; Lorenz Hart, L'],
          ['Lady in the Dark', '1941', '“My Ship”; “The Saga of Jenny”', 'Kurt Weill, M; Ira Gershwin, L'],
          ['Meet Me in St. Louis, film', '1944', '“The Trolley Song”; “The Boy Next Door”', 'Hugh Martin and Ralph Blane, jointly credited M/L'],
          ['State Fair, film', '1945', '“It Might as Well Be Spring”; “It’s a Grand Night for Singing”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
          ['Annie Get Your Gun', '1946', '“They Say It’s Wonderful”; “I Got Lost in His Arms”', 'Irving Berlin, M/L'],
          ['Kiss Me, Kate', '1948', '“So in Love”; “Always True to You in My Fashion”', 'Cole Porter, M/L'],
        ] } },
      { defs: [
        { label: 'Core writers', text: 'Cole Porter, Irving Berlin, Richard Rodgers, Lorenz Hart, Oscar Hammerstein II, Kurt Weill, Ira Gershwin, Hugh Martin, Ralph Blane.' },
      ] },
      { p: 'Reference examples: official Pal Joey song catalogue, “My Ship” manuscript and credits, Irving Berlin’s Annie Get Your Gun.' },
    ] },

  { id: 'mt-rep-golden', module: 'mt-era', order: 8,
    title: '1940–1960 Golden Age / Traditional',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Tell a character belt from lyrical singing, shape a longer phrase, and sing a clear dramatic intention through the mid-century repertoire.',
    takeaway: 'Mid-century writing asks for one clear dramatic intention carried across a long phrase.',
    body: [
      { defs: [
        { label: 'Working definition', text: 'Mid-century musical theatre with strong roots in traditional Broadway songwriting. The period includes both lyrical, sustained singing and comic or brassy character work.' },
        { label: 'Study focus', text: 'Singing a clear dramatic intention, shaping longer phrases, and distinguishing character belt from lyrical singing.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Oklahoma!', '1943', '“Oh, What a Beautiful Mornin’”; “People Will Say We’re in Love”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
          ['Carousel', '1945', '“If I Loved You”; “Soliloquy”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
          ['South Pacific', '1949', '“Some Enchanted Evening”; “A Cockeyed Optimist”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
          ['Guys and Dolls', '1950', '“If I Were a Bell”; “Luck Be a Lady”', 'Frank Loesser, M/L'],
          ['The King and I', '1951', '“Hello, Young Lovers”; “Something Wonderful”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
          ['My Fair Lady', '1956', '“I Could Have Danced All Night”; “On the Street Where You Live”', 'Frederick Loewe, M; Alan Jay Lerner, L'],
          ['West Side Story', '1957', '“Something’s Coming”; “Somewhere”', 'Leonard Bernstein, M; Stephen Sondheim, L'],
          ['The Music Man', '1957', '“Till There Was You”; “Goodnight, My Someone”', 'Meredith Willson, M/L'],
          ['Gypsy', '1959', '“Everything’s Coming Up Roses”; “Rose’s Turn”', 'Jule Styne, M; Stephen Sondheim, L'],
          ['The Sound of Music', '1959', '“The Sound of Music”; “Climb Ev’ry Mountain”', 'Richard Rodgers, M; Oscar Hammerstein II, L'],
        ] } },
      { defs: [
        { label: 'Core writers', text: 'Rodgers and Hammerstein, Frank Loesser, Lerner and Loewe, Meredith Willson, Leonard Bernstein, Jule Styne, early Stephen Sondheim.' },
      ] },
      { p: 'The official Rodgers & Hammerstein song catalogue provides show-by-show references for their entries.' },
    ] },

  { id: 'mt-rep-transitional', module: 'mt-era', order: 9,
    title: '1965–1980 Transitional / Traditional',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Act through musical complexity: thought-driven phrasing, changing tactics and rhythmic specificity, as character psychology gets harder.',
    takeaway: 'Traditional writing and complex character psychology share this period; the acting has to follow the thought.',
    body: [
      { defs: [
        { label: 'Working definition', text: 'A period in which traditional Broadway writing coexists with increasingly complex character psychology, less conventional storytelling, and changing popular-music influences.' },
        { label: 'Study focus', text: 'Thought-driven phrasing, changing tactics, rhythmic specificity, and acting through musical complexity.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Man of La Mancha', '1965', '“The Impossible Dream”; “Dulcinea”', 'Mitch Leigh, M; Joe Darion, L'],
          ['Cabaret', '1966', '“Cabaret”; “Maybe This Time”', 'John Kander, M; Fred Ebb, L'],
          ['Company', '1970', '“Being Alive”; “The Ladies Who Lunch”', 'Stephen Sondheim, M/L'],
          ['Follies', '1971', '“Losing My Mind”; “Broadway Baby”', 'Stephen Sondheim, M/L'],
          ['A Little Night Music', '1973', '“Send in the Clowns”; “The Miller’s Son”', 'Stephen Sondheim, M/L'],
          ['A Chorus Line', '1975', '“What I Did for Love”; “Nothing”', 'Marvin Hamlisch, M; Edward Kleban, L'],
          ['Chicago', '1975', '“All That Jazz”; “Roxie”', 'John Kander, M; Fred Ebb, L'],
          ['Sweeney Todd', '1979', '“Johanna”; “Not While I’m Around”', 'Stephen Sondheim, M/L'],
        ] } },
      { p: '“Maybe This Time” was not in the original 1966 Broadway production; it appeared in the film and subsequent stage versions.' },
      { defs: [
        { label: 'Core writers', text: 'Stephen Sondheim, Kander and Ebb, Marvin Hamlisch, Edward Kleban, Mitch Leigh, Joe Darion.' },
        { label: 'A gap to account for', text: 'Your date ranges leave out 1961–1964. For Speechcraft, I would add a “Golden Age → Transitional bridge” tag for How to Succeed in Business Without Really Trying, She Loves Me, Hello, Dolly!, Funny Girl, and Fiddler on the Roof.' },
      ] },
      { p: 'Reference example: MTI’s Follies catalogue and song list.' },
    ] },

  { id: 'mt-rep-later', module: 'mt-era', order: 10,
    title: 'Later Transitional',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Separate intimate storytelling from large-scale musical expression, and sustain an extended dramatic arc on precise text.',
    takeaway: 'The eighties are not one vocal style: late traditional writing and the megamusical sit side by side.',
    body: [
      { key: 'Suggested working range: 1980–1989.' },
      { p: 'This category accommodates late traditional Broadway writing, intricate musical storytelling, and the expansive sound of the megamusical. It is not one uniform vocal style.' },
      { defs: [
        { label: 'Study focus', text: 'Extended dramatic arcs, precise text, sustained intensity, and distinguishing intimate storytelling from large-scale musical expression.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Merrily We Roll Along', '1981', '“Not a Day Goes By”; “Good Thing Going”', 'Stephen Sondheim, M/L'],
          ['Dreamgirls', '1981', '“And I Am Telling You I’m Not Going”; “I Am Changing”', 'Henry Krieger, M; Tom Eyen, L'],
          ['La Cage aux Folles', '1983', '“I Am What I Am”; “Song on the Sand”', 'Jerry Herman, M/L'],
          ['Sunday in the Park with George', '1984', '“Finishing the Hat”; “Move On”', 'Stephen Sondheim, M/L'],
          ['Les Misérables', '1987', '“I Dreamed a Dream”; “On My Own”', 'Claude-Michel Schönberg, M; Herbert Kretzmer, English L; original French lyrics by Alain Boublil and Jean-Marc Natel'],
          ['Into the Woods', '1987', '“On the Steps of the Palace”; “No One Is Alone”', 'Stephen Sondheim, M/L'],
          ['The Phantom of the Opera', '1988', '“The Music of the Night”; “Wishing You Were Somehow Here Again”', 'Andrew Lloyd Webber, M; Charles Hart, L; additional L by Richard Stilgoe'],
        ] } },
      { defs: [
        { label: 'Core writers', text: 'Stephen Sondheim, Jerry Herman, Andrew Lloyd Webber, Claude-Michel Schönberg, Herbert Kretzmer, Henry Krieger, Tom Eyen.' },
        { label: 'Cross-tag', text: 'Dreamgirls also belongs in an R&B/soul style collection; Phantom combines multiple musical influences rather than representing a purely traditional style.' },
      ] },
      { p: 'Reference example: MTI’s Sunday in the Park with George.' },
    ] },

  { id: 'mt-rep-early-contemporary', module: 'mt-era', order: 11,
    title: 'Early Contemporary',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Move between speech and song in a conversational lyric, and resist the assumption that contemporary means pop belt.',
    takeaway: 'Contemporary by date is not the same as contemporary in style.',
    body: [
      { key: 'Suggested working range: 1990–2009.' },
      { defs: [
        { label: 'Study focus', text: 'More conversational lyric delivery, flexible movement between speech and song, and the coexistence of traditional, pop-influenced, and highly individual compositional styles.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Once on This Island', '1990', '“Waiting for Life”; “The Human Heart”', 'Stephen Flaherty, M; Lynn Ahrens, L'],
          ['The Secret Garden', '1991', '“The Girl I Mean to Be”; “Lily’s Eyes”', 'Lucy Simon, M; Marsha Norman, L'],
          ['Beauty and the Beast', '1994', '“Home”; “If I Can’t Love Her”', 'Alan Menken, M; Tim Rice, L for these songs; other score lyrics by Howard Ashman'],
          ['Songs for a New World, Off-Broadway', '1995', '“Stars and the Moon”; “I’m Not Afraid of Anything”', 'Jason Robert Brown, M/L'],
          ['Ragtime', '1998', '“Your Daddy’s Son”; “Wheels of a Dream”', 'Stephen Flaherty, M; Lynn Ahrens, L'],
          ['Parade', '1998', '“You Don’t Know This Man”; “This Is Not Over Yet”', 'Jason Robert Brown, M/L'],
          ['The Last Five Years, Off-Broadway', '2002', '“Still Hurting”; “Moving Too Fast”', 'Jason Robert Brown, M/L'],
          ['Wicked', '2003', '“The Wizard and I”; “Defying Gravity”', 'Stephen Schwartz, M/L'],
          ['The Light in the Piazza', '2005', '“The Light in the Piazza”; “Love to Me”', 'Adam Guettel, M/L'],
          ['In the Heights', '2008', '“Breathe”; “It Won’t Be Long Now”', 'Lin-Manuel Miranda, M/L'],
        ] } },
      { defs: [
        { label: 'Core writers', text: 'Ahrens and Flaherty, Jason Robert Brown, Stephen Schwartz, Adam Guettel, Alan Menken, Lucy Simon, Marsha Norman, Lin-Manuel Miranda.' },
        { label: 'Important contrast', text: 'The Light in the Piazza is contemporary by date but frequently lyrical in vocal style. “Contemporary” does not automatically mean pop belt.' },
      ] },
      { p: 'Reference examples: MTI’s The Last Five Years, MTI’s Ragtime.' },
    ] },

  { id: 'mt-rep-contemporary', module: 'mt-era', order: 12,
    title: 'Contemporary',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Make a character-specific vocal choice in a repertoire with no default sound, and tag a song by style rather than by decade.',
    takeaway: 'This era needs further tags, not one default contemporary sound.',
    body: [
      { key: 'Suggested working range: 2010 onward.' },
      { defs: [
        { label: 'Study focus', text: 'Character-specific vocal choices across a wide range of styles. This category needs further tags rather than one default “contemporary sound.”' },
      ] },
      { table: {
        head: ['Musical', 'Broadway year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['The Bridges of Madison County', '2014', '“It All Fades Away”; “Almost Real”', 'Jason Robert Brown, M/L'],
          ['Fun Home', '2015', '“Ring of Keys”; “Changing My Major”', 'Jeanine Tesori, M; Lisa Kron, L'],
          ['Hamilton', '2015', '“Wait for It”; “Burn”', 'Lin-Manuel Miranda, M/L'],
          ['Waitress', '2016', '“She Used to Be Mine”; “What Baking Can Do”', 'Sara Bareilles, M/L'],
          ['Dear Evan Hansen', '2016', '“Waving Through a Window”; “Words Fail”', 'Benj Pasek and Justin Paul, M/L'],
          ['Come From Away', '2017', '“Me and the Sky”; “Stop the World”', 'Irene Sankoff and David Hein, M/L'],
          ['Hadestown', '2019', '“Flowers”; “Wait for Me”', 'Anaïs Mitchell, M/L'],
          ['SIX', '2021', '“Heart of Stone”; “I Don’t Need Your Love”', 'Toby Marlow and Lucy Moss, M/L'],
        ] } },
      { defs: [
        { label: 'Core writers', text: 'Jeanine Tesori, Lisa Kron, Lin-Manuel Miranda, Sara Bareilles, Pasek and Paul, Anaïs Mitchell, Sankoff and Hein, Marlow and Moss, Jason Robert Brown.' },
      ] },
      { p: 'These Broadway dates are not necessarily the works’ first appearances: several developed through earlier productions or recordings.' },
      { p: 'Reference examples: official Waitress credits, Concord’s Hadestown, official SIX credits.' },
    ] },

  { id: 'mt-rep-poprock', module: 'mt-style', order: 13,
    title: 'Pop/Rock',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Work groove, speech-based phrasing, stylistic articulation and microphone awareness, instead of simply singing louder.',
    takeaway: 'A cross-era style, not a period: an original theatrical score drawing on popular music.',
    body: [
      { defs: [
        { label: 'Definition', text: 'A cross-era style category, not a chronological period. The examples below have original theatrical scores drawing substantially on pop, rock, or related popular-music styles.' },
        { label: 'Study focus', text: 'Groove, speech-based phrasing, stylistic articulation, microphone awareness, and healthy vocal coordination, not simply singing louder.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Composer and lyricist'],
        rows: [
          ['Hair', '1968', '“Aquarius”; “Easy to Be Hard”', 'Galt MacDermot, M; Gerome Ragni and James Rado, L'],
          ['Jesus Christ Superstar', '1971', '“Heaven on Their Minds”; “I Don’t Know How to Love Him”', 'Andrew Lloyd Webber, M; Tim Rice, L'],
          ['Pippin', '1972', '“Corner of the Sky”; “Simple Joys”', 'Stephen Schwartz, M/L'],
          ['The Rocky Horror Show, London premiere', '1973', '“Science Fiction/Double Feature”; “Sweet Transvestite”', 'Richard O’Brien, M/L'],
          ['Rent', '1996', '“One Song Glory”; “Out Tonight”', 'Jonathan Larson, M/L'],
          ['Spring Awakening', '2006', '“Mama Who Bore Me”; “The Word of Your Body”', 'Duncan Sheik, M; Steven Sater, L'],
          ['Next to Normal', '2009', '“I Miss the Mountains”; “I’m Alive”', 'Tom Kitt, M; Brian Yorkey, L'],
          ['Kinky Boots', '2013', '“Soul of a Man”; “Hold Me in Your Heart”', 'Cyndi Lauper, M/L'],
        ] } },
      { defs: [
        { label: 'Also cross-tag here', text: 'Wicked, Waitress, Dear Evan Hansen, and SIX. Individual songs still need more precise style labels.' },
        { label: 'Core writers', text: 'Jonathan Larson, Stephen Schwartz, Andrew Lloyd Webber, Tim Rice, Duncan Sheik, Steven Sater, Tom Kitt, Brian Yorkey, Cyndi Lauper, Richard O’Brien.' },
      ] },
      { p: 'Reference example: MTI’s Spring Awakening.' },
    ] },

  { id: 'mt-rep-jukebox', module: 'mt-style', order: 14,
    title: 'Jukebox',
    attribution: 'Theatre history',
    requiredReviewer: 'theatre-history',
    objective: 'Keep a song’s musical identity while making it serve a character and a situation, and credit the songwriter rather than the recording artist.',
    takeaway: 'A musical built from an existing catalogue, which is not the same as a musical written by a pop songwriter.',
    body: [
      { defs: [
        { label: 'Definition', text: 'Musicals constructed substantially from pre-existing songs. Some tell an artist’s biography; others place an existing catalogue inside an invented story.' },
        { label: 'Study focus', text: 'Preserve the song’s musical identity while making it serve the character and situation. The recording artist is not necessarily the songwriter.' },
      ] },
      { table: {
        head: ['Musical', 'Year', 'Representative songs', 'Source catalogue / songwriting credits'],
        rows: [
          ['Mamma Mia!, London premiere', '1999', '“The Winner Takes It All”; “Dancing Queen”', 'ABBA catalogue. Benny Andersson and Björn Ulvaeus; Stig Anderson also co-wrote “Dancing Queen”'],
          ['Jersey Boys', '2005', '“Can’t Take My Eyes Off You”; “Sherry”', 'Four Seasons catalogue. Bob Gaudio and Bob Crewe wrote the first selection; Gaudio wrote “Sherry”'],
          ['Rock of Ages', '2009', '“Don’t Stop Believin’”; “We Built This City”', 'Multiple rock catalogues. First selection: Steve Perry, Neal Schon, Jonathan Cain. Second: Bernie Taupin, Martin Page, Dennis Lambert, Peter Wolf'],
          ['Beautiful: The Carole King Musical', '2014', '“So Far Away”; “Will You Love Me Tomorrow”', 'Carole King wrote the first selection; King and Gerry Goffin wrote the second. The wider score also includes Barry Mann and Cynthia Weil'],
          ['Moulin Rouge! The Musical', '2019', '“Your Song”; “Firework”', 'Multiple catalogues. First selection: Elton John and Bernie Taupin. Second: Katy Perry, Mikkel S. Eriksen, Tor Erik Hermansen, Sandy Wilhelm, Ester Dean'],
          ['& Juliet, London premiere', '2019', '“…Baby One More Time”; “Since U Been Gone”', 'Max Martin and collaborators. Martin wrote the first selection; Martin and Lukasz Gottwald wrote the second'],
        ] } },
      { defs: [
        { label: 'Important distinction', text: 'A musical written by a famous pop songwriter is not automatically jukebox. Waitress and Kinky Boots have original theatrical scores; Mamma Mia! repurposes an existing catalogue.' },
      ] },
      { p: 'Reference examples: MTI’s Mamma Mia! credits and songs, MTI’s Beautiful credits and songs.' },
    ] },
];

const SHELF_ICON = { 'mt-form': '🎵', 'mt-era': '🎹', 'mt-style': '🎸' };

export const MUSICAL_COLLECTIONS = MUSICAL_MODULES.map(m => ({
  id: m.id, icon: SHELF_ICON[m.id] ?? '🎵', img: null, title: m.title,
  lessons: MUSICAL_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
