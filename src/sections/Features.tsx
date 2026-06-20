import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { NotificationStack } from '@/components/ui/NotificationStack'
import { ServicesShowcase } from '@/components/ui/ServicesShowcase'
import { SERVICES } from '@/lib/navigation'

type Feature = {
  title: string
  body: string
  image?: string
  notifications?: boolean
  services?: boolean
  comingSoon?: boolean
  cta: string
  href: string
}

const PRODUCT_ICONS = [
  { label: 'Box', logo: '/box-logo.png' },
  { label: 'Voice', logo: '/voice-logo.png' },
  { label: 'Editor', logo: '/editor-logo.png' },
]

const FEATURES: Feature[] = [
  {
    title: 'Our Products',
    body: 'Intelligent software built by Nivora, ready to use from day one. Pick the tool that fits your workflow and start immediately. No setup complexity, no lengthy onboarding.',
    notifications: true,
    comingSoon: true,
    cta: 'Join the waiting list',
    href: '#contact',
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
  const { title, body, image, notifications, services, comingSoon, cta, href } = feature
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
          {notifications ? (
            <div className="mt-7 flex items-center justify-center gap-5">
              {PRODUCT_ICONS.map((p) => (
                <a
                  key={p.label}
                  href={href}
                  title={p.label}
                  aria-label={`${p.label} — join the waiting list`}
                  className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95"
                >
                  <img
                    src={p.logo}
                    alt={p.label}
                    className="h-14 w-14 rounded-2xl object-cover shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                  />
                </a>
              ))}
            </div>
          ) : services ? (
            <div className="mt-7 flex items-center justify-center gap-5">
              {SERVICES.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  title={s.title}
                  aria-label={s.title}
                  className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-14 w-14 rounded-2xl object-cover shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
                  />
                </a>
              ))}
            </div>
          ) : (
            <Button variant="dark" size="md" className="mt-7 self-start" asChild>
              <a href={href}>{cta}</a>
            </Button>
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
