import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { formatPrice } from "../utils/currency";

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColor, setSelectedColor] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Handle category change
  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    setSelectedSubcategory("all");
    const newParams = new URLSearchParams(searchParams);
    if (slug === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", slug);
    }
    setSearchParams(newParams);
  };

  // Extract all distinct colors from products
  const availableColors = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      p.colors?.forEach(c => set.add(c.name));
    });
    return Array.from(set);
  }, []);

  // Current category object
  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== "all" && p.subcategory !== selectedSubcategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price range
      if (p.price > priceRange) {
        return false;
      }
      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // Color
      if (selectedColor !== "all") {
        const hasColor = p.colors?.some(c => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return b.discount - a.discount;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, priceRange, inStockOnly, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSearchQuery("");
    setPriceRange(2000);
    setSortBy("featured");
    setInStockOnly(false);
    setSelectedColor("all");
    setSearchParams({});
  };

  return (
    <div className="shop-page">
      {/* Breadcrumb Header */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <h1 className="breadcrumb-title">
                {selectedCategory === "all" ? "All Handbags & Leather Goods" : activeCategoryObj?.name || "Handbag Collection"}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
                  {selectedCategory !== "all" && (
                    <li className="breadcrumb-item active" aria-current="page">
                      {activeCategoryObj?.name}
                    </li>
                  )}
                </ol>
              </nav>
            </div>
            <div className="text-muted small">
              Showing <strong>{filteredProducts.length}</strong> of {products.length} luxury creations
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-4">
          {/* Mobile Filter Button */}
          <div className="col-12 d-lg-none">
            <button
              className="btn btn-thaangi-outline w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
            >
              <i className="bi bi-funnel"></i>
              {isFilterMobileOpen ? "Hide Filters" : "Filter Products & Categories"}
            </button>
          </div>

          {/* Left Filter Sidebar */}
          <div className={`col-lg-3 ${isFilterMobileOpen ? "d-block" : "d-none d-lg-block"}`}>
            <div className="bg-light rounded p-4 border">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="mb-0 fw-bold">Filters</h5>
                {(selectedCategory !== "all" || searchQuery || selectedColor !== "all" || priceRange < 2000 || inStockOnly) && (
                  <button
                    onClick={resetFilters}
                    className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* 1. Category Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-dark mb-2">
                  Categories
                </label>
                <div className="list-group list-group-flush bg-transparent">
                  <button
                    type="button"
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0 py-2 bg-transparent border-0 ${selectedCategory === "all" ? "fw-bold text-danger" : "text-dark"}`}
                    onClick={() => handleCategorySelect("all")}
                  >
                    <span>All Bags</span>
                    <span className="badge bg-white text-muted border">{products.length}</span>
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter(p => p.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0 py-2 bg-transparent border-0 ${selectedCategory === cat.slug ? "fw-bold text-danger" : "text-dark"}`}
                        onClick={() => handleCategorySelect(cat.slug)}
                      >
                        <span>{cat.name}</span>
                        <span className="badge bg-white text-muted border">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Subcategory (if category selected) */}
              {activeCategoryObj && activeCategoryObj.subcategories && (
                <div className="mb-4">
                  <label className="form-label fw-bold small text-uppercase text-dark mb-2">
                    Subcategory
                  </label>
                  <div className="d-flex flex-wrap gap-1">
                    <button
                      type="button"
                      className={`btn btn-sm ${selectedSubcategory === "all" ? "btn-dark" : "btn-outline-secondary"}`}
                      onClick={() => setSelectedSubcategory("all")}
                    >
                      All
                    </button>
                    {activeCategoryObj.subcategories.map(sub => (
                      <button
                        key={sub}
                        type="button"
                        className={`btn btn-sm ${selectedSubcategory === sub ? "btn-danger" : "btn-outline-secondary"}`}
                        onClick={() => setSelectedSubcategory(sub)}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Price Filter */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-bold small text-uppercase text-dark mb-0">
                    Max Price
                  </label>
                  <span className="fw-bold text-dark">{formatPrice(priceRange)}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between small text-muted">
                  <span>{formatPrice(100)}</span>
                  <span>{formatPrice(2000)}</span>
                </div>
              </div>

              {/* 4. Color Filter */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-uppercase text-dark mb-2">
                  Color
                </label>
                <div className="d-flex flex-wrap gap-1">
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedColor === "all" ? "btn-dark" : "btn-outline-secondary"}`}
                    onClick={() => setSelectedColor("all")}
                  >
                    Any Color
                  </button>
                  {availableColors.slice(0, 8).map(cName => (
                    <button
                      key={cName}
                      type="button"
                      className={`btn btn-sm ${selectedColor === cName ? "btn-danger" : "btn-outline-secondary"}`}
                      onClick={() => setSelectedColor(cName)}
                    >
                      {cName}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. In Stock Toggle */}
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="stockCheck"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <label className="form-check-label small fw-semibold text-dark" htmlFor="stockCheck">
                  In-Stock Only
                </label>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="col-lg-9">
            {/* Top Toolbar (Sort & Active tags) */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 bg-light p-3 rounded border">
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">Sort by:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "200px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Collections</option>
                  <option value="newest">New Arrivals First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Savings</option>
                </select>
              </div>

              {searchQuery && (
                <div className="small text-muted d-flex align-items-center gap-1">
                  <span>Searching for: <strong>"{searchQuery}"</strong></span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn btn-sm btn-link p-0 text-danger ms-1"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-6 col-md-4">
                    <ProductCard
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-light rounded border">
                <i className="bi bi-bag-x fs-1 text-muted d-block mb-3"></i>
                <h4 className="fw-bold">No Bags Found</h4>
                <p className="text-muted max-w-sm mx-auto mb-4">
                  We couldn't find any bags matching your filter criteria. Try clearing some filters.
                </p>
                <button onClick={resetFilters} className="btn btn-thaangi-primary">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
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

export default Shop;
