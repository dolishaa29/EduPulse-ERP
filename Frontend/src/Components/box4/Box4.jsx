import React, { useState,useEffect } from 'react';  
import axios from 'axios';
import '../box4/Box4.css';


const Box4 = ({ id, name }) => {


  

  

  

  return (

<div className="landscape-container">
    
      <div className="landscape-item">
        <span className="label">Student Name:</span>
        <span>{name}</span>
      </div>
     
      <div className="landscape-item">
        <span className="label">Attendance:</span>
        <div className="radio-buttons">
          <label>
            <input 
              type="radio" 
              value="Half"
               
               checked={selectedOption === 'Half'}
              onChange={handleRadioChange} 
            />
            Half Day
          </label>
          <label>
            <input 
              type="radio" 
              value="Full" 
              
              checked={selectedOption === 'Full'} 
              onChange={handleRadioChange} 
            />
            Full Day
          </label>
          <label>
            <input 
              type="radio" 
              value="Leave" 
              
              checked={selectedOption === 'Leave'} 
              onChange={handleRadioChange} 
            />
            Leave
          </label>
          
        </div>

      </div>

     
      <div className="landscape-item">
        <span className="label">Date:</span>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={handleDateChange}
          required
        />
      </div>
 
 
    </div>
  );
};

export default Box4;

