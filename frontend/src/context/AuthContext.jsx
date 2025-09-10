import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// 1. Create and export the AuthContext directly
export const AuthContext = createContext();

// 2. Create and export the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Normalize user object so it always has `_id`
  const normalizeUser = (decodedUser) => {
    return {
      ...decodedUser,
      _id: decodedUser._id || decodedUser.id, // ensure _id is always present
    };
  };

  // Check token validity on mount or token change
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(normalizeUser(decodedToken.user));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  // Login function
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setUser(normalizeUser(decodedToken.user));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Axios interceptor for adding Authorization header
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  // Update user data
  const updateUser = (newUserData) => {
    setUser(normalizeUser(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easier access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
