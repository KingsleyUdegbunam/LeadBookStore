import { BookCard } from "./BookCard";
import "./BookGrid.css";

export function BookGrid({ books }) {
  return (
    <section className="grid-container">
      {books.map((book) => (
        <BookCard
          key={book.id}
          image={book.coverImage}
          category={book.primaryCollection}
          name={book.title}
          priceInKobo={book.price.paperback}
        />
      ))}
    </section>
  );
}
