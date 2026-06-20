import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/** Aerial field photo — lives in /public, served from the site root. */
const IMAGE = '/IMG_0743.jpg'

const COPY =
  'Every hour your team spends on repetitive work is an hour we can reclaim. With software you use tomorrow, or a system we build from scratch.'

/**
 * Manifesto — a pinned, scroll-driven moment.
 *
 * The whole frame (photo + line) starts as a smaller, softly rounded card and
 * scales up to fill the screen as you scroll — the corners straightening to
 * square along the way. Because the line lives *inside* the frame, it scales
 * with it and always sits perfectly in proportion, no matter the size.
 *
 * The words light up one at a time, paced to keep going until the very end of
 * the scroll so there's no dead stretch. The raw scroll runs through a spring
 * so every driven value glides instead of snapping to the wheel.
 */
export function Manifesto() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth the raw scroll so the frame and words glide rather than tracking the
  // wheel 1:1. This single spring is the source of the smoothness.
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.0005,
  })

  // ── Effect 1 · a smaller rounded card that grows edge-to-edge ──
  // The frame scales up over the first ~45% of the scroll. Starting at 0.7 keeps
  // a clear margin around it so the "photo enlarging" reads strongly.
  const OPEN = 0.45
  const cardScale = useTransform(progress, [0, OPEN], [0.7, 1])
  // transform: scale multiplies the rendered corner radius too, so 40 × 0.7 = 28px
  // at the start — the exact corner of the "Our Products" / "Our Services" cards
  // (rounded-[28px]) — straightening to 0 as it reaches full-bleed.
  const radius = useTransform(progress, [0, OPEN], [40, 0])

  // A gentle settle-zoom on the photo itself, across the whole section.
  const photoZoom = useTransform(progress, [0, 1], [1.1, 1])

  // ── Effect 2 · the line lights word-by-word, finishing right near the end ──
  // Starts just after the frame begins growing and runs almost to 1, so after
  // the frame is full the words keep lighting instead of leaving dead scroll.
  const words = COPY.split(' ')
  const revealStart = 0.16
  const revealEnd = 0.96
  const step = (revealEnd - revealStart) / words.length

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
            style={{ scale: photoZoom, backgroundImage: `url(${IMAGE})` }}
            className="absolute inset-0 h-full w-full bg-cover bg-center will-change-transform"
          />
          {/* Keep it calm — never too bright, and legible under the line */}
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 50%, transparent 32%, rgba(6,6,6,0.62) 100%)',
            }}
          />
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
