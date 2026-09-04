// Voice-science figures — owner-supplied anatomy illustrations
// (2026-09-04 intake from the voice-tension research project; source
// PNGs in the owner's files, shipped as baseline JPEG q90 like the
// articulation artwork). Referenced from chapter bodies via
// { fig: '<key>' } blocks. Like every drawing in the app these are
// teaching figures, not medical diagrams, and they sit under the same
// awaiting-specialist review status as the chapters that carry them.
//
// Label-checked at full resolution before install (AI-generated art:
// every label read and verified against the chapter copy).

const DIR = 'img/voice-science/';

export const VOICE_FIGURES = {
  'body-as-instrument': {
    title: 'The Body as an Instrument',
    file: 'body-as-instrument.jpg',
    alt: 'Cutaway figure showing the brain, vocal tract, vocal folds, lungs, rib cage, diaphragm and abdominal wall, beside the six-step chain from intention to articulation.',
  },
  'diaphragm-and-breath': {
    title: 'The Diaphragm and Breath',
    file: 'diaphragm-and-breath.jpg',
    alt: 'Three cutaway figures: inhalation with the diaphragm descending and the abdominal wall yielding; controlled exhalation with the diaphragm rising gradually; and excess tension with neck compensation, raised shoulders, locked ribs and a rigid abdomen.',
  },
  'vocal-folds': {
    title: 'Vocal Folds: Airflow and Closure',
    file: 'vocal-folds.jpg',
    alt: 'Four views of the vocal folds from above: open for breathing, nearly closed in balanced phonation, squeezed in pressed phonation with excess resistance, and gapped in breathy phonation with air leakage, each with an airflow gauge.',
  },
  'resonance-sensation': {
    title: 'Resonance: Sound and Sensation',
    file: 'resonance-sensation.jpg',
    alt: 'Cutaway head and chest showing sound radiating from the mouth, the vocal folds as the source and the air in the vocal tract as the filter, with bone-conduction paths and vibration sensations marked as feedback, not a destination.',
  },
  'tension-costs': {
    title: 'How Tension Changes the Voice',
    file: 'tension-costs.jpg',
    alt: 'Two figures side by side: dynamic balance with free breath movement, and unintentional bracing highlighting the jaw, neck, shoulders, rib cage, abdominal wall and pelvis, beside the qualities tension affects: airflow, timbre, range, agility, dynamics and endurance.',
  },
  'mouth-articulators': {
    title: 'The Mouth and Tongue Articulators',
    file: 'mouth-articulators.jpg',
    alt: 'Cross-section of the mouth naming the lips, teeth, alveolar ridge, hard palate, soft palate, uvula and jaw, with the tongue divided into tip, blade, front, back and root, plus the upper dental arch and palate.',
  },
  'onset-release': {
    title: 'Voice Onset and Release',
    file: 'onset-release.jpg',
    alt: 'Four figures comparing hard onset with the folds closing first, balanced onset with air and folds together, breathy onset with air first, and a coordinated release, each with airflow and vocal-fold contact timing curves.',
  },
  'brain-controls': {
    title: 'How the Brain Controls the Voice',
    file: 'brain-controls.jpg',
    alt: 'Diagram of the voice control loop from intention through movement to voice, returning as auditory and somatosensory feedback, beside the threat, bracing, less reliable sound and monitoring cycle.',
  },
  'environment-recovery': {
    title: 'Voice Use, Environment, and Recovery',
    file: 'environment-recovery.jpg',
    alt: 'Panels on background noise and the Lombard effect, microphone monitoring, a scale balancing vocal load against recovery, and early warning signs including range loss, hoarseness, rising effort and slow recovery.',
  },
};

export const voiceFigure = key =>
  (VOICE_FIGURES[key] ? { ...VOICE_FIGURES[key], src: DIR + VOICE_FIGURES[key].file } : null);

// The Your Instrument atlas order — every figure, teaching order.
export const VOICE_ATLAS = [
  'body-as-instrument', 'mouth-articulators', 'diaphragm-and-breath',
  'vocal-folds', 'resonance-sensation', 'tension-costs',
  'onset-release', 'brain-controls', 'environment-recovery',
];
