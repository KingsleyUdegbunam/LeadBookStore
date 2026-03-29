import { BookCard } from "./BookCard";
import "./BookGrid.css";

export function BookGrid({ books, addToCart }) {
  return (
    <section className="grid-container">
      {books.map((book) => {
        return (
          <BookCard
            id={book.id}
            key={book.id}
            addToCart={addToCart}
            book={book}
            image={book.coverImage}
            category={book.primaryCollection}
            title={book.title}
            priceInKobo={book.price.paperback}
          />
        );
      })}
    </section>
  );
}
