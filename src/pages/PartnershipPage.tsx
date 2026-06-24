import { Check } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { BOOKING_URL } from '@/data/contact'

const TYPES = [
  {
    n: '01',
    title: 'Referral Partner',
    line: 'You know the client. We build the solution.',
    body: 'Introduce us to companies you believe in and earn a commission on every engagement that converts. No delivery work on your side. You make the introduction, we handle the rest.',
    for: ['Freelancers and consultants', 'Business advisors', 'Anyone with a strong client network'],
  },
  {
    n: '02',
    title: 'Agency Partner',
    line: 'Expand what you can deliver without expanding your team.',
    body: 'Offer AI-powered builds and products as part of your own service stack. We work alongside your team as a technical partner, visible or invisible, as you prefer.',
    for: ['Creative and digital agencies', 'Marketing and branding studios', 'Design and UX firms'],
  },
  {
    n: '03',
    title: 'Technology Partner',
    line: 'Your platform, extended.',
    body: 'We build integrations between your systems and ours, or embed our capabilities into your product. If your software touches AI, automation, or data, there is likely something worth building together.',
    for: ['SaaS companies and platform builders', 'Software development firms', 'API-first businesses'],
  },
  {
    n: '04',
    title: 'White-label',
    line: 'Our systems. Your brand.',
    body: 'Deploy AIOS, Local AI, or custom apps under your own name. Your clients see your brand. We take care of the infrastructure, the updates, and the support.',
    for: ['Managed service providers', 'Enterprise resellers', 'IT consultancies'],
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us about your work',
    body: 'Book a 15-minute call or send us an email. We want to understand what you do, who you serve, and where the overlap might be.',
  },
  {
    n: '02',
    title: 'We find the right structure',
    body: 'Not every partnership looks the same. We scope which model fits your business and agree on terms that make sense for both sides.',
  },
  {
    n: '03',
    title: 'Start building together',
    body: 'Sign the agreement, receive your onboarding materials, and make your first move. We stay close, especially at the start.',
  },
]

export function PartnershipPage() {
  return (
    <main className="relative w-full overflow-x-clip bg-bg">

      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-20 pt-36 lg:pt-48 lg:pb-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Partnerships</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-2xl font-serif text-[44px] leading-[1.06] tracking-[-0.025em] text-ink sm:text-[60px] lg:text-[76px]">
            Build with Nivora.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-lg text-[17px] leading-[1.72] text-faint">
            We work with agencies, consultants, and technology companies who want to bring
            something sharper to their clients. Four clear structures. One direct relationship
            with the team.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap gap-3">
            <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="h-12 px-6 text-[15px]">
              Book a partner call
            </RippleButton>
            <RippleButton variant="ghost" href="mailto:kamiel@nivoraworks.com" className="h-12 px-6 text-[15px]">
              Email us
            </RippleButton>
          </div>
        </Reveal>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-line" />

      {/* ── Partnership types ── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
        <Reveal>
          <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[36px]">
            Four ways to work together.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-faint">
            Pick the structure that fits the way you already work. We adapt to you, not the other
            way around.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {TYPES.map((t, i) => (
            <Reveal key={t.n} delay={0.05 * i}>
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-7">
                <div className="pointer-events-none mb-5 flex items-center justify-between">
                  <span className="font-mono text-[12px] text-faint">{t.n}</span>
                </div>
                <h3 className="font-serif text-[22px] leading-snug tracking-[-0.01em] text-ink">{t.title}</h3>
                <p className="mt-2 text-[13.5px] font-medium text-muted">{t.line}</p>
                <p className="mt-4 flex-1 text-[14px] leading-[1.7] text-faint">{t.body}</p>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-faint">Good for</p>
                  <ul className="flex flex-col gap-2">
                    {t.for.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-line" />

      {/* ── What you get ── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[36px]">
                What every partner gets.
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <p className="mt-5 text-[15.5px] leading-[1.72] text-faint">
                We keep the programme lean so we can invest properly in the partners we work with.
                No portal, no paperwork stack. A direct relationship with the team, and real
                support when you need it.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.05}>
              <ul className="flex flex-col divide-y divide-line">
                {[
                  'Competitive commission structure from day one',
                  'A dedicated contact at Nivora, not a helpdesk',
                  'Co-marketing content and joint case studies',
                  'Early access to new products before public launch',
                  'Technical onboarding and full documentation',
                  'Proposal and pitch support on request',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 py-4 text-[14.5px] text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink/50" strokeWidth={2.2} />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-line" />

      {/* ── How it works ── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-28">
        <Reveal>
          <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[36px]">
            How to get started.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.06 * i}>
              <div className="rounded-[20px] border border-line bg-surface p-7">
                <p className="font-mono text-[12px] text-faint">{s.n}</p>
                <h3 className="mt-5 font-serif text-[20px] leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-faint">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-28 lg:pb-36">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-surface px-8 py-14 text-center lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[24px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h2 className="font-serif text-[30px] leading-[1.14] tracking-[-0.02em] text-ink sm:text-[42px]">
              Ready to work together?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-relaxed text-faint">
              Tell us about your business and the clients you serve. We will figure out which
              structure fits and what it looks like in practice.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <RippleButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 text-[15px]"
              >
                Book a partner call
              </RippleButton>
              <RippleButton variant="ghost" href="mailto:kamiel@nivoraworks.com" className="h-12 px-7 text-[15px]">
                Send us an email
              </RippleButton>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
  )
}
