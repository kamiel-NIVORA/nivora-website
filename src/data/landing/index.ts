import type { LandingContent } from './types'
import type { LandingId } from './slugs'

/**
 * Content loading for the landing pages.
 *
 * Each page's copy is its own module under ./content, so Vite gives each one its
 * own chunk and a visitor downloads exactly one page's text, never all of them.
 *
 * On a direct hit the build script (scripts/prerender.mjs) also inlines the page
 * data as JSON in the shell. Reading that synchronously means the very first
 * React commit already has the content, so the prerendered HTML is replaced by
 * an identical React tree with no Suspense fallback flashing in between.
 */

const MODULES = import.meta.glob<{ default: LandingContent }>('./content/*.ts')

/** Dynamic import of one page's copy. Undefined if the content file is missing,
 *  which happens for a registry entry whose copy has not been written yet. */
export function loadLanding(id: LandingId): Promise<{ default: LandingContent }> | undefined {
  return MODULES[`./content/${id}.ts`]?.() as Promise<{ default: LandingContent }> | undefined
}

/** Ids that actually have a content file, so the router never renders a blank
 *  page for a registry entry that is still to be written. */
export const WRITTEN_IDS: ReadonlySet<string> = new Set(
  Object.keys(MODULES).map((path) => path.slice('./content/'.length, -'.ts'.length)),
)

/** Page data inlined into the prerendered shell, when the visitor landed
 *  directly on a landing URL. Null during client-side navigation and in dev.
 *  Carries the language it was rendered for, so a visitor who switches language
 *  falls through to the chunk instead of being served the wrong copy. */
export const INLINE_LANDING: { id: string; lang: 'en' | 'nl'; page: unknown } | null = (() => {
  if (typeof document === 'undefined') return null
  const el = document.getElementById('nivora-landing')
  if (!el?.textContent) return null
  try {
    return JSON.parse(el.textContent) as { id: string; lang: 'en' | 'nl'; page: unknown }
  } catch {
    return null
  }
})()
