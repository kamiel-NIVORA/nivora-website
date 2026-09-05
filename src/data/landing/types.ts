import type { Localized } from '@/i18n'
import type { LandingId } from './slugs'

/**
 * Types for the programmatic landing pages (/ai-automation, /ai-automation-ghent,
 * /ai-for-accountants, ...). These pages exist to rank for one specific search
 * intent each, so the shape below is built around three rules:
 *
 *  1. Exactly one H1 (`hero.h1`). Blocks only ever carry H2s.
 *  2. Every page owns its own hero, faq and at least two blocks. Shared helpers
 *     in ./shared.ts supply STRUCTURE (phase labels, layout), never sentences.
 *  3. Internal links are typed as `LandingId`, so a broken related-link is a
 *     compile error rather than a 404 discovered in Search Console.
 *
 * The same objects feed the React template (src/pages/LandingPage.tsx) and the
 * static HTML emitted at build time (scripts/prerender.mjs), which is what keeps
 * the prerendered body a faithful copy of what visitors see.
 */

/**
 * `niche` is the highest-intent family: a page written for one trade rather
 * than one place or one technology. Someone searching "AI automatisering
 * expeditiekantoor" is telling you exactly what they do, which is worth more
 * than a city page ever is, and the automations we can name for them are
 * specific enough to be credible.
 */
/* 'product' zijn de dingen die wij bouwen: één concrete oplossing met een naam,
   een afgebakende scope en een herkenbaar eindresultaat, die een klant kan
   aanvragen. De vroegere familie 'solution' bevatte zoekwoordpagina's die niet
   meer waren dan een dienst met een andere kop ("ai consultant", "app laten
   maken"); die zijn verwijderd omdat de dienstenpagina's dat al beter doen. */
/* 'city' zat hier tot augustus 2026, voor de zestien pagina's op het patroon
   ai-automatisering-<stad>. Zie .nivora/geparkeerde-stadspaginas/. */
export type LandingFamily = 'product' | 'niche' | 'sector' | 'question' | 'hub'

/** An internal or external link shown in a link grid or the related block. */
export type LandingLink = { label: string; href: string; blurb?: string }

/** One section of a landing page body. Discriminated on `kind` and rendered by
 *  the switch in src/components/landing/LandingBlocks.tsx — same contract as
 *  `PostBlock` in src/data/posts.ts, but named rather than key-sniffed. */
