/**
 * De landingspagina's die er niet meer zijn, met hun slug in beide talen.
 *
 * Waarom dit bestand bestaat, en niet alleen een lijstje in vercel.json: de
 * Edge Middleware moet ze ook kennen. Vercel draait de middleware VÓÓR de
 * rewrites, dus zonder deze lijst pakt de taalredirect een verdwenen Engelse
 * URL op, plakt er blind /nl voor (de slug staat immers niet meer in de
 * vertaaltabel van ./slugs.ts) en levert een 404 af op een pad dat nooit heeft
 * bestaan. De rewrite naar /api/gone komt dan niet meer aan bod, en de 410 die
 * we bedoelden wordt een 404.
 *
 * Staat een pad hier, dan laat de middleware het met rust en handelt vercel.json
 * het af: een 410 via /api/gone, of een 308 naar de pagina die de vraag
 * overneemt. Beide talen krijgen zo hetzelfde antwoord, zonder omweg.
 *
 * Bij het schrappen van een pagina horen dus twee dingen: de regel hier
 * bijzetten, en de bijbehorende regel in vercel.json. De lijst hoort nooit een
 * slug te bevatten die nog in LANDING_ENTRIES staat; daar waakt de guard
 * onderaan over.
 */
import { LANDING_ENTRIES } from './slugs'

/** Verdwenen in september 2026, toen de negen sectoren er drie werden. */
export const RETIRED_SLUGS: readonly { en: string; nl: string }[] = [
  /* Sectoren zonder opvolger. */
  { en: 'ai-automation-loss-adjuster', nl: 'ai-automatisering-expertisekantoor' },
  { en: 'ai-automation-installation-company', nl: 'ai-automatisering-installatiebedrijf' },
  { en: 'ai-automation-accountancy-firm', nl: 'ai-automatisering-boekhoudkantoor' },
  { en: 'ai-automation-beach-bar', nl: 'ai-automatisering-strandbar' },
  /* Sectoren die naar een blijvende pagina doorverwijzen. */
  { en: 'ai-automation-notary', nl: 'ai-automatisering-notariskantoor' },
  { en: 'ai-automation-building-contractor', nl: 'ai-automatisering-aannemer' },
  /* De havensector heet nu logistiek; de oude spelling verwijst door. */
  { en: 'ai-automation-port-logistics', nl: 'ai-automatisering-havensector' },
  /* Oplossingen: immo, verkoopkant. */
  { en: 'virtual-staging-empty-properties', nl: 'virtual-staging-lege-woning' },
  { en: 'property-book-for-every-viewer', nl: 'pandboek-voor-de-kandidaat-koper' },
  { en: 'property-analysis-from-your-photos', nl: 'woninganalyse-uit-uw-eigen-fotos' },
  /* Oplossingen: strandbar. */
  { en: 'beach-bar-reservations', nl: 'reservaties-voor-een-strandbar' },
  { en: 'who-gets-the-bed', nl: 'wie-krijgt-het-bed' },
  { en: 'your-day-on-one-screen', nl: 'de-dag-op-een-scherm' },
  { en: 'staff-hours-and-availability', nl: 'uren-en-beschikbaarheid' },
  { en: 'how-busy-it-gets', nl: 'hoe-druk-het-wordt' },
] as const

/** Elk verdwenen pad, met leidende slash, in beide talen zoals ze op de site
 *  stonden: het Engelse aan de wortel, het Nederlandse onder /nl. */
export const RETIRED_PATHS: ReadonlySet<string> = new Set(
  RETIRED_SLUGS.flatMap((s) => [`/${s.en}`, `/nl/${s.nl}`]),
)

/* Een slug kan niet tegelijk levend en verdwenen zijn. Gebeurt dat toch, dan is
   er een pagina teruggezet zonder deze lijst bij te werken, en dan zou de
   middleware hem laten vallen terwijl hij bestaat. Falen bij het bouwen is dan
   beter dan een pagina die stil onbereikbaar wordt. */
for (const entry of LANDING_ENTRIES) {
  if (RETIRED_PATHS.has(`/${entry.slugs.en}`) || RETIRED_PATHS.has(`/nl/${entry.slugs.nl}`)) {
    throw new Error(
      `retired.ts: "${entry.id}" staat zowel in LANDING_ENTRIES als in RETIRED_SLUGS. ` +
        'Haal hem uit een van de twee.',
    )
  }
}
