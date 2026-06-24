/**
 * Help Center chat client.
 *
 * One small, framework-agnostic module that the Help Center page talks to. It
 * is built so you can plug in a real chat API later by filling in ONE constant,
 * and until then the page stays fully functional with an honest, on-brand local
 * assistant that answers common questions and always points to direct contact.
 *
 * ── To go live with a real API ──────────────────────────────────────────────
 * Set HELP_CHAT_ENDPOINT below to your endpoint URL. That is the only required
 * change, every Help Center button and the typing/streaming UI keep working.
 *
 * Request the page sends:
 *   POST <HELP_CHAT_ENDPOINT>
 *   headers: { 'Content-Type': 'application/json', ...HELP_CHAT_HEADERS }
 *   body:    { "messages": [{ "role": "user" | "assistant", "content": "..." }] }
 *
 * Response shapes that are understood automatically (use whichever you like):
 *   • text/event-stream  → streamed tokens. Either OpenAI-style lines
 *       `data: {"choices":[{"delta":{"content":"..."}}]}` (ended by `data: [DONE]`)
 *       or plain `data: <text>` lines, or raw streamed text.
 *   • application/json   → one of:
 *       { "reply": "..." } | { "message": "..." } | { "content": "..." }
 *       | { "answer": "..." } | { "text": "..." }
 *       | { "choices": [{ "message": { "content": "..." } }] }   (OpenAI)
 *
 * If your API needs an auth header or a key, add it to HELP_CHAT_HEADERS. For a
 * public key that is fine; for a secret, front it with your own proxy / edge
 * function and point HELP_CHAT_ENDPOINT at that instead.
 */

/** Your chat endpoint. Leave empty ('') to use the built-in local assistant.
 *  Points at the secure Edge function in /api/help-chat.ts, which holds the
 *  Anthropic key server-side and streams the reply back. */
export const HELP_CHAT_ENDPOINT = '/api/help-chat'

/** Extra request headers (e.g. { Authorization: 'Bearer ...' }). */
export const HELP_CHAT_HEADERS: Record<string, string> = {}

/* ── Types ──────────────────────────────────────────────────────────────────*/

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

export type SendOptions = {
  /** Abort the in-flight request (used to cancel on unmount / resend). */
  signal?: AbortSignal
  /** Called with each new chunk of text as it streams in. */
  onToken?: (chunk: string) => void
}

/* ── Call-to-action directive ────────────────────────────────────────────────
   The assistant may end a reply with a hidden `[[cta: token, token]]` line. The
   page strips it from the visible text and renders the tokens as buttons. Only
   the tokens below are honoured; anything else is ignored. */

export const CTA_TOKENS = [
  'book_call',
  'contact',
  'waitlist',
  'about',
  'service:app-design',
  'service:local-ai',
  'service:aios',
  'service:ai-consulting',
] as const

export type CtaToken = (typeof CTA_TOKENS)[number]

const CTA_FULL_RE = /\n*\s*\[\[\s*cta\s*:\s*([^\]]*?)\]\]\s*$/i
/* A still-streaming, not-yet-closed directive, e.g. "...\n[[cta: bo" or "[[c". */
const CTA_PARTIAL_RE = /\n*\s*\[\[\s*(?:c(?:t(?:a(?::[^\]]*)?)?)?)?\s*$/i

/**
 * Split an assistant reply into its visible text and any trailing
 * `[[cta: ...]]` directive. While the directive is still arriving token by
 * token, the partial fragment is hidden so it never flashes on screen.
 */
export function splitCta(content: string): { text: string; tokens: CtaToken[] } {
  const full = content.match(CTA_FULL_RE)
  if (full) {
    const tokens = full[1]
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t): t is CtaToken => (CTA_TOKENS as readonly string[]).includes(t))
    return { text: content.slice(0, full.index).trimEnd(), tokens }
  }
  const partial = content.match(CTA_PARTIAL_RE)
  if (partial && partial.index !== undefined && partial[0].includes('[[')) {
    return { text: content.slice(0, partial.index).trimEnd(), tokens: [] }
  }
  return { text: content, tokens: [] }
}

