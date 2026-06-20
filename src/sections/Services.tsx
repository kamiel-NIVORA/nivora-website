import { type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SERVICES, type NavItem } from '@/lib/navigation'

/** Soft luminous backdrop — lives in /public, served from the site root. */
const GLOW = '/IMG_0479.JPG'

/** Per-service line icons (white glyphs, no frame), keyed by service title. */
const ICONS: Record<string, string> = {
  'App Design': '/icon-appdesign.png',
  'Local AI': '/icon-localai.png',
  AIOS: '/icon-aios.png',
  'AI Consulting': '/icon-consulting.png',
}

/**
 * Our Services — four free-standing glass cards floating on a soft glow.
 *
 * Each card tilts in 3D toward the cursor (spring-driven rotateX/rotateY under a
 * perspective parent), and the icon, name and button sit on raised translateZ
 * planes so they lift off the surface as it tilts. No wrapping panel: the cards
 * stand on their own over an ambient, lightly blurred glow that fades into the
 * black at the edges. The glass keeps a light frosted blur so the glow reads
 * through it softly.
 */
export function Services() {
  return (
    <section id="services" className="relative w-full overflow-hidden py-28 lg:py-36">
      {/* Ambient glow — softly blurred, spread across the section, masked into the dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={GLOW}
          alt=""
          className="absolute left-1/2 top-1/2 h-[108%] w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-60 blur-[3px] [mask-image:radial-gradient(54%_52%_at_50%_50%,black_26%,transparent_78%)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Tell us the challenge. We design, build, and install exactly what your business needs."
        />

        {/* Four free-standing cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.08}>
              <ServiceCard service={s} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: NavItem; index: number }) {
  const { title, desc, href } = service
  const icon = ICONS[title]

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

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.a
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-[22px] border border-line bg-gradient-to-b from-white/[0.10] via-white/[0.05] to-white/[0.02] p-6 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)] lg:min-h-[440px] lg:p-7"
      >
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
        {/* Quiet index in the opposite corner */}
        <span
          style={{ transform: 'translateZ(35px)' }}
          className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.12em] text-dim"
        >
          {String(index).padStart(2, '0')}
        </span>

        {/* Middle: just the service name, in our serif */}
        <div
          style={{ transform: 'translateZ(55px)' }}
          className="relative flex flex-1 items-center justify-center px-1 pt-6"
        >
          <h3 className="text-center font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[29px]">
            {title}
          </h3>
        </div>

        {/* Bottom: a short line + a button through to the service page */}
        <div style={{ transform: 'translateZ(35px)' }} className="relative">
          {desc && (
            <p className="text-[13px] leading-relaxed text-faint">{desc}</p>
          )}
          <span className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-line bg-white/[0.06] px-4 text-[13px] font-medium text-ink-soft transition-colors group-hover:bg-white/[0.10]">
            Learn more
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </span>
        </div>
      </motion.a>
    </div>
  )
}
