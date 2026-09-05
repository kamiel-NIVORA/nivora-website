import type { Localized } from '@/i18n'

/**
 * De sectoren waarvoor Nivora een eigen pagina heeft, in één regel per stuk.
 *
 * Dit bestand doet voor sectoren wat ./products.ts voor oplossingen doet, en het
 * bestaat om dezelfde reden: een sectorpagina moet alle passende oplossingen
 * kunnen tonen zonder hun volledige contentbestanden in te laden. Het voedde
 * ook de sectorenrij op de stadspagina's, en die bestaan sinds augustus 2026
 * niet meer (zie .nivora/geparkeerde-stadspaginas/).
 *
 * `solutions` is de kern van de opzet. Een sectorpagina toont niet zomaar alle
 * oplossingen: op de havenpagina hoort geen meetstaat uit een bouwplan. Elke
 * sector wijst dus zelf aan welke oplossingen daar landen, en die volgorde is
 * ook de volgorde waarin ze op de kaartenrij verschijnen.
 *
 * Een lege `solutions` is geen vergetelheid maar de huidige stand van zaken. De
 * oplossingen worden sector per sector opnieuw geschreven, drie tot vijf per
 * vak, in de taal van dat vak; de immokantoren en de strandbars zijn klaar.
 * Zolang een sector leeg staat, verschijnt er op die pagina geen oplossingenrij,
 * en dat is beter dan een rij met oplossingen die niet bij dat vak geschreven
 * zijn. Het oude, generieke materiaal staat in .nivora/geparkeerde-oplossingen/,
 * met een tabel erbij van welk bestand bij welke sector hoort.
 *
 * Kaarttitels blijven kort: de guard in scripts/prerender.mjs staat maximaal 22
 * tekens toe, en de volledige paginatitel ("AI-automatisering voor een
 * scheepsagentuur") past daar sowieso niet in.
 */

export type SectorSummary = {
  id: string
  /** Canoniek Engels pad, <LangLink> vertaalt het per taal. */
  href: string
  /** Korte naam voor op een kaart. */
  name: Localized<string>
  blurb: Localized<string>
  image: string
  alt: Localized<string>
  /** Ids uit ./products.ts die in deze sector thuishoren, in volgorde. */
  solutions: string[]
}

