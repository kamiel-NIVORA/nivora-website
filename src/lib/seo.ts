import { useEffect } from 'react'

/**
 * Site-wide SEO layer. One hook, `useSeo`, owns every SEO-relevant head tag:
 * title, meta description, robots, canonical, Open Graph and optional JSON-LD.
 * Every routed page calls it, so tags can never leak from one route into the
 * next, and search engines always see one canonical URL per page (the real
 * domain, never the vercel.app host).
 *
 *   useSeo({ title: 'About · Nivora', description: t.metaDescription, path: '/about' })
 */

/** Canonical production origin. Canonical + OG URLs always point here. */
export const SITE_URL = 'https://nivoraworks.com'

export const SITE_NAME = 'Nivora Works'

/* Site-wide defaults, mirrored from index.html so cleanup can restore them. */
export const DEFAULT_TITLE = 'Nivora Works - Intelligent systems for ambitious companies'
export const DEFAULT_DESCRIPTION =
  'Nivora designs AI systems and software built specifically for how you operate. Intelligent tools that make your business work better, faster, smarter.'

type SeoInput = {
  /** Tab + search-result title. Keep ~50-60 chars and include the brand. */
  title: string
  /** Search-result snippet, ~150-160 chars. Falls back to the site default. */
  description?: string
  /** Route path ('/about') for the canonical + og:url. Defaults to the current path. */
  path?: string
  /** Keep utility pages (confirmations, 404) out of Google's index. */
  noindex?: boolean
  /** Page-specific structured data, rendered as JSON-LD while mounted. */
  jsonLd?: Record<string, unknown>
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

export function useSeo({ title, description, path, noindex, jsonLd }: SeoInput) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : undefined

  useEffect(() => {
    const desc = description ?? DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path ?? window.location.pathname}`

    document.title = title
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

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
      script?.remove()
    }
  }, [title, description, path, noindex, jsonLdText])
}
