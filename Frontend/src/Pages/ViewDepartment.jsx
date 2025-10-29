import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/viewdept.css';

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const fetchDepartmentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/viewdepartment"); 
      setDepartments(response.data.dept); 
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch department data");
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const deleteDepartment = async (mongoId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/deletedepartment/${mongoId}`);

      if (response.status === 200) {
        setDepartments(departments.filter(department => department._id !== mongoId));
      }
    } catch (err) {
      setError("Failed to delete department");
    }
  };

  const handleUpdateClick = (mongoId) => {
    navigate(`/UpdateDepartment/${mongoId}`); 
  };

  return (
    <div>
      <h2>View Departments</h2>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

   
      <div className="addusercontainer">
        <button className="adduserbutton" onClick={() => navigate('/DeptRegistration')}>Add Department</button>
      </div>

      {!loading && !error && departments.length > 0 && (
        <div className="department-table">
          <h3>Department List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Mongo Id</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id}>
                  <td>{department._id}</td>
                  <td>{department.departId}</td>
                  <td>{department.departName}</td>
                  <td>{department.departDescription}</td>
                  <td>
                    <button className="deletebutton" onClick={() => deleteDepartment(department._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="updatebutton" onClick={() => handleUpdateClick(department._id)}>Update</button>
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

export default ViewDepartment;
