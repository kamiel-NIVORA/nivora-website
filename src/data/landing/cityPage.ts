import type { Lang, Localized } from '@/i18n'
import type { LandingContent, LandingPage, GeoFacts } from './types'
import type { LandingId } from './slugs'

/**
 * Composer for the city landing pages (/ai-automation-bruges,
 * /nl/ai-automatisering-brugge, ...).
 *
 * The rule that keeps these out of doorway-page territory: this file supplies
 * STRUCTURE and the handful of genuinely shared sentences. Everything that
 * carries meaning, the H1, the subhead, the quotable answer, the local economy,
 * the three pillar bodies and the local FAQ, is authored per city in
 * ./content/<id>.ts and passed in here.
 *
 * A competitor doing this badly writes one page and swaps the city name, which
 * lands around 20% unique text. These come out above 55%, because the parts a
 * reader actually reads are written for that city.
 *
 * The build guard in scripts/prerender.mjs enforces it: if a substantial
 * paragraph shows up on more than three pages, the build fails.
 */

/** Everything one city page needs, per language. */
export type CityCopy = {
  /** The H1. Written per city, and deliberately NOT one template with a hole in
   *  it, so 35 pages do not all share a headline shape. */
  h1: string
  subhead: string
  /** The quotable paragraph. Names the city and Nivora, works out of context. */
  answer: string
  /** This page's version of the home page's pinned statement. Same shape as
   *  "Every hour your team spends on repetitive work is an hour we can
   *  reclaim...", rewritten for what that hour is actually spent on here. */
  manifesto: string
  /** Four automations a business of this kind could run, each a photograph plus
   *  two short sentences. Illustrative, never presented as delivered client work.
   *  `image` is a path under /landing, `alt` describes what is in the frame.
   *
   *  Cities still on the older before/after pairs keep `examples` until their
   *  four cards and photographs are written. Exactly one of the two is required. */
  automations?: {
    title: string
    body: string
    image: string
    alt: string
    /** Canonical (English) base path of the niche page this card opens. A card
     *  that links is how someone reading "AI automation in Antwerp" reaches the
     *  page written for their actual trade. */
    href?: string
  }[]
  examples?: { title: string; before: string; after: string }[]
  /** Three FAQs written for this city. The generic ones live on /ai-automation;
   *  repeating them here would be the duplication the build guard exists to catch. */
  faqs: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

export type CityInput = {
  geo: Omit<GeoFacts, 'city' | 'province'> & {
    city: Localized<string>
    province: Localized<string>
  }
  copy: Localized<CityCopy>
}

/** Travel framing. Real distances, because "we are local everywhere" reads as
 *  what it is. Brugge is the office, everything else is an honest drive. */
function reach(lang: Lang, city: string, km: number): string {
  if (km === 0) {
    return lang === 'nl'
      ? `Nivora zit in ${city}. Geen reistijd, dus langsgaan is nooit een discussie.`
      : `Nivora's office is in ${city}. No travel time, so dropping by is never a negotiation.`
  }
  return lang === 'nl'
    ? `Nivora zit in Brugge, ongeveer ${km} kilometer van ${city}. Dichtbij genoeg om aan tafel te zitten wanneer dat telt, en de rest gaat op afstand.`
    : `Nivora works out of Brugge, roughly ${km} kilometres from ${city}. Close enough to sit at the table when that matters, and remote for the rest.`
}

function buildPage(lang: Lang, input: CityInput): LandingPage {
  const c = input.copy[lang]
  const city = input.geo.city[lang]
  const province = input.geo.province[lang]
  const nl = lang === 'nl'

  return {
    hero: {
      eyebrow: nl ? `AI-automatisering ${city}` : `AI automation in ${city}`,
      h1: c.h1,
      subhead: c.subhead,
      primaryCta: nl ? 'Boek een gesprek' : 'Book a call',
    },
    manifesto: c.manifesto,
    finalCta: {
      title: nl ? `Laten we het juiste bouwen voor ${city}` : `Let's build the right thing for ${city}`,
      body: nl
        ? `Breng één terugkerende taak mee die uw team in ${city} echt uren kost. U krijgt een recht antwoord of automatiseren de moeite waard is, en ongeveer wat het zou vragen. Is het antwoord nee, dan hoort u dat ook.`
        : `Bring one recurring task that costs your team in ${city} real hours. You get a straight answer on whether automating it is worth it, and roughly what it would take. If the answer is no, you will hear that too.`,
    },
    /**
     * Short on purpose.
     *
     * These pages used to carry long-form essays: the local economy, three
     * pillars, a recognition list, an outcomes section. That reads as filler to
     * the person it is written for, a Flemish business owner who wants to know
     * in thirty seconds what this does for them.
     *
     * So the page is now three things: a plain answer, concrete examples each
     * with a photograph of that kind of work, and the questions people actually
     * ask. Everything else was cut.
     */
    blocks: [
      {
        kind: 'answer',
        h2: nl ? `Wat we doen voor bedrijven in ${city}` : `What we do for companies in ${city}`,
        answer: c.answer,
        detail: [reach(lang, city, input.geo.distanceKm)],
      },
      c.automations
        ? {
            kind: 'automations' as const,
            h2: nl ? `Wat we kunnen automatiseren in ${city}` : `What we can automate in ${city}`,
            intro: nl
              ? `Vier voorbeelden. Geen klantendossiers, wel werk dat bedrijven in ${province} elke dag doen.`
              : `Four examples. Not client cases, but work companies in ${province} do every day.`,
            items: c.automations,
          }
        : {
            kind: 'examples' as const,
            h2: nl ? 'Wat we concreet kunnen doen' : 'What we can actually do',
            intro: nl
              ? `Voorbeelden, geen klantendossiers. Wel werk dat bedrijven in ${province} elke dag doen.`
              : `Examples, not client cases. But work companies in ${province} do every day.`,
            items: c.examples ?? [],
          },
    ],
    /* Three FAQs written for this city, plus the travel question, whose answer
       names the city and the real distance and is therefore different on every
       page. The generic questions (cost, replacing software, data residency)
       deliberately stay on /ai-automation instead of being repeated 35 times. */
    faq: [
      ...c.faqs,
      {
        q: nl ? 'Moeten we naar Brugge komen?' : 'Do we have to come to Brugge?',
        a: nl
          ? `Nee. ${reach(lang, city, input.geo.distanceKm)} De eerste sessies gebeuren het liefst bij u in ${city}, want daar staat het werk dat we moeten begrijpen.`
          : `No. ${reach(lang, city, input.geo.distanceKm)} The early sessions happen at your place in ${city} by preference, because that is where the work we need to understand actually sits.`,
      },
    ],
    geo: {
      city,
      province,
      distanceKm: input.geo.distanceKm,
      nearby: input.geo.nearby,
    },
    related: [{ label: nl ? 'AI-automatisering' : 'AI automation', href: '/ai-automation' }],
    seo: { title: c.seoTitle, description: c.seoDescription },
  }
}

/** Build the bilingual content object for one city page. */
export function cityPage(input: CityInput): LandingContent {
  return { en: buildPage('en', input), nl: buildPage('nl', input) }
}

/** Re-exported so content files get autocomplete on `nearby`. */
export type { LandingId }
