import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout & Pages
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileSetup from './pages/ProfileSetup';
import Bookings from './pages/Bookings';
import Payment from './pages/Payment';
import Availability from './pages/Availability';
import AdminVetting from './pages/AdminVetting';
import AdminTaxonomy from './pages/AdminTaxonomy';
import PostTask from './pages/PostTask';
import Dashboard from './pages/Dashboard';

// 1. SCROLL MANAGEMENT COMPONENT
// This ensures that every navigation resets the view to the top.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      {/* Utility to fix the "bottom of the page" navigation issue */}
      <ScrollToTop /> 

      <Routes>
        {/* AUTH PAGES: These do NOT use the MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* MARKETPLACE PAGES: Wrapped in MainLayout for efficiency */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/post-task" element={<PostTask />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/admin/vetting" element={<AdminVetting />} />
          <Route path="/admin/taxonomy" element={<AdminTaxonomy />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
