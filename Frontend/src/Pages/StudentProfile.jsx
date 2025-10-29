import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from 'js-cookie'; 

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudentProfile = async () => {
    setLoading(true);
    const token = cookie.get('emtoken'); 
    alert(token)
    if (!token) {
      setError("You need to be logged in to view the profile.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7000/studentprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("response"+response)
      setStudent(response.data.profile); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch student profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      {student ? (
        <div className="profile-details">
          <h2>Student Profile</h2>
          <img src={`http://localhost:7000/images/${student.image}`} alt="Profile" />
          <p><strong>Student ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Contact:</strong> {student.contact}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>City:</strong> {student.city}</p>
        </div>
      ) : (
        <div>No Student Found</div>
      )}
    </div>
  );
};

export default StudentProfile;
