import { books } from "../../data/inventory";

export function filterBooks(end = 10, filterBy = "genre", query1, query2) {
  if (!query1 && !query2) return;
  if (filterBy === "genre") {
    if (!query2) {
      return books.filter((book) => book.genre === query1).slice(0, end);
    }

    return books
      .filter((book) => book.genre === query1 || book.genre === query2)
      .slice(0, end);
  }

  if (filterBy === "primaryCollection") {
    return books
      .filter((book) => book.primaryCollection === "lead her")
      .slice(0, 10);
  }

  if (filterBy === "tag") {
    if (end === "none") {
      return books.filter((book) => book.tag.includes(query1));
    }

    return books.filter((book) => book.tag.includes(query1)).slice(0, end);
  }
}
