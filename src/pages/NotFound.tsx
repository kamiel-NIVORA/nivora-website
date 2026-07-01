import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { useLang } from '@/i18n'
import { useSeo } from '@/lib/seo'

const COPY = {
  en: {
    label: '404',
    title: 'This page does not exist',
    body: 'The link you followed leads nowhere. It may have moved, or it never existed. The homepage has everything, so start there.',
    backHome: 'Back to home',
  },
  nl: {
    label: '404',
    title: 'Deze pagina bestaat niet',
    body: 'De link die u volgde leidt nergens heen. Misschien is de pagina verhuisd, of heeft ze nooit bestaan. Op de homepagina vindt u alles terug.',
    backHome: 'Terug naar home',
  },
} as const

/** Real 404 page, so unknown URLs never silently render the homepage. Marked
 *  noindex: Google treats it as a proper "not found" instead of duplicate content. */
export function NotFound() {
  const { lang } = useLang()
  const t = COPY[lang]
  useSeo({ title: `${t.title} · Nivora`, noindex: true })

  return (
    <main>
      <section className="relative mx-auto flex min-h-[70svh] w-full max-w-[640px] flex-col items-center justify-center px-6 pb-28 pt-40 text-center lg:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-28 -z-10 mx-auto h-[280px] w-[280px] rounded-full bg-olive/10 blur-[120px] sm:h-[360px] sm:w-[360px]"
        />
        <Reveal mode="mount">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-line bg-white/[0.04] text-faint">
            <Compass className="h-6 w-6" strokeWidth={2} />
          </span>
          <span className="label-mono mt-8 block text-dim">{t.label}</span>
          <h1 className="mt-3 font-serif text-[32px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[42px]">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-muted">{t.body}</p>
          <Link
            to="/"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-6 py-3 text-sm text-ink transition-colors hover:bg-white/[0.09]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {t.backHome}
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
