import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Voice card visual — ONE clean wave.
 *
 * A single ribbon of words flows across the whole card on a gentle wave. On the
 * left it reads loose and dim (raw speech); it fades as it passes behind the
 * Nivora mark at the centre, then emerges bright and clean on the right (polished
 * copy). Speech in, clean writing out, through Nivora.
 *
 * The flow is real text on an SVG path, scrolled by animating `startOffset`. It
 * loops with no seam because it shifts by exactly one MEASURED repeat-unit
 * length (measured only after the web font loads, so cold paints don't bake in a
 * jump). Idles off-screen (`useInView`) and respects `prefers-reduced-motion`.
 */

const NIVORA_MARK = '/nivora-mark-dark.png'

const VB_W = 1000
const VB_H = 420

/* One smooth wave, run past both edges so the text dissolves into the fades. */
const WAVE = 'M -180 206 C 70 138 250 138 430 206 S 720 296 850 222 S 1090 150 1180 208'

/* The repeating line — clean sentences; the fill gradient does the raw→polished
   feel, so the same words read dim on the left and crisp on the right. */
const UNIT =
  "Send the recap to the team.   Add a follow-up for Friday.   Confirm the deadline.   Share yesterday's notes.   "
const REPEAT = 6
const FONT_SIZE = 21
const DURATION = 30

export function VoiceSlingers() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const measureRef = useRef<SVGTextElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })

  useEffect(() => {
    const tp = textPathRef.current
    const measure = measureRef.current
    if (!tp || !measure) return

    let controls: ReturnType<typeof animate> | undefined
    let cancelled = false

    // (Re)measure against the real font, then (re)start — idempotent. Measuring
    // only after the web font is in use keeps the loop seamless; a fallback
    // measurement would make the shift miss one repeat period and jump.
    const apply = () => {
      if (cancelled) return
      controls?.stop()
      const unitLen = measure.getComputedTextLength()
      if (!unitLen) return
      if (reduced || !inView) {
        tp.setAttribute('startOffset', String(-unitLen / 2))
        return
      }
      controls = animate(0, -unitLen, {
        duration: DURATION,
        ease: 'linear',
        repeat: Infinity,
        onUpdate: (v) => tp.setAttribute('startOffset', String(v)),
      })
    }

    const fonts = document.fonts
    if (fonts?.load) {
      fonts.load(`${FONT_SIZE}px "Inter"`).then(apply, apply)
    } else {
      apply()
    }

    return () => {
      cancelled = true
      controls?.stop()
    }
  }, [reduced, inView])

  const repeated = UNIT.repeat(REPEAT)

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Soft focal glow behind the node so it lifts off the wave. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,167,102,0.18),transparent)] blur-[2px]"
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden
      >
        <defs>
          {/* Raw + dim on the left, dips into the node, crisp + bright on the right. */}
          <linearGradient id="voice-wave-grad" gradientUnits="userSpaceOnUse" x1="120" y1="0" x2="880" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="0.34" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="0.47" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="0.78" stopColor="#ffffff" stopOpacity="0.82" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.92" />
          </linearGradient>
        </defs>

        <path id="voice-wave-path" d={WAVE} fill="none" />
        <text
          fontSize={FONT_SIZE}
          dominantBaseline="middle"
          fill="url(#voice-wave-grad)"
          style={{ letterSpacing: '0.2px' }}
        >
          <textPath ref={textPathRef} href="#voice-wave-path" startOffset="0">
            {repeated}
          </textPath>
        </text>

        {/* Hidden single unit — measured so the loop shifts by exactly one repeat. */}
        <text
          ref={measureRef}
          fontSize={FONT_SIZE}
          visibility="hidden"
          x={-9999}
          style={{ letterSpacing: '0.2px' }}
        >
          {UNIT}
        </text>
      </svg>

      {/* The Nivora node — the wave passes behind it. */}
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_18px_44px_-10px_rgba(0,0,0,0.7)] ring-1 ring-black/5"
        >
          <img src={NIVORA_MARK} alt="" className="h-[26px] w-auto" />
        </span>
      </div>
    </div>
  )
}
