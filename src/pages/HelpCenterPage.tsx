import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowUp, ArrowUpRight, CalendarClock, RefreshCw, RotateCw, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { useContactModal } from '@/components/contact/ContactModal'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { useHelpChat } from '@/lib/useHelpChat'
import { splitCta, type ChatMessage, type CtaToken } from '@/lib/helpChat'
import { renderChatMarkdown } from '@/lib/chatMarkdown'
import { CONTACT, BOOKING_URL } from '@/data/contact'

const ease = [0.16, 1, 0.3, 1] as const

/* The questions a Nivora visitor most often arrives with. */
const STARTER_PROMPTS = [
  'What does Nivora actually do?',
  'Which service fits my company?',
  'How does Local AI keep our data private?',
  'What is AIOS, exactly?',
  'What does a project cost?',
  'When do Box and Voice launch?',
]

const PLACEHOLDERS = ['Ask anything about Nivora.', 'What can we build for you?', 'How does Local AI work?']

/* Calm status words while the assistant is composing (Nivora voice, not playful). */
const THINKING_WORDS = ['Thinking', 'Reading', 'Putting it together']

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function HelpCenterPage() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    document.title = 'Help Center · Nivora'
    return () => {
      document.title = 'Nivora'
    }
  }, [])

  return (
    <main className="relative w-full overflow-hidden bg-bg">
      {/* Ambient red wash — the one place on the site the signal colour lives. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px]"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 0%, rgba(229,72,77,0.13), transparent 70%), radial-gradient(40% 50% at 50% 40%, rgba(229,72,77,0.05), transparent 75%)',
        }}
      />

      <section className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center px-5 pb-6 pt-28 sm:px-6 lg:pt-32">
        <HelpHeader reduced={reduced} />
        <ChatPanel reduced={reduced} />
      </section>

      <PeopleRow />
    </main>
  )
}

/* Header — just "Help Center", in red. No tall hero. ─────────────────────────*/

const headWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const headWord: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
}
const headFade: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
}

function HelpHeader({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      variants={headWrap}
      initial={reduced ? false : 'hidden'}
      animate={reduced ? undefined : 'show'}
      className="relative mb-7 flex w-full flex-col items-center text-center sm:mb-9"
    >
      <h1 className="font-serif text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[60px] lg:text-[72px]">
        {'Help Center'.split(' ').map((w, i) => (
          <motion.span
            key={i}
            variants={headWord}
            className="mr-[0.22em] inline-block bg-gradient-to-br from-signal-soft via-signal to-signal-deep bg-clip-text text-transparent last:mr-0"
          >
            {w}
          </motion.span>
        ))}
      </h1>
      <motion.p
        variants={headFade}
        className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft/75 sm:text-[16.5px]"
      >
        Ask anything about Nivora. Our assistant knows the work inside out, and the team is right here
        whenever you would rather speak with a person.
      </motion.p>
    </motion.div>
  )
}

/* Chat panel — the centerpiece. ──────────────────────────────────────────────*/

function ChatPanel({ reduced }: { reduced: boolean }) {
  const { messages, status, busy, send, retry, reset } = useHelpChat()
  const bodyRef = useRef<HTMLDivElement>(null)

  // Keep the newest turn in view as it streams in.
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' })
  }, [messages, status])

  const empty = messages.length === 0

  return (
    <Reveal mode="mount" className="w-full">
      <div className="relative w-full">
        {/* Soft red bloom hugging the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[28px] opacity-70"
          style={{ background: 'radial-gradient(80% 60% at 50% 0%, rgba(229,72,77,0.16), transparent 70%)' }}
        />

        <div className="relative flex h-[66svh] min-h-[540px] flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.015] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:h-[64svh] lg:max-h-[760px]">
          {/* Top hairline, faintly red */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent"
          />

          <ChatHeader reduced={reduced} hasMessages={!empty} onReset={reset} />

          <div
            ref={bodyRef}
            aria-live="polite"
            data-lenis-prevent
            className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-7 [mask-image:linear-gradient(to_bottom,transparent,black_22px,black_calc(100%_-_22px),transparent)]"
          >
            {empty ? (
              <Greeting reduced={reduced} onPick={send} />
            ) : (
              messages.map((m, i) => (
                <Message
                  key={m.id}
                  message={m}
                  reduced={reduced}
                  streaming={status === 'streaming' && m.role === 'assistant' && i === messages.length - 1}
                  isError={status === 'error' && m.role === 'assistant' && i === messages.length - 1}
                  onRetry={retry}
                />
              ))
            )}
            {status === 'thinking' && <ThinkingIndicator reduced={reduced} />}
          </div>

          <Composer onSend={send} busy={busy} reduced={reduced} />
        </div>
      </div>
    </Reveal>
  )
}

