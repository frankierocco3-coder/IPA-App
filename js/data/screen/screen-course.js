// Screen Acting — the tenth workspace (owner handoff, 2026-11-03).
//
// Supplied complete, as a written course rather than as transcripts: eight
// subjects, each with a core idea, a numbered set of lessons, filmed
// exercises and a checkpoint question. The conversion applied house style
// (no em dashes, no contractions, curly quotes) and nothing else — the
// teaching, the exercise timings and the checkpoints are his.
//
// ONE SUBJECT PER MODULE, which is the shape he settled on for Theatre
// History the same day. Each module holds one chapter; the course is a
// progression and its own opener says so, so the modules ARE the stages.
//
// NOTHING HERE RECORDS THE LEARNER, AND NOTHING MAY. Every exercise is
// filmed by the learner on their own phone and watched back by them; the
// app never asks for audio or video, offers no capture surface and stores
// nothing. `CAPABILITIES.learnerSpeaking` is false and frozen, and it
// gates in-app capture — Try It Yourself, Perform, Compare Your Take —
// not written exercises, exactly as the practical exercises in Acting and
// Theatre History already work. If this course ever grows a record button
// it has to go through the speaking audit first, like everything else.
//
// MODULE 8 IS A NAMED TRADITION AND SAYS SO. Repetition, the independent
// activity, particularization and "living truthfully under imaginary
// circumstances" are one twentieth-century teacher’s vocabulary, not a
// neutral account of acting. The house rule keeps practitioner names out
// of lesson bodies, so the chapter carries a content note saying it is one
// approach among several and pointing at Sources & Credits — where that
// teacher is already credited, with a bibliography, in
// js/data/acting/approaches.js. Do not let a later edit present it as how
// acting simply works.
//
// GATED. SCREEN_LIVE is false in js/views/context.js and not one of the
// eight records has an entry in js/data/speech/reviews.js, which by that
// ledger’s own contract means draft. It asks for an acting professional,
// the same reviewer Acting and Building a Character ask for, because the
// claims here are craft claims rather than historical ones.
//
// IDS ARE PERMANENT from the first push.

export const SCREEN_PRINCIPLE =
  'The camera is not an audience you reach, it is a record you answer to. '
  + 'Do less, listen for real, and make every take repeatable.';

export const SCREEN_MODULES = [
  { n: 1, id: 'sc-start', title: 'How This Course Works',
    blurb: 'Three strands, a phone on a tripod, and the rule that the playback is where the learning happens rather than the take.' },
  { n: 2, id: 'sc-presence', title: 'The Camera Is the Audience',
    blurb: 'What reads as subtle in the room reads as enormous in a close-up, and the camera is recording the decision to speak rather than the speech.' },
  { n: 3, id: 'sc-craft', title: 'Technical Craft',
    blurb: 'Shot size, marks, eyelines, continuity and coverage: the technique that sits on top of the acting and can be learned in a few weeks.' },
  { n: 4, id: 'sc-reacting', title: 'Listening and Reacting',
    blurb: 'Attention on the other person, received before answered, with the feeling arriving as a result rather than as the goal.' },
  { n: 5, id: 'sc-preparation', title: 'Scene Prep for Screen',
    blurb: 'One want, one obstacle, the moment before, and lines learned flat so no reading gets baked in.' },
  { n: 6, id: 'sc-onset', title: 'Working with the Set',
    blurb: 'How a shot actually gets made, and the ninety per cent of the job that happens between takes.' },
  { n: 7, id: 'sc-tape', title: 'Self-Tape and Audition',
    blurb: 'A close-up, a technical standard and a reader who gives you nothing: everything in the course tested in sixty seconds.' },
  { n: 8, id: 'sc-root', title: 'Repetition and the Reality of Doing',
    blurb: 'Nothing is self-generated: a training tradition built on responding to the other person until the responses are immediate and uncensored.' },
];

