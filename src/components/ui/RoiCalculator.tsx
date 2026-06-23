import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '@/lib/useCountUp'
import { cn } from '@/lib/utils'

/**
 * Universal ROI calculator — "money on the table".
 *
 * One honest model for every service that uses it: how many people do the
 * repetitive work, how many hours a day each loses to it, and what an hour of
 * their time costs. Multiplied across a working year, that is the cost sitting
 * on the table, the ceiling of what automating it could hand back. We never
 * name our price here, we just make the cost of doing nothing impossible to
 * unsee. All maths in TypeScript, no eval, computed live from the sliders.
 */

const WORKDAYS = 220 // working days a year, a cautious ~44 weeks at 5 days

const nf = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat('nl-BE', opts)
const eur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

type Input = {
  key: 'people' | 'hoursPerDay' | 'hourlyRate'
  label: string
  min: number
  max: number
  default: number
  step: number
  /** how the live value is rendered next to the label */
  render: (v: number) => string
  help?: string
}

const INPUTS: Input[] = [
  {
    key: 'people',
    label: 'People doing this repetitive work',
    min: 1,
    max: 50,
    default: 5,
    step: 1,
    render: (v) => `${nf().format(v)} ${v === 1 ? 'person' : 'people'}`,
  },
  {
    key: 'hoursPerDay',
    label: 'Hours each loses to it, per day',
    min: 0.5,
    max: 8,
    default: 2,
    step: 0.5,
    render: (v) => `${nf({ maximumFractionDigits: 1 }).format(v)} h / day`,
    help: 'The manual, repeatable part of the day, the work a system could do instead.',
  },
  {
    key: 'hourlyRate',
    label: 'What an hour of their time costs you',
    min: 15,
    max: 150,
    default: 40,
    step: 5,
    render: (v) => `${eur.format(v)} / h`,
    help: 'A cautious default, below the Belgian loaded average. Use your own figure.',
  },
]

function Slider({
  input,
  value,
  accent,
  onChange,
}: {
  input: Input
  value: number
  accent: string
  onChange: (n: number) => void
}) {
  const pct = ((value - input.min) / (input.max - input.min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`roi-${input.key}`} className="text-[13px] leading-snug text-muted">
          {input.label}
        </label>
        <span className="shrink-0 font-mono text-[13px] tabular-nums text-ink">{input.render(value)}</span>
      </div>
      <input
        id={`roi-${input.key}`}
        type="range"
        min={input.min}
        max={input.max}
        step={input.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={input.label}
        className={cn(
          'mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70',
        )}
        style={{ background: `linear-gradient(to right, ${accent} ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
      {input.help && <p className="mt-2 text-[11.5px] leading-relaxed text-dim">{input.help}</p>}
    </div>
  )
}

export function RoiCalculator({ accent }: { accent: string }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(INPUTS.map((i) => [i.key, i.default])),
  )

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const hoursPerYear = values.people * values.hoursPerDay * WORKDAYS
  const annualCost = hoursPerYear * values.hourlyRate
  const animated = useCountUp(inView ? annualCost : 0)

  const stats = [
    { label: 'Per month', value: eur.format(Math.round(annualCost / 12)) },
    { label: 'Hours a year', value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursPerYear)) },
    { label: 'Full-time weeks', value: nf({ maximumFractionDigits: 1 }).format(hoursPerYear / 40) },
  ]

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[28px] border border-line bg-white/[0.025] p-7 backdrop-blur-md sm:p-9 lg:p-11"
    >
      {/* one accent glow, behind the counter only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-0 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: accent, opacity: 0.1 }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative grid gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
        {/* Counter + outputs */}
        <div>
          <div
            className="font-serif leading-[0.95] tracking-[-0.02em] text-ink tabular-nums"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.25rem)' }}
          >
            {eur.format(Math.round(animated))}
          </div>
          <div className="label-mono mt-3 text-muted">on the table, every year</div>
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-faint">
            What this repetitive work costs you across a working year. The ceiling of what automating it
            could hand back to your team.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-9 gap-y-5">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-[19px] tabular-nums text-ink-soft">{s.value}</div>
                <div className="mt-1 text-[10.5px] uppercase tracking-[0.1em] text-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-6 lg:border-l lg:border-line lg:pl-14">
          {INPUTS.map((input) => (
            <Slider
              key={input.key}
              input={input}
              value={values[input.key]}
              accent={accent}
              onChange={(n) => setValues((v) => ({ ...v, [input.key]: n }))}
            />
          ))}
        </div>
      </div>

      <p className="relative mt-9 border-t border-line pt-6 text-[12.5px] leading-relaxed text-dim">
        A rough estimate from your own numbers, based on 220 working days a year, not a promise. It shows the
        full cost of that time, so you can see what is at stake. Real savings depend on your process, which we
        scope honestly before any build.
      </p>
    </div>
  )
}
