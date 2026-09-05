import { Reveal } from '@/components/animations/Reveal'
import { LangLink as Link } from '@/components/ui/LangLink'
import { getServices } from '@/lib/navigation'
import { useLang } from '@/i18n'
import type { ProductSummary } from '@/data/landing/products'

/**
 * De diensten waaruit één oplossing bestaat, als een rij icoontjes onder de hero.
 *
 * Bewust zonder kop en zonder uitleg. Een lezer die op een oplossingspagina
 * landt wil weten wat hij afneemt, niet ons dienstenmenu, en de vier iconen
 * zeggen dat in één oogopslag. Het zijn dezelfde beelden als in het navigatie-
 * menu (getServices), zodat iemand die ze daar al zag ze hier herkent.
 *
 * Dit verving twee dingen tegelijk: de alinea "gebouwd uit Local AI en AIOS" in
 * de kop van elke oplossingspagina, en de twee kaders met alle producten en
 * diensten die de lezer wegleidden van waarvoor hij kwam.
 */
export function ServiceBadges({ services }: { services: ProductSummary['services'] }) {
  const { lang } = useLang()
  if (!services?.length) return null

  const all = getServices(lang)
  const shown = services
    .map((name) => all.find((s) => s.title === name))
    .filter((s): s is (typeof all)[number] => Boolean(s))
  if (!shown.length) return null

  return (
    <section data-shared className="mx-auto w-full max-w-[1400px] px-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {shown.map((s) => (
            <Link
              key={s.title}
              to={s.href}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] py-2 pl-2 pr-5 transition-colors hover:border-line-strong"
            >
              <img
                src={s.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-8 w-8 rounded-[9px] object-cover"
              />
              <span className="text-[13.5px] text-ink-soft/85 transition-colors group-hover:text-ink">
                {s.title}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
