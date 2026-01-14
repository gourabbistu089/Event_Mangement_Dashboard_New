import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'organizer' // 'organizer' or 'user'
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    window.location.href = '/';
  };

  const switchRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'organizer' ? 'user' : 'organizer'
    }));
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      switchRole,
      updateUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};