import { useRef, useState, useEffect } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { SearchIcon, CartIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import { books } from "../../data/inventory";
import { convertToNaira } from "../../utilities/money";
import "./Header.css";

export function Header({ cart }) {
  const [headerSearchValue, setHeaderSearchValue] = useState("");

  const navigate = useNavigate();

  const cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  let searchResult = books.filter((book) => {
    const search = headerSearchValue.toLowerCase().trim();
    return (
      book.author.toLowerCase().includes(search) ||
      book.collections.includes(search) ||
      book.title.includes(search) ||
      book.collections.some((col) => col.includes(search))
    );
  });

  useEffect(() => {
    console.log(headerSearchValue);
  }, [headerSearchValue]);

  const menuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const menuCloseRef = useRef(null);
  const headerSearchRef = useRef(null);

  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("view-menu");
    menuOpenRef.current.classList.toggle("close-menu-icon");
    document.body.classList.toggle("lock-scroll");
    menuCloseRef.current.classList.toggle("display-close-icon");
  };

  const toggleSearchBar = () => {
    headerSearchRef.current.classList.add("reveal-overlay-search");
    searchInputRef.current.focus();

    document.body.style.overflow = "hidden";
    console.log(headerSearchRef.current);
  };

  return (
    <>
      <article className="header-wrapper">
        <div className="header-nav">
          <HeaderMenu
            toggleMenu={toggleMenu}
            menuRef={menuRef}
            menuOpenRef={menuOpenRef}
            menuCloseRef={menuCloseRef}
          />
          <p className="logo">LEAD</p>
          <div className="nav">
            <SearchIcon
              toggleMenu={toggleMenu}
              toggleSearchBar={toggleSearchBar}
              menuRef={menuRef}
            />

            <CartIcon cartQuantity={cartQuantity} />
          </div>
        </div>
      </article>

      <div ref={headerSearchRef} className="search-overlay">
        <div className="close-overlay">
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

        <div className="overlay-search-field">
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
          <button className="overlay-btn">
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

        <div className="search-results">
          <article className="found-cards">
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
      </div>
    </>
  );
}
