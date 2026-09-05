import type { LandingContent } from '../types'

/**
 * /ai-automation  ·  /nl/ai-automatisering
 *
 * The head term for the whole solution cluster. Every other automation page
 * (processes, invoicing, quotes, customer service) links up to this one, so it
 * carries the broadest framing and the clearest definition.
 *
 * The `answer` block is deliberately written to be lifted verbatim by an answer
 * engine: it names Nivora, it does not say "we" or "on this page", and it gives
 * a concrete shape of what the work is.
 */
const content: LandingContent = {
  en: {
    hero: {
      eyebrow: 'AI automation',
      h1: 'AI automation that fits the way your company already works',
      subhead:
        'Most companies do not need more software. They need the work between their software to stop being done by hand. That is what Nivora builds.',
      primaryCta: 'Book a call',
    },
    manifesto:
      'Every hour your team spends moving information between systems is an hour we can reclaim. Not by replacing what you use, but by taking the work that sits between it.',
    features: {
      title: 'The tools you need. The systems you want.',
      subtitle:
        'Automation rarely means new software. It usually means the work between your existing tools stops being done by hand, whether that runs on something we already made or something built for you.',
    },
    finalCta: {
      title: 'Start with the process that annoys you most',
      body: 'Bring one recurring task that costs your team real hours. You get a straight answer on whether automating it is worth it, and roughly what it would take. If the answer is no, you will hear that too.',
    },
    blocks: [
      {
        kind: 'answer',
        h2: 'What is AI automation?',
        answer:
          'AI automation is the practice of handing repetitive, judgement-light work to software that can read, write and decide: reading an incoming email, pulling the right data, drafting the reply, updating the system of record. Nivora, a software and AI studio in Brugge, Belgium, designs these systems around a company\'s existing tools rather than replacing them, and can run them on the company\'s own servers so no data leaves the building.',
        detail: [
          'The useful distinction is not "AI" versus "no AI". It is whether a task needs a human judgement call. Approving an unusual discount does. Copying an order confirmation into your ERP does not, and never did.',
          'Classic automation could already move data between systems, as long as the data was tidy and predictable. What changed is that the messy middle is now automatable too: free-text email, scanned invoices, phone calls, a supplier who formats every PDF differently.',
        ],
      },
      {
        kind: 'prose',
        h2: 'Where the hours actually go',
        body: [
          'Ask anyone in an operations or admin role to describe their week and the same shape appears. A handful of genuinely difficult decisions, and around them a thick layer of re-typing, chasing, checking and forwarding.',
          'That layer is invisible on an org chart, so it rarely gets budget. It shows up instead as slow quotes, invoices that go out late, a customer who was not called back, and people who are too busy with administration to do the work they were hired for.',
          'The point of automating it is not headcount. It is that the same team stops losing its best hours to work that never needed a person in the first place.',
        ],
      },
      {
        kind: 'pillars',
        h2: 'Three places automation pays off first',
        intro:
          'Almost every project Nivora starts lands in one of these three. They are the areas where the work is repetitive enough to describe precisely, and expensive enough to be worth the build.',
        items: [
          {
            title: 'Everything around a document',
            body: 'Quotes, orders, invoices, delivery notes, contracts. A system that reads the incoming document, extracts what matters, checks it against what you already know, and files it in the right place, with a person confirming rather than typing.',
          },
          {
            title: 'Everything around a conversation',
            body: 'Inbound email, web forms, phone calls and chat. Sorting by intent, drafting a reply in your own tone, pulling the customer history into view, and escalating the ones that genuinely need a colleague.',
          },
          {
            title: 'Everything around reporting',
            body: 'The numbers someone assembles by hand every week or month. Pulled from the source systems automatically, checked for the things that usually go wrong, and delivered as a short written summary rather than another dashboard nobody opens.',
          },
        ],
      },
      {
        kind: 'compare',
        h2: 'Stitching tools together, or building one system',
        intro:
          'There are two honest ways to automate. They suit different companies and different budgets, and it is worth knowing which one you are buying.',
        left: 'Off-the-shelf tools, connected',
        right: 'A system built around you',
        rows: [
          {
            label: 'Time to something working',
            left: 'Days. You are configuring, not building.',
            right: 'Weeks. The first version is shaped to your process.',
          },
          {
            label: 'Fit to how you work',
            left: 'You adapt your process to the tool.',
            right: 'The system follows the process you already have.',
          },
          {
            label: 'Cost over time',
            left: 'Monthly, per seat, per task, forever. It grows with you.',
            right: 'Mostly up front. Running costs stay flat as volume grows.',
          },
          {
            label: 'Where your data sits',
            left: "On someone else's servers, under their terms.",
            right: 'Your infrastructure or ours, your choice, GDPR-ready.',
          },
          {
            label: 'When something unusual happens',
            left: 'You wait for the vendor roadmap.',
            right: 'It gets changed, because the code is yours.',
          },
        ],
      },
      {
        kind: 'steps',
        h2: 'How Nivora runs an automation project',
        intro:
          'No discovery phase that bills for three months and produces a slide deck. The goal is something running in production that you can judge for yourself.',
        steps: [
          {
            phase: 'One',
            title: 'Sit with the work',
            body: 'A conversation, then a proper look at how the task is done today, including the exceptions people have stopped mentioning because they are used to them. Most of the value of a project is decided here.',
          },
          {
            phase: 'Two',
            title: 'Pick the one that pays',
            body: 'Not everything is worth automating. You get a short, honest ranking of what would save real time, what would only look impressive, and what should be left alone.',
          },
          {
            phase: 'Three',
            title: 'Build it narrow, then widen',
            body: 'One process, running properly, with a person still in the loop where judgement matters. Once it earns trust in daily use, the scope widens.',
          },
          {
            phase: 'Four',
            title: 'Hand it over',
            body: 'Documentation, training for the people who use it, and the code in your possession. Nivora stays available, but the system does not stop working if we do.',
          },
        ],
      },
      {
        kind: 'checklist',
        h2: 'Signs a process is ready to automate',
        intro:
          'If you recognise three or more of these in the same process, it is almost certainly worth an hour of conversation.',
        items: [
          'Someone can describe the steps out loud without checking anything.',
          'It happens at least a few times a week, in roughly the same shape.',
          'The same information gets typed into more than one system.',
          'It is a bottleneck: work waits for this person to get to it.',
          'Mistakes here are expensive, or embarrassing, or both.',
          'People do it after hours because there is no time during the day.',
        ],
      },
    ],
    faq: [
      {
        q: 'How much does AI automation cost?',
        a: 'It depends entirely on the process, so any number quoted before looking at the work is guesswork. What Nivora can tell you early is the shape: a single well-defined process is a small, fixed-scope project, while an operating system that spans departments is a longer engagement. You get an estimate after the first conversation, before committing to anything.',
      },
      {
        q: 'Do we need to replace our current software?',
        a: 'Almost never, and it is usually a bad idea. Nivora builds around the tools you already use, your ERP, your accounting package, your mailbox, because the value is in the work between those systems. Replacing working software is expensive and risky, and it is rarely where the lost hours are.',
      },
      {
        q: 'Is our data safe if we use AI?',
        a: 'It depends on where the model runs, which is exactly why Nivora offers Local AI. In that setup the AI runs on your own servers, so customer data, contracts and internal documents never leave your infrastructure and there is no third party processing them. For companies handling personal or commercially sensitive data, this is usually the deciding factor.',
      },
      {
        q: 'Will this replace people on our team?',
        a: 'That is not what these projects are for, and it is not what happens in practice. The work that automates well is the work nobody wanted: re-typing, chasing, checking. What changes is that the same team handles more volume without the evening admin, and spends its time on the parts that need a person.',
      },
      {
        q: 'How long before something actually works?',
        a: 'For a single, well-scoped process, weeks rather than months. Nivora deliberately starts narrow, with one process running properly in production, because a small system in daily use tells you more than a large plan on paper.',
      },
      {
        q: 'Does Nivora only work with companies in Belgium?',
        a: 'Nivora is based in Brugge and works with companies across Belgium and the Netherlands. Most projects run with a mix of on-site sessions at the start, when understanding the work matters most, and remote delivery after that.',
      },
    ],
    seo: {
      title: 'AI automation for companies · Nivora',
      description:
        'AI automation built around the way your company already works. Nivora designs systems that take over document, email and reporting work, on your own servers if you want. Based in Brugge, working across Belgium and the Netherlands.',
    },
  },

  nl: {
    hero: {
      eyebrow: 'AI-automatisering',
      h1: 'AI-automatisering die past bij hoe uw bedrijf al werkt',
      subhead:
        'De meeste bedrijven hebben geen extra software nodig. Ze hebben nodig dat het werk tússen hun software niet langer met de hand gebeurt. Dat is wat Nivora bouwt.',
      primaryCta: 'Boek een gesprek',
    },
    manifesto:
      'Elk uur dat uw team informatie tussen systemen verplaatst, is een uur dat we kunnen terugwinnen. Niet door te vervangen wat u gebruikt, maar door het werk ertussen over te nemen.',
    features: {
      title: 'De tools die u nodig hebt. De systemen die u wilt.',
      subtitle:
        'Automatiseren betekent zelden nieuwe software. Het betekent meestal dat het werk tussen uw bestaande tools niet langer met de hand gebeurt, of dat nu draait op iets dat we al maakten of op iets dat voor u gebouwd wordt.',
    },
    finalCta: {
      title: 'Begin met het proces waar u het meest van baalt',
      body: 'Breng één terugkerende taak mee die uw team echt uren kost. U krijgt een recht antwoord of automatiseren de moeite waard is, en ongeveer wat het zou vragen. Is het antwoord nee, dan hoort u dat ook.',
    },
    blocks: [
      {
        kind: 'answer',
        h2: 'Wat is AI-automatisering?',
        answer:
          'AI-automatisering betekent dat herhalend werk waar weinig oordeel bij komt kijken wordt overgenomen door software die kan lezen, schrijven en beslissen: een binnenkomende mail lezen, de juiste gegevens ophalen, het antwoord opstellen en het systeem bijwerken. Nivora, een software- en AI-studio in Brugge, ontwerpt zulke systemen rond de tools die een bedrijf al gebruikt in plaats van ze te vervangen, en kan ze op de eigen servers van het bedrijf laten draaien zodat er geen data naar buiten gaat.',
        detail: [
          'Het nuttige onderscheid is niet "AI" tegenover "geen AI". Het is of een taak een menselijke afweging vraagt. Een ongebruikelijke korting goedkeuren, dat vraagt er een. Een orderbevestiging overtypen in uw ERP niet, en dat is nooit zo geweest.',
          'Klassieke automatisering kon al data verplaatsen tussen systemen, zolang die data netjes en voorspelbaar was. Wat er veranderd is: ook het rommelige midden is nu automatiseerbaar. Vrije tekst in mails, ingescande facturen, telefoongesprekken, een leverancier die elke PDF anders opmaakt.',
        ],
      },
      {
        kind: 'prose',
        h2: 'Waar de uren echt naartoe gaan',
        body: [
          'Vraag iemand met een operationele of administratieve functie om zijn week te beschrijven en dezelfde vorm komt telkens terug. Een handvol echt moeilijke beslissingen, en daaromheen een dikke laag overtypen, achternabellen, controleren en doorsturen.',
          'Die laag staat op geen enkel organigram, dus er gaat zelden budget naartoe. Ze wordt wel zichtbaar in trage offertes, facturen die te laat vertrekken, een klant die niet is teruggebeld, en mensen die te druk zijn met administratie om het werk te doen waarvoor ze zijn aangenomen.',
          'Het doel van automatiseren is niet minder personeel. Het is dat hetzelfde team zijn beste uren niet meer verliest aan werk waar nooit een mens voor nodig was.',
        ],
      },
      {
        kind: 'pillars',
        h2: 'Drie plekken waar automatisering het eerst loont',
        intro:
          'Bijna elk project dat Nivora start, komt in een van deze drie terecht. Het zijn de gebieden waar het werk herhalend genoeg is om precies te beschrijven, en duur genoeg om de bouw waard te zijn.',
        items: [
          {
            title: 'Alles rond een document',
            body: 'Offertes, orders, facturen, leveringsbonnen, contracten. Een systeem dat het binnenkomende document leest, eruit haalt wat telt, het toetst aan wat u al weet, en het op de juiste plek zet. Met een mens die bevestigt in plaats van typt.',
          },
          {
            title: 'Alles rond een gesprek',
            body: 'Inkomende mail, webformulieren, telefoon en chat. Sorteren op intentie, een antwoord opstellen in uw eigen toon, de klantgeschiedenis erbij halen, en dat wat écht een collega nodig heeft doorgeven.',
          },
          {
            title: 'Alles rond rapportering',
            body: 'De cijfers die iemand elke week of maand met de hand samenstelt. Automatisch uit de bronsystemen gehaald, gecontroleerd op wat er meestal misgaat, en opgeleverd als een korte geschreven samenvatting in plaats van weer een dashboard dat niemand opent.',
          },
        ],
      },
      {
        kind: 'compare',
        h2: 'Tools aan elkaar knopen, of één systeem bouwen',
        intro:
          'Er zijn twee eerlijke manieren om te automatiseren. Ze passen bij verschillende bedrijven en verschillende budgetten, en het is goed om te weten welke van de twee u koopt.',
        left: 'Kant-en-klare tools, gekoppeld',
        right: 'Een systeem rond u gebouwd',
        rows: [
          {
            label: 'Tijd tot iets werkt',
            left: 'Dagen. U configureert, u bouwt niet.',
            right: 'Weken. De eerste versie volgt uw proces.',
          },
          {
            label: 'Aansluiting op uw manier van werken',
            left: 'U past uw proces aan de tool aan.',
            right: 'Het systeem volgt het proces dat u al hebt.',
          },
          {
            label: 'Kosten op termijn',
            left: 'Maandelijks, per gebruiker, per taak, blijvend. Het groeit mee.',
            right: 'Grotendeels vooraf. De vaste kosten blijven vlak als het volume groeit.',
          },
          {
            label: 'Waar uw data staat',
            left: 'Op andermans servers, onder hun voorwaarden.',
            right: 'Uw infrastructuur of de onze, uw keuze, GDPR-klaar.',
          },
          {
            label: 'Als er iets ongewoons gebeurt',
            left: 'U wacht op de roadmap van de leverancier.',
            right: 'Het wordt aangepast, want de code is van u.',
          },
        ],
      },
      {
        kind: 'steps',
        h2: 'Hoe Nivora een automatiseringsproject aanpakt',
        intro:
          'Geen analysefase die drie maanden factureert en een presentatie oplevert. Het doel is iets dat in productie draait en dat u zelf kunt beoordelen.',
        steps: [
          {
            phase: 'Een',
            title: 'Bij het werk gaan zitten',
            body: 'Een gesprek, en daarna goed kijken hoe de taak vandaag gebeurt. Inclusief de uitzonderingen die mensen niet meer vermelden omdat ze eraan gewend zijn. Hier wordt het grootste deel van de waarde van een project beslist.',
          },
          {
            phase: 'Twee',
            title: 'Kiezen wat écht oplevert',
            body: 'Niet alles is het automatiseren waard. U krijgt een korte, eerlijke rangschikking: wat echt tijd bespaart, wat er vooral indrukwekkend uitziet, en waar u beter van afblijft.',
          },
          {
            phase: 'Drie',
            title: 'Smal bouwen, daarna verbreden',
            body: 'Eén proces, dat goed draait, met een mens in de lus waar het oordeel telt. Zodra het vertrouwen wint in dagelijks gebruik, wordt de scope groter.',
          },
          {
            phase: 'Vier',
            title: 'Overdragen',
            body: 'Documentatie, opleiding voor de mensen die ermee werken, en de code in uw bezit. Nivora blijft beschikbaar, maar het systeem stopt niet met werken als wij dat doen.',
          },
        ],
      },
      {
        kind: 'checklist',
        h2: 'Signalen dat een proces klaar is om te automatiseren',
        intro:
          'Herkent u er drie of meer in hetzelfde proces, dan is het vrijwel zeker een uur gesprek waard.',
        items: [
          'Iemand kan de stappen hardop opnoemen zonder iets op te zoeken.',
          'Het gebeurt minstens een paar keer per week, telkens ongeveer hetzelfde.',
          'Dezelfde informatie wordt in meer dan één systeem ingetypt.',
          'Het is een flessenhals: werk blijft liggen tot deze persoon eraan toekomt.',
          'Fouten zijn hier duur, of gênant, of allebei.',
          'Mensen doen het na de uren, omdat het overdag niet lukt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wat kost AI-automatisering?',
        a: 'Dat hangt volledig af van het proces, dus elk bedrag dat genoemd wordt vóór er naar het werk gekeken is, is giswerk. Wat Nivora u wel vroeg kan zeggen, is de vorm: één afgebakend proces is een klein project met vaste scope, terwijl een systeem dat over afdelingen heen loopt een langer traject is. U krijgt een raming na het eerste gesprek, voor u zich ergens toe verbindt.',
      },
      {
        q: 'Moeten we onze huidige software vervangen?',
        a: 'Bijna nooit, en het is meestal een slecht idee. Nivora bouwt rond de tools die u al gebruikt: uw ERP, uw boekhoudpakket, uw mailbox. De waarde zit namelijk in het werk tússen die systemen. Werkende software vervangen is duur en risicovol, en daar zitten de verloren uren zelden.',
      },
      {
        q: 'Is onze data veilig als we AI gebruiken?',
        a: 'Dat hangt af van waar het model draait, en precies daarom biedt Nivora Local AI aan. In die opstelling draait de AI op uw eigen servers, zodat klantgegevens, contracten en interne documenten uw infrastructuur nooit verlaten en er geen derde partij is die ze verwerkt. Voor bedrijven met persoonsgegevens of commercieel gevoelige data is dat meestal de doorslaggevende factor.',
      },
      {
        q: 'Vervangt dit mensen in ons team?',
        a: 'Daar zijn deze projecten niet voor bedoeld, en zo pakt het in de praktijk ook niet uit. Het werk dat zich goed laat automatiseren is het werk dat niemand wilde: overtypen, achternabellen, controleren. Wat verandert, is dat hetzelfde team meer volume aankan zonder de avondadministratie, en zijn tijd besteedt aan de delen waar een mens voor nodig is.',
      },
      {
        q: 'Hoe lang duurt het voor er echt iets werkt?',
        a: 'Voor één goed afgebakend proces gaat het over weken, niet over maanden. Nivora begint bewust smal, met één proces dat correct in productie draait, omdat een klein systeem in dagelijks gebruik u meer vertelt dan een groot plan op papier.',
      },
      {
        q: 'Werkt Nivora alleen met bedrijven in België?',
        a: 'Nivora zit in Brugge en werkt met bedrijven in heel België en Nederland. De meeste projecten lopen met een mix: sessies ter plaatse aan het begin, wanneer het begrijpen van het werk het zwaarst weegt, en daarna op afstand.',
      },
    ],
    seo: {
      title: 'AI-automatisering voor bedrijven · Nivora',
      description:
        'AI-automatisering gebouwd rond hoe uw bedrijf al werkt. Nivora ontwerpt systemen die document-, mail- en rapporteringswerk overnemen, desgewenst op uw eigen servers. Gevestigd in Brugge, actief in België en Nederland.',
    },
  },
}

export default content
