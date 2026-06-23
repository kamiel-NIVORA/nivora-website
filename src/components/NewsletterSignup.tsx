import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { subscribeEmail } from '@/lib/newsletter'

/** Smart, on-voice newsletter signup. Not "subscribe to our newsletter" — it
 *  promises a reason: stay close to where AI (and Nivora) is going. */
export function NewsletterSignup({ source = 'website' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const v = email.trim()
    if (!v || !v.includes('@') || !v.includes('.')) {
      setState('error')
      setMsg('That email looks off, mind checking it?')
      return
    }
    setState('loading')
    const res = await subscribeEmail(v, source)
    if (res.ok) {
      setState('ok')
      setMsg(res.already ? "You're already on the list. Talk soon." : "You're in. We'll keep it worth your inbox.")
    } else {
      setState('error')
      setMsg('Something went wrong on our side. Try again in a moment.')
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_-10%,rgba(255,255,255,0.08),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <h3 className="font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink sm:text-[32px]">
          Stay ahead of where AI is going
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-faint">
          A short note now and then: what we ship, what we learn, and where local AI is really heading. No noise, and you can leave anytime.
        </p>

        {state === 'ok' ? (
          <p className="mt-7 text-[15px] font-medium text-ink">{msg}</p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-7 flex w-full max-w-md flex-col items-center gap-2.5 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-11 w-full rounded-full border border-line bg-white/[0.04] px-5 text-[14px] text-ink placeholder:text-dim focus:border-line-strong focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-white/90 disabled:opacity-60"
            >
              {state === 'loading' ? 'Adding you…' : 'Keep me posted'}
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </form>
        )}

        {state === 'error' && <p className="mt-3 text-[13px] text-faint">{msg}</p>}
      </div>
    </div>
  )
}
