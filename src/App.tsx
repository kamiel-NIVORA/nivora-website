import { lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import { Routes, Route, useParams, useLocation, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollManager } from '@/components/ScrollManager'
import { CookieConsent } from '@/components/CookieConsent'
import { Home } from '@/pages/Home'
import { ContactModalProvider } from '@/components/contact/ContactModal'
import { splitLangPath } from '@/i18n'

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
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NewsletterConfirmed = lazy(() => import('@/pages/NewsletterConfirmed').then((m) => ({ default: m.NewsletterConfirmed })))
const Unsubscribed = lazy(() => import('@/pages/Unsubscribed').then((m) => ({ default: m.Unsubscribed })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

/* Force a fresh ServicePage mount per slug so the intro animation replays on every service. */
function ServiceRoute() {
  const { slug } = useParams<{ slug: string }>()
  return <ServicePage key={slug} />
}

/* The one route table, rendered twice: once at the root (English) and once under
   /nl (Dutch). Every page reads the active language from the URL (see src/i18n),
   so the same components serve both. `homeHref` keeps in-tree redirects on the
   right language. Returned as a fragment so React Router can read the <Route>s. */
function routeTree(homeHref: string) {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services/:slug" element={<ServiceRoute />} />
      <Route path="blog" element={<BlogIndex />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="media" element={<MediaKit />} />
      <Route path="waitlist" element={<WaitlistPage />} />
      <Route path="affiliate" element={<AffiliatePage />} />
      <Route path="help" element={<HelpCenterPage />} />
      <Route path="contact" element={<ContactPage />} />
      {/* Partnership page temporarily hidden, redirect to home for now. */}
      <Route path="partnership" element={<Navigate to={homeHref} replace />} />
      <Route path="newsletter/confirmed" element={<NewsletterConfirmed />} />
      <Route path="unsubscribed" element={<Unsubscribed />} />
      <Route path="terms" element={<LegalPage slug="terms" />} />
      <Route path="privacy" element={<LegalPage slug="privacy" />} />
    </>
  )
}

/* Routes that render as a single focused frame: no site chrome (the waitlist
   stands on its own, like the Nivora booking page). Matched on the base path so
   /waitlist and /nl/waitlist behave the same. */
const BARE_ROUTES = ['/waitlist']

export default function App() {
  const { pathname } = useLocation()
  const { base } = splitLangPath(pathname)
  const bare = BARE_ROUTES.includes(base)
  return (
    <ReactLenis root>
      <ContactModalProvider>
        <div className="relative min-h-screen bg-bg">
          <ScrollManager />
          {!bare && <Navbar />}
          <Suspense
            fallback={
              <div className="grid min-h-svh place-items-center">
                <img src="/brand/nivora-logo.png" alt="" className="h-6 w-auto animate-pulse opacity-50" />
              </div>
            }
          >
            <Routes>
              {routeTree('/')}
              <Route path="nl" element={<Outlet />}>
                {routeTree('/nl')}
              </Route>
              {/* Real 404 (noindex) so unknown URLs never duplicate the homepage. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {!bare && <Footer />}
          <CookieConsent />
        </div>
      </ContactModalProvider>
    </ReactLenis>
  )
}
