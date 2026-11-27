import React, { useState } from "react";
import { newsletterBanner } from "../data/banners";
import { useCart } from "../context/CartContext";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "info");
      return;
    }
    showToast(`Thank you! A 15% discount code has been sent to ${email}`);
    setEmail("");
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="newsletter-card-wrap">
          <div className="row align-items-center g-4">
            {/* Left Content Matching Reference Page 3 */}
            <div className="col-lg-6">
              <div className="text-danger fw-semibold small text-uppercase mb-2" style={{ letterSpacing: "1px" }}>
                {newsletterBanner.subtitle}
              </div>
              <h2 className="display-6 fw-bold text-dark mb-3">
                {newsletterBanner.title}
              </h2>
              <p className="text-muted mb-4" style={{ maxWidth: "440px" }}>
                {newsletterBanner.description}
              </p>

              <form onSubmit={handleSubscribe} className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>
            </div>

            {/* Right Handbag Image Matching Reference Page 3 */}
            <div className="col-lg-6 text-center">
              <img
                src={newsletterBanner.image}
                alt="Luxury Handbag Showcase"
                className="img-fluid rounded"
                style={{ maxHeight: "320px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
