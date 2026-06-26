import { motion } from 'framer-motion'

/**
 * ProcessTimeline — a compact "how we work" timeline.
 *
 * Adapted from a provided RoadmapCard into the Nivora language: a hairline track
 * that draws itself in the accent colour as it scrolls into view, with a node
 * per step (accent dot, a short phase badge, title, and one tight line). Reads
 * left-to-right on desktop and top-to-bottom on mobile.
 */

export type ProcessStep = {
  /** short phase word, e.g. "Listen" */
  phase: string
  title: string
  body: string
}

const ease = [0.16, 1, 0.3, 1] as const

function Node({ step, i, accent }: { step: ProcessStep; i: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.14, ease }}
      className="relative"
    >
      <div className="flex items-center gap-3 sm:block">
        {/* dot sitting on the track */}
        <span
          className="relative z-10 grid h-4 w-4 shrink-0 place-items-center rounded-full ring-4 ring-bg"
          style={{ background: accent }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-bg" />
        </span>
        <span
          className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:mt-5"
          style={{ borderColor: `${accent}59`, color: accent, background: `${accent}14` }}
        >
          {step.phase}
        </span>
      </div>
      <h3 className="mt-3 pl-7 text-[16px] font-semibold tracking-tight text-ink sm:mt-4 sm:pl-0 sm:text-[17px]">{step.title}</h3>
      <p className="mt-2 pl-7 text-[13.5px] leading-relaxed text-faint sm:pl-0">{step.body}</p>
    </motion.div>
  )
}

export function ProcessTimeline({ steps, accent }: { steps: ProcessStep[]; accent: string }) {
  return (
    <div className="relative">
      {/* Desktop: horizontal track that draws in */}
      <div className="relative hidden sm:block">
        <div className="absolute inset-x-0 top-2 h-px bg-line" />
        <motion.div
          className="absolute left-0 top-2 h-px origin-left"
          style={{ background: `linear-gradient(to right, ${accent}, ${accent}33)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.1, ease }}
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-6">
          {steps.map((step, i) => (
            <Node key={step.title} step={step} i={i} accent={accent} />
          ))}
        </div>
      </div>

      {/* Mobile: vertical track */}
      <div className="relative sm:hidden">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-line" />
        <motion.div
          className="absolute left-2 top-2 w-px origin-top"
          style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}33)`, bottom: '0.5rem' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />
        <div className="flex flex-col gap-8 pl-0">
          {steps.map((step, i) => (
            <Node key={step.title} step={step} i={i} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  )
}
