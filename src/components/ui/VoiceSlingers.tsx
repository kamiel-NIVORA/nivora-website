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
 * live waveform node near the bottom and emerges riding a soft pale RIBBON
 * (lifted off the card) that sweeps up to the right, now crisp, dark,
 * properly punctuated copy. Pills pop above the node naming each fix.
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
          <linearGradient id="vw-raw" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0" stopColor="#9a9a9a" stopOpacity="0" />
            <stop offset="0.12" stopColor="#9a9a9a" stopOpacity="0.36" />
            <stop offset="0.36" stopColor="#8f8f8f" stopOpacity="0.32" />
            <stop offset="0.46" stopColor="#8f8f8f" stopOpacity="0" />
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

      {/* Correction pill — one fix at a time, above the node. */}
      <div className="pointer-events-none absolute inset-x-0 top-[60%] flex -translate-y-1/2 justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={fix}
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0d0d0d]/90 py-1.5 pl-1.5 pr-3.5 text-[12px] font-medium text-ink shadow-[0_16px_36px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md"
          >
            <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-white/10">
              <Active className="h-3 w-3 text-ink" strokeWidth={2.6} />
            </span>
            {FIXES[fix].label}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The Nivora voice node — a live waveform lozenge the flow passes through. */}
      <div className="absolute left-1/2 top-[83%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <Dot className="-left-3 -top-2" delay="0s" reduced={reduced} />
          <Dot className="-right-2 -top-3" delay="0.6s" reduced={reduced} />
          <Dot className="-bottom-2 -left-2" delay="1.1s" reduced={reduced} />

          <motion.div
            animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
            transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-[54px] w-[138px] items-center justify-center gap-[3px] overflow-hidden rounded-full border border-white/30 bg-[#0d0d0d]/80 px-6 shadow-[0_20px_46px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md"
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
      className={`absolute h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.8)] ${className ?? ''}`}
      style={reduced ? { opacity: 0.6 } : { animation: `voiceDot 2.6s ease-in-out ${delay} infinite` }}
    />
  )
}
