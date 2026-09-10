import { useState } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Wat het systeem achter elkaar doet, als een keten met een lijn ertussen.
 *
 * Geleend van een tool-calls-weergave uit een AI-interface, waar de vorm precies
 * klopt: een rij iconen die de stappen samenvat, en per stap een regel die
 * uitklapt naar wat erin ging en wat eruit kwam. Dat is ook hier de vraag van de
 * lezer, alleen heten de stappen anders.
 *
 * Twee dingen zijn vervangen. Het origineel hangt aan Hugeicons en aan een
 * markdown-renderer die niet meegeleverd waren; hier doen lucide-iconen en
 * gewone tekst hetzelfde werk, en lucide staat al in het project. En de
 * kleurklassen zijn de huisstijltokens geworden in plaats van de zinc-schaal,
 * anders staat er een grijs blok in een pagina die verder near-black is.
 */

export type WorkflowStep = {
  /** Wat er gebeurt, in de taal van de lezer. */
  titel: string
  /** Waar het gebeurt: de bron, het systeem, de fase. */
  bron: string
  icon: LucideIcon
  /** Wat erin gaat. Optioneel; zonder detail klapt de stap niet uit. */
  invoer?: string
  /** Wat eruit komt. */
  uitvoer?: string
}

export function WorkflowSteps({
  steps,
  className,
  samenvatting,
}: {
  steps: WorkflowStep[]
  className?: string
  /** De regel naast de icoonrij, bv. "Vier stappen, veertig seconden". */
  samenvatting: string
}) {
  const [open, setOpen] = useState(false)
  const [uit, setUit] = useState<Set<number>>(new Set())

  const wissel = (i: number) =>
    setUit((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  if (!steps.length) return null

  return (
    <div className={cn('w-full max-w-[36rem]', className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-3 py-2 text-faint transition-colors hover:text-ink-soft"
      >
        {/* De iconen licht gekanteld, om en om. Dat leest als een stapel
            handelingen in plaats van als een rij knoppen. */}
        <span className="flex items-center -space-x-1.5">
          {steps.slice(0, 6).map((s, i) => (
            <span
              key={s.titel}
              className="grid size-8 place-items-center rounded-lg border border-line bg-surface"
              style={{ rotate: steps.length > 1 ? (i % 2 === 0 ? '7deg' : '-7deg') : '0deg', zIndex: i }}
            >
              <s.icon aria-hidden className="size-[15px] text-muted" />
            </span>
          ))}
        </span>
        <span className="text-[13px]">{samenvatting}</span>
        <ChevronDown aria-hidden className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <ol className="pt-2">
            {steps.map((s, i) => {
              const detail = s.invoer || s.uitvoer
              const isUit = uit.has(i)
              return (
                <li key={s.titel} className="flex items-stretch gap-3">
                  {/* Icoon met de verbindingslijn eronder. De lijn is wat de
                      stappen tot een keten maakt in plaats van een lijst. */}
                  <div className="flex flex-col items-center self-stretch">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface">
                      <s.icon aria-hidden className="size-[15px] text-muted" />
                    </span>
                    {i < steps.length - 1 && <span className="min-h-4 w-px flex-1 bg-line-strong" />}
                  </div>

                  <div className="min-w-0 flex-1 pb-4">
                    <button
                      type="button"
                      onClick={() => detail && wissel(i)}
                      aria-expanded={detail ? isUit : undefined}
                      className={cn('group flex items-center gap-1.5 text-left', detail && 'cursor-pointer')}
                    >
                      <span
                        className={cn(
                          'text-[13.5px] text-ink-soft/90',
                          detail && 'transition-colors group-hover:text-ink',
                        )}
                      >
                        {s.titel}
                      </span>
                      {detail && (
                        <ChevronDown
                          aria-hidden
                          className={cn('size-3.5 text-dim transition-transform duration-200', isUit && 'rotate-180')}
                        />
                      )}
                    </button>
                    <p className="mt-0.5 text-[11.5px] text-dim">{s.bron}</p>

                    {isUit && detail && (
                      <dl className="mt-2.5 flex flex-col gap-2 rounded-xl border border-line bg-white/[0.015] p-3 text-[12px]">
                        {s.invoer && (
                          <div>
                            <dt className="text-[10.5px] uppercase tracking-[0.1em] text-dim">Erin</dt>
                            <dd className="mt-0.5 leading-relaxed text-faint">{s.invoer}</dd>
                          </div>
                        )}
                        {s.uitvoer && (
                          <div>
                            <dt className="text-[10.5px] uppercase tracking-[0.1em] text-dim">Eruit</dt>
                            <dd className="mt-0.5 leading-relaxed text-faint">{s.uitvoer}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