/** True once a real endpoint has been configured. */
export function isLiveChat(): boolean {
  return HELP_CHAT_ENDPOINT.trim().length > 0
}

let idSeq = 0
/** Stable, collision-free id for a message (no external deps). */
export function newId(prefix = 'm'): string {
  idSeq += 1
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)
  return `${prefix}_${Date.now().toString(36)}_${idSeq}_${rand}`
}

/* ── Public API ─────────────────────────────────────────────────────────────*/

/**
 * Send the conversation and resolve with the assistant's full reply. While the
 * answer arrives, `onToken` fires with each chunk so the UI can stream it.
 * Falls back to the local assistant when no endpoint is configured.
 */
export async function sendHelpMessage(
  history: ChatMessage[],
  opts: SendOptions = {},
): Promise<string> {
  if (!isLiveChat()) {
    return localAssistantReply(history, opts)
  }

  const res = await fetch(HELP_CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...HELP_CHAT_HEADERS },
    body: JSON.stringify({
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
    signal: opts.signal,
  })

  if (!res.ok) {
    throw new Error(`Chat request failed (${res.status})`)
  }

  const contentType = res.headers.get('content-type') ?? ''
  const isStream = contentType.includes('text/event-stream') || (!!res.body && !contentType.includes('application/json'))

  if (isStream && res.body) {
    return readStream(res.body, opts)
  }

  const data = await res.json().catch(() => null)
  const reply = extractContent(data)
  if (!reply) throw new Error('Empty response from chat API')
  opts.onToken?.(reply)
  return reply
}

/* ── Streaming reader ───────────────────────────────────────────────────────*/

async function readStream(body: ReadableStream<Uint8Array>, opts: SendOptions): Promise<string> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  const emit = (text: string) => {
    if (!text) return
    full += text
    opts.onToken?.(text)
  }

  try {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      // Server-sent events arrive as blank-line-delimited records.
      const records = buffer.split(/\n\n/)
      buffer = records.pop() ?? ''
      for (const record of records) {
        for (const line of record.split('\n')) {
          const trimmed = line.trim()
          if (!trimmed) continue
          if (!trimmed.startsWith('data:')) {
            // Not SSE, treat the whole thing as raw streamed text.
            emit(line)
            continue
          }
          const payload = trimmed.slice(5).trim()
          if (payload === '[DONE]') return full
          try {
            emit(extractContent(JSON.parse(payload)))
          } catch {
            emit(payload) // plain-text data line
          }
        }
      }
    }
    // Flush any trailing buffered text that never got a blank line.
    if (buffer.trim()) {
      const trimmed = buffer.trim()
      if (trimmed.startsWith('data:')) {
        const payload = trimmed.slice(5).trim()
        if (payload !== '[DONE]') {
          try {
            emit(extractContent(JSON.parse(payload)))
          } catch {
            emit(payload)
          }
        }
      } else {
        emit(buffer)
      }
    }
  } finally {
    reader.releaseLock()
  }

  return full
}

/** Pull the assistant text out of whatever JSON shape the API returned. */
function extractContent(data: unknown): string {
  if (data == null) return ''
  if (typeof data === 'string') return data
  if (typeof data !== 'object') return ''
  const o = data as Record<string, any>

  // OpenAI-style streaming delta / completion.
  const choice = Array.isArray(o.choices) ? o.choices[0] : undefined
  if (choice) {
    const delta = choice.delta?.content ?? choice.message?.content ?? choice.text
    if (typeof delta === 'string') return delta
  }

  for (const key of ['reply', 'message', 'content', 'answer', 'text', 'output']) {
    const v = o[key]
    if (typeof v === 'string') return v
  }
  return ''
}

/* ── Local assistant (used until a real endpoint is set) ────────────────────*/

/**
 * A small, honest, on-brand responder. It is NOT pretending to be a live model:
 * it answers the handful of questions a visitor most often has using real facts
 * from the site, and always offers a way to reach a person. Replies stream in
 * word by word so the experience matches the live API.
 */
