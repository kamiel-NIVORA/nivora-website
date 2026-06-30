import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { useLang, type Lang } from '@/i18n'

/**
 * JourneyTimeline — a premium, alternating photo/text "how it works" timeline for
 * the Local AI service page. Rows zig-zag (illustration left, then right), a single
 * vertical line runs down the centre and fills with scroll, a glowing head rides the
 * progress, and each card lights up as it reaches the middle of the viewport. The
 * "photos" are self-contained CSS/SVG illustrations (no external assets), abstract
 * and monochrome to match the page's Ethereal-Glass language.
 *
 * Mobile collapses to a clean left-rail stack. Honours prefers-reduced-motion by
 * showing the fully-drawn, fully-lit end state with no looping motion.
 */

const ease = [0.16, 1, 0.3, 1] as const

type Illustration = 'converge' | 'server' | 'learn' | 'app'
type Step = { title: string; body: string; art: Illustration }

const COPY: Record<Lang, { title: string; subtitle: string; steps: Step[] }> = {
  en: {
    title: 'From your own server to your own AI',
    subtitle:
      "We don't just drop in a model. We build a complete intelligence of your own, shaped around how you work and entirely within your own walls.",
    steps: [
      {
        art: 'converge',
        title: 'We look at what you need',
        body: 'Which data matters, which tasks eat the most time today, and how many people will work with it. That decides what kind of system fits you, not the other way around. A small team needs something very different from a large one.',
      },
      {
        art: 'server',
        title: 'We put the AI in your hands',
        body: "The intelligence runs on your own server, in your own building. No connection to anyone else's servers, no data going out. We handle the hardware and make sure everything stands exactly as it should.",
      },
      {
        art: 'learn',
        title: 'We let it get to know your business',
        body: 'This is where it truly becomes yours. The AI learns from your own documents, your own way of working, your own data. You get no generic AI but one that understands your business, and that knowledge stays inside.',
      },
      {
        art: 'app',
        title: 'We build the apps around it',
        body: 'An AI on its own does nothing yet. We build the applications your people actually work with. Pulling up documents and emails, asking questions about your own data, work that just happens. All through your own AI, nothing through the outside.',
      },
    ],
  },
  nl: {
    title: 'Van je eigen server tot je eigen AI',
    subtitle:
      'We zetten niet zomaar een model neer. We bouwen een complete eigen intelligentie, op maat van hoe jij werkt en volledig binnen je eigen muren.',
    steps: [
      {
        art: 'converge',
        title: 'We kijken wat je nodig hebt',
        body: 'Welke data telt, welke taken kosten nu het meeste tijd, en hoeveel mensen gaan ermee werken. Dat bepaalt wat voor systeem bij je past, niet andersom. Een klein team heeft iets heel anders nodig dan een groot.',
      },
      {
        art: 'server',
        title: 'We zetten de AI bij jou neer',
        body: 'De intelligentie komt op je eigen server, in je eigen gebouw. Geen verbinding met servers van iemand anders, geen data die naar buiten gaat. Wij regelen de hardware en zorgen dat alles staat zoals het hoort.',
      },
      {
        art: 'learn',
        title: 'We laten hem jouw bedrijf leren kennen',
        body: 'Dit is waar het echt van jou wordt. De AI leert van je eigen documenten, je eigen manier van werken, je eigen data. Zo krijg je geen algemene AI maar een die jouw bedrijf begrijpt, en die kennis blijft binnen.',
      },
      {
        art: 'app',
        title: 'We bouwen de apps eromheen',
        body: 'Een AI op zich doet nog niks. Wij bouwen de toepassingen waarmee je mensen er echt mee werken. Documenten en e-mails ophalen, vragen stellen over je eigen data, werk dat vanzelf gebeurt. Alles via je eigen AI, niets via buiten.',
      },
    ],
  },
}

/* ── Illustrations ──────────────────────────────────────────────────────────
   Abstract, monochrome SVG scenes. Each takes `active` to brighten as its row
   reaches the centre of the viewport. Looping micro-motion is gated behind
   prefers-reduced-motion. ─────────────────────────────────────────────────── */

