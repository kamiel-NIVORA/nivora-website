import { solutionPage } from '../solutionPage'

/**
 * /ai-customs-broker · /nl/ai-douaneagent
 *
 * Geschreven binnen .nivora/research/niches-groep-1-marktonderzoek.md, niche 1.
 * Alle 35 voorstellen uit dat onderzoek sneuvelden op de nieuwheidstoets, dus
 * deze pagina claimt nergens dat een functie niet bestaat. Ze verkoopt waar het
 * draait en wat erin gaat.
 *
 * De verboden zinnen uit sectie 3 van dat rapport zijn hier bewust vermeden,
 * met name: "geen enkele leverancier verkoopt dit" (Nextcloud, Onyx en een
 * Copilot-agent doen lokaal RAG), "cloud mag juridisch niet" (beleidskeuze, geen
 * onmogelijkheid), en alles over openstaande transitzendingen of entrepot-
 * termijnen, want dat verraadt onkunde bij een declarant.
 */
export default solutionPage(
  {
    en: {
      eyebrow: 'AI for customs brokers',
      h1: 'AI for a customs office, on hardware you own',
      subhead:
        'Your declaration package already does the classifying and the cross-checking. What it does not do is run inside your building, and it does not capture why an experienced declarant departed from the standard code.',
      answerH2: 'What can AI add in a customs office?',
      answer:
        'In a Belgian customs office the declaration software already covers classification, duty calculation and document cross-checking, and mail-to-declaration is sold as an add-on by Stream Software and Digicust. Nivora, a software and AI studio in Brugge, builds the same handling on the office\'s own server, so invoices, values and customer contracts stay in the building, and adds the part nobody sells: capturing the reasoning behind a decision at the moment it is made.',
      answerDetail: [
        'Being straight about this matters more than sounding clever. customAIte runs on Customs Streamliner, Digicust advertises a Dutch-language AI Email Inbox with links into seventeen customs packages, and WiseTech bought Shipamax for CargoWise. The function exists.',
        'What is genuinely thin is memory. A senior declarant knows why a code was chosen for that customer three years ago, and that reasoning lives in a BTI, a mail thread or their head, not in the file.',
      ],
      manifesto:
        'The knowledge that makes a declaration correct sits with people who are retiring. Capturing it is worth more than another tool that classifies faster.',
      problemH2: 'Where the pressure actually is',
      problem: [
        'It is not in the software. Between CargoWise with Intris, Customs4trade, MIC, AEB, Descartes and Stream Software, virtually every Belgian office is covered, and covered well.',
        'It is in the migration and in the people. PLDA is being retired in favour of IDMS, AC4, AES, NCTS Phase 5, PN/TS and ICS2, arriving in waves, while the declarant workforce is ageing without replacement.',
        'And all of the above is cloud, while a declarant works with invoices, values and customer contracts that an importer would rather keep inside the building.',
      ],
      pillarsH2: 'What we add, and where',
      pillars: [
        {
          title: 'On your own server',
          body: 'The same processing the add-ons offer, running on hardware you own, feeding your existing package through its own import format. Nothing about the package changes.',
        },
        {
          title: 'The reasoning, captured',
          body: 'Two lines from the declarant at the moment of the decision, filed with the case. That is what makes an archive worth searching a year later.',
        },
        {
          title: 'In Dutch, on Belgian systems',
          body: 'Built against IDMS, AES, NCTS Phase 5 and PN/TS, and it answers in the language the office actually works in.',
        },
      ],
      signals: [
        'One senior declarant carries knowledge nobody else has',
        'A migration notice arrives as release notes nobody has time to read',
        'Customer invoices and values would rather not sit in a foreign cloud',
        'Why a code was chosen for that customer is nowhere in the file',
      ],
      automationsH2: 'What we can automate for a customs office',
      automationsIntro:
        'Four examples. Not client cases, but the work Belgian customs offices describe most often.',
      automations: [
        {
          title: 'Kennis van kantoor',
          body: 'Uw BTI\'s, vergunningsvoorwaarden en klantinstructies doorzoekbaar op uw eigen server. Plus de motivatie die de declarant vastlegt op het moment dat hij beslist.',
          image: '/landing/auto-douane-kennis.webp',
          alt: 'Twee bureaus in een havenkantoor, een collega die van opzij naar een scherm wijst, van achteren gezien',
        },
        {
          title: 'Mail wordt dossier',
          body: 'Dezelfde verwerking die add-ons bieden, maar op uw eigen server. Uw pakket wordt gevoed via zijn eigen importformaat.',
          image: '/landing/auto-douane-mail.webp',
          alt: 'Een scherm met een volle mailbox naast een geopende factuur en een half ingevuld formulier',
        },
        {
          title: 'Volledigheidstoets',
          body: 'Bij een controlevraag zoeken we wat buiten het pakket ligt: mailwisseling, getekende volmacht, losse vrachtbrief. Klaar om te uploaden.',
          image: '/landing/auto-douane-volledig.webp',
          alt: 'Een stapel geordende documenten met tabbladen op een vergadertafel naast een laptop',
        },
        {
          title: 'Wat verandert bij ons',
          body: 'Release notes en douaneberichten worden een korte Nederlandstalige takenlijst. Met uw eigen dossiernummers en klantnamen erbij.',
          image: '/landing/auto-douane-verandering.webp',
          alt: 'Een vergaderhoek met een gemarkeerd document en een laptop met klantnamen',
        },
      ],
      outcomesH2: 'What we are not going to claim',
      outcomes: [
        'We are not going to say that reading a mailbox into a declaration is new. Stream Software sells customAIte as an add-on on its own Customs Streamliner, and Digicust advertises exactly this in Dutch.',
        'We are not going to say cloud processing is legally impossible. It is a policy choice, and Purview and the EU Data Boundary are the counter-argument. Anyone who claims otherwise loses the conversation.',
        'What we do claim: the same handling on your hardware, in Dutch, against Belgian systems, plus the reasoning captured at the moment it is made.',
      ],
      faqs: [
        {
          q: 'We already run Customs Streamliner with customAIte. What is left?',
          a: 'Possibly nothing, and that is worth settling early. It becomes interesting when the customer data going through that add-on is the objection, or when the work you want sits outside the declaration flow entirely. If neither applies, keep what you have.',
        },
        {
          q: 'Does this replace our declaration package?',
          a: 'No, and be careful with anyone who proposes it. This reads from your package and writes back through its own import format. The system of record does not move and nobody learns a second system.',
        },
        {
          q: 'Is running AI in the cloud actually a problem?',
          a: 'Legally, usually not, and we will not pretend otherwise. It is a policy question about where invoices, values and customer contracts sit. Some importers care a great deal and some do not, and the honest answer is that it depends on your clients.',
        },
        {
          q: 'What about the IDMS migration?',
          a: 'The notices already reach you from your vendor and the administration. What we do is turn them into a short Dutch task list with your own file numbers attached, so a case handler sees which running files need checking rather than reading technical release notes.',
        },
      ],
      featuresTitle: 'Software that exists, on infrastructure you control',
      featuresSubtitle:
        'Most of what a customs office needs is already covered by its package. What we build is the layer between it and everything that never made it into the file.',
      ctaTitle: 'Bring the control question that cost you a day',
      ctaBody:
        'A real file that went wrong says more than any description. You get a straight answer on whether a layer on top would have helped, and where your package already covers it.',
      seoTitle: 'AI for customs brokers and declarants · Nivora',
      seoDescription:
        'AI for Belgian customs offices, running on your own server on top of the package you already use, built against IDMS, AES and NCTS Phase 5. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      eyebrow: 'AI voor douaneagenten',
      h1: 'AI voor een douanekantoor, op hardware die van u is',
      subhead:
        'Uw aangiftepakket doet het indelen en het kruiscontroleren al. Wat het niet doet, is binnen uw muren draaien, en het legt niet vast waarom een ervaren declarant die keer van de standaardcode afweek.',
      answerH2: 'Wat kan AI toevoegen in een douanekantoor?',
      answer:
        'In een Belgisch douanekantoor dekt de aangiftesoftware de indeling, de rechtenberekening en de kruiscontrole tussen documenten al, en mail-naar-aangifte wordt als add-on verkocht door Stream Software en Digicust. Nivora, een software- en AI-studio in Brugge, bouwt diezelfde verwerking op de eigen server van het kantoor, zodat facturen, waardegegevens en klantcontracten binnen blijven, en voegt toe wat niemand verkoopt: de motivatie achter een beslissing vastleggen op het moment dat ze genomen wordt.',
      answerDetail: [
        'Daar rechtuit over zijn, telt zwaarder dan slim klinken. customAIte draait op Customs Streamliner, Digicust adverteert een Nederlandstalige AI Email Inbox met koppelingen naar zeventien douanepakketten, en WiseTech kocht Shipamax voor CargoWise. De functie bestaat.',
        'Wat echt dun is, is geheugen. Een senior declarant weet waarom een code drie jaar geleden voor die klant gekozen werd, en die redenering zit in een BTI, een mailwissel of in zijn hoofd, niet in het dossier.',
      ],
      manifesto:
        'De kennis die een aangifte juist maakt, zit bij mensen die met pensioen gaan. Die vastleggen is meer waard dan weer een tool die sneller indeelt.',
      problemH2: 'Waar de druk werkelijk zit',
      problem: [
        'Niet in de software. Tussen CargoWise met Intris, Customs4trade, MIC, AEB, Descartes en Stream Software is vrijwel elk Belgisch kantoor gedekt, en goed gedekt.',
        'Wel in de migratie en in de mensen. PLDA wordt afgebouwd richting IDMS, AC4, AES, NCTS fase 5, PN/TS en ICS2, in golven, terwijl het declarantenkorps vergrijst zonder instroom.',
        'En dat alles draait in de cloud, terwijl een declarant werkt met facturen, waardegegevens en klantcontracten die een importeur liever binnenshuis houdt.',
      ],
      pillarsH2: 'Wat wij toevoegen, en waar',
      pillars: [
        {
          title: 'Op uw eigen server',
          body: 'Dezelfde verwerking die de add-ons bieden, op hardware die van u is, uw bestaande pakket gevoed via zijn eigen importformaat. Aan dat pakket verandert niets.',
        },
        {
          title: 'De motivatie, vastgelegd',
          body: 'Twee regels van de declarant op het moment van de beslissing, bij het dossier. Dát maakt een archief een jaar later het doorzoeken waard.',
        },
        {
          title: 'In het Nederlands, op Belgische systemen',
          body: 'Gebouwd tegen IDMS, AES, NCTS fase 5 en PN/TS, en het antwoordt in de taal waarin het kantoor werkt.',
        },
      ],
      signals: [
        'Eén senior declarant draagt kennis die niemand anders heeft',
        'Een migratiebericht komt binnen als release notes waar niemand tijd voor heeft',
        'Klantfacturen en waardegegevens staan liever niet in een buitenlandse cloud',
        'Waarom een code voor die klant gekozen werd, staat nergens in het dossier',
      ],
      automationsH2: 'Wat we kunnen automatiseren voor een douanekantoor',
      automationsIntro:
        'Vier voorbeelden. Geen klantendossiers, wel het werk dat Belgische douanekantoren het vaakst beschrijven.',
      automations: [
        {
          title: 'Kennis van kantoor',
          body: 'Uw BTI\'s, vergunningsvoorwaarden en klantinstructies doorzoekbaar op uw eigen server. Plus de motivatie die de declarant vastlegt op het moment dat hij beslist.',
          image: '/landing/auto-douane-kennis.webp',
          alt: 'Twee bureaus in een havenkantoor, een collega die van opzij naar een scherm wijst, van achteren gezien',
        },
        {
          title: 'Mail wordt dossier',
          body: 'Dezelfde verwerking die add-ons bieden, maar op uw eigen server. Uw pakket wordt gevoed via zijn eigen importformaat.',
          image: '/landing/auto-douane-mail.webp',
          alt: 'Een scherm met een volle mailbox naast een geopende factuur en een half ingevuld formulier',
        },
        {
          title: 'Volledigheidstoets',
          body: 'Bij een controlevraag zoeken we wat buiten het pakket ligt: mailwisseling, getekende volmacht, losse vrachtbrief. Klaar om te uploaden.',
          image: '/landing/auto-douane-volledig.webp',
          alt: 'Een stapel geordende documenten met tabbladen op een vergadertafel naast een laptop',
        },
        {
          title: 'Wat verandert bij ons',
          body: 'Release notes en douaneberichten worden een korte Nederlandstalige takenlijst. Met uw eigen dossiernummers en klantnamen erbij.',
          image: '/landing/auto-douane-verandering.webp',
          alt: 'Een vergaderhoek met een gemarkeerd document en een laptop met klantnamen',
        },
      ],
      outcomesH2: 'Wat wij niet gaan beweren',
      outcomes: [
        'Wij gaan niet zeggen dat een mailbox uitlezen naar een aangifte nieuw is. Stream Software verkoopt customAIte als add-on op zijn eigen Customs Streamliner, en Digicust adverteert precies dit in het Nederlands.',
        'Wij gaan niet zeggen dat cloudverwerking juridisch niet mag. Het is een beleidskeuze, en Purview en de EU Data Boundary zijn het tegenargument. Wie iets anders beweert, is het gesprek kwijt.',
        'Wat wij wel beweren: dezelfde verwerking op uw hardware, in het Nederlands, tegen Belgische systemen, plus de motivatie vastgelegd op het moment dat ze ontstaat.',
      ],
      faqs: [
        {
          q: 'Wij draaien al Customs Streamliner met customAIte. Wat blijft er over?',
          a: 'Mogelijk niets, en dat stelt u beter vroeg vast. Het wordt interessant wanneer de klantgegevens die door die add-on gaan net het bezwaar zijn, of wanneer het werk dat u wilt volledig buiten de aangiftestroom valt. Geldt geen van beide, hou dan wat u hebt.',
        },
        {
          q: 'Vervangt dit ons aangiftepakket?',
          a: 'Nee, en wees voorzichtig met wie dat voorstelt. Dit leest uit uw pakket en schrijft erin terug via zijn eigen importformaat. Het systeem van registratie verhuist niet en niemand leert een tweede systeem.',
        },
        {
          q: 'Is AI in de cloud werkelijk een probleem?',
          a: 'Juridisch meestal niet, en we gaan niet doen alsof. Het is een beleidsvraag over waar facturen, waardegegevens en klantcontracten staan. Sommige importeurs liggen daar zwaar aan en andere niet, en het eerlijke antwoord is dat het van uw klanten afhangt.',
        },
        {
          q: 'En de IDMS-migratie?',
          a: 'De berichten bereiken u al via uw leverancier en de administratie. Wat wij doen is er een korte Nederlandstalige takenlijst van maken met uw eigen dossiernummers erbij, zodat een dossierbeheerder ziet welke lopende dossiers hij moet nakijken in plaats van technische release notes te lezen.',
        },
      ],
      featuresTitle: 'Software die bestaat, op infrastructuur die u beheert',
      featuresSubtitle:
        'Het meeste dat een douanekantoor nodig heeft, dekt zijn pakket al. Wat wij bouwen is de laag ertussen en alles wat nooit in het dossier belandde.',
      ctaTitle: 'Breng de controlevraag mee die u een dag kostte',
      ctaBody:
        'Een echt dossier dat misliep zegt meer dan eender welke beschrijving. U krijgt een recht antwoord of een laag erbovenop had geholpen, en waar uw pakket het al afdekt.',
      seoTitle: 'AI voor douaneagenten en declaranten · Nivora',
      seoDescription:
        'AI voor Belgische douanekantoren, draaiend op uw eigen server bovenop het pakket dat u al gebruikt, gebouwd tegen IDMS, AES en NCTS fase 5. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
  { hero: '/landing/auto-douane-kennis.webp', manifesto: '/landing/auto-douane-volledig.webp' },
)
