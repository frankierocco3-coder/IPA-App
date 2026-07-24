#!/bin/bash
# Play the words where an accent's identity actually lives, so you can
# check the audio against the IPA the app teaches.
ACCENT=${1:-aus}; VOICE=${2:-m}
cd "$(dirname "$0")/.."
case $ACCENT in
  aus) WORDS="day face high price now mouth go home two goose cup car nurse dance" ;;
  rp)  WORDS="bath dance car start nurse here four goat go price now" ;;
  nam) WORDS="car start word nurse teacher father bath dance lot go" ;;
esac
echo "Auditing $ACCENT/$VOICE — listen against the IPA below:"
for w in $WORDS; do
  f="audio/$ACCENT/$VOICE/$w.mp3"
  [ -f "$f" ] && { printf '  %-8s ' "$w"; afplay "$f" 2>/dev/null; }
done
