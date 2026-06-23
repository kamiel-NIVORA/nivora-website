import { Link, useSearchParams } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

/** Landing page the backend redirects to after an unsubscribe click. */
export function Unsubscribed() {
  const [params] = useSearchParams()
  const ok = (params.get('status') ?? 'ok') !== 'invalid'

  return (
    <main>
      <section className="relative mx-auto flex w-full max-w-[640px] flex-col items-center px-6 pb-28 pt-40 text-center lg:pt-48">
        <Reveal mode="mount">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white/[0.04] text-faint">
            <Check className="h-6 w-6" strokeWidth={2} />
          </span>
          <h1 className="mt-7 font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px]">
            {ok ? 'You are unsubscribed' : 'Already handled'}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-faint sm:text-[16px]">
            {ok
              ? 'You will no longer receive emails from Nivora. No hard feelings. You can rejoin any time.'
              : 'We could not find that subscription, so there is nothing more to do.'}
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-1.5 text-[13px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            Back to home
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
