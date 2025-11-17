import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "", address: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setMessage("🎉 Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-bg"></div>

      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="app-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          FlexiConnect
        </motion.h1>

        <h3 className="register-title">Create Your Account</h3>
        <p className="register-subtitle">Join the network that adapts to you.</p>

        {error && <div className="alert alert-danger custom-alert">{error}</div>}
        {message && <div className="alert alert-info custom-alert">{message}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {["name", "email", "mobile", "password", "address"].map((field) => (
            <motion.input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="register-input"
              value={form[field]}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
            />
          ))}

          <motion.button
            type="submit"
            className="register-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>

        <div className="register-links">
          <Link to="/login">← Back to Login</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
