import type { Localized } from '@/i18n'
import { BY_ID, isDraft } from './slugs'

/**
 * De drie sectoren waarvoor Nivora een eigen pagina heeft.
 *
 * Dit bestand doet voor sectoren wat ./products.ts voor oplossingen doet: het
 * beschrijft elke sector kort genoeg om op een kaart te passen, zonder dat
 * daarvoor het volledige contentbestand ingeladen hoeft te worden.
 *
 * `solutions` staat overal leeg, en dat is de huidige stand en geen
 * vergetelheid. De acht oplossingspagina's die er stonden zijn in september 2026
 * verwijderd, samen met zes van de negen sectoren; zie het commentaar in
 * ./slugs.ts. Een lege lijst betekent dat er op die sectorpagina geen
 * oplossingenrij verschijnt, geregeld in solutionRailFor() in
 * src/pages/LandingPage.tsx, en dat is beter dan een rij die naar niets wijst.
 *
 * Kaarttitels blijven kort: de guard in scripts/prerender.mjs staat maximaal 22
 * tekens toe, en de volledige paginatitel ("AI-automatisering voor de
 * logistiek") past daar sowieso niet in.
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
    id: 'niche-logistiek',
    href: '/ai-automation-logistics',
    name: { en: 'Logistics', nl: 'Logistiek' },
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

/**
 * De sectoren die vandaag echt op het web staan.
 *
 * SECTORS beschrijft wat er geschreven is, dit is wat er getoond mag worden.
 * Een sector die in ./slugs.ts op `draft` staat, hoort nergens in de navigatie:
 * een link naar een pagina die 404 geeft is erger dan geen link. Voettekst,
 * homepage en de sitemappagina lezen daarom hieruit en niet uit SECTORS.
 *
 * Staat de lijst helemaal leeg, dan verdwijnt de sectorenkolom in de voettekst
 * en de sectorregel op de homepage vanzelf. Dat is met opzet: een lege kop is
 * slechter dan geen kop.
 */
export const VISIBLE_SECTORS: SectorSummary[] = SECTORS.filter(
  (sector) => !isDraft(BY_ID.get(sector.id) ?? {}),
)

/* Hier stond `sectorCards()`, dat alle sectoren als kaartenrij teruggaf. Die rij
   stond alleen op de stadspagina's, en die bestaan niet meer. Zie
   .nivora/geparkeerde-stadspaginas/. */
