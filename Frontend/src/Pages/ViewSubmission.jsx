import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    const token = cookie.get('emtoken');
    if (!token) {
      setError("You need to be logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:7000/viewsubmission', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setSubmissions(response.data.submission); 
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch submissions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleAddRemarkClick = (submissionId) => {
    navigate(`/AssFeed/${submissionId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Submissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((submission) => (
            <div key={submission._id} style={{ marginBottom: '20px' }}>
              <h3>Assignment: {submission.assignId}</h3>
              <p><strong>Student:</strong> {submission.stuName}</p>
              <p><strong>Email:</strong> {submission.stuEmail}</p>
              <p><strong>MongoDB ID:</strong> {submission._id}</p>
              {submission.pdfUrl && (
                <div>
                  <h4>Submitted PDF:</h4>
                  <iframe 
                    src={submission.pdfUrl} 
                    width="100%" 
                    height="500px" 
                    title="PDF Preview"
                  />
                </div>
              )}

              <button onClick={() => handleAddRemarkClick(submission._id)}>Add Remark</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewSubmissions;
