import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/transportRegistration.css";

const TransportRegistration = () => {
  const [formData, setFormData] = useState({
    conditionName: "",
    status: "active", 
    routeName: "",
    routeDetails: "",
    driverName: "",
    driverContact: "",
    licenseNumber: "",
    busType: "",
    busCapacity: "",
    busNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !formData.conditionName ||
      !formData.routeName ||
      !formData.routeDetails ||
      !formData.driverName ||
      !formData.driverContact ||
      !formData.licenseNumber ||
      !formData.busType ||
      !formData.busCapacity ||
      !formData.busNumber
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/transportcreate", 
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          conditionName: "",
          status: "active",
          routeName: "",
          routeDetails: "",
          driverName: "",
          driverContact: "",
          licenseNumber: "",
          busType: "",
          busCapacity: "",
          busNumber: "",
        });

        navigate("/transportview");
      }
    } catch (err) {
      console.error(err);
      setError("Transport registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TransportRegistration">
      <div className="TransportRegistration-container">
        <h1>Transport Registration</h1>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="TransportRegistration-field">
            <input
              type="text"
              placeholder="Condition Name (e.g., Good)"
              name="conditionName"
              value={formData.conditionName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Route Name"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Route Details"
              name="routeDetails"
              value={formData.routeDetails}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Driver Name"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Driver Contact"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Bus Type (e.g., Mini, Coach)"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              placeholder="Bus Capacity"
              name="busCapacity"
              value={formData.busCapacity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Bus Number"
              name="busNumber"
              value={formData.busNumber}
              onChange={handleChange}
              required
            />

            <div className="TransportRegistration-status">
              <label>Status: </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading}>Register Transport</button>
        </form>

        <p className="login">
          Want to see all registered transport?
          <span>
            <Link style={{ textDecoration: "none" }} to="/transportview">
              View Transport
            </Link>
          </span>
        </p>

        <div className="agree">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default TransportRegistration;
