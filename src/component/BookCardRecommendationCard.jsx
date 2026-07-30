import { convertToNaira } from "../utilities/money";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./BookCardRecommendationCard.css";

export function BookCardRecommendationCard({ book }) {
  const { id, coverImage, price, title, author } = book;
  const { addToCart } = useCart();
  return (
    <div className="product product-rec  product-grid">
      <Link className="image-container-rec" to={`/product/${id}`}>
        <img src={coverImage} alt={`${title} book cover image`} />
      </Link>
      <Link className="product-link" to={`/product/${id}`}>
        <div className="book-details-rec">
          <p className="title title-rec hover-red">{title}</p>

          <p className="author author-rec">{author}</p>

          <p className="price">{convertToNaira(price.paperback)}</p>
        </div>
      </Link>

      <button
        className="add-to-cart-carousel button-primary"
        onClick={() => addToCart(book)}
      >
        ADD TO CART
      </button>
    </div>
  );
}
