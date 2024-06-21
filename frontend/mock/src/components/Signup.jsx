import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import logo from './logo.png';

import './authentication.css';
import { registerUser } from '../services/UserService';

function Signup() {
  const images = [image1, image2, image3];
  const texts = [
    "Store, organize and share life's most important memories.",
    "Keep your memories safe and easily accessible anytime.",
    "Share your experiences with friends and family effortlessly."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    
  });
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } else {
      try {
        registerUser(formData).then((response) => {
            console.log(response.data);
        });
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
    // console.log(formData);
    
  };

  return (
    <div className="custom-container">
      <div className="left-panel">
        <h1>{texts[currentIndex]}</h1>
        <div className="custom-carousel">
          <div className="custom-carousel-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Screen ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="custom-carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={currentIndex === index ? 'active' : ''}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <div className='form-container'>
          <div className="custom-logo-section">
            <img src={logo} alt="Company Logo" className="custom-logo" />
          </div>
          <h2 className="custom-create-account-heading">Create account</h2>
          <p>For business, band or celebrity.</p>
          <form onSubmit={handleSubmit}>
            <div className="custom-form-group">
              <div className="custom-input-container">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className="custom-input-container">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="custom-form-group">
              <div className="custom-input-container">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="custom-input-container">
                <label>Date of birth (MM/DD/YYYY)</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Date of birth (MM/DD/YYYY)"
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
              <div className="custom-input-container">
                <label>Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </div>
            </div>
            <button type="submit" className="custom-button">Create account</button>
          </form>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
