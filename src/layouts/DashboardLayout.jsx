// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/dashboard/Sidebar';
import TopHeader from '../components/dashboard/TopHeader';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleTokenProcessed = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      // Handle Google OAuth redirect token (priority)
      const urlParams = new URLSearchParams(location.search);
      const googleToken = urlParams.get('token');

      if (googleToken && !googleTokenProcessed.current) {
        googleTokenProcessed.current = true;
        // Clear any old/stale data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Save new Google token
        localStorage.setItem('token', googleToken);
        toast.success('Logged in with Google!', { duration: 4000 });

        // Clean URL immediately
        navigate('/panel', { replace: true });
        return;
      }

      // Get current token (from Google or normal login)
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Session expired. Please login again.', { duration: 4000 });
        navigate('/login');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/user`, {
          headers: { 'x-auth-token': token },
        });

        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.error('User fetch error:', err.response?.data || err.message);

        // Handle 401/403 specifically
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired or token invalid. Please login again.', { duration: 4000 });
        } else {
          toast.error('Failed to load account. Please try again.', { duration: 4000 });
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [location, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-gray-600 text-lg">Loading your account...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - FIX: Removed lg:relative so it stays fixed to the left edge */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>

      {/* Main Content Area - FIX: lg:ml-64 now perfectly fills the remaining space */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300 w-full overflow-hidden">
        <TopHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            {/* Single Toaster - centered at top */}
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;