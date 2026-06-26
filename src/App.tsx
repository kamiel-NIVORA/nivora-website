import { lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import { Routes, Route, useParams } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/ScrollManager'
import { Home } from '@/pages/Home'
import { ContactModalProvider } from '@/components/contact/ContactModal'

/* The landing page stays in the main bundle so it paints immediately. Every
   other route is split into its own chunk, fetched only when visited, which
   keeps the initial JS download small. */
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const ServicePage = lazy(() => import('@/pages/ServicePage').then((m) => ({ default: m.ServicePage })))
const BlogIndex = lazy(() => import('@/pages/BlogIndex').then((m) => ({ default: m.BlogIndex })))
const BlogPost = lazy(() => import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost })))
const MediaKit = lazy(() => import('@/pages/MediaKit').then((m) => ({ default: m.MediaKit })))
const WaitlistPage = lazy(() => import('@/pages/WaitlistPage').then((m) => ({ default: m.WaitlistPage })))
const AffiliatePage = lazy(() => import('@/pages/AffiliatePage').then((m) => ({ default: m.AffiliatePage })))
const HelpCenterPage = lazy(() => import('@/pages/HelpCenterPage').then((m) => ({ default: m.HelpCenterPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const PartnershipPage = lazy(() => import('@/pages/PartnershipPage').then((m) => ({ default: m.PartnershipPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NewsletterConfirmed = lazy(() => import('@/pages/NewsletterConfirmed').then((m) => ({ default: m.NewsletterConfirmed })))
const Unsubscribed = lazy(() => import('@/pages/Unsubscribed').then((m) => ({ default: m.Unsubscribed })))

/* Force a fresh ServicePage mount per slug so the intro animation replays on every service. */
function ServiceRoute() {
  const { slug } = useParams<{ slug: string }>()
  return <ServicePage key={slug} />
}

export default function App() {
  return (
    <ReactLenis root>
      <ContactModalProvider>
        <div className="relative min-h-screen bg-bg">
          <ScrollManager />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services/:slug" element={<ServiceRoute />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/media" element={<MediaKit />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/partnership" element={<PartnershipPage />} />
              <Route path="/newsletter/confirmed" element={<NewsletterConfirmed />} />
              <Route path="/unsubscribed" element={<Unsubscribed />} />
              <Route path="/terms" element={<LegalPage slug="terms" />} />
              <Route path="/privacy" element={<LegalPage slug="privacy" />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </ContactModalProvider>
    </ReactLenis>
  )
}
