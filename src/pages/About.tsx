import { useEffect, useRef, type CSSProperties } from 'react'
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { CONTACT, waitlistHref } from '@/data/contact'
import { useLang } from '@/i18n'

/** Neutral white accent, matching the redesigned service pages. No brand colour, no glow. */
const ACCENT = '#f5f5f5'
const ease = [0.16, 1, 0.3, 1] as const

/** Scenic photos, incl. the glossy glass-slat frames for the product stories. */
const HERO_IMG = '/about/hero.jpg'
const VOICE_IMG = '/about/voice-glossy.webp'
const VOICE_LOGO = '/products/voice-logo.webp'
const BOX_IMG = '/about/box-glossy.webp'
const BOX_LOGO = '/products/box-logo.webp'
const CTA_IMG = '/about/cta-sea.webp'

/** App-style rounded tile mark per service (the same square tile shown in the nav
 *  Services menu), set on the timeline frame instead of a bare glyph. */
const SERVICE_TILE: Record<string, string> = {
  'app-design': '/services/service-appdesign.webp',
  'local-ai': '/services/service-localai.webp',
  aios: '/services/service-aios.webp',
  'ai-consulting': '/services/service-consulting.webp',
}

/** Each service's sharp hero backdrop (the scenic used at the top of its page). Shown
 *  first; the glossy blur then fades in over it on scroll, like the service timelines. */
const SERVICE_HERO: Record<string, string> = {
  'app-design': '/services/hero-appdesign.jpg',
  'local-ai': '/IMG_0885.jpg',
  aios: '/services/hero-aios.jpg',
  'ai-consulting': '/IMG_0887.jpg',
}

/** The same hero, given the glossy glass-slat blur treatment (same as the Voice/Box
 *  frames). Fades in over the sharp hero as the row scrolls into view. */
const SERVICE_GLOSSY: Record<string, string> = {
  'app-design': '/about/tl-appdesign.webp',
  'local-ai': '/about/tl-localai.webp',
  aios: '/about/tl-aios.webp',
  'ai-consulting': '/about/tl-consulting.webp',
}

/** Kamiel's personal LinkedIn, shown on the founder plate. */
const LINKEDIN_URL = 'https://www.linkedin.com/in/kamiel-niville-067ba2366/'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

type Svc = { slug: string; name: string }

