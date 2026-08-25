import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../../data/inventory";
import { convertToNaira } from "../../utilities/money";
import { EmptyState } from "../../component/general/states/EmptyState";
import { EMPTY_STATES } from "../../constants/emptyStatesCopies";
import { ImSearch } from "react-icons/im";
import { MdOutlineClose } from "react-icons/md";
import "./HeaderSearchResult.css";

export const HeaderSearchResult = ({
  headerSearchRef,
  searchInputRef,
  onClose,
}) => {
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
          onClick={onClose}
          className="close-overlay-btn close-account-drawer"
        >
          <MdOutlineClose />
        </button>
      </div>

      <div className="overlay-search-input-field-wrapper">
        <label className="search-input-container" htmlFor="search-input-field">
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
          <div className="overlay-placeholder-btn">
            <ImSearch size={16} />
          </div>
        </label>
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
