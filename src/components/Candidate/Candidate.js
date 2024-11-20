import React, { useState, useEffect, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing icons
import "./Candidate.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7NEsvLs5PvWdsYJsKFrOIjvSV1mq0I6E",
  authDomain: "job-search-140d4.firebaseapp.com",
  projectId: "job-search-140d4",
  storageBucket: "job-search-140d4.appspot.com",
  messagingSenderId: "329238607270",
  appId: "1:329238607270:web:d51cd3d32e3abddd190b67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Candidate() {
  const [jobs, setJobs] = useState([]); // All jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // Jobs after filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Set loading state to true
        const querySnapshot = await getDocs(collection(db, "jobs")); // "jobs" collection in Firestore
        const jobList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobList);
        setFilteredJobs(jobList); // Initialize filteredJobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchJobs();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  // Memoized filter jobs to optimize performance
  const filteredAndSlicedJobs = useMemo(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = jobs.filter((job) =>
        job.Position && job.Position.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination logic
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const paginatedJobs = filtered.slice(indexOfFirstJob, indexOfLastJob);

    return { filteredJobs: filtered, paginatedJobs };
  }, [jobs, searchTerm, currentPage, itemsPerPage]);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  const totalPages = Math.ceil(filteredAndSlicedJobs.filteredJobs.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="candidate-container">

      <h1 className="title">Candidate Search</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by Position..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <p className="total-jobs">Total Jobs in Database: {filteredAndSlicedJobs.filteredJobs.length}</p> */}

      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr className="table-header">
                <th className="border p-2">Date of Receipt</th>
                <th className="border p-2">Position</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Experience</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Work Authorization</th>
                <th className="border p-2">Client</th>
                {/* <th className="border p-2">Ref</th> */}
                <th className="border p-2">Skill Set</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Profiles in Consideration</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSlicedJobs.paginatedJobs.length > 0 ? (
                filteredAndSlicedJobs.paginatedJobs.map((job) => (
                  <tr className="table-row" key={job.id}>
                    <td className="table-cell">{job.DateofReceipt}</td>
                    <td className="table-cell">{job.Position}</td>
                    <td className="table-cell">{job.Location}</td>
                    <td className="table-cell">{job.Type}</td>
                    <td className="table-cell">{job.Experience}</td>
                    <td className="table-cell">{job.Rate}</td>
                    <td className="table-cell">{job.VisaStatus}</td>
                    <td className="table-cell">{job.Client}</td>
                    {/* <td className="table-cell">{job.Ref}</td> */}
                    <td className="table-cell">{job.SkillSet}</td>
                    <td className="table-cell">{job.Status}</td>
                    <td className="table-cell">{job.ProfilesinConsideration}</td>
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

      {/* Pagination Controls */}
      <div className="pagination-bar">
        {/* Items per page */}
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
          >
            <FaArrowLeft /> {/* Previous icon */}
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <FaArrowRight /> {/* Next icon */}
          </button>
        </div>

        {/* Page numbers */}

      </div>
    </div>
  );
}

export default Candidate;
