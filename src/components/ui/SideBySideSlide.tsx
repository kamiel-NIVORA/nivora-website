import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type SpringOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Twee beelden over elkaar, met een schuifregelaar ertussen.
 *
 * Overgenomen uit een shadcn-component en aangepast aan deze repo: framer-motion
 * in plaats van motion/react, geen 'use client' want dit is geen Next, en een
 * SSR-tak omdat scripts/prerender.mjs dezelfde component naar statische HTML
 * rendert. Zonder die tak zou de prerender de bovenste helft dichtklemmen op
 * clipPath en zou een crawler de helft van het beeld missen.
 *
 * Allebei de <img> staan altijd in de HTML met hun eigen alt-tekst, ook zonder
 * JavaScript. De regelaar is een verbetering bovenop iets dat al werkt.
 */

export type SideBySideSlideProps = {
  /** Het beeld links van de regelaar, in ons geval de lege kamer. */
  beforeImage: string
  /** Het beeld rechts, in ons geval de ingerichte kamer. */
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  orientation?: 'horizontal' | 'vertical'
  /** Beginstand van de regelaar in procent. */
  initialPosition?: number
  dividerColor?: string
  dividerWidth?: number
  dividerShadow?: string
  showHandle?: boolean
  handleSize?: number
  handleColor?: string
  springOptions?: SpringOptions
  className?: string
}

export function SideBySideSlide({
  beforeImage,
  afterImage,
  beforeAlt = 'Voor',
  afterAlt = 'Na',
  orientation = 'horizontal',
  initialPosition = 50,
  dividerColor = 'rgba(255,255,255,0.9)',
  dividerWidth = 2,
  dividerShadow = '0 0 12px rgba(0,0,0,0.45)',
  showHandle = true,
  handleSize = 44,
  handleColor = 'rgba(255,255,255,0.95)',
  springOptions = { stiffness: 300, damping: 30 },
  className,
}: SideBySideSlideProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isHorizontal = orientation === 'horizontal'

  const raw = useMotionValue(initialPosition)
  const position = useSpring(raw, springOptions)

  const clipPath = useTransform(position, (v: number) =>
    isHorizontal ? `inset(0 ${100 - v}% 0 0)` : `inset(0 0 ${100 - v}% 0)`,
  )
  const dividerPos = useTransform(position, (v: number) => `${v}%`)

  const setFromPoint = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = isHorizontal
      ? ((clientX - rect.left) / rect.width) * 100
      : ((clientY - rect.top) / rect.height) * 100
    raw.set(Math.max(0, Math.min(100, pct)))
  }

  /* Op de server rendert dit als twee gewone beelden onder elkaar in dezelfde
     doos. Dat is precies wat een crawler zonder JavaScript hoort te krijgen. */
  if (import.meta.env.SSR) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <img src={afterImage} alt={afterAlt} className="block h-full w-full object-cover" />
        <img src={beforeImage} alt={beforeAlt} className="sr-only" />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn('relative select-none overflow-hidden', className)}
      style={{ cursor: isHorizontal ? 'col-resize' : 'row-resize' }}
      onMouseMove={(e) => setFromPoint(e.clientX, e.clientY)}
      onMouseLeave={() => raw.set(initialPosition)}
      onTouchMove={(e) => {
        const t = e.touches[0]
        if (t) setFromPoint(t.clientX, t.clientY)
      }}
    >
      <img
        src={afterImage}
        alt={afterAlt}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover"
      />

      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <img
          src={beforeImage}
          alt={beforeAlt}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute"
        aria-hidden="true"
        style={
          isHorizontal
            ? {
                left: dividerPos,
                top: 0,
                bottom: 0,
                width: dividerWidth,
                x: '-50%',
                backgroundColor: dividerColor,
                boxShadow: dividerShadow,
              }
            : {
                top: dividerPos,
                left: 0,
                right: 0,
                height: dividerWidth,
                y: '-50%',
                backgroundColor: dividerColor,
                boxShadow: dividerShadow,
              }
        }
      >
        {showHandle && (
          <span
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: handleSize,
              height: handleSize,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: handleColor,
              boxShadow: dividerShadow,
            }}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              className={isHorizontal ? '' : 'rotate-90'}
              aria-hidden="true"
            >
              <path d="M6 1 1.5 6 6 11M12 1l4.5 5-4.5 5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </motion.div>
    </div>
  )
}

export default SideBySideSlide
