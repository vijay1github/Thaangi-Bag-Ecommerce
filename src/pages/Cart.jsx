import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import { coupons } from "../data/coupons";

export const Cart = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingCharge,
    estimatedTax,
    totalAmount,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponStatus(res);
  };

  const freeShippingThreshold = 500;
  const freeShippingDiff = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="cart-page py-5">
        <div className="container text-center py-5">
          <i className="bi bi-bag-x display-1 text-muted d-block mb-3"></i>
          <h2 className="fw-bold mb-2">Your Shopping Bag is Empty</h2>
          <p className="text-muted mb-4 max-w-md mx-auto">
            You haven't added any luxury handbags yet. Explore our handcrafted arrivals and treat yourself.
          </p>
          <Link to="/shop" className="btn btn-thaangi-primary">
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Your Shopping Bag</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        {/* Free Shipping Progress */}
        <div className="card border-0 bg-light p-3 mb-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-2 small fw-semibold">
            <span>
              {freeShippingDiff === 0 ? (
                <span className="text-success"><i className="bi bi-check-circle-fill me-1"></i>You unlocked Complimentary Express Delivery!</span>
              ) : (
                <span>Add <strong>{formatPrice(freeShippingDiff)}</strong> more to qualify for Free Express Shipping</span>
              )}
            </span>
            <span className="text-muted">{freeShippingPercent}%</span>
          </div>
          <div className="progress" style={{ height: "6px" }}>
            <div
              className={`progress-bar ${freeShippingDiff === 0 ? "bg-success" : "bg-danger"}`}
              role="progressbar"
              style={{ width: `${freeShippingPercent}%` }}
              aria-valuenow={freeShippingPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        <div className="row g-4">
          {/* Left: Cart Items Table */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small text-uppercase text-muted">
                    <tr>
                      <th scope="col" className="ps-4 py-3">Product</th>
                      <th scope="col" className="py-3">Price</th>
                      <th scope="col" className="py-3 text-center">Quantity</th>
                      <th scope="col" className="py-3 text-end">Total</th>
                      <th scope="col" className="pe-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={`${item.id}-${item.selectedColor}`}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px" }}
                            />
                            <div>
                              <Link to={`/product/${item.id}`} className="fw-semibold text-dark text-decoration-none d-block">
                                {item.name}
                              </Link>
                              <div className="small text-muted">
                                Color: <span className="fw-medium text-dark">{item.selectedColor}</span>
                              </div>
                              <span className="badge bg-light text-secondary small border">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="fw-semibold">{formatPrice(item.price)}</td>
                        <td className="text-center">
                          <div className="input-group input-group-sm mx-auto" style={{ width: "100px" }}>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="form-control text-center bg-white">
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold text-end">{formatPrice(item.price * item.quantity)}</td>
                        <td className="pe-4 text-center">
                          <button
                            className="btn btn-link text-danger p-0"
                            onClick={() => removeFromCart(item.id, item.selectedColor)}
                            title="Remove item"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons below table */}
              <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
                <Link to="/shop" className="btn btn-outline-secondary btn-sm">
                  <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                </Link>
                <button onClick={clearCart} className="btn btn-outline-danger btn-sm">
                  <i className="bi bi-trash me-1"></i> Clear Cart
                </button>
              </div>
            </div>

            {/* Promotional Coupons Suggestion Strip */}
            <div className="mt-4 p-4 bg-light rounded border">
              <h6 className="fw-bold mb-2"><i className="bi bi-ticket-perforated text-danger me-2"></i>Available Promotional Vouchers:</h6>
              <div className="row g-2">
                {coupons.map((c) => (
                  <div key={c.code} className="col-sm-6">
                    <div className="p-2 bg-white rounded border d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-danger small">{c.code}</strong>
                        <div className="text-muted" style={{ fontSize: "11px" }}>{c.description}</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark py-1 px-2"
                        style={{ fontSize: "11px" }}
                        onClick={() => {
                          setCouponInput(c.code);
                          applyCoupon(c.code);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded p-4">
              <h5 className="fw-bold mb-4">Order Summary</h5>

              {/* Coupon Form */}
              <form onSubmit={handleApply} className="mb-4">
                <label className="form-label small fw-semibold text-muted">Promo or Gift Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control text-uppercase"
                    placeholder="e.g. THAANGI10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-thaangi-secondary">
                    Apply
                  </button>
                </div>
                {couponStatus && !couponStatus.success && (
                  <div className="text-danger small mt-2">{couponStatus.message}</div>
                )}
                {appliedCoupon && (
                  <div className="d-flex align-items-center justify-content-between bg-success-subtle p-2 rounded mt-2">
                    <span className="small text-success fw-bold">
                      <i className="bi bi-check-circle me-1"></i>Code '{appliedCoupon.code}' Active
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="btn btn-link p-0 text-danger small text-decoration-none"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="d-grid gap-2 border-top pt-3 mb-4 small">
                <div className="d-flex justify-content-between text-muted">
                  <span>Bag Subtotal</span>
                  <span className="fw-semibold text-dark">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount Savings</span>
                    <span className="fw-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between text-muted">
                  <span>Estimated Shipping</span>
                  <span className="fw-semibold text-dark">
                    {shippingCharge === 0 ? <span className="text-success">FREE</span> : formatPrice(shippingCharge)}
                  </span>
                </div>
                <div className="d-flex justify-content-between text-muted">
                  <span>Estimated Luxury Tax (5%)</span>
                  <span className="fw-semibold text-dark">{formatPrice(estimatedTax)}</span>
                </div>
                <div className="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold text-dark">Total Amount</span>
                  <span className="fs-4 fw-bold text-danger">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-thaangi-primary w-100 py-3 mb-3 fw-bold"
              >
                Proceed to Checkout &rarr;
              </button>

              <div className="text-center text-muted small">
                <i className="bi bi-lock-fill me-1"></i> Guaranteed Secure 256-Bit SSL Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
