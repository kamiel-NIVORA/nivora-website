import { solutionPage } from '../solutionPage'

/**
 * /your-day-on-one-screen · /nl/de-dag-op-een-scherm
 *
 * Oplossing drie voor de strandbars: het scherm dat wie de dienst opent, voor
 * zich krijgt. Reservaties, vrije plaatsen, wie er werkt, en het weer per uur.
 *
 * Twee dingen die deze pagina anders maken dan het gemiddelde dashboardverhaal:
 *
 *  1. Eén dag per keer. Geen omzetgrafiek per kwartaal en geen wand met
 *     veertien tegels: dat is wat er na drie weken niet meer opengedaan wordt.
 *  2. Het internet aan het strand valt uit. Een strandbar heeft zelden een
 *     stabiele lijn, dus offline werken is hier geen randgeval maar een
 *     ontwerpeis, en dat staat als FAQ op de pagina in plaats van als voetnoot
 *     in een contract.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'Your Saturday on one screen, before it starts',
      subhead:
        'How many people are booked in, how many are working and what the weather does are three separate places today. Whoever opens the shift makes the comparison in their head, and usually makes it too late.',
      answerH2: 'What is on that screen?',
      answer:
        'One day at a time, with everything worth knowing about that day next to each other: every booking and its status, how many places are still free, who is on that day, and what the forecast says per hour. Nivora builds it as a single picture that can hang behind the bar, so that whoever opens the service does not first have to open three programs and a chat window to find out what is coming at them.',
      answerDetail: [
        'What is on it is what you actually use that day. No quarterly turnover graph and no wall of fourteen tiles, because that is exactly what stops being opened after three weeks. If something on the screen does not change a decision that day, it comes off.',
        'The screen is also where the day changes. A group that drops out, a bed that comes free, somebody who calls in sick: it gets entered here once and the rest follows, so the kitchen is not still prepping for twenty at six.',
      ],
      manifesto:
        'You cannot make a busy Saturday quieter. You can see it coming on Thursday.',
      problemH2: 'Why nobody sees the whole day today',
      problem: [
        'The bookings sit in one system or in a chat window, the rota is on the kitchen wall, and the forecast is on the phone of whoever happened to look at it. Nothing is wrong with any of the three, they are simply never in the same place at the same time.',
        'So whoever opens the service does not know what is coming. They see the tables that are laid, not the group of twenty walking in at eight, and not that two of the four people down for tonight are new.',
        'And a change does not reach everybody. A group cancels at four, the kitchen hears about it at six, and there is mise en place standing ready for twenty people who are not coming.',
      ],
      pillarsH2: 'How this is put together',
      pillars: [
        {
          title: 'One day at a time',
          body: 'Today, and tomorrow next to it. The season as a whole is a different question and it gets a different answer at a different moment. What this screen has to answer is what somebody standing behind the bar at ten in the morning needs to know, and that is a short list.',
        },
        {
          title: 'It hangs where it is used',
          body: 'On a tablet behind the bar, on a screen in the kitchen, on a phone in a pocket. Big enough to read from a metre away with wet hands, which rules out most of what a dashboard normally looks like. Everybody sees the same day, so nobody has to ask.',
        },
        {
          title: 'What changes, changes everywhere',
          body: 'A cancellation, an extra group, somebody swapping a shift: it is entered once, in one place, and it is immediately the truth for the bar, the kitchen and whoever is doing the ordering. That is the whole point of putting it on one screen rather than in four.',
        },
      ],
      signals: [
        'Whoever opens the service does not know what is booked in that day',
        'The rota is in the kitchen and the bookings are somewhere else',
        'A cancellation reaches the kitchen two hours late',
        'You get called about things that could have been on a screen',
      ],
      automationsH2: 'Other solutions for a beach bar',
      automationsIntro:
        'The rest of what we build for this trade. Each one is a separate thing you can ask for.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say this replaces a till report. Lightspeed and the others show what was sold and they will keep doing that. This is about what still has to happen, which is a different question and a different moment of the day.',
        'We are not going to say a screen saves a service. What it does is put the same day in front of everybody, so the discussion at ten in the morning is about what to do rather than about what is true.',
        'And we are not going to say the weather is on there with any certainty. It is on there as what it is: a forecast per hour with its probability next to it, from the same public source everybody uses. On a coast, that is worth something and it is not worth everything.',
      ],
      faqs: [
        {
          q: 'What does it run on?',
          a: 'A browser, so on the tablet behind the bar, on an old screen in the kitchen with a small box behind it, or on a phone. Nothing has to be installed and nothing has to be bought specially. If you already have a screen hanging somewhere, we would rather use that one than sell you a new one.',
        },
        {
          q: 'What happens when the internet drops out on the beach?',
          a: 'It keeps showing the day it last loaded, and what you enter goes out as soon as there is a connection again. That is not a nice extra, it is the reason the thing is built the way it is: a beach bar rarely has a stable line, and a screen that goes blank at the worst moment of the season is worse than no screen.',
        },
        {
          q: 'Can my team see this?',
          a: 'Yes, and that is largely what it is for, but not all of it. Who is working and what is booked is for everybody. Turnover, guest history and what somebody earns is not, and that is set per role rather than per person, so a new flexi worker in July does not need anything arranged for them.',
        },
        {
          q: 'Do we have to sit and watch this all season?',
          a: 'Two moments a day. Once when you open, to see what is coming, and once after service, to enter what changed. If it needs more attention than that, it is doing the opposite of its job and we would rather hear it in July than in September.',
        },
      ],
      featuresTitle: 'What is on that screen?',
      featuresSubtitle:
        'How many people are booked in, how many are working and what the weather does are three separate places today. Whoever opens the shift makes the comparison in their head.',
      ctaTitle: 'Describe us your busiest Saturday',
      ctaBody:
        'What was booked in that day, who was working, and the moment it went wrong. We draw the screen you would have had that morning, with the information you already had at the time. You can see for yourself straight away whether it would have changed anything.',
      seoTitle: 'The day on one screen, for beach bars · Nivora',
      seoDescription:
        'One screen behind the bar with today on it: every booking and its status, the places still free, who is working, and the forecast per hour. Built to keep working when the line at the beach drops. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Uw zaterdag op één scherm, voor hij begint',
      subhead:
        'Hoeveel volk er geboekt staat, hoeveel man er werkt en wat het weer doet, staan vandaag op drie plaatsen. Wie de dienst opent maakt de vergelijking in zijn hoofd, en meestal te laat.',
      answerH2: 'Wat staat er op dat scherm?',
      answer:
        'Eén dag per keer, met alles wat over die dag te weten valt naast elkaar: elke reservatie met haar status, hoeveel plaatsen er nog vrij zijn, wie er die dag werkt, en wat het weerbericht per uur zegt. Nivora bouwt dat als één beeld dat achter de toog mag hangen, zodat wie de dienst opent niet eerst drie programma\'s en een gespreksvenster moet opendoen om te weten wat er op hem afkomt.',
      answerDetail: [
        'Wat erop staat is wat u die dag echt gebruikt. Geen omzetgrafiek per kwartaal en geen wand met veertien tegels, want dat is net wat er na drie weken niet meer opengedaan wordt. Verandert iets op dat scherm die dag geen enkele beslissing, dan gaat het eraf.',
        'Het scherm is ook de plek waar de dag verandert. Een groep die afzegt, een bed dat vrijkomt, iemand die ziek belt: dat wordt hier één keer ingegeven en de rest volgt, zodat de keuken om zes uur niet nog altijd voor twintig man staat klaar te zetten.',
      ],
      manifesto:
        'U kunt een drukke zaterdag niet rustiger maken. U kunt hem donderdag al zien aankomen.',
      problemH2: 'Waarom vandaag niemand de hele dag ziet',
      problem: [
        'De reservaties zitten in het ene systeem of in een gespreksvenster, de planning hangt in de keuken, en het weerbericht staat op de telefoon van wie er toevallig naar keek. Aan geen van de drie is iets mis, ze staan alleen nooit op hetzelfde moment op dezelfde plaats.',
        'Wie de dienst opent, weet daardoor niet wat er komt. Hij ziet de tafels die gedekt staan, niet de groep van twintig die om acht uur binnenvalt, en niet dat twee van de vier die vanavond opstaan hier nieuw zijn.',
        'En een wijziging bereikt niet iedereen. Een groep zegt af om vier uur, de keuken hoort het om zes uur, en er staat mise en place klaar voor twintig man die niet komen.',
      ],
      pillarsH2: 'Hoe dit in elkaar zit',
      pillars: [
        {
          title: 'Eén dag per keer',
          body: 'Vandaag, met morgen ernaast. Het seizoen als geheel is een andere vraag en die krijgt een ander antwoord op een ander moment. Wat dit scherm moet beantwoorden is wat iemand die om tien uur \'s ochtends achter de toog staat, moet weten, en dat is een kort lijstje.',
        },
        {
          title: 'Het hangt waar het gebruikt wordt',
          body: 'Op een tablet achter de toog, op een scherm in de keuken, op een telefoon in een broekzak. Groot genoeg om van een meter afstand te lezen met natte handen, wat meteen het grootste deel wegstreept van hoe een dashboard er normaal uitziet. Iedereen ziet dezelfde dag, dus niemand hoeft het te vragen.',
        },
        {
          title: 'Wat verandert, verandert overal',
          body: 'Een annulatie, een groep erbij, iemand die van shift wisselt: het wordt één keer ingegeven, op één plaats, en het is meteen de waarheid voor de toog, de keuken en wie de bestelling doet. Dat is de hele reden om het op één scherm te zetten in plaats van op vier.',
        },
      ],
      signals: [
        'Wie de dienst opent, weet niet wat er die dag geboekt staat',
        'De planning hangt in de keuken en de reservaties staan elders',
        'Een annulatie bereikt de keuken twee uur te laat',
        'U wordt gebeld voor dingen die op een scherm hadden kunnen staan',
      ],
      automationsH2: 'Andere oplossingen voor een strandbar',
      automationsIntro:
        'De rest van wat wij voor dit vak bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat dit een kassarapport vervangt. Lightspeed en de andere kassa\'s tonen wat er verkocht is en dat blijven ze doen. Dit gaat over wat er nog moet gebeuren, en dat is een andere vraag op een ander moment van de dag.',
        'Wij gaan niet zeggen dat een scherm een dienst redt. Wat het doet is dat iedereen dezelfde dag voor zich heeft, zodat het gesprek om tien uur \'s ochtends gaat over wat er moet gebeuren en niet over wat er waar is.',
        'En wij gaan niet zeggen dat het weer daar met zekerheid op staat. Het staat er zoals het is: een voorspelling per uur met de kans erbij, uit dezelfde publieke bron die iedereen gebruikt. Aan een kust is dat iets waard en het is niet alles waard.',
      ],
      faqs: [
        {
          q: 'Waarop draait dat?',
          a: 'Op een browser, dus op de tablet achter de toog, op een oud scherm in de keuken met een klein kastje erachter, of op een telefoon. Er moet niets geïnstalleerd en niets speciaal aangekocht worden. Hangt er bij u al een scherm, dan gebruiken wij liever dat dan u een nieuw te verkopen.',
        },
        {
          q: 'Wat als het internet aan het strand uitvalt?',
          a: 'Dan blijft het de dag tonen zoals hij het laatst binnenhaalde, en wat u ingeeft vertrekt zodra er weer verbinding is. Dat is geen mooi extraatje maar de reden waarom het ding gebouwd is zoals het gebouwd is: een strandbar heeft zelden een stabiele lijn, en een scherm dat zwart gaat op het slechtste moment van het seizoen is erger dan geen scherm.',
        },
        {
          q: 'Mag mijn ploeg dit zien?',
          a: 'Ja, en dat is grotendeels waarvoor het dient, maar niet alles. Wie er werkt en wat er geboekt staat is voor iedereen. Omzet, gastgeschiedenis en wat iemand verdient niet, en dat wordt per rol ingesteld in plaats van per persoon, zodat er voor een nieuwe flexi in juli niets geregeld moet worden.',
        },
        {
          q: 'Moeten wij daar het hele seizoen naar zitten kijken?',
          a: 'Twee momenten per dag. Eén keer bij het openen, om te zien wat er komt, en één keer na de dienst, om in te geven wat er veranderd is. Vraagt het meer aandacht dan dat, dan doet het het omgekeerde van zijn werk, en dan horen wij dat liever in juli dan in september.',
        },
      ],
      featuresTitle: 'Wat staat er op dat scherm?',
      featuresSubtitle:
        'Hoeveel volk er geboekt staat, hoeveel man er werkt en wat het weer doet, staan vandaag op drie plaatsen. Wie de dienst opent maakt de vergelijking in zijn hoofd.',
      ctaTitle: 'Beschrijf ons uw drukste zaterdag',
      ctaBody:
        'Wat er die dag geboekt stond, wie er werkte, en op welk moment het misliep. Wij tekenen het scherm dat u die ochtend gehad zou hebben, met de gegevens die u toen ook al had. U ziet meteen zelf of het iets veranderd zou hebben.',
      seoTitle: 'De dag op één scherm, voor strandbars · Nivora',
      seoDescription:
        'Eén scherm achter de toog met de dag erop: elke reservatie met haar status, de plaatsen die nog vrij zijn, wie er werkt, en het weerbericht per uur. Gebouwd om te blijven werken wanneer de lijn aan het strand wegvalt. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/strandbar-opl-dag.webp', manifesto: '/landing/auto-opl-antwoord-b.webp' },
)
