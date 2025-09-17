import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, Application, Complaint, Payment, LeaseAgreement } from '../types';
import {
  propertyStorage,
  applicationStorage,
  complaintStorage,
  paymentStorage,
  agreementStorage
} from '../utils/localStorage';

interface DataContextType {
  properties: Property[];
  applications: Application[];
  complaints: Complaint[];
  payments: Payment[];
  agreements: LeaseAgreement[];
  refreshData: () => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  addPayment: (payment: Payment) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  addAgreement: (agreement: LeaseAgreement) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [agreements, setAgreements] = useState<LeaseAgreement[]>([]);

  const refreshData = () => {
    setProperties(propertyStorage.getAll());
    setApplications(applicationStorage.getAll());
    setComplaints(complaintStorage.getAll());
    setPayments(paymentStorage.getAll());
    setAgreements(agreementStorage.getAll());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProperty = (property: Property) => {
    propertyStorage.add(property);
    refreshData();
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    propertyStorage.update(id, (property) => ({ ...property, ...updates }));
    refreshData();
  };

  const deleteProperty = (id: string) => {
    propertyStorage.remove(id);
    refreshData();
  };

  const addApplication = (application: Application) => {
    applicationStorage.add(application);
    refreshData();
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    applicationStorage.update(id, (application) => ({ ...application, ...updates }));
    refreshData();
  };

  const addComplaint = (complaint: Complaint) => {
    complaintStorage.add(complaint);
    refreshData();
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    complaintStorage.update(id, (complaint) => ({ ...complaint, ...updates }));
    refreshData();
  };

  const addPayment = (payment: Payment) => {
    paymentStorage.add(payment);
    refreshData();
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    paymentStorage.update(id, (payment) => ({ ...payment, ...updates }));
    refreshData();
  };

  const addAgreement = (agreement: LeaseAgreement) => {
    agreementStorage.add(agreement);
    refreshData();
  };

  const value: DataContextType = {
    properties,
    applications,
    complaints,
    payments,
    agreements,
    refreshData,
    addProperty,
    updateProperty,
    deleteProperty,
    addApplication,
    updateApplication,
    addComplaint,
    updateComplaint,
    addPayment,
    updatePayment,
    addAgreement
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};