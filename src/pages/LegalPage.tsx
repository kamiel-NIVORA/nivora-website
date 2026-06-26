import { Reveal } from '@/components/animations/Reveal'
import { getLegalDoc } from '@/data/legal'
import { useLang } from '@/i18n'

const COPY = {
  en: { label: 'Legal', lastUpdated: 'Last updated' },
  nl: { label: 'Juridisch', lastUpdated: 'Laatst bijgewerkt' },
} as const

export function LegalPage({ slug }: { slug: 'terms' | 'privacy' }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const doc = getLegalDoc(lang, slug)
  return (
    <main>
      <article className="relative mx-auto w-full max-w-[760px] px-6 pb-28 pt-36 lg:pb-32 lg:pt-44">
        {/* Header */}
        <Reveal mode="mount">
          <span className="label-mono text-dim">{t.label}</span>
          <h1 className="mt-4 font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-ink break-words sm:text-[44px] sm:leading-[1.1]">
            {doc.title}
          </h1>
          <p className="mt-4 text-sm text-faint">{t.lastUpdated} {doc.updated}</p>
          <p className="mt-8 text-[17px] leading-[1.75] text-muted sm:text-[18px]">{doc.intro}</p>
        </Reveal>

        <hr className="mt-12 border-line" />

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[22px] leading-snug tracking-[-0.01em] text-ink sm:text-[24px]">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.blocks.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i} className="text-[16px] leading-[1.75] text-muted sm:text-[17px]">
                      {block}
                    </p>
                  ) : (
                    <ul
                      key={i}
                      className="flex list-disc flex-col gap-2 pl-5 marker:text-dim"
                    >
                      {block.list.map((item, j) => (
                        <li
                          key={j}
                          className="pl-1 text-[16px] leading-[1.7] text-muted sm:text-[17px]"
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
      </article>
    </main>
  )
}
