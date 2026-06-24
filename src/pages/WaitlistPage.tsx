import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { subscribe } from '@/lib/newsletter'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = {
  box: 'Box',
  voice: 'Voice',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+0-9][0-9\s().-]{6,}$/

export function WaitlistPage() {
  const [params] = useSearchParams()
  const productSlug = (params.get('product') ?? '').toLowerCase()
  const product = PRODUCT_LABELS[productSlug]
  const thing = product ?? 'Box and Voice'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const title = product ? `Be first to use ${product}` : 'Get notified at launch'
  const subtitle = product
    ? `${product} is almost ready. Leave your details and we'll ping you the moment it goes live, nothing else.`
    : "Box and Voice are almost here. Leave your details and we'll ping you the moment they go live, nothing else."

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()

    if (!name.trim()) {
      setError('Please add your name.')
      return
    }
    if (!trimmedEmail && !trimmedPhone) {
      setError('Add an email or a phone number so we can reach you.')
      return
    }
    if (trimmedEmail && !EMAIL_RE.test(trimmedEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!trimmedEmail && trimmedPhone && !PHONE_RE.test(trimmedPhone)) {
      setError('Please enter a valid phone number.')
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
      setError(res.error ?? 'Something went wrong. Please try again.')
      return
    }
    setAlready(res.status === 'already_subscribed')
    setEmailSent(res.emailSent === true)
    setDone(true)
  }

  return (
    <main>
      <section className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center">
        {/* ── Background: monochrome waves glowing through the lower half ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/bg-waves.webp"
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
              {thing}, coming soon
            </span>
          </Reveal>

          <Reveal mode="mount" delay={0.05}>
            <h1 className="mt-6 bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-serif text-[36px] leading-[1.08] tracking-[-0.02em] text-transparent sm:text-[52px]">
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
                        {already ? "You're already on the list" : "You're on the list"}
                      </h2>
                      <p className="mt-2.5 max-w-xs text-[14px] leading-relaxed text-faint">
                        {already ? (
                          <>We already have you down. We'll let you know the moment {thing} drops.</>
                        ) : emailSent ? (
                          <>
                            Check <span className="text-ink-soft">{email.trim()}</span> for a confirmation
                            link, click it once and you are set.
                          </>
                        ) : (
                          <>Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}. We'll reach out the
                            second {thing} goes live.</>
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
                        placeholder="Your name"
                        autoComplete="name"
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={!!error}
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          if (error) setError(null)
                        }}
                        placeholder="Phone (optional)"
                        autoComplete="tel"
                        className="h-12 rounded-[14px] border border-line bg-white/[0.04] px-4 text-[14px] text-ink outline-none transition-colors placeholder:text-dim focus:border-line-strong"
                      />
                      {error && <span className="px-1 text-[12.5px] text-terracotta">{error}</span>}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group mt-1.5 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            One sec
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          </>
                        ) : (
                          <>
                            Get notified
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                          </>
                        )}
                      </button>
                      <p className="mt-1.5 text-center text-[12px] text-dim">
                        One message the day it drops. No spam, ever.
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
