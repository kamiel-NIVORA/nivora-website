import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, Lock, QrCode } from 'lucide-react'
import { waitlistHref } from '@/data/contact'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BoxConverge } from '@/components/ui/BoxConverge'
import { VoiceSlingers } from '@/components/ui/VoiceSlingers'
import MacOSDock, { type DockApp } from '@/components/ui/MacOSDock'
import { cn } from '@/lib/utils'
import { useLang, type Lang } from '@/i18n'

/** Soft luminous backdrop — placeholder, swap for the final art later. */
const GLOW = '/products/IMG_0683.webp'

/* All user-facing copy for the Products section, in both languages. */
const COPY = {
  en: {
    sectionTitle: 'Our Products',
    sectionSubtitle:
      'Intelligent software, built by Nivora. Box and Voice are coming soon, leave your details to get notified the moment they launch.',
    comingSoon: 'Coming soon',
    boxAria: 'Box, get notified at launch',
    voiceAria: 'Voice, get notified at launch',
    boxDesc: 'Email, chat and DMs in one calm inbox. Read, sort and reply without ever switching apps.',
    boxCta: 'Keep me posted',
    voiceDesc: 'Speech to text, tuned to how you talk and how you write. Dictate once, get clean copy.',
    phoneNotifAria: (name: string) => `${name}, coming soon, get notified at launch`,
    now: 'now',
    phoneBox: 'one calm inbox',
    phoneVoice: 'speech to text',
    phoneAlt: 'The Nivora suite on iPhone',
    mobileTitle: 'Made for mobile',
    mobileDesc: 'The whole suite in your pocket. Native and quietly out of the way.',
    desktopTitle: 'Made for desktop',
    desktopDesc: 'Box and Voice live right in your dock on Mac and Windows. The full suite, a click away.',
    download: 'Download',
    storeOpen: 'Open',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    scan: 'Scan',
    toDownload: 'to download',
    lockAria: (appName: string) => `${appName} downloads are coming soon, get notified at launch`,
  },
  nl: {
    sectionTitle: 'Onze producten',
    sectionSubtitle:
      'Intelligente software, gebouwd door Nivora. Box en Voice komen binnenkort, laat uw gegevens achter en we brengen u op de hoogte zodra ze er zijn.',
    comingSoon: 'Binnenkort',
    boxAria: 'Box, laat u op de hoogte brengen bij de lancering',
    voiceAria: 'Voice, laat u op de hoogte brengen bij de lancering',
    boxDesc: 'Zet e-mails, chats en DMs in een rustige box. Lees, sorteer en antwoord zonder ooit van app te wisselen.',
    boxCta: 'Houd mij op de hoogte',
    voiceDesc: 'Spraak naar tekst, afgestemd op hoe u praat en hoe u schrijft. Dicteer één keer, krijg nette tekst in de juiste vorm.',
    phoneNotifAria: (name: string) => `${name}, binnenkort, laat u op de hoogte brengen bij de lancering`,
    now: 'nu',
    phoneBox: 'één rustige inbox',
    phoneVoice: 'spraak naar tekst',
    phoneAlt: 'De Nivora-suite op iPhone',
    mobileTitle: 'Gemaakt voor mobiel',
    mobileDesc: 'De volledige suite in uw zak. Native en rustig op de achtergrond.',
    desktopTitle: 'Gemaakt voor desktop',
    desktopDesc: 'Box en Voice staan gewoon in uw dock op Mac en Windows.',
    download: 'Downloaden',
    storeOpen: 'Openen',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    scan: 'Scan',
    toDownload: 'om te downloaden',
    lockAria: (appName: string) => `${appName} downloads komen binnenkort, laat u op de hoogte brengen bij de lancering`,
  },
} as const

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
  const { lang } = useLang()
  const t = COPY[lang]
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
        <SectionHeading title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div
          ref={bentoRef}
          className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:[grid-template-rows:420px_300px] lg:gap-6"
        >
          {/* ── Box — tall black card, converging-apps animation ── */}
          <BentoCard
            progress={progress}
            dx={-44}
            dark
            href={waitlistHref('box')}
            ariaLabel={t.boxAria}
            className="min-h-[460px] lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:min-h-0"
          >
            <BoxCard />
          </BentoCard>

          {/* ── Made for mobile — glass card; the two notifications are the links ── */}
          <BentoCard
            progress={progress}
            dy={-26}
            start={0.1}
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
            href={waitlistHref('voice')}
            ariaLabel={t.voiceAria}
            className="min-h-[300px] sm:min-h-[400px] lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:min-h-0"
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="absolute inset-0 z-[1] rounded-[28px]"
        />
      )}
      <div className={cn('relative z-[2] flex h-full flex-col', href && 'pointer-events-none')}>
        {children}
      </div>
    </motion.div>
  )
}

