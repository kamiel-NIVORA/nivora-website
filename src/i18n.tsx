import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Site-wide language layer. The whole site is bilingual (English + Dutch) and
 * switches at runtime, with no page reload. The chosen language is remembered in
 * localStorage and, on a first visit, guessed from the browser language. There
 * is no URL routing per language on purpose: the toggle in the nav is meant to
 * be one clean, simple control, exactly as asked.
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

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'nl') return saved
  } catch {
    /* localStorage can throw in private modes — fall back to detection */
  }
  const nav =
    (typeof navigator !== 'undefined' && navigator.language) || ''
  return nav.toLowerCase().startsWith('nl') ? 'nl' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    try {
      document.documentElement.lang = lang
    } catch {
      /* no document (tests) — ignore */
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore persistence failures */
    }
  }, [])

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
