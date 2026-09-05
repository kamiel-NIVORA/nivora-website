import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * De fotoband tussen twee tekstblokken.
 *
 * Stond er eerder volkomen stil in: één fade bij binnenkomen en daarna niets.
 * Nu schuift het beeld traag door zijn eigen kader terwijl je scrollt, en gaat
 * het kader zelf een klein stuk open. Dat is dezelfde taal als de vastgezette
 * zin in ScrollStatement, alleen veel ingetogener, want dit is een pauze in de
 * pagina en geen moment op zich.
 *
 * Bewust GEEN nieuwe bibliotheek en geen gegenereerde component: de guard in
 * scripts/prerender.mjs laat de build vallen zodra er opacity:0 in de statische
 * HTML staat, en dat is precies wat een kant-en-klare reveal-component meebrengt.
 * Op de server geven wij daarom het afgewerkte beeld terug.
 */
export function BandImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 })

  /* Het beeld is 118% hoog, dus het kan 9% naar boven en 9% naar beneden
     bewegen zonder dat er ooit een rand vrijkomt. */
  const shift = useTransform(eased, [0, 1], ['-7%', '7%'])
  const zoom = useTransform(eased, [0, 0.5, 1], [1.06, 1, 1.06])
  const openUp = useTransform(eased, [0, 0.45], [0.94, 1])

  if (import.meta.env.SSR) {
    return (
      <section className="mx-auto w-full max-w-[1100px] px-6 py-10 lg:py-14">
        <figure>
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <img src={src} alt={alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/70 to-transparent" />
          </div>
          {caption && <figcaption className="mt-4 text-center text-[14px] leading-relaxed text-faint">{caption}</figcaption>}
        </figure>
      </section>
    )
  }

  return (
    <section ref={ref} className="mx-auto w-full max-w-[1100px] px-6 py-10 lg:py-14">
      <figure>
        <motion.div
          style={{ scaleX: openUp }}
          className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line sm:aspect-[21/9]"
        >
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ y: shift, scale: zoom }}
            className="absolute inset-x-0 top-[-9%] h-[118%] w-full object-cover will-change-transform"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/70 to-transparent" />
        </motion.div>
        {caption && <figcaption className="mt-4 text-center text-[14px] leading-relaxed text-faint">{caption}</figcaption>}
      </figure>
    </section>
  )
}
