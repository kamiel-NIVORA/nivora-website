import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Minus } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { RoiCalculator } from '@/components/ui/RoiCalculator'
import { ScrollStatement } from '@/components/ui/ScrollStatement'
import { ServiceIntro } from '@/components/ui/ServiceIntro'
import { ProcessTimeline } from '@/components/ui/ProcessTimeline'
import { useContactModal } from '@/components/contact/ContactModal'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { getServiceContent } from '@/data/services'
import { getServiceRoi } from '@/data/serviceRoi'
import { useLang, type Lang } from '@/i18n'
import {
  SERVICE_META,
  SERVICE_ORDER,
  type ServiceContent,
  type ServiceMeta,
  type ServiceSlug,
} from '@/data/serviceContent'

const ease = [0.16, 1, 0.3, 1] as const

/** Intro keywords: name the pain, then the resolution. Short, on the nose. */
const INTRO_WORDS: Record<Lang, Record<ServiceSlug, string[]>> = {
  en: {
    'app-design': ['Your idea.', 'Built properly.', 'Owned by you.'],
    'local-ai': ['Your hardware.', 'No cloud.', 'Owned by you.'],
    aios: ['Too many tools.', 'One system.', 'Owned by you.'],
    'ai-consulting': ['No more hype.', 'Proof first.', 'Then a plan.'],
  },
  nl: {
    'app-design': ['Uw idee.', 'Goed gebouwd.', 'In uw bezit.'],
    'local-ai': ['Uw hardware.', 'Geen cloud.', 'In uw bezit.'],
    aios: ['Te veel tools.', 'Eén systeem.', 'In uw bezit.'],
    'ai-consulting': ['Geen hype meer.', 'Eerst bewijs.', 'Dan een plan.'],
  },
}

