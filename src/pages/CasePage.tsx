import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCw,
  X,
} from 'lucide-react'
import { LangLink as Link } from '@/components/ui/LangLink'
import { Reveal } from '@/components/animations/Reveal'
import { ArrowButton, CursorNav } from '@/components/cases/CaseControls'
import { MagneticText } from '@/components/cases/MagneticText'
import { FrostCards } from '@/components/cases/FrostCards'
import { BOOKING_URL } from '@/data/contact'
import { getCase, type CaseStudy, type CaseVisual } from '@/data/cases'
import { NotFound } from '@/pages/NotFound'
import { useLang } from '@/i18n'
import { useSeo, SITE_URL, DEFAULT_TITLE } from '@/lib/seo'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const COPY = {
  en: {
    back: 'All work',
    ctaText: 'Do you need this too?',
    ctaHover: 'Request a demo.',
    cards: [
      {
        title: 'See it working live',
        text: 'We show you the dashboard live and look together at how it would work for your business. Free and without obligation.',
        cta: 'Request a demo',
        primary: true,
      },
      {
        title: 'See Tafereel live',
        text: 'Book a class yourself or browse the web shop.',
        cta: 'To studiotafereel.com',
      },
      {
        title: 'More of our work',
        text: 'Websites, dashboards and automations for other businesses.',
        cta: 'All work',
      },
    ],
    quoteTodo: 'A few words from Eva come here',
    quoteDraft: 'Proposal, only visible locally until Eva approves it',
  },
  nl: {
    back: 'Al ons werk',
    ctaText: 'Heb jij dit ook nodig?',
    ctaHover: 'Vraag een demo.',
    cards: [
      {
        title: 'Zie het live werken',
        text: 'We tonen je het dashboard live en kijken samen hoe het er voor jouw zaak zou uitzien. Gratis en vrijblijvend.',
        cta: 'Vraag een demo aan',
        primary: true,
      },
      {
        title: 'Bekijk Tafereel live',
        text: 'Boek zelf een les of blader door de webwinkel.',
        cta: 'Naar studiotafereel.com',
      },
      {
        title: 'Meer van ons werk',
        text: 'Websites, dashboards en automatisaties voor andere zaken.',
        cta: 'Al ons werk',
      },
    ],
    quoteTodo: 'Hier komt een woordje van Eva',
    quoteDraft: 'Voorstel, enkel lokaal zichtbaar tot Eva het goedkeurt',
  },
} as const

/** Kader rond een screenshot: donker, dunne rand, diepe schaduw. */
const frame =
  'overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]'

const h2Class = 'font-serif text-[34px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[46px]'
const pClass = 'text-[17px] leading-[1.7] text-muted sm:text-[18px]'
const wrap = 'mx-auto w-full max-w-[1280px] px-5 sm:px-6'

/**
 * Het dashboard in de hero. Een lange scrollzone met een kader dat blijft
 * staan: eerst kantelt het van achterover rechtop (zoals ScrollReveal3D op de
 * onepagers: 15 graden, perspectief 1600, dezelfde vering), daarna schuift het hele dashboard erin omhoog, zodat je al
 * scrollend het volledige scherm ziet. Veerkrachtig gekoppeld aan de scroll,
 * zodat het niet schokt.
 */
/**
 * Eén scherm in de hero: meet zelf hoe ver het beeld moet schuiven (beeldhoogte
 * min kaderhoogte) en volgt de gedeelde scrollvoortgang.
 */
