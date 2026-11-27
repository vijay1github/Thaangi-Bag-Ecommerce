import React, { createContext, useContext, useState, useEffect } from "react";
import { coupons } from "../data/coupons";
import { formatPrice } from "../utils/currency";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("thaangi_cart");
      const items = saved ? JSON.parse(saved) : [];
      return items.filter((item) => item.name !== "Lady Handbag - Crimson Grace");
    } catch (e) {
      console.error("Cart localStorage error:", e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem("thaangi_coupon");
      return saved ? JSON.parse(saved) : null;
    } catch (_e) {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("thaangi_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("thaangi_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("thaangi_coupon");
      }
    } catch (e) {
      console.error("Failed to save coupon to localStorage", e);
    }
  }, [appliedCoupon]);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const colorToUse = selectedColor || (product.colors && product.colors[0]?.name) || "Default";
    const itemKey = `${product.id}-${colorToUse}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => `${item.id}-${item.selectedColor}` === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stock || 20);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            originalPrice: product.originalPrice,
            image: (product.images && product.images[0]) || product.image || "/images/products/product-1.jpg",
            selectedColor: colorToUse,
            quantity: Math.min(quantity, product.stock || 20),
            stock: product.stock || 20,
            sku: product.sku
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${colorToUse}) to cart!`);
  };

  const updateQuantity = (id, selectedColor, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, selectedColor);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id && item.selectedColor === selectedColor) {
          return { ...item, quantity: Math.min(newQty, item.stock) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id, selectedColor) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedColor === selectedColor)));
    showToast("Item removed from cart.", "info");
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrder) return 0;

    let discount = 0;
    if (appliedCoupon.type === "percentage") {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === "flat") {
      discount = appliedCoupon.value;
    } else if (appliedCoupon.type === "shipping") {
      discount = 0; // handled in shipping calculation
    }
    return Math.min(discount, appliedCoupon.maxDiscount || discount);
  };

  const discountAmount = calculateDiscount();

  // Free shipping over the 500 USD catalog threshold or with FREESHIP coupon.
  const baseShipping = subtotal > 500 || (appliedCoupon && appliedCoupon.type === "shipping") ? 0 : subtotal > 0 ? 25 : 0;
  const shippingCharge = baseShipping;
  const estimatedTax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0; // 5% luxury goods tax
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCharge + estimatedTax);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode);

    if (!found) {
      return { success: false, message: `Coupon "${cleanCode}" is invalid.` };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Coupon "${cleanCode}" requires a minimum cart value of ${formatPrice(found.minOrder)}. Current subtotal is ${formatPrice(subtotal)}.`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${cleanCode}" applied! Saved ${formatPrice(found.type === "shipping" ? 25 : calculateDiscount())}`);
    return { success: true, message: `Coupon "${cleanCode}" successfully applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.", "info");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingCharge,
        estimatedTax,
        totalAmount,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
