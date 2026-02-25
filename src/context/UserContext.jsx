// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from "@/utils/api";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');

    // ────────────────────────────────────────────────
    // Debug logs – very helpful to understand the problem
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
      const url = `${API_BASE_URL}/api/auth/user`;
      console.log('  → Fetching:', url);
      console.log('  → Sending header: x-auth-token (length:', token.length, ')');

      const res = await axios.get(url, {
        headers: { 'x-auth-token': token },
      });

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

      // Only remove token on clear authentication failures
      // This prevents removing a valid token on temporary 500 errors
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
