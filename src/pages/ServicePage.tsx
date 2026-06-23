import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
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
import { RoiCalculator } from '@/components/ui/RoiCalculator'
import { ScrollStatement } from '@/components/ui/ScrollStatement'
import { ServiceIntro } from '@/components/ui/ServiceIntro'
import { ProcessTimeline } from '@/components/ui/ProcessTimeline'
import { useContactModal } from '@/components/contact/ContactModal'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { SERVICE_CONTENT } from '@/data/services'
import { SERVICE_ROI } from '@/data/serviceRoi'
import {
  SERVICE_META,
  SERVICE_ORDER,
  type ServiceContent,
  type ServiceMeta,
  type ServiceSlug,
} from '@/data/serviceContent'

const ease = [0.16, 1, 0.3, 1] as const

/** Intro keywords: name the pain, then the resolution. Short, on the nose. */
const INTRO_WORDS: Record<ServiceSlug, string[]> = {
  'app-design': ['Outgrown.', 'Rebuilt.', 'Yours.'],
  'local-ai': ['Exposed.', 'Private.', 'Yours.'],
  aios: ['Scattered.', 'Connected.', 'One.'],
  'ai-consulting': ['Hyped.', 'Proven.', 'Clear.'],
}

/** A short phase word for the process timeline, from the step title ("We listen first" → "Listen"). */
function phaseWord(title: string): string {
  const w = title.replace(/^We\s+/i, '').split(' ')[0]
  return w.charAt(0).toUpperCase() + w.slice(1)
}

/* ──────────────────────────────────────────────────────────────────────────
   Service page · scenic, image-led, home-page branding
   Flow: hero → statement → scroll-reveal → problem → solution → capabilities
        → why-us band → process → ROI (not for consulting) → fit/faq → CTA
   ────────────────────────────────────────────────────────────────────────── */
export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const isValid = !!slug && slug in SERVICE_CONTENT
  const content = isValid ? SERVICE_CONTENT[slug as ServiceSlug] : null
  const meta = isValid ? SERVICE_META[slug as ServiceSlug] : null

  useEffect(() => {
    if (content) document.title = `${content.name} · Nivora`
    return () => {
      document.title = 'Nivora'
    }
  }, [content])

  if (!content || !meta) return <Navigate to="/" replace />

  return (
    <ServiceIntro words={INTRO_WORDS[meta.slug]} accent={meta.accent}>
      <main
        className="relative w-full overflow-x-clip bg-bg"
        style={{ ['--accent' as string]: meta.accent } as CSSProperties}
      >
        <Hero content={content} meta={meta} />
        <Statement content={content} />
        <ScrollStatement image={meta.photo} copy={content.reveal} accent={meta.accent} />
        <Problem content={content} />
        <Solution content={content} meta={meta} />
        <Capabilities content={content} meta={meta} />
        <Preview meta={meta} />
        <WhyUs content={content} meta={meta} />
        <Process content={content} meta={meta} />
        <RoiBand meta={meta} />
        <FitFaq content={content} />
        <FinalCta content={content} meta={meta} />
        <OtherServices current={meta.slug} />
      </main>
    </ServiceIntro>
  )
}

/* Shared bits ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  )
}

/** A scenic photo that drifts gently against the scroll. Always covers its box. */
function ParallaxImage({
  src,
  range = ['-8%', '8%'],
  className,
}: {
  src: string
  range?: [string, string]
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], range)
  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <motion.img
        src={src}
        alt=""
        aria-hidden
        style={{ y, top: '-15%' }}
        className="absolute left-0 h-[130%] w-full object-cover"
      />
    </div>
  )
}

/** A glass card, the page's single repeated surface. */
function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[22px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 backdrop-blur-md',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      {children}
    </div>
  )
}

/** A looping animation that melts into the page. The clips are white-on-black,
 *  so mix-blend-screen drops the black and only the luminous motion reads over
 *  the dark page, its edges masked into the background (no hard box). */
