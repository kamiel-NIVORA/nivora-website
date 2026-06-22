import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACT } from '@/data/contact'
import { newId, sendHelpMessage, type ChatMessage } from './helpChat'

export type ChatStatus = 'idle' | 'thinking' | 'streaming' | 'error'

type Options = {
  /** Messages to seed the thread with (e.g. an opening greeting from Nivora). */
  initial?: ChatMessage[]
}

const ERROR_REPLY =
  `Something went wrong reaching the assistant. You can try again, or reach us directly at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`

/**
 * Drives the Help Center conversation: holds the thread, sends a turn, and
 * streams the assistant's reply in token by token. Works the same whether a
 * live API is connected or the built-in local assistant is answering.
 */
export function useHelpChat({ initial = [] }: Options = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial)
  const [status, setStatus] = useState<ChatStatus>('idle')

  // Mirror of `messages` so a turn always builds history from the latest state
  // without `send`/`retry` being re-created on every render.
  const messagesRef = useRef(messages)
  messagesRef.current = messages

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

    let created = false
    const onToken = (chunk: string) => {
      if (!mountedRef.current || !chunk) return
      setStatus('streaming')
      setMessages((prev) => {
        if (!created) {
          created = true
          return [...prev, { id: assistantId, role: 'assistant', content: chunk }]
        }
        return prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
      })
    }

    try {
      const full = await sendHelpMessage(history, { signal: controller.signal, onToken })
      if (!mountedRef.current) return
      if (!created && full) {
        setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: full }])
      }
      setStatus('idle')
    } catch (err) {
      if (controller.signal.aborted || !mountedRef.current) return
      setMessages((prev) => [...prev, { id: newId('a'), role: 'assistant', content: ERROR_REPLY }])
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

  const busy = status === 'thinking' || status === 'streaming'

  return { messages, status, busy, send, retry, reset }
}
