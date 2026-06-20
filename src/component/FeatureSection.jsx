import { BookCard } from "./BookCard";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import "./FeatureSection.css";

export function FeatureSection({ addToCart, image, array }) {
  return (
    <section className="highlight">
      <div>
        <article className="section">
          <h2 className="header">Women's History Month</h2>
          <p className="header-desc">
            Stories of women who led, and books to help you do the same.
          </p>
        </article>
      </div>

      <article className="products-container slider">
        {array.map((book, index) => (
          <BookCard
            key={index}
            id={book.id}
            book={book}
            image={book.coverImage}
            category={book.primaryCollection}
            title={book.title}
            priceInKobo={book.price.paperback}
            addToCart={addToCart}
          />
        ))}
      </article>
      <div className="see-more">
        <Link to={`/shop?collection=lead her`}>
          <button className="feature-btn">
            <p>View all</p>
            <MdChevronRight className="feature-icon" />
          </button>
        </Link>
      </div>

      <div className="highlightImg-container">
        <img src={image} alt="" />
      </div>
    </section>
  );
}
