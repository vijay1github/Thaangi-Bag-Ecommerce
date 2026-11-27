import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

export const Orders = () => {
  const { orders, cancelOrder } = useAuth();
  const { showToast } = useCart();

  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("Changed mind / Ordered by mistake");
  const [invoiceModalOrder, setInvoiceModalOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmCancel = () => {
    if (cancelModalOrder) {
      cancelOrder(cancelModalOrder.orderId, cancelReason);
      showToast(`Order ${cancelModalOrder.orderId} cancellation requested successfully.`, "info");
      setCancelModalOrder(null);
      // update selected order reference
      const updated = orders.find(o => o.orderId === cancelModalOrder.orderId);
      if (updated) setSelectedOrder(updated);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="orders-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Order History &amp; Tracking</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/profile">My Account</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Orders</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        {orders.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-1 text-muted d-block mb-3"></i>
            <h2 className="fw-bold mb-2">No Orders Placed Yet</h2>
            <p className="text-muted mb-4">When you purchase THAANGI handbags, you can track their journey right here.</p>
            <Link to="/shop" className="btn btn-thaangi-primary">Discover Handbags</Link>
          </div>
        ) : (
          <div className="row g-4">
            {/* Left: Orders List */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded p-3 mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by Order ID or Tracking #"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-grid gap-3">
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.orderId === order.orderId;
                  return (
                    <div
                      key={order.orderId}
                      onClick={() => setSelectedOrder(order)}
                      className={`card border-0 shadow-sm rounded p-3 cursor-pointer transition ${isSelected ? "ring-2 border-danger bg-light" : "bg-white"}`}
                      style={{ cursor: "pointer", borderLeft: isSelected ? "4px solid #F27A72" : "none" }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-dark">{order.orderId}</span>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-2">
                        <span>Placed on {order.date}</span>
                        <span className="fw-bold text-dark">{formatPrice(order.total)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 overflow-hidden">
                        {order.items.slice(0, 3).map((it, idx) => (
                          <img
                            key={idx}
                            src={it.image}
                            alt=""
                            style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                          />
                        ))}
                        {order.items.length > 3 && (
                          <span className="badge bg-secondary">+{order.items.length - 3}</span>
                        )}
                        <span className="small text-muted ms-auto">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed Tracking View for Selected Order */}
            {selectedOrder && (
              <div className="col-lg-7">
                <div className="card border-0 shadow-sm rounded p-4">
                  {/* Top Header */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 border-bottom pb-3 mb-4">
                    <div>
                      <h4 className="fw-bold text-dark mb-1">Order {selectedOrder.orderId}</h4>
                      <div className="small text-muted">
                        Tracking Number: <strong className="text-dark">{selectedOrder.trackingNumber}</strong>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => setInvoiceModalOrder(selectedOrder)}
                      >
                        <i className="bi bi-file-earmark-pdf me-1"></i> Invoice
                      </button>
                      {selectedOrder.canCancel && selectedOrder.status !== "Cancelled" && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => setCancelModalOrder(selectedOrder)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tracking Timeline Stepper */}
                  <div className="mb-5 p-4 bg-light rounded border">
                    <h6 className="fw-bold text-uppercase small text-muted mb-4">Live Shipment Journey:</h6>
                    <div className="position-relative">
                      {selectedOrder.timeline.map((step, idx) => (
                        <div key={idx} className="d-flex gap-3 mb-4 position-relative">
                          {/* Dot / Check Icon */}
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 ${step.completed ? "bg-success" : "bg-secondary"}`}
                            style={{ width: "32px", height: "32px", zIndex: 2 }}
                          >
                            <i className={`bi ${step.completed ? "bi-check-lg" : "bi-circle"} small`}></i>
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{step.status}</div>
                            <div className="small text-muted">{step.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Items in this order */}
                  <h6 className="fw-bold mb-3">Items in This Shipment</h6>
                  <div className="d-grid gap-2 mb-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center gap-3 p-2 bg-light rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                        />
                        <div className="flex-grow-1">
                          <div className="fw-semibold text-dark small">{item.name}</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>
                            Color: {item.selectedColor} &bull; Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="fw-bold text-dark small">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Meta */}
                  <div className="row g-3 border-top pt-3 small text-muted">
                    <div className="col-md-6">
                      <div className="fw-bold text-dark mb-1">Delivering to:</div>
                      <div>{selectedOrder.shippingAddress?.recipientName}</div>
                      <div>{selectedOrder.shippingAddress?.street}</div>
                      <div>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.country}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="fw-bold text-dark mb-1">Payment Method:</div>
                      <div>{selectedOrder.paymentMethod}</div>
                      <div className="fw-bold text-danger mt-1">Total: {formatPrice(selectedOrder.total)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      {cancelModalOrder && (
        <div className="modal-backdrop-custom" onClick={() => setCancelModalOrder(null)}>
          <div className="quickview-modal-content p-4" style={{ maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
            <h5 className="fw-bold text-danger mb-3">Request Order Cancellation</h5>
            <p className="text-muted small mb-3">
              Are you sure you want to cancel order <strong>{cancelModalOrder.orderId}</strong>?
            </p>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Reason for Cancellation</label>
              <select
                className="form-select"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option value="Changed mind / Ordered by mistake">Changed mind / Ordered by mistake</option>
                <option value="Found another silhouette I prefer">Found another silhouette I prefer</option>
                <option value="Selected incorrect bag color">Selected incorrect bag color</option>
                <option value="Shipping duration too long">Shipping duration too long</option>
                <option value="Other reason">Other reason</option>
              </select>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setCancelModalOrder(null)}>
                Keep Order
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleConfirmCancel}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModalOrder && (
        <div className="modal-backdrop-custom" onClick={() => setInvoiceModalOrder(null)}>
          <div className="quickview-modal-content p-4 p-md-5" style={{ maxWidth: "750px" }} onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div className="brand-logo-text">THAANGI<span>.</span></div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-dark" onClick={handlePrint}>
                  <i className="bi bi-printer me-1"></i> Print / PDF
                </button>
                <button className="modal-close-btn position-static" onClick={() => setInvoiceModalOrder(null)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <h6 className="fw-bold text-muted small text-uppercase">Billed To:</h6>
                <div className="fw-bold">{invoiceModalOrder.shippingAddress?.recipientName}</div>
                <div className="small text-muted">{invoiceModalOrder.shippingAddress?.street}</div>
                <div className="small text-muted">{invoiceModalOrder.shippingAddress?.city}, {invoiceModalOrder.shippingAddress?.country}</div>
              </div>
              <div className="col-6 text-end">
                <h6 className="fw-bold text-muted small text-uppercase">Tax Invoice:</h6>
                <div><strong>Invoice #:</strong> INV-{invoiceModalOrder.orderId}</div>
                <div><strong>Date:</strong> {invoiceModalOrder.date}</div>
                <div><strong>Payment:</strong> {invoiceModalOrder.paymentMethod}</div>
              </div>
            </div>

            <table className="table table-bordered mb-4">
              <thead className="table-light small">
                <tr>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceModalOrder.items.map((it, idx) => (
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
                  <td className="text-end">{formatPrice(invoiceModalOrder.subtotal)}</td>
                </tr>
                {invoiceModalOrder.discount > 0 && (
                  <tr>
                    <th colSpan="3" className="text-end text-success">Discount:</th>
                    <td className="text-end text-success">-{formatPrice(invoiceModalOrder.discount)}</td>
                  </tr>
                )}
                <tr>
                  <th colSpan="3" className="text-end">Shipping:</th>
                  <td className="text-end">{invoiceModalOrder.shipping === 0 ? "FREE" : formatPrice(invoiceModalOrder.shipping)}</td>
                </tr>
                <tr>
                  <th colSpan="3" className="text-end">Tax:</th>
                  <td className="text-end">{formatPrice(invoiceModalOrder.tax)}</td>
                </tr>
                <tr className="fw-bold fs-6">
                  <th colSpan="3" className="text-end">Total:</th>
                  <td className="text-end text-danger">{formatPrice(invoiceModalOrder.total)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="text-center text-muted small border-top pt-3">
              Official Tax Invoice issued by THAANGI HANDBAGS LLC.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
