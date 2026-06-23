import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/**
 * ScrollStatement — a pinned, scroll-driven reading moment.
 *
 * This is the exact effect from the home-page Manifesto, extracted so any page
 * can reuse it with its own photo and its own line of copy. A softly rounded
 * card holding a background photo scales up to fill the screen as you scroll,
 * its corners straightening to square, while the words light up one at a time
 * and finish right at the end of the scroll, so there is never a dead stretch.
 *
 * Pass `image` (served from /public) and `copy` (one or two short sentences).
 * `accent` tints the vignette ever so slightly so each service keeps its mood.
 */
export function ScrollStatement({
  image,
  copy,
  accent,
}: {
  image: string
  copy: string
  accent?: string
}) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // One spring smooths the raw scroll so the frame and words glide.
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.0005,
  })

  // ── Effect 1 · a smaller rounded card that grows edge-to-edge ──
  const OPEN = 0.45
  const cardScale = useTransform(progress, [0, OPEN], [0.7, 1])
  const radius = useTransform(progress, [0, OPEN], [40, 0])
  const photoZoom = useTransform(progress, [0, 1], [1.1, 1])

  // ── Effect 2 · the line lights word-by-word, finishing near the end ──
  const words = copy.split(' ')
  const revealStart = 0.16
  const revealEnd = 0.96
  const step = (revealEnd - revealStart) / words.length

  const vignette = accent
    ? `radial-gradient(120% 90% at 50% 50%, transparent 30%, ${accent}1f 70%, rgba(6,6,6,0.66) 100%)`
    : 'radial-gradient(120% 90% at 50% 50%, transparent 32%, rgba(6,6,6,0.62) 100%)'

  return (
    <section ref={sectionRef} className="relative h-[260vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        {/* The whole frame scales up as one unit, corners straightening to square */}
        <motion.div
          style={{ scale: cardScale, borderRadius: radius }}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          {/* Photo — gentle settle-zoom */}
          <motion.div
            style={{ scale: photoZoom, backgroundImage: `url(${image})` }}
            className="absolute inset-0 h-full w-full bg-cover bg-center will-change-transform"
          />
          {/* Keep it calm — never too bright, and legible under the line */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0" style={{ background: vignette }} />
          {/* Blend the frame edges into the page */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

          {/* The line — lives inside the frame, so it scales with it */}
          <div className="absolute inset-0 flex items-center justify-center px-[7%]">
            <p className="flex max-w-4xl flex-wrap justify-center text-center font-serif text-[26px] leading-[1.42] tracking-[-0.01em] sm:text-[34px] sm:leading-[1.4] lg:text-[46px] lg:leading-[1.32]">
              {words.map((word, i) => {
                const start = revealStart + i * step
                return (
                  <Word key={i} progress={progress} range={[start, start + step]}>
                    {word}
                  </Word>
                )
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}) {
  // No fade-from-nothing: the word is already readable, it just brightens as
  // the scroll passes over it.
  const opacity = useTransform(progress, range, [0.22, 1])
  return (
    <span className="mx-[0.22em] my-[0.04em]">
      <motion.span style={{ opacity }} className="text-[#ece6d8]">
        {children}
      </motion.span>
    </span>
  )
}
