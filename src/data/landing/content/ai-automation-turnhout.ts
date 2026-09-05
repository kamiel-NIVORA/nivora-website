import { cityPage } from '../cityPage'

/** /ai-automation-turnhout · /nl/ai-automatisering-turnhout */
export default cityPage({
  geo: {
    city: { en: 'Turnhout', nl: 'Turnhout' },
    province: { en: 'Antwerp', nl: 'Antwerpen' },
    distanceKm: 130,
    nearby: ['ai-automation-antwerp', 'ai-automation-genk', 'ai-automation-mechelen'],
  },
  copy: {
    en: {
      h1: 'AI automation in Turnhout, for short runs and constant changeovers',
      subhead:
        'The Kempen makes things in small batches for many customers. That is commercially clever and administratively brutal: more orders, more setups, more paperwork per unit produced.',
      answer:
        'AI automation in Turnhout typically targets the cost of variety: job preparation, changeover documentation and order administration in companies running short production runs for many different customers. Nivora, a software and AI studio in Brugge, builds systems that carry that per-order overhead so a wide product range stops being an administrative penalty.',
      manifesto:
        'Every hour spent preparing a job is an hour not spent making it, and you pay it on every single order. Short runs do not make that cost smaller. They make it more frequent.',
      automations: [
        {
          title: 'Repeat orders',
          body: 'Last run’s settings are ready before preparation starts. Less setup time, less waste.',
          image: '/landing/auto-turnhout-drukwerk.webp',
          alt: 'An offset press from the side, steel rollers',
        },
        {
          title: 'Mould records',
          body: 'Each mould carries what was adjusted last time. Knowledge stops living in one head.',
          image: '/landing/auto-turnhout-kunststof.webp',
          alt: 'Injection moulding machines in a small plastics workshop',
        },
        {
          title: 'Small orders',
          body: 'Thirty small orders a day are read and entered. The office handles only the exceptions.',
          image: '/landing/auto-turnhout-verpakking.webp',
          alt: 'Stacked flat cardboard blanks on a pallet',
        },
        {
          title: 'Customer quirks',
          body: 'Each customer’s quirks sit with the order instead of in someone’s memory, including when someone new is working.',
          image: '/landing/auto-turnhout-atelier.webp',
          alt: 'A workbench with hand tools and a vice',
        },
      ],
      faqs: [
        {
          q: 'We run very short series. Is there enough repetition to automate?',
          a: 'The products repeat rarely; the process around them repeats constantly. Every job needs preparing, documenting and administering in the same sequence regardless of what is being made, and that sequence is what gets automated. Short-run operations often benefit more than long-run ones, because they pay the per-order cost far more often.',
        },
        {
          q: 'Every customer has their own quirks. Can a system hold all of that?',
          a: 'That is precisely what it is good for, and precisely what people are bad at. A colleague remembering that one customer wants a particular tolerance is knowledge at risk; the same fact recorded and surfaced automatically at preparation time is knowledge that survives a holiday, a bad week or a resignation.',
        },
        {
          q: 'Does this connect to our production equipment?',
          a: 'Sometimes, but it is rarely where the first value is. Most of the gain sits in the office and the preparation before a job reaches a machine. Machine integration is a reasonable second phase once the paperwork around production is under control, and starting there is usually an expensive way to arrive at the same place.',
        },
        {
          q: 'Our order volume is high but each order is small. Does that change the economics?',
          a:
            'It improves them, which surprises people. The return on this work scales with how often a process repeats, not with how large each instance is. A company handling four hundred small orders a month pays the preparation cost four hundred times, so shaving minutes off it compounds far faster than it would for a manufacturer running four large jobs.',
        },
      ],
      seoTitle: 'AI automation in Turnhout · Nivora',
      seoDescription:
        'AI automation for short-run manufacturers in Turnhout and the Kempen: job preparation, changeover records and order administration across many customers. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Turnhout, voor korte reeksen en constante omstellingen',
      subhead:
        'De Kempen maakt in kleine reeksen voor veel klanten. Commercieel slim, administratief hard: meer orders, meer omstellingen, meer papierwerk per geproduceerde eenheid.',
      answer:
        'AI-automatisering in Turnhout richt zich doorgaans op de kost van variëteit: werkvoorbereiding, omsteldocumentatie en orderadministratie bij bedrijven die korte reeksen draaien voor veel verschillende klanten. Nivora, een software- en AI-studio in Brugge, bouwt systemen die die vaste kost per order dragen, zodat een breed gamma geen administratieve straf meer is.',
      manifesto:
        'Elk uur dat opgaat aan een job voorbereiden, is een uur dat er niet aan gemaakt wordt, en u betaalt het bij élk order. Korte reeksen maken die kost niet kleiner. Ze maken hem frequenter.',
      automations: [
        {
          title: 'Herhaalorders',
          body: 'De instellingen van de vorige reeks staan klaar voor de voorbereiding begint. Minder insteltijd, minder afval.',
          image: '/landing/auto-turnhout-drukwerk.webp',
          alt: 'Een offsetpers van opzij, stalen rollen',
        },
        {
          title: 'Matrijsdossiers',
          body: 'Bij elke matrijs staat wat er vorige keer is bijgesteld. Kennis blijft niet in één hoofd.',
          image: '/landing/auto-turnhout-kunststof.webp',
          alt: 'Spuitgietmachines in een kleine kunststofwerkplaats',
        },
        {
          title: 'Kleine orders',
          body: 'Dertig kleine orders per dag worden gelezen en ingevoerd. Het kantoor behandelt alleen de uitzonderingen.',
          image: '/landing/auto-turnhout-verpakking.webp',
          alt: 'Gestapelde kartonnen platen op een pallet',
        },
        {
          title: 'Klantvoorkeuren',
          body: 'De eigenaardigheden van elke klant staan bij de order in plaats van in een geheugen. Ook als er iemand nieuw werkt.',
          image: '/landing/auto-turnhout-atelier.webp',
          alt: 'Een werkbank met handgereedschap en een bankschroef',
        },
      ],
      faqs: [
        {
          q: 'Wij draaien heel korte reeksen. Zit daar wel genoeg herhaling in?',
          a: 'De producten herhalen zelden; het proces eromheen herhaalt constant. Elke job moet voorbereid, gedocumenteerd en administratief afgehandeld worden in dezelfde volgorde, ongeacht wat er gemaakt wordt, en die volgorde wordt geautomatiseerd. Kortereeksbedrijven halen er vaak meer uit dan langereeksbedrijven, net omdat ze die kost per order veel vaker betalen.',
        },
        {
          q: 'Elke klant heeft zijn eigen kronkels. Kan een systeem dat allemaal bijhouden?',
          a: 'Dat is precies waar het goed in is, en precies waar mensen zwak in zijn. Een collega die onthoudt dat één klant een bepaalde tolerantie wil, is kennis die risico loopt; datzelfde feit vastgelegd en automatisch getoond bij de voorbereiding, is kennis die een vakantie, een slechte week of een ontslag overleeft.',
        },
        {
          q: 'Koppelt dit aan onze productiemachines?',
          a: 'Soms, maar daar zit zelden de eerste waarde. Het grootste deel van de winst zit op kantoor en in de voorbereiding voor een job een machine bereikt. Machinekoppeling is een redelijke tweede fase zodra het papierwerk rond productie onder controle is, en daar beginnen is meestal een dure manier om op dezelfde plek uit te komen.',
        },
        {
          q: 'Ons ordervolume is hoog maar elk order is klein. Verandert dat de rekensom?',
          a:
            'Het verbetert ze, en dat verrast mensen. De opbrengst van dit werk schaalt met hoe vaak een proces zich herhaalt, niet met hoe groot elke keer is. Een bedrijf dat vierhonderd kleine orders per maand verwerkt, betaalt de voorbereidingskost vierhonderd keer, dus er minuten afhalen stapelt veel sneller op dan bij een producent die vier grote opdrachten draait.',
        },
      ],
      seoTitle: 'AI-automatisering in Turnhout · Nivora',
      seoDescription:
        'AI-automatisering voor kortereeksproducenten in Turnhout en de Kempen: werkvoorbereiding, omstelregisters en orderadministratie over veel klanten. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