function ChatHeader({
  reduced,
  hasMessages,
  onReset,
}: {
  reduced: boolean
  hasMessages: boolean
  onReset: () => void
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.04]">
          <img src="/nivora-mark.webp" alt="Nivora" className="h-5 w-5 object-contain" />
        </span>
        <span className="flex flex-col">
          <span className="text-[14px] font-medium text-ink">Nivora Assistant</span>
          <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            <OnlineDot reduced={reduced} />
            Online
          </span>
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {hasMessages && (
          <button
            type="button"
            onClick={onReset}
            aria-label="Start a new chat"
            className="flex h-8 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-[12.5px] text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.7} />
            <span className="hidden sm:inline">New chat</span>
          </button>
        )}
        <Link
          to="/contact"
          className="flex h-8 items-center gap-1.5 rounded-full border border-signal/30 bg-signal/[0.08] px-3 text-[12.5px] font-medium text-ink transition-colors hover:border-signal/50 hover:bg-signal/[0.14]"
        >
          Talk to the team
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  )
}

function OnlineDot({ reduced }: { reduced: boolean }) {
  const cls = 'h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_6px_rgba(150,167,102,0.7)]'
  if (reduced) return <span className={cls} />
  return (
    <motion.span
      className={cls}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* Greeting / empty state ─────────────────────────────────────────────────────*/

function Greeting({ reduced, onPick }: { reduced: boolean; onPick: (q: string) => void }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-2 text-center">
      <motion.span
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5, ease }}
        className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-signal/25 bg-signal/[0.07] shadow-[0_0_30px_-6px_rgba(229,72,77,0.5)]"
      >
        <img src="/nivora-mark.webp" alt="Nivora" className="h-7 w-7 object-contain" />
      </motion.span>
      <motion.h3
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.5, ease }}
        className="mt-6 font-serif text-[26px] tracking-[-0.01em] text-ink sm:text-[30px]"
      >
        How can we help?
      </motion.h3>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease }}
        className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-faint"
      >
        Ask in your own words. The assistant knows our products, services, pricing and how we work, and it
        will point you to the right place.
      </motion.p>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.27, duration: 0.5, ease }}
        className="mt-7 flex flex-wrap items-center justify-center gap-2"
      >
        {STARTER_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPick(p)}
            className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-faint transition-all duration-200 hover:-translate-y-px hover:border-signal/40 hover:bg-signal/[0.08] hover:text-ink"
          >
            {p}
          </button>
        ))}
      </motion.div>
    </div>
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
  if (message.role === 'user') {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[#e9e9ea] px-4 py-2.5 text-[14.5px] leading-6 text-[#0a0a0a]">
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
        <img src="/nivora-mark.webp" alt="" className="h-3.5 w-3.5 object-contain opacity-90" />
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'rounded-2xl rounded-bl-md border px-4 py-3 text-[15px] leading-[1.7]',
            isError
              ? 'border-signal/30 bg-signal/[0.06] text-faint'
              : 'border-white/[0.07] bg-white/[0.03] text-ink-soft',
          )}
        >
          <div className="space-y-0.5">
            {renderChatMarkdown(text)}
            {streaming && !reduced && <Caret />}
          </div>
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
              Try again
            </button>
            <Link
              to="/contact"
              className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
            >
              Talk to the team
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
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-signal align-middle"
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* In-chat CTA buttons, parsed from the assistant's [[cta: ...]] directive. ────*/

type CtaSpec = { label: string; primary?: boolean } & (
  | { kind: 'book' }
  | { kind: 'internal'; to: string }
)

