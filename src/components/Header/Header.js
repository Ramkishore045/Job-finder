import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBell, FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Reducer/User";
import Logo from "../../Images/Newahimaylogowhite1.png";
import User from "../../Images/user.svg";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle state for dropdown
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!storedUser);
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>

      <nav className="primary-nav">
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/reqirements" activeClassName="active">Requirements</NavLink>
        <NavLink to="/profiles" activeClassName="active">Profiles</NavLink>
      </nav>

      <div className="header-actions">
        <FaQuestionCircle size={20} color="#fff" />
        <FaBell size={20} color="#fff" />

        {/* User Icon with Dropdown */}
        <div className="user-dropdown">
          <img 
            src={User} 
            alt="User" 
            className="user-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
          />
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
