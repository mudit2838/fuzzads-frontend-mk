import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-600 text-red py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-medium opacity-90">
          &copy; {new Date().getFullYear()} FuzzAds. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;