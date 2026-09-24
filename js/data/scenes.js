// Provided scenes — public-domain dramatic texts for the Scenes shelf
// (owner-approved, 2026-09-15; packet: docs/SCENE_PACKET_v2.md).
// RULES, binding:
//   • The `text` field is the SOURCE TEXT from the cited Project
//     Gutenberg edition, verified line-for-line on the date in
//     `verified`. Corrected-reprint policy (owner order 2026-09-17):
//     obvious MECHANICAL printing errors (typesetting/OCR artifacts,
//     misprinted speaker labels, editorial bracket marks) may be
//     corrected, and EVERY correction is recorded in that record's
//     `corrections` field as [from, to] pairs — the text must equal
//     the source with exactly those corrections applied, nothing
//     more. Period spelling, dialect, grammar and punctuation STYLE
//     are the play's voice and are never touched. Never modernize,
//     never swap editions without an owner-approved, logged change.
//   • Speechcraft's own words live ONLY outside `text` (title, notes).
//   • `rightsNote` and `source` stay in the data as the provenance of
//     record (US-scoped, matching the app's Gutenberg statements);
//     reading pages no longer display them (owner order 2026-09-17) —
//     learner-facing credit lives on Sources & Credits.
//   • `contentNote` is shown, never used to rewrite the work.
//   • `verse` is the scene's predominant form. A scene that CROSSES
//     between verse and prose carries a `form` map: each entry names
//     the first words of the speech where the new form begins. The map
//     is authored and reviewable — never derived from line length,
//     because hard-wrapped prose and lineated verse are the same shape
//     in a fixed-width file and this app teaches the difference.
//   • `unlabelled` attributes a block the source leaves unlabelled,
//     which happens where a cut opens mid-speech. It is Speechcraft's
//     attribution, not the edition's, and the tools that use it flag it
//     as ours. Nothing is added to `text`.
// Rendering may reflow hard-wrapped lines and show the source's
// _underscore_ emphasis as italics; it must never alter, omit or
// reorder the words (renderProvidedScene in main.js).

