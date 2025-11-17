import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/AddonsDisplay.css";
import { useCart } from "../context/CartContext";

const AddonsDisplay = () => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, message } = useCart();

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/addons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.content || res.data;
        setAddons(data);
      } catch (err) {
        console.error("❌ Error fetching add-ons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddons();
  }, []);

  if (loading) return <div className="loading">Loading add-ons...</div>;

  return (
    <motion.div
      className="addons-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="addons-title">✨ Available Add-ons</h2>
      {message && <div className="toast-message">{message}</div>}

      <div className="addons-grid">
        {addons.length > 0 ? (
          addons.map((addon) => (
            <motion.div
              key={addon.id}
              className="addon-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{addon.name}</h3>
              <p className="addon-description">{addon.description}</p>
              <p className="addon-price">₹{addon.price}</p>

              <button
                className="add-btn"
                onClick={() =>
                  addToCart({ id: addon.id, name: addon.name, price: addon.price }, "addon")
                }
              >
                🛒 Add to Cart
              </button>
            </motion.div>
          ))
        ) : (
          <p>No add-ons available.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AddonsDisplay;
