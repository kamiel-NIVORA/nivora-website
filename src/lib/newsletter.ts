/**
 * "Keep me posted" signup. Posts to the Nivora backend, which stores the email
 * as `pending` and (once Resend is wired) sends a double opt-in confirmation
 * mail. We go through a SAME-ORIGIN proxy (`/nivora-api/*`, rewritten to the API
 * by Vercel and the Vite dev server) instead of calling the backend directly:
 * the API does not send an `Access-Control-Allow-Origin` header, so a direct
 * browser fetch is blocked by CORS. Proxying makes the request same-origin, so
 * there is no preflight and no CORS to satisfy.
 */
import type { Lang } from '@/i18n'

const API_BASE = '/nivora-api'

/** User-facing fallback messages, localized. The backend may also return its own
 *  `error` string; that is shown verbatim when present. */
const MESSAGES: Record<Lang, { generic: string; network: string }> = {
  en: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection and try again.',
  },
  nl: {
    generic: 'Er ging iets mis. Probeer het opnieuw.',
    network: 'Netwerkfout. Controleer uw verbinding en probeer het opnieuw.',
  },
}

export type SubscribeResult = {
  ok: boolean
  /** 'pending' | 'already_subscribed' */
  status?: string
  /** Whether the backend actually sent the confirmation mail. */
  emailSent?: boolean
  error?: string
}

export async function subscribe(input: {
  email: string
  name?: string
  /** Optional phone number, captured on the waitlist so we can reach people who
   *  prefer a text over an email. Sent to the backend alongside the email. */
  phone?: string
  /** Affiliate signups only: why this person wants to become an affiliate of
   *  Box and Voice. Stored in the Nivora system next to the subscriber. */
  vision?: string
  product?: string
  /** Overrides the derived source, e.g. 'newsletter:home' so the AIOS can see
   *  where a lead came in from. Falls back to the product / generic website tag. */
  source?: string
  /** Active UI language, used to localize the fallback error messages. Optional
   *  so existing callers keep working; defaults to English. */
  lang?: Lang
}): Promise<SubscribeResult> {
  const t = MESSAGES[input.lang ?? 'en']
  try {
    const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email.trim(),
        name: input.name?.trim() || undefined,
        phone: input.phone?.trim() || undefined,
        vision: input.vision?.trim() || undefined,
        product: input.product || undefined,
        source: input.source || (input.product ? `website:${input.product}` : 'website'),
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok === false) {
      return { ok: false, error: data.error || t.generic }
    }
    return { ok: true, status: data.status, emailSent: data.email_sent === true }
  } catch {
    return { ok: false, error: t.network }
  }
}
