import { Hero } from '@/sections/Hero'
import { Features } from '@/sections/Features'
import { Manifesto } from '@/sections/Manifesto'
import { Services } from '@/sections/Services'
import { Products } from '@/sections/Products'
import { Blog } from '@/sections/Blog'
import { Faq } from '@/sections/Faq'
import { FinalCTA } from '@/sections/FinalCTA'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { useLang } from '@/i18n'
import { useSeo, DEFAULT_TITLE } from '@/lib/seo'

export function Home() {
  const { lang } = useLang()
  useSeo({
    title:
      lang === 'nl'
        ? 'Nivora Works - Intelligente systemen voor ambitieuze bedrijven'
        : DEFAULT_TITLE,
    description:
      lang === 'nl'
        ? 'Nivora ontwerpt AI-systemen, apps en software op maat van hoe uw bedrijf werkt. Slimme tools die uw bedrijf beter, sneller en rustiger laten draaien. Gevestigd in Brugge.'
        : undefined,
    path: '/',
  })
  return (
    <main>
      <Hero />
      <Features />
      <Manifesto />
      <Services />
      <Products />
      <Blog />
      <NewsletterSignup source="home" />
      <Faq />
      <FinalCTA />
    </main>
  )
}
