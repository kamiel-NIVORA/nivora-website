import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { subscribe } from '@/lib/newsletter'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setSubmitting(true)
    const res = await subscribe({ email, source: `newsletter:${source}` })
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? 'Something went wrong. Please try again.')
      return
    }
    setAlready(res.status === 'already_subscribed')
    setEmailSent(res.emailSent === true)
    setDone(true)
  }

  return (
    <section className={cn('relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-20', className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.012] px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
          {/* Centered aurora + two softly breathing accent glows for some life */}
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
                    className="grid h-14 w-14 place-items-center rounded-full border border-olive/30 bg-olive/15 text-olive shadow-[0_0_30px_rgba(150,167,102,0.4)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
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
                    {already ? "You're already in" : emailSent ? 'Check your inbox' : "You're on the list"}
                  </h2>
                  <p className="mx-auto mt-3.5 max-w-md text-[15px] leading-relaxed text-faint">
                    {already ? (
                      <>
                        We already have <span className="text-ink-soft">{email.trim()}</span>. You are on the
                        list, nothing more to do.
                      </>
                    ) : emailSent ? (
                      <>
                        We sent a confirmation link to{' '}
                        <span className="text-ink-soft">{email.trim()}</span>. Click it once and you are in.
                      </>
                    ) : (
                      <>
                        Thanks, <span className="text-ink-soft">{email.trim()}</span> is in. We will be in
                        touch when we ship something worth it.
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
                  <motion.span
                    aria-hidden
                    className="inline-flex text-ink drop-shadow-[0_0_22px_rgba(255,255,255,0.22)]"
                    animate={reduced ? undefined : { y: [0, -3, 0] }}
                    transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Mail className="h-8 w-8" strokeWidth={1.5} />
                  </motion.span>

                  <h2 className="mt-5 max-w-md font-serif text-[32px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">
                    Never miss what AI can do
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-faint sm:text-[16px]">
                    The tools we ship, the hours they save, and where AI is genuinely worth it
                    for your business. Quietly useful, never a sales pitch.
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
                        aria-label="Email address"
                        className="h-12 w-full flex-1 rounded-full border border-line bg-white/[0.03] px-5 text-center text-[14px] text-ink outline-none transition-colors duration-300 placeholder:text-dim focus:border-line-strong sm:text-left"
                      />
                      <RippleButton
                        type="submit"
                        variant="solid"
                        disabled={submitting}
                        className="h-12 shrink-0 px-6 text-[14px]"
                      >
                        {submitting ? 'Joining' : 'Keep me posted'}
                      </RippleButton>
                    </div>
                    {error ? (
                      <span className="mt-2.5 block text-[12.5px] text-terracotta">{error}</span>
                    ) : (
                      <span className="mt-3.5 block text-[12px] text-dim">
                        One short email, now and then. No spam, unsubscribe anytime.
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
