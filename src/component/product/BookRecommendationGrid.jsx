import { books } from "../../data/inventory";
import { BookCard } from "../BookCard";
import "./BookRecommendationGrid.css";

const BookRecommendationGrid = ({ id, selectedBook }) => {
  const collections = selectedBook.collections;
  const recommendedBooks = books
    .filter((book) => book.id !== id)
    .map((book) => ({
      ...book,
      score: book.collections.filter((collection) =>
        collections.includes(collection),
      ).length,
    }))
    .filter((book) => book.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  return (
    <div className="related-reads">
      <article className="recommended-book-container special-days">
        {recommendedBooks.map((book, index) => (
          <BookCard book={book} index={index} />
        ))}
      </article>
    </div>
  );
};

export default BookRecommendationGrid;
