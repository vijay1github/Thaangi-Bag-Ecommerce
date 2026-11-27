import React from "react";
import { instagramPosts } from "../data/banners";

export const InstagramSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="instagram-title-wrap">
          <div className="instagram-icon-badge">
            <i className="bi bi-instagram"></i>
          </div>
          <h2 className="section-title fs-3 mb-1">Bag &amp; Water pot</h2>
          <p className="section-subtitle">
            See how our customers styled luxury handbag products in their daily lives
          </p>
        </div>

        {/* 4 Square Instagram images matching Reference Page 3 */}
        <div className="row g-3">
          {instagramPosts.map((post) => (
            <div key={post.id} className="col-6 col-md-3">
              <div className="insta-grid-item">
                <img
                  src={post.image}
                  alt="Customer bag style"
                  className="insta-grid-img"
                />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-overlay text-decoration-none"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