const COPY = {
  en: {
    docTitle: 'About · Nivora',
    metaDescription:
      'Nivora is a software and AI studio in Brugge. We make our own products, Box and Voice, and build custom software and AI for companies that want to get the most out of it.',
    heroHeadline: 'Nivora',
    heroSub: 'Intelligent systems',
    voiceStory:
      'Talking is faster than typing, everyone knows that. Dictation just never delivered on it, spitting out text that sounded like a machine and needed redoing anyway. Voice flips that around. You speak, and Voice picks up not just what you say, but the shape it should take. List a few things, and they become clean bullet points. Say “write an email”, and out comes an email, opening and sign-off included. Send a message, and it reads short and direct, the way you would actually type it yourself. No more dictaphone dumping everything out flat. Ready to send, not to rewrite.',
    boxStory:
      'Your attention lives across ten apps. A mail here, a chat there, a DM you only spot at night. Box pulls it all into one calm inbox, so nothing slips past you anymore, and communication becomes just one app to check. Read, sort, reply, all in one quiet place.',
    joinWaitlist: 'Join the waiting list',
    learnMore: 'Learn more',
    servicesHeading: 'Software and AI, born from our own system.',
    servicesIntro:
      'We could not find tools that truly fit how we work, so we built our own system, and we keep improving it every day. That is how a small team runs and scales like a much bigger one. That same system, and the AI knowledge behind it, is now yours to use too, across four services.',
    services: [
      { slug: 'app-design', name: 'App Design' },
      { slug: 'local-ai', name: 'Local AI' },
      { slug: 'aios', name: 'AIOS' },
      { slug: 'ai-consulting', name: 'AI Consulting' },
    ] as Svc[],
    founderAlt: 'Kamiel Niville, founder of Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Founder of Nivora',
    founderLinkedinAria: 'Kamiel on LinkedIn',
    founderEyebrow: 'The person behind it',
    founderHeading: 'The story behind Nivora',
    founderP1:
      "I'm Kamiel, founder of Nivora. What bothered me about AI was how it gets sold as a show: expensive tools that dazzle in a demo but leave the real work of a business untouched. I wanted the opposite. Not a shiny toy, but something that quietly runs alongside you and hands back time, every single day.",
    founderP2:
      "So I started with us. We could not find a system that fit how we work, so we built our own, and we sharpen it every day. That is how a small team does the work of a much bigger one. Everything we offer you, from custom apps to AI running on your own servers, we use and prove on ourselves first. We do not sell promises, only what already works for us.",
    founderSign: 'Founder, based in Brugge, Belgium',
    ctaHeading: "Let's build the right thing",
    ctaBody:
      'Tell us where the friction is. We will show you what is worth building, and what it is worth, before you commit to anything.',
    bookCall: 'Book a call',
    ctaFootPre: 'Based in Brugge, working with companies wherever they are. Or just email ',
  },
  nl: {
    docTitle: 'Over ons · Nivora',
    metaDescription:
      'Nivora is een software- en AI-studio in Brugge. We maken onze eigen producten, Box en Voice, en bouwen software en AI op maat voor bedrijven die er echt alles uit willen halen.',
    heroHeadline: 'Nivora',
    heroSub: 'Intelligente systemen',
    voiceStory:
      'Praten gaat sneller dan typen, dat weet iedereen. Alleen leverde dicteren dat nooit op: tekst die klonk als een machine en die u toch weer moest herschrijven. Voice draait dat om. U spreekt, en Voice hoort niet alleen wát u zegt, maar ook welke vorm het moet krijgen. Somt u iets op, dan worden het nette bullet points. Zegt u “schrijf een e-mail”, dan komt er een e-mail uit, met aanhef en afsluiting. Stuurt u een bericht, dan klinkt het kort en direct, zoals u het zelf zou typen. Geen dicteerapparaat meer dat alles plat achter elkaar plakt. Klaar om te versturen, niet om over te doen.',
    boxStory:
      'Uw aandacht ligt verspreid over tien apps. Een mail hier, een chat daar, een DM die u pas ’s avonds opmerkt. Box brengt het allemaal samen in één rustige inbox, zodat u niets meer over het hoofd ziet en u nog maar één app hoeft te checken voor al uw communicatie. Lezen, sorteren, antwoorden, op één rustige plek.',
    joinWaitlist: 'Schrijf u in op de wachtlijst',
    learnMore: 'Lees meer',
    servicesHeading: 'Software en AI, ontstaan uit ons eigen systeem.',
    servicesIntro:
      'We vonden geen tools die echt pasten bij hoe wij werken, dus bouwden we ons eigen systeem, en we blijven het elke dag verbeteren. Daardoor kan een klein team draaien en schalen als een veel groter bedrijf. Datzelfde systeem, en de AI-kennis die we erachter opbouwen, bieden we nu ook aan u aan, in vier diensten.',
    services: [
      { slug: 'app-design', name: 'App Design' },
      { slug: 'local-ai', name: 'Local AI' },
      { slug: 'aios', name: 'AIOS' },
      { slug: 'ai-consulting', name: 'AI Consulting' },
    ] as Svc[],
    founderAlt: 'Kamiel Niville, oprichter van Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Oprichter van Nivora',
    founderLinkedinAria: 'Kamiel op LinkedIn',
    founderEyebrow: 'De persoon erachter',
    founderHeading: 'Het verhaal achter Nivora',
    founderP1:
      'Ik ben Kamiel, oprichter van Nivora. Wat me stoorde aan AI, is hoe het als een show wordt verkocht: dure tools die schitteren in een demo, maar het echte werk van een bedrijf onaangeroerd laten. Ik wilde net het omgekeerde. Geen glimmend speeltje, maar iets dat stil meedraait en u elke dag tijd teruggeeft.',
    founderP2:
      'Dus begon ik bij onszelf. We vonden geen systeem dat paste bij hoe wij werken, dus bouwden we het zelf, en we scherpen het nog elke dag bij. Daardoor doet ons kleine team het werk van een veel groter bedrijf. Alles wat we u aanbieden, van apps op maat tot AI op uw eigen servers, gebruiken en bewijzen we eerst op onszelf. Wij verkopen geen beloftes, alleen wat bij ons al werkt.',
    founderSign: 'Oprichter, gevestigd in Brugge, België',
    ctaHeading: 'Laat ons het juiste bouwen',
    ctaBody:
      'Vertel ons waar de wrijving zit. We tonen u wat de moeite waard is om te bouwen, en wat het waard is, voordat u zich ergens aan vastlegt.',
    bookCall: 'Boek een gesprek',
    ctaFootPre: 'Gevestigd in Brugge, we werken met bedrijven waar ze ook zijn. Of mail gewoon ',
  },
} as const

