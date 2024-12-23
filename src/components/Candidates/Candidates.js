import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";
import "./Candidates.css";
import Modal from "../Modal/index";

const Candidates = () => {
    const [candidates, setCandidates] = useState([
        {
            id: 1,
            name: "John Doe",
            picture: "https://via.placeholder.com/50",
            resume: "https://example.com/resume.pdf",
            phone: "+1 465 456 4656",
            notes: "Need to do document verification.",
            stage: "Technical",
            applicationDate: "2021-02-02",
            lastProcessDate: "2021-02-05",
            nextProcessDate: "2021-02-18",
            appliedFor: "Associate Product Manager",
            ratings: { screening: 3, technical: 3, hr: 2 },
        },
    ]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editCandidate, setEditCandidate] = useState(null); // For editing a candidate

    const deleteCandidate = (id) => {
        setCandidates(candidates.filter((candidate) => candidate.id !== id));
    };

    const handleAddCandidate = (newCandidateData) => {
        setCandidates([...candidates, newCandidateData]);
    };

    const handleEditCandidate = (updatedCandidateData) => {
        setCandidates(
            candidates.map((candidate) =>
                candidate.id === updatedCandidateData.id
                    ? updatedCandidateData
                    : candidate
            )
        );
    };

    const openModal = (candidate = null) => {
        setEditCandidate(candidate); // Set candidate data if editing
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditCandidate(null); // Reset editCandidate on modal close
    };

    const renderRating = (rating) => {
        const thumbsUp = Array(rating).fill(
            <FaThumbsUp className="icon thumbs-up" />
        );
        const thumbsDown = Array(5 - rating).fill(
            <FaThumbsDown className="icon thumbs-down" />
        );
        return [...thumbsUp, ...thumbsDown];
    };

    const indexOfLastCandidate = currentPage * itemsPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const totalPages = Math.ceil(candidates.length / itemsPerPage);

    const renderPagination = () => {
        const pages = [...Array(totalPages).keys()].map((num) => num + 1);

        return (
            <div className="pagination-container">
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <FaArrowLeft />
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
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
        );
    };

    return (
        <div className="app-container">
            {/* Add Candidate Button */}
            <button onClick={() => openModal()} className="add-btn">
                <FaPlus /> Add Candidate
            </button>

            {/* Modal for adding or editing a candidate */}
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    onSubmit={editCandidate ? handleEditCandidate : handleAddCandidate}
                    candidate={editCandidate} // Pass the candidate data if editing
                />
            )}

            <div className="table-container">
                <table className="candidate-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Resume</th>
                            <th>Phone</th>
                            <th>Notes</th>
                            <th>Stage</th>
                            <th>Application Date</th>
                            <th>Next Process Date</th>
                            <th>Applied For</th>
                            <th>Screening Rating</th>
                            <th>Technical Rating</th>
                            <th>HR Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCandidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>{candidate.name}</td>
                                <td>
                                    <img
                                        src={candidate.picture || "https://via.placeholder.com/50"}
                                        alt="candidate"
                                        className="candidate-picture"
                                    />
                                </td>
                                <td>
                                    {candidate.resume !== "No resume uploaded" ? (
                                        
                                        <a href={candidate.resume} className="download-link" download>
                                           <FaDownload /> Download Resume
                                        </a>
                                    ) : (
                                        "No resume uploaded"
                                    )}
                                </td>
                                <td>{candidate.phone}</td>
                                <td>{candidate.notes}</td>
                                <td>
                                    <span className={`stage-name ${candidate.stage.toLowerCase()}`}>
                                        {candidate.stage}
                                    </span>
                                </td>
                                <td>{candidate.applicationDate}</td>
                                <td>{candidate.nextProcessDate}</td>
                                <td>{candidate.appliedFor}</td>
                                <td>{renderRating(candidate.ratings.screening)}</td>
                                <td>{renderRating(candidate.ratings.technical)}</td>
                                <td>{renderRating(candidate.ratings.hr)}</td>
                                <td>
                                    <FaEdit
                                        className="icon edit-icon"
                                        onClick={() => openModal(candidate)} // Open modal with the candidate data
                                    />
                                    <FaTrash
                                        className="icon delete-icon"
                                        onClick={() => deleteCandidate(candidate.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {renderPagination()}
            </div>
        </div>
    );
};

export default Candidates;
