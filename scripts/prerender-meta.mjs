#!/usr/bin/env node
/**
 * Per-route prerendered metadata for the SPA, in both languages.
 *
 * Problem: every URL serves the same dist/index.html, so link previews and
 * crawlers that do not run JavaScript see the homepage title/description/schema
 * for every page and every language.
 *
 * Fix: after `vite build`, write a static shell per route AND per language:
 *   - English at dist/<route>/index.html
 *   - Dutch   at dist/nl/<route>/index.html
 * Each shell carries the right title, description, canonical, og/twitter tags,
 * <html lang>, per-route JSON-LD, and hreflang alternates (en / nl-BE /
 * x-default). Vercel serves these before the SPA rewrite; React hydrates the
 * same shell, so the site behaves identically for visitors. Language at runtime
 * comes from the URL (see src/i18n).
 *
 * Meta sources:
 *   - services: src/data/services.ts (EN + NL blocks)
 *   - blog:     src/data/posts.ts (EN + NL blocks)
 *   - the rest: the STATIC_* maps below, kept in sync with the useSeo calls in
 *     src/pages/*.
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

/** Absolute URL for a base path in a language. langUrl('nl','/about') -> .../nl/about */
const langUrl = (lang, base) =>
  `${SITE_URL}${lang === 'nl' ? (base === '/' ? '/nl' : `/nl${base}`) : base}`

