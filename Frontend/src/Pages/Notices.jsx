import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/noticeRegistration.css";

const Notices = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    eventDate: "",
    issueDate: "",
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
      !formData.title ||
      !formData.content ||
      !formData.eventDate ||
      !formData.issueDate
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/addnotice", 
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          title: "",
          content: "",
          eventDate: "",
          issueDate: "",
        });

        navigate("/notices");
      }
    } catch (err) {
      console.error(err);
      setError("Notice registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="NoticeRegistration">
      <div className="NoticeRegistration-container">
        <h1>Notice Registration</h1>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="NoticeRegistration-field">
            <input
              type="text"
              placeholder="Notice Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder="Content of the Notice"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>Add Notice</button>
        </form>

        <p className="view-notices">
          Want to see all notices?
          <span>
            <Link style={{ textDecoration: "none" }} to="/notices">
              View Notices
            </Link>
          </span>
        </p>

      
      </div>
    </div>
  );
};

export default Notices;
