import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RippleButton } from '@/components/ui/RippleButton'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What exactly does Nivora do?',
    a: 'Two things. We build and install custom AI systems for your business, from private AI inside your own infrastructure to custom apps and complete ERP systems. And we make our own software, Box and Voice, that you can use directly. Either way, it is shaped around how you already work.',
  },
  {
    q: 'Do I need to be technical to work with you?',
    a: 'No. You bring the problem, or the idea you cannot get built, and we handle the rest, from design to building to installing it inside your tools. You stay in plain language the whole way.',
  },
  {
    q: 'How do you charge?',
    a: 'It depends on the work, so we never quote blind. We first show you what a project is worth on your own numbers, then agree a price. You see the value before you commit, not after.',
  },
  {
    q: 'Is my data safe with private AI?',
    a: 'Yes. Local AI runs inside your own infrastructure, so your data never leaves your walls. Everything is GDPR-ready, and the systems we build are fully yours to keep.',
  },
  {
    q: 'When do Box and Voice launch?',
    a: 'They are coming soon. Join the waiting list and you will be the first to know the moment they are live, with early access before the public launch.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a short strategy call. We listen to the challenge, show you what is worth doing, and prove the value before any build begins.',
  },
]

/**
 * Homepage FAQ — the same accordion language used on the service pages, but with
 * whole-company questions. Sits just before the conversion block so it catches
 * the last objections right before the ask.
 */
export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="relative mx-auto w-full max-w-[1200px] px-6 py-24 lg:py-28">
      <SectionHeading
        title="Questions, answered"
        subtitle="The things people usually want to know before they reach out."
      />

      <div className="mx-auto mt-14 flex w-full max-w-[760px] flex-col gap-3">
        {FAQ.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <Reveal key={item.q} delay={(i % 4) * 0.04}>
              <div className="overflow-hidden rounded-[18px] border border-line bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium text-ink">{item.q}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 text-faint transition-transform duration-300', isOpen && 'rotate-180')}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease }}
                    >
                      <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-faint">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center gap-3.5">
          <p className="text-center text-[14px] leading-relaxed text-faint">
            Still have a question?
          </p>
          <RippleButton variant="ghost" href="/help" className="h-11 px-5 text-sm">
            Visit the Help Center
          </RippleButton>
        </div>
      </Reveal>
    </section>
  )
}
