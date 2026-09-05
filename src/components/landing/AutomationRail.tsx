import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { LangLink as Link } from '@/components/ui/LangLink'
import { useLang } from '@/i18n'

export type AutomationCard = {
  title: string
  body: string
  image: string
  alt: string
  /** Canonical (English) base path of the page this card opens. */
  href?: string
  /** True for pool cards: shared filler that repeats across pages, so the
   *  content guard should not count it as this page's own writing. */
  shared?: boolean
}

const LABELS = {
  en: { more: 'See what this looks like' },
  nl: { more: 'Bekijk wat dit inhoudt' },
} as const

/**
 * The row of cards, scrolled sideways by scrolling down.
 *
 * Three requirements, in order of how hard they are to give up.
 *
 * 1. Every card has to be present in the prerendered HTML. These pages exist to
 *    be read by crawlers and answer engines that never run JavaScript; a
 *    carousel that builds its slides in JS would be an empty div to all of them.
 * 2. The reader should not have to swipe. Scrolling down pins the section and
 *    walks the row sideways until the last card is reached, then the page
 *    continues normally.
 * 3. It has a beginning and an end. No loop, no clones: the row starts hard
 *    against the left edge and stops at the last card.
 *
 * So the markup is a plain horizontal row that already works with no JavaScript
 * at all (native side-scrolling, which is also what small screens keep). The
 * pinning is a progressive enhancement on top: on a wide screen the section is
 * given extra page height, its inner frame sticks to the viewport, and the row
 * is translated in step with how far the reader has scrolled into that height.
 *
 * Reduced motion turns the whole enhancement off, because tying horizontal
 * movement to vertical scrolling is exactly what that preference is about.
 */
export function AutomationRail({
  h2,
  intro,
  items,
}: {
  h2: string
  intro?: string
  items: AutomationCard[]
}) {
  const { lang } = useLang()
  const t = LABELS[lang]
  const outerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    if (!outer || !sticky || !track) return

    const wide = window.matchMedia('(min-width: 1024px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    let distance = 0
    let raf = 0

    /** Give back the plain side-scrolling row. */
    const reset = () => {
      outer.style.height = ''
      sticky.style.position = ''
      sticky.style.top = ''
      track.style.transform = ''
      track.style.overflowX = ''
      distance = 0
    }

    const measure = () => {
      if (!wide.matches || still.matches) {
        reset()
        return
      }
      /* The row is wider than the viewport by exactly this much, and that is
         also how much extra page height the section needs so the sideways
         travel and the vertical travel finish together. */
      track.style.overflowX = 'hidden'
      distance = Math.max(track.scrollWidth - track.clientWidth, 0)
      if (distance === 0) {
        reset()
        return
      }
      /* Past het blok niet in het venster, dan zou vastklemmen de onderkant
         afsnijden en zag de lezer de onderste helft van de kaarten nooit. Dan
         liever gewoon zijwaarts kunnen scrollen. */
      if (sticky.offsetHeight > window.innerHeight) {
        reset()
        return
      }
      sticky.style.position = 'sticky'
      sticky.style.top = '0px'
      outer.style.height = `${sticky.offsetHeight + distance}px`
      apply()
    }

    const apply = () => {
      raf = 0
      if (distance === 0) return
      const top = outer.getBoundingClientRect().top
      // 0 while the section is still below, 1 once its extra height is used up.
      const progress = Math.min(Math.max(-top / distance, 0), 1)
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    wide.addEventListener('change', measure)
    still.addEventListener('change', measure)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      wide.removeEventListener('change', measure)
      still.removeEventListener('change', measure)
      reset()
    }
  }, [items.length])

  return (
    <section ref={outerRef} className="relative">
      <div ref={stickyRef} className="mx-auto w-full max-w-[1400px] overflow-hidden px-6 py-16 lg:py-20">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[38px]">
            {h2}
          </h2>
          {intro && (
            <p data-boilerplate className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-faint">
              {intro}
            </p>
          )}
        </Reveal>

        {/* Full-bleed left so the row starts hard against the page edge, which is
            also where the sideways travel begins. */}
        <div
          ref={trackRef}
          className="mt-10 -mx-6 flex gap-5 overflow-x-auto px-6 pb-4 will-change-transform [scrollbar-width:none] lg:mt-12 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const inner = (
              <>
                <img
                  src={item.image}
                  alt={item.alt}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[3/2] w-full shrink-0 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-[21px] leading-tight text-ink">{item.title}</h3>
                  <p
                    {...(item.shared ? { 'data-boilerplate': true } : {})}
                    className="mt-3 text-[15px] leading-[1.7] text-muted"
                  >
                    {item.body}
                  </p>
                  {item.href && (
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] text-ink-soft/70 transition-colors group-hover:text-ink">
                      {t.more}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              </>
            )
            /* One fixed width and one fixed height for every card, so the row
               reads as a set rather than as a ragged collage. The link sits on
               mt-auto, which is what keeps the arrow on the same line in each
               card even when the two-sentence body runs short. */
            const shell =
              'group flex h-[400px] w-[80vw] shrink-0 flex-col overflow-hidden rounded-[24px] border border-line bg-white/[0.015] transition-colors duration-500 hover:border-line-strong hover:bg-white/[0.03] sm:w-[52vw] lg:h-[430px] lg:w-[calc((100%-3rem)/3)] lg:min-w-[340px]'

            return item.href ? (
              <Link key={item.title} to={item.href} className={shell}>
                {inner}
              </Link>
            ) : (
              <article key={item.title} className={shell}>
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
