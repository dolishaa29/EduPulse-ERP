import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AssignmentFeedback = () => {
  const { submissionId } = useParams();  
  console.log(submissionId);

  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submissionDetails, setSubmissionDetails] = useState(null); 

  const fetchSubmissionDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/findSubmissionById/${submissionId}`);
      setSubmissionDetails(response.data.submission); 
    } catch (err) {
      setError("Failed to fetch submission details.");
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!marks || !feedback) {
      setError('Please fill in both marks and feedback.');
      return;
    }

    const feedbackData = {
      stuId: submissionDetails.stuId,
      stuName: submissionDetails.stuName,
      stuEmail: submissionDetails.stuEmail,
      assignId: submissionDetails.assignId,
      marks: marks,
      feedback: feedback,
    };

    try {
      const response = await axios.post('http://localhost:7000/assfeedback', feedbackData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (response.data.success) {
        setSuccessMessage('Feedback submitted successfully!');
        setError('');
        setMarks('');
        setFeedback('');
      }
    } catch (err) {
      setError('Error submitting feedback.');
    }
  };

  useEffect(() => {
    fetchSubmissionDetails();  
  }, [submissionId]);

  return (
    <div>
      <h2>Assignment Feedback</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {submissionDetails && (
        <div>
          <h3>Student Details</h3>
          <p><strong>Student Id:</strong> {submissionDetails.stuId}</p>
          <p><strong>Student Name:</strong> {submissionDetails.stuName}</p>
          <p><strong>Student Email:</strong> {submissionDetails.stuEmail}</p>
          <p><strong>Assignment ID:</strong> {submissionDetails.assignId}</p>
        </div>
      )}

      <form onSubmit={handleSubmitFeedback}>
        <div>
          <label>Marks:</label><br />
          <input
            type="text"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter marks"
            style={{ width: '200px', marginBottom: '10px' }}
          /><br />

          <label>Feedback:</label><br />
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter feedback"
            rows="4"
            cols="50"
          /><br />

          <button type="submit">Submit Feedback</button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentFeedback;
