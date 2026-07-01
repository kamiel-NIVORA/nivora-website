import { Link, useSearchParams } from 'react-router-dom'
import { Check, X, ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { useLang } from '@/i18n'
import { useSeo } from '@/lib/seo'

const COPY = {
  en: {
    titleOk: "You're confirmed",
    titleExpired: 'Link expired',
    bodyOk: 'Thanks for confirming. You will hear from us when we have something worth sharing about what we are building.',
    bodyExpired: 'That confirmation link is no longer valid. Try signing up again and we will send a fresh one.',
    backHome: 'Back to home',
    signUpAgain: 'Sign up again',
  },
  nl: {
    titleOk: 'U bent bevestigd',
    titleExpired: 'Link verlopen',
    bodyOk: 'Bedankt voor uw bevestiging. U hoort van ons zodra we iets hebben dat het delen waard is over wat we bouwen.',
    bodyExpired: 'Die bevestigingslink is niet meer geldig. Schrijf u opnieuw in, dan sturen we een nieuwe.',
    backHome: 'Terug naar home',
    signUpAgain: 'Schrijf u opnieuw in',
  },
} as const

/** Landing page the backend redirects to after a double opt-in confirm click. */
export function NewsletterConfirmed() {
  const [params] = useSearchParams()
  const ok = (params.get('status') ?? 'ok') !== 'invalid'
  const { lang } = useLang()
  const t = COPY[lang]
  useSeo({ title: `${t.titleOk} · Nivora`, noindex: true })

  return (
    <main>
      <section className="relative mx-auto flex w-full max-w-[640px] flex-col items-center px-6 pb-28 pt-40 text-center lg:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-28 -z-10 mx-auto h-[280px] w-[280px] rounded-full bg-olive/10 blur-[120px] sm:h-[360px] sm:w-[360px]"
        />
        <Reveal mode="mount">
          <span
            className={
              ok
                ? 'grid h-14 w-14 place-items-center rounded-full border border-olive/30 bg-olive/15 text-olive shadow-[0_0_24px_rgba(150,167,102,0.35)]'
                : 'grid h-14 w-14 place-items-center rounded-full border border-line bg-white/[0.04] text-faint'
            }
          >
            {ok ? <Check className="h-6 w-6" strokeWidth={2.2} /> : <X className="h-6 w-6" strokeWidth={2} />}
          </span>
          <h1 className="mt-7 font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px]">
            {ok ? t.titleOk : t.titleExpired}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted sm:text-faint">
            {ok ? t.bodyOk : t.bodyExpired}
          </p>
          <Link
            to={ok ? '/' : '/waitlist'}
            className="mt-8 -mx-3 inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2.5 text-sm text-faint transition-colors hover:text-ink active:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            {ok ? t.backHome : t.signUpAgain}
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