export const PROVIDED_SCENES = [
  {
    id: 'romeo-juliet-balcony',
    authorGroup: 'Shakespeare',
    title: 'The Balcony',
    play: 'Romeo and Juliet',
    author: 'William Shakespeare',
    location: 'Act II: the end of Scene 1 and the whole of Scene 2',
    verse: true,
    // Scene 2 opens on Romeo already speaking, so the source carries no
    // speaker label there. The attribution is ours, and the tools that
    // group a scene by speaker say so rather than silently claiming it.
    unlabelled: [{ from: 'But soft, what light', who: 'ROMEO' }],
    characters: ['Romeo', 'Juliet'],
    source: 'Project Gutenberg eBook #100 (The Complete Works of William Shakespeare)',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'A Romeo-and-Juliet two-hander with a short lead-in: Benvolio and Mercutio close Scene 1 searching for Romeo, and the Nurse calls from within near the end. Scene 2 is complete, to Romeo’s exit. The scene break and stage directions are the source’s own.',
    context: 'Benvolio and Mercutio are looking for their friend Romeo after the party. They tease him about love, unaware he is nearby and about to see Juliet.',
    contentNote: 'Bawdy period innuendo in the Scene 1 lead-in.',
    text: `BENVOLIO.
Come, he hath hid himself among these trees
To be consorted with the humorous night.
Blind is his love, and best befits the dark.

MERCUTIO.
If love be blind, love cannot hit the mark.
Now will he sit under a medlar tree,
And wish his mistress were that kind of fruit
As maids call medlars when they laugh alone.
O Romeo, that she were, O that she were
An open-arse and thou a poperin pear!
Romeo, good night. I’ll to my truckle-bed.
This field-bed is too cold for me to sleep.
Come, shall we go?

BENVOLIO.
Go then; for ’tis in vain
To seek him here that means not to be found.

 [_Exeunt._]

SCENE II. Capulet’s Garden.

 Enter Romeo.

ROMEO.
He jests at scars that never felt a wound.

 Juliet appears above at a window.

But soft, what light through yonder window breaks?
It is the east, and Juliet is the sun!
Arise fair sun and kill the envious moon,
Who is already sick and pale with grief,
That thou her maid art far more fair than she.
Be not her maid since she is envious;
Her vestal livery is but sick and green,
And none but fools do wear it; cast it off.
It is my lady, O it is my love!
O, that she knew she were!
She speaks, yet she says nothing. What of that?
Her eye discourses, I will answer it.
I am too bold, ’tis not to me she speaks.
Two of the fairest stars in all the heaven,
Having some business, do entreat her eyes
To twinkle in their spheres till they return.
What if her eyes were there, they in her head?
The brightness of her cheek would shame those stars,
As daylight doth a lamp; her eyes in heaven
Would through the airy region stream so bright
That birds would sing and think it were not night.
See how she leans her cheek upon her hand.
O that I were a glove upon that hand,
That I might touch that cheek.

JULIET.
Ay me.

ROMEO.
She speaks.
O speak again bright angel, for thou art
As glorious to this night, being o’er my head,
As is a winged messenger of heaven
Unto the white-upturned wondering eyes
Of mortals that fall back to gaze on him
When he bestrides the lazy-puffing clouds
And sails upon the bosom of the air.

JULIET.
O Romeo, Romeo, wherefore art thou Romeo?
Deny thy father and refuse thy name.
Or if thou wilt not, be but sworn my love,
And I’ll no longer be a Capulet.

ROMEO.
[_Aside._] Shall I hear more, or shall I speak at this?

JULIET.
’Tis but thy name that is my enemy;
Thou art thyself, though not a Montague.
What’s Montague? It is nor hand nor foot,
Nor arm, nor face, nor any other part
Belonging to a man. O be some other name.
What’s in a name? That which we call a rose
By any other name would smell as sweet;
So Romeo would, were he not Romeo call’d,
Retain that dear perfection which he owes
Without that title. Romeo, doff thy name,
And for thy name, which is no part of thee,
Take all myself.

ROMEO.
I take thee at thy word.
Call me but love, and I’ll be new baptis’d;
Henceforth I never will be Romeo.

JULIET.
What man art thou that, thus bescreen’d in night
So stumblest on my counsel?

ROMEO.
By a name
I know not how to tell thee who I am:
My name, dear saint, is hateful to myself,
Because it is an enemy to thee.
Had I it written, I would tear the word.

JULIET.
My ears have yet not drunk a hundred words
Of thy tongue’s utterance, yet I know the sound.
Art thou not Romeo, and a Montague?

ROMEO.
Neither, fair maid, if either thee dislike.

JULIET.
How cam’st thou hither, tell me, and wherefore?
The orchard walls are high and hard to climb,
And the place death, considering who thou art,
If any of my kinsmen find thee here.

ROMEO.
With love’s light wings did I o’erperch these walls,
For stony limits cannot hold love out,
And what love can do, that dares love attempt:
Therefore thy kinsmen are no stop to me.

JULIET.
If they do see thee, they will murder thee.

ROMEO.
Alack, there lies more peril in thine eye
Than twenty of their swords. Look thou but sweet,
And I am proof against their enmity.

JULIET.
I would not for the world they saw thee here.

ROMEO.
I have night’s cloak to hide me from their eyes,
And but thou love me, let them find me here.
My life were better ended by their hate
Than death prorogued, wanting of thy love.

JULIET.
By whose direction found’st thou out this place?

ROMEO.
By love, that first did prompt me to enquire;
He lent me counsel, and I lent him eyes.
I am no pilot; yet wert thou as far
As that vast shore wash’d with the farthest sea,
I should adventure for such merchandise.

JULIET.
Thou knowest the mask of night is on my face,
Else would a maiden blush bepaint my cheek
For that which thou hast heard me speak tonight.
Fain would I dwell on form, fain, fain deny
What I have spoke; but farewell compliment.
Dost thou love me? I know thou wilt say Ay,
And I will take thy word. Yet, if thou swear’st,
Thou mayst prove false. At lovers’ perjuries,
They say Jove laughs. O gentle Romeo,
If thou dost love, pronounce it faithfully.
Or if thou thinkest I am too quickly won,
I’ll frown and be perverse, and say thee nay,
So thou wilt woo. But else, not for the world.
In truth, fair Montague, I am too fond;
And therefore thou mayst think my ’haviour light:
But trust me, gentleman, I’ll prove more true
Than those that have more cunning to be strange.
I should have been more strange, I must confess,
But that thou overheard’st, ere I was ’ware,
My true-love passion; therefore pardon me,
And not impute this yielding to light love,
Which the dark night hath so discovered.

ROMEO.
Lady, by yonder blessed moon I vow,
That tips with silver all these fruit-tree tops,—

JULIET.
O swear not by the moon, th’inconstant moon,
That monthly changes in her circled orb,
Lest that thy love prove likewise variable.

ROMEO.
What shall I swear by?

JULIET.
Do not swear at all.
Or if thou wilt, swear by thy gracious self,
Which is the god of my idolatry,
And I’ll believe thee.

ROMEO.
If my heart’s dear love,—

JULIET.
Well, do not swear. Although I joy in thee,
I have no joy of this contract tonight;
It is too rash, too unadvis’d, too sudden,
Too like the lightning, which doth cease to be
Ere one can say “It lightens.” Sweet, good night.
This bud of love, by summer’s ripening breath,
May prove a beauteous flower when next we meet.
Good night, good night. As sweet repose and rest
Come to thy heart as that within my breast.

ROMEO.
O wilt thou leave me so unsatisfied?

JULIET.
What satisfaction canst thou have tonight?

ROMEO.
Th’exchange of thy love’s faithful vow for mine.

JULIET.
I gave thee mine before thou didst request it;
And yet I would it were to give again.

ROMEO.
Would’st thou withdraw it? For what purpose, love?

JULIET.
But to be frank and give it thee again.
And yet I wish but for the thing I have;
My bounty is as boundless as the sea,
My love as deep; the more I give to thee,
The more I have, for both are infinite.
I hear some noise within. Dear love, adieu.
[_Nurse calls within._]
Anon, good Nurse!—Sweet Montague be true.
Stay but a little, I will come again.

 [_Exit._]

ROMEO.
O blessed, blessed night. I am afeard,
Being in night, all this is but a dream,
Too flattering sweet to be substantial.

 Enter Juliet above.

JULIET.
Three words, dear Romeo, and good night indeed.
If that thy bent of love be honourable,
Thy purpose marriage, send me word tomorrow,
By one that I’ll procure to come to thee,
Where and what time thou wilt perform the rite,
And all my fortunes at thy foot I’ll lay
And follow thee my lord throughout the world.

NURSE.
[_Within._] Madam.

JULIET.
I come, anon.— But if thou meanest not well,
I do beseech thee,—

NURSE.
[_Within._] Madam.

JULIET.
By and by I come—
To cease thy strife and leave me to my grief.
Tomorrow will I send.

ROMEO.
So thrive my soul,—

JULIET.
A thousand times good night.

 [_Exit._]

ROMEO.
A thousand times the worse, to want thy light.
Love goes toward love as schoolboys from their books,
But love from love, towards school with heavy looks.

 [_Retiring slowly._]

 Re-enter Juliet, above.

JULIET.
Hist! Romeo, hist! O for a falconer’s voice
To lure this tassel-gentle back again.
Bondage is hoarse and may not speak aloud,
Else would I tear the cave where Echo lies,
And make her airy tongue more hoarse than mine
With repetition of my Romeo’s name.

ROMEO.
It is my soul that calls upon my name.
How silver-sweet sound lovers’ tongues by night,
Like softest music to attending ears.

JULIET.
Romeo.

ROMEO.
My nyas?

JULIET.
What o’clock tomorrow
Shall I send to thee?

ROMEO.
By the hour of nine.

JULIET.
I will not fail. ’Tis twenty years till then.
I have forgot why I did call thee back.

ROMEO.
Let me stand here till thou remember it.

JULIET.
I shall forget, to have thee still stand there,
Remembering how I love thy company.

ROMEO.
And I’ll still stay, to have thee still forget,
Forgetting any other home but this.

JULIET.
’Tis almost morning; I would have thee gone,
And yet no farther than a wanton’s bird,
That lets it hop a little from her hand,
Like a poor prisoner in his twisted gyves,
And with a silk thread plucks it back again,
So loving-jealous of his liberty.

ROMEO.
I would I were thy bird.

JULIET.
Sweet, so would I:
Yet I should kill thee with much cherishing.
Good night, good night. Parting is such sweet sorrow
That I shall say good night till it be morrow.

 [_Exit._]

ROMEO.
Sleep dwell upon thine eyes, peace in thy breast.
Would I were sleep and peace, so sweet to rest.
Hence will I to my ghostly Sire’s cell,
His help to crave and my dear hap to tell.

 [_Exit._]`,
  },
  {
    id: 'rj-nightingale-lark',
    authorGroup: 'Shakespeare',
    title: 'The Nightingale and the Lark',
    play: 'Romeo and Juliet',
    author: 'William Shakespeare',
    location: 'Act III, Scene 5: the opening exchange',
    verse: true,
    characters: ['Romeo', 'Juliet'],
    source: 'Project Gutenberg eBook #1513',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The opening of the printed scene, ending on Romeo’s “More light and light, more dark and dark our woes” immediately before the Nurse enters. Not the full printed scene.',
    context: 'It is dawn after their wedding night. Romeo is banished on pain of death; if morning has truly come, he must leave Verona or die.',
    contentNote: null,
    text: `SCENE V. An open Gallery to Juliet’s Chamber, overlooking the Garden.

 Enter Romeo and Juliet.

JULIET.
Wilt thou be gone? It is not yet near day.
It was the nightingale, and not the lark,
That pierc’d the fearful hollow of thine ear;
Nightly she sings on yond pomegranate tree.
Believe me, love, it was the nightingale.

ROMEO.
It was the lark, the herald of the morn,
No nightingale. Look, love, what envious streaks
Do lace the severing clouds in yonder east.
Night’s candles are burnt out, and jocund day
Stands tiptoe on the misty mountain tops.
I must be gone and live, or stay and die.

JULIET.
Yond light is not daylight, I know it, I.
It is some meteor that the sun exhales
To be to thee this night a torchbearer
And light thee on thy way to Mantua.
Therefore stay yet, thou need’st not to be gone.

ROMEO.
Let me be ta’en, let me be put to death,
I am content, so thou wilt have it so.
I’ll say yon grey is not the morning’s eye,
’Tis but the pale reflex of Cynthia’s brow.
Nor that is not the lark whose notes do beat
The vaulty heaven so high above our heads.
I have more care to stay than will to go.
Come, death, and welcome. Juliet wills it so.
How is’t, my soul? Let’s talk. It is not day.

JULIET.
It is, it is! Hie hence, be gone, away.
It is the lark that sings so out of tune,
Straining harsh discords and unpleasing sharps.
Some say the lark makes sweet division;
This doth not so, for she divideth us.
Some say the lark and loathed toad change eyes.
O, now I would they had chang’d voices too,
Since arm from arm that voice doth us affray,
Hunting thee hence with hunt’s-up to the day.
O now be gone, more light and light it grows.

ROMEO.
More light and light, more dark and dark our woes.`,
  },
  {
    id: 'hamlet-nunnery',
    authorGroup: 'Shakespeare',
    title: 'The Nunnery Scene',
    play: 'Hamlet',
    author: 'William Shakespeare',
    location: 'Act III, Scene 1: from Hamlet’s entrance to just before the King and Polonius re-enter',
    verse: true,
    // This scene crosses from verse into prose and back, and the crossing
    // is the scene. Added 2026-09-24; until then the prose rendered with
    // the source's hard wraps standing in for line breaks it never had.
    form: [
      { from: 'To be, or not to be', form: 'verse' },
      { from: 'Ha, ha! Are you honest?', form: 'prose', contested: true,
        note: 'Editors put the crossing in slightly different places. From '
          + '“That if you be honest and fair” the prose is beyond argument, since '
          + 'those speeches are too long and too unlineated to be anything else. '
          + 'The four short exchanges before it could be read either way, and this '
          + 'edition sets them as prose.' },
      { from: 'O, what a noble mind is here o’erthrown!', form: 'verse',
        note: 'Ophelia is alone, and the verse comes back with her.' },
    ],
    characters: ['Hamlet', 'Ophelia'],
    source: 'Project Gutenberg eBook #1524',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'Opens on “To be, or not to be” and runs to Ophelia’s “O, what a noble mind is here o’erthrown”, ending just before the King and Polonius re-enter. In the full scene they are concealed nearby; neither speaks in this cut.',
    context: 'Claudius and Polonius have arranged for Ophelia to meet Hamlet while they hide and watch. They hope to learn whether his troubled behavior comes from love for her.',
    contentNote: 'The soliloquy contemplates death and suicide; the exchange that follows is cruel.',
    text: `Enter Hamlet.

HAMLET.
To be, or not to be, that is the question:
Whether ’tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles,
And by opposing end them? To die—to sleep,
No more; and by a sleep to say we end
The heart-ache, and the thousand natural shocks
That flesh is heir to: ’tis a consummation
Devoutly to be wish’d. To die, to sleep.
To sleep, perchance to dream—ay, there’s the rub,
For in that sleep of death what dreams may come,
When we have shuffled off this mortal coil,
Must give us pause. There’s the respect
That makes calamity of so long life.
For who would bear the whips and scorns of time,
The oppressor’s wrong, the proud man’s contumely,
The pangs of dispriz’d love, the law’s delay,
The insolence of office, and the spurns
That patient merit of the unworthy takes,
When he himself might his quietus make
With a bare bodkin? Who would these fardels bear,
To grunt and sweat under a weary life,
But that the dread of something after death,
The undiscover’d country, from whose bourn
No traveller returns, puzzles the will,
And makes us rather bear those ills we have
Than fly to others that we know not of?
Thus conscience does make cowards of us all,
And thus the native hue of resolution
Is sicklied o’er with the pale cast of thought,
And enterprises of great pith and moment,
With this regard their currents turn awry
And lose the name of action. Soft you now,
The fair Ophelia! Nymph, in thy orisons
Be all my sins remember’d.

OPHELIA.
Good my lord,
How does your honour for this many a day?

HAMLET.
I humbly thank you; well, well, well.

OPHELIA.
My lord, I have remembrances of yours
That I have longed long to re-deliver.
I pray you, now receive them.

HAMLET.
No, not I.
I never gave you aught.

OPHELIA.
My honour’d lord, you know right well you did,
And with them words of so sweet breath compos’d
As made the things more rich; their perfume lost,
Take these again; for to the noble mind
Rich gifts wax poor when givers prove unkind.
There, my lord.

HAMLET.
Ha, ha! Are you honest?

OPHELIA.
My lord?

HAMLET.
Are you fair?

OPHELIA.
What means your lordship?

HAMLET.
That if you be honest and fair, your honesty should admit no discourse
to your beauty.

OPHELIA.
Could beauty, my lord, have better commerce than with honesty?

HAMLET.
Ay, truly; for the power of beauty will sooner transform honesty from
what it is to a bawd than the force of honesty can translate beauty
into his likeness. This was sometime a paradox, but now the time gives
it proof. I did love you once.

OPHELIA.
Indeed, my lord, you made me believe so.

HAMLET.
You should not have believed me; for virtue cannot so inoculate our old
stock but we shall relish of it. I loved you not.

OPHELIA.
I was the more deceived.

HAMLET.
Get thee to a nunnery. Why wouldst thou be a breeder of sinners? I am
myself indifferent honest; but yet I could accuse me of such things
that it were better my mother had not borne me. I am very proud,
revengeful, ambitious, with more offences at my beck than I have
thoughts to put them in, imagination to give them shape, or time to act
them in. What should such fellows as I do crawling between earth and
heaven? We are arrant knaves all, believe none of us. Go thy ways to a
nunnery. Where’s your father?

OPHELIA.
At home, my lord.

HAMLET.
Let the doors be shut upon him, that he may play the fool nowhere but
in’s own house. Farewell.

OPHELIA.
O help him, you sweet heavens!

HAMLET.
If thou dost marry, I’ll give thee this plague for thy dowry. Be thou
as chaste as ice, as pure as snow, thou shalt not escape calumny. Get
thee to a nunnery, go: farewell. Or if thou wilt needs marry, marry a
fool; for wise men know well enough what monsters you make of them. To
a nunnery, go; and quickly too. Farewell.

OPHELIA.
O heavenly powers, restore him!

HAMLET.
I have heard of your paintings too, well enough. God hath given you one
face, and you make yourselves another. You jig, you amble, and you
lisp, and nickname God’s creatures, and make your wantonness your
ignorance. Go to, I’ll no more on’t, it hath made me mad. I say, we
will have no more marriages. Those that are married already, all but
one, shall live; the rest shall keep as they are. To a nunnery, go.

[_Exit._]

OPHELIA.
O, what a noble mind is here o’erthrown!
The courtier’s, soldier’s, scholar’s, eye, tongue, sword,
Th’expectancy and rose of the fair state,
The glass of fashion and the mould of form,
Th’observ’d of all observers, quite, quite down!
And I, of ladies most deject and wretched,
That suck’d the honey of his music vows,
Now see that noble and most sovereign reason,
Like sweet bells jangled out of tune and harsh,
That unmatch’d form and feature of blown youth
Blasted with ecstasy. O woe is me,
T’have seen what I have seen, see what I see.`,
  },
  {
    id: 'macbeth-decision',
    authorGroup: 'Shakespeare',
    title: 'The Decision',
    play: 'Macbeth',
    author: 'William Shakespeare',
    location: 'Act I, Scene 7, complete',
    verse: true,
    // Macbeth resumes after his wife's entrance, mid-speech and unlabelled.
    unlabelled: [{ from: 'How now! what news?', who: 'MACBETH' }],
    characters: ['Macbeth', 'Lady Macbeth'],
    source: 'Project Gutenberg eBook #1533',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The complete printed scene, from Macbeth’s soliloquy to the closing Exeunt. Silent servants pass over at the opening; only the two speak.',
    context: 'Duncan the king is a guest in their castle tonight. Macbeth has been promised the crown by the witches, and the murder that would take it is now or never.',
    contentNote: 'A murder is planned; one image of violence toward an infant.',
    text: `SCENE VII. The same. A Lobby in the Castle.

 Hautboys and torches. Enter, and pass over, a Sewer and divers
 Servants with dishes and service. Then enter Macbeth.

MACBETH.
If it were done when ’tis done, then ’twere well
It were done quickly. If th’ assassination
Could trammel up the consequence, and catch
With his surcease success; that but this blow
Might be the be-all and the end-all—here,
But here, upon this bank and shoal of time,
We’d jump the life to come. But in these cases
We still have judgement here; that we but teach
Bloody instructions, which being taught, return
To plague th’ inventor. This even-handed justice
Commends th’ ingredience of our poison’d chalice
To our own lips. He’s here in double trust:
First, as I am his kinsman and his subject,
Strong both against the deed; then, as his host,
Who should against his murderer shut the door,
Not bear the knife myself. Besides, this Duncan
Hath borne his faculties so meek, hath been
So clear in his great office, that his virtues
Will plead like angels, trumpet-tongued, against
The deep damnation of his taking-off;
And pity, like a naked new-born babe,
Striding the blast, or heaven’s cherubin, hors’d
Upon the sightless couriers of the air,
Shall blow the horrid deed in every eye,
That tears shall drown the wind.—I have no spur
To prick the sides of my intent, but only
Vaulting ambition, which o’erleaps itself
And falls on th’ other—

 Enter Lady Macbeth.

How now! what news?

LADY MACBETH.
He has almost supp’d. Why have you left the chamber?

MACBETH.
Hath he ask’d for me?

LADY MACBETH.
Know you not he has?

MACBETH.
We will proceed no further in this business:
He hath honour’d me of late; and I have bought
Golden opinions from all sorts of people,
Which would be worn now in their newest gloss,
Not cast aside so soon.

LADY MACBETH.
Was the hope drunk
Wherein you dress’d yourself? Hath it slept since?
And wakes it now, to look so green and pale
At what it did so freely? From this time
Such I account thy love. Art thou afeard
To be the same in thine own act and valour
As thou art in desire? Wouldst thou have that
Which thou esteem’st the ornament of life,
And live a coward in thine own esteem,
Letting “I dare not” wait upon “I would,”
Like the poor cat i’ th’ adage?

MACBETH.
Pr’ythee, peace!
I dare do all that may become a man;
Who dares do more is none.

LADY MACBETH.
What beast was’t, then,
That made you break this enterprise to me?
When you durst do it, then you were a man;
And, to be more than what you were, you would
Be so much more the man. Nor time nor place
Did then adhere, and yet you would make both:
They have made themselves, and that their fitness now
Does unmake you. I have given suck, and know
How tender ’tis to love the babe that milks me:
I would, while it was smiling in my face,
Have pluck’d my nipple from his boneless gums
And dash’d the brains out, had I so sworn as you
Have done to this.

MACBETH.
If we should fail?

LADY MACBETH.
We fail?
But screw your courage to the sticking-place,
And we’ll not fail. When Duncan is asleep
(Whereto the rather shall his day’s hard journey
Soundly invite him), his two chamberlains
Will I with wine and wassail so convince
That memory, the warder of the brain,
Shall be a fume, and the receipt of reason
A limbeck only: when in swinish sleep
Their drenched natures lie as in a death,
What cannot you and I perform upon
Th’ unguarded Duncan? what not put upon
His spongy officers; who shall bear the guilt
Of our great quell?

MACBETH.
Bring forth men-children only;
For thy undaunted mettle should compose
Nothing but males. Will it not be receiv’d,
When we have mark’d with blood those sleepy two
Of his own chamber, and us’d their very daggers,
That they have done’t?

LADY MACBETH.
Who dares receive it other,
As we shall make our griefs and clamour roar
Upon his death?

MACBETH.
I am settled, and bend up
Each corporal agent to this terrible feat.
Away, and mock the time with fairest show:
False face must hide what the false heart doth know.

 [_Exeunt._]`,
  },
  {
    id: 'macbeth-aftermath',
    authorGroup: 'Shakespeare',
    title: 'After the Murder',
    play: 'Macbeth',
    author: 'William Shakespeare',
    location: 'Act II, Scene 2, complete',
    verse: true,
    characters: ['Macbeth', 'Lady Macbeth'],
    source: 'Project Gutenberg eBook #1533',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The complete printed scene. The owl and the knocking are sound cues, not speaking roles.',
    context: 'Moments after Macbeth has killed the sleeping Duncan. The plan requires the daggers to be planted on the drugged grooms before the castle wakes.',
    contentNote: 'The immediate aftermath of a murder; blood throughout.',
    text: `SCENE II. The same.

 Enter Lady Macbeth.

LADY MACBETH.
That which hath made them drunk hath made me bold:
What hath quench’d them hath given me fire.—Hark!—Peace!
It was the owl that shriek’d, the fatal bellman,
Which gives the stern’st good night. He is about it.
The doors are open; and the surfeited grooms
Do mock their charge with snores: I have drugg’d their possets,
That death and nature do contend about them,
Whether they live or die.

MACBETH.
[_Within._] Who’s there?—what, ho!

LADY MACBETH.
Alack! I am afraid they have awak’d,
And ’tis not done. Th’ attempt and not the deed
Confounds us.—Hark!—I laid their daggers ready;
He could not miss ’em.—Had he not resembled
My father as he slept, I had done’t.—My husband!

 Enter Macbeth.

MACBETH.
I have done the deed.—Didst thou not hear a noise?

LADY MACBETH.
I heard the owl scream and the crickets cry.
Did not you speak?

MACBETH.
When?

LADY MACBETH.
Now.

MACBETH.
As I descended?

LADY MACBETH.
Ay.

MACBETH.
Hark!—Who lies i’ th’ second chamber?

LADY MACBETH.
Donalbain.

MACBETH.
This is a sorry sight.

 [_Looking on his hands._]

LADY MACBETH.
A foolish thought, to say a sorry sight.

MACBETH.
There’s one did laugh in’s sleep, and one cried, “Murder!”
That they did wake each other: I stood and heard them.
But they did say their prayers, and address’d them
Again to sleep.

LADY MACBETH.
There are two lodg’d together.

MACBETH.
One cried, “God bless us!” and, “Amen,” the other,
As they had seen me with these hangman’s hands.
List’ning their fear, I could not say “Amen,”
When they did say, “God bless us.”

LADY MACBETH.
Consider it not so deeply.

MACBETH.
But wherefore could not I pronounce “Amen”?
I had most need of blessing, and “Amen”
Stuck in my throat.

LADY MACBETH.
These deeds must not be thought
After these ways; so, it will make us mad.

MACBETH.
Methought I heard a voice cry, “Sleep no more!
Macbeth does murder sleep,”—the innocent sleep;
Sleep that knits up the ravell’d sleave of care,
The death of each day’s life, sore labour’s bath,
Balm of hurt minds, great nature’s second course,
Chief nourisher in life’s feast.

LADY MACBETH.
What do you mean?

MACBETH.
Still it cried, “Sleep no more!” to all the house:
“Glamis hath murder’d sleep, and therefore Cawdor
Shall sleep no more. Macbeth shall sleep no more!”

LADY MACBETH.
Who was it that thus cried? Why, worthy thane,
You do unbend your noble strength to think
So brainsickly of things. Go get some water,
And wash this filthy witness from your hand.—
Why did you bring these daggers from the place?
They must lie there: go carry them, and smear
The sleepy grooms with blood.

MACBETH.
I’ll go no more:
I am afraid to think what I have done;
Look on’t again I dare not.

LADY MACBETH.
Infirm of purpose!
Give me the daggers. The sleeping and the dead
Are but as pictures. ’Tis the eye of childhood
That fears a painted devil. If he do bleed,
I’ll gild the faces of the grooms withal,
For it must seem their guilt.

 [_Exit. Knocking within._]

MACBETH.
Whence is that knocking?
How is’t with me, when every noise appals me?
What hands are here? Ha, they pluck out mine eyes!
Will all great Neptune’s ocean wash this blood
Clean from my hand? No, this my hand will rather
The multitudinous seas incarnadine,
Making the green one red.

 Enter Lady Macbeth.

LADY MACBETH.
My hands are of your color, but I shame
To wear a heart so white. [_Knocking within._] I hear knocking
At the south entry:—retire we to our chamber.
A little water clears us of this deed:
How easy is it then! Your constancy
Hath left you unattended.—[_Knocking within._] Hark, more knocking.
Get on your nightgown, lest occasion call us
And show us to be watchers. Be not lost
So poorly in your thoughts.

MACBETH.
To know my deed, ’twere best not know myself. [_Knocking within._]
Wake Duncan with thy knocking! I would thou couldst!

 [_Exeunt._]`,
  },
  {
    id: 'muchado-killclaudio',
    authorGroup: 'Shakespeare',
    title: 'Kill Claudio',
    play: 'Much Ado About Nothing',
    author: 'William Shakespeare',
    location: 'Act IV, Scene 1: the closing exchange',
    // PROSE, corrected 2026-09-24. This record said verse, so the reader
    // kept the source's hard wraps as line breaks and Beatrice's speeches
    // arrived broken at the column the typesetter happened to stop at.
    // Benedick and Beatrice speak prose from end to end of this exchange.
    verse: false,
    characters: ['Beatrice', 'Benedick'],
    source: 'Project Gutenberg eBook #1519',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The uninterrupted two-person exchange after the others exit, ending with their own Exeunt. Not the full printed scene.',
    context: 'Hero has just been publicly slandered and abandoned at the altar by Claudio. Alone in the church, Benedick and Beatrice confess their love for the first time.',
    contentNote: 'A demanded killing; the public slander of a woman drives the scene.',
    text: `BENEDICK.
Lady Beatrice, have you wept all this while?

BEATRICE.
Yea, and I will weep a while longer.

BENEDICK.
I will not desire that.

BEATRICE.
You have no reason; I do it freely.

BENEDICK.
Surely I do believe your fair cousin is wronged.

BEATRICE.
Ah! how much might the man deserve of me that would right her.

BENEDICK.
Is there any way to show such friendship?

BEATRICE.
A very even way, but no such friend.

BENEDICK.
May a man do it?

BEATRICE.
It is a man’s office, but not yours.

BENEDICK.
I do love nothing in the world so well as you: is not that strange?

BEATRICE.
As strange as the thing I know not. It were as possible for
me to say I loved nothing so well as you; but believe me not, and yet
I lie not; I confess nothing, nor I deny nothing. I am sorry for my
cousin.

BENEDICK.
By my sword, Beatrice, thou lovest me.

BEATRICE.
Do not swear by it, and eat it.

BENEDICK.
I will swear by it that you love me; and I will make him eat it
that says I love not you.

BEATRICE.
Will you not eat your word?

BENEDICK.
With no sauce that can be devised to it. I protest I love thee.

BEATRICE.
Why then, God forgive me!

BENEDICK.
What offence, sweet Beatrice?

BEATRICE.
You have stayed me in a happy hour: I was about to protest I loved you.

BENEDICK.
And do it with all thy heart.

BEATRICE.
I love you with so much of my heart that none is left to protest.

BENEDICK.
Come, bid me do anything for thee.

BEATRICE.
Kill Claudio.

BENEDICK.
Ha! not for the wide world.

BEATRICE.
You kill me to deny it. Farewell.

BENEDICK.
Tarry, sweet Beatrice.

BEATRICE.
I am gone, though I am here: there is no love in you: nay, I
pray you, let me go.

BENEDICK.
Beatrice,—

BEATRICE.
In faith, I will go.

BENEDICK.
We’ll be friends first.

BEATRICE.
You dare easier be friends with me than fight with mine enemy.

BENEDICK.
Is Claudio thine enemy?

BEATRICE.
Is he not approved in the height a villain, that hath slandered,
scorned, dishonoured my kinswoman? O! that I were a man. What! bear her in
hand until they come to take hands, and then, with public accusation,
uncovered slander, unmitigated rancour,—O God, that I were a man! I would
eat his heart in the market-place.

BENEDICK.
Hear me, Beatrice,—

BEATRICE.
Talk with a man out at a window! a proper saying!

BENEDICK.
Nay, but Beatrice,—

BEATRICE.
Sweet Hero! she is wronged, she is slandered, she is undone.

BENEDICK.
Beat—

BEATRICE.
Princes and Counties! Surely, a princely testimony, a goodly
Count Comfect; a sweet gallant, surely! O! that I were a man for his sake,
or that I had any friend would be a man for my sake! But manhood is melted
into curtsies, valour into compliment, and men are only turned into tongue,
and trim ones too: he is now as valiant as Hercules, that only tells a lie
and swears it. I cannot be a man with wishing, therefore I will die a
woman with grieving.

BENEDICK.
Tarry, good Beatrice. By this hand, I love thee.

BEATRICE.
Use it for my love some other way than swearing by it.

BENEDICK.
Think you in your soul the Count Claudio hath wronged Hero?

BEATRICE.
Yea, as sure is I have a thought or a soul.

BENEDICK.
Enough! I am engaged, I will challenge him. I will kiss your
hand, and so leave you. By this hand, Claudio shall render me a dear
account. As you hear of me, so think of me. Go, comfort your cousin: I
must say she is dead; and so, farewell.

[Exeunt.]`,
  },
  {
    id: 'shrew-first-encounter',
    authorGroup: 'Shakespeare',
    title: 'The First Encounter',
    play: 'The Taming of the Shrew',
    author: 'William Shakespeare',
    location: 'Act II, Scene 1: Katherina’s entrance to just before the others return',
    verse: true,
    // “Good morrow, Kate” continues a speech begun before she enters, which
    // is why it carries no label — see cutNote.
    unlabelled: [{ from: 'Good morrow, Kate', who: 'PETRUCHIO' }],
    characters: ['Katherina', 'Petruchio'],
    source: 'Project Gutenberg eBook #1508',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'An uninterrupted exchange, not the full printed scene. It opens and closes mid-speech for Petruchio: “Good morrow, Kate” continues a speech begun before Katherina enters, which is why the first lines carry no speaker label.',
    context: 'Petruchio has come to Padua openly declaring he will marry for money, and has arranged with Katherina’s father to woo her before ever meeting her.',
    contentNote: 'A coercive courtship played as wit: bawdy sparring, Katherina strikes him, and the betrothal is imposed, not consented to.',
    text: `Enter Katherina.

Good morrow, Kate; for that’s your name, I hear.

KATHERINA.
Well have you heard, but something hard of hearing:
They call me Katherine that do talk of me.

PETRUCHIO.
You lie, in faith, for you are call’d plain Kate,
And bonny Kate, and sometimes Kate the curst;
But, Kate, the prettiest Kate in Christendom,
Kate of Kate Hall, my super-dainty Kate,
For dainties are all Kates, and therefore, Kate,
Take this of me, Kate of my consolation;
Hearing thy mildness prais’d in every town,
Thy virtues spoke of, and thy beauty sounded,—
Yet not so deeply as to thee belongs,—
Myself am mov’d to woo thee for my wife.

KATHERINA.
Mov’d! in good time: let him that mov’d you hither
Remove you hence. I knew you at the first,
You were a moveable.

PETRUCHIO.
Why, what’s a moveable?

KATHERINA.
A joint-stool.

PETRUCHIO.
Thou hast hit it: come, sit on me.

KATHERINA.
Asses are made to bear, and so are you.

PETRUCHIO.
Women are made to bear, and so are you.

KATHERINA.
No such jade as bear you, if me you mean.

PETRUCHIO.
Alas! good Kate, I will not burden thee;
For, knowing thee to be but young and light,—

KATHERINA.
Too light for such a swain as you to catch;
And yet as heavy as my weight should be.

PETRUCHIO.
Should be! should buz!

KATHERINA.
Well ta’en, and like a buzzard.

PETRUCHIO.
O, slow-wing’d turtle! shall a buzzard take thee?

KATHERINA.
Ay, for a turtle, as he takes a buzzard.

PETRUCHIO.
Come, come, you wasp; i’ faith, you are too angry.

KATHERINA.
If I be waspish, best beware my sting.

PETRUCHIO.
My remedy is then to pluck it out.

KATHERINA.
Ay, if the fool could find it where it lies.

PETRUCHIO.
Who knows not where a wasp does wear his sting?
In his tail.

KATHERINA.
In his tongue.

PETRUCHIO.
Whose tongue?

KATHERINA.
Yours, if you talk of tales; and so farewell.

PETRUCHIO.
What! with my tongue in your tail? Nay, come again,
Good Kate; I am a gentleman.

KATHERINA.
That I’ll try.

[_Striking him._]

PETRUCHIO.
I swear I’ll cuff you if you strike again.

KATHERINA.
So may you lose your arms:
If you strike me, you are no gentleman;
And if no gentleman, why then no arms.

PETRUCHIO.
A herald, Kate? O! put me in thy books.

KATHERINA.
What is your crest? a coxcomb?

PETRUCHIO.
A combless cock, so Kate will be my hen.

KATHERINA.
No cock of mine; you crow too like a craven.

PETRUCHIO.
Nay, come, Kate, come; you must not look so sour.

KATHERINA.
It is my fashion when I see a crab.

PETRUCHIO.
Why, here’s no crab, and therefore look not sour.

KATHERINA.
There is, there is.

PETRUCHIO.
Then show it me.

KATHERINA.
Had I a glass I would.

PETRUCHIO.
What, you mean my face?

KATHERINA.
Well aim’d of such a young one.

PETRUCHIO.
Now, by Saint George, I am too young for you.

KATHERINA.
Yet you are wither’d.

PETRUCHIO.
’Tis with cares.

KATHERINA.
I care not.

PETRUCHIO.
Nay, hear you, Kate: in sooth, you ’scape not so.

KATHERINA.
I chafe you, if I tarry; let me go.

PETRUCHIO.
No, not a whit; I find you passing gentle.
’Twas told me you were rough, and coy, and sullen,
And now I find report a very liar;
For thou art pleasant, gamesome, passing courteous,
But slow in speech, yet sweet as spring-time flowers.
Thou canst not frown, thou canst not look askance,
Nor bite the lip, as angry wenches will,
Nor hast thou pleasure to be cross in talk;
But thou with mildness entertain’st thy wooers;
With gentle conference, soft and affable.
Why does the world report that Kate doth limp?
O sland’rous world! Kate like the hazel-twig
Is straight and slender, and as brown in hue
As hazel-nuts, and sweeter than the kernels.
O! let me see thee walk: thou dost not halt.

KATHERINA.
Go, fool, and whom thou keep’st command.

PETRUCHIO.
Did ever Dian so become a grove
As Kate this chamber with her princely gait?
O! be thou Dian, and let her be Kate,
And then let Kate be chaste, and Dian sportful!

KATHERINA.
Where did you study all this goodly speech?

PETRUCHIO.
It is extempore, from my mother-wit.

KATHERINA.
A witty mother! witless else her son.

PETRUCHIO.
Am I not wise?

KATHERINA.
Yes; keep you warm.

PETRUCHIO.
Marry, so I mean, sweet Katherine, in thy bed;
And therefore, setting all this chat aside,
Thus in plain terms: your father hath consented
That you shall be my wife your dowry ’greed on;
And will you, nill you, I will marry you.
Now, Kate, I am a husband for your turn;
For, by this light, whereby I see thy beauty,—
Thy beauty that doth make me like thee well,—
Thou must be married to no man but me;
For I am he am born to tame you, Kate,
And bring you from a wild Kate to a Kate
Conformable as other household Kates.`,
  },
  {
    id: 'jc-quarrel',
    authorGroup: 'Shakespeare',
    title: 'The Quarrel',
    play: 'Julius Caesar',
    author: 'William Shakespeare',
    location: 'Act IV, Scene 3: the opening exchange',
    verse: true,
    characters: ['Brutus', 'Cassius'],
    source: 'Project Gutenberg eBook #1522',
    verified: '2026-09-16',
    rightsNote: 'Shakespeare’s text is public domain. Text taken verbatim from the Project Gutenberg edition and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The uninterrupted opening of the printed scene, from their entrance to Brutus’s reconciling reply just before the Poet enters. Not the full printed scene.',
    context: 'The assassins of Caesar are now generals at war, and the alliance between them is cracking under money, honor and grief.',
    contentNote: 'A dagger is offered in despair mid-quarrel.',
    text: `SCENE III. Within the tent of Brutus.

Enter Brutus and Cassius.

CASSIUS.
That you have wrong’d me doth appear in this:
You have condemn’d and noted Lucius Pella
For taking bribes here of the Sardians;
Wherein my letters, praying on his side
Because I knew the man, were slighted off.

BRUTUS.
You wrong’d yourself to write in such a case.

CASSIUS.
In such a time as this it is not meet
That every nice offence should bear his comment.

BRUTUS.
Let me tell you, Cassius, you yourself
Are much condemn’d to have an itching palm,
To sell and mart your offices for gold
To undeservers.

CASSIUS.
I an itching palm!
You know that you are Brutus that speak this,
Or, by the gods, this speech were else your last.

BRUTUS.
The name of Cassius honours this corruption,
And chastisement doth therefore hide his head.

CASSIUS.
Chastisement!

BRUTUS.
Remember March, the Ides of March remember:
Did not great Julius bleed for justice’ sake?
What villain touch’d his body, that did stab,
And not for justice? What! Shall one of us,
That struck the foremost man of all this world
But for supporting robbers, shall we now
Contaminate our fingers with base bribes,
And sell the mighty space of our large honours
For so much trash as may be grasped thus?
I had rather be a dog, and bay the moon,
Than such a Roman.

CASSIUS.
Brutus, bait not me,
I’ll not endure it. You forget yourself,
To hedge me in. I am a soldier, I,
Older in practice, abler than yourself
To make conditions.

BRUTUS.
Go to; you are not, Cassius.

CASSIUS.
I am.

BRUTUS.
I say you are not.

CASSIUS.
Urge me no more, I shall forget myself;
Have mind upon your health, tempt me no farther.

BRUTUS.
Away, slight man!

CASSIUS.
Is’t possible?

BRUTUS.
Hear me, for I will speak.
Must I give way and room to your rash choler?
Shall I be frighted when a madman stares?

CASSIUS.
O ye gods, ye gods! Must I endure all this?

BRUTUS.
All this? ay, more: fret till your proud heart break;
Go show your slaves how choleric you are,
And make your bondmen tremble. Must I budge?
Must I observe you? Must I stand and crouch
Under your testy humour? By the gods,
You shall digest the venom of your spleen,
Though it do split you; for, from this day forth,
I’ll use you for my mirth, yea, for my laughter,
When you are waspish.

CASSIUS.
Is it come to this?

BRUTUS.
You say you are a better soldier:
Let it appear so; make your vaunting true,
And it shall please me well. For mine own part,
I shall be glad to learn of noble men.

CASSIUS.
You wrong me every way, you wrong me, Brutus.
I said, an elder soldier, not a better:
Did I say better?

BRUTUS.
If you did, I care not.

CASSIUS.
When Caesar liv’d, he durst not thus have mov’d me.

BRUTUS.
Peace, peace! you durst not so have tempted him.

CASSIUS.
I durst not?

BRUTUS.
No.

CASSIUS.
What? durst not tempt him?

BRUTUS.
For your life you durst not.

CASSIUS.
Do not presume too much upon my love.
I may do that I shall be sorry for.

BRUTUS.
You have done that you should be sorry for.
There is no terror, Cassius, in your threats,
For I am arm’d so strong in honesty,
That they pass by me as the idle wind,
Which I respect not. I did send to you
For certain sums of gold, which you denied me;
For I can raise no money by vile means:
By Heaven, I had rather coin my heart,
And drop my blood for drachmas, than to wring
From the hard hands of peasants their vile trash
By any indirection. I did send
To you for gold to pay my legions,
Which you denied me: was that done like Cassius?
Should I have answer’d Caius Cassius so?
When Marcus Brutus grows so covetous,
To lock such rascal counters from his friends,
Be ready, gods, with all your thunderbolts,
Dash him to pieces!

CASSIUS.
I denied you not.

BRUTUS.
You did.

CASSIUS.
I did not. He was but a fool
That brought my answer back. Brutus hath riv’d my heart.
A friend should bear his friend’s infirmities;
But Brutus makes mine greater than they are.

BRUTUS.
I do not, till you practise them on me.

CASSIUS.
You love me not.

BRUTUS.
I do not like your faults.

CASSIUS.
A friendly eye could never see such faults.

BRUTUS.
A flatterer’s would not, though they do appear
As huge as high Olympus.

CASSIUS.
Come, Antony, and young Octavius, come,
Revenge yourselves alone on Cassius,
For Cassius is a-weary of the world:
Hated by one he loves; brav’d by his brother;
Check’d like a bondman; all his faults observ’d,
Set in a note-book, learn’d and conn’d by rote,
To cast into my teeth. O, I could weep
My spirit from mine eyes! There is my dagger,
And here my naked breast; within, a heart
Dearer than Plutus’ mine, richer than gold:
If that thou be’st a Roman, take it forth.
I, that denied thee gold, will give my heart:
Strike as thou didst at Caesar; for I know,
When thou didst hate him worst, thou lovedst him better
Than ever thou lovedst Cassius.

BRUTUS.
Sheathe your dagger.
Be angry when you will, it shall have scope;
Do what you will, dishonour shall be humour.
O Cassius, you are yoked with a lamb
That carries anger as the flint bears fire,
Who, much enforced, shows a hasty spark,
And straight is cold again.

CASSIUS.
Hath Cassius liv’d
To be but mirth and laughter to his Brutus,
When grief and blood ill-temper’d vexeth him?

BRUTUS.
When I spoke that, I was ill-temper’d too.

CASSIUS.
Do you confess so much? Give me your hand.

BRUTUS.
And my heart too.

CASSIUS.
O Brutus!

BRUTUS.
What’s the matter?

CASSIUS.
Have not you love enough to bear with me,
When that rash humour which my mother gave me
Makes me forgetful?

BRUTUS.
Yes, Cassius; and from henceforth,
When you are over-earnest with your Brutus,
He’ll think your mother chides, and leave you so.`,
  },
  {
    id: 'seagull-nina-returns',
    authorGroup: 'Chekhov',
    title: 'Nina Returns',
    play: 'The Sea-Gull',
    author: 'Anton Chekhov (translator not named in the source edition)',
    location: 'Act IV',
    characters: ['Nina', 'Konstantin Treplev (printed as “Treplieff” in this translation)'],
    source: 'Project Gutenberg eBook #1754',
    verified: '2026-09-16',
    rightsNote: 'Public domain in the United States per Project Gutenberg. Text taken verbatim and verified line for line. This Gutenberg edition names no translator, so no translator credit is claimed. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'A two-role rehearsal cut, not a numbered scene: it opens on Nina at Treplieff’s breast and ends with her running out to the terrace. Other characters are heard laughing in the distance but never enter.',
    contentNote: 'Acute emotional distress and grief.',
    text: `NINA lays her head on TREPLIEFF’S breast and stifles her sobs.

TREPLIEFF. [Deeply moved] Nina, Nina! It is you--you! I felt you would
come; all day my heart has been aching for you. [He takes off her hat
and cloak] My darling, my beloved has come back to me! We mustn’t cry,
we mustn’t cry.

NINA. There is some one here.

TREPLIEFF. No one is here.

NINA. Lock the door, some one might come.

TREPLIEFF. No one will come in.

NINA. I know your mother is here. Lock the door.

TREPLIEFF locks the door on the right and comes back to NINA.

TREPLIEFF. There is no lock on that one. I shall put a chair against
it. [He puts an arm-chair against the door] Don’t be frightened, no one
shall come in.

NINA. [Gazing intently into his face] Let me look at you. [She looks
about her] It is warm and comfortable in here. This used to be a
sitting-room. Have I changed much?

TREPLIEFF. Yes, you have grown thinner, and your eyes are larger than
they were. Nina, it seems so strange to see you! Why didn’t you let me
go to you? Why didn’t you come sooner to me? You have been here nearly a
week, I know. I have been several times each day to where you live, and
have stood like a beggar beneath your window.

NINA. I was afraid you might hate me. I dream every night that you look
at me without recognising me. I have been wandering about on the shores
of the lake ever since I came back. I have often been near your house,
but I have never had the courage to come in. Let us sit down. [They sit
down] Let us sit down and talk our hearts out. It is so quiet and warm
in here. Do you hear the wind whistling outside? As Turgenieff says,
“Happy is he who can sit at night under the roof of his home, who has a
warm corner in which to take refuge.” I am a sea-gull--and yet--no.
[She passes her hand across her forehead] What was I saying? Oh, yes,
Turgenieff. He says, “and God help all houseless wanderers.” [She sobs.]

TREPLIEFF. Nina! You are crying again, Nina!

NINA. It is all right. I shall feel better after this. I have not cried
for two years. I went into the garden last night to see if our old
theatre were still standing. I see it is. I wept there for the first
time in two years, and my heart grew lighter, and my soul saw more
clearly again. See, I am not crying now. [She takes his hand in hers]
So you are an author now, and I am an actress. We have both been sucked
into the whirlpool. My life used to be as happy as a child’s; I used to
wake singing in the morning; I loved you and dreamt of fame, and what is
the reality? To-morrow morning early I must start for Eltz by train in
a third-class carriage, with a lot of peasants, and at Eltz the educated
trades-people will pursue me with compliments. It is a rough life.

TREPLIEFF. Why are you going to Eltz?

NINA. I have accepted an engagement there for the winter. It is time for
me to go.

TREPLIEFF. Nina, I have cursed you, and hated you, and torn up your
photograph, and yet I have known every minute of my life that my heart
and soul were yours for ever. To cease from loving you is beyond my
power. I have suffered continually from the time I lost you and began
to write, and my life has been almost unendurable. My youth was suddenly
plucked from me then, and I seem now to have lived in this world for
ninety years. I have called out to you, I have kissed the ground you
walked on, wherever I looked I have seen your face before my eyes, and
the smile that had illumined for me the best years of my life.

NINA. [Despairingly] Why, why does he talk to me like this?

TREPLIEFF. I am quite alone, unwarmed by any attachment. I am as cold
as if I were living in a cave. Whatever I write is dry and gloomy and
harsh. Stay here, Nina, I beseech you, or else let me go away with you.

NINA quickly puts on her coat and hat.

TREPLIEFF. Nina, why do you do that? For God’s sake, Nina! [He watches
her as she dresses. A pause.]

NINA. My carriage is at the gate. Do not come out to see me off. I shall
find the way alone. [Weeping] Let me have some water.

TREPLIEFF hands her a glass of water.

TREPLIEFF. Where are you going?

NINA. Back to the village. Is your mother here?

TREPLIEFF. Yes, my uncle fell ill on Thursday, and we telegraphed for
her to come.

NINA. Why do you say that you have kissed the ground I walked on? You
should kill me rather. [She bends over the table] I am so tired. If I
could only rest--rest. [She raises her head] I am a sea-gull--no--no,
I am an actress. [She hears ARKADINA and TRIGORIN laughing in the
distance, runs to the door on the left and looks through the keyhole] He
is there too. [She goes back to TREPLIEFF] Ah, well--no matter. He
does not believe in the theatre; he used to laugh at my dreams, so that
little by little I became down-hearted and ceased to believe in it too.
Then came all the cares of love, the continual anxiety about my little
one, so that I soon grew trivial and spiritless, and played my parts
without meaning. I never knew what to do with my hands, and I could not
walk properly or control my voice. You cannot imagine the state of mind
of one who knows as he goes through a play how terribly badly he is
acting. I am a sea-gull--no--no, that is not what I meant to say. Do you
remember how you shot a seagull once? A man chanced to pass that way and
destroyed it out of idleness. That is an idea for a short story, but it
is not what I meant to say. [She passes her hand across her forehead]
What was I saying? Oh, yes, the stage. I have changed now. Now I am a
real actress. I act with joy, with exaltation, I am intoxicated by it,
and feel that I am superb. I have been walking and walking, and thinking
and thinking, ever since I have been here, and I feel the strength of
my spirit growing in me every day. I know now, I understand at last,
Constantine, that for us, whether we write or act, it is not the honour
and glory of which I have dreamt that is important, it is the strength
to endure. One must know how to bear one’s cross, and one must have
faith. I believe, and so do not suffer so much, and when I think of my
calling I do not fear life.

TREPLIEFF. [Sadly] You have found your way, you know where you are
going, but I am still groping in a chaos of phantoms and dreams, not
knowing whom and what end I am serving by it all. I do not believe in
anything, and I do not know what my calling is.

NINA. [Listening] Hush! I must go. Good-bye. When I have become a
famous actress you must come and see me. Will you promise to come? But
now--[She takes his hand] it is late. I can hardly stand. I am fainting.
I am hungry.

TREPLIEFF. Stay, and let me bring you some supper.

NINA. No, no--and don’t come out, I can find the way alone. My carriage
is not far away. So she brought him back with her? However, what
difference can that make to me? Don’t tell Trigorin anything when you
see him. I love him--I love him even more than I used to. It is an idea
for a short story. I love him--I love him passionately--I love him to
despair. Have you forgotten, Constantine, how pleasant the old times
were? What a gay, bright, gentle, pure life we led? How a feeling as
sweet and tender as a flower blossomed in our hearts? Do you remember,
[She recites] “All men and beasts, lions, eagles, and quails, horned
stags, geese, spiders, silent fish that inhabit the waves, starfish from
the sea, and creatures invisible to the eye--in one word, life--all, all
life, completing the dreary round set before it, has died out at last.
A thousand years have passed since the earth last bore a living creature
on its breast, and the unhappy moon now lights her lamp in vain. No
longer are the cries of storks heard in the meadows, or the drone of
beetles in the groves of limes----”

She embraces TREPLIEFF impetuously and runs out onto the terrace.`,
  },
  {
    id: 'vanya-examination',
    authorGroup: 'Chekhov',
    title: 'The Examination',
    play: 'Uncle Vanya',
    author: 'Anton Chekhov (translator not named in the source edition)',
    location: 'Act III',
    characters: ['Helena', 'Astroff'],
    source: 'Project Gutenberg eBook #1756',
    verified: '2026-09-16',
    rightsNote: 'Public domain in the United States per Project Gutenberg. Text taken verbatim and verified line for line. This Gutenberg edition names no translator, so no translator credit is claimed. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'A two-role rehearsal cut: it opens as Astroff enters with his portfolio and stops just before the next character enters, on “that it is inevitable?”',
    contentNote: 'An unwanted romantic advance, physically pressed.',
    text: `ASTROFF comes in carrying a portfolio.

ASTROFF. How do you do? [Shakes hands with her] Do you want to see my
sketch?

HELENA. Yes, you promised to show me what you had been doing. Have you
time now?

ASTROFF. Of course I have!

He lays the portfolio on the table, takes out the sketch and fastens it
to the table with thumb-tacks.

ASTROFF. Where were you born?

HELENA. [Helping him] In St. Petersburg.

ASTROFF. And educated?

HELENA. At the Conservatory there.

ASTROFF. You don't find this life very interesting, I dare say?

HELENA. Oh, why not? It is true I don't know the country very well, but
I have read a great deal about it.

ASTROFF. I have my own desk there in Ivan's room. When I am absolutely
too exhausted to go on I drop everything and rush over here to forget
myself in this work for an hour or two. Ivan and Miss Sonia sit rattling
at their counting-boards, the cricket chirps, and I sit beside them and
paint, feeling warm and peaceful. But I don't permit myself this luxury
very often, only once a month. [Pointing to the picture] Look there!
That is a map of our country as it was fifty years ago. The green tints,
both dark and light, represent forests. Half the map, as you see, is
covered with it. Where the green is striped with red the forests were
inhabited by elk and wild goats. Here on this lake, lived great flocks
of swans and geese and ducks; as the old men say, there was a power of
birds of every kind. Now they have vanished like a cloud. Beside the
hamlets and villages, you see, I have dotted down here and there the
various settlements, farms, hermit's caves, and water-mills. This
country carried a great many cattle and horses, as you can see by the
quantity of blue paint. For instance, see how thickly it lies in this
part; there were great herds of them here, an average of three horses to
every house. [A pause] Now, look lower down. This is the country as it
was twenty-five years ago. Only a third of the map is green now with
forests. There are no goats left and no elk. The blue paint is lighter,
and so on, and so on. Now we come to the third part; our country as it
appears to-day. We still see spots of green, but not much. The elk, the
swans, the black-cock have disappeared. It is, on the whole, the picture
of a regular and slow decline which it will evidently only take about
ten or fifteen more years to complete. You may perhaps object that it
is the march of progress, that the old order must give place to the new,
and you might be right if roads had been run through these ruined woods,
or if factories and schools had taken their place. The people then would
have become better educated and healthier and richer, but as it is, we
have nothing of the sort. We have the same swamps and mosquitoes;
the same disease and want; the typhoid, the diphtheria, the burning
villages. We are confronted by the degradation of our country, brought
on by the fierce struggle for existence of the human race. It is the
consequence of the ignorance and unconsciousness of starving, shivering,
sick humanity that, to save its children, instinctively snatches
at everything that can warm it and still its hunger. So it destroys
everything it can lay its hands on, without a thought for the morrow.
And almost everything has gone, and nothing has been created to take its
place. [Coldly] But I see by your face that I am not interesting you.

HELENA. I know so little about such things!

ASTROFF. There is nothing to know. It simply isn't interesting, that's
all.

HELENA. Frankly, my thoughts were elsewhere. Forgive me! I want to
submit you to a little examination, but I am embarrassed and don't know
how to begin.

ASTROFF. An examination?

HELENA. Yes, but quite an innocent one. Sit down. [They sit down] It is
about a certain young girl I know. Let us discuss it like honest people,
like friends, and then forget what has passed between us, shall we?

ASTROFF. Very well.

HELENA. It is about my step-daughter, Sonia. Do you like her?

ASTROFF. Yes, I respect her.

HELENA. Do you like her--as a woman?

ASTROFF. [Slowly] No.

HELENA. One more word, and that will be the last. You have not noticed
anything?

ASTROFF. No, nothing.

HELENA. [Taking his hand] You do not love her. I see that in your eyes.
She is suffering. You must realise that, and not come here any more.

ASTROFF. My sun has set, yes, and then I haven't the time. [Shrugging
his shoulders] Where shall I find time for such things? [He is
embarrassed.]

HELENA. Bah! What an unpleasant conversation! I am as out of breath as
if I had been running three miles uphill. Thank heaven, that is over!
Now let us forget everything as if nothing had been said. You are
sensible. You understand. [A pause] I am actually blushing.

ASTROFF. If you had spoken a month ago I might perhaps have
considered it, but now--[He shrugs his shoulders] Of course, if she is
suffering--but I cannot understand why you had to put me through this
examination. [He searches her face with his eyes, and shakes his finger
at her] Oho, you are wily!

HELENA. What does this mean?

ASTROFF. [Laughing] You are a wily one! I admit that Sonia is suffering,
but what does this examination of yours mean? [He prevents her from
retorting, and goes on quickly] Please don't put on such a look of
surprise; you know perfectly well why I come here every day. Yes, you
know perfectly why and for whose sake I come! Oh, my sweet tigress!
don't look at me in that way; I am an old bird!

HELENA. [Perplexed] A tigress? I don't understand you.

ASTROFF. Beautiful, sleek tigress, you must have your victims! For a
whole month I have done nothing but seek you eagerly. I have thrown over
everything for you, and you love to see it. Now then, I am sure you knew
all this without putting me through your examination. [Crossing his arms
and bowing his head] I surrender. Here you have me--now, eat me.

HELENA. You have gone mad!

ASTROFF. You are afraid!

HELENA. I am a better and stronger woman than you think me. Good-bye.
[She tries to leave the room.]

ASTROFF. Why good-bye? Don't say good-bye, don't waste words. Oh, how
lovely you are--what hands! [He kisses her hands.]

HELENA. Enough of this! [She frees her hands] Leave the room! You have
forgotten yourself.

ASTROFF. Tell me, tell me, where can we meet to-morrow? [He puts his arm
around her] Don't you see that we must meet, that it is inevitable?`,
  },
  {
    id: 'threesisters-farewell',
    authorGroup: 'Chekhov',
    title: 'The Farewell',
    play: 'The Three Sisters',
    author: 'Anton Chekhov, translated by Julius West',
    location: 'Act IV',
    characters: ['Irina', 'Tuzenbach'],
    source: 'Project Gutenberg eBook #7986 (Plays by Anton Chekhov, Second Series)',
    verified: '2026-09-16',
    rightsNote: 'Project Gutenberg identifies this Julius West translation as public domain in the United States. Text taken verbatim and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'A two-role rehearsal cut: it opens on Tuzenbach’s line about the departing soldiers and ends with his exit. One distant call is heard; no third character speaks.',
    contentNote: 'A farewell shadowed by an impending offstage duel.',
    text: `TUZENBACH. He seems to be the only man in the town who is glad that the
soldiers are going.

IRINA. One can understand that. [Pause] The town will be empty.

TUZENBACH. My dear, I shall return soon.

IRINA. Where are you going?

TUZENBACH. I must go into the town and then... see the others off.

IRINA. It’s not true... Nicolai, why are you so absentminded to-day?
[Pause] What took place by the theatre yesterday?

TUZENBACH. [Making a movement of impatience] In an hour’s time I shall
return and be with you again. [Kisses her hands] My darling... [Looking
her closely in the face] it’s five years now since I fell in love with
you, and still I can’t get used to it, and you seem to me to grow more
and more beautiful. What lovely, wonderful hair! What eyes! I’m going to
take you away to-morrow. We shall work, we shall be rich, my dreams will
come true. You will be happy. There’s only one thing, one thing only:
you don’t love me!

IRINA. It isn’t in my power! I shall be your wife, I shall be true to
you, and obedient to you, but I can’t love you. What can I do! [Cries] I
have never been in love in my life. Oh, I used to think so much of love,
I have been thinking about it for so long by day and by night, but
my soul is like an expensive piano which is locked and the key lost.
[Pause] You seem so unhappy.

TUZENBACH. I didn’t sleep at night. There is nothing in my life so awful
as to be able to frighten me, only that lost key torments my soul and
does not let me sleep. Say something to me [Pause] say something to
me....

IRINA. What can I say, what?

TUZENBACH. Anything.

IRINA. Don’t! don’t! [Pause.]

TUZENBACH. It is curious how silly trivial little things, sometimes
for no apparent reason, become significant. At first you laugh at these
things, you think they are of no importance, you go on and you feel that
you haven’t got the strength to stop yourself. Oh don’t let’s talk about
it! I am happy. It is as if for the first time in my life I see these
firs, maples, beeches, and they all look at me inquisitively and wait.
What beautiful trees and how beautiful, when one comes to think of it,
life must be near them! [A shout of Co-ee! in the distance] It’s time
I went.... There’s a tree which has dried up but it still sways in the
breeze with the others. And so it seems to me that if I die, I shall
still take part in life in one way or another. Good-bye, dear....
[Kisses her hands] The papers which you gave me are on my table under
the calendar.

IRINA. I am coming with you.

TUZENBACH. [Nervously] No, no! [He goes quickly and stops in the avenue]
Irina!

IRINA. What is it?

TUZENBACH. [Not knowing what to say] I haven’t had any coffee to-day.
Tell them to make me some.... [He goes out quickly.]`,
  },
  {
    id: 'cherry-nonproposal',
    authorGroup: 'Chekhov',
    title: 'The Proposal That Never Comes',
    play: 'The Cherry Orchard',
    author: 'Anton Chekhov, translated by Julius West',
    location: 'Act IV',
    characters: ['Varya', 'Lopakhin'],
    source: 'Project Gutenberg eBook #7986 (Plays by Anton Chekhov, Second Series)',
    verified: '2026-09-16',
    rightsNote: 'Project Gutenberg identifies this Julius West translation as public domain in the United States. Text taken verbatim and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'A two-role rehearsal cut: it opens on Lopakhin alone just before Varya enters and stops at the final pause, before a voice calls from the doorway.',
    contentNote: null,
    text: `LOPAKHIN. [Looks at his watch] Yes.... [Pause.]

[There is a restrained laugh behind the door, a whisper, then VARYA
comes in.]

VARYA. [Looking at the luggage in silence] I can’t seem to find it....

LOPAKHIN. What are you looking for?

VARYA. I packed it myself and I don’t remember. [Pause.]

LOPAKHIN. Where are you going to now, Barbara Mihailovna?

VARYA. I? To the Ragulins.... I’ve got an agreement to go and look after
their house... as housekeeper or something.

LOPAKHIN. Is that at Yashnevo? It’s about fifty miles. [Pause] So life
in this house is finished now....

VARYA. [Looking at the luggage] Where is it?... perhaps I’ve put it away
in the trunk.... Yes, there’ll be no more life in this house....

LOPAKHIN. And I’m off to Kharkov at once... by this train. I’ve a lot of
business on hand. I’m leaving Epikhodov here... I’ve taken him on.

VARYA. Well, well!

LOPAKHIN. Last year at this time the snow was already falling, if you
remember, and now it’s nice and sunny. Only it’s rather cold.... There’s
three degrees of frost.

VARYA. I didn’t look. [Pause] And our thermometer’s broken.... [Pause.]`,
  },
  // Cut replaced 2026-09-16 by owner order: the earlier cut opened on
  // "Your consent!" and included Lane's delivery of the cigarette case
  // (three speakers). This cut is the strict two-hander from the same
  // act, running further, through the Willis's dinner beat.
  {
    id: 'earnest-cigarette-case',
    authorGroup: 'Wilde',
    title: 'The Cigarette Case',
    play: 'The Importance of Being Earnest',
    author: 'Oscar Wilde',
    location: 'Act I: an uninterrupted exchange, not the full act',
    characters: ['Jack Worthing', 'Algernon Moncrieff'],
    source: 'Project Gutenberg eBook #844',
    verified: '2026-09-16',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Algernon’s “I think that is rather mean of you, Ernest” just after Lane has delivered the cigarette case and left, and ends on “It is so shallow of them.”, the moment before Lane announces Lady Bracknell and Gwendolen.',
    context: 'Algernon has found an inscription in Jack’s cigarette case that casts doubt on Jack’s identity. He presses Jack for an explanation while Jack tries to recover control of the conversation.',
    contentNote: null,
    text: `ALGERNON.
I think that is rather mean of you, Ernest, I must say. [Opens case and
examines it.] However, it makes no matter, for, now that I look at the
inscription inside, I find that the thing isn’t yours after all.

JACK.
Of course it’s mine. [Moving to him.] You have seen me with it a
hundred times, and you have no right whatsoever to read what is written
inside. It is a very ungentlemanly thing to read a private cigarette
case.

ALGERNON.
Oh! it is absurd to have a hard and fast rule about what one should
read and what one shouldn’t. More than half of modern culture depends
on what one shouldn’t read.

JACK.
I am quite aware of the fact, and I don’t propose to discuss modern
culture. It isn’t the sort of thing one should talk of in private. I
simply want my cigarette case back.

ALGERNON.
Yes; but this isn’t your cigarette case. This cigarette case is a
present from some one of the name of Cecily, and you said you didn’t
know any one of that name.

JACK.
Well, if you want to know, Cecily happens to be my aunt.

ALGERNON.
Your aunt!

JACK.
Yes. Charming old lady she is, too. Lives at Tunbridge Wells. Just give
it back to me, Algy.

ALGERNON.
[Retreating to back of sofa.] But why does she call herself little
Cecily if she is your aunt and lives at Tunbridge Wells? [Reading.]
‘From little Cecily with her fondest love.’

JACK.
[Moving to sofa and kneeling upon it.] My dear fellow, what on earth is
there in that? Some aunts are tall, some aunts are not tall. That is a
matter that surely an aunt may be allowed to decide for herself. You
seem to think that every aunt should be exactly like your aunt! That is
absurd! For Heaven’s sake give me back my cigarette case. [Follows
Algernon round the room.]

ALGERNON.
Yes. But why does your aunt call you her uncle? ‘From little Cecily,
with her fondest love to her dear Uncle Jack.’ There is no objection, I
admit, to an aunt being a small aunt, but why an aunt, no matter what
her size may be, should call her own nephew her uncle, I can’t quite
make out. Besides, your name isn’t Jack at all; it is Ernest.

JACK.
It isn’t Ernest; it’s Jack.

ALGERNON.
You have always told me it was Ernest. I have introduced you to every
one as Ernest. You answer to the name of Ernest. You look as if your
name was Ernest. You are the most earnest-looking person I ever saw in
my life. It is perfectly absurd your saying that your name isn’t
Ernest. It’s on your cards. Here is one of them. [Taking it from case.]
‘Mr. Ernest Worthing, B. 4, The Albany.’ I’ll keep this as a proof that
your name is Ernest if ever you attempt to deny it to me, or to
Gwendolen, or to any one else. [Puts the card in his pocket.]

JACK.
Well, my name is Ernest in town and Jack in the country, and the
cigarette case was given to me in the country.

ALGERNON.
Yes, but that does not account for the fact that your small Aunt
Cecily, who lives at Tunbridge Wells, calls you her dear uncle. Come,
old boy, you had much better have the thing out at once.

JACK.
My dear Algy, you talk exactly as if you were a dentist. It is very
vulgar to talk like a dentist when one isn’t a dentist. It produces a
false impression.

ALGERNON.
Well, that is exactly what dentists always do. Now, go on! Tell me the
whole thing. I may mention that I have always suspected you of being a
confirmed and secret Bunburyist; and I am quite sure of it now.

JACK.
Bunburyist? What on earth do you mean by a Bunburyist?

ALGERNON.
I’ll reveal to you the meaning of that incomparable expression as soon
as you are kind enough to inform me why you are Ernest in town and Jack
in the country.

JACK.
Well, produce my cigarette case first.

ALGERNON.
Here it is. [Hands cigarette case.] Now produce your explanation, and
pray make it improbable. [Sits on sofa.]

JACK.
My dear fellow, there is nothing improbable about my explanation at
all. In fact it’s perfectly ordinary. Old Mr. Thomas Cardew, who
adopted me when I was a little boy, made me in his will guardian to his
grand-daughter, Miss Cecily Cardew. Cecily, who addresses me as her
uncle from motives of respect that you could not possibly appreciate,
lives at my place in the country under the charge of her admirable
governess, Miss Prism.

ALGERNON.
Where is that place in the country, by the way?

JACK.
That is nothing to you, dear boy. You are not going to be invited . . .
I may tell you candidly that the place is not in Shropshire.

ALGERNON.
I suspected that, my dear fellow! I have Bunburyed all over Shropshire
on two separate occasions. Now, go on. Why are you Ernest in town and
Jack in the country?

JACK.
My dear Algy, I don’t know whether you will be able to understand my
real motives. You are hardly serious enough. When one is placed in the
position of guardian, one has to adopt a very high moral tone on all
subjects. It’s one’s duty to do so. And as a high moral tone can hardly
be said to conduce very much to either one’s health or one’s happiness,
in order to get up to town I have always pretended to have a younger
brother of the name of Ernest, who lives in the Albany, and gets into
the most dreadful scrapes. That, my dear Algy, is the whole truth pure
and simple.

ALGERNON.
The truth is rarely pure and never simple. Modern life would be very
tedious if it were either, and modern literature a complete
impossibility!

JACK.
That wouldn’t be at all a bad thing.

ALGERNON.
Literary criticism is not your forte, my dear fellow. Don’t try it. You
should leave that to people who haven’t been at a University. They do
it so well in the daily papers. What you really are is a Bunburyist. I
was quite right in saying you were a Bunburyist. You are one of the
most advanced Bunburyists I know.

JACK.
What on earth do you mean?

ALGERNON.
You have invented a very useful younger brother called Ernest, in order
that you may be able to come up to town as often as you like. I have
invented an invaluable permanent invalid called Bunbury, in order that
I may be able to go down into the country whenever I choose. Bunbury is
perfectly invaluable. If it wasn’t for Bunbury’s extraordinary bad
health, for instance, I wouldn’t be able to dine with you at Willis’s
to-night, for I have been really engaged to Aunt Augusta for more than
a week.

JACK.
I haven’t asked you to dine with me anywhere to-night.

ALGERNON.
I know. You are absurdly careless about sending out invitations. It is
very foolish of you. Nothing annoys people so much as not receiving
invitations.

JACK.
You had much better dine with your Aunt Augusta.

ALGERNON.
I haven’t the smallest intention of doing anything of the kind. To
begin with, I dined there on Monday, and once a week is quite enough to
dine with one’s own relations. In the second place, whenever I do dine
there I am always treated as a member of the family, and sent down with
either no woman at all, or two. In the third place, I know perfectly
well whom she will place me next to, to-night. She will place me next
Mary Farquhar, who always flirts with her own husband across the
dinner-table. That is not very pleasant. Indeed, it is not even decent
. . . and that sort of thing is enormously on the increase. The amount
of women in London who flirt with their own husbands is perfectly
scandalous. It looks so bad. It is simply washing one’s clean linen in
public. Besides, now that I know you to be a confirmed Bunburyist I
naturally want to talk to you about Bunburying. I want to tell you the
rules.

JACK.
I’m not a Bunburyist at all. If Gwendolen accepts me, I am going to
kill my brother, indeed I think I’ll kill him in any case. Cecily is a
little too much interested in him. It is rather a bore. So I am going
to get rid of Ernest. And I strongly advise you to do the same with Mr.
. . . with your invalid friend who has the absurd name.

ALGERNON.
Nothing will induce me to part with Bunbury, and if you ever get
married, which seems to me extremely problematic, you will be very glad
to know Bunbury. A man who marries without knowing Bunbury has a very
tedious time of it.

JACK.
That is nonsense. If I marry a charming girl like Gwendolen, and she is
the only girl I ever saw in my life that I would marry, I certainly
won’t want to know Bunbury.

ALGERNON.
Then your wife will. You don’t seem to realise, that in married life
three is company and two is none.

JACK.
[Sententiously.] That, my dear young friend, is the theory that the
corrupt French Drama has been propounding for the last fifty years.

ALGERNON.
Yes; and that the happy English home has proved in half the time.

JACK.
For heaven’s sake, don’t try to be cynical. It’s perfectly easy to be
cynical.

ALGERNON.
My dear fellow, it isn’t easy to be anything nowadays. There’s such a
lot of beastly competition about. [The sound of an electric bell is
heard.] Ah! that must be Aunt Augusta. Only relatives, or creditors,
ever ring in that Wagnerian manner. Now, if I get her out of the way
for ten minutes, so that you can have an opportunity for proposing to
Gwendolen, may I dine with you to-night at Willis’s?

JACK.
I suppose so, if you want to.

ALGERNON.
Yes, but you must be serious about it. I hate people who are not
serious about meals. It is so shallow of them.`,
  },
  {
    id: 'earnest-rivals',
    authorGroup: 'Wilde',
    title: 'The Rival Engagements',
    play: 'The Importance of Being Earnest',
    author: 'Oscar Wilde',
    location: 'Act II: an uninterrupted exchange, not the full act',
    characters: ['Cecily Cardew', 'Gwendolen Fairfax'],
    source: 'Project Gutenberg eBook #844',
    verified: '2026-09-16',
    corrections: [['lorgnettte', 'lorgnette']],
    rightsNote: 'Public domain in the United States. Text taken from the Project Gutenberg plain-text edition and verified against it line for line. Obvious mechanical printing errors in that edition are corrected; each correction is recorded in this record. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Gwendolen’s entrance after Merriman announces her and ends on “our social spheres have been widely different,” the beat before the servants enter with tea. It is the private confrontation, not the complete tea scene.',
    context: 'Gwendolen visits Cecily expecting a cordial meeting. Each soon believes she is engaged to the same man, and their courtesy becomes a contest.',
    contentNote: null,
    text: `[Enter Gwendolen.]

[Exit Merriman.]

CECILY.
[Advancing to meet her.] Pray let me introduce myself to you. My name
is Cecily Cardew.

GWENDOLEN.
Cecily Cardew? [Moving to her and shaking hands.] What a very sweet
name! Something tells me that we are going to be great friends. I like
you already more than I can say. My first impressions of people are
never wrong.

CECILY.
How nice of you to like me so much after we have known each other such
a comparatively short time. Pray sit down.

GWENDOLEN.
[Still standing up.] I may call you Cecily, may I not?

CECILY.
With pleasure!

GWENDOLEN.
And you will always call me Gwendolen, won’t you?

CECILY.
If you wish.

GWENDOLEN.
Then that is all quite settled, is it not?

CECILY.
I hope so. [A pause. They both sit down together.]

GWENDOLEN.
Perhaps this might be a favourable opportunity for my mentioning who I
am. My father is Lord Bracknell. You have never heard of papa, I
suppose?

CECILY.
I don’t think so.

GWENDOLEN.
Outside the family circle, papa, I am glad to say, is entirely unknown.
I think that is quite as it should be. The home seems to me to be the
proper sphere for the man. And certainly once a man begins to neglect
his domestic duties he becomes painfully effeminate, does he not? And I
don’t like that. It makes men so very attractive. Cecily, mamma, whose
views on education are remarkably strict, has brought me up to be
extremely short-sighted; it is part of her system; so do you mind my
looking at you through my glasses?

CECILY.
Oh! not at all, Gwendolen. I am very fond of being looked at.

GWENDOLEN.
[After examining Cecily carefully through a lorgnette.] You are here on
a short visit, I suppose.

CECILY.
Oh no! I live here.

GWENDOLEN.
[Severely.] Really? Your mother, no doubt, or some female relative of
advanced years, resides here also?

CECILY.
Oh no! I have no mother, nor, in fact, any relations.

GWENDOLEN.
Indeed?

CECILY.
My dear guardian, with the assistance of Miss Prism, has the arduous
task of looking after me.

GWENDOLEN.
Your guardian?

CECILY.
Yes, I am Mr. Worthing’s ward.

GWENDOLEN.
Oh! It is strange he never mentioned to me that he had a ward. How
secretive of him! He grows more interesting hourly. I am not sure,
however, that the news inspires me with feelings of unmixed delight.
[Rising and going to her.] I am very fond of you, Cecily; I have liked
you ever since I met you! But I am bound to state that now that I know
that you are Mr. Worthing’s ward, I cannot help expressing a wish you
were—well, just a little older than you seem to be—and not quite so
very alluring in appearance. In fact, if I may speak candidly—

CECILY.
Pray do! I think that whenever one has anything unpleasant to say, one
should always be quite candid.

GWENDOLEN.
Well, to speak with perfect candour, Cecily, I wish that you were fully
forty-two, and more than usually plain for your age. Ernest has a
strong upright nature. He is the very soul of truth and honour.
Disloyalty would be as impossible to him as deception. But even men of
the noblest possible moral character are extremely susceptible to the
influence of the physical charms of others. Modern, no less than
Ancient History, supplies us with many most painful examples of what I
refer to. If it were not so, indeed, History would be quite unreadable.

CECILY.
I beg your pardon, Gwendolen, did you say Ernest?

GWENDOLEN.
Yes.

CECILY.
Oh, but it is not Mr. Ernest Worthing who is my guardian. It is his
brother—his elder brother.

GWENDOLEN.
[Sitting down again.] Ernest never mentioned to me that he had a
brother.

CECILY.
I am sorry to say they have not been on good terms for a long time.

GWENDOLEN.
Ah! that accounts for it. And now that I think of it I have never heard
any man mention his brother. The subject seems distasteful to most men.
Cecily, you have lifted a load from my mind. I was growing almost
anxious. It would have been terrible if any cloud had come across a
friendship like ours, would it not? Of course you are quite, quite sure
that it is not Mr. Ernest Worthing who is your guardian?

CECILY.
Quite sure. [A pause.] In fact, I am going to be his.

GWENDOLEN.
[Inquiringly.] I beg your pardon?

CECILY.
[Rather shy and confidingly.] Dearest Gwendolen, there is no reason why
I should make a secret of it to you. Our little county newspaper is
sure to chronicle the fact next week. Mr. Ernest Worthing and I are
engaged to be married.

GWENDOLEN.
[Quite politely, rising.] My darling Cecily, I think there must be some
slight error. Mr. Ernest Worthing is engaged to me. The announcement
will appear in the _Morning Post_ on Saturday at the latest.

CECILY.
[Very politely, rising.] I am afraid you must be under some
misconception. Ernest proposed to me exactly ten minutes ago. [Shows
diary.]

GWENDOLEN.
[Examines diary through her lorgnette carefully.] It is certainly very
curious, for he asked me to be his wife yesterday afternoon at 5.30. If
you would care to verify the incident, pray do so. [Produces diary of
her own.] I never travel without my diary. One should always have
something sensational to read in the train. I am so sorry, dear Cecily,
if it is any disappointment to you, but I am afraid I have the prior
claim.

CECILY.
It would distress me more than I can tell you, dear Gwendolen, if it
caused you any mental or physical anguish, but I feel bound to point
out that since Ernest proposed to you he clearly has changed his mind.

GWENDOLEN.
[Meditatively.] If the poor fellow has been entrapped into any foolish
promise I shall consider it my duty to rescue him at once, and with a
firm hand.

CECILY.
[Thoughtfully and sadly.] Whatever unfortunate entanglement my dear boy
may have got into, I will never reproach him with it after we are
married.

GWENDOLEN.
Do you allude to me, Miss Cardew, as an entanglement? You are
presumptuous. On an occasion of this kind it becomes more than a moral
duty to speak one’s mind. It becomes a pleasure.

CECILY.
Do you suggest, Miss Fairfax, that I entrapped Ernest into an
engagement? How dare you? This is no time for wearing the shallow mask
of manners. When I see a spade I call it a spade.

GWENDOLEN.
[Satirically.] I am glad to say that I have never seen a spade. It is
obvious that our social spheres have been widely different.`,
  },
  {
    id: 'windermere-home',
    authorGroup: 'Wilde',
    title: 'Take Me Home',
    play: 'Lady Windermere’s Fan',
    author: 'Oscar Wilde',
    location: 'Act III: an uninterrupted exchange, not the full act',
    characters: ['Lady Windermere', 'Mrs. Erlynne'],
    speakerLabels: ['LADY WINDERMERE', 'MRS. ERLYNNE'],
    source: 'Project Gutenberg eBook #790',
    verified: '2026-09-16',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Mrs. Erlynne’s entrance and ends on “Here. Put it on. Come at once!”, before voices are heard outside.',
    context: 'Lady Windermere has fled to another man’s rooms after believing her husband betrayed her. Mrs. Erlynne comes to bring her home without revealing the full truth about herself.',
    contentNote: null,
    text: `[_Enter_ MRS. ERLYNNE _L._]

MRS. ERLYNNE.  Lady Windermere!  [LADY WINDERMERE _starts and looks up_.
_Then recoils in contempt_.]  Thank Heaven I am in time.  You must go
back to your husband’s house immediately.

LADY WINDERMERE.  Must?

MRS. ERLYNNE.  [_Authoritatively_.]  Yes, you must!  There is not a
second to be lost.  Lord Darlington may return at any moment.

LADY WINDERMERE.  Don’t come near me!

MRS. ERLYNNE.  Oh!  You are on the brink of ruin, you are on the brink of
a hideous precipice.  You must leave this place at once, my carriage is
waiting at the corner of the street.  You must come with me and drive
straight home.

[LADY WINDERMERE _throws off her cloak and flings it on the sofa_.]

What are you doing?

LADY WINDERMERE.  Mrs. Erlynne—if you had not come here, I would have
gone back.  But now that I see you, I feel that nothing in the whole
world would induce me to live under the same roof as Lord Windermere.
You fill me with horror.  There is something about you that stirs the
wildest—rage within me.  And I know why you are here.  My husband sent
you to lure me back that I might serve as a blind to whatever relations
exist between you and him.

MRS. ERLYNNE.  Oh!  You don’t think that—you can’t.

LADY WINDERMERE.  Go back to my husband, Mrs. Erlynne.  He belongs to you
and not to me.  I suppose he is afraid of a scandal.  Men are such
cowards.  They outrage every law of the world, and are afraid of the
world’s tongue.  But he had better prepare himself.  He shall have a
scandal.  He shall have the worst scandal there has been in London for
years.  He shall see his name in every vile paper, mine on every hideous
placard.

MRS. ERLYNNE.  No—no—

LADY WINDERMERE.  Yes! he shall.  Had he come himself, I admit I would
have gone back to the life of degradation you and he had prepared for
me—I was going back—but to stay himself at home, and to send you as his
messenger—oh! it was infamous—infamous.

MRS. ERLYNNE.  [_C._]  Lady Windermere, you wrong me horribly—you wrong
your husband horribly.  He doesn’t know you are here—he thinks you are
safe in your own house.  He thinks you are asleep in your own room.  He
never read the mad letter you wrote to him!

LADY WINDERMERE.  [_R._]  Never read it!

MRS. ERLYNNE.  No—he knows nothing about it.

LADY WINDERMERE.  How simple you think me!  [_Going to her_.]  You are
lying to me!

MRS. ERLYNNE.  [_Restraining herself_.]  I am not.  I am telling you the
truth.

LADY WINDERMERE.  If my husband didn’t read my letter, how is it that you
are here?  Who told you I had left the house you were shameless enough to
enter?  Who told you where I had gone to?  My husband told you, and sent
you to decoy me back.  [_Crosses L._]

MRS. ERLYNNE.  [_R.C._]  Your husband has never seen the letter.  I—saw
it, I opened it.  I—read it.

LADY WINDERMERE.  [_Turning to her_.]  You opened a letter of mine to my
husband?  You wouldn’t dare!

MRS. ERLYNNE.  Dare!  Oh! to save you from the abyss into which you are
falling, there is nothing in the world I would not dare, nothing in the
whole world.  Here is the letter.  Your husband has never read it.  He
never shall read it.  [_Going to fireplace_.]  It should never have been
written.  [_Tears it and throws it into the fire_.]

LADY WINDERMERE.  [_With infinite contempt in her voice and look_.]  How
do I know that that was my letter after all?  You seem to think the
commonest device can take me in!

MRS. ERLYNNE.  Oh! why do you disbelieve everything I tell you?  What
object do you think I have in coming here, except to save you from utter
ruin, to save you from the consequence of a hideous mistake?  That letter
that is burnt now _was_ your letter.  I swear it to you!

LADY WINDERMERE.  [_Slowly_.]  You took good care to burn it before I had
examined it.  I cannot trust you.  You, whose whole life is a lie, could
you speak the truth about anything?  [_Sits down_.]

MRS. ERLYNNE.  [_Hurriedly_.]  Think as you like about me—say what you
choose against me, but go back, go back to the husband you love.

LADY WINDERMERE.  [_Sullenly_.]  I do _not_ love him!

MRS. ERLYNNE.  You do, and you know that he loves you.

LADY WINDERMERE.  He does not understand what love is.  He understands it
as little as you do—but I see what you want.  It would be a great
advantage for you to get me back.  Dear Heaven! what a life I would have
then!  Living at the mercy of a woman who has neither mercy nor pity in
her, a woman whom it is an infamy to meet, a degradation to know, a vile
woman, a woman who comes between husband and wife!

MRS. ERLYNNE.  [_With a gesture of despair_.]  Lady Windermere, Lady
Windermere, don’t say such terrible things.  You don’t know how terrible
they are, how terrible and how unjust.  Listen, you must listen!  Only go
back to your husband, and I promise you never to communicate with him
again on any pretext—never to see him—never to have anything to do with
his life or yours.  The money that he gave me, he gave me not through
love, but through hatred, not in worship, but in contempt.  The hold I
have over him—

LADY WINDERMERE.  [_Rising_.]  Ah! you admit you have a hold!

MRS. ERLYNNE.  Yes, and I will tell you what it is.  It is his love for
you, Lady Windermere.

LADY WINDERMERE.  You expect me to believe that?

MRS. ERLYNNE.  You must believe it!  It is true.  It is his love for you
that has made him submit to—oh! call it what you like, tyranny, threats,
anything you choose.  But it is his love for you.  His desire to spare
you—shame, yes, shame and disgrace.

LADY WINDERMERE.  What do you mean?  You are insolent!  What have I to do
with you?

MRS. ERLYNNE.  [_Humbly_.]  Nothing.  I know it—but I tell you that your
husband loves you—that you may never meet with such love again in your
whole life—that such love you will never meet—and that if you throw it
away, the day may come when you will starve for love and it will not be
given to you, beg for love and it will be denied you—Oh! Arthur loves
you!

LADY WINDERMERE.  Arthur?  And you tell me there is nothing between you?

MRS. ERLYNNE.  Lady Windermere, before Heaven your husband is guiltless
of all offence towards you!  And I—I tell you that had it ever occurred
to me that such a monstrous suspicion would have entered your mind, I
would have died rather than have crossed your life or his—oh! died,
gladly died!  [_Moves away to sofa R._]

LADY WINDERMERE.  You talk as if you had a heart.  Women like you have no
hearts.  Heart is not in you.  You are bought and sold.  [_Sits L.C._]

MRS. ERLYNNE.  [_Starts_, _with a gesture of pain_.  _Then restrains
herself_, _and comes over to where_ LADY WINDERMERE _is sitting_.  _As
she speaks_, _she stretches out her hands towards her_, _but does not
dare to touch her_.]  Believe what you choose about me.  I am not worth a
moment’s sorrow.  But don’t spoil your beautiful young life on my
account!  You don’t know what may be in store for you, unless you leave
this house at once.  You don’t know what it is to fall into the pit, to
be despised, mocked, abandoned, sneered at—to be an outcast! to find the
door shut against one, to have to creep in by hideous byways, afraid
every moment lest the mask should be stripped from one’s face, and all
the while to hear the laughter, the horrible laughter of the world, a
thing more tragic than all the tears the world has ever shed.  You don’t
know what it is.  One pays for one’s sin, and then one pays again, and
all one’s life one pays.  You must never know that.—As for me, if
suffering be an expiation, then at this moment I have expiated all my
faults, whatever they have been; for to-night you have made a heart in
one who had it not, made it and broken it.—But let that pass.  I may have
wrecked my own life, but I will not let you wreck yours.  You—why, you
are a mere girl, you would be lost.  You haven’t got the kind of brains
that enables a woman to get back.  You have neither the wit nor the
courage.  You couldn’t stand dishonour!  No!  Go back, Lady Windermere,
to the husband who loves you, whom you love.  You have a child, Lady
Windermere.  Go back to that child who even now, in pain or in joy, may
be calling to you.  [LADY WINDERMERE _rises_.]  God gave you that child.
He will require from you that you make his life fine, that you watch over
him.  What answer will you make to God if his life is ruined through you?
Back to your house, Lady Windermere—your husband loves you!  He has never
swerved for a moment from the love he bears you.  But even if he had a
thousand loves, you must stay with your child.  If he was harsh to you,
you must stay with your child.  If he ill-treated you, you must stay with
your child.  If he abandoned you, your place is with your child.

[LADY WINDERMERE _bursts into tears and buries her face in her hands_.]

[_Rushing to her_.]  Lady Windermere!

LADY WINDERMERE.  [_Holding out her hands to her_, _helplessly_, _as a
child might do_.]  Take me home.  Take me home.

MRS. ERLYNNE.  [_Is about to embrace her_.  _Then restrains herself_.
_There is a look of wonderful joy in her face_.]  Come!  Where is your
cloak?  [_Getting it from sofa_.]  Here.  Put it on.  Come at once!`,
  },
  {
    id: 'ideal-brooch',
    authorGroup: 'Wilde',
    title: 'The Brooch',
    play: 'An Ideal Husband',
    author: 'Oscar Wilde',
    location: 'Act III: an uninterrupted exchange, not the full act',
    characters: ['Lord Goring', 'Mrs. Cheveley'],
    speakerLabels: ['LORD GORING', 'MRS. CHEVELEY'],
    source: 'Project Gutenberg eBook #885',
    verified: '2026-09-16',
    corrections: [['finds is', 'finds it'], ['It was . . a present', 'It was . . . a present']],
    rightsNote: 'Public domain in the United States. Text taken from the Project Gutenberg plain-text edition and verified against it line for line. Obvious mechanical printing errors in that edition are corrected; each correction is recorded in this record. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Mrs. Cheveley’s mock curtsey after Sir Robert leaves and ends on “You shall not leave my room till I have got it.”, the moment before she reaches the bell and Phipps enters.',
    context: 'Mrs. Cheveley holds evidence that could ruin Sir Robert Chiltern. Lord Goring tries to outmaneuver her, but both have more than one piece of leverage.',
    contentNote: null,
    text: `MRS. CHEVELEY.  [_With a mock curtsey_]  Good evening, Lord Goring!

LORD GORING.  Mrs. Cheveley!  Great heavens! . . . May I ask what you
were doing in my drawing-room?

MRS. CHEVELEY.  Merely listening.  I have a perfect passion for listening
through keyholes.  One always hears such wonderful things through them.

LORD GORING.  Doesn’t that sound rather like tempting Providence?

MRS. CHEVELEY.  Oh! surely Providence can resist temptation by this time.
[_Makes a sign to him to take her cloak off_, _which he does_.]

LORD GORING.  I am glad you have called.  I am going to give you some
good advice.

MRS. CHEVELEY.  Oh! pray don’t.  One should never give a woman anything
that she can’t wear in the evening.

LORD GORING.  I see you are quite as wilful as you used to be.

MRS. CHEVELEY.  Far more!  I have greatly improved.  I have had more
experience.

LORD GORING.  Too much experience is a dangerous thing.  Pray have a
cigarette.  Half the pretty women in London smoke cigarettes.  Personally
I prefer the other half.

MRS. CHEVELEY.  Thanks.  I never smoke.  My dressmaker wouldn’t like it,
and a woman’s first duty in life is to her dressmaker, isn’t it?  What
the second duty is, no one has as yet discovered.

LORD GORING.  You have come here to sell me Robert Chiltern’s letter,
haven’t you?

MRS. CHEVELEY.  To offer it to you on conditions.  How did you guess
that?

LORD GORING.  Because you haven’t mentioned the subject.  Have you got it
with you?

MRS. CHEVELEY.  [_Sitting down_.]  Oh, no!  A well-made dress has no
pockets.

LORD GORING.  What is your price for it?

MRS. CHEVELEY.  How absurdly English you are!  The English think that a
cheque-book can solve every problem in life.  Why, my dear Arthur, I have
very much more money than you have, and quite as much as Robert Chiltern
has got hold of.  Money is not what I want.

LORD GORING.  What do you want then, Mrs. Cheveley?

MRS. CHEVELEY.  Why don’t you call me Laura?

LORD GORING.  I don’t like the name.

MRS. CHEVELEY.  You used to adore it.

LORD GORING.  Yes: that’s why.  [MRS. CHEVELEY _motions to him to sit
down beside her_.  _He smiles_, _and does so_.]

MRS. CHEVELEY.  Arthur, you loved me once.

LORD GORING.  Yes.

MRS. CHEVELEY.  And you asked me to be your wife.

LORD GORING.  That was the natural result of my loving you.

MRS. CHEVELEY.  And you threw me over because you saw, or said you saw,
poor old Lord Mortlake trying to have a violent flirtation with me in the
conservatory at Tenby.

LORD GORING.  I am under the impression that my lawyer settled that
matter with you on certain terms . . . dictated by yourself.

MRS. CHEVELEY.  At that time I was poor; you were rich.

LORD GORING.  Quite so.  That is why you pretended to love me.

MRS. CHEVELEY.  [_Shrugging her shoulders_.]  Poor old Lord Mortlake, who
had only two topics of conversation, his gout and his wife!  I never
could quite make out which of the two he was talking about.  He used the
most horrible language about them both.  Well, you were silly, Arthur.
Why, Lord Mortlake was never anything more to me than an amusement.  One
of those utterly tedious amusements one only finds at an English country
house on an English country Sunday.  I don’t think any one at all morally
responsible for what he or she does at an English country house.

LORD GORING.  Yes.  I know lots of people think that.

MRS. CHEVELEY.  I loved you, Arthur.

LORD GORING.  My dear Mrs. Cheveley, you have always been far too clever
to know anything about love.

MRS. CHEVELEY.  I did love you.  And you loved me.  You know you loved
me; and love is a very wonderful thing.  I suppose that when a man has
once loved a woman, he will do anything for her, except continue to love
her?  [_Puts her hand on his_.]

LORD GORING.  [_Taking his hand away quietly_.]  Yes: except that.

MRS. CHEVELEY.  [_After a pause_.]  I am tired of living abroad.  I want
to come back to London.  I want to have a charming house here.  I want to
have a salon.  If one could only teach the English how to talk, and the
Irish how to listen, society here would be quite civilised.  Besides, I
have arrived at the romantic stage.  When I saw you last night at the
Chilterns’, I knew you were the only person I had ever cared for, if I
ever have cared for anybody, Arthur.  And so, on the morning of the day
you marry me, I will give you Robert Chiltern’s letter.  That is my
offer.  I will give it to you now, if you promise to marry me.

LORD GORING.  Now?

MRS. CHEVELEY.  [_Smiling_.]  To-morrow.

LORD GORING.  Are you really serious?

MRS. CHEVELEY.  Yes, quite serious.

LORD GORING.  I should make you a very bad husband.

MRS. CHEVELEY.  I don’t mind bad husbands.  I have had two.  They amused
me immensely.

LORD GORING.  You mean that you amused yourself immensely, don’t you?

MRS. CHEVELEY.  What do you know about my married life?

LORD GORING.  Nothing: but I can read it like a book.

MRS. CHEVELEY.  What book?

LORD GORING.  [_Rising_.]  The Book of Numbers.

MRS. CHEVELEY.  Do you think it is quite charming of you to be so rude to
a woman in your own house?

LORD GORING.  In the case of very fascinating women, sex is a challenge,
not a defence.

MRS. CHEVELEY.  I suppose that is meant for a compliment.  My dear
Arthur, women are never disarmed by compliments.  Men always are.  That
is the difference between the two sexes.

LORD GORING.  Women are never disarmed by anything, as far as I know
them.

MRS. CHEVELEY.  [_After a pause_.]  Then you are going to allow your
greatest friend, Robert Chiltern, to be ruined, rather than marry some
one who really has considerable attractions left.  I thought you would
have risen to some great height of self-sacrifice, Arthur.  I think you
should.  And the rest of your life you could spend in contemplating your
own perfections.

LORD GORING.  Oh! I do that as it is.  And self-sacrifice is a thing that
should be put down by law.  It is so demoralising to the people for whom
one sacrifices oneself.  They always go to the bad.

MRS. CHEVELEY.  As if anything could demoralise Robert Chiltern!  You
seem to forget that I know his real character.

LORD GORING.  What you know about him is not his real character.  It was
an act of folly done in his youth, dishonourable, I admit, shameful, I
admit, unworthy of him, I admit, and therefore . . . not his true
character.

MRS. CHEVELEY.  How you men stand up for each other!

LORD GORING.  How you women war against each other!

MRS. CHEVELEY.  [_Bitterly_.]  I only war against one woman, against
Gertrude Chiltern.  I hate her.  I hate her now more than ever.

LORD GORING.  Because you have brought a real tragedy into her life, I
suppose.

MRS. CHEVELEY.  [_With a sneer_.]  Oh, there is only one real tragedy in
a woman’s life.  The fact that her past is always her lover, and her
future invariably her husband.

LORD GORING.  Lady Chiltern knows nothing of the kind of life to which
you are alluding.

MRS. CHEVELEY.  A woman whose size in gloves is seven and three-quarters
never knows much about anything.  You know Gertrude has always worn seven
and three-quarters?  That is one of the reasons why there was never any
moral sympathy between us. . . . Well, Arthur, I suppose this romantic
interview may be regarded as at an end.  You admit it was romantic, don’t
you?  For the privilege of being your wife I was ready to surrender a
great prize, the climax of my diplomatic career.  You decline.  Very
well.  If Sir Robert doesn’t uphold my Argentine scheme, I expose him.
_Voilà tout_.

LORD GORING.  You mustn’t do that.  It would be vile, horrible, infamous.

MRS. CHEVELEY.  [_Shrugging her shoulders_.]  Oh! don’t use big words.
They mean so little.  It is a commercial transaction.  That is all.
There is no good mixing up sentimentality in it.  I offered to sell
Robert Chiltern a certain thing.  If he won’t pay me my price, he will
have to pay the world a greater price.  There is no more to be said.  I
must go.  Good-bye.  Won’t you shake hands?

LORD GORING.  With you?  No.  Your transaction with Robert Chiltern may
pass as a loathsome commercial transaction of a loathsome commercial age;
but you seem to have forgotten that you came here to-night to talk of
love, you whose lips desecrated the word love, you to whom the thing is a
book closely sealed, went this afternoon to the house of one of the most
noble and gentle women in the world to degrade her husband in her eyes,
to try and kill her love for him, to put poison in her heart, and
bitterness in her life, to break her idol, and, it may be, spoil her
soul.  That I cannot forgive you.  That was horrible.  For that there can
be no forgiveness.

MRS. CHEVELEY.  Arthur, you are unjust to me.  Believe me, you are quite
unjust to me.  I didn’t go to taunt Gertrude at all.  I had no idea of
doing anything of the kind when I entered.  I called with Lady Markby
simply to ask whether an ornament, a jewel, that I lost somewhere last
night, had been found at the Chilterns’.  If you don’t believe me, you
can ask Lady Markby.  She will tell you it is true.  The scene that
occurred happened after Lady Markby had left, and was really forced on me
by Gertrude’s rudeness and sneers.  I called, oh!—a little out of malice
if you like—but really to ask if a diamond brooch of mine had been found.
That was the origin of the whole thing.

LORD GORING.  A diamond snake-brooch with a ruby?

MRS. CHEVELEY.  Yes.  How do you know?

LORD GORING.  Because it is found.  In point of fact, I found it myself,
and stupidly forgot to tell the butler anything about it as I was
leaving.  [_Goes over to the writing-table and pulls out the drawers_.]
It is in this drawer.  No, that one.  This is the brooch, isn’t it?
[_Holds up the brooch_.]

MRS. CHEVELEY.  Yes.  I am so glad to get it back.  It was . . . a present.

LORD GORING.  Won’t you wear it?

MRS. CHEVELEY.  Certainly, if you pin it in.  [LORD GORING _suddenly
clasps it on her arm_.]  Why do you put it on as a bracelet?  I never
knew it could be worn as a bracelet.

LORD GORING.  Really?

MRS. CHEVELEY.  [_Holding out her handsome arm_.]  No; but it looks very
well on me as a bracelet, doesn’t it?

LORD GORING.  Yes; much better than when I saw it last.

MRS. CHEVELEY.  When did you see it last?

LORD GORING.  [_Calmly_.]  Oh, ten years ago, on Lady Berkshire, from
whom you stole it.

MRS. CHEVELEY.  [_Starting_.]  What do you mean?

LORD GORING.  I mean that you stole that ornament from my cousin, Mary
Berkshire, to whom I gave it when she was married.  Suspicion fell on a
wretched servant, who was sent away in disgrace.  I recognised it last
night.  I determined to say nothing about it till I had found the thief.
I have found the thief now, and I have heard her own confession.

MRS. CHEVELEY.  [_Tossing her head_.]  It is not true.

LORD GORING.  You know it is true.  Why, thief is written across your
face at this moment.

MRS. CHEVELEY.  I will deny the whole affair from beginning to end.  I
will say that I have never seen this wretched thing, that it was never in
my possession.

[MRS. CHEVELEY _tries to get the bracelet off her arm_, _but fails_.
LORD GORING _looks on amused_.  _Her thin fingers tear at the jewel to no
purpose_.  _A curse breaks from her_.]

LORD GORING.  The drawback of stealing a thing, Mrs. Cheveley, is that
one never knows how wonderful the thing that one steals is.  You can’t
get that bracelet off, unless you know where the spring is.  And I see
you don’t know where the spring is.  It is rather difficult to find.

MRS. CHEVELEY.  You brute!  You coward!  [_She tries again to unclasp the
bracelet_, _but fails_.]

LORD GORING.  Oh! don’t use big words.  They mean so little.

MRS. CHEVELEY.  [_Again tears at the bracelet in a paroxysm of rage_,
_with inarticulate sounds_.  _Then stops_, _and looks at_ LORD GORING.]
What are you going to do?

LORD GORING.  I am going to ring for my servant.  He is an admirable
servant.  Always comes in the moment one rings for him.  When he comes I
will tell him to fetch the police.

MRS. CHEVELEY.  [_Trembling_.]  The police?  What for?

LORD GORING.  To-morrow the Berkshires will prosecute you.  That is what
the police are for.

MRS. CHEVELEY.  [_Is now in an agony of physical terror_.  _Her face is
distorted_.  _Her mouth awry_.  _A mask has fallen from her_.  _She is_,
_for the moment_, _dreadful to look at_.]  Don’t do that.  I will do
anything you want.  Anything in the world you want.

LORD GORING.  Give me Robert Chiltern’s letter.

MRS. CHEVELEY.  Stop! Stop!  Let me have time to think.

LORD GORING.  Give me Robert Chiltern’s letter.

MRS. CHEVELEY.  I have not got it with me.  I will give it to you
to-morrow.

LORD GORING.  You know you are lying.  Give it to me at once.  [MRS.
CHEVELEY _pulls the letter out_, _and hands it to him_.  _She is horribly
pale_.]  This is it?

MRS. CHEVELEY.  [_In a hoarse voice_.]  Yes.

LORD GORING.  [_Takes the letter_, _examines it_, _sighs_, _and burns it
with the lamp_.]  For so well-dressed a woman, Mrs. Cheveley, you have
moments of admirable common sense.  I congratulate you.

MRS. CHEVELEY.  [_Catches sight of_ LADY CHILTERN’S _letter_, _the cover
of which is just showing from under the blotting-book_.]  Please get me a
glass of water.

LORD GORING.  Certainly.  [_Goes to the corner of the room and pours out
a glass of water_.  _While his back is turned_ MRS. CHEVELEY _steals_
LADY CHILTERN’S _letter_.  _When_ LORD GORING _returns the glass she
refuses it with a gesture_.]

MRS. CHEVELEY.  Thank you.  Will you help me on with my cloak?

LORD GORING.  With pleasure.  [_Puts her cloak on_.]

MRS. CHEVELEY.  Thanks.  I am never going to try to harm Robert Chiltern
again.

LORD GORING.  Fortunately you have not the chance, Mrs. Cheveley.

MRS. CHEVELEY.  Well, if even I had the chance, I wouldn’t.  On the
contrary, I am going to render him a great service.

LORD GORING.  I am charmed to hear it.  It is a reformation.

MRS. CHEVELEY.  Yes.  I can’t bear so upright a gentleman, so honourable
an English gentleman, being so shamefully deceived, and so—

LORD GORING.  Well?

MRS. CHEVELEY.  I find that somehow Gertrude Chiltern’s dying speech and
confession has strayed into my pocket.

LORD GORING.  What do you mean?

MRS. CHEVELEY.  [_With a bitter note of triumph in her voice_.]  I mean
that I am going to send Robert Chiltern the love-letter his wife wrote to
you to-night.

LORD GORING.  Love-letter?

MRS. CHEVELEY.  [_Laughing_.]  ‘I want you.  I trust you.  I am coming to
you.  Gertrude.’

[LORD GORING _rushes to the bureau and takes up the envelope_, _finds it
empty_, _and turns round_.]

LORD GORING.  You wretched woman, must you always be thieving?  Give me
back that letter.  I’ll take it from you by force.  You shall not leave
my room till I have got it.`,
  },
  {
    id: 'woman-refusal',
    authorGroup: 'Wilde',
    title: 'The Final Refusal',
    play: 'A Woman of No Importance',
    author: 'Oscar Wilde',
    location: 'Act IV: an uninterrupted exchange, not the full act',
    characters: ['Mrs. Arbuthnot', 'Lord Illingworth'],
    speakerLabels: ['MRS. ARBUTHNOT', 'LORD ILLINGWORTH'],
    source: 'Project Gutenberg eBook #854',
    verified: '2026-09-16',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Lord Illingworth’s entrance as Alice leaves and ends on “He would have said it.”, before Gerald and Hester return from the garden.',
    context: 'Gerald has learned that Lord Illingworth is his father. Illingworth offers money and status as a solution, but Mrs. Arbuthnot refuses to let him define what her son needs.',
    contentNote: 'Frank period treatment of illegitimacy and its social consequences.',
    text: `[LORD ILLINGWORTH _enters_.  MRS. ARBUTHNOT _sees him in the glass and
starts_, _but does not turn round_.  _Exit_ ALICE.]  What can you have to
say to me to-day, George Harford?  You can have nothing to say to me.
You must leave this house.

LORD ILLINGWORTH.  Rachel, Gerald knows everything about you and me now,
so some arrangement must be come to that will suit us all three.  I
assure you, he will find in me the most charming and generous of fathers.

MRS. ARBUTHNOT.  My son may come in at any moment.  I saved you last
night.  I may not be able to save you again.  My son feels my dishonour
strongly, terribly strongly.  I beg you to go.

LORD ILLINGWORTH.  [_Sitting down_.]  Last night was excessively
unfortunate.  That silly Puritan girl making a scene merely because I
wanted to kiss her.  What harm is there in a kiss?

MRS. ARBUTHNOT.  [_Turning round_.]  A kiss may ruin a human life, George
Harford.  _I_ know that.  _I_ know that too well.

LORD ILLINGWORTH.  We won’t discuss that at present.  What is of
importance to-day, as yesterday, is still our son.  I am extremely fond
of him, as you know, and odd though it may seem to you, I admired his
conduct last night immensely.  He took up the cudgels for that pretty
prude with wonderful promptitude.  He is just what I should have liked a
son of mine to be.  Except that no son of mine should ever take the side
of the Puritans: that is always an error.  Now, what I propose is this.

MRS. ARBUTHNOT.  Lord Illingworth, no proposition of yours interests me.

LORD ILLINGWORTH.  According to our ridiculous English laws, I can’t
legitimise Gerald.  But I can leave him my property.  Illingworth is
entailed, of course, but it is a tedious barrack of a place.  He can have
Ashby, which is much prettier, Harborough, which has the best shooting in
the north of England, and the house in St. James Square.  What more can a
gentleman require in this world?

MRS. ARBUTHNOT.  Nothing more, I am quite sure.

LORD ILLINGWORTH.  As for a title, a title is really rather a nuisance in
these democratic days.  As George Harford I had everything I wanted.  Now
I have merely everything that other people want, which isn’t nearly so
pleasant.  Well, my proposal is this.

MRS. ARBUTHNOT.  I told you I was not interested, and I beg you to go.

LORD ILLINGWORTH.  The boy is to be with you for six months in the year,
and with me for the other six.  That is perfectly fair, is it not?  You
can have whatever allowance you like, and live where you choose.  As for
your past, no one knows anything about it except myself and Gerald.
There is the Puritan, of course, the Puritan in white muslin, but she
doesn’t count.  She couldn’t tell the story without explaining that she
objected to being kissed, could she?  And all the women would think her a
fool and the men think her a bore.  And you need not be afraid that
Gerald won’t be my heir.  I needn’t tell you I have not the slightest
intention of marrying.

MRS. ARBUTHNOT.  You come too late.  My son has no need of you.  You are
not necessary.

LORD ILLINGWORTH.  What do you mean, Rachel?

MRS. ARBUTHNOT.  That you are not necessary to Gerald’s career.  He does
not require you.

LORD ILLINGWORTH.  I do not understand you.

MRS. ARBUTHNOT.  Look into the garden.  [LORD ILLINGWORTH _rises and goes
towards window_.]  You had better not let them see you: you bring
unpleasant memories.  [LORD ILLINGWORTH _looks out and starts_.]  She
loves him.  They love each other.  We are safe from you, and we are going
away.

LORD ILLINGWORTH.  Where?

MRS. ARBUTHNOT.  We will not tell you, and if you find us we will not
know you.  You seem surprised.  What welcome would you get from the girl
whose lips you tried to soil, from the boy whose life you have shamed,
from the mother whose dishonour comes from you?

LORD ILLINGWORTH.  You have grown hard, Rachel.

MRS. ARBUTHNOT.  I was too weak once.  It is well for me that I have
changed.

LORD ILLINGWORTH.  I was very young at the time.  We men know life too
early.

MRS. ARBUTHNOT.  And we women know life too late.  That is the difference
between men and women.  [_A pause_.]

LORD ILLINGWORTH.  Rachel, I want my son.  My money may be of no use to
him now.  I may be of no use to him, but I want my son.  Bring us
together, Rachel.  You can do it if you choose.  [_Sees letter on
table_.]

MRS. ARBUTHNOT.  There is no room in my boy’s life for you.  He is not
interested in _you_.

LORD ILLINGWORTH.  Then why does he write to me?

MRS. ARBUTHNOT.  What do you mean?

LORD ILLINGWORTH.  What letter is this?  [_Takes up letter_.]

MRS. ARBUTHNOT.  That—is nothing.  Give it to me.

LORD ILLINGWORTH.  It is addressed to _me_.

MRS. ARBUTHNOT.  You are not to open it.  I forbid you to open it.

LORD ILLINGWORTH.  And in Gerald’s handwriting.

MRS. ARBUTHNOT.  It was not to have been sent.  It is a letter he wrote
to you this morning, before he saw me.  But he is sorry now he wrote it,
very sorry.  You are not to open it.  Give it to me.

LORD ILLINGWORTH.  It belongs to me.  [_Opens it_, _sits down and reads
it slowly_. MRS. ARBUTHNOT _watches him all the time_.]  You have read
this letter, I suppose, Rachel?

MRS. ARBUTHNOT.  No.

LORD ILLINGWORTH.  You know what is in it?

MRS. ARBUTHNOT.  Yes!

LORD ILLINGWORTH.  I don’t admit for a moment that the boy is right in
what he says.  I don’t admit that it is any duty of mine to marry you.  I
deny it entirely.  But to get my son back I am ready—yes, I am ready to
marry you, Rachel—and to treat you always with the deference and respect
due to my wife.  I will marry you as soon as you choose.  I give you my
word of honour.

MRS. ARBUTHNOT.  You made that promise to me once before and broke it.

LORD ILLINGWORTH.  I will keep it now.  And that will show you that I
love my son, at least as much as you love him.  For when I marry you,
Rachel, there are some ambitions I shall have to surrender.  High
ambitions, too, if any ambition is high.

MRS. ARBUTHNOT.  I decline to marry you, Lord Illingworth.

LORD ILLINGWORTH.  Are you serious?

MRS. ARBUTHNOT.  Yes.

LORD ILLINGWORTH.  Do tell me your reasons.  They would interest me
enormously.

MRS. ARBUTHNOT.  I have already explained them to my son.

LORD ILLINGWORTH.  I suppose they were intensely sentimental, weren’t
they?  You women live by your emotions and for them.  You have no
philosophy of life.

MRS. ARBUTHNOT.  You are right.  We women live by our emotions and for
them.  By our passions, and for them, if you will.  I have two passions,
Lord Illingworth: my love of him, my hate of you.  You cannot kill those.
They feed each other.

LORD ILLINGWORTH.  What sort of love is that which needs to have hate as
its brother?

MRS. ARBUTHNOT.  It is the sort of love I have for Gerald.  Do you think
that terrible?  Well it is terrible.  All love is terrible.  All love is
a tragedy.  I loved you once, Lord Illingworth.  Oh, what a tragedy for a
woman to have loved you!

LORD ILLINGWORTH.  So you really refuse to marry me?

MRS. ARBUTHNOT.  Yes.

LORD ILLINGWORTH.  Because you hate me?

MRS. ARBUTHNOT.  Yes.

LORD ILLINGWORTH.  And does my son hate me as you do?

MRS. ARBUTHNOT.  No.

LORD ILLINGWORTH.  I am glad of that, Rachel.

MRS. ARBUTHNOT.  He merely despises you.

LORD ILLINGWORTH.  What a pity!  What a pity for him, I mean.

MRS. ARBUTHNOT.  Don’t be deceived, George.  Children begin by loving
their parents.  After a time they judge them.  Rarely if ever do they
forgive them.

LORD ILLINGWORTH.  [_Reads letter over again_, _very slowly_.]  May I ask
by what arguments you made the boy who wrote this letter, this beautiful,
passionate letter, believe that you should not marry his father, the
father of your own child?

MRS. ARBUTHNOT.  It was not I who made him see it.  It was another.

LORD ILLINGWORTH.  What _fin-de-siècle_ person?

MRS. ARBUTHNOT.  The Puritan, Lord Illingworth.  [_A pause_.]

LORD ILLINGWORTH.  [_Winces_, _then rises slowly and goes over to table
where his hat and gloves are_.  MRS. ARBUTHNOT _is standing close to the
table_.  _He picks up one of the gloves, and begins pulling it on_.]
There is not much then for me to do here, Rachel?

MRS. ARBUTHNOT.  Nothing.

LORD ILLINGWORTH.  It is good-bye, is it?

MRS. ARBUTHNOT.  For ever, I hope, this time, Lord Illingworth.

LORD ILLINGWORTH.  How curious!  At this moment you look exactly as you
looked the night you left me twenty years ago.  You have just the same
expression in your mouth.  Upon my word, Rachel, no woman ever loved me
as you did.  Why, you gave yourself to me like a flower, to do anything I
liked with.  You were the prettiest of playthings, the most fascinating
of small romances . . . [_Pulls out watch_.]  Quarter to two!  Must be
strolling back to Hunstanton.  Don’t suppose I shall see you there again.
I’m sorry, I am, really.  It’s been an amusing experience to have met
amongst people of one’s own rank, and treated quite seriously too, one’s
mistress, and one’s—

[MRS. ARBUTHNOT _snatches up glove and strikes_ LORD ILLINGWORTH _across
the face with it_.  LORD ILLINGWORTH _starts_.  _He is dazed by the
insult of his punishment_.  _Then he controls himself_, _and goes to
window and looks out at his son_.  _Sighs and leaves the room_.]

MRS. ARBUTHNOT.  [_Falls sobbing on the sofa_.]  He would have said it.
He would have said it.`,
  },
  {
    id: 'dolls-house-finale',
    authorGroup: 'Ibsen',
    title: 'Nora and Torvald',
    play: 'A Doll’s House',
    author: 'Henrik Ibsen, translated by R. Farquharson Sharp',
    location: 'Act III, through the end of the play',
    characters: ['Nora Helmer', 'Torvald Helmer'],
    source: 'Project Gutenberg eBook #2542',
    verified: '2026-09-15',
    rightsNote: 'Project Gutenberg identifies this English edition and translation as public domain in the United States. Text taken verbatim and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on Nora entering in everyday dress and runs through the end of the play, including the closing stage direction.',
    contentNote: 'Contains a reference to contemplated suicide and the dissolution of a marriage; a mother leaves her children.',
    text: `NORA.
_[in everyday dress]_. Yes, Torvald, I have changed my things now.

HELMER.
But what for?—so late as this.

NORA.
I shall not sleep tonight.

HELMER.
But, my dear Nora—

NORA.
_[looking at her watch]_. It is not so very late. Sit down here,
Torvald. You and I have much to say to one another. _[She sits down at
one side of the table.]_

HELMER.
Nora—what is this?—this cold, set face?

NORA.
Sit down. It will take some time; I have a lot to talk over with you.

HELMER.
_[sits down at the opposite side of the table]_. You alarm me,
Nora!—and I don’t understand you.

NORA.
No, that is just it. You don’t understand me, and I have never
understood you either—before tonight. No, you mustn’t interrupt me. You
must simply listen to what I say. Torvald, this is a settling of
accounts.

HELMER.
What do you mean by that?

NORA.
_[after a short silence]_. Isn’t there one thing that strikes you as
strange in our sitting here like this?

HELMER.
What is that?

NORA.
We have been married now eight years. Does it not occur to you that
this is the first time we two, you and I, husband and wife, have had a
serious conversation?

HELMER.
What do you mean by serious?

NORA.
In all these eight years—longer than that—from the very beginning of
our acquaintance, we have never exchanged a word on any serious
subject.

HELMER.
Was it likely that I would be continually and forever telling you about
worries that you could not help me to bear?

NORA.
I am not speaking about business matters. I say that we have never sat
down in earnest together to try and get at the bottom of anything.

HELMER.
But, dearest Nora, would it have been any good to you?

NORA.
That is just it; you have never understood me. I have been greatly
wronged, Torvald—first by papa and then by you.

HELMER.
What! By us two—by us two, who have loved you better than anyone else
in the world?

NORA.
_[shaking her head]_. You have never loved me. You have only thought it
pleasant to be in love with me.

HELMER.
Nora, what do I hear you saying?

NORA.
It is perfectly true, Torvald. When I was at home with papa, he told me
his opinion about everything, and so I had the same opinions; and if I
differed from him I concealed the fact, because he would not have liked
it. He called me his doll-child, and he played with me just as I used
to play with my dolls. And when I came to live with you—

HELMER.
What sort of an expression is that to use about our marriage?

NORA.
_[undisturbed]_. I mean that I was simply transferred from papa’s hands
into yours. You arranged everything according to your own taste, and so
I got the same tastes as you—or else I pretended to, I am really not
quite sure which—I think sometimes the one and sometimes the other.
When I look back on it, it seems to me as if I had been living here
like a poor woman—just from hand to mouth. I have existed merely to
perform tricks for you, Torvald. But you would have it so. You and papa
have committed a great sin against me. It is your fault that I have
made nothing of my life.

HELMER.
How unreasonable and how ungrateful you are, Nora! Have you not been
happy here?

NORA.
No, I have never been happy. I thought I was, but it has never really
been so.

HELMER.
Not—not happy!

NORA.
No, only merry. And you have always been so kind to me. But our home
has been nothing but a playroom. I have been your doll-wife, just as at
home I was papa’s doll-child; and here the children have been my dolls.
I thought it great fun when you played with me, just as they thought it
great fun when I played with them. That is what our marriage has been,
Torvald.

HELMER.
There is some truth in what you say—exaggerated and strained as your
view of it is. But for the future it shall be different. Playtime shall
be over, and lesson-time shall begin.

NORA.
Whose lessons? Mine, or the children’s?

HELMER.
Both yours and the children’s, my darling Nora.

NORA.
Alas, Torvald, you are not the man to educate me into being a proper
wife for you.

HELMER.
And you can say that!

NORA.
And I—how am I fitted to bring up the children?

HELMER.
Nora!

NORA.
Didn’t you say so yourself a little while ago—that you dare not trust
me to bring them up?

HELMER.
In a moment of anger! Why do you pay any heed to that?

NORA.
Indeed, you were perfectly right. I am not fit for the task. There is
another task I must undertake first. I must try and educate myself—you
are not the man to help me in that. I must do that for myself. And that
is why I am going to leave you now.

HELMER.
_[springing up]_. What do you say?

NORA.
I must stand quite alone, if I am to understand myself and everything
about me. It is for that reason that I cannot remain with you any
longer.

HELMER.
Nora, Nora!

NORA.
I am going away from here now, at once. I am sure Christine will take
me in for the night—

HELMER.
You are out of your mind! I won’t allow it! I forbid you!

NORA.
It is no use forbidding me anything any longer. I will take with me
what belongs to myself. I will take nothing from you, either now or
later.

HELMER.
What sort of madness is this!

NORA.
Tomorrow I shall go home—I mean, to my old home. It will be easiest for
me to find something to do there.

HELMER.
You blind, foolish woman!

NORA.
I must try and get some sense, Torvald.

HELMER.
To desert your home, your husband and your children! And you don’t
consider what people will say!

NORA.
I cannot consider that at all. I only know that it is necessary for me.

HELMER.
It’s shocking. This is how you would neglect your most sacred duties.

NORA.
What do you consider my most sacred duties?

HELMER.
Do I need to tell you that? Are they not your duties to your husband
and your children?

NORA.
I have other duties just as sacred.

HELMER.
That you have not. What duties could those be?

NORA.
Duties to myself.

HELMER.
Before all else, you are a wife and a mother.

NORA.
I don’t believe that any longer. I believe that before all else I am a
reasonable human being, just as you are—or, at all events, that I must
try and become one. I know quite well, Torvald, that most people would
think you right, and that views of that kind are to be found in books;
but I can no longer content myself with what most people say, or with
what is found in books. I must think over things for myself and get to
understand them.

HELMER.
Can you not understand your place in your own home? Have you not a
reliable guide in such matters as that?—have you no religion?

NORA.
I am afraid, Torvald, I do not exactly know what religion is.

HELMER.
What are you saying?

NORA.
I know nothing but what the clergyman said, when I went to be
confirmed. He told us that religion was this, and that, and the other.
When I am away from all this, and am alone, I will look into that
matter too. I will see if what the clergyman said is true, or at all
events if it is true for me.

HELMER.
This is unheard of in a girl of your age! But if religion cannot lead
you aright, let me try and awaken your conscience. I suppose you have
some moral sense? Or—answer me—am I to think you have none?

NORA.
I assure you, Torvald, that is not an easy question to answer. I really
don’t know. The thing perplexes me altogether. I only know that you and
I look at it in quite a different light. I am learning, too, that the
law is quite another thing from what I supposed; but I find it
impossible to convince myself that the law is right. According to it a
woman has no right to spare her old dying father, or to save her
husband’s life. I can’t believe that.

HELMER.
You talk like a child. You don’t understand the conditions of the world
in which you live.

NORA.
No, I don’t. But now I am going to try. I am going to see if I can make
out who is right, the world or I.

HELMER.
You are ill, Nora; you are delirious; I almost think you are out of
your mind.

NORA.
I have never felt my mind so clear and certain as tonight.

HELMER.
And is it with a clear and certain mind that you forsake your husband
and your children?

NORA.
Yes, it is.

HELMER.
Then there is only one possible explanation.

NORA.
What is that?

HELMER.
You do not love me anymore.

NORA.
No, that is just it.

HELMER.
Nora!—and you can say that?

NORA.
It gives me great pain, Torvald, for you have always been so kind to
me, but I cannot help it. I do not love you any more.

HELMER.
_[regaining his composure]_. Is that a clear and certain conviction
too?

NORA.
Yes, absolutely clear and certain. That is the reason why I will not
stay here any longer.

HELMER.
And can you tell me what I have done to forfeit your love?

NORA.
Yes, indeed I can. It was tonight, when the wonderful thing did not
happen; then I saw you were not the man I had thought you were.

HELMER.
Explain yourself better. I don’t understand you.

NORA.
I have waited so patiently for eight years; for, goodness knows, I knew
very well that wonderful things don’t happen every day. Then this
horrible misfortune came upon me; and then I felt quite certain that
the wonderful thing was going to happen at last. When Krogstad’s letter
was lying out there, never for a moment did I imagine that you would
consent to accept this man’s conditions. I was so absolutely certain
that you would say to him: Publish the thing to the whole world. And
when that was done—

HELMER.
Yes, what then?—when I had exposed my wife to shame and disgrace?

NORA.
When that was done, I was so absolutely certain, you would come forward
and take everything upon yourself, and say: I am the guilty one.

HELMER.
Nora—!

NORA.
You mean that I would never have accepted such a sacrifice on your
part? No, of course not. But what would my assurances have been worth
against yours? That was the wonderful thing which I hoped for and
feared; and it was to prevent that, that I wanted to kill myself.

HELMER.
I would gladly work night and day for you, Nora—bear sorrow and want
for your sake. But no man would sacrifice his honour for the one he
loves.

NORA.
It is a thing hundreds of thousands of women have done.

HELMER.
Oh, you think and talk like a heedless child.

NORA.
Maybe. But you neither think nor talk like the man I could bind myself
to. As soon as your fear was over—and it was not fear for what
threatened me, but for what might happen to you—when the whole thing
was past, as far as you were concerned it was exactly as if nothing at
all had happened. Exactly as before, I was your little skylark, your
doll, which you would in future treat with doubly gentle care, because
it was so brittle and fragile. _[Getting up.]_ Torvald—it was then it
dawned upon me that for eight years I had been living here with a
strange man, and had borne him three children—. Oh, I can’t bear to
think of it! I could tear myself into little bits!

HELMER.
_[sadly]_. I see, I see. An abyss has opened between us—there is no
denying it. But, Nora, would it not be possible to fill it up?

NORA.
As I am now, I am no wife for you.

HELMER.
I have it in me to become a different man.

NORA.
Perhaps—if your doll is taken away from you.

HELMER.
But to part!—to part from you! No, no, Nora, I can’t understand that
idea.

NORA.
_[going out to the right]_. That makes it all the more certain that it
must be done. _[She comes back with her cloak and hat and a small bag
which she puts on a chair by the table.]_

HELMER.
Nora, Nora, not now! Wait until tomorrow.

NORA.
_[putting on her cloak]_. I cannot spend the night in a strange man’s
room.

HELMER.
But can’t we live here like brother and sister—?

NORA.
_[putting on her hat]_. You know very well that would not last long.
_[Puts the shawl round her.]_ Goodbye, Torvald. I won’t see the little
ones. I know they are in better hands than mine. As I am now, I can be
of no use to them.

HELMER.
But some day, Nora—some day?

NORA.
How can I tell? I have no idea what is going to become of me.

HELMER.
But you are my wife, whatever becomes of you.

NORA.
Listen, Torvald. I have heard that when a wife deserts her husband’s
house, as I am doing now, he is legally freed from all obligations
towards her. In any case, I set you free from all your obligations. You
are not to feel yourself bound in the slightest way, any more than I
shall. There must be perfect freedom on both sides. See, here is your
ring back. Give me mine.

HELMER.
That too?

NORA.
That too.

HELMER.
Here it is.

NORA.
That’s right. Now it is all over. I have put the keys here. The maids
know all about everything in the house—better than I do. Tomorrow,
after I have left her, Christine will come here and pack up my own
things that I brought with me from home. I will have them sent after
me.

HELMER.
All over! All over!—Nora, shall you never think of me again?

NORA.
I know I shall often think of you, the children, and this house.

HELMER.
May I write to you, Nora?

NORA.
No—never. You must not do that.

HELMER.
But at least let me send you—

NORA.
Nothing—nothing—

HELMER.
Let me help you if you are in want.

NORA.
No. I can receive nothing from a stranger.

HELMER.
Nora—can I never be anything more than a stranger to you?

NORA.
_[taking her bag]_. Ah, Torvald, the most wonderful thing of all would
have to happen.

HELMER.
Tell me what that would be!

NORA.
Both you and I would have to be so changed that—. Oh, Torvald, I don’t
believe any longer in wonderful things happening.

HELMER.
But I will believe in it. Tell me! So changed that—?

NORA.
That our life together would be a real wedlock. Goodbye. _[She goes out
through the hall.]_

HELMER.
_[sinks down on a chair at the door and buries his face in his hands]_.
Nora! Nora! _[Looks round, and rises.]_ Empty. She is gone. _[A hope
flashes across his mind.]_ The most wonderful thing of all—?

_[The sound of a door shutting is heard from below.]_`,
  },
  {
    id: 'enemy-brothers',
    authorGroup: 'Ibsen',
    title: 'The Brothers',
    play: 'An Enemy of the People',
    author: 'Henrik Ibsen, translated by R. Farquharson Sharp',
    location: 'Act II: an uninterrupted exchange, not the full act',
    characters: ['Dr. Thomas Stockmann', 'Peter Stockmann'],
    speakerLabels: ['Peter Stockmann', 'Dr. Stockmann'],
    source: 'Project Gutenberg eBook #2446',
    verified: '2026-09-16',
    rightsNote: 'Project Gutenberg identifies this R. Farquharson Sharp translation as public domain in the United States. Text taken verbatim and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'Opens after Mrs. Stockmann and Petra leave and ends on the Doctor’s “Peter—if you were not my brother—”, the moment before Petra bursts in.',
    context: 'The doctor has found evidence that the town’s baths are contaminated. His brother, the mayor, fears what public disclosure will cost the town and his administration.',
    contentNote: null,
    text: `Peter Stockmann (after a pause). Was it necessary to make all these
investigations behind my back?

Dr. Stockmann. Yes, because until I was absolutely certain about it—

Peter Stockmann. Then you mean that you are absolutely certain now?

Dr. Stockmann. Surely you are convinced of that.

Peter Stockmann. Is it your intention to bring this document before the
Baths Committee as a sort of official communication?

Dr. Stockmann. Certainly. Something must be done in the matter—and
that quickly.

Peter Stockmann. As usual, you employ violent expressions in your
report. You say, amongst other things, that what we offer visitors in
our Baths is a permanent supply of poison.

Dr. Stockmann. Well, can you describe it any other way, Peter? Just
think—water that is poisonous, whether you drink it or bathe in it!
And this we offer to the poor sick folk who come to us trustfully and
pay us at an exorbitant rate to be made well again!

Peter Stockmann. And your reasoning leads you to this conclusion, that
we must build a sewer to draw off the alleged impurities from Molledal
and must relay the water conduits.

Dr. Stockmann. Yes. Do you see any other way out of it? I don't.

Peter Stockmann. I made a pretext this morning to go and see the town
engineer, and, as if only half seriously, broached the subject of these
proposals as a thing we might perhaps have to take under consideration
some time later on.

Dr. Stockmann. Some time later on!

Peter Stockmann. He smiled at what he considered to be my extravagance,
naturally. Have you taken the trouble to consider what your proposed
alterations would cost? According to the information I obtained, the
expenses would probably mount up to fifteen or twenty thousand pounds.

Dr. Stockmann. Would it cost so much?

Peter Stockmann. Yes; and the worst part of it would be that the work
would take at least two years.

Dr. Stockmann. Two years? Two whole years?

Peter Stockmann. At least. And what are we to do with the Baths in the
meantime? Close them? Indeed we should be obliged to. And do you
suppose anyone would come near the place after it had got out that the
water was dangerous?

Dr. Stockmann. Yes but, Peter, that is what it is.

Peter Stockmann. And all this at this juncture—just as the Baths are
beginning to be known. There are other towns in the neighbourhood with
qualifications to attract visitors for bathing purposes. Don't you
suppose they would immediately strain every nerve to divert the entire
stream of strangers to themselves? Unquestionably they would; and then
where should we be? We should probably have to abandon the whole thing,
which has cost us so much money-and then you would have ruined your
native town.

Dr. Stockmann. I—should have ruined—!

Peter Stockmann. It is simply and solely through the Baths that the
town has before it any future worth mentioning. You know that just as
well as I.

Dr. Stockmann. But what do you think ought to be done, then?

Peter Stockmann. Your report has not convinced me that the condition of
the water at the Baths is as bad as you represent it to be.

Dr. Stockmann. I tell you it is even worse!—or at all events it will
be in summer, when the warm weather comes.

Peter Stockmann. As I said, I believe you exaggerate the matter
considerably. A capable physician ought to know what measures to
take—he ought to be capable of preventing injurious influences or of
remedying them if they become obviously persistent.

Dr. Stockmann. Well? What more?

Peter Stockmann. The water supply for the Baths is now an established
fact, and in consequence must be treated as such. But probably the
Committee, at its discretion, will not be disinclined to consider the
question of how far it might be possible to introduce certain
improvements consistently with a reasonable expenditure.

Dr. Stockmann. And do you suppose that I will have anything to do with
such a piece of trickery as that?

Peter Stockmann. Trickery!!

Dr. Stockmann. Yes, it would be a trick—a fraud, a lie, a downright
crime towards the public, towards the whole community!

Peter Stockmann. I have not, as I remarked before, been able to
convince myself that there is actually any imminent danger.

Dr. Stockmann. You have! It is impossible that you should not be
convinced. I know I have represented the facts absolutely truthfully
and fairly. And you know it very well, Peter, only you won't
acknowledge it. It was owing to your action that both the Baths and the
water conduits were built where they are; and that is what you won't
acknowledge—that damnable blunder of yours. Pooh!—do you suppose I
don't see through you?

Peter Stockmann. And even if that were true? If I perhaps guard my
reputation somewhat anxiously, it is in the interests of the town.
Without moral authority I am powerless to direct public affairs as
seems, to my judgment, to be best for the common good. And on that
account—and for various other reasons too—it appears to me to be a
matter of importance that your report should not be delivered to the
Committee. In the interests of the public, you must withhold it. Then,
later on, I will raise the question and we will do our best, privately;
but nothing of this unfortunate affair not a single word of it—must
come to the ears of the public.

Dr. Stockmann. I am afraid you will not be able to prevent that now, my
dear Peter.

Peter Stockmann. It must and shall be prevented.

Dr. Stockmann. It is no use, I tell you. There are too many people that
know about it.

Peter Stockmann. That know about it? Who? Surely you don't mean those
fellows on the "People's Messenger"?

Dr. Stockmann. Yes, they know. The liberal-minded independent press is
going to see that you do your duty.

Peter Stockmann (after a short pause). You are an extraordinarily
independent man, Thomas. Have you given no thought to the consequences
this may have for yourself?

Dr. Stockmann. Consequences?—for me?

Peter Stockmann. For you and yours, yes.

Dr. Stockmann. What the deuce do you mean?

Peter Stockmann. I believe I have always behaved in a brotherly way to
you—haven't I always been ready to oblige or to help you?

Dr. Stockmann. Yes, you have, and I am grateful to you for it.

Peter Stockmann. There is no need. Indeed, to some extent I was forced
to do so—for my own sake. I always hoped that, if I helped to improve
your financial position, I should be able to keep some check on you.

Dr. Stockmann. What! Then it was only for your own sake—!

Peter Stockmann. Up to a certain point, yes. It is painful for a man in
an official position to have his nearest relative compromising himself
time after time.

Dr. Stockmann. And do you consider that I do that?

Peter Stockmann. Yes, unfortunately, you do, without even being aware
of it. You have a restless, pugnacious, rebellious disposition. And
then there is that disastrous propensity of yours to want to write
about every sort of possible and impossible thing. The moment an idea
comes into your head, you must needs go and write a newspaper article
or a whole pamphlet about it.

Dr. Stockmann. Well, but is it not the duty of a citizen to let the
public share in any new ideas he may have?

Peter Stockmann. Oh, the public doesn't require any new ideas. The
public is best served by the good, old established ideas it already has.

Dr. Stockmann. And that is your honest opinion?

Peter Stockmann. Yes, and for once I must talk frankly to you. Hitherto
I have tried to avoid doing so, because I know how irritable you are;
but now I must tell you the truth, Thomas. You have no conception what
an amount of harm you do yourself by your impetuosity. You complain of
the authorities, you even complain of the government—you are always
pulling them to pieces; you insist that you have been neglected and
persecuted. But what else can such a cantankerous man as you expect?

Dr. Stockmann. What next! Cantankerous, am I?

Peter Stockmann. Yes, Thomas, you are an extremely cantankerous man to
work with—I know that to my cost. You disregard everything that you
ought to have consideration for. You seem completely to forget that it
is me you have to thank for your appointment here as medical officer to
the Baths.

Dr. Stockmann. I was entitled to it as a matter of course!—I and
nobody else! I was the first person to see that the town could be made
into a flourishing watering-place, and I was the only one who saw it at
that time. I had to fight single-handed in support of the idea for many
years; and I wrote and wrote—

Peter Stockmann. Undoubtedly. But things were not ripe for the scheme
then—though, of course, you could not judge of that in your
out-of-the-way corner up north. But as soon as the opportune moment
came I—and the others—took the matter into our hands.

Dr. Stockmann. Yes, and made this mess of all my beautiful plan. It is
pretty obvious now what clever fellows you were!

Peter Stockmann. To my mind the whole thing only seems to mean that you
are seeking another outlet for your combativeness. You want to pick a
quarrel with your superiors—an old habit of yours. You cannot put up
with any authority over you. You look askance at anyone who occupies a
superior official position; you regard him as a personal enemy, and
then any stick is good enough to beat him with. But now I have called
your attention to the fact that the town's interests are at stake—and,
incidentally, my own too. And therefore, I must tell you, Thomas, that
you will find me inexorable with regard to what I am about to require
you to do.

Dr. Stockmann. And what is that?

Peter Stockmann. As you have been so indiscreet as to speak of this
delicate matter to outsiders, despite the fact that you ought to have
treated it as entirely official and confidential, it is obviously
impossible to hush it up now. All sorts of rumours will get about
directly, and everybody who has a grudge against us will take care to
embellish these rumours. So it will be necessary for you to refute them
publicly.

Dr. Stockmann. I! How? I don't understand.

Peter Stockmann. What we shall expect is that, after making further
investigations, you will come to the conclusion that the matter is not
by any means as dangerous or as critical as you imagined in the first
instance.

Dr. Stockmann. Oho!—so that is what you expect!

Peter Stockmann. And, what is more, we shall expect you to make public
profession of your confidence in the Committee and in their readiness
to consider fully and conscientiously what steps may be necessary to
remedy any possible defects.

Dr. Stockmann. But you will never be able to do that by patching and
tinkering at it—never! Take my word for it, Peter; I mean what I say,
as deliberately and emphatically as possible.

Peter Stockmann. As an officer under the Committee, you have no right
to any individual opinion.

Dr. Stockmann (amazed). No right?

Peter Stockmann. In your official capacity, no. As a private person, it
is quite another matter. But as a subordinate member of the staff of
the Baths, you have no right to express any opinion which runs contrary
to that of your superiors.

Dr. Stockmann. This is too much! I, a doctor, a man of science, have no
right to—!

Peter Stockmann. The matter in hand is not simply a scientific one. It
is a complicated matter, and has its economic as well as its technical
side.

Dr. Stockmann. I don't care what it is! I intend to be free to express
my opinion on any subject under the sun.

Peter Stockmann. As you please—but not on any subject concerning the
Baths. That we forbid.

Dr. Stockmann (shouting). You forbid—! You! A pack of—

Peter Stockmann.  I forbid it—I, your chief; and if I forbid it, you
have to obey.

Dr. Stockmann (controlling himself). Peter—if you were not my brother—`,
  },
  {
    id: 'ghosts-alving-manders',
    authorGroup: 'Ibsen',
    title: 'Fighting with Ghosts',
    play: 'Ghosts',
    author: 'Henrik Ibsen, translated by R. Farquharson Sharp',
    location: 'Act II: an uninterrupted exchange, not the full act',
    characters: ['Mrs. Alving', 'Pastor Manders'],
    speakerLabels: ['Mrs. Alving', 'Manders'],
    source: 'Project Gutenberg eBook #2467',
    verified: '2026-09-16',
    corrections: [['Menders', 'Manders'], ['\nManders, I don', '\nManders. I don'], ['taping', 'tapping'], [' lust ', ' just ']],
    rightsNote: 'Public domain in the United States. Text taken from the Project Gutenberg plain-text edition and verified against it line for line. Obvious mechanical printing errors in that edition are corrected; each correction is recorded in this record. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'Opens after Oswald and Regina leave and runs to the knock at the hall door that precedes Engstrand’s entrance.',
    context: 'Mrs. Alving and Manders fear that old family secrets are repeating themselves. They disagree over whether protecting a son’s ideals matters more than telling him the truth.',
    contentNote: 'Frank period discussion of infidelity, illegitimacy and a possible union between half-siblings.',
    text: `Manders. I suppose he can't hear us?

Mrs. Alving. Not when the door is shut. Besides, he is going out.

Manders. I am still quite bewildered. I don't know how I managed to
swallow a mouthful of your excellent dinner.

Mrs. Alving (walking up and down, and trying to control her agitation).
Nor I. But, what are we to do?

Manders. Yes, what are we to do? Upon my word I don't know; I am so
completely unaccustomed to things of this kind.

Mrs. Alving. I am convinced that nothing serious has happened yet.

Manders. Heaven forbid! But it is most unseemly behaviour, for all that.

Mrs. Alving. It is nothing more than a foolish jest of Oswald's, you
may be sure.

Manders. Well, of course, as I said, I am quite inexperienced in such
matters; but it certainly seems to me--

Mrs. Alving. Out of the house she shall go--and at once. That part of
it is as clear as daylight--

Manders. Yes, that is quite clear.

Mrs. Alving. But where is she to go? We should not be justified in--

Manders. Where to? Home to her father, of course.

Mrs. Alving. To whom, did you say?

Manders. To her--. No, of course Engstrand isn't--. But, great heavens,
Mrs. Alving, how is such a thing possible? You surely may have been
mistaken, in spite of everything.

Mrs. Alving. There was no chance of mistake, more's the pity. Joanna
was obliged to confess it to me--and my husband couldn't deny it. So
there was nothing else to do but to hush it up.

Manders. No, that was the only thing to do.

Mrs. Alving. The girl was sent away at once, and was given a tolerably
liberal sum to hold her tongue. She looked after the rest herself when
she got to town. She renewed an old acquaintance with the carpenter
Engstrand; gave him a hint, I suppose, of how much money she had got,
and told him some fairy tale about a foreigner who had been here in his
yacht in the summer. So she and Engstrand were married in a great
hurry. Why, you married them yourself!

Manders. I can't understand it--, I remember clearly Engstrand's coming
to arrange about the marriage. He was full of contrition, and accused
himself bitterly for the light conduct he and his fiancee had been
guilty of.

Mrs. Alving. Of course he had to take the blame on himself.

Manders. But the deceitfulness of it! And with me, too! I positively
would not have believed it of Jacob Engstrand. I shall most certainly
give him a serious talking to. And the immorality of such a marriage!
Simply for the sake of the money--! What sum was it that the girl had?

Mrs. Alving. It was seventy pounds.

Manders. Just think of it--for a paltry seventy pounds to let yourself
be bound in marriage to a fallen woman!

Mrs. Alving. What about myself, then?--I let myself be bound in
marriage to a fallen man.

Manders. Heaven forgive you! What are you saying? A fallen man?

Mrs. Alving. Do you suppose my husband was any purer, when I went with
him to the altar, than Joanna was when Engstrand agreed to marry her?

Manders. The two cases are as different as day from night.

Mrs. Alving. Not so very different, after all. It is true there was a
great difference in the price paid, between a paltry seventy pounds and
a whole fortune.

Manders. How can you compare such totally different things! I presume
you consulted your own heart--and your relations.

Mrs. Alving (looking away from him). I thought you understood where
what you call my heart had strayed to at that time.

Manders (in a constrained voice). If I had understood anything of the
kind, I would not have been a daily guest in your husband's house.

Mrs. Alving. Well, at any rate this much is certain--I didn't consult
myself in the matter at all.

Manders. Still you consulted those nearest to you, as was only
right--your mother, your two aunts.

Mrs. Alving. Yes, that is true. The three of them settled the whole
matter for me. It seems incredible to me now, how clearly they made out
that it would be sheer folly to reject such an offer. If my mother
could only see what all that fine prospect has led to!

Manders. No one can be responsible for the result of it. Anyway there
is this to be said, that the match was made in complete conformity with
law and order.

Mrs. Alving (going to the window). Oh, law and order! I often think it
is that that is at the bottom of all the misery in the world.

Manders. Mrs. Alving, it is very wicked of you to say that.

Mrs. Alving. That may be so; but I don't attach importance to those
obligations and considerations any longer. I cannot! I must struggle
for my freedom.

Manders. What do you mean?

Mrs. Alving (tapping on the window panes). I ought never to have
concealed what sort of a life my husband led. But I had not the courage
to do otherwise then--for my own sake, either. I was too much of a
coward.

Manders. A coward?

Mrs. Alving. If others had known anything of what happened, they would
have said: "Poor man, it is natural enough that he should go astray,
when he has a wife that has run away from him."

Manders. They would have had a certain amount of justification for
saying so.

Mrs. Alving (looking fixedly at him). If I had been the woman I ought,
I would have taken Oswald into my confidence and said to him: "Listen,
my son, your father was a dissolute man"--

Manders. Miserable woman.

Mrs. Alving. --and I would have told him all I have told you, from
beginning to end.

Manders. I am almost shocked at you, Mrs. Alving.

Mrs. Alving. I know. I know quite well! I am shocked at myself when I
think of it. (Comes away from the window.) I am coward enough for that.

Manders. Can you call it cowardice that you simply did your duty? Have
you forgotten that a child should love and honour his father and mother?

Mrs. Alving. Don't let us talk in such general terms. Suppose we say:
"Ought Oswald to love and honour Mr. Alving?"

Manders. You are a mother--isn't there a voice in your heart that
forbids you to shatter your son's ideals?

Mrs. Alving. And what about the truth?

Manders. What about his ideals?

Mrs. Alving. Oh--ideals, ideals! If only I were not such a coward as I
am!

Manders. Do not spurn ideals, Mrs. Alving--they have a way of avenging
themselves cruelly. Take Oswald's own case, now. He hasn't many ideals,
more's the pity. But this much I have seen, that his father is
something of an ideal to him.

Mrs. Alving. You are right there.

Manders. And his conception of his father is what you inspired and
encouraged by your letters.

Mrs. Alving. Yes, I was swayed by duty and consideration for others;
that was why I lied to my son, year in and year out. Oh, what a
coward--what a coward I have been!

Manders. You have built up a happy illusion in your son's mind, Mrs.
Alving--and that is a thing you certainly ought not to undervalue.

Mrs. Alving. Ah, who knows if that is such a desirable thing after
all!--But anyway I don't intend to put up with any goings on with
Regina. I am not going to let him get the poor girl into trouble.

Manders. Good heavens, no--that would be a frightful thing!

Mrs. Alving. If only I knew whether he meant it seriously, and whether
it would mean happiness for him.

Manders. In what way? I don't understand.

Mrs. Alving. But that is impossible; Regina is not equal to it,
unfortunately.

Manders. I don't understand: What do you mean?

Mrs. Alving. If I were not such a miserable coward, I would say to him:
"Marry her, or make any arrangement you like with her--only let there
be no deceit in the matter."

Manders. Heaven forgive you! Are you actually suggesting anything so
abominable, so unheard of, as a marriage between them!

Mrs. Alving. Unheard of, do you call it? Tell me honestly, Mr. Manders,
don't you suppose there are plenty of married couples out here in the
country that are just as nearly related as they are?

Manders. I am sure I don't understand you.

Mrs. Alving. Indeed you do.

Manders. I suppose you are thinking of cases where possibly--. It is
only too true, unfortunately, that family life is not always as
stainless as it should be. But as for the sort of thing you hint
at--well, it's impossible to tell, at all events, with any certainty.
Here on the other hand--for you, a mother, to be willing to allow your--

Mrs. Alving. But I am not willing to allow it; I would not allow it for
anything in the world; that is just what I was saying.

Manders. No, because you are a coward, as you put it. But, supposing
you were not a coward--! Great heavens--such a revolting union!

Mrs. Alving. Well, for the matter of that, we are all descended from a
union of that description, so we are told. And who was it that was
responsible for this state of things, Mr. Manders?

Manders. I can't discuss such questions with you, Mrs. Alving; you are
by no means in the right frame of mind for that. But for you to dare to
say that it is cowardly of you--!

Mrs. Alving. I will tell you what I mean by that. I am frightened and
timid, because I am obsessed by the presence of ghosts that I never can
get rid of.

Manders. The presence of what?

Mrs. Alving. Ghosts. When I heard Regina and Oswald in there, it was
just like seeing ghosts before my eyes. I am half inclined to think we
are all ghosts, Mr. Manders. It is not only what we have inherited from
our fathers and mothers that exists again in us, but all sorts of old
dead ideas and all kinds of old dead beliefs and things of that kind.
They are not actually alive in us; but there they are dormant, all the
same, and we can never be rid of them. Whenever I take up a newspaper
and read it, I fancy I see ghosts creeping between the lines. There
must be ghosts all over the world. They must be as countless as the
grains of the sands, it seems to me. And we are so miserably afraid of
the light, all of us.

Manders. Ah!--there we have the outcome of your reading. Fine fruit it
has borne--this abominable, subversive, free-thinking literature!

Mrs. Alving. You are wrong there, my friend. You are the one who made
me begin to think; and I owe you my best thanks for it.

Manders. I!

Mrs. Alving. Yes, by forcing me to submit to what you called my duty
and my obligations; by praising as right and just what my whole soul
revolted against, as it would against something abominable. That was
what led me to examine your teachings critically. I only wanted to
unravel one point in them; but as soon as I had got that unravelled,
the whole fabric came to pieces. And then I realised that it was only
machine-made.

Manders (softly, and with emotion). Is that all I accomplished by the
hardest struggle of my life?

Mrs. Alving. Call it rather the most ignominious defeat of your life.

Manders. It was the greatest victory of my life, Helen; victory over
myself.

Mrs. Alving. It was a wrong done to both of us.

Manders. A wrong?--wrong for me to entreat you as a wife to go back to
your lawful husband, when you came to me half distracted and crying:
"Here I am, take me!" Was that a wrong?

Mrs. Alving. I think it was.

Manders. We two do not understand one another.

Mrs. Alving. Not now, at all events.

Manders. Never--even in my most secret thoughts--have I for a moment
regarded you as anything but the wife of another.

Mrs. Alving. Do you believe what you say?

Manders. Helen--!

Mrs. Alving. One so easily forgets one's own feelings. Manders. Not I.
I am the same as I always was.

Mrs. Alving. Yes, yes--don't let us talk any more about the old days.
You are buried up to your eyes now in committees and all sorts of
business; and I am here, fighting with ghosts both without and within
me.

Manders. I can at all events help you to get the better of those
without you. After all that I have been horrified to hear you from
today, I cannot conscientiously allow a young defenceless girl to
remain in your house.

Mrs. Alving. Don't you think it would be best if we could get her
settled?--by some suitable marriage, I mean.

Manders. Undoubtedly. I think, in any case, it would have been
desirable for her. Regina is at an age now that--well, I don't know
much about these things, but--

Mrs. Alving. Regina developed very early.

Manders. Yes, didn't she. I fancy I remember thinking she was
remarkably well developed, bodily, at the time I prepared her for
Confirmation. But, for the time being, she must in any case go home.
Under her father's care--no, but of course Engstrand is not. To think
that he, of all men, could so conceal the truth from me! (A knock is
heard at the hall door.)`,
  },
  {
    id: 'hedda-thea',
    authorGroup: 'Ibsen',
    title: 'Two Birds with One Stone',
    play: 'Hedda Gabler',
    author: 'Henrik Ibsen, translated by Edmund Gosse and William Archer',
    location: 'Act I: an uninterrupted exchange, not the full act',
    characters: ['Hedda Tesman', 'Mrs. Elvsted (Thea)'],
    source: 'Project Gutenberg eBook #4093',
    verified: '2026-09-16',
    rightsNote: 'Project Gutenberg identifies this Gosse and Archer translation as public domain in the United States. Text taken verbatim and verified line for line; the numbered footnote markers are the edition’s own. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'Opens as Hedda turns to Mrs. Elvsted after sending Tesman out to write a letter, and ends the moment before he returns.',
    context: 'Hedda gets Tesman out of the room so she can question Thea privately about her life and Eilert Løvborg. The encounter tests whether apparent warmth is care, curiosity, or control.',
    contentNote: 'Manipulation played as friendship; a past threat with a pistol is recalled.',
    text: `HEDDA.

[Goes up to MRS. ELVSTED, smiles, and says in a low voice.] There! We
have killed two birds with one stone.


MRS. ELVSTED.

What do you mean?


HEDDA.

Could you not see that I wanted him to go?


MRS. ELVSTED.

Yes, to write the letter--


HEDDA.

And that I might speak to you alone.


MRS. ELVSTED.

[Confused.] About the same thing?


HEDDA.

Precisely.


MRS. ELVSTED.

[Apprehensively.] But there is nothing more, Mrs. Tesman! Absolutely
nothing!


HEDDA.

Oh yes, but there is. There is a great deal more--I can see that. Sit
here--and we'll have a cosy, confidential chat.

   [She forces MRS. ELVSTED to sit in the easy-chair beside the
       stove, and seats herself on one of the footstools.


MRS. ELVSTED.

[Anxiously, looking at her watch.] But, my dear Mrs. Tesman--I was
really on the point of going.


HEDDA.

Oh, you can't be in such a hurry.--Well? Now tell me something about
your life at home.


MRS. ELVSTED.

Oh, that is just what I care least to speak about.


HEDDA.

But to me, dear--? Why, weren't we schoolfellows?


MRS. ELVSTED.

Yes, but you were in the class above me. Oh, how dreadfully afraid of
you I was then!


HEDDA.

Afraid of me?


MRS. ELVSTED.

Yes, dreadfully. For when we met on the stairs you used always to pull
my hair.


HEDDA.

Did I, really?


MRS. ELVSTED.

Yes, and once you said you would burn it off my head.


HEDDA.

Oh that was all nonsense, of course.


MRS. ELVSTED.

Yes, but I was so silly in those days.--And since then, too--we have
drifted so far--far apart from each other. Our circles have been so
entirely different.


HEDDA.

Well then, we must try to drift together again. Now listen. At school
we said _du_(4) to each other; and we called each other by our Christian
names--


MRS. ELVSTED.

No, I am sure you must be mistaken.


HEDDA.

No, not at all! I can remember quite distinctly. So now we are going to
renew our old friendship. [Draws the footstool closer to MRS. ELVSTED.]
There now! [Kisses her cheek.] You must say _du_ to me and call me
Hedda.


MRS. ELVSTED.

[Presses and pats her hands.] Oh, how good and kind you are! I am not
used to such kindness.


HEDDA.

There, there, there! And I shall say _du_ to you, as in the old days,
and call you my dear Thora.


MRS. ELVSTED.

My name is Thea.(5)


HEDDA.

Why, of course! I meant Thea. [Looks at her compassionately.] So you are
not accustomed to goodness and kindness, Thea? Not in your own home?


MRS. ELVSTED.

Oh, if I only had a home! But I haven't any; I have never had a home.


HEDDA.

[Looks at her for a moment.] I almost suspected as much.


MRS. ELVSTED.

[Gazing helplessly before her.] Yes--yes--yes.


HEDDA.

I don't quite remember--was it not as housekeeper that you first went to
Mr. Elvsted's?


MRS. ELVSTED.

I really went as governess. But his wife--his late wife--was an
invalid,--and rarely left her room. So I had to look after the
housekeeping as well.


HEDDA.

And then--at last--you became mistress of the house.


MRS. ELVSTED.

[Sadly.] Yes, I did.


HEDDA.

Let me see--about how long ago was that?


MRS. ELVSTED.

My marriage?


HEDDA.

Yes.


MRS. ELVSTED.

Five years ago.


HEDDA.

To be sure; it must be that.


MRS. ELVSTED.

Oh those five years--! Or at all events the last two or three of them!
Oh, if you(6) could only imagine--


HEDDA.

[Giving her a little slap on the hand.] De? Fie, Thea!


MRS. ELVSTED.

Yes, yes, I will try--. Well, if--you could only imagine and
understand--


HEDDA.

[Lightly.] Eilert Lovborg has been in your neighbourhood about three
years, hasn't he?


MRS. ELVSTED.

[Looks at her doubtfully.] Eilert Lovborg? Yes--he has.


HEDDA.

Had you known him before, in town here?


MRS. ELVSTED.

Scarcely at all. I mean--I knew him by name of course.


HEDDA.

But you saw a good deal of him in the country?


MRS. ELVSTED.

Yes, he came to us every day. You see, he gave the children lessons; for
in the long run I couldn't manage it all myself.


HEDDA.

No, that's clear.--And your husband--? I suppose he is often away from
home?


MRS. ELVSTED.

Yes. Being sheriff, you know, he has to travel about a good deal in his
district.


HEDDA.

[Leaning against the arm of the chair.] Thea--my poor, sweet Thea--now
you must tell me everything--exactly as it stands.


MRS. ELVSTED.

Well, then you must question me.


HEDDA.

What sort of a man is your husband, Thea? I mean--you know--in everyday
life. Is he kind to you?


MRS. ELVSTED.

[Evasively.] I am sure he means well in everything.


HEDDA.

I should think he must be altogether too old for you. There is at least
twenty years' difference between you, is there not?


MRS. ELVSTED.

[Irritably.] Yes, that is true, too. Everything about him is repellent
to me! We have not a thought in common. We have no single point of
sympathy--he and I.


HEDDA.

But is he not fond of you all the same? In his own way?


MRS. ELVSTED.

Oh I really don't know. I think he regards me simply as a useful
property. And then it doesn't cost much to keep me. I am not expensive.


HEDDA.

That is stupid of you.


MRS. ELVSTED.

[Shakes her head.] It cannot be otherwise--not with him. I don't think
he really cares for any one but himself--and perhaps a little for the
children.


HEDDA.

And for Eilert Lovborg, Thea?


MRS. ELVSTED.

[Looking at her.] For Eilert Lovborg? What puts that into your head?


HEDDA.

Well, my dear--I should say, when he sends you after him all the way
to town-- [Smiling almost imperceptibly.] And besides, you said so
yourself, to Tesman.


MRS. ELVSTED.

[With a little nervous twitch.] Did I? Yes, I suppose I did.
[Vehemently, but not loudly.] No--I may just as well make a clean breast
of it at once! For it must all come out in any case.


HEDDA.

Why, my dear Thea--?


MRS. ELVSTED.

Well, to make a long story short: My husband did not know that I was
coming.


HEDDA.

What! Your husband didn't know it!


MRS. ELVSTED.

No, of course not. For that matter, he was away from home himself--
he was travelling. Oh, I could bear it no longer, Hedda! I couldn't
indeed--so utterly alone as I should have been in future.


HEDDA.

Well? And then?


MRS. ELVSTED.

So I put together some of my things--what I needed most--as quietly as
possible. And then I left the house.


HEDDA.

Without a word?


MRS. ELVSTED.

Yes--and took the train to town.


HEDDA.

Why, my dear, good Thea--to think of you daring to do it!


MRS. ELVSTED.

[Rises and moves about the room.] What else could I possibly do?


HEDDA.

But what do you think your husband will say when you go home again?


MRS. ELVSTED.

[At the table, looks at her.] Back to him?


HEDDA.

Of course.


MRS. ELVSTED.

I shall never go back to him again.


HEDDA.

[Rising and going towards her.] Then you have left your home--for good
and all?


MRS. ELVSTED.

Yes. There was nothing else to be done.


HEDDA.

But then--to take flight so openly.


MRS. ELVSTED.

Oh, it's impossible to keep things of that sort secret.


HEDDA.

But what do you think people will say of you, Thea?


MRS. ELVSTED.

They may say what they like, for aught _I_ care. [Seats herself wearily
and sadly on the sofa.] I have done nothing but what I had to do.


HEDDA.

[After a short silence.] And what are your plans now? What do you think
of doing.


MRS. ELVSTED.

I don't know yet. I only know this, that I must live here, where Eilert
Lovborg is--if I am to live at all.


HEDDA.

[Takes a chair from the table, seats herself beside her, and strokes
her hands.] My dear Thea--how did this--this friendship--between you and
Eilert Lovborg come about?


MRS. ELVSTED.

Oh it grew up gradually. I gained a sort of influence over him.


HEDDA.

Indeed?


MRS. ELVSTED.

He gave up his old habits. Not because I asked him to, for I never dared
do that. But of course he saw how repulsive they were to me; and so he
dropped them.


HEDDA.

[Concealing an involuntary smile of scorn.] Then you have reclaimed
him--as the saying goes--my little Thea.


MRS. ELVSTED.

So he says himself, at any rate. And he, on his side, has made a real
human being of me--taught me to think, and to understand so many things.


HEDDA.

Did he give you lessons too, then?


MRS. ELVSTED.

No, not exactly lessons. But he talked to me--talked about such an
infinity of things. And then came the lovely, happy time when I began to
share in his work--when he allowed me to help him!


HEDDA.

Oh he did, did he?


MRS. ELVSTED.

Yes! He never wrote anything without my assistance.


HEDDA.

You were two good comrades, in fact?


MRS. ELVSTED.

[Eagerly.] Comrades! Yes, fancy, Hedda--that is the very word he
used!--Oh, I ought to feel perfectly happy; and yet I cannot; for I
don't know how long it will last.


HEDDA.

Are you no surer of him than that?


MRS. ELVSTED.

[Gloomily.] A woman's shadow stands between Eilert Lovborg and me.


HEDDA.

[Looks at her anxiously.] Who can that be?


MRS. ELVSTED.

I don't know. Some one he knew in his--in his past. Some one he has
never been able wholly to forget.


HEDDA.

What has he told you--about this?


MRS. ELVSTED.

He has only once--quite vaguely--alluded to it.


HEDDA.

Well! And what did he say?


MRS. ELVSTED.

He said that when they parted, she threatened to shoot him with a
pistol.


HEDDA.

[With cold composure.] Oh nonsense! No one does that sort of thing here.


MRS. ELVSTED.

No. And that is why I think it must have been that red-haired
singing-woman whom he once--

HEDDA.

Yes, very likely.


MRS. ELVSTED.

For I remember they used to say of her that she carried loaded firearms.


HEDDA.

Oh--then of course it must have been she.


MRS. ELVSTED.

[Wringing her hands.] And now just fancy, Hedda--I hear that this
singing-woman--that she is in town again! Oh, I don't know what to do--


HEDDA.

[Glancing towards the inner room.] Hush! Here comes Tesman. [Rises and
whispers.] Thea--all this must remain between you and me.


MRS. ELVSTED.

[Springing up.] Oh yes--yes! For heaven's sake--!`,
  },
  {
    id: 'pygmalion-slippers',
    authorGroup: 'Shaw',
    title: 'The Slippers',
    play: 'Pygmalion',
    author: 'George Bernard Shaw',
    location: 'Act IV: an uninterrupted exchange, not the full act',
    characters: ['Eliza Doolittle', 'Henry Higgins'],
    speakerLabels: ['HIGGINS', 'LIZA'],
    source: 'Project Gutenberg eBook #3825',
    verified: '2026-09-17',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens on the stage direction after Higgins goes up to bed and ends on the final direction of the act, completed through “look for the ring.”, the moment before Act V.',
    context: 'The experiment has succeeded and the party is over. Higgins comes back for his slippers, and Eliza, no longer able to stay silent, asks what is to become of her. The scene asks who owns the results of her education.',
    contentNote: 'Includes a physical struggle and threatened violence within the scene.',
    text: `Eliza tries to control herself and feel indifferent as she rises and
walks across to the hearth to switch off the lights. By the time she
gets there she is on the point of screaming. She sits down in Higgins’s
chair and holds on hard to the arms. Finally she gives way and flings
herself furiously on the floor raging.

HIGGINS [in despairing wrath outside] What the devil have I done with
my slippers? [He appears at the door].

LIZA [snatching up the slippers, and hurling them at him one after the
other with all her force] There are your slippers. And there. Take your
slippers; and may you never have a day’s luck with them!

HIGGINS [astounded] What on earth—! [He comes to her]. What’s the
matter? Get up. [He pulls her up]. Anything wrong?

LIZA [breathless] Nothing wrong—with YOU. I’ve won your bet for you,
haven’t I? That’s enough for you. _I_ don’t matter, I suppose.

HIGGINS. YOU won my bet! You! Presumptuous insect! _I_ won it. What did
you throw those slippers at me for?

LIZA. Because I wanted to smash your face. I’d like to kill you, you
selfish brute. Why didn’t you leave me where you picked me out of—in
the gutter? You thank God it’s all over, and that now you can throw me
back again there, do you? [She crisps her fingers, frantically].

HIGGINS [looking at her in cool wonder] The creature IS nervous, after
all.

LIZA [gives a suffocated scream of fury, and instinctively darts her
nails at his face]!!

HIGGINS [catching her wrists] Ah! would you? Claws in, you cat. How
dare you show your temper to me? Sit down and be quiet. [He throws her
roughly into the easy-chair].

LIZA [crushed by superior strength and weight] What’s to become of me?
What’s to become of me?

HIGGINS. How the devil do I know what’s to become of you? What does it
matter what becomes of you?

LIZA. You don’t care. I know you don’t care. You wouldn’t care if I was
dead. I’m nothing to you—not so much as them slippers.

HIGGINS [thundering] THOSE slippers.

LIZA [with bitter submission] Those slippers. I didn’t think it made
any difference now.

A pause. Eliza hopeless and crushed. Higgins a little uneasy.

HIGGINS [in his loftiest manner] Why have you begun going on like this?
May I ask whether you complain of your treatment here?

LIZA. No.

HIGGINS. Has anybody behaved badly to you? Colonel Pickering? Mrs.
Pearce? Any of the servants?

LIZA. No.

HIGGINS. I presume you don’t pretend that I have treated you badly.

LIZA. No.

HIGGINS. I am glad to hear it. [He moderates his tone]. Perhaps you’re
tired after the strain of the day. Will you have a glass of champagne?
[He moves towards the door].

LIZA. No. [Recollecting her manners] Thank you.

HIGGINS [good-humored again] This has been coming on you for some days.
I suppose it was natural for you to be anxious about the garden party.
But that’s all over now. [He pats her kindly on the shoulder. She
writhes]. There’s nothing more to worry about.

LIZA. No. Nothing more for you to worry about. [She suddenly rises and
gets away from him by going to the piano bench, where she sits and
hides her face]. Oh God! I wish I was dead.

HIGGINS [staring after her in sincere surprise] Why? in heaven’s name,
why? [Reasonably, going to her] Listen to me, Eliza. All this
irritation is purely subjective.

LIZA. I don’t understand. I’m too ignorant.

HIGGINS. It’s only imagination. Low spirits and nothing else. Nobody’s
hurting you. Nothing’s wrong. You go to bed like a good girl and sleep
it off. Have a little cry and say your prayers: that will make you
comfortable.

LIZA. I heard YOUR prayers. “Thank God it’s all over!”

HIGGINS [impatiently] Well, don’t you thank God it’s all over? Now you
are free and can do what you like.

LIZA [pulling herself together in desperation] What am I fit for? What
have you left me fit for? Where am I to go? What am I to do? What’s to
become of me?

HIGGINS [enlightened, but not at all impressed] Oh, that’s what’s
worrying you, is it? [He thrusts his hands into his pockets, and walks
about in his usual manner, rattling the contents of his pockets, as if
condescending to a trivial subject out of pure kindness]. I shouldn’t
bother about it if I were you. I should imagine you won’t have much
difficulty in settling yourself, somewhere or other, though I hadn’t
quite realized that you were going away. [She looks quickly at him: he
does not look at her, but examines the dessert stand on the piano and
decides that he will eat an apple]. You might marry, you know. [He
bites a large piece out of the apple, and munches it noisily]. You see,
Eliza, all men are not confirmed old bachelors like me and the Colonel.
Most men are the marrying sort (poor devils!); and you’re not
bad-looking; it’s quite a pleasure to look at you sometimes—not now,
of course, because you’re crying and looking as ugly as the very devil;
but when you’re all right and quite yourself, you’re what I should call
attractive. That is, to the people in the marrying line, you
understand. You go to bed and have a good nice rest; and then get up
and look at yourself in the glass; and you won’t feel so cheap.

Eliza again looks at him, speechless, and does not stir.

The look is quite lost on him: he eats his apple with a dreamy
expression of happiness, as it is quite a good one.

HIGGINS [a genial afterthought occurring to him] I daresay my mother
could find some chap or other who would do very well—

LIZA. We were above that at the corner of Tottenham Court Road.

HIGGINS [waking up] What do you mean?

LIZA. I sold flowers. I didn’t sell myself. Now you’ve made a lady of
me I’m not fit to sell anything else. I wish you’d left me where you
found me.

HIGGINS [slinging the core of the apple decisively into the grate]
Tosh, Eliza. Don’t you insult human relations by dragging all this cant
about buying and selling into it. You needn’t marry the fellow if you
don’t like him.

LIZA. What else am I to do?

HIGGINS. Oh, lots of things. What about your old idea of a florist’s
shop? Pickering could set you up in one: he’s lots of money.
[Chuckling] He’ll have to pay for all those togs you have been wearing
today; and that, with the hire of the jewellery, will make a big hole
in two hundred pounds. Why, six months ago you would have thought it
the millennium to have a flower shop of your own. Come! you’ll be all
right. I must clear off to bed: I’m devilish sleepy. By the way, I came
down for something: I forget what it was.

LIZA. Your slippers.

HIGGINS. Oh yes, of course. You shied them at me. [He picks them up,
and is going out when she rises and speaks to him].

LIZA. Before you go, sir—

HIGGINS [dropping the slippers in his surprise at her calling him sir]
Eh?

LIZA. Do my clothes belong to me or to Colonel Pickering?

HIGGINS [coming back into the room as if her question were the very
climax of unreason] What the devil use would they be to Pickering?

LIZA. He might want them for the next girl you pick up to experiment on.

HIGGINS [shocked and hurt] Is THAT the way you feel towards us?

LIZA. I don’t want to hear anything more about that. All I want to know
is whether anything belongs to me. My own clothes were burnt.

HIGGINS. But what does it matter? Why need you start bothering about
that in the middle of the night?

LIZA. I want to know what I may take away with me. I don’t want to be
accused of stealing.

HIGGINS [now deeply wounded] Stealing! You shouldn’t have said that,
Eliza. That shows a want of feeling.

LIZA. I’m sorry. I’m only a common ignorant girl; and in my station I
have to be careful. There can’t be any feelings between the like of you
and the like of me. Please will you tell me what belongs to me and what
doesn’t?

HIGGINS [very sulky] You may take the whole damned houseful if you
like. Except the jewels. They’re hired. Will that satisfy you? [He
turns on his heel and is about to go in extreme dudgeon].

LIZA [drinking in his emotion like nectar, and nagging him to provoke a
further supply] Stop, please. [She takes off her jewels]. Will you take
these to your room and keep them safe? I don’t want to run the risk of
their being missing.

HIGGINS [furious] Hand them over. [She puts them into his hands]. If
these belonged to me instead of to the jeweler, I’d ram them down your
ungrateful throat. [He perfunctorily thrusts them into his pockets,
unconsciously decorating himself with the protruding ends of the
chains].

LIZA [taking a ring off] This ring isn’t the jeweler’s: it’s the one
you bought me in Brighton. I don’t want it now. [Higgins dashes the
ring violently into the fireplace, and turns on her so threateningly
that she crouches over the piano with her hands over her face, and
exclaims] Don’t you hit me.

HIGGINS. Hit you! You infamous creature, how dare you accuse me of such
a thing? It is you who have hit me. You have wounded me to the heart.

LIZA [thrilling with hidden joy] I’m glad. I’ve got a little of my own
back, anyhow.

HIGGINS [with dignity, in his finest professional style] You have
caused me to lose my temper: a thing that has hardly ever happened to
me before. I prefer to say nothing more tonight. I am going to bed.

LIZA [pertly] You’d better leave a note for Mrs. Pearce about the
coffee; for she won’t be told by me.

HIGGINS [formally] Damn Mrs. Pearce; and damn the coffee; and damn you;
and damn my own folly in having lavished MY hard-earned knowledge and
the treasure of my regard and intimacy on a heartless guttersnipe. [He
goes out with impressive decorum, and spoils it by slamming the door
savagely].

Eliza smiles for the first time; expresses her feelings by a wild
pantomime in which an imitation of Higgins’s exit is confused with her
own triumph; and finally goes down on her knees on the hearthrug to
look for the ring.`,
  },
  {
    id: 'pariah-complete',
    authorGroup: 'Strindberg',
    title: 'The Unpunished',
    play: 'Pariah',
    author: 'August Strindberg, translated by Edwin Björkman',
    location: 'A complete one-act play',
    characters: ['Mr. X', 'Mr. Y'],
    speakerLabels: ['MR. X', 'MR. Y'],
    source: 'Project Gutenberg eBook #5053',
    verified: '2026-09-17',
    corrections: [['ME. X.', 'MR. X.'], ['ME. Y.', 'MR. Y.'], ['MR. X,', 'MR. X.'], ['alchohol', 'alcohol'], ['otter preliminaries', 'other preliminaries'], ['For tins', 'For this']],
    rightsNote: 'Public domain in the United States. Text taken from the Project Gutenberg plain-text edition and verified against it line for line. Obvious mechanical printing errors in that edition are corrected; each correction is recorded in this record. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'This is the complete play, from the opening stage directions to the curtain.',
    context: 'An archaeologist and a travelling collector wait out a thunderstorm. What begins as talk about guilt and punishment becomes an attempted blackmail, and each man learns exactly what the other is.',
    contentNote: 'Frank discussion of forgery, blackmail and an unpunished killing.',
    text: `SCENE

(A simply furnished room in a farmhouse. The door and the windows in the
background open on a landscape. In the middle of the room stands a
big dining-table, covered at one end by books, writing materials,
and antiquities; at the other end, by a microscope, insect cases, and
specimen jars full of alcohol.)

(On the left side hangs a bookshelf. Otherwise the furniture is that of
a well-to-do farmer.)

(MR. Y. enters in his shirt-sleeves, carrying a butterfly-net and a
botany-can. He goes straight up to the bookshelf and takes down a book,
which he begins to read on the spot.)

(The landscape outside and the room itself are steeped in sunlight. The
ringing of church bells indicates that the morning services are just
over. Now and then the cackling of hens is heard from the outside.)

(MR. X. enters, also in his shirt-sleeves.)

(MR. Y. starts violently, puts the book back on the shelf upside-down,
and pretends to be looking for another volume.)

MR. X. This heat is horrible. I guess we are going to have a
thunderstorm.

MR. Y. What makes you think so?

MR. X. The bells have a kind of dry ring to them, the flies are sticky,
and the hens cackle. I meant to go fishing, but I couldn't find any
worms. Don't you feel nervous?

MR. Y. [Cautiously] I?--A little.

MR. X. Well, for that matter, you always look as if you were expecting
thunderstorms.

MR. Y. [With a start] Do I?

MR. X. Now, you are going away tomorrow, of course, so it is not to be
wondered at that you are a little "journey-proud."--Anything new?--Oh,
there's the mail! [Picks up some letters from the table] My, I have
palpitation of the heart every time I open a letter! Nothing but debts,
debts, debts! Have you ever had any debts?

MR. Y. [After some reflection] N-no.

MR. X. Well, then you don't know what it means to receive a lot of
overdue bills. [Reads one of the letters] The rent unpaid--the landlord
acting nasty--my wife in despair. And here am I sitting waist-high in
gold! [He opens an iron-banded box that stands on the table; then both
sit down at the table, facing each other] Just look--here I have
six thousand crowns' worth of gold which I have dug up in the last
fortnight. This bracelet alone would bring me the three hundred and
fifty crowns I need. And with all of it I might make a fine career for
myself. Then I could get the illustrations made for my treatise at once;
I could get my work printed, and--I could travel! Why don't I do it, do
you suppose?

MR. Y. I suppose you are afraid to be found out.

MR. X. That, too, perhaps. But don't you think an intelligent fellow
like myself might fix matters so that he was never found out? I am alone
all the time--with nobody watching me--while I am digging out there in
the fields. It wouldn't be strange if I put something in my own pockets
now and then.

MR. Y. Yes, but the worst danger lies in disposing of the stuff.

MR. X. Pooh! I'd melt it down, of course--every bit of it--and then I'd
turn it into coins--with just as much gold in them as genuine ones, of
course---

MR. Y. Of course!

MR. X. Well, you can easily see why. For if I wanted to dabble in
counterfeits, then I need not go digging for gold first. [Pause] It is a
strange thing anyhow, that if anybody else did what I cannot make myself
do, then I'd be willing to acquit him--but I couldn't possibly acquit
myself. I might even make a brilliant speech in defence of the thief,
proving that this gold was res nullius, or nobody's, as it had been
deposited at a time when property rights did not yet exist; that even
under existing rights it could belong only to the first finder of it, as
the ground-owner has never included it in the valuation of his property;
and so on.

MR. Y. And probably it would be much easier for you to do this if
the--hm!--the thief had not been prompted by actual need, but by a
mania for collecting, for instance--or by scientific aspirations--by the
ambition to keep a discovery to himself. Don't you think so?

MR. X. You mean that I could not acquit him if actual need had been the
motive? Yes, for that's the only motive which the law will not accept in
extenuation. That motive makes a plain theft of it.

MR. Y. And this you couldn't excuse?

MR. X. Oh, excuse--no, I guess not, as the law wouldn't. On the other
hand, I must admit that it would be hard for me to charge a collector
with theft merely because he had appropriated some specimen not yet
represented in his own collection.

MR. Y. So that vanity or ambition might excuse what could not be excused
by need?

MR. X. And yet need ought to be the more telling excuse--the only
one, in fact? But I feel as I have said. And I can no more change this
feeling than I can change my own determination not to steal under any
circumstances whatever.

MR. Y. And I suppose you count it a great merit that you
cannot--hm!--steal?

MR. X. No, my disinclination to steal is just as irresistible as the
inclination to do so is irresistible with some people. So it cannot be
called a merit. I cannot do it, and the other one cannot refrain!--But
you understand, of course, that I am not without a desire to own this
gold. Why don't I take it then? Because I cannot! It's an inability--and
the lack of something cannot be called a merit. There!

[Closes the box with a slam. Stray clouds have cast their shadows on the
landscape and darkened the room now and then. Now it grows quite dark as
when a thunderstorm is approaching.]

MR. X. How close the air is! I guess the storm is coming all right.

[MR. Y. gets up and shuts the door and all the windows.]

MR. X. Are you afraid of thunder?

MR. Y. It's just as well to be careful.

(They resume their seats at the table.)

MR. X. You're a curious chap! Here you come dropping down like a bomb
a fortnight ago, introducing yourself as a Swedish-American who is
collecting flies for a small museum---

MR. Y. Oh, never mind me now!

MR. X. That's what you always say when I grow tired of talking about
myself and want to turn my attention to you. Perhaps that was the reason
why I took to you as I did--because you let me talk about myself? All at
once we seemed like old friends. There were no angles about you against
which I could bump myself, no pins that pricked. There was something
soft about your whole person, and you overflowed with that tact which
only well-educated people know how to show. You never made a noise when
you came home late at night or got up early in the morning. You were
patient in small things, and you gave in whenever a conflict seemed
threatening. In a word, you proved yourself the perfect companion! But
you were entirely too compliant not to set me wondering about you in the
long run--and you are too timid, too easily frightened. It seems almost
as if you were made up of two different personalities. Why, as I sit
here looking at your back in the mirror over there--it is as if I were
looking at somebody else.

(MR. Y. turns around and stares at the mirror.)

MR. X. No, you cannot get a glimpse of your own back, man!--In front you
appear like a fearless sort of fellow, one meeting his fate with bared
breast, but from behind--really, I don't want to be impolite, but--you
look as if you were carrying a burden, or as if you were crouching to
escape a raised stick. And when I look at that red cross your suspenders
make on your white shirt--well, it looks to me like some kind of emblem,
like a trade-mark on a packing-box--

MR. Y. I feel as if I'd choke--if the storm doesn't break soon--

MR. X. It's coming--don't you worry!--And your neck! It looks as if
there ought to be another kind of face on top of it, a face quite
different in type from yours. And your ears come so close together
behind that sometimes I wonder what race you belong to. [A flash of
lightning lights up the room] Why, it looked as if that might have
struck the sheriff's house!

MR. Y. [Alarmed] The sheriff's!

MR. X. Oh, it just looked that way. But I don't think we'll get much of
this storm. Sit down now and let us have a talk, as you are going away
to-morrow. One thing I find strange is that you, with whom I have become
so intimate in this short time--that you are one of those whose image
I cannot call up when I am away from them. When you are not here, and
I happen to think of you, I always get the vision of another
acquaintance--one who does not resemble you, but with whom you have
certain traits in common.

MR. Y. Who is he?

MR. X. I don't want to name him, but--I used for several years to take
my meals at a certain place, and there, at the side-table where they
kept the whiskey and the other preliminaries, I met a little blond man,
with blond, faded eyes. He had a wonderful faculty for making his way
through a crowd, without jostling anybody or being jostled himself. And
from his customary place down by the door he seemed perfectly able to
reach whatever he wanted on a table that stood some six feet away from
him. He seemed always happy just to be in company. But when he met
anybody he knew, then the joy of it made him roar with laughter, and he
would hug and pat the other fellow as if he hadn't seen a human face
for years. When anybody stepped on his foot, he smiled as if eager to
apologise for being in the way. For two years I watched him and amused
myself by guessing at his occupation and character. But I never asked
who he was; I didn't want to know, you see, for then all the fun would
have been spoiled at once. That man had just your quality of being
indefinite. At different times I made him out to be a teacher who
had never got his licence, a non-commissioned officer, a druggist, a
government clerk, a detective--and like you, he looked as if made out of
two pieces, for the front of him never quite fitted the back. One day
I happened to read in a newspaper about a big forgery committed by
a well-known government official. Then I learned that my indefinite
gentleman had been a partner of the forger's brother, and that his name
was Strawman. Later on I learned that the aforesaid Strawman used to run
a circulating library, but that he was now the police reporter of a big
daily. How in the world could I hope to establish a connection between
the forgery, the police, and my little man's peculiar manners? It was
beyond me; and when I asked a friend whether Strawman had ever been
punished for something, my friend couldn't answer either yes or no--he
just didn't know! [Pause.]

MR. Y. Well, had he ever been--punished?

MR. X. No, he had not. [Pause.]

MR. Y. And that was the reason, you think, why the police had such an
attraction for him, and why he was so afraid of offending people?

MR. X. Exactly!

MR. Y. And did you become acquainted with him afterward?

MR. X. No, I didn't want to. [Pause.]

MR. Y. Would you have been willing to make his acquaintance if he had
been--punished?

MR. X. Perfectly!

(MR. Y. rises and walks back and forth several times.)

MR. X. Sit still! Why can't you sit still?

MR. Y. How did you get your liberal view of human conditions? Are you a
Christian?

MR. X. Oh, can't you see that I am not?

(MR. Y. makes a face.)

MR. X. The Christians require forgiveness. But I require punishment in
order that the balance, or whatever you may call it, be restored. And
you, who have served a term, ought to know the difference.

MR. Y. [Stands motionless and stares at MR. X., first with wild, hateful
eyes, then with surprise and admiration] How--could--you--know--that?

MR. X. Why, I could see it.

MR. Y. How? How could you see it?

MR. X. Oh, with a little practice. It is an art, like many others. But
don't let us talk of it any more. [He looks at his watch, arranges a
document on the table, dips a pen in the ink-well, and hands it to MR.
Y.] I must be thinking of my tangled affairs. Won't you please witness
my signature on this note here? I am going to turn it in to the bank at
Malmo tomorrow, when I go to the city with you.

MR. Y. I am not going by way of Malmo.

MR. X. Oh, you are not?

MR. Y. No.

MR. X. But that need not prevent you from witnessing my signature.

MR. Y. N-no!--I never write my name on papers of that kind--

MR. X.--any longer! This is the fifth time you have refused to write
your own name. The first time nothing more serious was involved than the
receipt for a registered letter. Then I began to watch you. And since
then I have noticed that you have a morbid fear of a pen filled with
ink. You have not written a single letter since you came here--only a
post-card, and that you wrote with a blue pencil. You understand now
that I have figured out the exact nature of your slip? Furthermore! This
is something like the seventh time you have refused to come with me to
Malmo, which place you have not visited at all during all this time. And
yet you came the whole way from America merely to have a look at Malmo!
And every morning you walk a couple of miles, up to the old mill, just
to get a glimpse of the roofs of Malmo in the distance. And when you
stand over there at the right-hand window and look out through the third
pane from the bottom on the left side, you can see the spired turrets of
the castle and the tall chimney of the county jail.--And now I hope you
see that it's your own stupidity rather than my cleverness which has
made everything clear to me.

MR. Y. This means that you despise me?

MR. X. Oh, no!

MR. Y. Yes, you do--you cannot but do it!

MR. X. No--here's my hand.

(MR. Y. takes hold of the outstretched hand and kisses it.)

MR. X. [Drawing back his hand] Don't lick hands like a dog!

MR. Y. Pardon me, sir, but you are the first one who has let me touch
his hand after learning--

MR. X. And now you call me "sir!"--What scares me about you is that you
don't feel exonerated, washed clean, raised to the old level, as good
as anybody else, when you have suffered your punishment. Do you care to
tell me how it happened? Would you?

MR. Y. [Twisting uneasily] Yes, but you won't believe what I say. But
I'll tell you. Then you can see for yourself that I am no ORDINARY
criminal. You'll become convinced, I think, that there are errors which,
so to speak, are involuntary--[twisting again] which seem to commit
themselves--spontaneously--without being willed by oneself, and for
which one cannot be held responsible--May I open the door a little now,
since the storm seems to have passed over?

MR. X. Suit yourself.

MR. Y. [Opens the door; then he sits down at the table and begins to
speak with exaggerated display of feeling, theatrical gestures, and a
good deal of false emphasis] Yes, I'll tell you! I was a student in the
university at Lund, and I needed to get a loan from a bank. I had no
pressing debts, and my father owned some property--not a great deal, of
course. However, I had sent the note to the second man of the two who
were to act as security, and, contrary to expectations, it came back
with a refusal. For a while I was completely stunned by the blow, for it
was a very unpleasant surprise--most unpleasant! The note was lying in
front of me on the table, and the letter lay beside it. At first my eyes
stared hopelessly at those lines that pronounced my doom--that is, not a
death-doom, of course, for I could easily find other securities, as many
as I wanted--but as I have already said, it was very annoying just
the same. And as I was sitting there quite unconscious of any evil
intention, my eyes fastened upon the signature of the letter, which
would have made my future secure if it had only appeared in the right
place. It was an unusually well-written signature--and you know how
sometimes one may absent-mindedly scribble a sheet of paper full of
meaningless words. I had a pen in my hand--[picks up a penholder from
the table] like this. And somehow it just began to run--I don't want
to claim that there was anything mystical--anything of a spiritualistic
nature back of it--for that kind of thing I don't believe in! It was
a wholly unreasoned, mechanical process--my copying of that beautiful
autograph over and over again. When all the clean space on the letter
was used up, I had learned to reproduce the signature automatically--and
then--[throwing away the penholder with a violent gesture] then I forgot
all about it. That night I slept long and heavily. And when I woke up,
I could feel that I had been dreaming, but I couldn't recall the dream
itself. At times it was as if a door had been thrown ajar, and then
I seemed to see the writing-table with the note on it as in a distant
memory--and when I got out of bed, I was forced up to the table, just as
if, after careful deliberation, I had formed an irrevocable decision to
sign the name to that fateful paper. All thought of the consequences,
of the risk involved, had disappeared--no hesitation remained--it was
almost as if I was fulfilling some sacred duty--and so I wrote! [Leaps
to his feet] What could it be? Was it some kind of outside influence, a
case of mental suggestion, as they call it? But from whom could it come?
I was sleeping alone in that room. Could it possibly be my primitive
self--the savage to whom the keeping of faith is an unknown thing--which
pushed to the front while my consciousness was asleep--together with the
criminal will of that self, and its inability to calculate the results
of an action? Tell me, what do you think of it?

MR. X. [As if he had to force the words out of himself] Frankly
speaking, your story does not convince me--there are gaps in it, but
these may depend on your failure to recall all the details--and I
have read something about criminal suggestion--or I think I have, at
least--hm! But all that is neither here nor there! You have taken your
medicine--and you have had the courage to acknowledge your fault. Now we
won't talk of it any more.

MR. Y. Yes, yes, yes, we must talk of it--till I become sure of my
innocence.

MR. X. Well, are you not?

MR. Y. No, I am not!

MR. X. That's just what bothers me, I tell you. It's exactly what is
bothering me!--Don't you feel fairly sure that every human being hides
a skeleton in his closet? Have we not, all of us, stolen and lied as
children? Undoubtedly! Well, now there are persons who remain children
all their lives, so that they cannot control their unlawful desires.
Then comes the opportunity, and there you have your criminal.--But I
cannot understand why you don't feel innocent. If the child is not held
responsible, why should the criminal be regarded differently? It is
the more strange because--well, perhaps I may come to repent it later.
[Pause] I, for my part, have killed a man, and I have never suffered any
qualms on account of it.

MR. Y. [Very much interested] Have--you?

MR. X. Yes, I, and none else! Perhaps you don't care to shake hands with
a murderer?

MR. Y. [Pleasantly] Oh, what nonsense!

MR. X. Yes, but I have not been punished,

MR. Y. [Growing more familiar and taking on a superior tone] So much the
better for you!--How did you get out of it?

MR. X. There was nobody to accuse me, no suspicions, no witnesses.
This is the way it happened. One Christmas I was invited to hunt with
a fellow-student a little way out of Upsala. He sent a besotted old
coachman to meet me at the station, and this fellow went to sleep on the
box, drove the horses into a fence, and upset the whole equipage in
a ditch. I am not going to pretend that my life was in danger. It was
sheer impatience which made me hit him across the neck with the edge of
my hand--you know the way--just to wake him up--and the result was that
he never woke up at all, but collapsed then and there.

MR. Y. [Craftily] And did you report it?

MR. X. No, and these were my reasons for not doing so. The man left
no family behind him, or anybody else to whom his life could be of
the slightest use. He had already outlived his allotted period of
vegetation, and his place might just as well be filled by somebody more
in need of it. On the other hand, my life was necessary to the happiness
of my parents and myself, and perhaps also to the progress of my
science. The outcome had once for all cured me of any desire to wake up
people in that manner, and I didn't care to spoil both my own life and
that of my parents for the sake of an abstract principle of justice.

MR. Y. Oh, that's the way you measure the value of a human life?

MR. X. In the present case, yes.

MR. Y. But the sense of guilt--that balance you were speaking of?

MR. X. I had no sense of guilt, as I had committed no crime. As a boy I
had given and taken more than one blow of the same kind, and the fatal
outcome in this particular case was simply caused by my ignorance of the
effect such a blow might have on an elderly person.

MR. Y. Yes, but even the unintentional killing of a man is punished
with a two-year term at hard labour--which is exactly what one gets
for--writing names.

MR. X. Oh, you may be sure I have thought of it. And more than one night
I have dreamt myself in prison. Tell me now--is it really as bad as they
say to find oneself behind bolt and bar?

MR. Y. You bet it is!--First of all they disfigure you by cutting off
your hair, and if you don't look like a criminal before, you are sure
to do so afterward. And when you catch sight of yourself in a mirror you
feel quite sure that you are a regular bandit.

MR. X. Isn't it a mask that is being torn off, perhaps? Which wouldn't
be a bad idea, I should say.

MR. Y. Yes, you can have your little jest about it!--And then they cut
down your food, so that every day and every hour you become conscious of
the border line between life and death. Every vital function is more or
less checked. You can feel yourself shrinking. And your soul, which was
to be cured and improved, is instead put on a starvation diet--pushed
back a thousand years into outlived ages. You are not permitted to
read anything but what was written for the savages who took part in the
migration of the peoples. You hear of nothing but what will never happen
in heaven; and what actually does happen on the earth is kept hidden
from you. You are torn out of your surroundings, reduced from your own
class, put beneath those who are really beneath yourself. Then you get
a sense of living in the bronze age. You come to feel as if you were
dressed in skins, as if you were living in a cave and eating out of a
trough--ugh!

MR. X. But there is reason back of all that. One who acts as if he
belonged to the bronze age might surely be expected to don the proper
costume.

MR. Y. [Irately] Yes, you sneer! You who have behaved like a man from
the stone age--and who are permitted to live in the golden age.

MR. X. [Sharply, watching him closely] What do you mean with that last
expression--the golden age?

MR. Y. [With a poorly suppressed snarl] Nothing at all.

MR. X. Now you lie--because you are too much of a coward to say all you
think.

MR. Y. Am I a coward? You think so? But I was no coward when I dared to
show myself around here, where I had had to suffer as I did.--But can
you tell what makes one suffer most while in there?--It is that the
others are not in there too!

MR. X. What others?

MR. Y. Those that go unpunished.

MR. X. Are you thinking of me?

MR. Y. I am.

MR. X. But I have committed no crime.

MR. Y. Oh, haven't you?

MR. X. No, a misfortune is no crime.

MR. Y. So, it's a misfortune to commit murder?

MR. X. I have not committed murder.

MR. Y. Is it not murder to kill a person?

MR. X. Not always. The law speaks of murder, manslaughter, killing
in self-defence--and it makes a distinction between intentional and
unintentional killing. However--now you really frighten me, for it's
becoming plain to me that you belong to the most dangerous of all human
groups--that of the stupid.

MR. Y. So you imagine that I am stupid? Well, listen--would you like me
to show you how clever I am?

MR. X. Come on!

MR. Y. I think you'll have to admit that there is both logic and
wisdom in the argument I'm now going to give you. You have suffered a
misfortune which might have brought you two years at hard labor. You
have completely escaped the disgrace of being punished. And here you see
before you a man--who has also suffered a misfortune--the victim of an
unconscious impulse--and who has had to stand two years of hard labor
for it. Only by some great scientific achievement can this man wipe
off the taint that has become attached to him without any fault of
his own--but in order to arrive at some such achievement, he must have
money--a lot of money--and money this minute! Don't you think that the
other one, the unpunished one, would bring a little better balance into
these unequal human conditions if he paid a penalty in the form of a
fine? Don't you think so?

MR. X. [Calmly] Yes.

MR. Y. Then we understand each other.--Hm! [Pause] What do you think
would be reasonable?

MR. X. Reasonable? The minimum fine in such a case is fixed by the law
at fifty crowns. But this whole question is settled by the fact that the
dead man left no relatives.

MR. Y. Apparently you don't want to understand. Then I'll have to speak
plainly: it is to me you must pay that fine.

MR. X. I have never heard that forgers have the right to collect fines
imposed for manslaughter. And, besides, there is no prosecutor.

MR. Y. There isn't? Well--how would I do?

MR. X. Oh, NOW we are getting the matter cleared up! How much do you
want for becoming my accomplice?

MR. Y. Six thousand crowns.

MR. X. That's too much. And where am I to get them?

(MR. Y. points to the box.)

MR. X. No, I don't want to do that. I don't want to become a thief.

MR. Y. Oh, don't put on any airs now! Do you think I'll believe that you
haven't helped yourself out of that box before?

MR. X. [As if speaking to himself] Think only, that I could let myself
be fooled so completely. But that's the way with these soft natures.
You like them, and then it's so easy to believe that they like you. And
that's the reason why I have always been on my guard against people I
take a liking to!--So you are firmly convinced that I have helped myself
out of the box before?

MR. Y. Certainly! MR. X. And you are going to report me if you don't get
six thousand crowns?

MR. Y. Most decidedly! You can't get out of it, so there's no use
trying.

MR. X. You think I am going to give my father a thief for son, my wife
a thief for husband, my children a thief for father, my fellow-workers a
thief for colleague? No, that will never happen!--Now I am going over to
the sheriff to report the killing myself.

MR. Y. [Jumps up and begins to pick up his things] Wait a moment!

MR. X. For what?

MR. Y. [Stammering] Oh, I thought--as I am no longer needed--it wouldn't
be necessary for me to stay--and I might just as well leave.

MR. X. No, you may not!--Sit down there at the table, where you sat
before, and we'll have another talk before you go.

MR. Y. [Sits down after having put on a dark coat] What are you up to
now?

MR. X. [Looking into the mirror back of MR. Y.] Oh, now I have it!
Oh-h-h!

MR. Y. [Alarmed] What kind of wonderful things are you discovering now?

MR. X. I see in the mirror that you are a thief--a plain, ordinary
thief! A moment ago, while you had only the white shirt on, I could
notice that there was something wrong about my book-shelf. I couldn't
make out just what it was, for I had to listen to you and watch you. But
as my antipathy increased, my vision became more acute. And now, with
your black coat to furnish the needed color contrast For the red back
of the book, which before couldn't be seen against the red of your
suspenders--now I see that you have been reading about forgeries in
Bernheim's work on mental suggestion--for you turned the book upsidedown
in putting it back. So even that story of yours was stolen! For this
reason I think myself entitled to conclude that your crime must have
been prompted by need, or by mere love of pleasure.

MR. Y. By need! If you only knew--

MR. X. If YOU only knew the extent of the need I have had to face and
live through! But that's another story! Let's proceed with your case.
That you have been in prison--I take that for granted. But it happened
in America, for it was American prison life you described. Another thing
may also be taken for granted, namely, that you have not borne your
punishment on this side.

MR. Y. How can you imagine anything of the kind?

MR. X. Wait until the sheriff gets here, and you'll learn all about it.

(MR. Y. gets up.)

MR. X. There you see! The first time I mentioned the sheriff, in
connection with the storm, you wanted also to run away. And when a
person has served out his time he doesn't care to visit an old mill
every day just to look at a prison, or to stand by the window--in a
word, you are at once punished and unpunished. And that's why it was so
hard to make you out. [Pause.]

MR. Y. [Completely beaten] May I go now?

MR. X. Now you can go.

MR. Y. [Putting his things together] Are you angry at me?

MR. X. Yes--would you prefer me to pity you?

MR. Y. [Sulkily] Pity? Do you think you're any better than I?

MR. X. Of course I do, as I AM better than you. I am wiser, and I am
less of a menace to prevailing property rights.

MR. Y. You think you are clever, but perhaps I am as clever as you. For
the moment you have me checked, but in the next move I can mate you--all
the same!

MR. X. [Looking hard at MR. Y.] So we have to have another bout! What
kind of mischief are you up to now?

MR. Y. That's my secret.

MR. X. Just look at me--oh, you mean to write my wife an anonymous
letter giving away MY secret!

MR. Y. Well, how are you going to prevent it? You don't dare to have me
arrested. So you'll have to let me go. And when I am gone, I can do what
I please.

MR. X. You devil! So you have found my vulnerable spot! Do you want to
make a real murderer out of me?

MR. Y. That's more than you'll ever become--coward!

MR. X. There you see how different people are. You have a feeling that I
cannot become guilty of the same kind of acts as you. And that gives you
the upper hand. But suppose you forced me to treat you as I treated that
coachman?

[He lifts his hand as if ready to hit MR. Y.]

MR. Y. [Staring MR. X. straight in the face] You can't! It's too much
for one who couldn't save himself by means of the box over there.

MR. X. So you don't think I have taken anything out of the box?

MR. Y. You were too cowardly--just as you were too cowardly to tell your
wife that she had married a murderer.

MR. X. You are a different man from what I took you to be--if stronger
or weaker, I cannot tell--if more criminal or less, that's none of my
concern--but decidedly more stupid; that much is quite plain. For stupid
you were when you wrote another person's name instead of begging--as
I have had to do. Stupid you were when you stole things out of my
book--could you not guess that I might have read my own books? Stupid
you were when you thought yourself cleverer than me, and when you
thought that I could be lured into becoming a thief. Stupid you were
when you thought balance could be restored by giving the world two
thieves instead of one. But most stupid of all you were when you thought
I had failed to provide a safe corner-stone for my happiness. Go ahead
and write my wife as many anonymous letters as you please about
her husband having killed a man--she knew that long before we were
married!--Have you had enough now?

MR. Y. May I go?

MR. X. Now you HAVE to go! And at once! I'll send your things after
you!--Get out of here!

(Curtain.)`,
  },
  {
    id: 'playboy-story',
    authorGroup: 'Synge',
    title: 'The Story He Tells',
    play: 'The Playboy of the Western World',
    author: 'J. M. Synge',
    location: 'Act I: an uninterrupted exchange, not the full act',
    characters: ['Pegeen Mike', 'Christy Mahon'],
    source: 'Project Gutenberg eBook #1240',
    verified: '2026-09-17',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens as Pegeen hustles Shawn out and bolts the door, and ends on the knocking, the moment before the Widow Quin calls from outside.',
    context: 'Christy has arrived with a story: he says he killed his father. Pegeen, unimpressed by every man she knows, draws the story out of him, and the telling begins to make him the man in it.',
    contentNote: 'The scene turns on a claimed killing, spoken of admiringly.',
    text: `PEGEEN.
Go on, I’m saying, and don’t be waking this place with your noise.
(_She hustles him out and bolts the door._) That lad would wear the
spirits from the saints of peace. (_Bustles about, then takes off her
apron and pins it up in the window as a blind. Christy watching her
timidly. Then she comes to him and speaks with bland good-humour._) Let
you stretch out now by the fire, young fellow. You should be destroyed
travelling.

CHRISTY.
_shyly again, drawing off his boots._—I’m tired, surely, walking wild
eleven days, and waking fearful in the night. [_He holds up one of his
feet, feeling his blisters, and looking at them with compassion._]

PEGEEN.
_standing beside him, watching him with delight._—You should have had
great people in your family, I’m thinking, with the little, small feet
you have, and you with a kind of a quality name, the like of what you’d
find on the great powers and potentates of France and Spain.

CHRISTY.
_with pride._—We were great surely, with wide and windy acres of rich
Munster land.

PEGEEN.
Wasn’t I telling you, and you a fine, handsome young fellow with a
noble brow?

CHRISTY.
_with a flash of delighted surprise._—Is it me?

PEGEEN.
Aye. Did you never hear that from the young girls where you come from
in the west or south?

CHRISTY.
_with venom._—I did not then. Oh, they’re bloody liars in the naked
parish where I grew a man.

PEGEEN.
If they are itself, you’ve heard it these days, I’m thinking, and you
walking the world telling out your story to young girls or old.

CHRISTY.
I’ve told my story no place till this night, Pegeen Mike, and it’s
foolish I was here, maybe, to be talking free, but you’re decent
people, I’m thinking, and yourself a kindly woman, the way I wasn’t
fearing you at all.

PEGEEN.
_filling a sack with straw._—You’ve said the like of that, maybe, in
every cot and cabin where you’ve met a young girl on your way.

CHRISTY.
_going over to her, gradually raising his voice._—I’ve said it nowhere
till this night, I’m telling you, for I’ve seen none the like of you
the eleven long days I am walking the world, looking over a low ditch
or a high ditch on my north or my south, into stony scattered fields,
or scribes of bog, where you’d see young, limber girls, and fine
prancing women making laughter with the men.

PEGEEN.
If you weren’t destroyed travelling, you’d have as much talk and
streeleen, I’m thinking, as Owen Roe O’Sullivan or the poets of the
Dingle Bay, and I’ve heard all times it’s the poets are your like, fine
fiery fellows with great rages when their temper’s roused.

CHRISTY.
_drawing a little nearer to her._—You’ve a power of rings, God bless
you, and would there be any offence if I was asking are you single now?

PEGEEN.
What would I want wedding so young?

CHRISTY.
_with relief._—We’re alike, so.

PEGEEN.
_she puts sack on settle and beats it up._—I never killed my father.
I’d be afeard to do that, except I was the like of yourself with blind
rages tearing me within, for I’m thinking you should have had great
tussling when the end was come.

CHRISTY.
_expanding with delight at the first confidential talk he has ever had
with a woman._—We had not then. It was a hard woman was come over the
hill, and if he was always a crusty kind when he’d a hard woman setting
him on, not the divil himself or his four fathers could put up with him
at all.

PEGEEN.
_with curiosity._—And isn’t it a great wonder that one wasn’t fearing
you?

CHRISTY.
_very confidentially._—Up to the day I killed my father, there wasn’t a
person in Ireland knew the kind I was, and I there drinking, waking,
eating, sleeping, a quiet, simple poor fellow with no man giving me
heed.

PEGEEN.
_getting a quilt out of the cupboard and putting it on the sack._—It
was the girls were giving you heed maybe, and I’m thinking it’s most
conceit you’d have to be gaming with their like.

CHRISTY.
_shaking his head, with simplicity._—Not the girls itself, and I won’t
tell you a lie. There wasn’t anyone heeding me in that place saving
only the dumb beasts of the field. [_He sits down at fire._]

PEGEEN.
_with disappointment._—And I thinking you should have been living the
like of a king of Norway or the Eastern world. [_She comes and sits
beside him after placing bread and mug of milk on the table._]

CHRISTY.
_laughing piteously._—The like of a king, is it? And I after toiling,
moiling, digging, dodging from the dawn till dusk with never a sight of
joy or sport saving only when I’d be abroad in the dark night poaching
rabbits on hills, for I was a divil to poach, God forgive me, (_very
naïvely_) and I near got six months for going with a dung fork and
stabbing a fish.

PEGEEN.
And it’s that you’d call sport, is it, to be abroad in the darkness
with yourself alone?

CHRISTY.
I did, God help me, and there I’d be as happy as the sunshine of St.
Martin’s Day, watching the light passing the north or the patches of
fog, till I’d hear a rabbit starting to screech and I’d go running in
the furze. Then when I’d my full share I’d come walking down where
you’d see the ducks and geese stretched sleeping on the highway of the
road, and before I’d pass the dunghill, I’d hear himself snoring out, a
loud lonesome snore he’d be making all times, the while he was
sleeping, and he a man ’d be raging all times, the while he was waking,
like a gaudy officer you’d hear cursing and damning and swearing oaths.

PEGEEN.
Providence and Mercy, spare us all!

CHRISTY.
It’s that you’d say surely if you seen him and he after drinking for
weeks, rising up in the red dawn, or before it maybe, and going out
into the yard as naked as an ash tree in the moon of May, and shying
clods against the visage of the stars till he’d put the fear of death
into the banbhs and the screeching sows.

PEGEEN.
I’d be well-nigh afeard of that lad myself, I’m thinking. And there was
no one in it but the two of you alone?

CHRISTY.
The divil a one, though he’d sons and daughters walking all great
states and territories of the world, and not a one of them, to this
day, but would say their seven curses on him, and they rousing up to
let a cough or sneeze, maybe, in the deadness of the night.

PEGEEN.
_nodding her head._—Well, you should have been a queer lot. I never
cursed my father the like of that, though I’m twenty and more years of
age.

CHRISTY.
Then you’d have cursed mine, I’m telling you, and he a man never gave
peace to any, saving when he’d get two months or three, or be locked in
the asylums for battering peelers or assaulting men (_with depression_)
the way it was a bitter life he led me till I did up a Tuesday and
halve his skull.

PEGEEN.
_putting her hand on his shoulder._—Well, you’ll have peace in this
place, Christy Mahon, and none to trouble you, and it’s near time a
fine lad like you should have your good share of the earth.

CHRISTY.
It’s time surely, and I a seemly fellow with great strength in me and
bravery of.... [_Someone knocks._]

CHRISTY.
_clinging to Pegeen._—Oh, glory! it’s late for knocking, and this last
while I’m in terror of the peelers, and the walking dead. [_Knocking
again._]`,
  },
  {
    id: 'trifles-discovery',
    authorGroup: 'Glaspell',
    title: 'The Discovery',
    play: 'Trifles',
    author: 'Susan Glaspell',
    location: 'One act: a private exchange, not the full play',
    characters: ['Mrs. Hale', 'Mrs. Peters'],
    speakerLabels: ['MRS. HALE', 'MRS. PETERS'],
    source: 'Project Gutenberg eBook #59432',
    verified: '2026-09-17',
    rightsNote: 'Public domain in the United States. Text taken verbatim from the Project Gutenberg plain-text edition and verified against it line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The cut opens as the men go out to the barn and ends on the discovery of the bird, before the men return.',
    context: 'Two women wait in a farmhouse kitchen while their husbands search the property for evidence against the absent Mrs. Wright. The evidence is in the kitchen, in the things the men call trifles.',
    contentNote: 'The scene turns on an implied killing and a strangled songbird.',
    text: `MRS. HALE

[_Resentfully._] I don’t know as there’s anything so strange, our
takin’ up our time with little things while we’re waiting for them to
get the evidence. [_She sits down at the big table smoothing out a
block with decision._] I don’t see as it’s anything to laugh about.

MRS. PETERS

[_Apologetically._] Of course they’ve got awful important things on
their minds.

  [_Pulls up a chair and joins MRS. HALE at the table._

MRS. HALE

[_Examining another block._] Mrs. Peters, look at this one. Here, this
is the one she was working on, and look at the sewing! All the rest
of it has been so nice and even. And look at this! It’s all over the
place! Why, it looks as if she didn’t know what she was about!

  [_After she has said this they look at each other, then start to
    glance back at the door. After an instant MRS. HALE has pulled at a
    knot and ripped the sewing._

MRS. PETERS

Oh, what are you doing, Mrs. Hale?

MRS. HALE

[_Mildly._] Just pulling out a stitch or two that’s not sewed very
good. [_Threading a needle._] Bad sewing always made me fidgety.

MRS. PETERS

[_Nervously._] I don’t think we ought to touch things.

MRS. HALE

I’ll just finish up this end. [_Suddenly stopping and leaning
forward._] Mrs. Peters?

MRS. PETERS

Yes, Mrs. Hale?

MRS. HALE

What do you suppose she was so nervous about?

MRS. PETERS

Oh--I don’t know. I don’t know as she was nervous. I sometimes sew
awful queer when I’m just tired. [_MRS. HALE starts to say something,
looks at MRS. PETERS, then goes on sewing._] Well I must get these
things wrapped up. They may be through sooner than we think. [_Putting
apron and other things together._] I wonder where I can find a piece of
paper, and string.

MRS. HALE

In that cupboard, maybe.

MRS. PETERS

[_Looking in cupboard._] Why, here’s a bird-cage. [_Holds it up._] Did
she have a bird, Mrs. Hale?

MRS. HALE

Why, I don’t know whether she did or not--I’ve not been here for so
long. There was a man around last year selling canaries cheap, but I
don’t know as she took one; maybe she did. She used to sing real pretty
herself.

MRS. PETERS

[_Glancing around._] Seems funny to think of a bird here. But she must
have had one, or why would she have a cage? I wonder what happened to
it.

MRS. HALE

I s’pose maybe the cat got it.

MRS. PETERS

No, she didn’t have a cat. She’s got that feeling some people have
about cats--being afraid of them. My cat got in her room and she was
real upset and asked me to take it out.

MRS. HALE

My sister Bessie was like that. Queer, ain’t it?

MRS. PETERS

[_Examining the cage._] Why, look at this door. It’s broke. One hinge
is pulled apart.

MRS. HALE

[_Looking too._] Looks as if someone must have been rough with it.

MRS. PETERS

Why, yes.

  [_She brings the cage forward and puts it on the table._

MRS. HALE

I wish if they’re going to find any evidence they’d be about it. I
don’t like this place.

MRS. PETERS

But I’m awful glad you came with me, Mrs. Hale. It would be lonesome
for me sitting here alone.

MRS. HALE

It would, wouldn’t it? [_Dropping her sewing._] But I tell you what I
do wish, Mrs. Peters. I wish I had come over sometimes when _she_ was
here. I--[_Looking around the room_]--wish I had.

MRS. PETERS

But of course you were awful busy, Mrs. Hale--your house and your
children.

MRS. HALE

I could’ve come. I stayed away because it weren’t cheerful--and that’s
why I ought to have come. I--I’ve never liked this place. Maybe because
it’s down in a hollow and you don’t see the road. I dunno what it is,
but it’s a lonesome place and always was. I wish I had come over to see
Minnie Foster sometimes. I can see now--

  [_Shakes her head._

MRS. PETERS

Well, you mustn’t reproach yourself, Mrs. Hale. Somehow we just don’t
see how it is with other folks until--something comes up.

MRS. HALE

Not having children makes less work--but it makes a quiet house, and
Wright out to work all day, and no company when he did come in. Did you
know John Wright, Mrs. Peters?

MRS. PETERS

Not to know him; I’ve seen him in town. They say he was a good man.

MRS. HALE

Yes--good; he didn’t drink, and kept his word as well as most, I
guess, and paid his debts. But he was a hard man, Mrs. Peters. Just to
pass the time of day with him--[_Shivers._] Like a raw wind that gets
to the bone. [_Pauses, her eye falling on the cage._] I should think
she would ’a wanted a bird. But what do you suppose went with it?

MRS. PETERS

I don’t know, unless it got sick and died.

  [_She reaches over and swings the broken door, swings it again, both
    women watch it._

MRS. HALE

You weren’t raised round here, were you? [_MRS. PETERS shakes her
head._] You didn’t know--her?

MRS. PETERS

Not till they brought her yesterday.

MRS. HALE

She--come to think of it, she was kind of like a bird
herself--real sweet and pretty, but kind of timid and--fluttery.
How?--she--did--change. [_Silence; then as if struck by a happy thought
and relieved to get back to every day things._] Tell you what, Mrs.
Peters, why don’t you take the quilt in with you? It might take up her
mind.

MRS. PETERS

Why, I think that’s a real nice idea, Mrs. Hale. There couldn’t
possibly be any objection to it, could there? Now, just what would I
take? I wonder if her patches are in here--and her things.

  [_They look in the sewing basket._

MRS. HALE

Here’s some red. I expect this has got sewing things in it. [_Brings
out a fancy box._] What a pretty box. Looks like something somebody
would give you. Maybe her scissors are in here. [_Opens box. Suddenly
puts her hand to her nose._] Why--[_MRS. PETERS bends nearer, then
turns her face away._] There’s something wrapped up in this piece of
silk.

MRS. PETERS

Why, this isn’t her scissors.

MRS. HALE

[_Lifting the silk._] Oh, Mrs. Peters--its--

  [_MRS. PETERS bends closer._

MRS. PETERS

It’s the bird.

MRS. HALE

[_Jumping up._] But, Mrs. Peters--look at it! Its neck! Look at its
neck! It’s all--other side _to_.

MRS. PETERS

Somebody--wrung--its--neck.`,
  },
  {
    id: 'scandal-teazles',
    authorGroup: 'Sheridan',
    title: 'The Daily Jangle',
    play: 'The School for Scandal',
    author: 'Richard Brinsley Sheridan',
    location: 'Act II, Scene I: the complete scene',
    characters: ['Sir Peter Teazle', 'Lady Teazle'],
    speakerLabels: ['SIR PETER', 'LADY TEAZLE'],
    source: 'Project Gutenberg eBook #1929',
    verified: '2026-09-17',
    corrections: [['nave married', 'have married'], ['y ou', 'you'], ['naturally [naturedly]', 'naturedly'], ['Humour[,] but', 'Humour, but'], ['me[:] I am sure', 'me: I am sure'], ['forget[,] Lady Teazle', 'forget, Lady Teazle']],
    rightsNote: 'Public domain in the United States. Text taken from the Project Gutenberg plain-text edition and verified against it line for line. Obvious mechanical printing errors in that edition are corrected; each correction is recorded in this record. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The complete scene, ending on Sir Peter alone after Lady Teazle leaves.',
    context: 'Six months married, the Teazles have their daily quarrel: his money, her fashion, and the question of why she married him at all. Both are enjoying it more than either will admit.',
    contentNote: null,
    text: `SCENE I.--SIR PETER and LADY TEAZLE

SIR PETER. Lady Teazle--Lady Teazle I'll not bear it.

LADY TEAZLE. Sir Peter--Sir Peter you--may scold or smile, according to
your Humour, but I ought to have my own way in everything, and what's
more I will too--what! tho' I was educated in the country I know very
well that women of Fashion in London are accountable to nobody after
they are married.

SIR PETER. Very well! ma'am very well! so a husband is to have no
influence, no authority?

LADY TEAZLE. Authority! no, to be sure--if you wanted authority over me,
you should have adopted me and not married me: I am sure you were old
enough.

SIR PETER. Old enough--aye there it is--well--well--Lady Teazle, tho'
my life may be made unhappy by your Temper--I'll not be ruined by your
extravagance--

LADY TEAZLE. My extravagance! I'm sure I'm not more extravagant than a
woman of Fashion ought to be.

SIR PETER. No no Madam, you shall throw away no more sums on such
unmeaning Luxury--'Slife to spend as much to furnish your Dressing Room
with Flowers in winter as would suffice to turn the Pantheon into a
Greenhouse, and give a Fete Champetre at Christmas.

LADY TEAZLE. Lord! Sir Peter am I to blame because Flowers are dear in
cold weather? You should find fault with the Climate, and not with me.
For my Part I'm sure I wish it was spring all the year round--and that
Roses grew under one's Feet!

SIR PETER. Oons! Madam--if you had been born to those Fopperies I
shouldn't wonder at your talking thus;--but you forget what your
situation was when I married you--

LADY TEAZLE. No, no, I don't--'twas a very disagreeable one or I should
never have married you.

SIR PETER. Yes, yes, madam, you were then in somewhat a humbler
Style--the daughter of a plain country Squire. Recollect Lady Teazle
when I saw you first--sitting at your tambour in a pretty figured linen
gown--with a Bunch of Keys at your side, and your apartment hung round
with Fruits in worsted, of your own working--

LADY TEAZLE. O horrible!--horrible!--don't put me in mind of it!

SIR PETER. Yes, yes Madam and your daily occupation to inspect
the Dairy, superintend the Poultry, make extracts from the Family
Receipt-book, and comb your aunt Deborah's Lap Dog.

LADY TEAZLE. Abominable!

SIR PETER. Yes Madam--and what were your evening amusements? to draw
Patterns for Ruffles, which you hadn't the materials to make--play Pope
Joan with the Curate--to read a sermon to your Aunt--or be stuck down to
an old Spinet to strum your father to sleep after a Fox Chase.

LADY TEAZLE. Scandalous--Sir Peter not a word of it true--

SIR PETER. Yes, Madam--These were the recreations I took you from--and
now--no one more extravagantly in the Fashion--Every Fopery adopted--a
head-dress to o'er top Lady Pagoda with feathers pendant horizontal and
perpendicular--you forget, Lady Teazle--when a little wired gauze with
a few Beads made you a fly Cap not much bigger than a blew-bottle, and
your Hair was comb'd smooth over a Roll--

LADY TEAZLE. Shocking! horrible Roll!!

SIR PETER. But now--you must have your coach--Vis-a-vis, and three
powder'd Footmen before your Chair--and in the summer a pair of white
cobs to draw you to Kensington Gardens--no recollection when you were
content to ride double, behind the Butler, on a docked Coach-Horse?

LADY TEAZLE. Horrid!--I swear I never did.

SIR PETER. This, madam, was your situation--and what have I not done
for you? I have made you woman of Fashion of Fortune of Rank--in short I
have made you my wife.

LADY TEAZLE. Well then and there is but one thing more you can make me
to add to the obligation.

SIR PETER. What's that pray?

LADY TEAZLE. Your widow.--

SIR PETER. Thank you Madam--but don't flatter yourself for though your
ill-conduct may disturb my Peace it shall never break my Heart I promise
you--however I am equally obliged to you for the Hint.

LADY TEAZLE. Then why will you endeavour to make yourself so
disagreeable to me--and thwart me in every little elegant expense.

SIR PETER. 'Slife--Madam I pray, had you any of these elegant expenses
when you married me?

LADY TEAZLE. Lud Sir Peter would you have me be out of the Fashion?

SIR PETER. The Fashion indeed!--what had you to do with the Fashion
before you married me?

LADY TEAZLE. For my Part--I should think you would like to have your
wife thought a woman of Taste--

SIR PETER. Aye there again--Taste! Zounds Madam you had no Taste when
you married me--

LADY TEAZLE. That's very true indeed Sir Peter! after having married you
I should never pretend to Taste again I allow.

SIR PETER. So--so then--Madam--if these are your Sentiments pray how
came I to be honour'd with your Hand?

LADY TEAZLE. Shall I tell you the Truth?

SIR PETER. If it's not too great a Favour.

LADY TEAZLE. Why the Fact is I was tired of all those agreeable
Recreations which you have so good naturedly Described--and
having a Spirit to spend and enjoy a Fortune--I determined to marry the
first rich man that would have me.

SIR PETER. A very honest confession--truly--but pray madam was there no
one else you might have tried to ensnare but me.

LADY TEAZLE. O lud--I drew my net at several but you were the only one I
could catch.

SIR PETER. This is plain dealing indeed--

LADY TEAZLE. But now Sir Peter if we have finish'd our daily Jangle I
presume I may go to my engagement at Lady Sneerwell's?

SIR PETER. Aye--there's another Precious circumstance--a charming set of
acquaintance--you have made there!

LADY TEAZLE. Nay Sir Peter they are People of Rank and Fortune--and
remarkably tenacious of reputation.

SIR PETER. Yes egad they are tenacious of Reputation with a vengeance,
for they don't chuse anybody should have a Character but themselves!
Such a crew! Ah! many a wretch has rid on hurdles who has done less
mischief than these utterers of forged Tales, coiners of Scandal, and
clippers of Reputation.

LADY TEAZLE. What would you restrain the freedom of speech?

SIR PETER. Aye they have made you just as bad [as] any one of the
Society.

LADY TEAZLE. Why--I believe I do bear a Part with a tolerable Grace--But
I vow I bear no malice against the People I abuse, when I say an
ill-natured thing, 'tis out of pure Good Humour--and I take it for
granted they deal exactly in the same manner with me, but Sir Peter you
know you promised to come to Lady Sneerwell's too.

SIR PETER. Well well I'll call in, just to look after my own character.

LADY TEAZLE. Then, indeed, you must make Haste after me, or you'll be
too late--so good bye to ye.

SIR PETER. So--I have gain'd much by my intended expostulation--yet
with what a charming air she contradicts every thing I say--and how
pleasingly she shows her contempt of my authority--Well tho' I can't
make her love me, there is certainly a great satisfaction in quarrelling
with her; and I think she never appears to such advantage as when she is
doing everything in her Power to plague me.

     [Exit.]`,
  },
  {
    id: 'tartuffe-dorine',
    authorGroup: 'Molière',
    title: 'You Will Be Tartuffed',
    play: 'Tartuffe',
    author: 'Molière, translated by Jeffrey D. Hoeper',
    location: 'Act II, Scene III: the complete scene',
    verse: true,
    characters: ['Dorine', 'Mariane'],
    speakerLabels: ['Dorine', 'Mariane'],
    source: 'Project Gutenberg eBook #28488',
    verified: '2026-09-17',
    rightsNote: 'The translator, Jeffrey D. Hoeper, granted this translation to the public domain, as stated in the Project Gutenberg edition itself. Text taken verbatim and verified line for line. Readers elsewhere should check the copyright law where they live.',
    cutNote: 'The complete scene, in rhymed couplets; it ends as Dorine catches sight of Valere approaching.',
    context: 'Mariane’s father intends to marry her to Tartuffe. Her maid Dorine, armed only with questions and mockery, refuses to let her accept it quietly.',
    contentNote: null,
    text: `SCENE III
Dorine, Mariane

Dorine.  Have you entirely lost your voice and heart?
        Why must I continue playing your part?
        To think you allow such a mad proposal
        Without voicing even a meek refusal!
Mariane.  How can I resist such a harsh patriarch?
Dorine.  By any means!  Don't be an easy mark!
Mariane.  But how?
Dorine.                Tell him you can't love on command,
        That you marry for yourself, not by demand,
        And since you are most concerned in these affairs
        You'll choose for yourself the sire of his heirs,
        And that, if Tartuffe is so charming to him,
        He can wed him himself--if that's his whim.
Mariane.  A father, I'm sure, has absolute power;
        Before him I can only cringe and cower.
Dorine.  Use your head.  Valere wants to tie the knot.
        Do you really love him, I ask--or not?
Mariane.  Your injustice to me has a mortal sting!
        Dorine, how can you ask me such a thing?
        Haven't I poured out my whole soul to you,
        And don't you know yet that my love is true?
Dorine.  How do I know that your heart echoes your voice
        And that this love is truly your own choice?
Mariane.  Your doubts, Dorine, wrong me greatly;
        My real feelings are shown far too plainly.
Dorine.  You love him then?
Mariane.                           Yes, with the strongest passion.
Dorine.  And he seems to love you in the same fashion?
Mariane.  I think so.
Dorine.                  And both of you burn equally
        For this union in marriage?
Mariane.                               Certainly.
Dorine.  And about this other man, what's your intention?
Mariane.  I'd die before I'd submit to coercion.
Dorine.  Fine!  I hadn't thought of that recourse.
        Death would give you such a forcible divorce.
        What an ingenious remedy!  Geez!
        I hate to hear such stupid ideas.
Mariane.  Good Heavens!  What a rotten mood you're in!
        You have no pity for my pain, Dorine!
Dorine.  I have no sympathy for foolishness
        And those who meet a crisis with such weakness.
Mariane.  But what do you want me to do?  I was born frail.
Dorine.  A woman in love needs a heart of steel.
Mariane.  But haven't I kept it free for my lover
        Whose task it is to win me from my father?
Dorine.  What!  If your father is a mad fanatic
        Whose love for Tartuffe is completely lunatic
        And who has blocked the match you are now bewailing,
        Is your lover to be damned for failing?
Mariane.  But am I to display how deeply I'm bitten
        By rejecting Tartuffe like one who's love-smitten?
        Am I, because of Valere's strength and beauty,
        To renounce my modesty and duty?
        And would you have me show my heart to all . . . ?
Dorine.  No, no, not at all.  I'm wrong to forestall
        Your marriage to Tartuffe, and my defiance
        Is apparent in barring that alliance.
        What reason have I for my outrageous
        Attempt to stop something so advantageous?
        Tartuffe!  Oh!  Isn't he something to behold?
        Surely Tartuffe is not made from such a mold,
        If rightly viewed, as to make a person laugh;
        'Twould be an honor to be his better half.
        The whole world already crowns him with glory;--
        Both in physique and character he's laudatory;
        He has red ears and a florid, flushing face
        With him for a mate you'd live in joyful grace.
Mariane.  Dear God!
Dorine.                   What delight you will feel within
        To know that you're wed to a man like him.
Mariane.  Oh!  Please stop talking, and show me the way
        To avoid this marriage.  I will obey,
        You've said enough, and I'm ready to be led.
Dorine.  No.  A good daughter must obey her dad--
        Even if he wishes her to make love
        To an ape.  What are you complaining of?
        You will proceed to his little villa
        Where you will get your absolute fill of
        Uncles and cousins to be entertained.
        Right away you'll move among the most urbane
        Of hicks.  First you will make some overture
        To the wives of the judge and the tax assessor,
        Who will kindly seat you on a folding chair.
        During Carnival, you may hope to have there
        A ball with two bagpipes for an orchestra
        And maybe some puppets and a tame gorilla.
        But if your husband . . .
Mariane.                    Oh!  You're killing me.
        Please help me avoid this catastrophe.
Dorine.  I am your servant.
Mariane.                         Oh!  Dorine, mercy . . .
Dorine.  To punish you, I ought to leave things be.
Mariane.  My dear girl!
Dorine.                       No.
Mariane.                           If I declared my love . . .
Dorine.  No.  Tartuffe is your man; that's sure enough.
Mariane.  You know that I've always trusted that you'd
        Help me . . .
Dorine.        No. I'm sure you will be tartuffed.
Mariane.  All right!  Since my fate no longer moves you,
        Henceforth you may leave me alone and blue;
        From deep sorrow my heart will draw relief,
        And I know an absolute cure for my grief.
[She starts to leave.]
Dorine.  Whoa! I'm not really angry. Come back,--do.
        In spite of everything, I pity you.
Mariane.  If I'm to be the one you crucify,
        You'll see, Dorine, how quickly I shall die.
Dorine.  Don't torture yourself.  We can easily
        Block them. . . . But look!  I think that's Valere I see.`,
  },
];

export const providedSceneById = id => PROVIDED_SCENES.find(s => s.id === id) ?? null;
