import { BookCard } from "./BookCard";
import "./BookGrid.css";

export function BookGrid({ books, setCart, cart }) {
  const addToCart = (book) => {
    const inCart = cart.find((cartItem) => cartItem.id === book.id);

    if (inCart) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.basePrice * (item.quantity + 1),
              }
            : item,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: book.id,
          quantity: 1,
          basePrice: book.price.paperback,
          totalPrice: book.price.paperback,
        },
      ]);
    }
  };

  return (
    <section className="grid-container">
      {books.map((book) => {
        return (
          <BookCard
            addToCart={addToCart}
            book={book}
            key={book.id}
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
