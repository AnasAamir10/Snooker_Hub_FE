import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { setAuthToken, getAuthToken, removeAuthToken, setUserInStorage, removeUserFromStorage, getUserFromStorage } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user was previously logged in
  useEffect(() => {
    const savedUser = getUserFromStorage();
    const token = getAuthToken();
    
    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success && response.token) {
        // Store token
        setAuthToken(response.token);
        
        // Store user data
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role
        };
        
        setUser(userData);
        setUserInStorage(userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      // Transform frontend data to backend format
      const signupData = {
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email,
        password: userData.password,
        role: userData.role || 'player'
      };
      
      const response = await authAPI.register(signupData);
      
      if (response.success && response.token) {
        // Store token
        setAuthToken(response.token);
        
        // Store user data
        const newUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role
        };
        
        setUser(newUser);
        setUserInStorage(newUser);
        
        return { success: true, user: newUser };
      } else {
        return { success: false, error: response.error || 'Signup failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
    removeUserFromStorage();
  };

  const updateProfile = async (userData) => {
    try {
      // This would require userAPI.update - can be implemented later
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      setUserInStorage(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};