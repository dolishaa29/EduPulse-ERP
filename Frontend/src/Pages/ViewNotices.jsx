import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/nooticeui.css";

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:7000/viewnotice");
        setNotices(response.data.notices);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notices.");
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) {
    return <p className="loading">Loading notices...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="notice-list-container">
      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div className="notice-card" key={notice._id}>
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            <p><strong>Event Date:</strong> {new Date(notice.eventDate).toLocaleDateString()}</p>
            <p><strong>Issue Date:</strong> {new Date(notice.issueDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewNotices;
