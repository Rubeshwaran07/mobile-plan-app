import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/CustomPayment.css";

const CustomPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customPlan, setCustomPlan] = useState(null);
  const [selectedMode, setSelectedMode] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const userId = localStorage.getItem("userId");

  // ✅ Get plan details from navigation state
  useEffect(() => {
    if (location.state?.customPlan) {
      setCustomPlan(location.state.customPlan);
    } else {
      alert("No custom plan found. Redirecting...");
      navigate("/dashboard/customize");
    }
  }, [location.state, navigate]);

  // ✅ Handle payment and order save
  const handlePayment = async () => {
    if (!userId) {
      alert("⚠️ User not logged in. Please log in again.");
      navigate("/login");
      return;
    }

    if (!customPlan) {
      alert("No plan data available.");
      return;
    }

    try {
      setProcessing(true);

      const payload = {
        totalAmount: customPlan.price || 0,
        paymentStatus: "Done",
        plans: [customPlan],
        addons: [],
      };

      const res = await axios.post(
        `http://localhost:8080/api/orders/custom/${userId}`,
        payload
      );

      if (res.status === 200 || res.status === 201) {
        alert("✅ Payment successful! Order placed successfully.");
        navigate("/dashboard/orders");
      } else {
        alert("⚠️ Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!customPlan) return null;

  return (
    <div className="custom-payment-container">
      <motion.div
        className="custom-payment-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="payment-title">💳 Custom Plan Payment</h2>
        <div className="plan-summary">
          <h3>📄 Plan Summary</h3>
          <p><strong>Plan Name:</strong> {customPlan.name}</p>
          <p><strong>Data:</strong> {customPlan.dataMB} MB</p>
          <p><strong>Voice Minutes:</strong> {customPlan.voiceMinutes}</p>
          <p><strong>SMS Count:</strong> {customPlan.smsCount}</p>
          <p><strong>Roaming Included:</strong> {customPlan.roamingIncluded ? "Yes" : "No"}</p>
          <h3 className="price">💰 Price: ₹{customPlan.price || 0}</h3>
        </div>

        <div className="payment-mode">
          <h4>Choose Payment Mode:</h4>
          <div className="mode-options">
            <label>
              <input
                type="radio"
                value="upi"
                checked={selectedMode === "upi"}
                onChange={(e) => setSelectedMode(e.target.value)}
              />
              UPI (Google Pay / PhonePe)
            </label>
            <label>
              <input
                type="radio"
                value="credit"
                checked={selectedMode === "credit"}
                onChange={(e) => setSelectedMode(e.target.value)}
              />
              Credit / Debit Card
            </label>
            <label>
              <input
                type="radio"
                value="netbanking"
                checked={selectedMode === "netbanking"}
                onChange={(e) => setSelectedMode(e.target.value)}
              />
              Net Banking
            </label>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pay-btn"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? "Processing Payment..." : `Pay ₹${customPlan.price || 0} Now`}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CustomPayment;