/* Small shared bits ──────────────────────────────────────────── */
function ComingSoon() {
  const { lang } = useLang()
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
      {COPY[lang].comingSoon}
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
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      {/* Converging-apps animation — every channel resolves into Box */}
      <div className="relative flex-1 overflow-hidden">
        <BoxConverge />
      </div>

      {/* Text */}
      <div className="pt-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <AppLogo src="/products/box-logo.webp" />
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Box</h3>
          <ComingSoon />
        </div>
        <p className="mt-3.5 text-[14px] leading-relaxed text-faint">{t.boxDesc}</p>
        {/* Presentational — the whole card is already the link, so this just
            reads as the call to action (avoids a duplicate keyboard tab stop).
            White pill with a dark arrow chip that lifts and nudges on hover. */}
        <span className="mt-6 inline-flex h-11 w-fit items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[14px] font-medium text-[#0a0a0a] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:-translate-y-px group-hover:shadow-[0_8px_22px_-4px_rgba(0,0,0,0.55)]">
          {t.boxCta}
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </span>
      </div>
    </>
  )
}

/* ── Card 2 · Voice — wide hero with the speech-to-clean-copy flow ────────── */
function VoiceCard() {
  const { lang } = useLang()
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
          <AppLogo src="/products/voice-logo.webp" />
          <h3 className="font-serif text-[34px] leading-none tracking-[-0.01em] text-ink">Voice</h3>
          <ComingSoon />
        </div>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-faint">{COPY[lang].voiceDesc}</p>
      </div>
    </div>
  )
}

/* ── Card 3 · Made for mobile — glossy lock-screen notifications ──────────── */
const PHONE_NOTIFS = [
  { src: '/products/box-logo.webp', name: 'Box', bodyKey: 'phoneBox', href: waitlistHref('box') },
  { src: '/products/voice-logo.webp', name: 'Voice', bodyKey: 'phoneVoice', href: waitlistHref('voice') },
] as const

/** A single glossy notification — a button to the waiting list. Styled to match
 *  the NotificationStack in the Features section (frosted glass, inner sheen). */
function PhoneNotif({ src, name, bodyKey, href }: (typeof PHONE_NOTIFS)[number]) {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: '55%', scale: 0.96, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 140, damping: 26, mass: 1.1 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.phoneNotifAria(name)}
        className="pointer-events-auto flex min-h-[40px] items-center gap-[3.5%] rounded-[13px] border border-white/70 bg-white/55 px-[3.5%] py-[2.4%] backdrop-blur-xl transition-colors duration-200 hover:bg-white/70 lg:min-h-0"
        style={{
          boxShadow:
            'inset 0 1px 1.5px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.05), 0 10px 22px -8px rgba(0,0,0,0.4)',
        }}
      >
        <img
          src={src}
          alt=""
          className="aspect-square h-[clamp(18px,11cqw,22px)] shrink-0 rounded-[24%] border border-black/10 object-cover shadow-[0_2px_5px_rgba(0,0,0,0.25)] lg:h-[clamp(15px,11cqw,22px)]"
        />
        <div className="min-w-0 flex-1 leading-none">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[clamp(11px,2.7cqw,12px)] font-semibold text-[#0c0c0c] lg:text-[clamp(8px,2.7cqw,12px)]">{name}</span>
            <span className="shrink-0 text-[clamp(8px,1.9cqw,9px)] text-black/40 lg:text-[clamp(6px,1.9cqw,9px)]">{t.now}</span>
          </div>
          <p className="mt-[2.5%] whitespace-nowrap text-[clamp(9px,2.2cqw,10px)] text-black/55 lg:text-[clamp(6.5px,2.2cqw,10px)]">
            <span className="font-semibold text-black/75">{t.comingSoon}</span> · {t[bodyKey]}
          </p>
        </div>
      </a>
    </motion.div>
  )
}

