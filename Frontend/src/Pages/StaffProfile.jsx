import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStaffProfile = async () => {
    setLoading(true);


    try {
      const response = await axios.get(`http://localhost:7000/staffprofile`, {

        withCredentials: true,  
      });

      alert("response " + response.data.profile['email']); 
      setStaff(response.data.profile); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch staff profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffProfile(); 
  }, []);

  if (error) return <div>{error}</div>; 

  return (
    <div className="profile-container">
      {staff ? (
        <div className="profile-details">
          <h2>Staff Profile</h2>
          <p><strong>Staff ID:</strong> {staff.id}</p>
          <p><strong>Name:</strong> {staff.name}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Contact:</strong> {staff.contact}</p>
          <p><strong>Department:</strong> {staff.department}</p>
        </div>
      ) : (
        <div>No Staff Found</div>
      )}
    </div>
  );
};

export default StaffProfile;
