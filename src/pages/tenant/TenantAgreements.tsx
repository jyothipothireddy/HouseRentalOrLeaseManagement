import React, { useState } from 'react';
import { FileText, Download, Video, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';

const TenantAgreements: React.FC = () => {
  const { user } = useAuth();
  const { agreements, properties } = useData();
  const [selectedAgreement, setSelectedAgreement] = useState<string | null>(null);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);

  const myAgreements = agreements.filter(agreement => agreement.tenantId === user?.id);

  const selectedAgreementData = selectedAgreement 
    ? myAgreements.find(agreement => agreement.id === selectedAgreement)
    : null;

  const selectedProperty = selectedAgreementData 
    ? properties.find(p => p.id === selectedAgreementData.propertyId)
    : null;

  const handleDownload = (agreementId: string) => {
    // In a real app, this would generate and download a PDF
    alert('Agreement downloaded successfully! (Demo mode)');
  };

  const handleVideoCall = () => {
    setShowVideoCallModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lease Agreements</h1>
            <p className="text-gray-600">View and manage your lease agreements</p>
          </div>
          <button
            onClick={handleVideoCall}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Video className="h-5 w-5" />
            <span>Video Call</span>
          </button>
        </div>

        {myAgreements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lease agreements</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your approved rental applications will appear here as lease agreements.
            </p>
          </div>
        ) : (
          <>
            {/* Agreements Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myAgreements.map((agreement) => {
                const property = properties.find(p => p.id === agreement.propertyId);
                return (
                  <div key={agreement.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{property?.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>
                        {agreement.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(agreement.startDate)} - {formatDate(agreement.endDate)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Monthly Rent:</span>
                          <p className="font-medium text-gray-900">{formatCurrency(agreement.monthlyRent)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Security Deposit:</span>
                          <p className="font-medium text-gray-900">{formatCurrency(agreement.deposit)}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <button
                          onClick={() => setSelectedAgreement(agreement.id)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDownload(agreement.id)}
                          className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Agreement Details Modal */}
        <Modal
          isOpen={!!selectedAgreement}
          onClose={() => setSelectedAgreement(null)}
          title="Lease Agreement Details"
          size="lg"
        >
          {selectedAgreementData && selectedProperty && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProperty.title}</h3>
                <p className="text-gray-600">{selectedProperty.location}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Agreement Details</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Start Date:</dt>
                      <dd className="text-sm font-medium text-gray-900">{formatDate(selectedAgreementData.startDate)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">End Date:</dt>
                      <dd className="text-sm font-medium text-gray-900">{formatDate(selectedAgreementData.endDate)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Status:</dt>
                      <dd>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAgreementData.status)}`}>
                          {selectedAgreementData.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Financial Details</h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Monthly Rent:</dt>
                      <dd className="text-sm font-medium text-gray-900">{formatCurrency(selectedAgreementData.monthlyRent)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Security Deposit:</dt>
                      <dd className="text-sm font-medium text-gray-900">{formatCurrency(selectedAgreementData.deposit)}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Terms and Conditions</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedAgreementData.terms || 'Standard lease terms apply. Please contact the property owner for specific terms and conditions.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleDownload(selectedAgreementData.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setSelectedAgreement(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Video Call Modal */}
        <Modal
          isOpen={showVideoCallModal}
          onClose={() => setShowVideoCallModal(false)}
          title="Video Call (Demo)"
        >
          <div className="text-center space-y-4">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Video call interface would appear here</p>
                <p className="text-sm text-gray-500">This is a demo feature</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
                Start Call
              </button>
              <button 
                onClick={() => setShowVideoCallModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default TenantAgreements;