import { useLang, type Lang } from '@/i18n'
import { cn } from '@/lib/utils'

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'nl', label: 'NL' },
]

/**
 * Clean, simple language toggle. A small segmented control with the active
 * language highlighted. Used at the bottom of the Resources dropdown and in the
 * mobile menu, so switching English / Dutch is always one tap away.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line bg-white/[0.04] p-0.5',
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={cn(
              'inline-flex min-h-[36px] items-center justify-center rounded-full px-3.5 py-1.5 text-[13px] font-medium leading-none transition-colors',
              active ? 'bg-white/[0.12] text-ink' : 'text-faint hover:text-ink',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
