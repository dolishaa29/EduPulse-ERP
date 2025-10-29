import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSalary = () => {
  const { salaryId } = useParams();
  const navigate = useNavigate();
  const [salary, setSalary] = useState({

    basicsalary: "",
    allowance: "",
    deduction: "",
    paydate: "",

  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSalaryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/viewbyid/${salaryId}`);
      setSalary({

        basicsalary: response.data.basicsalary,
        allowance: response.data.allowance,
        deduction: response.data.deduction,
        paydate: response.data.paydate ? new Date(response.data.paydate).toISOString().split('T')[0] : '',

      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch salary data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, [salaryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7000/salaryupdate/${salaryId}`,
        salary
      );
      if (response.status === 200) {
        navigate("/ViewSal"); 
      }
    } catch (err) {
      setError("Failed to update salary record");
    }
  };

  return (
    <div>
      <h2>Update Salary</h2>

      {loading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit}>
 
          <div>
            <label>Basic Salary</label>
            <input
              type="number"
              name="basicsalary"
              value={salary.basicsalary}
              onChange={handleInputChange}
              
            />
          </div>
          <div>
            <label>Allowance</label>
            <input
              type="number"
              name="allowance"
              value={salary.allowance}
              onChange={handleInputChange}
              
            />
          </div>
          <div>
            <label>Deduction</label>
            <input
              type="number"
              name="deduction"
              value={salary.deduction}
              onChange={handleInputChange}
              
            />
          </div>
          <div>
            <label>Pay Date</label>
            <input
              type="date"
              name="paydate"
              value={salary.paydate}
              onChange={handleInputChange}
              
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default UpdateSalary;
