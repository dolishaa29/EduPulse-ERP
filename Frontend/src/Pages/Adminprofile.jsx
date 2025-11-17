import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchProfile = async () => {
    const token = cookie.get('emtoken');
    if (!token) {
      setError('You need to log in to view your profile.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/adminprofile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success) {
        setProfile(response.data.profile);
      } else {
        setError('Failed to fetch profile. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError('An error occurred while fetching your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact:</strong> {profile.contact}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>Organization:</strong> {profile.organization}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
