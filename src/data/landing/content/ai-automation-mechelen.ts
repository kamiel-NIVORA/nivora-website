import { cityPage } from '../cityPage'

/** /ai-automation-mechelen · /nl/ai-automatisering-mechelen */
export default cityPage({
  geo: {
    city: { en: 'Mechelen', nl: 'Mechelen' },
    province: { en: 'Antwerp', nl: 'Antwerpen' },
    distanceKm: 90,
    nearby: ['ai-automation-antwerp', 'ai-automation-leuven', 'ai-automation-aalst'],
  },
  copy: {
    en: {
      h1: 'AI automation in Mechelen, for companies serving two big markets at once',
      subhead:
        'Sitting between Antwerp and Brussels is commercially excellent and administratively expensive. Two customer bases, two languages, and a lot of duplicated coordination.',
      answer:
        'AI automation in Mechelen usually addresses the coordination cost of operating between two metropolitan markets: bilingual correspondence, duplicated order flows, and scheduling that has to work across a wide service area. Nivora, a software and AI studio in Brugge, builds systems that absorb that overhead so a company of forty does not need the back office of a company of eighty.',
      manifesto:
        'Every hour spent doing the same thing twice, once in Dutch and once in French, is the quiet tax on serving two markets. It does not have to be paid by your team.',
      automations: [
        {
          title: 'Bilingual orders',
          body: 'Confirmations are prepared in Dutch and French. Nobody waits for whoever writes French best any more.',
          image: '/landing/auto-mechelen-distributie.webp',
          alt: 'White delivery vans in a depot yard at dawn',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Made to measure',
          body: 'Dimensions and fabric choices are pulled from the request and checked. Anything missing is queried at once.',
          image: '/landing/auto-mechelen-meubel.webp',
          alt: 'An upholstery workshop with fabric rolls and a cutting table',
        },
        {
          title: 'Job preparation',
          body: 'The settings from the last run are ready for a repeat order. Less waste at start-up.',
          image: '/landing/auto-mechelen-drukwerk.webp',
          alt: 'Steel rollers of an offset press, close up',
        },
        {
          title: 'Rescheduling routes',
          body: 'One cancellation recalculates the day with the options alongside. The planner chooses, not the arithmetic.',
          image: '/landing/auto-mechelen-kantoor.webp',
          alt: 'A tidy office with two empty desks facing each other',
        },
      ],
      faqs: [
        {
          q: 'We work in Dutch and French. Is the quality good enough for customers?',
          a: 'For drafting and sorting, yes, and it is one of the more mature uses of this technology. What it should not do is send unreviewed correspondence to a customer in a language nobody on your team can check. The sensible design drafts in both languages and keeps a person approving, which is faster than writing from scratch and safer than full automation.',
        },
        {
          q: 'Would this replace our planner?',
          a: 'It changes what the planner does rather than removing them. Recalculating a route after a cancellation is arithmetic and a system does it better. Deciding which customer can be moved without damaging the relationship is judgement, and that stays with the person who knows the customers. The planners who have worked with these systems generally describe it as getting the tedious half of the job back.',
        },
        {
          q: 'Mechelen is ninety kilometres from Brugge. How does that work?',
          a: 'The same way it works for most projects outside West Flanders: a concentrated set of on-site sessions early, when understanding the operation is what matters, then remote delivery. The distance affects the logistics of the first two weeks and very little after that.',
        },
        {
          q: 'Our systems are a patchwork built up over years. Does that block this?',
          a:
            'Rarely, and it is the situation in most companies of this size. What matters is not how elegant the landscape is but whether each system can be read from and written to in some dependable way, which is usually true even for older software. Consolidating the patchwork first is a much larger project and almost never the right order.',
        },
      ],
      seoTitle: 'AI automation in Mechelen · Nivora',
      seoDescription:
        'AI automation for companies in Mechelen serving both Antwerp and Brussels: bilingual correspondence, scheduling across a wide radius and order intake. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Mechelen, voor bedrijven die twee grote markten tegelijk bedienen',
      subhead:
        'Tussen Antwerpen en Brussel liggen is commercieel uitstekend en administratief duur. Twee klantengroepen, twee talen, en veel dubbele coördinatie.',
      answer:
        'AI-automatisering in Mechelen pakt meestal de coördinatiekost aan van werken tussen twee grootstedelijke markten: tweetalige correspondentie, dubbele orderstromen, en planning die over een ruime actieradius moet kloppen. Nivora, een software- en AI-studio in Brugge, bouwt systemen die die overhead opvangen, zodat een bedrijf van veertig niet de backoffice van een bedrijf van tachtig nodig heeft.',
      manifesto:
        'Elk uur dat opgaat aan hetzelfde twee keer doen, een keer in het Nederlands en een keer in het Frans, is de stille belasting op twee markten bedienen. Uw team hoeft die niet te betalen.',
      automations: [
        {
          title: 'Tweetalige orders',
          body: 'Bevestigingen worden in het Nederlands en het Frans klaargezet. Niemand wacht nog op wie het vlotst Frans schrijft.',
          image: '/landing/auto-mechelen-distributie.webp',
          alt: 'Witte bestelwagens in een depot bij dageraad',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Maatwerkorders',
          body: 'Afmetingen en stofkeuzes worden uit de aanvraag gehaald en gecontroleerd. Wat ontbreekt wordt meteen opgevraagd.',
          image: '/landing/auto-mechelen-meubel.webp',
          alt: 'Een stofferingsatelier met rollen stof en een snijtafel',
        },
        {
          title: 'Werkvoorbereiding',
          body: 'De instellingen van de vorige oplage staan klaar bij een herhaalorder. Minder afval bij het opstarten.',
          image: '/landing/auto-mechelen-drukwerk.webp',
          alt: 'Stalen rollen van een offsetpers, van dichtbij',
        },
        {
          title: 'Ritten herplannen',
          body: 'Eén annulatie herrekent de hele dag met de opties ernaast. De planner kiest, het rekenwerk niet.',
          image: '/landing/auto-mechelen-kantoor.webp',
          alt: 'Een net kantoor met twee lege bureaus tegenover elkaar',
        },
      ],
      faqs: [
        {
          q: 'We werken in het Nederlands en het Frans. Is de kwaliteit goed genoeg voor klanten?',
          a: 'Voor opstellen en sorteren wel, en het is een van de rijpere toepassingen van deze technologie. Wat ze niet mag doen, is ongecontroleerde correspondentie versturen in een taal die niemand bij u kan nakijken. Het verstandige ontwerp stelt op in beide talen en houdt een mens die goedkeurt, wat sneller is dan van nul schrijven en veiliger dan volledige automatisering.',
        },
        {
          q: 'Vervangt dit onze planner?',
          a: 'Het verandert wat de planner doet in plaats van hem weg te nemen. Een route herberekenen na een annulatie is rekenwerk en een systeem doet dat beter. Beslissen welke klant verzet kan worden zonder de relatie te schaden is oordeel, en dat blijft bij wie de klanten kent. Planners die met zulke systemen gewerkt hebben, omschrijven het meestal als de saaie helft van de job terugkrijgen.',
        },
        {
          q: 'Mechelen ligt op negentig kilometer van Brugge. Hoe werkt dat?',
          a: 'Op dezelfde manier als bij de meeste projecten buiten West-Vlaanderen: een geconcentreerde reeks sessies ter plaatse aan het begin, wanneer de werking begrijpen het zwaarst weegt, en daarna op afstand. De afstand beïnvloedt de logistiek van de eerste twee weken en daarna bijzonder weinig.',
        },
        {
          q: 'Onze systemen zijn een lappendeken die over de jaren gegroeid is. Blokkeert dat dit?',
          a:
            'Zelden, en het is de situatie in de meeste bedrijven van deze omvang. Wat telt is niet hoe elegant het landschap is, maar of er uit elk systeem op een betrouwbare manier gelezen en naartoe geschreven kan worden, en dat gaat meestal ook op voor oudere software. Die lappendeken eerst samenvoegen is een veel groter project en bijna nooit de juiste volgorde.',
        },
      ],
      seoTitle: 'AI-automatisering in Mechelen · Nivora',
      seoDescription:
        'AI-automatisering voor Mechelse bedrijven die Antwerpen en Brussel bedienen: tweetalige correspondentie, planning over een ruime straal en orderopname. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
