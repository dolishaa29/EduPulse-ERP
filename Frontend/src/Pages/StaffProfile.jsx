import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from 'js-cookie'; 
import '../CSS/staffprofile.css' // Ensure this path is correct!

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
                    }, withCredentials: true,
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
    }, []); 

    if (loading) return <div className="profile-page-container loading-state">Loading...</div>;
    if (error) return <div className="profile-page-container error-state">{error}</div>;

    return (
        <div className="profile-page-container">
            {staffMember ? (
                <div className="profile-card">
                    {/* Top Section: Avatar and Name (uses CSS classes: profile-header, avatar-circle) */}
                    <div className="profile-header">
                        <div className="avatar-circle">
                            {/* Staff image is rendered here */}
                            <img 
                                src={`http://localhost:7000/images/${staffMember.image}`} 
                                alt="Profile Avatar" 
                            />
                        </div>
                        {/* Name and Email */}
                        <h2 className="staff-name">{staffMember.name}</h2>
                        <p className="staff-email">{staffMember.email}</p>
                    </div>

                    {/* Details Grid Section (uses CSS class: profile-details-grid) */}
                    <div className="profile-details-grid">
                        
                        {/* Detail Item: Staff ID */}
                        <div className="detail-item">
                            <span className="label">Staff ID:</span>
                            <span className="value">{staffMember.id}</span>
                        </div>
                        
                        {/* Detail Item: Contact */}
                        <div className="detail-item">
                            <span className="label">Contact:</span>
                            <span className="value">{staffMember.contact}</span>
                        </div>
                        
                        {/* Detail Item: City */}
                        <div className="detail-item">
                            <span className="label">City:</span>
                            <span className="value">{staffMember.city}</span>
                        </div>

                        {/* Detail Item: Address (Uses full-row class for multi-line layout) */}
                        <div className="detail-item full-row">
                            <span className="label">Address:</span>
                            <span className="value">{staffMember.address}</span>
                        </div>
                        
                        {/* You can add other details here using the same structure */}
                        
                    </div>
                </div>
            ) : (
                <div className="profile-card no-staff">No Staff Found</div>
            )}
        </div>
    );
};

export default StaffProfile;