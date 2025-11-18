import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';  // Add this import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const username = localStorage.getItem('username');
      setUser({ username });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await api.post('token/', { username, password });
      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('username', username);
      
      setUser({ username });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  // Register function - use axios directly to avoid auth headers
 const register = async (userData) => {
  try {
        await api.post('register/', userData);  // Works now because api.js skips auth
        return { success: true };
    } catch (error) {
        return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
        };
    }
    };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
