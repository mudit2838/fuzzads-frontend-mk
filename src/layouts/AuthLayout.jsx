import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo / Brand Name */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              FuzzAds
            </h1>
          </Link>

          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-slate-800">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-base text-slate-600">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Main Card */}
        <div className="bg-white py-8 px-6 md:px-10 shadow-lg rounded-2xl border border-slate-200">
          {children}

          {/* Back to home link */}
          <div className="mt-6 text-center text-sm">
            <Link
              to="/"
              className="font-medium text-blue-600 hover:text-blue-700 transition"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center py-6 text-sm text-slate-500">
        © {new Date().getFullYear()} FuzzAds. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;