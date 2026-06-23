import { useEffect, type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Gift } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'

const ease = [0.16, 1, 0.3, 1] as const

/** Full-bleed scenic peak, so the page lives in the same world as the home page. */
const HERO_IMG = '/IMG_0694.JPG'

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

/* Shared bits — monochrome, separators instead of colour ────────────────────── */

function Eyebrow({ children, bright }: { children: ReactNode; bright?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] ${
        bright ? 'text-ink-soft/85' : 'text-faint'
      }`}
    >
      <span className={`h-px w-6 ${bright ? 'bg-white/45' : 'bg-white/25'}`} />
      {children}
    </span>
  )
}

/** Single, clear "coming soon" marker. Only used in the hero. */
function ComingSoonPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3.5 py-1.5 text-[12.5px] font-medium text-ink backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      Coming soon
    </span>
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
      {/* Scenic peak, framed a little lower so the sharp summit sits up out of view */}
      <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-[50%_72%]" />
      {/* Vertical darken: lighter over the mountain up top, heavier toward the text below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/70" />
      {/* Soft scrim right behind the headline for crisp white type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 48% at 50% 50%, rgba(0,0,0,0.5), transparent 78%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/75 to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade} className="flex flex-wrap items-center justify-center gap-3">
          <Eyebrow bright>Affiliate program</Eyebrow>
          <ComingSoonPill />
        </motion.div>

        <h1 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[58px] lg:text-[70px] lg:leading-[1.02]">
          <span className="block">
            <HeroWords text="Share Box and Voice." />
          </span>
          <span className="mt-1 block">
            <HeroWords text="Earn 20%." />
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
    </section>
  )
}

/* Facts ─────────────────────────────────────────────────────────────────────── */

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

/* How it works ──────────────────────────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section className="relative w-full px-6 py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>How it will work</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-[30px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              From your link to your first payout
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* connecting line on desktop, neutral */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block"
          />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
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

/* Gift ───────────────────────────────────────────────────────────────────────── */

function GiftBlock() {
  return (
    <section className="relative w-full px-6 pb-4 lg:pb-8">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

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

            {/* Gift card visual, monochrome */}
            <Reveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[24px] border border-line bg-bg-soft/70 p-8 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white/[0.04] text-ink-soft">
                  <Gift className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <p className="mt-6 font-serif text-[20px] leading-tight text-ink">Early access, on you</p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-faint">
                  Friends and followers who use your link skip the queue and get in first.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[12px] text-ink-soft/80">
                  <span className="h-px w-4 bg-white/30" />
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

/* Apps ───────────────────────────────────────────────────────────────────────── */

function Apps() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow>What you will share</Eyebrow>
          </div>
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

/* Final CTA ─────────────────────────────────────────────────────────────────── */

function FinalCta() {
  const { open } = useContactModal()
  return (
    <section id="contact" className="relative w-full px-6 pb-28 pt-4 lg:pb-36">
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
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
