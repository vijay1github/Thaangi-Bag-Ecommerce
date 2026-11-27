import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page py-5">
        <div className="container text-center py-5">
          <i className="bi bi-heart display-1 text-muted d-block mb-3"></i>
          <h2 className="fw-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4 max-w-md mx-auto">
            Save your favorite luxury handbags and statement pieces here to purchase whenever you are ready.
          </p>
          <Link to="/shop" className="btn btn-thaangi-primary">
            Explore Handbag Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart(item, 1);
    });
    clearWishlist();
  };

  return (
    <div className="wishlist-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="breadcrumb-title">My Luxury Wishlist</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
                </ol>
              </nav>
            </div>
            <button
              onClick={handleMoveAllToCart}
              className="btn btn-thaangi-primary btn-sm"
            >
              <i className="bi bi-bag-plus me-1"></i> Move All to Bag
            </button>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="card border-0 shadow-sm rounded overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small text-uppercase text-muted">
                <tr>
                  <th scope="col" className="ps-4 py-3">Product</th>
                  <th scope="col" className="py-3">Price</th>
                  <th scope="col" className="py-3">Stock Status</th>
                  <th scope="col" className="py-3 text-center">Action</th>
                  <th scope="col" className="pe-4 py-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item.id}>
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
                          <span className="badge bg-light text-secondary small border">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="fw-bold text-dark">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-muted small text-decoration-line-through ms-2">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success-subtle text-success small">
                        <i className="bi bi-check-circle me-1"></i>In Stock
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-thaangi-primary btn-sm px-3"
                        onClick={() => {
                          addToCart(item, 1);
                          removeFromWishlist(item.id);
                        }}
                      >
                        <i className="bi bi-bag-plus me-1"></i> Add to Bag
                      </button>
                    </td>
                    <td className="pe-4 text-center">
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
