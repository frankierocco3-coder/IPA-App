#!/usr/bin/env bash
# Install the local git hooks. Safe to re-run.
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
git -C "$ROOT" config core.hooksPath tools/hooks
echo "Hooks installed (core.hooksPath = tools/hooks)."
echo "Pre-commit will now scan staged files for credentials."
echo "Disable with: git config --unset core.hooksPath"
