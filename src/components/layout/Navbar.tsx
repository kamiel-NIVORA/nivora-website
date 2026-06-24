import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RippleButton } from '@/components/ui/RippleButton'
import { cn } from '@/lib/utils'
import {
  COMPANY_PRIMARY,
  PRODUCTS,
  RESOURCES,
  SERVICES,
  type NavItem as Item,
} from '@/lib/navigation'
import { useContactModal } from '@/components/contact/ContactModal'

const ease = [0.22, 1, 0.36, 1] as const

const MENU = ['Products', 'Services', 'Company', 'Resources']
const ORDER: Record<string, number> = { Products: 0, Services: 1, Company: 2, Resources: 3 }

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -d * 28 }),
}

/* Small, elegant "coming soon" tag — used next to Products. */
function ComingSoonTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-line bg-white/[0.04] px-1.5 py-[2.5px] text-[9px] font-medium normal-case leading-none tracking-normal text-faint',
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-olive shadow-[0_0_6px_rgba(150,167,102,0.7)]" />
      Coming soon
    </span>
  )
}

/* ── Item primitives ── */
function CardItem({ title, desc, href, Icon, img, iconImg, comingSoon }: Item) {
  return (
    <a href={href} className="group/i flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06]">
      {img ? (
        <img
          src={img}
          alt={title}
          className="mt-0.5 h-9 w-9 shrink-0 rounded-[10px] border border-line object-cover"
          loading="lazy"
        />
      ) : (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white/[0.04] text-ink-soft transition-colors group-hover/i:bg-white/[0.08]">
          {iconImg ? (
            <img src={iconImg} alt="" className="h-5 w-5 object-contain" loading="lazy" />
          ) : (
            Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          )}
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-semibold leading-tight text-ink">{title}</span>
          {comingSoon && <ComingSoonTag />}
        </span>
        {desc && <span className="mt-1 block text-[13px] leading-snug text-faint">{desc}</span>}
      </span>
    </a>
  )
}

/* Short clickable line under the panel — opens the contact popup. */
function InterestedRow({ label, onSelect }: { label: string; onSelect?: () => void }) {
  const { open } = useContactModal()
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.()
        open()
      }}
      className="group/c mt-2.5 inline-flex items-center gap-1.5 px-3 text-[13px]"
    >
      <span className="text-faint">Interested?</span>
      <span className="font-medium text-ink transition-colors group-hover/c:text-white">{label}</span>
      <ArrowRight className="h-3.5 w-3.5 text-ink transition-transform duration-200 group-hover/c:translate-x-0.5" strokeWidth={1.8} />
    </button>
  )
}

const PANELS: Record<string, { items: Item[]; label?: string }> = {
  Products: { items: PRODUCTS, label: 'Book a demo' },
  Services: { items: SERVICES, label: 'Book a strategy call' },
  Company: { items: COMPANY_PRIMARY, label: 'Get in touch' },
  Resources: { items: RESOURCES },
}

function PanelContent({ active, onSelect }: { active: string; onSelect?: () => void }) {
  const panel = PANELS[active] ?? PANELS.Products

  return (
    <div className="w-[360px]">
      {/* One clean frame holding every item for this menu */}
      <div className="flex flex-col rounded-2xl border border-line bg-white/[0.03] p-2">
        {panel.items.map((it) => (
          <CardItem key={it.title} {...it} />
        ))}
      </div>
      {panel.label && <InterestedRow label={panel.label} onSelect={onSelect} />}
    </div>
  )
}

/* Slim launch announcement that floats above the bar and points at the waitlist.
 *  Dismissible, and the choice is remembered so it stays out of the way. */
function LaunchBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(localStorage.getItem('nivora.launchBanner.dismissed') !== '1')
  }, [])

  if (!show) return null

  return (
    <div className="mx-auto mb-2 flex w-full max-w-[1200px] items-stretch gap-2">
      <a
        href="/waitlist"
        className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-black/55 px-4 py-2 text-[12.5px] text-muted shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:text-ink"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-olive shadow-[0_0_8px_rgba(150,167,102,0.7)]" />
        <span className="hidden sm:inline">Box and Voice are coming.</span>
        <span className="font-medium text-ink">Get notified at launch</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
      </a>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          localStorage.setItem('nivora.launchBanner.dismissed', '1')
          setShow(false)
        }}
        className="flex w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-black/55 text-faint backdrop-blur-xl transition-colors hover:text-ink"
      >
        <X className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [dir, setDir] = useState(1)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  const closeSoon = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setActive(null), 130)
  }
  const openMenu = (label: string) => {
    cancelClose()
    setActive((prev) => {
      if (prev && prev !== label) setDir(ORDER[label] > ORDER[prev] ? 1 : -1)
      return label
    })
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <LaunchBanner />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <motion.nav
          initial={false}
          animate={{ maxWidth: scrolled ? 1080 : 1200 }}
          transition={{ duration: 0.4, ease }}
          className={cn(
            'mx-auto w-full rounded-2xl transition-[background-color,box-shadow,backdrop-filter] duration-300',
            scrolled
              ? 'bg-black/55 px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'px-2 py-2',
          )}
        >
          <div className="flex items-center justify-between">
            {/* Left: logo */}
            <a href="/" className="flex items-center pl-1" aria-label="Nivora works home">
              <img src="/nivora-logo.png" alt="Nivora" className="h-[22px] w-auto" />
            </a>

            {/* Center: links */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <div className="flex items-center gap-1">
                {MENU.map((label) => (
                  <button
                    key={label}
                    onMouseEnter={() => openMenu(label)}
                    onMouseLeave={closeSoon}
                    className={cn(
                      'flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors',
                      active === label ? 'bg-white/[0.07] text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform duration-300', active === label && 'rotate-180')}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: actions */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <RippleButton variant="ghost" href="/#contact">Contact Us</RippleButton>
              <RippleButton href="/#contact">Book a call</RippleButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile panel */}
          {open && (
            <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 lg:hidden">
              <p className="px-2 pb-1 pt-2 text-[11px] uppercase tracking-wide text-dim">Products</p>
              {PRODUCTS.map((l) => (
                <a key={l.title} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink">{l.title}</a>
              ))}
              <p className="px-2 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">Services</p>
              {SERVICES.map((l) => (
                <a key={l.title} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink">{l.title}</a>
              ))}
              <p className="px-2 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">Company</p>
              {COMPANY_PRIMARY.map((l) => (
                <a key={l.title} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink">
                  {l.title}
                  {l.comingSoon && <ComingSoonTag />}
                </a>
              ))}
              <p className="px-2 pb-1 pt-3 text-[11px] uppercase tracking-wide text-dim">Resources</p>
              {RESOURCES.map((l) => (
                <a key={l.title} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-ink">{l.title}</a>
              ))}
              <Button size="sm" className="mt-2" asChild>
                <a href="/#contact" onClick={() => setOpen(false)}>Book a call</a>
              </Button>
            </div>
          )}
        </motion.nav>

        {/* Dropdown — rendered OUTSIDE the nav so its backdrop-filter samples the page
            directly (same frosted blur as the scrolled bar). It unfolds from the bar
            on hover and folds back smoothly on leave; switching menus keeps the panel
            up and only slides its contents. */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="nav-dropdown"
              initial={{ opacity: 0, y: 4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.22, ease }}
              style={{ transformOrigin: 'top center' }}
              className="absolute left-0 right-0 top-full hidden justify-center pt-2 lg:flex"
              onMouseEnter={cancelClose}
              onMouseLeave={closeSoon}
            >
              <div className="relative">
                {/* Static frosted-glass layer — identical blur to the bar */}
                <div className="absolute inset-0 rounded-[20px] border border-line bg-black/55 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[20px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Animated content on top of the blur */}
                <div className="relative overflow-hidden p-2.5">
                  <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                    <motion.div
                      key={active}
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease }}
                    >
                      <PanelContent active={active} onSelect={() => setActive(null)} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
