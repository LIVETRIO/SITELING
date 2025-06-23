import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@esst.edu',
    firstName: 'Pierre',
    lastName: 'Dupont',
    userType: 'admin',
    department: 'Administration',
    isOnline: true,
  },
  {
    id: '2',
    email: 'prof.dubois@esst.edu',
    firstName: 'Michel',
    lastName: 'Dubois',
    userType: 'teacher',
    department: 'Informatique',
    isOnline: true,
  },
  {
    id: '3',
    email: 'sophie.martin@student.esst.edu',
    firstName: 'Sophie',
    lastName: 'Martin',
    userType: 'student',
    department: 'Informatique',
    isOnline: true,
  },
  {
    id: '4',
    email: 'julien.moreau@esst.edu',
    firstName: 'Julien',
    lastName: 'Moreau',
    userType: 'teacher',
    department: 'Sciences',
    isOnline: false,
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('esst_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('esst_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('esst_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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