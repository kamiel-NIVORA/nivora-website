#!/usr/bin/env node
/**
 * Per-route prerendered metadata for the SPA.
 *
 * Problem: every URL serves the same dist/index.html, so link previews
 * (WhatsApp, LinkedIn) and crawlers that do not run JavaScript see the
 * homepage title/description/og-image for every page.
 *
 * Fix: after `vite build`, copy the built shell to dist/<route>/index.html
 * with the title, meta description, canonical and og/twitter tags swapped for
 * that route. Vercel serves these static files before the SPA rewrite; React
 * hydrates the same shell, so the site behaves identically for visitors.
 *
 * Meta sources (English, the crawler default):
 *   - services: hero/intro copy extracted from src/data/services.ts
 *   - blog:     title/excerpt/cover extracted from src/data/posts.ts
 *   - the rest: the STATIC_ROUTES map below, kept in sync with the useSeo
 *     calls in src/pages/*.
 * Noindex routes (confirm/unsubscribe/404) are deliberately absent.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE_URL = 'https://nivoraworks.com'

const shellPath = join(dist, 'index.html')
if (!existsSync(shellPath)) {
  console.error('prerender-meta: dist/index.html not found; run after vite build')
  process.exit(1)
}
const shell = readFileSync(shellPath, 'utf8')

/* ── meta per static route (mirrors the useSeo calls in src/pages) ───────── */
const STATIC_ROUTES = {
  '/about': {
    title: 'About · Nivora',
    description:
      'Nivora is a software and AI studio in Brugge. We make our own products, Box and Voice, and build custom software and AI for companies that want to get the most out of it.',
  },
  '/blog': {
    title: 'Blog · Nivora',
    description:
      'Notes from Nivora: how we build our apps Box and Voice, where AI genuinely pays off, and what we learn building intelligent systems for companies.',
  },
  '/media': {
    title: 'Media kit · Nivora',
    description:
      'The official Nivora media kit: logo, colours, typography, photography and brand voice, ready to download for press and partners.',
  },
  '/waitlist': {
    title: 'Waitlist · Nivora',
    description: 'Join the waitlist for Box and Voice, the Nivora apps, and hear the moment they go live.',
  },
  '/affiliate': {
    title: 'Affiliate · Nivora',
    description:
      'Become a Nivora affiliate: share the Box and Voice apps with your network and earn for every new user. Sign up and be first in line.',
  },
  '/help': {
    title: 'Help Center · Nivora',
    description:
      'The Nivora Help Center: ask the Nivora assistant anything about our apps, AI systems and services, or talk directly to the team.',
  },
  '/contact': {
    title: 'Contact · Nivora',
    description:
      "Tell us the challenge, or the idea you can't get built. Book a call, or reach us directly. We usually reply within a day.",
  },
  '/terms': {
    title: 'Terms of Service · Nivora',
    description: 'The terms that apply to the Nivora website, products and services.',
  },
  '/privacy': {
    title: 'Privacy Policy · Nivora',
    description: 'How Nivora handles your data: what we collect, why we collect it, and the rights you have.',
  },
}

