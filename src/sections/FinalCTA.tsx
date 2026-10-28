import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'
import { useLang, localizePath } from '@/i18n'

const COPY = {
  en: {
    title: "Let's build the right thing",
    body: "Tell us the challenge, or the idea you can't get built. We'll show you what's worth doing, prove the value before you commit, and build it with you.",
    bookCall: 'Book a strategy call',
    contact: 'Contact us',
  },
  nl: {
    title: 'Laten we het juiste bouwen',
    body: 'Vertel ons jullie uitdagingen, of de ideeën die jullie niet gebouwd krijgen. We tonen jullie wat de moeite waard is, bewijzen de waarde voordat jullie je vastleggen, en bouwen het samen met jullie.',
    bookCall: 'Boek een strategiegesprek',
    contact: 'Neem contact op',
  },
} as const

export function FinalCTA({ title, body }: { title?: string; body?: string } = {}) {
  const { lang } = useLang()
  const base = COPY[lang]
  const t = { ...base, title: title ?? base.title, body: body ?? base.body }
  return (
    <section id="contact" className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 py-20 sm:py-28 lg:py-36">
      <div className="relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="font-serif text-[34px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-5xl lg:leading-[1.2]">
            {t.title}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">
            {t.body}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RippleButton
              variant="solid"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 text-[15px]"
            >
              {t.bookCall}
            </RippleButton>
            <RippleButton variant="ghost" href={localizePath('/contact', lang)} className="h-12 px-6 text-[15px]">
              {t.contact}
            </RippleButton>
          </div>
        </Reveal>
      </div>

      {/* Rocks cutout, resting on the dark with a soft grounding fade, pulled up nearer the CTA */}
      <div className="pointer-events-none relative mx-auto -mt-2 h-56 w-full max-w-4xl sm:h-64 lg:h-80">
        <img
          src="/home/cta-steps.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom opacity-95 [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)]"
        />
      </div>
    </section>
  )
}
