import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Import Firestore instance
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./JobProfiles.css";

function JobProfiles() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobList);
      } catch (err) {
        console.error("Error fetching jobs: ", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Search Filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      Object.values(job).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [jobs, searchTerm]);

  // Sorting
  const sortedJobs = useMemo(() => {
    if (!sortField) return filteredJobs;
    return [...filteredJobs].sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredJobs, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    return sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [sortedJobs, currentPage, itemsPerPage]);

  // Event Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="candidate-container">
      <h1 className="title">Candidate Search</h1>

      {/* Search Input */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by any field..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Error Handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Table */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr className="table-header">
                {[
                  "Date of Receipt",
                  "Position",
                  "Location",
                  "Type",
                  "Experience",
                  "Rate",
                  "Work Authorization",
                  "Client",
                  "Skill Set",
                  "Status",
                  "Profiles in Consideration",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="table-header-cell"
                    onClick={() => handleSort(header.split(" ").join(""))} // Sort by field
                  >
                    {header} {sortField === header.split(" ").join("") ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <tr key={job.id} className="table-row">
                    <td>{job.DateofReceipt}</td>
                    <td>{job.Position}</td>
                    <td>{job.Location}</td>
                    <td>{job.Type}</td>
                    <td>{job.Experience}</td>
                    <td>{job.Rate}</td>
                    <td>{job.VisaStatus}</td>
                    <td>{job.Client}</td>
                    <td>{job.SkillSet}</td>
                    <td>{job.Status}</td>
                    <td>{job.ProfilesinConsideration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-jobs">
                    No jobs found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-bar">
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="pagination-buttons">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobProfiles;