/* ── extract service + blog meta from the data files ─────────────────────── */
const QUOTED = "'((?:[^'\\\\]|\\\\.)*)'"
const unescape = (s) => s.replace(/\\'/g, "'")
const field = (block, name) => {
  const m = block.match(new RegExp(`${name}:\\s*${QUOTED}`))
  return m ? unescape(m[1]) : null
}
const blocksBySlug = (src) => src.split(/(?=slug: ')/).slice(1)

/* Reused as provider/publisher inside per-route JSON-LD. Mirrors the Organization
   entity in index.html, kept small on purpose (the full entity is site-wide in
   the shell; here it only has to identify the provider). */
const ORG = {
  '@type': 'Organization',
  name: 'Nivora',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/nivora-logo.png`,
}

/** "Jun 20, 2026" -> "2026-06-20", or null if it does not parse. Uses the local
   date parts, not toISOString, so a UTC shift can never move it a day back. */
const toIsoDate = (s) => {
  if (!s) return null
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return null
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

const servicesEn = readFileSync(join(root, 'src/data/services.ts'), 'utf8').split(
  'export const SERVICE_CONTENT_NL',
)[0]
const serviceRoutes = {}
for (const block of blocksBySlug(servicesEn)) {
  const slug = field(block, 'slug')
  const name = field(block, 'name')
  const eyebrow = field(block, 'eyebrow')
  const subhead = field(block, 'subhead')
  const statement = field(block, 'statement')
  if (!slug || !eyebrow) continue
  const url = `${SITE_URL}/services/${slug}`
  const description = [subhead, statement].filter(Boolean).join(' ')
  serviceRoutes[`/services/${slug}`] = {
    title: `${eyebrow} · Nivora`,
    description,
    // Same shape the client injects in src/pages/ServicePage.tsx, but now baked
    // into the static HTML so non-JS + AI crawlers see it on first fetch.
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: name ?? eyebrow,
        description,
        url,
        areaServed: { '@type': 'Country', name: 'Belgium' },
        provider: ORG,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: name ?? eyebrow, item: url },
        ],
      },
    ],
  }
}

const postsEn = readFileSync(join(root, 'src/data/posts.ts'), 'utf8').split(/\n\s*nl: \[/)[0]
const postRoutes = {}
for (const block of blocksBySlug(postsEn)) {
  const slug = field(block, 'slug')
  const title = field(block, 'title')
  const excerpt = field(block, 'excerpt')
  const image = field(block, 'image')
  const author = field(block, 'author')
  const iso = toIsoDate(field(block, 'date'))
  if (!slug || !title) continue
  const url = `${SITE_URL}/blog/${slug}`
  postRoutes[`/blog/${slug}`] = {
    title: `${title} · Nivora`,
    description: excerpt ?? undefined,
    ogImage: image ?? undefined,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: excerpt ?? undefined,
        image: image ? `${SITE_URL}${image}` : undefined,
        datePublished: iso ?? undefined,
        author: { '@type': 'Person', name: author ?? 'Kamiel Niville' },
        publisher: {
          '@type': 'Organization',
          name: 'Nivora',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/nivora-logo.png` },
        },
        mainEntityOfPage: url,
        inLanguage: 'en',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  }
}

/* ── rewrite the shell's head per route ───────────────────────────────────── */
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

/* One JSON-LD object -> a <script> block. Escape "<" so no string value can ever
   break out of the script element. undefined-valued keys are dropped by stringify. */
const ldBlock = (obj) =>
  `    <script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n    </script>`

/* The homepage FAQ is site-wide in the shell (index.html) but belongs only on the
   homepage. Strip it from every copied sub-route shell. The negative lookahead
   keeps the match inside a single script block (it can never cross a </script>). */
const FAQ_LD =
  /\n?\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>/

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`)
  if (!re.test(html)) {
    console.warn(`prerender-meta: tag ${attr}="${key}" not found in shell`)
    return html
  }
  return html.replace(re, `$1${escapeHtml(value)}$2`)
}

function renderRoute(path, { title, description, ogImage, ogType, jsonLd }) {
  let html = shell.replace(FAQ_LD, '')
  const url = `${SITE_URL}${path}`
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = replaceMeta(html, 'property', 'og:title', title)
  html = replaceMeta(html, 'property', 'og:url', url)
  html = replaceMeta(html, 'name', 'twitter:title', title)
  if (description) {
    html = replaceMeta(html, 'name', 'description', description)
    html = replaceMeta(html, 'property', 'og:description', description)
  }
  if (ogType) html = replaceMeta(html, 'property', 'og:type', ogType)
  if (ogImage) {
    const abs = `${SITE_URL}${ogImage}`
    html = replaceMeta(html, 'property', 'og:image', abs)
    html = replaceMeta(html, 'name', 'twitter:image', abs)
    // the fixed 1200x630 belongs to the default og-card, not this image
    html = html
      .replace(/\s*<meta property="og:image:width"[^>]*\/>/, '')
      .replace(/\s*<meta property="og:image:height"[^>]*\/>/, '')
  }
  if (jsonLd && jsonLd.length) {
    html = html.replace('</head>', `${jsonLd.map(ldBlock).join('\n')}\n  </head>`)
  }
  return html
}

const routes = { ...STATIC_ROUTES, ...serviceRoutes, ...postRoutes }
for (const [path, meta] of Object.entries(routes)) {
  const outDir = join(dist, ...path.split('/').filter(Boolean))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), renderRoute(path, meta))
}
console.log(
  `prerender-meta: wrote ${Object.keys(routes).length} route shells (` +
    `${Object.keys(serviceRoutes).length} services, ${Object.keys(postRoutes).length} posts)`,
)
