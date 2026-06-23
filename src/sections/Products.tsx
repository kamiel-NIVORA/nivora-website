import { useRef, type ReactNode, type SVGProps } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BoxConverge } from '@/components/ui/BoxConverge'
import { VoiceSlingers } from '@/components/ui/VoiceSlingers'
import MacOSDock, { type DockApp } from '@/components/ui/MacOSDock'
import { cn } from '@/lib/utils'

/** Soft luminous backdrop — placeholder, swap for the final art later. */
const GLOW = '/IMG_0683.JPG'

/**
 * Our Products — a bento of the Nivora tools.
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
      {/* Ambient glow */}
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
          subtitle="Intelligent software, built by Nivora. Box and Voice are coming soon, join the waiting list to be first in line when they launch."
        />

        <div
          ref={bentoRef}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:[grid-template-rows:420px_300px] lg:gap-6"
        >
          {/* Box */}
          <BentoCard
            progress={progress}
            dx={-44}
            dark
            href="/waitlist?product=box"
            ariaLabel="Box, join the waiting list"
            className="min-h-[460px] lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:min-h-0"
          >
            <BoxCard />
          </BentoCard>

          {/* Made for mobile */}
          <BentoCard
            progress={progress}
            dy={-26}
            start={0.1}
            href="/waitlist"
            ariaLabel="Made for mobile, join the waiting list"
            className="lg:col-start-4 lg:col-span-3 lg:row-start-1"
          >
            <MobileCard />
          </BentoCard>

          {/* Voice */}
          <BentoCard
            progress={progress}
            dx={30}
            dy={-20}
            start={0.06}
            dark
            href="/waitlist?product=voice"
            ariaLabel="Voice, join the waiting list"
            className="min-h-[400px] lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:min-h-0"
          >
            <VoiceCard />
          </BentoCard>

          {/* Made for desktop — live macOS dock */}
          <BentoCard
            progress={progress}
            dy={40}
            start={0.16}
            className="lg:col-start-4 lg:col-span-6 lg:row-start-2"
          >
            <DesktopCard />
          </BentoCard>

          {/* Download */}
          <BentoCard
            progress={progress}
            dx={32}
            dy={36}
            start={0.2}
            href="/waitlist"
            ariaLabel="Download, join the waiting list"
            className="lg:col-start-10 lg:col-span-3 lg:row-start-2"
          >
            <DownloadCard />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

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

function ComingSoon() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
      Coming soon
    </span>
  )
}

/** Small app icon — the same mark used in the nav Products menu. */
function AppLogo({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="h-9 w-9 shrink-0 rounded-[10px] border border-line object-cover"
      loading="lazy"
    />
  )
}

function BoxCard() {
  return (
    <>
      <div className="relative flex-1 overflow-hidden">
        <BoxConverge />
      </div>

      <div className="pt-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AppLogo src="/box-logo.png" />
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Box</h3>
          <ComingSoon />
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-faint">
          Email, chat and DMs in one calm inbox. Read, sort and reply without ever switching apps.
        </p>
        <span className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors group-hover:bg-white/90">
          Join the waiting list
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>
    </>
  )
}

function VoiceCard() {
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute -inset-7 overflow-hidden rounded-[28px] lg:-inset-8">
        <VoiceSlingers />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.94),rgba(10,10,10,0.45)_20%,transparent_44%)]" />
      </div>

      <div className="relative z-[1]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AppLogo src="/voice-logo.png" />
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Voice</h3>
          <ComingSoon />
        </div>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-faint">
          Speech to text, tuned to how you talk and how you write. Dictate once, get clean copy.
        </p>
      </div>
    </div>
  )
}

function MobileCard() {
  return (
    <>
      <div className="relative flex-1 overflow-hidden rounded-[14px] border border-line bg-white/[0.02]">
        <div className="absolute -bottom-3 left-1/2 top-6 w-[58%] max-w-[150px] -translate-x-1/2 rounded-t-[26px] border border-b-0 border-line bg-gradient-to-b from-white/[0.06] to-transparent" />
        <div className="absolute bottom-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/15" />
      </div>

      <div className="pt-5">
        <h3 className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-ink">
          Made for mobile
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-faint">
          The whole suite in your pocket. Native and quietly out of the way.
        </p>
      </div>
    </>
  )
}

const DOCK_APPS: DockApp[] = [
  { id: 'finder', name: 'Finder', icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024' },
  { id: 'calculator', name: 'Calculator', icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024' },
  { id: 'terminal', name: 'Terminal', icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024' },
  { id: 'notes', name: 'Notes', icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024' },
  { id: 'box', name: 'Box by Nivora', icon: '/box-logo.png' },
  { id: 'voice', name: 'Voice by Nivora', icon: '/voice-logo.png' },
  { id: 'safari', name: 'Safari', icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024' },
  { id: 'photos', name: 'Photos', icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024' },
  { id: 'music', name: 'Music', icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024' },
]

function DesktopCard() {
  const navigate = useNavigate()
  return (
    <>
      {/* Live macOS dock — Box and Voice sit in the middle and magnify on hover */}
      <div className="pointer-events-auto relative flex flex-1 items-end justify-center overflow-hidden pb-2">
        <MacOSDock apps={DOCK_APPS} openApps={['box', 'voice']} onAppClick={() => navigate('/waitlist')} />
      </div>

      <div className="pt-5">
        <h3 className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-ink">
          Made for desktop
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-faint">
          Box and Voice live right in your dock on Mac and Windows. The full suite, a click away.
        </p>
      </div>
    </>
  )
}

const PLATFORMS: { name: string; Glyph: (p: SVGProps<SVGSVGElement>) => ReactNode }[] = [
  { name: 'iPhone', Glyph: AppleGlyph },
  { name: 'Mac', Glyph: AppleGlyph },
  { name: 'Android', Glyph: AndroidGlyph },
  { name: 'Windows', Glyph: WindowsGlyph },
]

function DownloadCard() {
  return (
    <>
      <h3 className="font-serif text-[20px] leading-none tracking-[-0.01em] text-ink">Download</h3>

      <div className="relative mt-5 flex-1">
        <div className="grid h-full grid-cols-2 gap-2.5 opacity-40 blur-[2px]">
          {PLATFORMS.map(({ name, Glyph }) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-[14px] border border-line bg-white/[0.03]"
            >
              <Glyph className="h-[22px] w-[22px] text-ink-soft" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-[#0f0f0f]/80 text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <Lock className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </>
  )
}

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