/* Shared bits ─────────────────────────────────────────────────────────────── */

/** A scenic photo that drifts gently against the scroll. Always covers its box. */
function ParallaxImage({
  src,
  range = ['-6%', '6%'],
  className,
}: {
  src: string
  range?: [string, string]
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], range)
  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <motion.img
        src={src}
        alt=""
        aria-hidden
        style={reduced ? { top: '-13%' } : { y, top: '-13%' }}
        className="absolute left-0 h-[126%] w-full object-cover"
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function About() {
  const { lang } = useLang()
  const t = COPY[lang]

  useEffect(() => {
    document.title = t.docTitle
    const meta = document.querySelector('meta[name="description"]')
    const prev = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', t.metaDescription)
    return () => {
      document.title = 'Nivora'
      if (meta && prev !== null) meta.setAttribute('content', prev)
    }
  }, [t.docTitle, t.metaDescription])

  return (
    <main
      className="relative w-full overflow-x-clip bg-bg"
      style={{ ['--accent' as string]: ACCENT } as CSSProperties}
    >
      <Hero />
      <ProductStory
        name="Voice"
        story={t.voiceStory}
        logo={VOICE_LOGO}
        image={VOICE_IMG}
        cta={t.joinWaitlist}
        ctaHref={waitlistHref('voice')}
      />
      <ProductStory
        reverse
        name="Box"
        story={t.boxStory}
        logo={BOX_LOGO}
        image={BOX_IMG}
        cta={t.joinWaitlist}
        ctaHref={waitlistHref('box')}
      />
      <ServicesTimeline />
      <Founder />
      <FinalCta />
    </main>
  )
}

/* Hero · the Nivora story, scenic and drifting ───────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.14 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease } },
}

function Hero() {
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid min-h-[90svh] w-full place-items-center overflow-hidden px-6 pb-24 pt-32">
      <ParallaxImage src={HERO_IMG} range={['-5%', '5%']} />
      <div className="absolute inset-0 bg-black/20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(80% 62% at 50% 46%, rgba(0,0,0,0.34), rgba(0,0,0,0.08) 60%, transparent 82%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial={reduced ? false : 'hidden'}
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.img
          variants={heroFade}
          src="/brand/nivora-mark.webp"
          alt=""
          aria-hidden
          className="mb-6 h-12 w-auto object-contain opacity-95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:mb-8 sm:h-14 lg:mb-10 lg:h-[68px]"
        />

        <h1 className="font-serif text-[64px] leading-[1.02] tracking-[-0.02em] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-[92px] lg:text-[132px] lg:leading-[0.98]">
          {t.heroHeadline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-8 max-w-2xl text-[19px] leading-relaxed text-ink-soft/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] lg:text-[24px]"
        >
          {t.heroSub}
        </motion.p>
      </motion.div>
    </section>
  )
}

/* Product story · a blurred nature frame with the product mark floating on it,
   copy alongside. Voice and Box each get one, mirrored. Not a timeline. ──────── */

