import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Een kader dat rechtop komt te staan terwijl je ernaartoe scrollt.
 *
 * Het beeld begint twintig graden achterover gekanteld en richt zich op naarmate
 * de sectie in beeld komt. Eén beweging, één keer per pagina. Bedoeld voor het
 * enige element dat een lezer echt moet zien: het scherm dat wij bouwen.
 *
 * Drie dingen zijn bewust anders dan in het origineel waar dit op leunt.
 *
 * Geen vaste hoogte van 60 tot 80rem. Die maakte van het kader een scherm dat
 * je moest doorworstelen; hier bepaalt de inhoud de hoogte en levert het
 * `offset`-bereik de beweging.
 *
 * Geen mobiel-detectie via een resize-luisteraar. Die zette de eerste render op
 * de verkeerde schaal en corrigeerde daarna zichtbaar. Een CSS-mediaquery weet
 * dit zonder JavaScript en zonder sprong.
 *
 * En het respecteert `prefers-reduced-motion`: dan staat het kader gewoon
 * rechtop. Een pagina die kantelt is voor wie daar last van heeft geen effect
 * maar een probleem.
 */
export function ScrollReveal3D({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    /* Begint zodra de bovenkant van de sectie de onderkant van het scherm
       raakt, klaar wanneer het midden van de sectie het midden van het scherm
       haalt. Zo staat het scherm rechtop op het moment dat de lezer ernaar
       kijkt, niet pas nadat hij eraan voorbij is. */
    offset: ['start end', 'center center'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const lift = useTransform(scrollYProgress, [0, 1], [40, 0])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className} style={{ perspective: '1400px' }}>
      <Frame rotate={rotate} scale={scale} lift={lift}>
        {children}
      </Frame>
    </div>
  )
}

function Frame({
  rotate,
  scale,
  lift,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  lift: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale, y: lift }}
      /* De rand is de behuizing van het scherm. Donker en dun, want een dikke
         grijze rand van vier pixels zoals in het origineel trekt de aandacht
         naar het kader in plaats van naar wat erin staat. */
      /* De behuizing moet lichter zijn dan de pagina, anders valt het hele
         kader weg: bg-soft op bg scheelt vier tinten en dat ziet niemand. De
         binnenkant is het scherm en staat daarom op surface, met een randje
         licht bovenaan zodat het glas lijkt en niet geverfd. */
      className="mx-auto w-full max-w-[1040px] rounded-2xl border border-white/[0.14] bg-white/[0.045] p-1.5 shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:rounded-[22px] sm:p-2"
    >
      <div className="relative overflow-hidden rounded-xl bg-surface sm:rounded-2xl">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        {children}
      </div>
    </motion.div>
  )
}
