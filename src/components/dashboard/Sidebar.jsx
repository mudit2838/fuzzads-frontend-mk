// src/components/dashboard/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- 1. Import toast
import API_BASE_URL from "@/utils/api";

import { 
  ShoppingBag, 
  List, 
  Wallet, 
  LifeBuoy, 
  Users, 
  Code, 
  Repeat, 
  FileText, 
  LogOut 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
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

  const menuItems = [
    { icon: ShoppingBag, label: "New Order", path: "/panel" },
    { icon: List, label: "Orders", path: "/panel/orders" },
    { icon: FileText, label: "Services", path: "/panel/services" },
    { icon: Wallet, label: "Add Funds", path: "/panel/add-funds" },
    { icon: LifeBuoy, label: "Support", path: "/panel/tickets" },
    { icon: Users, label: "Affiliate", path: "/panel/affiliate" },
    { icon: Code, label: "API", path: "/panel/api" },
    { icon: Repeat, label: "Transfer Funds", path: "/panel/transfer" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* LOGO AREA */}
        <div className="h-24 flex items-center justify-center border-b border-slate-100">
          <span className="text-3xl font-extrabold text-blue-700 tracking-tight">
            Fuzz<span className="text-blue-500">Ads</span>
          </span>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100%-160px)]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Area */}
        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-slate-100">
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-3 text-red-500 hover:bg-red-50 w-full px-4 py-3 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
