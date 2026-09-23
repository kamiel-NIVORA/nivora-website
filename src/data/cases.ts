/**
 * Cases (op de site "Work"): werk dat we voor klanten bouwden.
 *
 * Een case leest als een verhaal in vaste delen:
 *   1. hero: titel, één zin, projectregel en het dashboard dat in 3D oprijst
 *      en daarna in zijn kader meescrolt (zo zie je het hele scherm);
 *   2. het probleem van het bedrijf;
 *   3. de stappen waarmee we het oplosten, elk met één of meer beelden;
 *   4. het resultaat (bouwfeiten + zonder/met-tabel);
 *   5. het woord van de klant;
 *   6. drie afsluitende kaarten met een CTA.
 * Rendering zit in src/pages/CasePage.tsx, de lijst in src/pages/CasesIndex.tsx.
 * Geen em-dashes in zichtbare tekst.
 *
 * Cijfers zijn bouwfeiten die we kunnen aantonen. Resultaatcijfers (omzet,
 * boekingen) komen er pas bij als de klant ze bevestigt. De dashboardbeelden
 * en video's tonen voorbeelddata.
 */
import type { Lang, Localized } from '@/i18n'

export type CaseImage = { image: string; alt: string }

/** Wat er onder een stap getoond wordt. */
export type CaseVisual =
  /** Eén groot beeld, met eventueel een knop eronder. */
  | {
      kind: 'shot'
      image: string
      alt: string
      link?: { label: string; href: string }
    }
  /** Twee beelden naast elkaar (op gsm onder elkaar). */
  | { kind: 'duo'; images: [CaseImage, CaseImage] }
  /** Tabs bovenaan, groot beeld of video eronder, springt zelf door. */
  | {
      kind: 'tabs'
      items: {
        name: string
        text: string
        image: string
        alt: string
        video?: string
        duration?: number
      }[]
    }
  /** Raster met de iconen van de koppelingen. */
  | { kind: 'logos'; items: { name: string; icon: string }[] }
  /** Eén kader met telkens een volledige mail, wisselt om de paar seconden. */
  | {
      kind: 'mails'
      items: { moment: string; subject: string; image: string }[]
    }

export type CaseStep = {
  h2: string
  p: string
  points?: string[]
  visuals: CaseVisual[]
  /** Zin met een knop onder de beelden, bv. om het zelf te voelen op de site van de klant. */
  link?: { text: string; label: string; href: string }
}

export type CaseStudy = {
  slug: string
  client: string
  title: string
  /** Eén regel onder de titel, ook de meta description. */
  excerpt: string
  /** Eén gedempte regel: plaats · wat we bouwden · jaar (voor de lijst). */
  meta: string
  /** Kaart in de lijst: een Nivora-landschap met het logo van de klant erop. */
  cover: string
  logo: string
  coverAlt: string
  ogImage: string
  /** Projectregel onder de titel. */
  project: { label: string; value: string }[]
  /** Het dashboard als één lang beeld: rijst op in 3D en scrolt dan mee. */
  /**
   * `rail`: het vaste menu links in het dashboard (boven- en onderstuk),
   * breedte als deel van de beeldbreedte. Blijft staan terwijl de inhoud scrolt.
   */
  hero: {
    image: string
    alt: string
    rail?: { top: string; bottom: string; width: number; bg: string }
    mobile?: { image: string; top: string }
  }
  problem: {
    h2: string
    p: string
    items: { title: string; text: string }[]
    question: string
  }
  steps: { h2: string; p: string; items: CaseStep[] }
  result: {
    h2: string
    p: string
    facts: { value: string; label: string }[]
    before: string
    after: string
    rows: { topic: string; before: string; after: string }[]
  }
  /** Leeg tot de klant hem echt gaf; dan toont de site niets (lokaal een placeholder). */
  /**
   * `draft`: een voorstel dat de klant nog moet goedkeuren. Dan toont enkel de
   * lokale site het (met een melding); live pas als `draft` weg is.
   */
  quote?: { text: string; name: string; role: string; photo?: string; draft?: boolean }
  site?: { label: string; href: string }
}

const IMG = '/cases/tafereel'
const VID = '/cases/tafereel/video'