export const SECTORS: SectorSummary[] = [
  {
    id: 'niche-immo',
    href: '/ai-automation-estate-agency',
    name: { en: 'Estate agency', nl: 'Immokantoor' },
    blurb: {
      en: 'Empty rooms in a listing, the same client questions every week, and files nobody can take over.',
      nl: 'Lege kamers in een zoekertje, elke week dezelfde klantvragen, en dossiers die niemand kan overnemen.',
    },
    image: '/landing/auto-staging-rijhuis-vol.webp',
    alt: {
      en: 'A townhouse living room furnished digitally, sofa, low table and a fitting rug',
      nl: 'Een leefruimte in een rijhuis digitaal ingericht, met zetel, lage tafel en passend tapijt',
    },
    solutions: ['product-virtual-staging', 'product-pandboek', 'product-woninganalyse'],
  },
  {
    id: 'niche-notaris',
    href: '/ai-automation-notary',
    name: { en: 'Notary office', nl: 'Notariskantoor' },
    blurb: {
      en: 'Certificates that have to be in before the deadline, and files nobody can take over.',
      nl: 'Attesten die er voor de termijn moeten zijn, en dossiers die niemand kan overnemen.',
    },
    image: '/landing/auto-sec-notaris-a.webp',
    alt: {
      en: 'A notary consultation room with a long oak table and a wall of bound registers',
      nl: 'Een notariële besprekingsruimte met een lange eiken tafel en een wand met ingebonden registers',
    },
    solutions: [],
  },
  {
    id: 'niche-expertise',
    href: '/ai-automation-loss-adjuster',
    name: { en: 'Loss adjuster', nl: 'Expertisekantoor' },
    blurb: {
      en: 'Two hundred photos per claim, a report the insurer wants back inside the week.',
      nl: 'Tweehonderd foto\'s per schadegeval, en een verslag dat binnen de week terug moet.',
    },
    image: '/landing/auto-sec-expertise-a.webp',
    alt: {
      en: 'An empty room after a water leak, a stain across the ceiling and lifted parquet',
      nl: 'Een lege kamer na een waterlek, een vlek over het plafond en opgestoken parket',
    },
    solutions: [],
  },
  {
    id: 'niche-architect',
    href: '/ai-automation-architect',
    name: { en: 'Architects', nl: 'Architectenbureau' },
    blurb: {
      en: 'A design that keeps moving, and a fee that was fixed at the first sketch.',
      nl: 'Een ontwerp dat blijft schuiven, en een ereloon dat bij de eerste schets vastlag.',
    },
    image: '/landing/auto-sec-architect-a.webp',
    alt: {
      en: 'An architecture studio with rolled drawings and white card models on a long table',
      nl: 'Een architectenatelier met planrollen en witte kartonnen maquettes op een lange tafel',
    },
    solutions: [],
  },
  {
    id: 'niche-aannemer',
    href: '/ai-automation-building-contractor',
    name: { en: 'Building contractor', nl: 'Aannemer' },
    blurb: {
      en: 'Extra work that never leaves the site, and quotes measured up by hand two evenings long.',
      nl: 'Meerwerk dat nooit van de werf vertrekt, en offertes die u twee avonden met de hand opmeet.',
    },
    image: '/landing/auto-opl-werfbon-b.webp',
    alt: {
      en: 'A tidy site office desk with a helmet and a tape measure beside a laptop',
      nl: 'Een opgeruimd werfkantoor met een helm en een rolmeter naast een laptop',
    },
    solutions: [],
  },
  {
    id: 'niche-installateur',
    href: '/ai-automation-installation-company',
    name: { en: 'Installation company', nl: 'Installatiebedrijf' },
    blurb: {
      en: 'Work done and parts ordered, and months later no invoice ever went out for it.',
      nl: 'Werk gedaan en materiaal besteld, en maanden later is er nooit een factuur voor vertrokken.',
    },
    image: '/landing/auto-opl-nietgefact-b.webp',
    alt: {
      en: 'A calm accounts desk with an open ledger and a pen, a modern office behind',
      nl: 'Een rustig bureau met een open register en een pen, een modern kantoor erachter',
    },
    solutions: [],
  },
  {
    id: 'niche-strandbar',
    href: '/ai-automation-beach-bar',
    name: { en: 'Beach bar', nl: 'Strandbar' },
    blurb: {
      en: 'Rostering and ordering on gut feeling, two days before you know how busy it gets.',
      nl: 'Volk inzetten en bestellen op gevoel, twee dagen voor u weet hoe druk het wordt.',
    },
    image: '/landing/auto-sec-strandbar-hero.webp',
    alt: {
      en: 'Beach club daybeds under white parasols along a pool, the sea just beyond',
      nl: 'Ligbedden van een strandclub onder witte parasols langs een zwembad, met de zee erachter',
    },
    /* De bouwvolgorde, en dat is hier ook de leesvolgorde: de reservatielijst
       uit de eerste is waar de tweede, derde en vierde uit lezen. */
    solutions: [
      'product-strandbar-reservaties',
      'product-strandbar-bed',
      'product-strandbar-dag',
      'product-strandbar-uren',
      'product-strandbar-drukte',
    ],
  },
  {
    id: 'niche-boekhouder',
    href: '/ai-automation-accountancy-firm',
    name: { en: 'Accountancy firm', nl: 'Boekhoudkantoor' },
    blurb: {
      en: 'Files nobody can take over, and the same thirty client questions every week.',
      nl: 'Dossiers die niemand kan overnemen, en elke week dezelfde dertig klantvragen.',
    },
    image: '/landing/auto-sec-kantoor-a.webp',
    alt: {
      en: 'Two desks facing each other in a modern office, one of them empty',
      nl: 'Twee bureaus tegenover elkaar in een modern kantoor, één ervan leeg',
    },
    solutions: [],
  },
  {
    id: 'niche-haven',
    href: '/ai-automation-port-logistics',
    name: { en: 'Port and logistics', nl: 'Havensector' },
    blurb: {
      en: 'Declarations, releases and time slots, each in a different system and each on a clock.',
      nl: 'Aangiftes, vrijgaven en tijdsloten, elk in een ander systeem en elk op een klok.',
    },
    image: '/landing/auto-brugge-zeebrugge.webp',
    alt: {
      en: 'A container terminal quay with gantry cranes along the waterside',
      nl: 'Een containerkaai met portaalkranen langs het water',
    },
    solutions: [],
  },
]

export const SECTOR_BY_ID = new Map(SECTORS.map((s) => [s.id, s]))

/* Hier stond `sectorCards()`, dat alle sectoren als kaartenrij teruggaf. Die rij
   stond alleen op de stadspagina's, en die bestaan niet meer. Zie
   .nivora/geparkeerde-stadspaginas/. */
