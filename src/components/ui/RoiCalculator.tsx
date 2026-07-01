import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCountUp } from '@/lib/useCountUp'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n'
import { BookCallButton } from '@/components/ui/BookCallButton'

/**
 * ROI calculator — a specific, stepwise "money on the table" configurator.
 *
 * You pick the departments where recurring work piles up, then configure each one on
 * its own (people, hours a week each, cost per hour) before moving to the next. A soft
 * light traces around the card border, starting top-left and closing the loop as you
 * go; "Bekijk je getal" reveals the yearly figure. Honest model, no hidden factors:
 * sum over departments of people x hours a week x working weeks x hourly cost.
 */

const ease = [0.16, 1, 0.3, 1] as const
const WORK_WEEKS = 47
const nf = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat('nl-BE', opts)
const eur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

type AreaKey = 'sales' | 'marketing' | 'support' | 'communication' | 'finance' | 'operations' | 'hr' | 'planning'
const AREAS: { key: AreaKey; icon: string; nl: string; en: string }[] = [
  { key: 'sales', icon: '/services/aios-icons/sales.png', nl: 'Sales', en: 'Sales' },
  { key: 'marketing', icon: '/services/aios-icons/marketing.png', nl: 'Marketing', en: 'Marketing' },
  { key: 'support', icon: '/services/aios-icons/support.png', nl: 'Support', en: 'Support' },
  { key: 'communication', icon: '/services/aios-icons/communication.png', nl: 'Communicatie', en: 'Communication' },
  { key: 'finance', icon: '/services/aios-icons/finance.png', nl: 'Finance', en: 'Finance' },
  { key: 'operations', icon: '/services/aios-icons/operations.png', nl: 'Operations', en: 'Operations' },
  { key: 'hr', icon: '/services/aios-icons/hr.png', nl: 'HR', en: 'HR' },
  { key: 'planning', icon: '/services/aios-icons/planning.png', nl: 'Planning', en: 'Planning' },
]

const COPY = {
  en: {
    selectQuestion: 'Where does work pile up for you?',
    selectHelp: 'Pick the departments that apply to you.',
    deptQuestion: (name: string) => `How much time goes into ${name}?`,
    deptHelp: 'The people doing it, the hours a week, and the cost per hour.',
    pickHint: 'Pick at least one department to continue.',
    ofN: (i: number, n: number) => `${i} / ${n}`,
    people: { label: 'People doing this work', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'person' : 'people'}` },
    hours: { label: 'Hours a week, each of them', render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} h / week` },
    rate: { label: 'Cost per hour', render: (v: number) => `${eur.format(v)} / h` },
    perYear: 'on recurring work, a year',
    stats: { month: 'Per month', hours: 'Hours a year', weeks: 'Full-time weeks' },
    back: 'Back',
    next: 'Next',
    selectAll: 'Select all',
    clearAll: 'Clear all',
    reveal: 'See your number',
    redo: 'Reconfigure',
    cta: "Let's make this happen",
  },
  nl: {
    selectQuestion: 'Waar blijft er bij u werk liggen?',
    selectHelp: 'Klik de afdelingen aan die op u van toepassing zijn.',
    deptQuestion: (name: string) => `Hoeveel tijd kruipt er in ${name}?`,
    deptHelp: 'De mensen die het doen, de uren per week en de kost per uur.',
    pickHint: 'Kies minstens één afdeling om verder te gaan.',
    ofN: (i: number, n: number) => `${i} / ${n}`,
    people: { label: 'Mensen die dit doen', render: (v: number) => `${nf().format(v)} ${v === 1 ? 'persoon' : 'mensen'}` },
    hours: { label: 'Uren per week, elk van hen', render: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} u / week` },
    rate: { label: 'Kost per uur', render: (v: number) => `${eur.format(v)} / u` },
    perYear: 'aan terugkerend werk, per jaar',
    stats: { month: 'Per maand', hours: 'Uren per jaar', weeks: 'Voltijdse weken' },
    back: 'Terug',
    next: 'Volgende',
    selectAll: 'Alles selecteren',
    clearAll: 'Alles wissen',
    reveal: 'Bekijk je getal',
    redo: 'Opnieuw',
    cta: 'Laten we dit uitvoeren',
  },
} as const

type Dept = { people: number; hours: number; rate: number }
const DEPT_DEFAULT: Dept = { people: 2, hours: 4, rate: 45 }
const B = {
  people: { min: 1, max: 30, step: 1 },
  hours: { min: 0.5, max: 40, step: 0.5 },
  rate: { min: 15, max: 150, step: 5 },
}

/** The lamp: a bright line on the section boundary that widens as you scroll in. */
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

function Slider({ id, label, value, valueText, min, max, step, onChange }: { id: string; label: string; value: number; valueText: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] leading-snug text-muted">{label}</label>
        <span className="shrink-0 font-mono text-[14.5px] tabular-nums text-ink">{valueText}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className={cn(
          'mt-3.5 h-1.5 w-full cursor-pointer touch-pan-y appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 active:[&::-webkit-slider-thumb]:scale-110',
          'pointer-coarse:[&::-webkit-slider-thumb]:h-6 pointer-coarse:[&::-webkit-slider-thumb]:w-6',
          '[&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
        )}
        style={{ background: `linear-gradient(to right, rgba(245,245,245,0.9) ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
    </div>
  )
}

