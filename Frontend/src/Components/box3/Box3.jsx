import React, { useState } from 'react';
import '../box/Box.css';
import axios from 'axios';

const Box3 = ({ _id, question, option1, option2, option3, option4 }) => {
  const [selectedOptions, setSelectedOptions] = useState(''); 
  const [responseMessage, setResponseMessage] = useState(''); 

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => 
      checked
        ? [...prevSelectedOptions, value] 
        : prevSelectedOptions.filter(option => option !== value)
    );
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one option!");
      return;
    }

    try {
      const formData = { answer: selectedOptions };
      const response = await axios.post(`http://localhost:7000/checkquestion/${_id}`, formData);

      setResponseMessage(response.data.msg); 
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); 
      } else {
        alert("Error submitting the form");
      }
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div className="landscape-container">
      <div className="landscape-item">
        <span className="label">QuestionID:</span>
        <span>{_id}</span>
      </div>

      <div className="landscape-item">
        <span className="label">Question:</span>
        <span>{question}</span>
      </div>

      <div className="landscape-item">
        <span className="label">Select  Options:</span>
        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              value="option1" 
              checked={selectedOptions.includes('option1')} 
              onChange={handleCheckboxChange} 
            />
            {option1}
          </label>
          <label>
            <input 
              type="checkbox" 
              value="option2" 
              checked={selectedOptions.includes('option2')} 
              onChange={handleCheckboxChange} 
            />
            {option2}
          </label>
          <label>
            <input 
              type="checkbox" 
              value="option3" 
              checked={selectedOptions.includes('option3')} 
              onChange={handleCheckboxChange} 
            />
            {option3}
          </label>
          <label>
            <input 
              type="checkbox" 
              value="option4" 
              checked={selectedOptions.includes('option4')} 
              onChange={handleCheckboxChange} 
            />
            {option4}
          </label>
        </div>
      </div>

      <div className="landscape-item">
        <button type="button" className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      
        <div >
          <p>{responseMessage}</p> 
        </div>
      
    </div>
  );
};

export default Box3;
