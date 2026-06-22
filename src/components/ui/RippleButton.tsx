import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Ripple = { x: number; y: number; size: number; key: number; isLeaving?: boolean }

type Variant = 'solid' | 'ghost'

/**
 * Pill that fills from the cursor on hover.
 *
 * The fill is a single expanding circle over an UNCHANGED base — the base
 * colour never animates, so no intermediate-tone rim trails the circle (the
 * old version faded the base via `transition-colors`, which left a faint grey
 * fringe). Only the text colour eases.
 *
 * Killing the white hairline at the edge — the key detail:
 *   `overflow-hidden rounded-full` anti-aliases the rounded corners against
 *   whatever shows THROUGH the pill there. An element's own background-color is
 *   clipped by its own border-radius, so we paint the `<a>` itself the FILL
 *   colour (near-black) and put the resting face (white for `solid`) in an
 *   absolute `layer` span on top. The ripple then covers that layer on hover,
 *   and because the element's own background is already black, the corners
 *   stay black no matter what sits behind the button — no white/light rim.
 *
 *  - `solid` — white pill that fills BLACK from the cursor (primary CTA).
 *  - `ghost` — transparent, hairline-bordered pill that fills a soft light
 *    from the cursor (secondary CTA, e.g. "Contact Us").
 */
const VARIANTS: Record<Variant, { surface: string; text: string; layer?: string; fill: string }> = {
  solid: { surface: 'bg-[#0a0a0a]', text: 'text-[#0a0a0a] hover:text-white', layer: 'bg-ink', fill: '#0a0a0a' },
  ghost: { surface: 'bg-transparent', text: 'border border-line text-muted hover:text-ink', fill: 'rgba(255,255,255,0.09)' },
}

export function RippleButton({
  children,
  href = '#contact',
  variant = 'solid',
  className,
  onClick,
  target,
  rel,
}: {
  children: React.ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: (e: React.MouseEvent) => void
  target?: string
  rel?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [ripple, setRipple] = useState<Ripple | null>(null)
  const [hovered, setHovered] = useState(false)
  const { surface, text, layer, fill } = VARIANTS[variant]

  const at = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      // diagonal * 2.4 guarantees the fill reaches every corner cleanly,
      // even when the cursor enters at an extreme edge
      size: Math.hypot(rect.width, rect.height) * 2.4,
    }
  }

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={cn(
        'relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full px-4 text-[13px] font-medium transition-[color] duration-500',
        surface,
        text,
        className,
      )}
      onMouseEnter={(e) => {
        if (hovered || !ref.current) return
        setHovered(true)
        setRipple({ ...at(e), key: Date.now() })
      }}
      onMouseLeave={(e) => {
        setHovered(false)
        if (!ref.current) return
        setRipple({ ...at(e), key: Date.now(), isLeaving: true })
      }}
      onMouseMove={(e) => {
        if (!ref.current || !hovered) return
        setRipple((prev) => (prev ? { ...prev, ...at(e) } : null))
      }}
    >
      {layer && <span className={cn('pointer-events-none absolute inset-0 z-0 rounded-full', layer)} />}
      <span className="relative z-[2]">{children}</span>
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            className="pointer-events-none absolute z-[1] rounded-full [transform:translateZ(0)]"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              backgroundColor: fill,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: ripple.isLeaving ? 0 : 1, x: '-50%', y: '-50%' }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => {
              if (ripple.isLeaving) setRipple(null)
            }}
          />
        )}
      </AnimatePresence>
    </a>
  )
}
