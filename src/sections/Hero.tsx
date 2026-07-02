import { motion, type Variants } from 'framer-motion'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'
import { useLang, localizePath } from '@/i18n'

const ease = [0.16, 1, 0.3, 1] as const

/** Headline rendered as deliberate blocks; each word reveals on its own beat. */
const COPY = {
  en: {
    headlineLines: ['Intelligent systems', 'for ambitious companies.'],
    sub: 'Every company feels the pressure to do more with AI. Nivora builds only what genuinely helps your business, and shows you the value before you commit.',
    bookCall: 'Book a call',
    contact: 'Contact us',
  },
  nl: {
    headlineLines: ['Intelligente systemen', 'voor ambitieuze bedrijven.'],
    sub: 'Elk bedrijf voelt de druk om meer te doen met AI. Nivora bouwt wat uw bedrijf echt vooruithelpt, en laat u de waarde zien voordat u zich vastlegt.',
    bookCall: 'Boek een gesprek',
    contact: 'Neem contact op',
  },
} as const

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
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background, lifted onto its own GPU layer (translateZ) so the headline's
          blur-reveal animation never forces it to repaint, that repaint was the
          faint flicker on entry. */}
      <div className="absolute inset-0 [transform:translateZ(0)] [backface-visibility:hidden]">
        {/* Nivora landscape, generated with Nano Banana Pro */}
        <img
          src="/home/hero-nivora.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlays: darken top for nav, fade bottom into page */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-center px-6 pt-24 pb-16 text-center lg:pt-0 lg:pb-0"
      >
        <h1 className="font-serif text-[38px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[1.02] lg:tracking-[-1.6px]">
          {t.headlineLines.map((line) => (
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
          {t.sub}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
        >
          <RippleButton
            variant="solid"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-full px-7 text-[15px] sm:w-auto"
          >
            {t.bookCall}
          </RippleButton>
          <RippleButton variant="ghost" href={localizePath('/contact', lang)} className="h-12 w-full px-7 text-[15px] sm:w-auto">
            {t.contact}
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
