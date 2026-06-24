import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BoxConverge } from '@/components/ui/BoxConverge'
import { VoiceSlingers } from '@/components/ui/VoiceSlingers'
import MacOSDock, { type DockApp } from '@/components/ui/MacOSDock'
import { cn } from '@/lib/utils'

/** Soft luminous backdrop — placeholder, swap for the final art later. */
const GLOW = '/IMG_0683.webp'

/**
 * Our Products — a bento of the Nivora tools.
 *
 * Five cards: Box (converging inboxes), Voice (a wide hero where spoken words
 * flow as ribbons of text and resolve into clean copy), and three smaller
 * utility cards — Made for mobile, Made for desktop, and a locked Download rack.
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
          subtitle="Intelligent software, built by Nivora. Box and Voice are coming soon, join the waiting list to be first in line when they launch."
        />

        <div
          ref={bentoRef}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:[grid-template-rows:420px_300px] lg:gap-6"
        >
          {/* ── Box — tall black card, converging-apps animation ── */}
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

          {/* ── Made for mobile — glass card, top middle ── */}
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

          {/* ── Voice — wide black hero, the speech-to-clean-copy flow ── */}
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

          {/* ── Made for desktop — glass card with the live macOS dock ── */}
          <BentoCard
            progress={progress}
            dy={40}
            start={0.16}
            className="lg:col-start-4 lg:col-span-5 lg:row-start-2"
          >
            <DesktopCard />
          </BentoCard>

          {/* ── Download — glass card with the three store buttons ── */}
          <BentoCard
            progress={progress}
            dx={32}
            dy={36}
            start={0.2}
            className="lg:col-start-9 lg:col-span-4 lg:row-start-2"
          >
            <DownloadCard />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Card shell — converge-on-scroll wrapper, glass or black, with the same
   frosted gloss the service cards use. When `href` is set the whole card is a
   link to the waiting list: an overlay anchor sits under the (pointer-events
   transparent) content, and any real button inside re-enables its own clicks.
   ────────────────────────────────────────────────────────────── */
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

/* Small shared bits ──────────────────────────────────────────── */
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

/* ── Card 1 · Box ──────────────────────────────────────────── */
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
          <AppLogo src="/box-logo.webp" />
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Box</h3>
          <ComingSoon />
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-faint">
          Email, chat and DMs in one calm inbox. Read, sort and reply without ever switching apps.
        </p>
        {/* Presentational — the whole card is already the link, so this just
            reads as the call to action (avoids a duplicate keyboard tab stop). */}
        <span className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors group-hover:bg-white/90">
          Join the waiting list
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </div>
    </>
  )
}

