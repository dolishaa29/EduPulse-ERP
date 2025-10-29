import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from 'js-cookie'; 
//import '../CSS/profiles.css'

const StaffProfile = () => {
  const [staffMember, setStaffMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStaffProfile = async () => {
    setLoading(true);
    const token = cookie.get('emtoken'); 

    if (!token) {
      setError("You need to be logged in to view the profile.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:7000/staffprofile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },withCredentials: true,
        }
      );
      setStaffMember(response.data.staff || response.data.profile); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch staff profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffProfile();
  },[]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      {staffMember ? (
        <div className="profile-details">
          <h2>Staff Profile</h2>
          <img src={`http://localhost:7000/images/${staffMember.image}`} alt="Profile" />
          <p><strong>Staff ID:</strong> {staffMember.id}</p>
          <p><strong>Name:</strong> {staffMember.name}</p>
          <p><strong>Email:</strong> {staffMember.email}</p>
          <p><strong>Contact:</strong> {staffMember.contact}</p>
          <p><strong>Address:</strong> {staffMember.address}</p>
          <p><strong>City:</strong> {staffMember.city}</p>
        </div>
      ) : (
        <div>No Staff Found</div>
      )}
    </div>
  );
};

export default StaffProfile;
