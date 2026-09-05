import { cityPage } from '../cityPage'

/** /ai-automation-genk · /nl/ai-automatisering-genk */
export default cityPage({
  geo: {
    city: { en: 'Genk', nl: 'Genk' },
    province: { en: 'Limburg', nl: 'Limburg' },
    distanceKm: 155,
    nearby: ['ai-automation-hasselt', 'ai-automation-turnhout', 'ai-automation-leuven'],
  },
  copy: {
    en: {
      h1: 'AI automation in Genk, in a city that has rebuilt itself before',
      subhead:
        'Genk knows what industrial change costs, having lived through it twice. That tends to produce companies with a healthy scepticism about technology that promises everything.',
      answer:
        'AI automation in Genk mostly serves manufacturing and logistics operations built during the region’s reconversion: shift handovers, maintenance records, quality documentation and the coordination between production and the office. Nivora, a software and AI studio in Brugge, builds systems narrow enough to prove themselves in daily use before anyone is asked to trust them with more.',
      manifesto:
        'Every hour spent re-entering what the floor already knows is an hour lost between production and the office. Close that gap and both sides get their day back.',
      automations: [
        {
          title: 'Shift handover',
          body: 'What the late shift notices is where the early shift starts, with the pattern across weeks visible.',
          image: '/landing/auto-genk-industrie.webp',
          alt: 'A large empty industrial hall with steel trusses',
        },
        {
          title: 'Inbound freight',
          body: 'Arrivals and documents are matched in advance. A driver no longer waits at the gate.',
          image: '/landing/auto-genk-logistiek.webp',
          alt: 'A large distribution centre with dock doors',
          href: '/ai-automation-warehousing',
        },
        {
          title: 'Maintenance log',
          body: 'Work is recorded as it happens, with minimal typing. The history no longer has gaps.',
          image: '/landing/auto-genk-onderhoud.webp',
          alt: 'A tool wall with spanners and hoses',
        },
        {
          title: 'Production figures',
          body: 'The floor delivers figures to the office without anyone re-entering them, same day instead of next week.',
          image: '/landing/auto-genk-ploeg.webp',
          alt: 'An empty factory canteen with chairs on tables',
        },
      ],
      faqs: [
        {
          q: 'We have been burned by a big technology project before. Why is this different?',
          a: 'Mostly because of size and sequence. Large programmes fail because they commit everyone to a design made before anyone understood the details. Starting with one process, in production, within weeks, means the commitment is small and the evidence arrives early. If the first thing does not earn its place, you have lost weeks rather than a year.',
        },
        {
          q: 'Our production runs 24/7. Can this be introduced without disruption?',
          a: 'It has to be, and it shapes the design. Systems for continuous operations get introduced alongside the existing way of working rather than replacing it on a given date, so the old method stays available while the new one proves itself. That costs a little extra effort and removes the entire category of risk that keeps plant managers awake.',
        },
        {
          q: 'Genk is a long way from Brugge. Is that practical?',
          a: 'It is roughly 155 kilometres, so visits are planned and concentrated rather than casual. In an industrial project that matters less than it sounds: the essential on-site work is watching the process on the floor, which happens in a small number of focused days at the start.',
        },
        {
          q: 'Do our operators need to learn new software?',
          a:
            'As little as possible, and preferably none. In a plant the realistic test is whether something still gets used during a bad shift, and anything that adds screens to an operator\'s job fails that test. The design goal is that the floor notices the result rather than the system, with the interface work concentrated where people already sit at a desk.',
        },
      ],
      seoTitle: 'AI automation in Genk · Nivora',
      seoDescription:
        'AI automation for manufacturing and logistics operations in Genk and Limburg: shift handovers, maintenance records and floor-to-office reporting. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Genk, in een stad die zichzelf al eens heropbouwde',
      subhead:
        'Genk weet wat industriële verandering kost, want het maakte ze twee keer mee. Dat levert bedrijven op met een gezonde scepsis tegenover technologie die alles belooft.',
      answer:
        'AI-automatisering in Genk bedient vooral productie- en logistieke werkingen die tijdens de reconversie van de regio zijn ontstaan: ploegoverdrachten, onderhoudsregisters, kwaliteitsdocumentatie en de afstemming tussen de vloer en het kantoor. Nivora, een software- en AI-studio in Brugge, bouwt systemen die smal genoeg zijn om zich in dagelijks gebruik te bewijzen voor iemand gevraagd wordt er meer aan toe te vertrouwen.',
      manifesto:
        'Elk uur dat opgaat aan opnieuw invoeren wat de vloer al weet, is een uur dat verloren gaat tussen productie en kantoor. Dicht dat gat en beide kanten krijgen hun dag terug.',
      automations: [
        {
          title: 'Ploegoverdracht',
          body: 'Wat de late ploeg opmerkt, staat waar de vroege ploeg begint. Met het patroon over weken zichtbaar.',
          image: '/landing/auto-genk-industrie.webp',
          alt: 'Een grote lege industriehal met stalen spanten',
        },
        {
          title: 'Inkomende vracht',
          body: 'Aankomsten en documenten worden vooraf gekoppeld. Een chauffeur staat niet meer te wachten aan de poort.',
          image: '/landing/auto-genk-logistiek.webp',
          alt: 'Een groot distributiecentrum met laaddeuren',
          href: '/ai-automation-warehousing',
        },
        {
          title: 'Onderhoudslogboek',
          body: 'Ingrepen worden vastgelegd terwijl ze gebeuren, met een minimum aan typwerk. De historiek heeft geen gaten meer.',
          image: '/landing/auto-genk-onderhoud.webp',
          alt: 'Een gereedschapswand met sleutels en slangen',
        },
        {
          title: 'Productiecijfers',
          body: 'De vloer levert cijfers aan kantoor zonder dat iemand ze opnieuw invoert. Dezelfde dag in plaats van de volgende week.',
          image: '/landing/auto-genk-ploeg.webp',
          alt: 'Een lege fabriekskantine met stoelen op tafels',
        },
      ],
      faqs: [
        {
          q: 'We hebben ons al eens verbrand aan een groot technologieproject. Waarom zou dit anders zijn?',
          a: 'Vooral door omvang en volgorde. Grote programma’s lopen stuk omdat ze iedereen vastleggen op een ontwerp dat gemaakt is voor iemand de details begreep. Beginnen met één proces, in productie, binnen enkele weken, betekent dat de verbintenis klein is en het bewijs vroeg komt. Verdient dat eerste stuk zijn plaats niet, dan bent u weken kwijt in plaats van een jaar.',
        },
        {
          q: 'Onze productie draait 24/7. Kan dit ingevoerd worden zonder verstoring?',
          a: 'Dat moet, en het bepaalt het ontwerp. Systemen voor continue werkingen worden naast de bestaande manier ingevoerd in plaats van die op een bepaalde datum te vervangen, zodat de oude methode beschikbaar blijft terwijl de nieuwe zich bewijst. Dat kost wat extra moeite en haalt precies de risicocategorie weg die productieverantwoordelijken wakker houdt.',
        },
        {
          q: 'Genk ligt ver van Brugge. Is dat praktisch?',
          a: 'Het is ongeveer 155 kilometer, dus bezoeken worden gepland en geconcentreerd in plaats van terloops. In een industrieel project weegt dat minder dan het klinkt: het essentiële werk ter plaatse is het proces op de vloer bekijken, en dat gebeurt in een beperkt aantal gerichte dagen aan het begin.',
        },
        {
          q: 'Moeten onze operatoren nieuwe software leren?',
          a:
            'Zo weinig mogelijk, en het liefst geen. In een productieomgeving is de realistische test of iets nog gebruikt wordt tijdens een slechte ploeg, en alles wat schermen toevoegt aan de job van een operator zakt voor die test. Het ontwerpdoel is dat de vloer het resultaat merkt en niet het systeem, met het schermwerk geconcentreerd waar mensen sowieso aan een bureau zitten.',
        },
      ],
      seoTitle: 'AI-automatisering in Genk · Nivora',
      seoDescription:
        'AI-automatisering voor productie- en logistieke bedrijven in Genk en Limburg: ploegoverdrachten, onderhoudsregisters en rapportering van vloer naar kantoor. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
