import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

/**
 * Box card visual — every communication app you already use (Gmail, Outlook,
 * WhatsApp, Instagram, Facebook, X) pops in scattered, then converges to the
 * centre and resolves into one icon: Box. A single looping progress value
 * (0 → 1, 6s) drives the whole timeline, so it glides and the loop seam is
 * invisible (icons and logo are both faded out at t = 0 ≈ t = 1).
 */

const BOX_LOGO = '/box-logo.png'
const TEXTURE = '/IMG_0647.JPG'

type App = {
  name: string
  fill: string
  path: string
  gradient?: boolean
  /** scatter offset from centre, in px */
  sx: number
  sy: number
  /** when in the 0..1 loop this icon pops in */
  appearAt: number
}

const APPS: App[] = [
  {
    name: 'Gmail',
    fill: '#EA4335',
    path: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z',
    sx: -72,
    sy: -120,
    appearAt: 0.0,
  },
  {
    name: 'Outlook',
    fill: '#0078D4',
    path: 'M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.33-.76.33-.32.77-.32h13.6q.43 0 .76.32.33.32.33.76V10.85l1.31.99q.1.08.18.22.07.15.07.34zm-6-8.13v3.13h3.5L18 3.87zm-1 4.13V2.5H8v3.5h2.5q.41 0 .7.3.3.29.3.7v6.5q0 .41-.3.7-.29.3-.7.3H8v3.5h9zM6.5 7H1v10h5.5V7zm15.5 5.27-7 5.32V21h7v-8.73z',
    sx: 72,
    sy: -116,
    appearAt: 0.06,
  },
  {
    name: 'WhatsApp',
    fill: '#25D366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    sx: -84,
    sy: -16,
    appearAt: 0.12,
  },
  {
    name: 'Instagram',
    fill: 'url(#ig-grad)',
    gradient: true,
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
    sx: 84,
    sy: 6,
    appearAt: 0.18,
  },
  {
    name: 'Facebook',
    fill: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    sx: -60,
    sy: 110,
    appearAt: 0.24,
  },
  {
    name: 'X',
    fill: '#0a0a0a',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    sx: 66,
    sy: 124,
    appearAt: 0.3,
  },
]

function Glyph({ app, className }: { app: App; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {app.gradient && (
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.35" stopColor="#FA7E1E" />
            <stop offset="0.62" stopColor="#D62976" />
            <stop offset="0.82" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      )}
      <path d={app.path} fill={app.fill} />
    </svg>
  )
}

/** White app tile (the resting "home-screen" look). */
function Tile({ app, className }: { app: App; className?: string }) {
  return (
    <div
      className={
        'grid h-11 w-11 place-items-center rounded-[13px] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.4)] ring-1 ring-black/5 ' +
        (className ?? '')
      }
    >
      <Glyph app={app} className="h-[26px] w-[26px]" />
    </div>
  )
}

function FloatingIcon({ t, app }: { t: MotionValue<number>; app: App }) {
  const x = useTransform(t, [0, 0.45, 0.62], [app.sx, app.sx, 0])
  const y = useTransform(t, [0, 0.45, 0.62], [app.sy, app.sy, 0])
  const opacity = useTransform(t, [app.appearAt, app.appearAt + 0.12, 0.45, 0.6], [0, 1, 1, 0])
  const scale = useTransform(t, [app.appearAt, app.appearAt + 0.12, 0.45, 0.6], [0.6, 1, 1, 0.35])

  return (
    <motion.div style={{ x, y, opacity, scale }} className="pointer-events-none absolute">
      {/* inner span gives a soft idle bob, independent of the converge timeline */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: app.appearAt * 4 }}
      >
        <Tile app={app} />
      </motion.div>
    </motion.div>
  )
}

export function BoxConverge() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInView(ref, { amount: 0.3 })
  const t = useMotionValue(0)

  const boxOpacity = useTransform(t, [0.5, 0.64, 0.9, 0.99], [0, 1, 1, 0])
  const boxScale = useTransform(t, [0.5, 0.64, 0.9, 0.99], [0.45, 1, 1, 0.92])

  useEffect(() => {
    if (reduced || !inView) return
    const controls = animate(t, 1, { duration: 6, ease: 'linear', repeat: Infinity })
    return () => controls.stop()
  }, [reduced, inView, t])

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden rounded-[20px] border border-line"
    >
      <img src={TEXTURE} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />

      {reduced ? (
        // Quiet static frame: Box resolved in the centre, apps faint around it.
        <div className="absolute inset-0 grid place-items-center">
          {APPS.map((app) => (
            <div
              key={app.name}
              className="pointer-events-none absolute opacity-60"
              style={{ transform: `translate(${app.sx}px, ${app.sy}px)` }}
            >
              <Tile app={app} />
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
            className="pointer-events-none absolute h-24 w-24 rounded-[22px] object-cover shadow-[0_14px_40px_rgba(0,0,0,0.55)]"
          />
        </div>
      )}
    </div>
  )
}
