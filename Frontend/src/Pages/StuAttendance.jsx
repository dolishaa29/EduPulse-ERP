import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../CSS/stu.css';

const StuAttendance = () => {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const fetchStudentData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewstudent", { withCredentials: true });
      setStudents(response.data.student);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    const rec = students.map((student) => ({
      id: student.id,
      status: '',
      date: ''
    }));
    setRecords(rec);
  }, [students]);

  const handleRadioChange = (e, studentId) => {
    const atd = e.target.value;
    console.log("Student ID: " + studentId); 
    const rec = [...records];

    const studentIndex = rec.findIndex(record => record.id === studentId);
    
    if (studentIndex !== -1) {
      rec[studentIndex].status = atd;
      setRecords(rec);
    }

    console.log(records);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;

    const rec = [...records];
    rec.map((r, i) => {
      rec[i].date = date;
    });

    setRecords(rec);
    console.log(records);
  };

  const funsave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/attendancecheck", { records });
      console.log("Attendance saved successfully:", response.data);
      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance");
    }
  };

  return (
    <>
      <div className="landscape-container">
        <form onSubmit={funsave}>
          <div className='landscape-item'>
            {students.map((student) => (
              <div key={student.id} className='text-black'>
                <p>Name: {student.name}</p>

                <div className="landscape-item">
                  <span className="label">Attendance:</span>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        value="Half"
                        checked={selectedOption === 'Half'}
                        onChange={(e) => handleRadioChange(e, student.id)}  
                      />
                      Half Day
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Full"
                        checked={selectedOption === 'Full'}
                        onChange={(e) => handleRadioChange(e, student.id)}  
                      />
                      Full Day
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Leave"
                        checked={selectedOption === 'Leave'}
                        onChange={(e) => handleRadioChange(e, student.id)}  
                      />
                      Leave
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="landscape-item">
            <span className="label">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <button type='submit'>Save</button>
        </form>
      </div>
    </>
  );
};

export default StuAttendance;
