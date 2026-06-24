import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RippleButton } from '@/components/ui/RippleButton'
import { NotificationStack } from '@/components/ui/NotificationStack'
import { ServicesShowcase } from '@/components/ui/ServicesShowcase'
import { SERVICES } from '@/lib/navigation'

const cycleEase = [0.22, 1, 0.36, 1] as const

/** Service names the "Our Services" CTA rolls through, kept in sync with the nav. */
const SERVICE_TITLES = SERVICES.map((s) => s.title)

/** A single word that rolls over to the next on a timer; width stays fixed to the
 *  longest entry so the surrounding button never reflows. */
function CyclingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')
  return (
    <span className="relative ml-1 inline-block whitespace-nowrap font-semibold">
      <span aria-hidden className="invisible">{longest}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: 7, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -7, opacity: 0 }}
          transition={{ duration: 0.32, ease: cycleEase }}
          className="absolute left-0 top-0"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

type Feature = {
  title: string
  body: string
  image?: string
  notifications?: boolean
  services?: boolean
  comingSoon?: boolean
  cta: string
  href: string
  /** Optional secondary, lighter button (e.g. "Zie meer" jumping to a section). */
  secondaryCta?: string
  secondaryHref?: string
}

const FEATURES: Feature[] = [
  {
    title: 'Our Products',
    body: 'Intelligent software built by Nivora, ready to use from day one. Pick the tool that fits your workflow and start immediately. No setup complexity, no lengthy onboarding.',
    notifications: true,
    comingSoon: true,
    cta: 'Get notified at launch',
    href: '/waitlist',
    secondaryCta: 'Zie meer',
    secondaryHref: '#products',
  },
  {
    title: 'Our Services',
    body: 'You bring the challenge, we handle everything else. From installing private AI inside your infrastructure to building custom apps and complete ERP systems.',
    services: true,
    cta: 'Lees meer over AIOS',
    href: '#aios',
  },
]

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, body, image, notifications, services, comingSoon, cta, href, secondaryCta, secondaryHref } = feature
  return (
    <Reveal>
      <div className="flex h-full flex-col rounded-[28px] border border-line bg-white/[0.015] p-4 lg:p-5">
        {/* Visual panel */}
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          {notifications ? (
            <NotificationStack />
          ) : services ? (
            <ServicesShowcase />
          ) : (
            <img
              src={image}
              alt={`Visual illustrating ${title}`}
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col px-2 pb-1 pt-6 lg:px-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink lg:text-[30px]">
              {title}
            </h3>
            {comingSoon && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
                Coming soon
              </span>
            )}
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-faint">{body}</p>
          {services ? (
            <RippleButton variant="ghost" href={href} className="mt-7 h-11 self-start px-5 text-sm">
              Lees meer over
              <CyclingWord words={SERVICE_TITLES} />
            </RippleButton>
          ) : (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <RippleButton variant="solid" href={href} className="h-11 px-5 text-sm">
                {cta}
              </RippleButton>
              {secondaryCta && secondaryHref && (
                <RippleButton variant="ghost" href={secondaryHref} className="h-11 px-5 text-sm">
                  {secondaryCta}
                </RippleButton>
              )}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export function Features() {
  return (
    <section id="features" className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-32">
      <SectionHeading
        title="The tools you need. The systems you want."
        subtitle="Use our software directly, or let us build and install exactly what your business needs. Either way, everything is designed around you."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  )
}
