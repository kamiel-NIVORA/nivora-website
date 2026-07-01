import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { waitlistHref } from '@/data/contact'
import { useLang, type Lang } from '@/i18n'

/**
 * Cleane iOS-stijl meldingen binnen het visual-paneel van het Products-kaartje.
 * De surf-foto is de wallpaper; daarboven komen de glass-meldingen
 * (Box / Voice → "Coming soon") één voor één in beeld geschoven en
 * settelen verdeeld over het HELE kader (boven / midden / onder) — net als op
 * een Apple-lockscreen. Elke melding is een knop: tikken brengt je naar de
 * wachtlijst.
 */

type Notif = { app: string; logo: string; blurb: string; href: string }

const NOTIFS: Record<Lang, Notif[]> = {
  en: [
    { app: 'Box', logo: '/products/box-logo.webp', blurb: 'All your communication in one place.', href: waitlistHref('box') },
    { app: 'Voice', logo: '/products/voice-logo.webp', blurb: 'Speech-to-text, tuned to your voice.', href: waitlistHref('voice') },
  ],
  nl: [
    { app: 'Box', logo: '/products/box-logo.webp', blurb: 'Al uw communicatie op één plek.', href: waitlistHref('box') },
    { app: 'Voice', logo: '/products/voice-logo.webp', blurb: 'Spraak naar tekst, afgestemd op uw stem.', href: waitlistHref('voice') },
  ],
}

const COPY = {
  en: { comingSoon: 'Coming soon', notifAria: (app: string) => `${app}, coming soon, get notified at launch` },
  nl: { comingSoon: 'Binnenkort', notifAria: (app: string) => `${app}, binnenkort, laat u op de hoogte brengen bij de lancering` },
} as const

const CLOCK_LOCALE: Record<Lang, string> = { en: 'en-GB', nl: 'nl-NL' }

/** Houdt de echte tijd bij (HH:MM) — ververst elke 15s. */
function useClock(locale: string): string {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })
}

function NotifCard({ app, logo, blurb, href, time }: Notif & { time: string }) {
  const { lang } = useLang()
  const t = COPY[lang]
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.notifAria(app)}
      layout
      initial={{ opacity: 0, y: 34, scale: 0.965, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.85 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group flex cursor-pointer items-center gap-3 rounded-[20px] border border-white/70 bg-white/55 px-3.5 py-2.5 backdrop-blur-xl transition-colors duration-200 hover:border-white/90 hover:bg-white/70"
      style={{
        boxShadow:
          'inset 0 1px 1.5px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.06), 0 12px 28px -10px rgba(0,0,0,0.45)',
      }}
    >
      <img
        src={logo}
        alt={app}
        className="h-10 w-10 shrink-0 rounded-[11px] border border-black/10 object-cover shadow-[0_2px_5px_rgba(0,0,0,0.25)]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-semibold leading-tight text-[#0c0c0c]">{app}</span>
          <span className="shrink-0 text-[11.5px] text-black/40">{time}</span>
        </div>
        <p className="truncate text-[12.5px] leading-snug text-black/55">
          <span className="font-semibold tracking-tight text-black/75">{t.comingSoon}</span> · {blurb}
        </p>
      </div>
    </motion.a>
  )
}

export function NotificationStack() {
  const { lang } = useLang()
  const notifs = NOTIFS[lang]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [shown, setShown] = useState(0)
  const time = useClock(CLOCK_LOCALE[lang])

  useEffect(() => {
    if (!inView) return
    const timers = notifs.map((_, i) => window.setTimeout(() => setShown(i + 1), 350 + i * 650))
    return () => timers.forEach(clearTimeout)
  }, [inView, notifs])

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden">
      {/* zachte mos-wallpaper op lichtgrijs — vult het hele kader, Apple-lockscreen-stijl.
          Licht ingezoomd (scale) zodat het mos-beeld iets groter oogt; de overflow-hidden
          van de kader snijdt netjes bij. */}
      <img
        src="/products/products-bg-moss.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.25] object-cover"
      />
      {/* leesbaarheid: heel zachte witte wash zodat de glass-meldingen loskomen van de lichte achtergrond */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />

      {/* iPhone-lockscreen: nieuwe melding schuift van onder in, duwt de stack
          omhoog (bottom-anchored). 1 → 2 → 3, telkens van onderen erbij. */}
      <div className="absolute inset-0 flex flex-col justify-end gap-2.5 p-4 sm:p-5">
        {notifs.slice(0, shown).map((n) => (
          <NotifCard key={n.app} {...n} time={time} />
        ))}
      </div>
    </div>
  )
}
