import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { FaBell, FaQuestionCircle } from "react-icons/fa";

function Header() {
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);

  const togglePagesDropdown = () => setPagesDropdownOpen(!isPagesDropdownOpen);
  const toggleShopDropdown = () => setShopDropdownOpen(!isShopDropdownOpen);

  return (
    <div className="header-container">
      {/* Logo */}
      <img
        src="https://ahimay.com/images/Newahimaylogowhite1.png"
        alt="Logo"
      />

      {/* Navigation */}
      <nav className="primary-nav">
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/joblist" activeClassName="active">Find jobs</NavLink>
        <NavLink to="/candidate-finder" activeClassName="active">Employers</NavLink>
        <NavLink to="/candidates" activeClassName="active">Candidates</NavLink>
        <NavLink to="/blog" activeClassName="active">Blog</NavLink>
        {/* Pages Dropdown */}
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

      {/* Right-Side Actions */}
      <div className="header-actions">
        <FaQuestionCircle size={20} color="#fff" />
        <FaBell size={20} color="#fff" />
        <img
          src="https://via.placeholder.com/35"
          alt="Profile"
        />
        <button className="upload-resume-btn">Upload Resume</button>
      </div>
    </div>
  );
}

export default Header;
