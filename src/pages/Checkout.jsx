import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/currency";

export const Checkout = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingCharge,
    estimatedTax,
    clearCart
  } = useCart();
  const { user, isAuthenticated, placeOrder } = useAuth();
  const navigate = useNavigate();

  // Shipping address state (pre-filled if user has saved addresses)
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: defaultAddr?.street || "",
    city: defaultAddr?.city || "",
    state: defaultAddr?.state || "",
    postalCode: defaultAddr?.postalCode || "",
    country: defaultAddr?.country || "United States",
    notes: ""
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod'

  // Payment mock fields
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedWallet, setSelectedWallet] = useState("Apple Pay");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">Your Bag is Empty</h2>
        <p className="text-muted mb-4">Please add items to your shopping bag before checking out.</p>
        <Link to="/shop" className="btn btn-thaangi-primary">
          Explore Collections
        </Link>
      </div>
    );
  }

  const shippingCost = shippingMethod === "express" ? 45 : shippingCharge;
  const finalTotal = subtotal - discountAmount + shippingCost + estimatedTax;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      tax: estimatedTax,
      total: finalTotal,
      paymentMethod:
        paymentMethod === "card"
          ? "Credit Card (Visa ending in 4242)"
          : paymentMethod === "upi"
          ? `UPI (${upiId})`
          : paymentMethod === "netbanking"
          ? `Net Banking (${selectedBank})`
          : paymentMethod === "wallet"
          ? `Digital Wallet (${selectedWallet})`
          : "Cash on Delivery",
      shippingAddress: {
        recipientName: `${formData.firstName} ${formData.lastName}`,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
        email: formData.email
      },
      items: [...cartItems]
    };

    setTimeout(() => {
      const placed = placeOrder(orderData);
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${placed.orderId}`);
    }, 800);
  };

  return (
    <div className="checkout-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Secure Checkout</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Checkout</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        <form onSubmit={handleSubmitOrder}>
          <div className="row g-5">
            {/* Left Column: Delivery & Payment Details */}
            <div className="col-lg-7">
              {/* 1. Customer & Shipping Address */}
              <div className="card border-0 shadow-sm rounded p-4 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="fw-bold mb-0">
                    <span className="badge bg-danger rounded-circle me-2">1</span>
                    Shipping Destination
                  </h5>
                  {!isAuthenticated && (
                    <Link to="/login" className="small text-danger fw-semibold">
                      Have an account? Log in
                    </Link>
                  )}
                </div>

                {/* Saved Address Selector for Logged In User */}
                {isAuthenticated && user?.addresses?.length > 1 && (
                  <div className="mb-4 p-3 bg-light rounded border">
                    <label className="form-label small fw-bold text-uppercase text-muted mb-2">
                      Choose From Saved Addresses:
                    </label>
                    <div className="d-grid gap-2">
                      {user.addresses.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          className={`btn text-start p-2 border rounded ${formData.street === a.street ? "btn-light border-danger text-danger fw-semibold" : "btn-white text-dark"}`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              street: a.street,
                              city: a.city,
                              state: a.state,
                              postalCode: a.postalCode,
                              country: a.country,
                              phone: a.phone
                            });
                          }}
                        >
                          <i className="bi bi-geo-alt me-1"></i> {a.title}: {a.street}, {a.city}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apartment, suite, unit, building, floor"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">State / Province *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Country</label>
                    <select
                      className="form-select"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Shipping Delivery Options */}
              <div className="card border-0 shadow-sm rounded p-4 mb-4">
                <h5 className="fw-bold mb-3">
                  <span className="badge bg-danger rounded-circle me-2">2</span>
                  Delivery Method
                </h5>
                <div className="d-grid gap-2">
                  <label className={`p-3 border rounded d-flex align-items-center justify-content-between cursor-pointer ${shippingMethod === "standard" ? "border-danger bg-light" : ""}`}>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <div className="fw-semibold text-dark">DHL Express Insured Delivery</div>
                        <div className="text-muted small">Estimated 3-5 business days with live GPS tracking</div>
                      </div>
                    </div>
                    <span className="fw-bold">
                      {shippingCharge === 0 ? <span className="text-success">FREE</span> : formatPrice(shippingCharge)}
                    </span>
                  </label>

                  <label className={`p-3 border rounded d-flex align-items-center justify-content-between cursor-pointer ${shippingMethod === "express" ? "border-danger bg-light" : ""}`}>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <div className="fw-semibold text-dark">White Glove Overnight Courier</div>
                        <div className="text-muted small">Next business day priority handover in signature gift box</div>
                      </div>
                    </div>
                    <span className="fw-bold text-dark">{formatPrice(45)}</span>
                  </label>
                </div>
              </div>

              {/* 3. Payment Method Selection (Cards, UPI, Net Banking, Wallet, COD) */}
              <div className="card border-0 shadow-sm rounded p-4">
                <h5 className="fw-bold mb-3">
                  <span className="badge bg-danger rounded-circle me-2">3</span>
                  Payment Method
                </h5>
                <div className="btn-group w-100 mb-4 flex-wrap" role="group">
                  <button
                    type="button"
                    className={`btn btn-sm ${paymentMethod === "card" ? "btn-danger fw-bold" : "btn-outline-secondary"}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <i className="bi bi-credit-card me-1"></i> Credit Card
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${paymentMethod === "upi" ? "btn-danger fw-bold" : "btn-outline-secondary"}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <i className="bi bi-qr-code me-1"></i> UPI
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${paymentMethod === "netbanking" ? "btn-danger fw-bold" : "btn-outline-secondary"}`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <i className="bi bi-bank me-1"></i> Net Banking
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${paymentMethod === "wallet" ? "btn-danger fw-bold" : "btn-outline-secondary"}`}
                    onClick={() => setPaymentMethod("wallet")}
                  >
                    <i className="bi bi-wallet2 me-1"></i> Wallet
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${paymentMethod === "cod" ? "btn-danger fw-bold" : "btn-outline-secondary"}`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <i className="bi bi-cash me-1"></i> COD
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {paymentMethod === "card" && (
                  <div className="bg-light p-3 rounded border">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="small fw-semibold text-muted">Demo Visa / Mastercard Simulator</span>
                      <div className="d-flex gap-2 text-muted fs-5">
                        <i className="bi bi-credit-card-2-front"></i>
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label small fw-semibold text-muted">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold text-muted">Name on Card</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-muted">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-semibold text-muted">CVV / CVC</label>
                        <input
                          type="password"
                          className="form-control"
                          value={cardData.cvv}
                          maxLength={4}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="bg-light p-3 rounded border text-center">
                    <p className="small text-muted mb-3">Scan with Google Pay, PhonePe, Paytm, or BHIM UPI:</p>
                    <div className="bg-white p-3 rounded d-inline-block shadow-sm mb-3">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=thaangi@okhdfcbank&pn=THAANGI%20HANDBAGS"
                        alt="UPI QR Code"
                        style={{ width: "140px", height: "140px" }}
                      />
                    </div>
                    <div className="max-w-xs mx-auto text-start">
                      <label className="form-label small fw-semibold text-muted">Or Enter UPI ID (VPA)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="yourname@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="bg-light p-3 rounded border">
                    <label className="form-label small fw-semibold text-muted mb-2">Select Your Bank</label>
                    <select
                      className="form-select mb-3"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="JPMorgan Chase">JPMorgan Chase</option>
                      <option value="Citibank">Citibank</option>
                      <option value="HSBC Private Bank">HSBC Private Bank</option>
                    </select>
                    <div className="small text-muted">
                      You will be securely redirected to {selectedBank}’s demo authorization portal to approve the payment.
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="bg-light p-3 rounded border">
                    <label className="form-label small fw-semibold text-muted mb-2">Select Digital Wallet</label>
                    <div className="d-grid gap-2">
                      {["Apple Pay", "Google Pay", "PayPal Express", "Paytm Wallet", "PhonePe Wallet"].map((w) => (
                        <label key={w} className={`p-2 border rounded bg-white d-flex align-items-center gap-3 cursor-pointer ${selectedWallet === w ? "border-danger text-danger fw-bold" : ""}`}>
                          <input
                            type="radio"
                            name="walletType"
                            checked={selectedWallet === w}
                            onChange={() => setSelectedWallet(w)}
                          />
                          <span>{w}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="bg-light p-3 rounded border">
                    <div className="d-flex align-items-center gap-2 text-warning mb-2">
                      <i className="bi bi-info-circle-fill"></i>
                      <strong className="text-dark">Cash on Delivery Notice:</strong>
                    </div>
                    <p className="small text-muted mb-0">
                      Please keep exact cash ready upon delivery. Our white glove courier will provide an instant digitized printed invoice upon receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Items Summary & Final CTA */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded p-4 sticky-top" style={{ top: "100px" }}>
                <h5 className="fw-bold mb-3">Order Details ({cartItems.length} items)</h5>

                {/* Items preview */}
                <div className="d-grid gap-3 mb-4 max-h-60 overflow-y-auto" style={{ maxHeight: "250px" }}>
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className="d-flex align-items-center gap-3 pb-2 border-bottom">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "55px", height: "55px", objectFit: "cover", borderRadius: "4px" }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold text-dark small">{item.name}</div>
                        <div className="text-muted" style={{ fontSize: "11px" }}>
                          Qty: {item.quantity} &bull; Color: {item.selectedColor}
                        </div>
                      </div>
                      <div className="fw-bold text-dark small">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="d-grid gap-2 border-top pt-3 mb-4 small">
                  <div className="d-flex justify-content-between text-muted">
                    <span>Subtotal</span>
                    <span className="fw-semibold text-dark">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="d-flex justify-content-between text-success">
                      <span>Voucher Discount</span>
                      <span className="fw-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between text-muted">
                    <span>Shipping Fee</span>
                    <span className="fw-semibold text-dark">
                      {shippingCost === 0 ? <span className="text-success">FREE</span> : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between text-muted">
                    <span>Tax (5%)</span>
                    <span className="fw-semibold text-dark">{formatPrice(estimatedTax)}</span>
                  </div>
                  <div className="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-dark">Grand Total</span>
                    <span className="fs-4 fw-bold text-danger">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-thaangi-primary w-100 py-3 fw-bold fs-6"
                >
                  {isSubmitting ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Confirming Order...</span>
                  ) : (
                    <span><i className="bi bi-shield-check me-2"></i>Complete Luxury Order ({formatPrice(finalTotal)})</span>
                  )}
                </button>

                <div className="text-center text-muted small mt-3">
                  By completing this order, you agree to THAANGI's Terms of Luxury Service &amp; 15-day return policy.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
