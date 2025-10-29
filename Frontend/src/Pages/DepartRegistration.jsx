import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/registration.css';
import axios from 'axios';
const DeptRegistration = () => {
const [formData, setFormData] = useState({
    departId: '',
    departName: '',
    departDescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/adddepartment', formData);
      if (response.status === 201) {
        setFormData({
          departId: '',
          departName: '',
          departDescription: '',
        });
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.error(err);
      alert('Department registration failed!');
    }
  };

  return (
    <div className="Registration">
      <div className="Registration-container">
        <h1>Add Department</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Department ID"
            name="departId"
            value={formData.departId}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Department Name"
            name="departName"
            value={formData.departName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Department Description"
            name="departDescription"
            value={formData.departDescription}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DeptRegistration;
