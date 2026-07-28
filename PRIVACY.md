# Privacy

Short version: **everything stays on your device.** Speechcraft has no
servers, no accounts, no analytics and no trackers, and it makes no external
network requests.

## What is stored, and where

All of it is in your browser, on the device you are using:

| Data | Storage | Notes |
|---|---|---|
| Rehearsal projects, text, notes, difficult words | IndexedDB | |
| Audio recordings | IndexedDB | your voice, stored as blobs |
| Recording metadata (ratings, notes, durations) | IndexedDB | |
| Practice analytics | localStorage | counters per sound/exercise |
| Personal pronunciation dictionary | localStorage | |
| XP, streak, completed lessons, settings | localStorage | |

Nothing is uploaded. There is no "sync", no cloud copy, and no backup — which
also means **clearing your browser data deletes it permanently.**

## What leaves your device

**Nothing you create.** Not your recordings, not your text, not your notes,
not your practice results.

The only network activity is the browser downloading the app's own files from
GitHub Pages when you load the page — the same as any website. GitHub, as the
host, sees ordinary web-server information (such as your IP address and the
files requested); that is GitHub's logging, not something the app sends. The
app does not add analytics, cookies, tracking pixels, fonts, CDNs or
third-party scripts of any kind.

## Microphone

* Permission is requested **only** when you press **Record** — never on load.
* Recording never starts on its own.
* Only one recording can run at a time, and it stops automatically after
  2 minutes.
* The microphone is released as soon as you stop, cancel, hit an error, or
  leave the page.
* Recordings are written straight to local storage and are **never uploaded**.
* Denying permission leaves the rest of the app fully usable.

Your browser's own microphone indicator is the authoritative signal — trust it
over any claim in this document.

## Exports

Exported project files contain the fields you entered: title, source, author,
character, scene, dialect, text, notes, difficult words and pronunciation
overrides, plus recording *metadata* (rating, note, duration, date).

**Audio is never included in an export.** Recordings stay on the device that
made them. Exports contain no internal database ids, no device information and
no browser identifiers.

Once you save or send an export, its contents are your responsibility.

## Deleting your data

In the app: **The IPA Handbook → Privacy & Data**, which offers

* delete projects, recordings, analytics and dictionary — *keeping* XP,
  streak and lesson progress, or
* delete everything, including course progress.

Both ask twice and cannot be undone. You can also clear site data for this
origin in your browser settings, which removes all of it.

## An honest limitation

**Browser storage is not encrypted.** Anyone who can use this device and
browser profile — or who opens developer tools — can read or modify your
projects, notes and recordings. A browser extension with access to the page
can do the same.

Treat it like a notebook on a desk, not a locked safe. If a recording is
sensitive, delete it when you are done, and do not use a shared computer for
work you would not want a later user to find.

Making this genuinely private would require a passphrase and encryption at
rest, which this app does not have.

## Children

The app collects nothing and transmits nothing, so it stores no personal
information about anyone, of any age, beyond what a user chooses to type into
their own device.