/** Plays once when scrolled into view: Box drops in, then Voice rises in
 *  beneath it, pushing Box up, and the sequence settles. No loop. */
function PhoneNotifications() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers = PHONE_NOTIFS.map((_, idx) =>
      window.setTimeout(() => setShown(idx + 1), 650 + idx * 1250),
    )
    return () => timers.forEach((t) => clearTimeout(t))
  }, [inView])

  return (
    // Bottom-anchored stack low on the white widget — below the mark, above the buttons
    <div
      ref={ref}
      className="absolute inset-x-[9%] top-[35%] bottom-[36.5%] flex flex-col justify-end gap-[4.5%]"
    >
      {PHONE_NOTIFS.slice(0, shown).map((n) => (
        <PhoneNotif key={n.name} {...n} />
      ))}
    </div>
  )
}

function MobileCard() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <div className="relative h-full">
      {/* The lower phone — widget, banner and buttons — anchored at the bottom and
          feathered at top + bottom so it melts into the card (no hard cut, no clock).
          @container lets the on-screen banner scale with the phone, not the page. */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-0 mx-auto w-[94%] max-w-[324px] [container-type:inline-size] left-1/2 -translate-x-1/2">
        <img
          src="/products/product-phone.webp"
          alt={t.phoneAlt}
          className="w-full select-none object-contain [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_6%,#000_14%,#000_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_6%,#000_14%,#000_85%,transparent_100%)]"
          loading="lazy"
          draggable={false}
        />
        {/* Glossy screen reflection — a soft diagonal sheen across the glass */}
        <div className="pointer-events-none absolute inset-0 mix-blend-screen [background:linear-gradient(128deg,rgba(255,255,255,0.18)_2%,transparent_30%)] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_6%,#000_14%,#000_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_6%,#000_14%,#000_85%,transparent_100%)]" />
        <PhoneNotifications />
      </div>

      {/* Soft scrim so the title + subtitle stay crisp over the phone's faded top */}
      <div className="pointer-events-none absolute -inset-x-8 -top-8 z-[1] h-[140px] bg-gradient-to-b from-black/90 via-black/45 to-transparent" />

      {/* Title — sits at the top, clear of the phone screen below */}
      <div className="relative z-[2]">
        <h3 className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-ink">{t.mobileTitle}</h3>
        <p className="mt-2 max-w-[18rem] text-[13px] leading-relaxed text-muted">{t.mobileDesc}</p>
      </div>
    </div>
  )
}

