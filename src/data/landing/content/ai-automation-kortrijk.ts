import { cityPage } from '../cityPage'

/** /ai-automation-kortrijk · /nl/ai-automatisering-kortrijk */
export default cityPage({
  geo: {
    city: { en: 'Kortrijk', nl: 'Kortrijk' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 50,
    nearby: ['ai-automation-bruges', 'ai-automation-ostend', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Kortrijk, for makers who sell what they build',
      subhead:
        'Kortrijk has one of the highest densities of manufacturing SMEs in Flanders. Most of them make something specific, sell it internationally, and run the whole back office from one corridor.',
      answer:
        'AI automation in Kortrijk usually targets the office attached to a workshop: the quoting, order intake and production paperwork that a small team handles alongside actually making the product. Nivora, a software and AI studio in Brugge, builds these systems around the ERP and drawing tools a manufacturer already uses, so the work moves without anyone changing how the shop floor operates.',
      manifesto:
        'Every hour your estimator spends collecting specifications is an hour they are not pricing work. The number still comes from them. The gathering can come from somewhere else.',
      automations: [
        {
          title: 'Custom quotes',
          body: 'Drawings are read and comparable past jobs surfaced. Your estimator starts from a filled-in sheet.',
          image: '/landing/auto-kortrijk-machine.webp',
          alt: 'A lathe and machined parts in a bright workshop',
        },
        {
          title: 'Samples and specs',
          body: 'Customer specifications are matched to the right quality and machine. Anything unclear is flagged.',
          image: '/landing/auto-kortrijk-textiel.webp',
          alt: 'Rolls of technical textile in a storeroom',
        },
        {
          title: 'Job preparation',
          body: 'The previous run of the same job is ready when preparation starts. Nothing begins from scratch.',
          image: '/landing/auto-kortrijk-meubel.webp',
          alt: 'A joinery workshop with clamped panels',
        },
        {
          title: 'Export paperwork',
          body: 'Documents for France and beyond are prepared consistently, no longer depending on who knows that market.',
          image: '/landing/auto-kortrijk-export.webp',
          alt: 'Wrapped export pallets by a roller door',
          href: '/ai-automation-imo-office',
        },
      ],
      faqs: [
        {
          q: 'We are a small team. Is this not overkill for twenty people?',
          a: 'Often the opposite. In a company of twenty there is no department to absorb the admin, so it lands on the two or three people who can least afford it. The projects that pay back fastest tend to be exactly this size, because the process is small enough to describe precisely in an afternoon and painful enough that everyone already knows which one to pick.',
        },
        {
          q: 'Every job we do is custom. Can something that varied be automated?',
          a: 'Custom output does not mean a custom process. The products differ, but the sequence used to price them is usually remarkably consistent: read the requirement, find the nearest previous job, adjust for material and complexity. That sequence is what gets automated, not the answer it produces.',
        },
        {
          q: 'We sell into France. Does the system handle French correspondence?',
          a: 'Yes, and near the border it is one of the more useful parts. Enquiries, order confirmations and technical questions in French get sorted and drafted the same way as Dutch ones, which removes the delay where correspondence waits for whoever in the office is most comfortable replying in French.',
        },
      ],
      seoTitle: 'AI automation in Kortrijk · Nivora',
      seoDescription:
        'AI automation for manufacturing SMEs in Kortrijk and South West Flanders: quoting, order intake and production paperwork, built around your existing ERP. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Kortrijk, voor makers die verkopen wat ze bouwen',
      subhead:
        'Kortrijk heeft een van de hoogste concentraties productie-kmo\'s van Vlaanderen. De meeste maken iets specifieks, verkopen het internationaal, en draaien de volledige backoffice vanuit één gang.',
      answer:
        'AI-automatisering in Kortrijk richt zich meestal op het kantoor dat aan een atelier vasthangt: het offreren, de orderopname en de productiepapieren die een klein team erbij doet naast het effectief maken van het product. Nivora, een software- en AI-studio in Brugge, bouwt zulke systemen rond het ERP en de tekentools die een maakbedrijf al gebruikt, zodat het werk vooruitgaat zonder dat er iets verandert op de werkvloer.',
      manifesto:
        'Elk uur dat uw calculator besteedt aan specificaties verzamelen, is een uur dat hij niet aan het prijzen is. Het cijfer komt nog altijd van hem. Het verzamelwerk mag ergens anders vandaan komen.',
      automations: [
        {
          title: 'Offertes op maat',
          body: 'Tekeningen worden uitgelezen en vergelijkbare opdrachten erbij gezocht. Uw calculator begint met een ingevuld blad.',
          image: '/landing/auto-kortrijk-machine.webp',
          alt: 'Een draaibank en bewerkte stukken in een licht atelier',
        },
        {
          title: 'Stalen en specs',
          body: 'Klantspecificaties worden gekoppeld aan de juiste kwaliteit en machine. Wat onduidelijk is wordt gemarkeerd.',
          image: '/landing/auto-kortrijk-textiel.webp',
          alt: 'Rollen technisch textiel in een magazijn',
        },
        {
          title: 'Werkvoorbereiding',
          body: 'De vorige reeks van dezelfde opdracht staat klaar bij het voorbereiden. Niets begint nog van nul.',
          image: '/landing/auto-kortrijk-meubel.webp',
          alt: 'Een schrijnwerkerij met geklemde panelen',
        },
        {
          title: 'Exportpapieren',
          body: 'Documenten voor Frankrijk en verder worden consequent klaargemaakt. Niet meer afhankelijk van wie die markt kent.',
          image: '/landing/auto-kortrijk-export.webp',
          alt: 'Omwikkelde exportpallets bij een roldeur',
          href: '/ai-automation-imo-office',
        },
      ],
      faqs: [
        {
          q: 'We zijn een klein team. Is dit geen overkill voor twintig man?',
          a: 'Vaak net het omgekeerde. In een bedrijf van twintig is er geen afdeling die de administratie opvangt, dus komt ze terecht bij de twee of drie mensen die ze het minst kunnen missen. De projecten die het snelst terugverdienen zijn net van deze omvang, omdat het proces klein genoeg is om op één namiddag precies te beschrijven en vervelend genoeg dat iedereen al weet welk proces het moet worden.',
        },
        {
          q: 'Elke opdracht bij ons is maatwerk. Kan iets zo wisselend geautomatiseerd worden?',
          a: 'Maatwerk in het resultaat betekent niet maatwerk in het proces. De producten verschillen, maar de volgorde waarmee ze geprijsd worden is meestal opvallend constant: de vraag lezen, de dichtstbijzijnde vorige opdracht zoeken, bijstellen voor materiaal en complexiteit. Die volgorde wordt geautomatiseerd, niet het antwoord dat eruit komt.',
        },
        {
          q: 'We verkopen naar Frankrijk. Kan het systeem Franse correspondentie aan?',
          a: 'Ja, en vlak bij de grens is dat een van de nuttigste onderdelen. Aanvragen, orderbevestigingen en technische vragen in het Frans worden op dezelfde manier gesorteerd en voorbereid als Nederlandse, wat de vertraging wegneemt waarbij correspondentie blijft liggen tot wie op kantoor het vlotst in het Frans antwoordt tijd heeft.',
        },
      ],
      seoTitle: 'AI-automatisering in Kortrijk · Nivora',
      seoDescription:
        'AI-automatisering voor productie-kmo\'s in Kortrijk en Zuid-West-Vlaanderen: offreren, orderopname en productiepapieren, gebouwd rond uw bestaande ERP. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
