import React, { useState } from "react";
import HeroSlider from "../components/HeroSlider";
import PromoBanners from "../components/PromoBanners";
import ProductCard from "../components/ProductCard";
import CategoryBento from "../components/CategoryBento";
import BlogSection from "../components/BlogSection";
import InstagramSection from "../components/InstagramSection";
import FaqSection from "../components/FaqSection";
import NewsletterSection from "../components/NewsletterSection";
import BrandLogos from "../components/BrandLogos";
import QuickViewModal from "../components/QuickViewModal";
import { products } from "../data/products";

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // First 8 products matching the Popular Products section from Bisum reference pages 1 & 2
  const popularProducts = products.filter(p => p.isPopular).slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. Hero Slideshow matching Bisum Page 1 */}
      <HeroSlider />

      {/* 2. Side-by-Side Promotional Banners matching Bisum Page 1 */}
      <PromoBanners />

      {/* 3. Popular Products Section matching Bisum Pages 1 & 2 */}
      <section className="py-5">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Popular Products</h2>
            <p className="section-subtitle">
              Our most-coveted handcrafted leather silhouettes adored by style icons worldwide.
            </p>
          </div>

          <div className="row g-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shop By Category Bento Grid matching Bisum Page 2 */}
      <CategoryBento />

      {/* 5. Latest Blogs matching Bisum Page 2 */}
      <BlogSection />

      {/* 6. Instagram Showcase matching Bisum Page 3 */}
      <InstagramSection />

      {/* 7. Frequently Asked Questions matching Bisum Page 3 */}
      <FaqSection />

      {/* 8. Newsletter Subscription Banner matching Bisum Page 3 */}
      <NewsletterSection />

      {/* 9. Brand Partners Row matching Bisum Page 4 */}
      <BrandLogos />

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

export default Home;