/** App types shown in the vertical marquee on the App Design statement section. */
/** Static UI strings on the service page, by language. */
const UI = {
  en: {
    walkAway: 'What you walk away with',
    bookCall: 'Book a strategy call',
    brandObjectTitle: 'Yours to keep. Private to the core.',
    brandObjectBody:
      'Everything runs inside your own infrastructure: the models, the data, and every answer. Nothing is rented, nothing is sent away, and nothing ever leaves the building.',
    brandObjectAlt: 'A Nivora folder labelled Private, Yours, Secure, Local, held in hand.',
    privacyHeadline:
      'Everything your team asks. Everything they receive. None of it leaves this building.',
    privacyFacts: [
      {
        label: 'No cloud API',
        body: 'Every prompt runs inside your infrastructure. Nothing touches OpenAI, Azure, or any third-party model.',
      },
      {
        label: 'On your hardware',
        body: 'The models run on servers you control, not infrastructure rented from someone else.',
      },
      {
        label: 'Full audit trail',
        body: 'A complete record of who asked what, when, and what was answered. Compliance-ready from day one.',
      },
      {
        label: 'Owned outright',
        body: 'The system, the models, the configuration. Yours to keep, move, or hand to another team.',
      },
    ],
    showcaseHeadline: 'Every screen designed with intention. Every icon a statement.',
    showcaseBoardLabel: 'Style Board',
    showcaseCardTitle: 'Crafted, not assembled.',
    showcaseCardBody:
      'From the icon to the last interaction, we design the whole thing. The apps people open every day have a visual language no template ever gave them.',
    comparisonHeadline:
      'The difference is not just where the data goes. It is who controls every part of the chain.',
    cloudTitle: 'Cloud AI',
    cloudSub: 'ChatGPT, Copilot, Gemini and others',
    localTitle: 'Local AI by Nivora',
    localSub: 'Installed on infrastructure you control',
    comparisonRows: [
      {
        label: 'Where your data goes',
        cloud: 'Third-party servers. Once sent, out of your control.',
        local: 'Your servers or hardware we manage. Never leaves your perimeter.',
      },
      {
        label: 'Compliance proof',
        cloud: 'A promise in a terms document. Hard to verify under scrutiny.',
        local: 'Architectural: the data cannot leave, plus a full audit trail.',
      },
      {
        label: 'Model control',
        cloud: 'The provider decides what changes and when, without asking you.',
        local: 'You control every update. New models deployed on your terms.',
      },
      {
        label: 'Pricing',
        cloud: 'Per-seat, per-month. Grows every time your team does.',
        local: 'One deployment. No recurring fee per user, ever.',
      },
      {
        label: 'Outage exposure',
        cloud: 'If their API goes down, your team waits.',
        local: 'Runs on your hardware. Independent of any third-party uptime.',
      },
      {
        label: 'How your data is used',
        cloud: 'Terms may allow use for training or product improvement.',
        local: 'Used only by you. For nothing and nobody else.',
      },
    ],
    strongFit: 'A strong fit if',
    probablyNot: 'Probably not if',
    goodToKnow: 'Good to know',
    stillQuestion: 'Still have a question?',
    reachPerson: 'reach a person',
    orVisit: 'or visit the',
    helpCenter: 'Help Center',
    exploreOther: 'Explore other services',
  },
  nl: {
    walkAway: 'Wat u overhoudt',
    bookCall: 'Boek een strategiegesprek',
    brandObjectTitle: 'Helemaal van u. Privé tot in de kern.',
    brandObjectBody:
      'Alles draait binnen uw eigen infrastructuur: de modellen, de data, en elk antwoord. Niets wordt gehuurd, niets wordt weggestuurd, en niets verlaat ooit het gebouw.',
    brandObjectAlt: 'Een Nivora-map met het label Private, Yours, Secure, Local, in de hand gehouden.',
    privacyHeadline:
      'Alles wat uw team vraagt. Alles wat ze ontvangen. Niets ervan verlaat dit gebouw.',
    privacyFacts: [
      {
        label: 'Geen cloud-API',
        body: 'Elke prompt draait binnen uw infrastructuur. Niets raakt OpenAI, Azure of welk extern model dan ook.',
      },
      {
        label: 'Op uw hardware',
        body: 'De modellen draaien op servers die u beheert, niet op infrastructuur die u van iemand anders huurt.',
      },
      {
        label: 'Volledige audit trail',
        body: 'Een volledig logboek van wie wat wanneer vroeg, en wat er geantwoord werd. Klaar voor compliance vanaf dag één.',
      },
      {
        label: 'Volledig in eigen bezit',
        body: 'Het systeem, de modellen, de configuratie. Helemaal van u: om te houden, te verhuizen, of door te geven aan een ander team.',
      },
    ],
    showcaseHeadline: 'Elk scherm ontworpen met intentie. Elk icoon een statement.',
    showcaseBoardLabel: 'Style Board',
    showcaseCardTitle: 'Vakwerk, geen montage.',
    showcaseCardBody:
      'Van het icoon tot de laatste interactie, we ontwerpen het geheel. De apps die mensen elke dag openen hebben een visuele taal die geen enkele template ze ooit gaf.',
    comparisonHeadline:
      'Het verschil is niet alleen waar de data heen gaat. Het is wie elk deel van de keten beheert.',
    cloudTitle: 'Cloud-AI',
    cloudSub: 'ChatGPT, Copilot, Gemini en anderen',
    localTitle: 'Local AI van Nivora',
    localSub: 'Geïnstalleerd op infrastructuur die u beheert',
    comparisonRows: [
      {
        label: 'Waar uw data heen gaat',
        cloud: 'Servers van derden. Eenmaal verstuurd, buiten uw controle.',
        local: 'Uw servers of hardware die wij beheren. Verlaat nooit uw perimeter.',
      },
      {
        label: 'Bewijs van compliance',
        cloud: 'Een belofte in een voorwaardendocument. Moeilijk hard te maken bij een grondige controle.',
        local: 'Architecturaal: de data kan niet weg, plus een volledige audit trail.',
      },
      {
        label: 'Controle over het model',
        cloud: 'De leverancier beslist wat er verandert en wanneer, zonder het u te vragen.',
        local: 'U beheert elke update. Nieuwe modellen uitgerold op uw voorwaarden.',
      },
      {
        label: 'Prijs',
        cloud: 'Per gebruiker, per maand. Groeit telkens uw team groeit.',
        local: 'Eén uitrol. Nooit een terugkerende kost per gebruiker.',
      },
      {
        label: 'Blootstelling aan uitval',
        cloud: 'Als hun API uitvalt, zit uw team te wachten.',
        local: 'Draait op uw hardware. Onafhankelijk van de uptime van derden.',
      },
      {
        label: 'Hoe uw data gebruikt wordt',
        cloud: 'De voorwaarden kunnen gebruik voor training of productverbetering toelaten.',
        local: 'Alleen door u gebruikt. Voor niets en niemand anders.',
      },
    ],
    strongFit: 'Een sterke match als',
    probablyNot: 'Waarschijnlijk niet als',
    goodToKnow: 'Goed om te weten',
    stillQuestion: 'Nog een vraag?',
    reachPerson: 'spreek een mens',
    orVisit: 'of bezoek het',
    helpCenter: 'Helpcentrum',
    exploreOther: 'Ontdek andere diensten',
  },
} as const

