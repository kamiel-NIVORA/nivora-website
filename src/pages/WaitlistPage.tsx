import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { subscribe } from '@/lib/newsletter'
import { useLang } from '@/i18n'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = {
  box: 'Box',
  voice: 'Voice',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEPS = ['name', 'email'] as const
type Step = (typeof STEPS)[number]

const ease = [0.22, 1, 0.36, 1] as const

/* Slide variants for the active field. `custom` is the direction (+1 forward,
   -1 back); AnimatePresence resolves the exiting field against the current
   direction, so a "Back" step exits to the right, a "Continue" to the left. */
const stepVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 30 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -30 }),
}

const COPY = {
  en: {
    eyebrow: 'Nivora / Waitlist',
    leftCaption: 'Two apps, one calm place to be the first to step in.',
    thingGeneric: 'Box and Voice',
    titleProduct: (p: string) => `Be first to use ${p}`,
    titleGeneric: 'Be first to use Box or Voice',
    subProduct: (p: string) => `Leave your name and email. We'll reach out the moment ${p} goes live.`,
    subGeneric: "Leave your name and email. We'll reach out the moment they go live.",
    stepLabel: (n: number, total: number) => `Step ${n} / ${total}`,
    fields: {
      name: { label: "What's your name?", ph: 'Your name' },
      email: { label: 'Your business email', ph: 'you@company.com' },
    } as Record<Step, { label: string; ph: string }>,
    hintContinue: 'Press Enter to continue',
    hintFinish: 'Press Enter to finish',
    back: 'Back',
    cont: 'Continue',
    submit: 'Get notified',
    submitting: 'One sec',
    errName: 'Please add your name.',
    errEmail: 'Please enter a valid email address.',
    errGeneric: 'Something went wrong. Please try again.',
    doneAlready: "You're already on the list",
    doneNew: "You're on the list",
    bodyAlready: (thing: string) => `We already have you down. We'll let you know the moment ${thing} drops.`,
    bodyEmailPre: 'Check ',
    bodyEmailPost: ' for a confirmation link, click it once and you are set.',
    bodyThanks: (firstName: string, thing: string) =>
      `Thanks${firstName ? `, ${firstName}` : ''}. We'll reach out the second ${thing} goes live.`,
  },
  nl: {
    eyebrow: 'Nivora / Wachtlijst',
    leftCaption: 'Twee apps, één rustige plek om als eerste binnen te stappen.',
    thingGeneric: 'Box en Voice',
    titleProduct: (p: string) => `Wees de eerste die ${p} gebruikt`,
    titleGeneric: 'Wees de eerste die Box of Voice gebruikt',
    subProduct: (p: string) => `Laat uw naam en e-mail achter. We laten van ons horen zodra ${p} live gaat.`,
    subGeneric: 'Laat uw naam en e-mail achter. We laten van ons horen zodra ze live gaan.',
    stepLabel: (n: number, total: number) => `Stap ${n} / ${total}`,
    fields: {
      name: { label: 'Wat is uw naam?', ph: 'Uw naam' },
      email: { label: 'Uw bedrijfse-mail', ph: 'u@bedrijf.com' },
    } as Record<Step, { label: string; ph: string }>,
    hintContinue: 'Druk op Enter om verder te gaan',
    hintFinish: 'Druk op Enter om af te ronden',
    back: 'Terug',
    cont: 'Verder',
    submit: 'Houd me op de hoogte',
    submitting: 'Momentje',
    errName: 'Vul uw naam in.',
    errEmail: 'Vul een geldig e-mailadres in.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
    doneAlready: 'U staat al op de lijst',
    doneNew: 'U staat op de lijst',
    bodyAlready: (thing: string) => `We hebben u al genoteerd. We laten van ons horen zodra ${thing} er is.`,
    bodyEmailPre: 'Controleer ',
    bodyEmailPost: ' voor een bevestigingslink, klik er één keer op en u bent klaar.',
    bodyThanks: (firstName: string, thing: string) =>
      `Bedankt${firstName ? `, ${firstName}` : ''}. We nemen contact op zodra ${thing} live gaat.`,
  },
} as const

