import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/currency";

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images[0] ? product.images[0] : "/images/products/product-1.jpg"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0] ? product.colors[0].name : "Default"
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="quickview-modal-content p-4 p-md-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="row g-4 align-items-center">
          {/* Product Gallery */}
          <div className="col-md-6">
            <div className="mb-3 text-center bg-light rounded p-3" style={{ height: "340px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "contain" }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="d-flex gap-2 justify-content-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`btn p-0 border rounded overflow-hidden ${selectedImage === img ? "border-danger border-2" : "border-light"}`}
                    style={{ width: "60px", height: "60px" }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <div className="badge bg-light text-secondary mb-2 text-uppercase fw-semibold" style={{ letterSpacing: "1px" }}>
              {product.category}
            </div>
            <h2 className="h4 fw-bold text-dark mb-2">{product.name}</h2>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="text-warning small">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < Math.floor(product.rating) ? "bi-star-fill" : "bi-star"}`}
                  ></i>
                ))}
              </div>
              <span className="text-muted small">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="fs-3 fw-bold text-dark">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="fs-5 text-muted text-decoration-line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="badge-thaangi-sale">Save {product.discount}%</span>
              )}
            </div>

            <p className="text-muted small mb-3">{product.shortDesc}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase text-dark mb-1">
                  Color: <span className="fw-normal text-muted">{selectedColor}</span>
                </label>
                <div className="d-flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`btn p-0 rounded-circle ${selectedColor === c.name ? "ring-2 ring-danger" : ""}`}
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? "2px solid #F27A72" : "1px solid #CCC",
                        outline: selectedColor === c.name ? "2px solid #F27A72" : "none"
                      }}
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="small mb-3">
              <i className="bi bi-check-circle-fill text-success me-1"></i>
              <strong>In Stock</strong> ({product.stock} units available)
            </div>

            {/* Quantity and Actions */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="input-group" style={{ width: "120px" }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control form-control-sm text-center bg-white"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-thaangi-primary flex-grow-1"
                onClick={handleAddToCart}
              >
                <i className="bi bi-bag-plus"></i>
                Add to Cart
              </button>

              <button
                type="button"
                className={`btn btn-outline-secondary ${inWishlist ? "text-danger" : ""}`}
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
              >
                <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"}`}></i>
              </button>
            </div>

            {/* View Full Product Link */}
            <div className="border-top pt-3">
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="small fw-semibold text-dark text-decoration-underline"
              >
                View Full Product Specifications &amp; Care Details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
