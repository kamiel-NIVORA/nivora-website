import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SERVICES, type NavItem } from '@/lib/navigation'

/** Card is a motion-wrapped router Link so the tilt works and navigation is client-side. */
const MotionLink = motion.create(Link)

/** Soft luminous backdrop — lives in /public, served from the site root.
 *  Clean B&W peak, kept sharp and masked into the dark behind the cards. */
const GLOW = '/bg-peak-stars.jpg'

/** Per-service line icons (white glyphs, no frame), keyed by service title. */
const ICONS: Record<string, string> = {
  'App Design': '/icon-appdesign.png',
  'Local AI': '/icon-localai.png',
  AIOS: '/icon-aios.png',
  'AI Consulting': '/icon-consulting.png',
}

/**
 * Our Services — four free-standing frosted-glass cards over a sharp peak.
 *
 * Each card is a real frosted-glass panel: a `backdrop-blur` genuinely blurs the
 * sharp peak behind it (same technique as the navbar/contact glass), with a dark
 * translucent tint on top so the white serif stays legible over the bright snow.
 * The peak stays crisp in the gaps BETWEEN the cards. No 3D tilt — a 3D transform
 * makes browsers drop `backdrop-filter` entirely, so the cards use a flat 2D
 * hover-lift instead, which keeps the blur intact.
 */
export function Services() {
  return (
    <section id="services" className="relative w-full overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto w-full max-w-[1400px] px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Tell us the challenge. We design, build, and install exactly what your business needs."
        />

        {/* Cards band. The sharp peak backdrop is confined to EXACTLY this row
            (overflow-hidden), so it never bleeds up into the heading above. The
            cards' own backdrop-blur is the ONLY blur, so in the gaps BETWEEN the
            cards the image stays crisp. */}
        <div className="relative mt-16">
          {/* Sharp backdrop, clipped to the band: peak centred, the star sky on top
              and the watermark on the bottom-right both cropped out, edges faded
              softly into the black. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={GLOW}
              alt=""
              className="h-full w-full object-cover object-[50%_46%] opacity-[0.55] [mask-image:radial-gradient(88%_84%_at_50%_50%,black_44%,transparent_90%)]"
            />
          </div>

          {/* Four free-standing cards, lifted above the backdrop */}
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.08}>
                <ServiceCard service={s} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: NavItem; index: number }) {
  const { title, desc, href } = service
  const icon = ICONS[title]

  return (
    <MotionLink
      to={href}
      className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-[22px] border border-line bg-white/[0.04] p-6 backdrop-blur-2xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)] lg:min-h-[440px] lg:p-7"
    >
      {/* Frosted tint — a dark translucent fill over the (genuinely) blurred peak,
          so the white serif stays legible against the bright snow. The blur itself
          comes from the card's backdrop-filter above. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/35 via-[#0a0a0d]/30 to-[#0a0a0d]/55" />

      {/* Gloss — the same frosted feel as the header: a diagonal sheen + top hairline */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Service icon — bare white glyph, no frame, tucked into the corner */}
      {icon && (
        <img
          src={icon}
          alt={title}
          className="absolute left-5 top-5 h-10 w-10 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
          loading="lazy"
        />
      )}
      {/* Quiet index in the opposite corner */}
      <span className="absolute right-5 top-5 font-mono text-[11px] tracking-[0.12em] text-dim">
        {String(index).padStart(2, '0')}
      </span>

      {/* Middle: just the service name, in our serif */}
      <div className="relative flex flex-1 items-center justify-center px-1 pt-6">
        <h3 className="text-center font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[29px]">
          {title}
        </h3>
      </div>

      {/* Bottom: a short line + a button through to the service page */}
      <div className="relative">
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
    </MotionLink>
  )
}
