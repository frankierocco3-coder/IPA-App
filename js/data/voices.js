// Named speakers for courses that pin a voice instead of alternating.
// Browser-safe metadata ONLY — provider voice IDs live in the gitignored
// generation config (tools/voices.json) and never ship to the client.
// reviewStatus flips to 'approved' only after the owner has listened to
// the voice's review batch in #audit.

export const VOICES = [
  {
    id: 'alyx',
    displayName: 'Alyx',
    courseId: 'ssbe',
    dialect: 'Contemporary British',
    accentCode: 'ssbe',
    presentation: 'male',
    provider: 'elevenlabs',
    reviewStatus: 'pending-human-review',
  },
  {
    id: 'peach',
    displayName: 'Peach',
    courseId: 'ssbe',
    dialect: 'Contemporary British',
    accentCode: 'ssbe',
    presentation: 'female',
    provider: 'elevenlabs',
    reviewStatus: 'pending-human-review',
  },
];

export const voicesForCourse = courseId => VOICES.filter(v => v.courseId === courseId);
