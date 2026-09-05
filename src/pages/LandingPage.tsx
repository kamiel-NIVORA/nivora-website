import { Fragment, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLang, type Lang } from '@/i18n'
import { useSeo } from '@/lib/seo'
import { landingJsonLd } from '@/lib/landingSchema'
import { findLandingEntry, landingBase, type LandingEntry } from '@/data/landing/slugs'
import { loadLanding, WRITTEN_IDS, INLINE_LANDING } from '@/data/landing'
import type { LandingId } from '@/data/landing/slugs'
import type { LandingBlock, LandingPage as LandingPageData } from '@/data/landing/types'
import { imageryFor, bandAlt, type PageImagery } from '@/data/landing/imagery'
import { otherProducts, PRODUCTS } from '@/data/landing/products'
import { SECTOR_BY_ID } from '@/data/landing/sectors'
import { LandingBlockView } from '@/components/landing/LandingBlocks'
import { ServiceBadges } from '@/components/landing/ServiceBadges'
import { AskBlock } from '@/components/landing/AskBlock'
import { NotFound } from '@/pages/NotFound'
import { Hero } from '@/sections/Hero'
import { Features } from '@/sections/Features'
import { Manifesto } from '@/sections/Manifesto'
import { Services } from '@/sections/Services'
import { Faq } from '@/sections/Faq'
import { FinalCTA } from '@/sections/FinalCTA'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const COPY = {
  en: {
    faq: 'Questions, answered',
    solutionsH2: 'The solutions that fit this trade',
    solutionsIntro: 'Each of these is a thing we build and a thing you can ask for. Open one to see what it does and where it stops.',
  },
  nl: {
    faq: 'Vragen, beantwoord',
    solutionsH2: 'De oplossingen die in deze sector passen',
    solutionsIntro: 'Elk hiervan is iets dat wij bouwen en dat u kunt aanvragen. Open er een om te zien wat het doet en waar het ophoudt.',
  },
} as const

/**
 * Fill in the photo for an image block.
 *
 * The composers emit `{ kind: 'image', src: '', alt: '' }` as a marker, because
 * a content file should be about words. Which Nivora photograph belongs on
 * which page is decided in src/data/landing/imagery.ts and resolved here, where
 * the page id is known. Blocks of any other kind pass through untouched.
 */
function fillImage(block: LandingBlock, art: PageImagery, lang: Lang): LandingBlock {
  if (block.kind !== 'image' || block.src) return block
  return { ...block, src: art.band.src, alt: bandAlt(art, lang) }
}

/**
 * Op een oplossingspagina toont de kaartenrij de ANDERE oplossingen.
 *
 * Op een beroepspagina slaat de rij op wat daar te automatiseren valt, maar op
 * de pagina van één oplossing zou diezelfde rij hem alleen nog eens uitsplitsen
 * per beroep. De lezer is dan al binnen; wat hij daar nog kan gebruiken is de
 * rest van wat wij bouwen. De kaarten komen uit ./products.ts, zodat een zesde
 * oplossing vanzelf op de vijf andere pagina's verschijnt.
 */
function fillProductRail(block: LandingBlock, selfId: string, lang: Lang): LandingBlock {
  if (block.kind !== 'automations') return block
  return { ...block, items: otherProducts(selfId, lang), curated: true }
}

/**
 * De oplossingen die in één sector thuishoren, als tweede rij op een
 * sectorpagina. Welke dat zijn staat in ./sectors.ts, want een havenpagina hoort
 * geen oplossing voor bouwplannen te tonen.
 */
function solutionRailFor(sectorId: string, lang: Lang, t: { solutionsH2: string; solutionsIntro: string }): LandingBlock | null {
  const ids = (SECTOR_BY_ID.get(sectorId)?.solutions ?? []).filter((id) => WRITTEN_IDS.has(id))
  const items = ids
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
    .map((p) => ({
      title: p.name[lang],
      body: p.blurb[lang],
      image: p.image,
      alt: p.alt[lang],
      href: p.href,
      shared: true,
    }))
  if (!items.length) return null
  return { kind: 'automations', h2: t.solutionsH2, intro: t.solutionsIntro, items, curated: true }
}

