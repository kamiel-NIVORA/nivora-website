import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { aliasBase, canonicalBase } from '@/lib/pathAliases'

/**
 * Site-wide language layer. The whole site is bilingual (English + Dutch).
 *
 * The URL is the source of truth for language, so every language has its own
 * indexable address: English lives at the root (`/`, `/about`, ...) and Dutch
 * under a `/nl` prefix (`/nl`, `/nl/about`, ...). This lets Google index and
 * rank each language separately (with hreflang, see src/lib/seo.ts), which the
 * old runtime-only toggle could not do. The nav toggle simply navigates between
 * the two URLs.
 *
 *  Usage in a component:
 *    const { lang } = useLang()
 *    const t = COPY[lang]            // COPY = { en: {...}, nl: {...} }
 *
 *  Usage in a data file:
 *    export const getThing = (lang: Lang) => THING_COPY[lang]   // Localized<T>
 */

export type Lang = 'en' | 'nl'
export const LANGS: Lang[] = ['en', 'nl']

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'nivora.lang'

/* A handful of pages are spelled differently per language, so that a Dutch page
   gets a Dutch URL: /ai-automation vs /nl/ai-automatisering (see
   src/lib/pathAliases.ts). The canonical, language-agnostic base is always the
   ENGLISH spelling, so callers can keep treating `base` as one key. For every
   other route both tables are empty and these three functions behave exactly as
   they did before. */

/** Split a pathname into its language and the language-agnostic base path.
 *  '/nl/about' -> { lang: 'nl', base: '/about' }; '/about' -> { lang: 'en', base: '/about' }
 *  '/nl/ai-automatisering' -> { lang: 'nl', base: '/ai-automation' } */
export function splitLangPath(pathname: string): { lang: Lang; base: string } {
  if (pathname === '/nl' || pathname.startsWith('/nl/')) {
    const raw = pathname.slice(3)
    return { lang: 'nl', base: canonicalBase(raw.startsWith('/') ? raw : '/') }
  }
  return { lang: 'en', base: pathname || '/' }
}

/** Build the URL for a base path in a given language. langHref('nl', '/about') -> '/nl/about'.
 *  Accepts either spelling of the base and always emits the one `lang` uses. */
export function langHref(lang: Lang, base: string): string {
  const spelled = aliasBase(canonicalBase(base), lang)
  if (lang !== 'nl') return spelled
  return spelled === '/' ? '/nl' : `/nl${spelled}`
}

/** Prefix an internal href with the active language so navigation stays in-language.
 *  Leaves external links, anchors, mailto/tel and already-prefixed /nl links alone.
 *  Paths keep their query/hash ('/waitlist?product=box' -> '/nl/waitlist?product=box'). */
export function localizePath(href: string, lang: Lang): string {
  if (!href.startsWith('/')) return href // http(s), #, mailto:, tel:, relative
  if (href === '/nl' || href.startsWith('/nl/')) return href

  // Split off ?query / #hash so only the path is translated.
  const cut = href.search(/[?#]/)
  const path = cut === -1 ? href : href.slice(0, cut)
  const rest = cut === -1 ? '' : href.slice(cut)

  return `${langHref(lang, path)}${rest}`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang } = splitLangPath(location.pathname)

  useEffect(() => {
    try {
      document.documentElement.lang = lang
    } catch {
      /* no document (tests) — ignore */
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore persistence failures */
    }
  }, [lang])

  const setLang = useCallback(
    (next: Lang) => {
      const { base } = splitLangPath(window.location.pathname)
      const target = langHref(next, base)
      navigate(`${target}${window.location.search}${window.location.hash}`)
    },
    [navigate],
  )

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return ctx
}

/** A value that exists in both languages. */
export type Localized<T> = { en: T; nl: T }

/** Resolve a `Localized` value for the active language (for data files). */
export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang]
}
