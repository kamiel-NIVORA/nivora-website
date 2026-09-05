import { LANDING_ENTRIES } from '@/data/landing/slugs'

/**
 * Base paths that are spelled differently per language.
 *
 * Only the programmatic landing pages need this: `/ai-automation` in English is
 * `/ai-automatisering` in Dutch, because the keyword in the URL is part of why
 * those pages rank. Every original route (/about, /services/:slug, /blog, ...)
 * shares one base path in both languages, so it appears in neither table and the
 * behaviour of langHref/localizePath stays byte-identical there.
 *
 * Keep this module free of React and of anything that imports src/i18n, so the
 * i18n layer can import it without a cycle.
 */

const enToNl: Record<string, string> = {}
const nlToEn: Record<string, string> = {}

for (const entry of LANDING_ENTRIES) {
  // Widened to string: the registry is `as const`, so TypeScript can prove the
  // current slugs never coincide. Some will later (a page like "aios" is spelled
  // the same in both languages) and must stay out of the tables.
  const en: string = entry.slugs.en
  const nl: string = entry.slugs.nl
  if (en === nl) continue
  enToNl[`/${en}`] = `/${nl}`
  nlToEn[`/${nl}`] = `/${en}`
}

export const EN_TO_NL: Readonly<Record<string, string>> = enToNl
export const NL_TO_EN: Readonly<Record<string, string>> = nlToEn

/** Spell a base path the way `lang` spells it. Identity for every path that is
 *  the same in both languages, which is the whole original site. */
export function aliasBase(base: string, lang: 'en' | 'nl'): string {
  return lang === 'nl' ? (EN_TO_NL[base] ?? base) : (NL_TO_EN[base] ?? base)
}

/** Normalise any spelling of a base path back to its canonical English form. */
export const canonicalBase = (base: string): string => NL_TO_EN[base] ?? base
