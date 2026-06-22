/**
 * Service landing-page contract.
 *
 * `ServiceContent` is the copy contract every service page is built from — the
 * actual written content lives in `services.ts` (authored separately) and must
 * conform to this shape. `SERVICE_META` holds the design-side decisions (icon,
 * atmosphere photo, accent colour) that the template uses for styling.
 */

export type ServiceSlug = 'app-design' | 'local-ai' | 'aios' | 'ai-consulting'

export interface ServiceContent {
  slug: ServiceSlug
  name: string
  hero: {
    eyebrow: string
    headline: string
    subhead: string
    primaryCta: string
    secondaryCta: string
  }
  /** One-line positioning statement + three short principle chips. */
  intro: {
    statement: string
    chips: string[]
  }
  /** Agitate the real, specific pain before the solution. */
  problem: {
    title: string
    intro: string
    points: { title: string; body: string }[]
  }
  /** What the service is, plus what the client walks away with. */
  solution: {
    title: string
    body: string
    outcomes: string[]
  }
  /** What's included / how it works — the feature grid. */
  capabilities: {
    title: string
    intro: string
    items: { title: string; body: string }[]
  }
  /** The "listen → build → stay" backbone, adapted per service. */
  process: {
    title: string
    steps: { label: string; title: string; body: string }[]
  }
  /** Why Nivora — the reasons to choose a builder, not a vendor. */
  differentiators: {
    title: string
    items: { title: string; body: string }[]
  }
  /** Qualify the right buyer (and gently disqualify the wrong one). */
  audience: {
    title: string
    body: string
    fits: string[]
    notFor: string[]
  }
  faq: { q: string; a: string }[]
  finalCta: {
    title: string
    body: string
    button: string
    reassurance: string
  }
}

export interface ServiceMeta {
  slug: ServiceSlug
  name: string
  /** White glyph icon in /public. */
  icon: string
  /** App-style rounded tile mark — the same image shown in the nav Services menu. */
  tile: string
  /** Per-service ambient image washed faintly behind the hero (unique per service). */
  heroImage: string
  /** Calm atmosphere photo used in the mid-page band. */
  photo: string
  /** Accent colour (from the brand palette) used sparingly for glow + detail. */
  accent: string
}

/** Display + routing order. */
export const SERVICE_ORDER: ServiceSlug[] = [
  'app-design',
  'local-ai',
  'aios',
  'ai-consulting',
]

export const SERVICE_META: Record<ServiceSlug, ServiceMeta> = {
  'app-design': {
    slug: 'app-design',
    name: 'App Design',
    icon: '/icon-appdesign.png',
    tile: '/service-appdesign.png',
    heroImage: '/IMG_0690%202.jpg',
    photo: '/IMG_0701.JPG',
    accent: '#d07a54',
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    icon: '/icon-localai.png',
    tile: '/service-localai.png',
    heroImage: '/IMG_0479.JPG',
    photo: '/IMG_0683.JPG',
    accent: '#6691a3',
  },
  aios: {
    slug: 'aios',
    name: 'AIOS',
    icon: '/icon-aios.png',
    tile: '/service-aios.png',
    heroImage: '/IMG_0459%202.JPG',
    photo: '/images/hero-bg.jpg',
    accent: '#bda96d',
  },
  'ai-consulting': {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    icon: '/icon-consulting.png',
    tile: '/service-consulting.png',
    heroImage: '/IMG_0743.jpg',
    photo: '/cta-landscape.jpg',
    accent: '#96a766',
  },
}