function ProductStory({
  name,
  story,
  logo,
  image,
  cta,
  ctaHref,
  reverse,
}: {
  name: string
  story: string
  logo: string
  image: string
  cta: string
  ctaHref: string
  reverse?: boolean
}) {
  return (
    <section className="relative mx-auto w-full max-w-[1150px] px-6 py-14 sm:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Glossy glass-slat frame: a sharp scenic with a fluted-glass pane baked in,
            with the product mark set on the pane. */}
        <Reveal className={cn(reverse ? 'lg:order-2' : 'lg:order-1')}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <img src={image} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div aria-hidden className="absolute h-40 w-40 rounded-full bg-black/35 blur-2xl" />
              <img
                src={logo}
                alt={name}
                className="relative h-[84px] w-[84px] rounded-[22px] object-cover shadow-[0_12px_34px_rgba(0,0,0,0.55)] sm:h-[96px] sm:w-[96px]"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </Reveal>

        {/* The story */}
        <div className={cn(reverse ? 'lg:order-1' : 'lg:order-2')}>
          <Reveal>
            <h2 className="font-serif text-[44px] leading-none tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[64px]">{name}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted lg:text-[17px]">{story}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <RippleButton
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="mt-8 h-11 px-6 text-[14px]"
            >
              {cta}
            </RippleButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Services timeline · the four services that grew out of our own system. Each row
   is a glossy-blurred frame of that service's hero (same blade treatment as the
   Voice/Box frames) carrying its app tile mark, with just the name and a Learn-more
   button alongside. A centre line runs through them and fades out at the end — it
   does not spill into the founder section below. ─────────────────────────────────── */
function ServicesTimeline() {
  const { lang } = useLang()
  const t = COPY[lang]
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 62%', 'end 62%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[46px]">
            {t.servicesHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-lg text-[15.5px] leading-relaxed text-faint lg:text-[16px]">{t.servicesIntro}</p>
        </Reveal>
      </div>

      <div ref={lineRef} className="relative mx-auto mt-14 max-w-[1160px] lg:mt-20">
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

        {t.services.map((s, i) => (
          <ServiceStep key={s.slug} service={s} reverse={i % 2 === 0} />
        ))}
      </div>
    </section>
  )
}

/* One service on the timeline: just the name and a Learn-more button on one side,
   a glossy-blurred frame of its hero with the app tile mark on the other, wiped in
   on scroll. A bead marks it on the centre line. ────────────────────────────────── */
