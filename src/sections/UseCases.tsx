import {
  FileSearch,
  Highlighter,
  Layers,
  ScrollText,
  Sparkles,
  Telescope,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'

const TABS = ['Enterprise', 'Marketing', 'Leadership', 'Product & IT']

type UseCase = { Icon: LucideIcon; title: string; body: string }

const CASES: UseCase[] = [
  { Icon: Layers, title: 'Source Reviews', body: 'Compare multiple trusted sources side by side and surface what matters.' },
  { Icon: Highlighter, title: 'Live Highlight', body: 'Highlight key passages as you read and keep every insight in context.' },
  { Icon: Sparkles, title: 'Auto Summaries', body: 'Generate clear, structured summaries from complex research in seconds.' },
  { Icon: FileSearch, title: 'Insight Finder', body: 'Surface key findings, patterns, and signals without manual review.' },
  { Icon: ScrollText, title: 'Leader Reports', body: 'Create structured, decision-ready reports for teams and execs.' },
  { Icon: Telescope, title: 'Research Views', body: 'Organize research into focused views built around each question.' },
]

export function UseCases() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      {/* Glow decoration */}
      <div className="pointer-events-none relative mx-auto mb-2 h-56 w-full max-w-3xl">
        <img
          src="/images/6XAOzotgA94ghguFV7rRw826kyo.png"
          alt=""
          className="absolute inset-0 mx-auto h-full w-full rounded-full object-cover opacity-50 blur-2xl [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        />
      </div>

      <Reveal className="-mt-10">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-[28px] leading-[1.3] tracking-[-0.01em] text-ink sm:text-[36px] lg:text-[40px] lg:leading-[52px]">
          From market research to internal reviews, we bring all your research
          into one place so you can go deeper without juggling docs, tabs, and
          disconnected tools.
        </h2>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.06} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={
                i === 0
                  ? 'rounded-full bg-white/[0.08] px-4 py-2 text-[13px] font-medium text-ink'
                  : 'rounded-full border border-line px-4 py-2 text-[13px] text-faint transition-colors hover:text-ink'
              }
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Large mockup */}
      <Reveal delay={0.1} className="mt-10">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface">
          <img
            src="/images/xELV6FfU1YkRCNCax9261tmXy0.jpg"
            alt="Product workspace preview"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Reveal>

      {/* Capability cards */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map(({ Icon, title, body }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white/[0.015] p-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-ink-soft">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-faint">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
