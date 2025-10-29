import React, { useState } from "react";
import axios from "axios";

const Assignment = () => {
  const [assignment, setAssignment] = useState({
    Id: "",
    Title: "",
    IssueDate: "",
    SubmissionDate: "",
    Description: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", assignment.Id);
    formData.append("Title", assignment.Title);
    formData.append("IssueDate", assignment.IssueDate);
    formData.append("SubmissionDate", assignment.SubmissionDate);
    formData.append("Description", assignment.Description);
    formData.append("Assignment", file);

    try {
      const response = await axios.post(
        "http://localhost:7000/create", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );




      
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("Error creating assignment: " + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Assignment Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assignment ID:</label>
          <input
            type="text"
            name="Id"
            value={assignment.Id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="Title"
            value={assignment.Title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Issue Date:</label>
          <input
            type="date"
            name="IssueDate"
            value={assignment.IssueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Submission Date:</label>
          <input
            type="date"
            name="SubmissionDate"
            value={assignment.SubmissionDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Description"
            value={assignment.Description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Upload Assignment (PDF):</label>
          <input type="file" onChange={handleFileChange} accept="application/pdf" required />
        </div>
        <button type="submit">Register Assignment</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Assignment;
