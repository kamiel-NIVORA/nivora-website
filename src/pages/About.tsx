import { useEffect, useRef, type CSSProperties } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
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

const SERVICE_ICON: Record<string, string> = {
  'app-design': '/services/icon-appdesign.png',
  'local-ai': '/services/icon-localai.png',
  aios: '/services/icon-aios.png',
  'ai-consulting': '/services/icon-consulting.png',
}

/** Glossy glass-slat tile per service, same treatment as the Voice/Box frames above. */
const SERVICE_TILE_IMG: Record<string, string> = {
  'app-design': '/about/service-appdesign-glossy.webp',
  'local-ai': '/about/service-localai-glossy.webp',
  aios: '/about/service-aios-glossy.webp',
  'ai-consulting': '/about/service-consulting-glossy.webp',
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
    heroSub: 'Intelligent systems.',
    voiceStory:
      'Talking is faster than typing, everyone knows that. Dictation just never delivered on it, spitting out text that sounded like a machine and needed redoing anyway. Voice flips that around. You speak, and Voice picks up not just what you say, but the shape it should take. List a few things, and they become clean bullet points. Say “write an email”, and out comes an email, opening and sign-off included. Send a message, and it reads short and direct, the way you would actually type it yourself. No more dictaphone dumping everything out flat. Ready to send, not to rewrite.',
    boxStory:
      'Your attention lives across ten apps. A mail here, a chat there, a DM you only spot at night. Box pulls it all into one calm inbox, so nothing slips past you anymore, and communication becomes just one app to check. Read, sort, reply, all in one quiet place.',
    joinWaitlist: 'Join the waiting list',
    servicesEyebrow: 'What grew from that',
    servicesIntro:
      'Four services, grown straight out of that same experience. The same approach, the same AI, and the knowledge we keep building and maintaining every single day, now offered as consulting for your business too. Not knowledge from a book, but knowledge we have already tested and proven on ourselves.',
    morePre: 'And this is only the beginning. We want to build so much more, and we share every step on the ',
    moreLink: 'blog',
    morePost: '.',
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
      "I'm Kamiel. I started Nivora because I kept seeing the same thing: AI sold like some miracle, while almost no one stopped to look at what a company actually does all day. The tool came first, and you were supposed to bend everything around it. That always felt backwards to me.",
    founderP2:
      "So we do it the other way round. Work first, technology second. Not AI because it is AI, but because it takes something off your plate that you feel every single day. And always on something that is yours, not rented, not sitting in a cloud you cannot see into.",
    founderP3:
      "We ran into that exact same problem ourselves. AI tools everywhere, but nothing really built for Nivora. So we built our own system, one we design, optimise and keep extending ourselves. That is exactly what lets a very lean team run and scale like a much bigger company. That system, and everything we keep learning about AI along the way, is where our services come from. We offer what we already proved on ourselves first.",
    founderP4:
      "Sometimes we sharpen what you already have, sometimes we build from scratch. Honestly, that part does not matter much. What matters is that the thing just works, quietly, so you can get on with your day instead of fighting your tools. That is the whole point.",
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
    heroSub: 'Intelligente systemen.',
    voiceStory:
      'Praten gaat sneller dan typen, dat weet iedereen. Alleen leverde dicteren dat nooit op: tekst die klonk als een machine en die u toch weer moest herschrijven. Voice draait dat om. U spreekt, en Voice hoort niet alleen wát u zegt, maar ook welke vorm het moet krijgen. Somt u iets op, dan worden het nette bullet points. Zegt u “schrijf een e-mail”, dan komt er een e-mail uit, met aanhef en afsluiting. Stuurt u een bericht, dan klinkt het kort en direct, zoals u het zelf zou typen. Geen dicteerapparaat meer dat alles plat achter elkaar plakt. Klaar om te versturen, niet om over te doen.',
    boxStory:
      'Uw aandacht ligt verspreid over tien apps. Een mail hier, een chat daar, een DM die u pas ’s avonds opmerkt. Box brengt het allemaal samen in één rustige inbox, zodat u niets meer over het hoofd ziet en u nog maar één app hoeft te checken voor al uw communicatie. Lezen, sorteren, antwoorden, op één rustige plek.',
    joinWaitlist: 'Schrijf u in op de wachtlijst',
    servicesEyebrow: 'Wat daaruit is gegroeid',
    servicesIntro:
      'Vier diensten, rechtstreeks uit diezelfde ervaring gegroeid. Dezelfde aanpak, dezelfde AI, en de kennis die we dag na dag opbouwen en bijhouden, bieden we nu ook aan als consultancy voor uw bedrijf. Geen kennis uit een boek, maar kennis die we zelf al hebben getest en bewezen.',
    morePre: 'En dit is nog maar het begin. We willen nog veel meer bouwen, en we delen elke stap op de ',
    moreLink: 'blog',
    morePost: '.',
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
      'Ik ben Kamiel. Ik begon Nivora omdat ik telkens hetzelfde zag: AI verkocht als een wondermiddel, terwijl bijna niemand eerst keek naar wat een bedrijf de hele dag écht doet. De tool kwam eerst, en het bedrijf moest zich er maar naar plooien. Dat voelde voor mij altijd omgekeerd.',
    founderP2:
      'Dus doen wij het andersom. Eerst het werk, dan pas de technologie. Geen AI omdat het AI is, maar omdat het iets van uw bord haalt dat u elke dag voelt. En altijd op iets dat van u is, niet gehuurd, niet ergens in een cloud waar u geen zicht op hebt.',
    founderP3:
      'We botsten zelf op precies hetzelfde probleem. Overal AI-tools, maar niets dat echt voor Nivora was gemaakt. Dus bouwden we ons eigen systeem, dat we zelf ontwerpen, optimaliseren en steeds verder uitbouwen. Dat is precies wat een heel lean team laat draaien en schalen zoals een veel groter bedrijf. En dat systeem, met alles wat we blijven bijleren over AI, is waar onze diensten vandaan komen. Wij bieden aan wat we eerst op onszelf hebben bewezen.',
    founderP4:
      'Soms scherpen we bij wat u al hebt, soms bouwen we van nul. Eerlijk, dat deel maakt niet zoveel uit. Wat telt, is dat het gewoon werkt, in stilte, zodat u met uw dag bezig kunt zijn in plaats van met uw tools. Daar draait het om.',
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

/* Founder · editorial portrait that drifts on scroll, plus the four services that
   grew out of the same story — one collage of photos (big founder portrait, four
   smaller glossy service tiles) beside one flowing text column. Not two sections
   stacked, one whole. ─────────────────────────────────────────────────────────── */

function Founder() {
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        {/* Photo collage: the founder portrait, big, with the four services that
            grew out of his story as smaller glossy tiles beside it. */}
        <Reveal>
          <div className="flex flex-col gap-3 lg:grid lg:h-[520px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
            {/* Portrait */}
            <div
              ref={ref}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-line lg:aspect-auto lg:col-span-2 lg:row-span-2 lg:h-full"
            >
              <motion.img
                src="/about/founder-kamiel.webp"
                alt={t.founderAlt}
                style={reduced ? undefined : { y }}
                className="absolute inset-0 h-[112%] w-full scale-[1.06] object-cover object-[center_20%] will-change-transform [filter:brightness(1.12)_saturate(1.06)_sepia(0.05)]"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

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

            {/* Four service tiles — a plain grid on mobile, `contents` at lg so
                they drop straight into the collage grid as four cells beside
                the portrait instead of nesting a grid inside a grid cell. */}
            <div className="grid grid-cols-2 gap-3 lg:contents">
              {t.services.map((s) => (
                <ServiceTile key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* One flowing text column: the personal story, then what grew from it. */}
        <div>
          <Reveal>
            <h2 className="font-serif text-[28px] leading-[1.18] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
              {t.founderHeading}
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-relaxed text-muted lg:text-base">
            <Reveal delay={0.1}>
              <p>{t.founderP1}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>{t.founderP2}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>{t.founderP3}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p>{t.founderP4}</p>
            </Reveal>
          </div>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-serif text-[24px] italic leading-none text-ink/90">{t.founderName}</span>
              <span className="text-[13.5px] text-faint">{t.founderSign}</span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 border-t border-line/60 pt-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-dim">{t.servicesEyebrow}</p>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-faint lg:text-base">{t.servicesIntro}</p>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-faint lg:text-base">
                {t.morePre}
                <a
                  href="/blog"
                  className="text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {t.moreLink}
                </a>
                {t.morePost}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** One glossy service tile in the founder collage: a blurred scenic photo (same
 *  glass-slat treatment as the Voice/Box frames) with the service's icon set on
 *  it, like a small companion to those bigger frames. Links to its service page. */
function ServiceTile({ service }: { service: Svc }) {
  return (
    <a
      href={`/services/${service.slug}`}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-line transition-colors duration-300 hover:border-line-strong lg:aspect-auto lg:h-full"
    >
      <img
        src={SERVICE_TILE_IMG[service.slug]}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div aria-hidden className="absolute h-16 w-16 rounded-full bg-black/40 blur-xl" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-[#0c0c0e]/80 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          <img src={SERVICE_ICON[service.slug]} alt="" className="h-[22px] w-[22px] object-contain" loading="lazy" />
        </span>
      </div>
      <span className="absolute inset-x-3 bottom-3 font-serif text-[13px] leading-tight text-ink">
        {service.name}
      </span>
    </a>
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
