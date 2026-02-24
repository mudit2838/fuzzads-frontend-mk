import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Copy, ExternalLink } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Orders from Backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        
        // Ensure this matches your backend route
        const res = await axios.get(`${API_BASE_URL}/api/orders`, config);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 2. Filter & Search Logic
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.link.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order._id.slice(-6).includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  // Tabs Configuration
  const tabs = ["All", "Pending", "In Progress", "Completed", "Partial", "Processing", "Canceled"];

  return (
    <div className="space-y-6">
      
      {/* HEADER & TABS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1">
        <div className="flex overflow-x-auto p-2 gap-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search orders by ID, Link or Service..." 
          className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 w-1/3">Service & Link</th>
                <th className="px-6 py-4">Charge</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No orders found.</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors text-sm">
                    
                    {/* ID */}
                    <td className="px-6 py-4 font-mono text-slate-400 text-xs">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    {/* Service & Link */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-700 mb-1">{order.service}</div>
                      <div className="flex items-center space-x-2">
                        <a href={order.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 truncate max-w-50 hover:underline text-xs">
                          {order.link}
                        </a>
                        <Copy size={12} className="text-slate-300 cursor-pointer hover:text-blue-500" />
                      </div>
                    </td>

                    {/* Charge */}
                    <td className="px-6 py-4 font-bold text-slate-700">
                      ₹ {order.charge}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 text-slate-600">
                      {order.quantity}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Canceled' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                        {order.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Orders;