// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from "@/utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-password`,
        { email },
        { timeout: 15000 } // prevent hanging forever
      );

      console.log("Forgot password response:", res.data);

      toast.success("OTP sent to your email!");
      setStep('otp');

    } catch (err) {
      console.error("Forgot password error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.msg ||
        "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/reset-password`,
        { email, otp, newPassword },
        { timeout: 15000 }
      );

      console.log("Reset password response:", res.data);

      toast.success("Password reset successful!");
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error("Reset password error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.msg ||
        "Invalid OTP or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={step === 'email' ? "Forgot Password" : "Reset Your Password"}
      subtitle={
        step === 'email'
          ? "Enter your email to receive an OTP"
          : `Enter OTP sent to ${email}`
      }
    >
      <Toaster position="top-center" />

      {step === 'email' ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 underline font-medium">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;        otp,
        newPassword,
      });
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Invalid OTP or error');
    }
  };

  return (
    <AuthLayout
      title={step === 'email' ? "Forgot Password" : "Reset Your Password"}
      subtitle={
        step === 'email'
          ? "Enter your email to receive an OTP"
          : `Enter OTP sent to ${email}`
      }
    >
      <Toaster position="top-center" />

      {step === 'email' ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link to="/login" className="text-blue-600 underline font-medium">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
