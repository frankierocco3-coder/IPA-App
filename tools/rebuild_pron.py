#!/usr/bin/env python3
"""Rebuild js/data/pron.json from the CMU Pronouncing Dictionary.

WHY THIS FILE EXISTS. pron.json was converted from CMUdict once, outside the
repo, and the conversion itself was never written down. That lost two things:
the ARPAbet->IPA mapping, and the stress digits. Losing the stress is what
broke the length marks — CMUdict distinguishes FLEECE (IY1/IY2) from happY
(IY0) and GOOSE (UW1/UW2) from the weak /u/ (UW0), and with the digits gone
there is no rule that can tell influence /'Influens/ from fluent /'flu:ent/.
They sit in the same environment and differ only in stress.

So the mapping lives here now, and the rebuild is a command rather than a
memory. Run it after a CMUdict update, or to verify the shipped file.

    python3 tools/rebuild_pron.py <cmudict.dict> [--write]

Without --write it only reports. The source is
https://github.com/cmusphinx/cmudict (BSD; the notice ships in
js/data/pron-licence.js and renders in Sources & Credits).

THE INVARIANT. Stripping every length mark from the output must reproduce the
previous file byte for byte. That is what makes a rebuild safe to trust: it
proves the segments are untouched and only length was added. The check runs on
every invocation and refuses to write if it fails.

Length marks follow the Dialect Accuracy Standard (js/data/dialects.js),
which asks for them on exactly three vowels: "/i: u: o:/ keep their length
marks by convention" (nam.convention). happY stays bare /i/ here and each
accent sets its own realization in js/pron.js — lax /I/ for Traditional RP,
tense /i/ for Standard British and Cockney, /i:/ for Australian.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PRON = ROOT / "js" / "data" / "pron.json"

# ARPAbet -> IPA. AH and ER pick their symbol from stress, which is how the
# original conversion produced /V/ vs schwa and /3`/ vs /@`/ — more evidence
# the digits were present and then dropped.
SIMPLE = {
    "AA": "ɑ", "AE": "æ", "AW": "aʊ", "AY": "aɪ", "B": "b", "CH": "tʃ",
    "D": "d", "DH": "ð", "EH": "ɛ", "EY": "eɪ", "F": "f", "G": "ɡ",
    "HH": "h", "IH": "ɪ", "JH": "dʒ", "K": "k", "L": "l", "M": "m",
    "N": "n", "NG": "ŋ", "OW": "oʊ", "OY": "ɔɪ", "P": "p", "R": "ɹ",
    "S": "s", "SH": "ʃ", "T": "t", "TH": "θ", "UH": "ʊ", "V": "v",
    "W": "w", "Y": "j", "Z": "z", "ZH": "ʒ",
}
PHONE = re.compile(r"^([A-Z]+)([0-2])?$")

# Vowel units, for counting syllables and finding onsets.
VOWELS = {"ɑ", "æ", "ʌ", "ɔː", "ɛ", "ɪ", "i", "iː", "ʊ", "u", "uː", "ə",
          "ɝ", "ɚ", "eɪ", "aɪ", "ɔɪ", "oʊ", "aʊ"}

# Legal English onsets, for placing the stress mark at the syllable onset
# rather than jammed against the vowel. A bare single consonant is legal
# (except /ŋ/); these are the clusters.
_TWO = {"s" + c for c in "ptkmnflwj"}
_TWO |= {c + "l" for c in "pbkɡf"}
_TWO |= {c + "ɹ" for c in "pbtdkɡfθʃ"}
_TWO |= {c + "w" for c in "tdkɡsθ"}
_TWO |= {c + "j" for c in "pbtdkɡfvhmnls"}
_TWO |= {"ʃɹ", "ʃw", "ʃm", "ʃn", "ʃl", "vj", "θj"}
_THREE = {s + c for s in ("sp", "st", "sk") for c in "lɹwj"}


def legal_onset(cluster):
    n = len(cluster)
    if n == 0:
        return True
    if n == 1:
        return cluster[0] != "ŋ"
    if n == 2:
        return "".join(cluster) in _TWO
    if n == 3:
        return "".join(cluster) in _THREE
    return False


def place_stress(units, digits):
    """Insert ˈ / ˌ at syllable onsets, by the maximal onset principle.

    MONOSYLLABLES TAKE NO MARK, which is dictionary practice and matches the
    lesson copy: dialects.js writes `tune /tjuːn/` bare but `duty /ˈdjuːtɪ/`
    marked. Marking every one-syllable word would be noise.

    Known limit: maximal onset ignores morpheme boundaries, so `translate`
    comes out /ˈtɹænˌsleɪt/ where a dictionary respecting the prefix would
    write /ˈtɹænsˌleɪt/. It never changes WHICH syllable carries the stress,
    which is all the scansion in js/scan.js reads.
    """
    vowel_at = [i for i, u in enumerate(units) if u in VOWELS]
    if len(vowel_at) < 2:
        return "".join(units)
    marks = {}
    for n, i in enumerate(vowel_at):
        digit = digits[n] if n < len(digits) else "0"
        if digit == "0":
            continue
        j = i
        while j > 0 and units[j - 1] not in VOWELS:
            j -= 1
        run = units[j:i]
        start = i
        for k in range(len(run)):
            if legal_onset(run[k:]):
                start = j + k
                break
        marks[start] = "ˈ" if digit == "1" else "ˌ"
    out = []
    for i, u in enumerate(units):
        if i in marks:
            out.append(marks[i])
        out.append(u)
    return "".join(out)


def demote_final_happy(phones):
    """CMUdict marks some word-final -y as IY2. It is happY, not FLEECE.

    The dictionary is inconsistent here: `city` is IY0 but `ability`,
    `adversity` and `agnostically` are IY2, which would give them a long
    stressed /iː/ ending and, downstream, block Cockney's T-glottalling
    (ability [əˈbɪlɪʔi]). 516 words are affected and every one of them is
    an ordinary happY ending.

    Only the LAST vowel is demoted, and only when a primary stress exists
    elsewhere in the word — so a genuine final stress (`absentee`,
    `addressee`, which CMUdict marks IY1) is never touched.
    """
    idx = [i for i, p in enumerate(phones) if PHONE.match(p) and PHONE.match(p).group(2)]
    if not idx:
        return phones
    last = idx[-1]
    if not phones[last].startswith("IY2"):
        return phones
    if not any(phones[i].endswith("1") for i in idx[:-1]):
        return phones
    out = list(phones)
    out[last] = "IY0"
    return out


def convert(phones):
    """ARPAbet phones -> IPA with stress marks, or None if unrecognised."""
    phones = demote_final_happy(phones)
    units, digits = [], []
    for p in phones:
        m = PHONE.match(p)
        if not m:
            return None
        base, digit = m.group(1), (m.group(2) or "0")
        stressed = digit in ("1", "2")
        if base == "AH":
            ipa = "ʌ" if stressed else "ə"
        elif base == "ER":
            ipa = "ɝ" if stressed else "ɚ"
        elif base == "IY":
            ipa = "iː" if stressed else "i"      # FLEECE / happY
        elif base == "UW":
            ipa = "uː" if stressed else "u"      # GOOSE / weak
        elif base == "AO":
            ipa = "ɔː"                            # THOUGHT
        else:
            ipa = SIMPLE.get(base)
        if ipa is None:
            return None
        units.append(ipa)
        if ipa in VOWELS:
            digits.append(digit)
    return place_stress(units, digits)


def read_cmudict(path):
    """First pronunciation per word; variants like `word(2)` are skipped."""
    first = {}
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.split("#")[0].strip()
            if not line:
                continue
            parts = line.split()
            if parts[0].endswith(")"):
                continue
            first.setdefault(parts[0], parts[1:])
    return first


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    write = "--write" in sys.argv
    if not args:
        print(__doc__)
        return 2
    source = read_cmudict(args[0])
    old = json.loads(PRON.read_text(encoding="utf-8"))

    new, unknown, changed = {}, [], 0
    for word, current in old.items():
        phones = source.get(word)
        built = convert(phones) if phones else None
        if built is None:
            unknown.append(word)
            built = current          # keep what ships rather than drop a word
        new[word] = built
        if built != current:
            changed += 1

    # The invariant: marks are the ONLY difference. Compare the two STRIPPED
    # forms, not the stripped output against the shipped string — otherwise
    # the check passes once and then fails on every re-run, because the
    # shipped file now carries the marks it just gained.
    def segments(v):
        return v.replace("ː", "").replace("ˈ", "").replace("ˌ", "")
    broke = [w for w in old if segments(new[w]) != segments(old[w])]

    print("entries            : %7d" % len(new))
    print("changed            : %7d" % changed)
    print("missing from source: %7d" % len(unknown))
    print("key order preserved: %s" % (list(new) == list(old)))
    print("segments unchanged  : %s" % (not broke))
    if broke:
        w = broke[0]
        print("  REFUSING TO WRITE — %r would become %r, which is not the "
              "same segments" % (old[w], new[w]))
        return 1
    if unknown[:5]:
        print("  kept as-is: %s" % ", ".join(unknown[:5]))

    if write:
        PRON.write_text(
            json.dumps(new, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8")
        print("\nwrote %s" % PRON.relative_to(ROOT))
    else:
        print("\n(dry run — pass --write to update %s)" % PRON.relative_to(ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
