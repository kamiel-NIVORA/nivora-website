import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  CalendarClock,
  Paperclip,
  RotateCw,
  X,
  type LucideIcon,
} from 'lucide-react'
import { ChatBackdrop } from '@/components/help/ChatBackdrop'
import { useContactModal } from '@/components/contact/ContactModal'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { useHelpChat } from '@/lib/useHelpChat'
import { splitCta, type ChatMessage, type CtaToken } from '@/lib/helpChat'
import { renderChatMarkdown } from '@/lib/chatMarkdown'
import { BOOKING_URL } from '@/data/contact'
import { useLang, pick, type Localized } from '@/i18n'

const ease = [0.16, 1, 0.3, 1] as const

/* Calm status words while the assistant is composing (Nivora voice, not playful). */
const THINKING_WORDS: Localized<string[]> = {
  en: ['Thinking', 'Reading', 'Putting it together'],
  nl: ['Aan het denken', 'Aan het lezen', 'Aan het samenstellen'],
}

/* All user-facing copy on the Help Center page. The page mirrors the Nivora
   AIOS chat hero exactly: a dot-matrix field, the centered Nivora mark, one
   clean heading, and the same chat composer (attach · Experts · Assistent ·
   Verstuur). No page title, no subtitle, no extra sections. */
const COPY = {
  en: {
    docTitle: 'Help Center · Nivora',
    heroTitle: 'How can we help?',
    heroAsk: 'Ask our Nivora assistant anything, or',
    contact: 'get in touch',
    placeholder: 'Ask a question or give Nivora a command...',
    typing: 'Nivora is answering, wait or press stop...',
    experts: 'Experts',
    assistant: 'Assistant',
    send: 'Send',
    stop: 'Stop',
    attach: 'Add a file',
    sendAria: 'Send message',
    composerAria: 'Message the Nivora assistant',
    tryAgain: 'Try again',
    talkToTeam: 'Talk to the team',
    cta: {
      book_call: 'Book a call',
      contact: 'Contact us',
      waitlist: 'Join the waitlist',
      about: 'About Nivora',
    },
  },
  nl: {
    docTitle: 'Helpcentrum · Nivora',
    heroTitle: 'Hoe kunnen we helpen?',
    heroAsk: 'Vraag alles aan onze Nivora-assistent, of',
    contact: 'neem contact op',
    placeholder: 'Stel een vraag of geef een commando aan Nivora...',
    typing: 'Nivora is aan het antwoorden, wacht of klik stop...',
    experts: 'Experts',
    assistant: 'Assistent',
    send: 'Verstuur',
    stop: 'Stop',
    attach: 'Bestand toevoegen',
    sendAria: 'Bericht versturen',
    composerAria: 'Stuur de Nivora-assistent een bericht',
    tryAgain: 'Probeer opnieuw',
    talkToTeam: 'Praat met het team',
    cta: {
      book_call: 'Boek een gesprek',
      contact: 'Neem contact op',
      waitlist: 'Schrijf u in op de wachtlijst',
      about: 'Over Nivora',
    },
  },
} as const

/* ──────────────────────────────────────────────────────────────────────────
   Page — a full-height AIOS-style chat hero. The site nav sits above it and
   the footer follows on scroll.
   ────────────────────────────────────────────────────────────────────────── */
