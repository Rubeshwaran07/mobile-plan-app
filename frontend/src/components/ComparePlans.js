import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/ComparePlans.css";

const ComparePlans = () => {
  const [planNames, setPlanNames] = useState(["", ""]); // start with 2 textboxes
  const [plans, setPlans] = useState([]);

  const handleInputChange = (index, value) => {
    const updated = [...planNames];
    updated[index] = value;
    setPlanNames(updated);
  };

  const addPlanInput = () => setPlanNames([...planNames, ""]);

  const handleCompare = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/plans/compare",
        {
          planNames: planNames.filter((p) => p.trim() !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlans(res.data);
    } catch (err) {
      console.error("❌ Error comparing plans:", err);
      alert("Error comparing plans. Please check the plan names or token.");
    }
  };

  const getHighlights = () => {
    if (plans.length === 0) return {};
    const bestPrice = plans.reduce(
      (min, p) => (p.price < min.price ? p : min),
      plans[0]
    );
    const highestData = plans.reduce(
      (max, p) => (p.dataMB > max.dataMB ? p : max),
      plans[0]
    );
    return { bestPriceId: bestPrice.id, highestDataId: highestData.id };
  };

  const { bestPriceId, highestDataId } = getHighlights();

  return (
    <motion.div
      className="compare-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="compare-title">📊 Compare Mobile Plans</h2>
      <p className="compare-subtitle">
        Enter plan names to compare features, price, and data.
      </p>

      <div className="compare-inputs">
        {planNames.map((name, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Enter Plan Name ${i + 1}`}
            value={name}
            onChange={(e) => handleInputChange(i, e.target.value)}
          />
        ))}

        <div className="compare-btn-group">
          <button className="add-btn" onClick={addPlanInput}>
            ➕ Add Plan
          </button>
          <button className="compare-btn" onClick={handleCompare}>
            🔍 Compare
          </button>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => {
          const highlightClass =
            plan.id === bestPriceId
              ? "best-price"
              : plan.id === highestDataId
              ? "highest-data"
              : "";

          return (
            <motion.div
              key={plan.id}
              className={`plan-card ${highlightClass}`}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{plan.name}</h3>
              <p><strong>Type:</strong> {plan.type}</p>
              <p><strong>Validity:</strong> {plan.validityDays} days</p>
              <p><strong>Data:</strong> {plan.dataMB ? `${plan.dataMB} MB` : "Unlimited"}</p>
              <p><strong>Voice:</strong> {plan.voiceMinutes} mins</p>
              <p><strong>SMS:</strong> {plan.smsCount}</p>
              <p><strong>Roaming:</strong> {plan.roamingIncluded ? "✅ Included" : "❌ No"}</p>
              <p><strong>Price:</strong> ₹{plan.price}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ComparePlans;
