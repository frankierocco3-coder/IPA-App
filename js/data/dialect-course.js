// Course structure: units → lessons. Each lesson names its target phonemes
// and the exercise mix; the engine generates concrete exercises from that.

export const COURSE = [
  // ── THE INSTRUMENT (owner handoff, 2026-11-10) ────────────────
  // Built from his sourced brief, docs/ORAL_POSTURE_AND_ARTICULATION.md,
  // which carries the citations. The links live there because they cannot
  // live here: security_audit.py allows exactly ONE external origin in
  // shipped code and fails the deploy on any other, so sources are named
  // in words and the document holds the URLs.
  //
  // IT IS IN IPA FOUNDATIONS, NOT THE FIVE ACCENT COURSES, and the brief
  // is why: "not a placement prescription for every speaker", and on
  // accent work, "don't assume everyone who speaks an accent uses the same
  // tongue position." The instrument is the same instrument in every
  // accent. Five per-accent posture lessons would be five copies of one
  // thing and the one framing the source warns against.
  //
  // A NEW UNIT RENAMES NOTHING. Generated checkpoint ids are
  // `chk-<unitId>-<n>`, keyed on the unit and the index WITHIN it, so a
  // unit added at the head of a track leaves every existing id alone.
  // Owner-editorial like the rest of the app; no speech-language
  // pathologist has read it, and the badges say so.
  {
    id: 'instrument',
    title: 'The Instrument',
    color: '#a8766a',
    icon: 'ə',
    blurb: 'The mouth that makes the sounds — what moves, and what it changes.',
    // ── THE CHECKPOINT GAME (owner handoff, 2026-11-13) ──────────────────
    // Two authored rounds in place of the five generated questions this
    // checkpoint drew from the unit's accumulated phonemes. `expandUnit`
    // hands them to the engine as a `fixedQueue`, the same escape hatch the
    // Accent Bridge uses, so scoring, the feedback band, requeue-on-miss and
    // completion all stay exactly as they are.
    //
    // THE ID DOES NOT MOVE. The checkpoint is still generated, still
    // `chk-instrument-1`, still the node after lesson 2. Only its queue
    // changes, so nobody's completion goes anywhere.
    //
    // IT IS A REAL REDUCTION IN PRACTICE — five mixed questions across
    // everything the unit has covered, down to two specific ones. That is
    // what the handoff asks for ("Two untimed rounds") and it is the owner's
    // call, but it is worth having written down rather than discovered.
    //
    // ROUND 2'S WORDING IS THE HANDOFF'S, NOT THE MOCKUP'S. The pixel
    // reference prints "The note stays the same. What changes?", which hands
    // over the answer before the learner has chosen; START-HERE.md names that
    // and asks for "What changed between the two sounds?" instead. Where the
    // two documents disagree the instruction wins over the picture.
    checkpointGame: [
      { round: 'Airflow',
        prompt: 'Which word starts with air flowing through the nose?',
        submit: 'Check answer',
        // Closed lips in both plates, which is the point of the pair: the
        // lips do the same thing and the soft palate does not.
        cards: [
          { label: 'bad', say: 'bad', art: 'b' },
          { label: 'mad', say: 'mad', art: 'm', ok: true },
        ],
        explain: 'Both words start with the lips closed. For the /m/ at the start of mad the soft palate lowers, and the air leaves through the nose instead of the mouth.' },

      { round: 'Vowel shape',
        prompt: 'What changed between the two sounds?',
        submit: 'Check answer',
        // THE SAME MATCHED PAIR LESSON 2 IS WAITING ON, and the same gate.
        // Scoring a listening question on clips that are 2.1 semitones apart
        // would mark "The pitch" wrong when the pitch is exactly what moved.
        // With the clips absent this round becomes the text review the
        // handoff asks for — stated, not scored.
        compare: { voice: 'nam', label: 'Play comparison', gapMs: 1100,
          needs: ['fleece_vowel_monotone', 'goose_vowel_monotone'] },
        pair: [
          { label: 'ee', sym: 'i\u02d0', art: 'i\u02d0' },
          { label: 'oo', sym: 'u\u02d0', art: 'u\u02d0' },
        ],
        options: [
          { label: 'The vowel', ok: true },
          { label: 'The pitch' },
        ],
        explain: 'The vowel changed, not the pitch. The note stayed where it was \u2014 what moved was the shape of your mouth.',
        // Shown instead of the question when the matched pair is missing.
        review: {
          // The band already says 'Vowel shape', so the heading said it twice.
          // The mockup's own line works here BECAUSE nothing is being asked:
          // in the review there is no answer left to give away.
          heading: 'The note stays the same',
          text: 'On one note, ee and oo are the same pitch and different vowels: the folds are the source, and the changing mouth is the filter. Say them both on one comfortable note and you can hear it in your own voice.',
          notice: 'This round is a listening comparison, and the matched recordings it needs have not been made yet \u2014 so it is given to read rather than scored on audio that would contradict it.',
        } },
    ],
    lessons: [
      { id: 'in-1', title: 'What moves when you speak',
        // ── THE ILLUSTRATED OPENING (owner handoff, 2026-11-13) ──────────
        // `explore` turns this lesson's overview step into the two states the
        // handoff mocks up: an illustrated opening, and one detail state per
        // row that the opening opens. It is DATA, not a second renderer —
        // guideStepHtml dispatches on it, the detail state lives in `st`
        // beside the answers the guide already threads, and a lesson without
        // `explore` renders exactly as it did. Continue still leads into the
        // existing sound steps and Start lesson still reaches the exercises,
        // so nothing about progress or completion moves.
        //
        // NOTHING HERE IS NEW WRITING. Every line is lifted from this lesson's
        // own `guide` below, which is already through editorial review. The
        // three rows ARE its three clauses: the lips close for /p b m/; the
        // tongue tip and blade work near the ridge behind the upper teeth
        // (tea) while the body makes the back closures (key); and the soft
        // palate decides how much goes through the nose, where bad and mad
        // both start with closed lips and only one lets air out the nose.
        //
        // THE ART ALL EXISTS. The opening figure is the labelled cross-section
        // already registered in js/data/voice-art.js — the same labelled side
        // view docs/ORAL_POSTURE_AND_ARTICULATION.md asks for, which turns out
        // to have been drawn in the 2026-09-04 intake. Every word study is a
        // hand-drawn plate already in img/articulation/, resolved by symbol
        // through artFor(), and /m/'s plate already draws the nasal airflow
        // arrow this lesson needs. No slot here waits on a drawing.
        //
        // 'mad' HAS NO CLIP IN ANY ACCENT as of 2026-11-13, so its control
        // renders as plain text and the pair says so, per the strict audio
        // rule. The word is declared here rather than avoided because the
        // approved prose names it; the lesson completes itself the moment the
        // clip lands, with no further change.
        explore: {
          lead: 'Your vocal folds make the buzz. Your mouth and nose shape it.',
          fig: 'mouth-articulators',
          title: 'Explore the instrument',
          // Observations, not instructions — the same qualification the guide
          // makes with its jaw-perturbation example. It renders once, under
          // the rows, so the three detail states do not each have to hedge.
          note: 'These are typical English examples, not a prescription. Speakers reach the same sound by different routes.',
          rows: [
            { id: 'lips', label: 'Lips', pair: 'bad / mad', art: 'b',
              heading: 'Same lips. Different airflow.',
              lead: 'Say bad, then mad. Notice how both start with your lips closed.',
              words: [
                { word: 'bad', art: 'b',
                  note: 'Lips closed, pressure behind them, and the release goes out through your mouth.' },
                { word: 'mad', art: 'm',
                  note: 'Lips closed exactly the same way \u2014 but the soft palate lowers, and for /m/ the air flows out through your nose.' },
              ],
              tryIt: 'Hum mmm. Notice where you feel the buzz.' },

            { id: 'tongue', label: 'Tongue', pair: 'tea / key', art: 't',
              heading: 'Two closures. Two ends of the tongue.',
              lead: 'Say tea, then key. Both begin by stopping the air with the tongue \u2014 in different places.',
              words: [
                { word: 'tea', art: 't',
                  note: 'The tip or blade works near the ridge behind your upper teeth.' },
                { word: 'key', art: 'k',
                  note: 'The body of the tongue rises at the back, toward the soft palate.' },
              ],
              tryIt: 'Say tea, key, tea, key. Feel the contact travel back and forward.' },

            { id: 'airflow', label: 'Airflow', pair: 'mouth / nose', art: 'm',
              heading: 'Where the air comes out.',
              lead: 'Replay bad and mad, and listen for where each one sends the air.',
              words: [
                { word: 'bad', art: 'b',
                  note: 'The soft palate is raised, closing the way to the nose, so the air leaves through your mouth.' },
                { word: 'mad', art: 'm',
                  note: 'The soft palate lowers and opens the way to the nose, so the air leaves there instead.' },
              ],
              tryIt: 'Say mad and pinch your nose halfway through. The sound changes, because that is where the air was going.' },
          ],
        },
        guide: 'The vocal folds supply the buzz; the throat, mouth and nose shape it. The tongue, jaw, lips and soft palate make the closures and narrow gaps that tell consonants apart. Tongue tip and blade work near the teeth and the ridge behind them (tea, sea); the tongue body makes the back closures (key, sing); the lips close for /p b m/ and round for /uː/; the soft palate decides how much goes through the nose — bad and mad both start with closed lips, and only one lets air out the nose. These are typical English examples, not a prescription: in one jaw-perturbation experiment speakers compensated with the lips for /b/ but with the tongue for /z/. The parts coordinate to get a sound; they do not have to move identically from speaker to speaker.', phonemes: ['s', 'k', 'm', 'f', 'θ'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'in-2', title: 'Shape, not pitch',
        // ── THE CONTRAST PANE (owner handoff, 2026-11-13) ────────────────
        // Lesson 1's `explore` is a list of rows that open; this one is a
        // single comparison with a check after it, so it rides the same step
        // and the same `st`, and `kind` picks the layout. One mechanism, two
        // shapes — the way the Learn renderer already works.
        //
        // THE DEMONSTRATION IS GATED ON AUDIO THAT DOES NOT EXIST, AND THAT
        // IS THE WHOLE POINT OF `needs`. This lesson's claim is that the
        // vowel changes while the note does not. The two approved clips were
        // measured on 2026-11-13 and they cannot carry it:
        //
        //   fleece_vowel  starts 190 Hz and FALLS to 129 Hz — a glide of
        //                 nearly seven semitones, not a note
        //   goose_vowel   sits steady around 114-122 Hz
        //   medians       2.1 semitones apart
        //
        // Neither was recorded to be compared, and a learner with a working
        // ear would hear 'ee' fall, answer "The pitch", and be told they were
        // wrong — in an ear-training app. So the 'Same pitch' cue and the
        // check render ONLY when both slugs in `needs` are approved, and
        // until then the lesson says what is missing.
        //
        // THE TWO 'Hear' BUTTONS STILL WORK. Individually the clips are fine:
        // they are approved recordings of /iː/ and /uː/ by the reference
        // voice. It is only the comparison between them that is unsupported,
        // so only the comparison is withheld. Try it needs no audio at all —
        // the learner makes the sound — so it is always there, which leaves
        // the actual exercise intact on the way to the recordings.
        explore: {
          kind: 'contrast',
          voice: 'nam',          // the only accent with approved isolated phonemes
          lead: 'You can change the vowel without changing the note.',
          cue: 'Same pitch',
          pair: [
            { label: '\u201cee\u201d', sym: 'i\u02d0', art: 'i\u02d0',
              hear: 'Hear ee', caption: 'Lips slightly spread, tongue high and forward.' },
            { label: '\u201coo\u201d', sym: 'u\u02d0', art: 'u\u02d0',
              hear: 'Hear oo', caption: 'Lips rounded, tongue high and back.' },
          ],
          // The matched pair this demonstration needs: both vowels sustained
          // on ONE steady comfortable note, in a single take, at one level.
          // Recorded, prepped and approved like any other phoneme clip, at
          // which point everything below turns on with no code change.
          needs: ['fleece_vowel_monotone', 'goose_vowel_monotone'],
          missing: 'The same-pitch comparison needs a matched pair: both vowels held on one steady note, in a single take. The recordings here are the sounds themselves, made separately, and they do not share a note \u2014 so the comparison is not offered rather than shown misleadingly.',
          tryIt: { title: 'Try it',
            text: 'On one comfortable note, glide from ee to oo. Notice what changes.' },
          check: {
            open: 'Quick check',
            heading: 'What changed?',
            lead: 'Listen to both sounds.',
            play: 'Play comparison',
            gapMs: 1100,
            // NOTHING IS PRESELECTED and the answer is not revealed, per the
            // handoff. A wrong answer offers the comparison again rather than
            // correcting the learner and moving on.
            options: [
              { label: 'The vowel', ok: true },
              { label: 'The pitch', ok: false },
            ],
            right: 'The vowel changed. The note stayed the same.',
            wrong: 'Listen again. Both sounds sit on the same note \u2014 what moved was the shape of your mouth.',
          },
        },
        guide: 'Say ee–ah–oo gently on roughly one note. Three vowels, no change of pitch — because the folds are the source and the changing mouth is the filter. Pitch has its own correlate (the fundamental); vowels are told apart by the first two vocal-tract resonances, the formants. More open vowels generally carry a higher first formant, more front vowels a higher second, though rounding moves the second as well, so a formant is not a direct readout of tongue position. Nasal resonance is a separate matter from brightness: /m n ŋ/ need it, a little on neighbouring vowels is normal, and a buzz felt in the face diagnoses nothing.', phonemes: ['iː', 'ɑː', 'uː', 'm', 'ŋ'], types: ['description', 'symbolToWord', 'soundToSymbol'] },
      { id: 'in-3', title: 'Clear without sounding mechanical',
        // ── THE DELIVERY PANE (owner handoff, 2026-11-13) ────────────────
        // The third `explore.kind` in this unit: a listening contrast, then
        // an emphasis switch. Same step and same `st` as the other two.
        //
        // THE TEACHING IS ALREADY IN THE GUIDE BELOW. "Brief exaggeration can
        // find a contrast, then it comes back into the line" is the two
        // deliveries, and emphasis is named in its first sentence. The only
        // new writing is the demonstration line itself, which is the owner's.
        //
        // THE TWO RECORDINGS DO NOT EXIST AND THERE IS NO PLACE TO PUT THEM
        // YET. Two DELIVERIES of one line is a performance contrast, not a
        // pronunciation one: the same speaker reading the same words twice,
        // which no generated voice can be trusted to fake and which the
        // handoff explicitly says not to simulate. It also has nowhere to
        // live — a word-tree clip is keyed on its text, so two performances
        // of one sentence collide on one slug, and inventing a convention
        // before the files exist would be guessing at the shape of something
        // nobody has recorded. So the cards are flagged as assets needed,
        // by name, and the storage question waits for the audio.
        //
        // MAKE IT LAND NEEDS NO AUDIO AT ALL, so the exercise the lesson is
        // actually built around is whole: the learner moves the emphasis and
        // says the line. Neither choice is wrong, and the pane says so.
        explore: {
          kind: 'delivery',
          lead: 'Same words. Two deliveries.',
          line: 'Leave the keys by the door.',
          deliveries: [
            { label: 'Over-enunciated',
              hint: 'Every consonant struck, every word given its own space.' },
            { label: 'Clear and conversational',
              hint: 'The same words, the same consonants, at the rate you would actually say them.' },
          ],
          missing: 'Both deliveries are recordings that have not been made: one speaker reading this line twice, over-enunciated and then conversational. They are named here as assets needed rather than faked with a generated voice, which could not be trusted to tell the two apart.',
          make: {
            heading: 'Make it land',
            open: 'Make it land',
            // ONE line, not a two-item list (owner's call, 2026-11-13).
            // The pair it replaces told the learner what the prompt under
            // the chips tells them again as soon as they pick, and cost four
            // wrapped rows to do it: measured at 375 wide, dropping them
            // lifts the foot of the pane from 576px to 532px. That 44px is
            // what puts the takeaway line on screen on a short phone — an
            // iPhone SE leaves about 553px once browser chrome is off.
            // What survives is the part nothing else carries: pick one,
            // say it out loud, try both.
            brief: 'Pick a word, say the line aloud, then try the other.',
            // Both are right, and the prompt says which question each answers
            // rather than which is correct.
            words: [
              { word: 'keys', prompt: 'Stressing keys answers what to leave.' },
              { word: 'door', prompt: 'Stressing door answers where to leave it.' },
            ],
            note: 'Neither is wrong. The emphasis follows what the listener needs to know.',
            close: 'Let the meaning guide the emphasis.',
          },
        },
        guide: 'Enunciation is helping a listener tell words apart — articulation, timing, emphasis, phrasing and audibility together. Speech gestures overlap: the lips can begin rounding for a vowel before the consonant before it has finished. That is coarticulation, not sloppiness, and you do not reset the mouth between sounds. Make the meaningful contrast audible (coat, not goat), keep endings distinct (she packs, she packed) without forcing a puff of air onto every final consonant, and pause between ideas rather than between words. Clear speech is possible at a normal rate; brief exaggeration can find a contrast, then it comes back into the line.', phonemes: ['p', 'b', 't', 'd', 'k'], types: ['minimalPair', 'description', 'soundToSymbol'] },
    ],
  },
  {
    id: 'vowels-1',
    title: 'Short Vowels',
    color: '#6f8657',
    icon: 'ɪ',
    blurb: 'The six short vowels of English, plus the humble schwa.',
    lessons: [
      { id: 'v1-1', title: 'KIT, DRESS & TRAP',
        // ── Illustrated opening (owner handoff, 2026-11-13) ──────────
        // THE HANDOFF ASKED FOR sit / set / sat, AND THEY DO NOT EXIST.
        // Zero clips across all ten accent-voice pairs; declaring them
        // would owe audit_audio thirty recordings. The brief's own reason
        // for that triplet is "the same surrounding consonants so the
        // learner can focus on the vowel" — so the frame is what matters,
        // not those three words. bid / bed / bad is the only other full
        // minimal triplet in the library and it is complete in all ten
        // voices, so the listening check is real and scored today.
        // Owner chose it over kit/dress/trap, which are recorded but share
        // no frame. The course already leans on "bid vs bed" in v1-4.
        //
        // /e/ NOT /ɛ/: the mockup writes DRESS as /ɛ/, and the handoff
        // says to follow the app's convention where they differ. This
        // course has always written /e/ — in this lesson's own guide text,
        // in `phonemes` below, and in articulation-art — so /ɛ/ here would
        // be the one place in the app that disagrees with itself.
        explore: {
          kind: 'vowels',
          lead: 'Hear the vowel in the middle.',
          frame: 'Same consonants either side. Only the vowel moves.',
          // The plates are the ones articulation-art already maps for
          // these three symbols, so the rows are illustrated today. They
          // are diagrams, not the ink-and-wash vignettes the handoff
          // pictures; swapping those in later is a data change here.
          rows: [
            { set: 'KIT', ipa: 'ɪ', word: 'bid', hint: 'Jaw nearly closed.' },
            { set: 'DRESS', ipa: 'e', word: 'bed', hint: 'Jaw halfway.' },
            { set: 'TRAP', ipa: 'æ', word: 'bad', hint: 'Jaw nearly open.' },
          ],
          // Shown INSTEAD of the check when the recordings are not there.
          // Unreachable while bid/bed/bad are complete, which is the point:
          // it is the state the lesson falls back to, not a disclaimer.
          missing: 'These three recordings are missing in this voice, so the words are printed rather than offered and there is no listening check — a check you cannot hear would score nothing. The contrast above still teaches without listening credit.',
          check: {
            open: 'Try a listening check',
            heading: 'Which vowel did you hear?',
            play: 'Play mystery word',
            replay: 'Replay as often as you like.',
            // ONE OF THE THREE TAUGHT WORDS, as the handoff specifies for a
            // first round. Fixed rather than random: a random word would
            // make the suite non-deterministic, and Math.random is banned
            // in workflow scripts for the same reason. The correct answer
            // is DERIVED from whichever row holds this word, so the two
            // cannot drift apart.
            mystery: 'bed',
            submit: 'Check answer',
            retry: 'Try again',
            right: 'Yes — that was the DRESS vowel.',
            wrong: 'Not quite — listen again for how far the jaw drops.',
            // PLAIN TEXT, because every lesson string goes through esc().
            // Markup here would have to travel an un-escaped path, and a
            // lesson field is not worth opening one.
            reveal: 'The word was “bed” — DRESS /e/, the jaw halfway between “bid” and “bad”.',
          },
        },
        guide: 'Three front vowels, stacked by how open your mouth is: /ɪ/ is nearly closed (kit), /e/ is halfway (dress), /æ/ is nearly open (trap). Say them in a row and feel your jaw drop.', phonemes: ['ɪ', 'e', 'æ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-2', title: 'STRUT, FOOT & LOT', guide: 'Three more short vowels, made further back in the mouth: /ʌ/ is open and relaxed (but), /ʊ/ is high with rounded lips (foot), /ɒ/ is low with rounded lips (lot).', phonemes: ['ʌ', 'ʊ', 'ɒ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v1-3', title: 'Meet the schwa',
        // ── Illustrated opening (owner handoff, 2026-11-13) ──────────
        // THIS HANDOFF'S OWN WORDS WORK, unlike lesson 5's. `about` and
        // `sofa` are both recorded in all ten accent-voice pairs, and the
        // dictionary confirms the positions the handoff claims:
        // about = əˈbaʊt (schwa first, stress second) and sofa = ˈsoʊfə
        // (schwa last). Nothing had to be substituted.
        //
        // The transfer rounds are the handoff's "vary the position of
        // schwa using examples verified against the course recordings".
        // Verified is the operative word: of the 197 words recorded in
        // every voice, exactly ELEVEN carry a single schwa, and these are
        // the two-syllable ones. They alternate which syllable holds it,
        // which is the only thing the exercise is asking about.
        explore: {
          kind: 'schwa',
          symbol: 'ə',
          lead: 'Schwa often shows up in unstressed syllables.',
          // The stressed syllable is the one the schwa is NOT in. Marking
          // it is the whole demonstration: the colourless vowel is what is
          // left over when the stress goes elsewhere.
          demo: { word: 'about', parts: ['a', 'bout'], stress: 1, play: 'Hear about' },
          open: 'Find the schwa',
          missing: 'None of these words is recorded in this voice, so they are printed rather than offered and there is no tap exercise — an ear exercise you cannot hear teaches nothing. The sound above is still described without listening credit.',
          check: {
            heading: 'Where’s the schwa?',
            replay: 'Replay as often as you like — it will not change your answer.',
            wrong: 'Not that one. Play it again and listen for the colourless syllable.',
            retry: 'Try again',
            next: 'Try another word',
            done: 'That is schwa in every position it takes in a two-syllable word.',
            // ROUNDS ARE FILTERED BY WHAT IS ACTUALLY RECORDED before any
            // of this renders, so a clip going missing drops its round
            // rather than breaking the exercise.
            rounds: [
              { word: 'sofa', parts: ['so', 'fa'], answer: 1, reveal: 'You heard /ə/ at the end of sofa.' },
              { word: 'machine', parts: ['ma', 'chine'], answer: 0, reveal: 'You heard /ə/ at the start of machine.' },
              { word: 'station', parts: ['sta', 'tion'], answer: 1, reveal: 'You heard /ə/ at the end of station.' },
              { word: 'away', parts: ['a', 'way'], answer: 0, reveal: 'You heard /ə/ at the start of away.' },
            ],
          },
        },
        guide: 'The schwa /ə/ is the most common sound in English — the colourless \'uh\' in every unstressed syllable: a-bout, so-fa, ba-na-na. If a vowel is unstressed, it\'s probably a schwa.', phonemes: ['ə', 'ɪ', 'ʌ'], types: ['symbolToWord', 'soundToSymbol', 'description'] },
      { id: 'v1-4', title: 'Short vowels round-up', guide: 'All seven short vowels together: /ɪ e æ ʌ ʊ ɒ ə/. This round-up mixes them so you can tell neighbours apart — especially /æ/ vs /ʌ/ (cat vs cut) and /ɪ/ vs /e/ (bid vs bed).', phonemes: ['ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə'], types: ['soundToSymbol', 'match', 'minimalPair'] },
    ],
  },
  {
    id: 'vowels-2',
    title: 'Long Vowels',
    color: '#7191a8',
    icon: 'iː',
    blurb: 'Five long vowels — the length mark ː is your friend.',
    lessons: [
      { id: 'v2-1', title: 'FLEECE & GOOSE', guide: 'The length mark ː means \'hold it longer\'. /iː/ (fleece) is a longer, tenser cousin of /ɪ/ (kit); /uː/ (goose) pairs the same way with /ʊ/ (foot). Ship–sheep and full–fool live or die on this difference.', phonemes: ['iː', 'uː', 'ɪ', 'ʊ'], types: ['symbolToWord', 'soundToSymbol', 'minimalPair'] },
      { id: 'v2-2', title: 'PALM, THOUGHT & NURSE', guide: 'Three long vowels from the back and centre of the mouth: /ɑː/ (palm), /ɔː/ (thought), and /ɜː/ (nurse) — the long neutral vowel in stir, learn, word.', phonemes: ['ɑː', 'ɔː', 'ɜː'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'v2-3', title: 'Long vs short', guide: 'Long versus short, head to head. Every pair here differs mainly by length and tension: /iː–ɪ/, /uː–ʊ/, /ɑː–æ/. Listen for duration, not just quality.', phonemes: ['iː', 'ɪ', 'uː', 'ʊ', 'ɑː', 'æ'], types: ['soundToSymbol', 'minimalPair', 'build'] },
    ],
  },
  {
    id: 'diphthongs',
    title: 'Diphthongs',
    color: '#9d8bb0',
    icon: 'aɪ',
    blurb: 'Vowels that travel — eight glides from one position to another.',
    lessons: [
      { id: 'd-1', title: 'FACE, PRICE & CHOICE', guide: 'Diphthongs are vowels in motion — one vowel gliding into another within a syllable. /eɪ/ (face), /aɪ/ (price), and /ɔɪ/ (choice) all glide toward an /ɪ/-like sound.', phonemes: ['eɪ', 'aɪ', 'ɔɪ'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
      { id: 'd-2', title: 'GOAT & MOUTH', guide: 'Two glides that travel toward /ʊ/: /əʊ/ starts at schwa (goat, show), /aʊ/ starts open (mouth, now). The starting point is what separates them.', phonemes: ['əʊ', 'aʊ'], types: ['symbolToWord', 'soundToSymbol', 'build'] },
      { id: 'd-3', title: 'NEAR, SQUARE & CURE', guide: 'The centring diphthongs glide toward schwa — /ɪə/ (near), /eə/ (square), /ʊə/ (cure). They mostly appear where an r used to be pronounced, which is why RP loves them.', phonemes: ['ɪə', 'eə', 'ʊə'], types: ['symbolToWord', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'consonants-1',
    title: 'Stops & Nasals',
    color: '#c99e58',
    icon: 'ŋ',
    blurb: 'Familiar friends — plus /ŋ/, the sound at the end of “sing”.',
    lessons: [
      { id: 'c1-1', title: 'Plosives', guide: 'Plosives block the air, then release it. They come in voiceless/voiced pairs made at the same spot: /p b/ at the lips, /t d/ at the tooth ridge, /k g/ at the back of the mouth.', phonemes: ['p', 'b', 't', 'd', 'k', 'g'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c1-2', title: 'Nasals', guide: 'Nasals send the air through your nose: /m/ at the lips, /n/ at the tooth ridge, and /ŋ/ at the back — the \'ng\' in sing. English never starts a word with /ŋ/, but it ends plenty.', phonemes: ['m', 'n', 'ŋ'], types: ['description', 'symbolToWord', 'soundToSymbol'] },
      { id: 'c1-3', title: 'Stops & nasals round-up', guide: 'All nine stops and nasals mixed: /p b t d k g m n ŋ/. Watch for /ŋ/ hiding in spelling — \'thanks\' has it, and \'finger\' has /ŋg/, two sounds.', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['soundToSymbol', 'match', 'build'] },
    ],
  },
  {
    id: 'consonants-2',
    title: 'Fricatives & Friends',
    color: '#b96a56',
    icon: 'θ',
    blurb: 'Where IPA earns its keep: θ, ð, ʃ, ʒ and company.',
    lessons: [
      { id: 'c2-1', title: 'The two “th” sounds', guide: 'English has two \'th\' sounds and four lip-teeth friends. /θ/ (think) is voiceless, /ð/ (this) is voiced — same tongue position, different buzz. Same pairing for /f/ (fat) and /v/ (van).', phonemes: ['θ', 'ð', 'f', 'v'], types: ['description', 'symbolToWord', 'minimalPair'] },
      { id: 'c2-2', title: 'Hissers & hushers', guide: 'The hissers /s z/ are made at the tooth ridge; the hushers /ʃ ʒ/ slightly further back with rounded lips — ship, measure. /h/ is just breath through an open throat.', phonemes: ['s', 'z', 'ʃ', 'ʒ', 'h'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-3', title: 'Affricates & glides', guide: 'Affricates are a stop released into a fricative: /tʃ/ (chin), /dʒ/ (jam). The approximants /l r w j/ barely obstruct the air at all — they\'re almost vowels.', phonemes: ['tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'c2-4', title: 'Consonant round-up', guide: 'The consonants that make IPA worth learning: both th-sounds, both hushers, both affricates, /ŋ/, and /j/ — the \'y\' sound hiding in few /fjuː/ and use /juːz/.', phonemes: ['θ', 'ð', 'ʃ', 'ʒ', 'tʃ', 'dʒ', 'ŋ', 'j'], types: ['soundToSymbol', 'build', 'match'] },
    ],
  },
  {
    id: 'reading',
    title: 'Reading & Writing IPA',
    color: '#6e9187',
    icon: '✍️',
    blurb: 'Sight-reading fluency: spelling to transcription and back, words to full sentences.',
    lessons: [
      { id: 'r-1', title: 'Decode the word', guide: 'Sight-reading starts here: look at a transcription and know the word — no sounding out, no hesitation. Then the reverse: see the IPA, supply the missing English letters. Remember that English spelling lies; the IPA never does.', phonemes: ['ɪ', 'iː', 'æ', 'e', 'ʃ', 'tʃ'], types: ['typeWord', 'spellBlank'] },
      { id: 'r-2', title: 'Mind the gaps', guide: 'Transcriptions with holes in them. One or more symbols are missing — hear the word, feel the sounds in order, and fill every gap. This is where symbol knowledge becomes muscle memory.', phonemes: ['ɪ', 'iː', 'æ', 'ʌ', 'ʃ', 'θ', 'ð', 'ŋ'], types: ['gapBuild', 'fillBlank'] },
      { id: 'r-3', title: 'Read the sentence', guide: 'Whole sentences now. Read a full line of IPA and say what it means, then flip it: pick the correct transcription of an English sentence. The wrong answers differ by a single sound — ship for sheep, bed for bad — so read every symbol.', phonemes: ['ɪ', 'iː', 'æ', 'e', 'ð', 'ə'], types: ['sentenceToEnglish', 'englishToIpa'] },
      { id: 'r-4', title: 'Reading round-up', guide: 'Everything at once: type spellings from IPA, fill transcription gaps, and read full sentences in both directions. Fluency is when none of this feels like translation anymore.', phonemes: ['ɪ', 'iː', 'æ', 'ʃ', 'tʃ', 'θ', 'ð', 'ə'], types: ['typeWord', 'gapBuild', 'sentenceToEnglish', 'englishToIpa', 'spellBlank'] },
    ],
  },
  // ── THREE STAGES, NOT FOUR (owner order, 2026-11-06) ──────────
  //
  // Every accent ran Orientation (1 lesson) / The Sounds (9) / Shift Work
  // (2) / Mastery (1). Two of those four held a single lesson, which is
  // not a unit, and the third held most of the course — invisible while
  // the Learn page was one long scroll, and impossible to miss the moment
  // it became a grid of unit cards.
  //
  // THE LESSONS DID NOT MOVE IN ORDER and NOT ONE LESSON ID CHANGED. This
  // is a regrouping: the same lessons, the same sequence, the same lock
  // chain. Ids are storage here and are never renamed.
  //
  // THE GENERATED CHECKPOINT IDS DID CHANGE, because expandUnit keys them
  // to the unit they sit in (`chk-<unit>-<n>`). js/state.js carries a
  // versioned migration that maps the old ones across by position, so no
  // completed checkpoint is lost.
  {
    id: 'nam-meet',
    title: 'Stage 1 · Meet the Accent',
    color: '#b05f4d',
    icon: '📍',
    blurb: 'What Neutral American is, and the three sounds that give it away.',
    lessons: [
      { id: 'nam-0', title: 'Meet the accent', accent: 'nam', guide: 'Neutral American is a performance target based on broadly regionally unmarked U.S. speech. It is rhotic — /r/ is pronounced in every position, spoken as the approximant [ɹ] — and it avoids strongly identifiable regional features, but no single pronunciation represents every American speaker. This course teaches one consistent target and flags the common areas of variation as they come up. Its signature moves: BATH words stay flat /æ/, LOT opens to /ɑ/, and GOAT starts back and rounded at /oʊ/. This first lesson is a gentle tour — the stages after it go deep.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ', 'æ'], types: ['accentFact', 'accentRhythm', 'soundToSymbol', 'fillBlank'] },
      { id: 'nam-1', title: 'R is everywhere', accent: 'nam', guide: 'Neutral American is rhotic: /r/ is pronounced in all positions — spoken as the approximant [ɹ], written /r/ in broad transcription. After a vowel it colors the vowel itself — the stressed NURSE vowel becomes /ɝ/ (word, learn) and the unstressed lettER ending becomes /ɚ/ (teacher, father). Elsewhere the /r/ simply survives: car /kɑr/, here /hɪr/.', phonemes: ['ɝ', 'ɚ', 'ɑ'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'nam-2', title: 'Flat BATH, open LOT', accent: 'nam', guide: 'Two vowels separate American from British at a glance. BATH words keep flat /æ/ — bath, dance, grass, ask — where RP broadens to /ɑː/. And LOT words open and unround to /ɑ/ — lot, stop, father — where RP keeps rounded /ɒ/. One common variation to know: before nasals, /æ/ often raises — man and dance drift toward [ɛə] — a feature to recognize even while the broad symbol stays /æ/.', phonemes: ['æ', 'ɑ'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'nam-3', title: 'The American GOAT', accent: 'nam', guide: 'The GOAT diphthong starts differently on each side of the Atlantic. American /oʊ/ begins back and rounded (go, home, soap); RP /əʊ/ begins at the neutral schwa. Your ear will catch it faster than your eye.', phonemes: ['oʊ', 'ɑ', 'ɚ'], types: ['accentFact', 'soundToSymbol', 'build'] },
    ],
  },
  {
    id: 'nam-sounds',
    title: 'Stage 2 · The Sounds',
    color: '#b05f4d',
    icon: '🇺🇸',
    accent: true,
    blurb: 'Every vowel and consonant of the accent, swept through in order.',
    lessons: [
      { id: 'nam-v1', title: 'The vowels · short & central', accent: 'nam', guide: 'Every short and central vowel of Neutral American, one by one. /ɪ/ (kit), /e/ (dress), /æ/ (trap — and BATH words too), /ʌ/ (but), /ʊ/ (foot), /ɑ/ (lot, open and unrounded), and the schwa /ə/ that fills every unstressed syllable. Open the diagram on each to see where your tongue sits.', phonemes: ['ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɑ', 'ə'], types: ['soundToSymbol', 'symbolToWord', 'description'] },
      { id: 'nam-v2', title: 'The vowels · tense & r-coloured', accent: 'nam', guide: 'The tense vowels and the sounds that make American American. This course writes /iː uː ɔː/ with length marks as learner-friendly broad symbols — American vowel length is not a contrastive system the way it can look on the page; duration varies with context. /ɔː/ (thought) rounds at the back, and here is a variation worth knowing: many Americans merge THOUGHT into LOT — the cot–caught merger — saying both as /ɑ/. This course keeps the distinction as its target; treat the merger as a common, completely standard variation to recognize. Then the r-coloured pair: /ɝ/ stressed (word, learn) and /ɚ/ unstressed (teacher, father).', phonemes: ['iː', 'uː', 'ɔː', 'ɝ', 'ɚ'], types: ['soundToSymbol', 'symbolToWord', 'minimalPair'] },
      { id: 'nam-v3', title: 'The diphthongs', accent: 'nam', guide: 'The five gliding vowels: /eɪ/ (face), /aɪ/ (price), /ɔɪ/ (choice), /aʊ/ (mouth), and the American GOAT /oʊ/ — back and rounded at the start, where RP begins at schwa. Each diagram shows the glide as an arrow from where it starts to where it lands.', phonemes: ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'oʊ'], types: ['soundToSymbol', 'symbolToWord', 'match'] },
      { id: 'nam-c1', title: 'The consonants · stops & nasals', accent: 'nam', guide: 'The plosives /p b t d k g/ block and release; the nasals /m n ŋ/ send air through the nose. The American signature move lives here: between vowels, /t/ and /d/ are usually tapped to a quick flap [ɾ] — better [ˈbeɾɚ], city [ˈsɪɾi], ladder [ˈlæɾɚ] — so “latter” and “ladder” can sound identical. It is a realization of /t d/, not an extra phoneme; the broad transcription keeps /t d/.', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'nam-c2', title: 'The consonants · fricatives & the rest', accent: 'nam', guide: 'The friction sounds and approximants: /f v θ ð s z ʃ ʒ h/, the affricates /tʃ dʒ/, and /l r w j/. The American /r/ — the approximant [ɹ] — survives everywhere, including after vowels: the single loudest marker of the accent. /l/ is dark [ɫ] in most positions, made with the tongue back raised — feel the difference in “feel” vs a clear British “leg”. And yods drop after /t d n/: tune /tuːn/, duty /ˈduːti/, new /nuː/ — no /j/ where RP keeps one.', phonemes: ['f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h', 'tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'nam-use',
    title: 'Stage 3 · Putting It to Work',
    color: '#b05f4d',
    icon: '🎯',
    blurb: 'Transcribe it, arrive at it from British forms, and prove it at speed.',
    lessons: [
      { id: 'nam-4', title: 'Transcribe American', accent: 'nam', guide: 'Full Neutral American transcriptions. Keep every /r/, keep BATH flat at /æ/, open LOT to /ɑ/, start GOAT at /oʊ/, and give r-colored vowels their hooks: /ɝ/ stressed, /ɚ/ unstressed. In connected speech, function words weaken — “can” is usually /kən/, “was” /wəz/ — and the rhythm rides the stressed syllables while everything between them compresses.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ'], types: ['build', 'accentFact', 'soundToSymbol'] },
      { id: 'nam-s1', title: 'Into American I', shiftTo: 'nam', guide: 'You know the sounds; now practice arriving at them. Given the British form of a word, produce the American one: restore the r’s, flatten BATH to /æ/, unround LOT to /ɑ/. The wrong answers will tempt you with the form you started from — that’s the trap your mouth sets on stage too.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'æ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'nam-s2', title: 'Into American II', shiftTo: 'nam', guide: 'Same skill, harder mix — building transcriptions from the British form and checking your ear between rounds. By the end of this stage the shift should feel like flipping a switch.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'oʊ', 'æ'], types: ['shiftBuild', 'shiftChoice', 'accentEar'] },
      { id: 'nam-final', title: 'Neutral American final', accent: 'nam', shiftTo: 'nam', count: 12, guide: 'Twelve questions, every exercise type, everything the course taught: the r-colored vowels, flat BATH, open LOT, American GOAT, full transcriptions, shifts from British forms, and your ear. Pass this and Neutral American is yours — the course is complete.', phonemes: ['ɝ', 'ɚ', 'ɑ', 'oʊ', 'æ'], types: ['accentFact', 'accentRhythm', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar'] },
    ],
  },
  // ── THREE STAGES, NOT FOUR (owner order, 2026-11-06) ──────────
  //
  // Every accent ran Orientation (1 lesson) / The Sounds (9) / Shift Work
  // (2) / Mastery (1). Two of those four held a single lesson, which is
  // not a unit, and the third held most of the course — invisible while
  // the Learn page was one long scroll, and impossible to miss the moment
  // it became a grid of unit cards.
  //
  // THE LESSONS DID NOT MOVE IN ORDER and NOT ONE LESSON ID CHANGED. This
  // is a regrouping: the same lessons, the same sequence, the same lock
  // chain. Ids are storage here and are never renamed.
  //
  // THE GENERATED CHECKPOINT IDS DID CHANGE, because expandUnit keys them
  // to the unit they sit in (`chk-<unit>-<n>`). js/state.js carries a
  // versioned migration that maps the old ones across by position, so no
  // completed checkpoint is lost.
  {
    id: 'aus-meet',
    title: 'Stage 1 · Meet the Accent',
    color: '#5f8a86',
    icon: '📍',
    blurb: 'What Australian is, and the three sounds that give it away.',
    lessons: [
      { id: 'aus-0', title: 'Meet the accent', accent: 'aus', guide: 'This course teaches General Australian English — the mainstream variety most Australians speak — using the revised Australian transcription system, so the symbols match what you will meet in Australian phonetics references. Australian runs on a spectrum from Broad through General to Cultivated (which leaned toward RP and is now recessive), and it varies by region and social group like any living accent; General is the target here. It is non-rhotic like RP — the written r goes silent unless a vowel follows — but its vowels have shifted noticeably: PALM and BATH become /ɐː/, STRUT becomes /ɐ/, GOOSE fronts to /ʉː/, and the diphthongs start from wider, lower positions. Learn the shifts and the accent falls into place quickly.', phonemes: ['ɐ', 'ɐː', 'ʉː', 'æɪ'], types: ['accentFact', 'accentRhythm', 'soundToSymbol', 'fillBlank'] },
      { id: 'aus-1', title: 'Central vowels', accent: 'aus', guide: 'Australian pulls its open vowels toward the centre of the mouth. STRUT is /ɐ/ (cup, love, blood) and PALM/BATH lengthen to /ɐː/ (car, father, bath). Both sit further forward than the RP /ʌ/ and /ɑː/ they replace — the difference an ear notices first. BATH itself varies by region: “dance” and “castle” take /ɐː/ for some Australians and /æ/ for others, split roughly along state lines — both are genuinely Australian.', phonemes: ['ɐ', 'ɐː'], types: ['accentFact', 'soundToSymbol', 'build'] },
      { id: 'aus-2', title: 'The fronted GOOSE', accent: 'aus', guide: 'GOOSE moves a long way forward: /ʉː/, a close central rounded vowel, not the back /uː/ of RP. Say “two, blue, goose” with your tongue high and forward and the accent arrives on its own. Non-rhoticity still applies throughout — no /r/ unless a vowel follows, though linking R returns before vowels (“far away”) and intrusive R appears where no r is written (“law-r-and order”).', phonemes: ['ʉː', 'ɜː', 'oː', 'ɪə'], types: ['accentFact', 'soundToSymbol', 'build'] },
      { id: 'aus-3', title: 'The shifted diphthongs', accent: 'aus', guide: 'Four diphthongs distinguish Australian at a glance. FACE opens to /æɪ/ (day, rain), PRICE retracts and lands mid-front: /ɑe/ (high, my), MOUTH becomes /æɔ/ (now, mouth), and GOAT glides toward that fronted /ʉ/: /əʉ/ (go, home, soap). Each starts from a wider or lower position than its RP counterpart.', phonemes: ['æɪ', 'ɑe', 'æɔ', 'əʉ'], types: ['accentFact', 'soundToSymbol', 'build'] },
    ],
  },
  {
    id: 'aus-sounds',
    title: 'Stage 2 · The Sounds',
    color: '#5f8a86',
    icon: '🇦🇺',
    accent: true,
    blurb: 'Every vowel and consonant of the accent, swept through in order.',
    lessons: [
      { id: 'aus-v1', title: 'The vowels · short & central', accent: 'aus', guide: 'The short vowels, including the two that pull toward the centre. /ɪ/ (kit), /e/ (dress), /æ/ (trap), /ʊ/ (foot), /ɔ/ (lot — written /ɔ/ in the Australian system because it sits higher than the RP /ɒ/), schwa /ə/ — and the Australian STRUT /ɐ/, further forward than the RP /ʌ/ it replaces. Each diagram shows how far forward the tongue sits.', phonemes: ['ɪ', 'e', 'æ', 'ʊ', 'ɔ', 'ə', 'ɐ'], types: ['soundToSymbol', 'symbolToWord', 'description'] },
      { id: 'aus-v2', title: 'The vowels · long & fronted', accent: 'aus', guide: 'The long vowels carry the accent. /ɐː/ takes PALM and BATH (car, father), /ʉː/ is GOOSE pushed high and forward, THOUGHT rises to /oː/ (law, north, four) — a noticeably closer vowel than RP /ɔː/ — and SQUARE is the steady monophthong /eː/ (square, fair, there): no glide. /iː/ (fleece) keeps its place on the chart, though many speakers say it with a small onglide, closer to [ɪi]. /ɜː/ (nurse) holds the centre. Non-rhotic throughout — no /r/ unless a vowel follows.', phonemes: ['iː', 'ɐː', 'ʉː', 'oː', 'eː', 'ɜː'], types: ['soundToSymbol', 'symbolToWord', 'minimalPair'] },
      { id: 'aus-v3', title: 'The diphthongs', accent: 'aus', guide: 'The four shifted glides that make the accent unmistakable — FACE /æɪ/, PRICE /ɑe/, MOUTH /æɔ/, GOAT /əʉ/ — plus CHOICE /oɪ/ (starting higher than RP /ɔɪ/) and centring NEAR /ɪə/. CURE /ʊə/ survives only as a rare, receding relic: most contemporary Australians merge CURE words into other vowels, usually /oː/ (“sure” sounding like “shore”). The arrows show each journey.', phonemes: ['æɪ', 'ɑe', 'æɔ', 'əʉ', 'oɪ', 'ɪə', 'ʊə'], types: ['soundToSymbol', 'symbolToWord', 'match'] },
      { id: 'aus-c1', title: 'The consonants · stops & nasals', accent: 'aus', guide: 'The plosives /p b t d k g/ and nasals /m n ŋ/ — shared ground with RP and American. Knowing exactly where each is made is what lets you keep them steady while the vowels around them shift.', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'aus-c2', title: 'The consonants · fricatives & the rest', accent: 'aus', guide: 'The fricatives /f v θ ð s z ʃ ʒ h/, affricates /tʃ dʒ/, and approximants /l r w j/. Australian is non-rhotic like RP, so /r/ appears only before a vowel — but the consonants do more work than they look: /t/ and /d/ tap to [ɾ] between vowels (“better”, “ladder”) much as in American, word-final /t/ can optionally glottal to [ʔ], /l/ runs dark [ɫ] and often vocalizes toward a w-like sound at word ends (“milk”, “feel”), and yods coalesce — “tune” /tʃʉːn/, “duty” /ˈdʒʉːtiː/.', phonemes: ['f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h', 'tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'aus-use',
    title: 'Stage 3 · Putting It to Work',
    color: '#5f8a86',
    icon: '🎯',
    blurb: 'Transcribe it, arrive at it from other forms, and prove it at speed.',
    lessons: [
      { id: 'aus-4', title: 'Transcribe Australian', accent: 'aus', guide: 'Full Australian transcriptions in the revised system. Keep it non-rhotic, centralise STRUT and PALM to /ɐ ɐː/, front GOOSE to /ʉː/, raise LOT and THOUGHT to /ɔ oː/, hold SQUARE steady at /eː/, and give the diphthongs their shifted starting points: /æɪ ɑe æɔ əʉ oɪ/. Australian rhythm rides long, open vowels, and statements often carry a rising intonation contour — the famous uptalk — without turning into questions.', phonemes: ['ɐ', 'ɐː', 'ʉː', 'ɔ', 'oː', 'æɪ', 'ɑe', 'æɔ', 'əʉ'], types: ['build', 'accentFact', 'soundToSymbol'] },
      { id: 'aus-s1', title: 'Into Australian I', shiftTo: 'aus', shiftFrom: 'rp', guide: 'Given the RP form, produce the Australian one: centralise /ʌ/ to /ɐ/ and /ɑː/ to /ɐː/, front /uː/ to /ʉː/, raise /ɒ/ to /ɔ/ and /ɔː/ to /oː/, and flatten gliding /eə/ to steady /eː/. Non-rhoticity carries over unchanged — that part you already have. The trap answers are the RP forms you are moving away from.', phonemes: ['ɐ', 'ɐː', 'ʉː', 'ɔ', 'oː', 'eː'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'aus-s2', title: 'Into Australian II', shiftTo: 'aus', shiftFrom: 'rp', guide: 'Now the diphthongs, which carry most of the accent: /eɪ/→/æɪ/, /aɪ/→/ɑe/, /aʊ/→/æɔ/, /əʊ/→/əʉ/, /ɔɪ/→/oɪ/. Build them from tiles, then let your ear confirm which accent you are hearing.', phonemes: ['æɪ', 'ɑe', 'æɔ', 'əʉ', 'oɪ'], types: ['shiftBuild', 'shiftChoice', 'accentEar'] },
      { id: 'aus-final', title: 'Australian final', accent: 'aus', shiftTo: 'aus', shiftFrom: 'rp', count: 12, guide: 'Twelve questions across everything the course taught: central /ɐ ɐː/, fronted /ʉː/, raised /ɔ oː/, steady /eː/, the shifted diphthongs, full transcriptions, shifts from RP, and ear checks. Pass it and General Australian is yours.', phonemes: ['ɐ', 'ɐː', 'ʉː', 'ɔ', 'oː', 'æɪ', 'ɑe', 'æɔ', 'əʉ'], types: ['accentFact', 'accentRhythm', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar'] },
    ],
  },
  {
    id: 'shift',
    title: 'Accent Shift Drills',
    color: '#8a7aad',
    icon: '⇄',
    blurb: 'The working actor’s skill: transform a word between accents on command.',
    lessons: [
      { id: 'sh-1', title: 'Hear the difference', guide: 'Before you can shift an accent, you have to hear the shift. Same word, two accents: American keeps its r’s and flat vowels; RP drops post-vocalic r and broadens BATH. Listen for /r/ at word ends, /æ/ vs /ɑː/, and where the GOAT glide starts.', phonemes: ['ɑː', 'ɑ', 'æ', 'oʊ', 'əʊ'], types: ['accentEar', 'shiftChoice'] },
      { id: 'sh-2', title: 'Shift into RP', shiftTo: 'rp', guide: 'Take American words into RP: delete the /r/ unless a vowel follows (and let the vowel lengthen or centre), broaden BATH words from /æ/ to /ɑː/, round LOT to /ɒ/, and start GOAT at schwa: /əʊ/. Your r-colored /ɝ ɚ/ lose their hooks: /ɜː ə/.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ', 'ə'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'sh-3', title: 'Shift into American', shiftTo: 'nam', guide: 'Now the other direction: restore every written r — bare after vowels (car /kɑr/), hooked in NURSE and lettER (/ɝ ɚ/). Flatten BATH back to /æ/, unround LOT to /ɑ/, and start GOAT back and rounded: /oʊ/.', phonemes: ['ɑ', 'ɝ', 'ɚ', 'æ', 'oʊ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'sh-4', title: 'Round trip', guide: 'Both directions, mixed and at speed — plus your ear keeping you honest. This is the drill that makes an accent a switch you flip, not a costume you put on slowly.', phonemes: ['ɑː', 'ɑ', 'ɝ', 'ɜː', 'oʊ', 'əʊ', 'æ'], types: ['shiftChoice', 'shiftBuild', 'accentEar'] },
    ],
  },
  // ── THREE STAGES, NOT FOUR (owner order, 2026-11-06) ──────────
  //
  // Every accent ran Orientation (1 lesson) / The Sounds (9) / Shift Work
  // (2) / Mastery (1). Two of those four held a single lesson, which is
  // not a unit, and the third held most of the course — invisible while
  // the Learn page was one long scroll, and impossible to miss the moment
  // it became a grid of unit cards.
  //
  // THE LESSONS DID NOT MOVE IN ORDER and NOT ONE LESSON ID CHANGED. This
  // is a regrouping: the same lessons, the same sequence, the same lock
  // chain. Ids are storage here and are never renamed.
  //
  // THE GENERATED CHECKPOINT IDS DID CHANGE, because expandUnit keys them
  // to the unit they sit in (`chk-<unit>-<n>`). js/state.js carries a
  // versioned migration that maps the old ones across by position, so no
  // completed checkpoint is lost.
  {
    id: 'rp-meet',
    title: 'Stage 1 · Meet the Accent',
    color: '#6b7fa3',
    icon: '📍',
    blurb: 'What Traditional RP is, and the two shifts that mark it.',
    lessons: [
      { id: 'rp-0', title: 'Meet the accent', accent: 'rp', guide: 'Traditional RP is the historical prestige accent associated with twentieth-century British broadcasting, upper- and upper-middle-class speech, and classical stage performance — including the later performance traditions that grew up around writers such as Shakespeare, Wilde and Shaw. (Shakespeare himself spoke nothing like it; RP is how his plays came to be performed centuries later.) Its signature moves: the written r goes silent unless a vowel follows (car /kɑː/), BATH words broaden to /ɑː/, LOT stays rounded /ɒ/, and GOAT starts at the neutral schwa: /əʊ/. Where an r vanished, a long vowel or centring diphthong stands in its place. This lesson is the guided tour; the stages after it build the accent piece by piece.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ'], types: ['accentFact', 'accentRhythm', 'soundToSymbol', 'fillBlank'] },
      { id: 'rp-1', title: 'Where did the R go?', accent: 'rp', guide: 'RP is non-rhotic: /r/ is only pronounced before a vowel. Everywhere else it vanished, leaving a long vowel or centring diphthong behind — car /kɑː/, north /nɔːθ/, word /wɜːd/, here /hɪə/. But the r is only sleeping: before a vowel it wakes as linking R — “far away” /fɑːr əˈweɪ/ — and speakers even insert an intrusive R where no r is written: “law and order” often gains one between law and and.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə'], types: ['accentFact', 'build', 'soundToSymbol'] },
      { id: 'rp-2', title: 'The BATH split', accent: 'rp', guide: 'In RP, a set of words spelled with \'a\' — bath, dance, grass, ask — take long /ɑː/ instead of flat /æ/. This BATH split is one of the sharpest dividers between RP and most other accents.', phonemes: ['ɑː', 'æ'], types: ['accentFact', 'build', 'minimalPair'] },
    ],
  },
  {
    id: 'rp-sounds',
    title: 'Stage 2 · The Sounds',
    color: '#6b7fa3',
    icon: '🎩',
    accent: true,
    blurb: 'Every vowel and consonant of the accent, swept through in order.',
    lessons: [
      { id: 'rp-v1', title: 'The vowels · short & central', accent: 'rp', guide: 'The short vowels of RP, one at a time: /ɪ/ (kit), /e/ (dress), /æ/ (trap — but not BATH), /ʌ/ (but), /ʊ/ (foot), the rounded /ɒ/ (lot) that American unrounds, and the ever-present schwa /ə/. Open each diagram to see the tongue position that defines it.', phonemes: ['ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə'], types: ['soundToSymbol', 'symbolToWord', 'description'] },
      { id: 'rp-v2', title: 'The vowels · the long five', accent: 'rp', guide: 'RP’s long vowels carry the accent’s shape: /iː/ (fleece), /uː/ (goose), /ɑː/ (palm — and every BATH word), /ɔː/ (thought, north), and /ɜː/ (nurse). Three of them stand where an /r/ used to be, which is why they matter so much in a non-rhotic accent.', phonemes: ['iː', 'uː', 'ɑː', 'ɔː', 'ɜː'], types: ['soundToSymbol', 'symbolToWord', 'minimalPair'] },
      { id: 'rp-v3', title: 'The diphthongs', accent: 'rp', guide: 'Eight glides. The closing ones — /eɪ/ (face), /aɪ/ (price), /ɔɪ/ (choice), /əʊ/ (goat, starting at schwa), /aʊ/ (mouth) — and the centring three that glide toward schwa where an r vanished: /ɪə/ (near), /eə/ (square), /ʊə/ (cure).', phonemes: ['eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɪə', 'eə', 'ʊə'], types: ['soundToSymbol', 'symbolToWord', 'match'] },
      { id: 'rp-c1', title: 'The consonants · stops & nasals', accent: 'rp', guide: 'The plosives /p b t d k g/ and nasals /m n ŋ/. RP aspirates its voiceless plosives crisply at the start of stressed syllables — that clean release is part of the accent’s precision. The diagrams show where each closure is made.', phonemes: ['p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ'], types: ['description', 'soundToSymbol', 'match'] },
      { id: 'rp-c2', title: 'The consonants · fricatives & the rest', accent: 'rp', guide: 'The fricatives /f v θ ð s z ʃ ʒ h/, affricates /tʃ dʒ/, and approximants /l r w j/. The one to watch is /r/: in RP it only survives before a vowel, so “car” has none but “carry” does. /l/ has two faces — clear [l] before vowels (leg, yellow), dark [ɫ] at the ends (feel, little). RP keeps its yods: tune /tjuːn/ and duty /ˈdjuːtɪ/ hold /tj dj/ as two crisp sounds, and the voiceless plosives keep their careful, fully articulated /t/ — no glottal replacement in this target.', phonemes: ['f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h', 'tʃ', 'dʒ', 'l', 'r', 'w', 'j'], types: ['description', 'soundToSymbol', 'match'] },
    ],
  },
  {
    id: 'rp-use',
    title: 'Stage 3 · Putting It to Work',
    color: '#6b7fa3',
    icon: '🎯',
    blurb: 'Transcribe it, arrive at it from American forms, and prove it at speed.',
    lessons: [
      { id: 'rp-3', title: 'Transcribe Traditional RP', accent: 'rp', guide: 'Everything together: transcribe full words the way a Traditional RP speaker says them. Remember — no /r/ unless a vowel follows, BATH words take /ɑː/, happY words end conservative and lax /ɪ/ (happy /ˈhæpɪ/), and unstressed syllables collapse to schwa. In connected speech the function words weaken — “can” /kən/, “of” /əv/ — and the rhythm carries measured, evenly weighted stresses with wide, controlled intonation falls.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɪə', 'eə'], types: ['build', 'accentFact', 'soundToSymbol'] },
      { id: 'rp-s1', title: 'Into RP I', shiftTo: 'rp', guide: 'Given the American form, produce the RP one: delete the r unless a vowel follows and let the vowel lengthen or centre in its place, broaden BATH to /ɑː/, round LOT to /ɒ/. Watch for the trap answers — they’re the American habits you’re leaving behind.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'rp-s2', title: 'Into RP II', shiftTo: 'rp', guide: 'Heavier building work, plus ear checks: hear a word cold and know instantly whether it’s RP. The hooks come off the r-colored vowels — /ɝ/ becomes /ɜː/, /ɚ/ becomes plain schwa.', phonemes: ['ɑː', 'ɜː', 'ə', 'əʊ', 'ɪə'], types: ['shiftBuild', 'shiftChoice', 'accentEar'] },
      { id: 'rp-final', title: 'RP final', accent: 'rp', shiftTo: 'rp', count: 12, guide: 'Twelve questions across every exercise type: silent r’s, broad BATH, rounded LOT, centring diphthongs, full transcriptions, shifts from American forms, and ear checks. Pass it and the course is complete — RP earned, not worn.', phonemes: ['ɑː', 'ɔː', 'ɜː', 'ɒ', 'əʊ', 'ɪə'], types: ['accentFact', 'accentRhythm', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar'] },
    ],
  },

  // ── Contemporary British (SSBE) ─────────────────────────────
  // ── THREE STAGES, NOT FOUR (owner order, 2026-11-06) ──────────
  //
  // Every accent ran Orientation (1 lesson) / The Sounds (9) / Shift Work
  // (2) / Mastery (1). Two of those four held a single lesson, which is
  // not a unit, and the third held most of the course — invisible while
  // the Learn page was one long scroll, and impossible to miss the moment
  // it became a grid of unit cards.
  //
  // THE LESSONS DID NOT MOVE IN ORDER and NOT ONE LESSON ID CHANGED. This
  // is a regrouping: the same lessons, the same sequence, the same lock
  // chain. Ids are storage here and are never renamed.
  //
  // THE GENERATED CHECKPOINT IDS DID CHANGE, because expandUnit keys them
  // to the unit they sit in (`chk-<unit>-<n>`). js/state.js carries a
  // versioned migration that maps the old ones across by position, so no
  // completed checkpoint is lost.
  {
    id: 'ssbe-meet',
    title: 'Stage 1 · Meet the Accent',
    color: '#7d6b9e',
    icon: '📍',
    blurb: 'What Standard British is, and the three features you hear first.',
    lessons: [
      { id: 'ssbe-0', title: 'Hear Standard British', accent: 'ssbe', guide: 'Standard British is a modern pronunciation target for present-day British roles and conversation. Its CORE TARGET keeps the classic skeleton — non-rhotic, broad BATH /ɑː/, rounded LOT /ɒ/. On top of that sit COMMON CONTEMPORARY FEATURES many speakers use — /t/ realized as a glottal stop [ʔ] in relaxed speech, a steady SQUARE vowel /ɛː/, fused yods in tune and duty. Real speakers vary by age, region and setting, so this course labels what is core, what is common, and what is a relaxed-speech option — and trains your ear to hear the difference from Traditional RP.', phonemes: ['ɛː', 'ʔ', 'ɑː', 'ɒ', 'əʊ'], types: ['accentFact', 'accentRhythm', 'soundToSymbol', 'fillBlank'] },
      { id: 'ssbe-1', title: 'The glottal stop', accent: 'ssbe', guide: 'COMMON CONTEMPORARY FEATURE. The glottal stop [ʔ] is not an extra English consonant — it is a way of SAYING the phoneme /t/. The words still have /t/ in them; many speakers realize it as [ʔ] — the vocal folds shut and release — before consonants, at word ends and before unstressed syllables: /ˈbetə/ → [ˈbeʔə], /ˈwɔːtə/ → [ˈwɔːʔə], /gɒt/ → [gɒʔ]. That is why this lesson writes those forms in square brackets: [ ] marks a spoken realization, / / marks the phonemes underneath. Its use varies by speaker, setting, region and position — careful or formal speech often keeps [t] — and word-initial /t/ stays [t]: tea is /tiː/.', phonemes: ['ʔ', 'ə', 'ɒ'], types: ['accentFact', 'soundToSymbol', 'build'] },
      { id: 'ssbe-2', title: 'SQUARE goes steady', accent: 'ssbe', guide: 'CORE TARGET. Where Traditional RP glides /eə/, the modern target holds one long open-mid front vowel: /ɛː/. Square /skwɛː/, fair /fɛː/, there /ðɛː/, care /kɛː/. Hold the position — drifting toward schwa reads as a generation older. NEAR is a VARIABLE FEATURE: some speakers smooth /ɪə/ toward a long /ɪː/, others keep the glide.', phonemes: ['ɛː', 'ɪə'], types: ['accentFact', 'soundToSymbol', 'symbolToWord', 'build'] },
      { id: 'ssbe-3', title: 'Yod coalescence: tune and duty', accent: 'ssbe', guide: 'COMMON CONTEMPORARY FEATURE. /tj/ and /dj/ fuse into /tʃ/ and /dʒ/ for most present-day speakers: tune /tʃuːn/ (a listening cue: “choon”), Tuesday /tʃuːzdeɪ/, duty /dʒuːti/, due /dʒuː/. Traditional RP keeps the sounds separate — /tjuːn/ — which now reads as notably formal. Both are real; this course drills the fused form as its target.', phonemes: ['tʃ', 'dʒ', 'uː'], types: ['accentFact', 'soundToSymbol', 'build', 'fillBlank', 'idiom'] },
    ],
  },
  {
    id: 'ssbe-sounds',
    title: 'Stage 2 · The Sounds',
    color: '#7d6b9e',
    icon: '🇬🇧',
    accent: true,
    blurb: 'The vowels that moved, what stayed classic, and reading the accent.',
    lessons: [
      { id: 'ssbe-4', title: 'The moving vowels', accent: 'ssbe', guide: 'CORE TARGET, all three. GOOSE keeps its broad symbol /uː/, but the modern tongue position sits far forward — closer to [ʉː], lips barely rounded; the symbol names the phoneme, not the exact position. TRAP /æ/ is open and lowered, close to [a]. And the final vowel of happy, city, coffee is the tense happY /i/ — a WEAK vowel of unstressed endings, not an extra full vowel phoneme — where classic RP taught lax /ɪ/. These are the quiet tells that separate a modern speaker from a period one.', phonemes: ['uː', 'æ', 'i', 'ɪ'], types: ['accentFact', 'soundToSymbol', 'symbolToWord', 'minimalPair'] },
      { id: 'ssbe-5', title: 'What stayed classic', accent: 'ssbe', guide: 'CORE TARGET — the stable skeleton. No /r/ unless a vowel follows (car /kɑː/), with linking R before vowels (“far away”) and frequent intrusive R (“law-r-and order”). BATH words broaden to /ɑː/, LOT stays rounded /ɒ/, GOAT starts at schwa /əʊ/ — though before /l/ (goal, gold) both GOAT and GOOSE take on backer, rounder qualities, and dark final /l/ itself may vocalize toward [o] in relaxed speech (“milk” ≈ [mɪok]) — a RELAXED-SPEECH OPTION, not a requirement. If you already carry Traditional RP, keep all of this: Standard British is a set of updates on that base, not a new operating system.', phonemes: ['ɑː', 'ɒ', 'əʊ', 'ɔː'], types: ['accentFact', 'soundToSymbol', 'build', 'fillBlank'] },
      { id: 'ssbe-6', title: 'Reading the accent', accent: 'ssbe', guide: 'Full Standard British transcriptions — glottal stops, steady SQUARE, coalesced yods and all. Read them cold, type the words, transcribe back the other way, and handle the conversational expressions that carry the accent in real speech. This is where it stops being a list of features and becomes a system.', phonemes: ['ʔ', 'ɛː', 'tʃ', 'dʒ', 'ɑː', 'əʊ'], types: ['typeWord', 'symbolToWord', 'gapBuild', 'fillBlank', 'idiomSituation'] },
    ],
  },
  {
    id: 'ssbe-use',
    title: 'Stage 3 · Putting It to Work',
    color: '#7d6b9e',
    icon: '🎯',
    blurb: 'Place the speaker, hear a generation on, and prove it at speed.',
    lessons: [
      { id: 'ssbe-s1', title: 'One generation on', shiftTo: 'ssbe', guide: 'Given the Traditional RP form, produce the Standard British one: realize the non-initial /t/ as [ʔ], flatten SQUARE to /ɛː/, fuse the yods. The traps are RP habits — /betə/, /skweə/ and /tjuːn/ are each one feature outside this course’s contemporary target.', phonemes: ['ʔ', 'ɛː', 'tʃ', 'dʒ'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'ssbe-s2', title: 'Placing the speaker', shiftTo: 'ssbe', guide: 'Ear work: hear a form cold and place it — Traditional RP or Standard British? The tells are small and reliable: one glottal stop, one steady /ɛː/, one fused yod. An actor who hears the difference can dial a character’s age and formality by degrees. A register question rides along — knowing WHEN an expression lands rude matters as much as the vowels.', phonemes: ['ʔ', 'ɛː', 'ɪə', 'uː'], types: ['shiftBuild', 'shiftChoice', 'accentEar', 'idiomRegister'] },
      { id: 'ssbe-final', title: 'Standard British final', accent: 'ssbe', shiftTo: 'ssbe', count: 12, guide: 'Twelve questions across everything: glottal stops, steady SQUARE, coalesced yods, fronted GOOSE, happY tensing, the classic skeleton underneath, shifts from Traditional RP forms, ear checks — and the conversational expressions in short exchanges, because an accent lives in dialogue, not word lists.', phonemes: ['ʔ', 'ɛː', 'tʃ', 'dʒ', 'ɑː', 'ɒ', 'əʊ', 'uː'], types: ['accentFact', 'accentRhythm', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar', 'idiomDialogue', 'idiomLiteral'] },
    ],
  },

  // ── Cockney ─────────────────────────────────────────────────
  // ── THREE STAGES, NOT FOUR (owner order, 2026-11-06) ──────────
  //
  // Every accent ran Orientation (1 lesson) / The Sounds (9) / Shift Work
  // (2) / Mastery (1). Two of those four held a single lesson, which is
  // not a unit, and the third held most of the course — invisible while
  // the Learn page was one long scroll, and impossible to miss the moment
  // it became a grid of unit cards.
  //
  // THE LESSONS DID NOT MOVE IN ORDER and NOT ONE LESSON ID CHANGED. This
  // is a regrouping: the same lessons, the same sequence, the same lock
  // chain. Ids are storage here and are never renamed.
  //
  // THE GENERATED CHECKPOINT IDS DID CHANGE, because expandUnit keys them
  // to the unit they sit in (`chk-<unit>-<n>`). js/state.js carries a
  // versioned migration that maps the old ones across by position, so no
  // completed checkpoint is lost.
  {
    id: 'ck-meet',
    title: 'Stage 1 · Meet the Accent',
    color: '#a8825a',
    icon: '📍',
    blurb: 'What Cockney is, and the three features you hear first.',
    lessons: [
      { id: 'ck-0', title: 'Hear Cockney', accent: 'cockney', guide: 'Cockney is broad working-class London speech: the East End market, the black cab, a century of London stage and screen. It is a rule-governed accent, not careless English, and this course teaches it with the same respect as any other. Its CORE TARGET features are big and hearable: TH-fronting (think spoken [fɪŋk]), the glottal stop as the normal /t/ between vowels and at word ends, h-dropping (house spoken [aʊs]), and a diphthong shift that moves FACE toward [æɪ] and PRICE toward [ɑɪ]. Underneath sits the same London skeleton as Standard British: non-rhotic, broad BATH /ɑː/. The notation contract holds throughout: / / marks the phonemes underneath, [ ] marks how Cockney says them.', phonemes: ['f', 'v', 'ʔ', 'ɑː', 'aʊ'], types: ['accentFact', 'accentRhythm', 'soundToSymbol', 'fillBlank'] },
      { id: 'ck-1', title: 'TH becomes F and V', accent: 'cockney', guide: 'CORE TARGET. Cockney fronts the TH sounds: /θ/ is spoken [f] and non-initial /ð/ is spoken [v]. Think is [fɪŋk], three sounds like free, brother is [ˈbrʌvə], with is [wɪv]. The phonemes underneath do not change, which is why these forms sit in square brackets: think is still /θɪŋk/ under the accent. One boundary matters: word-initial /ð/ in the, this and that usually stays [ð] or becomes [d], not [v]. Fronting everything is the give-away of an actor who learned the rule but not the boundary.', phonemes: ['f', 'v', 'θ', 'ð'], types: ['accentFact', 'soundToSymbol', 'build', 'fillBlank'] },
      { id: 'ck-2', title: 'The glottal stop, everywhere', accent: 'cockney', guide: 'CORE TARGET. Standard British treats the glottal stop as a relaxed-speech option; Cockney treats it as the norm. Between vowels and at word ends, /t/ closes to [ʔ]: butter [ˈbʌʔə], water [ˈwɔːʔə], what [wɒʔ], market [ˈmɑːkɪʔ]. The vocal folds shut and release where the tongue tip would have tapped. Word-initial /t/ stays [t]: tea is still /tiː/. If you already carry the Standard British glottal habit, Cockney simply removes the hesitation: where Standard British might glottal, Cockney does.', phonemes: ['ʔ', 'ə', 'ɒ'], types: ['accentFact', 'soundToSymbol', 'build'] },
      { id: 'ck-3', title: 'Dropping the aitch', accent: 'cockney', guide: 'CORE TARGET. In content words the /h/ goes: house [aʊs], hammer [ˈæmə], horse [ɔːs], hair [ɛː]. The word keeps its /h/ phonemically, and the accent leaves it silent, which is why these forms sit in brackets. Two honest notes. First, h-dropping carries social freight in Britain, and a character who drops aitches is telling the audience something; that is exactly why the feature matters to actors. Second, real Cockney speakers sometimes INSERT an h in careful speech where none belongs, a VARIABLE FEATURE called hypercorrection, and a script may ask you for it.', phonemes: ['h', 'aʊ', 'ɔː', 'ɛː'], types: ['accentFact', 'soundToSymbol', 'symbolToWord', 'fillBlank'] },
    ],
  },
  {
    id: 'ck-sounds',
    title: 'Stage 2 · The Sounds',
    color: '#a8825a',
    icon: '🚕',
    accent: true,
    blurb: 'The vowel shift, the fused yods, and reading the accent.',
    lessons: [
      { id: 'ck-4', title: 'The vowel shift', accent: 'cockney', guide: 'CORE TARGET. The Cockney diphthongs have rotated one position around the mouth. FACE starts open: /eɪ/ is spoken [æɪ], so day leans toward the sound of dye. PRICE starts back: /aɪ/ is spoken [ɑɪ], so price leans toward the sound of poise without reaching it. GOAT starts front: /əʊ/ is spoken [æʊ]. And MOUTH flattens toward a long [æː] in broad speakers: mouth toward [mæːf]. The broad symbols stay put because the phonemes underneath are the same ones; the symbol names the phoneme, not the exact journey. How far the shift travels is a VARIABLE FEATURE: broad older speakers go furthest, young Estuary-leaning speakers less far.', phonemes: ['eɪ', 'aɪ', 'əʊ', 'aʊ'], types: ['accentFact', 'soundToSymbol', 'symbolToWord', 'minimalPair'] },
      { id: 'ck-5', title: 'Chewsday: the fused yods', accent: 'cockney', guide: 'CORE TARGET, shared with Standard British. /tj/ and /dj/ fuse: tune [tʃuːn], Tuesday [ˈtʃuːzdeɪ], duty [ˈdʒuːʔi] with the glottal riding along. A listening cue: Chewsday. Cockney also vocalizes dark /l/: milk toward [mɪok], well toward [weo], little ending in a vowel where the tongue tip never rises. The l-vocalization is taught here by ear and in lesson copy rather than in symbols, because the broad transcription keeps /l/ in place.', phonemes: ['tʃ', 'dʒ', 'uː'], types: ['accentFact', 'soundToSymbol', 'build', 'fillBlank', 'idiom'] },
      { id: 'ck-6', title: 'Reading the accent', accent: 'cockney', guide: 'Full Cockney forms, mixed: fronted TH, glottal stops, dropped aitches, shifted vowels, fused yods. Read them cold, type the words, transcribe back the other way. This is where the features stop being a list and become one voice. Keep the register honest: the same speaker fronts and glottals more at the market than in a job interview, so an actor needs the dial, not just the extreme.', phonemes: ['f', 'v', 'ʔ', 'ɛː', 'ɑː', 'eɪ'], types: ['typeWord', 'symbolToWord', 'gapBuild', 'fillBlank', 'idiomSituation'] },
    ],
  },
  {
    id: 'ck-use',
    title: 'Stage 3 · Putting It to Work',
    color: '#a8825a',
    icon: '🎯',
    blurb: 'Arrive at it, place the speaker, and prove it at speed.',
    lessons: [
      { id: 'ck-s1', title: 'Into Cockney', shiftTo: 'cockney', guide: 'Given the reference form, produce the Cockney one: front the TH, close the /t/ to [ʔ], drop the aitch. The traps are the careful habits: /θɪŋk/, /bʌtə/ and /haʊs/ are each one feature short of the accent. Work feature by feature until the transformation runs whole words at a time.', phonemes: ['f', 'v', 'ʔ', 'ɑː'], types: ['shiftChoice', 'shiftBuild'] },
      { id: 'ck-s2', title: 'Placing the speaker', shiftTo: 'cockney', guide: 'Ear work: hear a form cold and place it. The tells are reliable: one fronted TH, one glottal stop, one dropped aitch, one shifted FACE vowel. An actor who hears the strength of each feature can dial a character from mild Estuary to full broad Cockney by degrees, and hear at once when a fellow performer overshoots.', phonemes: ['ʔ', 'f', 'v', 'eɪ'], types: ['shiftBuild', 'shiftChoice', 'accentEar', 'idiomRegister'] },
      { id: 'ck-final', title: 'Cockney final', accent: 'cockney', shiftTo: 'cockney', count: 12, guide: 'Twelve questions across everything: fronted TH, glottal stops, dropped aitches, the vowel shift, fused yods, the London skeleton underneath, shifts from reference forms and ear checks. An accent lives in whole speech, not word lists, so the mix comes fast and unlabelled, the way a script does.', phonemes: ['f', 'v', 'ʔ', 'ɛː', 'ɑː', 'eɪ', 'aɪ', 'tʃ'], types: ['accentFact', 'accentRhythm', 'build', 'soundToSymbol', 'shiftChoice', 'shiftBuild', 'fillBlank', 'accentEar', 'idiomDialogue', 'idiomLiteral'] },
    ],
  },
];

// Top-level navigation: each track is a self-contained section with its
// own units, lessons, and unlock chain.
export const TRACKS = [
  {
    id: 'core',
    title: 'IPA Foundations',
    icon: 'ʃə',
    color: '#6f8657',
    blurb: 'The alphabet itself — every English sound, then reading and writing it fluently.',
    unitIds: ['instrument', 'vowels-1', 'vowels-2', 'diphthongs', 'consonants-1', 'consonants-2', 'reading'],
  },
  {
    id: 'nam',
    title: 'Neutral American',
    icon: '🇺🇸',
    color: '#b05f4d',
    accent: true,
    blurb: 'A complete course: orientation → the sounds → shift work → mastery final.',
    unitIds: ['nam-meet', 'nam-sounds', 'nam-use'],
  },
  {
    id: 'rp',
    title: 'Traditional RP',
    icon: '🎩',
    color: '#6b7fa3',
    accent: true,
    blurb: 'A complete course: orientation → the sounds → shift work → mastery final.',
    unitIds: ['rp-meet', 'rp-sounds', 'rp-use'],
  },
  {
    id: 'aus',
    title: 'Australian',
    icon: '🇦🇺',
    color: '#5f8a86',
    accent: true,
    blurb: 'A complete course: orientation → the sounds → shift work → mastery final.',
    unitIds: ['aus-meet', 'aus-sounds', 'aus-use'],
  },
  {
    id: 'ssbe',
    title: 'Standard British',
    icon: '🇬🇧',
    color: '#7d6b9e',
    accent: true,
    blurb: 'A modern British target for contemporary characters, conversation, film and TV.',
    unitIds: ['ssbe-meet', 'ssbe-sounds', 'ssbe-use'],
  },
  {
    id: 'cockney',
    title: 'Cockney',
    icon: '🚕',
    color: '#a8825a',
    accent: true,
    blurb: 'Broad working-class London — a first-class audition dialect with its full feature set.',
    unitIds: ['ck-meet', 'ck-sounds', 'ck-use'],
  },
  {
    id: 'shift',
    title: 'Accent Shift Drills',
    icon: '⇄',
    color: '#8a7aad',
    drills: true,
    blurb: 'Transform words between Neutral American and RP on command — both directions, plus ear training.',
    unitIds: ['shift'],
  },
];

export const EXERCISES_PER_LESSON = 8;

// Arcade: every exercise type, playable on its own as an endless game.
// `phonemes` seeds the generators that need a target pool; the broad set
// is the full RP-reference inventory (all have untagged words).
const BROAD = [
  'ɪ', 'e', 'æ', 'ʌ', 'ʊ', 'ɒ', 'ə', 'iː', 'ɑː', 'ɔː', 'uː', 'ɜː',
  'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɪə', 'eə', 'ʊə',
  'p', 'b', 't', 'd', 'k', 'g', 'm', 'n', 'ŋ', 'f', 'v', 'θ', 'ð',
  's', 'z', 'ʃ', 'ʒ', 'h', 'tʃ', 'dʒ', 'l', 'r', 'w', 'j',
];

export const MODES = [
  { id: 'match', title: 'Matching', icon: '🃏', type: 'match', phonemes: BROAD, blurb: 'Match symbols to words.' },
  { id: 'decode', title: 'Decode the Word', icon: '🔡', type: 'typeWord', blurb: 'Read IPA, type the word.' },
  { id: 'spell', title: 'Spell It', icon: '✏️', type: 'spellBlank', blurb: 'Fill the missing letters.' },
  { id: 'gaps', title: 'Fill the Gaps', icon: '🧩', type: 'gapBuild', phonemes: BROAD, blurb: 'Complete the transcription.' },
  { id: 'build', title: 'Build a Word', icon: '🔨', type: 'build', phonemes: BROAD, blurb: 'Assemble it from tiles.' },
  { id: 'listen', title: 'Listen & Choose', icon: '🎧', type: 'soundToSymbol', phonemes: BROAD, blurb: 'Hear it, pick the symbol.' },
  { id: 'find', title: 'Find the Word', icon: '🔍', type: 'symbolToWord', phonemes: BROAD, blurb: 'Which word has this sound?' },
  { id: 'name', title: 'Name That Sound', icon: '💬', type: 'description', phonemes: BROAD, blurb: 'Match the description.' },
  { id: 'missing', title: 'Missing Symbol', icon: '⬜', type: 'fillBlank', phonemes: BROAD, blurb: 'One symbol is missing.' },
  { id: 'pairs', title: 'Minimal Pairs', icon: '👂', type: 'minimalPair', blurb: 'Which word did you hear?' },
  { id: 'readsent', title: 'Read a Sentence', icon: '📖', type: 'sentenceToEnglish', blurb: 'Decode a full IPA line.' },
  { id: 'writesent', title: 'Transcribe a Sentence', icon: '📝', type: 'englishToIpa', blurb: 'Pick the right transcription.' },
  { id: 'shift', title: 'Accent Shift', icon: '⇄', type: 'shiftChoice', blurb: 'Transform between accents.' },
  { id: 'earacc', title: 'Name the Accent', icon: '🌍', type: 'accentEar', blurb: 'RP or American?' },
];
