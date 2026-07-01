import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  CloudOff,
  Handshake,
  Headset,
  Mail,
  Megaphone,
  Minus,
  Plus,
  Receipt,
  Scale,
  ShieldCheck,
  UserPlus,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { RoiCalculator } from '@/components/ui/RoiCalculator'
import { ScrollStatement } from '@/components/ui/ScrollStatement'
import { ProcessTimeline } from '@/components/ui/ProcessTimeline'
import { JourneyTimeline } from '@/components/ui/JourneyTimeline'
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
    showcaseHeadline: 'Every screen with intention. Down to the last icon.',
    showcaseSub:
      'Not a single screen that just turned out that way. Everything is there for a reason, and you feel it with every tap.',
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
    reachPerson: 'get in touch',
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
    showcaseHeadline: 'Elk scherm met intentie. Tot het laatste icoon.',
    showcaseSub:
      'Geen scherm dat toevallig zo geworden is. Alles staat er met een reden, en dat voelt u bij elke tik.',
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
    reachPerson: 'neem gerust contact op',
    orVisit: 'of bezoek het',
    helpCenter: 'Helpcentrum',
    exploreOther: 'Ontdek andere diensten',
  },
} as const

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
    <main
      className="relative w-full overflow-x-clip bg-bg"
      style={{ ['--accent' as string]: meta.accent } as CSSProperties}
    >
        <Hero content={content} meta={meta} />
        <WhatYouGet meta={meta} />
        <ScrollStatement
          image={
            meta.slug === 'app-design'
              ? '/services/statement-appdesign.webp'
              : meta.slug === 'local-ai'
                ? '/services/statement-localai.webp'
                : meta.slug === 'aios'
                  ? '/services/statement-aios.webp'
                  : meta.photo
          }
          copy={content.reveal}
          accent={meta.accent}
        />
        {meta.slug === 'aios' && <AiosWhoFor meta={meta} />}
        {meta.slug === 'aios' && <AiosTimeline />}
        {meta.slug === 'aios' && <AiosWorkGrid />}
        {meta.slug === 'local-ai' && <LocalWhoFor />}
        {meta.slug === 'local-ai' && <ComparisonBand />}
        {meta.slug === 'local-ai' && <ServerTimeline />}
        {meta.slug === 'app-design' && <AppWhoFor />}
        {meta.slug === 'app-design' && <AppBuildShapes />}
        {meta.slug === 'local-ai'
          ? <LocalAiTension content={content} />
          : meta.slug !== 'app-design' && <Problem content={content} />}
        {meta.slug !== 'app-design' && meta.slug !== 'aios' && <Solution content={content} meta={meta} />}
        {meta.slug === 'local-ai' && <PrivacyBand meta={meta} />}
        {meta.objectImage && <BrandObject meta={meta} />}
        {meta.slug !== 'app-design' && <Capabilities content={content} />}
        {meta.slug === 'app-design' && <AppShowcase />}
        <WhyUs content={content} meta={meta} />
        {meta.slug !== 'app-design' && <Process content={content} meta={meta} />}
        {meta.slug === 'local-ai' && <JourneyTimeline />}
        <RoiBand meta={meta} />
        <FitFaq content={content} />
        <FinalCta content={content} meta={meta} />
        <OtherServices current={meta.slug} />
        <ServiceAskFab meta={meta} />
    </main>
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

/** Glass card with a subtle cursor-following 3D tilt, a glossy highlight that
 *  tracks the pointer, and a soft depth shadow on hover. Calms to a flat card
 *  when the visitor prefers reduced motion. */
