import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { formatPrice } from "../utils/currency";

export const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart, showToast } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // description | specs | care | reviews
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Reviews state with initial mock reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: "Genevieve Sterling",
      rating: 5,
      date: "February 12, 2026",
      title: "Exceeded all my expectations!",
      comment: "The leather grain is so supple and the stitching is pristine. I get compliments whenever I carry it into client meetings. Worth every penny."
    },
    {
      id: 2,
      author: "Claire Dupont",
      rating: 5,
      date: "January 28, 2026",
      title: "True Italian luxury",
      comment: "Arrived beautifully boxed with its dust cover and authenticity certificate. The gold hardware feels substantial and hasn't tarnished at all."
    }
  ]);

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    title: "",
    comment: ""
  });

  useEffect(() => {
    if (product) {
      setActiveImage(product.images && product.images[0] ? product.images[0] : "/images/products/product-1.jpg");
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : "Default");
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-bag-x fs-1 text-muted d-block mb-3"></i>
        <h2 className="fw-bold">Bag Not Found</h2>
        <p className="text-muted">The luxury product you are seeking might have been discontinued or moved.</p>
        <Link to="/shop" className="btn btn-thaangi-primary">
          Explore Current Collections
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      showToast("Please enter your name and review comment.", "info");
      return;
    }
    const created = {
      id: Date.now(),
      author: newReview.author,
      rating: Number(newReview.rating),
      date: "Just now",
      title: newReview.title || "Customer Review",
      comment: newReview.comment
    };
    setReviewsList([created, ...reviewsList]);
    setNewReview({ author: "", rating: 5, title: "", comment: "" });
    showToast("Thank you for sharing your review!");
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
              <li className="breadcrumb-item">
                <Link to={`/shop?category=${product.categorySlug}`}>{product.category}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-5">
          {/* Left: Product Images Gallery */}
          <div className="col-lg-6">
            <div className="product-main-image-wrap bg-light rounded p-4 text-center mb-3 border position-relative" style={{ minHeight: "440px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {product.discount > 0 && (
                <span className="product-discount-tag position-absolute top-3 start-3">
                  -{product.discount}% OFF
                </span>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className="img-fluid"
                style={{ maxHeight: "400px", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.08))" }}
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="d-flex gap-2 justify-content-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`btn p-0 border rounded overflow-hidden ${activeImage === img ? "border-danger border-2" : "border-light"}`}
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-light text-secondary text-uppercase fw-semibold border">
                {product.category}
              </span>
              <span className="text-muted small">&bull;</span>
              <span className="text-muted small">SKU: {product.sku}</span>
            </div>

            <h1 className="h2 fw-bold text-dark mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="text-warning">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bi ${i < Math.floor(product.rating) ? "bi-star-fill" : "bi-star"}`}
                  ></i>
                ))}
              </div>
              <span className="fw-semibold text-dark small">{product.rating}</span>
              <span className="text-muted small">({reviewsList.length + product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-baseline gap-3 mb-4">
              <span className="display-6 fw-bold text-dark">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="fs-4 text-muted text-decoration-line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="badge-thaangi-sale">Save {formatPrice(product.originalPrice - product.price)}</span>
              )}
            </div>

            <p className="text-muted mb-4 leading-relaxed">{product.description}</p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-dark mb-2">
                  Selected Color: <span className="text-danger">{selectedColor}</span>
                </label>
                <div className="d-flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className="btn p-0 rounded-circle position-relative"
                      style={{
                        width: "34px",
                        height: "34px",
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? "3px solid #FFFFFF" : "1px solid #CCC",
                        outline: selectedColor === c.name ? "2px solid #F27A72" : "none",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                      }}
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-check-circle-fill text-success fs-5"></i>
              <span className="fw-semibold text-dark">In Stock</span>
              <span className="text-muted small">({product.stock} units ready for immediate dispatch)</span>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
              <div className="input-group" style={{ width: "130px" }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center bg-white fw-bold"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-thaangi-primary px-4 py-3 flex-grow-1"
                onClick={() => addToCart(product, quantity, selectedColor)}
              >
                <i className="bi bi-bag-plus"></i>
                Add to Cart
              </button>

              <button
                type="button"
                className={`btn btn-outline-secondary p-3 ${inWishlist ? "text-danger" : ""}`}
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
              >
                <i className={`bi ${inWishlist ? "bi-heart-fill" : "bi-heart"} fs-5`}></i>
              </button>
            </div>

            {/* Luxury Assurance Badges */}
            <div className="border rounded p-3 bg-light d-grid gap-2 small">
              <div className="d-flex align-items-center gap-2 text-dark">
                <i className="bi bi-shield-check text-success fs-5"></i>
                <span><strong>100% Certified Italian Full-Grain Leather</strong> with numbered authenticity stamp.</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-dark">
                <i className="bi bi-truck text-primary fs-5"></i>
                <span><strong>Complimentary Express Delivery</strong> on orders over {formatPrice(500)}.</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-dark">
                <i className="bi bi-arrow-repeat text-warning fs-5"></i>
                <span><strong>15-Day Hassle-Free Returns</strong> with complimentary doorstep collection.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications, Reviews and Care Guide */}
        <div className="mt-5 pt-4 border-top">
          <ul className="nav nav-tabs justify-content-center mb-4 border-bottom">
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold px-4 py-3 ${activeTab === "description" ? "active text-danger border-bottom-0" : "text-dark"}`}
                onClick={() => setActiveTab("description")}
              >
                Features &amp; Story
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold px-4 py-3 ${activeTab === "specs" ? "active text-danger border-bottom-0" : "text-dark"}`}
                onClick={() => setActiveTab("specs")}
              >
                Dimensions &amp; Specs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold px-4 py-3 ${activeTab === "care" ? "active text-danger border-bottom-0" : "text-dark"}`}
                onClick={() => setActiveTab("care")}
              >
                Leather Care
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-semibold px-4 py-3 ${activeTab === "reviews" ? "active text-danger border-bottom-0" : "text-dark"}`}
                onClick={() => setActiveTab("reviews")}
              >
                Customer Reviews ({reviewsList.length})
              </button>
            </li>
          </ul>

          <div className="tab-content max-w-3xl mx-auto" style={{ maxWidth: "800px" }}>
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <h4 className="fw-bold mb-3">Architectural Craftsmanship</h4>
                <p className="text-muted mb-4">{product.description}</p>
                <h5 className="fw-bold mb-3">Key Highlights</h5>
                <ul className="list-unstyled d-grid gap-2 text-muted">
                  {product.features && product.features.map((feat, i) => (
                    <li key={i} className="d-flex align-items-start gap-2">
                      <i className="bi bi-check2 text-danger mt-1"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div>
                <h4 className="fw-bold mb-3">Technical Specifications</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="bg-light" style={{ width: "35%" }}>Dimensions</th>
                        <td>{product.specs?.dimensions || "30cm x 22cm x 12cm"}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Weight</th>
                        <td>{product.specs?.weight || "650g"}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Capacity</th>
                        <td>{product.specs?.capacity || "8.5 Liters"}</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Hardware</th>
                        <td>High-Polish Brushed Brass with anti-tarnish coating</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Lining</th>
                        <td>Water-resistant Italian red microsuede velvet</td>
                      </tr>
                      <tr>
                        <th className="bg-light">Warranty</th>
                        <td>{product.specs?.warranty || "2 Years Craftsmanship Warranty"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Care Tab */}
            {activeTab === "care" && (
              <div>
                <h4 className="fw-bold mb-3">Maintaining Your Heirloom Bag</h4>
                <p className="text-muted mb-3">
                  THAANGI leather items are meant to mature gracefully with age, acquiring a unique patina that tells the story of your journeys.
                </p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded border h-100">
                      <h6 className="fw-bold text-dark"><i className="bi bi-droplet-half me-2 text-primary"></i>Moisture Protection</h6>
                      <p className="small text-muted mb-0">If exposed to rain, blot gently with a dry microfiber cloth. Do not use direct heat or hairdryers.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded border h-100">
                      <h6 className="fw-bold text-dark"><i className="bi bi-box-seam me-2 text-danger"></i>Storage Practice</h6>
                      <p className="small text-muted mb-0">Always store stuffed with tissue paper inside the breathable cotton dust bag in a dry, ventilated closet.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h4 className="fw-bold mb-0">Customer Feedback</h4>
                  <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                    <i className="bi bi-star-fill me-1"></i> {product.rating} / 5.0
                  </span>
                </div>

                {/* Review Form */}
                <div className="bg-light p-4 rounded border mb-4">
                  <h5 className="fw-bold mb-3">Write a Customer Review</h5>
                  <form onSubmit={handleAddReview}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Your Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Charlotte M."
                          value={newReview.author}
                          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Rating *</label>
                        <select
                          className="form-select"
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        >
                          <option value="5">5 Stars - Exceptional</option>
                          <option value="4">4 Stars - Very Good</option>
                          <option value="3">3 Stars - Average</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Review Headline</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Stunning craftsmanship and fast shipping"
                          value={newReview.title}
                          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Your Review *</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Share your thoughts on the leather texture, size, color and overall design..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-thaangi-primary">
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="d-grid gap-3">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-3 border rounded bg-white">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>
                          <span className="fw-bold text-dark">{rev.author}</span>
                          <span className="badge bg-success-subtle text-success ms-2 small">Verified Purchaser</span>
                        </div>
                        <span className="text-muted small">{rev.date}</span>
                      </div>
                      <div className="text-warning small mb-2">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi ${i < rev.rating ? "bi-star-fill" : "bi-star"}`}
                          ></i>
                        ))}
                      </div>
                      {rev.title && <div className="fw-semibold text-dark mb-1">{rev.title}</div>}
                      <p className="text-muted small mb-0">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <div className="section-title-wrap mb-4">
              <h2 className="section-title fs-3">You May Also Admire</h2>
              <p className="section-subtitle">Complementary designs from the same leather collection.</p>
            </div>
            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div key={p.id} className="col-6 col-md-3">
                  <ProductCard
                    product={p}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
