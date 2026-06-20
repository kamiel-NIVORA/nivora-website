import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Cleane iOS-stijl meldingen binnen het visual-paneel van het Products-kaartje.
 * De surf-foto is de wallpaper; daarboven komen drie glass-meldingen
 * (Box / Voice / Editor → "Coming soon") één voor één in beeld geschoven en
 * settelen verdeeld over het HELE kader (boven / midden / onder) — net als op
 * een Apple-lockscreen. Elke melding is een knop: tikken brengt je naar de
 * wachtlijst.
 */

type Notif = { app: string; logo: string; blurb: string }

const NOTIFS: Notif[] = [
  { app: 'Box', logo: '/box-logo.png', blurb: 'All your communication in one place.' },
  { app: 'Voice', logo: '/voice-logo.png', blurb: 'Speech-to-text, tuned to your voice.' },
  { app: 'Editor', logo: '/editor-logo.png', blurb: 'Animations, straight into After Effects.' },
]

/** Houdt de echte tijd bij (HH:MM) — ververst elke 15s. */
function useClock(): string {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function NotifCard({ app, logo, blurb, time }: Notif & { time: string }) {
  return (
    <motion.a
      href="#contact"
      aria-label={`${app} — coming soon, join the waiting list`}
      layout
      initial={{ opacity: 0, y: 34, scale: 0.965, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.85 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group flex cursor-pointer items-center gap-3 rounded-[20px] border border-white/25 bg-white/[0.14] px-3.5 py-2.5 backdrop-blur-md transition-colors duration-200 hover:border-white/50 hover:bg-white/[0.22]"
      style={{
        boxShadow:
          'inset 1px 1px 1.5px rgba(255,255,255,0.45), inset -1px -1px 1.5px rgba(255,255,255,0.12), 0 10px 26px rgba(0,0,0,0.24)',
      }}
    >
      <img
        src={logo}
        alt={app}
        className="h-10 w-10 shrink-0 rounded-[11px] object-cover shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
      />
      <div className="min-w-0 flex-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.38)]">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[14px] font-semibold leading-tight text-white">{app}</span>
          <span className="shrink-0 text-[11.5px] text-white/70">{time}</span>
        </div>
        <p className="truncate text-[12.5px] leading-snug text-white/85">
          <span className="font-bold tracking-tight text-white">Coming soon</span> · {blurb}
        </p>
      </div>
    </motion.a>
  )
}

export function NotificationStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [shown, setShown] = useState(0)
  const time = useClock()

  useEffect(() => {
    if (!inView) return
    const timers = NOTIFS.map((_, i) => window.setTimeout(() => setShown(i + 1), 350 + i * 650))
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full overflow-hidden">
      {/* surf-wallpaper */}
      <img src="/IMG_0701.JPG" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* leesbaarheid: zachte verdonkering achter de meldingen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/25" />

      {/* iPhone-lockscreen: nieuwe melding schuift van onder in, duwt de stack
          omhoog (bottom-anchored). 1 → 2 → 3, telkens van onderen erbij. */}
      <div className="absolute inset-0 flex flex-col justify-end gap-2.5 p-4 sm:p-5">
        {NOTIFS.slice(0, shown).map((n) => (
          <NotifCard key={n.app} {...n} time={time} />
        ))}
      </div>
    </div>
  )
}
