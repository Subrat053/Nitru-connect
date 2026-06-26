import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Loading Spinner Component
const LoadingPage = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-neutral-light">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="font-montserrat text-sm font-semibold text-gray-500">Loading Nitru Connect...</span>
    </div>
  </div>
);

// Admin Pages (Lazy Loaded)
const Login = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Enquiries = lazy(() => import('../pages/admin/Enquiries'));
const EnquiryDetails = lazy(() => import('../pages/admin/EnquiryDetails'));
const ServicesManage = lazy(() => import('../pages/admin/ServicesManage'));
const SiteSettings = lazy(() => import('../pages/admin/SiteSettings'));
const TestimonialsManage = lazy(() => import('../pages/admin/TestimonialsManage'));
const PartnersManage = lazy(() => import('../pages/admin/PartnersManage'));
const BlogsManage = lazy(() => import('../pages/admin/BlogsManage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Root Redirect to Dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Dashboard Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<EnquiryDetails />} />
          <Route path="services" element={<ServicesManage />} />
          <Route path="settings" element={<SiteSettings />} />
          <Route path="testimonials" element={<TestimonialsManage />} />
          <Route path="partners" element={<PartnersManage />} />
          <Route path="blogs" element={<BlogsManage />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
