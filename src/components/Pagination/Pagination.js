import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.css"; 

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className="pagination-bar">
      <div className="items-per-page">
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
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
  );
}

export default Pagination;