function ConvergeArt({ active }: { active: boolean }) {
  const sources = [54, 110, 166, 222]
  return (
    <svg viewBox="0 0 360 276" fill="none" className="w-full max-w-[330px] text-ink">
      {sources.map((y, i) => (
        <motion.path
          key={`c${i}`}
          d={`M70 ${y} C 142 ${y}, 150 138, 214 138`}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeOpacity={active ? 0.5 : 0.28}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
        />
      ))}
      {sources.map((y, i) => (
        <g key={`s${i}`}>
          <rect x={40} y={y - 13} width={30} height={26} rx={7} stroke="currentColor" strokeWidth={1.4} strokeOpacity={0.5} fill="#0c0c0e" />
          <rect x={47} y={y - 4} width={16} height={2.4} rx={1.2} fill="currentColor" fillOpacity={0.5} />
        </g>
      ))}
      <g>
        <rect x={214} y={94} width={106} height={88} rx={14} stroke="currentColor" strokeWidth={1.6} strokeOpacity={active ? 0.85 : 0.5} fill="#0d0d10" />
        <rect x={232} y={116} width={54} height={4} rx={2} fill="currentColor" fillOpacity={active ? 0.8 : 0.45} />
        <rect x={232} y={132} width={72} height={4} rx={2} fill="currentColor" fillOpacity={active ? 0.55 : 0.3} />
        <rect x={232} y={148} width={42} height={4} rx={2} fill="currentColor" fillOpacity={active ? 0.4 : 0.22} />
      </g>
    </svg>
  )
}

