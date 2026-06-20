import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'

export function FinalCTA() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-6 py-28 lg:py-36">
      <div className="relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="font-serif text-[34px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-5xl lg:leading-[1.2]">
            Turn research into insight
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint">
            A professional workspace designed to support complex research,
            structured analysis, and reliable insight generation.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RippleButton variant="solid" href="#contact" className="h-12 px-6 text-[15px]">
              Try for Free
            </RippleButton>
            <RippleButton variant="ghost" href="#contact" className="h-12 px-6 text-[15px]">
              Contact Us
            </RippleButton>
          </div>
        </Reveal>
      </div>

      {/* Landscape, softly faded into the dark on all sides */}
      <div className="pointer-events-none relative mx-auto mt-8 h-52 w-full max-w-4xl sm:h-60 lg:h-72">
        <img
          src="/cta-landscape.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80 [mask-image:radial-gradient(ellipse_60%_64%_at_50%_50%,#000_5%,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_60%_64%_at_50%_50%,#000_5%,transparent_72%)]"
        />
      </div>
    </section>
  )
}
