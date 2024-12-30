import React, { useState, useEffect } from "react";
import "./Modal.css"; // Your modal styling here

const Modal = ({ onClose, onSubmit, candidate }) => {
  // Ensure that skillSet is always an array, even if empty
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
    // Make sure skillSet is always an array
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

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="form-title">{candidate ? "Edit Candidate" : "Add Candidate"}</h2>
        <form onSubmit={handleSubmit}>
         {/* First Name */}
         <span className="label">First Name:</span>
          <input
            className="input-field"
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
           {/* Last Name */}
           <span className="label">Last Name:</span>
          <input
            className="input-field"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
           {/* Experience */}
           <span className="label">Experience (Years):</span>
          <input
            className="input-field"
            type="number"
            name="experience"
            placeholder="Enter Experience in Years"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          {/* Skill Set */}
          <span className="label">Skill Set:</span>
          <input
            className="input-field"
            type="text"
            name="skillSet"
            placeholder="Enter skills, separated by commas"
            value={formData.skillSet.join(", ")}
            onChange={handleChange}
            required
          />
          {/* Current Company */}
          <span className="label">Current Company:</span>
          <input
            className="input-field"
            type="text"
            name="currentCompany"
            placeholder="Enter Current Company"
            value={formData.currentCompany}
            onChange={handleChange}
          />

          {/* Current Location */}
          <span className="label">Current Location:</span>
          <input
            className="input-field"
            type="text"
            name="currentLocation"
            placeholder="Enter Current Location"
            value={formData.currentLocation}
            onChange={handleChange}
          />
          {/* Preferred Location */}
          <span className="label">Preferred Location:</span>
          <input
            className="input-field"
            type="text"
            name="preferredLocation"
            placeholder="Enter Preferred Location"
            value={formData.preferredLocation}
            onChange={handleChange}
          />
           {/* Email */}
           <span className="label">Email:</span>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* Mobile */}
          <span className="label">Mobile:</span>
          <input
            className="input-field"
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          
          {/* Resume */}
          <span className="label">Resume:</span>
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
          
           {/* Date of Receipt */}
           <span className="label">Date of Receipt:</span>
          <input
            className="input-field"
            type="date"
            name="dateOfReceipt"
            value={formData.dateOfReceipt}
            onChange={handleChange}
            required
          />

          {/* Date Modified */}
          <span className="label">Date Modified:</span>
          <input
            className="input-field"
            type="date"
            name="dateModified"
            value={formData.dateModified}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button  className="submit-btn" type="submit">{candidate ? "Save Changes" : "Add Candidate"}</button>
            <button  className="cancel-btn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
