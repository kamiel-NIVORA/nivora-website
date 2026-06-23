import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowLeft, Gift } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'

/** Warm gold, the brand accent. Olive is reused for the "coming soon" cue. */
const ACCENT = '#bda96d'
const ease = [0.16, 1, 0.3, 1] as const

/** Home-style scenic hero, so the page lives in the same world as the rest of the site. */
const HERO_IMG = '/images/hero-nivora.png'

/** The three plain facts, modelled on a clear affiliate page but in our voice. */
const FACTS = [
  { big: '20%', label: 'of every payment from the customers you refer' },
  { big: 'Every month', label: 'you keep earning for as long as they stay' },
  { big: 'Your link', label: 'a personal link that tracks everyone you send' },
]

/** How it will work, kept to four honest steps. */
const STEPS = [
  {
    title: 'Get your personal link',
    body: 'You join the program and we hand you your own link to Box and Voice.',
  },
  {
    title: 'Share it with your people',
    body: 'Post it, send it, recommend it. Anywhere the right businesses already listen to you.',
  },
  {
    title: 'They become paying customers',
    body: 'When someone signs up through your link and starts paying, we tie it to you.',
  },
  {
    title: 'You earn 20%',
    body: 'You keep 20% of what they pay, every month they stay a customer. No cap.',
  },
]

/** The two apps the program is for. Copy matches the public, coming-soon framing. */
const APPS = [
  {
    logo: '/box-logo.png',
    name: 'Box',
    line: 'All your communication, brought together in one place.',
  },
  {
    logo: '/voice-logo.png',
    name: 'Voice',
    line: 'Speech to text, tuned to your voice and your writing.',
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export function AffiliatePage() {
  useEffect(() => {
    document.title = 'Affiliate — Nivora'
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
      <Facts />
      <HowItWorks />
      <GiftBlock />
      <Apps />
      <FinalCta />
    </main>
  )
}

/* Shared bits ─────────────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  )
}

function ComingSoonPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-faint backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
      Coming soon
    </span>
  )
}

/* Hero ──────────────────────────────────────────────────── */

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

function HeroWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
          {w}
        </motion.span>
      ))}
    </>
  )
}

function Hero() {
  const { open } = useContactModal()
  return (
    <section className="relative flex min-h-[92svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32">
      {/* Scenic image, same world as the home page */}
      <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/75 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 28%, ${ACCENT}1f, transparent 70%)` }}
      />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade} className="flex items-center gap-3">
          <Eyebrow>Affiliate program</Eyebrow>
          <ComingSoonPill />
        </motion.div>

        <h1 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[58px] lg:text-[70px] lg:leading-[1.02]">
          <span className="block">
            <HeroWords text="Share Box and Voice." />
          </span>
          <span className="mt-1 block">
            <motion.span variants={heroWord} className="mr-[0.22em] inline-block">
              Earn
            </motion.span>
            <motion.span variants={heroWord} className="inline-block text-[var(--accent)]">
              20%.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft/85 lg:text-[17px]"
        >
          When someone signs up through your personal link and becomes a paying customer, you keep
          20% of what they pay, for as long as they stay. The program is not open yet, here is how it
          will work.
        </motion.p>

        <motion.div variants={heroFade} className="mt-10">
          <RippleButton
            href="#contact"
            className="h-12 px-7 text-[15px]"
            onClick={(e) => {
              e.preventDefault()
              open()
            }}
          >
            Be the first to know
          </RippleButton>
        </motion.div>
      </motion.div>

      {/* Back link, quiet, top-left under the nav */}
      <Link
        to="/"
        className="absolute left-6 top-28 z-10 inline-flex items-center gap-1.5 text-[13px] text-ink-soft/70 transition-colors hover:text-ink lg:left-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
        Back to home
      </Link>
    </section>
  )
}

/* Facts ─────────────────────────────────────────────────── */

function Facts() {
  return (
    <section className="relative mx-auto -mt-8 w-full max-w-[1100px] px-6">
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
        {FACTS.map((f, i) => (
          <Reveal key={f.big} delay={i * 0.08}>
            <div className="h-full bg-bg px-7 py-9 text-center lg:px-8">
              <p className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink lg:text-[40px]">
                {f.big}
              </p>
              <p className="mx-auto mt-3 max-w-[15rem] text-[13.5px] leading-relaxed text-faint">{f.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* How it works ─────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section className="relative w-full px-6 py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>How it will work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-[30px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              From your link to your first payout
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* connecting line on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px lg:block"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)` }}
          />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg font-mono text-[13px] text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{s.title}</h3>
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

/* Gift ──────────────────────────────────────────────────── */

function GiftBlock() {
  return (
    <section className="relative w-full px-6 pb-4 lg:pb-8">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] border border-line">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(80% 120% at 15% 10%, ${ACCENT}26, transparent 60%)` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-16">
            {/* Copy */}
            <div>
              <Reveal>
                <Eyebrow>A little extra</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-serif text-[28px] leading-[1.16] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[42px]">
                  Your people get a gift too
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
                  It is not only about your commission. Everyone who joins through your link gets early
                  access to Box and Voice before the public. So sharing feels like giving them a head
                  start, not a sales pitch.
                </p>
              </Reveal>
            </div>

            {/* Gift card visual */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[24px] border border-line bg-bg-soft/70 p-8 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border text-[var(--accent)]"
                  style={{ borderColor: `${ACCENT}55`, background: 'rgba(189,169,109,0.10)' }}
                >
                  <Gift className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <p className="mt-6 font-serif text-[20px] leading-tight text-ink">Early access, on you</p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-faint">
                  Friends and followers who use your link skip the queue and get in first.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[12px] text-ink-soft/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  A gift worth sharing
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Apps ──────────────────────────────────────────────────── */

function Apps() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>What you will share</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-serif text-[30px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            Two apps people will actually want
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-faint lg:text-base">
            Box and Voice are launching soon. As an affiliate you will be among the first to put them
            in front of the people who need them.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {APPS.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08}>
            <div className="relative h-full overflow-hidden rounded-[24px] border border-line bg-[#0a0a0a] p-7 lg:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center gap-4">
                <img
                  src={a.logo}
                  alt={a.name}
                  className="h-12 w-12 shrink-0 rounded-2xl border border-line object-cover"
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif text-[24px] leading-none text-ink">{a.name}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
                    Coming soon
                  </span>
                </div>
              </div>
              <p className="mt-5 text-[14.5px] leading-relaxed text-faint">{a.line}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Final CTA ─────────────────────────────────────────────── */

function FinalCta() {
  const { open } = useContactModal()
  return (
    <section id="contact" className="relative w-full px-6 pb-28 pt-4 lg:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 70% at 50% 50%, var(--accent), transparent 70%)`, opacity: 0.1 }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <ComingSoonPill />
          </div>
          <h2 className="mt-6 font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
            The program opens soon
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
            We are putting the final pieces in place. Leave your details and we will reach out the
            moment you can join as an affiliate, with your link ready to share.
          </p>
          <div className="mt-9 flex justify-center">
            <RippleButton
              href="#contact"
              className="h-12 px-7 text-[15px]"
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
            >
              Be the first to know
            </RippleButton>
          </div>
          <p className="mt-5 text-[13px] text-dim">No spam. One message when affiliates can join.</p>
        </div>
      </Reveal>
    </section>
  )
}
