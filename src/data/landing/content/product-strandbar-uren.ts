import { solutionPage } from '../solutionPage'

/**
 * /staff-hours-and-availability · /nl/uren-en-beschikbaarheid
 *
 * Oplossing vier voor de strandbars: de ploeg geeft zelf haar beschikbaarheid
 * en haar gewerkte uren in, in plaats van dat de uitbater elke week vijftien
 * mensen apart aanschrijft.
 *
 * De grens ligt hier scherper dan op de andere vier pagina's en ze staat drie
 * keer in de tekst, want dit is het onderwerp waar overbeloven meteen juridisch
 * wordt:
 *
 *  - Wij maken geen uurrooster. Dimona, flexi-jobregels en de sectorale CAO
 *    lopen langs het sociaal secretariaat en dat blijft zo.
 *  - Dit is geen officiële tijdsregistratie en telt niet als bewijs voor een
 *    sociale inspectie. Het is wat de ploeg zelf ingaf en wat de uitbater
 *    bevestigde.
 *  - Zie ook de verboden zinnen bij "Drukteverwachting en bestellijst" in
 *    .nivora/research/oplossingen-kandidaten.md.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'Fifteen people, and the same round of asking every week',
      subhead:
        'Who can work Saturday, and how many hours did you do. Two questions you put to everybody separately every week, and the answers come back as fifteen loose messages that somebody has to add up at the end of the month.',
      answerH2: 'How does a team report its own hours and availability?',
      answer:
        'Itself, in the same app where it sees its shifts. Nivora builds it so your team marks when it can work for the coming weekends, and enters its own hours after each shift. You get that as one list you confirm with a single click, rather than as fifteen messages you have to count up yourself. When a busy day is coming, the people who said they were free that day get asked, instead of you working down a phone list on Thursday evening.',
      answerDetail: [
        'What comes out is a proposal, not a rota. Who actually stands there, under which status and with which Dimona, stays your business and your payroll office\'s, and we say that before we start rather than in a clause afterwards.',
        'It runs on the phone your team already has in its hand. No badge, no clocking machine, no second device that ends up in the sand. Somebody who starts in July is set up in the time it takes to send them a link.',
      ],
      manifesto:
        'Your team already knows when it can work. What is missing is somewhere to put it.',
      problemH2: 'Where that round of asking sits in your week',
      problem: [
        'Availability comes in however it comes in. Somebody answers in the group, somebody messages you separately, somebody says it at the bar and somebody does not answer at all. What you are left with is a sheet with names crossed out and a fair chance that you asked one person twice.',
        'The hours come afterwards. Fifteen people who roughly know at the end of the month how much they worked, and one person who has to add that up before it goes to the payroll office. Whoever is out by half an hour is out by half an hour, and nobody can check it back.',
        'And on the days it really matters, you ring around. On Thursday evening it turns out Saturday is going to be heavier than you thought, and then the row of phone calls starts to people who already have something else on.',
      ],
      pillarsH2: 'How this is put together',
      pillars: [
        {
          title: 'The team fills it in itself',
          body: 'Availability for the weeks that are coming, in half a minute, from the phone. Not a form with twelve fields but the days with a yes, a no and a maybe. Whoever has not filled anything in is visible instead of invisible, which is the whole difference with a group chat.',
        },
        {
          title: 'Hours after the shift, not at the end of the month',
          body: 'They enter it as they walk out, while they still know exactly when they came in. You confirm with one click. Anyone who enters something different from what was planned stands out rather than disappearing, and both of you can see the same thing, which takes the discussion out of it before it starts.',
        },
        {
          title: 'We do not make your rota',
          body: 'This says who is available and how many people a day looks like it needs. Who you put on, under which status, with which Dimona and inside which sector agreement stays with you and your payroll office. That is not modesty, it is a line we do not cross: those rules change and getting them wrong is not our risk to carry for you.',
        },
      ],
      signals: [
        'Every week you ask fifteen people the same question',
        'The hours get scraped together at the end of the month',
        'On Thursday evening you ring around for Saturday',
        'There has been a discussion about hours nobody could check back',
      ],
      automationsH2: 'Other solutions for a beach bar',
      automationsIntro:
        'The rest of what we build for this trade. Each one is a separate thing you can ask for.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say this makes your rota. Planday, Shiftbase, Eitje and Nostradamus do exactly that, and if you already work with one of them this comes alongside it or it does not come at all. What we build is for the business that runs on messages today and does not want a second subscription in order to stop.',
        'We are not going to promise time registration that counts for an inspection. Dimona, the attendance rules and the flexi-job regime run through your payroll office and they stay there. What stands here is what your team entered and what you confirmed, which is worth a great deal internally and is not a legal record.',
        'And we are not going to say everybody fills it in. In the first weeks not everybody fills it in. The difference is that you can see who, on Tuesday, instead of finding out on Friday at four.',
      ],
      faqs: [
        {
          q: 'Does this count as official time registration?',
          a: 'No, and we would rather be blunt about it than let you find out later. What is in here is what your team entered and what you confirmed. Dimona, the attendance registration where it applies to you, and everything around flexi-jobs and student contracts runs through your payroll office exactly as it does today. This sits next to that, to stop the counting up by hand.',
        },
        {
          q: 'Does everybody have to install an app?',
          a: 'No. A link works in the browser, and for somebody who works three Saturdays in July that is usually the whole story. Whoever comes back every season can install the app so they see their shifts without looking anything up. Somebody who genuinely will not do either can keep sending you a message, and you enter it, but then you are back to the counting.',
        },
        {
          q: 'What if somebody enters more hours than they worked?',
          a: 'You see it. What was entered stands next to what was planned, and anything that does not match is at the top of the list rather than somewhere in it. You confirm, adjust or ask. That is not a control mechanism we invented, it is what you already do at the end of the month, only now on the day itself and with both of you looking at the same figure.',
        },
        {
          q: 'We work with flexi staff and students who change every week.',
          a: 'That is the reason this exists. A team that is the same all year gets by with a sheet on the wall. A team of fifteen that is a different fifteen every fortnight does not, and adding somebody has to take thirty seconds or it will not happen in July. Setting up a new person is sending them a link.',
        },
      ],
      featuresTitle: 'How does a team report its own hours and availability?',
      featuresSubtitle:
        'Who can work Saturday, and how many hours did you do. Two questions you put to everybody separately every week, and the answers come back as fifteen loose messages.',
      ctaTitle: 'Send us last week\'s round of asking',
      ctaBody:
        'The messages you filled last Saturday with, and the hours as they eventually reached your payroll office. We show you which part of that could have run by itself and which part stays work for people, before anything is agreed or signed.',
      seoTitle: 'Hours and availability from your own team, for beach bars · Nivora',
      seoDescription:
        'Your team marks its own availability for the coming weekends and enters its own hours after each shift, from the phone. You confirm one list with a single click instead of counting up fifteen messages. Not a rota and not a legal record. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Vijftien man, en elke week opnieuw dezelfde rondvraag',
      subhead:
        'Wie kan er zaterdag, en hoeveel uren heb je gedaan. Twee vragen die u elke week aan iedereen apart stelt, en waarvan de antwoorden terugkomen als vijftien losse berichten die iemand op het einde van de maand moet optellen.',
      answerH2: 'Hoe geeft een ploeg haar uren en haar beschikbaarheid zelf door?',
      answer:
        'Zelf, in dezelfde app waarin ze haar shiften ziet. Nivora bouwt het zo dat uw ploeg voor de weekends die eraan komen aanduidt wanneer ze kan, en na elke shift zelf ingeeft hoeveel uren ze gedraaid heeft. U krijgt dat als één lijst die u met één klik bevestigt, in plaats van als vijftien berichten die u zelf moet natellen. Komt er een drukke dag aan, dan krijgen de mensen die zich die dag vrij gezet hebben de vraag, in plaats van dat u op donderdagavond een rijtje afbelt.',
      answerDetail: [
        'Wat eruit komt is een voorstel, geen rooster. Wie er uiteindelijk staat, onder welk statuut en met welke Dimona, blijft uw zaak en die van uw sociaal secretariaat, en dat zeggen wij voor wij beginnen in plaats van in een clausule achteraf.',
        'Het loopt over de telefoon die uw ploeg toch al in de hand heeft. Geen badge, geen prikklok, geen tweede toestel dat in het zand belandt. Wie in juli begint, staat erop in de tijd die het kost om hem een link te sturen.',
      ],
      manifesto:
        'Uw ploeg weet al wanneer ze kan werken. Het enige wat ontbreekt, is een plek waar ze het kwijt kan.',
      problemH2: 'Waar die rondvraag in uw week zit',
      problem: [
        'De beschikbaarheid komt binnen zoals ze uitkomt. Iemand antwoordt in de groep, iemand stuurt u apart, iemand zegt het aan de toog en iemand antwoordt niet. Wat u overhoudt is een blad met doorstreepte namen en een gerede kans dat u iemand twee keer gevraagd hebt.',
        'De uren komen achteraf. Vijftien mensen die op het einde van de maand ongeveer weten hoeveel ze gewerkt hebben, en één iemand die dat moet optellen voor het naar het sociaal secretariaat gaat. Wie er een half uur naast zit, zit er een half uur naast, en niemand kan het nagaan.',
        'En op de dagen dat het er echt toe doet, belt u rond. Op donderdagavond blijkt dat zaterdag zwaarder wordt dan gedacht, en dan begint het rijtje telefoons naar mensen die al iets anders hebben.',
      ],
      pillarsH2: 'Hoe dit in elkaar zit',
      pillars: [
        {
          title: 'De ploeg vult zelf in',
          body: 'Beschikbaarheid voor de weken die eraan komen, in een halve minuut, vanaf de telefoon. Geen formulier met twaalf velden maar de dagen met een ja, een nee en een misschien. Wie niets ingevuld heeft, is zichtbaar in plaats van onzichtbaar, en dat is het hele verschil met een groepsgesprek.',
        },
        {
          title: 'Uren na de shift, niet op het einde van de maand',
          body: 'Hij geeft het in terwijl hij buitengaat, wanneer hij nog precies weet wanneer hij binnenkwam. U bevestigt met één klik. Wie iets anders ingeeft dan wat er ingepland stond, valt op in plaats van weg, en u kijkt allebei naar hetzelfde, wat de discussie eruit haalt voor ze begint.',
        },
        {
          title: 'Wij maken uw rooster niet',
          body: 'Hierin staat wie beschikbaar is en hoeveel volk een dag lijkt te vragen. Wie u opzet, onder welk statuut, met welke Dimona en binnen welke sectorale CAO, blijft van u en van uw sociaal secretariaat. Dat is geen bescheidenheid maar een grens die wij niet oversteken: die regels veranderen, en ze verkeerd toepassen is geen risico dat wij voor u dragen.',
        },
      ],
      signals: [
        'U stelt elke week aan vijftien mensen dezelfde vraag',
        'De uren worden op het einde van de maand bij elkaar geraapt',
        'Op donderdagavond belt u rond voor zaterdag',
        'Er is al discussie geweest over uren die niemand kon nagaan',
      ],
      automationsH2: 'Andere oplossingen voor een strandbar',
      automationsIntro:
        'De rest van wat wij voor dit vak bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat dit uw uurrooster maakt. Planday, Shiftbase, Eitje en Nostradamus doen precies dat, en werkt u daar al mee, dan komt dit ernaast of het komt niet. Wat wij bouwen is voor de zaak die vandaag met berichten werkt en die geen tweede abonnement wil om daarmee te stoppen.',
        'Wij gaan geen tijdsregistratie beloven die voor een inspectie telt. Dimona, de aanwezigheidsregistratie waar ze op u van toepassing is, en alles rond flexi-jobs en studentencontracten loopt langs uw sociaal secretariaat en dat blijft daar. Wat hier staat is wat uw ploeg ingaf en wat u bevestigde, en dat is intern veel waard en geen wettelijk bewijsstuk.',
        'En wij gaan niet zeggen dat iedereen het invult. De eerste weken vult niet iedereen het in. Het verschil is dat u op dinsdag ziet wie, in plaats van het vrijdag om vier uur te ontdekken.',
      ],
      faqs: [
        {
          q: 'Telt dit als officiële tijdsregistratie?',
          a: 'Nee, en wij zeggen dat liever recht voor zijn raap dan dat u het later ontdekt. Wat hierin staat is wat uw ploeg ingaf en wat u bevestigde. Dimona, de aanwezigheidsregistratie waar ze voor u geldt, en alles rond flexi-jobs en studentencontracten loopt langs uw sociaal secretariaat precies zoals vandaag. Dit komt daarnaast, om het optellen met de hand weg te nemen.',
        },
        {
          q: 'Moet iedereen een app installeren?',
          a: 'Nee. Een link werkt in de browser, en voor iemand die drie zaterdagen in juli werkt, is dat meestal het hele verhaal. Wie elk seizoen terugkomt, kan de app installeren zodat hij zijn shiften ziet zonder iets op te zoeken. Wie echt geen van beide wil, mag u een bericht blijven sturen en dan geeft u het in, maar dan bent u terug bij het tellen.',
        },
        {
          q: 'Wat als iemand meer uren ingeeft dan hij gewerkt heeft?',
          a: 'Dan ziet u dat. Wat er ingegeven werd staat naast wat er ingepland stond, en wat niet klopt staat bovenaan de lijst in plaats van ergens in de lijst. U bevestigt, past aan of vraagt het na. Dat is geen controlemiddel dat wij verzonnen hebben, het is wat u op het einde van de maand toch al doet, alleen nu op de dag zelf en met allebei hetzelfde cijfer voor ogen.',
        },
        {
          q: 'Wij werken met flexi\'s en studenten die elke week wisselen.',
          a: 'Dat is net de reden dat dit bestaat. Een ploeg die het hele jaar dezelfde is, redt het met een blad aan de muur. Een ploeg van vijftien die om de twee weken vijftien anderen zijn, niet, en iemand toevoegen moet dertig seconden duren of het gebeurt in juli gewoon niet. Een nieuwe opzetten is hem een link sturen.',
        },
      ],
      featuresTitle: 'Hoe geeft een ploeg haar uren en haar beschikbaarheid zelf door?',
      featuresSubtitle:
        'Wie kan er zaterdag, en hoeveel uren heb je gedaan. Twee vragen die u elke week aan iedereen apart stelt, en waarvan de antwoorden terugkomen als vijftien losse berichten.',
      ctaTitle: 'Stuur ons de rondvraag van vorige week',
      ctaBody:
        'De berichten waarmee u vorige week uw zaterdag hebt volgekregen, en de uren zoals ze uiteindelijk bij uw sociaal secretariaat terechtkwamen. Wij tonen u welk stuk daarvan vanzelf had kunnen lopen en welk stuk mensenwerk blijft, voor er iets afgesproken of getekend is.',
      seoTitle: 'Uren en beschikbaarheid uit uw eigen ploeg, voor strandbars · Nivora',
      seoDescription:
        'Uw ploeg duidt zelf haar beschikbaarheid aan voor de weekends die eraan komen en geeft na elke shift zelf haar uren in, vanaf de telefoon. U bevestigt één lijst met één klik in plaats van vijftien berichten op te tellen. Geen rooster en geen wettelijk bewijsstuk. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/strandbar-opl-uren.webp', manifesto: '/landing/auto-brugge-horeca.webp' },
)
