import type { Lang } from '@/i18n'
import { langHref } from '@/i18n'
import { SITE_URL } from '@/lib/seo'
import { CONTACT, ADDRESS } from '@/data/contact'
import type { LandingPage } from '@/data/landing/types'
import { landingBase, type LandingEntry } from '@/data/landing/slugs'

/**
 * Structured data for the landing pages.
 *
 * One pure function, called both by the runtime `useSeo` hook and by the build
 * script, so the JSON-LD in the prerendered shell and the JSON-LD a browser
 * injects can never disagree.
 *
 * The set is chosen for two audiences at once:
 *   - Google: FAQPage and BreadcrumbList drive rich results; ProfessionalService
 *     with areaServed is what local packs read.
 *   - Answer engines (ChatGPT, Perplexity, Claude, AI Overviews): FAQPage gives
 *     them clean question/answer pairs, `speakable` marks the one paragraph
 *     written to be quoted, and `about`/`author` tie the page to a real entity
 *     and a real person rather than an anonymous page.
 *
 * NAP integrity: Nivora has exactly one address. A city page advertises Brugge
 * plus an `areaServed` for that city. It never claims a local office it does not
 * have, which is the fastest way to get a set of location pages penalised.
 */

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Nivora',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/nivora-logo.png`,
}

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: ADDRESS.line1,
  addressLocality: 'Brugge',
  postalCode: '8000',
  addressCountry: 'BE',
}

const FOUNDER = {
  '@type': 'Person',
  name: 'Kamiel Niville',
  jobTitle: 'Founder',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}/about`,
}

export function landingJsonLd(args: {
  entry: LandingEntry
  page: LandingPage
  lang: Lang
}): Record<string, unknown>[] {
  const { entry, page, lang } = args
  const url = `${SITE_URL}${langHref(lang, landingBase(entry))}`
  const inLanguage = lang === 'nl' ? 'nl-BE' : 'en'
  const name = page.seo?.title ?? `${page.hero.h1} · Nivora`
  const description = page.seo?.description ?? page.hero.subhead

  /* The paragraph written to survive being quoted out of context. */
  const answerBlock = page.blocks.find((b) => b.kind === 'answer')

  const blocks: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${url}#service`,
      name: page.hero.eyebrow,
      description,
      url,
      inLanguage,
      provider: ORG,
      founder: FOUNDER,
      address: POSTAL_ADDRESS,
      telephone: CONTACT.phoneDisplay,
      email: CONTACT.email,
      /* De stadspagina's zetten hier hun eigen stad en provincie neer. Die
         familie bestaat niet meer, dus elke pagina spreekt nu voor het hele
         werkgebied. Zie .nivora/geparkeerde-stadspaginas/. */
      areaServed: [
        { '@type': 'Country', name: 'Belgium' },
        { '@type': 'Country', name: 'Netherlands' },
      ],
      ...(page.sector ? { audience: { '@type': 'Audience', audienceType: page.sector.audience } } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${langHref(lang, '/')}` },
        { '@type': 'ListItem', position: 2, name: page.hero.eyebrow, item: url },
      ],
    },
  ]

  if (page.faq.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage,
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  if (answerBlock?.kind === 'answer') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name,
      description,
      url,
      inLanguage,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@type': 'Thing', name: page.hero.eyebrow },
      publisher: ORG,
      /* Named author and reviewer. Answer engines and Google's quality systems
         both weight content that is attributable to a real, identifiable person
         over anonymous pages, and Kamiel is the one accountable for what these
         pages claim. */
      author: FOUNDER,
      /* Entities this page is about, stated explicitly rather than left for a
         model to infer from prose. This is what lets an answer engine connect
         "AI automation in Ghent" to Nivora as the organisation behind it. */
      mentions: [{ '@type': 'Organization', name: 'Nivora', url: SITE_URL }],
      /* Marks the short, self-contained answer as the passage worth reading
         aloud or quoting. Answer engines and voice assistants use this to pick
         which sentence represents the page. */
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['[data-speakable]'],
      },
      mainEntity: {
        '@type': 'Question',
        name: answerBlock.h2,
        acceptedAnswer: { '@type': 'Answer', text: answerBlock.answer },
      },
    })
  }

  return blocks
}
