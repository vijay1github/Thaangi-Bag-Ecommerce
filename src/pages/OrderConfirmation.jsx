import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";
import { formatPrice } from "../utils/currency";

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders } = useAuth();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const order = orders.find((o) => o.orderId === orderId) || orders[0];

  useEffect(() => {
    // Launch celebratory confetti effect!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F27A72", "#C5A059", "#00234D", "#FFFFFF"]
      });
    } catch (e) {
      console.log("Confetti trigger:", e);
    }
  }, []);

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h2>Order Confirmation</h2>
        <p className="text-muted">No order details found.</p>
        <Link to="/shop" className="btn btn-thaangi-primary">Return to Shop</Link>
      </div>
    );
  }

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="order-confirmation-page py-5">
      <div className="container">
        {/* Celebration Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-check-lg display-5"></i>
          </div>
          <h1 className="fw-bold text-dark mb-2">Thank You For Your Order!</h1>
          <p className="text-muted fs-5 mb-1">
            Order Confirmation: <strong className="text-danger">{order.orderId}</strong>
          </p>
          <p className="text-muted small">
            A confirmation receipt has been sent to <strong>{order.shippingAddress?.email || "your registered email"}</strong>.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-8">
            {/* Order Summary Card */}
            <div className="card border-0 shadow-sm rounded p-4 mb-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 border-bottom pb-3 mb-4">
                <div>
                  <div className="text-muted small">Order Date</div>
                  <div className="fw-semibold text-dark">{order.date}</div>
                </div>
                <div>
                  <div className="text-muted small">Estimated Delivery</div>
                  <div className="fw-semibold text-success">{order.estimatedDelivery}</div>
                </div>
                <div>
                  <div className="text-muted small">Tracking ID</div>
                  <div className="fw-semibold text-dark">{order.trackingNumber}</div>
                </div>
                <div>
                  <div className="text-muted small">Payment Status</div>
                  <span className="badge bg-success-subtle text-success">{order.paymentStatus}</span>
                </div>
              </div>

              {/* Items List */}
              <h5 className="fw-bold mb-3">Purchased Silhouettes</h5>
              <div className="d-grid gap-3 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "65px", height: "65px", objectFit: "cover", borderRadius: "6px" }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold text-dark">{item.name}</h6>
                      <div className="text-muted small">
                        Color: {item.selectedColor} &bull; Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-dark">{formatPrice(item.price * item.quantity)}</div>
                      <div className="text-muted small">{formatPrice(item.price)} each</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery and Financial details */}
              <div className="row g-4 border-top pt-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Shipping Address</h6>
                  <p className="text-muted small mb-0">
                    <strong>{order.shippingAddress?.recipientName}</strong><br />
                    {order.shippingAddress?.street}<br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}<br />
                    {order.shippingAddress?.country}<br />
                    Phone: {order.shippingAddress?.phone}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Payment Breakdown</h6>
                  <div className="d-grid gap-1 small text-muted">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span className="text-dark">{formatPrice(order.subtotal)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="d-flex justify-content-between text-success">
                        <span>Discount Savings:</span>
                        <span>-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="text-dark">{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Estimated Tax:</span>
                      <span className="text-dark">{formatPrice(order.tax)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold text-dark border-top pt-1 mt-1 fs-6">
                      <span>Total Paid:</span>
                      <span className="text-danger">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/orders" className="btn btn-thaangi-primary">
                <i className="bi bi-truck me-2"></i> Track Your Order
              </Link>
              <button
                type="button"
                className="btn btn-thaangi-outline"
                onClick={() => setShowInvoiceModal(true)}
              >
                <i className="bi bi-file-earmark-pdf me-2"></i> View &amp; Print Invoice
              </button>
              <Link to="/shop" className="btn btn-outline-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal for Immediate Download / Print */}
      {showInvoiceModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowInvoiceModal(false)}>
          <div
            className="quickview-modal-content p-4 p-md-5"
            style={{ maxWidth: "750px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div className="brand-logo-text">THAANGI<span>.</span></div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-dark" onClick={handlePrintInvoice}>
                  <i className="bi bi-printer me-1"></i> Print / Save PDF
                </button>
                <button className="modal-close-btn position-static" onClick={() => setShowInvoiceModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-6">
                  <h6 className="fw-bold text-muted small text-uppercase">Billed To:</h6>
                  <div className="fw-bold">{order.shippingAddress?.recipientName}</div>
                  <div className="small text-muted">{order.shippingAddress?.street}</div>
                  <div className="small text-muted">{order.shippingAddress?.city}, {order.shippingAddress?.country}</div>
                </div>
                <div className="col-6 text-end">
                  <h6 className="fw-bold text-muted small text-uppercase">Invoice Details:</h6>
                  <div><strong>Invoice #:</strong> INV-{order.orderId}</div>
                  <div><strong>Date:</strong> {order.date}</div>
                  <div><strong>Payment:</strong> {order.paymentMethod}</div>
                </div>
              </div>
            </div>

            <table className="table table-bordered mb-4">
              <thead className="table-light small">
                <tr>
                  <th>Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, idx) => (
                  <tr key={idx} className="small">
                    <td>{it.name} ({it.selectedColor})</td>
                    <td className="text-center">{it.quantity}</td>
                    <td className="text-end">{formatPrice(it.price)}</td>
                    <td className="text-end">{formatPrice(it.price * it.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="small">
                <tr>
                  <th colSpan="3" className="text-end">Subtotal:</th>
                  <td className="text-end">{formatPrice(order.subtotal)}</td>
                </tr>
                {order.discount > 0 && (
                  <tr>
                    <th colSpan="3" className="text-end text-success">Discount:</th>
                  <td className="text-end text-success">-{formatPrice(order.discount)}</td>
                  </tr>
                )}
                <tr>
                  <th colSpan="3" className="text-end">Shipping:</th>
                  <td className="text-end">{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</td>
                </tr>
                <tr>
                  <th colSpan="3" className="text-end">Tax:</th>
                  <td className="text-end">{formatPrice(order.tax)}</td>
                </tr>
                <tr className="fw-bold fs-6">
                  <th colSpan="3" className="text-end">Total:</th>
                  <td className="text-end text-danger">{formatPrice(order.total)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="text-center text-muted small border-top pt-3">
              Thank you for choosing THAANGI Handbags. For inquiries, email concierge@thaangi.com.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