/* Reused as provider/publisher inside per-route JSON-LD. */
const ORG = {
  '@type': 'Organization',
  name: 'Nivora',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/nivora-logo.png`,
}

/** "Jun 20, 2026" -> "2026-06-20", using local date parts so a UTC shift can't move it. */
const toIsoDate = (s) => {
  if (!s) return null
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return null
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/* ── static route meta, both languages (mirrors the useSeo calls in src/pages) ─ */
const STATIC_EN = {
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
const STATIC_NL = {
  '/about': {
    title: 'Over Nivora · Nivora',
    description:
      'Nivora is een software- en AI-studio in Brugge. We maken onze eigen producten, Box en Voice, en bouwen software en AI op maat voor bedrijven die er het meeste uit willen halen.',
  },
  '/blog': {
    title: 'Blog · Nivora',
    description:
      'Notities van Nivora: hoe we onze apps Box en Voice bouwen, waar AI echt loont, en wat we leren bij het bouwen van intelligente systemen voor bedrijven.',
  },
  '/media': {
    title: 'Mediakit · Nivora',
    description:
      'De officiële Nivora-mediakit: logo, kleuren, typografie, fotografie en merkstem, klaar om te downloaden voor pers en partners.',
  },
  '/waitlist': {
    title: 'Wachtlijst · Nivora',
    description: 'Schrijf u in op de wachtlijst voor Box en Voice, de Nivora-apps, en verneem het moment dat ze live gaan.',
  },
  '/affiliate': {
    title: 'Affiliate · Nivora',
    description:
      'Word Nivora-affiliate: deel de apps Box en Voice met uw netwerk en verdien voor elke nieuwe gebruiker. Schrijf u in en wees als eerste aan de beurt.',
  },
  '/help': {
    title: 'Helpcentrum · Nivora',
    description:
      'Het Nivora-helpcentrum: vraag de Nivora-assistent alles over onze apps, AI-systemen en diensten, of praat rechtstreeks met het team.',
  },
  '/contact': {
    title: 'Contact · Nivora',
    description:
      'Vertel ons de uitdaging, of het idee dat u niet gebouwd krijgt. Boek een gesprek, of bereik ons rechtstreeks. We reageren meestal binnen een dag.',
  },
  '/terms': {
    title: 'Servicevoorwaarden · Nivora',
    description: 'De voorwaarden die van toepassing zijn op de Nivora-website, producten en diensten.',
  },
  '/privacy': {
    title: 'Privacybeleid · Nivora',
    description: 'Hoe Nivora met uw gegevens omgaat: wat we verzamelen, waarom, en welke rechten u hebt.',
  },
}

const HOME_NL = {
  title: 'Nivora Works - Intelligente systemen voor ambitieuze bedrijven',
  description:
    'Nivora ontwerpt AI-systemen en software op maat van hoe u werkt. Intelligente tools die uw bedrijf beter, sneller en slimmer laten draaien.',
}

/* Dutch homepage FAQ, mirroring the English FAQPage baked into index.html. */
const NL_FAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat doet Nivora precies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Twee dingen. Nivora bouwt en installeert AI-systemen op maat voor uw bedrijf, van private AI binnen uw eigen infrastructuur tot apps op maat en complete ERP-systemen. En het maakt zijn eigen software, Box en Voice, die u meteen kunt gebruiken. Hoe dan ook, het wordt gevormd rond hoe u vandaag al werkt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Zijn mijn gegevens veilig met private (lokale) AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Local AI draait binnen uw eigen infrastructuur, dus uw gegevens verlaten nooit uw muren. Alles is GDPR-klaar, en de systemen die Nivora bouwt blijven volledig van u.',
      },
    },
    {
      '@type': 'Question',
      name: 'Moet ik technisch zijn om met Nivora te werken?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nee. U brengt het probleem, of het idee dat u niet gebouwd krijgt, en Nivora regelt de rest, van ontwerp tot bouw tot installatie binnen uw tools. Van begin tot eind blijft het in gewone taal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Waar is Nivora gevestigd?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nivora is een software- en AI-studio in Brugge, België, en werkt met bedrijven in heel België en Nederland.',
      },
    },
  ],
}

/* ── extract service + blog meta from the data files ─────────────────────────── */
const QUOTED = "'((?:[^'\\\\]|\\\\.)*)'"
const unescape = (s) => s.replace(/\\'/g, "'")
const field = (block, name) => {
  const m = block.match(new RegExp(`${name}:\\s*${QUOTED}`))
  return m ? unescape(m[1]) : null
}
const blocksBySlug = (src) => src.split(/(?=slug: ')/).slice(1)

const servicesSrc = readFileSync(join(root, 'src/data/services.ts'), 'utf8')
const [servicesEnSrc, servicesNlSrc = ''] = servicesSrc.split('export const SERVICE_CONTENT_NL')

function parseServices(src, lang) {
  const out = {}
  for (const block of blocksBySlug(src)) {
    const slug = field(block, 'slug')
    const name = field(block, 'name')
    const eyebrow = field(block, 'eyebrow')
    const subhead = field(block, 'subhead')
    const statement = field(block, 'statement')
    if (!slug || !eyebrow) continue
    const url = langUrl(lang, `/services/${slug}`)
    const description = [subhead, statement].filter(Boolean).join(' ')
    out[slug] = {
      title: `${eyebrow} · Nivora`,
      description,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: name ?? eyebrow,
          description,
          url,
          inLanguage: lang === 'nl' ? 'nl-BE' : 'en',
          areaServed: { '@type': 'Country', name: 'Belgium' },
          provider: ORG,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: langUrl(lang, '/') },
            { '@type': 'ListItem', position: 2, name: name ?? eyebrow, item: url },
          ],
        },
      ],
    }
  }
  return out
}
const serviceEn = parseServices(servicesEnSrc, 'en')
const serviceNl = parseServices(servicesNlSrc, 'nl')

const postsSrc = readFileSync(join(root, 'src/data/posts.ts'), 'utf8')
const [postsEnSrc, postsNlSrc = ''] = postsSrc.split(/\n\s*nl: \[/)

// Language-neutral post facts (date, image, author) come from the English blocks.
const postFacts = {}
for (const block of blocksBySlug(postsEnSrc)) {
  const slug = field(block, 'slug')
  if (!slug) continue
  postFacts[slug] = {
    image: field(block, 'image'),
    author: field(block, 'author') ?? 'Kamiel Niville',
    iso: toIsoDate(field(block, 'date')),
  }
}

function parsePosts(src, lang) {
  const out = {}
  for (const block of blocksBySlug(src)) {
    const slug = field(block, 'slug')
    const title = field(block, 'title')
    if (!slug || !title) continue
    const facts = postFacts[slug] ?? {}
    const excerpt = field(block, 'excerpt') ?? undefined
    const image = facts.image ?? undefined
    const url = langUrl(lang, `/blog/${slug}`)
    out[slug] = {
      title: `${title} · Nivora`,
      description: excerpt,
      ogImage: image,
      ogType: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: excerpt,
          image: image ? `${SITE_URL}${image}` : undefined,
          datePublished: facts.iso ?? undefined,
          author: { '@type': 'Person', name: facts.author ?? 'Kamiel Niville' },
          publisher: {
            '@type': 'Organization',
            name: 'Nivora',
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/nivora-logo.png` },
          },
          mainEntityOfPage: url,
          inLanguage: lang === 'nl' ? 'nl-BE' : 'en',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: langUrl(lang, '/') },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: langUrl(lang, '/blog') },
            { '@type': 'ListItem', position: 3, name: title, item: url },
          ],
        },
      ],
    }
  }
  return out
}
const postEn = parsePosts(postsEnSrc, 'en')
const postNl = parsePosts(postsNlSrc, 'nl')

