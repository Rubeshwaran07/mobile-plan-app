// src/pages/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ added

const Cart = () => {
  const { planCart, addonCart, message, removePlan, removeAddon, loading } = useCart();
  const navigate = useNavigate(); // ✅ added

  if (loading) return <p>Loading your cart...</p>;

  const planTotal = (planCart || []).reduce((sum, i) => sum + (i.plan?.price || 0), 0);
  const addonTotal = (addonCart || []).reduce((sum, i) => sum + (i.addon?.price || 0), 0);
  const total = planTotal + addonTotal;

  return (
    <div className="container mt-4">
      <h2>🛒 Your Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div>
        {/* Plans */}
        <h3>Plans</h3>
        {planCart.length === 0 ? (
          <p>No plans in cart</p>
        ) : (
          <ul>
            {planCart.map((item) => (
              <li key={item.id}>
                {item.plan?.name || item.name} — ₹{item.plan?.price || item.price}
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removePlan(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Addons */}
        <h3>Addons</h3>
        {addonCart.length === 0 ? (
          <p>No addons in cart</p>
        ) : (
          <ul>
            {addonCart.map((item) => (
              <li key={item.id}>
                {item.addon?.name || item.name} — ₹{item.addon?.price || item.price}
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeAddon(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>Total: ₹{total}</h3>

      {/* ✅ Updated navigation logic */}
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/dashboard?section=payment")}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Cart;
