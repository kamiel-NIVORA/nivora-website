import { Hero } from '@/sections/Hero'
import { Features } from '@/sections/Features'
import { Testimonials } from '@/sections/Testimonials'
import { UseCases } from '@/sections/UseCases'
import { Blog } from '@/sections/Blog'
import { FinalCTA } from '@/sections/FinalCTA'

export function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <UseCases />
      <Blog />
      <FinalCTA />
    </main>
  )
}
