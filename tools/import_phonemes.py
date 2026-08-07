#!/usr/bin/env python3
"""Import human-recorded isolated-phoneme MP3s — safely.

Offline tooling only (never deployed). Copies validated recordings into
    audio/phonemes/<dialect>/<voice>/<slug>.mp3
and rebuilds audio/phonemes-index.json (the CANDIDATE index #audit reads).

Being in the index makes a clip REVIEWABLE, not playable: nothing reaches a
learner until Frankie listens at #audit, marks it Good, and commits the
exported js/data/audio-flags.js. This tool never writes APPROVED_PHONEMES.

Usage:
    python3 tools/import_phonemes.py <folder> --dialect nam --voice reference --dry-run
    python3 tools/import_phonemes.py <folder> --dialect nam --voice reference
    python3 tools/import_phonemes.py --self-test

Rules enforced:
  * dialect must be one of nam/rp/aus/ssbe; voice key must be a short
    lowercase identifier (e.g. 'reference' — word-audio keys not required)
  * every file must be <slug>.mp3 where slug is a real inventory slug
    (derived from js/data/phonemes.js names) or its _syllable variant
  * empty or non-MP3 files are rejected (size + magic-byte check)
  * two source files that would land on the same slug are rejected
  * an existing recording is never overwritten unless --replace is given
"""

import argparse
import json
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"
DATA = ROOT / "js" / "data"

DIALECTS = ("nam", "rp", "aus", "ssbe")
VOICE_RE = re.compile(r"^[a-z][a-z0-9_-]{0,23}$")
MIN_BYTES = 2048          # a real recording is never this small


def inventory_slugs():
    """Every legal slug: name-derived (same transform as js/main.js
    phonemeSlug) plus the _syllable variant of each."""
    src = (DATA / "phonemes.js").read_text(encoding="utf-8")
    names = re.findall(r"^\s*'[^']+': \{ type: '\w+', name: '([^']+)'", src, re.M)
    slugs = set()
    for n in names:
        slug = re.sub(r"[^a-z0-9]+", "_", n.lower()).strip("_")
        slugs.add(slug)
        slugs.add(slug + "_syllable")
    return slugs


def looks_like_mp3(path):
    try:
        head = path.open("rb").read(3)
    except OSError:
        return False
    # ID3 tag or a bare MPEG frame sync
    return head[:3] == b"ID3" or (len(head) >= 2 and head[0] == 0xFF and (head[1] & 0xE0) == 0xE0)


def validate_batch(files, dialect, voice, valid_slugs, dest_dir, replace):
    """Pure validation → (plan, errors). `files` is a list of Paths."""
    errors, plan, claimed = [], [], {}
    if dialect not in DIALECTS:
        errors.append("unknown dialect %r (expected one of %s)" % (dialect, "/".join(DIALECTS)))
    if not VOICE_RE.match(voice or ""):
        errors.append("voice key %r is not a short lowercase identifier" % voice)
    if errors:
        return plan, errors

    for f in sorted(files):
        if f.suffix.lower() != ".mp3":
            errors.append("%s: not an .mp3 file" % f.name)
            continue
        slug = f.stem
        if slug not in valid_slugs:
            errors.append("%s: unknown slug %r — not in the phoneme inventory" % (f.name, slug))
            continue
        if slug in claimed:
            errors.append("%s: duplicate — %s already claims slug %r" % (f.name, claimed[slug], slug))
            continue
        try:
            size = f.stat().st_size
        except OSError:
            errors.append("%s: unreadable" % f.name)
            continue
        if size < MIN_BYTES:
            errors.append("%s: %d bytes — empty or truncated" % (f.name, size))
            continue
        if not looks_like_mp3(f):
            errors.append("%s: does not look like MP3 audio (bad header)" % f.name)
            continue
        dest = dest_dir / (slug + ".mp3")
        if dest.exists() and not replace:
            try:
                shown = dest.relative_to(ROOT)
            except ValueError:
                shown = dest
            errors.append("%s: %s already exists — pass --replace to overwrite it"
                          % (f.name, shown))
            continue
        claimed[slug] = f.name
        plan.append((f, dest, slug))
    return plan, errors


def rebuild_index():
    """Candidate index = exactly what is on disk (same shape the old
    generator wrote): {dialect: {voice: [slugs]}}."""
    index = {}
    for d in DIALECTS:
        index[d] = {}
        base = AUDIO / "phonemes" / d
        if base.is_dir():
            for sub in sorted(base.iterdir()):
                if sub.is_dir():
                    index[d][sub.name] = sorted(p.stem for p in sub.glob("*.mp3"))
    (AUDIO / "phonemes-index.json").write_text(json.dumps(index, indent=1))
    return index


