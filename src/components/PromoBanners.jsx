import React from "react";
import { Link } from "react-router-dom";
import { promoBanners } from "../data/banners";

export const PromoBanners = () => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="row g-4">
          {promoBanners.map((banner) => (
            <div key={banner.id} className="col-md-6">
              <Link to={banner.link} className="text-decoration-none">
                <div
                  className="promo-banner-card"
                  style={{ backgroundColor: banner.bgColor }}
                >
                  <div className="pe-3">
                    <div className="promo-sub">{banner.categoryTitle}</div>
                    <h3 className="promo-title">{banner.discountText}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={banner.image}
                      alt={banner.categoryTitle}
                      className="promo-img"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
