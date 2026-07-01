import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import { useCountUp } from '@/lib/useCountUp'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n'
import { BookCallButton } from '@/components/ui/BookCallButton'

/**
 * ROI calculator — a two-phase, stepwise "what AIOS hands back" configurator.
 *
 * Configure task by task; a light traces around the card border, starting as a small
 * curve in the top-left and closing the full loop once you are done. Then "Bekijk je
 * getal" reveals the yearly saving inside the card, with the per-month / hours /
 * full-time-weeks breakdown and the call to action. One honest model underneath:
 * recurring tasks x hours a week x working weeks x hourly cost x the share AIOS
 * realistically takes over.
 */

const ease = [0.16, 1, 0.3, 1] as const
const WORK_WEEKS = 47
const nf = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat('nl-BE', opts)
const eur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

type InputKey = 'tasks' | 'hoursPerWeek' | 'rate' | 'automatable'
type InputCopy = { label: string; render: (v: number) => string; help?: string }

const COPY = {
  en: {
    inputs: {
      tasks: { label: 'Recurring tasks', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'task' : 'tasks'}`, help: 'The jobs that come back every week.' },
      hoursPerWeek: { label: 'Hours a week per task', render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} h / week`, help: 'The time such a task eats every week.' },
      rate: { label: 'Cost per hour', render: (v: number) => `${eur.format(v)} / h`, help: 'What an hour of that time costs you.' },
      automatable: { label: 'Share AIOS takes over', render: (v: number) => `${v}%`, help: 'Kept cautious, only what is realistic.' },
    } as Record<InputKey, InputCopy>,
    steps: ['The tasks', 'The time', 'The cost'],
    savesYou: 'saved for you, every year',
    stats: { month: 'Per month', hours: 'Hours a year', weeks: 'Full-time weeks' },
    back: 'Back',
    next: 'Next',
    reveal: 'See your number',
    redo: 'Reconfigure',
    cta: "Let's make this happen",
  },
  nl: {
    inputs: {
      tasks: { label: 'Terugkerende taken', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'taak' : 'taken'}`, help: 'De klussen die elke week terugkomen.' },
      hoursPerWeek: { label: 'Uren per week per taak', render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} u / week`, help: 'De tijd die zo’n taak elke week opslokt.' },
      rate: { label: 'Kost per uur', render: (v: number) => `${eur.format(v)} / u`, help: 'Wat een uur van die tijd u kost.' },
      automatable: { label: 'Deel dat AIOS overneemt', render: (v: number) => `${v}%`, help: 'Voorzichtig gehouden, enkel wat realistisch is.' },
    } as Record<InputKey, InputCopy>,
    steps: ['De taken', 'De tijd', 'De kost'],
    savesYou: 'bespaart u, elk jaar',
    stats: { month: 'Per maand', hours: 'Uren per jaar', weeks: 'Voltijdse weken' },
    back: 'Terug',
    next: 'Volgende',
    reveal: 'Bekijk je getal',
    redo: 'Opnieuw',
    cta: 'Laten we dit uitvoeren',
  },
} as const

type Bounds = { min: number; max: number; default: number; step: number }
const BOUNDS: Record<InputKey, Bounds> = {
  tasks: { min: 1, max: 20, default: 5, step: 1 },
  hoursPerWeek: { min: 0.5, max: 25, default: 5, step: 0.5 },
  rate: { min: 15, max: 150, default: 45, step: 5 },
  automatable: { min: 20, max: 90, default: 60, step: 5 },
}

const STEP_INPUTS: InputKey[][] = [['tasks'], ['hoursPerWeek'], ['rate', 'automatable']]

/** The lamp: a bright line that sits on the section boundary and widens as you scroll
 *  in, with a bloom and a soft beam spilling down. Lives at the top of the section. */
export function LampBeam() {
  const reduced = usePrefersReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
      <div className="relative h-60 w-full max-w-[1100px]">
        <div
          className="absolute left-1/2 top-0 h-60 w-[46rem] max-w-[96%] -translate-x-1/2"
          style={{ background: 'radial-gradient(50% 78% at 50% 0%, rgba(245,245,245,0.14), transparent 72%)' }}
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
          transition={{ duration: 1, ease }}
          className="absolute left-1/2 top-0 h-32 w-[34rem] max-w-[88%] -translate-x-1/2 -translate-y-1/3 rounded-[50%] bg-white/[0.2] blur-[65px]"
        />
        <motion.div
          initial={reduced ? false : { width: '9rem', opacity: 0 }}
          whileInView={{ width: '36rem', opacity: 1 }}
          viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
          transition={{ duration: 1.1, ease }}
          className="absolute left-1/2 top-0 h-[2px] max-w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent"
        />
      </div>
    </div>
  )
}

