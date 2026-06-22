import { useRef, type ReactNode, type SVGProps } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BoxConverge } from '@/components/ui/BoxConverge'
import { VoiceWave } from '@/components/ui/VoiceWave'
import { cn } from '@/lib/utils'

/** Soft luminous backdrop — placeholder, swap for the final art later. */
const GLOW = '/IMG_0683.JPG'

/**
 * Our Products — a bento of the Nivora tools (Box, Voice), a mobile showcase,
 * and a download rack.
 *
 * It mirrors the "Our Services" language: glossy frosted-glass cards lifted on a
 * soft glow, paired with solid near-black cards for contrast. As the section
 * scrolls into view the cards drift in from their edges and settle together.
 * Every card is a doorway to the waiting list.
 */
export function Products() {
  const bentoRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ['start 0.92', 'start 0.4'],
  })
  // One spring drives every card so the assembly glides instead of tracking the wheel.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0008,
  })

  return (
    <section id="products" className="relative w-full overflow-hidden py-28 lg:py-36">
      {/* Ambient glow — softly blurred, masked into the dark, so the glass cards glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={GLOW}
          alt=""
          className="absolute left-1/2 top-1/2 h-[108%] w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-50 blur-[4px] [mask-image:radial-gradient(56%_54%_at_50%_46%,black_24%,transparent_80%)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1480px] px-6">
        <SectionHeading
          title="Our Products"
          subtitle="Intelligent software, built by Nivora and ready from day one. Pick the tool that fits the way you already work."
        />

        <div
          ref={bentoRef}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:auto-rows-[370px] lg:gap-6"
        >
          {/* ── Box — tall black card, converging-apps animation ── */}
          <BentoCard
            progress={progress}
            dx={-48}
            dark
            href="/waitlist?product=box"
            ariaLabel="Box — join the waiting list"
            className="lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2"
          >
            <BoxCard />
          </BentoCard>

          {/* ── Mobile showcase — glass ── */}
          <BentoCard
            progress={progress}
            dy={-34}
            start={0.05}
            href="/waitlist"
            ariaLabel="Made for mobile — join the waiting list"
            className="lg:col-start-4 lg:col-span-5 lg:row-start-1"
          >
            <MobileCard />
          </BentoCard>

          {/* ── Voice — black card, Wispr-style voice line ── */}
          <BentoCard
            progress={progress}
            dx={48}
            dy={-12}
            start={0.1}
            dark
            href="/waitlist?product=voice"
            ariaLabel="Voice — join the waiting list"
            className="lg:col-start-9 lg:col-span-4 lg:row-start-1"
          >
            <VoiceCard />
          </BentoCard>

          {/* ── Download — glass card, full-width, locked until launch ── */}
          <BentoCard
            progress={progress}
            dy={34}
            start={0.16}
            href="/waitlist"
            ariaLabel="Download — join the waiting list"
            className="lg:col-start-4 lg:col-span-9 lg:row-start-2"
          >
            <DownloadCard />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Card shell — converge-on-scroll wrapper, glass or black, with the same
   frosted gloss the service cards use. When `href` is set the whole card is a
   link to the waiting list: an overlay anchor sits under the (pointer-events
   transparent) content, and any real button inside re-enables its own clicks.
   ────────────────────────────────────────────────────────────────────────── */
function BentoCard({
  progress,
  dx = 0,
  dy = 0,
  start = 0,
  dark = false,
  href,
  ariaLabel,
  className,
  children,
}: {
  progress: MotionValue<number>
  dx?: number
  dy?: number
  start?: number
  dark?: boolean
  href?: string
  ariaLabel?: string
  className?: string
  children: ReactNode
}) {
  const x = useTransform(progress, [start, 1], [dx, 0])
  const y = useTransform(progress, [start, 1], [dy, 0])
  const scale = useTransform(progress, [start, 1], [0.96, 1])
  const opacity = useTransform(progress, [start, Math.min(start + 0.4, 1)], [0.35, 1])

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className={cn(
        'group relative h-full min-h-[280px] overflow-hidden rounded-[28px] border border-line p-7 transition-[border-color] duration-300 hover:border-line-strong lg:p-8',
        dark
          ? 'bg-[#0a0a0a]'
          : 'bg-gradient-to-b from-white/[0.10] via-white/[0.05] to-white/[0.02] backdrop-blur-md',
        className,
      )}
    >
      {/* Frosted sheen — diagonal glow on glass, a quiet top hairline on both */}
      {!dark && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
      )}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent',
          dark ? 'via-white/10' : 'via-white/25',
        )}
      />
      {href && (
        <Link to={href} aria-label={ariaLabel} className="absolute inset-0 z-[1] rounded-[28px]" />
      )}
      <div className={cn('relative z-[2] flex h-full flex-col', href && 'pointer-events-none')}>
        {children}
      </div>
    </motion.div>
  )
}

