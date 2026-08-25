import Select from "react-select";
import { useRef } from "react";
import { filterStyles } from "../../../styles/components/reactSelect";
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
          styles={filterStyles}
          options={collectionOptions}
          onChange={(selected) => {
            handleFilter("collection", selected);
          }}
        />

        <Select
          classNamePrefix="book-filter"
          isClearable
          placeholder="Filter by genre"
          styles={filterStyles}
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
          styles={filterStyles}
          options={sortOptions}
          value={sortBy}
          onChange={(selected) => handleFilter("sort", selected)}
        />
      </div>
    </section>
  );
};

export default BookFilters;
