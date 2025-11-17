import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation added
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UpdateProfileModal from "../components/UpdateProfileModal";
import PlansDisplay from "../components/PlansDisplay";
import PlanCustomization from "../components/PlanCustomization";
import AddonsDisplay from "../components/AddonsDisplay";
import ComparePlans from "../components/ComparePlans";
import RecommendedPlans from "../components/RecommendedPlans";
import Cart from "../components/Cart";
import Payment from "../components/Payment";
import Orders from "../components/Orders"; // ✅ new import
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ added

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  // ✅ Automatically set section based on URL param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) setActiveSection(section);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
          `http://localhost:8080/api/profile/${userId}`,
          config
        );
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loadingProfile) return <div className="loading">Loading profile...</div>;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="page-title">Welcome back, {user?.name} </h2>
            <p className="page-subtitle">
              Here’s a quick recommendations of your mobile plan.
            </p>
            <RecommendedPlans />
          </motion.div>
        );
      case "plans":
        return <PlansDisplay />;
      case "addons":
        return <AddonsDisplay />;
      case "cart":
        return <Cart userId={user?.id || 101} />;
      case "PlanCustomization":
        return <PlanCustomization />;
      case "compare":
        return <ComparePlans />;
      case "payment":
        return <Payment userId={user?.id || 101} />; // ✅ works now
      
      case "orders":
          return <Orders userId={user?.id || 101} />;
      default:
        return <h2>Welcome to your Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onUpdateProfile={() => setIsModalOpen(true)}
      />

      <div className="dashboard-body">
        <Sidebar onSelect={setActiveSection} />
        <main className="dashboard-content">{renderSection()}</main>
      </div>

      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(u) => {
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
