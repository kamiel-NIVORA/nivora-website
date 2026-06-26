import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n'

/**
 * Visual-paneel voor het "Our Services"-kaartje. Een dromerige wolkenfoto met
 * daarop, als een iOS-widget, één groot service-icoon (dezelfde app-iconen als
 * in het menu). Per slide: het icoon fadet zacht in, daarna typt de tagline
 * zich clean uit (geen caret). Slides wisselen traag en smooth (zelfde curve als
 * de hero). De progress-indicator zit onderaan de kader.
 */

type Slide = { img: string; tagline: string }

const SLIDES_COPY = {
  en: [
    { img: '/services/service-appdesign.webp', tagline: 'Your idea, your app' },
    { img: '/services/service-localai.webp', tagline: 'Own AI, own data' },
    { img: '/services/service-aios.webp', tagline: 'Your company, automated' },
    { img: '/services/service-consulting.webp', tagline: 'Where AI actually fits' },
  ] as Slide[],
  nl: [
    { img: '/services/service-appdesign.webp', tagline: 'Uw idee, uw app' },
    { img: '/services/service-localai.webp', tagline: 'Eigen AI, eigen data' },
    { img: '/services/service-aios.webp', tagline: 'Uw bedrijf, geautomatiseerd' },
    { img: '/services/service-consulting.webp', tagline: 'Waar AI echt past' },
  ] as Slide[],
} as const

/** Zelfde trage, zachte curve als de hero-reveal. */
const ease = [0.16, 1, 0.3, 1] as const

/** Eén slide: icoon fadet in, daarna typt de tagline zich uit. */
function SlideContent({ img, tagline }: Slide) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setTyped('')
    let i = 0
    let typer: ReturnType<typeof setInterval>
    // Start met typen nadat het icoon is in-gefadet.
    const startDelay = setTimeout(() => {
      typer = setInterval(() => {
        i += 1
        setTyped(tagline.slice(0, i))
        if (i >= tagline.length) clearInterval(typer)
      }, 45)
    }, 520)
    return () => {
      clearTimeout(startDelay)
      clearInterval(typer)
    }
  }, [tagline])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease }}
      className="flex flex-col items-center gap-7"
    >
      <motion.img
        src={img}
        alt=""
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
        className="h-24 w-24 rounded-[22px] shadow-[0_14px_36px_rgba(15,23,42,0.28)]"
      />
      <p
        className="min-h-[28px] whitespace-nowrap font-sans text-[21px] font-medium tracking-[-0.01em] text-slate-900"
        style={{ textShadow: '0 1px 14px rgba(255,255,255,0.5)' }}
      >
        {typed}
      </p>
    </motion.div>
  )
}

export function ServicesShowcase() {
  const { lang } = useLang()
  const SLIDES = SLIDES_COPY[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [index, setIndex] = useState(0)

  // Rustig door de slides zodra het kaartje in beeld komt.
  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4400)
    return () => clearInterval(t)
  }, [inView, SLIDES.length])

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden">
      {/* dromerige wolken-wallpaper */}
      <img src="/services/IMG_0702.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* zachte lichte wash zodat de donkere tekst leesbaar blijft */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/10" />

      {/* groot icoon + getypte tagline, gecentreerd */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {inView && (
          <AnimatePresence mode="wait">
            <SlideContent key={index} {...SLIDES[index]} />
          </AnimatePresence>
        )}
      </div>

      {/* progress-indicator — onderaan de kader */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((s, d) => (
          <span
            key={s.tagline}
            className={cn(
              'h-1.5 rounded-full transition-all duration-500',
              d === index ? 'w-5 bg-slate-900/75' : 'w-1.5 bg-slate-900/30',
            )}
          />
        ))}
      </div>
    </div>
  )
}
