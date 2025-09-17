import React from 'react';
import {
  Users,
  Building,
  FileText,
  MessageSquare,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useData } from '../../contexts/DataContext';
import { userStorage } from '../../utils/localStorage';
import { formatCurrency } from '../../utils/helpers';

const AdminDashboard: React.FC = () => {
  const { properties, applications, complaints, payments, agreements } = useData();
  
  const allUsers = userStorage.getAll();
  const tenants = allUsers.filter(user => user.role === 'tenant');
  const owners = allUsers.filter(user => user.role === 'owner');
  
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const openComplaints = complaints.filter(complaint => complaint.status === 'open');
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const activeAgreements = agreements.filter(agreement => agreement.status === 'active');

  const stats = [
    {
      title: 'Total Users',
      value: allUsers.length,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Properties',
      value: properties.length,
      icon: Building,
      color: 'bg-green-500',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pending Applications',
      value: pendingApplications.length,
      icon: FileText,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Open Complaints',
      value: openComplaints.length,
      icon: AlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Leases',
      value: activeAgreements.length,
      icon: CheckCircle,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage the entire rental platform</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 text-gray-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tenants</span>
                <span className="font-medium text-gray-900">{tenants.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Property Owners</span>
                <span className="font-medium text-gray-900">{owners.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="font-medium text-gray-900">
                  {allUsers.filter(user => user.isActive).length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Properties</span>
                <span className="font-medium text-gray-900">
                  {properties.filter(p => p.isAvailable).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Rented Properties</span>
                <span className="font-medium text-gray-900">
                  {properties.filter(p => !p.isAvailable).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Rent</span>
                <span className="font-medium text-gray-900">
                  {properties.length > 0 
                    ? formatCurrency(properties.reduce((sum, p) => sum + p.rent, 0) / properties.length)
                    : '$0'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
            <div className="space-y-3">
              {applications.slice(0, 5).map((application) => {
                const property = properties.find(p => p.id === application.propertyId);
                const tenant = userStorage.findById(application.tenantId);
                return (
                  <div key={application.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{property?.title}</p>
                      <p className="text-sm text-gray-600">{tenant?.name}</p>
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
              {applications.length === 0 && (
                <p className="text-gray-500 text-center py-4">No applications yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Complaints</h2>
            <div className="space-y-3">
              {complaints.slice(0, 5).map((complaint) => {
                const property = properties.find(p => p.id === complaint.propertyId);
                return (
                  <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{complaint.title}</p>
                      <p className="text-sm text-gray-600">{property?.title}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.priority === 'high' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {complaint.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.status === 'open' ? 'bg-red-100 text-red-800' :
                        complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                );
              })}
              {complaints.length === 0 && (
                <p className="text-gray-500 text-center py-4">No complaints yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;