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
  /** The pinned, scroll-driven line (home-style word reveal). One or two short sentences. */
  reveal: string
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
  /** Sharp, premium image behind the hero (scenic or abstract, served from /public). Must NOT be a home-page image. */
  heroImage: string
  /** Calm nature photo, used full-screen in the pinned scroll-reveal, the why-us band, and the final CTA. */
  photo: string
  /** Looping B&W tech animation (muted MP4 in /public) shown in the solution section, e.g. AIOS = a brain forming. */
  anim: string
  /** Device mockup (GIF/JPG in /public) shown in the product-preview band. */
  mockup: string
  /** Optional brand-object shot (premium product photography with copy baked in,
   *  black background). Floats on the page's own black in a dedicated section.
   *  Only set where such an asset exists, e.g. Local AI's "Private / Yours /
   *  Secure / Local" folder. */
  objectImage?: string
  /** Looping muted hero-backdrop video name under /media (black bg, blends via screen). */
  heroVideo: string
  /** Looping muted section/feature video name under /media. */
  sectionVideo: string
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
    icon: '/services/icon-appdesign.png',
    tile: '/services/service-appdesign.webp',
    heroImage: '/services/hero-appdesign.jpg',
    photo: '/IMG_0892.JPG',
    anim: '/services/anim-appdesign.mp4',
    // Brand-neutral device shot (shared with AIOS). The previous asset was a
    // third-party stock template still showing its vendor branding.
    mockup: '/services/mockup-aios.webp',
    heroVideo: 'brain',
    sectionVideo: 'network',
    accent: '#f5f5f5',
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    icon: '/services/icon-localai.png',
    tile: '/services/service-localai.webp',
    heroImage: '/IMG_0885.jpg',
    photo: '/IMG_0895.jpg',
    anim: '/services/anim-localai.mp4',
    mockup: '/services/mockup-localai.webp',
    objectImage: '/services/local-private-folder.webp',
    heroVideo: 'orb',
    sectionVideo: 'marble',
    accent: '#f5f5f5',
  },
  aios: {
    slug: 'aios',
    name: 'AIOS',
    icon: '/services/icon-aios.png',
    tile: '/services/service-aios.webp',
    heroImage: '/services/hero-aios.jpg',
    photo: '/IMG_0897.jpg',
    anim: '/services/anim-aios.mp4',
    mockup: '/services/mockup-aios.webp',
    heroVideo: 'orbit',
    sectionVideo: 'cluster',
    accent: '#f5f5f5',
  },
  'ai-consulting': {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    icon: '/services/icon-consulting.png',
    tile: '/services/service-consulting.webp',
    heroImage: '/services/hero-consulting.jpg',
    photo: '/IMG_0894.jpg',
    anim: '/services/anim-consulting.mp4',
    mockup: '/services/mockup-consulting.webp',
    heroVideo: 'spark',
    sectionVideo: 'terrain',
    accent: '#f5f5f5',
  },
}
