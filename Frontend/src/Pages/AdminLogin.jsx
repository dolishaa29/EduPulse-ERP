import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import '../CSS/AdminLogin.css'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData",formData);
    
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return 'Please fill in all fields.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
     if (validationError) {
       setError(validationError);
       return;
     }

    setLoading(true); 
    setError(null); 

    try {
      alert("from"+formData)
      const response = await axios.post(
        'http://localhost:7000/adminlogin', 
        formData,
        { headers: { 'Content-Type': 'application/json' },
      
     }
      );


      if (response.status === 200 && response.data.token) 
        {
        cookie.set('emtoken', response.data.token, { expires: 1 });
        navigate('/Dashboard');
        window.location.reload(); 
      } 
      else {
        setError('Invalid login credentials');
      }
    } catch (err)
     {
      console.error(err);
      setError('Login failed! Please try again.');
    } 
    finally 
    {
      setLoading(false); 
    }
  };

  return (
    <div className="loginup">
      <div className="loginup-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="logfield">
            <input
              type="text"
              placeholder="Your Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
 
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
