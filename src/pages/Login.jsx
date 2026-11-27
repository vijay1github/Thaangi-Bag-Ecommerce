import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const { showToast } = useCart();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      showToast(res.message);
      navigate("/profile");
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card border-0 shadow-sm rounded p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="brand-logo-text mb-2">THAANGI<span>.</span></div>
                <h4 className="fw-bold text-dark">Sign In To Your Account</h4>
                <p className="text-muted small">
                  Access your orders, saved addresses, and concierge services.
                </p>
              </div>

              {errorMsg && (
                <div className="alert alert-danger py-2 small mb-3">{errorMsg}</div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-semibold text-muted">Password *</label>
                    <Link to="/forgot-password" style={{ fontSize: "12px" }} className="text-danger">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <button type="submit" className="btn btn-thaangi-primary w-100 py-3 fw-bold mb-4">
                  Sign In
                </button>
              </form>

              <div className="text-center small text-muted border-top pt-3">
                Don't have an account?{" "}
                <Link to="/register" className="fw-bold text-danger text-decoration-none">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
