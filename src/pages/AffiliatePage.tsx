import { useEffect, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowDown, Gift } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'

const ease = [0.16, 1, 0.3, 1] as const

/* Line-art renders that keep the whole page in one quiet, monochrome world. */
const PEAK_IMG = '/affiliate/peak.webp' // hero, drawn mountain
const WAVES_IMG = '/affiliate/waves.webp' // closing call to action
const TOPO_IMG = '/affiliate/topo.webp' // faint texture behind the steps
const LOOP_GIF = '/affiliate/loop.gif' // animated ribbon, the gift visual

/** The three plain facts, in our voice. */
const FACTS = [
  { big: '20%', label: 'of every payment from the customers you refer' },
  { big: 'Every month', label: 'you keep earning for as long as they stay' },
  { big: 'Your link', label: 'a personal link that tracks everyone you send' },
]

/** How it will work, four honest steps. */
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
    title: 'They become customers',
    body: 'When someone signs up through your link and starts paying, we tie it to you.',
  },
  {
    title: 'You earn 20%',
    body: 'You keep 20% of what they pay, every month they stay a customer. No cap.',
  },
]

/** The two apps the program is for. */
const APPS = [
  {
    logo: '/products/box-logo.webp',
    name: 'Box',
    line: 'All your communication, brought together in one place.',
  },
  {
    logo: '/products/voice-logo.webp',
    name: 'Voice',
    line: 'Speech to text, tuned to your voice and your writing.',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function AffiliatePage() {
  useEffect(() => {
    document.title = 'Affiliate — Nivora'
    return () => {
      document.title = 'Nivora'
    }
  }, [])

  return (
    <main className="relative w-full overflow-hidden bg-bg">
      <Hero />
      <Facts />
      <HowItWorks />
      <GiftBlock />
      <Apps />
      <FinalCta />
    </main>
  )
}

/* ── Shared ──────────────────────────────────────────────────────────────── */

/** One quiet marker, used as a section opener. A soft pulse, no rules or lines. */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[13px] text-faint">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
      </span>
      {children}
    </span>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
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
    <section className="relative flex min-h-[94svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-32">
      {/* Drawn mountain, sitting a touch high so the summit breathes */}
      <img
        src={PEAK_IMG}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[50%_38%] opacity-90"
      />
      {/* Even darken so the line art reads but the type stays crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/80" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 56%, rgba(0,0,0,0.55), transparent 80%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-bg via-bg/80 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[12.5px] text-ink/90 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Affiliate program
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-faint">Coming soon</span>
          </span>
        </motion.div>

        <h1 className="mt-7 font-serif text-[42px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[60px] lg:text-[74px] lg:leading-[1.01]">
          <span className="block">
            <HeroWords text="Share Box and Voice." />
          </span>
          <span className="mt-1 block">
            <HeroWords text="Earn 20%." />
          </span>
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/80 lg:text-[17px]"
        >
          When someone signs up through your personal link and becomes a paying customer, you keep
          20% of what they pay, for as long as they stay. The program is not open yet. Here is how it
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

        {/* The arrow lives under the button, a calm cue to read on */}
        <motion.a
          variants={heroFade}
          href="#how"
          aria-label="See how it works"
          className="group mt-12 flex flex-col items-center gap-3 text-faint transition-colors hover:text-ink"
        >
          <span className="text-[12px] tracking-wide">See how it works</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-md transition-colors group-hover:border-white/30">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-4 w-4" strokeWidth={1.6} />
            </motion.span>
          </span>
        </motion.a>
      </motion.div>
    </section>
  )
}

/* ── Facts ───────────────────────────────────────────────────────────────── */

function Facts() {
  return (
    <section className="relative z-10 mx-auto -mt-10 w-full max-w-[1080px] px-6">
      <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
        {FACTS.map((f, i) => (
          <Reveal key={f.big} delay={i * 0.08} y={16}>
            <div className="h-full bg-bg-soft px-7 py-10 text-center lg:px-8">
              <p className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink lg:text-[42px]">
                {f.big}
              </p>
              <p className="mx-auto mt-3.5 max-w-[15rem] text-[13.5px] leading-relaxed text-faint">
                {f.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── How it works ────────────────────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section id="how" className="relative w-full scroll-mt-24 px-6 py-28 lg:py-36">
      {/* Faint topographic texture, just enough to feel designed */}
      <img
        src={TOPO_IMG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal y={16}>
            <div className="flex justify-center">
              <Kicker>How it will work</Kicker>
            </div>
          </Reveal>
          <Reveal delay={0.06} y={16}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
              From your link to your first payout
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} y={16}>
                <div className="relative">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg font-mono text-[13px] text-ink-soft">
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

/* ── Gift ────────────────────────────────────────────────────────────────── */

function GiftBlock() {
  return (
    <section className="relative w-full px-6 pb-8 lg:pb-12">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:p-16">
            {/* Copy */}
            <div className="order-2 lg:order-1">
              <Reveal y={16}>
                <Kicker>A little extra</Kicker>
              </Reveal>
              <Reveal delay={0.06} y={16}>
                <h2 className="mt-5 font-serif text-[28px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[44px]">
                  Your people get a gift too
                </h2>
              </Reveal>
              <Reveal delay={0.12} y={16}>
                <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
                  It is not only about your commission. Everyone who joins through your link gets
                  early access to Box and Voice before the public. So sharing feels like giving them
                  a head start, not a sales pitch.
                </p>
              </Reveal>
              <Reveal delay={0.18} y={16}>
                <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
                    <Gift className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="text-[14px] text-ink-soft">
                    Early access for everyone you invite. A gift worth sharing.
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Animated ribbon, sitting in its own pool of light */}
            <Reveal delay={0.1} y={16} className="order-1 lg:order-2">
              <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.08), transparent 70%)' }}
                />
                <img
                  src={LOOP_GIF}
                  alt="An endless ribbon, passed from one hand to the next"
                  className="relative h-full w-full object-contain mix-blend-screen"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Apps ────────────────────────────────────────────────────────────────── */

function Apps() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal y={16}>
          <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[46px]">
            Two apps people will actually want
          </h2>
        </Reveal>
        <Reveal delay={0.06} y={16}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint lg:text-base">
            Box and Voice are launching soon. As an affiliate you will be among the first to put them
            in front of the people who need them.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {APPS.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08} y={16}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-[#0a0a0a] p-7 lg:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center gap-4">
                <img
                  src={a.logo}
                  alt={a.name}
                  className="h-12 w-12 shrink-0 rounded-2xl border border-line object-cover"
                />
                <span className="font-serif text-[24px] leading-none text-ink">{a.name}</span>
              </div>
              <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-faint">{a.line}</p>
              <div className="mt-6">
                <RippleButton
                  href={`/waitlist?product=${a.name.toLowerCase()}`}
                  variant="ghost"
                  className="h-10 gap-2 px-5 text-sm"
                >
                  Join the waiting list
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </RippleButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Final CTA ───────────────────────────────────────────────────────────── */

function FinalCta() {
  const { open } = useContactModal()
  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 pb-32 pt-12 lg:pb-40">
      {/* Flowing line art, anchoring the close */}
      <img
        src={WAVES_IMG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%] w-full object-cover object-bottom opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg/90" />

      <Reveal y={16}>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:text-[54px]">
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
