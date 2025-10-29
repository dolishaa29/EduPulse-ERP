import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/FeedbackForm.css'; 

const Feedback = () => {
  const [rating, setRating] = useState(5); 
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!studentId || !category || !comment) {
      setError('Please fill out all fields.');
      return;
    }

    const feedbackData = {
      rating,
      comment,
      category,
      studentId,
    };

    try {
      const response = await axios.post('http://localhost:7000/addfeedback', feedbackData);

      if (response.data.success) {
        setSuccessMessage('Thank you for your feedback!');
        setError('');
        setRating(5); 
        setComment('');  
        setCategory(''); 
        setStudentId(''); 
      }
    } catch (error) {
      setError('There was an error submitting your feedback.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating (1 to 10):</label>
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rating-slider"
          />
          <span>{rating}</span>
        </div>

        <div className="form-group">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Provide your feedback here"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Teaching Quality">Teaching Quality</option>
            <option value="Facilities">Facilities</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Online Experience">Online Experience</option>
          </select>
        </div>

        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your student ID"
          />
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
