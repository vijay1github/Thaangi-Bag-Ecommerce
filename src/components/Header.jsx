import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import SearchModal from "./SearchModal";

export const Header = () => {
  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const { totalWishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            {/* 1. Mobile Menu Hamburger */}
            <button
              className="btn btn-link d-lg-none p-0 text-dark header-action-icon me-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation"
            >
              <i className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"} fs-3`}></i>
            </button>

            {/* 2. Brand Logo (THAANGI HANDBAGS) */}
            <Link to="/" className="brand-logo-text text-decoration-none">
              THAANGI<span>.</span>
            </Link>

            {/* Main collection navigation */}
            <nav className="d-none d-lg-flex align-items-center gap-1">
              <Link
                to="/shop"
                className="nav-menu-link"
              >
                Bags
              </Link>
              <Link
                to="/shop?category=backpacks"
                className="nav-menu-link"
              >
                Backpacks
              </Link>
              <Link
                to="/shop?category=travel-bags"
                className="nav-menu-link"
              >
                Travel Collection
              </Link>
              <Link
                to="/shop?category=wallets"
                className="nav-menu-link"
              >
                Wallets
              </Link>
            </nav>

            {/* 4. Header Actions (Search, Heart/Wishlist, Account, Cart) matching Reference */}
            <div className="d-flex align-items-center gap-2">
              {/* Search Icon */}
              <button
                className="header-action-icon"
                onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
                title="Search luxury bags"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <i className={`bi ${isSearchOpen ? "bi-x-lg" : "bi-search"}`}></i>
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="header-action-icon text-dark"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <i className="bi bi-heart"></i>
                {totalWishlistCount > 0 && (
                  <span className="header-badge">{totalWishlistCount}</span>
                )}
              </Link>

              {/* Account Icon */}
              <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="header-action-icon text-dark"
                title={isAuthenticated ? `Hello, ${user?.name}` : "Account Login"}
                aria-label="Account"
              >
                <i className="bi bi-person"></i>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                className="header-action-icon"
                onClick={() => setIsDrawerOpen(true)}
                title="View Shopping Bag"
                aria-label="Cart"
              >
                <i className="bi bi-bag"></i>
                {totalItemsCount > 0 && (
                  <span className="header-badge">{totalItemsCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-drawer d-lg-none bg-white border-top mt-3 p-4 shadow">
            <div className="d-flex flex-column gap-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">Shop All Bags</Link>
              <div className="border-top pt-2">
                <div className="text-muted small fw-bold text-uppercase mb-2">Categories</div>
                <div className="d-grid gap-2 ps-2">
                  <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Bags</Link>
                  <Link to="/shop?category=backpacks" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Backpacks</Link>
                  <Link to="/shop?category=travel-bags" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Travel Collection</Link>
                  <Link to="/shop?category=wallets" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Wallets</Link>
                  <Link to="/shop?category=handbags" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Handbags</Link>
                  <Link to="/shop?category=sling-bags" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Sling Bags</Link>
                  <Link to="/shop?category=tote-bags" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Tote Bags</Link>
                  <Link to="/shop?category=shoulder-bags" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Shoulder Bags</Link>
                  <Link to="/shop?category=clutches" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary small">Clutches</Link>
                </div>
              </div>
              <div className="border-top pt-2 d-grid gap-2">
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">About THAANGI</Link>
                <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">Track Orders</Link>
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">FAQs</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="fw-semibold text-dark">Contact Us</Link>
              </div>
            </div>
          </div>
        )}

        {/* Search field sits beneath the collection navigation. */}
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
      </header>

    </>
  );
};

export default Header;
