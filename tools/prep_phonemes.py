#!/usr/bin/env python3
"""Prepare owner phoneme recordings for import: trim, level, convert to MP3.

Takes whatever came out of the recorder (m4a, wav, aiff, mp3) and produces
the exact thing tools/import_phonemes.py wants: one folder of `<slug>.mp3`,
mono 44.1 kHz, silence trimmed, levels matched across the batch, with short
fades so nothing clicks.

NEVER deployed (tools/ is excluded from the artifact) and never writes into
audio/ — that is import_phonemes.py's job, behind its own validation.

Two modes:

  FILES    one recording per sound, already named by slug
             python3 tools/prep_phonemes.py takes/ --out prepped/

  ONE-TAKE a single recording of every sound in manifest order, with a
           pause between each. Split on the silences, then CHECK THE
           REPORT before importing — a missed pause shifts every name.
             python3 tools/prep_phonemes.py take.m4a --split \\
                 --manifest tools/phoneme_manifest_nam.json --out prepped/

Always run --dry-run first: it reports what it found and changes nothing.
"""

import argparse
import array
import json
import math
import pathlib
import re
import shutil
import tempfile
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

TARGET_RMS_DB = -20.0     # matched loudness across the batch
PEAK_CEIL_DB = -1.5       # never closer to full scale than this
TRIM_DB = -45             # quieter than this counts as silence
PAD_MS = 40               # silence kept either side of a sound
FADE_MS = 12
MIN_LEN_S = 0.25          # a real held sound is never shorter
MAX_LEN_S = 4.0
AUDIO_EXT = {'.m4a', '.mp3', '.wav', '.aiff', '.aif', '.caf', '.flac', '.mov', '.m4v'}


def ffmpeg_exe():
    """The ffmpeg binary: PATH first, then the pip-installed one."""
    found = shutil.which('ffmpeg')
    if found:
        return found
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit('No ffmpeg found. Install it, or: python3 -m pip install --user imageio-ffmpeg')


FF = None


def run(args):
    return subprocess.run([FF, '-hide_banner', '-nostdin', *args],
                          capture_output=True, text=True)


def measure(path, extra=()):
    """(mean_dB, max_dB, duration_s) via volumedetect."""
    r = run(['-i', str(path), *extra, '-af', 'volumedetect', '-f', 'null', '-'])
    txt = r.stderr
    mean = re.search(r'mean_volume:\s*(-?\d+(?:\.\d+)?) dB', txt)
    peak = re.search(r'max_volume:\s*(-?\d+(?:\.\d+)?) dB', txt)
    seconds = 0.0
    m = re.findall(r'time=(\d+):(\d+):(\d+\.\d+)', txt)
    if m:
        h, mi, s = m[-1]
        seconds = int(h) * 3600 + int(mi) * 60 + float(s)
    if not mean or not peak:
        return None
    return float(mean.group(1)), float(peak.group(1)), seconds


def silences(path):
    """[(start, end)] of silent stretches, for --split."""
    r = run(['-i', str(path), '-af',
             f'silencedetect=noise={TRIM_DB}dB:d=0.35', '-f', 'null', '-'])
    starts = [float(x) for x in re.findall(r'silence_start:\s*(-?\d+\.?\d*)', r.stderr)]
    ends = [float(x) for x in re.findall(r'silence_end:\s*(\d+\.?\d*)', r.stderr)]
    return list(zip(starts, ends + [None] * (len(starts) - len(ends))))


ENV_SR = 16000       # envelope analysis rate
FRAME_S = 0.02       # 20 ms loudness frames
MIN_SNR_DB = 15.0    # sound must clear the room noise by at least this
LEAD_S, TAIL_S = 0.03, 0.05   # kept around the detected sound so onsets
                              # and natural decays are never clipped


def envelope(src, seek=None, dur=None):
    """Per-frame RMS loudness (dBFS) of the recording, mono."""
    r = subprocess.run([FF, '-hide_banner', '-nostdin', *cut_args(seek, dur), '-i', str(src),
                        '-ac', '1', '-ar', str(ENV_SR), '-f', 's16le', '-'],
                       capture_output=True)
    a = array.array('h', r.stdout)
    if sys.byteorder == 'big':
        a.byteswap()
    n = int(ENV_SR * FRAME_S)
    out = []
    for i in range(0, len(a) - n + 1, n):
        rms = math.sqrt(sum(x * x for x in a[i:i + n]) / n)
        out.append(20 * math.log10(max(rms, 1.0) / 32768.0))
    return out