/** Image shown per capability index on the App Design accordion. */
const APP_CAPABILITY_IMAGES = [
  '/services/showcase-appdesign.jpg',
  '/services/service-appdesign.webp',
  '/services/icons-appdesign.jpg',
  '/services/service-appdesign.webp',
  '/services/showcase-appdesign.jpg',
  '/services/service-appdesign.webp',
]

/** A short phase word for the process timeline, from the step title ("We listen first" → "Listen"). */
function phaseWord(title: string): string {
  const w = title.replace(/^We\s+/i, '').split(' ')[0]
  return w.charAt(0).toUpperCase() + w.slice(1)
}

/* ──────────────────────────────────────────────────────────────────────────
   Service page · scenic, image-led, home-page branding
   Flow: hero → statement → scroll-reveal → problem → solution → capabilities
        → why-us band → process → ROI (not for consulting) → fit/faq → CTA
   ────────────────────────────────────────────────────────────────────────── */
export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const dict = getServiceContent(lang)
  const isValid = !!slug && slug in dict
  const content = isValid ? dict[slug as ServiceSlug] : null
  const meta = isValid ? SERVICE_META[slug as ServiceSlug] : null

  useEffect(() => {
    if (!content) return
    document.title = `${content.name} · Nivora`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    const prev = meta.getAttribute('content')
    meta.setAttribute('content', content.hero.subhead)
    return () => {
      document.title = 'Nivora'
      if (prev != null) meta!.setAttribute('content', prev)
    }
  }, [content])

  if (!content || !meta) return <Navigate to="/" replace />

  return (
    <ServiceIntro words={INTRO_WORDS[lang][meta.slug]} accent={meta.accent}>
      <main
        className="relative w-full overflow-x-clip bg-bg"
        style={{ ['--accent' as string]: meta.accent } as CSSProperties}
      >
        <Hero content={content} meta={meta} />
        <WhatYouGet meta={meta} />
        <ScrollStatement image={meta.photo} copy={content.reveal} accent={meta.accent} />
        <Problem content={content} />
        <Solution content={content} meta={meta} />
        {meta.slug === 'local-ai' && <PrivacyBand meta={meta} />}
        {meta.objectImage && <BrandObject meta={meta} />}
        {meta.slug === 'app-design' ? <AppCapabilities content={content} /> : <Capabilities content={content} />}
        {meta.slug === 'app-design' && <AppShowcase />}
        {meta.slug === 'local-ai' && <ComparisonBand />}
        <WhyUs content={content} meta={meta} />
        <Process content={content} meta={meta} />
        <RoiBand meta={meta} />
        <FitFaq content={content} />
        <FinalCta content={content} meta={meta} />
        <OtherServices current={meta.slug} />
        <ServiceAskFab meta={meta} />
      </main>
    </ServiceIntro>
  )
}

/* Shared bits ─────────────────────────────────────────────────────────────── */

/** A scenic photo that drifts gently against the scroll. Always covers its box. */
function ParallaxImage({
  src,
  range = ['-8%', '8%'],
  className,
}: {
  src: string
  range?: [string, string]
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], range)
  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <motion.img
        src={src}
        alt=""
        aria-hidden
        style={{ y, top: '-15%' }}
        className="absolute left-0 h-[130%] w-full object-cover"
      />
    </div>
  )
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[22px] border border-line bg-surface p-7',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </div>
  )
}

