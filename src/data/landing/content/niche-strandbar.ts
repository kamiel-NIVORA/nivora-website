import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor strandbars.
 *
 * Dit was eerder een brede horecapagina (strandbar tot bakkerij). Die is
 * teruggebracht tot één zaak, omdat een strandbar één probleem heeft dat geen
 * enkele andere horecazaak in die mate heeft: het hele jaar hangt aan een stuk
 * of veertig dagen, en welke dagen dat zijn weet u twee dagen op voorhand.
 *
 * Tweede herziening: de rij "wat we kunnen automatiseren" stond hier met vier
 * bedachte automatiseringen. Die lazen als mock-ups, want er zat geen pagina
 * achter waar iemand kon nakijken wat het ding precies doet en waar het ophoudt.
 * Ze zijn vervangen door de vijf echte oplossingen uit ./sectors.ts, die elk hun
 * eigen pagina hebben. Zie solutionRailFor() in src/pages/LandingPage.tsx: die
 * rij verschijnt vanzelf, meteen na het antwoordblok.
 *
 * De inhoud leunt op een echt gebouwd systeem voor een strandbar aan de kust
 * (reservaties, goedkeuring, dagoverzicht, uren) en op het marktonderzoek in
 * .nivora/research/oplossingen-kandidaten.md. De klant wordt nergens genoemd.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for beach bars, before the weekend decides',
      subhead:
        'On a Friday at 26 degrees the queue runs onto the promenade, your ice is gone by four and you are one short behind the bar. We look first at where your hours go, and only then at what a computer takes off you.',
      answerH2: 'What does Nivora Works do for a beach bar?',
      answer:
        'Nivora Works is a software and AI studio in Bruges that builds what is missing between your till and your phone. A booking system that takes over the three hundred messages a week. A layer that works out who gets confirmed straight away and who waits. One screen with the day on it, for whoever opens the shift. A team that enters its own hours and availability. And, two days out, an estimate of how busy it will be, so the order and the calls go out on Thursday instead of Friday afternoon. Your registered till stays the till: we come alongside it, never in front of it.',
      answerDetail: [
        'It does not start with the technology, it starts with your week. Monday the order to the wholesaler, Wednesday the rota, Thursday the calls, Saturday the rush: we walk that week through with you and mark every place where the same work happens again and again.',
        'A season is short, and that changes the order of everything. We put things in place in the pre-season, let them run through July and August in the real rush, and sit down in September to see what the season taught us. Something that works on a quiet Wednesday and falls apart on Saturday at eight is not finished.',
      ],
      manifesto:
        'A full terrace is not a problem. A full terrace you did not see coming yesterday costs you your Saturday.',
      problemH2: 'Where the time goes in a beach bar',
      problem: [
        'No two weekends are the same. An offshore wind, a tide that falls right and the sun staying on your terrace until late, and it is full until eleven. Two degrees less and a shower at four, and you are left with fresh mise en place that will not keep. That judgement lives in one person\'s head, and that person is out on the floor serving.',
        'The bookings come in through four different doors. On the landline in the middle of service, in your Instagram messages, through the form on your site and on WhatsApp. In a good season that is three to four hundred messages a week, and one person reads all of them, answers all of them and is the only one who knows what Saturday actually looks like.',
        'And every week the same round of asking. Who can work Saturday, how many hours did you do, can you come in two hours earlier. Fifteen people, fifteen separate replies, and at the end of the month somebody adds it all up by hand before it goes to the payroll office.',
      ],
      pillarsH2: 'How we come in',
      pillars: [
        {
          title: 'Work a service first',
          body: 'We come and look when it is busy, not on a Tuesday morning in April at ten. Who picks up the phone during service, where the order list hangs, who decides how much gets prepped: none of that is written down anywhere, and that is exactly what we need to see.',
        },
        {
          title: 'On top of your till, not in front of it',
          body: 'The first question is always whether it works with your till. Lightspeed, a tablet till or a system that has been there for ten years: we look at what can come out of it before we promise anything. We replace nothing, we pull out the figures you are currently retyping by hand and put them where the decision actually gets made.',
        },
        {
          title: 'Built for a short season',
          body: 'If your business really runs four months, paying twelve for something is not sensible, and that is not how we settle up either. We put one thing right before the season, it runs through the busiest weeks, and if it did not hold up we say so in September rather than selling you a second piece on top of it.',
        },
      ],
      signals: [
        'Your bookings live in a chat window on your own phone',
        'Only you can decide who still fits in on a busy Saturday',
        'Your team reports its hours afterwards, by message',
        'You only know on Saturday morning how many people are coming',
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say hospitality software does not exist yet. Lightspeed, Untill, Yoreco and Trivec have been on the counter for years, Formitable, Zenchef, Resengo and TheFork take the bookings, and Apicbase in Antwerp does food cost. We do not replace any of them and sometimes we point you towards them.',
        'We are not going to say we predict the weekend better than anyone else. Your own till already shows what the same kind of Saturday did last year, and parties like Delicious Data, Foodforecast and Tenzo sell that forecast on its own. What we add is that the answer sits with you at the hour you order, not in a report nobody opens.',
        'And we are not going to say a robot should talk to your guests. A guest ringing at eleven on Saturday to cancel would rather hear a person, and on the coast a large part of what keeps people coming back is exactly that. What we prepare is the answer, and someone on your team presses send.',
      ],
      faqs: [
        {
          q: 'Does it work with my till?',
          a: 'That is the first question everyone asks, and rightly so. Lightspeed, a tablet till or a system that has been there for ten years: we look at what can come out of it before we promise anything. Your registered till stays exactly where it is, with the same tickets and the same VAT rates for eat in and takeaway. If your till will not release anything, we say so up front and look for another way in.',
        },
        {
          q: 'We run everything through WhatsApp. Do our guests now need an app?',
          a: 'No. Booking works through a link on your site or in your Instagram bio, in the browser, with nothing to install. The app is there for the guest who comes back often and would rather not fill in their details every time. And WhatsApp does not close: whoever prefers to send a message still sends a message, it just lands in the same list as everything else instead of in a separate window.',
        },
        {
          q: 'We are only properly open four months a year.',
          a: 'For a beach bar that is normal, and it mainly changes the order of things. In April we put in place what you need in July, and in September we sit down and see what the season taught us. Paying twelve months for something you use four is not sensible, and that is not how we settle up either.',
        },
        {
          q: 'How much of the forecast can I actually rely on?',
          a: 'Enough to order on, not enough to plan a whole season on. Weather, tide, holidays and your own history of the same kind of day get you a long way for the day after tomorrow. A festival in the next town along that nobody entered anywhere is not in there, and neither is a road closure. That is why you get a proposal with what it is based on shown alongside, rather than a number on its own.',
        },
        {
          q: 'Do you handle the HACCP records and the allergen sheet too?',
          a: 'We always ask about that first, because every business does it differently: a sheet on the freezer, a notebook in the kitchen, or an app already. What we can do is make sure whatever gets filled in comes together in one place, that your allergen sheet moves with you when you change supplier, and that you get a nudge when nothing has been logged for three days. Responsibility towards the food safety agency stays with you, and we do not pretend otherwise.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for a beach bar?',
      featuresSubtitle:
        'On a Friday at 26 degrees the queue runs onto the promenade, your ice is gone by four and you are one short behind the bar. We look first at where your hours go, and only then at what a computer takes off you.',
      ctaTitle: 'Send us your busiest Saturday',
      ctaBody:
        'One weekend of till figures, the messages that came in by phone and by chat that same week, and the hours your team ended up reporting. Within the week we tell you which part of that can run by itself and which part is better left to people, before anything is agreed or signed.',
      seoTitle: 'AI automation for beach bars on the Belgian coast · Nivora Works',
      seoDescription:
        'Bookings out of WhatsApp, who gets a spot on a full Saturday, the day on one screen, hours and availability from your own team, and how busy it gets two days out. Five things Nivora Works builds for beach bars on the Belgian coast, on top of your till.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor strandbars, voor het weekend beslist',
      subhead:
        'Op een vrijdag met 26 graden loopt de rij tot op de dijk, is uw ijs om vier uur op en staat er iemand te weinig achter de toog. Wij kijken eerst waar uw uren heen gaan, en pas daarna wat een computer ervan overneemt.',
      answerH2: 'Wat doet Nivora Works voor een strandbar?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die bouwt wat er tussen uw kassa en uw telefoon ontbreekt. Een reservatiesysteem dat de driehonderd berichten per week overneemt. Een laag die bepaalt wie meteen bevestigd wordt en wie wacht. Eén scherm met de dag erop, voor wie de dienst opent. Een ploeg die haar uren en beschikbaarheid zelf ingeeft. En, twee dagen op voorhand, een inschatting van hoe druk het wordt, zodat de bestelling en de telefoons op donderdag vertrekken in plaats van op vrijdagnamiddag. Uw geregistreerde kassa blijft de kassa: wij komen ernaast staan, nooit ervoor.',
      answerDetail: [
        'Het begint niet bij de techniek maar bij uw week. Maandag de bestelling doorgeven, woensdag de planning rondkrijgen, donderdag de telefoons, zaterdag de drukte: wij lopen die week met u door en tekenen aan waar hetzelfde werk elke keer opnieuw gebeurt.',
        'Een seizoen is kort en dat verandert de volgorde van alles. Wij zetten klaar in het voorseizoen, laten het in juli en augustus meedraaien in de echte drukte, en in september gaan wij samen zitten om te kijken wat het seizoen geleerd heeft. Wat op een rustige woensdag klopt en op zaterdag om acht uur naast de kwestie zit, is niet af.',
      ],
      manifesto:
        'Een vol terras is geen probleem. Een vol terras dat u gisteren niet zag aankomen, kost u uw zaterdag.',
      problemH2: 'Waar de tijd in een strandbar verdwijnt',
      problem: [
        'De drukte is nooit twee weekends hetzelfde. Aflandige wind, een tij dat goed valt en de zon die tot laat op uw terras blijft staan, en het zit vol tot elf uur. Twee graden minder en een bui om vier uur, en u blijft zitten met verse mise en place die de volgende dag niet meer kan. Die inschatting zit in het hoofd van één iemand, en die staat op dat moment zelf mee te bedienen.',
        'De reservaties komen langs vier deuren binnen. Op de vaste telefoon midden in de dienst, in de berichten op Instagram, via het formulier op uw site en op WhatsApp. In een goed seizoen zijn dat drie- tot vierhonderd berichten per week, en één iemand leest ze allemaal, beantwoordt ze allemaal, en is de enige die weet hoe zaterdag er echt uitziet.',
        'En elke week opnieuw dezelfde rondvraag. Wie kan er zaterdag, hoeveel uren heb je gedaan, kan je twee uur vroeger komen. Vijftien mensen, vijftien losse antwoorden, en op het einde van de maand telt iemand dat met de hand op voor het naar het sociaal secretariaat gaat.',
      ],
      pillarsH2: 'Hoe wij hier binnenkomen',
      pillars: [
        {
          title: 'Eerst een dienst meedraaien',
          body: 'Wij komen kijken op een moment dat het druk is, niet op een dinsdagvoormiddag in april om tien uur. Wie neemt de telefoon op tijdens de dienst, waar hangt de bestellijst, wie beslist hoeveel er klaargezet wordt: dat staat nergens opgeschreven en dat is net wat wij moeten zien.',
        },
        {
          title: 'Bovenop uw kassa, niet ervoor',
          body: 'De eerste vraag is altijd of het met uw kassa werkt. Lightspeed, een tabletkassa of een systeem dat er al tien jaar staat: wij kijken eerst wat eruit kan komen voor wij iets beloven. Wij vervangen niets, wij halen de cijfers eruit die u vandaag zelf zit over te tikken en zetten ze op de plek waar de beslissing valt.',
        },
        {
          title: 'Gemaakt voor een kort seizoen',
          body: 'Draait uw zaak echt vier maanden, dan is er twaalf betalen niet logisch, en zo rekenen wij ook niet af. Wij zetten één ding recht voor het seizoen, het draait mee door de drukste weken, en hield het geen stand, dan zeggen wij dat in september in plaats van er een tweede stuk bovenop te verkopen.',
        },
      ],
      signals: [
        'Uw reservaties staan in een gespreksvenster op uw eigen telefoon',
        'Alleen u kunt beslissen wie er op een volle zaterdag nog bij kan',
        'Uw ploeg geeft haar uren achteraf door, per bericht',
        'U weet pas op zaterdagochtend hoeveel volk er komt',
      ],
      outcomesH2: 'Wat wij hierover niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat er voor de horeca nog geen software bestaat. Lightspeed, Untill, Yoreco en Trivec staan al jaren op de toog, Formitable, Zenchef, Resengo en TheFork nemen de reservaties, en Apicbase uit Antwerpen rekent foodcost. Wij vervangen die niet en verwijzen er soms zelfs naar door.',
        'Wij gaan niet zeggen dat wij het weekend beter voorspellen dan wie ook. Uw kassa toont zelf al wat zo een zaterdag vorig jaar deed, en partijen als Delicious Data, Foodforecast en Tenzo verkopen die voorspelling apart. Wat wij eraan toevoegen is dat het antwoord bij u ligt op het uur dat u bestelt, en niet in een rapport dat niemand opent.',
        'En wij gaan niet zeggen dat er een robot uw klanten te woord moet staan. Een gast die op zaterdag om elf uur belt om te annuleren, hoort liever een mens, en aan de kust is dat net een groot deel van waarom mensen terugkomen. Wat wij klaarzetten is het antwoord, en iemand van uw ploeg drukt op verzenden.',
      ],
      faqs: [
        {
          q: 'Werkt dat met mijn kassa?',
          a: 'Dat is de eerste vraag die iedereen stelt, en terecht. Lightspeed, een tabletkassa of een systeem dat er al tien jaar staat: wij kijken eerst wat eruit kan komen voor wij iets beloven. Uw geregistreerde kassa blijft staan waar ze staat, met dezelfde ticketten en dezelfde btw-tarieven voor ter plaatse en meeneem. Geeft uw kassa niets naar buiten, dan zeggen wij dat op voorhand en zoeken wij een andere ingang.',
        },
        {
          q: 'Wij doen alles via WhatsApp. Moeten onze gasten nu een app installeren?',
          a: 'Nee. Boeken gaat via een link op uw site of in uw Instagram-bio, gewoon in de browser, zonder dat er iets geïnstalleerd moet worden. De app is er voor de gast die vaak terugkomt en niet elke keer opnieuw zijn gegevens wil invullen. En WhatsApp gaat niet dicht: wie liever een bericht stuurt, stuurt een bericht, dat komt alleen in dezelfde lijst terecht als de rest in plaats van in een apart venster.',
        },
        {
          q: 'Wij zijn maar vier maanden per jaar echt open.',
          a: 'Dat is voor een strandbar de gewone gang van zaken, en het verandert vooral de volgorde. In april zetten wij klaar wat u in juli nodig hebt, en in september kijken wij samen wat het seizoen geleerd heeft. Twaalf maanden betalen voor iets dat u vier maanden gebruikt, is niet logisch, en zo rekenen wij ook niet af.',
        },
        {
          q: 'Hoe hard is die voorspelling nu echt?',
          a: 'Hard genoeg om op te bestellen, niet hard genoeg om er een heel seizoen op te plannen. Weer, tij, vakantie en uw eigen geschiedenis van zo een dag brengen u een heel eind voor overmorgen. Een festival in het dorp verderop dat nergens ingegeven staat, zit er niet in, en een afgesloten straat evenmin. Daarom krijgt u een voorstel met erbij waar het op steunt, in plaats van een cijfer op zich.',
        },
        {
          q: 'Doen jullie ook de HACCP-registraties en de allergenenfiche?',
          a: 'Dat vragen wij altijd eerst na, want elke zaak doet dat anders: een blad aan de diepvries, een schriftje in de keuken of al een app. Wat wij kunnen doen is zorgen dat wat er ingevuld wordt op één plek samenkomt, dat uw allergenenfiche mee verandert als u van leverancier verandert, en dat u een seintje krijgt als er drie dagen niets is ingevuld. De verantwoordelijkheid tegenover het FAVV blijft bij u, en dat schuiven wij niet weg.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een strandbar?',
      featuresSubtitle:
        'Op een vrijdag met 26 graden loopt de rij tot op de dijk, is uw ijs om vier uur op en staat er iemand te weinig achter de toog. Wij kijken eerst waar uw uren heen gaan, en pas daarna wat een computer ervan overneemt.',
      ctaTitle: 'Stuur ons uw drukste zaterdag',
      ctaBody:
        'Eén weekend aan kassacijfers, de berichten die diezelfde week binnenkwamen via telefoon en chat, en de uren zoals uw ploeg ze uiteindelijk doorgaf. Wij zeggen u binnen de week welk stuk daarvan vanzelf kan en welk stuk beter mensenwerk blijft, voor er iets afgesproken of getekend is.',
      seoTitle: 'AI-automatisering voor strandbars aan de Belgische kust · Nivora Works',
      seoDescription:
        'Reservaties weg uit WhatsApp, wie er op een volle zaterdag nog bij kan, de dag op één scherm, uren en beschikbaarheid uit uw eigen ploeg, en hoe druk het wordt twee dagen op voorhand. Vijf dingen die Nivora Works bouwt voor strandbars aan de Belgische kust, bovenop uw kassa.',
    },
  },
  { hero: '/landing/auto-sec-strandbar-hero.webp', manifesto: '/landing/auto-sec-strandbar-vol.webp' },
)