const LOGOS = [
  { name: 'Stripe', icon: '/cases/logos/stripe.svg' },
  { name: 'Gmail', icon: '/cases/logos/gmail.svg' },
  { name: 'Instagram', icon: '/cases/logos/instagram.svg' },
  { name: 'Facebook', icon: '/cases/logos/facebook.svg' },
  { name: 'Meta Ads', icon: '/cases/logos/meta.svg' },
  { name: 'Google', icon: '/cases/logos/google.svg' },
]

const RAIL = {
  top: `${IMG}/dash-rail-top.webp`,
  bottom: `${IMG}/dash-rail-bottom.webp`,
  width: 88 / 1440,
  bg: '#2c1f1f',
}

const MOBILE = {
  image: `${IMG}/dash-mobiel.webp`,
  top: `${IMG}/dash-mobiel-top.webp`,
}

const SITE = {
  label: 'studiotafereel.com',
  href: 'https://studiotafereel.com',
}

/** [bestand, moment NL, moment EN, onderwerp] */
const MAILS: [string, string, string, string][] = [
  ['les-bevestiging', 'Na het boeken', 'After booking', 'Je les is geboekt'],
  ['les-herinnering', 'Twee dagen voor de les', 'Two days before class', 'Overmorgen: Draaien INI mini'],
  ['les-bedankt', 'De dag na de les', 'The day after class', 'Merci voor gisteren'],
  [
    'les-stukken-klaar',
    'Als de stukken uit de oven komen',
    'When the pieces leave the kiln',
    'Je stukken komen uit de oven',
  ],
  ['les-wachtlijst', 'Als er een plek vrijkomt', 'When a seat opens up', 'Er is een plek vrij'],
  ['drop-morgen', 'De dag voor een drop', 'The day before a drop', 'Morgen: de herfstcollectie'],
  ['drop-live', 'Zodra een drop online staat', 'The moment a drop goes live', 'Nu online: Herfstcollectie'],
  ['order-afhalen-betaald', 'Na een bestelling', 'After an order', 'Bedankt voor je bestelling'],
  ['order-klaar', 'Als de bestelling klaarligt', 'When the order is ready', 'Je bestelling ligt klaar'],
  ['order-verzonden', 'Als een pakket vertrekt', 'When a parcel ships', 'Je bestelling is onderweg'],
  ['order-review', 'Een week later', 'A week later', 'Hoe staat je kom thuis?'],
  ['cadeaubon', 'Na een cadeaubon', 'After a gift card', 'Je cadeaubon van € 75'],
  ['bon-ontvanger', 'Voor wie de bon krijgt', 'For whoever receives it', 'Een cadeau van Lotte'],
  ['instagram', 'Om te delen op Instagram', 'To share on Instagram', 'Laat je stukken eens zien?'],
]
const mails = (lang: Lang) =>
  MAILS.map(([f, nl, en, subject]) => ({
    moment: lang === 'nl' ? nl : en,
    subject,
    image: `${IMG}/mail-${f}.webp`,
  }))

const BASE = {
  slug: 'tafereel',
  client: 'Tafereel',
  cover: '/brand/landscape-ridges.webp',
  logo: `${IMG}/mark.webp`,
  ogImage: `${IMG}/og.jpg`,
  site: SITE,
}

