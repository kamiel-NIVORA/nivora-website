import { cityPage } from '../cityPage'

/** /ai-automation-aalst · /nl/ai-automatisering-aalst */
export default cityPage({
  geo: {
    city: { en: 'Aalst', nl: 'Aalst' },
    province: { en: 'East Flanders', nl: 'Oost-Vlaanderen' },
    distanceKm: 75,
    nearby: ['ai-automation-ghent', 'ai-automation-antwerp', 'ai-automation-bruges'],
  },
  copy: {
    en: {
      h1: 'AI automation for Aalst companies, without replacing what already works',
      subhead:
        'Aalst sits between Ghent and Brussels, which shapes the businesses here: national reach, regional overheads, and a lot of coordination work nobody budgeted for.',
      answer:
        'AI automation in Aalst usually means taking over the coordination layer rather than the production floor: order confirmations, supplier documents, transport paperwork and the reporting that ties them together. Nivora, a software and AI studio in Brugge, builds these systems around the ERP and accounting packages an Aalst company already runs, and can host them on the company\'s own servers.',
      manifesto:
        'Every hour spent checking whether three systems agree about the same order is an hour nobody planned for and everybody pays for. That comparison is exactly what software should be doing.',
      automations: [
        {
          title: 'Order and delivery',
          body: 'Order, delivery note and invoice are compared daily. A difference becomes a notification instead of a credit note.',
          image: '/landing/auto-aalst-distributie.webp',
          alt: 'A wide warehouse aisle with wrapped pallets',
        },
        {
          title: 'Supplier sheets',
          body: 'Specifications and certificates are read and checked on arrival. An expiring certificate announces itself weeks ahead.',
          image: '/landing/auto-aalst-voeding.webp',
          alt: 'Stainless steel conveyors in a food production hall',
        },
        {
          title: 'Carrier portals',
          body: 'Statuses from every portal land in one overview. Nobody logs into five systems each morning any more.',
          image: '/landing/auto-aalst-transport.webp',
          alt: 'Loading dock doors along a long concrete facade at dawn',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Customer questions',
          body: 'Delivery and stock questions are answered with the file attached. Only exceptions go to a colleague.',
          image: '/landing/auto-aalst-kantoor.webp',
          alt: 'A logistics office with a wall planner and paperwork trays',
        },
      ],
      faqs: [
        {
          q: 'Does Nivora work with companies in Aalst?',
          a: 'Yes. Aalst is about seventy-five kilometres from the studio in Brugge, an easy drive along the E40, so the on-site sessions at the start of a project are straightforward. Those early visits matter more than the distance: understanding how an order actually moves through your office is not something that survives a video call.',
        },
        {
          q: 'Our ERP is old and heavily customised. Is that a problem?',
          a: 'It is the normal situation rather than the exception, and it is usually workable. The question is not how modern the system is but whether the data can be read out and written back in some reliable way, which is almost always true even for older packages. Building around a stable, well-understood ERP is considerably safer than replacing it.',
        },
        {
          q: 'Each of our carriers has a different portal. Can that be handled?',
          a: 'That fragmentation is precisely the work worth automating. Multiple portals with different formats and different login flows is exactly the kind of task that consumes a person\'s week while requiring almost no judgement from them. Consolidating those into one view your team actually reads is often the first thing built.',
        },
      ],
      seoTitle: 'AI automation in Aalst · Nivora',
      seoDescription:
        'AI automation for companies in Aalst and East Flanders: order reconciliation, supplier documents and reporting, built around your existing ERP by Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering voor Aalsterse bedrijven, zonder te vervangen wat al werkt',
      subhead:
        'Aalst ligt tussen Gent en Brussel, en dat tekent de bedrijven hier: nationaal bereik, regionale overhead, en een hoop coördinatiewerk waar nooit budget voor was.',
      answer:
        'AI-automatisering in Aalst betekent meestal dat de coördinatielaag wordt overgenomen, niet de productievloer: orderbevestigingen, leveranciersdocumenten, transportpapieren en de rapportering die dat aan elkaar knoopt. Nivora, een software- en AI-studio in Brugge, bouwt zulke systemen rond het ERP- en boekhoudpakket dat een Aalsters bedrijf al draait, en kan ze op de eigen servers van dat bedrijf zetten.',
      manifesto:
        'Elk uur dat opgaat aan nakijken of drie systemen het eens zijn over hetzelfde order, is een uur waar niemand op rekende en dat iedereen betaalt. Net die vergelijking hoort software te doen.',
      automations: [
        {
          title: 'Order en levering',
          body: 'Order, leveringsbon en factuur worden dagelijks vergeleken. Een verschil wordt een melding in plaats van een creditnota.',
          image: '/landing/auto-aalst-distributie.webp',
          alt: 'Een brede magazijngang met gewikkelde pallets',
        },
        {
          title: 'Leveranciersfiches',
          body: 'Specificaties en certificaten worden bij binnenkomst gelezen en getoetst. Een vervallend certificaat meldt zich weken vooraf.',
          image: '/landing/auto-aalst-voeding.webp',
          alt: 'Roestvrijstalen transportbanden in een voedingshal',
        },
        {
          title: 'Vervoerdersportalen',
          body: 'Statussen uit alle portalen komen samen in één overzicht. Niemand logt nog ’s ochtends vijf keer in.',
          image: '/landing/auto-aalst-transport.webp',
          alt: 'Laaddeuren langs een lange betonnen gevel bij dageraad',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Klantvragen',
          body: 'Vragen over levering en voorraad worden beantwoord met het dossier erbij. Alleen uitzonderingen gaan naar een collega.',
          image: '/landing/auto-aalst-kantoor.webp',
          alt: 'Een logistiek kantoor met wandplanning en bakjes',
        },
      ],
      faqs: [
        {
          q: 'Werkt Nivora met bedrijven in Aalst?',
          a: 'Ja. Aalst ligt op ongeveer vijfenzeventig kilometer van de studio in Brugge, een vlotte rit over de E40, dus de sessies ter plaatse bij de start van een project zijn goed te doen. Die eerste bezoeken wegen zwaarder dan de afstand: begrijpen hoe een order werkelijk door uw kantoor beweegt, overleeft geen videogesprek.',
        },
        {
          q: 'Ons ERP is oud en zwaar aangepast. Is dat een probleem?',
          a: 'Dat is eerder de normale situatie dan de uitzondering, en meestal werkbaar. De vraag is niet hoe modern het systeem is, maar of de gegevens er op een betrouwbare manier uit en weer in kunnen, en dat gaat vrijwel altijd op, ook voor oudere pakketten. Bouwen rond een stabiel, goed begrepen ERP is aanzienlijk veiliger dan het vervangen.',
        },
        {
          q: 'Elke vervoerder heeft een ander portaal. Kan daar iets mee?',
          a: 'Die versnippering is net het werk dat het automatiseren waard is. Meerdere portalen met elk een eigen formaat en een eigen aanmeldprocedure is precies het soort taak dat iemands week opslokt terwijl er nauwelijks oordeel bij komt kijken. Die samenbrengen in één overzicht dat uw team ook echt leest, is vaak het eerste wat gebouwd wordt.',
        },
      ],
      seoTitle: 'AI-automatisering in Aalst · Nivora',
      seoDescription:
        'AI-automatisering voor bedrijven in Aalst en Oost-Vlaanderen: orderafstemming, leveranciersdocumenten en rapportering, gebouwd rond uw bestaande ERP door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
