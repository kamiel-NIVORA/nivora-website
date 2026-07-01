import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { subscribe } from '@/lib/newsletter'
import { SOCIAL_LINKS } from '@/data/contact'
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
    eyebrow: 'Nivora / Waitlist',
    soon: 'Soon',
    leftCaption: 'Two apps, one calm place to be the first to step in.',
    thingGeneric: 'Box and Voice',
    titleProduct: (p: string) => `Be first to use ${p}`,
    titleGeneric: 'Join the waitlist',
    subProduct: (p: string) =>
      `${p} is almost ready. Leave your details and we'll reach out the moment it goes live. Nothing else.`,
    subGeneric:
      "Sign up for Box and Voice. We'll reach out the moment they go live, nothing else.",
    stepLabel: (n: number, total: number) => `Step ${n} / ${total}`,
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
    eyebrow: 'Nivora / Wachtlijst',
    soon: 'Binnenkort',
    leftCaption: 'Twee apps, één rustige plek om als eerste binnen te stappen.',
    thingGeneric: 'Box en Voice',
    titleProduct: (p: string) => `Wees de eerste die ${p} gebruikt`,
    titleGeneric: 'Kom op de wachtlijst',
    subProduct: (p: string) =>
      `${p} is bijna klaar. Laat uw gegevens achter en we laten van ons horen zodra het live gaat. Niets anders.`,
    subGeneric:
      'Schrijf u in voor Box en Voice. We laten van ons horen zodra ze live gaan, niets anders.',
    stepLabel: (n: number, total: number) => `Stap ${n} / ${total}`,
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

/** A Box / Voice app-icon tile, presented on a subtle rim so the black icon
 *  reads on the dark card. */
