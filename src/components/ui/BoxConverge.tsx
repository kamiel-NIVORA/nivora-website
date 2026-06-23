import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Box card visual — clean, no photo, no tiles. The real channel logos (Gmail,
 * Outlook, WhatsApp, Instagram, Facebook, X) pop in as bare marks, glide to the
 * centre and resolve into one icon: Box, with a small "All in one inbox" pop-up.
 * One looping progress value (0 → 1) drives the timeline.
 */

const BOX_LOGO = '/box-logo.webp'

type App = {
  name: string
  icon: string
  /** scatter offset from centre, in px */
  sx: number
  sy: number
  /** when in the 0..1 loop this icon pops in */
  appearAt: number
}

const APPS: App[] = [
  { name: 'Gmail', icon: '/box-icons/gmail.svg', sx: -84, sy: -110, appearAt: 0.0 },
  { name: 'Outlook', icon: '/box-icons/outlook.svg', sx: 84, sy: -106, appearAt: 0.06 },
  { name: 'WhatsApp', icon: '/box-icons/whatsapp.svg', sx: -104, sy: 8, appearAt: 0.12 },
  { name: 'Instagram', icon: '/box-icons/instagram.svg', sx: 104, sy: 12, appearAt: 0.18 },
  { name: 'Facebook', icon: '/box-icons/facebook.svg', sx: -66, sy: 118, appearAt: 0.24 },
  { name: 'X', icon: '/box-icons/x.svg', sx: 66, sy: 122, appearAt: 0.3 },
]

/** The channel logo on its own — no frame, just the clean mark with a soft lift. */
function Logo({ app, className }: { app: App; className?: string }) {
  return (
    <img
      src={app.icon}
      alt={app.name}
      className={'h-12 w-12 object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)] ' + (className ?? '')}
      loading="lazy"
    />
  )
}

function FloatingIcon({ t, app }: { t: MotionValue<number>; app: App }) {
  const x = useTransform(t, [0, 0.46, 0.64], [app.sx, app.sx, 0])
  const y = useTransform(t, [0, 0.46, 0.64], [app.sy, app.sy, 0])
  const opacity = useTransform(t, [app.appearAt, app.appearAt + 0.12, 0.48, 0.62], [0, 1, 1, 0])
  const scale = useTransform(t, [app.appearAt, app.appearAt + 0.12, 0.48, 0.62], [0.6, 1, 1, 0.35])

  return (
    <motion.div style={{ x, y, opacity, scale }} className="pointer-events-none absolute">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: app.appearAt * 4 }}
      >
        <Logo app={app} />
      </motion.div>
    </motion.div>
  )
}

export function BoxConverge() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })
  const t = useMotionValue(0)

  const boxOpacity = useTransform(t, [0.52, 0.66, 0.92, 0.99], [0, 1, 1, 0])
  const boxScale = useTransform(t, [0.52, 0.66, 0.92, 0.99], [0.4, 1, 1, 0.94])
  const pillOpacity = useTransform(t, [0.7, 0.78, 0.92, 0.98], [0, 1, 1, 0])
  const pillY = useTransform(t, [0.7, 0.78], [12, 0])

  useEffect(() => {
    if (reduced || !inView) return
    const controls = animate(t, 1, { duration: 6.5, ease: 'linear', repeat: Infinity })
    return () => controls.stop()
  }, [reduced, inView, t])

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-[20px]">
      {/* Clean — no photo. A soft neutral glow lifts the logo off the dark card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)]"
      />

      {reduced ? (
        <div className="absolute inset-0 grid place-items-center">
          {APPS.map((app) => (
            <div
              key={app.name}
              className="pointer-events-none absolute opacity-80"
              style={{ transform: `translate(${app.sx}px, ${app.sy}px)` }}
            >
              <Logo app={app} />
            </div>
          ))}
          <img src={BOX_LOGO} alt="Box" className="h-24 w-24 rounded-[22px] object-cover shadow-[0_14px_40px_rgba(0,0,0,0.55)]" />
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {APPS.map((app) => (
            <FloatingIcon key={app.name} t={t} app={app} />
          ))}
          <motion.img
            src={BOX_LOGO}
            alt="Box"
            style={{ opacity: boxOpacity, scale: boxScale }}
            className="pointer-events-none absolute h-24 w-24 rounded-[22px] object-cover shadow-[0_18px_46px_rgba(0,0,0,0.6)]"
          />

          {/* Box pop-up — lands under the logo when everything resolves into Box */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 mt-[64px] flex justify-center">
            <motion.div
              style={{ opacity: pillOpacity, y: pillY }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#141414]/95 py-1.5 pl-1.5 pr-3 text-[12px] font-semibold text-white shadow-[0_14px_32px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md"
            >
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-white/15">
                <Check className="h-3 w-3 text-white" strokeWidth={2.8} />
              </span>
              All in one inbox
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
