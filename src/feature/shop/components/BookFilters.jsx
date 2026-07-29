import React from "react";
import Select from "react-select";
import { useRef } from "react";
import "./BookFilters.css";

const BookFilters = ({
  query,
  setQuery,
  sortBy,
  genre,
  collection,
  genreOptions,
  collectionOptions,
  sortOptions,
  handleFilter,
  startSearch,
}) => {
  const searchRef = useRef(null);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      cursor: "pointer",
      fontFamily: "Anonymous Pro, monospace",
      fontSize: "1rem",
      borderColor: state.isFocused ? "var(--brand-red-clr)" : "lightgray",
      borderStyle: "solid",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--brand-red-clr)",
      },
      minHeight: 0,
      borderRadius: 0,
      borderWidth: ".2px",
    }),

    placeholder: (base) => ({ ...base, color: "gray" }),

    valueContainer: (base) => ({
      ...base,
      lineHeight: 1.2,
    }),
    dropdownIndicator: (base) => ({ ...base, padding: ".43rem" }),
    clearIndicator: (base) => ({ ...base, padding: ".43rem" }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    option: (base, state) => ({
      ...base,
      fontFamily: "Anonymous Pro, monospace",
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "var(--brand-red-clr)"
        : state.isFocused
          ? "var(--brand-red-clr-hover)"
          : "white",
      color: state.isSelected ? "white" : state.isFocused ? "white" : "black",
    }),
  };

  return (
    <section className="filter">
      <h2>Product Filters</h2>

      <div className="filter-field">
        <article className="search-fields">
          <input
            className="query-field"
            placeholder="Search by title or author"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              const value = e.target.value;
              startSearch(event, value);
            }}
            ref={searchRef}
          />
        </article>

        <Select
          classNamePrefix="book-filter"
          isClearable
          placeholder="Filter by collection"
          value={collection}
          styles={customStyles}
          options={collectionOptions}
          onChange={(selected) => {
            handleFilter("collection", selected);
          }}
        />

        <Select
          classNamePrefix="book-filter"
          isClearable
          placeholder="Filter by genre"
          styles={customStyles}
          options={genreOptions}
          value={genre}
          onChange={(selected) => {
            handleFilter("genre", selected);
          }}
        />

        <Select
          classNamePrefix="book-filter"
          isClearable
          placeholder="Sort by..."
          styles={customStyles}
          options={sortOptions}
          value={sortBy}
          onChange={(selected) => handleFilter("sort", selected)}
        />
      </div>
    </section>
  );
};

export default BookFilters;
