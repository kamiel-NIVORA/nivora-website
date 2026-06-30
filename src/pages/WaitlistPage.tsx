import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { SeaWaves } from '@/components/ui/SeaWaves'
import { subscribe } from '@/lib/newsletter'
import { useLang } from '@/i18n'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = {
  box: 'Box',
  voice: 'Voice',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+0-9][0-9\s().-]{6,}$/

const STEPS = ['name', 'email', 'phone'] as const
type Step = (typeof STEPS)[number]

const ease = [0.22, 1, 0.36, 1] as const

/* Slide variants for the active field. `custom` is the direction (+1 forward,
   -1 back); AnimatePresence resolves the exiting field against the current
   direction, so a "Back" step exits to the right, a "Continue" to the left. */
const stepVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 34 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -34 }),
}

const COPY = {
  en: {
    thingGeneric: 'Box and Voice',
    comingSoon: (thing: string) => `${thing}, coming soon`,
    titleProduct: (p: string) => `Be first to use ${p}`,
    titleGeneric: 'Get notified at launch',
    subProduct: (p: string) =>
      `${p} is almost ready. Leave your details and we'll reach out the moment it goes live. Nothing else.`,
    subGeneric:
      "Box and Voice are almost here. Leave your details and we'll reach out the moment they go live. Nothing else.",
    fields: {
      name: { label: "What's your name?", ph: 'Your name', optional: false },
      email: { label: 'Your business email', ph: 'you@company.com', optional: false },
      phone: { label: 'Phone number', ph: '+32 470 12 34 56', optional: true },
    } as Record<Step, { label: string; ph: string; optional: boolean }>,
    optional: 'optional',
    hintContinue: 'Press Enter to continue',
    hintFinish: 'Press Enter to finish',
    back: 'Back',
    cont: 'Continue',
    submit: 'Get notified',
    submitting: 'One sec',
    errName: 'Please add your name.',
    errEmail: 'Please enter a valid email address.',
    errPhone: 'Please enter a valid phone number.',
    errGeneric: 'Something went wrong. Please try again.',
    doneAlready: "You're already on the list",
    doneNew: "You're on the list",
    bodyAlready: (thing: string) => `We already have you down. We'll let you know the moment ${thing} drops.`,
    bodyEmailPre: 'Check ',
    bodyEmailPost: ' for a confirmation link, click it once and you are set.',
    bodyThanks: (firstName: string, thing: string) =>
      `Thanks${firstName ? `, ${firstName}` : ''}. We'll reach out the second ${thing} goes live.`,
    foot: 'One message the day it drops. No spam, ever.',
  },
  nl: {
    thingGeneric: 'Box en Voice',
    comingSoon: (thing: string) => `${thing}, binnenkort`,
    titleProduct: (p: string) => `Wees de eerste die ${p} gebruikt`,
    titleGeneric: 'Krijg bericht bij de lancering',
    subProduct: (p: string) =>
      `${p} is bijna klaar. Laat uw gegevens achter en we laten van ons horen zodra het live gaat. Niets anders.`,
    subGeneric:
      'Box en Voice zijn er bijna. Laat uw gegevens achter en we laten van ons horen zodra ze live gaan. Niets anders.',
    fields: {
      name: { label: 'Wat is uw naam?', ph: 'Uw naam', optional: false },
      email: { label: 'Uw bedrijfse-mail', ph: 'u@bedrijf.com', optional: false },
      phone: { label: 'Telefoonnummer', ph: '+32 470 12 34 56', optional: true },
    } as Record<Step, { label: string; ph: string; optional: boolean }>,
    optional: 'optioneel',
    hintContinue: 'Druk op Enter om verder te gaan',
    hintFinish: 'Druk op Enter om af te ronden',
    back: 'Terug',
    cont: 'Verder',
    submit: 'Houd me op de hoogte',
    submitting: 'Momentje',
    errName: 'Vul uw naam in.',
    errEmail: 'Vul een geldig e-mailadres in.',
    errPhone: 'Vul een geldig telefoonnummer in.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
    doneAlready: 'U staat al op de lijst',
    doneNew: 'U staat op de lijst',
    bodyAlready: (thing: string) => `We hebben u al genoteerd. We laten van ons horen zodra ${thing} er is.`,
    bodyEmailPre: 'Controleer ',
    bodyEmailPost: ' voor een bevestigingslink, klik er één keer op en u bent klaar.',
    bodyThanks: (firstName: string, thing: string) =>
      `Bedankt${firstName ? `, ${firstName}` : ''}. We nemen contact op zodra ${thing} live gaat.`,
    foot: 'Eén bericht op de dag van de lancering. Nooit spam.',
  },
} as const

