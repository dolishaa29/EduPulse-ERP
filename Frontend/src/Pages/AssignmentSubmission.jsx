import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import cookie from 'js-cookie'; 

const AssignmentSubmission = () => {
  const { assignmentId } = useParams();  
  const [staffMember, setStaffMember] = useState();
  const [namee,setNamee]=useState();
  const [email,setEmail]=useState();
  const [id,setId]=useState();
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserDetails = async () => {
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
      let email=response.data.profile["email"];
      alert(email);
      let id=response.data.profile["id"];
      alert(id);
      let  namee=response.data.profile["name"];
      alert(namee);
      setEmail(email);
      setId(id);
      setNamee(namee);
      setStaffMember( response.data.profile); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch staff profile");
      setLoading(false);
    }
 
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);



  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setError('Please fill in all fields and upload a PDF.');
      return;
    }
    
    const formData = new FormData();
    formData.append('stuId', id);
    formData.append('stuName', namee);
    formData.append('stuEmail', email);
    formData.append('assignId', assignmentId);  
    formData.append('submissionFile', pdfFile);

    try {
      const response = await axios.post('http://localhost:7000/submission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccessMessage('Assignment submitted successfully!');
        setError('');
        setPdfFile(null);  
      }
    } catch (err) {
      setError('Error submitting assignment.');
    }
  };

  return (
    <div>
      <h2>Submit Your Assignment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload PDF:</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
