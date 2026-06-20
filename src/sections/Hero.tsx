import { motion, type Variants } from 'framer-motion'
import { RippleButton } from '@/components/ui/RippleButton'

const ease = [0.16, 1, 0.3, 1] as const

/** Headline rendered as deliberate blocks; each word reveals on its own beat. */
const HEADLINE_LINES = ['Intelligent systems', 'for ambitious companies.']

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
}

const word: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.7, ease },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.6, ease },
  },
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/images/EqTvMX987cRyoYGTSVcaTDhwgWM.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays: darken top for nav, fade bottom into page */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[80px] lg:leading-[1.02] lg:tracking-[-1.6px]">
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block">
              {line.split(' ').map((w, i) => (
                <motion.span
                  key={`${line}-${i}`}
                  variants={word}
                  className="mr-[0.22em] inline-block last:mr-0"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink-soft/80 lg:text-base"
        >
          Every company feels the pressure to do more with AI. Nivora builds
          only what genuinely helps your business, and shows you the value
          before you commit.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9">
          {/* Witte knop met het ripple-hover-effect (zoals de nav-CTA). */}
          <RippleButton href="#contact" className="h-11 px-6 text-[14px]">
            Contact us
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
