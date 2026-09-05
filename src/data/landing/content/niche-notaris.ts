import { solutionPage } from '../solutionPage'

/**
 * Sectorpagina voor notariskantoren.
 *
 * Het vak is bijzonder in één opzicht dat de hele tekst stuurt: een notaris is
 * openbaar ambtenaar, dus alles wat wij bouwen mag voorbereiden en niets mag
 * beslissen. Elke automatisering op deze pagina eindigt daarom bij een voorstel
 * dat iemand van het kantoor nakijkt, en dat staat er ook zo.
 *
 * De rij met oplossingen onderaan komt niet uit dit bestand: die wordt gevuld
 * vanuit src/data/landing/sectors.ts.
 */
export default solutionPage(
  {
    en:
    {
      eyebrow: 'Sectors',
      h1: 'AI automation for notary offices, from agreement to deed',
      subhead:
        'A sale agreement signed in March, a deed due in July, and in between roughly twenty searches and certificates that each expire on their own date. We first work out where the waiting really sits, and only then what a system can watch for you.',
      answerH2: 'What does Nivora Works do for a notary office?',
      answer:
        'Nivora Works is a software and AI studio in Bruges that takes over the preparatory work in a notary office: gathering what a file needs before the deed can pass, watching the dates that run from the sale agreement onward, and finding back what an earlier file already established about the same property or the same family. Nothing we build signs, decides or advises. It prepares, and a notary or a file handler at your office checks it and puts their name to it. Where professional secrecy applies, and in this trade that is nearly everywhere, the model runs on hardware inside your own office so the documents never leave the building.',
      answerDetail: [
        'We do not touch e-Notariaat, eStox, Biddit or Izimi, and we do not touch whichever file package your office runs on. Those hold the file and the register. What we build sits beside them, reads what comes in and puts the result ready in the place your people already look.',
        'We start with one bounded piece of work, and in most offices that is the same one: knowing per file which search or certificate is still outstanding and which one is about to expire. You watch that run for a fortnight against the way you do it now, and only then do we look at what is next.',
      ],
      manifesto:
        'A notary is paid for judgement. Not for chasing a certificate that was requested six weeks ago.',
      problemH2: 'Where the waiting really sits',
      problem: [
        'Between the sale agreement and the deed there are roughly four months, and in those months your office is mostly waiting. The soil certificate from OVAM, the planning information through the property information platform, the mortgage search, the tax and social security notifications, the building manager information on an apartment, the asbestos certificate, the electrical inspection, the pre-emption rights. Each comes back on its own schedule and each one has its own expiry, and the file handler keeps that in a spreadsheet or in their head.',
        'The same questions come in from both sides of the same file. The buyer wants to know when he has to have the money there, the seller wants to know what he still has to clear out, and the estate agent rings on Thursday to ask whether the deed can move a week. Four people at your office each type out their own version of the same answer, and none of those answers ends up in the file.',
        'What your office established about a property in 2014 is in the deed, in the correspondence around it, and in the head of the handler who did it. When the same building comes back for a succession or a division, that work starts again from an empty screen.',
      ],
      pillarsH2: 'How we go about it',
      pillars: [
        {
          title: 'One file, followed end to end',
          body: 'We take one ordinary sale from agreement to deed and mark every point where somebody has to remember something. Not a workshop and not a questionnaire: the actual file, with the actual gaps. What comes out of that is usually shorter than the office expected and more specific than any general list would have been.',
        },
        {
          title: 'Nothing signs, nothing decides',
          body: 'A notary is a public officer and that does not delegate. So everything we build stops at a proposal with its source attached: this figure comes from that document, this date comes from that certificate. Your handler sees in ten seconds where it came from instead of having to take it on faith, and the person who puts their name to it is the person who has always put their name to it.',
        },
        {
          title: 'The documents stay in the building',
          body: 'Identity documents, marriage contracts, medical details in a guardianship file, the whole estate of a family: none of that belongs on a server on the other side of the world. Where secrecy applies we run the model on a machine in your own office. We write down in plain language what runs where, so you can simply show it.',
        },
      ],
      signals: [
        'A file handler keeps the outstanding searches in their own spreadsheet',
        'Something expires and gets requested a second time, at your cost',
        'When a colleague is off for two weeks, their files stand still',
        'What you established about that building ten years ago is in an old deed nobody opens',
      ],
      automationsH2: 'What we can automate in a notary office',
      automationsIntro:
        'Four things that come back at almost every office. We build them one at a time, and it usually starts with the first one.',
      automations: [
        {
          title: 'The full file',
          body: 'Per file you see what is in and what is not: soil certificate, planning information, energy performance certificate with its number, asbestos certificate, electrical inspection, oil tank inspection, safety file, pre-emption rights, mortgage search, the tax and social security notifications, and on an apartment the building manager information. Each with the date it was requested, the date it came back, and the date it stops being valid.',
          image: '/landing/auto-sec-notaris-a.webp',
          alt: 'A notary consultation room with a long oak table and tall shuttered windows',
        },
        {
          title: 'The clock from March',
          body: 'The deed has to pass within the term, the notifications have their own reply period, and a search that was done too early is worth nothing by July. The counter runs beside your own planning and tells you the week before, not the morning itself. Nothing is sent automatically: you get a list of the five files that need a call today.',
          image: '/landing/auto-opl-termijnwachter-hero.webp',
          alt: 'Low afternoon sun throwing a window frame shadow across an empty office floor',
        },
        {
          title: 'Questions from parties',
          body: 'When has the money to be there, what does the buyer pay on top, what still has to be cleared out, can the deed move a week. The answer is prepared once in your office\'s own wording and with the figures of that specific file filled in, ready to paste into the mail. Somebody reads it and presses send, because a seller who rings about their own house would rather hear a person.',
          image: '/landing/auto-opl-antwoord-a.webp',
          alt: 'One fixed answer per recurring question, ready to paste into Outlook',
        },
        {
          title: 'Taking over a file',
          body: 'One sheet per file: what stage it is at, what has been requested and when, what was promised to whom by email, and what has to happen this week. Made for the colleague who has to pick it up on Monday because the handler is away, and made from what is already in the file rather than from a form somebody has to fill in on a Friday afternoon.',
          image: '/landing/auto-sec-notaris-b.webp',
          alt: 'The deed archive of a notary practice, two runs of shelving filled with bound registers',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say the notariat has no software. Fednot has built e-Notariaat, eStox holds the share registers together with the ITAA, Biddit runs the online sales and Izimi gives the citizen a digital safe. Those are the rails this trade runs on and we are not proposing to relay them.',
        'We are not going to say a request comes back faster because we watch it. OVAM answers when it answers, a building manager answers when he answers, and the property information platform has its own turnaround. What changes is that you know on Tuesday which five files are stuck and on whom, instead of finding out three days before the deed.',
        'And we are not going to say a model can draft a deed. It cannot, and even where it could it should not: the responsibility for what is in that deed is personal, it is disciplinary, and it does not transfer to software. What we build gathers, checks against the file and flags what is missing.',
      ],
      faqs: [
        {
          q: 'Do we have to change our file package for this?',
          a: 'No. Whatever your office runs on stays where it is, with the files and the history in it. What we build reads what comes in and delivers the result there, or puts it ready for approval. If your package cannot exchange anything at all, we say so up front rather than halfway, and then we look for another way in.',
        },
        {
          q: 'What about professional secrecy?',
          a: 'That is why we start from local. For anything covered by your secrecy we put a model on hardware in your own office, so identity documents, marriage contracts and estate files never leave the building. For ordinary office correspondence a European provider is fine, with a data processing agreement on paper. We set out which mailboxes, which folders and which years went in, and you can take it back out.',
        },
        {
          q: 'Who is responsible if the system misses something?',
          a: 'You are, and that is exactly why we build it as a second pair of eyes rather than as a replacement for the first. A search that is missing is flagged, not silently assumed. Nothing is requested, sent or signed without someone at your office having seen it. If a certificate is in the file but our system did not recognise it, you see the file and not an empty list.',
        },
        {
          q: 'We are a small office with four people, is this worth it?',
          a: 'Often more than in a large one, because in a small office everything sits with the same two people and there is nobody to hand a file to. We build one thing, we let it run alongside your own way of working for two weeks, and if it turns out not to save you anything we say so. We are not going to talk a four person office into a project it does not need.',
        },
      ],
      featuresTitle: 'What does Nivora Works do for a notary office?',
      featuresSubtitle:
        'A sale agreement signed in March, a deed due in July, and in between roughly twenty searches and certificates that each expire on their own date. We first work out where the waiting really sits, and only then what a system can watch for you.',
      ctaTitle: 'Send us one file',
      ctaBody:
        'Take one ordinary sale that is running right now, anonymised. We will tell you within the week which part of the follow-up we would take over and which part is better left with your handler, with nothing agreed.',
      seoTitle: 'AI automation for notary offices in Flanders · Nivora Works',
      seoDescription:
        'Nivora Works in Bruges takes over the preparatory work in a notary office: which search or certificate is still outstanding, which date is running, and what an earlier file already established. Nothing signs or decides, and sensitive documents stay in the building.',
    },
    nl:
    {
      eyebrow: 'Sectoren',
      h1: 'AI-automatisering voor notariskantoren, van compromis tot akte',
      subhead:
        'In maart een compromis getekend, in juli de akte, en daartussen een stuk of twintig opzoekingen en attesten die elk op hun eigen datum vervallen. Wij kijken eerst waar het wachten echt zit, en pas daarna wat een systeem voor u kan bewaken.',
      answerH2: 'Wat doet Nivora Works voor een notariskantoor?',
      answer:
        'Nivora Works is een software- en AI-studio in Brugge die het voorbereidend werk in een notariskantoor overneemt: verzamelen wat een dossier nodig heeft voor de akte kan passeren, de data bewaken die vanaf het compromis beginnen te lopen, en terugvinden wat een eerder dossier al vastgesteld heeft over hetzelfde pand of dezelfde familie. Niets van wat wij bouwen tekent, beslist of adviseert. Het zet klaar, en een notaris of dossierbeheerder van uw kantoor kijkt het na en zet er zijn naam onder. Waar het beroepsgeheim geldt, en dat is in dit vak zowat overal, draait het model op hardware in uw eigen kantoor zodat de stukken het gebouw niet verlaten.',
      answerDetail: [
        'Wij raken niet aan e-Notariaat, eStox, Biddit of Izimi, en wij raken niet aan het dossierpakket waarop uw kantoor draait. Die houden het dossier en het register bij. Wat wij bouwen hangt ernaast, leest wat binnenkomt en legt het resultaat klaar op de plek waar uw mensen toch al kijken.',
        'Wij starten met één afgebakend stuk werk, en in de meeste kantoren is dat hetzelfde: per dossier weten welke opzoeking of welk attest nog openstaat en welk stuk bijna vervalt. Dat laat u twee weken meelopen naast uw eigen manier, en pas daarna kijken wij wat het volgende is.',
      ],
      manifesto:
        'Een notaris wordt betaald voor zijn oordeel. Niet voor het achternabellen van een attest dat zes weken geleden is aangevraagd.',
      problemH2: 'Waar het wachten echt zit',
      problem: [
        'Tussen het compromis en de akte liggen ongeveer vier maanden, en in die maanden staat uw kantoor vooral te wachten. Het bodemattest bij OVAM, de stedenbouwkundige inlichtingen via het vastgoedinformatieplatform, de hypothecaire opzoeking, de fiscale en sociale notificaties, de syndicusinformatie bij een appartement, het asbestattest, de keuring van de elektrische installatie, de voorkooprechten. Elk komt op zijn eigen tempo terug en elk heeft zijn eigen vervaldatum, en de dossierbeheerder houdt dat bij in een rekenblad of in zijn hoofd.',
        'Dezelfde vragen komen van beide kanten van hetzelfde dossier. De koper wil weten wanneer het geld er moet staan, de verkoper wil weten wat hij nog moet leeghalen, en de makelaar belt op donderdag of de akte een week kan opschuiven. Vier mensen op uw kantoor tikken elk hun eigen versie van hetzelfde antwoord, en geen van die antwoorden belandt in het dossier.',
        'Wat uw kantoor in 2014 over een pand vastgesteld heeft, zit in de akte, in de briefwisseling eromheen en in het hoofd van de beheerder die het gedaan heeft. Komt datzelfde gebouw terug voor een nalatenschap of een verdeling, dan begint dat werk opnieuw op een leeg scherm.',
      ],
      pillarsH2: 'Hoe wij te werk gaan',
      pillars: [
        {
          title: 'Eén dossier, van begin tot eind gevolgd',
          body: 'Wij nemen één gewone verkoop van compromis tot akte en tekenen elk punt aan waar iemand iets moet onthouden. Geen workshop en geen vragenlijst: het echte dossier, met de echte gaten erin. Wat daaruit komt is doorgaans korter dan het kantoor verwachtte en concreter dan welke algemene lijst ook geweest zou zijn.',
        },
        {
          title: 'Niets tekent, niets beslist',
          body: 'Een notaris is openbaar ambtenaar en dat delegeert niet. Alles wat wij bouwen stopt dus bij een voorstel met de bron erbij: dit cijfer komt uit dat stuk, deze datum komt uit dat attest. Uw beheerder ziet in tien seconden waar het vandaan komt in plaats van het te moeten geloven, en wie zijn naam eronder zet is wie er altijd zijn naam onder gezet heeft.',
        },
        {
          title: 'De stukken blijven in het gebouw',
          body: 'Identiteitsstukken, huwelijkscontracten, medische gegevens in een bewindvoeringsdossier, de volledige nalatenschap van een familie: dat hoort niet op een server aan de andere kant van de wereld. Waar het beroepsgeheim speelt, zetten wij het model op een machine in uw eigen kantoor. Wij schrijven in mensentaal op wat waar draait, zodat u dat gewoon kunt tonen.',
        },
      ],
      signals: [
        'Een dossierbeheerder houdt de openstaande opzoekingen bij in zijn eigen rekenblad',
        'Er vervalt iets en het wordt een tweede keer aangevraagd, op uw kosten',
        'Als een collega twee weken weg is, liggen zijn dossiers stil',
        'Wat u tien jaar geleden over dat gebouw vaststelde, zit in een oude akte die niemand opent',
      ],
      automationsH2: 'Wat we kunnen automatiseren in een notariskantoor',
      automationsIntro:
        'Vier dingen die bij zowat elk kantoor terugkomen. Wij bouwen ze één voor één, en meestal begint het bij de eerste.',
      automations: [
        {
          title: 'Dossier compleet',
          body: 'Per dossier ziet u wat binnen is en wat niet: bodemattest, stedenbouwkundige inlichtingen, EPC met certificaatnummer, asbestattest, keuring van de elektrische installatie, stookolietankkeuring, postinterventiedossier, voorkooprechten, hypothecaire opzoeking, de fiscale en sociale notificaties, en bij een appartement de syndicusinformatie. Telkens met de datum van aanvraag, de datum van antwoord en de datum waarop het stuk zijn geldigheid verliest.',
          image: '/landing/auto-sec-notaris-a.webp',
          alt: 'Een notariële besprekingsruimte met een lange eiken tafel en hoge vensters met luiken',
        },
        {
          title: 'De klok vanaf maart',
          body: 'De akte moet binnen de termijn passeren, de notificaties hebben hun eigen antwoordtermijn, en een opzoeking die te vroeg gedaan is, is in juli niets meer waard. De teller loopt naast uw eigen planning en zegt het u de week ervoor, niet de ochtend zelf. Er vertrekt niets vanzelf: u krijgt een lijstje met de vijf dossiers waarvoor er vandaag gebeld moet worden.',
          image: '/landing/auto-opl-termijnwachter-hero.webp',
          alt: 'Late namiddagzon die de schaduw van een raamkozijn over een lege kantoorvloer werpt',
        },
        {
          title: 'Vragen van partijen',
          body: 'Wanneer moet het geld er staan, wat betaalt de koper er bovenop, wat moet er nog leeggehaald worden, kan de akte een week opschuiven. Het antwoord staat één keer klaar in de bewoording van uw kantoor en met de cijfers van dat specifieke dossier ingevuld, klaar om in de mail te plakken. Iemand leest het na en drukt op verzenden, want een verkoper die belt over zijn eigen huis hoort liever een mens.',
          image: '/landing/auto-opl-antwoord-a.webp',
          alt: 'Eén vast antwoord per terugkerende vraag, klaar om in te voegen in Outlook',
        },
        {
          title: 'Dossier overnemen',
          body: 'Eén blad per dossier: hoe ver het staat, wat er aangevraagd is en wanneer, wat er per mail aan wie beloofd is, en wat er deze week moet gebeuren. Gemaakt voor de collega die het maandag moet oppakken omdat de beheerder weg is, en opgebouwd uit wat al in het dossier zit in plaats van uit een formulier dat iemand op vrijdagnamiddag moet invullen.',
          image: '/landing/auto-sec-notaris-b.webp',
          alt: 'Het aktearchief van een notariskantoor, twee rijen rekken vol ingebonden registers',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat het notariaat geen software heeft. Fednot heeft e-Notariaat gebouwd, eStox houdt samen met het ITAA de aandeelhoudersregisters bij, Biddit doet de online verkopen en Izimi geeft de burger een digitale kluis. Dat zijn de sporen waarop dit vak rijdt en wij stellen niet voor om die opnieuw te leggen.',
        'Wij gaan niet zeggen dat een aanvraag sneller terugkomt omdat wij ze bewaken. OVAM antwoordt wanneer OVAM antwoordt, een syndicus antwoordt wanneer hij antwoordt, en het vastgoedinformatieplatform heeft zijn eigen doorlooptijd. Wat verandert is dat u op dinsdag weet welke vijf dossiers vasthangen en bij wie, in plaats van drie dagen voor de akte.',
        'En wij gaan niet zeggen dat een model een akte kan opstellen. Dat kan het niet, en waar het het zou kunnen hoort het niet: de verantwoordelijkheid voor wat in die akte staat is persoonlijk, ze is tuchtrechtelijk, en ze verhuist niet naar software. Wat wij bouwen verzamelt, toetst aan het dossier en meldt wat ontbreekt.',
      ],
      faqs: [
        {
          q: 'Moeten wij hiervoor van dossierpakket veranderen?',
          a: 'Nee. Waar uw kantoor op draait blijft staan waar het staat, met de dossiers en de historiek erin. Wat wij bouwen leest wat binnenkomt en levert het resultaat daar af, of legt het klaar ter goedkeuring. Kan uw pakket helemaal niets uitwisselen, dan zeggen wij dat op voorhand in plaats van halverwege, en zoeken wij een andere ingang.',
        },
        {
          q: 'Hoe zit dat met het beroepsgeheim?',
          a: 'Daarom beginnen wij bij lokaal. Voor alles waar uw beroepsgeheim op rust zetten wij een model op hardware in uw eigen kantoor, zodat identiteitsstukken, huwelijkscontracten en nalatenschapsdossiers het gebouw niet verlaten. Voor gewone kantoorpost werkt een Europese leverancier prima, met een verwerkersovereenkomst op papier. Wij zetten op een rij welke mailboxen, welke mappen en welke jaren erin zitten, en u haalt het er ook weer uit.',
        },
        {
          q: 'Wie is verantwoordelijk als het systeem iets mist?',
          a: 'U, en net daarom bouwen wij het als een tweede paar ogen en niet als vervanging van het eerste. Een opzoeking die ontbreekt wordt gemeld, niet stilzwijgend verondersteld. Er wordt niets aangevraagd, verstuurd of getekend zonder dat iemand van uw kantoor het gezien heeft. Zit een attest wel in het dossier maar herkende ons systeem het niet, dan ziet u het dossier en geen lege lijst.',
        },
        {
          q: 'Wij zijn een klein kantoor met vier mensen, heeft dat zin?',
          a: 'Vaak meer dan in een groot kantoor, want bij u zit alles bij dezelfde twee mensen en is er niemand om een dossier aan door te geven. Wij bouwen één ding, laten het twee weken meelopen naast uw eigen manier van werken, en levert het niets op, dan zeggen wij dat. Wij gaan een kantoor van vier mensen geen project aanpraten dat het niet nodig heeft.',
        },
      ],
      featuresTitle: 'Wat doet Nivora Works voor een notariskantoor?',
      featuresSubtitle:
        'In maart een compromis getekend, in juli de akte, en daartussen een stuk of twintig opzoekingen en attesten die elk op hun eigen datum vervallen. Wij kijken eerst waar het wachten echt zit, en pas daarna wat een systeem voor u kan bewaken.',
      ctaTitle: 'Stuur ons één dossier',
      ctaBody:
        'Neem één gewone verkoop die nu loopt, geanonimiseerd. Wij zeggen u binnen de week welk stuk van de opvolging wij zouden overnemen en welk stuk beter bij uw beheerder blijft, zonder dat er iets vastligt.',
      seoTitle: 'AI-automatisering voor notariskantoren in Vlaanderen · Nivora Works',
      seoDescription:
        'Nivora Works uit Brugge neemt het voorbereidend werk in een notariskantoor over: welke opzoeking of welk attest nog openstaat, welke datum loopt, en wat een eerder dossier al vastgesteld heeft. Niets tekent of beslist, en gevoelige stukken blijven in het gebouw.',
    },
  },
  { hero: '/landing/auto-sec-notaris-a.webp', manifesto: '/landing/auto-sec-notaris-b.webp' },
)
