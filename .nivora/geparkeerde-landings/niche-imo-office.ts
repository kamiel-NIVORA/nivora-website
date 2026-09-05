import { solutionPage } from '../solutionPage'

/**
 * /ai-automation-imo-office · /nl/ai-automatisering-imo-kantoor
 *
 * Geschreven binnen de grenzen van .nivora/research/imo-kantoren-marktonderzoek.md.
 *
 * Dat onderzoek toetste zestien voorgestelde automatiseringen adversarieel tegen
 * de bestaande markt. Alle zestien sneuvelden: iCustoms, Tier2, CargoDocket,
 * CargoWise Value Packs, Stream adore4customs en het Antwerpse Vectrix verkopen
 * die functies vandaag al, vaak met exact dezelfde woorden.
 *
 * Deze pagina bevat daarom GEEN nieuwheidsclaim. Het verschil dat wel standhoudt
 * is de plaats waar het draait en de taal en systemen waarop het is afgestemd.
 * Verboden formuleringen staan in sectie 3 van het rapport; die zijn hier
 * bewust vermeden.
 */
export default solutionPage(
  {
    en: {
      eyebrow: 'AI for IMO offices',
      h1: 'AI for an IMO office, running inside your own walls',
      subhead:
        'The functions exist and your software vendor sells most of them. What does not exist is a version that runs on your own server, speaks Dutch, and knows what IDMS and CPu are.',
      answerH2: 'What can AI actually do in an IMO office?',
      answer:
        'In a freight forwarding or customs office, AI reads the documents of a file, compares them against each other, and flags what does not match before a declaration goes out. Most sector packages now offer some version of this. Nivora, a software and AI studio in Brugge, builds the same capability as a layer on top of the package you already run, on hardware you own, so customer invoices and rates never leave the building.',
      answerDetail: [
        'Being honest about this is the point. Cross-document checking, HS classification and mail-to-declaration are sold today by iCustoms, Tier2, CargoWise and the Antwerp company Vectrix. Anyone who tells you otherwise has not looked.',
        'The gap is elsewhere. Every one of those runs in somebody else\'s cloud, is priced per user, and knows nothing about the Belgian chain: IDMS, AES, NCTS Phase 5, PN/TS, the Inbound Release Platform, Certified Pick up, FAVV.',
      ],
      manifesto:
        'Your files hold what your customers pay, who they buy from and what their margins are. That is the last thing you want sitting in another company\'s cloud.',
      problemH2: 'Why the software is not the problem any more',
      problem: [
        'The core is saturated. Between CargoWise with Intris, Descartes, Stream Software, Organi, Customs4trade and AEB, every declaration, file and warehousing process a Belgian office needs is covered.',
        'The platforms underneath work too. C-point, e-Desk, Certified Pick up, the Inbound Release Platform and MSW Belgium do what they were built for. Sending a message is a solved problem.',
        'The time goes to what sits between all of that: mailboxes, the shared info inbox, network drives, ten portals with ten logins, and the knowledge in the head of one senior declarant who cannot be replaced.',
      ],
      pillarsH2: 'Where a layer on top earns its place',
      pillars: [
        {
          title: 'On your own hardware',
          body: 'The model runs on a server in your office. Rates, customer lists and invoices are never transmitted, which matters when you handle competing shippers under the same roof.',
        },
        {
          title: 'On top, not instead',
          body: 'Your declaration system stays. We read from it and write back to it, so nobody migrates anything and nobody learns a second system.',
        },
        {
          title: 'In Dutch, on Belgian systems',
          body: 'Built against IDMS, AES, PN/TS, the Inbound Release Platform and CPu rather than a generic European template, and it answers in the language your office actually works in.',
        },
      ],
      signals: [
        'Your Value Pack invoice went up sharply in January',
        'One senior declarant carries knowledge nobody else has',
        'A customs query about an old file costs two days of searching',
        'You handle competing shippers and their data sits in one cloud',
      ],
      examplesH2: 'What this looks like in practice',
      examplesIntro:
        'Illustrative situations rather than client cases, chosen because they are the ones offices describe most often.',
      examples: [
        {
          title: 'A query about a two-year-old file',
          before:
            'Customs asks for proof on an old declaration. The evidence sits in a departed colleague\'s mailbox, on a network drive and in a portal confirmation, and finding it takes two days.',
          after:
            'You get a timeline of what was found and a list of what is still missing, assembled from the places the file itself never captured.',
        },
        {
          title: 'A line that does not match your own history',
          before:
            'A commodity code is entered by hand for an article that is not in the master file. Nothing objects, and the inconsistency surfaces during an audit.',
          after:
            'At the moment of entry you see what your office used before for the same product, supplier or customer, on code, origin and value.',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to tell you that nobody compares the documents in a file. iCustoms calls it cross-document validation and sells it today. Tier2 and CargoDocket do the same.',
        'We are not going to claim that searching your own archive is new. Microsoft 365 Copilot does that horizontally, and if you are on Business Premium you can switch it on per seat.',
        'What we do claim is narrower and checkable: the same work, on your hardware, against Belgian systems, without a per-seat licence and without your customer data leaving the building.',
      ],
      faqs: [
        {
          q: 'We already have CargoWise. Why would we add anything?',
          a: 'Often you should not, and that is worth establishing early. It becomes interesting when the Value Pack pricing stops matching what you get from it, when the work you want sits outside the declaration flow, or when you do not want customer data in a foreign cloud. If none of those apply, keep what you have.',
        },
        {
          q: 'Does this replace our declaration system?',
          a: 'No, and we would advise against anyone who proposes that. Replacing a working declaration system is an eighteen-month programme with real risk. This reads from it and writes back to it, so the system of record does not move.',
        },
        {
          q: 'Is it allowed to put customer data through AI?',
          a: 'That depends entirely on where the model runs. On your own server there is no transfer and no third party processing, which removes the hardest part of the question. The rest of your GDPR obligations are unchanged and still yours.',
        },
        {
          q: 'What happens when IDMS changes again?',
          a: 'It gets adjusted, because the code is in your possession. That is the practical difference with a SaaS roadmap: you are not waiting for a vendor to prioritise a Belgian change among everything else on their list.',
        },
      ],
      featuresTitle: 'Ready-made software, or a layer built for your office',
      featuresSubtitle:
        'Most of what a forwarding office needs already exists and works. What we build is the part between those systems, on infrastructure you control.',
      ctaTitle: 'Bring the query that cost you two days',
      ctaBody:
        'The fastest way into a useful conversation is a real file that went wrong. You get a straight answer on whether a layer on top would have helped, and where your existing package already covers it.',
      seoTitle: 'AI automation for IMO and forwarding offices · Nivora',
      seoDescription:
        'AI for freight forwarding and customs offices, running on your own server, on top of the package you already use, built against IDMS, AES, CPu and the Inbound Release Platform. By Nivora, Brugge.',
    },
    nl: {
      eyebrow: 'AI voor IMO-kantoren',
      h1: 'AI voor een IMO-kantoor, draaiend binnen uw eigen muren',
      subhead:
        'De functies bestaan, en uw softwareleverancier verkoopt de meeste ervan. Wat niet bestaat, is een versie die op uw eigen server draait, Nederlands spreekt en weet wat IDMS en CPu zijn.',
      answerH2: 'Wat kan AI werkelijk doen in een IMO-kantoor?',
      answer:
        'In een expeditie- of douanekantoor leest AI de documenten van een dossier, legt ze naast elkaar en meldt wat niet overeenkomt voor een aangifte vertrekt. De meeste sectorpakketten bieden daar intussen een versie van. Nivora, een software- en AI-studio in Brugge, bouwt diezelfde functie als laag bovenop het pakket dat u al draait, op hardware die van u is, zodat klantfacturen en tarieven het gebouw nooit verlaten.',
      answerDetail: [
        'Daar eerlijk over zijn, is het punt. Kruiscontrole tussen documenten, GN-indeling en mail-naar-aangifte worden vandaag verkocht door iCustoms, Tier2, CargoWise en het Antwerpse Vectrix. Wie u iets anders vertelt, heeft niet gekeken.',
        'Het gat zit elders. Al die oplossingen draaien in andermans cloud, worden per gebruiker gefactureerd, en kennen de Belgische keten niet: IDMS, AES, NCTS fase 5, PN/TS, het Inbound Release Platform, Certified Pick up, FAVV.',
      ],
      manifesto:
        'In uw dossiers staat wat uw klanten betalen, bij wie ze kopen en wat hun marge is. Dat is het laatste wat u in de cloud van een ander bedrijf wilt hebben staan.',
      problemH2: 'Waarom de software niet meer het probleem is',
      problem: [
        'De kern is verzadigd. Tussen CargoWise met Intris, Descartes, Stream Software, Organi, Customs4trade en AEB is elk aangifte-, dossier- en entrepotproces dat een Belgisch kantoor nodig heeft afgedekt.',
        'De platformen eronder werken ook. C-point, e-Desk, Certified Pick up, het Inbound Release Platform en MSW Belgium doen waarvoor ze gebouwd zijn. Een bericht versturen is een opgelost probleem.',
        'De tijd gaat naar wat daartussen zit: mailboxen, de gedeelde info-bak, netwerkschijven, tien portalen met tien logins, en de kennis in het hoofd van één senior declarant die niet vervangen raakt.',
      ],
      pillarsH2: 'Waar een laag erbovenop zijn plaats verdient',
      pillars: [
        {
          title: 'Op uw eigen hardware',
          body: 'Het model draait op een server in uw kantoor. Tarieven, klantenlijsten en facturen worden nooit verstuurd, en dat telt wanneer u concurrerende verladers onder één dak bedient.',
        },
        {
          title: 'Erbovenop, niet in de plaats',
          body: 'Uw aangiftesysteem blijft staan. Wij lezen eruit en schrijven erin terug, dus niemand migreert iets en niemand leert een tweede systeem.',
        },
        {
          title: 'In het Nederlands, op Belgische systemen',
          body: 'Gebouwd tegen IDMS, AES, PN/TS, het Inbound Release Platform en CPu in plaats van een algemeen Europees sjabloon, en het antwoordt in de taal waarin uw kantoor werkt.',
        },
      ],
      signals: [
        'Uw Value Pack-factuur ging in januari fors omhoog',
        'Eén senior declarant draagt kennis die niemand anders heeft',
        'Een douanevraag over een oud dossier kost twee dagen zoeken',
        'U bedient concurrerende verladers en hun data staat in één cloud',
      ],
      examplesH2: 'Hoe dit er in de praktijk uitziet',
      examplesIntro:
        'Verzonnen situaties in plaats van klantendossiers, gekozen omdat het de situaties zijn die kantoren het vaakst beschrijven.',
      examples: [
        {
          title: 'Een vraag over een dossier van twee jaar oud',
          before:
            'De douane vraagt bewijs bij een oude aangifte. Het zit in de mailbox van een vertrokken collega, op een netwerkschijf en in een portaalbevestiging, en het vinden kost twee dagen.',
          after:
            'U krijgt een tijdlijn van wat gevonden is en een lijst van wat nog ontbreekt, samengesteld uit de plaatsen die het dossier zelf nooit vastlegde.',
        },
        {
          title: 'Een lijn die afwijkt van uw eigen historiek',
          before:
            'Een goederencode wordt met de hand ingebracht voor een artikel dat niet in de fiche staat. Niets protesteert, en de inconsistentie komt boven tijdens een controle.',
          after:
            'Op het moment van inbrengen ziet u wat uw kantoor eerder gebruikte voor hetzelfde product, dezelfde leverancier of dezelfde klant, op code, oorsprong en waarde.',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan u niet vertellen dat niemand de documenten van een dossier vergelijkt. iCustoms noemt het cross-document validation en verkoopt het vandaag. Tier2 en CargoDocket doen hetzelfde.',
        'Wij gaan niet beweren dat uw eigen archief doorzoeken nieuw is. Microsoft 365 Copilot doet dat horizontaal, en zit u op Business Premium, dan zet u dat per gebruiker aan.',
        'Wat wij wel beweren is smaller en controleerbaar: hetzelfde werk, op uw hardware, tegen Belgische systemen, zonder licentie per medewerker en zonder dat uw klantgegevens het gebouw verlaten.',
      ],
      faqs: [
        {
          q: 'We hebben al CargoWise. Waarom zouden we er iets bij nemen?',
          a: 'Vaak moet u dat niet, en dat stelt u beter vroeg vast. Het wordt interessant wanneer de Value Pack-prijs niet meer past bij wat u ervoor krijgt, wanneer het werk dat u wilt buiten de aangiftestroom valt, of wanneer u klantgegevens niet in een buitenlandse cloud wilt. Geldt geen van die drie, hou dan wat u hebt.',
        },
        {
          q: 'Vervangt dit ons aangiftesysteem?',
          a: 'Nee, en wij zouden afraden om met iemand in zee te gaan die dat voorstelt. Een werkend aangiftesysteem vervangen is een programma van achttien maanden met reëel risico. Dit leest eruit en schrijft erin terug, dus het systeem van registratie verhuist niet.',
        },
        {
          q: 'Mag klantendata wel door AI?',
          a: 'Dat hangt volledig af van waar het model draait. Op uw eigen server is er geen doorgifte en geen verwerking door een derde, en dat haalt het moeilijkste deel van de vraag weg. De rest van uw GDPR-verplichtingen blijft ongewijzigd en blijft de uwe.',
        },
        {
          q: 'Wat als IDMS opnieuw verandert?',
          a: 'Dan wordt het aangepast, want de code is in uw bezit. Dat is het praktische verschil met een SaaS-roadmap: u wacht niet tot een leverancier een Belgische wijziging voorrang geeft op al de rest op zijn lijst.',
        },
      ],
      featuresTitle: 'Kant-en-klare software, of een laag voor uw kantoor',
      featuresSubtitle:
        'Het meeste van wat een expeditiekantoor nodig heeft bestaat al en werkt. Wat wij bouwen is het stuk tussen die systemen, op infrastructuur die u beheert.',
      ctaTitle: 'Breng de vraag mee die u twee dagen kostte',
      ctaBody:
        'De snelste weg naar een nuttig gesprek is een echt dossier dat misliep. U krijgt een recht antwoord of een laag erbovenop had geholpen, en waar uw huidige pakket het al afdekt.',
      seoTitle: 'AI-automatisering voor IMO- en expeditiekantoren · Nivora',
      seoDescription:
        'AI voor expeditie- en douanekantoren, draaiend op uw eigen server, bovenop het pakket dat u al gebruikt, gebouwd tegen IDMS, AES, CPu en het Inbound Release Platform. Door Nivora, Brugge.',
    },
  },
  { hero: '/landing/auto-imo-set.webp', manifesto: '/landing/auto-imo-server.webp' },
)