async function localAssistantReply(history: ChatMessage[], opts: SendOptions): Promise<string> {
  const lastUser = [...history].reverse().find((m) => m.role === 'user')?.content ?? ''
  const reply = matchLocalReply(lastUser, history)
  await streamLocally(reply, opts)
  return reply
}

const EMAIL = 'kamiel@nivoraworks.com'
const PHONE = '+32 489 00 77 37'

function matchLocalReply(text: string, history: ChatMessage[]): string {
  const q = text.toLowerCase()
  const firstAssistantTurn = !history.some((m) => m.role === 'assistant')

  const has = (...words: string[]) => words.some((w) => q.includes(w))

  if (!text.trim()) {
    return "Tell me what you're looking for and I'll point you the right way. You can ask about our services, our products, how we work, or how to reach us."
  }

  if (has('price', 'pricing', 'cost', 'budget', 'quote', 'how much', 'rate')) {
    return `Every engagement is scoped to the work, so there is no fixed price list. The clearest next step is a short call where we look at what you need and come back with a concrete proposal. You can book one from any "Book a call" button, or write to ${EMAIL} and we will get you a number quickly.`
  }

  if (has('local ai', 'on-prem', 'on prem', 'self-host', 'self host', 'private', 'gdpr', 'data', 'secure', 'security', 'privacy')) {
    return `Keeping your data yours is a core part of how we build. With Local AI we run models on your own servers, or ours, so sensitive information never has to leave your control. If you tell me a little about your setup I can suggest where to start, or read more on the Local AI service page.`
  }

  if (has('aios', 'operating system', 'os ')) {
    return `AIOS is a custom AI operating system for your company. It ties your tools, data and workflows into one place your team actually uses every day. It is one of our four services. If you want, I can connect you with Kamiel to talk through what it would look like for your team.`
  }

  if (has('consult', 'strategy', 'advice', 'where to start', 'roadmap')) {
    return `AI Consulting is where a lot of people start. We help you find where AI genuinely fits, which ideas are worth building, and which to skip. It usually begins with a strategy call. You can book one from any "Book a call" button on the site.`
  }

  if (has('app design', 'app', 'build', 'mobile', 'website', 'software', 'develop')) {
    return `We design and build custom apps around your idea, for mobile and desktop. The App Design service page walks through how that works, and the best first step is a short call so we understand what you are picturing. Want me to point you to it?`
  }

  if (has('service', 'what do you do', 'what can you', 'offer', 'help with')) {
    return `We work across four services: App Design (custom apps), Local AI (secure AI on your servers or ours), AIOS (a custom AI operating system for your company), and AI Consulting (finding where AI fits and which strategy wins). Tell me which one is closest to what you need and I can go deeper.`
  }

  if (has('box', 'voice', 'product', 'download', 'waitlist', 'early access', 'launch', 'beta')) {
    return `Box and Voice are our two products, and both are launching soon. Box brings all your communication into one place, Voice is speech to text tuned to how you write. Leave your details on the waitlist and we'll notify you the moment they go live.`
  }

  if (has('contact', 'human', 'person', 'talk', 'call', 'email', 'phone', 'reach', 'speak', 'someone')) {
    return `Of course. You can reach us directly at ${EMAIL} or ${PHONE}, and we usually reply within a day. If you would rather have a proper conversation, any "Book a call" button on the site sets up a time.`
  }

  if (firstAssistantTurn && has('hi', 'hello', 'hey', 'good morning', 'good afternoon')) {
    return `Hi, good to meet you. I can help with questions about our services, our products, or how we work. What would you like to know?`
  }

  // Default: stay honest, stay helpful, always offer a person.
  return `Good question. I can help with the basics about our services, products and how we work, and for anything specific the fastest route is a person. You can reach us at ${EMAIL} or ${PHONE}, or book a call from any "Book a call" button. What would be most useful right now?`
}

/** Emit a reply word by word so the local assistant feels like the live one. */
async function streamLocally(text: string, opts: SendOptions): Promise<void> {
  if (!opts.onToken) return
  const tokens = text.match(/\S+\s*/g) ?? [text]
  for (const token of tokens) {
    if (opts.signal?.aborted) return
    opts.onToken(token)
    await sleep(18 + Math.min(70, token.length * 9))
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
