import React, { useState } from "react";
import { NavLink ,Link } from "react-router-dom";
import { FaBell, FaQuestionCircle } from "react-icons/fa";
import Logo from '../../Images/Newahimaylogowhite1.png';
import User from '../../Images/user.svg';
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Header.css";

function Header() {
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);

  const togglePagesDropdown = () => setPagesDropdownOpen(!isPagesDropdownOpen);
  const toggleShopDropdown = () => setShopDropdownOpen(!isShopDropdownOpen);

  return (
    <div>
     
      <div className="header-container">
      <Link to="/">
      <img src={Logo} alt="Logo" />
      
    </Link>

        
        <nav className="primary-nav">
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/joblist" activeClassName="active">Find jobs</NavLink>
          <NavLink to="/reqirements" activeClassName="active">Reqirements</NavLink>
          <NavLink to="/candidates" activeClassName="active">Profiles</NavLink>
          <NavLink to="/blog" activeClassName="active">Blog</NavLink>
          
          <div
            className="dropdown"
            onMouseEnter={togglePagesDropdown}
            onMouseLeave={togglePagesDropdown}
          >
            <span className="dropdown-title">Pages ▼</span>
            {isPagesDropdownOpen && (
              <div className="dropdown-menu">
                <div
                  className="dropdown-item"
                  onMouseEnter={toggleShopDropdown}
                  onMouseLeave={toggleShopDropdown}
                >
                  Shop →
                  {isShopDropdownOpen && (
                    <div className="dropdown-submenu">
                      <NavLink to="/shop-list">Shop List</NavLink>
                      <NavLink to="/shop-single">Shop Single</NavLink>
                      <NavLink to="/shopping-cart">Shopping Cart</NavLink>
                      <NavLink to="/checkout">Checkout</NavLink>
                    </div>
                  )}
                </div>
                <NavLink to="/about-us">About Us</NavLink>
                <NavLink to="/faqs">FAQs</NavLink>
                <NavLink to="/terms-of-use">Terms of Use</NavLink>
                <NavLink to="/pricing">Pricing</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/create-account">Create Account</NavLink>
                <NavLink to="/contact-us">Contact Us</NavLink>
              </div>
            )}
          </div>
        </nav>

       
        <div className="header-actions">
          <FaQuestionCircle size={20} color="#fff" />
          <FaBell size={20} color="#fff" />
          <img src={User} alt="User" />
          <button className="upload-resume-btn">Upload Resume</button>
        </div>
      </div>

      
      <Breadcrumb />
    </div>
  );
}

export default Header;
