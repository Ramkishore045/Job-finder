import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

const Register = () => {
    const [userType, setUserType] = useState('Candidate');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const handleUserTypeChange = (type) => {
        setUserType(type);
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) {
            formErrors.username = "Username or email address is required.";
        }
        if (!formData.password) {
            formErrors.password = "Password is required.";
        } else if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match.";
        }
        if (!formData.agreeToTerms) {
            formErrors.agreeToTerms = "You must agree to the terms of use.";
        }
        return formErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {

            console.log({ userType, ...formData });

            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
            });
            alert('Registration successful!');
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Register For New Account</h1>


                <div className="toggle-buttons">
                    <button
                        className={`toggle-button ${userType === 'Candidate' ? 'active' : ''}`}
                        onClick={() => handleUserTypeChange('Candidate')}
                    >
                        Candidate
                    </button>
                    <button
                        className={`toggle-button ${userType === 'Employer' ? 'active' : ''}`}
                        onClick={() => handleUserTypeChange('Employer')}
                    >
                        Employer
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="register-form">

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username or email address<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password<span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>


                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password<span className="required">*</span>
                        </label>
                        <div className="input-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>


                    <div className="form-checkbox">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="checkbox-input"
                        />
                        <label htmlFor="agreeToTerms" className="checkbox-label">
                            I agree to the <a href="#" className="terms-link">Terms of User</a>
                        </label>
                        {errors.agreeToTerms && <p className="error-text">{errors.agreeToTerms}</p>}
                    </div>



                    <button type="submit" className="form-button">
                        Register as {userType}
                    </button>
                </form>


                <p className="login-link">
                    Already have an account? <a href="/login" className="login-link-highlight">Login Here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
