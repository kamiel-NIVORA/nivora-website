import type { Lang } from '@/i18n'
import { langHref } from '@/i18n'
import { SITE_URL } from '@/lib/seo'
import { CONTACT, ADDRESS } from '@/data/contact'
import type { LandingPage } from '@/data/landing/types'
import { BY_ID, landingBase, type LandingEntry } from '@/data/landing/slugs'
import { humanise } from '@/data/landing/related'

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

/** Het kruimelpad: Home, eventueel de sectorpagina waar deze pagina onder hangt,
 *  en dan de pagina zelf. */
function crumbs(entry: LandingEntry, lang: Lang, url: string) {
  const items: Record<string, unknown>[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${langHref(lang, '/')}` },
  ]
  const hub = entry.hub === entry.id ? undefined : BY_ID.get(entry.hub)
  if (hub) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: humanise(hub, lang),
      item: `${SITE_URL}${langHref(lang, `/${hub.slugs.en}`)}`,
    })
  }
  /* De naam van DEZE pagina, niet de eyebrow: die is op alle offerpagina's
     dezelfde ("Aanbod voor architectenbureaus") en dan zegt het kruimelpad
     vijf keer hetzelfde. humanise() geeft de echte naam uit de labeltabel. */
  items.push({ '@type': 'ListItem', position: items.length + 1, name: humanise(entry, lang), item: url })
  return items
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

  /* De prijs uit het prijsblok, als die er is.
     Staat de prijs zichtbaar op de pagina, dan hoort hij ook in het schema: dat
     is wat een zoekresultaat een prijs laat tonen. Het bedrag wordt uit de tekst
     gelezen ("€1.950" wordt 1950) in plaats van apart onderhouden, want twee
     bronnen voor hetzelfde bedrag lopen uit elkaar en dan staat er een andere
     prijs in het zoekresultaat dan op de pagina. Lukt dat lezen niet, dan komt
     er geen offers-veld: liever geen prijs dan een verkeerde. */
  const priceBlock = page.blocks.find((b) => b.kind === 'price')
  const priceValue = priceBlock ? Number(priceBlock.amount.replace(/[^\d]/g, '')) : NaN
  const offers =
    priceBlock && Number.isFinite(priceValue) && priceValue > 0
      ? {
          offers: {
            '@type': 'Offer',
            price: String(priceValue),
            priceCurrency: 'EUR',
            /* De getoonde prijs is exclusief btw, en dat zegt het schema er ook
               bij in plaats van het aan de lezer over te laten. */
            valueAddedTaxIncluded: false,
            availability: 'https://schema.org/InStock',
            url,
            description: priceBlock.qualifier,
          },
        }
      : {}

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
      ...offers,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      /* Drie niveaus waar er drie zijn. Een offerpagina hangt onder een
         sectorpagina (`hub` in de registry), en dat pad zichtbaar maken helpt
         Google de cluster te lezen en levert het kruimelpad in het
         zoekresultaat. Wijst de hub naar zichzelf of naar een pagina zonder
         tekst, dan blijft het bij twee niveaus in plaats van een lus. */
      itemListElement: crumbs(entry, lang, url),
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
