import type { LandingFamily } from './types'

/**
 * The registry of every programmatic landing page: its stable id, its family,
 * and its slug in each language.
 *
 * Slugs differ per language on purpose — a Dutch page deserves a Dutch URL, and
 * the keyword in the URL is part of why these pages rank. `src/lib/pathAliases.ts`
 * derives the translation tables from this list, and src/i18n.tsx uses them so
 * the language switch, every <LangLink>, the canonical URL and the hreflang pair
 * all land on the right spelling.
 *
 * Convention: the ENGLISH slug is the canonical, language-agnostic key. Write
 * hrefs as `/${slugs.en}` everywhere; localizePath() produces the Dutch URL.
 *
 * This file stays small and free of page copy so it can be imported anywhere
 * (nav, footer, build scripts) without pulling in ~120 content modules.
 */

export type LandingEntry = {
  id: string
  family: LandingFamily
  /** The hub page this belongs to. Hubs point at themselves. */
  hub: string
  /** Slug per language, without the leading slash. */
  slugs: { en: string; nl: string }
}

export const LANDING_ENTRIES = [

  /* ── sectoren (tier N) ──
     Eén pagina per beroep, en niet meer dan dat. De set is bewust kort: negen
     sectoren waarin Nivora echt iets gebouwd heeft of echt iets kan tonen. De
     vorige opzet had er zesentwintig, waaronder twaalf losse havenpagina's en
     systeempagina's over IDMS, CPu en CargoWise. Die vielen elk apart te dun
     uit en concurreerden bovendien met elkaar op nagenoeg dezelfde zoekvraag;
     de havenketen staat nu als één sector op ./content/niche-haven.ts.

     De slug volgt overal hetzelfde patroon als de stadspagina's:
     `ai-automatisering-<sector>` in het Nederlands, `ai-automation-<sector>` in
     het Engels. Iemand die zoekt tikt zijn eigen vak in, niet een productnaam,
     en de Nederlandse slug draagt het woord dat het vak voor zichzelf gebruikt:
     een boekhouder zoekt "boekhoudkantoor", niet "accountancydienstverlener". */
  { id: 'niche-immo', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-estate-agency', nl: 'ai-automatisering-immokantoor' } },
  { id: 'niche-notaris', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-notary', nl: 'ai-automatisering-notariskantoor' } },
  { id: 'niche-expertise', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-loss-adjuster', nl: 'ai-automatisering-expertisekantoor' } },
  { id: 'niche-architect', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-architect', nl: 'ai-automatisering-architectenbureau' } },
  { id: 'niche-aannemer', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-building-contractor', nl: 'ai-automatisering-aannemer' } },
  { id: 'niche-installateur', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-installation-company', nl: 'ai-automatisering-installatiebedrijf' } },
  { id: 'niche-strandbar', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-beach-bar', nl: 'ai-automatisering-strandbar' } },
  { id: 'niche-boekhouder', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-accountancy-firm', nl: 'ai-automatisering-boekhoudkantoor' } },
  { id: 'niche-haven', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-port-logistics', nl: 'ai-automatisering-havensector' } },

  /* ── oplossingen: wat wij per sector echt bouwen ──
     Deze set wordt sector per sector opgebouwd, drie tot vijf per vak, in de
     taal van dat vak. De vorige set liep generiek over alle sectoren heen
     ("documenten niet meer overtypen") en stond daardoor overal een beetje en
     nergens helemaal juist. Die vijftien bestanden staan geparkeerd in
     .nivora/geparkeerde-oplossingen/, met een tabel erbij van welke bij welke
     sector hoort. Ze komen terug wanneer die sector aan de beurt is.

     Een sector zonder oplossingen krijgt geen oplossingenrij op zijn pagina.
     Dat is met opzet, en het is geregeld in solutionRailFor() in
     src/pages/LandingPage.tsx: geen items betekent geen blok.

     Immokantoren (klaar). */
  { id: 'product-virtual-staging', family: 'product', hub: 'products', slugs: { en: 'virtual-staging-empty-properties', nl: 'virtual-staging-lege-woning' } },
  { id: 'product-pandboek', family: 'product', hub: 'products', slugs: { en: 'property-book-for-every-viewer', nl: 'pandboek-voor-de-kandidaat-koper' } },
  { id: 'product-woninganalyse', family: 'product', hub: 'products', slugs: { en: 'property-analysis-from-your-photos', nl: 'woninganalyse-uit-uw-eigen-fotos' } },

  /* Strandbars (klaar). Vijf stuks, in de volgorde waarin ze gebouwd worden:
     alles vanaf de tweede leest uit de reservatielijst die de eerste aanlegt,
     dus die volgorde is geen smaakkwestie. De inhoud leunt op een echt gebouwd
     systeem voor een strandbar aan de kust en op het marktonderzoek in
     .nivora/research/oplossingen-kandidaten.md. */
  { id: 'product-strandbar-reservaties', family: 'product', hub: 'products', slugs: { en: 'beach-bar-reservations', nl: 'reservaties-voor-een-strandbar' } },
  { id: 'product-strandbar-bed', family: 'product', hub: 'products', slugs: { en: 'who-gets-the-bed', nl: 'wie-krijgt-het-bed' } },
  { id: 'product-strandbar-dag', family: 'product', hub: 'products', slugs: { en: 'your-day-on-one-screen', nl: 'de-dag-op-een-scherm' } },
  { id: 'product-strandbar-uren', family: 'product', hub: 'products', slugs: { en: 'staff-hours-and-availability', nl: 'uren-en-beschikbaarheid' } },
  { id: 'product-strandbar-drukte', family: 'product', hub: 'products', slugs: { en: 'how-busy-it-gets', nl: 'hoe-druk-het-wordt' } },

  /* De zestien stadspagina's (ai-automatisering-brugge, -gent, -antwerpen, ...)
     stonden hier tot augustus 2026. Ze zijn eruit: een stad verandert alleen de
     woorden rond het aanbod en niet wat er te koop is, dus zestien varianten van
     hetzelfde verhaal concurreerden met elkaar en met de sectorpagina's op
     nagenoeg dezelfde zoekvraag. De bestanden en wat er verder mee weg moest,
     staan in .nivora/geparkeerde-stadspaginas/ met een tabel erbij. */
] as const satisfies readonly LandingEntry[]

/** Literal union of every landing id, so related-links are compile-checked. */
export type LandingId = (typeof LANDING_ENTRIES)[number]['id']

export const BY_ID = new Map<string, LandingEntry>(LANDING_ENTRIES.map((e) => [e.id, e]))

const BY_SLUG = {
  en: new Map<string, LandingEntry>(LANDING_ENTRIES.map((e) => [e.slugs.en, e])),
  nl: new Map<string, LandingEntry>(LANDING_ENTRIES.map((e) => [e.slugs.nl, e])),
}

/** Look up an entry by the slug as spelled in `lang`. Exact match only: the
 *  Dutch slug does not resolve at the root, so each URL has one home. */
export const findLandingEntry = (slug: string | undefined, lang: 'en' | 'nl'): LandingEntry | undefined =>
  slug ? BY_SLUG[lang].get(slug) : undefined

/** Canonical, language-agnostic base path for an entry (always the EN spelling). */
export const landingBase = (entry: LandingEntry): string => `/${entry.slugs.en}`