function Slider({ keyName, copy, value, onChange }: { keyName: InputKey; copy: InputCopy; value: number; onChange: (n: number) => void }) {
  const b = BOUNDS[keyName]
  const pct = ((value - b.min) / (b.max - b.min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`roi-${keyName}`} className="text-[14px] leading-snug text-muted">
          {copy.label}
        </label>
        <span className="shrink-0 font-mono text-[14.5px] tabular-nums text-ink">{copy.render(value)}</span>
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
          'mt-4 h-1.5 w-full cursor-pointer touch-pan-y appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110',
          'pointer-coarse:[&::-webkit-slider-thumb]:h-6 pointer-coarse:[&::-webkit-slider-thumb]:w-6',
          '[&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70',
        )}
        style={{ background: `linear-gradient(to right, rgba(245,245,245,0.9) ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
      {copy.help && <p className="mt-3 text-[12.5px] leading-relaxed text-dim">{copy.help}</p>}
    </div>
  )
}

const BORDER_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const

function PillButton({ children, onClick, primary = false, className }: { children: React.ReactNode; onClick: () => void; primary?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-6 py-2.5 text-[13.5px] font-medium transition-colors',
        primary
          ? 'border border-line-strong bg-white/[0.08] text-ink hover:border-white/40 hover:bg-white/[0.14]'
          : 'border border-line bg-white/[0.02] text-faint hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function RoiCalculator() {
  const { lang } = useLang()
  const t = COPY[lang]

  const [values, setValues] = useState<Record<InputKey, number>>(() => ({
    tasks: BOUNDS.tasks.default,
    hoursPerWeek: BOUNDS.hoursPerWeek.default,
    rate: BOUNDS.rate.default,
    automatable: BOUNDS.automatable.default,
  }))
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const hoursSaved = values.tasks * values.hoursPerWeek * WORK_WEEKS * (values.automatable / 100)
  const savings = hoursSaved * values.rate
  const animated = useCountUp(done ? savings : 0)

  // A light that traces around the border, starting as a small curve in the top-left
  // and closing the full loop once done.
  const prog = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 })
  useEffect(() => {
    prog.set(done ? 1 : (step + 0.4) / STEP_INPUTS.length)
  }, [step, done, prog])
  const ang = useTransform(prog, (p) => `${p * 360}deg`)
  const ring = useMotionTemplate`conic-gradient(from 292deg, rgba(245,245,245,0.92) 0deg, rgba(245,245,245,0.92) ${ang}, transparent ${ang})`

  const last = STEP_INPUTS.length - 1
  const stats = [
    { label: t.stats.month, value: eur.format(Math.round(savings / 12)) },
    { label: t.stats.hours, value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursSaved)) },
    { label: t.stats.weeks, value: nf({ maximumFractionDigits: 1 }).format(hoursSaved / 40) },
  ]

  return (
    <div className="relative mx-auto mt-10 max-w-[900px]">
      {/* soft light behind + from under, like the booking pop-up */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-3 top-8 -bottom-5 rounded-[38px] bg-white/[0.035] blur-[44px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-1/4 -bottom-6 h-20 rounded-[50%] bg-white/[0.07] blur-[46px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0a0a0c]/92 p-8 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.9)] sm:p-11">
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[30px]" style={{ background: ring, padding: 2.5, opacity: 0.5, filter: 'blur(7px)', ...BORDER_MASK }} />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[30px]" style={{ background: ring, padding: 1.5, ...BORDER_MASK }} />

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="relative">
              <div className="flex justify-end">
                <span className="text-[12px] uppercase tracking-[0.18em] text-faint">{t.steps[step]}</span>
              </div>

              <div className="mt-8 min-h-[150px]">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28, ease }} className="flex flex-col gap-8">
                    {STEP_INPUTS[step].map((k) => (
                      <Slider key={k} keyName={k} copy={t.inputs[k]} value={values[k]} onChange={(n) => setValues((v) => ({ ...v, [k]: n }))} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <PillButton onClick={() => setStep((s) => Math.max(0, s - 1))} className={step === 0 ? 'pointer-events-none opacity-0' : ''}>
                  {t.back}
                </PillButton>
                {step < last ? (
                  <PillButton primary onClick={() => setStep((s) => Math.min(last, s + 1))}>
                    {t.next}
                  </PillButton>
                ) : (
                  <PillButton primary onClick={() => setDone(true)}>
                    {t.reveal}
                  </PillButton>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="relative text-center">
              <div className="font-serif leading-[0.95] tracking-[-0.02em] text-ink tabular-nums" style={{ fontSize: 'clamp(2.75rem, 8vw, 5.25rem)' }}>
                {eur.format(Math.round(animated))}
              </div>
              <div className="label-mono mt-3 text-muted">{t.savesYou}</div>

              <div className="mx-auto mt-9 grid max-w-[520px] grid-cols-3 gap-4 border-t border-line pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-mono text-[20px] tabular-nums text-ink sm:text-[22px]">{s.value}</div>
                    <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.1em] text-dim">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <BookCallButton className="h-11 px-7 text-[14px]">{t.cta}</BookCallButton>
              </div>
              <button type="button" onClick={() => setDone(false)} className="mt-6 text-[12.5px] text-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink">
                {t.redo}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
