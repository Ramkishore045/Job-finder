import React, { useState } from 'react';
import './Login.css';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const validCredentials = [
  { username: 'candidate', password: 'jobtex' },
  { username: 'employer', password: 'jobtex' },
];

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label" htmlFor="username">
            Username or email address*
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <label className="login-label" htmlFor="password">
            Password*
          </label>
          <div className="password-wrapper">
            <input
              id="password"
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
              className="password-togglee"
              aria-label="Toggle password visibility"
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="signup-options">
          <p>or sign up with</p>
        </div>
        <div className="social-buttons">
          <button className="social-button facebook" aria-label="Sign in with Facebook">
            <FaFacebookF /> Continue with Facebook
          </button>
          <button className="social-button google" aria-label="Sign in with Google">
            <FaGoogle /> Continue with Google
          </button>
          <button className="social-button twitter" aria-label="Sign in with Twitter">
            <FaTwitter /> Continue with Twitter
          </button>
        </div>

        <div className="sign-up">
          Not registered yet?{' '}
          <a href="/create-account" aria-label="Sign up for a new account">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
