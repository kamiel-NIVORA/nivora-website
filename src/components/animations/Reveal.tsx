import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  /** Zijwaartse aanloop. Nul voor bijna alles; een lijst die je regel per regel
   *  afleest komt mooier vanuit de leesrichting binnen dan van onderen. */
  x?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li'
  /** 'inView' (default) animates when scrolled into view; 'mount' animates once
   *  on load — use for content that may sit below the fold but must be visible. */
  mode?: 'inView' | 'mount'
}

/** Fade + lift + de-blur — mirrors Framer's reveal feel. */
export function Reveal({ children, delay = 0, y = 24, x = 0, className, as = 'div', mode = 'inView' }: RevealProps) {
  /* The build script (scripts/prerender.mjs) renders these very components to
     static HTML for the landing pages. Motion's `initial` state would bake
     style="opacity:0" into that HTML, which hides the copy from every crawler
     that does not run JavaScript and blanks the first paint for everyone else.
     On the server we therefore emit the finished, visible state. Vite compiles
     import.meta.env.SSR to a literal `false` in the browser build, so this
     branch is dead-code-eliminated from the client bundle. */
  if (import.meta.env.SSR) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as]
  const hidden = { opacity: 0, y, x, filter: 'blur(8px)' }
  const shown = { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
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
