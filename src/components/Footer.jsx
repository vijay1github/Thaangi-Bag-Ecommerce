import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { showToast } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "info");
      return;
    }
    showToast(`Subscribed! VIP welcome perks sent to ${email}`);
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: About */}
          <div className="col-6 col-lg-2">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-link-list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/about">Press center</Link></li>
              <li><Link to="/about">Our magazine</Link></li>
              <li><Link to="/about">Our group</Link></li>
              <li><Link to="/about">Work with us</Link></li>
            </ul>
          </div>

          {/* Column 2: Shopping (Categories matching user request) */}
          <div className="col-6 col-lg-2">
            <h4 className="footer-heading">Shopping</h4>
            <ul className="footer-link-list">
              <li><Link to="/shop">Brand catalog</Link></li>
              <li><Link to="/shop">Discount codes</Link></li>
              <li><Link to="/shop?category=handbags">Handbags</Link></li>
              <li><Link to="/shop?category=tote-bags">Tote Bags</Link></li>
              <li><Link to="/shop?category=clutches">Clutches</Link></li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="col-6 col-lg-2">
            <h4 className="footer-heading">Help</h4>
            <ul className="footer-link-list">
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/faq">Privacy policy</Link></li>
              <li><Link to="/contact">Support</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">Shipping &amp; Returns</Link></li>
            </ul>
          </div>

          {/* Column 4: Bisum/THAANGI Brand Newsletter matching Reference Page 4 */}
          <div className="col-12 col-lg-6 ps-lg-5">
            <div className="brand-logo-text mb-3">
              THAANGI<span>.</span>
            </div>
            <p className="footer-text text-muted mb-3" style={{ fontSize: "14px" }}>
              Stay up to date with all the news, exclusive collection previews, and private VIP handbag releases.
            </p>

            <form onSubmit={handleFooterSubscribe} className="d-flex gap-2 mb-4" style={{ maxWidth: "420px" }}>
              <input
                type="email"
                className="form-control"
                placeholder="Your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "46px", borderRadius: "4px" }}
                required
              />
              <button
                type="submit"
                className="btn btn-thaangi-secondary text-nowrap px-4"
                style={{ height: "46px" }}
              >
                SIGN UP
              </button>
            </form>

            {/* Social Icons matching Reference Page 4 */}
            <div className="d-flex align-items-center">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-link" title="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-link" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar matching Reference Page 4 */}
        <div className="footer-bottom-bar d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-4">
            <Link to="/faq" className="text-muted text-decoration-none small">Privacy policy</Link>
            <Link to="/faq" className="text-muted text-decoration-none small">Terms &amp; Conditions</Link>
          </div>
          <div className="small">
            &copy; 2026 THAANGI HANDBAGS. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Scroll to Top Button matching Reference Page 4 */}
      {showScrollTop && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Scroll to top"
        >
          <i className="bi bi-chevron-up"></i>
        </button>
      )}
    </footer>
  );
};

export default Footer;
