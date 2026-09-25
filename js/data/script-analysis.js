// Script Analysis — the per-text analysis, aimed at the scenes.
//
// Owner decision 2026-09-24: of the two places the Shakespeare course
// could hang its analysis, the sonnets or the eight scenes, it hangs on
// the SCENES. A sonnet is a thought and a scene is a transaction, and
// objectives, obstacles, beats and operative words are apparatus built
// for the second one.
//
// WHAT THIS IS NOT. It does not teach objectives, actions, beats or
// subtext: Acting owns those, Question Everything and Playable Actions
// are already built, and a course that re-taught them would be worse
// than the thing itself. This SURFACES them on one particular text, the
// way a director's notebook does, and points back at the pages that
// teach the method.
//
// WHAT IS A FACT HERE AND WHAT IS A READING. Everything in `metre` and
// `patterns` is checkable on the page: a count, a rhyme, a repeated
// word, a line split between two speakers. Everything in `people` and
// `beats` is a reading, offered so an actor has something to argue
// with. Where a scene has been read one way for so long that the other
// readings have gone quiet, `contested` says so rather than settling
// it.
//
// Record shape, every field written:
//   id           the PROVIDED_SCENES id this belongs to
//   circumstances  one paragraph: what is true in the room at line one
//   form         one sentence on verse or prose, pointing at Scan
//   people       [{ who, between, want, obstacle, stake }]
//   beats        [{ title, cue, what, actions, operative, ask }]
//                  cue quotes the first words so it can be found
//                  actions [{ who, verb, action }] — `action` is a
//                  Playable Actions id ONLY where one of the twelve
//                  genuinely fits. The twelve are a teaching set, not a
//                  vocabulary for all of Shakespeare, and forcing a beat
//                  onto them would be a lie about both.
//                  operative are WORDS FROM THE TEXT, quoted exactly
//   patterns     [{ name, what }] images and rhetorical shapes
//   metre        [{ line, what }] what the scansion is doing, quoting it
//   contested    optional: a reading the scene is usually given, and
//                what the text says if you decline it
//
// REVIEW. Nothing here reaches a learner until a human approves it in
// js/data/script-analysis-reviews.js. Claude may author and revise these
// drafts and can never approve its own literary or dialect writing, and
// nothing may be batch-approved. Absence from that ledger IS draft.

