import { useEffect, type CSSProperties } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { ProcessTimeline, type ProcessStep } from '@/components/ui/ProcessTimeline'
import { useContactModal } from '@/components/contact/ContactModal'
import { CONTACT } from '@/data/contact'
import { useLang } from '@/i18n'

/** Neutral white accent, matching the redesigned service pages. No brand colour, no glow. */
const ACCENT = '#f5f5f5'
const ease = [0.16, 1, 0.3, 1] as const

/** Company LinkedIn (kept in sync with the footer/contact data). */
const LINKEDIN_URL = 'https://www.linkedin.com/company/116050071'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

type PromiseItem = { title: string; body: string }

const COPY = {
  en: {
    docTitle: 'About · Nivora',
    metaDescription:
      'Nivora is a software and AI studio. We build custom software and AI around how your business actually works, and we make our own products, Box and Voice.',
    heroHeadline: 'A software and AI studio, built around how you actually work.',
    heroSub:
      'Nivora designs and builds custom software and AI for companies, shaped around the way your team already works, not the other way around. And we make our own products too. Box and Voice are on the way.',
    bookCall: 'Book a call',
    getInTouch: 'Get in touch',
    missionHeading:
      'Most companies get sold AI. Very few get shown what it should actually do for them.',
    missionBody:
      'We started Nivora to work the other way around. We begin with how your business really runs, then build the software and AI that fits it. Sometimes that means adapting what you already have. Sometimes it means building from scratch. The test is always the same. Does it make the work genuinely easier.',
    promises: [
      {
        title: 'Built around you',
        body: 'We shape the software to how your team already works, instead of bending your work to fit a tool.',
      },
      {
        title: 'Value before commitment',
        body: 'You see what we can build, and what it is worth, before you pay for it. No long contract to find out if it works.',
      },
      {
        title: 'Private by default',
        body: 'Your data stays yours. We can run the AI on your servers or ours, so nothing has to leave your control.',
      },
    ] as PromiseItem[],
    howHeading: 'How we work',
    howSub: 'No heavy process. Three steps, and we stay close to you through all of them.',
    steps: [
      {
        phase: 'Listen',
        title: 'We learn how you work',
        body: 'We start with your business, not a product pitch, and find where the real friction sits.',
      },
      {
        phase: 'Build',
        title: 'We build it around you',
        body: 'We design and build the system, adapting what you already have or starting fresh, and show you progress early.',
      },
      {
        phase: 'Stay',
        title: 'We stay after launch',
        body: 'We do not disappear once it ships. We maintain it, refine it, and grow it as your business grows.',
      },
    ] as ProcessStep[],
    founderAlt: 'Kamiel Niville, founder of Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Founder of Nivora',
    founderLinkedinAria: 'Kamiel on LinkedIn',
    founderHeading: 'The story behind Nivora',
    founderP1:
      'I am Kamiel. I started Nivora because I kept seeing the same thing. Companies were being sold AI, but almost no one was building it around what those companies actually do.',
    founderP2:
      'So I started doing the opposite. We shape software and AI around the business, give people tools they can genuinely use, and keep everything on systems they control.',
    founderP3:
      'Whether we adapt something you already have or build it from scratch, the goal never changes. Technology that quietly does its job, so you can get on with yours.',
    founderSign: 'Founder, based in Brugge, Belgium',
    ctaHeading: 'Let us build the right thing',
    ctaBody:
      'Tell us where the friction is. We will show you what is worth building, and what it is worth, before you commit.',
    ctaFootPre: 'Based in Brugge, Belgium. Working with companies wherever they are. Or email ',
  },
  nl: {
    docTitle: 'Over ons · Nivora',
    metaDescription:
      'Nivora is een software- en AI-studio. We bouwen software en AI op maat, rond de manier waarop uw bedrijf echt werkt, en we maken onze eigen producten, Box en Voice.',
    heroHeadline: 'Een software- en AI-studio, gebouwd rond hoe u echt werkt.',
    heroSub:
      'Nivora ontwerpt en bouwt software en AI op maat voor bedrijven, gevormd naar de manier waarop uw team al werkt, niet andersom. En we maken ook onze eigen producten. Box en Voice zijn onderweg.',
    bookCall: 'Boek een gesprek',
    getInTouch: 'Neem contact op',
    missionHeading:
      'De meeste bedrijven krijgen AI verkocht. Maar weinigen krijgen te zien wat het echt voor hen zou moeten doen.',
    missionBody:
      'We zijn Nivora gestart om het andersom te doen. We beginnen bij hoe uw bedrijf echt draait, en bouwen daarna de software en AI die daarbij past. Soms betekent dat dat we aanpassen wat u al hebt. Soms betekent het bouwen vanaf nul. De test is altijd dezelfde. Maakt het het werk echt makkelijker.',
    promises: [
      {
        title: 'Gebouwd rond u',
        body: 'We vormen de software naar hoe uw team al werkt, in plaats van uw werk te buigen naar een tool.',
      },
      {
        title: 'Waarde vóór verbintenis',
        body: 'U ziet wat we kunnen bouwen, en wat het waard is, voordat u ervoor betaalt. Geen lang contract om te ontdekken of het werkt.',
      },
      {
        title: 'Privé vanaf de start',
        body: 'Uw data blijft van u. We kunnen de AI op uw servers of de onze draaien, zodat er niets buiten uw controle hoeft te gaan.',
      },
    ] as PromiseItem[],
    howHeading: 'Hoe we werken',
    howSub: 'Geen zwaar proces. Drie stappen, en bij alle drie blijven we dicht bij u.',
    steps: [
      {
        phase: 'Luisteren',
        title: 'We leren hoe u werkt',
        body: 'We beginnen bij uw bedrijf, niet bij een verkooppraatje, en zoeken waar de echte wrijving zit.',
      },
      {
        phase: 'Bouwen',
        title: 'We bouwen het rond u',
        body: 'We ontwerpen en bouwen het systeem, passen aan wat u al hebt of starten van nul, en laten u vroeg al vooruitgang zien.',
      },
      {
        phase: 'Blijven',
        title: 'We blijven na de lancering',
        body: 'We verdwijnen niet zodra het live staat. We onderhouden het, verfijnen het, en laten het meegroeien met uw bedrijf.',
      },
    ] as ProcessStep[],
    founderAlt: 'Kamiel Niville, oprichter van Nivora',
    founderName: 'Kamiel Niville',
    founderRole: 'Oprichter van Nivora',
    founderLinkedinAria: 'Kamiel op LinkedIn',
    founderHeading: 'Het verhaal achter Nivora',
    founderP1:
      'Ik ben Kamiel. Ik startte Nivora omdat ik telkens hetzelfde zag. Bedrijven kregen AI verkocht, maar bijna niemand bouwde het rond wat die bedrijven echt doen.',
    founderP2:
      'Dus begon ik het tegenovergestelde te doen. We vormen software en AI rond het bedrijf, geven mensen tools die ze echt kunnen gebruiken, en houden alles op systemen die zij beheren.',
    founderP3:
      'Of we nu iets aanpassen wat u al hebt of het vanaf nul bouwen, het doel verandert nooit. Technologie die stilletjes haar werk doet, zodat u verder kunt met het uwe.',
    founderSign: 'Oprichter, gevestigd in Brugge, België',
    ctaHeading: 'Laat ons het juiste bouwen',
    ctaBody:
      'Vertel ons waar de wrijving zit. We tonen u wat het waard is om te bouwen, en wat het waard is, voordat u zich vastlegt.',
    ctaFootPre: 'Gevestigd in Brugge, België. We werken met bedrijven waar ze ook zijn. Of mail ',
  },
} as const

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
      <Mission />
      <HowWeWork />
      <Founder />
      <FinalCta />
    </main>
  )
}

