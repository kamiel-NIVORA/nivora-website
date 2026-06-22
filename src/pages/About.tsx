import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { SERVICES } from '@/lib/navigation'

/** Warm gold — the brand's signature accent, used sparingly across this page. */
const ACCENT = '#bda96d'
const ease = [0.16, 1, 0.3, 1] as const

/** Soft luminous backdrop — shared with the Services section. */
const GLOW = '/IMG_0479.JPG'
/** Aerial field photo for the mid-page atmosphere band. */
const ATMOSPHERE = '/IMG_0743.jpg'

/** Company LinkedIn (single source kept in sync with the footer). */
const LINKEDIN_URL = 'https://www.linkedin.com/company/116050071'
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

/** Per-service line icons (white glyphs), keyed by service title. */
const SERVICE_ICONS: Record<string, string> = {
  'App Design': '/icon-appdesign.png',
  'Local AI': '/icon-localai.png',
  AIOS: '/icon-aios.png',
  'AI Consulting': '/icon-consulting.png',
}

const VALUES = [
  {
    title: 'We build what helps',
    body: 'Only what genuinely moves your business forward. If something does not earn its place, it does not ship.',
  },
  {
    title: 'Value before commitment',
    body: 'You see what we can do, and the value it brings, before you pay for it. No long contracts to find out if it works.',
  },
  {
    title: 'Private by default',
    body: 'Your data stays yours. We can run AI locally, on your own servers or ours, so nothing leaves your control.',
  },
  {
    title: 'Built around you',
    body: 'We shape the software to how your team actually works, instead of forcing your work to fit the software.',
  },
]

const STEPS = [
  {
    label: '01',
    title: 'Listen',
    body: 'We start with your business, not a product pitch. We learn how you work and where the real friction is.',
  },
  {
    label: '02',
    title: 'Build',
    body: 'We design and build the system, adapting what already exists or creating it from scratch, and show you progress early.',
  },
  {
    label: '03',
    title: 'Stay',
    body: 'We do not disappear after launch. We maintain, refine, and grow the system as your business grows.',
  },
]

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
      <Founder />
      <AtmosphereBand />
      <Values />
      <HowWeWork />
      <WhatWeDo />
      <FinalCta />
    </main>
  )
}

/* Shared bits ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
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
          <p className={`mt-4 text-[15px] leading-relaxed text-faint lg:text-base ${center ? 'mx-auto max-w-xl' : ''}`}>
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

const HERO_HEADLINE = 'Technology, built around your business.'

function Hero() {
  const { open } = useContactModal()
  return (
    <section className="relative flex min-h-[88svh] w-full flex-col items-center justify-center px-6 pb-24 pt-32">
      {/* Warm accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 55% at 50% 16%, ${ACCENT}24, transparent 70%)` }}
      />
      {/* Ambient luminous wash, masked into the dark */}
      <img
        aria-hidden
        src={GLOW}
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.22] blur-[3px] [mask-image:radial-gradient(50%_50%_at_50%_42%,black_20%,transparent_78%)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

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
          Nivora designs and builds the software and AI your company actually needs. We adapt what
          already exists, or build from scratch, and we show you the value before you commit.
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
  const chips = ['Built around you', 'Value before commitment', 'Private by default']
  return (
    <section className="relative mx-auto w-full max-w-[1000px] px-6 py-16 lg:py-24">
      <Reveal>
        <p className="mx-auto max-w-3xl text-center font-serif text-[22px] leading-[1.4] tracking-[-0.01em] text-ink-soft sm:text-[26px] lg:text-[30px]">
          We believe technology should feel simple, useful, and genuinely yours. Not one more tool to
          manage, but quiet systems that give you back your time.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-faint"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {chip}
            </span>
          ))}
        </div>
      </Reveal>
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
                src="/founder-kamiel.jpg"
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
                I kept seeing the same thing. Companies were told they needed AI, but almost no one
                was building it around what those companies actually do.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                So I set out to do the opposite. Software and AI shaped around your business, not the
                other way around. Tools you can actually use, on systems you actually control.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Whether we adapt something that already exists or build it from scratch, the goal is
                always the same. Technology that quietly does its job, and gives you back your time.
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

/* Atmosphere band ──────────────────────────────────────────────────────────── */

function AtmosphereBand() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-10 lg:py-16">
      <Reveal>
        <div ref={ref} className="relative h-[300px] overflow-hidden rounded-[28px] border border-line sm:h-[380px] lg:h-[440px]">
          <motion.img src={ATMOSPHERE} alt="" style={{ y }} className="absolute inset-0 h-[116%] w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 90% at 50% 50%, transparent 30%, rgba(6,6,6,0.7) 100%)` }}
          />
          <div className="relative flex h-full items-center justify-center px-6">
            <p className="max-w-2xl text-center font-serif text-[24px] leading-[1.32] tracking-[-0.01em] text-ink sm:text-[30px] lg:text-[36px]">
              We would rather build one thing that truly helps than ten that just impress.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* Values ───────────────────────────────────────────────────────────────────── */

function Values() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="What we believe" title="The principles we build on" center />
      <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={(i % 2) * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 backdrop-blur-md transition-colors duration-300 hover:border-line-strong">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-[13px] font-mono text-ink-soft"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-ink">{v.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-faint">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* How we work ──────────────────────────────────────────────────────────────── */

function HowWeWork() {
  return (
    <section className="relative w-full px-6 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, var(--accent), transparent 70%)`, opacity: 0.07 }}
      />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <SectionHead
          eyebrow="How we work"
          title="A simple way of working that stays close to you"
          center
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="relative">
                <span className="font-serif text-[44px] leading-none text-[var(--accent)]/70">{s.label}</span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* What we do ────────────────────────────────────────────────────────────────── */

function WhatWeDo() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead
        eyebrow="What we do"
        title="Four ways we help companies move"
        intro="From a single custom app to a full operating system for your company, we build and install exactly what fits."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.07}>
            <Link
              to={s.href}
              className="group flex items-center gap-4 rounded-[18px] border border-line bg-white/[0.02] p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.04]"
            >
              {SERVICE_ICONS[s.title] && (
                <img src={SERVICE_ICONS[s.title]} alt="" className="h-9 w-9 shrink-0 object-contain" />
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-ink">{s.title}</span>
                {s.desc && <span className="block truncate text-[13px] text-faint">{s.desc}</span>}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        ))}
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
