import { renderToStaticMarkup } from 'react-dom/server'
import { MotionConfig } from 'framer-motion'
import { StaticRouter } from 'react-router'
import { Routes, Route, Outlet } from 'react-router-dom'
import { LanguageProvider, langHref, splitLangPath, type Lang } from '@/i18n'
import { ContactModalProvider } from '@/components/contact/ContactModal'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LandingPageView } from '@/pages/LandingPage'
import { SitemapPage } from '@/pages/SitemapPage'
/* Direct, niet-lazy imports: renderToStaticMarkup kan React.lazy niet oplossen,
   dus de statische route-tabel hieronder importeert elke pagina rechtstreeks. */
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { ServicePage } from '@/pages/ServicePage'
import { BlogIndex } from '@/pages/BlogIndex'
import { BlogPost } from '@/pages/BlogPost'
import { MediaKit } from '@/pages/MediaKit'
import { WaitlistPage } from '@/pages/WaitlistPage'
import { AffiliatePage } from '@/pages/AffiliatePage'
import { HelpCenterPage } from '@/pages/HelpCenterPage'
import { ContactPage } from '@/pages/ContactPage'
import { LegalPage } from '@/pages/LegalPage'
import { landingJsonLd } from '@/lib/landingSchema'
import { LANDING_ENTRIES, landingBase } from '@/data/landing/slugs'
import type { LandingContent } from '@/data/landing/types'

/**
 * SSR entry point, imported by scripts/prerender.mjs at build time.
 *
 * This is the piece that fixes the core problem: without it every URL on the
 * site serves `<div id="root"></div>` and 15 bytes of body, so every crawler
 * that does not run JavaScript (GPTBot, ClaudeBot, PerplexityBot, CCBot, link
 * previews) sees no content at all.
 *
 * Note it renders LandingPageView directly rather than going through the router
 * and LandingRoute: renderToStaticMarkup cannot resolve React.lazy, and the
 * route component is lazily imported in App.tsx.
 */

/* Eager, because the whole point is one synchronous bundle Node can call into. */
const CONTENT = import.meta.glob<{ default: LandingContent }>('../data/landing/content/*.ts', {
  eager: true,
})

const contentFor = (id: string): LandingContent | undefined =>
  CONTENT[`../data/landing/content/${id}.ts`]?.default

/** Every landing page that has copy written, with its base path per language. */
export const ROUTES = LANDING_ENTRIES.filter((e) => contentFor(e.id)).map((e) => ({
  id: e.id,
  family: e.family,
  bases: { en: `/${e.slugs.en}`, nl: `/${e.slugs.nl}` },
}))

export type RenderResult = {
  body: string
  data: { id: string; lang: Lang; page: unknown }
  meta: {
    /** The headline as written, so the build can assert the rendered H1 still
     *  reads as words rather than as one run-on string. */
    h1: string
    title: string
    description: string
    ogImage?: string
    jsonLd: Record<string, unknown>[]
  }
}

/** Wrap a page in the providers it needs, then render it to static HTML.
 *  The Footer is included on purpose: it carries the links to the services,
 *  the legal pages and /sitemap, so every prerendered page hands a crawler the
 *  rest of the site even when no JavaScript runs. */
function renderAt(url: string, node: React.ReactNode, withNav = false): string {
  return renderToStaticMarkup(
    /* isStatic turns off every dynamic behaviour in framer-motion, so components
       render their resolved state instead of their `initial` one. Without it
       every animated section ships style="opacity:0" in the static HTML, which
       hides the copy from any crawler that does not run JavaScript. The Reveal
       guard covers the components we wrote; this covers the ones that use motion
       directly (the hero word reveal, the feature cards, the showcases). */
    <MotionConfig isStatic>
      <StaticRouter location={url}>
        <LanguageProvider>
          <ContactModalProvider>
            {withNav ? <Navbar /> : null}
            {node}
            <Footer />
          </ContactModalProvider>
        </LanguageProvider>
      </StaticRouter>
    </MotionConfig>,
  )
}