function ProductIcon({ src, alt, size = 52 }: { src: string; alt: string; size?: number }) {
  return (
    <span
      className="relative block overflow-hidden rounded-[15px] shadow-[0_8px_22px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.12]"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" />
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

  useEffect(() => {
    const prev = document.title
    document.title = lang === 'nl' ? 'Wachtlijst · Nivora' : 'Waitlist · Nivora'
    return () => {
      document.title = prev
    }
  }, [lang])

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
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      {/* ── Background: the same misty hills as the booking page, darkened ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/backgrounds/bg-hills.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_34%,rgba(6,6,6,0.30),rgba(6,6,6,0.86)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/20 to-bg/95" />
      </div>

      <div className="relative w-full max-w-[1040px]">
        {/* ambient halo + a soft light spilling over the top edge, like the booking frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[52px] bg-[radial-gradient(52%_60%_at_50%_30%,rgba(102,145,163,0.16),transparent_72%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-20 h-[120px] w-[44%] -translate-x-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(236,244,247,0.5),rgba(236,244,247,0.08)_55%,transparent_72%)] blur-[14px]"
        />

        {/* ── The frame: a 1px light ring around a near-black two-column card ── */}
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04)_30%,rgba(255,255,255,0.02))] p-px shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]">
          <div className="relative grid overflow-hidden rounded-[31px] bg-[#0b0b0d]/90 backdrop-blur-2xl lg:min-h-[640px] lg:grid-cols-[42%_58%]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* ── LEFT: brand + the photo-in-photo (desktop only) ── */}
            <div className="relative hidden flex-col border-r border-white/[0.06] p-9 lg:flex">
              <div
                aria-hidden
                className="pointer-events-none absolute left-[8%] top-[6%] h-[70%] w-[88%] opacity-80 blur-[6px] [background:radial-gradient(circle_at_50%_50%,transparent_54%,rgba(150,167,102,0.10)_61%,rgba(255,255,255,0.06)_66%,transparent_74%)]"
              />

              {/* Box + Voice icons, at the top of the frame */}
              <div className="relative z-10 flex items-center gap-3">
                <ProductIcon src="/products/box-logo.webp" alt="Nivora Box" />
                <ProductIcon src="/products/voice-logo.webp" alt="Nivora Voice" />
                <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-faint">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.8)]" />
                  {t.soon}
                </span>
              </div>

              {/* photo-in-photo */}
              <div className="relative z-10 mx-1.5 mt-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)] outline outline-1 outline-white/[0.08]">
                  <img
                    src="/brand/landscape-ridges.webp"
                    alt=""
                    className="h-full w-full object-cover [filter:saturate(0.94)_brightness(0.9)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-bg/15 via-bg/10 to-bg/60" />
                </div>
                <div className="absolute -bottom-4 -right-3 aspect-[3/4] w-[44%] overflow-hidden rounded-[15px] border-[3px] border-[#0b0b0d] shadow-[0_20px_40px_-14px_rgba(0,0,0,0.85)] outline outline-1 outline-white/10">
                  <img
                    src="/products/products-bg-moss.webp"
                    alt=""
                    className="h-full w-full object-cover object-[50%_60%] [filter:saturate(1.05)_brightness(0.78)_contrast(1.03)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/10 to-bg/50" />
                </div>
              </div>

              <p className="relative z-10 mt-9 max-w-xs text-[13px] leading-relaxed text-faint">{t.leftCaption}</p>

              {/* Nivora logo, bottom-left */}
              <div className="relative z-10 mt-auto flex items-center gap-2.5 pt-7">
                <img src="/brand/nivora-mark.webp" alt="" className="h-[19px] w-auto" />
                <span className="text-[15px] font-medium tracking-[0.26em] text-ink-soft">NIVORA</span>
              </div>
            </div>

            {/* ── RIGHT: the sign-up ── */}
            <div className="relative flex flex-col p-8 sm:p-9">
              <img
                src="/brand/nivora-mark.webp"
                alt=""
                className="absolute right-8 top-8 h-6 w-auto opacity-80 sm:right-9 sm:top-9"
              />

              {/* product icons on mobile (left panel is hidden there) */}
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                <ProductIcon src="/products/box-logo.webp" alt="Nivora Box" size={44} />
                <ProductIcon src="/products/voice-logo.webp" alt="Nivora Voice" size={44} />
              </div>

              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-1 flex-col justify-center py-4"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                      className="grid h-[54px] w-[54px] place-items-center rounded-full bg-gradient-to-b from-white to-white/85 text-[#0a0a0a] shadow-[0_12px_34px_rgba(255,255,255,0.2)]"
                    >
                      <Check className="h-6 w-6" strokeWidth={2.4} />
                    </motion.span>
                    <h2 className="mt-6 text-[26px] font-semibold tracking-[-0.01em] text-ink">
                      {already ? t.doneAlready : t.doneNew}
                    </h2>
                    <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-faint">
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
                    <div className="text-[11px] uppercase tracking-[0.28em] text-faint">{t.eyebrow}</div>
                    <h1 className="mt-3.5 max-w-[15rem] text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[34px]">
                      {title}
                    </h1>
                    <p className="mt-3.5 max-w-sm text-[15px] leading-relaxed text-muted">{subtitle}</p>

                    {/* progress: a single clean bar + step label */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.09]">
                        <motion.span
                          className="block h-full rounded-full bg-gradient-to-r from-steel to-olive"
                          initial={false}
                          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                          transition={{ duration: 0.45, ease }}
                        />
                      </span>
                      <span className="whitespace-nowrap text-[11.5px] tracking-[0.12em] text-faint">
                        {t.stepLabel(step + 1, STEPS.length)}
                      </span>
                    </div>

                    {/* the single active field */}
                    <div className="relative mt-6 min-h-[92px]">
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
                            className="mt-2.5 h-[52px] w-full rounded-[14px] border border-white/10 bg-black/30 px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-dim focus:border-steel/70"
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
                            animate={{ opacity: 1, width: 52 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.25, ease }}
                            aria-label={t.back}
                            className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-white/20 hover:text-ink"
                          >
                            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                          </motion.button>
                        )}
                      </AnimatePresence>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={submitting}
                        className="group inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14.5px] font-semibold text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
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

              {/* socials, bottom-right (like the booking frame) */}
              <div className="mt-auto flex items-center justify-end gap-3 pt-8">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-ink-soft/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-5 text-center text-[11px] font-medium tracking-[0.34em] text-white/[0.16]"
      >
        WAITINGPAGE.NIVORAWORKS.COM
      </div>
    </main>
  )
}
