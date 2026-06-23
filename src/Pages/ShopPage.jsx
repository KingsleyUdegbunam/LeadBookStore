import { useSearchParams } from "react-router-dom";
import { useState, useRef, useMemo, useEffect } from "react";
import Select from "react-select";
import { books } from "../data/inventory";
import { BookGrid } from "../component/BookGrid";

import "./ShopPage.css";

function capitalizeWords(str, word = false) {
  if (!str) return "";

  if (word) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ShopPage({ cart, setCart, addToCart }) {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState("Default");

  const genres = [
    ...new Set(
      books.map((book) => book.genre),
      "all genres",
    ),
  ];

  const shopCollections = [
    "all collections",
    "lead me",
    "lead him",
    "lead her",
    "lead them",
    "lead us",
    "lead little ones",
    "lead the young",
    "lead with money",
    "lead the world",
    "lead with legacy",
    "lead with imagination",
  ];
  const sortBys = [
    "default",
    "sort by popularity",
    "sort by price:low to high",
    "sort by price:high to low",
  ];

  const sortOptions = sortBys.map((sort) => ({
    value: sort,
    label: capitalizeWords(sort, true),
  }));

  console.log(sortOptions);

  const collectionOptions = shopCollections.map((coll) => ({
    value: coll,
    label: capitalizeWords(coll),
  }));

  const genreOptions = genres.map((g) => ({
    value: g,
    label: capitalizeWords(g),
  }));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      cursor: "pointer",
      fontFamily: "Anonymous Pro, monospace",
      fontSize: "1rem",
      borderColor: state.isFocused ? "var(--brand-red-clr)" : "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--brand-red-clr)",
      },
      minHeight: 0,
      borderRadius: 0,
      borderWidth: ".2px",
    }),

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

          <div className="filter-field">
            <article className="search-fields">
              <input
                className="search-field"
                placeholder="Search by title or author"
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

            <Select
              classNamePrefix="book-filter"
              isClearable
              placeholder="Filter by collection"
              styles={customStyles}
              options={collectionOptions}
              value={collection}
              onChange={setCollection}
            />

            <Select
              classNamePrefix="book-filter"
              isClearable
              placeholder="Filter by genre"
              styles={customStyles}
              options={genreOptions}
              value={genre}
              onChange={setGenre}
            />

            <Select
              classNamePrefix="book-filter"
              isClearable
              placeholder="Sort by..."
              styles={customStyles}
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />

            {/* <article className="sort-field">
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
              </article> */}
          </div>
        </section>

        {/* SHOP BOOKS */}
        <div>
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
