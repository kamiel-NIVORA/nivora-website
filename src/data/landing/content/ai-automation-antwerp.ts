import { cityPage } from '../cityPage'

/** /ai-automation-antwerp · /nl/ai-automatisering-antwerpen */
export default cityPage({
  geo: {
    city: { en: 'Antwerp', nl: 'Antwerpen' },
    province: { en: 'Antwerp', nl: 'Antwerpen' },
    distanceKm: 95,
    nearby: ['ai-automation-ghent', 'ai-automation-aalst', 'ai-automation-bruges'],
  },
  copy: {
    en: {
      h1: 'AI automation in Antwerp, built for paperwork that cannot be wrong',
      subhead:
        'Port, chemicals, diamond, fashion. Different trades, same problem: the paperwork is regulated and a mistake in it is expensive.',
      answer:
        'Nivora builds systems that read your shipping and customs documents, check them against each other, and flag what does not match. Your people confirm instead of searching. Everything can run on your own server.',
      manifesto:
        'Before anyone can check a document, they first have to find everything. That searching can go. The checking stays with your people.',
      automations: [
        {
          title: 'Customs documents',
          body: 'Declarations, bills of lading and certificates are read and checked against the shipment. Mismatches surface before the container moves.',
          image: '/landing/auto-antwerpen-douane.webp',
          alt: 'The weathered steel door of a shipping container, close up',
        },
        {
          title: 'Shipping mail',
          body: 'Mail in five languages sorted by urgency, with the right contract clause already attached. Nobody waits for a translation.',
          image: '/landing/auto-antwerpen-schip.webp',
          alt: 'A container ship berthed at an Antwerp quay at dusk',
        },
        {
          title: 'Safety data sheets',
          body: 'Supplier sheets are read on arrival and checked for what changed. An expired certificate becomes a warning, not a fine.',
          image: '/landing/auto-antwerpen-chemie.webp',
          alt: 'Pipework and storage tanks of a petrochemical plant under a grey sky',
        },
        {
          title: 'Stock and delivery',
          body: 'What you shipped is matched to what the customer received, every day. Differences turn up while they are still fixable.',
          image: '/landing/auto-antwerpen-magazijn.webp',
          alt: 'A long warehouse aisle with high steel racking',
        },
      ],
      faqs: [
        {
          q: 'Our documents are commercially sensitive. Can they stay in-house?',
          a: 'Yes, and in Antwerp this is usually the first question rather than the last. With Local AI the model runs on your own servers, so contracts, customer lists, pricing and shipment data never leave your infrastructure and no third party processes them. For trading businesses where the counterparty list is itself the asset, that is normally the deciding factor.',
        },
        {
          q: 'Who is liable if the system misreads a customs document?',
          a: 'You are, exactly as you are today when a colleague misreads one, which is why these systems are not built to file anything unattended. The design keeps a person as the one who submits, and puts the effort into making sure that person sees a complete, cross-checked picture instead of assembling it themselves. Automating the confirmation step in a regulated flow is not a service worth buying.',
        },
        {
          q: 'We work in five languages. Does that complicate things?',
          a: 'It is usually an argument for doing this rather than against it. Reading a supplier document in Polish or a customer enquiry in Spanish is precisely the task where a language model earns its place, and it removes the quiet bottleneck where correspondence waits for the one colleague who speaks that language to come back from lunch.',
        },
      ],
      seoTitle: 'AI automation in Antwerp · Nivora',
      seoDescription:
        'AI automation for Antwerp companies handling regulated paperwork: customs documents, bills of lading, certificates and compliance reporting, on your own servers. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Antwerpen, gebouwd voor papierwerk dat niet fout mag',
      subhead:
        'Haven, chemie, diamant, mode. Andere sectoren, hetzelfde probleem: het papierwerk is gereglementeerd en een fout kost geld.',
      answer:
        'Nivora bouwt systemen die uw transport- en douanedocumenten lezen, ze met elkaar vergelijken en melden wat niet klopt. Uw mensen bevestigen in plaats van op te zoeken. Alles kan op uw eigen server draaien.',
      manifesto:
        'Voor iemand een document kan nakijken, moet hij eerst alles bij elkaar zoeken. Dat zoekwerk kan weg. Het nakijken blijft bij uw mensen.',
      automations: [
        {
          title: 'Douanedocumenten',
          body: 'Aangiftes, vrachtbrieven en certificaten worden gelezen en aan de zending getoetst. Fouten komen boven voor de container vertrekt.',
          image: '/landing/auto-antwerpen-douane.webp',
          alt: 'De verweerde stalen deur van een zeecontainer, van dichtbij',
        },
        {
          title: 'Scheepvaartmail',
          body: 'Mail in vijf talen gesorteerd op urgentie, met de juiste contractclausule erbij. Niemand wacht nog op een vertaling.',
          image: '/landing/auto-antwerpen-schip.webp',
          alt: 'Een containerschip aan een Antwerpse kaai in de schemering',
        },
        {
          title: 'Veiligheidsfiches',
          body: 'Leveranciersfiches worden bij binnenkomst gelezen en op wijzigingen gecontroleerd. Een vervallen certificaat wordt een melding, geen boete.',
          image: '/landing/auto-antwerpen-chemie.webp',
          alt: 'Leidingwerk en opslagtanks van een petrochemische fabriek onder een grijze lucht',
        },
        {
          title: 'Stock en levering',
          body: 'Wat u verstuurde wordt dagelijks vergeleken met wat de klant ontving. Verschillen duiken op terwijl ze nog op te lossen zijn.',
          image: '/landing/auto-antwerpen-magazijn.webp',
          alt: 'Een lange magazijngang met hoge stalen rekken',
        },
      ],
      faqs: [
        {
          q: 'Onze documenten zijn commercieel gevoelig. Kunnen die binnenshuis blijven?',
          a: 'Ja, en in Antwerpen is dat meestal de eerste vraag in plaats van de laatste. Met Local AI draait het model op uw eigen servers, zodat contracten, klantenlijsten, prijszetting en zendingsgegevens uw infrastructuur nooit verlaten en geen derde partij ze verwerkt. Voor handelsbedrijven waar de tegenpartijenlijst zélf het kapitaal is, geeft dat doorgaans de doorslag.',
        },
        {
          q: 'Wie is aansprakelijk als het systeem een douanedocument verkeerd leest?',
          a: 'U, precies zoals vandaag wanneer een collega er een verkeerd leest, en net daarom worden deze systemen niet gebouwd om zelfstandig iets in te dienen. Het ontwerp houdt een mens als degene die indient, en steekt de moeite in ervoor zorgen dat die persoon een volledig, tegen elkaar getoetst beeld ziet in plaats van het zelf te moeten samenstellen. De bevestigingsstap in een gereglementeerde stroom automatiseren is geen dienst die u zou moeten willen kopen.',
        },
        {
          q: 'We werken in vijf talen. Maakt dat het ingewikkelder?',
          a: 'Dat is meestal een argument vóór in plaats van tegen. Een leveranciersdocument in het Pools lezen of een klantvraag in het Spaans is precies de taak waar een taalmodel zijn plaats verdient, en het haalt de stille flessenhals weg waar correspondentie blijft liggen tot de ene collega die die taal spreekt terug is van de middag.',
        },
      ],
      seoTitle: 'AI-automatisering in Antwerpen · Nivora',
      seoDescription:
        'AI-automatisering voor Antwerpse bedrijven met gereglementeerd papierwerk: douanedocumenten, vrachtbrieven, certificaten en compliance-rapportering, op uw eigen servers. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
