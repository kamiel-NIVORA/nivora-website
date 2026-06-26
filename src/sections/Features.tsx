import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RippleButton } from '@/components/ui/RippleButton'
import { NotificationStack } from '@/components/ui/NotificationStack'
import { ServicesShowcase } from '@/components/ui/ServicesShowcase'
import { getServices } from '@/lib/navigation'
import { useLang } from '@/i18n'

const cycleEase = [0.22, 1, 0.36, 1] as const

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

const COPY = {
  en: {
    headingTitle: 'The tools you need. The systems you want.',
    headingSubtitle:
      'Use our software directly, or let us build and install exactly what your business needs. Either way, everything is designed around you.',
    comingSoon: 'Coming soon',
    learnMoreAbout: 'Learn more about',
    altPrefix: 'Visual illustrating',
    features: [
      {
        title: 'Our Products',
        body: 'Intelligent software built by Nivora, ready to use from day one. Pick the tool that fits your workflow and start immediately. No setup complexity, no lengthy onboarding.',
        notifications: true,
        comingSoon: true,
        cta: 'Get notified at launch',
        href: '/waitlist',
        secondaryCta: 'See more',
        secondaryHref: '#products',
      },
      {
        title: 'Our Services',
        body: 'You bring the challenge, we handle everything else. From installing private AI inside your infrastructure to building custom apps and complete ERP systems.',
        services: true,
        cta: 'Learn more about AIOS',
        href: '#aios',
      },
    ] as Feature[],
  },
  nl: {
    headingTitle: 'De tools die u nodig hebt. De systemen die u wilt.',
    headingSubtitle:
      'Gebruik onze software meteen, of laat ons precies bouwen en installeren wat uw bedrijf nodig heeft. Hoe dan ook, alles is rond u ontworpen.',
    comingSoon: 'Binnenkort',
    learnMoreAbout: 'Lees meer over',
    altPrefix: 'Visual van',
    features: [
      {
        title: 'Onze producten',
        body: 'Intelligente software gebouwd door Nivora, klaar voor gebruik vanaf dag één. Kies de tool die bij uw workflow past en ga meteen aan de slag. Geen ingewikkelde setup, geen langdradige onboarding.',
        notifications: true,
        comingSoon: true,
        cta: 'Word op de hoogte gebracht bij de lancering',
        href: '/waitlist',
        secondaryCta: 'Bekijk meer',
        secondaryHref: '#products',
      },
      {
        title: 'Onze diensten',
        body: 'U brengt de uitdaging, wij regelen de rest. Van het installeren van private AI binnen uw infrastructuur tot het bouwen van apps op maat en complete ERP-systemen.',
        services: true,
        cta: 'Lees meer over AIOS',
        href: '#aios',
      },
    ] as Feature[],
  },
} as const

type Labels = { comingSoon: string; learnMoreAbout: string; altPrefix: string }

function FeatureCard({
  feature,
  labels,
  serviceTitles,
}: {
  feature: Feature
  labels: Labels
  serviceTitles: string[]
}) {
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
              alt={`${labels.altPrefix} ${title}`}
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
                {labels.comingSoon}
              </span>
            )}
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-faint">{body}</p>
          {services ? (
            <RippleButton variant="ghost" href={href} className="mt-7 min-h-11 max-w-full self-start px-5 py-2.5 text-sm">
              {labels.learnMoreAbout}
              <CyclingWord words={serviceTitles} />
            </RippleButton>
          ) : (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <RippleButton variant="solid" href={href} className="min-h-11 w-full justify-center px-5 py-2.5 text-center text-sm sm:w-auto">
                {cta}
              </RippleButton>
              {secondaryCta && secondaryHref && (
                <RippleButton variant="ghost" href={secondaryHref} className="min-h-11 w-full justify-center px-5 py-2.5 text-center text-sm sm:w-auto">
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
  const { lang } = useLang()
  const t = COPY[lang]
  const serviceTitles = getServices(lang).map((s) => s.title)
  const labels: Labels = {
    comingSoon: t.comingSoon,
    learnMoreAbout: t.learnMoreAbout,
    altPrefix: t.altPrefix,
  }
  return (
    <section id="features" className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:py-24 lg:py-32">
      <SectionHeading title={t.headingTitle} subtitle={t.headingSubtitle} />
      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {t.features.map((f) => (
          <FeatureCard key={f.title} feature={f} labels={labels} serviceTitles={serviceTitles} />
        ))}
      </div>
    </section>
  )
}
