import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * Tekst waar een witte cirkel met de muis over glijdt en er een tweede tekst
 * onthult (uit de Studio Flow-site). Op touch staat gewoon de eerste tekst.
 */
export function MagneticText({ text, hoverText, className }: { text: string; hoverText: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (el) setSize({ width: el.offsetWidth, height: el.offsetHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    let frame = 0
    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.15
      current.current.y += (mouse.current.y - current.current.y) * 0.15
      const { x, y } = current.current
      if (circleRef.current) circleRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (innerRef.current) innerRef.current.style.transform = `translate(${-x}px, ${-y}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const point = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  const textClass =
    'font-serif text-[40px] leading-[1.1] tracking-[-0.025em] whitespace-nowrap sm:text-[60px] lg:text-[72px]'

  return (
    <div
      ref={containerRef}
      onMouseMove={point}
      onMouseEnter={(e) => {
        point(e)
        current.current = { ...mouse.current }
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn('relative inline-flex select-none items-center justify-center md:cursor-none', className)}
    >
      <span className={cn(textClass, 'text-ink')}>{text}</span>
      <div
        ref={circleRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full bg-ink"
        style={{
          width: hovered ? 240 : 0,
          height: hovered ? 240 : 0,
          transition: 'width 0.3s cubic-bezier(0.33, 1, 0.68, 1), height 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
          willChange: 'transform, width, height',
        }}
      >
        <div
          ref={innerRef}
          className="absolute flex items-center justify-center"
          style={{
            width: size.width,
            height: size.height,
            top: '50%',
            left: '50%',
            willChange: 'transform',
          }}
        >
          <span className={cn(textClass, 'text-[#0a0a0a]')}>{hoverText}</span>
        </div>
      </div>
    </div>
  )
}
