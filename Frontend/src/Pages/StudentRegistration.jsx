import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/registration.css";
import axios from "axios";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob:"",
    address: "",
    contact: "",
    city: "",
    image: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/studentregister",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setFormData({name: "",
          email: "",
          password: "",
          dob:"",
          address: "",
          contact: "",
          city: "",
          image: "",
          department: "",
        });

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="Registration">
      <div className="Registration-container">
        <h1>Registration Page</h1>

        {loading && <p>Loading departments...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="Registrationfield">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Your Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="dob"
              placeholder="Your DOB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Your Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            
            <input
              type="number"
              placeholder="Your Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Your City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <p className="login">
          Already Have an Account?
          <span>
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </span>
        </p>

        <div className="agree">
          <input type="checkbox" />
          <p>By Continuing, I agree to the terms of use privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
