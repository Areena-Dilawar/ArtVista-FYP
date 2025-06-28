import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RequireAuth } from './components/RequireAuth';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import EventsPage from './pages/EventsPage.jsx';
import ArtistProfilePage from './pages/ArtistProfilePage.jsx';
import BecomeSeller from './pages/BecomeSeller.jsx';
import FAQ from './pages/FAQ.jsx';
import CareInstructions from './pages/CareInstructions.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
// Dashboard Pages
import AdminDashboard from './pages/AdminDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import './Styles/HideScrollBar.css';
import OrderConfirmation from './pages/OrderConfirmation'; 



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/artist/:artistId" element={<ArtistProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/artist/:id" element={<ArtistProfilePage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/care-instructions" element={<CareInstructions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              }
            />
            <Route
              path="/order-success"
              element={
                <RequireAuth>
                  <OrderSuccessPage />
                </RequireAuth>
              }
            />
            <Route
              path="/wishlist"
              element={
                <RequireAuth>
                  <WishlistPage />
                </RequireAuth>
              }
            />
            <Route
              path="/become-seller"
              element={
                <RequireAuth>
                  <BecomeSeller />
                </RequireAuth>
              }
            />

            {/* Dashboard Routes - Protected and with nested routes */}
            <Route
              path="/admin-dashboard/*"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/artist-dashboard/*"
              element={
                <RequireAuth>
                  <ArtistDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/customer-dashboard/*"
              element={
                <RequireAuth>
                  <CustomerDashboard />
                </RequireAuth>
              }
            />

            {/* Fallback Routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;