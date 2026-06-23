import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { Check, Sparkles, type LucideIcon } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/** CSS style that also carries custom properties (e.g. --bar-min). */
type VarStyle = CSSProperties & Record<`--${string}`, string | number>

/**
 * Voice card visual — speech in, clean writing out (Wispr-style ribbon).
 *
 * Raw dictation streams in low from the bottom-LEFT: dim, lowercase, full of
 * stutters and filler ("the the", "um", no punctuation). It passes through a
 * live waveform node near the bottom and emerges riding a bold dark RIBBON
 * (olive-edged, lifted off the card) that sweeps up to the right, now crisp
 * WHITE, properly punctuated copy. Pills pop above the node naming each fix.
 *
 * Both text streams are real text on one SVG path, scrolled by animating
 * `startOffset`. Each loops seamlessly by shifting exactly one MEASURED repeat
 * unit (measured only after the web font loads, so cold paints don't bake in a
 * jump), and both move at the same pixel speed so the flow reads as one motion.
 * The ribbon is a static thick stroke on the right of the same path, so the
 * clean text rides it exactly. Idles off-screen, respects reduced-motion.
 */

const VB_W = 1000
const VB_H = 420

/* Full path: gentle in from the lower left, through the node near the bottom at
   ~(500, 350), then a smooth swoop up to the right. No lumps. */
const WAVE =
  'M -120 392 C 160 380 330 364 500 352 C 664 340 772 266 902 212 C 1004 174 1094 156 1190 146'
/* Right half only — the bold ribbon the clean copy rides on (starts at the node). */
const RIBBON = 'M 500 352 C 664 340 772 266 902 212 C 1004 174 1094 156 1190 146'

/* Raw speech (left): lowercase, a filler, a stutter, a grammar slip, no punctuation. */
const RAW =
  "so um i think their going to handle the the first part but i'm not totally sure   also i told the team the new timeline   "
/* Clean copy (right): grammar fixed, filler and repeat gone, real punctuation. */
const CLEAN =
  "So, I think they're going to handle the first part, but I'm not totally sure. Also, I told the team the new timeline is set.   "

const REPEAT = 3
const FONT_SIZE = 20
const SPEED = 24 // px/second — both streams share it, so the flow reads as one motion

/* The fixes Nivora calls out, popping above the node in turn. */
const FIXES: { icon: LucideIcon; label: string }[] = [
  { icon: Check, label: 'Removed repetition' },
  { icon: Check, label: 'Fixed grammar' },
  { icon: Check, label: 'Added question mark' },
  { icon: Sparkles, label: 'Polished the copy' },
]

/* Equaliser profile — taller in the middle so the resting node reads as a voice. */
const BARS = [0.34, 0.5, 0.42, 0.66, 0.82, 0.58, 0.94, 0.72, 1, 0.72, 0.94, 0.58, 0.82, 0.66, 0.42, 0.5, 0.34]
const BAR_TRACK = 24 // px, the tallest a bar can reach inside the pill

