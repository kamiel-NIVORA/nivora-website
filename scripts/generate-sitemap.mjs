#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the real route table:
 *   - the static marketing routes listed below
 *   - every service slug in src/data/serviceContent.ts
 *   - every blog post slug in src/data/posts.ts
 *
 * Runs automatically as the first step of `npm run build`, so publishing a new
 * blog post updates the sitemap without anyone thinking about it. Utility
 * routes (waitlist thank-yous, unsubscribe, 404) are deliberately absent: they
 * carry a noindex tag.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE_URL = 'https://nivoraworks.com'

const STATIC_ROUTES = [
  '/',
  '/about',
  '/blog',
  '/media',
  '/waitlist',
  '/affiliate',
  '/help',
  '/contact',
  '/terms',
  '/privacy',
]

const slugsIn = (file, re) => {
  const src = readFileSync(join(root, file), 'utf8')
  return [...new Set([...src.matchAll(re)].map((m) => m[1]))]
}

const serviceSlugs = slugsIn('src/data/serviceContent.ts', /slug:\s*'([a-z0-9-]+)'/g)
const postSlugs = slugsIn('src/data/posts.ts', /slug:\s*'([a-z0-9-]+)'/g)

const routes = [
  ...STATIC_ROUTES,
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...postSlugs.map((s) => `/blog/${s}`),
]

const today = new Date().toISOString().slice(0, 10)

/** English + Dutch URL for a base path. Dutch lives under /nl (see src/i18n). */
const enUrl = (base) => `${SITE_URL}${base}`
const nlUrl = (base) => `${SITE_URL}${base === '/' ? '/nl' : `/nl${base}`}`

/** hreflang alternates every language entry must list (including itself + x-default). */
const alternates = (base) =>
  [
    `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl(base)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="nl-BE" href="${nlUrl(base)}"/>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl(base)}"/>`,
  ].join('\n')

const urlEntry = (loc, base) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
${alternates(base)}
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map((base) => `${urlEntry(enUrl(base), base)}\n${urlEntry(nlUrl(base), base)}`).join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(
  `sitemap.xml: ${routes.length * 2} URLs (${routes.length} routes x en+nl; ` +
    `${serviceSlugs.length} services, ${postSlugs.length} posts)`,
)
