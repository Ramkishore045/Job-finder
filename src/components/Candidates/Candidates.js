import React, { useState, useMemo } from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash, FaPlus, FaEdit, FaDownload, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Modal from "../Modal/index";
import "./Candidates.css";

const Candidates = ({ candidates, setCandidates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editCandidate, setEditCandidate] = useState(null);

  // State for Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all"); // Filter dropdown state

  // Delete Candidate
  const deleteCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  // Add Candidate
  const handleAddCandidate = (newCandidateData) => {
    setCandidates([...candidates, newCandidateData]);
  };

  // Edit Candidate
  const handleEditCandidate = (updatedCandidateData) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === updatedCandidateData.id ? updatedCandidateData : candidate
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

  // Filtering and Searching
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (selectedFilter === "all") {
        return Object.values(candidate).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return (
        candidate[selectedFilter]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [candidates, searchQuery, selectedFilter]);

  // Pagination
  const indexOfLastCandidate = currentPage * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  return (
    <div className="app-container">
      <button onClick={() => openModal()} className="add-btn">
        <FaPlus /> Add Candidate
      </button>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={editCandidate ? handleEditCandidate : handleAddCandidate}
          candidate={editCandidate}
        />
      )}

      {/* Search and Filters */}
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
          </select>
        </div>
      </div>

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
                <td>{Array.isArray(candidate.skillSet) ? candidate.skillSet.join(", ") : "None"}</td>
                <td>{candidate.currentCompany || "Not Specified"}</td>
                <td>{candidate.currentLocation || "Not Specified"}</td>
                <td>{candidate.preferredLocation || "Not Specified"}</td>
                <td>{candidate.email || "N/A"}</td>
                <td>{candidate.mobile || "N/A"}</td>
                <td>
                  {candidate.resume ? (
                    <a
                      href={
                        typeof candidate.resume === "object" && candidate.resume instanceof File
                          ? URL.createObjectURL(candidate.resume)
                          : candidate.resume
                      }
                      className="download-link"
                      download
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
                  <FaEdit className="icon edit-icon" onClick={() => openModal(candidate)} />
                  <FaTrash className="icon delete-icon" onClick={() => deleteCandidate(candidate.id)} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
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
      </div>
    </div>
  );
};

export default Candidates;
