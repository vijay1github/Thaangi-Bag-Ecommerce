import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../utils/currency";

export const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase();
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.shortDesc.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    onClose();
  };

  return (
    <div className="header-search-panel" role="region" aria-label="Product search">
      <div className="container">
        <form onSubmit={handleSubmit} className="header-search-form">
          <div className="header-search-input-wrap">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              type="search"
              className="form-control"
              placeholder="Search for bags, backpacks, wallets..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
              aria-label="Search products"
            />
            <button type="button" className="header-search-close" onClick={onClose} aria-label="Close search">
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>
          <button type="submit" className="btn btn-thaangi-primary">Search</button>
        </form>

        {searchTerm.trim() && (
          <div className="header-search-results">
            {results.length ? results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                className="header-search-result"
              >
                <img src={product.images[0]} alt="" />
                <span className="flex-grow-1">
                  <span className="d-block fw-semibold text-dark">{product.name}</span>
                  <span className="small text-muted">{product.category}</span>
                </span>
                <span className="fw-semibold text-dark">{formatPrice(product.price)}</span>
              </Link>
            )) : (
              <div className="py-3 text-muted">No products found for "{searchTerm}".</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
