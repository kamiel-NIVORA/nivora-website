import type { ServiceSlug } from './serviceContent'

/**
 * ROI framing copy, per service.
 *
 * The calculator itself is one honest, universal model (people, hours a day on
 * repetitive work, and what an hour costs) that shows the money sitting on the
 * table every year. We don't name a price here, we just put a real number next
 * to the cost of doing nothing.
 *
 * Only AIOS shows the calculator now (it is where the tool-switching cost is
 * most concrete). Any service with no entry here simply skips the ROI band.
 */

export type RoiFraming = {
  eyebrow: string
  /** One serif line that sets up the number. */
  framing: string
}

export const SERVICE_ROI: Partial<Record<ServiceSlug, RoiFraming>> = {
  // Only AIOS shows the calculator (Kamiel, 2026-06-23). App Design and Local AI
  // no longer show it; AI Consulting never did.
  aios: {
    eyebrow: 'The cost of doing nothing',
    framing:
      'Add up what tool-switching and double entry really cost your team across a year. The number tends to surprise people.',
  },
}
