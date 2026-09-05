import { solutionPage } from '../solutionPage'

/**
 * /how-busy-it-gets · /nl/hoe-druk-het-wordt
 *
 * Oplossing vijf voor de strandbars. Dit is de bewerking van de geparkeerde
 * pagina .nivora/geparkeerde-oplossingen/product-drukte.ts, toegespitst op één
 * vak in plaats van op horeca en bakkers samen: het tij, het ijs, de vaten en
 * de flexi's staan er nu in, de broodleverancier niet meer.
 *
 * Geschreven binnen de grenzen van .nivora/research/oplossingen-kandidaten.md,
 * onderdeel "Drukteverwachting en bestellijst". Dat onderzoek toetste dit
 * voorstel adversarieel tegen de markt. Wat daaruit hard overeind blijft en
 * hier dus letterlijk op de pagina staat:
 *
 *  - Geen nieuwheidsclaim. Nostradamus, Delicious Data, Planday, Shiftbase en
 *    Lightspeed verkopen dit vandaag en staan met naam in het blok onderaan.
 *  - Geen accuraatheidspercentage voor de eerste oplevering. Elk cijfer dat wij
 *    nu zouden noemen is verzonnen.
 *  - Twee volle seizoenen historiek is een voorwaarde, geen detail. Een zaak
 *    die vorig jaar openging, kunnen wij niet bedienen.
 *  - Geen rooster, geen absolute belofte over derving of tekort.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Our solutions',
      h1: 'How busy it gets, two days out',
      subhead:
        'You order your ice, your kegs and your hours for the day after tomorrow, and you do it on instinct and on whatever the forecast says at that moment. One Friday nobody turns up, the next the queue is on the promenade and you are two people short.',
      answerH2: 'How do I know how busy it will be the day after tomorrow?',
      answer:
        'Every evening Nivora puts four things side by side: what your own till did on the same kind of day in past seasons, the weather forecast, the school holidays here and just across the border, and what is publicly on in and around the town. Out of that comes one sheet with an estimate for the day after tomorrow, with how many people that calls for and what you would do well to order. You decide what to do with it. Every month you get an honest look back at how often it was right and where it was off, including the Saturdays we got wrong.',
      answerDetail: [
        'For a beach bar the tide belongs in there too. A low tide in the early evening keeps people on the beach and pushes your second peak back an hour, and a high tide at four in the afternoon does the opposite. That is not weather and it is not on any forecast, but it is on a calendar and it moves your day.',
        'Without at least two full seasons of what you sold day by day, there is nothing sensible to estimate. A summer only repeats itself in the second one. If you opened last year, we cannot serve you yet and we say so at the first meeting rather than after the first invoice.',
      ],
      manifesto:
        'The Friday that disappoints costs you what you throw out on Monday. The Friday that goes well costs you the guest who turns around at the door.',
      problemH2: 'Why this runs on instinct today',
      problem: [
        'The order has to go out before you know what the weather will do. Your drinks supplier wants it in the day before, your fish earlier still, and the forecast for the day after tomorrow will change twice after that.',
        'What you sold on the same kind of day last year is sitting in your till, but nobody digs it out at eleven at night. And last year that date fell on a Tuesday in a French holiday week, which makes it a different day entirely.',
        'And the things that actually move a beach day are never in one place. An offshore wind, the tide, the first properly warm weekend in May, a race along the promenade, and a Dutch school holiday that fills your terrace with people who were never in your figures.',
      ],
      pillarsH2: 'What this is built from',
      pillars: [
        {
          title: 'One sheet, not a second subscription',
          body: 'Every evening you get one sheet for the day after tomorrow, in your inbox or printed and stuck on the kitchen wall. You do not have to go looking inside yet another program that you stop logging into after three weeks. Two places means two sheets, because a bar on the dyke does not sell like one further along the beach.',
        },
        {
          title: 'Your till stays where it is',
          body: 'We start from the daily summary your till already prints. Before we begin we call your till supplier ourselves to find out what can actually come out at your place. Some tills can do more than the daily summary and some cannot, and you hear which one you have before you sign anything.',
        },
        {
          title: 'Every month you see our score',
          body: 'Once a month you get a sheet with the estimate next to what actually went through the till, day by day. The Saturdays where we were badly off are on it too, and they are the interesting ones: after three months you decide for yourself whether the sheet is worth anything, on your own figures rather than on our word.',
        },
      ],
      signals: [
        'I order my ice and my kegs on instinct and on the forecast',
        'Last Saturday I brought two people in for nothing',
        'On Monday I throw out what was over-ordered on Friday',
        'My till does print a daily summary and I never look at it',
      ],
      automationsH2: 'Other solutions for a beach bar',
      automationsIntro:
        'The rest of what we build for this trade. Each one is a separate thing you can ask for.',
      automations: [],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say no software predicts how busy you will be. Nostradamus and Shiftbase sell exactly that to hospitality in the Netherlands and Belgium, and Delicious Data does it today for more than two hundred and fifty bakeries. Lightspeed has forecasting sitting on top of its own till, so for plenty of businesses a first version of this is already inside what they pay for.',
        'We are not going to quote an accuracy figure. We have measured nothing on your business, so any percentage we gave you today would be invented. What you get instead is the monthly comparison, which is a slower answer and a true one.',
        'And we are not going to say you will never over-order again. Weather is weather, a private party in the hall around the corner is in nobody\'s calendar, and the sheet is an estimate you order against, not a guarantee. What it replaces is guessing with nothing, not judgement.',
      ],
      faqs: [
        {
          q: 'Will this work with my till?',
          a: 'That depends on your till supplier and it is the first thing we check, and we call them ourselves rather than asking you to. Plenty of Belgian businesses run a registered till that lets nothing out except a daily summary, and then we work with that daily summary. If your till will not even do that, this stops here and you hear it at the first meeting.',
        },
        {
          q: 'How reliable is the estimate?',
          a: 'Reliable enough to order against, not reliable enough to plan a season on. Weather, tide, holidays and your own history of the same kind of day get you a long way for the day after tomorrow. A festival in the next town along that nobody entered anywhere is not in there. That is why the sheet shows what the estimate rests on, so you can see when it is standing on thin ground.',
        },
        {
          q: 'Does this make my staff rota?',
          a: 'No. The sheet says how many people the estimate calls for, and that is all. Who you bring in, under which status and with which Dimona stays with you and your payroll office, because flexi-job rules and your sector agreement are not something we take on.',
        },
        {
          q: 'We already have a planning package with a forecast in it.',
          a: 'If you use that forecast today and it does its job, then probably not, and we will say so immediately. This sits next to what you have rather than in its place. It is meant for the business that does have a daily summary but does not want a second subscription in order to read it.',
        },
      ],
      featuresTitle: 'How do I know how busy it will be the day after tomorrow?',
      featuresSubtitle:
        'You order your ice, your kegs and your hours for the day after tomorrow, and you do it on instinct and on whatever the forecast says at that moment.',
      ctaTitle: 'Send us two seasons of daily summaries',
      ctaBody:
        'You send us your till\'s daily summaries for the past two seasons. We run the estimate on days that have already been and hold it up against what you actually sold, so you can see on your own figures whether there is anything in this. After that we run alongside you for a month without you changing how you order today. If the sheet just sits in your inbox, you stop.',
      seoTitle: 'How busy it gets two days out, for beach bars · Nivora',
      seoDescription:
        'One sheet every evening with the estimated trade for the day after tomorrow, built from your own daily till summaries, the weather, the tide, the school holidays and what is publicly on nearby, plus an honest monthly look back at how often it was right. For beach bars on the Belgian coast. By Nivora, Brugge.',
    },
    nl:
    {
      eyebrow: 'Onze oplossingen',
      h1: 'Hoe druk het wordt, twee dagen op voorhand',
      subhead:
        'U bestelt uw ijs, uw vaten en uw uren voor overmorgen, en u doet dat op gevoel en op wat het weerbericht op dat moment zegt. De ene vrijdag staat er niemand, de andere staat de rij tot op de dijk en staat u met twee man te kort.',
      answerH2: 'Hoe weet ik hoe druk het overmorgen wordt?',
      answer:
        'Elke avond legt Nivora vier dingen naast elkaar: wat uw eigen kassa de voorbije seizoenen op zo een dag deed, het weerbericht, de schoolvakanties hier en net over de grens, en wat er publiek aangekondigd is in en rond de gemeente. Daar komt één blad uit met een schatting voor overmorgen, met hoeveel volk dat vraagt en wat u het best bestelt. U beslist zelf wat u ermee doet. Elke maand krijgt u een eerlijke terugblik op hoe vaak het klopte en waar het ernaast zat, ook op de zaterdagen die wij mis hadden.',
      answerDetail: [
        'Bij een strandbar hoort het tij daar ook in. Een laagwater in de vooravond houdt de mensen op het strand en schuift uw tweede piek een uur op, en een hoogwater om vier uur in de namiddag doet het omgekeerde. Dat is geen weer en het staat op geen enkel weerbericht, maar het staat wel in een kalender en het verzet uw dag.',
        'Zonder minstens twee volle seizoenen van wat u dag per dag verkocht hebt, valt er niets zinnigs te schatten. Een zomer herhaalt zich pas in de tweede. Bent u vorig jaar opengegaan, dan kunnen wij u nog niet bedienen, en dat zeggen wij op het eerste gesprek in plaats van na de eerste factuur.',
      ],
      manifesto:
        'De vrijdag die tegenvalt kost u wat u maandag weggooit. De vrijdag die meevalt kost u de gast die aan de deur omdraait.',
      problemH2: 'Waarom dit vandaag op gevoel gebeurt',
      problem: [
        'De bestelling moet buiten voor u weet wat het weer doet. Uw drankenleverancier wil ze de dag ervoor binnen, uw visleverancier nog vroeger, en het weerbericht voor overmorgen verandert daarna nog twee keer.',
        'Wat u vorig jaar op zo een dag verkocht hebt, zit wel in uw kassa, maar niemand haalt dat er \'s avonds om elf uur nog uit. Vorig jaar viel die datum bovendien op een dinsdag in een Franse vakantieweek, en dan is het een heel andere dag.',
        'En de dingen die een stranddag echt verzetten, staan nergens bij elkaar. Aflandige wind, het tij, het eerste echt warme weekend van mei, een wedstrijd over de dijk, en een Nederlandse schoolvakantie die uw terras vult met volk dat nooit in uw cijfers stond.',
      ],
      pillarsH2: 'Waaruit dit is opgebouwd',
      pillars: [
        {
          title: 'Eén blad, geen tweede abonnement',
          body: 'U krijgt elke avond één blad voor overmorgen, in uw mailbox of uitgeprint aan de muur van de keuken. U hoeft niet in nog een programma te gaan kijken waar u na drie weken toch niet meer inlogt. Twee zaken betekent twee bladen, want een bar op de dijk verkoopt niet zoals een bar verderop op het strand.',
        },
        {
          title: 'Uw kassa blijft staan',
          body: 'Wij beginnen bij het dagoverzicht dat uw kassa vandaag al uitdraait. Voor wij starten bellen wij zelf uw kassaleverancier om te kijken wat er bij u precies uit kan. Bij sommige kassa\'s kan er meer dan het dagoverzicht en bij andere niet, en u weet welke van de twee u hebt voor u iets tekent.',
        },
        {
          title: 'Elke maand krijgt u onze punten te zien',
          body: 'Eén keer per maand krijgt u een blad met de schatting naast wat er echt door de kassa ging, dag per dag. Ook de zaterdagen waarop wij er ver naast zaten staan erop, en dat zijn de interessante: na drie maanden beslist u zelf of dat blad iets waard is, op uw eigen cijfers en niet op ons woord.',
        },
      ],
      signals: [
        'Ik bestel mijn ijs en mijn vaten op gevoel en op het weerbericht',
        'Vorige zaterdag heb ik twee mensen voor niets laten komen',
        'Op maandag gooi ik weg wat vrijdag te veel besteld was',
        'Mijn kassa maakt wel een dagoverzicht en ik kijk er nooit naar',
      ],
      automationsH2: 'Andere oplossingen voor een strandbar',
      automationsIntro:
        'De rest van wat wij voor dit vak bouwen. Elk daarvan is apart aan te vragen.',
      automations: [],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat er nog geen software bestaat die uw drukte voorspelt. Nostradamus en Shiftbase verkopen precies dat aan de horeca in Nederland en België, en Delicious Data doet het vandaag voor meer dan tweehonderdvijftig bakkerijen. Lightspeed heeft een prognose bovenop de eigen kassa zitten, dus bij heel wat zaken zit een eerste versie hiervan al in wat ze vandaag betalen.',
        'Wij gaan geen accuraatheidscijfer noemen. Wij hebben nog niets gemeten op uw zaak, dus elk percentage dat wij vandaag zouden geven is verzonnen. Wat u in de plaats krijgt is de maandelijkse vergelijking, en dat is een trager antwoord en een waar antwoord.',
        'En wij gaan niet zeggen dat u nooit meer te veel bestelt. Weer is weer, een privéfeest in de zaal om de hoek staat in geen enkele agenda, en het blad is een schatting waarop u bestelt en geen garantie. Wat het vervangt is gokken zonder iets, niet uw oordeel.',
      ],
      faqs: [
        {
          q: 'Werkt dit met mijn kassa?',
          a: 'Dat hangt van uw kassaleverancier af en het is het eerste wat wij nakijken, en wij bellen hem zelf in plaats van het aan u te vragen. Veel Belgische zaken draaien op een geregistreerde kassa die niets naar buiten laat behalve een dagoverzicht, en dan werken wij met dat dagoverzicht. Laat uw kassa ook dat niet toe, dan houdt het hier op en hoort u dat op het eerste gesprek.',
        },
        {
          q: 'Hoe zeker is die schatting?',
          a: 'Zeker genoeg om op te bestellen, niet zeker genoeg om er een seizoen op te plannen. Weer, tij, vakantie en uw eigen geschiedenis van zo een dag brengen u een heel eind voor overmorgen. Een festival in het dorp verderop dat nergens ingegeven staat, zit er niet in. Daarom staat op het blad waar de schatting op steunt, zodat u ziet wanneer ze op dun ijs staat.',
        },
        {
          q: 'Maakt dit mijn uurrooster?',
          a: 'Nee. Op het blad staat hoeveel volk u volgens de schatting nodig hebt, meer niet. Wie u opzet, onder welk statuut en met welke Dimona blijft uw zaak en die van uw sociaal secretariaat, want de flexi-jobregels en uw sectorale CAO nemen wij niet voor onze rekening.',
        },
        {
          q: 'Wij hebben al een planningspakket met een prognose erin.',
          a: 'Als u die prognose vandaag gebruikt en ze doet haar werk, dan waarschijnlijk niet, en dan zeggen wij dat meteen. Dit komt ernaast en niet in de plaats. Het is bedoeld voor de zaak die wel een dagoverzicht heeft maar geen tweede abonnement wil om het te lezen.',
        },
      ],
      featuresTitle: 'Hoe weet ik hoe druk het overmorgen wordt?',
      featuresSubtitle:
        'U bestelt uw ijs, uw vaten en uw uren voor overmorgen, en u doet dat op gevoel en op wat het weerbericht op dat moment zegt.',
      ctaTitle: 'Stuur ons twee seizoenen dagoverzichten',
      ctaBody:
        'U bezorgt ons het dagoverzicht van uw kassa van de voorbije twee seizoenen. Wij draaien de schatting op de dagen die al voorbij zijn en leggen ze naast wat u die dagen echt verkocht hebt, zodat u op uw eigen cijfers ziet of hier iets in zit. Daarna draaien wij een maand mee zonder dat u iets verandert aan hoe u nu bestelt. Blijft het blad in uw mailbox liggen, dan stopt u.',
      seoTitle: 'Hoe druk het wordt, twee dagen op voorhand, voor strandbars · Nivora',
      seoDescription:
        'Elke avond één blad met de geschatte drukte voor overmorgen, uit uw eigen dagoverzichten, het weer, het tij, de schoolvakanties en wat er publiek aangekondigd is in de buurt, plus elke maand een eerlijke terugblik op hoe vaak het klopte. Voor strandbars aan de Belgische kust. Van Nivora uit Brugge.',
    },
  },
  { hero: '/landing/strandbar-opl-drukte.webp', manifesto: '/landing/auto-sec-strandbar-vol.webp' },
)
