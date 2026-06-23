/**
 * Newsletter signup. Writes to the shared Supabase `newsletter_subscribers`
 * table (the AIOS Outbound > Newsletter tool reads + sends from the same list).
 * The anon key is public by design; RLS only allows anonymous INSERT here.
 */
const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://agpjxjujzjzasgizpphz.supabase.co'
const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncGp4anVqemp6YXNnaXpwcGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzOTk5MzQsImV4cCI6MjA4NTk3NTkzNH0.-Rz-xk09qfg39dsBMXYRApzktEDz6qr1rsnscF_JX3Q'

export async function subscribeEmail(
  email: string,
  source = 'website',
): Promise<{ ok: boolean; already?: boolean }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email: email.trim().toLowerCase(), source }),
    })
    if (res.ok) return { ok: true }
    if (res.status === 409) return { ok: true, already: true } // unique email = already subscribed
    return { ok: false }
  } catch {
    return { ok: false }
  }
}
