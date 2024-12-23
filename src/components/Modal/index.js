import React, { useState } from "react"; 
import "./Modal.css"; 

const Modal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    jobRole: "",
    phone: "",
    notes: "",
    applicationDate: "",
    lastProcessDate: "",
    nextProcessDate: "",
    stage: "Technical", // Set a default value for the stage dropdown
    ratings: {
      screening: 0, // Initialize ratings with default values
      technical: 0,
      hr: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name.startsWith("rating_")) {
      // Handle nested ratings object
      const ratingType = name.split("_")[1];
      setFormData({
        ...formData,
        ratings: { ...formData.ratings, [ratingType]: Number(value) },
      });
    } else if (type === "file") {
      // Handle file input (convert to File object)
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="form-title">Add New Candidate</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <span className="label">Name:</span>
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Job Role */}
          <span className="label">Job Role:</span>
          <input
            className="input-field"
            type="text"
            name="jobRole"
            placeholder="Enter Job Role"
            value={formData.jobRole}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <span className="label">Phone:</span>
          <input
            className="input-field"
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Notes */}
          <span className="label">Notes:</span>
          <textarea
            className="input-field"
            name="notes"
            placeholder="Add Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          {/* Application Date */}
          <span className="label">Application Date:</span>
          <input
            className="input-field"
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            required
          />

          {/* Last Process Date */}
          <span className="label">Last Process Date:</span>
          <input
            className="input-field"
            type="date"
            name="lastProcessDate"
            value={formData.lastProcessDate}
            onChange={handleChange}
          />

          {/* Next Process Date */}
          <span className="label">Next Process Date:</span>
          <input
            className="input-field"
            type="date"
            name="nextProcessDate"
            value={formData.nextProcessDate}
            onChange={handleChange}
            required
          />

          {/* Stage */}
          <span className="label">Stage:</span>
          <select
            className="input-field"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
          >
            <option value="Technical">Technical</option>
            <option value="Screening">Screening</option>
            <option value="HR">HR Round</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

          {/* Picture */}
          <span className="label">Picture:</span>
          <input
            className="input-file"
            type="file"
            name="picture"
            accept="image/*"
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
            required
          />

          {/* Ratings */}
          <span className="label">Screening Rating:</span>
          <input
            className="input-field"
            type="number"
            name="rating_screening"
            placeholder="0-5"
            max={5}
            min={0}
            value={formData.ratings.screening}
            onChange={handleChange}
          />

          <span className="label">Technical Rating:</span>
          <input
            className="input-field"
            type="number"
            name="rating_technical"
            placeholder="0-5"
            max={5}
            min={0}
            value={formData.ratings.technical}
            onChange={handleChange}
          />

          <span className="label">HR Rating:</span>
          <input
            className="input-field"
            type="number"
            name="rating_hr"
            placeholder="0-5"
            max={5}
            min={0}
            value={formData.ratings.hr}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="form-actions">
            <button className="submit-btn" type="submit">
              Add Candidate
            </button>
            <button
              className="cancel-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
