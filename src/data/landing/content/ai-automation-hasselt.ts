import { cityPage } from '../cityPage'

/** /ai-automation-hasselt · /nl/ai-automatisering-hasselt */
export default cityPage({
  geo: {
    city: { en: 'Hasselt', nl: 'Hasselt' },
    province: { en: 'Limburg', nl: 'Limburg' },
    distanceKm: 150,
    nearby: ['ai-automation-genk', 'ai-automation-leuven', 'ai-automation-turnhout'],
  },
  copy: {
    en: {
      h1: 'AI automation in Hasselt, where the customer is the whole business',
      subhead:
        'Retail, care and services dominate here, and all three share a constraint: the quality of the work is judged on how a person was treated, not on what was produced.',
      answer:
        'AI automation in Hasselt mostly serves customer-facing organisations: retail chains, care providers and professional services whose administrative load sits in appointments, files and follow-up rather than in production. Nivora, a software and AI studio in Brugge, builds systems that clear that layer so the people who are good with customers spend their time on customers.',
      manifesto:
        'Every hour spent rescheduling and re-typing is an hour not spent with the person in front of you. In a business judged on how people are treated, that is the only hour that counts.',
      automations: [
        {
          title: 'Appointments',
          body: 'Rescheduling happens automatically, including the knock-on effects. You only decide what may move.',
          image: '/landing/auto-hasselt-zorg.webp',
          alt: 'An empty waiting room with simple chairs',
        },
        {
          title: 'Branches aligned',
          body: 'Every location runs the same admin instead of its own version. Figures finally compare.',
          image: '/landing/auto-hasselt-retail.webp',
          alt: 'A shop interior before opening',
        },
        {
          title: 'Route planning',
          body: 'A cancellation is recalculated immediately with the options alongside. The planner decides, not the arithmetic.',
          image: '/landing/auto-hasselt-logistiek.webp',
          alt: 'A regional depot with trailers at dawn',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Client files',
          body: 'Files are completed from what the client already sent. Intake becomes checking instead of typing.',
          image: '/landing/auto-hasselt-kantoor.webp',
          alt: 'An accountancy office with archive boxes on shelving',
        },
      ],
      faqs: [
        {
          q: 'We handle patient and client data. Is AI even allowed?',
          a: 'It is, with the right architecture, and the architecture is the whole conversation. For health and client data the practical answer is usually Local AI: the model runs on your own infrastructure so nothing is sent to a third party for processing. That keeps you inside GDPR without relying on a processing agreement with a provider you cannot audit.',
        },
        {
          q: 'We have several locations that each work slightly differently. Problem?',
          a: 'It is worth knowing before you build, not after. Sometimes the variation is real and the system has to accommodate it; more often it is historical and the exercise of writing the process down is what finally settles which way is correct. Either outcome is useful, but discovering it during the build is cheaper than discovering it during rollout.',
        },
        {
          q: 'Hasselt is a long way from Brugge. Does that work in practice?',
          a: 'It is about 150 kilometres, so the on-site sessions get planned rather than improvised: a small number of longer visits at the start instead of frequent short ones. The work that genuinely needs to happen in the room is concentrated in the first phase, and the rest runs remotely without loss.',
        },
        {
          q: 'Where should a practice or clinic start?',
          a:
            'With scheduling, almost always. It is the loudest problem, the easiest to describe precisely, and the one where a result is visible within days rather than quarters. Client intake is the usual second step, because by then the team has seen what a working system looks like and can say what they actually want from the next one.',
        },
      ],
      seoTitle: 'AI automation in Hasselt · Nivora',
      seoDescription:
        'AI automation for customer-facing organisations in Hasselt and Limburg: scheduling, client intake and follow-up, GDPR-ready on your own servers. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Hasselt, waar de klant het hele bedrijf is',
      subhead:
        'Retail, zorg en dienstverlening domineren hier, en die drie delen één beperking: de kwaliteit van het werk wordt beoordeeld op hoe iemand behandeld is, niet op wat er geproduceerd werd.',
      answer:
        'AI-automatisering in Hasselt bedient vooral klantgerichte organisaties: retailketens, zorgverstrekkers en dienstverleners waarvan de administratieve last in afspraken, dossiers en opvolging zit in plaats van in productie. Nivora, een software- en AI-studio in Brugge, bouwt systemen die die laag wegnemen, zodat de mensen die goed zijn met klanten hun tijd aan klanten besteden.',
      manifesto:
        'Elk uur dat opgaat aan afspraken verzetten en gegevens overtypen, is een uur dat niet naar de persoon voor u gaat. In een zaak die beoordeeld wordt op hoe mensen behandeld worden, is dat het enige uur dat telt.',
      automations: [
        {
          title: 'Afspraken',
          body: 'Verzetten en herplannen gebeurt automatisch, ook als één wijziging doorwerkt. U beslist alleen nog wat mag schuiven.',
          image: '/landing/auto-hasselt-zorg.webp',
          alt: 'Een lege wachtruimte met eenvoudige stoelen',
        },
        {
          title: 'Filialen gelijk',
          body: 'Elke vestiging werkt met dezelfde administratie in plaats van een eigen versie. Cijfers zijn eindelijk vergelijkbaar.',
          image: '/landing/auto-hasselt-retail.webp',
          alt: 'Een winkelinterieur voor openingstijd',
        },
        {
          title: 'Ritplanning',
          body: 'Een annulatie wordt meteen herberekend met de opties ernaast. De planner beslist, het rekenwerk niet.',
          image: '/landing/auto-hasselt-logistiek.webp',
          alt: 'Een regionaal depot met opleggers bij dageraad',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Klantdossiers',
          body: 'Dossiers worden aangevuld uit wat de klant al doorstuurde. Intake is nazicht in plaats van overtypen.',
          image: '/landing/auto-hasselt-kantoor.webp',
          alt: 'Een boekhoudkantoor met archiefdozen op open rekken',
        },
      ],
      faqs: [
        {
          q: 'Wij werken met patiënten- en klantgegevens. Mag AI dan wel?',
          a: 'Ja, met de juiste architectuur, en die architectuur ís het hele gesprek. Voor gezondheids- en klantgegevens is het praktische antwoord meestal Local AI: het model draait op uw eigen infrastructuur, zodat er niets naar een derde partij gaat om verwerkt te worden. Zo blijft u binnen de GDPR zonder te moeten steunen op een verwerkersovereenkomst met een leverancier die u niet kunt controleren.',
        },
        {
          q: 'Onze vestigingen werken elk net iets anders. Is dat een probleem?',
          a: 'Het is nuttig om dat te weten vóór u bouwt, niet erna. Soms is het verschil echt en moet het systeem het opvangen; vaker is het historisch gegroeid en is het opschrijven van het proces precies wat eindelijk uitmaakt welke werkwijze de juiste is. Beide uitkomsten zijn bruikbaar, maar het ontdekken tijdens de bouw is goedkoper dan tijdens de uitrol.',
        },
        {
          q: 'Hasselt ligt ver van Brugge. Werkt dat in de praktijk?',
          a: 'Het is ongeveer 150 kilometer, dus de sessies ter plaatse worden gepland in plaats van geïmproviseerd: een beperkt aantal langere bezoeken aan het begin in plaats van vaak even langsgaan. Het werk dat echt in dezelfde ruimte moet gebeuren, zit geconcentreerd in de eerste fase, en de rest loopt zonder verlies op afstand.',
        },
        {
          q: 'Waar begint een praktijk of kliniek het best?',
          a:
            'Bij de planning, bijna altijd. Dat is het probleem dat het luidst roept, het makkelijkst precies te beschrijven valt, en waar een resultaat binnen dagen zichtbaar is in plaats van binnen kwartalen. Klantintake is doorgaans de tweede stap, want tegen dan heeft het team gezien hoe een werkend systeem eruitziet en kan het zeggen wat het van het volgende echt verwacht.',
        },
      ],
      seoTitle: 'AI-automatisering in Hasselt · Nivora',
      seoDescription:
        'AI-automatisering voor klantgerichte organisaties in Hasselt en Limburg: planning, klantintake en opvolging, GDPR-klaar op uw eigen servers. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
