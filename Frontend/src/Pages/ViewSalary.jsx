import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../CSS/viewsal.css';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const fetchSalaryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/salaryview");
      setSalaries(response.data.salary);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch salary data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const deleteSalary = async (mongoId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/salarydelete/${mongoId}`);
      if (response.status === 200) {
        setSalaries(salaries.filter(salary => salary._id !== mongoId));
      }
    } catch (err) {
      setError("Failed to delete salary record");
    }
  };

  const handleUpdateClick = (mongoId) => {
    navigate(`/UpdateSalary/${mongoId}`);
  };

  const handleAddSalaryClick = () => {
    navigate('/SalaryRegister');  
  };

  return (
    <div>
      <h2>View Salaries</h2>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}


      <div className="addusercontainer">
        <button className="adduserbutton" onClick={handleAddSalaryClick}>Add Salary</button>
      </div>

      {!loading && !error && salaries.length > 0 && (
        <div className="salary-table">
          <h3>Salary List</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Mongo Id</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Allowance</th>
                <th>Deduction</th>
                <th>Pay Date</th>
                <th>ID</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary._id}</td>
                  <td>{salary.employee}</td>
                  <td>{salary.department}</td>
                  <td>{salary.basicsalary}</td>
                  <td>{salary.allowance}</td>
                  <td>{salary.deduction}</td>
                  <td>{new Date(salary.paydate).toLocaleDateString()}</td>
                  <td>{salary.id}</td>
                  <td>
                    <button className="deletebutton" onClick={() => deleteSalary(salary._id)}>Delete</button>
                  </td>
                  <td>
                    <button className="updatebutton" onClick={() => handleUpdateClick(salary._id)}>Update</button>
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

export default ViewSalary;