export type LandingBlock =
  /**
   * The quotable one. `answer` is a self-contained 2-3 sentence reply to the
   * page's core question, written so it survives being lifted out of context:
   * it names Nivora, avoids "we"/"this page", and carries a concrete number or
   * fact where there is one.
   *
   * That is what answer engines (ChatGPT, Perplexity, Claude, AI Overviews)
   * actually quote, and what Google pulls for a featured snippet. It sits
   * directly under the H1 so it is the first prose in the document, and it is
   * mirrored verbatim into the page's `speakable` schema.
   */
  | { kind: 'answer'; h2: string; answer: string; detail?: string[] }
  | { kind: 'prose'; h2: string; body: string[] }
  /**
   * A full-width visual band, used to break up the long text middle of a page.
   *
   * `alt` is required and must describe the image rather than repeat the
   * keyword: it is read aloud by screen readers and it is one of the few places
   * where stuffing is both useless and obvious.
   */
  | { kind: 'image'; src: string; alt: string; caption?: string }
  /**
   * Worked examples. Each is a concrete before/after for a realistic situation:
   * what the task looks like by hand, and what it looks like once a system
   * carries it.
   *
   * These are illustrative scenarios, not client case studies, and they are
   * written to read that way. Presenting an invented example as a delivered
   * result would be a false claim, so the section carries a heading that says
   * what it is and the copy never names or implies a customer.
   */
  /**
   * Four automations this city's businesses could actually run, as a clean row
   * of cards in the same language as the home page's Services band.
   *
   * Each card is a photograph plus two short sentences. That is the whole
   * budget: if it needs a paragraph to explain, it is the wrong example. The
   * photo is matched to the real local industry, so Antwerp shows the port and
   * Kortrijk shows a machine shop rather than everyone getting the same desk.
   */
  | {
      kind: 'automations'
      h2: string
      intro?: string
      /** True voor een rij die al een afgewogen lijst IS (de sectoren op een
       *  stadspagina, de oplossingen op een sector- of oplossingspagina). Zo een
       *  rij mag niet met generieke poolkaarten worden aangevuld: de lijst is
       *  precies wat ze moet zijn. */
      curated?: boolean
      items: {
        title: string
        body: string
        image: string
        alt: string
        /** Canonical (English) base path of the niche page this card opens, e.g.
         *  '/ai-automation-freight-forwarder'. A card that links somewhere is
         *  how a visitor moves from "AI automation in Antwerp" to the page
         *  written for their actual trade, and how the two pages pass authority
         *  to each other. Omit for a card with no page behind it yet. */
        href?: string
      }[]
    }
  /** The older before/after pair, still used by the solution pages. City pages
   *  use `automations` above, which is shorter and carries a photo per card. */
  | {
      kind: 'examples'
      h2: string
      intro?: string
      items: { title: string; before: string; after: string; image?: string; alt?: string }[]
    }
  | { kind: 'pillars'; h2: string; intro?: string; items: { title: string; body: string }[] }
  /**
   * Voor en na, naast elkaar. Bestaat omdat sommige oplossingen niet uit te
   * leggen zijn maar wel te tonen: bij virtual staging is de hele vraag of de
   * verhoudingen kloppen, en dat zie je in twee seconden en lees je in geen
   * enkele alinea.
   */
  | {
      kind: 'beforeAfter'
      h2: string
      intro?: string
      pairs: { before: string; beforeAlt: string; after: string; afterAlt: string; caption: string }[]
    }
  | { kind: 'checklist'; h2: string; intro?: string; items: string[] }
  | { kind: 'steps'; h2: string; intro?: string; steps: { phase: string; title: string; body: string }[] }
  | {
      kind: 'compare'
      h2: string
      intro?: string
      left: string
      right: string
      rows: { label: string; left: string; right: string }[]
    }
  | { kind: 'stats'; h2: string; intro?: string; items: { value: string; label: string }[] }
  | { kind: 'linkGrid'; h2: string; intro?: string; links: LandingLink[] }
  | { kind: 'cta'; h2: string; body: string; button: string; reassurance?: string }

export type LandingFaq = { q: string; a: string }

export type SectorFacts = {
  /** Plural human label, e.g. 'accountantskantoren'. */
  label: string
  /** schema.org audience name, e.g. 'Accounting firms'. */
  audience: string
  /** Solution pages this sector leans on. */
  solutions: LandingId[]
}

export type LandingPage = {
  hero: {
    eyebrow: string
    /** The one and only H1, flat. Used for the SEO title and the schema. */
    h1: string
    /** The H1 split into the lines the home hero renders, one reveal per line.
     *  Optional: derived from `h1` at the first comma when absent. */
    headlineLines?: string[]
    subhead: string
    primaryCta: string
  }
  /**
   * The pinned scroll statement, this page's version of the home line
   * ("Every hour your team spends on repetitive work is an hour we can
   * reclaim..."). Written per page: it is the sentence a visitor remembers, so
   * it is the one that most needs to speak to why they arrived here.
   */
  manifesto: string
  /** Overrides the heading above the products/services cards. Falls back to the
   *  home copy, which is already right for most pages. */
  features?: { title: string; subtitle: string }
  /** Overrides the closing conversion block. Falls back to the home copy. */
  finalCta?: { title: string; body: string }
  /** Hero backdrop. Falls back to the home photo. Existing Nivora photography,
   *  chosen per page so the set does not look like one page repeated. */
  heroImage?: string
  /** Backdrop behind the pinned statement. Falls back to the home photo. */
  manifestoImage?: string
  /** 5 to 8 blocks, ordered. At least five carry an H2. */
  blocks: LandingBlock[]
  /** 4 to 6 entries, written for this page. Always rendered into the DOM
   *  (never behind a collapsed AnimatePresence), so the visible text and the
   *  FAQPage schema can never disagree and answer engines can read every one. */
  faq: LandingFaq[]
  /** Extra links on top of the rule-derived set in ./related.ts. */
  related?: LandingLink[]
  /** Both fall back to derivations of hero.h1 / hero.subhead. */
  seo?: { title?: string; description?: string; ogImage?: string }
  sector?: SectorFacts
}

/** Every file in ./content/ default-exports this. */
export type LandingContent = Localized<LandingPage>
