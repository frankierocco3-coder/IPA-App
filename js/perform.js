// Microphone capture for Perform mode.
//
// Deliberately small: get permission only when the user presses Record,
// hold exactly one recording at a time, always release the microphone when
// we stop, and hand back a Blob the caller can store or play.
//
// Format differs by browser — Chrome/Firefox give webm/opus, Safari and iOS
// give mp4/aac — so we ask MediaRecorder what it supports rather than
// hardcoding, and store the mime type alongside the blob.

export const MAX_RECORDING_MS = 120_000;   // 2 minutes; surfaced in the UI

const CANDIDATE_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/ogg;codecs=opus',
  '',                                       // let the browser decide
];

export function recordingSupported() {
  return typeof navigator !== 'undefined'
    && !!navigator.mediaDevices?.getUserMedia
    && typeof MediaRecorder !== 'undefined';
}

function pickMimeType() {
  if (typeof MediaRecorder === 'undefined') return '';
  for (const t of CANDIDATE_TYPES) {
    if (!t) return '';
    try { if (MediaRecorder.isTypeSupported(t)) return t; } catch { /* keep looking */ }
  }
  return '';
}

/** Human-readable reason a recording could not start. */
export function micErrorMessage(err) {
  const name = err?.name || '';
  if (name === 'NotAllowedError' || name === 'SecurityError')
    return 'Microphone access was blocked. Allow it in your browser’s site settings, then try again.';
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError')
    return 'No microphone was found on this device.';
  if (name === 'NotReadableError' || name === 'TrackStartError')
    return 'Your microphone is in use by another app.';
  if (!window.isSecureContext)
    return 'Recording needs a secure (https) connection.';
  return 'Recording is not available in this browser.';
}

let active = null;   // { recorder, stream, chunks, startedAt, timer, stopping }

export const isRecording = () => !!active;

/**
 * Begin recording. Resolves once capture has actually started.
 * `onTick(ms)` fires about every 200ms with elapsed time.
 * `onAutoStop()` fires if the duration cap is reached.
 */
export async function startRecording({ onTick, onAutoStop } = {}) {
  if (active) throw new Error('Already recording');
  if (!recordingSupported()) throw Object.assign(new Error('unsupported'), { name: 'NotSupportedError' });

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mimeType = pickMimeType();
  let recorder;
  try {
    recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
  } catch {
    recorder = new MediaRecorder(stream);           // fall back to defaults
  }

  const chunks = [];
  recorder.addEventListener('dataavailable', e => { if (e.data?.size) chunks.push(e.data); });

  const state = { recorder, stream, chunks, startedAt: Date.now(), timer: null, stopping: false };
  active = state;

  state.timer = setInterval(() => {
    const ms = Date.now() - state.startedAt;
    onTick?.(ms);
    if (ms >= MAX_RECORDING_MS && !state.stopping) {
      state.stopping = true;
      onAutoStop?.();
    }
  }, 200);

  recorder.start();
  return { mimeType: recorder.mimeType || mimeType || 'audio/webm' };
}

/** Stop and resolve with { blob, mimeType, durationMs }. Always frees the mic. */
export function stopRecording() {
  const state = active;
  if (!state) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const finish = () => {
      clearInterval(state.timer);
      state.stream.getTracks().forEach(t => t.stop());   // release the mic
      active = null;
    };
    state.recorder.addEventListener('stop', () => {
      try {
        const mimeType = state.recorder.mimeType || 'audio/webm';
        const blob = new Blob(state.chunks, { type: mimeType });
        const durationMs = Date.now() - state.startedAt;
        finish();
        resolve({ blob, mimeType, durationMs });
      } catch (err) { finish(); reject(err); }
    }, { once: true });
    try {
      if (state.recorder.state !== 'inactive') state.recorder.stop();
      else { finish(); resolve(null); }
    } catch (err) { finish(); reject(err); }
  });
}

/** Abandon the current recording without producing a blob. */
export function cancelRecording() {
  const state = active;
  if (!state) return;
  clearInterval(state.timer);
  try { if (state.recorder.state !== 'inactive') state.recorder.stop(); } catch { /* ignore */ }
  state.stream.getTracks().forEach(t => t.stop());
  active = null;
}

export function formatMs(ms) {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
