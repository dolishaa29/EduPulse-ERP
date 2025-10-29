import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/viewdept.css";

const UpdateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    image: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/Sviewbyid/${studentId}`);
      const studentData = response.data.student;
      alert(studentData['name']);
      setStudent({
        name: studentData.data.name,
        email: studentData.data.email,
        address: studentData.data.address,
        contact: studentData.data.contact,
        city: studentData.data.city,
        image: studentData.data.image,
        dob: studentData.data.dob,
      });
      
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch student data"+err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setStudent((prev) => ({ ...prev, image: files[0] }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in student) {
        formDataToSend.append(key, student[key]);
      }

      const response = await axios.put(
        `http://localhost:7000/updatestudent/${studentId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response---",  studentId, response);
      
      if (response.status === 200) {
        alert("Student updated successfully!");
        navigate("/viewstudents");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update student");
    }
  };


  return (
    <div className="update-student-container">
      <h2>Update Student</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && (
        <form onSubmit={handleSubmit} className="update-student-form">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Contact</label>
            <input
              type="number"
              name="contact"
              value={student.contact}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={student.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};


export default UpdateStudent;
