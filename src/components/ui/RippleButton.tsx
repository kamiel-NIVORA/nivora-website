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
 *   That still leaves ONE white source while hovered: the layer's own
 *   anti-aliased curve. Its edge pixels blend white into the pill's rounded
 *   ends underneath the ripple, which reads as a thin white line at the left
 *   and right of the filled (black) button. So while hovered, the layer itself
 *   fades to the fill colour too — DELAYED so the ripple leads and no grey rim
 *   trails the circle — and snaps back quickly on leave, under the shrinking
 *   ripple. The steady hover state contains zero white pixels.
 *
 *  - `solid` — white pill that fills BLACK from the cursor (primary CTA).
 *  - `ghost` — transparent, hairline-bordered pill that fills a soft light
 *    from the cursor (secondary CTA, e.g. "Contact Us").
 */
/* Hover colour shifts are gated to real hover devices: on touch a :hover can
   stick after a tap and would leave the solid pill's label white-on-white. */
const CAN_HOVER = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

const VARIANTS: Record<Variant, { surface: string; text: string; layer?: string; fill: string }> = {
  solid: { surface: 'bg-[#0a0a0a]', text: 'text-[#0a0a0a] [@media(hover:hover)]:hover:text-white', layer: 'bg-ink', fill: '#0a0a0a' },
  ghost: { surface: 'bg-transparent', text: 'border border-line text-muted [@media(hover:hover)]:hover:text-ink', fill: 'rgba(255,255,255,0.09)' },
}

export function RippleButton({
  children,
  href = '#contact',
  variant = 'solid',
  className,
  onClick,
  target,
  rel,
  type,
  disabled,
  as,
}: {
  children: React.ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: (e: React.MouseEvent) => void
  target?: string
  rel?: string
  /** When set, renders a real <button> (e.g. a form submit) instead of an <a>. */
  type?: 'submit' | 'button'
  disabled?: boolean
  /** Render as a non-navigating <span> so the fill effect can live INSIDE another
   *  link (an anchor cannot be nested). The wrapping link owns the click. */
  as?: 'span'
}) {
  const ref = useRef<HTMLElement>(null)
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

  const classes = cn(
    'relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full px-4 text-[13px] font-medium transition-[color] duration-500',
    surface,
    text,
    disabled && 'cursor-not-allowed opacity-70',
    className,
  )

  const hover = {
    onMouseEnter: (e: React.MouseEvent) => {
      if (!CAN_HOVER || hovered || !ref.current) return
      setHovered(true)
      setRipple({ ...at(e), key: Date.now() })
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setHovered(false)
      if (!ref.current) return
      setRipple({ ...at(e), key: Date.now(), isLeaving: true })
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!ref.current || !hovered) return
      setRipple((prev) => (prev ? { ...prev, ...at(e) } : null))
    },
  }

  const inner = (
    <>
      {layer && (
        <span
          className={cn(
            'pointer-events-none absolute inset-0 z-0 rounded-full transition-[background-color]',
            layer,
            hovered ? 'bg-[#0a0a0a] delay-200 duration-300' : 'delay-0 duration-150',
          )}
        />
      )}
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
    </>
  )

  if (as === 'span') {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onClick={onClick}
        className={classes}
        {...hover}
      >
        {inner}
      </span>
    )
  }

  if (type) {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        {...hover}
      >
        {inner}
      </button>
    )
  }

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={classes}
      {...hover}
    >
      {inner}
    </a>
  )
}
