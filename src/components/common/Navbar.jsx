import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="shrink-0 cursor-pointer">
            <span className="text-3xl font-extrabold text-brand-700 tracking-tight">
              Fuzz<span className="text-brand-500">Ads</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 hover:text-brand-600 font-medium transition">Services</a>
            <a href="#" className="text-slate-600 hover:text-brand-600 font-medium transition">Blog</a>
            <a href="#" className="text-slate-600 hover:text-brand-600 font-medium transition">API</a>
            
            <div className="flex items-center space-x-3 ml-4">
              <a href="/login" className="px-5 py-2.5 text-brand-700 font-semibold hover:bg-brand-50 rounded-lg transition">
                Login
              </a>
              <a href="/signup" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition">
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#" className="block px-3 py-3 font-medium text-slate-700 hover:bg-brand-50 rounded-md">Services</a>
            <a href="#" className="block px-3 py-3 font-medium text-slate-700 hover:bg-brand-50 rounded-md">Blog</a>
            <a href="#" className="block px-3 py-3 font-medium text-slate-700 hover:bg-brand-50 rounded-md">API</a>
            <div className="pt-4 grid grid-cols-2 gap-4">
              <a href="/login" className="text-center py-3 border border-brand-200 text-brand-700 font-semibold rounded-lg">Login</a>
              <a href="/signup" className="text-center py-3 bg-brand-600 text-white font-semibold rounded-lg">Sign Up</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;