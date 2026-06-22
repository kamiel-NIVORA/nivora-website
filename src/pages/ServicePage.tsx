import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Minus } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { SERVICE_CONTENT } from '@/data/services'
import {
  SERVICE_META,
  SERVICE_ORDER,
  type ServiceContent,
  type ServiceMeta,
  type ServiceSlug,
} from '@/data/serviceContent'

const ease = [0.16, 1, 0.3, 1] as const

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const isValid = !!slug && slug in SERVICE_CONTENT
  const content = isValid ? SERVICE_CONTENT[slug as ServiceSlug] : null
  const meta = isValid ? SERVICE_META[slug as ServiceSlug] : null

  useEffect(() => {
    if (content) document.title = `${content.name} — Nivora`
    return () => {
      document.title = 'Nivora'
    }
  }, [content])

  if (!content || !meta) return <Navigate to="/" replace />

  return (
    <main
      className="relative w-full overflow-hidden bg-bg"
      style={{ ['--accent' as string]: meta.accent } as CSSProperties}
    >
      <Hero content={content} meta={meta} />
      <IntroStrip content={content} />
      <Problem content={content} />
      <Solution content={content} />
      <AtmosphereBand content={content} meta={meta} />
      <Capabilities content={content} />
      <Process content={content} />
      <Differentiators content={content} />
      <Audience content={content} />
      <Faq content={content} />
      <FinalCta content={content} />
      <OtherServices current={meta.slug} />
    </main>
  )
}

/* Shared bits ─────────────────────────────────────────────────────────────── */

/** Small uppercase mono eyebrow with an accent dot. */
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

