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
    title: 'Discover the profit you leave on the table',
    subtitle:
      'Add up what recurring work costs your company every year. What you leave behind tends to surprise people.',
  },
}

export const SERVICE_ROI_NL: Partial<Record<ServiceSlug, RoiFraming>> = {
  aios: {
    title: 'Ontdek de winst die u laat liggen',
    subtitle:
      'Reken uit wat het terugkerende werk uw bedrijf elk jaar kost. Wat u laat liggen, verrast de meeste mensen.',
  },
}

/** Resolve the ROI framing map for the active language. */
export const getServiceRoi = (lang: Lang): Partial<Record<ServiceSlug, RoiFraming>> =>
  lang === 'nl' ? SERVICE_ROI_NL : SERVICE_ROI_EN
