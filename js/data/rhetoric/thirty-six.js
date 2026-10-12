// The Thirty-Six Stratagems — 三十六計.
//
// Owner decision 2026-10-12. A fifth reference shelf in the Rhetoric
// Library, and the second list of tactics rather than errors.
//
// WHY IT IS IN RHETORIC, which was an owner call and not an obvious one.
// These are military stratagems: none of them is an argument and most are
// not even verbal. Claude argued they sat closer to Playable Actions, and
// the owner put them here. Recorded because somebody will ask.
//
// THE NAME COLLISION, AND WHAT WAS DONE ABOUT IT. Schopenhauer's shelf
// shipped 2026-10-10 as "The 38 Stratagems". Two shelves differing by one
// digit, covering unrelated subjects, in one Library, is the bug this repo
// has already fixed twice (Scene Work against Script Analysis, three files
// called course.js). The Chinese list cannot be called anything else, so
// the Schopenhauer shelf became THE ART OF CONTROVERSY — the book's actual
// title and the better name anyway. Its ST- ids and its file name did not
// change, because ids are not renamed here.
//
// SOURCE AND LICENCE. The text is Ming or late-Ming, anonymous, and long
// out of copyright. The English names below are the standard renderings
// that appear across every edition and are not any one translator's
// property. Everything else on this shelf — every definition, every
// example, every question — is written for this app. In particular NOTHING
// is taken from the Wikipedia article used to verify the list, whose glosses
// are CC-licensed, nor from the video that prompted this.
//
// ── Entry shape ───────────────────────────────────────────────
//   id       'TS-<3 digits>'. STABLE FOREVER.
//   n        1 to 36, the number the stratagem is cited by.
//   term     the standard English name.
//   hanzi    the Chinese, which is the actual name of the thing.
//   chapter  key into CHAPTERS below.
//   what     the move, in one plain sentence.
//   overlook what it makes the person on the receiving end miss.
//   ask      the question that catches it.
//   examples TWO, and this shelf is the only one that carries two. The
//            first is the historical case, the second is where you meet it
//            now. The pairing is the point: the history makes it memorable
//            and the modern case makes it usable. Every other shelf carries
//            exactly one example and is pinned to it; this one has its own
//            pin at two.
//
// IT GROUPS, unlike the Schopenhauer shelf. That one is flat because he
// gives no grouping and inventing families for him would be inventing
// scholarship. This text supplies its own six chapters of six, so the
// shelf uses them.
//
// ON THE HISTORY. Several of the traditional stories are from romance
// rather than record — the empty fort is from a fourteenth-century novel,
// not a chronicle. Those are hedged in the text itself ("is said to have")
// rather than presented as attested. Do not tidy the hedges away.
//
// THE ETHICAL FRAME IS NOT OPTIONAL. This is a catalogue of deception in a
// course that opens by asking where persuading somebody ends and working
// on them begins. The shelf is written from the receiving end — what it
// hides from YOU, the question that catches it — for that reason. It is
// not a manual.
//
// NOT APPROVED. Written by Claude, awaiting a rhetoric reviewer.

export const CHAPTERS = {
  winning: { n: 1, label: 'Winning Stratagems', hanzi: '勝戰計',
    lead: 'Six for when you hold the advantage. The common thread is that the other side is never told what is actually happening.' },
  enemy: { n: 2, label: 'Enemy Dealing Stratagems', hanzi: '敵戰計',
    lead: 'Six for a contest between near equals, where the work is done on what the other side believes rather than on what they have.' },
  offensive: { n: 3, label: 'Offensive Stratagems', hanzi: '攻戰計',
    lead: 'Six for taking the initiative. Each one makes the other side move first, and then uses the movement.' },
  chaos: { n: 4, label: 'Mixed Warfare Stratagems', hanzi: '混戰計',
    lead: 'Six for disorder, either found or manufactured. Confusion is treated here as terrain, and terrain can be chosen.' },
  combined: { n: 5, label: 'Combined Stratagems', hanzi: '並戰計',
    lead: 'Six for working on somebody you are nominally beside rather than against. These are the ones you are most likely to meet at work.' },
  defeat: { n: 6, label: 'Defeat Stratagems', hanzi: '敗戰計',
    lead: 'Six for when you are losing. The last of them is the most quoted line in the collection, and it is an instruction to leave.' },
};

