#!/usr/bin/env node
/**
 * Per-route prerendering for the SPA, in both languages.
 *
 * Problem: every URL serves the same dist/index.html, so crawlers that do not
 * run JavaScript see the homepage title/description/schema for every page and
 * every language, and an entirely EMPTY body (15 bytes: `<div id="root">`).
 * That is invisible not just to link previews but to every answer engine, since
 * GPTBot, ClaudeBot, PerplexityBot and CCBot do not execute JavaScript.
 *
 * Fix, in two layers:
 *
 *   1. Metadata, for every route. A static shell per route per language, with
 *      the right title, description, canonical, og/twitter tags, <html lang>,
 *      per-route JSON-LD and hreflang alternates (en / nl-BE / x-default).
 *        English at dist/<route>/index.html
 *        Dutch   at dist/nl/<route>/index.html
 *
 *   2. A real HTML body, for the programmatic landing pages. dist-ssr/entry.js
 *      (built by vite.ssr.config.ts from the SAME React components the browser
 *      runs) is rendered with renderToStaticMarkup and injected into
 *      `<div id="root">`. React replaces it on mount, so visitors see no
 *      difference, but a crawler without JavaScript now reads ~1,300 words.
 *
 * Because both the static HTML and the browser render come from one component
 * tree and one content module, they cannot drift apart. That is what keeps this
 * a rendering optimisation rather than cloaking.
 *
 * This script also emits dist/sitemap.xml, so the URL list has a single source
 * of truth (it used to live in a separate scripts/generate-sitemap.mjs that
 * regex-scraped the data files).
 *
 * Meta sources:
 *   - landing: dist-ssr/entry.js (real modules, not regexes)
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
  console.error('prerender: dist/index.html not found; run after vite build')
  process.exit(1)
}
const shell = readFileSync(shellPath, 'utf8')

/* Voetangel: dit script schrijft zijn resultaat terug naar dist/index.html, en
   leest datzelfde bestand hierboven als sjabloon. Draait het twee keer op
   dezelfde dist (zonder vite build ertussen), dan zit de homepage-body al in
   het sjabloon en krijgt elke pagina de homepage-tekst. Stoppen dus. */
if (!shell.includes('<div id="root"></div>')) {
  console.error(
    'prerender: dist/index.html bevat al een gerenderde body. Draai eerst opnieuw `vite build`,\n' +
      '           anders krijgt elke pagina de homepage-inhoud.',
  )
  process.exit(1)
}

/* The prerendered landing bodies come from the SSR bundle. Built by
   `vite build --config vite.ssr.config.ts`, which runs just before this. */
const ssrEntry = join(dist, '..', 'dist-ssr', 'entry.js')
let ROUTES = []
let renderLanding = null
let renderSitemap = null
let renderStatic = null
if (existsSync(ssrEntry)) {
  const mod = await import(`file://${ssrEntry}`)
  ROUTES = mod.ROUTES ?? []
  renderLanding = mod.renderLanding ?? null
  renderSitemap = mod.renderSitemap ?? null
  renderStatic = mod.renderStatic ?? null
} else {
  console.warn('prerender: dist-ssr/entry.js missing; landing pages get meta only')
}

/** Absolute URL for a base path in a language. Takes `bases` because the
 *  landing pages are spelled differently per language (/ai-automation vs
 *  /nl/ai-automatisering). For every other route both spellings are equal. */
const langUrl = (lang, bases) => {
  const base = typeof bases === 'string' ? bases : bases[lang]
  return `${SITE_URL}${lang === 'nl' ? (base === '/' ? '/nl' : `/nl${base}`) : base}`
}

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
  '/sitemap': {
    title: 'All pages · Nivora',
    description:
      'Every page on nivoraworks.com in one list: services, products, AI solutions, AI automation by city, and the rest.',
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
  '/sitemap': {
    title: 'Alle pagina’s · Nivora',
    description:
      'Elke pagina op nivoraworks.com in één lijst: diensten, producten, AI-oplossingen, AI-automatisering per stad, en de rest.',
  },
}

