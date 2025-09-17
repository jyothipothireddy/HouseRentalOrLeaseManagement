import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { userStorage, sessionStorage } from '../utils/localStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'isActive'>) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = sessionStorage.getCurrentUser();
    if (currentUser) {
      // Verify user still exists and is active
      const dbUser = userStorage.findById(currentUser.id);
      if (dbUser && dbUser.isActive) {
        setUser(dbUser);
      } else {
        sessionStorage.clearCurrentUser();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = userStorage.findByEmail(email);
    
    if (foundUser && foundUser.password === password && foundUser.isActive) {
      setUser(foundUser);
      sessionStorage.setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (userData: Omit<User, 'id' | 'createdAt' | 'isActive'>): boolean => {
    const existingUser = userStorage.findByEmail(userData.email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      isActive: true,
      createdAt: new Date().toISOString()
    };

    userStorage.add(newUser);
    setUser(newUser);
    sessionStorage.setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clearCurrentUser();
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};