export function WaitlistPage() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [params] = useSearchParams()
  const productSlug = (params.get('product') ?? '').toLowerCase()
  const product = PRODUCT_LABELS[productSlug]
  const thing = product ?? t.thingGeneric

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const title = product ? t.titleProduct(product) : t.titleGeneric
  const subtitle = product ? t.subProduct(product) : t.subGeneric
  const stepKey = STEPS[step]
  const field = t.fields[stepKey]
  const isLast = step === STEPS.length - 1
  const values: Record<Step, string> = { name, email, phone }
  const setters: Record<Step, (v: string) => void> = { name: setName, email: setEmail, phone: setPhone }

  // Focus the field whenever the step changes, so the visitor just types.
  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  async function submit() {
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()
    setError(null)
    setSubmitting(true)
    const res = await subscribe({
      // The backend is email-keyed, so a phone-only signup is sent under a
      // placeholder address that still carries the real phone + name.
      email: trimmedEmail || `phone+${trimmedPhone.replace(/[^0-9]/g, '')}@waitlist.nivora`,
      name: name.trim(),
      phone: trimmedPhone || undefined,
      product: productSlug || undefined,
      source: productSlug ? `waitlist:${productSlug}` : 'waitlist',
    })
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? t.errGeneric)
      return
    }
    setAlready(res.status === 'already_subscribed')
    setEmailSent(res.emailSent === true)
    setDone(true)
  }

  function goNext() {
    if (submitting) return
    if (stepKey === 'name' && !name.trim()) return setError(t.errName)
    if (stepKey === 'email') {
      const e = email.trim()
      if (!e || !EMAIL_RE.test(e)) return setError(t.errEmail)
    }
    if (stepKey === 'phone') {
      const p = phone.trim()
      if (p && !PHONE_RE.test(p)) return setError(t.errPhone)
    }
    setError(null)
    if (isLast) return void submit()
    setDir(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    if (step === 0) return
    setError(null)
    setDir(-1)
    setStep((s) => s - 1)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      goNext()
    }
  }

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-12 sm:py-16">
      {/* ── Background: the mountain photo, darkened so the frame floats above it ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/backgrounds/bg-waitlist.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_28%,rgba(6,6,6,0.30),rgba(6,6,6,0.86)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/30 to-bg/90" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(70%_120%_at_50%_100%,rgba(102,145,163,0.14),transparent)]" />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* soft halo behind the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[44px] bg-[radial-gradient(55%_55%_at_50%_42%,rgba(102,145,163,0.20),transparent_72%)] blur-2xl"
        />

        {/* ── The frame, with a travelling "kader light" around the border ── */}
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] p-[1.5px] shadow-[0_50px_120px_-35px_rgba(0,0,0,0.85)]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 animate-[borderSpin_9s_linear_infinite] motion-reduce:animate-none [background:conic-gradient(from_0deg,transparent_0deg,transparent_60deg,rgba(122,161,173,0.9)_86deg,rgba(236,244,247,0.98)_100deg,rgba(122,161,173,0.0)_122deg,transparent_244deg,rgba(122,161,173,0.7)_268deg,rgba(236,244,247,0.92)_280deg,rgba(122,161,173,0.0)_300deg,rgba(150,167,102,0.6)_332deg,transparent_356deg)]"
          />

          <div className="relative overflow-hidden rounded-[27px] bg-[#080809]/85 backdrop-blur-2xl">
            <SeaWaves className="pointer-events-none absolute inset-0" />
            {/* glass top hairline + crown sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_-20%,rgba(255,255,255,0.09),transparent_58%)]" />

            <div className="relative z-10 px-6 pb-7 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                      className="grid h-[54px] w-[54px] place-items-center rounded-full bg-gradient-to-b from-white to-white/85 text-[#0a0a0a] shadow-[0_12px_34px_rgba(255,255,255,0.2)]"
                    >
                      <Check className="h-6 w-6" strokeWidth={2.4} />
                    </motion.span>
                    <h2 className="mt-5 font-serif text-[24px] tracking-[-0.01em] text-ink">
                      {already ? t.doneAlready : t.doneNew}
                    </h2>
                    <p className="mt-2.5 max-w-xs text-[14px] leading-relaxed text-faint">
                      {already ? (
                        <>{t.bodyAlready(thing)}</>
                      ) : emailSent ? (
                        <>
                          {t.bodyEmailPre}
                          <span className="text-ink-soft">{email.trim()}</span>
                          {t.bodyEmailPost}
                        </>
                      ) : (
                        <>{t.bodyThanks(name.trim() ? name.trim().split(' ')[0] : '', thing)}</>
                      )}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* coming-soon pill */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-muted backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
                      {t.comingSoon(thing)}
                    </span>

                    <h1 className="mt-5 bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-serif text-[27px] leading-[1.1] tracking-[-0.02em] text-transparent sm:text-[31px]">
                      {title}
                    </h1>
                    <p className="mt-3 text-[14px] leading-relaxed text-faint sm:text-[15px]">{subtitle}</p>

                    {/* segmented progress */}
                    <div className="mt-6 flex items-center gap-1.5">
                      {STEPS.map((s, i) => (
                        <span key={s} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                          <motion.span
                            className="block h-full rounded-full bg-gradient-to-r from-steel to-olive"
                            initial={false}
                            animate={{ width: i <= step ? '100%' : '0%' }}
                            transition={{ duration: 0.45, ease }}
                          />
                        </span>
                      ))}
                    </div>

                    {/* the single active field */}
                    <div className="relative mt-5 min-h-[92px]">
                      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                        <motion.div
                          key={stepKey}
                          custom={dir}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.32, ease }}
                        >
                          <label className="flex items-baseline justify-between text-[13px] font-medium text-ink-soft">
                            <span>{field.label}</span>
                            {field.optional && <span className="text-[12px] text-dim">{t.optional}</span>}
                          </label>
                          <input
                            ref={inputRef}
                            type={stepKey === 'email' ? 'email' : stepKey === 'phone' ? 'tel' : 'text'}
                            inputMode={stepKey === 'phone' ? 'tel' : undefined}
                            value={values[stepKey]}
                            onChange={(e) => {
                              setters[stepKey](e.target.value)
                              if (error) setError(null)
                            }}
                            onKeyDown={onKeyDown}
                            placeholder={field.ph}
                            autoComplete={stepKey === 'email' ? 'email' : stepKey === 'phone' ? 'tel' : 'name'}
                            aria-invalid={!!error}
                            className="mt-2 h-12 w-full rounded-[14px] border border-line bg-black/30 px-4 text-[16px] text-ink outline-none backdrop-blur-md transition-colors placeholder:text-dim focus:border-steel/70"
                          />
                          <div className="mt-2 h-4 px-1 text-[12.5px]">
                            {error ? (
                              <span className="text-terracotta">{error}</span>
                            ) : (
                              <span className="text-dim">{isLast ? t.hintFinish : t.hintContinue}</span>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* nav row */}
                    <div className="mt-3 flex items-center gap-3">
                      <AnimatePresence initial={false}>
                        {step > 0 && (
                          <motion.button
                            type="button"
                            onClick={goBack}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 48 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.25, ease }}
                            aria-label={t.back}
                            className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-line bg-white/[0.03] text-muted transition-colors hover:border-line-strong hover:text-ink"
                          >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                          </motion.button>
                        )}
                      </AnimatePresence>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={submitting}
                        className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            {t.submitting}
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          </>
                        ) : (
                          <>
                            {isLast ? t.submit : t.cont}
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-4 text-center text-[12px] text-faint [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                      {t.foot}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
