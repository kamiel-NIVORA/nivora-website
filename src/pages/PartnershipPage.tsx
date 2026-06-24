import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'
import { cn } from '@/lib/utils'

const TYPES = [
  {
    label: 'Referral Partner',
    headline: 'You know the client. We build the solution.',
    body: 'Refer companies you believe in and earn a commission on every engagement that converts. No delivery work on your side. You make the introduction, we take it from there, and you stay in the loop.',
    for: ['Freelancers and consultants', 'Business advisors and accountants', 'Recruiters and HR professionals', 'Anyone with a strong client network'],
    commission: 'Commission per converted referral',
  },
  {
    label: 'Agency Partner',
    headline: 'Bundle Nivora into your offer.',
    body: "Offer AI-powered products and custom builds as part of your own service stack. We work alongside your team as a technical partner, staying invisible or visible as you prefer. Your clients get sharper outcomes. You expand what you can deliver without expanding your team.",
    for: ['Creative and digital agencies', 'Marketing and branding studios', 'Design and UX firms', 'Strategy consultancies'],
    commission: 'Revenue share on co-delivered projects',
  },
  {
    label: 'Technology Partner',
    headline: 'Your platform, extended.',
    body: 'We build integrations between your systems and ours, or embed our capabilities into your product. Clean handoffs, tight alignment, and a shared roadmap. If your software touches AI, automation, or data, there is likely something worth building together.',
    for: ['SaaS companies', 'Platform and tool builders', 'Software development firms', 'API-first businesses'],
    commission: 'Integration fee or revenue share',
  },
  {
    label: 'White-label',
    headline: 'Our systems. Your brand.',
    body: 'Deploy AIOS, Local AI, or custom apps under your own name. Full white-label support: your clients see your brand, backed by our infrastructure and our team. You own the relationship. We make sure the product is worth owning.',
    for: ['Managed service providers', 'Enterprise resellers', 'IT consultancies', 'Corporate innovation teams'],
    commission: 'Wholesale pricing with flexible margins',
  },
]

const BENEFITS = [
  'Competitive commission structure from day one',
  'Dedicated partner contact at Nivora',
  'Co-marketing content and case studies',
  'Early access to new products before public launch',
  'Technical onboarding and full documentation',
  'Joint proposals and pitch support on request',
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us about your work',
    body: 'Fill in a short form or book a 15-minute call. We want to understand what you do, who you serve, and where the overlap might be.',
  },
  {
    n: '02',
    title: 'We find the right structure',
    body: 'Not every partnership looks the same. We scope which model fits your business and agree on the terms that make it worth it for both sides.',
  },
  {
    n: '03',
    title: 'Start building together',
    body: 'Sign the agreement, receive your onboarding materials, and make your first move. We stay close, especially at the start.',
  },
]

