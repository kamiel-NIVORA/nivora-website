import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { subscribe } from '@/lib/newsletter'

/** Map the ?product= query to a friendly label. */
const PRODUCT_LABELS: Record<string, string> = {
  box: 'Box',
  voice: 'Voice',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistPage() {
  const [params] = useSearchParams()
  const productSlug = (params.get('product') ?? '').toLowerCase()
  const product = PRODUCT_LABELS[productSlug]

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [already, setAlready] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const title = product ? `Be first to use ${product}` : 'Join the waiting list'
  const subtitle = product
    ? `${product} is almost ready. Leave your email and we'll let you know the moment it goes live, with early access before anyone else.`
    : "Our tools are almost ready. Leave your email and we'll let you know the moment they go live, with early access before anyone else."

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setSubmitting(true)
    const res = await subscribe({ email, name, product: productSlug || undefined })
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? 'Something went wrong. Please try again.')
      return
    }
    setAlready(res.status === 'already_subscribed')
    setDone(true)
  }

  return (
    <main>
      <section className="relative mx-auto flex w-full max-w-[760px] flex-col items-center px-6 pb-28 pt-36 text-center lg:pb-32 lg:pt-44">
        {/* Soft glow behind the panel */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[420px] w-[420px] rounded-full bg-olive/10 blur-[120px]" />

        <Reveal mode="mount">
          <Link
            to="/#products"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            Back to products
          </Link>
        </Reveal>

        <Reveal mode="mount">
          <span className="label-mono mb-4 block text-dim">Early access</span>
          <h1 className="font-serif text-[34px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[44px]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-faint sm:text-[16px]">
            {subtitle}
          </p>
        </Reveal>

        {/* Form / success panel */}
        <Reveal mode="mount" delay={0.08} className="mt-10 w-full max-w-[440px]">
          <div className="rounded-[24px] border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-md sm:p-7">
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
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-olive/30 bg-olive/15 text-olive shadow-[0_0_24px_rgba(150,167,102,0.35)]">
                    <Check className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h2 className="mt-5 font-serif text-[22px] tracking-[-0.01em] text-ink">
                    {already ? "You're already on the list" : 'Almost there'}
                  </h2>
                  <p className="mt-2.5 max-w-xs text-[14px] leading-relaxed text-faint">
                    {already ? (
                      <>
                        We already have <span className="text-ink-soft">{email.trim()}</span>. You are all set.
                      </>
                    ) : (
                      <>
                        We sent a confirmation link to <span className="text-ink-soft">{email.trim()}</span>. Click
                        it to confirm and you are on the list.
                      </>
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
                  className="flex flex-col gap-3 text-left"
                  noValidate
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="h-12 rounded-[14px] border border-line bg-white/[0.03] px-4 text-[14px] text-ink placeholder:text-dim outline-none transition-colors focus:border-line-strong"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="you@company.com"
                    aria-invalid={!!error}
                    className="h-12 rounded-[14px] border border-line bg-white/[0.03] px-4 text-[14px] text-ink placeholder:text-dim outline-none transition-colors focus:border-line-strong"
                  />
                  {error && <span className="px-1 text-[12.5px] text-terracotta">{error}</span>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        Joining
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                      </>
                    ) : (
                      <>
                        Join the waiting list
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.8}
                        />
                      </>
                    )}
                  </button>
                  <p className="mt-1 text-center text-[12px] text-dim">
                    No spam. One email when we launch.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
