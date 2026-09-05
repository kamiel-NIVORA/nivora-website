import type { Lang } from '@/i18n'
import type { LandingLink, LandingPage } from './types'
import { LANDING_ENTRIES, type LandingEntry } from './slugs'

/**
 * Internal link mesh.
 *
 * Every landing page ends with a block of related pages, derived by rule rather
 * than written by hand, so no page can end up orphaned as the set grows: a page
 * leans on its siblings within the same family, then on the services behind it.
 *
 * Labels come from the registry's slug, humanised, until a page has content of
 * its own to borrow a title from. Hrefs are always the canonical ENGLISH base;
 * <LangLink> translates them per language.
 */

/* Een slug leest zelden terug als label: "AI-automatisering-boekhoudkantoor" is
   geen woord dat iemand zou schrijven, en een oplossing heet naar wat ze doet en
   niet naar haar URL. Daarom staat hier per pagina een echt label. Alles wat
   hier niet in staat, valt terug op de slug, zodat een nieuwe pagina nooit stuk
   kan door een vergeten regel. */
const LABELS: Partial<Record<string, { en: string; nl: string }>> = {
  'product-virtual-staging': { en: 'From an empty room to a furnished home', nl: 'Van lege kamer naar ingericht huis' },
  'product-pandboek': { en: 'Every candidate gets their own page', nl: 'Elke kandidaat krijgt zijn eigen blad' },
  'product-woninganalyse': { en: 'What the property still needs doing', nl: 'Wat er aan het pand te doen valt' },
  'product-strandbar-reservaties': { en: 'Bookings out of WhatsApp', nl: 'Reservaties weg uit WhatsApp' },
  'product-strandbar-bed': { en: 'Who gets a spot on a full Saturday', nl: 'Wie krijgt er een plaats op een volle zaterdag' },
  'product-strandbar-dag': { en: 'The day on one screen', nl: 'De dag op één scherm' },
  'product-strandbar-uren': { en: 'Hours and availability', nl: 'Uren en beschikbaarheid' },
  'product-strandbar-drukte': { en: 'How busy it gets, two days out', nl: 'Hoe druk het wordt, twee dagen op voorhand' },
  'niche-immo': { en: 'Estate agencies', nl: 'Immokantoren' },
  'niche-notaris': { en: 'Notary offices', nl: 'Notariskantoren' },
  'niche-expertise': { en: 'Loss adjusters', nl: 'Expertisekantoren' },
  'niche-architect': { en: 'Architects', nl: 'Architectenbureaus' },
  'niche-aannemer': { en: 'Contractors', nl: 'Aannemers' },
  'niche-installateur': { en: 'Installers', nl: 'Installateurs' },
  'niche-strandbar': { en: 'Beach bars', nl: 'Strandbars' },
  'niche-boekhouder': { en: 'Accountancy firms', nl: 'Boekhoudkantoren' },
  'niche-haven': { en: 'Port and logistics', nl: 'Havensector' },
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

const toLink = (entry: LandingEntry, lang: Lang): LandingLink => ({
  label: humanise(entry, lang),
  href: `/${entry.slugs.en}`,
})

/** The core services, always worth linking to from a landing page. */
const SERVICE_LINKS: Record<Lang, LandingLink[]> = {
  en: [
    { label: 'Local AI', href: '/services/local-ai' },
    { label: 'AIOS', href: '/services/aios' },
    { label: 'AI Consulting', href: '/services/ai-consulting' },
    { label: 'App Design', href: '/services/app-design' },
  ],
  nl: [
    { label: 'Local AI', href: '/services/local-ai' },
    { label: 'AIOS', href: '/services/aios' },
    { label: 'AI Consulting', href: '/services/ai-consulting' },
    { label: 'App Design', href: '/services/app-design' },
  ],
}

/**
 * Resolve the related-links block for one page. Returns 6 to 8 links: siblings
 * within the same family first (they share search intent), then the services
 * that back the page up.
 *
 * De stadspagina's overschreven die broers en zussen met hun echte buren uit
 * `geo.nearby`, zodat het net de aardrijkskunde volgde. Die familie bestaat niet
 * meer, dus die tak is weg; zie .nivora/geparkeerde-stadspaginas/.
 */
export function resolveRelated(entry: LandingEntry, lang: Lang, page?: LandingPage | null): LandingLink[] {
  const extra = page?.related

  const siblings: LandingEntry[] = LANDING_ENTRIES.filter(
    (e) => e.family === entry.family && e.id !== entry.id,
  ).slice(0, 3)

  /* De vroegere hubpagina's (/ai-oplossingen, /ai-per-beroep, ...) stonden wel
     in de registry maar bestonden nooit als pagina, dus elke verwijzing ernaar
     was een 404. De sitemappagina doet dat werk nu, en die bestaat wel. */
  const links: LandingLink[] = [
    ...siblings.map((e) => toLink(e, lang)),
    ...(extra ?? []),
    ...SERVICE_LINKS[lang],
  ]

  // De-duplicate by href, keeping the first (most relevant) occurrence.
  const seen = new Set<string>()
  return links.filter((l) => !seen.has(l.href) && seen.add(l.href)).slice(0, 8)
}
