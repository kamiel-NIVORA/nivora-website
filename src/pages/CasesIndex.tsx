import { LangLink as Link } from '@/components/ui/LangLink'
import { Reveal } from '@/components/animations/Reveal'
import { CaseCover } from '@/components/cases/CaseCover'
import { getCases } from '@/data/cases'
import { useLang } from '@/i18n'
import { useSeo } from '@/lib/seo'

const COPY = {
  en: {
    heading: 'Work',
    metaDescription:
      'Work we built for clients: websites, web shops, dashboards and the automations behind them, told the way the people who use them see it.',
  },
  nl: {
    heading: 'Work',
    metaDescription:
      'Werk dat we voor klanten bouwden: websites, webwinkels, dashboards en de automatisaties erachter, verteld zoals de mensen die ermee werken het zien.',
  },
} as const

/** Zelfde opbouw als de blog: titel, daaronder een raster van kaarten. */
export function CasesIndex() {
  const { lang } = useLang()
  const t = COPY[lang]
  const cases = getCases(lang)
  useSeo({ title: 'Work · Nivora', description: t.metaDescription, path: '/cases' })

  return (
    <main>
      <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-28 pt-36 lg:pb-32 lg:pt-44">
        <Reveal>
          <h1 className="font-serif text-[44px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[60px]">{t.heading}</h1>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i, 5) * 0.06}>
              <Link to={`/cases/${c.slug}`} className="group flex h-full flex-col">
                <CaseCover c={c} eager={i < 3} hover className="aspect-[16/10] rounded-2xl" />
                <h2 className="mt-5 font-serif text-[21px] leading-[1.25] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-white">
                  {c.title}
                </h2>
                <p className="mt-3 text-[13px] text-faint">
                  {c.client} · {c.meta}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
