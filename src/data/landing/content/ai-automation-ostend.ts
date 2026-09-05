import { cityPage } from '../cityPage'

/** /ai-automation-ostend · /nl/ai-automatisering-oostende */
export default cityPage({
  geo: {
    city: { en: 'Ostend', nl: 'Oostende' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 25,
    nearby: ['ai-automation-bruges', 'ai-automation-kortrijk', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Ostend, for businesses that live with the season',
      subhead:
        'Half the companies here do most of their year in four months. The admin does not scale down in winter, and it certainly does not scale up in July.',
      answer:
        'AI automation in Ostend is usually about absorbing seasonal swing: handling four months of concentrated bookings, invoices and enquiries with the same small team that runs the quiet half of the year. Nivora, a software and AI studio in Brugge, twenty-five kilometres away, builds systems that take the repeatable volume so the peak stops being survived and starts being planned.',
      manifesto:
        'Every hour of July spent on admin is an hour taken from a season that only lasts four months. Software does not mind that it is August, and it does not get tired at seven.',
      automations: [
        {
          title: 'Summer peak',
          body: 'Bookings and invoices are handled in July at the same pace as in January, without overtime.',
          image: '/landing/auto-oostende-kust.webp',
          alt: 'A wide empty North Sea beach at low tide',
        },
        {
          title: 'Certificates',
          body: 'Expiry dates for crew and equipment are tracked continuously. You are warned before anything lapses.',
          image: '/landing/auto-oostende-offshore.webp',
          alt: 'An offshore wind turbine blade on a quayside',
        },
        {
          title: 'Catch and delivery',
          body: 'Landing, weighing and sale are linked together. The chain adds up without anyone re-typing.',
          image: '/landing/auto-oostende-haven.webp',
          alt: 'Fishing boats in Ostend harbour in morning light',
        },
        {
          title: 'Guest history',
          body: 'What you know about a returning guest is on screen at arrival, including for whoever is new.',
          image: '/landing/auto-oostende-hotel.webp',
          alt: 'A seafront hotel terrace out of season',
        },
      ],
      faqs: [
        {
          q: 'Our busy season is four months. Is it worth building something for that?',
          a: 'Usually yes, and the seasonality is the argument rather than the objection. A team sized for the quiet months has no slack in the busy ones, so the peak gets absorbed through overtime and mistakes. A system that handles the repeatable volume costs the same in December as in July, which is exactly why it fits a business that cannot hire and fire against its own calendar.',
        },
        {
          q: 'We use seasonal staff who change every year. Does that matter?',
          a: 'It is one of the stronger arguments for writing the process down as a system. When a third of the team is new each spring, the knowledge of how things are done has to live somewhere other than in people. A system that handles the routine correctly also shortens how long a seasonal hire needs before they are useful.',
        },
        {
          q: 'Can this keep our certification documents audit-ready?',
          a: 'That is one of the clearer wins for marine and offshore operators. Expiry dates, crew qualifications and maintenance records get tracked continuously, with warnings before something lapses rather than a scramble when an inspection is announced. The documentation being in order is a condition of operating, so treating it as a background process rather than an event is the right shape.',
        },
      ],
      seoTitle: 'AI automation in Ostend · Nivora',
      seoDescription:
        'AI automation for Ostend businesses: absorbing seasonal peaks in bookings and invoicing, and keeping marine and offshore documentation current. By Nivora, a software and AI studio in Brugge, 25 km away.',
    },
    nl: {
      h1: 'AI-automatisering in Oostende, voor bedrijven die met het seizoen leven',
      subhead:
        'De helft van de bedrijven hier draait het grootste deel van het jaar in vier maanden. De administratie krimpt niet mee in de winter, en groeit zeker niet mee in juli.',
      answer:
        'AI-automatisering in Oostende gaat meestal over het opvangen van seizoenspieken: vier maanden geconcentreerde boekingen, facturen en vragen verwerken met hetzelfde kleine team dat ook de stille helft van het jaar draait. Nivora, een software- en AI-studio in Brugge op vijfentwintig kilometer, bouwt systemen die het herhaalbare volume overnemen, zodat de piek niet langer overleefd maar gepland wordt.',
      manifesto:
        'Elk uur in juli dat naar administratie gaat, is een uur weg van een seizoen dat maar vier maanden duurt. Software heeft er geen last van dat het augustus is, en wordt om zeven uur niet moe.',
      automations: [
        {
          title: 'Zomerpiek',
          body: 'Boekingen en facturen worden in juli aan hetzelfde tempo verwerkt als in januari. Zonder overuren.',
          image: '/landing/auto-oostende-kust.webp',
          alt: 'Een breed leeg Noordzeestrand bij laag tij',
        },
        {
          title: 'Certificaten',
          body: 'Vervaldata van bemanning en materieel worden doorlopend opgevolgd. U wordt verwittigd voor iets vervalt.',
          image: '/landing/auto-oostende-offshore.webp',
          alt: 'Een offshore windturbineblad op een kaai',
        },
        {
          title: 'Vangst en levering',
          body: 'Aanvoer, weging en verkoop worden aan elkaar gekoppeld. De keten klopt zonder dat iemand overtypt.',
          image: '/landing/auto-oostende-haven.webp',
          alt: 'Vissersboten in de haven van Oostende bij ochtendlicht',
        },
        {
          title: 'Gastgeschiedenis',
          body: 'Wat u van een terugkerende gast weet, staat op het scherm bij aankomst. Ook voor wie er nieuw werkt.',
          image: '/landing/auto-oostende-hotel.webp',
          alt: 'Een hotelterras aan zee buiten het seizoen',
        },
      ],
      faqs: [
        {
          q: 'Ons drukke seizoen duurt vier maanden. Is het de moeite om daar iets voor te bouwen?',
          a: 'Meestal wel, en die seizoenswerking is net het argument in plaats van het bezwaar. Een team op maat van de stille maanden heeft geen marge in de drukke, dus wordt de piek opgevangen met overuren en fouten. Een systeem dat het herhaalbare volume verwerkt, kost in december evenveel als in juli, en dat is precies waarom het past bij een bedrijf dat niet kan aanwerven en afdanken op het ritme van zijn eigen kalender.',
        },
        {
          q: 'We werken met seizoenspersoneel dat elk jaar wisselt. Maakt dat uit?',
          a: 'Dat is een van de sterkere argumenten om het proces vast te leggen in een systeem. Wanneer een derde van het team elke lente nieuw is, moet de kennis over hoe dingen gebeuren ergens anders leven dan in mensen. Een systeem dat de routine correct afhandelt, verkort ook de tijd die een seizoenskracht nodig heeft voor die inzetbaar is.',
        },
        {
          q: 'Kan dit onze certificatiedocumenten auditklaar houden?',
          a: 'Dat is een van de duidelijkste winsten voor mariene en offshore uitbaters. Vervaldata, bemanningskwalificaties en onderhoudsdossiers worden doorlopend opgevolgd, met verwittigingen vóór iets vervalt in plaats van paniek wanneer een inspectie wordt aangekondigd. Papierwerk in orde hebben is een voorwaarde om te mogen werken, dus het als achtergrondproces behandelen in plaats van als gebeurtenis is de juiste vorm.',
        },
      ],
      seoTitle: 'AI-automatisering in Oostende · Nivora',
      seoDescription:
        'AI-automatisering voor Oostendse bedrijven: seizoenspieken in boekingen en facturatie opvangen, en mariene en offshore documentatie actueel houden. Door Nivora, software- en AI-studio in Brugge, op 25 km.',
    },
  },
})
