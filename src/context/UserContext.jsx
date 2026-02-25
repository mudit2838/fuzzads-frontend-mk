// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import api, { API_BASE_URL } from "@/utils/api"; // Updated import

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');

    console.log('[UserContext] fetchUser called');
    console.log('  → Token exists?', !!token);
    console.log('  → Token length:', token?.length || 0);
    console.log('  → API_BASE_URL:', API_BASE_URL);

    if (!token) {
      console.log('  → No token found → setting guest mode');
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      console.log('  → Fetching: /api/auth/user');
      // Token is auto-injected by api.js
      const res = await api.get('/api/auth/user');

      console.log('  → SUCCESS – status:', res.status);
      console.log('  → Received user data:', res.data);

      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('  → FETCH USER FAILED ──────────────────────────────');
      console.error('     Status code:', err.response?.status ?? '(no response / network error)');
      console.error('     Error message:', err.message);

      if (err.response) {
        console.error('     Backend response:', err.response.data);
      } else if (err.request) {
        console.error('     No response received – possible CORS / network issue');
      }

      if (err.response?.status === 401 || err.response?.status === 403) {
        console.warn('     Clearing token due to 401/403');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      setUser(null);
    } finally {
      setLoading(false);
      console.log('  → fetchUser finished (loading = false)');
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refreshUser = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
