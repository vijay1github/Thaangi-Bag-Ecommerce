import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg("Please agree to the Terms of Service.");
      return;
    }

    const res = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (res.success) {
      showToast(res.message);
      navigate("/profile");
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="brand-logo-text mb-2">THAANGI<span>.</span></div>
                <h4 className="fw-bold text-dark">Create Your Client Account</h4>
                <p className="text-muted small">
                  Join our privileged clientele to receive private invitations and bespoke perks.
                </p>
              </div>

              {errorMsg && (
                <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>
              )}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Password *</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Confirm Password *</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeCheck"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  />
                  <label className="form-check-label small text-muted" htmlFor="agreeCheck">
                    I agree to the <Link to="/faq" className="text-danger">Terms &amp; Conditions</Link> and Luxury Privacy Policy.
                  </label>
                </div>

                <button type="submit" className="btn btn-thaangi-primary w-100 py-3 fw-bold mb-4">
                  Create VIP Account
                </button>
              </form>

              <div className="text-center small text-muted border-top pt-3">
                Already have an account?{" "}
                <Link to="/login" className="fw-bold text-danger text-decoration-none">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
