import { useSearchParams } from "react-router-dom";
import { useState, useRef, useMemo, useEffect } from "react";
import { books } from "../data/inventory";
import { BookGrid } from "../component/BookGrid";
import "./ShopPage.css";

export default function ShopPage({ cart, setCart, addToCart }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");

  const sortRef = useRef(null);
  const dropDownIcon = useRef(null);
  const dropdownRef = useRef(null);

  const [searchParams] = useSearchParams();

  console.log(searchParams.toString());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    const collection = searchParams.get("collection");
    const search = searchParams.get("search");
    setQuery(search || collection || "");
  }, [searchParams]);

  const sortOptions = [
    "Default",
    "Sort by popularity",
    "Sort by price:low to high",
    "Sort by price:high to low",
  ];

  const handleSort = (option) => {
    setSortBy(option);
    closeDropDown();
  };

  const toggleDropDown = () => {
    sortRef.current.classList.toggle("hide-dropdown");
    dropDownIcon.current.classList.toggle("rotate-chevron-down");
    dropdownRef.current.classList.toggle("cut-border-radius");

    console.log(dropdownRef.current);
  };

  const closeDropDown = () => {
    sortRef.current.classList.contains("hide-dropdown") ? toggleDropDown() : "";
  };

  const chevronDown = () => (
    <svg
      className="chevron-down"
      ref={dropDownIcon}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
      />
    </svg>
  );

  let filteredBooks = books.filter((book) => {
    const search = query.toLowerCase();

    return (
      book.title.includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.primaryCollection.includes(search) ||
      book.genre.includes(search) ||
      book.collections.some((col) => col.includes(search))
    );
  });

  const sort = useMemo(() => {
    const bookCopy = [...books];

    switch (sortBy) {
      case "Sort by popularity":
        bookCopy.sort((a, b) => b.reviews - a.reviews);
        break;

      case "Sort by price:low to high":
        bookCopy.sort((a, b) => a.price.paperback - b.price.paperback);
        break;

      case "Sort by price:high to low":
        bookCopy.sort((a, b) => b.price.paperback - a.price.paperback);
        break;

      default:
        return;
    }

    return bookCopy;
  }, [sortBy]);

  const searchRef = useRef(null);

  const startSearch = (event) => {
    console.log(query);
    event.key === "Enter" ? alert("search") : " ";
    if (event.key === "Enter") {
      console.log("yes");
    }
  };

  console.log(cart);

  return (
    <div>
      <section className="main-section">
        <section className="filter">
          <h2>Product Filters</h2>

          <article className="search-fields" onClick={closeDropDown}>
            <input
              className="search-field"
              placeholder="Search by title, author, or collection..."
              type="text"
              value={query}
              onChange={(e) => {
                setSortBy("Default");
                setQuery(e.target.value);
              }}
              onKeyDown={startSearch}
              ref={searchRef}
            />
          </article>

          <article className="sort-field">
            <div
              onClick={toggleDropDown}
              ref={dropdownRef}
              className="dropdown-search"
            >
              <p className="selected">{sortBy}</p>
              {chevronDown()}
            </div>
            <ul className="sort-ul" ref={sortRef}>
              {sortOptions.map((option) => (
                <li
                  className="sort-li"
                  onClick={() => handleSort(option)}
                  key={option}
                >
                  {option}
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* SHOP BOOKS */}
        <div onClick={closeDropDown}>
          <BookGrid
            setCart={setCart}
            cart={cart}
            addToCart={addToCart}
            books={sort ? sort : filteredBooks}
          />
        </div>
      </section>
    </div>
  );
}
