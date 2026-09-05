import type { Lang, Localized } from '@/i18n'
import type { LandingContent, LandingPage } from './types'

/**
 * Composer for the solution landing pages (/ai-consultant, /nl/lokale-ai, ...).
 *
 * Same idea as ./cityPage.ts: this file supplies the section order and the
 * handful of genuinely shared sentences, while everything a reader actually
 * reads is authored per page in ./content/<id>.ts.
 *
 * The rendered page is the home page with these words in it (see
 * src/pages/LandingPage.tsx), so the hero, the feature cards, the pinned
 * statement, the services, the FAQ and the closing block all come from the home
 * sections. What lands between the statement and the services is the part below.
 */

export type SolutionCopy = {
  /** Eyebrow above the headline, and the name used in the schema. */
  eyebrow: string
  /** The H1. Written per page, with a comma where the hero should break lines. */
  h1: string
  subhead: string
  /** The quotable paragraph: names Nivora, survives being lifted out of context. */
  answer: string
  /** Heading for the answer block, phrased as the question it answers. */
  answerH2: string
  /** One or two paragraphs that sharpen the definition. */
  answerDetail: string[]
  /** This page's version of the home page's pinned statement. */
  manifesto: string
  /** The problem this page is really about. */
  problemH2: string
  problem: string[]
  /** Toont het probleemblok als genummerde stappen in plaats van als drie
   *  alinea's onder elkaar. Drie alinea's van vijf regels leest niemand; drie
   *  genummerde momenten met een korte zin leest wel iedereen. `problem` blijft
   *  dan de teksten en dit zijn de kopjes erboven, één per alinea. */
  problemSteps?: { phase: string; title: string }[]
  /** Three things this solution actually covers. Titles authored too, since a
   *  chatbot page and an ERP page have nothing structural in common. */
  pillarsH2: string
  pillars: { title: string; body: string }[]
  /** "Is this you?" recognition list, 4 lines. */
  signals: string[]
  /** What changes, concretely. Optioneel: een pagina die al kort genoeg is,
   *  wordt niet beter van nog een blok proza onderaan. */
  outcomesH2?: string
  outcomes?: string[]
  /** Zet op false om de fotoband in het midden weg te laten. Op een pagina die
   *  bewust kort is, is dat een scherm scrollen zonder dat er iets gezegd
   *  wordt. */
  band?: boolean
  /** Two or three worked examples: what the task looks like by hand, and what
   *  it looks like once a system carries it. Illustrative scenarios, never
   *  presented as delivered client work. Optional: a niche page uses the
   *  automation rail below instead. */
  examplesH2?: string
  examplesIntro?: string
  examples?: { title: string; before: string; after: string }[]
  /** Four automations for this trade, shown as the endless card rail. Titles
   *  are capped at 22 characters by the build guard, so keep them short. */
  automationsH2?: string
  automationsIntro?: string
  automations?: { title: string; body: string; image: string; alt: string; href?: string }[]
  /** Voor en na, naast elkaar. Alleen voor oplossingen waar het resultaat te
   *  zien is in plaats van uit te leggen. */
  beforeAfterH2?: string
  beforeAfterIntro?: string
  beforeAfter?: { before: string; beforeAlt: string; after: string; afterAlt: string; caption: string }[]
  /** 4 questions written for this page. */
  faqs: { q: string; a: string }[]
  /** Overrides the heading above the product/service cards. */
  featuresTitle: string
  featuresSubtitle: string
  /** The closing block. */
  ctaTitle: string
  ctaBody: string
  seoTitle: string
  seoDescription: string
}

function buildPage(lang: Lang, copy: Localized<SolutionCopy>): LandingPage {
  const c = copy[lang]
  const nl = lang === 'nl'

  return {
    hero: {
      eyebrow: c.eyebrow,
      h1: c.h1,
      subhead: c.subhead,
      primaryCta: nl ? 'Boek een gesprek' : 'Book a call',
    },
    manifesto: c.manifesto,
    features: { title: c.featuresTitle, subtitle: c.featuresSubtitle },
    finalCta: { title: c.ctaTitle, body: c.ctaBody },
    blocks: [
      { kind: 'answer', h2: c.answerH2, answer: c.answer, detail: c.answerDetail },
      c.problemSteps
        ? {
            kind: 'steps' as const,
            h2: c.problemH2,
            steps: c.problemSteps.map((st, i) => ({ ...st, body: c.problem[i] ?? '' })),
          }
        : { kind: 'prose' as const, h2: c.problemH2, body: c.problem },
      { kind: 'pillars', h2: c.pillarsH2, items: c.pillars },
      ...(c.beforeAfter
        ? [
            {
              kind: 'beforeAfter' as const,
              h2: c.beforeAfterH2 ?? (nl ? 'Voor en na' : 'Before and after'),
              intro: c.beforeAfterIntro,
              pairs: c.beforeAfter,
            },
          ]
        : []),
      /* A visual break in the middle of the text. Placeholder src; the real
         image is stitched in by solutionPage() below, which knows the page id. */
      ...(c.band === false ? [] : [{ kind: 'image' as const, src: '', alt: '' }]),
      /* Eigen voorbeelden vóór de kaartenrij. Op een oplossingspagina IS die rij
         "onze andere oplossingen", en die hoort niet tussen de lezer en het
         sterkste stuk van de pagina te staan: eerst tonen wat dit ding doet,
         dan pas de deur naar iets anders openzetten. Op een sector- of
         stadspagina heeft alleen de rij inhoud, dus daar verandert er niets. */
      ...(c.examples
        ? [
            {
              kind: 'examples' as const,
              h2: c.examplesH2 ?? '',
              intro: c.examplesIntro,
              items: c.examples,
            },
          ]
        : []),
      ...(c.automations
        ? [
            {
              kind: 'automations' as const,
              h2: c.automationsH2 ?? (nl ? 'Wat we kunnen automatiseren' : 'What we can automate'),
              intro: c.automationsIntro,
              items: c.automations,
            },
          ]
        : []),
      {
        kind: 'checklist',
        h2: nl ? 'Herkent u dit?' : 'Does this sound familiar?',
        intro: nl
          ? 'Herkent u er twee of meer, dan is er vrijwel zeker iets te winnen.'
          : 'If two or more of these land, there is almost certainly something to gain.',
        items: c.signals,
      },
      ...(c.outcomes?.length
        ? [{ kind: 'prose' as const, h2: c.outcomesH2 ?? '', body: c.outcomes }]
        : []),
    ],
    faq: c.faqs,
    seo: { title: c.seoTitle, description: c.seoDescription },
  }
}

/** Build the bilingual content object for one solution page. */
export function solutionPage(
  copy: Localized<SolutionCopy>,
  images?: { hero?: string; manifesto?: string },
): LandingContent {
  const withImages = (p: LandingPage): LandingPage => ({
    ...p,
    heroImage: images?.hero,
    manifestoImage: images?.manifesto,
  })
  return { en: withImages(buildPage('en', copy)), nl: withImages(buildPage('nl', copy)) }
}
