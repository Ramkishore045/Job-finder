import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/index";
import { FaPlus } from "react-icons/fa";
import "./Requirements.css";

function JobProfiles({ addCandidate, isJobSeeker }) {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all"); // Filter dropdown state
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs from Firestore
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

  // Filter jobs based on dropdown and search term
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedFilter === "all") {
        return Object.values(job).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return (
        job[selectedFilter] &&
        job[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [jobs, searchTerm, selectedFilter]);

  // Sort filtered jobs
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

  // Paginate jobs
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    return sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [sortedJobs, currentPage, itemsPerPage]);

  // Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSearchTerm(""); // Reset search term when filter changes
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCandidate = (candidate) => {
    addCandidate(candidate);
    setIsModalOpen(false);
  };

  return (
    <div className="jobprofiles-container">
      <h1 className="title">Requirements</h1>

      {/* Top Bar with Filter and Search */}
      <div className="top-bar">
        <div className="filter-container">
          <input
            type="text"
            placeholder={`Search by ${selectedFilter}`}
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="filter-dropdown"
          >
            <option value="all">All Fields</option>
            <option value="DateofReceipt">Date of Receipt</option>
            <option value="JobTitle">Job Title</option>
            <option value="JDProvided">JD Provided</option>
            <option value="Experience">Experience</option>
            <option value="Location">Location</option>
            <option value="WorkMode">Work Mode</option>
            <option value="VISAType">VISA Type</option>
            <option value="ContractTenure">Contract Tenure</option>
            <option value="BillingRate">Billing Rate</option>
            <option value="Client">Client</option>
            <option value="StatusUpdate">Status Update</option>
            <option value="Reference">Reference</option>
          </select>
        </div>
        <button
          className="add-candidate-button"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add New Candidate
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Table */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("DateofReceipt")}>
                  Date of Receipt
                </th>
                <th onClick={() => handleSort("JobTitle")}>Job Title</th>
                <th onClick={() => handleSort("JDProvided")}>JD Provided (Y/N)</th>
                <th onClick={() => handleSort("Experience")}>Experience</th>
                <th onClick={() => handleSort("Location")}>Location</th>
                <th onClick={() => handleSort("WorkMode")}>Work Mode</th>
                <th onClick={() => handleSort("VISAType")}>VISA Type</th>
                <th onClick={() => handleSort("ContractTenure")}>
                  Contract Tenure
                </th>
                <th onClick={() => handleSort("BillingRate")}>
                  {isJobSeeker ? "***" : "Billing Rate"}
                </th>
                <th onClick={() => handleSort("Client")}>
                  {isJobSeeker ? "***" : "Client"}
                </th>
                <th onClick={() => handleSort("StatusUpdate")}>
                  {isJobSeeker ? "***" : "Status Update"}
                </th>
                <th onClick={() => handleSort("Reference")}>Reference</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.DateofReceipt}</td>
                    <td>{job.JobTitle}</td>
                    <td>{job.JDProvided}</td>
                    <td>{job.Experience}</td>
                    <td>{job.Location}</td>
                    <td>{job.WorkMode}</td>
                    <td>{job.VISAType}</td>
                    <td>{job.ContractTenure}</td>
                    <td>{isJobSeeker ? "***" : job.BillingRate}</td>
                    <td>{isJobSeeker ? "***" : job.Client}</td>
                    <td>{isJobSeeker ? "***" : job.StatusUpdate}</td>
                    <td>{job.Reference}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="no-jobs">
                    No jobs found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleAddCandidate} />
      )}
    </div>
  );
}

export default JobProfiles;
