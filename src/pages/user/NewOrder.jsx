// src/pages/user/NewOrder.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../utils/api';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const estimatedCost = (Number(quantity) || 0) * 0.02043;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token found:', !!token);
      if (!token) {
        toast.error('Session expired. Please login again.');
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/user`, {
          headers: { 'x-auth-token': token },
        });
        console.log('User data from server:', res.data);
        setUserData({
          username: res.data.username || 'User',
          totalSpent: res.data.totalSpent || 0,
          totalOrders: res.data.totalOrders || 0,
          balance: res.data.balance || 0,
        });
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        toast.error(err.response?.data?.msg || 'Could not load user information');
        setUserData({
          username: 'Guest',
          totalSpent: 0,
          totalOrders: 0,
          balance: 0,
        });
      }
    };
    fetchUserData();
  }, []);

  // Only change: Navigate to real Add Funds page
  const handleAddFunds = () => {
    navigate('/panel/add-funds');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) return alert("Please enter a valid link.");
    if (!quantity || Number(quantity) <= 0) return alert("Please enter a valid quantity.");
    if (estimatedCost > userData.balance) {
      return alert(
        `Insufficient balance!\nRequired: ₹${estimatedCost.toFixed(2)}\nAvailable: ₹${userData.balance.toFixed(2)}\nPlease add funds first.`
      );
    }
    setUserData((prev) => ({
      ...prev,
      balance: prev.balance - estimatedCost,
    }));
    alert(
      `Order placed successfully!\nLink: ${link}\nQuantity: ${quantity}\nCost: ₹${estimatedCost.toFixed(2)}\nNew balance: ₹${(userData.balance - estimatedCost).toFixed(2)}`
    );
    setLink('');
    setQuantity('');
  };

  if (!userData) {
    return (
      <div className="p-6 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading your account...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome + Stats Cards */}
      <div className="relative mb-10">
        <div className="absolute -top-6 left-0 right-0 h-12 flex justify-center items-center pointer-events-none">
          <div className="flex space-x-5">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full from-red-500 via-yellow-400 to-green-500 animate-pulse"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 from-blue-100 to-blue-50" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-lg text-gray-800">{userData.username}</h3>
              <p className="text-sm text-gray-600 mt-1">Welcome To FuzzAds</p>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center text-2xl">🛍️</div>
            <p className="text-sm text-gray-600">Total Spend</p>
            <h3 className="text-2xl font-bold text-green-600">₹{userData.totalSpent.toFixed(2)}</h3>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center text-2xl">📦</div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <h3 className="text-2xl font-bold text-orange-600">{userData.totalOrders}</h3>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center text-2xl">💰</div>
            <p className="text-sm text-gray-600">Total Balance</p>
            <h3 className="text-2xl font-bold text-blue-600">₹{userData.balance.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Order Form */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 md:p-8 border-b border-gray-100 gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              ₹{userData.balance.toFixed(2)}
            </h2>
          </div>
          <button
            onClick={handleAddFunds}
            className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 transition whitespace-nowrap"
          >
            + Add Funds
          </button>
        </div>
        <div className="p-6 md:p-8 space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Select Service</label>
            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              defaultValue="instagram-likes-old"
            >
              <option value="instagram-likes-old">Instagram Likes Old Accounts</option>
              <option value="instagram-followers">Instagram Followers</option>
              <option value="youtube-views">YouTube Views</option>
            </select>
          </div>
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
            <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-700"><strong>Start:</strong> Instant</p>
            <p className="text-gray-700"><strong>Speed:</strong> 100K/Day</p>
            <p className="text-gray-700"><strong>Drop:</strong> No</p>
            <p className="text-gray-700">
              <strong>Refill:</strong> 30 Days <span className="text-green-600 font-bold">REFILL ♻️</span>
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="10"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <p className="mt-2 text-sm text-gray-500">Min: 10 - Max: 1000000</p>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-lg font-medium text-gray-700">Charge</span>
            <span className="text-xl font-bold text-blue-600">₹{estimatedCost.toFixed(2)}</span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-md mt-6"
          >
            New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
