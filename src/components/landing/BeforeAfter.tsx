import { Reveal } from '@/components/animations/Reveal'
import { SideBySideSlide } from '@/components/ui/SideBySideSlide'
import { useLang } from '@/i18n'

export type BeforeAfterPair = {
  /** De lege ruimte, zoals de fotograaf ze aanlevert. */
  before: string
  beforeAlt: string
  /** Dezelfde ruimte, ingericht. */
  after: string
  afterAlt: string
  /** Waarom deze inrichting bij dit pand hoort. Eén zin. */
  caption: string
}

const LABEL = {
  en: { before: 'Empty', after: 'Furnished', hint: 'Drag across the image' },
  nl: { before: 'Leeg', after: 'Ingericht', hint: 'Sleep over het beeld' },
} as const

/**
 * Voor en na, met een schuifregelaar over hetzelfde beeld.
 *
 * De regelaar doet hier het argument: de bezoeker sleept en ziet de meubels
 * verschijnen tegen exact dezelfde muur, hetzelfde raam en dezelfde vloer. Twee
 * losse foto's naast elkaar laten die vraag open, want dan kan de kijker altijd
 * nog denken dat het een andere kamer is.
 *
 * Zonder JavaScript blijft het een gewoon beeld met beide alt-teksten in de
 * HTML, zodat een crawler er niets van mist. Zie SideBySideSlide.
 */
export function BeforeAfter({
  h2,
  intro,
  pairs,
}: {
  h2: string
  intro?: string
  pairs: BeforeAfterPair[]
}) {
  const { lang } = useLang()
  const t = LABEL[lang]

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 py-16 lg:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="max-w-3xl font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[38px]">
              {h2}
            </h2>
            {intro && <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-faint">{intro}</p>}
          </div>
          <span className="label-mono hidden shrink-0 text-faint lg:block">{t.hint}</span>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col gap-14">
        {pairs.map((p, i) => (
          <Reveal key={p.after} delay={Math.min(i, 3) * 0.05}>
            <figure>
              <div className="relative overflow-hidden rounded-[22px] border border-line">
                <SideBySideSlide
                  beforeImage={p.before}
                  afterImage={p.after}
                  beforeAlt={p.beforeAlt}
                  afterAlt={p.afterAlt}
                  initialPosition={52}
                  className="aspect-[4/3] w-full sm:aspect-[16/10]"
                />
                <span className="label-mono pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-white/90 backdrop-blur-sm">
                  {t.before}
                </span>
                <span className="label-mono pointer-events-none absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1 text-white/90 backdrop-blur-sm">
                  {t.after}
                </span>
              </div>
              <figcaption className="mt-4 max-w-3xl text-[15px] leading-[1.7] text-faint">
                {p.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
