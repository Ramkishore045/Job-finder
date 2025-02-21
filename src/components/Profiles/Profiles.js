import React, { useState, useMemo } from "react";
import {
  FaTrash,
  FaEdit,
  FaDownload,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import Modal from "../Modal/index"; 
import "./Profiles.css";

const Candidates = ({ candidates, setCandidates, isExternalUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editCandidate, setEditCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  
  const handleAddCandidate = (newCandidateData) => {
    if (isExternalUser) {
      alert("External users are not allowed to add candidates.");
      return;
    }
    if (!newCandidateData.firstName || !newCandidateData.lastName || !newCandidateData.experience ||!newCandidateData.skillSet|| !newCandidateData.email || !newCandidateData.mobile) {
      alert("Please fill in all required fields.");
      return;
    }
    setCandidates([...candidates, { ...newCandidateData, id: Date.now() }]);
  };

  
  const handleEditCandidate = (updatedCandidateData) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === updatedCandidateData.id ? updatedCandidateData : candidate
      )
    );
  };

  
  const openModal = (candidate = null) => {
    setEditCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditCandidate(null);
  };

 
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (selectedFilter === "all") {
        return Object.values(candidate).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return candidate[selectedFilter]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [candidates, searchQuery, selectedFilter]);

  
  const indexOfLastCandidate = currentPage * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  return (
    <div className="app-container">
      <h1 className="title">Candidate Profiles</h1>

     
      <div className="top-bar">
        <div className="filter-container">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                <FaTimes />
              </button>
            )}
            <FaSearch className="search-icon" />
          </div>

         
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All Fields</option>
            <option value="firstName">First Name *</option>
            <option value="lastName">Last Name *</option>
            <option value="experience">Experience *</option>
            <option value="skillSet">Skill Set *</option>
            <option value="currentCompany">Current Company</option>
            <option value="currentLocation">Current Location</option>
            <option value="preferredLocation">Preferred Location</option>
            <option value="email">Email *</option>
            <option value="mobile">Mobile *</option>
            <option value="resume">Resume</option>
            <option value="dateOfReceipt">Date of Receipt</option>
            <option value="dateModified">Date Modified</option>
            <option value="status">Status</option>
            <option value="comments">Comments</option>
          </select>
        </div>

      
        {!isExternalUser && (
          <button onClick={() => openModal()} className="add-btn">
            <FaPlus /> Add Candidate
          </button>
        )}
      </div>

      
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>First Name *</th>
              <th>Last Name *</th>
              <th>Experience *</th>
              <th>Skill Set *</th>
              <th>Current Company</th>
              <th>Current Location</th>
              <th>Preferred Location</th>
              <th>Email *</th>
              <th>Mobile *</th>
              <th>Resume (PDF, DOCX, DOC)</th>
              <th>Date of Receipt</th>
              <th>Date Modified</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.firstName || "N/A"}</td>
                <td>{candidate.lastName || "N/A"}</td>
                <td>{candidate.experience || "0"}</td>
                <td>{Array.isArray(candidate.skillSet) ? candidate.skillSet.join(", ") : candidate.skillSet || "None"}</td>
                <td>{candidate.currentCompany || "Not Specified"}</td>
                <td>{candidate.currentLocation || "Not Specified"}</td>
                <td>{candidate.preferredLocation || "Not Specified"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.mobile || "N/A"}</td>
                <td>
                  {candidate.resume ? (
                    <a
                      href={candidate.resume}
                      className="download-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`Resume_${candidate.firstName}_${candidate.lastName}`}
                    >
                      <FaDownload /> Download ({candidate.resumeSize || "Unknown Size"})
                    </a>
                  ) : (
                    "No resume uploaded"
                  )}
                </td>
                <td>{candidate.dateOfReceipt || "N/A"}</td>
                <td>{candidate.dateModified || "N/A"}</td>
                <td>{candidate.status || "N/A"}</td>
                <td>{candidate.comments || "N/A"}</td>
                <td>
                  <FaEdit className="icon edit-icon" onClick={() => openModal(candidate)} />
                  <FaTrash
                    className="icon delete-icon"
                    onClick={() =>
                      setCandidates(candidates.filter((c) => c.id !== candidate.id))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            className={`pagination-btn ${currentPage === num + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>

     
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editCandidate ? handleEditCandidate : handleAddCandidate}
          candidate={editCandidate}
        />
      )}
    </div>
  );
};

export default Candidates;
