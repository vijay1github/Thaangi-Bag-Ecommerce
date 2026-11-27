import React from "react";

export const WhatsAppButton = () => {
  const phoneNumber = "10782376"; // Matching reference "Call: +1 078 2376"
  const message = encodeURIComponent(
    "Hello THAANGI Handbags Concierge, I would like assistance with luxury bag selection and styling."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      title="Chat with THAANGI Luxury Concierge on WhatsApp"
      aria-label="WhatsApp Concierge"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
