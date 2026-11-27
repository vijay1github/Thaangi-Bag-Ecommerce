import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const ACCOUNTS_KEY = "thaangi_accounts";
const CURRENT_USER_KEY = "thaangi_current_user_id";

const getAccounts = () => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch (_e) {
    return [];
  }
};

const publicUser = ({ password: _password, passwordHash: _passwordHash, passwordSalt: _passwordSalt, ...user }) => user;

const hashPassword = async (password, salt) => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    key,
    256
  );
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const createPasswordCredential = async (password) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    passwordSalt: Array.from(salt),
    passwordHash: await hashPassword(password, salt)
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userId = localStorage.getItem(CURRENT_USER_KEY);
      const account = getAccounts().find((savedAccount) => savedAccount.id === userId);
      return account ? publicUser(account) : null;
    } catch (_e) {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const userId = localStorage.getItem(CURRENT_USER_KEY);
      const saved = userId ? localStorage.getItem(`thaangi_orders_${userId}`) : null;
      return saved ? JSON.parse(saved) : [];
    } catch (_e) {
      return [];
    }
  });

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    // Remove the previous demo-only session and seeded order data.
    localStorage.removeItem("thaangi_user");
    localStorage.removeItem("thaangi_auth_state");
    localStorage.removeItem("thaangi_orders");
  }, []);

  useEffect(() => {
    if (!user) return;
    try {
      const accounts = getAccounts();
      localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify(accounts.map((account) => account.id === user.id ? { ...account, ...user } : account))
      );
    } catch (e) {
      console.error("Profile storage error:", e);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(`thaangi_orders_${user.id}`, JSON.stringify(orders));
    } catch (e) {
      console.error("Orders storage error:", e);
    }
  }, [orders, user]);

  const login = async (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Please provide both email and password." };
    }
    const account = getAccounts().find((savedAccount) => savedAccount.email.toLowerCase() === email.trim().toLowerCase());
    if (!account) {
      return { success: false, message: "Email or password is incorrect. If you are new, create an account first." };
    }
    let passwordHash;
    try {
      passwordHash = await hashPassword(password, Uint8Array.from(account.passwordSalt));
    } catch (_e) {
      return { success: false, message: "Could not verify your password in this browser." };
    }
    if (passwordHash !== account.passwordHash) {
      return { success: false, message: "Email or password is incorrect. If you are new, create an account first." };
    }
    localStorage.setItem(CURRENT_USER_KEY, account.id);
    setUser(publicUser(account));
    try {
      const savedOrders = localStorage.getItem(`thaangi_orders_${account.id}`);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch (_e) {
      setOrders([]);
    }
    return { success: true, message: "Welcome back to THAANGI Handbags!" };
  };

  const register = async ({ name, email, phone, password }) => {
    if (!email || !password || !name) {
      return { success: false, message: "Please fill in all required fields." };
    }
    const accounts = getAccounts();
    const normalizedEmail = email.trim().toLowerCase();
    if (accounts.some((account) => account.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: "An account with this email already exists. Please sign in." };
    }
    let passwordCredential;
    try {
      passwordCredential = await createPasswordCredential(password);
    } catch (_e) {
      return { success: false, message: "Could not create your account in this browser. Please try again." };
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || "",
      membershipTier: "Silver Member",
      joinedDate: new Date().toLocaleDateString(),
      addresses: [],
      ...passwordCredential
    };
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, newUser]));
      localStorage.setItem(CURRENT_USER_KEY, newUser.id);
      localStorage.setItem(`thaangi_orders_${newUser.id}`, "[]");
    } catch (e) {
      return { success: false, message: "Could not save your account in this browser. Check available storage and try again." };
    }
    setUser(publicUser(newUser));
    setOrders([]);
    return { success: true, message: `Account registered successfully! Welcome ${name}.` };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setOrders([]);
  };

  const forgotPassword = (email) => {
    if (!email) {
      return { success: false, message: "Please enter your registered email address." };
    }
    const accountExists = getAccounts().some((account) => account.email.toLowerCase() === email.trim().toLowerCase());
    return {
      success: false,
      message: accountExists
        ? "Password reset emails are unavailable for accounts stored only in this browser."
        : "No account with this email was found in this browser."
    };
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => prev ? { ...prev, ...updatedFields } : prev);
  };

  const addAddress = (newAddress) => {
    const addressId = `addr_${Date.now()}`;
    const addressWithId = {
      ...newAddress,
      id: addressId,
      isDefault: user.addresses.length === 0 || newAddress.isDefault
    };

    setUser(prev => {
      let updatedList = [...prev.addresses];
      if (addressWithId.isDefault) {
        updatedList = updatedList.map(a => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedList, addressWithId]
      };
    });
    return addressWithId;
  };

  const editAddress = (id, updatedFields) => {
    setUser(prev => {
      let updatedList = prev.addresses.map(a => (a.id === id ? { ...a, ...updatedFields } : a));
      if (updatedFields.isDefault) {
        updatedList = updatedList.map(a => (a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
      }
      return { ...prev, addresses: updatedList };
    });
  };

  const deleteAddress = (id) => {
    setUser(prev => {
      const filtered = prev.addresses.filter(a => a.id !== id);
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return { ...prev, addresses: filtered };
    });
  };

  const setDefaultAddress = (id) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }));
  };

  const placeOrder = (orderData) => {
    const newOrderId = `THG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingCode = `DHL-EXPRESS-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const now = new Date();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 4);

    const fullOrder = {
      orderId: newOrderId,
      date: now.toISOString().split("T")[0],
      status: "Confirmed",
      trackingNumber: trackingCode,
      estimatedDelivery: estDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      paymentMethod: orderData.paymentMethod || "Credit Card",
      paymentStatus: orderData.paymentMethod === "Cash on Delivery" ? "Pending on Delivery" : "Paid (Demo)",
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items,
      timeline: [
        { status: "Order Placed", date: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
        { status: "Payment Confirmed", date: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, completed: true },
        { status: "Crafted & Packed", date: "Pending", completed: false },
        { status: "Shipped via DHL", date: "Pending", completed: false },
        { status: "Delivered", date: "Pending", completed: false }
      ],
      canCancel: true
    };

    setOrders(prev => [fullOrder, ...prev]);
    return fullOrder;
  };

  const cancelOrder = (orderId, reason = "Customer request") => {
    setOrders(prev =>
      prev.map(order => {
        if (order.orderId === orderId) {
          return {
            ...order,
            status: "Cancelled",
            canCancel: false,
            cancellationReason: reason,
            timeline: [
              ...order.timeline,
              { status: `Cancelled: ${reason}`, date: new Date().toLocaleString(), completed: true }
            ]
          };
        }
        return order;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        orders,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,
        placeOrder,
        cancelOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
