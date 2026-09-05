import { Fragment } from 'react'
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
    sub: 'Elk bedrijf voelt de druk om meer te doen met AI. Nivora bouwt wat uw bedrijf echt vooruithelpt,\nen laat u de waarde van een AI-toepassing zien voordat u de investering maakt.',
    bookCall: 'Boek een gesprek',
    contact: 'Neem contact op',
  },
} as const

/**
 * A motion element in the browser, a plain one on the server.
 *
 * Prerendering (scripts/prerender.mjs) renders this hero to static HTML. Motion
 * would bake its `initial` variant into that HTML, so every word of the H1 would
 * arrive at opacity:0 and no crawler without JavaScript would ever read the
 * headline. Emitting plain tags server-side keeps the markup and the text
 * identical while dropping only the animation.
 */
function MotionOrPlain({
  as,
  children,
  className,
  ...motionProps
}: {
  as: 'div' | 'span' | 'p'
  children: React.ReactNode
  className?: string
} & Record<string, unknown>) {
  if (import.meta.env.SSR) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  const MotionTag = motion[as]
  return (
    <MotionTag className={className} {...motionProps}>
      {children}
    </MotionTag>
  )
}

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

/**
 * The home hero. Landing pages reuse it verbatim, passing their own headline and
 * subline, so a page for one keyword or one city looks and behaves exactly like
 * the home page rather than like a separate template. Everything else, the
 * photo, the word-by-word reveal, the buttons, stays identical.
 */
export function Hero({
  headlineLines,
  sub,
  image,
}: {
  headlineLines?: readonly string[]
  sub?: string
  /** Backdrop. Defaults to the home photo; landing pages pass their own so the
   *  set does not read as one page repeated thirty times. */
  image?: string
} = {}) {
  const { lang } = useLang()
  const base = COPY[lang]
  const t = { ...base, headlineLines: headlineLines ?? base.headlineLines, sub: sub ?? base.sub }
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background, lifted onto its own GPU layer (translateZ) so the headline's
          blur-reveal animation never forces it to repaint, that repaint was the
          faint flicker on entry. */}
      <div className="absolute inset-0 [transform:translateZ(0)] [backface-visibility:hidden]">
        {/* Nivora landscape, generated with Nano Banana Pro */}
        <img
          src={image ?? '/home/hero-nivora.webp'}
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

      {/* Content.
          The word-by-word reveal starts every word at opacity:0, which is fine
          in a browser and fatal in prerendered HTML: the H1, the single most
          important element on the page, would ship invisible to every crawler
          that skips JavaScript. So on the server the same markup is emitted
          without motion. import.meta.env.SSR is a compile-time literal, so this
          branch is stripped from the browser bundle. */}
      <MotionOrPlain
        as="div"
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-center px-6 pt-24 pb-16 text-center lg:pt-0 lg:pb-0"
      >
        <h1 className="font-serif text-[38px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[1.02] lg:tracking-[-1.6px]">
          {t.headlineLines.map((line, lineIdx) => {
            const words = line.split(' ')
            return (
              <Fragment key={line}>
                {/* Whitespace between the lines as well: the lines are block
                    spans, so this changes nothing visually, but without it the
                    H1's text content runs the last word of one line into the
                    first of the next ("in Turnhout,voor korte reeksen"). */}
                {lineIdx > 0 ? ' ' : null}
              <span className="block">
                {words.map((w, i) => (
                  <Fragment key={`${line}-${i}`}>
                    <MotionOrPlain as="span" variants={word} className="inline-block">
                      {w}
                    </MotionOrPlain>
                    {/* A real space, not a CSS margin. Each word is its own span
                        so it can animate on its own beat; with spacing done
                        purely by margin the H1's text content came out as
                        "Intelligentsystemsforambitiouscompanies", which is how a
                        crawler and a screen reader read it. The whitespace here
                        collapses to one word space between inline-blocks, so it
                        both looks right and reads right. */}
                    {i < words.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </span>
              </Fragment>
            )
          })}
        </h1>

        <MotionOrPlain
          as="p"
          variants={fadeUp}
          className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink-soft/80 lg:text-base"
        >
          {/* Een \n in de sub-tekst wordt een regelovergang (per taal instelbaar). */}
          {t.sub.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </MotionOrPlain>

        <MotionOrPlain
          as="div"
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
        </MotionOrPlain>
      </MotionOrPlain>
    </section>
  )
}
