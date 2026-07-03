import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { subscribe } from '@/lib/newsletter'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { useLang } from '@/i18n'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COPY = {
  en: {
    invalidEmail: 'Please enter a valid email address.',
    genericError: 'Something went wrong. Please try again.',
    titleAlready: "You're already in",
    titleSent: 'Check your inbox',
    titleList: "You're on the list",
    alreadyPre: 'We already have ',
    alreadyPost: '. You are on the list, nothing more to do.',
    sentPre: 'We sent a confirmation link to ',
    sentPost: '. Click it once and you are in.',
    listPre: 'From now on, ',
    listPost: ' never misses what matters in AI. We send the signal, never the noise.',
    formTitle: 'Stop worrying about AI',
    formBody:
      'We weigh up what AI can genuinely do for a business like yours, cut through the noise, and keep you posted on what actually matters. You stay in the loop, without the hype.',
    emailAria: 'Email address',
    joining: 'Joining',
    submit: 'Keep me posted',
    note: 'One short email, now and then. No spam, unsubscribe anytime.',
  },
  nl: {
    invalidEmail: 'Voer een geldig e-mailadres in.',
    genericError: 'Er ging iets mis. Probeer het opnieuw.',
    titleAlready: 'U bent al ingeschreven',
    titleSent: 'Controleer uw inbox',
    titleList: 'U staat op de lijst',
    alreadyPre: 'We hebben ',
    alreadyPost: ' al. U staat op de lijst, meer hoeft u niet te doen.',
    sentPre: 'We stuurden een bevestigingslink naar ',
    sentPost: '. Klik er één keer op en u bent erbij.',
    listPre: 'Vanaf nu mist ',
    listPost: ' nooit meer wat telt in AI. We sturen het signaal, nooit de ruis.',
    formTitle: 'Maak u geen zorgen meer over AI',
    formBody:
      'We wegen af wat AI echt kan doen voor een bedrijf zoals het uwe, filteren de ruis eruit, en houden u op de hoogte van wat echt telt. U blijft mee, zonder de hype.',
    emailAria: 'E-mailadres',
    joining: 'Bezig',
    submit: 'Houd me op de hoogte',
    note: 'Eén korte e-mail, af en toe. Geen spam, uitschrijven kan altijd.',
  },
} as const

type Props = {
  /** Where this band lives (home, blog-index, blog-post). Tags the lead so its
   *  origin is visible in the Nivora AIOS. */
  source?: string
  className?: string
}

/**
 * Newsletter signup band. Posts to the Nivora backend (double opt-in), so a new
 * pending subscriber lands in the AIOS the moment someone submits. On success it
 * plays a check animation and, honestly, points them to the confirmation mail.
 */
export function NewsletterSignup({ source = 'home', className }: Props) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const reduced = usePrefersReducedMotion()
  const { lang } = useLang()
  const t = COPY[lang]

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError(t.invalidEmail)
      return
    }
    setError(null)
    setSubmitting(true)
    const res = await subscribe({ email, source: `newsletter:${source}`, lang })
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? t.genericError)
      return
    }
    setAlready(res.status === 'already_subscribed')
    setEmailSent(res.emailSent === true)
    setDone(true)
  }

  return (
    <section className={cn('relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-20', className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-[#0a0a0a] px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
          {/* Dithered texture background, kept dark so the copy stays crisp */}
          <img
            src="/newsletter-bg.gif"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.38]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/60" />
          {/* Two softly breathing accent glows for some life */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[340px] w-[680px] max-w-full rounded-full bg-olive/[0.07] blur-[130px]"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-olive/10 blur-[130px]"
            animate={reduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.45, 0.9, 0.45] }}
            transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-steel/10 blur-[130px]"
            animate={reduced ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
            transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />

          <div className="relative mx-auto flex min-h-[320px] max-w-[560px] flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
                    className="relative grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/[0.07] text-white shadow-[0_0_30px_rgba(255,255,255,0.18)] backdrop-blur-sm"
                  >
                    {/* One-shot white ring that expands and fades on success */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-white/40"
                      initial={{ scale: 0.85, opacity: 0.7 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                    />
                    <svg viewBox="0 0 24 24" fill="none" className="relative h-6 w-6" aria-hidden>
                      <motion.path
                        d="M5 12.5l4.2 4.2L19 7"
                        stroke="currentColor"
                        strokeWidth={2.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.18 }}
                      />
                    </svg>
                  </motion.span>
                  <h2 className="mt-7 font-serif text-[28px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[34px]">
                    {already ? t.titleAlready : emailSent ? t.titleSent : t.titleList}
                  </h2>
                  <p className="mx-auto mt-3.5 max-w-md text-[15px] leading-relaxed text-faint">
                    {already ? (
                      <>
                        {t.alreadyPre}
                        <span className="text-ink-soft">{email.trim()}</span>
                        {t.alreadyPost}
                      </>
                    ) : emailSent ? (
                      <>
                        {t.sentPre}
                        <span className="text-ink-soft">{email.trim()}</span>
                        {t.sentPost}
                      </>
                    ) : (
                      <>
                        {t.listPre}
                        <span className="text-ink-soft">{email.trim()}</span>
                        {t.listPost}
                      </>
                    )}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <h2 className="max-w-md font-serif text-[32px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">
                    {t.formTitle}
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-faint sm:text-[16px]">
                    {t.formBody}
                  </p>

                  <form onSubmit={onSubmit} noValidate className="mt-9 w-full max-w-[480px]">
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder="you@company.com"
                        aria-invalid={!!error}
                        aria-label={t.emailAria}
                        // Same height as the "Keep me posted" button below it (h-14 on
                        // mobile). NOTE: flex-1 only at sm+ — in the mobile flex-col the
                        // vertical flex-basis:0 of flex-1 collapsed the field, ignoring h-*.
                        className="h-14 w-full rounded-full border border-line-strong bg-white/[0.07] px-5 text-center text-[16px] text-ink outline-none transition-colors duration-300 placeholder:text-dim focus:border-line-strong sm:h-12 sm:flex-1 sm:border-line sm:bg-white/[0.03] sm:text-left sm:text-[14px]"
                      />
                      <RippleButton
                        type="submit"
                        variant="solid"
                        disabled={submitting}
                        className="h-14 shrink-0 px-6 text-[15px] sm:h-12 sm:text-[14px]"
                      >
                        {submitting ? t.joining : t.submit}
                      </RippleButton>
                    </div>
                    {error ? (
                      <span className="mt-2.5 block text-[12.5px] text-terracotta">{error}</span>
                    ) : (
                      <span className="mt-3.5 block text-[12px] text-dim">
                        {t.note}
                      </span>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
