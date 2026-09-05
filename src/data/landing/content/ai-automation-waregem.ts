import { cityPage } from '../cityPage'

/** /ai-automation-waregem · /nl/ai-automatisering-waregem */
export default cityPage({
  geo: {
    city: { en: 'Waregem', nl: 'Waregem' },
    province: { en: 'West Flanders', nl: 'West-Vlaanderen' },
    distanceKm: 45,
    nearby: ['ai-automation-kortrijk', 'ai-automation-roeselare', 'ai-automation-ghent'],
  },
  copy: {
    en: {
      h1: 'AI automation in Waregem, for companies that grew faster than their systems',
      subhead:
        'A lot of businesses here are two or three times the size they were a decade ago, and are still running the processes they designed when everyone fitted in one room.',
      answer:
        'AI automation in Waregem often starts as a growth problem rather than a technology one: a manufacturer or supplier whose order volume outgrew a process built for a smaller company. Nivora, a software and AI studio in Brugge, forty-five kilometres away, rebuilds that coordination layer around the systems already in place, so the company can keep growing without adding an administrative floor.',
      manifesto:
        'Every hour spent working around a process built for a smaller company is an hour your growth is paying for. The process can grow up without anyone having to remember more.',
      automations: [
        {
          title: 'Order intake',
          body: 'Customers each send their own way; everything is read automatically. Anything missing is queried at once.',
          image: '/landing/auto-waregem-textiel.webp',
          alt: 'Rolls of woven fabric in a storeroom',
        },
        {
          title: 'Production planning',
          body: 'Orders are scheduled against what is actually on the floor. Rescheduling is no longer half a day.',
          image: '/landing/auto-waregem-meubel.webp',
          alt: 'A furniture assembly hall with clamped frames',
        },
        {
          title: 'Margin figures',
          body: 'What each product line really earns becomes visible. Growth decisions on figures instead of feel.',
          image: '/landing/auto-waregem-productie.webp',
          alt: 'A production floor between shifts',
        },
        {
          title: 'Export documents',
          body: 'Papers per market are prepared consistently, no longer depending on who has done that country before.',
          image: '/landing/auto-waregem-export.webp',
          alt: 'Strapped export pallets in a despatch bay',
          href: '/ai-automation-imo-office',
        },
      ],
      faqs: [
        {
          q: 'We grew fast and our processes are messy. Should we fix that first?',
          a: 'No, and waiting is the more common mistake. The process of building this is what forces the description to happen: you cannot automate a step until someone states plainly what it is. Companies that try to tidy up first usually spend six months on a documentation project that goes stale before anything is built.',
        },
        {
          q: 'Our knowledge sits with two long-serving colleagues. Is that a risk?',
          a: 'It is the risk, and it is worth naming plainly. Their judgement is genuinely valuable and should stay with them. What should not stay only in their heads is the routine part: how this customer wants orders confirmed, which document that market requires, what the exception is for that one supplier. Writing that into a system protects the company without diminishing anyone.',
        },
        {
          q: 'How do we pick which process to start with?',
          a: 'Ask the team which task they would hand over tomorrow if they could. The answer is nearly always both the most repetitive and the most expensive one, and it comes without a workshop. If two answers compete, start with the one that blocks other people rather than the one that is merely unpleasant.',
        },
        {
          q: 'We are considering a new ERP anyway. Should we wait?',
          a:
            'Probably not, and the two are less connected than they look. An ERP replacement is an eighteen-month programme with its own risk; this is a matter of weeks and sits alongside whatever system you run. Doing this first also produces something useful for the ERP decision: a written description of how your processes actually work, which is normally the hardest part of that selection.',
        },
      ],
      seoTitle: 'AI automation in Waregem · Nivora',
      seoDescription:
        'AI automation for fast-grown manufacturers and suppliers in Waregem: order intake, export documentation and product-line reporting. By Nivora, a software and AI studio in Brugge, 45 km away.',
    },
    nl: {
      h1: 'AI-automatisering in Waregem, voor bedrijven die sneller groeiden dan hun systemen',
      subhead:
        'Veel bedrijven hier zijn twee tot drie keer zo groot als tien jaar geleden, en draaien nog altijd op processen die ontworpen zijn toen iedereen in één ruimte paste.',
      answer:
        'AI-automatisering in Waregem begint vaak als een groeiprobleem in plaats van een technologisch probleem: een maakbedrijf of toeleverancier waarvan het ordervolume een proces ontgroeide dat voor een kleiner bedrijf bedacht was. Nivora, een software- en AI-studio in Brugge op vijfenveertig kilometer, herbouwt die coördinatielaag rond de systemen die er al staan, zodat het bedrijf kan blijven groeien zonder er een administratieve verdieping bij te zetten.',
      manifesto:
        'Elk uur dat opgaat aan omzeilen van een proces dat voor een kleiner bedrijf bedacht is, is een uur dat uw groei betaalt. Dat proces kan meegroeien zonder dat iemand meer moet onthouden.',
      automations: [
        {
          title: 'Orderopname',
          body: 'Klanten sturen elk op hun manier, alles wordt automatisch ingelezen. Wat ontbreekt wordt meteen opgevraagd.',
          image: '/landing/auto-waregem-textiel.webp',
          alt: 'Rollen geweven stof in een magazijn',
        },
        {
          title: 'Productieplanning',
          body: 'Orders worden ingepland op basis van wat er werkelijk op de vloer staat. Herplannen is geen halve dag meer.',
          image: '/landing/auto-waregem-meubel.webp',
          alt: 'Een meubelassemblagehal met geklemde frames',
        },
        {
          title: 'Margecijfers',
          body: 'Per productlijn wordt zichtbaar wat er echt overblijft. Groeibeslissingen op cijfers in plaats van gevoel.',
          image: '/landing/auto-waregem-productie.webp',
          alt: 'Een productievloer tussen twee ploegen in',
        },
        {
          title: 'Exportdocumenten',
          body: 'Papieren per markt worden consequent klaargemaakt. Niet meer afhankelijk van wie dat land al eens deed.',
          image: '/landing/auto-waregem-export.webp',
          alt: 'Omsnoerde exportpallets in een verzendzone',
          href: '/ai-automation-imo-office',
        },
      ],
      faqs: [
        {
          q: 'We zijn snel gegroeid en onze processen zijn rommelig. Moeten we dat eerst opkuisen?',
          a: 'Nee, en wachten is de vaakst gemaakte fout. Het bouwproces is net wat de beschrijving afdwingt: u kunt een stap niet automatiseren voor iemand duidelijk zegt wat ze inhoudt. Bedrijven die eerst willen opruimen, besteden meestal een half jaar aan een documentatieproject dat verouderd is voor er iets gebouwd wordt.',
        },
        {
          q: 'Onze kennis zit bij twee collega’s met lange dienst. Is dat een risico?',
          a: 'Dat ís het risico, en het mag gerust benoemd worden. Hun oordeel is echt waardevol en hoort bij hen te blijven. Wat niet alleen in hun hoofd hoort te blijven, is het routinedeel: hoe deze klant orders bevestigd wil, welk document die markt vraagt, wat de uitzondering is voor die ene leverancier. Dat in een systeem zetten beschermt het bedrijf zonder iemand kleiner te maken.',
        },
        {
          q: 'Hoe kiezen we met welk proces we starten?',
          a: 'Vraag het team welke taak ze morgen zouden afgeven als het kon. Het antwoord is bijna altijd tegelijk de meest herhalende en de duurste, en het komt zonder workshop. Zijn er twee antwoorden, begin dan met dat wat andere mensen blokkeert in plaats van dat wat enkel vervelend is.',
        },
        {
          q: 'We overwegen sowieso een nieuw ERP. Moeten we wachten?',
          a:
            'Waarschijnlijk niet, en de twee hangen minder samen dan het lijkt. Een ERP-vervanging is een programma van achttien maanden met eigen risico; dit is een kwestie van weken en zit naast welk systeem u ook draait. Dit eerst doen levert bovendien iets op voor die ERP-beslissing: een geschreven beschrijving van hoe uw processen werkelijk lopen, en dat is meestal het moeilijkste deel van zo\'n selectie.',
        },
      ],
      seoTitle: 'AI-automatisering in Waregem · Nivora',
      seoDescription:
        'AI-automatisering voor snelgegroeide maakbedrijven en toeleveranciers in Waregem: orderopname, exportdocumentatie en rapportering per productlijn. Door Nivora, software- en AI-studio in Brugge, op 45 km.',
    },
  },
})