/* Routes that render as a single focused frame, zonder site-chrome. Spiegelt
   BARE_ROUTES in App.tsx: staat het hier, dan krijgt de pagina geen Navbar. */
const BARE_ROUTES = new Set(['/waitlist'])

/**
 * De statische route-tabel. Spiegelt routeTree() in src/App.tsx, maar met
 * directe imports in plaats van React.lazy, want renderToStaticMarkup kan lazy
 * niet oplossen. De <Routes> zijn nodig omdat ServicePage en BlogPost hun slug
 * uit useParams halen.
 *
 * Bewust NIET hierin: /partnership (client-side Navigate), /newsletter/confirmed,
 * /unsubscribed en de 404. Die zijn noindex en krijgen geen shell.
 */
function staticRouteTree() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services/:slug" element={<ServicePage />} />
      <Route path="blog" element={<BlogIndex />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="media" element={<MediaKit />} />
      <Route path="waitlist" element={<WaitlistPage />} />
      <Route path="affiliate" element={<AffiliatePage />} />
      <Route path="help" element={<HelpCenterPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="terms" element={<LegalPage slug="terms" />} />
      <Route path="privacy" element={<LegalPage slug="privacy" />} />
      <Route path="sitemap" element={<SitemapPage />} />
    </>
  )
}

/**
 * Rendert een van de vaste routes tot echte HTML.
 *
 * Dit is het stuk dat het grootste inhoudelijke probleem oplost: tot nu toe
 * kregen alleen de landings en /sitemap een body, en serveerden de homepage,
 * /about, alle /services/* en alle /blog/* een lege `<div id="root">`. Elke
 * crawler die geen JavaScript draait zag op al die pagina's exact dezelfde
 * generieke noscript-tekst, wat ze onderling niet te onderscheiden maakt.
 *
 * Geeft null terug als de route niets rendert, zodat de build terugvalt op de
 * oude alleen-head-shell in plaats van een lege body te schrijven.
 */
export function renderStatic(base: string, lang: Lang): string | null {
  const url = langHref(lang, base)
  const { base: cleanBase } = splitLangPath(url)
  const body = renderAt(
    url,
    <Routes>
      {staticRouteTree()}
      <Route path="nl" element={<Outlet />}>
        {staticRouteTree()}
      </Route>
    </Routes>,
    !BARE_ROUTES.has(cleanBase),
  )
  return body && body.trim() ? body : null
}

/**
 * /sitemap, the index of every URL.
 *
 * This one has to carry a real body more than any other page: it is the link
 * hub the footer points at, so if a crawler without JavaScript sees an empty
 * document here, every landing page behind it is an orphan.
 */
export function renderSitemap(lang: Lang): string {
  return renderAt(langHref(lang, '/sitemap'), <SitemapPage />)
}

export function renderLanding(id: string, lang: Lang): RenderResult {
  const entry = LANDING_ENTRIES.find((e) => e.id === id)
  if (!entry) throw new Error(`prerender: unknown landing id "${id}"`)

  const content = contentFor(id)
  if (!content) throw new Error(`prerender: no content module for "${id}"`)

  const page = content[lang]
  const url = langHref(lang, landingBase(entry))

  const body = renderAt(url, <LandingPageView entry={entry} preloaded={page} />)

  return {
    body,
    data: { id, lang, page },
    meta: {
      /** The headline as written, so the build can assert the rendered H1 still
       *  reads as words rather than as one run-on string. */
      h1: page.hero.h1,
      title: page.seo?.title ?? `${page.hero.h1} · Nivora`,
      description: page.seo?.description ?? page.hero.subhead,
      ogImage: page.seo?.ogImage,
      jsonLd: landingJsonLd({ entry, page, lang }),
    },
  }
}
