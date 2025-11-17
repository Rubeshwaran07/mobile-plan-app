import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get(`http://localhost:8080/api/profile/${userId}`, config)
      .then((res) => setProfile(res.data))
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to fetch profile")
      );
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{profile.user.name}'s Profile</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Mobile:</strong> {profile.user.mobile}</p>
          <p><strong>Address:</strong> {profile.profile?.address || "Not provided"}</p>
          <p><strong>City:</strong> {profile.profile?.city || "Not provided"}</p>
          <p><strong>State:</strong> {profile.profile?.state || "Not provided"}</p>
          <p><strong>Postal Code:</strong> {profile.profile?.postalCode || "Not provided"}</p>
          <p><strong>Notification Preference:</strong> {profile.profile?.notificationPreference}</p>
          <p><strong>Notifications Enabled:</strong> {profile.profile?.notificationEnabled ? "Yes" : "No"}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
