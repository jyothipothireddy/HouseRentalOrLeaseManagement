import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import PropertyCard from '../../components/common/PropertyCard';
import Modal from '../../components/common/Modal';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Property, Application } from '../../types';
import { generateId } from '../../utils/helpers';

const BrowseProperties: React.FC = () => {
  const { user } = useAuth();
  const { properties, addApplication } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minRent: '',
    maxRent: '',
    bedrooms: ''
  });

  const availableProperties = properties.filter(property => property.isAvailable);

  const filteredProperties = availableProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || property.type === filters.type;
    const matchesMinRent = !filters.minRent || property.rent >= parseInt(filters.minRent);
    const matchesMaxRent = !filters.maxRent || property.rent <= parseInt(filters.maxRent);
    const matchesBedrooms = !filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms);

    return matchesSearch && matchesType && matchesMinRent && matchesMaxRent && matchesBedrooms;
  });

  const handleApply = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleSubmitApplication = () => {
    if (!selectedProperty || !user) return;

    const application: Application = {
      id: generateId(),
      propertyId: selectedProperty.id,
      tenantId: user.id,
      status: 'pending',
      message: applicationMessage,
      appliedAt: new Date().toISOString()
    };

    addApplication(application);
    setSelectedProperty(null);
    setApplicationMessage('');
    alert('Application submitted successfully!');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browse Properties</h1>
            <p className="text-gray-600">Find your perfect rental property</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div>
              <input
                type="number"
                name="minRent"
                placeholder="Min Rent"
                value={filters.minRent}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="number"
                name="maxRent"
                placeholder="Max Rent"
                value={filters.maxRent}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onApply={handleApply}
              showActions={true}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria to find more properties.
            </p>
          </div>
        )}

        {/* Application Modal */}
        <Modal
          isOpen={!!selectedProperty}
          onClose={() => {
            setSelectedProperty(null);
            setApplicationMessage('');
          }}
          title="Apply for Property"
        >
          {selectedProperty && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">{selectedProperty.title}</h3>
                <p className="text-gray-600">{selectedProperty.location}</p>
                <p className="text-lg font-bold text-gray-900">${selectedProperty.rent}/month</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Message
                </label>
                <textarea
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell the owner why you're interested in this property..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    setApplicationMessage('');
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default BrowseProperties;