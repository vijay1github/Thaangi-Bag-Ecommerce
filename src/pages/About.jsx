import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="about-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">About THAANGI Handbags</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Heritage Section */}
      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-6">
            <div className="text-danger small fw-bold text-uppercase mb-2" style={{ letterSpacing: "1.5px" }}>
              Our Provenance &amp; Heritage
            </div>
            <h2 className="display-6 fw-bold text-dark mb-4">
              Where Ancient Architectural Grace Meets Contemporary Italian Leathercraft
            </h2>
            <p className="text-muted leading-relaxed mb-3">
              Founded on the belief that a woman's handbag is an intimate architecture of her daily aspirations,
              <strong> THAANGI</strong> reconciles classical sculptural proportion with uncompromising utility.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              From our artisan ateliers nestled in Tuscany to our modern design studios, every cut, saddle stitch,
              and edge beveling is performed by master craftsmen with over three decades of lineage in haute maroquinerie.
            </p>
            <div className="row g-3 text-center border-top pt-4">
              <div className="col-4">
                <div className="fw-bold fs-3 text-danger">100%</div>
                <div className="small text-muted">Full-Grain Leather</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-3 text-danger">36+</div>
                <div className="small text-muted">Hours Per Bag</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-3 text-danger">120+</div>
                <div className="small text-muted">Countries Shipped</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="/images/categories/cat-handbag.jpg"
                alt="THAANGI Atelier Leathercraft"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Pillars of Luxury */}
        <div className="py-5 border-top">
          <div className="section-title-wrap">
            <h2 className="section-title">The Three Pillars of THAANGI</h2>
            <p className="section-subtitle">
              Every handbag that leaves our workshop carries our sacred oath of quality.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded p-4 h-100 bg-light">
                <div className="text-danger fs-1 mb-3">
                  <i className="bi bi-gem"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Architectural Integrity</h5>
                <p className="text-muted small mb-0">
                  Our structured satchels, baguettes, and duffels never sag or distort over time. Internal reinforcement boards engineered from recycled cellulose ensure eternal poise.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded p-4 h-100 bg-light">
                <div className="text-danger fs-1 mb-3">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Sustainable Vegetable Tanning</h5>
                <p className="text-muted small mb-0">
                  We strictly eschew toxic heavy-metal chromium salts. Our hides are tanned using chestnut, mimosa, and quebracho barks, respecting both artisanal health and pristine waterways.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded p-4 h-100 bg-light">
                <div className="text-danger fs-1 mb-3">
                  <i className="bi bi-award"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Lifetime Craftsmanship Warranty</h5>
                <p className="text-muted small mb-0">
                  Should any seam, zipper, or brass stud ever falter under normal daily use, our concierge will restore it to its original splendor free of charge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-dark text-white rounded p-5 text-center my-5">
          <h3 className="fw-bold mb-3">Ready to Discover Your Signature Carry?</h3>
          <p className="text-light opacity-75 max-w-md mx-auto mb-4">
            Explore our bestselling handbags, travel bags, and evening clutches online with complimentary worldwide express shipping.
          </p>
          <Link to="/shop" className="btn btn-thaangi-primary">
            Explore Current Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
