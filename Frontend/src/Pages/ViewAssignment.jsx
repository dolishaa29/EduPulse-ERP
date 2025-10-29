import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.get("http://localhost:7000/view");
      setAssignments(response.data.assignment);
    } catch (error) {
      setError("Error fetching assignments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleButtonClick = (assignmentId) => {
    navigate(`/AssignmentSubmission/${assignmentId}`);
  };

  return (
    <div className="ViewAssignment">
      <h1>View Assignments</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Loading assignments...</p>
      ) : (
        <div>
          {assignments.length === 0 ? (
            <p>No assignments found!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Issue Date</th>
                  <th>Submission Date</th>
                  <th>Description</th>
                  <th>Assignment PDF</th>
                  <th>Action</th> 
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.Title}</td>
                    <td>{new Date(assignment.IssueDate).toLocaleDateString()}</td>
                    <td>{new Date(assignment.SubmissionDate).toLocaleDateString()}</td>
                    <td>{assignment.Description}</td>
                    <td>
                      <a
                        href={`http://localhost:7000/uploads/${assignment.Assignment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    </td>
                    <td>
              
                      <button onClick={() => handleButtonClick(assignment._id)}>
                        submission
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAssignment;
