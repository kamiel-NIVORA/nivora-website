import { Aperture, Hexagon, Sparkle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLang } from '@/i18n'

type Card =
  | { kind: 'quote'; bg: string; avatar: string; name: string; role: string; quote: string }
  | { kind: 'portrait'; image: string; name: string; role: string }
  | { kind: 'logo'; name: string; Icon: typeof Hexagon }

const COPY = {
  en: {
    title: 'Hear from customers like you',
    subtitle: 'Discover what brought them to us, what they tried before, and how they work today.',
    cards: [
      {
        kind: 'quote',
        bg: '/testimonials/s8GPxlDcxupng4c3ToZpTaaLQ.webp',
        avatar: '/testimonials/34CHRdTurlCbv7kCKIQR4GZmcI.webp',
        name: 'James Gowley',
        role: 'CEO · NeoRick',
        quote:
          'This tool transformed how we do research. We can scan, generate summaries, and deliver insights in a fraction of the time.',
      },
      { kind: 'logo', name: 'NeoRick', Icon: Sparkle },
      { kind: 'portrait', image: '/testimonials/Ksud8CvJrW8EBKK6UADg7okcqg.webp', name: 'Marcus Lee', role: 'Head of Research' },
      {
        kind: 'quote',
        bg: '/testimonials/gdn7G7rY1qzcykNXS1rYUKGlGM.webp',
        avatar: '/testimonials/NE97Dd8nYnoAtbGouH0WCRgyOM.webp',
        name: 'Thomas Aspen',
        role: 'CTO · Analyx',
        quote:
          'The AI research analyst helps our team scan information quickly, making strategic decisions easier and far more data-driven and accurate.',
      },
      { kind: 'portrait', image: '/testimonials/MKA7INDXm9nEkdIrbzOYK7fJ4A.webp', name: 'Sara Müller', role: 'Operations Lead' },
      { kind: 'logo', name: 'Colfare', Icon: Aperture },
      { kind: 'portrait', image: '/testimonials/rxBNYoypQWFpaC9BMn51oDYSs8.webp', name: 'Elena Park', role: 'Data Analyst' },
      {
        kind: 'quote',
        bg: '/testimonials/oJMn0JMIXRyu0NZ9cSstBe6B9Q.webp',
        avatar: '/testimonials/xOeofCFdYTCvctAM7dTQu3f0oXU.jpg',
        name: 'Aria Patel',
        role: 'Founder · Colfare',
        quote:
          'We replaced three tools with one workspace. Everything our analysts need now lives in a single, calm place.',
      },
    ] as Card[],
  },
  nl: {
    title: 'Hoor het van klanten zoals u',
    subtitle: 'Ontdek wat hen bij ons bracht, wat ze daarvoor probeerden en hoe ze vandaag werken.',
    cards: [
      {
        kind: 'quote',
        bg: '/testimonials/s8GPxlDcxupng4c3ToZpTaaLQ.webp',
        avatar: '/testimonials/34CHRdTurlCbv7kCKIQR4GZmcI.webp',
        name: 'James Gowley',
        role: 'CEO · NeoRick',
        quote:
          'Deze tool veranderde de manier waarop we research doen. We scannen, genereren samenvattingen en leveren inzichten in een fractie van de tijd.',
      },
      { kind: 'logo', name: 'NeoRick', Icon: Sparkle },
      { kind: 'portrait', image: '/testimonials/Ksud8CvJrW8EBKK6UADg7okcqg.webp', name: 'Marcus Lee', role: 'Hoofd Research' },
      {
        kind: 'quote',
        bg: '/testimonials/gdn7G7rY1qzcykNXS1rYUKGlGM.webp',
        avatar: '/testimonials/NE97Dd8nYnoAtbGouH0WCRgyOM.webp',
        name: 'Thomas Aspen',
        role: 'CTO · Analyx',
        quote:
          'De AI-research-analist helpt ons team om informatie snel te scannen, waardoor strategische beslissingen makkelijker, datagedreven en veel accurater worden.',
      },
      { kind: 'portrait', image: '/testimonials/MKA7INDXm9nEkdIrbzOYK7fJ4A.webp', name: 'Sara Müller', role: 'Operations Lead' },
      { kind: 'logo', name: 'Colfare', Icon: Aperture },
      { kind: 'portrait', image: '/testimonials/rxBNYoypQWFpaC9BMn51oDYSs8.webp', name: 'Elena Park', role: 'Data-analist' },
      {
        kind: 'quote',
        bg: '/testimonials/oJMn0JMIXRyu0NZ9cSstBe6B9Q.webp',
        avatar: '/testimonials/xOeofCFdYTCvctAM7dTQu3f0oXU.jpg',
        name: 'Aria Patel',
        role: 'Founder · Colfare',
        quote:
          'We vervingen drie tools door één workspace. Alles wat onze analisten nodig hebben, staat nu op één rustige plek.',
      },
    ] as Card[],
  },
} as const

function TestimonialCard({ card }: { card: Card }) {
  if (card.kind === 'logo') {
    const { Icon, name } = card
    return (
      <div className="flex h-[340px] w-[260px] shrink-0 flex-col items-center justify-center gap-3 rounded-3xl border border-line bg-white/[0.02]">
        <Icon className="h-7 w-7 text-ink-soft" strokeWidth={1.5} />
        <span className="text-lg font-semibold tracking-tight text-ink-soft">{name}</span>
      </div>
    )
  }

  if (card.kind === 'portrait') {
    return (
      <div className="relative h-[340px] w-[280px] shrink-0 overflow-hidden rounded-3xl border border-line">
        <img src={card.image} alt={card.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
          <p className="text-[15px] font-semibold text-ink">{card.name}</p>
          <p className="text-[13px] text-ink-soft/70">{card.role}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[340px] w-[440px] shrink-0 overflow-hidden rounded-3xl border border-line">
      <img src={card.bg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center gap-3">
          <img src={card.avatar} alt={card.name} className="h-9 w-9 rounded-full object-cover" loading="lazy" />
          <div>
            <p className="text-sm font-semibold text-ink">{card.name}</p>
            <p className="text-xs text-ink-soft/70">{card.role}</p>
          </div>
        </div>
        <p className="font-serif text-xl leading-snug tracking-tight text-ink">“{card.quote}”</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { lang } = useLang()
  const t = COPY[lang]
  const loop = [...t.cards, ...t.cards]
  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <SectionHeading title={t.title} subtitle={t.subtitle} />
      </div>

      {/* Marquee */}
      <div className="group relative mt-14">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-5 [animation:marquee_55s_linear_infinite] group-hover:[animation-play-state:paused]">
          {loop.map((card, i) => (
            <TestimonialCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
