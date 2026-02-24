// src/pages/user/AddFunds.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../utils/api';

const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const handleAddFunds = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      toast.error('Minimum amount is ₹100');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order from backend
      const { data } = await axios.post(
        `${API_BASE_URL}/api/funds/create-order`,
        { amount: parsedAmount },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from your frontend .env
        amount: data.amount,
        currency: data.currency,
        name: 'FuzzAds',
        description: 'Add Funds to Wallet',
        order_id: data.id,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyRes = await axios.post(
              `${API_BASE_URL}/api/funds/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );

            if (verifyRes.data.success) {
              toast.success('Funds added successfully! Balance updated.', { duration: 4000 });
              setAmount(''); // clear input
              // Optional: reload page or update balance in header
            } else {
              toast.error('Payment verification failed');
            }
          } catch (err) {
            toast.error('Verification failed');
          }
        },
        prefill: {
          name: 'User', // can be dynamic later
          email: 'user@example.com',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Add Funds to Wallet</h2>

      {/* Form Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-slate-200">
        <form className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (min ₹100)"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              min="100"
              step="1"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={loading}
            >
              <option value="upi">UPI (Google Pay, PhonePe, etc.)</option>
              <option value="paytm">Paytm Wallet</option>
              <option value="crypto">Cryptocurrency (Coming Soon)</option>
              <option value="bank">Bank Transfer (Manual)</option>
            </select>
          </div>

          <button
            type="button" // changed to button since we use Razorpay handler
            onClick={handleAddFunds}
            disabled={loading}
            className={`w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                </svg>
                Processing...
              </>
            ) : (
              'Pay Now & Add Funds'
            )}
          </button>
        </form>
      </div>

      {/* Transaction History (placeholder) */}
      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <p className="text-gray-500 text-center py-8">No transactions yet. Add funds to see history.</p>
      </div>
    </div>
  );
};

export default AddFunds;