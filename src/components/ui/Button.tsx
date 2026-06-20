import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // White pill — primary CTA
        primary:
          'bg-ink text-[#0a0a0a] hover:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
        // Subtle dark pill with hairline border
        dark: 'bg-white/[0.04] text-ink-soft border border-line hover:bg-white/[0.08]',
        // Ghost / text
        ghost: 'text-muted hover:text-ink',
      },
      size: {
        sm: 'h-9 px-4 text-[13px]',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-[15px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { asChild?: boolean }

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(button({ variant, size }), className)} {...props} />
}
