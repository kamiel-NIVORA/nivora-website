import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Check, ChevronDown, Copy, Mail, Phone, RotateCw, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { BookCallButton } from '@/components/ui/BookCallButton'
import { cn } from '@/lib/utils'
import { copyText, useCopyFeedback } from '@/lib/clipboard'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { useHelpChat } from '@/lib/useHelpChat'
import { type ChatMessage } from '@/lib/helpChat'
import { CONTACT, SOCIAL_LINKS } from '@/data/contact'

const heroEase = [0.16, 1, 0.3, 1] as const

/* The questions a Nivora visitor most often arrives with. */
const STARTER_PROMPTS = [
  'What does Nivora Works actually build?',
  'What is the difference between Box and Voice?',
  'Can you build a custom AIOS for my company?',
  'Do you run AI locally, on our own hardware?',
  'What does a typical project cost and timeline look like?',
  'How do I join the waitlist for Box?',
]

const PLACEHOLDERS = ['Message Nivora.', 'What can we build for you?', 'How does local AI work?']

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */
export function HelpCenterPage() {
  const reduced = usePrefersReducedMotion()
  const humanRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Help Center · Nivora'
    return () => {
      document.title = 'Nivora'
    }
  }, [])

  const scrollToHuman = useCallback(() => {
    humanRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
  }, [reduced])

  return (
    <main className="relative w-full overflow-hidden bg-bg">
      <Hero reduced={reduced} />

      {/* The Desk: two equal doors, chat and a person */}
      <section className="relative w-full pb-4">
        <div className="mb-8 flex justify-center px-6">
          <Reveal>
            <Eyebrow>Two ways to get help</Eyebrow>
          </Reveal>
        </div>
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-5 px-6 lg:grid-cols-12 lg:gap-6">
          <ChatCard onTalkToHuman={scrollToHuman} />
          <HumanCard innerRef={humanRef} />
        </div>
        <ReassuranceStrip />
      </section>

      <FinalBand />
    </main>
  )
}

/* Shared ─────────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-olive" />
      {children}
    </span>
  )
}

/* Hero ─────────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const heroWord: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.4, ease: heroEase } },
}
const heroFade: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.3, ease: heroEase } },
}

function Hero({ reduced }: { reduced: boolean }) {
  return (
    <section className="relative flex min-h-[52svh] w-full flex-col items-center justify-center px-6 pb-16 pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 55% at 50% 18%, rgba(255,255,255,0.05), transparent 70%)' }}
      />
      <img
        aria-hidden
        src="/bg-dunes-mist.jpg"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.18] blur-[3px] [mask-image:radial-gradient(50%_50%_at_50%_45%,black_20%,transparent_78%)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={heroFade}>
          <Eyebrow>Help Center</Eyebrow>
        </motion.div>
        <h1 className="mt-5 font-serif text-[40px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[68px] lg:leading-[1.03]">
          {'Ask us anything.'.split(' ').map((w, i) => (
            <motion.span key={i} variants={heroWord} className="mr-[0.2em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </h1>
        <motion.p
          variants={heroFade}
          className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft/80 lg:text-[17px]"
        >
          Our assistant answers instantly, day or night. Prefer a person? We are one message away.
        </motion.p>
      </motion.div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-dim"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

/* Chat card ──────────────────────────────────────────────────────────────── */

