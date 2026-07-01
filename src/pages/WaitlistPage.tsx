import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { subscribe } from '@/lib/newsletter'
import { SOCIAL_LINKS } from '@/data/contact'
import { useLang } from '@/i18n'
import { useSeo } from '@/lib/seo'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = { box: 'Box', voice: 'Voice' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COPY = {
  en: {
    thingGeneric: 'Box and Voice',
    thingAffiliate: 'the affiliate program',
    titleGeneric: 'Be first with Box and Voice.',
    titleAffiliate: 'Be first for the affiliate deals.',
    titleProduct: (p: string) => `Be first with ${p}.`,
    subtitle: "Leave your details and we'll reach out the moment they go live. Nothing else.",
    subtitleAffiliate:
      'Leave your details and tell us briefly why you want to become an affiliate of Box and Voice. We reach out the moment the program opens.',
    namePh: 'First + last name',
    nameHint: "We'll only reach out when they go live.",
    nameHintAffiliate: "We'll only reach out when the program opens.",
    emailPh: 'you@company.com',
    emailHint: 'One message at launch. No newsletters.',
    emailHintAffiliate: 'One message when the program opens. No newsletters.',
    visionPh: 'Why do you want to become an affiliate of Box and Voice?',
    visionHint: 'A few sentences is enough. It helps us tailor the program to you.',
    visionSubmit: 'Sign up as affiliate',
    errName: 'Please enter your full name.',
    errEmail: 'Please enter a valid email address.',
    errVision: 'Please tell us briefly why you want to become an affiliate.',
    errGeneric: 'Something went wrong. Please try again.',
    doneNew: "You're on the list",
    doneAlready: "You're already on the list",
    bodyThanks: (fn: string, thing: string) => `Thanks${fn ? `, ${fn}` : ''}. We'll reach out the second ${thing} goes live.`,
    bodyAlready: (thing: string) => `We already have you down. We'll let you know the moment ${thing} drops.`,
    bodyEmailPre: 'Check ',
    bodyEmailPost: ' for a confirmation link, click it once and you are set.',
    caption: 'Nivora',
  },
  nl: {
    thingGeneric: 'Box en Voice',
    thingAffiliate: 'het affiliate programma',
    titleGeneric: 'Wees de eerste met Box en Voice.',
    titleAffiliate: 'Wees de eerste voor de affiliate deals.',
    titleProduct: (p: string) => `Wees de eerste met ${p}.`,
    subtitle: 'Laat uw gegevens achter en we laten van ons horen zodra ze live gaan. Niets anders.',
    subtitleAffiliate:
      'Laat uw gegevens achter en vertel kort waarom u affiliate wilt worden van Box en Voice. We nemen contact op zodra het programma opent.',
    namePh: 'Voornaam + achternaam',
    nameHint: 'We laten van ons horen zodra ze live gaan.',
    nameHintAffiliate: 'We laten van ons horen zodra het programma opent.',
    emailPh: 'naam@bedrijf.be',
    emailHint: 'Eén bericht bij de lancering. Geen nieuwsbrieven.',
    emailHintAffiliate: 'Eén bericht zodra het programma opent. Geen nieuwsbrieven.',
    visionPh: 'Waarom wilt u affiliate worden van Box en Voice?',
    visionHint: 'Een paar zinnen is genoeg. Zo kunnen we het programma op u afstemmen.',
    visionSubmit: 'Meld u aan als affiliate',
    errName: 'Vul alsjeblieft uw volledige naam in.',
    errEmail: 'Vul alsjeblieft een geldig e-mailadres in.',
    errVision: 'Vertel kort waarom u affiliate wilt worden.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
    doneNew: 'U staat op de lijst',
    doneAlready: 'U staat al op de lijst',
    bodyThanks: (fn: string, thing: string) => `Bedankt${fn ? `, ${fn}` : ''}. We nemen contact op zodra ${thing} live gaat.`,
    bodyAlready: (thing: string) => `We hebben u al genoteerd. We laten van ons horen zodra ${thing} er is.`,
    bodyEmailPre: 'Controleer ',
    bodyEmailPost: ' voor een bevestigingslink, klik er één keer op en u bent klaar.',
    caption: 'Nivora',
  },
} as const

export function WaitlistPage() {
  const { lang } = useLang()
  const t = COPY[lang]
  const [params] = useSearchParams()
  const productSlug = (params.get('product') ?? '').toLowerCase()
  const product = PRODUCT_LABELS[productSlug]
  // Affiliate flow: same card, one extra step. The signup asks WHY you want to
  // become an affiliate (the vision) and is stored as an affiliate signup in
  // the Nivora system, separate from the app (user) waitlist.
  const isAffiliate = productSlug === 'affiliate'
  const thing = isAffiliate ? t.thingAffiliate : (product ?? t.thingGeneric)
  const heading = isAffiliate ? t.titleAffiliate : product ? t.titleProduct(product) : t.titleGeneric
  const subtitle = isAffiliate ? t.subtitleAffiliate : t.subtitle
  // Top icon: the product's own app tile on a product page, else the Nivora mark.
  const brandIcon =
    productSlug === 'box'
      ? '/products/box-logo.webp'
      : productSlug === 'voice'
        ? '/products/voice-logo.webp'
        : '/brand/nivora-mark.webp'

  const [step, setStep] = useState<'name' | 'email' | 'vision'>('name')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [vision, setVision] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const visionRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    visionRef.current?.focus()
  }, [step])

  useSeo({
    title: isAffiliate
      ? lang === 'nl'
        ? 'Affiliate wachtlijst · Nivora'
        : 'Affiliate waitlist · Nivora'
      : lang === 'nl'
        ? 'Wachtlijst · Nivora'
        : 'Waitlist · Nivora',
    description: isAffiliate
      ? lang === 'nl'
        ? 'Schrijf u in voor het Nivora affiliate programma en wees er als eerste bij wanneer de deals live gaan.'
        : 'Sign up for the Nivora affiliate program and be first in line when the deals go live.'
      : lang === 'nl'
        ? 'Zet uzelf op de wachtlijst voor Box en Voice, de Nivora-apps, en hoor het meteen wanneer ze live gaan.'
        : 'Join the waitlist for Box and Voice, the Nivora apps, and hear the moment they go live.',
    path: '/waitlist',
  })

  // Progress for the border-glow animation (0 → 1), like the booking card.
  // The affiliate flow has one step more, so it fills in quarters.
  const progress = done
    ? 1.05
    : isAffiliate
      ? step === 'name'
        ? 0.25
        : step === 'email'
          ? 0.5
          : 0.75
      : step === 'name'
        ? 1 / 3
        : 2 / 3

  async function submitAll() {
    setLoading(true)
    setError('')
    const res = await subscribe({
      email: email.trim(),
      name: name.trim(),
      vision: isAffiliate ? vision.trim() : undefined,
      product: productSlug || undefined,
      source: productSlug ? `waitlist:${productSlug}` : 'waitlist',
      lang,
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
    setError('')
    if (isAffiliate) {
      setStep('vision')
      return
    }
    void submitAll()
  }
  function visionNext() {
    if (loading) return
    if (vision.trim().length < 10) return setError(t.errVision)
    void submitAll()
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

      <main className="relative z-10 w-full max-w-2xl">
        <div className="relative min-h-[520px] w-full md:h-[560px]">
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

          {/* MAIN CARD — single centered column */}
          <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-2xl">
            {done ? (
              /* SUCCESS */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-1 flex-col items-center justify-center px-8 py-14 text-center md:px-14"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5"
                >
                  <Check size={24} className="text-white" strokeWidth={2.5} />
                </motion.div>
                <h2 className="mb-2 font-serif text-2xl text-white md:text-[28px]">{already ? t.doneAlready : t.doneNew}</h2>
                <p className="max-w-sm text-sm text-neutral-400">
                  {already ? (
                    t.bodyAlready(thing)
                  ) : emailSent ? (
                    <>
                      {t.bodyEmailPre}
                      <span className="text-neutral-200">{email.trim()}</span>
                      {t.bodyEmailPost}
                    </>
                  ) : (
                    t.bodyThanks(name.trim().split(' ')[0], thing)
                  )}
                </p>
              </motion.div>
            ) : (
              /* WAITLIST FORM — centered single column */
              <>
                <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center md:px-14">
                  <img
                    src={brandIcon}
                    alt={product ?? 'Nivora'}
                    className={product ? 'mb-8 h-20 w-20 object-contain md:h-24 md:w-24' : 'mb-8 h-9 w-auto object-contain opacity-90'}
                  />
                  <h2 className="max-w-lg font-serif text-[32px] leading-[1.08] tracking-tight text-white md:text-[40px]">{heading}</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">{subtitle}</p>

                  <div className="mt-8 w-full max-w-md">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {step === 'vision' ? (
                          /* Affiliate only: the vision. A real textarea with its
                             own submit button, so people can take a few lines. */
                          <div>
                            <textarea
                              ref={visionRef}
                              autoFocus
                              value={vision}
                              rows={4}
                              onChange={(e) => {
                                setVision(e.target.value)
                                if (error) setError('')
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault()
                                  visionNext()
                                }
                              }}
                              placeholder={t.visionPh}
                              className="w-full resize-none rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3.5 text-left text-base text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                            />
                            <button
                              type="button"
                              onClick={visionNext}
                              disabled={loading}
                              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-medium text-black transition-all hover:bg-neutral-200 disabled:opacity-60"
                            >
                              {loading ? <Loader2 size={16} className="animate-spin" /> : t.visionSubmit}
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            {step === 'name' ? (
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
                                className="w-full rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3.5 text-center text-base text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                            ) : (
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
                                className="w-full rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3.5 text-center text-base text-white placeholder-neutral-600 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
                              />
                            )}
                            <button
                              type="button"
                              onClick={step === 'name' ? nameNext : emailNext}
                              disabled={loading}
                              aria-label={step === 'name' ? t.namePh : t.emailPh}
                              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white/20"
                            >
                              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                            </button>
                          </div>
                        )}
                        {error ? (
                          <p className="mt-3 text-xs text-red-400">{error}</p>
                        ) : (
                          <p className="mt-3 text-[12px] text-neutral-500">
                            {step === 'name'
                              ? isAffiliate
                                ? t.nameHintAffiliate
                                : t.nameHint
                              : step === 'email'
                                ? isAffiliate
                                  ? t.emailHintAffiliate
                                  : t.emailHint
                                : t.visionHint}
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer — plain social icons, centered, like the site footer */}
                <div className="flex shrink-0 items-center justify-center gap-5 py-5">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="-m-2.5 grid h-11 w-11 place-items-center text-white/40 transition-colors hover:text-white/80"
                    >
                      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] font-light uppercase tracking-[0.2em] opacity-20">
          <p>{t.caption}</p>
        </div>
      </main>
    </div>
  )
}
