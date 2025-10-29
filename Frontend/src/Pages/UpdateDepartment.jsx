import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const UpdateDepartment = () => {
  const { departId } = useParams(); 
  const navigate = useNavigate(); 
  const [department, setDepartment] = useState({
    departDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDepartmentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/Dviewbyid/${departId}`);
      alert(response.data.department)
      setDepartment({

        departDescription: response.data.departDescription,
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch department data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, [departId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({...prev,[name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7000/updatedepartment/${departId}`,
        department
      );
      if (response.status === 200) {
        navigate("/ViewDepartment"); 
      }
    } catch (err) {
      setError("Failed to update department");
    }
  };

  return (
    <div>
      <h2>Update Department</h2>

      {loading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Department Description</label>
            <input
              type="text"
              name="departDescription"
              value={department.departDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default UpdateDepartment;