function ChatCard({ onTalkToHuman }: { onTalkToHuman: () => void }) {
  const reduced = usePrefersReducedMotion()
  const { messages, status, busy, send, retry } = useHelpChat()
  const bodyRef = useRef<HTMLDivElement>(null)

  // Keep the newest turn in view as it streams in.
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' })
  }, [messages, status])

  const empty = messages.length === 0

  return (
    <Reveal mode="mount" className="lg:col-span-8">
      <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[24px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] backdrop-blur-md lg:h-[620px]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Header: the assistant identity (arrow mark, not a face) */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-line bg-white/[0.04]">
              <img src="/nivora-mark.png" alt="Nivora" className="h-5 w-5 object-contain" />
            </span>
            <span className="flex flex-col">
              <span className="text-[14px] font-medium text-ink">Nivora Assistant</span>
              <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                <OnlineDot reduced={reduced} />
                Online
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={onTalkToHuman}
            className="text-[12.5px] text-faint transition-colors hover:text-ink"
          >
            Talk to a human
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={bodyRef}
          aria-live="polite"
          data-lenis-prevent
          className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-6 [mask-image:linear-gradient(to_bottom,transparent,black_24px,black_calc(100%_-_24px),transparent)]"
        >
          {empty ? (
            <GreetingState reduced={reduced} onPick={send} />
          ) : (
            messages.map((m, i) => (
              <Message
                key={m.id}
                message={m}
                reduced={reduced}
                animating={status === 'streaming' && m.role === 'assistant' && i === messages.length - 1}
                isError={status === 'error' && m.role === 'assistant' && i === messages.length - 1}
                onRetry={retry}
                onTalkToHuman={onTalkToHuman}
              />
            ))
          )}
          {status === 'thinking' && <TypingIndicator reduced={reduced} />}
        </div>

        <Composer onSend={send} busy={busy} reduced={reduced} onTalkToHuman={onTalkToHuman} />
      </div>
    </Reveal>
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

/* Greeting / empty state ───────────────────────────────────────────────────── */

function GreetingState({ reduced, onPick }: { reduced: boolean; onPick: (q: string) => void }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-2 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-line bg-white/[0.04]">
        <img src="/nivora-mark.png" alt="Nivora" className="h-6 w-6 object-contain" />
      </span>
      <h3 className="mt-5 font-serif text-[22px] tracking-[-0.01em] text-ink">How can we help?</h3>
      <p className="mx-auto mt-2.5 max-w-sm text-[13.5px] leading-relaxed text-faint">
        Ask in your own words. The assistant knows our products, services, pricing and process. Prefer a person?
        Their details are right here too.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {STARTER_PROMPTS.map((p, i) => (
          <motion.button
            key={p}
            type="button"
            onClick={() => onPick(p)}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-faint transition-all duration-200 hover:-translate-y-px hover:border-line-strong hover:bg-white/[0.05] hover:text-ink-soft"
          >
            {p}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* Messages ─────────────────────────────────────────────────────────────────── */

function Message({
  message,
  reduced,
  animating,
  isError,
  onRetry,
  onTalkToHuman,
}: {
  message: ChatMessage
  reduced: boolean
  animating: boolean
  isError: boolean
  onRetry: () => void
  onTalkToHuman: () => void
}) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[16px] rounded-br-[6px] border border-line bg-white/[0.04] px-4 py-2.5 text-[14.5px] leading-relaxed text-ink-soft">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('border-l-2 pl-4', isError ? 'border-terracotta/40' : 'border-olive/40')}>
      <div className="flex gap-2.5">
        <img src="/nivora-mark.png" alt="" className="mt-[5px] h-3.5 w-3.5 shrink-0 object-contain opacity-90" />
        <div className="min-w-0 flex-1">
          <AssistantProse content={message.content} animating={animating} reduced={reduced} isError={isError} />
          {isError && (
            <div className="mt-3 flex items-center gap-4 text-[13px]">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 text-ink underline underline-offset-2 transition-colors hover:text-ink-soft"
              >
                <RotateCw className="h-3.5 w-3.5" strokeWidth={1.8} />
                Try again
              </button>
              <button
                type="button"
                onClick={onTalkToHuman}
                className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
              >
                Reach a person
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Split a reply into an opening sentence (serif lead) and the remainder (sans). */
function splitLead(content: string): { lead: string; rest: string } {
  const m = content.match(/^[\s\S]*?[.!?](?:\s|$)/)
  if (!m) return { lead: content, rest: '' }
  return { lead: content.slice(0, m[0].length), rest: content.slice(m[0].length) }
}

function AssistantProse({
  content,
  animating,
  reduced,
  isError,
}: {
  content: string
  animating: boolean
  reduced: boolean
  isError: boolean
}) {
  const { lead, rest } = splitLead(content)
  return (
    <p className="whitespace-pre-wrap">
      <span className={cn('font-serif text-[17px] leading-[1.55]', isError ? 'text-faint' : 'text-ink-soft')}>
        <Words text={lead} animate={animating} reduced={reduced} />
      </span>
      {rest && (
        <span className="font-sans text-[14.5px] leading-relaxed text-faint">
          <Words text={rest} animate={animating} reduced={reduced} />
        </span>
      )}
      {animating && !reduced && <Caret />}
    </p>
  )
}

/** Renders text plainly, or word-by-word with a soft settle while streaming. */
function Words({ text, animate, reduced }: { text: string; animate: boolean; reduced: boolean }) {
  if (!animate || reduced) return <>{text}</>
  const tokens = text.match(/\S+\s*/g) ?? (text ? [text] : [])
  return (
    <>
      {tokens.map((tok, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        >
          {tok}
        </motion.span>
      ))}
    </>
  )
}

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] rounded-full bg-ink/70 align-middle"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function TypingIndicator({ reduced }: { reduced: boolean }) {
  return (
    <div className="border-l-2 border-olive/40 pl-4">
      <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
        {reduced ? (
          'Thinking'
        ) : (
          <>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-olive shadow-[0_0_6px_rgba(150,167,102,0.7)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            Nivora is typing
          </>
        )}
      </div>
    </div>
  )
}

/* Composer ─────────────────────────────────────────────────────────────────── */

function Composer({
  onSend,
  busy,
  reduced,
  onTalkToHuman,
}: {
  onSend: (text: string) => void
  busy: boolean
  reduced: boolean
  onTalkToHuman: () => void
}) {
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
    ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`
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
    <div className="shrink-0 border-t border-line px-4 py-4">
      <div className="group relative flex items-end gap-2 rounded-[16px] border border-line bg-white/[0.03] px-3 py-2 transition-all duration-300 focus-within:border-line-strong">
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[16px] bg-[radial-gradient(60%_120%_at_50%_0%,rgba(189,169,109,0.10),transparent_70%)] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
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
            className="relative z-[1] block max-h-32 w-full resize-none bg-transparent py-1.5 text-[14.5px] leading-relaxed text-ink caret-[#96a766] outline-none"
          />
          {value.length === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-start py-1.5">
              {reduced ? (
                <span className="text-[14.5px] leading-relaxed text-dim">{PLACEHOLDERS[0]}</span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phIdx}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                    className="text-[14.5px] leading-relaxed text-dim"
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
        Answers are AI-generated. For anything important,{' '}
        <button
          type="button"
          onClick={onTalkToHuman}
          className="text-faint underline underline-offset-2 transition-colors hover:text-ink"
        >
          talk to a person
        </button>
        .
      </p>
    </div>
  )
}

function SendButton({ canSend, busy, onClick }: { canSend: boolean; busy: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!canSend}
      aria-label="Send message"
      className="group/send relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.04] transition-all duration-200 enabled:hover:bg-white/[0.08] disabled:opacity-40"
    >
      {busy ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-olive/30 border-t-olive" />
      ) : (
        <img
          src="/nivora-mark.png"
          alt=""
          className="h-3.5 w-3.5 object-contain transition-transform duration-200 group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5"
        />
      )}
    </button>
  )
}

/* Human contact card ───────────────────────────────────────────────────────── */

function HumanCard({ innerRef }: { innerRef: RefObject<HTMLDivElement | null> }) {
  const { copiedKey, flash } = useCopyFeedback()
  const copy = (text: string, key: string) => {
    void copyText(text).catch(() => {})
    flash(key)
  }

  return (
    <Reveal mode="mount" className="lg:col-span-4 lg:self-start">
      <div
        ref={innerRef}
        id="talk-to-a-human"
        className="relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(189,169,109,0.10),transparent_70%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <div className="relative">
          <Eyebrow>Talk to a human</Eyebrow>
          <h2 className="mt-4 font-serif text-[22px] leading-tight tracking-[-0.01em] text-ink">
            Reach a person directly.
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-faint">
            Real people, usually replying within a day. Based in Brussels.
          </p>
        </div>

        <div className="relative mt-6 flex flex-col gap-2">
          <ContactRow
            icon={Mail}
            label="Email"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            copied={copiedKey === 'email'}
            onCopy={() => copy(CONTACT.email, 'email')}
          />
          <ContactRow
            icon={Phone}
            label="Phone"
            value={CONTACT.phoneDisplay}
            href={CONTACT.phoneHref}
            copied={copiedKey === 'phone'}
            onCopy={() => copy(CONTACT.phoneDisplay, 'phone')}
          />
        </div>

        <BookCallButton className="mt-4 h-12 w-full text-[14px]">Book a call</BookCallButton>

        <div className="relative mt-6 flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-soft/70 transition-colors hover:bg-white/[0.07] hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  copied,
  onCopy,
}: {
  icon: LucideIcon
  label: string
  value: string
  href: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.025] p-2 transition-colors hover:bg-white/[0.045]">
      <a href={href} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1 py-1">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-ink-soft">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-[11px] uppercase tracking-[0.08em] text-faint">{label}</span>
          <span className="truncate text-[14px] text-ink">{value}</span>
        </span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className={cn(
          'flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-medium transition-colors',
          copied
            ? 'border-olive/40 bg-olive/10 text-olive'
            : 'border-line bg-white/[0.03] text-faint hover:bg-white/[0.08] hover:text-ink',
        )}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.7} />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  )
}

/* Reassurance + final band ─────────────────────────────────────────────────── */

function ReassuranceStrip() {
  const items = ['Usually a reply within a day.', 'We speak English and Dutch.', 'No accounts, no tracking.']
  return (
    <Reveal>
      <div className="mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 text-[13px] text-faint">
        {items.map((t, i) => (
          <span key={t} className="inline-flex items-center gap-3">
            {i > 0 && <span className="h-1 w-1 rounded-full bg-dim" />}
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  )
}

function FinalBand() {
  return (
    <section className="relative w-full px-6 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(55% 60% at 50% 50%, rgba(150,167,102,0.06), transparent 70%)' }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] text-ink sm:text-[42px] lg:text-[50px]">
            Still prefer a person?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-faint lg:text-base">
            Some things are easier said out loud. Book a short call and we will take it from there.
          </p>
          <div className="mt-9 flex justify-center">
            <BookCallButton className="h-12 px-7 text-[15px]">Book a call</BookCallButton>
          </div>
          <p className="mt-5 text-[13px] text-dim">A real person, usually within a day. Based in Brussels.</p>
        </div>
      </Reveal>
    </section>
  )
}
