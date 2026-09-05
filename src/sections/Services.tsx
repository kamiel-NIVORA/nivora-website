import { useLayoutEffect, useRef, useState, type MouseEvent, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RippleButton } from '@/components/ui/RippleButton'
import { getServices, type NavItem } from '@/lib/navigation'
import { useIsMobile } from '@/lib/useIsMobile'
import { useLang, localizePath } from '@/i18n'

const COPY = {
  en: {
    title: 'Our Services',
    subtitle: 'Tell us the challenge. We design, build, and install exactly what your business needs.',
    learnMore: 'Learn more',
  },
  nl: {
    title: 'Onze diensten',
    subtitle: 'Vertel ons jullie uitdagingen. Wij ontwerpen, bouwen en installeren precies wat uw bedrijf nodig heeft.',
    learnMore: 'Lees meer',
  },
} as const

/** Card is a motion-wrapped router Link so the tilt works and navigation is client-side. */
const MotionLink = motion.create(Link)

/** Soft luminous backdrop — lives in /public, served from the site root.
 *  Clean B&W peak; kept SHARP in the gaps, blurred only through the glass cards. */
const GLOW = '/backgrounds/bg-peak-stars.webp'
const GLOW_W = 1199
const GLOW_H = 750
/** object-position used by BOTH the sharp band image and the per-card blurred copy,
 *  so the blurred peak inside a card lines up with the sharp peak in the gaps. */
const POS_X = 0.5
const POS_Y = 0.46

/** Per-service line icons (white glyphs, no frame), keyed by service title. */
const ICONS: Record<string, string> = {
  'App Design': '/services/icon-appdesign.png',
  'Local AI': '/services/icon-localai.png',
  AIOS: '/services/icon-aios.png',
  'AI Consulting': '/services/icon-consulting.png',
}

/**
 * Our Services — four free-standing glass cards over a sharp peak.
 *
 * Each card tilts in 3D toward the cursor (spring-driven rotateX/rotateY on a
 * perspective parent), with the icon, name and button on raised translateZ planes
 * so they lift off the surface. The cards are frosted glass: real `backdrop-filter`
 * is dropped by browsers under a 3D transform, so instead each card carries a
 * blurred copy of the peak, sized + offset to line up exactly with the sharp peak
 * behind it. The result reads as genuine frosted glass that blurs the mountain,
 * while the gaps BETWEEN the cards stay crisp.
 */
