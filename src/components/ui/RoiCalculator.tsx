import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useCountUp } from '@/lib/useCountUp'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n'
import { BOOKING_URL } from '@/data/contact'
import { RippleButton } from '@/components/ui/RippleButton'

/**
 * ROI calculator — a stepwise "what AIOS hands back" configurator.
 *
 * You configure your team and your work a few things at a time; the yearly saving
 * counts up live under a lamp beam, and a light traces around the card border as you
 * advance, closing the full loop once everything is set. One honest model underneath:
 * people x hours a day x working days x hourly cost x the share AIOS realistically
 * takes over. It is the money on the table, not a promise of price.
 */

const ease = [0.16, 1, 0.3, 1] as const
const nf = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat('nl-BE', opts)
const eur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

type InputKey = 'people' | 'hoursPerDay' | 'hourlyRate' | 'workdays' | 'automatable'

type InputCopy = { label: string; render: (v: number) => string; help?: string }

const COPY = {
  en: {
    inputs: {
      people: { label: 'People doing this repetitive work', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'person' : 'people'}` },
      hoursPerDay: {
        label: 'Hours each loses to it, per day',
        render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} h / day`,
        help: 'The manual, repeatable part of the day.',
      },
      hourlyRate: {
        label: 'What an hour of their time costs you',
        render: (v: number) => `${eur.format(v)} / h`,
        help: 'A cautious default, below the Belgian loaded average.',
      },
      workdays: { label: 'Working days a year', render: (v: number) => `${nf().format(v)} days` },
      automatable: {
        label: 'Share of that work AIOS takes over',
        render: (v: number) => `${v}%`,
        help: 'How much is realistically automatable. We keep it cautious.',
      },
    } as Record<InputKey, InputCopy>,
    steps: ['Your team', 'The value', 'What AIOS takes over'],
    savesYou: 'saved for you, every year',
    stats: { month: 'Per month', hours: 'Hours a year', weeks: 'Full-time weeks' },
    back: 'Back',
    next: 'Next',
    allSet: 'All set',
    cta: "Let's make this happen",
    footer:
      'A rough estimate from your own numbers, not a promise. Real savings depend on your process, which we scope honestly before any build.',
  },
  nl: {
    inputs: {
      people: { label: 'Mensen die dit repetitieve werk doen', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'persoon' : 'mensen'}` },
      hoursPerDay: {
        label: 'Uren die elke persoon er per dag aan verliest',
        render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} u / dag`,
        help: 'Het manuele, herhaalbare deel van de dag.',
      },
      hourlyRate: {
        label: 'Wat een uur van hun tijd u kost',
        render: (v: number) => `${eur.format(v)} / u`,
        help: 'Een voorzichtige standaard, onder het Belgische gemiddelde met loonlasten.',
      },
      workdays: { label: 'Werkdagen per jaar', render: (v: number) => `${nf().format(v)} dagen` },
      automatable: {
        label: 'Deel van dat werk dat AIOS overneemt',
        render: (v: number) => `${v}%`,
        help: 'Hoeveel er realistisch automatiseerbaar is. We houden het voorzichtig.',
      },
    } as Record<InputKey, InputCopy>,
    steps: ['Uw team', 'De waarde', 'Wat AIOS overneemt'],
    savesYou: 'bespaart u, elk jaar',
    stats: { month: 'Per maand', hours: 'Uren per jaar', weeks: 'Voltijdse weken' },
    back: 'Terug',
    next: 'Volgende',
    allSet: 'Alles ingevuld',
    cta: 'Laten we dit uitvoeren',
    footer:
      'Een ruwe schatting op basis van uw eigen cijfers, geen belofte. Echte besparingen hangen af van uw proces, dat we eerlijk afbakenen voordat er gebouwd wordt.',
  },
} as const

type Bounds = { min: number; max: number; default: number; step: number }
const BOUNDS: Record<InputKey, Bounds> = {
  people: { min: 1, max: 50, default: 5, step: 1 },
  hoursPerDay: { min: 0.5, max: 8, default: 2, step: 0.5 },
  hourlyRate: { min: 15, max: 150, default: 40, step: 5 },
  workdays: { min: 200, max: 250, default: 220, step: 5 },
  automatable: { min: 20, max: 90, default: 60, step: 5 },
}

/** Which inputs live in each step. */
const STEP_INPUTS: InputKey[][] = [
  ['people', 'hoursPerDay'],
  ['hourlyRate', 'workdays'],
  ['automatable'],
]

