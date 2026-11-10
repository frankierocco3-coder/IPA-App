#!/usr/bin/env python3
"""Build the booth-page data payload from the phoneme manifests.

One source of truth: everything here comes from
tools/phoneme_manifest_<d>.json plus APPROVED_PHONEMES, through the same
functions that generate the markdown scripts. Presentation lives in
tools/phoneme_booth_page.py; this module only assembles facts.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import phoneme_script as ps  # noqa: E402


def entry_rows(dialect, shares, done):
    manifest = ps.read_json(
        os.path.join(HERE, "phoneme_manifest_%s.json" % dialect))
    entries = list(enumerate(manifest["entries"], 1))
    own, fresh, copy = ps.classify(entries, done)
    pile = {}
    for n, _ in own:
        pile[n] = "own"
    for n, _ in fresh:
        pile[n] = "fresh"
    for n, _ in copy:
        pile[n] = "copy"

    rows = []
    for n, e in entries:
        also = [ps.NAMES[o] for o in ps.DIALECTS
                if o != dialect and e["slug"] in shares.get(o, ())]
        rows.append({
            "n": n,
            "slug": e["slug"],
            "symbol": e["symbol"],
            "set": e.get("lexicalSet") or "",
            "kind": ps.kind_of(e),
            "guidance": e["guidance"],
            "pile": pile[n],
            "takeWhy": e.get("takeWhy") or "",
            "takeNote": e.get("takeNote") or "",
            "alsoServes": also,
        })
    return rows, len(own), len(fresh), len(copy), manifest


def runs_of(rows):
    out = []
    for r in rows:
        if not out or out[-1]["kind"] != r["kind"]:
            out.append({"kind": r["kind"], "lo": r["n"], "hi": r["n"]})
        else:
            out[-1]["hi"] = r["n"]
    return out


def build():
    done = ps.approved_slugs("nam")
    shares = ps.fresh_map()
    shared_n, own_n, naive_n = ps.session_total()

    accents = []
    for d in ps.DIALECTS:
        rows, n_own, n_fresh, n_copy, manifest = entry_rows(d, shares, done)
        paras = dict((k, v) for k, v in ps.paragraphs(manifest["_readme"]) if k)
        loose = [t for k, t in ps.paragraphs(manifest["_readme"]) if k is None]
        runs = runs_of(rows)
        kinds = {}
        for r in runs:
            kinds[r["kind"]] = kinds.get(r["kind"], 0) + 1
        counts = {}
        for r in rows:
            counts[r["kind"]] = counts.get(r["kind"], 0) + 1
        accents.append({
            "code": d,
            "name": ps.NAMES[d],
            "total": len(rows),
            "perform": n_own + n_fresh,
            "own": n_own,
            "fresh": n_fresh,
            "copy": n_copy,
            "counts": counts,
            "runs": runs,
            "repeatedGroups": any(v > 1 for v in kinds.values()),
            "frame": paras.get("frame", ""),
            "cast": paras.get("cast", ""),
            "risks": loose,
            "general": paras.get("general", ""),
            "order": paras.get("order", ""),
            "share": paras.get("share", ""),
            "entries": rows,
            "script": "docs/PHONEME_RECORDING_SCRIPT_%s.md" % d.upper(),
            "manifest": "tools/phoneme_manifest_%s.json" % d,
        })

    return {
        "generatedFrom": "tools/phoneme_manifest_{rp,ssbe,aus,cockney}.json",
        "sessionShared": shared_n,
        "sessionOwn": own_n,
        "sessionTotal": shared_n + own_n,
        "naiveSum": naive_n,
        "namApproved": len(done),
        "accents": accents,
        "kindLabel": ps.KIND_LABEL,
    }


if __name__ == "__main__":
    json.dump(build(), sys.stdout, ensure_ascii=False, indent=2)
