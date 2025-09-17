import { User, Property, Application, Complaint, Payment, LeaseAgreement } from '../types';

const STORAGE_KEYS = {
  USERS: 'rental_users',
  PROPERTIES: 'rental_properties',
  APPLICATIONS: 'rental_applications',
  COMPLAINTS: 'rental_complaints',
  PAYMENTS: 'rental_payments',
  AGREEMENTS: 'rental_agreements',
  CURRENT_USER: 'rental_current_user'
};

// Generic storage utilities
export const storage = {
  get: <T>(key: string): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage key ${key}:`, error);
      return [];
    }
  },

  set: <T>(key: string, data: T[]): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing to localStorage key ${key}:`, error);
    }
  },

  add: <T extends { id: string }>(key: string, item: T): void => {
    const items = storage.get<T>(key);
    items.push(item);
    storage.set(key, items);
  },

  update: <T extends { id: string }>(key: string, id: string, updateFn: (item: T) => T): void => {
    const items = storage.get<T>(key);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = updateFn(items[index]);
      storage.set(key, items);
    }
  },

  remove: <T extends { id: string }>(key: string, id: string): void => {
    const items = storage.get<T>(key);
    const filtered = items.filter(item => item.id !== id);
    storage.set(key, filtered);
  }
};

// Specific data access functions
export const userStorage = {
  getAll: () => storage.get<User>(STORAGE_KEYS.USERS),
  add: (user: User) => storage.add(STORAGE_KEYS.USERS, user),
  update: (id: string, updateFn: (user: User) => User) => storage.update(STORAGE_KEYS.USERS, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.USERS, id),
  findByEmail: (email: string) => userStorage.getAll().find(user => user.email === email),
  findById: (id: string) => userStorage.getAll().find(user => user.id === id)
};

export const propertyStorage = {
  getAll: () => storage.get<Property>(STORAGE_KEYS.PROPERTIES),
  add: (property: Property) => storage.add(STORAGE_KEYS.PROPERTIES, property),
  update: (id: string, updateFn: (property: Property) => Property) => storage.update(STORAGE_KEYS.PROPERTIES, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.PROPERTIES, id),
  findById: (id: string) => propertyStorage.getAll().find(property => property.id === id),
  findByOwnerId: (ownerId: string) => propertyStorage.getAll().filter(property => property.ownerId === ownerId)
};

export const applicationStorage = {
  getAll: () => storage.get<Application>(STORAGE_KEYS.APPLICATIONS),
  add: (application: Application) => storage.add(STORAGE_KEYS.APPLICATIONS, application),
  update: (id: string, updateFn: (application: Application) => Application) => storage.update(STORAGE_KEYS.APPLICATIONS, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.APPLICATIONS, id),
  findByTenantId: (tenantId: string) => applicationStorage.getAll().filter(app => app.tenantId === tenantId),
  findByPropertyId: (propertyId: string) => applicationStorage.getAll().filter(app => app.propertyId === propertyId)
};

export const complaintStorage = {
  getAll: () => storage.get<Complaint>(STORAGE_KEYS.COMPLAINTS),
  add: (complaint: Complaint) => storage.add(STORAGE_KEYS.COMPLAINTS, complaint),
  update: (id: string, updateFn: (complaint: Complaint) => Complaint) => storage.update(STORAGE_KEYS.COMPLAINTS, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.COMPLAINTS, id),
  findByTenantId: (tenantId: string) => complaintStorage.getAll().filter(complaint => complaint.tenantId === tenantId),
  findByOwnerId: (ownerId: string) => complaintStorage.getAll().filter(complaint => complaint.ownerId === ownerId)
};

export const paymentStorage = {
  getAll: () => storage.get<Payment>(STORAGE_KEYS.PAYMENTS),
  add: (payment: Payment) => storage.add(STORAGE_KEYS.PAYMENTS, payment),
  update: (id: string, updateFn: (payment: Payment) => Payment) => storage.update(STORAGE_KEYS.PAYMENTS, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.PAYMENTS, id),
  findByTenantId: (tenantId: string) => paymentStorage.getAll().filter(payment => payment.tenantId === tenantId),
  findByOwnerId: (ownerId: string) => paymentStorage.getAll().filter(payment => payment.ownerId === ownerId)
};

export const agreementStorage = {
  getAll: () => storage.get<LeaseAgreement>(STORAGE_KEYS.AGREEMENTS),
  add: (agreement: LeaseAgreement) => storage.add(STORAGE_KEYS.AGREEMENTS, agreement),
  update: (id: string, updateFn: (agreement: LeaseAgreement) => LeaseAgreement) => storage.update(STORAGE_KEYS.AGREEMENTS, id, updateFn),
  remove: (id: string) => storage.remove(STORAGE_KEYS.AGREEMENTS, id),
  findByTenantId: (tenantId: string) => agreementStorage.getAll().filter(agreement => agreement.tenantId === tenantId),
  findByOwnerId: (ownerId: string) => agreementStorage.getAll().filter(agreement => agreement.ownerId === ownerId)
};

export const sessionStorage = {
  setCurrentUser: (user: User) => localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)),
  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  clearCurrentUser: () => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
};