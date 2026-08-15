import { BookCard } from "./BookCard";
import "./BookGrid.css";

export function BookGrid({ books }) {
  return (
    <section className="grid-container">
      {books.map((book) => {
        return <BookCard book={book} />;
      })}
    </section>
  );
}
