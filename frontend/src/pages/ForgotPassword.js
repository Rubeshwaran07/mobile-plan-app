import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password", { emailOrMobile });
      setToken(res.data.token);
      setMessage(`✅ Reset token generated! Use this token in Reset Password page.`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to generate token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center mb-4 text-primary">Forgot Password</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Email or Mobile"
              className="form-control"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Processing..." : "Generate Reset Token"}
          </button>
        </form>

        {token && (
          <div className="mt-3 p-2 bg-light border rounded">
            <strong>Demo Token:</strong> <br />
            <code>{token}</code>
          </div>
        )}
              <div className="text-center mt-3">
            <small
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/reset-password")}
            >
                Reset Password
            </small>
            </div>

            <div className="text-center mt-3">
            <small
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
            >
                Back to Login
            </small>
            </div>            
 
      </div>
    </div>
  );
}

export default ForgotPassword;
