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
    eyebrow: 'Contact',
    heading: "Let's talk.",
    sub: "Tell us the challenge, or the idea you can't get built. Book a call, or reach us directly. We usually reply within a day.",
    bookCall: 'Book a call',
    emailUs: 'Email us',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelStudio: 'Studio',
    studioValue: 'Brugge, Belgium',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Get directions',
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
    studioValue: 'Brugge, België',
    mapTitle: 'Nivora studio, Brugge',
    route: 'Toon de route',
  },
} as const

/** A single contact tile. Glossy frosted glass, echoing the home "Our Services"
 *  cards: a frosted tint, a diagonal sheen and a top hairline, with a real
 *  backdrop-blur so the sea behind frosts through. Equal-height, one clean line. */
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Mail
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.05] p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.8)] sm:p-8"
    >
      {/* Gloss — same recipe as the Our Services cards: frosted tint, diagonal sheen, top hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/25" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_18%_-12%,rgba(255,255,255,0.16),transparent_56%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.16] bg-white/[0.08] text-ink shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-colors group-hover:bg-white/[0.12]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            strokeWidth={1.7}
          />
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{label}</p>
          <p className="mt-2.5 break-words text-[18px] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[20px]">
            {value}
          </p>
        </div>
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
      {/* Hero over the sea. The heading sits low, and the glossy cards peek up
          from the bottom of the first screen so only their icons show. */}
      <section className="relative overflow-hidden">
        {/* Sea backdrop, pinned to the first screen and feathered into the page */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[122svh]">
          <img
            src="/backgrounds/bg-contact-sea.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
          />
          <div className="absolute inset-0 bg-bg/[0.34]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-bg via-bg/55 to-transparent" />
          {/* Soft focal scrim so the white heading reads over the bright horizon */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_64%_at_50%_62%,rgba(6,6,6,0.6),transparent_64%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34svh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6">
          {/* Heading block — tall, content pushed toward the lower part of the screen */}
          <div className="flex min-h-[calc(100svh-150px)] flex-col items-center justify-end pb-12 text-center">
            <Reveal mode="mount">
              <h1 className="mx-auto max-w-4xl font-serif text-[52px] leading-[0.98] tracking-[-0.03em] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-[76px] lg:text-[92px]">
                {t.heading}
              </h1>
            </Reveal>
            <Reveal mode="mount" delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-[17px]">
                {t.sub}
              </p>
            </Reveal>
            <Reveal mode="mount" delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <BookCallButton className="h-[52px] px-7 text-[15px]">{t.bookCall}</BookCallButton>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-7 text-[15px] text-ink backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.12]"
                >
                  {t.emailUs}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Three glossy cards — only their top (the icon) peeks above the fold */}
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal mode="mount" delay={0.2}>
              <ContactCard icon={Mail} label={t.labelEmail} value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            </Reveal>
            <Reveal mode="mount" delay={0.26}>
              <ContactCard icon={Phone} label={t.labelPhone} value={CONTACT.phoneDisplay} href={CONTACT.phoneHref} />
            </Reveal>
            <Reveal mode="mount" delay={0.32}>
              <ContactCard icon={MapPin} label={t.labelStudio} value={t.studioValue} href={MAPS_LINK} external />
            </Reveal>
          </div>

          {/* Socials */}
          <Reveal delay={0.1}>
            <div className="mt-7 flex items-center justify-center gap-3 pb-2">
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
        </div>
      </section>

      {/* Frameless monochrome map that melts into the page — one quiet accent: the marker */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12 lg:pb-36">
        <Reveal>
          <div className="relative h-[440px] overflow-hidden rounded-[28px] bg-bg sm:h-[540px]">
            {/* The map is blown up well past the frame and kept non-interactive, so every
                bit of Google's own chrome — the top-left place panel, the logo, the zoom
                controls, the attribution strip — is cropped away. Centered, so the studio
                stays dead-centre and the visible street extent matches a normal z=15 view. */}
            <iframe
              title={t.mapTitle}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 border-0 [filter:invert(0.92)_grayscale(1)_brightness(0.6)_contrast(0.95)] sm:h-[220%] sm:w-[220%]"
            />
            {/* Tint + heavy edge feather so the map sinks into the near-black page */}
            <div className="pointer-events-none absolute inset-0 bg-bg/40" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_130px_64px_#060606]" />

            {/* The single colour on the page: a quiet terracotta marker on the studio */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/15 blur-lg" />
              <svg
                viewBox="0 0 24 24"
                className="relative h-8 w-8 -translate-y-[16px] text-terracotta drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
                <circle cx="12" cy="9" r="2.5" fill="#060606" />
              </svg>
            </div>

            {/* Address / route chip — the lower-left card, kept clean */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-x-4 bottom-4 z-[3] flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-bg/80 px-4 py-3.5 backdrop-blur-md transition-colors hover:border-white/15 hover:bg-bg/90 sm:inset-x-auto sm:left-5 sm:max-w-md"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-terracotta">
                <MapPin className="h-[19px] w-[19px]" strokeWidth={1.7} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[14px] text-ink">{ADDRESS.line1}</span>
                <span className="truncate text-[12.5px] text-faint">{ADDRESS.line2}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-[12.5px] text-faint transition-colors group-hover:text-ink">
                <span className="hidden sm:inline">{t.route} </span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
