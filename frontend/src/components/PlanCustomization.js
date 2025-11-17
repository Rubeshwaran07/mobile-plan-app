import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/PlanCustomization.css";

const PlanCustomization = () => {
  const [name, setName] = useState("");
  const [dataMB, setDataMB] = useState("");
  const [voiceMinutes, setVoiceMinutes] = useState("");
  const [smsCount, setSmsCount] = useState("");
  const [roamingIncluded, setRoamingIncluded] = useState(false);
  const [createdBy, setCreatedBy] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Handle form submit
  const handleCustomize = async (e) => {
    e.preventDefault();

    const request = {
      name: name || "My Custom Plan",
      dataMB: dataMB ? parseInt(dataMB) : 0,
      voiceMinutes: voiceMinutes ? parseInt(voiceMinutes) : 0,
      smsCount: smsCount ? parseInt(smsCount) : 0,
      roamingIncluded,
      createdBy: createdBy || "guest",
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/plans/customize", request);
      console.log("✅ Custom plan created:", res.data);

      // ✅ Redirect to payment page with custom plan details
      navigate("/dashboard/custom-payment", { state: { customPlan: res.data } });
    } catch (err) {
      console.error("❌ Error customizing plan:", err);
      alert("Failed to customize plan. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customize-container">
      <h2>🛠️ Build Your Own Plan</h2>
      <p className="subtitle">
        Create your personalized mobile plan. Choose data, calls, SMS, and more — see your price instantly on the payment page.
      </p>

      <form className="customize-form" onSubmit={handleCustomize}>
        <label>Plan Name</label>
        <input
          type="text"
          placeholder="Enter a plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Data Limit (in MB)</label>
        <input
          type="number"
          placeholder="e.g., 5000"
          value={dataMB}
          onChange={(e) => setDataMB(e.target.value)}
          required
        />

        <label>Voice Minutes</label>
        <input
          type="number"
          placeholder="e.g., 300"
          value={voiceMinutes}
          onChange={(e) => setVoiceMinutes(e.target.value)}
          required
        />

        <label>SMS Count</label>
        <input
          type="number"
          placeholder="e.g., 100"
          value={smsCount}
          onChange={(e) => setSmsCount(e.target.value)}
          required
        />

        <label>Include Roaming</label>
        <select
          value={roamingIncluded}
          onChange={(e) => setRoamingIncluded(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <label>Created By (optional)</label>
        <input
          type="text"
          placeholder="Enter your name or email"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Generate & Proceed to Payment"}
        </motion.button>
      </form>
    </div>
  );
};

export default PlanCustomization;
