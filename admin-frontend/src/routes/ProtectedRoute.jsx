import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';

const ProtectedRoute = () => {
  const token = localStorage.getItem('admin_token');

  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If token is found, load the nested dashboard route components wrapped in AdminLayout
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProtectedRoute;
