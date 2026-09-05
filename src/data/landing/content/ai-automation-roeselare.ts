import { cityPage } from '../cityPage'

/** /ai-automation-roeselare · /nl/ai-automatisering-roeselare */
export default cityPage({
  geo: {
    city: { en: 'Roeselare', nl: 'Roeselare' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 40,
    nearby: ['ai-automation-kortrijk', 'ai-automation-waregem', 'ai-automation-bruges'],
  },
  copy: {
    en: {
      h1: 'AI automation in Roeselare, built around food industry paperwork',
      subhead:
        'Agrifood runs on traceability. Every batch has a paper trail, every trail has to survive an inspection, and almost none of it is interesting work for the people who maintain it.',
      answer:
        'AI automation in Roeselare is dominated by food and agribusiness requirements: batch traceability, supplier specifications, quality records and the certification paperwork that comes with selling into retail. Nivora, a software and AI studio in Brugge, forty kilometres away, builds systems that keep those records complete and current as a background process rather than as a scramble before an audit.',
      manifesto:
        'Every hour your quality manager spends chasing a supplier document is an hour not spent on quality. The chasing is a task for a system. The judgement is not.',
      automations: [
        {
          title: 'Traceability',
          body: 'Batch data is built up continuously instead of gathered afterwards. A recall question takes minutes.',
          image: '/landing/auto-roeselare-voeding.webp',
          alt: 'Stainless steel processing equipment in a production hall',
        },
        {
          title: 'Temperature logs',
          body: 'Cold chain readings are linked to the right shipment. Deviations announce themselves at once.',
          image: '/landing/auto-roeselare-koeling.webp',
          alt: 'The insulated door of a cold store with frost on the steel',
        },
        {
          title: 'Delivery notes',
          body: 'Notes from growers and suppliers are read and matched to the order. No more pile on the desk.',
          image: '/landing/auto-roeselare-agro.webp',
          alt: 'A grain silo and loading auger on a Flemish farm',
        },
        {
          title: 'Retailer forms',
          body: 'Each chain’s questionnaire is filled from data you already hold. Your quality team only checks.',
          image: '/landing/auto-roeselare-verpakking.webp',
          alt: 'A packaging line with stacked cartons',
        },
      ],
      faqs: [
        {
          q: 'Can a system like this satisfy our certification scheme?',
          a: 'It supports the evidence, it does not replace the scheme. What auditors want is a complete, consistent and reconstructable trail, and a system that records inputs and keeps records current produces exactly that. What it must not do is generate records that were not observed, which is why the design keeps a person confirming anything that constitutes a quality claim.',
        },
        {
          q: 'Our suppliers send documents in every format imaginable. Is that workable?',
          a: 'That variety is the reason this is worth automating rather than an obstacle to it. Reading a specification sheet whether it arrives as a PDF, a scan or the body of an email is precisely what this technology is good at, and it is exactly the task that makes the work miserable for a person.',
        },
        {
          q: 'We already have an ERP with a traceability module. Do we need more?',
          a: 'Possibly not, and it is worth checking before spending anything. ERP traceability modules are usually good at recording what is entered and poor at getting things entered in the first place. If your gap is data capture from incoming documents rather than storage, that is where the work belongs, alongside your ERP rather than instead of it.',
        },
        {
          q: 'Do we need to change how the production floor works?',
          a:
            'Usually not at all, and that is worth stating early because it is the first fear in a food plant. The work sits in the office and at goods-in: reading documents, checking them, keeping records complete. Line speeds, recipes and handling stay exactly as they are, which is also why these projects rarely need a production stop.',
        },
      ],
      seoTitle: 'AI automation in Roeselare · Nivora',
      seoDescription:
        'AI automation for food and agribusiness companies in Roeselare: supplier specifications, batch traceability and certification paperwork kept audit-ready. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Roeselare, gebouwd rond papierwerk uit de voedingsindustrie',
      subhead:
        'Agrofood draait op traceerbaarheid. Elke batch heeft een papieren spoor, elk spoor moet een inspectie doorstaan, en vrijwel niets ervan is boeiend werk voor wie het bijhoudt.',
      answer:
        'AI-automatisering in Roeselare wordt gedomineerd door eisen uit voeding en agribusiness: batchtraceerbaarheid, leverancierspecificaties, kwaliteitsregisters en het certificeringspapierwerk dat hoort bij verkopen aan retail. Nivora, een software- en AI-studio in Brugge op veertig kilometer, bouwt systemen die die registers volledig en actueel houden als achtergrondproces in plaats van als paniek vóór een audit.',
      manifesto:
        'Elk uur dat uw kwaliteitsverantwoordelijke besteedt aan een leveranciersdocument achternalopen, is een uur dat niet naar kwaliteit gaat. Het achternalopen is werk voor een systeem. Het oordeel niet.',
      automations: [
        {
          title: 'Traceerbaarheid',
          body: 'Batchgegevens worden doorlopend opgebouwd in plaats van achteraf verzameld. Een terugroepvraag is minuten werk.',
          image: '/landing/auto-roeselare-voeding.webp',
          alt: 'Roestvrijstalen verwerkingsapparatuur in een productiehal',
        },
        {
          title: 'Temperatuurlogs',
          body: 'Meetgegevens uit de koelketen worden gekoppeld aan de juiste zending. Afwijkingen melden zich meteen.',
          image: '/landing/auto-roeselare-koeling.webp',
          alt: 'De geïsoleerde deur van een koelcel met vorst op het staal',
        },
        {
          title: 'Leveringsbonnen',
          body: 'Bonnen van telers en leveranciers worden gelezen en aan de order gekoppeld. Geen stapel meer op het bureau.',
          image: '/landing/auto-roeselare-agro.webp',
          alt: 'Een graansilo en laadschroef op een Vlaamse boerderij',
        },
        {
          title: 'Retailvragenlijsten',
          body: 'De vragenlijst van elke keten wordt gevuld uit gegevens die u al hebt. Uw kwaliteitsdienst kijkt alleen na.',
          image: '/landing/auto-roeselare-verpakking.webp',
          alt: 'Een verpakkingslijn met gestapelde kartonnen',
        },
      ],
      faqs: [
        {
          q: 'Kan zo’n systeem voldoen aan ons certificeringsschema?',
          a: 'Het ondersteunt het bewijsmateriaal, het vervangt het schema niet. Wat auditors willen is een volledig, consistent en reconstrueerbaar spoor, en een systeem dat invoer registreert en registers actueel houdt levert precies dat. Wat het niet mag doen, is registraties genereren die niet waargenomen zijn, en daarom houdt het ontwerp een mens die bevestigt bij alles wat een kwaliteitsclaim inhoudt.',
        },
        {
          q: 'Onze leveranciers sturen documenten in elk denkbaar formaat. Is dat werkbaar?',
          a: 'Die verscheidenheid is net de reden om dit te automatiseren, geen obstakel ervoor. Een specificatieblad lezen of het nu als PDF, als scan of in de tekst van een mail binnenkomt, is precies waar deze technologie goed in is, en precies de taak die het werk voor een mens vervelend maakt.',
        },
        {
          q: 'We hebben al een ERP met een traceerbaarheidsmodule. Is er meer nodig?',
          a: 'Misschien niet, en dat is het nakijken waard voor u iets uitgeeft. Traceerbaarheidsmodules in een ERP zijn meestal goed in vastleggen wat ingevoerd wordt en zwak in ervoor zorgen dat er iets ingevoerd wordt. Zit uw probleem bij het capteren van gegevens uit binnenkomende documenten in plaats van bij de opslag, dan hoort het werk daar thuis, naast uw ERP en niet in de plaats ervan.',
        },
        {
          q: 'Moeten we iets veranderen aan de werkvloer?',
          a:
            'Meestal helemaal niets, en dat is het waard om vroeg te zeggen, want het is de eerste vrees in een voedingsbedrijf. Het werk zit op kantoor en bij goederenontvangst: documenten lezen, controleren, registers volledig houden. Lijnsnelheden, recepturen en handling blijven exact zoals ze zijn, en daarom vragen zulke projecten zelden een productiestop.',
        },
      ],
      seoTitle: 'AI-automatisering in Roeselare · Nivora',
      seoDescription:
        'AI-automatisering voor voedings- en agrobedrijven in Roeselare: leverancierspecificaties, batchtraceerbaarheid en certificeringspapierwerk auditklaar gehouden. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
