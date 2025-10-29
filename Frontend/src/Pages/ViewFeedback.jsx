import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../CSS/FeedbackForm.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/viewfeedback'); 
        setFeedbacks(response.data.feedback);  
        setLoading(false);
      } catch (error) {
        setError('Failed to load feedbacks');
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const chartData = (rating) => ({
    labels: ['Rating'],
    datasets: [
      {
        label: 'Rating',
        data: [rating],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="feedback-container">
      <h2>View Submitted Feedback</h2>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading feedback...</p>}

      {feedbacks.length === 0 && !loading && (
        <p>No feedback available.</p>
      )}

      {feedbacks.map((feedback, index) => (
        <div key={index} className="feedback-card">
          <div className="feedback-header">
            <h3>{feedback.category}</h3>
            <span>Rating: {feedback.rating}</span>
          </div>
          <div className="feedback-body">
            <p><strong>Student ID:</strong> {feedback.studentId}</p>
            <p><strong>Comment:</strong> {feedback.comment}</p>
          </div>

          <div className="chart-container">
            <Bar data={chartData(feedback.rating)} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewFeedback;
