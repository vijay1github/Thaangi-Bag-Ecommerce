import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../data/faqs";

export const FaqSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title">Frequently Asked Question</h2>
          <p className="section-subtitle">
            All your questions about THAANGI answered
          </p>
        </div>

        {/* 2-Column Accordion Layout matching Reference Page 3 */}
        <div className="row g-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="col-md-6">
                <div
                  className="faq-card-item"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <div className="faq-card-header">
                    <span>{faq.question}</span>
                    <i
                      className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"} faq-card-icon`}
                    ></i>
                  </div>
                  {isOpen && (
                    <div className="faq-card-body border-top mt-2 pt-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* "SEE MORE" Button matching Reference Page 3 */}
        <div className="text-center mt-4">
          <Link to="/faq" className="btn-thaangi-primary px-4 py-2" style={{ fontSize: "13px" }}>
            SEE MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
