import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export const Profile = () => {
  const {
    user,
    isAuthenticated,
    logout,
    updateProfile,
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress,
    orders
  } = useAuth();
  const { totalWishlistCount } = useWishlist();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'addresses' | 'security'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    title: "Home",
    recipientName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    isDefault: false
  });

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h2>Please Sign In</h2>
        <p className="text-muted">You need to sign in to view your profile and saved addresses.</p>
        <Link to="/login" className="btn btn-thaangi-primary">Log In</Link>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
    showToast("Profile updated successfully!");
  };

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      title: "Home",
      recipientName: user?.name || "",
      phone: user?.phone || "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      isDefault: false
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({ ...addr });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      editAddress(editingAddressId, addressForm);
      showToast("Address modified successfully!");
    } else {
      addAddress(addressForm);
      showToast("New delivery address added!");
    }
    setIsAddressModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match.", "info");
      return;
    }
    showToast("Security password updated successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="profile-page">
      {/* Breadcrumb */}
      <div className="thaangi-breadcrumb">
        <div className="container">
          <h1 className="breadcrumb-title">Customer Concierge &amp; Profile</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Profile</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row g-4">
          {/* Left Column: Account Navigation & Stats */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded p-4 text-center mb-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle mx-auto mb-3 border border-3 border-danger-subtle"
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle mx-auto mb-3 border border-3 border-danger-subtle d-flex align-items-center justify-content-center bg-light text-secondary"
                  style={{ width: "90px", height: "90px", fontSize: "2rem" }}
                  aria-label="Profile avatar"
                >
                  <i className="bi bi-person"></i>
                </div>
              )}
              <h5 className="fw-bold mb-1">{user?.name}</h5>
              <div className="text-muted small mb-2">{user?.email}</div>
              <span className="badge bg-warning text-dark mx-auto px-3 py-1 mb-3">
                <i className="bi bi-gem me-1"></i> {user?.membershipTier || "VIP Member"}
              </span>

              <div className="row g-2 border-top pt-3 text-center small">
                <div className="col-4">
                  <div className="fw-bold fs-6 text-dark">{orders.length}</div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>Orders</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-6 text-dark">{totalWishlistCount}</div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>Wishlist</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold fs-6 text-dark">450</div>
                  <div className="text-muted" style={{ fontSize: "11px" }}>Points</div>
                </div>
              </div>
            </div>

            {/* Menu Tabs */}
            <div className="list-group shadow-sm border-0 rounded overflow-hidden">
              <button
                className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 ${activeTab === "profile" ? "active bg-danger border-danger" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <i className="bi bi-person-gear fs-5"></i>
                <span className="fw-semibold">Personal Information</span>
              </button>
              <button
                className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 ${activeTab === "addresses" ? "active bg-danger border-danger" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <i className="bi bi-geo-alt fs-5"></i>
                <span className="fw-semibold">Saved Addresses ({user?.addresses?.length || 0})</span>
              </button>
              <button
                className={`list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 ${activeTab === "security" ? "active bg-danger border-danger" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <i className="bi bi-shield-lock fs-5"></i>
                <span className="fw-semibold">Security &amp; Password</span>
              </button>
              <Link
                to="/orders"
                className="list-group-item list-group-item-action py-3 d-flex align-items-center gap-3"
              >
                <i className="bi bi-bag-check fs-5"></i>
                <span className="fw-semibold">Order History &amp; Tracking</span>
              </Link>
              <button
                className="list-group-item list-group-item-action py-3 d-flex align-items-center gap-3 text-danger"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <i className="bi bi-box-arrow-right fs-5"></i>
                <span className="fw-semibold">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tabbed Content */}
          <div className="col-lg-8">
            {/* 1. Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="card border-0 shadow-sm rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="fw-bold mb-0">Personal Profile</h5>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                  >
                    <i className={`bi ${isEditingProfile ? "bi-x-lg" : "bi-pencil"} me-1`}></i>
                    {isEditingProfile ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-thaangi-primary">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="text-muted small">Full Name</div>
                      <div className="fw-semibold fs-6 text-dark">{user?.name}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-muted small">Email Address</div>
                      <div className="fw-semibold fs-6 text-dark">{user?.email}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-muted small">Phone Number</div>
                      <div className="fw-semibold fs-6 text-dark">{user?.phone || "Not set"}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-muted small">Membership Status</div>
                      <div className="fw-semibold fs-6 text-success">{user?.membershipTier}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Addresses Management Tab */}
            {activeTab === "addresses" && (
              <div className="card border-0 shadow-sm rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="fw-bold mb-0">Delivery Address Book</h5>
                  <button
                    className="btn btn-thaangi-primary btn-sm"
                    onClick={handleOpenAddAddress}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Add New Address
                  </button>
                </div>

                <div className="row g-3">
                  {user?.addresses?.map((addr) => (
                    <div key={addr.id} className="col-md-6">
                      <div className={`p-3 rounded border h-100 position-relative ${addr.isDefault ? "border-danger bg-light" : "bg-white"}`}>
                        {addr.isDefault && (
                          <span className="badge bg-danger position-absolute top-2 end-2" style={{ fontSize: "10px" }}>
                            Default Address
                          </span>
                        )}
                        <h6 className="fw-bold text-dark mb-1">{addr.title}</h6>
                        <div className="small fw-semibold text-dark">{addr.recipientName}</div>
                        <div className="small text-muted mb-2">
                          {addr.street}<br />
                          {addr.city}, {addr.state} {addr.postalCode}<br />
                          {addr.country}<br />
                          Phone: {addr.phone}
                        </div>

                        <div className="d-flex align-items-center gap-2 border-top pt-2">
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-dark"
                            onClick={() => handleOpenEditAddress(addr)}
                          >
                            Edit
                          </button>
                          {!addr.isDefault && (
                            <>
                              <span className="text-muted">&bull;</span>
                              <button
                                type="button"
                                className="btn btn-link btn-sm p-0 text-primary"
                                onClick={() => setDefaultAddress(addr.id)}
                              >
                                Set as Default
                              </button>
                              <span className="text-muted">&bull;</span>
                              <button
                                type="button"
                                className="btn btn-link btn-sm p-0 text-danger"
                                onClick={() => deleteAddress(addr.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Security Tab */}
            {activeTab === "security" && (
              <div className="card border-0 shadow-sm rounded p-4">
                <h5 className="fw-bold mb-4">Change Security Password</h5>
                <form onSubmit={handlePasswordSubmit} style={{ maxWidth: "450px" }}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-muted">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-thaangi-primary">
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="modal-backdrop-custom" onClick={() => setIsAddressModalOpen(false)}>
          <div className="quickview-modal-content p-4" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h5>
              <button className="modal-close-btn position-static" onClick={() => setIsAddressModalOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSaveAddress}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Address Label (e.g. Home, Office)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.title}
                    onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Recipient Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.recipientName}
                    onChange={(e) => setAddressForm({ ...addressForm, recipientName: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">State / Province</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Country</label>
                  <select
                    className="form-select"
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="defaultAddrCheck"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    />
                    <label className="form-check-label small" htmlFor="defaultAddrCheck">
                      Set as primary default shipping address
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setIsAddressModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-thaangi-primary">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
