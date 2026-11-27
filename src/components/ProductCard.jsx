import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/currency";

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images && product.images[0] ? product.images[0] : "/images/products/product-1.jpg";
  const hoverImage = product.images && product.images[1] ? product.images[1] : primaryImage;

  return (
    <div className="product-card">
      {/* Thumbnail Wrap */}
      <div
        className="product-card-thumb-wrap"
        onMouseEnter={() => setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        {/* Wishlist Button */}
        <button
          className={`product-wishlist-btn ${inWishlist ? "active text-danger" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist"
        >
          <i className={`bi ${inWishlist ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="product-discount-tag">-{product.discount}%</span>
        )}

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="w-100 h-100 d-block">
          <img
            src={currentImageIndex === 1 && hoverImage ? hoverImage : primaryImage}
            alt={product.name}
            className="product-card-thumb"
            loading="lazy"
          />
        </Link>

        {/* Hover Action Buttons: QUICKVIEW and ADD TO CART matching Reference Page 2 */}
        <div className="product-hover-actions">
          <button
            type="button"
            className="btn-hover-quickview"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
            }}
          >
            QUICKVIEW
          </button>
          <button
            type="button"
            className="btn-hover-addcart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`} className="text-dark">
            {product.name}
          </Link>
        </h3>

        {/* Price Display */}
        <div className="product-card-pricing">
          <span className="product-price-current">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Rating stars */}
        <div className="d-flex align-items-center justify-content-center gap-1 mt-2 text-warning" style={{ fontSize: "12px" }}>
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bi ${i < Math.floor(product.rating) ? "bi-star-fill" : i < product.rating ? "bi-star-half" : "bi-star"}`}
            ></i>
          ))}
          <span className="text-muted ms-1" style={{ fontSize: "11px" }}>
            ({product.reviewCount || 12})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