def find_sound(env):
    """Locate the sound against the file's OWN noise floor.

    The silence line sits between the room noise and the sound, not at a
    fixed distance below the peak: a phone take recorded quietly has its
    hiss only ~30 dB down, and a peak-relative line inside that hiss read
    noise flicker as extra sounds and pauses (2026-09-22, the first owner
    batch — three single-take files wrongly refused).

    Loud stretches closer together than GAP_S are one sound (the closure
    in /ɑpɑ/ is ~0.1 s). A stretch shorter than MIN_LEN_S is not a sound
    at all but handling noise — the record-button tap, a click, a breath
    after the vowel — and is dropped and reported, never kept in the clip
    and never mistaken for a second take. Two REAL sounds still refuse.

    Returns (start_s, end_s, gaps, blips, snr_db) or an error string.
    """
    if len(env) < 3:
        return 'no audio'
    floor = sorted(env)[len(env) // 5]
    top = max(env)
    snr = top - floor
    if snr < MIN_SNR_DB:
        return 'too noisy — the sound is only %.0f dB above the room noise' % snr
    thresh = floor + max(8.0, 0.35 * snr)
    segs = []                      # [first_frame, last_frame] of loud stretches
    for i, v in enumerate(env):
        if v < thresh:
            continue
        if segs and (i - segs[-1][1] - 1) * FRAME_S < GAP_S:
            segs[-1][1] = i
        else:
            segs.append([i, i])
    real = [s for s in segs if (s[1] + 1 - s[0]) * FRAME_S >= MIN_LEN_S]
    blips = [s[0] * FRAME_S for s in segs if s not in real]
    if not real:
        return 'no sound long enough to be a take (only short noises)'
    gaps = [s[0] * FRAME_S for s in real[1:]]
    return real[0][0] * FRAME_S, (real[-1][1] + 1) * FRAME_S, gaps, blips, snr


def trim(src, dest_wav, seek=None, dur=None):
    """Cut the sound out into a temp WAV (with a gentle 70 Hz high-pass).

    Returns (info, error). Levelling happens AFTER this, measured on the
    sound alone, so how much silence was around it cannot skew the gain.
    """
    found = find_sound(envelope(src, seek, dur))
    if isinstance(found, str):
        return None, found
    start, end, gaps, blips, snr = found
    a = max(0.0, start - LEAD_S) + (seek or 0.0)
    length = (end - start) + LEAD_S + TAIL_S
    if gaps:                       # refused anyway; nothing to cut
        return (gaps, blips, snr), None
    r = run(['-y', '-ss', '%.3f' % a, '-t', '%.3f' % length, '-i', str(src),
             '-af', 'highpass=f=70', '-ac', '1', '-ar', '44100', str(dest_wav)])
    if r.returncode != 0:
        return None, 'trim failed'
    return (gaps, blips, snr), None


def cut_args(seek, dur):
    out = []
    if seek is not None:
        out += ['-ss', f'{seek:.3f}']
    if dur is not None:
        out += ['-t', f'{dur:.3f}']
    return out


def encode(trimmed_wav, dest, gain_db):
    """Level, fade, pad and write mono 44.1 kHz MP3."""
    chain = (
        f'volume={gain_db:.2f}dB,'
        f'afade=t=in:st=0:d={FADE_MS / 1000:.3f},'
        f'areverse,afade=t=in:st=0:d={FADE_MS / 1000:.3f},areverse,'
        f'apad=pad_dur={PAD_MS / 1000:.3f}'
    )
    r = run(['-y', '-i', str(trimmed_wav), '-af', chain,
             '-ac', '1', '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '128k',
             str(dest)])
    return r.returncode == 0, r.stderr


GAP_S = 0.35   # a pause this long inside one file means a second take.
               # Stop closures in the syllable demos (/ɑpɑ/) are ~0.1 s,
               # so they never trip it.


def prepare(src, dest_mp3, tmp_dir, seek=None, dur=None, one_take=True):
    """Trim, then measure the SOUND, then level and encode. Returns a note.

    one_take: the owner's rule (2026-09-21) is ONE take per file. A file
    that still holds two or more sounds separated by a real pause is
    refused, never imported: otherwise every take would ship as one clip.
    """
    tmp = pathlib.Path(tmp_dir) / '_trim.wav'
    info, err = trim(src, tmp, seek, dur)
    if err:
        return None, err
    gaps, blips, snr = info
    if one_take and gaps:
        return None, ('REFUSED — %d sounds in one file (the next one starts at %s). '
                      'Keep only your best take in the file.'
                      % (len(gaps) + 1, ', '.join('%.1fs' % g for g in gaps)))
    m = measure(tmp)
    if not m:
        return None, 'could not measure'
    mean, peak, length = m
    if length < MIN_LEN_S:
        return None, 'only %.2fs of sound — too short, or the take is silent' % length
    gain = min(TARGET_RMS_DB - mean, PEAK_CEIL_DB - peak)
    if dest_mp3 is not None:
        ok, err = encode(tmp, dest_mp3, gain)
        if not ok:
            return None, 'encode failed'
    tmp.unlink(missing_ok=True)
    return (length, gain, snr, blips), None


def slugs_from(manifest):
    data = json.loads(pathlib.Path(manifest).read_text(encoding='utf-8'))
    return [e['slug'] for e in data['entries']]


def mode_files(args, out):
    srcs = sorted(p for p in pathlib.Path(args.source).iterdir()
                  if p.suffix.lower() in AUDIO_EXT and not p.name.startswith('.'))
    if not srcs:
        sys.exit('No audio files in %s' % args.source)
    known = set(slugs_from(args.manifest)) if args.manifest else None
    print('%d recording(s)' % len(srcs))
    bad_name = refused = 0
    with tempfile.TemporaryDirectory() as td:
        for p in srcs:
            slug = p.stem
            if known and slug not in known:
                print('  %-24s  ← NOT a slug in the manifest, skipped' % p.name)
                bad_name += 1
                continue
            got, err = prepare(p, None if args.dry_run else out / (slug + '.mp3'), td)
            if err:
                print('  %-24s  %s' % (p.name, err))
                refused += 1
                continue
            length, gain, snr, blips = got
            print('  %-24s sound %5.2fs  gain %+5.1f dB  clear of noise by %2.0f dB%s'
                  % (p.name, length, gain, snr,
                     ('  (dropped a click at %s)' % ', '.join('%.1fs' % b for b in blips))
                     if blips else ''))
    if bad_name:
        print('\n%d file(s) skipped: the name must be a slug from the manifest.' % bad_name)
    if refused:
        print('\n%d file(s) NOT prepared — see the reason beside each. Fix and re-run;'
              ' nothing else was affected.' % refused)
    if not args.dry_run:
        print('\nWrote to %s — next:\n  python3 tools/import_phonemes.py %s '
              '--dialect <d> --voice reference --dry-run' % (out, out))


def mode_split(args, out):
    slugs = slugs_from(args.manifest)
    src = pathlib.Path(args.source)
    total = (measure(src) or (0, 0, 0))[2]
    gaps = silences(src)
    # Sounds are what lies BETWEEN the silences.
    marks, prev = [], 0.0
    for start, end in gaps:
        if start > prev + 0.05:
            marks.append((prev, start))
        prev = end if end is not None else start
    if total - prev > 0.05:
        marks.append((prev, total))
    marks = [(a, b) for a, b in marks if MIN_LEN_S <= b - a <= MAX_LEN_S]
    print('take %.1fs — found %d sound(s), manifest expects %d' % (total, len(marks), len(slugs)))
    if len(marks) != len(slugs):
        print('\nCOUNT MISMATCH. Nothing written. Either a pause was too short to\n'
              'detect or an extra noise was picked up. Re-record, or use FILES mode.')
        for i, (a, b) in enumerate(marks, 1):
            print('  %2d  %6.2f → %6.2f  (%.2fs)' % (i, a, b, b - a))
        return
    with tempfile.TemporaryDirectory() as td:
        for (a, b), slug in zip(marks, slugs):
            got, err = prepare(src, None if args.dry_run else out / (slug + '.mp3'), td,
                               seek=a, dur=b - a)
            if err:
                print('  %-24s %6.2f → %6.2f  %s' % (slug, a, b, err))
                continue
            length, gain, _snr, _blips = got
            print('  %-24s %6.2f → %6.2f  sound %.2fs  gain %+5.1f dB'
                  % (slug, a, b, length, gain))
    if not args.dry_run:
        print('\nCHECK THE ORDER above before importing — one missed pause renames '
              'everything after it.')


def main():
    global FF
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('source', help='folder of recordings, or one take with --split')
    ap.add_argument('--out', default='prepped', help='output folder (default: prepped)')
    ap.add_argument('--split', action='store_true', help='source is ONE take of every sound')
    ap.add_argument('--manifest', help='phoneme manifest (required with --split)')
    ap.add_argument('--dry-run', action='store_true', help='report only, write nothing')
    args = ap.parse_args()
    if args.split and not args.manifest:
        sys.exit('--split needs --manifest, to know the order and the names.')
    FF = ffmpeg_exe()
    out = pathlib.Path(args.out)
    if not args.dry_run:
        out.mkdir(parents=True, exist_ok=True)
    (mode_split if args.split else mode_files)(args, out)


if __name__ == '__main__':
    main()
