// src/components/Payment.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";

const Payment = ({ userId: propUserId }) => {
  const { planCart, addonCart } = useCart();
  const [total, setTotal] = useState(0);
  const [selectedMode, setSelectedMode] = useState("credit-card");
  const navigate = useNavigate();

  // ✅ Always read from localStorage if prop is undefined
  const userId = propUserId || localStorage.getItem("userId");

  useEffect(() => {
    const planTotal = (planCart || []).reduce(
      (sum, i) => sum + (i.plan?.price || 0),
      0
    );
    const addonTotal = (addonCart || []).reduce(
      (sum, i) => sum + (i.addon?.price || 0),
      0
    );
    setTotal(planTotal + addonTotal);
  }, [planCart, addonCart]);

  const handlePayment = async () => {
    if (!userId) {
      alert("⚠️ User not logged in. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      console.log("Creating order for user:", userId);
      const res = await axios.post(
        `http://localhost:8080/api/orders/place/${userId}`
      );

      if (res.status === 200 || res.status === 201) {
        alert("✅ Payment successful! Redirecting to Orders...");
        // setTimeout(() => navigate("/orders"), 1000);
      } else {
        alert("⚠️ Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Payment failed:", err.response || err.message);
      alert("❌ Payment failed. Please check server logs.");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="invoice-title">🧾 Payment & Invoice</h2>

      <div className="invoice-section">
        <h4>🗓️ Order Summary</h4>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item Type</th>
              <th>Name</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {planCart.map((item) => (
              <tr key={item.id}>
                <td>Plan</td>
                <td>{item.plan?.name}</td>
                <td>{item.plan?.price}</td>
              </tr>
            ))}
            {addonCart.map((item) => (
              <tr key={item.id}>
                <td>Addon</td>
                <td>{item.addon?.name}</td>
                <td>{item.addon?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-section">
          <h3>Total Amount: ₹{total}</h3>
        </div>
      </div>

      <div className="payment-mode-section">
        <h4>💳 Choose Payment Mode</h4>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentMode"
              value="credit-card"
              checked={selectedMode === "credit-card"}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            Credit / Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMode"
              value="upi"
              checked={selectedMode === "upi"}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            UPI (Google Pay / PhonePe)
          </label>
          <label>
            <input
              type="radio"
              name="paymentMode"
              value="net-banking"
              checked={selectedMode === "net-banking"}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            Net Banking
          </label>
        </div>
      </div>

      <button className="btn btn-success mt-3 pay-btn" onClick={handlePayment}>
        Pay ₹{total} Now
      </button>
    </div>
  );
};

export default Payment;
