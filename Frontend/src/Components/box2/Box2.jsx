import React, { useState,useEffect } from 'react';  
import axios from 'axios';
import '../box2/Box.css';


const Box2 = ({ id, name }) => {


  

  const [record,setRecord]=useState([]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewstudent"); 
      const data = response.data.student; 
      //alert(data);
      setRecord(data);
      
      console.log("box"+record.length);
      
    } catch (error) {
      console.error("Error fetching staff data:", error); 
    }
  };
useEffect(() => {
    //fetchStudentData();
  },[]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    id: id,
    status: '',
    date: ''
  });
  

  const handleRadioChange = (event) => {

    setSelectedOption(event.target.value);
    setFormData({ ...formData, status: event.target.value });
       
  
  };

  const handleDateChange = (event) => {
    
    setSelectedDate(event.target.value);
    setFormData({ ...formData, date: event.target.value });
      };
const handleSave=()=>
{

//record.push(formData);
setRecord(record=>[...record,formData]);
//setRecord([formData]);
  //alert(formData.status+""+formData.id);
console.log([record]);

}

const showSave=()=>
{

//alert(record.length);

}
  const handleSubmit = async () => {
    if (!formData.status || !formData.date) {
      alert("Please select attendance status and date!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/stuaddattendance", formData);
      alert(response.data.msg); 
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); 
      } else {
        alert("Error submitting attendance");
      }
      console.error('Error submitting the form', error);
    }
  };

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

      <div className="landscape-item">
        <button type="button" className="submit" onClick={handleSave}>
          Submit Attendance
        </button>
      </div>
      <div className="landscape-item">
        <button type="button" className="submit" onClick={showSave}>
          Show Attendance
        </button>
      </div>
 <div className="landscape-item">
        <button type="button" className="submit" onClick={showSave}>
          {record.length}
        </button>
      </div>
    </div>
  );
};

export default Box2;

