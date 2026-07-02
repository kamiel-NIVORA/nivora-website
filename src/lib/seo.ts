import { useEffect } from 'react'
import { useLang, splitLangPath, langHref } from '@/i18n'

/**
 * Site-wide SEO layer. One hook, `useSeo`, owns every SEO-relevant head tag:
 * title, meta description, robots, canonical, hreflang alternates, Open Graph
 * and optional JSON-LD. Every routed page calls it, so tags can never leak from
 * one route into the next, and search engines always see one canonical URL per
 * page and language (the real domain, never the vercel.app host).
 *
 *   useSeo({ title: 'About · Nivora', description: t.metaDescription, path: '/about' })
 *
 * `path` is the language-agnostic base ('/about'); the hook derives the English
 * URL (/about) and the Dutch URL (/nl/about) from it, points canonical at the
 * active language, and emits hreflang for both plus x-default.
 */

/** Canonical production origin. Canonical + OG URLs always point here. */
export const SITE_URL = 'https://nivoraworks.com'

export const SITE_NAME = 'Nivora Works'

/* Site-wide defaults, mirrored from index.html so cleanup can restore them. */
export const DEFAULT_TITLE = 'Nivora Works - Intelligent systems for ambitious companies'
export const DEFAULT_DESCRIPTION =
  'Nivora designs AI systems and software built specifically for how you operate. Intelligent tools that make your business work better, faster, smarter.'

/* Default share card, mirrored from index.html so cleanup can restore it. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/og-card.png`

type SeoInput = {
  /** Tab + search-result title. Keep ~50-60 chars and include the brand. */
  title: string
  /** Search-result snippet, ~150-160 chars. Falls back to the site default. */
  description?: string
  /** Language-agnostic base path ('/about') for canonical + hreflang. Defaults to the current path. */
  path?: string
  /** Keep utility pages (confirmations, 404) out of Google's index. */
  noindex?: boolean
  /** Share image for this page (site-relative like '/blog/cover.webp' or absolute). */
  ogImage?: string
  /** Open Graph type; blog posts use 'article'. */
  ogType?: 'website' | 'article'
  /** Page-specific structured data (one object or several), rendered as JSON-LD while mounted. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  )
  if (!el) {
    el = document.createElement('link')
    el.rel = 'alternate'
    el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

export function useSeo({ title, description, path, noindex, ogImage, ogType, jsonLd }: SeoInput) {
  const { lang } = useLang()
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : undefined

  useEffect(() => {
    const desc = description ?? DEFAULT_DESCRIPTION
    const base = path ?? splitLangPath(window.location.pathname).base
    const enUrl = `${SITE_URL}${langHref('en', base)}`
    const nlUrl = `${SITE_URL}${langHref('nl', base)}`
    const url = lang === 'nl' ? nlUrl : enUrl
    const image = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : DEFAULT_OG_IMAGE

    document.title = title
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', ogType ?? 'website')
    setMeta('property', 'og:locale', lang === 'nl' ? 'nl_BE' : 'en_US')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:image', image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // hreflang alternates so Google serves the right language per searcher.
    setAlternate('en', enUrl)
    setAlternate('nl-BE', nlUrl)
    setAlternate('x-default', enUrl)

    let script: HTMLScriptElement | null = null
    if (jsonLdText) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = jsonLdText
      document.head.appendChild(script)
    }

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('name', 'description', DEFAULT_DESCRIPTION)
      setMeta('name', 'robots', 'index, follow')
      setMeta('property', 'og:title', DEFAULT_TITLE)
      setMeta('property', 'og:description', DEFAULT_DESCRIPTION)
      setMeta('property', 'og:image', DEFAULT_OG_IMAGE)
      setMeta('property', 'og:type', 'website')
      setMeta('name', 'twitter:title', DEFAULT_TITLE)
      setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE)
      script?.remove()
    }
  }, [title, description, path, noindex, ogImage, ogType, jsonLdText, lang])
}
