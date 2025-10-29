import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/transportView.css";

const TransportDetail = () => {
  const [transports, setTransports] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState("");        
  const fetchTransports = async () => {
    try {
      const response = await axios.get("http://localhost:7000/transportview");
      setTransports(response.data.transport);  
      setLoading(false); 
    } catch (err) {
      setError("Failed to fetch transport data.");
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  if (loading) {
    return <p className="loading">Loading transports...</p>;
  }

  if (error) {
    return <p className="error" style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="transport-container">
      {transports.length === 0 ? (
        <p className="no-transports">No transports registered yet.</p>
      ) : (
        transports.map((transport) => (
          <div className="transport-card" key={transport._id}>
            <h2>{transport.busNumber}</h2>
            <div className="transport-details">
              <div className="detail-item">
                <label>Condition:</label> {transport.conditionName}
              </div>
              <div className="detail-item">
                <label>Status:</label>{" "}
                <span className={`status ${transport.status}`}>
                  {transport.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="detail-item">
                <label>Route Name:</label> {transport.routeName}
              </div>
              <div className="detail-item">
                <label>Route Details:</label> {transport.routeDetails}
              </div>
              <div className="detail-item">
                <label>Driver Name:</label> {transport.driverName}
              </div>
              <div className="detail-item">
                <label>Driver Contact:</label> {transport.driverContact}
              </div>
              <div className="detail-item">
                <label>License Number:</label> {transport.licenseNumber}
              </div>
              <div className="detail-item">
                <label>Bus Type:</label> {transport.busType}
              </div>
              <div className="detail-item">
                <label>Bus Capacity:</label> {transport.busCapacity}
              </div>
            </div>
 
          </div>
        ))
      )}
    </div>
  );
};

export default TransportDetail;
