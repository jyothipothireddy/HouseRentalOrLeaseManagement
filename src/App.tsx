import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Auth components
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Tenant pages
import TenantDashboard from './pages/tenant/TenantDashboard';
import BrowseProperties from './pages/tenant/BrowseProperties';
import TenantApplications from './pages/tenant/TenantApplications';
import TenantComplaints from './pages/tenant/TenantComplaints';
import TenantPayments from './pages/tenant/TenantPayments';
import TenantAgreements from './pages/tenant/TenantAgreements';

// Owner pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import OwnerProperties from './pages/owner/OwnerProperties';
import AddProperty from './pages/owner/AddProperty';
import OwnerApplications from './pages/owner/OwnerApplications';
import OwnerComplaints from './pages/owner/OwnerComplaints';
import OwnerPayments from './pages/owner/OwnerPayments';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminSettings from './pages/admin/AdminSettings';

import { initializeData } from './utils/seedData';

const AppRoutes: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const getDefaultRoute = () => {
    switch (user?.role) {
      case 'tenant':
        return '/tenant';
      case 'owner':
        return '/owner';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Redirect root to appropriate dashboard */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      
      {/* Tenant Routes */}
      <Route path="/tenant" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <TenantDashboard />
        </ProtectedRoute>
      } />
      <Route path="/tenant/properties" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <BrowseProperties />
        </ProtectedRoute>
      } />
      <Route path="/tenant/applications" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <TenantApplications />
        </ProtectedRoute>
      } />
      <Route path="/tenant/complaints" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <TenantComplaints />
        </ProtectedRoute>
      } />
      <Route path="/tenant/payments" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <TenantPayments />
        </ProtectedRoute>
      } />
      <Route path="/tenant/agreements" element={
        <ProtectedRoute allowedRoles={['tenant']}>
          <TenantAgreements />
        </ProtectedRoute>
      } />

      {/* Owner Routes */}
      <Route path="/owner" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/owner/properties" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerProperties />
        </ProtectedRoute>
      } />
      <Route path="/owner/add-property" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <AddProperty />
        </ProtectedRoute>
      } />
      <Route path="/owner/applications" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerApplications />
        </ProtectedRoute>
      } />
      <Route path="/owner/complaints" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerComplaints />
        </ProtectedRoute>
      } />
      <Route path="/owner/payments" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerPayments />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageUsers />
        </ProtectedRoute>
      } />
      <Route path="/admin/properties" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <OwnerProperties />
        </ProtectedRoute>
      } />
      <Route path="/admin/applications" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <OwnerApplications />
        </ProtectedRoute>
      } />
      <Route path="/admin/complaints" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <OwnerComplaints />
        </ProtectedRoute>
      } />
      <Route path="/admin/payments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <OwnerPayments />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminSettings />
        </ProtectedRoute>
      } />

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;