function PillButton({ children, onClick, primary = false, glow = false, disabled = false, className }: { children: React.ReactNode; onClick: () => void; primary?: boolean; glow?: boolean; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-medium transition-all disabled:pointer-events-none disabled:opacity-40 sm:min-h-0',
        primary
          ? 'border border-line-strong bg-white/[0.08] text-ink hover:border-white/40 hover:bg-white/[0.14]'
          : 'border border-line bg-white/[0.02] text-faint hover:border-line-strong hover:text-ink',
        glow && 'border-white/40 bg-white/[0.16] shadow-[0_0_30px_-4px_rgba(245,245,245,0.4)] hover:bg-white/20',
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

  const [selected, setSelected] = useState<Record<AreaKey, boolean>>({
    sales: false, marketing: false, support: false, communication: false, finance: false, operations: false, hr: false, planning: false,
  })
  const [config, setConfig] = useState<Record<AreaKey, Dept>>(
    () => Object.fromEntries(AREAS.map((a) => [a.key, { ...DEPT_DEFAULT }])) as Record<AreaKey, Dept>,
  )
  const [step, setStep] = useState(0) // 0 = selection; 1..N = chosen[step-1]
  const [done, setDone] = useState(false)

  const chosen = AREAS.filter((a) => selected[a.key])

  useEffect(() => {
    if (step > chosen.length) setStep(chosen.length)
  }, [chosen.length, step])

  const total = chosen.reduce((sum, a) => {
    const d = config[a.key]
    return sum + d.people * d.hours * WORK_WEEKS * d.rate
  }, 0)
  const hoursTotal = chosen.reduce((sum, a) => sum + config[a.key].people * config[a.key].hours * WORK_WEEKS, 0)
  const animated = useCountUp(done ? total : 0)

  const prog = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 })
  useEffect(() => {
    prog.set(done ? 1 : (step + 0.5) / (chosen.length + 1))
  }, [step, done, chosen.length, prog])
  const ang = useTransform(prog, (p) => `${p * 360}deg`)
  const ring = useMotionTemplate`conic-gradient(from 292deg, rgba(245,245,245,0.8) 0deg, rgba(245,245,245,0.8) ${ang}, transparent ${ang})`

  const stats = [
    { label: t.stats.month, value: eur.format(Math.round(total / 12)) },
    { label: t.stats.hours, value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursTotal)) },
    { label: t.stats.weeks, value: nf({ maximumFractionDigits: 1 }).format(hoursTotal / 40) },
  ]

  const dept = step >= 1 ? chosen[step - 1] : undefined
  const setDept = (patch: Partial<Dept>) => {
    if (!dept) return
    setConfig((c) => ({ ...c, [dept.key]: { ...c[dept.key], ...patch } }))
  }
  const showReveal = step >= 1 && step === chosen.length
  const canNext = step !== 0 || chosen.length > 0
  const allSelected = AREAS.every((a) => selected[a.key])
  const toggleAll = () => {
    const v = !allSelected
    setSelected(Object.fromEntries(AREAS.map((a) => [a.key, v])) as Record<AreaKey, boolean>)
  }

  return (
    <div className="relative mx-auto mt-10 max-w-[900px]">
      {/* progress light — a soft glow BEHIND the card that traces around from the
          top-left and slides further with each step; never a hard line on the border */}
      <motion.div aria-hidden className="pointer-events-none absolute -inset-[6px] rounded-[34px] blur-[19px]" style={{ background: ring, opacity: 0.6 }} />
      {/* ambient backlight seeping out from behind and from under the card */}
      <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-[-30px] h-36 rounded-[50%] bg-white/[0.13] blur-[58px]" />
      <div aria-hidden className="pointer-events-none absolute -inset-x-2 top-20 bottom-[-16px] rounded-[42px] bg-white/[0.03] blur-[52px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0a0a0c] p-7 shadow-[0_45px_110px_-45px_rgba(0,0,0,0.9)] sm:p-9">
        <div className="relative flex min-h-[392px] flex-col">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  {step === 0 ? (
                    <div>
                      <p className="text-[17px] font-medium leading-snug text-ink sm:text-[18px]">{t.selectQuestion}</p>
                      <p className="mt-1.5 text-[13px] leading-snug text-faint">{t.selectHelp}</p>
                    </div>
                  ) : dept ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/20 bg-white/[0.08]">
                          <img src={dept.icon} alt="" className="h-5 w-5 object-contain" />
                        </span>
                        <div>
                          <p className="text-[17px] font-medium leading-snug text-ink sm:text-[18px]">{t.deptQuestion(dept[lang])}</p>
                          <p className="mt-1 text-[13px] leading-snug text-faint">{t.deptHelp}</p>
                        </div>
                      </div>
                      <span className="shrink-0 self-start text-[12px] uppercase tracking-[0.16em] text-faint">{t.ofN(step, chosen.length)}</span>
                    </>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-1 flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28, ease }}>
                      {step === 0 ? (
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                          {AREAS.map((a) => {
                            const on = selected[a.key]
                            return (
                              <button
                                key={a.key}
                                type="button"
                                onClick={() => setSelected((s) => ({ ...s, [a.key]: !s[a.key] }))}
                                className={cn(
                                  'group relative flex flex-col items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors',
                                  on ? 'border-white/30 bg-white/[0.08]' : 'border-line bg-white/[0.02] hover:border-line-strong',
                                )}
                              >
                                <span className={cn('flex h-9 w-9 items-center justify-center rounded-[10px] border transition-colors', on ? 'border-white/25 bg-white/[0.1]' : 'border-line bg-white/[0.03]')}>
                                  <img src={a.icon} alt="" className={cn('h-[18px] w-[18px] object-contain transition-opacity', on ? 'opacity-100' : 'opacity-45')} />
                                </span>
                                <span className={cn('text-[13.5px] font-medium', on ? 'text-ink' : 'text-muted')}>{a[lang]}</span>
                                <span className={cn('absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full border transition-all', on ? 'border-white/50 bg-white/90' : 'border-line')}>
                                  {on && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ) : dept ? (
                        <div className="flex flex-col gap-6">
                          <Slider id={`roi-${dept.key}-people`} label={t.people.label} value={config[dept.key].people} valueText={t.people.render(config[dept.key].people)} min={B.people.min} max={B.people.max} step={B.people.step} onChange={(n) => setDept({ people: n })} />
                          <Slider id={`roi-${dept.key}-hours`} label={t.hours.label} value={config[dept.key].hours} valueText={t.hours.render(config[dept.key].hours)} min={B.hours.min} max={B.hours.max} step={B.hours.step} onChange={(n) => setDept({ hours: n })} />
                          <Slider id={`roi-${dept.key}-rate`} label={t.rate.label} value={config[dept.key].rate} valueText={t.rate.render(config[dept.key].rate)} min={B.rate.min} max={B.rate.max} step={B.rate.step} onChange={(n) => setDept({ rate: n })} />
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {step === 0 ? (
                    <PillButton onClick={toggleAll}>{allSelected ? t.clearAll : t.selectAll}</PillButton>
                  ) : (
                    <PillButton onClick={() => setStep((s) => Math.max(0, s - 1))}>{t.back}</PillButton>
                  )}
                  {!showReveal ? (
                    <PillButton primary disabled={!canNext} onClick={() => setStep((s) => Math.min(chosen.length, s + 1))}>
                      {t.next}
                    </PillButton>
                  ) : (
                    <PillButton primary glow onClick={() => setDone(true)}>
                      {t.reveal}
                    </PillButton>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex flex-1 flex-col justify-center text-center">
                <div className="font-serif leading-[0.95] tracking-[-0.02em] text-ink tabular-nums" style={{ fontSize: 'clamp(2.85rem, 8vw, 5.5rem)' }}>
                  {eur.format(Math.round(animated))}
                </div>
                <div className="label-mono mt-4 text-muted">{t.perYear}</div>

                <div className="mx-auto mt-10 flex w-full max-w-[440px] items-center justify-between gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="flex-1">
                      <div className="font-mono text-[19px] tabular-nums text-ink-soft sm:text-[21px]">{s.value}</div>
                      <div className="mt-1.5 text-[10.5px] uppercase tracking-[0.1em] text-dim">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-11 flex justify-center">
                  <BookCallButton className="h-11 px-7 text-[14px]">{t.cta}</BookCallButton>
                </div>
                <button type="button" onClick={() => { setDone(false); setStep(0) }} className="mx-auto mt-6 text-[12.5px] text-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink">
                  {t.redo}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
