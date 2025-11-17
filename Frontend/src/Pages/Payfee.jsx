import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FeePayment = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [remainingFee, setRemainingFee] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setPaymentStatus('Login required.');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get('http://localhost:7000/studentprofile2', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const studentData = response.data.student || response.data;
        if (!studentData) {
          setPaymentStatus('Student data not found.');
          return;
        }

        const totalFee = parseFloat(studentData.totalFee || 0);
        const remaining = totalFee - studentData.quarter1.fees - studentData.quarter2.fees - studentData.quarter3.fees - studentData.quarter4.fees;

        setStudentInfo({
          name: studentData.studentName,
          totalFee,
          quarters: studentData,
        });

        setRemainingFee(remaining);
      } catch (error) {
        setPaymentStatus('Error loading details.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, []);

  const handleQuarterSelect = (quarter) => {
    setSelectedQuarter(quarter);
    setPaymentStatus(''); 
  };

  const handlePayment = async () => {
    if (!selectedQuarter) {
      setPaymentStatus('Please select a quarter.');
      return;
    }

    setPaymentStatus(`Processing payment for ${selectedQuarter}...`);

    const token = Cookies.get('token');
    try {
      const response = await axios.post("http://localhost:7000/payfees", { quarter: selectedQuarter }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        setPaymentStatus(`${selectedQuarter} payment successful!`);
        setSelectedQuarter(null);
        await fetchStudentInfo();
      } else {
        setPaymentStatus(`Payment failed: ${response.data.message }`);
      }
    } catch (error) {
      setPaymentStatus('Error during payment.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!studentInfo) return <div>No student details available.</div>;

  const { totalFee, quarters } = studentInfo;
  const quarterFee = totalFee / 4;

  return (
    <div className="fee-payment-container">
      <h1>Fee Payment</h1>
      <h2>{studentInfo.name}</h2>
      <p>Total Fee: ₹{totalFee}</p>
      <p>Remaining Fee: ₹{remainingFee.toFixed(2)}</p>

      <div className="quarter-selection-container">
        {['quarter1', 'quarter2', 'quarter3', 'quarter4'].map((quarter) => {
          const isPaid = quarters[quarter]?.status === 'Paid';
          return (
            <button
              key={quarter}
              onClick={() => handleQuarterSelect(quarter)}
              disabled={isPaid}
              className={isPaid ? 'paid' : ''}
            >
              {quarter.charAt(0).toUpperCase() + quarter.slice(1)}: {isPaid ? 'Paid' : `₹${quarterFee.toFixed(2)}`}
            </button>
          );
        })}
      </div>

      <button onClick={handlePayment} disabled={!selectedQuarter}>
        {selectedQuarter ? `Pay for ${selectedQuarter}` : 'Select a Quarter'}
      </button>

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default FeePayment;
