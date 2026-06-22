import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Mic } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Voice card visual — one clean translucent line, Wispr-Flow style. It listens
 * (a live waveform), then the bars resolve into typed text: voice becomes clean
 * copy. Loops quietly through a few phrases.
 */

const TEXTURE = '/IMG_0640.JPG'

const PHRASES = [
  'Send the recap to the team.',
  'Add a follow-up for Friday.',
  'Draft a reply to Sarah.',
]

/** Per-bar peak scale — gives the waveform an uneven, lively profile. */
const BARS = [0.4, 0.8, 0.55, 1, 0.6, 0.9, 0.45, 0.78, 1, 0.5, 0.85, 0.6, 0.95, 0.5, 0.7, 0.42]

function Waveform() {
  return (
    <div className="flex h-6 items-center gap-[3px]">
      {BARS.map((peak, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-white/85"
          style={{ height: 22, originY: 0.5 }}
          initial={{ scaleY: 0.25 }}
          animate={{ scaleY: [0.25, peak, 0.25] }}
          transition={{
            duration: 0.85 + (i % 5) * 0.13,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.045,
          }}
        />
      ))}
    </div>
  )
}

/** Static, low waveform for reduced-motion / resting state. */
function WaveformStill() {
  return (
    <div className="flex h-6 items-center gap-[3px]">
      {BARS.map((peak, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-white/45"
          style={{ height: Math.max(5, peak * 12) }}
        />
      ))}
    </div>
  )
}

export function VoiceWave() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [inView, setInView] = useState(false)
  const [phase, setPhase] = useState<'listening' | 'typing'>('listening')
  const [typed, setTyped] = useState('')

  // Lightweight in-view trigger (start the loop only when on screen).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !inView) return
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms))
      })

    async function run() {
      let i = 0
      while (!cancelled) {
        setPhase('listening')
        setTyped('')
        await wait(1900)
        if (cancelled) return
        setPhase('typing')
        const phrase = PHRASES[i]
        for (let c = 1; c <= phrase.length; c++) {
          setTyped(phrase.slice(0, c))
          await wait(36)
          if (cancelled) return
        }
        await wait(1500)
        if (cancelled) return
        i = (i + 1) % PHRASES.length
      }
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [reduced, inView])

  const showText = reduced || phase === 'typing'
  const textContent = reduced ? PHRASES[0] : typed

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] border border-line"
    >
      <img src={TEXTURE} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/30" />

      {/* The line — one translucent pill, voice on the left, send on the right. */}
      <div
        className="relative flex w-[min(86%,360px)] items-center gap-3 rounded-full border border-white/25 bg-white/[0.13] px-4 py-3 backdrop-blur-md"
        style={{
          boxShadow:
            'inset 1px 1px 1.5px rgba(255,255,255,0.4), 0 12px 30px rgba(0,0,0,0.3)',
        }}
      >
        <span
          className={
            'grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-white ' +
            (!showText && !reduced ? 'animate-pulse' : '')
          }
        >
          <Mic className="h-3.5 w-3.5" strokeWidth={2} />
        </span>

        <div className="relative h-6 min-w-0 flex-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
          <AnimatePresence mode="wait" initial={false}>
            {showText ? (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex h-6 items-center"
              >
                <span className="truncate text-[13.5px] font-medium leading-none text-white">
                  {textContent}
                </span>
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="ml-0.5 inline-block h-[15px] w-[2px] rounded-full bg-white/90"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="wave"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-6 items-center"
              >
                {reduced ? <WaveformStill /> : <Waveform />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#0a0a0a]">
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
      </div>
    </div>
  )
}
