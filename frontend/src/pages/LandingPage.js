import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          FlexiConnect
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your Plan. Your Way. Customize and control your mobile experience.
        </motion.p>

        <motion.button
          className="login-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose FlexiConnect?</h2>
        <div className="features-grid">
          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <img src="https://img.icons8.com/color/96/settings--v1.png" alt="customize" />
            <h3>Fully Customizable</h3>
            <p>Build plans that fit your exact needs — data, calls, SMS, and more.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <img src="https://img.icons8.com/color/96/wallet--v1.png" alt="affordable" />
            <h3>Affordable & Transparent</h3>
            <p>Pay only for what you use. No hidden charges or confusing bundles.</p>
          </motion.div>

          <motion.div className="feature-card" whileHover={{ y: -5 }}>
            <img src="https://img.icons8.com/color/96/speed.png" alt="fast" />
            <h3>Fast & Reliable</h3>
            <p>Seamless experience with instant plan activation and easy management.</p>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      {/* <section className="image-section">
        <img
            src="https://images.unsplash.com/photo-1603791452906-b7f140b290e5?auto=format&fit=crop&w=1200&q=80"
            alt="network"
            className="landing-image"
            />
      </section> */}

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} FlexiConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
