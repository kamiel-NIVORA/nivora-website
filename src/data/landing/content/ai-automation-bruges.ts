import { cityPage } from '../cityPage'

/** /ai-automation-bruges · /nl/ai-automatisering-brugge
 *  Home base. The only page that can honestly say "we are here". */
export default cityPage({
  geo: {
    city: { en: 'Bruges', nl: 'Brugge' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 0,
    nearby: ['ai-automation-ostend', 'ai-automation-kortrijk', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Bruges, from a studio that is actually here',
      subhead:
        'Nivora is based in Bruges. Not a sales office with a local phone number, an actual studio where the work gets built, twenty minutes from most of the companies it works with.',
      answer:
        'Nivora is a software and AI studio in Bruges that builds AI automation for companies in West Flanders: systems that take over document handling, inbound email and reporting, shaped around the tools a company already runs. Because the studio sits in Bruges itself, the early sessions where the real understanding happens take place on site rather than over video.',
      manifesto:
        'Every hour your team spends re-typing what a supplier already sent is an hour that belongs to the work your reputation was built on. We take the typing, you keep the judgement.',
      automations: [
        {
          title: 'Site invoices',
          body: 'Subcontractor invoices are read and matched to the right site. Only what does not add up reaches you.',
          image: '/landing/auto-brugge-bouw.webp',
          alt: 'Timber and reinforcement bars on a small Flemish building site',
        },
        {
          title: 'Multilingual bookings',
          body: 'Enquiries are answered within minutes in the language they arrived in, with availability already checked.',
          image: '/landing/auto-brugge-horeca.webp',
          alt: 'An empty hotel breakfast room in a Bruges townhouse at dawn',
        },
        {
          title: 'Transport paperwork',
          body: 'Waybills and customs papers are read and checked against the shipment. Errors surface before the load leaves.',
          image: '/landing/auto-brugge-zeebrugge.webp',
          alt: 'Port cranes at Zeebrugge seen across the water',
          href: '/ai-automation-imo-office',
        },
        {
          title: 'Weekly figures',
          body: 'The figures you now assemble on a Sunday evening are ready on Monday morning, with the exceptions on top.',
          image: '/landing/auto-brugge-kantoor.webp',
          alt: 'A desk in a small family business office with a filing cabinet',
        },
      ],
      faqs: [
        {
          q: 'Is Nivora really based in Bruges?',
          a: 'Yes. The studio is at Julius en Maurits Sabbestraat 15, 8000 Brugge, and that is where the work is built. It is worth asking, because plenty of agencies list a city page for every town in Flanders while operating from one office hundreds of kilometres away. For Bruges companies it means the first sessions can happen at your premises without anyone counting travel hours.',
        },
        {
          q: 'We are a traditional business. Is this not a bit much for us?',
          a: 'Traditional usually means the process is stable, well understood and consistently followed, which is close to ideal. The businesses that struggle with automation are the ones where every job is improvised. If your team has been doing something the same careful way for fifteen years, that is a specification waiting to be written down.',
        },
        {
          q: 'Our busy season is the summer. When should we start?',
          a: 'Autumn or winter, almost always. Building during the quiet months means the people who know the process have time to explain it properly, and the system has run in daily use for a few months before the season tests it. Starting in June means building something under pressure and trusting it immediately, which is the wrong order.',
        },
      ],
      seoTitle: 'AI automation in Bruges · Nivora',
      seoDescription:
        'Nivora is a software and AI studio in Bruges building AI automation for West Flanders companies: document handling, inbound email and reporting, on your own servers if you want.',
    },
    nl: {
      h1: 'AI-automatisering in Brugge, van een studio die er echt zit',
      subhead:
        'Nivora zit in Brugge. Geen verkoopkantoor met een lokaal telefoonnummer, maar een echte studio waar het werk gebouwd wordt, op twintig minuten van de meeste bedrijven waarmee we werken.',
      answer:
        'Nivora is een software- en AI-studio in Brugge die AI-automatisering bouwt voor bedrijven in West-Vlaanderen: systemen die documentverwerking, inkomende mail en rapportering overnemen, gevormd rond de tools die een bedrijf al draait. Omdat de studio zelf in Brugge zit, gebeuren de eerste sessies waar het echte begrip ontstaat ter plaatse in plaats van via video.',
      manifesto:
        'Elk uur dat uw team besteedt aan overtypen wat een leverancier al doorstuurde, is een uur dat hoort bij het werk waarop uw naam gebouwd is. Wij nemen het typwerk, u houdt het oordeel.',
      automations: [
        {
          title: 'Werffacturen',
          body: 'Facturen van onderaannemers worden gelezen en aan de juiste werf gekoppeld. Alleen wat niet klopt komt bij u terecht.',
          image: '/landing/auto-brugge-bouw.webp',
          alt: 'De houten balken en betonijzer op een kleine Vlaamse werf',
        },
        {
          title: 'Meertalige boekingen',
          body: 'Aanvragen worden binnen enkele minuten beantwoord in de taal van de gast. De beschikbaarheid is al nagekeken.',
          image: '/landing/auto-brugge-horeca.webp',
          alt: 'Een lege ontbijtzaal in een Brugs herenhuis bij dageraad',
        },
        {
          title: 'Transportpapieren',
          body: 'Vrachtbrieven en douanestukken worden gelezen en met de zending vergeleken. Fouten komen boven voor de vracht vertrekt.',
          image: '/landing/auto-brugge-zeebrugge.webp',
          alt: 'Havenkranen in Zeebrugge, gezien over het water',
          href: '/ai-automation-imo-office',
        },
        {
          title: 'Weekcijfers',
          body: 'De cijfers die u nu op zondagavond samenstelt, staan maandagochtend klaar. Met de afwijkingen er bovenaan.',
          image: '/landing/auto-brugge-kantoor.webp',
          alt: 'Een bureau in een klein familiebedrijf, met archiefkast',
        },
      ],
      faqs: [
        {
          q: 'Zit Nivora echt in Brugge?',
          a: 'Ja. De studio staat in de Julius en Maurits Sabbestraat 15, 8000 Brugge, en daar wordt het werk ook gebouwd. Het is een terechte vraag, want heel wat bureaus zetten een stadspagina online voor elke gemeente in Vlaanderen terwijl ze vanuit één kantoor op honderden kilometers werken. Voor Brugse bedrijven betekent het dat de eerste sessies bij u kunnen doorgaan zonder dat iemand reisuren zit te tellen.',
        },
        {
          q: 'Wij zijn een klassiek bedrijf. Is dit niet wat veel voor ons?',
          a: 'Klassiek betekent meestal dat het proces stabiel is, goed begrepen en consequent gevolgd, en dat komt dicht bij ideaal. De bedrijven die het moeilijk hebben met automatisering zijn net die waar elke opdracht geïmproviseerd wordt. Doet uw team iets al vijftien jaar op dezelfde zorgvuldige manier, dan is dat een specificatie die alleen nog opgeschreven moet worden.',
        },
        {
          q: 'Ons drukke seizoen is de zomer. Wanneer beginnen we het best?',
          a: 'Bijna altijd in het najaar of de winter. Bouwen tijdens de stille maanden betekent dat de mensen die het proces kennen de tijd hebben om het goed uit te leggen, en dat het systeem al enkele maanden in dagelijks gebruik draait voor het seizoen het test. In juni starten betekent bouwen onder druk en meteen moeten vertrouwen, en dat is de verkeerde volgorde.',
        },
      ],
      seoTitle: 'AI-automatisering in Brugge · Nivora',
      seoDescription:
        'Nivora is een software- en AI-studio in Brugge die AI-automatisering bouwt voor West-Vlaamse bedrijven: documentverwerking, inkomende mail en rapportering, desgewenst op uw eigen servers.',
    },
  },
})
