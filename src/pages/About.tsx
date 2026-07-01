import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { ProcessTimeline, type ProcessStep } from '@/components/ui/ProcessTimeline'
import { ScrollStatement } from '@/components/ui/ScrollStatement'
import { useContactModal } from '@/components/contact/ContactModal'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/data/contact'
import { useLang } from '@/i18n'

/** Neutral white accent, matching the redesigned service pages. No brand colour, no glow. */
const ACCENT = '#f5f5f5'
const ease = [0.16, 1, 0.3, 1] as const

/** Scenic photos, on the same quiet-morning palette as the service pages. */
const HERO_IMG = '/about/hero.jpg'
const MISSION_IMG = '/backgrounds/bg-peak-mono.webp'
const CTA_IMG = '/home/cta-landscape.webp'

/** Company LinkedIn (kept in sync with the footer/contact data). */
const LINKEDIN_URL = 'https://www.linkedin.com/company/116050071'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

type PromiseItem = { title: string; body: string }

const COPY = {
  en: {
    docTitle: 'About · Nivora',
    metaDescription:
      'Nivora is a software and AI studio in Brugge. We build custom software and AI around how your business actually works, and we make our own products, Box and Voice.',
    heroEyebrow: 'A software & AI studio',
    heroHeadline: 'Software and AI, shaped around how you really work.',
    heroSub:
      "We're Nivora, a small studio in Brugge. We design and build custom software and AI that fits the way your team already works, and we make our own products too. Box and Voice are on the way.",
    bookCall: 'Book a call',
    getInTouch: 'Get in touch',
    missionStatement:
      'Most companies get sold AI. Hardly anyone gets shown what it should actually do for them.',
    promisesEyebrow: 'Why we exist',
    promisesLead:
      "That gap is exactly why we started Nivora. We don't lead with a tool, we lead with a conversation: how does your business really run, and where does it hurt? Then we build the software and AI that fits. The only test that matters to us is simple. Does it make the day genuinely easier?",
    promises: [
      {
        title: 'We build around you',
        body: 'We shape the software to the way your team already works, never the other way around. You never bend your day to fit a tool.',
      },
      {
        title: 'You see the value first',
        body: 'We show you what is worth building, and what it is worth, before you commit a cent. No leap of faith, no long contract to find out.',
      },
      {
        title: 'Your data stays yours',
        body: 'We can run the AI on your servers or ours, so the sensitive things never have to leave your walls. Private by default, not as an upsell.',
      },
    ] as PromiseItem[],
    howHeading: 'How we work',
    howSub: 'No heavy process, no account managers in between. Three steps, and we stay close through all of them.',
    steps: [
      {
        phase: 'Listen',
        title: 'We get how you work',
        body: 'We start with your business and your team, not a pitch, and find where the real friction sits.',
      },
      {
        phase: 'Build',
        title: 'We build it around you',
        body: 'We design and build the system, sharpening what you have or starting fresh, and put something real in front of you early.',
      },
      {
        phase: 'Stay',
        title: 'We stick around',
        body: 'We do not vanish once it ships. We maintain it, refine it, and let it grow right along with you.',
      },
    ] as ProcessStep[],
    founderAlt: 'Kamiel Niville, founder of Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Founder of Nivora',
    founderLinkedinAria: 'Kamiel on LinkedIn',
    founderEyebrow: 'The person behind it',
    founderHeading: 'The story behind Nivora',
    founderP1:
      "Hi, I'm Kamiel. I started Nivora after seeing the same thing happen again and again: companies being sold AI, but almost no one building it around what those companies actually do all day.",
    founderP2:
      'So we do the opposite. We start with the work, shape the software and AI around it, and give people tools they genuinely reach for, all on systems they own and control.',
    founderP3:
      'Whether we polish something you already have or build it from the ground up, the goal never changes. Technology that quietly does its job, so you and your team can get on with yours.',
    founderSign: 'Founder, based in Brugge, Belgium',
    ctaHeading: "Let's build the right thing",
    ctaBody:
      'Tell us where the friction is. We will show you what is worth building, and what it is worth, before you commit to anything.',
    ctaFootPre: 'Based in Brugge, working with companies wherever they are. Or just email ',
  },
  nl: {
    docTitle: 'Over ons · Nivora',
    metaDescription:
      'Nivora is een software- en AI-studio in Brugge. We bouwen software en AI op maat, rond de manier waarop uw bedrijf echt werkt, en we maken onze eigen producten, Box en Voice.',
    heroEyebrow: 'Een software- & AI-studio',
    heroHeadline: 'Software en AI, gevormd rond hoe u echt werkt.',
    heroSub:
      'Wij zijn Nivora, een kleine studio in Brugge. We ontwerpen en bouwen software en AI op maat die past bij hoe uw team al werkt, en we maken ook onze eigen producten. Box en Voice zijn onderweg.',
    bookCall: 'Boek een gesprek',
    getInTouch: 'Neem contact op',
    missionStatement:
      'De meeste bedrijven krijgen AI verkocht. Bijna niemand krijgt te zien wat het echt voor hen zou moeten doen.',
    promisesEyebrow: 'Waarom we bestaan',
    promisesLead:
      'Net dat gat is waarom we Nivora startten. We beginnen niet met een tool, maar met een gesprek: hoe draait uw bedrijf echt, en waar doet het pijn? Daarna bouwen we de software en AI die past. De enige test die voor ons telt is eenvoudig. Maakt het de dag echt makkelijker?',
    promises: [
      {
        title: 'We bouwen rond u',
        body: 'We vormen de software naar hoe uw team al werkt, nooit andersom. U buigt uw dag nooit om naar een tool.',
      },
      {
        title: 'U ziet eerst de waarde',
        body: 'We tonen u wat de moeite waard is om te bouwen, en wat het waard is, voordat u een euro uitgeeft. Geen sprong in het diepe, geen lang contract om erachter te komen.',
      },
      {
        title: 'Uw data blijft van u',
        body: 'We draaien de AI op uw servers of de onze, zodat het gevoelige nooit uw muren hoeft te verlaten. Privé vanaf de start, niet als duurdere optie.',
      },
    ] as PromiseItem[],
    howHeading: 'Hoe we werken',
    howSub: 'Geen zwaar proces, geen accountmanagers ertussen. Drie stappen, en bij alle drie blijven we dicht bij u.',
    steps: [
      {
        phase: 'Luisteren',
        title: 'We snappen hoe u werkt',
        body: 'We beginnen bij uw bedrijf en uw team, niet bij een verkooppraatje, en zoeken waar de echte wrijving zit.',
      },
      {
        phase: 'Bouwen',
        title: 'We bouwen het rond u',
        body: 'We ontwerpen en bouwen het systeem, scherpen aan wat u hebt of starten opnieuw, en zetten vroeg al iets echts voor u neer.',
      },
      {
        phase: 'Blijven',
        title: 'We blijven erbij',
        body: 'We verdwijnen niet zodra het live staat. We onderhouden het, verfijnen het, en laten het meegroeien met u.',
      },
    ] as ProcessStep[],
    founderAlt: 'Kamiel Niville, oprichter van Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Oprichter van Nivora',
    founderLinkedinAria: 'Kamiel op LinkedIn',
    founderEyebrow: 'De persoon erachter',
    founderHeading: 'Het verhaal achter Nivora',
    founderP1:
      'Hallo, ik ben Kamiel. Ik startte Nivora nadat ik telkens hetzelfde zag gebeuren: bedrijven kregen AI verkocht, maar bijna niemand bouwde het rond wat die bedrijven de hele dag echt doen.',
    founderP2:
      'Dus doen wij het omgekeerd. We beginnen bij het werk, vormen de software en AI eromheen, en geven mensen tools die ze echt vastpakken, allemaal op systemen die zij bezitten en beheren.',
    founderP3:
      'Of we nu iets bijschaven dat u al hebt of het van de grond af bouwen, het doel verandert nooit. Technologie die stilletjes haar werk doet, zodat u en uw team verder kunnen met het uwe.',
    founderSign: 'Oprichter, gevestigd in Brugge, België',
    ctaHeading: 'Laat ons het juiste bouwen',
    ctaBody:
      'Vertel ons waar de wrijving zit. We tonen u wat de moeite waard is om te bouwen, en wat het waard is, voordat u zich ergens aan vastlegt.',
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

/** Frosted glass card, echoing the service pages: a soft top-left highlight, a top
 *  hairline and a gentle hover lift. No brand colour, no glow. */
function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'group relative h-full overflow-hidden rounded-[22px] border border-line bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-white/[0.035] hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] lg:p-8',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_18%_-12%,rgba(255,255,255,0.06),transparent_56%)]" />
      <div className="relative">{children}</div>
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
      <ScrollStatement image={MISSION_IMG} copy={t.missionStatement} accent={ACCENT} />
      <Promises />
      <HowWeWork />
      <Founder />
      <FinalCta />
    </main>
  )
}

