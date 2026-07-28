# Email agent

*Audit date: 2026-07-28 · Branch: `security-hardening`*

## Finding: there is no email agent in this repository

**This repository contains no email functionality of any kind.** This document
exists to record that verification, so nobody later assumes there is an
unaudited mail integration hiding somewhere in the codebase.

Every question in the standard email-agent audit has the same answer:

| Question | Answer |
|---|---|
| Which mailbox does it access? | **None.** No mailbox is configured or reachable |
| OAuth scopes / permissions | **None.** No OAuth client, no consent flow, no tokens |
| What triggers it? | **Nothing.** No trigger, schedule, webhook or event exists |
| What email data does it read? | **None.** No mail is ever fetched |
| What does it store? | **No email data.** Storage holds only lessons, projects, recordings and analytics |
| Can it draft? | **No** |
| Can it send? | **No** |
| Can it forward? | **No** |
| Can it archive? | **No** |
| Can it label? | **No** |
| Can it delete? | **No** |
| External services it can contact | **None at runtime.** Two same-origin `fetch` calls, nothing else |
| Failure / retry behaviour | Not applicable — no such subsystem |
| Logs and audit history | Not applicable |
| How to disable it | Not applicable — nothing to disable |

## How this was verified

```bash
# 1. No mail-related code (excluding js/data/pron.json, an English
#    pronunciation dictionary that legitimately contains the word "email")
grep -rniE "gmail|imap|smtp|oauth|mailbox|inbox|nodemailer|sendgrid|mailgun" \
     js/*.js tools/ .github/ index.html
#    → only matches: tools/scan_secrets.py, which *defines regexes* for
#      Google OAuth and SendGrid credential shapes. Detection patterns, not usage.

# 2. Every network call in shipped code
grep -rnE "fetch\(|new XMLHttpRequest|WebSocket|sendBeacon" js/*.js
#    → js/audio.js:47   fetch('audio/index.json')      (same-origin)
#    → js/pron.js:14    fetch('./data/pron.json')      (same-origin)

# 3. External hosts referenced in shipped code
grep -rhoE "https?://[a-zA-Z0-9.-]+" js/*.js index.html css/*.css
#    → (no output)

# 4. Enforced continuously
python3 tools/security_audit.py     # fails CI if any external origin appears
```

The Content-Security-Policy (`connect-src 'self'`) blocks outbound requests at
the browser level regardless, so an email integration could not be added by
accident without also changing `index.html`.

## The email agent you may be thinking of

Per the project notes, there **is** a separate Gmail automation project —
the **Quick Move & Packing email agent** (roster, campaigns, daily monitor).
That is a **different system in a different location** and is **not part of
this repository**. Nothing in Speechcraft touches it, shares credentials with
it, or can reach it.

If that agent needs auditing, it must be audited in its own repository. This
document should not be used as a substitute, and its "no email agent" finding
says nothing about that system's security.

## If email is ever added here

It would be a significant architectural change and should not be done
casually. At minimum it would require:

* A **backend**. Mail credentials cannot live in browser code — see
  `docs/CREDENTIAL_POLICY.md`. A static site has no safe way to hold an OAuth
  refresh token or API key.
* **Narrowest possible OAuth scopes**, never full-mailbox access. Prefer
  `gmail.compose` or a send-only scope over `gmail.modify`.
* **No automatic sending.** A human confirmation step before any outbound
  message.
* **An audit log** of every message read, drafted or sent.
* **A kill switch** that revokes tokens and halts processing.
* A revision of `docs/THREAT_MODEL.md`, this document, and `PRIVACY.md`,
  because "nothing leaves your device" would no longer be true.
