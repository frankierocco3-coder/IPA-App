# IPA Articulation Assets

This package contains **47 original app-ready PNG assets**:

- **44 articulation illustrations** for individual vowels, diphthongs, and consonants
- **3 overview charts**: Diphthongs, Vowels, and Consonants
- Editable SVG source files for the three charts

Every articulation image has an exact Unicode IPA symbol in its header, sourced directly from the corresponding `manifest.json` entry. The symbols on all three charts were also verified against their editable SVG sources.

## Instructions for Claude

1. Read `manifest.json` first. It is the source of truth for every symbol and filename.
2. Copy the files from `images/` into the app's asset directory.
3. Map each app item to the relative path in the manifest's `file` field.
4. Preserve every Unicode IPA symbol exactly as written in the manifest. Do not infer symbols from filenames.
5. Use the PNG files in the app. The chart SVG files are optional editable sources.
6. Display articulation images with their original **4:5 portrait aspect ratio** and `contain`-style fitting so nothing is cropped.

## Visual conventions

- Coral marks show airflow, releases, movement, or important contact/constriction.
- Dark curved marks at the throat show vocal-fold vibration for voiced sounds.
- The drawings intentionally exaggerate the most important tongue, lip, teeth, jaw, airflow, or voicing action.

## Package structure

```text
ipa-assets/
  README.md
  manifest.json
  images/
    001-...png through 047-...png
    006-diphthongs-chart.svg
    017-vowels-chart.svg
    038-consonants-chart.svg
```

All included PNG and SVG assets are newly created for this app package; the original reference photographs/screenshots are not included.
