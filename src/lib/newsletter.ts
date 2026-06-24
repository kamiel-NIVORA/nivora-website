/**
 * "Keep me posted" signup. Posts to the Nivora backend, which stores the email
 * as `pending` and (once Resend is wired) sends a double opt-in confirmation
 * mail. We go through a SAME-ORIGIN proxy (`/nivora-api/*`, rewritten to the API
 * by Vercel and the Vite dev server) instead of calling the backend directly:
 * the API does not send an `Access-Control-Allow-Origin` header, so a direct
 * browser fetch is blocked by CORS. Proxying makes the request same-origin, so
 * there is no preflight and no CORS to satisfy.
 */
const API_BASE = '/nivora-api'

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
  product?: string
  /** Overrides the derived source, e.g. 'newsletter:home' so the AIOS can see
   *  where a lead came in from. Falls back to the product / generic website tag. */
  source?: string
}): Promise<SubscribeResult> {
  try {
    const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email.trim(),
        name: input.name?.trim() || undefined,
        product: input.product || undefined,
        source: input.source || (input.product ? `website:${input.product}` : 'website'),
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok === false) {
      return { ok: false, error: data.error || 'Something went wrong. Please try again.' }
    }
    return { ok: true, status: data.status, emailSent: data.email_sent === true }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' }
  }
}