/* ── Card 2 · Voice — wide hero with the speech-to-clean-copy flow ────────── */
function VoiceCard() {
  return (
    <div className="relative h-full">
      {/* Full-bleed flow + node — escape the card padding, clipped to its corners */}
      <div className="pointer-events-none absolute -inset-7 overflow-hidden rounded-[28px] lg:-inset-8">
        <VoiceSlingers />
        {/* Top scrim so the label reads cleanly above the low flow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.94),rgba(10,10,10,0.45)_20%,transparent_44%)]" />
      </div>

      {/* Label — anchored top-left, above the node, ribbon and correction pills */}
      <div className="relative z-[1]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AppLogo src="/voice-logo.webp" />
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

/* ── Card 3 · Made for mobile — phone in hand, live "Coming soon" notifications ── */
const PHONE_NOTIFS = [
  { src: '/box-logo.webp', name: 'Box' },
  { src: '/voice-logo.webp', name: 'Voice' },
]

/** A single lock-screen notification that cycles between the two apps:
 *  the current one slides up and out, the next rises in from below. */
function PhoneNotifications() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PHONE_NOTIFS.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute left-1/2 top-[40%] h-[15%] w-[62%] -translate-x-1/2 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          className="absolute inset-0 flex items-center gap-2 rounded-[14px] border border-white/12 bg-[#0b0b0b]/80 px-2.5 shadow-[0_8px_22px_-10px_rgba(0,0,0,0.85)] backdrop-blur-md"
        >
          <img
            src={PHONE_NOTIFS[i].src}
            alt=""
            className="h-[58%] w-auto shrink-0 rounded-[7px] border border-white/10 object-cover"
          />
          <div className="min-w-0 leading-none">
            <p className="truncate text-[8px] font-semibold text-ink">{PHONE_NOTIFS[i].name}</p>
            <p className="mt-[3px] truncate text-[7px] text-faint">Coming soon</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MobileCard() {
  return (
    <>
      <div className="relative flex-1 overflow-hidden">
        {/* Phone in hand, anchored to the bottom so it bleeds off and reads big */}
        <div className="absolute inset-x-0 -bottom-6 mx-auto w-[82%] max-w-[210px]">
          <img
            src="/product-phone-hand.webp"
            alt="The Nivora suite on iPhone"
            className="w-full select-none object-contain"
            loading="lazy"
            draggable={false}
          />
          <PhoneNotifications />
        </div>
      </div>

      <div className="relative pt-5">
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

/* ── Card 4 · Made for desktop (empty browser-window frame) ─────────────── */
const DOCK_APPS: DockApp[] = [
  { id: 'finder', name: 'Finder', icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024' },
  { id: 'calculator', name: 'Calculator', icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024' },
  { id: 'terminal', name: 'Terminal', icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024' },
  { id: 'notes', name: 'Notes', icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024' },
  { id: 'box', name: 'Box by Nivora', icon: '/box-logo.webp' },
  { id: 'voice', name: 'Voice by Nivora', icon: '/voice-logo.webp' },
  { id: 'safari', name: 'Safari', icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024' },
  { id: 'photos', name: 'Photos', icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024' },
  { id: 'music', name: 'Music', icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024' },
]

function DesktopCard() {
  const navigate = useNavigate()
  return (
    <>
      {/* Live macOS dock — Box and Voice sit in the middle and magnify on hover */}
      <div className="pointer-events-auto relative flex flex-1 items-center justify-center overflow-hidden">
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

/* ── Card 5 · Download — App Store, Google Play and a scan-to-mobile button ── */
/** One soft-black store tile: glyph top-left, two-line label bottom-left. */
function StoreButton({
  glyph,
  line1,
  line2,
  onClick,
  href,
  label,
}: {
  glyph: ReactNode
  line1: string
  line2: string
  onClick?: () => void
  href?: string
  label: string
}) {
  const inner = (
    <>
      <span className="text-ink-soft transition-colors group-hover/btn:text-ink">{glyph}</span>
      <span className="leading-tight">
        <span className="block text-[11px] text-faint">{line1}</span>
        <span className="block text-[13px] font-medium text-ink">{line2}</span>
      </span>
    </>
  )
  const cls =
    'group/btn flex h-full flex-col justify-between rounded-[18px] border border-white/10 bg-[#0d0d0d] p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-white/25 hover:bg-[#121212]'

  if (href) {
    return (
      <Link to={href} aria-label={label} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      {inner}
    </button>
  )
}

function DownloadCard() {
  const [scanOpen, setScanOpen] = useState(false)

  // Close the scan sheet on Escape
  useEffect(() => {
    if (!scanOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setScanOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scanOpen])

  return (
    <>
      <h3 className="font-serif text-[20px] leading-none tracking-[-0.01em] text-ink">Download</h3>

      <div className="mt-5 grid flex-1 grid-cols-3 gap-2.5">
        <StoreButton
          glyph={<AppleGlyph className="h-[22px] w-[22px]" />}
          line1="Open"
          line2="App Store"
          href="/waitlist?product=ios"
          label="Open the App Store, join the waiting list"
        />
        <StoreButton
          glyph={<GooglePlayGlyph className="h-[22px] w-[22px]" />}
          line1="Open"
          line2="Google Play"
          href="/waitlist?product=android"
          label="Open Google Play, join the waiting list"
        />
        <StoreButton
          glyph={<ScanGlyph />}
          line1="Scan"
          line2="to download"
          onClick={() => setScanOpen(true)}
          label="Scan a QR code to open Nivora on your phone"
        />
      </div>

      <ScanSheet open={scanOpen} onClose={() => setScanOpen(false)} />
    </>
  )
}

/* Scan popup — a real QR that opens the mobile site when scanned.
   Rendered through a portal so it escapes the card's transform + overflow clip
   and covers the full viewport. */
function ScanSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Scan to download"
            initial={{ scale: 0.94, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-[320px] rounded-[28px] border border-line-strong bg-[#0b0b0b] p-7 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-line text-faint transition-colors hover:border-line-strong hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>

            <div className="mx-auto w-fit rounded-[20px] bg-white p-4">
              <img src="/qr-download.webp" alt="QR code to open Nivora on your phone" className="h-44 w-44" />
            </div>

            <h4 className="mt-5 font-serif text-[22px] leading-none tracking-[-0.01em] text-ink">
              Scan to download
            </h4>
            <p className="mt-2.5 text-[13px] leading-relaxed text-faint">
              Point your phone camera at the code to open Nivora on mobile and join the waiting list.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ── Monochrome platform glyphs (white, never the logo colours) ─────────── */
function AppleGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98C13.87.71 15.21.01 16.315 0c.03.13.05.28.05.43zM20.93 17.14c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C3.96 18.38 2.92 15.57 2.92 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.86 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45z" />
    </svg>
  )
}

function GooglePlayGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3.6 1.83a1.5 1.5 0 0 0-.49 1.1v18.14c0 .46.19.86.49 1.1l.06.05L13.8 12.07v-.14L3.66 1.78l-.06.05zM17.17 15.44l-3.37-3.37v-.14l3.37-3.37.08.04 3.99 2.27c1.14.65 1.14 1.7 0 2.35l-3.99 2.27-.08-.05zM17.25 15.39 13.8 11.93 3.6 22.17c.38.4 1 .45 1.7.06l11.95-6.84M5.3 1.71c-.7-.4-1.32-.34-1.7.06L13.8 12.07l3.45-3.46L5.3 1.71z" />
    </svg>
  )
}

/** Dot-matrix QR-ish glyph for the "Scan to download" tile. */
function ScanGlyph() {
  return (
    <span
      aria-hidden
      className="block h-[22px] w-[22px] [background-image:radial-gradient(circle,currentColor_1px,transparent_1.5px)] [background-position:0_0] [background-size:3.2px_3.2px]"
    />
  )
}

