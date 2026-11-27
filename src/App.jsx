import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';

// Layout Components
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastNotification from './components/ToastNotification';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Helper component to scroll to top on every navigation change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 404 Not Found Component
const NotFound = () => (
  <div className="container py-5 text-center my-5">
    <h1 className="display-1 fw-bold text-danger">404</h1>
    <h2 className="fw-bold mb-3">Page Not Found</h2>
    <p className="text-muted mb-4">The luxury destination you requested could not be located.</p>
    <Link to="/" className="btn btn-thaangi-primary">
      Return to THAANGI Home
    </Link>
  </div>
);

export function App() {
  return (
    <div className="app-root d-flex flex-column min-vh-100">
      <ScrollToTop />

      {/* Top Announcement Bar matching Bisum Reference */}
      <AnnouncementBar />

      {/* Main Sticky Header with Nav and Action Icons */}
      <Header />

      {/* Route Views */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Multi-column Footer matching Bisum Reference */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ToastNotification />
      <WhatsAppButton />
    </div>
  );
}

export default App;
