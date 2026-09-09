import { useState } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BandImage } from './BandImage'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { LangLink as Link } from '@/components/ui/LangLink'
import { useLang } from '@/i18n'
import { AutomationRail } from '@/components/landing/AutomationRail'
import { BeforeAfter } from '@/components/landing/BeforeAfter'
import type { LandingBlock } from '@/data/landing/types'

/**
 * Renders one landing-page block. Same idea as the `PostBlock` loop in
 * BlogPost.tsx, but discriminated on an explicit `kind` rather than by sniffing
 * which key is present, because there are more variants here and they carry
 * more fields.
 *
 * Everything is plain semantic HTML: h2, p, ul, dl, table. That is deliberate.
 * The build script renders these very components to static HTML, and answer
 * engines that never run JavaScript read the result.
 */

const H2 = 'font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]'
const BODY = 'text-[17px] leading-[1.8] text-muted sm:text-[18px]'
/* Section intros are structural labels ("Does this sound familiar?", the
   note that the examples are illustrative rather than client cases). They are
   meant to read the same on every page, so data-boilerplate keeps them out of
   the duplicate-content measurement in scripts/prerender.mjs. The disclaimer in
   particular MUST stay identical: it is a statement of fact about what the
   examples are, not copy to be varied for search engines. */
const INTRO = 'mt-4 max-w-2xl text-[16px] leading-[1.7] text-faint'
const SECTION = 'mx-auto w-full max-w-[900px] px-6 py-14 lg:py-20'

/** `noUnusedLocals` is on, so exhaustiveness is asserted by consuming the value. */
function assertNever(x: never): null {
  void x
  return null
}

/** Column labels for the worked examples. Structural rather than copy, so they
 *  live here instead of in every content file. */
const EXAMPLE_LABELS = {
  en: { before: 'Today', after: 'With a system', more: 'See what this looks like' },
  nl: { before: 'Vandaag', after: 'Met een systeem', more: 'Bekijk wat dit inhoudt' },
} as const

