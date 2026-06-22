import { useEffect, useRef } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Mic } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Voice card visual — Wispr-Flow-style "slingers": loose ribbons of text that
 * curve across the card and flow continuously, like speech being captured.
 *
 * The story reads left-to-right: faint, run-on spoken words drift in (the raw
 * stream), pass through a calm listening pill in the centre, and resolve into
 * one crisp, light ribbon of clean copy. Voice becomes polished writing.
 *
 * Each streamer is real text laid on an SVG path; we scroll it by animating
 * `startOffset`. To loop with no visible seam we shift by exactly the measured
 * length of one repeating unit, so the glyph pattern lands back on itself. The
 * card's edges fade to nothing, so streamers dissolve in and out at the sides.
 * Honors `prefers-reduced-motion` (everything settles into a quiet still frame).
 */

/* viewBox the streamers are drawn in. The SVG is sliced to cover the card, so
   paths run past x=0..1000 to enter and leave off-screen. */
const VB_W = 1000
const VB_H = 400

type Dir = 'left' | 'right'

type StreamerSpec = {
  id: string
  d: string
  /** the repeating text unit (its trailing spacer is part of the loop) */
  unit: string
  fontSize: number
  dur: number
  dir: Dir
  /** text colour / weight classes */
  textClassName: string
  /** optional solid band drawn under the text (the "clean output" ribbon) */
  band?: { width: number; className: string }
  /** copies of the unit rendered along the path (enough to overrun it) */
  repeat?: number
  letterSpacing?: number
}

const SPACER = '  ' // two em-spaces between repeats

const STREAMERS: StreamerSpec[] = [
  // Ghost — ultra-faint filler murmur, highest and slowest, drifting against
  // the flow for a touch of parallax depth.
  {
    id: 'sling-ghost',
    d: 'M -140 66 C 180 22 400 104 620 74 S 1000 28 1140 90',
    unit: 'um so basically the thing is like you know what i mean right so anyway',
    fontSize: 21,
    dur: 46,
    dir: 'left',
    textClassName: 'fill-white/[0.08]',
    repeat: 7,
  },
  // Raw speech — the messy spoken stream flowing in toward the pill (above it).
  {
    id: 'sling-raw',
    d: 'M -140 140 C 180 98 430 166 660 130 S 1010 92 1140 150',
    unit: "so can you check in with the team and see if yesterday's notes are ready by friday although it might slip",
    fontSize: 22,
    dur: 28,
    dir: 'right',
    textClassName: 'fill-white/[0.17]',
    repeat: 6,
  },
  // Clean output — the crisp, light ribbon of polished copy, flowing out below
  // the pill. The payoff: speech resolved into clean, structured writing.
  {
    id: 'sling-clean',
    d: 'M -140 312 C 210 358 470 298 710 326 S 1030 362 1140 300',
    unit: "Check in with the team.   Confirm Friday's deadline.   Share yesterday's notes.",
    fontSize: 19,
    dur: 32,
    dir: 'right',
    textClassName: 'fill-[#0b0b0b] font-medium',
    band: { width: 38, className: 'stroke-white/90' },
    repeat: 6,
    letterSpacing: 0.2,
  },
]