def self_test():
    """Prove the validators reject what they must. No disk writes."""
    import tempfile
    fails = []
    ok = lambda name, cond: fails.append(name) if not cond else None
    slugs = inventory_slugs()
    ok("inventory has pilot slugs", {"kit_vowel", "american_lot_palm", "p_syllable"} <= slugs)
    ok("inventory rejects nonsense", "totally_made_up" not in slugs)

    with tempfile.TemporaryDirectory() as td:
        tdp = pathlib.Path(td)
        dest = tdp / "dest"
        dest.mkdir()
        good = tdp / "kit_vowel.mp3"
        good.write_bytes(b"ID3" + b"\x00" * 4096)
        tiny = tdp / "schwa.mp3"
        tiny.write_bytes(b"ID3")
        fake = tdp / "s.mp3"
        fake.write_bytes(b"RIFF" + b"\x00" * 4096)          # WAV pretending
        unknown = tdp / "not_a_slug.mp3"
        unknown.write_bytes(b"ID3" + b"\x00" * 4096)

        plan, errs = validate_batch([good, tiny, fake, unknown], "nam", "reference", slugs, dest, False)
        ok("good file planned", [p[2] for p in plan] == ["kit_vowel"])
        ok("tiny file rejected", any("empty or truncated" in e for e in errs))
        ok("non-mp3 content rejected", any("bad header" in e for e in errs))
        ok("unknown slug rejected", any("unknown slug" in e for e in errs))

        _, errs2 = validate_batch([good], "xx", "reference", slugs, dest, False)
        ok("unknown dialect rejected", any("unknown dialect" in e for e in errs2))
        _, errs3 = validate_batch([good], "nam", "Bad Voice!", slugs, dest, False)
        ok("bad voice key rejected", any("voice key" in e for e in errs3))

        # duplicate slug from two files (case variant)
        dup = tdp / "sub"
        dup.mkdir()
        dup_file = dup / "kit_vowel.mp3"
        dup_file.write_bytes(b"ID3" + b"\x00" * 4096)
        _, errs4 = validate_batch([good, dup_file], "nam", "reference", slugs, dest, False)
        ok("duplicate slug rejected", any("duplicate" in e for e in errs4))

        # never overwrite without --replace
        (dest / "kit_vowel.mp3").write_bytes(b"ID3" + b"\x00" * 4096)
        _, errs5 = validate_batch([good], "nam", "reference", slugs, dest, False)
        ok("existing file protected", any("--replace" in e for e in errs5))
        plan6, errs6 = validate_batch([good], "nam", "reference", slugs, dest, True)
        ok("--replace allows overwrite", len(plan6) == 1 and not errs6)

    if fails:
        print("SELF-TEST FAILED:")
        for f in fails:
            print("  ✗ " + f)
        sys.exit(1)
    print("Self-test PASSED — 11/11 validator checks")


def main():
    ap = argparse.ArgumentParser(description="Import human phoneme recordings")
    ap.add_argument("source", nargs="?", help="folder of <slug>.mp3 recordings")
    ap.add_argument("--dialect", help="nam | rp | aus | ssbe")
    ap.add_argument("--voice", default="reference", help="voice key (default: reference)")
    ap.add_argument("--dry-run", action="store_true", help="validate and show the plan only")
    ap.add_argument("--replace", action="store_true", help="allow overwriting an existing recording")
    ap.add_argument("--self-test", action="store_true", help="run the validator self-test and exit")
    args = ap.parse_args()

    if args.self_test:
        self_test()
        return
    if not args.source or not args.dialect:
        ap.error("source folder and --dialect are required (or use --self-test)")

    src = pathlib.Path(args.source)
    if not src.is_dir():
        sys.exit("source %r is not a folder" % args.source)
    files = [p for p in src.iterdir() if p.is_file() and not p.name.startswith(".")]
    if not files:
        sys.exit("no files found in %s" % src)

    dest_dir = AUDIO / "phonemes" / args.dialect / args.voice
    plan, errors = validate_batch(files, args.dialect, args.voice,
                                  inventory_slugs(), dest_dir, args.replace)
    if errors:
        print("REJECTED — fix these and re-run (nothing was written):")
        for e in errors:
            print("  ✗ " + e)
        sys.exit(1)

    print("%d recording(s) validated for %s/%s:" % (len(plan), args.dialect, args.voice))
    for f, dest, slug in plan:
        print("  %s → %s" % (f.name, dest.relative_to(ROOT)))
    if args.dry_run:
        print("Dry run — nothing written. Re-run without --dry-run to import.")
        return

    dest_dir.mkdir(parents=True, exist_ok=True)
    for f, dest, _slug in plan:
        shutil.copy2(f, dest)
    index = rebuild_index()
    total = sum(len(v) for d in index.values() for v in d.values())
    print("Imported %d file(s); rebuilt audio/phonemes-index.json (%d candidates total)."
          % (len(plan), total))
    print("Next: open the app at #audit, listen, mark Good/Bad, export the")
    print("flags file and commit it. Nothing plays for learners before that.")


if __name__ == "__main__":
    main()
