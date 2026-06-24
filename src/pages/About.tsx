import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { ArrowUpRight, ChevronDown, Mail } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { CONTACT } from '@/data/contact'
import { PRODUCTS, SERVICES } from '@/lib/navigation'

/** Warm gold, the brand's signature accent, used sparingly across this page. */
const ACCENT = '#bda96d'
const ease = [0.16, 1, 0.3, 1] as const

/** Company LinkedIn (single source kept in sync with the footer). */
const LINKEDIN_URL = 'https://www.linkedin.com/company/116050071'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

/** Per-service line icons (white glyphs), keyed by service title. */
const SERVICE_ICONS: Record<string, string> = {
  'App Design': '/services/icon-appdesign.png',
  'Local AI': '/services/icon-localai.png',
  AIOS: '/services/icon-aios.png',
  'AI Consulting': '/services/icon-consulting.png',
}

/** The three promises we make to every client. They tie products and services together. */
const PILLARS = [
  {
    title: 'Built around you',
    body: 'We shape the software to how your team already works, instead of bending your work to fit the tool.',
  },
  {
    title: 'Value before commitment',
    body: 'You see what we can build, and the value it brings, before you pay for it. No long contract to find out if it works.',
  },
  {
    title: 'Private by default',
    body: 'Your data stays yours. We can run AI locally, on your servers or ours, so nothing leaves your control.',
  },
]

/** Our way of working, kept deliberately short. */
const STEPS = [
  {
    label: '01',
    title: 'Listen',
    body: 'We start with your business, not a product pitch. We learn how you work and where the real friction sits.',
  },
  {
    label: '02',
    title: 'Build',
    body: 'We design and build the system, adapting what you already have or starting fresh, and show you progress early.',
  },
  {
    label: '03',
    title: 'Stay',
    body: 'We do not disappear after launch. We maintain, refine, and grow the system as your business grows.',
  },
]

/** What it is like to be on the team, said plainly. */
const TEAM_PERKS = [
  'Real ownership from day one',
  'A warm, honest team',
  'A product people genuinely want',
]

/** Friendly placeholder avatars for the join section (no stock faces, just warm marks). */
const AVATARS = [
  { initials: 'KN', from: '#d7cb94', to: '#7a6243' },
  { initials: 'NW', from: '#6691a3', to: '#2b3a42' },
  { initials: 'AI', from: '#96a766', to: '#3a4427' },
]

