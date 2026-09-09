import type { Lang } from '@/i18n'
import type { LandingEntry } from './slugs'

/**
 * Leesbare titels voor de landingspagina's.
 *
 * Een slug leest zelden terug als een titel, en de sitemappagina heeft er een
 * nodig voor elke pagina. Dit bestand levert die, en niets meer.
 */

/* Een slug leest zelden terug als label: "AI-automatisering-boekhoudkantoor" is
   geen woord dat iemand zou schrijven, en een oplossing heet naar wat ze doet en
   niet naar haar URL. Daarom staat hier per pagina een echt label. Alles wat
   hier niet in staat, valt terug op de slug, zodat een nieuwe pagina nooit stuk
   kan door een vergeten regel. */
const LABELS: Partial<Record<string, { en: string; nl: string }>> = {
  'niche-immo': { en: 'Estate agencies', nl: 'Immokantoren' },
  'niche-architect': { en: 'Architects', nl: 'Architectenbureaus' },
  'niche-logistiek': { en: 'Logistics', nl: 'Logistiek' },
  /* De offerpagina's onder /architecten/. Zonder deze regels valt humanise()
     terug op de slug en leest de sitemappagina "Architecten/wedstrijd-radar". */
  'offer-wedstrijd-radar': { en: 'Wedstrijd-Radar', nl: 'De Wedstrijd-Radar' },
  'offer-kandidatuur-machine': { en: 'Kandidatuur-Machine', nl: 'De Kandidatuur-Machine' },
  'offer-wedstrijd-intelligence': { en: 'Wedstrijd-Intelligence', nl: 'Wedstrijd-Intelligence en Cijfers' },
  'offer-wedstrijd-cockpit': { en: 'Wedstrijd-Cockpit', nl: 'De Wedstrijd-Cockpit' },
  'offer-wedstrijd-terugblik': { en: 'Wedstrijd-Terugblik', nl: 'De Wedstrijd-Terugblik (gratis)' },
}

/** 'ai-automation-ghent' -> 'AI automation Ghent' / 'AI-automatisering Gent'.
 *  Shared with the sitemap page so one slug always reads the same way. */
export function humanise(entry: LandingEntry, lang: Lang): string {
  const label = LABELS[entry.id]?.[lang]
  if (label) return label
  const words = entry.slugs[lang].split('-')
  return words
    .map((w, i) => (w === 'ai' ? 'AI' : i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(lang === 'nl' ? '-' : ' ')
    .replace(/^AI-/, 'AI-')
}

/* Hier stond resolveRelated(), dat per pagina een blok verwante links afleidde,
   plus het component RelatedPages dat het toonde. Geen van beide werd nog
   gerenderd: de landingspagina's zetten hun eigen linkGrid-blok in de content,
   waar per pagina staat waar hij heen wijst in plaats van dat een regel het
   afleidt. Het veld `related` op LandingPage deed daardoor niets, en dat is
   erger dan dood: wie het invulde dacht een link te leggen die er nooit kwam.

   Wat hier overblijft is humanise(), dat de sitemappagina gebruikt om een slug
   als een leesbare titel te tonen. */
