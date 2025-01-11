import React, { useState, useMemo } from "react";
import {
  FaTrash,
  FaEdit,
  FaDownload,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Modal from "../Modal/index";
import "./Profiles.css";

const Candidates = ({ candidates, setCandidates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editCandidate, setEditCandidate] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Add Candidate Handler
  const handleAddCandidate = (newCandidateData) => {
    setCandidates([...candidates, { ...newCandidateData, id: Date.now() }]);
  };

  // Edit Candidate Handler
  const handleEditCandidate = (updatedCandidateData) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === updatedCandidateData.id
          ? updatedCandidateData
          : candidate
      )
    );
  };

  // Modal Handlers
  const openModal = (candidate = null) => {
    setEditCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditCandidate(null);
  };

  // Filtering Candidates
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

  // Pagination Logic
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

      {/* Add Candidate Button */}
      <button onClick={() => openModal()} className="add-btn">
        <FaPlus /> Add Candidate
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={editCandidate ? handleEditCandidate : handleAddCandidate}
          candidate={editCandidate}
        />
      )}

      {/* Advanced Search and Filter */}
      <div className="top-bar">
        <div className="filter-container">
          <input
            type="text"
            placeholder={`Search by ${selectedFilter}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All Fields</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="experience">Experience</option>
            <option value="skillSet">Skill Set</option>
            <option value="currentCompany">Current Company</option>
            <option value="currentLocation">Current Location</option>
            <option value="preferredLocation">Preferred Location</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
            <option value="resume">Resume</option>
            <option value="dateOfReceipt">Date of Receipt</option>
            <option value="dateModified">Date Modified</option>
          </select>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Experience (Years)</th>
              <th>Skill Set</th>
              <th>Current Company</th>
              <th>Current Location</th>
              <th>Preferred Location</th>
              <th>Email ID</th>
              <th>Mobile</th>
              <th>Resume</th>
              <th>Date of Receipt</th>
              <th>Date Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.firstName || "N/A"}</td>
                <td>{candidate.lastName || "N/A"}</td>
                <td>{candidate.experience || "0"}</td>
                <td>
                  {Array.isArray(candidate.skillSet)
                    ? candidate.skillSet.join(", ")
                    : "None"}
                </td>
                <td>{candidate.currentCompany || "Not Specified"}</td>
                <td>{candidate.currentLocation || "Not Specified"}</td>
                <td>{candidate.preferredLocation || "Not Specified"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.mobile || "N/A"}</td>
                <td>
                  {candidate.resume ? (
                    <a
                      href={
                        candidate.resume instanceof File ||
                        candidate.resume instanceof Blob
                          ? URL.createObjectURL(candidate.resume)
                          : candidate.resume
                      }
                      className="download-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`Resume_${candidate.firstName}_${candidate.lastName}`}
                    >
                      <FaDownload /> Download
                    </a>
                  ) : (
                    "No resume uploaded"
                  )}
                </td>
                <td>{candidate.dateOfReceipt || "N/A"}</td>
                <td>{candidate.dateModified || "N/A"}</td>
                <td>
                  <FaEdit
                    className="icon edit-icon"
                    onClick={() => openModal(candidate)}
                  />
                  <FaTrash
                    className="icon delete-icon"
                    onClick={() =>
                      setCandidates(
                        candidates.filter((c) => c.id !== candidate.id)
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
            className={`pagination-btn ${
              currentPage === num + 1 ? "active" : ""
            }`}
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
    </div>
  );
};

export default Candidates;
