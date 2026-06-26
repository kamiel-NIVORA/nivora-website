import { Link, useSearchParams } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { useLang } from '@/i18n'

const COPY = {
  en: {
    titleOk: 'You are unsubscribed',
    titleHandled: 'Already handled',
    bodyOk: 'You will no longer receive emails from Nivora. No hard feelings. You can rejoin any time.',
    bodyHandled: 'We could not find that subscription, so there is nothing more to do.',
    backHome: 'Back to home',
  },
  nl: {
    titleOk: 'U bent uitgeschreven',
    titleHandled: 'Al geregeld',
    bodyOk: 'U krijgt geen e-mails meer van Nivora. Geen probleem, u kunt zich altijd opnieuw inschrijven.',
    bodyHandled: 'We konden die inschrijving niet vinden, dus er is niets meer te doen.',
    backHome: 'Terug naar home',
  },
} as const

/** Landing page the backend redirects to after an unsubscribe click. */
export function Unsubscribed() {
  const [params] = useSearchParams()
  const ok = (params.get('status') ?? 'ok') !== 'invalid'
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <main>
      <section className="relative mx-auto flex w-full max-w-[640px] flex-col items-center px-6 pb-28 pt-40 text-center lg:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-28 -z-10 mx-auto h-[280px] w-[280px] rounded-full bg-olive/10 blur-[120px] sm:h-[360px] sm:w-[360px]"
        />
        <Reveal mode="mount">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white/[0.04] text-faint">
            <Check className="h-6 w-6" strokeWidth={2} />
          </span>
          <h1 className="mt-7 font-serif text-[30px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px]">
            {ok ? t.titleOk : t.titleHandled}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted sm:text-faint">
            {ok ? t.bodyOk : t.bodyHandled}
          </p>
          <Link
            to="/"
            className="mt-8 -mx-3 inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2.5 text-sm text-faint transition-colors hover:text-ink active:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            {t.backHome}
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
