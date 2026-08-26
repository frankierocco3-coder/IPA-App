# ChatGPT prompt — the 18 missing articulation diagrams

## How to use this

1. Start a **new ChatGPT chat** and **attach one of your existing diagrams** as
   a reference. `img/articulation/015-vowel-long-i.jpg` is a good one: it shows
   the head, the tongue, a coral action mark, the larynx marks and the lip inset
   all at once. A reference image gets you far closer than words alone.
2. Paste the STYLE BLOCK below as your first message.
3. Then paste ONE sound prompt per message. One image at a time, same chat, so
   it keeps the style.
4. Save each result under the filename given. Send them to me and wiring is one
   line each.

**Two things to watch.** Image models often mangle IPA symbols in the header —
check every header against the symbol in the prompt, and regenerate or ask for a
correction if it is wrong. And style drifts over a long chat: if image 12 stops
matching, re-attach the reference and remind it.

---

## STYLE BLOCK — paste this first

```
You are generating an articulation diagram for a speech-training app. Match the
attached reference image EXACTLY in style. Every new image must look like it came
from the same set.

STYLE (identical every time):
- Portrait, 4:5 aspect ratio.
- A solid near-black header bar across the very top, about one eighth of the
  height. Centred in it, in white, the IPA symbol between forward slashes.
- Below the header: a warm cream background on the right, and a mid-slate
  blue-grey head shown in profile FACING RIGHT, filling the left side. Forehead
  top left, nose pointing right, lips at the right edge of the face. A short
  curved line for the eyebrow and one for the nostril. No eye, no ear, no hair.
- The airway is cut out of the head: a cream inner lining, a soft grey band for
  the palate and pharynx wall, and the TONGUE as a large salmon-pink shape with
  a darker rose outline. The lower jaw, teeth and lips are drawn in the same
  cream and white.
- Flat vector fills with thin charcoal outlines, a light paper grain, no
  gradients, no shadows, no 3D shading.
- ONE coral-red mark shows the action of this sound: an arrow, a stroke along a
  surface, or a small burst at the point of contact. Coral red appears NOWHERE
  else in the image.
- For a voiced sound only, two or three small dark curved marks at the larynx,
  low in the throat, showing vocal-fold vibration. Omit these entirely for a
  voiceless sound.
- Top right: a circle inset showing the LIPS FACE ON for this sound, drawn on a
  pale peach ground, connected to the lips on the profile by a thin leader line
  with a small dot at each end.
- NO text anywhere except the IPA symbol in the header bar. No labels, no
  arrows with words, no captions, no watermark.
```

---

## The 18 prompts

### 048-vowel-epsilon-long.png — /ɛː/ contemporary SQUARE

```
Draw the articulation diagram for the sound /ɛː/, the contemporary SQUARE
(as in: square, fair, there).

A long steady open-mid front vowel. Tongue front raised to a middle height, jaw moderately open, lips neutral and slightly spread. The coral mark is a short straight double-headed arrow held at the tongue front, showing the position is HELD and does not move. Voiced, so show the larynx marks. Critically: this must NOT look like a glide. No curved travelling arrow.

The header bar must read exactly:  /ɛː/

IMPORTANT: this must look clearly DIFFERENT from the /eə/ drawing, which shows a glide.
Keep every other style rule identical to the reference image.
```

### 049-vowel-happy.png — /i/ happY vowel

```
Draw the articulation diagram for the sound /i/, the happY vowel
(as in: happy, city, duty).

A short close front vowel. Tongue front high toward the hard palate but not touching, jaw nearly closed, lips slightly spread. Same shape as a long FLEECE vowel but a touch less extreme and clearly short. Coral mark: a small upward arrow at the front of the tongue. Voiced, show larynx marks.

The header bar must read exactly:  /i/

IMPORTANT: this must look clearly DIFFERENT from the /iː/ drawing, which is more extreme and long.
Keep every other style rule identical to the reference image.
```

### 050-consonant-glottal-stop.png — /ʔ/ glottal stop

```
Draw the articulation diagram for the sound /ʔ/, the glottal stop
(as in: better, water, got).

A glottal stop. The mouth is completely relaxed and does nothing: tongue resting low and flat, jaw and lips neutral and slightly parted. ALL the action is at the larynx, low in the throat, where the vocal folds press shut and release. Draw the folds as two small shapes meeting. The coral mark is a small burst at that closure. Voiceless, so NO vibration marks.

The header bar must read exactly:  /ʔ/

IMPORTANT: this must look clearly DIFFERENT from the /t/ drawing, where the tongue tip touches the ridge.
Keep every other style rule identical to the reference image.
```

### 051-vowel-script-a-american.png — /ɑ/ American LOT and PALM

