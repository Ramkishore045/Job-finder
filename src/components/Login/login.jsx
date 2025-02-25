import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addUser } from "../Redux/Reducer/User";
import { useDispatch } from "react-redux";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.username || !form.password) {
      setError("⚠️ Please fill in all fields!");
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "UserCollection");
      const queryRequest = query(usersRef, where("username", "==", form.username));
      const userlist = await getDocs(queryRequest);

      if (userlist.empty) {
        setError("❌ User not found! Check your username.");
      } else {
        const userData = userlist.docs[0].data();
        if (userData.password === form.password) {
          dispatch(addUser(userData));
          localStorage.setItem("loggedInUser", JSON.stringify(userData)); // ✅ Store login info
          navigate("/");
          window.location.reload();
        } else {
          setError("🔑 Incorrect password! Try again.");
        }
      }
    } catch (error) {
      setError("🚨 Login failed! Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log In</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={login} className="login-form">
          <label className="login-label" htmlFor="username">
            Username or email address*
          </label>
          <input
            id="username"
            type="email"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            className="login-input"
            required
          />

          <label className="login-label" htmlFor="password">
            Password*
          </label>
          <div className="password-wrapper">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <div className="extra-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <NavLink to="/forgot-password" className="forgot-password">
              Forgot password?
            </NavLink>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
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

        <div className="sign-up">
          Not registered yet?{" "}
          <NavLink to="/create-account">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
