import { cityPage } from '../cityPage'

/** /ai-automation-knokke-heist · /nl/ai-automatisering-knokke-heist */
export default cityPage({
  geo: {
    city: { en: 'Knokke-Heist', nl: 'Knokke-Heist' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 18,
    nearby: ['ai-automation-bruges', 'ai-automation-ostend', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Knokke-Heist, where service standards leave no margin',
      subhead:
        'A demanding clientele forgives very little. Slow replies, a detail forgotten between visits, an invoice that arrives wrong: each one costs more here than the work behind it was worth.',
      answer:
        'AI automation in Knokke-Heist mainly serves high-end hospitality, property and personal services, where the administrative failure modes are reputational rather than financial. Nivora, a software and AI studio in Brugge, eighteen kilometres away, builds systems that make the routine reliable, so attention stays on the part of the service that people are actually paying for.',
      manifesto:
        'Every hour spent on administration is an hour not spent on the guest, and the guest is the entire product. What can be handled quietly should be handled quietly.',
      automations: [
        {
          title: 'Guest history',
          body: 'Regular guests’ preferences are on screen at arrival, including for someone new.',
          image: '/landing/auto-knokke-hotel.webp',
          alt: 'A quiet hotel lobby with a marble counter',
        },
        {
          title: 'Owner reports',
          body: 'The periodic statement for owners assembles itself. You check and send.',
          image: '/landing/auto-knokke-vastgoed.webp',
          alt: 'Seafront apartment balconies out of season',
        },
        {
          title: 'Rental admin',
          body: 'Inventories, keys and cleaning are tracked without a wall planner. Nothing falls between two lets.',
          image: '/landing/auto-knokke-verhuur.webp',
          alt: 'An empty holiday apartment with covers on the furniture',
        },
        {
          title: 'Evening enquiries',
          body: 'A nine in the evening enquiry gets an answer within minutes, in the right language.',
          image: '/landing/auto-knokke-retail.webp',
          alt: 'A small luxury boutique before opening',
        },
      ],
      faqs: [
        {
          q: 'Our service is personal. Does automation not work against that?',
          a: 'It does if it replaces the contact. It works for you if it removes the reasons contact goes wrong. Nobody feels well served because a human typed their booking confirmation; they feel well served because the person in front of them knew their preference. Automating the first makes the second more likely, not less.',
        },
        {
          q: 'We hold data on private clients. How is that protected?',
          a: 'For a clientele of this kind, running the model locally is usually the only sensible option, and it is what we would propose. Client names, preferences, addresses and stays stay inside your own infrastructure and are never sent to a third party. In a market this small, discretion is part of the product rather than a compliance formality.',
        },
        {
          q: 'We are close to Brugge. Does that change anything practically?',
          a: 'Yes, more than the eighteen kilometres suggest. Being nearby means we can be present during a normal working week rather than in scheduled blocks, which matters in hospitality where the thing worth understanding only becomes visible during service.',
        },
        {
          q: 'Our season is short and intense. When would we build this?',
          a:
            'Outside the season, without exception. Between October and March the people who know how the service actually runs have time to explain it, and the system gets several quiet months in real use before it is tested by a full house. Building this in June would mean introducing something unproven at the exact moment nothing may go wrong.',
        },
      ],
      seoTitle: 'AI automation in Knokke-Heist · Nivora',
      seoDescription:
        'AI automation for hospitality, property and premium services in Knokke-Heist: guest history, multilingual enquiries and rental administration. By Nivora, a software and AI studio in Brugge, 18 km away.',
    },
    nl: {
      h1: 'AI-automatisering in Knokke-Heist, waar de servicelat geen marge laat',
      subhead:
        'Een veeleisend cliënteel vergeeft weinig. Traag antwoorden, een detail vergeten tussen twee bezoeken, een factuur die verkeerd binnenkomt: elk daarvan kost hier meer dan het werk erachter waard was.',
      answer:
        'AI-automatisering in Knokke-Heist bedient vooral hoogwaardige horeca, vastgoed en persoonlijke dienstverlening, waar administratieve fouten eerder reputatie kosten dan geld. Nivora, een software- en AI-studio in Brugge op achttien kilometer, bouwt systemen die de routine betrouwbaar maken, zodat de aandacht gaat naar het deel van de service waar mensen werkelijk voor betalen.',
      manifesto:
        'Elk uur dat naar administratie gaat, is een uur dat niet naar de gast gaat, en de gast ís het volledige product. Wat stil afgehandeld kan worden, hoort stil afgehandeld te worden.',
      automations: [
        {
          title: 'Gastgeschiedenis',
          body: 'Voorkeuren van vaste gasten staan op het scherm bij aankomst. Ook voor wie er pas werkt.',
          image: '/landing/auto-knokke-hotel.webp',
          alt: 'Een rustige hotellobby met marmeren balie',
        },
        {
          title: 'Eigenaarsrapporten',
          body: 'De periodieke afrekening voor eigenaars stelt zichzelf samen. U kijkt na en verstuurt.',
          image: '/landing/auto-knokke-vastgoed.webp',
          alt: 'Balkons van appartementen aan zee buiten het seizoen',
        },
        {
          title: 'Verhuuradministratie',
          body: 'Plaatsbeschrijvingen, sleutels en schoonmaak worden opgevolgd zonder wandplanning. Niets valt tussen twee verhuringen.',
          image: '/landing/auto-knokke-verhuur.webp',
          alt: 'Een leeg vakantieappartement met hoezen op het meubilair',
        },
        {
          title: 'Avondaanvragen',
          body: 'Een vraag om negen uur ’s avonds krijgt binnen enkele minuten antwoord. In de juiste taal.',
          image: '/landing/auto-knokke-retail.webp',
          alt: 'Een kleine luxeboetiek voor openingstijd',
        },
      ],
      faqs: [
        {
          q: 'Onze service is persoonlijk. Werkt automatisering daar niet tegenin?',
          a: 'Dat doet ze als ze het contact vervangt. Ze werkt vóór u als ze de redenen wegneemt waarom contact misloopt. Niemand voelt zich goed bediend omdat een mens de boekingsbevestiging typte; men voelt zich goed bediend omdat de persoon tegenover hen de voorkeur kende. Het eerste automatiseren maakt het tweede waarschijnlijker, niet minder waarschijnlijk.',
        },
        {
          q: 'We houden gegevens bij van privécliënteel. Hoe wordt dat beschermd?',
          a: 'Voor zo’n cliënteel is het model lokaal draaien meestal de enige verstandige optie, en dat is ook wat we zouden voorstellen. Namen, voorkeuren, adressen en verblijven blijven binnen uw eigen infrastructuur en gaan nooit naar een derde partij. In een markt die zo klein is, is discretie deel van het product in plaats van een formaliteit.',
        },
        {
          q: 'We liggen dicht bij Brugge. Verandert dat iets in de praktijk?',
          a: 'Ja, meer dan die achttien kilometer doen vermoeden. Dichtbij zitten betekent dat we tijdens een gewone werkweek aanwezig kunnen zijn in plaats van in geplande blokken, en dat telt in horeca, waar wat begrepen moet worden pas zichtbaar wordt tijdens de service.',
        },
        {
          q: 'Ons seizoen is kort en intens. Wanneer zouden we dit bouwen?',
          a:
            'Buiten het seizoen, zonder uitzondering. Tussen oktober en maart hebben de mensen die weten hoe de service werkelijk loopt tijd om het uit te leggen, en krijgt het systeem enkele rustige maanden in echt gebruik voor het getest wordt door een volle zaak. Dit in juni bouwen zou betekenen dat u iets onbewezen invoert op precies het moment dat er niets mag mislopen.',
        },
      ],
      seoTitle: 'AI-automatisering in Knokke-Heist · Nivora',
      seoDescription:
        'AI-automatisering voor horeca, vastgoed en premium dienstverlening in Knokke-Heist: gastgeschiedenis, meertalige aanvragen en verhuuradministratie. Door Nivora, software- en AI-studio in Brugge, op 18 km.',
    },
  },
})
