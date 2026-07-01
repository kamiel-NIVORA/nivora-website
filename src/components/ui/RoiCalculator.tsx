import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import { CalendarDays, Check, Handshake, Headset, Mail, Megaphone, Receipt, UserPlus, Workflow, type LucideIcon } from 'lucide-react'
import { useCountUp } from '@/lib/useCountUp'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import { useLang } from '@/i18n'
import { BookCallButton } from '@/components/ui/BookCallButton'

/**
 * ROI calculator — a specific, stepwise "what AIOS hands back" configurator.
 *
 * You pick the exact places work piles up (the same departments as the section above),
 * set the hours a week each one eats, then the cost and the share AIOS takes over. A
 * light traces around the card border, starting top-left and closing the loop once
 * done; "Bekijk je getal" then reveals the yearly saving inside the card. Honest model:
 * sum(hours a week per area) x working weeks x hourly cost x automatable share.
 */

const ease = [0.16, 1, 0.3, 1] as const
const WORK_WEEKS = 47
const nf = (opts?: Intl.NumberFormatOptions) => new Intl.NumberFormat('nl-BE', opts)
const eur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

type AreaKey = 'sales' | 'marketing' | 'support' | 'communication' | 'finance' | 'operations' | 'hr' | 'planning'
const AREAS: { key: AreaKey; Icon: LucideIcon; nl: string; en: string }[] = [
  { key: 'sales', Icon: Handshake, nl: 'Sales', en: 'Sales' },
  { key: 'marketing', Icon: Megaphone, nl: 'Marketing', en: 'Marketing' },
  { key: 'support', Icon: Headset, nl: 'Support', en: 'Support' },
  { key: 'communication', Icon: Mail, nl: 'Communicatie', en: 'Communication' },
  { key: 'finance', Icon: Receipt, nl: 'Finance', en: 'Finance' },
  { key: 'operations', Icon: Workflow, nl: 'Operations', en: 'Operations' },
  { key: 'hr', Icon: UserPlus, nl: 'HR', en: 'HR' },
  { key: 'planning', Icon: CalendarDays, nl: 'Planning', en: 'Planning' },
]

const COPY = {
  en: {
    steps: ['Where it piles up', 'Hours a week', 'The cost'],
    stepHelp: [
      'Click the places where recurring work piles up for you.',
      'Set the hours each place eats every week.',
      'What that time costs, and how much AIOS realistically takes over.',
    ],
    pickHint: 'Pick at least one place to continue.',
    rate: { label: 'Cost per hour', render: (v: number) => `${eur.format(v)} / h`, help: 'What an hour of that time costs you.' },
    automatable: { label: 'Share AIOS takes over', render: (v: number) => `${v}%`, help: 'Kept cautious, only what is realistic.' },
    perWeek: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} h / week`,
    savesYou: 'saved for you, every year',
    stats: { month: 'Per month', hours: 'Hours a year', weeks: 'Full-time weeks' },
    back: 'Back',
    next: 'Next',
    reveal: 'See your number',
    redo: 'Reconfigure',
    cta: "Let's make this happen",
  },
  nl: {
    steps: ['Waar loopt het vast', 'Uren per week', 'De kost'],
    stepHelp: [
      'Klik de plekken aan waar bij u werk blijft liggen.',
      'Zet per plek de uren die er elke week in kruipen.',
      'Wat die tijd kost, en hoeveel AIOS er realistisch van overneemt.',
    ],
    pickHint: 'Kies minstens één plek om verder te gaan.',
    rate: { label: 'Kost per uur', render: (v: number) => `${eur.format(v)} / u`, help: 'Wat een uur van die tijd u kost.' },
    automatable: { label: 'Deel dat AIOS overneemt', render: (v: number) => `${v}%`, help: 'Voorzichtig gehouden, enkel wat realistisch is.' },
    perWeek: (v: number) => `${nf({ maximumFractionDigits: 1 }).format(v)} u / week`,
    savesYou: 'bespaart u, elk jaar',
    stats: { month: 'Per maand', hours: 'Uren per jaar', weeks: 'Voltijdse weken' },
    back: 'Terug',
    next: 'Volgende',
    reveal: 'Bekijk je getal',
    redo: 'Opnieuw',
    cta: 'Laten we dit uitvoeren',
  },
} as const

const HOURS = { min: 0.5, max: 30, step: 0.5, default: 4 }
const RATE = { min: 15, max: 150, step: 5, default: 45 }
const AUTO = { min: 20, max: 90, step: 5, default: 60 }

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

function Slider({ id, label, value, valueText, min, max, step, help, onChange }: { id: string; label: string; value: number; valueText: string; min: number; max: number; step: number; help?: string; onChange: (n: number) => void }) {
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
          'mt-4 h-1.5 w-full cursor-pointer touch-pan-y appearance-none rounded-full outline-none',
          '[&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.6)] [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/30 active:[&::-webkit-slider-thumb]:scale-110',
          'pointer-coarse:[&::-webkit-slider-thumb]:h-6 pointer-coarse:[&::-webkit-slider-thumb]:w-6',
          '[&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white',
        )}
        style={{ background: `linear-gradient(to right, rgba(245,245,245,0.9) ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
      {help && <p className="mt-3 text-[12.5px] leading-relaxed text-dim">{help}</p>}
    </div>
  )
}

