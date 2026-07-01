import { useEffect } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { LocationMap } from '@/components/ui/LocationMap'
import { CONTACT, ADDRESS, SOCIAL_LINKS } from '@/data/contact'
import { useLang } from '@/i18n'

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.mapQuery)}`
/** The studio, geocoded once so the map centres exactly on it (no runtime lookup). */
const STUDIO = { lat: 51.2179184, lng: 3.2273973 } as const

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
      className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-[26px] border border-white/[0.16] bg-white/[0.07] p-7 backdrop-blur-[36px] backdrop-saturate-[1.2] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.10] hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.8)] sm:p-8"
    >
      {/* Gloss — same recipe as the Our Services cards: frosted tint, diagonal sheen, top hairline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-black/[0.22]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_85%_at_18%_-12%,rgba(255,255,255,0.22),transparent_56%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.16] bg-white/[0.08] text-ink shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-colors group-hover:bg-white/[0.12]">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </span>
        </div>
        <div className="text-center">
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
          <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_47%,rgba(6,6,6,0.62),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34svh] bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6">
          {/* Heading block — centered at normal hero height, like the home Hero */}
          <div className="flex min-h-[100svh] flex-col items-center justify-center text-center">
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
              <div className="mt-9 flex items-center justify-center">
                <BookCallButton className="h-[52px] px-7 text-[15px]">{t.bookCall}</BookCallButton>
              </div>
            </Reveal>
          </div>

          {/* Three glossy cards — pulled up so only their top (the icon) peeks above the fold */}
          <div className="-mt-24 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Interactive dark map that melts into the page — drag and scroll to explore,
          one quiet terracotta marker, and a lower-left chip out to Google Maps. */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pb-28 pt-12 lg:pb-36">
        <Reveal>
          <LocationMap
            coords={STUDIO}
            mapsUrl={MAPS_LINK}
            line1={ADDRESS.line1}
            line2={ADDRESS.line2}
            routeLabel={t.route}
            title={t.mapTitle}
            className="h-[440px] sm:h-[540px]"
          />
        </Reveal>
      </section>
    </main>
  )
}
