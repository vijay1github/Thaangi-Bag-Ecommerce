import React, { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { showToast } = useCart();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem("thaangi_wishlist");
      const items = saved ? JSON.parse(saved) : [];
      return items.filter((item) => item.name !== "Black City Backpack");
    } catch (e) {
      console.error("Wishlist localStorage error:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("thaangi_wishlist", JSON.stringify(wishlistItems));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems(prev => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: (product.images && product.images[0]) || product.image || "/images/products/product-1.jpg",
          rating: product.rating,
          stock: product.stock,
          colors: product.colors
        }
      ]);
      showToast(`Added "${product.name}" to your wishlist!`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    showToast("Removed from wishlist.", "info");
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    showToast("Wishlist cleared.", "info");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        totalWishlistCount: wishlistItems.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
