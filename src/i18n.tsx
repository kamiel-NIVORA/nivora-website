import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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

/** Split a pathname into its language and the language-agnostic base path.
 *  '/nl/about' -> { lang: 'nl', base: '/about' }; '/about' -> { lang: 'en', base: '/about' } */
export function splitLangPath(pathname: string): { lang: Lang; base: string } {
  if (pathname === '/nl' || pathname.startsWith('/nl/')) {
    const base = pathname.slice(3)
    return { lang: 'nl', base: base.startsWith('/') ? base : '/' }
  }
  return { lang: 'en', base: pathname || '/' }
}

/** Build the URL for a base path in a given language. langHref('nl', '/about') -> '/nl/about'. */
export function langHref(lang: Lang, base: string): string {
  if (lang !== 'nl') return base
  return base === '/' ? '/nl' : `/nl${base}`
}

/** Prefix an internal href with the active language so navigation stays in-language.
 *  Leaves external links, anchors, mailto/tel and already-prefixed /nl links alone.
 *  Handpaths keep their query/hash ('/waitlist?product=box' -> '/nl/waitlist?product=box'). */
export function localizePath(href: string, lang: Lang): string {
  if (lang !== 'nl') return href
  if (!href.startsWith('/')) return href // http(s), #, mailto:, tel:, relative
  if (href === '/nl' || href.startsWith('/nl/')) return href
  return href === '/' ? '/nl' : `/nl${href}`
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
