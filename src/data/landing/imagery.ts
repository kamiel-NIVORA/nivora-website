import type { Lang } from '@/i18n'

/**
 * Which Nivora photograph goes on which landing page.
 *
 * All of these are the studio's own images, already in /public. Using the real
 * library rather than generating stock keeps every page on-brand, keeps the
 * colour grading consistent with the rest of the site, and avoids the uncanny
 * details that give AI photography away at full width.
 *
 * The point of varying them is that 24 pages sharing one hero read as one page
 * republished. Assignment follows the page's subject: local AI pages get the
 * infrastructure and privacy imagery, software pages get the build imagery, and
 * the city pages cycle through the landscape set so neighbours never match.
 */

export type PageImagery = {
  /** Hero backdrop, behind the H1. */
  hero: string
  /** Backdrop for the pinned statement. */
  manifesto: string
  /** The band that breaks up the text middle, with its own alt text. */
  band: { src: string; alt: { en: string; nl: string } }
}

/* Alt text is written per image, not per page, because it describes what is in
   the frame. Repeating the page keyword here would help nobody and would be
   read aloud to anyone using a screen reader. */
const ALT = {
  aios: {
    en: 'A calm workspace with a single screen, the way an AI system should feel to work alongside',
    nl: 'Een rustige werkplek met één scherm, zoals samenwerken met een AI-systeem hoort aan te voelen',
  },
  local: {
    en: 'A closed folder on a desk, standing for data that stays inside the building',
    nl: 'Een gesloten map op een bureau, als beeld voor data die binnen de muren blijft',
  },
  build: {
    en: 'Design work in progress on a screen, part of building software to order',
    nl: 'Ontwerpwerk in uitvoering op een scherm, onderdeel van software op maat bouwen',
  },
  consulting: {
    en: 'Two people in conversation over a plan, which is where every project starts',
    nl: 'Twee mensen in gesprek over een plan, waar elk project mee begint',
  },
  landscape: {
    en: 'The Flemish landscape near Brugge, where Nivora works from',
    nl: 'Het Vlaamse landschap bij Brugge, van waaruit Nivora werkt',
  },
  coast: {
    en: 'The Belgian coastline, the working environment of much of West Flanders',
    nl: 'De Belgische kustlijn, de werkomgeving van een groot deel van West-Vlaanderen',
  },
} as const

const band = (src: string, alt: keyof typeof ALT) => ({ src, alt: ALT[alt] })

/**
 * Expliciete toewijzing per sector- en oplossingspagina.
 *
 * Dit moet ingevuld zijn, anders valt een pagina terug op CITY_CYCLE hieronder.
 * Dat is de landschapsreeks van de stadspagina's, en die staat daar goed maar
 * op een vakpagina niet: op de immokantoorpagina belandde zo een zwart schaap
 * in een groene heuvel midden in de tekst. Een lezer die over zoekertjes en
 * attesten leest, weet dan niet meer waar hij is.
 *
 * Alleen `band` doet er hier echt toe: hero en manifesto worden per pagina in
 * het contentbestand meegegeven en overschrijven wat hier staat.
 */