export const THIRTY_SIX = [

  // ── 1 · Winning Stratagems ───────────────────────────────────
  { id: 'TS-001', n: 1, term: 'Deceive the heavens to cross the sea', hanzi: '瞞天過海', chapter: 'winning',
    what: 'The preparation is done so openly, and so often, that it stops being noticed, and the real move is made inside the thing everybody has learned to ignore.',
    overlook: 'That familiarity is doing the hiding. You stopped checking because nothing ever came of checking before.',
    ask: 'What here have I stopped looking at because I see it every day?',
    examples: [
      { text: 'In 1943 a body carrying forged invasion plans was floated to the Spanish coast so that Germany would reinforce Greece. The landings came in Sicily.' },
      { text: '“He walks through twice a day with a folder under his arm. Nobody has ever once asked him where he is going.”' },
    ] },

  { id: 'TS-002', n: 2, term: 'Besiege Wèi to rescue Zhào', hanzi: '圍魏救趙', chapter: 'winning',
    what: 'Rather than meet the strong point, pressure is put on something the other side cannot afford to lose, and they give up the strong point themselves.',
    overlook: 'That you were moved rather than beaten. You left the ground you were holding, and you left it under your own power.',
    ask: 'Am I defending this because it matters, or because they made it urgent?',
    examples: [
      { text: 'Sun Bin is said to have relieved the siege of Zhao by marching on the Wei capital instead. The army besieging Zhao turned for home.' },
      { text: '“I am not going to win the argument about the budget. I am going to ask his director why the budget needs defending.”' },
    ] },

  { id: 'TS-003', n: 3, term: 'Kill with a borrowed knife', hanzi: '借刀殺人', chapter: 'winning',
    what: 'The damage is done by somebody else, moved into position to do it, so the one who wanted it never appears to have acted.',
    overlook: 'Who wanted this. The person holding the knife has their own reasons, which is exactly why they were chosen.',
    ask: 'Who benefits from this fight without being in it?',
    examples: [
      { text: 'Hannibal spent seventeen years in Italy working to turn Rome’s own allies against her, winning with Roman strength rather than against it.' },
      { text: '“I would not raise it myself. But Dillon has been hunting for a reason to go at that budget, and he only needs to hear the number.”' },
    ] },

  { id: 'TS-004', n: 4, term: 'Wait at leisure while the enemy labours', hanzi: '以逸待勞', chapter: 'winning',
    what: 'The time and the ground are chosen by one side, so the other arrives tired, late, and on terms it did not set.',
    overlook: 'How much of your position was spent getting here. Arriving is not the same as being ready.',
    ask: 'Who chose when and where this happens?',
    examples: [
      { text: 'Fabius refused Hannibal the pitched battle he needed, shadowed him instead, and let a Carthaginian army wear itself out in country that could not feed it.' },
      { text: '“Let them present first. They have flown overnight and they have not seen the new figures.”' },
    ] },

  { id: 'TS-005', n: 5, term: 'Loot a burning house', hanzi: '趁火打劫', chapter: 'winning',
    what: 'The move is made while the other side is already dealing with something else, because a crisis uses up exactly the attention that would have been watching you.',
    overlook: 'That the timing is the tactic. The proposal would not survive a normal week, which is why it is not being made in one.',
    ask: 'Would this be happening now if we were not in the middle of something?',
    examples: [
      { text: 'Japan invaded Manchuria in 1931, while China was consumed by civil war.' },
      { text: '“Put the restructure through this week. Everyone is still dealing with the outage.”' },
    ] },

  { id: 'TS-006', n: 6, term: 'Make a sound in the east, then strike in the west', hanzi: '聲東擊西', chapter: 'winning',
    what: 'Attention is drawn deliberately to one place so that the real move lands somewhere nobody is watching.',
    overlook: 'That the loud thing was chosen for being loud. A feint has to look like the main event or it is not a feint.',
    ask: 'What went through while I was busy with that?',
    examples: [
      { text: 'At Lodi in 1796 Napoleon mounted a visible crossing of the Po to hold the Austrians in place while the bulk of his force went upriver and took a bridge unopposed.' },
      { text: '“Spend the first twenty minutes on the thing they expect to fight about. The clause we actually want goes through while everyone is tired.”' },
    ] },

  // ── 2 · Enemy Dealing Stratagems ─────────────────────────────
  { id: 'TS-007', n: 7, term: 'Create something from nothing', hanzi: '無中生有', chapter: 'enemy',
    what: 'Something that does not exist is shown convincingly enough to be acted on, and the acting on it is the whole point.',
    overlook: 'That you never checked. The claim was cheap to make and expensive to verify, which is the ratio it runs on.',
    ask: 'What would it cost them to say this if it were not true?',
    examples: [
      { text: 'Before the Normandy landings, inflatable tanks and dummy airfields were built in the south of England to hold a German army in the wrong place.' },
      { text: '“We have three other buyers interested.”' },
    ] },

  { id: 'TS-008', n: 8, term: 'Openly repair the gallery roads, but sneak through Chencang', hanzi: '明修棧道，暗渡陳倉', chapter: 'enemy',
    what: 'A slow and obvious preparation is begun in full view, so the other side relaxes on the timetable it implies, while the real approach is taken by another road.',
    overlook: 'That the visible work is a clock rather than a plan. You are watching a schedule somebody wants you to believe.',
    ask: 'Does the slow thing in front of me actually have to finish for them to get what they want?',
    examples: [
      { text: 'Liu Bang set men visibly to rebuilding the burned gallery roads, a job of years, and moved on Guanzhong through Chencang while his rival read the repairs as a timetable.' },
      { text: '“They have put the consultation out to six months. The contracts are already drafted.”' },
    ] },

  { id: 'TS-009', n: 9, term: 'Watch the fires burning across the river', hanzi: '隔岸觀火', chapter: 'enemy',
    what: 'While two others damage each other, nothing is done at all, and the move comes only once both are spent.',
    overlook: 'That somebody is not fighting. The question is never only who wins, it is who was never in it.',
    ask: 'Who gains if both of us lose?',
    examples: [
      { text: 'Byzantium and Persia fought each other to exhaustion for twenty-six years. The conquests that followed took territory from both.' },
      { text: '“Say nothing in the meeting. They will do this to each other, and whoever is left standing will need an ally.”' },
    ] },

  { id: 'TS-010', n: 10, term: 'Hide a knife behind a smile', hanzi: '笑裏藏刀', chapter: 'enemy',
    what: 'Trust is built deliberately, and the move is made from inside it.',
    overlook: 'That warmth is evidence of nothing. It is the cheapest thing to produce and the hardest to doubt while it is happening.',
    ask: 'Would this person be behaving any differently if they meant me harm?',
    examples: [
      { text: 'Brutus was inside Caesar’s circle by invitation, and led the conspiracy that killed him.' },
      { text: '“He asked after my mother, remembered the dog’s name, and put his signature on the complaint that afternoon.”' },
    ] },

  { id: 'TS-011', n: 11, term: 'Sacrifice the plum tree to preserve the peach tree', hanzi: '李代桃僵', chapter: 'enemy',
    what: 'Something real is given up, and given up knowingly, because protecting it would cost the larger thing.',
    overlook: 'That the loss was chosen. It looks like a defeat, and everybody is counting it as one except the person who arranged it.',
    ask: 'Is this a loss they suffered, or one they could afford?',
    examples: [
      { text: 'Allied convoys sailed into dangers that were already known, rather than reveal that German naval codes had been broken.' },
      { text: '“We take the hit on the regional office. If we defend it they will come looking for why it matters.”' },
    ] },

  { id: 'TS-012', n: 12, term: 'Take the opportunity to pilfer a goat', hanzi: '順手牽羊', chapter: 'enemy',
    what: 'No large plan is involved. A small advantage is taken because it happens to be there and nobody is holding it.',
    overlook: 'That nothing was planned, so there was nothing to see coming. Small things go missing because watching them costs more than they are worth.',
    ask: 'What is lying around here that nobody is actually responsible for?',
    examples: [
      { text: 'At Salamanca, Wellington had declined battle for weeks. The moment Marmont let a wing stretch too far, he attacked within the hour.' },
      { text: '“Nobody has claimed that budget line in two years. I have put it under us.”' },
    ] },

  // ── 3 · Offensive Stratagems ─────────────────────────────────
  { id: 'TS-013', n: 13, term: 'Stomp the grass to scare the snake', hanzi: '打草驚蛇', chapter: 'offensive',
    what: 'Something deliberately disturbing is done, not to achieve anything directly, but to make the other side move and show where they are.',
    overlook: 'That the provocation was a question. You were not being attacked, you were being measured.',
    ask: 'Did that do them any good, or did it only make me react?',
    examples: [
      { text: 'Dummy paratroopers were dropped over Normandy and later over Vietnam. Troops who fired on them gave away their own positions.' },
      { text: '“Mention the audit, and watch who starts forwarding emails.”' },
    ] },

  { id: 'TS-014', n: 14, term: 'Borrow a corpse to resurrect the soul', hanzi: '借屍還魂', chapter: 'offensive',
    what: 'Something discarded is taken up again and given a new use, because an old thing in a new setting is not recognised as old.',
    overlook: 'That you have seen this before and already decided about it. The new name is doing the work the argument could not.',
    ask: 'Have I refused this before under another name?',
    examples: [
      { text: 'Plate armour fell out of use with firearms and returned as the ballistic vest once the materials caught up with the idea.' },
      { text: '“It is the proposal we killed in spring, with a different title and a different sponsor.”' },
    ] },

  { id: 'TS-015', n: 15, term: 'Lure the tiger down the mountain', hanzi: '調虎離山', chapter: 'offensive',
    what: 'A strong position is not attacked. The other side is given a reason to leave it, and is fought once they have.',
    overlook: 'That your advantage was positional and you walked out of it. The retreat you were chasing was the invitation.',
    ask: 'Am I better off here than where they are asking me to go?',
    examples: [
      { text: 'At Hastings the Normans broke and ran. The shield wall followed them down the hill and stopped being a shield wall.' },
      { text: '“Do not take it up in the committee, where she has the votes. Raise it in the corridor.”' },
    ] },

  { id: 'TS-016', n: 16, term: 'In order to capture, one must let loose', hanzi: '欲擒故縱', chapter: 'offensive',
    what: 'A cornered opponent fights hardest, so a way out is left open, and they are taken while using it.',
    overlook: 'That the opening was made for you. An escape route nobody has closed is not an escape route.',
    ask: 'Why is this way out still available?',
    examples: [
      { text: 'At Mohi in 1241 the Mongols left a gap in the encirclement. The Hungarians broke for it and were cut down in the open.' },
      { text: '“Give him the resignation option. He will take it, and then there is nothing left to contest.”' },
    ] },

  { id: 'TS-017', n: 17, term: 'Tossing out a brick to lure a jade gem', hanzi: '拋磚引玉', chapter: 'offensive',
    what: 'Something small and deliberately imperfect is offered, so that the other side supplies the better thing while correcting it.',
    overlook: 'That the first offer was meant to be improved. Your correction was the deliverable.',
    ask: 'Did they want my answer, or my work?',
    examples: [
      { text: 'The story goes that a minor poet wrote two lines on a temple wall where a famous one would see them, and was answered with the other two.' },
      { text: '“Send them the rough version. They will not be able to resist fixing it, and the fix is the thing we needed.”' },
    ] },

  { id: 'TS-018', n: 18, term: 'Defeat the enemy by capturing their chief', hanzi: '擒賊擒王', chapter: 'offensive',
    what: 'The body of the thing is ignored and everything is spent on the one part that holds it together.',
    overlook: 'How much of the structure was one person. Numbers look like strength right up until the thing they were organised around is gone.',
    ask: 'If one person changed their mind, would the rest of this hold?',
    examples: [
      { text: 'At Cajamarca in 1532 Pizarro ignored an army of thousands outside the walls and seized Atahualpa. The army dispersed.' },
      { text: '“There is no point persuading the committee. There is one person on it the rest are waiting to hear.”' },
    ] },

  // ── 4 · Mixed Warfare Stratagems ─────────────────────────────
  { id: 'TS-019', n: 19, term: 'Remove the firewood from under the pot', hanzi: '釜底抽薪', chapter: 'chaos',
    what: 'The visible conflict is left alone, and whatever has been feeding it is taken away instead.',
    overlook: 'What the thing runs on. You are watching the flame, and the fuel is somewhere else entirely.',
    ask: 'What keeps this going, and is it reachable?',
    examples: [
      { text: 'Blockade has decided more wars than battle. An army that cannot be supplied stops being an army without ever being fought.' },
      { text: '“Do not argue with the campaign. Find out who is paying for the printing.”' },
    ] },

  { id: 'TS-020', n: 20, term: 'Disturb the water and catch a fish', hanzi: '混水摸魚', chapter: 'chaos',
    what: 'Confusion is deepened on purpose, because in confusion things can be taken that could never be taken in good order.',
    overlook: 'That the mess is not an accident. Somebody is considerably more comfortable in it than you are.',
    ask: 'Who is finding this easier to work in than I am?',
    examples: [
      { text: 'In the Ardennes in 1944 a handful of English-speaking Germans in American uniforms produced a suspicion that cost the Allies far more than the men did.' },
      { text: '“Raise four objections at once. In the noise nobody will notice that the third one is the only one we care about.”' },
    ] },

  { id: 'TS-021', n: 21, term: 'Slough off the cicada’s golden shell', hanzi: '金蟬脫殼', chapter: 'chaos',
    what: 'The appearance of still being there is left behind, while the thing itself withdraws.',
    overlook: 'That you are negotiating with a shell. The form is perfectly intact and there is nothing inside it.',
    ask: 'Is anybody still actually behind this?',
    examples: [
      { text: 'Campfires left burning and tents left standing have covered more than one night march.' },
      { text: '“His name is still on the project. He has not opened the file since August.”' },
    ] },

  { id: 'TS-022', n: 22, term: 'Shut the door to catch the thief', hanzi: '關門捉賊', chapter: 'chaos',
    what: 'Before anything is struck, the way out is closed, because a small enemy who escapes becomes a problem again later.',
    overlook: 'That the delay was preparation. Nothing happened for a week because the exits were being closed.',
    ask: 'Why has nobody challenged me on this yet?',
    examples: [
      { text: 'Encirclement is the whole art of the battle of annihilation, from Cannae onward: the killing is done after the ring is closed.' },
      { text: '“Do not raise it until we have the records. If we ask him now he will simply leave.”' },
    ] },

  { id: 'TS-023', n: 23, term: 'Befriend a distant state and strike a neighbouring one', hanzi: '遠交近攻', chapter: 'chaos',
    what: 'Terms are made with whatever is far away and could not be held anyway, and everything is spent on what is next door.',
    overlook: 'That the friendship is geographic. You are liked because you are not in the way.',
    ask: 'Am I an ally, or simply out of reach?',
    examples: [
      { text: 'It is the policy that built Qin: peace with the far states, war with the near ones, until there were no near ones left.' },
      { text: '“Be generous with the New York office. They are not competing with us for anything.”' },
    ] },

  { id: 'TS-024', n: 24, term: 'Obtain safe passage to conquer the State of Guo', hanzi: '假途伐虢', chapter: 'chaos',
    what: 'Passage is requested for a limited purpose, and the thing that granted it is taken on the way through.',
    overlook: 'That access given for a reason outlives the reason. Nobody takes it back when the job is done.',
    ask: 'What else does this let them do, and for how long?',
    examples: [
      { text: 'Jin borrowed a road through Yu in order to attack Guo, and took Yu on the way back.' },
      { text: '“We only need read access to the one folder.”' },
    ] },

  // ── 5 · Combined Stratagems ──────────────────────────────────
  { id: 'TS-025', n: 25, term: 'Replace the beams with rotten timbers', hanzi: '偷梁換柱', chapter: 'combined',
    what: 'The outward shape is kept exactly as it was, and whatever held it up is swapped for something that will not.',
    overlook: 'That nothing visible changed. You are checking the outside, and the outside is the part they kept.',
    ask: 'Is this still the same thing, or only the same shape?',
    examples: [
      { text: 'A puppet government keeps every office and every title of the state it replaced, which is precisely what makes it useful.' },
      { text: '“Same name, same committee, same terms of reference. Everybody who knew anything has been moved.”' },
    ] },

  { id: 'TS-026', n: 26, term: 'Point at the mulberry tree while cursing the locust tree', hanzi: '指桑罵槐', chapter: 'combined',
    what: 'One person is criticised in front of everybody so that somebody else, who cannot be criticised directly, hears it.',
    overlook: 'Who the message was for. The person being addressed is not the person being told.',
    ask: 'Is this aimed at the person it is pointed at?',
    examples: [
      { text: 'Commanders have made examples of junior men within sight of senior ones for as long as there have been armies.' },
      { text: '“She spent four minutes on a typo in the junior analyst’s deck. The partner who signed it off was in the room.”' },
    ] },

  { id: 'TS-027', n: 27, term: 'Feign madness but keep your balance', hanzi: '假痴不癲', chapter: 'combined',
    what: 'Incapacity is performed so that nothing is expected and nothing is guarded against, while the judgment underneath stays entirely intact.',
    overlook: 'That being underestimated is a position, and that some people take it deliberately.',
    ask: 'Am I explaining this because they do not follow, or because they want it said out loud?',
    examples: [
      { text: 'Claudius survived a family that killed everybody of consequence, reportedly by being thought harmless.' },
      { text: '“He asks the same question four times until somebody explains the whole thing. He understood it the first time.”' },
    ] },

  { id: 'TS-028', n: 28, term: 'Remove the ladder when the enemy has ascended to the roof', hanzi: '上屋抽梯', chapter: 'combined',
    what: 'The other side is encouraged forward into a position they cannot withdraw from, and then the way back is taken away.',
    overlook: 'That the encouragement was the trap. Somebody helped you up there.',
    ask: 'Could I still back out of this if I wanted to?',
    examples: [
      { text: 'Burning the boats behind a landing force is the oldest version, and it has been used on one’s own troops as readily as on an enemy.' },
      { text: '“Get him to announce it publicly. After that he cannot change his mind without losing more than the argument.”' },
    ] },

  { id: 'TS-029', n: 29, term: 'Decorate the tree with false blossoms', hanzi: '樹上開花', chapter: 'combined',
    what: 'A small force is dressed to look like a large one, because what the other side believes about your strength does more work than the strength does.',
    overlook: 'That you counted the display rather than the thing. Scale is the easiest property in the world to counterfeit.',
    ask: 'How much of this is actually there?',
    examples: [
      { text: 'Extra banners and extra campfires have swollen armies on paper since antiquity. The dummy divisions of 1944 are the same idea with better materials.' },
      { text: '“Three of the logos on the website are clients. The other nine are people we have had coffee with.”' },
    ] },

  { id: 'TS-030', n: 30, term: 'Make the host and the guest exchange roles', hanzi: '反客為主', chapter: 'combined',
    what: 'A position of dependence is converted, step by step, into the position that decides, usually with no single moment at which it could have been contested.',
    overlook: 'That there was never a moment to object to. Every individual step was reasonable and the sum of them was not.',
    ask: 'Who is asking whom for permission now, and when did that change?',
    examples: [
      { text: 'Trading companies arrived with permission to trade and left as governments.' },
      { text: '“They came in to advise on the migration. They own the roadmap now, and we book time with them.”' },
    ] },

  // ── 6 · Defeat Stratagems ────────────────────────────────────
  { id: 'TS-031', n: 31, term: 'The beauty trap', hanzi: '美人計', chapter: 'defeat',
    what: 'Something the other side wants is supplied, so that wanting it does the work an argument could not.',
    overlook: 'That you were given something at the exact moment you were about to be difficult.',
    ask: 'Did this arrive on its own, or did it arrive now?',
    examples: [
      { text: 'The traditional form is a gift of beautiful women to a rival court, to divide it and to occupy the man at the head of it.' },
      { text: '“They did not argue with his objection. They offered him the keynote.”' },
    ] },

  { id: 'TS-032', n: 32, term: 'The empty fort', hanzi: '空城計', chapter: 'defeat',
    what: 'Weakness is shown so openly that it reads as a trap, and the stronger side withdraws rather than walk into it.',
    overlook: 'That nerve is not evidence either. You are reading their composure, and composure is the one thing anybody can fake completely.',
    ask: 'Am I backing off what I found, or off how calm they were about it?',
    examples: [
      { text: 'Zhuge Liang is said to have thrown open the gates of an undefended city and sat playing music on the wall until the advancing army turned back. The story is from a novel rather than a chronicle.' },
      { text: '“Open the books. Take whatever you want.” Nobody with something to hide is that relaxed, so the auditors went elsewhere.' },
    ] },

  { id: 'TS-033', n: 33, term: 'Let the enemy’s own spy sow discord', hanzi: '反間計', chapter: 'defeat',
    what: 'The channel the other side trusts is fed what you want them to believe, so that the deceiving is done for you by somebody they rely on.',
    overlook: 'That the source is why you believed it. You checked who said it and never what they had been told.',
    ask: 'Where did the person who told me this get it?',
    examples: [
      { text: 'Double agents carried most of the deception before Normandy. The reports Germany trusted most were written to be trusted.' },
      { text: '“Tell it to Hughes. He will have it in front of them by lunchtime, and they will believe it because it came from him.”' },
    ] },

  { id: 'TS-034', n: 34, term: 'Inflict injury on oneself to win the enemy’s trust', hanzi: '苦肉計', chapter: 'defeat',
    what: 'Real damage is taken, visibly, because nobody suspects somebody who has already paid a price.',
    overlook: 'That a confession buys cover. One admitted fault makes everything standing beside it look as though it has been examined.',
    ask: 'What did that admission protect?',
    examples: [
      { text: 'Defectors have made themselves credible by arriving with wounds their own side gave them on purpose.' },
      { text: '“He opened by admitting the forecast was his mistake. Nobody questioned a single figure after that.”' },
    ] },

  { id: 'TS-035', n: 35, term: 'Chain stratagems', hanzi: '連環計', chapter: 'defeat',
    what: 'No single move is expected to decide it. Several are linked, so that answering one worsens your position against the next.',
    overlook: 'That each of your answers is being used. You are not solving these one at a time, you are walking a sequence.',
    ask: 'Does dealing with this leave me better placed, or worse?',
    examples: [
      { text: 'The name is traditionally traced to ships chained together and then set alight, so that the remedy for the first problem created the second.' },
      { text: '“If we query the timeline they will say the budget forced it. If we query the budget they will point at the timeline.”' },
    ] },

  { id: 'TS-036', n: 36, term: 'If all else fails, retreat', hanzi: '走為上策', chapter: 'defeat',
    what: 'When the position cannot be held, leaving it intact is the move, because a force that withdraws can fight again and one that is destroyed cannot.',
    overlook: 'That leaving is a choice rather than a failure. The cost of staying is paid later, and usually by more people.',
    ask: 'Am I staying because I can win, or because leaving would look bad?',
    examples: [
      { text: 'It is the line the whole collection is named for: of the thirty-six, running away is best.' },
      { text: '“Withdraw the paper. We will not win this room, and we will lose the argument permanently if we force a vote.”' },
    ] },

];

export const stratagem36ById = id => THIRTY_SIX.find(s => s.id === id) ?? null;
export const stratagemsIn = chapter => THIRTY_SIX.filter(s => s.chapter === chapter);
