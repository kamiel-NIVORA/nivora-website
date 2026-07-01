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
 * Phase 1 (configure): a single framed card, task by task, under a big lamp beam
 * that lights up as you scroll in. A light traces around the card border and closes
 * the full loop as you advance. No number yet.
 *
 * Phase 2 (result): the "Bekijk je getal" button reveals the yearly saving, counting
 * up under the lamp, with the per-month / hours / full-time-weeks breakdown and the
 * "let's do this" call to action. One honest model underneath: recurring tasks x hours
 * a week x working weeks x hourly cost x the share AIOS realistically takes over.
 */

const ease = [0.16, 1, 0.3, 1] as const
const WORK_WEEKS = 47 // cautious working weeks a year
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
    footer: 'A rough estimate from your own numbers, not a promise. We scope real savings honestly before any build.',
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
    redo: 'Opnieuw configureren',
    cta: 'Laten we dit uitvoeren',
    footer: 'Een ruwe schatting op basis van uw eigen cijfers, geen belofte. Echte besparingen bakenen we eerlijk af voordat er gebouwd wordt.',
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

function Slider({ keyName, copy, value, onChange }: { keyName: InputKey; copy: InputCopy; value: number; onChange: (n: number) => void }) {
  const b = BOUNDS[keyName]
  const pct = ((value - b.min) / (b.max - b.min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`roi-${keyName}`} className="text-[13.5px] leading-snug text-muted">
          {copy.label}
        </label>
        <span className="shrink-0 font-mono text-[14px] tabular-nums text-ink">{copy.render(value)}</span>
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
          'mt-3.5 h-1.5 w-full cursor-pointer touch-pan-y appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110',
          'pointer-coarse:[&::-webkit-slider-thumb]:h-6 pointer-coarse:[&::-webkit-slider-thumb]:w-6',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
          'pointer-coarse:[&::-moz-range-thumb]:h-6 pointer-coarse:[&::-moz-range-thumb]:w-6',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70',
        )}
        style={{ background: `linear-gradient(to right, rgba(245,245,245,0.9) ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
      {copy.help && <p className="mt-2.5 text-[12px] leading-relaxed text-dim">{copy.help}</p>}
    </div>
  )
}

/** The lamp: a wide bright bar with a bloom and a beam, expanding as you scroll in. */
function LampBeam() {
  const reduced = usePrefersReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
      <div className="relative h-64 w-full max-w-[1000px]">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="absolute left-1/2 top-0 h-64 w-[46rem] max-w-[96%] -translate-x-1/2"
          style={{ background: 'radial-gradient(50% 92% at 50% 0%, rgba(245,245,245,0.17), transparent 72%)' }}
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="absolute left-1/2 top-[-34px] h-28 w-[30rem] max-w-[86%] -translate-x-1/2 rounded-[50%] bg-white/[0.22] blur-[60px]"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.15 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="absolute left-1/2 top-0 h-[2px] w-[34rem] max-w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent"
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

function PillButton({ children, onClick, primary = false, className }: { children: React.ReactNode; onClick: () => void; primary?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-2 text-[13px] font-medium transition-colors',
        primary
          ? 'border border-line-strong bg-white/[0.07] text-ink hover:border-white/40 hover:bg-white/[0.12]'
          : 'border border-line bg-white/[0.02] text-faint hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function RoiCalculator({ title, subtitle }: { title: string; subtitle?: string }) {
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

  // A light that traces around the border, closing the loop once configured.
  const prog = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 })
  useEffect(() => {
    prog.set(done ? 1 : step / STEP_INPUTS.length)
  }, [step, done, prog])
  const ang = useTransform(prog, (p) => `${p * 360}deg`)
  const ring = useMotionTemplate`conic-gradient(from 0deg, rgba(245,245,245,0.9) 0deg, rgba(245,245,245,0.9) ${ang}, transparent ${ang})`

  const last = STEP_INPUTS.length - 1
  const stats = [
    { label: t.stats.month, value: eur.format(Math.round(savings / 12)) },
    { label: t.stats.hours, value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursSaved)) },
    { label: t.stats.weeks, value: nf({ maximumFractionDigits: 1 }).format(hoursSaved / 40) },
  ]

  return (
    <div className="relative">
      <LampBeam />

      {/* Title under the lamp, and the number only once configured */}
      <div className="relative z-10 pt-28 text-center">
        <h2 className="font-serif text-[30px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[38px] lg:text-[44px]">{title}</h2>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-faint">{subtitle}</p>}

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mt-9"
            >
              <div className="font-serif leading-[0.95] tracking-[-0.02em] text-ink tabular-nums" style={{ fontSize: 'clamp(2.75rem, 8vw, 5.5rem)' }}>
                {eur.format(Math.round(animated))}
              </div>
              <div className="label-mono mt-3 text-muted">{t.savesYou}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The card: soft light behind + from under (booking pop-up style) + a border ring */}
      <div className="relative z-10 mx-auto mt-12 max-w-[760px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-6 top-10 bottom-[-18px] rounded-[36px] bg-white/[0.05] blur-[42px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-16 bottom-[-26px] h-24 rounded-[50%] bg-white/[0.1] blur-[52px]" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#0b0b0d]/92 p-7 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-9">
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: ring, padding: 2, opacity: 0.55, filter: 'blur(6px)', ...BORDER_MASK }} />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[28px]" style={{ background: ring, padding: 1.5, ...BORDER_MASK }} />

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="relative">
                {/* stepper */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {t.steps.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        aria-label={s}
                        onClick={() => setStep(i)}
                        className={cn('h-1.5 rounded-full transition-all duration-300', i === step ? 'w-6 bg-ink' : i < step ? 'w-1.5 bg-ink/70' : 'w-1.5 bg-white/20')}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.16em] text-faint">{t.steps[step]}</span>
                </div>

                <div className="mt-8 min-h-[150px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.28, ease }} className="flex flex-col gap-7">
                      {STEP_INPUTS[step].map((k) => (
                        <Slider key={k} keyName={k} copy={t.inputs[k]} value={values[k]} onChange={(n) => setValues((v) => ({ ...v, [k]: n }))} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-9 flex items-center justify-between">
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
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease, delay: 0.1 }} className="relative">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-mono text-[20px] tabular-nums text-ink sm:text-[22px]">{s.value}</div>
                      <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.1em] text-dim">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <PillButton onClick={() => setDone(false)}>{t.redo}</PillButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA + disclaimer, only once configured */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="relative z-10"
          >
            <div className="mt-10 flex justify-center">
              <BookCallButton className="h-11 px-7 text-[14px]">{t.cta}</BookCallButton>
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-[12.5px] leading-relaxed text-dim">{t.footer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
