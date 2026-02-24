// src/pages/auth/OtpVerify.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AuthLayout from '../../layouts/AuthLayout';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email, otp });
      toast.success('Email verified successfully! You can now login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid or expired OTP');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">Invalid access. Please register first.</p>
      </div>
    );
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={`Enter the OTP sent to ${email}`}
    >
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Didn't receive OTP?{' '}
        <button className="text-blue-600 underline font-medium">Resend</button>
      </p>
    </AuthLayout>
  );
};

export default OtpVerify;