/** Split a headline into the two lines the home hero reveals, at the first
 *  comma. Every landing H1 is written with that break in it; anything without
 *  a comma stays on one line rather than being cut at an arbitrary word. */
function splitHeadline(h1: string): string[] {
  const i = h1.indexOf(',')
  return i === -1 ? [h1] : [h1.slice(0, i + 1), h1.slice(i + 1).trim()]
}

/**
 * Load one page's copy.
 *
 * On a direct hit the build script inlined this exact page as JSON in the shell,
 * so the first render already has it and nothing flashes between the
 * prerendered HTML and the React tree that replaces it. On client-side
 * navigation (or in dev) it falls back to the per-page chunk.
 */
function useLandingPage(id: LandingId, lang: Lang): LandingPageData | null {
  const inlined =
    INLINE_LANDING && INLINE_LANDING.id === id && INLINE_LANDING.lang === lang
      ? (INLINE_LANDING.page as LandingPageData)
      : null

  const [page, setPage] = useState<LandingPageData | null>(inlined)

  useEffect(() => {
    if (inlined) {
      setPage(inlined)
      return
    }
    let alive = true
    loadLanding(id)?.then((m) => {
      if (alive) setPage(m.default[lang])
    })
    return () => {
      alive = false
    }
  }, [id, lang, inlined])

  return page
}

/**
 * The page itself.
 *
 * `preloaded` is how the build script renders this component to static HTML:
 * the content is handed in directly, because on the server there is no inline
 * JSON to read and no effect to run. In the browser it is always undefined and
 * the hook below takes over.
 */
