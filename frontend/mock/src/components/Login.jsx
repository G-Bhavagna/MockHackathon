import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import './authentication.css';
import { loginUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(formData).then((response)=>{
        setUser(response.data);
        console.log(response.data);
        navigate('/');
    }).catch((error)=>{
      navigate('/login');
        console.error('Error logging in user:', error);
    }
    );
    // try {
    //   const response = await axios.post('YOUR_API_ENDPOINT', formData);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };

  return (
    <div className="custom-container">
      <div className="left-panel">
        <h1>Welcome back!</h1>
        <p>Login to access your account and continue your journey with us.</p>
      </div>
      <div className="right-panel">
        <div className='form-container'>
          <div className="custom-logo-section">
            <img src={logo} alt="Company Logo" className="custom-logo" />
          </div>
          <h2 className="custom-create-account-heading">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="custom-form-group">
              <div className="custom-input-container">
                <label>Email or phone number</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email or phone number"
                />
              </div>
            </div>
            <div className="custom-form-group">
              <div className="custom-input-container">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>
            <button type="submit" className="custom-button">Log In</button>
          </form>
          <p>Don't have an account? <a href="/">Create one</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