/** A looping animation that melts into the page. The clips are white-on-black,
 *  so mix-blend-screen drops the black and only the luminous motion reads over
 *  the dark page, its edges masked into the background (no hard box). */
function AnimFrame({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <video
        src={src}
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(72%_72%_at_50%_46%,#000_48%,transparent_92%)] [-webkit-mask-image:radial-gradient(72%_72%_at_50%_46%,#000_48%,transparent_92%)]"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}

/* Brand object · a premium product shot that floats on the page's own black.
   Its edges are feathered with a radial mask so the photo's black margin melts
   into the page (no visible frame), with a soft bloom behind and a gentle
   scroll-drift. Used where a service has a hero brand asset, e.g. Local AI's
   "Private / Yours / Secure / Local" folder. */
function BrandObject({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const t = UI[lang]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  if (!meta.objectImage) return null

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy — complements the words baked into the object */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {t.brandObjectTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-faint lg:text-base">
              {t.brandObjectBody}
            </p>
          </Reveal>
        </div>

        {/* The floating object */}
        <div ref={ref} className="relative order-1 lg:order-2">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[80px]"
            style={{ background: `radial-gradient(50% 45% at 50% 42%, ${meta.accent}1f, transparent 72%)` }}
          />
          <Reveal y={32}>
            <motion.img
              src={meta.objectImage}
              alt={t.brandObjectAlt}
              loading="lazy"
              style={{ y }}
              className="relative mx-auto block w-full max-w-[440px] will-change-transform [mask-image:radial-gradient(80%_80%_at_50%_50%,#000_72%,transparent_100%)] [-webkit-mask-image:radial-gradient(80%_80%_at_50%_50%,#000_72%,transparent_100%)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Product showcase · the real product floating on the page's own black. Generalises
   the BrandObject pattern to any service with a product shot (e.g. AIOS on an iPad):
   a headline, one line, and the top outcomes as proof. Self-gates per slug. */
const SHOWCASE: Record<ServiceSlug, { img?: string; video?: string; alt?: string }> = {
  'app-design': { video: '/media/network.mp4' },
  'local-ai': { video: '/media/mesh.mp4' },
  aios: { img: '/services/mockup-aios-ipad.png', alt: 'The Nivora AIOS interface on an iPad.' },
  'ai-consulting': { video: '/media/threads.mp4' },
}
const SHOWCASE_COPY: Record<Lang, Record<ServiceSlug, { eyebrow: string; title: string; body: string }>> = {
  en: {
    'app-design': {
      eyebrow: 'What we build',
      title: "The app you've been picturing, built for real.",
      body: 'Designed and built end to end, in your brand, never a template with new colours. You own the code, the design files and the data.',
    },
    'local-ai': {
      eyebrow: 'What we build',
      title: 'The same AI, inside your own walls.',
      body: 'Capable models running on hardware you control. Every prompt and document stays in your building, nothing leaves for a public cloud.',
    },
    aios: {
      eyebrow: 'What we build',
      title: 'One system your team actually opens.',
      body: 'This is AIOS on a real workflow. Your CRM, projects, operations and knowledge in one place, with AI doing the work across all of it.',
    },
    'ai-consulting': {
      eyebrow: 'What you get',
      title: 'Know what to build before you spend a cent.',
      body: 'We find where AI actually pays off, prove it with a small pilot, and hand you a ranked roadmap. No tool to sell, so the advice stays honest.',
    },
  },
  nl: {
    'app-design': {
      eyebrow: 'Wat we bouwen',
      title: 'De app die u voor ogen heeft, echt gebouwd.',
      body: 'Van begin tot eind ontworpen en gebouwd, in uw huisstijl, nooit een template met andere kleuren. U bezit de code, de ontwerpbestanden en de data.',
    },
    'local-ai': {
      eyebrow: 'Wat we bouwen',
      title: 'Dezelfde AI, binnen uw eigen muren.',
      body: 'Krachtige modellen op hardware die u beheert. Elke prompt en elk document blijft in uw gebouw, niets gaat naar een publieke cloud.',
    },
    aios: {
      eyebrow: 'Wat we bouwen',
      title: 'Eén systeem dat uw team echt opent.',
      body: 'Dit is AIOS op een echte workflow. Uw CRM, projecten, operations en kennis op één plek, met AI die er het werk in doet.',
    },
    'ai-consulting': {
      eyebrow: 'Wat u krijgt',
      title: 'Weet wat u moet bouwen, voor u een euro uitgeeft.',
      body: 'We zoeken waar AI echt loont, bewijzen het met een kleine pilot, en geven u een geprioriteerde roadmap. Geen tool te verkopen, dus eerlijk advies.',
    },
  },
}

function WhatYouGet({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const asset = SHOWCASE[meta.slug]
  const copy = SHOWCASE_COPY[lang][meta.slug]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{copy.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[40px] lg:text-[46px]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-faint">{copy.body}</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative order-1 lg:order-2">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[90px]"
            style={{ background: `radial-gradient(52% 46% at 50% 44%, ${meta.accent}1f, transparent 72%)` }}
          />
          {asset.img ? (
            <Reveal y={32}>
              <motion.img
                src={asset.img}
                alt={asset.alt ?? ''}
                loading="lazy"
                style={{ y }}
                className="relative mx-auto block w-full max-w-[520px] will-change-transform [mask-image:radial-gradient(80%_80%_at_50%_50%,#000_68%,transparent_100%)] [-webkit-mask-image:radial-gradient(80%_80%_at_50%_50%,#000_68%,transparent_100%)]"
              />
            </Reveal>
          ) : asset.video ? (
            <Reveal y={24}>
              <AnimFrame src={asset.video} className="relative mx-auto aspect-square w-full max-w-[460px]" />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/* Floating "ask Nivora about this service" button. Clean glass FAB, bottom-right,
   that opens the Help Center with a per-service question already sent. Hovering
   reveals the question. Bilingual. ─────────────────────────────────────────────*/
const SERVICE_ASK: Record<Lang, Record<ServiceSlug, { label: string; prompt: string }>> = {
  en: {
    'app-design': {
      label: 'What is App Design?',
      prompt: 'What is App Design at Nivora and what do I get out of it?',
    },
    'local-ai': {
      label: 'What is Local AI?',
      prompt: 'What is Local AI and how does it keep my data private?',
    },
    aios: {
      label: 'What is AIOS?',
      prompt: 'What is AIOS and what are the benefits for my company?',
    },
    'ai-consulting': {
      label: 'What is AI Consulting?',
      prompt: 'What does AI Consulting do and when is it the right fit for me?',
    },
  },
  nl: {
    'app-design': {
      label: 'Wat is App Design?',
      prompt: 'Wat is App Design bij Nivora en wat levert het mij op?',
    },
    'local-ai': {
      label: 'Wat is Local AI?',
      prompt: 'Wat is Local AI en hoe houdt het mijn data privé?',
    },
    aios: {
      label: 'Wat is AIOS?',
      prompt: 'Wat is AIOS en wat zijn de voordelen voor mijn bedrijf?',
    },
    'ai-consulting': {
      label: 'Wat is AI Consulting?',
      prompt: 'Wat doet AI Consulting en wanneer is het iets voor mij?',
    },
  },
}

function ServiceAskFab({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const ask = SERVICE_ASK[lang][meta.slug]
  return (
    <Link
      to={`/help?ask=${encodeURIComponent(ask.prompt)}`}
      aria-label={ask.label}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none hidden max-w-0 overflow-hidden whitespace-nowrap rounded-full border border-line bg-black/70 py-2.5 text-[13.5px] font-medium text-ink-soft opacity-0 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 group-hover:max-w-[320px] group-hover:px-4 group-hover:opacity-100 sm:block">
        {ask.label}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-[18px] border border-line bg-black/55 text-ink shadow-[0_12px_44px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-line-strong group-hover:bg-black/70">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(70%_60%_at_50%_22%,rgba(255,255,255,0.16),transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[18px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        <img src="/brand/ask-icon.png" alt="" className="relative h-[26px] w-[26px] object-contain" />
      </span>
    </Link>
  )
}

/* Privacy band · four architecture facts, Local AI only ─────────────────────── */

/** Four architecture-level privacy facts. Only shown for Local AI. */
function PrivacyBand({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const t = UI[lang]
  const facts = t.privacyFacts

  return (
    <section className="relative w-full overflow-hidden border-y border-line py-20 lg:py-28">
      <ParallaxImage src="/backgrounds/bg-peak-mono.webp" range={['-6%', '6%']} />
      <div className="absolute inset-0 bg-bg/88" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${meta.accent}0f, transparent 70%)` }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mt-5 font-serif text-[26px] leading-[1.3] tracking-[-0.01em] text-ink sm:text-[32px] lg:text-[38px] lg:leading-[1.24]">
              {t.privacyHeadline}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <GlassCard className="h-full">
                <h3 className="font-serif text-[19px] leading-snug tracking-[-0.01em] text-ink">{f.label}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-faint">{f.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Hero · scenic landscape, like the home page ───────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease } },
}

function Hero({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const { open } = useContactModal()
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid min-h-[100svh] w-full place-items-center overflow-hidden px-6 pb-24 pt-32">
      {/* Scenic landscape backdrop, drifting on scroll */}
      <ParallaxImage src={meta.heroImage} range={['-6%', '6%']} />
      {/* Overlays: darken for the nav, fade the foot into the page */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Centered scrim so the headline stays legible over bright scenic photos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(78% 60% at 50% 46%, rgba(0,0,0,0.5), rgba(0,0,0,0.18) 58%, transparent 78%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44vh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 28%, ${meta.accent}1a, transparent 66%)` }}
      />

      <motion.div
        variants={heroContainer}
        initial={reduced ? false : 'hidden'}
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <h1 className="mt-6 font-serif text-[38px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[66px] lg:leading-[1.03]">
          {content.hero.headline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/85 lg:text-[17px]"
        >
          {content.hero.subhead}
        </motion.p>

        <motion.div variants={heroFade} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BookCallButton className="h-11 px-6 text-[14px]">{content.hero.primaryCta}</BookCallButton>
          <RippleButton
            href="#contact"
            variant="ghost"
            className="h-11 px-6 text-[14px]"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            {content.hero.secondaryCta}
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* Statement ─────────────────────────────────────────────────────────────────── */

/* Problem · clean cards, no rails ───────────────────────────────────────────── */

function Problem({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.problem.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.problem.intro}</p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
        {content.problem.points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <GlassCard className="h-full">
              <h3 className="text-[18px] font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{p.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Solution · sticky media + outcomes checklist (the "sold" moment) ──────────── */

function Solution({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const { lang } = useLang()
  const t = UI[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {content.solution.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <AnimFrame src={meta.anim} className="mt-8 aspect-[5/4]" />
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.08}>
            <p className="text-[15.5px] leading-relaxed text-faint lg:text-base">{content.solution.body}</p>
          </Reveal>
          <div className="mt-9 rounded-[22px] border border-line bg-white/[0.02] p-7 lg:p-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-faint">{t.walkAway}</span>
            <ul className="mt-6 flex flex-col gap-4.5">
              {content.solution.outcomes.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 0.07} className="flex items-start gap-3.5">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={2} />
                  <span className="text-[15px] leading-relaxed text-ink-soft">{o}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.12}>
            <BookCallButton className="mt-8 h-11 px-6 text-[14px]">{t.bookCall}</BookCallButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Capabilities · a calm, even grid of what's included ───────────────────────── */

function Capabilities({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.capabilities.title}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.capabilities.intro}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.capabilities.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.07}>
            <GlassCard className="h-full">
              <span className="font-serif text-[30px] leading-none text-ink/20">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-[19px] leading-snug tracking-[-0.01em] text-ink lg:text-[20px]">{it.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-faint">{it.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* App Design: accordion capabilities + sticky image preview ──────────────────── */

function AppCapabilities({ content }: { content: ServiceContent }) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.capabilities.title}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.capabilities.intro}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Left: accordion list */}
        <div className="flex flex-col">
          {content.capabilities.items.map((it, i) => (
            <button
              key={it.title}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="group flex items-start gap-5 border-b border-line py-5 text-left first:border-t"
            >
              <span className={cn('shrink-0 font-serif text-[14px] tabular-nums transition-colors duration-200', activeIdx === i ? 'text-ink/60' : 'text-dim')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className={cn('text-[17px] font-semibold tracking-tight transition-colors duration-200', activeIdx === i ? 'text-ink' : 'text-muted')}>
                  {it.title}
                </div>
                <AnimatePresence initial={false}>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-[14px] leading-relaxed text-faint">{it.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className={cn('shrink-0 text-[20px] font-light transition-all duration-300', activeIdx === i ? 'rotate-45 text-ink' : 'text-dim')}>
                +
              </span>
            </button>
          ))}
        </div>

        {/* Right: sticky image preview (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={APP_CAPABILITY_IMAGES[activeIdx]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070709]/50 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* App Design showcase · editorial two-column image grid ─────────────────────── */

function AppShowcase() {
  const { lang } = useLang()
  const t = UI[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-12 lg:py-20">
      <Reveal>
        <p className="mx-auto mb-10 max-w-2xl text-center font-serif text-[24px] leading-[1.28] tracking-[-0.01em] text-ink sm:text-[28px] lg:text-[32px]">
          {t.showcaseHeadline}
        </p>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        {/* Style board — main feature */}
        <Reveal delay={0.06}>
          <div className="relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <img
              src="/services/showcase-appdesign.jpg"
              alt=""
              loading="lazy"
              className="block w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070709]/70 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">{t.showcaseBoardLabel}</span>
            </div>
          </div>
        </Reveal>

        {/* Right column: icons + copy card */}
        <div className="flex flex-col gap-4">
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <img
                src="/services/icons-appdesign.jpg"
                alt=""
                loading="lazy"
                className="block w-full"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="rounded-[20px] border border-line bg-surface p-6">
              <p className="font-serif text-[20px] leading-snug tracking-[-0.01em] text-ink">
                {t.showcaseCardTitle}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-faint">
                {t.showcaseCardBody}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Cloud vs Local comparison · only for local-ai ─────────────────────────────── */

function ComparisonBand() {
  const { lang } = useLang()
  const t = UI[lang]
  const COMPARISON_ROWS = t.comparisonRows
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {t.comparisonHeadline}
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 lg:grid-cols-2">
        {/* Cloud AI column */}
        <div className="rounded-[22px] border border-line bg-white/[0.01] p-6 lg:p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.04]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-faint" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </span>
            <div>
              <span className="block text-[15px] font-semibold text-faint">{t.cloudTitle}</span>
              <span className="block text-[12px] text-dim">{t.cloudSub}</span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-line/50">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className="flex items-start gap-3 py-4">
                <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-dim" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" />
                </svg>
                <div>
                  <span className="block text-[13px] font-medium text-faint">{row.label}</span>
                  <span className="block text-[13px] leading-relaxed text-dim">{row.cloud}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local AI column */}
        <div className="relative overflow-hidden rounded-[22px] border border-line-strong bg-white/[0.04] p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.08]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-soft" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <rect x="2" y="2" width="20" height="8" rx="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </span>
            <div>
              <span className="block text-[15px] font-semibold text-ink">{t.localTitle}</span>
              <span className="block text-[12px] text-faint">{t.localSub}</span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-line/50">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className="flex items-start gap-3 py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={2.2} />
                <div>
                  <span className="block text-[13px] font-medium text-ink">{row.label}</span>
                  <span className="block text-[13px] leading-relaxed text-ink-soft/80">{row.local}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Why us · selling reasons over a scenic, drifting band ─────────────────────── */

function WhyUs({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      <ParallaxImage src={meta.photo} range={['-10%', '10%']} />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${meta.accent}14, transparent 70%)` }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {content.differentiators.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {content.differentiators.items.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 0.08}>
              <GlassCard className="h-full">
                <h3 className="text-[17px] font-semibold tracking-tight text-ink">{d.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{d.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Process · numbered step cards, no rails ───────────────────────────────────── */

function Process({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.process.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-16">
        <ProcessTimeline
          accent={meta.accent}
          steps={content.process.steps.map((s) => ({ phase: phaseWord(s.title), title: s.title, body: s.body }))}
        />
      </div>
    </section>
  )
}

/* ROI band · only where money-saved is the honest pitch (not consulting) ────── */

function RoiBand({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const config = getServiceRoi(lang)[meta.slug]
  if (!config) return null // AI Consulting sells the plan, not hours saved

  return (
    <section className="relative w-full border-y border-line py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 60% at 50% 0%, ${meta.accent}0d, transparent 70%)` }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mt-5 font-serif text-[24px] leading-[1.3] tracking-[-0.01em] text-ink sm:text-[28px] lg:text-[32px]">
              {config.framing}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Fit + FAQ · comparison two-up, then accordion ─────────────────────────────── */

function FitFaq({ content }: { content: ServiceContent }) {
  const { open } = useContactModal()
  const { lang } = useLang()
  const t = UI[lang]
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <Reveal>
        <h2 className="max-w-2xl font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
          {content.audience.title}
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.audience.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[22px] border border-[var(--accent)]/25 bg-[var(--accent)]/[0.05] p-7">
            <h3 className="text-[15px] font-semibold text-ink">{t.strongFit}</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {content.audience.fits.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[var(--accent)]" strokeWidth={2.2} />
                  <span className="text-[14.5px] leading-relaxed text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-[22px] border border-line bg-white/[0.015] p-7">
            <h3 className="text-[15px] font-semibold text-muted">{t.probablyNot}</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {content.audience.notFor.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Minus className="mt-0.5 h-[18px] w-[18px] shrink-0 text-dim" strokeWidth={2} />
                  <span className="text-[14.5px] leading-relaxed text-faint">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <Reveal>
          <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">{t.goodToKnow}</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-faint">
            {t.stillQuestion}{' '}
            <button
              type="button"
              onClick={open}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {t.reachPerson}
            </button>
            {' '}{t.orVisit}{' '}
            <Link
              to="/help"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {t.helpCenter}
            </Link>
            .
          </p>
        </Reveal>
        <div className="flex flex-col gap-3">
          {content.faq.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <Reveal key={item.q} delay={(i % 4) * 0.04}>
                <div className="overflow-hidden rounded-[18px] border border-line bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-medium text-ink">{item.q}</span>
                    <ChevronDown
                      className={cn('h-4 w-4 shrink-0 text-faint transition-transform duration-300', isOpen && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease }}
                      >
                        <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-faint">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Final CTA over media ─────────────────────────────────────────────────────── */

function FinalCta({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid w-full place-items-center overflow-hidden px-6 py-24 lg:py-36">
      <ParallaxImage src={meta.photo} range={['-8%', '8%']} />
      <div className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 80% at 50% 50%, ${meta.accent}1f, transparent 60%)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />

      <motion.div
        initial={reduced ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true }}
        variants={heroContainer}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[52px]">
          {content.finalCta.title.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.2em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.p variants={heroFade} className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
          {content.finalCta.body}
        </motion.p>
        <motion.div variants={heroFade} className="mt-9 flex justify-center">
          <BookCallButton className="h-12 px-7 text-[15px]">{content.finalCta.button}</BookCallButton>
        </motion.div>
        <motion.p variants={heroFade} className="mt-5 text-[13px] text-dim">
          {content.finalCta.reassurance}
        </motion.p>
      </motion.div>
    </section>
  )
}

/* Other services ───────────────────────────────────────────────────────────── */

function OtherServices({ current }: { current: ServiceSlug }) {
  const { lang } = useLang()
  const t = UI[lang]
  const dict = getServiceContent(lang)
  const others = SERVICE_ORDER.filter((s) => s !== current)
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-28">
      <div className="border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-faint">{t.exploreOther}</h2>
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {others.map((slug, i) => {
            const m = SERVICE_META[slug]
            const c = dict[slug]
            return (
              <Reveal key={slug} delay={i * 0.07}>
                <Link
                  to={`/services/${slug}`}
                  className="group flex items-center gap-4 rounded-[18px] border border-line bg-white/[0.02] p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.04]"
                >
                  <img src={m.icon} alt="" className="h-8 w-8 shrink-0 object-contain" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium text-ink">{m.name}</span>
                    <span className="block truncate text-[13px] text-faint">{c.hero.eyebrow}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
