// Approaches to Acting — four introductory written sections.
//
// ALL FOUR ARE DRAFTS requiring review by a qualified acting teacher
// or coach (reviews.js) before any learner sees the bodies. The
// learner-facing shelf shows an honest awaiting-review state until
// then; full drafts are inspectable in the protected #review area.
//
// BINDING RULES: introductions only — no official training,
// certification or affiliation claimed; no protected passages, branded
// exercises or proprietary lesson sequences reproduced; no approach
// flattened into a slogan; Stanislavski's evolution acknowledged; no
// single "authorized interpretation" implied across teachers and
// lineages.

export const ACTING_APPROACHES = [
  {
    id: 'stanislavski',
    name: 'Konstantin Stanislavski',
    era: '1863–1938 · Moscow Art Theatre',
    requiredReviewer: 'acting-professional',
    sections: {
      background: 'Konstantin Stanislavski was a Russian actor, director and co-founder of the Moscow Art Theatre (1898). Dissatisfied with the declamatory acting of his era, he spent his working life developing a systematic approach to truthful performance — usually called the “system.” His books published in English as An Actor Prepares, Building a Character and Creating a Role (translated by Elizabeth Reynolds Hapgood) shaped virtually every major Western acting approach that followed.',
      principles: 'The actor pursues truthful, purposeful behavior under imaginary circumstances. Performances are built from what the character wants (objectives), what stands in the way, and what the character does to get it — organized into playable units. Early in his career Stanislavski explored “affective memory” (drawing on the actor’s remembered emotion); his later work shifted decisively toward the Method of Physical Actions, approaching emotional truth through concrete physical doing rather than through direct emotional recall. Any honest account of Stanislavski has to hold both phases: his work evolved throughout his life, and he kept revising his own conclusions.',
      terminology: 'Given circumstances · the magic if (“what would I do if…”) · objective · super-objective · through-line of action · units/beats · adaptation · communion (genuine connection with the partner) · tempo-rhythm · Method of Physical Actions.',
      considers: 'Circumstances are the soil of every choice: the actor studies the play’s facts before inventing anything. Objectives organize attention and behavior. Imagination (the “magic if”) bridges the actor’s reality and the character’s. Listening and communion with the partner are treated as the living center of a scene. Emotional life is invited through action and circumstance rather than commanded. Voice, body and movement receive deliberate technical training — Stanislavski regarded expressive physical and vocal technique as inseparable from inner work.',
      questions: [
        'What do I want — in this scene, and across the whole play?',
        'What would I do if these circumstances were mine?',
        'What is in my way, and what am I doing, physically and concretely, to overcome it?',
        'What just changed because of what my partner did?',
      ],
      misunderstandings: 'The “system” is often equated with emotional self-exposure or with 1950s American “Method” acting; both are later developments with their own emphases. Stanislavski is also sometimes reduced to his early affective-memory experiments, ignoring his later physical-action work — the opposite of how he left the system. Different students and lineages (Adler, Meisner, Strasberg, Chekhov among them) drew different, sometimes conflicting conclusions from him; no single lineage owns the authorized interpretation.',
      sources: 'Stanislavski, An Actor Prepares / Building a Character / Creating a Role (Hapgood translations, Routledge); Benedetti, Stanislavski: An Introduction and Stanislavski and the Actor (Routledge); Carnicke, Stanislavsky in Focus (Routledge).',
    },
  },
  {
    id: 'adler',
    name: 'Stella Adler',
    era: '1901–1992 · New York · Stella Adler Studio',
    requiredReviewer: 'acting-professional',
    sections: {
      background: 'Stella Adler grew up in the Yiddish theatre, acted with the Group Theatre in the 1930s, and studied briefly with Stanislavski himself in Paris in 1934 — an encounter that changed American acting. She returned convinced that his mature emphasis lay on imagination and given circumstances rather than on the actor’s private emotional memory, split with Lee Strasberg over exactly this, and founded her own conservatory in New York in 1949, teaching generations of actors.',
      principles: 'The actor’s growth depends on the growth of the imagination: rather than mining personal history for feeling, the actor builds the character’s world — its time, place, class, ideas and stakes — so richly that truthful behavior arises from imagined circumstances. The text is studied seriously (script analysis was central to her teaching), the actor’s job is understood partly as a social and cultural one, and size matters: she pushed actors toward largeness of spirit and theme, against small, private naturalism.',
      terminology: 'Imagination · given circumstances · justification (finding the reason that makes every line and action necessary) · actions (doable, specific) · script analysis · size.',
      considers: 'Circumstances are to be imagined in specific, researched detail — the actor is responsible for knowing the world of the play. Objectives and actions stay concrete and doable. Emotional life is trusted to follow imaginative commitment rather than self-excavation. The body and voice are trained to meet the size of great texts; watching, listening and responding within the imagined world are treated as the actor’s daily discipline.',
      questions: [
        'What is the world of this play — its period, class, ideas, manners — and how does my character live inside it?',
        'What justifies this line: why must I say exactly this, now?',
        'What am I doing — and is it specific and doable?',
        'Is my choice big enough for the theme of the play?',
      ],
      misunderstandings: 'Adler is sometimes summarized as merely “anti-emotional-memory,” which flattens a rich, text-centered pedagogy into one dispute. Her demand for imagination is not a license for vagueness — she required rigorous, researched specificity. And although her name is often set against Strasberg’s, both drew from Stanislavski; theirs was a disagreement about emphasis within a shared inheritance.',
      sources: 'Adler, The Technique of Acting (Bantam); Adler, The Art of Acting (ed. Kissel, Applause); Stella Adler Studio of Acting public materials; Carnicke, Stanislavsky in Focus (on the 1934 Paris meeting).',
    },
  },
  {
    id: 'meisner',
    name: 'Sanford Meisner',
    era: '1905–1997 · New York · Neighborhood Playhouse',
    requiredReviewer: 'acting-professional',
    sections: {
      background: 'Sanford Meisner was a founding member of the Group Theatre who went on to lead the acting program at New York’s Neighborhood Playhouse for nearly fifty years. Seeking a training that would take the actor’s attention off themselves, he built a step-by-step progression of partner exercises designed to make truthful response — rather than self-monitoring — the actor’s habit.',
      principles: 'His most quoted definition: acting is living truthfully under imaginary circumstances. The reality of doing — actually listening, actually watching, actually affecting the partner — replaces indicated or planned emotion. Training begins with simple observation-and-response exercises between partners and adds imaginary circumstances gradually, so that by the time text arrives, responsive behavior is second nature. Preparation gives the actor a justified inner starting point for a scene, and the pinch-and-ouch principle keeps every reaction proportional to a real stimulus.',
      terminology: 'The reality of doing · repetition (the foundational partner exercise, in outline: attention on the partner, response before planning) · preparation · pinch and ouch · living truthfully under imaginary circumstances · working off the partner.',
      considers: 'The partner is the center: listening in Meisner training is not a virtue but the engine. Circumstances and objectives are added to responsive behavior rather than substituted for it. Emotional life is treated as a byproduct of real contact and imaginative preparation, never as a task to perform. The approach trusts that behavior born of genuine response reads truthfully in the body and voice without cosmetic management.',
      questions: [
        'What is my partner actually doing to me right now — and did I really let it land?',
        'What does this moment make me do back?',
        'What imaginary circumstance would make this fully matter to me?',
        'Am I performing a feeling, or responding to something real in the room?',
      ],
      misunderstandings: 'Repetition is often mistaken for the whole technique or practiced as mechanical parroting; in trained hands it is a progression with a purpose — retraining attention outward. “Truthful” is likewise misread as “small and mumbled”; Meisner-trained actors work in every size. Descriptions here are of the approach’s public outline; the exercise sequences themselves belong to the studios that teach them.',
      sources: 'Meisner & Longwell, Sanford Meisner on Acting (Vintage); Neighborhood Playhouse public materials; Gray, “The Reality of Doing” (TDR interviews with Meisner).',
    },
  },
  {
    id: 'chekhov',
    name: 'Michael Chekhov',
    era: '1891–1955 · Moscow → Europe → Hollywood',
    requiredReviewer: 'acting-professional',
    sections: {
      background: 'Michael Chekhov — nephew of the playwright Anton Chekhov — was a celebrated actor of the Moscow Art Theatre and a student of Stanislavski, who called him one of his most brilliant pupils. He left Russia in 1928, taught across Europe (notably at Dartington Hall in England), and settled in Hollywood, where he acted in films and taught. His book To the Actor (1953) condenses a psychophysical technique in which imagination and the body lead.',
      principles: 'Where analysis can trap an actor in the head, Chekhov begins from image and movement: the actor receives and develops vivid images, then lets the body answer them. The best-known tool, the psychological gesture, condenses a character’s essential desire into one full-body archetypal movement, practiced physically and then carried inwardly as a spring for the performance. Qualities of movement, atmosphere (the felt mood of a place or scene treated as a creative partner), radiating and receiving energy, and a feeling of ease characterize the work.',
      terminology: 'Psychological gesture · atmosphere · imaginary body · centers · radiating and receiving · qualities of movement · feeling of ease, form, beauty and the whole.',
      considers: 'Circumstances are approached through atmosphere and image as much as through analysis. Objectives take physical form in the psychological gesture rather than remaining verbal statements. Imagination is treated as the actor’s primary organ — trained daily, trusted to transform the actor toward the character (the imaginary body) instead of the character shrinking toward the actor. Emotional life is invited indirectly through movement, image and atmosphere; voice and body work are inseparable from inner technique.',
      questions: [
        'What single full-body gesture would condense what this character most wants?',
        'What is the atmosphere of this place and scene, and what does it do to me?',
        'What imaginary body does this character move in, and how does it change my own?',
        'Can I do all of this with a feeling of ease — even the heavy scenes?',
      ],
      misunderstandings: 'Chekhov’s technique is sometimes dismissed as mystical because its vocabulary is imagistic; in practice it is rigorously physical and repeatable. The psychological gesture is frequently reduced to “make a big shape” — detached from its function as a condensed objective. And although the technique diverges from Stanislavski’s later realism, it grew from the same root and shares its goal: truthful, purposeful behavior.',
      sources: 'Chekhov, To the Actor (Routledge); Chekhov, On the Technique of Acting (Harper); Michael Chekhov Association (MICHA) public materials; Petit, The Michael Chekhov Handbook (Routledge).',
    },
  },
];

// Rendered beneath every approach, verbatim — the non-affiliation
// statement required by the build order.
export const APPROACH_DISCLAIMER =
  'This is a written introduction for orientation only — not official training or certification in this approach, and Speechcraft is not affiliated with the teachers, studios or estates named. Each approach lives in decades of studio practice, books and living teachers; serious study means training with qualified people in its lineage.';