export function Services() {
  const bandRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const t = COPY[lang]
  const isMobile = useIsMobile()
  const services = getServices(lang)

  return (
    /* data-shared: identical on every page that renders this section, so the
       content guard in scripts/prerender.mjs excludes it when measuring how
       much of a page is written for that page. */
    <section id="services" data-shared className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-36">
      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <SectionHeading title={t.title} subtitle={t.subtitle} />

        {/* Cards band. The sharp peak backdrop is confined to EXACTLY this row
            (overflow-hidden), so it never bleeds up into the heading above. */}
        <div ref={bandRef} className="relative mt-10 sm:mt-16">
          {/* Sharp backdrop, clipped to the band: peak centred, the star sky on top
              and the watermark on the bottom-right both cropped out, edges faded
              softly into the black. Shown crisp in the gaps between the cards. */}
          {/* The peak backdrop reads as noise behind the cards on a small screen, so
              it is desktop-only. Not rendered on mobile (not just hidden) so the heavy
              image never downloads there — the cards stand clean on black anyway. */}
          {!isMobile && (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                src={GLOW}
                alt=""
                className="h-full w-full object-cover object-[50%_46%] opacity-[0.55] [mask-image:radial-gradient(88%_84%_at_50%_50%,black_44%,transparent_90%)]"
              />
            </div>
          )}

          {/* Four free-standing cards, lifted above the backdrop */}
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.08}>
                <ServiceCard service={s} bandRef={bandRef} learnMore={t.learnMore} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Layout offset of `el` relative to `ancestor`, ignoring any transforms in between
 *  (uses offsetLeft/offsetTop, so it stays correct during the reveal's translateY). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

type Frost = { w: number; h: number; left: number; top: number }

function ServiceCard({
  service,
  bandRef,
  learnMore,
}: {
  service: NavItem
  bandRef: RefObject<HTMLDivElement | null>
  learnMore: string
}) {
  const { title, desc, href } = service
  const { lang } = useLang()
  const icon = ICONS[title]
  const cardRef = useRef<HTMLAnchorElement>(null)

  // ── 3D tilt toward the cursor ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { damping: 18, stiffness: 160 }
  const sx = useSpring(mouseX, spring)
  const sy = useSpring(mouseY, spring)
  const rotateX = useTransform(sy, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // ── Frosted blur: a blurred peak copy, sized to the band and offset so it lines
  //    up with the sharp background behind THIS card (same cover-scale + position). ──
  const isMobile = useIsMobile()
  const [frost, setFrost] = useState<Frost | null>(null)
  useLayoutEffect(() => {
    if (isMobile) return // no frosted-peak copy on mobile (the backdrop isn't shown there)
    const band = bandRef.current
    const card = cardRef.current
    if (!band || !card) return

    const measure = () => {
      const bw = band.offsetWidth
      const bh = band.offsetHeight
      const scale = Math.max(bw / GLOW_W, bh / GLOW_H)
      const sw = GLOW_W * scale
      const sh = GLOW_H * scale
      const bandX = (bw - sw) * POS_X
      const bandY = (bh - sh) * POS_Y
      const { x: cardX, y: cardY } = offsetWithin(card, band)
      setFrost({ w: sw, h: sh, left: bandX - cardX, top: bandY - cardY })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [bandRef, isMobile])

  return (
    <div style={{ perspective: '1000px' }}>
      <MotionLink
        ref={cardRef}
        to={localizePath(href, lang)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[22px] border border-line bg-[#101014] p-6 transition-[border-color,box-shadow] duration-300 [@media(hover:none)]:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)] [@media(hover:hover)]:hover:border-line-strong [@media(hover:hover)]:hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)] sm:min-h-[340px] lg:min-h-[440px] lg:bg-[#0b0b0f]/30 lg:p-7"
      >
        {/* Blurred peak, aligned to the sharp background behind the card — the frost */}
        {frost && !isMobile && (
          <img
            src={GLOW}
            alt=""
            aria-hidden
            style={{ width: frost.w, height: frost.h, left: frost.left, top: frost.top }}
            className="pointer-events-none absolute max-w-none object-cover opacity-[0.7] blur-2xl"
          />
        )}

        {/* Frosted tint — keeps the white serif legible over the bright, blurred snow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/35 via-[#0a0a0d]/30 to-[#0a0a0d]/55" />

        {/* Gloss — the same frosted feel as the header: a diagonal sheen + top hairline */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Service icon — bare white glyph, no frame, tucked into the corner and
            lifted off the surface */}
        {icon && (
          <img
            src={icon}
            alt={title}
            style={{ transform: 'translateZ(45px)' }}
            className="absolute left-5 top-5 h-10 w-10 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            loading="lazy"
          />
        )}

        {/* Middle: just the service name, in our serif */}
        <div
          style={{ transform: 'translateZ(55px)' }}
          className="relative flex flex-1 items-center justify-center px-1 pt-6"
        >
          <h3 className="text-center font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[29px]">
            {title}
          </h3>
        </div>

        {/* Bottom: a short line + a plain "Learn more" pill (no trailing arrow) to the service page */}
        <div style={{ transform: 'translateZ(35px)' }} className="relative">
          {desc && (
            <p className="text-[13px] leading-relaxed text-faint">{desc}</p>
          )}
          <RippleButton as="span" variant="ghost" className="mt-4">
            {learnMore}
          </RippleButton>
        </div>
      </MotionLink>
    </div>
  )
}
