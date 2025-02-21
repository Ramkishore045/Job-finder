import React, { useState, useEffect } from "react";
import "./Modal.css"; 
import { FaTimes  } from "react-icons/fa";
const Modal = ({ isOpen, onClose, onSubmit, candidate }) => {
  const [formData, setFormData] = useState({
    firstName: candidate?.firstName || "",
    lastName: candidate?.lastName || "",
    experience: candidate?.experience || 0,
    skillSet: Array.isArray(candidate?.skillSet) ? candidate.skillSet : [],
    currentCompany: candidate?.currentCompany || "",
    currentLocation: candidate?.currentLocation || "",
    preferredLocation: candidate?.preferredLocation || "",
    email: candidate?.email || "",
    mobile: candidate?.mobile || "",
    resume: candidate?.resume || null,
    dateOfReceipt: candidate?.dateOfReceipt || "",
    dateModified: candidate?.dateModified || "",
    id: candidate?.id || null,
  });

  useEffect(() => {
    if (candidate) {
      setFormData({
        firstName: candidate.firstName || "",
        lastName: candidate.lastName || "",
        experience: candidate.experience || 0,
        skillSet: Array.isArray(candidate.skillSet) ? candidate.skillSet : [],
        currentCompany: candidate.currentCompany || "",
        currentLocation: candidate.currentLocation || "",
        preferredLocation: candidate.preferredLocation || "",
        email: candidate.email || "",
        mobile: candidate.mobile || "",
        resume: candidate.resume || null,
        dateOfReceipt: candidate.dateOfReceipt || "",
        dateModified: candidate.dateModified || "",
        id: candidate.id || null,
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillSetChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      skillSet: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Close Button (Cross Icon) */}
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        
        <h2 className="form-title">{candidate ? "Edit Candidate" : "Add Candidate"}</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label className="label">First Name:</label>
            <input
              className="input-field"
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Last Name */}
          <div className="form-group">
            <label className="label">Last Name:</label>
            <input
              className="input-field"
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Experience */}
          <div className="form-group">
            <label className="label">Experience (Years):</label>
            <input
              className="input-field"
              type="number"
              name="experience"
              placeholder="Enter Experience in Years"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          {/* Skill Set */}
          <div className="form-group">
            <label className="label">Skill Set:</label>
            <input
              className="input-field"
              type="text"
              name="skillSet"
              placeholder="Enter skills, separated by commas"
              value={formData.skillSet.join(", ")}
              onChange={handleSkillSetChange}
              required
            />
          </div>
          {/* Current Company */}
          <div className="form-group">
            <label className="label">Current Company:</label>
            <input
              className="input-field"
              type="text"
              name="currentCompany"
              placeholder="Enter Current Company"
              value={formData.currentCompany}
              onChange={handleChange}
            />
          </div>
          {/* Current Location */}
          <div className="form-group">
            <label className="label">Current Location:</label>
            <input
              className="input-field"
              type="text"
              name="currentLocation"
              placeholder="Enter Current Location"
              value={formData.currentLocation}
              onChange={handleChange}
            />
          </div>
          {/* Preferred Location */}
          <div className="form-group">
            <label className="label">Preferred Location:</label>
            <input
              className="input-field"
              type="text"
              name="preferredLocation"
              placeholder="Enter Preferred Location"
              value={formData.preferredLocation}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="form-group">
            <label className="label">Email:</label>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Mobile */}
          <div className="form-group">
            <label className="label">Mobile:</label>
            <input
              className="input-field"
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          {/* Resume */}
          <div className="form-group">
            <label className="label">Resume:</label>
            <input
              type="file"
              name="resume"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  resume: e.target.files[0] || null,
                }))
              }
            />
            {formData.resume && (
              <p>Selected file: {formData.resume.name}</p>
            )}
          </div>
          {/* Date of Receipt */}
          <div className="form-group">
            <label className="label">Date of Receipt:</label>
            <input
              className="input-field"
              type="date"
              name="dateOfReceipt"
              value={formData.dateOfReceipt}
              onChange={handleChange}
              required
            />
          </div>
          {/* Date Modified */}
          <div className="form-group">
            <label className="label">Date Modified:</label>
            <input
              className="input-field"
              type="date"
              name="dateModified"
              value={formData.dateModified}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button className="submit-btn" type="submit">
              {candidate ? "Save Changes" : "Add Candidate"}
            </button>
            <button className="cancel-btn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
