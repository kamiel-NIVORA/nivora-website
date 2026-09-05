import { cityPage } from '../cityPage'

/** /ai-automation-ghent · /nl/ai-automatisering-gent */
export default cityPage({
  geo: {
    city: { en: 'Ghent', nl: 'Gent' },
    province: { en: 'East Flanders', nl: 'Oost-Vlaanderen' },
    distanceKm: 50,
    nearby: ['ai-automation-bruges', 'ai-automation-aalst', 'ai-automation-antwerp'],
  },
  copy: {
    en: {
      h1: 'AI automation in Ghent, for companies past the pilot stage',
      subhead:
        'Ghent has no shortage of AI enthusiasm. What it has less of are systems that survived contact with a real workflow and are still running a year later.',
      answer:
        'AI automation in Ghent tends to start further along than elsewhere: many companies here have already run a pilot, and the question is why it never made it into daily use. Nivora, a software and AI studio in Brugge, builds automation that goes into production rather than into a demo, wrapped around the systems a company already depends on, and hosted locally when the data cannot leave the building.',
      manifesto:
        'Every hour a good engineer spends assembling a report is an hour not spent on the thing you hired them for. A system that runs in production gives that hour back, every week.',
      automations: [
        {
          title: 'Lab reports',
          body: 'Measurement reports are read and filed against the right study. The audit trail stays complete without re-typing.',
          image: '/landing/auto-gent-labo.webp',
          alt: 'A laboratory bench with glassware in clear north light',
        },
        {
          title: 'Bulk documents',
          body: 'Weight notes, analysis certificates and freight papers are cross-checked. Differences are flagged while they can still be fixed.',
          image: '/landing/auto-gent-haven.webp',
          alt: 'Silos and a bulk terminal along the canal',
        },
        {
          title: 'Project reporting',
          body: 'Grant reports are assembled from the tools where the work is already logged. Your researcher checks instead of writes.',
          image: '/landing/auto-gent-kantoor.webp',
          alt: 'An open plan office with plywood desks in a converted warehouse',
        },
        {
          title: 'Order intake',
          body: 'Orders arrive in every format and are read automatically. Anything missing is queried straight away.',
          image: '/landing/auto-gent-drukwerk.webp',
          alt: 'Rolls of paper stacked in a quiet production hall',
        },
      ],
      faqs: [
        {
          q: 'We already tried an AI pilot and it went nowhere. Why would this be different?',
          a: 'Because the failure was probably not technical. Pilots stall when nobody owns the exceptions, when there is no clear point where a human checks a decision, and when the thing lives on one person\'s laptop. Nivora builds narrow and puts it into production early, with documentation and the code in your possession, precisely so it keeps running after the enthusiasm phase ends.',
        },
        {
          q: 'We have developers in-house. What would you actually add?',
          a: 'Often the answer is that you do not need us, and that is worth establishing in the first conversation rather than the third month. Where it does make sense is when the internal team is fully committed to the product and this work would sit permanently at the bottom of their backlog, or when the specific problem is document and language handling they have not built before.',
        },
        {
          q: 'Our data is subject to regulatory audit. Does that rule AI out?',
          a: 'No, but it rules out some architectures. If an auditor has to be able to reconstruct how a conclusion was reached, the system has to record its inputs and its reasoning, and a human confirmation step has to be genuine rather than a checkbox. That is a design constraint, and running the model locally so the data never leaves your infrastructure usually follows from it.',
        },
      ],
      seoTitle: 'AI automation in Ghent · Nivora',
      seoDescription:
        'AI automation for Ghent companies that got past the pilot stage: document parsing, technical triage and project reporting, built to run in production. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Gent, voor bedrijven die de pilootfase voorbij zijn',
      subhead:
        'Aan AI-enthousiasme is in Gent geen gebrek. Wat er minder is: systemen die het contact met een echte workflow overleefd hebben en een jaar later nog draaien.',
      answer:
        'AI-automatisering in Gent begint doorgaans verder dan elders: veel bedrijven hier hebben al een piloot gedraaid, en de vraag is waarom die het dagelijks gebruik nooit haalde. Nivora, een software- en AI-studio in Brugge, bouwt automatisering die in productie gaat in plaats van in een demo, rond de systemen waar een bedrijf al van afhangt, en lokaal gehost wanneer de data het gebouw niet uit mag.',
      manifesto:
        'Elk uur dat een goede ingenieur besteedt aan een rapport samenstellen, is een uur dat niet naar het werk gaat waarvoor u hem aannam. Een systeem dat in productie draait, geeft dat uur elke week terug.',
      automations: [
        {
          title: 'Labrapporten',
          body: 'Meetrapporten worden uitgelezen en aan de juiste studie gekoppeld. Het audittraject blijft compleet zonder overtypen.',
          image: '/landing/auto-gent-labo.webp',
          alt: 'Een labotafel met glaswerk in helder noorderlicht',
        },
        {
          title: 'Bulkdocumenten',
          body: 'Weegbrieven, analysecertificaten en vrachtpapieren worden samengelegd. Verschillen worden gemeld terwijl ze nog op te lossen zijn.',
          image: '/landing/auto-gent-haven.webp',
          alt: 'Silo’s en een bulkterminal langs het kanaal',
        },
        {
          title: 'Projectrapportering',
          body: 'Subsidierapporten worden opgebouwd uit de tools waar het werk al in staat. Uw onderzoeker kijkt na in plaats van te schrijven.',
          image: '/landing/auto-gent-kantoor.webp',
          alt: 'Een open kantoor met plywood bureaus in een oud pakhuis',
        },
        {
          title: 'Orderopname',
          body: 'Orders komen binnen in elk formaat en worden automatisch ingelezen. Wat ontbreekt wordt meteen opgevraagd.',
          image: '/landing/auto-gent-drukwerk.webp',
          alt: 'Papierrollen gestapeld in een rustige productiehal',
        },
      ],
      faqs: [
        {
          q: 'We hebben al een AI-piloot geprobeerd en die liep dood. Waarom zou dit anders zijn?',
          a: 'Omdat het waarschijnlijk niet op techniek stukliep. Piloten stranden wanneer niemand eigenaar is van de uitzonderingen, wanneer er geen duidelijk punt is waar een mens een beslissing nakijkt, en wanneer het geheel op de laptop van één persoon leeft. Nivora bouwt smal en zet het vroeg in productie, met documentatie en de code in uw bezit, precies zodat het blijft draaien nadat de enthousiasmefase voorbij is.',
        },
        {
          q: 'We hebben eigen ontwikkelaars. Wat zou u daar nog aan toevoegen?',
          a: 'Vaak is het antwoord dat u ons niet nodig hebt, en dat stelt u beter vast in het eerste gesprek dan in de derde maand. Waar het wél zinvol is: wanneer het interne team volledig op het product zit en dit werk permanent onderaan hun backlog zou blijven liggen, of wanneer het specifiek gaat om document- en taalverwerking die ze nog niet eerder gebouwd hebben.',
        },
        {
          q: 'Onze data valt onder regulatoire audit. Sluit dat AI uit?',
          a: 'Nee, maar het sluit bepaalde architecturen uit. Moet een auditor kunnen reconstrueren hoe een conclusie tot stand kwam, dan moet het systeem zijn invoer en zijn redenering vastleggen, en moet een menselijke bevestiging echt zijn in plaats van een vinkje. Dat is een ontwerpvoorwaarde, en het model lokaal draaien zodat de data uw infrastructuur nooit verlaat, volgt daar meestal uit.',
        },
      ],
      seoTitle: 'AI-automatisering in Gent · Nivora',
      seoDescription:
        'AI-automatisering voor Gentse bedrijven die de pilootfase voorbij zijn: documentverwerking, technische triage en projectrapportering, gebouwd om in productie te draaien. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