/* Small shared bits ───────────────────────────────────────────────────────── */
function ComingSoon() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
      Coming soon
    </span>
  )
}

/* ── Card 1 · Box ─────────────────────────────────────────────────────────── */
function BoxCard() {
  return (
    <>
      {/* Converging-apps animation — every channel resolves into Box */}
      <div className="relative flex-1 overflow-hidden">
        <BoxConverge />
      </div>

      {/* Text */}
      <div className="pt-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Box</h3>
          <ComingSoon />
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-faint">
          Email, chat and DMs in one calm inbox. Read, sort and reply without ever switching apps.
        </p>
        <Link
          to="/waitlist?product=box"
          className="pointer-events-auto mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90"
        >
          Join the waiting list
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </>
  )
}

/* ── Card 2 · Mobile showcase (empty iPhone-mockup frame) ─────────────────── */
function MobileCard() {
  return (
    <>
      {/* Empty frame — drop the iPhone-bottom mockup in here later */}
      <div className="relative flex-1 overflow-hidden rounded-[16px] border border-line bg-white/[0.02]">
        <div className="absolute inset-x-8 -bottom-2 top-7 rounded-[34px] border border-line border-b-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
        <div className="absolute bottom-3 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-white/15" />
      </div>

      <div className="pt-6">
        <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink">
          Made for mobile
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-faint">
          The whole suite in your pocket. Fast, native, and quietly out of your way.
        </p>
      </div>
    </>
  )
}

/* ── Card 3 · Voice ───────────────────────────────────────────────────────── */
function VoiceCard() {
  return (
    <div className="flex h-full flex-col gap-7 sm:flex-row sm:items-stretch">
      {/* Copy */}
      <div className="flex flex-col justify-center sm:w-[42%]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Voice</h3>
          <ComingSoon />
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-faint">
          Speech-to-text tuned to how you talk and how you write. Dictate once, get clean copy.
        </p>
      </div>

      {/* Wispr-style voice line */}
      <div className="relative min-h-[200px] flex-1 sm:w-[58%]">
        <VoiceWave />
      </div>
    </div>
  )
}

/* ── Card 4 · Download (locked until launch) ──────────────────────────────── */
const PLATFORMS: { name: string; meta: string; Glyph: (p: SVGProps<SVGSVGElement>) => ReactNode }[] = [
  { name: 'iPhone', meta: 'iOS', Glyph: AppleGlyph },
  { name: 'Mac', meta: 'macOS', Glyph: AppleGlyph },
  { name: 'Android', meta: 'APK', Glyph: AndroidGlyph },
  { name: 'Windows', meta: 'x64', Glyph: WindowsGlyph },
]

function DownloadCard() {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-[24px] leading-none tracking-[-0.01em] text-ink">Download</h3>
          <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-faint">
            Box, Voice and the whole suite, native on every device you use.
          </p>
        </div>
        <span className="label-mono shrink-0 text-[10px] text-dim">AT LAUNCH</span>
      </div>

      {/* Platform rack — blurred + dimmed, with a clean lock badge over it */}
      <div className="relative mt-6 flex-1">
        <div className="grid grid-cols-2 gap-2.5 opacity-40 blur-[2px] sm:grid-cols-4">
          {PLATFORMS.map(({ name, meta, Glyph }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-[14px] border border-line bg-white/[0.03] px-3 py-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-white/[0.05] text-ink-soft">
                <Glyph className="h-[19px] w-[19px]" />
              </span>
              <span className="text-[13px] text-ink-soft">{name}</span>
              <span className="font-mono text-[10px] text-dim">{meta}</span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-[#0f0f0f]/80 text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <Lock className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            <span className="mt-3 text-[14px] font-medium text-ink-soft">Available at launch</span>
            <span className="mt-1 text-[12.5px] text-faint">Join the waiting list for early access</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Monochrome platform glyphs (white, never the logo colours) ───────────── */
function AppleGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98C13.87.71 15.21.01 16.315 0c.03.13.05.28.05.43zM20.93 17.14c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C3.96 18.38 2.92 15.57 2.92 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.86 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45z" />
    </svg>
  )
}

function WindowsGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function AndroidGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.523 15.341c-.551 0-.999-.448-.999-.999s.448-.999.999-.999.999.448.999.999-.448.999-.999.999m-11.046 0c-.551 0-.999-.448-.999-.999s.448-.999.999-.999.999.448.999.999-.448.999-.999.999m11.405-6.02l1.997-3.459a.416.416 0 00-.152-.568.416.416 0 00-.568.152l-2.022 3.503C15.59 8.244 13.853 7.851 12 7.851s-3.59.393-5.137 1.099L4.841 5.447a.416.416 0 00-.568-.152.416.416 0 00-.152.568l1.997 3.459C2.689 11.187.343 14.659 0 18.761h24c-.343-4.102-2.689-7.574-6.118-9.42" />
    </svg>
  )
}
