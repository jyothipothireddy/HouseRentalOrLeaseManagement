export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'tenant' | 'owner' | 'admin';
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  rent: number;
  location: string;
  imageUrl: string;
  ownerId: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'apartment' | 'house' | 'condo' | 'studio';
  isAvailable: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  propertyId: string;
  tenantId: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  appliedAt: string;
  respondedAt?: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  tenantId: string;
  propertyId: string;
  ownerId: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  ownerId: string;
  amount: number;
  type: 'rent' | 'deposit' | 'maintenance';
  status: 'pending' | 'completed' | 'failed';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

export interface LeaseAgreement {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  terms: string;
  status: 'active' | 'expired' | 'terminated';
  createdAt: string;
}