export const SCRIPT_ANALYSIS = [

  // ── Macbeth, Act I Scene 7 ──────────────────────────────────
  {
    id: 'macbeth-decision',
    circumstances: 'Duncan is at supper in their house, a few rooms away, and Macbeth '
      + 'has walked out of his own feast without excusing himself. The witches have '
      + 'promised him the crown, he wrote to his wife about it before he came home, and '
      + 'the two of them have already agreed that the king dies tonight. Nothing has been '
      + 'done. The servants who carry dishes across the stage at the opening are the '
      + 'household going on as normal while this is settled.',
    form: 'Verse from end to end. What moves in this scene is not the form but the joins: '
      + 'five times one of them takes the second half of the other one’s line.',
    people: [
      { who: 'Macbeth',
        between: 'Married, and until tonight in complete confidence. She knows what he '
          + 'wants because he told her first, in writing, before he told anyone.',
        want: 'To get out of it without ever having to say that he is afraid.',
        obstacle: 'He has no argument that survives being said out loud, and some part of '
          + 'him knows it. He is also the one who raised this in the first place.',
        stake: 'Do it and he is a man who killed a sleeping guest under his own roof. '
          + 'Refuse and he has to go on living in front of her as the man who could not.' },
      { who: 'Lady Macbeth',
        between: 'The one person he cannot perform for, which is why he left the room '
          + 'rather than look at her.',
        want: 'To get him back to the point where he will do it, tonight, before the '
          + 'chance walks out of the house with the king.',
        obstacle: 'She cannot do it herself, and she cannot reason him into it, because he '
          + 'is not reasoning. So she goes at what he thinks he is instead.',
        stake: 'Everything she has already spent on this, and a marriage in which she has '
          + 'just called her husband a coward and cannot take it back.' },
    ],
    beats: [
      { title: 'Losing the argument with himself', cue: 'If it were done when ’tis done',
        what: 'He is not deciding. He is building a case, and it collapses under him. The '
          + 'first half is practical and cold: he will be caught, the poison comes back to '
          + 'his own lips. Then the practical case runs out and what arrives instead is '
          + 'pity, angels, a naked newborn baby and the whole world weeping. He has argued '
          + 'himself out of it on the grounds that it would be wrong, which is not a '
          + 'ground he can say to his wife.',
        actions: [{ who: 'Macbeth', verb: 'to test whether it holds' }],
        operative: ['done', 'quickly', 'here', 'trust', 'pity'],
        ask: 'Find the exact line where he stops calculating and starts seeing things. '
          + 'What happens in the room at that line?' },
      { title: 'The refusal', cue: 'We will proceed no further in this business',
        what: 'He closes the subject in five lines and gives her a reason about '
          + 'reputation. Not conscience, not the man asleep upstairs: gold opinions and '
          + 'new clothes. The reason he actually has is the one he has just spent thirty '
          + 'lines finding and will not repeat.',
        actions: [{ who: 'Macbeth', verb: 'to close the subject', action: 'dismiss' }],
        operative: ['honour’d', 'bought', 'Golden opinions', 'newest gloss'],
        ask: 'He has a real reason and offers a smaller one. Why this smaller one, to '
          + 'this person?' },
      { title: 'The interrogation', cue: 'Was the hope drunk',
        what: 'She does not argue. She asks. Five questions in fourteen lines, and not one '
          + 'statement until the cat in the proverb. Questions give him nothing to push '
          + 'against and make him supply the answers himself.',
        actions: [{ who: 'Lady Macbeth', verb: 'to shame him into it', action: 'punish' }],
        operative: ['drunk', 'afeard', 'coward', 'dare not', 'would'],
        ask: 'Try the speech as cold contempt, then as somebody frightened that she has '
          + 'misjudged him. Both are in the words. Which one does the next beat need?' },
      { title: 'What a man is', cue: 'I dare do all that may become a man',
        what: 'The argument narrows to one word and stays there. He defines manhood as a '
          + 'limit: there are things a man does not do. She defines it as a capacity: '
          + 'doing the thing is what would make him one. Neither of them is talking about '
          + 'the murder any more.',
        actions: [{ who: 'Macbeth', verb: 'to hold a line', action: 'justify' },
          { who: 'Lady Macbeth', verb: 'to redefine the word under him' }],
        operative: ['man', 'none', 'beast', 'durst'],
        ask: 'He says “Pr’ythee, peace!” and she keeps going. What does it cost her to '
          + 'ignore that?' },
      { title: 'The child', cue: 'I have given suck',
        what: 'The most violent thing said in the scene is said by the person who is not '
          + 'going to kill anybody, about a baby, as an illustration of keeping a promise. '
          + 'Whether the child existed is not in the play and not the actor’s problem. The '
          + 'line is aimed at him and it lands.',
        actions: [{ who: 'Lady Macbeth', verb: 'to prove what a promise is worth' }],
        operative: ['sworn', 'tender', 'dash’d'],
        ask: 'She goes here after the manhood argument has already half worked. Is this '
          + 'the finishing blow, or is it her losing control of the size of the thing?' },
      { title: 'The plan', cue: 'But screw your courage to the sticking-place',
        what: 'He asks what happens if they fail and she answers with a procedure: the '
          + 'wine, the two chamberlains, the daggers, the blame. The fear is not addressed, '
          + 'it is buried under detail, and detail is what he has been missing.',
        actions: [{ who: 'Lady Macbeth', verb: 'to make it ordinary' }],
        operative: ['fail', 'sticking-place', 'convince', 'quell'],
        ask: 'Nothing she says answers his question. Why does it work anyway?' },
      { title: 'Settled', cue: 'I am settled, and bend up',
        what: 'He comes back into the plan by improving it, which is how a frightened '
          + 'person joins something. His last two lines rhyme, and they are about wearing '
          + 'a face that is not yours. From here he is the one giving instructions.',
        actions: [{ who: 'Macbeth', verb: 'to sign on', action: 'command' }],
        operative: ['settled', 'daggers', 'False face', 'false heart'],
        ask: 'Is anything left over from the soliloquy at the end of this line, or is it '
          + 'all gone?' },
    ],
    patterns: [
      { name: 'Conditions stacked on conditions',
        what: 'The soliloquy opens with four “if” clauses before a single main statement '
          + 'arrives. A man who has decided does not speak like this.' },
      { name: 'Question against statement',
        what: 'Across the middle of the scene she asks and he asserts. Count them. The one '
          + 'who is asking is the one winning.' },
      { name: 'One word fought over',
        what: 'Man, men, man-children, beast. The scene is an argument about a definition, '
          + 'and both of them know a murder is what rides on it.' },
      { name: 'Clothes',
        what: 'Bought opinions worn in their newest gloss, hope dressed up and sobering, a '
          + 'false face put on at the end. He keeps reaching for the same image: a thing '
          + 'you put on and could take off.' },
    ],
    metre: [
      { line: '“Not cast aside so soon.” / “Was the hope drunk”',
        what: 'One line of verse split between them. She has the second half of his line, '
          + 'which means there is no pause available to her. She comes in on top of him.' },
      { line: '“Who dares do more is none.” / “What beast was’t, then,”',
        what: 'The same move again, and it is how she takes the scene: not by talking '
          + 'longer but by never letting a line of his finish in silence.' },
      { line: '“Like the poor cat i’ th’ adage?” / “Pr’ythee, peace!”',
        what: 'This time he does it to her. It is the only time, and it does not hold.' },
      { line: '“If we should fail?” / “We fail?”',
        what: 'Two fragments that do not add up to a line. The verse leaves a hole here, '
          + 'and a hole in the verse is a place where nobody is speaking.' },
      { line: '“Away, and mock the time with fairest show: / False face must hide what the '
          + 'false heart doth know.”',
        what: 'A rhymed couplet at the end of a scene of blank verse. In this theatre, '
          + 'with no curtain and no lighting change, the rhyme is how the audience is told '
          + 'the scene is over and the stage is about to be empty.' },
    ],
    contested: 'The scene is usually played as her overpowering him, and the text supports '
      + 'it. It also says, in her own line, that he is the one who broke this enterprise '
      + 'to her, and the last speech in the scene is his and is full of improvements to '
      + 'the plan. A version where she is finishing something he started is available '
      + 'without changing a word.',
  },

  // ── Macbeth, Act II Scene 2 ─────────────────────────────────
  {
    id: 'macbeth-aftermath',
    circumstances: 'Minutes later. She has drugged the grooms and is waiting in the dark. '
      + 'He is upstairs with the daggers. The whole castle is asleep and will wake at any '
      + 'sound, so everything in this scene is said quietly by people who want to shout. '
      + 'The plan still needs one thing finished: the daggers have to be left on the '
      + 'drugged men before morning.',
    form: 'Verse throughout, and broken into pieces. Whole lines are rare in the middle of '
      + 'this scene. Scan it and look at how many counts are under ten.',
    people: [
      { who: 'Macbeth',
        between: 'The same marriage as the scene before, one murder later. He has stopped '
          + 'performing for her, which is new.',
        want: 'Somebody to tell him what has happened to him.',
        obstacle: 'The only person present has no interest in the question and a job that '
          + 'needs doing in the next few minutes.',
        stake: 'He has heard a voice tell him he will never sleep again, and he believes '
          + 'it. Everything after this scene is that being true.' },
      { who: 'Lady Macbeth',
        between: 'Still the one running it, and for the last time in the play.',
        want: 'To get the daggers back downstairs and both of them into bed before the '
          + 'knocking gets answered.',
        obstacle: 'Her husband has come back with the evidence in his hands and wants to '
          + 'talk about the word Amen.',
        stake: 'If she cannot pull him back into the room in the next two minutes they are '
          + 'both found standing in blood when the door opens.' },
    ],
    beats: [
      { title: 'Waiting', cue: 'That which hath made them drunk',
        what: 'Alone, listening, talking herself steady. She interrupts herself twice to '
          + 'listen. The last thing she says before he comes down is that she could not do '
          + 'it herself because the sleeping man looked like her father, and she says it to '
          + 'nobody.',
        actions: [{ who: 'Lady Macbeth', verb: 'to hold her nerve' }],
        operative: ['bold', 'fire', 'owl', 'Hark', 'father'],
        ask: 'That line about her father is a confession with no one in the room. Does she '
          + 'mean to say it?' },
      { title: 'Did you hear', cue: 'I have done the deed',
        what: 'Five speeches, most of them one word. When, Now, Ay. The verse is cut into '
          + 'single feet and passed back and forth, which is an instruction about speed: '
          + 'there is no room to think between these.',
        actions: [{ who: 'Macbeth', verb: 'to check whether the world noticed' },
          { who: 'Lady Macbeth', verb: 'to keep him on the facts' }],
        operative: ['deed', 'noise', 'When', 'Now'],
        ask: 'Play it slowly once and hear what is wrong with it. The text will not carry '
          + 'the pauses.' },
      { title: 'Amen', cue: 'There’s one did laugh in’s sleep',
        what: 'He tells it as a story, in order, with detail, and the point of the story is '
          + 'one word he could not say. Her answer is four words: consider it not so '
          + 'deeply. She is not being cruel yet, she is being practical, and practical is '
          + 'the wrong instrument.',
        actions: [{ who: 'Macbeth', verb: 'to be told what it means', action: 'confess' },
          { who: 'Lady Macbeth', verb: 'to shut the subject down', action: 'dismiss' }],
        operative: ['Amen', 'blessing', 'Stuck', 'throat'],
        ask: 'He asks a real question here. What would happen if she answered it?' },
      { title: 'Sleep no more', cue: 'Methought I heard a voice cry',
        what: 'He stops reporting and starts listing. Six descriptions of sleep in five '
          + 'lines, each more beautiful than the last, from a man who has just been told he '
          + 'will not get any. It is the most ordered speech in the scene and it is the '
          + 'moment he is furthest gone.',
        actions: [{ who: 'Macbeth', verb: 'to name what he has lost' }],
        operative: ['sleep', 'innocent', 'knits up', 'nourisher'],
        ask: 'Her reply is “What do you mean?” Is that impatience, or is it the first time '
          + 'she is frightened of him?' },
      { title: 'The daggers', cue: 'Why did you bring these daggers from the place?',
        what: 'She notices what is in his hands. The scene turns from what he heard to '
          + 'what he is holding, and he refuses for the first time. So she goes herself, '
          + 'and her exit line is about painting: blood as gilt, a corpse as a picture, '
          + 'fear as a childish thing.',
        actions: [{ who: 'Lady Macbeth', verb: 'to send him back', action: 'command' },
          { who: 'Macbeth', verb: 'to refuse' }],
        operative: ['daggers', 'Infirm of purpose', 'pictures', 'gild', 'guilt'],
        ask: 'Gild and guilt are the same sound. Is she making a joke, and if she is, what '
          + 'kind of person makes it here?' },
      { title: 'His hands', cue: 'Whence is that knocking?',
        what: 'Alone, he looks at his hands and the language goes enormous: all of '
          + 'Neptune’s ocean, the multitudinous seas. Then she comes back and answers the '
          + 'same question in six words. A little water clears us of this deed.',
        actions: [{ who: 'Macbeth', verb: 'to measure what he has done' }],
        operative: ['knocking', 'blood', 'Clean', 'incarnadine', 'red'],
        ask: 'Their two answers about washing are the whole marriage. Say them one after '
          + 'the other and see what the scene is really about.' },
      { title: 'Go to bed', cue: 'My hands are of your color',
        what: 'She has done the job and come back, and the first thing she says is that '
          + 'her hands match his. Then the practical list: nightgown, chamber, do not look '
          + 'like people who have been awake. His last line is a wish that the knocking '
          + 'could wake the man he has killed.',
        actions: [{ who: 'Lady Macbeth', verb: 'to get them both offstage' }],
        operative: ['color', 'white', 'water', 'knocking', 'couldst'],
        ask: 'He does not answer anything she says in this last exchange. When did he stop '
          + 'talking to her?' },
    ],
    patterns: [
      { name: 'One word, over and over',
        what: 'Sleep nine times, Amen four, hand or hands five. He is not choosing these. '
          + 'A word gets stuck and the speech circles it.' },
      { name: 'Red against white',
        what: 'Blood, gilding, incarnadine, the green sea turned one red, and then her '
          + 'heart so white. The scene is painted in two colours.' },
      { name: 'Enormous against small',
        what: 'All great Neptune’s ocean, and a little water. Same question, and the size '
          + 'of the answer is the whole difference between them.' },
      { name: 'Sound offstage',
        what: 'An owl, a cricket, a voice in his head, and then the knocking, which arrives '
          + 'four times and gets louder. Nothing in this scene is looked at. Everything is '
          + 'heard.' },
    ],
    metre: [
      { line: '“Did not you speak?” / “When?” / “Now.” / “As I descended?” / “Ay.”',
        what: 'A line of verse cut into five pieces across two people. The scan will show '
          + 'counts of one and two. This is the fastest writing in the play and the text '
          + 'refuses to let either of them pause.' },
      { line: '“Hark!—Who lies i’ th’ second chamber?” / “Donalbain.”',
        what: 'One shared line, cleanly halved. Her answer is a name and nothing else.' },
      { line: '“Making the green one red.”',
        what: 'A short line, and then she walks in. The missing half of that line is the '
          + 'time it takes her to cross the stage.' },
      { line: '“The sleepy grooms with blood.” / “I’ll go no more:”',
        what: 'He refuses on the back half of her line, which is as close to shouting as '
          + 'this scene gets.' },
      { line: '“To know my deed, ’twere best not know myself.”',
        what: 'The last regular line in the scene, and it is the one with a dash of '
          + 'knocking written into the middle of it.' },
    ],
    contested: 'This is often the scene where she is in charge and he falls apart, and it '
      + 'plays. But she begins it alone, talking herself steady, and admits she could not '
      + 'do the killing because the man looked like her father. Whoever is holding this '
      + 'together has already told the audience what it is costing.',
  },

  // ── Hamlet, Act III Scene 1 ─────────────────────────────────
  {
    id: 'hamlet-nunnery',
    circumstances: 'Her father and the king have put her in this corridor with a prayer '
      + 'book and told her to walk there, and they are listening from behind something. '
      + 'She has agreed to it. Hamlet has just decided, out loud and alone, that the only '
      + 'thing stopping anybody from killing themselves is not knowing what comes next. '
      + 'Whether he knows they are listening is the oldest open question in the play and '
      + 'the text does not settle it.',
    form: 'The scene crosses. Verse through the soliloquy and the returned gifts, prose '
      + 'from the moment he laughs, and verse again when she is alone. Open Scan and watch '
      + 'the crossing: it is the most useful thing in this scene.',
    people: [
      { who: 'Hamlet',
        between: 'They were something to each other and it has been stopped, by her father '
          + 'and then by her. He has not been allowed to see her for months.',
        want: 'To make her admit that she is part of it.',
        obstacle: 'She will not, and possibly cannot, and every answer she gives is the '
          + 'answer of somebody being listened to.',
        stake: 'If she is in on it then there is nobody left, which is the conclusion he '
          + 'spends the scene reaching and appears to want.' },
      { who: 'Ophelia',
        between: 'The man she was in love with, being handed back his presents on her '
          + 'father’s instruction while her father listens.',
        want: 'To do what she was told and get out of the corridor.',
        obstacle: 'She prepared for a conversation and is given something else entirely. '
          + 'Her prepared speech runs out four lines in.',
        stake: 'She is not allowed to tell him the truth, and lying to him is what breaks '
          + 'everything, including eventually her.' },
    ],
    beats: [
      { title: 'Alone', cue: 'To be, or not to be',
        what: 'Not a poem and not a mood. It is a man working out a problem in order, and '
          + 'he reaches an answer: the reason people go on is that they do not know what '
          + 'is on the other side. Then he sees her and stops.',
        actions: [{ who: 'Hamlet', verb: 'to think it through to the end' }],
        operative: ['question', 'rub', 'dread', 'conscience', 'action'],
        ask: 'Where is the first place he could stop and does not? That is where the '
          + 'speech is being driven rather than performed.' },
      { title: 'The gifts', cue: 'My lord, I have remembrances of yours',
        what: 'She has a speech ready and she has clearly written it. It ends in a rhyme, '
          + 'which is the giveaway: nobody rhymes by accident in the middle of a corridor. '
          + 'He refuses to take them and denies ever having given them.',
        actions: [{ who: 'Ophelia', verb: 'to get through it as instructed' },
          { who: 'Hamlet', verb: 'to deny the whole thing' }],
        operative: ['remembrances', 'longed long', 'unkind', 'There'],
        ask: 'How long has she been carrying those objects around waiting for this?' },
      { title: 'The turn', cue: 'Ha, ha! Are you honest?',
        what: 'He laughs and the verse stops. Four short exchanges, then the prose opens '
          + 'out and does not close again while he is on stage. Nothing has been said yet '
          + 'about what is really happening. The form changed first.',
        actions: [{ who: 'Hamlet', verb: 'to begin the test', action: 'confront' }],
        operative: ['honest', 'fair', 'honesty', 'beauty'],
        ask: 'Something happened between the rhyme and the laugh. Decide what he saw or '
          + 'heard, and play that, not the laugh.' },
      { title: 'I loved you not', cue: 'I did love you once',
        what: 'Two sentences four lines apart that contradict each other flatly, and both '
          + 'are said as statements of fact. Her answers get shorter each time until she is '
          + 'down to six words.',
        actions: [{ who: 'Hamlet', verb: 'to take it back' },
          { who: 'Ophelia', verb: 'to keep standing there' }],
        operative: ['love', 'believed', 'deceived'],
        ask: 'Which of the two is the lie? Play it as though you know, then swap, and keep '
          + 'the one that makes the rest of the scene harder.' },
      { title: 'Get thee to a nunnery', cue: 'Get thee to a nunnery',
        what: 'The longest speech he gives her is about himself: proud, revengeful, '
          + 'ambitious. Then the question that gives the scene away. Where is your father. '
          + 'She says at home, and it is the one thing in the scene that is definitely '
          + 'false.',
        actions: [{ who: 'Hamlet', verb: 'to warn her off himself', action: 'warn' }],
        operative: ['nunnery', 'knaves', 'father', 'home'],
        ask: 'Play the whole scene once as though he works it out at that answer, and once '
          + 'as though he knew before he came in. They are different plays.' },
      { title: 'Everything is a woman’s fault', cue: 'If thou dost marry',
        what: 'It widens from her to all women, which is how a person avoids saying the '
          + 'thing about one person. Painting, jigging, ambling, lisping. He leaves in the '
          + 'middle of it, on a repetition he has already used four times.',
        actions: [{ who: 'Hamlet', verb: 'to punish her for somebody else', action: 'punish' }],
        operative: ['paintings', 'another', 'wantonness', 'marriages'],
        ask: 'He is not describing her and never has been. Who is he describing?' },
      { title: 'Alone again', cue: 'O, what a noble mind is here o’erthrown!',
        what: 'He goes and the verse comes back with her. She has one speech to herself in '
          + 'the whole play and she spends it on him: what he was, in a formal list, and '
          + 'then two lines on herself. The last line puts what she saw and what she is '
          + 'seeing into the same breath.',
        actions: [{ who: 'Ophelia', verb: 'to put it in order so it can be borne' }],
        operative: ['noble', 'quite, quite down', 'jangled', 'woe'],
        ask: 'She does not cry in this speech and she does not blame anybody. What does it '
          + 'take to do that?' },
    ],
    patterns: [
      { name: 'Verse, prose, verse',
        what: 'He drops the form and she has to follow him into it. She gets it back the '
          + 'moment he leaves. Neither of them mentions it, and it is the clearest thing in '
          + 'the scene.' },
      { name: 'Pairs set against each other',
        what: 'Honest against fair, beauty against honesty, virtue against the old stock, '
          + 'one face against another. His prose is not disordered. It is argument, built '
          + 'in pairs, and it never once lands on what is actually wrong.' },
      { name: 'A rhyme in the middle of a corridor',
        what: 'Her one couplet, on the noble mind and unkind givers, is the only rhyme in '
          + 'the exchange. It is prepared speech in a scene of unprepared ones.' },
      { name: 'The threefold list',
        what: 'The courtier’s, soldier’s, scholar’s, eye, tongue, sword. Three men and '
          + 'three instruments, to be matched up by the listener. She is building him a '
          + 'monument while he is still alive.' },
    ],
    metre: [
      { line: '“To be, or not to be, that is the question:”',
        what: 'Eleven syllables. The most famous line in English does not scan as a regular '
          + 'pentameter: the extra unstressed syllable on question is a feminine ending, '
          + 'and the line goes out on a falling beat rather than a landing one.' },
      { line: '“Must give us pause. There’s the respect”',
        what: 'Short. A line missing its last beats is a place where an actor chooses: fill '
          + 'it with the pause the line is describing, or press straight on and let the gap '
          + 'sit somewhere else.' },
      { line: '“Good my lord,” / “I humbly thank you; well, well, well.”',
        what: 'Her first words are half a line, so she comes in on the end of his. She has '
          + 'been waiting for him to stop.' },
      { line: '“There, my lord.”',
        what: 'Three syllables on their own, immediately after the prepared couplet. The '
          + 'speech she rehearsed is finished and this is what she has left.' },
      { line: '“T’have seen what I have seen, see what I see.”',
        what: 'The last line of the scene puts the same verb in past and present inside ten '
          + 'syllables. Nothing is left over.' },
    ],
    contested: 'Whether Hamlet knows he is being overheard, and from when, is not decided '
      + 'by the text of this scene. Some editions and many productions have him spot the '
      + 'listeners; others hang everything on her answer about her father. Pick one and '
      + 'play it without hedging, but do not let anybody tell you the page settles it.',
  },

  // ── Much Ado About Nothing, Act IV Scene 1 ──────────────────
  {
    id: 'muchado-killclaudio',
    circumstances: 'A church, minutes after a wedding was stopped. Claudio has publicly '
      + 'called Hero unchaste at the altar, her father has believed him, and she has '
      + 'fainted and been carried out. The friar has proposed pretending she is dead until '
      + 'the truth comes out. Everyone else has just left. These two have spent the whole '
      + 'play insulting each other in front of company and have never been alone.',
    form: 'Prose from the first line to the last, and it is not casual. Beatrice builds in '
      + 'threes, repeats to a count, and holds the floor. Prose in this play is the '
      + 'register of people who are good at talking.',
    people: [
      { who: 'Benedick',
        between: 'The man she has been publicly at war with for years, who is also '
          + 'Claudio’s closest friend and just stayed behind in an empty church.',
        want: 'To say he loves her, and to have that be enough.',
        obstacle: 'It is not enough, and what she asks for instead means killing the friend '
          + 'he came here with.',
        stake: 'Whichever way he answers, he loses one of them.' },
      { who: 'Beatrice',
        between: 'The one man in the room who might act, and the only person she has ever '
          + 'been afraid to be honest with.',
        want: 'Someone to do to Claudio what she would do if she were allowed.',
        obstacle: 'She cannot do it herself, and saying so out loud in front of him is the '
          + 'most humiliating thing in the scene.',
        stake: 'Her cousin has been destroyed in public by a man who will suffer nothing '
          + 'for it, and the law and her family have already sided with him.' },
    ],
    beats: [
      { title: 'Circling', cue: 'Lady Beatrice, have you wept all this while?',
        what: 'Eight exchanges of nothing much, both of them saying almost what they mean. '
          + 'She puts the request into the room twice before he catches it: the man who '
          + 'would right her, a man’s office but not yours. He answers neither.',
        actions: [{ who: 'Benedick', verb: 'to find a way in', action: 'draw-out' },
          { who: 'Beatrice', verb: 'to see whether he will offer' }],
        operative: ['weep', 'wronged', 'right her', 'office'],
        ask: 'She has already asked, twice, in the third person. Does he miss it or avoid '
          + 'it?' },
      { title: 'The confession', cue: 'I do love nothing in the world so well as you',
        what: 'He says it and immediately asks whether it is strange, which takes half of '
          + 'it back. Her answer is the most tangled sentence she speaks in the play: as '
          + 'possible, but believe me not, and yet I lie not, I confess nothing nor deny '
          + 'nothing. Then she gets out of it by mentioning her cousin.',
        actions: [{ who: 'Benedick', verb: 'to risk it', action: 'confess' },
          { who: 'Beatrice', verb: 'to say it without saying it' }],
        operative: ['love', 'strange', 'confess nothing', 'deny nothing'],
        ask: 'Read her sentence aloud and find how many times it reverses. What is she '
          + 'protecting?' },
      { title: 'Two words', cue: 'Kill Claudio',
        what: 'He says come, bid me do anything for thee, which is a formula, and she takes '
          + 'it literally. Two words. It is the shortest speech in the scene and everything '
          + 'before it was the approach.',
        actions: [{ who: 'Beatrice', verb: 'to collect', action: 'command' },
          { who: 'Benedick', verb: 'to get out of it' }],
        operative: ['anything', 'Kill Claudio', 'not for the wide world'],
        ask: 'How long is the silence before he answers? Decide it, because the scene '
          + 'changes shape depending.' },
      { title: 'Leaving', cue: 'You kill me to deny it. Farewell.',
        what: 'She starts leaving and keeps not leaving. Three times he tries to say her '
          + 'name and three times she talks over him, and the text writes it out: Hear me '
          + 'Beatrice, Nay but Beatrice, and then Beat, cut off mid-word.',
        actions: [{ who: 'Beatrice', verb: 'to refuse the compromise' },
          { who: 'Benedick', verb: 'to hold her in the room' }],
        operative: ['gone', 'go', 'friends', 'enemy'],
        ask: 'She says she is gone though she is here. Why does she stay for the whole '
          + 'speech?' },
      { title: 'O that I were a man', cue: 'Is he not approved in the height a villain',
        what: 'The engine of the scene. Three times she wishes she were a man, and between '
          + 'them the charge is laid out in triples: slandered, scorned, dishonoured. '
          + 'Public accusation, uncovered slander, unmitigated rancour. It finishes on the '
          + 'flattest sentence she has: she cannot be a man by wishing, so she will die a '
          + 'woman grieving.',
        actions: [{ who: 'Beatrice', verb: 'to make him feel the size of it' }],
        operative: ['man', 'manhood', 'melted', 'tongue', 'wishing'],
        ask: 'This is funny in performance and it is not a joke. Where exactly does the '
          + 'laughter have to stop?' },
      { title: 'Enough', cue: 'Enough! I am engaged, I will challenge him.',
        what: 'One word and it is decided. He asks her one question first, whether she '
          + 'truly believes it, and she answers in eleven words. Then everything is '
          + 'practical: kiss your hand, comfort your cousin, say she is dead.',
        actions: [{ who: 'Benedick', verb: 'to take her side against his own' }],
        operative: ['Enough', 'engaged', 'challenge', 'dear account'],
        ask: 'He changed on her answer, not on her speech. What did the answer give him '
          + 'that the speech did not?' },
    ],
    patterns: [
      { name: 'Things in threes',
        what: 'Slandered, scorned, dishonoured. Accusation, slander, rancour. Wronged, '
          + 'slandered, undone. She builds the same shape every time she is serious, and '
          + 'the third item is always the worst one.' },
      { name: 'Swearing by a hand',
        what: 'By my sword, by this hand, twice. He keeps offering oaths and she keeps '
          + 'refusing them and asking for a use instead. Use it for my love some other way '
          + 'than swearing by it.' },
      { name: 'Manhood as the argument',
        what: 'A man’s office, would be a man for my sake, manhood melted into curtsies, '
          + 'men turned into tongue. The same word another famous scene fights over, used '
          + 'here by the person who is not allowed to claim it.' },
      { name: 'Interruption written into the text',
        what: 'His three attempts get shorter: Hear me Beatrice, Nay but Beatrice, Beat. '
          + 'The dashes are the edition’s, and the shrinking is unmistakable.' },
    ],
    metre: [
      { line: 'The whole scene',
        what: 'There is no metre here and nothing in Scan is flagged. Prose has no count to '
          + 'miss, so the marks show only where natural word stress falls and the unit is '
          + 'the sentence.' },
      { line: '“Kill Claudio.”',
        what: 'Two words against sentences that run to fifty. The scene is built to make '
          + 'that length land, so the surrounding speeches have to be genuinely fluent.' },
      { line: '“Beat—”',
        what: 'A name cut in half. The only thing in the scene shorter than her demand.' },
      { line: '“I cannot be a man with wishing, therefore I will die a woman with grieving.”',
        what: 'After four sentences of escalation this one is balanced, plain and slow. In '
          + 'prose that shift is what a metrical change does in verse.' },
    ],
  },

  // ── Julius Caesar, Act IV Scene 3 ───────────────────────────
  {
    id: 'jc-quarrel',
    circumstances: 'A tent on campaign, months after they killed Caesar. Antony and '
      + 'Octavius are raising armies against them, Brutus has just publicly condemned one '
      + 'of Cassius’s officers for taking bribes, and Cassius has been refusing Brutus '
      + 'money he asked for. They came in here to have this out in private. Neither of them '
      + 'knows yet that Brutus has had news from Rome that he is not mentioning.',
    form: 'Verse, and full of half lines. Almost every turn of this argument happens on a '
      + 'line the other man started.',
    people: [
      { who: 'Cassius',
        between: 'Older, the better soldier, the one who talked Brutus into the '
          + 'assassination, and the junior partner in every conversation since.',
        want: 'To be treated as an equal, out loud, by the man he recruited.',
        obstacle: 'He is in the wrong about the bribes and both of them know it, so he '
          + 'cannot argue the point he actually cares about.',
        stake: 'If Brutus genuinely despises him then the last two years bought nothing.' },
      { who: 'Brutus',
        between: 'The man whose name made the assassination respectable, using it as a '
          + 'weapon in a private argument.',
        want: 'To be right, and to have being right be enough.',
        obstacle: 'He is also raising money and asking Cassius for a share of it, which he '
          + 'gets to later and does not begin with.',
        stake: 'The alliance is the only thing between them and Antony, and he is spending '
          + 'it on a point of principle in a tent.' },
    ],
    beats: [
      { title: 'The charge', cue: 'That you have wrong’d me doth appear in this',
        what: 'Cassius opens with a grievance about procedure and Brutus answers by '
          + 'enlarging it into corruption. Four exchanges and they are already past the '
          + 'officer and onto each other’s characters.',
        actions: [{ who: 'Cassius', verb: 'to lodge a complaint' },
          { who: 'Brutus', verb: 'to raise the charge', action: 'confront' }],
        operative: ['wrong’d', 'slighted off', 'itching palm', 'undeservers'],
        ask: 'Brutus escalates first. Is that temper, or is it strategy from a man who '
          + 'wants something later?' },
      { title: 'Remember March', cue: 'Remember March, the Ides of March remember',
        what: 'He goes back to the murder and uses it as a moral standard. We killed the '
          + 'first man in the world for justice, and now this. The line about being a dog '
          + 'and baying at the moon is the most contemptuous thing either of them says.',
        actions: [{ who: 'Brutus', verb: 'to shame him with what they did', action: 'punish' }],
        operative: ['justice', 'Contaminate', 'trash', 'dog'],
        ask: 'Cassius does not answer the argument. Notice what he answers instead.' },
      { title: 'Soldier against soldier', cue: 'Brutus, bait not me',
        what: 'Rank, age, experience. I am a soldier, I. Older in practice, abler than '
          + 'yourself. Brutus refuses it in five words and the exchange breaks into single '
          + 'lines: I am. I say you are not.',
        actions: [{ who: 'Cassius', verb: 'to pull rank', action: 'intimidate' },
          { who: 'Brutus', verb: 'to refuse it flatly', action: 'dismiss' }],
        operative: ['soldier', 'Older', 'abler', 'slight man'],
        ask: 'Away, slight man is the worst insult in the scene. What does Cassius do with '
          + 'the three seconds after it?' },
      { title: 'Must I', cue: 'Must I give way and room to your rash choler?',
        what: 'Five questions beginning the same way, stacked. Must I give way, must I '
          + 'budge, must I observe you, must I stand and crouch. Then the threat underneath '
          + 'all of it: from this day forth I will laugh at you.',
        actions: [{ who: 'Brutus', verb: 'to make him ridiculous' }],
        operative: ['Must I', 'budge', 'crouch', 'mirth', 'waspish'],
        ask: 'Anger this controlled is a decision. When did he decide?' },
      { title: 'The correction', cue: 'You wrong me every way, you wrong me, Brutus',
        what: 'Cassius corrects a word. He said elder soldier, not better. It is small and '
          + 'true and nobody cares, and he is reduced to it. Then the durst exchange, six '
          + 'uses of one word in nine lines, the fastest passage in the scene.',
        actions: [{ who: 'Cassius', verb: 'to get one thing conceded', action: 'appeal-to' },
          { who: 'Brutus', verb: 'to concede nothing' }],
        operative: ['elder', 'better', 'durst', 'care not'],
        ask: 'If you did, I care not. Is that the cruellest line here, or is it the moment '
          + 'Brutus stops fighting and starts waiting?' },
      { title: 'The money', cue: 'I did send to you / For certain sums of gold',
        what: 'The real subject arrives two thirds of the way in. Brutus will not raise '
          + 'money by vile means and asked Cassius to raise it instead, and was refused. It '
          + 'is the only part of the argument where he is plainly in the wrong, and it is '
          + 'the part he shouts hardest about.',
        actions: [{ who: 'Brutus', verb: 'to be owed something' }],
        operative: ['denied', 'vile means', 'coin my heart', 'thunderbolts'],
        ask: 'He says he cannot raise money by vile means and asked Cassius to. Does Brutus '
          + 'hear that as he says it?' },
      { title: 'The dagger', cue: 'There is my dagger, / And here my naked breast',
        what: 'Cassius stops arguing and turns the fight on himself: take it, strike as you '
          + 'did at Caesar. It is the only move left that Brutus cannot win, and it works. '
          + 'How much of it is real despair and how much is an old soldier who knows what '
          + 'it will do is the actor’s decision.',
        actions: [{ who: 'Cassius', verb: 'to make him choose' }],
        operative: ['dagger', 'naked breast', 'heart', 'Strike', 'lovedst'],
        ask: 'Play it as genuine and it is unbearable. Play it as tactics and it is a man '
          + 'who has done this before. Which one does the reconciliation need?' },
      { title: 'Friends again', cue: 'Sheathe your dagger',
        what: 'Brutus gives way on the back half of Cassius’s line, apologises by '
          + 'describing his own temper as flint, and admits he was ill-tempered. Then a '
          + 'hand, a heart, and a joke about Cassius’s mother. They are friends again in '
          + 'fourteen lines and nothing has been settled.',
        actions: [{ who: 'Brutus', verb: 'to end it', action: 'forgive' },
          { who: 'Cassius', verb: 'to be taken back' }],
        operative: ['Sheathe', 'flint', 'ill-temper’d', 'hand', 'heart'],
        ask: 'Not one of the accusations has been withdrawn. What did they settle instead?' },
    ],
    patterns: [
      { name: 'Taking the other man’s word and throwing it back',
        what: 'An itching palm. Chastisement. All this. Better. Durst. Each of them seizes '
          + 'the last thing said and repeats it as an outrage. The quarrel has almost no '
          + 'new vocabulary in it.' },
      { name: 'The same opening, five times',
        what: 'Must I give way, must I budge, must I observe you, must I stand and crouch. '
          + 'Repeating the opening of a sentence is how a speaker refuses to be '
          + 'interrupted.' },
      { name: 'Money words and body words',
        what: 'Bribes, gold, trash, drachmas, counters, against palm, fingers, heart, blood, '
          + 'hands, breast. He accuses with coins and Cassius answers with anatomy.' },
      { name: 'The friend and the flatterer',
        what: 'A friend should bear his friend’s infirmities. A flatterer’s eye would not '
          + 'see such faults. Under the money and the rank, the argument is about what a '
          + 'friend is allowed to say, and both of them lose it.' },
    ],
    metre: [
      { line: '“To undeservers.” / “I an itching palm!”',
        what: 'Cassius takes the second half of the line. All through this scene the '
          + 'argument accelerates by one man finishing the other’s verse line, and the scan '
          + 'will show them as pairs of short counts that add to ten.' },
      { line: '“Away, slight man!” / “Is’t possible?” / “Hear me, for I will speak.”',
        what: 'Three fragments in a row. The verse is being handed back and forth in '
          + 'pieces, and there is no room anywhere in it for a considered reply.' },
      { line: '“I durst not?” / “No.” / “What? durst not tempt him?” / “For your life you '
          + 'durst not.”',
        what: 'The shortest exchange in the scene, on one repeated word. A single syllable '
          + 'gets a whole speech to itself.' },
      { line: '“Than ever thou lovedst Cassius.” / “Sheathe your dagger.”',
        what: 'The reconciliation begins on the back half of the line Cassius was using to '
          + 'offer his own death. Brutus does not wait, which is the apology.' },
      { line: '“Give me your hand.” / “And my heart too.”',
        what: 'One line, halved, and it is the only time in the scene they share a line '
          + 'without interrupting each other.' },
    ],
  },

  // ── Romeo and Juliet, Act II Scenes 1 and 2 ─────────────────
  {
    id: 'romeo-juliet-balcony',
    circumstances: 'An hour after a party at which two strangers met, kissed, and each '
      + 'then discovered the other belongs to the family they are forbidden to speak to. He '
      + 'has run from his friends and climbed the orchard wall. She is at a window alone in '
      + 'the middle of the night and does not know he is there. Both of them are found out '
      + 'in this scene: she says everything she thinks before she learns anyone is '
      + 'listening.',
    form: 'Verse, and the rhymes are doing structural work. Watch where couplets appear: '
      + 'they cluster at the exits, and the scene will not let anybody exit.',
    people: [
      { who: 'Romeo',
        between: 'A stranger he has met once and cannot stop looking at, whose family kills '
          + 'people like him.',
        want: 'To be given something he can hold on to before the night ends.',
        obstacle: 'Every vow he tries to make gets stopped, three times, mid-line.',
        stake: 'If he is caught in this garden he is killed, and the text says so twice.' },
      { who: 'Juliet',
        between: 'Someone who has just overheard the most private thing she has ever said.',
        want: 'To find out whether this is real before she commits to it, and to commit to '
          + 'it either way.',
        obstacle: 'She has already given herself away, so the usual apparatus of courtship '
          + 'is unavailable and she says so.',
        stake: 'She is thirteen, she is promised elsewhere, and she is proposing marriage '
          + 'to an enemy in a garden where her kinsmen are asleep.' },
    ],
    beats: [
      { title: 'Overheard from outside', cue: 'Come, he hath hid himself among these trees',
        what: 'His friends are hunting him with jokes he can hear. The lead-in is coarse, '
          + 'public and rhymed, and the first line he speaks answers it: he jests at scars '
          + 'that never felt a wound. The scene starts by contrasting two ways of talking '
          + 'about sex.',
        actions: [{ who: 'Mercutio', verb: 'to smoke him out' }],
        operative: ['blind', 'mark', 'scars', 'wound'],
        ask: 'He is listening to that. How much of the next speech is a reply to it?' },
      { title: 'Watching her', cue: 'But soft, what light through yonder window breaks?',
        what: 'Twenty-five lines of a man talking to himself about a woman who cannot hear '
          + 'him, working up to speaking and not doing it. He interrupts his own praise '
          + 'twice to talk himself down: what of that, I am too bold.',
        actions: [{ who: 'Romeo', verb: 'to keep from being seen' }],
        operative: ['light', 'sun', 'envious', 'bold', 'glove'],
        ask: 'Find the two places he nearly speaks and stops. What stops him?' },
      { title: 'The name', cue: 'O Romeo, Romeo, wherefore art thou Romeo?',
        what: 'Wherefore means why, not where: she is asking why he has to be who he is. '
          + 'She works it out logically. The name is not a hand or a foot, it is not part '
          + 'of him, so take it off. She reaches a conclusion and offers everything on it, '
          + 'to nobody, and he answers out of the dark.',
        actions: [{ who: 'Juliet', verb: 'to reason her way out of it' },
          { who: 'Romeo', verb: 'to take the offer before she can withdraw it' }],
        operative: ['name', 'rose', 'doff', 'Take all myself'],
        ask: 'Take all myself, and then a voice in the garden. How long before she can '
          + 'speak again?' },
      { title: 'Found out', cue: 'What man art thou that, thus bescreen’d in night',
        what: 'The practicalities arrive fast: who are you, how did you get in, they will '
          + 'kill you. She asks four questions in a row about danger and he answers each '
          + 'one with a metaphor, which she lets him do exactly as long as it is charming.',
        actions: [{ who: 'Juliet', verb: 'to establish what is actually happening' },
          { who: 'Romeo', verb: 'to make the danger small' }],
        operative: ['name', 'walls', 'death', 'murder thee'],
        ask: 'She says the place is death, twice. Does he register it either time?' },
      { title: 'Farewell compliment', cue: 'Thou knowest the mask of night is on my face',
        what: 'The longest speech in the scene and the most honest. She would have played '
          + 'it properly, she says, and she cannot now, and so she is going to ask straight '
          + 'out. Then the reservation, at the height of it: this is too rash, too '
          + 'unadvised, too sudden.',
        actions: [{ who: 'Juliet', verb: 'to get an answer she can trust' }],
        operative: ['compliment', 'faithfully', 'strange', 'light love'],
        ask: 'She offers to be difficult if he would prefer it. Is that a joke?' },
      { title: 'Do not swear', cue: 'O swear not by the moon',
        what: 'He tries to vow three times and is stopped three times, and each attempt is '
          + 'shorter than the last. She objects to the moon on the grounds that it changes '
          + 'every month, which is a reason, not a mood.',
        actions: [{ who: 'Romeo', verb: 'to make it binding' },
          { who: 'Juliet', verb: 'to refuse the wrong guarantee' }],
        operative: ['swear', 'inconstant', 'rash', 'lightning'],
        ask: 'He never completes a vow in this scene. Play the frustration of that rather '
          + 'than the romance of it and see what changes.' },
      { title: 'Cannot leave', cue: 'O wilt thou leave me so unsatisfied?',
        what: 'The scene ends four separate times. She goes in and comes back, twice, and '
          + 'forgets why. Each departure is sealed with a rhyming couplet and then broken. '
          + 'The comedy of it is the point: two people who cannot make themselves stop.',
        actions: [{ who: 'Juliet', verb: 'to go, and to not go' }],
        operative: ['bounty', 'boundless', 'anon', 'forget', 'sweet sorrow'],
        ask: 'Count the goodbyes. What is each one costing by the last?' },
      { title: 'The business', cue: 'Three words, dear Romeo, and good night indeed',
        what: 'She comes back for the third time with an arrangement: if you mean marriage, '
          + 'send word tomorrow, name the place and the time, and I will follow you. It is '
          + 'the most practical speech in the scene and she is the one who makes it.',
        actions: [{ who: 'Juliet', verb: 'to settle it', action: 'command' }],
        operative: ['honourable', 'purpose marriage', 'tomorrow', 'follow'],
        ask: 'She proposes. Does he get a word in, and what does that tell you about the '
          + 'rest of the play?' },
    ],
    patterns: [
      { name: 'Light in the dark',
        what: 'Sun, moon, stars, candles burning out, a torch, lightning, night’s cloak. '
          + 'Everything bright in this scene is surrounded by black, and the one light she '
          + 'rejects is the moon, because it changes.' },
      { name: 'Rhyme as a door',
        what: 'Rest and breast, books and looks, sorrow and morrow. The couplets arrive '
          + 'wherever somebody is leaving, and the scene keeps opening the door again.' },
      { name: 'Vows interrupted',
        what: 'Three attempts to swear, three stops, each attempt shorter. The dashes are '
          + 'in the text and they are the shape of the scene.' },
      { name: 'Names and things',
        what: 'A name is not a hand, a foot, an arm, a face. A rose would smell the same. '
          + 'She argues the case properly, and the play spends five acts proving her '
          + 'wrong.' },
    ],
    metre: [
      { line: '“Ay me.” / “She speaks.”',
        what: 'Two fragments. Her first two syllables in the scene and his reaction to them '
          + 'sit inside one line, which means he answers instantly.' },
      { line: '“Take all myself.” / “I take thee at thy word.”',
        what: 'A shared line at the exact moment the scene turns from overheard to spoken. '
          + 'He has no pause in which to decide.' },
      { line: '“What shall I swear by?” / “Do not swear at all.”',
        what: 'Halved between them. She is not waiting for the end of his question.' },
      { line: '“Romeo.” / “My nyas?” / “What o’clock tomorrow”',
        what: 'One line in three pieces. After a scene of long speeches, the last exchange '
          + 'is people who can barely finish a word.' },
      { line: '“Good night, good night. Parting is such sweet sorrow / That I shall say good '
          + 'night till it be morrow.”',
        what: 'A couplet, and the second line is deliberately one beat long. She is doing '
          + 'the thing the line describes.' },
    ],
    contested: 'The lead-in from Scene 1 is often cut, and the scene plays perfectly well '
      + 'without it. Keeping it changes the first speech, because the audience has just '
      + 'heard his friends describe the same appetite in the crudest possible terms and '
      + 'his opening line is an answer to them.',
  },

  // ── Romeo and Juliet, Act III Scene 5 ───────────────────────
  {
    id: 'rj-nightingale-lark',
    circumstances: 'Dawn, the morning after their wedding night. Yesterday he killed her '
      + 'cousin and was banished on pain of death. He is in her room and is supposed to be '
      + 'out of Verona by sunrise. Neither of them has said any of that out loud yet. The '
      + 'scene is six speeches long and the argument in it is about a bird.',
    form: 'Verse, in a scene so short that every formal choice shows. Watch the rhymes: '
      + 'they arrive when someone has stopped arguing and started accepting.',
    people: [
      { who: 'Juliet',
        between: 'Married since yesterday, to a man who will be dead if he is still here in '
          + 'an hour.',
        want: 'One more minute, and then another.',
        obstacle: 'It is getting light, which is not an argument she can win.',
        stake: 'If she keeps him she kills him, and she knows it while she is doing it.' },
      { who: 'Romeo',
        between: 'The same, from the side that has to leave.',
        want: 'To go while going is still possible.',
        obstacle: 'The only thing he wants more than living is being asked to stay.',
        stake: 'Being found in Verona at daylight is a death sentence already passed.' },
    ],
    beats: [
      { title: 'Which bird', cue: 'Wilt thou be gone? It is not yet near day',
        what: 'She names the bird as a nightingale and he corrects it to a lark. This is '
          + 'not poetry for its own sake: the nightingale sings at night and the lark at '
          + 'dawn, so the bird is the clock and they are arguing about the time.',
        actions: [{ who: 'Juliet', verb: 'to stop the morning' },
          { who: 'Romeo', verb: 'to make her let go' }],
        operative: ['nightingale', 'lark', 'Believe me'],
        ask: 'She says believe me, love, it was the nightingale. Does she believe it?' },
      { title: 'The light', cue: 'Yond light is not daylight, I know it, I',
        what: 'She tries again with a better argument: it is a meteor, sent to light your '
          + 'way. She is inventing astronomy to buy twenty minutes, and the doubled pronoun '
          + 'at the end of her first line is somebody insisting.',
        actions: [{ who: 'Juliet', verb: 'to supply him with a reason to stay' }],
        operative: ['meteor', 'torchbearer', 'Therefore stay yet'],
        ask: 'Both of them know this is not true. What is the point of saying it?' },
      { title: 'Then I will die', cue: 'Let me be ta’en, let me be put to death',
        what: 'He gives in completely, and the giving in is the turn of the scene. He will '
          + 'call the grey light the moon, he will say the lark is not the lark, he will '
          + 'stay and be taken. Come, death, and welcome. His surrender is what frightens '
          + 'her into reversing.',
        actions: [{ who: 'Romeo', verb: 'to hand her the decision' }],
        operative: ['content', 'reflex', 'more care to stay', 'Come, death'],
        ask: 'Is he calling her bluff, or has he genuinely stopped caring? The next speech '
          + 'depends on it.' },
      { title: 'Go', cue: 'It is, it is! Hie hence, be gone, away',
        what: 'She reverses inside one line and spends the rest of the speech attacking the '
          + 'bird she had been defending: out of tune, harsh discords, unpleasing sharps. '
          + 'Some say the lark makes sweet division; this doth not so, for she divideth us.',
        actions: [{ who: 'Juliet', verb: 'to get him out alive' }],
        operative: ['It is, it is', 'discords', 'divideth us', 'more light'],
        ask: 'She changes her mind at the start of the line, not the end of the speech. '
          + 'What did she see?' },
    ],
    patterns: [
      { name: 'One thing argued about',
        what: 'The whole scene is what species of bird is singing. Everything at stake is '
          + 'underneath it, and neither of them mentions the banishment, the killing, or '
          + 'the marriage. This is what subtext looks like when it is done completely.' },
      { name: 'Swapped positions',
        what: 'She begins by arguing it is night and ends by insisting it is day. He begins '
          + 'by insisting it is day and, in the middle, agrees to call it night. The scene '
          + 'is an exchange of arguments, not a disagreement.' },
      { name: 'The same words handed back',
        what: 'Nightingale and lark pass between them four times. More light and light, and '
          + 'then more light and light, more dark and dark. Neither of them introduces a '
          + 'word of their own once the argument has started.' },
    ],
    metre: [
      { line: '“I have more care to stay than will to go. / Come, death, and welcome. Juliet '
          + 'wills it so.”',
        what: 'A rhymed couplet inside a speech of blank verse, exactly where he gives up. '
          + 'Rhyme here is the sound of a decision closing.' },
      { line: '“How is’t, my soul? Let’s talk. It is not day.” / “It is, it is! Hie hence, be '
          + 'gone, away.”',
        what: 'His last line and her first rhyme with each other across the speech break. '
          + 'She contradicts him and completes his rhyme in the same breath.' },
      { line: '“O now be gone, more light and light it grows.” / “More light and light, more '
          + 'dark and dark our woes.”',
        what: 'The scene ends on a couplet split between two people. She supplies the first '
          + 'line, he supplies the rhyme, and neither could have finished it alone.' },
    ],
  },

  // ── The Taming of the Shrew, Act II Scene 1 ─────────────────
  {
    id: 'shrew-first-encounter',
    circumstances: 'A room in her father’s house. Petruchio has arrived in Padua openly '
      + 'saying he will marry for money, has agreed terms with her father without meeting '
      + 'her, and has told everyone in advance that he will contradict whatever she does. '
      + 'She has been sent in. She has not been asked. The cut begins mid-speech because '
      + 'he is already talking when she walks in.',
    form: 'Verse, and the fastest verse in the play. Most of this scene is one pentameter '
      + 'line split between the two of them, which is the form doing what the fight is '
      + 'doing.',
    people: [
      { who: 'Katherina',
        between: 'A stranger who has arranged her marriage with her father and is now '
          + 'calling her by a name she does not use.',
        want: 'To make him leave, and to make it cost him something.',
        obstacle: 'Nothing she says lands, because he has decided in advance to hear the '
          + 'opposite of whatever she says.',
        stake: 'The arrangement is already made. She is not negotiating, she is being '
          + 'informed, and the scene ends with her having said nothing that changed it.' },
      { who: 'Petruchio',
        between: 'A woman he intends to marry for her dowry and has never met.',
        want: 'To get through the interview without ever acknowledging her refusal.',
        obstacle: 'She is faster than he is and better at this, which he appears to enjoy.',
        stake: 'The money, which he has said out loud is the reason, and increasingly '
          + 'something else that he has not said.' },
    ],
    beats: [
      { title: 'The name', cue: 'Good morrow, Kate; for that’s your name, I hear',
        what: 'He names her wrong in his first line and she corrects it in her first. Then '
          + 'he says Kate eight times in ten lines. The fight over what she is called runs '
          + 'the length of the scene and he wins it by repetition.',
        actions: [{ who: 'Petruchio', verb: 'to rename her' },
          { who: 'Katherina', verb: 'to correct the record' }],
        operative: ['Kate', 'Katherine', 'call’d', 'curst'],
        ask: 'He mishears deliberately. She answers with a joke about his hearing. Who is '
          + 'in control of the first thirty seconds?' },
      { title: 'The word game', cue: 'Mov’d! in good time',
        what: 'Twenty exchanges in which neither introduces a new subject. She takes his '
          + 'last word and turns it: moved becomes moveable, moveable becomes joint-stool, '
          + 'bear becomes bear, light becomes heavy, buzz becomes buzzard. This is not '
          + 'banter. It is a refusal to let him set a topic.',
        actions: [{ who: 'Katherina', verb: 'to turn every word back on him' },
          { who: 'Petruchio', verb: 'to keep the game going' }],
        operative: ['moveable', 'bear', 'light', 'buzzard', 'wasp'],
        ask: 'Every one of her answers is a counter. What would happen if she said nothing '
          + 'once?' },
      { title: 'Tail and tongue', cue: 'Who knows not where a wasp does wear his sting?',
        what: 'The bawdy turns genuinely hostile. In his tail, in his tongue, whose tongue. '
          + 'When he puts his tongue in her tail she hits him, and the blow is the '
          + 'edition’s own stage direction.',
        actions: [{ who: 'Petruchio', verb: 'to push it past where she can answer' },
          { who: 'Katherina', verb: 'to end the conversation' }],
        operative: ['sting', 'tail', 'tongue', 'gentleman'],
        ask: 'She strikes a man who has just been given her father’s consent. What does she '
          + 'expect to happen next?' },
      { title: 'After the blow', cue: 'I swear I’ll cuff you if you strike again',
        what: 'He threatens to hit her back and she answers with heraldry: strike me and '
          + 'you are no gentleman, and a man with no gentility has no coat of arms. She '
          + 'turns an assault into a legal technicality inside one line, and it is the best '
          + 'work she does in the scene.',
        actions: [{ who: 'Petruchio', verb: 'to threaten', action: 'intimidate' },
          { who: 'Katherina', verb: 'to disarm him with his own status' }],
        operative: ['cuff', 'arms', 'gentleman', 'crest', 'coxcomb'],
        ask: 'He does not hit her. Decide why, because the answer shapes the rest of the '
          + 'play.' },
      { title: 'Describing somebody else', cue: 'No, not a whit; I find you passing gentle',
        what: 'Fourteen unbroken lines in which he describes a woman who is not in the '
          + 'room: pleasant, gamesome, courteous, slow in speech, mild. He is not '
          + 'flattering her. He is telling her, in public, what she is going to be, and she '
          + 'cannot argue with a compliment.',
        actions: [{ who: 'Petruchio', verb: 'to overwrite her' }],
        operative: ['passing gentle', 'report a very liar', 'mildness', 'halt'],
        ask: 'This is the first time she loses the exchange. What is it about praise that '
          + 'she has no answer for?' },
      { title: 'It is already arranged', cue: 'Thus in plain terms: your father hath consented',
        what: 'The game stops and the terms are read out. Your father has consented, the '
          + 'dowry is agreed, and will you or will you not, I will marry you. She has no '
          + 'line after it in this cut.',
        actions: [{ who: 'Petruchio', verb: 'to inform her of the outcome', action: 'command' }],
        operative: ['consented', 'dowry', 'will you, nill you', 'tame', 'Conformable'],
        ask: 'The scene gives her no reply. Find what she does with the silence, because '
          + 'that is the only thing left to her here.' },
    ],
    patterns: [
      { name: 'Seizing the last word',
        what: 'Almost every one of her lines begins from his. She never opens a subject, '
          + 'which is both her skill and her trap: a person who only ever answers can never '
          + 'change what is being discussed.' },
      { name: 'Animals',
        what: 'Ass, jade, buzzard, turtle, wasp, cock, hen, craven, crab. Both of them '
          + 'argue entirely in creatures, and every one of his is something that is owned '
          + 'or kept.' },
      { name: 'Taming as a word',
        what: 'It arrives only in the last four lines, and when it does it is joined to '
          + 'household, conformable, and a pun on her name. He has been careful not to use '
          + 'it until the terms are read.' },
      { name: 'Her name as his property',
        what: 'Kate, bonny Kate, Kate the curst, Kate Hall, super-dainty Kate, wild Kate, '
          + 'household Kates. He conjugates her. She says Katherine once, at the start, and '
          + 'never again.' },
    ],
    metre: [
      { line: '“Good morrow, Kate; for that’s your name, I hear.”',
        what: 'A clean ten. He arrives in perfect order, which is worth noticing given what '
          + 'the next hundred lines do to the line.' },
      { line: '“Well have you heard, but something hard of hearing:”',
        what: 'Eleven. A feminine ending on hearing, and the extra syllable falls on the '
          + 'word she is using to mock him.' },
      { line: '“In his tail.” / “In his tongue.” / “Whose tongue?”',
        what: 'One line in three pieces. The scan will fill with counts of two and three '
          + 'through this passage, which is what stichomythia looks like from underneath.' },
      { line: '“Should be! should buz!” / “Well ta’en, and like a buzzard.”',
        what: 'Half lines answering half lines. Neither of them is allowed a complete '
          + 'thought for about twenty exchanges.' },
      { line: '“And bring you from a wild Kate to a Kate / Conformable as other household '
          + 'Kates.”',
        what: 'He ends on full lines, at length, without interruption. Getting the whole '
          + 'line back is how the scene announces who has won it.' },
    ],
    contested: 'This is frequently staged as flirtation between equals, and the speed of '
      + 'the writing invites it. The text also has him arrange the marriage before meeting '
      + 'her, announce in advance that he will contradict everything she says, threaten to '
      + 'hit her, and close by telling her the marriage is happening whether she agrees or '
      + 'not. A production can play the attraction, but it has to decide what it is doing '
      + 'with all of that, and pretending the words are not there is not one of the '
      + 'options.',
  },
];

export const scriptAnalysisById = id => SCRIPT_ANALYSIS.find(w => w.id === id) ?? null;