export function PartnershipPage() {
  const [active, setActive] = useState(0)

  return (
    <main className="relative w-full overflow-x-clip bg-bg">

      {/* Hero */}
      <section className="relative mx-auto w-full max-w-[1200px] px-6 pb-16 pt-36 lg:pb-24 lg:pt-48">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Partnerships</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-serif text-[42px] leading-[1.06] tracking-[-0.025em] text-ink sm:text-[58px] lg:text-[74px]">
              Build alongside us.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-faint lg:text-[18px]">
              Whether you refer clients, extend your offer with our technology, or co-deliver
              projects, there is a structure that fits the way you already work.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap gap-3">
              <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="h-12 px-6 text-[15px]">
                Book a partner call
              </RippleButton>
              <RippleButton variant="ghost" href="mailto:kamiel@nivoraworks.com" className="h-12 px-6 text-[15px]">
                Email us directly
              </RippleButton>
            </div>
          </Reveal>
        </div>

        {/* Soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[70vh] w-full"
          style={{ background: 'radial-gradient(55% 40% at 30% 20%, rgba(189,169,109,0.07), transparent 70%)' }}
        />
      </section>

      {/* Intro statement */}
      <section className="mx-auto w-full max-w-[1200px] border-t border-line px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="font-serif text-[26px] leading-[1.38] tracking-[-0.015em] text-ink sm:text-[30px] lg:text-[34px]">
              We work with agencies, consultants, and technology companies who want to bring
              something sharper to their clients.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[16px] leading-[1.75] text-faint lg:text-[17px]">
              If your work touches AI, software, or the businesses that need them, there is likely
              a place for us to grow together. We are not looking for volume. We are looking for
              the right people, with the right clients, who want to build something that actually
              works.
            </p>
            <p className="mt-5 text-[16px] leading-[1.75] text-faint lg:text-[17px]">
              Every partner gets a direct line to the team and a structure built around their
              business, not a generic reseller programme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Partnership types accordion */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Partnership types</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[38px] lg:text-[46px]">
            Four structures. One team.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Accordion */}
          <div className="flex flex-col">
            {TYPES.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(i)}
                className="group flex items-start gap-5 border-b border-line py-5 text-left first:border-t"
              >
                <span className={cn('shrink-0 font-mono text-[12px] tabular-nums transition-colors', active === i ? 'text-ink/50' : 'text-dim')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={cn('text-[18px] font-semibold tracking-tight transition-colors', active === i ? 'text-ink' : 'text-muted')}>
                    {t.label}
                  </div>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-[14.5px] leading-relaxed text-faint">{t.body}</p>
                        <ul className="mt-4 flex flex-col gap-1.5">
                          {t.for.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-[13px] text-muted">
                              <Check className="h-3.5 w-3.5 shrink-0 text-[#bda96d]" strokeWidth={2.2} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-[#bda96d]">{t.commission}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className={cn('shrink-0 text-[20px] font-light transition-all duration-300 pt-0.5', active === i ? 'rotate-45 text-ink' : 'text-dim')}>
                  +
                </span>
              </button>
            ))}
          </div>

          {/* Static feature card that updates per type */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[22px] border border-line bg-surface p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[22px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{TYPES[active].label}</p>
                  <h3 className="mt-4 font-serif text-[24px] leading-[1.25] tracking-[-0.01em] text-ink">
                    {TYPES[active].headline}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-faint">{TYPES[active].body}</p>
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#bda96d]">{TYPES[active].commission}</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {TYPES[active].for.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[13px] text-muted">
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#bda96d]" strokeWidth={2.2} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits band */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">What you get</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 font-serif text-[28px] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[34px]">
                  Built for people who actually deliver.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-[15px] leading-relaxed text-faint">
                  We keep the programme lean so we can invest properly in the partners we work
                  with. No portal, no paperwork stack. Just a direct relationship with the team.
                </p>
              </Reveal>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={b} delay={0.04 * i}>
                  <div className="flex items-start gap-3 rounded-[16px] border border-line bg-bg p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#bda96d]" strokeWidth={2.2} />
                    <p className="text-[14px] leading-snug text-ink-soft">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">How it works</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-serif text-[30px] leading-[1.12] tracking-[-0.015em] text-ink sm:text-[38px]">
              Three steps to get started.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.06 * i}>
              <div className="relative rounded-[20px] border border-line bg-surface p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[20px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="font-mono text-[13px] text-faint">{s.n}</p>
                <h3 className="mt-4 font-serif text-[21px] leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-faint">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-28 lg:pb-36">
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface px-8 py-14 text-center lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(55% 60% at 50% 40%, rgba(189,169,109,0.08), transparent 70%)' }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="relative">
            <Reveal>
              <h2 className="font-serif text-[30px] leading-[1.14] tracking-[-0.02em] text-ink sm:text-[40px] lg:text-[50px]">
                Ready to build something together?
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-faint">
                Tell us about your business and the clients you serve. We will figure out which
                structure fits and what it could look like in practice.
              </p>
            </Reveal>
            <Reveal delay={0.13}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <RippleButton
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-7 text-[15px]"
                >
                  Book a partner call
                  <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={1.8} />
                </RippleButton>
                <RippleButton variant="ghost" href="mailto:kamiel@nivoraworks.com" className="h-12 px-7 text-[15px]">
                  Send us an email
                </RippleButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </main>
  )
}