function ServerArt({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()
  const play = active && !reduced
  return (
    <svg viewBox="0 0 360 276" fill="none" className="w-full max-w-[330px] text-ink">
      {/* clear boundary around what stays inside */}
      <rect x={40} y={36} width={280} height={204} rx={18} stroke="currentColor" strokeWidth={1.4} strokeOpacity={active ? 0.55 : 0.3} strokeDasharray="2 9" strokeLinecap="round" />
      {[[58, 54], [302, 54], [58, 222], [302, 222]].map(([cx, cy], i) => (
        <g key={`x${i}`} stroke="currentColor" strokeOpacity={active ? 0.7 : 0.4} strokeWidth={1.3} strokeLinecap="round">
          <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} />
          <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
        </g>
      ))}
      {/* the server, standing inside */}
      <rect x={138} y={84} width={84} height={108} rx={12} stroke="currentColor" strokeWidth={1.6} strokeOpacity={active ? 0.85 : 0.55} fill="#0d0d10" />
      {[104, 128, 152].map((y, i) => (
        <g key={`r${i}`}>
          <rect x={150} y={y} width={42} height={4} rx={2} fill="currentColor" fillOpacity={0.4} />
          <motion.circle
            cx={206}
            cy={y + 2}
            r={2.6}
            fill="currentColor"
            initial={false}
            animate={play ? { opacity: [0.3, 1, 0.3] } : { opacity: active ? 0.7 : 0.4 }}
            transition={play ? { duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' } : { duration: 0 }}
          />
        </g>
      ))}
      <rect x={150} y={172} width={26} height={5} rx={2.5} fill="currentColor" fillOpacity={active ? 0.8 : 0.5} />
    </svg>
  )
}

function LearnArt({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()
  const play = active && !reduced
  return (
    <svg viewBox="0 0 360 276" fill="none" className="w-full max-w-[330px] text-ink">
      {[46, 34, 22].map((r, i) => (
        <circle key={`g${i}`} cx={180} cy={138} r={r} stroke="currentColor" strokeWidth={1.5} strokeOpacity={active ? 0.7 - i * 0.1 : 0.4 - i * 0.08} />
      ))}
      <circle cx={180} cy={138} r={8} fill="currentColor" fillOpacity={active ? 0.92 : 0.55} />
      {[0, 1, 2, 3].map((i) => {
        const fromLeft = i % 2 === 0
        const y = 96 + i * 24
        const startX = fromLeft ? 38 : 322
        const endX = fromLeft ? 150 : 210
        return (
          <motion.circle
            key={`p${i}`}
            r={3}
            cy={y}
            fill="currentColor"
            initial={{ cx: startX, opacity: 0 }}
            animate={play ? { cx: [startX, endX], opacity: [0, 1, 0] } : { cx: (startX + endX) / 2, opacity: 0.5 }}
            transition={play ? { duration: 2, repeat: Infinity, delay: i * 0.45, ease: 'easeIn' } : { duration: 0 }}
          />
        )
      })}
    </svg>
  )
}

function AppArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 360 276" fill="none" className="w-full max-w-[320px] text-ink">
      <rect x={70} y={40} width={220} height={196} rx={16} stroke="currentColor" strokeWidth={1.5} strokeOpacity={active ? 0.7 : 0.45} fill="#0d0d10" />
      <line x1={70} y1={70} x2={290} y2={70} stroke="currentColor" strokeWidth={1.2} strokeOpacity={0.28} />
      {[86, 98, 110].map((cx) => (
        <circle key={`d${cx}`} cx={cx} cy={55} r={2.6} fill="currentColor" fillOpacity={0.4} />
      ))}
      {/* the question */}
      <rect x={92} y={92} width={120} height={26} rx={13} stroke="currentColor" strokeWidth={1.3} strokeOpacity={0.4} />
      <rect x={106} y={103} width={68} height={4} rx={2} fill="currentColor" fillOpacity={0.45} />
      {/* the right document, returned */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <rect x={146} y={140} width={122} height={74} rx={12} stroke="currentColor" strokeWidth={1.5} strokeOpacity={active ? 0.85 : 0.55} fill="#101015" />
        <path
          d="M168 156 h18 l10 10 v26 a4 4 0 0 1 -4 4 h-24 a4 4 0 0 1 -4 -4 v-32 a4 4 0 0 1 4 -4 z"
          stroke="currentColor"
          strokeWidth={1.3}
          strokeOpacity={active ? 0.7 : 0.5}
          fill="none"
        />
        <line x1={170} y1={196} x2={190} y2={196} stroke="currentColor" strokeWidth={1.2} strokeOpacity={0.45} />
        <rect x={212} y={158} width={44} height={4} rx={2} fill="currentColor" fillOpacity={active ? 0.7 : 0.4} />
        <rect x={212} y={172} width={36} height={4} rx={2} fill="currentColor" fillOpacity={0.4} />
        <rect x={212} y={186} width={40} height={4} rx={2} fill="currentColor" fillOpacity={0.3} />
      </motion.g>
    </svg>
  )
}

function Illustration({ art, active }: { art: Illustration; active: boolean }) {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ background: 'radial-gradient(60% 60% at 50% 46%, rgba(245,245,245,0.10), transparent 70%)', opacity: active ? 1 : 0.35 }}
      />
      <div className={cn('relative grid h-full w-full place-items-center p-7 transition-opacity duration-500 sm:p-9', active ? 'opacity-100' : 'opacity-[0.62]')}>
        {art === 'converge' ? (
          <ConvergeArt active={active} />
        ) : art === 'server' ? (
          <ServerArt active={active} />
        ) : art === 'learn' ? (
          <LearnArt active={active} />
        ) : (
          <AppArt active={active} />
        )}
      </div>
    </div>
  )
}

/* ── One step ───────────────────────────────────────────────────────────────── */

