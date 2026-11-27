// Catalog and checkout values are maintained in USD; display them in INR.
export const USD_TO_INR_RATE = 92.43;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export const formatPrice = (usdAmount) => inrFormatter.format((Number(usdAmount) || 0) * USD_TO_INR_RATE);