/* Hero · scenic, drifting on scroll ─────────────────────────────────────────── */

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
  const { open } = useContactModal()
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid min-h-[92svh] w-full place-items-center overflow-hidden px-6 pb-24 pt-32">
      {/* Scenic backdrop, drifting on scroll like the service heroes */}
      <ParallaxImage src={HERO_IMG} range={['-5%', '5%']} />
      <div className="absolute inset-0 bg-black/45" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(78% 60% at 50% 46%, rgba(0,0,0,0.5), rgba(0,0,0,0.18) 58%, transparent 80%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial={reduced ? false : 'hidden'}
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p variants={heroFade} className="mb-6 text-[12px] uppercase tracking-[0.2em] text-ink-soft/70">
          {t.heroEyebrow}
        </motion.p>

        <h1 className="font-serif text-[38px] leading-[1.08] tracking-[-0.02em] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-[52px] lg:text-[64px] lg:leading-[1.04]">
          {t.heroHeadline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] lg:text-[17px]"
        >
          {t.heroSub}
        </motion.p>

        <motion.div variants={heroFade} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BookCallButton className="h-11 px-6 text-[14px]">{t.bookCall}</BookCallButton>
          <RippleButton
            href="#contact"
            variant="ghost"
            className="h-11 px-6 text-[14px]"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            {t.getInTouch}
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* Promises · why we exist + three frosted glass cards ────────────────────────── */

function Promises() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{t.promisesEyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-[16px] leading-relaxed text-muted lg:text-[17px]">{t.promisesLead}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {t.promises.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <GlassCard>
              <span className="font-serif text-[30px] leading-none text-ink/20">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-serif text-[19px] leading-snug tracking-[-0.01em] text-ink lg:text-[20px]">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-faint">{p.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* How we work ──────────────────────────────────────────────────────────────── */

function HowWeWork() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative w-full border-t border-line px-6 py-20 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1100px]">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[44px]">
              {t.howHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-faint">{t.howSub}</p>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProcessTimeline steps={t.steps} accent={ACCENT} />
        </div>
      </div>
    </section>
  )
}

/* Founder · editorial, with a portrait that drifts on scroll ─────────────────── */

function Founder() {
  const { lang } = useLang()
  const t = COPY[lang]
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Portrait */}
        <Reveal>
          <div ref={ref} className="relative mx-auto w-full max-w-[420px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 blur-[70px]"
              style={{ background: 'radial-gradient(50% 45% at 50% 45%, rgba(245,245,245,0.06), transparent 72%)' }}
            />
            <div className="relative overflow-hidden rounded-[28px] border border-line">
              <motion.img
                src="/about/founder-kamiel.webp"
                alt={t.founderAlt}
                style={reduced ? undefined : { y }}
                className="aspect-[4/5] w-full scale-[1.06] object-cover object-[center_20%] will-change-transform"
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
          </div>
        </Reveal>

        {/* The note */}
        <div>
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{t.founderEyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-serif text-[28px] leading-[1.18] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
              {t.founderHeading}
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-relaxed text-muted lg:text-base">
            <Reveal delay={0.12}>
              <p>{t.founderP1}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>{t.founderP2}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p>{t.founderP3}</p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
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
      <div className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(72% 60% at 50% 48%, rgba(6,6,6,0.6), transparent 78%)' }}
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
