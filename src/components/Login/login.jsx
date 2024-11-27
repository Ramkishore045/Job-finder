import React, { useState } from 'react';
import './Login.css';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validCredentials = [
    { username: 'candidate', password: 'jobtex' },
    { username: 'employer', password: 'jobtex' },
  ];

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log In</h1>
        <div className="demo-credentials">
          <p>
            Username: <span>candidate</span> or <span>employer</span>
          </p>
          <p>
            Password: <span>jobtex</span>
          </p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">Username or email address*</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <label className="login-label">Password*</label>
          <div className="password-wrapper">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          <div className="extra-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="signup-options">
          <p>or sign up with</p>
        </div>
        <div className="social-buttons">
          <button className="social-button facebook">
            <FaFacebookF /> Continue with Facebook
          </button>
          <button className="social-button google">
            <FaGoogle /> Continue with Google
          </button>
          <button className="social-button twitter">
            <FaTwitter /> Continue with Twitter
          </button>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <div className="sign-up">
          Not registered yet? <a href="/create-account">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