```
Draw the articulation diagram for the sound /ɑ/, the American LOT and PALM
(as in: lot, father, stop).

An open back unrounded vowel. Jaw dropped wide, tongue low and pulled back, lips clearly UNROUNDED and relaxed, held open in a neutral oval. Coral mark: a downward arrow at the jaw showing the openness. Voiced, show larynx marks. The lip inset must make the absence of rounding obvious.

The header bar must read exactly:  /ɑ/

IMPORTANT: this must look clearly DIFFERENT from the rounded THOUGHT vowel.
Keep every other style rule identical to the reference image.
```

### 052-diphthong-o-upsilon.png — /oʊ/ American GOAT

```
Draw the articulation diagram for the sound /oʊ/, the American GOAT
(as in: go, show, soap).

A diphthong. Starts at a mid back ROUNDED vowel and glides toward a close back rounded one. The lips are ALREADY ROUNDED at the start and tighten further. Coral mark: one curved arrow travelling from the mid-back tongue position up and back. Voiced, show larynx marks. The lip inset shows rounded lips tightening.

The header bar must read exactly:  /oʊ/

IMPORTANT: this must look clearly DIFFERENT from the /əʊ/ drawing, which starts unrounded at schwa.
Keep every other style rule identical to the reference image.
```

### 053-vowel-rhotic-nurse.png — /ɝ/ American NURSE

```
Draw the articulation diagram for the sound /ɝ/, the American NURSE
(as in: nurse, word, learn).

An r-coloured mid central vowel, stressed and long. The body of the tongue BUNCHES UP thickly in the middle of the mouth, or the tip curls back toward the palate. That bunching is the whole point: draw the tongue visibly thickened and humped, not flat. Lips slightly rounded. Coral mark: a curved arrow showing the tongue body bunching upward and back. Voiced, show larynx marks.

The header bar must read exactly:  /ɝ/

IMPORTANT: this must look clearly DIFFERENT from the /ɜː/ drawing, which has a flat unbunched tongue.
Keep every other style rule identical to the reference image.
```

### 054-vowel-rhotic-letter.png — /ɚ/ American lettER

```
Draw the articulation diagram for the sound /ɚ/, the American lettER
(as in: teacher, father, doctor).

The same r-coloured tongue bunching as the stressed NURSE vowel, but weaker, shorter and unstressed. Tongue humped in the middle of the mouth, jaw relaxed, lips neutral. Coral mark: a smaller, softer curved arrow at the tongue body. Voiced, show larynx marks.

The header bar must read exactly:  /ɚ/

IMPORTANT: this must look clearly DIFFERENT from plain schwa, which has no bunching.
Keep every other style rule identical to the reference image.
```

### 055-vowel-turned-a.png — /ɐ/ Australian STRUT

```
Draw the articulation diagram for the sound /ɐ/, the Australian STRUT
(as in: cup, but, love).

An open central vowel. Jaw dropped fairly wide, tongue low and CENTRAL, neither front nor back, lips neutral. Coral mark: a downward arrow at the centre of the tongue. Voiced, show larynx marks.

The header bar must read exactly:  /ɐ/

IMPORTANT: this must look clearly DIFFERENT from the /ʌ/ drawing, which is less open.
Keep every other style rule identical to the reference image.
```

### 056-vowel-turned-a-long.png — /ɐː/ Australian PALM and BATH

```
Draw the articulation diagram for the sound /ɐː/, the Australian PALM and BATH
(as in: palm, father, start).

A long open central vowel. Jaw wide, tongue low and clearly CENTRAL, further forward than a back vowel, lips neutral. Coral mark: a straight double-headed arrow showing the position is long and held. Voiced, show larynx marks.

The header bar must read exactly:  /ɐː/

IMPORTANT: this must look clearly DIFFERENT from the /ɑː/ drawing, where the tongue is pulled further back.
Keep every other style rule identical to the reference image.
```

### 057-vowel-open-o-aus.png — /ɔ/ Australian LOT

```
Draw the articulation diagram for the sound /ɔ/, the Australian LOT
(as in: lot, odd, wash).

A short open-mid back ROUNDED vowel, sitting HIGHER in the mouth than the British LOT vowel. Tongue back and at middle height, jaw moderately open, lips clearly rounded. Coral mark: a small upward arrow at the back of the tongue showing it sits higher. Voiced, show larynx marks.

The header bar must read exactly:  /ɔ/

IMPORTANT: this must look clearly DIFFERENT from the /ɒ/ drawing, which is lower and more open.
Keep every other style rule identical to the reference image.
```

### 058-vowel-o-long-aus.png — /oː/ Australian THOUGHT

```
Draw the articulation diagram for the sound /oː/, the Australian THOUGHT
(as in: thought, law, north).

A long close-mid back rounded vowel, noticeably HIGHER and more tightly rounded than the British THOUGHT vowel. Tongue back and high, jaw fairly closed, lips in a small tight circle. Coral mark: an upward arrow at the back of the tongue. Voiced, show larynx marks. The lip inset must show a small tight round opening.

The header bar must read exactly:  /oː/

IMPORTANT: this must look clearly DIFFERENT from the /ɔː/ drawing, which is lower with a wider lip opening.
Keep every other style rule identical to the reference image.
```

