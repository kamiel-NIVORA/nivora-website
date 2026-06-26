import { useEffect } from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { CONTACT, ADDRESS, SOCIAL_LINKS } from '@/data/contact'
import { useLang } from '@/i18n'

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.mapQuery)}`
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.mapQuery)}&z=15&output=embed`

const COPY = {
  en: {
    docTitle: 'Contact · Nivora',
    heading: "Let's talk.",
    sub: "Tell us the challenge, or the idea you can't get built. Book a call, or reach us directly, we usually reply within a day.",
    bookCall: 'Book a call',
    emailUs: 'Email us',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelStudio: 'Studio',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Route',
  },
  nl: {
    docTitle: 'Contact · Nivora',
    heading: 'Laten we praten.',
    sub: 'Vertel ons de uitdaging, of het idee dat u maar niet gebouwd krijgt. Boek een gesprek, of bereik ons rechtstreeks, we reageren meestal binnen een dag.',
    bookCall: 'Boek een gesprek',
    emailUs: 'Mail ons',
    labelEmail: 'E-mail',
    labelPhone: 'Telefoon',
    labelStudio: 'Studio',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Route',
  },
} as const

/** A single contact tile (email / phone / location). */
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
      className="group flex flex-col gap-5 rounded-[22px] border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6 transition-all duration-300 hover:border-line-strong hover:from-white/[0.07]"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.04] text-ink-soft">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-soft"
          strokeWidth={1.8}
        />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-faint">{label}</p>
        {lines.map((l, i) => (
          <p key={i} className={i === 0 ? 'mt-1.5 text-[15px] text-ink' : 'text-[13px] text-faint'}>
            {l}
          </p>
        ))}
      </div>
    </a>
  )
}

export function ContactPage() {
  const { lang } = useLang()
  const t = COPY[lang]

  useEffect(() => {
    const prev = document.title
    document.title = t.docTitle
    return () => {
      document.title = prev
    }
  }, [t.docTitle])

  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto w-full max-w-[1000px] px-6 pb-14 pt-36 text-center lg:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-[460px] w-[560px] max-w-full rounded-full bg-olive/10 blur-[140px]"
        />
        <Reveal mode="mount">
          <h1 className="mx-auto max-w-3xl font-serif text-[46px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[64px] lg:text-[78px]">
            {t.heading}
          </h1>
        </Reveal>
        <Reveal mode="mount" delay={0.06}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-faint sm:text-[16px]">
            {t.sub}
          </p>
        </Reveal>
        <Reveal mode="mount" delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <BookCallButton className="h-12 px-6 text-[15px]">{t.bookCall}</BookCallButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 text-[15px] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              {t.emailUs}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact tiles */}
      <section className="mx-auto w-full max-w-[1100px] px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal>
            <ContactCard icon={Mail} label={t.labelEmail} lines={[CONTACT.email]} href={`mailto:${CONTACT.email}`} />
          </Reveal>
          <Reveal delay={0.06}>
            <ContactCard icon={Phone} label={t.labelPhone} lines={[CONTACT.phoneDisplay]} href={CONTACT.phoneHref} />
          </Reveal>
          <Reveal delay={0.12}>
            <ContactCard
              icon={MapPin}
              label={t.labelStudio}
              lines={[ADDRESS.line1, ADDRESS.line2]}
              href={MAPS_LINK}
              external
            />
          </Reveal>
        </div>

        {/* Socials */}
        <Reveal delay={0.16}>
          <div className="mt-6 flex items-center justify-center gap-3">
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
      </section>

      {/* Big dark map */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-28 pt-10 lg:pb-36">
        <Reveal>
          <div className="relative h-[380px] overflow-hidden rounded-[32px] border border-line bg-[#0a0a0a] sm:h-[460px]">
            <iframe
              title={t.mapTitle}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_brightness(0.95)_contrast(0.95)]"
            />
            {/* Edge feather + hairline so the light map blends into the dark page */}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_0_80px_30px_rgba(6,6,6,0.55)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/[0.06]" />

            {/* Address / route chip */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-line-strong bg-[#0b0b0b]/85 px-4 py-3.5 backdrop-blur-md transition-colors hover:bg-[#0b0b0b]/95 sm:inset-x-auto sm:left-5 sm:max-w-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
                <MapPin className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[13px] text-ink">{ADDRESS.line1}</span>
                <span className="text-[12px] text-faint">{ADDRESS.line2}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-[12px] text-faint transition-colors group-hover:text-ink">
                {t.route} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
