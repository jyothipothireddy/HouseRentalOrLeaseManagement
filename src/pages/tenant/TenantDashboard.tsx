import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  FileText,
  MessageSquare,
  CreditCard,
  Home,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatCurrency } from '../../utils/helpers';

const TenantDashboard: React.FC = () => {
  const { user } = useAuth();
  const { properties, applications, complaints, payments, agreements } = useData();

  const myApplications = applications.filter(app => app.tenantId === user?.id);
  const myComplaints = complaints.filter(complaint => complaint.tenantId === user?.id);
  const myPayments = payments.filter(payment => payment.tenantId === user?.id);
  const myAgreements = agreements.filter(agreement => agreement.tenantId === user?.id);

  const pendingApplications = myApplications.filter(app => app.status === 'pending').length;
  const approvedApplications = myApplications.filter(app => app.status === 'approved').length;
  const rejectedApplications = myApplications.filter(app => app.status === 'rejected').length;
  const openComplaints = myComplaints.filter(complaint => complaint.status === 'open').length;
  const pendingPayments = myPayments.filter(payment => payment.status === 'pending').length;

  const quickActions = [
    {
      title: 'Browse Properties',
      description: 'Find your perfect rental property',
      icon: Search,
      link: '/tenant/properties',
      color: 'bg-blue-500'
    },
    {
      title: 'My Applications',
      description: 'Track your rental applications',
      icon: FileText,
      link: '/tenant/applications',
      color: 'bg-green-500'
    },
    {
      title: 'Raise Complaint',
      description: 'Report issues with your rental',
      icon: MessageSquare,
      link: '/tenant/complaints',
      color: 'bg-orange-500'
    },
    {
      title: 'Make Payment',
      description: 'Pay your rent and deposits',
      icon: CreditCard,
      link: '/tenant/payments',
      color: 'bg-purple-500'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Here's what's happening with your rental journey</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{pendingApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved Applications</p>
                <p className="text-2xl font-bold text-gray-900">{approvedApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Open Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{openComplaints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-2 rounded-lg ${action.color} mb-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Link to="/tenant/applications" className="text-blue-600 hover:text-blue-700 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {myApplications.slice(0, 3).map((application) => {
                const property = properties.find(p => p.id === application.propertyId);
                return (
                  <div key={application.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{property?.title}</p>
                      <p className="text-sm text-gray-600">{property?.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                );
              })}
              {myApplications.length === 0 && (
                <p className="text-gray-500 text-center py-4">No applications yet</p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
              <Link to="/tenant/payments" className="text-blue-600 hover:text-blue-700 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {myPayments.slice(0, 3).map((payment) => {
                const property = properties.find(p => p.id === payment.propertyId);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-600">{property?.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                );
              })}
              {myPayments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No payments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TenantDashboard;