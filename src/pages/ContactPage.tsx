import { useEffect } from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { CONTACT, ADDRESS, SOCIAL_LINKS, getAddressRegion } from '@/data/contact'
import { useLang } from '@/i18n'

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.mapQuery)}`
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS.mapQuery)}&z=15&output=embed`

const COPY = {
  en: {
    docTitle: 'Contact · Nivora',
    eyebrow: 'Contact',
    heading: "Let's talk.",
    sub: "Tell us the challenge, or the idea you can't get built. Book a call, or reach us directly. We usually reply within a day.",
    bookCall: 'Book a call',
    emailUs: 'Email us',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelStudio: 'Studio',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Get directions',
    replyNote: 'Usually a reply within a day',
  },
  nl: {
    docTitle: 'Contact · Nivora',
    eyebrow: 'Contact',
    heading: 'Laten we praten.',
    sub: 'Vertel ons de uitdaging, of het idee dat u maar niet gebouwd krijgt. Boek een gesprek, of bereik ons rechtstreeks. We reageren meestal binnen een dag.',
    bookCall: 'Boek een gesprek',
    emailUs: 'Mail ons',
    labelEmail: 'E-mail',
    labelPhone: 'Telefoon',
    labelStudio: 'Studio',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Toon de route',
    replyNote: 'Meestal antwoord binnen een dag',
  },
} as const

/** A single contact tile (email / phone / location). Big, equal-height, clean. */
function ContactCard({
  icon: Icon,
  label,
  value,
  note,
  href,
  external,
}: {
  icon: typeof Mail
  label: string
  value: string
  note?: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex h-full min-h-[230px] flex-col justify-between rounded-[26px] border border-white/[0.1] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:from-white/[0.08] sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-ink transition-colors group-hover:bg-white/[0.07]">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          strokeWidth={1.7}
        />
      </div>
      <div>
        <p className="text-[12px] uppercase tracking-[0.16em] text-faint">{label}</p>
        <p className="mt-2 break-words text-[21px] font-medium leading-tight tracking-[-0.01em] text-ink sm:text-[23px]">
          {value}
        </p>
        {note && <p className="mt-1.5 text-[14px] text-faint">{note}</p>}
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
    <main className="bg-bg">
      {/* Hero — big, bold, pure black and white */}
      <section className="relative mx-auto w-full max-w-[1120px] px-6 pb-16 pt-36 text-center lg:pb-20 lg:pt-44">
        {/* Subtle monochrome wash for depth, no colour */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[480px] w-[760px] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]"
        />
        <Reveal mode="mount">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.02] px-3.5 py-1.5 text-[12px] uppercase tracking-[0.2em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            {t.eyebrow}
          </p>
        </Reveal>
        <Reveal mode="mount" delay={0.05}>
          <h1 className="mx-auto max-w-4xl font-serif text-[52px] leading-[0.98] tracking-[-0.03em] text-ink sm:text-[76px] lg:text-[92px]">
            {t.heading}
          </h1>
        </Reveal>
        <Reveal mode="mount" delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            {t.sub}
          </p>
        </Reveal>
        <Reveal mode="mount" delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <BookCallButton className="h-[52px] px-7 text-[15px]">{t.bookCall}</BookCallButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.02] px-7 text-[15px] text-ink-soft transition-colors hover:border-white/25 hover:bg-white/[0.05] hover:text-ink"
            >
              {t.emailUs}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Three equal, big, clean contact cards */}
      <section className="mx-auto w-full max-w-[1120px] px-6">
        <div className="grid items-stretch gap-5 sm:grid-cols-3">
          <Reveal>
            <ContactCard icon={Mail} label={t.labelEmail} value={CONTACT.email} note={t.replyNote} href={`mailto:${CONTACT.email}`} />
          </Reveal>
          <Reveal delay={0.06}>
            <ContactCard icon={Phone} label={t.labelPhone} value={CONTACT.phoneDisplay} href={CONTACT.phoneHref} />
          </Reveal>
          <Reveal delay={0.12}>
            <ContactCard
              icon={MapPin}
              label={t.labelStudio}
              value={ADDRESS.line1}
              note={`${ADDRESS.line2} · ${getAddressRegion(lang)}`}
              href={MAPS_LINK}
              external
            />
          </Reveal>
        </div>

        {/* Socials */}
        <Reveal delay={0.16}>
          <div className="mt-7 flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.02] text-ink-soft/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Big monochrome map — same width as the cards, large and clean */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12 lg:pb-36">
        <Reveal>
          <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#0a0a0a] sm:h-[520px]">
            <iframe
              title={t.mapTitle}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_grayscale(1)_brightness(0.96)_contrast(0.9)]"
            />
            {/* Edge feather + hairline so the light map blends into the black page */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_90px_36px_rgba(6,6,6,0.6)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.07]" />

            {/* Address / route chip */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-black/80 px-4 py-3.5 backdrop-blur-md transition-colors hover:bg-black/90 sm:inset-x-auto sm:left-5 sm:max-w-md"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-ink">
                <MapPin className="h-[19px] w-[19px]" strokeWidth={1.6} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[14px] text-ink">{ADDRESS.line1}</span>
                <span className="truncate text-[12.5px] text-faint">{ADDRESS.line2}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] text-faint transition-colors group-hover:text-ink">
                {t.route} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