const BORDER_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const

function PillButton({ children, onClick, primary = false, glow = false, disabled = false, className }: { children: React.ReactNode; onClick: () => void; primary?: boolean; glow?: boolean; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-full px-6 py-2.5 text-[13.5px] font-medium transition-all disabled:pointer-events-none disabled:opacity-40',
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
    sales: true, marketing: false, support: true, communication: false, finance: true, operations: false, hr: false, planning: false,
  })
  const [hours, setHours] = useState<Record<AreaKey, number>>(
    () => Object.fromEntries(AREAS.map((a) => [a.key, HOURS.default])) as Record<AreaKey, number>,
  )
  const [rate, setRate] = useState(RATE.default)
  const [automatable, setAutomatable] = useState(AUTO.default)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const chosen = AREAS.filter((a) => selected[a.key])
  const totalHoursWeek = chosen.reduce((sum, a) => sum + hours[a.key], 0)
  const hoursSaved = totalHoursWeek * WORK_WEEKS * (automatable / 100)
  const savings = hoursSaved * rate
  const animated = useCountUp(done ? savings : 0)

  const prog = useSpring(0, { stiffness: 90, damping: 20, mass: 0.5 })
  useEffect(() => {
    prog.set(done ? 1 : (step + 0.4) / 3)
  }, [step, done, prog])
  const ang = useTransform(prog, (p) => `${p * 360}deg`)
  const ring = useMotionTemplate`conic-gradient(from 292deg, rgba(245,245,245,0.85) 0deg, rgba(245,245,245,0.85) ${ang}, transparent ${ang})`

  const stats = [
    { label: t.stats.month, value: eur.format(Math.round(savings / 12)) },
    { label: t.stats.hours, value: nf({ maximumFractionDigits: 0 }).format(Math.round(hoursSaved)) },
    { label: t.stats.weeks, value: nf({ maximumFractionDigits: 1 }).format(hoursSaved / 40) },
  ]
  const canNext = step !== 0 || chosen.length > 0

  return (
    <div className="relative mx-auto mt-10 max-w-[900px]">
      {/* the light lives BEHIND the card and seeps out from under the edges, like the
          booking pop-up: a wide soft bloom under the bottom + a faint halo behind */}
      <div aria-hidden className="pointer-events-none absolute inset-x-8 bottom-[-26px] h-32 rounded-[50%] bg-white/[0.14] blur-[54px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-[-4px] top-24 bottom-[-14px] rounded-[42px] bg-white/[0.045] blur-[50px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0a0a0c]/95 p-7 shadow-[0_50px_120px_-45px_rgba(0,0,0,0.9)] sm:p-9">
        {/* border light — a thin line that traces around, starting top-left */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[30px]" style={{ background: ring, padding: 1.5, ...BORDER_MASK }} />

        <div className="relative flex min-h-[392px] flex-col">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <p className="max-w-[62%] text-[13px] leading-snug text-faint">{t.stepHelp[step]}</p>
                  <span className="shrink-0 text-[12px] uppercase tracking-[0.18em] text-faint">{t.steps[step]}</span>
                </div>

                <div className="mt-6 flex-1">
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
                                  <a.Icon className={cn('h-[18px] w-[18px]', on ? 'text-ink' : 'text-faint')} strokeWidth={1.7} />
                                </span>
                                <span className={cn('text-[13.5px] font-medium', on ? 'text-ink' : 'text-muted')}>{a[lang]}</span>
                                <span className={cn('absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full border transition-all', on ? 'border-white/50 bg-white/90' : 'border-line')}>
                                  {on && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ) : step === 1 ? (
                        <div className="flex max-h-[248px] flex-col gap-5 overflow-y-auto pr-1">
                          {chosen.length === 0 ? (
                            <p className="py-10 text-center text-[13.5px] text-dim">{t.pickHint}</p>
                          ) : (
                            chosen.map((a) => (
                              <div key={a.key} className="flex items-center gap-4">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white/[0.04]">
                                  <a.Icon className="h-[17px] w-[17px] text-ink-soft" strokeWidth={1.7} />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <Slider id={`roi-${a.key}`} label={a[lang]} value={hours[a.key]} valueText={t.perWeek(hours[a.key])} min={HOURS.min} max={HOURS.max} step={HOURS.step} onChange={(n) => setHours((h) => ({ ...h, [a.key]: n }))} />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-8">
                          <Slider id="roi-rate" label={t.rate.label} value={rate} valueText={t.rate.render(rate)} min={RATE.min} max={RATE.max} step={RATE.step} help={t.rate.help} onChange={setRate} />
                          <Slider id="roi-auto" label={t.automatable.label} value={automatable} valueText={t.automatable.render(automatable)} min={AUTO.min} max={AUTO.max} step={AUTO.step} help={t.automatable.help} onChange={setAutomatable} />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <PillButton onClick={() => setStep((s) => Math.max(0, s - 1))} className={step === 0 ? 'pointer-events-none opacity-0' : ''}>
                    {t.back}
                  </PillButton>
                  {step < 2 ? (
                    <PillButton primary disabled={!canNext} onClick={() => setStep((s) => Math.min(2, s + 1))}>
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
                <button type="button" onClick={() => setDone(false)} className="mx-auto mt-6 text-[12.5px] text-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink">
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
