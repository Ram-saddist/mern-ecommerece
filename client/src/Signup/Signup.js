import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, mobile };
    console.log(userData)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, userData);
      console.log(response)
      if (response.status === 201) {
        navigate('/login');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
