import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FloatingButtons from '../components/common/FloatingButtons';
import API_BASE_URL from "@/utils/api";
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="grow">{children}</main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default PublicLayout;
