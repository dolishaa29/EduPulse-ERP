import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/viewdept.css";

const UpdateStaff = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    image: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/viewbyid/${staffId}`);
      const staffData = response.data.staff;
      alert(staffData['name']);
      setStaff({
        name: response.data.name,
        email: response.data.email ,
        address: response.data.address ,
        contact: response.data.contact ,
        city: response.data.city ,
        image: response.data.image,
        department: staffData.department ,
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch staff data");
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewdepartment");
      setDepartments(response.data.dept);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to fetch department data");
    }
  };

  useEffect(() => {
    fetchStaffData();
    fetchDepartments();
  }, [staffId]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setStaff((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setStaff((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const formDataToSend = new FormData();
      for (let key in staff) {
        formDataToSend.append(key, staff[key]);
      }

      const response = await axios.put(
        `http://localhost:7000/updatestaff/${staffId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Staff updated successfully!");
        navigate("/viewstaff");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update staff");
    }
  };

  return (
    <div className="update-staff-container">
      <h2>Update Staff</h2>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit} className="update-staff-form">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={staff.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={staff.email}
              onChange={handleInputChange}
              required
            />
          </div>

        

          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={staff.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Contact</label>
            <input
              type="number"
              name="contact"
              value={staff.contact}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={staff.city}
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

          <div>
            <label>Department</label>
            <select
              name="department"
              value={staff.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.departId}>
                  {dept.departName}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default UpdateStaff;
