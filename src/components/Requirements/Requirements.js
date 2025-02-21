import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/index";
import { FaPlus, FaEdit, FaTrash, FaDownload, FaTimes, FaFilter, FaSearch } from "react-icons/fa";
import "./Requirements.css";

function JobProfiles({ userRole }) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search Bar State

  // Advanced Search Filters
  const [filters, setFilters] = useState({
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
  });

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error("Error deleting job: ", err);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedJob) => {
    try {
      if (updatedJob.id) {
        const jobRef = doc(db, "jobs", updatedJob.id);
        await updateDoc(jobRef, updatedJob);
        setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
      } else {
        const docRef = await addDoc(collection(db, "jobs"), updatedJob);
        setJobs([...jobs, { id: docRef.id, ...updatedJob }]);
      }
      setIsModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      console.error("Error updating/adding job: ", err);
    }
  };

  // Search & Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      Object.keys(filters).every(key => 
        !filters[key] || (job[key] && job[key].toString().toLowerCase().includes(filters[key].toLowerCase()))
      ) &&
      (!searchTerm || Object.values(job).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }, [jobs, filters, searchTerm]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  return (
    <div className="jobprofiles-container">
      <h1 className="title">Requirements</h1>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button className="clear-search" onClick={() => setSearchTerm("")}><FaTimes /></button>}
          <FaSearch className="search-icon" />
        </div>
        <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <FaFilter /> Advanced Search
        </button>
        <button className="add-requirement-button" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add New Requirement
        </button>
      </div>

      {/* Advanced Search Filters */}
      {isFilterOpen && (
        <div className="advanced-search">
          {Object.keys(filters).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key.replace(/([A-Z])/g, " $1")}
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            />
          ))}
          <button className="clear-filter" onClick={() => setFilters({
            DateofReceipt: "", JobTitle: "", Experience: "", Location: "",
            WorkMode: "", VISAType: "", ContractTenure: "", BillingRate: "",
            Client: "", StatusUpdate: "", Reference: ""
          })}>
            Clear Filters
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <table className="jobs-table">
          <thead>
            <tr>
              {Object.keys(filters).map((key) => <th key={key}>{key.replace(/([A-Z])/g, " $1")}</th>)}
              <th>Job Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map(job => (
              <tr key={job.id}>
                {Object.keys(filters).map((key) => <td key={key}>{job[key]}</td>)}
                <td>{job.JDFile ? <a href={job.JDFile} download><FaDownload /></a> : "No JD Uploaded"}</td>
                <td>
                  <button onClick={() => handleEdit(job)}><FaEdit /></button>
                  <button onClick={() => handleDelete(job.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      {isModalOpen && <Modal job={editingJob} onClose={() => setIsModalOpen(false)} onSave={handleSaveEdit} />}
    </div>
  );
}

export default JobProfiles;