const JOIN_MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  'I would love to join Nivora',
)}&body=${encodeURIComponent(
  'Hi Kamiel,\n\nI came across the Nivora site and I would love to talk about joining the team.\n\nA little about me:\n',
)}`

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function About() {
  useEffect(() => {
    document.title = 'About — Nivora'
    return () => {
      document.title = 'Nivora'
    }
  }, [])

  return (
    <main
      className="relative w-full overflow-hidden bg-bg"
      style={{ ['--accent' as string]: ACCENT } as CSSProperties}
    >
      <Hero />
      <Mission />
      <TwoWays />
      <Founder />
      <BeliefMoment />
      <HowWeWork />
      <JoinTeam />
      <FinalCta />
    </main>
  )
}

/* Shared bits ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  )
}

function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <div className={center ? 'flex justify-center' : ''}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-serif text-[30px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-[15px] leading-relaxed text-faint lg:text-base ${
              center ? 'mx-auto max-w-xl' : ''
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* Hero ─────────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease } },
}

const HERO_HEADLINE = 'We build the technology your business actually needs.'

function Hero() {
  const { open } = useContactModal()
  return (
    <section className="relative flex min-h-[90svh] w-full flex-col items-center justify-center px-6 pb-24 pt-32">
      {/* Pure light, no photo. A warm gold wash from the top, cooling into the dark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(72% 56% at 50% 12%, ${ACCENT}26, transparent 68%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 40% at 50% 92%, rgba(102,145,163,0.10), transparent 70%)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade}>
          <Eyebrow>About Nivora</Eyebrow>
        </motion.div>

        <h1 className="mt-6 font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[68px] lg:leading-[1.03]">
          {HERO_HEADLINE.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.2em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft/80 lg:text-[17px]"
        >
          Nivora is a software and AI studio. We design tools around the way your company really
          works, adapt what you already have or build it from scratch, and show you the value before
          you ever commit.
        </motion.p>

        <motion.div variants={heroFade} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BookCallButton className="h-11 px-6 text-[14px]">Book a strategy call</BookCallButton>
          <RippleButton
            href="#contact"
            variant="ghost"
            className="h-11 px-6 text-[14px]"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            Get in touch
          </RippleButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
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

/* Mission ──────────────────────────────────────────────────────────────────── */

function Mission() {
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>Why we exist</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 font-serif text-[24px] leading-[1.4] tracking-[-0.01em] text-ink-soft sm:text-[28px] lg:text-[32px]">
            We believe technology should feel simple, useful, and genuinely yours. Not one more tool
            to manage, but quiet systems that give you back your time.
          </p>
        </Reveal>
      </div>

      {/* Three promises, laid out as a calm row instead of another card grid. */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full bg-bg p-7 lg:p-8">
              <span className="font-mono text-[12px] tracking-[0.14em] text-[var(--accent)]/80">
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

/* Two ways to work with us ──────────────────────────────────────────────────── */

function ComingSoon() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
      Coming soon
    </span>
  )
}

function GlassPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] p-7 backdrop-blur-md lg:p-9">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_-10%,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  )
}

function TwoWays() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead
        eyebrow="How Nivora helps"
        title="Two ways to work with us"
        intro="Use the software we build, or have us build exactly what your business needs. Either way, it is shaped around you."
        center
      />

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
        {/* Use what we build */}
        <Reveal className="min-w-0">
          <GlassPanel>
            <span className="label-mono">Our products</span>
            <h3 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">
              Use what we build
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-faint">
              Software made by Nivora, ready to use from day one. Pick the tool that fits your
              workflow and start right away. Our first products are on the way.
            </p>

            <div className="mt-6 flex flex-1 flex-col gap-3">
              {PRODUCTS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-white/[0.02] p-3.5"
                >
                  {p.img && (
                    <img
                      src={p.img}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-xl border border-line object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-medium text-ink">{p.title}</span>
                      {p.comingSoon && <ComingSoon />}
                    </div>
                    {p.desc && <p className="mt-0.5 truncate text-[13px] text-faint">{p.desc}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <RippleButton variant="solid" href="/waitlist" className="h-11 px-5 text-sm">
                Join the waiting list
              </RippleButton>
            </div>
          </GlassPanel>
        </Reveal>

        {/* Have us build it */}
        <Reveal delay={0.08} className="min-w-0">
          <GlassPanel>
            <span className="label-mono">Our services</span>
            <h3 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">
              Have us build it
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-faint">
              Bring us the challenge. We design, build, and install exactly what your business needs,
              from a single custom app to a complete AI operating system.
            </p>

            <div className="mt-6 flex flex-1 flex-col gap-2.5">
              {SERVICES.map((s) => (
                <Link
                  key={s.title}
                  to={s.href}
                  className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.04]"
                >
                  {SERVICE_ICONS[s.title] && (
                    <img src={SERVICE_ICONS[s.title]} alt="" className="h-8 w-8 shrink-0 object-contain" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium text-ink">{s.title}</span>
                    {s.desc && <span className="block truncate text-[13px] text-faint">{s.desc}</span>}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  )
}

/* Founder ──────────────────────────────────────────────────────────────────── */

function Founder() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Portrait */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px]">
            {/* Soft warm glow behind the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-2xl"
              style={{ background: `radial-gradient(60% 60% at 50% 40%, ${ACCENT}33, transparent 70%)` }}
            />
            <div className="relative overflow-hidden rounded-[28px] border border-line">
              <img
                src="/about/founder-kamiel.webp"
                alt="Kamiel Niville, founder of Nivora"
                className="aspect-[4/5] w-full object-cover object-[center_22%]"
              />
              {/* Top hairline + bottom legibility gradient */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Name plate */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-black/40 px-4 py-3 backdrop-blur-md">
                <div className="min-w-0">
                  <p className="font-serif text-[18px] leading-tight text-ink">Kamiel Niville</p>
                  <p className="mt-0.5 text-[12px] text-faint">Founder of Nivora</p>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kamiel on LinkedIn"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.04] text-ink-soft/70 transition-colors hover:bg-white/[0.09] hover:text-ink"
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
            <Eyebrow>A note from the founder</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-[28px] leading-[1.18] tracking-[-0.01em] text-ink sm:text-[34px] lg:text-[40px]">
              Why I started Nivora
            </h2>
          </Reveal>

          <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-relaxed text-faint lg:text-base">
            <Reveal delay={0.1}>
              <p>
                I kept seeing the same thing. Companies were being sold AI, but almost no one was
                building it around what those companies actually do.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                So I started Nivora to do the opposite. We shape software and AI around your
                business, give you tools you can genuinely use, and keep them on systems you control.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Whether we adapt something you already have or build it from scratch, the goal never
                changes. Technology that quietly does its job, and gives you back your time.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="font-serif text-[24px] italic leading-none text-ink/90">Kamiel Niville</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Based in Belgium, working worldwide
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Belief moment — a scroll-driven line, no photo, just light ─────────────────── */

const BELIEF = 'We would rather build one thing that truly helps than ten that only impress.'

function BeliefMoment() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.35'] })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.0005 })

  const words = BELIEF.split(' ')
  const start = 0.0
  const end = 0.92
  const step = (end - start) / words.length

  return (
    <section className="relative w-full px-6 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 55% at 50% 50%, ${ACCENT}1f, transparent 72%)` }}
      />
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <p className="flex flex-wrap justify-center text-center font-serif text-[28px] leading-[1.34] tracking-[-0.01em] sm:text-[36px] lg:text-[46px] lg:leading-[1.28]">
          {words.map((word, i) => {
            const wStart = start + i * step
            return (
              <Word key={i} progress={progress} range={[wStart, wStart + step]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.24, 1])
  return (
    <span className="mx-[0.2em] my-[0.05em]">
      <motion.span style={{ opacity }} className="text-[#ece6d8]">
        {children}
      </motion.span>
    </span>
  )
}

/* How we work ──────────────────────────────────────────────────────────────── */

function HowWeWork() {
  return (
    <section className="relative w-full px-6 py-20 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <SectionHead
          eyebrow="How we work"
          title="A simple way of working that stays close to you"
          center
        />
        <div className="relative mt-16">
          {/* The line that connects the three steps on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px lg:block"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)` }}
          />
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="relative">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg font-mono text-[13px] text-[var(--accent)]">
                    {s.label}
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Join the team — warm, human, for the people who sell Nivora ─────────────────── */

function JoinTeam() {
  return (
    <section className="relative w-full px-6 py-20 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] border border-line">
          {/* Warm light, dialed up here so this section feels like the warmest room in the house */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(80% 110% at 18% 12%, ${ACCENT}24, transparent 60%)` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-16">
            {/* Copy */}
            <div>
              <Reveal>
                <Eyebrow>Join Nivora</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-serif text-[30px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
                  Good people, selling something they believe in
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
                  We are growing, and we are looking for warm, driven sales people who love talking to
                  businesses and helping them see what is possible. You would be working closely with
                  me, on a product we are proud of, with the room to make it your own.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {TEAM_PERKS.map((perk) => (
                    <li
                      key={perk}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-ink-soft/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <RippleButton href={JOIN_MAILTO} variant="solid" className="h-11 gap-2 px-5 text-sm">
                    <Mail className="h-4 w-4" />
                    Email Kamiel
                  </RippleButton>
                  <RippleButton
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    className="h-11 px-5 text-sm"
                  >
                    Connect on LinkedIn
                  </RippleButton>
                </div>
              </Reveal>
            </div>

            {/* Warm visual: a little team, with a seat saved for you */}
            <Reveal delay={0.1}>
              <div className="relative rounded-[24px] border border-line bg-bg-soft/60 p-8 backdrop-blur-sm">
                <div className="flex items-center">
                  {AVATARS.map((a, i) => (
                    <span
                      key={a.initials}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-bg-soft font-mono text-[13px] font-medium text-black/70"
                      style={{
                        marginLeft: i === 0 ? 0 : -14,
                        background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                      }}
                    >
                      {a.initials}
                    </span>
                  ))}
                  {/* The open seat */}
                  <span
                    className="ml-[-14px] flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed text-[12px] font-medium text-[var(--accent)]"
                    style={{ borderColor: `${ACCENT}80`, background: 'rgba(189,169,109,0.06)' }}
                  >
                    + you
                  </span>
                </div>

                <p className="mt-6 font-serif text-[19px] leading-[1.45] text-ink-soft">
                  We hire for warmth and honesty first. The rest we will figure out together.
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-faint">
                  No stiff process, no endless rounds. A real conversation, and a fair shot to show
                  what you are good at.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Final CTA ─────────────────────────────────────────────────────────────────── */

function FinalCta() {
  return (
    <section id="contact" className="relative w-full px-6 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 70% at 50% 50%, var(--accent), transparent 70%)`, opacity: 0.1 }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
            Let us build something that lasts
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
            Tell us where the friction is. We will show you what is possible, and the value, before
            you commit.
          </p>
          <div className="mt-9 flex justify-center">
            <BookCallButton className="h-12 px-7 text-[15px]">Book a strategy call</BookCallButton>
          </div>
          <p className="mt-5 text-[13px] text-dim">A real conversation. No pressure, no jargon.</p>
        </div>
      </Reveal>
    </section>
  )
}