function Hero({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const { open } = useContactModal()
  return (
    <section className="relative flex min-h-[92svh] w-full flex-col items-center justify-center px-6 pb-24 pt-32">
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(70% 55% at 50% 18%, ${meta.accent}26, transparent 70%)`,
        }}
      />
      {/* Ambient luminous wash, unique per service, masked into the dark */}
      <img
        aria-hidden
        src={meta.heroImage}
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.20] blur-[3px] [mask-image:radial-gradient(50%_50%_at_50%_45%,black_20%,transparent_78%)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* Service mark — the rounded app-style tile from the nav menu */}
        <motion.div variants={heroFade} className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-2xl"
            style={{ background: `radial-gradient(circle, ${meta.accent}40, transparent 65%)` }}
          />
          <img
            src={meta.tile}
            alt=""
            className="h-16 w-16 rounded-[18px] border border-line object-cover shadow-[0_10px_34px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Service name — clear label, replaces the breadcrumb */}
        <motion.div variants={heroFade} className="mt-5">
          <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-faint">{content.name}</span>
        </motion.div>

        <h1 className="mt-5 font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[68px] lg:leading-[1.03]">
          {content.hero.headline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.2em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft/80 lg:text-[17px]"
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

/* Intro strip ──────────────────────────────────────────────────────────────── */

function IntroStrip({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1000px] px-6 py-16 lg:py-24">
      <Reveal>
        <p className="mx-auto max-w-3xl text-center font-serif text-[22px] leading-[1.4] tracking-[-0.01em] text-ink-soft sm:text-[26px] lg:text-[30px]">
          {content.intro.statement}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {content.intro.chips.map((chip) => (
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

/* Problem ──────────────────────────────────────────────────────────────────── */

function Problem({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="The problem" title={content.problem.title} intro={content.problem.intro} />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {content.problem.points.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <div className="flex h-full flex-col rounded-[20px] border border-line bg-white/[0.02] p-6">
              <span className="font-mono text-[12px] tracking-[0.12em] text-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Solution ─────────────────────────────────────────────────────────────────── */

function Solution({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow="What it is" title={content.solution.title} />
          <Reveal delay={0.12}>
            <p className="mt-6 text-[15.5px] leading-relaxed text-faint lg:text-base">{content.solution.body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <BookCallButton className="mt-8 h-11 px-6 text-[14px]">Book a strategy call</BookCallButton>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 backdrop-blur-md lg:p-8">
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-faint">What you walk away with</span>
            <ul className="mt-6 flex flex-col gap-4">
              {content.solution.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10">
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2.2} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Atmosphere band ──────────────────────────────────────────────────────────── */

function AtmosphereBand({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-10 lg:py-16">
      <Reveal>
        <div ref={ref} className="relative h-[300px] overflow-hidden rounded-[28px] border border-line sm:h-[380px] lg:h-[440px]">
          <motion.img
            src={meta.photo}
            alt=""
            style={{ y }}
            className="absolute inset-0 h-[116%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(120% 90% at 50% 50%, transparent 30%, rgba(6,6,6,0.7) 100%)` }}
          />
          <div className="relative flex h-full items-center justify-center px-6">
            <p className="max-w-2xl text-center font-serif text-[24px] leading-[1.32] tracking-[-0.01em] text-ink sm:text-[30px] lg:text-[36px]">
              {content.intro.statement}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* Capabilities ─────────────────────────────────────────────────────────────── */

function Capabilities({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="What's included" title={content.capabilities.title} intro={content.capabilities.intro} center />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.capabilities.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.07}>
            <div className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-6 backdrop-blur-md transition-colors duration-300 hover:border-line-strong">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-[13px] font-mono text-ink-soft"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{it.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Process ──────────────────────────────────────────────────────────────────── */

function Process({ content }: { content: ServiceContent }) {
  const cols = content.process.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <section className="relative w-full px-6 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, var(--accent), transparent 70%)`, opacity: 0.07 }}
      />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <SectionHead eyebrow="How we work" title={content.process.title} center />
        <div className={`mt-14 grid gap-8 ${cols}`}>
          {content.process.steps.map((s, i) => (
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

/* Differentiators ──────────────────────────────────────────────────────────── */

function Differentiators({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="Why Nivora" title={content.differentiators.title} />
      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {content.differentiators.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 2) * 0.08}>
            <div className="flex gap-4">
              <span className="mt-1 h-10 w-[3px] shrink-0 rounded-full bg-[var(--accent)]/70" />
              <div>
                <h3 className="text-[17px] font-semibold tracking-tight text-ink">{it.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-faint">{it.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Audience ─────────────────────────────────────────────────────────────────── */

function Audience({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="Who it's for" title={content.audience.title} intro={content.audience.body} center />
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[22px] border border-[var(--accent)]/25 bg-[var(--accent)]/[0.04] p-7">
            <h3 className="text-[15px] font-semibold text-ink">A strong fit if</h3>
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
            <h3 className="text-[15px] font-semibold text-muted">Probably not if</h3>
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
    </section>
  )
}

/* FAQ ──────────────────────────────────────────────────────────────────────── */

function Faq({ content }: { content: ServiceContent }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section className="relative mx-auto w-full max-w-[820px] px-6 py-20 lg:py-28">
      <SectionHead eyebrow="Questions" title="Good to know" center />
      <div className="mt-12 flex flex-col gap-3">
        {content.faq.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <Reveal key={item.q} delay={(i % 4) * 0.05}>
              <div className="overflow-hidden rounded-[18px] border border-line bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium text-ink">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-faint transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
    </section>
  )
}

/* Final CTA ────────────────────────────────────────────────────────────────── */

function FinalCta({ content }: { content: ServiceContent }) {
  return (
    <section className="relative w-full px-6 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 70% at 50% 50%, var(--accent), transparent 70%)`, opacity: 0.1 }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
            {content.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
            {content.finalCta.body}
          </p>
          <div className="mt-9 flex justify-center">
            <BookCallButton className="h-12 px-7 text-[15px]">{content.finalCta.button}</BookCallButton>
          </div>
          <p className="mt-5 text-[13px] text-dim">{content.finalCta.reassurance}</p>
        </div>
      </Reveal>
    </section>
  )
}

/* Other services ───────────────────────────────────────────────────────────── */

function OtherServices({ current }: { current: ServiceSlug }) {
  const others = SERVICE_ORDER.filter((s) => s !== current)
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-28">
      <div className="border-t border-line pt-14">
        <Reveal>
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-faint">Explore other services</h2>
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {others.map((slug, i) => {
            const m = SERVICE_META[slug]
            const c = SERVICE_CONTENT[slug]
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
