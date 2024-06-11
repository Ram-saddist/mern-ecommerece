import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, userData);
      console.log(response.data)
      if (response.status === 200) {
        // Store the email in localStorage
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userRole', response.data.role);
        navigate('/'); // or any route you want to navigate to
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