function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 220, damping: 20 })
  const glossX = useTransform(px, (v) => `${v * 100}%`)
  const glossY = useTransform(py, (v) => `${v * 100}%`)
  const gloss = useMotionTemplate`radial-gradient(380px circle at ${glossX} ${glossY}, rgba(255,255,255,0.07), transparent 60%)`

  if (reduced) {
    return (
      <div className={cn('relative overflow-hidden rounded-[22px] border border-line bg-surface p-7', className)}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        'group/card relative overflow-hidden rounded-[22px] border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-line-strong hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <motion.div
        aria-hidden
        style={{ background: gloss }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
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
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20 lg:py-28">
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
const SHOWCASE: Record<ServiceSlug, { img?: string; video?: string; gif?: string; alt?: string }> = {
  'app-design': { video: '/services/anim-appdesign.mp4' },
  'local-ai': {
    img: '/services/showcase-localai.webp',
    alt: 'A hand holding a private folder, your own data turned into an AI that works for you.',
  },
  aios: { gif: '/services/aios-network.gif' },
  'ai-consulting': { video: '/media/threads.mp4' },
}
const SHOWCASE_COPY: Record<Lang, Record<ServiceSlug, { eyebrow: string; title: string; body: string }>> = {
  en: {
    'app-design': {
      eyebrow: '',
      title: 'Your idea, sharpened into an app that lives.',
      body: 'Bring us your idea, even the boldest one. We sharpen it together and take it from concept to a living, working app: business-grade, ready to ship as an internal B2B tool or a B2C product for your customers.',
    },
    'local-ai': {
      eyebrow: '',
      title: 'Your data becomes an AI that works for you.',
      body: 'Everything your company knows is now scattered across folders, documents and inboxes, quiet and hard to find right when you need it. We bring it together into one intelligence you can simply ask. It learns from your own data, grows more useful every day, and never leaves your own walls.',
    },
    aios: {
      eyebrow: '',
      title: 'You pay for ten tools and glue them together yourself.',
      body: 'Every part of your business lives in a different program, and none of them know what the others are doing. We bring it all together into one smart whole that knows your entire company and takes the work off your hands, so your team can focus on what matters and your business runs on AI instead of reaching for it now and then.',
    },
    'ai-consulting': {
      eyebrow: 'What you get',
      title: 'Know what to build before you spend a cent.',
      body: 'We find where AI actually pays off, prove it with a small pilot, and hand you a ranked roadmap. No tool to sell, so the advice stays honest.',
    },
  },
  nl: {
    'app-design': {
      eyebrow: '',
      title: 'Uw idee, aangescherpt tot een app die leeft.',
      body: 'Breng ons uw idee, ook het meest gewaagde. We scherpen het samen aan en tillen het van concept naar een levende, werkende app: zakelijk solide, klaar om in te zetten als interne B2B-tool of als B2C-product voor uw klanten.',
    },
    'local-ai': {
      eyebrow: '',
      title: 'Uw data wordt een AI die voor u werkt.',
      body: 'Alles wat uw bedrijf weet ligt nu verspreid over mappen, documenten en inboxen, stil en moeilijk te vinden net op het moment dat u het nodig hebt. Wij brengen dat samen tot één intelligentie die u gewoon iets kunt vragen. Ze leert van uw eigen data, wordt elke dag bruikbaarder, en verlaat nooit uw eigen muren.',
    },
    aios: {
      eyebrow: '',
      title: 'Je betaalt voor tien tools en plakt ze zelf aan elkaar.',
      body: 'Elk stuk van je bedrijf zit in een ander programma, en niemand weet van elkaar wat er speelt. Wij brengen alles samen in één slim geheel dat je hele bedrijf kent en het werk overneemt, zodat je team focust op wat telt en je bedrijf voortaan op AI draait in plaats van het er af en toe bij te pakken.',
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
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          {copy.eyebrow && (
            <Reveal>
              <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{copy.eyebrow}</p>
            </Reveal>
          )}
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
          {asset.gif ? (
            <Reveal y={24}>
              <motion.div
                style={{ y }}
                className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden will-change-transform"
              >
                <img
                  src={asset.gif}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(72%_72%_at_50%_50%,#000_46%,transparent_92%)] [-webkit-mask-image:radial-gradient(72%_72%_at_50%_50%,#000_46%,transparent_92%)]"
                  style={{ mixBlendMode: 'screen', filter: 'contrast(1.4) brightness(0.96)' }}
                />
              </motion.div>
            </Reveal>
          ) : asset.img ? (
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

/** Small grey helper above the question, telling people where it goes. */
const ASK_HELPER: Record<Lang, string> = {
  en: 'Ask the help center',
  nl: 'Vraag aan de helpcenter',
}

function ServiceAskFab({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const ask = SERVICE_ASK[lang][meta.slug]
  const [hover, setHover] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const [visible, setVisible] = useState(false)
  const peeked = useRef(false)

  // The button stays hidden while the hero fills the screen. It fades in once
  // the hero is scrolled past, then fades back out as soon as the footer comes
  // into view at the very bottom of the page.
  useEffect(() => {
    const footer = document.querySelector('footer')
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false
      setVisible(pastHero && !atFooter)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Peek the question open by itself once, the first time the button appears.
  // Hover keeps it open. One frame (the box) just lengthens, no second element.
  useEffect(() => {
    if (!visible || peeked.current) return
    peeked.current = true
    const openAt = setTimeout(() => setTeaser(true), 400)
    const closeAt = setTimeout(() => setTeaser(false), 3400)
    return () => {
      clearTimeout(openAt)
      clearTimeout(closeAt)
    }
  }, [visible])

  const open = (hover || teaser) && visible

  return (
    <Link
      to={`/help?ask=${encodeURIComponent(ask.prompt)}`}
      aria-label={ask.label}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 flex items-center rounded-[18px] border border-line bg-black/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-[opacity,transform,background-color,border-color] duration-[600ms] ease-out hover:border-line-strong hover:bg-black/60 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span
        className={cn(
          'flex flex-col justify-center overflow-hidden whitespace-nowrap transition-all duration-[420ms] ease-out',
          open ? 'max-w-[340px] pl-5 opacity-100' : 'max-w-0 opacity-0',
        )}
      >
        <span className="text-[11px] font-medium leading-none text-faint">{ASK_HELPER[lang]}</span>
        <span className="mt-1.5 text-[14.5px] font-medium leading-none text-ink-soft">{ask.label}</span>
      </span>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <img src="/brand/ask-icon.png" alt="" className="h-7 w-7 object-contain" />
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
    <section className="relative w-full overflow-hidden border-y border-line py-16 sm:py-20 lg:py-28">
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
    <section className="relative grid min-h-[100svh] w-full place-items-center overflow-hidden px-6 pb-20 pt-28 sm:pb-24 sm:pt-32">
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
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <h1 className="mt-6 font-serif text-[35px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[48px] lg:text-[60px] lg:leading-[1.05]">
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
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-14 sm:py-16 lg:py-24">
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

/* Local AI · the privacy tension and the promise, side by side ──────────────── */

/** Two elegant frames (one tension, one promise) plus a confident accent bar.
 *  Replaces the generic two-negative Problem on the Local AI page. Self-contained
 *  bilingual copy; the heading/intro still come from the service data. */
const TENSION: Record<
  Lang,
  { tension: { title: string; body: string }; promise: { title: string; body: string }; bar: string }
> = {
  en: {
    tension: {
      title: 'Cloud AI lets your data leave the building',
      body: 'Every prompt your team sends to a cloud model leaves your perimeter. And afterwards you cannot prove where that data went, who saw it, or what happened to it. For anyone handling confidential work, that is a risk you do not see until it goes wrong.',
    },
    promise: {
      title: 'The same power, but inside your walls',
      body: 'You get real AI power on your own hardware, not a watered-down version. Your data stays in, every answer is computed behind your own walls, and you own the whole system. No cloud in the chain, no per-seat meter, nothing you have to take on a promise.',
    },
    bar: 'Not every model has to be the biggest. We pick the AI that fits what you need: powerful enough for the work, never heavier than it has to be.',
  },
  nl: {
    tension: {
      title: 'Cloud-AI laat je data je gebouw uit',
      body: 'Elke prompt die je team naar een cloudmodel stuurt, verlaat je perimeter. En achteraf kun je niet hard maken waar die data heen ging, wie ze zag of wat ermee gebeurde. Voor wie met vertrouwelijk werk bezig is, is dat een risico dat je niet ziet tot het misgaat.',
    },
    promise: {
      title: 'Dezelfde kracht, maar binnen je muren',
      body: 'Je krijgt echte AI-kracht op je eigen hardware, niet een afgezwakte versie. Je data blijft binnen, elk antwoord wordt achter je eigen muren berekend, en je bezit het volledige systeem. Geen cloud in de keten, geen teller per gebruiker, niets dat je op een belofte moet vertrouwen.',
    },
    bar: 'Niet elk model hoeft het grootste te zijn. We kiezen de AI die past bij wat je nodig hebt: krachtig genoeg voor het werk, niet zwaarder dan nodig.',
  },
}

function LocalAiTension({ content }: { content: ServiceContent }) {
  const { lang } = useLang()
  const t = TENSION[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-14 sm:py-16 lg:py-24">
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

      {/* Two frames: one tension, one promise. Narrower + taller than a standard grid. */}
      <div className="mx-auto mt-12 grid max-w-[940px] gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
        {/* Tension */}
        <Reveal>
          <div className="flex h-full flex-col rounded-[28px] border border-line bg-white/[0.015] p-7 transition-colors duration-300 hover:border-line-strong lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-faint">
              <CloudOff className="h-[22px] w-[22px]" strokeWidth={1.6} />
            </span>
            <h3 className="mt-7 font-serif text-[23px] leading-[1.18] tracking-[-0.01em] text-ink lg:text-[26px]">
              {t.tension.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-faint">{t.tension.body}</p>
          </div>
        </Reveal>

        {/* Promise — elevated */}
        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line-strong bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/20 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(245,245,245,0.06), transparent 70%)' }}
            />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-line-strong bg-white/[0.07] text-ink">
              <ShieldCheck className="h-[22px] w-[22px]" strokeWidth={1.6} />
            </span>
            <h3 className="relative mt-7 font-serif text-[23px] leading-[1.18] tracking-[-0.01em] text-ink lg:text-[26px]">
              {t.promise.title}
            </h3>
            <p className="relative mt-4 text-[15px] leading-relaxed text-ink-soft/80">{t.promise.body}</p>
          </div>
        </Reveal>
      </div>

      {/* Confident accent bar, brought out front and centre */}
      <div className="mx-auto mt-5 max-w-[940px] lg:mt-6">
        <Reveal delay={0.16}>
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-white/[0.025] px-6 py-5 sm:px-8 sm:py-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(70% 130% at 0% 50%, rgba(245,245,245,0.05), transparent 60%)' }}
            />
            <div className="relative flex items-center gap-4 sm:gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-white/[0.05] text-ink">
                <Scale className="h-[19px] w-[19px]" strokeWidth={1.6} />
              </span>
              <p className="text-[15px] leading-relaxed text-ink-soft sm:text-[16px] lg:text-[17px]">{t.bar}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Solution · sticky media + outcomes checklist (the "sold" moment) ──────────── */

function Solution({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const { lang } = useLang()
  const t = UI[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-14 sm:py-16 lg:py-24">
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
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-14 sm:py-16 lg:py-24">
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

/* App Design showcase · editorial two-column image grid ─────────────────────── */

function AppShowcase() {
  const { lang } = useLang()
  const t = UI[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-12 lg:py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[24px] leading-[1.22] tracking-[-0.01em] text-ink sm:text-[30px] lg:text-[36px]">
            {t.showcaseHeadline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{t.showcaseSub}</p>
        </Reveal>
      </div>

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

        {/* Right column: the two cards stick under the header and travel down with
            you as the tall style board scrolls past, releasing at its bottom */}
        <div className="relative">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
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
      </div>
    </section>
  )
}

/* App Design · three build shapes ───────────────────────────────────────────── */

/* A clean, white centre timeline (the AIOS-proposal style) with feature rows that
   alternate left/right. Each image is wiped in with a clip-path parallax reveal as
   it scrolls past, the copy drifts gently, and the centre line fills white with
   scroll progress. App Design only. Images are placeholders, the same one
   everywhere, until the client supplies per-shape art. */

const APP_SHAPES: Record<
  Lang,
  { title: string; subtitle: string; items: { title: string; body: string; image: string; clean?: string; icon?: string }[] }
> = {
  en: {
    title: 'From idea to something that keeps working',
    subtitle:
      'We never build off a template. We look at what you need first, then make the right thing for it. Here is what that involves.',
    items: [
      {
        title: 'We untangle your idea',
        image: '/services/timeline-app-1.webp',
        body: 'You come to us with something that is already big and tangled in your head. We pick it apart with you until it is clear: what it really has to do, for whom, and in what order. The more complex it starts, the more this part matters.',
      },
      {
        title: 'We design how it feels',
        image: '/services/timeline-app-2.webp',
        body: 'We draw every screen ourselves, never an off-the-shelf design you see everywhere. How someone moves through your app, where everything sits, what happens at each step. This decides whether people enjoy using it or click away after a week.',
      },
      {
        title: 'We build what it actually has to do',
        image: '/services/timeline-app-3.webp',
        body: 'This is about what it actually does. Not a pretty screen that does nothing, but an app that genuinely gets the work done. Built on a foundation that holds up as more people come on and as you add to it later. This is the difference from quickly clicked-together apps that break the moment they are used for real.',
      },
      {
        title: 'We let the work run itself',
        image: '/services/timeline-app-4.webp',
        body: 'Where it saves time, we let the app think along instead of leaving the work to you. Tasks that handle themselves, things that fill in automatically, work that keeps running in the background while you do something else. Not so we can say there is AI in it, but because it wins you hours every day.',
      },
    ],
  },
  nl: {
    title: 'Van idee tot iets dat blijft werken',
    subtitle:
      'We bouwen niets van een sjabloon af. We kijken eerst naar wat u nodig hebt, en maken daar het juiste voor. Dit is wat daarbij komt kijken.',
    items: [
      {
        title: 'We ontwarren uw idee',
        image: '/services/timeline-app-1.webp',
        body: 'U komt met iets dat in uw hoofd al groot en ingewikkeld is. Wij pluizen het samen met u uit tot het helder is. Wat moet het echt doen, voor wie, en in welke volgorde. Hoe complexer het begint, hoe belangrijker dit deel.',
      },
      {
        title: 'We ontwerpen hoe het voelt',
        image: '/services/timeline-app-2.webp',
        body: 'Elk scherm tekenen we zelf, geen kant-en-klaar ontwerp dat u overal terugziet. Hoe iemand door uw app beweegt, waar alles staat, wat er gebeurt bij elke stap. Dit bepaalt of mensen het graag gebruiken of na een week wegklikken.',
      },
      {
        title: 'We bouwen wat het echt moet doen',
        image: '/services/timeline-app-3.webp',
        body: 'Hier draait het om functionaliteit. Niet een mooi scherm dat verder niks doet, maar een app die het werk ook echt af krijgt. En gebouwd op een basis die overeind blijft als er meer mensen op komen en als u er later dingen aan toevoegt. Dit is het verschil met snel in elkaar geklikte apps die breken zodra ze serieus gebruikt worden.',
      },
      {
        title: 'We laten het werk voor u doen',
        image: '/services/timeline-app-4.webp',
        body: 'Waar het tijd scheelt, laten we de app meedenken in plaats van u het werk te laten doen. Taken die zichzelf afhandelen, dingen die vanzelf ingevuld worden, werk dat op de achtergrond doorloopt terwijl u iets anders doet. Niet om te kunnen zeggen dat er AI in zit, maar omdat u er elke dag uren mee wint.',
      },
    ],
  },
}

function AppShapeRow({ title, body, image, reverse }: { title: string; body: string; image: string; reverse: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Wipe the image in from the edge nearest the centre line, outward. The animating
  // inset side must run a clean 100% -> 0% (the static sides stay unitless 0), or
  // framer cannot interpolate the reversed rows and the image stays hidden.
  const clipFrom = reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
  const clipTo = reverse ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)'
  const clip = useTransform(scrollYProgress, [0, 0.4], [clipFrom, clipTo])
  // Fade in as the row enters, hold through the middle, fade out as it leaves.
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0])
  const ty = useTransform(scrollYProgress, [0, 1], [36, -36])
  // The bead lights up as the white line reaches it: a soft dot pops in.
  const beadOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const beadScale = useTransform(scrollYProgress, [0.4, 0.5, 0.58], [0.3, 1.18, 1])

  return (
    <div ref={ref} className="relative py-20 lg:py-44">
      {/* node: a black disc that masks the centre line (so the line reads as a gap),
         with a light bead that pops in as the line reaches it (desktop) */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg lg:flex"
      >
        <motion.span
          style={reduced ? undefined : { opacity: beadOpacity, scale: beadScale }}
          className="h-3 w-3 rounded-full bg-ink shadow-[0_0_14px_rgba(245,245,245,0.7)]"
        />
      </span>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <motion.div
          style={reduced ? undefined : { y: ty }}
          className={cn('lg:px-2', reverse ? 'lg:order-2' : 'lg:order-1')}
        >
          <h3 className="font-serif text-[22px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[25px] lg:text-[28px]">
            {title}
          </h3>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-faint">{body}</p>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { clipPath: clip, opacity }}
          className={cn(
            'relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <img src={image} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

function AppBuildShapes() {
  const { lang } = useLang()
  const data = APP_SHAPES[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{data.subtitle}</p>
        </Reveal>
      </div>

      <div
        ref={lineRef}
        className="relative mx-auto mt-12 max-w-[1160px] lg:mt-16 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)]"
      >
        {/* centre timeline: ONLY the white line that grows with scroll, no grey
           track underneath, so you never see where the line will go (desktop) */}
        <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block">
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/55 to-white/25"
          />
        </div>

        {data.items.map((it, i) => (
          <AppShapeRow key={it.title} title={it.title} body={it.body} image={it.image} reverse={i % 2 === 0} />
        ))}
      </div>
    </section>
  )
}

/* App Design · who we build for ──────────────────────────────────────────────── */

/* Mirror of the "your idea" opener: copy on the right, the dithered globe gif on
   the left. The gif is white-on-black, so mix-blend-screen drops the black and only
   the luminous motion blends into the page, its edges feathered with a radial mask.
   App Design only. */

const APP_WHO: Record<Lang, { title: string; subtitle: string; lines: string[] }> = {
  en: {
    title: 'Who we build for',
    subtitle:
      'Whether it is for your customers, your own team, or the companies you work with. If the idea is complex and it has to be genuinely good, this is exactly where you belong.',
    lines: [
      'A product you bring to your customers.',
      'A tool your own team uses all day.',
      'A system you deliver to the companies you work with.',
    ],
  },
  nl: {
    title: 'Voor wie we bouwen',
    subtitle:
      'Of het nu voor uw klanten is, voor uw eigen team, of voor de bedrijven waar u mee werkt. Als het idee complex is en het moet écht goed zijn, dan bent u hier juist.',
    lines: [
      'Een product dat u naar uw klanten brengt.',
      'Een tool die uw eigen team de hele dag gebruikt.',
      'Een systeem dat u levert aan de bedrijven waar u mee werkt.',
    ],
  },
}

const APP_WHO_GIF = '/services/who-appdesign.gif'

function AppWhoFor() {
  const { lang } = useLang()
  const data = APP_WHO[lang]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* The spinning globe gif — left on desktop */}
        <div ref={ref} className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[90px]"
            style={{ background: 'radial-gradient(52% 46% at 50% 48%, rgba(245,245,245,0.10), transparent 72%)' }}
          />
          <Reveal y={24}>
            <motion.div
              style={{ y }}
              className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden will-change-transform"
            >
              <img
                src={APP_WHO_GIF}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(78%_78%_at_50%_50%,#000_54%,transparent_94%)] [-webkit-mask-image:radial-gradient(78%_78%_at_50%_50%,#000_54%,transparent_94%)]"
                style={{ mixBlendMode: 'screen' }}
              />
            </motion.div>
          </Reveal>
        </div>

        {/* Copy — right on desktop */}
        <div className="order-2">
          <Reveal>
            <h2 className="font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[40px] lg:text-[46px]">
              {data.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-faint">{data.subtitle}</p>
          </Reveal>
          <ul className="mt-8 flex flex-col gap-4">
            {data.lines.map((line, i) => (
              <Reveal as="li" key={line} delay={0.14 + i * 0.07} className="flex items-start gap-3.5">
                <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={2} />
                <span className="text-[15.5px] leading-relaxed text-ink-soft">{line}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* AIOS · who we build this for · same two-column shape as Local AI's "Voor wie dit
   gemaakt is": the system animation on the left, copy on the right with a checklist.
   Each line leads with a short bold heading so a visitor sees at a glance which one is
   them. The animation moved here from the old Solution section. AIOS only. ───────── */

const AIOS_WHO: Record<
  Lang,
  { title: string; subtitle: string; lines: { head: string; body: string }[] }
> = {
  en: {
    title: 'Who we build this for',
    subtitle:
      'Not for someone who wants to try an AI tool, but for those who want to ready the way they work for what is coming.',
    lines: [
      {
        head: 'You are stuck on manual work',
        body: 'the more clients you take on, the more people you need for the same kind of work. That does not last, and you feel it already.',
      },
      {
        head: 'You do not know where to start',
        body: 'you want to get going with AI and you can see it is possible, just not how all the pieces come together into something that truly works.',
      },
      {
        head: 'You want to grow without hiring',
        body: 'you want to work faster without taking on someone new each time. To grow in what you can handle, not in how many people it takes to do the same.',
      },
    ],
  },
  nl: {
    title: 'Voor wie we dit bouwen',
    subtitle:
      'Niet voor wie een AI-tool wil uitproberen, maar voor wie zijn manier van werken klaar wil maken voor wat komt.',
    lines: [
      {
        head: 'U loopt vast op handwerk',
        body: 'hoe meer klanten erbij komen, hoe meer mensen u nodig hebt voor hetzelfde soort werk. Dat blijft niet duren, en u voelt het nu al.',
      },
      {
        head: 'U weet niet waar te beginnen',
        body: 'u wil met AI aan de slag en ziet dat het kan, alleen niet hoe alle stukken samenkomen tot iets dat echt werkt.',
      },
      {
        head: 'U wil groeien zonder bij te nemen',
        body: 'u wil sneller werken zonder telkens iemand bij te nemen. Groeien in wat u aankan, niet in hoeveel mensen er nodig zijn om hetzelfde te doen.',
      },
    ],
  },
}

function AiosWhoFor({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const data = AIOS_WHO[lang]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* The system animation — left on desktop, melts into the page */}
        <div ref={ref} className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[90px]"
            style={{ background: 'radial-gradient(52% 46% at 50% 48%, rgba(245,245,245,0.10), transparent 72%)' }}
          />
          <Reveal y={24}>
            <motion.div style={{ y }} className="will-change-transform">
              <AnimFrame src={meta.anim} className="mx-auto aspect-square w-full max-w-[440px]" />
            </motion.div>
          </Reveal>
        </div>

        {/* Copy — right on desktop */}
        <div className="order-2">
          <Reveal>
            <h2 className="font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[40px] lg:text-[46px]">
              {data.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-faint">{data.subtitle}</p>
          </Reveal>
          <ul className="mt-8 flex flex-col gap-4">
            {data.lines.map((line, i) => (
              <Reveal as="li" key={line.head} delay={0.14 + i * 0.07} className="flex items-start gap-3.5">
                <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={2} />
                <span className="text-[15.5px] leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">{line.head}.</span> {line.body}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* AIOS · build timeline (from an ordinary company to one that runs on AI). Same
   alternating photo/text lane shape as Local AI's ServerTimeline, reusing its row.
   Photos get the glossy glass-slat treatment (scripts/glossy.py). AIOS only. ────── */

const AIOS_STEPS: Record<
  Lang,
  { title: string; subtitle: string; items: { title: string; body: string; image: string; clean?: string; icon?: string }[] }
> = {
  en: {
    title: 'From an ordinary company to one that runs on AI',
    subtitle:
      'We do not just drop AI in somewhere. We look at how you work first, and build your whole system around that.',
    items: [
      {
        title: 'We look at how your business really works',
        body: "Before we build anything, we map what happens every day. Which tasks keep coming back, where time slips away, which steps get in each other's way. We talk to the people who do the work, not only to those above them. The better we understand why something exists, the better we know what we may take over.",
        image: '/services/timeline-aios-1.webp',
      },
      {
        title: 'We build the brain of your company',
        body: "We bring all of your company's knowledge into one place. Your way of working, your brand, your tone, the things that now live only in your people's heads. From that moment everything works from the same memory, and what comes out matches who you are.",
        image: '/services/timeline-aios-2.webp',
      },
      {
        title: 'We take over the recurring work, department by department',
        body: 'Now the real work begins. Department by department, we take on what keeps coming back. In marketing, support, finance, operations. The system takes over the slow, repeated work, so your people keep time for what does need their attention.',
        image: '/services/timeline-aios-3.webp',
      },
      {
        title: 'We make everything work together as one',
        body: 'Finally we connect it all, with a layer above that steers the whole. No more loose pieces you tie together yourself, but one company that runs as a single system, with you at the wheel.',
        image: '/services/timeline-aios-4.webp',
      },
    ],
  },
  nl: {
    title: 'Van een gewoon bedrijf naar een bedrijf dat op AI draait',
    subtitle:
      'We zetten niet zomaar ergens AI neer. We kijken eerst hoe u werkt, en bouwen daar uw hele systeem omheen.',
    items: [
      {
        title: 'We kijken hoe uw bedrijf echt werkt',
        body: 'Voor we iets bouwen, brengen we in kaart wat er elke dag gebeurt. Welke taken keren steeds terug, waar gaat tijd verloren, welke stappen zitten elkaar in de weg. We praten met de mensen die het werk doen, niet alleen met wie erboven zit. Hoe beter we begrijpen waarom iets bestaat, hoe beter we weten wat we mogen overnemen.',
        image: '/services/timeline-aios-1.webp',
      },
      {
        title: 'We bouwen het brein van uw bedrijf',
        body: 'We zetten alle kennis van uw bedrijf op één plek. Uw manier van werken, uw merk, uw toon, de dingen die nu alleen in de hoofden van uw mensen zitten. Vanaf dat moment werkt alles vanuit hetzelfde geheugen, en klopt wat eruit komt met wie u bent.',
        image: '/services/timeline-aios-2.webp',
      },
      {
        title: 'We nemen het terugkerende werk over, afdeling per afdeling',
        body: 'Nu begint het echte werk. Per afdeling pakken we aan wat steeds terugkomt. In marketing, support, finance, operations. Het systeem neemt het trage, herhaalde werk over, zodat uw mensen tijd houden voor wat wél hun aandacht vraagt.',
        image: '/services/timeline-aios-3.webp',
      },
      {
        title: 'We laten alles samenwerken als één geheel',
        body: 'Tot slot verbinden we alles, met daarboven een laag die het geheel aanstuurt. Geen losse stukken meer die u zelf aan elkaar knoopt, maar één bedrijf dat als één systeem draait, met u aan het stuur.',
        image: '/services/timeline-aios-4.webp',
      },
    ],
  },
}

function AiosTimeline() {
  const { lang } = useLang()
  const data = AIOS_STEPS[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{data.subtitle}</p>
        </Reveal>
      </div>

      <div
        ref={lineRef}
        className="relative mx-auto mt-12 max-w-[1160px] lg:mt-16 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)]"
      >
        <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block">
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/55 to-white/25"
          />
        </div>

        {data.items.map((it, i) => (
          <ServerStepRow key={it.title} title={it.title} body={it.body} image={it.image} clean={it.clean} icon={it.icon} reverse={i % 2 === 0} />
        ))}
      </div>
    </section>
  )
}

/* AIOS · where work piles up · same framed two-card shape as Local AI's comparison:
   two light nature-photo panels (customer-facing / internal), each a column heading
   and its departments as glossy icon rows, then a maatwerk closing kader that catches
   everyone the two columns miss. AIOS only. ──────────────────────────────────────── */

const AIOS_WORK: Record<
  Lang,
  {
    title: string
    subtitle: string
    columns: { heading: string; items: { label: string; body: string }[] }[]
    closing: { title: string; body: string }
  }
> = {
  en: {
    title: 'The work that piles up, already done',
    subtitle:
      'The recurring work that eats time every day, customer-facing and internal. The system sets it up, you only review it.',
    columns: [
      {
        heading: 'Customer-facing',
        items: [
          { label: 'Sales', body: 'Quotes and proposals ready to send, leads followed up so none slip through.' },
          { label: 'Marketing', body: 'Copy, posts and scheduling, all in your own tone.' },
          { label: 'Support', body: 'Customer questions answered at once, only the hard ones reach a person.' },
          { label: 'Communication', body: 'Every message in one place, replies prepared and on point.' },
        ],
      },
      {
        heading: 'Internal',
        items: [
          { label: 'Finance', body: 'Most bookkeeping kept up, your accountant only checks it.' },
          { label: 'Operations', body: 'Onboarding, projects and KPIs running smoothly, always an overview.' },
          { label: 'HR', body: 'Hiring, first screening and follow-up.' },
          { label: 'Planning', body: 'Rosters, planning and reporting kept in sync.' },
        ],
      },
    ],
    closing: {
      title: 'And whatever else your business needs',
      body: 'Every business is different. We look together at what piles up in yours, and build the right thing for it. These are examples, not a fixed list.',
    },
  },
  nl: {
    title: 'Het werk dat blijft liggen, voortaan al gedaan',
    subtitle:
      'Het terugkerende werk dat elke dag tijd kost, klantgericht en intern. Het systeem zet het klaar, u kijkt het enkel nog na.',
    columns: [
      {
        heading: 'Klantgericht',
        items: [
          { label: 'Sales', body: 'Offertes en voorstellen klaar om te versturen, leads opgevolgd zonder er een te vergeten.' },
          { label: 'Marketing', body: 'Teksten, posts en planning, alles in uw eigen toon.' },
          { label: 'Support', body: 'Klantvragen meteen beantwoord, alleen de moeilijke naar een mens.' },
          { label: 'Communicatie', body: 'Alle berichten op één plek, antwoorden staan klaar en kloppen.' },
        ],
      },
      {
        heading: 'Intern',
        items: [
          { label: 'Finance', body: 'Het meeste boekhoudwerk bijgehouden, uw boekhouder controleert enkel nog.' },
          { label: 'Operations', body: "Onboarding, projecten en KPI's lopen soepel, altijd overzicht." },
          { label: 'HR', body: 'Aanwerving, eerste screening en opvolging.' },
          { label: 'Planning', body: 'Roosters, planning en rapportage op elkaar afgestemd.' },
        ],
      },
    ],
    closing: {
      title: 'En wat uw bedrijf verder nodig heeft',
      body: 'Elk bedrijf is anders. We kijken samen wat in úw bedrijf blijft liggen, en bouwen daar het juiste voor. Dit zijn voorbeelden, geen vaste lijst.',
    },
  },
}

const WORK_PHOTOS = ['/services/work-klantgericht.webp', '/services/work-intern.webp']
const WORK_ICONS: LucideIcon[][] = [
  [Handshake, Megaphone, Headset, Mail],
  [Receipt, Workflow, UserPlus, CalendarDays],
]

/** Where the four glossy icon badges sit on the photo, a calm constellation like
 *  Local AI's provider marks. */
const WORK_BADGE_POS = [
  { left: '25%', top: '31%' },
  { left: '72%', top: '26%' },
  { left: '30%', top: '71%' },
  { left: '75%', top: '67%' },
]

/** One department row: a clean dot, the name and a short line. */
function WorkItem({ label, body }: { label: string; body: string }) {
  return (
    <li className="flex items-start gap-3.5">
      <span aria-hidden className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-ink/55" />
      <div>
        <p className="text-[15px] font-medium leading-tight text-ink">{label}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-faint">{body}</p>
      </div>
    </li>
  )
}

/** One side of the work map as a home-style framed card: a dark nature photo panel
 *  with the department icons floating on it as glossy badges (like Local AI's marks),
 *  then the column heading and the departments as clean dotted points. */
function WorkColumn({
  heading,
  image,
  items,
  icons,
}: {
  heading: string
  image: string
  items: { label: string; body: string }[]
  icons: LucideIcon[]
}) {
  return (
    <Reveal>
      <div className="flex h-full flex-col rounded-[28px] border border-line bg-white/[0.02] p-4 lg:p-5">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
          <img src={image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          {/* darken so the glossy badges always read on the photo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(80% 80% at 50% 44%, rgba(0,0,0,0.22), rgba(0,0,0,0.54))' }}
          />
          {/* the department icons, floating on the photo as glossy badges */}
          <div className="pointer-events-none absolute inset-0">
            {icons.map((Icon, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: WORK_BADGE_POS[i].left, top: WORK_BADGE_POS[i].top, marginLeft: -26, marginTop: -26 }}
              >
                <Drift radius={7} duration={26 + (i % 3) * 4} phase={i * 90}>
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-white/12 bg-white/[0.08] shadow-[0_12px_34px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    <Icon className="h-[22px] w-[22px] text-white/90" strokeWidth={1.6} />
                  </div>
                </Drift>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col px-2 pb-1 pt-6 lg:px-3">
          <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink lg:text-[28px]">{heading}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {items.map((it) => (
              <WorkItem key={it.label} label={it.label} body={it.body} />
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

function AiosWorkGrid() {
  const { lang } = useLang()
  const data = AIOS_WORK[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{data.subtitle}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {data.columns.map((col, ci) => (
          <WorkColumn key={col.heading} heading={col.heading} image={WORK_PHOTOS[ci]} items={col.items} icons={WORK_ICONS[ci]} />
        ))}
      </div>

      <Reveal y={16}>
        <div className="relative mx-auto mt-6 flex max-w-[1100px] items-start gap-4 overflow-hidden rounded-[22px] border border-line-strong bg-white/[0.04] p-6 backdrop-blur-xl sm:items-center sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.06] sm:mt-0">
            <Plus className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
          </span>
          <div>
            <h3 className="font-serif text-[19px] leading-snug tracking-[-0.01em] text-ink">{data.closing.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft/90">{data.closing.body}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* Who this is for · particle terrain gif + checklist, only for local-ai ─────── */

const LOCAL_WHO: Record<Lang, { title: string; subtitle: string; lines: string[] }> = {
  en: {
    title: 'Who this is built for',
    subtitle:
      'The more sensitive your data, the more this is for you. Not everyone needs their own AI, but for some companies it is the only approach that holds up.',
    lines: [
      'Companies working with data that simply cannot leave the building, because clients, regulation or competition will not allow it.',
      'Teams that want to work with AI every day, without a monthly bill that grows with every new colleague.',
      'Companies that want to build their own intelligence, something that stays theirs, instead of forever renting it from someone else.',
    ],
  },
  nl: {
    title: 'Voor wie dit gemaakt is',
    subtitle:
      'Hoe gevoeliger uw data, hoe meer dit voor u is. Niet iedereen heeft een eigen AI nodig, maar voor sommige bedrijven is het de enige manier die klopt.',
    lines: [
      'Bedrijven die werken met data die simpelweg niet naar buiten mag, omdat klanten, wetgeving of concurrentie dat niet toelaten.',
      'Teams die elke dag met AI willen werken, zonder een maandelijkse rekening die meegroeit met elke nieuwe collega.',
      'Bedrijven die hun eigen intelligentie willen opbouwen, iets dat van hen blijft, in plaats van het te blijven huren bij iemand anders.',
    ],
  },
}

const LOCAL_WHO_GIF = '/services/who-localai.gif'

function LocalWhoFor() {
  const { lang } = useLang()
  const data = LOCAL_WHO[lang]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Particle-terrain gif — left on desktop */}
        <div ref={ref} className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[90px]"
            style={{ background: 'radial-gradient(52% 46% at 50% 48%, rgba(245,245,245,0.10), transparent 72%)' }}
          />
          <Reveal y={24}>
            <motion.div
              style={{ y }}
              className="relative mx-auto aspect-square w-full max-w-[440px] overflow-hidden will-change-transform"
            >
              <img
                src={LOCAL_WHO_GIF}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(78%_78%_at_50%_50%,#000_54%,transparent_94%)] [-webkit-mask-image:radial-gradient(78%_78%_at_50%_50%,#000_54%,transparent_94%)]"
                style={{ mixBlendMode: 'screen' }}
              />
            </motion.div>
          </Reveal>
        </div>

        {/* Copy — right on desktop */}
        <div className="order-2">
          <Reveal>
            <h2 className="font-serif text-[30px] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[40px] lg:text-[46px]">
              {data.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-faint">{data.subtitle}</p>
          </Reveal>
          <ul className="mt-8 flex flex-col gap-4">
            {data.lines.map((line, i) => (
              <Reveal as="li" key={line} delay={0.14 + i * 0.07} className="flex items-start gap-3.5">
                <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={2} />
                <span className="text-[15.5px] leading-relaxed text-ink-soft">{line}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* Cloud vs Local comparison · only for local-ai ─────────────────────────────── */

const LOCAL_COMPARE: Record<
  Lang,
  {
    title: string
    subtitle: string
    sides: { kind: 'cloud' | 'local'; label: string; tag: string; image: string; points: string[] }[]
    honest: string
  }
> = {
  en: {
    title: 'Why your AI belongs with you',
    subtitle:
      'Most companies send their data to a handful of big tech companies. It works, but you give away more than you think. Here is the difference.',
    sides: [
      {
        kind: 'cloud',
        label: 'The big models',
        tag: 'Cloud AI',
        image: '/services/compare-cloud.webp',
        points: [
          'Your data leaves your building with every question you ask.',
          'It is sometimes used to train their model further, unless you pay a steep premium.',
          'You pay again every month, and that bill grows with your team.',
          "You depend on someone else's servers, prices and rules.",
        ],
      },
      {
        kind: 'local',
        label: 'Your own local AI',
        tag: 'Local',
        image: '/services/compare-local.webp',
        points: [
          'Your data stays in, with every question, without exception.',
          'It learns only from you, and that knowledge stays yours.',
          'You mostly pay once, for the hardware, and after that it is yours.',
          'You depend on no one, it sits inside your own walls.',
        ],
      },
    ],
    honest:
      'A local model is not the single most powerful one out there. But for what most companies actually need it is more than good enough, and the big advantage is that it is entirely yours.',
  },
  nl: {
    title: 'Waarom uw AI bij u hoort te staan',
    subtitle:
      'De meeste bedrijven sturen hun data naar een handvol grote techbedrijven. Het werkt, maar u geeft er meer voor weg dan u denkt. Zo zit het verschil.',
    sides: [
      {
        kind: 'cloud',
        label: 'De grote modellen',
        tag: 'Cloud-AI',
        image: '/services/compare-cloud.webp',
        points: [
          'Uw data verlaat uw gebouw bij elke vraag die u stelt.',
          'Ze wordt soms gebruikt om hun model verder te trainen, tenzij u flink bijbetaalt.',
          'U betaalt elke maand opnieuw, en die rekening groeit mee met uw team.',
          'U bent afhankelijk van de servers, prijzen en regels van iemand anders.',
        ],
      },
      {
        kind: 'local',
        label: 'Uw eigen lokale AI',
        tag: 'Lokaal',
        image: '/services/compare-local.webp',
        points: [
          'Uw data blijft binnen, bij elke vraag, zonder uitzondering.',
          'Ze leert alleen van u, en die kennis blijft van u.',
          'U betaalt vooral een keer, voor de hardware, en daarna is het van u.',
          'U bent van niemand afhankelijk, het staat binnen uw eigen muren.',
        ],
      },
    ],
    honest:
      'Een lokaal model is niet het allerkrachtigste dat er bestaat. Maar voor wat de meeste bedrijven echt nodig hebben is het meer dan goed genoeg, en het grote voordeel is dat het volledig van u is.',
  },
}

/** One side of the comparison as a home-style framed card: a big photo panel with
 *  a label chip, then the title and the points (no buttons, the points fill it). */
const CLOUD_PROVIDERS = [
  { src: '/services/providers/openai.svg', left: '50%', top: '46%', size: 78, pad: 17 },
  { src: '/services/providers/claude.svg', left: '20%', top: '27%', size: 64, pad: 14 },
  { src: '/services/providers/gemini.svg', left: '79%', top: '25%', size: 64, pad: 13 },
  { src: '/services/providers/meta.svg', left: '25%', top: '74%', size: 62, pad: 15 },
  { src: '/services/providers/copilot.svg', left: '75%', top: '71%', size: 62, pad: 13 },
]

/** A perfectly smooth, constant-speed circular drift: a pivot rotates linearly,
 *  the child is offset by `radius` and counter-rotates to stay upright. Sizes to
 *  its child (inline-flex) so it works centred or absolutely placed. */
function Drift({
  radius,
  duration,
  phase,
  children,
}: {
  radius: number
  duration: number
  phase: number
  children: ReactNode
}) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <span className="inline-flex">{children}</span>
  return (
    <motion.div
      className="inline-flex"
      animate={{ rotate: [phase, phase + 360] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        className="will-change-transform"
        style={{ x: radius }}
        animate={{ rotate: [-phase, -phase - 360] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** One provider logo in a dark glass badge, drifting smoothly on its own phase. */
function FloatingBadge({
  src,
  left,
  top,
  size,
  pad,
  i,
}: {
  src: string
  left: string
  top: string
  size: number
  pad: number
  i: number
}) {
  return (
    <div className="absolute" style={{ left, top, marginLeft: -size / 2, marginTop: -size / 2 }}>
      <Drift radius={7} duration={26 + (i % 3) * 4} phase={i * 72}>
        <div
          className="flex items-center justify-center rounded-[15px] border border-white/12 bg-white/[0.07] shadow-[0_12px_34px_rgba(0,0,0,0.5)] backdrop-blur-md"
          style={{ width: size, height: size, padding: pad }}
        >
          <img src={src} alt="" className="h-full w-full object-contain" />
        </div>
      </Drift>
    </div>
  )
}

function CompareCard({
  side,
}: {
  side: { kind: 'cloud' | 'local'; label: string; tag: string; image: string; points: string[] }
}) {
  const local = side.kind === 'local'
  const reduced = usePrefersReducedMotion()
  return (
    <Reveal>
      <div
        className={cn(
          'flex h-full flex-col rounded-[28px] border p-4 lg:p-5',
          local ? 'border-line-strong bg-white/[0.03]' : 'border-line bg-white/[0.015]',
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
          <img src={side.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          {/* gentle vignette so the floating marks always read on either photo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(64% 64% at 50% 50%, rgba(0,0,0,0.30), transparent 76%)' }}
          />
          {local ? (
            // Your own AI: the single Nivora mark, drifting smoothly around the centre.
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Drift radius={10} duration={30} phase={0}>
                <div className="relative">
                  <div aria-hidden className="absolute -inset-7 rounded-full bg-white/12 blur-2xl" />
                  <motion.img
                    src="/services/nivora-mark.png"
                    alt=""
                    animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative block h-[96px] w-[96px] rounded-[21px] shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:h-[112px] sm:w-[112px]"
                  />
                </div>
              </Drift>
            </div>
          ) : (
            // The big models: a slow-drifting constellation of the cloud providers.
            <div className="pointer-events-none absolute inset-0">
              {CLOUD_PROVIDERS.map((p, i) => (
                <FloatingBadge key={p.src} src={p.src} left={p.left} top={p.top} size={p.size} pad={p.pad} i={i} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-2 pb-1 pt-6 lg:px-3">
          <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink lg:text-[28px]">{side.label}</h3>
          <ul className="mt-5 flex flex-col gap-3.5">
            {side.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                {local ? (
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink" strokeWidth={2} />
                ) : (
                  <svg viewBox="0 0 16 16" className="mt-1 h-[15px] w-[15px] shrink-0 text-dim" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" />
                  </svg>
                )}
                <span className={cn('text-[14.5px] leading-relaxed', local ? 'text-ink-soft/90' : 'text-faint')}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

function ComparisonBand() {
  const { lang } = useLang()
  const data = LOCAL_COMPARE[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{data.subtitle}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {data.sides.map((s) => (
          <CompareCard key={s.kind} side={s} />
        ))}
      </div>

      {/* The honest line, owned and turned straight back into the point. */}
      <Reveal y={16}>
        <div className="relative mx-auto mt-6 flex max-w-[1100px] items-start gap-4 overflow-hidden rounded-[22px] border border-line-strong bg-white/[0.04] p-6 backdrop-blur-xl sm:items-center sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.06] sm:mt-0">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-soft" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5" strokeLinecap="round" />
              <path d="M12 16.5h.01" strokeLinecap="round" />
            </svg>
          </span>
          <p className="text-[15px] leading-relaxed text-ink-soft/90 sm:text-[16px]">{data.honest}</p>
        </div>
      </Reveal>
    </section>
  )
}

/* Local AI · build timeline (from your own server to your own AI) ─────────────── */

const SERVER_STEPS: Record<
  Lang,
  { title: string; subtitle: string; items: { title: string; body: string; image: string; clean?: string; icon?: string }[] }
> = {
  en: {
    title: 'From your own server to your own AI',
    subtitle:
      'We do not just drop in a model. We build a complete intelligence of your own, shaped around how you work and entirely within your own walls.',
    items: [
      {
        title: 'We look at what you need',
        body: 'Which data matters, which tasks cost the most time today, and how many people will work with it. That decides what kind of system fits you, not the other way around. A small team needs something very different from a large one.',
        image: '/services/timeline-1.webp',
        clean: '/services/timeline-clean-1.webp',
        icon: '/services/icon-step-1.png',
      },
      {
        title: 'We put the AI in your place',
        body: "The intelligence runs on your own server, in your own building. No connection to anyone else's servers, no data going out. We handle the hardware and make sure everything sits exactly as it should.",
        image: '/services/timeline-2.webp',
        clean: '/services/timeline-clean-2.webp',
        icon: '/services/icon-step-2.png',
      },
      {
        title: 'We let it get to know your company',
        body: 'This is where it truly becomes yours. The AI learns from your own documents, your own way of working, your own data. You get no generic AI but one that understands your company, and that knowledge stays in.',
        image: '/services/timeline-3.webp',
        clean: '/services/timeline-clean-3.webp',
        icon: '/services/icon-step-3.png',
      },
      {
        title: 'We build the apps around it',
        body: 'An AI on its own does nothing yet. We build the applications your people actually work with. Pulling up documents and emails, asking questions about your own data, work that happens by itself. All through your own AI, nothing through the outside.',
        image: '/services/timeline-4.webp',
        clean: '/services/timeline-clean-4.webp',
        icon: '/services/icon-step-4.png',
      },
    ],
  },
  nl: {
    title: 'Van uw eigen server tot uw eigen AI',
    subtitle:
      'We zetten niet zomaar een model neer. We bouwen een complete eigen intelligentie, op maat van hoe u werkt en volledig binnen uw eigen muren.',
    items: [
      {
        title: 'We kijken wat u nodig hebt',
        body: 'Welke data telt, welke taken kosten nu het meeste tijd, en hoeveel mensen gaan ermee werken. Dat bepaalt wat voor systeem bij u past, niet andersom. Een klein team heeft iets heel anders nodig dan een groot.',
        image: '/services/timeline-1.webp',
        clean: '/services/timeline-clean-1.webp',
        icon: '/services/icon-step-1.png',
      },
      {
        title: 'We zetten de AI bij u neer',
        body: 'De intelligentie komt op uw eigen server, in uw eigen gebouw. Geen verbinding met servers van iemand anders, geen data die naar buiten gaat. Wij regelen de hardware en zorgen dat alles staat zoals het hoort.',
        image: '/services/timeline-2.webp',
        clean: '/services/timeline-clean-2.webp',
        icon: '/services/icon-step-2.png',
      },
      {
        title: 'We laten hem uw bedrijf leren kennen',
        body: 'Dit is waar het echt van u wordt. De AI leert van uw eigen documenten, uw eigen manier van werken, uw eigen data. Zo krijgt u geen algemene AI maar een die uw bedrijf begrijpt, en die kennis blijft binnen.',
        image: '/services/timeline-3.webp',
        clean: '/services/timeline-clean-3.webp',
        icon: '/services/icon-step-3.png',
      },
      {
        title: 'We bouwen de apps eromheen',
        body: 'Een AI op zich doet nog niks. Wij bouwen de toepassingen waarmee uw mensen er echt mee werken. Documenten en e-mails ophalen, vragen stellen over uw eigen data, werk dat vanzelf gebeurt. Alles via uw eigen AI, niets via buiten.',
        image: '/services/timeline-4.webp',
        clean: '/services/timeline-clean-4.webp',
        icon: '/services/icon-step-4.png',
      },
    ],
  },
}

function ServerStepRow({
  title,
  body,
  image,
  clean,
  icon,
  reverse,
}: {
  title: string
  body: string
  image: string
  clean?: string
  icon?: string
  reverse: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clipFrom = reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
  const clipTo = reverse ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)'
  const clip = useTransform(scrollYProgress, [0, 0.4], [clipFrom, clipTo])
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0])
  const ty = useTransform(scrollYProgress, [0, 1], [36, -36])
  const beadOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])
  const beadScale = useTransform(scrollYProgress, [0.4, 0.5, 0.58], [0.3, 1.18, 1])
  // Once the frame has settled, a quick scroll fades the glossy blur in, then the icon.
  const blurReveal = useTransform(scrollYProgress, [0.44, 0.54], [0, 1])
  const iconReveal = useTransform(scrollYProgress, [0.52, 0.62], [0, 1])

  return (
    <div ref={ref} className="relative py-16 lg:py-40">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg lg:flex"
      >
        <motion.span
          style={reduced ? undefined : { opacity: beadOpacity, scale: beadScale }}
          className="h-3 w-3 rounded-full bg-ink shadow-[0_0_14px_rgba(245,245,245,0.7)]"
        />
      </span>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <motion.div
          style={reduced ? undefined : { y: ty }}
          className={cn('lg:px-2', reverse ? 'lg:order-2' : 'lg:order-1')}
        >
          <h3 className="font-serif text-[22px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[25px] lg:text-[28px]">
            {title}
          </h3>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-faint">{body}</p>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { clipPath: clip, opacity }}
          className={cn(
            'relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)]',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          <img src={clean ?? image} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover" />
          {clean && (
            <motion.img
              src={image}
              alt=""
              loading="lazy"
              style={reduced ? { opacity: 1 } : { opacity: blurReveal }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {icon && (
            <motion.div
              style={reduced ? { opacity: 1 } : { opacity: iconReveal }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div aria-hidden className="absolute h-24 w-24 rounded-full bg-black/25 blur-xl sm:h-28 sm:w-28" />
              <img
                src={icon}
                alt=""
                className="relative h-14 w-14 drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)] sm:h-[68px] sm:w-[68px]"
              />
            </motion.div>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

function ServerTimeline() {
  const { lang } = useLang()
  const data = SERVER_STEPS[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{data.subtitle}</p>
        </Reveal>
      </div>

      <div
        ref={lineRef}
        className="relative mx-auto mt-12 max-w-[1160px] lg:mt-16 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_11%,#000_89%,transparent_100%)]"
      >
        <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block">
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/55 to-white/25"
          />
        </div>

        {data.items.map((it, i) => (
          <ServerStepRow key={it.title} title={it.title} body={it.body} image={it.image} clean={it.clean} icon={it.icon} reverse={i % 2 === 0} />
        ))}
      </div>
    </section>
  )
}

/** Layout offset of `el` relative to `ancestor`, ignoring transforms in between. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

/* App Design why-us · the home-page "Our Services" card treatment, reused for the
   differentiators: free-standing frosted-glass cards over a sharp peak, crisp in
   the gaps and blurred through each card via an aligned blurred copy of the peak,
   with a cursor-driven 3D tilt. The peak is faded into the page so it blends. */
const WHY_GLOW = '/services/whyus-wave.webp'
const WHY_GLOW_W = 800
const WHY_GLOW_H = 448
const WHY_POS_X = 0.5
const WHY_POS_Y = 0.5

function AppWhyCard({
  title,
  body,
  bandRef,
}: {
  title: string
  body: string
  bandRef: RefObject<HTMLDivElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { damping: 18, stiffness: 160 }
  const sx = useSpring(mouseX, spring)
  const sy = useSpring(mouseY, spring)
  const rotateX = useTransform(sy, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-8deg', '8deg'])

  // A blurred copy of the peak, sized to the band and offset so it lines up with
  // the sharp peak behind THIS card (same cover-scale + position) — real frost.
  const [frost, setFrost] = useState<{ w: number; h: number; left: number; top: number } | null>(null)
  useLayoutEffect(() => {
    const band = bandRef.current
    const card = cardRef.current
    if (!band || !card) return
    const measure = () => {
      const bw = band.offsetWidth
      const bh = band.offsetHeight
      const scale = Math.max(bw / WHY_GLOW_W, bh / WHY_GLOW_H)
      const sw = WHY_GLOW_W * scale
      const sh = WHY_GLOW_H * scale
      const bandX = (bw - sw) * WHY_POS_X
      const bandY = (bh - sh) * WHY_POS_Y
      const { x: cardX, y: cardY } = offsetWithin(card, band)
      setFrost({ w: sw, h: sh, left: bandX - cardX, top: bandY - cardY })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [bandRef])

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={
          reduced
            ? undefined
            : (e) => {
                const r = e.currentTarget.getBoundingClientRect()
                mouseX.set((e.clientX - r.left) / r.width - 0.5)
                mouseY.set((e.clientY - r.top) / r.height - 0.5)
              }
        }
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[22px] border border-line bg-[#0b0b0f]/30 p-6 transition-[border-color,box-shadow] duration-300 [@media(hover:hover)]:hover:border-line-strong [@media(hover:hover)]:hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)] lg:min-h-[250px] lg:p-7"
      >
        {/* Blurred peak, aligned to the sharp background behind the card — the frost */}
        {frost && (
          <img
            src={WHY_GLOW}
            alt=""
            aria-hidden
            style={{ width: frost.w, height: frost.h, left: frost.left, top: frost.top }}
            className="pointer-events-none absolute max-w-none object-cover opacity-[0.7] blur-2xl"
          />
        )}
        {/* Frosted tint + gloss + top hairline — the same frosted feel as the home cards */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/35 via-[#0a0a0d]/30 to-[#0a0a0d]/55" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div style={reduced ? undefined : { transform: 'translateZ(45px)' }} className="relative">
          <h3 className="font-serif text-[20px] leading-snug tracking-[-0.01em] text-ink lg:text-[22px]">{title}</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-faint">{body}</p>
        </div>
      </motion.div>
    </div>
  )
}

function AppWhyUs({ content }: { content: ServiceContent }) {
  const { lang } = useLang()
  const bandRef = useRef<HTMLDivElement>(null)
  const sub =
    lang === 'nl'
      ? 'Geen bureau dat u doorschuift. De mensen die uw app bedenken, zijn ook de mensen die hem bouwen.'
      : 'No agency passing you around. The people who shape your app are the same people who build it.'
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* bandRef wraps the backdrop AND the cards, so the peak reads across the whole
          section (the background is back, clearly visible) and the per-card frosted
          blur still lines up exactly with it. */}
      <div ref={bandRef} className="relative mx-auto w-full max-w-[1280px]">
        {/* The sharp peak, faded into the page on every edge so it blends in */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={WHY_GLOW}
            alt=""
            className="h-full w-full object-cover object-[50%_50%] opacity-[0.72]"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/65 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/65 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-bg to-transparent" />
        </div>

        <div className="relative z-10 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
                {content.differentiators.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{sub}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {content.differentiators.items.map((d, i) => (
              <Reveal key={d.title} delay={(i % 4) * 0.08}>
                <AppWhyCard title={d.title} body={d.body} bandRef={bandRef} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Why us · selling reasons over a scenic, drifting band ─────────────────────── */

function WhyUs({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  if (meta.slug === 'app-design') return <AppWhyUs content={content} />

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-28">
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
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-14 sm:py-16 lg:py-24">
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
    <section className="relative w-full border-y border-line py-16 sm:py-20 lg:py-28">
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

  // App Design: stripped to just the FAQ, centred, with a warm-red (terracotta)
  // heading like the homepage. No "is this the right fit" comparison block.
  if (content.slug === 'app-design') {
    const faqSub =
      lang === 'nl'
        ? 'De dingen die u waarschijnlijk wilt weten voordat we aan uw app beginnen.'
        : 'The things you probably want to know before we start on your app.'
    return (
      <section className="relative mx-auto w-full max-w-[1100px] px-6 py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {t.goodToKnow}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-faint">{faqSub}</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-[760px] flex-col gap-3">
          {content.faq.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <Reveal key={item.q} delay={(i % 4) * 0.04}>
                <div className="overflow-hidden rounded-[18px] border border-line bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
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

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-center text-[14px] leading-relaxed text-faint">
            {t.stillQuestion}{' '}
            <button
              type="button"
              onClick={open}
              className="inline-block py-1 -my-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {t.reachPerson}
            </button>{' '}
            {t.orVisit}{' '}
            <Link
              to="/help"
              className="inline-block py-1 -my-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {t.helpCenter}
            </Link>
            .
          </p>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-14 sm:py-16 lg:py-24">
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
              className="inline-block py-1 -my-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              {t.reachPerson}
            </button>
            {' '}{t.orVisit}{' '}
            <Link
              to="/help"
              className="inline-block py-1 -my-1 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
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
    <section className="relative grid w-full place-items-center overflow-hidden px-6 py-20 sm:py-24 lg:py-36">
      <ParallaxImage
        src={meta.slug === 'app-design' ? '/services/cta-appdesign.webp' : meta.photo}
        range={['-8%', '8%']}
      />
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
    <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-20 sm:pb-28">
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