export function LandingBlockView({ block, index }: { block: LandingBlock; index: number }) {
  const { lang } = useLang()
  const LABELS = EXAMPLE_LABELS[lang]
  // Stagger only the first few, so a long page does not feel like it is dealing cards.
  const delay = Math.min(index, 3) * 0.05

  switch (block.kind) {
    case 'answer':
      /* Het antwoordblok staat in een eigen kader.
      
         Dit is de eerste tekst na de vastgezette zin, en het was tot nu toe een
         kop met een streepje ervoor en daaronder losse alinea's: precies zo saai
         als de rest van de pagina, terwijl dit net het stuk is dat de bezoeker
         moet vasthouden. Het glanseffect is opgebouwd uit wat de site al
         gebruikt (bg-soft, border-line, rounded) plus twee dingen: een heel
         zachte verticale verloop over het vlak, en een lichtlijn van één pixel
         langs de bovenrand die het kader van het scherm laat afsteken. Geen
         nieuwe kleuren en geen nieuwe bibliotheek. */
      return (
        <section className="mx-auto w-full max-w-[900px] px-6 py-14 lg:py-20">
          <Reveal delay={delay}>
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-white/[0.055] via-white/[0.022] to-transparent p-8 sm:p-11">
              {/* De lichtlijn langs de bovenrand: dit is wat het glans geeft. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
              {/* Zachte gloed linksboven, zodat het vlak niet plat blijft. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-white/[0.045] blur-3xl"
              />
              <div className="relative">
                <h2 className="font-serif text-[27px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[33px]">
                  {block.h2}
                </h2>
                {/* data-speakable marks the quotable paragraph for the schema in
                    src/lib/landingSchema.ts. Keep the attribute and the text together. */}
                <p
                  data-speakable
                  className="mt-6 text-[18px] leading-[1.72] text-ink-soft sm:text-[20px]"
                >
                  {block.answer}
                </p>
                {block.detail?.length ? (
                  <div className="mt-7 flex flex-col gap-4 border-t border-line pt-7">
                    {block.detail.map((p, i) => (
                      <p key={i} className="text-[15.5px] leading-[1.7] text-faint">
                        {p}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        </section>
      )

    case 'automations':
      return (
        <AutomationRail h2={block.h2} intro={block.intro} items={block.items} />
      )

    case 'examples':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={delay + i * 0.05}>
                <article className="overflow-hidden rounded-2xl border border-line bg-bg-soft">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.alt ?? ''}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[21/9] w-full object-cover"
                    />
                  )}
                  <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-[21px] leading-tight text-ink">{item.title}</h3>
                  <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <dt className="label-mono text-faint">
                        {/* Present tense on purpose: this is the situation today. */}
                        {LABELS.before}
                      </dt>
                      <dd className="mt-2.5 text-[15px] leading-[1.7] text-muted">{item.before}</dd>
                    </div>
                    <div className="sm:border-l sm:border-line sm:pl-6">
                      <dt className="label-mono text-faint">{LABELS.after}</dt>
                      <dd className="mt-2.5 text-[15px] leading-[1.7] text-ink-soft/90">{item.after}</dd>
                    </div>
                  </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'image':
      return <BandImage src={block.src} alt={block.alt} caption={block.caption} />

    case 'prose':
      /* Kop en alinea's komen na elkaar op in plaats van als één blok. Het
         verschil is klein per element en groot over de sectie: de lezer volgt
         de tekst in plaats van tegen een muur tekst aan te kijken die er in
         één keer staat. */
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-5">
            {block.body.map((p, i) => (
              <Reveal key={i} delay={delay + 0.08 + i * 0.09} y={18}>
                <p className={BODY}>{p}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'beforeAfter':

      return <BeforeAfter h2={block.h2} intro={block.intro} pairs={block.pairs} />

    case 'pillars':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={delay + i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-bg-soft p-6">
                  <h3 className="font-serif text-[20px] leading-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'checklist':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          {/* Per regel, want dit is een lijst die je afvinkt terwijl je leest.
              Ze komen van links binnen, in de leesrichting. */}
          <ul className="mt-8 flex flex-col gap-3.5">
            {block.items.map((item, i) => (
              <Reveal key={item} as="li" delay={delay + 0.1 + i * 0.1} y={0} x={-14} className="flex items-start gap-3.5">
                <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-ink-soft/60" aria-hidden="true" />
                <span className="text-[16px] leading-[1.7] text-muted">{item}</span>
              </Reveal>
            ))}
          </ul>
        </section>
      )

    case 'steps':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <ol className="mt-10 flex flex-col">
            {block.steps.map((step, i) => (
              <Reveal key={step.title} delay={delay + i * 0.05}>
                <li className="flex gap-6 border-t border-line py-7">
                  <span className="label-mono w-16 shrink-0 pt-1 text-faint">{step.phase}</span>
                  <div>
                    <h3 className="font-serif text-[21px] leading-tight text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-[16px] leading-[1.7] text-muted">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )

    case 'compare':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <Reveal delay={delay + 0.06}>
            {/* Wide content scrolls inside its own container so the page body never does. */}
            <div className="mt-10 overflow-x-auto">
              {/* table-fixed: zonder dat bepaalt de langste cel de kolombreedte, en dan
                    knijpt één zin van vijf woorden de andere kolommen dood. Met vaste
                    breedtes krijgt elke variant evenveel ruimte en breekt de tekst
                    netjes af. De minimumbreedte schaalt mee met het aantal kolommen,
                    zodat de tabel liever scrolt dan verkrampt. */}
              <table
                className="w-full table-fixed border-collapse text-left"
                style={{ minWidth: `${220 + block.columns.length * 130}px` }}
              >
                <colgroup>
                  <col style={{ width: '22%' }} />
                  {block.columns.map((c) => (
                    <col key={c} style={{ width: `${78 / block.columns.length}%` }} />
                  ))}
                </colgroup>
                <thead>
                  <tr className="border-b border-line-strong">
                    <th className="label-mono py-3 pr-4 font-normal text-faint" scope="col">
                      <span className="sr-only">Aspect</span>
                    </th>
                    {block.columns.map((c, ci) => (
                      <th
                        key={c}
                        scope="col"
                        className={`py-3 text-[15px] font-medium text-ink-soft ${ci < block.columns.length - 1 ? 'pr-4' : ''}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.label} className="border-b border-line align-top">
                      <th scope="row" className="py-5 pr-4 text-[14px] font-normal text-faint">
                        {row.label}
                      </th>
                      {block.columns.map((c, ci) => {
                        const laatste = ci === block.columns.length - 1
                        return (
                          <td
                            key={c}
                            className={`py-5 text-[15px] leading-[1.65] ${laatste ? 'text-ink-soft/90' : 'pr-4 text-muted'}`}
                          >
                            {row.values[ci] ?? ''}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
      )

    case 'stats':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {block.items.map((item, i) => (
              <Reveal key={item.label} delay={delay + i * 0.06}>
                <div className="border-t border-line pt-5">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-serif text-[40px] leading-none text-ink">{item.value}</span>
                    <span className="mt-3 block text-[15px] leading-[1.6] text-faint">{item.label}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>
      )

    case 'linkGrid':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p data-boilerplate className={INTRO}>{block.intro}</p>}
          </Reveal>
          <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {block.links.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="block border-b border-line py-3 text-[15px] text-ink-soft/80 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'cta':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <div className="rounded-3xl border border-line bg-bg-soft px-6 py-12 text-center sm:px-12">
              <h2 className="mx-auto max-w-xl font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[34px]">
                {block.h2}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.7] text-muted">{block.body}</p>
              <div className="mt-8 flex justify-center">
                <BookCallButton>{block.button}</BookCallButton>
              </div>
              {block.reassurance && <p className="mt-5 text-[13px] text-faint">{block.reassurance}</p>}
            </div>
          </Reveal>
        </section>
      )

    case 'price':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <div className="rounded-3xl border border-line bg-bg-soft px-6 py-10 sm:px-10">
              <h2 className={H2}>{block.h2}</h2>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {block.was && (
                  <span className="font-serif text-[24px] text-dim line-through">{block.was}</span>
                )}
                <span className="font-serif text-[44px] leading-none text-ink sm:text-[52px]">{block.amount}</span>
                <span className="text-[15px] text-faint">{block.qualifier}</span>
              </p>
              <ul className="mt-8 grid gap-3">
                {block.terms.map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] leading-[1.7] text-muted">
                    <Check aria-hidden className="mt-[6px] size-4 shrink-0 text-ink-soft/70" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {block.note && <p className="mt-8 border-t border-line pt-6 text-[15px] leading-[1.7] text-faint">{block.note}</p>}
            </div>
          </Reveal>
        </section>
      )

    case 'calculator':
      return (
        <section className={SECTION}>
          <Reveal delay={delay}>
            <h2 className={H2}>{block.h2}</h2>
            {block.intro && <p className={INTRO}>{block.intro}</p>}
          </Reveal>
          <Reveal delay={delay + 0.05}>
            <Calculator block={block} />
          </Reveal>
        </section>
      )

    default:
      return assertNever(block)
  }
}

/* ────────────────────────────────────────────────────────────────────────────
   Het rekenblok

   Eén klein interactief onderdeel op een verder statische pagina. De sommen
   staan HIER en niet in de contentbestanden: een formule uit data halen zou
   betekenen dat er ergens een uitdrukking uit een tekstbestand geëvalueerd
   wordt, en dat is een deur die niet open hoeft voor een marketingpagina.

   De uitkomst rekent altijd door op wat de bezoeker intikt. Blijft hij van de
   velden af, dan ziet hij onze schatting, en dat staat er ook bij. Zonder die
   zin is een rekenblok een belofte met een rekenmachine ervoor.
   ──────────────────────────────────────────────────────────────────────── */

type CalculatorBlock = Extract<LandingBlock, { kind: 'calculator' }>

const euro = (n: number): string =>
  `€${Math.round(n).toLocaleString('nl-BE')}`

/** De twee sommen, elk met de velden die ze verwacht. Ontbreekt een veld, dan
 *  telt het als nul en blijft de uitkomst leesbaar in plaats van NaN. */
function compute(formula: CalculatorBlock['formula'], v: Record<string, number>) {
  const uurkost = v.uurkost || 0
  if (formula === 'winratio') {
    const wedstrijden = v.wedstrijden || 0
    const ereloon = v.ereloon || 0
    const extra = (pp: number) => (wedstrijden * pp) / 100
    return [
      { label: '+5 procentpunten winratio', value: `${extra(5).toFixed(1)} opdrachten · ${euro(extra(5) * ereloon)}` },
      { label: '+10 procentpunten winratio', value: `${extra(10).toFixed(1)} opdrachten · ${euro(extra(10) * ereloon)}` },
    ]
  }
  /* urenPerJaar: het aantal keer dat iets gebeurt, maal de uren die het nu kost,
     plus het wekelijkse zoekwerk als de pagina dat veld meegeeft. */
  const perJaar = (v.aantal || 0) * (v.urenPer || 0)
  const zoeken = (v.urenWeek || 0) * 45
  const uren = perJaar + zoeken
  return [
    { label: 'Uren per jaar', value: `${Math.round(uren)} uur` },
    { label: 'Aan uw uurkost', value: euro(uren * uurkost) },
  ]
}

function Calculator({ block }: { block: CalculatorBlock }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(block.fields.map((f) => [f.key, f.value])),
  )
  const rows = compute(block.formula, values)
  const jaarwaarde = (values.uurkost || 0) * ((values.aantal || 0) * (values.urenPer || 0) + (values.urenWeek || 0) * 45)
  const maanden = block.priceForPayback && jaarwaarde > 0 ? (block.priceForPayback / jaarwaarde) * 12 : null

  return (
    <div className="mt-8 grid gap-8 rounded-3xl border border-line bg-bg-soft px-6 py-8 sm:px-10 lg:grid-cols-[1fr_auto] lg:gap-12">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        {block.fields.map((f) => (
          <label key={f.key} className="grid gap-2">
            <span className="text-[14px] text-faint">{f.label}</span>
            <span className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={values[f.key]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.key]: Math.max(0, Number(e.target.value) || 0) }))
                }
                className="w-28 rounded-xl border border-line bg-bg px-3 py-2 text-[17px] tabular-nums text-ink outline-none focus-visible:border-ink-soft/60"
              />
              {f.suffix && <span className="text-[14px] text-dim">{f.suffix}</span>}
            </span>
          </label>
        ))}
      </div>

      <dl className="grid content-start gap-5 border-t border-line pt-6 lg:min-w-[15rem] lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[14px] text-faint">{r.label}</dt>
            <dd className="mt-1 font-serif text-[30px] leading-none tabular-nums text-ink">{r.value}</dd>
          </div>
        ))}
        {maanden != null && Number.isFinite(maanden) && (
          <div>
            <dt className="text-[14px] text-faint">Terugverdiend na</dt>
            <dd className="mt-1 font-serif text-[30px] leading-none tabular-nums text-ink">
              {maanden < 1 ? 'minder dan een maand' : `${maanden.toFixed(1)} maanden`}
            </dd>
          </div>
        )}
      </dl>

      <p className="text-[14px] leading-[1.7] text-dim lg:col-span-2">{block.note}</p>
    </div>
  )
}
