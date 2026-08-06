import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertToNaira } from "../../utilities/money";
import { books } from "../../data/inventory";
import { EmptyState } from "../../component/EmptyState";
import { EMPTY_STATES } from "../../constants/emptyStatesCopies";
import "./HeaderSearchResult.css";

export const HeaderSearchResult = ({ headerSearchRef, searchInputRef }) => {
  const [headerSearchValue, setHeaderSearchValue] = useState("");
  const navigate = useNavigate();

  let searchResult = books.filter((book) => {
    const search = headerSearchValue.toLowerCase().trim();
    return (
      book.author.toLowerCase().includes(search) ||
      book.collections.includes(search) ||
      book.title.includes(search) ||
      book.collections.some((col) => col.includes(search))
    );
  });
  return (
    <div ref={headerSearchRef} className="search-overlay">
      <div className="close-overlay-wrapper">
        <button
          className="close-overlay-btn"
          onClick={() => {
            headerSearchRef.current.classList.remove("reveal-overlay-search");
            document.body.style.overflow = "auto";
          }}
        >
          X
        </button>
      </div>

      <div className="overlay-search-input-field-wrapper">
        <label className="sr-only" htmlFor="search-input-field">
          Search
        </label>

        <input
          ref={searchInputRef}
          value={headerSearchValue}
          onChange={(e) => {
            setHeaderSearchValue(e.target.value);
          }}
          className="overlay-input"
          placeholder="Search by book name, author, or collection."
          type="text"
          name="search-input-field"
          id="search-input-field"
        />
        <button className="overlay-placeholder-btn">
          <svg
            className="icon search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>

      {searchResult.length > 0 ? (
        <div className="search-results">
          <article>
            {headerSearchValue
              ? searchResult.map((book) => (
                  <article
                    key={book.id}
                    onClick={() => {
                      navigate(`/product/${book.id}`);
                      headerSearchRef.current.classList.remove(
                        "reveal-overlay-search",
                      );
                      document.body.style.overflow = "auto";
                      setHeaderSearchValue("");
                    }}
                    className="found-book"
                  >
                    <div className="overlay-image-container">
                      <img src={book.coverImage} alt="" />
                    </div>
                    <p className="overlay-name">{book.title}</p>
                    <p className="overlay-price">
                      {convertToNaira(book.price.paperback)}
                    </p>
                  </article>
                ))
              : ""}
          </article>
        </div>
      ) : (
        <div className="empty-search">
          <EmptyState
            {...EMPTY_STATES.search}
            onAction={() => {
              navigate("/shop");
              headerSearchRef.current.classList.remove("reveal-overlay-search");
              document.body.style.overflow = "auto";
              setHeaderSearchValue("");
            }}
          />
        </div>
      )}
    </div>
  );
};
