"""Where the audio lives: the IPA-Audio checkout beside this repository.

Audio moved out of this repository on 2026-09-21 into IPA-Audio, which is
published as its own Pages site at /IPA-Audio/ (same origin as the app).
Every offline tool that reads or writes clips imports AUDIO from here, so
there is exactly one answer to "where is the audio". Override it with
SPEECHCRAFT_AUDIO_DIR (CI checks IPA-Audio out inside the workspace).
"""
import os
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = pathlib.Path(os.environ.get("SPEECHCRAFT_AUDIO_DIR")
                     or ROOT.parent / "IPA-Audio").resolve()


def require_audio():
    """Stop with a clear message when the audio checkout is missing."""
    if not (AUDIO / "index.json").is_file():
        raise SystemExit(
            "No audio found at %s.\nClone IPA-Audio beside this repository "
            "(git clone git@github.com:frankierocco3-coder/IPA-Audio.git), "
            "or set SPEECHCRAFT_AUDIO_DIR." % AUDIO)
    return AUDIO
