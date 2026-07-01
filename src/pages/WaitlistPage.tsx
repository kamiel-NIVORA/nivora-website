import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, ArrowRight, Check, Loader2, Linkedin, Instagram, Facebook, Globe } from 'lucide-react'
import { subscribe } from '@/lib/newsletter'
import { useLang } from '@/i18n'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = { box: 'Box', voice: 'Voice' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Nivora's real socials — same set + order as the booking page footer. */
const SOCIALS = [
  { href: 'https://www.linkedin.com/company/116050071', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/nivoraworks/', Icon: Instagram, label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=61588828395357', Icon: Facebook, label: 'Facebook' },
  { href: 'https://nivoraworks.com', Icon: Globe, label: 'Website' },
]

/* The left panel's soft white crescent — the booking page builds it from a
   luminosity-blended image; here it is recreated with two radial glows. */
const ARC_MAIN = 'radial-gradient(circle at 55% 41%, transparent 48%, rgba(255,255,255,0.22) 57%, rgba(255,255,255,0.04) 64%, transparent 72%)'
const ARC_FILL = 'radial-gradient(circle at 66% 52%, rgba(255,255,255,0.10), transparent 42%)'

const COPY = {
  en: {
    pill: 'Coming soon',
    leftTitle: 'Two apps, one calm place.',
    leftDesc: "Sign up and we'll reach out the moment Box and Voice go live. Nothing else.",
    eyebrow: 'Nivora / Waitlist',
    thingGeneric: 'Box and Voice',
    titleGeneric: 'Be first to use Box or Voice',
    titleProduct: (p: string) => `Be first to use ${p}`,
    nameLabel: 'Your name',
    namePh: 'First + last name',
    nameHint: "We'll only reach out when they go live.",
    emailLabel: 'What is your email?',
    emailPh: 'you@company.com',
    emailHint: 'One message at launch. No newsletters.',
    errName: 'Please enter your full name.',
    errEmail: 'Please enter a valid email address.',
    errGeneric: 'Something went wrong. Please try again.',
    doneNew: "You're on the list",
    doneAlready: "You're already on the list",
    bodyThanks: (fn: string, thing: string) => `Thanks${fn ? `, ${fn}` : ''}. We'll reach out the second ${thing} goes live.`,
    bodyAlready: (thing: string) => `We already have you down. We'll let you know the moment ${thing} drops.`,
    bodyEmailPre: 'Check ',
    bodyEmailPost: ' for a confirmation link, click it once and you are set.',
    caption: 'Nivora.Waitlist',
  },
  nl: {
    pill: 'Binnenkort beschikbaar',
    leftTitle: 'Twee apps, één rustige plek.',
    leftDesc: 'Schrijf u in en we laten van ons horen zodra Box en Voice live gaan. Niets anders.',
    eyebrow: 'Nivora / Wachtlijst',
    thingGeneric: 'Box en Voice',
    titleGeneric: 'Wees de eerste die Box of Voice gebruikt',
    titleProduct: (p: string) => `Wees de eerste die ${p} gebruikt`,
    nameLabel: 'Jouw naam',
    namePh: 'Voornaam + achternaam',
    nameHint: 'We laten van ons horen zodra ze live gaan.',
    emailLabel: 'Wat is uw e-mailadres?',
    emailPh: 'naam@bedrijf.be',
    emailHint: 'Eén bericht bij de lancering. Geen nieuwsbrieven.',
    errName: 'Vul alsjeblieft uw volledige naam in.',
    errEmail: 'Vul alsjeblieft een geldig e-mailadres in.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
    doneNew: 'U staat op de lijst',
    doneAlready: 'U staat al op de lijst',
    bodyThanks: (fn: string, thing: string) => `Bedankt${fn ? `, ${fn}` : ''}. We nemen contact op zodra ${thing} live gaat.`,
    bodyAlready: (thing: string) => `We hebben u al genoteerd. We laten van ons horen zodra ${thing} er is.`,
    bodyEmailPre: 'Controleer ',
    bodyEmailPost: ' voor een bevestigingslink, klik er één keer op en u bent klaar.',
    caption: 'Nivora.Wachtlijst',
  },
} as const

export function WaitlistPage() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [params] = useSearchParams()
  const productSlug = (params.get('product') ?? '').toLowerCase()
  const product = PRODUCT_LABELS[productSlug]
  const thing = product ?? t.thingGeneric
  const heading = product ? t.titleProduct(product) : t.titleGeneric

  const [step, setStep] = useState<'name' | 'email'>('name')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Progress for the border-glow animation (0 → 1), like the booking card.
  const progress = done ? 1.05 : step === 'name' ? 1 / 3 : 2 / 3

  async function submitEmail(value: string) {
    setLoading(true)
    setError('')
    const res = await subscribe({
      email: value.trim(),
      name: name.trim(),
      product: productSlug || undefined,
      source: productSlug ? `waitlist:${productSlug}` : 'waitlist',
    })
    setLoading(false)
    if (!res.ok) {
      setError(res.error ?? t.errGeneric)
      return
    }
    setAlready(res.status === 'already_subscribed')
    setEmailSent(res.emailSent === true)
    setDone(true)
  }

  function nameNext() {
    if (name.trim().length < 2) return setError(t.errName)
    setError('')
    setStep('email')
  }
  function emailNext() {
    if (loading) return
    if (!EMAIL_RE.test(email.trim())) return setError(t.errEmail)
    void submitEmail(email.trim())
  }
  const keyGo = (fn: () => void) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      fn()
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#020202] p-4 text-white selection:bg-white/20 selection:text-white">
      {/* Background — same Nivora landscape as the booking page, a touch darker */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [transform:translateZ(0)]">
        <img src="/backgrounds/bg-hills.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(2,2,2,0.72)_100%)]" />
      </div>

      <main className="relative z-10 w-full max-w-5xl">
        <div className="relative min-h-[600px] w-full md:h-[700px]">
          {/* Progress glow border */}
          <div aria-hidden className="absolute -inset-[2px] z-0 rounded-[26px]">
            <svg className="h-full w-full overflow-visible">
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="24"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, pathOffset: -0.05 }}
                animate={{ pathLength: progress, opacity: 0.6, pathOffset: -0.05 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{ filter: 'blur(8px)' }}
              />
            </svg>
          </div>

          {/* MAIN CARD */}
          <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-2xl md:flex-row">
            {/* LEFT PANEL — visual + trust (hidden on success, like booking) */}
            <motion.div
              className="relative hidden h-[300px] overflow-hidden bg-[#0c0c0d] md:block md:h-full md:w-5/12"
              animate={done ? { width: 0, opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div aria-hidden className="absolute inset-0" style={{ background: ARC_MAIN, filter: 'blur(7px)' }} />
              <div aria-hidden className="absolute inset-0" style={{ background: ARC_FILL, filter: 'blur(10px)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-transparent" />

              <div className="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-end p-12">
                <div className="mb-8 flex flex-col items-start text-left">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">{t.pill}</span>
                  </div>
                  <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-white">{t.leftTitle}</h1>
                  <p className="max-w-xs text-sm font-light leading-relaxed text-neutral-300">{t.leftDesc}</p>
                </div>
                <div className="flex w-full items-center justify-center border-t border-white/10 pt-8 opacity-90">
                  <img src="/brand/nivora-logo.png" alt="Nivora" className="h-8 w-auto object-contain" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <div className="relative flex h-full flex-1 flex-col rounded-r-3xl border-l border-white/5 bg-[#0a0a0a]">
              {!done && (
                <div className="absolute right-5 top-5 z-20 md:right-6 md:top-6">
                  <img src="/brand/nivora-mark.webp" alt="" className="h-8 w-8 object-contain md:h-9 md:w-9" />
                </div>
              )}

              {done ? (
                /* SUCCESS — replaces the right panel */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-1 flex-col"
                >
                  <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8 text-center md:px-14">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5"
                    >
                      <Check size={24} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                    <h2 className="mb-1.5 text-xl font-semibold text-white">{already ? t.doneAlready : t.doneNew}</h2>
                    <p className="mb-8 max-w-xs text-xs text-neutral-500">
                      {already ? (
                        t.bodyAlready(thing)
                      ) : emailSent ? (
                        <>
                          {t.bodyEmailPre}
                          <span className="text-neutral-300">{email.trim()}</span>
                          {t.bodyEmailPost}
                        </>
                      ) : (
                        t.bodyThanks(name.trim().split(' ')[0], thing)
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-center border-t border-white/5 px-8 pb-6 pt-4 md:px-14">
                    <img src="/brand/nivora-logo.png" alt="Nivora" className="h-6 opacity-30" />
                  </div>
                </motion.div>
              ) : (
                /* WAITLIST FORM — one step per screen */
                <div className="flex min-h-0 flex-1 flex-col">
                  {/* Header */}
                  <div className="shrink-0 px-8 pb-6 pt-8 md:px-14 md:pt-14">
                    <div className="mb-8 flex justify-center md:hidden">
                      <img src="/brand/nivora-logo.png" alt="Nivora" className="h-6 w-auto object-contain opacity-80" />
                    </div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">{t.eyebrow}</p>
                    <h2 className="text-[28px] font-medium leading-tight tracking-tight text-white md:text-3xl">{heading}</h2>
                  </div>

                  {/* Body — only the active step */}
                  <div className="min-h-0 flex-1 overflow-y-auto px-8 [scrollbar-width:none] md:px-14 [&::-webkit-scrollbar]:hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="pb-10 pt-1"
                      >
                        {step === 'name' ? (
                          <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                              <User size={14} className="text-neutral-500" />
                              {t.nameLabel}
                            </label>
                            <div className="relative">
                              <input
                                ref={inputRef}
                                autoFocus
                                type="text"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value)
                                  if (error) setError('')
                                }}
                                onKeyDown={keyGo(nameNext)}
                                placeholder={t.namePh}
                                autoComplete="name"
                                className="w-full rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3.5 text-[15px] text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                              <button
                                type="button"
                                onClick={nameNext}
                                aria-label={t.nameLabel}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20 ${name.trim().length > 1 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                              >
                                <ArrowRight size={16} />
                              </button>
                            </div>
                            {error && <p className="pl-1 text-xs text-red-400">{error}</p>}
                            <p className="pl-1 text-[10px] text-neutral-600">{t.nameHint}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                              <Mail size={14} className="text-neutral-500" />
                              {t.emailLabel}
                            </label>
                            <div className="relative">
                              <input
                                ref={inputRef}
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value)
                                  if (error) setError('')
                                }}
                                onKeyDown={keyGo(emailNext)}
                                placeholder={t.emailPh}
                                autoComplete="email"
                                className="w-full rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3.5 text-[15px] text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                              <button
                                type="button"
                                onClick={emailNext}
                                disabled={loading}
                                aria-label={t.emailLabel}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20 ${email.trim().length > 5 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                              >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                              </button>
                            </div>
                            {error && <p className="pl-1 text-xs text-red-400">{error}</p>}
                            <p className="pl-1 text-[10px] text-neutral-600">{t.emailHint}</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer — social icons, like the booking page */}
                  <div className="flex shrink-0 items-center justify-center border-t border-white/5 px-8 py-4 md:justify-end md:px-14">
                    <div className="flex items-center gap-4">
                      {SOCIALS.map(({ href, Icon, label }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-neutral-300 shadow-lg transition-all duration-300 hover:bg-white hover:text-black"
                        >
                          <Icon size={22} strokeWidth={1.6} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] font-light uppercase tracking-[0.2em] opacity-20">
          <p>{t.caption}</p>
        </div>
      </main>
    </div>
  )
}
