import React, { useMemo } from "react";
import { books } from "../../data/inventory";
import { BookCardRecommendationCard } from "../BookCardRecommendationCard";

const BookRecommendations = ({ order }) => {
  const collections = useMemo(() => {
    return [...new Set(order?.items.flatMap((item) => item.collections) ?? [])];
  }, [order]);
  const purchasedIDs = new Set(order?.items.map((item) => item.id));

  const recommendedBooks = books
    .filter((book) => !purchasedIDs.has(book.id))
    .map((book) => ({
      ...book,
      score: book.collections.filter((collection) =>
        collections.includes(collection),
      ).length,
    }))
    .filter((book) => book.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  return (
    <div className="related-reads">
      <article className="products-container special-days">
        {recommendedBooks.map((book, index) => (
          <BookCardRecommendationCard key={index} book={book} />
        ))}
      </article>
    </div>
  );
};

export default BookRecommendations;
