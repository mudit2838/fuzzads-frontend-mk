// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from "@/utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password
      });

      toast.success("Registration Successful! Check your email for OTP.");
      // Redirect to OTP verification page with email
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start growing your social media presence today"
    >
      <Toaster position="top-center" />
      <form className="space-y-5" onSubmit={onSubmit}>
        {/* Username */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="johndoe123"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Confirm Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-600">Already have an account? </span>
        <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