function Streamer({
  spec,
  reduced,
  inView,
}: {
  spec: StreamerSpec
  reduced: boolean
  inView: boolean
}) {
  const textPathRef = useRef<SVGTextPathElement>(null)
  const measureRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const tp = textPathRef.current
    const measure = measureRef.current
    if (!tp || !measure) return

    let controls: ReturnType<typeof animate> | undefined
    let cancelled = false

    // (Re)measure against the real font, then (re)start — idempotent. Measuring
    // only after the web font is actually loaded is what keeps the loop
    // seamless: a fallback-metric measurement would make the shift miss one
    // repeat period and show a jump every cycle.
    const apply = () => {
      if (cancelled) return
      controls?.stop()
      const unitLen = measure.getComputedTextLength()
      if (!unitLen) return
      if (reduced) {
        // Quiet, settled frame — parked mid-phrase, no motion.
        tp.setAttribute('startOffset', String(-unitLen / 2))
        return
      }
      if (!inView) return // off-screen: leave the last frame, spend no rAF
      const to = spec.dir === 'left' ? -unitLen : unitLen
      controls = animate(0, to, {
        duration: spec.dur,
        ease: 'linear',
        repeat: Infinity,
        onUpdate: (v) => tp.setAttribute('startOffset', String(v)),
      })
    }

    // Gate on the exact Inter weights in use (400 + 500) so a cold paint never
    // bakes in fallback metrics; fall back to measuring immediately.
    const fonts = document.fonts
    if (fonts?.load) {
      Promise.all([
        fonts.load(`${spec.fontSize}px "Inter"`),
        fonts.load(`500 ${spec.fontSize}px "Inter"`),
      ]).then(apply, apply)
    } else {
      apply()
    }

    return () => {
      cancelled = true
      controls?.stop()
    }
  }, [reduced, inView, spec.dir, spec.dur, spec.fontSize])

  const repeated = (spec.unit + SPACER).repeat(spec.repeat ?? 6)
  const measured = spec.unit + SPACER

  return (
    <g>
      <path id={spec.id} d={spec.d} fill="none" />
      {spec.band && (
        <path
          d={spec.d}
          fill="none"
          className={spec.band.className}
          strokeWidth={spec.band.width}
          strokeLinecap="round"
        />
      )}
      <text
        fontSize={spec.fontSize}
        dominantBaseline="middle"
        className={spec.textClassName}
        style={spec.letterSpacing ? { letterSpacing: `${spec.letterSpacing}px` } : undefined}
      >
        <textPath ref={textPathRef} href={`#${spec.id}`} startOffset="0">
          {repeated}
        </textPath>
      </text>
      {/* Hidden single unit — measured so the loop shifts by exactly one repeat.
          Must carry the SAME font class (weight) and letter-spacing as the
          visible text, or the measured width drifts and the loop shows a seam. */}
      <text
        ref={measureRef}
        fontSize={spec.fontSize}
        visibility="hidden"
        x={-9999}
        className={spec.textClassName}
        style={spec.letterSpacing ? { letterSpacing: `${spec.letterSpacing}px` } : undefined}
      >
        {measured}
      </text>
    </g>
  )
}

/** Per-bar peak — gives the waveform an uneven, lively profile. */
const BARS = [0.45, 0.85, 0.55, 1, 0.6, 0.92, 0.48, 0.78, 1, 0.52, 0.88, 0.6, 0.95, 0.5]

function Pill({ active }: { active: boolean }) {
  return (
    <div
      className="relative flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.12] px-4 py-2.5 backdrop-blur-md"
      style={{
        boxShadow: 'inset 1px 1px 1.5px rgba(255,255,255,0.4), 0 16px 40px rgba(0,0,0,0.45)',
      }}
    >
      <span
        className={
          'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-white ' +
          (active ? 'animate-pulse' : '')
        }
      >
        <Mic className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      <div className="flex h-6 items-center gap-[3px]">
        {BARS.map((peak, i) =>
          active ? (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-white/85"
              style={{ height: 22, originY: 0.5 }}
              initial={{ scaleY: 0.25 }}
              animate={{ scaleY: [0.25, peak, 0.25] }}
              transition={{
                duration: 0.8 + (i % 5) * 0.13,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.05,
              }}
            />
          ) : (
            <span
              key={i}
              className="w-[3px] rounded-full bg-white/45"
              style={{ height: Math.max(5, peak * 12) }}
            />
          ),
        )}
      </div>
    </div>
  )
}

export function VoiceSlingers() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  // Idle every loop while the section is off-screen, like BoxConverge.
  const inView = useInView(rootRef, { amount: 0.3 })

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Soft focal glow behind the pill so it lifts off the streamers. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,167,102,0.16),transparent)] blur-[2px]"
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_13%,black_87%,transparent)]"
        aria-hidden
      >
        {STREAMERS.map((spec) => (
          <Streamer key={spec.id} spec={spec} reduced={reduced} inView={inView} />
        ))}
      </svg>

      {/* Listening pill — the calm centre where speech is captured. */}
      <div className="absolute inset-0 grid place-items-center">
        <Pill active={inView && !reduced} />
      </div>
    </div>
  )
}
