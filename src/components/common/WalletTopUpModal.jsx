import React, { useState } from 'react';

const WalletTopUpModal = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    if (!amount) return;
    onSuccess(Number(amount));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">Add Funds</h3>
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button onClick={handlePay} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Pay Now</button>
        <button onClick={onClose} className="w-full mt-2 text-gray-500">Close</button>
      </div>
    </div>
  );
};

export default WalletTopUpModal;