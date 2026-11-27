import { formatPrice } from "../utils/currency";

export const coupons = [
  {
    code: "THAANGI10",
    description: "10% off on all luxury bags across the store",
    type: "percentage",
    value: 10,
    minOrder: 300,
    maxDiscount: 200,
    expiresAt: "2026-12-31"
  },
  {
    code: "FIRST50",
    description: `${formatPrice(50)} flat discount on your first order above ${formatPrice(400)}`,
    type: "flat",
    value: 50,
    minOrder: 400,
    maxDiscount: 50,
    expiresAt: "2026-12-31"
  },
  {
    code: "FESTIVE25",
    description: `25% off on select festive collections above ${formatPrice(600)}`,
    type: "percentage",
    value: 25,
    minOrder: 600,
    maxDiscount: 300,
    expiresAt: "2026-12-31"
  },
  {
    code: "FREESHIP",
    description: `Free express shipping on all orders above ${formatPrice(250)}`,
    type: "shipping",
    value: 15,
    minOrder: 250,
    maxDiscount: 15,
    expiresAt: "2026-12-31"
  }
];

export default coupons;
