import { cn } from '@/lib/utils'

/**
 * Het scherm dat wij voor een architectenbureau bouwen, nagebouwd in HTML.
 *
 * Bewust geen screenshot en geen gegenereerd beeld. Een screenshot van iets dat
 * nog niet bestaat is een leugen met pixels, en een gegenereerd dashboard krijgt
 * verzonnen letters op elke knop. Dit is opmaak: scherp op elk scherm, het volgt
 * de huisstijl vanzelf, en het weegt niets.
 *
 * Wat er staat is wat de Radar echt doet: oproepen met een score, de reden
 * erachter, en de uren die de kandidatuur gaat kosten. De cijfers zijn een
 * voorbeeld en de pagina zegt dat er ook bij; ze zijn gekozen zodat ze klopt met
 * wat de tekst belooft (vier tot zeven teams bij een Open Oproep, een
 * biedvergoeding wanneer er ontwerpwerk gevraagd wordt).
 */

type Oproep = {
  titel: string
  opdrachtgever: string
  score: number
  reden: string
  uren: string
  vergoeding: string
}

const OPROEPEN: Oproep[] = [
  {
    titel: 'Basisschool, uitbreiding en refter',
    opdrachtgever: 'Gemeentebestuur',
    score: 82,
    reden: 'Selectie op referenties, vier teams door, biedvergoeding voorzien',
    uren: '38 u',
    vergoeding: '€10.000',
  },
  {
    titel: 'Woonzorgcentrum, nieuwbouw',
    opdrachtgever: 'Zorgvereniging',
    score: 64,
    reden: 'Ereloonvork onderaan de markt, timing botst met uw capaciteit',
    uren: '38 u',
    vergoeding: '€12.000',
  },
  {
    titel: 'Herinrichting marktplein',
    opdrachtgever: 'Intercommunale',
    score: 23,
    reden: 'Gevelbeelden gevraagd in ronde één, twaalf kandidaten, geen biedvergoeding',
    uren: '80 u',
    vergoeding: 'geen',
  },
]

/** Groen boven de zestig, oker in het midden, rood eronder. Eén blik volstaat. */
function scoreKleur(score: number): string {
  if (score >= 70) return 'text-[var(--color-olive)]'
  if (score >= 45) return 'text-[var(--color-gold)]'
  return 'text-[var(--color-terracotta)]'
}

function scoreBalk(score: number): string {
  if (score >= 70) return 'bg-[var(--color-olive)]'
  if (score >= 45) return 'bg-[var(--color-gold)]'
  return 'bg-[var(--color-terracotta)]'
}

const TABS = ['Radar', 'Kandidaturen', 'Intelligence', 'Cijfers'] as const

export function CockpitMock({ className }: { className?: string }) {
  return (
    <div className={cn('select-none', className)} aria-hidden>
      {/* Kop: tabbladen en de periode. Geen knoppen die niets doen. */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={cn(
                'whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12px] transition-colors sm:px-3 sm:text-[13px]',
                i === 0 ? 'bg-white/[0.06] text-ink' : 'text-dim',
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="hidden shrink-0 text-[11px] text-dim sm:block">Vanochtend, 8u30</span>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.12em] text-dim">Nieuw sinds gisteren</p>

        <ul className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-2.5">
          {OPROEPEN.map((o) => (
            <li
              key={o.titel}
              className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border border-line bg-white/[0.015] p-3 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:p-4"
            >
              {/* De score, als getal en als balkje. */}
              <div className="flex w-11 flex-col items-center gap-1.5 sm:w-12">
                <span className={cn('font-serif text-[22px] leading-none sm:text-[26px]', scoreKleur(o.score))}>
                  {o.score}
                </span>
                <span className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <span className={cn('block h-full rounded-full', scoreBalk(o.score))} style={{ width: `${o.score}%` }} />
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-[13.5px] text-ink-soft sm:text-[14.5px]">{o.titel}</p>
                <p className="mt-0.5 text-[11.5px] text-dim">{o.opdrachtgever}</p>
                <p className="mt-1.5 text-[12px] leading-[1.5] text-faint sm:mt-2">{o.reden}</p>
              </div>

              {/* De twee getallen waar de beslissing op hangt. */}
              <dl className="col-span-2 mt-1 flex gap-5 border-t border-line pt-2.5 sm:col-span-1 sm:mt-0 sm:flex-col sm:gap-2 sm:border-0 sm:pt-0 sm:text-right">
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.1em] text-dim">Kandidatuur</dt>
                  <dd className="mt-0.5 text-[13px] tabular-nums text-ink-soft">{o.uren}</dd>
                </div>
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.1em] text-dim">Vergoeding</dt>
                  <dd className="mt-0.5 text-[13px] tabular-nums text-ink-soft">{o.vergoeding}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-4 border-t border-line pt-3 text-[11.5px] leading-relaxed text-dim sm:mt-5">
          Voorbeeldweergave. De score komt uit de selectieleidraad zelf, en bij elk onderdeel staat de zin waarop
          hij gebaseerd is.
        </p>
      </div>
    </div>
  )
}