/* ── Card 4 · Made for desktop (empty browser-window frame) ─────────────── */
const getDockApps = (lang: Lang): DockApp[] => [
  { id: 'finder', name: 'Finder', icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024' },
  { id: 'calculator', name: lang === 'nl' ? 'Rekenmachine' : 'Calculator', icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024' },
  { id: 'terminal', name: 'Terminal', icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024' },
  { id: 'notes', name: lang === 'nl' ? 'Notities' : 'Notes', icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024' },
  { id: 'box', name: lang === 'nl' ? 'Box van Nivora' : 'Box by Nivora', icon: '/products/box-logo.webp' },
  { id: 'voice', name: lang === 'nl' ? 'Voice van Nivora' : 'Voice by Nivora', icon: '/products/voice-logo.webp' },
  { id: 'safari', name: 'Safari', icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024' },
  { id: 'photos', name: lang === 'nl' ? "Foto's" : 'Photos', icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024' },
  { id: 'music', name: lang === 'nl' ? 'Muziek' : 'Music', icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024' },
]

function DesktopCard() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <>
      {/* Live macOS dock — Box and Voice sit in the middle and magnify on hover.
          The dock measures and fits this column, but a hidden-scrollbar x-rail on
          phone/tablet is a safety net so it can never clip its card. */}
      <div className="pointer-events-auto relative flex flex-1 items-center justify-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden">
        <MacOSDock
          apps={getDockApps(lang)}
          openApps={['box', 'voice']}
          onAppClick={() => window.open(waitlistHref(), '_blank', 'noopener,noreferrer')}
        />
      </div>

      <div className="pt-5">
        <h3 className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-ink">{t.desktopTitle}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-faint">{t.desktopDesc}</p>
      </div>
    </>
  )
}

/* ── Card 5 · Download — locked until launch; Box/Voice picks the waiting list ── */
/** One soft-black store tile: glyph top-left, two-line label bottom-left. */
function RackTile({ glyph, line1, line2 }: { glyph: ReactNode; line1: string; line2: string }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[18px] border border-white/10 bg-[#0d0d0d] p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <span className="text-ink-soft">{glyph}</span>
      <span className="leading-tight">
        <span className="block text-[11px] text-faint">{line1}</span>
        <span className="block text-[13px] font-medium text-ink">{line2}</span>
      </span>
    </div>
  )
}

function DownloadCard() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [tab, setTab] = useState<'box' | 'voice'>('box')
  const appName = tab === 'box' ? 'Box' : 'Voice'

  return (
    <>
      {/* Title + Box / Voice switch — the lock leads to the chosen app's waiting list */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-[20px] leading-none tracking-[-0.01em] text-ink">{t.download}</h3>
        <ProductTabs value={tab} onChange={setTab} />
      </div>

      {/* Store rack — dimmed + blurred behind a lock; the apps are not out yet */}
      <div className="relative mt-5 flex-1">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="pointer-events-none grid h-full grid-cols-3 gap-2.5 blur-[2px]"
        >
          <RackTile
            glyph={<img src="/products/store-apple.svg" alt="" className="h-[30px] w-[30px] object-contain" />}
            line1={t.storeOpen}
            line2={t.appStore}
          />
          <RackTile
            glyph={
              <img
                src="/products/store-googleplay.svg"
                alt=""
                className="h-[30px] w-[30px] object-contain [filter:grayscale(1)_brightness(1.7)]"
              />
            }
            line1={t.storeOpen}
            line2={t.googlePlay}
          />
          <RackTile
            glyph={<QrCode className="h-[30px] w-[30px]" strokeWidth={1.3} />}
            line1={t.scan}
            line2={t.toDownload}
          />
        </motion.div>

        {/* Lock badge — a quiet doorway to the chosen app's waiting list */}
        <a
          href={waitlistHref(tab)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.lockAria(appName)}
          className="group/lock absolute inset-0 grid place-items-center rounded-[14px]"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-[#0f0f0f]/85 text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-300 group-hover/lock:scale-105">
            <Lock className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>
        </a>
      </div>
    </>
  )
}

/** Box / Voice segmented switch with a white pill that glides between tabs. */
function ProductTabs({
  value,
  onChange,
}: {
  value: 'box' | 'voice'
  onChange: (v: 'box' | 'voice') => void
}) {
  return (
    <div className="relative inline-flex shrink-0 rounded-full border border-line bg-white/[0.03] p-0.5">
      {(['box', 'voice'] as const).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-pressed={value === p}
          className={cn(
            'relative inline-flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full px-4 py-2 text-[13px] font-medium capitalize transition-colors duration-200 sm:min-h-[36px] sm:px-3.5 sm:py-1.5 lg:min-h-0 lg:min-w-0 lg:px-3 lg:py-1 lg:text-[12px]',
            value === p ? 'text-[#0a0a0a]' : 'text-faint hover:text-ink',
          )}
        >
          {value === p && (
            <motion.span
              layoutId="download-tab-pill"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-[1]">{p}</span>
        </button>
      ))}
    </div>
  )
}