export function LandingPageView({
  entry,
  preloaded,
}: {
  entry: LandingEntry
  preloaded?: LandingPageData
}) {
  const { lang } = useLang()
  const t = COPY[lang]
  const loaded = useLandingPage(entry.id as LandingId, lang)
  const page = preloaded ?? loaded
  const art = imageryFor(entry.id)

  const jsonLd = useMemo(
    () => (page ? landingJsonLd({ entry, page, lang }) : undefined),
    [entry, page, lang],
  )

  useSeo({
    title: page?.seo?.title ?? (page ? `${page.hero.h1} · Nivora` : 'Nivora'),
    description: page?.seo?.description ?? page?.hero.subhead,
    path: landingBase(entry),
    ogImage: page?.seo?.ogImage,
    jsonLd,
  })

  // Only reachable during client-side navigation, while the chunk is in flight.
  if (!page) return <main className="min-h-[70vh]" />

  /**
   * A landing page IS the home page, with this page's words in it.
   *
   * The same hero, the same product and service cards, the same pinned
   * statement, the same FAQ and the same closing block, in the same order, so a
   * visitor who arrives on /nl/ai-automatisering-brugge lands on Nivora rather
   * than on something that merely links to it.
   *
   * What differs is the copy, and the middle: between the statement and the
   * services sit this page's own sections (the quotable answer, the local
   * economy, the pillars, the recognition list). That is what keeps 30 pages
   * from being 30 copies, and what the duplicate-paragraph guard in
   * scripts/prerender.mjs enforces at build time.
   */
  /* Uitzondering op "een landingspagina IS de homepagina": een oplossingspagina
     verkoopt één ding. Daar horen de kaders "Onze producten" en "Onze diensten"
     niet thuis, want ze leiden de lezer weg van precies datgene waarvoor hij
     kwam, en de pagina hoeft ook niet uit te leggen uit welke diensten de
     oplossing is samengesteld. Alle andere families houden ze wel. */
  const isProduct = entry.family === 'product'
  const isSector = entry.family === 'niche'
  const sectorSolutions = isSector ? solutionRailFor(entry.id, lang, t) : null
  /* De kaders "Onze producten" en "Onze diensten" horen op de homepagina en op
     een stadspagina, waar de lezer nog moet ontdekken wat wij doen. Op een
     oplossings- of sectorpagina leiden ze hem juist weg van precies datgene
     waarvoor hij binnenkwam. */
  const hideCards = isProduct || isSector

  return (
    <main>
      <Hero
        headlineLines={page.hero.headlineLines ?? splitHeadline(page.hero.h1)}
        sub={page.hero.subhead}
        image={page.heroImage ?? art.hero}
      />
      {!hideCards && <Features title={page.features?.title} subtitle={page.features?.subtitle} />}
      {isProduct && <ServiceBadges services={PRODUCTS.find((p) => p.id === entry.id)?.services ?? []} />}
      <Manifesto
        copy={page.manifesto}
        image={page.manifestoImage ?? art.manifesto}
        /* Korter dan op de homepagina: hier is de vastgezette zin sfeer en geen
           bestemming, en elke schermhoogte die hij inneemt staat tussen de
           bezoeker en de oplossingen waarvoor hij gekomen is. */
        hold="h-[170svh]"
      />

      {page.blocks.map((block, i) => {
        let b = fillImage(block, art, lang)
        if (isProduct) b = fillProductRail(b, entry.id, lang)
        /* De oplossingenrij komt op een sectorpagina meteen NA het antwoordblok.
           Wie hier binnenvalt heeft één vraag ("wat kunnen jullie voor mij
           doen") en die is met het antwoord beantwoord; wat hij daarna wil zien
           is wat wij concreet bouwen, niet eerst nog drie schermen onderbouwing.
           Stond vroeger na de kaartenrij "wat we kunnen automatiseren", maar die
           rij verdwijnt per sector zodra de echte oplossingen geschreven zijn. */
        const after =
          sectorSolutions && block.kind === 'answer' ? (
            <LandingBlockView key={`${i}-solutions`} block={sectorSolutions} index={i + 1} />
          ) : null
        return (
          <Fragment key={i}>
            <LandingBlockView block={b} index={i} />
            {after}
          </Fragment>
        )
      })}

      {/* The lead capture. Sits right after this page's own content, while the
          reader still has a specific task in their head, and before the shared
          sections. Writes to Supabase via api/lead.ts so it lands in the CRM. */}
      <AskBlock page={entry.slugs.nl} />

      {/* Site furniture: the same service cards every page carries, like the nav
          and the footer. Both sections tag themselves with data-shared so the
          content guard in scripts/prerender.mjs measures this page's own
          writing rather than the boilerplate every page legitimately shares. */}
      {!hideCards && <Services />}
      <NewsletterSignup source={`landing-${entry.family}`} />
      <Faq title={t.faq} items={page.faq} />
      <FinalCTA title={page.finalCta?.title} body={page.finalCta?.body} />
    </main>
  )
}

/**
 * Route entry for every programmatic landing page.
 *
 * Registered in App.tsx as `<Route path=":landingSlug">`, after all the explicit
 * routes. React Router ranks by specificity rather than declaration order, so
 * /about and friends still win; this only catches single-segment paths that
 * nothing else claimed. Because a dynamic segment outranks the `*` splat, this
 * route now owns the 404 for unknown single-segment URLs, hence the explicit
 * NotFound below (which sets noindex) rather than a redirect to the homepage.
 *
 * The slug must match the ACTIVE language: /ai-automatisering only resolves
 * under /nl, so every page has exactly one address per language.
 */
export function LandingRoute() {
  const { landingSlug } = useParams<{ landingSlug: string }>()
  const { lang } = useLang()
  const entry = findLandingEntry(landingSlug, lang)

  if (!entry || !WRITTEN_IDS.has(entry.id)) return <NotFound />

  // Remount per page so intro state never leaks between landing pages.
  return <LandingPageView key={entry.id} entry={entry} />
}
