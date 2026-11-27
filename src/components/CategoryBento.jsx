import React from "react";
import { Link } from "react-router-dom";

export const CategoryBento = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-subtitle">
            Explore handcrafted architectural silhouettes shaped for every occasion.
          </p>
        </div>

        {/* Bento Masonry Grid Matching Reference Page 2 */}
        <div className="category-bento-grid">
          {/* Card 1 (Left Tall Card): Women Beautiful Handbag */}
          <Link
            to="/shop?category=handbags"
            className="bento-card bento-card-tall text-decoration-none"
            style={{ backgroundColor: "#FBECEE" }}
          >
            <div>
              <div className="bento-sub">New Arrivals</div>
              <h3 className="bento-title">Women Beautiful Handbag</h3>
              <span className="bento-link">SHOP COLLECTION</span>
            </div>
            <img
              src="/images/categories/cat-handbag.jpg"
              alt="Women Beautiful Handbag"
              className="bento-img"
            />
          </Link>

          {/* Card 2 (Middle Top): Bag Bouquet */}
          <Link
            to="/shop?category=backpacks"
            className="bento-card text-decoration-none"
            style={{ backgroundColor: "#EBF3FC" }}
          >
            <div>
              <div className="bento-sub">New Arrivals</div>
              <h3 className="bento-title">Bag Bouquet</h3>
              <span className="bento-link">SHOP COLLECTION</span>
            </div>
            <img
              src="/images/categories/cat-bouquet.jpg"
              alt="Bag Bouquet"
              className="bento-img"
            />
          </Link>

          {/* Card 3 (Right Top): Leather collection */}
          <Link
            to="/shop?category=tote-bags"
            className="bento-card text-decoration-none"
            style={{ backgroundColor: "#FFF3EA" }}
          >
            <div>
              <div className="bento-sub">Quality Product</div>
              <h3 className="bento-title">Leather collection</h3>
              <span className="bento-link">SHOP COLLECTION</span>
            </div>
            <img
              src="/images/categories/cat-leather.jpg"
              alt="Leather collection"
              className="bento-img"
            />
          </Link>

          {/* Card 4 (Middle Bottom): Office Carrier */}
          <Link
            to="/shop?category=shoulder-bags"
            className="bento-card text-decoration-none"
            style={{ backgroundColor: "#EAF4F4" }}
          >
            <div>
              <div className="bento-sub">New Arrivals</div>
              <h3 className="bento-title">Office Carrier</h3>
              <span className="bento-link">SHOP COLLECTION</span>
            </div>
            <img
              src="/images/categories/cat-office.jpg"
              alt="Office Carrier"
              className="bento-img"
            />
          </Link>

          {/* Card 5 (Right Bottom): Travel The World */}
          <Link
            to="/shop?category=travel-bags"
            className="bento-card text-decoration-none"
            style={{ backgroundColor: "#EFF1FD" }}
          >
            <div>
              <div className="bento-sub">New Arrivals</div>
              <h3 className="bento-title">Travel The World</h3>
              <span className="bento-link">SHOP COLLECTION</span>
            </div>
            <img
              src="/images/categories/cat-travel.jpg"
              alt="Travel The World"
              className="bento-img"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryBento;