function ScrollScreen({
  p,
  image,
  alt,
  className,
  innerClass,
  overlay,
}: {
  p: MotionValue<number>
  image: string
  alt: string
  className: string
  innerClass: string
  overlay?: React.ReactNode
}) {
  const screen = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const [travel, setTravel] = useState(0)
  useLayoutEffect(() => {
    const measure = () => {
      if (screen.current && img.current) setTravel(Math.max(0, img.current.offsetHeight - screen.current.offsetHeight))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (screen.current) ro.observe(screen.current)
    if (img.current) ro.observe(img.current)
    return () => ro.disconnect()
  }, [])
  const y = useTransform(p, (v) => -travel * Math.min(1, Math.max(0, (v - 0.26) / 0.66)))
  return (
    <div className={className}>
      <div ref={screen} className={innerClass}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <motion.img
          ref={img}
          src={image}
          alt={alt}
          style={{ y }}
          decoding="async"
          className="block h-auto w-full will-change-transform [backface-visibility:hidden]"
        />
        {overlay}
      </div>
    </div>
  )
}

/**
 * Het dashboard in de hero. Een lange scrollzone met een kader dat blijft
 * staan: eerst kantelt het van achterover rechtop (zoals op de onepagers: 15
 * graden, perspectief 1600, dezelfde vering), daarna schuift het dashboard
 * erin omhoog. Het menu van het dashboard blijft daarbij staan, net als in de
 * echte app. Op gsm staat er het gsm-dashboard in een smal kader.
 */
function HeroDashboard({ image, alt, rail, mobile }: CaseStudy['hero']) {
  const zone = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: zone,
    offset: ['start start', 'end end'],
  })
  // Geen extra vering: Lenis maakt het scrollen op de site al vloeiend, een
  // tweede veer erbovenop voelt traag en zwevend.
  const p = scrollYProgress
  const rotateX = useTransform(p, [0, 0.22], [15, 0])
  const scale = useTransform(p, [0, 0.22], [0.94, 1])
  const glow = useTransform(p, [0, 0.22], [0, 0.5])
  const lift = useTransform(p, [0, 0.22], [46, 0])

  const shell =
    'rounded-[22px] border border-white/[0.14] bg-white/[0.045] p-2 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)]'

  if (reduced)
    return (
      <div className={cn(wrap, 'mt-16')}>
        <div className={shell}>
          <div className="overflow-hidden rounded-2xl">
            <img src={image} alt={alt} className="h-auto w-full" />
          </div>
        </div>
      </div>
    )

  const railOverlay = rail && (
    <div
      aria-hidden
      className="absolute inset-y-0 left-0"
      style={{ width: `${rail.width * 100}%`, background: rail.bg }}
    >
      <img src={rail.top} alt="" className="absolute left-0 top-0 block h-auto w-full" />
      <img src={rail.bottom} alt="" className="absolute bottom-0 left-0 block h-auto w-full" />
    </div>
  )

  return (
    <div ref={zone} className="relative mt-14 h-[320svh] sm:h-[280svh] lg:mt-16">
      <div className="sticky top-32 overflow-x-clip px-5 sm:top-[9rem] sm:px-6" style={{ perspective: '1600px' }}>
        {/* Zachte gloed achter het scherm, zoals op de onepagers. */}
        <motion.div
          aria-hidden
          style={{
            opacity: glow,
            background: 'radial-gradient(56% 42% at 50% 34%, rgba(255,255,255,0.07), transparent 72%)',
          }}
          className="pointer-events-none absolute -inset-x-10 -inset-y-20"
        />
        <motion.div style={{ rotateX, scale, y: lift }}>
          {/* Desktop: het brede dashboard met het vaste menu links. */}
          <ScrollScreen
            p={p}
            image={image}
            alt={alt}
            className={cn(shell, 'mx-auto hidden w-full max-w-[1400px] sm:block')}
            innerClass="relative h-[calc(100svh-11.5rem)] overflow-hidden rounded-2xl bg-surface"
            overlay={railOverlay}
          />
          {/* Gsm: het gsm-dashboard met de vaste bovenbalk. */}
          <ScrollScreen
            p={p}
            image={mobile?.image ?? image}
            alt={alt}
            className={cn(shell, 'mx-auto w-full max-w-[340px] rounded-[34px] p-2 sm:hidden')}
            innerClass="relative h-[62svh] overflow-hidden rounded-[26px] bg-surface"
            overlay={
              mobile && (
                <img aria-hidden src={mobile.top} alt="" className="absolute inset-x-0 top-0 block h-auto w-full" />
              )
            }
          />
        </motion.div>
      </div>
    </div>
  )
}

function Shot({ image, alt, className }: { image: string; alt: string; className?: string }) {
  return (
    <div className={cn(frame, className)}>
      <img src={image} alt={alt} loading="lazy" className="h-auto w-full" />
    </div>
  )
}

/**
 * De koppelingen als een doorlopende strook: iconen zonder kader die rustig
 * van rechts naar links schuiven, met een zachte fade aan beide kanten.
 * De lijst staat er twee keer in, zodat de lus naadloos is.
 */
