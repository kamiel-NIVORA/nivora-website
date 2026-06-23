import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * ServiceIntro — a short, elegant arc-reveal preloader.
 *
 * On entering a service page a near-black curtain holds a few quick, psychology-
 * led keywords (name the pain, then the resolution), then lifts away on a soft
 * curved edge traced in the service's accent colour, revealing the page. Plays
 * once per session per key, and is skipped entirely for reduced-motion.
 *
 * Adapted from a provided ArcRevealHero into the Nivora language (framer-motion,
 * OLED surfaces, serif keywords, one accent stroke for colour).
 */
export function ServiceIntro({
  words,
  accent,
  children,
}: {
  words: string[]
  accent: string
  children: ReactNode
}) {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'done'>('intro')
  const [index, setIndex] = useState(0)

  const progress = useMotionValue(0)
  const curtainY = useTransform(progress, [0, 1], ['0%', '-116%'])

  // Reduced motion → skip straight to the page. Otherwise it always plays on
  // landing a service page, slow enough to read.
  useEffect(() => {
    if (reduced) setPhase('done')
  }, [reduced])

  // Cycle the keywords slowly so they are readable, hold the last a beat longer.
  useEffect(() => {
    if (phase !== 'intro') return
    const isLast = index >= words.length - 1
    const t = window.setTimeout(
      () => (isLast ? setPhase('reveal') : setIndex((i) => i + 1)),
      isLast ? 1150 : 950,
    )
    return () => window.clearTimeout(t)
  }, [phase, index, words.length])

  // Lift the curtain.
  useEffect(() => {
    if (phase !== 'reveal') return
    const controls = animate(progress, 1, {
      duration: 1.3,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => setPhase('done'),
    })
    return () => controls.stop()
  }, [phase, progress])

  const current = words[Math.min(index, words.length - 1)]

  return (
    <>
      {children}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="service-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70]"
            aria-hidden
          >
            <motion.div style={{ y: curtainY }} className="absolute inset-0 will-change-transform">
              {/* The curtain itself */}
              <div className="absolute inset-0 bg-bg" />
              {/* faint accent wash so the panel is not flat black */}
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(60% 50% at 50% 45%, ${accent}1f, transparent 70%)` }}
              />

              {/* Keyword */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <AnimatePresence mode="wait">
                  {phase === 'intro' && (
                    <motion.span
                      key={`${index}-${current}`}
                      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center gap-3 font-serif text-[40px] tracking-[-0.02em] text-ink sm:text-[60px] lg:text-[76px]"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                      {current}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Curved leading edge, traced in the accent colour */}
              <svg
                className="absolute left-0 top-full h-[18vh] w-full"
                viewBox="0 0 100 18"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L100 0 L100 5 Q 50 24 0 5 Z" fill="var(--color-bg)" />
                <path
                  d="M0 5 Q 50 24 100 5"
                  fill="none"
                  stroke={accent}
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
