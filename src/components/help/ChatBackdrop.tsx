import { useEffect, useRef } from 'react'

/**
 * Ambient animated dot-matrix backdrop, echoing the Nivora AIOS chat's
 * CanvasRevealEffect: white dots on near-black with a slow diagonal opacity
 * wave drifting across them. Pure Canvas 2D, no 3D dependency. Calms to a
 * still field when the visitor prefers reduced motion.
 *
 * Render it absolutely-positioned inside a relative parent and size it with
 * the className (for example "h-full w-full"). It is decorative only.
 */
export function ChatBackdrop({ reduced = false, className }: { reduced?: boolean; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const GAP = 22 // px between dots (denser, closer to the AIOS dot-matrix)
    const RADIUS = 1.35 // dot radius in css px
    const BASE = 0.05 // dimmest opacity
    const PEAK = 0.5 // brightest opacity at a wave crest

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let raf = 0
    let startTs = 0

    const draw = (elapsed: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#ffffff'
      const time = elapsed * 0.00045 // frozen at 0 when reduced
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave =
            Math.sin((x + y) * 0.012 - time * 2) * 0.5 +
            Math.sin(x * 0.018 + time * 1.3) * 0.3 +
            Math.sin(y * 0.02 - time) * 0.2
          const n = (wave + 1) / 2 // 0..1
          const alpha = BASE + (PEAK - BASE) * Math.pow(n, 1.8)
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      if (reduced) draw(0)
    }

    const loop = (now: number) => {
      if (!startTs) startTs = now
      draw(now - startTs)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
