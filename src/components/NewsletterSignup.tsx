import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { subscribe } from '@/lib/newsletter'
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
  const [submitting, setSubmitting] = useState(false)

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
    setDone(true)
  }

  return (
    <section className={cn('relative mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-20', className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] px-6 py-12 sm:px-12 sm:py-14">
          {/* Soft olive glow, matching the site's accent backdrops */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-olive/10 blur-[110px]"
          />

          <div className="relative grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div className="max-w-md">
              <span className="label-mono mb-4 block text-dim">Newsletter</span>
              <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[34px]">
                Notes from what we're building
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-faint">
                A short email when we ship something worth your time, new tools,
                the thinking behind them, and what we are learning. No noise, and
                you can unsubscribe in one click.
              </p>
            </div>

            {/* Form / success */}
            <div className="w-full lg:max-w-[420px] lg:justify-self-end">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-olive/30 bg-olive/15 text-olive shadow-[0_0_24px_rgba(150,167,102,0.35)]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
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
                    <div>
                      <h3 className="font-serif text-[20px] tracking-[-0.01em] text-ink">
                        {already ? "You're already in" : 'Check your inbox'}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-faint">
                        {already ? (
                          <>
                            We already have <span className="text-ink-soft">{email.trim()}</span>. You are on
                            the list, you will hear from us.
                          </>
                        ) : (
                          <>
                            We sent a confirmation link to{' '}
                            <span className="text-ink-soft">{email.trim()}</span>. Click it once and you are
                            in, first to know what we ship next.
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    noValidate
                    className="w-full"
                  >
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
                        className="h-12 flex-1 rounded-[14px] border border-line bg-white/[0.03] px-4 text-[14px] text-ink placeholder:text-dim outline-none transition-colors focus:border-line-strong"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            Joining
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          </>
                        ) : (
                          <>
                            Keep me posted
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                          </>
                        )}
                      </button>
                    </div>
                    {error ? (
                      <span className="mt-2 block px-1 text-[12.5px] text-terracotta">{error}</span>
                    ) : (
                      <span className="mt-2.5 block px-1 text-[12px] text-dim">
                        No spam. Unsubscribe anytime.
                      </span>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