function Logos({ items }: { items: { name: string; icon: string }[] }) {
  const row = [...items, ...items, ...items]
  return (
    <Reveal>
      <div
        className="group relative overflow-hidden py-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)',
        }}
      >
        <div className="flex w-max motion-safe:animate-[case-marquee_32s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[row, row].map((r, k) => (
            <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24">
              {r.map((it, i) => (
                <li key={`${it.name}-${i}`} className="flex shrink-0 items-center gap-4">
                  <img src={it.icon} alt="" loading="lazy" className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
                  <span className="font-serif text-[22px] text-ink-soft sm:text-[26px]">{it.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function Visual({ v }: { v: CaseVisual }) {
  switch (v.kind) {
    case 'shot':
      return (
        <Reveal>
          <Shot image={v.image} alt={v.alt} />
          {v.link && (
            <div className="mt-10 flex justify-center">
              <ArrowButton href={v.link.href}>{v.link.label}</ArrowButton>
            </div>
          )}
        </Reveal>
      )
    case 'duo':
      return (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {v.images.map((im, i) => (
            <Reveal key={im.image} delay={i * 0.08}>
              <Shot image={im.image} alt={im.alt} />
            </Reveal>
          ))}
        </div>
      )
    case 'logos':
      return <Logos items={v.items} />
    case 'tabs':
      return <Tabs section={v} />
    case 'mails':
      return <Mails section={v} />
  }
}

const TAB_MS = 5000

/**
 * Tijdlijn onderaan een video: klik om te springen, sleep om door de video te
 * scrollen. Bij hover wordt de lijn dikker en verschijnt er een bolletje.
 */
function Timeline({
  videoRef,
  progress,
  onSeek,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>
  progress: number
  onSeek: (p: number) => void
}) {
  const bar = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState(false)
  const seek = (clientX: number) => {
    const v = videoRef.current
    const r = bar.current?.getBoundingClientRect()
    if (!v || !r || !v.duration) return
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    v.currentTime = p * v.duration
    onSeek(p)
  }
  return (
    <div
      ref={bar}
      data-plain
      role="slider"
      aria-label="Tijdlijn van de video"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      tabIndex={0}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setDrag(true)
        seek(e.clientX)
      }}
      onPointerMove={(e) => drag && seek(e.clientX)}
      onPointerUp={() => setDrag(false)}
      onKeyDown={(e) => {
        const v = videoRef.current
        if (!v?.duration) return
        if (e.key === 'ArrowRight') v.currentTime = Math.min(v.duration, v.currentTime + 3)
        if (e.key === 'ArrowLeft') v.currentTime = Math.max(0, v.currentTime - 3)
      }}
      className="group/tl absolute inset-x-4 bottom-0 z-30 flex h-7 cursor-pointer touch-none items-center sm:inset-x-6"
    >
      <div
        className={cn(
          'relative w-full rounded-full bg-white/15 transition-[height] duration-200',
          drag ? 'h-[5px]' : 'h-[3px] group-hover/tl:h-[5px]',
        )}
      >
        <div className="absolute inset-y-0 left-0 rounded-full bg-white/80" style={{ width: `${progress * 100}%` }} />
        <div
          className={cn(
            'absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow transition-opacity duration-200',
            drag ? 'opacity-100' : 'opacity-0 group-hover/tl:opacity-100',
          )}
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}

/** Kader voor het tabpaneel: bij beelden bladert de cursor, bij video's niet (daar zijn er knoppen). */
function Frame({
  plain,
  overlay,
  children,
  className,
  ...nav
}: {
  plain: boolean
  overlay?: React.ReactNode
  children: React.ReactNode
  className?: string
  onPrev: () => void
  onNext: () => void
  onHover: (h: boolean) => void
}) {
  if (plain)
    return (
      <div className={cn('relative', className)}>
        {children}
        {overlay}
      </div>
    )
  return (
    <CursorNav {...nav} className={className} overlay={overlay}>
      {children}
    </CursorNav>
  )
}

/** Paneel: tabs bovenaan die om de vijf seconden zelf verspringen, eronder het beeld op volle breedte. */
function Tabs({ section }: { section: Extract<CaseVisual, { kind: 'tabs' }> }) {
  const { lang } = useLang()
  const rotateHint = lang === 'nl' ? 'Draai je gsm voor een groter beeld' : 'Turn your phone for a bigger view'
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const count = section.items.length
  const item = section.items[active]
  // Wisselen met een zachte fade: eerst uitfaden, dan het volgende infaden.
  const [fading, setFading] = useState(false)
  const go = (step: number) => {
    if (!step) return
    setFading(true)
    window.setTimeout(() => {
      setProgress(0)
      setActive((a) => (a + step + count) % count)
      setFading(false)
    }, 380)
  }
  // De video speelt pas als het paneel in beeld is, en stopt als je wegscrolt.
  const panelRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    // Speelt pas als minstens 60% in beeld is en pauzeert onder 25%: zo loopt
    // de video enkel terwijl je echt bij de sectie bent.
    const io = new IntersectionObserver(
      ([e]) => setInView((was) => (e.intersectionRatio >= 0.6 ? true : e.intersectionRatio < 0.25 ? false : was)),
      { threshold: [0, 0.25, 0.6, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView, active])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  // Een video springt zelf door als hij afgelopen is; een beeld na vijf seconden.
  const ms = TAB_MS

  useEffect(() => {
    if (paused || item.video) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % count), TAB_MS)
    return () => window.clearTimeout(t)
  }, [active, count, paused, item.video])

  return (
    <>
      <Reveal>
        {/* Tabs met een balk die volloopt tot het volgende scherm (enkel bij meer dan één). */}
        {count > 1 && (
          <div
            role="tablist"
            className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-white/[0.03] p-1.5 [scrollbar-width:none]"
          >
            {section.items.map((it, i) => (
              <button
                key={it.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => go(i - active)}
                className={cn(
                  'relative shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 sm:px-6',
                  i === active ? 'bg-white/[0.08] text-ink' : 'text-faint hover:text-muted',
                )}
              >
                {i === active && item.video && (
                  <span
                    className="absolute inset-x-4 bottom-1 h-px origin-left bg-ink/60"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                )}
                {i === active && !item.video && !paused && (
                  <span
                    key={active}
                    className="absolute inset-x-4 bottom-1 h-px origin-left bg-ink/60"
                    style={{
                      animation: `case-progress ${ms}ms linear forwards`,
                    }}
                  />
                )}
                {it.name}
              </button>
            ))}
          </div>
        )}

        <Frame
          plain={!!item.video}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onHover={setPaused}
          className={count > 1 ? 'mt-8 lg:mt-10' : ''}
          overlay={
            item.video ? (
              /* Bediening van de video: vorige, afspelen of pauzeren, volgende. */
              <div
                data-plain
                className="absolute bottom-8 right-4 z-30 flex cursor-auto items-center gap-1 rounded-full border border-white/10 bg-black/55 p-1 backdrop-blur-md sm:bottom-9 sm:right-6"
              >
                {count > 1 && (
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Vorige"
                    className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? 'Pauzeren' : 'Afspelen'}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a0a0a] transition-transform active:scale-95"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" fill="currentColor" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  )}
                </button>
                {count > 1 && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Volgende"
                    className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            ) : null
          }
        >
          {item.video && (
            <>
              <Timeline videoRef={videoRef} progress={progress} onSeek={setProgress} />
              {/* Op een gsm in staande stand: draai je scherm voor een groter beeld. */}
              <span className="pointer-events-none absolute left-1/2 top-3 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-black/60 px-3 py-1.5 text-[12px] text-white/90 backdrop-blur-md landscape:hidden sm:hidden">
                <RotateCw className="h-3.5 w-3.5" /> {rotateHint}
              </span>
            </>
          )}
          <div ref={panelRef} className={cn(frame, 'rounded-3xl')}>
            {/* Alle beelden gestapeld, het gekozen beeld vervaagt erin. */}
            <div className="relative aspect-[16/10]">
              {section.items.map((it, i) =>
                it.video ? (
                  /* Enkel de actieve video laadt en speelt, telkens van het begin. */
                  i === active ? (
                    <video
                      key={it.video}
                      ref={videoRef}
                      src={it.video}
                      poster={it.image}
                      aria-label={it.alt}
                      muted
                      playsInline
                      preload="auto"
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
                      loop={count === 1}
                      onEnded={() => go(1)}
                      className={cn(
                        'case-fade absolute inset-0 h-full w-full object-cover transition-opacity duration-[380ms]',
                        fading && '!opacity-0',
                      )}
                    />
                  ) : null
                ) : (
                  <img
                    key={it.image}
                    src={it.image}
                    alt={it.alt}
                    loading="lazy"
                    draggable={false}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700',
                      i === active ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ),
              )}
            </div>
          </div>
        </Frame>

        {count > 1 && (
          <div key={active} className="case-fade mx-auto mt-8 max-w-[620px] text-center lg:mt-10">
            <p className="font-serif text-[24px] leading-tight text-ink sm:text-[28px]">{item.name}</p>
            <p className={cn(pClass, 'mt-3')}>{item.text}</p>
          </div>
        )}
      </Reveal>
    </>
  )
}

const MAIL_MS = 2200

/**
 * Eén kader in de kleur van de mails, met telkens een volledige mail erin die
 * om de ruim twee seconden wisselt. De cursor is een pijlknop om zelf te
 * bladeren; erboven hangen pauzeert.
 */
function Mails({ section }: { section: Extract<CaseVisual, { kind: 'mails' }> }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = section.items.length
  const go = (step: number) => setActive((a) => (a + step + count) % count)
  const m = section.items[active]

  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % count), MAIL_MS)
    return () => window.clearTimeout(t)
  }, [active, count, paused])

  return (
    <>
      <Reveal>
        <CursorNav onPrev={() => go(-1)} onNext={() => go(1)} onHover={setPaused}>
          <div className={cn(frame, 'rounded-3xl bg-[#2c1f1f]')}>
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/13]">
              {section.items.map((it, i) => (
                <img
                  key={it.image}
                  src={it.image}
                  alt={it.subject}
                  loading="lazy"
                  draggable={false}
                  className={cn(
                    'absolute inset-0 h-full w-full object-contain py-5 transition-opacity duration-500 sm:py-8',
                    i === active ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
          </div>
        </CursorNav>

        <div key={active} className="case-fade mx-auto mt-8 max-w-[620px] text-center lg:mt-10">
          <p className="font-serif text-[24px] leading-tight text-ink sm:text-[28px]">{m.moment}</p>
          <p className="mt-2 text-[16px] text-faint">{m.subject}</p>
        </div>
      </Reveal>
    </>
  )
}

function Hero({ c }: { c: CaseStudy }) {
  return (
    <header>
      <div className={cn(wrap, 'pt-36 text-center lg:pt-44')}>
        <Reveal mode="mount">
          <img src={c.logo} alt={c.client} className="mx-auto h-16 w-16 sm:h-20 sm:w-20" />
        </Reveal>
        <Reveal mode="mount" delay={0.05}>
          <h1 className="mx-auto mt-8 max-w-[920px] font-serif text-[40px] leading-[1.05] tracking-[-0.025em] text-ink sm:text-[60px] lg:text-[72px]">
            {c.title}
          </h1>
        </Reveal>
        <Reveal mode="mount" delay={0.1}>
          <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.7] text-muted sm:text-[19px]">{c.excerpt}</p>
        </Reveal>
        {/* Projectregel: één rustige regel, zonder labels. */}
        <Reveal mode="mount" delay={0.15}>
          <p className="mx-auto mt-8 max-w-[900px] text-[15px] leading-relaxed text-faint sm:text-[16px]">
            {c.project
              .slice(1)
              .map((row) => row.value)
              .join(' · ')}
            {c.site && (
              <>
                <span className="mx-2 text-dim">·</span>
                <a
                  href={c.site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-white"
                >
                  {c.site.label}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </a>
              </>
            )}
          </p>
        </Reveal>
      </div>
      <HeroDashboard {...c.hero} />
    </header>
  )
}

function Problem({ c }: { c: CaseStudy }) {
  const pr = c.problem
  return (
    <section className="py-28 lg:py-40">
      <Reveal className={cn(wrap, 'max-w-[760px] text-center')}>
        <h2 className={h2Class}>{pr.h2}</h2>
        <p className={cn(pClass, 'mx-auto mt-5 max-w-[560px]')}>{pr.p}</p>
      </Reveal>
      <div className="mt-6 lg:mt-10">
        <FrostCards
          items={pr.items}
          bg={{
            src: '/brand/landscape-ridges.webp',
            w: 1920,
            h: 1072,
            posY: 0.5,
            opacity: 0.6,
          }}
        />
      </div>
      <Reveal className={cn(wrap, 'mt-10 max-w-[820px] text-center lg:mt-14')}>
        <p className="font-serif text-[28px] leading-[1.25] tracking-[-0.015em] text-ink sm:text-[38px]">
          {pr.question}
        </p>
      </Reveal>
    </section>
  )
}

function Steps({ c }: { c: CaseStudy }) {
  return (
    <section className="pb-12">
      <Reveal className={cn(wrap, 'text-center')}>
        <h2 className={h2Class}>{c.steps.h2}</h2>
        <p className={cn(pClass, 'mx-auto mt-5 max-w-[520px]')}>{c.steps.p}</p>
      </Reveal>
      {c.steps.items.map((st) => (
        <article key={st.h2} className={cn(wrap, 'pt-24 lg:pt-36')}>
          {/* Kop van de stap: nummer en titel links, uitleg en punten rechts. */}
          <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
            <Reveal className="lg:col-span-5">
              <h3 className="font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px]">
                {st.h2}
              </h3>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
              <p className={pClass}>{st.p}</p>
            </Reveal>
          </div>
          <div className="mt-12 flex flex-col gap-6 lg:mt-16">
            {st.visuals.map((v, k) => (
              <Visual key={k} v={v} />
            ))}
            {st.link && (
              <Reveal className="mt-8 flex flex-col items-center gap-5 text-center">
                <p className="max-w-[520px] text-[17px] leading-[1.6] text-ink-soft">{st.link.text}</p>
                <ArrowButton href={st.link.href}>{st.link.label}</ArrowButton>
              </Reveal>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}

function Result({ c }: { c: CaseStudy }) {
  const r = c.result
  return (
    <section className={cn(wrap, 'py-28 lg:py-40')}>
      <Reveal className="text-center">
        <h2 className={h2Class}>{r.h2}</h2>
        <p className={cn(pClass, 'mx-auto mt-5 max-w-[520px]')}>{r.p}</p>
      </Reveal>
      <dl className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
        {r.facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.06}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white/[0.02] p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-[48px] leading-none tracking-[-0.03em] text-ink sm:text-[60px]">{f.value}</dd>
              <dd className="mt-5 text-[15px] leading-snug text-muted">{f.label}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
      <Reveal className="mt-16 lg:mt-20">
        {/* Zonder systeem in terracotta, met het dashboard in olijf (uit het Nivora-palet): zacht, maar in één blik duidelijk. */}
        <div className="overflow-hidden rounded-3xl border border-line bg-white/[0.02]">
          <div className="hidden grid-cols-[220px_1fr_1fr] border-b border-line text-[15px] md:grid">
            <span className="px-8 py-5" />
            <span className="flex items-center gap-2.5 bg-terracotta/[0.05] px-8 py-5 text-terracotta">
              <span className="h-2 w-2 rounded-full bg-terracotta" />
              {r.before}
            </span>
            <span className="flex items-center gap-2.5 bg-olive/[0.06] px-8 py-5 text-olive">
              <span className="h-2 w-2 rounded-full bg-olive" />
              {r.after}
            </span>
          </div>
          {r.rows.map((row, i) => (
            <div key={row.topic} className={cn('grid md:grid-cols-[220px_1fr_1fr]', i > 0 && 'border-t border-line')}>
              <p className="px-6 pb-3 pt-6 font-serif text-[20px] leading-snug text-ink md:px-8 md:py-6">{row.topic}</p>
              <p className="flex items-start gap-3 bg-terracotta/[0.04] px-6 py-4 text-[15px] leading-[1.6] text-muted md:px-8 md:py-6">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-terracotta/15 text-terracotta">
                  <X className="h-3 w-3" strokeWidth={3} />
                </span>
                {row.before}
              </p>
              <p className="flex items-start gap-3 bg-olive/[0.05] px-6 py-4 text-[15px] leading-[1.6] text-ink-soft md:px-8 md:py-6">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-olive/20 text-olive">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {row.after}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export function CasePage() {
  const { slug } = useParams()
  const { lang } = useLang()
  const t = COPY[lang]
  const c = getCase(slug, lang)

  useSeo({
    title: c ? `${c.client} · Work · Nivora` : DEFAULT_TITLE,
    description: c?.excerpt,
    path: c ? `/cases/${c.slug}` : undefined,
    ogImage: c?.ogImage,
    ogType: c ? 'article' : undefined,
    jsonLd: c
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.title,
            description: c.excerpt,
            image: `${SITE_URL}${c.ogImage}`,
            url: `${SITE_URL}/cases/${c.slug}`,
            publisher: {
              '@type': 'Organization',
              name: 'Nivora',
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/brand/nivora-logo.png`,
              },
            },
          },
        ]
      : undefined,
  })

  if (!c) return <NotFound />

  const cardHref = [BOOKING_URL, c.site?.href ?? BOOKING_URL, '/cases']
  const cardIcon: (string | null)[] = [null, c.logo, '/brand/nivora-mark.webp']

  return (
    <main>
      <article>
        <Hero c={c} />
        <Problem c={c} />
        <Steps c={c} />
        <Result c={c} />

        {/* Het woord van de klant. Een voorstel (draft) toont enkel lokaal. */}
        {c.quote && (!c.quote.draft || import.meta.env.DEV) ? (
          <figure className={cn(wrap, 'max-w-[980px] pb-28 text-center lg:pb-40')}>
            {c.quote.draft && (
              <p className="mb-8 inline-block rounded-full border border-dashed border-line-strong px-4 py-1.5 text-[13px] text-faint">
                {t.quoteDraft}
              </p>
            )}
            <Reveal>
              <blockquote className="font-serif text-[26px] leading-[1.4] tracking-[-0.01em] text-ink sm:text-[36px]">
                “{c.quote.text}”
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <figcaption className="mt-10 flex items-center justify-center gap-4">
                {c.quote.photo && <img src={c.quote.photo} alt="" className="h-14 w-14 rounded-full object-cover" />}
                <span className="text-left">
                  <span className="block font-serif text-[20px] text-ink">{c.quote.name}</span>
                  <span className="block text-[15px] text-faint">{c.quote.role}</span>
                </span>
              </figcaption>
            </Reveal>
          </figure>
        ) : (
          import.meta.env.DEV && (
            <div className={cn(wrap, 'max-w-[900px] pb-28 lg:pb-40')}>
              <div className="rounded-3xl border border-dashed border-line px-6 py-14 text-center font-serif text-[24px] text-faint">
                {t.quoteTodo}
              </div>
            </div>
          )
        )}

        {/* Afsluiter: één vraag, drie kaarten met elk een eigen actie. */}
        <section className={cn(wrap, 'border-t border-line pb-32 pt-28 lg:pb-44 lg:pt-36')}>
          <Reveal className="flex justify-center">
            <MagneticText text={t.ctaText} hoverText={t.ctaHover} />
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-6">
            {t.cards.map((card, i) => {
              const href = cardHref[i]
              const external = href.startsWith('http')
              const primary = 'primary' in card && card.primary
              return (
                <Reveal key={card.title} delay={i * 0.06}>
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-3xl border p-7 sm:p-8',
                      primary ? 'border-transparent bg-ink text-[#0a0a0a]' : 'border-line bg-white/[0.02]',
                    )}
                  >
                    <h3 className={cn('font-serif text-[26px] leading-tight', primary ? 'text-[#0a0a0a]' : 'text-ink')}>
                      {card.title}
                    </h3>
                    <p className={cn('mt-3 text-[15px] leading-[1.6]', primary ? 'text-black/60' : 'text-muted')}>
                      {card.text}
                    </p>
                    {/* Het teken van Tafereel of Nivora, rustig in het midden van de kaart. */}
                    {cardIcon[i] && (
                      <div className="flex flex-1 items-center justify-center py-10">
                        <img src={cardIcon[i]!} alt="" className="h-16 w-auto opacity-90 sm:h-20" />
                      </div>
                    )}
                    <div className="mt-auto pt-10">
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'group inline-flex items-center gap-2 text-[15px] font-medium',
                            primary ? 'rounded-full bg-[#0a0a0a] px-5 py-3 text-ink' : 'text-ink-soft hover:text-white',
                          )}
                        >
                          {card.cta}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <Link
                          to={href}
                          className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink-soft hover:text-white"
                        >
                          {card.cta}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>
      </article>
    </main>
  )
}
