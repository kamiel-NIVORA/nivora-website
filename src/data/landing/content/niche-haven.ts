import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor de havensector, geschreven met het marktonderzoek in
 * .nivora/research/ en daarna nagelezen door iemand die in de keten werkt.
 *
 * Deze pagina verving twaalf losse pagina's: één per beroep (douaneagent,
 * expediteur, scheepsagentuur, haventransport, entrepot, IMO-kantoor, survey)
 * en één per systeem (IDMS, AES, CPu, CargoWise, FAVV). Elk daarvan viel apart
 * te dun uit en ze concurreerden met elkaar op nagenoeg dezelfde zoekvraag.
 * Wat ze deelden staat hier, en de tekst zegt zelf dat de beroepen verschillen
 * in plaats van te doen alsof één oplossing op alles past.
 *
 * De rij met oplossingen onderaan komt uit src/data/landing/sectors.ts.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for the port sector, from declaration to release',
      subhead:
        'A declaration that has to be in before the vessel sails, a container that is released but has no time slot, and the one colleague who knows how that particular file fits together. We first count where the hours actually go, then take over the part that comes back every week.',
      answerH2: 'What does Nivora Works do in the port sector?',
      answer:
        'Nivora Works is a software and AI studio in Bruges working for the businesses around the Flemish ports: forwarders, customs brokers, ship agents, container haulage, bonded warehouses and survey practices. We take over the recurring work between the systems: reading what arrives as mail or PDF and putting it where it belongs, watching the terms that run per file, and finding back what was agreed on a shipment two years ago. We do not replace CargoWise, Descartes or your own package, and we do not sit between you and IDMS, AES, NCTS or Certified Pick up. What we build hangs alongside them, and where the data is sensitive the model runs on hardware in your own office.',
      answerDetail: [
        'These are different trades and we write that down rather than around it. A ship agent watches a shifting ETA, a customs broker watches a declaration term, a haulier watches a time slot, and a surveyor comes back with four hundred photos. What they share is that the official system is not the problem: the problem is everything a person does around it by hand.',
        'So we start with one bounded piece in one trade. Not a platform for the port, and not a project that begins with a six month analysis. One thing, running alongside your own way of working for a fortnight, and then you decide what is next.',
      ],
      manifesto:
        'The declaration is not the work. Everything that has to be gathered before it can go out, that is the work.',
      problemH2: 'Where the hours go in this chain',
      problem: [
        'The systems are in order and the space between them is not. A booking arrives by mail, an invoice as a PDF, a packing list as a photograph of a paper, and a person copies those into the declaration by hand. What arrives structured goes in cleanly; what does not is where your people sit. In most offices that is not a rare exception but the largest single block of the day.',
        'Everything runs on a clock and none of the clocks are in the same place. A transit that has to be discharged, a bonded entry with its own term, a release that is granted while the slot is not, free days that quietly expire and turn into demurrage. Each of those lives in a different screen and none of them warns you a week ahead, so the follow-up sits in somebody\'s spreadsheet or in their head.',
        'The mailbox holds messages that matter and messages that do not, in the same pile. A carrier announcing a shift, a terminal announcing a closing, a supplier confirming something nobody asked about. Four hundred messages a day and the one that changes a file is between them. And what the office knows about a difficult commodity, a particular consignee or a customs question that came up in 2019, sits with the colleague who has been there twenty five years.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'Count first, build later',
          body: 'Half a day beside your operations desk on an ordinary Tuesday, tallying what comes in. How often something gets retyped that already existed digitally, how often the same question is answered, how often somebody goes looking for a document. Out of that count comes one thing to do first, and sometimes the honest answer is that your package already covers it.',
        },
        {
          title: 'Beside your package, never between you and the authorities',
          body: 'CargoWise, Descartes or your own system keeps holding the file, and IDMS, AES, NCTS and Certified Pick up keep being the systems you file in. We do not put ourselves in that path: a declaration goes out through the channel it goes out through today, filed by the person who is authorised to file it. What we build prepares, checks and flags on the way there.',
        },
        {
          title: 'The data stays where you want it',
          body: 'Commercial invoices, customer prices, a customs question your competitor should not read: none of that has to travel to a server on the other side of the world. Where it matters we run a model on hardware in your own office, otherwise inside Europe with a data processing agreement on paper. You see in plain language which mailboxes and which years went in, and you can take it back out.',
        },
      ],
      signals: [
        'Somebody retypes a packing list that came in as a PDF',
        'A term is followed up in a personal spreadsheet rather than in the system',
        'Free days expire and the first you hear of it is the invoice',
        'One colleague is the only one who knows how that consignee\'s files work',
      ],
      automationsH2: 'What we can automate in the port sector',
      automationsIntro:
        'Four things that come back across the whole chain, whichever of these trades you are in. We build them one at a time, and it starts with whichever one your own count puts first.',
      automations: [
        {
          title: 'The full set',
          body: 'Before a declaration or a file goes out you see the whole set side by side and what is missing from it: the invoice, the packing list, the transport document, the certificate that belongs to this particular commodity. What arrives as mail, PDF or a photograph of a paper is read and put into the fields you would otherwise fill by hand, with the source shown next to every figure so a check takes seconds.',
          image: '/landing/auto-imo-set.webp',
          alt: 'Paper documents partly overlapping on a desk in a port office',
        },
        {
          title: 'The clock that runs',
          body: 'One counter across the terms that live in different screens: a transit to be discharged, a bonded entry, free days before demurrage, a release without a slot. It knows the rule that applies to your file and it runs beside your own planning, so you hear it the week before rather than on the day. Nothing is filed automatically; you get the five files that need attention today.',
          image: '/landing/auto-transport-vrijgave.webp',
          alt: 'A dispatcher desk at dawn with cranes through the window',
        },
        {
          title: 'Carrier mail',
          body: 'Four hundred messages a day, and the handful that actually change a file are read and put on that file or that run. A shifted ETA lands on the call, a terminal closing lands on the trips that were planned into it, a rate notice lands where the quote sits. The rest stays in the mailbox where it belongs, and nothing is deleted or answered on your behalf.',
          image: '/landing/auto-transport-berichten.webp',
          alt: 'A wall of plain wooden pigeonhole mail slots in an office corridor',
        },
        {
          title: 'One head, one file',
          body: 'Ask a plain question and get the answer out of your own years of files and mail, with the document behind it: what was agreed with that consignee, how that commodity was classified last time, what went wrong on this route in 2019. Built for the week your longest serving colleague is away, and for the year he retires.',
          image: '/landing/auto-douane-kennis.webp',
          alt: 'Two colleagues side by side at a desk in an office, seen from behind',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say the port has no software. CargoWise and Descartes have run forwarding and customs for years, the terminals at Antwerp and Zeebrugge have their own portals, NxtPort and Port Plus have been moving data between parties for a long time, and Certified Pick up replaced the release code with a right that lives in a system. We come and stand beside all of that.',
        'We are not going to say we make a declaration go through faster. Customs answers when customs answers, a terminal gives the slot it gives, and a vessel sails when it sails. What changes is what has already been gathered by the time you get there, and whether you knew about a problem on Tuesday or on Friday.',
        'And we are not going to say one thing fits all six of these trades. A survey practice with four hundred photos per lot and a haulier with a time slot problem have almost nothing in common in practice. That is why we build per trade and per piece, and why we would rather tell you in the first week that your question belongs with somebody else.',
      ],
      faqs: [
        {
          q: 'Do we have to leave CargoWise or our own package?',
          a: 'No, and we would advise against it. Your package holds the file, the history and the rates, and switching it is a project that takes a year out of an operations team. What we build hangs beside it, reads what comes in and either writes the result back or puts it ready for approval. If your package cannot exchange anything at all, we say so before we start rather than halfway.',
        },
        {
          q: 'Do you file with customs on our behalf?',
          a: 'No. A declaration goes out through the channel it goes out through today, filed by the person who is authorised to file it, and the responsibility for what is in it stays where it is. We prepare what goes into it, we check it against the documents in the file, and we flag what does not add up. Software that quietly filed on your behalf would be putting your authorisation at risk, not ours.',
        },
        {
          q: 'Our commercial data must not leave the office. Is that possible?',
          a: 'Yes, and in this sector it is usually the reason people call. Customer prices, margins on a route and a customs position you would rather not have read: for those we run the model on hardware in your own office so nothing goes outside. For the rest, inside Europe with a data processing agreement on paper. We set out which mailboxes, which folders and which years went in.',
        },
        {
          q: 'We are a forwarder with twelve people, not a terminal. Does this scale down?',
          a: 'It is mostly built for that size. A company with twelve people has the same retyping and the same terms as one with two hundred, and nobody spare to hand it to. We start with one thing, it runs alongside your own way of working for a fortnight, and it has to hold up in a busy week before anything is added. If it does not pay for itself we say so and stop.',
        },
      ],
      featuresTitle: 'What does Nivora Works do in the port sector?',
      featuresSubtitle:
        'A declaration that has to be in before the vessel sails, a container that is released but has no time slot, and the one colleague who knows how that particular file fits together. We first count where the hours actually go, then take over the part that comes back every week.',
      ctaTitle: 'Send us one ordinary week',
      ctaBody:
        'Take the mailbox of a single week and the files that ran through it, anonymised. Within the week we will tell you which part of that we would take over and which part is better left with your own people, with nothing agreed.',
      seoTitle: 'AI automation for the port sector in Antwerp, Zeebrugge and Ghent · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges takes over the recurring work in forwarding, customs, ship agency, container haulage and bonded storage: documents no longer retyped, terms watched across systems, and your own archive searchable. Alongside CargoWise, Descartes, IDMS, AES and Certified Pick up.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor de havensector, van aangifte tot vrijgave',
      subhead:
        'Een aangifte die binnen moet zijn voor het schip vertrekt, een container die vrij is maar geen tijdslot heeft, en die ene collega die weet hoe dat dossier in elkaar zit. Wij tellen eerst waar de uren echt blijven hangen en nemen daarna het stuk over dat elke week terugkomt.',
      answerH2: 'Wat doet Nivora Works in de havensector?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die werkt voor de bedrijven rond de Vlaamse havens: expediteurs, douaneagenten, scheepsagenturen, haventransport, entrepots en surveykantoren. Wij nemen het terugkerende werk tussen de systemen over: lezen wat binnenkomt als mail of pdf en het zetten waar het hoort, de termijnen bewaken die per dossier lopen, en terugvinden wat er twee jaar geleden over een zending afgesproken is. Wij vervangen CargoWise, Descartes of uw eigen pakket niet, en wij gaan niet tussen u en IDMS, AES, NCTS of Certified Pick up staan. Wat wij bouwen hangt ernaast, en waar de gegevens gevoelig zijn draait het model op hardware in uw eigen kantoor.',
      answerDetail: [
        'Dit zijn verschillende beroepen en dat schrijven wij op in plaats van eromheen. Een scheepsagent bewaakt een schuivende ETA, een douaneagent een aangiftetermijn, een transporteur een tijdslot, en een surveyor komt terug met vierhonderd foto\'s. Wat ze delen is dat het officiële systeem het probleem niet is: het probleem is alles wat een mens eromheen met de hand doet.',
        'Wij starten dus met één afgebakend stuk in één beroep. Geen platform voor de haven, en geen project dat begint met een analyse van zes maanden. Eén ding, dat veertien dagen naast uw eigen manier van werken meeloopt, en daarna beslist u wat het volgende is.',
      ],
      manifesto:
        'De aangifte is het werk niet. Alles wat er bijeen moet zijn voor ze buiten kan, dat is het werk.',
      problemH2: 'Waar de uren in deze keten blijven hangen',
      problem: [
        'De systemen zijn in orde en de ruimte ertussen niet. Een booking komt binnen per mail, een factuur als pdf, een packing list als foto van een papier, en een mens tikt dat met de hand over in de aangifte. Wat gestructureerd binnenkomt gaat er netjes in; waar dat niet zo is, zitten uw mensen. In de meeste kantoren is dat geen zeldzame uitzondering maar het grootste aaneengesloten blok van de dag.',
        'Alles loopt op een klok en geen enkele klok staat op dezelfde plek. Een transit die aangezuiverd moet worden, een inslag in entrepot met zijn eigen termijn, een vrijgave die er is terwijl het slot er niet is, vrije dagen die stilletjes aflopen en in demurrage omslaan. Elk daarvan leeft in een ander scherm en geen van alle waarschuwt u een week op voorhand, dus de opvolging zit in het rekenblad of in het hoofd van iemand.',
        'De mailbox bevat berichten die ertoe doen en berichten die dat niet doen, op dezelfde hoop. Een rederij die een verschuiving meldt, een terminal die een closing meldt, een leverancier die iets bevestigt waar niemand naar gevraagd heeft. Vierhonderd berichten per dag en dat ene dat een dossier verandert, zit ertussen. En wat het kantoor weet over een moeilijke goederensoort, een bepaalde geadresseerde of een douanevraag uit 2019, zit bij de collega die er vijfentwintig jaar werkt.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Eerst tellen, dan pas bouwen',
          body: 'Een halve dag naast uw operationele bureau op een gewone dinsdag, en turven wat er binnenkomt. Hoe vaak er iets overgetikt wordt dat al digitaal bestond, hoe vaak dezelfde vraag beantwoord wordt, hoe vaak iemand een document gaat zoeken. Uit die telling komt één ding dat wij eerst doen, en soms is het eerlijke antwoord dat uw pakket dat al oplost.',
        },
        {
          title: 'Naast uw pakket, nooit tussen u en de overheid',
          body: 'CargoWise, Descartes of uw eigen systeem blijft het dossier houden, en IDMS, AES, NCTS en Certified Pick up blijven de systemen waarin u indient. Wij gaan niet in dat pad staan: een aangifte vertrekt via het kanaal waarlangs ze vandaag vertrekt, ingediend door wie daarvoor gemachtigd is. Wat wij bouwen zet klaar, kijkt na en meldt onderweg wat er niet klopt.',
        },
        {
          title: 'De gegevens blijven waar u ze wil',
          body: 'Handelsfacturen, klantenprijzen, een douanevraag die uw concurrent niet hoeft te lezen: dat hoeft niet naar een server aan de andere kant van de wereld. Waar het erop aankomt zetten wij een model op hardware in uw eigen kantoor, en anders binnen Europa, met een verwerkersovereenkomst op papier. U ziet in mensentaal welke mailboxen en welke jaren erin zitten, en u haalt het er ook weer uit.',
        },
      ],
      signals: [
        'Iemand tikt een packing list over die als pdf binnengekomen is',
        'Een termijn wordt opgevolgd in een persoonlijk rekenblad in plaats van in het systeem',
        'Vrije dagen lopen af en u hoort het pas van de factuur',
        'Eén collega is de enige die weet hoe de dossiers van die geadresseerde werken',
      ],
      automationsH2: 'Wat we kunnen automatiseren in de havensector',
      automationsIntro:
        'Vier dingen die over de hele keten terugkomen, in welk van deze beroepen u ook zit. Wij bouwen ze één voor één, en het begint bij wat uw eigen telling bovenaan zet.',
      automations: [
        {
          title: 'Set voor de aangifte',
          body: 'Voor een aangifte of een dossier buiten gaat, ziet u de volledige set naast elkaar en wat eraan ontbreekt: de factuur, de packing list, het vervoersdocument, het certificaat dat bij deze goederensoort hoort. Wat binnenkomt als mail, pdf of foto van een papier wordt gelezen en in de velden gezet die u anders met de hand invult, met de bron naast elk cijfer zodat nakijken seconden kost.',
          image: '/landing/auto-imo-set.webp',
          alt: 'Papieren documenten deels overlappend op een bureau in een havenkantoor',
        },
        {
          title: 'Termijn die loopt',
          body: 'Eén teller over de termijnen die in verschillende schermen leven: een transit die aangezuiverd moet worden, een inslag in entrepot, vrije dagen voor de demurrage begint, een vrijgave zonder slot. Hij kent de regel die op uw dossier van toepassing is en loopt naast uw eigen planning, zodat u het de week ervoor hoort in plaats van de dag zelf. Er wordt niets vanzelf ingediend; u krijgt de vijf dossiers die vandaag aandacht vragen.',
          image: '/landing/auto-transport-vrijgave.webp',
          alt: 'Het bureau van een dispatcher bij dageraad met kranen door het raam',
        },
        {
          title: 'Mail van de rederij',
          body: 'Vierhonderd berichten per dag, en de handvol die echt een dossier veranderen worden gelezen en op dat dossier of die rit gezet. Een verschoven ETA belandt bij het aanloopdossier, een closing van een terminal bij de ritten die erop gepland stonden, een tariefbericht bij de offerte. De rest blijft in de mailbox waar ze hoort, en er wordt niets in uw plaats gewist of beantwoord.',
          image: '/landing/auto-transport-berichten.webp',
          alt: 'Een wand met blanco houten postvakjes in een kantoorgang',
        },
        {
          title: 'Kennis van één man',
          body: 'Stel een gewone vraag en krijg het antwoord uit uw eigen jaren aan dossiers en mail, met het document erbij: wat er met die geadresseerde afgesproken is, hoe die goederensoort de vorige keer ingedeeld werd, wat er in 2019 op deze route misliep. Gebouwd voor de week dat uw langste medewerker weg is, en voor het jaar dat hij met pensioen gaat.',
          image: '/landing/auto-douane-kennis.webp',
          alt: 'Twee collega\'s naast elkaar aan een bureau in een kantoor, van achteren gezien',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat er in de haven geen software is. CargoWise en Descartes draaien al jaren de expeditie en de douane, de terminals in Antwerpen en Zeebrugge hebben hun eigen portalen, NxtPort en Port Plus verplaatsen al lang gegevens tussen partijen, en Certified Pick up heeft de vrijgavecode vervangen door een recht dat in een systeem leeft. Wij komen daar allemaal naast staan.',
        'Wij gaan niet zeggen dat een aangifte sneller doorgaat omdat wij ernaar kijken. De douane antwoordt wanneer de douane antwoordt, een terminal geeft het slot dat ze geeft, en een schip vertrekt wanneer het vertrekt. Wat verandert is wat er al bijeen is tegen dat u daar aankomt, en of u van een probleem wist op dinsdag of pas op vrijdag.',
        'En wij gaan niet zeggen dat één ding op alle zes deze beroepen past. Een surveykantoor met vierhonderd foto\'s per lot en een transporteur met een slotprobleem hebben in de praktijk bijna niets gemeen. Daarom bouwen wij per beroep en per stuk, en daarom zeggen wij u liever in de eerste week dat uw vraag bij iemand anders thuishoort.',
      ],
      faqs: [
        {
          q: 'Moeten wij weg van CargoWise of van ons eigen pakket?',
          a: 'Nee, en wij zouden het afraden. Uw pakket houdt het dossier, de historiek en de tarieven bij, en daarvan wisselen is een project dat een jaar uit een operationele ploeg haalt. Wat wij bouwen hangt ernaast, leest wat binnenkomt en schrijft het resultaat terug of legt het klaar ter goedkeuring. Kan uw pakket helemaal niets uitwisselen, dan zeggen wij dat voor wij beginnen in plaats van halverwege.',
        },
        {
          q: 'Dienen jullie in onze plaats in bij de douane?',
          a: 'Nee. Een aangifte vertrekt via het kanaal waarlangs ze vandaag vertrekt, ingediend door wie daarvoor gemachtigd is, en de verantwoordelijkheid voor wat erin staat blijft waar ze ligt. Wij zetten klaar wat erin gaat, toetsen dat aan de stukken in het dossier en melden wat niet klopt. Software die stilzwijgend in uw plaats indient, zet uw vergunning op het spel en niet de onze.',
        },
        {
          q: 'Onze commerciële gegevens mogen het kantoor niet uit. Kan dat?',
          a: 'Ja, en in deze sector is dat meestal de reden waarom men belt. Klantenprijzen, marges op een route en een douanestandpunt dat u liever niet gelezen ziet: daarvoor zetten wij het model op hardware in uw eigen kantoor, zodat er niets naar buiten gaat. De rest binnen Europa, met een verwerkersovereenkomst op papier. Wij zetten op een rij welke mailboxen, welke mappen en welke jaren erin zitten.',
        },
        {
          q: 'Wij zijn een expediteur met twaalf man, geen terminal. Werkt dit ook kleiner?',
          a: 'Het is vooral daarvoor gemaakt. Een bedrijf van twaalf man heeft hetzelfde overtikwerk en dezelfde termijnen als een bedrijf van tweehonderd, en niemand om het aan door te geven. Wij starten met één ding, dat loopt veertien dagen mee naast uw eigen manier van werken, en het moet in een drukke week overeind blijven voor er iets bijkomt. Verdient het zichzelf niet terug, dan zeggen wij dat en stoppen wij.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works in de havensector?',
      featuresSubtitle:
        'Een aangifte die binnen moet zijn voor het schip vertrekt, een container die vrij is maar geen tijdslot heeft, en die ene collega die weet hoe dat dossier in elkaar zit. Wij tellen eerst waar de uren echt blijven hangen en nemen daarna het stuk over dat elke week terugkomt.',
      ctaTitle: 'Stuur ons één gewone week',
      ctaBody:
        'Neem de mailbox van één week en de dossiers die er doorheen liepen, geanonimiseerd. Wij zeggen u binnen de week welk stuk daarvan wij zouden overnemen en welk stuk beter bij uw eigen mensen blijft, zonder dat er iets vastligt.',
      seoTitle: 'AI-automatisering voor de havensector in Antwerpen, Zeebrugge en Gent · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge neemt het terugkerende werk over in expeditie, douane, scheepsagentuur, haventransport en entrepot: documenten niet meer overtypen, termijnen bewaken over systemen heen, en uw eigen archief doorzoekbaar. Naast CargoWise, Descartes, IDMS, AES en Certified Pick up.',
    },
  },
  { hero: '/landing/auto-brugge-zeebrugge.webp', manifesto: '/landing/auto-antwerpen-schip.webp' },
)
