# Playable Actions — content v1

Twelve entries, six contrast pairs. **Verbatim content** — build from this, don't rewrite it.

The design: each pair shares one practice line. The same words, two actions, two
completely different scenes. That contrast *is* the lesson, and it's why twelve deep
entries beat fifty-six shallow ones.

Governing question, shown once at the top of the section:

> **What are you doing to the other person through these words?**

And the distinction, shown beneath it:

> Emotion is what you feel. Action is what you are doing to someone else. An actor
> playing sadness gives a performance about themselves. An actor playing *to shame*
> gives a performance about someone else.

---

## Pair 1 — shared line: "Nothing is going to happen to you tonight."

### To Reassure · `reassure` · To Connect

- **Objective:** Make the listener believe they are safe, or that this can be managed.
- **Likely resistance:** Fear, distrust, the sense that you don't understand how bad it is.
- **Coaching:** Do not "act calm." Calm is what it may look like from outside; it is not
  what you are doing. Put your attention on changing their expectation of danger — watch
  their face until it changes.
- **Contrast:** *To dismiss* can sound identical. Reassurance takes the fear seriously.

### To Dismiss · `dismiss` · To Change the Relationship

- **Objective:** Make the listener's concern stop counting, so you don't have to answer it.
- **Likely resistance:** They believe it matters. They may be right.
- **Coaching:** You are not angry — you are finished. The subject is closed because you
  closed it. Notice you don't need them to agree; you need them to stop.
- **Contrast:** *To reassure* engages the fear. Dismissal declines to.

---

## Pair 2 — shared line: "I did it."

### To Confess · `confess` · To Reveal

- **Objective:** Put the truth in the room and hand the listener what happens next.
- **Likely resistance:** Their disbelief, or your own fear of what follows.
- **Coaching:** Confession gives away power. If you are still managing their reaction,
  you are not confessing — you're negotiating. Say it and let it land.
- **Contrast:** *To justify* keeps the power. Confession surrenders it.

### To Justify · `justify` · To Protect

- **Objective:** Make the listener agree that what you did was reasonable.
- **Likely resistance:** Their judgment, already forming.
- **Coaching:** You are building a case, and the verdict matters to you. Watch for the
  moment they're not buying it — that's when the tactic has to change.
- **Contrast:** *To confess* accepts the consequence. Justification argues with it.

---

## Pair 3 — shared line: "Tell me what happened."

### To Confront · `confront` · To Discover

- **Objective:** Make them face the thing they are working around.
- **Likely resistance:** Evasion, deflection, changing the subject.
- **Coaching:** You want them to *look at it*, not to lose. If winning starts to matter
  more than the answer, you've stopped confronting and started attacking.
- **Contrast:** *To draw out* invites. Confrontation refuses to let them leave.

### To Draw Out · `draw-out` · To Discover

- **Objective:** Make it safe enough that they tell you on their own.
- **Likely resistance:** Shame, fear of your reaction, the habit of not saying.
- **Coaching:** Your main tool is silence. Leave the space and let them fill it. The
  temptation is to help them along — resist it.
- **Contrast:** *To confront* pushes. Drawing out waits, which is harder to play.

---

## Pair 4 — shared line: "Sit down."

### To Command · `command` · To Control

- **Objective:** Produce the action without discussion.
- **Likely resistance:** Their status, their pride, their own plan.
- **Coaching:** A command assumes compliance. The moment you argue for it, it isn't one
  any more. Expect to be obeyed and you will often sound as though you should be.
- **Contrast:** *To appeal to* asks. A command doesn't leave the option open.

### To Appeal To · `appeal-to` · To Persuade

- **Objective:** Make them *want* to do it, so the choice stays theirs.
- **Likely resistance:** Suspicion of being handled.
- **Coaching:** You need something from them and you are admitting it. Appeal costs you
  status on purpose — that cost is what makes it work.
- **Contrast:** *To command* removes the choice. Appeal depends on it.

---

## Pair 5 — shared line: "You don't want to do that."

### To Warn · `warn` · To Persuade

- **Objective:** Show them a consequence they haven't seen, so they stop for their own sake.
- **Likely resistance:** They think they've already weighed it.
- **Coaching:** A warning is on the listener's side. You are pointing at something out
  there, not at yourself. If you're the danger, you're not warning.
- **Contrast:** *To intimidate* makes you the consequence.

### To Intimidate · `intimidate` · To Control

- **Objective:** Make them believe you are the consequence, so fear does the deciding.
- **Likely resistance:** Their nerve, their status, witnesses.
- **Coaching:** Volume is the amateur's version. The stronger choice is quiet and
  unhurried — let them do the imagining. You are not describing a danger; you are one.
- **Contrast:** *To warn* points outward. Intimidation points at you.

---

## Pair 6 — shared line: "It's all right. I understand."

### To Forgive · `forgive` · To Change the Relationship

- **Objective:** Release them from the debt, and take the weight off yourself too.
- **Likely resistance:** Their guilt — which can be harder to shift than defiance.
- **Coaching:** Forgiveness is an act, not a mood. Something is actually being put down.
  If you're still holding it, you're performing generosity, which the listener will feel.
- **Contrast:** *To punish* keeps the debt open while sounding like it doesn't.

### To Punish · `punish` · To Change the Relationship

- **Objective:** Make them feel what they did, and know that you are the one deciding.
- **Likely resistance:** Their defenses, their counter-accusation.
- **Coaching:** The cruelest version is gentle. "I understand" can be a door closing.
  You are not losing your temper — you are collecting.
- **Contrast:** *To forgive* ends it. Punishment keeps the account open.

---

## Data shape

```js
{
  id: 'reassure',
  category: 'connect',          // connect | persuade | discover | protect |
                                // control | relationship | reveal
  verb: 'To Reassure',
  objective: '...',
  resistance: '...',
  coaching: '...',
  contrast: { id: 'dismiss', note: '...' },
  pairId: 'pair-1',
  practiceLine: 'Nothing is going to happen to you tonight.',
}
```

Categories with no entries yet must not appear as empty headings. Show the seven
category names only where an entry exists — six of the seven are covered here
(`connect`, `persuade`, `discover`, `protect`, `control`, `relationship`, `reveal`:
all seven are represented).

Remaining verbs from the spec's full list stay unbuilt until written to this standard.