const HOME_NL = {
  title: 'Nivora Works - Intelligente systemen voor ambitieuze bedrijven',
  description:
    'Nivora ontwerpt AI-systemen en software op maat van hoe u werkt. Intelligente tools die uw bedrijf beter, sneller en slimmer laten draaien.',
}

/* Dutch homepage FAQ, mirroring the English FAQPage baked into index.html. */
/* ── FAQ-schema uit de zichtbare FAQ zelf ────────────────────────────────────
 *
 * Dit stond hier eerst met de hand: vier vragen in de JSON-LD, terwijl
 * src/sections/Faq.tsx er zes toont, met andere formuleringen. Google eist dat
 * FAQ-markup de zichtbare pagina weerspiegelt, dus dat was een risico op een
 * handmatige maatregel en zeker geen rich result.
 *
 * Nu lezen we de vragen uit Faq.tsx, zodat schema en pagina niet meer uit
 * elkaar kunnen lopen. Verandert de vorm van dat bestand, dan valt de build
 * hieronder om, en dat is precies de bedoeling.
 */
const faqSrc = readFileSync(join(root, 'src/sections/Faq.tsx'), 'utf8')

function parseFaq(lang) {
  const marker = lang === 'nl' ? '\n  nl: {' : '\n  en: {'
  const from = faqSrc.indexOf(marker)
  if (from === -1) return null
  const next = faqSrc.indexOf('\n  nl: {', from + 1)
  const block = faqSrc.slice(from, lang === 'en' && next > -1 ? next : undefined)
  const list = block.slice(block.indexOf('faq: ['))

  const items = []
  const re = /\{\s*\n\s*q: (['"`])([\s\S]*?)\1,\s*\n\s*a: (['"`])([\s\S]*?)\3,\s*\n\s*\}/g
  let m
  while ((m = re.exec(list))) {
    items.push({
      '@type': 'Question',
      name: m[2].replace(/\\'/g, "'"),
      acceptedAnswer: { '@type': 'Answer', text: m[4].replace(/\\'/g, "'") },
    })
  }
  if (!items.length) return null
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items }
}

const EN_FAQ = parseFaq('en')
const NL_FAQ = parseFaq('nl')
if (!EN_FAQ || !NL_FAQ) {
  console.error('prerender: kon de FAQ niet uit src/sections/Faq.tsx lezen. Is de vorm van dat bestand veranderd?')
  process.exit(1)
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

/* Same escape, for the inline page data read by src/data/landing/index.ts. */
const jsonSafe = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

/* The homepage FAQ is site-wide in the shell (index.html), English. It belongs
   only on the English homepage. Bounded so the match stays inside one script block. */
const FAQ_LD =
  /\n?\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>/

/* The site-wide <noscript> fallback in index.html carries its own <h1> and a
   fixed link list. On a page that gets a real prerendered body it would mean two
   H1s and an off-topic link list, so it is stripped from those shells only. */

/**
 * Haalt de animatie-startstand uit de statische HTML.
 *
 * framer-motion rendert op de server de `initial`-stand, dus componenten die
 * `motion.div` rechtstreeks gebruiken bakken style="opacity:0" in de HTML. Dat
 * verbergt de tekst voor elke crawler die geen JavaScript draait, en dat is
 * precies het publiek waarvoor we deze pagina's prerenderen. Reveal heeft
 * hiervoor een eigen SSR-tak (zie src/components/animations/Reveal.tsx), maar
 * de componenten die motion direct aanspreken niet.
 *
 * We halen alleen de startstand weg: opacity:0 plus de transform, blur en
 * clip-path die in datzelfde style-attribuut staan. In de browser neemt React
 * de DOM meteen over, dus visueel verandert er niets.
 */
function unhideStaticBody(html) {
  return html.replace(/ style="([^"]*)"/g, (whole, style) => {
    if (!/opacity:\s*0(?![.\d])/.test(style)) return whole
    const kept = style
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .filter((d) => !/^opacity:\s*0(?![.\d])$/.test(d))
      .filter((d) => !/^transform:/.test(d))
      .filter((d) => !/^filter:\s*blur/.test(d))
      .filter((d) => !/^clip-path:/.test(d))
    return kept.length ? ` style="${kept.join(';')}"` : ''
  })
}

const NOSCRIPT_BLOCK = /\n?\s*<noscript>[\s\S]*?<\/noscript>/

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`)
  if (!re.test(html)) return html
  return html.replace(re, `$1${escapeHtml(value)}$2`)
}

// Default English homepage meta comes straight from the shell, so it never drifts.
const shellTitle = (shell.match(/<title>([\s\S]*?)<\/title>/) || [, 'Nivora Works'])[1]
const shellDesc = (shell.match(/<meta name="description"[^>]*content="([^"]*)"/) || [, ''])[1]

function renderShell(bases, lang, meta) {
  let html = shell
  const enBase = typeof bases === 'string' ? bases : bases.en
  const isHome = enBase === '/'
  // FAQ: English homepage keeps it; Dutch homepage swaps in the Dutch FAQ; every
  // sub-route drops it (it does not show those questions).
  /* De FAQ hoort alleen op de homepage: alleen daar staan die vragen zichtbaar.
     Beide talen krijgen het schema dat uit Faq.tsx gelezen is, zodat de markup
     letterlijk de vragen op de pagina beschrijft. */
  if (!isHome) html = html.replace(FAQ_LD, '')
  else html = html.replace(FAQ_LD, `\n${ldBlock(lang === 'nl' ? NL_FAQ : EN_FAQ)}`)

  if (lang === 'nl') html = html.replace('<html lang="en">', '<html lang="nl">')

  const url = langUrl(lang, bases)
  if (meta.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    html = replaceMeta(html, 'property', 'og:title', meta.title)
    html = replaceMeta(html, 'name', 'twitter:title', meta.title)
  }
  /* Utility-pagina's (404, uitschrijven, nieuwsbriefbevestiging) horen niet in
     de index. Tot nu toe stond die noindex alleen client-side in useSeo, dus
     geen enkele crawler zonder JavaScript zag hem. */
  if (meta.noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*" \/>/,
      '<meta name="robots" content="noindex, follow" />',
    )
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

  /* Zowel `nl` als `nl-BE`. Met alleen nl-BE matcht Nederland niet, terwijl
     areaServed en llms.txt Nederland expliciet als markt noemen. */
  const alts = [
    `    <link rel="alternate" hreflang="en" href="${langUrl('en', bases)}" />`,
    `    <link rel="alternate" hreflang="nl" href="${langUrl('nl', bases)}" />`,
    `    <link rel="alternate" hreflang="nl-BE" href="${langUrl('nl', bases)}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${langUrl('en', bases)}" />`,
  ].join('\n')
  const ld = meta.jsonLd && meta.jsonLd.length ? meta.jsonLd.map(ldBlock).join('\n') + '\n' : ''
  html = html.replace('</head>', `${ld}${alts}\n  </head>`)

  /* The body. Only the landing pages carry one today; everything else keeps the
     empty #root and the site-wide <noscript> fallback. */
  if (meta.body) {
    html = html.replace(NOSCRIPT_BLOCK, '')
    /* The inline JSON only exists for landing pages, where it lets React render
       the real content on its first commit instead of flashing a Suspense
       fallback. Pages rendered from data already in the bundle (like /sitemap)
       do not need it. */
    const inline = meta.data
      ? `\n    <script id="nivora-landing" type="application/json">${jsonSafe(meta.data)}</script>`
      : ''
    html = html.replace('<div id="root"></div>', `<div id="root">${unhideStaticBody(meta.body)}</div>${inline}`)
  }
  return html
}

/* ── content guards ──────────────────────────────────────────────────────────
   Quality is a build failure, not a good intention. A programmatic page set
   fails in exactly these ways, so each one is asserted here rather than noticed
   in Search Console three months later. */
const problems = []

/* Entiteiten terugvertalen voor elke tekstvergelijking hieronder. React schrijft
   een apostrof als &#x27;, dus "foto's" of "zo'n" komt anders nooit overeen met
   zichzelf en faalt een guard op een pagina die volkomen in orde is. */
const unentity = (t) =>
  t
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
const paragraphSeen = new Map()

/* Word floor per language. Dutch compounds ("bedrijfsprocessen",
   "orderbevestigingen") where English needs two or three words, so the same
   content measures roughly 5% shorter. A single cross-language threshold would
   flag a Dutch page as thin purely for being efficient, which is a measurement
   artefact rather than a quality signal. A genuinely thin page still fails. */
const WORD_FLOOR = { en: 200, nl: 190 }
const CARD_TITLE_MAX = 22
const WORD_CEILING = 2600 // generous: the shared home sections are excluded anyway

/**
 * Strip the sections marked `data-shared` plus the footer.
 *
 * A landing page is the home page with this page's words in it, so it carries
 * the same product cards, service cards and footer as everything else. That is
 * site furniture, the same category as a navigation bar, and Google judges
 * duplication on a page's MAIN content rather than on its boilerplate.
 *
 * Measuring the whole body would therefore flag every page for text it is
 * supposed to share, and would hide the thing actually worth catching: a page
 * whose own writing is thin or recycled. So the guards below run on what is
 * left after this.
 */
function pageOwnContent(body) {
  let out = body.replace(/<footer[\s\S]*?<\/footer>/g, ' ')
  // Every shared region is a <section data-shared>, and they never nest, so a
  // non-greedy match to the next </section> is exact.
  out = out.replace(/<section[^>]*\sdata-shared[^>]*>[\s\S]*?<\/section>/g, ' ')
  return out
}

function checkLanding(id, lang, fullBody, meta) {
  const where = `${id} [${lang}]`
  const body = pageOwnContent(fullBody)
  const h1 = (fullBody.match(/<h1/g) || []).length
  const h2 = (body.match(/<h2/g) || []).length
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length

  /* Kaarttitels moeten op twee regels passen in een kaart van ~300px. Meten op
     WOORDEN is fout: "Scheepvaartcorrespondentie" is een woord van 26 tekens en
     breekt over drie regels. Meten op tekens vangt dat wel. */
  for (const t of fullBody.match(/<h3[^>]*text-\[19px\][^>]*>([^<]+)<\/h3>/g) ?? []) {
    const text = t.replace(/<[^>]+>/g, '').trim()
    if (text.length > CARD_TITLE_MAX) {
      problems.push(`${where}: kaarttitel ${text.length} tekens, max ${CARD_TITLE_MAX}: "${text}"`)
    }
  }

  /* Elk beeld waar de HTML naar verwijst moet ook echt in public/ staan. Een
     verkeerd pad valt in de browser nauwelijks op (de kaart blijft staan, alleen
     het beeld is leeg) maar zorgt op elke crawl voor een 404. Dit is eerder
     misgegaan met Engelse pagina-ids naast Nederlandse bestandsnamen. */
  for (const m of fullBody.matchAll(/(?:src|srcset)="(\/[^"?#]+\.(?:webp|png|jpe?g|svg|avif))"/g)) {
    if (!existsSync(join(root, 'public', m[1]))) {
      problems.push(`${where}: beeld bestaat niet in public/: ${m[1]}`)
    }
  }

  // Hidden text is checked on the WHOLE body: a shared section that ships
  // opacity:0 is invisible to crawlers just the same.
  if (/opacity:\s*0(?![.\d])/.test(fullBody)) {
    problems.push(`${where}: body contains opacity:0 (motion SSR state leaked into the HTML)`)
  }

  if (h1 !== 1) problems.push(`${where}: ${h1} <h1> (must be exactly 1)`)

  /* The H1 has to read as words once the tags are gone. The hero animates each
     word in its own span, and if the spacing comes only from a CSS margin the
     text content arrives as "AIautomationinBruges" for every crawler and screen
     reader. Compare the stripped text against the expected headline. */
  const h1Text = unentity((fullBody.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()
  const expected = meta.h1?.replace(/\s+/g, ' ').trim()
  if (expected && h1Text !== expected) {
    problems.push(`${where}: H1 reads as "${h1Text.slice(0, 60)}" but should read "${expected.slice(0, 60)}"`)
  }
  if (h2 < 2) problems.push(`${where}: ${h2} <h2> (need at least 2)`)
  if (words < WORD_FLOOR[lang] || words > WORD_CEILING) {
    problems.push(`${where}: ${words} own words (want ${WORD_FLOOR[lang]}-${WORD_CEILING}, shared sections excluded)`)
  }

  // Every FAQ answer promised in the schema must be readable in the HTML.
  const faq = meta.jsonLd.find((o) => o['@type'] === 'FAQPage')
  /* Vergelijk op ONTSNAPTE tekst aan beide kanten. React schrijft een apostrof
     als &#x27;, dus "zo'n scherm" komt anders nooit overeen met zichzelf. */
  const plainBody = unentity(body.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
  for (const q of faq?.mainEntity ?? []) {
    const needle = q.name.replace(/\s+/g, ' ')
    if (!plainBody.includes(needle)) problems.push(`${where}: FAQ question not in HTML: "${q.name}"`)
  }

  // Near-duplicate detection across the whole set. Shared helpers are supposed
  // to supply structure, never sentences; this is what enforces it.
  // Skip paragraphs marked data-boilerplate: section labels and the note that
  // the examples are illustrative rather than client cases. Those are supposed
  // to be identical everywhere, and the disclaimer must be.
  for (const p of body.match(/<p(?![^>]*data-boilerplate)[^>]*>([^<]{80,})<\/p>/g) ?? []) {
    const text = p.replace(/<[^>]+>/g, '').trim()
    const seen = paragraphSeen.get(text) ?? []
    seen.push(where)
    paragraphSeen.set(text, seen)
  }
}

/* ── assemble the page list (base paths + en/nl meta) ────────────────────────── */
const home = { bases: '/', en: { title: shellTitle, description: shellDesc }, nl: { ...HOME_NL } }
const pages = [home]
for (const base of Object.keys(STATIC_EN)) {
  const page = { bases: base, en: { ...STATIC_EN[base] }, nl: { ...(STATIC_NL[base] ?? STATIC_EN[base]) } }
  /* /sitemap is the link hub the footer points at. Without a real body a
     crawler that does not run JavaScript sees an empty document here, and every
     landing page behind it becomes an orphan. So it gets prerendered too. */
  if (base === '/sitemap' && renderSitemap) {
    for (const lang of ['en', 'nl']) page[lang].body = renderSitemap(lang)
  }
  pages.push(page)
}

for (const slug of Object.keys(serviceEn)) {
  pages.push({ bases: `/services/${slug}`, en: serviceEn[slug], nl: serviceNl[slug] ?? serviceEn[slug] })
}
for (const slug of Object.keys(postEn)) {
  pages.push({ bases: `/blog/${slug}`, en: postEn[slug], nl: postNl[slug] ?? postEn[slug] })
}

/* Elke vaste route een echte body geven. Tot deze regel bestond kregen alleen
   de landings en /sitemap er een, en serveerden de homepage, /about, alle
   /services/* en alle /blog/* een lege `<div id="root">` plus het generieke
   noscript-blok. Voor een crawler zonder JavaScript waren die pagina's daardoor
   onderling niet te onderscheiden: dezelfde tekst op 35 URL's.

   Faalt de render van een losse pagina, dan valt die pagina terug op de oude
   alleen-head-shell in plaats van de hele build te laten klappen. */
if (renderStatic) {
  for (const page of pages) {
    if (typeof page.bases !== 'string') continue
    for (const lang of ['en', 'nl']) {
      if (page[lang]?.body) continue
      try {
        const body = renderStatic(page.bases, lang)
        if (body) page[lang] = { ...page[lang], body }
      } catch (err) {
        console.warn(`prerender: ${page.bases} (${lang}) rendert niet, valt terug op alleen meta: ${err.message}`)
      }
    }
  }
}

/* Landing pages: real rendered bodies, and slugs that differ per language. */
let landingCount = 0
for (const route of ROUTES) {
  if (!renderLanding) break
  const entry = { bases: route.bases }
  for (const lang of ['en', 'nl']) {
    const { body, data, meta } = renderLanding(route.id, lang)
    checkLanding(route.id, lang, body, meta)
    entry[lang] = { ...meta, body, data }
  }
  pages.push(entry)
  landingCount++
}

for (const [text, where] of paragraphSeen) {
  if (where.length > 3) {
    problems.push(`paragraph reused on ${where.length} pages (${where.slice(0, 4).join(', ')}...): "${text.slice(0, 70)}..."`)
  }
}

if (problems.length) {
  console.error('\nprerender: content guards failed\n')
  for (const p of problems) console.error('  ✗ ' + p)
  console.error('')
  process.exit(1)
}

/* ── write the shells ────────────────────────────────────────────────────────── */
let count = 0
for (const page of pages) {
  for (const lang of ['en', 'nl']) {
    const base = typeof page.bases === 'string' ? page.bases : page.bases[lang]
    const parts = base.split('/').filter(Boolean)
    const dir = join(dist, ...(lang === 'nl' ? ['nl'] : []), ...parts)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), renderShell(page.bases, lang, page[lang]))
    count++
  }
}

/* ── 404 ─────────────────────────────────────────────────────────────────────── */
/* Zonder dit bestand geeft de SPA-catch-all in vercel.json HTTP 200 met de
   homepage terug voor élke onbekende URL. Dat is een soft-404: Google ziet
   oneindig veel URL's die allemaal de homepage dupliceren. Vercel serveert
   dit bestand met een echte 404-status zodra de catch-all weg is. */
writeFileSync(
  join(dist, '404.html'),
  renderShell('/404', 'en', {
    title: 'Page not found · Nivora',
    description: 'This page does not exist. Find what you were looking for on nivoraworks.com.',
    noindex: true,
  }),
)

/* ── sitemap ─────────────────────────────────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10)

/* lastmod per pagina, niet de builddatum voor alles.
   Google negeert een sitemap waarin elke URL dezelfde datum draagt, en dat was
   hier het geval: elke deploy zette 70 URL's op "vandaag gewijzigd". Blogposts
   dragen hun eigen publicatiedatum; de rest valt terug op de builddatum, want
   een betere bron hebben we voor die pagina's niet. */
const lastmodFor = (bases) => {
  const base = typeof bases === 'string' ? bases : bases.en
  const slug = base.startsWith('/blog/') ? base.slice('/blog/'.length) : null
  const iso = slug && postFacts[slug]?.iso
  return (iso || today).slice(0, 10)
}

const urlEntry = (lang, bases) => `  <url>
    <loc>${langUrl(lang, bases)}</loc>
    <lastmod>${lastmodFor(bases)}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${langUrl('en', bases)}"/>
    <xhtml:link rel="alternate" hreflang="nl" href="${langUrl('nl', bases)}"/>
    <xhtml:link rel="alternate" hreflang="nl-BE" href="${langUrl('nl', bases)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${langUrl('en', bases)}"/>
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map((p) => `${urlEntry('en', p.bases)}\n${urlEntry('nl', p.bases)}`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), xml)

console.log(
  `prerender: ${count} shells (${pages.length} routes x 2 languages; ` +
    `${Object.keys(serviceEn).length} services, ${Object.keys(postEn).length} posts, ` +
    `${landingCount} landing pages with a real body), sitemap.xml with ${pages.length * 2} URLs`,
)
