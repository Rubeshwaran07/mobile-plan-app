// src/components/Orders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/orders/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <p className="loading-text">Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="no-orders">You have no previous orders yet.</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">🧾 Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h4>Order ID: #{order.id}</h4>
            <span className={`status ${order.paymentStatus.toLowerCase()}`}>
              {order.paymentStatus}
            </span>
          </div>
          <p className="order-date">
            📅 {new Date(order.orderDate).toLocaleString()}
          </p>

          <div className="order-section">
            <h5>📱 Plans</h5>
            {order.plans?.length ? (
              <ul>
                {order.plans.map((p) => (
                  <li key={p.id}>
                    {p.name} — ₹{p.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No plans in this order.</p>
            )}
          </div>

          <div className="order-section">
            <h5>🧩 Addons</h5>
            {order.addons?.length ? (
              <ul>
                {order.addons.map((a) => (
                  <li key={a.id}>
                    {a.name} — ₹{a.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addons in this order.</p>
            )}
          </div>

          <div className="order-total">
            <h4>Total Paid: ₹{order.totalAmount}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
