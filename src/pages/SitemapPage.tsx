import { useLang, type Lang } from '@/i18n'
import { useSeo } from '@/lib/seo'
import { Reveal } from '@/components/animations/Reveal'
import { LangLink as Link } from '@/components/ui/LangLink'
import { LANDING_ENTRIES, type LandingEntry } from '@/data/landing/slugs'
import { WRITTEN_IDS } from '@/data/landing'
import { humanise } from '@/data/landing/related'
import { getProducts, getServices, getCompanyPrimary, getResources } from '@/lib/navigation'

/**
 * /sitemap · /nl/sitemap
 *
 * One page listing every URL on the site, grouped. It exists for two reasons.
 *
 * For visitors it is the plain index a big site should have. For crawlers it is
 * what keeps the programmatic landing pages within two clicks of the homepage:
 * the footer's Legal column links here, and this page links to everything else.
 * Without it, adding 120 landing pages would produce 120 orphans that nothing
 * on the site points at.
 *
 * The landing sections are generated from the registry, so a page added to
 * src/data/landing/slugs.ts appears here automatically.
 */

const COPY = {
  en: {
    title: 'All pages',
    intro:
      'Everything on nivoraworks.com, in one list. If you are looking for something specific and cannot find it, the Help Center or a direct message will get you there faster.',
    aiSolutions: 'AI solutions',
    sectors: 'AI by industry',
    niches: 'AI by trade',
    questions: 'Questions and comparisons',
    hubs: 'Overviews',
    products: 'Products',
    services: 'Services',
    company: 'Company',
    resources: 'Resources',
    main: 'Main pages',
    home: 'Home',
  },
  nl: {
    title: 'Alle pagina’s',
    intro:
      'Alles op nivoraworks.com, in één lijst. Zoekt u iets specifieks en vindt u het niet, dan brengt het Helpcentrum of een bericht u er sneller.',
    aiSolutions: 'AI-oplossingen',
    sectors: 'AI per branche',
    niches: 'AI per sector',
    questions: 'Vragen en vergelijkingen',
    hubs: 'Overzichten',
    products: 'Producten',
    services: 'Diensten',
    company: 'Bedrijf',
    resources: 'Resources',
    main: 'Hoofdpagina’s',
    home: 'Home',
  },
} as const

type Group = { title: string; links: { label: string; href: string }[] }

/** Landing entries of one family that actually have copy written. */
function landingGroup(family: LandingEntry['family'], title: string, lang: Lang): Group | null {
  const links = LANDING_ENTRIES.filter((e) => e.family === family && WRITTEN_IDS.has(e.id)).map((e) => ({
    label: humanise(e, lang),
    href: `/${e.slugs.en}`,
  }))
  return links.length ? { title, links } : null
}

export function SitemapPage() {
  const { lang } = useLang()
  const t = COPY[lang]

  const groups: Group[] = [
    {
      title: t.main,
      links: [
        { label: t.home, href: '/' },
        ...getCompanyPrimary(lang).map((i) => ({ label: i.title, href: i.href })),
        { label: 'Contact', href: '/contact' },
      ],
    },
    { title: t.services, links: getServices(lang).map((i) => ({ label: i.title, href: i.href })) },
    { title: t.products, links: getProducts(lang).map((i) => ({ label: i.title, href: i.href })) },
    landingGroup('product', t.aiSolutions, lang),
    landingGroup('niche', t.niches, lang),
    landingGroup('sector', t.sectors, lang),
    landingGroup('question', t.questions, lang),
    landingGroup('hub', t.hubs, lang),
    { title: t.resources, links: getResources(lang).map((i) => ({ label: i.title, href: i.href })) },
  ].filter((g): g is Group => g !== null)

  useSeo({
    title: `${t.title} · Nivora`,
    description: t.intro,
    path: '/sitemap',
  })

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 pt-32 pb-24 lg:pt-40">
      <Reveal>
        <h1 className="font-serif text-[38px] leading-[1.08] tracking-[-0.03em] text-ink sm:text-[52px]">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-muted">{t.intro}</p>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={Math.min(i, 4) * 0.04}>
            <section>
              <h2 className="label-mono border-b border-line pb-3 text-faint">{group.title}</h2>
              <ul className="mt-4 flex flex-col">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="block py-2 text-[15px] leading-snug text-ink-soft/80 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </main>
  )
}