const TAFEREEL: Localized<CaseStudy> = {
  nl: {
    ...BASE,
    title: 'Het operating system voor een atelier',
    excerpt:
      'Website, webwinkel, lessen, mails en Instagram voor het atelier van Eva Vandoorne in Brugge. Alles in één dashboard, zodat ze de focus op het handwerk niet verliest.',
    meta: 'Brugge · Website en dashboard · 2026',
    coverAlt: 'Het logo van Tafereel op een heuvellandschap',
    project: [
      { label: 'Klant', value: 'Tafereel, keramiekatelier' },
      { label: 'Plaats', value: 'Brugge' },
      {
        label: 'Wat we bouwden',
        value: 'Site, webwinkel, dashboard en automatisaties',
      },
      { label: 'Doorlooptijd', value: '10 weken' },
    ],
    hero: {
      image: `${IMG}/dash-overzicht-full.webp`,
      alt: 'Het dashboard van Tafereel met taken, planning, omzet en klanten',
      rail: RAIL,
      mobile: MOBILE,
    },
    problem: {
      h2: 'Het probleem',
      p: 'Eva runt Tafereel alleen. Naast lesgeven, draaien en glazuren komt er elke week een berg werk bij dat niets met haar handwerk te maken heeft.',
      items: [
        {
          title: 'Lessen en betalingen',
          text: 'Boekingen kwamen binnen via een Google-formulier. Daarna zelf nakijken wie al betaald had en wie nog op een plek wachtte.',
        },
        {
          title: 'Verkoop',
          text: 'Een stuk verkopen ging via een berichtje en een overschrijving. Wat er nog op voorraad stond, hield ze zelf bij.',
        },
        {
          title: 'Klantcontact',
          text: 'Elke bevestiging, herinnering en vraag beantwoordde Eva zelf, één voor één.',
        },
        {
          title: 'Zichtbaar blijven',
          text: 'Instagram was het enige venster. Elke post, nieuwsbrief of advertentie begon ze opnieuw in een losse app.',
        },
      ],
      question: 'De vraag: kan al dat werk vanzelf lopen, zodat Eva zich weer kan focussen op het handwerk waarvoor ze Tafereel begon?',
    },
    steps: {
      h2: 'Hoe we het oplosten',
      p: 'Eén systeem dat al het werk rond het handwerk overneemt, onderdeel per onderdeel.',
      items: [
        {
          h2: 'Het dashboard in actie',
          p: 'Vier echte taken, van begin tot eind: een set story’s, een blog, een nieuwsbrief en een advertentie. Zo doet Eva haar marketing zonder haar dashboard te verlaten, en zonder tien andere apps te moeten openen.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Instagram',
                  text: 'Een sjabloon kiezen voor een stuk, een tekening toevoegen, het voorbeeld bekijken en inplannen.',
                  image: `${VID}/social.jpg`,
                  alt: 'Een set Instagram-story’s maken in het dashboard',
                  video: `${VID}/social.mp4`,
                  duration: 59.2,
                },
                {
                  name: 'Blog',
                  text: 'Schrijven zoals in een document, blokken met één klik en een cover die zichzelf maakt.',
                  image: `${VID}/blog.jpg`,
                  alt: 'Een blog schrijven in het dashboard',
                  video: `${VID}/blog.mp4`,
                  duration: 38,
                },
                {
                  name: 'Nieuwsbrief',
                  text: 'Een sjabloon dat zich vult met de nieuwste stukken, een onderwerp, en versturen via Gmail.',
                  image: `${VID}/nb.jpg`,
                  alt: 'Een nieuwsbrief versturen in het dashboard',
                  video: `${VID}/nb.mp4`,
                  duration: 27.5,
                },
                {
                  name: 'Advertentie',
                  text: 'Zelf adverteren zonder Ads Manager of agency: stap voor stap, met de advertentie live ernaast.',
                  image: `${VID}/ads.jpg`,
                  alt: 'Een advertentie opzetten in het dashboard',
                  video: `${VID}/ads.mp4`,
                  duration: 33.2,
                },
              ],
            },
          ],
        },
        {
          h2: 'Eén kalender, nooit overboekt',
          p: 'Lessen, afhalingen, drops en posts staan in één week. Eva plant een les in met een vast aantal plaatsen en die staat meteen online. Is een les vol, dan kan niemand er nog bij.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Kalender',
                  text: 'Een les inplannen met een vast aantal plaatsen, voor meerdere weken tegelijk.',
                  image: `${VID}/kal.jpg`,
                  alt: 'Een les inplannen in de kalender',
                  video: `${VID}/kal.mp4`,
                  duration: 37.7,
                },
              ],
            },
          ],
        },
        {
          h2: 'Lessen en acties zelf beheren',
          p: 'Foto’s, prijzen en teksten past Eva zelf aan. Een actie zet ze in een paar klikken aan, en die staat meteen op de site: in het menu met een aftelklok en op de lespagina.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Lessen',
                  text: 'Een Zomeractie van 25% op een les, meteen zichtbaar op de site.',
                  image: `${VID}/les.jpg`,
                  alt: 'Een actie op een les zetten',
                  video: `${VID}/les.mp4`,
                  duration: 33.8,
                },
              ],
            },
          ],
        },
        {
          h2: 'De webwinkel zelf beheren',
          p: 'Bestellingen klaarzetten met één knop, en een nieuwe collectie inplannen als drop. Op de site loopt meteen de aftelklok, en wie wil bestelt al vooraf.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Webwinkel',
                  text: 'Een bestelling klaarzetten en een drop inplannen, met de aftelklok op de site.',
                  image: `${VID}/shop.jpg`,
                  alt: 'Een drop inplannen in de webwinkel',
                  video: `${VID}/shop.mp4`,
                  duration: 40.2,
                },
              ],
            },
          ],
        },
        {
          h2: 'Klantcontact dat zichzelf regelt',
          p: 'Elke stap heeft een eigen mail in de huisstijl van Tafereel, in Eva’s toon en vanuit haar eigen adres. Klanten weten altijd waar ze staan.',
          link: { text: 'Voel het zelf: boek een les of bestel een stuk, en kijk welke mail je krijgt.', label: 'Naar studiotafereel.com', href: SITE.href },
          visuals: [{ kind: 'mails', items: mails('nl') }],
        },
        {
          h2: 'Betalen en bevestigen zonder handwerk',
          p: 'Klanten betalen via Stripe en krijgen hun bevestiging via Gmail, vanuit Eva’s eigen adres. Instagram, Facebook, Meta Ads en Google hangen aan hetzelfde systeem.',
          visuals: [{ kind: 'logos', items: LOGOS }],
        },
        {
          h2: 'Een site die boekt en verkoopt',
          p: 'Warm en rustig, zoals het atelier. Bezoekers boeken een les, kopen een stuk of geven een cadeaubon, op gsm net zo vlot als op de computer.',
          visuals: [
            {
              kind: 'shot',
              image: `${IMG}/site-home.webp`,
              alt: 'De homepage van Tafereel met het inktlogo boven een draaischijf',
              link: { label: 'Bekijk het zelf', href: SITE.href },
            },
          ],
        },
      ],
    },
    quote: {
      text: 'Vroeger had ik enkel mijn Instagram en een Google-formulier voor de boekingen, en wie iets wilde kopen, betaalde met een overschrijving. ’s Avonds zat ik dan nog uren alles na te kijken. Nu loopt dat allemaal vanzelf, en toch voelt het nog helemaal als Tafereel. Ik kan me gewoon terug focussen op mijn handwerk, en daar ben ik zo blij om.',
      name: 'Eva Vandoorne',
      role: 'Tafereel, Brugge',
      photo: `${IMG}/eva.webp`,
      draft: true,
    },
    result: {
      h2: 'Het resultaat',
      p: 'Voor een atelier met één persoon telt elk uur. Dit veranderde er.',
      facts: [
        { value: '24/7', label: 'online boeken en betalen, ook als het atelier dicht is' },
        { value: '35', label: 'mails die vanzelf vertrekken, in Eva’s eigen toon' },
        { value: '7', label: 'onderdelen in één dashboard, van lessen tot advertenties' },
        { value: '0', label: 'keer overboekt: een volle les is echt vol' },
      ],
      before: 'Zonder systeem',
      after: 'Met het dashboard',
      rows: [
        { topic: 'Lessen boeken', before: 'Boeken via een Google-formulier, daarna alles zelf opvolgen', after: 'Klanten boeken en betalen zelf online, de bevestiging vertrekt vanzelf' },
        { topic: 'Betalen', before: 'Overschrijvingen één voor één nakijken', after: 'Online betalen met Bancontact of kaart, meteen verwerkt' },
        { topic: 'Volle lessen', before: 'Een afzegging wordt een lege plek', after: 'De wachtlijst krijgt meteen een mail als er een plek vrijkomt' },
        { topic: 'Verkopen', before: 'Stukken verkopen via berichtjes op Instagram', after: 'Een eigen webwinkel met drops, pre-orders en cadeaubonnen' },
        { topic: 'Klantcontact', before: 'Elke bevestiging en herinnering zelf typen', after: '35 mails in haar eigen stijl, telkens op het juiste moment' },
        { topic: 'Instagram', before: 'Posts maken in losse apps, telkens van nul', after: 'Posts, story’s en reels uit eigen sjablonen, vooraf ingepland' },
        { topic: 'Adverteren', before: 'Ads Manager zelf uitzoeken of uitbesteden aan een agency', after: 'Zelf adverteren, stap voor stap, zonder agency' },
        { topic: 'Overzicht', before: 'Alles verspreid over Instagram, mails en notities', after: 'Eén dashboard met taken, planning, omzet en klanten' },
      ],
    },
  },
  en: {
    ...BASE,
    title: 'The operating system for a studio',
    excerpt:
      'Website, web shop, classes, emails and Instagram for Eva Vandoorne’s studio in Bruges. All in one dashboard, so she never loses focus on the craft.',
    meta: 'Bruges · Website and dashboard · 2026',
    coverAlt: 'The Tafereel logo over a landscape of hills',
    project: [
      { label: 'Client', value: 'Tafereel, ceramics studio' },
      { label: 'Location', value: 'Bruges' },
      {
        label: 'What we built',
        value: 'Site, web shop, dashboard and automations',
      },
      { label: 'Timeline', value: '10 weeks' },
    ],
    hero: {
      image: `${IMG}/dash-overzicht-full.webp`,
      alt: 'The Tafereel dashboard with tasks, planning, revenue and customers',
      rail: RAIL,
      mobile: MOBILE,
    },
    problem: {
      h2: 'The problem',
      p: 'Eva runs Tafereel on her own. Besides teaching, throwing and glazing, every week brings a pile of work that has nothing to do with her craft.',
      items: [
        {
          title: 'Classes and payments',
          text: 'Bookings came in through a Google Form. Then checking by hand who had paid and who was still waiting for a seat.',
        },
        {
          title: 'Sales',
          text: 'Selling a piece meant a message and a bank transfer. She kept track of the stock herself.',
        },
        {
          title: 'Customer contact',
          text: 'Eva answered every confirmation, reminder and question herself, one by one.',
        },
        {
          title: 'Staying visible',
          text: 'Instagram was the only window. Every post, newsletter or ad started from scratch in a separate app.',
        },
      ],
      question: 'The question: can all that work run by itself, so Eva can focus again on the craft she started Tafereel for?',
    },
    steps: {
      h2: 'How we solved it',
      p: 'One system that takes over all the work around the craft, part by part.',
      items: [
        {
          h2: 'The dashboard in action',
          p: 'Four real tasks, start to finish: a set of stories, a blog, a newsletter and an ad. This is how Eva does her marketing without leaving her dashboard, and without opening ten other apps.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Instagram',
                  text: 'Pick a template for a piece, add a drawing, preview it and schedule it.',
                  image: `${VID}/social.jpg`,
                  alt: 'Making a set of Instagram stories in the dashboard',
                  video: `${VID}/social.mp4`,
                  duration: 59.2,
                },
                {
                  name: 'Blog',
                  text: 'Writing like in a document, blocks in one click and a cover that makes itself.',
                  image: `${VID}/blog.jpg`,
                  alt: 'Writing a blog post in the dashboard',
                  video: `${VID}/blog.mp4`,
                  duration: 38,
                },
                {
                  name: 'Newsletter',
                  text: 'A template that fills itself with the newest pieces, a subject, and sending through Gmail.',
                  image: `${VID}/nb.jpg`,
                  alt: 'Sending a newsletter in the dashboard',
                  video: `${VID}/nb.mp4`,
                  duration: 27.5,
                },
                {
                  name: 'Ad',
                  text: 'Advertising herself without Ads Manager or an agency: step by step, with the ad live beside it.',
                  image: `${VID}/ads.jpg`,
                  alt: 'Setting up an ad in the dashboard',
                  video: `${VID}/ads.mp4`,
                  duration: 33.2,
                },
              ],
            },
          ],
        },
        {
          h2: 'One calendar, never overbooked',
          p: 'Classes, pick-ups, drops and posts share one week. Eva schedules a class with a fixed number of seats and it is online right away. When a class is full, nobody else can book it.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Calendar',
                  text: 'Scheduling a class with a fixed number of seats, for several weeks at once.',
                  image: `${VID}/kal.jpg`,
                  alt: 'Scheduling a class in the calendar',
                  video: `${VID}/kal.mp4`,
                  duration: 37.7,
                },
              ],
            },
          ],
        },
        {
          h2: 'Managing classes and promotions',
          p: 'Eva changes photos, prices and copy herself. She switches on a promotion in a few clicks and it is on the site right away: in the menu with a countdown and on the class page.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Classes',
                  text: 'A 25% summer promotion on a class, visible on the site right away.',
                  image: `${VID}/les.jpg`,
                  alt: 'Putting a promotion on a class',
                  video: `${VID}/les.mp4`,
                  duration: 33.8,
                },
              ],
            },
          ],
        },
        {
          h2: 'Running the web shop herself',
          p: 'Packing orders with one button, and scheduling a new collection as a drop. On the site the countdown starts right away, and anyone can pre-order.',
          visuals: [
            {
              kind: 'tabs',
              items: [
                {
                  name: 'Web shop',
                  text: 'Packing an order and scheduling a drop, with the countdown on the site.',
                  image: `${VID}/shop.jpg`,
                  alt: 'Scheduling a drop in the web shop',
                  video: `${VID}/shop.mp4`,
                  duration: 40.2,
                },
              ],
            },
          ],
        },
        {
          h2: 'Customer contact that runs itself',
          p: 'Every step has its own email in Tafereel’s house style, in Eva’s voice and from her own address. Customers always know where they stand.',
          link: { text: 'Feel it yourself: book a class or order a piece, and see which email you get.', label: 'To studiotafereel.com', href: SITE.href },
          visuals: [{ kind: 'mails', items: mails('en') }],
        },
        {
          h2: 'Paying and confirming without manual work',
          p: 'Customers pay through Stripe and get their confirmation through Gmail, from Eva’s own address. Instagram, Facebook, Meta Ads and Google hang off the same system.',
          visuals: [{ kind: 'logos', items: LOGOS }],
        },
        {
          h2: 'A site that books and sells',
          p: 'Warm and calm, like the studio. Visitors book a class, buy a piece or give a gift card, just as smoothly on a phone as on a computer.',
          visuals: [
            {
              kind: 'shot',
              image: `${IMG}/site-home.webp`,
              alt: 'The Tafereel homepage with the ink logo over a pottery wheel',
              link: { label: 'See it for yourself', href: SITE.href },
            },
          ],
        },
      ],
    },
    quote: {
      text: 'I used to have just my Instagram and a Google Form for bookings, and anyone who wanted to buy something paid by bank transfer. In the evenings I spent hours checking it all. Now it all runs by itself, and it still feels completely like Tafereel. I can simply focus on my craft again, and I am so happy about that.',
      name: 'Eva Vandoorne',
      role: 'Tafereel, Bruges',
      photo: `${IMG}/eva.webp`,
      draft: true,
    },
    result: {
      h2: 'The result',
      p: 'For a one-person studio every hour counts. This is what changed.',
      facts: [
        { value: '24/7', label: 'online booking and payment, even when the studio is closed' },
        { value: '35', label: 'emails that go out by themselves, in Eva’s own voice' },
        { value: '7', label: 'parts in one dashboard, from classes to ads' },
        { value: '0', label: 'times overbooked: a full class is really full' },
      ],
      before: 'Without a system',
      after: 'With the dashboard',
      rows: [
        { topic: 'Booking classes', before: 'Bookings through a Google Form, then following up everything by hand', after: 'Customers book and pay online themselves, the confirmation goes out by itself' },
        { topic: 'Payments', before: 'Checking bank transfers one by one', after: 'Paying online with Bancontact or card, processed right away' },
        { topic: 'Full classes', before: 'A cancellation becomes an empty seat', after: 'The waiting list gets an email the moment a seat opens up' },
        { topic: 'Selling', before: 'Selling pieces through messages on Instagram', after: 'Her own web shop with drops, pre-orders and gift cards' },
        { topic: 'Customer contact', before: 'Typing every confirmation and reminder yourself', after: '35 emails in her own style, each at the right moment' },
        { topic: 'Instagram', before: 'Making posts in separate apps, from scratch every time', after: 'Posts, stories and reels from her own templates, scheduled ahead' },
        { topic: 'Advertising', before: 'Figuring out Ads Manager or hiring an agency', after: 'Advertising herself, step by step, no agency needed' },
        { topic: 'Overview', before: 'Everything spread over Instagram, emails and notes', after: 'One dashboard with tasks, planning, revenue and customers' },
      ],
    },
  },
}

/* Volgorde = volgorde op /cases. ClearBin en Fidji Art komen hier bij. */
const CASES: Localized<CaseStudy>[] = [TAFEREEL]

export const getCases = (lang: Lang): CaseStudy[] => CASES.map((c) => c[lang])

export const getCase = (slug: string | undefined, lang: Lang): CaseStudy | undefined =>
  CASES.find((c) => c.en.slug === slug)?.[lang]

export const CASE_SLUGS = CASES.map((c) => c.en.slug)
