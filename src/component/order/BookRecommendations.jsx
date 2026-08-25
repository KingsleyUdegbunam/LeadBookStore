import { useMemo } from "react";
import { books } from "../../data/inventory";
import { BookCard } from "../BookCard";
import { CarouselWrapper } from "../../feature/carousel/CarouselWrapper";

const BookRecommendations = ({ order, emblaRef }) => {
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
    .slice(0, 12);
  return (
    <div className="related-reads">
      <article className="recommended-book-container">
        <CarouselWrapper array={recommendedBooks} emblaRef={emblaRef}>
          {(book) => <BookCard book={book} />}
        </CarouselWrapper>
      </article>
    </div>
  );
};

export default BookRecommendations;
