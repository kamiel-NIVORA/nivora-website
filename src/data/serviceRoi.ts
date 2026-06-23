import type { ServiceSlug } from './serviceContent'

/**
 * ROI framing copy, per service.
 *
 * The calculator itself is one honest, universal model (people, hours a day on
 * repetitive work, and what an hour costs) that shows the money sitting on the
 * table every year. We don't name a price here, we just put a real number next
 * to the cost of doing nothing.
 *
 * AI Consulting is deliberately absent: its value is the plan and the proof
 * before you spend, not hours clawed back, so it shows no calculator. A service
 * with no entry here simply skips the ROI band.
 */

export type RoiFraming = {
  eyebrow: string
  /** One serif line that sets up the number. */
  framing: string
}

export const SERVICE_ROI: Partial<Record<ServiceSlug, RoiFraming>> = {
  'app-design': {
    eyebrow: 'The cost of doing nothing',
    framing:
      'Put in your own numbers and see what the manual work is quietly costing you, every single year.',
  },
  'local-ai': {
    eyebrow: 'The cost of doing nothing',
    framing:
      'See what your team spends, year after year, on the repetitive work a private assistant could take off their plate.',
  },
  aios: {
    eyebrow: 'The cost of doing nothing',
    framing:
      'Add up what tool-switching and double entry really cost your team across a year. The number tends to surprise people.',
  },
}
