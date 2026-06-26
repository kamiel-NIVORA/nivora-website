import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'
import { useLang } from '@/i18n'

const COPY = {
  en: {
    title: "Let's build the right thing",
    body: "Tell us the challenge, or the idea you can't get built. We'll show you what's worth doing, prove the value before you commit, and build it with you.",
    bookCall: 'Book a strategy call',
    contact: 'Contact us',
  },
  nl: {
    title: 'Laten we het juiste bouwen',
    body: 'Vertel ons de uitdaging, of het idee dat u niet gebouwd krijgt. We tonen u wat de moeite waard is, bewijzen de waarde voordat u zich vastlegt, en bouwen het samen met u.',
    bookCall: 'Boek een strategiegesprek',
    contact: 'Neem contact op',
  },
} as const

export function FinalCTA() {
  const { lang } = useLang()
  const t = COPY[lang]
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
            <RippleButton variant="ghost" href="/contact" className="h-12 px-6 text-[15px]">
              {t.contact}
            </RippleButton>
          </div>
        </Reveal>
      </div>

      {/* Landscape, softly faded into the dark on all sides, pulled up nearer the CTA */}
      <div className="pointer-events-none relative mx-auto -mt-2 h-56 w-full max-w-4xl sm:h-64 lg:h-80">
        <img
          src="/home/IMG_0846.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90 [mask-image:radial-gradient(ellipse_64%_70%_at_50%_46%,#000_14%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_64%_70%_at_50%_46%,#000_14%,transparent_75%)]"
        />
      </div>
    </section>
  )
}
