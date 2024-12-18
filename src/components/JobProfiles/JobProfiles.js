import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";
import "./JobProfiles.css";
import { NavLink } from "react-router-dom";

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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      Object.values(job).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [jobs, searchTerm]);

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

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    return sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [sortedJobs, currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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

  return (
    <div className="jobprofiles-container">
      <h1 className="title">Reqirements Search</h1>


      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by any field..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <NavLink to="/candidates" className="add-candidate-button">
          Add New Candidate
        </NavLink>
      </div>


      {error && <p className="error-message">{error}</p>}


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
                    onClick={() => handleSort(header.split(" ").join(""))}
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


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default JobProfiles;
