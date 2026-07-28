# Incident response

One-person project, no on-call. The aim is a clear order of operations so a
bad day does not become a worse one.

**First principle: contain before you investigate.** Revoke and take offline
first; work out what happened afterwards.

---

## 1. Suspected GitHub account compromise

**Contain (minutes)**
1. <https://github.com/settings/security> → **change password**.
2. **Sign out of all other sessions** (same page).
3. <https://github.com/settings/tokens> → revoke every PAT you do not
   recognise, and any you cannot positively account for.
4. <https://github.com/settings/applications> → revoke unknown OAuth apps.
5. <https://github.com/settings/keys> → remove unknown SSH/GPG keys.
6. Confirm 2FA is on; re-enrol the authenticator if you suspect it leaked.

**Assess**
7. <https://github.com/settings/security-log> — look for `repo.push`,
   `workflows`, `protected_branch`, `oauth_authorization.create` from unknown
   IPs/locations.
8. `git log --oneline -30 origin/main` — is every commit yours?
9. Repo → Actions → any run you did not trigger?

**Recover**
10. If malicious code was pushed and deployed, follow **§6**.
11. Rotate every credential the account could reach — including the
    ElevenLabs key (**§2**).

## 2. Suspected ElevenLabs API key leak

Assume compromise if the key was ever pasted anywhere shared — chat, an issue,
a screenshot, a log.

**Contain**
1. <https://elevenlabs.io/app/settings/api-keys> → **delete the key**. Delete
   first; a live key is billable.
2. Create a replacement with *Restrict Key* on and only **Text to Speech** and
   **Voices** enabled.
3. Save it to `tools/.elevenlabs_key` (gitignored) or export
   `ELEVENLABS_API_KEY`. `chmod 600` the file.

**Assess**
4. Billing → Usage: look for generation you did not run.
5. `python3 tools/security_audit.py` — confirms no key-shaped string is in the
   working tree.
6. Scan history (values are redacted in output):
   ```bash
   git log --all -p -S 'sk_' -- . | head
   ```

**If a key really is in git history**
7. **Revoke it first** (step 1). History rewriting does not un-leak a key —
   anyone who cloned already has it.
8. Only then consider rewriting, on a clone, never blindly on the remote:
   ```bash
   git clone --mirror git@github.com:USER/REPO.git repo-clean.git
   cd repo-clean.git
   # git-filter-repo is the maintained tool (pip install git-filter-repo)
   git filter-repo --replace-text <(echo 'literal:THE_LEAKED_VALUE==>REDACTED')
   # review thoroughly, then:
   # git push --force --mirror
   ```
9. Force-pushing rewrites every SHA: tell any collaborator to re-clone, and
   expect forks/caches to retain the old objects.

## 3. Unexpected GitHub Actions runs

1. Actions tab → open the run → **who/what triggered it?**
2. Cancel anything running.
3. Settings → Actions → **Disable Actions** if you cannot explain it.
4. Read the workflow file *as it existed on that commit* — a malicious PR may
   have edited it.
5. Check the run logs for exfiltration (curl/wget to unknown hosts, base64 of
   secrets). Treat every secret the workflow could read as compromised → **§2**.
6. Confirm workflows still use `GITHUB_TOKEN`, least privilege and pinned SHAs.

## 4. Unauthorized repository changes

1. `git fetch --all && git log --oneline --all --since='14 days'` — identify
   commits that are not yours.
2. `git show <sha>` — read the actual diff before judging.
3. Revert rather than force-push where possible:
   ```bash
   git revert <bad-sha> && git push
   ```
4. If `main` is badly poisoned, reset to a known-good commit on a branch,
   review, then fast-forward.
5. Redeploy from a verified commit (**§6**), then do **§1**.

## 5. Unexpected billing

* **ElevenLabs:** revoke the key (**§2**), then Billing → Usage to see what was
  generated and when. Set/lower a spend cap.
* **GitHub:** Settings → Billing → check Actions minutes and Pages bandwidth.
  Unexpected Actions minutes usually mean **§3**.
* Contact provider support for fraudulent usage; keep the timeline you built
  above.

## 6. Malicious code deployed to Pages

1. **Take it down first:** Settings → Pages → set source to **None**
   (users stop receiving the bad build immediately).
2. Identify the last good commit: `git log --oneline`.
3. Reset and republish:
   ```bash
   git revert <bad-sha>        # preferred
   git push
   ```
4. Re-enable Pages; confirm the deploy ran from the expected commit.
5. Verify the live site: view source, check `js/` files, run
   `python3 tools/security_audit.py` on the deployed commit.
6. **User impact:** malicious JS on the origin could have read every user's
   IndexedDB — projects and recordings. If that is plausible, say so publicly
   in the README and advise clearing site data. Users have no accounts, so a
   notice in the repo/site is the only channel available.

## 7. Secret found in git history

See **§2 steps 7–9**. The order that matters: **revoke → then rewrite**, never
the reverse.

---

## Useful commands

```bash
python3 tools/security_audit.py            # local scan, redacted output
git log --all --oneline -20                # recent history on all refs
git log --diff-filter=A --name-only --all | sort -u | grep -i key   # files ever added
gh run list --limit 20                     # recent workflow runs
gh api /repos/:owner/:repo/actions/permissions   # actions settings
```

## Contacts

* GitHub Support — <https://support.github.com>
* ElevenLabs Support — <https://help.elevenlabs.io>
* GitHub security advisories — repo → Security → Advisories
