import { useState, type MouseEvent, type ReactNode } from 'react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Witte knop waarvan het pijlrondje bij hover over de hele knop schuift
 * (uit de Studio Flow-site).
 */
export function ArrowButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative inline-flex h-14 items-center overflow-hidden rounded-full bg-ink pl-8 pr-[4.25rem] text-[16px] font-medium text-[#0a0a0a] transition-transform active:scale-[0.97] sm:h-16 sm:pl-10 sm:pr-20 sm:text-[17px]',
        className,
      )}
    >
      <span className="transition-opacity duration-500 group-hover:opacity-0">{children}</span>
      <span className="absolute bottom-1.5 right-1.5 top-1.5 z-10 grid w-11 place-items-center rounded-full bg-black/[0.07] transition-all duration-500 group-hover:w-[calc(100%-0.75rem)] sm:w-[3.25rem]">
        <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.4} />
      </span>
    </a>
  )
}

type Cursor = { x: number; y: number; side: 'prev' | 'next' }

/**
 * Een kader waar de cursor een ronde pijlknop wordt, zoals bij de productfoto's
 * op de site van Tafereel: linkerhelft vorige, rechterhelft volgende, klikken
 * bladert. Op touch veeg je, of tik je links of rechts.
 */
export function CursorNav({
  onPrev,
  onNext,
  onHover,
  className,
  children,
  overlay,
}: {
  /** Knoppen bovenop het kader; daar blijft de gewone cursor. */
  overlay?: ReactNode
  onPrev: () => void
  onNext: () => void
  /** Laat de ouder weten of de muis erboven hangt (om het afspelen te pauzeren). */
  onHover?: (hovering: boolean) => void
  className?: string
  children: ReactNode
}) {
  const [cursor, setCursor] = useState<Cursor | null>(null)
  const [touch, setTouch] = useState<{ x: number; y: number } | null>(null)

  // Boven eigen knoppen (data-plain) is de cursor gewoon een cursor.
  const plain = (e: MouseEvent<HTMLDivElement>) => !!(e.target as HTMLElement).closest('[data-plain]')

  const sideOf = (e: MouseEvent<HTMLDivElement>): Cursor => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    return { x, y: e.clientY - r.top, side: x < r.width / 2 ? 'prev' : 'next' }
  }

  return (
    <div
      onMouseMove={(e) => setCursor(plain(e) ? null : sideOf(e))}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => {
        setCursor(null)
        onHover?.(false)
      }}
      onTouchStart={(e) => setTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch) return
        const dx = e.changedTouches[0].clientX - touch.x
        const dy = e.changedTouches[0].clientY - touch.y
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? onNext : onPrev)()
        setTouch(null)
      }}
      onClick={(e) => {
        if (plain(e)) return
        ;(sideOf(e).side === 'prev' ? onPrev : onNext)()
      }}
      className={cn('relative cursor-pointer touch-pan-y select-none md:cursor-none', className)}
    >
      {children}
      {overlay}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-20 hidden h-16 w-16 items-center justify-center rounded-full bg-ink/90 text-[#0a0a0a] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md md:flex',
          'transition-[opacity,scale] duration-200 ease-out',
          cursor ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
        )}
        style={{
          transform: cursor ? `translate3d(${cursor.x - 32}px, ${cursor.y - 32}px, 0)` : undefined,
        }}
      >
        <ChevronRight
          className={cn('h-5 w-5 transition-transform duration-200', cursor?.side === 'prev' && 'rotate-180')}
          strokeWidth={2}
        />
      </span>
    </div>
  )
}
