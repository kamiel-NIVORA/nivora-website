import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
  align?: 'center' | 'left'
}

export function SectionHeading({ title, subtitle, eyebrow, className, align = 'center' }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="label-mono mb-4 block">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal>
        <h2 className="max-w-3xl font-serif text-[32px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[40px] lg:text-5xl lg:leading-[1.2]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.08}>
          <p
            className={cn(
              'mt-4 max-w-xl text-[15px] leading-relaxed text-faint',
              align === 'center' ? 'mx-auto' : '',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
