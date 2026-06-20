import { RippleButton } from './RippleButton'
import { useContactModal } from '@/components/contact/ContactModal'
import { BOOKING_URL } from '@/data/contact'

/**
 * Primary "book a call" CTA.
 *
 * If a scheduler link (BOOKING_URL) is set, it links straight out to it.
 * Until then it falls back to opening the contact modal — so the button always
 * does something useful, and flips to the real scheduler the moment the URL is
 * filled in (one place, no page edits).
 */
export function BookCallButton({
  children,
  variant = 'solid',
  className,
}: {
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
}) {
  const { open } = useContactModal()

  if (BOOKING_URL) {
    return (
      <RippleButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
        {children}
      </RippleButton>
    )
  }

  return (
    <RippleButton
      href="#contact"
      variant={variant}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        open()
      }}
    >
      {children}
    </RippleButton>
  )
}
