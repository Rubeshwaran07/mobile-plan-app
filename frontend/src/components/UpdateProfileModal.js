import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UpdateProfileModal.css";

const UpdateProfileModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profile: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      paymentMethod: "",
      notificationPreference: "",
      notificationEnabled: true,
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        profile: {
          address: user.profile?.address || "",
          city: user.profile?.city || "",
          state: user.profile?.state || "",
          postalCode: user.profile?.postalCode || "",
          paymentMethod: user.profile?.paymentMethod || "",
          notificationPreference: user.profile?.notificationPreference || "",
          notificationEnabled: user.profile?.notificationEnabled ?? true,
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.profile) {
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [name]: type === "checkbox" ? checked : value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const payload = { id: user.id, ...formData };

      const res = await axios.put(
        `http://localhost:8080/api/profile/update/${user.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update frontend user
      const updatedUser = res.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Update Profile</h3>
        {error && <div className="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>User Info</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Profile Info</h4>
            <div className="form-row">
              {Object.keys(formData.profile).map((key) =>
                key === "notificationEnabled" ? (
                  <div key={key} className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name={key}
                        checked={formData.profile[key]}
                        onChange={handleChange}
                      />{" "}
                      Notifications Enabled
                    </label>
                  </div>
                ) : (
                  <div key={key} className="form-group">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <input
                      type="text"
                      name={key}
                      value={formData.profile[key]}
                      onChange={handleChange}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
