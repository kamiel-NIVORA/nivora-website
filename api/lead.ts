/**
 * Website lead capture, server-side (Vercel Node Serverless Function).
 *
 * Until now the marketing site had exactly one writing call, to the newsletter.
 * Nothing on the site could put a person into the CRM. This closes that gap.
 *
 * A lead lands in Supabase `partial_bookings`, the same table the booking app
 * uses for people who start a booking and drop out. That choice is deliberate:
 * the table is already on the realtime publication, so three things come for
 * free and need no work in the CRM project.
 *
 *   - a live toast in the Nivora dashboard the moment someone submits
 *   - the existing Leads page lists it
 *   - the 30-minute follow-up mailer picks it up
 *
 * `source` carries where it came from, in the `namespace:detail` convention the
 * site already uses elsewhere (`newsletter:home`, `waitlist:voice`). Here that
 * is `website:<page>`, e.g. `website:ai-automatisering-imo-kantoor`.
 *
 * Wire-up: set SUPABASE_SERVICE_ROLE_KEY in the Vercel project env. The service
 * key stays on the server and is never shipped to the browser, which is the
 * whole reason this is a function rather than a direct insert from the client.
 */

declare const process: { env: Record<string, string | undefined> }

export const config = { maxDuration: 15 }

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://agpjxjujzjzasgizpphz.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/* Same soft origin gate as api/help-chat.ts: stops casual cross-site posting
   without getting in the way of any Vercel preview alias. */
const ALLOWED_HOSTS = ['nivoraworks.com', 'www.nivoraworks.com', 'localhost', '127.0.0.1']
const originAllowed = (origin: string | undefined): boolean => {
  if (!origin) return true // same-origin form posts send no Origin header
  try {
    const host = new URL(origin).hostname
    return ALLOWED_HOSTS.includes(host) || host.endsWith('.vercel.app')
  } catch {
    return false
  }
}

const clamp = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/** Deliberately permissive: rejecting an interested person over a regex is a
 *  worse outcome than accepting one malformed address. */
const looksLikeEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

type Req = {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
}
type Res = {
  status: (code: number) => Res
  json: (body: unknown) => void
  setHeader: (k: string, v: string) => void
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }
  const origin = (req.headers.origin as string | undefined) ?? undefined
  if (!originAllowed(origin)) {
    return res.status(403).json({ ok: false, error: 'forbidden_origin' })
  }
  if (!SERVICE_KEY) {
    // Fail loudly in logs, quietly to the visitor: they should not see plumbing.
    console.error('lead: SUPABASE_SERVICE_ROLE_KEY is not set')
    return res.status(500).json({ ok: false, error: 'not_configured' })
  }

  const raw = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as
    | Record<string, unknown>
    | undefined
  if (!raw) return res.status(400).json({ ok: false, error: 'bad_request' })

  const email = clamp(raw.email, 200).toLowerCase()
  const fullName = clamp(raw.name, 120)
  const company = clamp(raw.company, 160)
  const phone = clamp(raw.phone, 40)
  const question = clamp(raw.question, 2000)
  const page = clamp(raw.page, 120) || 'onbekend'
  const topics = Array.isArray(raw.topics)
    ? (raw.topics as unknown[]).map((t) => clamp(t, 60)).filter(Boolean).slice(0, 8)
    : []

  if (!looksLikeEmail(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }

  /* partial_bookings has no free-text column for a message, so the question and
     the chosen topics ride along in `last_step`, which the Leads page already
     renders. Keeping the page in there too means the CRM shows which landing
     page produced the lead without any change on that side. */
  const context = [
    company && `Bedrijf: ${company}`,
    topics.length && `Interesse: ${topics.join(', ')}`,
    question && `Vraag: ${question}`,
  ]
    .filter(Boolean)
    .join(' | ')
    .slice(0, 1500)

  const row = {
    full_name: fullName || null,
    email,
    phone: phone || null,
    product: null,
    meeting_mode: null,
    source: `website:${page}`,
    last_step: context || 'website-formulier',
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/partial_bookings?on_conflict=email`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        // Upsert: email is UNIQUE, so a second submission updates rather than 409s.
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(row),
    })
    if (!r.ok) {
      console.error('lead: supabase insert failed', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'upstream' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('lead: network error', err)
    return res.status(502).json({ ok: false, error: 'upstream' })
  }
}

function safeParse(s: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(s)
  } catch {
    return undefined
  }
}
