import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/** CSS style that also carries custom properties (e.g. --bar-min). */
type VarStyle = CSSProperties & Record<`--${string}`, string | number>

/**
 * Voice card visual — speech in, clean writing out (Wispr-style ribbon).
 * Raw dim speech bends down from the upper-left into a live waveform node, then
 * rides a soft pale ribbon up to the upper-right as crisp, clean copy. Above the
 * node, correction nudges strike the raw token through and name the fix.
 */

const VB_W = 1000
const VB_H = 420

/* A valley: raw text bends down from the upper-LEFT into the node at the bottom
   centre, then the clean copy sweeps up to the upper-RIGHT. Both sides bend up. */
const WAVE =
  'M -120 196 C 150 258 340 318 500 334 C 672 320 802 232 922 166 C 1012 124 1096 106 1190 96'
const RIBBON = 'M 500 334 C 672 320 802 232 922 166 C 1012 124 1096 106 1190 96'

/* Raw speech (left): lowercase, a filler, a stutter, a grammar slip, no punctuation. */
const RAW =
  "so um i think their going to handle the the first part but i'm not totally sure   also i told the team the new timeline   "
/* Clean copy (right): grammar fixed, filler and repeat gone, real punctuation. */
const CLEAN =
  "So, I think they're going to handle the first part, but I'm not totally sure. Also, I told the team the new timeline is set.   "

const REPEAT = 3
const FONT_SIZE = 20
const SPEED = 88 // px/second — both streams share it, so the flow reads as one motion

/* Wispr-style correction nudges: the raw token gets struck through, then the fix
   label lands. They cycle slowly so each one reads clearly. */
const CORRECTIONS: { token: string; label: string }[] = [
  { token: 'umm', label: 'Removed filler' },
  { token: 'the the', label: 'Removed repetition' },
  { token: 'their', label: 'Fixed grammar' },
  { token: 'you know', label: 'Removed filler' },
]

/* Equaliser profile — taller in the middle so the resting node reads as a voice. */
const BARS = [0.34, 0.5, 0.42, 0.66, 0.82, 0.58, 0.94, 0.72, 1, 0.72, 0.94, 0.58, 0.82, 0.66, 0.42, 0.5, 0.34]
const BAR_TRACK = 30 // px, the tallest a bar can reach inside the pill

export function VoiceSlingers() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const rawPathRef = useRef<SVGTextPathElement>(null)
  const cleanPathRef = useRef<SVGTextPathElement>(null)
  const rawMeasureRef = useRef<SVGTextElement>(null)
  const cleanMeasureRef = useRef<SVGTextElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })
  const [fix, setFix] = useState(0)

  useEffect(() => {
    const streams = [
      { tp: rawPathRef.current, m: rawMeasureRef.current },
      { tp: cleanPathRef.current, m: cleanMeasureRef.current },
    ]
    if (streams.some((s) => !s.tp || !s.m)) return

    let controls: ReturnType<typeof animate>[] = []
    let cancelled = false

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

  useEffect(() => {
    if (reduced || !inView) return
    const id = window.setInterval(() => setFix((f) => (f + 1) % CORRECTIONS.length), 4000)
    return () => window.clearInterval(id)
  }, [reduced, inView])

  const c = CORRECTIONS[fix]

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Soft neutral focal glow behind the node so it lifts off the wave. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[80%] h-[210px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)] blur-[2px]"
      />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="vw-raw" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0" stopColor="#b4b4b4" stopOpacity="0" />
            <stop offset="0.12" stopColor="#b4b4b4" stopOpacity="0.5" />
            <stop offset="0.36" stopColor="#a8a8a8" stopOpacity="0.44" />
            <stop offset="0.46" stopColor="#a8a8a8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vw-clean" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0.5" stopColor="#17190e" stopOpacity="0" />
            <stop offset="0.56" stopColor="#17190e" stopOpacity="1" />
            <stop offset="0.93" stopColor="#17190e" stopOpacity="1" />
            <stop offset="1" stopColor="#17190e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vw-ribbon" gradientUnits="userSpaceOnUse" x1="500" y1="120" x2="950" y2="360">
            <stop offset="0" stopColor="#f3f1eb" />
            <stop offset="1" stopColor="#dbd7cd" />
          </linearGradient>
        </defs>

        <path id="vw-path" d={WAVE} fill="none" />

        <text fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" dominantBaseline="middle" fill="url(#vw-raw)" style={{ letterSpacing: '0.2px' }}>
          <textPath ref={rawPathRef} href="#vw-path" startOffset="0">
            {RAW.repeat(REPEAT)}
          </textPath>
        </text>

        {/* Ribbon: a soft pale arc, lifted off the card */}
        <path
          d={RIBBON}
          fill="none"
          stroke="url(#vw-ribbon)"
          strokeWidth="42"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.5))' }}
        />

        <text fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" fontWeight={500} dominantBaseline="middle" fill="url(#vw-clean)" style={{ letterSpacing: '0.1px' }}>
          <textPath ref={cleanPathRef} href="#vw-path" startOffset="0">
            {CLEAN.repeat(REPEAT)}
          </textPath>
        </text>

        <text ref={rawMeasureRef} fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" visibility="hidden" x={-9999} style={{ letterSpacing: '0.2px' }}>
          {RAW}
        </text>
        <text ref={cleanMeasureRef} fontSize={FONT_SIZE} fontFamily="Inter, sans-serif" fontWeight={500} visibility="hidden" x={-9999} style={{ letterSpacing: '0.1px' }}>
          {CLEAN}
        </text>
      </svg>

      {/* Wispr-style nudge — the raw token strikes through, then the fix lands. */}
      <div className="pointer-events-none absolute inset-x-0 top-[50%] flex -translate-y-1/2 justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={fix}
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -16, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-[#171717]/95 px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_20px_44px_-12px_rgba(0,0,0,0.92)] backdrop-blur-md"
          >
            <span className="relative font-medium text-white/55">
              {c.token}
              <motion.span
                aria-hidden
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-white/75"
              />
            </span>
            <motion.span
              initial={reduced ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.62, duration: 0.3 }}
              className="inline-flex items-center gap-1.5"
            >
              <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-white/15">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.8} />
              </span>
              {c.label}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The Nivora voice node — a live waveform lozenge the flow passes through. */}
      <div className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <Dot className="-left-3 -top-2" delay="0s" reduced={reduced} />
          <Dot className="-right-2 -top-3" delay="0.6s" reduced={reduced} />
          <Dot className="-bottom-2 -left-2" delay="1.1s" reduced={reduced} />

          <motion.div
            animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
            transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-[66px] w-[170px] items-center justify-center gap-[3.5px] overflow-hidden rounded-full border border-white/30 bg-[#0d0d0d]/80 px-7 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
          >
            {BARS.map((h, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-gradient-to-b from-white to-white/35"
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Dot({ className, delay, reduced }: { className?: string; delay: string; reduced: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute h-1.5 w-1.5 rounded-full bg-white/45 shadow-[0_0_8px_rgba(255,255,255,0.5)] ${className ?? ''}`}
      style={reduced ? { opacity: 0.6 } : { animation: `voiceDot 2.6s ease-in-out ${delay} infinite` }}
    />
  )
}
