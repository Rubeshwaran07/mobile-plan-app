import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/PlansDisplay.css";
import { useCart } from "../context/CartContext";

const PlansDisplay = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, message } = useCart();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/plans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.content || res.data;
        setPlans(data);
        setFilteredPlans(data);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = plans.filter(
      (plan) =>
        plan.name?.toLowerCase().includes(term) ||
        plan.type?.toLowerCase().includes(term) ||
        plan.description?.toLowerCase().includes(term)
    );
    setFilteredPlans(filtered);
  }, [searchTerm, plans]);

  if (loading) return <div className="loading">Loading plans...</div>;

  return (
    <div className="plans-container">
      <div className="plans-header">
        <h2>Available Plans</h2>
        <input
          type="text"
          placeholder="🔍 Search plans..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {message && <div className="toast-message">{message}</div>}

      <div className="plans-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className="plan-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{plan.name}</h3>
              <p className="plan-type">{plan.type}</p>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-details">
                <span className="price">₹{plan.price}</span>
                <span className="validity">{plan.validityDays} days</span>
              </div>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({ id: plan.id, name: plan.name, price: plan.price }, "plan")
                }
              >
                🛒 Add to Cart
              </button>
            </motion.div>
          ))
        ) : (
          <p className="no-plans">No plans found.</p>
        )}
      </div>
    </div>
  );
};

export default PlansDisplay;
