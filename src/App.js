import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/JS HomePage';
import Login from './components/JS Login';
import Register from './components/JS Register';
import AdminDashboard from './components/JS AdminDashboard';
import OwnerDashboard from './components/JS OwnerDashboard';
import TenantDashboard from './components/JS TenantDashboard';
import PropertyDetailsPage from './components/JS PropertyDetailsPage';
import AddPropertyPage from './components/JS AddPropertyPage';
import AdminPropertyManagement from './components/JS AdminPropertyManagement';
import ApplicationsPage from './components/JS ApplicationsPage';
import ApplicationStatusPage from './components/JS ApplicationStatusPage';
import DocumentVerificationPage from './components/JS DocumentVerificationPage';
import LeaseAgreementPage from './components/JS LeaseAgreementPage';
import NotificationsPage from './components/JS NotificationsPage';
import OwnerPaymentPage from './components/JS OwnerPaymentPage';
import OwnerPropertyManagement from './components/JS OwnerPropertyManagement';
import ProfilePage from './components/JS ProfilePage';
import PropertyManagementPage from './components/JS PropertyManagementPage';
import PropertySearchPage from './components/JS PropertySearchPage';
import TenantPaymentPage from './components/JS TenantPaymentPage';
import UserManagementPage from './components/JS UserManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/property-details/:id" element={<PropertyDetailsPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/admin-property-management" element={<AdminPropertyManagement />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/application-status" element={<ApplicationStatusPage />} />
        <Route path="/document-verification" element={<DocumentVerificationPage />} />
        <Route path="/lease-agreement" element={<LeaseAgreementPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/owner-payment" element={<OwnerPaymentPage />} />
        <Route path="/owner-property-management" element={<OwnerPropertyManagement />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/property-management" element={<PropertyManagementPage />} />
        <Route path="/property-search" element={<PropertySearchPage />} />
        <Route path="/tenant-payment" element={<TenantPaymentPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;