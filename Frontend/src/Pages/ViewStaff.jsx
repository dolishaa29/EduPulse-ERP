import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/viewstaff.css';

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/viewstaff", {
        withCredentials: true,
      });
      setStaff(response.data.staff);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login');  
      } else {
        setError("Failed to fetch staff data");
      }
      setLoading(false);
    }
  };

  const deleteStaff = async (mongoId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/deletestaff/${mongoId}`, {
        withCredentials: true,  
      });

      if (response.status === 200) {
        setStaff(staff.filter((staffMember) => staffMember._id !== mongoId));  
      } 
      else if (response.status === 401) {
        setError("Unauthorized access. Please log in again.");
        navigate('/login');  
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access, please login.");
        navigate('/login');  
      } else {
        setError("Failed to delete staff. Please try again later.");
      }
    }
  };

  const handleUpdateClick = (mongoId) => {
    navigate(`/UpdateStaff/${mongoId}`);
  };

  const handleAddUserClick = () => {
    navigate('/registration');
  };

  const Assignment = (mongoId) => {
    navigate(`/ViewAssignment/${mongoId}`);
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <div>
      <h2>View Staff</h2>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="addusercontainer">
        <button className="adduserbutton" onClick={handleAddUserClick}>Add User</button>
      </div>

      {!loading && !error && staff.length > 0 && (
        <div className="stafftable">
          <h3>Staff List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Mongo Id</th>
                <th>Staff ID</th>
                <th>Staff Name</th>
                <th>Staff Email</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Profile</th>
                <th>Attendance</th>
                <th>Assignments</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staffMember) => (
                <tr key={staffMember._id}>
                  <td>{staffMember._id}</td>
                  <td>{staffMember.id}</td>
                  <td>{staffMember.name}</td>
                  <td>{staffMember.email}</td>
                  <td>
                    <button className="deletebutton" onClick={() => deleteStaff(staffMember._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="updatebutton" onClick={() => handleUpdateClick(staffMember._id)}>Update</button>
                  </td>
                  <td>
                    <button className="profilebutton" onClick={() => navigate(`/StaffProfile`)}>Profile</button>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/StaffAttendance/${staffMember.id}`)}>View Attendance</button>
                  </td>
                  <td>
                    <button onClick={() => Assignment(staffMember._id)}>View Assignments</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewStaff;
