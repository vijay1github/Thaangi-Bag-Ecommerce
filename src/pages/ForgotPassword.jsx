import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const { forgotPassword } = useAuth();

  const handleReset = (e) => {
    e.preventDefault();
    const res = forgotPassword(email);
    setStatusMessage(res);
  };

  return (
    <div className="forgot-password-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="brand-logo-text mb-2">THAANGI<span>.</span></div>
                <h4 className="fw-bold text-dark">Reset Password</h4>
                <p className="text-muted small">
                  Account recovery checks accounts saved in this browser. Email recovery is not available.
                </p>
              </div>

              {statusMessage && (
                <div
                  className={`alert ${
                    statusMessage.success ? "alert-success" : "alert-danger"
                  } py-2 small mb-4`}
                >
                  {statusMessage.message}
                </div>
              )}

              <form onSubmit={handleReset}>
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-muted">Registered Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-thaangi-primary w-100 py-3 fw-bold mb-4">
                  Check Account
                </button>
              </form>

              <div className="text-center small text-muted border-top pt-3">
                Remembered your password?{" "}
                <Link to="/login" className="fw-bold text-danger text-decoration-none">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
