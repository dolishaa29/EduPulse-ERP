import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/transportRegistration.css";

const TransportRegistration = () => {
    // Note: If you require image upload (Multer), you must adjust this component 
    // to use FormData as shown in previous responses. This code uses JSON (axios.post).
    
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

    // Note: handleSubmit is simplified here as it assumes JSON data (not files)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Basic validation check (Keep your validation logic strong)
        const requiredFields = [
            'conditionName', 'routeName', 'routeDetails', 'driverName', 'driverContact',
            'licenseNumber', 'busType', 'busCapacity', 'busNumber'
        ];
        const missing = requiredFields.some(field => !formData[field]);

        if (missing) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:7000/transportcreate", 
                formData, 
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                // Reset form data upon success
                setFormData(/* ... reset data ... */); 
                navigate("/transportview");
            }
        } catch (err) {
            console.error(err);
            setError("Transport registration failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // --- JSX Structure Updated for Styling ---
    return (
        <div className="registration-page-wrapper" /* Outer wrapper for gradient background */>
            <div className="registration-card-container">
                <h1 className="card-title-header">Transport Registration</h1>
                
                {loading && <p className="status-message loading">Loading...</p>}
                {error && <p className="status-message error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid-layout">
                        
                        {/* Row 1: Condition Name (Bus Status) & Bus Number */}
                        <div className="form-group">
                            <label htmlFor="conditionName">Condition Name (e.g., Good)</label>
                            <input type="text" id="conditionName" name="conditionName" value={formData.conditionName} onChange={handleChange} required placeholder="Enter bus condition" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="busNumber">Bus Number</label>
                            <input type="text" id="busNumber" name="busNumber" value={formData.busNumber} onChange={handleChange} required placeholder="Enter registration number" />
                        </div>
                        
                        {/* Row 2: Bus Type & Bus Capacity */}
                        <div className="form-group">
                            <label htmlFor="busType">Bus Type</label>
                            <input type="text" id="busType" name="busType" value={formData.busType} onChange={handleChange} required placeholder="e.g., Mini, Coach" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="busCapacity">Bus Capacity</label>
                            <input type="number" id="busCapacity" name="busCapacity" value={formData.busCapacity} onChange={handleChange} required placeholder="Enter seat count" />
                        </div>
                        
                        {/* Row 3: Route Name & Route Details */}
                        <div className="form-group">
                            <label htmlFor="routeName">Route Name</label>
                            <input type="text" id="routeName" name="routeName" value={formData.routeName} onChange={handleChange} required placeholder="Enter route name/ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="routeDetails">Route Details (Key Stops)</label>
                            <input type="text" id="routeDetails" name="routeDetails" value={formData.routeDetails} onChange={handleChange} required placeholder="Enter key route stops" />
                        </div>

                        {/* Row 4: Driver Name & Driver Contact */}
                        <div className="form-group">
                            <label htmlFor="driverName">Driver Name</label>
                            <input type="text" id="driverName" name="driverName" value={formData.driverName} onChange={handleChange} required placeholder="Enter driver's full name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driverContact">Driver Contact</label>
                            <input type="text" id="driverContact" name="driverContact" value={formData.driverContact} onChange={handleChange} required placeholder="Enter phone number" />
                        </div>

                        {/* Row 5: License Number (Single full width) */}
                        <div className="form-group full-width">
                            <label htmlFor="licenseNumber">License Number</label>
                            <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required placeholder="Enter driver's license number" />
                        </div>
                        
                        {/* Status Radio Buttons (Mimicking Gender in screenshot) */}
                        <div className="radio-group-container full-width">
                            <p className="radio-label-title">Operational Status</p>
                            <div className="radio-group-options">
                                <label className="radio-option">
                                    <input type="radio" name="status" value="active" checked={formData.status === "active"} onChange={handleChange} />
                                    Active
                                </label>
                                <label className="radio-option">
                                    <input type="radio" name="status" value="inactive" checked={formData.status === "inactive"} onChange={handleChange} />
                                    Inactive
                                </label>
                            </div>
                        </div>

                    </div> {/* End form-grid-layout */}

                    <button type="submit" disabled={loading} className="register-button gradient-button">
                        {loading ? 'Registering...' : 'Register Transport'}
                    </button>
                </form>

                <p className="view-link-footer">
                    Want to see all registered transport?
                    <Link to="/transportview">View Transport</Link>
                </p>
                
                <div className="agree-checkbox-footer">
                    <input type="checkbox" id="agreeTerms" required />
                    <label htmlFor="agreeTerms">By continuing, I agree to the terms of use and privacy policy</label>
                </div>
            </div>
        </div>
    );
};

export default TransportRegistration;