const SOLUTIONS: Record<string, PageImagery> = {
  /* Sectoren. */
  'niche-immo': {
    hero: '/landing/auto-sec-immo-hero.webp',
    manifesto: '/landing/auto-sec-immo-b.webp',
    band: { src: '/landing/auto-sec-immo-herenhuis.webp', alt: {
      en: 'A nineteenth century Flemish townhouse seen from across the street in evening light',
      nl: 'Een negentiende-eeuws Vlaams herenhuis, van over de straat gezien in avondlicht',
    } },
  },
  'niche-notaris': {
    hero: '/landing/auto-sec-notaris-a.webp',
    manifesto: '/landing/auto-sec-notaris-b.webp',
    band: band('/landing/auto-opl-termijnwachter-band.webp', 'aios'),
  },
  'niche-expertise': {
    hero: '/landing/auto-sec-expertise-a.webp',
    manifesto: '/landing/auto-sec-expertise-c.webp',
    band: band('/landing/auto-opl-fotodossier-band.webp', 'build'),
  },
  'niche-architect': {
    hero: '/landing/auto-sec-architect-a.webp',
    manifesto: '/landing/auto-sec-architect-b.webp',
    band: band('/landing/auto-opl-meetstaat-b.webp', 'build'),
  },
  'niche-aannemer': {
    hero: '/landing/auto-sec-bouw-a.webp',
    manifesto: '/landing/auto-sec-bouw-b.webp',
    band: band('/landing/auto-opl-werfbon-a.webp', 'build'),
  },
  'niche-installateur': {
    hero: '/landing/auto-sec-install-a.webp',
    manifesto: '/landing/auto-sec-install-b.webp',
    band: band('/landing/auto-opl-nietgefact-a.webp', 'aios'),
  },
  'niche-strandbar': {
    hero: '/landing/auto-sec-strandbar-hero.webp',
    manifesto: '/landing/auto-sec-strandbar-vol.webp',
    band: {
      src: '/landing/auto-sec-strandbar-a.webp',
      alt: {
        en: 'A beach bar counter with bentwood stools and the sea through an open frontage',
        nl: 'De toog van een strandbar met houten krukken en de zee door een open gevel',
      },
    },
  },
  'niche-boekhouder': {
    hero: '/landing/auto-sec-kantoor-a.webp',
    manifesto: '/landing/auto-sec-kantoor-b.webp',
    band: band('/landing/auto-opl-documentlaag-band.webp', 'aios'),
  },
  'niche-haven': {
    hero: '/landing/auto-brugge-zeebrugge.webp',
    manifesto: '/landing/auto-antwerpen-schip.webp',
    band: band('/landing/auto-antwerpen-magazijn.webp', 'build'),
  },

  /* Oplossingen. */
  'product-virtual-staging': {
    hero: '/landing/auto-staging-villa-vol.webp',
    manifesto: '/landing/auto-staging-appartement-leeg.webp',
    band: band('/landing/auto-staging-appartement-vol.webp', 'build'),
  },
  'product-pandboek': {
    hero: '/landing/auto-opl-pandboek-a.webp',
    manifesto: '/landing/auto-opl-pandboek-b.webp',
    band: band('/landing/auto-sec-immo-a.webp', 'consulting'),
  },
  'product-woninganalyse': {
    hero: '/landing/auto-opl-analyse-a.webp',
    manifesto: '/landing/auto-opl-analyse-b.webp',
    band: {
      src: '/landing/auto-opl-analyse-zolder.webp',
      alt: {
        en: 'A roof space with the underside of the tiles visible between bare rafters, no insulation',
        nl: 'Een zolder met de onderkant van de pannen zichtbaar tussen kale kepers, zonder isolatie',
      },
    },
  },

  /* De vijf strandbaroplossingen. Hero en manifesto staan per pagina in het
     contentbestand; hieronder telt alleen de band. Ze zijn zo verdeeld dat geen
     enkele pagina twee keer hetzelfde beeld draagt en dat de vijf kaarten in de
     rij op de sectorpagina allemaal van elkaar verschillen. */
  'product-strandbar-reservaties': {
    hero: '/landing/strandbar-opl-reservaties.webp',
    manifesto: '/landing/auto-sec-strandbar-a.webp',
    band: {
      src: '/landing/auto-brugge-horeca.webp',
      alt: {
        en: 'A café terrace on cobbles at first light, the parasols still closed',
        nl: 'Een caféterras op kasseien bij het eerste licht, de parasols nog dicht',
      },
    },
  },
  'product-strandbar-bed': {
    hero: '/landing/strandbar-opl-bed.webp',
    manifesto: '/landing/auto-oostende-kust.webp',
    band: {
      src: '/landing/auto-sec-horeca-a.webp',
      alt: {
        en: 'Rattan chairs and timber tables on decking facing an empty beach and the sea',
        nl: 'Rieten stoelen en houten tafels op een terrasvlonder met zicht op het strand en de zee',
      },
    },
  },
  'product-strandbar-dag': {
    hero: '/landing/strandbar-opl-dag.webp',
    manifesto: '/landing/auto-opl-antwoord-b.webp',
    band: {
      src: '/landing/auto-sec-strandbar-a.webp',
      alt: {
        en: 'A beach bar counter with bentwood stools and the sea through an open frontage',
        nl: 'De toog van een strandbar met houten krukken en de zee door een open gevel',
      },
    },
  },
  'product-strandbar-uren': {
    hero: '/landing/strandbar-opl-uren.webp',
    manifesto: '/landing/auto-brugge-horeca.webp',
    band: {
      src: '/landing/auto-sec-strandbar-b.webp',
      alt: {
        en: 'A beach bar terrace with long timber tables in low afternoon sun, the sea beyond',
        nl: 'Een strandbarterras met lange houten tafels in late namiddagzon, de zee erachter',
      },
    },
  },
  'product-strandbar-drukte': {
    hero: '/landing/strandbar-opl-drukte.webp',
    manifesto: '/landing/auto-sec-strandbar-vol.webp',
    band: {
      src: '/landing/auto-oostende-kust.webp',
      alt: {
        en: 'A white beach cabin on stilts in the dunes, with cyclists along the waterline behind it',
        nl: 'Een witte strandcabine op palen in de duinen, met fietsers langs de waterlijn erachter',
      },
    },
  },
}

/**
 * Terugval voor een pagina die hierboven nog geen regel heeft.
 *
 * Hier stond `CITY_CYCLE`, vier stellen beelden waar de zestien stadspagina's
 * doorheen roteerden zodat buren nooit op dezelfde foto uitkwamen. Die familie
 * bestaat niet meer (zie .nivora/geparkeerde-stadspaginas/), en elke pagina die
 * er nu is, staat expliciet in SOLUTIONS. Wat overblijft is één net stel voor
 * het geval iemand een pagina toevoegt en dit bestand vergeet: dan ziet ze er
 * gewoon uit in plaats van kapot, en het valt op omdat ze op niets slaat.
 */
const FALLBACK: PageImagery = {
  hero: '/home/hero-nivora.webp',
  manifesto: '/home/IMG_0743.webp',
  band: band('/services/nature-consulting.webp', 'landscape'),
}

export function imageryFor(id: string): PageImagery {
  return SOLUTIONS[id] ?? FALLBACK
}

export const bandAlt = (imagery: PageImagery, lang: Lang): string => imagery.band.alt[lang]
