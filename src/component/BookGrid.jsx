import { BookCard } from "./BookCard";
import "./BookGrid.css";

export function BookGrid({ books }) {
  return (
    <section className="grid-container">
      {books.map((book) => {
        return <BookCard key={book.id} book={book} />;
      })}
    </section>
  );
}