export function VoiceSlingers() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const rawPathRef = useRef<SVGTextPathElement>(null)
  const cleanPathRef = useRef<SVGTextPathElement>(null)
  const rawMeasureRef = useRef<SVGTextElement>(null)
  const cleanMeasureRef = useRef<SVGTextElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })
  const [fix, setFix] = useState(0)

  // ── Flowing text — measure each repeat unit against the real font, then loop ──
  useEffect(() => {
    const streams = [
      { tp: rawPathRef.current, m: rawMeasureRef.current },
      { tp: cleanPathRef.current, m: cleanMeasureRef.current },
    ]
    if (streams.some((s) => !s.tp || !s.m)) return

    let controls: ReturnType<typeof animate>[] = []
    let cancelled = false

    // (Re)measure + (re)start — idempotent. Shifting by exactly one MEASURED unit
    // keeps the loop seamless; measuring only once the web font is live avoids a
    // cold-paint jump. startOffset runs -unit → 0 so glyphs travel rightward:
    // raw flows in from the left and dissolves at the node, clean rides the ribbon up.
    const apply = () => {
      if (cancelled) return
      controls.forEach((c) => c.stop())
      controls = []
      for (const { tp, m } of streams) {
        const unit = m!.getComputedTextLength()
        if (!unit) continue
        if (reduced || !inView) {
          tp!.setAttribute('startOffset', String(-unit / 2))
          continue
        }
        controls.push(
          animate(-unit, 0, {
            duration: unit / SPEED,
            ease: 'linear',
            repeat: Infinity,
            onUpdate: (v) => tp!.setAttribute('startOffset', String(v)),
          }),
        )
      }
    }

    const fonts = document.fonts
    if (fonts?.load) fonts.load(`${FONT_SIZE}px "Inter"`).then(apply, apply)
    else apply()

    return () => {
      cancelled = true
      controls.forEach((c) => c.stop())
    }
  }, [reduced, inView])

  // ── Cycle the correction pills while the card is on screen ──
  useEffect(() => {
    if (reduced || !inView) return
    const id = window.setInterval(() => setFix((f) => (f + 1) % FIXES.length), 2400)
    return () => window.clearInterval(id)
  }, [reduced, inView])

  const Active = FIXES[fix].icon

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Soft olive focal glow behind the node so it lifts off the wave. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[83%] h-[200px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,167,102,0.15),transparent)] blur-[2px]"
      />

      {/* The flowing transcript + ribbon */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-hidden
      >
        <defs>
          {/* Raw — dim grey, fades out just before the node. */}
          <linearGradient id="vw-raw" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0" stopColor="#9a9a9a" stopOpacity="0" />
            <stop offset="0.12" stopColor="#9a9a9a" stopOpacity="0.36" />
            <stop offset="0.36" stopColor="#8f8f8f" stopOpacity="0.32" />
            <stop offset="0.46" stopColor="#8f8f8f" stopOpacity="0" />
          </linearGradient>
          {/* Clean — crisp white, fading in at the node, riding the dark ribbon. */}
          <linearGradient id="vw-clean" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.56" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.93" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* The ribbon fill — dark, a touch of top-light for depth. */}
          <linearGradient id="vw-ribbon" gradientUnits="userSpaceOnUse" x1="500" y1="120" x2="950" y2="360">
            <stop offset="0" stopColor="#26291c" />
            <stop offset="1" stopColor="#13150d" />
          </linearGradient>
        </defs>

        <path id="vw-path" d={WAVE} fill="none" />

        {/* Raw (left) — dim text on the bare card */}
        <text fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" dominantBaseline="middle" fill="url(#vw-raw)" style={{ letterSpacing: '0.2px' }}>
          <textPath ref={rawPathRef} href="#vw-path" startOffset="0">
            {RAW.repeat(REPEAT)}
          </textPath>
        </text>

        {/* Ribbon: a fine olive edge under a dark fill, lifted off the card */}
        <path d={RIBBON} fill="none" stroke="rgba(150,167,102,0.5)" strokeWidth="45" strokeLinecap="round" />
        <path
          d={RIBBON}
          fill="none"
          stroke="url(#vw-ribbon)"
          strokeWidth="40"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 9px 16px rgba(0,0,0,0.55))' }}
        />

        {/* Clean (right) — crisp white ink riding the ribbon up */}
        <text fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" fontWeight={500} dominantBaseline="middle" fill="url(#vw-clean)" style={{ letterSpacing: '0.1px' }}>
          <textPath ref={cleanPathRef} href="#vw-path" startOffset="0">
            {CLEAN.repeat(REPEAT)}
          </textPath>
        </text>

        {/* Hidden single units — measured so each loop shifts by exactly one repeat. */}
        <text ref={rawMeasureRef} fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" visibility="hidden" x={-9999} style={{ letterSpacing: '0.2px' }}>
          {RAW}
        </text>
        <text ref={cleanMeasureRef} fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" fontWeight={500} visibility="hidden" x={-9999} style={{ letterSpacing: '0.1px' }}>
          {CLEAN}
        </text>
      </svg>

      {/* Correction pill — one fix at a time, above the node. */}
      <div className="pointer-events-none absolute inset-x-0 top-[60%] flex -translate-y-1/2 justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={fix}
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full bg-olive py-1.5 pl-2 pr-3.5 text-[12px] font-semibold text-[#16180d] shadow-[0_14px_30px_-10px_rgba(150,167,102,0.55)]"
          >
            <Active className="h-3.5 w-3.5" strokeWidth={2.8} />
            {FIXES[fix].label}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The Nivora voice node — a live waveform lozenge the flow passes through. */}
      <div className="absolute left-1/2 top-[83%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* breathing accent dots */}
          <Dot className="-left-3 -top-2" delay="0s" reduced={reduced} />
          <Dot className="-right-2 -top-3" delay="0.6s" reduced={reduced} />
          <Dot className="-bottom-2 -left-2" delay="1.1s" reduced={reduced} />

          <div className="relative flex h-[56px] w-[120px] items-center justify-center gap-[3px] overflow-hidden rounded-[16px] border border-white/25 bg-[#0d0d0d]/75 px-4 shadow-[0_20px_46px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md">
            {BARS.map((h, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-gradient-to-b from-white to-olive"
                style={
                  {
                    height: `${Math.round(h * BAR_TRACK)}px`,
                    transformOrigin: 'center',
                    '--bar-min': 0.4,
                    ...(reduced
                      ? { transform: 'scaleY(0.7)' }
                      : { animation: `voiceBar ${(1.1 + (i % 3) * 0.22).toFixed(2)}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite` }),
                  } as VarStyle
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Dot({ className, delay, reduced }: { className?: string; delay: string; reduced: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.8)] ${className ?? ''}`}
      style={reduced ? { opacity: 0.6 } : { animation: `voiceDot 2.6s ease-in-out ${delay} infinite` }}
    />
  )
}
