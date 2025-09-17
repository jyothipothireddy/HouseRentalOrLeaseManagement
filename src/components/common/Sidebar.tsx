import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Building,
  FileText,
  MessageSquare,
  CreditCard,
  Users,
  Settings,
  PlusCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const tenantMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/tenant' },
    { icon: Search, label: 'Browse Properties', path: '/tenant/properties' },
    { icon: FileText, label: 'My Applications', path: '/tenant/applications' },
    { icon: MessageSquare, label: 'Complaints', path: '/tenant/complaints' },
    { icon: CreditCard, label: 'Payments', path: '/tenant/payments' },
    { icon: FileText, label: 'Lease Agreements', path: '/tenant/agreements' },
  ];

  const ownerMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/owner' },
    { icon: Building, label: 'My Properties', path: '/owner/properties' },
    { icon: PlusCircle, label: 'Add Property', path: '/owner/add-property' },
    { icon: FileText, label: 'Applications', path: '/owner/applications' },
    { icon: MessageSquare, label: 'Complaints', path: '/owner/complaints' },
    { icon: CreditCard, label: 'Payments', path: '/owner/payments' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: Building, label: 'All Properties', path: '/admin/properties' },
    { icon: FileText, label: 'Applications', path: '/admin/applications' },
    { icon: MessageSquare, label: 'Complaints', path: '/admin/complaints' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'tenant':
        return tenantMenuItems;
      case 'owner':
        return ownerMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;