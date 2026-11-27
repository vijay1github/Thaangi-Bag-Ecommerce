import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

export const CartDrawer = () => {
  const {
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItemsCount
  } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className="cart-drawer-overlay"
        onClick={() => setIsDrawerOpen(false)}
      />
      <div className="cart-drawer-panel">
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0 fw-bold">Shopping Bag</h5>
            <span className="badge bg-danger rounded-pill">{totalItemsCount}</span>
          </div>
          <button
            className="btn btn-link p-0 text-dark header-action-icon"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close cart"
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-bag-x fs-1 text-muted d-block mb-3"></i>
              <h6 className="fw-bold">Your shopping bag is empty</h6>
              <p className="text-muted small mb-4">
                Explore our luxury handbag collections and add your favorite silhouettes.
              </p>
              <button
                className="btn btn-thaangi-primary btn-sm"
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate("/shop");
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="d-grid gap-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="d-flex gap-3 pb-3 border-bottom position-relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "74px",
                      height: "74px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      backgroundColor: "#F8F9FA"
                    }}
                  />
                  <div className="flex-grow-1 pe-3">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="fw-semibold text-dark text-decoration-none small d-block mb-1"
                    >
                      {item.name}
                    </Link>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      Color: {item.selectedColor}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="input-group input-group-sm" style={{ width: "90px" }}>
                        <button
                          className="btn btn-outline-secondary px-2 py-0"
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="form-control text-center px-1 py-0 bg-white" style={{ fontSize: "12px", lineHeight: "24px" }}>
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-secondary px-2 py-0"
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-link text-muted p-0 position-absolute top-0 end-0"
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    title="Remove item"
                    aria-label="Remove"
                  >
                    <i className="bi bi-trash3 small"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">Subtotal:</span>
              <span className="fw-bold fs-5 text-dark">{formatPrice(subtotal)}</span>
            </div>
            <div className="small text-muted mb-3" style={{ fontSize: "12px" }}>
              {subtotal >= 500 ? (
                <span className="text-success"><i className="bi bi-truck me-1"></i>Eligible for Complimentary Express Delivery</span>
              ) : (
                <span>Add <strong>{formatPrice(500 - subtotal)}</strong> more for complimentary delivery!</span>
              )}
            </div>

            <div className="d-grid gap-2">
              <Link
                to="/cart"
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-thaangi-outline w-100"
              >
                View Full Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-thaangi-primary w-100"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
