'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      apiClient.setToken(token);
      // In a real app, you might want to validate the token with the server
      // For now, we'll just assume it's valid
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.login(username, password);
      // After successful login, we would typically fetch user details
      // For now, we'll create a mock user object
      const mockUser: User = {
        id: 1,
        username,
        email: `${username}@example.com`,
        created_at: new Date().toISOString(),
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const newUser = await apiClient.signup(username, email, password);
      // After signup, automatically log in
      await login(username, password);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

