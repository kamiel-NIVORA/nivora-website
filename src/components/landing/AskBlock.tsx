import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { useLang } from '@/i18n'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * "Kan dit bij ons ook?" — the block that turns a reader into a lead.
 *
 * Deliberately not another "book a call" button. Someone who has just read four
 * automations usually has one specific task in their head and a small question,
 * not an appetite for a scheduled meeting. Asking for the task first and the
 * meeting later is a much lower step.
 *
 * The visual language is lifted from the AIOS pricing block
 * (src/components/ui/RoiCalculator.tsx): selectable tiles that change border and
 * background, a filled white circle with a black check in the corner, and
 * transition-colors only, no scale jumps.
 *
 * Submissions go to /api/lead, which writes into Supabase so the lead shows up
 * in the Nivora dashboard as a live notification. See api/lead.ts.
 */

const COPY = {
  en: {
    title: 'Can this work for us?',
    body: 'Describe the task you keep seeing come back. You get a straight answer on whether it is worth automating, and where your existing software already covers it.',
    topicsLabel: 'What is it about?',
    question: 'The task, in your own words',
    questionHint: 'For example: every Monday we re-type the delivery notes from four suppliers.',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    open: 'Ask your question',
    intro: 'One question, one straight answer. No call, no demo.',
    send: 'Send',
    sending: 'Sending',
    doneTitle: 'Received.',
    doneBody: 'We read every one of these ourselves. You will hear back, usually within a day.',
    error: 'That did not go through. Mail kamiel@nivoraworks.com and it will reach us anyway.',
    topics: ['Documents', 'Email and questions', 'Quotes', 'Reporting', 'Deadlines', 'Something else'],
  },
  nl: {
    title: 'Kan dit bij ons ook?',
    body: 'Beschrijf de taak die u telkens ziet terugkomen. U krijgt een recht antwoord of het automatiseren de moeite waard is, en waar uw huidige software het al afdekt.',
    topicsLabel: 'Waarover gaat het?',
    question: 'De taak, in uw eigen woorden',
    questionHint: 'Bijvoorbeeld: elke maandag typen wij de leveringsbonnen van vier leveranciers over.',
    name: 'Naam',
    company: 'Bedrijf',
    email: 'E-mail',
    open: 'Stel uw vraag',
    intro: 'Eén vraag, één recht antwoord. Geen gesprek, geen demo.',
    send: 'Versturen',
    sending: 'Versturen',
    doneTitle: 'Ontvangen.',
    doneBody: 'We lezen deze allemaal zelf. U hoort van ons, meestal binnen een dag.',
    error: 'Dat is niet doorgekomen. Mail kamiel@nivoraworks.com, dan komt het alsnog bij ons.',
    topics: ['Documenten', 'Mail en vragen', 'Offertes', 'Rapportering', 'Termijnen', 'Iets anders'],
  },
} as const

const FIELD =
  'w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-[15px] text-ink placeholder:text-faint/70 outline-none transition-colors focus:border-line-strong'

export function AskBlock({ page }: { page: string }) {
  const { lang } = useLang()
  const t = COPY[lang]
  const [topics, setTopics] = useState<string[]>([])
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  /* Dicht bij binnenkomen. Een makelaar die aan het lezen is, moet eerst zien
     WAAROVER dit gaat; zes keuzevakjes, een tekstvak en drie velden tegelijk
     lezen als werk en niet als uitnodiging. Pas na de klik komt het formulier.
     Bewust geen `open` bij het renderen op de server: de dichte stap staat dan
     in de HTML, en dat is precies wat een crawler ook hoort te zien. */
  const [open, setOpen] = useState(false)

  const toggle = (topic: string) =>
    setTopics((cur) => (cur.includes(topic) ? cur.filter((x) => x !== topic) : [...cur, topic]))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const data = new FormData(e.currentTarget)
    setState('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          company: data.get('company'),
          email: data.get('email'),
          question: data.get('question'),
          topics,
          page,
        }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    /* data-shared: identical on every landing page, like the footer and the
       services band, so the content guard in scripts/prerender.mjs measures a
       page's own writing rather than this block. */
    <section data-shared className="mx-auto w-full max-w-[900px] px-6 py-16 lg:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0a0a0c] p-7 shadow-[0_45px_110px_-45px_rgba(0,0,0,0.9)] sm:p-9">
          {/* Ambient backlight, same treatment as the AIOS pricing card. */}
          <div className="pointer-events-none absolute inset-x-6 bottom-[-30px] h-36 rounded-[50%] bg-white/[0.10] blur-[58px]" />

          <div className="relative">
            <AnimatePresence mode="wait">
              {state === 'done' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex min-h-[280px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/90">
                    <Check className="h-5 w-5 text-black" strokeWidth={3} />
                  </span>
                  <h2 className="mt-6 font-serif text-[30px] leading-tight text-ink">{t.doneTitle}</h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-faint">{t.doneBody}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={import.meta.env.SSR ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <h2 className="font-serif text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[36px]">
                    {t.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-faint">{t.body}</p>

                  {!open && (
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="rounded-full bg-white px-6 py-3 text-[14.5px] font-medium text-black transition-opacity hover:opacity-90"
                      >
                        {t.open}
                      </button>
                      <p className="mt-3 text-[13.5px] text-faint/80">{t.intro}</p>
                    </div>
                  )}

                  <div className={open ? '' : 'hidden'}>
                  <p className="label-mono mt-8 text-faint">{t.topicsLabel}</p>
                  <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {t.topics.map((topic) => {
                      const on = topics.includes(topic)
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggle(topic)}
                          aria-pressed={on}
                          className={cn(
                            'relative rounded-2xl border p-3.5 pr-9 text-left text-[13.5px] font-medium transition-colors',
                            on
                              ? 'border-white/30 bg-white/[0.08] text-ink'
                              : 'border-line bg-white/[0.02] text-muted hover:border-line-strong',
                          )}
                        >
                          {topic}
                          <span
                            className={cn(
                              'absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full border transition-all',
                              on ? 'border-white/50 bg-white/90' : 'border-line',
                            )}
                          >
                            {on && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <label className="label-mono mt-8 block text-faint" htmlFor="ask-question">
                    {t.question}
                  </label>
                  <textarea
                    id="ask-question"
                    name="question"
                    rows={3}
                    required
                    placeholder={t.questionHint}
                    className={cn(FIELD, 'mt-3 resize-none leading-relaxed')}
                  />

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <input name="name" required placeholder={t.name} className={FIELD} autoComplete="name" />
                    <input name="company" placeholder={t.company} className={FIELD} autoComplete="organization" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t.email}
                      className={FIELD}
                      autoComplete="email"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="h-11 rounded-full border border-white/40 bg-white/[0.16] px-7 text-[14px] font-medium text-ink shadow-[0_0_30px_-4px_rgba(245,245,245,0.35)] transition-colors hover:bg-white/[0.22] disabled:opacity-60"
                    >
                      {state === 'sending' ? t.sending : t.send}
                    </button>
                    {state === 'error' && <span className="text-[13.5px] text-muted">{t.error}</span>}
                  </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