function AnimFrame({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <video
        src={src}
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(72%_72%_at_50%_46%,#000_48%,transparent_92%)] [-webkit-mask-image:radial-gradient(72%_72%_at_50%_46%,#000_48%,transparent_92%)]"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}

/* Hero · scenic landscape, like the home page ───────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease } },
}

function Hero({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const { open } = useContactModal()
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid min-h-[100svh] w-full place-items-center overflow-hidden px-6 pb-24 pt-32">
      {/* Scenic landscape backdrop, drifting on scroll */}
      <ParallaxImage src={meta.heroImage} range={['-6%', '6%']} />
      {/* Overlays: darken for the nav, fade the foot into the page */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44vh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 28%, ${meta.accent}1a, transparent 66%)` }}
      />

      <motion.div
        variants={heroContainer}
        initial={reduced ? false : 'hidden'}
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade}>
          <Eyebrow>{content.hero.eyebrow}</Eyebrow>
        </motion.div>

        <h1 className="mt-6 font-serif text-[38px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[66px] lg:leading-[1.03]">
          {content.hero.headline.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.22em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={heroFade}
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft/85 lg:text-[17px]"
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
    </section>
  )
}

/* Statement ─────────────────────────────────────────────────────────────────── */

function Statement({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[920px] px-6 py-24 text-center lg:py-32">
      <Reveal>
        <p className="font-serif text-[26px] leading-[1.4] tracking-[-0.01em] text-ink-soft sm:text-[30px] lg:text-[36px]">
          {content.intro.statement}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
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

/* Problem · clean cards, no rails ───────────────────────────────────────────── */

function Problem({ content }: { content: ServiceContent }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.problem.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.problem.intro}</p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {content.problem.points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <GlassCard className="h-full">
              <span className="font-serif text-[40px] leading-none text-ink/20">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{p.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Solution · sticky media + outcomes checklist (the "sold" moment) ──────────── */

function Solution({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <Eyebrow>What we build</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {content.solution.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <AnimFrame src={meta.anim} className="mt-8 aspect-[5/4]" />
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.08}>
            <p className="text-[15.5px] leading-relaxed text-faint lg:text-base">{content.solution.body}</p>
          </Reveal>
          <div className="mt-9 rounded-[24px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 backdrop-blur-md lg:p-8">
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-faint">What you walk away with</span>
            <ul className="mt-6 flex flex-col gap-4">
              {content.solution.outcomes.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 0.07} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10">
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2.2} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">{o}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.12}>
            <BookCallButton className="mt-8 h-11 px-6 text-[14px]">Book a strategy call</BookCallButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Capabilities · offset bento (one video feature tile + varied cards) ───────── */

function Capabilities({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const items = content.capabilities.items
  // explicit lg placement so no row is three equal cards
  const place = [
    'lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-2',
    'lg:col-start-6 lg:col-span-7 lg:row-start-1',
    'lg:col-start-6 lg:col-span-4 lg:row-start-2',
    'lg:col-start-10 lg:col-span-3 lg:row-start-2',
    'lg:col-start-1 lg:col-span-6 lg:row-start-3',
    'lg:col-start-7 lg:col-span-6 lg:row-start-3',
  ]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>{content.capabilities.title}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 text-[16px] leading-relaxed text-muted lg:text-[18px]">{content.capabilities.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(170px,1fr)] lg:grid-cols-12 lg:gap-5">
        {items.map((it, i) => {
          const feature = i === 0
          return (
            <Reveal key={it.title} delay={(i % 3) * 0.06} className={cn('group', place[i])}>
              <div
                className={cn(
                  'relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line p-6 transition-colors duration-300 hover:border-line-strong',
                  feature ? 'bg-[#070709]' : 'bg-gradient-to-b from-white/[0.05] to-white/[0.015] backdrop-blur-md',
                )}
              >
                {feature && (
                  <>
                    <img
                      src={meta.photo}
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: `radial-gradient(80% 70% at 30% 20%, ${meta.accent}33, transparent 65%)` }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#070709] to-transparent" />
                  </>
                )}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="relative mt-auto">
                  <span className="font-mono text-[12px] tracking-[0.12em] text-dim">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={cn('mt-3 font-semibold tracking-tight text-ink', feature ? 'text-[20px] lg:text-[22px]' : 'text-[16px]')}>
                    {it.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{it.body}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* Why us · selling reasons over a scenic, drifting band ─────────────────────── */

function Preview({ meta }: { meta: ServiceMeta }) {
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>Preview</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            Made for the screens your team lives in.
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-[40px] blur-[64px]"
            style={{ background: meta.accent, opacity: 0.16 }}
          />
          <div className="relative overflow-hidden rounded-[20px] border border-line bg-[#070709] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <img src={meta.mockup} alt="" loading="lazy" className="block w-full" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function WhyUs({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      <ParallaxImage src={meta.photo} range={['-10%', '10%']} />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${meta.accent}14, transparent 70%)` }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Why Nivora</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
              {content.differentiators.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {content.differentiators.items.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 0.08}>
              <GlassCard className="h-full">
                <h3 className="text-[17px] font-semibold tracking-tight text-ink">{d.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{d.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Process · numbered step cards, no rails ───────────────────────────────────── */

function Process({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
            {content.process.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-16">
        <ProcessTimeline
          accent={meta.accent}
          steps={content.process.steps.map((s) => ({ phase: phaseWord(s.title), title: s.title, body: s.body }))}
        />
      </div>
    </section>
  )
}

/* ROI band · only where money-saved is the honest pitch (not consulting) ────── */

function RoiBand({ meta }: { meta: ServiceMeta }) {
  const config = SERVICE_ROI[meta.slug]
  if (!config) return null // AI Consulting sells the plan, not hours saved

  return (
    <section className="relative w-full border-y border-line py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 60% at 50% 0%, ${meta.accent}0d, transparent 70%)` }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{config.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 font-serif text-[24px] leading-[1.3] tracking-[-0.01em] text-ink sm:text-[28px] lg:text-[32px]">
              {config.framing}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Fit + FAQ · comparison two-up, then accordion ─────────────────────────────── */

function FitFaq({ content }: { content: ServiceContent }) {
  const { open } = useContactModal()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <Reveal>
        <h2 className="max-w-2xl font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">
          {content.audience.title}
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-faint">{content.audience.body}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[22px] border border-[var(--accent)]/25 bg-[var(--accent)]/[0.05] p-7">
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

      {/* FAQ */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <Reveal>
          <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">Good to know</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-faint">
            Still have a question?{' '}
            <button
              type="button"
              onClick={open}
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-soft"
            >
              reach a person
            </button>
            .
          </p>
        </Reveal>
        <div className="flex flex-col gap-3">
          {content.faq.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <Reveal key={item.q} delay={(i % 4) * 0.04}>
                <div className="overflow-hidden rounded-[18px] border border-line bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-medium text-ink">{item.q}</span>
                    <ChevronDown
                      className={cn('h-4 w-4 shrink-0 text-faint transition-transform duration-300', isOpen && 'rotate-180')}
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
      </div>
    </section>
  )
}

/* Final CTA over media ─────────────────────────────────────────────────────── */

function FinalCta({ content, meta }: { content: ServiceContent; meta: ServiceMeta }) {
  const reduced = usePrefersReducedMotion()
  return (
    <section className="relative grid w-full place-items-center overflow-hidden px-6 py-24 lg:py-36">
      <ParallaxImage src={meta.photo} range={['-8%', '8%']} />
      <div className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 80% at 50% 50%, ${meta.accent}1f, transparent 60%)` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />

      <motion.div
        initial={reduced ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true }}
        variants={heroContainer}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[52px]">
          {content.finalCta.title.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.2em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.p variants={heroFade} className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
          {content.finalCta.body}
        </motion.p>
        <motion.div variants={heroFade} className="mt-9 flex justify-center">
          <BookCallButton className="h-12 px-7 text-[15px]">{content.finalCta.button}</BookCallButton>
        </motion.div>
        <motion.p variants={heroFade} className="mt-5 text-[13px] text-dim">
          {content.finalCta.reassurance}
        </motion.p>
      </motion.div>
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
