import { ReactLenis } from 'lenis/react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/ScrollManager'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { ServicePage } from '@/pages/ServicePage'
import { BlogIndex } from '@/pages/BlogIndex'
import { BlogPost } from '@/pages/BlogPost'
import { MediaKit } from '@/pages/MediaKit'
import { WaitlistPage } from '@/pages/WaitlistPage'
import { LegalPage } from '@/pages/LegalPage'
import { TERMS, PRIVACY } from '@/data/legal'
import { ContactModalProvider } from '@/components/contact/ContactModal'

export default function App() {
  return (
    <ReactLenis root>
      <ContactModalProvider>
        <div className="relative min-h-screen bg-bg">
          <ScrollManager />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/media" element={<MediaKit />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/terms" element={<LegalPage doc={TERMS} />} />
            <Route path="/privacy" element={<LegalPage doc={PRIVACY} />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </ContactModalProvider>
    </ReactLenis>
  )
}
