import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ViewAssFeed = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const fetchFeedback = async () => {
      try {
        const token = Cookies.get("emtoken");
         alert(token)
        if (!token) {
          setError("You are not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:7000/viewassfeedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setFeedback(response.data.feedback);
        setLoading(false);
      } catch (err) {
        setError("Error fetching feedback.");
        setLoading(false);
      }
    };

  useEffect(() => {
    
    fetchFeedback();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Assignment Feedback</h2>
      {feedback.length === 0 ? (
        <p>No feedback available for your submission.</p>
      ) : (
        <ul>
          {feedback.map((fb) => (
            <li key={fb._id}>
              <div><strong>Assignment ID:</strong> {fb.assignId}</div>
              <div><strong>Student Name:</strong> {fb.stuName}</div>
              <div><strong>Student Email:</strong> {fb.stuEmail}</div>
              <div><strong>Feedback:</strong> {fb.feedback}</div>
              <div><strong>Marks:</strong> {fb.marks}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAssFeed;
