import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'
import { useLang } from '@/i18n'

const COPY = {
  en: {
    title: 'Have something worth building?',
    body: 'Tell us what is slow, manual, or risky in your business. We will show you what is worth building, and what is not.',
    cta: 'Book a call',
  },
  nl: {
    title: 'Hebt u iets dat het bouwen waard is?',
    body: 'Vertel ons wat traag, handmatig of risicovol is in uw bedrijf. Wij laten u zien wat het bouwen waard is, en wat niet.',
    cta: 'Boek een gesprek',
  },
} as const

/** Closing call to action shown at the bottom of the blog index and post pages. */
export function BlogCTA() {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      <div className="flex flex-col items-center rounded-[28px] border border-line bg-white/[0.015] px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[40px]">
            {t.title}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-faint">
            {t.body}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8">
            <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="h-12 px-6 text-[15px]">
              {t.cta}
            </RippleButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
