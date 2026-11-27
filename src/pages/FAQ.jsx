import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../data/faqs";

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqId, setOpenFaqId] = useState(1);

  // Expanded FAQs categorized
  const fullFaqList = [
    ...faqs,
    {
      id: 7,
      category: "shipping",
      question: "How long does standard versus express delivery take?",
      answer: "Standard insured delivery takes 3 to 5 business days within the continental US and major European centers. White Glove express delivery guarantees next business day delivery when ordered prior to 2:00 PM EST."
    },
    {
      id: 8,
      category: "returns",
      question: "Can I exchange my handbag for another color?",
      answer: "Yes! Exchanges are completely complimentary. If you wish to switch colors, initiate an exchange through your customer profile and we will dispatch the new piece while arranging doorstep pickup of your original order."
    },
    {
      id: 9,
      category: "leather",
      question: "What makes THAANGI leather superior to standard retail bags?",
      answer: "We source exclusively from certified Florentine tanneries utilizing traditional vegetable-bark extracts. Unlike commercial plastic-coated leathers, our full-grain hides breathe naturally and develop a warm, prized patina over years of use."
    },
    {
      id: 10,
      category: "ordering",
      question: "Can I request custom initials monogramming on my bag?",
      answer: "Yes, complimentary hot-foil gold and blind debossed monogramming (up to 3 initials) is available on all top-handle bags, totes, and continental wallets upon request during checkout or via our WhatsApp concierge."
    }
  ];

  const filteredFaqs = fullFaqList.filter((f) => {
    const matchesQuery =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesQuery;
  });

  return (
    <div className="faq-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Frequently Asked Questions</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">FAQ</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        {/* Search Input */}
        <div className="max-w-xl mx-auto mb-5 text-center" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h3 className="fw-bold mb-2">How can we assist you today?</h3>
          <p className="text-muted small mb-3">Search through our guides on leather authenticity, shipping, returns, and ordering.</p>
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search e.g. shipping, returns, warranty, leather care..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQs List Accordion */}
        <div className="max-w-3xl mx-auto" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="d-grid gap-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="card border-0 shadow-sm rounded overflow-hidden"
                >
                  <div
                    className="p-3 p-md-4 d-flex align-items-center justify-content-between cursor-pointer bg-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  >
                    <h6 className="fw-bold text-dark mb-0 pe-3">{faq.question}</h6>
                    <i className={`bi ${isOpen ? "bi-chevron-up text-danger" : "bi-chevron-down text-muted"}`}></i>
                  </div>
                  {isOpen && (
                    <div className="p-4 bg-white border-top text-muted small leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-question-circle display-4 text-muted d-block mb-3"></i>
              <h5>No questions matched your search</h5>
              <p className="text-muted small">Try different keywords or speak directly with our concierge.</p>
              <Link to="/contact" className="btn btn-thaangi-primary btn-sm">
                Contact Concierge
              </Link>
            </div>
          )}

          {/* Direct Support Card below FAQs */}
          <div className="card border-0 shadow-sm rounded p-4 text-center mt-5 bg-white border">
            <h5 className="fw-bold mb-2">Still Have Questions?</h5>
            <p className="text-muted small mb-3">
              Our bespoke concierge advisors are always happy to assist with handbag styling and technical inquiries.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/contact" className="btn btn-thaangi-primary btn-sm">
                Contact Concierge
              </Link>
              <a
                href="https://wa.me/10782376"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-sm d-flex align-items-center gap-1"
              >
                <i className="bi bi-whatsapp"></i> WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
