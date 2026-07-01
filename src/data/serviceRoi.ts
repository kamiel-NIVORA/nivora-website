import type { Lang } from '@/i18n'
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
 *
 * Bilingual: SERVICE_ROI_EN / SERVICE_ROI_NL, resolved via getServiceRoi(lang).
 */

export type RoiFraming = {
  /** Short heading over the calculator. */
  title: string
  /** One line that sets up the number. */
  subtitle: string
}

export const SERVICE_ROI_EN: Partial<Record<ServiceSlug, RoiFraming>> = {
  // Only AIOS shows the calculator (Kamiel, 2026-06-23). App Design and Local AI
  // no longer show it; AI Consulting never did.
  aios: {
    title: 'Put a number on it',
    subtitle:
      'Add up what tool-switching and double entry cost your team over a year. The number tends to surprise people.',
  },
}

export const SERVICE_ROI_NL: Partial<Record<ServiceSlug, RoiFraming>> = {
  aios: {
    title: 'Zet er een getal op',
    subtitle:
      'Tel op wat schakelen tussen tools en dubbele invoer uw team over een jaar kosten. Het getal verrast de meeste mensen.',
  },
}

/** Resolve the ROI framing map for the active language. */
export const getServiceRoi = (lang: Lang): Partial<Record<ServiceSlug, RoiFraming>> =>
  lang === 'nl' ? SERVICE_ROI_NL : SERVICE_ROI_EN
