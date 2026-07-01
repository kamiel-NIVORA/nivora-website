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
import { ArrowUpRight, Check, ChevronDown, Minus, Plus } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { RoiCalculator } from '@/components/ui/RoiCalculator'
import { ScrollStatement } from '@/components/ui/ScrollStatement'
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
      'Everything runs inside your own infrastructure: the models, the data, and every answer. Nothing is rented, nothing is sent away, and nothing ever leaves your servers.',
    brandObjectAlt: 'A Nivora folder labelled Private, Yours, Secure, Local, held in hand.',
    privacyHeadline:
      'Everything your team asks. Everything they receive. None of it leaves your servers.',
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
    showcaseHeadline: 'Every screen with intention.',
    showcaseSub:
      'Not a single screen that just turned out that way. Everything is there for a reason, and you feel it with every tap.',
    showcaseBoardLabel: 'Style Board',
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
      'Alles draait binnen uw eigen infrastructuur: de modellen, de data, en elk antwoord. Niets wordt gehuurd, niets wordt weggestuurd, en niets verlaat ooit uw servers.',
    brandObjectAlt: 'Een Nivora-map met het label Private, Yours, Secure, Local, in de hand gehouden.',
    privacyHeadline:
      'Alles wat uw team vraagt. Alles wat ze ontvangen. Niets ervan verlaat uw servers.',
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
    showcaseHeadline: 'Elk scherm met intentie.',
    showcaseSub:
      'Geen scherm dat toevallig zo geworden is. Alles staat er met een reden, en dat voelt u bij elke tik.',
    showcaseBoardLabel: 'Style Board',
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
    stillQuestion: 'Hebt u nog vragen?',
    reachPerson: 'neem gerust contact op',
    orVisit: 'of bezoek het',
    helpCenter: 'Helpcentrum',
    exploreOther: 'Ontdek andere diensten',
  },
} as const

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
                  : meta.slug === 'ai-consulting'
                    ? '/services/statement-consulting.webp'
                    : meta.photo
          }
          copy={content.reveal}
          accent={meta.accent}
        />
        {meta.slug === 'ai-consulting' && <ConsultingTimeline />}
        {meta.slug === 'aios' && <AiosWhoFor meta={meta} />}
        {meta.slug === 'aios' && <AiosWorkGrid />}
        {meta.slug === 'aios' && <AiosTimeline />}
        {meta.slug === 'aios' && <RoiBand meta={meta} />}
        {meta.slug === 'aios' && <WhyUs content={content} meta={meta} />}
        {meta.slug === 'local-ai' && <LocalWhoFor />}
        {meta.slug === 'local-ai' && <ComparisonBand />}
        {meta.slug === 'local-ai' && <ServerTimeline />}
        {meta.slug === 'app-design' && <AppWhoFor />}
        {meta.slug === 'app-design' && <AppBuildShapes />}
        {meta.slug === 'app-design' && <AppShowcase />}
        {meta.slug !== 'aios' && <WhyUs content={content} meta={meta} />}
        {meta.slug !== 'aios' && <RoiBand meta={meta} />}
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
  'ai-consulting': { gif: '/services/consulting-discovery.gif' },
}
const SHOWCASE_COPY: Record<Lang, Record<ServiceSlug, { eyebrow: string; title: string; body: string }>> = {
  en: {
    'app-design': {
      eyebrow: '',
      title: 'Your idea, sharpened into an app that lives.',
      body: 'Bring us your idea, even the boldest one. We sharpen it together and take it from concept to a living, working app: business-grade, sharp and solid, ready to ship as an internal B2B tool, a B2C product for your customers, or an app for a wider audience.',
    },
    'local-ai': {
      eyebrow: '',
      title: 'Your data becomes an AI that works for you.',
      body: 'Everything your company knows is now scattered across folders, documents and inboxes, quiet and hard to find right when you need it. We bring it together into one intelligent system you can simply ask. It learns from your own data, grows more useful every day, and never leaves your own servers.',
    },
    aios: {
      eyebrow: '',
      title: 'You pay for ten tools and glue them together yourself.',
      body: 'Every part of your business lives in a different program, and none of them know what the others are doing. We bring it all together into one smart whole that knows your entire company and takes the work off your hands, so your team can focus on what matters and your business runs on AI instead of reaching for it now and then.',
    },
    'ai-consulting': {
      eyebrow: '',
      title: 'We go deep into your business before we recommend anything',
      body: 'No generic advice from a distance. We look closely at how you really work, where it gets stuck and where time disappears, and only once we understand that do we tell you where AI makes the difference for you.',
    },
  },
  nl: {
    'app-design': {
      eyebrow: '',
      title: 'Uw idee, aangescherpt tot een app die leeft.',
      body: 'Breng ons uw idee, ook het meest gewaagde. We scherpen het samen aan en tillen het van concept naar een levende, werkende app: zakelijk, fris en solide, klaar om in te zetten als interne B2B-tool, als B2C-product voor uw klanten, of als app voor een breed publiek.',
    },
    'local-ai': {
      eyebrow: '',
      title: 'Uw data wordt een AI die voor u werkt.',
      body: 'Alles wat uw bedrijf weet ligt nu verspreid over mappen, documenten en inboxen, stil en moeilijk te vinden net op het moment dat u het nodig hebt. Wij brengen dat samen tot één intelligent systeem dat u gewoon iets kunt vragen. Het leert van uw eigen data, wordt elke dag bruikbaarder, en verlaat nooit uw eigen servers.',
    },
    aios: {
      eyebrow: '',
      title: 'Je betaalt voor tien tools en plakt ze zelf aan elkaar.',
      body: 'Elk stuk van je bedrijf zit in een ander programma, en niemand weet van elkaar wat er speelt. Wij brengen alles samen in één slim geheel dat je hele bedrijf kent en het werk overneemt, zodat je team focust op wat telt en je bedrijf voortaan op AI draait in plaats van het er af en toe bij te pakken.',
    },
    'ai-consulting': {
      eyebrow: '',
      title: 'We duiken diep in je bedrijf voor we iets aanraden',
      body: 'Geen algemeen advies van een afstand. We kijken van dichtbij hoe je echt werkt, waar het stroef loopt en waar tijd verdwijnt, en pas als we dat begrijpen zeggen we waar AI voor jou het verschil maakt.',
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
        {/* The service's own mark, clean (no frame), sitting above the title */}
        <motion.img
          variants={heroFade}
          src={meta.icon}
          alt=""
          aria-hidden
          className="h-16 w-16 object-contain opacity-95 drop-shadow-[0_6px_26px_rgba(0,0,0,0.5)] sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20"
        />
        <h1 className="mt-5 font-serif text-[35px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[48px] lg:text-[60px] lg:leading-[1.05]">
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

/* Local AI · the privacy tension and the promise, side by side ──────────────── */

/** Two elegant frames (one tension, one promise) plus a confident accent bar.
 *  Replaces the generic two-negative Problem on the Local AI page. Self-contained
 *  bilingual copy; the heading/intro still come from the service data. */
/* Solution · sticky media + outcomes checklist (the "sold" moment) ──────────── */

/* Capabilities · a calm, even grid of what's included ───────────────────────── */

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

        {/* Right column: the card sticks under the header and travels down with
            you as the tall style board scrolls past, releasing at its bottom */}
        <div className="relative">
          <div className="lg:sticky lg:top-28">
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
    title: 'From idea to something that gets used',
    subtitle:
      'We put your idea on the table, or really, we spread it out, whether it is already a fully worked out plan or still just a first thought. We look in detail at what it needs, get to work, and keep following up afterwards.',
    items: [
      {
        title: 'We untangle your idea',
        image: '/services/timeline-app-1.webp',
        clean: '/services/timeline-app-clean-1.webp',
        icon: '/services/icon-app-1.png',
        body: 'You come to us with something that is already big and tangled in your head. We pick it apart with you until it is clear: what it really has to do, for whom, and in what order.',
      },
      {
        title: 'We design how it feels',
        image: '/services/timeline-app-2.webp',
        clean: '/services/timeline-app-clean-2.webp',
        icon: '/services/icon-app-2.png',
        body: 'We design every screen ourselves, never an off-the-shelf design you see everywhere. We think carefully upfront about how people will actually use your app, so every step feels obvious: how someone moves through it, where everything sits, what happens at each step.',
      },
      {
        title: 'We build what it actually has to do',
        image: '/services/timeline-app-3.webp',
        clean: '/services/timeline-app-clean-3.webp',
        icon: '/services/icon-app-3.png',
        body: 'This is about what it actually does. Not a pretty screen that does nothing, but an app that genuinely gets the work done. Built on a foundation that holds up as more people come on and as you add to it later. This is the difference from quickly clicked-together apps that break the moment they are used for real.',
      },
      {
        title: 'We keep it up to date and secure',
        image: '/services/timeline-app-4.webp',
        clean: '/services/timeline-app-clean-4.webp',
        icon: '/services/icon-app-4.png',
        body: 'We do not let go after launch. Necessary updates get made as soon as they are needed, and we run regular security checks on what we built for you, so your app stays current and safe months and years down the line.',
      },
    ],
  },
  nl: {
    title: 'Van idee tot iets dat gebruikt wordt',
    subtitle:
      'We leggen uw idee op tafel, of eigenlijk spreiden we het uit, of het nu al helemaal uitgedacht is of nog maar een eerste inval. We bekijken tot in detail wat het nodig heeft, gaan aan het werk, en blijven daarna opvolgen.',
    items: [
      {
        title: 'We ontwarren uw idee',
        image: '/services/timeline-app-1.webp',
        clean: '/services/timeline-app-clean-1.webp',
        icon: '/services/icon-app-1.png',
        body: 'U komt met iets dat in uw hoofd al groot en ingewikkeld is. Wij pluizen het samen met u uit tot het helder is. Wat moet het echt doen, voor wie, en in welke volgorde.',
      },
      {
        title: 'We ontwerpen hoe het voelt',
        image: '/services/timeline-app-2.webp',
        clean: '/services/timeline-app-clean-2.webp',
        icon: '/services/icon-app-2.png',
        body: 'Elk scherm ontwerpen we zelf, geen kant-en-klaar ontwerp dat u overal terugziet. We denken vooraf goed na over hoe mensen uw app in de praktijk gebruiken, zodat elke stap vanzelfsprekend aanvoelt: hoe iemand erdoorheen beweegt, waar alles staat, wat er gebeurt bij elke stap.',
      },
      {
        title: 'We bouwen wat het echt moet doen',
        image: '/services/timeline-app-3.webp',
        clean: '/services/timeline-app-clean-3.webp',
        icon: '/services/icon-app-3.png',
        body: 'Hier draait het om functionaliteit. Niet een mooi scherm dat verder niks doet, maar een app die het ook echt succesvol uitvoert. En gebouwd op een basis die overeind blijft als er meer mensen op komen en als u er later dingen aan toevoegt. Dit is het verschil met snel in elkaar geklikte apps die breken zodra ze serieus gebruikt worden.',
      },
      {
        title: 'We houden hem up-to-date en veilig',
        image: '/services/timeline-app-4.webp',
        clean: '/services/timeline-app-clean-4.webp',
        icon: '/services/icon-app-4.png',
        body: 'Na de lancering laten we de app niet los. Nodige aanpassingen voeren we door zodra ze nodig zijn, en we voeren geregeld security-checks uit op wat we voor u gebouwd hebben, zodat uw app ook maanden en jaren later nog actueel en veilig blijft.',
      },
    ],
  },
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
          <ServerStepRow key={it.title} title={it.title} body={it.body} image={it.image} clean={it.clean} icon={it.icon} reverse={i % 2 === 0} />
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
    title: 'From an ordinary company to one that goes AI-first',
    subtitle:
      'We do not just drop AI in somewhere. We look at how you work first, and build your whole system around that.',
    items: [
      {
        title: 'We look at how your business really works',
        body: "Before we build anything, we map what happens every day. Which tasks keep coming back, where time slips away, which steps get in each other's way. To do that, we talk to the people who do the work themselves, not only to management.",
        image: '/services/timeline-aios-1.webp',
        clean: '/services/timeline-aios-clean-1.webp',
        icon: '/services/icon-aios-1.png',
      },
      {
        title: 'We build the brain of your company',
        body: "We bring all of your company's knowledge into one place. Your way of working, your brand, your tone, the knowledge that right now only lives with your people. From that moment everything works from the same memory, and your system's output holds up.",
        image: '/services/timeline-aios-2.webp',
        clean: '/services/timeline-aios-clean-2.webp',
        icon: '/services/icon-aios-2.png',
      },
      {
        title: 'We take over the recurring work, department by department',
        body: 'This is where we start building. Department by department, we tackle it step by step within your business process. The system takes over not just the slow, repeated work, but bigger parts of the process itself, so your people keep time for what does need their attention.',
        image: '/services/timeline-aios-3.webp',
        clean: '/services/timeline-aios-clean-3.webp',
        icon: '/services/icon-aios-3.png',
      },
      {
        title: 'We make everything work together as one',
        body: 'Finally we connect it all, with a layer above that steers the whole. No more loose pieces you tie together yourself, but a company that runs as a system, with a chat that oversees it all and you steering the business.',
        image: '/services/timeline-aios-4.webp',
        clean: '/services/timeline-aios-clean-4.webp',
        icon: '/services/icon-aios-4.png',
      },
    ],
  },
  nl: {
    title: 'Van een gewoon bedrijf naar een bedrijf dat AI-first wordt',
    subtitle:
      'We zetten niet zomaar ergens AI neer. We kijken eerst hoe u werkt, en bouwen daar uw hele systeem omheen.',
    items: [
      {
        title: 'We kijken hoe uw bedrijf echt werkt',
        body: 'Voor we iets bouwen, brengen we in kaart wat er elke dag gebeurt. Welke taken keren steeds terug, waar gaat tijd verloren, welke stappen zitten elkaar in de weg. We praten daarvoor met de mensen die het werk zelf doen, niet enkel met het management.',
        image: '/services/timeline-aios-1.webp',
        clean: '/services/timeline-aios-clean-1.webp',
        icon: '/services/icon-aios-1.png',
      },
      {
        title: 'We bouwen het brein van uw bedrijf',
        body: 'We zetten alle kennis van uw bedrijf op één plek. Uw manier van werken, uw merk, uw toon, de kennis die nu alleen bij uw mensen zit. Vanaf dat moment werkt alles vanuit hetzelfde geheugen, en klopt de output van uw systeem.',
        image: '/services/timeline-aios-2.webp',
        clean: '/services/timeline-aios-clean-2.webp',
        icon: '/services/icon-aios-2.png',
      },
      {
        title: 'We nemen het terugkerende werk over, afdeling per afdeling',
        body: 'Hier starten we met bouwen. Per afdeling binnen uw bedrijfsproces pakken we het stapsgewijs aan. Het systeem neemt niet enkel het trage, herhaalde werk over, maar ook grotere stukken van het proces zelf, zodat uw mensen tijd houden voor wat wél hun aandacht vraagt.',
        image: '/services/timeline-aios-3.webp',
        clean: '/services/timeline-aios-clean-3.webp',
        icon: '/services/icon-aios-3.png',
      },
      {
        title: 'We laten alles samenwerken als één geheel',
        body: 'Tot slot verbinden we alles, met daarboven een laag die het geheel aanstuurt. Geen losse stukken meer die u zelf aan elkaar knoopt, maar een bedrijf dat als een systeem draait, met een chat die alles controleert en waar u het bedrijf stuurt.',
        image: '/services/timeline-aios-4.webp',
        clean: '/services/timeline-aios-clean-4.webp',
        icon: '/services/icon-aios-4.png',
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
    title: "The work you'd rather avoid, now simply gets done",
    subtitle:
      'The recurring work that eats time every day, customer-facing and internal. The system reviews it or has already done it, you only sign off.',
    columns: [
      {
        heading: 'Customer-facing',
        items: [
          { label: 'Sales', body: 'Quotes and proposals ready to send, leads followed up so none slip through.' },
          { label: 'Marketing', body: 'Content creation and content planning, all in your own trained tone.' },
          { label: 'Support', body: 'Customer questions answered at once, only the hard ones reach a person.' },
          { label: 'Communication', body: 'Every message in one place, replies prepared and on point.' },
        ],
      },
      {
        heading: 'Internal',
        items: [
          { label: 'Finance', body: 'Most bookkeeping kept up, your accountant only checks it, cutting your accounting costs.' },
          { label: 'Operations', body: 'Onboarding, projects and KPIs running smoothly, always an overview.' },
          { label: 'HR', body: 'Hiring, first screening, follow-up and payroll.' },
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
    title: 'Het werk dat u ontziet, wordt voortaan gewoon gedaan',
    subtitle:
      'Het terugkerende werk dat elke dag tijd kost, klantgericht en intern. Het systeem kijkt het na of heeft het al gedaan, u kijkt het enkel nog na.',
    columns: [
      {
        heading: 'Klantgericht',
        items: [
          { label: 'Sales', body: 'Offertes en voorstellen klaar om te versturen, leads opgevolgd zonder er een te vergeten.' },
          { label: 'Marketing', body: 'Content creatie en contentplanning, alles in uw eigen getrainde toon.' },
          { label: 'Support', body: 'Klantvragen meteen beantwoord, alleen de moeilijke naar een mens.' },
          { label: 'Communicatie', body: 'Alle berichten op één plek, antwoorden staan klaar en kloppen.' },
        ],
      },
      {
        heading: 'Intern',
        items: [
          { label: 'Finance', body: 'Het meeste boekhoudwerk bijgehouden, uw boekhouder controleert enkel nog, wat u minder boekhoudkosten scheelt.' },
          { label: 'Operations', body: "Onboarding, projecten en KPI's lopen soepel, altijd overzicht." },
          { label: 'HR', body: 'Aanwerving, eerste screening, opvolging en loonadministratie.' },
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

const WORK_PHOTOS = ['/services/work-klantgericht.gif', '/services/work-intern.gif']
const WORK_ICONS: string[][] = [
  ['/services/aios-icons/sales.png', '/services/aios-icons/marketing.png', '/services/aios-icons/support.png', '/services/aios-icons/communication.png'],
  ['/services/aios-icons/finance.png', '/services/aios-icons/operations.png', '/services/aios-icons/hr.png', '/services/aios-icons/planning.png'],
]

/** Where the four glossy icon badges float on each gif — a different, varied spread
 *  per column so the two cards never look the same. */
const WORK_BADGES: { left: string; top: string; size: number }[][] = [
  [
    { left: '17%', top: '22%', size: 74 },
    { left: '73%', top: '17%', size: 56 },
    { left: '31%', top: '75%', size: 62 },
    { left: '81%', top: '65%', size: 84 },
  ],
  [
    { left: '28%', top: '18%', size: 60 },
    { left: '78%', top: '32%', size: 82 },
    { left: '18%', top: '63%', size: 80 },
    { left: '68%', top: '74%', size: 54 },
  ],
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
  badges,
}: {
  heading: string
  image: string
  items: { label: string; body: string }[]
  icons: string[]
  badges: { left: string; top: string; size: number }[]
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
            {icons.map((icon, i) => {
              const b = badges[i]
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: b.left, top: b.top, marginLeft: -b.size / 2, marginTop: -b.size / 2 }}
                >
                  <Drift radius={13} duration={20 + (i % 4) * 4} phase={i * 90}>
                    <div
                      className="flex items-center justify-center rounded-[18px] border border-white/12 bg-white/[0.08] shadow-[0_12px_34px_rgba(0,0,0,0.5)] backdrop-blur-md"
                      style={{ width: b.size, height: b.size }}
                    >
                      <img src={icon} alt="" className="object-contain opacity-95" style={{ width: b.size * 0.46, height: b.size * 0.46 }} />
                    </div>
                  </Drift>
                </div>
              )
            })}
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
          <WorkColumn key={col.heading} heading={col.heading} image={WORK_PHOTOS[ci]} items={col.items} icons={WORK_ICONS[ci]} badges={WORK_BADGES[ci]} />
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
    title: 'Why owning your AI pays off',
    subtitle:
      'Most companies send their data to a handful of big tech companies. It works, but you give away more than you think. Here is the difference.',
    sides: [
      {
        kind: 'cloud',
        label: 'The big tech models',
        tag: 'Cloud AI',
        image: '/services/compare-cloud.webp',
        points: [
          'Your data leaves your server with every question you ask.',
          'It is used to train their model further, unless you pay a steep premium.',
          'You pay a subscription every month, often for overkill models far heavier and pricier than your tasks actually need.',
          "You depend on someone else's servers, prices and rules.",
        ],
      },
      {
        kind: 'local',
        label: 'Your own local AI',
        tag: 'Local',
        image: '/services/compare-local.webp',
        points: [
          'Your data stays on your servers, with every question.',
          'It learns only from you, and that knowledge stays yours.',
          'You pay for any hardware, and after that it is yours.',
          'You depend on no one, it sits on your own servers.',
          'It becomes a valuable asset of your company.',
        ],
      },
    ],
    honest:
      'A local model is not the single most powerful one out there. But for what most companies actually need it is more than good enough, and the big advantage is that it is entirely yours.',
  },
  nl: {
    title: 'Waarom eigen AI zoveel voordelen heeft',
    subtitle:
      'De meeste bedrijven sturen hun data naar een handvol grote techbedrijven. Het werkt, maar u geeft er meer voor weg dan u denkt. Zo zit het verschil.',
    sides: [
      {
        kind: 'cloud',
        label: 'De grote tech-modellen',
        tag: 'Cloud-AI',
        image: '/services/compare-cloud.webp',
        points: [
          'Uw data verlaat uw server bij elke vraag die u stelt.',
          'Ze wordt gebruikt om hun model verder te trainen, tenzij u flink bijbetaalt.',
          'U betaalt elke maand een abonnement, vaak voor overkill-modellen die zwaarder en duurder zijn dan uw taken echt nodig hebben.',
          'U bent afhankelijk van de servers, prijzen en regels van iemand anders.',
        ],
      },
      {
        kind: 'local',
        label: 'Uw eigen lokale AI',
        tag: 'Lokaal',
        image: '/services/compare-local.webp',
        points: [
          'Uw data blijft op uw servers, bij elke vraag.',
          'Ze leert alleen van u, en die kennis blijft van u.',
          'U betaalt voor eventuele hardware, en daarna is het van u.',
          'U bent van niemand afhankelijk, het staat op uw eigen servers.',
          'Het wordt een waardevolle asset van uw bedrijf.',
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

/* Local AI · who this is for (three quiet lines + particle animation), only local-ai */

const LOCAL_WHO: Record<Lang, { title: string; subtitle: string; lines: { head: string; body: string }[] }> = {
  en: {
    title: 'Who we build this for',
    subtitle:
      'The more sensitive your data, the more this is for you. Not every company needs its own AI, but for some it is the only way that fits.',
    lines: [
      { head: 'Your data cannot leave', body: 'Companies working with data that simply cannot go out, because clients, regulation or competition will not allow it.' },
      { head: 'You want no monthly bill', body: 'Companies that want to work with AI every day, without a monthly bill that grows with every new colleague.' },
      { head: 'You want to own it', body: 'Companies that want to build their own intelligence, something that stays theirs, instead of staying dependent on big cloud companies.' },
    ],
  },
  nl: {
    title: 'Voor wie we dit bouwen',
    subtitle:
      'Hoe gevoeliger uw data, hoe meer dit voor u is. Niet elk bedrijf heeft een eigen AI nodig, maar voor sommige is het de enige manier die klopt.',
    lines: [
      { head: 'Uw data mag niet naar buiten', body: 'Bedrijven die werken met data die simpelweg niet naar buiten mag, omdat klanten, wetgeving of concurrentie dat niet toelaten.' },
      { head: 'U wilt geen maandkosten', body: 'Bedrijven die elke dag met AI willen werken, zonder een maandelijkse rekening die meegroeit met elke nieuwe collega.' },
      { head: 'U wilt het zelf bezitten', body: 'Bedrijven die hun eigen intelligentie willen opbouwen, iets dat van hen blijft, in plaats van afhankelijk te blijven van grote cloudbedrijven.' },
    ],
  },
}

function LocalWhoFor() {
  const { lang } = useLang()
  const data = LOCAL_WHO[lang]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* the particle animation — left on desktop, melts into the page */}
        <div ref={ref} className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-[90px]"
            style={{ background: 'radial-gradient(52% 46% at 50% 48%, rgba(245,245,245,0.10), transparent 72%)' }}
          />
          <Reveal y={24}>
            <motion.div style={{ y }} className="will-change-transform">
              <img
                src="/services/whofor-localai.gif"
                alt=""
                loading="lazy"
                className="mx-auto aspect-square w-full max-w-[440px] object-contain"
              />
            </motion.div>
          </Reveal>
        </div>

        {/* copy — right on desktop */}
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

/* AI Consulting · "who this is for". Same quiet who-for layout as AIOS and
   Local AI (particle gif + three lines with bold heads), with its own copy: the
   three kinds of doubters, so each reader recognises themselves in one. ─────── */

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
    </section>
  )
}

/* Local AI · secure-AI approaches (horizontal frosted card, grass mark on the left) */

const SAFE_APPROACH: Record<Lang, { title: string; body: string }> = {
  en: {
    title: 'More than one path to safe AI',
    body: 'With local models everything stays on your own server and your data does not go out. For very large tasks you can also bring in the strongest models from the big AI players, like OpenAI, Anthropic or Google. You then pay more to those tech companies in API costs, precisely to keep your data with you: it is not stored, not reused, and not used to train their models. That way you get the greatest power when you genuinely need it, with a higher cost as the downside, especially with a lot of data.',
  },
  nl: {
    title: 'Meerdere benaderingen voor veilige AI',
    body: 'Met lokale modellen blijft alles op uw eigen server en gaat uw data niet naar buiten. Voor heel grote taken kunt u daarnaast de sterkste modellen van de grote AI-spelers inzetten, zoals OpenAI, Anthropic of Google. U betaalt dan wel meer aan die techbedrijven in API-kosten, precies om uw data bij u te houden: ze wordt niet bewaard, niet hergebruikt en niet gebruikt om hun modellen te trainen. Zo krijgt u de grootste kracht wanneer u die echt nodig hebt, met als nadeel een hogere kost, zeker bij veel data.',
  },
}

function LocalSafeCard() {
  const { lang } = useLang()
  const t = SAFE_APPROACH[lang]
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  // The soft light finishes tracing all the way around the card by the time it is centred.
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start 85%', 'center center'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.45 })
  const sweepDeg = useTransform(p, [0.35, 1], [0, 360])
  const ring = useMotionTemplate`conic-gradient(from 0deg at 50% 50%, rgba(245,245,245,0.58) 0deg, rgba(245,245,245,0.58) ${sweepDeg}deg, transparent ${sweepDeg}deg)`

  return (
    <div ref={cardRef} className="relative z-10 mx-auto mt-4 max-w-[1100px] lg:mt-10">
      {/* soft light that traces around BEHIND the card as you scroll — never a hard edge line */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-[9px] rounded-[36px] blur-[22px]"
          style={{ background: ring, opacity: 0.36 }}
        />
      )}
      {/* ambient backlight seeping out from under the card */}
      <div aria-hidden className="pointer-events-none absolute inset-x-12 bottom-[-26px] h-28 rounded-[50%] bg-white/[0.055] blur-[56px]" />

      <Reveal y={16}>
        <div className="relative z-10 overflow-hidden rounded-[28px] border border-line-strong bg-[#0a0a0c] p-8 shadow-[0_45px_110px_-50px_rgba(0,0,0,0.9)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            {/* left: the grass, settled into the card rather than pasted on top */}
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[76%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(closest-side, rgba(150,167,102,0.18), transparent)' }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[14%] left-1/2 h-7 w-[64%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl"
              />
              <img
                src="/services/grass-mound.png"
                alt=""
                loading="lazy"
                className="relative w-full max-w-[440px] object-contain [mask-image:linear-gradient(to_bottom,#000_74%,transparent_99%)]"
              />
              {/* glossy web badge floating on the scene, same treatment as the 'De grote modellen' logos */}
              <div className="absolute left-[46%] top-[20%] -translate-x-1/2 sm:top-[16%]">
                <Drift radius={7} duration={28} phase={40}>
                  <div
                    className="flex items-center justify-center rounded-[18px] border border-white/12 bg-white/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
                    style={{ width: 94, height: 94, padding: 21 }}
                  >
                    <img src="/services/web-white.png" alt="" className="h-full w-full object-contain" />
                  </div>
                </Drift>
              </div>
            </div>

            {/* right: title + text */}
            <div className="relative lg:pr-2">
              <h2 className="font-serif text-[26px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[32px] lg:text-[38px]">
                {t.title}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-faint sm:text-[16px]">{t.body}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
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
      'We do not just drop in a model. We build a complete AI system of your own, shaped around how you work and entirely on your own servers.',
    items: [
      {
        title: 'We look at your data and what you need',
        body: 'Which data you have, how many people will work with it, and what hardware is already in place and might still be needed. That decides which AI models fit you. A small team needs something very different from a large one.',
        image: '/services/timeline-1.webp',
        clean: '/services/timeline-clean-1.webp',
        icon: '/services/icon-step-1.png',
      },
      {
        title: 'We deploy the AI and hardware you need',
        body: "The AI runs on your own servers, inside your own environment. No connection to anyone else's servers, no data going out. We place and handle the hardware you need and make sure everything sits exactly as it should.",
        image: '/services/timeline-2.webp',
        clean: '/services/timeline-clean-2.webp',
        icon: '/services/icon-step-2.png',
      },
      {
        title: 'We let it get to know your company',
        body: 'This is where it truly becomes yours. The AI learns from your own documents, your own way of working, your own data. You get no generic AI but one that understands your company. That knowledge stays in and is kept.',
        image: '/services/timeline-3.webp',
        clean: '/services/timeline-clean-3.webp',
        icon: '/services/icon-step-3.png',
      },
      {
        title: 'We build the apps you need around it',
        body: 'An AI on its own does nothing yet. We build the applications your team actually works with: pulling up documents and emails, asking questions about your own data, work that happens by itself. And we can combine this with an AIOS system, so it fits seamlessly into how your whole business runs. All through your own AI, nothing through the outside.',
        image: '/services/timeline-4.webp',
        clean: '/services/timeline-clean-4.webp',
        icon: '/services/icon-step-4.png',
      },
    ],
  },
  nl: {
    title: 'Van uw eigen server tot uw eigen AI',
    subtitle:
      'We zetten niet zomaar een model neer. We bouwen een compleet eigen AI-systeem, op maat van hoe u werkt en volledig op uw eigen servers.',
    items: [
      {
        title: 'We kijken welke data u heeft en wat nodig is',
        body: 'We kijken welke data u heeft, hoeveel mensen ermee gaan werken, en welke hardware er al staat en eventueel nog nodig is. Dat bepaalt welke AI-modellen bij u passen. Een klein team heeft iets heel anders nodig dan een groot.',
        image: '/services/timeline-1.webp',
        clean: '/services/timeline-clean-1.webp',
        icon: '/services/icon-step-1.png',
      },
      {
        title: 'We implementeren de nodige AI en hardware',
        body: 'De AI komt op uw eigen servers te draaien, binnen uw eigen omgeving. Geen verbinding met servers van iemand anders, geen data die naar buiten gaat. Wij plaatsen en regelen de nodige hardware en zorgen dat alles staat zoals het hoort.',
        image: '/services/timeline-2.webp',
        clean: '/services/timeline-clean-2.webp',
        icon: '/services/icon-step-2.png',
      },
      {
        title: 'We laten het uw bedrijf leren kennen',
        body: 'Dit is waar het echt van u wordt. De AI leert van uw eigen documenten, uw eigen manier van werken, uw eigen data. Zo krijgt u geen algemene AI maar een die uw bedrijf begrijpt. Die kennis blijft binnen en blijft behouden.',
        image: '/services/timeline-3.webp',
        clean: '/services/timeline-clean-3.webp',
        icon: '/services/icon-step-3.png',
      },
      {
        title: 'We bouwen de nodige apps eromheen',
        body: 'Een AI op zich doet nog niks. Wij bouwen de toepassingen waarmee uw team er echt mee werkt: documenten en e-mails ophalen, vragen stellen over uw eigen data, werk dat vanzelf gebeurt. En we kunnen dit combineren met een AIOS-systeem, zodat het naadloos in uw hele bedrijfsvoering past. Alles via uw eigen AI, niets via buiten.',
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
  const blurReveal = useTransform(scrollYProgress, [0.24, 0.36], [0, 1])
  const iconReveal = useTransform(scrollYProgress, [0.31, 0.43], [0, 1])

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
              <div aria-hidden className="absolute h-40 w-40 rounded-full bg-black/35 blur-2xl sm:h-48 sm:w-48" />
              <img
                src={icon}
                alt=""
                className="relative h-24 w-24 drop-shadow-[0_8px_22px_rgba(0,0,0,0.6)] sm:h-32 sm:w-32"
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
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 62%'] })
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

      <div ref={lineRef} className="relative mx-auto mt-12 max-w-[1160px] lg:mt-16">
        {/* ONE centre line for the whole block: it runs through the steps and simply
            keeps going, on down behind the safe-AI card. Literally the same line, so
            there is never a gap or a second lane. The card (z-10) covers its lower end. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block [mask-image:linear-gradient(to_bottom,transparent_0%,#000_5%,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_5%,#000_100%)]"
        >
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/80 to-white/80"
          />
        </div>

        {data.items.map((it, i) => (
          <ServerStepRow key={it.title} title={it.title} body={it.body} image={it.image} clean={it.clean} icon={it.icon} reverse={i % 2 === 0} />
        ))}

        <LocalSafeCard />
      </div>
    </section>
  )
}

/* AI Consulting · the engagement as an alternating photo/text timeline, same lane
   and glossy-reveal treatment as Local AI's ServerTimeline (reuses ServerStepRow),
   with its own four steps and its own icons: listen, weigh, plan, stay. ───────── */

const CONSULTING_STEPS: Record<
  Lang,
  { title: string; subtitle: string; items: { title: string; body: string; image: string; clean?: string; icon?: string }[] }
> = {
  en: {
    title: 'From a question to a plan that fits',
    subtitle: 'We do not start with answers, but with understanding how you work.',
    items: [
      {
        title: 'We listen to how you work',
        body: 'We map what happens every day, where time slips away, and where the frustration sits. Not only with the leadership, but with the people who really do the work. The better we understand how your business runs, the sharper we can see where AI can mean something.',
        image: '/services/timeline-consult-1.webp',
        clean: '/services/timeline-consult-clean-1.webp',
        icon: '/services/icon-consulting-1.png',
      },
      {
        title: 'We find where AI truly pays off',
        body: 'Not everywhere it could, but where it returns the most. We weigh what it costs against what it brings in, and line the opportunities up from most to least valuable. So you know where to put it first.',
        image: '/services/timeline-consult-2.webp',
        clean: '/services/timeline-consult-clean-2.webp',
        icon: '/services/icon-consulting-2.png',
      },
      {
        title: 'We make a plan you can follow',
        body: 'You get a clear plan: what first, what later, roughly what it costs and what it returns. Not a vague report full of possibilities, but a concrete direction you can act on tomorrow.',
        image: '/services/timeline-consult-3.webp',
        clean: '/services/timeline-consult-clean-3.webp',
        icon: '/services/icon-consulting-3.png',
      },
      {
        title: 'We stay with you if you want to build',
        body: 'Want to do it yourself, then you have a clear direction. Want us to build it, or to guide your team, then we are ready. Our advice does not stop at a report, it runs on until it truly works.',
        image: '/services/timeline-consult-4.webp',
        clean: '/services/timeline-consult-clean-4.webp',
        icon: '/services/icon-consulting-4.png',
      },
    ],
  },
  nl: {
    title: 'Van vraag naar een plan dat klopt',
    subtitle: 'We beginnen niet met antwoorden, maar met begrijpen hoe jij werkt.',
    items: [
      {
        title: 'We luisteren naar hoe je werkt',
        body: 'We brengen in kaart wat er elke dag gebeurt, waar tijd verloren gaat, en waar de frustratie zit. Niet alleen bij de leiding, maar bij de mensen die het werk echt doen. Hoe beter we begrijpen hoe je bedrijf draait, hoe scherper we kunnen zien waar AI iets kan betekenen.',
        image: '/services/timeline-consult-1.webp',
        clean: '/services/timeline-consult-clean-1.webp',
        icon: '/services/icon-consulting-1.png',
      },
      {
        title: 'We zoeken waar AI echt loont',
        body: 'Niet overal waar het kan, maar waar het het meeste oplevert. We wegen wat het kost tegen wat het opbrengt, en zetten de kansen op een rij van meest naar minst waardevol. Zo weet je waar je het eerst op moet inzetten.',
        image: '/services/timeline-consult-2.webp',
        clean: '/services/timeline-consult-clean-2.webp',
        icon: '/services/icon-consulting-2.png',
      },
      {
        title: 'We maken een plan dat je kan volgen',
        body: 'Je krijgt een helder plan: wat eerst, wat later, wat het ongeveer kost en wat het oplevert. Geen vaag rapport vol mogelijkheden, maar een concrete richting die je morgen al kan inzetten.',
        image: '/services/timeline-consult-3.webp',
        clean: '/services/timeline-consult-clean-3.webp',
        icon: '/services/icon-consulting-3.png',
      },
      {
        title: 'We blijven erbij als je wil bouwen',
        body: 'Wil je het zelf doen, dan heb je een duidelijke richting. Wil je dat wij het bouwen, of dat we je team begeleiden, dan staan we klaar. Ons advies stopt niet bij een rapport, het loopt door tot het echt werkt.',
        image: '/services/timeline-consult-4.webp',
        clean: '/services/timeline-consult-clean-4.webp',
        icon: '/services/icon-consulting-4.png',
      },
    ],
  },
}

function ConsultingTimeline() {
  const { lang } = useLang()
  const data = CONSULTING_STEPS[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 60%', 'end 62%'] })
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

      <div ref={lineRef} className="relative mx-auto mt-12 max-w-[1160px] lg:mt-16">
        {/* one centre line, fading in at the top and out at the bottom, filling as you scroll */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full lg:block [mask-image:linear-gradient(to_bottom,transparent_0%,#000_5%,#000_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_5%,#000_95%,transparent_100%)]"
        >
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/80 to-white/80"
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
type WhyBg = { src: string; w: number; h: number; posY: number; opacity: number }
const WHY_BG: Record<string, WhyBg> = {
  'app-design': { src: '/services/whyus-wave.webp', w: 800, h: 448, posY: 0.5, opacity: 0.72 },
  aios: { src: '/services/whyus-aios.webp', w: 1500, h: 841, posY: 0.28, opacity: 0.48 },
  'local-ai': { src: '/services/why-localai.webp', w: 1200, h: 675, posY: 0.5, opacity: 0.55 },
  'ai-consulting': { src: '/services/whyus-consulting.webp', w: 1200, h: 915, posY: 0.5, opacity: 0.48 },
}
const whyBg = (slug: string): WhyBg => WHY_BG[slug] ?? WHY_BG['app-design']
const WHY_POS_X = 0.5

function AppWhyCard({
  title,
  body,
  bandRef,
  bg,
}: {
  title: string
  body: string
  bandRef: RefObject<HTMLDivElement | null>
  bg: WhyBg
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
      const scale = Math.max(bw / bg.w, bh / bg.h)
      const sw = bg.w * scale
      const sh = bg.h * scale
      const bandX = (bw - sw) * WHY_POS_X
      const bandY = (bh - sh) * bg.posY
      const { x: cardX, y: cardY } = offsetWithin(card, band)
      setFrost({ w: sw, h: sh, left: bandX - cardX, top: bandY - cardY })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [bandRef, bg])

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
            src={bg.src}
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
  const bg = whyBg(content.slug)
  const sub =
    content.slug === 'aios'
      ? lang === 'nl'
        ? 'Geen kant-en-klaar systeem dat u naar zich toe buigt. Wij bouwen het rond hoe u werkt.'
        : 'No off-the-shelf system you have to bend to. We build it around how you work.'
      : content.slug === 'local-ai'
        ? lang === 'nl'
          ? 'Geen leverancier die u een systeem verhuurt. Wij bouwen uw eigen AI, en die blijft volledig van u, op uw eigen server.'
          : 'No vendor renting you a system. We build your own AI, and it stays entirely yours, on your own server.'
        : content.slug === 'ai-consulting'
          ? lang === 'nl'
            ? 'Geen consultant die een rapport achterlaat. Wij bewijzen het met een werkende pilot en bouwen dan wat werkt.'
            : 'No consultant who leaves a report behind. We prove it with a working pilot, then build what works.'
          : lang === 'nl'
            ? 'Van idee tot een product op het hoogste niveau, en dat blijft zo, ook na de lancering. U komt van idee tot product, zonder zelf met de techniek bezig te hoeven zijn.'
            : 'From idea to a product built to the highest level, and kept there long after launch. You get from idea to product without touching any of the technical side yourself.'
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* bandRef wraps the backdrop AND the cards, so the peak reads across the whole
          section (the background is back, clearly visible) and the per-card frosted
          blur still lines up exactly with it. */}
      <div ref={bandRef} className="relative mx-auto w-full max-w-[1280px]">
        {/* The sharp peak, faded into the page on every edge so it blends in */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={bg.src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: `50% ${bg.posY * 100}%`, opacity: bg.opacity }}
          />
          {/* gentle dark filter so the background reads softer behind the cards */}
          <div aria-hidden className="absolute inset-0 bg-bg/35" />
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
                <AppWhyCard title={d.title} body={d.body} bandRef={bandRef} bg={bg} />
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
  if (meta.slug === 'app-design' || meta.slug === 'aios' || meta.slug === 'local-ai' || meta.slug === 'ai-consulting') return <AppWhyUs content={content} />

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

/* ROI band · only where money-saved is the honest pitch (not consulting) ────── */

function RoiBand({ meta }: { meta: ServiceMeta }) {
  const { lang } = useLang()
  const config = getServiceRoi(lang)[meta.slug]
  if (!config) return null // AI Consulting sells the plan, not hours saved

  return (
    <section className="relative w-full overflow-hidden border-y border-line py-16 sm:py-20 lg:py-24">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {config.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-faint">{config.subtitle}</p>
        </div>
        <RoiCalculator />
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
  if (content.slug === 'app-design' || content.slug === 'aios' || content.slug === 'local-ai' || content.slug === 'ai-consulting') {
    const faqSub =
      content.slug === 'aios'
        ? lang === 'nl'
          ? 'De dingen die u waarschijnlijk wilt weten voordat we uw AIOS bouwen.'
          : 'The things you probably want to know before we build your AIOS.'
        : content.slug === 'local-ai'
          ? lang === 'nl'
            ? 'De dingen die u waarschijnlijk wilt weten voordat we uw private AI installeren.'
            : 'The things you probably want to know before we install your private AI.'
          : content.slug === 'ai-consulting'
            ? lang === 'nl'
              ? 'De dingen die u waarschijnlijk wilt weten voordat we samenwerken.'
              : 'The things you probably want to know before we work together.'
            : lang === 'nl'
              ? 'De dingen die u waarschijnlijk wilt weten voordat we aan uw app beginnen.'
              : 'The things you probably want to know before we start on your app.'
    const orVisitText =
      content.slug === 'app-design'
        ? lang === 'nl'
          ? 'of geef uw idee meer context via het'
          : 'or give your idea more context via the'
        : t.orVisit
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
            {orVisitText}{' '}
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
        src={
          meta.slug === 'app-design'
            ? '/services/cta-appdesign.webp'
            : meta.slug === 'aios'
              ? '/services/cta-aios.webp'
              : meta.slug === 'local-ai'
                ? '/services/cta-localai.webp'
                : meta.slug === 'ai-consulting'
                  ? '/services/cta-consulting.webp'
                  : meta.photo
        }
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
        <motion.div variants={heroFade} className="group mt-9 flex flex-col items-center">
          <BookCallButton className="h-12 px-7 text-[15px]">{content.finalCta.button}</BookCallButton>
          <p className="pointer-events-none mt-5 max-w-xl text-center text-[13px] text-dim opacity-100 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
            {content.finalCta.reassurance}
          </p>
        </motion.div>
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
