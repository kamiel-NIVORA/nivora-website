import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/*
 * Vier matglazen kaarten over een landschap, overgenomen van de "waarom wij"-
 * sectie op de servicepagina's (AppWhyUs / AppWhyCard in ServicePage.tsx):
 * scherp landschap in de tussenruimtes, door elke kaart heen een uitgelijnde
 * wazige kopie ervan, en een zachte 3D-kanteling onder de cursor.
 */

export type WhyBg = {
  src: string
  w: number
  h: number
  posY: number
  opacity: number
}
const WHY_POS_X = 0.5

function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

function FrostCard({
  title,
  body,
  bandRef,
  bg,
}: {
  title: string
  body: string
  bandRef: RefObject<HTMLDivElement | null>
  bg: WhyBg
}) {
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { damping: 18, stiffness: 160 }
  const sx = useSpring(mouseX, spring)
  const sy = useSpring(mouseY, spring)
  const rotateX = useTransform(sy, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-8deg', '8deg'])

  // A blurred copy of the peak, sized to the band and offset so it lines up with
  // the sharp peak behind THIS card (same cover-scale + position) — real frost.
  const [frost, setFrost] = useState<{
    w: number
    h: number
    left: number
    top: number
  } | null>(null)
  useLayoutEffect(() => {
    const band = bandRef.current
    const card = cardRef.current
    if (!band || !card) return
    const measure = () => {
      const bw = band.offsetWidth
      const bh = band.offsetHeight
      const scale = Math.max(bw / bg.w, bh / bg.h)
      const sw = bg.w * scale
      const sh = bg.h * scale
      const bandX = (bw - sw) * WHY_POS_X
      const bandY = (bh - sh) * bg.posY
      const { x: cardX, y: cardY } = offsetWithin(card, band)
      setFrost({ w: sw, h: sh, left: bandX - cardX, top: bandY - cardY })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(band)
    return () => ro.disconnect()
  }, [bandRef, bg])

  return (
    <div style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={
          reduced
            ? undefined
            : (e) => {
                const r = e.currentTarget.getBoundingClientRect()
                mouseX.set((e.clientX - r.left) / r.width - 0.5)
                mouseY.set((e.clientY - r.top) / r.height - 0.5)
              }
        }
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[22px] border border-line bg-[#0b0b0f]/30 p-6 transition-[border-color,box-shadow] duration-300 [@media(hover:hover)]:hover:border-line-strong [@media(hover:hover)]:hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)] lg:min-h-[250px] lg:p-7"
      >
        {/* Blurred peak, aligned to the sharp background behind the card — the frost */}
        {frost && (
          <img
            src={bg.src}
            alt=""
            aria-hidden
            style={{
              width: frost.w,
              height: frost.h,
              left: frost.left,
              top: frost.top,
            }}
            className="pointer-events-none absolute max-w-none object-cover opacity-[0.7] blur-2xl"
          />
        )}
        {/* Frosted tint + gloss + top hairline — the same frosted feel as the home cards */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/35 via-[#0a0a0d]/30 to-[#0a0a0d]/55" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_20%_-10%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div style={reduced ? undefined : { transform: 'translateZ(45px)' }} className="relative">
          <h3 className="font-serif text-[20px] leading-snug tracking-[-0.01em] text-ink lg:text-[22px]">{title}</h3>
          <p className="mt-4 text-[15px] leading-[1.65] text-muted">{body}</p>
        </div>
      </motion.div>
    </div>
  )
}

/** Het landschap met de kaarten erover. */
export function FrostCards({ items, bg }: { items: { title: string; text: string }[]; bg: WhyBg }) {
  const bandRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={bandRef} className="relative mx-auto w-full max-w-[1280px] py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={bg.src}
          alt=""
          className="h-full w-full object-cover"
          style={{
            objectPosition: `50% ${bg.posY * 100}%`,
            opacity: bg.opacity,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-bg/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/65 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-bg to-transparent" />
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-bg to-transparent" />
      </div>
      <div className="relative z-10 grid gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {items.map((d, i) => (
          <Reveal key={d.title} delay={(i % 4) * 0.08}>
            <FrostCard title={d.title} body={d.text} bandRef={bandRef} bg={bg} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
