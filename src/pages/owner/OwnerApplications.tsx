import React from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { userStorage } from '../../utils/localStorage';
import { formatDate, getStatusColor, generateId } from '../../utils/helpers';
import { LeaseAgreement } from '../../types';

const OwnerApplications: React.FC = () => {
  const { user } = useAuth();
  const { applications, properties, updateApplication, addAgreement } = useData();

  const myApplications = applications.filter(app => {
    const property = properties.find(p => p.id === app.propertyId);
    return property?.ownerId === user?.id;
  });

  const handleApprove = (applicationId: string) => {
    const application = myApplications.find(app => app.id === applicationId);
    if (!application) return;

    const property = properties.find(p => p.id === application.propertyId);
    if (!property) return;

    // Update application status
    updateApplication(applicationId, {
      status: 'approved',
      respondedAt: new Date().toISOString()
    });

    // Create lease agreement
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year lease

    const agreement: LeaseAgreement = {
      id: generateId(),
      propertyId: application.propertyId,
      tenantId: application.tenantId,
      ownerId: user!.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      monthlyRent: property.rent,
      deposit: property.rent * 2, // 2 months deposit
      terms: 'Standard lease terms apply. Please contact the property owner for specific terms and conditions.',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    addAgreement(agreement);
    alert('Application approved and lease agreement created!');
  };

  const handleReject = (applicationId: string) => {
    updateApplication(applicationId, {
      status: 'rejected',
      respondedAt: new Date().toISOString()
    });
    alert('Application rejected.');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rental Applications</h1>
            <p className="text-gray-600">Review and manage tenant applications for your properties</p>
          </div>
        </div>

        {myApplications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Applications for your properties will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myApplications.map((application) => {
                    const property = properties.find(p => p.id === application.propertyId);
                    const tenant = userStorage.findById(application.tenantId);
                    
                    return (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {tenant?.name || 'Unknown User'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {tenant?.email || 'No email'}
                              </div>
                              {tenant?.phone && (
                                <div className="text-sm text-gray-500">
                                  {tenant.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {property?.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {property?.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(application.appliedAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {application.message || 'No message provided'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {application.status === 'pending' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(application.id)}
                                className="text-green-600 hover:text-green-700 font-medium"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(application.id)}
                                className="text-red-600 hover:text-red-700 font-medium"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500">
                              {application.respondedAt && `Responded on ${formatDate(application.respondedAt)}`}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OwnerApplications;