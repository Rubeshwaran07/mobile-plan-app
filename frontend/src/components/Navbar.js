import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Edit2 } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = ({ user: propUser, onLogout, onUpdateProfile }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(propUser || null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Load user from localStorage if not provided
    if (!propUser) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title"> FlexiConnect</h2>
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <div
          className="profile-trigger"
          onClick={() => setOpen((prev) => !prev)}
        >
          <User size={24} />
          <span className="profile-name">{user?.name || "User"}</span>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="profile-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="dropdown-header">
                <p><strong>{user?.name}</strong></p>
                <p>{user?.email}</p>
                <p>{user?.mobile}</p>
              </div>
              <hr className="dropdown-divider" />
              <button
                className="update-btn"
                onClick={() => {
                  setOpen(false);
                  onUpdateProfile(user);
                }}
              >
                <Edit2 size={16} /> Update Profile
              </button>
              <button className="logout-btn" onClick={onLogout}>
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