function ServiceStep({ service, reverse }: { service: Svc; reverse: boolean }) {
  const { lang } = useLang()
  const t = COPY[lang]
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
  // Once the frame has wiped in, a quick scroll fades the glossy blur over the sharp
  // hero, then the app tile — same little reveal the service-page timelines use.
  const blurReveal = useTransform(scrollYProgress, [0.24, 0.36], [0, 1])
  const iconReveal = useTransform(scrollYProgress, [0.31, 0.43], [0, 1])

  return (
    <div ref={ref} className="relative py-12 sm:py-16 lg:py-24">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg lg:flex"
      >
        <motion.span
          style={reduced ? undefined : { opacity: beadOpacity, scale: beadScale }}
          className="h-3 w-3 rounded-full bg-ink shadow-[0_0_14px_rgba(245,245,245,0.7)]"
        />
      </span>

      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
        {/* Just the name + a Learn-more button (same style as the waitlist CTA) */}
        <motion.div
          style={reduced ? undefined : { y: ty }}
          className={cn('flex flex-col items-start lg:px-2', reverse ? 'lg:order-2' : 'lg:order-1')}
        >
          <h3 className="font-serif text-[36px] leading-[1.0] tracking-[-0.02em] text-ink sm:text-[46px] lg:text-[56px]">
            {service.name}
          </h3>
          <RippleButton href={`/services/${service.slug}`} variant="ghost" className="mt-7 h-11 px-6 text-[14px]">
            {t.learnMore}
          </RippleButton>
        </motion.div>

        {/* Sharp hero wipes in, then the glossy blur fades over it, then the app tile */}
        <motion.a
          href={`/services/${service.slug}`}
          style={reduced ? undefined : { clipPath: clip, opacity }}
          className={cn(
            'group relative block overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-[border-color] duration-300 hover:border-line-strong',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {/* sharp hero — the clean base */}
          <img
            src={SERVICE_HERO[service.slug]}
            alt=""
            aria-hidden
            loading="lazy"
            className="block aspect-[4/3] w-full object-cover"
          />
          {/* glossy glass-slat blur — fades in over the sharp hero on scroll */}
          <motion.img
            src={SERVICE_GLOSSY[service.slug]}
            alt=""
            aria-hidden
            loading="lazy"
            style={reduced ? { opacity: 1 } : { opacity: blurReveal }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* app tile mark — fades in a beat after the blur */}
          <motion.div
            style={reduced ? { opacity: 1 } : { opacity: iconReveal }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div aria-hidden className="absolute h-28 w-28 rounded-full bg-black/30 blur-2xl sm:h-36 sm:w-36" />
            <img
              src={SERVICE_TILE[service.slug]}
              alt={service.name}
              className="relative h-[78px] w-[78px] rounded-[20px] border border-white/10 object-cover shadow-[0_14px_36px_rgba(0,0,0,0.6)] sm:h-[94px] sm:w-[94px]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </motion.a>
      </div>
    </div>
  )
}

/* Founder · a loose closing note, no frame around it. A big portrait of Kamiel with
   his name plate, beside a short personal note. Separate from the services timeline
   above, so the timeline does not spill into it. ────────────────────────────────── */
function Founder() {
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section className="relative mx-auto w-full max-w-[1150px] px-6 pb-20 pt-2 sm:pb-24 lg:pb-28">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        {/* Portrait — loose, no card around the section */}
        <Reveal>
          <div ref={ref} className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[26px] border border-line">
            <motion.img
              src="/about/founder-kamiel.webp"
              alt={t.founderAlt}
              style={reduced ? undefined : { y }}
              className="aspect-[4/5] w-full scale-[1.06] object-cover object-[center_18%] will-change-transform [filter:brightness(1.12)_saturate(1.06)_sepia(0.05)]"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-black/40 px-4 py-3 backdrop-blur-md">
              <div className="min-w-0">
                <p className="font-serif text-[18px] leading-tight text-ink">{t.founderName}</p>
                <p className="mt-0.5 text-[12px] text-faint">{t.founderRole}</p>
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.founderLinkedinAria}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.04] text-muted transition-colors hover:bg-white/[0.09] hover:text-ink lg:h-9 lg:w-9"
              >
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="currentColor" aria-hidden="true">
                  <path d={LINKEDIN_PATH} />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Short note */}
        <div>
          <Reveal>
            <h2 className="font-serif text-[28px] leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
              {t.founderHeading}
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-relaxed text-muted lg:text-[16px]">
            <Reveal delay={0.1}>
              <p>{t.founderP1}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>{t.founderP2}</p>
            </Reveal>
          </div>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-serif text-[24px] italic leading-none text-ink/90">{t.founderName}</span>
              <span className="text-[13.5px] text-faint">{t.founderSign}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Final CTA · scenic close ───────────────────────────────────────────────────── */

function FinalCta() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 py-28 sm:py-32 lg:py-40">
      <ParallaxImage src={CTA_IMG} range={['-5%', '5%']} />
      <div className="absolute inset-0 bg-black/35" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(72% 62% at 50% 46%, rgba(6,6,6,0.62), transparent 80%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink [text-shadow:0_2px_26px_rgba(0,0,0,0.5)] sm:text-[42px] lg:text-[50px]">
            {t.ctaHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] lg:text-base">
            {t.ctaBody}
          </p>
          <div className="mt-9 flex flex-col items-center">
            <BookCallButton className="peer h-12 px-7 text-[15px]">{t.bookCall}</BookCallButton>
            <p className="mt-6 text-center text-[13px] text-ink-soft/60 opacity-0 transition-opacity duration-300 peer-hover:opacity-100 [@media(hover:none)]:opacity-100">
              {t.ctaFootPre}
              <a href={`mailto:${CONTACT.email}`} className="text-faint underline-offset-4 hover:text-ink hover:underline">
                {CONTACT.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
