import { useEffect } from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { CONTACT, ADDRESS, SOCIAL_LINKS } from '@/data/contact'

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.mapQuery)}`
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.mapQuery)}&z=15&output=embed`

/** A single tappable contact tile (email / phone / location). */
function ContactCard({
  icon: Icon,
  label,
  lines,
  href,
  external,
}: {
  icon: typeof Mail
  label: string
  lines: string[]
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 rounded-[20px] border border-line bg-white/[0.02] p-5 transition-colors hover:border-line-strong hover:bg-white/[0.04]"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-ink-soft">
        <Icon className="h-[20px] w-[20px]" strokeWidth={1.6} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[11px] uppercase tracking-[0.1em] text-faint">{label}</span>
        {lines.map((l, i) => (
          <span key={i} className={i === 0 ? 'text-[15px] text-ink' : 'text-[13px] text-faint'}>
            {l}
          </span>
        ))}
      </span>
      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-soft" strokeWidth={1.8} />
    </a>
  )
}

export function ContactPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Contact · Nivora'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto w-full max-w-[1100px] px-6 pb-16 pt-36 lg:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[420px] w-[520px] max-w-full rounded-full bg-olive/10 blur-[130px]"
        />
        <Reveal mode="mount">
          <span className="label-mono text-dim">Contact</span>
        </Reveal>
        <Reveal mode="mount" delay={0.05}>
          <h1 className="mt-4 max-w-2xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[64px]">
            Let's talk.
          </h1>
        </Reveal>
        <Reveal mode="mount" delay={0.1}>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-faint sm:text-[16px]">
            Tell us the challenge, or the idea you can't get built. Book a call, or reach us
            directly, we usually reply within a day.
          </p>
        </Reveal>
        <Reveal mode="mount" delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookCallButton className="h-12 px-6 text-[15px]">Book a call</BookCallButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 text-[15px] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              Email us
            </a>
          </div>
        </Reveal>
      </section>

      {/* Details + map */}
      <section className="relative mx-auto w-full max-w-[1100px] px-6 pb-28 lg:pb-36">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: contact tiles */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <ContactCard icon={Mail} label="Email" lines={[CONTACT.email]} href={`mailto:${CONTACT.email}`} />
            </Reveal>
            <Reveal delay={0.06}>
              <ContactCard icon={Phone} label="Phone" lines={[CONTACT.phoneDisplay]} href={CONTACT.phoneHref} />
            </Reveal>
            <Reveal delay={0.12}>
              <ContactCard
                icon={MapPin}
                label="Studio"
                lines={[ADDRESS.line1, ADDRESS.line2, ADDRESS.region]}
                href={MAPS_LINK}
                external
              />
            </Reveal>

            {/* Socials */}
            <Reveal delay={0.18}>
              <div className="mt-2 flex items-center gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.02] text-ink-soft/70 transition-colors hover:bg-white/[0.06] hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: map */}
          <Reveal delay={0.1} className="min-h-[340px] lg:min-h-0">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-[28px] border border-line bg-white/[0.02]">
              <iframe
                title="Nivora locatie, Brugge"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.75)_brightness(0.95)]"
              />
              {/* Address chip over the map */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-line-strong bg-[#0b0b0b]/85 px-4 py-3 backdrop-blur-md transition-colors hover:bg-[#0b0b0b]/95"
              >
                <MapPin className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={1.7} />
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink-soft">
                  {ADDRESS.line1}, {ADDRESS.line2}
                </span>
                <span className="shrink-0 text-[12px] text-faint">Route</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
