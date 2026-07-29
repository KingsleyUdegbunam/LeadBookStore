import { useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { BookGrid } from "../../component/BookGrid";
import BookFilters from "../../feature/shop/components/BookFilters";
import { sortBooks } from "../../feature/shop/sortBooks";
import { filterBooks } from "../../feature/shop/filterBooks";
import { capitalizeWords } from "../../utilities/capitalizeWords";
import { books } from "../../data/inventory";
import {
  SHOP_COLLECTIONS,
  SORT_BYS,
} from "../../constants/shopPage/bookFilters";
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const filteredBooks = useMemo(() => {
    const filtered = filterBooks(query, collection, genre, books);
    return filtered;
  }, [collection, genre, query]);

  const sortedBooks = useMemo(() => {
    const booksCopy = [...filteredBooks];

    sortBooks(sortBy, booksCopy);
    return booksCopy;
  }, [filteredBooks, sortBy]);

  const startSearch = (event, query) => {
    if (event.key !== "Enter") return;
    handleFilter("search", query);
  };

  return (
    <div>
      <section className="pages-wrapper">
        <BookFilters
          query={query}
          setQuery={setQuery}
          genre={genre}
          collection={collection}
          sortBy={sortBy}
          sortOptions={sortOptions}
          genreOptions={genreOptions}
          collectionOptions={collectionOptions}
          handleFilter={handleFilter}
          startSearch={startSearch}
        />

        {/* SHOP BOOKS */}
        <div className="inner-page-padding">
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
