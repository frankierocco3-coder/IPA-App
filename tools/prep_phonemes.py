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
import json
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


def trim(src, dest_wav, seek=None, dur=None):
    """Cut the silence off both ends into a temp WAV.

    The threshold follows the recording's own peak instead of being fixed:
    a quietly recorded take is not silence, and a fixed -45 dB floor
    deletes one outright. Levelling happens AFTER this, measured on the
    sound alone, so how much silence was around it cannot skew the gain.
    """
    m = measure(src, cut_args(seek, dur))
    peak = m[1] if m else -6.0
    thresh = max(peak - 30.0, -60.0)
    chain = (
        f'silenceremove=start_periods=1:start_silence=0.03:start_threshold={thresh:.1f}dB:detection=rms,'
        'areverse,'
        f'silenceremove=start_periods=1:start_silence=0.03:start_threshold={thresh:.1f}dB:detection=rms,'
        'areverse'
    )
    r = run(['-y', *cut_args(seek, dur), '-i', str(src), '-af', chain,
             '-ac', '1', '-ar', '44100', str(dest_wav)])
    return r.returncode == 0, r.stderr


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


def prepare(src, dest_mp3, tmp_dir, seek=None, dur=None):
    """Trim, then measure the SOUND, then level and encode. Returns a note."""
    tmp = pathlib.Path(tmp_dir) / '_trim.wav'
    ok, err = trim(src, tmp, seek, dur)
    if not ok:
        return None, 'trim failed'
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
    return (length, gain), None


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
    bad = 0
    with tempfile.TemporaryDirectory() as td:
        for p in srcs:
            slug = p.stem
            if known and slug not in known:
                print('  %-24s  ← NOT a slug in the manifest, skipped' % p.name)
                bad += 1
                continue
            got, err = prepare(p, None if args.dry_run else out / (slug + '.mp3'), td)
            if err:
                print('  %-24s  %s' % (p.name, err))
                bad += 1
                continue
            length, gain = got
            print('  %-24s sound %5.2fs  gain %+5.1f dB' % (p.name, length, gain))
    if bad:
        print('\n%d file(s) skipped: the name must be exactly <slug>.mp3-style.' % bad)
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
            length, gain = got
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
