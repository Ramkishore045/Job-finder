import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Candidates.css";

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

    const [newCandidate, setNewCandidate] = useState({
        name: "",
        picture: null,
        resume: null,
        phone: "",
        notes: "",
        stage: "Technical",
        applicationDate: "",
        lastProcessDate: "",
        nextProcessDate: "",
        appliedFor: "",
        ratings: { screening: 0, technical: 0, hr: 0 },
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "picture" || name === "resume") {
            setNewCandidate({ ...newCandidate, [name]: files[0] });
        } else if (name.startsWith("rating_")) {
            const ratingKey = name.split("_")[1];
            setNewCandidate({
                ...newCandidate,
                ratings: { ...newCandidate.ratings, [ratingKey]: Number(value) },
            });
        } else {
            setNewCandidate({ ...newCandidate, [name]: value });
        }
    };

    const addCandidate = () => {
        const newCandidateEntry = {
            id: candidates.length + 1,
            name: newCandidate.name,
            picture: newCandidate.picture
                ? URL.createObjectURL(newCandidate.picture)
                : "https://via.placeholder.com/50",
            resume: newCandidate.resume
                ? URL.createObjectURL(newCandidate.resume)
                : "No resume uploaded",
            phone: newCandidate.phone,
            notes: newCandidate.notes,
            stage: newCandidate.stage,
            applicationDate: newCandidate.applicationDate,
            lastProcessDate: newCandidate.lastProcessDate,
            nextProcessDate: newCandidate.nextProcessDate,
            appliedFor: newCandidate.appliedFor,
            ratings: newCandidate.ratings,
        };

        setCandidates([...candidates, newCandidateEntry]);

        setNewCandidate({
            name: "",
            picture: null,
            resume: null,
            phone: "",
            notes: "",
            stage: "Technical",
            applicationDate: "",
            lastProcessDate: "",
            nextProcessDate: "",
            appliedFor: "",
            ratings: { screening: 0, technical: 0, hr: 0 },
        });
    };

    const deleteCandidate = (id) => {
        setCandidates(candidates.filter((candidate) => candidate.id !== id));
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
            <div className="add-candidate-form">
                <h3 className="form-title">Add New Candidate</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addCandidate();
                    }}
                >
                    <span className="label">Name:</span>
                    <input
                        className="input-field"
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={newCandidate.name}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Job Role:</span>
                    <input
                        className="input-field"
                        type="text"
                        name="appliedFor"
                        placeholder="Enter Job Role"
                        value={newCandidate.appliedFor}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Phone:</span>
                    <input
                        className="input-field"
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={newCandidate.phone}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Notes:</span>
                    <textarea
                        className="input-field"
                        name="notes"
                        placeholder="Add Notes"
                        value={newCandidate.notes}
                        onChange={handleChange}
                    ></textarea>

                    <span className="label">Application Date:</span>
                    <input
                        className="input-field"
                        type="date"
                        name="applicationDate"
                        value={newCandidate.applicationDate}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Last Process Date:</span>
                    <input
                        className="input-field"
                        type="date"
                        name="lastProcessDate"
                        value={newCandidate.lastProcessDate}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Next Process Date:</span>
                    <input
                        className="input-field"
                        type="date"
                        name="nextProcessDate"
                        value={newCandidate.nextProcessDate}
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Stage:</span>
                    <select
                        className="input-field"
                        name="stage"
                        value={newCandidate.stage}
                        onChange={handleChange}
                    >
                        <option value="Technical">Technical</option>
                        <option value="Screening">Screening</option>
                        <option value="HR">HR Round</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                    </select>

                    <span className="label">Picture:</span>
                    <input
                        className="input-file"
                        type="file"
                        name="picture"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Resume:</span>
                    <input
                        className="input-file"
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                    />

                    <span className="label">Screening Rating:</span>
                    <input
                        className="input-field"
                        type="number"
                        name="rating_screening"
                        placeholder="0-5"
                        max={5}
                        min={0}
                        value={newCandidate.ratings.screening}
                        onChange={handleChange}
                    />

                    <span className="label">Technical Rating:</span>
                    <input
                        className="input-field"
                        type="number"
                        name="rating_technical"
                        placeholder="0-5"
                        max={5}
                        min={0}
                        value={newCandidate.ratings.technical}
                        onChange={handleChange}
                    />

                    <span className="label">HR Rating:</span>
                    <input
                        className="input-field"
                        type="number"
                        name="rating_hr"
                        placeholder="0-5"
                        max={5}
                        min={0}
                        value={newCandidate.ratings.hr}
                        onChange={handleChange}
                    />

                    <button className="add-btn" type="submit">
                        Add Candidate
                    </button>
                </form>
            </div>




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
                                            Download Resume
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
