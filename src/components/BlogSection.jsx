import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

export const BlogSection = () => {
  return (
    <section className="blog-section-wrap">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title">Latest blogs</h2>
          <p className="section-subtitle">
            Insights, style guides, and sustainable leather stories from our Florence atelier.
          </p>
        </div>

        <div className="row g-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-4">
              <div className="blog-card">
                <div className="blog-card-img-wrap">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-card-img"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-date">{blog.date}</div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <Link
                    to="/about"
                    className="blog-read-more"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
