// Built-in Speech practice texts — ORIGINAL Speechcraft writing.
//
// PROVENANCE: every text in this file was written for Speechcraft
// (2026-08) as original work-for-the-app; no copied or adapted
// copyrighted dialogue. Each record carries draft/review metadata —
// editorial review pending in js/data/speech/reviews.js; Claude never
// approves its own writing.
//
// Design constraints (owner order): short enough to memorize quickly;
// flexible enough to support several objectives, actions and
// circumstances; no prescribed emotion anywhere.

export const SPEECH_TEXTS = [

  // ── Neutral one-line statements ───────────────────────────────
  { id: 'st-line-1', kind: 'line', title: 'The keys',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'The keys are on the table by the door.' },
  { id: 'st-line-2', kind: 'line', title: 'Tomorrow',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'We can talk about this tomorrow if you want.' },
  { id: 'st-line-3', kind: 'line', title: 'The window',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I never said she took it.' },
  { id: 'st-line-4', kind: 'line', title: 'Almost',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'That is almost exactly what happened.' },

  // ── Short two-person exchanges ────────────────────────────────
  { id: 'st-scene-1', kind: 'scene', title: 'The late train',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    characters: ['A', 'B'],
    lines: [
      { who: 'A', text: 'You waited.' },
      { who: 'B', text: 'The train was late. Everyone waited.' },
      { who: 'A', text: 'Everyone went home at midnight. I checked.' },
      { who: 'B', text: 'Then I suppose I’m not everyone.' },
      { who: 'A', text: 'No. You’re not.' },
    ] },
  { id: 'st-scene-2', kind: 'scene', title: 'The envelope',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    characters: ['A', 'B'],
    lines: [
      { who: 'A', text: 'You haven’t opened it.' },
      { who: 'B', text: 'I know what it says.' },
      { who: 'A', text: 'Then opening it costs you nothing.' },
      { who: 'B', text: 'If I’m right, it costs me the last hour of not being sure.' },
      { who: 'A', text: 'And if you’re wrong?' },
      { who: 'B', text: 'Give it to me.' },
    ] },

  // ── Requests ──────────────────────────────────────────────────
  { id: 'st-request-1', kind: 'request', title: 'One more week',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I need one more week. Not because the work is behind — because it’s better than we planned, and a week is what it costs to prove that.' },
  { id: 'st-request-2', kind: 'request', title: 'Come with me',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'Come with me on Saturday. You don’t have to say anything, you don’t have to stay long. Just stand next to me while I do this.' },

  // ── Apologies ─────────────────────────────────────────────────
  { id: 'st-apology-1', kind: 'apology', title: 'The meeting',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I spoke over you in that meeting, and it wasn’t the first time. You had the better read of the situation, and the room never got to hear it. I’m sorry — and I’d like to fix the part that can still be fixed.' },
  { id: 'st-apology-2', kind: 'apology', title: 'Too late',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'You needed me to say something that night, and I said nothing. I’ve had a hundred versions of this apology and none of them change that. But you should know it wasn’t indifference. It was fear, and I’m done letting it write my lines.' },

  // ── Boundaries ────────────────────────────────────────────────
  { id: 'st-boundary-1', kind: 'boundary', title: 'Not this weekend',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I can’t take this on this weekend. I know the timing is hard, and my answer is still no. Ask me again for next month and it’s a real conversation.' },
  { id: 'st-boundary-2', kind: 'boundary', title: 'My decision',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I’ve heard everyone’s opinion, and I’m grateful for most of them. But this decision is mine to make, and I’ve made it.' },

  // ── Announcements ─────────────────────────────────────────────
  { id: 'st-announce-1', kind: 'announcement', title: 'The move',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'Before the rumors get there first: yes, we’re moving. In March, to the coast, for Sam’s work and for a hundred smaller reasons that all point the same direction. We wanted you to hear it from us.' },
  { id: 'st-announce-2', kind: 'announcement', title: 'The change of plan',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'The launch is moving to the ninth. That’s a week later than promised, and it’s the right call: what we ship on the ninth will be what we actually promised you.' },

  // ── Toasts ────────────────────────────────────────────────────
  { id: 'st-toast-1', kind: 'toast', title: 'To the builders',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'Everyone in this room said yes to something that didn’t exist yet. That’s the whole trick, it turns out — enough people saying yes before there’s proof. To the builders: may the proof keep arriving.' },
  { id: 'st-toast-2', kind: 'toast', title: 'Forty years',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'Forty years ago these two stood up in front of everyone they knew and made a promise with no evidence at all. Tonight the evidence is sitting at every table in this room. To the promise — and to everyone it built.' },

  // ── Persuasive passages ───────────────────────────────────────
  { id: 'st-persuade-1', kind: 'persuasion', title: 'The small library',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'You could close the branch and save the money — the spreadsheet says so. But the spreadsheet has never met the kid who does his homework there because home has no quiet in it. Count what the building actually does before you count what it costs.' },
  { id: 'st-persuade-2', kind: 'persuasion', title: 'Ask the second question',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'The first answer is almost never the real one. Not because people lie — because the first answer is the rehearsed one. Ask the second question. Wait through the pause. The pause is where the truth gets its coat on.' },

  // ── Short monologues ──────────────────────────────────────────
  { id: 'st-mono-1', kind: 'monologue', title: 'The list',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'I found the list you made when we first moved in. Things to fix. The gate, the porch light, the noise the stairs make. Twelve years, and the stairs still announce everybody who comes up them. And I stood in the hallway with your list in my hand, and I thought: we fixed different things instead. The ones that weren’t on any list. I’m keeping the noisy stair. It tells me when you’re home.' },
  { id: 'st-mono-2', kind: 'monologue', title: 'Second chair',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'Nobody claps for the second chair. You tune to the first, you turn the pages, you come in exactly where you’re needed and you leave no fingerprints. I used to think that was hiding. It took me twenty years to hear it right: the whole section holds because somebody chooses to be exactly where they’re needed. That’s not hiding. That’s the job.' },

  // ── Presentation openings ─────────────────────────────────────
  { id: 'st-present-1', kind: 'presentation', title: 'The number',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'There’s one number in this deck that matters, and it isn’t on the first slide. I’m going to earn it. By the time we get there, you’ll know exactly why it changes what we do next quarter.' },
  { id: 'st-present-2', kind: 'presentation', title: 'Three doors',
    provenance: 'Original Speechcraft writing, 2026-08', requiredReviewer: 'editorial',
    text: 'We have three options, and I’ll be honest with you: I came in convinced of the first one. The data talked me out of it. In the next ten minutes I’ll show you what changed my mind — and where I still might be wrong.' },
];

export const speechTextById = id => SPEECH_TEXTS.find(t => t.id === id) ?? null;

export const speechTextsByKind = kind => SPEECH_TEXTS.filter(t => t.kind === kind);

// Plain string body for any text (scene lines joined for non-scene use).
export const speechTextBody = t =>
  t.kind === 'scene' ? t.lines.map(l => `${l.who}: ${l.text}`).join('\n') : t.text;
