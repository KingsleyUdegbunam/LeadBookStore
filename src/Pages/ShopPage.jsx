import { useSearchParams } from "react-router-dom";
import { useState, useRef, useMemo, useEffect } from "react";
import { filterBooks } from "../feature/shop/filterBooks";
import Select from "react-select";
import { books } from "../data/inventory";
import { BookGrid } from "../component/BookGrid";
import { capitalizeWords } from "../utilities/capitalizeWords";

import { sortBooks } from "../feature/shop/sortBooks";
import { SHOP_COLLECTIONS, SORT_BYS } from "../constants/shopPage/bookFilters";
import "./ShopPage.css";

export default function ShopPage({ cart, setCart, addToCart }) {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState("Default");
  const [searchParams, setSearchParams] = useSearchParams();

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "Default") {
        params.delete(key);
      } else {
        const keyValue = value.trim();
        params.set(key, keyValue);
      }
    });

    setSearchParams(params);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL({ search: query });
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  function handleFilter(field, value) {
    switch (field) {
      case "collection":
        setCollection(value);
        updateURL({ collection: value?.value });
        break;

      case "genre":
        setGenre(value);
        updateURL({ genre: value?.value });
        break;

      case "sort":
        setSortBy(value);
        updateURL({ sort: value?.value });
        break;
    }
  }

  const genres = [
    ...new Set(
      books.map((book) => book.genre),
      "all genres",
    ),
  ];

  const shopCollections = SHOP_COLLECTIONS;
  const sortBys = SORT_BYS;
  const sortOptions = sortBys.map((sort) => ({
    value: sort,
    label: capitalizeWords(sort, true),
  }));

  const collectionOptions = shopCollections.map((coll) => ({
    value: coll,
    label: capitalizeWords(coll),
  }));

  const genreOptions = genres.map((g) => ({
    value: g,
    label: capitalizeWords(g),
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    // Get individaual param from URL
    setQuery(searchParams.get("search") || "");
    const collectionParam = searchParams.get("collection");
    const genreParam = searchParams.get("genre");
    const sortParam = searchParams.get("sort");

    const selectedCollection = collectionOptions.find(
      (option) => option.value === collectionParam || null,
    );
    const selectedGenre = genreOptions.find(
      (genre) => genre.value === genreParam || null,
    );
    const selectedSort = sortOptions.find(
      (sort) => sort.value === sortParam || null,
    );

    setCollection(selectedCollection);
    setGenre(selectedGenre);
    setSortBy(selectedSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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

    placeholder: (base) => ({ ...base, color: "lightgray" }),

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

  const filteredBooks = useMemo(() => {
    const filtered = filterBooks(query, collection, genre, books);
    return filtered;
  }, [collection, genre, query]);

  const sortedBooks = useMemo(() => {
    const booksCopy = [...filteredBooks];

    sortBooks(sortBy, booksCopy);
    return booksCopy;
  }, [filteredBooks, sortBy]);

  const searchRef = useRef(null);

  const startSearch = (event, query) => {
    if (event.key !== "Enter") return;
    handleFilter("search", query);
  };

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

        {/* SHOP BOOKS */}
        <div>
          <BookGrid
            setCart={setCart}
            cart={cart}
            addToCart={addToCart}
            books={sortedBooks}
          />
        </div>
      </section>
    </div>
  );
}
