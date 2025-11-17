import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  List,
  Package,
  Scale,
  ShoppingCart, // ✅ new icon
} from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      animate={{ width: collapsed ? "80px" : "230px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        ☰
      </div>
      <ul>
        <li onClick={() => onSelect("dashboard")}>
          <LayoutDashboard /> {!collapsed && "Dashboard"}
        </li>
        <li onClick={() => onSelect("plans")}>
          <List /> {!collapsed && "Plans"}
        </li>
        <li onClick={() => onSelect("addons")}>
          <Package /> {!collapsed && "Add-ons"}
        </li>
        <li onClick={() => onSelect("cart")}>
          <ShoppingCart /> {!collapsed && "Cart"} {/* ✅ New Cart Option */}
        </li>
        <li onClick={() => onSelect("PlanCustomization")}>
          <CreditCard /> {!collapsed && "Plan Customization"}
        </li>
        <li onClick={() => onSelect("compare")}>
          <Scale /> {!collapsed && "Compare Plans"}
        </li>
        <li onClick={() => onSelect("orders")}>
          <Bell /> {!collapsed && "Orders"}
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
