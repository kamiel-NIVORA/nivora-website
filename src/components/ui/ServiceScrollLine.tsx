import { motion, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * The light-grey thread that follows the scroll down a service page.
 *
 * Adapted from the Skiper19 svg-follow-scroll technique (a motion.path whose
 * `pathLength` is tied to scroll progress), but neutral and quiet:
 *  1. a soft organic curve in the hero that draws itself as you start scrolling,
 *  2. a thin vertical "spine" that fills from the hero down to the final CTA,
 *     with a faint glowing head dot riding the leading edge.
 *
 * Desktop-only (the spine lives on the page's centre line, where the process
 * timeline dots sit). Honours prefers-reduced-motion by drawing fully, statically.
 */
export function ServiceScrollLine({ progress }: { progress: MotionValue<number> }) {
  const reduced = usePrefersReducedMotion()

  // Hero curve draws over the first slice of scroll.
  const curveLength = useTransform(progress, [0, 0.1], [0.22, 1])
  // Spine fills the whole way; head dot rides the leading edge.
  const headTop = useTransform(progress, [0, 1], ['0%', '100%'])
  const headOpacity = useTransform(progress, [0, 0.015, 0.97, 1], [0, 1, 1, 0])

  const stroke = 'rgba(255,255,255,0.16)'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      {/* Hero curve — a quiet organic line that draws in, flowing to centre-bottom */}
      <svg
        className="absolute left-1/2 top-[6vh] h-[82vh] w-[min(1080px,94vw)] -translate-x-1/2"
        viewBox="0 0 1100 800"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M660 0 C 642 168 786 300 650 432 C 545 534 548 660 550 800"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          style={{ pathLength: reduced ? 1 : curveLength }}
        />
      </svg>

      {/* Vertical spine — from the hero down to the final CTA */}
      <div className="absolute bottom-0 left-1/2 top-[78vh] w-px -translate-x-1/2">
        {/* faint rail (the whole, undrawn thread) */}
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.05)' }} />
        {/* drawn fill — grows with scroll */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top"
          style={{ scaleY: reduced ? 1 : progress, background: stroke }}
        />
        {/* glowing head dot on the leading edge */}
        {!reduced && (
          <motion.div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              top: headTop,
              opacity: headOpacity,
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 0 14px 2px rgba(255,255,255,0.35)',
            }}
          />
        )}
      </div>
    </div>
  )
}
