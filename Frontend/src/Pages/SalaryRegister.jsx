import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/SalaryR.css';
import axios from 'axios';

const SalaryRegister = () => {
  const [formData, setFormData] = useState({
    department: '',
    employee: '',
    basicsalary: '',
    allowance: '',
    deduction: '',
    paydate: '',
  });

  const navigate = useNavigate();

  const [dept, setDept] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch department data (no authentication required)
  const fetchDept = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:7000/viewdepartment');
      setDept(response.data.dept);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch department data');
      setLoading(false);
    }
  };

  // Fetch employee data with authentication (for viewstaff)
  const fetchEmployeesByDept = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:7000/viewstaff', {
        withCredentials: true, // Enable sending cookies (e.g., session cookie) with requests
      });

      setEmployees(response.data.staff); 
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized access, please login.');
        navigate('/login');  // Redirect to the login page if unauthorized
      } else {
        setError('Failed to fetch employee data');
      }
      setLoading(false);
    }
  };

  // Filter employees by department when department changes
  useEffect(() => {
    if (formData.department) {
      const filtered = employees.filter(
        (emp) => emp.department === formData.department
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]); 
    }
  }, [formData.department, employees]);

  // Initial data fetching
  useEffect(() => {
    fetchDept();
    fetchEmployeesByDept();
  }, []);

  // Handle department selection change
  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setFormData({ ...formData, department: selectedDept });
  };

  // Handle input changes for salary form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for salary registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/salaryregister', formData);
      if (response.status === 201 || response.status === 200) {
        setFormData({
          department: '',
          employee: '',
          basicsalary: '',
          allowance: '',
          deduction: '',
          paydate: '',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Salary registration failed!');
    }
  };

  return (
    <div className="Registration">
      <div className="Registration-container">
        <h1>Register Salary</h1>
        <form onSubmit={handleSubmit}>
          <select
            name="department"
            value={formData.department}
            onChange={handleDepartmentChange}
            required
          >
            <option value="">Select Department</option>
            {dept.map((d) => (
              <option key={d._id} value={d.departId}>
                {d.departName}
              </option>
            ))}
          </select>

          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {filteredEmployees.map((emp) => (
              <option key={emp._id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Basic Salary"
            name="basicsalary"
            value={formData.basicsalary}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Allowance"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deduction"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Pay Date"
            name="paydate"
            value={formData.paydate}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default SalaryRegister;
