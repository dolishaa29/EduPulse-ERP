import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../CSS/stu.css';

const StaffAttendance = () => {
  const [staff, setStaff] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const fetchStaffData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/viewstaff", { withCredentials: true });
      setStaff(response.data.staff);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  useEffect(() => {
    const rec = staff.map((member) => ({
      id: member.id,
      status: '',
      date: ''
    }));
    setRecords(rec);
  }, [staff]);

  const handleRadioChange = (e, staffId) => {
    const atd = e.target.value;
    const rec = [...records];
    const staffIndex = rec.findIndex(record => record.id === staffId);
    
    if (staffIndex !== -1) {
      rec[staffIndex].status = atd;
      setRecords(rec);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    const rec = [...records];
    rec.map((r, i) => {
      rec[i].date = date;
    });
    setRecords(rec);
  };

  const funsave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/Sattendancecheck", { records });
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
            {staff.map((member) => (
              <div key={member.id} className='text-black'>
                <p>Name: {member.name}</p>
                <div className="landscape-item">
                  <span className="label">Attendance:</span>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        value="Half"
                        checked={selectedOption === 'Half'}
                        onChange={(e) => handleRadioChange(e, member.id)}  
                      />
                      Half Day
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Full"
                        checked={selectedOption === 'Full'}
                        onChange={(e) => handleRadioChange(e, member.id)}  
                      />
                      Full Day
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Leave"
                        checked={selectedOption === 'Leave'}
                        onChange={(e) => handleRadioChange(e, member.id)}  
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

export default StaffAttendance;
