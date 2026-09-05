import { cityPage } from '../cityPage'

/** /ai-automation-sint-niklaas · /nl/ai-automatisering-sint-niklaas */
export default cityPage({
  geo: {
    city: { en: 'Sint-Niklaas', nl: 'Sint-Niklaas' },
    province: { en: 'East Flanders', nl: 'Oost-Vlaanderen' },
    distanceKm: 80,
    nearby: ['ai-automation-antwerp', 'ai-automation-ghent', 'ai-automation-aalst'],
  },
  copy: {
    en: {
      h1: 'AI automation in Sint-Niklaas, for the businesses behind the port',
      subhead:
        'The Waasland lives off Antwerp without being Antwerp. Plenty of companies here handle port-scale complexity with a team that fits around one table.',
      answer:
        'AI automation in Sint-Niklaas mainly serves the logistics and supplier businesses that operate in the port’s shadow: transport planning, warehouse documentation and the order flows that connect them to much larger customers. Nivora, a software and AI studio in Brugge, builds systems that let a small team handle the document volume those customers generate.',
      manifesto:
        'Every hour spent meeting a large customer\'s paperwork rules is an hour your own operation does not get. A team of twelve should not carry the admin of a company of two hundred.',
      automations: [
        {
          title: 'Stock reconciliation',
          body: 'What you shipped is compared daily with what the customer reports. Differences surface while still traceable.',
          image: '/landing/auto-sint-niklaas-magazijn.webp',
          alt: 'High warehouse racking with wrapped pallets',
        },
        {
          title: 'Transport documents',
          body: 'Papers are prepared in the format each customer demands. Their rules become configuration, not manual work.',
          image: '/landing/auto-sint-niklaas-transport.webp',
          alt: 'A tractor unit beside a loading dock at dusk',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Order confirmation',
          body: 'Orders from portals and mail arrive in one flow. Nobody logs in everywhere separately.',
          image: '/landing/auto-sint-niklaas-toelevering.webp',
          alt: 'Steel components in stillages on a factory floor',
        },
        {
          title: 'Customer reporting',
          body: 'The reports your largest customer asks for are ready by themselves, on their template and their rhythm.',
          image: '/landing/auto-sint-niklaas-kantoor.webp',
          alt: 'A small logistics office with pigeonholes and trays',
        },
      ],
      faqs: [
        {
          q: 'Our biggest customer dictates the formats. Can a system follow their rules?',
          a: 'Yes, and this is one of the clearer cases for building rather than buying. Off-the-shelf tools assume their own format; a system built for you can produce exactly what that customer requires, including the specific quirks nobody outside your industry would design for. Their rules become configuration rather than a monthly negotiation.',
        },
        {
          q: 'We are twelve people. Can we maintain something like this?',
          a: 'You should not have to, and that is a fair thing to insist on. These are built to run without attention and handed over with documentation and the code in your possession. If a system needs a technical person on staff to keep working, it is the wrong system for a company of twelve, and that should be a condition rather than a hope.',
        },
        {
          q: 'How does this fit with the systems our customers make us use?',
          a: 'Alongside them, not instead. You will not replace a large customer’s portal and should not try. The work is in removing the manual step between your operation and their system, so information moves once and arrives in the shape they require.',
        },
        {
          q: 'How quickly could we have something running?',
          a:
            'For a single flow, such as preparing one large customer\'s documentation, weeks rather than months. That is deliberate: in a company of a dozen people there is no appetite for a project that runs half a year before anything is visible, and there is no need for one either. The scope gets cut until the first version is small enough to judge honestly.',
        },
      ],
      seoTitle: 'AI automation in Sint-Niklaas · Nivora',
      seoDescription:
        'AI automation for transport, logistics and supplier companies in Sint-Niklaas and the Waasland: customer documentation, stock reconciliation and portal submissions. By Nivora, a software and AI studio in Brugge.',
    },
    nl: {
      h1: 'AI-automatisering in Sint-Niklaas, voor de bedrijven achter de haven',
      subhead:
        'Het Waasland leeft van Antwerpen zonder Antwerpen te zijn. Heel wat bedrijven hier verwerken havencomplexiteit met een team dat rond één tafel past.',
      answer:
        'AI-automatisering in Sint-Niklaas bedient vooral de logistieke en toeleverbedrijven die in de schaduw van de haven werken: transportplanning, magazijndocumentatie en de orderstromen die hen met veel grotere klanten verbinden. Nivora, een software- en AI-studio in Brugge, bouwt systemen waarmee een klein team het documentvolume aankan dat zulke klanten genereren.',
      manifesto:
        'Elk uur dat opgaat aan de papierregels van een grote klant, is een uur dat uw eigen werking niet krijgt. Een team van twaalf hoort de administratie van een bedrijf van tweehonderd niet te dragen.',
      automations: [
        {
          title: 'Voorraadafstemming',
          body: 'Wat u verstuurde wordt dagelijks vergeleken met wat de klant meldt. Verschillen komen boven terwijl ze traceerbaar zijn.',
          image: '/landing/auto-sint-niklaas-magazijn.webp',
          alt: 'Hoge magazijnrekken met gewikkelde pallets',
        },
        {
          title: 'Transportdocumenten',
          body: 'Papieren worden klaargemaakt in het formaat dat elke klant oplegt. Hun regels worden instelling in plaats van handwerk.',
          image: '/landing/auto-sint-niklaas-transport.webp',
          alt: 'Een trekker naast een laadkade in de schemering',
          href: '/ai-automation-haulier',
        },
        {
          title: 'Orderbevestiging',
          body: 'Orders uit portalen en mails komen in één stroom binnen. Niemand logt nog overal apart in.',
          image: '/landing/auto-sint-niklaas-toelevering.webp',
          alt: 'Stalen onderdelen in stapelbakken op een fabrieksvloer',
        },
        {
          title: 'Klantrapportering',
          body: 'De rapporten die uw grote klant vraagt, staan vanzelf klaar. Op hun sjabloon, op hun ritme.',
          image: '/landing/auto-sint-niklaas-kantoor.webp',
          alt: 'Een klein logistiek kantoor met postvakken en bakjes',
        },
      ],
      faqs: [
        {
          q: 'Onze grootste klant bepaalt de formaten. Kan een systeem hun regels volgen?',
          a: 'Ja, en dit is een van de duidelijkste gevallen om te bouwen in plaats van te kopen. Kant-en-klare tools gaan uit van hun eigen formaat; een systeem dat voor u gebouwd is, kan exact leveren wat die klant vraagt, inclusief de eigenaardigheden waar niemand buiten uw sector voor zou ontwerpen. Hun regels worden configuratie in plaats van een maandelijkse discussie.',
        },
        {
          q: 'We zijn met twaalf. Kunnen wij zoiets onderhouden?',
          a: 'Dat zou niet nodig mogen zijn, en daar mag u gerust op staan. Deze systemen worden gebouwd om zonder aandacht te draaien en overgedragen met documentatie en de code in uw bezit. Heeft een systeem een technisch profiel in dienst nodig om te blijven werken, dan is het het verkeerde systeem voor een bedrijf van twaalf, en dat hoort een voorwaarde te zijn in plaats van een hoop.',
        },
        {
          q: 'Hoe past dit bij de systemen die onze klanten ons opleggen?',
          a: 'Ernaast, niet in de plaats. U vervangt het portaal van een grote klant niet en dat moet u ook niet proberen. Het werk zit in de manuele stap tussen uw werking en hun systeem weghalen, zodat informatie één keer beweegt en aankomt in de vorm die zij vragen.',
        },
        {
          q: 'Hoe snel kunnen we iets draaiende hebben?',
          a:
            'Voor één stroom, bijvoorbeeld de documentatie van één grote klant klaarmaken, gaat het over weken in plaats van maanden. Dat is bewust: in een bedrijf van een tiental mensen is er geen zin in een project dat een half jaar loopt voor er iets zichtbaar is, en het is ook niet nodig. De scope wordt gesnoeid tot de eerste versie klein genoeg is om eerlijk te beoordelen.',
        },
      ],
      seoTitle: 'AI-automatisering in Sint-Niklaas · Nivora',
      seoDescription:
        'AI-automatisering voor transport-, logistieke en toeleverbedrijven in Sint-Niklaas en het Waasland: klantdocumentatie, stockafstemming en portaalindieningen. Door Nivora, software- en AI-studio in Brugge.',
    },
  },
})