/* Hero ─────────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
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
  return (
    <section className="relative flex min-h-[88svh] w-full flex-col items-center justify-center px-6 pb-24 pt-32">
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <h1 className="font-serif text-[38px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[64px] lg:leading-[1.04]">
          {t.heroHeadline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-muted lg:text-[17px]"
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

      {/* Subtle scroll cue */}
      <motion.div
        variants={heroFade}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-dim"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* Mission — why we exist + the three promises ─────────────────────────────────── */

function Mission() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
      <div className="max-w-3xl">
        <Reveal>
          <h2 className="font-serif text-[28px] leading-[1.32] tracking-[-0.01em] text-ink-soft sm:text-[34px] lg:text-[40px] lg:leading-[1.3]">
            {t.missionHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-muted lg:text-base">
            {t.missionBody}
          </p>
        </Reveal>
      </div>

      {/* Three promises, a calm hairline-divided row instead of another card grid. */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
        {t.promises.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full bg-bg p-7 lg:p-8">
              <span className="font-mono text-[12px] tracking-[0.14em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-faint">{p.body}</p>
            </div>
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
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-faint">
              {t.howSub}
            </p>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProcessTimeline steps={t.steps} accent={ACCENT} />
        </div>
      </div>
    </section>
  )
}

/* Founder — the story behind Nivora ──────────────────────────────────────────── */

function Founder() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Portrait */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative overflow-hidden rounded-[28px] border border-line">
              <img
                src="/about/founder-kamiel.webp"
                alt={t.founderAlt}
                className="aspect-[4/5] w-full object-cover object-[center_22%]"
              />
              {/* Top hairline + bottom legibility gradient for the name plate */}
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
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.04] text-muted transition-colors hover:bg-white/[0.09] hover:text-ink"
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
            <h2 className="font-serif text-[28px] leading-[1.18] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
              {t.founderHeading}
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-relaxed text-muted lg:text-base">
            <Reveal delay={0.08}>
              <p>{t.founderP1}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>{t.founderP2}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{t.founderP3}</p>
            </Reveal>
          </div>

          <Reveal delay={0.26}>
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

/* Final CTA ─────────────────────────────────────────────────────────────────── */

function FinalCta() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="contact" className="relative w-full border-t border-line px-6 py-24 lg:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
            {t.ctaHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted lg:text-base">
            {t.ctaBody}
          </p>
          <div className="mt-9 flex justify-center">
            <BookCallButton className="h-12 px-7 text-[15px]">{t.bookCall}</BookCallButton>
          </div>
          <p className="mt-6 text-[13px] text-dim">
            {t.ctaFootPre}
            <a href={`mailto:${CONTACT.email}`} className="text-faint underline-offset-4 hover:text-ink hover:underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </Reveal>
    </section>
  )
}
