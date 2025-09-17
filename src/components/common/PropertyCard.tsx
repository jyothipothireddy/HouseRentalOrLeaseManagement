import React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../../types';
import { formatCurrency, capitalizeFirst } from '../../utils/helpers';

interface PropertyCardProps {
  property: Property;
  onApply?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  showActions?: boolean;
  showOwnerActions?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onApply,
  onEdit,
  onDelete,
  showActions = false,
  showOwnerActions = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {property.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.area} sq ft</span>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
            {capitalizeFirst(property.type)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(property.rent)}</span>
            <span className="text-gray-600 text-sm">/month</span>
          </div>
          
          <div className="flex space-x-2">
            {showActions && property.isAvailable && onApply && (
              <button
                onClick={() => onApply(property)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
            )}
            
            {showOwnerActions && (
              <>
                {onEdit && (
                  <button
                    onClick={() => onEdit(property)}
                    className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(property)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;