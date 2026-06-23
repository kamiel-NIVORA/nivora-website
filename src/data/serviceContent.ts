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
    icon: '/icon-appdesign.png',
    tile: '/service-appdesign.png',
    heroImage: '/bg-waves.jpg',
    photo: '/nature-appdesign.jpg',
    anim: '/anim-appdesign.mp4',
    mockup: '/mockup-appdesign.jpg',
    heroVideo: 'brain',
    sectionVideo: 'network',
    accent: '#f5f5f5',
  },
  'local-ai': {
    slug: 'local-ai',
    name: 'Local AI',
    icon: '/icon-localai.png',
    tile: '/service-localai.png',
    heroImage: '/bg-peak-mono.jpg',
    photo: '/nature-localai.jpg',
    anim: '/anim-localai.mp4',
    mockup: '/mockup-localai.jpg',
    objectImage: '/local-private-folder.webp',
    heroVideo: 'orb',
    sectionVideo: 'marble',
    accent: '#f5f5f5',
  },
  aios: {
    slug: 'aios',
    name: 'AIOS',
    icon: '/icon-aios.png',
    tile: '/service-aios.png',
    heroImage: '/IMG_0683.JPG',
    photo: '/nature-aios.jpg',
    anim: '/anim-aios.mp4',
    mockup: '/mockup-aios.jpg',
    heroVideo: 'orbit',
    sectionVideo: 'cluster',
    accent: '#f5f5f5',
  },
  'ai-consulting': {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    icon: '/icon-consulting.png',
    tile: '/service-consulting.png',
    heroImage: '/IMG_0640.JPG',
    photo: '/nature-consulting.jpg',
    anim: '/anim-consulting.mp4',
    mockup: '/mockup-consulting.jpg',
    heroVideo: 'spark',
    sectionVideo: 'terrain',
    accent: '#f5f5f5',
  },
}
