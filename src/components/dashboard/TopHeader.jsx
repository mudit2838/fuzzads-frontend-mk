// src/components/dashboard/TopHeader.jsx
import React from 'react';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- 1. Import toast



const TopHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // --- UPDATED LOGOUT FUNCTION ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Trigger the success popup
    toast.success('Logged out successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    // Wait 1 second before redirecting to login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 lg:px-8 flex items-center justify-between">
      
      {/* Mobile Toggle & Title */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 mr-4 md:hidden text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Dashboard</h2>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        
        {/* Currency Selector */}
        <div className="relative group">
          <button className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-full font-bold border border-red-100 hover:bg-red-100 transition-colors">
            <span>₹ 0</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Account Button */}
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors font-medium">
          <User size={20} />
          <span className="hidden sm:block">Account</span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-slate-400 hover:text-red-500 px-3 py-2 rounded-lg transition-colors font-medium"
        >
          <LogOut size={20} />
          <span className="hidden sm:block">Logout</span>
        </button>

      </div>
    </header>
  );
};

export default TopHeader;
