# Phoneme recording plan

**STATUS 2026-08-11 — DEFERRED, NOT A BLOCKER.** The text-first scope
decision defers all new audio work, isolated-phoneme recordings
included. Nothing in the active builds waits on these recordings, and
they must not appear on any active-blocker list. The pipeline below
stays ready for whenever audio work resumes.

STATUS 2026-08-05: production target is ONE consistent human reference
voice per dialect, under the neutral voice key `reference` (isolated
phonemes are NOT tied to the word-audio f/m/alyx/peach identifiers —
the playback gate reads the voice key from the approved id itself).
The withdrawn TTS candidates stay withdrawn.

**Start here: the Neutral American pilot** — 16 recordings listed with
per-sound guidance in `tools/phoneme_manifest_nam.json` (13 isolated +
3 syllable demos).

## Adding your own recordings
1. Record per the manifest/table guidance (quiet room, consistent level,
   trim silence). Name each file `<slug>.mp3` in one folder.
2. Import safely — validates slugs, rejects junk, never overwrites,
   rebuilds the candidate index:
   `python3 tools/import_phonemes.py <folder> --dialect nam --voice reference --dry-run`
   then again without `--dry-run`.
3. Listen at #audit (kind=phoneme), mark Good, export, commit the flags.
   Approved sounds flip the sound-page hero to "Hear the sound"
   automatically. Approval is exact to dialect/voice/slug; importing
   alone never makes anything learner-facing.

Every isolated-phoneme asset still missing (none exist yet). Slug =
lowercased display name, underscores. Path:
`audio/phonemes/<dialect>/<voice>/<slug>.mp3`; syllable demos add
`_syllable`. Clips reach learners only after the owner approves them
in `#audit` (APPROVED_PHONEMES). Glottal stop: record an isolated
attempt AND an /əʔə/ SYLLABLE demonstration — the app labels the
syllable version as a syllable demo, never as a pure isolated sound.

| Slug | Symbol | Class | Guidance | Dialects (voices) |
| --- | --- | --- | --- | --- |
| kit_vowel | /ɪ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| dress_vowel | /e/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| trap_vowel | /æ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| strut_vowel | /ʌ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| foot_vowel | /ʊ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| lot_vowel | /ɒ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| schwa | /ə/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| fleece_vowel | /iː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| palm_bath_vowel | /ɑː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| thought_vowel | /ɔː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| goose_vowel | /uː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| nurse_vowel | /ɜː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| face_diphthong | /eɪ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| price_diphthong | /aɪ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| choice_diphthong | /ɔɪ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| goat_diphthong | /əʊ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| mouth_diphthong | /aʊ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| near_diphthong | /ɪə/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| square_diphthong | /eə/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| contemporary_square | /ɛː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| happy_vowel | /i/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| glottal_stop | /ʔ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa + /əʔə/ syllable demo | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| cure_diphthong | /ʊə/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| american_lot_palm | /ɑ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| american_goat | /oʊ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| american_nurse | /ɝ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| american_letter | /ɚ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_strut | /ɐ/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_palm_bath | /ɐː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_mouth | /æɔ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_face | /æɪ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_price | /ɑɪ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_goat | /əʉ/ | diphthong | the complete glide, first target moving to the second | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| australian_goose | /ʉː/ | vowel | steady 0.7-1.0 s production, natural onset, no consonant colouring | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| p | /p/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| b | /b/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| t | /t/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| d | /d/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| k | /k/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| g | /g/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| m | /m/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| n | /n/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| eng | /ŋ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| f | /f/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| v | /v/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| theta | /θ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| eth | /ð/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| s | /s/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| z | /z/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| esh | /ʃ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| ezh | /ʒ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| h | /h/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| ch | /tʃ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| j | /dʒ/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| l | /l/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| r | /r/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| w | /w/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
| yod | /j/ | consonant | fricatives/nasals/approximants: brief controlled sustain; stops/affricates: short clean closure and release, no added schwa | nam (f/m), rp (f/m), aus (f/m), ssbe (alyx/peach) |
