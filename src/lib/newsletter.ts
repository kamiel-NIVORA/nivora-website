/**
 * "Keep me posted" signup. Posts to the Nivora backend, which stores the email
 * as `pending` and sends a double opt-in confirmation mail (the subscriber only
 * becomes active after clicking the link). The backend base URL falls back to
 * the known production API so this works on deploy without extra config.
 */
const API_BASE = import.meta.env.VITE_NIVORA_API || 'https://nivora-api.srv938837.hstgr.cloud'

export type SubscribeResult = {
  ok: boolean
  /** 'pending' (confirm mail sent) | 'already_subscribed' */
  status?: string
  error?: string
}

export async function subscribe(input: {
  email: string
  name?: string
  product?: string
}): Promise<SubscribeResult> {
  try {
    const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email.trim(),
        name: input.name?.trim() || undefined,
        product: input.product || undefined,
        source: input.product ? `website:${input.product}` : 'website',
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok === false) {
      return { ok: false, error: data.error || 'Something went wrong. Please try again.' }
    }
    return { ok: true, status: data.status }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' }
  }
}