function JourneyRow({ step, index }: { step: Step; index: number }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const active = reduced ? true : inView
  const imageLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative pl-12 lg:pl-0">
      {/* node sitting on the line (mobile: left rail, desktop: dead centre) */}
      <span
        className={cn(
          'absolute z-20 grid h-4 w-4 -translate-y-1/2 place-items-center rounded-full border bg-bg transition-all duration-500',
          'left-[14px] top-12 -translate-x-1/2 lg:left-1/2 lg:top-1/2',
          active ? 'scale-110 border-ink shadow-[0_0_0_4px_rgba(245,245,245,0.07),0_0_22px_rgba(245,245,245,0.35)]' : 'border-line-strong',
        )}
      >
        <span className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-500', active ? 'bg-ink' : 'bg-line-strong')} />
      </span>

      {/* connector that runs from the line into the card (desktop) */}
      <div
        className={cn(
          'absolute top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex',
          imageLeft ? 'right-1/2 flex-row-reverse' : 'left-1/2',
        )}
      >
        <span className={cn('h-px transition-all duration-500', active ? 'w-9 bg-ink/70' : 'w-7 bg-line-strong')} />
        <span className={cn('h-1.5 w-1.5 rounded-full transition-all duration-500', active ? 'bg-ink shadow-[0_0_10px_rgba(245,245,245,0.6)]' : 'bg-line-strong')} />
      </div>

      {/* connector (mobile left rail) */}
      <span
        className={cn('absolute left-[22px] top-12 z-10 h-px w-6 -translate-y-1/2 transition-all duration-500 lg:hidden', active ? 'bg-ink/70' : 'bg-line-strong')}
      />

      <div className="grid items-center gap-7 py-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* illustration card */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.8, ease }}
          className={cn(
            'relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border bg-[#070709] transition-[border-color,box-shadow] duration-500',
            imageLeft ? 'lg:order-1' : 'lg:order-2',
            active
              ? 'border-line-strong shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9),0_0_70px_-22px_rgba(245,245,245,0.2)]'
              : 'border-line shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)]',
          )}
        >
          <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500', active ? 'opacity-100' : 'opacity-50')} style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)' }} />
          <Illustration art={step.art} active={active} />
        </motion.div>

        {/* copy */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className={cn('lg:px-2', imageLeft ? 'lg:order-2' : 'lg:order-1')}
        >
          <span className="font-serif text-[34px] leading-none text-ink/15">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-4 font-serif text-[23px] leading-[1.14] tracking-[-0.01em] text-ink sm:text-[26px] lg:text-[30px]">
            {step.title}
          </h3>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-faint">{step.body}</p>
        </motion.div>
      </div>
    </div>
  )
}

/* ── The timeline ───────────────────────────────────────────────────────────── */

export function JourneyTimeline() {
  const { lang } = useLang()
  const reduced = usePrefersReducedMotion()
  const data = COPY[lang]

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 62%', 'end 58%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const headTop = useTransform(fill, (v) => `${v * 100}%`)

  const lineMask =
    '[mask-image:linear-gradient(to_bottom,transparent_0%,#000_7%,#000_93%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_7%,#000_93%,transparent_100%)]'

  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]"
        >
          {data.title}
        </motion.h2>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint"
        >
          {data.subtitle}
        </motion.p>
      </div>

      <div ref={timelineRef} className="relative mx-auto mt-12 max-w-[1080px] lg:mt-16">
        {/* mobile left rail */}
        <div className={cn('absolute inset-y-0 left-[14px] w-px lg:hidden', lineMask)}>
          <div className="absolute inset-0 bg-line" />
          <motion.div style={reduced ? { scaleY: 1 } : { scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-white/80 via-white/45 to-white/20" />
        </div>

        {/* desktop centre line */}
        <div className={cn('absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block', lineMask)}>
          <div className="absolute inset-0 bg-line" />
          <motion.div style={reduced ? { scaleY: 1 } : { scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-white/85 via-white/50 to-white/25" />
        </div>

        {/* glowing head that rides the progress (desktop) */}
        {!reduced && (
          <motion.div
            aria-hidden
            style={{ top: headTop }}
            className="pointer-events-none absolute left-1/2 z-0 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
          >
            <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,245,245,0.18), transparent 68%)' }} />
          </motion.div>
        )}

        {data.steps.map((step, i) => (
          <JourneyRow key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