function Slider({
  keyName,
  copy,
  value,
  onChange,
}: {
  keyName: InputKey
  copy: InputCopy
  value: number
  onChange: (n: number) => void
}) {
  const b = BOUNDS[keyName]
  const pct = ((value - b.min) / (b.max - b.min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`roi-${keyName}`} className="text-[13px] leading-snug text-muted">
          {copy.label}
        </label>
        <span className="shrink-0 font-mono text-[13px] tabular-nums text-ink">{copy.render(value)}</span>
      </div>
      <input
        id={`roi-${keyName}`}
        type="range"
        min={b.min}
        max={b.max}
        step={b.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={copy.label}
        className={cn(
          'mt-3 h-1.5 w-full cursor-pointer touch-pan-y appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110',
          'pointer-coarse:[&::-webkit-slider-thumb]:h-6 pointer-coarse:[&::-webkit-slider-thumb]:w-6',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
          'pointer-coarse:[&::-moz-range-thumb]:h-6 pointer-coarse:[&::-moz-range-thumb]:w-6',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70',
        )}
        style={{ background: `linear-gradient(to right, rgba(245,245,245,0.9) ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
      {copy.help && <p className="mt-2 text-[12px] leading-relaxed text-dim">{copy.help}</p>}
    </div>
  )
}

/** The lamp: a bright bar with a bloom and a soft beam shining down onto the number. */
function LampBeam() {
  const reduced = usePrefersReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
      <div className="relative h-52 w-full max-w-[820px]">
        <div
          className="absolute left-1/2 top-0 h-52 w-[34rem] max-w-[94%] -translate-x-1/2"
          style={{ background: 'radial-gradient(50% 92% at 50% 0%, rgba(245,245,245,0.16), transparent 72%)' }}
        />
        <motion.div
          initial={reduced ? false : { opacity: 0.4, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="absolute left-1/2 top-[-30px] h-24 w-[22rem] max-w-[82%] -translate-x-1/2 rounded-[50%] bg-white/[0.22] blur-[55px]"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="absolute left-1/2 top-0 h-[2px] w-[24rem] max-w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/75 to-transparent"
        />
      </div>
    </div>
  )
}

const BORDER_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const

export function RoiCalculator() {
  const { lang } = useLang()
  const t = COPY[lang]

  const [values, setValues] = useState<Record<InputKey, number>>(() => ({
    people: BOUNDS.people.default,
    hoursPerDay: BOUNDS.hoursPerDay.default,
    hourlyRate: BOUNDS.hourlyRate.default,
    workdays: BOUNDS.workdays.default,
    automatable: BOUNDS.automatable.default,
  }))
  const [step, setStep] = useState(0)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const hoursSaved = values.people * values.hoursPerDay * values.workdays * (values.automatable / 100)
  const savings = hoursSaved * values.hourlyRate
  const animated = useCountUp(inView ? savings : 0)

  // A light that traces around the border, closing the loop as you advance.
  const prog = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 })
  useEffect(() => {
    prog.set(step / (STEP_INPUTS.length - 1))
  }, [step, prog])
  const ang = useTransform(prog, (p) => `${p * 360}deg`)
  const ring = useMotionTemplate`conic-gradient(from 0deg, rgba(245,245,245,0.9) 0deg, rgba(245,245,245,0.9) ${ang}, transparent ${ang})`

  const stats = [
    { label: t.stats.month, value: eur.format(Math.round(savings / 12)) },
    { label: t.stats.hours, value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursSaved)) },
    { label: t.stats.weeks, value: nf({ maximumFractionDigits: 1 }).format(hoursSaved / 40) },
  ]

  const last = STEP_INPUTS.length - 1

  return (
    <div ref={ref} className="relative">
      <LampBeam />

      {/* The number the lamp shines on */}
      <div className="relative z-10 pt-24 text-center">
        <div
          className="font-serif leading-[0.95] tracking-[-0.02em] text-ink tabular-nums"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)' }}
        >
          {eur.format(Math.round(animated))}
        </div>
        <div className="label-mono mt-3 text-muted">{t.savesYou}</div>
      </div>

      {/* The configurator card, with the booking-style edge light + border ring */}
      <div className="relative z-10 mx-auto mt-12 max-w-[820px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-3px] z-20 h-[80px] w-[40%] -translate-x-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.4),rgba(255,255,255,0.06)_55%,transparent_72%)] blur-[13px]"
        />
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0b0b0d]/85 p-7 shadow-[0_40px_110px_-40px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-9">
          {/* border ring — glow + crisp line, both filling with progress */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ background: ring, padding: 2, opacity: 0.6, filter: 'blur(6px)', ...BORDER_MASK }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{ background: ring, padding: 1.5, ...BORDER_MASK }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* stepper */}
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {t.steps.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  aria-label={s}
                  onClick={() => setStep(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === step ? 'w-6 bg-ink' : i < step ? 'w-1.5 bg-ink/70' : 'w-1.5 bg-white/20',
                  )}
                />
              ))}
            </div>
            <span className="text-[12px] uppercase tracking-[0.16em] text-faint">{t.steps[step]}</span>
          </div>

          {/* current step inputs */}
          <div className="relative mt-7 min-h-[188px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.28, ease }}
                className="flex flex-col gap-6"
              >
                {STEP_INPUTS[step].map((k) => (
                  <Slider
                    key={k}
                    keyName={k}
                    copy={t.inputs[k]}
                    value={values[k]}
                    onChange={(n) => setValues((v) => ({ ...v, [k]: n }))}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* back / next */}
          <div className="relative mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[13px] text-faint transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
            >
              {t.back}
            </button>
            {step < last ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(last, s + 1))}
                className="rounded-full border border-line-strong bg-white/[0.06] px-5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-white/40 hover:bg-white/[0.1]"
              >
                {t.next}
              </button>
            ) : (
              <span className="text-[12px] uppercase tracking-[0.16em] text-faint">{t.allSet}</span>
            )}
          </div>
        </div>
      </div>

      {/* breakdown + the call to action */}
      <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-mono text-[19px] tabular-nums text-ink-soft">{s.value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-dim">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-9 flex justify-center">
        <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="h-11 px-7 text-[14px]">
          {t.cta}
        </RippleButton>
      </div>

      <p className="relative z-10 mx-auto mt-8 max-w-xl text-center text-[12.5px] leading-relaxed text-dim">
        {t.footer}
      </p>
    </div>
  )
}
