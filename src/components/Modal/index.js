import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import "./Modal.css";

const Modal = ({ onClose, onSubmit, candidate }) => {
  const [formData, setFormData] = useState({
    firstName: candidate?.firstName || "",
    lastName: candidate?.lastName || "",
    experience: candidate?.experience || "",
    skillSet: candidate?.skillSet || [],
    currentCompany: candidate?.currentCompany || "",
    currentLocation: candidate?.currentLocation || "",
    preferredLocation: candidate?.preferredLocation || "",
    email: candidate?.email || "",
    mobile: candidate?.mobile || "",
    resume: candidate?.resume || null,
    dateOfReceipt: candidate?.dateOfReceipt || "",
    dateModified: candidate?.dateModified || "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "skillSet") {
      setFormData({ ...formData, skillSet: value.split(",").map((s) => s.trim()) });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skillSet: Array.isArray(formData.skillSet) ? formData.skillSet : [],
      dateModified: new Date().toISOString(),
    };
    onSubmit(updatedData);
    onClose();
  };

  const resumeDownloadUrl = formData.resume
    ? URL.createObjectURL(formData.resume)
    : null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="form-title">{candidate ? "Edit Candidate" : "Add New Candidate"}</h3>
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
            className="input-file"
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
          {formData.resume && (
            <div>
              <a href={resumeDownloadUrl} download={formData.resume.name}>
                <FaDownload /> Download Resume
              </a>
            </div>
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
          <span className="label">Date Modified:</span>
          <input
            className="input-field"
            type="date"
            name="dateModified"
            value={formData.dateModified}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button className="submit-btn" type="submit">
              {candidate ? "Update Candidate" : "Add Candidate"}
            </button>
            <button className="cancel-btn" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
