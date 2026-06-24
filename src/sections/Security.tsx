import { Server, ShieldCheck, KeyRound, BadgeCheck, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Pillar = {
  Icon: LucideIcon
  title: string
  body: string
}

/** Four trust pillars, tuned to what Nivora actually sells: private AI that runs
 *  inside your own walls, EU compliance, full ownership, and value proven first. */
const PILLARS: Pillar[] = [
  {
    Icon: Server,
    title: 'Runs on your infrastructure',
    body: 'Private AI lives inside your own walls. Your data stays where it belongs, never on someone else’s cloud.',
  },
  {
    Icon: ShieldCheck,
    title: 'GDPR-ready by default',
    body: 'Built in the EU, to EU rules. Compliance is the starting point, not something bolted on afterwards.',
  },
  {
    Icon: KeyRound,
    title: 'You own what we build',
    body: 'The systems, code and models are yours. No lock-in, no hostage data, no surprise fees later on.',
  },
  {
    Icon: BadgeCheck,
    title: 'Proven before you commit',
    body: 'We show the value on your own numbers first. You only go ahead once it clearly pays for itself.',
  },
]

/**
 * Security & trust strip — a quiet band of four pillars that answer the unspoken
 * "can I trust this with my data" question before the visitor reaches the final
 * ask. Mirrors the card language used across the site (hairline border, faint
 * fill, olive accent on the glyphs).
 */
export function Security() {
  return (
    <section id="security" className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      <SectionHeading
        title="Your data stays yours"
        subtitle="We build intelligence into your business without ever taking your data out of it. Private by design, compliant by default, and fully yours to keep."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 4) * 0.07}>
            <div className="flex h-full flex-col rounded-[22px] border border-line bg-white/[0.015] p-7 transition-colors duration-300 hover:border-line-strong">
              <span className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-line bg-white/[0.04] text-olive">
                <p.Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-[16px] font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-faint">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
