import React, { useState, useEffect } from "react";
import "./JobProfileModal.css";
import { FaTimes  } from "react-icons/fa";

function JobProfileModal({ isOpen, onClose, onSubmit, job }) {
  const [formData, setFormData] = useState({
    DateofReceipt: "",
    JobTitle: "",
    Experience: "",
    Location: "",
    WorkMode: "",
    VISAType: "",
    ContractTenure: "",
    BillingRate: "",
    Client: "",
    StatusUpdate: "",
    Reference: "",
    JDFile: "",
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        DateofReceipt: "",
        JobTitle: "",
        Experience: "",
        Location: "",
        WorkMode: "",
        VISAType: "",
        ContractTenure: "",
        BillingRate: "",
        Client: "",
        StatusUpdate: "",
        Reference: "",
        JDFile: "",
      });
    }
  }, [job]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        <h2>{job ? "Edit Job Profile" : "Add Job Profile"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Date of Receipt:</label>
          <input type="date" name="DateofReceipt" value={formData.DateofReceipt} onChange={handleChange} required />

          <label>Job Title:</label>
          <input type="text" name="JobTitle" value={formData.JobTitle} onChange={handleChange} required />

          <label>Experience (Years):</label>
          <input type="number" name="Experience" value={formData.Experience} onChange={handleChange} required />

          <label>Location:</label>
          <input type="text" name="Location" value={formData.Location} onChange={handleChange} required />

          <label>Work Mode:</label>
          <input type="text" name="WorkMode" value={formData.WorkMode} onChange={handleChange} required />

          <label>VISA Type:</label>
          <input type="text" name="VISAType" value={formData.VISAType} onChange={handleChange} required />

          <label>Contract Tenure:</label>
          <input type="text" name="ContractTenure" value={formData.ContractTenure} onChange={handleChange} required />

          <label>Billing Rate:</label>
          <input type="text" name="BillingRate" value={formData.BillingRate} onChange={handleChange} required />

          <label>Client:</label>
          <input type="text" name="Client" value={formData.Client} onChange={handleChange} required />

          <label>Status Update:</label>
          <input type="text" name="StatusUpdate" value={formData.StatusUpdate} onChange={handleChange} required />

          <label>Reference:</label>
          <input type="text" name="Reference" value={formData.Reference} onChange={handleChange} required />

          {/* <label>Job Description (Upload PDF):</label>
          <input type="file" name="JDFile" onChange={handleChange} accept=".pdf" required /> */}

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobProfileModal;