/** A Box / Voice app-icon tile, on a subtle rim so the black icon reads on the dark card. */
function ProductIcon({ src, alt, size = 42 }: { src: string; alt: string; size?: number }) {
  return (
    <span
      className="relative block overflow-hidden rounded-[12px] shadow-[0_6px_16px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.12]"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </span>
  )
}

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
  const values: Record<Step, string> = { name, email }
  const setters: Record<Step, (v: string) => void> = { name: setName, email: setEmail }

  // Focus the field whenever the step changes, so the visitor just types.
  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  useEffect(() => {
    const prev = document.title
    document.title = lang === 'nl' ? 'Wachtlijst · Nivora' : 'Waitlist · Nivora'
    return () => {
      document.title = prev
    }
  }, [lang])

  async function submit() {
    setError(null)
    setSubmitting(true)
    const res = await subscribe({
      email: email.trim(),
      name: name.trim(),
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
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-4 py-10">
      {/* ── Background: the same misty hills as the booking page, kept visible ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/backgrounds/bg-hills.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_46%]"
        />
        <div className="absolute inset-0 bg-bg/[0.44]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_42%,transparent_42%,rgba(6,6,6,0.55))]" />
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-bg/85 to-transparent" />
      </div>

      <div className="relative w-full max-w-[860px]">
        {/* a soft light spilling over the top edge, like the booking frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-3px] z-20 h-[90px] w-[38%] -translate-x-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.42),rgba(255,255,255,0.06)_55%,transparent_72%)] blur-[13px]"
        />

        {/* ── The card: one light line all around, near-black, two columns ── */}
        <div className="relative grid overflow-hidden rounded-[24px] border border-white/[0.12] bg-[#0b0b0d]/90 shadow-[0_40px_110px_-40px_rgba(0,0,0,0.85)] lg:grid-cols-[44%_56%]">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* ── LEFT: two photos + copy + logo (desktop only) ── */}
          <div className="relative hidden flex-col border-r border-white/[0.06] p-6 lg:flex">
            <div className="flex items-center gap-2.5">
              <ProductIcon src="/products/box-logo.webp" alt="Nivora Box" />
              <ProductIcon src="/products/voice-logo.webp" alt="Nivora Voice" />
            </div>

            <div className="relative mx-1 mt-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[15px] shadow-[0_22px_44px_-20px_rgba(0,0,0,0.8)] outline outline-1 outline-white/[0.08]">
                <img
                  src="/brand/landscape-ridges.webp"
                  alt=""
                  className="h-full w-full object-cover [filter:saturate(0.96)_brightness(0.92)]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg/10 to-bg/55" />
              </div>
              <div className="absolute -bottom-3 -right-2.5 aspect-[3/4] w-[46%] overflow-hidden rounded-[12px] border-[3px] border-[#0b0b0d] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.85)] outline outline-1 outline-white/10">
                <img
                  src="/products/products-bg-moss.webp"
                  alt=""
                  className="h-full w-full object-cover object-[50%_60%] [filter:brightness(0.8)_contrast(1.03)]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/10 to-bg/45" />
              </div>
            </div>

            <p className="mt-7 max-w-[17rem] text-[12.5px] leading-relaxed text-faint">{t.leftCaption}</p>

            <div className="mt-auto flex items-center gap-2 pt-6">
              <img src="/brand/nivora-mark.webp" alt="" className="h-4 w-auto" />
              <span className="text-[13px] font-medium tracking-[0.26em] text-ink-soft">NIVORA</span>
            </div>
          </div>

          {/* ── RIGHT: the sign-up ── */}
          <div className="relative flex flex-col p-7">
            <img src="/brand/nivora-mark.webp" alt="" className="absolute right-6 top-6 h-[22px] w-auto opacity-80" />

            <div className="mb-5 flex items-center gap-2.5 lg:hidden">
              <ProductIcon src="/products/box-logo.webp" alt="Nivora Box" size={40} />
              <ProductIcon src="/products/voice-logo.webp" alt="Nivora Voice" size={40} />
            </div>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-1 flex-col justify-center py-3"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                    className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#0a0a0a] shadow-[0_12px_34px_rgba(255,255,255,0.2)]"
                  >
                    <Check className="h-[22px] w-[22px]" strokeWidth={2.4} />
                  </motion.span>
                  <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.01em] text-ink">
                    {already ? t.doneAlready : t.doneNew}
                  </h2>
                  <p className="mt-2.5 max-w-xs text-[13.5px] leading-relaxed text-faint">
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
                  <div className="text-[10.5px] uppercase tracking-[0.26em] text-faint">{t.eyebrow}</div>
                  <h1 className="mt-3 max-w-[16rem] text-[25px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
                    {title}
                  </h1>
                  <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-muted">{subtitle}</p>

                  {/* progress: a single clean white bar + step label */}
                  <div className="mt-6 flex items-center gap-2.5">
                    <span className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.12]">
                      <motion.span
                        className="block h-full rounded-full bg-white/85"
                        initial={false}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.45, ease }}
                      />
                    </span>
                    <span className="whitespace-nowrap text-[11px] tracking-[0.1em] text-faint">
                      {t.stepLabel(step + 1, STEPS.length)}
                    </span>
                  </div>

                  {/* the single active field */}
                  <div className="relative mt-5 min-h-[86px]">
                    <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                      <motion.div
                        key={stepKey}
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease }}
                      >
                        <label className="text-[12.5px] font-medium text-ink-soft">{field.label}</label>
                        <input
                          ref={inputRef}
                          type={stepKey === 'email' ? 'email' : 'text'}
                          value={values[stepKey]}
                          onChange={(e) => {
                            setters[stepKey](e.target.value)
                            if (error) setError(null)
                          }}
                          onKeyDown={onKeyDown}
                          placeholder={field.ph}
                          autoComplete={stepKey === 'email' ? 'email' : 'name'}
                          aria-invalid={!!error}
                          className="mt-2.5 h-12 w-full rounded-[12px] border border-white/[0.12] bg-black/30 px-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-dim focus:border-white/40"
                        />
                        <div className="mt-2 h-4 text-[12px]">
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
                  <div className="mt-3 flex items-center gap-2.5">
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
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] border border-white/[0.12] bg-white/[0.03] text-muted transition-colors hover:border-white/25 hover:text-ink"
                        >
                          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={submitting}
                      className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[12px] bg-white px-5 text-[14px] font-semibold text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          {t.submitting}
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                        </>
                      ) : (
                        <>
                          {isLast ? t.submit : t.cont}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  )
}
