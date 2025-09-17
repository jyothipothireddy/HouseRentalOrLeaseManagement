import { User, Property, Payment } from '../types';
import { userStorage, propertyStorage, paymentStorage } from './localStorage';
import { generateId } from './helpers';

export const initializeData = () => {
  // Check if data already exists
  const existingUsers = userStorage.getAll();
  if (existingUsers.length > 0) return;

  // Create admin user
  const admin: User = {
    id: 'admin-1',
    email: 'admin@rental.com',
    password: 'admin123',
    name: 'System Administrator',
    role: 'admin',
    phone: '555-0001',
    isActive: true,
    createdAt: new Date().toISOString()
  };

  // Create sample owner
  const owner: User = {
    id: 'owner-1',
    email: 'owner@rental.com',
    password: 'owner123',
    name: 'Property Owner',
    role: 'owner',
    phone: '555-0002',
    isActive: true,
    createdAt: new Date().toISOString()
  };

  // Create sample tenant
  const tenant: User = {
    id: 'tenant-1',
    email: 'tenant@rental.com',
    password: 'tenant123',
    name: 'John Tenant',
    role: 'tenant',
    phone: '555-0003',
    isActive: true,
    createdAt: new Date().toISOString()
  };

  // Add users to storage
  userStorage.add(admin);
  userStorage.add(owner);
  userStorage.add(tenant);

  // Create sample properties
  const properties: Property[] = [
    {
      id: generateId(),
      title: 'Modern Downtown Apartment',
      description: 'Beautiful 2-bedroom apartment in the heart of downtown with city views and modern amenities.',
      rent: 2500,
      location: 'Downtown, City Center',
      imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      ownerId: owner.id,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'apartment',
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      title: 'Cozy Studio Near University',
      description: 'Perfect for students or young professionals. Close to public transport and university campus.',
      rent: 1200,
      location: 'University District',
      imageUrl: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      ownerId: owner.id,
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      type: 'studio',
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      id: generateId(),
      title: 'Family House with Garden',
      description: 'Spacious 3-bedroom house with a large garden, perfect for families with children.',
      rent: 3200,
      location: 'Suburban Area',
      imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      ownerId: owner.id,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: 'house',
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ];

  // Add properties to storage
  properties.forEach(property => propertyStorage.add(property));

  // Create sample payment for tenant
  const samplePayment: Payment = {
    id: generateId(),
    tenantId: tenant.id,
    propertyId: properties[0].id,
    ownerId: owner.id,
    amount: 2500,
    type: 'rent',
    status: 'completed',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    paidDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  paymentStorage.add(samplePayment);
};