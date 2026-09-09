import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LangLink } from '@/components/ui/LangLink'
import { getLegalDoc, type LegalSlug } from '@/data/legal'
import { useLang } from '@/i18n'
import { useSeo } from '@/lib/seo'

/**
 * De juridische documenten. Dit is geen landingspagina maar een naslagwerk:
 * negentien artikels lang, zelden van boven naar onder gelezen, en meestal
 * geopend omdat iemand één ding zoekt.
 *
 * Daarom drie dingen die een marketingpagina niet heeft:
 *  1. een index bovenaan, want een muur van negentien koppen zonder overzicht
 *     dwingt tot scrollen;
 *  2. genummerde artikels met een anker, want zo verwijst men naar een
 *     overeenkomst ("zie artikel 12") en zo kan Kamiel een clausule
 *     doorsturen zonder de hele pagina mee te geven;
 *  3. een leesbreedte die smaller is dan het kader, want lopende tekst leest
 *     slecht boven ongeveer zeventig tekens per regel.
 * De nummering is dus geen versiering: ze zegt iets waars over het document.
 */

const COPY = {
  en: {
    lastUpdated: 'Last updated',
    contact: 'Go to contact',
    index: 'In this document',
    articles: 'articles',
    closing: 'Something unclear in here?',
    closingBody: 'Ask us. We would rather explain a clause than have you guess at it.',
  },
  nl: {
    lastUpdated: 'Laatst bijgewerkt',
    contact: 'Naar de contactpagina',
    index: 'In dit document',
    articles: 'artikels',
    closing: 'Iets onduidelijk hierin?',
    closingBody: 'Vraag het ons. We leggen een artikel liever uit dan dat u ernaar moet gissen.',
  },
} as const

/** Stabiel anker uit een kop, zodat een link naar een artikel blijft werken
 *  zolang de kop niet verandert. */
const anchorFor = (heading: string) =>
  heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const doc = getLegalDoc(lang, slug)
  useSeo({ title: `${doc.title} · Nivora`, description: doc.intro, path: `/${slug}` })

  const sections = doc.sections.map((section, i) => ({
    ...section,
    n: i + 1,
    id: anchorFor(section.heading),
  }))

  return (
    <main>
      <article className="relative mx-auto w-full max-w-[780px] px-6 pb-28 pt-32 lg:pb-36 lg:pt-40">
        {/* Geen intro-animatie op deze pagina. Een juridisch document moet
            leesbaar zijn zodra het laadt, ook zonder JavaScript en ook als een
            animatie niet start; de titel mag nooit van een fade afhangen. */}
        <header>
          <h1 className="font-serif text-[32px] leading-[1.1] tracking-[-0.022em] text-ink break-words sm:text-[46px]">
            {doc.title}
          </h1>

          {/* De datum is een gegeven over het document, geen zin eronder.
              Mono en klein, met het aantal artikels ernaast, zodat de lezer
              meteen weet hoe zwaar het document is. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] uppercase tracking-[0.04em] text-faint font-mono">
            <span>{t.lastUpdated} {doc.updated}</span>
            <span aria-hidden="true" className="text-dim">·</span>
            <span>{sections.length} {t.articles}</span>
          </div>

          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-muted sm:text-[18px]">
            {doc.intro}
          </p>
        </header>

        {/* Index. Bij negentien artikels is dit het verschil tussen zoeken en
            vinden; het staat er dus voor de lezer, niet voor de vorm. */}
        <nav aria-label={t.index} className="mt-12 rounded-2xl border border-line bg-card px-6 py-6 sm:px-7">
          <p className="label-mono text-faint">{t.index}</p>
          <ol className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex gap-3 rounded-md py-1.5 text-[14.5px] leading-snug text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-line-strong"
                >
                  <span className="w-5 shrink-0 pt-px text-right font-mono text-[12px] tabular-nums text-dim transition-colors group-hover:text-faint">
                    {section.n}
                  </span>
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-16 flex flex-col gap-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              {/* Het nummer hangt op desktop in de marge, zodat de kop zelf op
                  dezelfde lijn blijft staan als de lopende tekst. */}
              <div className="lg:relative">
                <span
                  aria-hidden="true"
                  className="mb-2 block font-mono text-[12px] tabular-nums text-dim lg:absolute lg:right-full lg:top-[7px] lg:mb-0 lg:mr-6 lg:block"
                >
                  {String(section.n).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-[23px] leading-snug tracking-[-0.012em] text-ink sm:text-[25px]">
                  <a href={`#${section.id}`} className="hover:text-ink-soft">
                    {section.heading}
                  </a>
                </h2>
              </div>

              <div className="mt-5 flex max-w-[68ch] flex-col gap-4">
                {section.blocks.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i} className="text-[16px] leading-[1.78] text-muted sm:text-[16.5px]">
                      {block}
                    </p>
                  ) : (
                    /* Streepjes in plaats van bolletjes: rustiger in een
                       document dat al veel opsommingen bevat. */
                    <ul key={i} className="flex flex-col gap-2.5">
                      {block.list.map((item, j) => (
                        <li
                          key={j}
                          className="relative pl-5 text-[16px] leading-[1.7] text-muted sm:text-[16.5px] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-dim"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Afsluiter. De laatste sectie van beide documenten is "Contact" met
            een mailadres; dit blok sluit daarop aan voor wie liever een
            formulier invult dan zelf een mail opstelt. */}
        <div className="mt-16 rounded-2xl border border-line bg-card px-6 py-7 sm:px-7">
          <p className="font-serif text-[19px] leading-snug text-ink">{t.closing}</p>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">{t.closingBody}</p>
          <Button asChild variant="dark" size="md" className="mt-5">
            <LangLink to="/contact">
              {t.contact}
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </LangLink>
          </Button>
        </div>
      </article>
    </main>
  )
}