const CTA_META: Record<CtaToken, CtaSpec> = {
  book_call: { label: 'Book a call', kind: 'book', primary: true },
  contact: { label: 'Contact us', kind: 'internal', to: '/contact' },
  waitlist: { label: 'Join the waitlist', kind: 'internal', to: '/waitlist' },
  about: { label: 'About Nivora', kind: 'internal', to: '/about' },
  'service:app-design': { label: 'App Design', kind: 'internal', to: '/services/app-design' },
  'service:local-ai': { label: 'Local AI', kind: 'internal', to: '/services/local-ai' },
  'service:aios': { label: 'AIOS', kind: 'internal', to: '/services/aios' },
  'service:ai-consulting': { label: 'AI Consulting', kind: 'internal', to: '/services/ai-consulting' },
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
  const Icon: LucideIcon = spec.kind === 'book' ? CalendarClock : ArrowUpRight

  const base =
    'group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200'
  const cls = spec.primary
    ? cn(base, 'bg-signal text-white hover:bg-signal-deep')
    : cn(base, 'border border-signal/30 bg-signal/[0.08] text-ink hover:border-signal/50 hover:bg-signal/[0.14]')

  const inner = (
    <>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      {spec.label}
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
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIdx((i) => (i + 1) % THINKING_WORDS.length), 2000)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.04]">
        <img src="/nivora-mark.webp" alt="" className="h-3.5 w-3.5 object-contain opacity-90" />
      </span>
      <div className="flex items-center gap-2 pt-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_7px_rgba(229,72,77,0.8)]"
          animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {reduced ? (
          <span className="text-[13.5px] text-faint">Thinking</span>
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
              {THINKING_WORDS[idx]}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

/* Composer ───────────────────────────────────────────────────────────────────*/

function Composer({ onSend, busy, reduced }: { onSend: (text: string) => void; busy: boolean; reduced: boolean }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [phIdx, setPhIdx] = useState(0)
  const taRef = useRef<HTMLTextAreaElement>(null)

  // Gently rotate the placeholder while the field is empty and at rest.
  useEffect(() => {
    if (reduced || focused || value) return
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 4500)
    return () => clearInterval(id)
  }, [reduced, focused, value])

  const grow = () => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`
  }

  const submit = () => {
    const v = value.trim()
    if (!v || busy) return
    onSend(v)
    setValue('')
    requestAnimationFrame(() => {
      if (taRef.current) taRef.current.style.height = 'auto'
    })
  }

  const canSend = value.trim().length > 0 && !busy

  return (
    <div className="shrink-0 px-3 pb-4 pt-2 sm:px-5">
      <div className="group relative flex items-end gap-2 rounded-[20px] border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-3 py-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-all duration-300 focus-within:border-signal/40">
        {/* Red focus glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[20px] bg-[radial-gradient(70%_140%_at_50%_0%,rgba(229,72,77,0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
        />
        <div className="relative flex-1">
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              grow()
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            aria-label="Message the Nivora assistant"
            className="relative z-[1] block max-h-36 w-full resize-none bg-transparent py-1.5 text-[15px] leading-7 text-ink caret-[#e5484d] outline-none"
          />
          {value.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-start py-1.5">
              {reduced ? (
                <span className="text-[15px] leading-7 text-dim">{PLACEHOLDERS[0]}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phIdx}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                    className="text-[15px] leading-7 text-dim"
                  >
                    {PLACEHOLDERS[phIdx]}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
        <SendButton canSend={canSend} busy={busy} onClick={submit} />
      </div>
      <p className="mt-2 text-center text-[12px] text-dim">
        Answers are AI-generated. Prefer a person?{' '}
        <Link to="/contact" className="text-faint underline underline-offset-2 transition-colors hover:text-ink">
          Talk to the team
        </Link>
        .
      </p>
    </div>
  )
}

function SendButton({ canSend, busy, onClick }: { canSend: boolean; busy: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!canSend}
      aria-label="Send message"
      whileHover={canSend ? { scale: 1.05 } : undefined}
      whileTap={canSend ? { scale: 0.96 } : undefined}
      className={cn(
        'relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
        canSend
          ? 'bg-signal text-white shadow-[0_6px_20px_-6px_rgba(229,72,77,0.8)] hover:bg-signal-deep'
          : 'bg-white/[0.05] text-faint',
      )}
    >
      {busy ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
      ) : (
        <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.1} />
      )}
    </motion.button>
  )
}

/* Prefer a person — clean CTA row beneath the chat. ──────────────────────────*/

function PeopleRow() {
  return (
    <section className="relative z-10 w-full px-6 py-20 lg:py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[28px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[34px]">
            Prefer to talk to a person?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-faint">
            The assistant gets you a clear answer in seconds. When you would rather talk it through, the team is
            one message away. Book a short call, or reach us directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOOKING_URL || '#'}
              {...(BOOKING_URL ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[15px] font-medium text-white shadow-[0_14px_40px_-12px_rgba(229,72,77,0.85)] transition-colors hover:bg-signal-deep"
            >
              <CalendarClock className="h-[18px] w-[18px]" strokeWidth={1.8} />
              Book a call
            </a>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.02] px-6 text-[15px] text-ink-soft transition-colors hover:border-white/[0.2] hover:text-ink"
            >
              Contact us
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-dim">
            Or email{' '}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
            >
              {CONTACT.email}
            </a>{' '}
            · call{' '}
            <a
              href={CONTACT.phoneHref}
              className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
            >
              {CONTACT.phoneDisplay}
            </a>
            . Based in Brugge. Usually a reply within a day.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
