import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Contact = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Product Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all mandatory fields.", "info");
      return;
    }
    setSubmitted(true);
    showToast("Message sent! Our luxury concierge will respond within 15 minutes.");
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Contact Client Concierge</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-5">
          {/* Left: Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded p-4 p-md-5">
              <h3 className="fw-bold mb-2">We Are At Your Service</h3>
              <p className="text-muted small mb-4">
                Whether seeking personalized styling advice, tracking bespoke orders, or arranging private boutique visits, our concierge team is on standby 24/7.
              </p>

              {submitted ? (
                <div className="alert alert-success p-4 rounded text-center">
                  <i className="bi bi-check-circle-fill display-5 text-success d-block mb-3"></i>
                  <h5 className="fw-bold">Inquiry Dispatched Successfully</h5>
                  <p className="small text-muted mb-3">
                    Thank you, <strong>{formData.name}</strong>. A dedicated senior client advisor has been assigned to your ticket and will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "Product Inquiry", message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Your Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Jane Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+1 078 2376"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-muted">Inquiry Subject</label>
                      <select
                        className="form-select"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="Product Inquiry">Handbag Sizing &amp; Leather Inquiry</option>
                        <option value="Order Tracking">Order Tracking &amp; Customs</option>
                        <option value="Return / Exchange">Complimentary Return / Exchange</option>
                        <option value="Bespoke Order">Bespoke Monogramming</option>
                        <option value="Press / Collaboration">Press &amp; VIP Relations</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-muted">Message *</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Describe how we can assist you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-thaangi-primary w-100 py-3 fw-bold">
                        Submit Inquiry
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Concierge Contacts & WhatsApp */}
          <div className="col-lg-5">
            {/* Direct WhatsApp Concierge Card */}
            <div className="card border-0 shadow-sm rounded p-4 mb-4" style={{ backgroundColor: "#E9F8EE", border: "1px solid #C4EDD0" }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px", fontSize: "24px" }}>
                  <i className="bi bi-whatsapp"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-0 text-dark">Instant WhatsApp Concierge</h5>
                  <span className="badge bg-success">Online 24/7</span>
                </div>
              </div>
              <p className="small text-muted mb-3">
                Need instant product recommendations, leather color comparison swatches, or expedited shipping? Chat directly with our private client advisor.
              </p>
              <a
                href="https://wa.me/10782376?text=Hello%20THAANGI%20Concierge"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-whatsapp"></i>
                Start WhatsApp Chat (+1 078 2376)
              </a>
            </div>

            {/* Direct Channels */}
            <div className="card border-0 shadow-sm rounded p-4 mb-4">
              <h5 className="fw-bold mb-3">Direct Contact Channels</h5>
              <div className="d-grid gap-3">
                <div className="d-flex gap-3">
                  <div className="text-danger fs-5"><i className="bi bi-telephone"></i></div>
                  <div>
                    <div className="small fw-bold text-dark">Telephone Concierge</div>
                    <a href="tel:+10782376" className="text-muted small text-decoration-none">
                      +1 078 2376 (Toll-Free USA &amp; International)
                    </a>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="text-danger fs-5"><i className="bi bi-envelope"></i></div>
                  <div>
                    <div className="small fw-bold text-dark">Client Services Email</div>
                    <a href="mailto:concierge@thaangi.com" className="text-muted small text-decoration-none">
                      concierge@thaangi.com
                    </a>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="text-danger fs-5"><i className="bi bi-geo-alt"></i></div>
                  <div>
                    <div className="small fw-bold text-dark">Flagship Showroom</div>
                    <div className="text-muted small">
                      THAANGI Handbags Flagship<br />
                      742 Evergreen Promenade, Beverly Hills, CA 90210
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card border-0 shadow-sm rounded p-4 bg-light">
              <h6 className="fw-bold mb-2">Concierge Operating Hours</h6>
              <div className="small text-muted d-flex justify-content-between mb-1">
                <span>Monday – Friday:</span>
                <span className="fw-semibold text-dark">8:00 AM – 10:00 PM EST</span>
              </div>
              <div className="small text-muted d-flex justify-content-between mb-1">
                <span>Saturday – Sunday:</span>
                <span className="fw-semibold text-dark">9:00 AM – 8:00 PM EST</span>
              </div>
              <div className="small text-muted d-flex justify-content-between">
                <span>Digital WhatsApp Concierge:</span>
                <span className="text-success fw-bold">Active 24/7/365</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
