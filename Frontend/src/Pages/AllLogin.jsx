import React from 'react';
import image1 from '../assets/student.webp';
import image2 from '../assets/teacher.png';
import image3 from '../assets/admin.png';
import backgroundImage from '../assets/pic9.jpeg';  
import '../CSS/AllLogin.css';
import { useNavigate } from 'react-router-dom';
const AllLogin = () => {
  const navigate=useNavigate();
  const handleAdmin=()=>
  {
    navigate('/AdminLogin');
  }
  const handleStaff=()=>
  {
     navigate('/StaffLogin');
  }
  const handleStudent=()=>
  {
    navigate('/StudentLogin');
  }

  return (
    <div className="image-container">
        <p className="top-text">Login</p>
      <div className="image-item">
        <button className="image-button" onClick={() => handleAdmin('Image 1')}>
          <img src={image1} alt="Image 1" className="image" />
        </button>
        <p className="image-text bottom-text">Admin</p>
      </div>
      <div className="image-item">
        <button className="image-button" onClick={() => handleStaff('Image 2')}>
          <img src={image2} alt="Image 2" className="image" />
        </button>
        <p className="image-text bottom-text">Staff</p>
      </div>
      <div className="image-item">
        <button className="image-button" onClick={() => handleStudent('Image 3')}>
          <img src={image3} alt="Image 3" className="image" />
        </button>
        <p className="image-text bottom-text">Student</p>
      </div>
    </div>
  );
};

export default AllLogin;
