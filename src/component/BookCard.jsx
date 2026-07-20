import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import "./BookCard.css";
import { useCart } from "../context/CartContext";

export function BookCard({ book }) {
  const { id, coverImage, primaryCollection, price, title, author } = book;
  const { addToCart } = useCart();
  return (
    <div className="product product-grid">
      <div className="book-details">
        <Link className="product-link" to={`/product/${id}`}>
          <div className="image-container">
            <img src={coverImage} alt="Book image" />
            <p className="category">{primaryCollection.replace("lead ", "")}</p>
          </div>
        </Link>

        <Link className="product-link book-details" to={`/product/${id}`}>
          <p className="title">{title}</p>

          <p className="author">{author}</p>

          <p className="price">{convertToNaira(price.paperback)}</p>
        </Link>
      </div>

      <button className="add-to-cart" onClick={() => addToCart(book)}>
        ADD TO CART
      </button>
    </div>
  );
}