### 059-vowel-e-long-aus.png — /eː/ Australian SQUARE

```
Draw the articulation diagram for the sound /eː/, the Australian SQUARE
(as in: square, fair, there).

A long mid front vowel held as a STEADY monophthong. Tongue front at middle height, jaw moderately open, lips neutral. Coral mark: a straight double-headed arrow showing the position is held. No travelling curve, no glide of any kind.

The header bar must read exactly:  /eː/

IMPORTANT: this must look clearly DIFFERENT from the /eə/ drawing, which glides.
Keep every other style rule identical to the reference image.
```

### 060-diphthong-ash-open-o.png — /æɔ/ Australian MOUTH

```
Draw the articulation diagram for the sound /æɔ/, the Australian MOUTH
(as in: mouth, now, out).

A diphthong starting at a near-open FRONT vowel and gliding to a rounded back one. It begins with the jaw wide and the tongue FORWARD, in the TRAP position, then the tongue retracts and the lips round. Coral mark: one long curved arrow travelling from front-low to back-high. Voiced, show larynx marks. The lip inset shows spread lips rounding.

The header bar must read exactly:  /æɔ/

IMPORTANT: this must look clearly DIFFERENT from the /aʊ/ drawing, which starts from a central position.
Keep every other style rule identical to the reference image.
```

### 061-diphthong-ash-small-cap-i.png — /æɪ/ Australian FACE

```
Draw the articulation diagram for the sound /æɪ/, the Australian FACE
(as in: face, day, rain).

A diphthong starting at a near-open FRONT vowel and gliding toward a close front one. The starting jaw position is much WIDER OPEN than a mid front start: begin in the TRAP position, then the tongue rises and fronts. Coral mark: one curved arrow travelling upward from low-front to high-front. Voiced, show larynx marks.

The header bar must read exactly:  /æɪ/

IMPORTANT: this must look clearly DIFFERENT from the /eɪ/ drawing, which starts from a mid position with a narrower jaw.
Keep every other style rule identical to the reference image.
```

### 062-diphthong-script-a-e.png — /ɑe/ Australian PRICE

```
Draw the articulation diagram for the sound /ɑe/, the Australian PRICE
(as in: price, high, try).

A diphthong with a wide journey across the mouth. Starts open and BACK with the jaw dropped, then travels forward and up to a mid front vowel. Coral mark: one long curved arrow sweeping from back-low to front-mid, clearly the widest travel of any of these diagrams. Voiced, show larynx marks.

The header bar must read exactly:  /ɑe/

IMPORTANT: this must look clearly DIFFERENT from the /aɪ/ drawing, which starts more centrally.
Keep every other style rule identical to the reference image.
```

### 063-diphthong-o-small-cap-i.png — /oɪ/ Australian CHOICE

```
Draw the articulation diagram for the sound /oɪ/, the Australian CHOICE
(as in: choice, boy, noise).

A diphthong starting at a close-mid back ROUNDED vowel, HIGHER than the British CHOICE vowel, gliding to a close front one. Begin with the tongue back and fairly high, lips rounded, then the tongue moves forward and up as the lips spread. Coral mark: one curved arrow from back-high to front-high. Voiced, show larynx marks.

The header bar must read exactly:  /oɪ/

IMPORTANT: this must look clearly DIFFERENT from the /ɔɪ/ drawing, which starts lower and more open.
Keep every other style rule identical to the reference image.
```

### 064-diphthong-schwa-barred-u.png — /əʉ/ Australian GOAT

```
Draw the articulation diagram for the sound /əʉ/, the Australian GOAT
(as in: goat, show, no).

A diphthong starting at a central schwa and gliding to a FRONTED close rounded vowel. The ending tongue position is in the MIDDLE of the mouth, not at the back, while the lips round. Coral mark: one curved arrow from centre up to centre-high, staying away from the back wall. Voiced, show larynx marks. The lip inset shows the lips rounding.

The header bar must read exactly:  /əʉ/

IMPORTANT: this must look clearly DIFFERENT from the /əʊ/ drawing, which ends at the back of the mouth.
Keep every other style rule identical to the reference image.
```

### 065-vowel-barred-u.png — /ʉː/ Australian GOOSE

```
Draw the articulation diagram for the sound /ʉː/, the Australian GOOSE
(as in: goose, two, blue).

A long close CENTRAL rounded vowel. The lips are rounded but the tongue is much further FORWARD than for a back GOOSE vowel: the tongue body is high and central, under the middle of the palate. Coral mark: an upward arrow at the centre of the tongue. Voiced, show larynx marks. The lip inset shows rounded lips.

The header bar must read exactly:  /ʉː/

IMPORTANT: this must look clearly DIFFERENT from the /uː/ drawing, where the tongue is high at the BACK.
Keep every other style rule identical to the reference image.
```

