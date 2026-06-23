import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Link2, UserPlus, Coins, Check, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { RippleButton } from '@/components/ui/RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'

/** How the program will work, kept to three plain steps. */
const STEPS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Link2,
    title: 'Get your link',
    body: 'You will get your own personal link to share with the businesses that could use Nivora.',
  },
  {
    Icon: UserPlus,
    title: 'They come on board',
    body: 'When someone signs up through your link, we know exactly that it came from you.',
  },
  {
    Icon: Coins,
    title: 'You get rewarded',
    body: 'You earn a fair share for every customer you bring in, paid out simply and on time.',
  },
]

/** What to expect, honest and without promises we cannot keep yet. */
const EXPECT = [
  'Fair, recurring rewards',
  'A simple dashboard to track everything',
  'Free to join, no targets',
  'Real support from our team',
]

export function AffiliatePage() {
  const { open } = useContactModal()

  useEffect(() => {
    document.title = 'Affiliate — Nivora'
    return () => {
      document.title = 'Nivora'
    }
  }, [])

  return (
    <main className="relative w-full overflow-hidden bg-bg">
      <section className="relative mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 pb-28 pt-36 text-center lg:pb-32 lg:pt-44">
        {/* Soft glow behind the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-[440px] w-[440px] rounded-full bg-olive/10 blur-[120px]"
        />

        {/* Back link */}
        <Reveal mode="mount">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
            Back to home
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal mode="mount">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
            Coming soon
          </span>
          <h1 className="mt-6 font-serif text-[34px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[46px] lg:text-[54px]">
            Earn by sharing Nivora
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-faint sm:text-[16px]">
            We are building an affiliate program for the people who already love what we do. Share
            Nivora with the businesses around you, and earn every time one of them comes on board. It
            is not live yet, but here is what it will look like.
          </p>
        </Reveal>

        {/* How it will work */}
        <Reveal mode="mount" delay={0.08} className="mt-16 w-full">
          <p className="label-mono mb-7 block text-dim">How it will work</p>
          <div className="grid gap-5 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col items-center overflow-hidden rounded-[22px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 text-center backdrop-blur-md"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white/[0.03] text-ink-soft">
                  <s.Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="mt-5 font-mono text-[12px] tracking-[0.14em] text-olive">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-faint">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* What to expect */}
        <Reveal mode="mount" delay={0.12} className="mt-12 w-full max-w-[640px]">
          <div className="rounded-[22px] border border-line bg-white/[0.02] p-7 text-left sm:p-8">
            <p className="label-mono mb-5 block text-dim">What to expect</p>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-soft/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-olive/30 bg-olive/15 text-olive">
                    <Check className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Closing note + interest CTA */}
        <Reveal mode="mount" delay={0.16} className="mt-14">
          <p className="font-serif text-[20px] leading-[1.4] tracking-[-0.01em] text-ink-soft sm:text-[23px]">
            We are putting the finishing touches on it.
          </p>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-faint">
            Want to be one of the first affiliates? Let us know and we will reach out the moment it
            opens.
          </p>
          <div className="mt-7 flex justify-center">
            <RippleButton
              href="#contact"
              className="h-11 px-6 text-[14px]"
              onClick={(e) => {
                e.preventDefault()
                open()
              }}
            >
              Be the first to know
            </RippleButton>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
