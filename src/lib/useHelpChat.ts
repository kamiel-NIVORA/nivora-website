import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACT } from '@/data/contact'
import { useLang, type Localized } from '@/i18n'
import { newId, sendHelpMessage, type ChatMessage } from './helpChat'

export type ChatStatus = 'idle' | 'thinking' | 'streaming' | 'error'

type Options = {
  /** Messages to seed the thread with (e.g. an opening greeting from Nivora). */
  initial?: ChatMessage[]
}

const ERROR_REPLY: Localized<string> = {
  en: `Something went wrong reaching the assistant. You can try again, or reach us directly at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
  nl: `Er ging iets mis bij het bereiken van de assistent. U kunt het opnieuw proberen, of ons rechtstreeks bereiken via ${CONTACT.email} of ${CONTACT.phoneDisplay}.`,
}

/**
 * Drives the Help Center conversation: holds the thread, sends a turn, and
 * streams the assistant's reply in token by token. Works the same whether a
 * live API is connected or the built-in local assistant is answering.
 */
export function useHelpChat({ initial = [] }: Options = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)
  const [status, setStatus] = useState<ChatStatus>('idle')

  const { lang } = useLang()

  // Mirror of `messages` so a turn always builds history from the latest state
  // without `send`/`retry` being re-created on every render.
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  // Mirror of the active language so `runTurn` can read it without being
  // re-created (and without re-creating `send`/`retry`) on every render.
  const langRef = useRef(lang)
  langRef.current = lang

  const abortRef = useRef<AbortController | null>(null)
  const mountedRef = useRef(true)
  useEffect(() => {
    return () => {
      mountedRef.current = false
      abortRef.current?.abort()
    }
  }, [])

  // Run one assistant turn against `history` (which must already include the
  // triggering user message and be reflected in state).
  const runTurn = useCallback(async (history: ChatMessage[]) => {
    if (abortRef.current) return // a turn is already in flight
    const controller = new AbortController()
    abortRef.current = controller

    const assistantId = newId('a')
    setStatus('thinking')

    // Claude-style smooth reveal: the network fills `received` (which arrives in
    // uneven bursts), while a steady rAF loop reveals it a few characters per
    // frame so the answer flows in evenly instead of lurching per network chunk.
    // The loop catches up when a big chunk lands, so it never falls behind.
    let received = ''
    let shown = 0
    let created = false
    let networkDone = false
    let rafId: number | null = null
    let resolveReveal: () => void = () => {}
    const revealDone = new Promise<void>((r) => { resolveReveal = r })

    const paint = (content: string) => {
      if (!created) {
        created = true
        setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content }])
      } else {
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content } : m)))
      }
    }

    const tick = () => {
      rafId = null
      if (!mountedRef.current || controller.signal.aborted) { resolveReveal(); return }
      const remaining = received.length - shown
      if (remaining > 0) {
        // Reveal a little, or more when a backlog is waiting, so the flow stays
        // smooth yet keeps pace with a fast model.
        const step = Math.min(remaining, Math.max(3, Math.min(14, Math.ceil(remaining / 6))))
        shown += step
        if (!created) setStatus('streaming')
        paint(received.slice(0, shown))
      }
      if (shown < received.length || !networkDone) {
        rafId = requestAnimationFrame(tick)
      } else {
        resolveReveal()
      }
    }
    const pump = () => { if (rafId == null && mountedRef.current) rafId = requestAnimationFrame(tick) }

    const onToken = (chunk: string) => {
      if (!mountedRef.current || !chunk) return
      received += chunk
      pump()
    }

    try {
      const full = await sendHelpMessage(history, { signal: controller.signal, onToken, lang: langRef.current })
      if (!mountedRef.current) return
      if (full && full.length > received.length) received = full
      networkDone = true
      pump()
      await revealDone
      if (!mountedRef.current || controller.signal.aborted) return
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
      setStatus('idle')
    } catch {
      if (controller.signal.aborted || !mountedRef.current) return
      if (rafId != null) cancelAnimationFrame(rafId)
      setMessages((prev) => [...prev, { id: newId('a'), role: 'assistant', content: ERROR_REPLY[langRef.current] }])
      setStatus('error')
    } finally {
      if (abortRef.current === controller) abortRef.current = null
    }
  }, [])

  const send = useCallback((raw: string) => {
    const text = raw.trim()
    if (!text || abortRef.current) return
    const userMsg: ChatMessage = { id: newId('u'), role: 'user', content: text }
    const history = [...messagesRef.current, userMsg]
    setMessages(history)
    void runTurn(history)
  }, [runTurn])

  // Re-run the last user turn (used by the error state's "Try again"). Drops any
  // messages after that user turn so the failed reply is replaced, not stacked.
  const retry = useCallback(() => {
    if (abortRef.current) return
    const msgs = messagesRef.current
    let lastUser = -1
    for (let i = msgs.length - 1; i >= 0; i -= 1) {
      if (msgs[i].role === 'user') { lastUser = i; break }
    }
    if (lastUser === -1) return
    const history = msgs.slice(0, lastUser + 1)
    setMessages(history)
    void runTurn(history)
  }, [runTurn])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setMessages(initial)
    setStatus('idle')
  }, [initial])

  // Abort an in-flight turn without clearing the thread (the composer's Stop).
  const stop = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setStatus('idle')
  }, [])

  const busy = status === 'thinking' || status === 'streaming'

  return { messages, status, busy, send, retry, reset, stop }
}
