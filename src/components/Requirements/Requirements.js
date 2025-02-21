import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";
import JobProfileModal from "../Modal/JobProfileModal";
import { FaPlus, FaEdit, FaTrash, FaDownload, FaTimes, FaSearch } from "react-icons/fa";
import "./Requirements.css";

function JobProfiles({ userRole }) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Error deleting job: ", err);
    }
  };

  const handleEdit = (job) => {
    console.log("Opening Modal for Edit:", job);
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedJob) => {
    try {
      if (updatedJob.id) {
        const jobRef = doc(db, "jobs", updatedJob.id);
        await updateDoc(jobRef, updatedJob);
        setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
      } else {
        const docRef = await addDoc(collection(db, "jobs"), updatedJob);
        updatedJob.id = docRef.id;
      }
      setRefresh((prev) => !prev);
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      console.error("Error updating/adding job: ", err);
    }
  };

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedFilter === "all") {
        return Object.values(job).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return job[selectedFilter]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [jobs, searchQuery, selectedFilter]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="jobprofiles-container">
      <h1 className="title">Job Requirements</h1>

      {/* Top Bar */}
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
            <option value="JobTitle">Job Title</option>
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

        <button className="add-btn" onClick={() => { console.log("Opening Modal for Add"); setEditingJob(null); setIsModalOpen(true); }}>
          <FaPlus /> Add Requirement
        </button>
      </div>

      {/* Job Table */}
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Date of Receipt</th>
                <th>Job Title</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Work Mode</th>
                <th>VISA Type</th>
                <th>Contract Tenure</th>
                <th>Billing Rate</th>
                <th>Client</th>
                <th>Status</th>
                <th>Reference</th>
                <th>Job Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.DateofReceipt || "N/A"}</td>
                  <td>{job.JobTitle || "N/A"}</td>
                  <td>{job.Experience || "N/A"}</td>
                  <td>{job.Location || "N/A"}</td>
                  <td>{job.WorkMode || "N/A"}</td>
                  <td>{job.VISAType || "N/A"}</td>
                  <td>{job.ContractTenure || "N/A"}</td>
                  <td>{userRole === "admin" ? job.BillingRate || "N/A" : "*****"}</td>
                  <td>{userRole === "admin" ? job.Client || "N/A" : "*****"}</td>
                  <td>{job.StatusUpdate || "N/A"}</td>
                  <td>{job.Reference || "N/A"}</td>
                  <td>
                    {job.JDFile ? (
                      <a href={job.JDFile} className="download-link" download>
                        <FaDownload /> Download
                      </a>
                    ) : (
                      "No JD Uploaded"
                    )}
                  </td>
                  <td>
                    <FaEdit className="icon edit-icon" onClick={() => handleEdit(job)} />
                    <FaTrash className="icon delete-icon" onClick={() => handleDelete(job.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Modal for Adding/Editing Jobs */}
      <JobProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSaveEdit} job={editingJob} />
      </div>
  );
}

export default JobProfiles;
