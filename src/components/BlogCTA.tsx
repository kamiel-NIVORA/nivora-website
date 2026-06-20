import { Reveal } from '@/components/animations/Reveal'
import { Button } from '@/components/ui/Button'

/** Closing call to action shown at the bottom of the blog index and post pages. */
export function BlogCTA() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      <div className="flex flex-col items-center rounded-[28px] border border-line bg-white/[0.015] px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[40px]">
            Have something worth building?
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-faint">
            Tell us what is slow, manual, or risky in your business. We will show
            you what is worth building, and what is not.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a href="/#contact">Book a call</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
