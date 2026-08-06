import React from "react";
import empty from "../assets/empty-states/filter.svg";
import "./NullFilter.css";

export const NullFilter = ({ clearFilters }) => {
  return (
    <section className="null-filter-wrapper">
      <div className="null-filter-image-wrapper">
        <img src={empty} alt="" />
      </div>
      <div className="null-filter-text">
        <p className="null-header">No books found</p>
        <p className="null-description">
          No books match your filters. Try adjusting or clearing them.
        </p>
      </div>

      <button onClick={clearFilters} className="button-secondary">
        Clear filters
      </button>
    </section>
  );
};
