import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ScrollToTop from './components/ScrollToTop';

// Placeholder for other screens to be implemented
const Placeholder = ({ title }) => (
  <MainLayout>
    <div className="flex items-center justify-center h-96">
      <h1 className="text-2xl font-display text-on-surface-variant italic">
        {title} Screen - Coming Soon
      </h1>
    </div>
  </MainLayout>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Core Pages */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/services"
          element={
            <MainLayout>
              <Services />
            </MainLayout>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<MainLayout>
          <Login />
        </MainLayout>
        }/>
        <Route path="/signup" element={<SignUp />} />

        {/* Other Marketplace Routes */}
        <Route
          path="/post-task"
          element={
            <MainLayout>
              <PostTask />
            </MainLayout>
          }
        />

        <Route
          path="/bookings"
          element={
            <MainLayout>
              <Bookings />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/profile-setup"
          element={
            <MainLayout>
              <ProfileSetup />
            </MainLayout>
          }
        />

        <Route
          path="/payment"
          element={
            <MainLayout>
              <Payment />
            </MainLayout>
          }
        />

        <Route
          path="/availability"
          element={
            <MainLayout>
              <Availability />
            </MainLayout>
          }
        />

        <Route
          path="/admin/vetting"
          element={
            <MainLayout>
              <AdminVetting />
            </MainLayout>
          }
        />

        <Route
          path="/admin/taxonomy"
          element={
            <MainLayout>
              <AdminTaxonomy />
            </MainLayout>
          }
        />

        {/* Placeholder Example */}
        <Route
          path="/coming-soon"
          element={<Placeholder title="Coming Soon" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
