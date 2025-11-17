import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/RecommendedPlans.css";

const RecommendedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [budget, setBudget] = useState(500); // default budget ₹500
  const [roaming, setRoaming] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:8080/api/plans/recommendations", {
      params: { budget, roaming },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPlans(res.data);
  } catch (err) {
    console.error("Failed to fetch recommended plans:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchRecommendations();
  }, []); // load initially

  return (
    <motion.div
      className="recommend-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="recommend-header">
        <h3>🎯 Recommended Plans</h3>
        <p>Based on your budget preference</p>
      </div>

      <div className="recommend-filters">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter budget (₹)"
        />
        <label>
          <input
            type="checkbox"
            checked={roaming}
            onChange={(e) => setRoaming(e.target.checked)}
          />{" "}
          Need Roaming
        </label>
        <button className="fetch-btn" onClick={fetchRecommendations}>
          🔍 Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : plans.length === 0 ? (
        <p>No plans found for your budget.</p>
      ) : (
        <div className="plans-grid">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className="plan-card"
              whileHover={{ scale: 1.05 }}
            >
              <h4>{plan.name}</h4>
              <p>
                <strong>Type:</strong> {plan.type}
              </p>
              <p>
                <strong>Validity:</strong> {plan.validityDays} days
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {plan.dataMB ? `${plan.dataMB} MB` : "Unlimited"}
              </p>
              <p>
                <strong>Voice:</strong> {plan.voiceMinutes} mins
              </p>
              <p>
                <strong>SMS:</strong> {plan.smsCount}
              </p>
              <p>
                <strong>Roaming:</strong>{" "}
                {plan.roamingIncluded ? "✅ Included" : "❌ No"}
              </p>
              <p className="price">💰 ₹{plan.price}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecommendedPlans;
