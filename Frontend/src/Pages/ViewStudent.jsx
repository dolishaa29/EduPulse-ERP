import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/viewstudent.css';

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/viewstudent", {
        withCredentials: true,  // Ensure authentication credentials are included in the request
      });
      setStudents(response.data.student || response.data); // Set student data to state
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login'); // Redirect to login page if not authenticated
      } else {
        setError("Failed to fetch student data");
      }
      setLoading(false);
    }
  };

  const deleteStudent = async (mongoId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/deletestudent/${mongoId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setStudents(students.filter((student) => student._id !== mongoId));
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login'); 
      } else {
        setError("Failed to delete student");
      }
    }
  };

  const handleUpdateClick = (mongoId) => {
    navigate(`/UpdateStudent/${mongoId}`);
  };

  const handleAddStudentClick = () => {
    navigate('/StudentRegistration');
  };

  const viewProfile = (mongoId) => {
    navigate(`/ProfileStudent/${mongoId}`);
  };

  const viewAttendance = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:7000/StudentAttendance/${studentId}`, {
        withCredentials: true, 
      });
      navigate(`/StudentAttendance/${studentId}`);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login');  
      } else {
        setError("Failed to fetch attendance data");
      }
    }
  };

  const viewAssignments = async (mongoId) => {
    try {
      const response = await axios.get(`http://localhost:7000/StudentAssignments/${mongoId}`, {
        withCredentials: true, 
      });
      navigate(`/StudentAssignments/${mongoId}`);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login'); 
      } else {
        setError("Failed to fetch assignments data");
      }
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div>
      <h2>View Students</h2>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="addstudentcontainer">
        <button className="addstudentbutton" onClick={handleAddStudentClick}>Add Student</button>
      </div>

      {!loading && !error && students.length > 0 && (
        <div className="studenttable">
          <h3>Student List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Mongo Id</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Profile</th>
                <th>Attendance</th>
                <th>Assignments</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button className="deletebutton" onClick={() => deleteStudent(student._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="updatebutton" onClick={() => handleUpdateClick(student._id)}>Update</button>
                  </td>
                  <td>
                    <button className="profilebutton" onClick={() => viewProfile(student._id)}>Profile</button>
                  </td>
                  <td>
                    <button onClick={() => viewAttendance(student.id)}>View Attendance</button>
                  </td>
                  <td>
                    <button onClick={() => viewAssignments(student._id)}>View Assignments</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {students.length === 0 && !loading && !error && (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ViewStudent;
