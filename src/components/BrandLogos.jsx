import React from "react";
import { brandPartners } from "../data/banners";

export const BrandLogos = () => {
  return (
    <section className="py-4">
      <div className="container">
        <div className="brand-logos-row">
          {brandPartners.map((brand) => (
            <div key={brand.id} className="text-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo-item"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
