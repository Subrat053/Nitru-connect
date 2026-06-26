import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Loading Spinner Component
const LoadingPage = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-neutral-light">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="font-montserrat text-sm font-semibold text-gray-500">Loading Nitru Connect...</span>
    </div>
  </div>
);

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/public/Home'));
const Services = lazy(() => import('../pages/public/Services'));
const ServiceDetails = lazy(() => import('../pages/public/ServiceDetails'));
const About = lazy(() => import('../pages/public/About'));
const Contact = lazy(() => import('../pages/public/Contact'));
const Blog = lazy(() => import('../pages/public/Blog'));
const BlogDetails = lazy(() => import('../pages/public/BlogDetails'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/public/Terms'));
const CookiePolicy = lazy(() => import('../pages/public/CookiePolicy'));
const Disclaimer = lazy(() => import('../pages/public/Disclaimer'));

const AppRoutes = ({ onOpenQuote }) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home onOpenQuote={onOpenQuote} />} />
        <Route path="/services" element={<Services onOpenQuote={onOpenQuote} />} />
        <Route path="/services/:slug" element={<ServiceDetails onOpenQuote={onOpenQuote} />} />
        <Route path="/about" element={<About onOpenQuote={onOpenQuote} />} />
        <Route path="/contact" element={<Contact onOpenQuote={onOpenQuote} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        
        {/* Legal Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
