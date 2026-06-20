import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li'
  /** 'inView' (default) animates when scrolled into view; 'mount' animates once
   *  on load — use for content that may sit below the fold but must be visible. */
  mode?: 'inView' | 'mount'
}

/** Fade + lift + de-blur — mirrors Framer's reveal feel. */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div', mode = 'inView' }: RevealProps) {
  const MotionTag = motion[as]
  const hidden = { opacity: 0, y, filter: 'blur(8px)' }
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)' }
  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }

  if (mode === 'mount') {
    return (
      <MotionTag className={className} initial={hidden} animate={shown} transition={transition}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={transition}
    >
      {children}
    </MotionTag>
  )
}