/* ── render ─────────────────────────────────────────────────────────────────── */
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

/* One JSON-LD object -> a <script> block. Escape "<" so no string value can ever
   break out of the script element. undefined-valued keys are dropped by stringify. */
const ldBlock = (obj) =>
  `    <script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n    </script>`

/* The homepage FAQ is site-wide in the shell (index.html), English. It belongs
   only on the English homepage. Bounded so the match stays inside one script block. */
const FAQ_LD =
  /\n?\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>/

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`)
  if (!re.test(html)) return html
  return html.replace(re, `$1${escapeHtml(value)}$2`)
}

// Default English homepage meta comes straight from the shell, so it never drifts.
const shellTitle = (shell.match(/<title>([\s\S]*?)<\/title>/) || [, 'Nivora Works'])[1]
const shellDesc = (shell.match(/<meta name="description"[^>]*content="([^"]*)"/) || [, ''])[1]

function renderShell(base, lang, meta) {
  let html = shell
  const isHome = base === '/'
  // FAQ: English homepage keeps it; Dutch homepage swaps in the Dutch FAQ; every
  // sub-route drops it (it does not show those questions).
  if (!isHome) html = html.replace(FAQ_LD, '')
  else if (lang === 'nl') html = html.replace(FAQ_LD, `\n${ldBlock(NL_FAQ)}`)

  if (lang === 'nl') html = html.replace('<html lang="en">', '<html lang="nl">')

  const url = langUrl(lang, base)
  if (meta.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    html = replaceMeta(html, 'property', 'og:title', meta.title)
    html = replaceMeta(html, 'name', 'twitter:title', meta.title)
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = replaceMeta(html, 'property', 'og:url', url)
  if (meta.description) {
    html = replaceMeta(html, 'name', 'description', meta.description)
    html = replaceMeta(html, 'property', 'og:description', meta.description)
  }
  if (meta.ogType) html = replaceMeta(html, 'property', 'og:type', meta.ogType)
  if (meta.ogImage) {
    const abs = `${SITE_URL}${meta.ogImage}`
    html = replaceMeta(html, 'property', 'og:image', abs)
    html = replaceMeta(html, 'name', 'twitter:image', abs)
    html = html
      .replace(/\s*<meta property="og:image:width"[^>]*\/>/, '')
      .replace(/\s*<meta property="og:image:height"[^>]*\/>/, '')
  }

  const alts = [
    `    <link rel="alternate" hreflang="en" href="${langUrl('en', base)}" />`,
    `    <link rel="alternate" hreflang="nl-BE" href="${langUrl('nl', base)}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${langUrl('en', base)}" />`,
  ].join('\n')
  const ld = meta.jsonLd && meta.jsonLd.length ? meta.jsonLd.map(ldBlock).join('\n') + '\n' : ''
  html = html.replace('</head>', `${ld}${alts}\n  </head>`)
  return html
}

/* ── assemble the page list (base path + en/nl meta) ─────────────────────────── */
const pages = [{ base: '/', en: { title: shellTitle, description: shellDesc }, nl: HOME_NL }]
for (const base of Object.keys(STATIC_EN)) {
  pages.push({ base, en: STATIC_EN[base], nl: STATIC_NL[base] ?? STATIC_EN[base] })
}
for (const slug of Object.keys(serviceEn)) {
  pages.push({ base: `/services/${slug}`, en: serviceEn[slug], nl: serviceNl[slug] ?? serviceEn[slug] })
}
for (const slug of Object.keys(postEn)) {
  pages.push({ base: `/blog/${slug}`, en: postEn[slug], nl: postNl[slug] ?? postEn[slug] })
}

let count = 0
for (const page of pages) {
  for (const lang of ['en', 'nl']) {
    const parts = page.base.split('/').filter(Boolean)
    const dir = join(dist, ...(lang === 'nl' ? ['nl'] : []), ...parts)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), renderShell(page.base, lang, page[lang]))
    count++
  }
}

console.log(
  `prerender-meta: wrote ${count} shells (${pages.length} routes x 2 languages; ` +
    `${Object.keys(serviceEn).length} services, ${Object.keys(postEn).length} posts)`,
)
