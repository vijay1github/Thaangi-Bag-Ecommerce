import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { heroSlides } from "../data/banners";

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];
  const showSlide = (index) => {
    setCurrentSlide((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="hero-slider-section">
      <div
        className="hero-slider-card"
      >
        <div
          key={`background-${slide.id}`}
          className="hero-slide-background"
          style={{ backgroundImage: `url("${slide.image}")` }}
          aria-hidden="true"
        />
        <div key={`content-${slide.id}`} className="hero-slide-content">
          <div className="hero-badge-tag">{slide.subtitle}</div>
          <h1 className="hero-main-title">{slide.title}</h1>
          <p className="hero-desc">{slide.description}</p>
          <div>
            <Link to={slide.buttonLink} className="btn-thaangi-primary">
              {slide.buttonText}
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="hero-dots-container">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => showSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="hero-nav-button hero-nav-previous"
          onClick={() => showSlide(currentSlide - 1)}
          aria-label="Previous slide"
        >
          <i className="bi bi-chevron-left" aria-hidden="true"></i>
        </button>
        <button
          className="hero-nav-button hero-nav-next"
          onClick={() => showSlide(currentSlide + 1)}
          aria-label="Next slide"
        >
          <i className="bi bi-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
