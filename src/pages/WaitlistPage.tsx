import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { subscribe } from '@/lib/newsletter'
import { useLang } from '@/i18n'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = {
  box: 'Box',
  voice: 'Voice',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+0-9][0-9\s().-]{6,}$/

const COPY = {
  en: {
    thingGeneric: 'Box and Voice',
    comingSoon: (thing: string) => `${thing}, coming soon`,
    titleProduct: (p: string) => `Be first to use ${p}`,
    titleGeneric: 'Get notified at launch',
    subProduct: (p: string) =>
      `${p} is almost ready. Leave your details and we'll ping you the moment it goes live, nothing else.`,
    subGeneric:
      "Box and Voice are almost here. Leave your details and we'll ping you the moment they go live, nothing else.",
    errName: 'Please add your name.',
    errContact: 'Add an email or a phone number so we can reach you.',
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
    phName: 'Your name',
    phEmail: 'you@company.com',
    phPhone: 'Phone (optional)',
    submitting: 'One sec',
    submit: 'Get notified',
    foot: 'One message the day it drops. No spam, ever.',
  },
  nl: {
    thingGeneric: 'Box en Voice',
    comingSoon: (thing: string) => `${thing}, binnenkort`,
    titleProduct: (p: string) => `Wees de eerste die ${p} gebruikt`,
    titleGeneric: 'Krijg bericht bij de lancering',
    subProduct: (p: string) =>
      `${p} is bijna klaar. Laat uw gegevens achter en we laten van ons horen zodra het live gaat, niets anders.`,
    subGeneric:
      'Box en Voice zijn er bijna. Laat uw gegevens achter en we laten van ons horen zodra ze live gaan, niets anders.',
    errName: 'Vul uw naam in.',
    errContact: 'Vul een e-mail of telefoonnummer in zodat we u kunnen bereiken.',
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
    phName: 'Uw naam',
    phEmail: 'u@bedrijf.com',
    phPhone: 'Telefoon (optioneel)',
    submitting: 'Momentje',
    submit: 'Houd me op de hoogte',
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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const title = product ? t.titleProduct(product) : t.titleGeneric
  const subtitle = product ? t.subProduct(product) : t.subGeneric

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()

    if (!name.trim()) {
      setError(t.errName)
      return
    }
    if (!trimmedEmail && !trimmedPhone) {
      setError(t.errContact)
      return
    }
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      setError(t.errEmail)
      return
    }
    if (!trimmedEmail && trimmedPhone && !PHONE_RE.test(trimmedPhone)) {
      setError(t.errPhone)
      return
    }

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

  return (
    <main>
      <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center sm:pb-24 sm:pt-32">
        {/* ── Background: monochrome waves glowing through the lower half ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/backgrounds/bg-waves.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
          />
          {/* Top stays near-black so the headline reads, the waves emerge lower down */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg from-12% via-bg/45 via-40% to-transparent to-68%" />
          {/* Ground the very bottom back into the page */}
          <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-bg to-transparent" />
          {/* Cool glow up top */}
          <div className="absolute inset-x-0 top-10 mx-auto h-[420px] w-[620px] max-w-full rounded-full bg-white/[0.05] blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[620px] flex-col items-center">
          <Reveal mode="mount">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] font-medium text-muted backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
              {t.comingSoon(thing)}
            </span>
          </Reveal>

          <Reveal mode="mount" delay={0.05}>
            <h1 className="mt-6 bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-serif text-[30px] leading-[1.08] tracking-[-0.02em] text-transparent sm:text-[52px]">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-faint sm:text-[16px]">
              {subtitle}
            </p>
          </Reveal>

          {/* ── Glass card: form ⇆ success ── */}
          <Reveal mode="mount" delay={0.1} className="mt-10 w-full max-w-[440px]">
            <div className="relative overflow-hidden rounded-[26px] border border-line-strong bg-[#0a0a0c]/75 p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_-20%,rgba(255,255,255,0.10),transparent_60%)]" />

              <div className="relative">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center py-4 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                        className="grid h-[52px] w-[52px] place-items-center rounded-full bg-gradient-to-b from-white to-white/85 text-[#0a0a0a] shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
                      >
                        <Check className="h-6 w-6" strokeWidth={2.4} />
                      </motion.span>
                      <h2 className="mt-5 font-serif text-[23px] tracking-[-0.01em] text-ink">
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
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2.5 text-left"
                      noValidate
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder={t.phName}
                        autoComplete="name"
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder={t.phEmail}
                        autoComplete="email"
                        aria-invalid={!!error}
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder={t.phPhone}
                        autoComplete="tel"
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      {error && <span className="px-1 text-[12.5px] text-terracotta">{error}</span>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group mt-1.5 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            {t.submitting}
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          </>
                        ) : (
                          <>
                            {t.submit}
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                          </>
                        )}
                      </button>
                      <p className="mt-1.5 text-center text-[12px] text-dim">
                        {t.foot}
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
