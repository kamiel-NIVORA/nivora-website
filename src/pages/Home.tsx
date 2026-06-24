import { Hero } from '@/sections/Hero'
import { Features } from '@/sections/Features'
import { Manifesto } from '@/sections/Manifesto'
import { Services } from '@/sections/Services'
import { Products } from '@/sections/Products'
import { Blog } from '@/sections/Blog'
import { Faq } from '@/sections/Faq'
import { FinalCTA } from '@/sections/FinalCTA'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export function Home() {
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
