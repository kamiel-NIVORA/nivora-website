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
  /**
   * Deze pagina bestaat alleen in het Nederlands.
   *
   * Voor onderwerpen die alleen in Vlaanderen bestaan. De offerpagina's voor
   * architecten gaan over de Open Oproep, e-Procurement, het UEA en de Vlaamse
   * Bouwmeester: een Engelse vertaling daarvan bedient niemand, en ze zou het
   * domein verdunnen met pagina's die wereldwijd meedingen zonder publiek.
   *
   * Gevolg op drie plaatsen: de build schrijft geen Engelse shell en zet alleen
   * de Nederlandse URL in sitemap.xml, useSeo laat de hreflang naar en weg en
   * wijst x-default naar het Nederlands, en vercel.json stuurt het Engelse pad
   * met een 308 naar /nl. Zulke entries dragen daarom in beide talen DEZELFDE
   * slug: er is maar één spelling, want er is maar één pagina.
   */
  nlOnly?: true
  /**
   * Nog niet publiek.
   *
   * De pagina blijft volledig bestaan in de repo, maar de build maakt er geen
   * shell voor, ze staat niet in sitemap.xml, er wordt nergens naartoe gelinkt,
   * en de router geeft er een 404 op. Terugzetten is deze regel weghalen.
   *
   * Bedoeld voor werk dat af genoeg is om te bewaren en niet af genoeg om te
   * tonen. Beter dan een pagina op noindex zetten: die blijft bereikbaar voor
   * wie het adres heeft, en dat is niet wat "nog niet online" betekent.
   */
  draft?: true
}

export const LANDING_ENTRIES = [

  /* ── sectoren ──
     Drie. Niet negen, en niet zesentwintig zoals de opzet daarvoor.

     De set is niet gekozen op marktomvang maar op leverage: bij een
     architectenbureau kan Kamiel meekijken en valideren, bij de immosector loopt
     een gesprek over de aankoopkant, en voor de logistiek ligt er al een keer een
     volledige uitwerking klaar. Zes sectoren zijn er in september 2026 uit
     gegaan (notariskantoor, expertisekantoor, aannemer, installatiebedrijf,
     boekhoudkantoor en strandbar), omdat negen vakken tegelijk leren meer tijd
     kostte dan er per vak iets goed van te maken. Wat daarvan weg moest en
     waarheen het verwijst, staat in de redirects in vercel.json.

     De havensector heet nu logistiek. Dat is het woord waarmee het vak zichzelf
     aanduidt en waarmee er ook echt gezocht wordt; "havensector" is een plek,
     geen bedrijfstak. De oude slug blijft via een 301 werken.

     De slug volgt overal hetzelfde patroon: `ai-automatisering-<sector>` in het
     Nederlands, `ai-automation-<sector>` in het Engels. Iemand die zoekt tikt
     zijn eigen vak in, niet een productnaam, en de Nederlandse slug draagt het
     woord dat het vak voor zichzelf gebruikt. */
  { id: 'niche-immo', draft: true, family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-estate-agency', nl: 'ai-automatisering-immokantoor' } },
  { id: 'niche-architect', family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-architect', nl: 'ai-automatisering-architectenbureau' } },
  { id: 'niche-logistiek', draft: true, family: 'niche', hub: 'sectors', slugs: { en: 'ai-automation-logistics', nl: 'ai-automatisering-logistiek' } },

  /* ── oplossingen ──
     Leeg, en dat is een stand van zaken en geen vergetelheid.

     Hier stonden acht oplossingspagina's: drie voor de verkoopkant van de immo
     (virtual staging, pandboek, woninganalyse) en vijf voor strandbars. Ze zijn
     er in september 2026 samen uit gegaan. De strandbars omdat die sector weg
     is, en de drie immopagina's omdat ze over de VERKOOPkant gingen terwijl het
     werk naar de aankoopkant verschuift. De slugs van de strandbarpagina's
     (`wie-krijgt-het-bed`, `de-dag-op-een-scherm`) waren bovendien interne
     metaforen en geen woorden die iemand intikt.

     Wat hier terugkomt is één oplossing, tweemaal: de perceelgeschiedenis uit
     een adres, voor de architect en voor de koper. Zolang die pagina's niet
     geschreven zijn, staat hier niets, en toont een sectorpagina geen
     oplossingenrij. Dat is geregeld in solutionRailFor() in
     src/pages/LandingPage.tsx: geen items betekent geen blok. */

  /* ── aanbod voor architectenbureaus (tier N+1) ──
     Vijf pagina's onder /architecten/, en dat pad is geen sier: Google leest ze
     als één cluster rond hetzelfde onderwerp, de sectorpagina geeft autoriteit
     door aan de kinderen, en er kunnen er later bij zonder dat de structuur
     breekt.

     Alle vijf staan op nlOnly. Ze gaan over de Open Oproep van de Vlaamse
     Bouwmeester, over het federale e-Procurementplatform en over het UEA zoals
     het hier ingevuld wordt. Alleen de Open Oproep bestaat uitsluitend in
     Vlaanderen; het UEA en e-Procurement bestaan breder. Maar het publiek voor
     deze pagina's leest Nederlands, dus is er niets te vertalen dat iemand
     helpt.

     Vier ervan zijn te koop, de vijfde is de gratis aanleiding om te bellen en
     staat daarom in elke CTA van de andere vier. */
  { id: 'offer-wedstrijd-radar', family: 'product', hub: 'niche-architect', nlOnly: true, slugs: { en: 'architecten/wedstrijd-radar', nl: 'architecten/wedstrijd-radar' } },
  { id: 'offer-kandidatuur-machine', family: 'product', hub: 'niche-architect', nlOnly: true, slugs: { en: 'architecten/kandidatuur-machine', nl: 'architecten/kandidatuur-machine' } },
  { id: 'offer-wedstrijd-intelligence', family: 'product', hub: 'niche-architect', nlOnly: true, slugs: { en: 'architecten/wedstrijd-intelligence', nl: 'architecten/wedstrijd-intelligence' } },
  { id: 'offer-wedstrijd-cockpit', family: 'product', hub: 'niche-architect', nlOnly: true, slugs: { en: 'architecten/wedstrijd-cockpit', nl: 'architecten/wedstrijd-cockpit' } },
  { id: 'offer-wedstrijd-terugblik', family: 'product', hub: 'niche-architect', nlOnly: true, slugs: { en: 'architecten/wedstrijd-terugblik', nl: 'architecten/wedstrijd-terugblik' } },

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

/** Staat deze pagina nog niet online? Zie het commentaar bij `draft` hierboven. */
export const isDraft = (entry: LandingEntry | { draft?: true }): boolean =>
  'draft' in entry && entry.draft === true

/** Bestaat deze pagina alleen in het Nederlands? Leest de optionele vlag zonder
 *  dat de aanroeper hoeft te weten dat `as const` hem op sommige entries
 *  helemaal weglaat. */
export const isNlOnly = (entry: LandingEntry | { nlOnly?: true }): boolean =>
  'nlOnly' in entry && entry.nlOnly === true

/** Canonical, language-agnostic base path for an entry (always the EN spelling). */
export const landingBase = (entry: LandingEntry): string => `/${entry.slugs.en}`