export const SCREEN_LESSONS = [
  { id: 'sc-how', module: 'sc-start', order: 1,
    title: 'How This Course Works',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Set the course up: the three strands it runs on, what you need to film with, and why every exercise is watched back the same day.',
    reflection: 'What does the camera actually record, and how do you watch yourself honestly enough to learn from it?',
    takeaway: 'Do less, listen for real, and make every take repeatable.',
    contents: ['A self-paced course in acting for camera, filmed from the first exercise', 'The three strands', 'The rhythm of a module', 'What you need', 'Three rules that run through everything', 'Suggested order'],
    body: [
      { h: 'A self-paced course in acting for camera, filmed from the first exercise' },
      { p: 'This is a self-paced course in screen acting. The exercises are written for one person with a phone camera and a willing scene partner.' },
      { h: 'The three strands' },
      { p: 'The work splits into three strands, and the modules follow them.' },
      { table: {
        head: ['Strand', 'What it covers', 'Modules'],
        rows: [
          ['Presence', 'Stillness, eyes, scale, doing less', '1, 5'],
          ['Technical craft', 'Lens, shot size, marks, continuity, eyelines', '2, 5, 6'],
          ['Inner work', 'Listening, reacting, emotional truth, scene prep, repetition', '3, 4, 6, 7'],
        ] } },
      { h: 'The rhythm of a module' },
      { p: 'Read the lessons, do the exercises on camera, watch the footage back the same day, and write three lines in the progress log.' },
      { p: 'Move on when the checkpoint question has a clear answer, not on a calendar.' },
      { p: 'Every exercise is filmed.' },
      { key: 'On screen the only thing that counts is what the camera recorded, so the playback is where the learning happens, not the take.' },
      { h: 'What you need' },
      { list: [
        'A phone on a tripod at eye height.',
        'A lamp or a window.',
        'Headphones.',
        'A scene partner from Module 3 onward. A reader on a video call works when nobody is available in person.',
      ] },
      { h: 'Three rules that run through everything' },
      { p: 'Every module comes back to the same three things: do less, listen for real, and make every take repeatable.' },
      { key: 'When a take goes wrong on playback, it is almost always one of these.' },
      { h: 'Suggested order' },
      { p: 'Work through the stages in order, at your own pace. A stage is done when its checkpoint has a clear answer.' },
      { table: {
        head: ['Stage', 'Module', 'Exercises'],
        rows: [
          ['1', '1 The camera is the audience', '1A, 1B, 1C'],
          ['2', '2 Technical craft', '2A, 2B, 2C'],
          ['3', '3 Listening and reacting', '3A, 3B, 3C'],
          ['4', '3 continued and 4 Scene prep', '3A again, 4A, 4B'],
          ['5', '4 continued', '4C, repeat 1A for comparison'],
          ['6', '5 Working with the set', '5A, 5B, 5C'],
          ['7', '6 Practicum', 'Three self-tapes'],
          ['8', '6 Practicum', 'Review, re-record the weakest tape, final checkpoint'],
          ['9', '7 Repetition and the reality of doing', 'Sessions 1 to 8, 7A to 7C'],
        ] } },
      { p: 'After stage 9, restart Modules 1 to 6 with three scenes you have never worked on. It should go much faster the second time.' },
      { h: 'Takeaway' },
      { p: 'The camera is not an audience you reach. It is a record you answer to.' },
      { key: 'Do less, listen for real, and make every take repeatable.' },
    ] },

  { id: 'sc-camera', module: 'sc-presence', order: 2,
    title: 'The Camera Is the Audience',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Calibrate a performance down to what a close-up can hold, use stillness and a steady gaze as choices, and find on playback the frame where thinking stopped and performing started.',
    reflection: 'Can you identify, on playback, the exact frame where you stopped thinking and started performing?',
    takeaway: 'If a take felt like nothing, it was probably right.',
    contents: ['Do less than feels natural, and let the thought be seen', 'The eight lessons', 'Exercises'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Calibrate a performance down to the size a close-up can hold.',
        'Use stillness and a steady gaze as choices rather than accidents.',
        'Keep your attention on the other actor so the reaction is real.',
        'Tell, on playback, the moment thinking stopped and performing started.',
      ] },
      { h: 'Do less than feels natural, and let the thought be seen' },
      { defs: [
        { label: 'Core idea', text: 'On stage you project to the back row; on film the audience is inches from your face. The camera sees thought, so your job is to think truthfully and let it be seen, not to show it.' },
      ] },
      { h: 'The eight lessons' },
      { olist: [
        'Do less than feels natural. What reads as subtle in the room reads as enormous in a close-up. If a take felt like nothing, it was probably right.',
        'Stillness is power. Unmotivated movement, fidgeting and head-bobbing pull focus; the actor who holds still owns the frame.',
        'Do not blink. Blinking during an important line reads as weakness or lying. A steady gaze reads as strength and certainty.',
        'Pick one eye. When looking at your scene partner in a close-up, lock onto the eye nearest the camera so your own eyes do not dart back and forth.',
        'Think the thought before the line. The camera catches the decision to speak; the line itself is almost secondary.',
        'Listen as if you have never heard the words before, every take. Reacting is most of film acting.',
        'Film is cut from reactions. The editor will often choose the shot of the person listening, so stay alive when the other actor is speaking.',
        'Energy is internal, not physical. Volume, gesture and pace drop; intensity of thought stays high.',
      ] },
      { h: 'Exercises' },
      { p: 'Exercise 1A: The still close-up, 30 minutes. Frame a tight close-up. Deliver a two-line monologue three ways: as you would on stage, at half that size, then with almost no visible expression but full inner intention. Watch back. Note which take you believed.' },
      { p: 'Exercise 1B: The blink test, 15 minutes. Same close-up. Say a hard truth to the lens without blinking, then again blinking freely. Watch back and write what each version communicates.' },
      { p: 'Exercise 1C: Listening take, 20 minutes. Have a partner read a page of text off camera while the camera is on you only. Your job is to hear it for the first time. Watch for the moment your attention drifts.' },
      { h: 'Takeaway' },
      { key: 'If a take felt like nothing, it was probably right.' },
      { p: 'The camera is closer than any audience has ever been, and it is recording the decision to speak rather than the speech.' },
    ] },

  { id: 'sc-technical', module: 'sc-craft', order: 3,
    title: 'Technical Craft',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Recalibrate one scene for three shot sizes, hit a mark without looking down, and repeat your own business closely enough that the material can be cut.',
    reflection: 'Could an editor cut your three takes together without a visible jump?',
    takeaway: 'The same scene played in a wide and a close-up should look like two different performances.',
    contents: ['The size of the shot decides the size of the performance', 'Shot size sets the scale', 'The eight lessons', 'Exercises'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Recalibrate the same scene for a wide, a medium and a close-up.',
        'Hit a mark without looking down, and hold an eyeline that opens your face to camera.',
        'Repeat your own business take after take so the material can be cut.',
        'Arrive with the technical decisions already made.',
      ] },
      { h: 'The size of the shot decides the size of the performance' },
      { defs: [
        { label: 'Core idea', text: 'Screen acting is a technical skill layered on top of acting, and the technique can be learned in a few weeks of deliberate practice.' },
      ] },
      { h: 'Shot size sets the scale' },
      { table: {
        head: ['Shot', 'What the camera sees', 'How much to do'],
        rows: [
          ['Wide or full', 'Whole body, the space', 'Near stage size; the body carries the story'],
          ['Medium', 'Waist up', 'Gesture is visible; face still small; moderate'],
          ['Close-up', 'Head and shoulders', 'Eyes and mouth only; movement of an inch is a lot'],
          ['Extreme close-up', 'Eyes', 'Thought only; any visible effort is too much'],
        ] } },
      { p: 'Ask the operator what the shot is before every take, then calibrate.' },
      { key: 'The same scene played in a wide and a close-up should look like two different performances.' },
      { h: 'The eight lessons' },
      { olist: [
        'Hit your mark without looking. Count steps in rehearsal, feel for the tape with your foot, or use a prop or furniture edge as the stop. Looking down breaks the shot.',
        'Eyelines are the grammar of the edit. Looking a few degrees off your partner’s eye, toward the lens, opens your face to camera; the audience reads it as direct contact.',
        'Continuity is your job too. Which hand held the cup, when you sat, where you were on the line: repeat it every take so the editor can cut.',
        'Overlapping dialogue cannot be cut. Leave a beat of clean air between your partner’s last word and your first.',
        'Cheat toward camera. Stand, turn and hold props in ways that would feel odd in life but read correctly through the lens.',
        'Walking and talking: the line goes with the step, not before or after, so the pace of speech and the pace of movement match across takes.',
        'Know the coverage. Master, two-shot, singles: the single is where your close work lives, so save the finest detail for it and keep the master clean and repeatable.',
        'Less time, more precision. Film gives you minutes of rehearsal, not weeks; arrive with the technical decisions already made.',
      ] },
      { h: 'Exercises' },
      { p: 'Exercise 2A: Three sizes, 40 minutes. Film the same thirty-second scene in a wide, a medium and a close-up. Recalibrate the performance for each. On playback, check whether the close-up still has visible effort.' },
      { p: 'Exercise 2B: Marks and eyelines, 30 minutes. Tape a mark on the floor. Enter, cross, land on the mark and deliver a line to a partner standing just beside the lens. Repeat five times. Goal: identical landings, no glance down, eyes steady.' },
      { p: 'Exercise 2C: Continuity drill, 30 minutes. Play a one-minute scene with a cup, a phone and a chair. Film three takes. On playback, list every action that differed between takes.' },
      { h: 'Takeaway' },
      { key: 'The same scene played in a wide and a close-up should look like two different performances.' },
      { p: 'Continuity is not the script supervisor’s problem alone. An unrepeatable take cannot be cut, however good it was.' },
    ] },

  { id: 'sc-listen', module: 'sc-reacting', order: 4,
    title: 'Listening and Reacting',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Move your attention off yourself and onto your partner, let a line land before you answer it, and tell a reaction from a demonstration of one in your own footage.',
    reflection: 'On playback, can you see the difference between a reaction and a demonstration of a reaction?',
    takeaway: 'Emotion is a by-product. Chase the feeling and you get indicating; pursue what you want from the other person and the feeling arrives on its own.',
    contents: ['Put your attention on the other person and let the feeling follow', 'The eight lessons', 'Exercises'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Move your attention off yourself and onto your partner, where the camera can see it.',
        'Receive a line, let it land, and let it change you before you answer.',
        'Pursue what the character wants instead of chasing a feeling.',
        'Tell a reaction from a demonstration of one, in your own footage.',
      ] },
      { h: 'Put your attention on the other person and let the feeling follow' },
      { defs: [
        { label: 'Core idea', text: 'The camera records what is actually happening between two people. Acting is not producing emotion on cue; it is putting your real attention on your partner, being affected by them, and letting the feeling that follows show. The feeling is a result, never a goal.' },
      ] },
      { h: 'The eight lessons' },
      { olist: [
        'Put your attention outside yourself. Self-monitoring, how am I doing and how do I look, is visible on camera as a dead eye. Attention on the partner reads as life.',
        'Be affected, then act. Receive the line, let it land, let it change you, then respond. The order matters and the camera can see when it is skipped.',
        'Emotion is a by-product. Chasing a feeling produces indicating; pursuing what the character wants from the other person produces feeling.',
        'Do not plan the reading. A pre-decided inflection cannot respond to what your partner actually did on this take.',
        'Commit to your partner’s reality. Whatever they give you is true and worth responding to, even if the director changes their performance between takes.',
        'Stay in the gap. The moments between lines, when nothing is being said, are where the audience reads the relationship.',
        'The scene has a line: one event leads to the next. Track what changed each beat so the scene moves instead of repeating one mood.',
        'Release the tension. Physical tension in the jaw, shoulders and hands blocks the response you are trying to let through; breathe out before action.',
      ] },
      { h: 'Exercises' },
      { p: 'Exercise 3A: Repetition on camera, 30 minutes. Two-shot, both faces visible. Partner A says a simple observation about B; B repeats it, then they trade. Change the words only when the behaviour changes. Film five minutes. On playback, find the moments something real happened and the moments someone was faking.' },
      { p: 'Exercise 3B: The unexpected line, 30 minutes. Rehearse a short scene. On the filmed take, your partner secretly changes one line. Your only task is to respond to what they actually said. Watch whether your reaction was honest or whether you pushed through to your planned reading.' },
      { p: 'Exercise 3C: Silent reaction, 20 minutes. Single on you. Your partner, off camera, tells you news, good, bad or confusing, that you do not know in advance. Say nothing. Watch the footage for the moment of being affected and the moment you started to demonstrate it.' },
      { h: 'Takeaway' },
      { key: 'Emotion is a by-product. Chase the feeling and you get indicating; pursue what you want from the other person and the feeling arrives on its own.' },
    ] },

  { id: 'sc-prep', module: 'sc-preparation', order: 5,
    title: 'Scene Prep for Screen',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Work a scene down to a want and an obstacle, prepare the pivot so it lands in the single, and arrive with decisions made that stay invisible on the take.',
    reflection: 'On playback, can you point to the pivot of the scene, and did it land in the single?',
    takeaway: 'Rehearse the behaviour, not the result.',
    contents: ['Know it well enough to throw the plan away', 'The prep checklist for every scene', 'The eight lessons', 'Exercises'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Work a scene down to one want and one obstacle.',
        'Use the moment before as the cheapest preparation there is.',
        'Learn lines flat so no reading gets baked in.',
        'Find the pivot of a scene and know where it has to land.',
      ] },
      { h: 'Know it well enough to throw the plan away' },
      { defs: [
        { label: 'Core idea', text: 'Preparation on film is about knowing the character and the scene so well that you can forget them on the take. You arrive with decisions made and lines owned; on set you throw the plan away and respond.' },
      ] },
      { h: 'The prep checklist for every scene' },
      { list: [
        'What does my character want from the other person in this scene, in one sentence?',
        'What happened immediately before the first line? Walk on already in it.',
        'What changes between the first line and the last? Name the beats.',
        'What is the secret the character is not saying?',
        'Which lines are the pivot, the moment the scene turns?',
        'What does the character physically do here, props and business, that I can repeat identically?',
        'What is the size of the shot likely to be, and how does that change my choices?',
      ] },
      { h: 'The eight lessons' },
      { olist: [
        'Know the lines cold. Film gives no time to find them; hesitation reads as the actor, not the character. Learn them without inflection so no reading gets baked in.',
        'Build the character from what they do, not from adjectives. A list of actions is playable; a list of traits is not.',
        'Choose a strong want, then let it collide with the partner. Conflict between wants is the engine of the scene.',
        'The moment before is the cheapest tool you have. Ten seconds of real thought about what just happened puts you in the scene before action is called.',
        'Prepare the pivot. Most scenes have one moment where everything turns; know where it is so you can land it in the single.',
        'Personalize only as far as it helps. Use your own experience to understand the stakes, then drop it and play the scene.',
        'Keep the prep off your face. Decisions made in advance should be invisible on the take; the audience sees only the result.',
        'Rehearse the behaviour, not the result. Practise the business, the moves and the listening, never the emotional climax.',
      ] },
      { h: 'Exercises' },
      { p: 'Exercise 4A: Want and obstacle, 30 minutes. Take a two-page scene. Write the want in one sentence and the obstacle in one sentence. Film the scene once pursuing the want relentlessly. Watch for whether the want was visible without being announced.' },
      { p: 'Exercise 4B: Moment before, 20 minutes. Film the first ten seconds of the scene five times, each with a different moment before: just argued, just received good news, just lied, just ran, just woke. Say nothing. Watch what the camera reads from each.' },
      { p: 'Exercise 4C: Flat learning, ongoing. Learn a monologue by speaking it in a monotone at double speed until it is automatic. Then film it once, letting the thought drive the reading. Compare to a version you learned with inflection.' },
      { h: 'Takeaway' },
      { key: 'Rehearse the behaviour, not the result.' },
      { p: 'Arrive with the decisions made and then let them go. Preparation that is still visible on the take was not finished.' },
    ] },

  { id: 'sc-set', module: 'sc-onset', order: 6,
    title: 'Working with the Set',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Follow a shot through its stages, give a full performance off camera for somebody else’s single, take a note without discussion, and keep take fourteen alive.',
    reflection: 'Did take fourteen look like the first time it had ever happened?',
    takeaway: 'Give the same performance for the other actor’s single.',
    contents: ['Ten per cent happens on action, and ninety per cent around it', 'How a shot gets made', 'The eight lessons', 'Exercises'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Follow how a shot actually gets made, and know what to do in each stage of it.',
        'Give a full performance off camera, for somebody else’s close-up.',
        'Take a note and apply it without discussion.',
        'Keep take fourteen as alive as take one.',
      ] },
      { h: 'Ten per cent happens on action, and ninety per cent around it' },
      { defs: [
        { label: 'Core idea', text: 'A film set is a machine with many people and little time; the actor who understands how it works gets better takes and gets hired again.' },
      ] },
      { h: 'How a shot gets made' },
      { olist: [
        'Blocking rehearsal: actors and director walk the scene; marks are set.',
        'Lighting and camera set-up: actors step out, stand-ins step in. This is your time to prepare, not to drift.',
        'Rehearsal on camera: a technical pass; keep the performance at eighty per cent.',
        'Takes: usually a master first, then coverage, meaning two-shots, singles and inserts.',
        'Reset between takes: props back, positions back, clothing checked.',
        'Check the gate and move on: the shot is done; the next set-up begins.',
      ] },
      { h: 'The eight lessons' },
      { olist: [
        'Know the crew’s words. Mark, eyeline, cheat, first positions, back to one, tail slate: understanding them saves minutes on every set-up.',
        'Save the full performance for the take. Rehearsals are for the camera and sound; you burn energy and give the editor nothing if you play them all out.',
        'Give the same performance for the other actor’s single. Their close-up is cut against yours; if you drop your level off camera, their reaction dies.',
        'Take the note and do it. A director’s note is a request, not a judgment; the fastest actors adjust without discussion.',
        'Trust the editor with the arc. You will shoot out of order. Know where this scene sits in the story and play that point only.',
        'Tiredness, repetition and waiting are the job. Take fourteen must be as alive as take one; find a way to make each take the first time.',
        'Keep continuity notes yourself. Script supervisors are excellent, but a line in your own script about hand, cup and timing is faster.',
        'Be easy to work with. On a crew of forty, the actor who is prepared, quiet between set-ups and generous off camera is the one who is called back.',
      ] },
      { h: 'Exercises' },
      { p: 'Exercise 5A: Off-camera generosity, 30 minutes. Film your partner’s single. You are off camera, beside the lens. Give a full performance. Then film it again giving a lazy off-camera read. Watch your partner’s footage from both; the difference is the lesson.' },
      { p: 'Exercise 5B: Take fourteen, 45 minutes. Film the same twenty-second scene fourteen times with resets. Watch takes one, seven and fourteen back to back. Note where it went flat and what you did to bring it back.' },
      { p: 'Exercise 5C: The note, 20 minutes. Film a scene. A partner gives you one blunt note: faster, less, you hate him. Do the next take with the note fully applied and no discussion. Watch whether the note landed.' },
      { h: 'Takeaway' },
      { key: 'Give the same performance for the other actor’s single.' },
      { p: 'Their close-up is cut against yours, and an actor who drops the level off camera has just thinned somebody else’s best shot.' },
    ] },

  { id: 'sc-selftape', module: 'sc-tape', order: 7,
    title: 'Self-Tape and Audition',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Meet the technical standard without thinking about it, treat a flat reader as a scene partner, and watch your own tape the way a stranger would.',
    reflection: 'Watch your tape as a stranger. Mute it: is the thinking visible? Play it at double speed: is the body still?',
    takeaway: 'Make the strong choice, then make it small.',
    contents: ['A close-up, a technical standard, and a reader who gives you almost nothing', 'The technical standard for every tape', 'The seven lessons', 'The practicum'],
    body: [
      { h: 'What you will learn' },
      { list: [
        'Meet a technical standard without thinking about it.',
        'Treat a flat reader as a scene partner anyway.',
        'Make a strong choice and then make it small.',
        'Watch your own tape the way a stranger would.',
      ] },
      { h: 'A close-up, a technical standard, and a reader who gives you almost nothing' },
      { defs: [
        { label: 'Core idea', text: 'The self-tape is where everything meets. It is a close-up, it has technical rules, and it is a two-person scene with a reader who gives you almost nothing.' },
      ] },
      { h: 'The technical standard for every tape' },
      { table: {
        head: ['Element', 'Standard'],
        rows: [
          ['Framing', 'Medium close-up, head and shoulders, eyes in the top third'],
          ['Eyeline', 'Reader just beside the lens; never look into the lens unless asked'],
          ['Light', 'Soft, from the front; no window behind you'],
          ['Sound', 'Reader quieter than you; no echo; phone within six feet'],
          ['Background', 'Plain, neutral; nothing moving'],
          ['Slate', 'Name, role, height if asked; relaxed, no performance'],
          ['Length', 'Trim dead air; one take per scene unless two are requested'],
        ] } },
      { h: 'The seven lessons' },
      { olist: [
        'The reader is your scene partner, however flat they are. Put your attention on them and respond to what they actually give.',
        'Make the strong choice, then make it small. Casting watches hundreds of tapes; the actor who is still, specific and thinking stands out from the actor who is busy.',
        'Hold the moment after your last line. Stay in the scene for a breath before cutting; the tail is often the best thing on the tape.',
        'Do not blink on the key line, do not look away from the reader, do not fidget. Everything from the first module applies here at its most concentrated.',
        'Learn the sides cold, even for a next-day deadline. Eyes dropping to the page kill the take.',
        'Two takes, two real choices. If asked for two, change the want or the relationship, not just the volume.',
        'Watch your tape as a stranger. Mute it and ask whether the thinking is visible; play it at double speed and ask whether the body is still.',
      ] },
      { h: 'The practicum' },
      { p: 'Round one. Record three tapes from sides you have never seen before, each with a twenty-four hour turnaround from first read to finished tape. Apply the technical standard to every one.' },
      { p: 'Round two. Watch all three with a trusted partner. For each, name one thing from the earlier modules that worked and one that broke. Re-record the weakest tape once.' },
      { p: 'Final checkpoint. Place your best practicum tape next to the still close-up from Exercise 1A. Write five lines on what changed.' },
      { h: 'Takeaway' },
      { key: 'Make the strong choice, then make it small.' },
      { p: 'Everything in this course is tested in sixty seconds of close-up with a reader who gives you nothing.' },
    ] },

  { id: 'sc-repetition', module: 'sc-root', order: 8,
    title: 'Repetition and the Reality of Doing',
    attribution: 'Screen acting',
    requiredReviewer: 'acting-professional',
    objective: 'Work repetition until response replaces invention, build an independent activity with real stakes, and lay learned text over live behaviour without the text taking over.',
    reflection: 'Did this work make your responses faster and less censored, or only more expressive?',
    takeaway: 'Do not do anything until something makes you do it.',
    contents: ['Nothing is self-generated: everything comes from the other person', 'When to do this module', 'The eight lessons', 'The progression', 'Exercises'],
    body: [
      { note: 'This module uses a training tradition developed by a named twentieth-century teacher. The vocabulary here is that tradition’s own, and it is one approach among several rather than a universal account of how acting works. Sources and Credits carries the attribution and the reading.' },
      { h: 'What you will learn' },
      { list: [
        'Work a repetition exercise until response replaces invention.',
        'Build an independent activity with real stakes and a real deadline.',
        'Lay learned text over live behaviour without the text taking over.',
        'Particularize a circumstance until it produces behaviour instead of mood.',
      ] },
      { h: 'Nothing is self-generated: everything comes from the other person' },
      { defs: [
        { label: 'Core idea', text: 'Acting is living truthfully under imaginary circumstances. Everything you do comes from what the other person does to you; the work is to get your attention entirely off yourself and onto your partner until your responses are real, immediate and uncensored.' },
      ] },
      { h: 'When to do this module' },
      { p: 'This is the third module taken to its root, and it is the approach most directly suited to the camera.' },
      { p: 'Start it after the self-tape practicum, once the first pass through the course is done.' },
      { h: 'The eight lessons' },
      { olist: [
        'The foundation of acting is the reality of doing. Really listen, really look, really try to get what you want; never pretend to.',
        'Repetition trains instinct. Saying back what your partner says, and changing it only when their behaviour changes, strips out thinking and leaves response.',
        'Do not do anything until something makes you do it. Every line and move is caused by your partner or the circumstance; nothing is self-generated.',
        'Text is the canoe, emotion is the river. The lines ride on top of what is happening between you; learn them neutrally so the river can carry them.',
        'Preparation is private. Before the scene, bring yourself to a full emotional state by whatever imaginative means works, then drop it and enter the scene available.',
        'The independent activity. Give yourself a difficult physical task with real stakes and a reason it must be done now; the scene then has life whether or not anyone speaks.',
        'Particularize. A vague circumstance produces vague acting; a specific, personal, imagined one produces behaviour.',
        'Instinct over intellect. The thinking happens in preparation; on the take you trust the impulse and act on it before you can judge it.',
      ] },
      { h: 'The progression' },
      { p: 'Eight sessions of about ninety minutes with a partner, all on camera, spaced however suits you.' },
      { table: {
        head: ['Session', 'Focus', 'Exercise'],
        rows: [
          ['1', 'Basic repetition', 'Word-for-word repetition, no changes, five minutes per pairing; notice when attention leaves the partner'],
          ['2', 'Point of view in repetition', 'Repeat from your own point of view; change only when something changes'],
          ['3', 'Knock on the door', 'One partner has an independent activity; the other enters with a reason; no script'],
          ['4', 'Raising the stakes', 'Activity must be hard, with a deadline and a consequence; entrance must have urgency'],
          ['5', 'Emotional preparation', 'Each partner prepares privately to a full state before entering; play the exercise from there'],
          ['6', 'Text on top', 'Put two pages of learned, uninflected dialogue over the activity and entrance; let the lines ride'],
          ['7', 'Particularizing', 'Rebuild the same scene with a new specific relationship and history; film both and compare'],
          ['8', 'Scene in coverage', 'Shoot the session six scene as master, two-shot and singles; check whether the truth survived the repetition'],
        ] } },
      { h: 'Exercises' },
      { p: 'Exercise 7A: Repetition, sessions one and two, 20 minutes per session. Two-shot, eye to eye. Watch back muted. Mark every moment one of you is making something up instead of responding.' },
      { p: 'Exercise 7B: Activity under pressure, sessions three to five, 40 minutes per session. Choose an activity that genuinely takes concentration: threading, assembling, counting money, memorizing. Film it alone first, then with the partner’s entrance. On playback, does the activity ever stop being real?' },
      { p: 'Exercise 7C: Text over behaviour, sessions six to eight, 45 minutes per session. Learn the scene flat. Play it with the activity still running. If the lines start to lead, drop them and go back to repetition for two minutes, then resume.' },
      { h: 'Takeaway' },
      { key: 'Do not do anything until something makes you do it.' },
      { p: 'Place the session eight singles next to your self-tapes. The question is whether the responses got faster and less censored, not whether they got bigger.' },
    ] },
];

const SHELF_ICON = {
  'sc-start': '📋',
  'sc-presence': '👁️',
  'sc-craft': '🎬',
  'sc-reacting': '👂',
  'sc-preparation': '📝',
  'sc-onset': '🎞️',
  'sc-tape': '📱',
  'sc-root': '🔁',
};

export const SCREEN_COLLECTIONS = SCREEN_MODULES.map(m => ({
  id: m.id, icon: SHELF_ICON[m.id] ?? '🎬', img: null, title: m.title,
  lessons: SCREEN_LESSONS.filter(l => l.module === m.id && !l.reference)
    .sort((x, y) => x.order - y.order).map(l => l.id),
}));
