import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'

// Types for the component
export interface DockApp {
  id: string
  name: string
  icon: string
}

interface MacOSDockProps {
  apps: DockApp[]
  onAppClick: (appId: string) => void
  openApps?: string[]
  className?: string
}

/**
 * Authentic macOS dock with cosine-based magnification on hover. Icons sit at
 * their resting size; as the cursor nears, they and their neighbours swell.
 * Self-contained (no external deps); falls back to a CSS bounce on click.
 */
const MacOSDock: React.FC<MacOSDockProps> = ({ apps, onAppClick, openApps = [], className = '' }) => {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMouseMoveTime = useRef<number>(0)

  // The real width the dock has to fit in (its card column), measured — never the
  // viewport. This is what keeps the dock from spilling out of its card on phones
  // and iPad landscape. Starts unconstrained until the first measurement lands.
  const [containerWidth, setContainerWidth] = useState<number>(Number.POSITIVE_INFINITY)

  // Resting icon size + magnify feel, keyed off the viewport.
  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 56, maxScale: 1.6, effectWidth: 240 }
    }
    const smallerDimension = Math.min(window.innerWidth, window.innerHeight)
    if (smallerDimension < 480) {
      return { baseIconSize: Math.max(38, smallerDimension * 0.072), maxScale: 1.45, effectWidth: smallerDimension * 0.4 }
    } else if (smallerDimension < 768) {
      return { baseIconSize: Math.max(44, smallerDimension * 0.06), maxScale: 1.5, effectWidth: smallerDimension * 0.35 }
    } else if (smallerDimension < 1024) {
      return { baseIconSize: Math.max(48, smallerDimension * 0.05), maxScale: 1.6, effectWidth: smallerDimension * 0.3 }
    } else {
      return { baseIconSize: 64, maxScale: 1.7, effectWidth: 280 }
    }
  }, [])

  const [config, setConfig] = useState(getResponsiveConfig)
  const { maxScale, effectWidth } = config
  const vpBaseIconSize = config.baseIconSize
  const minScale = 1.0

  // Fit the dock to its container: shrink the resting icon size until the whole
  // row fits the measured card width, and only when icons would get uncomfortably
  // small do we drop the outermost apps (Box and Voice sit in the middle, so they
  // always survive). On a roomy desktop the loop returns the viewport size, so the
  // dock stays exactly as designed; on a narrow card it can never exceed the width.
  const { visibleApps, baseIconSize } = useMemo(() => {
    const ABS_MIN = 30
    const COMFORT_MIN = 40
    const MIN_APPS = 5
    const fitIconSize = (avail: number, count: number, maxS: number) => {
      for (let s = Math.round(maxS); s >= ABS_MIN; s--) {
        const spacing = Math.max(4, s * 0.08)
        const pad = Math.max(8, s * 0.12)
        if (count * s + (count - 1) * spacing + 2 * pad <= avail) return s
      }
      return ABS_MIN
    }
    if (!Number.isFinite(containerWidth)) {
      return { visibleApps: apps, baseIconSize: vpBaseIconSize }
    }
    let count = apps.length
    let size = fitIconSize(containerWidth, count, vpBaseIconSize)
    while (count > MIN_APPS && size < COMFORT_MIN) {
      count -= 1
      size = fitIconSize(containerWidth, count, vpBaseIconSize)
    }
    if (count >= apps.length) return { visibleApps: apps, baseIconSize: size }
    const start = Math.max(0, Math.floor((apps.length - count) / 2))
    return { visibleApps: apps.slice(start, start + count), baseIconSize: size }
  }, [apps, containerWidth, vpBaseIconSize])

  const baseSpacing = Math.max(4, baseIconSize * 0.08)

  const [currentScales, setCurrentScales] = useState<number[]>(() => apps.map(() => 1))
  const [currentPositions, setCurrentPositions] = useState<number[]>([])

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getResponsiveConfig])

  // Measure the card column the dock lives in (not the viewport) and re-fit on resize.
  useEffect(() => {
    const el = dockRef.current?.parentElement
    if (!el) return
    if (typeof ResizeObserver === 'undefined') {
      setContainerWidth(el.clientWidth || el.getBoundingClientRect().width)
      return
    }
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setContainerWidth(w)
    })
    ro.observe(el)
    setContainerWidth(el.clientWidth || el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  // Authentic macOS cosine-based magnification algorithm
  const calculateTargetMagnification = useCallback(
    (mousePosition: number | null) => {
      if (mousePosition === null) return visibleApps.map(() => minScale)
      return visibleApps.map((_, index) => {
        const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2
        const minX = mousePosition - effectWidth / 2
        const maxX = mousePosition + effectWidth / 2
        if (normalIconCenter < minX || normalIconCenter > maxX) return minScale
        const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI
        const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI)
        const scaleFactor = (1 - Math.cos(cappedTheta)) / 2
        return minScale + scaleFactor * (maxScale - minScale)
      })
    },
    [visibleApps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale],
  )

  const calculatePositions = useCallback(
    (scales: number[]) => {
      let currentX = 0
      return scales.map((scale) => {
        const scaledWidth = baseIconSize * scale
        const centerX = currentX + scaledWidth / 2
        currentX += scaledWidth + baseSpacing
        return centerX
      })
    },
    [baseIconSize, baseSpacing],
  )

  useEffect(() => {
    const initialScales = visibleApps.map(() => minScale)
    setCurrentScales(initialScales)
    setCurrentPositions(calculatePositions(initialScales))
  }, [visibleApps, calculatePositions, minScale])

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX)
    const targetPositions = calculatePositions(targetScales)
    const lerpFactor = mouseX !== null ? 0.2 : 0.12

    setCurrentScales((prevScales) =>
      prevScales.map((currentScale, index) => currentScale + (targetScales[index] - currentScale) * lerpFactor),
    )
    setCurrentPositions((prevPositions) =>
      prevPositions.map((currentPos, index) => currentPos + ((targetPositions[index] ?? currentPos) - currentPos) * lerpFactor),
    )

    const scalesNeedUpdate = currentScales.some((scale, index) => Math.abs(scale - targetScales[index]) > 0.002)
    const positionsNeedUpdate = currentPositions.some((pos, index) => Math.abs(pos - (targetPositions[index] ?? pos)) > 0.1)
    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget)
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions])

  useEffect(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    animationFrameRef.current = requestAnimationFrame(animateToTarget)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [animateToTarget])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseMoveTime.current < 16) return
      lastMouseMoveTime.current = now
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect()
        const padding = Math.max(8, baseIconSize * 0.12)
        setMouseX(e.clientX - rect.left - padding)
      }
    },
    [baseIconSize],
  )

  const handleMouseLeave = useCallback(() => setMouseX(null), [])

  const createBounceAnimation = (element: HTMLElement) => {
    const bounceHeight = Math.max(-8, -baseIconSize * 0.15)
    element.style.transition = 'transform 0.2s ease-out'
    element.style.transform = `translateY(${bounceHeight}px)`
    setTimeout(() => {
      element.style.transform = 'translateY(0px)'
    }, 200)
  }

  const handleAppClick = (appId: string, index: number) => {
    const el = iconRefs.current[index]
    if (el) createBounceAnimation(el)
    onAppClick(appId)
  }

  const contentWidth =
    currentPositions.length > 0
      ? Math.max(...currentPositions.map((pos, index) => pos + (baseIconSize * currentScales[index]) / 2))
      : visibleApps.length * (baseIconSize + baseSpacing) - baseSpacing

  const padding = Math.max(8, baseIconSize * 0.12)

  return (
    <div
      ref={dockRef}
      className={`backdrop-blur-md ${className}`}
      style={{
        width: `${contentWidth + padding * 2}px`,
        background: 'rgba(20, 20, 20, 0.7)',
        borderRadius: `${Math.max(12, baseIconSize * 0.4)}px`,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.25)`,
        padding: `${padding}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative" style={{ height: `${baseIconSize}px`, width: '100%' }}>
        {visibleApps.map((app, index) => {
          const scale = currentScales[index] ?? 1
          const position = currentPositions[index] || 0
          const scaledSize = baseIconSize * scale
          return (
            <div
              key={app.id}
              ref={(el) => {
                iconRefs.current[index] = el
              }}
              className="absolute flex cursor-pointer flex-col items-center justify-end"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: '0px',
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: 'bottom center',
                zIndex: Math.round(scale * 10),
              }}
            >
              <img
                src={app.icon}
                alt={app.name}
                width={scaledSize}
                height={scaledSize}
                className="object-contain transition-transform duration-150 active:scale-90"
                style={{
                  filter: `drop-shadow(0 ${scale > 1.2 ? Math.max(2, baseIconSize * 0.05) : Math.max(1, baseIconSize * 0.03)}px ${scale > 1.2 ? Math.max(4, baseIconSize * 0.1) : Math.max(2, baseIconSize * 0.06)}px rgba(0,0,0,${0.2 + (scale - 1) * 0.15}))`,
                }}
              />
              {openApps.includes(app.id) && (
                <div
                  className="absolute"
                  style={{
                    bottom: `${Math.max(-2, -baseIconSize * 0.05)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${Math.max(3, baseIconSize * 0.06)}px`,
                    height: `${Math.max(3, baseIconSize * 0.06)}px`,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MacOSDock
