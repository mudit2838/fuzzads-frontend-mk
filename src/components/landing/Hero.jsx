// src/components/Hero.jsx
import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { API_BASE_URL } from "@/utils/api"; // Updated import

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', {
        username: formData.username,
        password: formData.password,
      });

      const token = res.data.token;
      const userData = res.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      toast.success('Login Successful!', { duration: 3000 });
      setTimeout(() => navigate('/panel'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login Failed', { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left: Text & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              The <span className="text-blue-600">FuzzAds</span> SMM Panel. <br />
              Super cheap & fast!
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The best and cheapest SMM panel for Instagram, Facebook, YouTube, and Twitter.
              High-quality services at unbeatable prices.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:bg-blue-700 transition-all"
              >
                Get Started Now
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Full Login Page
              </Link>
            </div>
          </div>

          {/* Right: Real Mini Login Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>

              <h3 className="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username or Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Username or Email</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                    <input
                      name="username"
                      value={formData.username}
                      onChange={onChange}
                      type="text"
                      placeholder="Username or Email"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                    <input
                      name="password"
                      value={formData.password}
                      onChange={onChange}
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                    Remember me
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Google Login */}
              <button
                onClick={() => {
                  window.location.href = `${API_BASE_URL}/api/auth/google`;
                }}
                type="button"
                className="w-full mt-4 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.09-4.47 3.09-7.25z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.35-2.63c-.98.66-2.23 1.06-3.93 1.06-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.71 20.81 7.09 23 12 23z" />
                  <path fill="#FBBC05" d="M5.51 14.21c-.23-.66-.36-1.37-.36-2.21s.13-1.55.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z" />
                  <path fill="#EA4335" d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.88 0 12 0 7.09 0 2.71 2.19.96 5.34l4.55 2.45C6.42 5.02 9.0 4.98 12 4.98z" />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
