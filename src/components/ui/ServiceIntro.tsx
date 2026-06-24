import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

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
  const lenis = useLenis()
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'done'>('intro')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) setPhase('done')
  }, [reduced])

  const locked = !reduced && phase !== 'done'
  useEffect(() => {
    if (!locked) return
    if (lenis) lenis.stop()
    else document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => {
      if (lenis) lenis.start()
      else document.body.style.overflow = ''
    }
  }, [locked, lenis])

  // Cycle keywords; hold the last one a beat, then start the lift.
  useEffect(() => {
    if (phase !== 'intro') return
    const isLast = index >= words.length - 1
    const t = window.setTimeout(
      () => (isLast ? setPhase('reveal') : setIndex((i) => i + 1)),
      isLast ? 900 : 760,
    )
    return () => window.clearTimeout(t)
  }, [phase, index, words.length])

  // Reliable done: a plain timeout matched to the curtain animation duration.
  // Using onComplete on a motion value can silently drop in some Framer versions.
  useEffect(() => {
    if (phase !== 'reveal') return
    const t = window.setTimeout(() => setPhase('done'), 1300)
    return () => window.clearTimeout(t)
  }, [phase])

  const current = words[Math.min(index, words.length - 1)]

  return (
    <>
      {children}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="service-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70]"
            aria-hidden
          >
            {/* Curtain — slides up when phase is 'reveal' */}
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: phase === 'reveal' ? '-116%' : '0%' }}
              transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-0 will-change-transform"
            >
              <div className="absolute inset-0 bg-bg" />
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(60% 50% at 50% 45%, ${accent}1f, transparent 70%)` }}
              />

              <div className="absolute inset-0 flex items-center justify-center px-6">
                <AnimatePresence mode="wait">
                  {phase === 'intro' && (
                    <motion.span
                      key={`${index}-${current}`}
                      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-[92vw] text-balance text-center font-serif text-[32px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[70px]"
                    >
                      {current}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Curved leading edge in accent colour */}
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