export function HelpCenterPage() {
  const reduced = usePrefersReducedMotion()
  const { lang } = useLang()
  const t = COPY[lang]
  const { messages, status, busy, send, retry, reset, stop } = useHelpChat()
  const endRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const askSentRef = useRef(false)

  const empty = messages.length === 0

  useEffect(() => {
    document.title = COPY[lang].docTitle
    return () => {
      document.title = 'Nivora'
    }
  }, [lang])

  // Follow the newest turn as it streams in. The conversation flows in the page
  // (so page scrolling stays smooth), and the end sentinel carries a scroll
  // margin so the latest message lands just above the sticky composer.
  useEffect(() => {
    if (empty || !endRef.current) return
    endRef.current.scrollIntoView({ block: 'end' })
  }, [messages, status, empty])

  // A question can be handed in via /help?ask=... (the service-page button).
  // Send it once on arrival, then strip the param so a refresh does not resend.
  useEffect(() => {
    if (askSentRef.current) return
    const ask = searchParams.get('ask')
    if (ask && ask.trim()) {
      askSentRef.current = true
      send(ask.trim())
      setSearchParams(
        (prev) => {
          prev.delete('ask')
          return prev
        },
        { replace: true },
      )
    }
  }, [searchParams, send, setSearchParams])

  return (
    <main className="relative w-full bg-bg">
      <section className={cn('relative flex w-full flex-col', empty ? 'min-h-svh overflow-hidden' : 'min-h-svh')}>
        {/* Moving dot-matrix backdrop, echoing the AIOS chat. Shown only on the
            empty hero. The moment a conversation starts it clears, so chatting is
            a clean, distraction-free interface. */}
        {empty && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <ChatBackdrop reduced={reduced} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(6,6,6,0.55)_60%,#060606_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
          </div>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pt-28 sm:px-6 lg:pt-32">
          {/* Conversation — flows in the page so scrolling stays smooth. Hidden
              while empty so the hero is centered. */}
          <div aria-live="polite" className={cn('space-y-6', empty ? 'hidden' : 'flex-1 pb-2')}>
            {!empty && (
              <>
                {messages.map((m, i) => (
                  <Message
                    key={m.id}
                    message={m}
                    reduced={reduced}
                    streaming={status === 'streaming' && m.role === 'assistant' && i === messages.length - 1}
                    isError={status === 'error' && m.role === 'assistant' && i === messages.length - 1}
                    onRetry={retry}
                  />
                ))}
                {status === 'thinking' && <ThinkingIndicator reduced={reduced} />}
                <div ref={endRef} aria-hidden className="scroll-mb-[200px]" />
              </>
            )}
          </div>

          {/* Hero (empty) wraps the composer so logo + heading + input stay centered
              as one group. When chatting, the composer drops to the bottom. The
              composer element itself never unmounts across the switch. */}
          <div
            className={cn(
              empty
                ? 'flex flex-1 flex-col items-center justify-center gap-9 pb-8'
                : 'sticky bottom-0 z-20 -mx-5 bg-gradient-to-t from-bg from-72% to-transparent px-5 pb-5 pt-12 sm:-mx-6 sm:px-6',
            )}
          >
            {empty && (
              <motion.div
                className="flex flex-col items-center gap-3.5 text-center"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
              >
                <motion.h1
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="bg-gradient-to-r from-white/95 to-white/55 bg-clip-text pb-1 text-[34px] font-medium leading-tight tracking-tight text-transparent sm:text-[46px]"
                >
                  {t.heroTitle}
                </motion.h1>
                <motion.p
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-xl text-balance text-[15px] leading-relaxed text-faint sm:text-[16px]"
                >
                  {t.heroAsk}{' '}
                  <Link
                    to="/contact"
                    className="font-medium text-ink underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {t.contact}
                  </Link>
                </motion.p>
              </motion.div>
            )}

            <Composer
              className="w-full"
              reduced={reduced}
              onSend={send}
              onStop={stop}
              onReset={reset}
              hasMessages={!empty}
              busy={busy}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Composer — a large, glassy chat box. A roomy prompt textarea, then a slim
   control row: attach on the left, Verstuur on the right. Big and clean.
   ────────────────────────────────────────────────────────────────────────── */

function Composer({
  className,
  reduced,
  onSend,
  onStop,
  onReset,
  hasMessages,
  busy,
}: {
  className?: string
  reduced: boolean
  onSend: (text: string) => void
  onStop: () => void
  onReset: () => void
  hasMessages: boolean
  busy: boolean
}) {
  const { lang } = useLang()
  const t = COPY[lang]
  const [value, setValue] = useState('')
  const [files, setFiles] = useState<string[]>([])
  const taRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // The box is large by default; on the hero it stands tall, in a conversation it
  // starts shorter and grows. min/max are tuned per state.
  const minH = hasMessages ? 32 : 96
  const maxH = hasMessages ? 200 : 300

  const grow = () => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(Math.max(ta.scrollHeight, minH), maxH)}px`
  }

  const submit = () => {
    const v = value.trim()
    if (!v || busy) return
    onSend(v)
    setValue('')
    setFiles([])
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = 'auto'
    })
  }

  const canSend = value.trim().length > 0 && !busy

  return (
    <motion.div
      className={cn('relative', className)}
      initial={reduced ? false : { scale: 0.98, opacity: 0 }}
      animate={reduced ? undefined : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, delay: hasMessages ? 0 : 0.3, ease }}
    >
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const names = Array.from(e.target.files ?? []).map((f) => f.name)
          if (names.length) setFiles((prev) => [...prev, ...names])
          e.target.value = ''
        }}
      />

      <div className="relative rounded-[28px] border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-300 focus-within:border-white/[0.18] focus-within:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
        {/* Prompt */}
        <div className="px-6 pt-5">
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            disabled={busy}
            style={{ minHeight: minH, maxHeight: maxH }}
            onChange={(e) => {
              setValue(e.target.value)
              grow()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            aria-label={t.composerAria}
            placeholder={busy ? t.typing : t.placeholder}
            className="block w-full resize-none border-none bg-transparent text-[16px] leading-8 text-white/90 caret-white outline-none placeholder:text-white/30 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          />
        </div>

        {/* Attachment chips (visual; wired to the backend later) */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 px-6 pb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {files.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="inline-flex max-w-[220px] items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] px-2.5 py-1 text-[12px] text-white/70"
                >
                  <Paperclip className="h-3 w-3 shrink-0" />
                  <span className="truncate">{name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                    className="shrink-0 text-white/40 transition-colors hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control row */}
        <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg p-2.5 text-white/40 transition-colors hover:text-white/90"
              title={t.attach}
              aria-label={t.attach}
            >
              <Paperclip className="h-[18px] w-[18px]" />
            </button>

            {hasMessages && (
              <button
                type="button"
                onClick={onReset}
                className="rounded-lg p-2.5 text-white/40 transition-colors hover:text-white/90"
                title={t.tryAgain}
                aria-label={t.tryAgain}
              >
                <RotateCw className="h-[18px] w-[18px]" />
              </button>
            )}
          </div>

          <motion.button
            type="button"
            onClick={() => (busy ? onStop() : submit())}
            whileTap={busy || canSend ? { scale: 0.96 } : undefined}
            disabled={!busy && !canSend}
            aria-label={busy ? t.stop : t.sendAria}
            className={cn(
              'flex items-center gap-2 rounded-xl px-5 py-2.5 text-[15px] font-medium transition-all',
              busy || canSend
                ? 'bg-white text-[#0A0A0B] shadow-lg shadow-white/10'
                : 'bg-white/[0.05] text-white/40',
            )}
          >
            {busy ? (
              <>
                <span className="h-3 w-3 rounded-[2px] bg-[#0A0A0B]" />
                <span>{t.stop}</span>
              </>
            ) : (
              <>
                <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.5} />
                <span>{t.send}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* Messages ───────────────────────────────────────────────────────────────────*/

function Message({
  message,
  reduced,
  streaming,
  isError,
  onRetry,
}: {
  message: ChatMessage
  reduced: boolean
  streaming: boolean
  isError: boolean
  onRetry: () => void
}) {
  const { lang } = useLang()
  const t = COPY[lang]
  if (message.role === 'user') {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[14.5px] leading-6 text-[#0a0a0a]">
          {message.content}
        </div>
      </motion.div>
    )
  }

  const { text, tokens } = splitCta(message.content)

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3"
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.04]">
        <img src="/brand/nivora-mark.webp" alt="" className="h-3.5 w-3.5 object-contain opacity-90" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        {/* Open, frameless answer, like the AIOS chat: no bubble, more room. */}
        <div
          className={cn(
            'space-y-0.5 text-[15.5px] leading-[1.75]',
            isError ? 'text-faint' : 'text-ink-soft',
          )}
        >
          {renderChatMarkdown(text)}
          {streaming && !reduced && <Caret />}
        </div>

        {tokens.length > 0 && <CtaRow tokens={tokens} />}

        {isError && (
          <div className="mt-2.5 flex items-center gap-4 pl-1 text-[13px]">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 text-ink underline underline-offset-2 transition-colors hover:text-ink-soft"
            >
              <RotateCw className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t.tryAgain}
            </button>
            <Link
              to="/contact"
              className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
            >
              {t.talkToTeam}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-white align-middle"
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* In-chat CTA buttons, parsed from the assistant's [[cta: ...]] directive. ────*/

type CtaSpec = { label: Localized<string>; primary?: boolean } & (
  | { kind: 'book' }
  | { kind: 'internal'; to: string }
)

/* Product / service names stay identical across languages (brand rule). */
const bi = (s: string): Localized<string> => ({ en: s, nl: s })

const CTA_META: Record<CtaToken, CtaSpec> = {
  book_call: { label: { en: 'Book a call', nl: 'Boek een gesprek' }, kind: 'book', primary: true },
  contact: { label: { en: 'Contact us', nl: 'Neem contact op' }, kind: 'internal', to: '/contact' },
  waitlist: { label: { en: 'Join the waitlist', nl: 'Schrijf u in op de wachtlijst' }, kind: 'internal', to: '/waitlist' },
  about: { label: { en: 'About Nivora', nl: 'Over Nivora' }, kind: 'internal', to: '/about' },
  'service:app-design': { label: bi('App Design'), kind: 'internal', to: '/services/app-design' },
  'service:local-ai': { label: bi('Local AI'), kind: 'internal', to: '/services/local-ai' },
  'service:aios': { label: bi('AIOS'), kind: 'internal', to: '/services/aios' },
  'service:ai-consulting': { label: bi('AI Consulting'), kind: 'internal', to: '/services/ai-consulting' },
}

function CtaRow({ tokens }: { tokens: CtaToken[] }) {
  // De-duplicate while preserving order.
  const seen = new Set<CtaToken>()
  const unique = tokens.filter((t) => (seen.has(t) ? false : (seen.add(t), true)))
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-2.5 flex flex-wrap gap-2 pl-1"
    >
      {unique.map((t) => (
        <CtaButton key={t} spec={CTA_META[t]} />
      ))}
    </motion.div>
  )
}

function CtaButton({ spec }: { spec: CtaSpec }) {
  const { open } = useContactModal()
  const { lang } = useLang()
  const label = pick(spec.label, lang)
  const Icon: LucideIcon = spec.kind === 'book' ? CalendarClock : ArrowUpRight

  const base =
    'group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
  const cls = spec.primary
    ? cn(base, 'bg-white text-[#0a0a0a] hover:bg-white/90')
    : cn(base, 'border border-white/[0.12] bg-white/[0.04] text-ink hover:border-white/25 hover:bg-white/[0.08]')

  const inner = (
    <>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      {label}
    </>
  )

  if (spec.kind === 'book') {
    if (BOOKING_URL) {
      return (
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      )
    }
    return (
      <button type="button" onClick={open} className={cls}>
        {inner}
      </button>
    )
  }

  return (
    <Link to={spec.to} className={cls}>
      {inner}
    </Link>
  )
}

/* Thinking indicator — shimmer label, AIOS-style but in Nivora's calm voice. ──*/

function ThinkingIndicator({ reduced }: { reduced: boolean }) {
  const { lang } = useLang()
  const words = pick(THINKING_WORDS, lang)
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2000)
    return () => clearInterval(id)
  }, [reduced, words.length])

  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.04]">
        <img src="/brand/nivora-mark.webp" alt="" className="h-3.5 w-3.5 object-contain opacity-90" />
      </span>
      <div className="flex items-center gap-2 pt-1.5">
        <motion.span
          className="h-2 w-2 rounded-[2px] bg-white/80"
          animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {reduced ? (
          <span className="text-[13.5px] text-faint">{words[0]}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-[linear-gradient(90deg,rgba(245,245,245,0.35)_0%,rgba(245,245,245,0.95)_50%,rgba(245,245,245,0.35)_100%)] bg-[length:200%_100%] bg-clip-text text-[13.5px] text-transparent"
              style={{ animation: 'helpShimmer 2.4s linear infinite' }}
            >
              {words[idx]}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
