// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // ← new import
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OtpVerify from './pages/auth/OtpVerify';
import ForgotPassword from './pages/auth/ForgotPassword';
import NewOrder from './pages/user/NewOrder';
import Orders from './pages/user/Orders';
import AddFunds from './pages/user/AddFunds'; // assuming you have this

function App() {
  return (
    <UserProvider> {/* ← wrap entire app */}
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/panel" element={<DashboardLayout />}>
            <Route index element={<NewOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="add-funds" element={<AddFunds />} />
            {/* other routes */}
          </Route>
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;